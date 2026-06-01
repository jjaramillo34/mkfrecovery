/** Eager load first row(s) for LCP; defaults to ~2 rows at 4 columns. */
export function galleryImageLoadProps(index: number, total: number, eagerThrough = 8) {
  const eagerCap = Math.min(total, eagerThrough);
  if (index === 0) {
    return { priority: true, loading: "eager" as const };
  }
  if (index < eagerCap) {
    return { loading: "eager" as const };
  }
  return { loading: "lazy" as const };
}
