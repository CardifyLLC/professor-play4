import type { Metadata } from 'next'
import StaticPageLayout from '@/components/StaticPageLayout'

export const metadata: Metadata = {
  title: 'DMCA Policy | TCGPlaytest',
  description: 'DMCA policy for TCGPlaytest.',
}

export default function DmcaPage() {
  return (
    <StaticPageLayout
      eyebrow="DMCA Policy"
      title="DMCA Policy"
      intro="TCGPlaytest responds to valid copyright complaints in accordance with the DMCA and other applicable law, while making clear that customers remain responsible for the content they submit for printing."
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
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Overview</h2>
          <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
            TCGPlaytest respects the intellectual property rights of others. We respond to notices of alleged copyright infringement in accordance with the Digital Millennium Copyright Act (DMCA) and other applicable laws.
          </p>
          <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
            As a custom printing service, we print designs submitted by our customers. We do not create, endorse, or verify the intellectual property status of submitted content.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Filing a DMCA Takedown Notice</h2>
          <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
            If you believe that content printed or hosted by TCGPlaytest infringes your copyright, please send a written notice to our designated DMCA agent with the following information:
          </p>
          <ol className="space-y-3 text-base leading-8 text-slate-600 dark:text-slate-300">
            <li>1. <span className="font-semibold text-slate-900 dark:text-white">Identification of the copyrighted work</span> you claim has been infringed, or a representative list if multiple works are involved.</li>
            <li>2. <span className="font-semibold text-slate-900 dark:text-white">Identification of the material</span> you claim is infringing, with enough detail for us to locate it.</li>
            <li>3. <span className="font-semibold text-slate-900 dark:text-white">Your contact information</span>: name, address, telephone number, and email address.</li>
            <li>4. <span className="font-semibold text-slate-900 dark:text-white">A statement</span> that you have a good faith belief that the use of the material is not authorized by the copyright owner, its agent, or the law.</li>
            <li>5. <span className="font-semibold text-slate-900 dark:text-white">A statement</span> that the information in your notice is accurate and, under penalty of perjury, that you are the copyright owner or authorized to act on the owner&apos;s behalf.</li>
            <li>6. <span className="font-semibold text-slate-900 dark:text-white">Your physical or electronic signature.</span></li>
          </ol>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Designated DMCA Agent</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              <span className="font-semibold text-slate-900 dark:text-white">Email:</span> support@tcgplaytest.com
            </p>
            <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
              <span className="font-semibold text-slate-900 dark:text-white">Subject Line:</span> DMCA Takedown Notice
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Our Response</h2>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
              <li>Acknowledge receipt of the notice</li>
              <li>Review the claim in good faith</li>
              <li>Take appropriate action, including removal or disabling access if warranted</li>
              <li>Notify the customer who submitted the content, if applicable</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Counter-Notification</h2>
          <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
            If you believe your content was removed by mistake or misidentification, you may submit a counter-notification to our DMCA agent including:
          </p>
          <ol className="space-y-3 text-base leading-8 text-slate-600 dark:text-slate-300">
            <li>1. <span className="font-semibold text-slate-900 dark:text-white">Identification of the material</span> that was removed and the location where it appeared before removal.</li>
            <li>2. <span className="font-semibold text-slate-900 dark:text-white">A statement under penalty of perjury</span> that you have a good faith belief the material was removed as a result of mistake or misidentification.</li>
            <li>3. <span className="font-semibold text-slate-900 dark:text-white">Your name, address, and telephone number.</span></li>
            <li>4. <span className="font-semibold text-slate-900 dark:text-white">A statement</span> that you consent to the jurisdiction of the federal court in your district, or in Texas if you are outside the US, and that you will accept service of process from the person who filed the original DMCA notice.</li>
            <li>5. <span className="font-semibold text-slate-900 dark:text-white">Your physical or electronic signature.</span></li>
          </ol>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Repeat Infringers</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              We reserve the right to terminate the accounts of customers who are repeat infringers of intellectual property rights.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Important Notes</h2>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
              <li>TCGPlaytest is a printing service. Customers are responsible for ensuring they have the right to print submitted content.</li>
              <li>We do not proactively monitor or screen customer submissions for possible IP infringement.</li>
              <li>Filing a false DMCA notice may result in legal liability under 17 U.S.C. § 512(f).</li>
            </ul>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Contact Us</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
            For DMCA-related inquiries:
          </p>
          <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
            <span className="font-semibold text-slate-900 dark:text-white">Email:</span> support@tcgplaytest.com
          </p>
          <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
            <span className="font-semibold text-slate-900 dark:text-white">Subject Line:</span> DMCA Inquiry
          </p>
          <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
            <span className="font-semibold text-slate-900 dark:text-white">Website:</span> tcgplaytest.com
          </p>
        </section>
      </div>
    </StaticPageLayout>
  )
}
