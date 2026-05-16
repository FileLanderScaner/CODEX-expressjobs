import { AppShell } from "@/components/app-shell";
import { ClientDashboard } from "@/components/client-dashboard";

export default function ClientPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-6xl px-4 py-10">
        <ClientDashboard />
      </main>
    </AppShell>
  );
}
