#!/usr/bin/env node
/**
 * build-esm.mjs — Creates ESM (.mjs) copies of the compiled CJS files.
 * Needed for the "import" condition in package.json exports.
 */

import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist");
mkdirSync(distDir, { recursive: true });

/**
 * Very simple CJS → ESM transform:
 * - Replace require() calls with import statements
 * - Replace module.exports = ... with export default ...
 * - Replace exports.X = ... with export const X = ...
 *
 * For a production project, use esbuild or tsup here.
 * This keeps zero runtime dependencies on the build toolchain.
 */
function cjsToEsm(src, filename) {
  // Replace require("./X") -> from "./X.mjs"
  let out = src
    .replace(/const\s+(\{[^}]+\})\s*=\s*require\(['"]([^'"]+)['"]\);?/g, (_, vars, mod) => {
      const modPath = mod.startsWith(".") ? mod.replace(/\.js$/, ".mjs") : mod;
      return `import ${vars} from "${modPath}";`;
    })
    .replace(/const\s+(\w+)\s*=\s*require\(['"]([^'"]+)['"]\);?/g, (_, name, mod) => {
      const modPath = mod.startsWith(".") ? mod.replace(/\.js$/, ".mjs") : mod;
      return `import ${name} from "${modPath}";`;
    })
    .replace(/Object\.defineProperty\(exports,\s*"__esModule",\s*\{[^}]*\}\);?/g, "")
    .replace(
      /exports\.(\w+)\s*=\s*/g,
      (_, name) => `export const ${name} = `
    );

  return out;
}

const jsFiles = readdirSync(distDir).filter((f) => f.endsWith(".js"));

for (const file of jsFiles) {
  const src = readFileSync(join(distDir, file), "utf8");
  const esm = cjsToEsm(src, file);
  const outFile = file.replace(/\.js$/, ".mjs");
  writeFileSync(join(distDir, outFile), esm, "utf8");
  console.log(`✅  Generated dist/${outFile}`);
}

console.log(`✅  ESM build complete (${jsFiles.length} files)`);
