import { UserRoundCheck } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { WorkerProfileForm } from "@/components/worker-profile-form";

export default function WorkerProfilePage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-4xl px-4 py-10">
        <div className="flex items-center gap-3">
          <UserRoundCheck aria-hidden="true" className="text-[var(--brand)]" />
          <div>
            <h1 className="text-3xl font-black">Perfil trabajador</h1>
            <p className="mt-2 text-[var(--muted)]">Completa tus datos para poder postularte con informacion clara.</p>
          </div>
        </div>
        <div className="mt-6">
          <WorkerProfileForm />
        </div>
      </main>
    </AppShell>
  );
}
