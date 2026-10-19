/**
 * @zenxea/design-tokens — Universal Grid Token System
 *
 * Implements a Swiss Modular Grid architecture:
 *   - Desktop (>=1024px): 12 columns, 32px gutters
 *   - Tablet (768px - 1023px): 8 columns, 24px gutters
 *   - Mobile (<768px): 4 columns, 16px gutters
 *
 * Supports Modern Digital Brutalism with architectural alignments,
 * visible divider utilities, and subgrid inheritance.
 */

export interface GridTier {
  columns: number;
  gutter: string;
  gutterPx: number;
  margin: string;
  marginPx: number;
}

export const GRID_CONFIG: {
  mobile: GridTier;
  tablet: GridTier;
  desktop: GridTier;
  wide: GridTier;
  fluid: {
    gutter: string;
    margin: string;
  };
} = {
  mobile: {
    columns: 4,
    gutter: "1rem", // 16px
    gutterPx: 16,
    margin: "1rem", // 16px
    marginPx: 16,
  },
  tablet: {
    columns: 8,
    gutter: "1.5rem", // 24px
    gutterPx: 24,
    margin: "1.5rem", // 24px
    marginPx: 24,
  },
  desktop: {
    columns: 12,
    gutter: "2rem", // 32px
    gutterPx: 32,
    margin: "2rem", // 32px
    marginPx: 32,
  },
  wide: {
    columns: 12,
    gutter: "2rem", // 32px
    gutterPx: 32,
    margin: "3rem", // 48px
    marginPx: 48,
  },
  fluid: {
    gutter: "clamp(1rem, 0.5rem + 1.5vw, 2rem)",
    margin: "clamp(1rem, 0.5rem + 1.5vw, 2.5rem)",
  },
};

export const GRID_COLUMNS = {
  mobile: 4,
  tablet: 8,
  desktop: 12,
} as const;

export const GRID_GUTTERS = {
  sm: "1rem",
  md: "1.5rem",
  lg: "2rem",
  fluid: "clamp(1rem, 0.5rem + 1.5vw, 2rem)",
} as const;

export const GRID_MARGINS = {
  sm: "1rem",
  md: "1.5rem",
  lg: "2rem",
  xl: "3rem",
  fluid: "clamp(1rem, 0.5rem + 1.5vw, 2.5rem)",
} as const;

/**
 * CSS Grid Column Span Tokens.
 * Defines standard span fractions for responsive column allocation.
 */
export const GRID_SPANS = {
  1: "span 1 / span 1",
  2: "span 2 / span 2",
  3: "span 3 / span 3",
  4: "span 4 / span 4",
  5: "span 5 / span 5",
  6: "span 6 / span 6",
  7: "span 7 / span 7",
  8: "span 8 / span 8",
  9: "span 9 / span 9",
  10: "span 10 / span 10",
  11: "span 11 / span 11",
  12: "span 12 / span 12",
  full: "1 / -1",
} as const;
