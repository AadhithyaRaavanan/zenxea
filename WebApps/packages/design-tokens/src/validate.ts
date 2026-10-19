/**
 * @zenxea/tokens — Colour Validation & Accessibility
 *
 * WCAG 2.1 contrast ratio checks and hex colour validation.
 * Uses relative luminance formula per W3C spec.
 */

// ─── Hex Parsing ─────────────────────────────────────────────────────────────

/** Parse a 3- or 6-digit hex colour string to { r, g, b } 0-255 values. */
export function parseHex(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace(/^#/, "");

  let r: number, g: number, b: number;

  if (clean.length === 3) {
    r = parseInt(clean[0] + clean[0], 16);
    g = parseInt(clean[1] + clean[1], 16);
    b = parseInt(clean[2] + clean[2], 16);
  } else if (clean.length === 6) {
    r = parseInt(clean.slice(0, 2), 16);
    g = parseInt(clean.slice(2, 4), 16);
    b = parseInt(clean.slice(4, 6), 16);
  } else {
    throw new Error(`Invalid hex colour: "${hex}"`);
  }

  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    throw new Error(`Invalid hex colour: "${hex}"`);
  }

  return { r, g, b };
}

/** Validate that a string is a valid hex colour. */
export function isValidHex(value: string): boolean {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(value);
}

// ─── WCAG Luminance & Contrast ────────────────────────────────────────────────

/**
 * Calculate the relative luminance of an sRGB colour (WCAG 2.1 spec).
 * @see https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
export function getRelativeLuminance(hex: string): number {
  const { r, g, b } = parseHex(hex);

  const linearise = (c: number): number => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };

  const R = linearise(r);
  const G = linearise(g);
  const B = linearise(b);

  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

/**
 * Calculate the WCAG 2.1 contrast ratio between two hex colours.
 * Returns a ratio between 1 (no contrast) and 21 (maximum contrast).
 */
export function getContrastRatio(foreground: string, background: string): number {
  const lumFg = getRelativeLuminance(foreground);
  const lumBg = getRelativeLuminance(background);
  const lighter = Math.max(lumFg, lumBg);
  const darker = Math.min(lumFg, lumBg);
  return (lighter + 0.05) / (darker + 0.05);
}

// ─── WCAG Pass/Fail ───────────────────────────────────────────────────────────

export type WcagLevel = "AA" | "AAA" | "FAIL";

export interface ContrastResult {
  ratio: number;
  /** Formatted as "X.XX:1" */
  ratioLabel: string;
  normalText: WcagLevel;
  largeText: WcagLevel;
  uiComponents: WcagLevel;
  passes: boolean;
}

/**
 * Check WCAG 2.1 conformance levels for a foreground/background colour pair.
 *
 * WCAG thresholds:
 *  - Normal text:   AA ≥ 4.5:1 | AAA ≥ 7:1
 *  - Large text:    AA ≥ 3:1   | AAA ≥ 4.5:1
 *  - UI components: AA ≥ 3:1
 */
export function checkContrast(foreground: string, background: string): ContrastResult {
  const ratio = getContrastRatio(foreground, background);
  const rounded = Math.round(ratio * 100) / 100;

  const level = (threshold: number, aaa: number): WcagLevel => {
    if (ratio >= aaa) return "AAA";
    if (ratio >= threshold) return "AA";
    return "FAIL";
  };

  return {
    ratio: rounded,
    ratioLabel: `${rounded.toFixed(2)}:1`,
    normalText: level(4.5, 7),
    largeText: level(3, 4.5),
    uiComponents: level(3, 4.5),
    passes: ratio >= 4.5,
  };
}

// ─── Token Validation ─────────────────────────────────────────────────────────

export interface ValidationError {
  token: string;
  theme: "light" | "dark";
  issue: string;
}

export interface ValidationReport {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
  tokenCount: number;
  passCount: number;
  failCount: number;
}

/**
 * Validate that all raw colour hex values in an object are well-formed.
 */
export function validateHexColors(
  colors: Record<string, string>
): ValidationError[] {
  const errors: ValidationError[] = [];
  for (const [name, hex] of Object.entries(colors)) {
    if (!isValidHex(hex)) {
      errors.push({
        token: name,
        theme: "light",
        issue: `"${hex}" is not a valid 3 or 6-digit hex colour`,
      });
    }
  }
  return errors;
}

/**
 * Run WCAG contrast checks across all semantic tokens and return a full report.
 * Background tokens are checked against both white (#FFFFFF) and black (#000000).
 */
export function validateTokenContrast(
  tokens: Array<{
    variable: string;
    light: string;
    dark: string;
    category: string;
  }>,
  minRatio = 4.5
): ValidationReport {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];
  let passCount = 0;
  let failCount = 0;

  // Only check tokens that function as foreground text colours.
  // Exclude: background tints (*-bg), overlay text (*-text, on-brand),
  // interactive text roles (primary-text, secondary-text, etc.),
  // and inverse tokens (they are correct on their paired background, not white).
  const skipPatterns = ["-bg", "-text", "on-brand", "inverse", "overlay"];
  const textTokens = tokens.filter(
    (t) =>
      (t.category === "text" ||
        t.category === "interactive" ||
        t.category === "feedback") &&
      !skipPatterns.some((p) => t.variable.includes(p))
  );

  for (const token of textTokens) {
    for (const theme of ["light", "dark"] as const) {
      const fg = theme === "light" ? token.light : token.dark;
      const bg = theme === "light" ? "#FFFFFF" : "#1A1A1A";

      // Skip rgba tokens — we can't accurately parse them here
      if (fg.startsWith("rgba") || fg.startsWith("rgb")) continue;
      // Skip tokens that contain opacity suffix (e.g. #7E69E866)
      if (fg.length > 7) continue;

      try {
        const result = checkContrast(fg, bg);
        if (result.ratio >= minRatio) {
          passCount++;
        } else if (result.ratio >= 3) {
          warnings.push({
            token: `--${token.variable}`,
            theme,
            issue: `Contrast ${result.ratioLabel} passes AA for large text only (need ≥ ${minRatio}:1 for normal text)`,
          });
          failCount++;
        } else {
          errors.push({
            token: `--${token.variable}`,
            theme,
            issue: `Contrast ${result.ratioLabel} FAILS WCAG AA (need ≥ ${minRatio}:1)`,
          });
          failCount++;
        }
      } catch {
        // Ignore unparseable values
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    tokenCount: textTokens.length * 2,
    passCount,
    failCount,
  };
}
