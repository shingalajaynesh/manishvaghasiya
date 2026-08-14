const optImage = (file: string) => `/manish/opt/${file}`

const mainPortraits = [
  optImage('main-1.webp'),
  optImage('main-2.webp'),
  optImage('main-3.webp'),
  optImage('about-portrait.webp'),
  optImage('main-4.webp'),
  optImage('main-5.webp'),
  optImage('main-6.webp'),
  optImage('hero-stage.webp'),
]

const crowdPhotos = [
  optImage('crowd-1.webp'),
  optImage('crowd-2.webp'),
  optImage('crowd-3.webp'),
  optImage('crowd-4.webp'),
  optImage('hero-support.webp'),
  optImage('crowd-5.webp'),
  optImage('crowd-6.webp'),
  optImage('crowd-7.webp'),
]

const momentsPhotos = [
  optImage('moments-1.webp'),
  optImage('moments-2.webp'),
  optImage('moments-3.webp'),
  optImage('moments-4.webp'),
  optImage('moments-5.webp'),
  optImage('moments-6.webp'),
  optImage('moments-7.webp'),
  optImage('moments-8.webp'),
]

export interface FeaturedVideo {
  id: string
  title: string
  category: string
  duration: string
  description: string
  youtubeUrl: string
  embedUrl: string
}

export const featuredVideos: FeaturedVideo[] = [
  {
    id: 'talk-1',
    title: 'How Parents Can Better Understand Teenagers',
    category: 'Parenting & Family',
    duration: '14:20',
    description: 'Manish Vaghasiya shares practical insights on breaking down communication barriers between parents and teenage children.',
    youtubeUrl: 'https://www.youtube.com/watch?v=1qqO-uouvSg',
    embedUrl: 'https://www.youtube-nocookie.com/embed/1qqO-uouvSg',
  },
  {
    id: 'talk-2',
    title: 'Building Unshakeable Student Confidence After Failure',
    category: 'Student Guidance',
    duration: '18:45',
    description: 'A live seminar keynote on transforming academic setbacks and exam stress into daily self-discipline and mental strength.',
    youtubeUrl: 'https://www.youtube.com/watch?v=WGY-cvRR71U',
    embedUrl: 'https://www.youtube-nocookie.com/embed/WGY-cvRR71U',
  },
  {
    id: 'talk-3',
    title: 'Resolving Emotional Tension & Anger in Family Relationships',
    category: 'Family Relationships',
    duration: '12:10',
    description: 'Key principles of calm communication, listening habits, and emotional repair for Gujarati households.',
    youtubeUrl: 'https://www.youtube.com/watch?v=iw1cys9NQYo',
    embedUrl: 'https://www.youtube-nocookie.com/embed/iw1cys9NQYo',
  },
  {
    id: 'talk-4',
    title: 'Career Confusion After 10th & 12th — Choosing the Right Path',
    category: 'Career Guidance',
    duration: '22:05',
    description: 'Practical guidance for students and parents navigating early career choices and overcoming peer pressure.',
    youtubeUrl: 'https://www.youtube.com/watch?v=fhCA9kmyo9c',
    embedUrl: 'https://www.youtube-nocookie.com/embed/fhCA9kmyo9c',
  },
]

export const speakerMedia = {
  heroStage: optImage('hero-stage.webp'),
  heroSupport: optImage('hero-support.webp'),
  aboutPortrait: optImage('about-portrait.webp'),
  footerPortrait: optImage('footer-portrait.webp'),
  homePreview: [optImage('main-2.webp'), optImage('crowd-3.webp'), optImage('crowd-6.webp'), optImage('moments-2.webp')],
  mainPortraits,
  crowdPhotos,
  momentsPhotos,
  allPhotos: [...mainPortraits, ...crowdPhotos, ...momentsPhotos],
  featuredVideos,
} as const
