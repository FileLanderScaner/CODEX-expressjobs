const args = process.argv.slice(2);
const urlFlagIndex = args.indexOf("--url");
const rawUrl = urlFlagIndex >= 0 ? args[urlFlagIndex + 1] : process.env.PREVIEW_URL;

if (!rawUrl) {
  console.error("PREVIEW_SMOKE=BLOCKED_PREVIEW_URL_MISSING");
  process.exit(2);
}

let baseUrl;
try {
  baseUrl = new URL(rawUrl);
} catch {
  console.error("PREVIEW_SMOKE=BLOCKED_INVALID_PREVIEW_URL");
  process.exit(2);
}

if (baseUrl.protocol !== "https:") {
  console.error("PREVIEW_SMOKE=BLOCKED_PREVIEW_URL_MUST_BE_HTTPS");
  process.exit(2);
}

const host = baseUrl.hostname.toLowerCase();
if (!host.endsWith(".vercel.app")) {
  console.error("PREVIEW_SMOKE=BLOCKED_UNEXPECTED_PREVIEW_HOST");
  process.exit(2);
}

if (host === "codex-expressjobs.vercel.app") {
  console.error("PREVIEW_SMOKE=BLOCKED_PRODUCTION_HOST");
  process.exit(3);
}

const paths = [
  "/",
  "/como-funciona",
  "/jobs",
  "/jobs/open",
  "/register",
  "/auth",
  "/role",
  "/pricing",
  "/production-paused",
];

const failures = [];
const results = [];

for (const path of paths) {
  const target = new URL(path, baseUrl);
  const response = await fetch(target, { redirect: "manual" });

  results.push(`${path}:${response.status}`);

  // Vercel Deployment Protection may return 401 in Preview without bypass.
  // Redirects are also acceptable for guarded flows. Only server errors fail.
  if (response.status >= 500) {
    failures.push(`${path}:${response.status}`);
  }
}

if (failures.length) {
  console.error(`PREVIEW_SMOKE=FAIL ${failures.join(",")}`);
  console.error(`PREVIEW_SMOKE_RESULTS=${results.join(",")}`);
  process.exit(1);
}

console.log(`PREVIEW_SMOKE=PASS ${baseUrl.origin}`);
console.log(`PREVIEW_SMOKE_RESULTS=${results.join(",")}`);