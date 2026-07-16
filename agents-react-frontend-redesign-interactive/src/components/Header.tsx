import { motion } from 'framer-motion'
import { Download, Share2, RotateCcw } from 'lucide-react'
import type { AppTheme } from '../hooks/useTheme'
import { ThemeToggle } from './ThemeToggle'

type HeaderProps = {
  theme: AppTheme
  onToggleTheme: () => void
  onReset: () => void
  onShare: () => void
}

export function Header({ theme, onToggleTheme, onReset, onShare }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-wrap items-center justify-between gap-3"
    >
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">Linktree Premium</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        <button
          onClick={onReset}
          className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-white/20 dark:text-white"
        >
          <RotateCcw className="h-4 w-4" />
          Restaurar ordem
        </button>
        <button
          onClick={onShare}
          className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-white/20 dark:text-white"
        >
          <Share2 className="h-4 w-4" />
          Compartilhar
        </button>
        <a
          href="/vinicius-cv.pdf"
          download
          className="flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/15 px-3 py-2 text-sm font-medium text-sky-700 transition hover:bg-sky-500/25 dark:text-sky-300"
        >
          <Download className="h-4 w-4" />
          Baixar currículo
        </a>
      </div>
    </motion.header>
  )
}
