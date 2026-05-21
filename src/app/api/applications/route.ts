import { errorJson, okJson, sanitizeText, validationError } from "@/lib/api";
import { getServerUser } from "@/lib/supabase-server";
import { applicationCreateSchema } from "@/lib/validation";

export async function GET() {
  const { supabase, user } = await getServerUser();

  if (!supabase) {
    return errorJson("SUPABASE_NOT_CONFIGURED", "Supabase no esta configurado.", 503);
  }

  if (!user) {
    return errorJson("AUTH_REQUIRED", "Inicia sesion para ver postulaciones.", 401);
  }

  const { data, error } = await supabase
    .from("ej_job_applications")
    .select("id,job_id,worker_id,message,proposed_amount_uyu,status,created_at")
    .or(`worker_id.eq.${user.id}`)
    .order("created_at", { ascending: false });

  if (error) {
    return errorJson("APPLICATIONS_READ_FAILED", "No se pudieron cargar postulaciones.", 500);
  }

  return okJson({ applications: data ?? [] });
}

export async function POST(request: Request) {
  try {
    const input = applicationCreateSchema.parse(await request.json());
    const { supabase, user } = await getServerUser();

    if (!supabase) {
      return errorJson("SUPABASE_NOT_CONFIGURED", "Supabase no esta configurado.", 503);
    }

    if (!user) {
      return errorJson("AUTH_REQUIRED", "Inicia sesion para postularte.", 401);
    }

    const { data, error } = await supabase
      .from("ej_job_applications")
      .insert({
        job_id: input.job_id,
        worker_id: user.id,
        message: sanitizeText(input.message),
        proposed_amount_uyu: input.proposed_amount_uyu ?? null,
        status: "submitted",
      })
      .select("id")
      .single();

    if (error || !data) {
      return errorJson("APPLICATION_CREATE_FAILED", "No se pudo crear la postulacion.", 500);
    }

    return okJson({ application: data }, { status: 201 });
  } catch (error) {
    return validationError(error);
  }
}
