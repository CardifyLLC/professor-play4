import Image from 'next/image'
import Link from 'next/link'
import { Globe, LifeBuoy, Scale, ShieldCheck } from 'lucide-react'

function DiscordIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.317 4.369A19.791 19.791 0 0 0 15.885 3c-.191.328-.403.77-.552 1.116a18.27 18.27 0 0 0-5.29 0A11.64 11.64 0 0 0 9.49 3a19.736 19.736 0 0 0-4.433 1.369C2.254 8.553 1.495 12.63 1.875 16.65A19.923 19.923 0 0 0 7.239 19.5c.43-.585.814-1.205 1.145-1.851-.63-.237-1.228-.53-1.794-.873.149-.109.295-.222.436-.339 3.46 1.62 7.217 1.62 10.636 0 .143.117.289.23.436.339-.566.343-1.166.636-1.796.873.332.646.716 1.266 1.146 1.851a19.875 19.875 0 0 0 5.365-2.85c.446-4.66-.762-8.7-3.496-12.281ZM9.955 14.186c-1.037 0-1.89-.949-1.89-2.115 0-1.167.833-2.116 1.89-2.116 1.066 0 1.909.958 1.89 2.116 0 1.166-.833 2.115-1.89 2.115Zm4.09 0c-1.037 0-1.89-.949-1.89-2.115 0-1.167.833-2.116 1.89-2.116 1.066 0 1.909.958 1.89 2.116 0 1.166-.824 2.115-1.89 2.115Z" />
    </svg>
  )
}

function RedditIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M14.02 15.38c.55.39 1.29.59 2.2.59.9 0 1.64-.2 2.2-.59a.75.75 0 0 0-.86-1.23c-.31.22-.77.32-1.34.32-.58 0-1.03-.1-1.35-.32a.75.75 0 0 0-.85 1.23Zm-8.44.59c.9 0 1.64-.2 2.2-.59a.75.75 0 0 0-.85-1.23c-.32.22-.77.32-1.35.32-.57 0-1.03-.1-1.34-.32a.75.75 0 0 0-.86 1.23c.56.39 1.3.59 2.2.59Zm8.07 2.06c-1.26.82-3.07 1.26-5.15 1.26-2.08 0-3.89-.44-5.15-1.26a.75.75 0 1 0-.82 1.25c1.5.98 3.58 1.5 5.97 1.5s4.47-.52 5.97-1.5a.75.75 0 1 0-.82-1.25Z" />
      <path d="M20.93 8.62a3.03 3.03 0 0 0-4.16-.91 10.58 10.58 0 0 0-5.2-1.42l1-3.14 2.7.63a2.3 2.3 0 1 0 .35-1.48l-3.18-.74a.75.75 0 0 0-.9.5L10.3 6.2A10.63 10.63 0 0 0 5 7.7a3.03 3.03 0 1 0-3.6 4.86c-.04.25-.06.5-.06.75 0 3.93 3.2 7.12 7.16 7.12 3.95 0 7.16-3.2 7.16-7.12 0-.24-.02-.48-.05-.72a3.03 3.03 0 0 0 5.32-2.07c0-.72-.25-1.43-.7-1.99ZM17.5 3a.8.8 0 1 1 0 1.61.8.8 0 0 1 0-1.61Zm-13 9.2a1.45 1.45 0 1 1 0-2.9 1.45 1.45 0 0 1 0 2.9Zm8.68-2.36a1.13 1.13 0 1 1 0 2.26 1.13 1.13 0 0 1 0-2.26Zm-5.36 0a1.13 1.13 0 1 1 0 2.26 1.13 1.13 0 0 1 0-2.26Zm11.68 2.36a1.45 1.45 0 1 1 0-2.9 1.45 1.45 0 0 1 0 2.9Z" />
    </svg>
  )
}

const siteLinks = [
  { href: '/?view=how-it-works', label: 'How It Works' },
  { href: '/?view=tutorial', label: 'Tutorial' },
  { href: '/?view=pricing', label: 'Pricing' },
  { href: '/?view=why-us', label: 'Why Us' },
]

const legalLinks = [
  { href: '/privacy', label: 'Privacy Policy', icon: ShieldCheck },
  { href: '/terms', label: 'Terms of Service', icon: Scale },
  { href: '/dmca', label: 'DMCA Policy', icon: ShieldCheck },
  { href: '/support', label: 'Support', icon: LifeBuoy },
]

const communityLinks = [
  { href: 'https://discord.gg/qmNXTWbfHY', label: 'Discord', external: true },
  { href: 'https://www.reddit.com/r/TCGPlaytest/', label: 'Reddit', external: true },
  { href: 'mailto:support@tcgplaytest.com', label: 'support@tcgplaytest.com', external: true },
]

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
      <div className="relative overflow-hidden border-b border-slate-200/80 dark:border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.12),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(34,197,94,0.10),_transparent_28%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.12),_transparent_24%)]" />
        <div className="container relative mx-auto grid gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.35fr_0.8fr_0.8fr_0.95fr]">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <Image
                  src="/card1.png"
                  alt="TCGPlaytest logo"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="relative h-7 w-[180px] sm:w-[210px]">
                <Image
                  src="/card-logo.jpg"
                  alt="TCGPlaytest"
                  fill
                  sizes="210px"
                  className="object-contain object-left"
                />
              </div>
            </div>

            <p className="max-w-md text-sm leading-8 text-slate-600 dark:text-slate-300">
              Professional custom card printing for playtest decks, premium prototypes, and collector-ready runs.
              Upload your designs, print on premium cored cardstock, and ship with a straightforward workflow.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
              <a
                href="https://discord.gg/qmNXTWbfHY"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 transition-colors hover:border-blue-300 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500/60 dark:hover:text-blue-400"
              >
                <DiscordIcon className="h-4 w-4" />
                <span>Discord</span>
              </a>
              <a
                href="https://www.reddit.com/r/TCGPlaytest/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 transition-colors hover:border-orange-300 hover:text-orange-500 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-orange-500/60 dark:hover:text-orange-400"
              >
                <RedditIcon className="h-4 w-4" />
                <span>Reddit</span>
              </a>
            </div>
          </div>

          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-500 dark:text-cyan-400">
              Explore
            </p>
            <div className="space-y-3">
              {siteLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm font-medium text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-fuchsia-500 dark:text-fuchsia-400">
              Community
            </p>
            <div className="space-y-3">
              {communityLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noreferrer' : undefined}
                  className="block text-sm font-medium text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-500 dark:text-violet-400">
              Legal
            </p>
            <div className="space-y-3">
              {legalLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 text-sm font-medium text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                  >
                    <Icon className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                    <span>{link.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex flex-col gap-5 px-4 py-5 text-xs text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between dark:text-slate-400">
        <p className="font-medium tracking-[0.18em] uppercase">
          © 2026 TCGPlaytest. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em]">
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Secured by Stripe
          </span>
          <span className="inline-flex items-center gap-2">
            <Globe className="h-3.5 w-3.5" />
            Worldwide Shipping
          </span>
        </div>
      </div>
    </footer>
  )
}
