# ExpressJobs Public Calls Admin Actions And RLS Smoke

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Scope

Mode: `EXPRESSJOBS_PUBLIC_CALLS_ADMIN_ACTIONS_AND_RLS_SMOKE`

This cycle enables audited admin server actions for the public-calls review queue. It keeps the workflow manual and does not enable scraping, crawlers, cron imports, automatic imports, AI Gateway, live payments, or production.

PR #63: `https://github.com/FileLanderScaner/CODEX-expressjobs/pull/63`

## Implemented Actions

Server action file:

- `src/app/admin/llamados-publicos/actions.ts`

Actions:

- `createPublicCallSourceAction`
- `updatePublicCallSourceAction`
- `createPublicCallDraftAction`
- `updatePublicCallDraftAction`
- `submitPublicCallDraftForReviewAction`
- `approvePublicCallDraftAction`
- `rejectPublicCallDraftAction`
- `publishPublicCallDraftAction`
- `archivePublicCallDraftAction`

All actions use the normal authenticated Supabase server client and the current user session. They do not use service-role credentials.

## Permission Model

Every action checks:

- Supabase is configured.
- User is authenticated.
- `ej_profiles.role = admin`.
- The requested transition is valid for the current draft state.
- Sensitive actions include a required reason.
- Publishing requires `review_status = approved`.
- Publishing requires a visible HTTPS official source URL.
- Publishing blocks sources marked `permission_required` or `blocked`.
- Publishing blocks `robots_review_status = not_reviewed` or `blocked`.
- Publishing requires license/terms registered on the draft or source.

Common users and anonymous users are blocked at both server-action policy level and RLS table policy level.

## Audit Model

Existing DB triggers audit source/draft creation and status transitions.

This cycle also adds explicit action event types:

- `draft_updated`
- `draft_submitted`
- `draft_approved`
- `draft_rejected`
- `draft_published`
- `draft_archived`

Migration:

- `supabase/migrations/20260529040500_public_calls_admin_action_events.sql`

The migration only expands the allowed audit event types. It does not relax RLS.

Each sensitive server action writes:

- actor profile id;
- affected source/draft;
- event type;
- previous status;
- new status;
- reason/notes;
- safe metadata.

## Admin UX

Route:

- `/admin/llamados-publicos`

The route now supports:

- creating a source;
- editing a source;
- creating a draft;
- editing a draft;
- sending a draft to review;
- approving a draft;
- rejecting with required reason;
- publishing after approval;
- archiving/unpublishing;
- viewing audit history.

The page still states there is no scraping or automatic import.

## Browser Smoke

Local smoke passed on `http://localhost:3020` for:

- `/`
- `/llamados-publicos`
- `/servicios`
- `/admin`
- `/admin/llamados-publicos`

Coverage:

- Desktop 1360.
- Mobile 390.
- No horizontal overflow.
- No browser console errors.
- Signed-out admin routes show protected state.
- `NO-GO_PRODUCTION` remains visible.

## RLS Smoke Status

Generic staging RLS smoke remains expected through:

- `npm run rls:smoke`

New specific smoke script:

- `npm run rls:smoke:public-calls`

Current specific smoke result:

- `BLOCKED_SUPABASE_SCHEMA_NOT_APPLIED`

Evidence:

- Admin fixture signs in and has `role=admin`.
- The configured local staging/preview target returns `PGRST205` for `public.public_call_sources`.
- This means the local target used by `.env.local`/`.env.rls` does not yet have the PR #62 public-calls migration applied.

No result is invented as PASS. The specific RLS smoke must be rerun after the same target receives the public-calls migrations.

## Security Checklist

- Production remains `NO-GO_PRODUCTION`.
- No `vercel --prod`.
- No `vercel promote`.
- No Production env mutation.
- No PayPal live.
- No real payments.
- No AI Gateway.
- No scraping.
- No crawler.
- No cron import.
- No automatic import.
- No service-role in public-calls actions or client code.
- No RLS relaxation.
- No `using (true)` or `with check (true)` added.
- No external source used as authorized without source/terms/license review.

## Validation

- `npm run secret:scan`: PASS
- `npm run production:check`: PASS
- `npm run guard:no-production-deploy`: PASS
- `npm run test:rls:static`: PASS
- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm run test`: PASS
- `npm run build`: PASS
- `npm run staging:check`: PASS
- `npm run rls:smoke`: PASS
- `npm run rls:smoke:public-calls`: BLOCKED_SUPABASE_SCHEMA_NOT_APPLIED
- Browser smoke local: PASS
- JSON parse: PASS
- `git diff --check`: PASS
- Remote PR checks: PASS
- Remote Preview browser smoke: PASS with `VERCEL_LIVE_FEEDBACK_CSP_CAVEAT`

## Remote Validation

PR #63 checks passed:

- `docs-check`
- `pr-check`
- `production-no-go`
- `security-gate`
- `Supabase Preview`
- `Vercel`
- `Vercel Agent Review`
- `Vercel Preview Comments`

Preview:

- `https://codex-expressjobs-git-codex-public-cal-019d55-akuma424-projects.vercel.app`

Supabase Preview project:

- `eqgmsgpaxfdjuclhhwep`

Remote browser smoke passed on desktop 1360 and mobile 390 for `/`, `/llamados-publicos`, `/servicios`, `/admin`, and `/admin/llamados-publicos`.

Caveat:

- Vercel Live Feedback injects a Preview-only script from `vercel.live`.
- The app CSP blocks that script.
- This is documented as `VERCEL_LIVE_FEEDBACK_CSP_CAVEAT`, not an ExpressJobs app error.

## Current State

`PUBLIC_CALLS_ADMIN_ACTIONS_PREVIEW_CHECKS_PASS_REAL_ACTION_RLS_SMOKE_BLOCKED_LOCAL_SCHEMA_NOT_APPLIED`

Production remains `NO-GO_PRODUCTION`.
