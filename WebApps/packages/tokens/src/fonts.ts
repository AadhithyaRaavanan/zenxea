/**
 * @zenxea/tokens/fonts — Universal Font Definitions & Styles
 *
 * All brand fonts are packaged universally in @zenxea/tokens:
 *   - Bebas Neue   → Display & Oversized Headlines (400, condensed uppercase)
 *   - Manrope      → Body copy, Navigation, Buttons & UI (400, 500, 600, 700, 800)
 *   - IBM Plex Mono → Eyebrows, Metadata & Code (400, 500, 600)
 *
 * Fonts are embedded via universal @font-face declarations inside `@zenxea/tokens/css`,
 * eliminating the need for any local font loader code in consuming applications.
 */

export { FONT_FACE_CSS } from "./font-faces";

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
