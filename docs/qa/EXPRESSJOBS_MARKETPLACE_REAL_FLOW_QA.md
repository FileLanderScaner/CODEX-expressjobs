# ExpressJobs Marketplace Real Flow QA

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## RLS

- `npm run test:rls:static`: PASS.
- `npm run rls:smoke`: PASS with `EXPRESSJOBS_RLS_STAGING_PASS`.

## Local Browser/HTTP Flow

- Public routes load.
- Auth/login route loads.
- Anonymous dashboard access redirects to auth.
- Confirmed cookie-based client/worker browser session was not completed in this cycle.

## Marketplace Status

`MARKETPLACE_FLOW=PARTIAL`

Validated:

- Anonymized public navigation.
- Auth gate for private dashboard.
- Static and real RLS smoke.
- API validation failures are handled without stack traces.
- Vercel Preview exists but public smoke is protected by Vercel Authentication.

Pending:

- Client creates job through browser session.
- Worker applies through browser session.
- Client accepts application through browser session.
- Accepted-job chat through browser session.

These require confirmed test sessions or Preview authentication flow.
