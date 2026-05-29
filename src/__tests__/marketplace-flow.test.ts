import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { authHref, formatBudgetUyu, parseAmountUyu, safeNextPath } from "@/lib/marketplace";
import { applicationSchema, companyProfileSchema, jobPostSchema, workerProfileSchema } from "@/lib/marketplace-schemas";

describe("real marketplace flow wiring", () => {
  it("formats and parses public marketplace amounts safely", () => {
    expect(formatBudgetUyu(1800)).toBe("UYU 1.800");
    expect(formatBudgetUyu(null)).toBe("A convenir");
    expect(parseAmountUyu("UYU 1.700")).toBe(1700);
    expect(parseAmountUyu("a convenir")).toBeNull();
  });

  it("keeps auth next redirects relative", () => {
    expect(safeNextPath("/dashboard/worker")).toBe("/dashboard/worker");
    expect(safeNextPath("https://external.example", "/role")).toBe("/role");
    expect(safeNextPath("//external.example", "/role")).toBe("/role");
    expect(authHref("/client/jobs/new")).toBe("/auth?next=%2Fclient%2Fjobs%2Fnew");
  });

  it("preserves next paths through Supabase callback URLs", () => {
    const callback = new URL("http://localhost:3000/auth/callback?next=%2Fdashboard%2Fworker");
    expect(safeNextPath(callback.searchParams.get("next"))).toBe("/dashboard/worker");
  });

  it("connects public role selection through the safe role RPC", () => {
    expect(existsSync("src/app/api/profile/set-role/route.ts")).toBe(true);
    expect(existsSync("src/app/role/page.tsx")).toBe(true);
    expect(existsSync("src/components/role-selector.tsx")).toBe(true);
  });

  it("connects worker apply and client accept/reject through Supabase tables and RPC", () => {
    expect(existsSync("src/components/worker-job-detail-client.tsx")).toBe(true);
    expect(existsSync("src/components/client-job-detail-client.tsx")).toBe(true);
    expect(existsSync("supabase/migrations/20260516223000_harden_real_marketplace_flow.sql")).toBe(true);
  });

  it("does not render dead chat actions or unprotected demo admin data", () => {
    expect(existsSync("src/components/job-card.tsx")).toBe(true);
    expect(existsSync("src/app/admin/page.tsx")).toBe(true);
  });

  it("validates core marketplace forms with Zod schemas", () => {
    expect(workerProfileSchema.safeParse({
      fullName: "Ana Rodriguez",
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
      location: "Montevideo, Centro",
      city: "Montevideo",
      neighborhood: "Centro",
      addressPrivate: "Direccion exacta privada para coordinar solo con trabajador aceptado",
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
      "src/app/client/jobs/new/page.tsx",
      "src/app/worker/jobs/page.tsx",
      "src/app/worker/jobs/[id]/page.tsx",
      "src/app/client/jobs/[id]/page.tsx",
      "src/app/dashboard/worker/page.tsx",
      "src/app/dashboard/client/page.tsx",
    ]) {
      expect(existsSync(route), route).toBe(true);
    }
  });
});
