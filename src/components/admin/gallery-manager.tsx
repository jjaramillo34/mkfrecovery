"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const IMAGEKIT_UPLOAD = "https://upload.imagekit.io/api/v1/files/upload";

type CategoryRow = { _id: string; name: string; slug: string; order: number; eventId: string | null };
type EventRow = { _id: string; title: string; slug: string };
type GalleryItemRow = {
  _id: string;
  fileId: string;
  filePath: string;
  url: string;
  thumbnailUrl?: string;
  title: string;
  alt: string;
  categoryId: string;
  eventId: string | null;
  order: number;
};

type AuthPayload = { publicKey: string; urlEndpoint: string; token: string; signature: string; expire: number };

type IkUploadResponse = {
  fileId: string;
  name?: string;
  filePath?: string;
  url: string;
  height?: number;
  width?: number;
  thumbnailUrl?: string;
};

function parseIkResponse(data: unknown, httpOk: boolean): IkUploadResponse {
  if (typeof data !== "object" || !data) {
    throw new Error("Invalid upload response");
  }
  const o = data as Record<string, unknown>;
  if (!httpOk) {
    const m = o.message;
    let msg: string;
    if (Array.isArray(m) && m[0] && typeof m[0] === "object" && m[0] !== null && "message" in m[0]) {
      msg = String((m[0] as { message?: string }).message ?? "Upload failed");
    } else {
      msg = typeof o.message === "string" ? o.message : "Upload failed";
    }
    throw new Error(msg);
  }
  const fileId = o.fileId != null ? String(o.fileId) : "";
  const url = o.url != null ? String(o.url) : "";
  if (!fileId || !url) {
    throw new Error("ImageKit did not return fileId/url");
  }
  return o as unknown as IkUploadResponse;
}

export function GalleryManager() {
  const [events, setEvents] = useState<EventRow[] | null>(null);
  const [categories, setCategories] = useState<CategoryRow[] | null>(null);
  const [items, setItems] = useState<GalleryItemRow[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const [catName, setCatName] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [catOrder, setCatOrder] = useState(0);
  const [catEventId, setCatEventId] = useState("");

  const [uCategoryId, setUCategoryId] = useState("");
  const [uEventId, setUEventId] = useState("");
  const [uTitle, setUTitle] = useState("");
  const [uAlt, setUAlt] = useState("");
  const [uOrder, setUOrder] = useState(0);
  const [uFile, setUFile] = useState<File | null>(null);

  const [orderEdits, setOrderEdits] = useState<Record<string, number>>({});

  const reload = useCallback(() => {
    setErr(null);
    void Promise.all([
      fetch("/api/admin/events")
        .then((r) => r.json())
        .then((d: EventRow[]) => (Array.isArray(d) ? d : []))
        .catch(() => [] as EventRow[]),
      fetch("/api/admin/categories")
        .then((r) => r.json())
        .then((d: CategoryRow[]) => (Array.isArray(d) ? d : []))
        .catch(() => [] as CategoryRow[]),
      fetch("/api/admin/gallery")
        .then((r) => r.json())
        .then((d: GalleryItemRow[]) => (Array.isArray(d) ? d : []))
        .catch(() => [] as GalleryItemRow[]),
    ]).then(([ev, cat, g]) => {
      setEvents(ev);
      setCategories(cat);
      setItems(g);
    });
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  useEffect(() => {
    if (categories && categories.length > 0 && !categories.some((c) => c._id === uCategoryId)) {
      setUCategoryId(categories[0]!._id);
    }
  }, [categories, uCategoryId]);

  async function addCategory(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setErr(null);
    const r = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: catName,
        slug: catSlug,
        order: catOrder,
        eventId: catEventId ? catEventId : null,
      }),
    });
    if (!r.ok) {
      setErr("Could not create category (check slug: lowercase, hyphens only).");
      return;
    }
    setCatName("");
    setCatSlug("");
    setCatOrder(0);
    setCatEventId("");
    setMsg("Category saved.");
    reload();
  }

  async function deleteCategory(id: string) {
    if (!confirm("Delete this category and all images in it?")) return;
    const r = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    if (!r.ok) setErr("Delete failed");
    else {
      setMsg("Category removed.");
      reload();
    }
  }

  async function runUpload(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setErr(null);
    if (!uFile || !uCategoryId) {
      setErr("Choose a file and a category.");
      return;
    }
    if (!uTitle.trim() || !uAlt.trim()) {
      setErr("Add title and alt text.");
      return;
    }
    setUploading(true);
    try {
      const authR = await fetch("/api/admin/imagekit/auth");
      if (!authR.ok) {
        const j = await authR.json().catch(() => ({}));
        setErr(typeof (j as { error?: string }).error === "string" ? (j as { error: string }).error : "ImageKit not available");
        return;
      }
      const auth = (await authR.json()) as AuthPayload;
      const form = new FormData();
      form.append("file", uFile);
      form.append("fileName", uFile.name);
      form.append("publicKey", auth.publicKey);
      form.append("signature", auth.signature);
      form.append("token", auth.token);
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
        title: uTitle.trim(),
        alt: uAlt.trim(),
        categoryId: uCategoryId,
        order: uOrder,
      };
      if (ik.thumbnailUrl) {
        body.thumbnailUrl = ik.thumbnailUrl;
      }
      if (uEventId) {
        body.eventId = uEventId;
      } else {
        body.eventId = null;
      }
      const saveR = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!saveR.ok) {
        setErr("Uploaded to ImageKit, but could not save to the database. Check the server response.");
        return;
      }
      setUFile(null);
      setUTitle("");
      setUAlt("");
      setUOrder(0);
      setMsg("Image added to the gallery.");
      reload();
    } catch (x) {
      setErr(x instanceof Error ? x.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function deleteItem(id: string) {
    if (!confirm("Remove this image from the site? (The ImageKit file is not auto-deleted.)")) return;
    const r = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    if (!r.ok) setErr("Delete failed");
    else {
      setMsg("Image removed from gallery.");
      reload();
    }
  }

  async function saveItemOrder(_id: string) {
    const o = orderEdits[_id];
    if (o === undefined) return;
    setErr(null);
    setMsg(null);
    const r = await fetch("/api/admin/gallery", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id, order: o }),
    });
    if (!r.ok) {
      setErr("Could not update order.");
    } else {
      setMsg("Order updated.");
      setOrderEdits((prev) => {
        const n = { ...prev };
        delete n[_id];
        return n;
      });
      reload();
    }
  }

  if (items === null || events === null || categories === null) {
    return <p className="text-mkf-muted">Loading…</p>;
  }

  return (
    <div className="space-y-10">
      <section>
        <h2 className="font-display text-xl font-semibold text-mkf-ink">Categories</h2>
        <p className="mt-1 text-sm text-mkf-muted">Group photos for the public gallery. Optionally link a category to a single event, or leave “All / global”.</p>
        <Card className="mt-3 p-5 sm:p-6">
          <form className="grid gap-3 sm:grid-cols-2" onSubmit={addCategory}>
            <label>
              <span className="text-sm font-medium">Name</span>
              <input
                className="mt-1 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
                value={catName}
                onChange={(e) => setCatName(e.target.value)}
                required
                placeholder="Community"
              />
            </label>
            <label>
              <span className="text-sm font-medium">Slug</span>
              <input
                className="mt-1 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
                value={catSlug}
                onChange={(e) => setCatSlug(e.target.value)}
                required
                placeholder="community"
              />
            </label>
            <label>
              <span className="text-sm font-medium">Display order</span>
              <input
                className="mt-1 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
                type="number"
                value={catOrder}
                onChange={(e) => setCatOrder(Number(e.target.value))}
              />
            </label>
            <label>
              <span className="text-sm font-medium">Event (optional)</span>
              <select
                className="mt-1 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
                value={catEventId}
                onChange={(e) => setCatEventId(e.target.value)}
              >
                <option value="">All / not tied to one event</option>
                {events.map((ev) => (
                  <option key={ev._id} value={ev._id}>
                    {ev.title}
                  </option>
                ))}
              </select>
            </label>
            <div className="sm:col-span-2">
              <Button type="submit" variant="primary">
                Add category
              </Button>
            </div>
          </form>
        </Card>
        <ul className="mt-4 space-y-2">
          {categories.length === 0 && <li className="text-sm text-mkf-muted">No categories yet. Add one before uploading.</li>}
          {categories.map((c) => (
            <li key={c._id} className="flex flex-col justify-between gap-2 rounded-lg border border-mkf-border bg-mkf-surface px-4 py-3 sm:flex-row sm:items-center">
              <div>
                <span className="font-medium text-mkf-ink">{c.name}</span>
                <span className="ml-2 text-sm text-mkf-muted">/ {c.slug}</span>
                {c.eventId && (
                  <span className="ml-2 text-xs text-mkf-teal">
                    (event: {events.find((e) => e._id === c.eventId)?.title ?? c.eventId})
                  </span>
                )}
              </div>
              <Button type="button" variant="secondary" onClick={() => void deleteCategory(c._id)}>
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold text-mkf-ink">Upload image</h2>
        <p className="mt-1 text-sm text-mkf-muted">Files go to your ImageKit folder `mkf/gallery`, then a record is saved in MongoDB.</p>
        <Card className="mt-3 p-5 sm:p-6">
          {categories.length === 0 ? (
            <p className="text-sm text-amber-800 dark:text-amber-200/90">Add a category first.</p>
          ) : (
            <form className="space-y-4" onSubmit={runUpload}>
              <label className="block">
                <span className="text-sm font-medium">File</span>
                <input
                  className="mt-1 block w-full text-sm"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setUFile(e.target.files?.[0] ?? null)}
                />
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                <label>
                  <span className="text-sm font-medium">Category</span>
                  <select
                    className="mt-1 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
                    value={uCategoryId}
                    onChange={(e) => setUCategoryId(e.target.value)}
                    required
                  >
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span className="text-sm font-medium">Event (optional filter)</span>
                  <select
                    className="mt-1 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
                    value={uEventId}
                    onChange={(e) => setUEventId(e.target.value)}
                  >
                    <option value="">All / not tied to one event</option>
                    {events.map((ev) => (
                      <option key={ev._id} value={ev._id}>
                        {ev.title}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span className="text-sm font-medium">Title</span>
                  <input
                    className="mt-1 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
                    value={uTitle}
                    onChange={(e) => setUTitle(e.target.value)}
                    required
                  />
                </label>
                <label>
                  <span className="text-sm font-medium">Alt text</span>
                  <input
                    className="mt-1 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
                    value={uAlt}
                    onChange={(e) => setUAlt(e.target.value)}
                    required
                  />
                </label>
                <label>
                  <span className="text-sm font-medium">Order</span>
                  <input
                    className="mt-1 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
                    type="number"
                    value={uOrder}
                    onChange={(e) => setUOrder(Number(e.target.value))}
                  />
                </label>
              </div>
              <div>
                <Button type="submit" variant="primary" disabled={uploading}>
                  {uploading ? "Uploading…" : "Upload and save"}
                </Button>
              </div>
            </form>
          )}
        </Card>
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold text-mkf-ink">All images</h2>
        {items.length === 0 && <p className="mt-2 text-sm text-mkf-muted">No images in the database yet.</p>}
        <ul className="mt-4 space-y-4">
          {items.map((g) => {
            const cat = categories.find((c) => c._id === g.categoryId);
            const evLabel = g.eventId ? events.find((e) => e._id === g.eventId)?.title ?? g.eventId : "—";
            const thumb = g.thumbnailUrl && g.thumbnailUrl.startsWith("http") ? g.thumbnailUrl : g.url;
            const oVal = orderEdits[g._id] ?? g.order;
            return (
              <li key={g._id}>
                <Card className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                  <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-md border border-mkf-border bg-mkf-bg">
                    <Image src={thumb} alt={g.alt} fill className="object-cover" sizes="120px" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-mkf-ink">{g.title}</p>
                    <p className="truncate text-xs text-mkf-muted">{g.url}</p>
                    <p className="mt-1 text-xs text-mkf-muted">
                      {cat ? cat.name : g.categoryId} · Event: {evLabel}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="inline-flex items-center gap-1 text-sm">
                      Order
                      <input
                        className="w-16 rounded border border-mkf-border bg-mkf-bg px-2 py-1 text-sm"
                        type="number"
                        value={oVal}
                        onChange={(e) =>
                          setOrderEdits((p) => ({ ...p, [g._id]: Number(e.target.value) }))
                        }
                      />
                    </label>
                    <Button type="button" variant="secondary" onClick={() => void saveItemOrder(g._id)}>
                      Save
                    </Button>
                    <Button type="button" variant="secondary" onClick={() => void deleteItem(g._id)}>
                      Remove
                    </Button>
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
      </section>

      {msg && <p className="text-sm text-mkf-teal">{msg}</p>}
      {err && <p className="text-sm text-red-600">{err}</p>}
    </div>
  );
}
