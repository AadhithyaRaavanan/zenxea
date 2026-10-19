# @zenxea/tokens

> Universal Zen Xea Design Token & Typography System

A centralized, production-ready design token package for all Zen Xea projects. Provides canonical brand colours, universal typography (Bebas Neue, Manrope, IBM Plex Mono), fluid responsive type scales (CSS `clamp()`), CSS variables, Tailwind CSS preset, light/dark theme support, and WCAG accessibility validation.

---

## 🎨 Universal Brand Colours

| Name | Hex | Usage | Proportion |
|------|-----|-------|------------|
| Warm Off-White | `#F4F1EE` | Page background | Base |
| Periwinkle | `#7E69E8` | Primary brand accent & CTAs | 65% |
| Pure Black | `#000000` | Secondary & high-contrast text | 30% |
| Coral Red | `#FF5A5F` | Accent, alerts & active badges | 5% |

---

## 🔤 Universal Typography System

Typography is universal across all Zen Xea applications, not confined to any single website:

| Font | Role | Weights | CSS Variable | Character & Use |
|------|------|---------|--------------|-----------------|
| **Bebas Neue** | Display & Headlines | 400 | `--zx-font-display` | Oversized hero headlines, section titles, numbers, uppercase condensed styling, tight line-height (0.82–0.95), negative tracking |
| **Manrope** | Body & UI | 400, 500, 600, 700, 800 | `--zx-font-body` | Body paragraphs, buttons, navigation, cards, form inputs, high legibility |
| **IBM Plex Mono** | Metadata & Eyebrows | 400, 500, 600 | `--zx-font-mono` | Section eyebrows, tags, badges, project numbers, code snippets, wide tracking (0.15em) |

### Responsive Fluid Type Scale (`clamp()`)

All font sizes scale dynamically between mobile (375px) and desktop (1280px+) without rigid breakpoint jumps:

| Level | CSS Variable | Fluid Value | Min → Max |
|-------|--------------|-------------|-----------|
| `display` | `--zx-text-display` | `clamp(4rem, 2.286rem + 7.619vw, 9rem)` | 64px → 144px |
| `h1` | `--zx-text-h1` | `clamp(3.5rem, 2.429rem + 4.762vw, 6rem)` | 56px → 96px |
| `h2` | `--zx-text-h2` | `clamp(2.75rem, 1.857rem + 3.968vw, 5rem)` | 44px → 80px |
| `h3` | `--zx-text-h3` | `clamp(2rem, 1.643rem + 1.587vw, 3rem)` | 32px → 48px |
| `h4` | `--zx-text-h4` | `clamp(1.5rem, 1.321rem + 0.794vw, 2rem)` | 24px → 32px |
| `h5` | `--zx-text-h5` | `clamp(1.25rem, 1.161rem + 0.397vw, 1.5rem)` | 20px → 24px |
| `lead` | `--zx-text-body-lg` | `clamp(1.125rem, 1.036rem + 0.397vw, 1.25rem)` | 18px → 20px |
| `body` | `--zx-text-body` | `1rem` | 16px (fixed) |
| `body-sm` | `--zx-text-body-sm` | `0.875rem` | 14px (fixed) |
| `eyebrow` | `--zx-text-overline` | `clamp(0.625rem, 0.58rem + 0.198vw, 0.6875rem)` | 10px → 11px |
| `caption` | `--zx-text-caption` | `clamp(0.6875rem, 0.643rem + 0.198vw, 0.75rem)` | 11px → 12px |
| `button` | `--zx-text-button` | `clamp(0.75rem, 0.705rem + 0.198vw, 0.8125rem)` | 12px → 13px |

---

## 📦 Installation

```bash
# In monorepo workspace
npm install @zenxea/tokens
```

---

## 🚀 Universal Usage Across Any Platform

### 1. Full CSS Bundle (Colours + Typography + Theme)

```css
/* In any web app global stylesheet */
@import "@zenxea/tokens/css";
```

Immediately grants access to:
- Colours: `var(--zx-bg-default)`, `var(--zx-text-brand)`, `var(--zx-interactive-primary-bg)`
- Typography variables: `var(--zx-font-display)`, `var(--zx-text-display)`, `var(--zx-lh-display)`
- Utility classes: `.zx-type-display`, `.zx-type-h1`, `.zx-type-h2`, `.zx-type-eyebrow`, `.zx-type-body`

### 2. Standalone Typography CSS

```css
/* For projects that only need Zen Xea typography */
@import "@zenxea/tokens/typography.css";
```

### 3. Plain HTML / Vite / React / Astro Web Fonts

```html
<!-- Paste into <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;1,400&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
```

Or copy `GOOGLE_FONTS_HTML_TAGS` from the TypeScript API:

```ts
import { GOOGLE_FONTS_HTML_TAGS, GOOGLE_FONTS_URL } from "@zenxea/tokens";
```

### 4. Next.js App Router Integration

```tsx
// app/layout.tsx
import "@zenxea/tokens/css";
import { getThemeScript } from "@zenxea/tokens";
import { Bebas_Neue, Manrope, IBM_Plex_Mono } from "next/font/google";

const fontDisplay = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const fontBody = Manrope({ weight: ["400", "500", "600", "700", "800"], subsets: ["latin"], variable: "--font-body" });
const fontMono = IBM_Plex_Mono({ weight: ["400", "500", "600"], subsets: ["latin"], variable: "--font-mono" });

export default function RootLayout({ children }) {
  return (
    <html className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: getThemeScript() }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 5. Tailwind CSS Integration

```ts
// tailwind.config.ts
import zenxeaPreset from "@zenxea/tokens/tailwind";

export default {
  presets: [zenxeaPreset],
  content: ["./app/**/*.{ts,tsx}"],
};
```

Available Tailwind utility classes:
- **Fonts**: `font-display`, `font-body`, `font-mono`, `font-zx-display`, `font-zx-body`, `font-zx-mono`
- **Fluid Sizes**: `text-zx-display`, `text-zx-h1`, `text-zx-h2`, `text-zx-h3`, `text-zx-h4`, `text-zx-lead`, `text-zx-body`, `text-zx-caption`, `text-zx-eyebrow`, `text-zx-button`
- **Line Heights**: `leading-zx-display`, `leading-zx-h1`, `leading-zx-body`
- **Letter Spacings**: `tracking-zx-display`, `tracking-zx-eyebrow`, `tracking-zx-mono`

### 6. TypeScript API

```ts
import {
  BRAND_COLORS,
  COLOR_SCALES,
  DESIGN_TOKENS,
  FONT_FAMILIES,
  TYPE_SCALE,
  LINE_HEIGHTS,
  LETTER_SPACINGS,
  checkContrast,
} from "@zenxea/tokens";

// Typography metadata
console.log(FONT_FAMILIES.display.name);  // "Bebas Neue"
console.log(TYPE_SCALE.display.clamp);     // "clamp(4rem, 2.286rem + 7.619vw, 9rem)"
console.log(LINE_HEIGHTS.display);         // "0.82"

// Accessibility validation
const contrast = checkContrast("#7E69E8", "#F4F1EE");
console.log(contrast.ratioLabel);          // "4.99:1"
```

### 7. W3C DTCG Token JSON Export

```ts
import tokens from "@zenxea/tokens/json";
// W3C Design Tokens Community Group format for Figma, Style Dictionary, iOS & Android
```

---

## 🛠️ Validation & Accessibility

```bash
cd packages/tokens
npm run validate
```

Runs comprehensive validation across:
- Hex format checks for brand palette
- WCAG 2.1 contrast checks for all semantic colour pairings
- Font families and fluid type scale validation
- Universal Google Fonts URL validation

---

## 🏗️ Build

```bash
cd packages/tokens
npm run build
```

Emits:
- `dist/index.js` + `dist/index.d.ts` (Universal TS API)
- `dist/typography.js` + `dist/typography.d.ts` (Universal Typography API)
- `dist/zenxea-tokens.css` (Full CSS bundle)
- `dist/zenxea-typography.css` (Standalone Typography CSS)
- `dist/tailwind-preset.js` (Tailwind preset)
- `dist/tokens.json` (W3C DTCG JSON)
