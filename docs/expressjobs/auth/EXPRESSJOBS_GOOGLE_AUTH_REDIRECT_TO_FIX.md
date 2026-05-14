# ExpressJobs Google Auth Redirect To Fix

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

- `GOOGLE_AUTH_REDIRECT_TO_FIX=APPLIED`
- `OAUTH_REDIRECT_TO_FIXED=yes`
- `GOOGLE_AUTH_SMOKE=READY_FOR_HUMAN_BROWSER_TEST`
- `PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Root Cause

The Preview Google OAuth request was sending `redirect_to` to the local fallback app URL instead of the deployed Preview origin. That meant the OAuth provider flow could start, but the app callback/session verification was not tied to the active Vercel Preview host.

## Fix

The OAuth helper now uses the browser origin when running in the browser and falls back to the configured app URL only outside the browser.

Safe behavior:

- Browser Preview flow: `https://[preview-host]/auth/callback`
- Non-browser/server fallback: configured `NEXT_PUBLIC_APP_URL`
- Provider whitelist remains limited to Google and Facebook.
- Public OAuth cannot assign admin role.

## Verification

Preview tested:

```text
https://codex-expressjobs-egq4jtl0u-akuma424-projects.vercel.app
```

Deployment:

```text
dpl_FKaLgBpQHbzjYHvTiVmz8puyGRGy
```

Vercel target:

```text
preview
```

Results:

- `/auth` with protected Preview bypass header: `PASS`
- `GOOGLE_BUTTON_VISIBLE=yes`
- `FACEBOOK_BUTTON_VISIBLE=no`
- `INSTAGRAM_BUTTON_VISIBLE=no`
- `OAUTH_REDIRECT_STARTED=yes`
- `OAUTH_REDIRECT_TO_HOST_CLASS=current_preview`
- `OAUTH_REDIRECT_TO_PATH=/auth/callback`
- `OAUTH_REDIRECT_TO_FIXED=yes`
- `GOOGLE_SCREEN_OR_PROVIDER_REDIRECT_REACHED=yes`

The bypass secret was not printed and no bypass URL was logged.

## Notes

The only console issue observed during automated Preview testing was a Vercel Live feedback script blocked by the app Content Security Policy. It is not part of ExpressJobs Google OAuth, Supabase Auth, payments, RLS, or the application login path.

## Remaining Human Step

Complete Google login manually using only the staging/test account and report sanitized callback/session status:

- `CALLBACK_REACHED=yes/no`
- `SESSION_CREATED=yes/no`
- `PROFILE_CREATED_OR_PRESENT=yes/no/unknown`
- `FINAL_REDIRECT=[route only]`

Do not paste tokens, cookies, auth codes, user IDs, account details, or secrets.
