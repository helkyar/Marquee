import { useCallback, useEffect, useMemo, useState } from 'react'

export function useQueryParams() {
  const [searchParams, setSearchParams] = useState(
    () => new URLSearchParams(window?.location.search || '')
  )
  const pathname = useMemo(
    () => window?.location.pathname || '',
    [window?.location.pathname]
  )

  useEffect(() => {
    const handlePopState = () => {
      setSearchParams(new URLSearchParams(window.location.search))
    }

    window.addEventListener('popstate', handlePopState)
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
    // setSearchParams(new URLSearchParams(window.location.search))
  }, [])

  const replace = useCallback((params: string) => {
    window.history.replaceState({}, '', params)
    setSearchParams(new URLSearchParams(params))
  }, [])

  return { searchParams, pathname, replace }
}
