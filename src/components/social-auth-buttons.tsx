"use client";

import { Globe2, Users } from "lucide-react";
import { useState } from "react";
import { isSupabaseConfigured } from "@/lib/env";
import {
  getEnabledSocialAuthProviders,
  signInWithSocialOAuth,
  type SocialAuthProvider,
} from "@/lib/social-auth";

const providerLabels: Record<SocialAuthProvider, string> = {
  google: "Continue with Google",
  facebook: "Continue with Facebook",
};

const providerIcons = {
  google: Globe2,
  facebook: Users,
} satisfies Record<SocialAuthProvider, typeof Globe2>;

export function SocialAuthButtons() {
  const enabledProviders = getEnabledSocialAuthProviders();
  const [pendingProvider, setPendingProvider] = useState<SocialAuthProvider | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (enabledProviders.length === 0) {
    return null;
  }

  const supabaseConfigured = isSupabaseConfigured();

  async function handleOAuth(provider: SocialAuthProvider) {
    setErrorMessage(null);
    setPendingProvider(provider);

    try {
      const { error } = await signInWithSocialOAuth(provider);

      if (error) {
        setErrorMessage("Social login is not configured for this Preview yet.");
      }
    } catch {
      setErrorMessage("Social login is not available in this environment yet.");
    } finally {
      setPendingProvider(null);
    }
  }

  return (
    <section className="mt-4 grid gap-3" aria-label="Social login">
      {enabledProviders.map((provider) => {
        const Icon = providerIcons[provider];
        const isPending = pendingProvider === provider;

        return (
          <button
            className="focus-ring inline-flex items-center justify-center gap-2 rounded-md border border-[var(--line)] bg-white px-4 py-3 text-sm font-bold text-[var(--foreground)] hover:border-[var(--brand)] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={!supabaseConfigured || isPending}
            key={provider}
            onClick={() => void handleOAuth(provider)}
            type="button"
          >
            <Icon aria-hidden="true" size={18} />
            {isPending ? "Connecting..." : providerLabels[provider]}
          </button>
        );
      })}
      {!supabaseConfigured ? (
        <p className="text-sm text-[var(--muted)]">Social login needs Supabase public config before it can be used.</p>
      ) : null}
      {errorMessage ? <p className="text-sm font-bold text-[var(--danger)]">{errorMessage}</p> : null}
    </section>
  );
}
