"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ApplicationCard } from "@/components/application-card";
import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { JobStatusBadge } from "@/components/job-status-badge";
import { LoadingState } from "@/components/loading-state";
import { StatusFlow } from "@/components/status-flow";
import { WhatsAppShareButton } from "@/components/whatsapp-share-button";
import { authHref, mapApplicationRow, mapJobRow, type MarketplaceApplication, type MarketplaceJob } from "@/lib/marketplace";
import { getBrowserSupabaseClient } from "@/lib/supabase";

type DetailState = "loading" | "ready" | "signed-out" | "not-configured" | "error";

export function ClientJobDetailClient({ jobId }: { jobId: string }) {
  const [state, setState] = useState<DetailState>("loading");
  const [job, setJob] = useState<MarketplaceJob | null>(null);
  const [applications, setApplications] = useState<MarketplaceApplication[]>([]);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const loadDetail = useCallback(async () => {
    await Promise.resolve();
    setState("loading");
    const supabase = getBrowserSupabaseClient();

    if (!supabase) {
      setJob(null);
      setApplications([]);
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

    const jobResult = await supabase
      .from("ej_jobs")
      .select("id,title,description,location_text,budget_uyu,status,client_id,accepted_worker_id")
      .eq("id", jobId)
      .eq("client_id", user.id)
      .maybeSingle();

    if (jobResult.error || !jobResult.data) {
      setState("error");
      return;
    }

    const applicationsResult = await supabase
      .from("ej_job_applications")
      .select("id,job_id,worker_id,message,proposed_amount_uyu,status")
      .eq("job_id", jobId)
      .order("created_at", { ascending: true });

    setJob(mapJobRow(jobResult.data));
    setApplications((applicationsResult.data ?? []).map((row) => mapApplicationRow(row)));
    setState(applicationsResult.error ? "error" : "ready");
  }, [jobId]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void loadDetail();
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [loadDetail]);

  async function updateApplication(applicationId: string, action: "accept" | "reject") {
    setActionMessage(null);
    const supabase = getBrowserSupabaseClient();

    if (!supabase) {
      setActionMessage("Supabase no esta configurado en este ambiente.");
      return;
    }

    const rpcName = action === "accept" ? "ej_accept_job_application" : "ej_reject_job_application";
    const { error } = await supabase.rpc(rpcName, { requested_application_id: applicationId });

    if (error) {
      setActionMessage(action === "accept" ? "No se pudo aceptar esta postulacion. Revisa que siga abierta y que tu sesion tenga permiso." : "No se pudo rechazar esta postulacion. Revisa tu sesion e intenta de nuevo.");
      return;
    }

    setActionMessage(action === "accept" ? "Trabajador aceptado. Ahora coordina los detalles con cuidado y sin compartir datos sensibles." : "Postulacion rechazada. El estado quedo actualizado para este trabajo.");
    await loadDetail();
  }

  if (state === "loading") {
    return <LoadingState label="Cargando trabajo" />;
  }

  if (state === "signed-out") {
    return (
      <div className="ej-card p-5">
        <h1 className="text-2xl font-black">Debes iniciar sesion para gestionar este trabajo.</h1>
        <Link className="focus-ring ej-btn-primary mt-4 text-sm" href={authHref(`/client/jobs/${jobId}`)}>
          Ir a ingresar
        </Link>
      </div>
    );
  }

  if (state === "not-configured") {
    return <ErrorState message="Supabase publico no esta configurado en este ambiente. No hay datos reales para mostrar." />;
  }

  if (state === "error" || !job) {
    return <ErrorState message="No pudimos cargar este trabajo con tu sesion actual." />;
  }

  return (
    <section>
      <div className="ej-card p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="ej-chip text-sm font-bold">{job.category}</p>
            <h1 className="mt-1 text-3xl font-black">{job.title}</h1>
            <p className="ej-muted mt-2 text-sm font-bold">{job.location} - {job.budget}</p>
          </div>
          <JobStatusBadge status={job.status} />
        </div>
        <p className="ej-muted mt-4 leading-7">{job.description}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <WhatsAppShareButton text={`Trabajo en Trabajos Rapidos: ${job.title}`} />
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-black">Postulaciones</h2>

        <p className="ej-muted mt-2 text-sm leading-6">
          Compara mensaje, monto y reputacion. Aceptar o rechazar actualiza el estado protegido por RLS.
        </p>
        {actionMessage ? <p className="mt-3 rounded-2xl border border-[rgba(123,193,67,0.28)] bg-[var(--ej-accent-soft)] p-3 text-sm font-bold text-[#d9f7bd]">{actionMessage}</p> : null}
        <div className="mt-4 grid gap-3">
          {applications.length ? (
            applications.map((application) => (
              <ApplicationCard
                key={application.id}
                {...application}
                actions={
                  application.status === "submitted" && state === "ready" ? (
                    <div className="flex flex-wrap gap-2">
                      <button
                        className="focus-ring ej-btn-primary px-3 py-2 text-sm"
                        onClick={() => void updateApplication(application.id, "accept")}
                        type="button"
                      >
                        <CheckCircle2 aria-hidden="true" size={16} /> Aceptar
                      </button>
                      <button
                        className="focus-ring ej-btn-secondary px-3 py-2 text-sm"
                        onClick={() => void updateApplication(application.id, "reject")}
                        type="button"
                      >
                        <XCircle aria-hidden="true" size={16} /> Rechazar
                      </button>
                    </div>
                  ) : null
                }
              />
            ))
          ) : (
            <EmptyState title="Sin postulaciones" text="Cuando un trabajador se postule, aparecera aca. Compartir el trabajo puede ayudar, pero los pagos dentro de la app siguen apagados." />
          )}
        </div>
      </div>
      <div className="mt-6">
        <StatusFlow />
      </div>
    </section>
  );
}
