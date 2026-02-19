import { useState, useCallback } from 'react'

export type ToastVariant = 'STATUS' | 'WARNING' | 'CRITICAL' | 'INFO'

export interface ToastData {
  id:          string
  title:       string
  description?: string
  variant?:    ToastVariant
  duration?:   number
}

let toastCounter = 0

export function useToast() {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const toast = useCallback((data: Omit<ToastData, 'id'>) => {
    const id = `toast-${++toastCounter}`
    const duration = data.duration ?? 4000

    setToasts((prev) => [...prev, { ...data, id }])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, duration)

    return id
  }, [])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return { toasts, toast, dismiss }
}
