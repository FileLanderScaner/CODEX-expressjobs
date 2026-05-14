# ExpressJobs Google Auth Preview Smoke

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

- `GOOGLE_LOGIN=BLOCKED_PROVIDER_CONFIG_INVALID_CLIENT_SECRET`
- `GOOGLE_AUTH_SMOKE=BLOCKED_PROVIDER_CONFIG_INVALID_CLIENT_SECRET`
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
- Final path: `/v3/signin/identifier`
- Error class: `manual_google_login_required`
- Redirect URI mismatch resolved: yes.
- Callback reached: `yes`
- Session created: `no`
- Test account authorization: confirmed by operator; account value intentionally not recorded in git.
- Supabase Auth exchange error: `invalid_client`, Google Client Secret invalid.

## Classification

`GOOGLE_AUTH_SMOKE=BLOCKED_PROVIDER_CONFIG_INVALID_CLIENT_SECRET`

Reason: Google OAuth starts correctly from the protected Preview, no longer fails with `redirect_uri_mismatch`, and reaches Supabase Auth callback. Supabase fails the external code exchange because the Google Client Secret configured in Supabase is invalid. This requires correcting the Google provider secret in Supabase Dashboard.

Confirmed Google authorized redirect URI requirement:

```text
https://gnsfyvsodslnehszanra.supabase.co/auth/v1/callback
```

Also keep the Supabase Auth URL Configuration aligned with the Preview app URL:

```text
https://codex-expressjobs-f2mj43l8n-akuma424-projects.vercel.app/auth/callback
```

Do not include Vercel bypass query parameters in any redirect URL.

## Required Human Next Step

1. Replace the Google Client Secret in Supabase Auth Provider with the current secret from the exact Google OAuth Web Client.
2. Confirm the Google Client ID and Secret belong to the same OAuth Web Client.
3. Do not paste the Client Secret into chat, git, docs, screenshots, logs, or frontend code.
4. Keep Facebook disabled.
5. Keep Instagram disabled.
6. Re-run Google Auth Preview smoke.
