# ExpressJobs Google Auth Invalid Client Secret Fix Verify

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

- `GOOGLE_AUTH_SMOKE=READY_FOR_HUMAN_BROWSER_TEST`
- `INVALID_CLIENT_SECRET_RESOLVED=unknown`
- `CALLBACK_REACHED=no`
- `SESSION_CREATED=not_tested`
- `PROFILE_CREATED_OR_PRESENT=unknown`
- `DEFAULT_ROLE=unknown`
- `FACEBOOK_LOGIN=CONFIG_PENDING`
- `INSTAGRAM_LOGIN=RESEARCH_PENDING`

## What Was Verified By Codex

- Protected Preview `/auth` loads.
- Google button is visible.
- Facebook button is not visible.
- Instagram button is not visible.
- Google OAuth redirect starts.
- Browser reaches Google's sign-in screen.
- No production deploy or promotion was used.
- No secrets, tokens, cookies, user IDs, auth codes, or account details were printed.

## What Was Not Verified

Codex did not complete Google sign-in because that requires a human-controlled staging/test Google account. Therefore Codex did not reach the Supabase callback after the latest Client Secret correction and cannot prove session creation yet.

The previous `invalid_client` error can only be verified after completing Google login and allowing Supabase Auth to exchange the external code.

## Next Human Verification

Use the protected Preview:

```text
https://codex-expressjobs-f2mj43l8n-akuma424-projects.vercel.app/auth
```

Then:

1. Use the confirmed staging/test Google account only.
2. Click `Continue with Google`.
3. Complete Google login.
4. Confirm whether the app returns from Supabase callback.
5. Report only sanitized results:
   - `CALLBACK_REACHED=yes/no`
   - `SESSION_CREATED=yes/no`
   - `FINAL_REDIRECT=[route only]`
   - `PROFILE_CREATED_OR_PRESENT=yes/no/unknown`
   - `DEFAULT_ROLE=client/onboarding_pending/unknown`
   - `ERROR_VISIBLE=[sanitized error only]`

Do not share tokens, cookies, auth codes, user IDs, Google account details, or secrets.
