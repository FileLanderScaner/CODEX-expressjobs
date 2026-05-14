import type { Provider } from "@supabase/supabase-js";
import { publicEnv } from "@/lib/env";
import { getBrowserSupabaseClient } from "@/lib/supabase";

export const socialAuthProviders = ["google", "facebook"] as const;

export type SocialAuthProvider = (typeof socialAuthProviders)[number];

export type SocialAuthFlags = {
  google: boolean;
  facebook: boolean;
  instagram: boolean;
};

export const defaultOAuthProfileRole = "client" as const;

export function isAllowedSocialAuthProvider(provider: string): provider is SocialAuthProvider {
  return socialAuthProviders.includes(provider as SocialAuthProvider);
}

export function getSocialAuthFlags(): SocialAuthFlags {
  return {
    google: publicEnv.NEXT_PUBLIC_ENABLE_GOOGLE_LOGIN,
    facebook: publicEnv.NEXT_PUBLIC_ENABLE_FACEBOOK_LOGIN,
    instagram: publicEnv.NEXT_PUBLIC_ENABLE_INSTAGRAM_LOGIN,
  };
}

export function getEnabledSocialAuthProviders(flags: SocialAuthFlags = getSocialAuthFlags()) {
  return socialAuthProviders.filter((provider) => flags[provider]);
}

export function buildOAuthRedirectTo(appUrl = publicEnv.NEXT_PUBLIC_APP_URL) {
  return new URL("/auth/callback", appUrl).toString();
}

export function buildAuthErrorRedirect(requestUrl: string, error: string) {
  const redirectUrl = new URL("/auth", requestUrl);
  redirectUrl.searchParams.set("oauth_error", error);
  return redirectUrl;
}

export function buildPostOAuthRedirect(requestUrl: string) {
  return new URL("/role", requestUrl);
}

export function canPublicOAuthAssignAdmin(role: string) {
  return role !== "admin";
}

export async function signInWithSocialOAuth(provider: SocialAuthProvider) {
  if (!isAllowedSocialAuthProvider(provider)) {
    throw new Error("OAUTH_PROVIDER_NOT_ALLOWED");
  }

  const supabase = getBrowserSupabaseClient();

  if (!supabase) {
    throw new Error("SUPABASE_AUTH_NOT_CONFIGURED");
  }

  return supabase.auth.signInWithOAuth({
    provider: provider as Provider,
    options: {
      redirectTo: buildOAuthRedirectTo(),
    },
  });
}
