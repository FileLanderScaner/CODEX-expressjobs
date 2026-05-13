import { MapPin, MessageCircle, Send, Star } from "lucide-react";
import { buildWhatsAppShareUrl } from "@/lib/whatsapp";
import type { JobStatus } from "@/lib/expressjobs-data";
import { JobStatusBadge } from "@/components/job-status-badge";

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
  return (
    <article className="rounded-md border border-[var(--line)] bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-[var(--brand)]">{category}</p>
          <h3 className="mt-1 text-lg font-bold">{title}</h3>
        </div>
        <JobStatusBadge status={status} />
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[var(--muted)]">
        <span className="inline-flex items-center gap-1">
          <MapPin aria-hidden="true" size={16} />
          {location}
        </span>
        <span className="font-bold text-[var(--foreground)]">{budget}</span>
        <span className="inline-flex items-center gap-1">
          <Star aria-hidden="true" size={16} />
          Reputacion visible
        </span>
      </div>
      {description ? <p className="mt-3 line-clamp-2 text-sm leading-6 text-[var(--muted)]">{description}</p> : null}
      <div className="mt-4 flex flex-wrap gap-2">
        <a
          className="focus-ring inline-flex items-center gap-2 rounded-md border border-[var(--line)] px-3 py-2 text-sm font-semibold hover:bg-[#f3f5f1]"
          href={buildWhatsAppShareUrl(`Mira esta tarea en Trabajos Rapidos: ${title}`)}
          rel="noreferrer"
          target="_blank"
        >
          <Send aria-hidden="true" size={16} />
          WhatsApp
        </a>
        <button className="focus-ring inline-flex items-center gap-2 rounded-md border border-[var(--line)] px-3 py-2 text-sm font-semibold hover:bg-[#f3f5f1]">
          <MessageCircle aria-hidden="true" size={16} />
          Chat
        </button>
        <a className="focus-ring inline-flex items-center gap-2 rounded-md bg-[var(--brand)] px-3 py-2 text-sm font-bold text-white hover:bg-[var(--brand-dark)]" href={href}>
          Ver detalle
        </a>
      </div>
    </article>
  );
}
