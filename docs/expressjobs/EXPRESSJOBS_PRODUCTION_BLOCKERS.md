# ExpressJobs Production Blockers

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Blocking Items

- Supabase staging project not configured in this environment.
- Live RLS smoke tests not executed.
- Vercel Preview env vars and access not available.
- Auth flows are not verified against staging.
- Realtime/chat is not verified against staging.
- Payment provider is intentionally disabled.
- Admin panel has no destructive actions and is not production-ready.
- Monitoring, support, rollback, legal, and abuse workflows are incomplete.

## Release Rule

Production remains blocked until every staging gate passes and a separate production go/no-go review approves release.
