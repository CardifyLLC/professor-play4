import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import StaticSiteHeader from '@/components/StaticSiteHeader'
import SiteFooter from '@/components/SiteFooter'

type StaticPageLayoutProps = {
  eyebrow: string
  title: string
  intro: string
  children: React.ReactNode
}

export default function StaticPageLayout({
  eyebrow,
  title,
  intro,
  children,
}: StaticPageLayoutProps) {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <StaticSiteHeader />

      <main>
        <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.14),_transparent_32%),linear-gradient(180deg,_#f8fbff_0%,_#ffffff_58%)] dark:border-slate-800 dark:bg-[radial-gradient(circle_at_top_left,_rgba(96,165,250,0.18),_transparent_28%),linear-gradient(180deg,_#0f172a_0%,_#020617_58%)]">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/70 to-transparent" />
          <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16">
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>

            <div className="max-w-3xl space-y-5">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-600 dark:text-blue-400">
                  {eyebrow}
                </p>
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                  {title}
                </h1>
                <p className="max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
                  {intro}
                </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-10 sm:px-6 sm:py-14">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_70px_-45px_rgba(15,23,42,0.55)] dark:border-slate-800 dark:bg-slate-900 sm:p-10">
            {children}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
