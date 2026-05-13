# Cycle ExpressJobs 008 AI Studio Reference Review

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Mode

`EXPRESSJOBS_AI_STUDIO_REFERENCE_IMPORT_AND_PRODUCT_UPGRADE`

## Reference Status

Local ZIP found and audited. AI Studio URL was treated as reference, but the ZIP provided the usable source.

## Completed

- Compared AI Studio prototype to ExpressJobs repo.
- Chose public brand candidate "Trabajos Rapidos" while keeping ExpressJobs technical name.
- Adapted landing, role selector, job form, job card, pricing, trust notice, and tracking event list.
- Kept `ej_*` schema and stronger RLS.
- Rejected unsafe claims around protected payments, identity verification, and 24/7 support.

## Decision

`KEEP_EJ_PREFIX`

## Next Recommended Mode

`EXPRESSJOBS_TRUST_SAFETY_HARDENING`
