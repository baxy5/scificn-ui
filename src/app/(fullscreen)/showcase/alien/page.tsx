import type { Metadata } from 'next'
import { AlienContent } from '@/app/_pages/showcase/alien-content'

export const metadata: Metadata = {
  title: 'Nostromo Ship Management',
  description: 'USCSS Nostromo crew terminal powered by MU/TH/UR 6000 with crew vitals, sensor sweep, and emergency systems.',
  alternates: { canonical: '/showcase/alien' },
}

export default function Page() {
  return <AlienContent />
}
