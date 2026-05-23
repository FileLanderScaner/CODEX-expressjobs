import { LogIn, UserRoundCheck } from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { AuthEmailForm } from "@/components/auth-email-form";
import { SocialAuthButtons } from "@/components/social-auth-buttons";

function readNext(searchParams?: { next?: string }) {
  const next = searchParams?.next;
  return next && next.startsWith("/") && !next.startsWith("//") ? next : "/role";
}

type RegistroPageProps = {
  searchParams?: Promise<{ next?: string }> | { next?: string };
};

export default async function RegistroPage({ searchParams }: RegistroPageProps) {
  const resolvedSearchParams = await searchParams;
  const nextPath = readNext(resolvedSearchParams);

  return (
    <AppShell>
      <main className="mx-auto max-w-xl px-4 py-10">
        <div className="rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <UserRoundCheck aria-hidden="true" className="text-[var(--brand)]" />
            <p className="text-sm font-bold uppercase tracking-wide text-[var(--brand)]">Crear cuenta</p>
          </div>
          <h1 className="mt-3 text-3xl font-black">Registro en Trabajos Rapidos</h1>
          <p className="mt-3 leading-7 text-[var(--muted)]">
            Entra con email o login social si esta habilitado en el ambiente. Despues elegi rol para publicar trabajos o postularte.
          </p>
          <Link className="focus-ring mt-4 inline-flex items-center gap-2 rounded-md border border-[var(--line)] px-4 py-3 text-sm font-bold" href="/auth">
            <LogIn aria-hidden="true" size={16} /> Ya tengo cuenta
          </Link>
        </div>
        <AuthEmailForm nextPath={nextPath} />
        <SocialAuthButtons nextPath={nextPath} />
      </main>
    </AppShell>
  );
}
