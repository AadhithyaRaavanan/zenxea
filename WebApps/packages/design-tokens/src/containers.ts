/**
 * @zenxea/design-tokens — Universal Container System
 *
 * Defines centralized max-width boundaries, fluid edge gutters,
 * and breakout tokens for content alignment.
 */

export interface ContainerToken {
  key: ContainerKey;
  px: number;
  rem: string;
  variable: string;
  cssVariable: string;
  description: string;
}

export type ContainerKey = "sm" | "md" | "lg" | "xl" | "2xl" | "full";

export const CONTAINER_MAX_WIDTHS: Record<ContainerKey, ContainerToken> = {
  sm: {
    key: "sm",
    px: 640,
    rem: "40rem",
    variable: "zx-container-sm",
    cssVariable: "--zx-container-sm",
    description: "Compact reading container, authentication cards, narrow forms",
  },
  md: {
    key: "md",
    px: 768,
    rem: "48rem",
    variable: "zx-container-md",
    cssVariable: "--zx-container-md",
    description: "Editorial prose, single-column articles, focused documentation",
  },
  lg: {
    key: "lg",
    px: 1024,
    rem: "64rem",
    variable: "zx-container-lg",
    cssVariable: "--zx-container-lg",
    description: "Compact dashboard layouts, tablet-optimized views",
  },
  xl: {
    key: "xl",
    px: 1280,
    rem: "80rem",
    variable: "zx-container-xl",
    cssVariable: "--zx-container-xl",
    description: "Canonical standard Zen Xea desktop page container",
  },
  "2xl": {
    key: "2xl",
    px: 1440,
    rem: "90rem",
    variable: "zx-container-2xl",
    cssVariable: "--zx-container-2xl",
    description: "Wide canvas for data-dense tables, media grids, creative showcases",
  },
  full: {
    key: "full",
    px: 9999,
    rem: "100%",
    variable: "zx-container-full",
    cssVariable: "--zx-container-full",
    description: "Edge-to-edge fluid container with active gutters",
  },
};

/**
 * Container gutter tokens for inline horizontal padding.
 */
export const CONTAINER_GUTTERS = {
  mobile: "1rem", // 16px
  tablet: "1.5rem", // 24px
  desktop: "2rem", // 32px
  fluid: "clamp(1rem, 2vw + 0.5rem, 2.5rem)",
} as const;
