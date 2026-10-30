/**
 * Convert relative template image paths to full storage URLs.
 * API returns paths like "template-images/hero/image1.jpg"
 * Browser needs "/storage/template-images/hero/image1.jpg"
 */
export function resolveImageUrl(url: string | null | undefined): string | undefined {
  if (!url) return undefined;
  // Already absolute or external
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) {
    return url;
  }
  // Relative template path -> prepend /storage/
  return `/storage/${url}`;
}