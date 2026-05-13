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
  return (
    <span className="rounded-md bg-[#edf3ee] px-2 py-1 text-xs font-bold text-[var(--brand-dark)]">
      {labels[status]}
    </span>
  );
}
