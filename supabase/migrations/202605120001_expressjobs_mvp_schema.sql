create extension if not exists pgcrypto;

do $$ begin
  create type public.ej_user_role as enum ('client', 'worker', 'admin');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.ej_job_status as enum (
    'draft',
    'open',
    'applied',
    'accepted',
    'in_progress',
    'completed',
    'cancelled',
    'disputed'
  );
exception when duplicate_object then null;
end $$;

create table if not exists public.ej_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.ej_user_role not null default 'client',
  full_name text not null,
  phone text,
  city text,
  reputation_score numeric(3,2) not null default 0 check (reputation_score >= 0 and reputation_score <= 5),
  completed_jobs integer not null default 0 check (completed_jobs >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ej_worker_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.ej_profiles(id) on delete cascade,
  headline text not null,
  bio text,
  skills text[] not null default '{}',
  service_radius_km integer not null default 10 check (service_radius_km between 1 and 100),
  hourly_rate_uyu integer check (hourly_rate_uyu is null or hourly_rate_uyu >= 0),
  is_available boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ej_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.ej_jobs (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.ej_profiles(id) on delete cascade,
  category_id uuid references public.ej_categories(id),
  title text not null,
  description text not null,
  location_text text not null,
  budget_uyu integer check (budget_uyu is null or budget_uyu >= 0),
  status public.ej_job_status not null default 'draft',
  accepted_worker_id uuid references public.ej_profiles(id),
  starts_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint ej_jobs_accepted_worker_required check (
    status not in ('accepted', 'in_progress', 'completed') or accepted_worker_id is not null
  )
);

create table if not exists public.ej_job_applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.ej_jobs(id) on delete cascade,
  worker_id uuid not null references public.ej_profiles(id) on delete cascade,
  message text not null,
  proposed_amount_uyu integer check (proposed_amount_uyu is null or proposed_amount_uyu >= 0),
  status text not null default 'submitted' check (status in ('submitted', 'accepted', 'rejected', 'withdrawn')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (job_id, worker_id)
);

create table if not exists public.ej_job_messages (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.ej_jobs(id) on delete cascade,
  sender_id uuid not null references public.ej_profiles(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.ej_job_reviews (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.ej_jobs(id) on delete cascade,
  reviewer_id uuid not null references public.ej_profiles(id) on delete cascade,
  reviewee_id uuid not null references public.ej_profiles(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now(),
  unique (job_id, reviewer_id, reviewee_id)
);

create table if not exists public.ej_job_events (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references public.ej_jobs(id) on delete cascade,
  actor_id uuid references public.ej_profiles(id) on delete set null,
  event_name text not null,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.ej_payment_records (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references public.ej_jobs(id) on delete set null,
  user_id uuid references public.ej_profiles(id) on delete set null,
  kind text not null check (kind in ('commission_estimate', 'featured_job', 'worker_premium', 'company_plan')),
  amount_uyu integer check (amount_uyu is null or amount_uyu >= 0),
  status text not null default 'disabled' check (status in ('disabled', 'simulated', 'pending', 'paid', 'failed', 'refunded')),
  provider text not null default 'none',
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.ej_admin_audit_logs (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid references public.ej_profiles(id) on delete set null,
  action text not null,
  target_table text,
  target_id uuid,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.ej_profiles enable row level security;
alter table public.ej_worker_profiles enable row level security;
alter table public.ej_categories enable row level security;
alter table public.ej_jobs enable row level security;
alter table public.ej_job_applications enable row level security;
alter table public.ej_job_messages enable row level security;
alter table public.ej_job_reviews enable row level security;
alter table public.ej_job_events enable row level security;
alter table public.ej_payment_records enable row level security;
alter table public.ej_admin_audit_logs enable row level security;

create or replace function public.ej_is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1 from public.ej_profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

create or replace function public.ej_is_job_participant(job uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1 from public.ej_jobs
    where id = job
      and (client_id = auth.uid() or accepted_worker_id = auth.uid())
  );
$$;

drop policy if exists "profiles_select_own_or_admin" on public.ej_profiles;
create policy "profiles_select_own_or_admin" on public.ej_profiles
  for select using (id = auth.uid() or public.ej_is_admin());

drop policy if exists "profiles_insert_own" on public.ej_profiles;
create policy "profiles_insert_own" on public.ej_profiles
  for insert with check (id = auth.uid());

drop policy if exists "profiles_update_own" on public.ej_profiles;
create policy "profiles_update_own" on public.ej_profiles
  for update using (id = auth.uid()) with check (id = auth.uid());

drop policy if exists "worker_profiles_select_available" on public.ej_worker_profiles;
create policy "worker_profiles_select_available" on public.ej_worker_profiles
  for select using (is_available = true or user_id = auth.uid() or public.ej_is_admin());

drop policy if exists "worker_profiles_manage_own" on public.ej_worker_profiles;
create policy "worker_profiles_manage_own" on public.ej_worker_profiles
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists "categories_read_active" on public.ej_categories;
create policy "categories_read_active" on public.ej_categories
  for select using (is_active = true or public.ej_is_admin());

drop policy if exists "jobs_select_visible" on public.ej_jobs;
create policy "jobs_select_visible" on public.ej_jobs
  for select using (
    status = 'open'
    or client_id = auth.uid()
    or accepted_worker_id = auth.uid()
    or public.ej_is_admin()
  );

drop policy if exists "jobs_client_insert" on public.ej_jobs;
create policy "jobs_client_insert" on public.ej_jobs
  for insert with check (client_id = auth.uid());

drop policy if exists "jobs_client_update" on public.ej_jobs;
create policy "jobs_client_update" on public.ej_jobs
  for update using (client_id = auth.uid() or public.ej_is_admin())
  with check (client_id = auth.uid() or public.ej_is_admin());

drop policy if exists "applications_worker_insert" on public.ej_job_applications;
create policy "applications_worker_insert" on public.ej_job_applications
  for insert with check (
    worker_id = auth.uid()
    and exists (select 1 from public.ej_jobs where id = job_id and status = 'open')
  );

drop policy if exists "applications_select_parties" on public.ej_job_applications;
create policy "applications_select_parties" on public.ej_job_applications
  for select using (
    worker_id = auth.uid()
    or exists (select 1 from public.ej_jobs where id = job_id and client_id = auth.uid())
    or public.ej_is_admin()
  );

drop policy if exists "applications_update_client_only" on public.ej_job_applications;
create policy "applications_update_client_only" on public.ej_job_applications
  for update using (
    exists (select 1 from public.ej_jobs where id = job_id and client_id = auth.uid())
    or public.ej_is_admin()
  );

drop policy if exists "messages_select_participants" on public.ej_job_messages;
create policy "messages_select_participants" on public.ej_job_messages
  for select using (public.ej_is_job_participant(job_id) or public.ej_is_admin());

drop policy if exists "messages_insert_participants" on public.ej_job_messages;
create policy "messages_insert_participants" on public.ej_job_messages
  for insert with check (sender_id = auth.uid() and public.ej_is_job_participant(job_id));

drop policy if exists "reviews_select_participants" on public.ej_job_reviews;
create policy "reviews_select_participants" on public.ej_job_reviews
  for select using (public.ej_is_job_participant(job_id) or public.ej_is_admin());

drop policy if exists "reviews_insert_completed_participants" on public.ej_job_reviews;
create policy "reviews_insert_completed_participants" on public.ej_job_reviews
  for insert with check (
    reviewer_id = auth.uid()
    and exists (select 1 from public.ej_jobs where id = job_id and status = 'completed')
    and public.ej_is_job_participant(job_id)
  );

drop policy if exists "events_insert_authenticated" on public.ej_job_events;
create policy "events_insert_authenticated" on public.ej_job_events
  for insert with check (auth.uid() is not null and (actor_id = auth.uid() or actor_id is null));

drop policy if exists "events_select_participants" on public.ej_job_events;
create policy "events_select_participants" on public.ej_job_events
  for select using (job_id is null or public.ej_is_job_participant(job_id) or public.ej_is_admin());

drop policy if exists "payment_records_select_own_or_admin" on public.ej_payment_records;
create policy "payment_records_select_own_or_admin" on public.ej_payment_records
  for select using (user_id = auth.uid() or public.ej_is_admin());

drop policy if exists "admin_audit_admin_only" on public.ej_admin_audit_logs;
create policy "admin_audit_admin_only" on public.ej_admin_audit_logs
  for all using (public.ej_is_admin()) with check (public.ej_is_admin());

insert into public.ej_categories (name, slug)
values
  ('Mudanzas', 'mudanzas'),
  ('Limpieza', 'limpieza'),
  ('Reparaciones', 'reparaciones'),
  ('Jardineria', 'jardineria'),
  ('Delivery local', 'delivery-local'),
  ('Tecnologia', 'tecnologia'),
  ('Eventos', 'eventos'),
  ('Cuidado de mascotas', 'cuidado-de-mascotas')
on conflict (slug) do nothing;
