import {
  ArrowRightOutlined,
  BookOutlined,
  DownloadOutlined,
  PlayCircleOutlined,
  TeamOutlined,
  TrophyOutlined,
  UserOutlined,
  HeartOutlined,
  PictureOutlined,
} from '@ant-design/icons'
import { Button, Col, Row, Space, Statistic, Tag, Typography } from 'antd'
import { articles } from '../../content/editorial'
import { siteDictionary, translate } from '../../content/i18n'
import { routePaths } from '../../content/routes'
import { speakerMedia } from '../../content/speakerMedia'
import {
  audiencePaths,
  homeResources,
  socialProof,
  testimonials,
} from '../../features/home/content/homePageContent'

import { ContentCard } from '../../shared/components/site/ContentCard'
import { EmailCaptureForm } from '../../shared/components/site/EmailCaptureForm'
import { MotionSection } from '../../shared/components/site/MotionSection'
import { PageSection } from '../../shared/components/site/PageSection'
import { SocialLinks } from '../../shared/components/site/SocialLinks'
import { useNavigate } from 'react-router-dom'
import { SeoHead } from '../../shared/components/site/SeoHead'
import { useLanguage } from '../../shared/lib/language'

const { Paragraph, Text, Title } = Typography

const audienceIcons = {
  'For Students': <UserOutlined />,
  'For Parents': <HeartOutlined />,
  'For Families': <TeamOutlined />,
  'For Organizers': <TrophyOutlined />,
}

export function HomePage() {
  const navigate = useNavigate()
  const featuredArticles = articles.slice(0, 3)
  const featuredResources = homeResources.slice(0, 2)
  const { language } = useLanguage()

  return (
    <>
      <SeoHead
        title="Manish Vaghasiya | Practical Life Guidance for Students, Parents & Families"
        description="Transformational Coach & Inspirational Speaker. Practical Gujarati-first life guidance for students, parents, and families. 1.5M+ followers, 4500+ programs delivered."
        canonicalUrl="https://www.manishvaghasiya.com/"
      />
      <section className="editorial-container px-1 pb-6 pt-6 sm:px-2 sm:pb-8 sm:pt-8 lg:pt-12">
        <div className="editorial-hero px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-12">
          <Row gutter={[40, 32]} align="middle">
            <Col xs={24} lg={13}>
              <Space orientation="vertical" size={18}>
                <Tag variant="filled" color="volcano" className="!w-fit !rounded-full !px-3 !py-1 !text-[10px] !font-semibold !uppercase !tracking-[0.16em] sm:!px-4 sm:!text-xs">
                  {translate(siteDictionary.home.heroEyebrow, language)}
                </Tag>
                <Title className="font-playfair !m-0 !text-[2rem] !leading-[1.06] !text-[var(--text-strong)] sm:!text-[2.8rem] lg:!text-6xl">
                  {translate(siteDictionary.home.heroTitle, language)}
                </Title>
                <Paragraph className="!mb-0 !max-w-2xl !text-[15px] !leading-7 !text-[var(--text-soft)] sm:!text-base sm:!leading-8 lg:!text-lg">
                  {translate(siteDictionary.home.heroDescription, language)}
                </Paragraph>
                <div className="hero-actions">
                  <Button type="primary" size="large" icon={<BookOutlined />} onClick={() => navigate(routePaths.resources)} className="hero-action-button !bg-[#D4A017] !font-bold hover:!bg-[#b88910]">
                    Buy Official E-Book (₹199)
                  </Button>
                  <Button size="large" onClick={() => navigate(routePaths.blog)} style={{ borderColor: 'var(--line-strong)' }} className="hero-action-button">
                    Read Blog Articles
                  </Button>
                  <Button size="large" icon={<PictureOutlined />} onClick={() => navigate(routePaths.photos)} style={{ borderColor: 'var(--line-strong)' }} className="hero-action-button">
                    View Photos
                  </Button>
                </div>


                <SocialLinks />
              </Space>
            </Col>

            <Col xs={24} lg={11}>
              <MotionSection delay={0.15}>
                <div className="hero-stage-frame">
                  <img src={speakerMedia.heroStage} alt="Manish Vaghasiya speaking on stage" className="h-full w-full object-cover" />
                </div>
              </MotionSection>
            </Col>
          </Row>

          <MotionSection delay={0.2}>
            <div className="mt-6 grid gap-4 lg:mt-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="hero-support-card">
                <Space orientation="vertical" size={14} className="w-full">
                  <Tag variant="filled" color="green" className="!w-fit !rounded-full !px-3 !py-1 !text-xs !font-semibold !uppercase !tracking-[0.15em]">
                    Featured talk
                  </Tag>
                  <Title level={3} className="font-playfair !m-0 !text-2xl !leading-tight !text-[var(--text-strong)]">
                    Family, students, and life guidance
                  </Title>
                  <Paragraph className="!mb-0 !text-sm !leading-7 !text-[var(--text-soft)]">
                    Watch Manish Vaghasiya share practical wisdom on stronger families, student confidence,
                    and everyday life direction through public programs and talks.
                  </Paragraph>
                  <Button type="default" icon={<PlayCircleOutlined />} href="https://www.youtube.com/channel/UC0VYCKxHEqllDtI3A_tqxCw" target="_blank" className="!w-fit" style={{ borderColor: 'var(--line-strong)' }}>
                    Watch on YouTube
                  </Button>
                </Space>
              </div>

              <div className="hero-support-image">
                <img src={speakerMedia.heroSupport} alt="Audience attending a Manish Vaghasiya seminar" className="h-full w-full object-cover" />
              </div>
            </div>
          </MotionSection>

          <MotionSection delay={0.24}>
            <div className="mt-6 grid grid-cols-2 gap-3 lg:mt-8 lg:grid-cols-4 lg:gap-4">
              {socialProof.map((item) => (
                <div key={item.label} className="rounded-2xl bg-white/75 px-4 py-4 text-center shadow-sm" style={{ border: '1px solid var(--line-soft)' }}>
                  <Statistic value={item.value} styles={{ content: { color: 'var(--accent-earth)', fontWeight: 700, fontSize: '1.5rem' } }} />
                  <Text className="!mt-1 !block !text-[10px] !uppercase !tracking-[0.16em] !text-[var(--text-muted)] lg:!text-xs">
                    {item.label}
                  </Text>
                </div>
              ))}
            </div>
          </MotionSection>
        </div>
      </section>

      <PageSection
        title={translate(siteDictionary.home.choosePathTitle, language)}
        description={translate(siteDictionary.home.choosePathDescription, language)}
        tone="warm"
      >
        <Row gutter={[24, 24]}>
          {audiencePaths.map((path) => (
            <Col xs={24} md={12} xl={6} key={path.title}>
              <div className="flex h-full flex-col justify-between gap-3">
                <ContentCard
                  title={path.title}
                  description={path.description}
                  meta="Audience path"
                  icon={audienceIcons[path.title as keyof typeof audienceIcons]}
                  tone={path.title === 'For Families' || path.title === 'For Organizers' ? 'forest' : 'warm'}
                />
                <Button type="link" icon={<ArrowRightOutlined />} href={path.to} className="!self-start !px-1 !text-[var(--accent-earth)] hover:!text-[var(--accent-earth-deep)]">
                  {path.cta}
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      </PageSection>

      <PageSection
        title="Photo highlights"
        description="A quick visual preview from public events, with the full collection available on the dedicated gallery page."
        tone="default"
      >
        <div className="speaker-preview-grid">
          {speakerMedia.homePreview.map((image, index) => (
            <div key={image} className={`speaker-preview-card ${index === 0 ? 'speaker-preview-card--large' : ''}`}>
              <img src={image} alt={`Photo highlight ${index + 1} from a Manish Vaghasiya event`} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Button type="primary" icon={<PictureOutlined />} onClick={() => navigate(routePaths.photos)}>
            Open full photo gallery
          </Button>
        </div>
      </PageSection>




      <PageSection title="Official Master E-Books" description="Get instant access to Manish Vaghasiya's official life-changing Gujarati master handbooks." tone="forest">
        <Row gutter={[24, 24]}>
          {/* Book 1 Card */}
          <Col xs={24} lg={12}>
            <div className="flex h-full flex-col justify-between rounded-3xl border border-[var(--line-soft)] bg-white p-6 shadow-editorial transition-all hover:shadow-xl lg:p-8">
              <div>
                <Tag color="gold" className="!mb-3 !rounded-full !px-3 !py-1 !text-xs !font-bold !uppercase">
                  PARIVAR & PARENTING BESTSELLER
                </Tag>
                <div className="flex gap-4">
                  <div className="shrink-0 overflow-hidden rounded-xl shadow-md transition-transform duration-300 hover:scale-105" style={{ width: '110px' }}>
                    <img
                      src="/books/images/Jivan-Jitvu-Che-To-Parivar-Thi-Sharu-Karo_Gujarati.png"
                      alt="જીવન જીતવું છે તો પરિવારથી શરૂઆત કરો Book Cover"
                      className="h-auto w-full object-cover"
                    />
                  </div>
                  <div>
                    <Title level={3} className="font-playfair !mb-1 !text-xl !text-[var(--text-strong)]">
                      જીવન જીતવું છે તો પરિવારથી શરૂઆત કરો
                    </Title>
                    <div className="mb-2 text-xs font-bold text-[var(--accent-earth)]">
                      276 Pages • Gujarati Master Edition
                    </div>
                    <Paragraph className="!mb-0 !text-xs !leading-6 !text-[var(--text-soft)]">
                      વિદ્યાર્થી, માતા-પિતા અને દરેક પરિવાર માટે જીવન બદલતા ૧૨ પાઠ, સંસ્કાર, ડિજિટલ ડિટોક્સ અને ૨૧ દિવસનો પરિવાર પરિવર્તન પડકાર.
                    </Paragraph>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between border-t border-[var(--line-soft)] pt-4 gap-3">
                <div className="text-xl font-extrabold text-[var(--accent-earth)]">
                  ₹199 <span className="text-xs font-normal text-[var(--text-muted)] line-through">₹499</span>
                  <span className="ml-2 rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-bold text-green-700">60% OFF</span>
                </div>
                <Button
                  type="primary"
                  icon={<BookOutlined />}
                  onClick={() => navigate(`${routePaths.resources}?book=jivan-jitvu-che`)}
                  className="!rounded-xl !bg-[#D4A017] !font-bold hover:!bg-[#b88910]"
                >
                  Buy Book 1 PDF
                </Button>
              </div>
            </div>
          </Col>

          {/* Book 2 Card */}
          <Col xs={24} lg={12}>
            <div className="flex h-full flex-col justify-between rounded-3xl border border-[var(--line-soft)] bg-white p-6 shadow-editorial transition-all hover:shadow-xl lg:p-8">
              <div>
                <Tag color="blue" className="!mb-3 !rounded-full !px-3 !py-1 !text-xs !font-bold !uppercase">
                  NEW RELEASE • MINDSET MASTER
                </Tag>
                <div className="flex gap-4">
                  <div className="shrink-0 overflow-hidden rounded-xl shadow-md transition-transform duration-300 hover:scale-105" style={{ width: '110px' }}>
                    <img
                      src="/books/images/Man-Haryu-To-Badhu-Haryu_Gujarati_Master.png"
                      alt="મન હાર્યું તો બધું હાર્યું Book Cover"
                      className="h-auto w-full object-cover"
                    />
                  </div>
                  <div>
                    <Title level={3} className="font-playfair !mb-1 !text-xl !text-[var(--text-strong)]">
                      મન હાર્યું તો બધું હાર્યું
                    </Title>
                    <div className="mb-2 text-xs font-bold text-[var(--accent-earth)]">
                      250+ Pages • Gujarati Master Edition
                    </div>
                    <Paragraph className="!mb-0 !text-xs !leading-6 !text-[var(--text-soft)]">
                      માનસિક મજબૂતી, ઓવરથિંકિંગમાંથી મુક્તિ, આત્મવિશ્વાસનું પુનઃનિર્માણ અને પડકારો સામે હિંમત રાખવાનું શક્તિશાળી માર્ગદર્શન.
                    </Paragraph>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between border-t border-[var(--line-soft)] pt-4 gap-3">
                <div className="text-xl font-extrabold text-[var(--accent-earth)]">
                  ₹199 <span className="text-xs font-normal text-[var(--text-muted)] line-through">₹499</span>
                  <span className="ml-2 rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-bold text-green-700">60% OFF</span>
                </div>
                <Button
                  type="primary"
                  icon={<BookOutlined />}
                  onClick={() => navigate(`${routePaths.resources}?book=man-haryu-to-badhu-haryu`)}
                  className="!rounded-xl !bg-[#D4A017] !font-bold hover:!bg-[#b88910]"
                >
                  Buy Book 2 PDF
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        {/* Master Combo Banner */}
        <div className="mt-6 rounded-3xl border border-amber-300 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100 p-6 shadow-editorial text-center sm:p-8">
          <div className="inline-block rounded-full bg-[#D4A017] px-4 py-1 text-xs font-extrabold uppercase tracking-wider text-white mb-2 shadow-sm">
            🔥 SPECIAL COMBO BUNDLE OFFER
          </div>
          <Title level={3} className="font-playfair !mb-2 !text-2xl !text-[var(--text-strong)]">
            બંને માસ્ટર પુસ્તકો બંડલ (Get Both E-Books & Save Extra ₹49)
          </Title>
          <p className="mx-auto max-w-2xl text-xs text-[var(--text-soft)] mb-4">
            'જીવન જીતવું છે તો પરિવારથી શરૂઆત કરો' + 'મન હાર્યું તો બધું હાર્યું' બંને માસ્ટર ઈ-બુક કમ્પ્લીટ લાઈબ્રેરી મેળવો માત્ર ₹349 માં!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              type="primary"
              size="large"
              icon={<BookOutlined />}
              onClick={() => navigate(`${routePaths.resources}?book=combo-bundle`)}
              className="!h-13 !rounded-xl !bg-[#D4A017] !px-8 !text-base !font-bold hover:!bg-[#b88910] shadow-md"
            >
              Get Master Combo Pack for ₹349
            </Button>
            <span className="text-xs text-emerald-800 font-bold">⚡ Instant PDF Download + Email Access</span>
          </div>
        </div>
      </PageSection>

      <PageSection
        title="Featured articles and resources"
        description="Read practical guidance and insights to complement your E-Book journey."
        tone="warm"
      >

        <Row gutter={[24, 24]}>
          {featuredArticles.map((article) => (
            <Col xs={24} lg={12} key={article.slug}>
              <div className="flex h-full flex-col justify-between gap-3">
                <ContentCard
                  title={article.title}
                  description={article.excerpt}
                  meta={article.topic}
                  icon={<BookOutlined />}
                  tone={article.topic === 'Parenting' ? 'forest' : 'warm'}
                />
                <Button type="link" icon={<ArrowRightOutlined />} href={`${routePaths.blog}/${article.slug}`} className="!self-start !px-1 !text-[var(--accent-earth)] hover:!text-[var(--accent-earth-deep)]">
                  Read article
                </Button>
              </div>
            </Col>
          ))}
          {featuredResources.map((resource) => (
            <Col xs={24} lg={12} key={resource.title}>
              <div className="flex h-full flex-col justify-between gap-3">
                <ContentCard
                  title={resource.title}
                  description={resource.description}
                  meta="Free guide"
                  icon={<DownloadOutlined />}
                  tone="forest"
                />
                <Button type="link" icon={<ArrowRightOutlined />} href={resource.to} className="!self-start !px-1 !text-[var(--accent-earth)] hover:!text-[var(--accent-earth-deep)]">
                  Download guide
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      </PageSection>





      <PageSection
        title="Trusted guidance for students, parents, and families"
        description="What this platform is built on - clarity, respect, and practical next steps."
        tone="forest"
      >
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={14}>
            <Row gutter={[24, 24]}>
              {testimonials.map((item) => (
                <Col xs={24} key={item.quote}>
                  <div className="rounded-2xl bg-white px-6 py-5 shadow-editorial" style={{ border: '1px solid var(--line-soft)' }}>
                    <Space orientation="vertical" size={10}>
                      <Tag variant="filled" color="volcano" className="!w-fit !rounded-full !px-3 !py-1 !text-xs !font-semibold !uppercase !tracking-[0.15em]">
                        Platform principle
                      </Tag>
                      <Paragraph className="!mb-0 !text-base !leading-7 !text-[var(--text-soft)]">
                        {item.quote}
                      </Paragraph>
                      <Text className="!text-sm !font-semibold !text-[var(--text-strong)]">
                        {item.source}
                      </Text>
                    </Space>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>

          <Col xs={24} lg={10}>
            <div className="rounded-2xl bg-white p-6 shadow-editorial lg:p-8" style={{ border: '1px solid var(--line-soft)' }}>
              <Space orientation="vertical" size={14} className="w-full">
                <Tag variant="filled" color="green" className="!w-fit !rounded-full !px-3 !py-1 !text-xs !font-semibold !uppercase !tracking-[0.15em]">
                  Free guide
                </Tag>
                <Title level={3} className="font-playfair !m-0 !text-2xl !leading-tight !text-[var(--text-strong)] lg:!text-3xl">
                  Start with the Student Confidence Starter Guide
                </Title>
                <Paragraph className="!mb-0 !text-sm !leading-7 !text-[var(--text-soft)]">
                  A practical PDF for students facing self-doubt, exam pressure, or career confusion.
                  The first step in building an owned audience and lead capture funnel.
                </Paragraph>
                <EmailCaptureForm
                  successHref={routePaths.studentGuideThanks}
                  successLabel="View thank-you page"
                />
              </Space>
            </div>
          </Col>
        </Row>
      </PageSection>
    </>
  )
}
