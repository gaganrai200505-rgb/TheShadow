import { Link } from 'react-router-dom'
import { LogoMark, Spark } from './Brand'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="content-wrapper footer-inner">
        <Link to="/" className="footer-mark" aria-label="The Shadow home"><LogoMark /></Link>
        <div className="footer-cols">
          <div className="footer-col">
            <strong>Office</strong>
            <p>Eindhoven · Dubai · Miami<br />Working worldwide</p>
          </div>
          <div className="footer-col">
            <strong>Contact</strong>
            <p>
              <a href="mailto:theshadowcreativeagency@gmail.com">theshadowcreativeagency@gmail.com</a><br />
              <a href="tel:+916366583516">+91 6366583516</a>
            </p>
          </div>
          <div className="footer-col footer-sitemap">
            <strong>Sitemap</strong>
            <p><Link to="/made-by-yellow/">Made by The Shadow</Link><br /><Link to="/how-we-roll/">How we roll</Link><br /><Link to="/connect/">Connect</Link></p>
          </div>
          <div className="footer-col footer-movement">
            <strong><Spark /> Join the movement</strong>
            <p>Let’s shape the future<br />— frame by frame.</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 The Shadow</span>
          <Link to="/cookies/">Cookies</Link>
        </div>
      </div>
    </footer>
  )
}
