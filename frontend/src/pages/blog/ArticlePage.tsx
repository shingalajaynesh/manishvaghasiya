import {
  ArrowRightOutlined,
  BookOutlined,
  CheckCircleOutlined,
  DownloadOutlined,
  SafetyCertificateOutlined,
  TagOutlined,
} from '@ant-design/icons'
import { Button, Tag, Typography } from 'antd'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { getArticleBySlug, topicHubs } from '../../content/editorial'
import { routePaths } from '../../content/routes'
import { speakerMedia } from '../../content/speakerMedia'
import { AdContainer } from '../../shared/components/site/AdContainer'
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
        description="The requested article is not available. Please explore our main blog listing."
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
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    author: {
      '@type': 'Person',
      name: 'Manish Vaghasiya',
      jobTitle: 'Transformational Speaker & Author',
      url: 'https://www.manishvaghasiya.com/about',
      sameAs: [
        'https://instagram.com/manishvaghasiya01',
        'https://facebook.com/manish.vaghasiya.984',
        'https://www.youtube.com/channel/UC0VYCKxHEqllDtI3A_tqxCw',
      ],
    },
    publisher: {
      '@type': 'Organization',
      name: 'Manish Vaghasiya Platform',
      url: 'https://www.manishvaghasiya.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.manishvaghasiya.com/books/images/Jivan-Jitvu-Che-To-Parivar-Thi-Sharu-Karo_Gujarati.png',
      },
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

      <PageSection title="Article Guide" description="Practical guidance crafted for students, parents, and families.">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-2xl border border-[var(--line-soft)] bg-white p-7 shadow-editorial lg:p-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <Tag icon={<BookOutlined />} color="volcano" className="!rounded-full !px-3.5 !py-1 !text-xs font-semibold">
                  {article.readTime}
                </Tag>
                <Tag icon={<TagOutlined />} color="green" className="!rounded-full !px-3.5 !py-1 !text-xs font-semibold">
                  {article.audience}
                </Tag>
              </div>
              <span className="flex items-center gap-1 text-xs text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-semibold">
                <SafetyCertificateOutlined />
                <span>Expert Verified E-E-A-T</span>
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-4 text-xs text-[var(--text-muted)] border-b border-[var(--line-soft)] pb-4">
              <span>Published: <strong>{article.publishedAt}</strong></span>
              <span>Updated: <strong>{article.updatedAt}</strong></span>
              <span>Author: <strong>{article.author}</strong></span>
            </div>

            {article.keyTakeaways?.length ? (
              <div className="mt-6 rounded-2xl bg-amber-50/50 border border-amber-200 p-6">
                <Title level={3} className="font-playfair !mb-3 !text-xl !text-amber-900 flex items-center gap-2">
                  <CheckCircleOutlined className="text-amber-700" />
                  <span>Key Takeaways & Core Lessons</span>
                </Title>
                <ul className="space-y-2.5 text-sm leading-relaxed text-[var(--text-soft)]">
                  {article.keyTakeaways.map((takeaway) => (
                    <li key={takeaway} className="flex items-start gap-2">
                      <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-earth)]" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <AdContainer slotId="article-top-ad" />

            {article.sections?.length ? (
              <div className="mt-8 space-y-10">
                {article.sections.map((section) => (
                  <section key={section.heading}>
                    <Title level={2} className="font-playfair !mb-4 !text-[1.65rem] !leading-tight !text-[var(--text-strong)]">
                      {section.heading}
                    </Title>
                    <div className="space-y-4 text-base leading-8 text-[var(--text-soft)]">
                      {section.paragraphs.map((paragraph, pIdx) => (
                        <Paragraph key={pIdx} className="!mb-0 whitespace-pre-line text-[15px] leading-7">
                          {paragraph}
                        </Paragraph>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : null}

            <AdContainer slotId="article-bottom-ad" />

            {article.faqs?.length ? (
              <div className="mt-10 border-t border-[var(--line-soft)] pt-8">
                <Title level={3} className="font-playfair !mb-6 !text-2xl !text-[var(--text-strong)]">
                  Frequently Asked Questions
                </Title>
                <div className="space-y-4">
                  {article.faqs.map((faq) => (
                    <div key={faq.question} className="rounded-2xl bg-[var(--panel-soft)] p-5 border border-[var(--line-soft)]">
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

            {/* Author E-E-A-T Bio Box */}
            <div className="mt-10 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50/70 to-orange-50/50 p-6">
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-[#D4A017] shadow-md">
                  <img
                    src={speakerMedia.heroStage}
                    alt="Manish Vaghasiya"
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width={80}
                    height={80}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-playfair text-lg font-bold text-[var(--text-strong)]">
                      About the Author: Manish Vaghasiya
                    </h4>
                  </div>
                  <p className="text-xs text-[var(--accent-earth)] font-semibold mb-1">
                    Transformational Speaker, Author & Life Guidance Consultant • Surat, Gujarat
                  </p>
                  <p className="text-xs text-[var(--text-soft)] leading-relaxed mb-3">
                    Manish Vaghasiya has conducted over 4,500 keynote seminars and workshops empowering students, parents, and families across Gujarat. Author of official Gujarati master handbooks <em>'જીવન જીતવું છે તો પરિવારથી શરૂઆત કરો'</em> and <em>'મન હાર્યું તો બધું હાર્યું'</em>.
                  </p>
                  <Link to={routePaths.about} className="text-xs font-bold text-amber-800 hover:underline">
                    Read Full Author Biography & Credentials →
                  </Link>
                </div>
              </div>
            </div>
          </article>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-[var(--line-soft)] bg-white p-6 shadow-editorial">
              <Text className="!mb-3 !block !text-xs !font-semibold !uppercase !tracking-[0.2em] !text-[var(--text-muted)]">
                Free Resource
              </Text>
              <Title level={3} className="font-playfair !mb-2 !text-2xl !text-[var(--text-strong)]">
                {article.leadMagnet}
              </Title>
              <Paragraph className="!mb-4 !text-sm !leading-7 !text-[var(--text-soft)]">
                Download our practical PDF guide designed to help you apply these principles at home.
              </Paragraph>
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                onClick={() => navigate(article.leadMagnet === 'Student Confidence Starter Guide' ? routePaths.studentGuide : routePaths.resources)}
                block
              >
                Download Now
              </Button>
            </div>

            {relatedHub ? (
              <div className="rounded-2xl border border-[var(--line-soft)] bg-white p-6 shadow-editorial">
                <Text className="!mb-3 !block !text-xs !font-semibold !uppercase !tracking-[0.2em] !text-[var(--text-muted)]">
                  Topic Hub
                </Text>
                <Title level={3} className="font-playfair !mb-2 !text-2xl !text-[var(--text-strong)]">
                  {relatedHub.title}
                </Title>
                <Paragraph className="!mb-4 !text-sm !leading-7 !text-[var(--text-soft)]">
                  {relatedHub.description}
                </Paragraph>
                <Button
                  type="link"
                  icon={<ArrowRightOutlined />}
                  onClick={() => navigate(`${routePaths.topics}/${relatedHub.slug}`)}
                  className="!px-0 !text-[var(--accent-earth)]"
                >
                  Explore This Topic Hub
                </Button>
              </div>
            ) : null}

            <div className="rounded-2xl border border-[var(--line-soft)] bg-[var(--panel-soft)] p-6">
              <Text className="!mb-3 !block !text-xs !font-semibold !uppercase !tracking-[0.2em] !text-[var(--text-muted)]">
                Stay Updated
              </Text>
              <Title level={4} className="font-playfair !mb-2 !text-xl !text-[var(--text-strong)]">
                Get New Articles
              </Title>
              <Paragraph className="!mb-4 !text-sm !leading-7 !text-[var(--text-soft)]">
                Join our subscriber list for practical guidance and new resource updates.
              </Paragraph>
              <EmailCaptureForm successLabel="Continue" />
            </div>
          </aside>
        </div>
      </PageSection>
    </>
  )
}
