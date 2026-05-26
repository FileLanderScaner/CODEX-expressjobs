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

    expect(home).toContain("Publicar un trabajo");
    expect(home).toContain("Buscar trabajos");
    expect(home).toContain("Crear cuenta");
    expect(home).toContain("Crear mi perfil");
    expect(home).not.toContain("Ver demos comerciales");
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

  it("uses real empty states instead of presenting fallback jobs as real", () => {
    const workerJobs = readFileSync(join(process.cwd(), "src/components/worker-jobs-client.tsx"), "utf8");
    const clientDashboard = readFileSync(join(process.cwd(), "src/components/client-dashboard.tsx"), "utf8");
    const workerDetail = readFileSync(join(process.cwd(), "src/components/worker-job-detail-client.tsx"), "utf8");

    expect(workerJobs).toContain("Todavia no hay trabajos disponibles");
    expect(workerJobs).not.toContain("featuredJobs");
    expect(clientDashboard).not.toContain("listClientJobs");
    expect(workerDetail).not.toContain("getJobById");
  });
});