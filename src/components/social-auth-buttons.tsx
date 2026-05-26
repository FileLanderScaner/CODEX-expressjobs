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
  const visibleProviders = enabledProviders;
  const [pendingProvider, setPendingProvider] = useState<SocialAuthProvider | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const supabaseConfigured = isSupabaseConfigured();

  if (!supabaseConfigured || visibleProviders.length === 0) {
    return null;
  }

  async function handleOAuth(provider: SocialAuthProvider) {
    setErrorMessage(null);

    if (!flags[provider]) {
      setErrorMessage("Este login social todavia no esta activado para este ambiente.");
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
      {visibleProviders.map((provider) => {
        const Icon = providerIcons[provider];
        const isPending = pendingProvider === provider;
        const isDisabled = !flags[provider] || !supabaseConfigured;

        return (
          <button
            aria-disabled={isDisabled}
            className="focus-ring inline-flex items-center justify-center gap-2 rounded-md border border-[var(--line)] bg-white px-4 py-3 text-sm font-bold text-[var(--foreground)] hover:border-[var(--brand)] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isDisabled || isPending}
            key={provider}
            onClick={() => void handleOAuth(provider)}
            type="button"
          >
            <Icon aria-hidden="true" size={18} />
            {isPending ? "Conectando..." : providerLabels[provider]}
          </button>
        );
      })}
      {errorMessage ? <p className="text-sm font-bold text-[var(--danger)]">{errorMessage}</p> : null}
    </section>
  );
}
