import { useCallback, useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'

const THEME_KEY = '_dark_theme_'

export function useToggleDarkTheme() {
  const [isDark, setIsDark] = useLocalStorage({ key: THEME_KEY })

  const setIsDarkStyle = useCallback((isDark: boolean) => {
    if (isDark) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [])

  useEffect(() => {
    if (typeof isDark === 'boolean') setIsDarkStyle(isDark)
    else {
      const systemTheme = window.matchMedia(
        '(prefers-color-scheme: Dark)'
      ).matches
      setIsDark(systemTheme)
    }
  }, [isDark, setIsDarkStyle])

  const toggleDarkTheme = () => {
    setIsDark(!isDark)
  }

  return { toggleDarkTheme }
}
