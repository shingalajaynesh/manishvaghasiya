import { DownloadOutlined, MailOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { resourceCards } from '../../content/pages'
import { routePaths } from '../../content/routes'
import { ContentCard } from '../../shared/components/site/ContentCard'
import { EmailCaptureForm } from '../../shared/components/site/EmailCaptureForm'
import { PageHero } from '../../shared/components/site/PageHero'
import { PageSection } from '../../shared/components/site/PageSection'
import { SeoHead } from '../../shared/components/site/SeoHead'

export function ResourcesPage() {
  const navigate = useNavigate()

  return (
    <>
      <SeoHead
        title="Free Educational Resources & PDF Guides | Manish Vaghasiya"
        description="Download free PDF workbooks and practical guides for students, parents, and family communication from Manish Vaghasiya."
        canonicalUrl="https://www.manishvaghasiya.com/resources"
      />
      <PageHero
        eyebrow="Free Educational Resources"
        title="Practical PDF guides for students, parents, and families."
        description="Explore downloadable workbooks designed to support student confidence, improve parenting communication, and foster strong family relationships."
      />

      <PageSection
        title="Downloadable resource library"
        description="Select a guide below to access practical strategies and action steps."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {resourceCards.map((title) => (
            <div key={title} className="flex flex-col gap-3">
              <ContentCard
                title={title}
                description="Designed to offer step-by-step guidance, reflective exercises, and actionable tips you can use immediately at home or in school."
                icon={<DownloadOutlined />}
                meta="Free Guide"
                tone={title === 'Student Confidence Starter Guide' ? 'forest' : 'warm'}
              />
              {title === 'Student Confidence Starter Guide' ? (
                <Button
                  type="link"
                  icon={<DownloadOutlined />}
                  onClick={() => navigate(routePaths.studentGuide)}
                  className="!self-start !px-1 !text-[var(--accent-earth)]"
                >
                  View Guide & Download
                </Button>
              ) : null}
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection
        title="Receive new resources in your inbox"
        description="Subscribe to receive future educational workbooks, guidance articles, and seminar announcements."
      >
        <div className="max-w-3xl rounded-2xl border border-[var(--line-soft)] bg-white p-7 shadow-editorial">
          <div className="mb-5 flex items-start gap-3 text-sm leading-7 text-[var(--text-soft)]">
            <div className="mt-1 rounded-full bg-[rgba(174,88,49,0.10)] p-3 text-[var(--accent-earth)]">
              <MailOutlined />
            </div>
            <p>Enter your email address to receive direct access to our latest educational releases and practical life lessons.</p>
          </div>
          <EmailCaptureForm />
        </div>
      </PageSection>
    </>
  )
}
