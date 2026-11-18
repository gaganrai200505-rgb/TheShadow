import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LogoMark, Spark } from '../components/Brand'
import { VideoMedia } from '../components/Media'
import { ActionLink, AnimatedTitle, ProjectShowcase, QuoteCTA, Reveal, SectionNumber } from '../components/UI'
import { clientLogos } from '../data/projects'

const heroVideo = 'https://player.vimeo.com/progressive_redirect/playback/1202811863/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&signature=786fcae5a0412da3b71c4d9157a01458bfc90d94fe4c3fd6560b5341b91f3e19'
const heroPoster = 'https://houseofyellow.nl/wp-content/uploads/2025/10/video-placeholder-showreel.jpg'
const phoneVideo = '/videos/corporate-commercials.mp4'
const phonePoster = '/posters/maara-restro-bar.jpg'

export default function Home() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <motion.div className="hero-background" initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9 }}>
          <VideoMedia src={heroVideo} poster={heroPoster} eager label="The Shadow showreel background" />
        </motion.div>
        <motion.div className="hero-mark" initial={{ opacity: 0, rotate: -18, scale: 0.72 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}>
          <LogoMark />
        </motion.div>
        <Reveal className="hero-left" delay={0.45}>
          <h1 className="text small medium">WELCOME TO THE SHADOW.</h1>
          <p className="small-title">We’re a creative content agency that moves at the speed of your ambition. From idea to production and beyond. Where speed meets craftsmanship.</p>
        </Reveal>
        <Reveal className="hero-right text" delay={0.8}>
          We craft formats that stick and stories that move. From an 8-second viral to a full brand documentary, we translate your message into content that creates real momentum. From a same-day edit to a feature-length film, we deliver stories at every scale.
        </Reveal>
        <div className="hero-orbit"><span /><span /><span /><Spark /></div>
      </section>

      <section className="about-work">
        <div className="content-wrapper about-intro">
          <div className="about-grid">
            <div className="text small medium">Who are we?</div>
            <div className="about-statement">
              <AnimatedTitle className="smaller">We are SHADOW - a creative production agency driven by ideas, storytelling and visual craft. From cinematic films and photography to brand campaigns and creative productions, we turn ideas into powerful visual experiences. Every frame, every detail and every story is crafted with intention, from the first spark of an idea to the final delivery.</AnimatedTitle>
              <Reveal className="small-title" delay={0.15}>Looking for a creative partner that thinks differently and creates boldly? Let’s make it happen.</Reveal>
              <Reveal className="button-row" delay={0.25}>
                <ActionLink to="/connect/" label="Connect" variant="dark" />
                <ActionLink to="/how-we-roll/" label="How we roll" variant="outline" />
              </Reveal>
            </div>
            <SectionNumber value="01" />
          </div>
          <div className="about-decoration"><span /><span /><span /><Spark /></div>
        </div>
        <div className="content-wrapper home-work">
          <ProjectShowcase showButton />
        </div>
        <div className="logo-marquee" aria-label="Selected clients">
          <div className="marquee-track">
            {[...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos].map((src, index) => (
              <img src={src} alt="Client logo" loading="lazy" key={`${src}-${index}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="services-block">
        <div className="content-wrapper beyond-intro editorial-three-col">
          <SectionNumber value="03" />
          <div>
            <div className="text medium">Beyond the Screen</div>
            <Reveal className="small-title">At The Shadow, we believe every story deserves its perfect stage. From the intimate tap-and-scroll of a smartphone to the immersive grandeur of the silver screen, our passion lies in bringing your vision to life, no matter the medium.</Reveal>
          </div>
          <div className="mobile-content-copy">
            <span className="item-square" />
            <div className="text medium">Mobile content</div>
            <div className="text">In a scroll-stop world, you need content that pops. We craft dynamic, thumb-stopping videos designed purely for mobile. Get ready to scroll, tap, and share.</div>
          </div>
        </div>
        <MobileShowcase />
        <div className="content-wrapper how-intro editorial-three-col">
          <div className="text medium">How we roll</div>
          <div>
            <Reveal className="small-title">At The Shadow, we listen first and create with you, not just for you. Everything happens in-house, fast and focused, like having your own team, with outsider firepower.</Reveal>
            <div className="text medium">We combine strategic thinking, creative craftsmanship and rapid execution to keep ideas moving and momentum growing.</div>
          </div>
          <div className="how-intro-action"><SectionNumber value="04" /><ActionLink to="/how-we-roll/" label="How we roll" variant="light" /></div>
        </div>
        <ServicesStack />
      </section>

      <QuoteCTA
        index="07"
        label="LET'S CONNECT."
        title="If you're looking for a creative partner that combines craftsmanship, speed and impact, let's make something remarkable."
        second="Built for brands that want to lead."
        buttonLabel="CONNECT WITH US."
      />
    </main>
  )
}

function MobileShowcase() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Amsterdam', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date()))
    update()
    const timer = window.setInterval(update, 30000)
    return () => window.clearInterval(timer)
  }, [])
  return (
    <div className="metrics-stage">
      <div className="metrics-sticky content-wrapper">
        <span className="metric-square" />
        <div className="phone-wrap">
          <div className="phone-frame">
            <VideoMedia src={phoneVideo} poster={phonePoster} label="Mobile campaign content" />
            <div className="phone-status"><span>{time}</span><i /><span>● ● ●</span></div>
            <div className="floating-reactions"><span>♥</span><span>+</span><span>♥</span></div>
          </div>
        </div>
        <Spark className="metric-spark" />
      </div>
    </div>
  )
}

type ServiceMedia = { src: string; poster: string; image?: boolean }
const photographyPath = (filename: string) => `/photography/${encodeURIComponent(filename)}`
const services: { title: string; description: string; index: string; media: ServiceMedia[] }[] = [
  {
    title: 'Video that moves beyond the screen', index: '05',
    description: 'From cinematic brand films to fast-paced social content, we create visuals designed to capture attention, build emotion, and leave a lasting impact.',
    media: [
      { src: '/videos/car-delivery.mp4', poster: '/posters/car-delivery.jpg' },
      { src: '/videos/kaze-bangalore.mp4', poster: '/posters/kaze-bangalore.jpg' },
      { src: '/videos/maara-food.mp4', poster: '/posters/maara-food.jpg' },
      { src: '/videos/mercure-sunset.mp4', poster: '/posters/mercure-sunset.jpg' },
    ],
  },
  {
    title: 'Photography that captures more than moments', index: '06',
    description: 'From campaign shoots to brand imagery, we create photography that feels authentic, refined, and built to strengthen the visual identity behind every brand.',
    media: [
      { src: '', poster: photographyPath('1.jpeg'), image: true },
      { src: '', poster: photographyPath('2.JPG'), image: true },
      { src: '', poster: photographyPath('3.jpg'), image: true },
      { src: '', poster: photographyPath('4.jpeg'), image: true },
    ],
  },
]

function ServicesStack() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [mobile, setMobile] = useState(() => window.matchMedia('(max-width: 580px)').matches)
  useEffect(() => {
    const query = window.matchMedia('(max-width: 580px)')
    const update = () => setMobile(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  useEffect(() => {
    if (mobile) return
    let frame = 0
    const update = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const progress = Math.min(0.999, Math.max(0, -rect.top / Math.max(1, rect.height - window.innerHeight)))
      setActive(Math.min(services.length - 1, Math.floor(progress * services.length)))
    }
    const onScroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update) }
    update(); window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', onScroll)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [mobile])
  const panel = (index: number) => (
    <motion.section className="service-panel content-wrapper" key={index} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.45 }}>
      <div className="service-heading">
        <SectionNumber value={services[index].index} />
        <AnimatedTitle>{services[index].title}<span className="service-dot"> ●</span></AnimatedTitle>
        <p>{services[index].description}</p>
        <ActionLink to="/how-we-roll/" label="How we roll" variant="light" />
      </div>
      <div className="service-media-grid">
        {services[index].media.map((media, mediaIndex) => (
          <motion.div className={`service-media service-media-${mediaIndex + 1}`} key={media.poster} initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 + mediaIndex * 0.08 }}>
            {media.image ? <img src={media.poster} alt="The Shadow photography" /> : <VideoMedia src={media.src} poster={media.poster} label={services[index].title} />}
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
  if (mobile) return <div className="services-stack">{services.map((_, index) => <div className="services-sticky" key={index}>{panel(index)}</div>)}</div>
  return (
    <div className="services-stack" ref={ref}>
      <div className="services-sticky">
        <Spark className="service-spark left" /><Spark className="service-spark right" />
        <AnimatePresence mode="wait">{panel(active)}</AnimatePresence>
      </div>
    </div>
  )
}
