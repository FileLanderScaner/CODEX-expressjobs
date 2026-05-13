import { Mail } from "lucide-react";
import { AppShell } from "@/components/app-shell";

export default function AuthPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-xl px-4 py-10">
        <h1 className="text-3xl font-black">Auth</h1>
        <p className="mt-2 text-[var(--muted)]">Supabase Auth se conectara en staging. Esta pantalla mantiene el flujo y los eventos sin credenciales locales.</p>
        <form className="mt-6 grid gap-4 rounded-md border border-[var(--line)] bg-white p-5">
          <label className="grid gap-2 text-sm font-bold">
            Email
            <input className="focus-ring rounded-md border border-[var(--line)] px-3 py-2 font-normal" placeholder="tu@email.com" />
          </label>
          <button className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-[var(--brand)] px-4 py-3 text-sm font-bold text-white" type="button">
            <Mail aria-hidden="true" size={18} />
            Iniciar signup
          </button>
        </form>
      </main>
    </AppShell>
  );
}
