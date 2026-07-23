import { CalendarOutlined, FileTextOutlined, MailOutlined, SafetyOutlined } from '@ant-design/icons'
import { Button, Input, Typography } from 'antd'
import { useState } from 'react'
import { ContentCard } from '../../shared/components/site/ContentCard'
import { PageHero } from '../../shared/components/site/PageHero'
import { PageSection } from '../../shared/components/site/PageSection'
import { SeoHead } from '../../shared/components/site/SeoHead'

const { Paragraph, Title } = Typography
const { TextArea } = Input

export function BookManishPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ name: '', organization: '', email: '', phone: '', details: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 600)
  }

  return (
    <>
      <SeoHead
        title="Book Manish Vaghasiya | Keynotes & Seminars"
        description="Book Manish Vaghasiya for school student seminars, college youth sessions, parenting workshops, and institutional keynote programs."
        canonicalUrl="https://www.manishvaghasiya.com/book-manish"
      />
      <PageHero
        eyebrow="Speaking Inquiries"
        title="Book Manish Vaghasiya for your school, college, or institution."
        description="Over 4,500 live programs conducted across Gujarat. Invite Manish Vaghasiya to deliver impactful keynotes on student confidence, parenting, and life guidance."
      />

      <PageSection
        title="Program formats & organizer details"
        description="Tailored session options for educational institutions and community organizations."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <ContentCard
            title="Student Seminars"
            description="Focused on confidence after failure, study discipline, exam stress reduction, and career direction for schools and colleges."
            icon={<CalendarOutlined />}
            tone="warm"
          />
          <ContentCard
            title="Parenting Workshops"
            description="Interactive sessions helping parents communicate effectively with teenagers and foster emotional trust at home."
            icon={<FileTextOutlined />}
            tone="forest"
          />
          <ContentCard
            title="Family Guidance Keynotes"
            description="Large community sessions centered on family values, relationship harmony, and mutual respect."
            icon={<SafetyOutlined />}
            tone="warm"
          />
        </div>
      </PageSection>

      <PageSection title="Submit a booking inquiry" description="Fill in your event details and our team will get in touch within 24 business hours.">
        <div className="max-w-3xl mx-auto rounded-2xl border border-[var(--line-soft)] bg-white p-8 shadow-editorial">
          {submitted ? (
            <div className="text-center py-6">
              <div className="inline-flex rounded-full bg-green-100 p-4 text-green-600 mb-4">
                <MailOutlined className="text-2xl" />
              </div>
              <Title level={3} className="font-playfair !mb-2">Inquiry Received!</Title>
              <Paragraph className="!text-base !text-[var(--text-soft)]">
                Thank you for inviting Manish Vaghasiya. Our event coordination team will review your dates and reach out via phone or email shortly.
              </Paragraph>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1">Your Name</label>
                  <Input
                    required
                    placeholder="e.g. Rajesh Shah"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1">Institution / School Name</label>
                  <Input
                    required
                    placeholder="e.g. City Public School"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1">Email Address</label>
                  <Input
                    type="email"
                    required
                    placeholder="info@school.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1">Phone Number</label>
                  <Input
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1">Event Details & Proposed Dates</label>
                <TextArea
                  rows={4}
                  required
                  placeholder="Tell us about your audience size, preferred dates, location, and topic focus..."
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                />
              </div>
              <Button type="primary" size="large" htmlType="submit" loading={loading} block className="!mt-4 !rounded-xl !bg-[var(--accent-earth)]">
                Submit Booking Inquiry
              </Button>
            </form>
          )}
        </div>
      </PageSection>
    </>
  )
}
