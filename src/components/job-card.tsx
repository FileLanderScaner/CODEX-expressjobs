import { MapPin } from "lucide-react";
import { JobStatusBadge } from "@/components/job-status-badge";
import type { JobStatus } from "@/lib/expressjobs-data";

function isTechnicalStagingTitle(value: string) {
  return /(^|[_\s-])(RLS_SMOKE|SMOKE_TEST|TEST_JOB)([_\s-]|$)/i.test(value);
}

export function JobCard({
  title,
  location,
  budget,
  status,
  category,
  description,
  urgency,
  distanceLabel,
  href = "/jobs/open",
}: {
  title: string;
  location: string;
  budget: string;
  status: JobStatus;
  category: string;
  description?: string;
  urgency?: "normal" | "urgent";
  distanceLabel?: string | null;
  href?: string;
}) {
  const isStaging = isTechnicalStagingTitle(title);
  const displayTitle = isStaging ? "Trabajo de prueba staging" : title;

  return (
    <article className="ej-card p-5 transition hover:-translate-y-1 hover:border-[rgba(96,165,250,0.42)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="ej-chip text-[11px] uppercase tracking-wide">{category}</p>
            {urgency === "urgent" ? <span className="ej-warning-badge text-[11px]">Urgente</span> : null}
            {distanceLabel ? <span className="ej-badge text-[11px]">{distanceLabel}</span> : null}
            {isStaging ? <span className="ej-warning-badge text-[11px]">Staging</span> : null}
          </div>
          <h3 className="mt-3 text-xl font-black leading-tight">{displayTitle}</h3>
        </div>
        <JobStatusBadge status={status} />
      </div>
      <div className="ej-muted mt-4 flex flex-wrap items-center gap-4 text-sm">
        <span className="inline-flex items-center gap-1">
          <MapPin aria-hidden="true" size={16} />
          {location}
        </span>
        <span className="font-bold text-[var(--ej-text)]">Presupuesto: {budget}</span>
      </div>
      {description ? <p className="ej-muted mt-3 line-clamp-2 text-sm leading-6">{description}</p> : null}
      <a className="focus-ring ej-btn-primary mt-4 w-full px-3 py-2 text-sm sm:w-fit" href={href}>
        Ver detalle
      </a>
    </article>
  );
}
