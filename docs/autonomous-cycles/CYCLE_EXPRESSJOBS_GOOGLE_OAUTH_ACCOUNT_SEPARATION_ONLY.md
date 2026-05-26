# Cycle ExpressJobs Google OAuth Account Separation Only

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

Mode: `EXPRESSJOBS_GOOGLE_OAUTH_ACCOUNT_SEPARATION_ONLY`

## Scope

Prepare Google/OAuth separation only. GitHub, Vercel, Supabase ownership, PayPal, and Production remain unchanged.

## Repo State

- Canonical repo: `FileLanderScaner/CODEX-expressjobs`
- Branch: `codex/google-oauth-account-separation-only`
- Base: `main`
- `main` fast-forward pull: up to date
- PR #44: merged
- PR #46: merged
- Open old PRs observed and not touched: #40, #43, #37, #36 plus Dependabot PRs

## OAuth Audit

- Google login is controlled by `NEXT_PUBLIC_ENABLE_GOOGLE_LOGIN`.
- The default flag is `false`.
- PR #46 behavior is present: inactive social providers are hidden instead of rendering dead buttons.
- OAuth redirects use the current browser origin and `/auth/callback`.
- Supabase exchanges the code server-side in `src/app/auth/callback/route.ts`.
- New OAuth profiles default to `client`.
- The Google Client Secret is not needed by app code and must live only in Supabase Auth Provider Google.

## External Access

- Google Cloud: `BLOCKED_GOOGLE_CLOUD_ACCESS` because `gcloud` is not available in the current shell.
- Supabase Google provider: `BLOCKED_SUPABASE_GOOGLE_PROVIDER_WRITE_ACCESS`; no provider mutation was attempted.
- Vercel Preview/Staging envs: `BLOCKED_VERCEL_PREVIEW_ENV_ACCESS`; no env mutation was attempted.

## Safety

- No `vercel --prod`.
- No `vercel promote`.
- No Vercel Production env mutation.
- No Supabase production action.
- No Supabase Auth Provider mutation.
- No OAuth client or secret created.
- No PayPal live.
- No real payments.
- No secrets printed.
- No ownership migration.

## Checks

| Check | Result |
| --- | --- |
| `npm run secret:scan` | PASS |
| `npm run guard:no-production-deploy` | PASS |
| `npm run production:check` | PASS |
| `npm run staging:check` | PASS |
| `npm run test:rls:static` | PASS, 1 file / 12 tests |
| `npm run rls:smoke:messages` | PASS |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm run test` | PASS, 9 files / 54 tests |
| `npm run build` | PASS |
| director JSON parse | PASS |
| Google Cloud CLI | BLOCKED, `gcloud` not installed |
| Supabase Google provider mutation | NOT_RUN by design |
| Vercel Preview/Staging env mutation | NOT_RUN by design |

## NEXT_CODEX_PROMPT

Run `EXPRESSJOBS_GOOGLE_OAUTH_PROJECT_ACCOUNT_MANUAL_CONFIG_AND_PREVIEW_SMOKE` in `C:\CODEX-expressjobs-repo`. Keep scope Google-only. Do not migrate GitHub, Vercel, or Supabase ownership. Keep `PRODUCTION_STATUS=NO-GO_PRODUCTION`; do not use `vercel --prod`; do not use `vercel promote`; do not modify Vercel Production env vars; do not print secrets. Use the project-owned Google account to create/confirm the OAuth Web Client manually. Load Client ID/Secret only into Supabase Auth Provider Google through a secure channel. Enable `NEXT_PUBLIC_ENABLE_GOOGLE_LOGIN=true` only in Vercel Preview/Staging after Supabase provider is configured. Then smoke `/auth -> Google -> /auth/callback -> /role`, run full local checks, update docs/status, and open a PR. Stop on missing Google/Supabase/Vercel access.
