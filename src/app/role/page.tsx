import { AppShell } from "@/components/app-shell";
import { RoleSelector } from "@/components/role-selector";

export default function RolePage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-4xl px-4 py-10">
        <p className="ej-badge">Cuenta</p>
        <h1 className="mt-3 text-3xl font-black">Seleccion de rol</h1>
        <p className="ej-muted mt-3 max-w-2xl leading-7">
          Elegi el camino que queres usar ahora. Si no tenes sesion activa, te llevamos primero al acceso y despues volvemos al flujo correcto.
        </p>
        <section className="ej-glass mt-5 p-4 text-sm font-semibold text-[var(--ej-text-muted)]">
          Trabajos Rapidos guarda solo roles operativos de cliente o trabajador para este flujo. La coordinacion y cualquier pago siguen siendo manuales durante el piloto.
        </section>
        <div className="mt-6">
          <RoleSelector />
        </div>
      </main>
    </AppShell>
  );
}
