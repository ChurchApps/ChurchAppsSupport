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

  staticDirectories: ['static', 'videos'],

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

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          // Old b1Admin help icon paths (via help= props)
          { from: '/b1Admin/advanced-search', to: '/docs/b1-admin/people/searching-people' },
          { from: '/b1Admin/assigning-roles', to: '/docs/b1-admin/settings/roles-permissions' },
          { from: '/b1Admin/attendance', to: '/docs/b1-admin/attendance/' },
          { from: '/b1Admin/donations', to: '/docs/b1-admin/donations/' },
          { from: '/b1Admin/forms', to: '/docs/b1-admin/forms/' },
          { from: '/b1Admin/giving', to: '/docs/b1-admin/donations/' },
          { from: '/b1Admin/groups', to: '/docs/b1-admin/groups/' },
          { from: '/b1Admin/manual-input', to: '/docs/b1-admin/donations/recording-donations' },
          { from: '/b1Admin/streaming/playlists', to: '/docs/b1-admin/sermons/playlists' },
          { from: '/b1Admin/streaming/sermons', to: '/docs/b1-admin/sermons/' },

          // Old hardcoded URLs
          { from: '/b1Admin/plans.html', to: '/docs/b1-admin/serving/plans' },
          { from: '/b1/admin/youtube-channel-id.html', to: '/docs/b1-admin/sermons/live-streaming' },
          { from: '/b1/download', to: '/docs/b1-mobile/getting-started/installing' },
          { from: '/b1/portal/donations', to: '/docs/b1-church/giving/' },
          { from: '/developer/open-lesson-schema.html', to: '/docs/developer/' },

          // Top-level old section landing page
          { from: '/b1Admin', to: '/docs/b1-admin/' },

          // Other old Jekyll pages that were migrated
          { from: '/b1Admin/intro', to: '/docs/b1-admin/introduction' },
          { from: '/b1Admin/data-security', to: '/docs/b1-admin/settings/data-security' },
          { from: '/b1Admin/website-initial-setup', to: '/docs/b1-admin/website/initial-setup' },
          { from: '/b1Admin/website-initial-setup.html', to: '/docs/b1-admin/website/initial-setup' },
          { from: '/b1Admin/sermons', to: '/docs/b1-admin/sermons/' },
          { from: '/b1Admin/sermons.html', to: '/docs/b1-admin/sermons/' },
          { from: '/b1Admin/stream-setup', to: '/docs/b1-admin/sermons/live-streaming' },
          { from: '/b1Admin/donation-report', to: '/docs/b1-admin/donations/donation-reports' },
          { from: '/b1Admin/donation-report.html', to: '/docs/b1-admin/donations/donation-reports' },
          { from: '/b1Admin/group-roster', to: '/docs/b1-admin/groups/group-members' },
          { from: '/b1Admin/ai-search', to: '/docs/b1-admin/people/ai-search' },
        ],
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
        src: 'img/logo-light.png',
        srcDark: 'img/logo.png',
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
            { label: 'B1 - Admin', to: '/docs/b1-admin/' },
            { label: 'B1 - Website', to: '/docs/b1-church/' },
            { label: 'B1 - Mobile', to: '/docs/b1-mobile/' },
            { label: 'B1 - Checkin', to: '/docs/b1-checkin/' },
            { label: 'Lessons.church', to: '/docs/lessons-church/' },
            { label: 'FreePlay', to: '/docs/freeplay/' },
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
            { label: 'Getting Started', to: '/docs/getting-started/' },
            { label: 'B1 Admin', to: '/docs/b1-admin/' },
            { label: 'Developer Docs', to: '/docs/developer/' },
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
