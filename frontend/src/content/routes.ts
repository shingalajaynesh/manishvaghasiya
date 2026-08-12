export const routePaths = {
  home: '/',
  about: '/about',
  photos: '/photos',
  topics: '/blog',
  blog: '/blog',
  videos: '/videos',
  resources: '/resources',
  dashboard: '/dashboard',
  reader: '/reader/:bookId',
  signIn: '/sign-in',
  signUp: '/sign-up',
  programs: '/resources',
  book: '/contact',
  contact: '/contact',
  privacy: '/privacy-policy',
  terms: '/terms-and-conditions',
  editorial: '/editorial-policy',
  corrections: '/corrections-policy',
  adDisclosure: '/ad-disclosure',
  affiliateDisclosure: '/affiliate-disclosure',
  studentGuide: '/resources/student-confidence-starter-guide',
  studentGuideThanks: '/resources/student-confidence-starter-guide/thank-you',
} as const

export const primaryNavigation = [
  { label: 'Home', labelKey: 'home', to: routePaths.home },
  { label: 'About', labelKey: 'about', to: routePaths.about },
  { label: 'Photos', labelKey: 'photos', to: routePaths.photos },
  { label: 'Blog', labelKey: 'blog', to: routePaths.blog },
  { label: 'Videos', labelKey: 'videos', to: routePaths.videos },
  { label: 'Resources', labelKey: 'resources', to: routePaths.resources },
  { label: 'Dashboard', labelKey: 'dashboard', to: routePaths.dashboard },
  { label: 'Contact', labelKey: 'contact', to: routePaths.contact },
] as const


export const footerNavigation = {
  Product: primaryNavigation.map((item) => item.label),
  Resources: ['Free PDFs', 'Videos', 'Testimonials', 'Contact'],
  Legal: ['Privacy Policy', 'Terms', 'Editorial Policy', 'Corrections', 'Ad Disclosure', 'Affiliate Disclosure'],
}
