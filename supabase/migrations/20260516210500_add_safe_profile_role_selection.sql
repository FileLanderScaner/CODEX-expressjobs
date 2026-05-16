-- Allow authenticated users to choose their public marketplace role safely.
-- This function permits only client/worker and never permits admin assignment.
-- It avoids direct browser updates to ej_profiles.role while preserving the
-- previous RLS hardening against arbitrary role updates.

create or replace function public.ej_set_profile_role(requested_role text, requested_full_name text default null)
returns public.ej_profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  current_user_id uuid := auth.uid();
  safe_role public.ej_user_role;
  safe_full_name text;
  result_profile public.ej_profiles;
begin
  if current_user_id is null then
    raise exception 'EXPRESSJOBS_AUTH_REQUIRED'
      using errcode = '42501';
  end if;

  if requested_role not in ('client', 'worker') then
    raise exception 'EXPRESSJOBS_INVALID_PUBLIC_ROLE'
      using errcode = '22023';
  end if;

  safe_role := requested_role::public.ej_user_role;
  safe_full_name := nullif(trim(coalesce(requested_full_name, '')), '');

  insert into public.ej_profiles (id, role, full_name)
  values (current_user_id, safe_role, coalesce(safe_full_name, 'Usuario Trabajos Rapidos'))
  on conflict (id) do update
    set role = excluded.role,
        full_name = coalesce(safe_full_name, public.ej_profiles.full_name),
        updated_at = now()
  where public.ej_profiles.id = current_user_id
    and excluded.role in ('client', 'worker');

  select * into result_profile
  from public.ej_profiles
  where id = current_user_id;

  return result_profile;
end;
$$;

revoke execute on function public.ej_set_profile_role(text, text) from anon;
grant execute on function public.ej_set_profile_role(text, text) to authenticated;
