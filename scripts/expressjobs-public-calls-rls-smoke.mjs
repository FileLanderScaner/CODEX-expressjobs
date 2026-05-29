import { existsSync } from "node:fs";
import { loadEnvFile } from "node:process";
import { createClient } from "@supabase/supabase-js";

for (const envFile of [".env.local", ".env.rls"]) {
  if (existsSync(envFile)) {
    loadEnvFile(envFile);
  }
}

const required = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "APP_ENV",
  "EXPRESSJOBS_STAGING_CLIENT_EMAIL",
  "EXPRESSJOBS_STAGING_CLIENT_PASSWORD",
  "EXPRESSJOBS_STAGING_ADMIN_EMAIL",
  "EXPRESSJOBS_STAGING_ADMIN_PASSWORD",
];

const missing = required.filter((name) => !process.env[name]);
if (missing.length) {
  console.error(`BLOCKED_RLS_REAL_SMOKE_CREDENTIALS: missing env vars: ${missing.join(", ")}`);
  process.exit(2);
}

if (!["staging", "preview"].includes(process.env.APP_ENV)) {
  console.error("BLOCKED_SUPABASE_ACCESS: APP_ENV must be staging or preview.");
  process.exit(2);
}

function client() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

async function signIn(label, email, password) {
  const supabase = client();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    throw new Error(`BLOCKED_RLS_REAL_SMOKE_CREDENTIALS: ${label} sign-in failed.`);
  }
  return supabase;
}

async function expectBlocked(label, action) {
  const { error, data } = await action();
  if (error) return;
  if (Array.isArray(data) && data.length === 0) return;
  if (!data) return;
  throw new Error(`${label}: expected blocked or invisible result`);
}

async function expectAllowed(label, action) {
  const { error, data } = await action();
  if (error) {
    if (error.code === "PGRST205") {
      throw new Error(`BLOCKED_SUPABASE_SCHEMA_NOT_APPLIED: ${label}: ${error.message}`);
    }
    throw new Error(`${label}: expected allowed operation: ${error.code ?? "UNKNOWN_ERROR"}`);
  }
  if (!data || (Array.isArray(data) && data.length === 0)) {
    throw new Error(`${label}: expected returned row`);
  }
  return data;
}

const anonymous = client();
const clientUser = await signIn("client", process.env.EXPRESSJOBS_STAGING_CLIENT_EMAIL, process.env.EXPRESSJOBS_STAGING_CLIENT_PASSWORD);
const adminUser = await signIn("admin", process.env.EXPRESSJOBS_STAGING_ADMIN_EMAIL, process.env.EXPRESSJOBS_STAGING_ADMIN_PASSWORD);

const suffix = `${Date.now()}-${crypto.randomUUID()}`;

await expectBlocked("anonymous cannot create public-call source", () =>
  anonymous.from("public_call_sources").insert({
    name: `Anon blocked ${suffix}`,
    source_type: "manual",
    base_url: "https://www.gub.uy/llamados-concursos-publicos",
  }),
);

await expectBlocked("client cannot create public-call source", () =>
  clientUser.from("public_call_sources").insert({
    name: `Client blocked ${suffix}`,
    source_type: "manual",
    base_url: "https://www.gub.uy/llamados-concursos-publicos",
  }),
);

const source = await expectAllowed("admin creates public-call source", () =>
  adminUser
    .from("public_call_sources")
    .insert({
      name: `RLS smoke source ${suffix}`,
      source_type: "manual",
      base_url: "https://www.gub.uy/llamados-concursos-publicos",
      terms_url: "https://www.gub.uy/terminos-condiciones-uso",
      license_name: "Terminos gub.uy revisados",
      license_url: "https://www.gub.uy/terminos-condiciones-uso",
      robots_review_status: "reviewed_allowed",
      authorization_status: "manual_only",
      notes: "Non-production public calls RLS smoke source.",
    })
    .select("id")
    .single(),
);

const draft = await expectAllowed("admin creates draft", () =>
  adminUser
    .from("public_call_drafts")
    .insert({
      source_id: source.id,
      title: `RLS smoke public call ${suffix}`,
      organization: "Organismo de prueba staging",
      description: "Non-production public-call RLS smoke draft.",
      category: "Prueba",
      location: "Uruguay",
      source_url: "https://www.gub.uy/llamados-concursos-publicos",
      license_name: "Terminos gub.uy revisados",
      load_method: "manual",
      source_snapshot: { smoke: "public_calls_rls" },
    })
    .select("id")
    .single(),
);

await expectBlocked("client cannot edit draft", () =>
  clientUser.from("public_call_drafts").update({ title: "Blocked edit" }).eq("id", draft.id).select("id"),
);

await expectBlocked("anonymous cannot read unpublished draft", () =>
  anonymous.from("public_call_drafts").select("id").eq("id", draft.id),
);

await expectBlocked("admin cannot publish unapproved draft", () =>
  adminUser.from("public_call_drafts").update({ publication_status: "published" }).eq("id", draft.id).select("id"),
);

await expectBlocked("admin cannot reject without reason", () =>
  adminUser.from("public_call_drafts").update({ review_status: "rejected", rejection_reason: null }).eq("id", draft.id).select("id"),
);

await expectAllowed("admin sends draft to review", () =>
  adminUser
    .from("public_call_drafts")
    .update({ review_status: "pending_review", review_notes: "RLS smoke review requested." })
    .eq("id", draft.id)
    .select("id")
    .single(),
);

await expectAllowed("admin approves draft", () =>
  adminUser
    .from("public_call_drafts")
    .update({ review_status: "approved", review_notes: "RLS smoke approved." })
    .eq("id", draft.id)
    .select("id")
    .single(),
);

await expectAllowed("admin publishes approved draft", () =>
  adminUser
    .from("public_call_drafts")
    .update({ publication_status: "published", review_notes: "RLS smoke published." })
    .eq("id", draft.id)
    .select("id")
    .single(),
);

await expectAllowed("anonymous can read approved published draft", () =>
  anonymous.from("public_call_drafts").select("id").eq("id", draft.id).single(),
);

await expectAllowed("admin sees audit events", () =>
  adminUser.from("public_call_review_events").select("id").eq("draft_id", draft.id).limit(1),
);

await expectAllowed("admin archives published draft", () =>
  adminUser
    .from("public_call_drafts")
    .update({ publication_status: "archived", review_notes: "RLS smoke archived." })
    .eq("id", draft.id)
    .select("id")
    .single(),
);

await expectBlocked("anonymous cannot read archived draft", () =>
  anonymous.from("public_call_drafts").select("id").eq("id", draft.id),
);

console.log("EXPRESSJOBS_PUBLIC_CALLS_RLS_STAGING_PASS");
