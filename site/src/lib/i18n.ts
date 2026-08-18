export type Locale = 'zh' | 'en';

/** Semantic path without locale prefix, always with trailing slash except root handled as `/`. */
export type AppPath = '/' | '/guide/' | '/api/' | '/examples/';

export const NAV: { path: AppPath; zh: string; en: string }[] = [
  { path: '/guide/', zh: '指南', en: 'Guide' },
  { path: '/api/', zh: 'API', en: 'API' },
  { path: '/examples/', zh: '示例', en: 'Examples' },
];

export function localizedPath(locale: Locale, path: AppPath): string {
  if (locale === 'zh') return path;
  return path === '/' ? '/en/' : `/en${path}`;
}

export function swapLocale(locale: Locale, path: AppPath): string {
  return localizedPath(locale === 'zh' ? 'en' : 'zh', path);
}

export function absoluteUrl(site: string, base: string, pathname: string): string {
  const root = site.replace(/\/$/, '');
  const basePart = base.endsWith('/') ? base.slice(0, -1) : base;
  const pathPart = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${root}${basePart}${pathPart}`;
}
