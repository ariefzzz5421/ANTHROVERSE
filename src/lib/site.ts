export function siteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return configured.replace(/\/$/, "");
  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (production) return `https://${production}`;
  const deployment = process.env.VERCEL_URL;
  if (deployment) return `https://${deployment}`;
  return "http://localhost:3000";
}
