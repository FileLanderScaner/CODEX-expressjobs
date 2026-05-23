import { ClipboardList } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { ClientDashboard } from "@/components/client-dashboard";

export default function DashboardClientJobsPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex items-center gap-3">
          <ClipboardList aria-hidden="true" className="text-[var(--brand)]" />
          <h1 className="text-3xl font-black">Trabajos publicados</h1>
        </div>
        <div className="mt-6">
          <ClientDashboard />
        </div>
      </main>
    </AppShell>
  );
}
