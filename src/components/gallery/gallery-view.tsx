"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

type PublicEvent = { _id: string; title: string; slug: string };
type PublicCategory = { _id: string; name: string; slug: string };
type GalleryItem = {
  _id: string;
  url: string;
  thumbnailUrl?: string;
  title: string;
  alt: string;
  categoryId: string;
  eventId?: string | null;
  order?: number;
};

export function GalleryView() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const [events, setEvents] = useState<PublicEvent[] | null>(null);
  const [categories, setCategories] = useState<PublicCategory[] | null>(null);
  const [items, setItems] = useState<GalleryItem[] | "loading" | "error">("loading");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const eventId = sp.get("eventId") ?? "";
  const categoryId = sp.get("categoryId") ?? "";

  const setQuery = useCallback(
    (next: { eventId?: string; categoryId?: string }) => {
      const p = new URLSearchParams();
      const e = next.eventId !== undefined ? next.eventId : eventId;
      const c = next.categoryId !== undefined ? next.categoryId : categoryId;
      if (e) p.set("eventId", e);
      if (c) p.set("categoryId", c);
      const q = p.toString();
      router.push(q ? `${pathname}?${q}` : pathname, { scroll: false });
    },
    [router, pathname, eventId, categoryId],
  );

  useEffect(() => {
    let cancel = false;
    fetch("/api/public/events")
      .then((r) => (r.ok ? r.json() : []))
      .then((d: PublicEvent[]) => {
        if (!cancel) setEvents(Array.isArray(d) ? d : []);
      })
      .catch(() => {
        if (!cancel) setEvents([]);
      });
    return () => {
      cancel = true;
    };
  }, []);

  useEffect(() => {
    let cancel = false;
    const u = new URL("/api/public/categories", window.location.origin);
    if (eventId) u.searchParams.set("eventId", eventId);
    fetch(u.toString())
      .then((r) => (r.ok ? r.json() : []))
      .then((d: PublicCategory[]) => {
        if (!cancel) setCategories(Array.isArray(d) ? d : []);
      })
      .catch(() => {
        if (!cancel) setCategories([]);
      });
    return () => {
      cancel = true;
    };
  }, [eventId]);

  useEffect(() => {
    let cancel = false;
    setItems("loading");
    const u = new URL("/api/public/gallery", window.location.origin);
    if (eventId) u.searchParams.set("eventId", eventId);
    if (categoryId) u.searchParams.set("categoryId", categoryId);
    fetch(u.toString())
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("fetch"))))
      .then((d: GalleryItem[]) => {
        if (!cancel) setItems(Array.isArray(d) ? d : []);
      })
      .catch(() => {
        if (!cancel) setItems("error");
      });
    return () => {
      cancel = true;
    };
  }, [eventId, categoryId]);

  const list = useMemo(() => (items === "loading" || items === "error" ? [] : items), [items]);

  const close = useCallback(() => setOpenIndex(null), []);
  const showPrev = useCallback(() => {
    setOpenIndex((i) => (i === null ? i : i === 0 ? list.length - 1 : i - 1));
  }, [list.length]);
  const showNext = useCallback(() => {
    setOpenIndex((i) => (i === null ? i : i === list.length - 1 ? 0 : i + 1));
  }, [list.length]);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [openIndex, close, showPrev, showNext]);

  return (
    <>
      <Section
        id="gallery"
        className="border-b border-mkf-border bg-mkf-hero-tint"
        wideHeader
        eyebrow="Community"
        eyebrowIcon={ImageIcon}
        title="Gallery"
        intro="Browse photos from programs and events. Use the filters to focus on a specific campaign or category."
      >
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
          <label className="block min-w-[200px]">
            <span className="text-sm font-medium text-mkf-ink">Event</span>
            <select
              className="mt-1 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
              value={eventId}
              onChange={(e) => {
                const v = e.target.value;
                setQuery({ eventId: v, categoryId: "" });
              }}
            >
              <option value="">All events</option>
              {(events ?? []).map((ev) => (
                <option key={ev._id} value={ev._id}>
                  {ev.title}
                </option>
              ))}
            </select>
          </label>
          <label className="block min-w-[200px]">
            <span className="text-sm font-medium text-mkf-ink">Category</span>
            <select
              className="mt-1 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
              value={categoryId}
              onChange={(e) => setQuery({ categoryId: e.target.value })}
            >
              <option value="">All categories</option>
              {(categories ?? []).map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        {items === "loading" && <p className="text-mkf-muted">Loading photos…</p>}
        {items === "error" && (
          <p className="text-sm text-amber-800 dark:text-amber-200/90">Could not load the gallery. Try again later.</p>
        )}
        {items !== "loading" && items !== "error" && list.length === 0 && (
          <Card className="p-8 text-center text-mkf-muted">No images match these filters yet.</Card>
        )}
        {list.length > 0 && (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
            {list.map((item, index) => {
              const src = item.thumbnailUrl && item.thumbnailUrl.startsWith("http") ? item.thumbnailUrl : item.url;
              return (
                <li key={item._id}>
                  <button
                    type="button"
                    className="group relative aspect-[4/3] w-full overflow-hidden rounded-md border border-mkf-border bg-mkf-bg text-left shadow-[0_1px_0_rgba(15,23,42,0.04)] transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mkf-primary hover:ring-2 hover:ring-mkf-primary/30"
                    onClick={() => setOpenIndex(index)}
                    aria-label={`Open image: ${item.title}`}
                  >
                    <Image
                      src={src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </Section>

      {openIndex !== null && list[openIndex] && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[color-mix(in_oklab,var(--mkf-ink)_82%,black)] p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image"
        >
          <button type="button" className="absolute inset-0 cursor-default" aria-label="Close" onClick={close} />
          <div className="relative z-[101] flex max-h-[min(90vh,900px)] w-full max-w-[min(96vw,1200px)] flex-col items-center gap-4">
            <div className="relative aspect-[4/3] w-full max-h-[80vh]">
              <Image
                src={list[openIndex].url}
                alt={list[openIndex].alt}
                fill
                className="object-contain"
                sizes="96vw"
                priority
              />
            </div>
            <div className="flex w-full flex-wrap items-center justify-between gap-3 px-1">
              <p className="text-sm text-white/90">
                {openIndex + 1} / {list.length}
                {list[openIndex].title && (
                  <span className="ml-2 block text-xs text-white/75">{list[openIndex].title}</span>
                )}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="rounded-md border border-white/30 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    showPrev();
                  }}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="rounded-md border border-white/30 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    showNext();
                  }}
                >
                  Next
                </button>
                <button
                  type="button"
                  className="rounded-md border border-white/40 bg-white/90 px-4 py-2 text-sm font-semibold text-mkf-ink"
                  onClick={(e) => {
                    e.stopPropagation();
                    close();
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
