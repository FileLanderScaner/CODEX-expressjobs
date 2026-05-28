"use client";

import { Send } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ErrorState } from "@/components/error-state";
import { JobStatusBadge } from "@/components/job-status-badge";
import { LoadingState } from "@/components/loading-state";
import { TrustSafetyNotice } from "@/components/trust-safety-notice";
import { WhatsAppShareButton } from "@/components/whatsapp-share-button";
import { getBrowserSupabaseClient } from "@/lib/supabase";
import {
  authHref,
  ensureMarketplaceRole,
  fullNameFromUser,
  mapJobRow,
  parseAmountUyu,
  type MarketplaceJob,
} from "@/lib/marketplace";
import { applicationSchema } from "@/lib/marketplace-schemas";

type FormState = "idle" | "loading" | "success" | "error";

export function WorkerJobDetailClient({ jobId }: { jobId: string }) {
  const [job, setJob] = useState<MarketplaceJob | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadJob() {
      const supabase = getBrowserSupabaseClient();

      if (!supabase) {
        if (isMounted) {
          setJob(null);
          setLoading(false);
        }
        return;
      }

      const { data, error } = await supabase
        .from("ej_jobs")
        .select("id,title,description,location_text,budget_uyu,status,client_id,accepted_worker_id")
        .eq("id", jobId)
        .maybeSingle();

      if (!isMounted) {
        return;
      }

      setJob(!error && data ? mapJobRow(data) : null);
      setLoading(false);
    }

    void loadJob();

    return () => {
      isMounted = false;
    };
  }, [jobId]);

  async function handleApply(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setStatusMessage(null);

    const supabase = getBrowserSupabaseClient();

    if (!supabase) {
      setState("error");
      setStatusMessage("No pudimos conectar con los datos del piloto en este ambiente.");
      return;
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setState("error");
      setStatusMessage("Debes iniciar sesion para postularte.");
      return;
    }

    if (job?.clientId === user.id) {
      setState("error");
      setStatusMessage("No podes postularte a tu propio trabajo.");
      return;
    }

    const parsed = applicationSchema.safeParse({
      message,
      proposedAmountUyu: parseAmountUyu(amount),
    });

    if (!parsed.success) {
      setState("error");
      setStatusMessage(parsed.error.issues[0]?.message ?? "Agrega un mensaje corto para el cliente.");
      return;
    }

    const roleResult = await ensureMarketplaceRole(supabase, "worker", fullNameFromUser(user));

    if (roleResult.error) {
      setState("error");
      setStatusMessage("No pudimos preparar tu perfil trabajador.");
      return;
    }

    const { data: existingApplication } = await supabase
      .from("ej_job_applications")
      .select("id,status")
      .eq("job_id", jobId)
      .eq("worker_id", user.id)
      .maybeSingle();

    if (existingApplication) {
      setState("error");
      setStatusMessage("Ya tenes una postulacion para este trabajo.");
      return;
    }

    const { error } = await supabase.from("ej_job_applications").insert({
      job_id: jobId,
      worker_id: user.id,
      message: parsed.data.message,
      proposed_amount_uyu: parsed.data.proposedAmountUyu,
      status: "submitted",
    });

    if (error) {
      setState("error");
      setStatusMessage("No se pudo enviar la postulacion. Revisa que el trabajo siga abierto.");
      return;
    }

    setState("success");
    setStatusMessage("Postulacion enviada. El cliente podra verla y marcarla como aceptada o rechazada.");
  }

  if (loading) {
    return <LoadingState label="Cargando trabajo" />;
  }

  if (!job) {
    return <ErrorState message="No pudimos cargar este trabajo." />;
  }

  return (
    <section className="ej-card p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap gap-2">
            <p className="ej-chip text-sm font-bold">{job.category}</p>
            {job.urgency === "urgent" ? <span className="ej-warning-badge text-sm font-bold">Urgente</span> : null}
          </div>
          <h1 className="mt-1 text-3xl font-black">{job.title}</h1>
          <p className="ej-muted mt-2 text-sm font-bold">{job.location} - {job.budget}</p>
        </div>
        <JobStatusBadge status={job.status} />
      </div>
      <p className="ej-muted mt-4 leading-7">{job.description}</p>
      <form className="mt-5 grid gap-3 rounded-lg border border-[var(--ej-border)] bg-white/[0.06] p-4" onSubmit={handleApply}>
        <label className="grid gap-2 text-sm font-bold">
          Mensaje para el cliente
          <span className="ej-soft text-xs font-semibold">Explica disponibilidad, experiencia y cualquier duda importante.</span>
          <textarea
            className="focus-ring ej-textarea min-h-24 font-normal"
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Contale disponibilidad, experiencia y dudas concretas."
            value={message}
          />
        </label>
        <label className="grid gap-2 text-sm font-bold">
          Monto propuesto
          <span className="ej-soft text-xs font-semibold">Es aproximado y no activa pagos dentro de la app.</span>
          <input
            className="focus-ring ej-input font-normal"
            inputMode="numeric"
            onChange={(event) => setAmount(event.target.value)}
            placeholder="UYU"
            value={amount}
          />
        </label>
        {statusMessage ? (
          <p className={state === "error" ? "text-sm font-bold text-red-200" : "text-sm font-bold text-emerald-200"}>
            {statusMessage} {statusMessage.includes("iniciar sesion") ? <Link className="underline" href={authHref(`/worker/jobs/${jobId}`)}>Ir a ingresar</Link> : null}
          </p>
        ) : null}
        <div className="flex flex-wrap gap-3">
          <button
            className="focus-ring ej-btn-primary px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-60"
            disabled={state === "loading" || job.status !== "open"}
            type="submit"
          >
            <Send aria-hidden="true" size={16} /> {state === "loading" ? "Enviando..." : "Postularme"}
          </button>
          <WhatsAppShareButton text={`Trabajo cerca en Trabajos Rapidos: ${job.title}`} />
        </div>
      </form>
      <div className="mt-6">
        <TrustSafetyNotice />
      </div>
    </section>
  );
}
