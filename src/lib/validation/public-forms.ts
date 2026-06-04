import { z } from "zod";

export const contactFormSchema = z.object({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(320),
  role: z.enum(["family", "educator", "affected", "partner", "other"]),
  message: z.string().trim().min(1).max(10_000),
});

export const volunteerFormSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  interests: z.string().trim().min(1).max(5_000),
  availability: z
    .string()
    .trim()
    .max(500)
    .optional()
    .or(z.literal(""))
    .transform((v) => v || undefined),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type VolunteerFormInput = z.infer<typeof volunteerFormSchema>;

export const CONTACT_ROLE_LABELS: Record<ContactFormInput["role"], string> = {
  family: "Parent or caregiver",
  educator: "Educator or organizational staff",
  affected: "Person in recovery or seeking help",
  partner: "Community partner",
  other: "Other",
};
