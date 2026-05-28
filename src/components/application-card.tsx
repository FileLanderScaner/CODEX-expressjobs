import { CheckCircle2, Star } from "lucide-react";
import type { ApplicationStatus } from "@/lib/expressjobs-data";

const statusLabels: Record<ApplicationStatus, string> = {
  submitted: "Enviada",
  viewed: "Vista",
  shortlisted: "Preseleccionada",
  accepted: "Aceptada",
  rejected: "Rechazada",
  withdrawn: "Retirada",
};

export function ApplicationCard({
  workerName,
  message,
  proposedAmount,
  status,
  reputationScore,
  actions,
}: {
  workerName: string;
  message: string;
  proposedAmount: string;
  status: ApplicationStatus;
  reputationScore: number;
  actions?: React.ReactNode;
}) {
  return (
    <article className="ej-card p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-black">{workerName}</h3>
          <p className="ej-muted mt-1 flex items-center gap-1 text-sm">
            <Star aria-hidden="true" size={15} /> {reputationScore > 0 ? `${reputationScore.toFixed(1)} reputacion` : "Reputacion pendiente"}
          </p>
        </div>
        <span className="ej-chip text-xs">{statusLabels[status]}</span>
      </div>
      <p className="mt-3 text-sm leading-6">{message}</p>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <strong>{proposedAmount}</strong>
        {actions ?? (
          <span className="inline-flex items-center gap-2 rounded-md border border-[var(--line)] px-3 py-2 text-sm font-bold text-[var(--muted)]">
            <CheckCircle2 aria-hidden="true" size={16} /> Gestion desde cliente
          </span>
        )}
      </div>
    </article>
  );
}
