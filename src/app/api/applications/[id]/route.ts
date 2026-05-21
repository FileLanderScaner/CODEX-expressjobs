import { errorJson, okJson, validationError } from "@/lib/api";
import { getServerUser } from "@/lib/supabase-server";
import { applicationPatchSchema } from "@/lib/validation";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const input = applicationPatchSchema.parse(await request.json());
    const { supabase, user } = await getServerUser();

    if (!supabase) {
      return errorJson("SUPABASE_NOT_CONFIGURED", "Supabase no esta configurado.", 503);
    }

    if (!user) {
      return errorJson("AUTH_REQUIRED", "Inicia sesion para gestionar postulaciones.", 401);
    }

    if (input.action === "accept" || input.action === "reject") {
      const rpcName = input.action === "accept" ? "ej_accept_job_application" : "ej_reject_job_application";
      const { data, error } = await supabase.rpc(rpcName, { requested_application_id: id });

      if (error) {
        return errorJson("APPLICATION_ACTION_FAILED", "No se pudo procesar la postulacion.", 403);
      }

      return okJson({ application: data });
    }

    const { data, error } = await supabase
      .from("ej_job_applications")
      .update({ status: "withdrawn", updated_at: new Date().toISOString() })
      .eq("id", id)
      .eq("worker_id", user.id)
      .eq("status", "submitted")
      .select("id,status")
      .maybeSingle();

    if (error) {
      return errorJson("APPLICATION_WITHDRAW_FAILED", "No se pudo retirar la postulacion.", 500);
    }

    if (!data) {
      return errorJson("FORBIDDEN_OR_NOT_FOUND", "No se puede retirar esta postulacion.", 403);
    }

    return okJson({ application: data });
  } catch (error) {
    return validationError(error);
  }
}
