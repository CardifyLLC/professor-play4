import type { Metadata } from 'next'
import StaticPageLayout from '@/components/StaticPageLayout'

export const metadata: Metadata = {
  title: 'Refund & Guarantee Policy | TCGPlaytest',
  description: 'Refund and guarantee policy for TCGPlaytest.',
}

export default function RefundPage() {
  return (
    <StaticPageLayout
      eyebrow="Refund & Guarantee"
      title="Refund & Guarantee Policy"
      intro="We stand behind the quality of every TCGPlaytest order. This policy explains when refunds, reprints, and cancellations are available."
    >
      <div className="space-y-10">
        <section className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
            Last updated: March 14, 2026
          </p>
          <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
            If your cards do not meet expectations because they arrived damaged, defective, or incomplete, we will make it right.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Damaged or Defective Orders</h2>
            <ol className="mt-3 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
              <li>1. Contact support@tcgplaytest.com</li>
              <li>2. Include photos of the issue</li>
              <li>3. Choose a reprint or a full refund</li>
            </ol>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">We Cover</h2>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
              <li>Print defects, smudging, major misalignment, and production color errors.</li>
              <li>Shipping damage such as crushed, bent, or water-damaged packages.</li>
              <li>Missing cards, incomplete orders, or the wrong order being received.</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">What We Don&apos;t Cover</h2>
          <ul className="space-y-2 text-base leading-8 text-slate-600 dark:text-slate-300">
            <li>Slight color variation between your screen and the printed result.</li>
            <li>Design errors in your submitted files, including typos or low-resolution artwork.</li>
            <li>Change-of-mind returns after ordering.</li>
            <li>Orders that were printed correctly as submitted.</li>
          </ul>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Refunds</h2>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
              <li>Refunds go back to the original payment method.</li>
              <li>Processing time depends on your bank or card provider.</li>
              <li>You&apos;ll receive an email confirmation when the refund is issued.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Reprints</h2>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
              <li>Approved reprints are produced and shipped at no additional cost.</li>
              <li>We match the original shipping method when possible.</li>
              <li>You do not need to return the defective order.</li>
            </ul>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Lost Packages</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              If tracking shows delivered but the package is missing, contact us and we&apos;ll work with the carrier. If the
              package is confirmed lost, we&apos;ll reprint or refund the order.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Cancellations</h2>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
              <li>Before production: full refund available.</li>
              <li>During production: we&apos;ll try to cancel, but it may not be possible once printing starts.</li>
              <li>After shipment: see the damaged, defective, and lost package sections above.</li>
            </ul>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Contact Us</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
            <span className="font-semibold text-slate-900 dark:text-white">Email:</span> support@tcgplaytest.com
          </p>
          <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
            <span className="font-semibold text-slate-900 dark:text-white">Response time:</span> Within 24 hours
            (Monday-Friday)
          </p>
        </section>
      </div>
    </StaticPageLayout>
  )
}
