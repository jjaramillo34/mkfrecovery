export type PublicGalleryItem = {
  _id: string;
  url: string;
  thumbnailUrl?: string;
  title: string;
  alt: string;
  categoryId: string;
  eventId: string | null;
  order?: number;
};

export type PublicGalleryEvent = { _id: string; title: string; slug: string };
export type PublicGalleryCategory = { _id: string; name: string; slug: string };
