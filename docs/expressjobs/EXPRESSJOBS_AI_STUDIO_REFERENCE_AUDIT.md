# ExpressJobs AI Studio Reference Audit

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Reference

- Source: Google AI Studio prototype "Trabajos Rapidos"
- URL: https://ai.studio/apps/c2d20d71-9cef-490f-876d-9974dea5229c
- Local ZIP found: `C:\CODEX-expressjobs-repo\trabajos-rapidos.zip` equivalent filename with accent
- Extraction path used for audit: local temp directory only

## Summary

AI Studio is useful as UX/product reference, not infrastructure. The current ExpressJobs repo remains the source of truth for Next.js, Supabase RLS, routes, docs, QA, and deployment gates.

## Comparison

| Area | Current Codex Repo | AI Studio Prototype | Decision |
| --- | --- | --- | --- |
| Stack | Next.js App Router, TypeScript, Tailwind | React + Vite, motion, Supabase client | `REJECT_OUTDATED` for stack replacement |
| Navigation | Real routes for client/worker/admin/pricing/legal | Single-page tabs: Buscar Trabajos, Publicar Tarea, Precios, Login | `ADAPT_AND_IMPROVE` navigation/copy |
| Components | RoleSelector, JobForm, JobCard, PricingCard, safety states | Similar components with stronger immediate UX states | `ADAPT_AND_IMPROVE` |
| Services | Supabase-ready services with local fallback | Direct Supabase calls to `tr_*` tables | `DOCUMENT_ONLY` |
| Schema | `ej_*` tables, richer status model, RLS smoke tests | `tr_*` simple schema, weaker RLS | `REJECT_SECURITY_RISK` for replacement |
| Pricing | Safe monetization docs, no live payments | Premium Pro $9.99/mo and reduced commission | `ADAPT_AND_IMPROVE` as "proximamente" only |
| Branding | ExpressJobs technical/product name | Trabajos Rapidos user-facing name | `ADAPT_AND_IMPROVE` with hybrid brand |
| Tracking | Local fallback, typed events | Console logging fallback | `ADAPT_AND_IMPROVE` event idea, reject console PII risk |
| Security | RLS-first, no production, no payments | Claims of protected payments, verification, support | `REJECT_SECURITY_RISK` for overpromising |

## Findings

### IMPORT_DIRECTLY

- None copied directly. Direct import would risk pulling Vite patterns, `tr_*` schema, or unsafe claims.

### ADAPT_AND_IMPROVE

- Public brand language: "Trabajos Rapidos" is clearer for Uruguay/LATAM.
- Navigation labels: "Buscar trabajos", "Publicar una tarea", "Precios".
- Job form copy: task-oriented placeholders and safety notice.
- Pricing card structure: free, premium worker, commission model.
- Role selector labels: "Busco ayuda" and "Quiero trabajar".
- Landing structure: headline, value subtitle, CTAs, 3-step explanation, job examples.

### DOCUMENT_ONLY

- Prototype service names and product docs are noted as prior art.
- Prototype Premium Pro concept is documented, not activated.

### REJECT_SECURITY_RISK

- Replacing `ej_*` with `tr_*`.
- "Pagos protegidos" claim before live provider exists.
- "Verificacion de identidad" claim before verification exists.
- "Soporte 24/7" claim before support process exists.
- Console tracking with arbitrary properties.

### REJECT_OUTDATED

- Replacing Next.js App Router with Vite.
- Adding motion dependency only for visual polish.
- Adding Gemini dependency from AI Studio template.

## Import Decision

Only UX/product ideas were adapted. Infrastructure, schema, RLS, deployment, and security posture remain from the ExpressJobs repo.
