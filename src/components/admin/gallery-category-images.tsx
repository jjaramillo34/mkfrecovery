"use client";

import Image from "next/image";
import Link from "next/link";
import { GripVertical, Upload } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  IMAGEKIT_UPLOAD,
  buildGalleryMeta,
  fetchImageKitAuth,
  isImageFile,
  parseIkResponse,
  reorderList,
  sortGalleryItems,
  type AuthPayload,
  type CategoryRow,
  type EventRow,
  type GalleryItemRow,
} from "@/lib/gallery-admin-shared";

export function GalleryCategoryImages({ slug }: { slug: string }) {
  const [category, setCategory] = useState<CategoryRow | null | undefined>(undefined);
  const [events, setEvents] = useState<EventRow[]>([]);
  const [items, setItems] = useState<GalleryItemRow[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dropTargetId, setDropTargetId] = useState<string | null>(null);
  const [reordering, setReordering] = useState(false);
  const [eventOverride, setEventOverride] = useState("");
  const [metaEdits, setMetaEdits] = useState<Record<string, { title: string; alt: string }>>({});
  const [savingMetaId, setSavingMetaId] = useState<string | null>(null);
  const [justUploadedIds, setJustUploadedIds] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const reload = useCallback(() => {
    setErr(null);
    return Promise.all([
      fetch("/api/admin/categories")
        .then((r) => r.json())
        .then((d: CategoryRow[]) => (Array.isArray(d) ? d : []))
        .catch(() => [] as CategoryRow[]),
      fetch("/api/admin/events")
        .then((r) => r.json())
        .then((d: EventRow[]) => (Array.isArray(d) ? d : []))
        .catch(() => [] as EventRow[]),
    ]).then(([cats, ev]) => {
      const cat = cats.find((c) => c.slug === slug) ?? null;
      setCategory(cat);
      setEvents(ev);
      if (!cat) {
        setItems([]);
        return;
      }
      return fetch(`/api/admin/gallery?categoryId=${encodeURIComponent(cat._id)}`)
        .then((r) => r.json())
        .then((d: GalleryItemRow[]) => setItems(Array.isArray(d) ? sortGalleryItems(d) : []))
        .catch(() => setItems([]));
    });
  }, [slug]);

  useEffect(() => {
    reload();
  }, [reload]);

  useEffect(() => {
    if (category?.eventId) {
      setEventOverride(category.eventId);
    } else {
      setEventOverride("");
    }
  }, [category?._id, category?.eventId]);

  const uploadOneFile = useCallback(
    async (
      file: File,
      meta: { categoryId: string; eventId: string; title: string; alt: string; order: number },
      auth: AuthPayload,
    ) => {
      const form = new FormData();
      form.append("file", file);
      form.append("fileName", file.name);
      form.append("publicKey", auth.publicKey);
      form.append("signature", auth.signature);
      form.append("token", auth.token);
      form.append("expire", String(auth.expire));
      form.append("useUniqueFileName", "true");
      form.append("folder", "mkf/gallery");

      const up = await fetch(IMAGEKIT_UPLOAD, { method: "POST", body: form });
      const raw: unknown = await up.json();
      const ik = parseIkResponse(raw, up.ok);
      const body: Record<string, unknown> = {
        fileId: ik.fileId,
        filePath: ik.filePath ?? "",
        url: ik.url,
        width: typeof ik.width === "number" ? ik.width : undefined,
        height: typeof ik.height === "number" ? ik.height : undefined,
        title: meta.title.trim(),
        alt: meta.alt.trim(),
        categoryId: meta.categoryId,
        order: meta.order,
      };
      if (ik.thumbnailUrl) body.thumbnailUrl = ik.thumbnailUrl;
      body.eventId = meta.eventId ? meta.eventId : null;

      const saveR = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!saveR.ok) {
        throw new Error("Uploaded to ImageKit, but could not save to the database.");
      }
      const saved = (await saveR.json()) as { _id?: string };
      return saved._id ?? "";
    },
    [],
  );

  const uploadMany = useCallback(
    async (files: File[]) => {
      if (!category) return;
      const images = files.filter(isImageFile);
      if (images.length === 0) {
        setErr("Drop image files only (JPEG, PNG, WebP, etc.).");
        return;
      }

      setMsg(null);
      setErr(null);
      setUploading(true);
      try {
        const eventTitle = eventOverride ? events.find((e) => e._id === eventOverride)?.title : undefined;
        const baseOrder =
          items && items.length > 0 ? Math.max(...items.map((i) => i.order)) + 1 : 0;

        let ok = 0;
        const newIds: string[] = [];
        for (let i = 0; i < images.length; i++) {
          setUploadProgress(`Uploading ${i + 1} of ${images.length}…`);
          const file = images[i]!;
          const meta = buildGalleryMeta(category.name, {
            file: images.length === 1 ? file : undefined,
            batchIndex: images.length > 1 ? i : undefined,
            batchTotal: images.length > 1 ? images.length : undefined,
            eventTitle,
          });
          const auth = await fetchImageKitAuth();
          const id = await uploadOneFile(
            file,
            {
              categoryId: category._id,
              eventId: eventOverride,
              title: meta.title,
              alt: meta.alt,
              order: baseOrder + i,
            },
            auth,
          );
          if (id) newIds.push(id);
          ok += 1;
        }
        setJustUploadedIds(newIds);
        setMetaEdits((prev) => {
          const next = { ...prev };
          for (const id of newIds) delete next[id];
          return next;
        });
        setMsg(
          ok === 1
            ? "Image added — edit title and alt below, then Save."
            : `Added ${ok} images — review title and alt below.`,
        );
        await reload();
        requestAnimationFrame(() => {
          const el = listRef.current?.querySelector(`[data-gallery-id="${newIds[0]}"]`);
          el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        });
      } catch (x) {
        setErr(x instanceof Error ? x.message : "Upload failed");
      } finally {
        setUploading(false);
        setUploadProgress(null);
      }
    },
    [category, eventOverride, events, items, uploadOneFile, reload],
  );

  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!uploading) setDragOver(true);
  }

  function onDragLeave(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    if (uploading || !category) return;
    void uploadMany([...e.dataTransfer.files]);
  }

  async function deleteItem(id: string) {
    if (!confirm("Remove this image from the site? (The ImageKit file is not auto-deleted.)")) return;
    const r = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    if (!r.ok) setErr("Delete failed");
    else {
      setMsg("Image removed.");
      reload();
    }
  }

  async function persistReorder(activeId: string, overId: string) {
    if (activeId === overId || !items || !category) return;

    const fromIdx = items.findIndex((i) => i._id === activeId);
    const toIdx = items.findIndex((i) => i._id === overId);
    if (fromIdx < 0 || toIdx < 0) return;

    const reordered = reorderList(items, fromIdx, toIdx);
    const orderById = new Map(reordered.map((item, idx) => [item._id, idx]));
    setItems(reordered.map((item, idx) => ({ ...item, order: orderById.get(item._id)! })));

    setErr(null);
    setMsg(null);
    setReordering(true);
    try {
      const r = await fetch("/api/admin/gallery/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: reordered.map((item, idx) => ({ _id: item._id, order: idx })),
        }),
      });
      if (!r.ok) throw new Error("Could not save order");
      setMsg("Photo order updated.");
    } catch {
      setErr("Could not save new order.");
      reload();
    } finally {
      setReordering(false);
    }
  }

  function getMeta(item: GalleryItemRow) {
    return metaEdits[item._id] ?? { title: item.title, alt: item.alt };
  }

  function isMetaDirty(item: GalleryItemRow) {
    const edit = metaEdits[item._id];
    if (!edit) return false;
    return edit.title.trim() !== item.title || edit.alt.trim() !== item.alt;
  }

  function setMetaField(id: string, item: GalleryItemRow, field: "title" | "alt", value: string) {
    setMetaEdits((prev) => ({
      ...prev,
      [id]: {
        title: field === "title" ? value : (prev[id]?.title ?? item.title),
        alt: field === "alt" ? value : (prev[id]?.alt ?? item.alt),
      },
    }));
  }

  async function saveMeta(item: GalleryItemRow) {
    const edit = getMeta(item);
    const title = edit.title.trim();
    const alt = edit.alt.trim();
    if (!title || !alt) {
      setErr("Title and alt text are required.");
      return;
    }
    setSavingMetaId(item._id);
    setErr(null);
    setMsg(null);
    try {
      const r = await fetch("/api/admin/gallery", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: item._id, title, alt }),
      });
      if (!r.ok) throw new Error("Could not save");
      setItems((prev) =>
        prev?.map((row) => (row._id === item._id ? { ...row, title, alt } : row)) ?? prev,
      );
      setMetaEdits((prev) => {
        const next = { ...prev };
        delete next[item._id];
        return next;
      });
      setJustUploadedIds((prev) => prev.filter((id) => id !== item._id));
      setMsg("Title and alt saved.");
    } catch {
      setErr("Could not save title and alt.");
    } finally {
      setSavingMetaId(null);
    }
  }

  if (category === undefined || items === null) {
    return <p className="text-mkf-muted">Loading…</p>;
  }

  if (category === null) {
    return (
      <Card className="p-8 text-center">
        <p className="font-medium text-mkf-ink">Category not found</p>
        <p className="mt-2 text-sm text-mkf-muted">No category with slug “{slug}”.</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <Button href="/admin/gallery/categories" variant="primary">
            Manage categories
          </Button>
          <Button href="/admin/gallery" variant="secondary">
            Gallery home
          </Button>
        </div>
      </Card>
    );
  }

  const sortedItems = sortGalleryItems(items);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-mkf-muted">
            <Link href="/admin/gallery" className="hover:underline">
              Gallery
            </Link>
            {" / "}
            <span className="text-mkf-ink">{category.name}</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button href="/admin/gallery/categories" variant="secondary">
            Categories
          </Button>
          <Button href="/admin/gallery" variant="secondary">
            All categories
          </Button>
        </div>
      </div>

      <Card className="p-5 sm:p-6">
        <h2 className="font-display text-lg font-semibold text-mkf-ink">Upload photos</h2>
        <p className="mt-1 text-sm text-mkf-muted">
          Drop multiple images at once — they upload with auto-generated titles and alt text you can edit below.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className="text-sm font-medium">Event tag (optional)</span>
            <select
              className="mt-1 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
              value={eventOverride}
              onChange={(e) => setEventOverride(e.target.value)}
              disabled={uploading}
            >
              <option value="">None / show in all event filters</option>
              {events.map((ev) => (
                <option key={ev._id} value={ev._id}>
                  {ev.title}
                </option>
              ))}
            </select>
          </label>
        </div>
        <input
          ref={fileInputRef}
          className="sr-only"
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            const list = e.target.files;
            if (!list?.length) return;
            void uploadMany([...list]);
            e.target.value = "";
          }}
        />
        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          onClick={() => !uploading && fileInputRef.current?.click()}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`mt-4 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-12 text-center transition-colors ${
            dragOver
              ? "border-mkf-primary bg-mkf-primary/10"
              : "border-mkf-border bg-mkf-bg hover:border-mkf-primary/50 hover:bg-mkf-surface"
          } ${uploading ? "pointer-events-none opacity-60" : ""}`}
        >
          <Upload
            className={`mb-3 h-10 w-10 ${dragOver ? "text-mkf-primary" : "text-mkf-muted"}`}
            aria-hidden
          />
          <p className="text-sm font-medium text-mkf-ink">
            {uploading ? uploadProgress ?? "Uploading…" : dragOver ? "Drop to upload" : "Drag & drop images here"}
          </p>
          <p className="mt-1 text-xs text-mkf-muted">or click to select one or many files</p>
        </div>
      </Card>

      <section>
        <h2 className="font-display text-lg font-semibold text-mkf-ink">
          Photos in {category.name}
          {reordering ? " · saving order…" : ""}
        </h2>
        {sortedItems.length === 0 ? (
          <p className="mt-2 text-sm text-mkf-muted">No photos in this category yet.</p>
        ) : (
          <ul ref={listRef} className="mt-4 space-y-3">
            {sortedItems.map((g, index) => {
              const evLabel = g.eventId ? events.find((e) => e._id === g.eventId)?.title ?? g.eventId : "—";
              const thumb = g.thumbnailUrl && g.thumbnailUrl.startsWith("http") ? g.thumbnailUrl : g.url;
              const isDragging = draggingId === g._id;
              const isDropTarget = dropTargetId === g._id;
              const meta = getMeta(g);
              const dirty = isMetaDirty(g);
              const isNew = justUploadedIds.includes(g._id);
              const saving = savingMetaId === g._id;
              return (
                <li
                  key={g._id}
                  data-gallery-id={g._id}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = "move";
                    if (draggingId && draggingId !== g._id) setDropTargetId(g._id);
                  }}
                  onDragLeave={() => setDropTargetId((prev) => (prev === g._id ? null : prev))}
                  onDrop={(e) => {
                    e.preventDefault();
                    const activeId = draggingId ?? e.dataTransfer.getData("text/plain");
                    setDraggingId(null);
                    setDropTargetId(null);
                    if (activeId) void persistReorder(activeId, g._id);
                  }}
                  className={`transition-opacity ${isDragging ? "opacity-40" : ""}`}
                >
                  <Card
                    className={`flex flex-col gap-4 p-4 lg:flex-row lg:items-start ${
                      isDropTarget ? "ring-2 ring-mkf-primary ring-offset-2 ring-offset-mkf-bg" : ""
                    } ${isNew ? "ring-2 ring-mkf-teal/50 ring-offset-2 ring-offset-mkf-bg" : ""}`}
                  >
                    <div className="flex shrink-0 items-start gap-2 sm:items-center">
                      <div
                        draggable={!reordering && !saving}
                        onDragStart={(e) => {
                          e.dataTransfer.effectAllowed = "move";
                          e.dataTransfer.setData("text/plain", g._id);
                          setDraggingId(g._id);
                        }}
                        onDragEnd={() => {
                          setDraggingId(null);
                          setDropTargetId(null);
                        }}
                        className="flex cursor-grab touch-none items-center text-mkf-muted active:cursor-grabbing"
                        aria-label={`Drag to reorder ${g.title}`}
                      >
                        <GripVertical className="h-5 w-5" aria-hidden />
                        <span className="ml-1 w-5 text-center text-xs font-medium tabular-nums">{index + 1}</span>
                      </div>
                      <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-md border border-mkf-border bg-mkf-bg">
                        <Image src={thumb} alt={meta.alt || g.alt} fill className="object-cover" sizes="120px" draggable={false} />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 space-y-3">
                      {isNew && (
                        <p className="text-xs font-medium text-mkf-teal">New upload — edit title and alt, then Save.</p>
                      )}
                      <div className="grid gap-3 sm:grid-cols-2">
                        <label className="block">
                          <span className="text-xs font-medium text-mkf-muted">Title</span>
                          <input
                            className="mt-1 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
                            value={meta.title}
                            onChange={(e) => setMetaField(g._id, g, "title", e.target.value)}
                            disabled={saving}
                          />
                        </label>
                        <label className="block">
                          <span className="text-xs font-medium text-mkf-muted">Alt text</span>
                          <input
                            className="mt-1 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
                            value={meta.alt}
                            onChange={(e) => setMetaField(g._id, g, "alt", e.target.value)}
                            disabled={saving}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-mkf-muted">Event: {evLabel}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 lg:flex-col lg:items-stretch">
                      <Button
                        type="button"
                        variant="primary"
                        disabled={!dirty || saving}
                        onClick={() => void saveMeta(g)}
                      >
                        {saving ? "Saving…" : "Save"}
                      </Button>
                      <Button type="button" variant="secondary" disabled={saving} onClick={() => void deleteItem(g._id)}>
                        Remove
                      </Button>
                    </div>
                  </Card>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {msg && <p className="text-sm text-mkf-teal">{msg}</p>}
      {err && <p className="text-sm text-red-600">{err}</p>}
    </div>
  );
}
