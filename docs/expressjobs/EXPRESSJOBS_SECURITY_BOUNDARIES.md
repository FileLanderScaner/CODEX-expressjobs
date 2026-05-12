# ExpressJobs Security Boundaries

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Hard Rules

- No production deployment.
- No Vercel production promote.
- No live payment activation.
- No service role key in browser code.
- No RLS disablement.
- No AhorroYA data model reuse.

## Environment Boundaries

- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` may be public.
- `SUPABASE_SERVICE_ROLE_KEY` is server-only and not needed for this client MVP.
- `ENABLE_PAYMENTS=false`.
- `ENABLE_AI_AGENTS=false`.
- `AI_KILL_SWITCH=true`.
- `ENABLE_ADMIN_PANEL=false` until protected routes exist.

## Authorization Source

Role authorization is stored in `ej_profiles.role`, not user-editable metadata.
