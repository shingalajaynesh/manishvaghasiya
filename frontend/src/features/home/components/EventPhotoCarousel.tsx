import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LeftOutlined, RightOutlined, PictureOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { Button, Tag } from 'antd'
import { speakerMedia } from '../../../content/speakerMedia'
import { routePaths } from '../../../content/routes'

// Curated top 8 high-performance photos for lightning-fast loading
const HIGHLIGHT_PHOTOS = [
  speakerMedia.mainPortraits[8],
  speakerMedia.crowdPhotos[4],
  speakerMedia.momentsPhotos[1],
  speakerMedia.crowdPhotos[2],
  speakerMedia.mainPortraits[3],
  speakerMedia.crowdPhotos[0],
  speakerMedia.momentsPhotos[5],
  speakerMedia.mainPortraits[1],
]

export const EventPhotoCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  // Auto-scroll photos every 3 seconds smoothly
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
        if (scrollLeft + clientWidth >= scrollWidth - 20) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' })
        } else {
          scrollRef.current.scrollBy({ left: 340, behavior: 'smooth' })
        }
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [isPaused])

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -360, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 360, behavior: 'smooth' })
    }
  }

  return (
    <div
      className="rounded-3xl border border-[var(--line-soft)] bg-white p-6 shadow-editorial lg:p-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Controls Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
        <div className="flex items-center gap-2">
          <Tag color="volcano" className="!rounded-full !px-3 !py-1 !text-xs !font-bold !uppercase">
            <PictureOutlined /> PUBLIC EVENTS GALLERY
          </Tag>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            ● Fast Auto-Scroll
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Manual Scroll Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={scrollLeft}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--line-strong)] bg-white text-[var(--text-strong)] shadow-sm hover:bg-amber-50 active:scale-95 transition-all"
              aria-label="Scroll left"
            >
              <LeftOutlined className="text-sm" />
            </button>
            <button
              onClick={scrollRight}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--line-strong)] bg-white text-[var(--text-strong)] shadow-sm hover:bg-amber-50 active:scale-95 transition-all"
              aria-label="Scroll right"
            >
              <RightOutlined className="text-sm" />
            </button>
          </div>

          <Link to={routePaths.photos}>
            <Button type="default" icon={<ArrowRightOutlined />} iconPosition="end" className="!rounded-xl !font-bold">
              Full Gallery ({speakerMedia.allPhotos.length} Photos)
            </Button>
          </Link>
        </div>
      </div>

      {/* Optimized Auto-Scroll Strip */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar pb-3 pt-1 scroll-smooth snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {HIGHLIGHT_PHOTOS.map((url, idx) => (
          <div
            key={idx}
            className="group relative h-64 w-80 shrink-0 snap-start overflow-hidden rounded-2xl border border-[var(--line-soft)] bg-slate-950 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
          >
            <img
              src={url}
              alt={`Manish Vaghasiya Event Photo ${idx + 1}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-4">
              <span className="text-xs font-bold text-white">Event Highlight #{idx + 1}</span>
              <span className="text-[10px] text-amber-300 font-semibold">Click to open full photo gallery</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
