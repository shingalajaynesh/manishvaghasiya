import {
  ArrowRightOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  ReadOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { Button, Input, Segmented, Tag, Typography } from 'antd'
import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { articles } from '../../content/editorial'
import { routePaths } from '../../content/routes'
import { PageHero } from '../../shared/components/site/PageHero'
import { PageSection } from '../../shared/components/site/PageSection'
import { SeoHead } from '../../shared/components/site/SeoHead'

const { Paragraph, Title } = Typography

export function BlogPage() {
  const navigate = useNavigate()
  const [selectedTopic, setSelectedTopic] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const topicOptions = ['All', 'Parenting', 'Family Relationships', 'Students and Career Guidance']

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesTopic = selectedTopic === 'All' || article.topic === selectedTopic
      const matchesQuery =
        !searchQuery.trim() ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.topic.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesTopic && matchesQuery
    })
  }, [selectedTopic, searchQuery])

  return (
    <>
      <SeoHead
        title="Practical Guidance Articles & Guides | Manish Vaghasiya"
        description="Comprehensive guides on parenting teenagers, student confidence, exam stress reduction, and family relationship harmony by Manish Vaghasiya."
        canonicalUrl="https://www.manishvaghasiya.com/blog"
      />
      <PageHero
        eyebrow="Editorial & Knowledge Base"
        title="Practical Guidance for Families, Parents & Students"
        description="In-depth, field-tested articles crafted from over 4,500 keynote seminars and 20+ years of youth counseling experience."
      />

      <PageSection
        title="Browse Articles & Life Guides"
        description="Explore our complete collection of structured, long-form guides designed to resolve real family and student challenges."
      >
        {/* Filter & Search Bar */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="overflow-x-auto pb-2 md:pb-0">
            <Segmented
              size="large"
              options={topicOptions}
              value={selectedTopic}
              onChange={(val) => setSelectedTopic(val as string)}
              className="!bg-[var(--panel-soft)] !p-1.5 font-semibold text-sm"
            />
          </div>
          <div className="w-full md:w-72">
            <Input
              size="large"
              placeholder="Search articles..."
              prefix={<SearchOutlined className="text-[var(--text-muted)]" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              allowClear
              className="!rounded-xl"
            />
          </div>
        </div>

        {/* Articles Count */}
        <div className="mb-6 flex items-center justify-between text-xs text-[var(--text-muted)]">
          <span>Showing <strong>{filteredArticles.length}</strong> {filteredArticles.length === 1 ? 'article' : 'articles'}</span>
          {selectedTopic !== 'All' && (
            <button
              onClick={() => setSelectedTopic('All')}
              className="text-[var(--accent-earth)] font-semibold hover:underline"
            >
              Reset Filter
            </button>
          )}
        </div>

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="rounded-2xl border border-[var(--line-soft)] bg-white p-12 text-center shadow-editorial">
            <ReadOutlined className="text-4xl text-[var(--text-muted)] mb-3" />
            <Title level={4} className="font-playfair !mb-2">No articles found</Title>
            <Paragraph className="!text-sm !text-[var(--text-soft)] mb-4">
              We couldn't find any articles matching your search criteria.
            </Paragraph>
            <Button onClick={() => { setSelectedTopic('All'); setSearchQuery(''); }}>
              Clear All Filters
            </Button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <article
                key={article.slug}
                className="flex flex-col justify-between rounded-2xl border border-[var(--line-soft)] bg-white p-6 shadow-editorial transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <Tag
                      color={
                        article.topic === 'Parenting'
                          ? 'volcano'
                          : article.topic === 'Family Relationships'
                          ? 'gold'
                          : 'blue'
                      }
                      className="!rounded-full !px-3 !py-0.5 !text-xs font-semibold"
                    >
                      {article.topic}
                    </Tag>
                    <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                      <ClockCircleOutlined />
                      <span>{article.readTime}</span>
                    </span>
                  </div>

                  <Link to={`${routePaths.blog}/${article.slug}`} className="group">
                    <Title
                      level={4}
                      className="font-playfair !mb-3 !text-lg !leading-snug !text-[var(--text-strong)] group-hover:!text-[var(--accent-earth)] transition-colors line-clamp-2"
                    >
                      {article.title}
                    </Title>
                  </Link>

                  <Paragraph className="!mb-4 !text-xs !leading-relaxed !text-[var(--text-soft)] line-clamp-3">
                    {article.excerpt}
                  </Paragraph>
                </div>

                <div className="border-t border-[var(--line-soft)] pt-4 mt-auto">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                      <CalendarOutlined />
                      <span>{article.updatedAt}</span>
                    </div>
                    <Button
                      type="link"
                      icon={<ArrowRightOutlined />}
                      onClick={() => navigate(`${routePaths.blog}/${article.slug}`)}
                      className="!p-0 !text-xs !font-bold !text-[var(--accent-earth)]"
                    >
                      Read Guide
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </PageSection>
    </>
  )
}
