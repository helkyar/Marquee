'use client'
import { useToggleDarkTheme } from '@/lib/hooks/useToggleDarkTheme'

export default function Header() {
  const { toggleDarkTheme } = useToggleDarkTheme()

  return (
    <header className='absolute top-0 z-10 h-10'>
      <button className='text-gray-600' onClick={toggleDarkTheme}>
        DARK!!
      </button>
    </header>
  )
}
