/**
 * @zenxea/design-tokens — Complete CSS Generator
 *
 * Generates unified CSS variable definitions, responsive grid rules,
 * fluid container classes, Swiss modular layout primitives, spacing tokens,
 * embedded @font-face rules, and digital brutalist border utilities.
 *
 * Output files:
 *   - dist/zenxea-tokens.css   (Full unified bundle)
 *   - dist/zenxea-layout.css   (Layout, grid, container & spacing only)
 *   - dist/zenxea-typography.css (Typography & embedded fonts only)
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
import {
  SPACING_SCALE,
  COMPONENT_SPACING,
  CARD_SPACING,
  SECTION_SPACING,
  GAP_SPACING,
  getSpacingVarName,
  SpacingScaleKey,
} from "./spacing";
import { BREAKPOINTS } from "./breakpoints";
import { GRID_CONFIG } from "./grid";
import { CONTAINER_MAX_WIDTHS, CONTAINER_GUTTERS } from "./containers";

// ─── 1. Theme Color Declarations ──────────────────────────────────────────────

export function generateThemeVars(theme: "light" | "dark"): string[] {
  const tokens = getFlatTokens();
  return tokens.map((token) => {
    const value = theme === "light" ? token.light : token.dark;
    return `  --${token.variable}: ${value};`;
  });
}

// ─── 2. Typography Declarations ───────────────────────────────────────────────

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

// ─── 3. Spacing Declarations ──────────────────────────────────────────────────

export function buildSpacingVars(): string[] {
  const lines: string[] = [
    `  /* ── Linear Spacing Scale (Base 4px) ─────────────────────────── */`,
  ];

  const sortedSteps = Object.entries(SPACING_SCALE).sort(
    (a, b) => Number(a[0]) - Number(b[0])
  );

  for (const [step, token] of sortedSteps) {
    const varName = getSpacingVarName(step as SpacingScaleKey);
    lines.push(`  ${varName}: ${token.rem};`);
  }

  lines.push(
    ``,
    `  /* ── Semantic Component Spacing ───────────────────────────────── */`
  );
  for (const token of Object.values(COMPONENT_SPACING)) {
    lines.push(`  ${token.cssVariable}: ${token.value};`);
  }

  lines.push(
    ``,
    `  /* ── Semantic Card Spacing ────────────────────────────────────── */`
  );
  for (const token of Object.values(CARD_SPACING)) {
    lines.push(`  ${token.cssVariable}: ${token.value};`);
  }

  lines.push(
    ``,
    `  /* ── Fluid Section Spacing (clamp) ────────────────────────────── */`
  );
  for (const token of Object.values(SECTION_SPACING)) {
    lines.push(`  ${token.cssVariable}: ${token.value};`);
  }

  lines.push(
    ``,
    `  /* ── Gap Scale ────────────────────────────────────────────────── */`
  );
  for (const token of Object.values(GAP_SPACING)) {
    lines.push(`  ${token.cssVariable}: ${token.value};`);
  }

  return lines;
}

// ─── 4. Breakpoint & Layout Declarations ───────────────────────────────────────

export function buildBreakpointVars(): string[] {
  return [
    `  /* ── Responsive Breakpoints ───────────────────────────────────── */`,
    ...Object.values(BREAKPOINTS).map(
      (bp) => `  ${bp.cssVariable}: ${bp.px}px;`
    ),
  ];
}

export function buildContainerVars(): string[] {
  return [
    `  /* ── Container Max-Widths & Gutters ───────────────────────────── */`,
    ...Object.values(CONTAINER_MAX_WIDTHS).map(
      (c) => `  ${c.cssVariable}: ${c.rem};`
    ),
    `  --zx-container-gutter: ${CONTAINER_GUTTERS.fluid};`,
  ];
}

export function buildGridVars(): string[] {
  return [
    `  /* ── Swiss Modular Grid Tokens ────────────────────────────────── */`,
    `  --zx-grid-columns: ${GRID_CONFIG.desktop.columns};`,
    `  --zx-grid-gutter:  ${GRID_CONFIG.fluid.gutter};`,
    `  --zx-grid-margin:  ${GRID_CONFIG.fluid.margin};`,
  ];
}

// ─── 5. Scale & Utility Token Lines ───────────────────────────────────────────

function buildScaleVars(): string[] {
  const lines: string[] = [];
  for (const [colorName, shades] of Object.entries(COLOR_SCALES)) {
    for (const [shade, value] of Object.entries(shades)) {
      lines.push(`  --zx-color-${colorName}-${shade}: ${value};`);
    }
  }
  return lines;
}

function buildUtilityVars(): string[] {
  return [
    `  /* ── Raw Brand Aliases ────────────────────────────────────────── */`,
    `  --zx-raw-primary: ${BRAND_COLORS.primary};`,
    `  --zx-raw-secondary: ${BRAND_COLORS.secondary};`,
    `  --zx-raw-accent: ${BRAND_COLORS.accent};`,
    `  --zx-raw-background: ${BRAND_COLORS.background};`,
    ``,
    `  /* ── Border Radii (Swiss Modular & Brutalism defaults) ────────── */`,
    `  --zx-radius-none: 0px;`,
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
    `  --zx-shadow-brutal: none;`,
    ``,
    `  /* ── Transitions ─────────────────────────────────────────────── */`,
    `  --zx-transition-fast: 150ms ease;`,
    `  --zx-transition-base: 250ms ease;`,
    `  --zx-transition-slow: 400ms ease;`,
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

// ─── 6. Base Resets ───────────────────────────────────────────────────────────

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

// ─── 7. Typography Utility Classes ────────────────────────────────────────────

export function buildTypographyUtilityClasses(): string {
  return `
/* ─── Universal Typography Utility Classes ───────────────────────────────── */
.zx-type-display, .type-display {
  font-family: var(--zx-font-display);
  font-size: var(--zx-text-display);
  line-height: var(--zx-lh-display);
  letter-spacing: var(--zx-ls-display);
  font-weight: 400;
  text-transform: uppercase;
}

.zx-type-h1, .type-h1 {
  font-family: var(--zx-font-display);
  font-size: var(--zx-text-h1);
  line-height: var(--zx-lh-h1);
  letter-spacing: var(--zx-ls-h1);
  font-weight: 400;
  text-transform: uppercase;
}

.zx-type-h2, .type-h2 {
  font-family: var(--zx-font-display);
  font-size: var(--zx-text-h2);
  line-height: var(--zx-lh-h2);
  letter-spacing: var(--zx-ls-h2);
  font-weight: 400;
  text-transform: uppercase;
}

.zx-type-h3, .type-h3 {
  font-family: var(--zx-font-display);
  font-size: var(--zx-text-h3);
  line-height: var(--zx-lh-h3);
  letter-spacing: var(--zx-ls-h3);
  font-weight: 400;
  text-transform: uppercase;
}

.zx-type-h4, .type-h4 {
  font-family: var(--zx-font-body);
  font-size: var(--zx-text-h4);
  line-height: var(--zx-lh-h4);
  letter-spacing: var(--zx-ls-h4);
  font-weight: var(--zx-weight-bold);
}

.zx-type-h5, .type-h5 {
  font-family: var(--zx-font-body);
  font-size: var(--zx-text-h5);
  line-height: var(--zx-lh-h5);
  letter-spacing: var(--zx-ls-h5);
  font-weight: var(--zx-weight-semibold);
}

.zx-type-lead, .type-lead {
  font-family: var(--zx-font-body);
  font-size: var(--zx-text-body-lg);
  line-height: var(--zx-lh-body-lg);
  letter-spacing: var(--zx-ls-body);
  font-weight: var(--zx-weight-regular);
}

.zx-type-body, .type-body {
  font-family: var(--zx-font-body);
  font-size: var(--zx-text-body);
  line-height: var(--zx-lh-body);
  letter-spacing: var(--zx-ls-body);
  font-weight: var(--zx-weight-regular);
}

.zx-type-body-sm, .type-body-sm {
  font-family: var(--zx-font-body);
  font-size: var(--zx-text-body-sm);
  line-height: var(--zx-lh-body-sm);
  letter-spacing: var(--zx-ls-body-sm);
  font-weight: var(--zx-weight-regular);
}

.zx-type-eyebrow, .type-eyebrow {
  font-family: var(--zx-font-mono);
  font-size: var(--zx-text-overline);
  line-height: var(--zx-lh-nav);
  letter-spacing: var(--zx-ls-eyebrow);
  font-weight: var(--zx-weight-medium);
  text-transform: uppercase;
}

.zx-type-mono, .type-mono {
  font-family: var(--zx-font-mono);
  font-size: var(--zx-text-body-sm);
  line-height: 1.5;
  letter-spacing: var(--zx-ls-mono);
  font-weight: var(--zx-weight-regular);
}

.zx-type-button, .type-button {
  font-family: var(--zx-font-body);
  font-size: var(--zx-text-button);
  line-height: var(--zx-lh-button);
  letter-spacing: var(--zx-ls-button);
  font-weight: var(--zx-weight-bold);
  text-transform: uppercase;
}

.zx-type-nav, .type-nav {
  font-family: var(--zx-font-body);
  font-size: var(--zx-text-button);
  line-height: var(--zx-lh-nav);
  letter-spacing: var(--zx-ls-nav);
  font-weight: var(--zx-weight-semibold);
  text-transform: uppercase;
}

.zx-type-caption, .type-caption {
  font-family: var(--zx-font-body);
  font-size: var(--zx-text-caption);
  line-height: var(--zx-lh-caption);
  letter-spacing: var(--zx-ls-caption);
  font-weight: var(--zx-weight-regular);
}

.zx-prose {
  font-family: var(--zx-font-body);
  font-size: var(--zx-text-body);
  line-height: var(--zx-lh-body);
  color: var(--zx-text-default);
}
.zx-prose p + p { margin-top: 1.25em; }
.zx-prose h1, .zx-prose h2, .zx-prose h3 {
  font-family: var(--zx-font-display);
  text-transform: uppercase;
  margin-top: 2em;
  margin-bottom: 0.5em;
}
`;
}

// ─── 8. Container & Layout Utilities ──────────────────────────────────────────

export function buildLayoutUtilityClasses(): string {
  return `
/* ─── Universal Container System ─────────────────────────────────────────── */
.zx-container {
  width: 100%;
  max-width: var(--zx-container-xl);
  margin-inline: auto;
  padding-inline: var(--zx-container-gutter);
}

.zx-container-sm   { width: 100%; max-width: var(--zx-container-sm); margin-inline: auto; padding-inline: var(--zx-container-gutter); }
.zx-container-md   { width: 100%; max-width: var(--zx-container-md); margin-inline: auto; padding-inline: var(--zx-container-gutter); }
.zx-container-lg   { width: 100%; max-width: var(--zx-container-lg); margin-inline: auto; padding-inline: var(--zx-container-gutter); }
.zx-container-xl   { width: 100%; max-width: var(--zx-container-xl); margin-inline: auto; padding-inline: var(--zx-container-gutter); }
.zx-container-2xl  { width: 100%; max-width: var(--zx-container-2xl); margin-inline: auto; padding-inline: var(--zx-container-gutter); }
.zx-container-fluid { width: 100%; max-width: 100%; padding-inline: var(--zx-container-gutter); }

/* Breakout utility to escape constrained container */
.zx-breakout {
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
}

/* ─── Swiss Modular Grid (12 / 8 / 4 Responsive) ─────────────────────────── */
.zx-grid {
  display: grid;
  grid-template-columns: repeat(var(--zx-grid-columns), minmax(0, 1fr));
  gap: var(--zx-grid-gutter);
  width: 100%;
}

/* Fixed column overrides when explicit geometry is requested */
.zx-grid-12 { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: var(--zx-grid-gutter); }
.zx-grid-8  { display: grid; grid-template-columns: repeat(8,  minmax(0, 1fr)); gap: var(--zx-grid-gutter); }
.zx-grid-6  { display: grid; grid-template-columns: repeat(6,  minmax(0, 1fr)); gap: var(--zx-grid-gutter); }
.zx-grid-4  { display: grid; grid-template-columns: repeat(4,  minmax(0, 1fr)); gap: var(--zx-grid-gutter); }
.zx-grid-3  { display: grid; grid-template-columns: repeat(3,  minmax(0, 1fr)); gap: var(--zx-grid-gutter); }
.zx-grid-2  { display: grid; grid-template-columns: repeat(2,  minmax(0, 1fr)); gap: var(--zx-grid-gutter); }
.zx-grid-1  { display: grid; grid-template-columns: repeat(1,  minmax(0, 1fr)); gap: var(--zx-grid-gutter); }

/* Subgrid */
.zx-subgrid {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: subgrid;
}

/* Column Spans */
.zx-col-1  { grid-column: span 1  / span 1;  }
.zx-col-2  { grid-column: span 2  / span 2;  }
.zx-col-3  { grid-column: span 3  / span 3;  }
.zx-col-4  { grid-column: span 4  / span 4;  }
.zx-col-5  { grid-column: span 5  / span 5;  }
.zx-col-6  { grid-column: span 6  / span 6;  }
.zx-col-7  { grid-column: span 7  / span 7;  }
.zx-col-8  { grid-column: span 8  / span 8;  }
.zx-col-9  { grid-column: span 9  / span 9;  }
.zx-col-10 { grid-column: span 10 / span 10; }
.zx-col-11 { grid-column: span 11 / span 11; }
.zx-col-12 { grid-column: span 12 / span 12; }
.zx-col-full { grid-column: 1 / -1; }

/* Column Offsets */
.zx-col-start-1  { grid-column-start: 1;  }
.zx-col-start-2  { grid-column-start: 2;  }
.zx-col-start-3  { grid-column-start: 3;  }
.zx-col-start-4  { grid-column-start: 4;  }
.zx-col-start-5  { grid-column-start: 5;  }
.zx-col-start-6  { grid-column-start: 6;  }
.zx-col-start-7  { grid-column-start: 7;  }
.zx-col-start-8  { grid-column-start: 8;  }
.zx-col-start-9  { grid-column-start: 9;  }
.zx-col-start-10 { grid-column-start: 10; }
.zx-col-start-11 { grid-column-start: 11; }
.zx-col-start-12 { grid-column-start: 12; }

/* ─── Responsive Grid Columns Adjustment ─────────────────────────────────── */
@media (max-width: 767.98px) {
  :root {
    --zx-grid-columns: 4;
  }
  /* On mobile, columns default to span full unless explicitly styled */
  .zx-grid > * {
    min-width: 0;
  }
}

@media (min-width: 768px) and (max-width: 1023.98px) {
  :root {
    --zx-grid-columns: 8;
  }
}

@media (min-width: 1024px) {
  :root {
    --zx-grid-columns: 12;
  }
}

/* ─── Flex Layout Primitives ─────────────────────────────────────────────── */

/* Stack — Vertical rhythm with uniform gap */
.zx-stack    { display: flex; flex-direction: column; gap: var(--zx-gap-md); }
.zx-stack-xs { display: flex; flex-direction: column; gap: var(--zx-gap-xs); }
.zx-stack-sm { display: flex; flex-direction: column; gap: var(--zx-gap-sm); }
.zx-stack-md { display: flex; flex-direction: column; gap: var(--zx-gap-md); }
.zx-stack-lg { display: flex; flex-direction: column; gap: var(--zx-gap-lg); }
.zx-stack-xl { display: flex; flex-direction: column; gap: var(--zx-gap-xl); }
.zx-stack-2xl { display: flex; flex-direction: column; gap: var(--zx-gap-2xl); }

/* Cluster — Horizontal flex with wrapping */
.zx-cluster    { display: flex; flex-wrap: wrap; align-items: center; gap: var(--zx-gap-md); }
.zx-cluster-xs { display: flex; flex-wrap: wrap; align-items: center; gap: var(--zx-gap-xs); }
.zx-cluster-sm { display: flex; flex-wrap: wrap; align-items: center; gap: var(--zx-gap-sm); }
.zx-cluster-md { display: flex; flex-wrap: wrap; align-items: center; gap: var(--zx-gap-md); }
.zx-cluster-lg { display: flex; flex-wrap: wrap; align-items: center; gap: var(--zx-gap-lg); }
.zx-cluster-xl { display: flex; flex-wrap: wrap; align-items: center; gap: var(--zx-gap-xl); }

/* Row — Horizontal flex alignment */
.zx-row         { display: flex; align-items: center; gap: var(--zx-gap-md); }
.zx-row-between { display: flex; align-items: center; justify-content: space-between; gap: var(--zx-gap-md); }
.zx-row-center  { display: flex; align-items: center; justify-content: center; gap: var(--zx-gap-md); }

/* Split Screen Layouts */
.zx-split-50 {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--zx-grid-gutter);
}
@media (min-width: 768px) {
  .zx-split-50 { grid-template-columns: 1fr 1fr; }
}

.zx-split-60-40 {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--zx-grid-gutter);
}
@media (min-width: 1024px) {
  .zx-split-60-40 { grid-template-columns: 3fr 2fr; }
}

.zx-split-70-30 {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--zx-grid-gutter);
}
@media (min-width: 1024px) {
  .zx-split-70-30 { grid-template-columns: 7fr 3fr; }
}

.zx-split-sidebar {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--zx-grid-gutter);
}
@media (min-width: 1024px) {
  .zx-split-sidebar { grid-template-columns: 280px 1fr; }
}

/* ─── Modern Digital Brutalism & Swiss Modular Boxes ─────────────────────── */
.zx-box {
  background: var(--zx-surface-default);
  border: 1px solid var(--zx-border-default);
  padding: var(--zx-space-card-md);
  border-radius: var(--zx-radius-none);
}

.zx-box-bordered {
  background: var(--zx-surface-default);
  border: 1px solid var(--zx-border-default);
  padding: var(--zx-space-card-md);
}

.zx-box-thick {
  background: var(--zx-surface-default);
  border: 2px solid var(--zx-border-default);
  padding: var(--zx-space-card-md);
}

.zx-box-heavy {
  background: var(--zx-surface-default);
  border: 3px solid var(--zx-secondary);
  padding: var(--zx-space-card-lg);
}

.zx-box-outline {
  background: transparent;
  border: 1px solid var(--zx-border-default);
  padding: var(--zx-space-card-md);
}

.zx-box-inset {
  background: var(--zx-bg-subtle);
  border: 1px solid var(--zx-border-subtle);
  padding: var(--zx-space-card-md);
}

/* Structural Dividers */
.zx-border       { border: 1px solid var(--zx-border-default); }
.zx-border-t     { border-top: 1px solid var(--zx-border-default); }
.zx-border-b     { border-bottom: 1px solid var(--zx-border-default); }
.zx-border-l     { border-left: 1px solid var(--zx-border-default); }
.zx-border-r     { border-right: 1px solid var(--zx-border-default); }
.zx-border-thick { border: 2px solid var(--zx-border-default); }
.zx-border-dashed { border: 1px dashed var(--zx-border-default); }
.zx-border-brand { border: 1px solid var(--zx-border-brand); }

/* Swiss Modular Grid Borders (creates visual architectural line grid) */
.zx-grid-bordered {
  display: grid;
  grid-template-columns: repeat(var(--zx-grid-columns), minmax(0, 1fr));
  border-top: 1px solid var(--zx-border-default);
  border-left: 1px solid var(--zx-border-default);
}
.zx-grid-bordered > * {
  border-right: 1px solid var(--zx-border-default);
  border-bottom: 1px solid var(--zx-border-default);
  padding: var(--zx-space-card-md);
  min-width: 0;
}

/* ─── Section Wrappers ───────────────────────────────────────────────────── */
.zx-section {
  width: 100%;
  padding-block: var(--zx-space-section-md);
}
.zx-section-xs { width: 100%; padding-block: var(--zx-space-section-xs); }
.zx-section-sm { width: 100%; padding-block: var(--zx-space-section-sm); }
.zx-section-md { width: 100%; padding-block: var(--zx-space-section-md); }
.zx-section-lg { width: 100%; padding-block: var(--zx-space-section-lg); }
.zx-section-xl { width: 100%; padding-block: var(--zx-space-section-xl); }
.zx-section-2xl { width: 100%; padding-block: var(--zx-space-section-2xl); }

.zx-section-bordered {
  width: 100%;
  padding-block: var(--zx-space-section-md);
  border-top: 1px solid var(--zx-border-default);
  border-bottom: 1px solid var(--zx-border-default);
}
`;
}

// ─── 9. Build Complete Bundle ─────────────────────────────────────────────────

export function generateCSSVariables(): string {
  const lightVars = generateThemeVars("light");
  const darkVars = generateThemeVars("dark");
  const scaleVars = buildScaleVars();
  const typographyVars = buildTypographyVars();
  const spacingVars = buildSpacingVars();
  const breakpointVars = buildBreakpointVars();
  const containerVars = buildContainerVars();
  const gridVars = buildGridVars();
  const utilityVars = buildUtilityVars();
  const baseResets = buildTypographyBaseResets();
  const typographyClasses = buildTypographyUtilityClasses();
  const layoutClasses = buildLayoutUtilityClasses();

  return `/**
 * Zen Xea Design Tokens — Universal Design System CSS
 * @version ${DESIGN_TOKENS.version}
 * @brand ${DESIGN_TOKENS.brand}
 *
 * Includes:
 *   - Universal @font-face rules (Bebas Neue, Manrope, IBM Plex Mono)
 *   - Semantic colours & dark mode
 *   - Brand colour scales
 *   - Fluid responsive clamp() type scales
 *   - Base 4px spacing tokens & fluid section spacers
 *   - Responsive 12 / 8 / 4 Swiss modular grid system
 *   - Container max-widths & fluid gutters
 *   - Modern Digital Brutalism structural layout utilities
 *
 * Usage:
 *   @import "@zenxea/design-tokens/css";
 *
 * DO NOT EDIT DIRECTLY — generated by @zenxea/design-tokens.
 */

/* ─── Universal Embedded @font-face Declarations ─────────────────────────── */
${FONT_FACE_CSS}

/* ─── Global Box-Sizing & Overflow Safety ────────────────────────────────── */
*, *::before, *::after {
  box-sizing: border-box;
}

/* ─── Light Theme & Universal Tokens (default) ────────────────────────────── */
:root,
[data-theme="light"] {
  /* ── Universal Typography Tokens ───────────────────────────────────────── */
${typographyVars.join("\n")}

  /* ── Spacing Tokens ────────────────────────────────────────────────────── */
${spacingVars.join("\n")}

  /* ── Breakpoints ───────────────────────────────────────────────────────── */
${breakpointVars.join("\n")}

  /* ── Container Tokens ──────────────────────────────────────────────────── */
${containerVars.join("\n")}

  /* ── Swiss Modular Grid Tokens ─────────────────────────────────────────── */
${gridVars.join("\n")}

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
${typographyClasses}
${layoutClasses}
`;
}

// ─── 10. Standalone Stylesheets ───────────────────────────────────────────────

export function generateTypographyCSS(): string {
  const typographyVars = buildTypographyVars();
  const baseResets = buildTypographyBaseResets();
  const utilityClasses = buildTypographyUtilityClasses();

  return `/**
 * Zen Xea Typography System — Standalone CSS
 * @version ${DESIGN_TOKENS.version}
 * @brand ${DESIGN_TOKENS.brand}
 *
 * Usage:
 *   @import "@zenxea/design-tokens/typography.css";
 */

${FONT_FACE_CSS}

:root {
${typographyVars.join("\n")}
}

${baseResets}
${utilityClasses}
`;
}

export function generateLayoutCSS(): string {
  const spacingVars = buildSpacingVars();
  const breakpointVars = buildBreakpointVars();
  const containerVars = buildContainerVars();
  const gridVars = buildGridVars();
  const layoutClasses = buildLayoutUtilityClasses();

  return `/**
 * Zen Xea Layout & Spacing System — Standalone CSS
 * @version ${DESIGN_TOKENS.version}
 * @brand ${DESIGN_TOKENS.brand}
 *
 * Usage:
 *   @import "@zenxea/design-tokens/layout.css";
 */

:root {
${spacingVars.join("\n")}
${breakpointVars.join("\n")}
${containerVars.join("\n")}
${gridVars.join("\n")}
}

${layoutClasses}
`;
}
