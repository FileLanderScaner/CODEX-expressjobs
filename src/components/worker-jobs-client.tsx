"use client";

import { useEffect, useMemo, useState } from "react";
import { EmptyState } from "@/components/empty-state";
import { JobCard } from "@/components/job-card";
import { LoadingState } from "@/components/loading-state";
import { getBrowserSupabaseClient } from "@/lib/supabase";
import { mapJobRow, type MarketplaceJob } from "@/lib/marketplace";
import { formatDistanceKm, requestBrowserCoordinates } from "@/lib/location";

type LoadState = "loading" | "ready" | "not-configured" | "error";
type LocationState = "idle" | "loading" | "ready" | "error";

function normalizeText(value: string | number | null | undefined) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

function jobMatchesQuery(job: MarketplaceJob, query: string) {
  const normalizedQuery = normalizeText(query).trim();

  if (!normalizedQuery) {
    return true;
  }

  const searchable = [
    job.title,
    job.description,
    job.location,
    job.status,
    job.budget,
  ]
    .map(normalizeText)
    .join(" ");

  return searchable.includes(normalizedQuery);
}

function jobHasBudget(job: MarketplaceJob) {
  const numericBudget = Number(String(job.budget ?? "").replace(/[^\d]/g, ""));
  return Number.isFinite(numericBudget) && numericBudget > 0;
}

export function WorkerJobsClient({ publicMode = false }: { publicMode?: boolean }) {
  const [state, setState] = useState<LoadState>("loading");
  const [openJobs, setOpenJobs] = useState<MarketplaceJob[]>([]);
  const [acceptedJobs, setAcceptedJobs] = useState<MarketplaceJob[]>([]);
  const [query, setQuery] = useState("");
  const [budgetOnly, setBudgetOnly] = useState(false);
  const [nearbyOnly, setNearbyOnly] = useState(false);
  const [locationState, setLocationState] = useState<LocationState>("idle");
  const [locationMessage, setLocationMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadJobs() {
      const supabase = getBrowserSupabaseClient();

      if (!supabase) {
        setOpenJobs([]);
        setAcceptedJobs([]);
        setState("not-configured");
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const openResult = await supabase
        .from("ej_jobs")
        .select("id,title,description,location_text,budget_uyu,status,client_id,accepted_worker_id")
        .eq("status", "open")
        .order("created_at", { ascending: false })
        .limit(20);

      const acceptedResult = user
        ? await supabase
            .from("ej_jobs")
            .select("id,title,description,location_text,budget_uyu,status,client_id,accepted_worker_id")
            .eq("accepted_worker_id", user.id)
            .in("status", ["accepted", "in_progress"])
            .order("created_at", { ascending: false })
        : { data: [], error: null };

      if (!isMounted) {
        return;
      }

      if (openResult.error || acceptedResult.error) {
        setOpenJobs([]);
        setAcceptedJobs([]);
        setState("error");
        return;
      }

      setOpenJobs((openResult.data ?? []).map(mapJobRow));
      setAcceptedJobs((acceptedResult.data ?? []).map(mapJobRow));
      setState("ready");
    }

    void loadJobs();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleUseLocation() {
    setLocationState("loading");
    setLocationMessage(null);

    try {
      await requestBrowserCoordinates();
      setNearbyOnly(true);
      setLocationState("ready");
      setLocationMessage("Ubicacion detectada. En esta version usamos ciudad o barrio para ordenar la busqueda sin mostrar tu direccion exacta.");
    } catch (error) {
      setLocationState("error");
      setLocationMessage(error instanceof Error ? error.message : "No pudimos detectar tu ubicacion.");
    }
  }

  const filteredOpenJobs = useMemo(() => {
    const filtered = openJobs.filter((job) => {
      if (!jobMatchesQuery(job, query)) {
        return false;
      }

      if (budgetOnly && !jobHasBudget(job)) {
        return false;
      }

      if (nearbyOnly && query.trim().length === 0) {
        return true;
      }

      return true;
    });

    if (!nearbyOnly || !query.trim()) {
      return filtered;
    }

    const normalizedQuery = normalizeText(query);
    return [...filtered].sort((left, right) => {
      const leftLocationMatch = normalizeText(left.location).includes(normalizedQuery) ? 0 : 1;
      const rightLocationMatch = normalizeText(right.location).includes(normalizedQuery) ? 0 : 1;
      return leftLocationMatch - rightLocationMatch;
    });
  }, [budgetOnly, nearbyOnly, openJobs, query]);

  const filteredAcceptedJobs = useMemo(() => {
    return acceptedJobs.filter((job) => jobMatchesQuery(job, query));
  }, [acceptedJobs, query]);

  if (state === "loading") {
    return <LoadingState label="Cargando trabajos" />;
  }

  const hasActiveFilters = query.trim().length > 0 || budgetOnly || nearbyOnly;

  return (
    <>
      {state === "not-configured" ? (
        <p className="mt-4 rounded-2xl border border-white/10 bg-white/10 p-3 text-sm text-[var(--ej-text-muted)]">
          Modo sin datos: Supabase publico no esta configurado en este ambiente.
        </p>
      ) : null}

      {state === "error" ? (
        <p className="mt-4 rounded-lg border border-[rgba(239,68,68,0.32)] bg-[var(--ej-danger-soft)] p-3 text-sm font-semibold text-red-200">
          No pudimos cargar trabajos reales. Revisa la configuracion de Supabase o intenta mas tarde.
        </p>
      ) : null}

      <section className="ej-glass mt-6 p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
          <label className="block">
            <span className="text-sm font-black text-[var(--ej-text)]">Buscar trabajos</span>

            <span className="ej-soft mt-1 block text-xs font-semibold">Busca por tarea, barrio, descripcion o presupuesto aproximado.</span>
            <input
              className="focus-ring ej-input mt-2 text-sm"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por titulo, descripcion, zona o presupuesto"
              type="search"
              value={query}
            />
          </label>

          <div className="flex flex-wrap gap-2">
            <button
              className={`focus-ring rounded-full border px-3 py-2 text-sm font-black transition ${
                budgetOnly
                  ? "border-[rgba(16,185,129,0.42)] bg-[var(--ej-success-soft)] text-emerald-200"
                  : "border-white/10 bg-white/10 text-[var(--ej-text-muted)] hover:bg-white/20"
              }`}
              onClick={() => setBudgetOnly((current) => !current)}
              type="button"
            >
              Solo con presupuesto
            </button>

            <button
              className={`focus-ring rounded-full border px-3 py-2 text-sm font-black transition ${
                nearbyOnly
                  ? "border-[rgba(96,165,250,0.42)] bg-[var(--ej-accent-soft)] text-blue-100"
                  : "border-white/10 bg-white/10 text-[var(--ej-text-muted)] hover:bg-white/20"
              }`}
              disabled={locationState === "loading"}
              onClick={nearbyOnly ? () => setNearbyOnly(false) : handleUseLocation}
              type="button"
            >
              {locationState === "loading" ? "Detectando..." : nearbyOnly ? "Cerca activado" : "Ver cerca de mi"}
            </button>

            {hasActiveFilters ? (
              <button
                className="focus-ring rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm font-black text-[var(--ej-text-muted)] hover:bg-white/20"
                onClick={() => {
                  setQuery("");
                  setBudgetOnly(false);
                  setNearbyOnly(false);
                  setLocationMessage(null);
                  setLocationState("idle");
                }}
                type="button"
              >
                Limpiar filtros
              </button>
            ) : null}
          </div>
        </div>

        {locationMessage ? (
          <p className={locationState === "error" ? "mt-3 text-sm font-semibold text-red-200" : "ej-soft mt-3 text-sm"}>{locationMessage}</p>
        ) : null}

        <p className="ej-soft mt-3 text-sm">
          Mostrando {filteredOpenJobs.length} de {openJobs.length} trabajos abiertos
          {publicMode ? "." : ` y ${filteredAcceptedJobs.length} asignados filtrados.`}
          {" "}Para postularte, abri el detalle y envia un mensaje claro al cliente.
        </p>
      </section>

      <h2 className="mt-6 text-2xl font-black">{publicMode ? "Publicados" : "Abiertos"}</h2>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {filteredOpenJobs.length ? (
          filteredOpenJobs.map((job) => (
            <JobCard
              key={job.id}
              {...job}
              distanceLabel={nearbyOnly ? formatDistanceKm(job.distanceKm) ?? "Cerca de tu zona" : null}
              href={publicMode ? `/jobs/${job.id}` : `/worker/jobs/${job.id}`}
            />
          ))
        ) : (
          <EmptyState
            title={hasActiveFilters ? "No encontramos trabajos con esos filtros" : "Todavia no hay trabajos disponibles"}
            text={
              hasActiveFilters
                ? "Proba limpiar filtros o buscar por una zona, tarea o palabra mas general."
                : "Cuando un cliente publique un trabajo abierto, aparecera aca. Tambien podes crear una cuenta para guardar tu rol trabajador."
            }
          />
        )}
      </div>

      {publicMode ? null : (
        <>
          <h2 className="mt-8 text-2xl font-black">Aceptados</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {filteredAcceptedJobs.length ? (
              filteredAcceptedJobs.map((job) => <JobCard key={job.id} {...job} href={`/worker/jobs/${job.id}`} />)
            ) : (
              <EmptyState
                title={hasActiveFilters ? "Sin trabajos aceptados con esos filtros" : "Sin trabajos aceptados"}
                text={hasActiveFilters ? "Limpia filtros para ver todos tus trabajos asignados." : "Tus trabajos aceptados apareceran aca cuando un cliente confirme tu postulacion."}
              />
            )}
          </div>
        </>
      )}
    </>
  );
}
