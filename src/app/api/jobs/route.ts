import { createServerSupabaseClient, getServerUser } from "@/lib/supabase-server";
import { errorJson, okJson, sanitizeText, validationError } from "@/lib/api";
import { jobCreateSchema } from "@/lib/validation";

export async function GET() {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return okJson({ jobs: [], status: "SUPABASE_NOT_CONFIGURED" });
  }

  const { data, error } = await supabase
    .from("ej_jobs")
    .select("id,title,description,location_text,budget_uyu,status,client_id,accepted_worker_id,created_at")
    .eq("status", "open")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    return errorJson("JOBS_READ_FAILED", "No se pudieron cargar trabajos.", 500);
  }

  return okJson({ jobs: data ?? [] });
}

export async function POST(request: Request) {
  try {
    const input = jobCreateSchema.parse(await request.json());
    const { supabase, user } = await getServerUser();

    if (!supabase) {
      return errorJson("SUPABASE_NOT_CONFIGURED", "Supabase no esta configurado.", 503);
    }

    if (!user) {
      return errorJson("AUTH_REQUIRED", "Inicia sesion para publicar.", 401);
    }

    const { data, error } = await supabase
      .from("ej_jobs")
      .insert({
        client_id: user.id,
        title: sanitizeText(input.title),
        description: sanitizeText(input.description),
        location_text: sanitizeText(input.location_text),
        budget_uyu: input.budget_uyu ?? null,
        status: "open",
      })
      .select("id")
      .single();

    if (error || !data) {
      return errorJson("JOB_CREATE_FAILED", "No se pudo crear el trabajo.", 500);
    }

    return okJson({ job: data }, { status: 201 });
  } catch (error) {
    return validationError(error);
  }
}
