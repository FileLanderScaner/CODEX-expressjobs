# ExpressJobs Design System

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Paleta

- `--ej-bg: #071018`
- `--ej-bg-soft: #0c1722`
- `--ej-bg-section: #101b28`
- `--ej-surface: #162231`
- `--ej-surface-2: #1b2a3a`
- `--ej-surface-3: #223447`
- `--ej-border: rgba(255, 255, 255, 0.1)`
- `--ej-text: #f7fafc`
- `--ej-text-muted: #c7d2da`
- `--ej-text-soft: #94a5b3`
- `--ej-accent: #7bc143`
- `--ej-accent-hover: #8fd255`
- `--ej-accent-soft: rgba(123, 193, 67, 0.14)`
- `--ej-danger-soft: rgba(255, 90, 120, 0.14)`
- `--ej-warning-soft: rgba(255, 180, 0, 0.12)`

## Clases Globales

Usar estas clases antes de crear estilos nuevos: `ej-page`, `ej-container`, `ej-card`, `ej-glass`, `ej-input`, `ej-select`, `ej-textarea`, `ej-btn-primary`, `ej-btn-secondary`, `ej-badge`, `ej-muted`, `ej-soft`, `ej-dark-section`, `ej-grid`, `ej-panel`, `ej-chip`, `ej-danger-badge`, `ej-warning-badge`.

## Componentes

Componentes reutilizables agregados o normalizados:

- `PageShell`, `SectionShell`, `DashboardShell`
- `DarkCard`, `GlassPanel`, `AuthCard`
- `PrimaryButton`, `SecondaryButton`
- `SafetyBanner`, `StatusBadge`, `StatusChecklist`
- `FormField`, `TextAreaField`, `SelectField`
- `GoogleLoginButton`, `AuthEmailForm`
- `JobCard`, `WorkerJobsClient`, `JobForm`
- `EmptyState`, `LoadingState`, `ErrorState`

## Nueva Pagina

Patron recomendado:

```tsx
import { AppShell } from "@/components/app-shell";

export default function Page() {
  return (
    <AppShell>
      <main className="ej-page px-4 py-10">
        <div className="ej-container">
          <section className="ej-card p-5">Contenido</section>
        </div>
      </main>
    </AppShell>
  );
}
```

## Formularios

- Inputs: `ej-input`
- Selects: `ej-select`
- Textareas: `ej-textarea`
- Submit principal: `ej-btn-primary`
- Accion secundaria: `ej-btn-secondary`
- Mensajes de seguridad: `SafetyBanner` o clases `ej-danger-badge` / `ej-warning-badge`

## Prohibido

- `bg-white` generico en rutas principales.
- Formularios blancos o paneles sin `ej-card` / `ej-glass`.
- Texto negro sobre fondo oscuro.
- Botones sin estado hover/focus visible.
- Claims de pagos protegidos, verificacion de identidad, empleo garantizado o ingresos garantizados.
- Ocultar `NO-GO_PRODUCTION` en superficies publicas relevantes.
