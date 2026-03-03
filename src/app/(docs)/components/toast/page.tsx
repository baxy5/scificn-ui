import type { Metadata } from 'next'
import {
  ToastProvider,
  Toast, ToastTitle, ToastDescription,
} from '@/ui/toast'
import { ToastDemo } from '@/app/_pages/components/toast-demo'
import { PageHeader } from '@/app/_components/docs/page-header'
import { Section } from '@/app/_components/docs/section'
import { ComponentPreview } from '@/app/_components/docs/component-preview'
import { CodeBlock } from '@/app/_components/docs/code-block'
import { PropsTable } from '@/app/_components/docs/props-table'

export const metadata: Metadata = {
  title: 'TOAST',
  description: 'Non-blocking notification built on Radix UI. Slides in from bottom-right. Four semantic variants. Managed via useToast hook with auto-dismiss.',
  alternates: { canonical: '/components/toast' },
}

const previewCode = `import {
  ToastProvider, ToastViewport,
  Toast, ToastTitle, ToastDescription,
} from '@/ui/toast'
import { useToast } from '@/ui/toast/use-toast'
import { Button } from '@/ui/button'

function Example() {
  const { toasts, toast } = useToast()
  return (
    <ToastProvider>
      <Button variant="EXEC" onClick={() => toast({ title: 'SEQUENCE COMPLETE', variant: 'STATUS' })}>
        TRIGGER TOAST
      </Button>
      {toasts.map((t) => (
        <Toast key={t.id} variant={t.variant}>
          <ToastTitle>{t.title}</ToastTitle>
          {t.description && <ToastDescription>{t.description}</ToastDescription>}
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}`

const installCode = `npx shadcn@latest add @scificn/toast`


const hookUsageCode = `import { useToast } from '@/ui/toast/use-toast'

export function MyComponent() {
  const { toasts, toast, dismiss } = useToast()

  function handleAlert() {
    toast({
      title: 'SHIELD FAILURE',
      description: 'Sector 7 shields offline.',
      variant: 'CRITICAL',
      duration: 6000,    // ms before auto-dismiss (default: 4000)
    })
  }

  return <button onClick={handleAlert}>TRIGGER</button>
}`

export default function Page() {
  return (
    <div>
      <PageHeader
        title="TOAST"
        description="Non-blocking notification built on Radix UI. Slides in from bottom-right. Four semantic variants. Managed via useToast hook with auto-dismiss."
        dependencies={['@radix-ui/react-toast']}
      />

      <Section title="PREVIEW">
        <ComponentPreview
          code={previewCode}
          preview={<ToastDemo />}
        />
      </Section>

      <Section title="INSTALLATION">
        <CodeBlock code={installCode} language="bash" />
        <p style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Then copy <span style={{ color: 'var(--color-green)' }}>src/ui/toast/toast.tsx</span> and{' '}
          <span style={{ color: 'var(--color-green)' }}>src/ui/toast/use-toast.ts</span> into your project.
        </p>
      </Section>

      <Section title="HOOK USAGE">
        <CodeBlock code={hookUsageCode} />
      </Section>

      <Section title="VARIANTS">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '0.75rem',
          }}
        >
          {(['STATUS', 'WARNING', 'CRITICAL', 'INFO'] as const).map((v) => (
            <div key={v} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <ToastProvider>
                <Toast variant={v} open>
                  <ToastTitle>
                    {v === 'STATUS'   && 'SYSTEM NOMINAL'}
                    {v === 'WARNING'  && 'LOW POWER ALERT'}
                    {v === 'CRITICAL' && 'BREACH DETECTED'}
                    {v === 'INFO'     && 'MAINTENANCE WINDOW'}
                  </ToastTitle>
                  <ToastDescription>
                    {v === 'STATUS'   && 'All subsystems operational.'}
                    {v === 'WARNING'  && 'Power reserves below 20%.'}
                    {v === 'CRITICAL' && 'Evacuate affected sectors.'}
                    {v === 'INFO'     && 'Scheduled in 48 hours.'}
                  </ToastDescription>
                </Toast>
              </ToastProvider>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
                variant=&quot;{v}&quot;
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="PROPS">
        <PropsTable
          rows={[
            { prop: 'variant',     type: 'STATUS | WARNING | CRITICAL | INFO', defaultValue: 'STATUS', description: 'Controls left border color, glow, and prefix symbol.' },
            { prop: 'open',        type: 'boolean',                            defaultValue: '—',      description: 'Controlled open state (used by ToastProvider internally).' },
            { prop: 'onOpenChange',type: '(open: boolean) => void',            defaultValue: '—',      description: 'Callback when open state changes.' },
            { prop: 'duration',    type: 'number (on toast() call)',           defaultValue: '4000',   description: 'Auto-dismiss delay in milliseconds.' },
          ]}
        />
      </Section>
    </div>
  )
}
