import type { Metadata } from 'next'
import { StarWarsContent } from '@/app/_pages/showcase/star-wars-content'

export const metadata: Metadata = {
  title: 'Imperial Command Interface',
  description: 'Full-screen Imperial Navy sector command terminal with tactical grid, mission briefing, and live system status.',
  alternates: { canonical: '/showcase/star-wars' },
}

export default function Page() {
  return <StarWarsContent />
}
