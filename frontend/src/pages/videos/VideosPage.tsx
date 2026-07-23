import { PlayCircleOutlined } from '@ant-design/icons'
import { PageHero } from '../../shared/components/site/PageHero'
import { PageSection } from '../../shared/components/site/PageSection'
import { SeoHead } from '../../shared/components/site/SeoHead'

const videoThemes = [
  'Family communication and respect',
  'Parent-child understanding',
  'Student confidence after failure',
  'Marriage communication and anger handling',
  'Gujarati life lessons and practical motivation',
]

export function VideosPage() {
  return (
    <>
      <SeoHead
        title="Video Library & Talks | Manish Vaghasiya"
        description="Watch video clips, motivational seminars, and practical life advice from Manish Vaghasiya."
        canonicalUrl="https://www.manishvaghasiya.com/videos"
      />
      <PageHero
        eyebrow="Videos"
        title="Video content should feed the editorial engine, not sit separately."
        description="Seminar clips, practical lessons, and short-form guidance can all strengthen article discovery, resource funnels, and booking trust."
      />

      <PageSection
        title="Priority video themes"
        description="These themes align best with the strongest public content signals and the first editorial clusters."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {videoThemes.map((theme) => (
            <div key={theme} className="rounded-2xl border border-[var(--line-soft)] bg-white p-6 shadow-editorial">
              <div className="inline-flex rounded-xl bg-[rgba(174,88,49,0.1)] p-3 text-[var(--accent-earth)]">
                <PlayCircleOutlined className="text-lg" />
              </div>
              <h2 className="mt-4 font-playfair text-2xl text-[var(--text-strong)]">{theme}</h2>
              <p className="mt-2 text-sm leading-7 text-[var(--text-soft)]">
                Each video theme can support article rewrites, FAQs, hub pages, and a relevant resource CTA.
              </p>
            </div>
          ))}
        </div>
      </PageSection>
    </>
  )
}
