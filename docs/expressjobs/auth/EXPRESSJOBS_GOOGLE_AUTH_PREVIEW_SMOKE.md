# ExpressJobs Google Auth Preview Smoke

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

- `GOOGLE_LOGIN=BLOCKED_PROVIDER_CONFIG`
- `GOOGLE_AUTH_SMOKE=BLOCKED_PROVIDER_CONFIG`
- `FACEBOOK_LOGIN=CONFIG_PENDING`
- `INSTAGRAM_LOGIN=RESEARCH_PENDING`
- `PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Preview Deployment

- Preview URL tested: `https://codex-expressjobs-f2mj43l8n-akuma424-projects.vercel.app`
- Deployment: `dpl_2qvWaFzKKu7QYJ2qJagFvChVQCLF`
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
- Final host class: Google.
- Final path: `/signin/oauth/error`
- Error class: `redirect_uri_mismatch`
- Callback reached: `no`
- Session created: `not_tested`

## Classification

`GOOGLE_AUTH_SMOKE=BLOCKED_PROVIDER_CONFIG`

Reason: Google OAuth starts correctly from the protected Preview, but Google rejects the request with `redirect_uri_mismatch`. This indicates the Google OAuth client authorized redirect URI does not match the Supabase callback URL being used for the provider.

Expected Google authorized redirect URI:

```text
https://gnsfyvsodslnehszanra.supabase.co/auth/v1/callback
```

Also keep the Supabase Auth URL Configuration aligned with the Preview app URL:

```text
https://codex-expressjobs-f2mj43l8n-akuma424-projects.vercel.app/auth/callback
```

Do not include Vercel bypass query parameters in any redirect URL.

## Required Human Fix

1. In Google Cloud OAuth client, add or correct the authorized redirect URI:
   `https://gnsfyvsodslnehszanra.supabase.co/auth/v1/callback`
2. In Supabase Auth URL Configuration, confirm the new Preview callback is allowed:
   `https://codex-expressjobs-f2mj43l8n-akuma424-projects.vercel.app/auth/callback`
3. Keep Facebook disabled.
4. Keep Instagram disabled.
5. Re-run the Google Auth Preview smoke.
