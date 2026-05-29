"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSupabaseClient } from "@/lib/account";
import {
  assertCanApproveDraft,
  assertCanArchiveDraft,
  assertCanEditDraft,
  assertCanPublishDraft,
  assertCanRejectDraft,
  assertCanSubmitDraftForReview,
  assertPublicCallAdmin,
  PublicCallAdminActionError,
  type PublicCallActionDraftState,
  type PublicCallActionProfile,
} from "@/lib/public-calls-admin-actions-policy";
import type {
  PublicCallAuthorizationStatus,
  PublicCallRobotsReviewStatus,
  PublicCallSourceType,
} from "@/lib/public-calls-admin-queue";

type AdminContext = {
  supabase: Awaited<ReturnType<typeof getServerSupabaseClient>>;
  profile: NonNullable<PublicCallActionProfile>;
};

type RawDraftState = Omit<PublicCallActionDraftState, "public_call_sources"> & {
  source_id: string;
  public_call_sources?: PublicCallActionDraftState["public_call_sources"] | PublicCallActionDraftState["public_call_sources"][];
};

const queuePath = "/admin/llamados-publicos";

function textField(formData: FormData, name: string, fallback = "") {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : fallback;
}

function nullableTextField(formData: FormData, name: string) {
  const value = textField(formData, name);
  return value ? value : null;
}

function requiredTextField(formData: FormData, name: string, label: string) {
  const value = textField(formData, name);
  if (!value) {
    throw new PublicCallAdminActionError("FIELD_REQUIRED", `${label} es obligatorio.`);
  }
  return value;
}

function requiredHttpsUrl(formData: FormData, name: string, label: string) {
  const value = requiredTextField(formData, name, label);
  if (!value.startsWith("https://")) {
    throw new PublicCallAdminActionError("HTTPS_URL_REQUIRED", `${label} debe ser una URL HTTPS.`);
  }
  return value;
}

function nullableHttpsUrl(formData: FormData, name: string, label: string) {
  const value = nullableTextField(formData, name);
  if (value && !value.startsWith("https://")) {
    throw new PublicCallAdminActionError("HTTPS_URL_REQUIRED", `${label} debe ser una URL HTTPS.`);
  }
  return value;
}

function optionalDate(formData: FormData, name: string) {
  const value = nullableTextField(formData, name);
  return value ? value : null;
}

function redirectWith(type: "ok" | "error", code: string): never {
  redirect(`${queuePath}?${type}=${encodeURIComponent(code)}`);
}

async function requireAdminContext(): Promise<AdminContext> {
  const supabase = await getServerSupabaseClient();

  if (!supabase) {
    throw new PublicCallAdminActionError("SUPABASE_NOT_CONFIGURED", "Supabase no esta configurado.");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new PublicCallAdminActionError("AUTH_REQUIRED", "Debes iniciar sesion para operar la cola.");
  }

  const { data: profile, error } = await supabase
    .from("ej_profiles")
    .select("id,role")
    .eq("id", user.id)
    .maybeSingle<NonNullable<PublicCallActionProfile>>();

  if (error) {
    throw new PublicCallAdminActionError("PROFILE_LOOKUP_FAILED", "No se pudo verificar el perfil admin.");
  }

  assertPublicCallAdmin(profile ?? null);

  return { supabase, profile: profile! };
}

async function getDraftState(context: AdminContext, draftId: string) {
  const { data, error } = await context.supabase!
    .from("public_call_drafts")
    .select(
      "id,source_id,review_status,publication_status,source_url,license_name,public_call_sources(authorization_status,robots_review_status,license_name)",
    )
    .eq("id", draftId)
    .single<RawDraftState>();

  if (error || !data) {
    throw new PublicCallAdminActionError("DRAFT_NOT_FOUND", "No se encontro el borrador.");
  }

  return {
    ...data,
    public_call_sources: Array.isArray(data.public_call_sources)
      ? (data.public_call_sources[0] ?? null)
      : (data.public_call_sources ?? null),
  };
}

async function insertAuditEvent(
  context: AdminContext,
  event: {
    source_id?: string | null;
    draft_id?: string | null;
    event_type: string;
    from_status?: string | null;
    to_status?: string | null;
    notes?: string | null;
    metadata?: Record<string, string | null>;
  },
) {
  const { error } = await context.supabase!.from("public_call_review_events").insert({
    source_id: event.source_id ?? null,
    draft_id: event.draft_id ?? null,
    event_type: event.event_type,
    from_status: event.from_status ?? null,
    to_status: event.to_status ?? null,
    actor_id: context.profile.id,
    notes: event.notes ?? null,
    metadata: event.metadata ?? {},
  });

  if (error) {
    throw new PublicCallAdminActionError("AUDIT_WRITE_FAILED", "No se pudo registrar auditoria de la accion.");
  }
}

async function runAction(action: () => Promise<string>) {
  try {
    const status = await action();
    revalidatePath(queuePath);
    redirectWith("ok", status);
  } catch (error) {
    if (error instanceof PublicCallAdminActionError) {
      redirectWith("error", error.code);
    }

    throw error;
  }
}

export async function createPublicCallSourceAction(formData: FormData) {
  await runAction(async () => {
    const context = await requireAdminContext();
    const { error } = await context.supabase!.from("public_call_sources").insert({
      name: requiredTextField(formData, "name", "Nombre"),
      source_type: requiredTextField(formData, "source_type", "Tipo de fuente") as PublicCallSourceType,
      base_url: requiredHttpsUrl(formData, "base_url", "URL oficial"),
      terms_url: nullableHttpsUrl(formData, "terms_url", "URL de terminos"),
      license_name: nullableTextField(formData, "license_name"),
      license_url: nullableHttpsUrl(formData, "license_url", "URL de licencia"),
      robots_review_status: requiredTextField(formData, "robots_review_status", "Estado robots") as PublicCallRobotsReviewStatus,
      authorization_status: requiredTextField(formData, "authorization_status", "Estado de autorizacion") as PublicCallAuthorizationStatus,
      notes: nullableTextField(formData, "notes"),
    });

    if (error) {
      throw new PublicCallAdminActionError("SOURCE_CREATE_FAILED", "No se pudo crear la fuente.");
    }

    return "source_created";
  });
}

export async function updatePublicCallSourceAction(formData: FormData) {
  await runAction(async () => {
    const context = await requireAdminContext();
    const sourceId = requiredTextField(formData, "source_id", "Fuente");
    const reason = requiredTextField(formData, "action_reason", "Motivo");

    const { data, error } = await context.supabase!
      .from("public_call_sources")
      .update({
        name: requiredTextField(formData, "name", "Nombre"),
        source_type: requiredTextField(formData, "source_type", "Tipo de fuente") as PublicCallSourceType,
        base_url: requiredHttpsUrl(formData, "base_url", "URL oficial"),
        terms_url: nullableHttpsUrl(formData, "terms_url", "URL de terminos"),
        license_name: nullableTextField(formData, "license_name"),
        license_url: nullableHttpsUrl(formData, "license_url", "URL de licencia"),
        robots_review_status: requiredTextField(formData, "robots_review_status", "Estado robots") as PublicCallRobotsReviewStatus,
        authorization_status: requiredTextField(formData, "authorization_status", "Estado de autorizacion") as PublicCallAuthorizationStatus,
        notes: reason,
      })
      .eq("id", sourceId)
      .select("id")
      .single<{ id: string }>();

    if (error || !data) {
      throw new PublicCallAdminActionError("SOURCE_UPDATE_FAILED", "No se pudo actualizar la fuente.");
    }

    await insertAuditEvent(context, {
      source_id: sourceId,
      event_type: "source_updated",
      notes: reason,
      metadata: { action: "manual_source_update" },
    });

    return "source_updated";
  });
}

export async function createPublicCallDraftAction(formData: FormData) {
  await runAction(async () => {
    const context = await requireAdminContext();
    const { error } = await context.supabase!.from("public_call_drafts").insert({
      source_id: requiredTextField(formData, "source_id", "Fuente"),
      title: requiredTextField(formData, "title", "Titulo"),
      organization: requiredTextField(formData, "organization", "Organismo"),
      description: requiredTextField(formData, "description", "Resumen"),
      category: requiredTextField(formData, "category", "Categoria"),
      location: requiredTextField(formData, "location", "Ubicacion"),
      deadline: optionalDate(formData, "deadline"),
      source_url: requiredHttpsUrl(formData, "source_url", "URL oficial"),
      license_name: nullableTextField(formData, "license_name"),
      load_method: "manual",
      review_status: "draft",
      publication_status: "not_published",
      review_notes: nullableTextField(formData, "review_notes"),
      source_snapshot: { entry: "manual_admin_action" },
    });

    if (error) {
      throw new PublicCallAdminActionError("DRAFT_CREATE_FAILED", "No se pudo crear el borrador.");
    }

    return "draft_created";
  });
}

export async function updatePublicCallDraftAction(formData: FormData) {
  await runAction(async () => {
    const context = await requireAdminContext();
    const draftId = requiredTextField(formData, "draft_id", "Borrador");
    const reason = requiredTextField(formData, "action_reason", "Motivo");
    const draft = await getDraftState(context, draftId);
    assertCanEditDraft(draft);

    const { data, error } = await context.supabase!
      .from("public_call_drafts")
      .update({
        source_id: requiredTextField(formData, "source_id", "Fuente"),
        title: requiredTextField(formData, "title", "Titulo"),
        organization: requiredTextField(formData, "organization", "Organismo"),
        description: requiredTextField(formData, "description", "Resumen"),
        category: requiredTextField(formData, "category", "Categoria"),
        location: requiredTextField(formData, "location", "Ubicacion"),
        deadline: optionalDate(formData, "deadline"),
        source_url: requiredHttpsUrl(formData, "source_url", "URL oficial"),
        license_name: nullableTextField(formData, "license_name"),
        review_status: "draft",
        publication_status: "not_published",
        review_notes: reason,
      })
      .eq("id", draftId)
      .select("id")
      .single<{ id: string }>();

    if (error || !data) {
      throw new PublicCallAdminActionError("DRAFT_UPDATE_FAILED", "No se pudo actualizar el borrador.");
    }

    await insertAuditEvent(context, {
      source_id: requiredTextField(formData, "source_id", "Fuente"),
      draft_id: draftId,
      event_type: "draft_updated",
      from_status: draft.review_status,
      to_status: "draft",
      notes: reason,
      metadata: { action: "manual_draft_update" },
    });

    return "draft_updated";
  });
}

export async function submitPublicCallDraftForReviewAction(formData: FormData) {
  await runAction(async () => {
    const context = await requireAdminContext();
    const draftId = requiredTextField(formData, "draft_id", "Borrador");
    const reason = requiredTextField(formData, "action_reason", "Motivo");
    const draft = await getDraftState(context, draftId);
    assertCanSubmitDraftForReview(draft, reason);

    const { data, error } = await context.supabase!
      .from("public_call_drafts")
      .update({ review_status: "pending_review", publication_status: "not_published", review_notes: reason })
      .eq("id", draftId)
      .select("id")
      .single<{ id: string }>();

    if (error || !data) {
      throw new PublicCallAdminActionError("DRAFT_SUBMIT_FAILED", "No se pudo enviar a revision.");
    }

    await insertAuditEvent(context, {
      source_id: draft.source_id,
      draft_id: draftId,
      event_type: "draft_submitted",
      from_status: draft.review_status,
      to_status: "pending_review",
      notes: reason,
    });

    return "draft_submitted";
  });
}

export async function approvePublicCallDraftAction(formData: FormData) {
  await runAction(async () => {
    const context = await requireAdminContext();
    const draftId = requiredTextField(formData, "draft_id", "Borrador");
    const reason = requiredTextField(formData, "action_reason", "Motivo");
    const draft = await getDraftState(context, draftId);
    assertCanApproveDraft(draft, reason);

    const { data, error } = await context.supabase!
      .from("public_call_drafts")
      .update({ review_status: "approved", review_notes: reason })
      .eq("id", draftId)
      .select("id")
      .single<{ id: string }>();

    if (error || !data) {
      throw new PublicCallAdminActionError("DRAFT_APPROVE_FAILED", "No se pudo aprobar el borrador.");
    }

    await insertAuditEvent(context, {
      source_id: draft.source_id,
      draft_id: draftId,
      event_type: "draft_approved",
      from_status: draft.review_status,
      to_status: "approved",
      notes: reason,
    });

    return "draft_approved";
  });
}

export async function rejectPublicCallDraftAction(formData: FormData) {
  await runAction(async () => {
    const context = await requireAdminContext();
    const draftId = requiredTextField(formData, "draft_id", "Borrador");
    const reason = requiredTextField(formData, "action_reason", "Motivo");
    const draft = await getDraftState(context, draftId);
    assertCanRejectDraft(draft, reason);

    const { data, error } = await context.supabase!
      .from("public_call_drafts")
      .update({
        review_status: "rejected",
        publication_status: "not_published",
        rejection_reason: reason,
        review_notes: reason,
      })
      .eq("id", draftId)
      .select("id")
      .single<{ id: string }>();

    if (error || !data) {
      throw new PublicCallAdminActionError("DRAFT_REJECT_FAILED", "No se pudo rechazar el borrador.");
    }

    await insertAuditEvent(context, {
      source_id: draft.source_id,
      draft_id: draftId,
      event_type: "draft_rejected",
      from_status: draft.review_status,
      to_status: "rejected",
      notes: reason,
    });

    return "draft_rejected";
  });
}

export async function publishPublicCallDraftAction(formData: FormData) {
  await runAction(async () => {
    const context = await requireAdminContext();
    const draftId = requiredTextField(formData, "draft_id", "Borrador");
    const reason = requiredTextField(formData, "action_reason", "Motivo");
    const draft = await getDraftState(context, draftId);
    assertCanPublishDraft(draft, reason);

    const { data, error } = await context.supabase!
      .from("public_call_drafts")
      .update({ publication_status: "published", review_notes: reason })
      .eq("id", draftId)
      .select("id")
      .single<{ id: string }>();

    if (error || !data) {
      throw new PublicCallAdminActionError("DRAFT_PUBLISH_FAILED", "No se pudo publicar el llamado.");
    }

    await insertAuditEvent(context, {
      source_id: draft.source_id,
      draft_id: draftId,
      event_type: "draft_published",
      from_status: draft.publication_status,
      to_status: "published",
      notes: reason,
    });

    return "draft_published";
  });
}

export async function archivePublicCallDraftAction(formData: FormData) {
  await runAction(async () => {
    const context = await requireAdminContext();
    const draftId = requiredTextField(formData, "draft_id", "Borrador");
    const reason = requiredTextField(formData, "action_reason", "Motivo");
    const draft = await getDraftState(context, draftId);
    assertCanArchiveDraft(draft, reason);

    const { data, error } = await context.supabase!
      .from("public_call_drafts")
      .update({ publication_status: "archived", review_notes: reason })
      .eq("id", draftId)
      .select("id")
      .single<{ id: string }>();

    if (error || !data) {
      throw new PublicCallAdminActionError("DRAFT_ARCHIVE_FAILED", "No se pudo archivar el llamado.");
    }

    await insertAuditEvent(context, {
      source_id: draft.source_id,
      draft_id: draftId,
      event_type: "draft_archived",
      from_status: draft.publication_status,
      to_status: "archived",
      notes: reason,
    });

    return "draft_archived";
  });
}
