# ExpressJobs Preview Browser Smoke Report

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Target

`https://codex-expressjobs-q2apmubra-akuma424-projects.vercel.app`

## Current Automation Result

`PREVIEW_BROWSER_SMOKE=BLOCKED_PREVIEW_AUTH_401`

The current Codex process does not have `VERCEL_AUTOMATION_BYPASS_SECRET`, so protected browser smoke could not be executed with a bypass header.

## HTTP Route Matrix

No bypass header was used.

| Route | HTTP |
| --- | --- |
| `/` | `401 Unauthorized` |
| `/auth` | `401 Unauthorized` |
| `/pricing` | `401 Unauthorized` |
| `/jobs/open` | `401 Unauthorized` |
| `/client/jobs/new` | `401 Unauthorized` |
| `/worker/jobs` | `401 Unauthorized` |

## Interpretation

The 401 responses indicate Deployment Protection is active. This is acceptable for a protected Preview, but it blocks automated browser smoke until a safe bypass header is available in the local/CI process.

## Prior Evidence

Prior protected browser smoke remains recorded as `PASS`; this report only records the current audit run.

## Required Follow-Up

Re-run protected browser smoke with `x-vercel-protection-bypass` loaded only as a secure local/CI environment variable. Do not print or document the value.
