import type { UserRole } from "@/lib/expressjobs-data";
import { demoProfiles } from "@/lib/expressjobs-data";
import { getBrowserSupabaseClient } from "@/lib/supabase";
import { trackEvent } from "@/lib/tracking";

export async function getCurrentProfile() {
  const supabase = getBrowserSupabaseClient();

  if (!supabase) {
    return demoProfiles[0];
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data } = await supabase.from("ej_profiles").select("*").eq("id", user.id).maybeSingle();
  return data;
}

export function startSignup() {
  return trackEvent("signup_started", { source: "auth_page" });
}

export function completeSignup(role: UserRole) {
  return trackEvent("signup_completed", { role });
}
