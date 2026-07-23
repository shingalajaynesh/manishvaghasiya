import { Tag, Typography } from 'antd'

const { Paragraph, Title } = Typography

interface PageHeroProps {
  eyebrow: string
  title: string
  description: string
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="editorial-container px-1 pb-6 pt-8 sm:px-2 lg:pb-10 lg:pt-14">
      <div className="editorial-hero px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-12">
        <div className="max-w-4xl">
          <Tag bordered={false} color="volcano" className="!mb-4 !rounded-full !px-3 !py-1 !text-[10px] !font-semibold !uppercase !tracking-[0.16em] sm:!px-4 sm:!text-xs">
            {eyebrow}
          </Tag>
          <Title className="font-playfair !m-0 !text-[1.95rem] !leading-[1.08] !text-[var(--text-strong)] sm:!text-[2.6rem] lg:!text-5xl">
            {title}
          </Title>
          <Paragraph className="!mb-0 !mt-4 !max-w-3xl !text-[15px] !leading-7 !text-[var(--text-soft)] sm:!text-base lg:!text-lg lg:!leading-8">
            {description}
          </Paragraph>
        </div>
      </div>
    </section>
  )
}
