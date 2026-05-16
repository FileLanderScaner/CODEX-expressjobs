"use client";

import { ClipboardPlus, MessageSquareText, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { EmptyState } from "@/components/empty-state";
import { JobCard } from "@/components/job-card";
import { LoadingState } from "@/components/loading-state";
import { PrimaryButton } from "@/components/primary-button";
import { authHref, mapJobRow, type MarketplaceJob } from "@/lib/marketplace";
import { getBrowserSupabaseClient } from "@/lib/supabase";

type DashboardState = "loading" | "ready" | "signed-out" | "not-configured" | "error";

export function ClientDashboard() {
  const [state, setState] = useState<DashboardState>("loading");
  const [jobs, setJobs] = useState<MarketplaceJob[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function loadJobs() {
      const supabase = getBrowserSupabaseClient();

      if (!supabase) {
        setJobs([]);
        setState("not-configured");
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setState("signed-out");
        return;
      }

      const { data, error } = await supabase
        .from("ej_jobs")
        .select("id,title,description,location_text,budget_uyu,status,client_id,accepted_worker_id")
        .eq("client_id", user.id)
        .order("created_at", { ascending: false });

      if (!isMounted) {
        return;
      }

      if (error) {
        setJobs([]);
        setState("error");
        return;
      }

      setJobs((data ?? []).map(mapJobRow));
      setState("ready");
    }

    void loadJobs();

    return () => {
      isMounted = false;
    };
  }, []);

  if (state === "loading") {
    return <LoadingState label="Cargando panel cliente" />;
  }

  if (state === "signed-out") {
    return (
      <div className="rounded-md border border-[var(--line)] bg-white p-5">
        <h2 className="text-xl font-black">Debes iniciar sesion para publicar y ver tus trabajos.</h2>
        <Link className="focus-ring mt-4 inline-flex rounded-md bg-[var(--brand)] px-4 py-3 text-sm font-bold text-white" href={authHref("/client")}>
          Ir a ingresar
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black">Cliente</h1>
          <p className="mt-2 text-[var(--muted)]">Administra trabajos, postulaciones, estados y reseñas.</p>
        </div>
        <PrimaryButton href="/client/jobs/new" icon={ClipboardPlus}>Publicar un trabajo</PrimaryButton>
      </div>
      {state === "not-configured" ? (
        <p className="mt-4 rounded-md border border-[var(--line)] bg-white p-3 text-sm text-[var(--muted)]">
          Modo sin datos: Supabase publico no esta configurado en este ambiente.
        </p>
      ) : null}
      {state === "error" ? (
        <p className="mt-4 rounded-md border border-[#e2b8b1] bg-[#fff4f2] p-3 text-sm font-semibold text-[var(--danger)]">
          No pudimos cargar tus trabajos reales. Revisa tu sesion o intenta mas tarde.
        </p>
      ) : null}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          { icon: ClipboardPlus, label: "Trabajos", value: jobs.length },
          { icon: MessageSquareText, label: "Postulaciones", value: "Ver detalle" },
          { icon: Star, label: "Reseñas", value: "Pendiente" },
        ].map((item) => (
          <article className="rounded-md border border-[var(--line)] bg-white p-5" key={item.label}>
            <item.icon aria-hidden="true" className="text-[var(--brand)]" />
            <p className="mt-3 text-sm font-bold text-[var(--muted)]">{item.label}</p>
            <p className="mt-1 text-2xl font-black">{item.value}</p>
          </article>
        ))}
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {jobs.length ? jobs.map((job) => <JobCard key={job.id} {...job} href={`/client/jobs/${job.id}`} />) : <EmptyState title="Sin trabajos publicados" text="Publica tu primer trabajo para recibir postulaciones." />}
      </div>
    </>
  );
}
