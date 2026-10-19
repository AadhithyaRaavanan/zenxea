/**
 * @zenxea/design-tokens — Universal Brand Assets & Favicon System
 *
 * Provides metadata objects, file paths, and HTML link tags for the
 * official Zen Xea brand favicon suite (from favicon_io).
 */

export interface FaviconFile {
  name: string;
  path: string;
  type: string;
  sizes?: string;
  rel: string;
}

export const FAVICON_FILES: FaviconFile[] = [
  {
    name: "favicon.ico",
    path: "/favicon.ico",
    type: "image/x-icon",
    rel: "icon",
  },
  {
    name: "favicon-16x16.png",
    path: "/favicon-16x16.png",
    type: "image/png",
    sizes: "16x16",
    rel: "icon",
  },
  {
    name: "favicon-32x32.png",
    path: "/favicon-32x32.png",
    type: "image/png",
    sizes: "32x32",
    rel: "icon",
  },
  {
    name: "apple-touch-icon.png",
    path: "/apple-touch-icon.png",
    type: "image/png",
    sizes: "180x180",
    rel: "apple-touch-icon",
  },
  {
    name: "android-chrome-192x192.png",
    path: "/android-chrome-192x192.png",
    type: "image/png",
    sizes: "192x192",
    rel: "icon",
  },
  {
    name: "android-chrome-512x512.png",
    path: "/android-chrome-512x512.png",
    type: "image/png",
    sizes: "512x512",
    rel: "icon",
  },
  {
    name: "site.webmanifest",
    path: "/site.webmanifest",
    type: "application/manifest+json",
    rel: "manifest",
  },
];

/**
 * Next.js App Router compatible icons metadata configuration.
 *
 * Usage in app/layout.tsx:
 *   import { NEXT_METADATA_ICONS } from "@zenxea/design-tokens";
 *   export const metadata: Metadata = {
 *     icons: NEXT_METADATA_ICONS,
 *     manifest: "/site.webmanifest",
 *   };
 */
export interface NextMetadataIconItem {
  url: string;
  sizes?: string;
  type?: string;
  rel?: string;
}

export interface NextMetadataIconsConfig {
  icon?: NextMetadataIconItem[];
  apple?: NextMetadataIconItem[];
  other?: NextMetadataIconItem[];
}

export const NEXT_METADATA_ICONS: NextMetadataIconsConfig = {
  icon: [
    { url: "/favicon.ico", sizes: "any" },
    { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
  ],
  apple: [
    { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  ],
  other: [
    { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
    { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
  ],
};

/**
 * Universal HTML <head> tags for Vite, Astro, and vanilla HTML applications.
 */
export const FAVICON_HTML_TAGS = `
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="shortcut icon" href="/favicon.ico">
`.trim();
