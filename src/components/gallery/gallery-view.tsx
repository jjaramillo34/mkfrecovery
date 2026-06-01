"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarDays, ImageIcon, LayoutGrid, Sparkles, X, type LucideIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { galleryImageLoadProps } from "@/lib/gallery-image-props";
import {
  GALLERY_ASPECT_CLASS,
  GALLERY_LAYOUT_GRID_CLASS,
  DEFAULT_GALLERY_SETTINGS,
  galleryEagerCount,
  type PublicGallerySettings,
} from "@/lib/gallery-settings-types";
import type {
  PublicGalleryCategory,
  PublicGalleryEvent,
  PublicGalleryItem,
} from "@/lib/gallery-types";

type GalleryItem = PublicGalleryItem;
type PublicEvent = PublicGalleryEvent;
type PublicCategory = PublicGalleryCategory;

function FilterChip({
  active,
  onClick,
  children,
  icon: Icon,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon?: LucideIcon;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mkf-accent ${
        active
          ? "border-mkf-accent bg-mkf-accent text-mkf-accent-fg shadow-sm"
          : "border-mkf-border bg-mkf-surface text-mkf-muted hover:border-mkf-teal/40 hover:bg-mkf-bg hover:text-mkf-ink"
      }`}
    >
      {Icon && <Icon className="h-3.5 w-3.5 opacity-80" aria-hidden />}
      {children}
    </button>
  );
}

function GallerySkeleton() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <li
          key={i}
          className="aspect-[4/3] animate-pulse rounded-xl border border-mkf-border bg-mkf-surface"
        />
      ))}
    </ul>
  );
}

const DEFAULT_INTRO =
  "Browse photos from programs and events. Tap a filter to explore a campaign or category.";

type GalleryFetchResult = {
  items: PublicGalleryItem[];
  total: number;
  limit: number;
};

export function GalleryView({
  initialItems,
  initialEvents,
  initialCategories,
  initialSettings,
  initialTotal,
  initialLimit,
}: {
  initialItems?: PublicGalleryItem[];
  initialEvents?: PublicGalleryEvent[];
  initialCategories?: PublicGalleryCategory[];
  initialSettings?: PublicGallerySettings;
  initialTotal?: number;
  initialLimit?: number;
} = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const reduceMotion = useReducedMotion();
  const [events, setEvents] = useState<PublicEvent[] | null>(initialEvents ?? null);
  const [categories, setCategories] = useState<PublicCategory[] | null>(initialCategories ?? null);
  const [items, setItems] = useState<GalleryItem[] | "loading" | "error">(
    initialItems ?? "loading",
  );
  const [total, setTotal] = useState(initialTotal ?? initialItems?.length ?? 0);
  const [limit, setLimit] = useState(initialLimit ?? initialSettings?.maxImages ?? DEFAULT_GALLERY_SETTINGS.maxImages);
  const [settings, setSettings] = useState<PublicGallerySettings>(
    initialSettings ?? DEFAULT_GALLERY_SETTINGS,
  );
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

  const clearFilters = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [router, pathname]);

  useEffect(() => {
    if (initialSettings) return;
    let cancel = false;
    fetch("/api/public/gallery/settings")
      .then((r) => (r.ok ? r.json() : DEFAULT_GALLERY_SETTINGS))
      .then((d: PublicGallerySettings) => {
        if (!cancel) setSettings({ ...DEFAULT_GALLERY_SETTINGS, ...d });
      })
      .catch(() => {
        if (!cancel) setSettings(DEFAULT_GALLERY_SETTINGS);
      });
    return () => {
      cancel = true;
    };
  }, [initialSettings]);

  useEffect(() => {
    if (initialEvents) return;
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
  }, [initialEvents]);

  useEffect(() => {
    let cancel = false;
    if (!eventId && initialCategories) {
      setCategories(initialCategories);
      return () => {
        cancel = true;
      };
    }
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
  }, [eventId, initialCategories]);

  useEffect(() => {
    let cancel = false;
    if (!eventId && !categoryId && initialItems) {
      setItems(initialItems);
      if (initialTotal !== undefined) setTotal(initialTotal);
      if (initialLimit !== undefined) setLimit(initialLimit);
      return () => {
        cancel = true;
      };
    }
    setItems("loading");
    const u = new URL("/api/public/gallery", window.location.origin);
    if (eventId) u.searchParams.set("eventId", eventId);
    if (categoryId) u.searchParams.set("categoryId", categoryId);
    fetch(u.toString())
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("fetch"))))
      .then((d: GalleryFetchResult) => {
        if (!cancel) {
          setItems(Array.isArray(d.items) ? d.items : []);
          setTotal(typeof d.total === "number" ? d.total : 0);
          setLimit(typeof d.limit === "number" ? d.limit : settings.maxImages);
        }
      })
      .catch(() => {
        if (!cancel) setItems("error");
      });
    return () => {
      cancel = true;
    };
  }, [eventId, categoryId, initialItems, initialTotal, initialLimit, settings.maxImages]);

  const list = useMemo(() => (items === "loading" || items === "error" ? [] : items), [items]);
  const hasFilters = Boolean(eventId || categoryId);
  const activeEventLabel = events?.find((e) => e._id === eventId)?.title;
  const activeCategoryLabel = categories?.find((c) => c._id === categoryId)?.name;
  const introText = settings.intro.trim() || DEFAULT_INTRO;
  const eagerThrough = galleryEagerCount(settings.layout, list.length);
  const isTruncated = total > list.length;

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

  const gridMotion = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, scale: 0.96 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.96 },
        transition: { duration: 0.25 },
      };

  const gridMotionFor = (index: number) => (index < eagerThrough ? {} : gridMotion);

  return (
    <>
      <Section
        id="gallery"
        className="border-b border-mkf-border bg-mkf-hero-tint"
        wideHeader
        eyebrow="Community"
        eyebrowIcon={ImageIcon}
        title="Gallery"
        intro={introText}
      >
        <div className="mb-8 space-y-5">
          {settings.showEventFilters && (events?.length ?? 0) > 0 && (
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-mkf-teal">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                Events
              </p>
              <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <FilterChip active={!eventId} onClick={() => setQuery({ eventId: "", categoryId: "" })}>
                  All events
                </FilterChip>
                {(events ?? []).map((ev) => (
                  <FilterChip
                    key={ev._id}
                    active={eventId === ev._id}
                    onClick={() => setQuery({ eventId: ev._id, categoryId: "" })}
                  >
                    {ev.title}
                  </FilterChip>
                ))}
              </div>
            </div>
          )}

          {settings.showCategoryFilters && (categories?.length ?? 0) > 0 && (
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-mkf-teal">
                <LayoutGrid className="h-3.5 w-3.5" aria-hidden />
                Categories
              </p>
              <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <FilterChip active={!categoryId} onClick={() => setQuery({ categoryId: "" })}>
                  All categories
                </FilterChip>
                {(categories ?? []).map((c) => (
                  <FilterChip
                    key={c._id}
                    active={categoryId === c._id}
                    onClick={() => setQuery({ categoryId: c._id })}
                  >
                    {c.name}
                  </FilterChip>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-mkf-border/80 pt-4">
            <p className="text-sm text-mkf-muted">
              {items === "loading" ? (
                "Loading photos…"
              ) : items === "error" ? (
                "Could not load photos"
              ) : (
                <>
                  Showing{" "}
                  <span className="font-semibold text-mkf-ink">{list.length}</span>
                  {total > list.length ? (
                    <>
                      {" "}
                      of <span className="font-semibold text-mkf-ink">{total}</span>
                    </>
                  ) : null}
                  {total === 1 ? " photo" : " photos"}
                  {hasFilters && " matching your filters"}
                  {isTruncated && (
                    <span className="block text-xs text-mkf-muted/90">
                      Showing the first {limit} photos for faster loading.
                    </span>
                  )}
                </>
              )}
            </p>
            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1.5 rounded-full border border-mkf-border bg-mkf-surface px-3 py-1.5 text-xs font-medium text-mkf-muted transition-colors hover:border-mkf-teal/40 hover:text-mkf-ink"
              >
                <X className="h-3.5 w-3.5" aria-hidden />
                Clear filters
                {(activeEventLabel || activeCategoryLabel) && (
                  <span className="text-mkf-teal">
                    · {[activeEventLabel, activeCategoryLabel].filter(Boolean).join(" · ")}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>

        {items === "loading" && <GallerySkeleton />}
        {items === "error" && (
          <Card className="p-8 text-center text-amber-800 dark:text-amber-200/90">
            Could not load the gallery. Try again later.
          </Card>
        )}
        {items !== "loading" && items !== "error" && list.length === 0 && (
          <Card className="flex flex-col items-center gap-3 p-10 text-center">
            <Sparkles className="h-8 w-8 text-mkf-teal/60" aria-hidden />
            <p className="font-display text-lg font-semibold text-mkf-ink">No photos here yet</p>
            <p className="max-w-sm text-sm text-mkf-muted">
              {hasFilters
                ? "Try another event or category, or clear filters to see everything."
                : "Check back soon as new images are added from programs and events."}
            </p>
            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-1 text-sm font-semibold text-mkf-accent hover:underline"
              >
                View all photos
              </button>
            )}
          </Card>
        )}
        {list.length > 0 && (
          <motion.ul
            layout={!reduceMotion}
            className={GALLERY_LAYOUT_GRID_CLASS[settings.layout]}
          >
            <AnimatePresence mode="popLayout">
              {list.map((item, index) => {
                const src =
                  item.thumbnailUrl && item.thumbnailUrl.startsWith("http")
                    ? item.thumbnailUrl
                    : item.url;
                return (
                  <motion.li key={item._id} layout={!reduceMotion && index >= eagerThrough} {...gridMotionFor(index)}>
                    <button
                      type="button"
                      className={`group relative ${GALLERY_ASPECT_CLASS[settings.aspectRatio]} w-full overflow-hidden rounded-xl border border-mkf-border bg-mkf-bg text-left shadow-[0_2px_12px_rgba(15,23,42,0.06)] transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mkf-accent hover:shadow-[0_8px_24px_rgba(15,23,42,0.12)] hover:ring-2 hover:ring-mkf-primary/20`}
                      onClick={() => setOpenIndex(index)}
                      aria-label={`Open image: ${item.title}`}
                    >
                      <Image
                        src={src}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        {...galleryImageLoadProps(index, list.length, eagerThrough)}
                      />
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color-mix(in_oklab,var(--mkf-ink)_75%,transparent)] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
                      <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-1 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                        <span className="line-clamp-2 text-left text-sm font-medium leading-snug text-white">
                          {item.title}
                        </span>
                      </span>
                    </button>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </motion.ul>
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
