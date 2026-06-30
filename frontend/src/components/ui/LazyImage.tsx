import { useRef, useEffect, useState } from 'react'

interface LazyImageProps {
  src: string
  srcSet?: string
  sizes?: string
  alt: string
  placeholder?: string   // tiny blur jpg base64 or low-res URL
  className?: string
  width?: number
  height?: number
}

export function LazyImage({
  src, srcSet, sizes, alt, placeholder, className, width, height
}: LazyImageProps) {
  const imgRef = useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const img = imgRef.current
    if (!img) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }  // start loading 200px before visible
    )
    observer.observe(img)
    return () => observer.disconnect()
  }, [])

  return (
    <img
      ref={imgRef}
      src={inView ? src : (placeholder || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7')}
      srcSet={inView ? srcSet : undefined}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      onLoad={() => setLoaded(true)}
      className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${className ?? ''}`}
      decoding="async"
      loading="lazy"
    />
  )
}
