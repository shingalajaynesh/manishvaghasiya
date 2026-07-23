import type { ReactNode } from 'react'
import { Card, Tag, Typography } from 'antd'

const { Paragraph, Title } = Typography

interface ContentCardProps {
  title: string
  description: string
  meta?: string
  icon?: ReactNode
  tone?: 'warm' | 'forest' | 'default'
}

export function ContentCard({
  title,
  description,
  meta,
  icon,
  tone = 'default',
}: ContentCardProps) {
  const iconBackground =
    tone === 'forest'
      ? 'bg-[rgba(34,95,83,0.10)] text-[var(--accent-forest)]'
      : 'bg-[rgba(174,88,49,0.10)] text-[var(--accent-earth)]'

  const tagColor = tone === 'forest' ? 'green' : 'volcano'

  return (
    <Card className={`editorial-card editorial-surface editorial-surface--${tone} h-full rounded-[20px]`}>
      {icon ? (
        <div className={`mb-4 inline-flex rounded-xl p-3 ${iconBackground}`}>
          {icon}
        </div>
      ) : null}
      {meta ? (
        <Tag bordered={false} color={tagColor} className="mb-3 rounded-full px-3 py-1 font-semibold uppercase tracking-[0.15em] text-xs">
          {meta}
        </Tag>
      ) : null}
      <Title level={3} className="font-playfair !mb-3 !text-[1.45rem] !leading-tight !text-[var(--text-strong)] sm:!text-2xl">
        {title}
      </Title>
      <Paragraph className="!mb-0 !text-[14px] !leading-7 !text-[var(--text-soft)] sm:!text-sm">
        {description}
      </Paragraph>
    </Card>
  )
}
