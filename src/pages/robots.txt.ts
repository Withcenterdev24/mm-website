import type { APIRoute } from 'astro';
import { site } from '../config/site';
export const GET: APIRoute = () => {
  const content = site.origin
    ? `User-agent: *\nAllow: /\nSitemap: ${site.origin}/sitemap.xml\n`
    : 'User-agent: *\nDisallow: /\n';
  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
