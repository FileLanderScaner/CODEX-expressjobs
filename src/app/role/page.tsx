import { AppShell } from "@/components/app-shell";
import { PrimaryButton } from "@/components/primary-button";

export default function RolePage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-3xl font-black">Seleccion de rol</h1>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <article className="rounded-md border border-[var(--line)] bg-white p-5">
            <h2 className="text-xl font-black">Cliente</h2>
            <p className="mt-2 text-[var(--muted)]">Publica trabajos, revisa postulaciones y acepta trabajadores.</p>
            <div className="mt-4"><PrimaryButton href="/dashboard/client">Continuar</PrimaryButton></div>
          </article>
          <article className="rounded-md border border-[var(--line)] bg-white p-5">
            <h2 className="text-xl font-black">Trabajador</h2>
            <p className="mt-2 text-[var(--muted)]">Crea tu perfil, postulate y construye reputacion.</p>
            <div className="mt-4"><PrimaryButton href="/dashboard/worker">Continuar</PrimaryButton></div>
          </article>
        </div>
      </main>
    </AppShell>
  );
}
