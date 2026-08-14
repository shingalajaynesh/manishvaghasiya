import { Divider, Layout, Space, Typography } from 'antd'
import { NavLink } from 'react-router-dom'
import {
  SafetyCertificateOutlined,
  ThunderboltOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons'
import { routePaths } from '../../../content/routes'
import { siteDictionary, translate } from '../../../content/i18n'
import { speakerMedia } from '../../../content/speakerMedia'
import { useLanguage } from '../../lib/language'
import { SocialLinks } from './SocialLinks'

const { Footer: AntFooter } = Layout
const { Link: TextLink, Paragraph, Text, Title } = Typography

const footerSections = {
  product: [
    { label: 'Home', href: routePaths.home },
    { label: 'E-Books Store', href: routePaths.resources },
    { label: 'Blog & Articles', href: routePaths.blog },
    { label: 'About Manish', href: routePaths.about },
    { label: 'Photos', href: routePaths.photos },
    { label: 'Videos', href: routePaths.videos },
    { label: 'My Library', href: routePaths.dashboard },
  ],
  resources: [
    { label: 'Master E-Books PDF', href: routePaths.resources },
    { label: 'Student Guide PDF', href: routePaths.studentGuide },
    { label: 'Video Seminars', href: routePaths.videos },
    { label: 'Contact & Booking', href: routePaths.contact },
  ],
  legal: [
    { label: 'Privacy Policy', href: routePaths.privacy },
    { label: 'Terms & Conditions', href: routePaths.terms },
    { label: 'Refund Policy', href: routePaths.refund },
    { label: 'Cookie Policy', href: routePaths.cookies },
    { label: 'Editorial Policy', href: routePaths.editorial },
    { label: 'Corrections', href: routePaths.corrections },
    { label: 'Ad Disclosure', href: routePaths.adDisclosure },
    { label: 'Affiliate Disclosure', href: routePaths.affiliateDisclosure },
  ],
} as const

function getLegalLabel(label: string, language: any) {
  switch (label) {
    case 'Privacy Policy':
      return translate(siteDictionary.footer.privacy, language)
    case 'Terms & Conditions':
      return translate(siteDictionary.footer.terms, language)
    case 'Refund Policy':
      return translate(siteDictionary.footer.refund, language)
    case 'Cookie Policy':
      return translate(siteDictionary.footer.cookies, language)
    case 'Editorial Policy':
      return translate(siteDictionary.footer.editorial, language)
    case 'Corrections':
      return translate(siteDictionary.footer.corrections, language)
    case 'Ad Disclosure':
      return translate(siteDictionary.footer.adDisclosure, language)
    case 'Affiliate Disclosure':
      return translate(siteDictionary.footer.affiliateDisclosure, language)
    default:
      return label
  }
}

export function Footer() {
  const { language } = useLanguage()

  return (
    <AntFooter className="!mt-20 !border-t !border-[var(--line-soft)] !bg-transparent !px-0 !pb-12 !pt-12">
      <div className="editorial-container px-1 sm:px-2">
        <div className="rounded-[24px] bg-white p-5 shadow-editorial sm:p-8 lg:rounded-[28px] lg:p-10" style={{ border: '1px solid var(--line-soft)' }}>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 overflow-hidden rounded-2xl border border-[var(--line-soft)] bg-[var(--panel-soft)]">
                  <img src={speakerMedia.footerPortrait} alt="Manish Vaghasiya portrait" className="h-full w-full object-cover" />
                </div>
                <div>
                  <Text className="!text-xs !font-semibold !uppercase !tracking-[0.28em] !text-[var(--text-muted)]">
                    Manish Vaghasiya
                  </Text>
                  <div className="text-xs font-semibold text-amber-700">Official Author & Speaker Platform</div>
                </div>
              </div>
              <Title level={2} className="font-playfair !mb-3 !mt-4 !text-[2rem] !leading-tight !text-[var(--text-strong)] sm:!text-3xl lg:!text-4xl">
                Practical guidance for students, parents, and families.
              </Title>
              <Paragraph className="!max-w-xl !text-[14px] !leading-7 !text-[var(--text-soft)] sm:!text-sm">
                Explore official Gujarati master e-books, trusted articles, student guides, speaking seminars, and clear ways to connect with the Manish Vaghasiya team.
              </Paragraph>
              
              {/* Trust Badges Bar */}
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[var(--text-soft)]">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-800 border border-emerald-200">
                  <SafetyCertificateOutlined className="text-emerald-700" />
                  <span>256-bit Secure Razorpay SSL</span>
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 font-medium text-amber-800 border border-amber-200">
                  <ThunderboltOutlined className="text-amber-700" />
                  <span>Instant PDF Delivery</span>
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-800 border border-blue-200">
                  <CheckCircleOutlined className="text-blue-700" />
                  <span>Verified Author & Content</span>
                </span>
              </div>

              <Space wrap size={[8, 8]} className="!mt-6">
                <TextLink href="mailto:manishvaghasiya.tech@gmail.com" className="!rounded-full !border !border-[var(--line-soft)] !px-4 !py-2 !text-[var(--accent-earth)] hover:!text-[var(--accent-earth-deep)]">
                  manishvaghasiya.tech@gmail.com
                </TextLink>
                <Text className="!rounded-full !border !border-[var(--line-soft)] !px-4 !py-2 !text-[var(--text-muted)]">Surat, Gujarat, India</Text>
              </Space>

              <Divider className="!my-6 !border-[var(--line-soft)]" />
              <SocialLinks />
            </div>

            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
              <div>
                <Text className="!text-sm !font-semibold !text-[var(--text-strong)]">
                  {translate(siteDictionary.footer.product, language)}
                </Text>
                <div className="mt-4 flex flex-col gap-2">
                  {footerSections.product.map((item) => (
                    <NavLink key={item.label} to={item.href} className="text-sm text-[var(--text-muted)] hover:!text-[var(--accent-earth)]">
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              </div>

              <div>
                <Text className="!text-sm !font-semibold !text-[var(--text-strong)]">
                  {translate(siteDictionary.footer.resources, language)}
                </Text>
                <div className="mt-4 flex flex-col gap-2">
                  {footerSections.resources.map((item) => (
                    <NavLink key={item.label} to={item.href} className="text-sm text-[var(--text-muted)] hover:!text-[var(--accent-earth)]">
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              </div>

              <div>
                <Text className="!text-sm !font-semibold !text-[var(--text-strong)]">
                  {translate(siteDictionary.footer.legal, language)}
                </Text>
                <div className="mt-4 flex flex-col gap-2">
                  {footerSections.legal.map((item) => (
                    <NavLink key={item.label} to={item.href} className="text-sm text-[var(--text-muted)] hover:!text-[var(--accent-earth)]">
                      {getLegalLabel(item.label, language)}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 border-t border-[var(--line-soft)] pt-6 text-center text-xs text-[var(--text-muted)]">
            © {new Date().getFullYear()} Manish Vaghasiya. All rights reserved. Registered under Ministry of MSME / Indian Copyright Regulations.
          </div>
        </div>
      </div>
    </AntFooter>
  )
}


