# ExpressJobs GitHub to Supabase and Vercel Preview Pipeline

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## What It Does

The `ExpressJobs Preview Pipeline` workflow lets an operator manually run safe repo checks, Supabase staging validation, real RLS smoke tests, and a Vercel Preview deployment from GitHub Actions.

It is designed for Preview/Staging only. It does not deploy production, promote deployments, enable live payments, or apply remote migrations automatically.

## How To Run

1. Open GitHub.
2. Go to `Actions`.
3. Select `ExpressJobs Preview Pipeline`.
4. Click `Run workflow`.
5. Choose `task`.
6. Keep `allow_supabase_write=false` unless a reviewed staging-only Supabase write operation is intentionally being tested.

## Task Options

| Task | Runs |
| --- | --- |
| `checks_only` | repo validation only |
| `supabase_check` | repo validation plus staging env check |
| `rls_smoke` | repo validation, staging check, and real RLS smoke |
| `vercel_preview` | repo validation plus Vercel Preview deploy and Preview smoke |
| `full_preview` | all safe checks plus Supabase, RLS, and Vercel Preview jobs |

## Required GitHub Actions Secrets

Vercel Preview:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

Supabase staging:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

RLS smoke test users:

- `EXPRESSJOBS_STAGING_CLIENT_EMAIL`
- `EXPRESSJOBS_STAGING_CLIENT_PASSWORD`
- `EXPRESSJOBS_STAGING_WORKER_EMAIL`
- `EXPRESSJOBS_STAGING_WORKER_PASSWORD`
- `EXPRESSJOBS_STAGING_ADMIN_EMAIL`
- `EXPRESSJOBS_STAGING_ADMIN_PASSWORD`

Optional only if a future script requires service-role behavior:

- `SUPABASE_SERVICE_ROLE_KEY`

## What It Does Not Do

- No production deploy.
- No `vercel --prod`.
- No `vercel promote`.
- No Production env var setup.
- No live PayPal or real payments.
- No remote migrations by default.
- No real user contact.
- No AI agents.
- No secrets printed in logs.

## Supabase Write Gate

Remote Supabase writes or migrations must not run unless both are true:

- `allow_supabase_write=true` in the manual workflow input.
- `SUPABASE_WRITE_APPROVAL=true` is intentionally used by the specific reviewed job.

This initial pipeline does not apply migrations automatically. The current RLS blocker remains until `supabase/migrations/20260515132404_harden_expressjobs_profile_role_updates.sql` is applied safely to staging and `npm run rls:smoke` passes.

## Error Interpretation

| Status | Meaning |
| --- | --- |
| `BLOCKED_EXTERNAL_CREDENTIALS` | Required GitHub Actions secrets are missing. |
| `BLOCKED_SUPABASE_ACCESS` | Supabase staging env is incomplete or unsafe. |
| `BLOCKED_PRODUCTION_RISK` | A production deploy/env/payment/AI flag was detected. |
| `FAIL_RLS_ROLE_ESCALATION_ACTIVE` | RLS hardening has not been applied or did not block role self-promotion. |
| `BLOCKED_PREVIEW_URL_MISSING` | Vercel did not return a Preview URL. |

## Current Safety State

- Production: `NO-GO_PRODUCTION`
- First 10 testers: `NO-GO_UNTIL_RLS_ROLE_HARDENING_APPLIED_AND_SMOKE_PASS`
- PayPal live: `OFF`
- AI agents: `OFF`
