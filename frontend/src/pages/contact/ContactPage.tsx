import { EnvironmentOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'
import { siteDictionary, translate } from '../../content/i18n'
import { ContentCard } from '../../shared/components/site/ContentCard'
import { PageHero } from '../../shared/components/site/PageHero'
import { PageSection } from '../../shared/components/site/PageSection'
import { SeoHead } from '../../shared/components/site/SeoHead'
import { useLanguage } from '../../shared/lib/language'

export function ContactPage() {
  const { language } = useLanguage()

  return (
    <>
      <SeoHead
        title="Contact Manish Vaghasiya Team | Office & Inquiries"
        description="Get in touch with the Manish Vaghasiya team for event bookings, seminar availability, media inquiries, and program details."
        canonicalUrl="https://www.manishvaghasiya.com/contact"
      />
      <PageHero
        eyebrow={translate(siteDictionary.contact.eyebrow, language)}
        title={translate(siteDictionary.contact.title, language)}
        description={translate(siteDictionary.contact.description, language)}
      />

      <PageSection title="Contact details" description="The contact layer supports trust, booking readiness, and long-term platform credibility.">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ContentCard
            title="Email"
            description="info@manishvaghasiya.com"
            icon={<MailOutlined />}
            tone="warm"
          />
          <ContentCard
            title="Phone"
            description="+91 82003 02328"
            icon={<PhoneOutlined />}
            tone="forest"
          />
          <ContentCard
            title="Location"
            description="Surat, Gujarat, India"
            icon={<EnvironmentOutlined />}
            tone="warm"
          />
        </div>
      </PageSection>
    </>
  )
}
