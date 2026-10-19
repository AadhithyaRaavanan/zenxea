#!/usr/bin/env node
/**
 * build-json.mjs — Generates dist/tokens.json from compiled token definitions.
 * Produces a W3C Design Token Community Group (DTCG)-compatible JSON structure
 * covering colors, typography, spacing, breakpoints, grid, containers, and layout.
 */

import { createRequire } from "module";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const distDir = join(__dirname, "..", "dist");
mkdirSync(distDir, { recursive: true });

const { DESIGN_TOKENS } = require("../dist/tokens.js");
const { BRAND_COLORS, COLOR_SCALES } = require("../dist/colors.js");
const {
  FONT_FAMILIES,
  FONT_WEIGHTS,
  TYPE_SCALE,
  LINE_HEIGHTS,
  LETTER_SPACINGS,
  TYPOGRAPHY_STYLES,
  GOOGLE_FONTS_URL,
} = require("../dist/typography.js");
const {
  SPACING_SCALE,
  COMPONENT_SPACING,
  CARD_SPACING,
  SECTION_SPACING,
  GAP_SPACING,
} = require("../dist/spacing.js");
const { BREAKPOINTS } = require("../dist/breakpoints.js");
const { GRID_CONFIG, GRID_SPANS } = require("../dist/grid.js");
const { CONTAINER_MAX_WIDTHS, CONTAINER_GUTTERS } = require("../dist/containers.js");
const { LAYOUT_PRESETS } = require("../dist/layout.js");

const output = {
  $schema: "https://design-tokens.github.io/community-group/format/",
  $metadata: {
    brand: DESIGN_TOKENS.brand,
    version: DESIGN_TOKENS.version,
    generated: new Date().toISOString(),
    description:
      "Universal Zen Xea Design Token System — Colors, Typography, Spacing, Breakpoints, Swiss Modular Grid, Containers, and Layout.",
  },

  // ── 1. Raw Brand Colours ──
  brand: Object.fromEntries(
    Object.entries(BRAND_COLORS).map(([key, value]) => [
      key,
      {
        $value: value,
        $type: "color",
        $description: `Zen Xea brand colour: ${key}`,
      },
    ])
  ),

  // ── 2. Colour Scales ──
  scales: Object.fromEntries(
    Object.entries(COLOR_SCALES).map(([colorName, shades]) => [
      colorName,
      Object.fromEntries(
        Object.entries(shades).map(([shade, value]) => [
          shade,
          { $value: value, $type: "color" },
        ])
      ),
    ])
  ),

  // ── 3. Semantic Colour Tokens ──
  colors: Object.fromEntries(
    Object.entries(DESIGN_TOKENS.categories).map(([category, group]) => [
      category,
      Object.fromEntries(
        Object.entries(group).map(([name, token]) => [
          name,
          {
            $value: `{${token.variable}}`,
            $type: "color",
            $description: token.description,
            $extensions: {
              "com.zenxea.tokens": {
                cssVariable: `--${token.variable}`,
                light: token.light,
                dark: token.dark,
                category: token.category,
              },
            },
          },
        ])
      ),
    ])
  ),

  // ── 4. Universal Typography Tokens ──
  typography: {
    $metadata: {
      googleFontsUrl: GOOGLE_FONTS_URL,
    },
    fontFamily: Object.fromEntries(
      Object.entries(FONT_FAMILIES).map(([key, val]) => [
        key,
        {
          $value: val.stack,
          $type: "fontFamily",
          $description: val.description,
          $extensions: {
            "com.zenxea.tokens": {
              name: val.name,
              cssVariable: val.cssVariable,
              weights: val.weights,
              uppercase: val.uppercase || false,
            },
          },
        },
      ])
    ),
    fontSize: Object.fromEntries(
      Object.entries(TYPE_SCALE).map(([key, val]) => [
        key,
        {
          $value: val.clamp,
          $type: "dimension",
          $description: val.description,
          $extensions: {
            "com.zenxea.tokens": {
              cssVariable: val.cssVariable,
              minPx: val.minPx,
              maxPx: val.maxPx,
            },
          },
        },
      ])
    ),
    fontWeight: Object.fromEntries(
      Object.entries(FONT_WEIGHTS).map(([key, val]) => [
        key,
        {
          $value: val,
          $type: "fontWeight",
          $description: `Font weight ${key} (${val})`,
        },
      ])
    ),
    lineHeight: Object.fromEntries(
      Object.entries(LINE_HEIGHTS).map(([key, val]) => [
        key,
        {
          $value: val,
          $type: "number",
          $description: `Line height ${key}: ${val}`,
        },
      ])
    ),
    letterSpacing: Object.fromEntries(
      Object.entries(LETTER_SPACINGS).map(([key, val]) => [
        key,
        {
          $value: val,
          $type: "dimension",
          $description: `Letter spacing ${key}: ${val}`,
        },
      ])
    ),
    compositeStyles: Object.fromEntries(
      Object.entries(TYPOGRAPHY_STYLES).map(([key, val]) => [
        key,
        {
          $value: {
            fontFamily: val.fontFamily,
            fontSize: val.fontSize,
            fontWeight: val.fontWeight,
            lineHeight: val.lineHeight,
            letterSpacing: val.letterSpacing,
            textTransform: val.textTransform || "none",
          },
          $type: "typography",
          $description: val.description,
        },
      ])
    ),
  },

  // ── 5. Universal Spacing Tokens ──
  spacing: {
    linear: Object.fromEntries(
      Object.entries(SPACING_SCALE)
        .sort((a, b) => Number(a[0]) - Number(b[0]))
        .map(([step, val]) => [
          step,
          {
            $value: val.rem,
            $type: "dimension",
            $description: `4px scale step ${step} (${val.px}px)`,
            $extensions: {
              "com.zenxea.tokens": {
                px: val.px,
                cssVariable: `--zx-space-${step.replace(".", "_")}`,
              },
            },
          },
        ])
    ),
    component: Object.fromEntries(
      Object.entries(COMPONENT_SPACING).map(([key, val]) => [
        key,
        {
          $value: val.value,
          $type: "dimension",
          $description: val.description,
          $extensions: {
            "com.zenxea.tokens": {
              px: val.px,
              cssVariable: val.cssVariable,
            },
          },
        },
      ])
    ),
    card: Object.fromEntries(
      Object.entries(CARD_SPACING).map(([key, val]) => [
        key,
        {
          $value: val.value,
          $type: "dimension",
          $description: val.description,
          $extensions: {
            "com.zenxea.tokens": {
              px: val.px,
              cssVariable: val.cssVariable,
            },
          },
        },
      ])
    ),
    section: Object.fromEntries(
      Object.entries(SECTION_SPACING).map(([key, val]) => [
        key,
        {
          $value: val.value,
          $type: "dimension",
          $description: val.description,
          $extensions: {
            "com.zenxea.tokens": {
              minPx: val.minPx,
              maxPx: val.maxPx,
              cssVariable: val.cssVariable,
            },
          },
        },
      ])
    ),
    gap: Object.fromEntries(
      Object.entries(GAP_SPACING).map(([key, val]) => [
        key,
        {
          $value: val.value,
          $type: "dimension",
          $description: val.description,
          $extensions: {
            "com.zenxea.tokens": {
              px: val.px,
              cssVariable: val.cssVariable,
            },
          },
        },
      ])
    ),
  },

  // ── 6. Responsive Breakpoints ──
  breakpoints: Object.fromEntries(
    Object.entries(BREAKPOINTS).map(([key, val]) => [
      key,
      {
        $value: val.rem,
        $type: "dimension",
        $description: val.description,
        $extensions: {
          "com.zenxea.tokens": {
            px: val.px,
            cssVariable: val.cssVariable,
          },
        },
      },
    ])
  ),

  // ── 7. Swiss Modular Grid System ──
  grid: {
    tiers: GRID_CONFIG,
    spans: GRID_SPANS,
  },

  // ── 8. Universal Container System ──
  containers: {
    maxWidths: Object.fromEntries(
      Object.entries(CONTAINER_MAX_WIDTHS).map(([key, val]) => [
        key,
        {
          $value: val.rem,
          $type: "dimension",
          $description: val.description,
          $extensions: {
            "com.zenxea.tokens": {
              px: val.px,
              cssVariable: val.cssVariable,
            },
          },
        },
      ])
    ),
    gutters: CONTAINER_GUTTERS,
  },

  // ── 9. Layout Primitives ──
  layout: LAYOUT_PRESETS,
};

const outPath = join(distDir, "tokens.json");
writeFileSync(outPath, JSON.stringify(output, null, 2), "utf8");

console.log(`✅  Generated ${outPath} (${(Buffer.byteLength(JSON.stringify(output), 'utf8') / 1024).toFixed(1)} KB)`);
