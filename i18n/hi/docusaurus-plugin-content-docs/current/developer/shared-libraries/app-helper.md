---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

`@churchapps/apphelper` पैकेज सभी ChurchApps वेब एप्लिकेशनों के लिए साझा React घटक और उपयोगिता प्रदान करता है। यह एक एकल प्रकाशित पैकेज है जो लॉगिन, दान, फॉर्म, मार्कडाउन, और वेबसाइट/CMS कार्यक्षमता के साथ-साथ साझा घटकों और सहायकों के एक मूल सेट के माध्यम से सबपाथ प्रविष्टि बिंदुओं को प्रकट करता है।

</div>

<div class="prereqs">
<h4>शुरुआत से पहले</h4>

- **Node.js** और **Git** स्थापित करें -- [आवश्यकताएं](../setup/prerequisites) देखें
- [पैकेज कार्यक्षेत्र](./index.md) सेटअप और रिलीज प्रवाह के साथ खुद को परिचित करें

</div>

## प्रविष्टि बिंदु

पैकेज अपने `package.json` में सबपाथ निर्यात को परिभाषित करता है, इसलिए प्रत्येक सुविधा मॉड्यूल अपने पर आयात योग्य है:

| प्रविष्टि बिंदु | सामग्री |
|---|---|
| `@churchapps/apphelper` | मूल घटक, सहायक और hooks |
| `@churchapps/apphelper/login` | लॉगिन और पंजीकरण UI |
| `@churchapps/apphelper/donations` | देना और दान घटक |
| `@churchapps/apphelper/forms` | फॉर्म प्रस्तुति घटक |
| `@churchapps/apphelper/markdown` | Markdown और HTML संपादक और प्रस्तुतकर्ता |
| `@churchapps/apphelper/website` | वेबसाइट निर्माता और CMS घटक |

## कौन क्या खपत करता है

एक साझा निर्यात को बदलने से पहले, जांचें कि कौन से ऐप्स इसे आयात करते हैं:

| निर्यात क्षेत्र | यह क्या प्रदान करता है | द्वारा खपत |
|---|---|---|
| रूट -- मूल घटक और hooks | `DisplayBox`, `InputBox`, `Loading`, `PageHeader`, `PersonAvatar`, `SmallButton`, `ErrorMessages`, `ExportLink`, `useMountedState`, साथ ही फिर से निर्यात किए गए `@churchapps/helpers` उपयोगिता (`ApiHelper`, `DateHelper`, `Locale`, `UserHelper`, आदि) | B1Admin, B1App, B1Transfer, LessonsApp |
| रूट -- साइट Chrome | `SiteHeader` (nav, उपयोगकर्ता मेनू, सूचनाएं) | B1Admin, B1Transfer, LessonsApp |
| रूट -- प्रशासक सामग्री संपादक | `ImageEditor`, `HelpIcon` | B1Admin |
| रूट -- रीयलटाइम प्लंबिंग | `SocketHelper`, `SubscriptionManager`, `NotificationService` | B1Admin, B1App |
| रूट -- चैट/उपस्थिति स्टोर | `ConversationStore`, `PresenceStore` | B1App |
| रूट -- नोट्स और मेसेजिंग UI | `Notes` (लोगों/कार्यों पर कर्मचारी नोट्स); `AddNote`, `SubscriptionToggle` (सदस्य मेसेजिंग) | B1Admin (`Notes`), B1App (`AddNote`, `SubscriptionToggle`) |
| रूट -- Lessons-विशिष्ट | `AnalyticsHelper`, `FloatingSupport`, `SupportModal` | LessonsApp |
| `./login` | `LoginPage`, `LogoutPage` | B1Admin, B1App, B1Transfer, LessonsApp |
| `./markdown` | `MarkdownEditor`, `MarkdownPreviewLight` (साझा); `MarkdownPreview`, `HtmlEditor` (प्रशासक सामग्री संपादन) | B1Admin, B1App, LessonsApp |
| `./donations` | `MultiGatewayDonationForm`, `RecurringDonations`, `PaymentMethods`, `StripePaymentMethod`, `DonationHelper`/`getPaymentProvider` (साझा); `FundDonations` (केवल प्रशासक) | B1Admin, B1App |
| `./forms` | `FormSubmissionEdit` (जब फॉर्म की `displayMode` `conversational` हो तो `ConversationalForm` को प्रस्तुत करता है) | B1Admin, B1App |
| `./website` | पृष्ठ-प्रस्तुति मूल जो संपादक और प्रस्तुतकर्ता द्वारा साझा किए जाते हैं (`Element` + प्रति-प्रकार प्रस्तुतकर्ता `ElementRegistry`, `StyleHelper`, `DroppableArea`, `DraggableWrapper`, `Theme`, `YoutubeBackground`, `SectionDivider`/`parseDividerConfig`); साइट-व्यापी विजेट (`AnnouncementBanner`, `Launcher` + उनके `parse*Config` सहायक); `Animate`, `ElementBlock`, `NonAuthDonationWrapper`, `SermonElement` केवल सार्वजनिक-सामना करने वाले प्रस्तुतकर्ता द्वारा उपयोग किए जाते हैं | B1Admin (संपादक), B1App (संपादक घटक + प्रस्तुतकर्ता) |

B1Transfer और LessonsApp केवल रूट और `login` प्रविष्टि बिंदुओं का उपयोग करते हैं -- `donations`, `forms` और `website` सबपाथ आज विशेष रूप से B1Admin और B1App द्वारा खपत किए जाते हैं।

## स्थानीय विकास के लिए सेटअप

यह पैकेज [पैकेज](https://github.com/ChurchApps/Packages) कार्यक्षेत्र में अन्य साझा पुस्तकालयों के साथ रहता है:

1. कार्यक्षेत्र को क्लोन करें:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. कार्यक्षेत्र रूट पर निर्भरता स्थापित करें:

   ```bash
   cd Packages && yarn install
   ```

3. पैकेज निर्देशिका से Vite playground को लॉन्च करें:

   ```bash
   cd apphelper && yarn dev
   ```

   Vite dev सर्वर `http://localhost:3001` पर शुरू होता है। पहले `playground/dotenv.sample` को `playground/.env` में कॉपी करें और आवश्यक मान भरें।

खपत के लिए पैकेज बनाने के लिए (dist/ में संकलित करता है और locale/CSS संपत्ति की प्रतिलिपि बनाता है), `yarn workspace @churchapps/apphelper build` चलाएं -- या root से `yarn build` चलाएं निर्भरता क्रम में हर पैकेज को बनाने के लिए। एक खपत करने वाले ऐप के अंदर एक अप्रकाशित निर्माण परीक्षण करने के लिए, एक अस्थायी Yarn पोर्टल का उपयोग करें -- [स्थानीय विकास एक खपत करने वाले ऐप के विरुद्ध](./index.md#local-development-against-a-consuming-app) देखें।

:::tip
AppHelper घटकों को विकसित और परीक्षण करने के लिए Playground सबसे तेज़ तरीका है। यह Vite dev सर्वर को गर्म-पुनः लोड करता है ताकि आप रीयल-टाइम में परिवर्तन देख सकें।
:::

## प्रकाशन

रिलीज़ changesets के माध्यम से जाते हैं: `yarn changeset` को कार्यक्षेत्र रूट पर हर परिवर्तन के साथ चलाएं, फिर `yarn publish-all` जब रिलीज़ के लिए तैयार हों। पूरा प्रवाह के लिए [साझा पुस्तकालय अवलोकन](./index.md#releasing-with-changesets) देखें।

:::warning
कोई निर्यात को हटाएं या नाम न दें जब तक प्रतिस्थापन प्रकाशित न हो जाए और हर खपत करने वाले को माइग्रेट न किया जाए -- एक हटाने को मर्ज करने से पहले सभी खपत करने वाले रिपॉजिटरी को grep करें।
:::

## संबंधित लेख

- **[सहायक](./helpers)** -- AppHelper के साथ उपयोग की जाने वाली आधार उपयोगिता पैकेज
- **[वेब ऐप्स](../web-apps/)** -- इस पैकेज को खपत करने वाले वेब एप्लिकेशन
- **[साझा पुस्तकालय अवलोकन](./index.md)** -- कार्यक्षेत्र सेटअप, रिलीज़ प्रवाह और स्थानीय-लिंक कार्यप्रवाह
