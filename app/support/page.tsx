import type { Metadata } from 'next'
import StaticPageLayout from '@/components/StaticPageLayout'

export const metadata: Metadata = {
  title: 'Support | TCGPlaytest',
  description: 'Support page for TCGPlaytest.',
}

export default function SupportPage() {
  return (
    <StaticPageLayout
      eyebrow="Support"
      title="Support"
      intro="Support, shipping, product, payment, and content-policy guidance for customers using TCGPlaytest, including the main contact channel and expected response window."
    >
      <div className="space-y-10">
        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
              How to reach us
            </p>
            <h2 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">support@tcgplaytest.com</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              <span className="font-semibold text-slate-900 dark:text-white">Response time:</span> Within 24 hours
              (Monday-Friday)
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
              Need a direct answer?
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              If you still need help after reviewing the FAQs below, email us and we&apos;ll follow up within 24 hours.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
        </section>

        <section className="space-y-5">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Orders &amp; Shipping</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white">How long does shipping take?</h4>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                Standard US shipping is 3-5 business days from when your order is printed. International shipping times vary by destination.
              </p>
            </article>
            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Can I track my order?</h4>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                Yes. Once your order ships, you&apos;ll receive a shipping confirmation email with tracking information.
              </p>
            </article>
            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Do you ship internationally?</h4>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                Yes, we ship worldwide. International orders may be subject to customs duties and taxes, which are the responsibility of the buyer.
              </p>
            </article>
            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Is there a minimum order size?</h4>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                No minimum. You can order as few as one card.
              </p>
            </article>
          </div>
        </section>

        <section className="space-y-5">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Products &amp; Quality</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white">What cardstock do you use?</h4>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                We print on premium cored cardstock, which provides an authentic card feel and durability.
              </p>
            </article>
            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Will the colors match what I see on screen?</h4>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                We do our best to match on-screen colors, but slight variations can occur due to differences between screen displays and the printing process. This is normal and inherent to all printing.
              </p>
            </article>
            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950 md:col-span-2">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Can I get a sample before ordering?</h4>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                Your first card is free. Just place an order for a single card to test our quality.
              </p>
            </article>
          </div>
        </section>

        <section className="space-y-5">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Payments &amp; Refunds</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white">What payment methods do you accept?</h4>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                We accept all major credit and debit cards, Apple Pay, Google Pay, Cash App Pay, Amazon Pay, and Link.
              </p>
            </article>
            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white">My order arrived damaged. What do I do?</h4>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                Contact us at support@tcgplaytest.com within 14 days of delivery with photos of the damage. We&apos;ll reprint or refund your order.
              </p>
            </article>
            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950 md:col-span-2">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Can I cancel my order?</h4>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                If your order hasn&apos;t entered production, we can cancel and refund it. Contact us as soon as possible at support@tcgplaytest.com.
              </p>
            </article>
          </div>
        </section>

        <section className="space-y-5">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Design &amp; Content</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white">What file formats do you accept?</h4>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                Our browser-based design tool handles everything. Just upload your images and design directly on our site.
              </p>
            </article>
            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Are there content restrictions?</h4>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                Yes. You must have the legal right to print the content you submit. See our Terms of Service and DMCA Policy for details.
              </p>
            </article>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Still Need Help?</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
            Email us at <span className="font-semibold text-slate-900 dark:text-white">support@tcgplaytest.com</span> and we&apos;ll get back to you within 24 hours.
          </p>
        </section>
      </div>
    </StaticPageLayout>
  )
}
