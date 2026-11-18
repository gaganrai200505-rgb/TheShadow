import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { VideoMedia } from '../components/Media'
import { ActionLink, AnimatedTitle, QuoteCTA, Reveal, SectionNumber } from '../components/UI'
import { categories, getProject, projects } from '../data/projects'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProject(slug)
  useEffect(() => { if (project) document.title = `${project.title} — The Shadow` }, [project])
  if (!project) return <Navigate to="/made-by-yellow/" replace />
  const index = projects.findIndex((item) => item.slug === project.slug)
  const next = projects[(index + 1) % projects.length]
  return (
    <main className="project-detail-page primary-page">
      <section className="project-detail-hero content-wrapper">
        <div className="project-detail-topline">
          <SectionNumber value={String(index + 1).padStart(2, '0')} />
          <div className="project-tags static-tags">{project.categories.map((slug) => <span key={slug}>{categories.find((category) => category.slug === slug)?.label}</span>)}</div>
          <span>{project.year}</span>
        </div>
        <AnimatedTitle>{project.title}</AnimatedTitle>
        <div className="project-detail-meta">
          <div><small>Industry</small><strong>{project.industry}</strong></div>
          <div><small>Discipline</small><strong>{project.categoryLabel}</strong></div>
          <div><small>Published views</small><strong>{project.views}</strong></div>
          <div><small>Delivery time</small><strong>{project.delivery}</strong></div>
        </div>
      </section>
      <Reveal className="project-detail-film content-wrapper">
        <VideoMedia src={project.video} poster={project.poster.replace('-400x', '-1200x')} controls eager label={project.title} />
      </Reveal>
      <section className="project-description content-wrapper">
        <div className="text medium">The work</div>
        <Reveal className="small-title">A {project.categoryLabel.toLowerCase()} production for the {project.industry.toLowerCase()} sector. Every frame is shaped with intention, from the first creative blueprint through production and the final polish. The published project figures above are retained from the original project record.</Reveal>
        <ActionLink to="/connect/" label="Start a project" variant="dark" />
      </section>
      <QuoteCTA index={String(((index + 1) % projects.length) + 1).padStart(2, '0')} label="Next project" title={next.title} second={`${next.industry} · ${next.categoryLabel}`} buttonLabel="View project" buttonTo={`/project/${next.slug}/`} squares />
    </main>
  )
}
