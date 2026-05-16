import { AlertTriangle, Mail } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { SocialAuthButtons } from "@/components/social-auth-buttons";

const oauthErrorMessages: Record<string, string> = {
  exchange_failed: "No pudimos completar el inicio con Google. Probá nuevamente o avisá si el error se repite.",
  missing_code: "Google no devolvió el código de acceso esperado. Volvé a intentar iniciar sesión.",
  not_configured: "El login social todavía no tiene la configuración pública de Supabase completa en este ambiente.",
  profile_setup_failed: "Tu sesión se creó, pero no pudimos preparar tu perfil inicial. Revisá la configuración de perfiles/RLS.",
  provider_error: "Google canceló o rechazó el inicio de sesión. Revisá que la cuenta esté habilitada para esta app.",
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
        <h1 className="text-3xl font-black">Auth</h1>
        <p className="mt-2 text-[var(--muted)]">Supabase Auth se conectara en staging. Esta pantalla mantiene el flujo y los eventos sin credenciales locales.</p>
        {oauthErrorMessage ? (
          <div className="mt-5 flex items-start gap-3 rounded-md border border-[var(--danger)] bg-red-50 p-4 text-sm font-semibold text-[var(--danger)]" role="alert">
            <AlertTriangle aria-hidden="true" className="mt-0.5 shrink-0" size={18} />
            <div>
              <p>{oauthErrorMessage}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wide">Código: {oauthError}</p>
            </div>
          </div>
        ) : null}
        <form className="mt-6 grid gap-4 rounded-md border border-[var(--line)] bg-white p-5">
          <label className="grid gap-2 text-sm font-bold">
            Email
            <input className="focus-ring rounded-md border border-[var(--line)] px-3 py-2 font-normal" placeholder="tu@email.com" />
          </label>
          <button className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-[var(--brand)] px-4 py-3 text-sm font-bold text-white" type="button">
            <Mail aria-hidden="true" size={18} />
            Iniciar signup
          </button>
          <SocialAuthButtons />
        </form>
      </main>
    </AppShell>
  );
}
