import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import 'dotenv/config';


const config: Config = {
  title: 'ChurchApps Support',
  tagline: 'Free, open-source church management tools',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://support.churchapps.org',
  baseUrl: '/',
  // GitHub Pages serves every page as a directory and 301s /foo to /foo/, so
  // canonicals, hreflang and sitemap URLs must use the trailing slash form.
  trailingSlash: true,

  staticDirectories: ['static'],

  organizationName: 'ChurchApps',
  projectName: 'ChurchAppsSupport',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar', 'cs', 'da', 'de', 'es', 'fi', 'fr', 'hi', 'hu', 'id', 'it', 'ja', 'ko', 'lt', 'nl', 'no', 'pl', 'pt', 'ro', 'ru', 'sk', 'sl', 'sr', 'ss', 'sv', 'tl', 'tr', 'uk', 'vi', 'zh'],
    localeConfigs: {
      en: { label: 'English', htmlLang: 'en-US' },
      ar: { label: 'العربية', htmlLang: 'ar', direction: 'rtl' },
      cs: { label: 'Čeština', htmlLang: 'cs' },
      da: { label: 'Dansk', htmlLang: 'da' },
      de: { label: 'Deutsch', htmlLang: 'de' },
      es: { label: 'Español', htmlLang: 'es' },
      fi: { label: 'Suomi', htmlLang: 'fi' },
      fr: { label: 'Français', htmlLang: 'fr' },
      hi: { label: 'हिन्दी', htmlLang: 'hi' },
      hu: { label: 'Magyar', htmlLang: 'hu' },
      id: { label: 'Bahasa Indonesia', htmlLang: 'id' },
      it: { label: 'Italiano', htmlLang: 'it' },
      ja: { label: '日本語', htmlLang: 'ja' },
      ko: { label: '한국어', htmlLang: 'ko' },
      lt: { label: 'Lietuvių', htmlLang: 'lt' },
      nl: { label: 'Nederlands', htmlLang: 'nl' },
      no: { label: 'Norsk', htmlLang: 'no' },
      pl: { label: 'Polski', htmlLang: 'pl' },
      pt: { label: 'Português', htmlLang: 'pt' },
      ro: { label: 'Română', htmlLang: 'ro' },
      ru: { label: 'Русский', htmlLang: 'ru' },
      sk: { label: 'Slovenčina', htmlLang: 'sk' },
      sl: { label: 'Slovenščina', htmlLang: 'sl' },
      sr: { label: 'Српски', htmlLang: 'sr' },
      ss: { label: 'siSwati', htmlLang: 'ss' },
      sv: { label: 'Svenska', htmlLang: 'sv' },
      tl: { label: 'Tagalog', htmlLang: 'tl' },
      tr: { label: 'Türkçe', htmlLang: 'tr' },
      uk: { label: 'Українська', htmlLang: 'uk' },
      vi: { label: 'Tiếng Việt', htmlLang: 'vi' },
      zh: { label: '中文', htmlLang: 'zh' },
    },
  },

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        docsRouteBasePath: '/docs',
        indexBlog: false,
        language: ['en', 'es', 'fr', 'ko', 'de', 'it', 'no', 'pt', 'ru'],
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
          // Automations page removed from B1Admin; scheduled automation now lives in workflow triggers
          { from: '/docs/b1-admin/serving/automations', to: '/docs/b1-admin/serving/workflows' },
          // FreePlay Classroom Mode screens (church/room search) removed from the app; calendar pairing replaces them
          { from: '/docs/freeplay/classroom-mode', to: '/docs/freeplay/scheduled-mode/' },
          { from: '/docs/freeplay/classroom-mode/selecting-room', to: '/docs/freeplay/scheduled-mode/pairing-a-screen' },
          { from: '/docs/freeplay/classroom-mode/downloading-content', to: '/docs/freeplay/content-providers/browsing-content' },
          { from: '/docs/freeplay/classroom-mode/playing-lessons', to: '/docs/freeplay/content-providers/playing-content' },
          // FreePlay's separate lesson browser was removed; Lessons.church is browsed through the provider content browser
          { from: '/docs/freeplay/browsing-lessons', to: '/docs/freeplay/content-providers/browsing-content' },
          { from: '/docs/freeplay/browsing-lessons/programs-studies', to: '/docs/freeplay/content-providers/browsing-content' },
          { from: '/b1/admin/youtube-channel-id.html', to: '/docs/b1-admin/sermons/live-streaming' },
          { from: '/b1/download', to: '/docs/b1-church/getting-started/installing-pwa' },
          // Native B1 Mobile app discontinued; the B1 App PWA (/mobile) replaces it
          { from: '/docs/b1-mobile', to: '/docs/b1-church/' },
          { from: '/docs/b1-mobile/getting-started', to: '/docs/b1-church/getting-started/' },
          { from: '/docs/b1-mobile/getting-started/installing', to: '/docs/b1-church/getting-started/installing-pwa' },
          { from: '/docs/b1-mobile/getting-started/logging-in', to: '/docs/b1-church/getting-started/logging-in' },
          { from: '/docs/b1-mobile/getting-started/switching-churches', to: '/docs/b1-church/getting-started/logging-in' },
          { from: '/docs/b1-mobile/dashboard', to: '/docs/b1-church/getting-started/navigating' },
          { from: '/docs/b1-mobile/groups', to: '/docs/b1-church/groups/' },
          { from: '/docs/b1-mobile/groups/group-details', to: '/docs/b1-church/groups/group-details' },
          { from: '/docs/b1-mobile/groups/group-timeline', to: '/docs/b1-church/groups/conversations' },
          { from: '/docs/b1-mobile/giving', to: '/docs/b1-church/giving/' },
          { from: '/docs/b1-mobile/giving/making-donations', to: '/docs/b1-church/giving/making-donations' },
          { from: '/docs/b1-mobile/giving/managing-payments', to: '/docs/b1-church/giving/making-donations' },
          { from: '/docs/b1-mobile/giving/donation-history', to: '/docs/b1-church/giving/donation-history' },
          { from: '/docs/b1-mobile/events', to: '/docs/b1-church/events/' },
          { from: '/docs/b1-mobile/events/registering', to: '/docs/b1-church/events/registering' },
          { from: '/docs/b1-mobile/checkin', to: '/docs/b1-church/checkin/' },
          { from: '/docs/b1-mobile/checkin/self-checkin', to: '/docs/b1-church/checkin/self-checkin' },
          { from: '/docs/b1-mobile/serving', to: '/docs/b1-church/serving/' },
          { from: '/docs/b1-mobile/serving/viewing-plans', to: '/docs/b1-church/plans/viewing-plans' },
          { from: '/docs/b1-mobile/serving/volunteer-signup', to: '/docs/b1-church/serving/volunteer-signup' },
          { from: '/docs/b1-mobile/community', to: '/docs/b1-church/community/' },
          { from: '/docs/b1-mobile/community/member-directory', to: '/docs/b1-church/community/member-directory' },
          { from: '/docs/b1-mobile/community/messaging', to: '/docs/b1-church/community/member-directory' },
          { from: '/docs/b1-mobile/community/notifications', to: '/docs/b1-church/getting-started/notification-preferences' },
          { from: '/docs/b1-mobile/content', to: '/docs/b1-church/content/' },
          { from: '/docs/b1-mobile/content/sermons', to: '/docs/b1-church/content/sermons' },
          { from: '/docs/b1-mobile/content/live-streaming', to: '/docs/b1-church/content/live-streaming' },
          { from: '/docs/b1-mobile/content/bible', to: '/docs/b1-church/content/bible' },
          { from: '/docs/b1-mobile/content/verse-of-the-day', to: '/docs/b1-church/content/verse-of-the-day' },
          { from: '/docs/b1-mobile/content/lessons', to: '/docs/b1-church/content/lessons' },
          { from: '/docs/b1-mobile/profile', to: '/docs/b1-church/getting-started/editing-your-profile' },
          { from: '/docs/b1-mobile/profile/editing-profile', to: '/docs/b1-church/getting-started/editing-your-profile' },
          { from: '/docs/b1-mobile/profile/household', to: '/docs/b1-church/getting-started/editing-your-profile' },
          { from: '/docs/b1-mobile/profile/privacy-settings', to: '/docs/b1-church/getting-started/editing-your-profile' },
          { from: '/docs/developer/mobile/b1-mobile', to: '/docs/developer/mobile/' },
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

  headTags: [
    {
      tagName: 'script',
      attributes: {type: 'application/ld+json'},
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': 'https://churchapps.org/#organization',
            name: 'ChurchApps',
            legalName: 'Live Church Solutions',
            nonprofitStatus: 'Nonprofit501c3',
            url: 'https://churchapps.org/',
            logo: 'https://support.churchapps.org/img/logo.png',
            email: 'support@churchapps.org',
            sameAs: [
              'https://github.com/ChurchApps',
              'https://b1.church/',
              'https://lessons.church/',
              'https://freeplay.church/',
              'https://worshipcommons.org/',
            ],
          },
          {
            '@type': 'WebSite',
            '@id': 'https://support.churchapps.org/#website',
            name: 'ChurchApps Support',
            url: 'https://support.churchapps.org/',
            publisher: {'@id': 'https://churchapps.org/#organization'},
          },
        ],
      }),
    },
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
        sitemap: {
          lastmod: 'date',
          changefreq: null,
          priority: null,
          ignorePatterns: ['/search/**', '/*/search/**'],
        },
        // GA4: dedicated ChurchApps Support property (stream for support.churchapps.org).
        gtag: {
          trackingID: 'G-V7VZZ21HQ9',
          anonymizeIP: true,
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
            { label: 'B1 - App', to: '/docs/b1-church/' },
            { label: 'B1 - Checkin', to: '/docs/b1-checkin/' },
            { label: 'Lessons.church', to: '/docs/lessons-church/' },
            { label: 'FreePlay', to: '/docs/freeplay/' },
            { label: 'WorshipCommons', to: '/docs/worship-commons/' },
          ],
        },
        {
          type: 'localeDropdown',
          position: 'right',
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