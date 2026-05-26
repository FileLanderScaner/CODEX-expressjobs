-- Final closeout for Supabase Advisor authenticated SECURITY DEFINER RPC exposure.
-- Role selection now goes through the server-side /api/profile/set-role route.
-- The public user-facing RPC is no longer executable by authenticated clients.
-- A service-role-only RPC receives the authenticated user id from the server route.

create or replace function public.ej_set_profile_role_for_user(
  target_user_id uuid,
  requested_role text,
  requested_full_name text default null
)
returns public.ej_profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  safe_role public.ej_user_role;
  safe_full_name text;
  current_profile public.ej_profiles;
  has_marketplace_activity boolean := false;
  result_profile public.ej_profiles;
begin
  if target_user_id is null then
    raise exception 'EXPRESSJOBS_TARGET_USER_REQUIRED'
      using errcode = '42501';
  end if;

  if requested_role not in ('client', 'worker') then
    raise exception 'EXPRESSJOBS_INVALID_PUBLIC_ROLE'
      using errcode = '22023';
  end if;

  safe_full_name := nullif(trim(coalesce(requested_full_name, '')), '');

  if safe_full_name is not null and char_length(safe_full_name) > 120 then
    raise exception 'EXPRESSJOBS_INVALID_FULL_NAME'
      using errcode = '22023';
  end if;

  safe_role := requested_role::public.ej_user_role;

  select *
    into current_profile
  from public.ej_profiles
  where id = target_user_id;

  if current_profile.id is not null and current_profile.role is distinct from safe_role then
    select exists (select 1 from public.ej_jobs where client_id = target_user_id)
      or exists (select 1 from public.ej_job_applications where worker_id = target_user_id)
      or exists (select 1 from public.ej_worker_profiles where user_id = target_user_id)
      or exists (select 1 from public.ej_company_profiles where profile_id = target_user_id)
    into has_marketplace_activity;

    if has_marketplace_activity then
      raise exception 'EXPRESSJOBS_ROLE_CHANGE_LOCKED'
        using errcode = '42501';
    end if;
  end if;

  insert into public.ej_profiles (id, role, full_name)
  values (target_user_id, safe_role, coalesce(safe_full_name, 'Usuario Trabajos Rapidos'))
  on conflict (id) do update
    set role = safe_role,
        full_name = coalesce(safe_full_name, public.ej_profiles.full_name),
        updated_at = now()
  where public.ej_profiles.id = target_user_id;

  select *
    into result_profile
  from public.ej_profiles
  where id = target_user_id;

  return result_profile;
end;
$$;

revoke execute on function public.ej_set_profile_role(text, text) from public;
revoke execute on function public.ej_set_profile_role(text, text) from anon;
revoke execute on function public.ej_set_profile_role(text, text) from authenticated;

revoke execute on function public.ej_set_profile_role_for_user(uuid, text, text) from public;
revoke execute on function public.ej_set_profile_role_for_user(uuid, text, text) from anon;
revoke execute on function public.ej_set_profile_role_for_user(uuid, text, text) from authenticated;
grant execute on function public.ej_set_profile_role_for_user(uuid, text, text) to service_role;