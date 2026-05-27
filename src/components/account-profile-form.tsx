"use client";

import { LogOut, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { AccountProfile } from "@/lib/account";
import { ProfileProcessSteps } from "@/components/profile-process-steps";
import { getBrowserSupabaseClient } from "@/lib/supabase";

type SaveState = "idle" | "saving" | "saved" | "error";

function cleanText(value: string, maxLength: number) {
  const normalized = value.trim().replace(/\s+/g, " ");
  return normalized ? normalized.slice(0, maxLength) : "";
}

export function AccountProfileForm({ profile }: { profile: AccountProfile }) {
  const router = useRouter();
  const [state, setState] = useState<SaveState>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("saving");
    setMessage(null);

    const supabase = getBrowserSupabaseClient();
    if (!supabase) {
      setState("error");
      setMessage("Supabase Auth no esta configurado en este ambiente.");
      return;
    }

    const form = new FormData(event.currentTarget);
    const fullName = cleanText(String(form.get("fullName") ?? ""), 120);
    const phone = cleanText(String(form.get("phone") ?? ""), 40) || null;
    const city = cleanText(String(form.get("city") ?? ""), 80) || null;

    if (!fullName) {
      setState("error");
      setMessage("El nombre visible es obligatorio.");
      return;
    }

    const { error } = await supabase
      .from("ej_profiles")
      .update({
        full_name: fullName,
        phone,
        city,
        updated_at: new Date().toISOString(),
      })
      .eq("id", profile.id);

    if (error) {
      setState("error");
      setMessage("No pudimos guardar tu perfil. Revisa tu sesion e intenta de nuevo.");
      return;
    }

    setState("saved");
    setMessage("Perfil guardado.");
    router.refresh();
  }

  async function handleLogout() {
    setState("saving");
    setMessage(null);

    const supabase = getBrowserSupabaseClient();
    if (supabase) {
      await supabase.auth.signOut();
    }

    router.push("/auth");
    router.refresh();
  }

  return (
    <section className="grid gap-5">
      <form className="ej-card grid gap-4 p-5" onSubmit={handleSubmit}>
 codex/expressjobs-global-soft-premium-redesign-manual

        <ProfileProcessSteps currentStep={5} />
 main
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold">
            Nombre visible
            <input
              className="focus-ring ej-input font-normal"
              defaultValue={profile.full_name}
              name="fullName"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Telefono
            <input
              className="focus-ring ej-input font-normal"
              defaultValue={profile.phone ?? ""}
              inputMode="tel"
              name="phone"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Ciudad
            <input
              className="focus-ring ej-input font-normal"
              defaultValue={profile.city ?? ""}
              name="city"
            />
          </label>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
            <p className="ej-soft text-xs font-bold uppercase tracking-wide">Rol actual</p>
            <p className="mt-1 text-sm font-black">{profile.role}</p>
          </div>
        </div>
        {message ? (
          <p className={state === "error" ? "text-sm font-bold text-[#ffb4c2]" : "text-sm font-bold text-[#d9f7bd]"}>
            {message}
          </p>
        ) : null}
        <button
          className="focus-ring ej-btn-primary w-fit text-sm disabled:opacity-60"
          disabled={state === "saving"}
          type="submit"
        >
          <Save aria-hidden="true" size={16} />
          {state === "saving" ? "Guardando..." : "Guardar perfil"}
        </button>
      </form>

      <div className="ej-card p-5">
        <h2 className="text-xl font-black">Sesion</h2>
        <p className="ej-muted mt-2 text-sm">Cerrar sesion borra la sesion local del navegador y vuelve a la pantalla de ingreso.</p>
        <button
          className="focus-ring ej-btn-secondary mt-4 text-sm hover:border-[rgba(255,90,120,0.35)] hover:text-[#ffb4c2] disabled:opacity-60"
          disabled={state === "saving"}
          onClick={() => void handleLogout()}
          type="button"
        >
          <LogOut aria-hidden="true" size={16} />
          Cerrar sesion
        </button>
      </div>
    </section>
  );
}
