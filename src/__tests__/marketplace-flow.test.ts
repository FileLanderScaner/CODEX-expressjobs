import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { authHref, formatBudgetUyu, parseAmountUyu, safeNextPath } from "@/lib/marketplace";
import { applicationSchema, companyProfileSchema, jobPostSchema, workerProfileSchema } from "@/lib/marketplace-schemas";
import { buildPostOAuthRedirect, buildOAuthRedirectTo } from "@/lib/social-auth";

describe("real marketplace flow wiring", () => {
  it("formats and parses public marketplace amounts safely", () => {
    expect(formatBudgetUyu(12500)).toBe("UYU 12.500");
    expect(formatBudgetUyu(null)).toBe("A convenir");
    expect(parseAmountUyu("UYU 1.700")).toBe(1700);
    expect(parseAmountUyu("a convenir")).toBeNull();
  });

  it("keeps auth next redirects relative", () => {
    expect(safeNextPath("/client/jobs/new")).toBe("/client/jobs/new");
    expect(safeNextPath("https://evil.example", "/role")).toBe("/role");
    expect(authHref("/worker/jobs/abc")).toBe("/auth?next=%2Fworker%2Fjobs%2Fabc");
  });

  it("preserves next paths through Supabase callback URLs", () => {
    expect(buildOAuthRedirectTo("https://preview.example", "/client/jobs/new")).toBe(
      "https://preview.example/auth/callback?next=%2Fclient%2Fjobs%2Fnew",
    );

    const redirect = buildPostOAuthRedirect("https://preview.example/auth/callback?next=%2Fworker%2Fjobs");
    expect(redirect.pathname).toBe("/worker/jobs");
  });

  it("connects public role selection through the safe role RPC", () => {
    const roleSelector = readFileSync(join(process.cwd(), "src/components/role-selector.tsx"), "utf8");

    expect(roleSelector).toContain("ensureMarketplaceRole");
    expect(roleSelector).toContain('"client"');
    expect(roleSelector).toContain('"worker"');
    expect(roleSelector).not.toContain('"admin"');
  });

  it("connects worker apply and client accept/reject through Supabase tables and RPC", () => {
    const workerDetail = readFileSync(join(process.cwd(), "src/components/worker-job-detail-client.tsx"), "utf8");
    const clientDetail = readFileSync(join(process.cwd(), "src/components/client-job-detail-client.tsx"), "utf8");

    expect(workerDetail).toContain("ej_job_applications");
    expect(workerDetail).toContain("No podes postularte a tu propio trabajo");
    expect(clientDetail).toContain("ej_accept_job_application");
    expect(clientDetail).toContain("ej_reject_job_application");
  });

  it("validates core marketplace forms with Zod schemas", () => {
    expect(workerProfileSchema.safeParse({
      fullName: "Ana Gomez",
      phone: "099123456",
      city: "Montevideo",
      headline: "Ayudante para eventos y limpieza",
      bio: "Disponible entre semana para tareas puntuales.",
      skills: "Limpieza, Eventos",
      serviceRadiusKm: 12,
      hourlyRateUyu: 450,
    }).success).toBe(true);

    expect(companyProfileSchema.safeParse({
      fullName: "Luis Pereira",
      phone: "098123456",
      city: "Montevideo",
      companyName: "Pereira Servicios",
      companyType: "business",
      businessCategory: "Hogar",
      contactPhone: "098123456",
      description: "Contratacion puntual para servicios del hogar.",
    }).success).toBe(true);

    expect(jobPostSchema.safeParse({
      title: "Limpieza por jornada",
      category: "Limpieza",
      description: "Necesito limpieza profunda de apartamento chico con insumos incluidos.",
      location: "Centro, Montevideo",
      budgetUyu: 1800,
      urgency: "normal",
    }).success).toBe(true);

    expect(applicationSchema.safeParse({
      message: "Tengo disponibilidad hoy de tarde y experiencia comprobable.",
      proposedAmountUyu: 1700,
    }).success).toBe(true);

    expect(jobPostSchema.safeParse({ title: "Corto" }).success).toBe(false);
  });

  it("exposes expected MVP route files", () => {
    for (const route of [
      "src/app/jobs/page.tsx",
      "src/app/jobs/[id]/page.tsx",
      "src/app/register/page.tsx",
      "src/app/dashboard/worker/profile/page.tsx",
      "src/app/dashboard/worker/applications/page.tsx",
      "src/app/dashboard/client/profile/page.tsx",
      "src/app/dashboard/client/jobs/new/page.tsx",
      "src/app/dashboard/client/jobs/[id]/applications/page.tsx",
      "src/app/admin/jobs/page.tsx",
      "src/app/admin/users/page.tsx",
    ]) {
      expect(readFileSync(join(process.cwd(), route), "utf8").length).toBeGreaterThan(20);
    }
  });
});
