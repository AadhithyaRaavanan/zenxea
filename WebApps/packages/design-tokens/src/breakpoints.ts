/**
 * @zenxea/design-tokens — Centralized Responsive Breakpoints
 *
 * Defines canonical screen size boundaries and media query helpers
 * for mobile, tablet, laptop, desktop, and ultra-wide displays.
 */

export interface BreakpointToken {
  key: BreakpointKey;
  px: number;
  rem: string;
  variable: string;
  cssVariable: string;
  description: string;
}

export type BreakpointKey = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export const BREAKPOINTS: Record<BreakpointKey, BreakpointToken> = {
  xs: {
    key: "xs",
    px: 375,
    rem: "23.4375rem",
    variable: "zx-breakpoint-xs",
    cssVariable: "--zx-breakpoint-xs",
    description: "Compact mobile phones",
  },
  sm: {
    key: "sm",
    px: 640,
    rem: "40rem",
    variable: "zx-breakpoint-sm",
    cssVariable: "--zx-breakpoint-sm",
    description: "Large phones & small tablets (landscape)",
  },
  md: {
    key: "md",
    px: 768,
    rem: "48rem",
    variable: "zx-breakpoint-md",
    cssVariable: "--zx-breakpoint-md",
    description: "Standard tablets (portrait) & 8-column grid trigger",
  },
  lg: {
    key: "lg",
    px: 1024,
    rem: "64rem",
    variable: "zx-breakpoint-lg",
    cssVariable: "--zx-breakpoint-lg",
    description: "Laptops, small desktops & 12-column grid trigger",
  },
  xl: {
    key: "xl",
    px: 1280,
    rem: "80rem",
    variable: "zx-breakpoint-xl",
    cssVariable: "--zx-breakpoint-xl",
    description: "Standard high-resolution desktop displays",
  },
  "2xl": {
    key: "2xl",
    px: 1536,
    rem: "96rem",
    variable: "zx-breakpoint-2xl",
    cssVariable: "--zx-breakpoint-2xl",
    description: "Wide desktop monitors & high-density workstations",
  },
};

/**
 * Breakpoint values in pixels as a simple record.
 * Ideal for JS/TS resize listeners and Tailwind preset.
 */
export const BREAKPOINT_PX: Record<BreakpointKey, number> = {
  xs: 375,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

/**
 * Breakpoint values formatted as CSS pixel strings.
 */
export const BREAKPOINT_STRINGS: Record<BreakpointKey, string> = {
  xs: "375px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

// ─── Media Query Helpers ──────────────────────────────────────────────────────

export const MEDIA_QUERIES = {
  /**
   * Matches viewport at or above the given breakpoint.
   * e.g. up("md") -> "@media (min-width: 768px)"
   */
  up: (key: BreakpointKey): string => `@media (min-width: ${BREAKPOINTS[key].px}px)`,

  /**
   * Matches viewport strictly below the given breakpoint.
   * e.g. down("md") -> "@media (max-width: 767.98px)"
   */
  down: (key: BreakpointKey): string => `@media (max-width: ${BREAKPOINTS[key].px - 0.02}px)`,

  /**
   * Matches viewport between two breakpoints.
   * e.g. between("sm", "lg") -> "@media (min-width: 640px) and (max-width: 1023.98px)"
   */
  between: (min: BreakpointKey, max: BreakpointKey): string =>
    `@media (min-width: ${BREAKPOINTS[min].px}px) and (max-width: ${BREAKPOINTS[max].px - 0.02}px)`,

  /**
   * Device target shortcuts.
   */
  mobile: `@media (max-width: 767.98px)`,
  tablet: `@media (min-width: 768px) and (max-width: 1023.98px)`,
  laptop: `@media (min-width: 1024px) and (max-width: 1279.98px)`,
  desktop: `@media (min-width: 1280px)`,
  wide: `@media (min-width: 1536px)`,
} as const;
