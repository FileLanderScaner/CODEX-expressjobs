import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function okJson<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ ok: true, data }, init);
}

export function errorJson(code: string, message: string, status = 400) {
  return NextResponse.json({ ok: false, error: { code, message } }, { status });
}

export function validationError(error: unknown) {
  if (error instanceof ZodError) {
    return errorJson("VALIDATION_ERROR", error.issues[0]?.message ?? "Datos invalidos.", 400);
  }

  return errorJson("VALIDATION_ERROR", "Datos invalidos.", 400);
}

export function sanitizeText(value: string) {
  return value.replace(/[<>]/g, "").replace(/\s+/g, " ").trim();
}
