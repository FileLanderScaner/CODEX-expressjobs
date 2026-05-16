import { headers } from "next/headers";
import { AppShell } from "@/components/app-shell";
import { buildOAuthRedirectTo, getSocialAuthFlags } from "@/lib/social-auth";
import { isSupabaseConfigured, publicEnv } from "@/lib/env";

function statusLabel(value: boolean) {
  return value ? "OK" : "Missing";
}

function StatusRow({ label, value, detail }: { label: string; value: boolean; detail?: string }) {
  return (
    <div className="rounded-md border border-[var(--line)] bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-black">{label}</p>
        <span className={value ? "text-sm font-black text-[var(--brand)]" : "text-sm font-black text-[var(--danger)]"}>{statusLabel(value)}</span>
      </div>
      {detail ? <p className="mt-2 break-words text-sm text-[var(--muted)]">{detail}</p> : null}
    </div>
  );
}

export default async function AuthDiagnosticsPage() {
  const requestHeaders = await headers();
  const forwardedHost = requestHeaders.get("x-forwarded-host");
  const host = forwardedHost ?? requestHeaders.get("host");
  const forwardedProto = requestHeaders.get("x-forwarded-proto") ?? "https";
  const currentOrigin = host ? `${forwardedProto}://${host}` : publicEnv.NEXT_PUBLIC_APP_URL;
  const flags = getSocialAuthFlags();
  const expectedCallbackUrl = buildOAuthRedirectTo(currentOrigin);

  return (
    <AppShell>
      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-sm font-black uppercase tracking-wide text-[var(--brand)]">Auth diagnostics</p>
        <h1 className="mt-2 text-3xl font-black">Google Login diagnostic</h1>
        <p className="mt-3 text-[var(--muted)]">
          Esta pantalla muestra solo datos públicos y estados booleanos. No imprime claves, tokens, cookies ni service-role keys.
        </p>

        <section className="mt-6 grid gap-3">
          <StatusRow label="Supabase public config" value={isSupabaseConfigured()} detail="Requiere NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY presentes." />
          <StatusRow label="Google login flag" value={flags.google} detail="Requiere NEXT_PUBLIC_ENABLE_GOOGLE_LOGIN=true en el ambiente actual." />
          <StatusRow label="Facebook login flag" value={flags.facebook} detail="Solo informativo. Facebook puede estar desactivado mientras Google funciona." />
          <StatusRow label="Instagram login flag" value={flags.instagram} detail="Solo informativo. Instagram no está en la lista pública de proveedores OAuth activos." />
        </section>

        <section className="mt-6 rounded-md border border-[var(--line)] bg-white p-5">
          <h2 className="text-xl font-black">Callback que debe estar permitido</h2>
          <p className="mt-3 break-words rounded-md border border-[var(--line)] bg-[#f7f6f2] p-3 text-sm font-bold">{expectedCallbackUrl}</p>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            Si Google muestra redirect_uri_mismatch, agregá exactamente esta URL en Google Cloud OAuth y en Supabase Auth Redirect URLs.
          </p>
        </section>

        <section className="mt-6 rounded-md border border-[var(--line)] bg-white p-5">
          <h2 className="text-xl font-black">Interpretación rápida</h2>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-[var(--muted)]">
            <li>Si Supabase public config falta, el botón puede aparecer deshabilitado.</li>
            <li>Si Google login flag falta, el botón de Google no aparece.</li>
            <li>Si el callback no coincide, Google rechaza el login antes de volver a la app.</li>
            <li>Si el callback vuelve con error, /auth ahora muestra el código oauth_error visible.</li>
          </ul>
        </section>
      </main>
    </AppShell>
  );
}
