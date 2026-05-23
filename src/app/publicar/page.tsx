import { ClipboardPlus, MessageCircle } from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { JobForm } from "@/components/job-form";
import { TrustSafetyNotice } from "@/components/trust-safety-notice";
import { defaultWhatsAppSalesHref } from "@/lib/monetization/monetization-config";

export default function PublicarPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-4xl px-4 py-10">
        <div className="rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <ClipboardPlus aria-hidden="true" className="text-[var(--brand)]" />
            <p className="text-sm font-bold uppercase tracking-wide text-[var(--brand)]">Clientes y negocios</p>
          </div>
          <h1 className="mt-3 text-3xl font-black">Publicar un trabajo</h1>
          <p className="mt-3 leading-7 text-[var(--muted)]">
            Crea una tarea clara para recibir postulaciones. Si todavia no tenes cuenta, el formulario te pedira ingresar antes de publicar.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link className="focus-ring rounded-md border border-[var(--line)] px-4 py-3 text-sm font-bold" href="/registro?next=/publicar">
              Crear cuenta primero
            </Link>
            <Link className="focus-ring inline-flex items-center gap-2 rounded-md border border-[var(--line)] px-4 py-3 text-sm font-bold" href={defaultWhatsAppSalesHref()}>
              <MessageCircle aria-hidden="true" size={16} /> Ayuda por WhatsApp
            </Link>
          </div>
        </div>
        <div className="mt-6">
          <JobForm />
        </div>
        <div className="mt-6">
          <TrustSafetyNotice />
        </div>
      </main>
    </AppShell>
  );
}
