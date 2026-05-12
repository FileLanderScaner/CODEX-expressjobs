import { describe, expect, it } from "vitest";
import { productionStatus } from "@/lib/env";

describe("environment gates", () => {
  it("keeps production blocked by default", () => {
    expect(productionStatus()).toBe("NO-GO_PRODUCTION");
  });
});
