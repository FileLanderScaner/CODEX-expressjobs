import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

function readPublicSourceFiles() {
  const roots = ["src/app", "src/components", "src/lib/monetization"];
  const files: string[] = [];

  function visit(path: string) {
    if (!existsSync(path)) {
      return;
    }

    for (const entry of readdirSync(path)) {
      const fullPath = join(path, entry);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        visit(fullPath);
        continue;
      }

      if (/\.(tsx|ts)$/.test(entry)) {
        files.push(fullPath);
      }
    }
  }

  roots.forEach((root) => visit(join(process.cwd(), root)));
  return files.map((file) => [file, readFileSync(file, "utf8")] as const);
}

describe("real public product surface", () => {
  it("does not publish demo routes or links", () => {
    expect(existsSync(join(process.cwd(), "src/app/demo"))).toBe(false);

    for (const [file, content] of readPublicSourceFiles()) {
      expect(content, file).not.toContain("/demo");
      expect(content, file).not.toMatch(/\bDemo\b/);
      expect(content, file).not.toContain("Mostrando ejemplos");
      expect(content, file).not.toContain("pagina de muestra");
      expect(content, file).not.toContain("negocio ficticio");
    }
  });

  it("keeps the home page focused on real marketplace actions", () => {
    const home = readFileSync(join(process.cwd(), "src/app/page.tsx"), "utf8");

    expect(home).toContain("Publicar tarea");
    expect(home).toContain("Buscar trabajos");
    expect(home).toContain("Crear cuenta");
    expect(home).toContain("Crear perfil");
    expect(home).toContain("Llamados públicos");
    expect(home).toContain("Ver llamados públicos");
    expect(home).not.toContain("Ver demos comerciales");
  });

  it("exposes the public calls radar safely", () => {
    const appShell = readFileSync(join(process.cwd(), "src/components/app-shell.tsx"), "utf8");
    const page = readFileSync(join(process.cwd(), "src/app/llamados-publicos/page.tsx"), "utf8");
    const client = readFileSync(join(process.cwd(), "src/components/public-calls-client.tsx"), "utf8");
    const data = readFileSync(join(process.cwd(), "src/lib/public-calls-data.ts"), "utf8");
    const packageJson = readFileSync(join(process.cwd(), "package.json"), "utf8");
    const combined = [page, client, data, packageJson].join("\n");

    expect(existsSync(join(process.cwd(), "src/app/llamados-publicos/page.tsx"))).toBe(true);
    expect(appShell).toContain("/llamados-publicos");
    expect(appShell).toContain("Llamados públicos");
    expect(page).toContain("ExpressJobs no administra ni representa llamados publicos externos");
    expect(page).toContain("Prepará tu postulación con Caso Claro");
    expect(data).toContain("sourceUrl");
    expect(data).toContain("https://uruguayconcursa.gub.uy/");
    expect(combined).not.toContain("cheerio");
    expect(combined).not.toContain("puppeteer");
    expect(combined).not.toContain("axios");
    expect(combined).not.toContain("crawler");
    expect(combined).not.toContain("afiliado a Uruguay Concursa");
    expect(combined).not.toContain("representa a Uruguay Concursa");
  });

  it("keeps real contact channels visible", () => {
    const appShell = readFileSync(join(process.cwd(), "src/components/app-shell.tsx"), "utf8");
    const offers = readFileSync(join(process.cwd(), "src/app/ofertas/page.tsx"), "utf8");
    const monetizationConfig = readFileSync(join(process.cwd(), "src/lib/monetization/monetization-config.ts"), "utf8");

    expect(appShell).toContain("WhatsApp 097045305");
    expect(offers).toContain("097045305");
    expect(offers).toContain("publicSalesContact.email");
    expect(monetizationConfig).toContain('ownerName: "Ronald Gonzalez"');
    expect(monetizationConfig).toContain('whatsappNumber: "59897045305"');
    expect(monetizationConfig).toContain('email: "trabajosrapidos.uy@gmail.com"');
  });

  it("does not rewrite legitimate titles containing generic smoke wording", () => {
    const jobCard = readFileSync(join(process.cwd(), "src/components/job-card.tsx"), "utf8");

    expect(jobCard).toContain("RLS_SMOKE|SMOKE_TEST|TEST_JOB");
    expect(jobCard).not.toContain("RLS_SMOKE|SMOKE_TEST|SMOKE|TEST_JOB");
  });

  it("uses real empty states instead of presenting fallback jobs as real", () => {
    const workerJobs = readFileSync(join(process.cwd(), "src/components/worker-jobs-client.tsx"), "utf8");
    const clientDashboard = readFileSync(join(process.cwd(), "src/components/client-dashboard.tsx"), "utf8");
    const workerDetail = readFileSync(join(process.cwd(), "src/components/worker-job-detail-client.tsx"), "utf8");

    expect(workerJobs).toContain("Todavia no hay trabajos disponibles");
    expect(workerJobs).not.toContain("featuredJobs");
    expect(clientDashboard).not.toContain("listClientJobs");
    expect(workerDetail).not.toContain("getJobById");
  });

  it("does not render merge artifact markers in app source", () => {
    for (const [file, content] of readPublicSourceFiles()) {
      expect(content, file).not.toMatch(/^<<<<<<<|^=======|^>>>>>>>/m);
      expect(content, file).not.toContain("codex/expressjobs-");
      expect(content, file).not.toMatch(/^\s+main\s*$/m);
    }
  });
});
