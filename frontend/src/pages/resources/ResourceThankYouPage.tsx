import { ArrowRightOutlined, CheckCircleOutlined, DownloadOutlined, MailOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { routePaths } from '../../content/routes'
import { PageHero } from '../../shared/components/site/PageHero'
import { PageSection } from '../../shared/components/site/PageSection'
import { SeoHead } from '../../shared/components/site/SeoHead'

const steps = [
  {
    title: 'Check Your Email',
    description: 'We have sent a direct link to your requested PDF guide right to your inbox.',
    icon: <MailOutlined />,
  },
  {
    title: 'Read a Recommended Article',
    description: 'Explore our latest student confidence and study stress guidance articles.',
    icon: <CheckCircleOutlined />,
  },
  {
    title: 'Explore Live Seminars',
    description: 'Discover upcoming student confidence keynotes and parenting workshops in Gujarat.',
    icon: <DownloadOutlined />,
  },
]

export function ResourceThankYouPage() {
  const navigate = useNavigate()

  return (
    <>
      <SeoHead
        title="Thank You — Student Guide Download | Manish Vaghasiya"
        description="Thank you for requesting the Student Confidence Starter Guide. Your download link is on its way."
        canonicalUrl="https://www.manishvaghasiya.com/resources/student-confidence-starter-guide/thank-you"
        noIndex={true}
      />
      <PageHero
        eyebrow="Registration Complete"
        title="Thank you for downloading the guide!"
        description="Your Student Confidence Starter Guide link has been dispatched to your email address."
      />

      <PageSection
        title="What to do next"
        description="Follow these recommended steps while your guide arrives."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((card) => (
            <div key={card.title} className="rounded-2xl border border-[var(--line-soft)] bg-white p-6 shadow-editorial">
              <div className="inline-flex rounded-xl bg-[rgba(174,88,49,0.1)] p-3 text-[var(--accent-earth)]">
                {card.icon}
              </div>
              <h2 className="mt-4 font-playfair text-2xl text-[var(--text-strong)]">{card.title}</h2>
              <p className="mt-2 text-sm leading-7 text-[var(--text-soft)]">{card.description}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection title="Recommended next reading">
        <div className="flex flex-wrap gap-4">
          <Button type="primary" icon={<ArrowRightOutlined />} onClick={() => navigate('/blog/how-students-can-build-confidence-after-failure')}>
            Read: Building Confidence After Failure
          </Button>
          <Button onClick={() => navigate(routePaths.contact)} style={{ borderColor: 'var(--line-strong)' }}>
            Contact for Seminars & Workshops
          </Button>

        </div>
      </PageSection>
    </>
  )
}
