import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      key: 'getting-started',
      link: { type: 'doc', id: 'getting-started/index' },
      items: [
        'getting-started/create-account',
        'getting-started/initial-setup',
      ],
    },
    {
      type: 'category',
      label: 'B1 - Admin',
      link: { type: 'doc', id: 'b1-admin/index' },
      items: [
        'b1-admin/introduction',
        {
          type: 'category',
          label: 'People',
          link: { type: 'doc', id: 'b1-admin/people/index' },
          items: [
            'b1-admin/people/adding-people',
            'b1-admin/people/searching-people',
            'b1-admin/people/ai-search',
            'b1-admin/people/importing-data',
            'b1-admin/people/exporting-data',
            'b1-admin/people/roles-permissions',
          ],
        },
        {
          type: 'category',
          label: 'Groups',
          key: 'admin-groups',
          link: { type: 'doc', id: 'b1-admin/groups/index' },
          items: [
            'b1-admin/groups/creating-groups',
            'b1-admin/groups/group-members',
            'b1-admin/groups/group-calendar',
          ],
        },
        {
          type: 'category',
          label: 'Attendance',
          link: { type: 'doc', id: 'b1-admin/attendance/index' },
          items: [
            'b1-admin/attendance/setup',
            'b1-admin/attendance/tracking-attendance',
            'b1-admin/attendance/check-in',
          ],
        },
        {
          type: 'category',
          label: 'Donations',
          link: { type: 'doc', id: 'b1-admin/donations/index' },
          items: [
            'b1-admin/donations/recording-donations',
            'b1-admin/donations/batches',
            'b1-admin/donations/funds',
            'b1-admin/donations/giving-statements',
            'b1-admin/donations/online-giving-setup',
            'b1-admin/donations/stripe-import',
            'b1-admin/donations/donation-reports',
          ],
        },
        {
          type: 'category',
          label: 'Serving',
          key: 'admin-serving',
          link: { type: 'doc', id: 'b1-admin/serving/index' },
          items: [
            'b1-admin/serving/plans',
            'b1-admin/serving/scheduling-lessons',
            'b1-admin/serving/plan-validation',
            'b1-admin/serving/tv-pairing',
            'b1-admin/serving/service-order',
            'b1-admin/serving/tasks',
            'b1-admin/serving/automations',
            'b1-admin/serving/songs',
          ],
        },
        {
          type: 'category',
          label: 'Forms',
          link: { type: 'doc', id: 'b1-admin/forms/index' },
          items: [
            'b1-admin/forms/creating-forms',
            'b1-admin/forms/managing-submissions',
          ],
        },
        {
          type: 'category',
          label: 'Reports',
          link: { type: 'doc', id: 'b1-admin/reports/index' },
          items: [
            'b1-admin/reports/birthday-report',
            'b1-admin/reports/attendance-reports',
            'b1-admin/reports/donation-summary',
          ],
        },
        {
          type: 'category',
          label: 'Website',
          link: { type: 'doc', id: 'b1-admin/website/index' },
          items: [
            'b1-admin/website/initial-setup',
            'b1-admin/website/managing-pages',
            'b1-admin/website/appearance',
            'b1-admin/website/files',
          ],
        },
        {
          type: 'category',
          label: 'Sermons',
          link: { type: 'doc', id: 'b1-admin/sermons/index' },
          items: [
            'b1-admin/sermons/managing-sermons',
            'b1-admin/sermons/playlists',
            'b1-admin/sermons/live-streaming',
            'b1-admin/sermons/bulk-import',
          ],
        },
        {
          type: 'category',
          label: 'Calendars',
          link: { type: 'doc', id: 'b1-admin/calendars/index' },
          items: [
            'b1-admin/calendars/creating-calendars',
            'b1-admin/calendars/curated-calendar',
          ],
        },
        {
          type: 'category',
          label: 'Settings',
          link: { type: 'doc', id: 'b1-admin/settings/index' },
          items: [
            'b1-admin/settings/church-settings',
            'b1-admin/settings/roles-permissions',
            'b1-admin/settings/mobile-app',
            'b1-admin/settings/data-security',
          ],
        },
        {
          type: 'category',
          label: 'Profile',
          key: 'admin-profile',
          link: { type: 'doc', id: 'b1-admin/profile/index' },
          items: [
            'b1-admin/profile/managing-profile',
            'b1-admin/profile/devices',
          ],
        },
        {
          type: 'category',
          label: 'Guides',
          items: [
            'b1-admin/guides/getting-started-b1',
            'b1-admin/guides/online-giving',
            'b1-admin/guides/launch-website',
            'b1-admin/guides/childrens-checkin',
            'b1-admin/guides/sunday-volunteers',
            'b1-admin/guides/sermon-library',
            'b1-admin/guides/small-groups',
            'b1-admin/guides/event-registration',
            'b1-admin/guides/track-attendance',
            'b1-admin/guides/year-end-reports',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'B1 - Website',
      link: { type: 'doc', id: 'b1-church/index' },
      items: [
        {
          type: 'category',
          label: 'Getting Started',
          key: 'church-getting-started',
          link: { type: 'doc', id: 'b1-church/getting-started/index' },
          items: [
            'b1-church/getting-started/logging-in',
            'b1-church/getting-started/navigating',
          ],
        },
        {
          type: 'category',
          label: 'Groups',
          key: 'church-groups',
          link: { type: 'doc', id: 'b1-church/groups/index' },
          items: [
            'b1-church/groups/browsing-groups',
            'b1-church/groups/group-details',
            'b1-church/groups/conversations',
          ],
        },
        {
          type: 'category',
          label: 'Giving',
          key: 'church-giving',
          link: { type: 'doc', id: 'b1-church/giving/index' },
          items: [
            'b1-church/giving/making-donations',
            'b1-church/giving/donation-history',
          ],
        },
        {
          type: 'category',
          label: 'Plans',
          link: { type: 'doc', id: 'b1-church/plans/index' },
          items: [
            'b1-church/plans/viewing-plans',
            'b1-church/plans/service-order',
          ],
        },
        {
          type: 'category',
          label: 'Check-In',
          key: 'church-checkin',
          link: { type: 'doc', id: 'b1-church/checkin/index' },
          items: [
            'b1-church/checkin/self-checkin',
          ],
        },
        {
          type: 'category',
          label: 'Community',
          key: 'church-community',
          link: { type: 'doc', id: 'b1-church/community/index' },
          items: [
            'b1-church/community/member-directory',
            'b1-church/community/timeline',
          ],
        },
        {
          type: 'category',
          label: 'Content',
          key: 'church-content',
          link: { type: 'doc', id: 'b1-church/content/index' },
          items: [
            'b1-church/content/sermons',
            'b1-church/content/live-streaming',
            'b1-church/content/bible',
            'b1-church/content/verse-of-the-day',
            'b1-church/content/lessons',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'B1 - Mobile',
      link: { type: 'doc', id: 'b1-mobile/index' },
      items: [
        {
          type: 'category',
          label: 'Getting Started',
          key: 'mobile-getting-started',
          link: { type: 'doc', id: 'b1-mobile/getting-started/index' },
          items: [
            'b1-mobile/getting-started/installing',
            'b1-mobile/getting-started/logging-in',
            'b1-mobile/getting-started/switching-churches',
          ],
        },
        'b1-mobile/dashboard/index',
        {
          type: 'category',
          label: 'Groups',
          key: 'mobile-groups',
          link: { type: 'doc', id: 'b1-mobile/groups/index' },
          items: [
            'b1-mobile/groups/group-details',
            'b1-mobile/groups/group-timeline',
          ],
        },
        {
          type: 'category',
          label: 'Giving',
          key: 'mobile-giving',
          link: { type: 'doc', id: 'b1-mobile/giving/index' },
          items: [
            'b1-mobile/giving/making-donations',
            'b1-mobile/giving/managing-payments',
            'b1-mobile/giving/donation-history',
          ],
        },
        {
          type: 'category',
          label: 'Check-In',
          key: 'mobile-checkin',
          link: { type: 'doc', id: 'b1-mobile/checkin/index' },
          items: [
            'b1-mobile/checkin/self-checkin',
          ],
        },
        {
          type: 'category',
          label: 'Serving',
          key: 'mobile-serving',
          link: { type: 'doc', id: 'b1-mobile/serving/index' },
          items: [
            'b1-mobile/serving/viewing-plans',
          ],
        },
        {
          type: 'category',
          label: 'Community',
          key: 'mobile-community',
          link: { type: 'doc', id: 'b1-mobile/community/index' },
          items: [
            'b1-mobile/community/member-directory',
            'b1-mobile/community/messaging',
            'b1-mobile/community/notifications',
          ],
        },
        {
          type: 'category',
          label: 'Content',
          key: 'mobile-content',
          link: { type: 'doc', id: 'b1-mobile/content/index' },
          items: [
            'b1-mobile/content/sermons',
            'b1-mobile/content/live-streaming',
            'b1-mobile/content/bible',
            'b1-mobile/content/verse-of-the-day',
            'b1-mobile/content/lessons',
          ],
        },
        {
          type: 'category',
          label: 'Profile',
          key: 'mobile-profile',
          link: { type: 'doc', id: 'b1-mobile/profile/index' },
          items: [
            'b1-mobile/profile/editing-profile',
            'b1-mobile/profile/household',
            'b1-mobile/profile/privacy-settings',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'B1 - Checkin',
      link: { type: 'doc', id: 'b1-checkin/index' },
      items: [
        {
          type: 'category',
          label: 'Getting Started',
          key: 'checkin-getting-started',
          link: { type: 'doc', id: 'b1-checkin/getting-started/index' },
          items: [
            'b1-checkin/getting-started/logging-in',
            'b1-checkin/getting-started/printer-setup',
          ],
        },
        {
          type: 'category',
          label: 'Check-In',
          key: 'checkin-checkin',
          link: { type: 'doc', id: 'b1-checkin/check-in/index' },
          items: [
            'b1-checkin/check-in/selecting-service',
            'b1-checkin/check-in/looking-up-members',
            'b1-checkin/check-in/household-review',
            'b1-checkin/check-in/group-assignment',
            'b1-checkin/check-in/adding-guests',
            'b1-checkin/check-in/completing-checkin',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Lessons.church',
      link: { type: 'doc', id: 'lessons-church/index' },
      items: [
        'lessons-church/statement-of-faith',
        {
          type: 'category',
          label: 'Getting Started',
          key: 'lessons-getting-started',
          link: { type: 'doc', id: 'lessons-church/getting-started/index' },
          items: [
            'lessons-church/getting-started/creating-account',
            'lessons-church/getting-started/portal-overview',
          ],
        },
        {
          type: 'category',
          label: 'Browsing Content',
          link: { type: 'doc', id: 'lessons-church/browsing/index' },
          items: [
            'lessons-church/browsing/programs-and-studies',
            'lessons-church/browsing/viewing-lessons',
            'lessons-church/browsing/searching',
            'lessons-church/browsing/external-providers',
          ],
        },
        {
          type: 'category',
          label: 'Classrooms',
          link: { type: 'doc', id: 'lessons-church/classrooms/index' },
          items: [
            'lessons-church/classrooms/setting-up-classrooms',
            'lessons-church/classrooms/scheduling-lessons',
          ],
        },
        {
          type: 'category',
          label: 'Customization',
          link: { type: 'doc', id: 'lessons-church/customization/index' },
          items: [
            'lessons-church/customization/customizing-lessons',
          ],
        },
        {
          type: 'category',
          label: 'Presenting',
          link: { type: 'doc', id: 'lessons-church/presenting/index' },
          items: [
            'lessons-church/presenting/presenter-mode',
            'lessons-church/presenting/volunteer-guides',
            'lessons-church/presenting/downloads',
          ],
        },
        {
          type: 'category',
          label: 'Administration',
          link: { type: 'doc', id: 'lessons-church/admin/index' },
          items: [
            'lessons-church/admin/managing-programs',
            'lessons-church/admin/managing-studies',
            'lessons-church/admin/managing-lessons',
            'lessons-church/admin/statistics',
            'lessons-church/admin/third-party-providers',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'FreePlay',
      link: { type: 'doc', id: 'freeplay/index' },
      items: [
        {
          type: 'category',
          label: 'Getting Started',
          key: 'freeplay-getting-started',
          link: { type: 'doc', id: 'freeplay/getting-started/index' },
          items: [
            'freeplay/getting-started/pairing-modes',
          ],
        },
        {
          type: 'category',
          label: 'Classroom Mode',
          link: { type: 'doc', id: 'freeplay/classroom-mode/index' },
          items: [
            'freeplay/classroom-mode/selecting-room',
            'freeplay/classroom-mode/downloading-content',
            'freeplay/classroom-mode/playing-lessons',
          ],
        },
        {
          type: 'category',
          label: 'Plan Mode',
          link: { type: 'doc', id: 'freeplay/plan-mode/index' },
          items: [
            'freeplay/plan-mode/device-pairing',
          ],
        },
        {
          type: 'category',
          label: 'Content Providers',
          link: { type: 'doc', id: 'freeplay/content-providers/index' },
          items: [
            'freeplay/content-providers/connecting-providers',
            'freeplay/content-providers/browsing-content',
          ],
        },
        {
          type: 'category',
          label: 'Browsing Lessons',
          link: { type: 'doc', id: 'freeplay/browsing-lessons/index' },
          items: [
            'freeplay/browsing-lessons/programs-studies',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Developer',
      link: { type: 'doc', id: 'developer/index' },
      items: [
        {
          type: 'category',
          label: 'Setup',
          link: { type: 'doc', id: 'developer/setup/index' },
          items: [
            'developer/setup/prerequisites',
            'developer/setup/project-overview',
            'developer/setup/environment-variables',
          ],
        },
        {
          type: 'category',
          label: 'API',
          link: { type: 'doc', id: 'developer/api/index' },
          items: [
            'developer/api/local-setup',
            'developer/api/database',
            'developer/api/module-structure',
            {
              type: 'category',
              label: 'Endpoint Reference',
              link: { type: 'doc', id: 'developer/api/endpoints/index' },
              items: [
                'developer/api/endpoints/authentication',
                'developer/api/endpoints/membership',
                'developer/api/endpoints/attendance',
                'developer/api/endpoints/content',
                'developer/api/endpoints/giving',
                'developer/api/endpoints/messaging',
                'developer/api/endpoints/doing',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Web Apps',
          link: { type: 'doc', id: 'developer/web-apps/index' },
          items: [
            'developer/web-apps/b1-admin',
            'developer/web-apps/b1-app',
            'developer/web-apps/lessons-app',
          ],
        },
        {
          type: 'category',
          label: 'Mobile Apps',
          link: { type: 'doc', id: 'developer/mobile/index' },
          items: [
            'developer/mobile/b1-mobile',
          ],
        },
        {
          type: 'category',
          label: 'Shared Libraries',
          link: { type: 'doc', id: 'developer/shared-libraries/index' },
          items: [
            'developer/shared-libraries/helpers',
            'developer/shared-libraries/api-helper',
            'developer/shared-libraries/app-helper',
          ],
        },
        {
          type: 'category',
          label: 'Deployment',
          link: { type: 'doc', id: 'developer/deployment/index' },
          items: [
            'developer/deployment/apis',
            'developer/deployment/web-apps',
            'developer/deployment/mobile',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
