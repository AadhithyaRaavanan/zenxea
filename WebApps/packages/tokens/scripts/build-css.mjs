#!/usr/bin/env node
/**
 * build-css.mjs — Generates dist/zenxea-tokens.css & dist/zenxea-typography.css from source tokens.
 * Run after tsc compilation (the generator functions are in dist/).
 */

import { createRequire } from "module";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const distDir = join(__dirname, "..", "dist");
mkdirSync(distDir, { recursive: true });

// Load the compiled CommonJS module
const { generateCSSVariables, generateTypographyCSS } = require("../dist/css-generator.js");

// 1. Full universal token CSS bundle
const fullCss = generateCSSVariables();
const fullOutPath = join(distDir, "zenxea-tokens.css");
writeFileSync(fullOutPath, fullCss, "utf8");
console.log(`✅  Generated ${fullOutPath}`);

// 2. Standalone typography CSS
const typeCss = generateTypographyCSS();
const typeOutPath = join(distDir, "zenxea-typography.css");
writeFileSync(typeOutPath, typeCss, "utf8");
console.log(`✅  Generated ${typeOutPath}`);
