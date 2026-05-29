export type PublicCallSourceType =
  | "manual"
  | "official_api"
  | "official_rss"
  | "official_open_data"
  | "partner_authorized"
  | "unknown";

export type PublicCallAuthorizationStatus =
  | "manual_only"
  | "authorized_api"
  | "authorized_rss"
  | "authorized_open_data"
  | "permission_required"
  | "blocked";

export type PublicCallRobotsReviewStatus = "not_reviewed" | "reviewed_allowed" | "reviewed_limited" | "blocked" | "not_applicable";
export type PublicCallReviewStatus = "draft" | "pending_review" | "needs_changes" | "approved" | "rejected";
export type PublicCallPublicationStatus = "not_published" | "published" | "archived";

export type PublicCallDraftRecord = {
  id: string;
  title: string;
  organization: string;
  category: string;
  location: string;
  deadline: string | null;
  source_url: string;
  review_status: PublicCallReviewStatus;
  publication_status: PublicCallPublicationStatus;
  license_name: string | null;
  review_notes: string | null;
  rejection_reason: string | null;
  created_at: string;
  updated_at: string;
  public_call_sources?: {
    name: string;
    authorization_status: PublicCallAuthorizationStatus;
    robots_review_status: PublicCallRobotsReviewStatus;
    license_name: string | null;
    license_url: string | null;
  } | null;
};

export type PublicCallSourceRecord = {
  id: string;
  name: string;
  source_type: PublicCallSourceType;
  base_url: string;
  terms_url: string | null;
  license_name: string | null;
  license_url: string | null;
  robots_review_status: PublicCallRobotsReviewStatus;
  authorization_status: PublicCallAuthorizationStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export const publicCallReviewStatusLabels: Record<PublicCallReviewStatus, string> = {
  draft: "Borrador",
  pending_review: "Revision pendiente",
  needs_changes: "Necesita ajustes",
  approved: "Aprobado",
  rejected: "Rechazado",
};

export const publicCallPublicationStatusLabels: Record<PublicCallPublicationStatus, string> = {
  not_published: "No publicado",
  published: "Publicado",
  archived: "Archivado",
};

export const publicCallAuthorizationStatusLabels: Record<PublicCallAuthorizationStatus, string> = {
  manual_only: "Solo carga manual",
  authorized_api: "API autorizada",
  authorized_rss: "RSS autorizado",
  authorized_open_data: "Datos abiertos autorizados",
  permission_required: "Permiso requerido",
  blocked: "Bloqueado",
};

export const publicCallRobotsStatusLabels: Record<PublicCallRobotsReviewStatus, string> = {
  not_reviewed: "Robots pendiente",
  reviewed_allowed: "Robots revisado",
  reviewed_limited: "Uso limitado",
  blocked: "Bloqueado por robots/terminos",
  not_applicable: "No aplica",
};

export function getPublicCallRiskFlags(draft: PublicCallDraftRecord) {
  const source = draft.public_call_sources;
  const risks: string[] = [];

  if (!draft.source_url.startsWith("https://")) {
    risks.push("URL oficial ausente o no segura");
  }

  if (!source) {
    risks.push("Fuente no vinculada");
    return risks;
  }

  if (source.authorization_status === "permission_required" || source.authorization_status === "blocked") {
    risks.push("Fuente sin autorizacion suficiente");
  }

  if (source.robots_review_status === "not_reviewed" || source.robots_review_status === "blocked") {
    risks.push("Robots/terminos pendientes");
  }

  if (!draft.license_name && !source.license_name) {
    risks.push("Licencia sin registrar");
  }

  if (draft.review_status !== "approved") {
    risks.push("Revision humana pendiente");
  }

  if (draft.publication_status === "published" && draft.review_status !== "approved") {
    risks.push("Publicacion bloqueada: requiere aprobacion");
  }

  return risks;
}
