# ExpressJobs Release Gate

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Required Before Preview

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`
- `npm run secret:scan`
- `git diff --check`

## Required Before Staging Sign-Off

- Staging Supabase migration applied.
- RLS tested with client, worker, and admin users.
- Auth flow tested.
- Job workflow tested end-to-end.
- WhatsApp share smoke tested.

## Required Before Production

Production remains blocked until security, legal, payments, monitoring, support, and rollback gates are complete.
