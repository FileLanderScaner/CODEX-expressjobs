# ExpressJobs Facebook OAuth Setup

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

`FACEBOOK_LOGIN=CODE_READY_CONFIG_PENDING`

The app code is ready for Facebook OAuth in Preview/staging, but the Facebook provider must be configured manually before use.

## Required Dashboard Configuration

In Supabase Dashboard:

1. Open Authentication.
2. Open Providers.
3. Enable Facebook.
4. Enter Facebook App ID.
5. Enter Facebook App Secret.
6. Save provider configuration.

Do not store the Facebook App Secret in git, `.env.example`, screenshots, logs, or client code.

## App Feature Flag

Enable only in a safe Preview/staging environment after provider configuration:

```env
NEXT_PUBLIC_ENABLE_FACEBOOK_LOGIN=true
```

Default remains:

```env
NEXT_PUBLIC_ENABLE_FACEBOOK_LOGIN=false
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

## Security Notes

- Public Facebook OAuth must not create admin users.
- New Facebook OAuth users default to `client`.
- Workers must complete profile/onboarding before operating as workers.
- Any Meta app review or permission expansion must be documented before launch.
