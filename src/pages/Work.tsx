import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Grid2X2, List, Plus, X } from 'lucide-react'
import { LogoMark, Spark } from '../components/Brand'
import { VideoMedia } from '../components/Media'
import { QuoteCTA } from '../components/UI'
import { categories, projects } from '../data/projects'

export default function Work() {
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [filterOpen, setFilterOpen] = useState(false)
  const [selected, setSelected] = useState<string[]>([])
  const visible = useMemo(() => projects.filter((project) => selected.length === 0 || selected.some((category) => project.categories.includes(category))), [selected])
  const toggle = (slug: string) => setSelected((current) => current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug])

  return (
    <main className="work-page">
      <h1 className="sr-only">Made by The Shadow</h1>
      <section className={`projects-overview ${filterOpen ? 'filters-visible' : ''}`}>
        <div className="work-background"><div className="work-background-sticky"><LogoMark /></div></div>
        <AnimatePresence mode="wait" initial={false}>
          {view === 'grid' ? (
            <motion.div className="collage-grid content-wrapper" key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
              {visible.map((project, index) => (
                <motion.div
                  className={`collage-item index-${(index % 6) + 1} ${project.orientation}`}
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, delay: Math.min(index, 5) * 0.05 }}
                >
                  <Link to={`/project/${project.slug}/`} className="collage-card" aria-label={`View ${project.title}`}>
                    <VideoMedia src={project.video} poster={project.poster} label={project.title} />
                    <span className="collage-overlay" />
                    <span className="collage-caption"><i /><span className="small-title">{project.title}</span></span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div className="project-list" key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
              {visible.map((project) => (
                <Link to={`/project/${project.slug}/`} className="project-list-row" key={project.slug}>
                  <span className="list-year">{project.year}<i /></span>
                  <span className="small-title list-title">{project.title}</span>
                  <span className="list-industry">{project.industry}</span>
                  <span className="list-category">{project.categoryLabel}</span>
                  <span className="list-hover-detail">Views {project.views} · {project.delivery}</span>
                  <span className={`list-preview ${project.orientation}`}><img src={project.poster} alt="" /><Spark /><img src={project.poster.replace('-400x', '-600x')} alt="" /></span>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        {visible.length === 0 && <div className="empty-projects">No projects match these filters. <button onClick={() => setSelected([])}>Reset filters</button></div>}
      </section>

      <div className="work-controls" aria-label="Portfolio controls">
        <button className="filter-trigger" onClick={() => setFilterOpen(true)} aria-expanded={filterOpen}><Plus /><span>+ FILTER WORKS</span>{selected.length > 0 && <b>{selected.length}</b>}</button>
        <span className="control-divider" />
        <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')} aria-pressed={view === 'grid'}><Grid2X2 /><span>GRID</span></button>
        <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')} aria-pressed={view === 'list'}><List /><span>LIST</span></button>
      </div>

      <AnimatePresence>
        {filterOpen && (
          <motion.div className="filter-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="filter-options">
              <div className="filter-option-grid">
                {categories.map((category, index) => (
                  <motion.button
                    key={category.slug}
                    className={selected.includes(category.slug) ? 'active' : ''}
                    onClick={() => toggle(category.slug)}
                    aria-pressed={selected.includes(category.slug)}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    {category.label}{selected.includes(category.slug) && <X />}
                  </motion.button>
                ))}
              </div>
              <div className="filter-bottom-actions">
                {selected.length > 0 && <button className="reset-filters" onClick={() => setSelected([])}>Reset filters</button>}
                <button className="close-filters" onClick={() => setFilterOpen(false)} aria-label="Apply filters and close"><X /></button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <QuoteCTA
        index="01"
        label="Who we are"
        title="A mix of top-of-their-game creators, thinkers and makers. Built on craft, driven by culture, and focused on work that actually lands."
        second="This is The Shadow."
        buttonLabel="How we roll"
        buttonTo="/how-we-roll/"
        squares
      />
    </main>
  )
}
