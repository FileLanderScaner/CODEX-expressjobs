import { CheckCircle2, Star } from "lucide-react";
import type { ApplicationStatus } from "@/lib/expressjobs-data";

const statusLabels: Record<ApplicationStatus, string> = {
  submitted: "pendiente",
  accepted: "aceptada",
  rejected: "rechazada",
  withdrawn: "retirada",
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
    <article className="rounded-md border border-[var(--line)] bg-white p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-black">{workerName}</h3>
          <p className="mt-1 flex items-center gap-1 text-sm text-[var(--muted)]">
            <Star aria-hidden="true" size={15} /> {reputationScore.toFixed(1)} reputacion
          </p>
        </div>
        <span className="rounded-md bg-[#edf3ee] px-2 py-1 text-xs font-bold text-[var(--brand-dark)]">{statusLabels[status] ?? status}</span>
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
