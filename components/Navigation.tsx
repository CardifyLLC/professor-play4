'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Moon, Sun, X, Menu, Zap } from 'lucide-react'
import { useApp } from '@/contexts/AppContext'

interface NavigationProps {
  currentView: string
  showDesignStepper: boolean
  onStartDesign: () => void
  onShowLanding: () => void
  onShowHowItWorks: () => void
  onShowTutorial: () => void
  onShowPricing: () => void
  onShowWhyUs: () => void
}

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

export default function Navigation({
  currentView,
  showDesignStepper,
  onStartDesign,
  onShowLanding,
  onShowHowItWorks,
  onShowTutorial,
  onShowPricing,
  onShowWhyUs,
}: NavigationProps) {
  const discordInviteUrl = 'https://discord.gg/qmNXTWbfHY'
  const { isDarkMode, toggleTheme, isProMode, toggleProMode } = useApp()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const handleMobileNavClick = (action: () => void) => {
    action()
    closeMobileMenu()
  }

  return (
    <nav className="border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm z-40 transition-colors duration-300">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex justify-between items-center">
        <div
          className="flex items-center gap-2 sm:gap-3 cursor-pointer touch-manipulation min-w-0"
          onClick={onShowLanding}
          aria-label="Go to homepage"
        >
          {/* Icon mark */}
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

          {/* Wordmark (larger on desktop, compact on mobile) */}
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
        </div>

        {/* Desktop Navigation */}
        <div className={`hidden md:flex items-center space-x-8 font-medium text-sm text-slate-600 dark:text-slate-300 ${showDesignStepper ? 'hidden' : ''}`}>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onShowHowItWorks(); }}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors touch-manipulation"
          >
            How it Works
          </a>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onShowTutorial(); }}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors touch-manipulation"
          >
            Tutorial
          </a>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onShowPricing(); }}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors touch-manipulation"
          >
            Pricing
          </a>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onShowWhyUs(); }}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors touch-manipulation"
          >
            Why Us
          </a>
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
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={toggleProMode}
            className={`p-2 rounded-full transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center ${isProMode
                ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
            title={isProMode ? "Pro Mode Active (Reduced Animations)" : "Enable Pro Mode (For Large Decks)"}
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

          {showDesignStepper && (
            <button
              onClick={onShowLanding}
              className="flex text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 active:text-red-700 dark:active:text-red-500 text-xs sm:text-sm font-medium items-center gap-1 px-2 py-1.5 rounded touch-manipulation min-h-[44px]"
            >
              <X className="w-4 h-4" /> <span className="hidden xs:inline">Exit</span>
            </button>
          )}

          {!showDesignStepper && (
            <>
              {/* Desktop Start Button */}
              <button
                onClick={onStartDesign}
                className="hidden md:block bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-5 py-2.5 rounded-md font-semibold text-sm transition-colors shadow-sm touch-manipulation min-h-[44px] whitespace-nowrap"
              >
                Start Your Design
              </button>

              {/* Mobile Hamburger Menu */}
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
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && !showDesignStepper && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4 py-3 space-y-2">
            <button
              onClick={() => handleMobileNavClick(onShowHowItWorks)}
              className="w-full text-left px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors touch-manipulation font-medium"
            >
              How it Works
            </button>
            <button
              onClick={() => handleMobileNavClick(onShowTutorial)}
              className="w-full text-left px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors touch-manipulation font-medium"
            >
              Tutorial
            </button>
            <button
              onClick={() => handleMobileNavClick(onShowPricing)}
              className="w-full text-left px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors touch-manipulation font-medium"
            >
              Pricing
            </button>
            <button
              onClick={() => handleMobileNavClick(onShowWhyUs)}
              className="w-full text-left px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors touch-manipulation font-medium"
            >
              Why Us
            </button>
            <button
              onClick={() => handleMobileNavClick(onStartDesign)}
              className="w-full text-left px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white transition-colors touch-manipulation font-semibold"
            >
              Start Your Design
            </button>
            <a
              href={discordInviteUrl}
              target="_blank"
              rel="noreferrer"
              onClick={closeMobileMenu}
              className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors touch-manipulation font-medium"
            >
              <DiscordIcon className="w-5 h-5" />
              <span>Join Discord</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
