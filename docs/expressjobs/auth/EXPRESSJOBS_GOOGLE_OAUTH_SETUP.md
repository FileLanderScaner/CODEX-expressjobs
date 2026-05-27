# ExpressJobs Google OAuth Setup

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

`GOOGLE_LOGIN=CODE_READY_OFFICIAL_ACCOUNT_CONFIG_PENDING`

The app code is ready for Google OAuth in Preview/staging, but the Google provider must be configured manually before use. The official project Google account for new OAuth setup is `expressjobs.uy@gmail.com`.

Inactive OAuth buttons must not be rendered as dead actions. If `NEXT_PUBLIC_ENABLE_GOOGLE_LOGIN=false` or Supabase public auth config is missing, `/auth` shows the email flow plus an inactive-status notice instead of a clickable Google button.

Do not move GitHub, Vercel, Supabase ownership, connected accounts, or project remotes from Codex. This document only prepares the human-controlled Google/Supabase OAuth configuration.

## Required Dashboard Configuration

In Google Cloud Console, signed in as `expressjobs.uy@gmail.com`:

1. Select or create the official ExpressJobs / Trabajos Rapidos project.
2. Configure OAuth consent screen with the official brand/contact data.
3. Create a Web OAuth client for Supabase Auth.
4. Add the Supabase provider callback as the Google authorized redirect URI:

```text
https://gnsfyvsodslnehszanra.supabase.co/auth/v1/callback
```

5. Copy the Client ID and Client Secret only into Supabase Dashboard. Do not paste them into chat, git, docs, screenshots, logs, or frontend code.

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

## Redirect URLs

Google Cloud authorized redirect URI:

```text
https://gnsfyvsodslnehszanra.supabase.co/auth/v1/callback
```

Supabase Auth redirect allow-list entries for app callbacks:

```text
https://[preview-domain]/auth/callback
```

Local development callback shape:

```text
http://localhost:3000/auth/callback
```

Current inspected PR #50 Preview callback shape:

```text
https://codex-expressjobs-git-codex-expressjob-745364-akuma424-projects.vercel.app/auth/callback
```

Future production callback must remain `NO-GO_PRODUCTION` until production release is explicitly approved by a human.

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
