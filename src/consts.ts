// Site-wide constants. The product name was under consideration (Aplomb / Foothold /
// Socle); keep WORDMARK trivially swappable and change it in lockstep with the app.
export const WORDMARK = 'Le Cahier'

export const SITE_DESCRIPTION =
  'A French vocabulary primer for English speakers. Learn the ~400 words that carry a conversation, then graduate with a certificate and your word list. Built to be finished, not to keep you subscribed.'

// Primary nav (header). The wordmark links Home; "Start free" renders as the primary button.
export const NAV_LINKS = [
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Pricing & FAQ', href: '/pricing' },
] as const

// Footer links. Includes the legal routes required for a SaaS + App Store listing.
export const FOOTER_LINKS = [
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Pricing & FAQ', href: '/pricing' },
  { label: 'Start free', href: '/start' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
] as const

export const START_HREF = '/start'
