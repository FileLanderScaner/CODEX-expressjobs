"use client";

import { useEffect, useState } from "react";
import { EmptyState } from "@/components/empty-state";
import { JobCard } from "@/components/job-card";
import { LoadingState } from "@/components/loading-state";
import { getBrowserSupabaseClient } from "@/lib/supabase";
import { mapJobRow, type MarketplaceJob } from "@/lib/marketplace";

type LoadState = "loading" | "ready" | "not-configured" | "error";

export function WorkerJobsClient({ publicMode = false }: { publicMode?: boolean }) {
  const [state, setState] = useState<LoadState>("loading");
  const [openJobs, setOpenJobs] = useState<MarketplaceJob[]>([]);
  const [acceptedJobs, setAcceptedJobs] = useState<MarketplaceJob[]>([]);

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

      const mappedOpenJobs = (openResult.data ?? []).map(mapJobRow);
      setOpenJobs(mappedOpenJobs);
      setAcceptedJobs((acceptedResult.data ?? []).map(mapJobRow));
      setState("ready");
    }

    void loadJobs();

    return () => {
      isMounted = false;
    };
  }, []);

  if (state === "loading") {
    return <LoadingState label="Cargando trabajos" />;
  }

  return (
    <>
      {state === "not-configured" ? (
        <p className="mt-4 rounded-md border border-[var(--line)] bg-white p-3 text-sm text-[var(--muted)]">
          Modo sin datos: Supabase publico no esta configurado en este ambiente.
        </p>
      ) : null}
      {state === "error" ? (
        <p className="mt-4 rounded-md border border-[#e2b8b1] bg-[#fff4f2] p-3 text-sm font-semibold text-[var(--danger)]">
          No pudimos cargar trabajos reales. Revisa la configuracion de Supabase o intenta mas tarde.
        </p>
      ) : null}
      <h2 className="mt-6 text-2xl font-black">{publicMode ? "Publicados" : "Abiertos"}</h2>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {openJobs.length ? openJobs.map((job) => <JobCard key={job.id} {...job} href={publicMode ? `/jobs/${job.id}` : `/worker/jobs/${job.id}`} />) : <EmptyState title="Todavia no hay trabajos disponibles" text="Cuando un cliente publique un trabajo abierto, aparecera aca." />}
      </div>
      {publicMode ? null : (
        <>
          <h2 className="mt-8 text-2xl font-black">Aceptados</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {acceptedJobs.length ? acceptedJobs.map((job) => <JobCard key={job.id} {...job} href={`/worker/jobs/${job.id}`} />) : <EmptyState title="Sin trabajos aceptados" text="Tus trabajos asignados apareceran aca." />}
          </div>
        </>
      )}
    </>
  );
}
