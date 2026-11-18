import { useId } from 'react'

export function LogoMark({ className = '', label = 'The Shadow' }: { className?: string; label?: string }) {
  const maskId = `shadow-mark-${useId().replace(/:/g, '')}`
  return (
    <svg className={className} viewBox="0 0 150 150" role="img" aria-label={label}>
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="150" height="150">
          <path d="M45 0H150V150H0V45Z" fill="white" />
          <g fill="black">
            <rect x="57" y="27" width="72" height="18" rx="6" />
            <rect x="57" y="27" width="24" height="45" rx="6" />
            <rect x="57" y="63" width="72" height="18" rx="6" />
            <rect x="105" y="63" width="24" height="60" rx="6" />
            <rect x="57" y="105" width="72" height="18" rx="6" />
          </g>
        </mask>
      </defs>
      <path d="M45 0H150V150H0V45Z" fill="currentColor" mask={`url(#${maskId})`} />
    </svg>
  )
}

export function LogoLockup({ className = '' }: { className?: string }) {
  return (
    <span className={`brand-lockup ${className}`} aria-label="The Shadow — Creative Agency">
      <LogoMark className="brand-mark" label="" />
      <span className="brand-type">
        <span className="brand-wordmark">The<br />Shadow</span>
        <span className="brand-tagline">CREATIVE AGENCY</span>
      </span>
    </span>
  )
}

export function Spark({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path
        d="M21.28 10.67h-6.33a3.63 3.63 0 0 1-3.63-3.63V.71a.16.16 0 0 0-.15-.16h-.9a.16.16 0 0 0-.16.16v6.33a3.63 3.63 0 0 1-3.63 3.63H.15a.16.16 0 0 0-.16.16v.9c0 .09.07.16.16.16h6.33a3.63 3.63 0 0 1 3.63 3.63v6.33c0 .08.07.15.16.15h.9a.16.16 0 0 0 .16-.15v-6.33a3.63 3.63 0 0 1 3.63-3.63h6.33a.16.16 0 0 0 .16-.16v-.9a.16.16 0 0 0-.17-.16Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function OrbitGraphic({ className = '', framed = false }: { className?: string; framed?: boolean }) {
  return (
    <div className={`orbit-graphic ${framed ? 'is-framed' : ''} ${className}`} aria-hidden="true">
      <span className="orbit-line orbit-line-a" />
      <span className="orbit-line orbit-line-b" />
      <span className="orbit-line orbit-line-c" />
      <Spark className="orbit-spark" />
    </div>
  )
}

export function SquareAnimation({ className = '' }: { className?: string }) {
  return (
    <div className={`square-animation ${className}`} aria-hidden="true">
      <span /><span /><span /><span />
      <Spark />
    </div>
  )
}
