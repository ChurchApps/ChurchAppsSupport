import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className="hero" style={{padding: '4rem 0'}}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div style={{display: 'flex', gap: '1rem', marginTop: '1.5rem'}}>
          <Link className="button button--primary button--lg" to="/docs/getting-started/">
            Get Started
          </Link>
          <Link className="button button--secondary button--lg" to="/docs/b1-admin/">
            B1 Admin Docs
          </Link>
        </div>
      </div>
    </header>
  );
}

const products = [
  {
    title: 'B1 - Admin',
    description: 'Church management dashboard for people, groups, attendance, donations, and more.',
    link: '/docs/b1-admin/',
  },
  {
    title: 'B1 - Website',
    description: 'Public-facing church website and member portal.',
    link: '/docs/b1-church/',
  },
  {
    title: 'B1 - Mobile',
    description: 'Mobile app for church members on iOS and Android.',
    link: '/docs/b1-mobile/',
  },
  {
    title: 'B1 - Checkin',
    description: 'Self-service check-in kiosk app for Android tablets.',
    link: '/docs/b1-checkin/',
  },
  {
    title: 'Lessons.church',
    description: 'Free church curriculum and lesson management.',
    link: '/docs/lessons-church/',
  },
  {
    title: 'FreePlay',
    description: 'TV app for displaying lesson content on classroom screens.',
    link: '/docs/freeplay/',
  },
];

export default function Home(): ReactNode {
  return (
    <Layout title="Home" description="Support documentation for ChurchApps - free, open-source church management tools.">
      <HomepageHeader />
      <main className="container" style={{padding: '3rem 0'}}>
        <Heading as="h2" style={{textAlign: 'center', marginBottom: '2rem'}}>
          Choose Your Product
        </Heading>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem'}}>
          {products.map((product) => (
            <Link key={product.title} to={product.link} style={{textDecoration: 'none', color: 'inherit'}}>
              <div className="product-card">
                <h3>{product.title}</h3>
                <p>{product.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </Layout>
  );
}
