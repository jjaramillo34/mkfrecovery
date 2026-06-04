export type RecoveryTestimonial = {
  id: string;
  heading: string;
  paragraphs: string[];
  name: string;
  location: string;
};

export type AdminTestimonialRow = RecoveryTestimonial & {
  _id: string;
  slug: string;
  published: boolean;
  order: number;
};
