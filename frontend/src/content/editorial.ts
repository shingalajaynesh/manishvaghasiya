export interface ArticleSummary {
  slug: string
  title: string
  excerpt: string
  topic: string
  audience: string
  readTime: string
  leadMagnet: string
  publishedAt: string
  updatedAt: string
  author: string
  sections?: Array<{
    heading: string
    paragraphs: string[]
  }>
  keyTakeaways?: string[]
  faqs?: Array<{
    question: string
    answer: string
  }>
}

export interface TopicHub {
  slug: string
  title: string
  description: string
  pillarArticleSlug: string
  resourceTitle: string
  conversionTitle: string
  supportingArticleSlugs: string[]
}

export const articles: ArticleSummary[] = [
  {
    slug: 'how-parents-can-better-understand-teenagers',
    title: 'How parents can better understand teenagers',
    excerpt: 'A pillar article for the parenting hub focused on empathy, communication, and emotional support.',
    topic: 'Parenting',
    audience: 'Parents',
    readTime: '9 min read',
    leadMagnet: 'Parenting Mistakes Gujarati Families Should Avoid',
    publishedAt: '2026-07-13',
    updatedAt: '2026-07-13',
    author: 'Manish Vaghasiya Team',
    keyTakeaways: [
      'Teenagers need listening before correction.',
      'Frequent comparison breaks trust faster than most parents realize.',
      'Calm routines and respectful conversation matter more than dramatic lectures.',
    ],
    sections: [
      {
        heading: 'Why teenagers feel misunderstood',
        paragraphs: [
          'Teenagers are living in a phase where emotions change quickly, identity is still forming, and pressure from studies, friends, and expectations keeps building. Many parents see the attitude but do not see the confusion underneath it.',
          'When every conversation becomes advice, warning, or judgment, teenagers stop sharing honestly. They begin protecting themselves instead of opening up.',
        ],
      },
      {
        heading: 'What parents often do wrong',
        paragraphs: [
          'The most common mistake is assuming that authority automatically creates understanding. It may create obedience for a short time, but it rarely creates emotional trust.',
          'Constant comparison, immediate scolding, and dismissing feelings with phrases like "this is nothing" make children feel unseen. Once that habit forms, even good advice starts sounding like pressure.',
        ],
      },
      {
        heading: 'A better communication pattern',
        paragraphs: [
          'Start by asking calmer questions. Instead of "Why are you behaving like this?" ask "What has been difficult for you lately?" That small change shifts the tone from attack to support.',
          'Parents should also separate correction from connection. First create safety, then discuss discipline, routines, or expectations. Teenagers receive guidance better when they feel respected.',
        ],
      },
      {
        heading: 'Practical habits that help',
        paragraphs: [
          'Create one daily or weekly moment where there is no lecture and no performance pressure. A short walk, tea break, or casual drive can open better conversations than a formal family meeting.',
          'Notice effort, not only mistakes. When parents acknowledge effort, teenagers feel seen for who they are becoming, not only judged for what they have not yet achieved.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How can parents start rebuilding trust with a teenager?',
        answer: 'Start with calmer conversations, fewer assumptions, and consistent respect. Trust returns when teenagers feel heard without immediate punishment or comparison.',
      },
      {
        question: 'Should parents stop correcting teenagers?',
        answer: 'No. Correction still matters, but timing and tone matter more. Connection should come before correction whenever possible.',
      },
    ],
  },
  {
    slug: 'why-family-communication-breaks-down',
    title: 'Why family communication breaks down',
    excerpt: 'A family relationships guide around misunderstanding, assumptions, and repair.',
    topic: 'Family Relationships',
    audience: 'Families',
    readTime: '8 min read',
    leadMagnet: '21 Family Communication Tips',
    publishedAt: '2026-07-13',
    updatedAt: '2026-07-13',
    author: 'Manish Vaghasiya Team',
    keyTakeaways: [
      'Most family conflict starts with assumptions, not facts.',
      'People stop listening when every conversation feels unsafe.',
      'Repair requires patience, not just one emotional discussion.',
    ],
    sections: [
      {
        heading: 'Why communication fails in good families too',
        paragraphs: [
          'Communication problems do not only happen in broken families. They also happen in loving homes where people are tired, emotionally reactive, or too used to speaking without really listening.',
          'Many families speak every day but still do not understand each other. Talking is not the same as communicating with care.',
        ],
      },
      {
        heading: 'The role of assumptions',
        paragraphs: [
          'Family members often think they already know what the other person means. That creates fast reactions and weak listening.',
          'Instead of asking for clarity, people defend themselves early. Once that pattern starts, ordinary discussions quickly become emotional conflicts.',
        ],
      },
      {
        heading: 'How tone changes everything',
        paragraphs: [
          'A correct point delivered with a harsh tone is often heard as disrespect. Families remember emotional experience more than logical wording.',
          'Lowering the volume, slowing the speed of a conversation, and choosing the right time can prevent unnecessary damage.',
        ],
      },
      {
        heading: 'A practical repair method',
        paragraphs: [
          'When conflict happens, begin with one honest sentence: "I want to understand, not only defend myself." That changes the atmosphere immediately.',
          'Then ask one question, reflect what you heard, and respond only after the other person feels understood. Families heal when people feel safe enough to be honest.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Why do simple family discussions become arguments?',
        answer: 'Because people react to tone, history, and assumptions, not only the words being spoken. Unresolved emotions often enter ordinary conversations.',
      },
      {
        question: 'What is the first step to improve family communication?',
        answer: 'Slow conversations down and replace assumptions with questions. Clarity reduces defensiveness.',
      },
    ],
  },
  {
    slug: 'how-students-can-build-confidence-after-failure',
    title: 'How students can build confidence after failure',
    excerpt: 'A student confidence article about recovery, self-worth, and moving forward after setbacks.',
    topic: 'Students and Career Guidance',
    audience: 'Students',
    readTime: '7 min read',
    leadMagnet: 'Student Confidence Starter Guide',
    publishedAt: '2026-07-13',
    updatedAt: '2026-07-13',
    author: 'Manish Vaghasiya Team',
    keyTakeaways: [
      'Failure is an event, not an identity.',
      'Confidence returns through action, not only motivation.',
      'Students need structure, support, and self-respect after setbacks.',
    ],
    sections: [
      {
        heading: 'Why failure hits confidence so hard',
        paragraphs: [
          'Students often connect marks, results, or rejection directly to self-worth. When one outcome goes badly, they begin to feel that they themselves are not enough.',
          'This is why failure can produce silence, shame, anger, and withdrawal. The real problem is not just the result. It is the meaning the student gives to the result.',
        ],
      },
      {
        heading: 'What students should remember first',
        paragraphs: [
          'Failure is feedback, not a final identity. One bad result cannot measure intelligence, discipline, or future potential completely.',
          'The student must first separate "I failed in this attempt" from "I am a failure." That mental shift is the beginning of recovery.',
        ],
      },
      {
        heading: 'How confidence is rebuilt',
        paragraphs: [
          'Confidence does not come back only through positive words. It returns when students complete small actions again: waking on time, studying one focused hour, asking for help, and restarting a routine.',
          'Progress after failure should be small and visible. Tiny wins are psychologically powerful because they rebuild trust in the self.',
        ],
      },
      {
        heading: 'The support parents and mentors should give',
        paragraphs: [
          'Students recovering from failure need guidance without humiliation. Advice works better when it is combined with patience and emotional safety.',
          'Instead of asking only about marks, ask about mindset, energy, confusion, and fear. Many students do not need more pressure. They need steadier support.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How long does it take for confidence to return after failure?',
        answer: 'It depends on the student, but confidence usually returns gradually through small consistent actions rather than one motivational moment.',
      },
      {
        question: 'What should parents avoid saying after a bad result?',
        answer: 'Avoid comparison, shame, and dramatic predictions. These increase fear and reduce the willingness to restart.',
      },
    ],
  },
  {
    slug: 'father-and-son-relationship-problems-and-solutions',
    title: 'Father and son relationship problems and solutions',
    excerpt: 'Practical guidance on respect, expectations, and rebuilding connection.',
    topic: 'Family Relationships',
    audience: 'Families',
    readTime: '8 min read',
    leadMagnet: '21 Family Communication Tips',
    publishedAt: '2026-07-13',
    updatedAt: '2026-07-13',
    author: 'Manish Vaghasiya Team',
  },
  {
    slug: 'mother-child-emotional-bonding-habits',
    title: 'Mother-child emotional bonding habits',
    excerpt: 'A parenting-support article centered on trust, routine, and emotional closeness.',
    topic: 'Parenting',
    audience: 'Parents',
    readTime: '6 min read',
    leadMagnet: 'Parenting Mistakes Gujarati Families Should Avoid',
    publishedAt: '2026-07-13',
    updatedAt: '2026-07-13',
    author: 'Manish Vaghasiya Team',
  },
  {
    slug: 'how-to-reduce-stress-before-exams',
    title: 'How to reduce stress before exams',
    excerpt: 'A student-focused support piece on pressure, routine, and emotional steadiness.',
    topic: 'Students and Career Guidance',
    audience: 'Students',
    readTime: '6 min read',
    leadMagnet: 'Student Confidence Starter Guide',
    publishedAt: '2026-07-13',
    updatedAt: '2026-07-13',
    author: 'Manish Vaghasiya Team',
  },
  {
    slug: 'career-confusion-after-10th-and-12th',
    title: 'Career confusion after 10th and 12th',
    excerpt: 'A decision-support article to help students and parents navigate early career uncertainty.',
    topic: 'Students and Career Guidance',
    audience: 'Students',
    readTime: '10 min read',
    leadMagnet: 'Student Confidence Starter Guide',
    publishedAt: '2026-07-13',
    updatedAt: '2026-07-13',
    author: 'Manish Vaghasiya Team',
  },
  {
    slug: 'self-discipline-habits-for-students',
    title: 'Self-discipline habits for students',
    excerpt: 'A practical article about small routines that improve confidence and consistency.',
    topic: 'Habits and Discipline',
    audience: 'Students',
    readTime: '7 min read',
    leadMagnet: '30-Day Positive Habit Tracker',
    publishedAt: '2026-07-13',
    updatedAt: '2026-07-13',
    author: 'Manish Vaghasiya Team',
  },
  {
    slug: 'common-parenting-mistakes-in-indian-homes',
    title: 'Common parenting mistakes in Indian homes',
    excerpt: 'A direct and practical post designed for search, emotional resonance, and lead capture.',
    topic: 'Parenting',
    audience: 'Parents',
    readTime: '8 min read',
    leadMagnet: 'Parenting Mistakes Gujarati Families Should Avoid',
    publishedAt: '2026-07-13',
    updatedAt: '2026-07-13',
    author: 'Manish Vaghasiya Team',
  },
  {
    slug: 'how-to-handle-anger-in-relationships',
    title: 'How to handle anger in relationships',
    excerpt: 'A relationship article focused on repair, patience, and emotionally intelligent communication.',
    topic: 'Marriage and Communication',
    audience: 'Families',
    readTime: '9 min read',
    leadMagnet: '21 Family Communication Tips',
    publishedAt: '2026-07-13',
    updatedAt: '2026-07-13',
    author: 'Manish Vaghasiya Team',
  },
]

export const topicHubs: TopicHub[] = [
  {
    slug: 'parenting',
    title: 'Parenting',
    description: 'Supportive, practical guidance for understanding children better and improving communication at home.',
    pillarArticleSlug: 'how-parents-can-better-understand-teenagers',
    resourceTitle: 'Parenting Mistakes Gujarati Families Should Avoid',
    conversionTitle: 'Parenting Workshop',
    supportingArticleSlugs: [
      'mother-child-emotional-bonding-habits',
      'common-parenting-mistakes-in-indian-homes',
      'how-to-reduce-stress-before-exams',
    ],
  },
  {
    slug: 'family-relationships',
    title: 'Family Relationships',
    description: 'Articles for building trust, respect, listening, and emotional repair across family relationships.',
    pillarArticleSlug: 'why-family-communication-breaks-down',
    resourceTitle: '21 Family Communication Tips',
    conversionTitle: 'Family Guidance Program',
    supportingArticleSlugs: [
      'father-and-son-relationship-problems-and-solutions',
      'how-to-handle-anger-in-relationships',
    ],
  },
  {
    slug: 'students-and-career-guidance',
    title: 'Students and Career Guidance',
    description: 'Confidence, career direction, exam stress, and emotional support for teenagers and young adults.',
    pillarArticleSlug: 'how-students-can-build-confidence-after-failure',
    resourceTitle: 'Student Confidence Starter Guide',
    conversionTitle: 'Student Seminar Program',
    supportingArticleSlugs: [
      'how-to-reduce-stress-before-exams',
      'career-confusion-after-10th-and-12th',
      'self-discipline-habits-for-students',
    ],
  },
]

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug)
}

export function getTopicHubBySlug(slug: string) {
  return topicHubs.find((hub) => hub.slug === slug)
}
