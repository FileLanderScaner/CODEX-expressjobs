-- Re-apply Advisor closeout policies for marketplace extension tables.
-- This must run after 20260523093000 creates ej_company_profiles and
-- ej_job_reports; the MCP-applied 20260523064307 migration is ordered earlier.

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

create index if not exists ej_job_reports_reporter_profile_id_idx on public.ej_job_reports (reporter_profile_id);
