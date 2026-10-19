/**
 * @zenxea/tokens — Theme Provider Utilities
 *
 * Framework-agnostic theme utilities for managing light/dark mode.
 * Works in any JavaScript environment (browser, Node.js, React, Vue, etc.)
 */

export type ThemeMode = "light" | "dark" | "system";

// ─── Storage Key ──────────────────────────────────────────────────────────────

const STORAGE_KEY = "zx-theme" as const;
const DATA_ATTRIBUTE = "data-theme" as const;

// ─── Theme Detection ──────────────────────────────────────────────────────────

/**
 * Get the system preferred colour scheme.
 * Returns "dark" if the OS is in dark mode, "light" otherwise.
 */
export function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/**
 * Get the currently persisted user theme preference.
 * Returns null if no preference has been saved.
 */
export function getStoredTheme(): ThemeMode | null {
  if (typeof localStorage === "undefined") return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark" || stored === "system") {
    return stored;
  }
  return null;
}

/**
 * Resolve the effective theme given a preference.
 * "system" resolves to the OS preference.
 */
export function resolveTheme(preference: ThemeMode): "light" | "dark" {
  if (preference === "system") return getSystemTheme();
  return preference;
}

// ─── Theme Application ────────────────────────────────────────────────────────

/**
 * Apply a theme to the document root element.
 * Sets data-theme="light" | "dark" on <html>.
 */
export function applyTheme(
  mode: ThemeMode,
  root?: HTMLElement
): "light" | "dark" {
  const resolved = resolveTheme(mode);
  const element = root ?? (typeof document !== "undefined" ? document.documentElement : null);

  if (element) {
    element.setAttribute(DATA_ATTRIBUTE, resolved);
  }

  return resolved;
}

/**
 * Persist the user's theme preference and apply it immediately.
 */
export function setTheme(mode: ThemeMode, root?: HTMLElement): "light" | "dark" {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(STORAGE_KEY, mode);
  }
  return applyTheme(mode, root);
}

/**
 * Read the stored preference and apply it.
 * Call this on app startup to restore the user's preference.
 * Falls back to "system" if nothing is stored.
 */
export function initTheme(root?: HTMLElement): "light" | "dark" {
  const stored = getStoredTheme() ?? "system";
  return applyTheme(stored, root);
}

/**
 * Toggle between light and dark mode.
 * If currently "system", resolves to its opposite.
 */
export function toggleTheme(root?: HTMLElement): "light" | "dark" {
  const stored = getStoredTheme() ?? "system";
  const current = resolveTheme(stored);
  const next: ThemeMode = current === "dark" ? "light" : "dark";
  return setTheme(next, root);
}

// ─── Script Snippet ───────────────────────────────────────────────────────────

/**
 * Returns a minimal inline script string that can be injected into the <head>
 * of an HTML document to prevent flash of unstyled content (FOUC).
 *
 * Usage in Next.js:
 *   <script dangerouslySetInnerHTML={{ __html: getThemeScript() }} />
 */
export function getThemeScript(): string {
  return `(function(){try{var s=localStorage.getItem('${STORAGE_KEY}');var resolved=s==='dark'?'dark':s==='light'?'light':(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('${DATA_ATTRIBUTE}',resolved);}catch(e){}})();`;
}

// ─── React Hook (if React is available) ──────────────────────────────────────

/**
 * Type-safe interface for useZenTheme hook.
 * Implement this in your React app using the utilities above.
 */
export interface ZenThemeContextValue {
  theme: ThemeMode;
  resolvedTheme: "light" | "dark";
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  isDark: boolean;
}
