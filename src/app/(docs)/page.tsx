import type { Metadata } from 'next'
import HomeContent from '@/app/_pages/home-content'

export const metadata: Metadata = {
  title: 'scificn-ui | Retro Sci-Fi React UI Components',
  description: 'A copy-paste retro sci-fi React component library. Cassette Futurism design system with phosphor glow, corner notches, and terminal aesthetics. Built on Radix UI and Tailwind CSS v4.',
  alternates: { canonical: '/' },
}

export default function Page() {
  return <HomeContent />
}
