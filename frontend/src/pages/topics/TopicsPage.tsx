import { ArrowRightOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { topicHubs } from '../../content/editorial'
import { routePaths } from '../../content/routes'
import { ContentCard } from '../../shared/components/site/ContentCard'
import { PageHero } from '../../shared/components/site/PageHero'
import { PageSection } from '../../shared/components/site/PageSection'
import { SeoHead } from '../../shared/components/site/SeoHead'

export function TopicsPage() {
  const navigate = useNavigate()

  return (
    <>
      <SeoHead
        title="Guidance Topics & Life Themes | Manish Vaghasiya"
        description="Explore organized topic hubs on parenting, family relationships, and student career guidance from Manish Vaghasiya."
        canonicalUrl="https://www.manishvaghasiya.com/topics"
      />
      <PageHero
        eyebrow="Guidance Topics"
        title="Practical life guidance organized around your needs."
        description="Select a topic category to access specialized articles, downloadable workbooks, and seminar recommendations."
      />

      <PageSection
        title="Core topic hubs"
        description="Explore our primary guidance categories designed for students, parents, and families."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {topicHubs.map((topic) => (
            <div key={topic.title} className="flex flex-col gap-3">
              <ContentCard
                title={topic.title}
                description={topic.description}
                meta={`${topic.supportingArticleSlugs.length + 1} Articles & Guides`}
                tone={topic.slug === 'students-and-career-guidance' ? 'forest' : 'warm'}
              />
              <Button
                type="link"
                icon={<ArrowRightOutlined />}
                onClick={() => navigate(`${routePaths.topics}/${topic.slug}`)}
                className="!self-start !px-1 !text-[var(--accent-earth)]"
              >
                Explore {topic.title} Hub
              </Button>
            </div>
          ))}
        </div>
      </PageSection>
    </>
  )
}
