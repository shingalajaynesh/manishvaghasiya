import { PlayCircleOutlined, YoutubeOutlined } from '@ant-design/icons'
import { Button, Card, Col, Row, Tag, Typography } from 'antd'
import { featuredVideos } from '../../content/speakerMedia'
import { PageHero } from '../../shared/components/site/PageHero'
import { PageSection } from '../../shared/components/site/PageSection'
import { SeoHead } from '../../shared/components/site/SeoHead'

const { Paragraph, Title } = Typography

export function VideosPage() {
  return (
    <>
      <SeoHead
        title="Video Seminars & Talks | Manish Vaghasiya"
        description="Watch keynote talks, motivational seminars, and practical life advice from Manish Vaghasiya on parenting, student confidence, and family relationships."
        canonicalUrl="https://www.manishvaghasiya.com/videos"
      />
      <PageHero
        eyebrow="Video Library"
        title="Keynote talks, live seminars, and practical guidance."
        description="Explore recorded sessions and inspirational guidance delivered by Manish Vaghasiya to students, parents, and family audiences across Gujarat."
      />

      <PageSection
        title="Featured video talks"
        description="Watch practical lessons on student confidence, parenting, and family harmony."
        tone="warm"
      >
        <Row gutter={[24, 24]}>
          {featuredVideos.map((video) => (
            <Col xs={24} md={12} key={video.id}>
              <Card
                variant="borderless"
                className="h-full rounded-2xl border border-[var(--line-soft)] bg-white p-2 shadow-editorial transition-all hover:shadow-editorial-lg"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
                  <iframe
                    src={video.embedUrl}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full border-0"
                  />
                </div>
                <div className="mt-4 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <Tag color="volcano" className="!rounded-full !px-3 !py-0.5 !text-xs !font-semibold">
                      {video.category}
                    </Tag>
                    <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                      <PlayCircleOutlined /> {video.duration}
                    </span>
                  </div>
                  <Title level={3} className="font-playfair !mb-2 !mt-3 !text-xl !text-[var(--text-strong)]">
                    {video.title}
                  </Title>
                  <Paragraph className="!mb-4 !text-sm !leading-7 !text-[var(--text-soft)]">
                    {video.description}
                  </Paragraph>
                  <Button
                    type="default"
                    icon={<YoutubeOutlined />}
                    href={video.youtubeUrl}
                    target="_blank"
                    className="!rounded-xl"
                    style={{ borderColor: 'var(--line-strong)' }}
                  >
                    Watch on YouTube
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="mt-12 rounded-2xl border border-[var(--line-soft)] bg-white p-8 text-center shadow-editorial">
          <Title level={3} className="font-playfair !mb-3 !text-2xl !text-[var(--text-strong)]">
            Subscribe for new video releases
          </Title>
          <Paragraph className="!mx-auto !max-w-xl !text-sm !leading-7 !text-[var(--text-soft)]">
            New video lectures, student Q&A sessions, and parenting seminars are published regularly on Manish Vaghasiya's official YouTube channel.
          </Paragraph>
          <div className="mt-6 flex justify-center">
            <Button
              type="primary"
              size="large"
              icon={<YoutubeOutlined />}
              href="https://www.youtube.com/channel/UC0VYCKxHEqllDtI3A_tqxCw"
              target="_blank"
              className="!rounded-xl !bg-[#ff0000] hover:!bg-[#cc0000]"
            >
              Visit Official YouTube Channel
            </Button>
          </div>
        </div>
      </PageSection>
    </>
  )
}
