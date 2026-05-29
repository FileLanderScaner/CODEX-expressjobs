# ExpressJobs Public Calls Admin Review Queue Design

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Scope

Mode: `EXPRESSJOBS_PUBLIC_CALLS_ADMIN_REVIEW_QUEUE_DESIGN`

This cycle prepares a safe admin review queue for public-call references. It does not import external data, does not scrape, does not crawl, does not create cron jobs, and does not activate AI Gateway, payments, or production.

## What Was Implemented

### Local Supabase Migration

Migration:

- `supabase/migrations/20260529024000_public_calls_admin_review_queue.sql`

Tables:

- `public.public_call_sources`
- `public.public_call_drafts`
- `public.public_call_review_events`

The migration is non-destructive and idempotent:

- creates enums only if absent;
- creates tables only if absent;
- creates indexes only if absent;
- drops/recreates only policies and triggers owned by this feature;
- does not delete existing data;
- does not disable RLS;
- does not apply to any remote database from this cycle.

### Source Registry

`public_call_sources` stores:

- source name and type;
- official/base URL;
- terms URL;
- license name and URL;
- robots review status;
- authorization status;
- notes;
- creator/updater and timestamps.

Authorization states:

- `manual_only`
- `authorized_api`
- `authorized_rss`
- `authorized_open_data`
- `permission_required`
- `blocked`

### Draft Review Queue

`public_call_drafts` stores:

- title, organization, description, category, location and deadline;
- official source URL;
- source snapshot metadata;
- license;
- load method;
- review status;
- publication status;
- review notes and rejection reason;
- creator, reviewer, publisher, updater and timestamps.

Review states:

- `draft`
- `pending_review`
- `needs_changes`
- `approved`
- `rejected`

Publication states:

- `not_published`
- `published`
- `archived`

Important guard:

- A draft cannot be `published` unless `review_status = approved`.
- A rejected draft must include a rejection reason.

### Audit Events

`public_call_review_events` records:

- source creation/update;
- draft creation;
- review status changes;
- publication status changes;
- source URL changes;
- actor profile id when available;
- status transition;
- notes and metadata;
- timestamp.

Trigger functions fill audit fields and write review events. Direct client execution on these functions is revoked.

## RLS Design

RLS is enabled on all new tables.

Users/common visitors:

- cannot insert sources;
- cannot update sources;
- cannot delete sources;
- cannot create drafts;
- cannot approve drafts;
- cannot publish drafts;
- can only read drafts that are both `approved` and `published`.

Admins:

- can read, insert and update sources;
- can read, insert and update drafts;
- can read and insert audit events;
- cannot delete rows through client grants/policies.

The policies use `(select private.ej_is_admin())`, matching the hardened private admin helper already used by the project.

Service role:

- not used in client code;
- not referenced by the new migration;
- any future use must be backend-only and separately documented.

## Admin UX

Route:

- `/admin/llamados-publicos`

Behavior:

- signed-out users see a login/admin requirement;
- non-admin users see a permission block;
- admins see queue metrics, sources, drafts and risk flags;
- if the migration is not available in the current environment, the page shows a safe migration-pending error;
- approve/reject/publish buttons are visible but disabled in V1 until server actions are implemented and audited.

Risk indicators:

- source without enough authorization;
- license missing;
- robots/terms pending;
- source URL missing or not HTTPS;
- human review pending;
- publication attempted before approval.

## What This Does Not Do

- No scraping.
- No crawler.
- No cron import.
- No hidden external API call.
- No automatic import from Uruguay Concursa.
- No use of non-authorized external data.
- No publishing without human review.
- No production deployment.
- No live payments.
- No AI Gateway.

## Required Next Gate Before Enabling Actions

Before create/approve/reject/publish actions are enabled:

1. Apply migration in Preview/Staging through the safe Supabase preview path.
2. Confirm RLS smoke covers admin and common-user behavior for the new tables.
3. Implement server actions or API routes with explicit admin checks.
4. Ensure every write records audit events.
5. Keep public cards manual until an authorized source is chosen.

## Current Status

`PUBLIC_CALLS_ADMIN_REVIEW_QUEUE_DESIGNED_SAFE`

Production remains `NO-GO_PRODUCTION`.
