import React, {type ReactNode} from 'react';
import {translate} from '@docusaurus/Translate';
import styles from './styles.module.css';

// One call-to-action per docs section, linking readers who landed here from
// search on to the actual product. UTM tags let the product GA4 properties
// attribute visits and signups to the support site.

type Product = {
  key: string;
  url: string;
  color: string;
  title: string;
  body: string;
  button: string;
};

function products(): Record<string, Product> {
  const b1: Product = {
    key: 'b1',
    url: 'https://b1.church/',
    color: '#2196F3',
    title: translate({id: 'productCta.b1.title', message: 'B1.church is free for every church'}),
    body: translate({id: 'productCta.b1.body', message: 'People, groups, giving, check-in, volunteers, and your church website in one place, with no fees or paid tiers.'}),
    button: translate({id: 'productCta.b1.button', message: 'Get started at B1.church'}),
  };
  return {
    'b1-admin': b1,
    'b1-checkin': b1,
    'getting-started': b1,
    'b1-church': {
      ...b1,
      key: 'b1-app',
      color: '#00897B',
      title: translate({id: 'productCta.b1app.title', message: 'Looking for B1.church?'}),
      body: translate({id: 'productCta.b1app.body', message: "Members sign in on their church's own B1 site. Church leaders can set up B1 for free in a few minutes."}),
      button: translate({id: 'productCta.b1app.button', message: 'Go to B1.church'}),
    },
    'lessons-church': {
      key: 'lessons',
      url: 'https://lessons.church/',
      color: '#2E7D32',
      title: translate({id: 'productCta.lessons.title', message: 'Free curriculum, ready to teach'}),
      body: translate({id: 'productCta.lessons.body', message: 'Lessons.church has more than 1,100 ready-to-teach video lessons, free for any church with no subscription.'}),
      button: translate({id: 'productCta.lessons.button', message: 'Browse Lessons.church'}),
    },
    freeplay: {
      key: 'freeplay',
      url: 'https://freeplay.church/',
      color: '#C62828',
      title: translate({id: 'productCta.freeplay.title', message: 'Put lessons on every classroom TV'}),
      body: translate({id: 'productCta.freeplay.body', message: 'FreePlay plays your curriculum on Fire TV, Android TV, and Apple TV, on a schedule or by remote, for free.'}),
      button: translate({id: 'productCta.freeplay.button', message: 'Get FreePlay'}),
    },
    'worship-commons': {
      key: 'worshipcommons',
      url: 'https://worshipcommons.org/',
      color: '#6D4C41',
      title: translate({id: 'productCta.worshipcommons.title', message: 'Find a song for Sunday'}),
      body: translate({id: 'productCta.worshipcommons.body', message: 'WorshipCommons has free hymns and worship songs with chord charts in any key, lyrics, and slides.'}),
      button: translate({id: 'productCta.worshipcommons.button', message: 'Open WorshipCommons'}),
    },
  };
}

// Pages that rank for searches from people who want the product, not help with it:
// product overviews and a few generic-intent pages. These get the card at the top.
const FEATURED = new Set([
  'b1-admin/index',
  'b1-church/index',
  'b1-checkin/index',
  'lessons-church/index',
  'freeplay/index',
  'worship-commons/index',
  'getting-started/index',
  'b1-church/content/verse-of-the-day',
  'b1-church/getting-started/installing-pwa',
]);

export function isFeatured(docId: string): boolean {
  return FEATURED.has(docId);
}

export function productFor(docId: string): Product | undefined {
  return products()[docId.split('/')[0]];
}

function withUtm(url: string, docId: string, placement: string): string {
  const u = new URL(url);
  u.searchParams.set('utm_source', 'support');
  u.searchParams.set('utm_medium', 'docs');
  u.searchParams.set('utm_campaign', 'docs_cta');
  u.searchParams.set('utm_content', `${placement}:${docId}`);
  return u.toString();
}

export default function ProductCta({docId, placement}: {docId: string; placement: 'top' | 'bottom'}): ReactNode {
  const p = productFor(docId);
  if (!p) return null;
  const href = withUtm(p.url, docId, placement);
  const onClick = () => {
    const w = window as unknown as {gtag?: (...a: unknown[]) => void};
    w.gtag?.('event', 'docs_cta_click', {product: p.key, doc_id: docId, placement});
  };
  return (
    <aside
      className={`${styles.cta} ${placement === 'top' ? styles.top : styles.bottom}`}
      style={{'--cta-color': p.color} as React.CSSProperties}
      aria-label={translate({id: 'productCta.ariaLabel', message: 'Product link'})}>
      <div className={styles.text}>
        <p className={styles.title}>{p.title}</p>
        <p className={styles.body}>{p.body}</p>
      </div>
      <a className={styles.button} href={href} onClick={onClick} rel="noopener">
        {p.button}
        <span aria-hidden="true"> →</span>
      </a>
    </aside>
  );
}
