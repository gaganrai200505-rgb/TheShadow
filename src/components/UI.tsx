import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { categories, projects, type Project } from '../data/projects'
import { OrbitGraphic, Spark, SquareAnimation } from './Brand'
import { VideoMedia } from './Media'

export function Reveal({ children, className = '', delay = 0, y = 20 }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedTitle({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.h1
      className={`normal-title ${className}`}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.h1>
  )
}

export function SectionNumber({ value }: { value: string | number }) {
  const label = typeof value === 'number' ? String(value).padStart(2, '0') : value
  return <span className="section-number">[ {label} ]</span>
}

type ActionLinkProps = {
  to: string
  label: string
  variant?: 'yellow' | 'dark' | 'light' | 'outline' | 'green'
  icon?: boolean
  className?: string
  onClick?: () => void
}

export function ActionLink({ to, label, variant = 'yellow', icon = false, className = '', onClick }: ActionLinkProps) {
  const content = (
    <>
      <span className="button-label"><span>{label}</span><span aria-hidden="true">{label}</span></span>
      {icon && <Spark className="button-spark" />}
    </>
  )
  const classes = `button button-${variant} ${className}`
  if (/^(https?:|mailto:|tel:)/.test(to)) {
    const external = to.startsWith('http')
    return <a className={classes} href={to} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} onClick={onClick}>{content}</a>
  }
  return <Link className={classes} to={to} onClick={onClick}>{content}</Link>
}

export function ProjectShowcase({ dark = false, showButton = true }: { dark?: boolean; showButton?: boolean }) {
  return (
    <div className={`project-showcase ${dark ? 'is-dark' : ''}`}>
      <div className="showcase-heading">
        <div>
          <div className="text small medium">The works</div>
          <p className="small-title">Every frame tells our story too, of passion, agility, and the pursuit of brilliance. This is Made by The Shadow. A showcase of the work we proudly shaped together with our partners.</p>
        </div>
        <div className="showcase-heading-right">
          <SectionNumber value={dark ? '08' : '02'} />
          {showButton && <ActionLink to="/made-by-yellow/" label="Made by The Shadow" variant={dark ? 'light' : 'dark'} />}
        </div>
      </div>
      <div className="showcase-grid">
        {projects.slice(0, 3).map((project, index) => (
          <ShowcaseCard project={project} key={project.slug} index={index} />
        ))}
      </div>
    </div>
  )
}

function ShowcaseCard({ project, index }: { project: Project; index: number }) {
  const poster = project.poster.replace('-400x', '-600x')
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/project/${project.slug}/`} className="showcase-card" aria-label={`View ${project.title}`}>
        <div className="showcase-media">
          <VideoMedia src={project.video} poster={poster} label={project.title} />
          <div className="project-tags">
            {project.categories.slice(0, 2).map((slug) => <span key={slug}>{categories.find((category) => category.slug === slug)?.label ?? slug}</span>)}
          </div>
          <span className="project-look"><Spark /> Take a look <Spark /></span>
        </div>
        <div className="showcase-title small-title">{project.title}</div>
        <div className="project-divider" />
        <div className="project-meta">
          <span><small>Views</small>{project.views}</span>
          <span><small>Delivery time</small>{project.delivery}</span>
        </div>
      </Link>
    </motion.div>
  )
}

export function QuoteCTA({
  index,
  label,
  title,
  second,
  buttonLabel = 'Connect with us',
  buttonTo = '/connect/',
  squares = false,
}: {
  index: string
  label: string
  title: string
  second?: string
  buttonLabel?: string
  buttonTo?: string
  squares?: boolean
}) {
  return (
    <section className="quote-cta">
      <div className="content-wrapper quote-grid">
        <div className="quote-visual">
          <Reveal><SectionNumber value={index} /></Reveal>
          {squares ? <SquareAnimation /> : <OrbitGraphic framed />}
        </div>
        <div className="quote-copy">
          <div className="text medium quote-label">{label}</div>
          <AnimatedTitle>
            <span>{title}</span>
            {second && <span className="title-second">{second}</span>}
          </AnimatedTitle>
          <Reveal delay={0.2}><ActionLink to={buttonTo} label={buttonLabel} variant="light" /></Reveal>
        </div>
      </div>
    </section>
  )
}

export function TextItem({ number, title, children, className = '' }: { number: string; title: string; children: ReactNode; className?: string }) {
  return (
    <Reveal className={`process-text-item ${className}`}>
      <span className="item-square" />
      <div className="text medium item-number">[ {number} ]</div>
      <div className="text medium item-title">{title}</div>
      <div className="text item-body">{children}</div>
    </Reveal>
  )
}

export function ArrowLink({ to, label }: { to: string; label: string }) {
  return <Link to={to} className="arrow-link">{label}<ArrowRight size={16} /></Link>
}
