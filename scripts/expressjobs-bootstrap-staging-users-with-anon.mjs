import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { loadEnvFile } from "node:process";
import { createClient } from "@supabase/supabase-js";

if (existsSync(".env.local")) {
  loadEnvFile(".env.local");
}

const required = ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "APP_ENV"];
const missing = required.filter((name) => !process.env[name]);

if (missing.length) {
  console.error(`BLOCKED_SUPABASE_ACCESS: missing env vars: ${missing.join(", ")}`);
  process.exit(2);
}

if (!["staging", "preview"].includes(process.env.APP_ENV)) {
  console.error("BLOCKED_SUPABASE_ACCESS: APP_ENV must be staging or preview.");
  process.exit(2);
}

const suffix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const users = [
  {
    key: "CLIENT",
    role: "client",
    fullName: "ExpressJobs Staging Client",
    email: `expressjobs.staging.client.${suffix}@gmail.com`,
  },
  {
    key: "WORKER",
    role: "worker",
    fullName: "ExpressJobs Staging Worker",
    email: `expressjobs.staging.worker.${suffix}@gmail.com`,
  },
  {
    key: "ADMIN",
    role: "admin",
    fullName: "ExpressJobs Staging Admin",
    email: `expressjobs.staging.admin.${suffix}@gmail.com`,
  },
];

function password() {
  return `Ej-${crypto.randomUUID()}-staging!`;
}

function client() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

const credentials = {};

for (const user of users) {
  const supabase = client();
  const userPassword = password();
  const { data, error } = await supabase.auth.signUp({
    email: user.email,
    password: userPassword,
  });

  if (error) {
    console.error(`BLOCKED_SUPABASE_ACCESS: signup failed for ${user.role}.`);
    console.error(error.message);
    process.exit(2);
  }

  if (!data.session) {
    console.error("BLOCKED_SUPABASE_ACCESS: signup requires email confirmation, so RLS smoke users cannot be prepared through anon signup.");
    process.exit(2);
  }

  const userId = data.user?.id;
  if (!userId) {
    console.error(`BLOCKED_SUPABASE_ACCESS: signup did not return an id for ${user.role}.`);
    process.exit(2);
  }

  const { error: profileError } = await supabase.from("ej_profiles").upsert({
    id: userId,
    role: user.role,
    full_name: user.fullName,
    city: "Montevideo",
  });

  if (profileError) {
    console.error(`BLOCKED_SUPABASE_ACCESS: profile upsert failed for ${user.role}.`);
    console.error(profileError.message);
    process.exit(2);
  }

  credentials[`EXPRESSJOBS_STAGING_${user.key}_EMAIL`] = user.email;
  credentials[`EXPRESSJOBS_STAGING_${user.key}_PASSWORD`] = userPassword;
}

const existing = existsSync(".env.rls") ? readFileSync(".env.rls", "utf8") : "";
const preserved = existing
  .split(/\r?\n/)
  .filter((line) => line.trim() && !line.startsWith("EXPRESSJOBS_STAGING_"))
  .filter((line) => !line.startsWith("EXPRESSJOBS_ALLOW_STAGING_MUTATIONS="));

const lines = [
  ...preserved,
  `APP_ENV=${process.env.APP_ENV}`,
  `NEXT_PUBLIC_SUPABASE_URL=${process.env.NEXT_PUBLIC_SUPABASE_URL}`,
  `NEXT_PUBLIC_SUPABASE_ANON_KEY=${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
  "EXPRESSJOBS_ALLOW_STAGING_MUTATIONS=false",
  ...Object.entries(credentials).map(([name, value]) => `${name}=${value}`),
];

writeFileSync(".env.rls", `${lines.join("\n")}\n`, "utf8");

console.log("ExpressJobs staging RLS users prepared without printing credentials.");
