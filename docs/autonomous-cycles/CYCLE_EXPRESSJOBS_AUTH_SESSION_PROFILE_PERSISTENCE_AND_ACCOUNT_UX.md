# Cycle ExpressJobs Auth Session Profile Persistence And Account UX

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

Mode: `EXPRESSJOBS_AUTH_SESSION_PROFILE_PERSISTENCE_AND_ACCOUNT_UX`

## Scope

Close the authenticated-account UX gap after Google OAuth starts successfully: make the app show whether a user is signed in, expose a first-class profile/settings surface, allow safe profile edits, and add logout. This cycle does not run SQL, migrations, production deploys, provider mutations, ownership changes, PayPal live, or real payments.

## Sanitized Human Context

- Google OAuth Web Client: created by human.
- Google Client ID/Secret: loaded manually in Supabase Authentication > Providers > Google by human.
- Test accounts: `TEST_ACCOUNT_A` and `TEST_ACCOUNT_B`.
- No emails, tokens, cookies, auth codes, user IDs, Client ID, or Client Secret were recorded.

## Current Callback Behavior

- `exchangeCodeForSession(code)`: confirmed in `src/app/auth/callback/route.ts`.
- `supabase.auth.getUser()`: confirmed after exchange.
- `ej_profiles` upsert: `id=user.id`, `role=client`, `full_name` from metadata or fallback.
- Existing profiles: preserved by `ignoreDuplicates: true`.
- Profile setup failure: redirects to `/auth?oauth_error=profile_setup_failed`.
- Success redirect: `/role` unless a safe relative `next` path exists.

## Supabase Read-Only Status

- Project: `gnsfyvsodslnehszanra`
- Name: `supabase-expressjobs`
- Status: `ACTIVE_HEALTHY`
- Branches: `main` plus `codex/google-oauth-account-separation-only`
- New Supabase branch: not created
- Reason: `SUPABASE_BRANCH_NOT_REQUIRED_NO_SUPABASE_DIFF`
- TEST_ACCOUNT_A/B Auth user/profile read: `SUPABASE_READONLY_USER_CHECK_BLOCKED_NO_SAFE_AUTH_USER_QUERY_TOOL`

## Implemented UX

- Added `src/lib/account.ts` server-side helpers:
  - `getCurrentUser()`
  - `getCurrentProfile()`
  - `requireUser()`
  - `requireProfile()`
  - `getDisplayName()`
  - `getAccountNavState()`
- Header now shows `Ingresar` when signed out.
- Header/nav shows `Mi cuenta` only when a session is detected.
- Added `/profile`.
- `/profile` shows session state, role, login provider label, profile creation date, dashboard CTA, safe editable fields, and logout.
- Safe profile edits: `full_name`, `phone`, `city`.
- Direct role editing: not exposed.
- Logout: `supabase.auth.signOut()` then redirect to `/auth`.
- Server role API no longer logs full user IDs on failures.

## Preview Smoke

- Preview URL: `https://codex-expressjobs-9dxdkmep3-akuma424-projects.vercel.app`
- Deployment: `dpl_2yo2rHmzBnCM1uDXhpWZWja5sc5m`
- Target: `preview`
- Status: `Ready`

Browser smoke:

- `/auth`: PASS, signed-out 200
- `/register`: PASS, signed-out 200
- `/role`: PASS, signed-out 200
- `/profile`: PASS, signed-out 200 with clear signed-out state
- `/dashboard/client`: PASS, signed-out 200
- Google button: visible
- Facebook button: hidden
- Google click: reaches `accounts.google.com`
- Supabase callback reference: `https://gnsfyvsodslnehszanra.supabase.co/auth/v1/callback`
- Secret-like text on checked pages: not found

Blocked live checks:

- `SESSION_CREATED`
- `SESSION_PERSISTS_AFTER_REFRESH`
- `SESSION_PERSISTS_AFTER_BROWSER_REOPEN`
- `SESSION_RECOGNIZES_EXISTING_USER`
- `PROFILE_REUSED_NOT_RECREATED`
- `LOGOUT`

Reason: `BLOCKED_EXTERNAL_CREDENTIALS_HUMAN_GOOGLE_LOGIN_REQUIRED`.

## Checks

| Check | Result |
| --- | --- |
| `git status --short` | PASS, clean before changes |
| `git branch --show-current` | PASS, `codex/google-oauth-account-separation-only` |
| `git log --oneline -5` | PASS |
| `git remote -v` | PASS, `origin` present; `neworigin` observed and not used |
| Supabase MCP project list | PASS |
| Supabase MCP branch list | PASS |
| `npm run secret:scan` | PASS |
| `npm run production:check` | PASS, `PRODUCTION_STATUS=NO-GO_PRODUCTION` |
| `npm run guard:no-production-deploy` | PASS |
| `npm run staging:check` | PASS |
| `npm run test:rls:static` | PASS, 1 file / 12 tests |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm run test` | PASS, 10 files / 59 tests |
| `npm run build` | PASS |
| Preview browser smoke | PASS signed-out and Google start |
| director JSON parse | PASS |
| `git diff --check` | PASS |

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

## Blockers

- `BLOCKED_EXTERNAL_CREDENTIALS`: final TEST_ACCOUNT_A/B session persistence, profile reuse, and logout proof require human-controlled Google staging/test login. Do not paste emails, credentials, cookies, tokens, auth codes, user IDs, Client ID, or Client Secret.

## NEXT_CODEX_PROMPT

Continue in `C:\CODEX-expressjobs-repo` on branch `codex/google-oauth-account-separation-only`.

Mode: `EXPRESSJOBS_HUMAN_AUTH_SESSION_PERSISTENCE_VERIFY`.

Objective: verify the final human Google login persistence flow on Preview `https://codex-expressjobs-9dxdkmep3-akuma424-projects.vercel.app` without exposing PII or secrets.

Rules: keep `PRODUCTION_STATUS=NO-GO_PRODUCTION`; do not use `vercel --prod`; do not use `vercel promote`; do not modify Vercel Production env vars; do not print secrets or PII; do not run SQL or migrations; do not use service role in client; do not relax RLS.

Tasks: using TEST_ACCOUNT_A, complete `/auth -> Google -> /auth/callback -> /role`; open `/profile`; confirm profile state; refresh; close/reopen Preview; confirm session still detected; logout; confirm signed-out state. Repeat only the minimal sanity path with TEST_ACCOUNT_B if needed. Record only PASS/FAIL labels and visible non-secret errors.

Checks: `npm run secret:scan`; `npm run production:check`; `npm run guard:no-production-deploy`; `npm run staging:check`; `git diff --check`; JSON parse if JSON changes. Run lint/typecheck/test/build only if code changes.

GO/NO-GO: GO for Preview/Staging only if session persists, profile is reused, account nav/profile are visible, logout clears session, and no secrets/PII are exposed. Production remains `NO-GO_PRODUCTION`.
