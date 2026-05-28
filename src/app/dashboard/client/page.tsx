import { CheckCircle2, ClipboardPlus, MessageSquareText } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PrimaryButton } from "@/components/primary-button";

export default function ClientDashboardPage() {
  return (
    <AppShell>
      <main className="ej-page px-4 py-10">
        <div className="ej-container">
          <h1 className="text-3xl font-black">Dashboard cliente</h1>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { icon: ClipboardPlus, title: "Publicar", value: "Nuevo trabajo" },
              { icon: MessageSquareText, title: "Postulaciones", value: "Comparar perfiles" },
              { icon: CheckCircle2, title: "Aceptar", value: "Elegir trabajador" },
            ].map((item) => (
              <article className="ej-card p-5" key={item.title}>
                <item.icon aria-hidden="true" className="text-[var(--ej-accent)]" />
                <p className="ej-soft mt-4 text-sm font-bold">{item.title}</p>
                <h2 className="mt-1 text-xl font-black">{item.value}</h2>
              </article>
            ))}
          </div>
          <div className="mt-6">
            <PrimaryButton href="/client/jobs/new" icon={ClipboardPlus}>Publicar trabajo</PrimaryButton>
          </div>
        </div>
      </main>
    </AppShell>
  );
}
