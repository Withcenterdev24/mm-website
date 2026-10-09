import type { APIRoute } from 'astro';
import { site } from '../config/site';
export const GET: APIRoute = () => {
  const routes = ['/', '/support/', '/privacy/'];
  const entries = site.origin
    ? routes
        .map(
          (route) =>
            `<url><loc>${new URL(route, site.origin).href}</loc></url>`,
        )
        .join('')
    : '';
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
