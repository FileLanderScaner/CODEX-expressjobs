# Cycle ExpressJobs 2026-05-26 Reconcile And Continue

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Mode

`EXPRESSJOBS_PR_RECONCILE_UX_OAUTH_MANUAL_PILOT`

Branch: `codex/expressjobs-product-ux-review-after-redesign`

## GitHub Reconciliation

Read PRs #50, #49, #48, #47, #46, #44, #42, #41, and #40 from GitHub. GitHub state overrides stale local docs.

- #50 is open, mergeable, checks passing, broad redesign, one P2 review comment.
- #49 is open and visually superseded by #50.
- #48 is open docs-only design directive.
- #47/#46/#44/#42/#41 are merged into `main`.
- #40 is open, conflicting, Vercel failing, and should not be merged as-is.

Full matrix: `docs/EXPRESSJOBS_PR_RECONCILIATION_2026-05-26.md`.

## Changes Applied

- Replaced home category chips with clean text links.
- Added reusable profile progress guide with 6 steps:
  1. Datos basicos
  2. Rol y objetivo
  3. Experiencia o necesidad
  4. Ubicacion y disponibilidad
  5. Confianza y contacto
  6. Confirmacion / publicacion
- Added the 6-step profile guide to account, worker profile, and company profile forms.
- Hid inactive OAuth buttons so Google does not render as a dead action when OAuth is not active.
- Kept Google OAuth path available when provider flag and Supabase public auth config are active.
- Narrowed staging-title detection to known synthetic labels: `RLS_SMOKE`, `SMOKE_TEST`, `TEST_JOB`.
- Added manual pilot sales docs under `docs/sales`.
- Updated Google OAuth setup docs for official account `expressjobs.uy@gmail.com` without moving ownership/remotes.

## Vercel And Supabase

- Vercel PR #50 Preview inspected with `vercel inspect`: target `preview`, status `Ready`, deployment `dpl_AM1oLhQtiNkEWyvdUXmXTQViTbdj`.
- No Vercel deploy was created.
- No `vercel --prod`, `vercel promote`, or Production env mutation was run.
- Supabase branch capacity CLI check timed out through `npx supabase`; no Preview/deploy was attempted because branch capacity could not be freshly verified through that command.
- `npm run staging:check` passed.
- `npm run rls:smoke` returned `EXPRESSJOBS_RLS_STAGING_PASS`.
- No remote migration was applied.

## Checks

| Check | Result |
| --- | --- |
| `npm run secret:scan` | PASS |
| `npm run production:check` | PASS |
| `npm run guard:no-production-deploy` | PASS |
| `npm run test:rls:static` | PASS, 12 tests |
| `npm run staging:check` | PASS |
| `npm run rls:smoke` | PASS, `EXPRESSJOBS_RLS_STAGING_PASS` |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm run test` | PASS, 10 files / 60 tests |
| `npm run build` | PASS |
| `git diff --check` | PASS |
| Local browser smoke desktop 1360x900 | PASS |
| Local browser smoke mobile 390x844 | PASS |

## Browser Smoke Evidence

Desktop routes checked: `/`, `/auth`, `/profile`, `/dashboard/worker/profile`, `/dashboard/client/profile`, `/client/jobs/new`, `/worker/jobs`, `/pricing`.

Mobile routes checked: `/`, `/auth`, `/dashboard/worker/profile`, `/client/jobs/new`.

Observed:

- No horizontal overflow.
- No browser console errors.
- `/auth` shows inactive Google status instead of a dead Google button when OAuth is inactive.
- Profile forms show the 6-step guide.
- Home category section no longer uses category chip links.
- `NO-GO_PRODUCTION` remains visible.

## Security

- No secrets printed.
- No `.env` committed.
- No production action.
- No live payments.
- No automatic user contact.
- No RLS relaxation.
- No service-role key in client code.

## Next Mode

`EXPRESSJOBS_REAL_MARKETPLACE_FLOW_AUDIT`

Reason: PR and UX reconciliation are now locally coherent; the next highest-impact safe step is validating the end-to-end client/worker marketplace flow against staging without touching production.
