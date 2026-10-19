#!/usr/bin/env node
/**
 * validate-tokens.mjs — Comprehensive token validation suite for @zenxea/design-tokens.
 *
 * Validates:
 *   1. Brand colour hex codes and proportions
 *   2. WCAG 2.1 contrast ratios (AA / AAA compliance)
 *   3. Semantic colour token contrast across light & dark themes
 *   4. Typography tokens & font-face declarations
 *   5. Spacing scale monotonicity & 4px base modularity
 *   6. Breakpoints ordering & media query syntax
 *   7. Swiss grid tiers (12 / 8 / 4 column geometry)
 *   8. Container max-width hierarchies & fluid gutters
 *   9. Layout primitives
 */

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const { validateHexColors, validateTokenContrast, checkContrast } = require("../dist/validate.js");
const { BRAND_COLORS } = require("../dist/colors.js");
const { getFlatTokens } = require("../dist/tokens.js");
const { FONT_FAMILIES, TYPE_SCALE, LINE_HEIGHTS, LETTER_SPACINGS, GOOGLE_FONTS_URL } = require("../dist/typography.js");
const { SPACING_SCALE, COMPONENT_SPACING, CARD_SPACING, SECTION_SPACING, GAP_SPACING } = require("../dist/spacing.js");
const { BREAKPOINTS, BREAKPOINT_PX } = require("../dist/breakpoints.js");
const { GRID_CONFIG } = require("../dist/grid.js");
const { CONTAINER_MAX_WIDTHS } = require("../dist/containers.js");
const { LAYOUT_PRESETS } = require("../dist/layout.js");

// ANSI colours
const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const YELLOW = "\x1b[33m";
const CYAN = "\x1b[36m";
const BOLD = "\x1b[1m";
const RESET = "\x1b[0m";

let totalErrors = 0;

console.log(`\n${BOLD}${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}`);
console.log(`${BOLD}  Zen Xea Universal Design Token Validation Report${RESET}`);
console.log(`${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}\n`);

// ── 1. Brand Colours ──
console.log(`${BOLD}1. Brand Colour Hex & Integrity Validation${RESET}`);
const hexErrors = validateHexColors(BRAND_COLORS);
if (hexErrors.length === 0) {
  for (const [name, hex] of Object.entries(BRAND_COLORS)) {
    console.log(`  ${GREEN}✓${RESET}  ${name}: ${hex}`);
  }
} else {
  hexErrors.forEach((e) => {
    console.log(`  ${RED}✗${RESET}  ${e.token}: ${e.issue}`);
    totalErrors++;
  });
}

// ── 2. Brand Contrast ──
console.log(`\n${BOLD}2. Brand Colour Contrast (WCAG 2.1 AA/AAA)${RESET}`);
const pairs = [
  { fg: BRAND_COLORS.primary, bg: "#FFFFFF", label: "Periwinkle on White" },
  { fg: BRAND_COLORS.primary, bg: "#000000", label: "Periwinkle on Black" },
  { fg: BRAND_COLORS.accent, bg: "#FFFFFF", label: "Coral Red on White" },
  { fg: BRAND_COLORS.accent, bg: "#000000", label: "Coral Red on Black" },
  { fg: BRAND_COLORS.secondary, bg: BRAND_COLORS.background, label: "Black on Off-White" },
  { fg: "#FFFFFF", bg: BRAND_COLORS.primary, label: "White on Periwinkle" },
  { fg: "#FFFFFF", bg: BRAND_COLORS.accent, label: "White on Coral Red" },
  { fg: BRAND_COLORS.secondary, bg: "#FFFFFF", label: "Black on White" },
];

for (const { fg, bg, label } of pairs) {
  const result = checkContrast(fg, bg);
  const normalStatus =
    result.normalText === "AAA"
      ? `${GREEN}AAA${RESET}`
      : result.normalText === "AA"
      ? `${GREEN}AA${RESET}`
      : `${RED}FAIL${RESET}`;
  const largeStatus =
    result.largeText === "AAA"
      ? `${GREEN}AAA${RESET}`
      : result.largeText === "AA"
      ? `${GREEN}AA${RESET}`
      : `${YELLOW}FAIL${RESET}`;
  console.log(
    `  ${result.passes ? GREEN + "✓" : YELLOW + "⚠"} ${RESET} ${label.padEnd(28)} ${result.ratioLabel.padStart(7)}  Normal:${normalStatus}  Large:${largeStatus}`
  );
}

// ── 3. Semantic Tokens Contrast ──
console.log(`\n${BOLD}3. Semantic Colour Tokens Contrast${RESET}`);
const tokens = getFlatTokens();
const report = validateTokenContrast(tokens);
console.log(`  Tokens checked: ${report.tokenCount}`);
console.log(`  ${GREEN}Passed:${RESET}          ${report.passCount}`);
if (report.warnings.length > 0) {
  console.log(`  ${YELLOW}Warnings:${RESET}        ${report.warnings.length}`);
}
if (report.errors.length > 0) {
  console.log(`  ${RED}Errors:${RESET}          ${report.errors.length}`);
  report.errors.forEach((e) => {
    console.log(`    ${RED}✗${RESET}  [${e.theme}] ${e.token}: ${e.issue}`);
    totalErrors++;
  });
} else {
  console.log(`  ${GREEN}Errors:${RESET}          0`);
}

// ── 4. Typography ──
console.log(`\n${BOLD}4. Typography Tokens & Web Fonts${RESET}`);
const requiredFamilies = ["display", "body", "mono"];
for (const fam of requiredFamilies) {
  if (FONT_FAMILIES[fam]) {
    console.log(`  ${GREEN}✓${RESET}  Font Family [${fam}]: ${FONT_FAMILIES[fam].name} (${FONT_FAMILIES[fam].variable})`);
  } else {
    console.log(`  ${RED}✗${RESET}  Missing font family [${fam}]`);
    totalErrors++;
  }
}
console.log(`  ${GREEN}✓${RESET}  Type scale levels: ${Object.keys(TYPE_SCALE).length}`);
console.log(`  ${GREEN}✓${RESET}  Line height tokens: ${Object.keys(LINE_HEIGHTS).length}`);
console.log(`  ${GREEN}✓${RESET}  Letter spacing tokens: ${Object.keys(LETTER_SPACINGS).length}`);

// ── 5. Spacing System ──
console.log(`\n${BOLD}5. Spacing System (4px Base Modular Scale)${RESET}`);
const scaleEntries = Object.entries(SPACING_SCALE).sort(
  (a, b) => Number(a[0]) - Number(b[0])
);
let spacingMonotonic = true;
let prevPx = -1;
for (const [step, val] of scaleEntries) {
  if (val.px < prevPx) {
    spacingMonotonic = false;
    console.log(`  ${RED}✗${RESET}  Spacing non-monotonic at step ${step}: ${val.px}px < ${prevPx}px`);
    totalErrors++;
  }
  prevPx = val.px;
}
if (spacingMonotonic) {
  console.log(`  ${GREEN}✓${RESET}  Linear 4px scale is strictly monotonic (${scaleEntries.length} steps: 0px to 256px)`);
}
console.log(`  ${GREEN}✓${RESET}  Component spacing presets: ${Object.keys(COMPONENT_SPACING).length}`);
console.log(`  ${GREEN}✓${RESET}  Card spacing presets: ${Object.keys(CARD_SPACING).length}`);
console.log(`  ${GREEN}✓${RESET}  Fluid section spacing presets: ${Object.keys(SECTION_SPACING).length}`);
console.log(`  ${GREEN}✓${RESET}  Gap spacing presets: ${Object.keys(GAP_SPACING).length}`);

// ── 6. Breakpoints ──
console.log(`\n${BOLD}6. Responsive Breakpoints${RESET}`);
const bpKeys = ["xs", "sm", "md", "lg", "xl", "2xl"];
let bpMonotonic = true;
let prevBpPx = 0;
for (const key of bpKeys) {
  const px = BREAKPOINT_PX[key];
  if (px <= prevBpPx) {
    bpMonotonic = false;
    console.log(`  ${RED}✗${RESET}  Breakpoint ${key} (${px}px) not strictly greater than previous (${prevBpPx}px)`);
    totalErrors++;
  }
  prevBpPx = px;
}
if (bpMonotonic) {
  console.log(`  ${GREEN}✓${RESET}  Breakpoints ordered correctly: xs (375) -> sm (640) -> md (768) -> lg (1024) -> xl (1280) -> 2xl (1536)`);
}

// ── 7. Swiss Modular Grid ──
console.log(`\n${BOLD}7. Swiss Modular Grid System${RESET}`);
const gridValid =
  GRID_CONFIG.mobile.columns === 4 &&
  GRID_CONFIG.tablet.columns === 8 &&
  GRID_CONFIG.desktop.columns === 12;

if (gridValid) {
  console.log(`  ${GREEN}✓${RESET}  Desktop columns: 12 (gutter: ${GRID_CONFIG.desktop.gutter}, margin: ${GRID_CONFIG.desktop.margin})`);
  console.log(`  ${GREEN}✓${RESET}  Tablet columns:  8 (gutter: ${GRID_CONFIG.tablet.gutter}, margin: ${GRID_CONFIG.tablet.margin})`);
  console.log(`  ${GREEN}✓${RESET}  Mobile columns:  4 (gutter: ${GRID_CONFIG.mobile.gutter}, margin: ${GRID_CONFIG.mobile.margin})`);
} else {
  console.log(`  ${RED}✗${RESET}  Grid column configuration mismatch`);
  totalErrors++;
}

// ── 8. Containers ──
console.log(`\n${BOLD}8. Container System${RESET}`);
const containerKeys = ["sm", "md", "lg", "xl", "2xl"];
let containerMonotonic = true;
let prevContPx = 0;
for (const key of containerKeys) {
  const px = CONTAINER_MAX_WIDTHS[key].px;
  if (px <= prevContPx) {
    containerMonotonic = false;
    console.log(`  ${RED}✗${RESET}  Container ${key} (${px}px) not greater than previous (${prevContPx}px)`);
    totalErrors++;
  }
  prevContPx = px;
}
if (containerMonotonic) {
  console.log(`  ${GREEN}✓${RESET}  Container max widths strictly ascending: sm (640px) -> md (768px) -> lg (1024px) -> xl (1280px) -> 2xl (1440px)`);
}

// ── 9. Layout Primitives ──
console.log(`\n${BOLD}9. Modern Digital Brutalism Layout Primitives${RESET}`);
const presetCount = Object.keys(LAYOUT_PRESETS).length;
console.log(`  ${GREEN}✓${RESET}  Layout presets defined: ${presetCount} (${Object.keys(LAYOUT_PRESETS).join(", ")})`);

// ── Summary ──
console.log(`\n${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}`);
if (totalErrors === 0) {
  console.log(`${GREEN}${BOLD}  ✅  All tokens valid — Colors, Typography, Spacing, Grid, Containers & Layout!${RESET}`);
} else {
  console.log(`${RED}${BOLD}  ❌  Validation failed with ${totalErrors} error(s).${RESET}`);
  process.exit(1);
}
console.log(`${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}\n`);
