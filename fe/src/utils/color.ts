/**
 * Color manipulation utilities for dynamic theming.
 * All functions work with 7-char hex strings (e.g., "#ff6b35").
 */

/** Parse hex to RGB components (0-255). */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return null;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return { r, g, b };
}

/** Convert RGB components to 7-char hex. */
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/** Lighten a hex color by percentage (0-100). */
export function lighten(hex: string, percent: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const factor = 1 + percent / 100;
  return rgbToHex(rgb.r * factor, rgb.g * factor, rgb.b * factor);
}

/** Darken a hex color by percentage (0-100). */
export function darken(hex: string, percent: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const factor = 1 - percent / 100;
  return rgbToHex(rgb.r * factor, rgb.g * factor, rgb.b * factor);
}

/** Generate all derived theme tokens from primary and secondary colors. */
export function generateThemeTokens(
  primary: string,
  secondary: string
): Record<string, string> {
  return {
    '--color-primary': primary,
    '--color-primary-deep': darken(primary, 12),
    '--color-primary-soft': lighten(primary, 92),
    '--color-secondary': secondary,
    '--color-secondary-deep': darken(secondary, 12),
    '--color-secondary-soft': lighten(secondary, 92),
  };
}

/** Apply theme tokens to CSS custom properties on :root. */
export function applyTheme(primary: string | null, secondary: string | null): void {
  if (!primary || !secondary) return;

  const tokens = generateThemeTokens(primary, secondary);
  const root = document.documentElement;
  Object.entries(tokens).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

/** Remove custom theme, letting Tailwind @theme defaults take over. */
export function clearTheme(): void {
  const root = document.documentElement;
  [
    '--color-primary',
    '--color-primary-deep',
    '--color-primary-soft',
    '--color-secondary',
    '--color-secondary-deep',
    '--color-secondary-soft',
  ].forEach((key) => root.style.removeProperty(key));
}

/** Validate a 7-char hex color string. */
export function isValidHex(hex: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(hex);
}