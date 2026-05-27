"use client";

import { Globe2, Users } from "lucide-react";
import { useState } from "react";
import { isSupabaseConfigured } from "@/lib/env";
import {
  getEnabledSocialAuthProviders,
  getSocialAuthFlags,
  signInWithSocialOAuth,
  type SocialAuthProvider,
} from "@/lib/social-auth";

const providerLabels: Record<SocialAuthProvider, string> = {
  google: "Continuar con Google",
  facebook: "Continuar con Facebook",
};

const providerIcons = {
  google: Globe2,
  facebook: Users,
} satisfies Record<SocialAuthProvider, typeof Globe2>;

export function SocialAuthButtons({ nextPath }: { nextPath?: string }) {
  const flags = getSocialAuthFlags();
  const enabledProviders = getEnabledSocialAuthProviders(flags);
 codex/expressjobs-global-soft-premium-redesign-manual
  const visibleProviders = [
    "google",
    ...enabledProviders.filter((provider) => provider !== "google"),
  ] as SocialAuthProvider[];
  const [pendingProvider, setPendingProvider] = useState<SocialAuthProvider | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const supabaseConfigured = isSupabaseConfigured();


  const supabaseConfigured = isSupabaseConfigured();
  const visibleProviders = supabaseConfigured ? enabledProviders : [];
  const [pendingProvider, setPendingProvider] = useState<SocialAuthProvider | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

 main
  async function handleOAuth(provider: SocialAuthProvider) {
    setErrorMessage(null);

    if (!flags[provider]) {
      setErrorMessage(provider === "google" ? "Google Login requiere habilitar NEXT_PUBLIC_ENABLE_GOOGLE_LOGIN y el provider en Supabase Auth." : "Este login social todavia no esta activado para este ambiente.");
      return;
    }

    if (!supabaseConfigured) {
      setErrorMessage("Supabase Auth no esta configurado en este ambiente.");
      return;
    }

    setPendingProvider(provider);

    try {
      const { error } = await signInWithSocialOAuth(provider, nextPath);

      if (error) {
        setErrorMessage("El login social no esta configurado para este Preview todavia.");
      }
    } catch {
      setErrorMessage("El login social no esta disponible en este ambiente todavia.");
    } finally {
      setPendingProvider(null);
    }
  }

  return (
    <section className="mt-4 grid gap-3" aria-label="Login social">
      {visibleProviders.length === 0 ? (
        <p className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-sm font-semibold text-[var(--ej-text-muted)]">
          Google Login no esta activo en este ambiente. Usa email o espera la configuracion OAuth oficial.
        </p>
      ) : null}
      {visibleProviders.map((provider) => {
        const Icon = providerIcons[provider];
        const isPending = pendingProvider === provider;
 codex/expressjobs-global-soft-premium-redesign-manual
        const isExternallyBlocked = !flags[provider] || !supabaseConfigured;

        return (
          <GoogleLoginButton
            ariaDisabled={isExternallyBlocked}


        return (
          <GoogleLoginButton
 main
            disabled={isPending}
            icon={Icon}
            key={provider}
            onClick={() => void handleOAuth(provider)}
            pending={isPending}
            providerLabel={providerLabels[provider]}
          >
            {isPending ? "Conectando..." : providerLabels[provider]}
          </GoogleLoginButton>
        );
      })}
      {errorMessage ? <p className="rounded-2xl border border-[rgba(255,90,120,0.28)] bg-[var(--ej-danger-soft)] p-3 text-sm font-bold text-[#ffb4c2]">{errorMessage}</p> : null}
    </section>
  );
}

export function GoogleLoginButton({
  children,
  disabled,
 codex/expressjobs-global-soft-premium-redesign-manual
  ariaDisabled,

 main
  icon: Icon,
  onClick,
  providerLabel,
  pending,
}: {
  children: React.ReactNode;
  disabled?: boolean;
 codex/expressjobs-global-soft-premium-redesign-manual
  ariaDisabled?: boolean;

 main
  icon: typeof Globe2;
  onClick: () => void;
  providerLabel: string;
  pending?: boolean;
}) {
  return (
    <button
 codex/expressjobs-global-soft-premium-redesign-manual
      aria-disabled={ariaDisabled}

 main
      aria-label={pending ? `Conectando ${providerLabel}` : providerLabel}
      className="focus-ring ej-btn-secondary w-full px-4 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-70"
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <Icon aria-hidden="true" size={18} />
      {children}
    </button>
  );
}
