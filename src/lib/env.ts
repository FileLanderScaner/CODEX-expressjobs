import { z } from "zod";

const publicEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_ENABLE_GOOGLE_LOGIN: z.enum(["true", "false"]).default("false").transform((value) => value === "true"),
  NEXT_PUBLIC_ENABLE_FACEBOOK_LOGIN: z.enum(["true", "false"]).default("false").transform((value) => value === "true"),
  NEXT_PUBLIC_ENABLE_INSTAGRAM_LOGIN: z.enum(["true", "false"]).default("false").transform((value) => value === "true"),
  APP_ENV: z.enum(["local", "preview", "staging", "production"]).default("preview"),
});

export const publicEnv = publicEnvSchema.parse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_ENABLE_GOOGLE_LOGIN: process.env.NEXT_PUBLIC_ENABLE_GOOGLE_LOGIN,
  NEXT_PUBLIC_ENABLE_FACEBOOK_LOGIN: process.env.NEXT_PUBLIC_ENABLE_FACEBOOK_LOGIN,
  NEXT_PUBLIC_ENABLE_INSTAGRAM_LOGIN: process.env.NEXT_PUBLIC_ENABLE_INSTAGRAM_LOGIN,
  APP_ENV: process.env.APP_ENV,
});

export function isSupabaseConfigured() {
  return Boolean(publicEnv.NEXT_PUBLIC_SUPABASE_URL && publicEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export function productionStatus() {
  return "NO-GO_PRODUCTION";
}
