# ExpressJobs Google Auth Invalid Client Secret

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

- `GOOGLE_LOGIN=BLOCKED_PROVIDER_CONFIG_INVALID_CLIENT_SECRET`
- `GOOGLE_AUTH_SMOKE=BLOCKED_PROVIDER_CONFIG_INVALID_CLIENT_SECRET`
- `REDIRECT_URI_MISMATCH_RESOLVED=yes`
- `CALLBACK_REACHED=yes`
- `SESSION_CREATED=no`
- `FACEBOOK_LOGIN=CONFIG_PENDING`
- `INSTAGRAM_LOGIN=RESEARCH_PENDING`

## Evidence

Supabase Auth log classification:

```text
oauth2 invalid_client: The provided client secret is invalid.
```

Sanitized request facts:

- Component: Supabase Auth API.
- Path: `/callback`.
- Method: `GET`.
- Result: code exchange failed before session creation.
- No OAuth Client Secret, tokens, cookies, or user IDs are recorded in this repo.

## Interpretation

The Google OAuth redirect configuration is now past the previous `redirect_uri_mismatch` blocker. The flow reached Supabase Auth callback, but Supabase could not exchange the external Google code because the Google Client Secret configured in Supabase Auth Provider is invalid.

This is not a frontend code issue and does not require a Vercel Production change.

## Required Human Fix

In Supabase Dashboard for staging project `gnsfyvsodslnehszanra`:

1. Open Authentication.
2. Open Providers.
3. Open Google.
4. Replace the Google Client Secret with the current secret from the exact Google OAuth Web Client being used.
5. Confirm the Google Client ID also belongs to that same OAuth Web Client.
6. Save provider settings.
7. Do not paste the Client Secret into chat, git, docs, screenshots, logs, or frontend code.

In Google Cloud:

1. Confirm the OAuth Client type is Web application.
2. Confirm the authorized redirect URI remains:
   `https://gnsfyvsodslnehszanra.supabase.co/auth/v1/callback`
3. If the old secret was exposed or uncertain, rotate it and paste only the new secret into Supabase Dashboard.

## Re-test

After the human fix, repeat Google Auth Preview smoke:

- `/auth` loads with protected Preview access.
- Google button visible.
- OAuth redirect starts.
- Supabase callback exchanges code successfully.
- Session created.
- Final redirect reaches the expected app route.
- Default profile is created or present with safe non-admin role.
