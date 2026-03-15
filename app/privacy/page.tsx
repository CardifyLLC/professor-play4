import type { Metadata } from 'next'
import StaticPageLayout from '@/components/StaticPageLayout'

export const metadata: Metadata = {
  title: 'Privacy Policy | TCGPlaytest',
  description: 'Privacy policy for TCGPlaytest.',
}

export default function PrivacyPage() {
  return (
    <StaticPageLayout
      eyebrow="Privacy Policy"
      title="Privacy Policy"
      intro="This policy explains what information TCGPlaytest collects, how it is used, the third-party services involved in order processing and analytics, and the privacy rights available to customers."
    >
      <div className="space-y-10">
        <section className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
            Last updated: March 13, 2026
          </p>
          <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
            <span className="font-semibold text-slate-900 dark:text-white">TCGPlaytest</span> operates{' '}
            <span className="font-semibold text-slate-900 dark:text-white">tcgplaytest.com</span>.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">1. Information We Collect</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Information You Provide</h3>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                <li><span className="font-semibold text-slate-900 dark:text-white">Account &amp; Order Information:</span> Name, email address, shipping address, and billing address when you place an order.</li>
                <li><span className="font-semibold text-slate-900 dark:text-white">Payment Information:</span> Credit and debit card details are processed directly by Stripe, Inc. We do not store, access, or retain your full card number.</li>
                <li><span className="font-semibold text-slate-900 dark:text-white">Communications:</span> Emails or messages you send to our support team.</li>
                <li><span className="font-semibold text-slate-900 dark:text-white">Card Designs:</span> Images and design files you upload for printing.</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Information Collected Automatically</h3>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                <li><span className="font-semibold text-slate-900 dark:text-white">Usage Data:</span> Pages visited, time spent on site, browser type, device type, and referring URL.</li>
                <li><span className="font-semibold text-slate-900 dark:text-white">Cookies:</span> Essential cookies for site functionality and analytics cookies to understand how visitors use our site.</li>
                <li><span className="font-semibold text-slate-900 dark:text-white">IP Address:</span> Collected for fraud prevention and approximate geolocation.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">2. How We Use Your Information</h2>
          <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
            We use the information we collect to:
          </p>
          <ul className="space-y-2 text-base leading-8 text-slate-600 dark:text-slate-300">
            <li>Process and fulfill your orders.</li>
            <li>Send order confirmations, shipping notifications, and receipts.</li>
            <li>Respond to customer support inquiries.</li>
            <li>Improve our website and services.</li>
            <li>Prevent fraud and unauthorized transactions.</li>
            <li>Comply with legal obligations.</li>
          </ul>
          <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
            We do <span className="font-semibold text-slate-900 dark:text-white">not</span> sell, rent, or share your personal information with third parties for their marketing purposes.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">3. Third-Party Services</h2>
          <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800">
            <table className="min-w-full divide-y divide-slate-200 text-left dark:divide-slate-800">
              <thead className="bg-slate-50 dark:bg-slate-950">
                <tr>
                  <th className="px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white">Service</th>
                  <th className="px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white">Purpose</th>
                  <th className="px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white">Privacy Policy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-900">
                <tr>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">Stripe</td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">Payment processing</td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">stripe.com/privacy</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">Google Analytics</td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">Website analytics</td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">policies.google.com/privacy</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">Vercel</td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">Website hosting</td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">vercel.com/legal/privacy-policy</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">4. Data Retention</h2>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
              <li><span className="font-semibold text-slate-900 dark:text-white">Order data</span> is retained as long as necessary to fulfill your order and satisfy accounting and legal obligations, typically 7 years for tax purposes.</li>
              <li><span className="font-semibold text-slate-900 dark:text-white">Card designs</span> are retained only as long as needed to complete your order, then deleted.</li>
              <li><span className="font-semibold text-slate-900 dark:text-white">Account information</span> is retained until you request deletion.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">5. Your Rights</h2>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
              <li><span className="font-semibold text-slate-900 dark:text-white">Access</span> the personal information we hold about you.</li>
              <li><span className="font-semibold text-slate-900 dark:text-white">Correct</span> inaccurate personal information.</li>
              <li><span className="font-semibold text-slate-900 dark:text-white">Delete</span> your personal information, subject to legal retention requirements.</li>
              <li><span className="font-semibold text-slate-900 dark:text-white">Opt out</span> of marketing communications at any time.</li>
            </ul>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              To exercise these rights, contact us at <span className="font-semibold text-slate-900 dark:text-white">support@tcgplaytest.com</span>.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">6. Data Security</h2>
          <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
            We implement reasonable security measures to protect your personal information, including:
          </p>
          <ul className="space-y-2 text-base leading-8 text-slate-600 dark:text-slate-300">
            <li>HTTPS encryption on all pages.</li>
            <li>Payment processing handled entirely by Stripe, which is PCI DSS Level 1 compliant.</li>
            <li>Access controls on internal systems.</li>
          </ul>
          <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
            No method of transmission over the Internet is 100% secure. While we strive to protect your information, we cannot guarantee its absolute security.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">7. Children&apos;s Privacy</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              Our services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children under 13. If we learn that we have collected such information, we will delete it promptly.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">8. California Residents (CCPA)</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              If you are a California resident, you have additional rights under the California Consumer Privacy Act, including the right to know what personal information we collect, the right to delete your information, and the right to opt out of the sale of your information. We do not sell personal information.
            </p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">9. Changes to This Policy</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the last updated date.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">10. Contact Us</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              If you have questions about this Privacy Policy, contact us at:
            </p>
            <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
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
