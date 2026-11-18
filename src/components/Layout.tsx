import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { Header } from './Header'
import { Footer } from './Footer'

const pageTitles: Record<string, string> = {
  '/': 'The Shadow — Creative Agency',
  '/made-by-shadow/': 'Made by The Shadow — Creative Agency',
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
      <a className="floating-contact" href="https://wa.me/916366583516" target="_blank" rel="noreferrer" aria-label="Chat with The Shadow on WhatsApp">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M20.3 11.7a8.3 8.3 0 0 1-12.2 7.4L3 20.3l1.3-5a8.3 8.3 0 1 1 16-3.6Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          <path d="M8.3 7.8c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4 0 .6l-.5.6c-.2.2-.2.3-.1.5.4.8 1 1.4 1.8 1.9.2.1.3.1.5-.1l.7-.8c.2-.2.4-.2.6-.1l1.6.8c.3.1.4.3.4.5 0 .3-.2 1.2-.7 1.6-.5.5-1.2.7-2 .5-1-.2-2.2-.8-3.4-1.9-1-.9-1.8-2-2.1-3.1-.3-.9-.1-1.7.3-2.3.2-.2.4-.4.5-.4Z" fill="currentColor" />
        </svg>
      </a>
    </MotionConfig>
  )
}
