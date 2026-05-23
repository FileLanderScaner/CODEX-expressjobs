-- Remote MCP-applied migration version for company/report Advisor policies.
-- In fresh preview branches this version sorts before 20260523093000, so it
-- must be guarded until ej_company_profiles and ej_job_reports exist. The
-- post-creation reapply lives in 20260523120500.

do $$
begin
  if to_regclass('public.ej_company_profiles') is not null then
    execute 'drop policy if exists "company_profiles_select_own_or_admin" on public.ej_company_profiles';
    execute 'create policy "company_profiles_select_own_or_admin" on public.ej_company_profiles for select using (profile_id = (select auth.uid()) or (select private.ej_is_admin()))';

    execute 'drop policy if exists "company_profiles_insert_own_client" on public.ej_company_profiles';
    execute 'create policy "company_profiles_insert_own_client" on public.ej_company_profiles for insert with check (profile_id = (select auth.uid()) and exists (select 1 from public.ej_profiles where id = (select auth.uid()) and role = ''client''))';

    execute 'drop policy if exists "company_profiles_update_own_client" on public.ej_company_profiles';
    execute 'create policy "company_profiles_update_own_client" on public.ej_company_profiles for update using (profile_id = (select auth.uid()) or (select private.ej_is_admin())) with check (profile_id = (select auth.uid()) or (select private.ej_is_admin()))';
  end if;

  if to_regclass('public.ej_job_reports') is not null then
    execute 'drop policy if exists "job_reports_insert_authenticated" on public.ej_job_reports';
    execute 'create policy "job_reports_insert_authenticated" on public.ej_job_reports for insert with check (reporter_profile_id = (select auth.uid()) and exists (select 1 from public.ej_jobs where id = job_id))';

    execute 'drop policy if exists "job_reports_select_reporter_owner_admin" on public.ej_job_reports';
    execute 'create policy "job_reports_select_reporter_owner_admin" on public.ej_job_reports for select using (reporter_profile_id = (select auth.uid()) or exists (select 1 from public.ej_jobs where id = job_id and client_id = (select auth.uid())) or (select private.ej_is_admin()))';

    execute 'create index if not exists ej_job_reports_reporter_profile_id_idx on public.ej_job_reports (reporter_profile_id)';
  end if;
end $$;
