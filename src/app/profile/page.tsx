import Link from "next/link";
import { BriefcaseBusiness, LogIn, Settings, UserCircle } from "lucide-react";
import { AccountProfileForm } from "@/components/account-profile-form";
import { AppShell } from "@/components/app-shell";
import { getCurrentProfile, getCurrentUser, getDisplayName, getLoginProvider } from "@/lib/account";
import { authHref } from "@/lib/marketplace";

function formatDate(value: string | null) {
  if (!value) {
    return "No disponible";
  }

  return new Intl.DateTimeFormat("es-UY", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

function dashboardHref(role: string | null | undefined) {
  if (role === "worker") {
    return "/dashboard/worker";
  }

  return "/dashboard/client";
}

export default async function ProfilePage() {
  const user = await getCurrentUser();
  const profile = await getCurrentProfile();
  const provider = getLoginProvider(user);

  return (
    <AppShell>
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex items-start gap-3">
          <UserCircle aria-hidden="true" className="mt-1 text-[var(--brand)]" size={30} />
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-[var(--brand)]">Mi cuenta</p>
            <h1 className="mt-1 text-3xl font-black">{user ? getDisplayName(user, profile) : "Sesion no iniciada"}</h1>
            <p className="mt-2 text-[var(--muted)]">Estado de sesion, perfil y salida segura para Trabajos Rapidos.</p>
          </div>
        </div>

        {!user ? (
          <section className="ej-card mt-6 p-5">
            <h2 className="text-xl font-black">No hay sesion activa</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">Inicia sesion para ver tu perfil, rol y panel de trabajo.</p>
            <Link className="focus-ring ej-btn-primary mt-4 text-sm" href={authHref("/profile")}>
              <LogIn aria-hidden="true" size={16} />
              Ingresar
            </Link>
          </section>
        ) : profile ? (
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
            <section className="ej-card p-5">
              <Settings aria-hidden="true" className="text-[var(--brand)]" />
              <h2 className="mt-3 text-xl font-black">Perfil abierto</h2>
              <dl className="mt-4 grid gap-3 text-sm">
                <div>
                  <dt className="font-bold text-[var(--muted)]">Estado</dt>
                  <dd className="font-black text-[var(--brand)]">Sesion activa</dd>
                </div>
                <div>
                  <dt className="font-bold text-[var(--muted)]">Rol</dt>
                  <dd className="font-black">{profile.role}</dd>
                </div>
                <div>
                  <dt className="font-bold text-[var(--muted)]">Proveedor</dt>
                  <dd className="font-black">{provider ?? "No disponible"}</dd>
                </div>
                <div>
                  <dt className="font-bold text-[var(--muted)]">Creado</dt>
                  <dd className="font-black">{formatDate(profile.created_at)}</dd>
                </div>
              </dl>
              <Link
                className="focus-ring ej-btn-primary mt-5 text-sm"
                href={dashboardHref(profile.role)}
              >
                <BriefcaseBusiness aria-hidden="true" size={16} />
                Ir a mi dashboard
              </Link>
            </section>
            <AccountProfileForm profile={profile} />
          </div>
        ) : (
          <section className="mt-6 rounded-lg border border-[rgba(239,68,68,0.32)] bg-[var(--ej-danger-soft)] p-5">
            <h2 className="text-xl font-black text-red-200">Sesion activa sin perfil</h2>
            <p className="mt-2 text-sm font-semibold text-red-200">
              Tu sesion existe, pero no encontramos `ej_profiles`. Vuelve a seleccionar rol para intentar reparar el perfil con el flujo seguro.
            </p>
            <Link className="focus-ring ej-btn-primary mt-4 text-sm" href="/role">
              Reparar perfil
            </Link>
          </section>
        )}
      </main>
    </AppShell>
  );
}
