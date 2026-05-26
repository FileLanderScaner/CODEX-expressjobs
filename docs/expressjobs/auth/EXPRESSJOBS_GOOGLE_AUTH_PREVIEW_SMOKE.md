# ExpressJobs Google Auth Preview Smoke

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

- `GOOGLE_LOGIN=PREVIEW_SMOKE_PASS`
- `GOOGLE_AUTH_SMOKE=PASS`
- `FACEBOOK_LOGIN=CONFIG_PENDING`
- `INSTAGRAM_LOGIN=RESEARCH_PENDING`
- `PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Preview Deployment

- Preview URL tested: `https://codex-expressjobs-egq4jtl0u-akuma424-projects.vercel.app`
- Deployment: `dpl_FKaLgBpQHbzjYHvTiVmz8puyGRGy`
- Vercel target: `preview`
- Status: `READY`
- Vercel Production touched: `false`

The previous fixed Preview URL did not include the social-auth build/feature flag state, so a new Preview deployment was created without `--prod` and without `vercel promote`.

## Preview Env Adjustment

Preview-only branch env values were set for branch `codex/expressjobs-autonomous-bootstrap`:

- `NEXT_PUBLIC_ENABLE_GOOGLE_LOGIN=true`
- `NEXT_PUBLIC_ENABLE_FACEBOOK_LOGIN=false`
- `NEXT_PUBLIC_ENABLE_INSTAGRAM_LOGIN=false`

These are public feature flags only. No OAuth client secret was stored or printed.

## HTTP Smoke

- `/auth` with `x-vercel-protection-bypass` header: HTTP 200
- `GOOGLE_BUTTON_VISIBLE=yes`
- `FACEBOOK_BUTTON_VISIBLE=no`
- `INSTAGRAM_BUTTON_VISIBLE=no`
- `HAS_BYPASS_TOKEN_IN_HTML=false`
- `PAYMENTS_LIVE=OFF`
- `AI_AGENTS_PRODUCTION=OFF`

## OAuth Smoke

- Google button click: started OAuth redirect.
- OAuth `redirect_to` host class: `current_preview`
- OAuth `redirect_to` path: `/auth/callback`
- OAuth `redirect_to` fixed: `yes`
- Final host class: Google.
- Final path: `/v3/signin/identifier`
- Error class: `none`
- Redirect URI mismatch resolved: yes.
- Callback reached: `yes`
- Session created: `yes`
- Profile created or present: `yes`
- Final redirect: `/role`
- Test account authorization: confirmed by operator; account value intentionally not recorded in git.
- Latest Client Secret fix verification: passed by human browser verification.

## Classification

`GOOGLE_AUTH_SMOKE=PASS`

Reason: Google OAuth starts correctly from the protected Preview, sends the active Preview host as `redirect_to`, returns to the app callback, creates a session, creates or finds the safe default profile, and redirects to `/role`.

Confirmed Google authorized redirect URI requirement:

```text
https://gnsfyvsodslnehszanra.supabase.co/auth/v1/callback
```

Also keep the Supabase Auth URL Configuration aligned with the Preview app URL:

```text
https://codex-expressjobs-egq4jtl0u-akuma424-projects.vercel.app/auth/callback
```

Do not include Vercel bypass query parameters in any redirect URL.

## Human Verification Completed

The operator completed the browser login flow and reached `/role`. No tokens, cookies, auth codes, user IDs, account details, or secrets were recorded.

Keep Facebook disabled and Instagram disabled until their separate provider gates are executed.

## Account UX Follow-Up

Latest account UX Preview:

```text
https://codex-expressjobs-1x2o220r5-akuma424-projects.vercel.app
```

Added after the original Google smoke:

- Conditional header account state: signed out shows `Ingresar`; signed in shows `Mi cuenta`.
- New `/profile` route for session state, profile fields, dashboard CTA, and logout.
- Safe profile edits are limited to `full_name`, `phone`, and `city`.
- Direct role editing is not exposed on `/profile`.
- Logout uses Supabase browser sign-out and returns to `/auth`.

Codex validated signed-out routes and Google start again. TEST_ACCOUNT_A/B persistence after human Google login remains pending because Codex must not receive test emails, cookies, tokens, auth codes, user IDs, Client ID, or Client Secret.
