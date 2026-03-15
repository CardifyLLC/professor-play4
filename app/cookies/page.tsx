import type { Metadata } from 'next'
import StaticPageLayout from '@/components/StaticPageLayout'

export const metadata: Metadata = {
  title: 'Cookie Policy | TCGPlaytest',
  description: 'Cookie policy for TCGPlaytest.',
}

const thirdPartyCookies = [
  { service: 'Stripe', purpose: 'Payment processing' },
  { service: 'Google Analytics', purpose: 'Website analytics' },
  { service: 'Google Ads', purpose: 'Advertising conversion tracking' },
  { service: 'Meta Pixel', purpose: 'Advertising conversion tracking' },
  { service: 'Vercel', purpose: 'Website hosting' },
]

export default function CookiePolicyPage() {
  return (
    <StaticPageLayout
      eyebrow="Cookie Policy"
      title="Cookie Policy"
      intro="This Cookie Policy explains what cookies TCGPlaytest uses, why they are used, and how you can manage them when visiting tcgplaytest.com."
    >
      <div className="space-y-10">
        <section className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
            Last updated: March 14, 2026
          </p>
          <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
            <span className="font-semibold text-slate-900 dark:text-white">TCGPlaytest</span> operates{' '}
            <span className="font-semibold text-slate-900 dark:text-white">tcgplaytest.com</span>.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">What Are Cookies?</h2>
          <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
            Cookies are small text files stored on your device when you visit a website. They help the site function properly,
            remember your preferences, and understand how visitors use the site.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Essential Cookies</h2>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
              <li>Session cookies keep you logged in while browsing and maintain your cart and design state.</li>
              <li>Security cookies protect against cross-site request forgery and similar threats.</li>
              <li>Stripe cookies are required for secure payment processing.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Analytics Cookies</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              Google Analytics helps us understand page views, session duration, and traffic sources so we can improve the
              site. You can opt out at tools.google.com/dlpage/gaoptout.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Functional Cookies</h2>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
              <li>Design preferences remember card editor settings.</li>
              <li>Language and region preferences remember shipping country selection.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Marketing Cookies</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              When advertising campaigns are active, Google Ads and Meta Pixel may be used to measure ad performance and
              conversions.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Third-Party Cookies</h2>
          <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800">
            <table className="min-w-full divide-y divide-slate-200 text-left dark:divide-slate-800">
              <thead className="bg-slate-50 dark:bg-slate-950">
                <tr>
                  <th className="px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white">Service</th>
                  <th className="px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-900">
                {thirdPartyCookies.map((row) => (
                  <tr key={row.service}>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{row.service}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{row.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Managing Cookies</h2>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
              <li>Chrome: Settings → Privacy and Security → Cookies</li>
              <li>Firefox: Settings → Privacy &amp; Security → Cookies</li>
              <li>Safari: Preferences → Privacy → Cookies</li>
              <li>Edge: Settings → Cookies and Site Permissions</li>
            </ul>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              Disabling essential cookies may prevent the card design tool and checkout flow from functioning correctly.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Do Not Track</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              We respect Do Not Track browser signals. When DNT is enabled, non-essential analytics and marketing cookies stay
              disabled.
            </p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Updates</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              We may update this Cookie Policy from time to time. Changes will be posted on this page with an updated date.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Contact Us</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              <span className="font-semibold text-slate-900 dark:text-white">Email:</span> support@tcgplaytest.com
            </p>
            <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
              <span className="font-semibold text-slate-900 dark:text-white">Website:</span> tcgplaytest.com
            </p>
          </div>
        </section>
      </div>
    </StaticPageLayout>
  )
}
