import React, { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { LazyImage } from '../ui/LazyImage'
import { LazySection } from '../ui/LazySection'

const categories = ['All', 'Stage', 'Workshops', 'Youth', 'Corporate', 'Media']

const items = [
  {
    src: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=800&q=80',
    alt: 'Manish on stage speaking to large audience',
    category: 'Stage',
  },
  {
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    alt: 'Workshop participants engaging in activities',
    category: 'Workshops',
  },
  {
    src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    alt: 'Youth student motivation circle',
    category: 'Youth',
  },
  {
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    alt: 'Corporate strategy presentation session',
    category: 'Corporate',
  },
  {
    src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
    alt: 'Manish being interviewed by press correspondents',
    category: 'Media',
  },
  {
    src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    alt: 'Manish addressing national training conference',
    category: 'Stage',
  },
]

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeImgIndex, setActiveImgIndex] = useState<number | null>(null)

  const filteredItems = items.filter(
    (item) => activeCategory === 'All' || item.category === activeCategory
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImgIndex === null) return
      if (e.key === 'Escape') setActiveImgIndex(null)
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeImgIndex, filteredItems])

  const handlePrev = () => {
    if (activeImgIndex === null) return
    setActiveImgIndex((prev) => (prev! === 0 ? filteredItems.length - 1 : prev! - 1))
  }

  const handleNext = () => {
    if (activeImgIndex === null) return
    setActiveImgIndex((prev) => (prev! === filteredItems.length - 1 ? 0 : prev! + 1))
  }

  return (
    <section className="bg-off-white section-padding border-b border-border relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionHeading
          eyebrow="Gallery"
          title="Moments from the Stage"
          description="A visual journey of youth guidance, corporate coaching, and parenting seminars led by Manish Vaghasiya."
        />

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat)
                setActiveImgIndex(null)
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-apple-black text-white shadow-sm'
                  : 'bg-white border border-border text-apple-gray hover:border-apple-black hover:text-apple-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Display (Masonry columns format) */}
        <LazySection animation="fade-up">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredItems.map((item, idx) => (
              <div
                key={item.src}
                onClick={() => setActiveImgIndex(idx)}
                className="break-inside-avoid relative rounded-2xl overflow-hidden shadow-sm border border-border group cursor-pointer bg-bg-subtle"
              >
                <LazyImage
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
                />
                
                {/* Category label overlay */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="px-3 py-1 bg-white/95 rounded-full text-[10px] font-bold text-apple-black uppercase tracking-wider shadow-sm">
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </LazySection>

      </div>

      {/* Lightbox Modal */}
      {activeImgIndex !== null && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4 md:p-8 select-none">
          {/* Close button */}
          <button
            onClick={() => setActiveImgIndex(null)}
            className="absolute top-4 right-4 md:top-8 md:right-8 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Navigation */}
          <button
            onClick={handlePrev}
            className="absolute left-4 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Image Container */}
          <div className="max-w-4xl max-h-[80vh] flex flex-col items-center">
            <img
              src={filteredItems[activeImgIndex].src}
              alt={filteredItems[activeImgIndex].alt}
              className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
            />
            <p className="text-white/80 font-sans text-xs md:text-sm text-center mt-4 max-w-xl font-light">
              {filteredItems[activeImgIndex].alt}
            </p>
          </div>

          {/* Right Navigation */}
          <button
            onClick={handleNext}
            className="absolute right-4 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}
    </section>
  )
}
