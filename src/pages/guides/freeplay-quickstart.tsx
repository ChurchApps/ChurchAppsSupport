import type { ReactNode } from 'react';
import { useState } from 'react';
import Layout from '@theme/Layout';
import styles from './freeplay-quickstart.module.css';

const VIDEO_ID = 'zZYCBarN6h0';
const SS = '/img/guides/quickstart/';

type Step = { text: string; img?: string };

const steps: Step[] = [
  { text: 'On your Fire TV, Apple TV, or Android TV, open the app store and search for FreePlay.', img: SS + '1.png' },
  { text: 'Select FreePlay and tap Download — it\'s completely free, no subscription or trial.', img: SS + '2.png' },
  { text: 'FreePlay opens to the Content Providers screen — this is where you connect to your content sources.', img: SS + '3.png' },
  { text: 'Already using a paid curriculum provider? Select it and scan the QR code with your phone. Sign in with your existing account and you\'re connected.', img: SS + 'qr.png' },
  { text: 'For a free option, select The Bible Project — it connects instantly, no account needed. Your full library appears right on the TV.', img: SS + '4.png' },
  { text: 'Select any series to see every video inside.', img: SS + '5.png' },
  { text: 'FreePlay downloads the video to your device so it plays perfectly on Sunday morning — even if your Wi-Fi is slow.', img: SS + '6.png' },
  { text: 'When the download finishes, the Start button appears. Press Select on your remote and you\'re playing.', img: SS + '7.png' },
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
export default function FreePlayQuickstart(): ReactNode {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <Layout
      title="Get FreePlay Running in Minutes"
      description="A quick start guide to installing FreePlay and playing lesson content on your classroom TV."
    >
      {lightboxSrc && <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />}

      {/* Hero */}
      <div className={styles.hero}>
        <img
          src="/img/guides/freeplay-classroom-hero.jpg"
          alt="FreePlay on a classroom TV"
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <p className={styles.heroEyebrow}>Quick Start Guide</p>
            <h1 className={styles.heroTitle}>Get FreePlay Running in Minutes</h1>
            <p className={styles.heroSubtitle}>
              Install FreePlay on your classroom TV, connect to your content, and start playing —
              all in just a few minutes. No tech skills required.
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
              title="Get FreePlay Running in Minutes"
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
              <h2 className={styles.teaserTitle}>Ready to take it further?</h2>
              <p className={styles.teaserText}>
                Connect FreePlay to B1 Admin and the right lesson downloads to your classroom TV automatically every Sunday — no searching, no setup each week.
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
