import { AppShell } from "@/components/app-shell";
import { RoleSelector } from "@/components/role-selector";
import { TrustSafetyNotice } from "@/components/trust-safety-notice";

export default function OnboardingPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-3xl font-black">Elegir rol</h1>
        <p className="mt-2 max-w-2xl text-[var(--muted)]">Configura la experiencia inicial como cliente o trabajador. Puedes cambiar o ampliar tu perfil despues.</p>
        <div className="mt-6">
          <RoleSelector />
        </div>
        <div className="mt-6">
          <TrustSafetyNotice />
        </div>
      </main>
    </AppShell>
  );
}
