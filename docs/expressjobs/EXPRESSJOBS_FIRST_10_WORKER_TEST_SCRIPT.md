# ExpressJobs First 10 Worker Test Script

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Gate

Run only after Preview and real RLS smoke pass.

## Worker Task Flow

1. Open the Vercel Preview URL.
2. Look at the landing page for 5 seconds.
3. Explain what you think the product does.
4. Choose the worker path: "Quiero trabajar" or equivalent worker CTA.
5. Start signup or onboarding if available in the Preview flow.
6. Review open jobs.
7. Open a job detail page.
8. Apply to a controlled task.
9. Review accepted/pending status.
10. Review chat or messaging expectations.
11. Confirm whether no employment or income is guaranteed.
12. Submit feedback.

## Observation Prompts

- Did the tester understand the worker path?
- Did the tester understand how to apply?
- Did the tester expect guaranteed income?
- Did the tester understand that payments are not live?
- Did the tester understand why a client might accept or reject an application?
- Did the tester see safety guidance before messaging?

## Stop Conditions

- Tester enters sensitive personal data.
- Tester believes this is a live job marketplace.
- Tester believes income or acceptance is guaranteed.
- Tester sees private client/worker data they should not see.
