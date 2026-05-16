# ExpressJobs Social Auth Security

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Security Position

- Social auth Phase 1 is code-ready only.
- Google and Facebook providers require manual configuration.
- Provider client secrets must remain outside git and frontend code.
- Production remains `NO-GO_PRODUCTION`.

## Admin Protection

Public OAuth must never assign `admin`.

Allowed default:

```text
role=client
```

Disallowed sources for admin:

- OAuth user metadata.
- Frontend buttons.
- Query params.
- Local storage.
- User-editable profile fields.

Admin remains controlled by secure server/admin operations and validated app metadata or existing protected workflows.

## Worker Protection

OAuth users do not become workers automatically. A user must complete worker onboarding/profile requirements before operating as a worker.

## Callback Safety

The callback route:

- exchanges the OAuth code server-side;
- redirects safely on provider/config/exchange errors;
- creates a default profile only after Supabase confirms the authenticated user;
- does not persist provider tokens;
- does not expose secrets in responses.

## Feature Flag Safety

All social login flags default to false:

```env
NEXT_PUBLIC_ENABLE_GOOGLE_LOGIN=false
NEXT_PUBLIC_ENABLE_FACEBOOK_LOGIN=false
NEXT_PUBLIC_ENABLE_INSTAGRAM_LOGIN=false
```

Buttons are hidden when flags are false. If flags are enabled before Supabase public config exists, buttons are disabled.

## Verification

Required before any tester uses social auth:

- `npm run secret:scan`
- `npm run staging:check`
- `npm run test:rls:static`
- `npm run rls:smoke`
- `/auth` browser smoke in protected Preview
- Supabase provider dashboard verification
