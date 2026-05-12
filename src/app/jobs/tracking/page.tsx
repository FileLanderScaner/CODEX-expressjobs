import { AppShell } from "@/components/app-shell";
import { StatusFlow } from "@/components/status-flow";

export default function TrackingPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-black">Tracking de trabajo</h1>
        <p className="mt-2 text-[var(--muted)]">Timeline base para avance, cancelaciones y disputas.</p>
        <div className="mt-6">
          <StatusFlow />
        </div>
      </main>
    </AppShell>
  );
}
