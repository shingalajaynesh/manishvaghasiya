import { DownloadOutlined, MailOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { resourceCards } from '../../content/pages'
import { routePaths } from '../../content/routes'
import { ContentCard } from '../../shared/components/site/ContentCard'
import { EmailCaptureForm } from '../../shared/components/site/EmailCaptureForm'
import { PageHero } from '../../shared/components/site/PageHero'
import { PageSection } from '../../shared/components/site/PageSection'

export function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Free Resources"
        title="Free resources turn traffic into an owned audience."
        description="Each guide is built around a clear audience problem and should lead naturally into follow-up articles, workshops, ebooks, or community touchpoints."
      />

      <PageSection
        title="Resource library"
        description="Every resource should target one clear audience segment and connect to a relevant follow-up sequence."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {resourceCards.map((title) => (
            <div key={title} className="flex flex-col gap-3">
              <ContentCard
                title={title}
                description="Free PDFs are designed to support SEO content, social CTAs, and future digital product funnels without feeling pushy."
                icon={<DownloadOutlined />}
                meta="Free resource"
                tone={title === 'Student Confidence Starter Guide' ? 'forest' : 'warm'}
              />
              {title === 'Student Confidence Starter Guide' ? (
                <Button type="link" icon={<DownloadOutlined />} href={routePaths.studentGuide} className="!self-start !px-1 !text-[var(--accent-earth)]">
                  Open landing page
                </Button>
              ) : null}
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection title="Start the audience funnel" description="A simple email capture layer helps the site begin building an owned audience immediately.">
        <div className="max-w-3xl rounded-2xl border border-[var(--line-soft)] bg-white p-7 shadow-editorial">
          <div className="mb-5 flex items-start gap-3 text-sm leading-7 text-[var(--text-soft)]">
            <div className="mt-1 rounded-full bg-[rgba(174,88,49,0.10)] p-3 text-[var(--accent-earth)]">
              <MailOutlined />
            </div>
            <p>The first subscriber funnel should be live early so future articles and videos already have a clean conversion step.</p>
          </div>
          <EmailCaptureForm />
        </div>
      </PageSection>
    </>
  )
}
