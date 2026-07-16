import { motion } from 'framer-motion'

export function Avatar() {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-sky-400/60 via-violet-500/50 to-slate-950/70 shadow-[0_0_60px_rgba(56,189,248,0.2)] backdrop-blur-xl"
    >
      <div className="absolute inset-1 rounded-full border border-white/10" />
      <span className="text-4xl font-semibold tracking-[0.2em] text-white">V</span>
    </motion.div>
  )
}
