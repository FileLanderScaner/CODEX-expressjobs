# ExpressJobs Design System

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Paleta

- `--ej-bg: #07111f`
- `--ej-bg-soft: #0f1b2d`
- `--ej-bg-section: #132238`
- `--ej-surface: #0f1b2d`
- `--ej-surface-2: #132238`
- `--ej-surface-3: #1b2e46`
- `--ej-border: rgba(147, 197, 253, 0.18)`
- `--ej-text: #f8fafc`
- `--ej-text-muted: #cbd5e1`
- `--ej-text-soft: #94a3b8`
- `--ej-accent: #60a5fa`
- `--ej-accent-hover: #93c5fd`
- `--ej-accent-soft: rgba(96, 165, 250, 0.14)`
- `--ej-success: #10b981`
- `--ej-success-hover: #34d399`
- `--ej-success-soft: rgba(16, 185, 129, 0.14)`
- `--ej-danger: #ef4444`
- `--ej-danger-soft: rgba(239, 68, 68, 0.14)`
- `--ej-warning: #f59e0b`
- `--ej-warning-soft: rgba(245, 158, 11, 0.14)`

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
