import { CustomerServiceOutlined, TeamOutlined, YoutubeOutlined } from '@ant-design/icons'
import { Button, Space, Tag, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { siteDictionary, translate } from '../../content/i18n'
import { routePaths } from '../../content/routes'
import { speakerMedia } from '../../content/speakerMedia'
import { ContentCard } from '../../shared/components/site/ContentCard'
import { PageHero } from '../../shared/components/site/PageHero'
import { PageSection } from '../../shared/components/site/PageSection'
import { SeoHead } from '../../shared/components/site/SeoHead'
import { useLanguage } from '../../shared/lib/language'

const { Paragraph, Title } = Typography

export function AboutPage() {
  const navigate = useNavigate()
  const { language } = useLanguage()

  return (
    <>
      <SeoHead
        title="About Manish Vaghasiya | Transformational Speaker & Life Coach"
        description="Learn about Manish Vaghasiya — transformational speaker, life coach, and consultant based in Surat, Gujarat. Over 4500+ sessions delivered to students, parents, and families."
        canonicalUrl="https://www.manishvaghasiya.com/about"
      />
      <PageHero
        eyebrow={translate(siteDictionary.about.eyebrow, language)}
        title={translate(siteDictionary.about.title, language)}
        description={translate(siteDictionary.about.description, language)}
      />

      <PageSection
        title="Why this platform exists"
        description="This page builds trust for readers, institutions, event organizers, and future product buyers by making the mission and public credibility clear."
      >
        <div className="mb-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="speaker-about-image">
            <img src={speakerMedia.aboutPortrait} alt="Manish Vaghasiya delivering a live speaking session" className="h-full w-full object-cover" />
          </div>
          <div className="speaker-about-summary">
            <Space direction="vertical" size={16} className="w-full">
              <Tag bordered={false} color="gold" className="!w-fit !rounded-full !px-3 !py-1 !text-xs !font-semibold !uppercase !tracking-[0.15em]">
                Public profile
              </Tag>
              <Title level={2} className="font-playfair !m-0 !text-3xl !leading-tight !text-[var(--text-strong)]">
                Built for credibility, trust, and long-term publishing
              </Title>
              <Paragraph className="!mb-0 !text-base !leading-8 !text-[var(--text-soft)]">
                The website is being structured as a serious platform for speaking programs, guidance content,
                downloadable student resources, and future digital products that can grow with the audience.
              </Paragraph>
              <Button type="primary" size="large" onClick={() => navigate(routePaths.book)}>
                Book Manish
              </Button>
            </Space>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ContentCard
            title="Public positioning"
            description="Public profiles consistently present Manish Vaghasiya as a transformational coach, inspirational speaker, trainer, and consultant."
            icon={<CustomerServiceOutlined />}
            tone="warm"
          />
          <ContentCard
            title="Audience reach"
            description="Public audience signals show around 1.5 million Instagram followers, roughly 192 thousand YouTube subscribers, and more than 4500 programs."
            icon={<TeamOutlined />}
            tone="warm"
          />
          <ContentCard
            title="Content themes"
            description="The strongest visible themes are family guidance, parenting, student confidence, relationships, and practical life lessons for Gujarati audiences."
            icon={<YoutubeOutlined />}
            tone="warm"
          />
        </div>
      </PageSection>
    </>
  )
}
