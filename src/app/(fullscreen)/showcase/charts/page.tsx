import type { Metadata } from 'next'
import { ChartsContent } from '@/app/_pages/showcase/charts-content'

export const metadata: Metadata = {
  title: 'Sector Analytics Console',
  description: 'Deep space sensor array analytics dashboard showcasing every chart component with live-jittered synthetic sensor data.',
  alternates: { canonical: '/showcase/charts' },
}

export default function Page() {
  return <ChartsContent />
}
