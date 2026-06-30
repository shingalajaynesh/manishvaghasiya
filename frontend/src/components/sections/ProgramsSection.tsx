import { GraduationCap, Building, Heart, Zap } from 'lucide-react'
import { ProgramCard } from '../ui/ProgramCard'
import { SectionHeading } from '../ui/SectionHeading'
import { LazySection } from '../ui/LazySection'

const programs = [
  {
    icon: GraduationCap,
    title: 'Youth Transformation Program',
    description: 'For students facing exam pressure, self-doubt, or direction confusion. Manish helps young minds find focus, build resilience, and discover their true purpose.',
    tags: ['Students', 'Colleges', 'Schools'],
    accentColor: 'orange' as const,
    path: '/programs/youth',
  },
  {
    icon: Building,
    title: 'Corporate Motivation & Training',
    description: 'High-energy workshops for professional teams, banks, and corporate entities. Topics focus on leadership, mindset adaptation, peak performance, and team cohesion.',
    tags: ['Corporates', 'Banks', 'HR Teams'],
    accentColor: 'blue' as const,
    path: '/programs/corporate',
  },
  {
    icon: Heart,
    title: 'Parenting for Peace',
    description: "Manish's signature parenting program. Get practical tools for raising confident, emotionally healthy children while significantly strengthening family bonds.",
    tags: ['Parents', 'Families', 'Community'],
    accentColor: 'purple' as const,
    path: '/programs/parenting',
  },
  {
    icon: Zap,
    title: 'Life Coaching & Consultation',
    description: 'One-on-one and group coaching sessions for adults navigating career transitions, relationship difficulties, mental blocks, depression, and life purpose queries.',
    tags: ['Adults', '1-on-1', 'Online'],
    accentColor: 'teal' as const,
    path: '/programs',
  },
]

export function ProgramsSection() {
  return (
    <section className="bg-white section-padding border-b border-border relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeading
          eyebrow="What Manish Offers"
          title="Programs Built to Transform"
          description="Whether you are a student, parent, professional, or organization — there is a program designed for your journey."
        />

        {/* 2x2 Grid */}
        <LazySection animation="fade-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {programs.map((prog) => (
              <ProgramCard
                key={prog.title}
                icon={prog.icon}
                title={prog.title}
                description={prog.description}
                tags={prog.tags}
                accentColor={prog.accentColor}
                path={prog.path}
              />
            ))}
          </div>
        </LazySection>

      </div>
    </section>
  )
}
