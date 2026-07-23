import { programCards } from '../../content/pages'
import { ContentCard } from '../../shared/components/site/ContentCard'
import { PageHero } from '../../shared/components/site/PageHero'
import { PageSection } from '../../shared/components/site/PageSection'

export function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Programs"
        title="Programs translate public authority into clear offers."
        description="These offers help schools, colleges, families, and institutions understand which session type fits their audience and goals."
      />

      <PageSection
        title="Program categories"
        description="These are the clearest program buckets for the first version of the platform."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programCards.map((program) => (
            <ContentCard
              key={program.title}
              title={program.title}
              description={program.description}
              meta="Program"
              tone={program.title === 'Family Guidance Programs' ? 'forest' : 'warm'}
            />
          ))}
        </div>
      </PageSection>
    </>
  )
}
