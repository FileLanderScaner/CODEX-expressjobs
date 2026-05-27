import { AlertTriangle } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AuthEmailForm } from "@/components/auth-email-form";
import { AuthCard } from "@/components/design-system";
import { SocialAuthButtons } from "@/components/social-auth-buttons";

const oauthErrorMessages: Record<string, string> = {
  exchange_failed: "No pudimos completar el inicio con Google. Proba nuevamente o avisa si el error se repite.",
  missing_code: "Google no devolvio el codigo de acceso esperado. Volve a intentar iniciar sesion.",
  not_configured: "El login social todavia no tiene la configuracion publica de Supabase completa en este ambiente.",
  profile_setup_failed: "Tu sesion se creo, pero no pudimos preparar tu perfil inicial. Revisa la configuracion de perfiles/RLS.",
  provider_error: "Google cancelo o rechazo el inicio de sesion. Revisa que la cuenta este habilitada para esta app.",
};

type AuthPageProps = {
  searchParams?: Promise<{ oauth_error?: string; next?: string }> | { oauth_error?: string; next?: string };
};

export default async function AuthPage({ searchParams }: AuthPageProps) {
  const resolvedSearchParams = await searchParams;
  const oauthError = resolvedSearchParams?.oauth_error;
  const nextPath = resolvedSearchParams?.next;
  const oauthErrorMessage = oauthError ? (oauthErrorMessages[oauthError] ?? "El inicio con Google no se pudo completar.") : null;

  return (
    <AppShell>
      <main className="ej-page px-4 py-12">
        <AuthCard>
          <p className="ej-badge">Acceso seguro</p>
          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">Crear cuenta o ingresar</h1>
          <p className="ej-muted mt-3 leading-7">Entra para publicar trabajos, postularte o elegir tu rol dentro de Trabajos Rapidos.</p>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-[var(--ej-text-muted)]">
            <p className="font-black text-[var(--ej-text)]">Flujo recomendado</p>
            <ol className="mt-3 grid gap-2 font-semibold leading-6">
              <li>1. Ingresa con el enlace seguro enviado por email.</li>
              <li>2. Elegi si vas a publicar trabajo o postularte.</li>
              <li>3. Completa tu perfil antes de coordinar fuera de la app.</li>
            </ol>
          </div>
          {oauthErrorMessage ? (
            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[rgba(255,90,120,0.28)] bg-[var(--ej-danger-soft)] p-4 text-sm font-semibold text-[#ffb4c2]" role="alert">
              <AlertTriangle aria-hidden="true" className="mt-0.5 shrink-0" size={18} />
              <div>
                <p>{oauthErrorMessage}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wide">Codigo: {oauthError}</p>
              </div>
            </div>
          ) : null}
          <div className="mt-6">
            <SocialAuthButtons nextPath={nextPath} />
          </div>
          <div className="my-6 flex items-center gap-3 text-xs font-black uppercase tracking-[0.16em] text-[var(--ej-text-soft)]">
            <span className="h-px flex-1 bg-white/10" />
            o ingresar con email
            <span className="h-px flex-1 bg-white/10" />
          </div>
          <AuthEmailForm nextPath={nextPath} />
          <p className="ej-soft mt-5 text-center text-xs font-semibold uppercase tracking-[0.12em]">
            Piloto controlado - Sin pagos reales activos - Produccion publica bloqueada.
          </p>
        </AuthCard>
      </main>
    </AppShell>
  );
}
