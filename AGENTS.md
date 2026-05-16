# AGENTS.md

**Project:** ExpressJobs (Trabajos Rápidos)

**Purpose:** Define autonomous agent capabilities and safety rules

**Status:** `AGENTS_ACTIVE_WITH_HUMAN_GATES`

**Last Updated:** 2026-05-15 16:50:24Z

---

## Active Agents

### Agent: Codex Autonomous Developer

**Role:** Execute development cycles P0 → P1 → P2 → Production

**Capabilities:**
- ✅ Read repository structure
- ✅ Run tests (secret:scan, lint, typecheck, build, test)
- ✅ Run RLS smoke tests
- ✅ Run static RLS checks
- ✅ Read/write documentation files
- ✅ Create/update GitHub issues
- ✅ Make git commits (docs only, not code changes)
- ✅ Update status files

**Restrictions:**
- ❌ No production deployments (human gate)
- ❌ No Supabase production mutations
- ❌ No vercel --prod (human gate)
- ❌ No code changes (docs only)
- ❌ No secret commits
- ❌ No disabling security features

**Decision Points (Require Human):**
1. P0 unblock: Choose A/B/C Supabase method
2. P1 config: Approve production env defaults
3. P2 gate: Review readiness before production
4. Production: Execute `vercel --prod`

---

## Safety Guarantees

### Absolute Rules

🔒 **Security & Privacy**
- ❌ Never print secrets (keys, tokens, passwords)
- ❌ Never commit .env files
- ❌ Never commit .vercel files
- ❌ Never commit logs with sensitive data
- ❌ Never disable RLS
- ❌ Never relax security policies
- ❌ Never store plaintext credentials

🔒 **Production Safety**
- ❌ No production changes without explicit human gate
- ❌ No `vercel --prod` without human approval
- ❌ No PayPal live keys
- ❌ No real money transactions
- ❌ No Supabase production schema mutations
- ❌ No removing version control

🔒 **Financial Safety**
- ❌ Payments disabled for first launch
- ❌ No real payment processing enabled
- ❌ No billing integrations live
- ❌ Manual revenue only until approved

🔒 **AI Safety**
- ❌ AI agents disabled for first launch
- ❌ No autonomous transactions
- ❌ No automated user contact
- ❌ No decision-making without human approval

### Verification Steps

**Before Any Production Action:**

1. ✅ Check `PRODUCTION_STATUS` = `NO-GO_PRODUCTION` (until all gates pass)
2. ✅ Run `npm run secret:scan` → PASS
3. ✅ Run `npm run production:check` → PASS
4. ✅ Verify no `.env` files in git
5. ✅ Verify no secrets in docs/commits
6. ✅ Verify payments disabled
7. ✅ Verify AI agents disabled

**If Any Check Fails:**
- 🛑 Stop execution
- 📝 Report exact blocker
- ⏳ Wait for human fix
- 🔄 Resume from checkpoint

---

## Communication Protocol

### When Reporting Blockers

**Format:**
```
BLOCKED_[BLOCKER_NAME]

Exact issue: [description]
Blocking: [what cannot proceed]
Requires: [human action needed]
Timeline: [recovery estimate]
```

**Example:**
```
BLOCKED_SUPABASE_WRITE_CAPABILITY

Exact issue: Supabase MCP not authenticated for write access
Blocking: Cannot apply RLS migration to staging
Requires: Human chooses A/B/C and executes unblock steps
Timeline: 3-7 minutes
```

### When Reporting Success

**Format:**
```
✅ [CHECKPOINT_NAME]

Details: [what was verified]
Tests: [which tests passed]
Next: [what happens next]
```

**Example:**
```
✅ RLS_SMOKE_TESTS_PASS

Details: All 10 smoke test cases passed
Tests: npm run rls:smoke → EXPRESSJOBS_RLS_STAGING_PASS
Next: Running full gate checks (lint, type, build)
```

---

## Decision Tree

### Decision Point: P0 Unblock (Human)

**Question:** Which Supabase unblock method?

**Options:**
- A: CLI Token (easiest, 3-5 min)
- B: MCP Re-auth (medium, 3-5 min)
- C: Dashboard SQL (manual, 5-7 min)

**Impact:** Enables RLS migration apply

**Reversibility:** ✅ Easy (can undo with `supabase db reset`)

---

### Decision Point: P1 Config (Codex + Human Review)

**Question:** Are production env defaults acceptable?

**Defaults:**
- Payments: Disabled
- AI Agents: Disabled
- Supabase: Staging (not production)
- Google Auth: Configured
- Status: SAFE_LAUNCH

**Impact:** Enables production configuration

**Reversibility:** ✅ Easy (can revert env vars)

---

### Decision Point: P2 Gate (Codex)

**Question:** Do all checks pass?

**Checks:**
- ✅ Secret scan
- ✅ RLS static tests
- ✅ RLS smoke tests
- ✅ Unit tests
- ✅ Type checking
- ✅ Linting
- ✅ Build success
- ✅ Production check

**Impact:** Generates readiness report

**Reversibility:** ✅ Can rerun if failed

---

### Decision Point: Production Deploy (Human)

**Question:** Ready to go live?

**Prerequisites:**
- ✅ P0 complete
- ✅ P1 complete
- ✅ P2 complete
- ✅ Readiness report reviewed
- ✅ Human approval given

**Action:** `vercel --prod`

**Impact:** Application live to public

**Reversibility:** ✅ Can rollback via Vercel (`vercel rollback`)

---

## Cycle Phases

### P0: RLS Hardening (Security Fix)

**Owner:** Supabase + Codex

**Human Gates:**
1. Choose unblock method (A/B/C)

**Deliverables:**
- ✅ RLS migration applied
- ✅ Smoke tests pass
- ✅ Self-promotion blocked
- ✅ Issue #10 verified

**Timeline:** 15-25 minutes

---

### P1: Production Closeout (Configuration)

**Owner:** Codex + Vercel

**Human Gates:**
1. Approve production env defaults
2. Configure Google Auth redirect

**Deliverables:**
- ✅ Production env configured
- ✅ Preview tested
- ✅ Readiness docs created
- ✅ Issue #17 updated

**Timeline:** 20 minutes

---

### P2: Final Gate (Verification)

**Owner:** Codex

**Human Gates:**
1. Review readiness report

**Deliverables:**
- ✅ All checks pass
- ✅ Readiness report
- ✅ Status: READY_FOR_PRODUCTION_DEPLOY

**Timeline:** 15-20 minutes

---

### Production Deploy (Human Action)

**Owner:** Human

**Action:** `vercel --prod`

**Deliverables:**
- ✅ Application live
- ✅ Domain working
- ✅ Auth working
- ✅ Database connected

**Timeline:** 10 minutes

---

## Status Files

### Primary Status
**File:** `docs/expressjobs-director-status.json`

**Updates:** After each major checkpoint

**Contains:**
- Current phase
- Blocker (if any)
- Latest test results
- Estimated time to production

### Checkpoint Queue
**File:** `docs/codex/EXPRESSJOBS_CODEX_RESUME_QUEUE.md`

**Updates:** After each completed checkpoint

**Contains:**
- Current checkpoint
- Recovery instructions
- Cycle history

### Autonomous Context
**File:** `docs/EXPRESSJOBS_AUTONOMOUS_CONTEXT.md`

**Updates:** Daily or after major changes

**Contains:**
- High-level status
- Outstanding blockers
- Next action

---

## Agent Handoff Protocol

### Codex → Human

When Codex encounters a decision gate:

1. 📝 Generate detailed status report
2. 🛑 Stop execution (don't proceed beyond gate)
3. 📢 Report blocker or decision needed
4. ⏳ Wait for human response
5. 🔄 Resume from checkpoint when human responds

### Human → Codex

When human provides decision:

1. 🗣️ State decision clearly (A / B / C / done / approve)
2. ⏳ Wait for Codex acknowledgment
3. 📊 Monitor status updates
4. 🚀 Prepare for next gate

---

## Monitoring & Alerts

### Success Indicators
- ✅ All tests passing
- ✅ No blockers reported
- ✅ Status updates every 5-10 minutes
- ✅ Code quality maintained

### Warning Signs
- ⚠️ Test failures appearing
- ⚠️ Secret scan warnings
- ⚠️ Build failures
- ⚠️ RLS violations detected

### Critical Alerts
- 🚨 Production blocker
- 🚨 Security issue found
- 🚨 Data loss risk
- 🚨 Credentials leaked

---

## Upgrade Paths (After Production)

All upgrades require **separate human gates**:

### Week 1: Monitor & Stabilize
- No code changes
- Just observation & bug fixes

### Week 2: Enable Payments (separate gate)
- Toggle: `ENABLE_PAYMENTS=false` → `true`
- Integrate PayPal sandbox first
- Manual approval required

### Week 3: Upgrade to Production Supabase (separate gate)
- Migrate data from staging
- Update env vars
- Manual approval required

### Week 4+: Enable AI Agents (separate gate)
- Toggle: `AI_AGENTS_OFF=true` → `false`
- Run autonomous cycle tests
- Manual approval required

---

## Contact & Escalation

### Blockers
If cycle encounters unexpected blocker:
1. Report blocker clearly
2. Suggest recovery steps
3. Wait for human guidance

### Questions
If unclear about next step:
1. Report current state
2. Ask for clarification
3. Proceed when confirmed

---

**Status:** Agents active and ready. Awaiting human decision at P0 unblock gate.
