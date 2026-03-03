import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
      <div style={{ color: 'var(--color-green)', fontSize: '4rem', textShadow: 'var(--text-glow-green)' }}>404</div>
      <div style={{ letterSpacing: '0.15em' }}>PAGE NOT FOUND</div>
      <Link href="/" style={{ marginTop: '1rem', color: 'var(--color-green)', textDecoration: 'none' }}>← RETURN HOME</Link>
    </div>
  )
}
