import React, { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

// Lazy loaded page components
const Home = React.lazy(() => import('./pages/Home'))
const About = React.lazy(() => import('./pages/About'))
const Programs = React.lazy(() => import('./pages/Programs'))
const Testimonials = React.lazy(() => import('./pages/Testimonials'))
const Podcast = React.lazy(() => import('./pages/Podcast'))
const Media = React.lazy(() => import('./pages/Media'))
const Blog = React.lazy(() => import('./pages/Blog'))
const Gallery = React.lazy(() => import('./pages/Gallery'))
const BookSpeaker = React.lazy(() => import('./pages/BookSpeaker'))
const Contact = React.lazy(() => import('./pages/Contact'))

// Modern Page Loader
const PageLoader = () => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="w-8 h-8 border-3 border-accent-blue border-t-transparent rounded-full animate-spin" />
  </div>
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Suspense fallback={<PageLoader />}><Home /></Suspense>
  },
  {
    path: '/about',
    element: <Suspense fallback={<PageLoader />}><About /></Suspense>
  },
  {
    path: '/programs',
    element: <Suspense fallback={<PageLoader />}><Programs /></Suspense>
  },
  {
    path: '/programs/:programId',
    element: <Suspense fallback={<PageLoader />}><Programs /></Suspense>
  },
  {
    path: '/testimonials',
    element: <Suspense fallback={<PageLoader />}><Testimonials /></Suspense>
  },
  {
    path: '/podcast',
    element: <Suspense fallback={<PageLoader />}><Podcast /></Suspense>
  },
  {
    path: '/media',
    element: <Suspense fallback={<PageLoader />}><Media /></Suspense>
  },
  {
    path: '/blog',
    element: <Suspense fallback={<PageLoader />}><Blog /></Suspense>
  },
  {
    path: '/gallery',
    element: <Suspense fallback={<PageLoader />}><Gallery /></Suspense>
  },
  {
    path: '/book-speaker',
    element: <Suspense fallback={<PageLoader />}><BookSpeaker /></Suspense>
  },
  {
    path: '/contact',
    element: <Suspense fallback={<PageLoader />}><Contact /></Suspense>
  },
  {
    path: '*',
    element: <Suspense fallback={<PageLoader />}><Home /></Suspense>
  }
])
