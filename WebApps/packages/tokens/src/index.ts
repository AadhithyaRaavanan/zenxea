/**
 * @zenxea/tokens — Package Entry Point
 *
 * Re-exports everything consumers need:
 *   - Universal Brand Colours & Scales
 *   - Semantic Design Tokens (light/dark)
 *   - Universal Typography System (Bebas Neue, Manrope, IBM Plex Mono)
 *   - Fluid clamp() type scales & weights
 *   - CSS Generator utilities
 *   - Theme switcher runtime
 *   - Validation & contrast accessibility tools
 */

// ── Brand Colours & Scales ────────────────────────────────────────────────────
export {
  COLOR_BACKGROUND,
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  COLOR_ACCENT,
  BRAND_COLORS,
  BRAND_COLOR_WEIGHTS,
  COLOR_SCALES,
} from "./colors";
export type { BrandColorKey, BrandColorValue, ColorScaleKey, ColorShade } from "./colors";

// ── Semantic Design Tokens ────────────────────────────────────────────────────
export {
  DESIGN_TOKENS,
  getFlatTokens,
  getTokenByVariable,
} from "./tokens";
export type {
  ColorToken,
  TokenCategory,
  TokenGroup,
  DesignTokens,
} from "./tokens";

// ── Universal Typography System ───────────────────────────────────────────────
export {
  FONT_FAMILIES,
  FONT_WEIGHTS,
  TYPE_SCALE,
  LINE_HEIGHTS,
  LETTER_SPACINGS,
  TYPOGRAPHY_STYLES,
  GOOGLE_FONTS_URL,
  GOOGLE_FONTS_HTML_TAGS,
  GOOGLE_FONTS_IMPORT_CSS,
  NEXT_FONT_METADATA,
} from "./typography";
export type {
  FontFamilyToken,
  FontFamilyKey,
  FontWeightKey,
  TypeScaleToken,
  TypeScaleKey,
  LineHeightKey,
  LetterSpacingKey,
  TypographyStylePreset,
} from "./typography";

// ── CSS Generators ────────────────────────────────────────────────────────────
export {
  generateCSSVariables,
  generateThemeVars,
  generateTypographyCSS,
  buildTypographyVars,
  buildTypographyUtilityClasses,
} from "./css-generator";

// ── Theme Utilities ───────────────────────────────────────────────────────────
export {
  getSystemTheme,
  getStoredTheme,
  resolveTheme,
  applyTheme,
  setTheme,
  initTheme,
  toggleTheme,
  getThemeScript,
} from "./theme";
export type { ThemeMode, ZenThemeContextValue } from "./theme";

// ── Validation & Accessibility ────────────────────────────────────────────────
export {
  parseHex,
  isValidHex,
  getRelativeLuminance,
  getContrastRatio,
  checkContrast,
  validateHexColors,
  validateTokenContrast,
} from "./validate";
export type {
  WcagLevel,
  ContrastResult,
  ValidationError,
  ValidationReport,
} from "./validate";

// ── Package Metadata ──────────────────────────────────────────────────────────
export const PACKAGE_NAME = "@zenxea/tokens" as const;
export const PACKAGE_VERSION = "1.0.0" as const;
