import { OrbitGraphic, Spark } from '../components/Brand'
import { VideoMedia } from '../components/Media'
import { AnimatedTitle, QuoteCTA, SectionNumber, TextItem } from '../components/UI'

const media = {
  pairOneA: { src: '/videos/javaji-campaign.mp4', poster: '/posters/javaji-campaign.jpg' },
  pairOneB: { src: '/videos/studio-motion-1.mp4', poster: '/posters/studio-motion-1.jpg' },
  blueprintA: { src: '/videos/creative-capture-1.mp4', poster: '/posters/creative-capture-1.jpg' },
  blueprintB: { src: '/videos/javaji-editorial.mp4', poster: '/posters/javaji-editorial.jpg' },
  studioA: { src: '/videos/creative-capture-2.mp4', poster: '/posters/creative-capture-2.jpg' },
  studioB: { src: '/videos/studio-motion-2.mp4', poster: '/posters/studio-motion-2.jpg' },
  pairTwoA: { src: '/videos/cinematic-cut.mp4', poster: '/posters/cinematic-cut.jpg' },
  pairTwoB: { src: '/videos/social-reel-1.mp4', poster: '/posters/social-reel-1.jpg' },
  polishA: { src: '/videos/project-two.mp4', poster: '/posters/project-two.jpg' },
  polishB: { src: '/videos/social-reel-2.mp4', poster: '/posters/social-reel-2.jpg' },
}

type Media = { src: string; poster: string }

export default function Process() {
  return (
    <main className="process-page primary-page">
      <section className="editorial-hero process-hero content-wrapper">
        <div className="editorial-hero-left"><SectionNumber value="00" /><OrbitGraphic framed /></div>
        <div className="editorial-hero-right">
          <div className="text medium">This is how we roll</div>
          <AnimatedTitle>Behind every story we create lies a method: listen first, co-create boldly, and deliver with precision. Flexible, fast, and focused, this is what working with The Shadow feels like.</AnimatedTitle>
          <div className="small-title">Fast. Smart. With flavour.</div>
        </div>
      </section>

      <MediaPair first={media.pairOneA} second={media.pairOneB} />
      <PhaseTitle>Phase 1: The Blueprint –<br />Strategize &amp; Design</PhaseTitle>
      <section className="phase-standard content-wrapper">
        <div className="phase-top-text">
          <TextItem number="01 - 1" title="Concept &amp; Storytelling">We collaborate to define your core message, target audience, and the desired emotional impact. From this, we develop a powerful concept and refine it into a detailed script that forms the backbone of your story.</TextItem>
          <TextItem number="01 - 2" title="Visualizing the Narrative">Our creative team translates the script into visual blueprints. Through detailed storyboards and comprehensive shot lists, we map out every scene, camera angle, and movement, ensuring a cohesive visual flow.</TextItem>
        </div>
        <div className="phase-media-grid">
          <div className="phase-media-left">
            <TextItem number="01 - 3" title="Pre-Production Planning">We handle all the essential groundwork: expert casting, selecting top-tier equipment, scouting and securing ideal locations, and assembling a dedicated crew. Every detail is meticulously planned to guarantee a seamless production.</TextItem>
            <MediaBlock media={media.blueprintA} landscape />
          </div>
          <MediaBlock media={media.blueprintB} />
        </div>
      </section>

      <PhaseTitle>Phase 2: The Studio –<br />Capture &amp; Create</PhaseTitle>
      <section className="phase-studio content-wrapper">
        <div className="studio-images">
          <MediaBlock media={media.studioA} square />
          <MediaBlock media={media.studioB} square />
          <Spark />
        </div>
        <div className="studio-text-grid">
          <TextItem number="02 - 1" title="Precision Setup">We meticulously set up the scene, optimizing lighting and sound environments to perfection. Our crew prepares the set, actors are briefed and styled, and every technical element is fine-tuned for optimal capture.</TextItem>
          <TextItem number="02 - 2" title="Production">Under the expert guidance of our director, we capture the essence of your story. Our cinematographers masterfully frame each shot, while our audio engineers ensure pristine sound recording. We secure diverse takes and maintain absolute continuity.</TextItem>
          <TextItem number="02 - 3" title="Quality Assurance">Throughout filming, we rigorously monitor footage quality, ensuring technical excellence and confirming all planned shots are secured. Daily data backups safeguard every precious moment captured.</TextItem>
        </div>
      </section>

      <MediaPair first={media.pairTwoA} second={media.pairTwoB} />
      <div className="process-divider content-wrapper"><Spark /><div><span /><span /><span /></div><Spark /></div>
      <PhaseTitle>Phase 3: The Polish –<br />Edit &amp; Elevate</PhaseTitle>
      <section className="phase-standard content-wrapper">
        <div className="phase-top-text">
          <TextItem number="03 - 1" title="Crafting the Narrative">Our editors meticulously assemble the footage, starting with a logical assembly edit and progressively refining it into a compelling fine cut. This stage brings your story to life, ensuring optimal pacing and flow.</TextItem>
          <TextItem number="03 - 2" title="Sound Design">We elevate your video with professional sound design and audio mixing. Dialogues are clarified, immersive sound effects are integrated, and carefully selected music is layered to enhance the emotional resonance.</TextItem>
        </div>
        <div className="phase-media-grid">
          <div className="phase-media-left">
            <TextItem number="03 - 3" title="Visual Perfection">Our post-production specialists apply expert color correction and artistic color grading to establish the perfect mood. We seamlessly integrate visual effects and dynamic motion graphics to add sophistication and brand polish.</TextItem>
            <MediaBlock media={media.polishA} landscape />
          </div>
          <MediaBlock media={media.polishB} />
        </div>
      </section>

      <QuoteCTA
        index="04"
        label="Ready to go?"
        title="Working with The Shadow feels like having an in-house team, but with outsider firepower."
        second="You’ll see it. You’ll feel it. And your audience will too."
        buttonLabel="Connect"
        squares
      />
    </main>
  )
}

function PhaseTitle({ children }: { children: React.ReactNode }) {
  return <section className="phase-title content-wrapper"><Spark /><AnimatedTitle>{children}</AnimatedTitle></section>
}

function MediaBlock({ media, landscape = false, square = false }: { media: Media; landscape?: boolean; square?: boolean }) {
  return <div className={`process-media ${landscape ? 'landscape' : ''} ${square ? 'square' : ''}`}><VideoMedia src={media.src} poster={media.poster} label="The Shadow production process" /></div>
}

function MediaPair({ first, second }: { first: Media; second: Media }) {
  return (
    <section className="process-media-pair content-wrapper">
      <MediaBlock media={first} landscape />
      <MediaBlock media={second} />
      <Spark />
    </section>
  )
}
