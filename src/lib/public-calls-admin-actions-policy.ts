import type {
  PublicCallAuthorizationStatus,
  PublicCallPublicationStatus,
  PublicCallReviewStatus,
  PublicCallRobotsReviewStatus,
} from "@/lib/public-calls-admin-queue";

export class PublicCallAdminActionError extends Error {
  constructor(
    public readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = "PublicCallAdminActionError";
  }
}

export type PublicCallActionProfile = {
  id: string;
  role: "client" | "worker" | "admin";
} | null;

export type PublicCallActionDraftState = {
  id: string;
  review_status: PublicCallReviewStatus;
  publication_status: PublicCallPublicationStatus;
  source_url: string;
  license_name: string | null;
  public_call_sources?: {
    authorization_status: PublicCallAuthorizationStatus;
    robots_review_status: PublicCallRobotsReviewStatus;
    license_name: string | null;
  } | null;
};

export function assertPublicCallAdmin(profile: PublicCallActionProfile) {
  if (!profile) {
    throw new PublicCallAdminActionError("AUTH_REQUIRED", "Debes iniciar sesion para operar la cola.");
  }

  if (profile.role !== "admin") {
    throw new PublicCallAdminActionError("ADMIN_REQUIRED", "Solo una cuenta admin puede operar la cola.");
  }
}

export function requireActionReason(value: string | null | undefined, action: string) {
  if (!value?.trim()) {
    throw new PublicCallAdminActionError("REASON_REQUIRED", `${action} requiere motivo.`);
  }
}

export function assertCanEditDraft(draft: PublicCallActionDraftState) {
  if (draft.publication_status === "published") {
    throw new PublicCallAdminActionError("PUBLISHED_DRAFT_LOCKED", "Archivá el llamado antes de editarlo.");
  }
}

export function assertCanSubmitDraftForReview(draft: PublicCallActionDraftState, reason: string) {
  requireActionReason(reason, "Enviar a revision");

  if (!["draft", "needs_changes", "rejected"].includes(draft.review_status)) {
    throw new PublicCallAdminActionError("INVALID_REVIEW_STATE", "Solo borradores o llamados con ajustes pueden enviarse a revision.");
  }

  if (draft.publication_status === "published") {
    throw new PublicCallAdminActionError("PUBLISHED_DRAFT_LOCKED", "No se puede reenviar a revision un llamado publicado.");
  }
}

export function assertCanApproveDraft(draft: PublicCallActionDraftState, reason: string) {
  requireActionReason(reason, "Aprobar");

  if (draft.review_status !== "pending_review") {
    throw new PublicCallAdminActionError("PENDING_REVIEW_REQUIRED", "Solo un llamado pendiente de revision puede aprobarse.");
  }

  if (draft.publication_status === "published") {
    throw new PublicCallAdminActionError("PUBLISHED_DRAFT_LOCKED", "Un llamado publicado no puede aprobarse nuevamente.");
  }
}

export function assertCanRejectDraft(draft: PublicCallActionDraftState, reason: string) {
  requireActionReason(reason, "Rechazar");

  if (!["pending_review", "needs_changes", "approved"].includes(draft.review_status)) {
    throw new PublicCallAdminActionError("REVIEW_STATE_REQUIRED", "Solo llamados en revision pueden rechazarse.");
  }

  if (draft.publication_status === "published") {
    throw new PublicCallAdminActionError("PUBLISHED_DRAFT_LOCKED", "Archivá el llamado antes de rechazarlo.");
  }
}

export function assertCanPublishDraft(draft: PublicCallActionDraftState, reason: string) {
  requireActionReason(reason, "Publicar");

  if (draft.review_status !== "approved") {
    throw new PublicCallAdminActionError("APPROVAL_REQUIRED", "Publicar requiere aprobacion humana previa.");
  }

  if (draft.publication_status === "published") {
    throw new PublicCallAdminActionError("ALREADY_PUBLISHED", "El llamado ya esta publicado.");
  }

  if (!draft.source_url.startsWith("https://")) {
    throw new PublicCallAdminActionError("SAFE_SOURCE_URL_REQUIRED", "Publicar requiere URL oficial HTTPS.");
  }

  const source = draft.public_call_sources;
  if (!source) {
    throw new PublicCallAdminActionError("SOURCE_REQUIRED", "Publicar requiere fuente registrada.");
  }

  if (source.authorization_status === "blocked" || source.authorization_status === "permission_required") {
    throw new PublicCallAdminActionError("AUTHORIZED_SOURCE_REQUIRED", "La fuente no esta autorizada para publicar.");
  }

  if (source.robots_review_status === "blocked" || source.robots_review_status === "not_reviewed") {
    throw new PublicCallAdminActionError("TERMS_REVIEW_REQUIRED", "Publicar requiere robots/terminos revisados.");
  }

  if (!draft.license_name?.trim() && !source.license_name?.trim()) {
    throw new PublicCallAdminActionError("LICENSE_REQUIRED", "Publicar requiere licencia o terminos registrados.");
  }
}

export function assertCanArchiveDraft(draft: PublicCallActionDraftState, reason: string) {
  requireActionReason(reason, "Archivar");

  if (draft.publication_status !== "published") {
    throw new PublicCallAdminActionError("PUBLISHED_REQUIRED", "Solo un llamado publicado puede archivarse.");
  }
}
