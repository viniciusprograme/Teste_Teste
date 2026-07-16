import { QRCodeSVG } from 'qrcode.react'
import { motion } from 'framer-motion'

export function QRCodeCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-[24px] border border-white/15 bg-white/10 p-4 text-center shadow-[0_12px_40px_rgba(2,8,23,0.2)] backdrop-blur-xl"
    >
      <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Compartilhar perfil</p>
      <div className="mt-3 flex justify-center rounded-2xl bg-white p-3">
        <QRCodeSVG value="https://vinicius.dev" size={120} level="H" includeMargin />
      </div>
    </motion.div>
  )
}
