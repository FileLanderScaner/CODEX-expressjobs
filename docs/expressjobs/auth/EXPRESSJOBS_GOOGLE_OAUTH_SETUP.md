# ExpressJobs Google OAuth Setup

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

`GOOGLE_LOGIN=CODE_READY_CONFIG_PENDING`

The app code is ready for Google OAuth in Preview/staging, but the Google provider must be configured manually before use.

## Required Dashboard Configuration

In Supabase Dashboard:

1. Open Authentication.
2. Open Providers.
3. Enable Google.
4. Enter Google Client ID.
5. Enter Google Client Secret.
6. Save provider configuration.

Do not store the Google Client Secret in git, `.env.example`, screenshots, logs, or client code.

## App Feature Flag

Enable only in a safe Preview/staging environment after provider configuration:

```env
NEXT_PUBLIC_ENABLE_GOOGLE_LOGIN=true
```

Default remains:

```env
NEXT_PUBLIC_ENABLE_GOOGLE_LOGIN=false
```

## Redirect URL

Expected callback shape:

```text
https://[preview-domain]/auth/callback
```

Local development callback shape:

```text
http://localhost:3000/auth/callback
```

Future production callback must remain `NO-GO_PRODUCTION` until production release is explicitly approved.

Do not include URLs with `x-vercel-protection-bypass` in provider configuration, docs, or logs.

## Verification

Before tester use:

- `npm run secret:scan`
- `npm run staging:check`
- `npm run test:rls:static`
- `npm run rls:smoke`
- Preview browser smoke on `/auth`

## Security Notes

- OAuth provider tokens must not be persisted in the app database.
- User metadata must not grant admin.
- New Google OAuth users default to `client`.
- Workers must complete profile/onboarding before operating as workers.
