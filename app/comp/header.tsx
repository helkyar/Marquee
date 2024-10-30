'use client'
import { useToggleDarkTheme } from '@/lib/hooks/useToggleDarkTheme'
import { useParamsFromUrl } from '@/lib/hooks/useUrlParams'

const inputQuery = 'query'
export default function Header() {
  const { toggleDarkTheme } = useToggleDarkTheme()

  const { updateUrlParams, currentParam } = useParamsFromUrl(inputQuery)

  const updateParamForFun = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateUrlParams({ [inputQuery]: e.target.value, duras2: 'duras2' })
  }

  return (
    <header className='absolute top-0 z-10 h-10'>
      <button className='text-gray-600' onClick={toggleDarkTheme}>
        DARK!!
      </button>
      <input
        className='bg-gray-300'
        type='text'
        defaultValue={currentParam}
        onChange={updateParamForFun}
      />
    </header>
  )
}
