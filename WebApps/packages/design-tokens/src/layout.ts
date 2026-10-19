/**
 * @zenxea/design-tokens — Layout Primitives & Digital Brutalism Utilities
 *
 * Implements Modern Digital Brutalism & Swiss Modular Grid layout patterns:
 *   - Precise architectural alignment
 *   - Visible structural dividers & sharp 90-degree geometry
 *   - Intentional whitespace rhythms
 *   - Responsive 12 / 8 / 4 column grid layouts
 *   - Flex primitives (Stack, Cluster, Row, Split)
 *   - Section wrappers with fluid padding
 */

export interface LayoutPreset {
  name: string;
  className: string;
  description: string;
}

export const LAYOUT_PRESETS: Record<string, LayoutPreset> = {
  container: {
    name: "Standard Container",
    className: "zx-container",
    description: "Centered content container with fluid gutters (max-width: 1280px)",
  },
  grid12: {
    name: "12-Column Grid",
    className: "zx-grid",
    description: "Responsive 12-col desktop, 8-col tablet, 4-col mobile Swiss grid",
  },
  split50: {
    name: "50/50 Split Grid",
    className: "zx-split-50",
    description: "Two equal-width columns collapsing to single-column on mobile",
  },
  splitSidebar: {
    name: "Sidebar Rail Layout",
    className: "zx-split-sidebar",
    description: "Fixed width sidebar (280px) + fluid main content canvas",
  },
  stack: {
    name: "Vertical Stack",
    className: "zx-stack",
    description: "Vertical rhythm primitive applying uniform gap between children",
  },
  cluster: {
    name: "Horizontal Cluster",
    className: "zx-cluster",
    description: "Horizontal flex wrap layout for badges, tag lists, action bars",
  },
  section: {
    name: "Section Wrapper",
    className: "zx-section",
    description: "Full-width section with responsive fluid vertical padding (clamp)",
  },
  boxBordered: {
    name: "Brutalist Bordered Box",
    className: "zx-box-bordered",
    description: "Sharp rectangular modular cell with 1px/2px crisp structural borders",
  },
};
