import type { AppPath, Locale } from './i18n';

export interface JsonLdInput {
  title: string;
  description: string;
  locale: Locale;
  path: AppPath;
  canonical: string;
  homeUrl: string;
}

export function buildJsonLd(input: JsonLdInput): Record<string, unknown> {
  const inLanguage = input.locale === 'zh' ? 'zh-CN' : 'en';

  if (input.path === '/') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          name: '@lai9fox/bem',
          url: input.homeUrl,
          inLanguage,
        },
        {
          '@type': 'SoftwareSourceCode',
          name: '@lai9fox/bem',
          description: input.description,
          url: 'https://www.npmjs.com/package/@lai9fox/bem',
          codeRepository: 'https://github.com/lai9fox/bem',
          programmingLanguage: 'TypeScript',
          license: 'https://opensource.org/licenses/MIT',
          inLanguage,
        },
      ],
    };
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        headline: input.title,
        description: input.description,
        url: input.canonical,
        inLanguage,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: input.locale === 'zh' ? '首页' : 'Home',
            item: input.homeUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: input.title,
            item: input.canonical,
          },
        ],
      },
    ],
  };
}
