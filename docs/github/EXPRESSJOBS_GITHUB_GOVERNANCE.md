# ExpressJobs GitHub Governance

## Purpose

This document defines the minimum GitHub controls for ExpressJobs / Trabajos Rapidos while the project remains in staging and `PRODUCTION_STATUS=NO-GO_PRODUCTION`.

## Current mandatory blockers

- `RLS_ROLE_ESCALATION_RISK` must be fixed before merging release work or expanding testers.
- PayPal sandbox may remain blocked by external credentials, but PayPal live must stay off.
- Production deploys and production promotions require explicit human approval.

## Required issue tracking

Security, payment, release, Supabase RLS, and Vercel Preview work must be tracked through structured issues. Issues must not contain secrets, tokens, cookies, service-role keys, Deployment Protection bypass tokens, or real payment credentials.

## Required PR evidence

Every PR must document:

- safety checklist
- local/CI checks
- external checks when applicable
- release decisions for FIRST_10, FIRST_25, PAID_PILOT, and PRODUCTION
- linked issues

## Autonomous Codex rule

Codex may work autonomously only on issues labeled `codex-safe` and without destructive external actions. Codex must stop when work requires production, live payments, Supabase remote mutation, secret handling, or human approval.

## Merge gates

A PR must not be merged when any of the following is true:

- `status-blocked` is present
- an open security blocker applies
- RLS role escalation risk remains unresolved
- production status would change from `NO-GO_PRODUCTION`
- secrets or env files are included
- required checks are missing or failing
