import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  buildAuthErrorRedirect,
  buildOAuthRedirectTo,
  canPublicOAuthAssignAdmin,
  defaultOAuthProfileRole,
  getEnabledSocialAuthProviders,
  getBrowserOAuthAppUrl,
  isAllowedSocialAuthProvider,
  socialAuthProviders,
} from "@/lib/social-auth";

describe("social auth phase one", () => {
  it("keeps OAuth providers whitelisted to Google and Facebook", () => {
    expect(socialAuthProviders).toEqual(["google", "facebook"]);
    expect(isAllowedSocialAuthProvider("google")).toBe(true);
    expect(isAllowedSocialAuthProvider("facebook")).toBe(true);
    expect(isAllowedSocialAuthProvider("instagram")).toBe(false);
    expect(isAllowedSocialAuthProvider("admin")).toBe(false);
  });

  it("hides social login providers when feature flags are false", () => {
    expect(getEnabledSocialAuthProviders({ google: false, facebook: false, instagram: false })).toEqual([]);
  });

  it("shows only enabled Google and Facebook providers", () => {
    expect(getEnabledSocialAuthProviders({ google: true, facebook: true, instagram: true })).toEqual([
      "google",
      "facebook",
    ]);
  });

  it("builds a safe auth callback redirect URL", () => {
    expect(buildOAuthRedirectTo("https://preview.example")).toBe("https://preview.example/auth/callback");
  });

  it("uses the configured app URL outside the browser", () => {
    expect(getBrowserOAuthAppUrl()).toBeTypeOf("string");
  });

  it("uses the browser origin for OAuth redirects in preview", () => {
    const originalWindow = globalThis.window;
    Object.defineProperty(globalThis, "window", {
      value: { location: { origin: "https://preview.example" } },
      configurable: true,
    });

    expect(getBrowserOAuthAppUrl()).toBe("https://preview.example");

    Object.defineProperty(globalThis, "window", {
      value: originalWindow,
      configurable: true,
    });
  });

  it("handles callback errors without crashing", () => {
    const redirect = buildAuthErrorRedirect("https://preview.example/auth/callback?error=access_denied", "provider_error");
    expect(redirect.pathname).toBe("/auth");
    expect(redirect.searchParams.get("oauth_error")).toBe("provider_error");
  });

  it("does not allow public OAuth to assign admin", () => {
    expect(defaultOAuthProfileRole).toBe("client");
    expect(canPublicOAuthAssignAdmin(defaultOAuthProfileRole)).toBe(true);
    expect(canPublicOAuthAssignAdmin("admin")).toBe(false);
  });

  it("hides inactive social login providers instead of rendering dead buttons", () => {
    const authPage = readFileSync(join(process.cwd(), "src/app/auth/page.tsx"), "utf8");
    const socialButtons = readFileSync(join(process.cwd(), "src/components/social-auth-buttons.tsx"), "utf8");

    expect(authPage).toContain("SocialAuthButtons");
    expect(socialButtons).toContain("getEnabledSocialAuthProviders");
    expect(socialButtons).toContain("getSocialAuthFlags");
    expect(socialButtons).toContain("visibleProviders.length === 0");
    expect(socialButtons).toContain("return null");
    expect(socialButtons).toContain("Continuar con Google");
    expect(socialButtons).toContain("Continuar con Facebook");
    expect(socialButtons).not.toContain("Google login esta visible");
  });

  it("renders visible OAuth error reasons on the auth page", () => {
    const authPage = readFileSync(join(process.cwd(), "src/app/auth/page.tsx"), "utf8");

    expect(authPage).toContain("oauthErrorMessages");
    expect(authPage).toContain("profile_setup_failed");
    expect(authPage).toContain("C\u00f3digo:");
    expect(authPage).toContain("role=\"alert\"");
  });
});
