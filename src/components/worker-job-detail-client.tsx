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
import { getJobById } from "@/services/jobs-service";

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
          setJob(getJobById(jobId));
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

      setJob(!error && data ? mapJobRow(data) : getJobById(jobId));
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
      setStatusMessage("Supabase no esta configurado en este ambiente.");
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

    if (!message.trim()) {
      setState("error");
      setStatusMessage("Agrega un mensaje corto para el cliente.");
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
      message: message.trim(),
      proposed_amount_uyu: parseAmountUyu(amount),
      status: "submitted",
    });

    if (error) {
      setState("error");
      setStatusMessage("No se pudo enviar la postulacion. Revisa que el trabajo siga abierto.");
      return;
    }

    setState("success");
    setStatusMessage("Postulacion enviada.");
  }

  if (loading) {
    return <LoadingState label="Cargando trabajo" />;
  }

  if (!job) {
    return <ErrorState message="No pudimos cargar este trabajo." />;
  }

  return (
    <section className="rounded-md border border-[var(--line)] bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-[var(--brand)]">{job.category}</p>
          <h1 className="mt-1 text-3xl font-black">{job.title}</h1>
          <p className="mt-2 text-sm font-bold text-[var(--muted)]">{job.location} · {job.budget}</p>
        </div>
        <JobStatusBadge status={job.status} />
      </div>
      <p className="mt-4 leading-7 text-[var(--muted)]">{job.description}</p>
      <form className="mt-5 grid gap-3 rounded-md border border-[var(--line)] bg-[#f8faf7] p-4" onSubmit={handleApply}>
        <label className="grid gap-2 text-sm font-bold">
          Mensaje para el cliente
          <textarea
            className="focus-ring min-h-24 rounded-md border border-[var(--line)] px-3 py-2 font-normal"
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Contale disponibilidad, experiencia y dudas concretas."
            value={message}
          />
        </label>
        <label className="grid gap-2 text-sm font-bold">
          Monto propuesto
          <input
            className="focus-ring rounded-md border border-[var(--line)] px-3 py-2 font-normal"
            inputMode="numeric"
            onChange={(event) => setAmount(event.target.value)}
            placeholder="UYU"
            value={amount}
          />
        </label>
        {statusMessage ? (
          <p className={state === "error" ? "text-sm font-bold text-[var(--danger)]" : "text-sm font-bold text-[var(--brand)]"}>
            {statusMessage} {statusMessage.includes("iniciar sesion") ? <Link className="underline" href={authHref(`/worker/jobs/${jobId}`)}>Ir a ingresar</Link> : null}
          </p>
        ) : null}
        <div className="flex flex-wrap gap-3">
          <button
            className="focus-ring inline-flex items-center gap-2 rounded-md bg-[var(--brand)] px-3 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
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
