import type { Metadata } from 'next'
import StaticPageLayout from '@/components/StaticPageLayout'

export const metadata: Metadata = {
  title: 'Acceptable Use Policy | TCGPlaytest',
  description: 'Acceptable use policy for TCGPlaytest.',
}

export default function AcceptableUsePage() {
  return (
    <StaticPageLayout
      eyebrow="Acceptable Use Policy"
      title="Acceptable Use Policy"
      intro="This policy outlines what content is and is not permitted when using TCGPlaytest custom card printing services."
    >
      <div className="space-y-10">
        <section className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
            Last updated: March 14, 2026
          </p>
          <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
            TCGPlaytest provides custom card printing services. By using the platform, you agree to comply with this policy.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Permitted Use</h2>
          <ul className="space-y-2 text-base leading-8 text-slate-600 dark:text-slate-300">
            <li>Original artwork and designs you created.</li>
            <li>Content you have licensed or otherwise have permission to reproduce.</li>
            <li>Fan art and parody content where permitted by applicable law.</li>
            <li>Playtest and prototype cards for personal or game development use.</li>
            <li>Educational and reference materials.</li>
          </ul>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Prohibited: IP Violations</h2>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
              <li>Unauthorized reproductions of copyrighted artwork, logos, or proprietary designs.</li>
              <li>Counterfeit products intended to be sold or passed off as official products.</li>
              <li>Trademark-infringing content meant to mislead buyers.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Prohibited: Illegal Content</h2>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
              <li>Content that violates applicable law.</li>
              <li>CSAM or any depiction of minors in sexual situations.</li>
              <li>Content related to illegal drug manufacturing or trafficking.</li>
              <li>Counterfeit currency, identification documents, or government materials.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Prohibited: Harmful Content</h2>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
              <li>Content promoting or inciting violence or terrorism.</li>
              <li>Hate speech targeting protected groups.</li>
              <li>Defamatory, libelous, or fraudulent content.</li>
              <li>Content designed to harass, threaten, or intimidate.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Prohibited: Privacy &amp; Technical Violations</h2>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
              <li>PII of third parties without consent.</li>
              <li>Private photos of individuals without permission.</li>
              <li>Doxxing or exposure of private personal information.</li>
              <li>Malware, viruses, or malicious code.</li>
            </ul>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Your Responsibility</h2>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
              <li>You own or have proper licenses for all submitted content.</li>
              <li>The content does not infringe any third-party rights.</li>
              <li>The content complies with all applicable laws.</li>
              <li>You obtained consent from any identifiable individuals depicted.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Our Enforcement</h2>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
              <li>We may refuse, cancel, or halt production of violating orders.</li>
              <li>We will review reports and remove violating content when appropriate.</li>
              <li>Repeat violators may have their accounts terminated.</li>
            </ul>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Reporting Violations</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              Email support@tcgplaytest.com with the subject line{' '}
              <span className="font-semibold text-slate-900 dark:text-white">Content Policy Violation Report</span> and include
              as much detail as possible.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Consequences</h2>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
              <li>Order cancellation with or without refund at our discretion.</li>
              <li>Account suspension or termination.</li>
              <li>Reporting to appropriate authorities and cooperation with legal proceedings.</li>
            </ul>
          </div>
        </section>
      </div>
    </StaticPageLayout>
  )
}
