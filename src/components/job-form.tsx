"use client";

import { AlertCircle, CheckCircle2, MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { categories } from "@/lib/expressjobs-data";
import { authHref, ensureMarketplaceRole, fullNameFromUser } from "@/lib/marketplace";
import { getBrowserSupabaseClient } from "@/lib/supabase";

type JobFormState = "idle" | "loading" | "success" | "error";

function parseBudget(value: string) {
  const normalized = value.replace(/[^0-9]/g, "");
  if (!normalized) {
    return null;
  }

  return Number.parseInt(normalized, 10);
}

export function JobForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>(categories[0]);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [state, setState] = useState<JobFormState>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage(null);

    const supabase = getBrowserSupabaseClient();

    if (!supabase) {
      setState("error");
      setMessage("Supabase no esta configurado en este ambiente.");
      return;
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setState("error");
      setMessage("Primero tenes que crear cuenta o iniciar sesion.");
      return;
    }

    if (!title.trim() || !description.trim() || !location.trim()) {
      setState("error");
      setMessage("Completa titulo, descripcion y ubicacion para publicar.");
      return;
    }

    const { error: profileError } = await ensureMarketplaceRole(supabase, "client", fullNameFromUser(user));

    if (profileError) {
      setState("error");
      setMessage("No pudimos preparar tu perfil. Revisa tu sesion o intenta de nuevo.");
      return;
    }

    const { data: createdJob, error: jobError } = await supabase
      .from("ej_jobs")
      .insert({
        client_id: user.id,
        title: title.trim(),
        description: description.trim(),
        location_text: location.trim(),
        budget_uyu: parseBudget(budget),
        status: "open",
      })
      .select("id")
      .single();

    if (jobError || !createdJob) {
      setState("error");
      setMessage("No se pudo publicar el trabajo. Revisa los datos e intenta de nuevo.");
      return;
    }

    setState("success");
    setMessage("Trabajo publicado correctamente.");
    router.push(`/client/jobs/${createdJob.id}`);
  }

  return (
    <form className="grid gap-4 rounded-md border border-[var(--line)] bg-white p-5 shadow-sm" onSubmit={handleSubmit}>
      <div className="rounded-md bg-[#eef7f1] p-3 text-sm text-[var(--brand-dark)]">
        <CheckCircle2 aria-hidden="true" className="mr-2 inline" size={16} />
        Publica una tarea real con tu cuenta. Los pagos dentro de la app siguen desactivados.
      </div>
      <label className="grid gap-2 text-sm font-bold">
        Titulo
        <input
          className="focus-ring rounded-md border border-[var(--line)] px-3 py-2 font-normal"
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Ej: Pintar una habitacion, mover cajas, reparar una canilla"
          value={title}
        />
      </label>
      <label className="grid gap-2 text-sm font-bold">
        Categoria
        <select
          className="focus-ring rounded-md border border-[var(--line)] px-3 py-2 font-normal"
          onChange={(event) => setCategory(event.target.value as (typeof categories)[number])}
          value={category}
        >
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </label>
      <label className="grid gap-2 text-sm font-bold">
        Descripcion
        <textarea
          className="focus-ring min-h-32 rounded-md border border-[var(--line)] px-3 py-2 font-normal"
          onChange={(event) => setDescription(event.target.value)}
          value={description}
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold">
          Ubicacion
          <div className="relative">
            <MapPin aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={16} />
            <input
              className="focus-ring w-full rounded-md border border-[var(--line)] py-2 pl-9 pr-3 font-normal"
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Barrio, ciudad"
              value={location}
            />
          </div>
        </label>
        <label className="grid gap-2 text-sm font-bold">
          Presupuesto aproximado
          <input
            className="focus-ring rounded-md border border-[var(--line)] px-3 py-2 font-normal"
            inputMode="numeric"
            onChange={(event) => setBudget(event.target.value)}
            placeholder="UYU"
            value={budget}
          />
        </label>
      </div>
      <p className="flex items-start gap-2 text-xs leading-5 text-[var(--muted)]">
        <AlertCircle aria-hidden="true" className="mt-0.5 shrink-0" size={14} />
        No publiques tareas peligrosas, ilegales o con datos sensibles.
      </p>
      {message ? (
        <div className={state === "error" ? "rounded-md border border-[#e2b8b1] bg-[#fff4f2] p-3 text-sm font-bold text-[var(--danger)]" : "rounded-md border border-[var(--line)] bg-[#eef7f1] p-3 text-sm font-bold text-[var(--brand)]"}>
          {message} {state === "error" && message.includes("sesion") ? <Link className="underline" href={authHref("/client/jobs/new")}>Ir a ingresar</Link> : null}
        </div>
      ) : null}
      <button
        className="focus-ring rounded-md bg-[var(--brand)] px-4 py-3 text-sm font-bold text-white hover:bg-[var(--brand-dark)] disabled:cursor-not-allowed disabled:opacity-60"
        disabled={state === "loading"}
        type="submit"
      >
        {state === "loading" ? "Publicando..." : "Publicar una tarea"}
      </button>
    </form>
  );
}
