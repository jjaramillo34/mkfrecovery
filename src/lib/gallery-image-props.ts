/** First grid row(s): eager load to satisfy LCP (up to 2 rows on a 4-column layout). */
export function galleryImageLoadProps(index: number, total: number) {
  const eagerThrough = Math.min(total, 8);
  if (index === 0) {
    return { priority: true, loading: "eager" as const };
  }
  if (index < eagerThrough) {
    return { loading: "eager" as const };
  }
  return { loading: "lazy" as const };
}
