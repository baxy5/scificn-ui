import { PageHeader } from '@/app/components/docs/page-header'
import { Section } from '@/app/components/docs/section'
import { CodeBlock } from '@/app/components/docs/code-block'

// ── CLI install track ──────────────────────────────────────────────────────────

const cliStep1 = `npx shadcn@latest init`

const cliStep2 = `// components.json — add the scificn registry
{
  "registries": {
    "scificn": "https://scificn.dev/r"
  }
}`

const cliStep3 = `# Copy src/styles/globals.css from the scificn-ui repo into your project.
# Then import it in your root CSS file:

/* src/index.css  (or src/app/globals.css) */
@import './styles/globals.css';`

const cliStep4 = `# Install any component by name — shadcn handles file copy + npm install:
npx shadcn@latest add @scificn/button
npx shadcn@latest add @scificn/panel
npx shadcn@latest add @scificn/toast
npx shadcn@latest add @scificn/dialog

# Or install multiple at once:
npx shadcn@latest add @scificn/button @scificn/badge @scificn/alert`

const cliUsage = `import { Button } from '@/ui/button'

export function MyPage() {
  return <Button variant="EXEC">INITIATE</Button>
}`

// ── Manual install track ───────────────────────────────────────────────────────

const manualStep1 = `npm install tailwindcss @tailwindcss/vite react-router-dom \\
  @radix-ui/react-slot @radix-ui/react-checkbox @radix-ui/react-select \\
  @radix-ui/react-switch @radix-ui/react-dialog @radix-ui/react-tabs \\
  @radix-ui/react-tooltip @radix-ui/react-toast @radix-ui/react-progress \\
  @radix-ui/react-separator class-variance-authority clsx tailwind-merge

npm install -D vite-tsconfig-paths`

const manualStep2 = `// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
})`

const manualStep3 = `// tsconfig.app.json — add inside compilerOptions:
"baseUrl": ".",
"paths": { "@/*": ["src/*"] }`

const manualStep4 = `// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}`

const manualStep5 = `/* src/index.css */
@import './styles/globals.css';`

const manualStep6 = `// Pick a component and copy its source into your project.
// Example: copy src/ui/button/button.tsx → your project's src/ui/button/button.tsx

import { Button } from '@/ui/button'

export function MyPage() {
  return <Button variant="EXEC">INITIATE</Button>
}`

export default function Installation() {
  return (
    <div>
      <PageHeader
        title="INSTALLATION"
        description="Add scificn/ui components to your project via the shadcn CLI or by copying files manually."
      />

      {/* ── CLI TRACK ─────────────────────────────────────────────────── */}

      <Section title="VIA SHADCN CLI (RECOMMENDED)">
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: 1.7 }}>
          scificn/ui is compatible with the{' '}
          <span style={{ color: 'var(--color-green)' }}>shadcn CLI</span>. Each
          component is hosted in the scificn registry — the CLI downloads the
          source, writes it into your project, and installs npm dependencies
          automatically.
        </p>
      </Section>

      <Section title="CLI STEP 1 — INIT SHADCN">
        <CodeBlock code={cliStep1} language="bash" />
        <p style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
          If you already have shadcn set up, skip to step 2.
        </p>
      </Section>

      <Section title="CLI STEP 2 — ADD SCIFICN REGISTRY">
        <CodeBlock code={cliStep2} language="json" />
        <p style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
          Add the <span style={{ color: 'var(--color-green)' }}>scificn</span> registry
          entry to your <span style={{ color: 'var(--color-green)' }}>components.json</span>.
          This tells the CLI where to fetch component files.
        </p>
      </Section>

      <Section title="CLI STEP 3 — ADD GLOBALS.CSS">
        <CodeBlock code={cliStep3} language="bash" />
        <p style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
          Copy <span style={{ color: 'var(--color-green)' }}>src/styles/globals.css</span>{' '}
          from this repository into your project. It defines all CSS design tokens,
          Tailwind <code style={{ color: 'var(--color-green)' }}>@theme</code> blocks,
          keyframe animations, theme overrides, and base resets.
        </p>
      </Section>

      <Section title="CLI STEP 4 — ADD COMPONENTS">
        <CodeBlock code={cliStep4} language="bash" />
      </Section>

      <Section title="CLI STEP 5 — USE THE COMPONENT">
        <CodeBlock code={cliUsage} language="tsx" />
      </Section>

      {/* ── DIVIDER ───────────────────────────────────────────────────── */}

      <div style={{
        margin: '2.5rem 0',
        padding: '0.75rem 1rem',
        border: '1px solid var(--border)',
        background: 'var(--surface)',
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
        letterSpacing: '0.08em',
      }}>
        ── ALTERNATIVE: MANUAL COPY-PASTE ──────────────────────────────────────
      </div>

      {/* ── MANUAL TRACK ──────────────────────────────────────────────── */}

      <Section title="STEP 1 — INSTALL DEPENDENCIES">
        <CodeBlock code={manualStep1} language="bash" />
      </Section>

      <Section title="STEP 2 — CONFIGURE VITE">
        <CodeBlock code={manualStep2} language="ts" />
      </Section>

      <Section title="STEP 3 — ADD PATH ALIAS">
        <CodeBlock code={manualStep3} language="json" />
      </Section>

      <Section title="STEP 4 — CREATE CN() UTILITY">
        <CodeBlock code={manualStep4} language="ts" />
      </Section>

      <Section title="STEP 5 — IMPORT GLOBALS.CSS">
        <CodeBlock code={manualStep5} language="css" />
        <p style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
          Copy <span style={{ color: 'var(--color-green)' }}>src/styles/globals.css</span>{' '}
          from this repository into your project.
        </p>
      </Section>

      <Section title="STEP 6 — COPY A COMPONENT">
        <CodeBlock code={manualStep6} language="tsx" />
        <p style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
          Each component is a single self-contained{' '}
          <span style={{ color: 'var(--color-green)' }}>.tsx</span> file. Copy it from{' '}
          <span style={{ color: 'var(--color-green)' }}>src/ui/{'{name}'}/{'{name}'}.tsx</span>{' '}
          into your project's component directory.
        </p>
      </Section>
    </div>
  )
}
