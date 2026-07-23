import { ArrowRightOutlined, CheckCircleOutlined, DownloadOutlined, MailOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { routePaths } from '../../content/routes'
import { PageHero } from '../../shared/components/site/PageHero'
import { PageSection } from '../../shared/components/site/PageSection'

const steps = [
  {
    title: 'Check your email',
    description: 'The download link and first follow-up message should arrive immediately.',
    icon: <MailOutlined />,
  },
  {
    title: 'Read a related article',
    description: 'Send users into a relevant article so the site becomes more useful and memorable.',
    icon: <CheckCircleOutlined />,
  },
  {
    title: 'Join the next layer later',
    description: 'Once trust grows, users can be invited to ebook, program, or community offers.',
    icon: <DownloadOutlined />,
  },
]

export function ResourceThankYouPage() {
  const navigate = useNavigate()
  return (
    <>
      <PageHero
        eyebrow="Thank You"
        title="Your next step should feel helpful, not pushy."
        description="This thank-you page is part of the funnel strategy. After a download, the site should guide users into the right next action while trust is still high."
      />

      <PageSection
        title="What happens after signup"
        description="The student guide funnel should continue with value-first communication and a clean next-step path."
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

      <PageSection title="Recommended next actions">
        <div className="flex flex-wrap gap-4">
          <Button type="primary" icon={<ArrowRightOutlined />} onClick={() => navigate('/blog/how-students-can-build-confidence-after-failure')}>
            Read the related article
          </Button>
          <Button onClick={() => navigate(routePaths.book)} style={{ borderColor: 'var(--line-strong)' }}>
            Explore seminar options
          </Button>
        </div>
      </PageSection>
    </>
  )
}
