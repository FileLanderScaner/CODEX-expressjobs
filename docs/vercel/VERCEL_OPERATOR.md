# Vercel Operator Runbook

**Status:** `VERCEL_OPERATOR_QUEUED_FOR_P3`

**Timestamp:** 2026-05-15 16:50:24Z

---

## Current State

**Production Deployment:** NO-GO (awaiting RLS hardening in staging)

**Production Status:** READY_FOR_CONFIGURATION (queued for P3)

**Staging:** https://codex-expressjobs.vercel.app (current Preview)

**Production:** (pending deployment gate)

---

## Phases of Involvement

### Phase 1 (P0): RLS Hardening — NO VERCEL CHANGES
- Supabase staging write capability unblock
- Migration apply and smoke tests
- **Vercel:** No changes needed

### Phase 2 (P1): Production Closeout — CONFIGURATION
- Configure production env vars in `vercel.json`
- Review Preview deployment
- Prepare for production
- **Vercel:** Configuration changes

### Phase 3 (P2): Final Gate — NO VERCEL CHANGES
- Run all checks
- Generate production readiness report
- Await human approval
- **Vercel:** Standby

### Phase 4 (PRODUCTION): Deployment — MANUAL HUMAN GATE
- Human runs: `vercel --prod`
- Monitor deployment
- Verify production works
- **Vercel:** Human-triggered deployment only

---

## P1 Configuration Tasks

### 1. Environment Variables Setup

**File:** `vercel.json` (production environment section)

**Safe Defaults:**

```json
{
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": {
      "value": "@supabase_staging_url"
    },
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": {
      "value": "@supabase_staging_anon_key"
    },
    "ENABLE_PAYMENTS": {
      "value": "false"
    },
    "AI_AGENTS_OFF": {
      "value": "true"
    },
    "EXPRESSJOBS_PRODUCTION_STATUS": {
      "value": "SAFE_LAUNCH_PAYMENTS_DISABLED"
    }
  }
}
```

**Notes:**
- `ENABLE_PAYMENTS=false` → Payment CTAs hidden
- `AI_AGENTS_OFF=true` → Autonomous features disabled
- Supabase: Using staging (safer for first launch)
- Can upgrade to production Supabase later after manual validation

### 2. Vercel Dashboard Check

1. **Project Settings**
   - Project: CODEX-expressjobs
   - Framework: Next.js
   - Node version: 18+ (check package.json)

2. **Environment Variables**
   - Verify all required vars are set
   - Verify no secrets leaked in logs
   - Verify production and preview separated (if needed)

3. **Build Settings**
   - Build command: `npm run build`
   - Start command: Next.js default
   - Output directory: `.next`

4. **Deployments**
   - Check Preview deployment is stable
   - Verify no build errors in logs

### 3. Preview Testing (P1)

Before production deployment:

```bash
vercel preview
```

**Test Flow:**
1. Load home page → should render without secrets
2. Click "Sign in with Google" → should redirect to Google
3. After Google callback → should redirect to `/role`
4. On `/role` → should show profile setup page
5. Fill profile → should save without payment upsell
6. Navigate dashboard → basic UI should work
7. Check browser console → no errors
8. Check network tab → no 500 errors

**Expected:**
- ✅ Login flow works
- ✅ Profile page renders
- ✅ No payment CTAs visible
- ✅ No errors in console
- ✅ Staging Supabase connection works

### 4. Production Environment Review

Before `vercel --prod`:

```bash
vercel env list                # List all env vars (values hidden)
vercel env pull production > /tmp/prod.env  # Local review (DO NOT commit)
```

**Review Checklist:**
- ✅ No `SUPABASE_SERVICE_ROLE_KEY` in production (only anon)
- ✅ No `.env` files committed
- ✅ `ENABLE_PAYMENTS=false`
- ✅ `AI_AGENTS_OFF=true`
- ✅ All required public vars set
- ✅ No test/staging values in production
- ✅ Supabase project is staging (safe)

---

## Production Deployment (Phase 4)

### When Ready (after P2 Final Gate PASS)

**Human executes (outside autonomous cycle):**

```bash
vercel --prod
```

**Vercel will:**
1. Build from main branch
2. Run build command: `npm run build`
3. Deploy to production
4. Update production URL

### Monitoring

After deploy:

1. **Check Deployment Status**
   - Vercel dashboard → Recent deployments
   - Should show green ✅ check

2. **Test Production URL**
   - Load https://codex-expressjobs.vercel.app (or custom domain)
   - Verify homepage loads
   - Test Google login flow
   - Check no console errors

3. **Monitor First Hour**
   - Check Vercel logs for errors
   - Check Supabase staging project for queries
   - Verify no unexpected behavior

### Rollback (if needed)

```bash
vercel rollback [deployment-id]
```

---

## Safety Rules for Vercel

❌ **DO NOT:**
- `vercel --prod` without P2 Final Gate PASS
- `vercel promote` without explicit human approval
- Store secrets in env vars (use Vercel secrets)
- Commit `.vercel` directory
- Use production Supabase key in preview
- Deploy with `ENABLE_PAYMENTS=true`
- Deploy with `AI_AGENTS_OFF=false`

✅ **DO:**
- Use safe env defaults
- Verify Preview before production
- Keep payments disabled for first launch
- Keep AI agents off
- Use staging Supabase for safety
- Monitor first deployment closely

---

## Production Upgrade Path

### After First Week of Safe Production

If everything is stable:

1. **Enable Payments (separate gate)**
   - Set `ENABLE_PAYMENTS=true`
   - Integrate PayPal production keys (not live keys)
   - Run payment gate tests
   - Manual approval required

2. **Upgrade to Production Supabase (separate gate)**
   - Migrate data from staging to production project
   - Update env vars to production Supabase
   - Run all tests again
   - Manual approval required

3. **Enable AI Agents (separate gate)**
   - Set `AI_AGENTS_OFF=false`
   - Run autonomous cycle tests
   - Manual approval required

**Each upgrade is a separate gate with human approval required.**

---

## Current Status

```
✅ Vercel configured for Preview: https://codex-expressjobs.vercel.app
⏳ Vercel production env: READY_FOR_CONFIGURATION (P1)
⏳ Vercel production deploy: QUEUED (after P2)
❌ Vercel production: NOT DEPLOYED YET
```

---

## Timeline

```
P0 (RLS Hardening):        ~10-15 min (Supabase focus, no Vercel change)
P1 (Production Closeout):  ~20-30 min (Configure Vercel env, test Preview)
P2 (Final Gate):           ~15-20 min (All checks, no Vercel change)
Production Deployment:     ~5 min (Human `vercel --prod`, outside cycle)
```

---

## Questions?

- See: `docs/codex/EXPRESSJOBS_AUTONOMOUS_DEVELOPMENT_CYCLE.md` (full cycle)
- See: `AGENTS.md` (safety rules)
- See: `vercel.json` (current config)

---

**Next Action:** P1 awaits P0 completion. No Vercel changes needed yet.
