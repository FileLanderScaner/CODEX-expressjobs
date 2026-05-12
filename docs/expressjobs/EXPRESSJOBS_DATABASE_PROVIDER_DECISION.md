# ExpressJobs Database Provider Decision

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

Date: 2026-05-12

## Decision

Use **Supabase for the ExpressJobs MVP**.

Do not use Neon as the primary MVP database only because it is available. Neon remains a strong candidate for **future staging and preview branch testing** if ExpressJobs needs isolated database branches per Vercel preview deployment.

Initial choice:

- Primary MVP path: **A) Supabase existing account, but with a separate ExpressJobs project/schema and `ej_*` tables**
- Future option: **D) Supabase for MVP and Neon for staging/branch testing**, only after the Supabase MVP workflow is stable
- Fallback: **C) Supabase Auth + Neon Postgres**, only if Supabase Postgres becomes blocked but Supabase Auth remains useful

## Source Notes

This decision uses current official provider docs:

- Supabase Auth integrates JWT-based Auth with database RLS and Supabase client requests.
- Supabase Realtime supports Broadcast, Presence, and Postgres Changes, which are useful for basic chat and participant state.
- Neon supports Postgres branching, scale-to-zero, Vercel preview database branches, Data API, Neon Auth, and Postgres RLS patterns.

References:

- https://supabase.com/docs/guides/auth
- https://supabase.com/docs/guides/realtime
- https://neon.com/docs/conceptual-guides/branching/
- https://neon.com/docs/guides/vercel/
- https://neon.com/docs/guides/row-level-security
- https://neon.com/docs/introduction/scale-to-zero

## Comparison

| Criterion | Supabase | Neon Postgres |
| --- | --- | --- |
| Rapidez para MVP | Strong. Auth, RLS, generated API, Realtime, and JS SDK are already close to the current app direction. | Medium. Excellent Postgres, but Auth/chat/API wiring needs more explicit architecture or Neon Data API/Auth setup. |
| Seguridad | Strong if ExpressJobs uses a separate project and strict RLS. Main risk is accidental exposure through Data API grants or weak policies. | Strong Postgres base. RLS is available, and Neon Data API/RLS can enforce JWT-based row access, but setup is newer and more moving parts for this MVP. |
| RLS | First-class Supabase pattern with `auth.uid()` and direct integration with Supabase Auth. | Native Postgres RLS plus Neon Data API/JWT helpers. Strong, but policy shape differs from current Supabase migration. |
| Auth | Built in and aligned with current `@supabase/ssr` dependency. | Neon Auth exists, and third-party Auth can work, but adopting it now would slow the MVP and require new auth decisions. |
| Realtime/chat | Built in through Supabase Realtime for Broadcast, Presence, and Postgres Changes. | Not a direct equivalent. Chat would need polling, custom WebSocket service, Pusher/Ably, or another realtime layer. |
| Vercel deploy | Straightforward env vars and Next.js SDK usage. | Very strong for Vercel preview branch workflows and automatic `DATABASE_URL` injection. |
| Separacion de AhorroYA | Strong if using a new Supabase project or strict `ej_*` tables/schema. Weak if sharing the old AhorroYA project casually. | Strong if using a new Neon project/database. Branching can isolate preview data well. |
| Costo operativo | Good for MVP if usage stays small. Auth/Realtime are included as managed platform features. | Strong for idle and preview workloads due to scale-to-zero and branch cleanup. |
| Complejidad | Low for MVP because Auth/RLS/Realtime are in one platform. | Medium/high for full MVP because Auth, API, RLS claims, and realtime need additional integration choices. |
| Escalabilidad | Good enough for first 100 users and early marketplace validation. | Strong Postgres scaling model, branches, autoscaling, read replicas, and scale-to-zero. |
| Riesgo de mezclar datos | Medium if the existing Supabase project is reused incorrectly. Mitigation: new ExpressJobs project or schema, `ej_*` tables, no AhorroYA migrations. | Low if a new Neon project is created. Higher if connected to unrelated projects without naming/environment discipline. |
| Primeros 100 usuarios | Best fit due to fastest Auth/job/chat/review path. | Useful for test isolation, but slower to reach first users unless team already has Neon Auth/API patterns ready. |

## Option Assessment

### A) Supabase Existing

Recommended for MVP only if ExpressJobs is isolated from AhorroYA by one of these controls:

- Prefer a new Supabase project named for ExpressJobs.
- If a shared Supabase organization is used, keep a dedicated ExpressJobs project or schema/table prefix.
- Keep `ej_*` tables and never reuse AhorroYA tables, migrations, storage buckets, or policies.
- Apply RLS before exposing data to clients.

Why it wins now:

- Fastest path to Auth, RLS, basic data access, and Realtime chat.
- Matches the existing codebase dependency choices.
- Minimizes custom backend work for the first 100 users.

### B) Neon Postgres Existing

Not selected for MVP.

Neon is a strong Postgres provider, especially for isolated branches and Vercel previews. It does not by itself remove the need to decide Auth, API access, JWT/RLS mapping, and chat/realtime infrastructure. For this marketplace MVP, those are central product flows, so using Neon alone now would slow delivery.

### C) Supabase Auth + Neon Postgres

Fallback only.

This can be viable if Supabase Postgres is blocked but Supabase Auth is still desired. The cost is complexity: ExpressJobs would need to validate Supabase JWTs against Neon/Postgres, adapt RLS helper functions, and build its own API layer or use Neon Data API patterns. It also splits operational ownership across two providers before product-market validation.

### D) Supabase For MVP And Neon For Staging/Branch Testing

Good future option, not the initial implementation.

Neon has a clear advantage for Vercel preview branches. If ExpressJobs starts running multiple preview deployments, schema tests, or destructive migration checks, Neon can provide isolated branches with `DATABASE_URL` injection per preview. That benefit is real, but it should be introduced after MVP workflows are stable so the team does not debug two data architectures at once.

### E) Neon Complete With ORM/API Own

Not selected.

This is the most flexible long-term architecture but the slowest path now. It requires choosing and maintaining an ORM/API layer, Auth provider, realtime/chat service, and security model. That is not justified before the first 100 users.

## Recommended Initial Architecture

Use Supabase as the managed backend for the MVP:

- Supabase Auth for signup/login.
- Supabase Postgres with `ej_*` tables.
- Supabase RLS for profile, job, application, message, review, payment-record, and admin-audit access.
- Supabase Realtime for basic chat/presence if staging validation passes.
- Next.js on Vercel Preview/Staging.

Keep production blocked:

- `PRODUCTION_STATUS=NO-GO_PRODUCTION`
- `ENABLE_PAYMENTS=false`
- `ENABLE_AI_AGENTS=false`
- `AI_KILL_SWITCH=true`
- `ENABLE_ADMIN_PANEL=false` until protected.

## Main Reasons

1. The MVP depends on Auth, RLS, and chat-like realtime more than advanced database branching.
2. Supabase gives the shortest safe path to those workflows.
3. The current repo already contains Supabase-oriented migration and client boundaries.
4. Neon has clear value, but mainly for isolated preview/staging workflows and database branching.
5. Adding Neon now would increase integration surface before the product proves demand.

## Risks

| Risk | Provider | Mitigation |
| --- | --- | --- |
| Accidentally mixing AhorroYA and ExpressJobs data | Supabase | Use a separate ExpressJobs Supabase project when possible; otherwise `ej_*` only and explicit migration review. |
| Incorrect RLS exposes jobs/messages | Supabase/Neon | Test with separate client, worker, and admin accounts before staging sign-off. |
| Realtime policies or subscriptions leak participant data | Supabase | Start with conservative message visibility and validate channel access in staging. |
| Supabase project/env unavailable | Supabase | Use Neon fallback only after documenting JWT/RLS/API changes. |
| Neon Auth/Data API maturity or setup friction slows MVP | Neon | Do not adopt as primary MVP path unless Supabase is blocked. |
| Cost surprises from unused preview environments | Neon | If Neon is introduced, enable branch cleanup and scale-to-zero. |

## Future Migration Plan If Changing To Neon

Phase 1: Keep Supabase MVP live in staging only.

- Freeze schema changes.
- Export current `ej_*` schema.
- Map Supabase `auth.uid()` RLS policies to Neon-compatible JWT/RLS helpers.
- Decide Auth: Neon Auth, Supabase Auth with JWT validation, or third-party provider.
- Decide API layer: Neon Data API, server-only Next.js route handlers, or ORM.

Phase 2: Build Neon staging branch.

- Create a new Neon project dedicated to ExpressJobs.
- Apply `ej_*` schema.
- Seed non-production test data only.
- Configure Vercel Preview `DATABASE_URL`/`DATABASE_URL_UNPOOLED`.
- Run RLS tests with client/worker/admin identities.

Phase 3: Cut over only after parity.

- Compare job create/apply/accept/message/review flows.
- Compare audit logging and admin boundaries.
- Validate rollback plan.
- Keep production `NO-GO` until a human release gate approves.

## Variables Needed

### Supabase MVP

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` or newer publishable key equivalent
- `SUPABASE_SERVICE_ROLE_KEY` server-only, only if server admin tasks are implemented
- `APP_ENV`
- `NEXT_PUBLIC_APP_URL`
- `ALLOWED_ORIGINS`
- `ENABLE_PAYMENTS=false`
- `ENABLE_AI_AGENTS=false`
- `AI_KILL_SWITCH=true`
- `ENABLE_ADMIN_PANEL=false`

### Optional Neon Future Path

- `DATABASE_URL`
- `DATABASE_URL_UNPOOLED`
- `PGHOST`
- `PGDATABASE`
- `PGUSER`
- `PGPASSWORD`
- `NEON_PROJECT_ID` for automation only
- `NEON_BRANCH_ID` for automation only
- Auth/JWT variables depending on chosen Auth provider

No real values belong in this repository.

## Blocked By External Credentials

- Supabase ExpressJobs staging project URL.
- Supabase staging publishable/anon key.
- Supabase server-only key if server admin paths are introduced.
- Supabase OAuth/email provider configuration for Auth.
- Supabase Realtime configuration and channel policy validation.
- Optional Neon project/branch credentials if preview branch testing is adopted.
- Vercel Preview environment variable configuration.

## Final Recommendation

Proceed with Supabase for the ExpressJobs MVP. Re-evaluate Neon after Auth, RLS, job lifecycle, chat, and reviews work in staging. Adopt Neon only when its branching/Vercel preview isolation solves an actual workflow problem that Supabase is not solving safely or quickly.
