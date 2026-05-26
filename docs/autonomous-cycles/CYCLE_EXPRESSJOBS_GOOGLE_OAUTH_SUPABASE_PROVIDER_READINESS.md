# Cycle ExpressJobs Google OAuth Supabase Provider Readiness

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

Mode: `EXPRESSJOBS_GOOGLE_OAUTH_SUPABASE_PROVIDER_READINESS`

## Scope

Prepare Google-only OAuth provider readiness for Supabase project `gnsfyvsodslnehszanra`. This cycle does not create Google credentials, does not modify Supabase provider settings, does not run SQL or migrations, does not modify Vercel env vars, and does not touch production.

## Repo And Supabase Local State

- Branch: `codex/google-oauth-account-separation-only`
- Canonical push remote for this cycle: `origin`
- Extra remote observed: `neworigin`; not used and not modified
- `supabase/.temp/project-ref`: exists
- Local Supabase project ref value: `gnsfyvsodslnehszanra`
- `supabase/.temp/project-ref` git ignore source: `supabase/.gitignore`
- Operator-confirmed Supabase project: `supabase-expressjobs`
- Operator-confirmed Supabase status: `ACTIVE_HEALTHY`

## OAuth Readiness Findings

- `NEXT_PUBLIC_ENABLE_GOOGLE_LOGIN=true` enables the Google button when Supabase public config is also present.
- `NEXT_PUBLIC_ENABLE_GOOGLE_LOGIN=false` hides Google because disabled providers are filtered out before rendering.
- App OAuth redirect path is `/auth/callback`.
- Browser OAuth starts with the current browser origin plus `/auth/callback`.
- Supabase callback required in Google Cloud is `https://gnsfyvsodslnehszanra.supabase.co/auth/v1/callback`.
- The app callback exchanges the code server-side and creates/fetches a safe default `client` profile.
- No Google Client Secret belongs in repo files, `.env.example`, logs, screenshots, or chat.

## Required Human Provider Checklist

Google Cloud nuevo:

- App name: `ExpressJobs / Trabajos Rapidos`
- Scopes: `openid`, `email`, `profile`
- OAuth Client type: Web application
- Authorized JavaScript origins:
  - `http://localhost:3000`
  - Vercel Preview/Staging estable cuando exista
- Authorized redirect URI:
  - `https://gnsfyvsodslnehszanra.supabase.co/auth/v1/callback`

Supabase:

- Project: `gnsfyvsodslnehszanra`
- Authentication > Providers > Google
- cargar Client ID nuevo
- cargar Client Secret nuevo
- no guardar secret en repo
- no imprimir secret

Vercel Preview/Staging:

- `NEXT_PUBLIC_ENABLE_GOOGLE_LOGIN=true`
- `NEXT_PUBLIC_APP_URL=<preview/staging estable>`
- no tocar Production env vars

## Safety

- No `vercel --prod`.
- No `vercel promote`.
- No Vercel Production env mutation.
- No Supabase production action.
- No Supabase Auth Provider mutation.
- No SQL.
- No migrations.
- No OAuth client or secret created by Codex.
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
| `supabase/.temp/project-ref` exists | PASS |
| `supabase/.temp/project-ref` value | PASS, `gnsfyvsodslnehszanra` |
| `git check-ignore -v supabase/.temp/project-ref` | PASS |
| OAuth code audit | PASS |
| `npm run secret:scan` | PASS |
| `npm run staging:check` | PASS |
| `npm run production:check` | PASS, `PRODUCTION_STATUS=NO-GO_PRODUCTION` |
| `npm run guard:no-production-deploy` | PASS |
| `npm run test:rls:static` | PASS, 1 file / 12 tests |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm run test` | PASS, 9 files / 54 tests |
| `npm run build` | PASS |
| director JSON parse | PASS |
| `git diff --check` | PASS |

## Blockers

- `BLOCKED_EXTERNAL_CREDENTIALS`: project-owned Google OAuth Client ID and Client Secret must be created and loaded by a human through secure provider dashboards.
- `BLOCKED_SUPABASE_ACCESS`: Supabase Google provider settings were not read or modified in this no-provider-mutation cycle.
- `BLOCKED_VERCEL_ACCESS`: Preview/Staging env vars were not changed; Production env vars remain untouched.

## NEXT_CODEX_PROMPT

Continue in `C:\CODEX-expressjobs-repo` on branch `codex/google-oauth-account-separation-only`.

Mode: `EXPRESSJOBS_GOOGLE_OAUTH_PROVIDER_MANUAL_CONFIG_AND_PREVIEW_SMOKE`.

Objective: after a human creates the project-owned Google OAuth Web Client and securely loads Client ID/Secret into Supabase Authentication > Providers > Google for project `gnsfyvsodslnehszanra`, enable Google only in Vercel Preview/Staging and smoke the full Google login flow.

Rules: keep `PRODUCTION_STATUS=NO-GO_PRODUCTION`; do not use `vercel --prod`; do not use `vercel promote`; do not modify Vercel Production env vars; do not print secrets; do not commit `.env`; do not use service-role in client code; do not relax RLS; do not run SQL or migrations unless a later prompt explicitly authorizes a staging-only migration.

Tasks: confirm clean repo and branch; confirm `supabase/.temp/project-ref` is still ignored and equals `gnsfyvsodslnehszanra`; confirm Google Cloud has the exact authorized redirect URI `https://gnsfyvsodslnehszanra.supabase.co/auth/v1/callback`; confirm Preview/Staging has `NEXT_PUBLIC_ENABLE_GOOGLE_LOGIN=true` and `NEXT_PUBLIC_APP_URL=<preview/staging estable>` without touching Production; run `/auth -> Google -> Supabase callback -> /role` smoke with a human-controlled staging/test Google account; update director docs and cycle report.

Checks: `npm run secret:scan`; `npm run staging:check`; `npm run production:check`; `npm run guard:no-production-deploy`; `npm run lint`; `npm run typecheck`; `npm run test`; `npm run build`; `git diff --check`; browser smoke for `/auth` and Google callback if human login is available.

GO/NO-GO: GO only for controlled Preview/Staging Google OAuth if callback returns to `/role` without errors and all checks pass. Production remains `NO-GO_PRODUCTION` regardless of Preview result.

Documentation to update: `docs/EXPRESSJOBS_DIRECTOR_STATUS.md`, `docs/expressjobs-director-status.json`, and a new `docs/autonomous-cycles/` report.
