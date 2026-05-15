const args = process.argv.slice(2);
const argText = args.join(" ");
const argTextLower = argText.toLowerCase();

const blocked = [];

function block(reason) {
  blocked.push(reason);
}

if (args.includes("--prod") || argTextLower.includes(" --prod")) {
  block("BLOCKED_PRODUCTION_RISK: --prod is forbidden");
}

if (/\bvercel\s+promote\b/i.test(argText)) {
  block("BLOCKED_PRODUCTION_RISK: vercel promote is forbidden");
}

if (/(^|\s)--target(\s+|=)production(\s|$)/i.test(argText)) {
  block("BLOCKED_PRODUCTION_RISK: production target is forbidden");
}

const productionTargetVars = ["VERCEL_TARGET", "VERCEL_ENV", "DEPLOY_TARGET", "TARGET_ENV", "APP_ENV"];
for (const name of productionTargetVars) {
  if (process.env[name]?.toLowerCase() === "production") {
    block(`BLOCKED_PRODUCTION_RISK: ${name}=production is forbidden`);
  }
}

if (process.env.ENABLE_PAYMENTS === "true") {
  block("BLOCKED_PRODUCTION_RISK: ENABLE_PAYMENTS=true is forbidden for Preview pipeline");
}

if (process.env.ENABLE_AI_AGENTS === "true") {
  block("BLOCKED_PRODUCTION_RISK: ENABLE_AI_AGENTS=true is forbidden");
}

if (process.env.AI_KILL_SWITCH === "false") {
  block("BLOCKED_PRODUCTION_RISK: AI_KILL_SWITCH=false is forbidden");
}

if (process.env.SUPABASE_WRITE_APPROVAL === "true" && process.env.ALLOW_SUPABASE_WRITE_APPROVAL !== "true") {
  block("BLOCKED_SUPABASE_WRITE_CAPABILITY: SUPABASE_WRITE_APPROVAL=true requires explicit workflow approval");
}

if (blocked.length) {
  for (const reason of blocked) {
    console.error(reason);
  }
  process.exit(3);
}

console.log("ExpressJobs no-production deploy guard passed.");
