import { errorJson, okJson, sanitizeText, validationError } from "@/lib/api";
import { getServerUser } from "@/lib/supabase-server";
import { jobPatchSchema } from "@/lib/validation";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const { supabase } = await getServerUser();

  if (!supabase) {
    return errorJson("SUPABASE_NOT_CONFIGURED", "Supabase no esta configurado.", 503);
  }

  const { data, error } = await supabase
    .from("ej_jobs")
    .select("id,title,description,location_text,budget_uyu,status,client_id,accepted_worker_id")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return errorJson("JOB_READ_FAILED", "No se pudo cargar el trabajo.", 500);
  }

  if (!data) {
    return errorJson("NOT_FOUND", "Trabajo no encontrado.", 404);
  }

  return okJson({ job: data });
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const input = jobPatchSchema.parse(await request.json());
    const { supabase, user } = await getServerUser();

    if (!supabase) {
      return errorJson("SUPABASE_NOT_CONFIGURED", "Supabase no esta configurado.", 503);
    }

    if (!user) {
      return errorJson("AUTH_REQUIRED", "Inicia sesion para editar.", 401);
    }

    const patch = {
      ...input,
      title: input.title ? sanitizeText(input.title) : undefined,
      description: input.description ? sanitizeText(input.description) : undefined,
      location_text: input.location_text ? sanitizeText(input.location_text) : undefined,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("ej_jobs")
      .update(patch)
      .eq("id", id)
      .eq("client_id", user.id)
      .select("id")
      .maybeSingle();

    if (error) {
      return errorJson("JOB_UPDATE_FAILED", "No se pudo actualizar el trabajo.", 500);
    }

    if (!data) {
      return errorJson("FORBIDDEN_OR_NOT_FOUND", "No tenes permiso para editar este trabajo.", 403);
    }

    return okJson({ job: data });
  } catch (error) {
    return validationError(error);
  }
}
