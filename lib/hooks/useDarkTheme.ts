import { useCallback, useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'

const THEME_KEY = '_dark_theme_'
export const enum Theme {
  Light = 'light',
  Dark = 'dark',
  System = 'system',
}

export function useDarkTheme() {
  const [isDark, setIsDark] = useLocalStorage<Theme>({
    key: THEME_KEY,
    defaultValue: Theme.System,
  })

  const setIsDarkStyle = useCallback((isDark: boolean) => {
    if (isDark) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [])

  useEffect(() => {
    if (isDark === Theme.Light) {
      setIsDarkStyle(false)
    } else if (isDark === Theme.Dark) {
      setIsDarkStyle(true)
    } else {
      const systemTheme = window.matchMedia(
        '(prefers-color-scheme: Dark)'
      ).matches
      setIsDarkStyle(systemTheme)
    }
  }, [isDark, setIsDarkStyle])

  const specifyDarkTheme = (theme: Theme) => {
    setIsDark(theme)
  }

  return { specifyDarkTheme }
}
