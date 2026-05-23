import { AppShell } from "@/components/app-shell";
import { RoleSelector } from "@/components/role-selector";

export default function RegisterPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-3xl font-black">Elegir tipo de cuenta</h1>
        <p className="mt-2 text-[var(--muted)]">Selecciona el flujo que necesitas y el sistema preparara tu rol seguro en Supabase.</p>
        <div className="mt-6">
          <RoleSelector />
        </div>
      </main>
    </AppShell>
  );
}
