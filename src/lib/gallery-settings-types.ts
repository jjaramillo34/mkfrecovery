/** Client-safe gallery display settings (no MongoDB). */
export type GalleryLayout = "compact" | "standard" | "wide";
export type GalleryAspectRatio = "4/3" | "1/1" | "16/9";

export type PublicGallerySettings = {
  maxImages: number;
  layout: GalleryLayout;
  aspectRatio: GalleryAspectRatio;
  showEventFilters: boolean;
  showCategoryFilters: boolean;
  /** Empty string = use the default intro on the gallery page. */
  intro: string;
};

export const DEFAULT_GALLERY_SETTINGS: PublicGallerySettings = {
  maxImages: 50,
  layout: "standard",
  aspectRatio: "4/3",
  showEventFilters: true,
  showCategoryFilters: true,
  intro: "",
};

export const GALLERY_LAYOUT_GRID_CLASS: Record<GalleryLayout, string> = {
  compact: "grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5 lg:gap-3",
  standard: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4",
  wide: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5",
};

export const GALLERY_ASPECT_CLASS: Record<GalleryAspectRatio, string> = {
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
  "16/9": "aspect-video",
};

/** Eager-load first row(s) based on layout column count at lg breakpoint. */
export function galleryEagerCount(layout: GalleryLayout, total: number): number {
  const cols = layout === "compact" ? 5 : layout === "wide" ? 3 : 4;
  return Math.min(total, cols * 2);
}
