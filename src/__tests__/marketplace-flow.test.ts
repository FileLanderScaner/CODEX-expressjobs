import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { authHref, formatBudgetUyu, parseAmountUyu, safeNextPath } from "@/lib/marketplace";
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
    const workerList = readFileSync(join(process.cwd(), "src/components/worker-jobs-client.tsx"), "utf8");
    const applicationCard = readFileSync(join(process.cwd(), "src/components/application-card.tsx"), "utf8");

    expect(workerDetail).toContain("ej_job_applications");
    expect(workerDetail).toContain("No podes postularte a tu propio trabajo");
    expect(workerDetail).toContain("Ya te postulaste a este trabajo");
    expect(workerList).toContain("job.clientId !== user.id");
    expect(clientDetail).toContain("ej_accept_job_application");
    expect(clientDetail).toContain("ej_reject_job_application");
    expect(clientDetail).toContain("Postulacion aceptada");
    expect(clientDetail).toContain("No tenes postulaciones todavia");
    expect(applicationCard).toContain("pendiente");
  });
});
