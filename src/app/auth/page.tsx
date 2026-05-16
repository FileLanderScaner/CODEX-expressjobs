import { AlertTriangle } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AuthEmailForm } from "@/components/auth-email-form";
import { SocialAuthButtons } from "@/components/social-auth-buttons";

const oauthErrorMessages: Record<string, string> = {
  exchange_failed: "No pudimos completar el inicio con Google. Proba nuevamente o avisa si el error se repite.",
  missing_code: "Google no devolvio el codigo de acceso esperado. Volve a intentar iniciar sesion.",
  not_configured: "El login social todavia no tiene la configuracion publica de Supabase completa en este ambiente.",
  profile_setup_failed: "Tu sesion se creo, pero no pudimos preparar tu perfil inicial. Revisa la configuracion de perfiles/RLS.",
  provider_error: "Google cancelo o rechazo el inicio de sesion. Revisa que la cuenta este habilitada para esta app.",
};

type AuthPageProps = {
  searchParams?: Promise<{ oauth_error?: string }> | { oauth_error?: string };
};

export default async function AuthPage({ searchParams }: AuthPageProps) {
  const resolvedSearchParams = await searchParams;
  const oauthError = resolvedSearchParams?.oauth_error;
  const oauthErrorMessage = oauthError ? (oauthErrorMessages[oauthError] ?? "El inicio con Google no se pudo completar.") : null;

  return (
    <AppShell>
      <main className="mx-auto max-w-xl px-4 py-10">
        <h1 className="text-3xl font-black">Crear cuenta o ingresar</h1>
        <p className="mt-2 text-[var(--muted)]">Entra para publicar trabajos, postularte o elegir tu rol dentro de Trabajos Rapidos.</p>
        {oauthErrorMessage ? (
          <div className="mt-5 flex items-start gap-3 rounded-md border border-[var(--danger)] bg-red-50 p-4 text-sm font-semibold text-[var(--danger)]" role="alert">
            <AlertTriangle aria-hidden="true" className="mt-0.5 shrink-0" size={18} />
            <div>
              <p>{oauthErrorMessage}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wide">Codigo: {oauthError}</p>
            </div>
          </div>
        ) : null}
        <AuthEmailForm />
        <SocialAuthButtons />
      </main>
    </AppShell>
  );
}
