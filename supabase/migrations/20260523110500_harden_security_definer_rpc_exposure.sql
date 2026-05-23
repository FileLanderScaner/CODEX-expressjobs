-- Harden SECURITY DEFINER RPC exposure flagged by Supabase security lints.
-- Non-destructive and staging-safe: revokes public/anon execution from
-- sensitive helpers, keeps the role-selection RPC authenticated-only, and
-- blocks role switching after marketplace activity exists.

revoke execute on function public.ej_prevent_profile_role_self_update() from public;
revoke execute on function public.ej_prevent_profile_role_self_update() from anon;
revoke execute on function public.ej_prevent_profile_role_self_update() from authenticated;

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
  current_profile public.ej_profiles;
  has_marketplace_activity boolean := false;
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

  safe_full_name := nullif(trim(coalesce(requested_full_name, '')), '');

  if safe_full_name is not null and char_length(safe_full_name) > 120 then
    raise exception 'EXPRESSJOBS_INVALID_FULL_NAME'
      using errcode = '22023';
  end if;

  safe_role := requested_role::public.ej_user_role;

  select *
    into current_profile
  from public.ej_profiles
  where id = current_user_id;

  if current_profile.id is not null and current_profile.role is distinct from safe_role then
    select exists (select 1 from public.ej_jobs where client_id = current_user_id)
      or exists (select 1 from public.ej_job_applications where worker_id = current_user_id)
      or exists (select 1 from public.ej_worker_profiles where user_id = current_user_id)
      or exists (select 1 from public.ej_company_profiles where profile_id = current_user_id)
    into has_marketplace_activity;

    if has_marketplace_activity then
      raise exception 'EXPRESSJOBS_ROLE_CHANGE_LOCKED'
        using errcode = '42501';
    end if;
  end if;

  insert into public.ej_profiles (id, role, full_name)
  values (current_user_id, safe_role, coalesce(safe_full_name, 'Usuario Trabajos Rapidos'))
  on conflict (id) do update
    set role = safe_role,
        full_name = coalesce(safe_full_name, public.ej_profiles.full_name),
        updated_at = now()
  where public.ej_profiles.id = current_user_id;

  select *
    into result_profile
  from public.ej_profiles
  where id = current_user_id;

  return result_profile;
end;
$$;

revoke execute on function public.ej_set_profile_role(text, text) from public;
revoke execute on function public.ej_set_profile_role(text, text) from anon;
revoke execute on function public.ej_set_profile_role(text, text) from authenticated;
grant execute on function public.ej_set_profile_role(text, text) to authenticated;

drop policy if exists "jobs_client_insert" on public.ej_jobs;
create policy "jobs_client_insert" on public.ej_jobs
  for insert with check (
    client_id = auth.uid()
    and exists (
      select 1
      from public.ej_profiles
      where id = auth.uid()
        and role = 'client'
    )
  );
