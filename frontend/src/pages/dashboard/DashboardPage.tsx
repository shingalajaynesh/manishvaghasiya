import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useUser, UserButton, SignedIn, SignedOut } from '@clerk/clerk-react'
import { getUserPurchasedBooks, syncUserPurchasesFromBackend } from '../../shared/lib/userPurchases'


import {
  BookOutlined,
  ReadOutlined,
  ShoppingOutlined,
  TrophyOutlined,
  CheckCircleOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Button, Card, Col, Row, Tabs, Tag } from 'antd'
import { RazorpayCheckout } from '../../shared/components/payment/RazorpayCheckout'
import { PageHero } from '../../shared/components/site/PageHero'
import { SeoHead } from '../../shared/components/site/SeoHead'
import { useLanguage } from '../../shared/lib/language'
import { siteDictionary, translate } from '../../content/i18n'

export function DashboardPage() {
  const { user } = useUser()

  const { language } = useLanguage()
  const [purchasedBookIds, setPurchasedBookIds] = useState<string[]>(() => getUserPurchasedBooks(user?.id))

  useEffect(() => {
    const userEmail = user?.primaryEmailAddress?.emailAddress
    setPurchasedBookIds(getUserPurchasedBooks(user?.id))
    syncUserPurchasesFromBackend(user?.id, userEmail).then((updated) => {
      setPurchasedBookIds(updated)
    })
  }, [user?.id, user?.primaryEmailAddress?.emailAddress])



  const handleBookPurchaseSuccess = (bookId: string, orderId: string, paymentId: string) => {
    if (bookId === 'combo-bundle') {
      setPurchasedBookIds(['jivan-jitvu-che', 'man-haryu-to-badhu-haryu', 'combo-bundle'])
    } else if (!purchasedBookIds.includes(bookId)) {
      setPurchasedBookIds((prev) => [...prev, bookId])
    }

    try {
      localStorage.setItem(
        'mv_ebook_purchased',
        JSON.stringify({
          bookId,
          orderId,
          paymentId,
          email: user?.primaryEmailAddress?.emailAddress,
          name: user?.fullName,
        })
      )
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <SeoHead
        title="User Reading Dashboard | Manish Vaghasiya Gujarati E-Books"
        description="Access your purchased Gujarati master e-books, track your reading progress, and read online in your protected personal reader dashboard."
        canonicalUrl="https://www.manishvaghasiya.com/dashboard"
      />

      <PageHero
        eyebrow={translate(siteDictionary.dashboard.eyebrow, language)}
        title={translate(siteDictionary.dashboard.title, language)}
        description={translate(siteDictionary.dashboard.description, language)}
      />

      <div className="editorial-container py-10">
        {/* User Welcome Header Card */}
        <div className="mb-10 overflow-hidden rounded-3xl border border-[var(--line-soft)] bg-white p-6 shadow-editorial-lg sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <SignedIn>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: 'w-16 h-16 rounded-full border-2 border-[#D4A017] shadow-md',
                        },
                      }}
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-playfair text-xl font-bold text-[var(--text-strong)] sm:text-2xl">
                        {user?.fullName || user?.firstName || 'Valued Reader'}
                      </h2>
                      <Tag color="gold" className="!rounded-md !text-[10px] !font-bold">
                        {translate(siteDictionary.dashboard.premiumBadge, language)}
                      </Tag>
                    </div>
                    <p className="text-xs text-[var(--text-soft)] font-mono">
                      {user?.primaryEmailAddress?.emailAddress}
                    </p>
                  </div>
                </div>
              </SignedIn>

              <SignedOut>
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-[#D4A017]">
                    <UserOutlined className="text-2xl" />
                  </div>
                  <div>
                    <h2 className="font-playfair text-xl font-bold text-[var(--text-strong)] sm:text-2xl">
                      {language === 'hi' ? 'माननीय पाठक' : language === 'gu' ? 'માનનીય વાચક' : 'Valued Reader'}
                    </h2>
                    <p className="text-xs text-[var(--text-soft)]">
                      Log in to access your library & sync across devices
                    </p>
                  </div>
                </div>
              </SignedOut>
            </div>

            <div className="flex items-center gap-3">
              <SignedOut>
                <Link to="/sign-in">
                  <Button type="primary" className="!rounded-xl !bg-[#D4A017] !font-bold">
                    Sign In / Register Account
                  </Button>
                </Link>
              </SignedOut>

              <SignedIn>
                <Link to="/resources">
                  <Button type="default" icon={<ShoppingOutlined />} className="!rounded-xl !font-bold">
                    {translate(siteDictionary.dashboard.browseStore, language)}
                  </Button>
                </Link>
              </SignedIn>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <Tabs
          defaultActiveKey="library"
          size="large"
          className="editorial-tabs"
          items={[
            {
              key: 'library',
              label: (
                <span className="flex items-center gap-2 font-bold">
                  <BookOutlined /> {translate(siteDictionary.dashboard.tabLibrary, language)}
                </span>
              ),
              children: (
                <div className="py-6">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h3 className="font-playfair text-xl font-bold text-[var(--text-strong)]">
                        {translate(siteDictionary.dashboard.availableBooksTitle, language)}
                      </h3>
                      <p className="text-xs text-[var(--text-soft)]">
                        {translate(siteDictionary.dashboard.availableBooksSub, language)}
                      </p>
                    </div>
                  </div>

                  <Row gutter={[24, 24]}>
                    {/* Book 1: Jivan Jitvu Che */}
                    <Col xs={24} md={12} lg={8}>
                      <Card
                        hoverable
                        className={`h-full overflow-hidden rounded-3xl border ${
                          purchasedBookIds.includes('jivan-jitvu-che') || purchasedBookIds.includes('combo-bundle')
                            ? 'border-[var(--line-soft)] shadow-editorial'
                            : 'border-amber-200 bg-amber-50/20'
                        }`}
                      >
                        <div className="relative bg-amber-50/50 p-4 text-center">
                          <img
                            src="/books/images/Jivan-Jitvu-Che-To-Parivar-Thi-Sharu-Karo_Gujarati.png"
                            alt="Jivan Jitvu Che"
                            className="mx-auto h-48 rounded-xl object-cover shadow-lg transition-transform hover:scale-105"
                          />
                          {purchasedBookIds.includes('jivan-jitvu-che') || purchasedBookIds.includes('combo-bundle') ? (
                            <Tag color="gold" className="!absolute top-3 left-3 !rounded-md !text-[10px] !font-bold">
                              {translate(siteDictionary.dashboard.unlockedBadge, language)}
                            </Tag>
                          ) : (
                            <Tag color="red" className="!absolute top-3 left-3 !rounded-md !text-[10px] !font-bold">
                              LOCKED (₹199)
                            </Tag>
                          )}
                        </div>
                        <div className="p-5">
                          <h4 className="font-playfair text-base font-bold text-[var(--text-strong)] leading-snug">
                            જીવન જીતવું છે તો પરિવારથી શરૂઆત કરો
                          </h4>
                          <p className="mt-1 text-xs text-[var(--accent-earth)] font-semibold">
                            By Manish Vaghasiya • 276 Pages
                          </p>
                          <p className="mt-2 text-xs text-[var(--text-soft)] line-clamp-2">
                            {translate(
                              {
                                en: '12 life-changing lessons for students, parents, and families by Manish Vaghasiya.',
                                hi: 'छात्रों, माता-पिता और परिवारों के लिए 12 जीवन बदलने वाले पाठ।',
                                gu: 'વિદ્યાર્થી, માતા-પિતા અને દરેક પરિવાર માટે જીવન બદલતા ૧૨ પાઠ.',
                              },
                              language
                            )}
                          </p>

                          <div className="mt-5 pt-4 border-t border-[var(--line-soft)] flex items-center justify-between">
                            {purchasedBookIds.includes('jivan-jitvu-che') || purchasedBookIds.includes('combo-bundle') ? (
                              <Link to="/reader/jivan-jitvu-che" className="w-full">
                                <Button
                                  type="primary"
                                  icon={<ReadOutlined />}
                                  className="!w-full !h-11 !rounded-xl !bg-[#D4A017] !font-bold hover:!bg-[#b88910]"
                                >
                                  {translate(
                                    {
                                      en: 'Read Online Now (DRM Reader)',
                                      hi: 'अभी ऑनलाइन पढ़ें (DRM रीडर)',
                                      gu: 'ઓનલાઈન વાંચો (DRM રીડર)',
                                    },
                                    language
                                  )}
                                </Button>
                              </Link>
                            ) : (
                              <RazorpayCheckout
                                amountInRupees={199}
                                itemName="જીવન જીતવું છે તો પરિવારથી શરૂઆત કરો (E-Book)"
                                bookId="jivan-jitvu-che"
                                customerName={user?.fullName || ''}
                                customerEmail={user?.primaryEmailAddress?.emailAddress || ''}
                                buttonText="Unlock & Read (Pay ₹199)"
                                onSuccess={(res) =>
                                  handleBookPurchaseSuccess('jivan-jitvu-che', res.orderId, res.paymentId)
                                }
                              />
                            )}
                          </div>
                        </div>
                      </Card>
                    </Col>


                    {/* Book 2: Man Haryu To Badhu Haryu */}
                    <Col xs={24} md={12} lg={8}>
                      <Card
                        hoverable
                        className={`h-full overflow-hidden rounded-3xl border ${
                          purchasedBookIds.includes('man-haryu-to-badhu-haryu') || purchasedBookIds.includes('combo-bundle')
                            ? 'border-[var(--line-soft)] shadow-editorial'
                            : 'border-amber-200 bg-amber-50/20'
                        }`}
                      >
                        <div className="relative bg-blue-50/40 p-4 text-center">
                          <img
                            src="/books/images/Man-Haryu-To-Badhu-Haryu_Gujarati_Master.png"
                            alt="Man Haryu To Badhu Haryu"
                            className="mx-auto h-48 rounded-xl object-cover shadow-lg transition-transform hover:scale-105"
                          />
                          {purchasedBookIds.includes('man-haryu-to-badhu-haryu') || purchasedBookIds.includes('combo-bundle') ? (
                            <Tag color="green" className="!absolute top-3 left-3 !rounded-md !text-[10px] !font-bold">
                              {translate(siteDictionary.dashboard.unlockedBadge, language)}
                            </Tag>
                          ) : (
                            <Tag color="red" className="!absolute top-3 left-3 !rounded-md !text-[10px] !font-bold">
                              LOCKED (₹199)
                            </Tag>
                          )}
                        </div>
                        <div className="p-5">
                          <h4 className="font-playfair text-base font-bold text-[var(--text-strong)] leading-snug">
                            મન હાર્યું તો બધું હાર્યું
                          </h4>
                          <p className="mt-1 text-xs text-[var(--accent-earth)] font-semibold">
                            By Manish Vaghasiya • 250 Pages
                          </p>
                          <p className="mt-2 text-xs text-[var(--text-soft)] line-clamp-2">
                            {translate(
                              {
                                en: 'Master mental strength, confidence, and courage against life challenges.',
                                hi: 'मानसिक मजबूती, आत्मविश्वास और जीवन की चुनौतियों का सामना करने का गाइड।',
                                gu: 'માનસિક મજબૂતી, આત્મવિશ્વાસ અને પડકારો સામે હિંમત રાખવાનું માસ્ટર ગાઇડ.',
                              },
                              language
                            )}
                          </p>

                          <div className="mt-5 pt-4 border-t border-[var(--line-soft)]">
                            {purchasedBookIds.includes('man-haryu-to-badhu-haryu') || purchasedBookIds.includes('combo-bundle') ? (
                              <Link to="/reader/man-haryu-to-badhu-haryu" className="w-full">
                                <Button
                                  type="primary"
                                  icon={<ReadOutlined />}
                                  className="!w-full !h-11 !rounded-xl !bg-[#D4A017] !font-bold hover:!bg-[#b88910]"
                                >
                                  {translate(
                                    {
                                      en: 'Read Online Now (DRM Reader)',
                                      hi: 'अभी ऑनलाइन पढ़ें (DRM रीडर)',
                                      gu: 'ઓનલાઈન વાંચો (DRM રીડર)',
                                    },
                                    language
                                  )}
                                </Button>
                              </Link>
                            ) : (
                              <RazorpayCheckout
                                amountInRupees={199}
                                itemName="મન હાર્યું તો બધું હાર્યું (E-Book)"
                                bookId="man-haryu-to-badhu-haryu"
                                customerName={user?.fullName || ''}
                                customerEmail={user?.primaryEmailAddress?.emailAddress || ''}
                                buttonText="Unlock & Read (Pay ₹199)"
                                onSuccess={(res) =>
                                  handleBookPurchaseSuccess('man-haryu-to-badhu-haryu', res.orderId, res.paymentId)
                                }
                              />
                            )}
                          </div>
                        </div>
                      </Card>
                    </Col>

                    {/* Master Combo Card */}
                    <Col xs={24} md={12} lg={8}>
                      <div className="relative h-full overflow-hidden rounded-3xl border border-amber-300 bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-6 shadow-editorial">
                        <span className="absolute top-0 right-0 rounded-bl-xl bg-[#D4A017] px-3 py-1 text-[10px] font-extrabold uppercase text-white shadow-sm">
                          {translate({ en: 'BEST VALUE COMBO', hi: 'सर्वश्रेष्ठ वैल्यू कॉम्बो', gu: 'શ્રેષ્ઠ મૂલ્ય કોમ્બો' }, language)}
                        </span>
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white mb-4">
                          <TrophyOutlined className="text-xl" />
                        </div>
                        <h4 className="font-playfair text-lg font-bold text-[var(--text-strong)]">
                          {translate({ en: 'Master E-Book Combo Pack', hi: 'मास्टर ई-बुक कॉम्बो पैक', gu: 'બંને માસ્ટર ઈ-બુક કોમ્બો બંડલ' }, language)}
                        </h4>
                        <p className="mt-2 text-xs text-[var(--text-soft)]">
                          {translate({ en: 'Both bestselling books (525+ pages complete collection).', hi: 'दोनों बेस्टसेलिंग बुक्स (525+ पेज संग्रह)।', gu: 'જીવન જીતવું છે તો... + મન હાર્યું તો બધું હાર્યું (૫૨૫+ પેજ સંગ્રહ).' }, language)}
                        </p>
                        <div className="mt-6 flex items-baseline gap-2">
                          <span className="text-2xl font-extrabold text-[var(--accent-earth)]">₹349</span>
                          <span className="text-xs text-gray-400 line-through">₹998</span>
                          <Tag color="green" className="!rounded-md !text-[10px] !font-bold">SAVE 65%</Tag>
                        </div>
                        <div className="mt-6">
                          {purchasedBookIds.includes('combo-bundle') ? (
                            <div className="flex items-center gap-2 rounded-xl bg-green-100 p-3 text-xs font-bold text-green-800">
                              <CheckCircleOutlined className="text-base" /> Full Combo Bundle Unlocked!
                            </div>
                          ) : (
                            <RazorpayCheckout
                              amountInRupees={349}
                              itemName="Gujarati Master E-Book Combo Pack"
                              bookId="combo-bundle"
                              customerName={user?.fullName || ''}
                              customerEmail={user?.primaryEmailAddress?.emailAddress || ''}
                              buttonText="Unlock Both Books (₹349)"
                              onSuccess={(res) =>
                                handleBookPurchaseSuccess('combo-bundle', res.orderId, res.paymentId)
                              }
                            />
                          )}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              ),
            },
            {
              key: 'stats',
              label: (
                <span className="flex items-center gap-2 font-bold">
                  <TrophyOutlined /> {translate(siteDictionary.dashboard.tabStats, language)}
                </span>
              ),
              children: (
                <div className="py-6">
                  <Row gutter={[24, 24]}>
                    <Col xs={24} sm={8}>
                      <div className="rounded-2xl border border-[var(--line-soft)] bg-white p-6 text-center shadow-editorial">
                        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                          <BookOutlined className="text-xl" />
                        </div>
                        <div className="text-3xl font-extrabold text-[var(--text-strong)]">
                          {purchasedBookIds.length}
                        </div>
                        <div className="mt-1 text-xs font-semibold text-[var(--text-soft)]">
                          {translate(siteDictionary.dashboard.statUnlockedBooks, language)}
                        </div>
                      </div>
                    </Col>

                    <Col xs={24} sm={8}>
                      <div className="rounded-2xl border border-[var(--line-soft)] bg-white p-6 text-center shadow-editorial">
                        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                          <ReadOutlined className="text-xl" />
                        </div>
                        <div className="text-3xl font-extrabold text-[var(--text-strong)]">
                          526
                        </div>
                        <div className="mt-1 text-xs font-semibold text-[var(--text-soft)]">
                          {translate(siteDictionary.dashboard.statTotalPages, language)}
                        </div>
                      </div>
                    </Col>

                    <Col xs={24} sm={8}>
                      <div className="rounded-2xl border border-[var(--line-soft)] bg-white p-6 text-center shadow-editorial">
                        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700">
                          <SafetyCertificateOutlined className="text-xl" />
                        </div>
                        <div className="text-3xl font-extrabold text-green-700">
                          Active DRM
                        </div>
                        <div className="mt-1 text-xs font-semibold text-[var(--text-soft)]">
                          {translate(siteDictionary.dashboard.statDrmProtection, language)}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              ),
            },
          ]}
        />
      </div>
    </>
  )
}
