# ExpressJobs User Flows

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Public

1. User opens `/`.
2. User chooses `Buscar trabajos`, `Publicar un trabajo`, `Ingresar / Crear cuenta`, or `Ver ofertas piloto`.
3. `/jobs` lists published/open jobs from Supabase when configured.
4. `/jobs/[id]` shows the job detail and application form.

## Worker

1. Worker opens `/register` or `/role`.
2. Worker selects `Quiero trabajar`.
3. App calls the safe `ej_set_profile_role('worker')` RPC after authentication.
4. Worker completes `/dashboard/worker/profile`.
5. Worker searches `/jobs` or `/worker/jobs`.
6. Worker applies with a message and optional proposed amount.
7. RLS blocks self-application and foreign application reads.
8. Worker can use `/dashboard/worker/applications` as the application status entry point.

## Client

1. Client opens `/register` or `/role`.
2. Client selects `Quiero contratar/publicar trabajo`.
3. App calls the safe `ej_set_profile_role('client')` RPC after authentication.
4. Client completes `/dashboard/client/profile`.
5. Client publishes at `/dashboard/client/jobs/new` or `/client/jobs/new`.
6. Client sees owned jobs at `/dashboard/client/jobs`.
7. Client manages applications at `/dashboard/client/jobs/[id]/applications`.
8. Accept/reject actions call invoker RPCs and remain protected by RLS.

## Admin

1. Admin uses `/admin`, `/admin/jobs`, or `/admin/users`.
2. Admin capability depends on the secure role source already enforced by RLS hardening.
3. No destructive moderation action was added in this cycle.

## Payments

No live payment flow is active. Pilot pricing and WhatsApp CTAs remain manual. PayPal live and real payments remain off.
