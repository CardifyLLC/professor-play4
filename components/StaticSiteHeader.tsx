'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Moon, Sun, X, Menu, Zap } from 'lucide-react'
import { useApp } from '@/contexts/AppContext'

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

const navItems = [
  { href: '/?view=how-it-works', label: 'How it Works' },
  { href: '/?view=tutorial', label: 'Tutorial' },
  { href: '/?view=pricing', label: 'Pricing' },
  { href: '/?view=why-us', label: 'Why Us' },
]

export default function StaticSiteHeader() {
  const discordInviteUrl = 'https://discord.gg/qmNXTWbfHY'
  const redditUrl = 'https://www.reddit.com/r/TCGPlaytest/'
  const { isDarkMode, toggleTheme, isProMode, toggleProMode } = useApp()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm z-40 transition-colors duration-300">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-2 sm:gap-3 touch-manipulation min-w-0"
          aria-label="Go to homepage"
        >
          <div className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shrink-0">
            <Image
              src="/card1.png"
              alt="TCGPlaytest logo"
              fill
              sizes="40px"
              className="object-cover"
              priority
            />
          </div>

          <div className="relative h-6 sm:h-7 md:h-8 lg:h-9 w-[130px] sm:w-[170px] md:w-[230px] lg:w-[280px] max-w-[55vw] md:max-w-none">
            <Image
              src="/card-logo.jpg"
              alt="TCGPlaytest"
              fill
              sizes="(max-width: 640px) 130px, (max-width: 768px) 170px, (max-width: 1024px) 230px, 280px"
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-8 font-medium text-sm text-slate-600 dark:text-slate-300">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors touch-manipulation"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={discordInviteUrl}
            target="_blank"
            rel="noreferrer"
            className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors touch-manipulation"
            aria-label="Join Discord"
            title="Join Discord"
          >
            <DiscordIcon className="w-5 h-5" />
          </a>
          <a
            href={redditUrl}
            target="_blank"
            rel="noreferrer"
            className="text-slate-600 hover:text-orange-500 dark:text-slate-300 dark:hover:text-orange-400 transition-colors touch-manipulation"
            aria-label="Visit Reddit"
            title="Visit Reddit"
          >
            <RedditIcon className="w-5 h-5" />
          </a>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={toggleProMode}
            className={`p-2 rounded-full transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center ${isProMode
                ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
            title={isProMode ? 'Pro Mode Active (Reduced Animations)' : 'Enable Pro Mode (For Large Decks)'}
            aria-label="Toggle Pro Mode"
          >
            <Zap className={`w-5 h-5 ${isProMode ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 active:bg-slate-200 dark:active:bg-slate-700 transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
            title="Toggle Dark Mode"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          <Link
            href="/?view=design"
            className="hidden md:block bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-5 py-2.5 rounded-md font-semibold text-sm transition-colors shadow-sm touch-manipulation min-h-[44px] whitespace-nowrap"
          >
            Start Your Design
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 active:bg-slate-200 dark:active:bg-slate-700 transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4 py-3 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-left px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors touch-manipulation font-medium"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/?view=design"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-left px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white transition-colors touch-manipulation font-semibold"
            >
              Start Your Design
            </Link>
            <a
              href={discordInviteUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors touch-manipulation font-medium"
            >
              <DiscordIcon className="w-5 h-5" />
              <span>Join Discord</span>
            </a>
            <a
              href={redditUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors touch-manipulation font-medium"
            >
              <RedditIcon className="w-5 h-5" />
              <span>Visit Reddit</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
