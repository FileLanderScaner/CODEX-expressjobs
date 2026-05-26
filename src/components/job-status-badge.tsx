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
    <span className="ej-badge">
      {labels[status]}
    </span>
  );
}
