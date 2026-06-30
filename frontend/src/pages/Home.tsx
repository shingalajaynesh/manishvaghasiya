import { Layout } from '../components/layout/Layout'
import { HeroSection } from '../components/sections/HeroSection'
import { StatsStrip } from '../components/sections/StatsStrip'
import { AboutSection } from '../components/sections/AboutSection'
import { ProgramsSection } from '../components/sections/ProgramsSection'
import { ImpactNumbers } from '../components/sections/ImpactNumbers'
import { TestimonialsSection } from '../components/sections/TestimonialsSection'
import { VideoSection } from '../components/sections/VideoSection'
import { PodcastSection } from '../components/sections/PodcastSection'
import { InitiativesSection } from '../components/sections/InitiativesSection'
import { GallerySection } from '../components/sections/GallerySection'
import { MediaSection } from '../components/sections/MediaSection'
import { BookingSection } from '../components/sections/BookingSection'
import { ContactSection } from '../components/sections/ContactSection'

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <StatsStrip />
      <AboutSection />
      <ProgramsSection />
      <ImpactNumbers />
      <TestimonialsSection />
      <VideoSection />
      <PodcastSection />
      <InitiativesSection />
      <GallerySection />
      <MediaSection />
      <BookingSection />
      <ContactSection />
    </Layout>
  )
}
