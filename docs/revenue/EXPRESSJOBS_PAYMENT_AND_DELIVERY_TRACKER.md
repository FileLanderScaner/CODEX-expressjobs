# ExpressJobs Payment And Delivery Tracker

`PAYMENTS_LIVE=OFF`

Do not store bank details, card data, private payment aliases, identity documents, private payment links, receipts, phone numbers, emails, or sensitive personal data in this file.

Accepted manual collection channels must be handled privately by the human:

- Mercado Pago.
- Prex.
- BROU.
- Cash.
- Other manual method approved outside the repo.

## Payment And Delivery Table

| Internal ID | Lead Alias | Platform | Offer Sold | Amount Quoted | Amount Collected | Collection Status | Generic Method | Delivery Status | Commitment Date | Next Step | Risk |
| --- | --- | --- | --- | ---: | ---: | --- | --- | --- | --- | --- | --- |
| REV-YYYYMMDD-001 | [LEAD_ALIAS] | [PLATFORM] | [OFFER] | 0 UYU | 0 UYU | Not collected | [GENERIC_METHOD] | Not started | YYYY-MM-DD | Await human activity | No real activity reported |

## Sponsor Intake Form

```text
Nombre del negocio:
Rubro:
Zona:
WhatsApp publico:
Texto corto:
Logo opcional:
Paquete elegido:
Duracion:
Estado de pago manual:
Fecha de inicio:
Fecha de fin:
Notas sanitizadas:
```

## Current Cycle Note

`NO_REAL_ACTIVITY_REPORTED`

No real human sales activity was provided for this cycle, so no sale, payment, or delivery record was added.
