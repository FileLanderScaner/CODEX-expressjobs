"use client";

import { BriefcaseBusiness } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ApplicationCard } from "@/components/application-card";
import { EmptyState } from "@/components/empty-state";
import { LoadingState } from "@/components/loading-state";
import { PrimaryButton } from "@/components/primary-button";
import type { ApplicationStatus, JobStatus } from "@/lib/expressjobs-data";
import { authHref, formatBudgetUyu, mapApplicationRow, type MarketplaceApplication } from "@/lib/marketplace";
import { getBrowserSupabaseClient } from "@/lib/supabase";

type LoadState = "loading" | "ready" | "signed-out" | "not-configured" | "error";

type ApplicationRow = {
  id: string;
  job_id: string;
  worker_id: string;
  message: string;
  proposed_amount_uyu: number | null;
  status: ApplicationStatus;
};

type JobRow = {
  id: string;
  title: string;
  location_text: string;
  budget_uyu: number | null;
  status: JobStatus;
};

type WorkerApplication = MarketplaceApplication & {
  jobTitle: string;
  jobLocation: string;
  jobBudget: string;
  jobStatus: JobStatus | "unknown";
};

const statusLabel: Record<ApplicationStatus, string> = {
  submitted: "Enviada",
  viewed: "Vista",
  shortlisted: "Preseleccionada",
  accepted: "Aceptada",
  rejected: "Rechazada",
  withdrawn: "Retirada",
};

export function WorkerApplicationsClient() {
  const [state, setState] = useState<LoadState>("loading");
  const [applications, setApplications] = useState<WorkerApplication[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function loadApplications() {
      const supabase = getBrowserSupabaseClient();

      if (!supabase) {
        setApplications([]);
        setState("not-configured");
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setApplications([]);
        setState("signed-out");
        return;
      }

      const { data: applicationRows, error: applicationsError } = await supabase
        .from("ej_job_applications")
        .select("id,job_id,worker_id,message,proposed_amount_uyu,status")
        .eq("worker_id", user.id)
        .order("created_at", { ascending: false });

      if (!isMounted) {
        return;
      }

      if (applicationsError) {
        setApplications([]);
        setState("error");
        return;
      }

      const rows = (applicationRows ?? []) as ApplicationRow[];
      const jobIds = Array.from(new Set(rows.map((row) => row.job_id)));
      const jobsById = new Map<string, JobRow>();

      if (jobIds.length) {
        const { data: jobRows } = await supabase
          .from("ej_jobs")
          .select("id,title,location_text,budget_uyu,status")
          .in("id", jobIds);

        for (const job of (jobRows ?? []) as JobRow[]) {
          jobsById.set(job.id, job);
        }
      }

      if (!isMounted) {
        return;
      }

      setApplications(
        rows.map((row) => {
          const job = jobsById.get(row.job_id);

          return {
            ...mapApplicationRow(row, "Tu postulacion"),
            jobTitle: job?.title ?? "Trabajo protegido",
            jobLocation: job?.location_text ?? "Zona protegida",
            jobBudget: formatBudgetUyu(job?.budget_uyu),
            jobStatus: job?.status ?? "unknown",
          };
        }),
      );
      setState("ready");
    }

    void loadApplications();

    return () => {
      isMounted = false;
    };
  }, []);

  const summary = useMemo(() => {
    return applications.reduce<Record<ApplicationStatus, number>>(
      (acc, application) => {
        acc[application.status] += 1;
        return acc;
      },
      { submitted: 0, viewed: 0, shortlisted: 0, accepted: 0, rejected: 0, withdrawn: 0 },
    );
  }, [applications]);

  if (state === "loading") {
    return <LoadingState label="Cargando postulaciones" />;
  }

  if (state === "signed-out") {
    return (
      <div className="ej-card p-5">
        <h2 className="text-xl font-black">Debes iniciar sesion para ver tus postulaciones.</h2>
        <Link className="focus-ring ej-btn-primary mt-4 text-sm" href={authHref("/dashboard/worker/applications")}>
          Ir a ingresar
        </Link>
      </div>
    );
  }

  if (state === "not-configured") {
    return (
      <EmptyState
        title="Sin conexion a datos reales"
        text="Supabase publico no esta configurado en este ambiente. No se muestran postulaciones de ejemplo."
      />
    );
  }

  if (state === "error") {
    return (
      <p className="rounded-lg border border-[rgba(239,68,68,0.32)] bg-[var(--ej-danger-soft)] p-4 text-sm font-semibold text-red-200">
        No pudimos cargar tus postulaciones. Revisa tu sesion o intenta mas tarde.
      </p>
    );
  }

  return (
    <section>
      <div className="grid gap-3 sm:grid-cols-3">
        {(["submitted", "shortlisted", "accepted"] as ApplicationStatus[]).map((status) => (
          <article className="ej-card p-4" key={status}>
            <p className="ej-soft text-xs font-black uppercase tracking-[0.12em]">{statusLabel[status]}</p>
            <p className="mt-1 text-2xl font-black">{summary[status]}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-4">
        {applications.length ? (
          applications.map((application) => (
            <article className="ej-card p-4" key={application.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="ej-chip text-[11px] uppercase tracking-wide">{statusLabel[application.status]}</p>
                  <h2 className="mt-3 text-xl font-black">{application.jobTitle}</h2>
                  <p className="ej-muted mt-1 text-sm font-bold">
                    {application.jobLocation} - {application.jobBudget}
                  </p>
                </div>
                <Link className="focus-ring ej-btn-secondary px-3 py-2 text-sm" href={`/worker/jobs/${application.jobId}`}>
                  Ver trabajo
                </Link>
              </div>
              <div className="mt-4">
                <ApplicationCard {...application} />
              </div>
            </article>
          ))
        ) : (
          <EmptyState
            title="Sin postulaciones"
            text="Busca un trabajo abierto y postulate desde el detalle. Aca vas a ver estados reales protegidos por RLS."
          />
        )}
      </div>

      <div className="mt-5">
        <PrimaryButton href="/worker/jobs" icon={BriefcaseBusiness}>Buscar trabajos abiertos</PrimaryButton>
      </div>
    </section>
  );
}
