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
        eyebrow="Free Student Guide"
        title="Student Confidence Starter Guide"
        description="A practical PDF workbook designed to help teenagers and young adults overcome self-doubt, handle study pressure, and rebuild confidence after setbacks."
      />

      <PageSection
        title="What you will learn in this guide"
        description="Core practical techniques developed across 4,500+ student seminars."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {[
            'Step-by-step mental framework to separate self-worth from exam failure.',
            'Daily study routines and focus techniques to reduce pre-exam panic.',
            'Actionable exercises to communicate goals clearly with parents and mentors.',
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

      <PageSection title="Inside the workbook" description="Everything you need to build steady daily self-discipline.">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <div className="rounded-2xl border border-[var(--line-soft)] bg-white p-7 shadow-editorial">
            <div className="space-y-5 text-sm leading-7 text-[var(--text-soft)]">
              <p className="flex items-center gap-2 font-semibold text-[var(--text-strong)]">
                <DownloadOutlined className="text-[var(--accent-earth)]" />
                Actionable Daily Worksheets
              </p>
              <p>Short, clear exercises students can complete in 10 minutes a day to track habits and focus.</p>
              <p className="flex items-center gap-2 font-semibold text-[var(--text-strong)]">
                <MailOutlined className="text-[var(--accent-earth)]" />
                Follow-Up Guidance Series
              </p>
              <p>Receive ongoing study tips, motivational stories, and seminar insights directly in your inbox.</p>
              <p className="flex items-center gap-2 font-semibold text-[var(--text-strong)]">
                <MessageOutlined className="text-[var(--accent-earth)]" />
                Community & Q&A Access
              </p>
              <p>Get answers to common student challenges during live Q&A sessions and channel updates.</p>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--line-soft)] bg-white p-7 shadow-editorial-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
              Instant Download Form
            </p>
            <h2 className="mt-4 font-playfair text-3xl text-[var(--text-strong)]">
              Get Your Free Copy
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]">
              Enter your details below to receive instant access to the PDF guide.
            </p>
            <div className="mt-6">
              <EmailCaptureForm
                successHref={routePaths.studentGuideThanks}
                successLabel="Access Download Page"
              />
            </div>
          </div>
        </div>
      </PageSection>
    </>
  )
}
