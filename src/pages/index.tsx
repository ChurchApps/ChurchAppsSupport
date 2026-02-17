import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Translate, {translate} from '@docusaurus/Translate';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className="hero-custom">
      <div className="container">
        <div className="hero-content">
          <Heading as="h1" className="hero-custom__title">
            {siteConfig.title}
          </Heading>
          <p className="hero-custom__subtitle">
            <Translate id="homepage.hero.subtitle">
              Free, open-source tools to help your church thrive.
              Find guides, tutorials, and reference docs for every ChurchApps product.
            </Translate>
          </p>
          <div className="hero-custom__actions">
            <Link className="button button--primary button--lg" to="/docs/getting-started/">
              <Translate id="homepage.hero.getStarted">Get Started</Translate>
            </Link>
            <Link className="button button--outline button--lg hero-custom__secondary-btn" to="/docs/b1-admin/">
              <Translate id="homepage.hero.b1AdminDocs">B1 Admin Docs</Translate>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

const products = [
  {
    title: translate({id: 'homepage.products.b1admin.title', message: 'B1 Admin'}),
    description: translate({id: 'homepage.products.b1admin.description', message: 'Church management dashboard for people, groups, attendance, donations, and more.'}),
    link: '/docs/b1-admin/',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>
      </svg>
    ),
    color: '#2196F3',
  },
  {
    title: translate({id: 'homepage.products.b1website.title', message: 'B1 Website'}),
    description: translate({id: 'homepage.products.b1website.description', message: 'Public-facing church website and member portal.'}),
    link: '/docs/b1-church/',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
      </svg>
    ),
    color: '#00897B',
  },
  {
    title: translate({id: 'homepage.products.b1mobile.title', message: 'B1 Mobile'}),
    description: translate({id: 'homepage.products.b1mobile.description', message: 'Mobile app for church members on iOS and Android.'}),
    link: '/docs/b1-mobile/',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>
      </svg>
    ),
    color: '#7B1FA2',
  },
  {
    title: translate({id: 'homepage.products.b1checkin.title', message: 'B1 Checkin'}),
    description: translate({id: 'homepage.products.b1checkin.description', message: 'Self-service check-in kiosk app for Android tablets.'}),
    link: '/docs/b1-checkin/',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>
      </svg>
    ),
    color: '#E65100',
  },
  {
    title: translate({id: 'homepage.products.lessons.title', message: 'Lessons.church'}),
    description: translate({id: 'homepage.products.lessons.description', message: 'Free church curriculum and lesson management.'}),
    link: '/docs/lessons-church/',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>
      </svg>
    ),
    color: '#2E7D32',
  },
  {
    title: translate({id: 'homepage.products.freeplay.title', message: 'FreePlay'}),
    description: translate({id: 'homepage.products.freeplay.description', message: 'TV app for displaying lesson content on classroom screens.'}),
    link: '/docs/freeplay/',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m10 7 5 3-5 3z"/><rect width="20" height="14" x="2" y="3" rx="2"/><path d="M12 17v4"/><path d="M8 21h8"/>
      </svg>
    ),
    color: '#C62828',
  },
];

function ProductCard({title, description, link, icon, color}: {
  title: string;
  description: string;
  link: string;
  icon: ReactNode;
  color: string;
}) {
  return (
    <Link to={link} className="product-card">
      <div className="product-card__icon" style={{'--card-color': color} as React.CSSProperties}>
        {icon}
      </div>
      <div className="product-card__content">
        <h3 className="product-card__title">{title}</h3>
        <p className="product-card__desc">{description}</p>
      </div>
      <span className="product-card__arrow">&rarr;</span>
    </Link>
  );
}

const values = [
  {
    title: translate({id: 'homepage.values.free.title', message: '100% Free'}),
    description: translate({id: 'homepage.values.free.description', message: 'No subscriptions, no premium tiers, no hidden fees. Every feature is free for every church.'}),
    icon: '\u2764\uFE0F',
  },
  {
    title: translate({id: 'homepage.values.openSource.title', message: 'Open Source'}),
    description: translate({id: 'homepage.values.openSource.description', message: 'All code is open source on GitHub. Your data is yours, and you can self-host if you choose.'}),
    icon: '\uD83D\uDD13',
  },
  {
    title: translate({id: 'homepage.values.builtForChurches.title', message: 'Built for Churches'}),
    description: translate({id: 'homepage.values.builtForChurches.description', message: 'Designed specifically for church workflows — not a generic tool adapted for ministry.'}),
    icon: '\u26EA',
  },
];

export default function Home(): ReactNode {
  return (
    <Layout
      title={translate({id: 'homepage.title', message: 'Home'})}
      description={translate({id: 'homepage.description', message: 'Support documentation for ChurchApps - free, open-source church management tools.'})}
    >
      <HomepageHeader />
      <main>
        <section className="products-section">
          <div className="container">
            <Heading as="h2" className="section-heading">
              <Translate id="homepage.products.heading">Choose Your Product</Translate>
            </Heading>
            <p className="section-subtitle">
              <Translate id="homepage.products.subtitle">
                Select a product below to find setup guides, feature documentation, and how-to articles.
              </Translate>
            </p>
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard key={product.title} {...product} />
              ))}
            </div>
          </div>
        </section>
        <section className="values-section">
          <div className="container">
            <div className="values-grid">
              {values.map((v) => (
                <div key={v.title} className="value-card">
                  <span className="value-card__icon">{v.icon}</span>
                  <h3>{v.title}</h3>
                  <p>{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
