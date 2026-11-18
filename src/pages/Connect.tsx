import { useEffect, useState, type FormEvent } from 'react'
import { Instagram, LoaderCircle } from 'lucide-react'
import { Spark } from '../components/Brand'
import { ActionLink, AnimatedTitle, ProjectShowcase, Reveal, SectionNumber } from '../components/UI'
import { projects } from '../data/projects'

type Fields = { name: string; email: string; message: string }
type Errors = Partial<Record<keyof Fields, string>>

export default function Connect() {
  const [fields, setFields] = useState<Fields>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const [times, setTimes] = useState<Record<string, string>>({})

  useEffect(() => {
    const update = () => {
      const next: Record<string, string> = {}
      for (const zone of ['Europe/Amsterdam', 'Asia/Dubai', 'America/New_York']) {
        next[zone] = new Intl.DateTimeFormat('en-GB', { timeZone: zone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(new Date())
      }
      setTimes(next)
    }
    update(); const timer = window.setInterval(update, 1000)
    return () => window.clearInterval(timer)
  }, [])

  const validate = (values: Fields) => {
    const next: Errors = {}
    if (values.name.trim().length < 2) next.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Please enter a valid email address.'
    if (values.message.trim().length < 10) next.message = 'Tell us a little more (at least 10 characters).'
    return next
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate(fields)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setStatus('idle')
      return
    }
    setStatus('loading'); setStatusMessage('')
    try {
      const response = await fetch('https://formsubmit.co/ajax/theshadowcreativeagency@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: fields.name,
          email: fields.email,
          message: fields.message,
          _subject: `New project enquiry from ${fields.name}`,
          _template: 'table',
          _captcha: 'false',
        }),
      })
      const result = await response.json().catch(() => null) as { success?: boolean | string; message?: string } | null
      if (!response.ok || !result || !(result.success === true || result.success === 'true')) {
        throw new Error(result?.message || 'The message service did not accept the enquiry.')
      }
      setStatus('success')
      setStatusMessage('Thanks for your message. It has been sent to The Shadow, and we’ll be in touch shortly.')
      setFields({ name: '', email: '', message: '' })
    } catch (error) {
      setStatus('error')
      setStatusMessage(error instanceof Error ? `${error.message} You can also email us directly below.` : 'We couldn’t send your message. Please email us directly below.')
    }
  }

  const update = (key: keyof Fields, value: string) => {
    setFields((current) => ({ ...current, [key]: value }))
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }))
    if (status !== 'idle' && status !== 'loading') setStatus('idle')
  }

  return (
    <main className="connect-page">
      <section className="contact-block content-wrapper">
        <div className="contact-intro">
          <div className="text medium">Let’s connect</div>
          <AnimatedTitle>
            <span>Your move. Whether you’ve got a wild idea, a tight deadline or just want to explore what’s possible we’re all ears.</span>
            <span className="title-second">Drop us a line. Or better yet: let’s meet.</span>
          </AnimatedTitle>
        </div>
        <div className="contact-grid">
          <SectionNumber value="01" />
          <div className="contact-details">
            {/* <div className="time-zones">
              <div><span>Eindhoven (CET)</span><time>{times['Europe/Amsterdam']}</time></div>
              <div><span>Dubai (GMT+4)</span><time>{times['Asia/Dubai']}</time></div>
              <div><span>Miami (GMT-5)</span><time>{times['America/New_York']}</time></div>
            </div> */}
            <p className="text medium">How to connect</p>
            <p className="text contact-email"><a href="mailto:theshadowcreativeagency@gmail.com">theshadowcreativeagency@gmail.com</a></p>
            <p className="text contact-phone"><a href="tel:+916366583516">+91 6366583516</a></p>
            <div className="contact-socials">
              <a href="https://www.instagram.com/theshadowcreativeagency?dlrf=MWtpYW56MzZ0djM1&utm_source=qr" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram /></a>
            </div>
            <ActionLink to="mailto:theshadowcreativeagency@gmail.com" label="Send us a message" variant="green" />
          </div>
          <div className="contact-form-wrap">
            <p className="text medium form-title">Fill in our form:</p>
            <form onSubmit={submit} noValidate>
              <label className={errors.name ? 'has-error' : ''}>
                <span>Name</span>
                <input name="name" type="text" autoComplete="name" value={fields.name} onChange={(event) => update('name', event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />
                {errors.name && <small id="name-error">{errors.name}</small>}
              </label>
              <label className={errors.email ? 'has-error' : ''}>
                <span>Email address</span>
                <input name="email" type="email" autoComplete="email" value={fields.email} onChange={(event) => update('email', event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
                {errors.email && <small id="email-error">{errors.email}</small>}
              </label>
              <label className={errors.message ? 'has-error' : ''}>
                <span>Your message</span>
                <textarea name="message" rows={4} value={fields.message} onChange={(event) => update('message', event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} />
                {errors.message && <small id="message-error">{errors.message}</small>}
              </label>
              <input className="form-honeypot" type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <button className="button button-dark submit-button" type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? <><LoaderCircle className="spin" /> Sending message</> : 'Submit message'}
              </button>
              <div className={`form-status ${status}`} role="status" aria-live="polite">
                {statusMessage}
                {status === 'error' && <> <a href="mailto:theshadowcreativeagency@gmail.com">theshadowcreativeagency@gmail.com</a></>}
              </div>
            </form>
          </div>
        </div>
        <Reveal className="social-media-strip">
          {projects.slice(4, 10).map((project) => (
            <a href="https://www.instagram.com/theshadowcreativeagency" target="_blank" rel="noreferrer" key={project.slug} aria-label={`Instagram — ${project.title}`}>
              <img src={project.poster} alt={project.title} loading="lazy" />
              <Instagram />
            </a>
          ))}
        </Reveal>
        <div className="contact-extra-icon"><Spark /></div>
      </section>
      <section className="connect-work content-wrapper"><ProjectShowcase /></section>
    </main>
  )
}
