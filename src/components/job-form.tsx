"use client";

import { AlertCircle, CheckCircle2, MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { categories } from "@/lib/expressjobs-data";
import { authHref, ensureMarketplaceRole, fullNameFromUser, serializeJobDescription } from "@/lib/marketplace";
import { jobPostSchema } from "@/lib/marketplace-schemas";
import { buildLocationText } from "@/lib/location";
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
  const [urgency, setUrgency] = useState<"normal" | "urgent">("normal");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [addressPrivate, setAddressPrivate] = useState("");
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
      setMessage("No pudimos conectar con los datos del piloto en este ambiente. Proba de nuevo mas tarde.");
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

    const location = buildLocationText({ city, neighborhood });
    const parsed = jobPostSchema.safeParse({
      title,
      category,
      description,
      location,
      city,
      neighborhood,
      addressPrivate,
      budgetUyu: parseBudget(budget),
      urgency,
    });

    if (!parsed.success) {
      setState("error");
      setMessage(parsed.error.issues[0]?.message ?? "Completa los datos necesarios para publicar.");
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
        title: parsed.data.title,
        description: serializeJobDescription({
          category: parsed.data.category,
          urgency: parsed.data.urgency,
          description: parsed.data.description,
        }),
        location_text: parsed.data.location,
        city: parsed.data.city,
        neighborhood: parsed.data.neighborhood || null,
        address_private: parsed.data.addressPrivate || null,
        location_precision: parsed.data.neighborhood ? "manual_neighborhood" : "manual_city",
        budget_uyu: parsed.data.budgetUyu,
        status: "open",
      })
      .select("id")
      .single();

    if (jobError || !createdJob) {
      setState("error");
      setMessage("No se pudo publicar el trabajo. Revisa titulo, descripcion, zona y presupuesto aproximado, e intenta de nuevo.");
      return;
    }

    setState("success");
    setMessage("Trabajo publicado correctamente. Ahora podes revisar postulaciones desde el detalle.");
    router.push(`/client/jobs/${createdJob.id}`);
  }

  return (
    <form className="ej-card grid gap-4 p-5" onSubmit={handleSubmit}>
      <div className="rounded-lg border border-[rgba(16,185,129,0.32)] bg-[var(--ej-success-soft)] p-3 text-sm font-semibold text-emerald-200">
        <CheckCircle2 aria-hidden="true" className="mr-2 inline" size={16} />
        Publica una tarea real con tu cuenta. Los pagos dentro de la app siguen desactivados.
      </div>

      <div className="rounded-lg border border-[var(--ej-border)] bg-white/[0.04] p-4 text-sm text-[var(--ej-text-muted)]">
        <p className="font-black text-[var(--ej-text)]">Antes de publicar</p>
        <ol className="mt-3 grid gap-2 font-semibold leading-6">
          <li>1. Que necesitas: resultado concreto, no solo el rubro.</li>
          <li>2. Donde: ciudad y barrio aproximado para que aparezca en trabajos cercanos.</li>
          <li>3. Direccion exacta: opcional y privada, no se muestra en listados publicos.</li>
          <li>4. Presupuesto y urgencia: ayuda a recibir propuestas comparables.</li>
        </ol>
      </div>

      <label className="grid gap-2 text-sm font-bold">
        Titulo
        <span className="ej-soft text-xs font-semibold">Escribi la tarea en una frase concreta. Evita datos personales.</span>
        <input
          className="focus-ring ej-input font-normal"
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Ej: Pintar una habitacion, mover cajas, reparar una canilla"
          value={title}
        />
      </label>

      <label className="grid gap-2 text-sm font-bold">
        Categoria
        <span className="ej-soft text-xs font-semibold">Elegila por el tipo de ayuda que esperas recibir.</span>
        <select
          className="focus-ring ej-select font-normal"
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
        <span className="ej-soft text-xs font-semibold">Inclui que hay que hacer, cuando lo necesitas y cualquier condicion importante.</span>
        <textarea
          className="focus-ring ej-textarea font-normal"
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Conta que necesitas, cuando, en que zona y cualquier detalle importante."
          value={description}
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold">
          Ciudad
          <span className="ej-soft text-xs font-semibold">Obligatoria para mostrar trabajos cerca.</span>
          <div className="relative">
            <MapPin aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ej-text-soft)]" size={16} />
            <input
              className="focus-ring ej-input py-2 pl-9 pr-3 font-normal"
              onChange={(event) => setCity(event.target.value)}
              placeholder="Ej: Montevideo"
              value={city}
            />
          </div>
        </label>

        <label className="grid gap-2 text-sm font-bold">
          Barrio o zona
          <span className="ej-soft text-xs font-semibold">Aproximado; ayuda a ordenar por cercania.</span>
          <input
            className="focus-ring ej-input font-normal"
            onChange={(event) => setNeighborhood(event.target.value)}
            placeholder="Ej: Cordon, Pocitos, Centro"
            value={neighborhood}
          />
        </label>
      </div>

      <label className="grid gap-2 text-sm font-bold">
        Direccion privada opcional
        <span className="ej-soft text-xs font-semibold">No se muestra en listados publicos. Usala solo para coordinar con trabajador aceptado.</span>
        <input
          className="focus-ring ej-input font-normal"
          onChange={(event) => setAddressPrivate(event.target.value)}
          placeholder="Ej: calle y numero, apartamento o referencia"
          value={addressPrivate}
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold">
          Urgencia
          <span className="ej-soft text-xs font-semibold">Usa urgente solo si necesitas coordinar pronto.</span>
          <select
            className="focus-ring ej-select font-normal"
            onChange={(event) => setUrgency(event.target.value as "normal" | "urgent")}
            value={urgency}
          >
            <option value="normal">Normal</option>
            <option value="urgent">Urgente</option>
          </select>
        </label>

        <label className="grid gap-2 text-sm font-bold">
          Presupuesto aproximado
          <span className="ej-soft text-xs font-semibold">Puede ser estimado. Sirve para comparar propuestas, no es pago dentro de la app.</span>
          <input
            className="focus-ring ej-input font-normal"
            inputMode="numeric"
            onChange={(event) => setBudget(event.target.value)}
            placeholder="Ej: UYU 800"
            value={budget}
          />
        </label>
      </div>

      <p className="ej-soft flex items-start gap-2 text-xs leading-5">
        <AlertCircle aria-hidden="true" className="mt-0.5 shrink-0" size={14} />
        No publiques tareas peligrosas, ilegales o con datos sensibles. La direccion exacta no se muestra en listados.
      </p>

      {message ? (
        <div className={state === "error" ? "rounded-lg border border-[rgba(239,68,68,0.32)] bg-[var(--ej-danger-soft)] p-3 text-sm font-bold text-red-200" : "rounded-lg border border-[rgba(16,185,129,0.32)] bg-[var(--ej-success-soft)] p-3 text-sm font-bold text-emerald-200"}>
          {message} {state === "error" && message.includes("sesion") ? <Link className="underline" href={authHref("/client/jobs/new")}>Ir a ingresar</Link> : null}
        </div>
      ) : null}

      <button
        className="focus-ring ej-btn-primary text-sm disabled:cursor-not-allowed disabled:opacity-60"
        disabled={state === "loading"}
        type="submit"
      >
        {state === "loading" ? "Publicando..." : "Publicar trabajo"}
      </button>
    </form>
  );
}
