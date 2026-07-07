---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

`@churchapps/apihelper` पैकेज सभी ChurchApps Express.js APIs के लिए सर्वर-साइड उपयोगिताएं प्रदान करता है। इसमें base controller class, JWT प्रमाणीकरण, डेटाबेस utilities, और AWS integrations शामिल हैं जिनमें हर API प्रोजेक्ट निर्भर करता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- **Node.js** और **Git** इंस्टॉल करें -- देखें [Prerequisites](../setup/prerequisites)
- [Packages workspace](./index.md) सेटअप और release flow से परिचित हों
- यह पैकेज [`@churchapps/helpers`](./helpers) पर निर्भर करता है (peer dependency के रूप में) और इसे re-export करता है

</div>

## क्या शामिल है

- **CustomBaseController** -- API नियंत्रकों के लिए base class, `inversify-express-utils` पर बनाया गया
- **Auth** -- `CustomAuthProvider`, `AuthenticatedUser`, और `Principal` के माध्यम से JWT प्रमाणीकरण
- **डेटाबेस utilities** -- `DB.query` / `DB.queryOne` और MySQL कनेक्शन प्रबंधन के लिए `Pool` class, साथ ही schema setup के लिए `MySqlHelper` और `DBCreator`
- **AWS integrations** -- S3 फाइल स्टोरेज और SSM Parameter Store reads के लिए `AwsHelper`
- **Email** -- SES और SMTP transports को समर्थन करने वाला `EmailHelper`
- **कॉन्फ़िगरेशन loading** -- `EnvironmentBase` environment variables या Parameter Store से कनेक्शन स्ट्रिंग और secrets पढ़ता है
- **Misc** -- `EncryptionHelper`, `FileStorageHelper`, `LoggingHelper`, `BasePermissions`, `SlugHelper`

## स्थानीय विकास के लिए सेटअप

यह पैकेज अन्य साझा libraries के साथ [Packages](https://github.com/ChurchApps/Packages) workspace में रहता है:

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
   yarn workspace @churchapps/apihelper build
   ```

   या dependency order में प्रत्येक package को बिल्ड करने के लिए root पर `yarn build` चलाएं।

उपभोग करने वाले API के अंदर changes का परीक्षण करने के लिए, एक अस्थायी Yarn portal का उपयोग करें -- [Consuming App के विरुद्ध स्थानीय विकास](./index.md#local-development-against-a-consuming-app) देखें।

## प्रकाशन

Releases changesets के माध्यम से जाते हैं: workspace root पर हर change के साथ `yarn changeset` चलाएं, फिर release के लिए तैयार होने पर `yarn publish-all` चलाएं। पूर्ण flow के लिए [साझा libraries अवलोकन](./index.md#releasing-with-changesets) देखें।

:::info
यह पैकेज हर ChurchApps API की निर्भरता है -- core Api, AskApi, और LessonsApi। परिवर्तन करते समय, प्रकाशित करने से पहले स्थानीय रूप से एक API के विरुद्ध परीक्षण करें।
:::

## संबंधित लेख

- **[Helpers](./helpers)** -- base utility package जिस पर यह पैकेज निर्भर करता है
- **[मॉड्यूल संरचना](../api/module-structure)** -- API modules में controllers और auth middleware का उपयोग कैसे होता है
- **[स्थानीय API सेटअप](../api/local-setup)** -- स्थानीय विकास के लिए API सेटअप करना
