import { useEffect, useState } from 'react'

export type AppTheme = 'dark' | 'light'

export function useTheme() {
  const [theme, setTheme] = useState<AppTheme>(() => {
    if (typeof window === 'undefined') {
      return 'dark'
    }

    const savedTheme = window.localStorage.getItem('theme')
    return savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem('theme', theme)
  }, [theme])

  return [theme, setTheme] as const
}
