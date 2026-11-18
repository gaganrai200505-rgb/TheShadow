import { LogoMark } from '../components/Brand'
import { ActionLink, AnimatedTitle } from '../components/UI'

export default function NotFound() {
  return (
    <main className="not-found primary-page">
      <div className="content-wrapper simple-page">
        <LogoMark />
        <AnimatedTitle>Nothing here.<br />Only shadow.</AnimatedTitle>
        <p className="small-title">The page you’re looking for has moved out of frame.</p>
        <ActionLink to="/" label="Back home" variant="dark" />
      </div>
    </main>
  )
}
