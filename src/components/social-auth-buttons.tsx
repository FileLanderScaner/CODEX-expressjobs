"use client";

import { Globe2, Users } from "lucide-react";
import Link from "next/link";
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
  const visibleProviders: SocialAuthProvider[] = [
    "google",
    ...enabledProviders.filter((provider) => provider !== "google"),
  ];
  const [pendingProvider, setPendingProvider] = useState<SocialAuthProvider | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const supabaseConfigured = isSupabaseConfigured();
  const googleVisibleButDisabled = !flags.google || !supabaseConfigured;

  async function handleOAuth(provider: SocialAuthProvider) {
    setErrorMessage(null);

    if (!flags[provider]) {
      setErrorMessage("Google login todavia no esta activado para este ambiente. Revisa /auth/diagnostics.");
      return;
    }

    if (!supabaseConfigured) {
      setErrorMessage("Supabase Auth no esta configurado en este ambiente. Revisa /auth/diagnostics.");
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
        const isDisabled = provider === "google" ? googleVisibleButDisabled : !flags[provider] || !supabaseConfigured;

        return (
          <button
            className="focus-ring inline-flex items-center justify-center gap-2 rounded-md border border-[var(--line)] bg-white px-4 py-3 text-sm font-bold text-[var(--foreground)] hover:border-[var(--brand)] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isPending}
            key={provider}
            onClick={() => void handleOAuth(provider)}
            type="button"
            aria-disabled={isDisabled}
          >
            <Icon aria-hidden="true" size={18} />
            {isPending ? "Conectando..." : providerLabels[provider]}
          </button>
        );
      })}
      {googleVisibleButDisabled ? (
        <p className="rounded-md border border-[var(--line)] bg-[#f8faf8] p-3 text-sm text-[var(--muted)]">
          Google login esta visible, pero falta activarlo para este ambiente. Revisa <Link className="font-bold underline" href="/auth/diagnostics">/auth/diagnostics</Link> y configura <code>NEXT_PUBLIC_ENABLE_GOOGLE_LOGIN=true</code> junto con el provider Google en Supabase.
        </p>
      ) : null}
      {errorMessage ? <p className="text-sm font-bold text-[var(--danger)]">{errorMessage}</p> : null}
    </section>
  );
}
