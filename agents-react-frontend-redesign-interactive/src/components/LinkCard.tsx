import { motion } from 'framer-motion'
import { ArrowUpRight, Copy, GripVertical } from 'lucide-react'
import type { DragEvent } from 'react'
import type { LinkItem } from '../data/links'

type LinkCardProps = {
  item: LinkItem
  index: number
  onCopy: (href: string) => void
  onDragStart: (event: DragEvent<HTMLElement>, index: number) => void
  onDrop: (event: DragEvent<HTMLElement>, index: number) => void
  onDragOver: (event: DragEvent<HTMLElement>) => void
}

export function LinkCard({
  item,
  index,
  onCopy,
  onDragStart,
  onDrop,
  onDragOver,
}: LinkCardProps) {
  const Icon = item.icon

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      whileHover={{ y: -3, scale: 1.01, rotateX: 1 }}
      draggable
      onDragStartCapture={(event) => onDragStart(event, index)}
      onDrop={(event) => onDrop(event, index)}
      onDragOver={onDragOver}
      className="group relative overflow-hidden rounded-[22px] border border-white/15 bg-white/10 p-4 shadow-[0_12px_40px_rgba(2,8,23,0.24)] backdrop-blur-xl"
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${item.accent} opacity-0 transition duration-300 group-hover:opacity-20`} />
      <div className="relative flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className={`rounded-2xl bg-gradient-to-r ${item.accent} p-3 text-white shadow-lg`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              <a href={item.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {item.label}
              </a>
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onCopy(item.href)}
            className="rounded-full border border-white/15 bg-white/10 p-2 text-slate-700 transition hover:bg-white/20 dark:text-white"
            aria-label={`Copiar ${item.label}`}
          >
            <Copy className="h-4 w-4" />
          </button>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/15 bg-white/10 p-2 text-slate-700 transition hover:bg-white/20 dark:text-white"
            aria-label={`Abrir ${item.label}`}
          >
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
      <div className="relative mt-4 flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Arraste para ordenar</span>
        <GripVertical className="h-4 w-4 text-slate-500 dark:text-slate-400" />
      </div>
    </motion.article>
  )
}
