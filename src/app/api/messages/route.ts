import { errorJson, okJson, sanitizeText, validationError } from "@/lib/api";
import { getServerUser } from "@/lib/supabase-server";
import { messageCreateSchema } from "@/lib/validation";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const jobId = url.searchParams.get("job_id");
  const { supabase, user } = await getServerUser();

  if (!supabase) {
    return errorJson("SUPABASE_NOT_CONFIGURED", "Supabase no esta configurado.", 503);
  }

  if (!user || !jobId) {
    return errorJson("AUTH_OR_JOB_REQUIRED", "Sesion y trabajo requeridos.", 401);
  }

  const { data, error } = await supabase
    .from("ej_job_messages")
    .select("id,job_id,sender_id,body,created_at")
    .eq("job_id", jobId)
    .order("created_at", { ascending: true });

  if (error) {
    return errorJson("MESSAGES_READ_FAILED", "No se pudieron cargar mensajes.", 500);
  }

  return okJson({ messages: data ?? [] });
}

export async function POST(request: Request) {
  try {
    const input = messageCreateSchema.parse(await request.json());
    const { supabase, user } = await getServerUser();

    if (!supabase) {
      return errorJson("SUPABASE_NOT_CONFIGURED", "Supabase no esta configurado.", 503);
    }

    if (!user) {
      return errorJson("AUTH_REQUIRED", "Inicia sesion para enviar mensajes.", 401);
    }

    const { data, error } = await supabase
      .from("ej_job_messages")
      .insert({ job_id: input.job_id, sender_id: user.id, body: sanitizeText(input.body) })
      .select("id")
      .single();

    if (error || !data) {
      return errorJson("MESSAGE_CREATE_FAILED", "No se pudo enviar el mensaje.", 403);
    }

    return okJson({ message: data }, { status: 201 });
  } catch (error) {
    return validationError(error);
  }
}
