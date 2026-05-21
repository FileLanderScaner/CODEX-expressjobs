import { contactSchema } from "@/lib/validation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { errorJson, okJson, sanitizeText, validationError } from "@/lib/api";

export async function POST(request: Request) {
  try {
    const input = contactSchema.parse(await request.json());
    const supabase = await createServerSupabaseClient();

    if (!supabase) {
      return okJson({ fallback: true, status: "CONTACT_CAPTURE_BLOCKED_EXTERNAL_CREDENTIALS" }, { status: 202 });
    }

    const { error } = await supabase.from("ej_job_events").insert({
      event_name: "public_contact_message",
      metadata: {
        name: sanitizeText(input.name),
        email_domain: input.email.split("@")[1] ?? "unknown",
        message_length: input.message.length,
      },
    });

    if (error) {
      return errorJson("CONTACT_WRITE_FAILED", "No se pudo registrar el contacto.", 500);
    }

    return okJson({ received: true }, { status: 201 });
  } catch (error) {
    return validationError(error);
  }
}
