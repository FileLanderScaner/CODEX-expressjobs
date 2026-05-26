# ExpressJobs Visual System Directive

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Purpose

This document defines the visual direction for ExpressJobs / Trabajos Rapidos and for future marketplace-style projects built from the same product DNA.

It is not a request to copy Riot Games, any game brand, or any protected visual identity. The reference value is the visual discipline: strong editorial layout, premium dark header, large human imagery, confident typography, animated navigation details, and high-conversion content blocks.

## Design north star

ExpressJobs should feel like:

- a serious modern job marketplace;
- a fast local-services platform;
- a trustworthy account-based app;
- a premium startup product, not a generic template;
- clear enough for everyday users in Uruguay/LatAm.

The target impression is:

> Professional, human, fast, direct, trustworthy, modern.

Avoid:

- gamer imitation;
- childish UI;
- generic corporate stock-template look;
- overuse of red/black aggression;
- cluttered portals;
- too many CTAs competing at once.

## Visual principles

### 1. Human-first imagery

Use real-world work imagery whenever possible:

- people collaborating;
- workers performing services;
- local business owners;
- delivery, repairs, cleaning, moving, tech support;
- people using phone/laptop to coordinate tasks.

Images should communicate work, trust, motion and opportunity. Avoid fake-looking staged corporate images when possible.

### 2. Dark premium shell

The top navigation and hero may use a dark premium look:

- dark header;
- high-contrast white text;
- sticky navigation;
- visible account state;
- clear CTAs.

This gives the app a modern platform feel.

### 3. Editorial hero

The home page should start with a large hero:

- full-width image background;
- dark overlay for readability;
- short strong headline;
- 1-2 sentence value proposition;
- 2-3 primary CTAs max.

Recommended hero message direction:

> Publica trabajos. Encuentra oportunidades. Coordina rapido.

or:

> Trabajos reales, personas disponibles, coordinacion simple.

### 4. Three visual action panels

Below the hero, use three large image/action cards. These are not decorative only; they are primary navigation.

Recommended panels:

1. **Publicar un trabajo**
   - For clients.
   - CTA to `/client/jobs/new` or `/jobs/new` depending current routing.
   - Image: person planning/checklist/home repair/task coordination.

2. **Buscar trabajos**
   - For workers.
   - CTA to `/worker/jobs` or `/jobs/open`.
   - Image: worker in action, tools, delivery, cleaning, tech support.

3. **Crear mi perfil**
   - For account onboarding.
   - CTA to `/auth`, `/register`, `/profile`, or `/role` depending session.
   - Image: person using phone/laptop, professional profile setup.

These panels should replace generic text-heavy blocks where possible.

### 5. Clear account UX

A logged-in user must never wonder whether their session exists.

The shell must support:

- signed-out state: `Ingresar`, `Crear cuenta`;
- signed-in state: `Mi cuenta`, profile name or neutral account label;
- visible link to `/profile`;
- logout available from account/profile area;
- no full private email in public layout unless necessary.

### 6. Fast conversion paths

Every page should make the next step obvious:

- publish job;
- search jobs;
- create profile;
- contact by WhatsApp;
- learn how it works.

Avoid making the user read too much before acting.

## Recommended palette

The current green brand can remain, but should be sharpened into a modern palette.

### Core colors

```text
Background dark:       #0B0F14
Surface dark:          #111827
Surface elevated:      #17212F
Text strong:           #F9FAFB
Text muted:            #B7C0CC
Line dark:             #2B3440
Brand green:           #22C55E
Brand green dark:      #15803D
Tech blue:             #2563EB
Warm accent:           #F59E0B
Danger/reserved:       #EF4444
Light background:      #F6F8F4
White:                 #FFFFFF
```

### Usage

- Use green for main positive actions: publish, apply, continue.
- Use blue for trust/technology links and secondary CTAs.
- Use warm accent sparingly for highlighted offers or pilot notices.
- Use red only for warnings, production blocked notices, errors.
- Keep dark sections clean and high contrast.

## Typography

Recommended direction:

```text
Headings: Sora or Space Grotesk
Body/UI: Inter
Fallback: system-ui, Arial, sans-serif
```

If external fonts are not configured, use a strong system stack first. Do not block implementation on font setup.

Suggested style:

- Hero heading: very large, bold, tight line-height.
- Section headings: short and bold.
- Body copy: readable, not too small.
- Buttons/nav: uppercase or semi-bold where appropriate, but not excessive.

## Header behavior

The main header should be:

- sticky top;
- dark or translucent dark over hero;
- compact but readable;
- logo left;
- main nav center or left;
- account/CTA right.

Recommended nav links:

- Inicio
- Como funciona
- Buscar trabajos
- Publicar trabajo
- Ofertas or Empresas
- Mi cuenta / Ingresar

### Hover interaction

Navigation links should have a subtle hover underline animation:

```css
.nav-link {
  position: relative;
}

.nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  right: 100%;
  bottom: -6px;
  height: 2px;
  background: currentColor;
  transition: right 180ms ease;
}

.nav-link:hover::after,
.nav-link:focus-visible::after {
  right: 0;
}
```

Use this concept in Tailwind or CSS modules depending current architecture.

## Hero section specification

Recommended structure:

```text
Hero
- Background image: humans working/coordinating tasks.
- Overlay: dark gradient.
- Eyebrow: Marketplace local de trabajos rapidos.
- H1: Publica trabajos. Encuentra oportunidades.
- Subtitle: ExpressJobs conecta clientes y trabajadores para tareas reales, rapidas y concretas.
- CTA 1: Publicar un trabajo
- CTA 2: Buscar trabajos
- CTA 3: Crear mi perfil
```

Hero should be responsive:

- desktop: full-height feel, strong center/left alignment;
- mobile: shorter image, text remains readable, CTAs stacked.

## Three-panel section specification

Cards should have:

- large image area;
- overlay gradient;
- bold title;
- short description;
- CTA arrow or label;
- hover lift and image zoom;
- accessible focus state.

Recommended copy:

### Publicar un trabajo

> Contanos que necesitas, zona y presupuesto. Recibi interesados y coordina rapido.

CTA: `Publicar ahora`

### Buscar trabajos

> Encuentra tareas disponibles y postulate con tu perfil.

CTA: `Ver trabajos`

### Crear mi perfil

> Guarda tu cuenta, datos y rol para volver sin empezar de cero.

CTA: `Crear perfil`

## Interaction rules

- Hover animations should be subtle: 150-250ms.
- Use transform/opacity, not layout-shifting heavy effects.
- Always keep keyboard focus visible.
- Do not rely only on color for state.
- Buttons must be large enough for mobile touch.

## UX routing rules

Do not hardcode uncertain routes without checking current app routes.

Preferred routing intent:

```text
Publicar trabajo -> /client/jobs/new or /jobs/new
Buscar trabajos -> /worker/jobs or /jobs/open
Crear perfil -> /auth if signed out, /profile if signed in
Mi cuenta -> /profile
Login -> /auth
How it works -> /como-funciona
Pricing/offers -> /ofertas or /pricing
```

Codex must inspect current routes before implementation and choose existing routes first.

## Images and assets

Do not use Riot Games images, logos, champions, game art or protected brand assets.

Use one of these paths:

1. Existing project-safe assets, if present.
2. Public-domain/royalty-free imagery with documented source.
3. Gradient placeholders until final images are chosen.
4. User-provided images.

If image sourcing is blocked, implement layout with CSS gradients and safe placeholder panels, then document required asset list.

Recommended asset list:

```text
hero-working-team.jpg
panel-post-job.jpg
panel-find-work.jpg
panel-create-profile.jpg
```

## Accessibility requirements

- Contrast must pass readable standards.
- All interactive cards must be real links or buttons.
- Images used as background must not carry critical text.
- Provide visible focus states.
- Maintain semantic headings.
- Mobile nav must remain usable.

## Implementation order for Codex

When implementing visual upgrades, use this order:

1. Inspect current routes and shell.
2. Create or update design tokens/constants.
3. Upgrade AppShell/header/nav interactions.
4. Upgrade home hero.
5. Add three visual action panels.
6. Add account-aware CTA behavior if safe.
7. Add tests for route/copy/contact visibility.
8. Run checks.
9. Document visual smoke.

## Token-saving rules

Codex should not re-audit everything. For visual implementation, inspect only:

- `src/app/page.tsx`
- `src/components/app-shell.tsx`
- `src/lib/expressjobs-data.ts`
- `src/lib/account.ts`
- `src/app/profile/page.tsx`
- relevant tests under `src/__tests__/`
- global CSS/theme file if present

Then expand only if build/tests require it.

## Safety boundaries

- Do not touch production.
- Do not use `vercel --prod`.
- Do not use `vercel promote`.
- Do not modify Production env vars.
- Do not touch Supabase production.
- Do not run SQL or migrations for visual work.
- Do not activate PayPal live.
- Do not add trackers without approval.
- Do not add external scripts/CDNs without approval.
- Do not expose secrets.

## Visual quality checklist

Before shipping a visual PR, verify:

- Header looks modern and readable.
- Hover underline works on nav.
- Hero has strong message and CTA.
- Three action panels exist and route correctly.
- Mobile layout remains usable.
- Account state remains visible.
- Contact email remains `trabajosrapidos.uy@gmail.com`.
- WhatsApp remains current unless user changes it.
- Production status remains visible where required.
- No protected third-party assets are used.
- Tests/checks pass.

## Recommended first visual mode

```text
EXPRESSJOBS_PREMIUM_VISUAL_HOME_AND_NAV_REFRESH
```

Scope:

- no backend;
- no database;
- no production;
- no migrations;
- home/header/cards only;
- account-aware CTA if current helpers support it;
- safe placeholders if images are not available.

## Prompt seed

Use this as the base for a future Codex prompt:

```text
Implement the ExpressJobs premium visual home and navigation refresh using docs/design/EXPRESSJOBS_VISUAL_SYSTEM_DIRECTIVE.md as the source of truth. Keep production NO-GO. Do not add external assets unless already present or approved. Do not copy Riot Games assets or identity. Use a dark premium header, large human-work hero, animated nav underline, and three visual action panels: Publicar un trabajo, Buscar trabajos, Crear mi perfil. Inspect existing routes first and use existing routes. Run proportional checks and document visual smoke.
```
