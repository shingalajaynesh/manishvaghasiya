import { useState, useMemo } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  MenuOutlined,
  UserOutlined,
  BookOutlined,
  HomeOutlined,
  UserSwitchOutlined,
  PictureOutlined,
  ReadOutlined,
  VideoCameraOutlined,
  MailOutlined,
  DashboardOutlined,
  CloseOutlined,
} from '@ant-design/icons'
import { Drawer, Select } from 'antd'
import { primaryNavigation, routePaths } from '../../../content/routes'
import { languageOptions, siteDictionary, translate } from '../../../content/i18n'
import { speakerMedia } from '../../../content/speakerMedia'
import { useLanguage } from '../../lib/language'
import { SignedIn, SignedOut, useUser } from '../../lib/clerk'
import { CustomUserProfile } from '../auth/CustomUserProfile'

const NAV_ICONS: Record<string, React.ReactNode> = {
  home: <HomeOutlined />,
  about: <UserSwitchOutlined />,
  photos: <PictureOutlined />,
  blog: <ReadOutlined />,
  videos: <VideoCameraOutlined />,
  resources: <BookOutlined />,
  dashboard: <DashboardOutlined />,
  contact: <MailOutlined />,
}

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileModalOpen, setProfileModalOpen] = useState(false)
  const location = useLocation()
  const { language, setLanguage } = useLanguage()
  const { user } = useUser()

  const selectedKey = useMemo(() => {
    const match = [...primaryNavigation]
      .reverse()
      .find((item) => item.to !== '/' && location.pathname.startsWith(item.to))
    return match?.to ?? routePaths.home
  }, [location.pathname])

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--line-soft)] bg-[var(--bg-layout)]/95 backdrop-blur-md transition-all duration-300">
      <CustomUserProfile open={profileModalOpen} onClose={() => setProfileModalOpen(false)} />
      <div className="editorial-container flex h-16 flex-nowrap items-center justify-between gap-2 px-2 sm:px-4">

        {/* Left: Brand Logo & Name */}
        <Link to={routePaths.home} className="flex items-center gap-2.5 shrink-0 min-w-0">
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-[#D4A017] shadow-sm">
            <img
              src={speakerMedia.heroStage}
              alt="Manish Vaghasiya"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="font-playfair text-sm sm:text-base font-bold tracking-tight text-[var(--text-strong)] whitespace-nowrap">
            Manish Vaghasiya
          </span>
        </Link>

        {/* Center: Desktop Nav Items (Single Line, Compact Spacing) */}
        <nav className="hidden xl:flex items-center gap-1 shrink flex-nowrap overflow-x-auto no-scrollbar">
          {primaryNavigation.map((item) => {
            const isActive = selectedKey === item.to
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-semibold transition-all duration-200 ${isActive
                    ? 'bg-[#D4A017] text-white shadow-sm font-bold'
                    : 'text-[var(--text-soft)] hover:bg-[#D4A017]/10 hover:text-[var(--accent-earth)]'
                  }`}
              >
                {translate(siteDictionary.navigation[item.labelKey], language)}
              </NavLink>
            )
          })}
        </nav>

        {/* Right: Actions & Clerk Auth Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 flex-nowrap">

          {/* Language Selector */}
          <Select
            value={language}
            onChange={setLanguage}
            options={languageOptions}
            className="w-[82px] sm:w-[95px] !rounded-lg"
            size="small"
          />

          {/* Signed In State */}
          <SignedIn>
            <Link to={routePaths.dashboard} className="hidden sm:inline-block">
              <button className="flex items-center gap-1 rounded-lg bg-amber-500/15 px-2.5 py-1 text-xs font-bold text-[#8e4527] border border-amber-500/30 hover:bg-amber-500/25 transition-all whitespace-nowrap">
                <DashboardOutlined />
                <span>Dashboard</span>
              </button>
            </Link>

            {/* Custom User Avatar Profile Trigger */}
            <button
              onClick={() => setProfileModalOpen(true)}
              className="flex items-center gap-1.5 rounded-full border border-amber-400 bg-amber-50 p-1 pr-2.5 text-xs font-bold text-slate-800 shadow-sm hover:bg-amber-100 transition-all"
              title="Open My Profile"
            >
              {user?.imageUrl ? (
                <img src={user.imageUrl} alt="Profile" className="h-6 w-6 rounded-full object-cover border border-amber-500" />
              ) : (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D4A017] text-white text-xs font-bold">
                  {user?.firstName ? user.firstName[0] : 'U'}
                </div>
              )}
              <span className="max-w-[70px] truncate">{user?.firstName || 'Account'}</span>
            </button>
          </SignedIn>

          {/* Signed Out State */}
          <SignedOut>
            <Link to="/sign-in">
              <button className="flex items-center gap-1 rounded-lg border border-[var(--line-strong)] bg-white px-2.5 py-1 text-xs font-bold text-[var(--text-strong)] shadow-sm hover:bg-amber-50 transition-all whitespace-nowrap">
                <UserOutlined />
                <span>Sign In</span>
              </button>
            </Link>

            <Link to={routePaths.resources} className="hidden md:inline-block">
              <button className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-[#D4A017] to-[#b88910] px-3 py-1 text-xs font-bold text-white shadow-sm hover:shadow hover:scale-[1.01] active:scale-95 transition-all whitespace-nowrap">
                <BookOutlined />
                <span>Buy E-Books</span>
              </button>
            </Link>
          </SignedOut>

          {/* Mobile / Tablet Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--line-soft)] bg-white text-[var(--text-strong)] shadow-sm hover:bg-amber-50 xl:hidden"
            aria-label="Toggle Menu"
          >
            <MenuOutlined className="text-sm" />
          </button>
        </div>
      </div>

      {/* Mobile Slide-Over Navigation Drawer */}
      <Drawer
        placement="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        closeIcon={<CloseOutlined className="text-base text-[var(--text-strong)]" />}
        title={
          <div className="flex items-center gap-2">
            <span className="font-playfair text-base font-bold text-[var(--text-strong)]">
              {translate({ en: 'Navigation Menu', hi: 'नेविगेशन मेनू', gu: 'નેવિગેશન મેનૂ' }, language)}
            </span>
          </div>
        }
        styles={{
          body: { background: '#FAF5ED', padding: '16px' },
          header: { background: '#FAF5ED', borderBottom: '1px solid var(--line-soft)' },
        }}
      >
        <div className="flex flex-col gap-2">
          {primaryNavigation.map((item) => {
            const isActive = selectedKey === item.to
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${isActive
                    ? 'bg-[#D4A017] text-white shadow-md font-bold'
                    : 'bg-white text-[var(--text-strong)] border border-[var(--line-soft)] hover:bg-amber-50'
                  }`}
              >
                <span className="text-base">{NAV_ICONS[item.labelKey]}</span>
                <span>{translate(siteDictionary.navigation[item.labelKey], language)}</span>
              </Link>
            )
          })}

          <div className="mt-4 pt-4 border-t border-[var(--line-soft)] space-y-3">
            <SignedIn>
              <Link
                to={routePaths.dashboard}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#D4A017] p-2.5 text-sm font-bold text-white shadow-md"
              >
                <DashboardOutlined />
                <span>Go to User Dashboard</span>
              </Link>
            </SignedIn>

            <SignedOut>
              <Link
                to="/sign-in"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-[var(--line-strong)] bg-white p-2.5 text-sm font-bold text-[var(--text-strong)] shadow-sm"
              >
                <UserOutlined />
                <span>Sign In / Register Account</span>
              </Link>

              <Link
                to={routePaths.resources}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D4A017] to-[#b88910] p-2.5 text-sm font-bold text-white shadow-md"
              >
                <BookOutlined />
                <span>Buy E-Books (₹199+)</span>
              </Link>
            </SignedOut>
          </div>
        </div>
      </Drawer>
    </header>
  )
}
