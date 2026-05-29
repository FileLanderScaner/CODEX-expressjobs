import type { SupabaseClient, User } from "@supabase/supabase-js";
import type { ApplicationStatus, JobStatus } from "@/lib/expressjobs-data";

export type MarketplaceJob = {
  id: string;
  title: string;
  description: string;
  location: string;
  budget: string;
  status: JobStatus;
  category: string;
  urgency?: "normal" | "urgent";
  clientId?: string;
  acceptedWorkerId?: string | null;
  distanceKm?: number | null;
};

export type MarketplaceApplication = {
  id: string;
  jobId: string;
  workerId: string;
  workerName: string;
  message: string;
  proposedAmount: string;
  status: ApplicationStatus;
  reputationScore: number;
};

type JobRow = {
  id: string;
  title: string;
  description: string;
  location_text: string;
  budget_uyu: number | null;
  status: JobStatus;
  client_id: string;
  accepted_worker_id: string | null;
};

type ApplicationRow = {
  id: string;
  job_id: string;
  worker_id: string;
  message: string;
  proposed_amount_uyu: number | null;
  status: ApplicationStatus;
};

export function formatBudgetUyu(value: number | null | undefined) {
  return typeof value === "number" ? `UYU ${value.toLocaleString("es-UY")}` : "A convenir";
}

export function parseAmountUyu(value: string) {
  const normalized = value.replace(/[^0-9]/g, "");
  return normalized ? Number.parseInt(normalized, 10) : null;
}

export function serializeJobDescription({
  category,
  urgency,
  description,
}: {
  category: string;
  urgency: "normal" | "urgent";
  description: string;
}) {
  const urgencyLabel = urgency === "urgent" ? "urgente" : "normal";

  return `Categoria: ${category}\nUrgencia: ${urgencyLabel}\n\n${description.trim()}`;
}

function parseJobDescription(value: string) {
  const lines = value.split(/\r?\n/);
  const categoryLine = lines[0]?.match(/^Categoria:\s*(.+)$/i);
  const urgencyLine = lines[1]?.match(/^Urgencia:\s*(normal|urgente)$/i);

  if (!categoryLine && !urgencyLine) {
    return {
      category: "Trabajo",
      urgency: undefined,
      description: value,
    };
  }

  const description = lines.slice(2).join("\n").trim();

  return {
    category: categoryLine?.[1]?.trim() || "Trabajo",
    urgency: urgencyLine?.[1]?.toLowerCase() === "urgente" ? "urgent" as const : "normal" as const,
    description: description || value,
  };
}

export function mapJobRow(row: JobRow): MarketplaceJob {
  const parsedDescription = parseJobDescription(row.description);

  return {
    id: row.id,
    title: row.title,
    description: parsedDescription.description,
    location: row.location_text,
    budget: formatBudgetUyu(row.budget_uyu),
    status: row.status,
    category: parsedDescription.category,
    urgency: parsedDescription.urgency,
    clientId: row.client_id,
    acceptedWorkerId: row.accepted_worker_id,
  };
}

export function mapApplicationRow(row: ApplicationRow, workerName?: string): MarketplaceApplication {
  return {
    id: row.id,
    jobId: row.job_id,
    workerId: row.worker_id,
    workerName: workerName ?? `Trabajador ${row.worker_id.slice(0, 8)}`,
    message: row.message,
    proposedAmount: formatBudgetUyu(row.proposed_amount_uyu),
    status: row.status,
    reputationScore: 0,
  };
}

export function fullNameFromUser(user: User) {
  const metadataName = user.user_metadata.name;
  return typeof metadataName === "string" && metadataName.trim()
    ? metadataName.trim()
    : user.email ?? "Usuario Trabajos Rapidos";
}

export function safeNextPath(value: string | null | undefined, fallback = "/role") {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return fallback;
  }

  return value;
}

export function authHref(nextPath: string) {
  return `/auth?next=${encodeURIComponent(safeNextPath(nextPath))}`;
}

export async function ensureMarketplaceRole(
  _supabase: SupabaseClient,
  role: "client" | "worker",
  fullName: string,
) {
  const response = await fetch("/api/profile/set-role", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ role, fullName }),
  });

  if (!response.ok) {
    return {
      data: null,
      error: {
        message: "No se pudo actualizar el rol del perfil.",
      },
    };
  }

  const data = (await response.json()) as { ok?: boolean; role?: "client" | "worker" };

  if (!data.ok) {
    return {
      data: null,
      error: {
        message: "No se pudo actualizar el rol del perfil.",
      },
    };
  }

  return {
    data,
    error: null,
  };
}
