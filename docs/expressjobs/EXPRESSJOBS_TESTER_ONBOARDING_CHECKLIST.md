# ExpressJobs Tester Onboarding Checklist

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Before Session

- Confirm tester understands this is a controlled MVP.
- Confirm no live payments are active.
- Confirm no employment or income is guaranteed.
- Confirm whether the session is local demo, Preview, or staging-backed.
- Do not onboard external testers as a public cohort until Supabase RLS and Vercel Preview checks are complete.
- Assign anonymous tester code.
- Prepare observer notes.

## During Session

- Observe role choice.
- Observe first-click path.
- Record confusion without coaching too early.
- Ask tester to explain what they think the product does.
- Watch for payment, safety, or trust concerns.

## After Session

- Fill feedback form.
- Tag top issue.
- Decide whether follow-up is needed.
- Escalate critical trust/safety issues to release gate.

## Environment Gate

Current gate:

- `SUPABASE_STAGING_STATUS=BLOCKED_SUPABASE_ACCESS`
- `VERCEL_PREVIEW_STATUS=BLOCKED_VERCEL_ACCESS`

Allowed while blocked:

- Internal walkthroughs.
- Screen-share demos.
- Copy/UX review.
- Feedback tracker dry run.

Not allowed while blocked:

- Public launch.
- Real payment test.
- Claims that data is persisted in staging.
- Claims that RLS was validated live.
