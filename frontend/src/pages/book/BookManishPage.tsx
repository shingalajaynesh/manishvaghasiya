import { CalendarOutlined, FileTextOutlined, SafetyOutlined } from '@ant-design/icons'
import { ContentCard } from '../../shared/components/site/ContentCard'
import { PageHero } from '../../shared/components/site/PageHero'
import { PageSection } from '../../shared/components/site/PageSection'
import { SeoHead } from '../../shared/components/site/SeoHead'

export function BookManishPage() {
  return (
    <>
      <SeoHead
        title="Book Manish Vaghasiya | Seminars & Keynotes"
        description="Book Manish Vaghasiya for school seminars, college youth sessions, parenting workshops, and institutional keynotes."
        canonicalUrl="https://www.manishvaghasiya.com/book-manish"
      />
      <PageHero
        eyebrow="Book Manish"
        title="Seminar and workshop inquiries should feel clear from the first visit."
        description="This page helps event organizers understand audience fit, session outcomes, and the fastest path to discuss a school, college, family, or institutional program."
      />

      <PageSection
        title="What organizers need to know"
        description="A strong booking page reduces back-and-forth by answering the most important questions up front."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ContentCard
            title="Program Fit"
            description="Student seminars, parenting workshops, family guidance sessions, and institutional talks can each be framed with a clear audience and purpose."
            icon={<CalendarOutlined />}
            tone="warm"
          />
          <ContentCard
            title="Media Kit"
            description="Speaker profile, key themes, previous event proof, and a simple organizer-ready summary improve trust quickly."
            icon={<FileTextOutlined />}
            tone="forest"
          />
          <ContentCard
            title="Trust Layer"
            description="Testimonials, institutions served, response clarity, and visible contact details help organizers move faster."
            icon={<SafetyOutlined />}
            tone="warm"
          />
        </div>
      </PageSection>
    </>
  )
}
