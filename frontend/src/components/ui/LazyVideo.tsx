import React, { useState } from 'react'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { LazyImage } from './LazyImage'

interface LazyVideoProps {
  youtubeId: string
  thumbnailSrc: string
  title: string
}

export function LazyVideo({ youtubeId, thumbnailSrc, title }: LazyVideoProps) {
  const [playing, setPlaying] = useState(false)
  const { ref, isIntersecting } = useIntersectionObserver()

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="relative aspect-video rounded-2xl overflow-hidden bg-bg-subtle cursor-pointer group shadow-card"
      onClick={() => setPlaying(true)}
    >
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
          className="w-full h-full border-0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title={title}
        />
      ) : isIntersecting ? (
        <>
          <LazyImage
            src={thumbnailSrc}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/35 transition-colors">
            <div className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
              <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-apple-black border-b-[10px] border-b-transparent ml-1" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <p className="text-white font-semibold text-sm line-clamp-1">{title}</p>
          </div>
        </>
      ) : (
        <div className="w-full h-full bg-bg-subtle animate-pulse" />
      )}
    </div>
  )
}
