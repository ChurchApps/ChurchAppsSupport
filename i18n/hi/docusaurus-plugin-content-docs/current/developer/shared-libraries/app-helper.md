---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

`@churchapps/apphelper` पैकेज सभी ChurchApps वेब एप्लिकेशन के लिए साझा React components और utilities प्रदान करता है। यह एक एकल प्रकाशित पैकेज है जो subpath entry points के माध्यम से feature modules को expose करता है -- login, donations, forms, markdown, और website/CMS कार्यक्षमता -- core components और helpers के एक साथ।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- **Node.js** और **Git** इंस्टॉल करें -- देखें [Prerequisites](../setup/prerequisites)
- [Packages workspace](./index.md) setup और release flow से परिचित हों

</div>

## Entry Points

पैकेज अपने `package.json` में subpath exports परिभाषित करता है, इसलिए प्रत्येक feature module अपने आप importable है:

| Entry point | Contents |
|-------------|----------|
| `@churchapps/apphelper` | Core components, helpers, और hooks |
| `@churchapps/apphelper/login` | Login और registration UI |
| `@churchapps/apphelper/donations` | Giving और donation components |
| `@churchapps/apphelper/forms` | Form submission components |
| `@churchapps/apphelper/markdown` | Markdown और HTML editors और renderers |
| `@churchapps/apphelper/website` | Website builder और CMS components |

## कौन क्या उपभोग करता है

एक साझा export को change करने से पहले, जांचें कि कौन से apps इसे import करते हैं:

| Export area | यह क्या प्रदान करता है | उपभोग किए गए |
|---|---|---|
| Root -- core components & hooks | `DisplayBox`, `InputBox`, `Loading`, `PageHeader`, `PersonAvatar`, `SmallButton`, `ErrorMessages`, `ExportLink`, `useMountedState`, साथ ही re-exported `@churchapps/helpers` utilities (`ApiHelper`, `DateHelper`, `Locale`, `UserHelper`, आदि) | B1Admin, B1App, B1Transfer, LessonsApp |
| Root -- site chrome | `SiteHeader` (nav, user menu, notifications) | B1Admin, B1Transfer, LessonsApp |
| Root -- admin content editors | `ImageEditor`, `HelpIcon` | B1Admin |
| Root -- realtime plumbing | `SocketHelper`, `SubscriptionManager`, `NotificationService` | B1Admin, B1App |
| Root -- chat/presence stores | `ConversationStore`, `PresenceStore` | B1App |
| Root -- notes & messaging UI | `Notes` (staff notes on people/tasks); `AddNote`, `SubscriptionToggle` (member messaging) | B1Admin (`Notes`), B1App (`AddNote`, `SubscriptionToggle`) |
| Root -- Lessons-specific | `AnalyticsHelper`, `FloatingSupport`, `SupportModal` | LessonsApp |
| `./login` | `LoginPage`, `LogoutPage` | B1Admin, B1App, B1Transfer, LessonsApp |
| `./markdown` | `MarkdownEditor`, `MarkdownPreviewLight` (shared); `MarkdownPreview`, `HtmlEditor` (admin content editing) | B1Admin, B1App, LessonsApp |
| `./donations` | `MultiGatewayDonationForm`, `RecurringDonations`, `PaymentMethods`, `StripePaymentMethod`, `DonationHelper`/`getPaymentProvider` (shared); `FundDonations` (admin only) | B1Admin, B1App |
| `./forms` | `FormSubmissionEdit` (renders `ConversationalForm` जब फॉर्म का `displayMode` `conversational` हो) | B1Admin, B1App |
| `./website` | Page-rendering core shared by the editor और renderer (`Element` + per-type renderers `ElementRegistry`, `StyleHelper`, `DroppableArea`, `DraggableWrapper`, `Theme`, `YoutubeBackground`, `SectionDivider`/`parseDividerConfig` के माध्यम से resolved); site-wide widgets (`AnnouncementBanner`, `Launcher` + उनके `parse*Config` helpers); `Animate`, `ElementBlock`, `NonAuthDonationWrapper`, `SermonElement` केवल public-facing renderer द्वारा उपयोग किए गए | B1Admin (editor), B1App (editor components + renderer) |

B1Transfer और LessonsApp केवल root और `login` entry points का उपयोग करते हैं -- `donations`, `forms`, और `website` subpaths आज exclusively B1Admin और B1App द्वारा उपभोग किए जाते हैं।

## स्थानीय विकास के लिए Setup

यह पैकेज अन्य साझा libraries के साथ [Packages](https://github.com/ChurchApps/Packages) workspace में रहता है:

1. Workspace को क्लोन करें:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Workspace root पर dependencies install करें:

   ```bash
   cd Packages && yarn install
   ```

3. Package directory से Vite playground लॉन्च करें:

   ```bash
   cd apphelper && yarn dev
   ```

   Playground dev server **http://localhost:3001** पर शुरू होता है। पहले `playground/dotenv.sample` को `playground/.env` में कॉपी करें और आवश्यक मानों को fill करें।

Consumption के लिए पैकेज को build करने के लिए (`dist/` में compile करता है और locale/CSS assets को copy करता है), `yarn workspace @churchapps/apphelper build` चलाएं -- या dependency order में प्रत्येक package को build करने के लिए root पर `yarn build` चलाएं। एक consuming app के अंदर एक unpublished build का परीक्षण करने के लिए, एक अस्थायी Yarn portal का उपयोग करें -- [Consuming App के विरुद्ध स्थानीय विकास](./index.md#local-development-against-a-consuming-app) देखें।

:::tip
Playground AppHelper components को develop और test करने का fastest तरीका है। यह Vite dev server को hot-reload करता है इसलिए आप changes को real time में देख सकते हैं।
:::

## प्रकाशन

Releases changesets के माध्यम से जाते हैं: workspace root पर हर change के साथ `yarn changeset` चलाएं, फिर release के लिए तैयार होने पर `yarn publish-all` चलाएं। पूर्ण flow के लिए [साझा libraries अवलोकन](./index.md#releasing-with-changesets) देखें।

:::warning
कभी भी एक export को हटाएं या नाम न बदलें जब तक replacement प्रकाशित न हो जाए और हर consumer को migrate न किया जाए -- removal को merge करने से पहले सभी consuming repos को grep करें।
:::

## संबंधित लेख

- **[Helpers](./helpers)** -- Base utility package जिसका AppHelper के साथ उपयोग किया जाता है
- **[Web Apps](../web-apps/)** -- Web applications जो इस package को उपभोग करते हैं
- **[साझा libraries अवलोकन](./index.md)** -- Workspace setup, release flow, और local-link workflow
