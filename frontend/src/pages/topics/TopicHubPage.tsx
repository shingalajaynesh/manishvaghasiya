import { ArrowRightOutlined, DownloadOutlined, FileTextOutlined, PlayCircleOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { Link, useParams } from 'react-router-dom'
import { articles, getTopicHubBySlug } from '../../content/editorial'
import { routePaths } from '../../content/routes'
import { ContentCard } from '../../shared/components/site/ContentCard'
import { PageHero } from '../../shared/components/site/PageHero'
import { PageSection } from '../../shared/components/site/PageSection'

export function TopicHubPage() {
  const { slug } = useParams<{ slug: string }>()
  const hub = slug ? getTopicHubBySlug(slug) : undefined

  if (!hub) {
    return (
      <PageHero
        eyebrow="Topic Hub"
        title="Topic hub not found"
        description="This topic hub has not been set up yet."
      />
    )
  }

  const pillar = articles.find((article) => article.slug === hub.pillarArticleSlug)
  const supporting = articles.filter((article) => hub.supportingArticleSlugs.includes(article.slug))

  return (
    <>
      <PageHero
        eyebrow="Topic Hub"
        title={hub.title}
        description={hub.description}
      />

      <PageSection
        title="How this hub is structured"
        description="Each hub connects a pillar article, supporting content, a relevant lead magnet, and a clear conversion path."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <ContentCard
            title="Pillar Article"
            description={pillar ? pillar.title : 'Pillar article to be assigned'}
            icon={<FileTextOutlined />}
            tone="warm"
          />
          <ContentCard
            title="Lead Magnet"
            description={hub.resourceTitle}
            icon={<DownloadOutlined />}
            tone="forest"
          />
          <ContentCard
            title="Conversion Path"
            description={hub.conversionTitle}
            icon={<PlayCircleOutlined />}
            tone="warm"
          />
        </div>
      </PageSection>

      <PageSection
        title="Supporting articles"
        description="These articles support the same audience problem space and should interlink naturally."
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
              <Button type="link" icon={<ArrowRightOutlined />} href={`${routePaths.blog}/${article.slug}`} className="!self-start !px-1 !text-[var(--accent-earth)]">
                Read article
              </Button>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection
        title="Where this hub should lead"
        description="A strong topic hub should move readers deeper into helpful content and then toward a relevant resource or program."
      >
        <div className="rounded-2xl border border-[var(--line-soft)] bg-white p-7 shadow-editorial">
          <div className="grid gap-4 text-sm leading-7 text-[var(--text-soft)]">
            <p>1. Start with the pillar article to understand the main question this hub answers.</p>
            <p>2. Move into supporting posts that solve narrower problems around the same audience need.</p>
            <p>3. Offer a matching downloadable resource so trust turns into an owned audience relationship.</p>
            <p>4. Connect the hub to a workshop, seminar, or inquiry path where relevant.</p>
          </div>
          <div className="mt-6">
            <Button type="primary" icon={<ArrowRightOutlined />} href={routePaths.resources}>
              View resources
            </Button>
          </div>
        </div>
      </PageSection>
    </>
  )
}
