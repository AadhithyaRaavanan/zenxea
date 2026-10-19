/**
 * @zenxea/tokens — Universal Brand Typography System
 *
 * Defines canonical font families, fluid responsive scales (clamp),
 * line-heights, letter-spacings, weights, and composite text styles.
 *
 * Font pairing:
 *   - Bebas Neue: Oversized hero headlines, section headings, uppercase display text
 *   - Manrope: Body paragraphs, navigation, buttons, cards, forms, general UI
 *   - IBM Plex Mono: Eyebrows, project labels, metadata, category tags, technical details
 *
 * Universal token exports:
 *   - FONT_FAMILIES
 *   - FONT_WEIGHTS
 *   - TYPE_SCALE (fluid clamp formulas)
 *   - LINE_HEIGHTS
 *   - LETTER_SPACINGS
 *   - TYPOGRAPHY_STYLES (pre-composed styles)
 *   - GOOGLE_FONTS_URL (canonical URL for non-Next.js environments)
 *   - GOOGLE_FONTS_HTML_TAGS (HTML <link> snippet)
 *   - GOOGLE_FONTS_IMPORT_CSS (@import CSS statement)
 */

// ─── 1. Font Family Tokens ───────────────────────────────────────────────────

export interface FontFamilyToken {
  name: string;
  variable: string;
  cssVariable: string;
  stack: string;
  weights: number[];
  description: string;
  uppercase?: boolean;
}

export const FONT_FAMILIES = {
  display: {
    name: "Bebas Neue",
    variable: "zx-font-display",
    cssVariable: "--zx-font-display",
    stack: "'Bebas Neue', 'Impact', -apple-system, sans-serif",
    weights: [400],
    description: "Oversized hero headlines, section headings, bold uppercase display text",
    uppercase: true,
  },
  body: {
    name: "Manrope",
    variable: "zx-font-body",
    cssVariable: "--zx-font-body",
    stack: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    weights: [400, 500, 600, 700, 800],
    description: "Body paragraphs, navigation, buttons, cards, forms, and general UI text",
    uppercase: false,
  },
  mono: {
    name: "IBM Plex Mono",
    variable: "zx-font-mono",
    cssVariable: "--zx-font-mono",
    stack: "'IBM Plex Mono', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace",
    weights: [400, 500, 600],
    description: "Eyebrows, project labels, metadata, category tags, and technical details",
    uppercase: false,
  },
} as const satisfies Record<string, FontFamilyToken>;

export type FontFamilyKey = keyof typeof FONT_FAMILIES;

// ─── 2. Font Weights ─────────────────────────────────────────────────────────

export const FONT_WEIGHTS = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
} as const;

export type FontWeightKey = keyof typeof FONT_WEIGHTS;

// ─── 3. Fluid Type Scale Tokens (clamp) ──────────────────────────────────────

export interface TypeScaleToken {
  variable: string;
  cssVariable: string;
  clamp: string;
  minPx: number;
  maxPx: number;
  description: string;
}

export const TYPE_SCALE = {
  display: {
    variable: "zx-text-display",
    cssVariable: "--zx-text-display",
    clamp: "clamp(4rem, 2.286rem + 7.619vw, 9rem)",
    minPx: 64,
    maxPx: 144,
    description: "Oversized hero headline (64px mobile → 144px desktop)",
  },
  h1: {
    variable: "zx-text-h1",
    cssVariable: "--zx-text-h1",
    clamp: "clamp(3.5rem, 2.429rem + 4.762vw, 6rem)",
    minPx: 56,
    maxPx: 96,
    description: "Primary section heading (56px mobile → 96px desktop)",
  },
  h2: {
    variable: "zx-text-h2",
    cssVariable: "--zx-text-h2",
    clamp: "clamp(2.75rem, 1.857rem + 3.968vw, 5rem)",
    minPx: 44,
    maxPx: 80,
    description: "Major section sub-heading (44px mobile → 80px desktop)",
  },
  h3: {
    variable: "zx-text-h3",
    cssVariable: "--zx-text-h3",
    clamp: "clamp(2rem, 1.643rem + 1.587vw, 3rem)",
    minPx: 32,
    maxPx: 48,
    description: "Card title and subsection heading (32px mobile → 48px desktop)",
  },
  h4: {
    variable: "zx-text-h4",
    cssVariable: "--zx-text-h4",
    clamp: "clamp(1.5rem, 1.321rem + 0.794vw, 2rem)",
    minPx: 24,
    maxPx: 32,
    description: "Feature titles and modal headings (24px mobile → 32px desktop)",
  },
  h5: {
    variable: "zx-text-h5",
    cssVariable: "--zx-text-h5",
    clamp: "clamp(1.25rem, 1.161rem + 0.397vw, 1.5rem)",
    minPx: 20,
    maxPx: 24,
    description: "Small component header (20px mobile → 24px desktop)",
  },
  "body-lg": {
    variable: "zx-text-body-lg",
    cssVariable: "--zx-text-body-lg",
    clamp: "clamp(1.125rem, 1.036rem + 0.397vw, 1.25rem)",
    minPx: 18,
    maxPx: 20,
    description: "Lead paragraphs and prominent introductions (18px → 20px)",
  },
  body: {
    variable: "zx-text-body",
    cssVariable: "--zx-text-body",
    clamp: "1rem",
    minPx: 16,
    maxPx: 16,
    description: "Standard body text (16px fixed)",
  },
  "body-sm": {
    variable: "zx-text-body-sm",
    cssVariable: "--zx-text-body-sm",
    clamp: "0.875rem",
    minPx: 14,
    maxPx: 14,
    description: "Secondary / compact body text (14px fixed)",
  },
  caption: {
    variable: "zx-text-caption",
    cssVariable: "--zx-text-caption",
    clamp: "clamp(0.6875rem, 0.643rem + 0.198vw, 0.75rem)",
    minPx: 11,
    maxPx: 12,
    description: "Captions, footnotes, metadata badges (11px → 12px)",
  },
  overline: {
    variable: "zx-text-overline",
    cssVariable: "--zx-text-overline",
    clamp: "clamp(0.625rem, 0.58rem + 0.198vw, 0.6875rem)",
    minPx: 10,
    maxPx: 11,
    description: "Small uppercase eyebrows and category tags (10px → 11px)",
  },
  button: {
    variable: "zx-text-button",
    cssVariable: "--zx-text-button",
    clamp: "clamp(0.75rem, 0.705rem + 0.198vw, 0.8125rem)",
    minPx: 12,
    maxPx: 13,
    description: "Button and CTA text (12px → 13px)",
  },
} as const satisfies Record<string, TypeScaleToken>;

export type TypeScaleKey = keyof typeof TYPE_SCALE;

// ─── 4. Line Heights ─────────────────────────────────────────────────────────

export const LINE_HEIGHTS = {
  display: "0.82",
  h1: "0.88",
  h2: "0.90",
  h3: "0.95",
  h4: "1.15",
  h5: "1.15",
  "body-lg": "1.60",
  body: "1.65",
  "body-sm": "1.55",
  caption: "1.45",
  nav: "1.2",
  button: "1.2",
} as const;

export type LineHeightKey = keyof typeof LINE_HEIGHTS;

// ─── 5. Letter Spacings ──────────────────────────────────────────────────────

export const LETTER_SPACINGS = {
  display: "-0.035em",
  h1: "-0.025em",
  h2: "-0.02em",
  h3: "-0.015em",
  h4: "-0.01em",
  h5: "-0.005em",
  body: "0em",
  "body-sm": "0em",
  caption: "0.02em",
  mono: "0.05em",
  eyebrow: "0.15em",
  nav: "0.06em",
  button: "0.08em",
} as const;

export type LetterSpacingKey = keyof typeof LETTER_SPACINGS;

// ─── 6. Composite Typography Styles (Presets) ────────────────────────────────

export interface TypographyStylePreset {
  fontFamily: string;
  fontSize: string;
  fontWeight: number;
  lineHeight: string;
  letterSpacing: string;
  textTransform?: "uppercase" | "none";
  description: string;
}

export const TYPOGRAPHY_STYLES: Record<string, TypographyStylePreset> = {
  display: {
    fontFamily: "var(--zx-font-display)",
    fontSize: "var(--zx-text-display)",
    fontWeight: 400,
    lineHeight: "var(--zx-lh-display)",
    letterSpacing: "var(--zx-ls-display)",
    textTransform: "uppercase",
    description: "Hero display title — oversized condensed uppercase Bebas Neue",
  },
  h1: {
    fontFamily: "var(--zx-font-display)",
    fontSize: "var(--zx-text-h1)",
    fontWeight: 400,
    lineHeight: "var(--zx-lh-h1)",
    letterSpacing: "var(--zx-ls-h1)",
    textTransform: "uppercase",
    description: "Primary section heading — Bebas Neue uppercase",
  },
  h2: {
    fontFamily: "var(--zx-font-display)",
    fontSize: "var(--zx-text-h2)",
    fontWeight: 400,
    lineHeight: "var(--zx-lh-h2)",
    letterSpacing: "var(--zx-ls-h2)",
    textTransform: "uppercase",
    description: "Major subsection heading — Bebas Neue uppercase",
  },
  h3: {
    fontFamily: "var(--zx-font-display)",
    fontSize: "var(--zx-text-h3)",
    fontWeight: 400,
    lineHeight: "var(--zx-lh-h3)",
    letterSpacing: "var(--zx-ls-h3)",
    textTransform: "uppercase",
    description: "Card title and list heading — Bebas Neue uppercase",
  },
  h4: {
    fontFamily: "var(--zx-font-body)",
    fontSize: "var(--zx-text-h4)",
    fontWeight: 700,
    lineHeight: "var(--zx-lh-h4)",
    letterSpacing: "var(--zx-ls-h4)",
    textTransform: "none",
    description: "Feature title — Manrope Bold",
  },
  h5: {
    fontFamily: "var(--zx-font-body)",
    fontSize: "var(--zx-text-h5)",
    fontWeight: 600,
    lineHeight: "var(--zx-lh-h5)",
    letterSpacing: "var(--zx-ls-h5)",
    textTransform: "none",
    description: "Component title — Manrope SemiBold",
  },
  lead: {
    fontFamily: "var(--zx-font-body)",
    fontSize: "var(--zx-text-body-lg)",
    fontWeight: 400,
    lineHeight: "var(--zx-lh-body-lg)",
    letterSpacing: "var(--zx-ls-body)",
    textTransform: "none",
    description: "Lead introductory paragraph — Manrope Regular",
  },
  body: {
    fontFamily: "var(--zx-font-body)",
    fontSize: "var(--zx-text-body)",
    fontWeight: 400,
    lineHeight: "var(--zx-lh-body)",
    letterSpacing: "var(--zx-ls-body)",
    textTransform: "none",
    description: "Standard body copy — Manrope Regular",
  },
  bodySm: {
    fontFamily: "var(--zx-font-body)",
    fontSize: "var(--zx-text-body-sm)",
    fontWeight: 400,
    lineHeight: "var(--zx-lh-body-sm)",
    letterSpacing: "var(--zx-ls-body-sm)",
    textTransform: "none",
    description: "Secondary copy and captions — Manrope Regular",
  },
  eyebrow: {
    fontFamily: "var(--zx-font-mono)",
    fontSize: "var(--zx-text-overline)",
    fontWeight: 500,
    lineHeight: "var(--zx-lh-nav)",
    letterSpacing: "var(--zx-ls-eyebrow)",
    textTransform: "uppercase",
    description: "Category eyebrows and badges — IBM Plex Mono Medium Uppercase",
  },
  mono: {
    fontFamily: "var(--zx-font-mono)",
    fontSize: "var(--zx-text-body-sm)",
    fontWeight: 400,
    lineHeight: "1.5",
    letterSpacing: "var(--zx-ls-mono)",
    textTransform: "none",
    description: "Inline code, metadata, hash values — IBM Plex Mono Regular",
  },
  button: {
    fontFamily: "var(--zx-font-body)",
    fontSize: "var(--zx-text-button)",
    fontWeight: 700,
    lineHeight: "var(--zx-lh-button)",
    letterSpacing: "var(--zx-ls-button)",
    textTransform: "uppercase",
    description: "Interactive buttons and CTAs — Manrope Bold Uppercase",
  },
  nav: {
    fontFamily: "var(--zx-font-body)",
    fontSize: "var(--zx-text-button)",
    fontWeight: 600,
    lineHeight: "var(--zx-lh-nav)",
    letterSpacing: "var(--zx-ls-nav)",
    textTransform: "uppercase",
    description: "Navigation links — Manrope SemiBold Uppercase",
  },
  caption: {
    fontFamily: "var(--zx-font-body)",
    fontSize: "var(--zx-text-caption)",
    fontWeight: 400,
    lineHeight: "var(--zx-lh-caption)",
    letterSpacing: "var(--zx-ls-caption)",
    textTransform: "none",
    description: "Footnotes and legal disclaimers — Manrope Regular",
  },
};

// ─── 7. Universal Web Fonts Integration ──────────────────────────────────────

/**
 * Canonical Google Fonts stylesheet URL.
 * Contains Bebas Neue, Manrope (400-800), and IBM Plex Mono (400-600).
 * Can be loaded in ANY HTML, React, Angular, Vue, Vite, or Astro app.
 */
export const GOOGLE_FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;1,400&family=Manrope:wght@400;500;600;700;800&display=swap";

/**
 * Ready-to-paste HTML snippet for <head> in any web project.
 */
export const GOOGLE_FONTS_HTML_TAGS = `<!-- Zen Xea Universal Typography Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="${GOOGLE_FONTS_URL}" rel="stylesheet" />`;

/**
 * Standard CSS @import statement.
 */
export const GOOGLE_FONTS_IMPORT_CSS = `@import url("${GOOGLE_FONTS_URL}");`;

/**
 * Next.js Google Fonts configuration metadata.
 * Use with next/font/google in Next.js App Router applications.
 */
export const NEXT_FONT_METADATA = {
  display: {
    importFrom: "next/font/google",
    exportName: "Bebas_Neue",
    weight: "400",
    variable: "--font-display",
    subsets: ["latin"],
    display: "swap",
  },
  body: {
    importFrom: "next/font/google",
    exportName: "Manrope",
    weight: ["400", "500", "600", "700", "800"],
    variable: "--font-body",
    subsets: ["latin"],
    display: "swap",
  },
  mono: {
    importFrom: "next/font/google",
    exportName: "IBM_Plex_Mono",
    weight: ["400", "500", "600"],
    variable: "--font-mono",
    subsets: ["latin"],
    display: "swap",
  },
} as const;
