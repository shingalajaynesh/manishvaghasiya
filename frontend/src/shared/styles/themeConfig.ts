import type { ThemeConfig } from 'antd'
import { designTokens } from './designTokens'

export const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: designTokens.colorPrimary,
    colorSuccess: designTokens.colorSuccess,
    colorBgBase: designTokens.colorBgBase,
    colorBgLayout: designTokens.colorBgLayout,
    colorBgContainer: designTokens.colorBgContainer,
    colorBgElevated: designTokens.colorBgElevated,
    colorText: designTokens.colorText,
    colorTextSecondary: designTokens.colorTextSecondary,
    colorTextTertiary: designTokens.colorTextTertiary,
    colorBorder: designTokens.colorBorder,
    colorBorderSecondary: designTokens.colorBorderSecondary,
    colorLink: designTokens.colorLink,
    fontFamily: designTokens.fontFamily,
    borderRadius: designTokens.borderRadius,
    boxShadow: designTokens.boxShadow,
    boxShadowSecondary: designTokens.boxShadowSecondary,
  },
  components: {
    Layout: {
      bodyBg: designTokens.colorBgLayout,
      footerBg: '#f5ede2',
      headerBg: 'rgba(250,245,237,0.88)',
      siderBg: designTokens.colorBgLayout,
      triggerBg: designTokens.colorPrimary,
    },
    Button: {
      borderRadius: 999,
      controlHeight: 44,
      paddingInline: 24,
      fontWeight: 600,
      primaryShadow: '0 12px 24px rgba(174, 88, 49, 0.24)',
    },
    Card: {
      borderRadiusLG: designTokens.borderRadiusLG,
      paddingLG: 24,
      headerFontSize: 22,
    },
    Menu: {
      itemBorderRadius: 8,
      itemColor: designTokens.colorTextSecondary,
      itemHoverColor: designTokens.colorText,
      itemSelectedColor: designTokens.colorPrimary,
      itemSelectedBg: 'rgba(174, 88, 49, 0.08)',
      horizontalItemBorderRadius: 8,
    },
    Input: {
      borderRadius: 12,
      controlHeight: 48,
    },
    Typography: {
      titleMarginBottom: 0.35,
      titleMarginTop: 0.2,
    },
    Tag: {
      borderRadiusSM: 999,
    },
  },
}
