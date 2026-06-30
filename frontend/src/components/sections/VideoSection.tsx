import { SectionHeading } from '../ui/SectionHeading'
import { LazyVideo } from '../ui/LazyVideo'
import { LazySection } from '../ui/LazySection'

const featureVideo = {
  youtubeId: 'dQw4w9WgXcQ', // Placeholder, user will replace with actual ID
  title: 'ખુદની ફિલોસોફી (Discover Your Own Philosophy) | Life-Changing Seminar by Manish Vaghasiya',
  thumbnailSrc: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
}

const miniVideos = [
  {
    youtubeId: 'dQw4w9WgXcQ',
    title: 'How to Face Board Exam Stress & Anxiety - Student Guide',
    thumbnailSrc: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
  },
  {
    youtubeId: 'dQw4w9WgXcQ',
    title: 'Parenting in the Digital Age: Building Trust with Children',
    thumbnailSrc: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
  },
  {
    youtubeId: 'dQw4w9WgXcQ',
    title: 'Overcoming Depression: Real Stories of Self-Belief',
    thumbnailSrc: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
  },
]

export function VideoSection() {
  return (
    <section id="media-video" className="bg-white section-padding border-b border-border relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionHeading
          eyebrow="See Manish in Action"
          title="From Stage to Screen"
          description="Watch snippets of keynote speeches, motivational seminars, and youth development workshops delivered by Manish Vaghasiya."
        />

        {/* Feature Large Video */}
        <LazySection animation="fade-up" className="mb-10">
          <div className="max-w-4xl mx-auto">
            <LazyVideo
              youtubeId={featureVideo.youtubeId}
              title={featureVideo.title}
              thumbnailSrc={featureVideo.thumbnailSrc}
            />
            <div className="mt-4 text-left max-w-4xl mx-auto">
              <h3 className="text-apple-black font-bold text-base md:text-lg tracking-tight mb-1">
                {featureVideo.title}
              </h3>
              <p className="text-apple-gray text-xs md:text-sm font-light">
                Recorded live before an audience of 5,000+ students and parents in Surat, Gujarat. Manish shares core ideas on mapping your own philosophy and achieving lasting success.
              </p>
            </div>
          </div>
        </LazySection>

        {/* 3 Mini Videos Row */}
        <LazySection animation="fade-up" delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {miniVideos.map((video, idx) => (
              <div key={idx} className="flex flex-col gap-3">
                <LazyVideo
                  youtubeId={video.youtubeId}
                  title={video.title}
                  thumbnailSrc={video.thumbnailSrc}
                />
                <h4 className="text-apple-black font-bold text-xs md:text-sm text-left line-clamp-2 leading-tight">
                  {video.title}
                </h4>
              </div>
            ))}
          </div>
        </LazySection>

      </div>
    </section>
  )
}
