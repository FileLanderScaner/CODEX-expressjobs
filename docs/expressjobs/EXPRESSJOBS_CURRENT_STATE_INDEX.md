# ExpressJobs Current State Index

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Executive Status

ExpressJobs / Trabajos Rapidos is code-ready and staging-public-config-ready, but Auth/RLS-smoke blocked.

- Code: `CODE_READY`
- Staging: `STAGING_ENV_PASS_AUTH_USERS_PENDING`
- Supabase staging: `STAGING_ENV_PASS_AUTH_USERS_PENDING`
- Vercel Preview: `PREVIEW_FAIL_SAFE_BLOCKED`
- Safe retry: `false`
- First 10 testers: `NO-GO_UNTIL_PREVIEW_AND_RLS_PASS`
- Production: `NO-GO_PRODUCTION`

## What Is Ready

- Next.js App Router MVP foundation.
- Public brand direction: Trabajos Rapidos.
- Client, worker, admin routes and flows.
- Pricing/monetization copy with payments disabled.
- Supabase `ej_*` schema and RLS migration.
- Static RLS tests.
- RLS real smoke scripts.
- First 10 tester dry-run package.
- Trust and safety documentation.
- Release gate and environment blocker runbooks.

## What Is Blocked

- Confirmed Supabase Auth staging users.
- Real RLS smoke tests.
- Vercel Preview deployment.
- Browser smoke on Preview.
- First 10 external testers.
- First 100 users.
- Production.

## What Must Not Be Done Yet

- Do not deploy production.
- Do not reconnect Vercel Git auto-deploy.
- Do not run another Vercel deploy until branch targeting is fixed.
- Do not apply Supabase migration to an unknown or production project.
- Do not commit `.env` files.
- Do not print secrets.
- Do not invite external testers.
- Do not activate live payments.
- Do not activate AI agents.

## Key Documents By Topic

### Product

- `docs/expressjobs/EXPRESSJOBS_PRODUCT_SPEC.md`
- `docs/expressjobs/EXPRESSJOBS_MVP_IMPLEMENTATION.md`
- `docs/expressjobs/EXPRESSJOBS_USER_FLOWS.md`

### UX / Branding

- `docs/expressjobs/EXPRESSJOBS_BRANDING_DECISION.md`
- `docs/expressjobs/EXPRESSJOBS_AI_STUDIO_REFERENCE_AUDIT.md`
- `docs/expressjobs/EXPRESSJOBS_PRODUCT_UX_REVIEW.md`

### Supabase

- `docs/expressjobs/EXPRESSJOBS_SUPABASE_SCHEMA.md`
- `docs/expressjobs/EXPRESSJOBS_SUPABASE_STAGING_ACTIVATION_REPORT.md`
- `docs/expressjobs/EXPRESSJOBS_SUPABASE_ACCESS_FIX_PLAN.md`
- `docs/expressjobs/EXPRESSJOBS_SUPABASE_CLI_SETUP_RUNBOOK.md`
- `docs/expressjobs/EXPRESSJOBS_SUPABASE_MCP_REQUIREMENTS.md`

### RLS

- `docs/expressjobs/EXPRESSJOBS_RLS_POLICIES.md`
- `docs/expressjobs/EXPRESSJOBS_RLS_REAL_SMOKE_TEST_RUNBOOK.md`
- `docs/expressjobs/EXPRESSJOBS_RLS_REAL_SMOKE_TEST_EVIDENCE.md`

### Vercel

- `docs/expressjobs/EXPRESSJOBS_VERCEL_PREVIEW_ACTIVATION_REPORT.md`
- `docs/expressjobs/EXPRESSJOBS_VERCEL_PREVIEW_SAFETY_FIX_PLAN.md`
- `docs/expressjobs/EXPRESSJOBS_VERCEL_BRANCH_TARGETING_RUNBOOK.md`
- `docs/expressjobs/EXPRESSJOBS_VERCEL_RECONNECT_GIT_CHECKLIST.md`

### Security

- `docs/expressjobs/EXPRESSJOBS_SECURITY_BOUNDARIES.md`
- `docs/expressjobs/EXPRESSJOBS_ENV_ACTIVATION_SECURITY_REVIEW.md`
- `docs/expressjobs/EXPRESSJOBS_SAFE_RETRY_CONDITIONS.md`
- `docs/expressjobs/EXPRESSJOBS_TRUST_SAFETY_POLICY.md`

### Testers

- `docs/expressjobs/EXPRESSJOBS_FIRST_10_TESTER_DRY_RUN_PACKAGE.md`
- `docs/expressjobs/EXPRESSJOBS_FIRST_10_TESTER_GO_NO_GO.md`
- `docs/expressjobs/EXPRESSJOBS_FIRST_100_USERS_PREP.md`

### Monetization

- `docs/expressjobs/EXPRESSJOBS_MONETIZATION_PLAN.md`
- `docs/expressjobs/EXPRESSJOBS_PAYMENT_READINESS.md`
- `docs/expressjobs/EXPRESSJOBS_PREMIUM_FEATURE_MATRIX.md`

### Release Gate

- `docs/expressjobs/EXPRESSJOBS_CURRENT_GO_NO_GO_DECISION.md`
- `docs/expressjobs/EXPRESSJOBS_RELEASE_GATE_FINAL_CURRENT.md`
- `docs/expressjobs/EXPRESSJOBS_ENV_BLOCKER_CLOSEOUT.md`

## Relevant Commits

- `e007625` Document ExpressJobs post-push Vercel safety blocker.
- `6e093b8` Close out ExpressJobs environment activation blockers.
- `b40122a` Update ExpressJobs env activation next gate.
- `b1615f8` Document ExpressJobs Vercel deployment mitigation.
- `6dd8976` Activate ExpressJobs Supabase staging and Vercel preview.
- `5718d87` Prepare ExpressJobs first 10 tester dry run package.
- `16e620b` Finalize ExpressJobs current release gate.

## Recommended Continuation Order

1. Unlock Supabase access via MCP, CLI, or manual dashboard staging project.
2. Apply the `ej_*` migration to a confirmed non-production Supabase project.
3. Run real RLS smoke tests.
4. Fix Vercel branch targeting before reconnecting Git.
5. Deploy valid Preview and inspect target.
6. Run browser smoke.
7. Re-open first 10 tester gate only after RLS and Preview pass.
