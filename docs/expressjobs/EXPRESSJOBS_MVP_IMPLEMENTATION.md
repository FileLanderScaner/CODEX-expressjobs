# ExpressJobs MVP Implementation

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Scope Implemented

The MVP foundation now includes usable routes, domain components, service boundaries, Supabase-ready schema/RLS, tracking fallback, and documentation for QA and release gates.

## Routes

- `/`
- `/auth`
- `/onboarding`
- `/client`
- `/client/jobs/new`
- `/client/jobs/[id]`
- `/worker`
- `/worker/jobs`
- `/worker/jobs/[id]`
- `/admin`
- `/pricing`
- `/terms`
- `/privacy`

Legacy compatibility routes remain:

- `/role`
- `/jobs/open`
- `/jobs/new`
- `/jobs/tracking`
- `/dashboard/client`
- `/dashboard/worker`

## Components

- `RoleSelector`
- `JobCard`
- `JobForm`
- `JobStatusBadge`
- `ApplicationCard`
- `ChatBox`
- `ReviewForm`
- `TrustSafetyNotice`
- `EmptyState`
- `LoadingState`
- `ErrorState`
- `PricingCard`
- `WhatsAppShareButton`

## Services

- `auth-service`
- `profiles-service`
- `jobs-service`
- `applications-service`
- `messages-service`
- `reviews-service`
- `tracking-service`
- `admin-service`

## Backend Mode

The frontend is usable with local demo fallback data. Supabase integration is prepared but requires external staging credentials before live data flows can be tested.

No production database was touched.
