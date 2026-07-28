const publicImage = (folder: string, file: string) => encodeURI(`/manish/${folder}/${file}`)

const mainPortraits = [
  publicImage('MAIN photo', '1I2A3537.jpg'),
  publicImage('MAIN photo', '1I2A3642.jpg'),
  publicImage('MAIN photo', '1I2A3677.jpg'),
  publicImage('MAIN photo', '1I2A3897.jpg'),
  publicImage('MAIN photo', '1Q2A4315.JPG'),
  publicImage('MAIN photo', '1Q2A4319.JPG'),
  publicImage('MAIN photo', '1Q2A4325.JPG'),
  publicImage('MAIN photo', '1Q2A4355.JPG'),
  publicImage('MAIN photo', 'KPCL5172.JPG'),
]

const crowdPhotos = [
  publicImage('Crowd PHOTO', '1I2A3376.jpg'),
  publicImage('Crowd PHOTO', '1I2A3456.jpg'),
  publicImage('Crowd PHOTO', '1I2A3593.jpg'),
  publicImage('Crowd PHOTO', '1I2A3594.jpg'),
  publicImage('Crowd PHOTO', '1I2A3724.jpg'),
  publicImage('Crowd PHOTO', '1I2A3805.jpg'),
  publicImage('Crowd PHOTO', 'A21I9976.JPG'),
  publicImage('Crowd PHOTO', 'A21I9980.JPG'),
]

const momentsPhotos = [
  publicImage('MOMENTS PHOTO', '1I2A3781.jpg'),
  publicImage('MOMENTS PHOTO', '1I2A3785.jpg'),
  publicImage('MOMENTS PHOTO', '1I2A3828.jpg'),
  publicImage('MOMENTS PHOTO', '1I2A3837.jpg'),
  publicImage('MOMENTS PHOTO', '1I2A3840.jpg'),
  publicImage('MOMENTS PHOTO', '1I2A3875.jpg'),
  publicImage('MOMENTS PHOTO', '1I2A3882.jpg'),
  publicImage('MOMENTS PHOTO', '1I2A3885.jpg'),
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
  heroStage: mainPortraits[8],
  heroSupport: crowdPhotos[4],
  aboutPortrait: mainPortraits[3],
  footerPortrait: mainPortraits[5],
  homePreview: [mainPortraits[1], crowdPhotos[2], crowdPhotos[5], momentsPhotos[1]],
  mainPortraits,
  crowdPhotos,
  momentsPhotos,
  allPhotos: [...mainPortraits, ...crowdPhotos, ...momentsPhotos],
  featuredVideos,
} as const
