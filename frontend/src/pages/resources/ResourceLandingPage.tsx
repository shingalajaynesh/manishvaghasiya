import { CheckCircleOutlined, DownloadOutlined, MailOutlined, MessageOutlined } from '@ant-design/icons'
import { routePaths } from '../../content/routes'
import { EmailCaptureForm } from '../../shared/components/site/EmailCaptureForm'
import { PageHero } from '../../shared/components/site/PageHero'
import { PageSection } from '../../shared/components/site/PageSection'
import { SeoHead } from '../../shared/components/site/SeoHead'

export function ResourceLandingPage() {
  return (
    <>
      <SeoHead
        title="Student Confidence Starter Guide (Free PDF Download) | Manish Vaghasiya"
        description="Free downloadable guide for students by Manish Vaghasiya. Build confidence, handle exam stress, and overcome failure with practical strategies."
        canonicalUrl="https://www.manishvaghasiya.com/resources/student-confidence-starter-guide"
      />
      <PageHero
        eyebrow="Lead Magnet"
        title="Student Confidence Starter Guide"
        description="This free guide is the first live growth asset for the platform, designed to help students after failure, stress, confusion, or low confidence."
      />

      <PageSection
        title="Why this resource comes first"
        description="A student-focused guide fits both current audience demand and the future path toward seminars, ebooks, and stronger lead nurturing."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {[
            'Aligned with student pain points like failure, confidence, and direction.',
            'Easy to promote from Instagram reels and YouTube shorts.',
            'A natural bridge into future ebook and workshop offers.',
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-[var(--line-soft)] bg-white p-6 shadow-editorial">
              <div className="inline-flex rounded-xl bg-[rgba(34,95,83,0.12)] p-3 text-[var(--accent-forest)]">
                <CheckCircleOutlined className="text-lg" />
              </div>
              <p className="mt-4 text-sm leading-7 text-[var(--text-soft)]">{item}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection title="What the funnel should include" description="This page is the start of a complete lead-capture system, not just a form.">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <div className="rounded-2xl border border-[var(--line-soft)] bg-white p-7 shadow-editorial">
            <div className="space-y-5 text-sm leading-7 text-[var(--text-soft)]">
              <p className="flex items-center gap-2 font-semibold text-[var(--text-strong)]">
                <DownloadOutlined className="text-[var(--accent-earth)]" />
                PDF promise
              </p>
              <p>Short, practical guidance students can use immediately after stress, failure, low confidence, or direction confusion.</p>
              <p className="flex items-center gap-2 font-semibold text-[var(--text-strong)]">
                <MailOutlined className="text-[var(--accent-earth)]" />
                Follow-up sequence
              </p>
              <p>Email follow-up should send useful support first, then gradually introduce seminars, guidance offers, and future digital products.</p>
              <p className="flex items-center gap-2 font-semibold text-[var(--text-strong)]">
                <MessageOutlined className="text-[var(--accent-earth)]" />
                WhatsApp or community step
              </p>
              <p>After the download, readers can be invited into a higher-retention channel like WhatsApp or a structured newsletter sequence.</p>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--line-soft)] bg-white p-7 shadow-editorial-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
              Early capture form
            </p>
            <h2 className="mt-4 font-playfair text-3xl text-[var(--text-strong)]">
              Get the guide
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]">
              Enter your details to receive the first student-focused guide and continue into the thank-you flow.
            </p>
            <div className="mt-6">
              <EmailCaptureForm
                successHref={routePaths.studentGuideThanks}
                successLabel="Go to thank-you page"
              />
            </div>
          </div>
        </div>
      </PageSection>
    </>
  )
}
