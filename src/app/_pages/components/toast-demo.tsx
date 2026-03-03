'use client'

import {
  ToastProvider, ToastViewport,
  Toast, ToastTitle, ToastDescription,
} from '@/ui/toast'
import { useToast, type ToastVariant } from '@/ui/toast/use-toast'
import { Button } from '@/ui/button'

export function ToastDemo() {
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
