import { Typography } from 'antd'
import { PageHero } from '../../shared/components/site/PageHero'
import { PageSection } from '../../shared/components/site/PageSection'

const { Title } = Typography

interface LegalPageProps {
  eyebrow: string
  title: string
  description: string
  sections: Array<{
    heading: string
    body: string
  }>
}

export function LegalPage({ eyebrow, title, description, sections }: LegalPageProps) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} />

      <PageSection
        title="Policy details"
        description="These sections explain how the platform handles privacy, content standards, disclosures, and responsible user communication."
      >
        <div className="grid gap-5">
          {sections.map((section) => (
            <div
              key={section.heading}
              className="rounded-2xl border border-[var(--line-soft)] bg-white p-6 shadow-editorial"
            >
              <Title level={3} className="font-playfair !text-2xl !text-[var(--text-strong)]">
                {section.heading}
              </Title>
              <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]">{section.body}</p>
            </div>
          ))}
        </div>
      </PageSection>
    </>
  )
}
