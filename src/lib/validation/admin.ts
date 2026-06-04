import { z } from "zod";
import { ObjectId } from "mongodb";

const objectIdString = z
  .string()
  .refine((s) => ObjectId.isValid(s), "Invalid id");

export const createEventSchema = z.object({
  title: z.string().min(1).max(300),
  slug: z
    .string()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens"),
  description: z.string().max(20000).optional().default(""),
  startDate: z.string().max(32).optional().or(z.literal("")).transform((v) => v || undefined),
  endDate: z.string().max(32).optional().or(z.literal("")).transform((v) => v || undefined),
  givebutterUrl: z.string().url().max(2000).or(z.literal("")),
  isActive: z.boolean().optional().default(true),
  useForDonate: z.boolean().optional().default(false),
});

export const updateEventSchema = z.object({
  _id: objectIdString,
  title: z.string().min(1).max(300).optional(),
  slug: z
    .string()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .optional(),
  description: z.string().max(20000).optional(),
  startDate: z.string().max(32).optional().or(z.literal("")).transform((v) => (v === "" ? undefined : v)),
  endDate: z.string().max(32).optional().or(z.literal("")).transform((v) => (v === "" ? undefined : v)),
  givebutterUrl: z.string().url().max(2000).or(z.literal("")).optional(),
  isActive: z.boolean().optional(),
  useForDonate: z.boolean().optional(),
});

export const createCategorySchema = z.object({
  name: z.string().min(1).max(120),
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens"),
  order: z.number().int().min(0).max(1_000_000).optional().default(0),
  eventId: z.string().optional().nullable().default(null),
});

export const updateCategorySchema = z.object({
  _id: objectIdString,
  name: z.string().min(1).max(120).optional(),
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .optional(),
  order: z.number().int().min(0).max(1_000_000).optional(),
  eventId: z.string().optional().nullable(),
});

export const createGalleryItemSchema = z.object({
  fileId: z.string().min(1).max(500),
  filePath: z.string().max(2000).optional().default(""),
  url: z.string().url().max(2000),
  /** Empty string omits; ImageKit may omit for some assets */
  thumbnailUrl: z
    .union([z.string().url().max(2000), z.literal("")])
    .optional()
    .transform((v) => (v && v.length > 0 ? v : undefined)),
  width: z.number().int().optional(),
  height: z.number().int().optional(),
  title: z.string().min(1).max(300),
  alt: z.string().min(1).max(500),
  categoryId: objectIdString,
  eventId: z.string().optional().nullable().default(null),
  order: z.number().int().min(0).max(1_000_000).optional().default(0),
});

export const updateGalleryItemSchema = z.object({
  _id: objectIdString,
  title: z.string().min(1).max(300).optional(),
  alt: z.string().min(1).max(500).optional(),
  categoryId: objectIdString.optional(),
  eventId: z.string().optional().nullable(),
  order: z.number().int().min(0).max(1_000_000).optional(),
});

export const reorderGalleryItemsSchema = z.object({
  items: z
    .array(
      z.object({
        _id: objectIdString,
        order: z.number().int().min(0).max(1_000_000),
      }),
    )
    .min(1)
    .max(500),
});

export const gallerySettingsSchema = z.object({
  maxImages: z.number().int().min(1).max(200).optional(),
  layout: z.enum(["compact", "standard", "wide"]).optional(),
  aspectRatio: z.enum(["4/3", "1/1", "16/9"]).optional(),
  showEventFilters: z.boolean().optional(),
  showCategoryFilters: z.boolean().optional(),
  intro: z.string().max(500).optional(),
});

const slugSchema = z
  .string()
  .min(1)
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens");

const paragraphSchema = z.string().min(1).max(5000);

export const createTestimonialSchema = z.object({
  slug: slugSchema,
  heading: z.string().min(1).max(300),
  paragraphs: z.array(paragraphSchema).min(1).max(10),
  name: z.string().min(1).max(120),
  location: z.string().min(1).max(120),
  published: z.boolean().optional().default(false),
  order: z.number().int().min(0).max(1_000_000).optional().default(0),
});

export const updateTestimonialSchema = z.object({
  _id: objectIdString,
  slug: slugSchema.optional(),
  heading: z.string().min(1).max(300).optional(),
  paragraphs: z.array(paragraphSchema).min(1).max(10).optional(),
  name: z.string().min(1).max(120).optional(),
  location: z.string().min(1).max(120).optional(),
  published: z.boolean().optional(),
  order: z.number().int().min(0).max(1_000_000).optional(),
});

export const reorderTestimonialsSchema = z.object({
  items: z
    .array(
      z.object({
        _id: objectIdString,
        order: z.number().int().min(0).max(1_000_000),
      }),
    )
    .min(1)
    .max(100),
});

export const createNewsletterSubscriberSchema = z.object({
  email: z.string().trim().email().max(320),
});

export const updateNewsletterSubscriberSchema = z.object({
  _id: objectIdString,
  subscribed: z.boolean(),
});
