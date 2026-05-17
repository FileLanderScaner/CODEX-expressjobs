import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("production access neutralization", () => {
  it("redirects production traffic to the paused page only in Vercel production", () => {
    const middleware = readFileSync(join(process.cwd(), "middleware.ts"), "utf8");

    expect(middleware).toContain('process.env.VERCEL_ENV !== "production"');
    expect(middleware).toContain('const productionPausedPath = "/production-paused"');
    expect(middleware).toContain("NextResponse.redirect");
  });

  it("publishes a clear NO-GO production paused page", () => {
    const page = readFileSync(join(process.cwd(), "src/app/production-paused/page.tsx"), "utf8");

    expect(page).toContain("Acceso publico pausado");
    expect(page).toContain("PRODUCTION_STATUS=NO-GO_PRODUCTION");
    expect(page).toContain("akuma_g1@hotmail.com");
    expect(page).toContain("https://wa.me/59897045305");
  });
});
