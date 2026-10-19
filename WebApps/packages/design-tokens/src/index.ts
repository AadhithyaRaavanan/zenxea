/**
 * @zenxea/design-tokens — Universal Design Token System Entry Point
 *
 * Centralized, universal design token system governing:
 *   - Brand colours & hierarchical scales (Periwinkle 65%, Black 30%, Coral Red 5%, Warm Off-White)
 *   - Semantic light/dark theme tokens
 *   - Universal typography (Bebas Neue, Manrope, IBM Plex Mono) & responsive fluid clamp scales
 *   - Spacing system (4px linear scale, semantic component/card/section/gap scales)
 *   - Responsive breakpoints (xs, sm, md, lg, xl, 2xl) & media query helpers
 *   - Swiss Modular Grid (12-col desktop, 8-col tablet, 4-col mobile)
 *   - Responsive container system (max-widths sm-2xl, fluid gutters)
 *   - Modern Digital Brutalism layout primitives (boxes, dividers, stacks, clusters, split screens)
 *   - CSS variable generators & standalone stylesheet builders
 *   - Theme runtime switcher
 *   - Accessibility & WCAG contrast validation
 */

// ─── 1. Brand Colours & Scales ────────────────────────────────────────────────
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

// ─── 2. Semantic Colour Design Tokens ─────────────────────────────────────────
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

// ─── 3. Universal Typography System ───────────────────────────────────────────
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
export { FONT_FACE_CSS } from "./font-faces";

// ─── 4. Universal Spacing System ──────────────────────────────────────────────
export {
  SPACING_SCALE,
  COMPONENT_SPACING,
  CARD_SPACING,
  SECTION_SPACING,
  GAP_SPACING,
  getSpacingVarName,
} from "./spacing";
export type {
  SpacingScaleKey,
  SpacingToken,
  SemanticSpacingToken,
} from "./spacing";

// ─── 5. Responsive Breakpoints ────────────────────────────────────────────────
export {
  BREAKPOINTS,
  BREAKPOINT_PX,
  BREAKPOINT_STRINGS,
  MEDIA_QUERIES,
} from "./breakpoints";
export type {
  BreakpointKey,
  BreakpointToken,
} from "./breakpoints";

// ─── 6. Swiss Modular Grid System ─────────────────────────────────────────────
export {
  GRID_CONFIG,
  GRID_COLUMNS,
  GRID_GUTTERS,
  GRID_MARGINS,
  GRID_SPANS,
} from "./grid";
export type {
  GridTier,
} from "./grid";

// ─── 7. Universal Container System ────────────────────────────────────────────
export {
  CONTAINER_MAX_WIDTHS,
  CONTAINER_GUTTERS,
} from "./containers";
export type {
  ContainerKey,
  ContainerToken,
} from "./containers";

// ─── 8. Layout Primitives & Brutalist Utilities ───────────────────────────────
export {
  LAYOUT_PRESETS,
} from "./layout";
export type {
  LayoutPreset,
} from "./layout";

// ─── 9. CSS Generators ────────────────────────────────────────────────────────
export {
  generateCSSVariables,
  generateThemeVars,
  generateTypographyCSS,
  generateLayoutCSS,
  buildTypographyVars,
  buildTypographyBaseResets,
  buildTypographyUtilityClasses,
  buildSpacingVars,
  buildBreakpointVars,
  buildContainerVars,
  buildGridVars,
  buildLayoutUtilityClasses,
} from "./css-generator";

// ─── 10. Theme Runtime Switcher ───────────────────────────────────────────────
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

// ─── 11. Validation & Accessibility ───────────────────────────────────────────
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

// ─── 12. Universal Brand Assets & Favicons ──────────────────────────────────
export {
  FAVICON_FILES,
  NEXT_METADATA_ICONS,
  FAVICON_HTML_TAGS,
} from "./assets";
export type { FaviconFile } from "./assets";

// ─── Package Metadata ─────────────────────────────────────────────────────────
export const PACKAGE_NAME = "@zenxea/design-tokens" as const;
export const PACKAGE_VERSION = "1.0.0" as const;
