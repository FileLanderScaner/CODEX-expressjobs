import { AppShell } from "@/components/app-shell";

export default function PrivacyPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-black">Privacidad</h1>
        <p className="ej-muted mt-4 leading-7">
          El MVP debe minimizar datos personales, proteger perfiles, trabajos, mensajes y resenas con RLS, y no exponer claves server-only en el cliente.
        </p>
      </main>
    </AppShell>
  );
}
