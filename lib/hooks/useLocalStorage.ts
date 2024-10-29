import { useEffect, useState } from 'react'

export function useLocalStorage({ key }: { key: string }) {
  const localValue = window.localStorage.getItem(key)
  const parsedValue = localValue ? JSON.parse(localValue) : null
  const [value, setValue] = useState<unknown>(parsedValue)

  useEffect(() => {
    if (value == null) return
    const stringifiedValue = JSON.stringify(value)
    window.localStorage.setItem(key, stringifiedValue)
  }, [value, key])

  const remove = () => {
    window.localStorage.removeItem(key)
    setValue(undefined)
  }

  return [value, setValue, remove] as const
}
