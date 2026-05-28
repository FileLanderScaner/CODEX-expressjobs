import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { User } from "@supabase/supabase-js";
import { describe, expect, it } from "vitest";
import { getDisplayName, getLoginProvider, type AccountProfile } from "@/lib/account";

const profile: AccountProfile = {
  id: "user-id",
  role: "client",
  full_name: "Cuenta Test",
  phone: null,
  city: null,
  created_at: "2026-05-26T00:00:00Z",
};

describe("account session and profile UX", () => {
  it("prefers persisted profile names for account display", () => {
    expect(getDisplayName(null, profile)).toBe("Cuenta Test");
  });

  it("falls back to a neutral account label without exposing email", () => {
    expect(getDisplayName({
      id: "user-id",
      app_metadata: {},
      aud: "authenticated",
      created_at: "2026-05-26T00:00:00Z",
      user_metadata: {},
    } as User)).toBe("Mi cuenta");
  });

  it("reads only the provider label from auth metadata", () => {
    expect(getLoginProvider({
      id: "user-id",
      app_metadata: { provider: "google" },
      aud: "authenticated",
      created_at: "2026-05-26T00:00:00Z",
      user_metadata: {},
    } as User)).toBe("google");
  });

  it("adds a first-class profile route with logout and safe editable fields", () => {
    const profilePage = readFileSync(join(process.cwd(), "src/app/profile/page.tsx"), "utf8");
    const profileForm = readFileSync(join(process.cwd(), "src/components/account-profile-form.tsx"), "utf8");
    const appShell = readFileSync(join(process.cwd(), "src/components/app-shell.tsx"), "utf8");
    const profileSteps = readFileSync(join(process.cwd(), "src/components/profile-process-steps.tsx"), "utf8");

    expect(profilePage).toContain("Perfil abierto");
    expect(profilePage).toContain("Sesion activa");
    expect(profilePage).toContain("Reparar perfil");
    expect(profileForm).toContain("ProfileProcessSteps");
    expect(profileSteps).toContain("Datos basicos");
    expect(profileSteps).toContain("Rol y objetivo");
    expect(profileSteps).toContain("Experiencia o necesidad");
    expect(profileSteps).toContain("Ubicacion y disponibilidad");
    expect(profileSteps).toContain("Confianza y contacto");
    expect(profileSteps).toContain("Confirmacion / publicacion");
    expect(profileSteps).toContain("Habilidades");
    expect(profileSteps).toContain("Completar perfil");
    expect(profileSteps).toContain("Paso {normalizedStep}/{steps.length}");
    expect(profileSteps).not.toContain("8 pasos");
    expect(profileForm).toContain("Cerrar sesion");
    expect(profileForm).toContain("supabase.auth.signOut()");
    expect(profileForm).toContain("full_name");
    expect(profileForm).toContain("phone");
    expect(profileForm).toContain("city");
    expect(profileForm).not.toContain("role:");
    expect(appShell).toContain("getAccountNavState");
    expect(appShell).toContain("accountNav.isSignedIn");
    expect(appShell).toContain("/profile");
    expect(appShell).toContain("Mi cuenta");
  });

  it("keeps role updates on the server route without logging full user ids", () => {
    const roleRoute = readFileSync(join(process.cwd(), "src/app/api/profile/set-role/route.ts"), "utf8");

    expect(roleRoute).toContain("SUPABASE_SERVICE_ROLE_KEY");
    expect(roleRoute).toContain('adminSupabase.rpc("ej_set_profile_role_for_user"');
    expect(roleRoute).toContain("userRef");
    expect(roleRoute).not.toContain("userId: user.id");
  });
});
