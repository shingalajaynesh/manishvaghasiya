import { Divider, Layout, Space, Typography } from 'antd'
import { NavLink } from 'react-router-dom'
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
    { label: 'About', href: routePaths.about },
    { label: 'Photos', href: routePaths.photos },
    { label: 'Topics', href: routePaths.topics },
    { label: 'Blog', href: routePaths.blog },
  ],
  resources: [
    { label: 'Videos', href: routePaths.videos },
    { label: 'Resources', href: routePaths.resources },
    { label: 'Programs', href: routePaths.programs },
    { label: 'Book Manish', href: routePaths.book },
    { label: 'Contact', href: routePaths.contact },
  ],
  legal: [
    { label: 'Privacy Policy', href: routePaths.privacy },
    { label: 'Terms', href: routePaths.terms },
    { label: 'Editorial Policy', href: routePaths.editorial },
    { label: 'Corrections', href: routePaths.corrections },
    { label: 'Ad Disclosure', href: routePaths.adDisclosure },
    { label: 'Affiliate Disclosure', href: routePaths.affiliateDisclosure },
  ],
} as const

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
                <Text className="!text-xs !font-semibold !uppercase !tracking-[0.28em] !text-[var(--text-muted)]">
                  Manish Vaghasiya
                </Text>
              </div>
              <Title level={2} className="font-playfair !mb-3 !mt-4 !text-[2rem] !leading-tight !text-[var(--text-strong)] sm:!text-3xl lg:!text-4xl">
                Practical guidance for students, parents, and families.
              </Title>
              <Paragraph className="!max-w-xl !text-[14px] !leading-7 !text-[var(--text-soft)] sm:!text-sm">
                Explore trusted articles, helpful resources, speaking programs, and clear ways to connect with the Manish Vaghasiya team.
              </Paragraph>
              <Space wrap size={[8, 8]} className="!mt-6">
                <TextLink href="mailto:info@manishvaghasiya.com" className="!rounded-full !border !border-[var(--line-soft)] !px-4 !py-2 !text-[var(--accent-earth)] hover:!text-[var(--accent-earth-deep)]">
                  info@manishvaghasiya.com
                </TextLink>
                <TextLink href="tel:+918200302328" className="!rounded-full !border !border-[var(--line-soft)] !px-4 !py-2 !text-[var(--accent-earth)] hover:!text-[var(--accent-earth-deep)]">
                  +91 82003 02328
                </TextLink>
                <Text className="!rounded-full !border !border-[var(--line-soft)] !px-4 !py-2 !text-[var(--text-muted)]">Surat, Gujarat</Text>
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
                      {item.label === 'Book Manish' ? 'Book Manish' : item.label}
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
                      {item.label === 'Privacy Policy'
                        ? translate(siteDictionary.footer.privacy, language)
                        : item.label === 'Terms'
                          ? translate(siteDictionary.footer.terms, language)
                          : item.label === 'Editorial Policy'
                            ? translate(siteDictionary.footer.editorial, language)
                            : item.label === 'Corrections'
                              ? translate(siteDictionary.footer.corrections, language)
                              : item.label === 'Ad Disclosure'
                                ? translate(siteDictionary.footer.adDisclosure, language)
                                : item.label === 'Affiliate Disclosure'
                                  ? translate(siteDictionary.footer.affiliateDisclosure, language)
                                  : item.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AntFooter>
  )
}
