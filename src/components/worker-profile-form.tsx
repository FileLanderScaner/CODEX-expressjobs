"use client";

import { Save } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { authHref, ensureMarketplaceRole, fullNameFromUser } from "@/lib/marketplace";
import { workerProfileSchema } from "@/lib/marketplace-schemas";
import { ProfileProcessSteps, workerProfileProcessSteps } from "@/components/profile-process-steps";
import { getBrowserSupabaseClient } from "@/lib/supabase";

type SaveState = "idle" | "saving" | "saved" | "error";

export function WorkerProfileForm() {
  const [state, setState] = useState<SaveState>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("saving");
    setMessage(null);

    const form = new FormData(event.currentTarget);
    const parsed = workerProfileSchema.safeParse({
      fullName: form.get("fullName"),
      phone: form.get("phone"),
      city: form.get("city"),
      headline: form.get("headline"),
      bio: form.get("bio"),
      skills: form.get("skills"),
      serviceRadiusKm: form.get("serviceRadiusKm"),
      hourlyRateUyu: form.get("hourlyRateUyu") || null,
    });

    if (!parsed.success) {
      setState("error");
      setMessage(parsed.error.issues[0]?.message ?? "Revisa los campos del perfil.");
      return;
    }

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
      setMessage("Debes iniciar sesion para guardar tu perfil.");
      return;
    }

    const roleResult = await ensureMarketplaceRole(supabase, "worker", fullNameFromUser(user));
    if (roleResult.error) {
      setState("error");
      setMessage("No pudimos confirmar tu rol trabajador.");
      return;
    }

    const profileUpdate = await supabase
      .from("ej_profiles")
      .update({
        full_name: parsed.data.fullName,
        phone: parsed.data.phone,
        city: parsed.data.city,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    const workerUpsert = await supabase.from("ej_worker_profiles").upsert({
      user_id: user.id,
      headline: parsed.data.headline,
      bio: parsed.data.bio,
      skills: parsed.data.skills,
      service_radius_km: parsed.data.serviceRadiusKm,
      hourly_rate_uyu: parsed.data.hourlyRateUyu,
      is_available: true,
      updated_at: new Date().toISOString(),
    });

    if (profileUpdate.error || workerUpsert.error) {
      setState("error");
      setMessage("No se pudo guardar el perfil trabajador con tu sesion actual.");
      return;
    }

    setState("saved");
    setMessage("Perfil trabajador guardado.");
  }

  return (
    <form className="ej-card grid gap-4 p-5" onSubmit={handleSubmit}>
      <ProfileProcessSteps currentStep={3} steps={workerProfileProcessSteps} />
      <div className="rounded-lg border border-[rgba(96,165,250,0.28)] bg-[var(--ej-accent-soft)] p-4 text-sm font-semibold leading-6 text-blue-100">
        Completa habilidades, zona, experiencia, disponibilidad y tarifa de referencia. Un perfil claro ayuda al cliente a comparar postulaciones sin pedir datos sensibles.
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field hint="Nombre visible para clientes." label="Nombre completo" name="fullName" placeholder="Nombre y apellido" />
        <Field hint="Contacto de referencia; no se publica como dato sensible en listados publicos." label="Telefono" name="phone" placeholder="WhatsApp o celular" />
        <Field hint="Zona base para recomendar trabajos cercanos." label="Ciudad" name="city" placeholder="Montevideo, Canelones..." />
        <Field hint="Una frase que explique que haces mejor." label="Titulo de perfil" name="headline" placeholder="Ej: Limpieza, fletes y reparaciones chicas" />
        <Field hint="Cuantos kilometros podes cubrir." label="Radio de trabajo en km" name="serviceRadiusKm" placeholder="10" type="number" />
        <Field hint="Referencia para comparar propuestas; no activa pagos dentro de la app." label="Tarifa por hora UYU" name="hourlyRateUyu" placeholder="450" type="number" />
      </div>
      <Field hint="Separalas con coma para que sean faciles de leer." label="Habilidades" name="skills" placeholder="Limpieza, fletes, reparaciones, cuidado" />
      <label className="grid gap-2 text-sm font-bold">
        Experiencia y disponibilidad
        <span className="ej-soft text-xs font-semibold">Conta experiencia real, dias/horarios y tipo de tareas que aceptas.</span>
        <textarea className="focus-ring ej-textarea font-normal" name="bio" placeholder="Ej: Disponible de lunes a sabado en Montevideo. Experiencia en limpieza y fletes chicos." />
      </label>
      {message ? (
        <p className={state === "error" ? "rounded-lg border border-[rgba(239,68,68,0.32)] bg-[var(--ej-danger-soft)] p-3 text-sm font-bold text-red-200" : "rounded-lg border border-[rgba(16,185,129,0.32)] bg-[var(--ej-success-soft)] p-3 text-sm font-bold text-emerald-200"}>
          {message} {message.includes("iniciar sesion") ? <Link className="underline" href={authHref("/dashboard/worker/profile")}>Ingresar</Link> : null}
        </p>
      ) : null}
      <button className="focus-ring ej-btn-primary w-fit text-sm disabled:opacity-60" disabled={state === "saving"} type="submit">
        <Save aria-hidden="true" size={16} /> {state === "saving" ? "Guardando..." : "Guardar perfil trabajador"}
      </button>
    </form>
  );
}

function Field({ hint, label, name, placeholder, type = "text" }: { hint?: string; label: string; name: string; placeholder: string; type?: string }) {
  return (
    <label className="grid gap-2 text-sm font-bold">
      {label}
      {hint ? <span className="ej-soft text-xs font-semibold">{hint}</span> : null}
      <input className="focus-ring ej-input font-normal" name={name} placeholder={placeholder} type={type} />
    </label>
  );
}
