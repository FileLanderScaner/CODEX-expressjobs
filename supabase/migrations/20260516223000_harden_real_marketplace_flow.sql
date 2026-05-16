-- Harden real marketplace actions for client/worker flow.
-- Keeps public role selection limited to client/worker and adds atomic
-- application accept/reject operations that run under caller RLS.

drop policy if exists "applications_worker_insert" on public.ej_job_applications;
create policy "applications_worker_insert" on public.ej_job_applications
  for insert with check (
    worker_id = auth.uid()
    and exists (
      select 1
      from public.ej_profiles
      where id = auth.uid()
        and role = 'worker'
    )
    and exists (
      select 1
      from public.ej_jobs
      where id = job_id
        and status = 'open'
        and client_id <> auth.uid()
    )
  );

drop policy if exists "applications_update_client_only" on public.ej_job_applications;
create policy "applications_update_client_only" on public.ej_job_applications
  for update using (
    exists (select 1 from public.ej_jobs where id = job_id and client_id = auth.uid())
    or public.ej_is_admin()
  )
  with check (
    exists (select 1 from public.ej_jobs where id = job_id and client_id = auth.uid())
    or public.ej_is_admin()
  );

create or replace function public.ej_accept_job_application(requested_application_id uuid)
returns public.ej_job_applications
language plpgsql
security invoker
set search_path = public
as $$
declare
  selected_application public.ej_job_applications;
  selected_job public.ej_jobs;
begin
  if auth.uid() is null then
    raise exception 'EXPRESSJOBS_AUTH_REQUIRED'
      using errcode = '42501';
  end if;

  select *
    into selected_application
  from public.ej_job_applications
  where id = requested_application_id
  for update;

  if selected_application.id is null then
    raise exception 'EXPRESSJOBS_APPLICATION_NOT_FOUND'
      using errcode = 'P0002';
  end if;

  select *
    into selected_job
  from public.ej_jobs
  where id = selected_application.job_id
    and client_id = auth.uid()
  for update;

  if selected_job.id is null then
    raise exception 'EXPRESSJOBS_JOB_OWNER_REQUIRED'
      using errcode = '42501';
  end if;

  update public.ej_job_applications
  set status = 'rejected',
      updated_at = now()
  where job_id = selected_application.job_id
    and id <> selected_application.id
    and status = 'submitted';

  update public.ej_job_applications
  set status = 'accepted',
      updated_at = now()
  where id = selected_application.id
  returning * into selected_application;

  update public.ej_jobs
  set status = 'accepted',
      accepted_worker_id = selected_application.worker_id,
      updated_at = now()
  where id = selected_application.job_id
    and client_id = auth.uid();

  return selected_application;
end;
$$;

create or replace function public.ej_reject_job_application(requested_application_id uuid)
returns public.ej_job_applications
language plpgsql
security invoker
set search_path = public
as $$
declare
  selected_application public.ej_job_applications;
begin
  if auth.uid() is null then
    raise exception 'EXPRESSJOBS_AUTH_REQUIRED'
      using errcode = '42501';
  end if;

  update public.ej_job_applications
  set status = 'rejected',
      updated_at = now()
  where id = requested_application_id
    and exists (
      select 1
      from public.ej_jobs
      where id = public.ej_job_applications.job_id
        and client_id = auth.uid()
    )
  returning * into selected_application;

  if selected_application.id is null then
    raise exception 'EXPRESSJOBS_APPLICATION_NOT_FOUND_OR_FORBIDDEN'
      using errcode = '42501';
  end if;

  return selected_application;
end;
$$;

revoke execute on function public.ej_accept_job_application(uuid) from anon;
revoke execute on function public.ej_reject_job_application(uuid) from anon;
grant execute on function public.ej_accept_job_application(uuid) to authenticated;
grant execute on function public.ej_reject_job_application(uuid) to authenticated;
