-- Marketplace core profile extensions for staging/preview.
-- Non-destructive: adds company profiles, job reports, indexes, and broader
-- application review states without relaxing existing RLS.

do $$ begin
  alter table public.ej_job_applications
    drop constraint if exists ej_job_applications_status_check;

  alter table public.ej_job_applications
    add constraint ej_job_applications_status_check
    check (status in ('submitted', 'viewed', 'shortlisted', 'accepted', 'rejected', 'withdrawn'));
end $$;

create table if not exists public.ej_company_profiles (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references public.ej_profiles(id) on delete cascade,
  company_name text not null,
  company_type text not null default 'individual' check (company_type in ('individual', 'business')),
  business_category text not null,
  contact_phone text not null,
  city text not null,
  address_optional text,
  description text not null,
  verification_status text not null default 'unverified' check (verification_status in ('unverified', 'pending', 'verified', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ej_job_reports (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.ej_jobs(id) on delete cascade,
  reporter_profile_id uuid not null references public.ej_profiles(id) on delete cascade,
  reason text not null,
  status text not null default 'open' check (status in ('open', 'reviewed', 'dismissed')),
  created_at timestamptz not null default now()
);

create index if not exists ej_jobs_status_created_at_idx on public.ej_jobs (status, created_at desc);
create index if not exists ej_job_applications_worker_status_idx on public.ej_job_applications (worker_id, status, created_at desc);
create index if not exists ej_job_applications_job_status_idx on public.ej_job_applications (job_id, status, created_at desc);
create index if not exists ej_company_profiles_profile_idx on public.ej_company_profiles (profile_id);
create index if not exists ej_job_reports_job_idx on public.ej_job_reports (job_id);

alter table public.ej_company_profiles enable row level security;
alter table public.ej_job_reports enable row level security;

drop policy if exists "company_profiles_select_own_or_admin" on public.ej_company_profiles;
create policy "company_profiles_select_own_or_admin" on public.ej_company_profiles
  for select using (profile_id = auth.uid() or public.ej_is_admin());

drop policy if exists "company_profiles_insert_own_client" on public.ej_company_profiles;
create policy "company_profiles_insert_own_client" on public.ej_company_profiles
  for insert with check (
    profile_id = auth.uid()
    and exists (
      select 1
      from public.ej_profiles
      where id = auth.uid()
        and role = 'client'
    )
  );

drop policy if exists "company_profiles_update_own_client" on public.ej_company_profiles;
create policy "company_profiles_update_own_client" on public.ej_company_profiles
  for update using (profile_id = auth.uid() or public.ej_is_admin())
  with check (profile_id = auth.uid() or public.ej_is_admin());

drop policy if exists "job_reports_insert_authenticated" on public.ej_job_reports;
create policy "job_reports_insert_authenticated" on public.ej_job_reports
  for insert with check (
    reporter_profile_id = auth.uid()
    and exists (select 1 from public.ej_jobs where id = job_id)
  );

drop policy if exists "job_reports_select_reporter_owner_admin" on public.ej_job_reports;
create policy "job_reports_select_reporter_owner_admin" on public.ej_job_reports
  for select using (
    reporter_profile_id = auth.uid()
    or exists (select 1 from public.ej_jobs where id = job_id and client_id = auth.uid())
    or public.ej_is_admin()
  );
