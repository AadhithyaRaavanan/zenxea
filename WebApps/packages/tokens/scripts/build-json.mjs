#!/usr/bin/env node
/**
 * build-json.mjs — Generates dist/tokens.json from the compiled token definitions.
 * Produces a W3C Design Token Community Group (DTCG)-compatible JSON structure
 * covering BOTH colours AND universal typography tokens.
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

const output = {
  $schema: "https://design-tokens.github.io/community-group/format/",
  $metadata: {
    brand: DESIGN_TOKENS.brand,
    version: DESIGN_TOKENS.version,
    generated: new Date().toISOString(),
    description:
      "Zen Xea universal design token system — colours, theme modes, and typography system. Compatible with W3C DTCG format.",
  },

  // ── Raw brand colours ──
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

  // ── Colour scales ──
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

  // ── Semantic colour tokens ──
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

  // ── Universal Typography Tokens ──
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
};

const outPath = join(distDir, "tokens.json");
writeFileSync(outPath, JSON.stringify(output, null, 2), "utf8");

console.log(`✅  Generated ${outPath}`);
