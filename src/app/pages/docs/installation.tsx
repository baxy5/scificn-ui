import { useState } from 'react'
import { PageHeader } from '@/app/components/docs/page-header'
import { CodeBlock } from '@/app/components/docs/code-block'


const addMultiple = `npx shadcn@latest add @scificn/button @scificn/badge @scificn/panel
npx shadcn@latest add @scificn/dialog @scificn/toast @scificn/tabs`

const initCode = `npx shadcn@latest init`

const registryCode = `{
  "registries": {
    "scificn": "https://scificn.dev/r"
  }
}`

const globalsCode = `/* src/index.css — or wherever your root CSS lives */
@import './styles/globals.css';`

const usageCode = `import { Button } from '@/ui/button'
import { Badge }  from '@/ui/badge'

export function MyPage() {
  return (
    <>
      <Button variant="EXEC">INITIATE</Button>
      <Badge variant="ACTIVE">ONLINE</Badge>
    </>
  )
}`

// ── Manual track ──────────────────────────────────────────────────────────

const manualDeps = `npm install tailwindcss @tailwindcss/vite \\
  @radix-ui/react-slot @radix-ui/react-checkbox @radix-ui/react-select \\
  @radix-ui/react-switch @radix-ui/react-dialog @radix-ui/react-tabs \\
  @radix-ui/react-tooltip @radix-ui/react-toast @radix-ui/react-progress \\
  @radix-ui/react-separator class-variance-authority clsx tailwind-merge
npm install -D vite-tsconfig-paths`

const manualVite = `// vite.config.ts
import { defineConfig } from 'vite'
import react          from '@vitejs/plugin-react'
import tailwindcss    from '@tailwindcss/vite'
import tsconfigPaths  from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
})`

const manualTsconfig = `// tsconfig.app.json — inside compilerOptions:
"baseUrl": ".",
"paths": { "@/*": ["src/*"] }`

const manualUtils = `// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}`

const manualUsage = `// Copy src/ui/button/button.tsx into your project, then:
import { Button } from '@/ui/button'

export function MyPage() {
  return <Button variant="EXEC">INITIATE</Button>
}`

// ── Step indicator ────────────────────────────────────────────────────────

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        display:      'grid',
        gridTemplateColumns: '2rem 1fr',
        gap:          '1rem',
        marginBottom: '2rem',
      }}
    >
      {/* Number */}
      <div style={{ paddingTop: '0.1rem' }}>
        <div
          style={{
            width:          '2rem',
            height:         '2rem',
            border:         '1px solid var(--color-green)',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            fontSize:       '0.7rem',
            fontWeight:     700,
            color:          'var(--color-green)',
            textShadow:     'var(--text-glow-green)',
            fontFamily:     'var(--font-mono)',
            flexShrink:     0,
          }}
        >
          {n}
        </div>
        {/* Connector line */}
        <div
          style={{
            width:      '1px',
            flex:       1,
            minHeight:  '1.5rem',
            margin:     '0.25rem auto 0',
            background: 'var(--border)',
          }}
        />
      </div>

      {/* Content */}
      <div>
        <div
          style={{
            fontSize:      '0.7rem',
            fontWeight:    600,
            color:         'var(--text-muted)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom:  '0.75rem',
            paddingTop:    '0.45rem',
          }}
        >
          {title}
        </div>
        {children}
      </div>
    </div>
  )
}

// ── Manual toggle ─────────────────────────────────────────────────────────

function ManualSection() {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ marginTop: '3rem' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          background:    'transparent',
          border:        '1px solid var(--border)',
          color:         'var(--text-muted)',
          fontSize:      '0.7rem',
          letterSpacing: '0.12em',
          padding:       '0.5rem 1rem',
          cursor:        'pointer',
          fontFamily:    'var(--font-mono)',
          textTransform: 'uppercase',
          display:       'flex',
          alignItems:    'center',
          gap:           '0.5rem',
          width:         '100%',
          justifyContent:'space-between',
          transition:    'border-color 0.15s, color 0.15s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'var(--text-muted)'
          e.currentTarget.style.color = 'var(--text-secondary)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'var(--border)'
          e.currentTarget.style.color = 'var(--text-muted)'
        }}
      >
        <span>Manual installation — without shadcn CLI</span>
        <span>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div
          style={{
            borderLeft:  '1px solid var(--border)',
            marginTop:   '1.5rem',
            paddingLeft: '1.5rem',
            display:     'flex',
            flexDirection: 'column',
            gap:         '1.5rem',
          }}
        >
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>
            For projects not using the shadcn CLI. You handle dependencies, path aliases, and file copying yourself.
          </p>

          <div>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: '0.6rem' }}>
              1 — INSTALL DEPENDENCIES
            </p>
            <CodeBlock code={manualDeps} language="bash" />
          </div>

          <div>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: '0.6rem' }}>
              2 — CONFIGURE VITE
            </p>
            <CodeBlock code={manualVite} language="ts" />
          </div>

          <div>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: '0.6rem' }}>
              3 — ADD PATH ALIAS
            </p>
            <CodeBlock code={manualTsconfig} language="json" />
          </div>

          <div>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: '0.6rem' }}>
              4 — CREATE CN() UTILITY
            </p>
            <CodeBlock code={manualUtils} language="ts" />
          </div>

          <div>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: '0.6rem' }}>
              5 — IMPORT GLOBALS.CSS (same as CLI track)
            </p>
            <CodeBlock code={globalsCode} language="css" />
          </div>

          <div>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: '0.6rem' }}>
              6 — COPY A COMPONENT + USE
            </p>
            <CodeBlock code={manualUsage} language="tsx" />
            <p style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              Each component lives at{' '}
              <span style={{ color: 'var(--color-green)' }}>src/ui/{'{'}name{'}'}/{'{'}name{'}'}.tsx</span>.
              Copy it into your project's component directory and import as shown.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────

export default function Installation() {
  return (
    <div>
      <PageHeader
        title="INSTALLATION"
        description="Add any component with a single command. The shadcn CLI downloads the source into your project and installs dependencies automatically."
      />

      {/* Step flow */}
      <Step n={1} title="First time only — init shadcn + add registry">
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
          If you don't have shadcn set up yet, initialise it first:
        </p>
        <CodeBlock code={initCode} language="bash" />
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.7, margin: '1rem 0 0.75rem' }}>
          Then add the scificn registry to{' '}
          <span style={{ color: 'var(--color-green)' }}>components.json</span>:
        </p>
        <CodeBlock code={registryCode} language="json" />
      </Step>

      <Step n={2} title="Add globals.css — required once">
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
          Copy{' '}
          <span style={{ color: 'var(--color-green)' }}>src/styles/globals.css</span>{' '}
          from the{' '}
          <a
            href="https://github.com/scificn/scificn-ui"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--color-green)', textDecoration: 'none' }}
          >
            scificn-ui repo
          </a>{' '}
          into your project, then import it at your root:
        </p>
        <CodeBlock code={globalsCode} language="css" />
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.7, marginTop: '0.75rem' }}>
          This file defines every design token — CSS variables, Tailwind{' '}
          <span style={{ color: 'var(--color-green)' }}>@theme</span> blocks,
          glow animations, and the three theme overrides. Components won't render
          correctly without it.
        </p>
      </Step>

      <Step n={3} title="Add components">
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
          Install one or several at a time. The CLI copies the source into your project
          and runs <span style={{ color: 'var(--color-green)' }}>npm install</span> for any peer dependencies:
        </p>
        <CodeBlock code={addMultiple} language="bash" />
      </Step>

      <Step n={4} title="Use it">
        <CodeBlock code={usageCode} language="tsx" />
      </Step>

      <ManualSection />
    </div>
  )
}
