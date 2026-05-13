const forbiddenTrue = ["ENABLE_PAYMENTS", "ENABLE_AI_AGENTS", "ENABLE_ADMIN_PANEL"];

for (const name of forbiddenTrue) {
  if (process.env[name] === "true") {
    console.error(`BLOCKED_PRODUCTION_RISK: ${name}=true is not allowed.`);
    process.exit(3);
  }
}

if (process.env.AI_KILL_SWITCH && process.env.AI_KILL_SWITCH !== "true") {
  console.error("BLOCKED_PRODUCTION_RISK: AI_KILL_SWITCH must remain true.");
  process.exit(3);
}

if (process.env.APP_ENV === "production") {
  console.error("EXPRESSJOBS_NO_GO_PRODUCTION: production remains blocked.");
  process.exit(2);
}

console.log("ExpressJobs production guard passed: PRODUCTION_STATUS=NO-GO_PRODUCTION.");
