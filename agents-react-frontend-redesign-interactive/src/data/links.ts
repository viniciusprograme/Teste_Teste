import type { LucideIcon } from 'lucide-react'
import { BriefcaseBusiness, Camera, Code2, FileText, Globe2, Mail, MessageCircle, Smartphone } from 'lucide-react'

export type LinkItem = {
  id: string
  label: string
  description: string
  href: string
  icon: LucideIcon
  accent: string
}

export const defaultLinks: LinkItem[] = [
  {
    id: 'github',
    label: 'GitHub',
    description: 'Projetos e repositórios',
    href: 'https://github.com/viniciusprograme',
    icon: Code2,
    accent: 'from-slate-900 to-slate-700',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    description: 'Conexões profissionais',
    href: 'https://www.linkedin.com/in/elias-vinicius-7ab40031b',
    icon: BriefcaseBusiness,
    accent: 'from-sky-600 to-cyan-500',
  },
  {
    id: 'portfolio',
    label: 'Portfólio',
    description: 'Projetos e soluções',
    href: 'https://vinicius.dev',
    icon: Globe2,
    accent: 'from-violet-600 to-fuchsia-500',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    description: 'Converse comigo',
    href: 'https://wa.me/qr/BXEYSNXTAYVLE1',
    icon: MessageCircle,
    accent: 'from-emerald-500 to-lime-500',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    description: 'Conteúdo e networking',
    href: 'https://www.instagram.com/vinicius_0_002',
    icon: Camera,
    accent: 'from-purple-600 via-pink-500 to-orange-400',
  },
  {
    id: 'email',
    label: 'E-mail',
    description: 'Envie uma proposta',
    href: 'mailto:vinicius@email.com',
    icon: Mail,
    accent: 'from-blue-500 to-indigo-500',
  },
  {
    id: 'curriculo',
    label: 'Currículo',
    description: 'Download em PDF',
    href: '/vinicius-cv.pdf',
    icon: FileText,
    accent: 'from-amber-500 to-orange-500',
  },
  {
    id: 'mobile',
    label: 'Telefone',
    description: 'Disponibilidade rápida',
    href: 'tel:+5511999999999',
    icon: Smartphone,
    accent: 'from-cyan-500 to-blue-500',
  },
]
