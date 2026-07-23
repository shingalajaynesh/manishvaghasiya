import { ArrowRightOutlined, BookOutlined, DownloadOutlined, TagOutlined } from '@ant-design/icons'
import { Button, Tag, Typography } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { getArticleBySlug, topicHubs } from '../../content/editorial'
import { routePaths } from '../../content/routes'
import { EmailCaptureForm } from '../../shared/components/site/EmailCaptureForm'
import { PageHero } from '../../shared/components/site/PageHero'
import { PageSection } from '../../shared/components/site/PageSection'
import { SeoHead } from '../../shared/components/site/SeoHead'

const { Paragraph, Text, Title } = Typography

export function ArticlePage() {
  const navigate = useNavigate()
  const { slug } = useParams<{ slug: string }>()
  const article = slug ? getArticleBySlug(slug) : undefined

  if (!article) {
    return (
      <PageHero
        eyebrow="Article"
        title="Article not found"
        description="This article slug is not available yet."
      />
    )
  }

  const relatedHub = topicHubs.find((hub) => hub.title === article.topic)
  const canonicalUrl = `https://www.manishvaghasiya.com/blog/${article.slug}`

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Person',
      name: article.author || 'Manish Vaghasiya',
      url: 'https://www.manishvaghasiya.com',
    },
    publisher: {
      '@type': 'Person',
      name: 'Manish Vaghasiya',
      url: 'https://www.manishvaghasiya.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  }

  return (
    <>
      <SeoHead
        title={`${article.title} | Manish Vaghasiya`}
        description={article.excerpt}
        canonicalUrl={canonicalUrl}
        jsonLd={articleJsonLd}
      />
      <PageHero
        eyebrow={article.topic}
        title={article.title}
        description={article.excerpt}
      />

      <PageSection title="Article" description="Each article should answer a real question clearly, connect to its topic hub, and lead into a relevant next step.">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-2xl border border-[var(--line-soft)] bg-white p-7 shadow-editorial lg:p-10">
            <div className="flex flex-wrap gap-3">
              <Tag icon={<BookOutlined />} color="volcano" className="!rounded-full !px-4 !py-1.5 !text-xs">
                {article.readTime}
              </Tag>
              <Tag icon={<TagOutlined />} color="green" className="!rounded-full !px-4 !py-1.5 !text-xs">
                {article.audience}
              </Tag>
            </div>

            <div className="mt-5 flex flex-wrap gap-5 text-sm text-[var(--text-muted)]">
              <span>Published: {article.publishedAt}</span>
              <span>Updated: {article.updatedAt}</span>
              <span>By: {article.author}</span>
            </div>

            {article.keyTakeaways?.length ? (
              <div className="mt-8 rounded-2xl bg-[var(--panel-soft)] p-6">
                <Title level={3} className="font-playfair !mb-4 !text-2xl !text-[var(--text-strong)]">
                  Key takeaways
                </Title>
                <ul className="space-y-3 text-sm leading-7 text-[var(--text-soft)]">
                  {article.keyTakeaways.map((takeaway) => (
                    <li key={takeaway} className="flex gap-2">
                      <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-earth)]" />
                      {takeaway}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {article.sections?.length ? (
              <div className="mt-8 space-y-10">
                {article.sections.map((section) => (
                  <section key={section.heading}>
                    <Title level={2} className="font-playfair !mb-4 !text-[1.75rem] !leading-tight !text-[var(--text-strong)]">
                      {section.heading}
                    </Title>
                    <div className="space-y-4 text-base leading-8 text-[var(--text-soft)]">
                      {section.paragraphs.map((paragraph) => (
                        <Paragraph key={paragraph} className="!mb-0">
                          {paragraph}
                        </Paragraph>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <div className="mt-8 space-y-4 text-base leading-8 text-[var(--text-soft)]">
                <Paragraph className="!mb-0">
                  This article is already part of the content system, and the next editorial pass
                  can expand it into a fuller guide while keeping the same topic, audience, and
                  conversion role.
                </Paragraph>
                <Paragraph className="!mb-0">
                  Every article on this platform should remain tied to a topic cluster, a clear
                  audience problem, and a relevant conversion path.
                </Paragraph>
              </div>
            )}

            {article.faqs?.length ? (
              <div className="mt-10 border-t border-[var(--line-soft)] pt-8">
                <Title level={3} className="font-playfair !mb-6 !text-2xl !text-[var(--text-strong)]">
                  Frequently asked questions
                </Title>
                <div className="space-y-4">
                  {article.faqs.map((faq) => (
                    <div key={faq.question} className="rounded-2xl bg-[var(--panel-soft)] p-5">
                      <Text className="!mb-2 !block !text-base !font-semibold !text-[var(--text-strong)]">
                        {faq.question}
                      </Text>
                      <Paragraph className="!mb-0 !text-sm !leading-7 !text-[var(--text-soft)]">
                        {faq.answer}
                      </Paragraph>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </article>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-[var(--line-soft)] bg-white p-6 shadow-editorial">
              <Text className="!mb-3 !block !text-xs !font-semibold !uppercase !tracking-[0.2em] !text-[var(--text-muted)]">
                Free resource
              </Text>
              <Title level={3} className="font-playfair !mb-2 !text-2xl !text-[var(--text-strong)]">
                {article.leadMagnet}
              </Title>
              <Paragraph className="!mb-4 !text-sm !leading-7 !text-[var(--text-soft)]">
                A relevant downloadable asset helps the article continue the relationship instead of ending as a dead-end page.
              </Paragraph>
              <Button type="primary" icon={<DownloadOutlined />} onClick={() => navigate(article.leadMagnet === 'Student Confidence Starter Guide' ? routePaths.studentGuide : routePaths.resources)} block>
                Download now
              </Button>
            </div>

            {relatedHub ? (
              <div className="rounded-2xl border border-[var(--line-soft)] bg-white p-6 shadow-editorial">
                <Text className="!mb-3 !block !text-xs !font-semibold !uppercase !tracking-[0.2em] !text-[var(--text-muted)]">
                  Topic hub
                </Text>
                <Title level={3} className="font-playfair !mb-2 !text-2xl !text-[var(--text-strong)]">
                  {relatedHub.title}
                </Title>
                <Paragraph className="!mb-4 !text-sm !leading-7 !text-[var(--text-soft)]">
                  {relatedHub.description}
                </Paragraph>
                <Button type="link" icon={<ArrowRightOutlined />} onClick={() => navigate(`${routePaths.topics}/${relatedHub.slug}`)} className="!px-0 !text-[var(--accent-earth)]">
                  Explore this hub
                </Button>
              </div>
            ) : null}

            <div className="rounded-2xl border border-[var(--line-soft)] bg-[var(--panel-soft)] p-6">
              <Text className="!mb-3 !block !text-xs !font-semibold !uppercase !tracking-[0.2em] !text-[var(--text-muted)]">
                Stay updated
              </Text>
              <Title level={4} className="font-playfair !mb-2 !text-xl !text-[var(--text-strong)]">
                Get new articles
              </Title>
              <Paragraph className="!mb-4 !text-sm !leading-7 !text-[var(--text-soft)]">
                Join the mailing list for practical guidance and resources.
              </Paragraph>
              <EmailCaptureForm successLabel="Continue" />
            </div>
          </aside>
        </div>
      </PageSection>
    </>
  )
}
