import { Layout } from '../components/layout/Layout'
import { SectionHeading } from '../components/ui/SectionHeading'
import { LazySection } from '../components/ui/LazySection'
import { LazyImage } from '../components/ui/LazyImage'

export default function About() {
  return (
    <Layout>
      {/* Page Hero */}
      <section className="bg-bg-subtle py-16 border-b border-border text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LazySection animation="fade-up">
            <span className="text-accent-blue text-xs uppercase tracking-[0.2em] font-bold mb-3 block">
              Biography
            </span>
            <h1 className="font-display font-bold text-apple-black text-h1 leading-tight tracking-tight mb-4 max-w-xl">
              Meet Manish Vaghasiya
            </h1>
            <p className="text-apple-gray text-base md:text-lg font-light leading-relaxed max-w-2xl">
              Founder of Manas Life Coach, transformational speaker, and youth mentor dedicated to unlocking human potential.
            </p>
          </LazySection>
        </div>
      </section>

      {/* Main Narrative Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Image */}
            <div className="lg:col-span-5">
              <LazySection animation="slide-left" className="aspect-[4/5] rounded-[32px] overflow-hidden shadow-card border border-border">
                <LazyImage
                  src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80"
                  alt="Manish Vaghasiya addressing a student gathering"
                  className="w-full h-full object-cover"
                />
              </LazySection>
            </div>

            {/* Right Column: Story Text */}
            <div className="lg:col-span-7 text-left flex flex-col gap-6 text-apple-gray text-sm md:text-base font-light leading-relaxed">
              <LazySection animation="fade-up">
                <h2 className="font-display font-bold text-apple-black text-2xl md:text-3xl tracking-tight mb-6">
                  The Journey from Adversity to Impact
                </h2>
                <p>
                  Manish Vaghasiya’s journey was not built on instant success. Based in Surat, Gujarat, Manish spent his early years battling personal hardships and self-doubt. It was during these intense struggles that he realized that transformation does not come from easy answers; it is forged by overcoming adversity.
                </p>
                <p>
                  His realization led to the founding of <strong>Manas Life Coach</strong>, a dedicated coaching practice focusing on youth development, stress recovery, and family support systems. By framing core lessons in simple, human language, Manish began speaking in local schools and communities.
                </p>
                <p>
                  Today, with over 4,500 programs delivered to banks, corporate teams, schools, and colleges, Manish is recognized as a key Youth Icon and Transformation Trainer across Gujarat and India.
                </p>

                <h3 className="font-sans font-bold text-apple-black text-lg mt-8 mb-4">
                  His Core Philosophy
                </h3>
                <p>
                  "ખુદની ફિલોસોફી" (Your Own Philosophy) lies at the heart of Manish’s teachings. He believes that true growth only occurs when individuals stop copying external templates and define their own values, goals, and systems of happiness.
                </p>
              </LazySection>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  )
}
