const required = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "APP_ENV",
  "NEXT_PUBLIC_APP_URL",
  "ALLOWED_ORIGINS",
  "ENABLE_PAYMENTS",
  "ENABLE_AI_AGENTS",
  "AI_KILL_SWITCH",
  "ENABLE_ADMIN_PANEL",
];

const missing = required.filter((name) => !process.env[name]);
const appEnv = process.env.APP_ENV;

if (missing.length) {
  console.error(`BLOCKED_SUPABASE_ACCESS: missing staging env vars: ${missing.join(", ")}`);
  process.exit(2);
}

if (!["staging", "preview"].includes(appEnv)) {
  console.error("BLOCKED_SUPABASE_ACCESS: APP_ENV must be staging or preview for staging checks.");
  process.exit(2);
}

if (process.env.ENABLE_PAYMENTS !== "false" || process.env.ENABLE_AI_AGENTS !== "false" || process.env.AI_KILL_SWITCH !== "true") {
  console.error("BLOCKED_SECURITY_RISK: unsafe feature flags for staging.");
  process.exit(3);
}

console.log("ExpressJobs staging env check passed.");
