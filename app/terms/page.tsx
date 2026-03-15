import type { Metadata } from 'next'
import StaticPageLayout from '@/components/StaticPageLayout'

export const metadata: Metadata = {
  title: 'Terms of Service | TCGPlaytest',
  description: 'Terms of service for TCGPlaytest.',
}

export default function TermsPage() {
  return (
    <StaticPageLayout
      eyebrow="Terms of Service"
      title="Terms of Service"
      intro="These terms govern access to tcgplaytest.com and the custom card printing services offered by TCGPlaytest, including order handling, customer responsibilities, and the limits that apply to the service."
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
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">1. Acceptance of Terms</h2>
          <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
            By accessing or using tcgplaytest.com and placing an order, you agree to be bound by these Terms of Service. If you do not agree, do not use our services.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">2. Description of Services</h2>
          <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
            TCGPlaytest is a custom card printing service. We print custom-designed cards on premium cored cardstock based on designs provided by customers. We are a <span className="font-semibold text-slate-900 dark:text-white">printing service only</span> and print what you submit.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">3. Orders &amp; Payment</h2>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
              <li>All prices are listed in US dollars.</li>
              <li>Payment is processed securely through Stripe, Inc.</li>
              <li>Orders are confirmed once payment is successfully processed.</li>
              <li>We reserve the right to refuse or cancel any order at our discretion.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">4. Shipping &amp; Delivery</h2>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
              <li>Standard shipping within the United States: 3-5 business days.</li>
              <li>International shipping times vary by destination.</li>
              <li>Shipping costs are calculated at checkout.</li>
              <li>We are not responsible for delays caused by carriers, customs, or events outside our control.</li>
              <li>Risk of loss passes to you upon delivery to the shipping carrier.</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">5. Refunds &amp; Returns</h2>
          <ul className="space-y-2 text-base leading-8 text-slate-600 dark:text-slate-300">
            <li>If your order arrives damaged or defective, contact us within <span className="font-semibold text-slate-900 dark:text-white">14 days</span> of delivery at support@tcgplaytest.com with photos of the issue.</li>
            <li>We will reprint or refund defective orders at our discretion.</li>
            <li>We do not accept returns for orders printed correctly as submitted.</li>
            <li>Refunds are issued to the original payment method within 5-10 business days.</li>
          </ul>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">6. Customer Responsibilities</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              You are solely responsible for the content and accuracy of the designs you submit, ensuring you have the legal right to print that content, and reviewing your order before payment.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">7. Intellectual Property &amp; Content Policy</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              You retain ownership of the designs and images you upload, but by submitting content for printing, you grant us a limited license to reproduce that content solely to fulfill your order.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Prohibited Content</h3>
          <ul className="space-y-2 text-base leading-8 text-slate-600 dark:text-slate-300">
            <li>You may not submit content that infringes on the intellectual property rights of any third party.</li>
            <li>You may not submit content that contains illegal, obscene, or harmful material.</li>
            <li>You may not submit content that violates applicable laws or regulations.</li>
            <li>We reserve the right to refuse to print any content at our sole discretion.</li>
            <li>For copyright takedown procedures, see our separate DMCA Policy.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">8. Disclaimer of Warranties</h2>
          <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
            Our services are provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied.
          </p>
          <ul className="space-y-2 text-base leading-8 text-slate-600 dark:text-slate-300">
            <li>We do not warrant that our services will be uninterrupted or error-free.</li>
            <li>We do not warrant that printed colors will exactly match on-screen colors, because color variation is inherent in printing.</li>
            <li>We do not warrant that cards will be identical to any third-party products.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">9. Limitation of Liability</h2>
          <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
            To the maximum extent permitted by law, TCGPlaytest shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services. Our total liability for any claim shall not exceed the amount you paid for the specific order giving rise to the claim.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">10. Indemnification</h2>
          <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
            You agree to indemnify and hold harmless TCGPlaytest, its owners, employees, and agents from any claims, damages, losses, or expenses, including legal fees, arising from:
          </p>
          <ul className="space-y-2 text-base leading-8 text-slate-600 dark:text-slate-300">
            <li>Your use of our services.</li>
            <li>Content you submit for printing.</li>
            <li>Your violation of these Terms.</li>
          </ul>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">11. Governing Law</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              These Terms are governed by the laws of the State of Texas, without regard to conflict of law principles. Any disputes shall be resolved in the courts located in Texas.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">12. Changes to Terms</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              We may update these Terms from time to time. Continued use of our services after changes constitutes acceptance of the updated Terms.
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">13. Contact Us</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
            <span className="font-semibold text-slate-900 dark:text-white">Email:</span> support@tcgplaytest.com
          </p>
          <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
            <span className="font-semibold text-slate-900 dark:text-white">Website:</span> tcgplaytest.com
          </p>
        </section>
      </div>
    </StaticPageLayout>
  )
}
