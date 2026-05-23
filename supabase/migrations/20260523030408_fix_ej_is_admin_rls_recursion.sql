-- ExpressJobs chat RLS admin helper recursion fix.
-- Applied first on Supabase staging via MCP as remote migration 20260523030408.
-- Recorded locally with the same version to align Supabase CLI migration history.

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
