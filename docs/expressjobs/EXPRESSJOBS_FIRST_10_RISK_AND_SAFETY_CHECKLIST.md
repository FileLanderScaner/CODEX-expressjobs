# ExpressJobs First 10 Risk And Safety Checklist

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Environment Safety

- Preview URL is non-production.
- Supabase project is staging-only.
- `ej_*` migration is applied.
- RLS real smoke passed.
- Browser smoke passed.
- No production env vars are used.
- No live payment keys are configured.
- AI agents are disabled.

## Session Safety

- Tester is an adult.
- Tester understands this is a controlled MVP.
- Tester understands no real payments are active.
- Tester understands no employment is guaranteed.
- Tester understands no income is guaranteed.
- Tester is assigned an anonymous code.
- Moderator stops collection of sensitive personal data.

## Product Safety

- Job examples are low-risk.
- No emergency tasks are tested.
- No dangerous physical tasks are tested.
- No illegal, discriminatory, or exploitative tasks are accepted.
- No claim implies full worker verification.
- No claim implies payment protection is live.

## Data Safety

- Do not commit raw tester data.
- Do not commit screenshots with personal data.
- Do not store passwords in docs.
- Do not paste service role keys into chat, docs, or browser code.
- Keep feedback anonymized.

## Escalation

Escalate to release gate if any of these occur:

- Private data leak.
- Misleading payment or income interpretation.
- Unsafe job content.
- User cannot identify non-production status.
- RLS or auth behavior contradicts expected role boundaries.
- Critical route or build regression.
