import { routePaths } from '../../content/routes'

/**
 * Routes explicitly allowed to display Google AdSense ads.
 * Default is FALSE for all unlisted, transactional, private, form, or utility routes.
 */
export const ADS_ALLOWED_ROUTES: string[] = [
  routePaths.home,
  routePaths.about,
  routePaths.photos,
  routePaths.blog,
  routePaths.videos,
  routePaths.resources,
]

/**
 * Dynamic route prefix rules allowed for ads
 */
export const ADS_ALLOWED_PREFIXES: string[] = [
  '/blog/',
]

/**
 * Routes explicitly forbidden from showing ads under Google AdSense policies:
 * - Login, signup, account pages
 * - Legal policies / disclaimers
 * - Contact forms & thank-you pages
 * - Private dashboards or admin screens
 */
export const ADS_FORBIDDEN_ROUTES: string[] = [
  routePaths.contact,
  routePaths.studentGuide,
  routePaths.studentGuideThanks,
  routePaths.privacy,
  routePaths.terms,
  routePaths.editorial,
  routePaths.corrections,
  routePaths.adDisclosure,
  routePaths.affiliateDisclosure,
]

export function isAdEligibleRoute(pathname: string): boolean {
  const cleanPath = pathname.split('?')[0].split('#')[0]

  // Check explicit forbidden list first
  if (ADS_FORBIDDEN_ROUTES.some((route) => cleanPath === route || cleanPath.endsWith('/thank-you'))) {
    return false
  }

  // Check exact allowed list
  if (ADS_ALLOWED_ROUTES.includes(cleanPath)) {
    return true
  }

  // Check allowed prefix rules (e.g. /blog/article-slug)
  if (ADS_ALLOWED_PREFIXES.some((prefix) => cleanPath.startsWith(prefix))) {
    return true
  }

  // Default to FALSE for unknown routes
  return false
}
