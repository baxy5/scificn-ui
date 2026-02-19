import {
  ToastProvider, ToastViewport,
  Toast, ToastTitle, ToastDescription,
} from '@/ui/toast'
import { useToast, type ToastVariant } from '@/ui/toast/use-toast'
import { Button } from '@/ui/button'
import { PageHeader } from '@/app/components/docs/page-header'
import { Section } from '@/app/components/docs/section'
import { ComponentPreview } from '@/app/components/docs/component-preview'
import { CodeBlock } from '@/app/components/docs/code-block'
import { PropsTable } from '@/app/components/docs/props-table'

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

const installCode = `npm install @radix-ui/react-toast clsx tailwind-merge`

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

function ToastDemo() {
  const { toasts, toast } = useToast()

  const variants: { v: ToastVariant; label: string; title: string; desc?: string }[] = [
    { v: 'STATUS',   label: 'STATUS',   title: 'SEQUENCE COMPLETE',   desc: 'All systems nominal.' },
    { v: 'WARNING',  label: 'WARNING',  title: 'SHIELD LOW',          desc: 'Power at 18%.' },
    { v: 'CRITICAL', label: 'CRITICAL', title: 'HULL BREACH DETECTED' },
    { v: 'INFO',     label: 'INFO',     title: 'MAINTENANCE IN 2H',   desc: 'Schedule a debrief.' },
  ]

  return (
    <ToastProvider>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {variants.map(({ v, label, title, desc }) => (
          <Button
            key={v}
            variant="OUTLINE"
            size="SM"
            onClick={() => toast({ title, description: desc, variant: v })}
          >
            {label}
          </Button>
        ))}
      </div>
      {toasts.map((t) => (
        <Toast key={t.id} variant={t.variant}>
          <ToastTitle>{t.title}</ToastTitle>
          {t.description && <ToastDescription>{t.description}</ToastDescription>}
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}

export default function ToastPage() {
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
