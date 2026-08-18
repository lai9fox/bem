import { execSync } from 'node:child_process';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

function git(command) {
  try {
    return execSync(command, { encoding: 'utf8' }).trim();
  } catch {
    return '';
  }
}

const shaFull = process.env.GITHUB_SHA || git('git rev-parse HEAD');
const shaShort = shaFull ? shaFull.slice(0, 7) : git('git rev-parse --short HEAD') || 'dev';

process.env.PUBLIC_GIT_SHA = shaShort;
process.env.PUBLIC_GIT_SHA_FULL = shaFull;
process.env.PUBLIC_BUILD_TIME = new Date().toISOString();

function rehypeWrapTables() {
  return (tree) => {
    const wrap = (node) => {
      if (!node.children) return;
      node.children = node.children.map((child) => {
        wrap(child);
        if (child.type === 'element' && child.tagName === 'table') {
          return {
            type: 'element',
            tagName: 'div',
            properties: { className: ['table-wrap'] },
            children: [child],
          };
        }
        return child;
      });
    };
    wrap(tree);
  };
}

export default defineConfig({
  site: 'https://bem.fox9.dev',
  base: '/',
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'zh',
        locales: {
          zh: 'zh-CN',
          en: 'en',
        },
      },
    }),
  ],
  trailingSlash: 'always',
  compressHTML: true,
  markdown: {
    processor: unified({
      rehypePlugins: [rehypeWrapTables],
    }),
  },
});
