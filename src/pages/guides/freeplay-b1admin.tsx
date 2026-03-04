import type { ReactNode } from 'react';
import { useState } from 'react';
import Layout from '@theme/Layout';
import styles from './freeplay-b1admin.module.css';

const VIDEOS = {
  part1: 'tlV__b9r2Xc',
  part2: 'JNxyIH1dT08',
  part3: '-2MMC1pRBnI',
};

const SS = '/img/guides/screenshots/';

type Step = { text: string; img?: string };

const parts = [
  {
    id: 'part1',
    anchor: 'part1',
    number: 1,
    title: 'Setting Up B1 Admin',
    subtitle: 'Link your content providers and create a plan type',
    videoId: VIDEOS.part1,
    nextAnchor: 'part2',
    nextLabel: 'Continue to Part 2 — Scheduling Your Lesson',
    steps: [
      { text: 'Go to B1.Church and click Sign In in the top right corner.', img: SS + '1.png' },
      { text: "Enter your email and password and click Sign In. If you don't have an account yet, click Register — B1 Admin is always free.", img: SS + '2.png' },
      { text: 'Once logged in, open the menu and click Serving.', img: SS + '3.png' },
      { text: "On the Select a Ministry page, click Add Ministry if you don't have one yet.", img: SS + '4.png' },
      { text: "Give your ministry a name — for example, Children's Ministry — then click Add.", img: SS + '5.png' },
      { text: 'On your ministry page, scroll down to the Content Providers section.', img: SS + '6.png' },
      { text: 'Click Link New Provider.', img: SS + '7.png' },
      { text: 'A dialog shows all available providers — The Bible Project, Lessons.church, SignPresenter, and more. Click Link next to the ones you want to connect.', img: SS + '8.png' },
      { text: "For providers that require authorization, click the link shown, sign in, and the page will automatically detect when you're done.", img: SS + '9.png' },
      { text: 'Once linked, your providers appear in the Content Providers section. Click Create Plan Type to continue.', img: SS + '10.png' },
    ] as Step[],
  },
  {
    id: 'part2',
    anchor: 'part2',
    number: 2,
    title: 'Scheduling Your Lesson',
    subtitle: 'Schedule curriculum, customize your service order, and prepare your volunteers',
    videoId: VIDEOS.part2,
    nextAnchor: 'part3',
    nextLabel: 'Continue to Part 3 — Connecting FreePlay',
    steps: [
      { text: "Give your plan type a name — for example, Elementary Sunday — then click Save.", img: SS + '11.png' },
      { text: 'Your plan type appears in the list. Click on it to open it.', img: SS + '12.png' },
      { text: 'Click Schedule Lesson to add your first lesson.', img: SS + '13.png' },
      { text: 'The Schedule Lesson form opens. Select the date — it defaults to the upcoming Sunday — then click Select Lesson to open the content browser.', img: SS + '14.png' },
      { text: 'Browse to your content and select the version that fits your classroom (e.g., Large Group Abbreviated). Then click Associate Lesson.', img: SS + '15.png' },
      { text: 'Your lesson is now filled in. Click Save to create the plan.', img: SS + '16.png' },
      { text: 'Your plan appears in the list. Click on it to open it.', img: SS + '17.png' },
      { text: 'Click Service Order to review and customize the lesson content.', img: SS + '18.png' },
      { text: 'The Service Order tab shows the full lesson with video thumbnails and timing. Click Customize to rearrange it for your classroom.', img: SS + '19.png' },
      { text: 'In Customize mode you can drag sections into any order. Your changes save automatically.', img: SS + '21.png' },
      { text: 'Use the Assignments tab to manage your volunteer team — roles, assignments, and everything they need is right there.', img: SS + '22.png' },
    ] as Step[],
  },
  {
    id: 'part3',
    anchor: 'part3',
    number: 3,
    title: 'Connecting FreePlay',
    subtitle: 'Install FreePlay on your classroom TV and connect it to your B1 Admin account',
    videoId: VIDEOS.part3,
    nextAnchor: null,
    nextLabel: null,
    steps: [
      { text: 'Install FreePlay on your classroom TV — search for FreePlay (F-R-E-E-P-L-A-Y) in the Amazon Appstore, Google Play Store, or Apple App Store. It\'s completely free.', img: SS + '23.png' },
      { text: 'Tap Install or Get and wait for it to finish downloading, then open FreePlay.', img: SS + '24.png' },
      { text: 'FreePlay goes straight to the Content Providers screen. Select B1.Church.', img: SS + '25.png' },
      { text: 'FreePlay shows a QR code. Scan it with your phone, or visit the URL shown on screen and enter the code.', img: SS + '26.png' },
      { text: 'Your phone opens the B1.Church sign-in page. Sign in and select your church.', img: SS + '27a.png' },
      { text: 'Tap Allow to authorize FreePlay. The TV shows Connected — your account is now linked.', img: SS + '28.png' },
      { text: 'Select Ministries to navigate to your content.', img: SS + '29.png' },
      { text: "Select your ministry — for example, Children's Ministry.", img: SS + '30.png' },
      { text: 'Select your plan type — for example, Elementary Sunday.', img: SS + '31.png' },
      { text: 'FreePlay shows the lesson you scheduled. Select it to begin loading.', img: SS + '32.png' },
      { text: 'Wait for the download to finish — this lets it play even without an internet connection later.', img: SS + '33.png' },
      { text: "Press Select on your remote to begin. That's it — setup is complete! From now on the right lesson downloads automatically to this TV every Sunday or Wednesday, ready for your teachers to play.", img: SS + '34.png' },
    ] as Step[],
  },
];

// ── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <div className={styles.lightboxOverlay} onClick={onClose}>
      <button className={styles.lightboxClose} onClick={onClose}>✕</button>
      <img
        src={src}
        alt="Screenshot"
        className={styles.lightboxImg}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

// ── Steps accordion ───────────────────────────────────────────────────────────
function StepsAccordion({ steps, onImage }: { steps: Step[]; onImage: (src: string) => void }) {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState<boolean[]>(() => steps.map(() => false));

  const toggle = (i: number) => {
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  const allDone = checked.every(Boolean);

  return (
    <div className={styles.accordion}>
      <button className={styles.accordionToggle} onClick={() => setOpen(!open)}>
        <span className={styles.accordionArrow}>{open ? '▲' : '▼'}</span>
        {open ? 'Hide written steps' : 'Prefer written steps? Follow along here'}
        {open && allDone && <span className={styles.allDoneBadge}>All done ✓</span>}
      </button>
      {open && (
        <ol className={styles.stepsList}>
          {steps.map((step, i) => (
            <li key={i} className={`${styles.stepItem} ${checked[i] ? styles.stepDone : ''}`}>
              <button className={styles.checkbox} onClick={() => toggle(i)} aria-label={checked[i] ? 'Mark incomplete' : 'Mark complete'}>
                <span className={styles.checkboxNumber}>{checked[i] ? '✓' : i + 1}</span>
              </button>
              <span className={styles.stepText}>{step.text}</span>
              {step.img && (
                <button className={styles.screenshotBtn} onClick={() => onImage(step.img!)}>
                  📷
                </button>
              )}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

// ── Video part ────────────────────────────────────────────────────────────────
function VideoPart({ part, onImage }: { part: typeof parts[0]; onImage: (src: string) => void }) {
  return (
    <section id={part.anchor} className={styles.part}>
      <div className={styles.partHeader}>
        <span className={styles.partBadge}>Part {part.number}</span>
        <div>
          <h2 className={styles.partTitle}>{part.title}</h2>
          <p className={styles.partSubtitle}>{part.subtitle}</p>
        </div>
      </div>

      <div className={styles.videoWrapper}>
        <iframe
          src={`https://www.youtube.com/embed/${part.videoId}`}
          title={`Part ${part.number} — ${part.title}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <StepsAccordion steps={part.steps} onImage={onImage} />

      {part.nextAnchor ? (
        <div className={styles.nextWrap}>
          <a href={`#${part.nextAnchor}`} className={styles.nextButton}>
            {part.nextLabel} →
          </a>
        </div>
      ) : (
        <div className={styles.doneWrap}>
          <div className={styles.doneCard}>
            <span className={styles.doneCheck}>✓</span>
            <div>
              <strong>You're all set!</strong>
              <p>Your classroom TV will now have the right lesson ready every week automatically.</p>
              <p>
                Questions? Visit{' '}
                <a href="https://support.churchapps.org" target="_blank" rel="noopener noreferrer">
                  support.churchapps.org
                </a>{' '}
                or email us at{' '}
                <a href="mailto:support@churchapps.org">support@churchapps.org</a>.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function FreePlayB1Admin(): ReactNode {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <Layout
      title="Get Your Classroom Ready with FreePlay & B1 Admin"
      description="A step-by-step guide to linking content providers in B1 Admin and connecting FreePlay to your classroom TV."
    >
      {lightboxSrc && <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />}

      {/* Hero */}
      <div className={styles.hero}>
        <img
          src="/img/guides/freeplay-classroom-hero.jpg"
          alt="Teacher using FreePlay in a classroom"
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <p className={styles.heroEyebrow}>Step-by-Step Guide</p>
            <h1 className={styles.heroTitle}>Get Your Classroom Ready with FreePlay & B1 Admin</h1>
            <p className={styles.heroSubtitle}>
              Three short videos walk you through everything — from linking your content providers
              to having the right lesson download automatically to your classroom TV every week.
            </p>
            <a href="#part1" className={styles.heroButton}>Start Part 1 →</a>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className={styles.progressBar}>
        {parts.map((p) => (
          <a key={p.anchor} href={`#${p.anchor}`} className={styles.progressStep}>
            <span className={styles.progressNumber}>{p.number}</span>
            <span className={styles.progressLabel}>{p.title}</span>
          </a>
        ))}
      </div>

      {/* Video sections */}
      <main className={styles.main}>
        {parts.map((part) => (
          <VideoPart key={part.id} part={part} onImage={setLightboxSrc} />
        ))}
      </main>
    </Layout>
  );
}
