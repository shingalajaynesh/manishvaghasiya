import { Button, Card, Col, Image, Row, Space, Tabs, Tag, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { routePaths } from '../../content/routes'
import { speakerMedia } from '../../content/speakerMedia'
import { PageHero } from '../../shared/components/site/PageHero'
import { PageSection } from '../../shared/components/site/PageSection'

const { Paragraph, Title } = Typography

const galleryGroups = [
  {
    key: 'all',
    label: 'All photos',
    images: speakerMedia.allPhotos,
    description: 'A full visual collection across stage sessions, audience scale, and public event moments.',
  },
  {
    key: 'main',
    label: 'Main portraits',
    images: speakerMedia.mainPortraits,
    description: 'Portrait-led photographs that work best for branding, media, and profile storytelling.',
  },
  {
    key: 'crowd',
    label: 'Crowd and stage',
    images: speakerMedia.crowdPhotos,
    description: 'Wide live-event imagery that shows reach, stage presence, and seminar energy.',
  },
  {
    key: 'moments',
    label: 'Moments',
    images: speakerMedia.momentsPhotos,
    description: 'Human event moments that add warmth, emotion, and audience connection.',
  },
]

export function PhotosPage() {
  const navigate = useNavigate()
  return (
    <>
      <PageHero
        eyebrow="Photo gallery"
        title="A dedicated visual gallery for Manish Vaghasiya."
        description="A cleaner place to explore portraits, stage photography, crowd scale, and real event moments without overloading the homepage."
      />

      <PageSection
        title="Visual library"
        description="This page holds the strongest approved photographs in one professional browsing experience."
        tone="warm"
      >
        <div className="photo-gallery-shell">
          <div className="photo-gallery-highlight">
            <div className="photo-gallery-highlight__image">
              <img src={speakerMedia.heroStage} alt="Manish Vaghasiya addressing a large audience" className="h-full w-full object-cover" />
            </div>

            <Card bordered={false} className="photo-gallery-highlight__card">
              <Space direction="vertical" size={14} className="w-full">
                <Tag bordered={false} color="volcano" className="!w-fit !rounded-full !px-3 !py-1 !text-xs !font-semibold !uppercase !tracking-[0.15em]">
                  Real event photography
                </Tag>
                <Title level={3} className="font-playfair !m-0 !text-2xl !leading-tight !text-[var(--text-strong)]">
                  Better photo browsing, cleaner homepage
                </Title>
                <Paragraph className="!mb-0 !text-base !leading-8 !text-[var(--text-soft)]">
                  The homepage now stays focused on clarity and conversion, while this gallery page carries the full photo story in a more elegant way.
                </Paragraph>
                <Button type="primary" onClick={() => navigate(routePaths.book)}>
                  Book Manish
                </Button>
              </Space>
            </Card>
          </div>

          <Tabs
            defaultActiveKey="all"
            className="responsive-photo-tabs"
            items={galleryGroups.map((group) => ({
              key: group.key,
              label: group.label,
              children: (
                <Space direction="vertical" size={20} className="w-full">
                  <Paragraph className="!mb-0 !max-w-3xl !text-base !leading-8 !text-[var(--text-soft)]">
                    {group.description}
                  </Paragraph>
                  <Row gutter={[18, 18]}>
                    {group.images.map((image, index) => (
                      <Col xs={24} sm={12} xl={8} key={`${group.key}-${index}`}>
                        <div className="photo-card">
                          <Image
                            src={image}
                            alt={`${group.label} image ${index + 1}`}
                            preview={{ mask: 'View' }}
                            className="photo-card__image"
                          />
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Space>
              ),
            }))}
          />
        </div>
      </PageSection>
    </>
  )
}
