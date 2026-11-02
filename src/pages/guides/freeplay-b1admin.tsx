import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import styles from './freeplay-b1admin.module.css';

// Retired 2026-11-02: the old 3-part B1 Admin + FreePlay guide was out of date after the October B1 redesign.
// Kept at this URL because FreePlay emails 19 and 109 link here; it now points to the new beginner series.
const NEW_GUIDE = 'https://mautic.churchapps.org/guides/classroom-tv.html';

export default function FreePlayB1AdminGuide(): ReactNode {
  return (
    <Layout
      title="Your Classroom TV, Step by Step"
      description="This guide has moved. Set up a classroom TV that plays worship, then this Sunday's lesson, on its own."
    >
      <div className={styles.hero}>
        <img
          src="/img/guides/freeplay-classroom-hero.jpg"
          alt="Teacher using FreePlay in a classroom"
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <p className={styles.heroEyebrow}>This guide has moved</p>
            <h1 className={styles.heroTitle}>Your classroom TV, step by step</h1>
            <p className={styles.heroSubtitle}>
              We made a newer, simpler guide: 8 short videos that take you from no account to worship
              and this Sunday's lesson playing on your classroom TV on their own.
            </p>
            <a href={NEW_GUIDE} className={styles.heroButton}>Open the new guide →</a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
