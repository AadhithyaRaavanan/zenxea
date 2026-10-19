/**
 * @zenxea/tokens — Semantic Design Tokens
 *
 * Maps raw colour values to semantic role names.
 * Each token has a light and dark theme value.
 * CSS variable names follow: --zx-<category>-<role>
 */

import { COLOR_BACKGROUND, COLOR_PRIMARY, COLOR_SECONDARY, COLOR_ACCENT, COLOR_SCALES } from "./colors";

// ─── Token Types ──────────────────────────────────────────────────────────────

export interface ColorToken {
  /** CSS variable name without the -- prefix */
  variable: string;
  /** Light theme value */
  light: string;
  /** Dark theme value */
  dark: string;
  /** Human-readable description */
  description: string;
  /** WCAG contrast ratio against white (light) and black (dark) */
  category: TokenCategory;
}

export type TokenCategory =
  | "background"
  | "surface"
  | "text"
  | "border"
  | "interactive"
  | "feedback"
  | "brand";

export interface TokenGroup {
  [tokenName: string]: ColorToken;
}

export interface DesignTokens {
  version: string;
  brand: string;
  categories: {
    background: TokenGroup;
    surface: TokenGroup;
    text: TokenGroup;
    border: TokenGroup;
    interactive: TokenGroup;
    feedback: TokenGroup;
    brand: TokenGroup;
  };
}

// ─── Token Definitions ────────────────────────────────────────────────────────

export const DESIGN_TOKENS: DesignTokens = {
  version: "1.0.0",
  brand: "Zen Xea",
  categories: {
    // ── Backgrounds ────────────────────────────────────────────
    background: {
      default: {
        variable: "zx-bg-default",
        light: COLOR_BACKGROUND,
        dark: COLOR_SCALES.secondary[400],
        description: "Primary page background",
        category: "background",
      },
      subtle: {
        variable: "zx-bg-subtle",
        light: COLOR_SCALES.background[100],
        dark: COLOR_SCALES.secondary[300],
        description: "Subtle secondary background",
        category: "background",
      },
      inverse: {
        variable: "zx-bg-inverse",
        light: COLOR_SECONDARY,
        dark: COLOR_BACKGROUND,
        description: "Inverted background for high contrast sections",
        category: "background",
      },
      brand: {
        variable: "zx-bg-brand",
        light: COLOR_PRIMARY,
        dark: COLOR_SCALES.primary[600],
        description: "Brand-coloured background (hero, CTAs)",
        category: "background",
      },
      "brand-subtle": {
        variable: "zx-bg-brand-subtle",
        light: COLOR_SCALES.primary[50],
        dark: COLOR_SCALES.primary[900],
        description: "Soft brand background for cards",
        category: "background",
      },
    },

    // ── Surfaces ───────────────────────────────────────────────
    surface: {
      default: {
        variable: "zx-surface-default",
        light: "#FFFFFF",
        dark: COLOR_SCALES.secondary[300],
        description: "Card and panel surface",
        category: "surface",
      },
      raised: {
        variable: "zx-surface-raised",
        light: "#FFFFFF",
        dark: COLOR_SCALES.secondary[200],
        description: "Elevated surface (modals, dropdowns)",
        category: "surface",
      },
      overlay: {
        variable: "zx-surface-overlay",
        light: "rgba(0,0,0,0.4)",
        dark: "rgba(0,0,0,0.6)",
        description: "Overlay for modals and drawers",
        category: "surface",
      },
    },

    // ── Text ───────────────────────────────────────────────────
    text: {
      default: {
        variable: "zx-text-default",
        light: COLOR_SECONDARY,
        dark: COLOR_BACKGROUND,
        description: "Primary body text",
        category: "text",
      },
      muted: {
        variable: "zx-text-muted",
        light: COLOR_SCALES.background[700],
        dark: COLOR_SCALES.background[400],
        description: "Secondary / helper text",
        category: "text",
      },
      inverse: {
        variable: "zx-text-inverse",
        light: COLOR_BACKGROUND,
        dark: COLOR_SECONDARY,
        description: "Text on dark backgrounds",
        category: "text",
      },
      brand: {
        variable: "zx-text-brand",
        light: COLOR_PRIMARY,
        dark: COLOR_SCALES.primary[300],
        description: "Brand-coloured text (links, labels)",
        category: "text",
      },
      accent: {
        variable: "zx-text-accent",
        light: COLOR_ACCENT,
        dark: COLOR_SCALES.accent[300],
        description: "Accent / alert text",
        category: "text",
      },
      "on-brand": {
        variable: "zx-text-on-brand",
        light: "#FFFFFF",
        dark: "#FFFFFF",
        description: "Text placed directly on brand-coloured surfaces",
        category: "text",
      },
    },

    // ── Borders ────────────────────────────────────────────────
    border: {
      default: {
        variable: "zx-border-default",
        light: COLOR_SCALES.background[300],
        dark: COLOR_SCALES.secondary[200],
        description: "Default divider / border",
        category: "border",
      },
      subtle: {
        variable: "zx-border-subtle",
        light: COLOR_SCALES.background[200],
        dark: COLOR_SCALES.secondary[100],
        description: "Hairline border for cards",
        category: "border",
      },
      brand: {
        variable: "zx-border-brand",
        light: COLOR_PRIMARY,
        dark: COLOR_SCALES.primary[400],
        description: "Brand-coloured focus ring / accent border",
        category: "border",
      },
      accent: {
        variable: "zx-border-accent",
        light: COLOR_ACCENT,
        dark: COLOR_SCALES.accent[400],
        description: "Error / alert border",
        category: "border",
      },
    },

    // ── Interactive ────────────────────────────────────────────
    interactive: {
      "primary-bg": {
        variable: "zx-interactive-primary-bg",
        light: COLOR_PRIMARY,
        dark: COLOR_SCALES.primary[400],
        description: "Primary button / link background",
        category: "interactive",
      },
      "primary-hover": {
        variable: "zx-interactive-primary-hover",
        light: COLOR_SCALES.primary[600],
        dark: COLOR_SCALES.primary[300],
        description: "Primary button hover state",
        category: "interactive",
      },
      "primary-active": {
        variable: "zx-interactive-primary-active",
        light: COLOR_SCALES.primary[700],
        dark: COLOR_SCALES.primary[200],
        description: "Primary button active/pressed state",
        category: "interactive",
      },
      "primary-text": {
        variable: "zx-interactive-primary-text",
        light: "#FFFFFF",
        dark: "#FFFFFF",
        description: "Text on primary button",
        category: "interactive",
      },
      "secondary-bg": {
        variable: "zx-interactive-secondary-bg",
        light: COLOR_SECONDARY,
        dark: COLOR_BACKGROUND,
        description: "Secondary button background",
        category: "interactive",
      },
      "secondary-hover": {
        variable: "zx-interactive-secondary-hover",
        light: COLOR_SCALES.secondary[400],
        dark: COLOR_SCALES.background[300],
        description: "Secondary button hover state",
        category: "interactive",
      },
      "secondary-text": {
        variable: "zx-interactive-secondary-text",
        light: "#FFFFFF",
        dark: COLOR_SECONDARY,
        description: "Text on secondary button",
        category: "interactive",
      },
      "accent-bg": {
        variable: "zx-interactive-accent-bg",
        light: COLOR_ACCENT,
        dark: COLOR_SCALES.accent[400],
        description: "Accent / danger button background",
        category: "interactive",
      },
      "accent-hover": {
        variable: "zx-interactive-accent-hover",
        light: COLOR_SCALES.accent[600],
        dark: COLOR_SCALES.accent[300],
        description: "Accent button hover state",
        category: "interactive",
      },
      "focus-ring": {
        variable: "zx-interactive-focus-ring",
        light: `${COLOR_PRIMARY}66`,
        dark: `${COLOR_SCALES.primary[400]}66`,
        description: "Keyboard focus ring (40% opacity)",
        category: "interactive",
      },
    },

    // ── Feedback ───────────────────────────────────────────────
    feedback: {
      error: {
        variable: "zx-feedback-error",
        light: COLOR_ACCENT,
        dark: COLOR_SCALES.accent[400],
        description: "Error state colour",
        category: "feedback",
      },
      "error-bg": {
        variable: "zx-feedback-error-bg",
        light: COLOR_SCALES.accent[50],
        dark: COLOR_SCALES.accent[900],
        description: "Error background tint",
        category: "feedback",
      },
      success: {
        variable: "zx-feedback-success",
        light: "#16A34A",
        dark: "#4ADE80",
        description: "Success state colour",
        category: "feedback",
      },
      "success-bg": {
        variable: "zx-feedback-success-bg",
        light: "#F0FDF4",
        dark: "#14532D",
        description: "Success background tint",
        category: "feedback",
      },
      warning: {
        variable: "zx-feedback-warning",
        light: "#B45309",
        dark: "#FCD34D",
        description: "Warning state colour",
        category: "feedback",
      },
      "warning-bg": {
        variable: "zx-feedback-warning-bg",
        light: "#FFFBEB",
        dark: "#78350F",
        description: "Warning background tint",
        category: "feedback",
      },
      info: {
        variable: "zx-feedback-info",
        light: COLOR_PRIMARY,
        dark: COLOR_SCALES.primary[300],
        description: "Informational state colour (uses brand primary)",
        category: "feedback",
      },
      "info-bg": {
        variable: "zx-feedback-info-bg",
        light: COLOR_SCALES.primary[50],
        dark: COLOR_SCALES.primary[900],
        description: "Info background tint",
        category: "feedback",
      },
    },

    // ── Brand Utilities ────────────────────────────────────────
    brand: {
      primary: {
        variable: "zx-brand-primary",
        light: COLOR_PRIMARY,
        dark: COLOR_PRIMARY,
        description: "Canonical Periwinkle brand colour (always fixed)",
        category: "brand",
      },
      secondary: {
        variable: "zx-brand-secondary",
        light: COLOR_SECONDARY,
        dark: COLOR_SECONDARY,
        description: "Canonical Black brand colour (always fixed)",
        category: "brand",
      },
      accent: {
        variable: "zx-brand-accent",
        light: COLOR_ACCENT,
        dark: COLOR_ACCENT,
        description: "Canonical Coral Red brand colour (always fixed)",
        category: "brand",
      },
      background: {
        variable: "zx-brand-background",
        light: COLOR_BACKGROUND,
        dark: COLOR_BACKGROUND,
        description: "Canonical Warm Off-White brand colour (always fixed)",
        category: "brand",
      },
    },
  },
};

// ─── Flat Token Map ───────────────────────────────────────────────────────────

/**
 * All tokens as a flat array for easy iteration.
 */
export function getFlatTokens(): ColorToken[] {
  const flat: ColorToken[] = [];
  for (const group of Object.values(DESIGN_TOKENS.categories)) {
    for (const token of Object.values(group)) {
      flat.push(token);
    }
  }
  return flat;
}

/**
 * Get a specific token by CSS variable name.
 */
export function getTokenByVariable(variable: string): ColorToken | undefined {
  return getFlatTokens().find((t) => t.variable === variable);
}
