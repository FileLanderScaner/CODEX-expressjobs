import { describe, expect, it } from "vitest";
import { contactSchema, jobCreateSchema, messageCreateSchema, profilePatchSchema } from "@/lib/validation";
import { sanitizeText } from "@/lib/api";

describe("API validation and sanitization", () => {
  it("validates public contact input", () => {
    const parsed = contactSchema.parse({
      name: "Ana Tester",
      email: "ana@example.test",
      message: "Quiero consultar por el piloto.",
    });

    expect(parsed.email).toBe("ana@example.test");
  });

  it("rejects unsafe short marketplace inputs", () => {
    expect(() => jobCreateSchema.parse({ title: "x", description: "corta", location_text: "", budget_uyu: 1 })).toThrow();
    expect(() => messageCreateSchema.parse({ job_id: "not-a-uuid", body: "" })).toThrow();
  });

  it("keeps profile role outside editable schema", () => {
    const parsed = profilePatchSchema.parse({
      full_name: "Usuario Seguro",
      city: "Montevideo",
      role: "admin",
    });

    expect(parsed).not.toHaveProperty("role");
  });

  it("strips angle brackets from text before storage", () => {
    expect(sanitizeText(" <script> hola </script> ")).toBe("script hola /script");
  });
});
