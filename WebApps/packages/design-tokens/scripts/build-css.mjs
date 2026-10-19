#!/usr/bin/env node
/**
 * build-css.mjs — Generates compiled CSS stylesheets from design tokens.
 *
 * Produces:
 *   - dist/zenxea-tokens.css     (Full token suite: colors, typography, spacing, grid, containers, layout)
 *   - dist/zenxea-layout.css     (Layout, grid, containers, spacing primitives)
 *   - dist/zenxea-typography.css (Typography & embedded fonts)
 */

import { createRequire } from "module";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const distDir = join(__dirname, "..", "dist");
mkdirSync(distDir, { recursive: true });

// Load compiled generator
const {
  generateCSSVariables,
  generateLayoutCSS,
  generateTypographyCSS,
} = require("../dist/css-generator.js");

// 1. Full unified design token bundle
const fullCss = generateCSSVariables();
const fullOutPath = join(distDir, "zenxea-tokens.css");
writeFileSync(fullOutPath, fullCss, "utf8");
console.log(`✅  Generated ${fullOutPath} (${(Buffer.byteLength(fullCss, 'utf8') / 1024).toFixed(1)} KB)`);

// 2. Standalone layout & spacing stylesheet
const layoutCss = generateLayoutCSS();
const layoutOutPath = join(distDir, "zenxea-layout.css");
writeFileSync(layoutOutPath, layoutCss, "utf8");
console.log(`✅  Generated ${layoutOutPath} (${(Buffer.byteLength(layoutCss, 'utf8') / 1024).toFixed(1)} KB)`);

// 3. Standalone typography stylesheet
const typeCss = generateTypographyCSS();
const typeOutPath = join(distDir, "zenxea-typography.css");
writeFileSync(typeOutPath, typeCss, "utf8");
console.log(`✅  Generated ${typeOutPath} (${(Buffer.byteLength(typeCss, 'utf8') / 1024).toFixed(1)} KB)`);
