-- Fix admin job-message UPDATE/DELETE policies after private helper migration.
-- The Advisor closeout revoked direct execute on public.ej_is_admin(); these
-- policies must use the private helper or admin smoke tests fail.

drop policy if exists "job_messages_update_admin_only" on public.ej_job_messages;
drop policy if exists "job_messages_delete_admin_only" on public.ej_job_messages;
drop policy if exists "messages_update_admin_only" on public.ej_job_messages;
drop policy if exists "messages_delete_admin_only" on public.ej_job_messages;

create policy "job_messages_update_admin_only" on public.ej_job_messages
  for update to authenticated
  using ((select private.ej_is_admin()))
  with check ((select private.ej_is_admin()));

create policy "job_messages_delete_admin_only" on public.ej_job_messages
  for delete to authenticated
  using ((select private.ej_is_admin()));
