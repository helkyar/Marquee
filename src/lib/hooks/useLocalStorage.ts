import { useEffect, useState } from 'react'

export function useLocalStorage({ key }: { key: string }) {
  const [value, setValue] = useState<unknown>(undefined)

  useEffect(() => {
    const localValue = window.localStorage.getItem(key)
    setValue(localValue ? JSON.parse(localValue) : undefined)
  }, [key])
  useEffect(() => {
    const stringifiedValue = JSON.stringify(value)
    window.localStorage.setItem(key, stringifiedValue)
  }, [value, key])

  const remove = () => {
    window.localStorage.removeItem(key)
    setValue(undefined)
  }

  return [value, setValue, remove] as const
}
