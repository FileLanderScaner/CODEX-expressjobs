import { errorJson, okJson, sanitizeText, validationError } from "@/lib/api";
import { getServerUser } from "@/lib/supabase-server";
import { profilePatchSchema } from "@/lib/validation";

export async function GET() {
  const { supabase, user } = await getServerUser();

  if (!supabase) {
    return errorJson("SUPABASE_NOT_CONFIGURED", "Supabase no esta configurado.", 503);
  }

  if (!user) {
    return errorJson("AUTH_REQUIRED", "Inicia sesion para ver tu perfil.", 401);
  }

  const { data, error } = await supabase
    .from("ej_profiles")
    .select("id,full_name,phone,city,role,reputation_score,completed_jobs")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    return errorJson("PROFILE_READ_FAILED", "No se pudo cargar el perfil.", 500);
  }

  return okJson({ email: user.email ?? null, profile: data });
}

export async function PATCH(request: Request) {
  try {
    const input = profilePatchSchema.parse(await request.json());
    const { supabase, user } = await getServerUser();

    if (!supabase) {
      return errorJson("SUPABASE_NOT_CONFIGURED", "Supabase no esta configurado.", 503);
    }

    if (!user) {
      return errorJson("AUTH_REQUIRED", "Inicia sesion para editar tu perfil.", 401);
    }

    const { data, error } = await supabase
      .from("ej_profiles")
      .update({
        full_name: sanitizeText(input.full_name),
        phone: input.phone ? sanitizeText(input.phone) : null,
        city: input.city ? sanitizeText(input.city) : null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)
      .select("id,full_name,phone,city,role")
      .maybeSingle();

    if (error || !data) {
      return errorJson("PROFILE_UPDATE_FAILED", "No se pudo actualizar el perfil.", 500);
    }

    return okJson({ profile: data });
  } catch (error) {
    return validationError(error);
  }
}
