# ExpressJobs PayPal Subscription State Machine

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## States

- `none`
- `pending`
- `created`
- `active`
- `payment_failed`
- `cancelled`
- `suspended`
- `expired`
- `unknown`

## Event Mapping

| PayPal event | State | Premium active |
| --- | --- | --- |
| `BILLING.SUBSCRIPTION.CREATED` | `created` | no |
| `BILLING.SUBSCRIPTION.ACTIVATED` | `active` | yes |
| `BILLING.SUBSCRIPTION.CANCELLED` | `cancelled` | no |
| `BILLING.SUBSCRIPTION.SUSPENDED` | `suspended` | no |
| `BILLING.SUBSCRIPTION.EXPIRED` | `expired` | no |
| `BILLING.SUBSCRIPTION.PAYMENT.FAILED` | `payment_failed` | no |
| `PAYMENT.SALE.COMPLETED` | `active` | yes |
| `PAYMENT.SALE.REFUNDED` | `payment_failed` | no |
| `PAYMENT.SALE.REVERSED` | `payment_failed` | no |
| `PAYMENT.CAPTURE.COMPLETED` | `active` | yes |
| `PAYMENT.CAPTURE.DENIED` | `payment_failed` | no |
| `PAYMENT.CAPTURE.DECLINED` | `payment_failed` | no |
| unknown event | `unknown` | no |

## Premium Rule

Premium can be effective only when a verified webhook maps to `active`.

Not enough:

- Frontend button click.
- PayPal approval URL generated.
- `created`.
- `pending`.
- Plan ID exists.
- Success URL redirect.
