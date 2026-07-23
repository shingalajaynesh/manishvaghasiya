import type { ReactNode } from 'react'
import { Space, Typography } from 'antd'
import { MotionSection } from './MotionSection'

const { Paragraph, Title } = Typography

interface PageSectionProps {
  title: string
  description?: string
  children: ReactNode
  tone?: 'default' | 'warm' | 'forest'
}

export function PageSection({
  title,
  description,
  children,
  tone = 'default',
}: PageSectionProps) {
  return (
    <section className={`px-1 py-10 sm:px-2 sm:py-12 lg:py-16 ${tone === 'warm' ? 'bg-[var(--panel-soft)]' : tone === 'forest' ? 'bg-[#f4f8f6]' : 'bg-transparent'}`}>
      <div className="editorial-container">
        <MotionSection>
          <Space direction="vertical" size={10} className="max-w-3xl">
            <Title level={2} className="font-playfair !m-0 !text-[1.8rem] !leading-tight !text-[var(--text-strong)] sm:!text-[2.15rem] lg:!text-[2.5rem]">
              {title}
            </Title>
            {description ? (
              <Paragraph className="!mb-0 !text-[15px] !leading-7 !text-[var(--text-soft)] sm:!text-base sm:!leading-8">
                {description}
              </Paragraph>
            ) : null}
          </Space>
        </MotionSection>
        <MotionSection delay={0.1}>
          <div className="mt-6 lg:mt-10">{children}</div>
        </MotionSection>
      </div>
    </section>
  )
}
