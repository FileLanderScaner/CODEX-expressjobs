# Cycle ExpressJobs Google OAuth Provider Configured Preview Smoke

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

Mode: `EXPRESSJOBS_GOOGLE_OAUTH_PROVIDER_CONFIGURED_PREVIEW_SMOKE_TOKEN_SAVER`

## Scope

Validate Google OAuth Preview/Staging after the human-created Google OAuth Web Client was reported configured in Supabase Authentication > Providers > Google. This cycle stays Google-only and does not migrate accounts, change ownership, run SQL, run migrations, read secrets, or touch Production.

## Minimal Repo Inspection

- Branch: `codex/google-oauth-account-separation-only`
- Working tree before docs: clean
- Recent commits present: `58b659e`, `f3daae8`
- Remote used: `origin`
- Extra remote observed: `neworigin`; not used and not modified

## Supabase Reconnect And Branch Capacity

- Supabase project: `gnsfyvsodslnehszanra`
- Project name: `supabase-expressjobs`
- Project status: `ACTIVE_HEALTHY`
- `supabase/.temp/project-ref`: exists, contains `gnsfyvsodslnehszanra`, and is ignored by `supabase/.gitignore`
- Branches observed:
  - `main`, default, project ref `gnsfyvsodslnehszanra`
  - `codex/google-oauth-account-separation-only`, preview project ref `akkwllgrbhkqljjkhlge`, `ACTIVE_HEALTHY`
- Capacity status: not at the known main-plus-two-non-main limit
- New Supabase branch created: no
- Supabase branch requirement: `SUPABASE_BRANCH_NOT_REQUIRED_NO_SUPABASE_DIFF`

## Google Provider Status

- Human reported the project-owned Google OAuth Web Client was created.
- Human reported Client ID/Secret were loaded manually into Supabase Authentication > Providers > Google.
- Codex did not read or print Client ID, Client Secret, tokens, cookies, auth codes, emails, or user IDs.
- Provider status via safe read: `GOOGLE_PROVIDER_STATUS_NOT_READABLE_SAFE_ASSUMPTION_MANUAL_CONFIG_REPORTED`

## Vercel Preview/Staging Env

- Vercel MCP: blocked by 403 for scope `akuma424-projects`
- Vercel CLI: accessible
- Previous Preview showed Supabase public config OK but Google flag Missing
- Preview branch env repaired:
  - `NEXT_PUBLIC_ENABLE_GOOGLE_LOGIN=true`
  - `NEXT_PUBLIC_APP_URL=https://codex-expressjobs-azziipob9-akuma424-projects.vercel.app`
- Production env vars touched: no
- New deployment was required because env was incomplete; deploy command used `--target preview`

## Preview Deployment

- Preview URL: `https://codex-expressjobs-4shv25dkd-akuma424-projects.vercel.app`
- Deployment ID: `dpl_nFM6ompChcy9YWp7iNPqxqoPZUNR`
- Target: `preview`
- Status: `Ready`

## Browser Smoke

- `/auth`: loads in browser with HTTP 200 through protected Preview bypass header
- `/register`: loads in browser with HTTP 200 through protected Preview bypass header
- Diagnostics: Supabase public config OK
- Diagnostics: Google login flag OK
- Google button: visible
- Facebook button: hidden
- Instagram text/button: hidden
- Secret-like text in `/auth` or `/register`: not found
- Clicking `Continuar con Google`: reaches `accounts.google.com`
- OAuth request references expected Supabase callback: `https://gnsfyvsodslnehszanra.supabase.co/auth/v1/callback`
- Final `/role` result: blocked until a human completes Google staging/test login

Result: `GOOGLE_AUTH_PREVIEW_SMOKE=PASS_UNTIL_GOOGLE_SIGN_IN`; final callback/session creation remains `BLOCKED_EXTERNAL_CREDENTIALS_HUMAN_GOOGLE_LOGIN_REQUIRED`.

## Safety

- No `vercel --prod`.
- No `vercel promote`.
- No Vercel Production env mutation.
- No Supabase production action.
- No Supabase Auth Provider mutation by Codex.
- No SQL.
- No migrations.
- No PayPal live.
- No real payments.
- No secrets printed.
- No Git remote changes.
- No merge.

## Checks

| Check | Result |
| --- | --- |
| `git status --short` | PASS, clean before docs |
| `git branch --show-current` | PASS, `codex/google-oauth-account-separation-only` |
| `git remote -v` | PASS, `origin` present; `neworigin` observed and not used |
| `git log --oneline -5` | PASS, expected commits present |
| Supabase local project ref | PASS |
| Supabase MCP project list | PASS |
| Supabase MCP branch list | PASS |
| Vercel Preview deploy inspect | PASS, target `preview`, status `Ready` |
| Browser smoke `/auth` and `/register` | PASS |
| Google OAuth click | PASS until Google sign-in |
| `npm run secret:scan` | PASS |
| `npm run production:check` | PASS, `PRODUCTION_STATUS=NO-GO_PRODUCTION` |
| `npm run guard:no-production-deploy` | PASS |
| `npm run staging:check` | PASS |
| director JSON parse | PASS |
| `git diff --check` | PASS |

## Blockers

- `BLOCKED_EXTERNAL_CREDENTIALS`: Codex cannot complete the Google login and final `/role` callback without a human-controlled staging/test Google account. Do not paste credentials, cookies, tokens, auth codes, user IDs, Client ID, or Client Secret.

## NEXT_CODEX_PROMPT

Continue in `C:\CODEX-expressjobs-repo` on branch `codex/google-oauth-account-separation-only`.

Mode: `EXPRESSJOBS_GOOGLE_OAUTH_HUMAN_LOGIN_CALLBACK_VERIFY`.

Objective: complete only the final human Google login verification for Preview `https://codex-expressjobs-4shv25dkd-akuma424-projects.vercel.app`.

Rules: keep `PRODUCTION_STATUS=NO-GO_PRODUCTION`; do not use `vercel --prod`; do not use `vercel promote`; do not modify Vercel Production env vars; do not print secrets; do not commit `.env`; do not use service-role in client code; do not relax RLS; do not run SQL or migrations; do not migrate ownership.

Tasks: open `/auth`; click `Continuar con Google`; complete login with a human-controlled staging/test Google account; confirm whether the app returns to `/role`; record only sanitized status and visible non-secret errors; update director docs and cycle report.

Checks: `npm run secret:scan`; `npm run production:check`; `npm run guard:no-production-deploy`; `npm run staging:check`; `git diff --check`; JSON parse if JSON changes. Run full lint/typecheck/test/build only if code changes.

GO/NO-GO: GO for Preview/Staging only if Google returns to `/role` without visible auth errors. Production remains `NO-GO_PRODUCTION` in all cases.
