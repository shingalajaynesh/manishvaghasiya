import { createBrowserRouter } from 'react-router-dom'
import { routePaths } from '../content/routes'
import { AboutPage } from '../pages/about/AboutPage'
import { ArticlePage } from '../pages/blog/ArticlePage'
import { BlogPage } from '../pages/blog/BlogPage'
import { BookManishPage } from '../pages/book/BookManishPage'
import { ContactPage } from '../pages/contact/ContactPage'
import { HomePage } from '../pages/home/HomePage'
import { LegalPage } from '../pages/legal/LegalPage'
import { PhotosPage } from '../pages/photos/PhotosPage'
import { ProgramsPage } from '../pages/programs/ProgramsPage'
import { ResourceLandingPage } from '../pages/resources/ResourceLandingPage'
import { ResourceThankYouPage } from '../pages/resources/ResourceThankYouPage'
import { ResourcesPage } from '../pages/resources/ResourcesPage'
import { TopicHubPage } from '../pages/topics/TopicHubPage'
import { TopicsPage } from '../pages/topics/TopicsPage'
import { VideosPage } from '../pages/videos/VideosPage'
import { SiteLayout } from '../shared/components/layout/SiteLayout'
import { legalDrafts } from '../content/legal'

export const router = createBrowserRouter([
  {
    path: routePaths.home,
    element: <SiteLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: routePaths.about.slice(1), element: <AboutPage /> },
      { path: routePaths.photos.slice(1), element: <PhotosPage /> },
      { path: routePaths.topics.slice(1), element: <TopicsPage /> },
      { path: `${routePaths.topics.slice(1)}/:slug`, element: <TopicHubPage /> },
      { path: routePaths.blog.slice(1), element: <BlogPage /> },
      { path: `${routePaths.blog.slice(1)}/:slug`, element: <ArticlePage /> },
      { path: routePaths.videos.slice(1), element: <VideosPage /> },
      { path: routePaths.resources.slice(1), element: <ResourcesPage /> },
      { path: routePaths.studentGuide.slice(1), element: <ResourceLandingPage /> },
      { path: routePaths.studentGuideThanks.slice(1), element: <ResourceThankYouPage /> },
      { path: routePaths.programs.slice(1), element: <ProgramsPage /> },
      { path: routePaths.book.slice(1), element: <BookManishPage /> },
      { path: routePaths.contact.slice(1), element: <ContactPage /> },
      {
        path: routePaths.privacy.slice(1),
        element: (
          <LegalPage
            eyebrow="Privacy Policy"
            title="Privacy and data use should be clear before monetization starts."
            description="This page will explain what information is collected, why it is collected, and how users can contact the site about privacy questions."
            sections={legalDrafts.privacy}
          />
        ),
      },
      {
        path: routePaths.terms.slice(1),
        element: (
          <LegalPage
            eyebrow="Terms and Conditions"
            title="Terms help define how the site, content, and offers can be used."
            description="This page will set expectations around content use, liabilities, user responsibilities, and platform interactions."
            sections={legalDrafts.terms}
          />
        ),
      },
      {
        path: routePaths.editorial.slice(1),
        element: (
          <LegalPage
            eyebrow="Editorial Policy"
            title="Editorial standards are part of long-term trust and SEO quality."
            description="This page will explain how articles are selected, written, reviewed, and updated so the platform is not perceived as low-trust AI content."
            sections={legalDrafts.editorial}
          />
        ),
      },
      {
        path: routePaths.corrections.slice(1),
        element: (
          <LegalPage
            eyebrow="Corrections Policy"
            title="A corrections policy signals accountability and content maturity."
            description="This page will describe how factual issues are reviewed, fixed, and documented when necessary."
            sections={legalDrafts.corrections}
          />
        ),
      },
      {
        path: routePaths.adDisclosure.slice(1),
        element: (
          <LegalPage
            eyebrow="Ad Disclosure"
            title="Ads and affiliate relationships should be explained clearly and early."
            description="This page will explain how the site handles advertising, sponsored placements, and monetized recommendations."
            sections={legalDrafts.adDisclosure}
          />
        ),
      },
      {
        path: routePaths.affiliateDisclosure.slice(1),
        element: (
          <LegalPage
            eyebrow="Affiliate Disclosure"
            title="Affiliate recommendations should stay relevant, transparent, and user-first."
            description="This page will explain how the site may earn from carefully selected product recommendations without compromising trust."
            sections={legalDrafts.affiliateDisclosure}
          />
        ),
      },
    ],
  },
])
