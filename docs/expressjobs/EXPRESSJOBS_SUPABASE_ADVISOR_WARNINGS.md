# ExpressJobs Supabase Advisor Warnings

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Current Warnings

Supabase Security Advisor currently reports two warnings:

- `function_search_path_mutable_public_ej_is_admin`
- `function_search_path_mutable_public_ej_is_job_participant`

These warnings indicate helper functions do not have an explicit `search_path` setting.

## Risk

Mutable function search paths can create avoidable resolution risk if objects with the same names are introduced in schemas earlier in the runtime search path. The affected functions are RLS helper functions, so the fix should be handled as a security hardening migration.

## Prepared Fix

Prepared local migration:

`supabase/migrations/20260513081258_fix_expressjobs_function_search_path.sql`

Status:

`PREPARED_NOT_APPLIED`

## Blocker

Remote apply and advisor re-check are blocked by missing write capability:

- `SUPABASE_ACCESS_TOKEN` missing
- `SUPABASE_SERVICE_ROLE_KEY` missing for real auth smoke workflows

## Required Next Action

Provide secure staging credentials outside git, then run the apply and advisor verification flow. Keep production blocked until real RLS smoke passes.
