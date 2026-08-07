import { MenuOutlined } from '@ant-design/icons'

import { Button, Drawer, Layout, Menu, Select, Space, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { primaryNavigation, routePaths } from '../../../content/routes'
import { languageOptions, siteDictionary, translate } from '../../../content/i18n'
import { speakerMedia } from '../../../content/speakerMedia'
import { useLanguage } from '../../lib/language'


const { Header } = Layout
const { Text } = Typography

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { language, setLanguage } = useLanguage()

  const selectedKey = useMemo(() => {
    const match = [...primaryNavigation]
      .reverse()
      .find((item) => item.to !== '/' && location.pathname.startsWith(item.to))
    return match?.to ?? routePaths.home
  }, [location.pathname])

  const items = primaryNavigation.map((item) => ({
    key: item.to,
    label: <NavLink to={item.to}>{translate(siteDictionary.navigation[item.labelKey], language)}</NavLink>,
  }))

  return (
    <Header className="sticky top-0 z-40 !h-auto !border-b !border-[var(--line-soft)] !px-0 !py-0 backdrop-blur" style={{ background: 'rgba(250,245,237,0.90)' }}>
      <div className="editorial-container flex items-center justify-between gap-3 px-1 py-3 sm:px-2">
        <Link to={routePaths.home} className="flex items-center gap-3 min-w-0">
          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[var(--line-soft)] shadow-sm bg-[var(--panel-soft)]">
            <img src={speakerMedia.heroStage} alt="Manish Vaghasiya portrait logo" className="h-full w-full object-cover" />
          </div>



          <div className="min-w-0 leading-none">
            <Text className="!block !font-semibold !text-[var(--text-strong)]" style={{ fontSize: 15 }}>
              Manish Vaghasiya
            </Text>
            <Text className="!hidden !text-xs !text-[var(--text-muted)] sm:!block" style={{ marginTop: 2 }}>
              {translate(siteDictionary.brandTagline, language)}
            </Text>
          </div>
        </Link>

        <Menu
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={items}
          className="hidden min-w-0 flex-1 justify-end border-none bg-transparent lg:flex"
          overflowedIndicator={null}
        />

        <Space size={8} className="shrink-0">
          <Button
            type="primary"
            onClick={() => window.location.href = routePaths.resources}
            className="!hidden sm:!inline-flex !rounded-xl !bg-[#D4A017] !font-bold hover:!bg-[#b88910]"
          >
            Buy E-Books (₹199+)
          </Button>
          <Select
            value={language}
            onChange={setLanguage}
            options={languageOptions}
            className="w-[88px] sm:w-[110px]"
            size="small"
          />
          <Button
            type="default"
            shape="circle"
            icon={<MenuOutlined />}
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
            className="lg:hidden"
            style={{ borderColor: 'var(--line-soft)' }}
          />
        </Space>

      </div>

      <Drawer
        placement="right"
        open={open}
        onClose={() => setOpen(false)}
        title={translate({ en: 'Navigate', hi: 'नेविगेट करें', gu: 'નેવિગેટ કરો' }, language)}
        styles={{
          body: { background: '#faf5ed' },
          header: { background: '#faf5ed', borderBottom: '1px solid var(--line-soft)' },
        }}
      >
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={items}
          onClick={() => setOpen(false)}
          className="border-none bg-transparent"
        />
      </Drawer>
    </Header>
  )
}
