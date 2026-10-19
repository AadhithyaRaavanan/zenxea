/**
 * @zenxea/design-tokens — Universal Spacing Token System
 *
 * Built on a strict 4px base modular scale (0.25rem = 4px).
 * Provides linear step tokens, semantic component padding,
 * card padding, fluid section spacing (clamp), and gap scales.
 */

export interface SpacingToken {
  step: string;
  variable: string;
  cssVariable: string;
  rem: string;
  px: number;
}

export interface SemanticSpacingToken {
  variable: string;
  cssVariable: string;
  value: string;
  description: string;
  minPx?: number;
  maxPx?: number;
  px?: number;
}

// ─── 1. Base 4px Modular Scale ────────────────────────────────────────────────

export const SPACING_SCALE = {
  "0": { rem: "0rem", px: 0 },
  "0.5": { rem: "0.125rem", px: 2 },
  "1": { rem: "0.25rem", px: 4 },
  "1.5": { rem: "0.375rem", px: 6 },
  "2": { rem: "0.5rem", px: 8 },
  "2.5": { rem: "0.625rem", px: 10 },
  "3": { rem: "0.75rem", px: 12 },
  "3.5": { rem: "0.875rem", px: 14 },
  "4": { rem: "1rem", px: 16 },
  "5": { rem: "1.25rem", px: 20 },
  "6": { rem: "1.5rem", px: 24 },
  "7": { rem: "1.75rem", px: 28 },
  "8": { rem: "2rem", px: 32 },
  "9": { rem: "2.25rem", px: 36 },
  "10": { rem: "2.5rem", px: 40 },
  "11": { rem: "2.75rem", px: 44 },
  "12": { rem: "3rem", px: 48 },
  "14": { rem: "3.5rem", px: 56 },
  "16": { rem: "4rem", px: 64 },
  "20": { rem: "5rem", px: 80 },
  "24": { rem: "6rem", px: 96 },
  "28": { rem: "7rem", px: 112 },
  "32": { rem: "8rem", px: 128 },
  "36": { rem: "9rem", px: 144 },
  "40": { rem: "10rem", px: 160 },
  "48": { rem: "12rem", px: 192 },
  "56": { rem: "14rem", px: 224 },
  "64": { rem: "16rem", px: 256 },
} as const;

export type SpacingScaleKey = keyof typeof SPACING_SCALE;

/**
 * Returns formatted CSS variable name for a scale step.
 * e.g. "4" -> "--zx-space-4"
 */
export function getSpacingVarName(step: SpacingScaleKey): string {
  const sanitized = step.replace(".", "_");
  return `--zx-space-${sanitized}`;
}

// ─── 2. Semantic Component Padding ────────────────────────────────────────────

export const COMPONENT_SPACING: Record<string, SemanticSpacingToken> = {
  xs: {
    variable: "zx-space-component-xs",
    cssVariable: "--zx-space-component-xs",
    value: "0.25rem",
    px: 4,
    description: "Micro component padding (tags, status pills)",
  },
  sm: {
    variable: "zx-space-component-sm",
    cssVariable: "--zx-space-component-sm",
    value: "0.5rem",
    px: 8,
    description: "Compact component padding (small buttons, chips)",
  },
  md: {
    variable: "zx-space-component-md",
    cssVariable: "--zx-space-component-md",
    value: "0.75rem",
    px: 12,
    description: "Standard component padding (inputs, buttons)",
  },
  lg: {
    variable: "zx-space-component-lg",
    cssVariable: "--zx-space-component-lg",
    value: "1rem",
    px: 16,
    description: "Prominent component padding (modal headers, dropdowns)",
  },
  xl: {
    variable: "zx-space-component-xl",
    cssVariable: "--zx-space-component-xl",
    value: "1.5rem",
    px: 24,
    description: "Generous component padding (hero CTAs, banner blocks)",
  },
};

// ─── 3. Semantic Card & Panel Spacing ─────────────────────────────────────────

export const CARD_SPACING: Record<string, SemanticSpacingToken> = {
  sm: {
    variable: "zx-space-card-sm",
    cssVariable: "--zx-space-card-sm",
    value: "1rem",
    px: 16,
    description: "Compact card padding (dense lists, mobile cards)",
  },
  md: {
    variable: "zx-space-card-md",
    cssVariable: "--zx-space-card-md",
    value: "1.5rem",
    px: 24,
    description: "Standard card padding (standard cards, metric widgets)",
  },
  lg: {
    variable: "zx-space-card-lg",
    cssVariable: "--zx-space-card-lg",
    value: "2rem",
    px: 32,
    description: "Spacious card padding (feature panels, callout boxes)",
  },
  xl: {
    variable: "zx-space-card-xl",
    cssVariable: "--zx-space-card-xl",
    value: "2.5rem",
    px: 40,
    description: "Feature card padding (modal dialogs, hero panels)",
  },
};

// ─── 4. Fluid Section Spacing (clamp) ─────────────────────────────────────────

export const SECTION_SPACING: Record<string, SemanticSpacingToken> = {
  xs: {
    variable: "zx-space-section-xs",
    cssVariable: "--zx-space-section-xs",
    value: "clamp(1.5rem, 1rem + 1vw, 2.5rem)",
    minPx: 24,
    maxPx: 40,
    description: "Tight section spacer (between related subsections)",
  },
  sm: {
    variable: "zx-space-section-sm",
    cssVariable: "--zx-space-section-sm",
    value: "clamp(2rem, 1.5rem + 1.5vw, 3.5rem)",
    minPx: 32,
    maxPx: 56,
    description: "Compact section spacer (card grids, form groups)",
  },
  md: {
    variable: "zx-space-section-md",
    cssVariable: "--zx-space-section-md",
    value: "clamp(3rem, 2rem + 3vw, 5.5rem)",
    minPx: 48,
    maxPx: 88,
    description: "Standard section vertical rhythm (major content blocks)",
  },
  lg: {
    variable: "zx-space-section-lg",
    cssVariable: "--zx-space-section-lg",
    value: "clamp(4.5rem, 3rem + 4.5vw, 8rem)",
    minPx: 72,
    maxPx: 128,
    description: "Generous section padding (major page sections, CTA blocks)",
  },
  xl: {
    variable: "zx-space-section-xl",
    cssVariable: "--zx-space-section-xl",
    value: "clamp(6rem, 4rem + 6vw, 11rem)",
    minPx: 96,
    maxPx: 176,
    description: "Hero & flagship section vertical padding",
  },
  "2xl": {
    variable: "zx-space-section-2xl",
    cssVariable: "--zx-space-section-2xl",
    value: "clamp(7.5rem, 5rem + 7.5vw, 14rem)",
    minPx: 120,
    maxPx: 224,
    description: "Monumental section spacer (landing hero, final footer)",
  },
};

// ─── 5. Gap & Gutter Tokens ───────────────────────────────────────────────────

export const GAP_SPACING: Record<string, SemanticSpacingToken> = {
  xs: {
    variable: "zx-gap-xs",
    cssVariable: "--zx-gap-xs",
    value: "0.25rem",
    px: 4,
    description: "Micro gap for inline tags, icon + label",
  },
  sm: {
    variable: "zx-gap-sm",
    cssVariable: "--zx-gap-sm",
    value: "0.5rem",
    px: 8,
    description: "Small gap for button groups, list items",
  },
  md: {
    variable: "zx-gap-md",
    cssVariable: "--zx-gap-md",
    value: "1rem",
    px: 16,
    description: "Standard gap for cards, form fields, flex rows",
  },
  lg: {
    variable: "zx-gap-lg",
    cssVariable: "--zx-gap-lg",
    value: "1.5rem",
    px: 24,
    description: "Large gap for grid columns, split panels",
  },
  xl: {
    variable: "zx-gap-xl",
    cssVariable: "--zx-gap-xl",
    value: "2rem",
    px: 32,
    description: "Extra large gap for prominent grid layouts",
  },
  "2xl": {
    variable: "zx-gap-2xl",
    cssVariable: "--zx-gap-2xl",
    value: "3rem",
    px: 48,
    description: "Generous layout gap for desktop grids",
  },
  "3xl": {
    variable: "zx-gap-3xl",
    cssVariable: "--zx-gap-3xl",
    value: "4rem",
    px: 64,
    description: "Massive layout gap for editorial layouts",
  },
};
