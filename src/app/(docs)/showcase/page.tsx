import type { Metadata } from 'next'
import ShowcaseIndexContent from '@/app/_pages/showcase-index-content'

export const metadata: Metadata = {
  title: 'Showcase',
  description: 'Full-page examples built with scificn/ui components. Each showcase demonstrates real-world interface patterns using the design system.',
  alternates: { canonical: '/showcase' },
}

export default function Page() {
  return <ShowcaseIndexContent />
}
