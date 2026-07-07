---
title: "Helpers"
---

# Helpers

<div class="article-intro">

`@churchapps/helpers` पैकेज आधार utilities प्रदान करता है जो सभी ChurchApps projects, frontend और backend दोनों द्वारा उपयोग की जाती हैं। यह framework-agnostic है और `DateHelper`, `ApiHelper`, `CurrencyHelper` जैसे सामान्य helpers के साथ-साथ shared TypeScript interfaces को शामिल करता है जो apps और APIs के बीच data contract बनाते हैं।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- **Node.js** और **Git** इंस्टॉल करें -- देखें [Prerequisites](../setup/prerequisites)
- [Packages workspace](./index.md) setup और release flow से परिचित हों

</div>

## कौन इसे उपभोग करता है

हर ChurchApps API (core Api, AskApi, और LessonsApi) और हर web frontend (B1Admin, B1App, B1Transfer, LessonsApp) इस package पर directly निर्भर करते हैं। Frontends इसके कई exports (`ApiHelper`, `DateHelper`, `UserHelper`, और अन्य interfaces) को [`@churchapps/apphelper`](./app-helper) के माध्यम से re-export किए गए के रूप में भी प्राप्त करते हैं। अन्य shared packages इसे peer dependency के रूप में declare करते हैं ताकि प्रत्येक app बिल्कुल एक copy को resolve करे।

## स्थानीय विकास के लिए Setup

यह package अन्य shared libraries के साथ [Packages](https://github.com/ChurchApps/Packages) workspace में रहता है:

1. Workspace को क्लोन करें:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Workspace root पर dependencies install करें:

   ```bash
   cd Packages && yarn install
   ```

3. बिल्ड करें (TypeScript को `dist/` में compile करता है):

   ```bash
   yarn workspace @churchapps/helpers build
   ```

   या dependency order में प्रत्येक package को build करने के लिए root पर `yarn build` चलाएं।

उपभोग करने वाली project में changes का परीक्षण करने के लिए, एक अस्थायी Yarn portal का उपयोग करें -- [Consuming App के विरुद्ध स्थानीय विकास](./index.md#local-development-against-a-consuming-app) देखें।

## प्रकाशन

Releases changesets के माध्यम से जाते हैं manual version bumps के बजाय:

1. Workspace root पर `yarn changeset` चलाएं और appropriate bump type के साथ `@churchapps/helpers` चुनें; generated changeset file को अपने change के साथ commit करें।
2. Release के लिए तैयार होने पर, root पर `yarn publish-all` चलाएं -- यह versions को bump करता है, CHANGELOGs लिखता है, dependency order में build करता है, और npm पर publish करता है।

नए shared interfaces `helpers/src/interfaces/` में जाते हैं और package barrel के माध्यम से re-exported होते हैं। Website builder का element-type catalog (`ElementTypes.ts` — 35 types उनके answers schemas के साथ) भी यहां रहता है; यह apphelper renderers, B1Admin editor forms, और AI generation prompts द्वारा साझा किया गया contract है (देखें [Website Builder Architecture](../architecture/website-builder))।

:::warning
चूँकि यह package प्रत्येक ChurchApps project द्वारा उपयोग किया जाता है, यहां के changes का व्यापक प्रभाव होता है। `helpers` का एक release स्वचालित रूप से `apihelper` और `apphelper` को bump करता है ताकि उनके dependency ranges current रहें। Publishing से पहले कम से कम एक consuming API और एक consuming web app में Yarn portal के साथ परीक्षण करें।
:::

## संबंधित लेख

- **[ApiHelper](./api-helper)** -- Server-side utilities जो इस package पर निर्भर करती हैं
- **[AppHelper](./app-helper)** -- React components जो इस package पर निर्भर करते हैं
- **[साझा लाइब्रेरीज़ अवलोकन](./index.md)** -- Workspace setup, release flow, और local-link workflow
