import type { Metadata } from "next";
import { Suspense } from "react";
import { GalleryView } from "@/components/gallery/gallery-view";
import { createMetadata } from "@/lib/metadata";
import {
  fetchPublicGalleryCategories,
  fetchPublicGalleryEvents,
  fetchPublicGalleryPage,
} from "@/lib/public-gallery";

export const metadata: Metadata = createMetadata({
  title: "Gallery",
  description:
    "Photos from the Michael Kellermann Foundation community—programs, events, and the spaces we build with partners.",
  path: "/gallery",
});

function GalleryFallback() {
  return (
    <div className="border-b border-mkf-border bg-mkf-hero-tint py-16 text-center text-mkf-muted">
      Loading gallery…
    </div>
  );
}

export default async function GalleryPage() {
  const [galleryPage, initialEvents, initialCategories] = await Promise.all([
    fetchPublicGalleryPage(),
    fetchPublicGalleryEvents(),
    fetchPublicGalleryCategories(),
  ]);

  return (
    <Suspense fallback={<GalleryFallback />}>
      <GalleryView
        initialItems={galleryPage.items}
        initialTotal={galleryPage.total}
        initialLimit={galleryPage.limit}
        initialSettings={galleryPage.settings}
        initialEvents={initialEvents}
        initialCategories={initialCategories}
      />
    </Suspense>
  );
}
