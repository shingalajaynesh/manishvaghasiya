import { Layout } from '../components/layout/Layout'
import { ArrowRight, BookOpen } from 'lucide-react'
import { LazySection } from '../components/ui/LazySection'
import { Pill } from '../components/ui/Pill'

const posts = [
  {
    category: 'Youth Motivation',
    date: 'June 18, 2025',
    title: 'ખુદની ફિલોસોફી: Why Defining Your Own Core Values Leads to Lasting Success',
    desc: 'Stop copying external success templates. Manish explains how finding and defining your own core values is the first step toward genuine accomplishment.',
  },
  {
    category: 'Parenting',
    date: 'May 24, 2025',
    title: 'The Communication Bridge: 3 Rules to Resolve Friction with Teenagers',
    desc: 'Teenage rebellion is often a cry for connection. Learn three actionable techniques Manish uses in his Parenting for Peace workshops to restore harmony.',
  },
  {
    category: 'Mental Health',
    date: 'April 09, 2025',
    title: 'Overcoming Academic Stress: A Mindset Strategy Guide for Board Students',
    desc: 'Manage exam pressure and eliminate performance anxiety using this simple daily mindset routine designed to keep students focused and calm.',
  },
]

export default function Blog() {
  return (
    <Layout>
      {/* Page Hero */}
      <section className="bg-bg-subtle py-16 border-b border-border text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LazySection animation="fade-up">
            <span className="text-accent-blue text-xs uppercase tracking-[0.2em] font-bold mb-3 block">
              Publications
            </span>
            <h1 className="font-display font-bold text-apple-black text-h1 leading-tight tracking-tight mb-4 max-w-xl">
              Thoughts & Articles
            </h1>
            <p className="text-apple-gray text-base md:text-lg font-light leading-relaxed max-w-2xl">
              Read essays, thoughts, and guidelines authored by Manish Vaghasiya on personal growth, education, and family bonding.
            </p>
          </LazySection>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LazySection animation="fade-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts.map((post) => (
                <div
                  key={post.title}
                  className="bg-white border border-border p-8 rounded-[32px] text-left flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <BookOpen className="w-4 h-4 text-accent-blue" />
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-apple-gray">
                        {post.category}
                      </span>
                      <span className="text-[10px] text-apple-muted">·</span>
                      <span className="text-[10px] text-apple-muted">{post.date}</span>
                    </div>

                    <h3 className="font-sans font-bold text-apple-black text-base md:text-lg leading-snug tracking-tight mb-3 hover:text-accent-blue transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-apple-gray text-xs md:text-sm font-light leading-relaxed mb-6">
                      {post.desc}
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent-blue hover:text-accent-blue/80 transition-colors group cursor-pointer mt-auto">
                    Read Article
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              ))}
            </div>
          </LazySection>
        </div>
      </section>
    </Layout>
  )
}
