import { z } from "zod";

const safeText = (min: number, max: number) => z.string().trim().min(min).max(max);

export const contactSchema = z.object({
  name: safeText(2, 120),
  email: z.string().trim().email().max(180),
  message: safeText(10, 5000),
});

export const jobCreateSchema = z.object({
  title: safeText(4, 140),
  description: safeText(20, 5000),
  location_text: safeText(2, 180),
  budget_uyu: z.number().int().min(0).max(10000000).nullable().optional(),
});

export const jobPatchSchema = z.object({
  title: safeText(4, 140).optional(),
  description: safeText(20, 5000).optional(),
  location_text: safeText(2, 180).optional(),
  budget_uyu: z.number().int().min(0).max(10000000).nullable().optional(),
  status: z.enum(["draft", "open", "applied", "accepted", "in_progress", "completed", "cancelled", "disputed"]).optional(),
});

export const applicationCreateSchema = z.object({
  job_id: z.string().uuid(),
  message: safeText(10, 1600),
  proposed_amount_uyu: z.number().int().min(0).max(10000000).nullable().optional(),
});

export const applicationPatchSchema = z.object({
  action: z.enum(["accept", "reject", "withdraw"]),
});

export const messageCreateSchema = z.object({
  job_id: z.string().uuid(),
  body: safeText(1, 2000),
});

export const profilePatchSchema = z.object({
  full_name: safeText(2, 160),
  phone: z.string().trim().max(80).optional(),
  city: z.string().trim().max(120).optional(),
});
