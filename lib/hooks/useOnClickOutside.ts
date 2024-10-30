import { useEffect } from 'react'

export function useOnClickOutside(
  refs: React.RefObject<HTMLElement>[],
  handler: (event?: MouseEvent) => void
) {
  useEffect(() => {
    const eventHandler = (event: MouseEvent) => {
      if (refs.every((ref) => !ref.current?.contains(event.target as Node))) {
        handler(event)
      }
    }

    document.addEventListener('click', eventHandler)

    return () => {
      document.removeEventListener('click', eventHandler)
    }
  }, [refs, handler])
}
