import type { Metadata } from 'next'
import IntroductionContent from '@/app/_pages/docs/introduction-content'

export const metadata: Metadata = {
  title: 'Introduction',
  description: 'What scificn/ui is, why it exists, and how it works.',
  alternates: { canonical: '/docs/introduction' },
}

export default function Page() {
  return <IntroductionContent />
}
