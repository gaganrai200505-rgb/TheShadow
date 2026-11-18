import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Instagram } from 'lucide-react'
import { LogoLockup } from './Brand'
import { ActionLink } from './UI'

const navigation = [
  { to: '/', label: 'Home' },
  { to: '/made-by-shadow/', label: 'Made by The Shadow' },
  { to: '/how-we-roll/', label: 'How we roll' },
]

export const socialLinks = [
  { to: 'https://www.instagram.com/theshadowcreativeagency?dlrf=MWtpYW56MzZ0djM1&utm_source=qr', label: 'Instagram', Icon: Instagram },
]

export function Header() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)

  const isHome = pathname === '/'
  const isDarkPage = pathname === '/how-we-roll/'
  const overHero = isHome && !scrolled && !menuOpen

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 40)

      if (menuOpen) {
        setHidden(false)
        return
      }

      // Hide navbar when scrolling down, reveal when scrolling up
      if (currentScrollY > 90 && currentScrollY > lastScrollY.current + 6) {
        setHidden(true)
      } else if (currentScrollY < lastScrollY.current - 6 || currentScrollY <= 90) {
        setHidden(false)
      }
      lastScrollY.current = currentScrollY
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [menuOpen])

  useEffect(() => {
    setMenuOpen(false)
    setScrolled(false)
    setHidden(false)
  }, [pathname])

  useEffect(() => {
    const previous = document.body.style.overflow
    if (menuOpen) document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [menuOpen])

  const active = (to: string) => to === '/' ? pathname === '/' : pathname.startsWith(to)

  return (
    <header className={`site-header ${overHero ? 'on-hero' : ''} ${isDarkPage && !overHero ? 'dark-theme' : ''} ${menuOpen ? 'menu-is-open' : ''} ${hidden ? 'is-hidden' : ''}`}>
      <div className="header-bar">
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link key={item.to} to={item.to} className={active(item.to) ? 'active' : ''}>{item.label}</Link>
          ))}
        </nav>
        <Link to="/" className="header-logo" aria-label="The Shadow home"><LogoLockup /></Link>
        <div className="header-right">
          <div className="header-socials">
            {socialLinks.map(({ to, label, Icon }) => <a href={to} target="_blank" rel="noreferrer" aria-label={label} key={label}><Icon /></a>)}
          </div>
          <ActionLink to="/connect/" label="Connect" icon className="header-connect" />
          <button
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span>Menu</span>
            <span className="hamburger"><i /><i /><i /></span>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Menu navigation">
              {[...navigation, { to: '/connect/', label: 'Connect' }].map((item, index) => (
                <motion.div key={item.to} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + index * 0.06 }}>
                  <Link to={item.to} className={active(item.to) ? 'active' : ''}>{item.label}</Link>
                </motion.div>
              ))}
            </nav>
            <div className="mobile-menu-contact">
              <div><strong>Office</strong><p>Mysore<br />Working worldwide</p></div>
              <div>
                <strong>Contact</strong>
                <p>
                  <a href="mailto:theshadowcreativeagency@gmail.com">theshadowcreativeagency@gmail.com</a><br />
                  <a href="tel:+916366583516">+91 6366583516</a>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
