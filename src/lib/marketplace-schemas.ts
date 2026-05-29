import { z } from "zod";
import { categories } from "@/lib/expressjobs-data";

const requiredText = (label: string, min = 2) =>
  z.string().trim().min(min, `${label} es obligatorio`).max(800, `${label} es demasiado largo`);

const optionalText = (max = 800) => z.string().trim().max(max).optional().or(z.literal(""));

const commaList = z
  .string()
  .trim()
  .transform((value) =>
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
  );

export const workerProfileSchema = z.object({
  fullName: requiredText("Nombre"),
  phone: requiredText("Telefono", 6),
  city: requiredText("Ciudad"),
  headline: requiredText("Titulo de perfil", 6),
  bio: requiredText("Experiencia", 12),
  skills: commaList.refine((items) => items.length > 0, "Agrega al menos una habilidad"),
  serviceRadiusKm: z.coerce.number().int().min(1).max(100),
  hourlyRateUyu: z.coerce.number().int().min(0).optional().nullable(),
});

export const companyProfileSchema = z.object({
  fullName: requiredText("Nombre visible"),
  phone: requiredText("Telefono", 6),
  city: requiredText("Ciudad"),
  companyName: requiredText("Empresa o persona"),
  companyType: z.enum(["individual", "business"]),
  businessCategory: requiredText("Rubro"),
  contactPhone: requiredText("Telefono de contacto", 6),
  description: requiredText("Descripcion", 12),
});

export const jobPostSchema = z.object({
  title: requiredText("Titulo", 6),
  category: z.enum(categories),
  description: requiredText("Descripcion", 20),
  location: requiredText("Ubicacion", 3),
  city: requiredText("Ciudad", 2),
  neighborhood: optionalText(120),
  addressPrivate: optionalText(240),
  budgetUyu: z.coerce.number().int().min(0).optional().nullable(),
  urgency: z.enum(["normal", "urgent"]).default("normal"),
  startsAt: optionalText(80),
  requirements: optionalText(1200),
});

export const applicationSchema = z.object({
  message: requiredText("Mensaje", 12),
  proposedAmountUyu: z.coerce.number().int().min(0).optional().nullable(),
});

export type WorkerProfileInput = z.infer<typeof workerProfileSchema>;
export type CompanyProfileInput = z.infer<typeof companyProfileSchema>;
export type JobPostInput = z.infer<typeof jobPostSchema>;
export type ApplicationInput = z.infer<typeof applicationSchema>;
