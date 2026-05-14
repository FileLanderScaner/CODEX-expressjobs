# ExpressJobs Social Auth Plan

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

- `SOCIAL_AUTH_PHASE_1=CODE_READY_PROVIDER_CONFIG_PENDING`
- `GOOGLE_LOGIN=CODE_READY_CONFIG_PENDING`
- `FACEBOOK_LOGIN=CODE_READY_CONFIG_PENDING`
- `INSTAGRAM_LOGIN=RESEARCH_PENDING`
- `PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Phase 1 Scope

Phase 1 prepares the app for Supabase Auth social login through Google and Facebook. It does not activate production providers, does not store client secrets, and does not authorize public launch.

Implemented:

- `/auth` renders Google and Facebook buttons only when feature flags are enabled.
- OAuth provider values are whitelisted to `google` and `facebook`.
- OAuth redirects use `/auth/callback`.
- `/auth/callback` exchanges the OAuth code for a Supabase session.
- New OAuth users get a safe default `ej_profiles.role='client'`.
- Public OAuth cannot assign `admin`.
- Instagram remains a research spike.

## Feature Flags

Defaults are safe and disabled:

```env
NEXT_PUBLIC_ENABLE_GOOGLE_LOGIN=false
NEXT_PUBLIC_ENABLE_FACEBOOK_LOGIN=false
NEXT_PUBLIC_ENABLE_INSTAGRAM_LOGIN=false
```

Use Preview/staging first. Do not enable production until release gates pass.

## Auth Flow

1. User opens `/auth`.
2. If a social flag is true, the corresponding button is visible.
3. Button calls Supabase `signInWithOAuth` with an allowed provider.
4. Supabase redirects back to `${NEXT_PUBLIC_APP_URL}/auth/callback`.
5. Callback exchanges the `code` for a session.
6. Callback upserts a profile with role `client` for new OAuth users.
7. User is redirected to `/role`.

## Role Policy

- `client`: safe default for new public OAuth users.
- `worker`: must be selected/completed through app onboarding/profile flow.
- `admin`: never assigned from public OAuth, user metadata, URL params, or frontend buttons.

## Pending Human Configuration

- Enable Google provider in Supabase Dashboard.
- Enable Facebook provider in Supabase Dashboard.
- Register redirect URLs in Supabase URL Configuration.
- Configure Google OAuth app.
- Configure Meta/Facebook app.
- Keep all client secrets outside git.
