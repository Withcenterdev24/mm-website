function originUrl(raw: string | undefined): string | undefined {
  if (!raw?.trim()) return undefined;
  const url = new URL(raw.trim());
  if (
    url.protocol !== 'https:' ||
    url.username ||
    url.password ||
    url.pathname !== '/' ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      'SITE_URL must be an HTTPS origin with no path, credentials, query, or fragment.',
    );
  }
  return url.origin;
}
function storeUrl(raw: string | undefined, host: string): string | undefined {
  if (!raw?.trim()) return undefined;
  const url = new URL(raw.trim());
  if (
    url.protocol !== 'https:' ||
    url.hostname !== host ||
    url.username ||
    url.password
  ) {
    throw new Error(`Store URL must be an HTTPS listing on ${host}.`);
  }
  return url.href;
}
const productionHost = import.meta.env.VERCEL_PROJECT_PRODUCTION_URL;
export const site = {
  name: 'Magnet Mayhem',
  publisher: 'Withcenter',
  email: 'thruthesky@gmail.com',
  androidUrl: storeUrl(import.meta.env.PUBLIC_ANDROID_URL, 'play.google.com'),
  iosUrl: storeUrl(import.meta.env.PUBLIC_IOS_URL, 'apps.apple.com'),
  // Vercel's production domain remains stable even during preview builds.
  origin: originUrl(
    import.meta.env.SITE_URL ||
      (productionHost ? `https://${productionHost}` : undefined),
  ),
};
