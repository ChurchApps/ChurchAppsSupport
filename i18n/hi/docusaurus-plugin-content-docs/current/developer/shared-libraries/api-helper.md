---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

`@churchapps/apihelper` पैकेज सभी ChurchApps Express.js APIs के लिए सर्वर-साइड उपयोगिताएँ प्रदान करता है। इसमें बेस कंट्रोलर क्लास, JWT प्रमाणीकरण, डेटाबेस उपयोगिताएँ और AWS एकीकरण शामिल हैं, जिन पर हर API प्रोजेक्ट निर्भर करता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- **Node.js** और **Git** इंस्टॉल करें -- देखें [Prerequisites](../setup/prerequisites)
- [Packages वर्कस्पेस](./index.md) सेटअप और रिलीज़ फ़्लो से परिचित हो जाएँ
- यह पैकेज [`@churchapps/helpers`](./helpers) पर निर्भर करता है (peer dependency के रूप में) और उसे री-एक्सपोर्ट करता है

</div>

## इसमें क्या शामिल है

- **CustomBaseController** -- API कंट्रोलर के लिए बेस क्लास, जो `inversify-express-utils` पर आधारित है
- **Auth** -- `CustomAuthProvider`, `AuthenticatedUser`, और `Principal` के माध्यम से JWT प्रमाणीकरण
- **डेटाबेस उपयोगिताएँ** -- MySQL कनेक्शन प्रबंधन के लिए `DB.query` / `DB.queryOne` और `Pool` क्लास, साथ ही स्कीमा सेटअप के लिए `MySqlHelper` और `DBCreator`
- **AWS एकीकरण** -- S3 फ़ाइल स्टोरेज और SSM Parameter Store से पढ़ने के लिए `AwsHelper`
- **ईमेल** -- SES और SMTP ट्रांसपोर्ट को सपोर्ट करने वाला `EmailHelper`
- **कॉन्फ़िग लोडिंग** -- `EnvironmentBase` कनेक्शन स्ट्रिंग और सीक्रेट्स को एनवायरनमेंट वेरिएबल या Parameter Store से पढ़ता है
- **विविध** -- `EncryptionHelper`, `FileStorageHelper`, `LoggingHelper`, `BasePermissions`, `SlugHelper`

## लोकल डेवलपमेंट के लिए सेटअप

यह पैकेज [Packages](https://github.com/ChurchApps/Packages) वर्कस्पेस में है, जहाँ अन्य साझा लाइब्रेरियाँ भी हैं:

1. वर्कस्पेस क्लोन करें:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. वर्कस्पेस रूट पर डिपेंडेंसी इंस्टॉल करें:

   ```bash
   cd Packages && yarn install
   ```

3. बिल्ड करें (TypeScript को `dist/` में कंपाइल करता है):

   ```bash
   yarn workspace @churchapps/apihelper build
   ```

   या डिपेंडेंसी क्रम में हर पैकेज बिल्ड करने के लिए रूट पर `yarn build` चलाएँ।

किसी उपभोक्ता API में बदलावों का परीक्षण करने के लिए, एक अस्थायी Yarn portal का उपयोग करें -- देखें [उपभोक्ता ऐप के विरुद्ध लोकल डेवलपमेंट](./index.md#local-development-against-a-consuming-app)।

## प्रकाशन

रिलीज़ changesets के माध्यम से होती हैं: हर बदलाव के साथ वर्कस्पेस रूट पर `yarn changeset` चलाएँ, फिर रिलीज़ के लिए तैयार होने पर `yarn publish-all` चलाएँ। पूरे फ़्लो के लिए [साझा लाइब्रेरियों का अवलोकन](./index.md#releasing-with-changesets) देखें।

:::info
यह पैकेज हर ChurchApps API की डिपेंडेंसी है -- मुख्य Api, AskApi, और LessonsApi। बदलाव करते समय, प्रकाशित करने से पहले किसी API के विरुद्ध लोकल रूप से परीक्षण करें।
:::

## संबंधित लेख

- **[Helpers](./helpers)** -- बेस उपयोगिता पैकेज, जिस पर यह पैकेज निर्भर करता है
- **[Module Structure](../api/module-structure)** -- API मॉड्यूल में कंट्रोलर और auth middleware कैसे उपयोग होते हैं
- **[Local API Setup](../api/local-setup)** -- लोकल डेवलपमेंट के लिए API सेटअप करना
