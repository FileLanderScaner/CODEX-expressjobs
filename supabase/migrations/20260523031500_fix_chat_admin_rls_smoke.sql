-- ExpressJobs realtime chat RLS smoke fixes.
-- Applied first on Supabase staging via MCP, then recorded here to prevent schema drift.
-- Scope:
-- 1. Prevent recursive RLS evaluation in admin helper.
-- 2. Allow admins to SELECT job messages so admin UPDATE/DELETE can be verified by Supabase/PostgREST returning rows.

create or replace function public.ej_is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $function$
  select exists (
    select 1
    from public.ej_profiles
    where id = auth.uid()
      and role = 'admin'
  );
$function$;

comment on function public.ej_is_admin() is
  'Security-definer helper used by RLS policies to avoid recursive ej_profiles policy evaluation while checking admin role.';

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
