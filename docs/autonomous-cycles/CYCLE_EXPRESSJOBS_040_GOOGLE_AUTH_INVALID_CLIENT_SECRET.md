# Cycle ExpressJobs 040 Google Auth Invalid Client Secret

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Modo ejecutado

`EXPRESSJOBS_GOOGLE_AUTH_INVALID_CLIENT_SECRET_DIAGNOSIS`

## Trigger

Operator provided a Supabase Auth log showing:

```text
oauth2 invalid_client: The provided client secret is invalid.
```

## Classification

- `GOOGLE_AUTH_SMOKE=BLOCKED_PROVIDER_CONFIG_INVALID_CLIENT_SECRET`
- `REDIRECT_URI_MISMATCH_RESOLVED=yes`
- `CALLBACK_REACHED=yes`
- `SESSION_CREATED=no`
- `PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Decision

Stop before further OAuth smoke until the Google Client Secret in Supabase Auth Provider is corrected. This requires human dashboard access and must not be handled through chat or git.

## Required Human Action

- Replace the Google Client Secret in Supabase Auth Provider with the current secret from the exact Google OAuth Web Client.
- Confirm the Client ID and Client Secret are from the same Google OAuth Web Client.
- Keep Facebook disabled.
- Keep Instagram disabled.
- Keep production blocked.

## Checks

Pending final local hygiene after docs update:

- `npm run secret:scan`
- `git diff --check`

## Proximo modo seguro

`EXPRESSJOBS_GOOGLE_AUTH_CLIENT_SECRET_FIX_VERIFY`
