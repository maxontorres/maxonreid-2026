# Brand & Design Guide

This is the single source of truth for the visual system on maxontorres.com. Every value below is copied directly from the live source files (`app/globals.css`, `app/[locale]/layout.tsx`, and the components referenced throughout) as of 2026-08-10. If you change a token in code, update it here in the same commit — this doc is only useful if it stays accurate.

**Quick-reference checklist** — read this first, expand sections below when you need exact values.

- Headings → Michroma (`font-display`), always. Body/UI text → Manrope (`font-sans`/`font-body`). Labels/metadata/numerals → Space Mono (`font-mono`).
- Page container → `w-[92%] max-w-[1200px] mx-auto`.
- Cards → `bg-white/[0.02] border border-white/[0.06] rounded-xl p-6`, hover border → `#628DFF`.
- Primary accent is electric blue `#628DFF`. Violet `#675DFF` is a secondary glow/fill color, not for small text. Amber `#E58945` is reserved for CTA emphasis/status/error — use sparingly.
- Reach for `.glow-orb`, `.duotone-photo`, `.text-glow-neon`, `.grain-overlay` before hand-rolling a new glow/grain/neon effect — they already exist in `globals.css`.
- No animation library. Motion is CSS `@keyframes` + the `useInView` hook. Don't add framer-motion or similar.
- Copy is plain and jargon-free — verbs over titles ("I build software," not "Software Architect"), no buzzwords ("stakeholders," "ecosystems," "strategic leadership").
- The CV page (`app/[locale]/cv/CVClient.tsx`) is the one intentional exception to all of this — it keeps a separate light "paper" theme for print. Don't dark-theme it.

---

## 1. Brand concept

**The aesthetic in one line:** the future as imagined in 2003 — cold, cinematic, nocturnal, urban, technical. Think early-2000s digital futurism / techno-noir, not warm or organic.

This replaced an earlier warm gold/black/mono-terminal system in a full redesign on 2026-08-09. If you find gold-toned styling or references to a "terminal" aesthetic anywhere, it's a leftover — the current system is cool-toned (blue/violet) and glow-based, not green/amber terminal.

**Voice and copy:** plain, concrete, outcome-first language, everywhere — page copy, meta descriptions, service cards, bios, and in conversation about the project. Prefer verbs over titles: "I build software" beats "Software Architect." Actively strip buzzwords before shipping copy: no "strategic technical leadership," "delivery oversight," "senior technical judgment," "ecosystems," "stakeholders." The site's actual meta description is the reference tone:

> "I build and take care of software for businesses — websites, internal tools, and automations that keep working, plus managing the projects behind them."

The visual layer carries the techno-noir mood; the copy layer stays plain and businesslike. Don't try to make the copy "match" the aesthetic with sci-fi language — that's not the brand.

**Scope exception:** `app/[locale]/cv/CVClient.tsx` is a printable résumé. It intentionally keeps its own light "paper" theme (navy `#1e3a8a` accent on white) with `@media print` rules forcing a white background. It is not part of the dark techno-noir system and should not be migrated to it.

---

## 2. Color palette

All hex values are defined in `app/globals.css` inside the `@theme inline` block (Tailwind v4 — there is no separate `tailwind.config.js`; this file **is** the config).

### Backgrounds

| Token | Hex | Use |
|---|---|---|
| `--color-bg-void` | `#050608` | Page background, footer, deepest layer |
| `--color-bg-base` | `#080A10` | Secondary background layer |
| `--color-bg-elevated` | `#0D0F16` | Cards, panels, the photo-frame background |
| `--color-bg-elevated-2` | `#12151F` | Further-elevated surfaces (nested panels, hover states) |

### Text

| Token | Hex | Use |
|---|---|---|
| `--color-text-primary` | `#E8E9EC` | Headings, primary body text |
| `--color-text-secondary` | `#8A8FA0` | Secondary copy, taglines, nav links (AA-adjusted) |
| `--color-text-muted` | `#747985` | Muted/meta text — **large or uppercase text only**, not body copy at small sizes |

### Accents

| Token | Hex | Use |
|---|---|---|
| `--color-accent-electric` | `#628DFF` | **Primary accent.** Links, CTA text/fills, active nav state, primary borders on hover |
| `--color-accent-ice` | `#B7D7FF` | Lightest accent — glow highlights, cursor-interaction color in the particle field |
| `--color-accent-violet` | `#675DFF` | Secondary accent — glows, fills, borders **only** (its contrast is ~4.3:1, not safe for small text) |
| `--color-accent-amber` | `#E58945` | Sparing warm accent — CTA emphasis, status, or error states only. Do not use decoratively |

A legacy alias still exists and resolves to the same colors, so old `bg-gold`/`text-gold`/`border-gold` Tailwind utilities keep working:
```
--color-gold: #628DFF        /* alias → electric */
--color-gold-strong: #675DFF /* alias → violet */
```
Don't write new code against `gold` — use the `electric`/`violet` names directly. The alias exists only so un-migrated old code doesn't break.

### Borders

| Token | Value | Use |
|---|---|---|
| `--color-border-subtle` | `rgba(232, 233, 236, 0.06)` | Default card/panel border — this is the `border-white/[0.06]` you'll see everywhere |
| `--color-border-strong` | `rgba(232, 233, 236, 0.12)` | Emphasized dividers |
| `--color-border-accent` | `rgba(98, 141, 255, 0.4)` | Accent-colored border (hover states, focus) |

### The second, parallel token set

`app/globals.css` also defines a separate `:root { /* Theme Colors */ }` block (outside `@theme inline`) that `Header.tsx`, `Navbar.tsx`, and `Footer.tsx` reference directly via `var(--x)` rather than Tailwind utility classes. It overlaps with the palette above but isn't identical — treat it as the same system under different names, not a third palette to invent variants of:

| Var | Hex/value | Maps to |
|---|---|---|
| `--bg-primary` | `#050608` | same as `--color-bg-void` |
| `--bg-primary-rgb` | `5, 6, 8` | RGB form of the above, used in `rgba(var(--bg-primary-rgb), 0.6)` (e.g. the translucent sticky header) |
| `--bg-secondary` / `--card-bg` | `#0D0F16` | same as `--color-bg-elevated` |
| `--text-primary` | `#E8E9EC` | same as `--color-text-primary` |
| `--text-secondary` | `#8A8FA0` | same as `--color-text-secondary` |
| `--border-color` | `#12151A` | header/nav border |
| `--border-2` | `#232838` | a second, unmapped grayscale border step |
| `--dim` | `#2A3040` | unmapped grayscale step |
| `--mid` | `#565C6B` | unmapped grayscale step |
| `--hover-bg` / `--nav-hover-bg` | `rgba(98, 141, 255, 0.05)` | nav link hover fill |
| `--nav-text` | `#8A8FA0` | nav link default color |
| `--nav-active` | `#628DFF` | nav link active/hover color |

If you're styling nav/header/footer-adjacent chrome, match whichever system that file already uses rather than mixing both in one component.

---

## 3. Typography

Fonts are loaded via `next/font/google` in `app/[locale]/layout.tsx` and exposed as CSS variables consumed by the `@theme inline` font tokens in `globals.css`.

| Font | Weights loaded | Variable | Tailwind token | Use |
|---|---|---|---|---|
| Michroma | 400 only | `--font-michroma` | `font-display` | **All headings, site-wide.** Geometric, technical, Eurostile-adjacent. Enforced globally: `@layer base` applies `font-family: var(--font-michroma)` to every `h1`–`h6` automatically |
| Manrope | 300, 400, 500, 600, 700 | `--font-manrope` | `font-sans`, `font-body` | All UI text and article/body copy |
| Space Mono | 400, 700 | `--font-space-mono` | `font-mono` | Metadata, eyebrow labels, timestamps, nav links, numerals, badges only — never long-form body text |
| Noto Sans Lao | 300, 400, 600, 700 | `--font-noto-sans-lao` | n/a (selector-based) | Applied via `:lang(lo)` for the Lao locale |

Because Michroma only ships weight 400, applying `font-black`/`font-bold` utilities to a heading mostly affects the fallback font, not Michroma itself — don't rely on weight variation within headings for emphasis; use color or size instead.

**Lao locale exception:** `.heading-display` normally sets `text-transform: uppercase; letter-spacing: 0.02em`, but under `:lang(lo)` this reverts to `text-transform: none; letter-spacing: normal` since uppercase/tracking don't apply meaningfully to the Lao script.

### Real-world scale examples

- **Eyebrow/meta label** (`.meta-label`): mono, `0.6875rem` (11px), `letter-spacing: 0.22em`, uppercase, `color: var(--color-text-muted)`. Used for brand name, coordinates, timestamps, system tags.
- **Case-study eyebrow** (seen in project pages, not the same class): mono, `text-sm`, heavier `tracking-[8px]`, `font-semibold` — a distinct, wider-tracked variant used specifically as section labels ("PROBLEM", "SOLUTION") on case study pages.
- **Hero H1**: `text-4xl sm:text-5xl md:text-[52px] leading-tight font-black tracking-tight font-display`.
- **Case-study H1**: `text-5xl md:text-7xl font-bold leading-none`, with part of the project name colored `#628DFF` (e.g. "In**On**Out").
- **Tagline/subhead**: `text-xl md:text-2xl text-[#8A8FA0] max-w-2xl leading-relaxed`.
- **Body/article copy** (`.prose-article`): `color: #8A8FA0`, `font-size: 1.0625rem` (17px), `line-height: 1.8`, `max-width: 68ch`, with a serif fallback (`var(--font-body), Georgia, serif`).

---

## 4. Atmosphere effects

These are the reusable CSS primitives defined in `app/globals.css` under `@layer components`. **Reuse these before writing new glow/grain/neon CSS per component** — duplicated hand-rolled effects were the exact mess this system replaced.

### `.glow-orb`
Ambient blurred light source, positioned absolutely behind other content.
```css
.glow-orb {
  position: absolute;
  border-radius: 9999px;
  pointer-events: none;
  filter: blur(60px);
  animation: glow-pulse 7s ease-in-out infinite; /* opacity .8→1, scale 1→1.12 at 50% */
}
```
Modifiers:
- `.glow-orb--electric` — `radial-gradient(ellipse at center, rgba(98,141,255,0.22) 0%, transparent 70%)`
- `.glow-orb--violet` — `radial-gradient(ellipse at center, rgba(103,93,255,0.20) 0%, transparent 70%)`
- `.glow-orb--duo` — two overlaid radial gradients (electric at 35%/40%, violet at 65%/60%) for a dual-light-source look. This is the one used behind the hero portrait.

### `.text-glow-neon`
Neon text effect — white-hot core with a saturated blue halo. A 5-layer `text-shadow` stack:
```css
text-shadow:
  0 0 2px rgba(255,255,255,.95),
  0 0 8px rgba(183,215,255,.85),
  0 0 18px rgba(98,141,255,.75),
  0 0 34px rgba(98,141,255,.55),
  0 0 60px rgba(98,141,255,.35);
animation: neon-glow-pulse 3s ease-in-out infinite; /* intensifies each layer at 50% */
```
Used on the animated portion of the hero headline. Reserve for one hero-level focal point per page — it loses impact if overused.

### `.duotone-photo` + `.duotone-photo-tint`
The cool color-grade recipe applied to portrait photography (used since no new photography was sourced for the redesign — CSS/SVG only, by design):
```css
.duotone-photo {
  filter: grayscale(0.35) contrast(1.08) brightness(0.95);
}
.duotone-photo-tint {
  position: absolute; inset: 0;
  background: linear-gradient(160deg, rgba(103,93,255,0.35) 0%, rgba(98,141,255,0.18) 45%, transparent 75%);
  mix-blend-mode: color;
  pointer-events: none;
}
```
Apply `.duotone-photo` directly to the `<Image>`, then layer a `.duotone-photo-tint` div on top. See `HeroSection.tsx` for the full usage pattern (also includes a bottom-up vignette and asymmetric corner-accent borders — electric top-left, violet bottom-right — on the photo frame). **Not** used on case-study screenshots — those stay untreated (`object-cover`, plain hover scale).

### `.grain-overlay`
Full-viewport film-grain texture, mounted **once, globally**, in `app/[locale]/layout.tsx` — don't re-mount it per page.
```css
.grain-overlay {
  position: fixed; inset: 0; z-index: 9999; pointer-events: none;
  opacity: 0.035;
  mix-blend-mode: overlay;
  background: /* inline SVG feTurbulence fractalNoise, baseFrequency 0.9, 2 octaves, tiled 120×120 */;
  animation: grain-shift 8s steps(8) infinite;
}
```

### `.light-streak`
A diagonal light glint that sweeps across a container.
```css
.light-streak {
  position: absolute; inset: 0 auto 0 -80%; width: 55%;
  background: linear-gradient(108deg, transparent 25%, rgba(183,215,255,.10) 48%, rgba(183,215,255,.20) 53%, rgba(183,215,255,.10) 58%, transparent 72%);
  animation: glint-sweep 5.5s ease-in-out infinite;
  pointer-events: none;
}
```

### `.scanlines-overlay`
Very light repeating-gradient scanline texture — opt-in per section, use sparingly:
```css
.scanlines-overlay {
  position: absolute; inset: 0; pointer-events: none;
  background: repeating-linear-gradient(to bottom, rgba(232,233,236,.025) 0px, rgba(232,233,236,.025) 1px, transparent 1px, transparent 4px);
  opacity: 0.5;
}
```

### `.card-hover`
Standard interactive-card treatment:
```css
.card-hover {
  border: 1px solid rgba(255,255,255,.06);
  transition: all .3s;
}
.card-hover:hover {
  border-color: rgba(98,141,255,.5);
  transform: translateY(-1px);
  box-shadow: 0 12px 40px rgba(98,141,255,.12);
}
```

### Accessibility: reduced motion
All of the above respect `@media (prefers-reduced-motion: reduce)` — `.grain-overlay`, `.glow-orb`, `.light-streak`, and `.text-glow-neon` have their `animation` disabled under this query. Any new looping effect you add should be included in that same media query.

---

## 5. Particle background (signature effect)

`app/components/ParticleBackground.tsx` is the site's ambient, always-on backdrop — a canvas-based particle field mounted globally in the root layout, `fixed inset-0 -z-10 pointer-events-none`, behind everything. This is the single most identity-defining effect on the site; treat it as fixed brand furniture, not a per-page decision.

- **Density-based particle count**, not fixed: one particle per ~16,000px² of viewport, clamped to 45–110 on desktop and 18–40 on mobile (`width < 768px` or coarse pointer).
- **Colors**: weighted random draw from the three core accents — electric `98,141,255` (45%), violet `103,93,255` (30%), ice `183,215,255` (25%) — each particle gets a random alpha between 0.15–0.45.
- **Motion**: slow ambient drift (very low base velocity), wrapping at viewport edges. Particles are repelled from the cursor within a 130px radius (spring-damped return to their drift path) and get a stronger one-off repel burst on click.
- **Constellation lines**: faint connector lines drawn between nearby particles (within 140px) and between particles and the cursor (within 180px), giving the "network/map" look core to the techno-noir identity.
- **Performance/accessibility**: fully disabled under `prefers-reduced-motion: reduce` (bails out before creating particles); pauses via `requestAnimationFrame` cancellation when the tab is hidden; DPR-aware canvas scaling.

Don't add a second, competing ambient background effect to a page — this one is meant to be the only one running at all times.

---

## 6. Layout & component conventions

### Container
Standard content width everywhere: `w-[92%] max-w-[1200px] mx-auto`.

### Cards / panels
```
bg-white/[0.02] border border-white/[0.06] rounded-xl p-6
hover:border-[#628DFF]/30   (or /50 for higher-emphasis cards)
```
Stat/numeral cards center text and use `text-3xl md:text-4xl font-bold text-[#628DFF] font-mono` for the number.

### Buttons
**Primary (filled):**
```
bg-[#628DFF] text-[#050608] px-6-8 py-3 rounded-lg font-display uppercase
hover:bg-[#675DFF] transition-colors
```
**Secondary (outline):**
```
border border-white/[0.06] text-[#8A8FA0] px-6-8 py-3 rounded-lg font-display uppercase text-sm
hover:border-[#628DFF]/50 hover:text-[#E8E9EC] transition-all
```
A third, lighter variant appears on the hero (`py-3 px-5 rounded-[10px] bg-transparent border border-white/[0.06]`, filling with a subtle electric gradient on hover) — use that lighter-weight version specifically for above-the-fold hero CTAs, and the bolder filled/outline pair above for in-page and case-study CTAs.

### Badges / pills
```
font-mono text-xs border border-white/[0.06] text-[#8A8FA0] px-3 py-1 rounded-full
```

### Section eyebrow labels
Two variants exist — use the right one:
- `.meta-label` (11px, 0.22em tracking) for brand-level metadata (name, location, timestamps).
- The heavier `tracking-[8px]` mono variant for in-page section labels on case studies ("PROBLEM", "SOLUTION", "HOW IT WORKS").

### Case-study page template
There's no shared `CaseStudyLayout` component — each case study (`InOnOutCaseStudyClient.tsx`, `OrderBridgeCaseStudyClient.tsx`, etc.) duplicates the same structure. When building a new one, copy this section order:

1. **Hero** — breadcrumb (`font-mono text-sm text-[#8A8FA0]`, current page in `#628DFF`) → tag pills → H1 (`text-5xl md:text-7xl font-bold`, project name partially colored) → tagline → CTAs
2. **Outcomes** — stat grid
3. **Problem** — two-column editorial (`grid-cols-1 lg:grid-cols-[280px_1fr] gap-12`, sticky left label)
4. **Solution** — same two-column pattern, often includes an architecture-flow diagram using `.arch-node-platform` (ice), `.arch-node-middleware` (electric), `.arch-node-pos` (violet)
5. **How It Works** — numbered steps, `text-lg font-bold` step titles
6. **Screenshots** — gallery grid with a `Lightbox` overlay (`bg-black/90 backdrop-blur-sm`, `[ ESC ]` close label, dot indicators using `#628DFF` for active)
7. **Tech Stack** — same two-column editorial pattern
8. **CTA** — closing section, `text-3xl md:text-4xl font-bold` heading

All sections after the hero use `py-20` and `border-t border-white/[0.06]` as a divider. Screenshots get `hover:scale-105` with a bottom gradient caption reveal on hover — no duotone filter (that's reserved for portrait photography, not product screenshots).

### Header / Navbar / Footer
- **Header**: sticky, `min-h-[72px]`, translucent glass (`rgba(var(--bg-primary-rgb), 0.6)` + `backdrop-blur-md`), gains a shadow after 10px of scroll.
- **Navbar**: `.nav-link`/`.nav-link-active` — mono-adjacent, `0.875rem`, `font-weight: 600`, hover lifts `translateY(-2px)` and tints to `#628DFF`; active link gets an inset bottom box-shadow underline. Mobile collapses to a hamburger + dropdown panel.
- **Footer**: `bg-[#050608] border-t border-white/[0.03] py-16`, 3-column grid (brand/tagline, nav links + "connect" label in `#628DFF`, email/GitHub + copyright).

---

## 7. Motion principles

No animation library is used anywhere in the app (no framer-motion, no `motion`). All motion is:
- Native CSS `@keyframes`, defined in `globals.css` and applied as Tailwind arbitrary animations or via the component classes above.
- `app/hooks/useInView.ts` — a custom `IntersectionObserver` hook (`threshold: 0.12`, `rootMargin: '0px 0px -48px 0px'`, fires once) for scroll-reveal on sections that need it.

**Timing convention**: fast UI transitions (hover, focus, color/border changes) run ~150–300ms. Ambient/atmospheric loops (glow pulse, neon pulse, grain shift, light streak) run much slower — 3–8s — using `ease-in-out` or stepped timing functions (`steps()`, `step-end`) specifically to feel mechanical and digital rather than smooth and organic. That deliberate "steppy" quality on the grain/blink animations is part of the aesthetic — don't smooth it out.

**Rule for new work:** keep using CSS keyframes + `useInView`. Don't introduce a JS animation library for something this system already handles natively.

---

## Sources

Everything above was pulled directly from:
- `app/globals.css` (all tokens, keyframes, `@layer base`/`@layer components` primitives)
- `app/[locale]/layout.tsx` (font loading, global providers, metadata/voice)
- `app/components/ParticleBackground.tsx`
- `app/components/home/HeroSection.tsx`
- `app/[locale]/projects/inonout/InOnOutCaseStudyClient.tsx`, `app/[locale]/projects/orderbridge/OrderBridgeCaseStudyClient.tsx`
- `app/components/Header.tsx`, `app/components/Navbar.tsx`, `app/components/Footer.tsx`

If any of these files change, this doc should be updated in the same PR — it's only trustworthy as long as it matches the code.
