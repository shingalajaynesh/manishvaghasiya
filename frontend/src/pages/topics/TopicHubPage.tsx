import { ArrowRightOutlined, DownloadOutlined, FileTextOutlined, PlayCircleOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { articles, getTopicHubBySlug } from '../../content/editorial'
import { routePaths } from '../../content/routes'
import { ContentCard } from '../../shared/components/site/ContentCard'
import { PageHero } from '../../shared/components/site/PageHero'
import { PageSection } from '../../shared/components/site/PageSection'
import { SeoHead } from '../../shared/components/site/SeoHead'

export function TopicHubPage() {
  const navigate = useNavigate()
  const { slug } = useParams<{ slug: string }>()
  const hub = slug ? getTopicHubBySlug(slug) : undefined

  if (!hub) {
    return (
      <PageHero
        eyebrow="Topic Hub"
        title="Topic hub not found"
        description="The requested guidance topic is not available. Explore our main topics directory."
      />
    )
  }

  const pillar = articles.find((article) => article.slug === hub.pillarArticleSlug)
  const supporting = articles.filter((article) => hub.supportingArticleSlugs.includes(article.slug))

  return (
    <>
      <SeoHead
        title={`${hub.title} Topic Hub | Manish Vaghasiya`}
        description={hub.description}
        canonicalUrl={`https://www.manishvaghasiya.com/topics/${hub.slug}`}
      />
      <PageHero
        eyebrow="Guidance Topic Hub"
        title={hub.title}
        description={hub.description}
      />

      <PageSection
        title="Featured pillar guide & resources"
        description="Start with our comprehensive pillar article and matching downloadable workbook."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <ContentCard
            title="Core Pillar Guide"
            description={pillar ? pillar.title : 'Comprehensive topic guide'}
            icon={<FileTextOutlined />}
            tone="warm"
          />
          <ContentCard
            title="Free PDF Workbook"
            description={hub.resourceTitle}
            icon={<DownloadOutlined />}
            tone="forest"
          />
          <ContentCard
            title="Live Seminar Program"
            description={hub.conversionTitle}
            icon={<PlayCircleOutlined />}
            tone="warm"
          />
        </div>
      </PageSection>

      <PageSection
        title="Related articles & guides"
        description="Deepen your understanding with these practical articles."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {supporting.map((article) => (
            <div key={article.slug} className="flex flex-col gap-3">
              <ContentCard
                title={article.title}
                description={article.excerpt}
                meta={article.audience}
                tone={article.topic === 'Parenting' ? 'forest' : 'warm'}
              />
              <Button
                type="link"
                icon={<ArrowRightOutlined />}
                onClick={() => navigate(`${routePaths.blog}/${article.slug}`)}
                className="!self-start !px-1 !text-[var(--accent-earth)]"
              >
                Read Full Article
              </Button>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection
        title="Recommended next steps"
        description="Apply these principles at home or book a live seminar session."
      >
        <div className="rounded-2xl border border-[var(--line-soft)] bg-white p-7 shadow-editorial">
          <div className="grid gap-4 text-sm leading-7 text-[var(--text-soft)]">
            <p>1. Start with the pillar article to understand the underlying principles of {hub.title.toLowerCase()}.</p>
            <p>2. Review supporting articles for targeted solutions to specific everyday challenges.</p>
            <p>3. Download the free PDF resource to work through practical exercises with your family or students.</p>
            <p>4. Reach out to book a live workshop session for your school, college, or community group.</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button type="primary" icon={<ArrowRightOutlined />} onClick={() => navigate(routePaths.resources)}>
              Download Free Resources
            </Button>
            <Button onClick={() => navigate(routePaths.book)} style={{ borderColor: 'var(--line-strong)' }}>
              Book a Workshop
            </Button>
          </div>
        </div>
      </PageSection>
    </>
  )
}
