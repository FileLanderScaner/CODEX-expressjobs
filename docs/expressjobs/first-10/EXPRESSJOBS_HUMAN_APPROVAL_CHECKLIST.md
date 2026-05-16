# ExpressJobs Human Approval Checklist

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

Use this checklist before any manual contact with internal testers. This document does not authorize automated outreach.

## Required Approval

- [ ] Human owner explicitly approves contacting the First 10 internal testers.
- [ ] Approval date/time: `[YYYY-MM-DD HH:MM TZ]`
- [ ] Responsible human: `[RESPONSIBLE_HUMAN_PLACEHOLDER]`
- [ ] Scope confirmed as controlled internal testing only.
- [ ] Tester list contains placeholders until the human owner fills it outside the repo.

## Environment Confirmation

- [ ] Protected Preview access is available through the approved manual path.
- [ ] No URL containing `x-vercel-protection-bypass` is saved in docs, chat, screenshots, or logs.
- [ ] `RLS_REAL_SMOKE_STATUS=PASS`.
- [ ] `PREVIEW_BROWSER_SMOKE=PASS`.
- [ ] `PRODUCTION_STATUS=NO-GO_PRODUCTION`.
- [ ] Vercel Production was not modified.
- [ ] No `vercel --prod` or `vercel promote` was used.

## Safety Confirmation

- [ ] `PAYMENTS_LIVE=OFF`.
- [ ] No real card, bank, invoice, subscription, or payment test is requested.
- [ ] `AI_AGENTS_PRODUCTION=OFF`.
- [ ] Testers are told not to enter sensitive data.
- [ ] Testers are told not to share the Preview link publicly.
- [ ] Testers are told not to invite additional people.
- [ ] Screenshots must not include credentials, protected access values, personal data, or browser headers.

## Communication Confirmation

- [ ] Messages use placeholders until the human owner manually customizes them.
- [ ] No real names, emails, or phone numbers are committed to this repo.
- [ ] Testers receive the onboarding guide before the session.
- [ ] Testers receive role-specific tasks before the session.
- [ ] Feedback channel is prepared before contact.

## Stop Conditions

Do not contact testers if any item below is true:

- [ ] RLS smoke is not PASS.
- [ ] Preview access is blocked or unstable.
- [ ] Production status is not `NO-GO_PRODUCTION`.
- [ ] Payments appear live.
- [ ] AI agents production appears active.
- [ ] A secret, token, or protected URL appears in any message.
- [ ] The tester list includes real personal data inside the repo.
