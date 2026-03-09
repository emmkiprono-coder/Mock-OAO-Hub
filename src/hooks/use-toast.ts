import { useState } from "react"
export function useToast() {
  const [toasts, setToasts] = useState<any[]>([])
  return { toasts, toast: (props: any) => setToasts(p => [...p, props]), dismiss: () => setToasts([]) }
}
export type { useToast }
