# Real Marketplace Flow Staging Hardening

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Audit Summary

- Role UI uses `ej_set_profile_role` for `client` and `worker`; no public admin role is exposed.
- Worker jobs load real `open` jobs from Supabase and now filter out the signed-in user's own jobs.
- Worker detail inserts real applications, checks duplicate applications, blocks self-apply, and shows clear errors.
- Client detail loads only jobs owned by the current user and manages applications through `ej_accept_job_application` / `ej_reject_job_application`.
- RLS/static coverage confirms role escalation, self-apply, and client-owner boundaries.

## Changes

- Added `20260517105000_harden_application_state_transitions.sql`.
- Accept/reject RPCs now reject already resolved applications and non-open jobs.
- Client accept/reject UI has a pending state and clearer error/success copy.
- Worker empty/error/duplicate states use staging-friendly copy.
- Application statuses now render as `pendiente`, `aceptada`, `rechazada`, or `retirada`.

## Pending

- Apply the new migration to staging through an approved safe path.
- Run controlled real-user browser smoke after staging migration is applied.
- Keep Production paused until explicit human approval.
