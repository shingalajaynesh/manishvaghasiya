import { ArrowRightOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { topicHubs } from '../../content/editorial'
import { routePaths } from '../../content/routes'
import { ContentCard } from '../../shared/components/site/ContentCard'
import { PageHero } from '../../shared/components/site/PageHero'
import { PageSection } from '../../shared/components/site/PageSection'

export function TopicsPage() {
  const navigate = useNavigate()
  return (
    <>
      <PageHero
        eyebrow="Topic Hubs"
        title="Organize content around real audience pain points."
        description="Topic hubs help readers find the right guidance quickly while giving the site a stronger editorial and SEO structure."
      />

      <PageSection
        title="Priority hubs"
        description="These are the first topic areas that align best with Manish Vaghasiya's current public themes and the strongest Phase 1 growth opportunities."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {topicHubs.map((topic) => (
            <div key={topic.title} className="flex flex-col gap-3">
              <ContentCard
                title={topic.title}
                description={topic.description}
                meta={`${topic.supportingArticleSlugs.length + 1} articles`}
                tone={topic.slug === 'students-and-career-guidance' ? 'forest' : 'warm'}
              />
              <Button type="link" icon={<ArrowRightOutlined />} onClick={() => navigate(`${routePaths.topics}/${topic.slug}`)} className="!self-start !px-1 !text-[var(--accent-earth)]">
                Open topic hub
              </Button>
            </div>
          ))}
        </div>
      </PageSection>
    </>
  )
}
