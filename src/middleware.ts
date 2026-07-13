import { clerkMiddleware } from '@clerk/astro/server'

// Clerk reads the session and populates Astro.locals.auth() for on-demand routes
// (the /start signup island). Static marketing pages carry no auth state.
export const onRequest = clerkMiddleware()
