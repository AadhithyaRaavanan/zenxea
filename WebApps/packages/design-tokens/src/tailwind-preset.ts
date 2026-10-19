/**
 * @zenxea/design-tokens — Universal Tailwind CSS Preset
 *
 * Exposes colors, typography, spacing, breakpoints, grid, containers,
 * and layout tokens as a unified Tailwind CSS preset.
 * Works across Next.js, Vite, React, Astro, and standard Tailwind setups.
 *
 * Usage (tailwind.config.ts / tailwind.config.js):
 *   import zenxeaPreset from "@zenxea/design-tokens/tailwind";
 *   export default { presets: [zenxeaPreset] };
 *
 * Usage (Tailwind v4 / CSS):
 *   @import "@zenxea/design-tokens/css";
 */

import { BRAND_COLORS, COLOR_SCALES } from "./colors";
import { BREAKPOINT_STRINGS } from "./breakpoints";
import { SPACING_SCALE, COMPONENT_SPACING, CARD_SPACING, SECTION_SPACING, GAP_SPACING } from "./spacing";
import { CONTAINER_MAX_WIDTHS } from "./containers";

// ─── 1. Colour Palette ─────────────────────────────────────────────────────────

export const zenxeaColors = {
  // Brand primaries
  "zx-primary": {
    DEFAULT: BRAND_COLORS.primary,
    ...COLOR_SCALES.primary,
  },
  "zx-secondary": {
    DEFAULT: BRAND_COLORS.secondary,
    ...COLOR_SCALES.secondary,
  },
  "zx-accent": {
    DEFAULT: BRAND_COLORS.accent,
    ...COLOR_SCALES.accent,
  },
  "zx-background": {
    DEFAULT: BRAND_COLORS.background,
    ...COLOR_SCALES.background,
  },

  // CSS-variable-driven semantic aliases
  "zx-bg": "var(--zx-bg-default)",
  "zx-bg-subtle": "var(--zx-bg-subtle)",
  "zx-bg-inverse": "var(--zx-bg-inverse)",
  "zx-bg-brand": "var(--zx-bg-brand)",
  "zx-surface": "var(--zx-surface-default)",
  "zx-text": "var(--zx-text-default)",
  "zx-text-muted": "var(--zx-text-muted)",
  "zx-text-brand": "var(--zx-text-brand)",
  "zx-text-accent": "var(--zx-text-accent)",
  "zx-border": "var(--zx-border-default)",
  "zx-border-brand": "var(--zx-border-brand)",
  "zx-interactive": "var(--zx-interactive-primary-bg)",
  "zx-error": "var(--zx-feedback-error)",
  "zx-success": "var(--zx-feedback-success)",
  "zx-warning": "var(--zx-feedback-warning)",
} as const;

// ─── 2. Font Families ──────────────────────────────────────────────────────────

export const zenxeaFonts = {
  // Bebas Neue — Display & Headlines
  display: ["var(--zx-font-display)", "'Bebas Neue'", "'Impact'", "sans-serif"],
  "zx-display": ["var(--zx-font-display)", "'Bebas Neue'", "'Impact'", "sans-serif"],

  // Manrope — UI & Body Text
  body: [
    "var(--zx-font-body)",
    "'Manrope'",
    "-apple-system",
    "BlinkMacSystemFont",
    "'Segoe UI'",
    "sans-serif",
  ],
  "zx-body": [
    "var(--zx-font-body)",
    "'Manrope'",
    "-apple-system",
    "BlinkMacSystemFont",
    "'Segoe UI'",
    "sans-serif",
  ],
  sans: [
    "var(--zx-font-body)",
    "'Manrope'",
    "-apple-system",
    "BlinkMacSystemFont",
    "'Segoe UI'",
    "sans-serif",
  ],
  "zx-sans": [
    "var(--zx-font-body)",
    "'Manrope'",
    "-apple-system",
    "BlinkMacSystemFont",
    "'Segoe UI'",
    "sans-serif",
  ],

  // IBM Plex Mono — Eyebrows, Metadata & Code
  mono: [
    "var(--zx-font-mono)",
    "'IBM Plex Mono'",
    "'SFMono-Regular'",
    "Consolas",
    "monospace",
  ],
  "zx-mono": [
    "var(--zx-font-mono)",
    "'IBM Plex Mono'",
    "'SFMono-Regular'",
    "Consolas",
    "monospace",
  ],
};

// ─── 3. Font Sizes (Fluid Clamp via Tokens) ────────────────────────────────────

export const zenxeaFontSizes = {
  "zx-display": [
    "var(--zx-text-display)",
    { lineHeight: "var(--zx-lh-display)", letterSpacing: "var(--zx-ls-display)" },
  ],
  "zx-h1": [
    "var(--zx-text-h1)",
    { lineHeight: "var(--zx-lh-h1)", letterSpacing: "var(--zx-ls-h1)" },
  ],
  "zx-h2": [
    "var(--zx-text-h2)",
    { lineHeight: "var(--zx-lh-h2)", letterSpacing: "var(--zx-ls-h2)" },
  ],
  "zx-h3": [
    "var(--zx-text-h3)",
    { lineHeight: "var(--zx-lh-h3)", letterSpacing: "var(--zx-ls-h3)" },
  ],
  "zx-h4": [
    "var(--zx-text-h4)",
    { lineHeight: "var(--zx-lh-h4)", letterSpacing: "var(--zx-ls-h4)" },
  ],
  "zx-h5": [
    "var(--zx-text-h5)",
    { lineHeight: "var(--zx-lh-h5)", letterSpacing: "var(--zx-ls-h5)" },
  ],
  "zx-lead": [
    "var(--zx-text-body-lg)",
    { lineHeight: "var(--zx-lh-body-lg)", letterSpacing: "var(--zx-ls-body)" },
  ],
  "zx-body": [
    "var(--zx-text-body)",
    { lineHeight: "var(--zx-lh-body)", letterSpacing: "var(--zx-ls-body)" },
  ],
  "zx-body-sm": [
    "var(--zx-text-body-sm)",
    { lineHeight: "var(--zx-lh-body-sm)", letterSpacing: "var(--zx-ls-body-sm)" },
  ],
  "zx-caption": [
    "var(--zx-text-caption)",
    { lineHeight: "var(--zx-lh-caption)", letterSpacing: "var(--zx-ls-caption)" },
  ],
  "zx-eyebrow": [
    "var(--zx-text-overline)",
    { lineHeight: "var(--zx-lh-nav)", letterSpacing: "var(--zx-ls-eyebrow)" },
  ],
  "zx-button": [
    "var(--zx-text-button)",
    { lineHeight: "var(--zx-lh-button)", letterSpacing: "var(--zx-ls-button)" },
  ],
};

// ─── 4. Line Heights ───────────────────────────────────────────────────────────

export const zenxeaLineHeights = {
  "zx-display": "var(--zx-lh-display)",
  "zx-h1": "var(--zx-lh-h1)",
  "zx-h2": "var(--zx-lh-h2)",
  "zx-h3": "var(--zx-lh-h3)",
  "zx-h4": "var(--zx-lh-h4)",
  "zx-h5": "var(--zx-lh-h5)",
  "zx-body": "var(--zx-lh-body)",
  "zx-body-lg": "var(--zx-lh-body-lg)",
  "zx-body-sm": "var(--zx-lh-body-sm)",
  "zx-caption": "var(--zx-lh-caption)",
  "zx-nav": "var(--zx-lh-nav)",
  "zx-button": "var(--zx-lh-button)",
};

// ─── 5. Letter Spacings ────────────────────────────────────────────────────────

export const zenxeaLetterSpacings = {
  "zx-display": "var(--zx-ls-display)",
  "zx-h1": "var(--zx-ls-h1)",
  "zx-h2": "var(--zx-ls-h2)",
  "zx-h3": "var(--zx-ls-h3)",
  "zx-h4": "var(--zx-ls-h4)",
  "zx-h5": "var(--zx-ls-h5)",
  "zx-mono": "var(--zx-ls-mono)",
  "zx-eyebrow": "var(--zx-ls-eyebrow)",
  "zx-button": "var(--zx-ls-button)",
  "zx-nav": "var(--zx-ls-nav)",
  "zx-caption": "var(--zx-ls-caption)",
};

// ─── 6. Responsive Breakpoints / Screens ───────────────────────────────────────

export const zenxeaScreens = {
  xs: BREAKPOINT_STRINGS.xs,
  sm: BREAKPOINT_STRINGS.sm,
  md: BREAKPOINT_STRINGS.md,
  lg: BREAKPOINT_STRINGS.lg,
  xl: BREAKPOINT_STRINGS.xl,
  "2xl": BREAKPOINT_STRINGS["2xl"],
};

// ─── 7. Spacing Scale (4px Base + Semantic Tokens) ─────────────────────────────

const linearSpacingEntries = Object.keys(SPACING_SCALE).reduce((acc, step) => {
  const sanitized = step.replace(".", "_");
  acc[`zx-${step}`] = `var(--zx-space-${sanitized})`;
  return acc;
}, {} as Record<string, string>);

export const zenxeaSpacing = {
  ...linearSpacingEntries,

  // Semantic component padding
  "zx-component-xs": "var(--zx-space-component-xs)",
  "zx-component-sm": "var(--zx-space-component-sm)",
  "zx-component-md": "var(--zx-space-component-md)",
  "zx-component-lg": "var(--zx-space-component-lg)",
  "zx-component-xl": "var(--zx-space-component-xl)",

  // Semantic card padding
  "zx-card-sm": "var(--zx-space-card-sm)",
  "zx-card-md": "var(--zx-space-card-md)",
  "zx-card-lg": "var(--zx-space-card-lg)",
  "zx-card-xl": "var(--zx-space-card-xl)",

  // Fluid section padding
  "zx-section-xs": "var(--zx-space-section-xs)",
  "zx-section-sm": "var(--zx-space-section-sm)",
  "zx-section-md": "var(--zx-space-section-md)",
  "zx-section-lg": "var(--zx-space-section-lg)",
  "zx-section-xl": "var(--zx-space-section-xl)",
  "zx-section-2xl": "var(--zx-space-section-2xl)",

  // Gaps
  "zx-gap-xs": "var(--zx-gap-xs)",
  "zx-gap-sm": "var(--zx-gap-sm)",
  "zx-gap-md": "var(--zx-gap-md)",
  "zx-gap-lg": "var(--zx-gap-lg)",
  "zx-gap-xl": "var(--zx-gap-xl)",
  "zx-gap-2xl": "var(--zx-gap-2xl)",
  "zx-gap-3xl": "var(--zx-gap-3xl)",

  // Fluid gutters & margins
  "zx-gutter": "var(--zx-grid-gutter)",
  "zx-margin": "var(--zx-grid-margin)",
  "zx-container-gutter": "var(--zx-container-gutter)",
};

// ─── 8. Max Width / Containers ────────────────────────────────────────────────

export const zenxeaMaxWidth = {
  "zx-sm": "var(--zx-container-sm)",
  "zx-md": "var(--zx-container-md)",
  "zx-lg": "var(--zx-container-lg)",
  "zx-xl": "var(--zx-container-xl)",
  "zx-2xl": "var(--zx-container-2xl)",
  "zx-full": "var(--zx-container-full)",
  "zx-container": "var(--zx-container-xl)",
};

// ─── 9. Box Shadows & Elevation ───────────────────────────────────────────────

export const zenxeaShadows = {
  "zx-sm": "var(--zx-shadow-sm)",
  "zx-md": "var(--zx-shadow-md)",
  "zx-lg": "var(--zx-shadow-lg)",
  "zx-brand": "var(--zx-shadow-brand)",
};

// ─── 10. Border Radius ────────────────────────────────────────────────────────

export const zenxeaRadius = {
  "zx-none": "var(--zx-radius-none)",
  "zx-sm": "var(--zx-radius-sm)",
  "zx-md": "var(--zx-radius-md)",
  "zx-lg": "var(--zx-radius-lg)",
  "zx-xl": "var(--zx-radius-xl)",
  "zx-full": "var(--zx-radius-full)",
};

// ─── 11. Transitions ──────────────────────────────────────────────────────────

export const zenxeaTransitions = {
  "zx-fast": "var(--zx-transition-fast)",
  "zx-base": "var(--zx-transition-base)",
  "zx-slow": "var(--zx-transition-slow)",
};

// ─── 12. Complete Tailwind Preset Object ───────────────────────────────────────

export const zenxeaPreset = {
  theme: {
    screens: zenxeaScreens,
    extend: {
      colors: zenxeaColors,
      fontFamily: zenxeaFonts,
      fontSize: zenxeaFontSizes,
      lineHeight: zenxeaLineHeights,
      letterSpacing: zenxeaLetterSpacings,
      spacing: zenxeaSpacing,
      gap: zenxeaSpacing,
      maxWidth: zenxeaMaxWidth,
      boxShadow: zenxeaShadows,
      borderRadius: zenxeaRadius,
      transitionDuration: {},
      transitionTimingFunction: {},
    },
  },
  plugins: [],
} as const;

export default zenxeaPreset;
