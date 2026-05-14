# Project Director Status

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

ExpressJobs / Trabajos Rapidos is `PASS_FOR_FIRST_10_CONTROLLED_INTERNAL`.

- Supabase staging RLS smoke: PASS
- Vercel Preview deploy: READY (`https://codex-expressjobs-egq4jtl0u-akuma424-projects.vercel.app`)
- Preview browser smoke: PASS with protected access bypass header
- First 10 tester package: READY
- First 10 execution dry-run: PASS
- First 10 contact package: READY
- First 10 manual approval gate: READY_FOR_HUMAN_APPROVAL
- First 10 testers: GO_CONTROLLED_INTERNAL_ONLY, manual/internal only
- Real tester contact: READY_FOR_MANUAL_APPROVAL
- Search path fix: APPLIED
- Security Advisor recheck: PENDING_OR_NOT_RECHECKED
- Social auth phase 1: CODE_READY_PROVIDER_CONFIG_PENDING
- Google login: PREVIEW_SMOKE_PASS
- Google auth smoke: PASS
- Google redirect URI mismatch resolved: yes
- Google OAuth redirect_to fix: APPLIED
- Google OAuth redirect_to host: current Preview
- Google staging/test account: confirmed by operator, not recorded in git
- Google callback reached: yes
- Google session created: yes
- Google profile created or present: yes
- Google final redirect: /role
- Release gate: PASS_FOR_FIRST_10_CONTROLLED_INTERNAL
- Facebook login: CONFIG_PENDING
- Instagram login: RESEARCH_PENDING
- Production: NO-GO_PRODUCTION
- Next mode: EXPRESSJOBS_FIRST_10_MANUAL_CONTACT_APPROVAL_GATE
