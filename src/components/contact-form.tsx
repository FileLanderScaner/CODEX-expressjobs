"use client";

import { useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage(null);
    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      message: String(form.get("message") ?? ""),
    };
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      setState("error");
      setMessage("Revisa los datos e intenta de nuevo.");
      return;
    }

    setState("success");
    setMessage("Mensaje recibido. Te respondera una persona cuando el piloto este activo.");
    event.currentTarget.reset();
  }

  return (
    <form className="mt-6 grid gap-4 rounded-md border border-[var(--line)] bg-white p-5" onSubmit={submit}>
      <label className="grid gap-2 text-sm font-bold">
        Nombre
        <input className="focus-ring rounded-md border border-[var(--line)] px-3 py-2 font-normal" maxLength={120} name="name" required />
      </label>
      <label className="grid gap-2 text-sm font-bold">
        Email
        <input className="focus-ring rounded-md border border-[var(--line)] px-3 py-2 font-normal" maxLength={180} name="email" required type="email" />
      </label>
      <label className="grid gap-2 text-sm font-bold">
        Mensaje
        <textarea className="focus-ring min-h-32 rounded-md border border-[var(--line)] px-3 py-2 font-normal" maxLength={5000} minLength={10} name="message" required />
      </label>
      {message ? (
        <p className={state === "error" ? "text-sm font-bold text-[var(--danger)]" : "text-sm font-bold text-[var(--brand)]"}>{message}</p>
      ) : null}
      <button className="focus-ring rounded-md bg-[var(--brand)] px-4 py-3 text-sm font-bold text-white disabled:opacity-60" disabled={state === "loading"} type="submit">
        {state === "loading" ? "Enviando..." : "Enviar consulta"}
      </button>
    </form>
  );
}
