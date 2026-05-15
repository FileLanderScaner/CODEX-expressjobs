# ExpressJobs Auth Security Review

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

`AUTH_SECURITY=PASS`

## Findings

- Google OAuth Preview is already verified as `PASS`.
- OAuth redirects use the active browser origin in Preview and `/auth/callback`.
- The callback exchanges the OAuth code with Supabase server-side.
- New OAuth profiles use default role `client`.
- Public OAuth cannot assign `admin`.
- Callback errors redirect to `/auth?oauth_error=...` without crashing.
- Facebook remains config-pending and is not approved for production.
- Instagram remains research-only and is not an allowed provider.

## Evidence

- `src/lib/social-auth.ts`
- `src/app/auth/callback/route.ts`
- `src/components/social-auth-buttons.tsx`
- `src/__tests__/social-auth.test.ts`

## Residual Risk

`AUTH_PRODUCTION_CALLBACK_NOT_APPROVED`

Production callback URLs are documented for future configuration, but production remains `NO-GO_PRODUCTION`.
