alter table public.ej_profiles
  add column if not exists neighborhood text,
  add column if not exists latitude double precision,
  add column if not exists longitude double precision,
  add column if not exists location_precision text not null default 'manual_city';

alter table public.ej_worker_profiles
  add column if not exists preferred_city text,
  add column if not exists preferred_neighborhood text,
  add column if not exists latitude double precision,
  add column if not exists longitude double precision,
  add column if not exists location_precision text not null default 'manual_city';

alter table public.ej_jobs
  add column if not exists city text,
  add column if not exists neighborhood text,
  add column if not exists address_private text,
  add column if not exists latitude double precision,
  add column if not exists longitude double precision,
  add column if not exists location_precision text not null default 'manual_neighborhood',
  add column if not exists max_distance_km integer not null default 10;

update public.ej_jobs
set city = split_part(location_text, ',', 1)
where city is null and location_text is not null;

create index if not exists ej_jobs_city_status_idx on public.ej_jobs (city, status);
create index if not exists ej_jobs_neighborhood_status_idx on public.ej_jobs (neighborhood, status);
create index if not exists ej_jobs_location_lat_lng_idx on public.ej_jobs (latitude, longitude) where latitude is not null and longitude is not null;
create index if not exists ej_worker_profiles_location_lat_lng_idx on public.ej_worker_profiles (latitude, longitude) where latitude is not null and longitude is not null;
