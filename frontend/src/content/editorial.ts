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
      'Teenagers need active listening before correction or discipline.',
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
    excerpt: 'Practical guidance on respect, expectations, and rebuilding connection between fathers and sons.',
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
    excerpt: 'A parenting-support article centered on trust, routine, and emotional closeness between mothers and children.',
    topic: 'Parenting',
    audience: 'Parents',
    readTime: '6 min read',
    leadMagnet: 'Parenting Mistakes Gujarati Families Should Avoid',
    publishedAt: '2026-07-13',
    updatedAt: '2026-07-23',
    author: 'Manish Vaghasiya',
    keyTakeaways: [
      'Emotional safety allows children to share thoughts without fear of sudden anger.',
      'Daily dedicated non-academic conversation strengthens lifelong bonds.',
      'Mothers must balance nurturing care with encouraging independent confidence.',
    ],
    sections: [
      {
        heading: 'The foundation of mother-child trust',
        paragraphs: [
          'A mother’s influence shapes a child’s emotional security and self-perception. When a child feels unconditionally accepted at home, they develop resilience against external peer pressure and academic stress.',
          'However, daily routines often get consumed by reminders about homework, chores, and schedules, leaving little room for heart-to-heart conversations.',
        ],
      },
      {
        heading: 'Building daily emotional connection habits',
        paragraphs: [
          'Spend 15 minutes each evening talking about feelings, lighthearted topics, or daily experiences without bringing up exam marks or mistakes.',
          'Practice calm listening when a child shares a problem. When a child knows their mother won’t panic or scold immediately, they share earlier when difficulties arise.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How can working mothers maintain a strong emotional bond with children?',
        answer: 'Focus on consistent quality time over quantity. Uninterrupted daily check-ins build deep security.',
      },
    ],
  },
  {
    slug: 'how-to-reduce-stress-before-exams',
    title: 'How to reduce stress before exams',
    excerpt: 'A student-focused support piece on pressure, revision routines, and emotional steadiness during test periods.',
    topic: 'Students and Career Guidance',
    audience: 'Students',
    readTime: '6 min read',
    leadMagnet: 'Student Confidence Starter Guide',
    publishedAt: '2026-07-13',
    updatedAt: '2026-07-23',
    author: 'Manish Vaghasiya',
    keyTakeaways: [
      'Exam stress stems from perceived lack of control and fear of outcomes.',
      'Structured revision schedules with planned breaks calm anxiety naturally.',
      'Physical wellness, hydration, and steady sleep directly improve focus.',
    ],
    sections: [
      {
        heading: 'Understanding the mechanics of exam anxiety',
        paragraphs: [
          'Exams create stress when students attempt last-minute cramming or focus excessively on future results rather than the immediate task.',
          'Recognizing that exam panic is a temporary physiological reaction allows students to take control through practical study techniques.',
        ],
      },
      {
        heading: 'Actionable strategies for pre-exam calmness',
        paragraphs: [
          'Break large subjects into bite-sized 45-minute study blocks separated by 10-minute mental resets. Avoid late-night study sessions right before test day.',
          'Parents should maintain a peaceful home atmosphere and avoid adding extra expectation pressure during revision weeks.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What should a student do if panic strikes in the examination hall?',
        answer: 'Take 3 deep, slow breaths, close your eyes for 30 seconds, read the easiest question first, and regain momentum step by step.',
      },
    ],
  },
  {
    slug: 'career-confusion-after-10th-and-12th',
    title: 'Career confusion after 10th and 12th',
    excerpt: 'A decision-support article to help students and parents navigate early career uncertainty with clarity.',
    topic: 'Students and Career Guidance',
    audience: 'Students',
    readTime: '10 min read',
    leadMagnet: 'Student Confidence Starter Guide',
    publishedAt: '2026-07-13',
    updatedAt: '2026-07-23',
    author: 'Manish Vaghasiya',
    keyTakeaways: [
      'Career choices should reflect genuine aptitude and personal interest, not societal trends alone.',
      'Parents and students must explore modern career pathways beyond traditional narrow options.',
      'Step-by-step career guidance prevents costly misalignments later in life.',
    ],
    sections: [
      {
        heading: 'Navigating post-10th and 12th decision points',
        paragraphs: [
          'The transition after 10th and 12th grades is one of the most stressful phases for Indian students and parents alike. Peer pressure and high expectations often lead to hasty career selections.',
          'True clarity emerges when students evaluate their natural strengths, skill interests, and long-term learning willingness.',
        ],
      },
      {
        heading: 'Collaborative decision-making for families',
        paragraphs: [
          'Parents should serve as supportive facilitators rather than decision enforcers. Conduct research together, consult career counselors, and explore modern industry demands.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What if a student’s interest differs from family expectations?',
        answer: 'Have an open conversation supported by aptitude assessment data, course syllabus facts, and realistic career outcome research.',
      },
    ],
  },
  {
    slug: 'self-discipline-habits-for-students',
    title: 'Self-discipline habits for students',
    excerpt: 'A practical article about small routines that build long-term confidence and academic consistency.',
    topic: 'Students and Career Guidance',
    audience: 'Students',
    readTime: '7 min read',
    leadMagnet: 'Student Confidence Starter Guide',
    publishedAt: '2026-07-13',
    updatedAt: '2026-07-23',
    author: 'Manish Vaghasiya',
    keyTakeaways: [
      'Discipline is a daily muscle built through small routines, not sudden bursts of willpower.',
      'Minimizing smartphone distractions creates hours of free mental energy.',
      'Consistency outperforms temporary intensity every single time.',
    ],
    sections: [
      {
        heading: 'Why motivation fails without discipline',
        paragraphs: [
          'Motivational videos create temporary excitement, but self-discipline keeps students working when excitement fades.',
          'Developing steady habits regarding sleep, study blocks, and exercise creates long-term mental resilience.',
        ],
      },
      {
        heading: 'Four core habits for daily student success',
        paragraphs: [
          '1. Fixed wake-up time to anchor circadian rhythm.\n2. Study environment free from digital notifications.\n3. Daily task listing prioritised by importance.\n4. Evening reflection on progress made.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How long does it take to form a new discipline habit?',
        answer: 'Research shows habits take between 21 to 66 days of consistent practice to become natural routines.',
      },
    ],
  },
  {
    slug: 'common-parenting-mistakes-in-indian-homes',
    title: 'Common parenting mistakes in Indian homes',
    excerpt: 'A direct and practical post designed to help parents identify emotional blind spots and cultivate healthier family dynamics.',
    topic: 'Parenting',
    audience: 'Parents',
    readTime: '8 min read',
    leadMagnet: 'Parenting Mistakes Gujarati Families Should Avoid',
    publishedAt: '2026-07-13',
    updatedAt: '2026-07-23',
    author: 'Manish Vaghasiya',
    keyTakeaways: [
      'Over-protectiveness can unknowingly stifle a child’s problem-solving skills.',
      'Equating love with academic marks damages a child’s intrinsic motivation.',
      'Open dialogue fosters far greater respect than rigid authoritarian rules.',
    ],
    sections: [
      {
        heading: 'Identifying well-intentioned parenting patterns',
        paragraphs: [
          'Indian parents pour immense sacrifice into their children’s futures. However, certain traditional habits—such as public comparison or emotional guilt—can undermine a child’s confidence.',
          'Recognizing these patterns is not about blame; it is about adopting healthier communication for modern family challenges.',
        ],
      },
      {
        heading: 'Shifting from control to guidance',
        paragraphs: [
          'Allow children to make age-appropriate choices and experience natural consequences. This builds self-reliance and deep trust in parental support.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How can parents handle disagreement without shouting?',
        answer: 'Establish a rule to pause heated discussions for 10 minutes. Resume when both parent and child have calm emotional states.',
      },
    ],
  },
  {
    slug: 'how-to-handle-anger-in-relationships',
    title: 'How to handle anger in relationships',
    excerpt: 'A relationship article focused on repair, patience, and emotionally intelligent communication inside the family.',
    topic: 'Family Relationships',
    audience: 'Families',
    readTime: '9 min read',
    leadMagnet: '21 Family Communication Tips',
    publishedAt: '2026-07-13',
    updatedAt: '2026-07-23',
    author: 'Manish Vaghasiya',
    keyTakeaways: [
      'Anger is usually a protective cover for hurt, fear, or unfulfilled needs.',
      'Pausing before responding prevents hurtful words that break long-term trust.',
      'Conflict resolution requires seeking understanding rather than proving victory.',
    ],
    sections: [
      {
        heading: 'De-escalating emotional tension in marriage and family',
        paragraphs: [
          'Anger flares up when individuals feel misunderstood or undervalued in family conversations. When emotions take over, logic retreats.',
          'Learning emotional regulation techniques allows family members to express disagreements constructively without destroying relationship warmth.',
        ],
      },
      {
        heading: 'Practical tools for managing relationship anger',
        paragraphs: [
          'Use "I feel" statements instead of accusatory "You always" statements. Take structured cooling-off timeouts when tempers rise.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the best way to apologize after a heated argument?',
        answer: 'Acknowledge the specific behavior or harsh tone, express genuine regret without making excuses, and state how you will communicate better next time.',
      },
    ],
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
