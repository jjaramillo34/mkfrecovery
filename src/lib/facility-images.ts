/** Paths under /public/images — facility1.jpg … facility10.jpg */
export const FACILITY_IMAGE_PATHS = Array.from({ length: 10 }, (_, i) => ({
  src: `/images/facility${i + 1}.jpg` as const,
  alt: `Affiliated treatment facility — photo ${i + 1}`,
}));
