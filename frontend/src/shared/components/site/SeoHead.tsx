import { useEffect } from 'react'

export interface SeoHeadProps {
  title: string
  description: string
  canonicalUrl?: string
  ogImage?: string
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

export function SeoHead({
  title,
  description,
  canonicalUrl,
  ogImage = 'https://www.manishvaghasiya.com/og-image.jpg',
  jsonLd,
}: SeoHeadProps) {
  useEffect(() => {
    // 1. Update document title
    const fullTitle = title.includes('Manish Vaghasiya')
      ? title
      : `${title} | Manish Vaghasiya`
    document.title = fullTitle

    // Helper to update meta tag content
    const updateMeta = (selector: string, content: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null
      if (!el) {
        el = document.createElement('meta')
        if (selector.startsWith('meta[name=')) {
          const name = selector.match(/name="([^"]+)"/)?.[1]
          if (name) el.setAttribute('name', name)
        } else if (selector.startsWith('meta[property=')) {
          const prop = selector.match(/property="([^"]+)"/)?.[1]
          if (prop) el.setAttribute('property', prop)
        }
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    // 2. Meta description
    updateMeta('meta[name="description"]', description)

    // 3. OpenGraph & Twitter
    updateMeta('meta[property="og:title"]', fullTitle)
    updateMeta('meta[property="og:description"]', description)
    updateMeta('meta[property="og:image"]', ogImage)
    updateMeta('meta[name="twitter:title"]', fullTitle)
    updateMeta('meta[name="twitter:description"]', description)
    updateMeta('meta[name="twitter:image"]', ogImage)

    // 4. Canonical URL
    const targetUrl = canonicalUrl || window.location.href
    let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonicalEl) {
      canonicalEl = document.createElement('link')
      canonicalEl.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalEl)
    }
    canonicalEl.setAttribute('href', targetUrl)

    // 5. Dynamic JSON-LD structured data
    let scriptEl = document.getElementById('dynamic-seo-jsonld') as HTMLScriptElement | null
    if (jsonLd) {
      if (!scriptEl) {
        scriptEl = document.createElement('script')
        scriptEl.id = 'dynamic-seo-jsonld'
        scriptEl.type = 'application/ld+json'
        document.head.appendChild(scriptEl)
      }
      scriptEl.textContent = JSON.stringify(jsonLd)
    } else if (scriptEl) {
      scriptEl.remove()
    }
  }, [title, description, canonicalUrl, ogImage, jsonLd])

  return null
}
