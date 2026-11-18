import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

type VideoMediaProps = {
  src: string
  poster: string
  className?: string
  eager?: boolean
  controls?: boolean
  label?: string
}

export function VideoMedia({ src, poster, className = '', eager = false, controls = false, label = 'Project film' }: VideoMediaProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const [load, setLoad] = useState(eager)
  const [inView, setInView] = useState(eager)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || eager) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        if (entry.isIntersecting) setLoad(true)
      },
      { rootMargin: '350px 0px', threshold: 0.01 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [eager])

  useEffect(() => {
    const video = ref.current
    if (!video || controls || !load) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (inView && !reduced) video.play().catch(() => undefined)
    else video.pause()
  }, [inView, load, controls])

  return (
    <span className={`video-media ${className}`} style={{ backgroundImage: `url("${poster}")` }}>
      {!failed && (
        <video
          ref={ref}
          src={load ? src : undefined}
          poster={poster}
          muted={!controls}
          loop={!controls}
          controls={controls}
          playsInline
          preload={eager ? 'auto' : 'none'}
          aria-label={label}
          onCanPlay={() => {
            if (inView && !controls && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
              ref.current?.play().catch(() => undefined)
            }
          }}
          onError={() => setFailed(true)}
        />
      )}
    </span>
  )
}

export function VideoModal({ open, onClose, src, poster }: { open: boolean; onClose: () => void; src: string; poster: string }) {
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="video-modal"
          role="dialog"
          aria-modal="true"
          aria-label="The Shadow showreel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <button className="video-modal-close" onClick={onClose} aria-label="Close showreel"><X /></button>
          <motion.div
            className="video-modal-inner"
            initial={{ scale: 0.96, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.98, y: 10 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <video src={src} poster={poster} controls autoPlay playsInline />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
