# ExpressJobs Google Auth Supabase Checklist

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

- `GOOGLE_AUTH_SUPABASE=PASS`
- `GOOGLE_AUTH_SMOKE=PASS`
- `CALLBACK_REACHED=yes`
- `SESSION_CREATED=yes`
- `PROFILE_CREATED_OR_PRESENT=yes`
- `FINAL_REDIRECT=/role`
- `DEFAULT_ROLE=client`

## Verified

- Google button is visible in Preview.
- Facebook and Instagram remain disabled.
- OAuth `redirect_to` uses the current Preview origin, not localhost.
- Supabase callback exchanges the code for a session.
- The callback creates or finds `ej_profiles`.
- Public OAuth assigns safe default role only.
- Admin cannot be self-assigned through public OAuth.
- Production callback is documented but not activated for public production.

## Production Note

Future production callback URLs must be configured only after human approval:

- Supabase Auth Site URL production value.
- Supabase Auth Redirect URL production value.
- Google Cloud authorized JavaScript origin.
- Google Cloud authorized redirect URI remains the Supabase Auth callback.

No production callback activation is approved in this cycle.
