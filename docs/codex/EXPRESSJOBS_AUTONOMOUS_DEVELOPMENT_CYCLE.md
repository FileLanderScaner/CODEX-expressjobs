# EXPRESSJOBS_AUTONOMOUS_DEVELOPMENT_CYCLE.md

**Project:** ExpressJobs (Trabajos Rápidos)

**Objective:** Define the complete autonomous pipeline from current state to safe production

**Status:** `CYCLE_DESIGN_COMPLETE_AWAITING_P0_EXECUTION`

**Timestamp:** 2026-05-15 16:50:24Z

---

## Overview

Four phases from security hardening to production:

```
P0: RLS Hardening
    ↓ (fix security blocker)
P1: Production Closeout
    ↓ (configure & test)
P2: Final Gate
    ↓ (verify all checks)
Production Deploy
    ↓ (human `vercel --prod`)
Live Production
```

---

## P0: RLS Hardening Apply + Smoke Pass

### Objective
Apply RLS role escalation fix to staging, run real smoke tests, verify self-promotion is blocked.

### Current Status
- Issue #10: Open (RLS blocker identified)
- Issue #18: Open (Supabase write capability needed)
- Migration: Prepared but not applied
- Blocker: BLOCKED_SUPABASE_WRITE_CAPABILITY

### Execution Steps

#### Step 1: Unblock Supabase Write Capability
**Responsibility:** Human

**Options:**
- **A:** Supabase CLI token locally
- **B:** Supabase MCP re-auth
- **C:** Manual SQL via dashboard

**Time:** 3-7 minutes

**Success:** Migration file applied to `gnsfyvsodslnehszanra`

---

#### Step 2: Verify Pre-Apply
**Responsibility:** Codex (automated)

**Script:**
```bash
npm run secret:scan             # ✅ No secrets in git
npm run staging:check           # ✅ Env vars present
npm run test:rls:static         # ✅ Schema structure OK
npm run production:check        # ✅ Prod config OK
git diff --check                # ✅ No whitespace issues
```

**Success:** All checks PASS

---

#### Step 3: Verify Post-Apply
**Responsibility:** Codex (automated)

**Supabase Checks:**
```sql
-- New policy exists
SELECT COUNT(*) FROM pg_policies 
WHERE tablename = 'ej_profiles' 
AND policyname = 'profiles_update_own_safe_fields';
-- Expected: 1

-- Old policy gone
SELECT COUNT(*) FROM pg_policies 
WHERE tablename = 'ej_profiles' 
AND policyname = 'profiles_update_own';
-- Expected: 0

-- Trigger exists
SELECT COUNT(*) FROM information_schema.triggers 
WHERE event_object_table = 'ej_profiles'
AND trigger_name = 'ej_profiles_prevent_role_self_update';
-- Expected: 1

-- RLS enabled
SELECT relrowsecurity FROM pg_class WHERE relname = 'ej_profiles';
-- Expected: true
```

**Success:** All checks return expected values

---

#### Step 4: Run RLS Smoke Tests
**Responsibility:** Codex (automated)

**Script:**
```bash
npm run rls:smoke
```

**Critical Test Cases:**
1. ✅ Anonymous cannot create profile
2. ✅ Client can create own job
3. ✅ Worker can apply for job
4. ✅ Client can accept application
5. ✅ Worker cannot self-promote to admin
6. ✅ Client cannot self-promote to admin
7. ✅ Admin can view audit logs
8. ✅ Normal user cannot view audit logs
9. ✅ User can update safe fields (full_name, phone, city)
10. ✅ User cannot update role field

**Success:** EXPRESSJOBS_RLS_STAGING_PASS

---

#### Step 5: Full Gate
**Responsibility:** Codex (automated)

**Script:**
```bash
npm run lint && \
npm run typecheck && \
npm run test && \
npm run build && \
npm run secret:scan && \
npm run production:check && \
git diff --check
```

**Success:** All return exit code 0

---

#### Step 6: Issue Updates & Docs
**Responsibility:** Codex (automated)

**Updates:**
- Issue #10: `RLS_ROLE_ESCALATION_FIX=APPLIED_AND_SMOKE_PASS`
- Issue #17: `P0_COMPLETE_READY_FOR_P1`
- Issue #18: `MIGRATION_APPLIED_TO_STAGING`
- Create: `docs/security/EXPRESSJOBS_RLS_VERIFICATION.md`
- Update: `docs/expressjobs-director-status.json`
- Commit: `git commit -m "Verify ExpressJobs RLS hardening in staging"`

**Success:** All updates complete, git pushed

---

### P0 Success Criteria

```
✅ RLS_ROLE_ESCALATION_FIX = APPLIED_AND_SMOKE_PASS
✅ Migration applied to staging
✅ All smoke tests pass
✅ Client/worker self-promotion blocked
✅ Admin audit logs protected
✅ Safe profile fields still updatable
✅ All code checks pass (lint, type, test, build)
✅ Issues updated
✅ Production status: READY_FOR_P1
```

### P0 Timeline
- Human unblock: 3-7 min
- Codex execution: 10-15 min
- **Total: 15-25 minutes**

---

## P1: Production Closeout Fast Path

### Objective
Configure production environment, verify Preview works, prepare for P2 gate.

### Current Status
- Vercel Preview: Active (staging)
- Production env: Not configured
- Google Auth: Preview configured
- Payments: Disabled (safe default)
- AI Agents: Disabled (safe default)

### Execution Steps

#### Step 1: Configure Production Environment Variables

**File:** `vercel.json` (production section)

**Safe Defaults:**

```json
{
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase_staging_url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase_staging_anon_key",
    "ENABLE_PAYMENTS": "false",
    "AI_AGENTS_OFF": "true",
    "EXPRESSJOBS_PRODUCTION_STATUS": "SAFE_LAUNCH"
  }
}
```

**Rationale:**
- Supabase: Using staging (safer for first launch)
- Payments: Disabled (can enable later after separate gate)
- AI Agents: Disabled (can enable later)
- Status: Safe launch configuration

**Responsibility:** Codex + Human Review

---

#### Step 2: Test Preview Deployment

**Script:**
```bash
vercel preview --prod  # Get preview URL
```

**Test Flow:**
1. Open preview URL
2. Click "Sign in with Google"
3. Complete Google auth
4. Land on `/role` (role selection)
5. Fill profile
6. Verify no payment CTAs visible
7. Navigate dashboard
8. Check browser console: no errors
9. Check network tab: no 500 errors

**Success:** All tests pass, no errors

---

#### Step 3: Configure Google Auth Production Redirect

**Location:** Google Cloud Console

**Settings:**
- Authorized JavaScript origins: `https://codex-expressjobs.vercel.app`
- Authorized redirect URIs: `https://codex-expressjobs.vercel.app/auth/callback`

**Responsibility:** Human

---

#### Step 4: Verify Production Env Vars (No Secrets)

**Script:**
```bash
vercel env list           # List var names only (no values)
# Do NOT run: vercel env pull production
```

**Checklist:**
- ✅ All required vars present
- ✅ No service-role keys in production
- ✅ Anon key only (not service-role)
- ✅ No test values
- ✅ No staging URLs in production
- ✅ ENABLE_PAYMENTS=false
- ✅ AI_AGENTS_OFF=true

**Success:** All checks pass

---

#### Step 5: Production Readiness Docs

**Create:**
- `docs/production/EXPRESSJOBS_PRODUCTION_READINESS.md`
- `docs/production/EXPRESSJOBS_PRODUCTION_CHECKLIST.md`

**Document:**
- Current configuration
- Safe launch scope
- Payment upgrade path
- AI agent upgrade path
- Monitoring setup

**Responsibility:** Codex

---

### P1 Success Criteria

```
✅ Production env vars configured
✅ Preview tested and working
✅ Google Auth redirect configured
✅ No secrets in production env
✅ Payment CTA hidden
✅ AI agents disabled
✅ Production readiness docs created
✅ Ready for P2 final gate
```

### P1 Timeline
- Configuration: 5 min
- Testing: 10 min
- Documentation: 5 min
- **Total: 20 minutes**

---

## P2: Final Gate + Production Readiness

### Objective
Run all checks one final time, generate readiness report, await human approval for production deploy.

### Execution Steps

#### Step 1: Complete Test Suite

**Script:**
```bash
npm run secret:scan && \
npm run staging:check && \
npm run test:rls:static && \
npm run rls:smoke && \
npm run lint && \
npm run typecheck && \
npm run test && \
npm run build && \
npm run production:check && \
git diff --check
```

**Expected:** All PASS

---

#### Step 2: Production Readiness Report

**Generate:**
```
# ExpressJobs Production Readiness Report

## P2 Final Gate Results
- All checks: ✅ PASS
- RLS hardening: ✅ VERIFIED
- Production env: ✅ CONFIGURED
- Secrets scan: ✅ PASS
- Build: ✅ SUCCESSFUL
- Tests: ✅ ALL PASSING

## Scope
- MVP features: Active
- Google Auth: Configured
- Payments: Disabled
- AI Agents: Disabled

## Safe to Deploy
✅ YES — Ready for production

## Next Step
Human executes: vercel --prod
```

**Responsibility:** Codex

---

#### Step 3: Await Human Approval

**Status:** READY_FOR_PRODUCTION_DEPLOY

**Awaiting:** Human to review report and approve `vercel --prod`

---

### P2 Success Criteria

```
✅ All checks PASS
✅ Readiness report generated
✅ Awaiting human approval
```

### P2 Timeline
- Execution: 15-20 min
- **Total: 15-20 minutes**

---

## Production Deploy (Manual Gate)

### Objective
Deploy to Vercel production with human approval.

### Execution (Human Only)

**Command:**
```bash
vercel --prod
```

**Monitoring:**
1. Check Vercel deployment log
2. Verify deployment succeeds (green ✅)
3. Load production URL
4. Test login flow
5. Verify no console errors
6. Check database connections

**Success:** Production live and working

### Timeline
- Deployment: 3-5 min
- Verification: 5 min
- **Total: 10 minutes**

---

## Overall Timeline

| Phase | Duration | Cumulative |
|-------|----------|-----------|
| P0 | 15-25 min | 15-25 min |
| P1 | 20 min | 35-45 min |
| P2 | 15-20 min | 50-65 min |
| Deploy | 10 min | 60-75 min |
| **Total** | | **60-75 minutes** |

---

## State Machine

```
START
  ↓
P0_AWAITING_SUPABASE_UNBLOCK
  ↓ [Human: A/B/C]
  ↓
P0_RUNNING_TESTS
  ↓
  ├→ [FAIL] → Report blocker, await fix
  │
  └→ [PASS]
      ↓
      P1_CONFIGURATION
      ↓
      P1_RUNNING_TESTS
      ↓
      ├→ [FAIL] → Report blocker
      │
      └→ [PASS]
          ↓
          P2_FINAL_GATE
          ↓
          ├→ [FAIL] → Report blocker
          │
          └→ [PASS]
              ↓
              READY_FOR_PRODUCTION_DEPLOY
              ↓ [Human: vercel --prod]
              ↓
              PRODUCTION_LIVE
```

---

## Human Decision Points

1. **P0 Start:** Choose unblock option (A/B/C)
2. **P1 Start:** Approve production config (auto-generated)
3. **P2 Start:** Review readiness report
4. **Production:** Execute `vercel --prod`

---

## Safety Guarantees

✅ RLS hardening applied before production
✅ All tests pass before production
✅ Payments disabled for safe launch
✅ AI agents disabled for safe launch
✅ No secrets in production
✅ Staging Supabase used (safer)
✅ Human approval required for production
✅ Easy rollback if issues found

---

## Upgrade Paths (After Production)

### Week 1: Monitor & Stabilize
- Watch for errors
- Verify Google Auth working
- Check database performance

### Week 2: Enable Payments (separate gate)
- Set ENABLE_PAYMENTS=true
- Integrate PayPal (sandbox first)
- Run payment gate tests
- Manual approval required

### Week 3: Upgrade to Production Supabase (separate gate)
- Migrate data from staging
- Update env vars
- Verify data integrity
- Manual approval required

### Week 4+: Enable AI Agents (separate gate)
- Set AI_AGENTS_OFF=false
- Test autonomous cycles
- Manual approval required

---

**Current Status:** P0 awaiting human unblock (A/B/C)

**Estimated Time to Production:** 60-75 minutes (including human decision points)
