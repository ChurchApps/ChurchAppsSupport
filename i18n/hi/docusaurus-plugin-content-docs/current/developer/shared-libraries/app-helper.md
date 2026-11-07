---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

`@churchapps/apphelper` पैकेज सभी ChurchApps वेब एप्लिकेशन के लिए साझा React कंपोनेंट और utilities प्रदान करता है। यह एक ही प्रकाशित पैकेज है, जो subpath entry points के ज़रिए फ़ीचर मॉड्यूल उपलब्ध कराता है: लॉगिन, दान, फ़ॉर्म, markdown, और वेबसाइट/CMS कार्यक्षमता। इसके साथ इसमें साझा कोर कंपोनेंट और helpers का एक मूल सेट भी शामिल है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- **Node.js** और **Git** इंस्टॉल करें -- देखें [पूर्वापेक्षाएँ](../setup/prerequisites)
- [Packages वर्कस्पेस](./index.md) सेटअप और release flow से परिचित हो जाएँ

</div>

## प्रवेश बिंदु (Entry Points)

पैकेज अपनी `package.json` में subpath exports परिभाषित करता है, इसलिए हर फ़ीचर मॉड्यूल अलग से इम्पोर्ट किया जा सकता है:

| प्रवेश बिंदु | सामग्री |
|-------------|----------|
| `@churchapps/apphelper` | कोर कंपोनेंट, helpers, और hooks |
| `@churchapps/apphelper/login` | लॉगिन और पंजीकरण UI |
| `@churchapps/apphelper/donations` | दान और donation कंपोनेंट |
| `@churchapps/apphelper/forms` | फ़ॉर्म सबमिशन कंपोनेंट |
| `@churchapps/apphelper/markdown` | Markdown और HTML editors व renderers |
| `@churchapps/apphelper/website` | वेबसाइट बिल्डर और CMS कंपोनेंट |

## कौन क्या उपयोग करता है

किसी साझा export को बदलने से पहले जाँच लें कि कौन-से ऐप उसे इम्पोर्ट करते हैं:

| Export क्षेत्र | यह क्या प्रदान करता है | उपयोग करने वाले ऐप |
|---|---|---|
| Root -- कोर कंपोनेंट और hooks | `DisplayBox`, `InputBox`, `Loading`, `PageHeader`, `PersonAvatar`, `SmallButton`, `ErrorMessages`, `ExportLink`, `useMountedState`, साथ ही पुनः export किए गए `@churchapps/helpers` utilities (`ApiHelper`, `DateHelper`, `Locale`, `UserHelper`, आदि) | B1Admin, B1App, B1Transfer, LessonsApp |
| Root -- साइट chrome | `SiteHeader` (नेविगेशन, उपयोगकर्ता मेनू, सूचनाएँ) | B1Admin, B1Transfer, LessonsApp |
| Root -- एडमिन कंटेंट editors | `ImageEditor`, `HelpIcon` | B1Admin |
| Root -- realtime plumbing | `SocketHelper`, `SubscriptionManager`, `NotificationService` | B1Admin, B1App |
| Root -- chat/presence stores | `ConversationStore`, `PresenceStore` | B1App |
| Root -- नोट्स और messaging UI | `Notes` (लोगों/कार्यों पर स्टाफ़ नोट्स); `AddNote`, `SubscriptionToggle` (सदस्य messaging) | B1Admin (`Notes`), B1App (`AddNote`, `SubscriptionToggle`) |
| Root -- Lessons-विशिष्ट | `AnalyticsHelper`, `FloatingSupport`, `SupportModal` | LessonsApp |
| `./login` | `LoginPage`, `LogoutPage` | B1Admin, B1App, B1Transfer, LessonsApp |
| `./markdown` | `MarkdownEditor`, `MarkdownPreviewLight` (साझा); `MarkdownPreview`, `HtmlEditor` (एडमिन कंटेंट संपादन) | B1Admin, B1App, LessonsApp |
| `./donations` | `MultiGatewayDonationForm`, `RecurringDonations`, `PaymentMethods`, `StripePaymentMethod`, `DonationHelper`/`getPaymentProvider` (साझा); `FundDonations` (केवल एडमिन) | B1Admin, B1App |
| `./forms` | `FormSubmissionEdit` (जब फ़ॉर्म का `displayMode` `conversational` हो, तब `ConversationalForm` रेंडर करता है) | B1Admin, B1App |
| `./website` | संपादक और renderer दोनों द्वारा साझा पेज-रेंडरिंग कोर (`Element` और `ElementRegistry` के ज़रिए हल होने वाले प्रकार-अनुसार renderers, `StyleHelper`, `DroppableArea`, `DraggableWrapper`, `Theme`, `YoutubeBackground`, `SectionDivider`/`parseDividerConfig`); साइट-व्यापी विजेट (`AnnouncementBanner`, `Launcher` और उनके `parse*Config` helpers); `Animate`, `ElementBlock`, `NonAuthDonationWrapper`, `SermonElement` केवल सार्वजनिक renderer द्वारा उपयोग किए जाते हैं | B1Admin (संपादक), B1App (संपादक कंपोनेंट + renderer) |

B1Transfer और LessonsApp केवल root और `login` entry points का उपयोग करते हैं -- `donations`, `forms`, और `website` subpaths आज केवल B1Admin और B1App द्वारा उपयोग किए जाते हैं।

## स्थानीय विकास के लिए सेटअप

यह पैकेज [Packages](https://github.com/ChurchApps/Packages) वर्कस्पेस में अन्य साझा लाइब्रेरी के साथ रहता है:

1. वर्कस्पेस क्लोन करें:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. वर्कस्पेस root पर डिपेंडेंसी इंस्टॉल करें:

   ```bash
   cd Packages && yarn install
   ```

3. पैकेज डायरेक्टरी से Vite playground लॉन्च करें:

   ```bash
   cd apphelper && yarn dev
   ```

   Playground dev server `http://localhost:3001` पर शुरू होता है। पहले `playground/dotenv.sample` को `playground/.env` में कॉपी करें और आवश्यक मान भरें।

उपभोग के लिए पैकेज बनाने हेतु (जो `dist/` में compile करता है और locale/CSS assets कॉपी करता है), `yarn workspace @churchapps/apphelper build` चलाएँ -- या निर्भरता-क्रम में हर पैकेज बनाने के लिए root पर `yarn build`। किसी उपभोक्ता ऐप के अंदर बिना प्रकाशित build का परीक्षण करने के लिए अस्थायी Yarn portal का उपयोग करें -- देखें [उपभोक्ता ऐप के विरुद्ध स्थानीय विकास](./index.md#local-development-against-a-consuming-app)।

:::tip
AppHelper कंपोनेंट विकसित और परीक्षण करने का सबसे तेज़ तरीका playground है। यह Vite dev server को hot-reload करता है, ताकि आप बदलाव तुरंत देख सकें।
:::

## प्रकाशन

Releases changesets के ज़रिए होते हैं: हर बदलाव के साथ workspace root पर `yarn changeset` चलाएँ, फिर तैयार होने पर `yarn publish-all` चलाएँ। पूरे flow के लिए देखें [साझा लाइब्रेरी अवलोकन](./index.md#releasing-with-changesets)।

:::warning
जब तक प्रतिस्थापन प्रकाशित न हो जाए और हर उपभोक्ता माइग्रेट न हो जाए, तब तक कोई export न हटाएँ या उसका नाम न बदलें -- हटाने को merge करने से पहले सभी उपभोक्ता repos में grep ज़रूर करें।
:::

## संबंधित लेख

- **[Helpers](./helpers)** -- AppHelper के साथ उपयोग होने वाला आधार utility पैकेज
- **[वेब ऐप्स](../web-apps/)** -- वे वेब एप्लिकेशन जो इस पैकेज का उपयोग करते हैं
- **[साझा लाइब्रेरी अवलोकन](./index.md)** -- वर्कस्पेस सेटअप, release flow, और local-link workflow
