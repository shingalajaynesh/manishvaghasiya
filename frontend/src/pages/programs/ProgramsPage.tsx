import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { programCards } from '../../content/pages'
import { routePaths } from '../../content/routes'
import { ContentCard } from '../../shared/components/site/ContentCard'
import { PageHero } from '../../shared/components/site/PageHero'
import { PageSection } from '../../shared/components/site/PageSection'
import { SeoHead } from '../../shared/components/site/SeoHead'

export function ProgramsPage() {
  const navigate = useNavigate()

  return (
    <>
      <SeoHead
        title="Speaking Programs & Workshops | Manish Vaghasiya"
        description="Explore Manish Vaghasiya's speaking programs: Student Confidence Seminars, Parenting Workshops, and Family Guidance Keynotes."
        canonicalUrl="https://www.manishvaghasiya.com/programs"
      />
      <PageHero
        eyebrow="Speaking Programs"
        title="Keynote sessions and workshops designed for impact."
        description="Over 4,500 sessions delivered to schools, colleges, community organizations, and corporate keynotes."
      />

      <PageSection
        title="Our flagship program categories"
        description="Select a program category to learn more about session objectives and target audience fit."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {programCards.map((program) => (
            <div key={program.title} className="flex flex-col justify-between gap-4">
              <ContentCard
                title={program.title}
                description={program.description}
                meta="Live Session"
                tone={program.title === 'Family Guidance Programs' ? 'forest' : 'warm'}
              />
              <Button
                type="primary"
                onClick={() => navigate(routePaths.book)}
                className="!self-start !rounded-xl !bg-[var(--accent-earth)]"
              >
                Inquire for {program.title}
              </Button>
            </div>
          ))}
        </div>
      </PageSection>
    </>
  )
}
