import { ActionLink, AnimatedTitle } from '../components/UI'

export default function Cookies() {
  return (
    <main className="cookies-page">
      <section className="simple-page content-wrapper">
        <div className="text medium">The Shadow — website information</div>
        <AnimatedTitle>Cookies, kept<br />simple.</AnimatedTitle>
        <div className="simple-copy text">
          <p>This website uses only the browser storage needed to remember interface preferences and to keep the contact experience working as expected. We do not use advertising cookies or sell personal information.</p>
          <p>Embedded project films and images are delivered from their original media hosts. Those hosts may process technical request information such as your IP address when media loads.</p>
          <p>Your browser settings let you clear stored site data or block third-party media at any time.</p>
          <p>Questions about privacy can be sent to <a href="mailto:theshadowcreativeagency@gmail.com">theshadowcreativeagency@gmail.com</a>.</p>
        </div>
        <ActionLink to="/" label="Back home" variant="dark" />
      </section>
    </main>
  )
}
