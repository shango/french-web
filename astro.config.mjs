// @ts-check
import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import sitemap from '@astrojs/sitemap'
import clerk from '@clerk/astro'

// Public site origin. Used for sitemap, canonical URLs, and absolute OG image URLs.
// Change this single constant when the final domain is known.
const SITE = 'https://lecahier.courses'

// https://astro.build/config
export default defineConfig({
  site: SITE,
  // Content-first: marketing pages prerender to static HTML. Only routes that opt out
  // (export const prerender = false, e.g. /start) are rendered on-demand at the edge.
  output: 'static',
  // Astro 6 prerenders in Cloudflare's workerd by default; Clerk's middleware pulls
  // Node built-ins (node:fs/path/async_hooks) that workerd lacks at build time. Prerender
  // in Node instead. On-demand routes (/start) still run in workerd (needs nodejs_compat
  // flag at runtime, set in wrangler for deploy).
  adapter: cloudflare({ prerenderEnvironment: 'node' }),
  integrations: [clerk(), sitemap()],
})
