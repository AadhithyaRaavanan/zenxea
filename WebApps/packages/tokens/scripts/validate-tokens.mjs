#!/usr/bin/env node
/**
 * validate-tokens.mjs — CLI script to validate all tokens and print a report.
 * Usage: node scripts/validate-tokens.mjs
 */

import { createRequire } from "module";
const require = createRequire(import.meta.url);

// Use compiled output (run `npm run build:ts` first)
const { validateHexColors, validateTokenContrast, checkContrast } = require("../dist/validate.js");
const { BRAND_COLORS } = require("../dist/colors.js");
const { getFlatTokens } = require("../dist/tokens.js");
const { FONT_FAMILIES, TYPE_SCALE, LINE_HEIGHTS, LETTER_SPACINGS, GOOGLE_FONTS_URL } = require("../dist/typography.js");

// ── ANSI colours for terminal output ──
const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const YELLOW = "\x1b[33m";
const CYAN = "\x1b[36m";
const BOLD = "\x1b[1m";
const RESET = "\x1b[0m";

console.log(`\n${BOLD}${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}`);
console.log(`${BOLD}  Zen Xea Design Token Validation Report${RESET}`);
console.log(`${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}\n`);

// ── 1. Validate raw brand hex values ──
console.log(`${BOLD}1. Brand Colour Hex Validation${RESET}`);
const hexErrors = validateHexColors(BRAND_COLORS);
if (hexErrors.length === 0) {
  for (const [name, hex] of Object.entries(BRAND_COLORS)) {
    console.log(`  ${GREEN}✓${RESET}  ${name}: ${hex}`);
  }
} else {
  hexErrors.forEach((e) => console.log(`  ${RED}✗${RESET}  ${e.token}: ${e.issue}`));
}

// ── 2. Brand contrast checks ──
console.log(`\n${BOLD}2. Brand Colour Contrast (vs. White & Black)${RESET}`);
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

// ── 3. Token contrast validation ──
console.log(`\n${BOLD}3. Semantic Colour Token Contrast Validation${RESET}`);
const tokens = getFlatTokens();
const report = validateTokenContrast(tokens);

console.log(`  Tokens checked: ${report.tokenCount}`);
console.log(`  ${GREEN}Passed:${RESET}          ${report.passCount}`);
if (report.warnings.length > 0) {
  console.log(`  ${YELLOW}Warnings:${RESET}        ${report.warnings.length}`);
  report.warnings.forEach((w) =>
    console.log(`    ${YELLOW}⚠${RESET}  [${w.theme}] ${w.token}: ${w.issue}`)
  );
}
if (report.errors.length > 0) {
  console.log(`  ${RED}Errors:${RESET}          ${report.errors.length}`);
  report.errors.forEach((e) =>
    console.log(`    ${RED}✗${RESET}  [${e.theme}] ${e.token}: ${e.issue}`)
  );
} else {
  console.log(`  ${GREEN}Errors:${RESET}          0`);
}

// ── 4. Universal Typography Tokens Validation ──
console.log(`\n${BOLD}4. Universal Typography Tokens Validation${RESET}`);
const requiredFamilies = ["display", "body", "mono"];
let typoErrors = 0;

for (const fam of requiredFamilies) {
  if (FONT_FAMILIES[fam]) {
    console.log(`  ${GREEN}✓${RESET}  Font Family [${fam}]: ${FONT_FAMILIES[fam].name} (${FONT_FAMILIES[fam].variable})`);
  } else {
    console.log(`  ${RED}✗${RESET}  Missing required font family [${fam}]`);
    typoErrors++;
  }
}

const scaleKeys = Object.keys(TYPE_SCALE);
console.log(`  ${GREEN}✓${RESET}  Type scale levels defined: ${scaleKeys.length} (${scaleKeys.join(", ")})`);

const lhKeys = Object.keys(LINE_HEIGHTS);
console.log(`  ${GREEN}✓${RESET}  Line height tokens defined: ${lhKeys.length}`);

const lsKeys = Object.keys(LETTER_SPACINGS);
console.log(`  ${GREEN}✓${RESET}  Letter spacing tokens defined: ${lsKeys.length}`);

if (GOOGLE_FONTS_URL.startsWith("https://fonts.googleapis.com")) {
  console.log(`  ${GREEN}✓${RESET}  Universal Google Fonts URL: valid`);
} else {
  console.log(`  ${RED}✗${RESET}  Universal Google Fonts URL invalid`);
  typoErrors++;
}

// ── Summary ──
console.log(`\n${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}`);
if (report.valid && hexErrors.length === 0 && typoErrors === 0) {
  console.log(`${GREEN}${BOLD}  ✅  All colour & typography tokens valid — ready for universal consumption.${RESET}`);
} else {
  console.log(`${RED}${BOLD}  ❌  Validation failed — see errors above.${RESET}`);
  process.exit(1);
}
console.log(`${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}\n`);
