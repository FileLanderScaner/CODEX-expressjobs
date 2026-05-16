"use client";

import { useEffect, useState } from "react";
import { EmptyState } from "@/components/empty-state";
import { JobCard } from "@/components/job-card";
import { LoadingState } from "@/components/loading-state";
import { featuredJobs } from "@/lib/expressjobs-data";
import { getBrowserSupabaseClient } from "@/lib/supabase";
import { mapJobRow, type MarketplaceJob } from "@/lib/marketplace";
import { listOpenJobs, listWorkerAcceptedJobs } from "@/services/jobs-service";

type LoadState = "loading" | "ready" | "fallback";

export function WorkerJobsClient() {
  const [state, setState] = useState<LoadState>("loading");
  const [openJobs, setOpenJobs] = useState<MarketplaceJob[]>([]);
  const [acceptedJobs, setAcceptedJobs] = useState<MarketplaceJob[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function loadJobs() {
      const supabase = getBrowserSupabaseClient();

      if (!supabase) {
        setOpenJobs(listOpenJobs());
        setAcceptedJobs(listWorkerAcceptedJobs());
        setState("fallback");
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
        setOpenJobs(listOpenJobs());
        setAcceptedJobs(listWorkerAcceptedJobs());
        setState("fallback");
        return;
      }

      const mappedOpenJobs = (openResult.data ?? []).map(mapJobRow);
      setOpenJobs(mappedOpenJobs.length ? mappedOpenJobs : featuredJobs.filter((job) => job.status === "open"));
      setAcceptedJobs((acceptedResult.data ?? []).map(mapJobRow));
      setState(mappedOpenJobs.length ? "ready" : "fallback");
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
      {state === "fallback" ? (
        <p className="mt-4 rounded-md border border-[var(--line)] bg-white p-3 text-sm text-[var(--muted)]">
          Mostrando ejemplos porque Supabase no tiene trabajos abiertos disponibles para este ambiente.
        </p>
      ) : null}
      <h2 className="mt-6 text-2xl font-black">Abiertos</h2>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {openJobs.length ? openJobs.map((job) => <JobCard key={job.id} {...job} href={`/worker/jobs/${job.id}`} />) : <EmptyState title="Sin trabajos abiertos" text="Vuelve a revisar mas tarde." />}
      </div>
      <h2 className="mt-8 text-2xl font-black">Aceptados</h2>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {acceptedJobs.length ? acceptedJobs.map((job) => <JobCard key={job.id} {...job} href={`/worker/jobs/${job.id}`} />) : <EmptyState title="Sin trabajos aceptados" text="Tus trabajos asignados apareceran aca." />}
      </div>
    </>
  );
}
