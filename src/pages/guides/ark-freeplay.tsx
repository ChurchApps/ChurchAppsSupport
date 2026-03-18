import type { ReactNode } from 'react';
import { useState } from 'react';
import Layout from '@theme/Layout';
import styles from './freeplay-quickstart.module.css';

const VIDEO_ID = 'B66xhbtyoNQ';
const SS = '/img/guides/ark/';

type Step = { text: string; img?: string };

const steps: Step[] = [
  { text: 'On your Fire TV, Apple TV, or Android TV, open the app store and search for FreePlay.', img: SS + '1.png' },
  { text: 'Select FreePlay and tap Download — it\'s completely free, no subscription or trial.', img: SS + '2.png' },
  { text: 'FreePlay opens to the Content Providers screen. Select Lessons.church.', img: SS + '3.png' },
  { text: 'You\'ll see two options — Lessons and Add-Ons. Add-Ons are open source videos you can use alongside your lessons. For now, select Lessons.', img: SS + '4.png' },
  { text: 'Lessons.church offers free curriculum from multiple providers. Select Ark Kids Elementary or Junior to find Ark Curriculum.', img: SS + '6.png' },
  { text: 'Ark Kids Junior — featuring Conductor Carl — is designed for preschool.', img: SS + '6.png' },
  { text: 'Ark Kids Elementary — Herman and Rusty — is for Kindergarten through 5th grade. Both cover the same Bible lesson each week, filmed completely differently for their age group. Select the one that fits your classroom.', img: SS + '7.png' },
  { text: 'Inside you\'ll find every series available. Select the one your church is currently teaching.', img: SS + '8.png' },
  { text: 'Select your series and you\'ll see every weekly lesson inside.', img: SS + '9.png' },
  { text: 'Each lesson has multiple format options — Large Group Full Program, Midweek/Classroom, and Large Group Abbreviated. Pick the one that fits your class.', img: SS + '10.png' },
  { text: 'Select Download to save it to your device — it\'ll play perfectly on Sunday morning even if your Wi-Fi is slow. Stream is also available if you have a reliable connection.', img: SS + '11.png' },
  { text: 'FreePlay downloads everything to your device — sit back while it saves.', img: SS + '12.png' },
  { text: 'When the download finishes, the Start button appears. Press Select on your remote and you\'re playing.', img: SS + '13.png' },
];

// ── Lightbox ──────────────────────────────────────────────────────────────────
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

// ── Steps list ────────────────────────────────────────────────────────────────
function StepsList({ onImage }: { onImage: (src: string) => void }) {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState<boolean[]>(() => steps.map(() => false));

  const toggle = (i: number) => setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
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

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ArkFreeplay(): ReactNode {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <Layout
      title="Play Ark Curriculum on Your Classroom TV"
      description="Install FreePlay and start playing Ark Curriculum on your classroom TV in just a few minutes — completely free, no account needed."
    >
      {lightboxSrc && <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />}

      {/* Hero */}
      <div className={styles.hero}>
        <img
          src="/img/guides/ark-curriculum-hero.jpg"
          alt="Ark Curriculum on a classroom TV"
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <p className={styles.heroEyebrow}>Quick Start Guide</p>
            <h1 className={styles.heroTitle}>Play Ark Curriculum on Your Classroom TV</h1>
            <p className={styles.heroSubtitle}>
              Install FreePlay, connect to Lessons.church, and start playing Ark Curriculum
              in just a few minutes — completely free, no account required.
            </p>
            <a href="#video" className={styles.heroButton}>Watch the Video →</a>
          </div>
        </div>
      </div>

      <main className={styles.main}>

        {/* Video */}
        <section id="video" className={styles.part}>
          <div className={styles.videoWrapper}>
            <iframe
              src={`https://www.youtube.com/embed/${VIDEO_ID}`}
              title="Play Ark Curriculum on Your Classroom TV"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <StepsList onImage={setLightboxSrc} />
        </section>

        {/* Teaser / next step */}
        <section className={styles.teaser}>
          <div className={styles.teaserCard}>
            <div className={styles.teaserIcon}>🚀</div>
            <div>
              <h2 className={styles.teaserTitle}>Ready to automate it?</h2>
              <p className={styles.teaserText}>
                Connect FreePlay to B1 Admin and the right lesson downloads to the correct classroom TV automatically every single week — no searching, no setup, no last-minute scrambling.
              </p>
              <a href="/guides/freeplay-b1admin" className={styles.teaserButton}>
                See the Full Setup Guide →
              </a>
            </div>
          </div>
          <div className={styles.supportNote}>
            Questions? Visit{' '}
            <a href="https://support.churchapps.org" target="_blank" rel="noopener noreferrer">
              support.churchapps.org
            </a>{' '}
            or email us at{' '}
            <a href="mailto:support@churchapps.org">support@churchapps.org</a>.
          </div>
        </section>

      </main>
    </Layout>
  );
}
