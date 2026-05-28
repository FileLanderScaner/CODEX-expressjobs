# ExpressJobs Sanitized Lead Register Template

`NO_REAL_USER_PII_IN_REPO`

This register is a template for a human-owned sales sheet. Keep the actual working lead list outside git if it contains any private person, phone, email, payment, receipt, address, or business-sensitive data.

## Allowed Columns

```text
internal_id
created_date
lead_alias
segment
source_surface
offer_interest
stage
quoted_amount_uyu
quoted_amount_usd
manual_payment_status
delivery_status
feedback_summary_sanitized
risk_note
next_human_action
owner_initials
```

## Allowed Stage Values

- new
- qualified
- contacted_by_human
- offer_sent
- manual_payment_pending
- accepted
- delivered
- feedback_received
- closed_lost
- do_not_contact

## Lead Validity Criteria

A valid pilot lead has:

- A real task, service, business, or hiring need.
- A general zone or market, not a private address.
- A clear role: client, worker, local business, or reviewer/admin.
- Explicit understanding that this is a manual pilot.
- Explicit understanding that payments inside the app are disabled.
- No request that would require production launch, live checkout, guaranteed applicants, guaranteed income, escrow, or verified identity claims.

## Redaction Rules

- Replace real names with `client_001`, `worker_001`, or `business_001`.
- Replace phone/email with `contact_held_by_human`.
- Replace exact address with neighborhood/city only if needed.
- Replace payment method details with `manual_external_method`.
- Replace screenshots with a written sanitized summary.

## Example Sanitized Row

```text
internal_id: lead_001
created_date: 2026-05-28
lead_alias: business_001
segment: local_business
source_surface: ofertas
offer_interest: landing_basica
stage: qualified
quoted_amount_uyu: 1500
quoted_amount_usd: 39
manual_payment_status: not_requested_in_app
delivery_status: not_started
feedback_summary_sanitized: understood WhatsApp contact, asked for clearer delivery scope
risk_note: no payment data collected
next_human_action: send manual quote outside repo
owner_initials: RG
```

## Status

`SANITIZED_LEAD_REGISTER_TEMPLATE=READY_FOR_HUMAN_OPERATOR`
