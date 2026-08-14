import {
  BookOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  TrophyOutlined,
} from '@ant-design/icons'
import { Button, Col, Row, Space, Tag, Typography } from 'antd'
import { useNavigate, Link } from 'react-router-dom'
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

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Manish Vaghasiya',
    jobTitle: 'Transformational Speaker, Life Coach & Author',
    description: 'Surat-based Gujarati author and transformational speaker with over 4,500 keynote sessions delivered across India.',
    url: 'https://www.manishvaghasiya.com/about',
    sameAs: [
      'https://instagram.com/manishvaghasiya01',
      'https://facebook.com/manish.vaghasiya.984',
      'https://www.youtube.com/channel/UC0VYCKxHEqllDtI3A_tqxCw',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Surat',
      addressRegion: 'Gujarat',
      addressCountry: 'India',
    },
  }

  return (
    <>
      <SeoHead
        title="About Manish Vaghasiya | Transformational Speaker, Author & Coach"
        description="Discover Manish Vaghasiya's 20+ year journey, 4,500+ live keynote seminars, official Gujarati master handbooks, and mission to empower youth and families."
        canonicalUrl="https://www.manishvaghasiya.com/about"
        jsonLd={personJsonLd}
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
        <div className="mb-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] items-center">
          <div className="speaker-about-image overflow-hidden rounded-3xl shadow-editorial">
            <img
              src={speakerMedia.aboutPortrait}
              alt="Manish Vaghasiya delivering a live keynote seminar in Gujarat"
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="speaker-about-summary flex flex-col justify-center">
            <Space direction="vertical" size={16} className="w-full">
              <Tag color="gold" className="!w-fit !rounded-full !px-3.5 !py-1 !text-xs !font-bold !uppercase !tracking-wider">
                AUTHOR • KEYNOTE SPEAKER • LIFE COACH
              </Tag>
              <Title level={2} className="font-playfair !m-0 !text-3xl !leading-tight !text-[var(--text-strong)] sm:!text-4xl">
                A mission rooted in empathy, discipline, and emotional clarity
              </Title>
              <Paragraph className="!mb-0 !text-base !leading-8 !text-[var(--text-soft)]">
                Based in Surat, Gujarat, Manish Vaghasiya has dedicated over two decades to youth counseling, family reconciliation, and motivational leadership. Through more than 4,500 live keynote talks across schools, universities, community conventions, and corporate institutions, his practical, culturally grounded insights have transformed hundreds of thousands of lives.
              </Paragraph>
              <Paragraph className="!mb-0 !text-base !leading-8 !text-[var(--text-soft)]">
                His mission addresses the critical emotional challenges of our time: helping students overcome academic failure and exam anxiety, guiding parents in establishing deep emotional bonds with teenagers, and providing families with actionable tools for conflict resolution.
              </Paragraph>
              <div className="pt-2 flex flex-wrap gap-3">
                <Button type="primary" size="large" onClick={() => navigate(routePaths.contact)} className="!rounded-xl !bg-[#D4A017] !font-bold">
                  Book Manish for a Seminar
                </Button>
                <Button size="large" onClick={() => navigate(routePaths.resources)} className="!rounded-xl !font-semibold">
                  Browse Master E-Books
                </Button>
              </div>
            </Space>
          </div>
        </div>

        {/* Impact Statistics */}
        <div className="mb-12 rounded-3xl border border-amber-200 bg-gradient-to-r from-amber-50 via-orange-50/50 to-amber-50 p-8 shadow-editorial">
          <Row gutter={[24, 24]} className="text-center">
            <Col xs={12} md={6}>
              <div className="font-playfair text-3xl sm:text-4xl font-extrabold text-[var(--accent-earth)]">4,500+</div>
              <div className="mt-1 text-xs font-bold text-[var(--text-strong)] uppercase tracking-wider">Live Seminars Delivered</div>
            </Col>
            <Col xs={12} md={6}>
              <div className="font-playfair text-3xl sm:text-4xl font-extrabold text-[var(--accent-earth)]">150,000+</div>
              <div className="mt-1 text-xs font-bold text-[var(--text-strong)] uppercase tracking-wider">Students & Parents Reached</div>
            </Col>
            <Col xs={12} md={6}>
              <div className="font-playfair text-3xl sm:text-4xl font-extrabold text-[var(--accent-earth)]">20+ Years</div>
              <div className="mt-1 text-xs font-bold text-[var(--text-strong)] uppercase tracking-wider">Public Speaking Experience</div>
            </Col>
            <Col xs={12} md={6}>
              <div className="font-playfair text-3xl sm:text-4xl font-extrabold text-[var(--accent-earth)]">2 Bestsellers</div>
              <div className="mt-1 text-xs font-bold text-[var(--text-strong)] uppercase tracking-wider">Official Master E-Books</div>
            </Col>
          </Row>
        </div>

        {/* Master Books Section */}
        <div className="mb-12 rounded-3xl border border-[var(--line-soft)] bg-white p-8 shadow-editorial">
          <div className="flex items-center gap-2 mb-2">
            <BookOutlined className="text-[#D4A017] text-lg" />
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-earth)]">Published Literary Works</span>
          </div>
          <Title level={3} className="font-playfair !mb-3 !text-2xl !text-[var(--text-strong)]">
            Official Master Gujarati Handbooks by Manish Vaghasiya
          </Title>
          <Paragraph className="!mb-6 !text-sm !leading-7 !text-[var(--text-soft)]">
            Written in accessible, practical Gujarati, these two comprehensive handbooks encapsulate two decades of field research and counseling insights for students and families.
          </Paragraph>

          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-5 flex gap-4 items-center">
                <img
                  src="/books/images/Jivan-Jitvu-Che-To-Parivar-Thi-Sharu-Karo_Gujarati.png"
                  alt="Jivan Jitvu Che Book Cover"
                  className="h-28 rounded-lg object-cover shadow"
                />
                <div>
                  <h4 className="font-playfair font-bold text-base text-[var(--text-strong)]">
                    જીવન જીતવું છે તો પરિવારથી શરૂઆત કરો
                  </h4>
                  <p className="text-xs text-[var(--accent-earth)] font-semibold mt-0.5">276 Pages • Master Edition</p>
                  <p className="text-xs text-[var(--text-soft)] mt-1 line-clamp-2">
                    ૧૨ જીવન બદલતા પાઠ, કૌટુંબિક સંવાદ અને ૨૧ દિવસનો પરિવાર પરિવર્તન પડકાર.
                  </p>
                  <Link to="/reader/jivan-jitvu-che" className="text-xs font-bold text-amber-800 hover:underline mt-2 inline-block">
                    Look Inside Preview →
                  </Link>
                </div>
              </div>
            </Col>

            <Col xs={24} md={12}>
              <div className="rounded-2xl border border-blue-200 bg-blue-50/40 p-5 flex gap-4 items-center">
                <img
                  src="/books/images/Man-Haryu-To-Badhu-Haryu_Gujarati_Master.png"
                  alt="Man Haryu To Badhu Haryu Book Cover"
                  className="h-28 rounded-lg object-cover shadow"
                />
                <div>
                  <h4 className="font-playfair font-bold text-base text-[var(--text-strong)]">
                    મન હાર્યું તો બધું હાર્યું
                  </h4>
                  <p className="text-xs text-[var(--accent-earth)] font-semibold mt-0.5">250+ Pages • Master Edition</p>
                  <p className="text-xs text-[var(--text-soft)] mt-1 line-clamp-2">
                    ઓવરથિંકિંગમાંથી મુક્તિ, આત્મવિશ્વાસનું પુનઃનિર્માણ અને માનસિક મજબૂતીનું ગાઇડ.
                  </p>
                  <Link to="/reader/man-haryu-to-badhu-haryu" className="text-xs font-bold text-blue-800 hover:underline mt-2 inline-block">
                    Look Inside Preview →
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* Speaking Journey Milestones */}
        <div className="mb-12 rounded-3xl border border-[var(--line-soft)] bg-white p-8 shadow-editorial">
          <Title level={3} className="font-playfair !mb-2 !text-2xl !text-[var(--text-strong)]">
            Two Decades of Transformational Service
          </Title>
          <Paragraph className="!mb-6 !text-sm !leading-7 !text-[var(--text-soft)]">
            A chronological timeline of Manish Vaghasiya's public journey, literature, and educational leadership across Gujarat.
          </Paragraph>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-[var(--line-soft)] bg-[var(--panel-soft)] p-5">
              <div className="font-playfair text-xl font-bold text-[var(--accent-earth)] mb-1">2004–2010</div>
              <div className="text-sm font-bold text-[var(--text-strong)] mb-2">Early Youth Counseling</div>
              <p className="text-xs text-[var(--text-soft)] leading-relaxed">
                Began conducting free student confidence workshops and exam anxiety recovery sessions in schools across Surat and South Gujarat.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--line-soft)] bg-[var(--panel-soft)] p-5">
              <div className="font-playfair text-xl font-bold text-[var(--accent-earth)] mb-1">2011–2018</div>
              <div className="text-sm font-bold text-[var(--text-strong)] mb-2">Statewide Keynote Seminars</div>
              <p className="text-xs text-[var(--text-soft)] leading-relaxed">
                Expanded across major Gujarat cities (Ahmedabad, Rajkot, Vadodara, Bhavnagar), addressing over 2,500 auditoriums and community conventions.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--line-soft)] bg-[var(--panel-soft)] p-5">
              <div className="font-playfair text-xl font-bold text-[var(--accent-earth)] mb-1">2019–2023</div>
              <div className="text-sm font-bold text-[var(--text-strong)] mb-2">Bestselling Author & Video Reach</div>
              <p className="text-xs text-[var(--text-soft)] leading-relaxed">
                Authored official master handbooks <em>'જીવન જીતવું છે તો પરિવારથી શરૂઆત કરો'</em> and <em>'મન હાર્યું તો બધું હાર્યું'</em>; crossed 1.5M digital community reach.
              </p>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5">
              <div className="font-playfair text-xl font-bold text-[var(--accent-earth)] mb-1">2024–Present</div>
              <div className="text-sm font-bold text-[var(--text-strong)] mb-2">Digital Master Guidance Platform</div>
              <p className="text-xs text-[var(--text-soft)] leading-relaxed">
                Launched the official e-book library, secure online reader platform, and structured editorial knowledge base for Gujarati families worldwide.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <ContentCard
            title="Educational Keynotes"
            description="Empowering 10th & 12th students with active recall study methods, stress reduction, and self-belief after failure."
            icon={<TrophyOutlined />}
            tone="warm"
          />
          <ContentCard
            title="Parenting Mastery"
            description="Practical workshops for parents on empathetic communication, managing smartphone friction, and emotional attunement."
            icon={<TeamOutlined />}
            tone="warm"
          />
          <ContentCard
            title="Life & Relationship Coaching"
            description="Guiding individuals and families through conflict de-escalation, emotional regulation, and meaningful purpose."
            icon={<SafetyCertificateOutlined />}
            tone="warm"
          />
        </div>

        {/* Booking CTA */}
        <div className="rounded-3xl border border-amber-300 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100 p-8 text-center shadow-editorial sm:p-10">
          <Title level={3} className="font-playfair !mb-2 !text-2xl !text-[var(--text-strong)] sm:!text-3xl">
            Invite Manish Vaghasiya to Speak at Your Institution or Event
          </Title>
          <Paragraph className="mx-auto max-w-2xl !text-sm !leading-7 !text-[var(--text-soft)] mb-6">
            Available for school & college annual seminars, youth conventions, corporate motivational keynotes, and family counseling workshops across India and internationally.
          </Paragraph>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              type="primary"
              size="large"
              onClick={() => navigate(routePaths.contact)}
              className="!rounded-xl !bg-[#D4A017] !font-bold hover:!bg-[#b88910] !h-12 !px-8"
            >
              Inquire Event Availability
            </Button>
            <Button
              size="large"
              onClick={() => navigate(routePaths.resources)}
              className="!rounded-xl !font-semibold !h-12 !px-8"
            >
              Explore Official E-Books
            </Button>
          </div>
        </div>
      </PageSection>
    </>
  )
}
