# ExpressJobs PR Reconciliation - 2026-05-26

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Git Context

- Canonical repo inspected: `FileLanderScaner/CODEX-expressjobs`.
- Local working repo: `C:\CODEX-expressjobs-repo`.
- `C:\CODEX-expressjobs` exists but is not a Git repository.
- Current local branch: `codex/expressjobs-product-ux-review-after-redesign`.
- Current branch has no open PR and is one commit ahead of PR #50 branch.
- `origin/main` is `dfb1bac Prepare Google OAuth account separation (#47)`.
- `git fetch --all --prune` fetched `origin` but `neworigin` failed with repository not found. No remotes were changed.

## PR Matrix

| PR | Title | State | Merged | Base / head | Checks | Risk | Recommendation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| #50 | Codex/expressjobs global soft premium redesign manual | Open | No | `main` / `codex/expressjobs-global-soft-premium-redesign-manual` | GitHub/Vercel checks PASS, Supabase Preview SKIPPED, review required | Medium: broad UX diff, one P2 review comment in `job-card.tsx` | Use as primary visual source; continue on current branch, fix P2, then open/update follow-up PR |
| #49 | Refresh premium visual home and navigation | Open | No | `main` / `codex/premium-visual-home-nav-refresh` | PASS | Low/medium: subset now superseded by #50 | Do not merge separately before #50 decision; mark as superseded by #50 if #50/follow-up lands |
| #48 | Define ExpressJobs visual system directive | Open | No | `main` / `codex/visual-system-directive` | PASS | Low: docs-only directive | Keep as reference or fold into the #50/follow-up design docs |
| #47 | Prepare Google OAuth account separation | Merged | Yes | `main` / `codex/google-oauth-account-separation-only` | PASS | Low: already in `main` | Treat as canonical Google/account baseline |
| #46 | Hide inactive Google login in previews | Merged | Yes | `main` / `codex/expressjobs-hide-inactive-google-login` | PASS | Low: current human feedback reaffirms no dead OAuth buttons | Preserve behavior: inactive OAuth must not render dead buttons |
| #44 | Prepare Supabase advisor closeout migration | Merged | Yes | `main` / `codex/expressjobs-supabase-security-advisor-closeout` | PASS | Medium historical DB/security work | Treat as merged baseline; no remote migration in this cycle |
| #42 | Build ExpressJobs marketplace core workflows | Merged | Yes | `main` / `codex/expressjobs-marketplace-core-workflows` | PASS | Medium: marketplace DB/UI surface | Treat as merged marketplace baseline |
| #41 | Validate ExpressJobs pricing and staging RLS smoke | Merged | Yes | `main` / `codex/expressjobs-rls-smoke-staging` | PASS | Low historical validation | Treat as merged validation baseline |
| #40 | Complete ExpressJobs Supabase web app flow | Open | No | `main` / `codex/expressjobs-full-site-supabase-completion` | Vercel FAILURE, Supabase Preview SKIPPED | High: conflicting, 123 files, Android wrapper mixed with web/Supabase flow, multiple P1/P2 review comments | Do not merge. Extract only still-relevant ideas manually after review; likely close as superseded later |

## Visual Source Decision

PR #50 is the current primary visual source because it includes #49 commits plus the broader global redesign. PR #49 is a partial predecessor. PR #48 is a design directive document and should not drive code duplication by itself.

The local branch `codex/expressjobs-product-ux-review-after-redesign` is the safest continuation point for this cycle because it already builds on #50 and adds a product UX review commit.

## Actions Taken

- No PR was merged.
- No PR was closed.
- No GitHub comments were posted.
- No branch was deleted.
- No remote was changed.
- The #50 P2 staging-title matcher issue was fixed locally.
- Current docs were updated to reflect GitHub state instead of stale local-only assumptions.
