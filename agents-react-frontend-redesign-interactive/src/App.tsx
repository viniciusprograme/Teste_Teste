import { motion } from 'framer-motion'
import { useEffect, useMemo, useState, type DragEvent } from 'react'
import type { ServiceWorkerRegistration } from 'web-worker'
import { Avatar } from './components/Avatar'
import { AvailabilityBadge } from './components/AvailabilityBadge'
import { Background } from './components/Background'
import { CopyButton } from './components/CopyButton'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { LinkCard } from './components/LinkCard'
import { QRCodeCard } from './components/QRCodeCard'
import { defaultLinks, type LinkItem } from './data/links'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const [theme, setTheme] = useTheme()
  const [links, setLinks] = useState<LinkItem[]>(() => {
    if (typeof window === 'undefined') {
      return defaultLinks
    }

    try {
      const saved = window.localStorage.getItem('links_order')
      return saved ? (JSON.parse(saved) as LinkItem[]) : defaultLinks
    } catch {
      return defaultLinks
    }
  })
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [toast, setToast] = useState('')
  const [swReg, setSwReg] = useState<ServiceWorkerRegistration | null>(null)
  const [updateAvailable, setUpdateAvailable] = useState(false)
  const [visits] = useState(128)
  const [now, setNow] = useState('')

  useEffect(() => {
    window.localStorage.setItem('links_order', JSON.stringify(links))
  }, [links])

  useEffect(() => {
    const updateDate = () => {
      setNow(new Date().toLocaleString('pt-BR', { dateStyle: 'medium', timeStyle: 'short' }))
    }

    updateDate()
    const interval = window.setInterval(updateDate, 60000)
    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(''), 2200)
    return () => window.clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    const handler = (e: any) => {
      const registration = e?.detail as ServiceWorkerRegistration | undefined
      if (registration) {
        setSwReg(registration)
        setUpdateAvailable(true)
      }
    }

    window.addEventListener('swUpdated', handler as EventListener)
    return () => window.removeEventListener('swUpdated', handler as EventListener)
  }, [])

  const applyUpdate = () => {
    if (!swReg || !swReg.waiting) return
    try {
      swReg.waiting.postMessage({ type: 'SKIP_WAITING' })
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload()
      })
    } catch {
      // ignore
    }
  }

  const onDragStart = (event: DragEvent<HTMLDivElement>, index: number) => {
    event.dataTransfer.setData('text/plain', String(index))
  }

  const onDrop = (event: DragEvent<HTMLDivElement>, index: number) => {
    const from = Number(event.dataTransfer.getData('text/plain'))
    if (Number.isNaN(from)) return

    const updated = [...links]
    const [item] = updated.splice(from, 1)
    updated.splice(index, 0, item)
    setLinks(updated)
  }

  const onDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const onCopy = async (href: string, id: string) => {
    try {
      await navigator.clipboard.writeText(href)
      setCopiedId(id)
      setToast('Link copiado com sucesso')
      window.setTimeout(() => setCopiedId(null), 1600)
    } catch {
      setToast('Não foi possível copiar')
    }
  }

  const onReset = () => {
    setLinks(defaultLinks)
    window.localStorage.removeItem('links_order')
    setToast('Ordem restaurada')
  }

  const onShare = async () => {
    const shareData = {
      title: 'Vinicius — Linktree Premium',
      text: 'Confira o perfil profissional de Vinicius.',
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch {
        setToast('Compartilhamento cancelado')
      }
    } else {
      await navigator.clipboard.writeText(window.location.href)
      setToast('Link do perfil copiado')
    }
  }

  const contactHref = useMemo(() => 'mailto:vinicius@email.com?subject=Olá%20Vinicius', [])

  return (
    <div className="min-h-screen bg-transparent text-slate-900 transition-colors duration-300 dark:text-white">
      <Background />
      <main className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <Header theme={theme} onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} onReset={onReset} onShare={onShare} />

        <section className="mt-8 grid flex-1 gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="rounded-[32px] border border-white/15 bg-white/10 p-6 shadow-[0_30px_80px_rgba(2,8,23,0.22)] backdrop-blur-2xl sm:p-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <AvailabilityBadge />
              <div className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm text-slate-600 dark:text-slate-300">
                {now}
              </div>
            </div>

            <div className="mt-6 flex flex-col items-center text-center sm:items-start sm:text-left">
              <Avatar />
              <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">Vinicius</h1>
              <p className="mt-2 text-lg font-medium text-sky-600 dark:text-sky-300">Analista de TI</p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
                Infraestrutura • Desenvolvimento • Cloud • Redes • Segurança da Informação
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <CopyButton label="Entrar em contato" onCopy={() => window.open(contactHref, '_blank')} copied={false} />
              <CopyButton label="Copiar e-mail" onCopy={() => onCopy('vinicius@email.com', 'email-copy')} copied={copiedId === 'email-copy'} />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {links.map((item, index) => (
                <LinkCard
                  key={item.id}
                  item={item}
                  index={index}
                  onCopy={(href) => onCopy(href, item.id)}
                  onDragStart={onDragStart}
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                />
              ))}
            </div>
          </motion.div>

          <div className="flex flex-col gap-6">
            <QRCodeCard />
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-[28px] border border-white/15 bg-white/10 p-6 shadow-[0_20px_50px_rgba(2,8,23,0.16)] backdrop-blur-xl"
            >
              <h2 className="text-lg font-semibold">Resumo profissional</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <p>Suporte e infraestrutura com foco em automação, performance e segurança.</p>
                <p>Experiência em ambientes corporativos e projetos de transformação digital.</p>
                <p>Especialista em soluções escaláveis, documentação e modernização de processos.</p>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer now={now} visits={visits} />
      </main>

        {updateAvailable ? (
          <div className="fixed top-4 right-4 z-30 flex items-center gap-3 rounded-full bg-sky-600 px-4 py-2 text-white">
            <div className="text-sm">Nova versão disponível</div>
            <button className="ml-2 rounded bg-white/10 px-3 py-1 text-sm" onClick={applyUpdate}>
              Atualizar
            </button>
          </div>
        ) : null}

      {toast ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/15 bg-slate-900/80 px-4 py-2 text-sm text-white shadow-lg backdrop-blur"
        >
          {toast}
        </motion.div>
      ) : null}
    </div>
  )
}
