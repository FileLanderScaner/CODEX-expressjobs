import type { JobStatus } from "@/lib/expressjobs-data";

const labels: Record<JobStatus, string> = {
  draft: "Borrador",
  open: "Abierto",
  applied: "Con postulaciones",
  accepted: "Aceptado",
  in_progress: "En curso",
  completed: "Completado",
  cancelled: "Cancelado",
  disputed: "Disputa",
};

export function JobStatusBadge({ status }: { status: JobStatus }) {
  const className =
    status === "cancelled" || status === "disputed"
      ? "ej-danger-badge"
      : status === "applied" || status === "in_progress"
        ? "ej-warning-badge"
        : status === "accepted" || status === "completed"
          ? "ej-badge border-[rgba(16,185,129,0.32)] bg-[var(--ej-success-soft)] text-emerald-200"
          : "ej-badge";

  return <span className={className}>{labels[status]}</span>;
}
