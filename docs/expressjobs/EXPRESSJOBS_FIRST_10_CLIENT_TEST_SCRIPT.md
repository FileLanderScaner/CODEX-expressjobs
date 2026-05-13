# ExpressJobs First 10 Client Test Script

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Gate

Run only after Preview and real RLS smoke pass.

## Client Task Flow

1. Open the Vercel Preview URL.
2. Look at the landing page for 5 seconds.
3. Explain what you think the product does.
4. Choose the client path: "Busco ayuda" or equivalent client CTA.
5. Start signup or onboarding if available in the Preview flow.
6. Create a simple low-risk task.
7. Review task detail and status.
8. Review controlled or simulated applications.
9. Accept a controlled worker if the environment supports it.
10. Review chat or messaging expectations.
11. Confirm whether safety, payment, and guarantee copy is clear.
12. Submit feedback.

## Observation Prompts

- Did the tester find the primary CTA?
- Did the tester understand what information to enter?
- Did the tester expect immediate real payment?
- Did the tester assume worker verification that does not exist?
- Did the tester understand task status?
- Did the tester see trust/safety guidance?

## Stop Conditions

- Tester enters sensitive personal data.
- Tester believes the task is live production.
- Tester believes payment or worker acceptance is guaranteed.
- Private data appears visible to an unrelated role.
