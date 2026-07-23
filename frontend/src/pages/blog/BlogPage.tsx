import { ArrowRightOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { articles } from '../../content/editorial'
import { routePaths } from '../../content/routes'
import { ContentCard } from '../../shared/components/site/ContentCard'
import { PageHero } from '../../shared/components/site/PageHero'
import { PageSection } from '../../shared/components/site/PageSection'

export function BlogPage() {
  const navigate = useNavigate()
  return (
    <>
      <PageHero
        eyebrow="Editorial Platform"
        title="Useful articles, not content for content's sake."
        description="The editorial layer focuses on practical guidance for students, parents, and families, with every article tied to a real problem, topic hub, and next-step CTA."
      />

      <PageSection
        title="First article collection"
        description="These starter articles anchor the first topic clusters and begin turning public authority into search-friendly evergreen content."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {articles.map((article) => (
            <div key={article.slug} className="flex flex-col gap-3">
              <Link to={`${routePaths.blog}/${article.slug}`}>
                <ContentCard
                  title={article.title}
                  description={article.excerpt}
                  meta={article.topic}
                  tone={article.topic === 'Parenting' ? 'forest' : 'warm'}
                />
              </Link>
              <Button type="link" icon={<ArrowRightOutlined />} onClick={() => navigate(`${routePaths.blog}/${article.slug}`)} className="!self-start !px-1 !text-[var(--accent-earth)]">
                Read article
              </Button>
            </div>
          ))}
        </div>
      </PageSection>
    </>
  )
}
