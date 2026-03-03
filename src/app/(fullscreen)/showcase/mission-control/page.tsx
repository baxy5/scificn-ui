import type { Metadata } from 'next'
import { MissionControlContent } from '@/app/_pages/showcase/mission-control-content'

export const metadata: Metadata = {
  title: 'Earth Orbit Command',
  description: 'Real-time space mission control dashboard with live ISS tracking, SpaceX launch history, and crew manifests.',
  alternates: { canonical: '/showcase/mission-control' },
}

export default function Page() {
  return <MissionControlContent />
}
