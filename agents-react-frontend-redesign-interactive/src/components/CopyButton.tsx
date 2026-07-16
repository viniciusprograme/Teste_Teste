import { motion } from 'framer-motion'
import { Check, Copy } from 'lucide-react'

type CopyButtonProps = {
  label: string
  onCopy: () => void
  copied: boolean
}

export function CopyButton({ label, onCopy, copied }: CopyButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -1 }}
      onClick={onCopy}
      className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-white/20 dark:text-white"
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      <span>{copied ? 'Copiado' : label}</span>
    </motion.button>
  )
}
