/**
 * @zenxea/tokens — CSS Variable, Font-Face & Utility Generation
 *
 * All brand fonts (Bebas Neue, Manrope, IBM Plex Mono) are packaged directly
 * inside @zenxea/tokens via self-contained @font-face rules and CSS variables.
 *
 * Generated outputs:
 *   1. dist/zenxea-tokens.css — Complete bundle (Embedded @font-face, colours, themes, typography variables, utility classes, base resets)
 *   2. dist/zenxea-typography.css — Dedicated typography stylesheet
 */

import { DESIGN_TOKENS, getFlatTokens } from "./tokens";
import { BRAND_COLORS, COLOR_SCALES } from "./colors";
import {
  FONT_FAMILIES,
  FONT_WEIGHTS,
  TYPE_SCALE,
  LINE_HEIGHTS,
  LETTER_SPACINGS,
} from "./typography";
import { FONT_FACE_CSS } from "./font-faces";

// ─── CSS Generator ────────────────────────────────────────────────────────────

/**
 * Generate CSS variable declarations for a given theme.
 * Returns lines like: `  --zx-bg-default: #F4F1EE;`
 */
export function generateThemeVars(theme: "light" | "dark"): string[] {
  const tokens = getFlatTokens();
  return tokens.map((token) => {
    const value = theme === "light" ? token.light : token.dark;
    return `  --${token.variable}: ${value};`;
  });
}

/**
 * Generate all Typography CSS Variables on :root.
 */
export function buildTypographyVars(): string[] {
  return [
    `  /* ── Universal Font Families (Embedded Web Fonts) ─────────────── */`,
    `  --zx-font-display: ${FONT_FAMILIES.display.stack};`,
    `  --zx-font-body:    ${FONT_FAMILIES.body.stack};`,
    `  --zx-font-mono:    ${FONT_FAMILIES.mono.stack};`,
    `  --zx-font-sans:    var(--zx-font-body);`,
    `  --font-display:    var(--zx-font-display);`,
    `  --font-body:       var(--zx-font-body);`,
    `  --font-mono:       var(--zx-font-mono);`,
    ``,
    `  /* ── Font Weights ────────────────────────────────────────────── */`,
    `  --zx-weight-regular:   ${FONT_WEIGHTS.regular};`,
    `  --zx-weight-medium:    ${FONT_WEIGHTS.medium};`,
    `  --zx-weight-semibold:  ${FONT_WEIGHTS.semibold};`,
    `  --zx-weight-bold:      ${FONT_WEIGHTS.bold};`,
    `  --zx-weight-extrabold: ${FONT_WEIGHTS.extrabold};`,
    ``,
    `  /* ── Responsive Fluid Type Scale (clamp) ─────────────────────── */`,
    ...Object.values(TYPE_SCALE).map(
      (item) => `  --${item.variable}: ${item.clamp};`
    ),
    ``,
    `  /* ── Line Heights ────────────────────────────────────────────── */`,
    ...Object.entries(LINE_HEIGHTS).map(
      ([key, val]) => `  --zx-lh-${key}: ${val};`
    ),
    ``,
    `  /* ── Letter Spacings ─────────────────────────────────────────── */`,
    ...Object.entries(LETTER_SPACINGS).map(
      ([key, val]) => `  --zx-ls-${key}: ${val};`
    ),
  ];
}

/**
 * Base typographic element resets included directly in the package.
 */
export function buildTypographyBaseResets(): string {
  return `
/* ─── Universal Typography Base Resets ───────────────────────────────────── */
h1, h2, h3 {
  font-family: var(--zx-font-display);
  text-transform: uppercase;
  letter-spacing: var(--zx-ls-display);
  line-height: var(--zx-lh-display);
  margin-top: 0;
}

h4, h5, h6 {
  font-family: var(--zx-font-body);
  letter-spacing: var(--zx-ls-h4);
  line-height: var(--zx-lh-h4);
  margin-top: 0;
}

p {
  margin-top: 0;
  margin-bottom: var(--zx-space-4);
  line-height: var(--zx-lh-body);
}

code, kbd, samp, pre {
  font-family: var(--zx-font-mono);
}
`;
}

/**
 * Generate Universal Typography Utility Classes.
 */
export function buildTypographyUtilityClasses(): string {
  return `
/* ─── Universal Typography Utility Classes ───────────────────────────────── */

/* Bebas Neue Uppercase Headlines */
.zx-type-display,
.type-display {
  font-family: var(--zx-font-display);
  font-size: var(--zx-text-display);
  line-height: var(--zx-lh-display);
  letter-spacing: var(--zx-ls-display);
  font-weight: 400;
  text-transform: uppercase;
}

.zx-type-h1,
.type-h1 {
  font-family: var(--zx-font-display);
  font-size: var(--zx-text-h1);
  line-height: var(--zx-lh-h1);
  letter-spacing: var(--zx-ls-h1);
  font-weight: 400;
  text-transform: uppercase;
}

.zx-type-h2,
.type-h2 {
  font-family: var(--zx-font-display);
  font-size: var(--zx-text-h2);
  line-height: var(--zx-lh-h2);
  letter-spacing: var(--zx-ls-h2);
  font-weight: 400;
  text-transform: uppercase;
}

.zx-type-h3,
.type-h3 {
  font-family: var(--zx-font-display);
  font-size: var(--zx-text-h3);
  line-height: var(--zx-lh-h3);
  letter-spacing: var(--zx-ls-h3);
  font-weight: 400;
  text-transform: uppercase;
}

/* Manrope Structured Headings */
.zx-type-h4,
.type-h4 {
  font-family: var(--zx-font-body);
  font-size: var(--zx-text-h4);
  line-height: var(--zx-lh-h4);
  letter-spacing: var(--zx-ls-h4);
  font-weight: var(--zx-weight-bold);
}

.zx-type-h5,
.type-h5 {
  font-family: var(--zx-font-body);
  font-size: var(--zx-text-h5);
  line-height: var(--zx-lh-h5);
  letter-spacing: var(--zx-ls-h5);
  font-weight: var(--zx-weight-semibold);
}

/* Body & Paragraphs */
.zx-type-lead,
.type-lead {
  font-family: var(--zx-font-body);
  font-size: var(--zx-text-body-lg);
  line-height: var(--zx-lh-body-lg);
  letter-spacing: var(--zx-ls-body);
  font-weight: var(--zx-weight-regular);
}

.zx-type-body,
.type-body {
  font-family: var(--zx-font-body);
  font-size: var(--zx-text-body);
  line-height: var(--zx-lh-body);
  letter-spacing: var(--zx-ls-body);
  font-weight: var(--zx-weight-regular);
}

.zx-type-body-sm,
.type-body-sm {
  font-family: var(--zx-font-body);
  font-size: var(--zx-text-body-sm);
  line-height: var(--zx-lh-body-sm);
  letter-spacing: var(--zx-ls-body-sm);
  font-weight: var(--zx-weight-regular);
}

/* Eyebrows, Labels & IBM Plex Mono */
.zx-type-eyebrow,
.type-eyebrow {
  font-family: var(--zx-font-mono);
  font-size: var(--zx-text-overline);
  line-height: var(--zx-lh-nav);
  letter-spacing: var(--zx-ls-eyebrow);
  font-weight: var(--zx-weight-medium);
  text-transform: uppercase;
}

.zx-type-mono,
.type-mono {
  font-family: var(--zx-font-mono);
  font-size: var(--zx-text-body-sm);
  line-height: 1.5;
  letter-spacing: var(--zx-ls-mono);
  font-weight: var(--zx-weight-regular);
}

/* Interactive & UI */
.zx-type-button,
.type-button {
  font-family: var(--zx-font-body);
  font-size: var(--zx-text-button);
  line-height: var(--zx-lh-button);
  letter-spacing: var(--zx-ls-button);
  font-weight: var(--zx-weight-bold);
  text-transform: uppercase;
}

.zx-type-nav,
.type-nav {
  font-family: var(--zx-font-body);
  font-size: var(--zx-text-button);
  line-height: var(--zx-lh-nav);
  letter-spacing: var(--zx-ls-nav);
  font-weight: var(--zx-weight-semibold);
  text-transform: uppercase;
}

.zx-type-caption,
.type-caption {
  font-family: var(--zx-font-body);
  font-size: var(--zx-text-caption);
  line-height: var(--zx-lh-caption);
  letter-spacing: var(--zx-ls-caption);
  font-weight: var(--zx-weight-regular);
}

/* Rich text container */
.zx-prose {
  font-family: var(--zx-font-body);
  font-size: var(--zx-text-body);
  line-height: var(--zx-lh-body);
  color: var(--zx-text-default);
}
.zx-prose p + p {
  margin-top: 1.25em;
}
.zx-prose h1, .zx-prose h2, .zx-prose h3 {
  font-family: var(--zx-font-display);
  text-transform: uppercase;
  margin-top: 2em;
  margin-bottom: 0.5em;
}
`;
}

/**
 * Build the complete CSS string for dist/zenxea-tokens.css:
 *  - Embedded @font-face declarations (Bebas Neue, Manrope, IBM Plex Mono)
 *  - :root (colours, scales, typography variables, utility tokens)
 *  - [data-theme="dark"]
 *  - @media (prefers-color-scheme: dark)
 *  - Universal base element resets
 *  - Universal typography utility classes
 */
export function generateCSSVariables(): string {
  const lightVars = generateThemeVars("light");
  const darkVars = generateThemeVars("dark");
  const scaleVars = buildScaleVars();
  const typographyVars = buildTypographyVars();
  const utilityVars = buildUtilityVars();
  const baseResets = buildTypographyBaseResets();
  const utilityClasses = buildTypographyUtilityClasses();

  return `/**
 * Zen Xea Design Tokens — Universal CSS Variables, Fonts & Utilities
 * @version ${DESIGN_TOKENS.version}
 * @brand ${DESIGN_TOKENS.brand}
 *
 * Includes:
 *   - Universal @font-face rules for Bebas Neue, Manrope, and IBM Plex Mono
 *   - Semantic colours & dark mode
 *   - Brand colour scales
 *   - Fluid responsive clamp() type scales
 *   - Universal base element resets & typography utility classes
 *
 * Usage:
 *   import "@zenxea/tokens/css";
 *
 * DO NOT EDIT DIRECTLY — generated by @zenxea/tokens.
 */

/* ─── Universal Embedded @font-face Declarations ─────────────────────────── */
${FONT_FACE_CSS}

/* ─── Light Theme & Universal Tokens (default) ────────────────────────────── */
:root,
[data-theme="light"] {
  /* ── Universal Typography Tokens ───────────────────────────────────────── */
${typographyVars.join("\n")}

  /* ── Semantic Colour Tokens ─────────────────────────────────────────────── */
${lightVars.join("\n")}

  /* ── Colour Scales ─────────────────────────────────────────────────────── */
${scaleVars.join("\n")}

  /* ── Structural & Elevation Utilities ──────────────────────────────────── */
${utilityVars.join("\n")}
}

/* ─── Dark Theme (explicit attribute) ────────────────────────────────────── */
[data-theme="dark"] {
${darkVars.join("\n")}
}

/* ─── Dark Theme (system preference fallback) ────────────────────────────── */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
${darkVars.map((line) => "  " + line).join("\n")}
  }
}
${baseResets}
${utilityClasses}
`;
}

/**
 * Generate dedicated standalone Typography CSS for dist/zenxea-typography.css.
 * Can be loaded with `@import "@zenxea/tokens/typography.css";`
 */
export function generateTypographyCSS(): string {
  const typographyVars = buildTypographyVars();
  const baseResets = buildTypographyBaseResets();
  const utilityClasses = buildTypographyUtilityClasses();

  return `/**
 * Zen Xea Typography System — Standalone CSS
 * @version ${DESIGN_TOKENS.version}
 * @brand ${DESIGN_TOKENS.brand}
 *
 * Includes:
 *   - Embedded @font-face declarations (Bebas Neue, Manrope, IBM Plex Mono)
 *   - Fluid clamp() font-size scale
 *   - Line heights, letter spacings, base resets, and utility classes
 *
 * Usage:
 *   import "@zenxea/tokens/typography.css";
 */

${FONT_FACE_CSS}

:root {
${typographyVars.join("\n")}
}

${baseResets}
${utilityClasses}
`;
}

// ─── Scale Vars ───────────────────────────────────────────────────────────────

function buildScaleVars(): string[] {
  const lines: string[] = [];
  for (const [colorName, shades] of Object.entries(COLOR_SCALES)) {
    for (const [shade, value] of Object.entries(shades)) {
      lines.push(`  --zx-color-${colorName}-${shade}: ${value};`);
    }
  }
  return lines;
}

// ─── Utility Vars ─────────────────────────────────────────────────────────────

function buildUtilityVars(): string[] {
  return [
    `  /* ── Raw Brand Aliases ────────────────────────────────────────── */`,
    `  --zx-raw-primary: ${BRAND_COLORS.primary};`,
    `  --zx-raw-secondary: ${BRAND_COLORS.secondary};`,
    `  --zx-raw-accent: ${BRAND_COLORS.accent};`,
    `  --zx-raw-background: ${BRAND_COLORS.background};`,
    ``,
    `  /* ── Border Radii ─────────────────────────────────────────────── */`,
    `  --zx-radius-sm: 4px;`,
    `  --zx-radius-md: 8px;`,
    `  --zx-radius-lg: 16px;`,
    `  --zx-radius-xl: 24px;`,
    `  --zx-radius-full: 9999px;`,
    ``,
    `  /* ── Shadows (Zero-shadow / Crisp lines design) ──────────────── */`,
    `  --zx-shadow-none: none;`,
    `  --zx-shadow-sm: none;`,
    `  --zx-shadow-md: none;`,
    `  --zx-shadow-lg: none;`,
    `  --zx-shadow-brand: none;`,
    ``,
    `  /* ── Transitions ─────────────────────────────────────────────── */`,
    `  --zx-transition-fast: 150ms ease;`,
    `  --zx-transition-base: 250ms ease;`,
    `  --zx-transition-slow: 400ms ease;`,
    ``,
    `  /* ── Spacing Scale (base 4px) ─────────────────────────────────── */`,
    `  --zx-space-1: 0.25rem;`,
    `  --zx-space-2: 0.5rem;`,
    `  --zx-space-3: 0.75rem;`,
    `  --zx-space-4: 1rem;`,
    `  --zx-space-6: 1.5rem;`,
    `  --zx-space-8: 2rem;`,
    `  --zx-space-12: 3rem;`,
    `  --zx-space-16: 4rem;`,
    `  --zx-space-24: 6rem;`,
    `  --zx-space-32: 8rem;`,
    ``,
    `  /* ── Z-Index Ladder ───────────────────────────────────────────── */`,
    `  --zx-z-base: 0;`,
    `  --zx-z-raised: 10;`,
    `  --zx-z-dropdown: 100;`,
    `  --zx-z-sticky: 200;`,
    `  --zx-z-overlay: 300;`,
    `  --zx-z-modal: 400;`,
    `  --zx-z-toast: 500;`,
    `  --zx-z-tooltip: 600;`,
  ];
}
