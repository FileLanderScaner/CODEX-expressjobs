-- Compatibility migration for an existing Supabase Preview branch.
-- PR #44's preview branch applied this version before the staging MCP apply
-- recorded the canonical remote versions 20260523064307 and 20260523064405.
-- Keep this no-op file so Supabase Preview branch history can reconcile.

do $$ begin
  null;
end $$;
