-- Victoriosa Store homepage banner is a frontend-only change.
-- This no-op migration is intentionally empty so Supabase Preview detects the
-- repository workdir for PR #64 without changing schema, RLS, policies,
-- functions, grants, data, or extensions.

select 1 as victoriosa_banner_noop;
