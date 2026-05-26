import { createServerClient } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { isSupabaseConfigured, publicEnv } from "@/lib/env";

export type AccountProfile = {
  id: string;
  role: "client" | "worker" | "admin";
  full_name: string;
  phone: string | null;
  city: string | null;
  created_at: string | null;
};

export async function getServerSupabaseClient() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient(
    publicEnv.NEXT_PUBLIC_SUPABASE_URL!,
    publicEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          for (const cookieToSet of cookiesToSet) {
            cookieStore.set(cookieToSet.name, cookieToSet.value, cookieToSet.options);
          }
        },
      },
    },
  );
}

export async function getCurrentUser() {
  const supabase = await getServerSupabaseClient();

  if (!supabase) {
    return null;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function getCurrentProfile() {
  const supabase = await getServerSupabaseClient();

  if (!supabase) {
    return null;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data } = await supabase
    .from("ej_profiles")
    .select("id,role,full_name,phone,city,created_at")
    .eq("id", user.id)
    .maybeSingle<AccountProfile>();

  return data ?? null;
}

export async function requireUser() {
  const user = await getCurrentUser();
  return user;
}

export async function requireProfile() {
  const profile = await getCurrentProfile();
  return profile;
}

export function getDisplayName(user: User | null, profile?: AccountProfile | null) {
  if (profile?.full_name?.trim()) {
    return profile.full_name.trim();
  }

  const metadataName = user?.user_metadata.name;
  if (typeof metadataName === "string" && metadataName.trim()) {
    return metadataName.trim();
  }

  return user ? "Mi cuenta" : "Ingresar";
}

export function getLoginProvider(user: User | null) {
  const provider = user?.app_metadata.provider;
  return typeof provider === "string" && provider ? provider : null;
}

export async function getAccountNavState() {
  const supabase = await getServerSupabaseClient();

  if (!supabase) {
    return {
      isSignedIn: false,
      label: "Ingresar",
      href: "/auth",
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      isSignedIn: false,
      label: "Ingresar",
      href: "/auth",
    };
  }

  const { data: profile } = await supabase
    .from("ej_profiles")
    .select("id,role,full_name,phone,city,created_at")
    .eq("id", user.id)
    .maybeSingle<AccountProfile>();

  return {
    isSignedIn: true,
    label: profile?.full_name?.trim() || "Mi cuenta",
    href: "/profile",
    role: profile?.role ?? null,
  };
}
