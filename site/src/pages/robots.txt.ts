import type { APIRoute } from 'astro';

const SITEMAP = 'https://bem.fox9.dev/sitemap-index.xml';

export const GET: APIRoute = () =>
  new Response(
    `User-agent: *
Allow: /

Sitemap: ${SITEMAP}
`,
    {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    },
  );
