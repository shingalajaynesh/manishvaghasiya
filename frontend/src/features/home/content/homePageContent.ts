import { routePaths } from '../../../content/routes'

export const homeHero = {
  eyebrow: 'Gujarati-first life guidance platform',
  title: 'Practical guidance for students, parents, and families from Manish Vaghasiya.',
  description:
    "Built from Manish Vaghasiya's public authority, this platform brings together helpful articles, seminar insights, free resources, and booking pathways in one trusted place.",
  primaryCta: {
    label: 'Explore Topics',
    to: routePaths.topics,
  },
  secondaryCta: {
    label: 'Get Free Resources',
    to: routePaths.studentGuide,
  },
}

export const socialProof = [
  { value: '1.5M+', label: 'Instagram followers' },
  { value: '192K+', label: 'YouTube subscribers' },
  { value: '4500+', label: 'Programs conducted' },
  { value: 'Surat', label: 'Primary public base' },
]

export const audiencePaths = [
  {
    title: 'For Students',
    description:
      'Confidence, exam pressure, habits, career direction, and emotional steadiness for teenagers and young adults.',
    cta: 'Explore student guidance',
    to: '/topics/students-and-career-guidance',
  },
  {
    title: 'For Parents',
    description:
      'Supportive articles and workshops around communication, discipline, emotional support, and understanding teenagers better.',
    cta: 'Open parenting hub',
    to: '/topics/parenting',
  },
  {
    title: 'For Families',
    description:
      'Relationship guidance around respect, communication, trust repair, marriage conversations, and home culture.',
    cta: 'View family hub',
    to: '/topics/family-relationships',
  },
  {
    title: 'For Organizers',
    description:
      'Seminar formats, program outcomes, credibility signals, and clear contact options for institutions and event teams.',
    cta: 'Book Manish',
    to: routePaths.book,
  },
] as const

export const featuredLessons = [
  'How parents can better understand teenagers',
  'Why family communication breaks down',
  'How students can build confidence after failure',
]

export const homeResources = [
  {
    title: 'Student Confidence Starter Guide',
    description: 'A practical free PDF for students facing self-doubt, failure, or study pressure.',
    to: routePaths.studentGuide,
  },
  {
    title: '21 Family Communication Tips',
    description: 'A family-focused resource designed to turn emotional advice into everyday habits.',
    to: routePaths.resources,
  },
  {
    title: 'Parenting Mistakes Gujarati Families Should Avoid',
    description: 'A topic-aligned guide that supports both search traffic and a parenting workshop funnel.',
    to: routePaths.resources,
  },
] as const

export const programHighlights = [
  {
    title: 'Student Seminars',
    description:
      'Programs focused on confidence, discipline, exam mindset, direction, and personal responsibility.',
  },
  {
    title: 'Parenting Workshops',
    description:
      'Sessions that help parents communicate better, reduce conflict, and support children with more emotional awareness.',
  },
  {
    title: 'Family Guidance Programs',
    description:
      'Practical sessions on trust, relationships, communication, values, and healthier family culture.',
  },
] as const

export const testimonials = [
  {
    quote:
      'The strongest version of this platform combines trust, content, and conversion instead of behaving like a temporary speaker page.',
    source: 'Phase 1 strategic direction',
  },
  {
    quote:
      'The site should answer real student, parent, and family questions with warmth, clarity, and useful next steps.',
    source: 'Editorial product principle',
  },
  {
    quote:
      'Booking, resources, and articles should work together so social attention becomes owned audience and future revenue.',
    source: 'Growth and monetization principle',
  },
] as const
