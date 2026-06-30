import { Link } from 'react-router-dom'
import { Headphones, ArrowRight, Play } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { LazySection } from '../ui/LazySection'
import { Pill } from '../ui/Pill'

const episodes = [
  {
    num: 'EP 12',
    title: 'ખુદની કિંમત (Understanding Your Worth) with Manish Vaghasiya',
    duration: '42 mins',
    desc: 'In this solo talk, Manish discusses how to assess your own core value, fight negative conditioning, and step into your personal power.',
    url: 'https://spotify.com',
  },
  {
    num: 'EP 11',
    title: 'The Art of Modern Parenting: Balancing Love & Discipline',
    duration: '56 mins',
    desc: 'Joined by family therapists, Manish maps out actionable paths to resolving conflict with teenagers and building deep trust.',
    url: 'https://spotify.com',
  },
  {
    num: 'EP 10',
    title: 'Beating Exam Anxiety: The Ultimate Student Mindset Guide',
    duration: '38 mins',
    desc: 'Manish shares psychological tactics to manage focus, combat sleep issues, and enter the examination hall with full confidence.',
    url: 'https://spotify.com',
  },
]

const platforms = [
  { name: 'Spotify', url: 'https://spotify.com' },
  { name: 'Apple Podcasts', url: 'https://podcasts.apple.com' },
  { name: 'YouTube', url: 'https://youtube.com' },
]

export function PodcastSection() {
  return (
    <section className="bg-[#FAF7FF] section-padding border-b border-border relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Intro Column */}
          <div className="lg:col-span-5 text-left">
            <LazySection animation="fade-up">
              <span className="text-accent-purple text-xs uppercase tracking-[0.2em] font-bold mb-3 block">
                The Manish Vaghasiya Podcast
              </span>
              <h2 className="font-display font-bold text-apple-black text-h2 leading-tight tracking-tight mb-6">
                Conversations That Transform
              </h2>
              <p className="text-apple-gray text-base font-light leading-relaxed mb-8">
                Raw, real, and deeply human. In his podcast, Manish explores the complex realities of life, youth challenges, exam stress, and family bonds, sharing practical wisdom you can use today.
              </p>
              
              {/* Listen Badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                {platforms.map((plat) => (
                  <a
                    key={plat.name}
                    href={plat.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-xl text-xs font-semibold text-apple-black hover:border-accent-purple transition-all duration-300"
                  >
                    <Headphones className="w-3.5 h-3.5 text-accent-purple" />
                    {plat.name}
                  </a>
                ))}
              </div>

              <Link
                to="/podcast"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-purple hover:text-accent-purple/80 transition-colors group"
              >
                Explore All Episodes
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </LazySection>
          </div>

          {/* Right Episodes List Column */}
          <div className="lg:col-span-7 flex flex-col gap-6 w-full">
            <LazySection animation="fade-up" delay={200}>
              <div className="flex flex-col gap-4">
                {episodes.map((ep) => (
                  <div
                    key={ep.num}
                    className="bg-white border border-border p-6 rounded-2xl flex flex-col sm:flex-row gap-4 items-start justify-between text-left shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Pill color="purple" className="text-[9px] px-2 py-0.5">{ep.num}</Pill>
                        <span className="text-[11px] text-apple-gray font-semibold">{ep.duration}</span>
                      </div>
                      <h4 className="font-sans font-bold text-apple-black text-sm md:text-base leading-tight mb-2 tracking-tight">
                        {ep.title}
                      </h4>
                      <p className="text-apple-gray text-xs font-light leading-relaxed line-clamp-2">
                        {ep.desc}
                      </p>
                    </div>

                    <a
                      href={ep.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-accent-purple/10 text-accent-purple flex items-center justify-center flex-shrink-0 hover:bg-accent-purple hover:text-white transition-all duration-300 sm:self-center"
                    >
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </a>
                  </div>
                ))}
              </div>
            </LazySection>
          </div>

        </div>
      </div>
    </section>
  )
}
