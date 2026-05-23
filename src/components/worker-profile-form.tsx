"use client";

import { Save } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { authHref, ensureMarketplaceRole, fullNameFromUser } from "@/lib/marketplace";
import { workerProfileSchema } from "@/lib/marketplace-schemas";
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
    <form className="grid gap-4 rounded-md border border-[var(--line)] bg-white p-5" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nombre completo" name="fullName" placeholder="Nombre y apellido" />
        <Field label="Telefono" name="phone" placeholder="WhatsApp o celular" />
        <Field label="Ciudad" name="city" placeholder="Montevideo, Canelones..." />
        <Field label="Titulo de perfil" name="headline" placeholder="Ej: Ayudante para limpieza y eventos" />
        <Field label="Radio de trabajo en km" name="serviceRadiusKm" placeholder="10" type="number" />
        <Field label="Pretension por hora UYU" name="hourlyRateUyu" placeholder="450" type="number" />
      </div>
      <Field label="Habilidades" name="skills" placeholder="Limpieza, delivery, reparaciones" />
      <label className="grid gap-2 text-sm font-bold">
        Experiencia y disponibilidad
        <textarea className="focus-ring min-h-32 rounded-md border border-[var(--line)] px-3 py-2 font-normal" name="bio" />
      </label>
      {message ? (
        <p className={state === "error" ? "text-sm font-bold text-[var(--danger)]" : "text-sm font-bold text-[var(--brand)]"}>
          {message} {message.includes("iniciar sesion") ? <Link className="underline" href={authHref("/dashboard/worker/profile")}>Ingresar</Link> : null}
        </p>
      ) : null}
      <button className="focus-ring inline-flex w-fit items-center gap-2 rounded-md bg-[var(--brand)] px-4 py-3 text-sm font-bold text-white disabled:opacity-60" disabled={state === "saving"} type="submit">
        <Save aria-hidden="true" size={16} /> {state === "saving" ? "Guardando..." : "Guardar perfil trabajador"}
      </button>
    </form>
  );
}

function Field({ label, name, placeholder, type = "text" }: { label: string; name: string; placeholder: string; type?: string }) {
  return (
    <label className="grid gap-2 text-sm font-bold">
      {label}
      <input className="focus-ring rounded-md border border-[var(--line)] px-3 py-2 font-normal" name={name} placeholder={placeholder} type={type} />
    </label>
  );
}
