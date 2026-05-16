-- Harden ExpressJobs profile role updates.
-- This migration prevents authenticated users from self-promoting by updating
-- public.ej_profiles.role while preserving updates to safe profile fields.
-- It is intentionally idempotent because the same hardening may have been
-- applied manually in staging before the automated migration runner executes.

revoke update on table public.ej_profiles from anon;
revoke update on table public.ej_profiles from authenticated;
revoke update (id, role, reputation_score, completed_jobs, created_at) on table public.ej_profiles from anon;
revoke update (id, role, reputation_score, completed_jobs, created_at) on table public.ej_profiles from authenticated;

grant update (full_name, phone, city, updated_at) on table public.ej_profiles to authenticated;

drop policy if exists "profiles_update_own" on public.ej_profiles;
drop policy if exists "profiles_update_own_safe_fields" on public.ej_profiles;

create policy "profiles_update_own_safe_fields" on public.ej_profiles
  for update to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

create or replace function public.ej_prevent_profile_role_self_update()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.role() = 'authenticated' and new.role is distinct from old.role then
    raise exception 'EXPRESSJOBS_PROFILE_ROLE_UPDATE_BLOCKED'
      using errcode = '42501';
  end if;

  return new;
end;
$$;

revoke execute on function public.ej_prevent_profile_role_self_update() from anon;
revoke execute on function public.ej_prevent_profile_role_self_update() from authenticated;

drop trigger if exists ej_profiles_prevent_role_self_update on public.ej_profiles;

create trigger ej_profiles_prevent_role_self_update
  before update of role on public.ej_profiles
  for each row
  execute function public.ej_prevent_profile_role_self_update();
