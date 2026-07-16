import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export function AvailabilityBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-300"
    >
      <Sparkles className="h-4 w-4" />
      Disponível para projetos
    </motion.div>
  )
}
