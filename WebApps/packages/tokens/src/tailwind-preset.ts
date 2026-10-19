/**
 * @zenxea/tokens — Universal Tailwind CSS Preset
 *
 * Exposes all colour and typography design tokens as a Tailwind preset.
 * Works across Next.js, Vite, React, Astro, and standard Tailwind setups.
 *
 * Usage (tailwind.config.ts / tailwind.config.js):
 *   import zenxeaPreset from "@zenxea/tokens/tailwind";
 *   export default { presets: [zenxeaPreset] };
 *
 * Usage (Tailwind v4 / CSS):
 *   @import "@zenxea/tokens/css";
 */

import { BRAND_COLORS, COLOR_SCALES } from "./colors";

// ─── Colour Palette ───────────────────────────────────────────────────────────

const zenxeaColors = {
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

// ─── Font Families ────────────────────────────────────────────────────────────

const zenxeaFonts = {
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

// ─── Font Sizes (Fluid Clamp via Tokens) ──────────────────────────────────────

const zenxeaFontSizes = {
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

// ─── Line Heights ─────────────────────────────────────────────────────────────

const zenxeaLineHeights = {
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

// ─── Letter Spacings ──────────────────────────────────────────────────────────

const zenxeaLetterSpacings = {
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

// ─── Box Shadows ──────────────────────────────────────────────────────────────

const zenxeaShadows = {
  "zx-sm": "var(--zx-shadow-sm)",
  "zx-md": "var(--zx-shadow-md)",
  "zx-lg": "var(--zx-shadow-lg)",
  "zx-brand": "var(--zx-shadow-brand)",
};

// ─── Border Radius ────────────────────────────────────────────────────────────

const zenxeaRadius = {
  "zx-sm": "var(--zx-radius-sm)",
  "zx-md": "var(--zx-radius-md)",
  "zx-lg": "var(--zx-radius-lg)",
  "zx-xl": "var(--zx-radius-xl)",
  "zx-full": "var(--zx-radius-full)",
};

// ─── Transitions ─────────────────────────────────────────────────────────────

const zenxeaTransitions = {
  "zx-fast": "var(--zx-transition-fast)",
  "zx-base": "var(--zx-transition-base)",
  "zx-slow": "var(--zx-transition-slow)",
};

// ─── Tailwind Preset Object ───────────────────────────────────────────────────

const zenxeaPreset = {
  theme: {
    extend: {
      colors: zenxeaColors,
      fontFamily: zenxeaFonts,
      fontSize: zenxeaFontSizes,
      lineHeight: zenxeaLineHeights,
      letterSpacing: zenxeaLetterSpacings,
      boxShadow: zenxeaShadows,
      borderRadius: zenxeaRadius,
      transitionDuration: {},
      transitionTimingFunction: {},
    },
  },
  plugins: [],
} as const;

export default zenxeaPreset;
export {
  zenxeaColors,
  zenxeaFonts,
  zenxeaFontSizes,
  zenxeaLineHeights,
  zenxeaLetterSpacings,
  zenxeaShadows,
  zenxeaRadius,
  zenxeaTransitions,
};
