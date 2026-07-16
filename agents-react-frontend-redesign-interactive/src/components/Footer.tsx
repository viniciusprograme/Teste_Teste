type FooterProps = {
  now: string
  visits: number
}

export function Footer({ now, visits }: FooterProps) {
  return (
    <footer className="mt-8 border-t border-white/10 pt-6 text-sm text-slate-600 dark:text-slate-400">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p>© 2026 Vinicius</p>
          <p>Desenvolvido com Next.js + Tailwind CSS</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-emerald-600 dark:text-emerald-300">Status online</span>
          <span>Versão 1.0.0</span>
          <span>{visits} visitas</span>
          <span>{now}</span>
        </div>
      </div>
    </footer>
  )
}
