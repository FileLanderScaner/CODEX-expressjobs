-- Public calls admin review queue.
-- Safe preparation only: no scraping, no crawler, no cron, no automatic import,
-- and no public-body affiliation claim. Apply only through the existing
-- staging/preview migration path before any admin workflow uses these tables.

create extension if not exists pgcrypto;
create schema if not exists private;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'public_call_source_type') then
    create type public.public_call_source_type as enum (
      'manual',
      'official_api',
      'official_rss',
      'official_open_data',
      'partner_authorized',
      'unknown'
    );
  end if;

  if not exists (select 1 from pg_type where typname = 'public_call_authorization_status') then
    create type public.public_call_authorization_status as enum (
      'manual_only',
      'authorized_api',
      'authorized_rss',
      'authorized_open_data',
      'permission_required',
      'blocked'
    );
  end if;

  if not exists (select 1 from pg_type where typname = 'public_call_robots_review_status') then
    create type public.public_call_robots_review_status as enum (
      'not_reviewed',
      'reviewed_allowed',
      'reviewed_limited',
      'blocked',
      'not_applicable'
    );
  end if;

  if not exists (select 1 from pg_type where typname = 'public_call_review_status') then
    create type public.public_call_review_status as enum (
      'draft',
      'pending_review',
      'needs_changes',
      'approved',
      'rejected'
    );
  end if;

  if not exists (select 1 from pg_type where typname = 'public_call_publication_status') then
    create type public.public_call_publication_status as enum (
      'not_published',
      'published',
      'archived'
    );
  end if;

  if not exists (select 1 from pg_type where typname = 'public_call_load_method') then
    create type public.public_call_load_method as enum (
      'manual',
      'authorized_api',
      'authorized_rss',
      'authorized_open_data',
      'partner_submission'
    );
  end if;
end $$;

create table if not exists public.public_call_sources (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  source_type public.public_call_source_type not null default 'manual',
  base_url text not null,
  terms_url text,
  license_name text,
  license_url text,
  robots_review_status public.public_call_robots_review_status not null default 'not_reviewed',
  authorization_status public.public_call_authorization_status not null default 'manual_only',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references public.ej_profiles(id) on delete set null,
  updated_by uuid references public.ej_profiles(id) on delete set null,
  constraint public_call_sources_base_url_https check (base_url ~* '^https://'),
  constraint public_call_sources_terms_url_https check (terms_url is null or terms_url ~* '^https://'),
  constraint public_call_sources_license_url_https check (license_url is null or license_url ~* '^https://')
);

create table if not exists public.public_call_drafts (
  id uuid primary key default gen_random_uuid(),
  source_id uuid not null references public.public_call_sources(id) on delete restrict,
  title text not null,
  organization text not null,
  description text not null,
  category text not null,
  location text not null,
  deadline date,
  source_url text not null,
  source_snapshot jsonb not null default '{}'::jsonb,
  license_name text,
  load_method public.public_call_load_method not null default 'manual',
  review_status public.public_call_review_status not null default 'draft',
  publication_status public.public_call_publication_status not null default 'not_published',
  review_notes text,
  rejection_reason text,
  created_by uuid references public.ej_profiles(id) on delete set null,
  reviewed_by uuid references public.ej_profiles(id) on delete set null,
  published_by uuid references public.ej_profiles(id) on delete set null,
  updated_by uuid references public.ej_profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  reviewed_at timestamptz,
  published_at timestamptz,
  constraint public_call_drafts_source_url_https check (source_url ~* '^https://'),
  constraint public_call_drafts_publication_requires_approval check (
    publication_status <> 'published' or review_status = 'approved'
  ),
  constraint public_call_drafts_rejection_reason_required check (
    review_status <> 'rejected' or nullif(trim(coalesce(rejection_reason, '')), '') is not null
  )
);

create table if not exists public.public_call_review_events (
  id uuid primary key default gen_random_uuid(),
  source_id uuid references public.public_call_sources(id) on delete set null,
  draft_id uuid references public.public_call_drafts(id) on delete cascade,
  event_type text not null,
  from_status text,
  to_status text,
  actor_id uuid references public.ej_profiles(id) on delete set null,
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint public_call_review_events_event_type_allowed check (
    event_type in (
      'source_created',
      'source_updated',
      'draft_created',
      'review_status_changed',
      'publication_status_changed',
      'source_url_changed'
    )
  ),
  constraint public_call_review_events_subject_required check (
    source_id is not null or draft_id is not null
  )
);

comment on table public.public_call_sources is
  'Admin-only registry of official or authorized sources for public-call references. No scraping permission is implied.';
comment on table public.public_call_drafts is
  'Admin review queue for public-call references. Public visibility requires approved review and published status.';
comment on table public.public_call_review_events is
  'Audit events for source and draft review actions in the public-calls admin queue.';

create index if not exists public_call_sources_authorization_status_idx
  on public.public_call_sources (authorization_status);
create index if not exists public_call_drafts_source_id_idx
  on public.public_call_drafts (source_id);
create index if not exists public_call_drafts_review_publication_idx
  on public.public_call_drafts (review_status, publication_status);
create index if not exists public_call_drafts_deadline_idx
  on public.public_call_drafts (deadline);
create index if not exists public_call_review_events_source_id_idx
  on public.public_call_review_events (source_id);
create index if not exists public_call_review_events_draft_id_idx
  on public.public_call_review_events (draft_id);

create or replace function public.public_call_sources_set_audit_fields()
returns trigger
language plpgsql
security definer
set search_path = public
as $function$
begin
  if tg_op = 'INSERT' then
    new.created_at = coalesce(new.created_at, now());
    new.updated_at = coalesce(new.updated_at, now());
    new.created_by = coalesce(new.created_by, (select auth.uid()));
    new.updated_by = coalesce(new.updated_by, (select auth.uid()));
  elsif tg_op = 'UPDATE' then
    new.updated_at = now();
    new.updated_by = coalesce((select auth.uid()), old.updated_by);
  end if;

  return new;
end;
$function$;

create or replace function public.public_call_drafts_set_audit_fields()
returns trigger
language plpgsql
security definer
set search_path = public
as $function$
begin
  if tg_op = 'INSERT' then
    new.created_at = coalesce(new.created_at, now());
    new.updated_at = coalesce(new.updated_at, now());
    new.created_by = coalesce(new.created_by, (select auth.uid()));
    new.updated_by = coalesce(new.updated_by, (select auth.uid()));
  elsif tg_op = 'UPDATE' then
    new.updated_at = now();
    new.updated_by = coalesce((select auth.uid()), old.updated_by);

    if new.review_status is distinct from old.review_status
      and new.review_status in ('needs_changes', 'approved', 'rejected') then
      new.reviewed_by = coalesce((select auth.uid()), old.reviewed_by);
      new.reviewed_at = now();
    end if;

    if new.publication_status is distinct from old.publication_status
      and new.publication_status = 'published' then
      new.published_by = coalesce((select auth.uid()), old.published_by);
      new.published_at = now();
    end if;
  end if;

  return new;
end;
$function$;

create or replace function public.public_call_sources_write_audit_event()
returns trigger
language plpgsql
security definer
set search_path = public
as $function$
begin
  insert into public.public_call_review_events (
    source_id,
    event_type,
    from_status,
    to_status,
    actor_id,
    notes,
    metadata
  )
  values (
    new.id,
    case when tg_op = 'INSERT' then 'source_created' else 'source_updated' end,
    case when tg_op = 'UPDATE' then old.authorization_status::text else null end,
    new.authorization_status::text,
    (select auth.uid()),
    new.notes,
    jsonb_build_object(
      'source_type', new.source_type::text,
      'robots_review_status', new.robots_review_status::text
    )
  );

  return new;
end;
$function$;

create or replace function public.public_call_drafts_write_audit_event()
returns trigger
language plpgsql
security definer
set search_path = public
as $function$
begin
  if tg_op = 'INSERT' then
    insert into public.public_call_review_events (
      source_id,
      draft_id,
      event_type,
      to_status,
      actor_id,
      notes,
      metadata
    )
    values (
      new.source_id,
      new.id,
      'draft_created',
      new.review_status::text,
      (select auth.uid()),
      new.review_notes,
      jsonb_build_object('load_method', new.load_method::text, 'source_url', new.source_url)
    );
  elsif tg_op = 'UPDATE' then
    if new.review_status is distinct from old.review_status then
      insert into public.public_call_review_events (
        source_id,
        draft_id,
        event_type,
        from_status,
        to_status,
        actor_id,
        notes
      )
      values (
        new.source_id,
        new.id,
        'review_status_changed',
        old.review_status::text,
        new.review_status::text,
        (select auth.uid()),
        coalesce(new.review_notes, new.rejection_reason)
      );
    end if;

    if new.publication_status is distinct from old.publication_status then
      insert into public.public_call_review_events (
        source_id,
        draft_id,
        event_type,
        from_status,
        to_status,
        actor_id,
        notes
      )
      values (
        new.source_id,
        new.id,
        'publication_status_changed',
        old.publication_status::text,
        new.publication_status::text,
        (select auth.uid()),
        new.review_notes
      );
    end if;

    if new.source_url is distinct from old.source_url then
      insert into public.public_call_review_events (
        source_id,
        draft_id,
        event_type,
        actor_id,
        notes,
        metadata
      )
      values (
        new.source_id,
        new.id,
        'source_url_changed',
        (select auth.uid()),
        new.review_notes,
        jsonb_build_object('old_source_url', old.source_url, 'new_source_url', new.source_url)
      );
    end if;
  end if;

  return new;
end;
$function$;

revoke execute on function public.public_call_sources_set_audit_fields() from public;
revoke execute on function public.public_call_sources_set_audit_fields() from anon;
revoke execute on function public.public_call_sources_set_audit_fields() from authenticated;
revoke execute on function public.public_call_drafts_set_audit_fields() from public;
revoke execute on function public.public_call_drafts_set_audit_fields() from anon;
revoke execute on function public.public_call_drafts_set_audit_fields() from authenticated;
revoke execute on function public.public_call_sources_write_audit_event() from public;
revoke execute on function public.public_call_sources_write_audit_event() from anon;
revoke execute on function public.public_call_sources_write_audit_event() from authenticated;
revoke execute on function public.public_call_drafts_write_audit_event() from public;
revoke execute on function public.public_call_drafts_write_audit_event() from anon;
revoke execute on function public.public_call_drafts_write_audit_event() from authenticated;

drop trigger if exists public_call_sources_set_audit_fields on public.public_call_sources;
create trigger public_call_sources_set_audit_fields
  before insert or update on public.public_call_sources
  for each row execute function public.public_call_sources_set_audit_fields();

drop trigger if exists public_call_drafts_set_audit_fields on public.public_call_drafts;
create trigger public_call_drafts_set_audit_fields
  before insert or update on public.public_call_drafts
  for each row execute function public.public_call_drafts_set_audit_fields();

drop trigger if exists public_call_sources_write_audit_event on public.public_call_sources;
create trigger public_call_sources_write_audit_event
  after insert or update on public.public_call_sources
  for each row execute function public.public_call_sources_write_audit_event();

drop trigger if exists public_call_drafts_write_audit_event on public.public_call_drafts;
create trigger public_call_drafts_write_audit_event
  after insert or update on public.public_call_drafts
  for each row execute function public.public_call_drafts_write_audit_event();

alter table public.public_call_sources enable row level security;
alter table public.public_call_drafts enable row level security;
alter table public.public_call_review_events enable row level security;

revoke all on table public.public_call_sources from anon, authenticated;
revoke all on table public.public_call_drafts from anon, authenticated;
revoke all on table public.public_call_review_events from anon, authenticated;

grant select, insert, update on table public.public_call_sources to authenticated;
grant select, insert, update on table public.public_call_drafts to authenticated;
grant select on table public.public_call_drafts to anon;
grant select, insert on table public.public_call_review_events to authenticated;

drop policy if exists "public_call_sources_admin_select" on public.public_call_sources;
create policy "public_call_sources_admin_select" on public.public_call_sources
  for select to authenticated
  using ((select private.ej_is_admin()));

drop policy if exists "public_call_sources_admin_insert" on public.public_call_sources;
create policy "public_call_sources_admin_insert" on public.public_call_sources
  for insert to authenticated
  with check ((select private.ej_is_admin()));

drop policy if exists "public_call_sources_admin_update" on public.public_call_sources;
create policy "public_call_sources_admin_update" on public.public_call_sources
  for update to authenticated
  using ((select private.ej_is_admin()))
  with check ((select private.ej_is_admin()));

drop policy if exists "public_call_drafts_public_select_published" on public.public_call_drafts;
create policy "public_call_drafts_public_select_published" on public.public_call_drafts
  for select to anon, authenticated
  using (
    review_status = 'approved'
    and publication_status = 'published'
  );

drop policy if exists "public_call_drafts_admin_select" on public.public_call_drafts;
create policy "public_call_drafts_admin_select" on public.public_call_drafts
  for select to authenticated
  using ((select private.ej_is_admin()));

drop policy if exists "public_call_drafts_admin_insert" on public.public_call_drafts;
create policy "public_call_drafts_admin_insert" on public.public_call_drafts
  for insert to authenticated
  with check ((select private.ej_is_admin()));

drop policy if exists "public_call_drafts_admin_update" on public.public_call_drafts;
create policy "public_call_drafts_admin_update" on public.public_call_drafts
  for update to authenticated
  using ((select private.ej_is_admin()))
  with check ((select private.ej_is_admin()));

drop policy if exists "public_call_review_events_admin_select" on public.public_call_review_events;
create policy "public_call_review_events_admin_select" on public.public_call_review_events
  for select to authenticated
  using ((select private.ej_is_admin()));

drop policy if exists "public_call_review_events_admin_insert" on public.public_call_review_events;
create policy "public_call_review_events_admin_insert" on public.public_call_review_events
  for insert to authenticated
  with check ((select private.ej_is_admin()));
