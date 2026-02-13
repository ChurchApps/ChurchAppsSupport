import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'ChurchApps Support',
  tagline: 'Free, open-source church management tools',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://support.churchapps.org',
  baseUrl: '/',

  organizationName: 'ChurchApps',
  projectName: 'ChurchAppsSupport',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        docsRouteBasePath: '/docs',
        indexBlog: false,
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/ChurchApps/ChurchAppsSupport/edit/main/',
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/logo.png',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'ChurchApps Support',
      logo: {
        alt: 'ChurchApps',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          type: 'dropdown',
          label: 'Products',
          position: 'left',
          items: [
            { label: 'B1 - Admin', to: '/docs/b1-admin' },
            { label: 'B1 - Website', to: '/docs/b1-church' },
            { label: 'B1 - Mobile', to: '/docs/b1-mobile' },
            { label: 'B1 - Checkin', to: '/docs/b1-checkin' },
            { label: 'Lessons.church', to: '/docs/lessons-church' },
            { label: 'FreePlay', to: '/docs/freeplay' },
          ],
        },
        {
          href: 'https://github.com/ChurchApps',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://churchapps.org',
          label: 'ChurchApps.org',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            { label: 'Getting Started', to: '/docs/getting-started' },
            { label: 'B1 Admin', to: '/docs/b1-admin' },
            { label: 'Developer Docs', to: '/docs/developer' },
          ],
        },
        {
          title: 'Products',
          items: [
            { label: 'B1.church', href: 'https://b1.church' },
            { label: 'Lessons.church', href: 'https://lessons.church' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'GitHub', href: 'https://github.com/ChurchApps' },
            { label: 'Contact Support', href: 'mailto:support@churchapps.org' },
          ],
        },
      ],
      copyright: `Copyright ${new Date().getFullYear()} Live Church Solutions. A 501(c)(3) organization. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
