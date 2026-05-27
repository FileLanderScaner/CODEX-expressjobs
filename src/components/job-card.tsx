import { MapPin, MessageCircle, Send, Star } from "lucide-react";
import { buildWhatsAppShareUrl } from "@/lib/whatsapp";
import type { JobStatus } from "@/lib/expressjobs-data";
import { JobStatusBadge } from "@/components/job-status-badge";

function isTechnicalStagingTitle(value: string) {
 codex/expressjobs-global-soft-premium-redesign-manual
  return /(^|[_\s-])(RLS_SMOKE|SMOKE_TEST|SMOKE|TEST_JOB)([_\s-]|$)/i.test(value);

  return /(^|[_\s-])(RLS_SMOKE|SMOKE_TEST|TEST_JOB)([_\s-]|$)/i.test(value);
 main
}

export function JobCard({
  title,
  location,
  budget,
  status,
  category,
  description,
  href = "/jobs/open",
}: {
  title: string;
  location: string;
  budget: string;
  status: JobStatus;
  category: string;
  description?: string;
  href?: string;
}) {
  const isStaging = isTechnicalStagingTitle(title);
  const displayTitle = isStaging ? "Trabajo de prueba staging" : title;

  return (
    <article className="ej-card p-5 transition hover:-translate-y-1 hover:border-[rgba(123,193,67,0.34)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="ej-chip text-[11px] uppercase tracking-wide">{category}</p>
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
        <span className="font-bold text-[var(--ej-text)]">{budget}</span>
        <span className="inline-flex items-center gap-1">
          <Star aria-hidden="true" size={16} />
          Reputacion visible
        </span>
      </div>
      {description ? <p className="ej-muted mt-3 line-clamp-2 text-sm leading-6">{description}</p> : null}
      <div className="mt-4 flex flex-wrap gap-2">
        <a
          className="focus-ring ej-btn-secondary px-3 py-2 text-sm"
          href={buildWhatsAppShareUrl(`Mira esta tarea en Trabajos Rapidos: ${displayTitle}`)}
          rel="noreferrer"
          target="_blank"
        >
          <Send aria-hidden="true" size={16} />
          WhatsApp
        </a>
        <button className="focus-ring ej-btn-secondary px-3 py-2 text-sm" type="button">
          <MessageCircle aria-hidden="true" size={16} />
          Chat
        </button>
        <a className="focus-ring ej-btn-primary px-3 py-2 text-sm" href={href}>
          Ver detalle
        </a>
      </div>
    </article>
  );
}
