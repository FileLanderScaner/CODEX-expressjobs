import { Building2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { CompanyProfileForm } from "@/components/company-profile-form";

export default function ClientProfilePage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-4xl px-4 py-10">
        <div className="flex items-center gap-3">
          <Building2 aria-hidden="true" className="text-[var(--brand)]" />
          <div>
            <h1 className="text-3xl font-black">Perfil empresa</h1>
            <p className="mt-2 text-[var(--muted)]">Completa tus datos para publicar trabajos y gestionar postulantes.</p>
          </div>
        </div>
        <div className="mt-6">
          <CompanyProfileForm />
        </div>
      </main>
    </AppShell>
  );
}
