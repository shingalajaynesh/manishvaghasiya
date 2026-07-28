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
        title="Empowering youth and strengthening families"
        description="Discover the mission, public work, and core guidance philosophy of Manish Vaghasiya."
      >
        <div className="mb-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="speaker-about-image">
            <img src={speakerMedia.aboutPortrait} alt="Manish Vaghasiya delivering a live speaking session" className="h-full w-full object-cover rounded-2xl" />
          </div>
          <div className="speaker-about-summary flex flex-col justify-center">
            <Space orientation="vertical" size={16} className="w-full">
              <Tag variant="filled" color="gold" className="!w-fit !rounded-full !px-3 !py-1 !text-xs !font-semibold !uppercase !tracking-[0.15em]">
                Transformational Speaker & Coach
              </Tag>
              <Title level={2} className="font-playfair !m-0 !text-3xl !leading-tight !text-[var(--text-strong)]">
                A mission rooted in empathy, discipline, and emotional clarity
              </Title>
              <Paragraph className="!mb-0 !text-base !leading-8 !text-[var(--text-soft)]">
                Based in Surat, Gujarat, Manish Vaghasiya has spent over two decades conducting keynote talks, student seminars, and parenting workshops. His practical, Gujarati-first guidance helps young adults recover from academic setbacks, empowers parents to build emotional trust at home, and restores family harmony.
              </Paragraph>
              <Paragraph className="!mb-0 !text-base !leading-8 !text-[var(--text-soft)]">
                Through live seminars, educational PDF resources, and digital video lectures, his work reaches millions of readers and attendees seeking practical, actionable life direction.
              </Paragraph>
              <Button type="primary" size="large" onClick={() => navigate(routePaths.contact)} className="!w-fit !mt-2">
                Contact Manish for an Event
              </Button>

            </Space>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ContentCard
            title="Professional Background"
            description="Active as a transformational speaker, student counselor, corporate trainer, and life guidance consultant across India."
            icon={<CustomerServiceOutlined />}
            tone="warm"
          />
          <ContentCard
            title="Public Reach & Impact"
            description="Over 4,500 live programs conducted in schools, colleges, community halls, and institutional keynotes."
            icon={<TeamOutlined />}
            tone="warm"
          />
          <ContentCard
            title="Core Themes"
            description="Deep specialization in student confidence after failure, exam stress, parent-child communication, and family relationships."
            icon={<YoutubeOutlined />}
            tone="warm"
          />
        </div>
      </PageSection>
    </>
  )
}
