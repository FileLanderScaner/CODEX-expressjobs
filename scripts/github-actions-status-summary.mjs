import { mkdirSync, writeFileSync } from "node:fs";

const outputPath = "docs/github-actions/EXPRESSJOBS_PREVIEW_PIPELINE_LAST_STATUS.md";
mkdirSync("docs/github-actions", { recursive: true });

const env = process.env;
const blockers = (env.BLOCKERS || "- GITHUB_ACTIONS_SECRETS_NOT_VERIFIED_LOCALLY").replaceAll("\\n", "\n");
const lines = [
  "# ExpressJobs Preview Pipeline Last Status",
  "",
  `- Date: ${env.RUN_DATE || new Date().toISOString()}`,
  `- Branch: ${env.GITHUB_REF_NAME || env.BRANCH || "unknown"}`,
  `- Commit SHA: ${env.GITHUB_SHA || env.COMMIT_SHA || "unknown"}`,
  `- Task: ${env.PIPELINE_TASK || "unknown"}`,
  `- Repo checks: ${env.REPO_CHECKS_STATUS || "unknown"}`,
  `- Supabase status: ${env.SUPABASE_STATUS || "unknown"}`,
  `- RLS smoke status: ${env.RLS_SMOKE_STATUS || "unknown"}`,
  `- Vercel Preview: ${env.VERCEL_PREVIEW_STATUS || "unknown"}`,
  `- Vercel Preview URL: ${env.PREVIEW_URL || "not_created"}`,
  `- Production status: NO-GO_PRODUCTION`,
  "",
  "## Blockers",
  "",
  blockers,
  "",
  "## Next Recommended Action",
  "",
  env.NEXT_RECOMMENDED_ACTION ||
    "Run the workflow from GitHub Actions after adding the required Preview/Staging secrets. Keep production blocked.",
  "",
];

writeFileSync(outputPath, `${lines.join("\n")}\n`);
console.log(`Wrote ${outputPath}`);
