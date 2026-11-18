import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { MotionConfig } from 'framer-motion'
import { Header } from './Header'
import { Footer } from './Footer'

const pageTitles: Record<string, string> = {
  '/': 'The Shadow — Creative Agency',
  '/made-by-yellow/': 'Made by The Shadow — Creative Agency',
  '/how-we-roll/': 'How we roll — The Shadow',
  '/connect/': 'Connect — The Shadow',
  '/cookies/': 'Cookies — The Shadow',
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = pageTitles[pathname] ?? (pathname.startsWith('/project/') ? 'Project — The Shadow' : 'The Shadow — Creative Agency')
  }, [pathname])

  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <div className="page-blocks" id="main-content">{children}</div>
      <Footer />
      <a className="floating-contact" href="mailto:theshadowcreativeagency@gmail.com" aria-label="Email The Shadow">
        <MessageCircle />
      </a>
    </MotionConfig>
  )
}
