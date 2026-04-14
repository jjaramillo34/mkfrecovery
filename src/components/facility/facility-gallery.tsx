"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { FACILITY_IMAGE_PATHS } from "@/lib/facility-images";

export function FacilityGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const showPrev = useCallback(() => {
    setOpenIndex((i) => {
      if (i === null) return i;
      return i === 0 ? FACILITY_IMAGE_PATHS.length - 1 : i - 1;
    });
  }, []);
  const showNext = useCallback(() => {
    setOpenIndex((i) => {
      if (i === null) return i;
      return i === FACILITY_IMAGE_PATHS.length - 1 ? 0 : i + 1;
    });
  }, []);

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
    <div className="mt-12">
      <h3 className="font-display text-lg font-semibold text-mkf-ink">Facility gallery</h3>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-mkf-muted">
        A look at calm, welcoming spaces through our partner network.
      </p>
      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
        {FACILITY_IMAGE_PATHS.map((item, index) => (
          <li key={item.src}>
            <button
              type="button"
              className="group relative aspect-[4/3] w-full overflow-hidden rounded-md border border-mkf-border bg-mkf-bg text-left shadow-[0_1px_0_rgba(15,23,42,0.04)] transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mkf-primary hover:ring-2 hover:ring-mkf-primary/30"
              onClick={() => setOpenIndex(index)}
              aria-label={`Open image ${index + 1} in gallery`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </button>
          </li>
        ))}
      </ul>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[color-mix(in_oklab,var(--mkf-ink)_82%,black)] p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Facility photo"
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Close gallery"
            onClick={close}
          />
          <div className="relative z-[101] flex max-h-[min(90vh,900px)] w-full max-w-[min(96vw,1200px)] flex-col items-center gap-4">
            <div className="relative aspect-[4/3] w-full max-h-[80vh]">
              <Image
                src={FACILITY_IMAGE_PATHS[openIndex].src}
                alt={FACILITY_IMAGE_PATHS[openIndex].alt}
                fill
                className="object-contain"
                sizes="96vw"
                priority
              />
            </div>
            <div className="flex w-full flex-wrap items-center justify-between gap-3 px-1">
              <p className="text-sm text-white/90">
                Photo {openIndex + 1} of {FACILITY_IMAGE_PATHS.length}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="rounded-md border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    showPrev();
                  }}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="rounded-md border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    showNext();
                  }}
                >
                  Next
                </button>
                <button
                  type="button"
                  className="rounded-md border border-white/40 bg-white/90 px-4 py-2 text-sm font-semibold text-mkf-ink backdrop-blur-sm transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
    </div>
  );
}
