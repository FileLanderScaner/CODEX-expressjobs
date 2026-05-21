"use client";

import { useEffect, useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

export function ProfileForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      const response = await fetch("/api/profile");
      if (!response.ok) {
        return;
      }
      const body = await response.json();
      setEmail(body.data.email);
      setFullName(body.data.profile?.full_name ?? "");
      setCity(body.data.profile?.city ?? "");
      setPhone(body.data.profile?.phone ?? "");
    }

    void loadProfile();
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage(null);
    const response = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ full_name: fullName, city, phone }),
    });

    if (!response.ok) {
      setState("error");
      setMessage("No se pudo actualizar el perfil.");
      return;
    }

    setState("success");
    setMessage("Perfil actualizado.");
  }

  return (
    <form className="grid gap-4 rounded-md border border-[var(--line)] bg-white p-5" onSubmit={submit}>
      <p className="text-sm text-[var(--muted)]">Email de sesion: {email ? "configurado" : "no cargado"}. No se muestra en paginas publicas.</p>
      <label className="grid gap-2 text-sm font-bold">
        Nombre visible
        <input className="focus-ring rounded-md border border-[var(--line)] px-3 py-2 font-normal" maxLength={160} onChange={(event) => setFullName(event.target.value)} required value={fullName} />
      </label>
      <label className="grid gap-2 text-sm font-bold">
        Ciudad
        <input className="focus-ring rounded-md border border-[var(--line)] px-3 py-2 font-normal" maxLength={120} onChange={(event) => setCity(event.target.value)} value={city} />
      </label>
      <label className="grid gap-2 text-sm font-bold">
        Telefono de contacto privado
        <input className="focus-ring rounded-md border border-[var(--line)] px-3 py-2 font-normal" maxLength={80} onChange={(event) => setPhone(event.target.value)} value={phone} />
      </label>
      <p className="text-xs leading-5 text-[var(--muted)]">El rol privilegiado no se puede editar desde este formulario.</p>
      {message ? <p className={state === "error" ? "text-sm font-bold text-[var(--danger)]" : "text-sm font-bold text-[var(--brand)]"}>{message}</p> : null}
      <button className="focus-ring rounded-md bg-[var(--brand)] px-4 py-3 text-sm font-bold text-white disabled:opacity-60" disabled={state === "loading"} type="submit">
        {state === "loading" ? "Guardando..." : "Guardar perfil"}
      </button>
    </form>
  );
}
