"use client";

import { Building2, Save } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { authHref, ensureMarketplaceRole, fullNameFromUser } from "@/lib/marketplace";
import { companyProfileSchema } from "@/lib/marketplace-schemas";
import { ProfileProcessSteps } from "@/components/profile-process-steps";
import { getBrowserSupabaseClient } from "@/lib/supabase";

type SaveState = "idle" | "saving" | "saved" | "error";

export function CompanyProfileForm() {
  const [state, setState] = useState<SaveState>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("saving");
    setMessage(null);

    const form = new FormData(event.currentTarget);
    const parsed = companyProfileSchema.safeParse({
      fullName: form.get("fullName"),
      phone: form.get("phone"),
      city: form.get("city"),
      companyName: form.get("companyName"),
      companyType: form.get("companyType"),
      businessCategory: form.get("businessCategory"),
      contactPhone: form.get("contactPhone"),
      description: form.get("description"),
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
      setMessage("Debes iniciar sesion para guardar tu perfil empresa.");
      return;
    }

    const roleResult = await ensureMarketplaceRole(supabase, "client", fullNameFromUser(user));
    if (roleResult.error) {
      setState("error");
      setMessage("No pudimos confirmar tu rol cliente.");
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

    const companyUpsert = await supabase.from("ej_company_profiles").upsert({
      profile_id: user.id,
      company_name: parsed.data.companyName,
      company_type: parsed.data.companyType,
      business_category: parsed.data.businessCategory,
      contact_phone: parsed.data.contactPhone,
      city: parsed.data.city,
      description: parsed.data.description,
      updated_at: new Date().toISOString(),
    });

    if (profileUpdate.error || companyUpsert.error) {
      setState("error");
      setMessage("No se pudo guardar el perfil empresa. Verifica que la migracion de staging este aplicada.");
      return;
    }

    setState("saved");
    setMessage("Perfil empresa guardado.");
  }

  return (
    <form className="ej-card grid gap-4 p-5" onSubmit={handleSubmit}>
 codex/expressjobs-global-soft-premium-redesign-manual

      <ProfileProcessSteps currentStep={3} />
 main
      <div className="flex items-center gap-2">
        <Building2 aria-hidden="true" className="text-[var(--ej-accent)]" />
        <p className="ej-muted text-sm font-bold">Datos visibles para publicar y gestionar postulantes.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nombre visible" name="fullName" placeholder="Responsable de la cuenta" />
        <Field label="Telefono" name="phone" placeholder="WhatsApp o celular" />
        <Field label="Ciudad" name="city" placeholder="Montevideo, Canelones..." />
        <Field label="Empresa o persona" name="companyName" placeholder="Nombre comercial o particular" />
        <label className="grid gap-2 text-sm font-bold">
          Tipo de cuenta
          <select className="focus-ring ej-select font-normal" name="companyType">
            <option value="individual">Persona</option>
            <option value="business">Empresa</option>
          </select>
        </label>
        <Field label="Rubro" name="businessCategory" placeholder="Hogar, gastronomia, eventos..." />
        <Field label="Telefono de contacto" name="contactPhone" placeholder="WhatsApp para coordinar" />
      </div>
      <label className="grid gap-2 text-sm font-bold">
        Descripcion
        <textarea className="focus-ring ej-textarea min-h-28 font-normal" name="description" />
      </label>
      {message ? (
        <p className={state === "error" ? "text-sm font-bold text-[#ffb4c2]" : "text-sm font-bold text-[#d9f7bd]"}>
          {message} {message.includes("iniciar sesion") ? <Link className="underline" href={authHref("/dashboard/client/profile")}>Ingresar</Link> : null}
        </p>
      ) : null}
      <button className="focus-ring ej-btn-primary w-fit text-sm disabled:opacity-60" disabled={state === "saving"} type="submit">
        <Save aria-hidden="true" size={16} /> {state === "saving" ? "Guardando..." : "Guardar perfil empresa"}
      </button>
    </form>
  );
}

function Field({ label, name, placeholder }: { label: string; name: string; placeholder: string }) {
  return (
    <label className="grid gap-2 text-sm font-bold">
      {label}
      <input className="focus-ring ej-input font-normal" name={name} placeholder={placeholder} />
    </label>
  );
}
