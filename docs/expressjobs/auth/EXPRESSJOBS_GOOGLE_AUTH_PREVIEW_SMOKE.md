# ExpressJobs Google Auth Preview Smoke

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

- `GOOGLE_LOGIN=BLOCKED_MANUAL_LOGIN_REQUIRED`
- `GOOGLE_AUTH_SMOKE=BLOCKED_MANUAL_LOGIN_REQUIRED`
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
- Callback reached: `no`
- Session created: `not_tested`

## Classification

`GOOGLE_AUTH_SMOKE=BLOCKED_MANUAL_LOGIN_REQUIRED`

Reason: Google OAuth starts correctly from the protected Preview and no longer fails with `redirect_uri_mismatch`. The flow now reaches Google's account sign-in screen. Codex did not use a personal Google account or print cookies/tokens, so callback/session validation remains blocked on controlled human login.

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

1. Use a staging/test Google account only.
2. Complete the Google login flow manually in protected Preview.
3. Confirm return to `/auth/callback`.
4. Confirm final redirect and session creation without printing cookies, tokens, user IDs, or personal account details.
5. Keep Facebook disabled.
6. Keep Instagram disabled.
