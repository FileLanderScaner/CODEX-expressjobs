-- Supabase Advisor closeout preparation for ExpressJobs staging.
-- Non-destructive and production-safe: prepares private SECURITY DEFINER
-- helper usage, removes direct API execution from internal helpers, and adds
-- covering indexes for foreign keys flagged by performance advisors.

create schema if not exists private;

revoke all on schema private from public;
grant usage on schema private to anon, authenticated;

create or replace function private.ej_is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $function$
  select exists (
    select 1
    from public.ej_profiles
    where id = (select auth.uid())
      and role = 'admin'
  );
$function$;

comment on function private.ej_is_admin() is
  'Private schema admin helper for RLS policies. Kept outside exposed public RPC surface.';

revoke execute on function private.ej_is_admin() from public;
grant execute on function private.ej_is_admin() to anon, authenticated;

revoke execute on function public.ej_is_admin() from public;
revoke execute on function public.ej_is_admin() from anon;
revoke execute on function public.ej_is_admin() from authenticated;

do $$
begin
  if exists (
    select 1
    from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public'
      and p.proname = 'ej_job_messages_broadcast_trigger'
      and p.pronargs = 0
  ) then
    execute 'revoke execute on function public.ej_job_messages_broadcast_trigger() from public';
    execute 'revoke execute on function public.ej_job_messages_broadcast_trigger() from anon';
    execute 'revoke execute on function public.ej_job_messages_broadcast_trigger() from authenticated';
  end if;
end $$;

drop policy if exists "profiles_select_own_or_admin" on public.ej_profiles;
create policy "profiles_select_own_or_admin" on public.ej_profiles
  for select using (id = (select auth.uid()) or (select private.ej_is_admin()));

drop policy if exists "profiles_insert_own" on public.ej_profiles;
create policy "profiles_insert_own" on public.ej_profiles
  for insert with check (id = (select auth.uid()));

drop policy if exists "profiles_update_own_safe_fields" on public.ej_profiles;
create policy "profiles_update_own_safe_fields" on public.ej_profiles
  for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

drop policy if exists "worker_profiles_select_available" on public.ej_worker_profiles;
create policy "worker_profiles_select_available" on public.ej_worker_profiles
  for select using (
    is_available = true
    or user_id = (select auth.uid())
    or (select private.ej_is_admin())
  );

drop policy if exists "worker_profiles_manage_own" on public.ej_worker_profiles;
create policy "worker_profiles_manage_own" on public.ej_worker_profiles
  for all using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

drop policy if exists "categories_select_active" on public.ej_categories;
create policy "categories_select_active" on public.ej_categories
  for select using (is_active = true or (select private.ej_is_admin()));

drop policy if exists "jobs_select_visible" on public.ej_jobs;
create policy "jobs_select_visible" on public.ej_jobs
  for select using (
    status in ('open', 'accepted', 'completed')
    or client_id = (select auth.uid())
    or accepted_worker_id = (select auth.uid())
    or (select private.ej_is_admin())
  );

drop policy if exists "jobs_client_insert" on public.ej_jobs;
create policy "jobs_client_insert" on public.ej_jobs
  for insert with check (
    client_id = (select auth.uid())
    and exists (
      select 1
      from public.ej_profiles
      where id = (select auth.uid())
        and role = 'client'
    )
  );

drop policy if exists "jobs_client_update" on public.ej_jobs;
create policy "jobs_client_update" on public.ej_jobs
  for update using (client_id = (select auth.uid()) or (select private.ej_is_admin()))
  with check (client_id = (select auth.uid()) or (select private.ej_is_admin()));

drop policy if exists "applications_worker_insert" on public.ej_job_applications;
create policy "applications_worker_insert" on public.ej_job_applications
  for insert with check (
    worker_id = (select auth.uid())
    and exists (
      select 1
      from public.ej_profiles
      where id = (select auth.uid())
        and role = 'worker'
    )
    and exists (
      select 1
      from public.ej_jobs
      where id = job_id
        and status = 'open'
        and client_id <> (select auth.uid())
    )
  );

drop policy if exists "applications_select_parties" on public.ej_job_applications;
create policy "applications_select_parties" on public.ej_job_applications
  for select using (
    worker_id = (select auth.uid())
    or exists (select 1 from public.ej_jobs where id = job_id and client_id = (select auth.uid()))
    or (select private.ej_is_admin())
  );

drop policy if exists "applications_update_client_only" on public.ej_job_applications;
create policy "applications_update_client_only" on public.ej_job_applications
  for update using (
    exists (select 1 from public.ej_jobs where id = job_id and client_id = (select auth.uid()))
    or (select private.ej_is_admin())
  )
  with check (
    exists (select 1 from public.ej_jobs where id = job_id and client_id = (select auth.uid()))
    or (select private.ej_is_admin())
  );

drop policy if exists "job_messages_select_admin_only" on public.ej_job_messages;
drop policy if exists "job_messages_select_participants_only" on public.ej_job_messages;
drop policy if exists "messages_select_participants" on public.ej_job_messages;
create policy "job_messages_select_participants_or_admin" on public.ej_job_messages
  for select to authenticated using (
    public.ej_is_job_participant(job_id)
    or (select private.ej_is_admin())
  );

drop policy if exists "messages_insert_participants" on public.ej_job_messages;
drop policy if exists "job_messages_insert_sender_and_participant_only" on public.ej_job_messages;
create policy "job_messages_insert_sender_and_participant_only" on public.ej_job_messages
  for insert to authenticated with check (
    sender_id = (select auth.uid())
    and public.ej_is_job_participant(job_id)
  );

drop policy if exists "reviews_select_participants" on public.ej_job_reviews;
create policy "reviews_select_participants" on public.ej_job_reviews
  for select using (public.ej_is_job_participant(job_id) or (select private.ej_is_admin()));

drop policy if exists "reviews_insert_completed_participants" on public.ej_job_reviews;
create policy "reviews_insert_completed_participants" on public.ej_job_reviews
  for insert with check (
    reviewer_id = (select auth.uid())
    and exists (select 1 from public.ej_jobs where id = job_id and status = 'completed')
  );

drop policy if exists "events_insert_authenticated" on public.ej_job_events;
create policy "events_insert_authenticated" on public.ej_job_events
  for insert with check ((select auth.uid()) is not null and (actor_id = (select auth.uid()) or actor_id is null));

drop policy if exists "events_select_participants" on public.ej_job_events;
create policy "events_select_participants" on public.ej_job_events
  for select using (job_id is null or public.ej_is_job_participant(job_id) or (select private.ej_is_admin()));

drop policy if exists "payment_records_select_own_or_admin" on public.ej_payment_records;
create policy "payment_records_select_own_or_admin" on public.ej_payment_records
  for select using (user_id = (select auth.uid()) or (select private.ej_is_admin()));

drop policy if exists "company_profiles_select_own_or_admin" on public.ej_company_profiles;
create policy "company_profiles_select_own_or_admin" on public.ej_company_profiles
  for select using (profile_id = (select auth.uid()) or (select private.ej_is_admin()));

drop policy if exists "company_profiles_insert_own_client" on public.ej_company_profiles;
create policy "company_profiles_insert_own_client" on public.ej_company_profiles
  for insert with check (
    profile_id = (select auth.uid())
    and exists (
      select 1
      from public.ej_profiles
      where id = (select auth.uid())
        and role = 'client'
    )
  );

drop policy if exists "company_profiles_update_own_client" on public.ej_company_profiles;
create policy "company_profiles_update_own_client" on public.ej_company_profiles
  for update using (profile_id = (select auth.uid()) or (select private.ej_is_admin()))
  with check (profile_id = (select auth.uid()) or (select private.ej_is_admin()));

drop policy if exists "job_reports_insert_authenticated" on public.ej_job_reports;
create policy "job_reports_insert_authenticated" on public.ej_job_reports
  for insert with check (
    reporter_profile_id = (select auth.uid())
    and exists (select 1 from public.ej_jobs where id = job_id)
  );

drop policy if exists "job_reports_select_reporter_owner_admin" on public.ej_job_reports;
create policy "job_reports_select_reporter_owner_admin" on public.ej_job_reports
  for select using (
    reporter_profile_id = (select auth.uid())
    or exists (select 1 from public.ej_jobs where id = job_id and client_id = (select auth.uid()))
    or (select private.ej_is_admin())
  );

create index if not exists ej_admin_audit_logs_admin_id_idx on public.ej_admin_audit_logs (admin_id);
create index if not exists ej_job_events_actor_id_idx on public.ej_job_events (actor_id);
create index if not exists ej_job_events_job_id_idx on public.ej_job_events (job_id);
create index if not exists ej_job_messages_job_id_idx on public.ej_job_messages (job_id);
create index if not exists ej_job_messages_sender_id_idx on public.ej_job_messages (sender_id);
create index if not exists ej_job_reports_reporter_profile_id_idx on public.ej_job_reports (reporter_profile_id);
create index if not exists ej_job_reviews_reviewee_id_idx on public.ej_job_reviews (reviewee_id);
create index if not exists ej_job_reviews_reviewer_id_idx on public.ej_job_reviews (reviewer_id);
create index if not exists ej_jobs_accepted_worker_id_idx on public.ej_jobs (accepted_worker_id);
create index if not exists ej_jobs_category_id_idx on public.ej_jobs (category_id);
create index if not exists ej_jobs_client_id_idx on public.ej_jobs (client_id);
create index if not exists ej_payment_records_job_id_idx on public.ej_payment_records (job_id);
create index if not exists ej_payment_records_user_id_idx on public.ej_payment_records (user_id);

drop policy if exists "admin_audit_admin_only" on public.ej_admin_audit_logs;
create policy "admin_audit_admin_only" on public.ej_admin_audit_logs
  for all using ((select private.ej_is_admin()))
  with check ((select private.ej_is_admin()));
