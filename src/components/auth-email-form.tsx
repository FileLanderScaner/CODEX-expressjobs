"use client";

import { Mail } from "lucide-react";
import { useState } from "react";
import { getBrowserSupabaseClient } from "@/lib/supabase";
import { buildOAuthRedirectTo, getBrowserOAuthAppUrl } from "@/lib/social-auth";

export function AuthEmailForm({ nextPath }: { nextPath?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage(null);

    const supabase = getBrowserSupabaseClient();

    if (!supabase) {
      setStatus("error");
      setMessage("Supabase Auth no esta configurado en este ambiente.");
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setStatus("error");
      setMessage("Ingresa un email valido.");
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email: normalizedEmail,
      options: {
        emailRedirectTo: buildOAuthRedirectTo(getBrowserOAuthAppUrl(), nextPath),
      },
    });

    if (error) {
      setStatus("error");
      setMessage("No se pudo enviar el acceso. Revisa la configuracion de Supabase Auth.");
      return;
    }

    setStatus("sent");
    setMessage("Te enviamos un enlace para entrar o crear tu cuenta. Revisa tu email.");
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
      <label className="grid gap-2 text-sm font-bold text-[var(--ej-text)]">
        Email
        <input
          className="focus-ring ej-input font-normal"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="tu@email.com"
          type="email"
          value={email}
        />
      </label>
      <button
        className="focus-ring ej-btn-primary text-sm disabled:cursor-not-allowed disabled:opacity-60"
        disabled={status === "loading"}
        type="submit"
      >
        <Mail aria-hidden="true" size={18} />
        {status === "loading" ? "Enviando..." : "Crear cuenta / Ingresar"}
      </button>
      {message ? (
        <p className={status === "error" ? "rounded-2xl border border-[rgba(255,90,120,0.28)] bg-[var(--ej-danger-soft)] p-3 text-sm font-bold text-[#ffb4c2]" : "rounded-2xl border border-[rgba(123,193,67,0.28)] bg-[var(--ej-accent-soft)] p-3 text-sm font-bold text-[#d9f7bd]"}>{message}</p>
      ) : null}
    </form>
  );
}
