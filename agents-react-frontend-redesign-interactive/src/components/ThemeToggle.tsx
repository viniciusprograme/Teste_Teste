import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import type { AppTheme } from '../hooks/useTheme'

type ThemeToggleProps = {
  theme: AppTheme
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -2, scale: 1.01 }}
      onClick={onToggle}
      className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-white/20 dark:text-white"
      aria-label="Alternar tema"
    >
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span>{theme === 'dark' ? 'Claro' : 'Escuro'}</span>
    </motion.button>
  )
}
