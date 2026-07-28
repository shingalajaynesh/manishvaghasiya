import { EnvironmentOutlined, MailOutlined } from '@ant-design/icons'
import { Button, Input, Typography } from 'antd'
import { useState } from 'react'
import { siteDictionary, translate } from '../../content/i18n'
import { ContentCard } from '../../shared/components/site/ContentCard'
import { PageHero } from '../../shared/components/site/PageHero'
import { PageSection } from '../../shared/components/site/PageSection'
import { SeoHead } from '../../shared/components/site/SeoHead'
import { useLanguage } from '../../shared/lib/language'

const { Paragraph, Title } = Typography
const { TextArea } = Input

export function ContactPage() {
  const { language } = useLanguage()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [contactData, setContactData] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 500)
  }

  return (
    <>
      <SeoHead
        title="Contact Manish Vaghasiya Team | Inquiries & Support"
        description="Get in touch with the Manish Vaghasiya team for event bookings, seminar availability, media inquiries, and program details."
        canonicalUrl="https://www.manishvaghasiya.com/contact"
      />
      <PageHero
        eyebrow={translate(siteDictionary.contact.eyebrow, language)}
        title={translate(siteDictionary.contact.title, language)}
        description={translate(siteDictionary.contact.description, language)}
      />

      <PageSection title="Direct contact details" description="Reach out to our event coordination and audience support team directly.">
        <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto mb-12">
          <ContentCard
            title="Email Inquiry"
            description="manishvaghasiya.tech@gmail.com"
            icon={<MailOutlined />}
            tone="warm"
          />
          <ContentCard
            title="Office Base"
            description="Surat, Gujarat, India"
            icon={<EnvironmentOutlined />}
            tone="warm"
          />
        </div>


        <div className="max-w-3xl mx-auto rounded-2xl border border-[var(--line-soft)] bg-white p-8 shadow-editorial">
          <Title level={3} className="font-playfair !mb-2">Send Us a Message</Title>
          <Paragraph className="!mb-6 !text-sm !text-[var(--text-soft)]">
            Have a question regarding articles, educational resources, or speaking events? Fill out the form below.
          </Paragraph>

          {submitted ? (
            <div className="rounded-xl bg-green-50 p-6 text-center text-green-700">
              <Title level={4} className="!text-green-800 !mb-1">Message Sent!</Title>
              <p className="text-sm">Thank you for reaching out. We will respond to your message promptly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1">Your Name</label>
                  <Input
                    required
                    placeholder="Enter your name"
                    value={contactData.name}
                    onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1">Email Address</label>
                  <Input
                    type="email"
                    required
                    placeholder="yourname@gmail.com"
                    value={contactData.email}
                    onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1">Subject</label>
                <Input
                  required
                  placeholder="e.g. Question about Parenting Guide"
                  value={contactData.subject}
                  onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1">Message</label>
                <TextArea
                  rows={4}
                  required
                  placeholder="Write your message here..."
                  value={contactData.message}
                  onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                />
              </div>
              <Button type="primary" size="large" htmlType="submit" loading={loading} block className="!mt-4 !rounded-xl !bg-[var(--accent-earth)]">
                Send Message
              </Button>
            </form>
          )}
        </div>
      </PageSection>
    </>
  )
}
