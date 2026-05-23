-- ExpressJobs chat RLS admin SELECT policy.
-- Applied first on Supabase staging via MCP as remote migration 20260523030830.
-- Recorded locally with the same version to align Supabase CLI migration history.

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'ej_job_messages'
      and policyname = 'job_messages_select_admin_only'
  ) then
    execute 'create policy job_messages_select_admin_only on public.ej_job_messages for select to authenticated using (public.ej_is_admin())';
  end if;
end $$;

comment on policy job_messages_select_admin_only on public.ej_job_messages is
  'Allows authenticated admins to select job messages so admin-only update/delete smoke tests can verify affected rows via Supabase/PostgREST returning representations.';
