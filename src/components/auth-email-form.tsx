"use client";

import { Mail } from "lucide-react";
import { useState } from "react";
import { getBrowserSupabaseClient } from "@/lib/supabase";
import { buildOAuthRedirectTo, getBrowserOAuthAppUrl } from "@/lib/social-auth";

export function AuthEmailForm() {
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
        emailRedirectTo: buildOAuthRedirectTo(getBrowserOAuthAppUrl()),
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
    <form className="mt-6 grid gap-4 rounded-md border border-[var(--line)] bg-white p-5" onSubmit={handleSubmit}>
      <label className="grid gap-2 text-sm font-bold">
        Email
        <input
          className="focus-ring rounded-md border border-[var(--line)] px-3 py-2 font-normal"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="tu@email.com"
          type="email"
          value={email}
        />
      </label>
      <button
        className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-[var(--brand)] px-4 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
        disabled={status === "loading"}
        type="submit"
      >
        <Mail aria-hidden="true" size={18} />
        {status === "loading" ? "Enviando..." : "Crear cuenta / Ingresar"}
      </button>
      {message ? (
        <p className={status === "error" ? "text-sm font-bold text-[var(--danger)]" : "text-sm font-bold text-[var(--brand)]"}>{message}</p>
      ) : null}
    </form>
  );
}
