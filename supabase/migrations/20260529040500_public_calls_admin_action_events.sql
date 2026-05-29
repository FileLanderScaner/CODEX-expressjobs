-- Extend public-call audit events for explicit admin actions.
-- Safe preparation only: no scraping, no crawler, no cron, no automatic import.

alter table public.public_call_review_events
  drop constraint if exists public_call_review_events_event_type_allowed;

alter table public.public_call_review_events
  add constraint public_call_review_events_event_type_allowed check (
    event_type in (
      'source_created',
      'source_updated',
      'draft_created',
      'draft_updated',
      'draft_submitted',
      'draft_approved',
      'draft_rejected',
      'draft_published',
      'draft_archived',
      'review_status_changed',
      'publication_status_changed',
      'source_url_changed'
    )
  );
