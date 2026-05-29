"use client";

import { ExternalLink, MessageCircle, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { PublicCall } from "@/lib/public-calls-data";
import { publicCallStatusLabels } from "@/lib/public-calls-data";
import { publicSalesContact } from "@/lib/monetization/monetization-config";

const whatsappText = encodeURIComponent(
  "Hola Ronald, quiero preparar una postulacion para un llamado publico. Necesito ordenar requisitos y documentos.",
);

const preparationHref = `https://wa.me/${publicSalesContact.whatsappNumber}?text=${whatsappText}`;

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function statusClass(status: PublicCall["status"]) {
  if (status === "abierto") {
    return "border-emerald-300/30 bg-emerald-400/10 text-emerald-100";
  }

  if (status === "proximo-cierre") {
    return "border-amber-300/30 bg-amber-400/10 text-amber-100";
  }

  return "border-blue-300/30 bg-blue-400/10 text-blue-100";
}

export function PublicCallsClient({ calls }: { calls: PublicCall[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("todas");
  const [status, setStatus] = useState("todos");
  const [closingSoon, setClosingSoon] = useState(false);

  const categories = useMemo(() => Array.from(new Set(calls.map((call) => call.category))).sort(), [calls]);

  const filteredCalls = useMemo(() => {
    const normalizedQuery = normalize(query.trim());

    return calls.filter((call) => {
      const haystack = normalize(
        [call.title, call.organization, call.category, call.location, call.summary, call.sourceName].join(" "),
      );
      const matchesQuery = !normalizedQuery || haystack.includes(normalizedQuery);
      const matchesCategory = category === "todas" || call.category === category;
      const matchesStatus = status === "todos" || call.status === status;
      const matchesClosingSoon = !closingSoon || call.status === "proximo-cierre";

      return matchesQuery && matchesCategory && matchesStatus && matchesClosingSoon;
    });
  }, [calls, category, closingSoon, query, status]);

  return (
    <div className="grid gap-6">
      <div className="grid gap-3 rounded-lg border border-[var(--ej-border)] bg-white/[0.05] p-4 lg:grid-cols-[1fr_14rem_13rem_auto] lg:items-end">
        <label className="grid gap-2 text-sm font-bold text-[var(--ej-text-muted)]">
          Buscar por palabra clave
          <span className="relative">
            <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ej-text-soft)]" size={16} />
            <input
              className="focus-ring ej-input w-full pl-10 font-normal"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Ej: administracion, educacion, CV"
              type="search"
              value={query}
            />
          </span>
        </label>

        <label className="grid gap-2 text-sm font-bold text-[var(--ej-text-muted)]">
          Categoria
          <select className="focus-ring ej-input font-normal" onChange={(event) => setCategory(event.target.value)} value={category}>
            <option value="todas">Todas</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-bold text-[var(--ej-text-muted)]">
          Estado
          <select className="focus-ring ej-input font-normal" onChange={(event) => setStatus(event.target.value)} value={status}>
            <option value="todos">Todos</option>
            <option value="referencia">Referencia</option>
            <option value="abierto">Abierto a verificar</option>
            <option value="proximo-cierre">Cierre proximo</option>
          </select>
        </label>

        <label className="focus-ring flex min-h-12 items-center gap-3 rounded-lg border border-[var(--ej-border)] bg-white/[0.04] px-4 py-3 text-sm font-black text-white">
          <input checked={closingSoon} className="h-4 w-4 accent-emerald-400" onChange={(event) => setClosingSoon(event.target.checked)} type="checkbox" />
          Cierre proximo
        </label>
      </div>

      <div className="grid gap-4" id="llamados">
        {filteredCalls.length ? (
          filteredCalls.map((call) => (
            <article className="ej-card p-5" key={call.id}>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] ${statusClass(call.status)}`}>
                      {publicCallStatusLabels[call.status]}
                    </span>
                    <span className="ej-chip text-[11px] uppercase tracking-[0.12em]">{call.category}</span>
                  </div>
                  <h2 className="mt-4 text-2xl font-black tracking-tight text-white">{call.title}</h2>
                  <p className="ej-muted mt-2 text-sm font-semibold">{call.organization}</p>
                </div>
                <div className="rounded-lg border border-[var(--ej-border)] bg-white/[0.05] px-4 py-3 text-sm">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-200">Cierre</p>
                  <p className="ej-muted mt-1 font-semibold">{call.deadlineLabel}</p>
                </div>
              </div>

              <p className="ej-muted mt-4 max-w-4xl text-sm leading-6">{call.summary}</p>

              <div className="mt-4 grid gap-4 md:grid-cols-[0.75fr_1.25fr]">
                <div className="rounded-lg border border-[var(--ej-border)] bg-white/[0.04] p-4">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-200">Ubicacion</p>
                  <p className="mt-2 font-bold text-white">{call.location}</p>
                  <p className="ej-muted mt-4 text-xs font-black uppercase tracking-[0.14em]">Fuente</p>
                  <p className="mt-2 font-bold text-white">{call.sourceName}</p>
                </div>
                <div className="rounded-lg border border-[var(--ej-border)] bg-white/[0.04] p-4">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-200">Requisitos resumidos</p>
                  <ul className="mt-3 grid gap-2 text-sm text-[var(--ej-text-muted)]">
                    {call.requirements.map((requirement) => (
                      <li className="flex gap-2" key={requirement}>
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ej-success)]" />
                        <span>{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <a className="focus-ring ej-btn-secondary text-sm uppercase tracking-[0.12em]" href={call.sourceUrl} rel="noreferrer" target="_blank">
                  Ver llamado oficial <ExternalLink aria-hidden="true" size={17} />
                </a>
                <a className="focus-ring ej-btn-primary text-sm uppercase tracking-[0.12em]" href={preparationHref}>
                  Preparar postulación <MessageCircle aria-hidden="true" size={17} />
                </a>
              </div>
            </article>
          ))
        ) : (
          <div className="ej-card p-8 text-center">
            <p className="text-xl font-black text-white">No hay referencias con esos filtros.</p>
            <p className="ej-muted mt-2 text-sm">Proba con otra palabra clave o verifica directamente la fuente oficial.</p>
          </div>
        )}
      </div>
    </div>
  );
}
