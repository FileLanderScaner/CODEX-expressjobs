# ExpressJobs Google Auth Preview Smoke

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

- `GOOGLE_LOGIN=READY_FOR_HUMAN_BROWSER_TEST`
- `GOOGLE_AUTH_SMOKE=READY_FOR_HUMAN_BROWSER_TEST`
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
- Error class: `manual_google_login_required`
- Redirect URI mismatch resolved: yes.
- Callback reached: `no`
- Session created: `not_tested`
- Test account authorization: confirmed by operator; account value intentionally not recorded in git.
- Latest Client Secret fix verification: blocked until human completes Google login.

## Classification

`GOOGLE_AUTH_SMOKE=READY_FOR_HUMAN_BROWSER_TEST`

Reason: Google OAuth starts correctly from the protected Preview, now sends the active Preview host as `redirect_to`, and reaches Google's sign-in screen. The operator reports the Google Client Secret was corrected in Supabase. Codex cannot prove code exchange/session creation without completing human Google login, so the smoke remains ready for a human browser test.

Confirmed Google authorized redirect URI requirement:

```text
https://gnsfyvsodslnehszanra.supabase.co/auth/v1/callback
```

Also keep the Supabase Auth URL Configuration aligned with the Preview app URL:

```text
https://codex-expressjobs-egq4jtl0u-akuma424-projects.vercel.app/auth/callback
```

Do not include Vercel bypass query parameters in any redirect URL.

## Required Human Next Step

1. Complete Google login using only the staging/test Google account.
2. Report only sanitized callback/session status.
3. Do not paste tokens, cookies, auth codes, user IDs, account details, or secrets.
4. Keep Facebook disabled.
5. Keep Instagram disabled.
