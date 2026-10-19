# @zenxea/design-tokens

The universal, single source of truth for **Zen Xea Design Tokens** across colors, typography, spacing, breakpoints, Swiss Modular Grid, containers, and Modern Digital Brutalism layout utilities.

Designed to be imported seamlessly into Next.js App Router, React, Tailwind CSS, Vite, Astro, and vanilla web applications.

---

## 📦 Package Architecture

```
@zenxea/design-tokens/
├── colors          # Raw brand colors (#F4F1EE, #7E69E8, #000000, #FF5A5F) & scales
├── typography      # Bebas Neue, Manrope, IBM Plex Mono, fluid clamp() scales
├── spacing         # 4px linear modular scale (0-64), semantic component & card padding, fluid section spacing
├── breakpoints     # Centralized responsive breakpoints (xs, sm, md, lg, xl, 2xl) & media query helpers
├── grid            # Responsive Swiss Modular Grid (12-col desktop, 8-col tablet, 4-col mobile)
├── containers      # Consistent max-widths (sm, md, lg, xl, 2xl, full) & fluid gutters
├── layout          # Layout primitives: stacks, clusters, split grids, brutalist bordered boxes
├── tailwind        # Tailwind CSS preset mapping all tokens to utilities
├── css             # Universal compiled CSS variables & utilities (zenxea-tokens.css)
├── layout.css      # Standalone layout, grid, and container stylesheet
├── typography.css  # Standalone typography & embedded @font-face stylesheet
├── json            # W3C DTCG format tokens (tokens.json)
├── theme           # Runtime theme manager (light/dark switcher & localStorage)
└── validate        # WCAG 2.1 contrast & token integrity validation
```

---

## 🚀 Installation & Setup

In your project:

```bash
npm install @zenxea/design-tokens
```

### 1. Global CSS Import (Next.js App Router)

In your root `app/layout.tsx` or `globals.css`:

```css
@import "@zenxea/design-tokens/css";
```

Or standalone:

```css
@import "@zenxea/design-tokens/layout.css";
@import "@zenxea/design-tokens/typography.css";
```

### 2. Tailwind CSS Configuration

In `tailwind.config.ts` or `tailwind.config.js`:

```typescript
import zenxeaPreset from "@zenxea/design-tokens/tailwind";
import type { Config } from "tailwindcss";

const config: Config = {
  presets: [zenxeaPreset],
  content: [
    "./src/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
};

export default config;
```

---

## 📐 Token Modules

### 1. Spacing System (`@zenxea/design-tokens/spacing`)

Built on a strict **4px modular scale** (`0.25rem = 4px`):

| Token | Pixels | Rem | Usage |
| :--- | :--- | :--- | :--- |
| `0` | 0px | `0rem` | Reset |
| `1` | 4px | `0.25rem` | Micro spacing, border offsets |
| `2` | 8px | `0.5rem` | Tight tag padding, inline icons |
| `4` | 16px | `1rem` | Base grid gutter, input padding |
| `8` | 32px | `2rem` | Card padding, desktop grid gutters |
| `12` | 48px | `3rem` | Large module spacing |
| `16` | 64px | `4rem` | Section spacing |
| `32` | 128px | `8rem` | Major landing rhythm |
| `64` | 256px | `16rem` | Hero block spacing |

#### Fluid Section Spacing (CSS `clamp()`)
- `--zx-space-section-xs`: `clamp(1.5rem, 1rem + 1vw, 2.5rem)` (24px–40px)
- `--zx-space-section-sm`: `clamp(2rem, 1.5rem + 1.5vw, 3.5rem)` (32px–56px)
- `--zx-space-section-md`: `clamp(3rem, 2rem + 3vw, 5.5rem)` (48px–88px)
- `--zx-space-section-lg`: `clamp(4.5rem, 3rem + 4.5vw, 8rem)` (72px–128px)
- `--zx-space-section-xl`: `clamp(6rem, 4rem + 6vw, 11rem)` (96px–176px)
- `--zx-space-section-2xl`: `clamp(7.5rem, 5rem + 7.5vw, 14rem)` (120px–224px)

---

### 2. Swiss Modular Grid (`@zenxea/design-tokens/grid`)

The grid adapts columns, gutters, and margins dynamically per viewport tier:

| Viewport | Breakpoint | Columns | Gutter | Page Margin |
| :--- | :--- | :--- | :--- | :--- |
| **Desktop** | `>= 1024px` | **12** | `2rem` (32px) | `2rem` (32px) |
| **Tablet** | `768px – 1023px` | **8** | `1.5rem` (24px) | `1.5rem` (24px) |
| **Mobile** | `< 768px` | **4** | `1rem` (16px) | `1rem` (16px) |

#### Utility Classes
- `.zx-grid`: Full Swiss responsive grid
- `.zx-col-span-1` through `.zx-col-span-12`
- `.zx-col-span-full`: Span entire row (`1 / -1`)
- `.zx-grid-bordered`: Swiss grid with 1px brutalist cell borders

---

### 3. Responsive Breakpoints (`@zenxea/design-tokens/breakpoints`)

| Key | Pixels | Rem | Target Device |
| :--- | :--- | :--- | :--- |
| `xs` | `375px` | `23.4375rem` | Small mobile devices |
| `sm` | `640px` | `40rem` | Large phones, phablets |
| `md` | `768px` | `48rem` | Tablets (portrait) / 8-col trigger |
| `lg` | `1024px` | `64rem` | Laptops, small desktops / 12-col trigger |
| `xl` | `1280px` | `80rem` | Standard desktop displays |
| `2xl` | `1536px` | `96rem` | Ultra-wide displays |

TypeScript Media Query Helpers:
```typescript
import { MEDIA_QUERIES } from "@zenxea/design-tokens/breakpoints";

const desktopQuery = MEDIA_QUERIES.up("lg"); // "@media (min-width: 1024px)"
const mobileQuery = MEDIA_QUERIES.mobile;     // "@media (max-width: 767.98px)"
```

---

### 4. Container System (`@zenxea/design-tokens/containers`)

| Container Key | Max Width | Target Use Case |
| :--- | :--- | :--- |
| `sm` | `640px` | Compact reading column, auth forms |
| `md` | `768px` | Editorial prose, articles |
| `lg` | `1024px` | Compact dashboard canvas |
| `xl` | `1280px` | **Canonical Zen Xea desktop page container** |
| `2xl` | `1440px` | Wide media & showcase canvases |
| `full` | `100%` | Fluid edge-to-edge canvas with active gutters |

---

### 5. Modern Digital Brutalism Layout Utilities (`@zenxea/design-tokens/layout`)

- `.zx-container`: Centered page container with fluid gutters (`--zx-container-gutter`)
- `.zx-box`: Brutalist rectangular modular cell
- `.zx-box-bordered`: Sharp rectangular cell with 1px/2px high-contrast structural borders
- `.zx-stack`: Vertical rhythm flex column
- `.zx-cluster`: Horizontal wrapping row for chips, tags, action buttons
- `.zx-split-50`: Equal 50/50 dual-column grid
- `.zx-split-sidebar`: Fixed rail + fluid content column
- `.zx-divider`: Crisp structural border divider (`--zx-border-default`)
- `.zx-section`: Fluid section wrapper (`padding-block: var(--zx-space-section-lg)`)

---

## 🎨 Brand Colours & Typography Preserved

### Brand Palette
- **Warm Off-White**: `#F4F1EE` (Canvas background)
- **Periwinkle**: `#7E69E8` (65% Brand Primary)
- **Pure Black**: `#000000` (30% Structural Secondary)
- **Coral Red**: `#FF5A5F` (5% High-Energy Accent)

### Typography
- **Bebas Neue**: Display headlines (`--zx-font-display`)
- **Manrope**: Body & UI copy (`--zx-font-body`)
- **IBM Plex Mono**: Eyebrows & metadata (`--zx-font-mono`)

---

## 🧪 Validation & Testing

Run token validation to verify WCAG contrast, spacing monotonicity, grid alignment, and container ordering:

```bash
npm run validate
```
