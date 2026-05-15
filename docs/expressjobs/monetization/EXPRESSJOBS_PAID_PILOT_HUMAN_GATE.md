# ExpressJobs Paid Pilot Human Gate

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Decision

`PAID_PILOT_HUMAN_GATE=BLOCKED_EXTERNAL_CREDENTIALS`

Human approval is required before any paid pilot moves beyond sandbox preparation.

## Approval Checklist

| Gate | Required state |
| --- | --- |
| Production | `NO-GO_PRODUCTION` |
| PayPal live | `OFF` |
| PayPal sandbox smoke | `PASS` |
| Webhook signature verification | `PASS` |
| Premium from frontend | `false` |
| Premium only after verified webhook | `true` |
| RLS real smoke | `PASS` |
| Preview browser smoke | `PASS` |
| Secret scan | `PASS` |
| Real payments created | `false` |
| Real users contacted automatically | `false` |

## Human Fields

- Responsible human:
- Approval date/time:
- Scope approved:
- Sandbox evidence reviewed:
- GO/NO-GO decision:

## NO-GO Conditions

- Any live PayPal setting appears.
- Any production deploy or promotion is required.
- Any secret is exposed.
- Any RLS check fails.
- Any payment state can be changed from frontend alone.
- Webhook verification is missing, invalid, or untested.
