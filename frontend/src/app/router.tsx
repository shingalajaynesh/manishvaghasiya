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
            title="Our commitment to protecting your privacy and personal data."
            description="This policy outlines how manishvaghasiya.com collects, uses, and safeguards reader data and cookie preferences."
            sections={legalDrafts.privacy}
          />
        ),
      },
      {
        path: routePaths.terms.slice(1),
        element: (
          <LegalPage
            eyebrow="Terms and Conditions"
            title="Terms of use governing our website content and educational services."
            description="These terms outline the rules, intellectual property rights, and user responsibilities when accessing manishvaghasiya.com."
            sections={legalDrafts.terms}
          />
        ),
      },
      {
        path: routePaths.editorial.slice(1),
        element: (
          <LegalPage
            eyebrow="Editorial Policy"
            title="Our editorial standards for original, high-trust content."
            description="Learn how our articles, guides, and educational materials are researched, written, and verified for quality."
            sections={legalDrafts.editorial}
          />
        ),
      },
      {
        path: routePaths.corrections.slice(1),
        element: (
          <LegalPage
            eyebrow="Corrections Policy"
            title="Accountability and procedures for content accuracy."
            description="How we handle factual corrections, update article timestamps, and review reader reports."
            sections={legalDrafts.corrections}
          />
        ),
      },
      {
        path: routePaths.adDisclosure.slice(1),
        element: (
          <LegalPage
            eyebrow="Ad Disclosure"
            title="Transparency in advertising and network placements."
            description="Details on how Google AdSense and authorized ad networks operate on our platform."
            sections={legalDrafts.adDisclosure}
          />
        ),
      },
      {
        path: routePaths.affiliateDisclosure.slice(1),
        element: (
          <LegalPage
            eyebrow="Affiliate Disclosure"
            title="Transparent recommendations and affiliate relationship notices."
            description="Information regarding potential commissions earned through recommended books and educational tools."
            sections={legalDrafts.affiliateDisclosure}
          />
        ),
      },
    ],
  },
])
