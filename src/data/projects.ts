import projectData from './projects.json'

export type Project = {
  slug: string
  title: string
  categories: string[]
  orientation: 'portrait' | 'landscape'
  index: number
  speed: number
  video: string
  poster: string
  year: string
  industry: string
  categoryLabel: string
  views: string
  delivery: string
}

export const projects = projectData as Project[]

export const categories = [
  { slug: 'commercials', label: 'Commercials' },
  { slug: 'artists', label: 'Artists' },
  { slug: 'corporate', label: 'Corporate' },
  { slug: 'events', label: 'Events' },
  { slug: 'employer-branding', label: 'Employer Branding' },
  { slug: 'aftermovies', label: 'Aftermovies' },
  { slug: 'launches', label: 'Launches' },
  { slug: 'social-campaigns', label: 'Social Campaigns' },
]

export const clientLogos = [
  '/logos/city-bar.png',
  '/logos/logo-1.png',
  '/logos/logo-3.png',
  '/logos/logo-4.png',
  '/logos/logo-5.png',
  '/logos/logo-6.png',
  '/logos/logo-7.png',
  '/logos/logo-8.png',
  '/logos/logo-9.png'
]

export const getProject = (slug?: string) => projects.find((project) => project.slug === slug)
