---
title: "साझा लाइब्रेरीज़"
---

# साझा लाइब्रेरीज़

<div class="article-intro">

ChurchApps का साझा कोड npm पर `@churchapps/*` scope के अंतर्गत प्रकाशित किया जाता है। सभी साझा packages एक एकल repository -- [Packages](https://github.com/ChurchApps/Packages) -- में रहते हैं, जिसे Yarn (Berry) workspace के रूप में प्रबंधित किया जाता है और [changesets](https://github.com/changesets/changesets) के साथ versioned किया जाता है।

</div>

## पैकेज

| पैकेज | विवरण | उपयोग किए गए |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | Foundation layer: framework-free helper functions और shared TypeScript interfaces जो cross-app data contract बनाते हैं | सभी projects |
| [`@churchapps/apihelper`](./api-helper) | Server-side Express utilities: auth, base controllers, database access, AWS और email integrations | सभी APIs |
| [`@churchapps/apphelper`](./app-helper) | साझा React components और feature modules (login, donations, forms, markdown, website) | सभी web apps |
| `@churchapps/content-providers` | तीसरे पक्ष के content providers का abstraction (Lessons.church, Planning Center, Dropbox, और अन्य) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | B1.church integrations बनाने के लिए toolkit: webhook verification, typed REST client, OAuth helpers | बाहरी integration developers |
| `@churchapps/texting` | SMS provider abstraction (Text In Church, Clearstream, Mutual Ministry) | Api |

Dependency direction strictly downward है: apps `apihelper` और `apphelper` पर निर्भर करते हैं, जो **peer dependency** के रूप में `@churchapps/helpers` को declare करते हैं ताकि प्रत्येक app बिल्कुल एक copy को resolve करे।

## Workspace Setup

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

Repo Yarn Berry का उपयोग करता है (root `packageManager` field authoritative है) एक एकल lockfile के साथ। `yarn build` dependency order में प्रत्येक package को build करता है; `yarn test` सभी package tests चलाता है।

## Changesets के साथ प्रकाशन

हर package change एक changeset के साथ ships:

1. Workspace root पर `yarn changeset` चलाएं। Package(s) चुनें जिन्हें आपने छुआ है, bump type (patch = fix, minor = new export या feature, major = breaking), और एक-पंक्ति सारांश लिखें -- यह CHANGELOG entry बन जाता है।
2. Generated `.changeset/*.md` file को अपने code change के साथ commit करें। एक pre-commit hook उन commits को ब्लॉक करता है जो एक package के source को बदलते हैं बिना staged changeset के।
3. Publish के लिए तैयार होने पर, root पर `yarn publish-all` चलाएं। यह pending changesets को consume करता है (versions को bump करते हुए, CHANGELOGs लिखते हुए, internal dependency ranges को sync करते हुए), dependency order में सब कुछ को build करता है, और bumped packages को npm पर publish करता है। फिर version bumps को commit और push करें।

:::warning
कभी भी एक single package के अंदर raw `npm publish` न चलाएं -- यह build ordering को skip करता है और version bookkeeping को जो release script handle करता है। Publishing के लिए `@churchapps` scope पर publish rights के साथ एक npm account की आवश्यकता है।
:::

## एक Consuming App के विरुद्ध स्थानीय विकास

Workspace के अंदर, packages directly अपने siblings के विरुद्ध build करते हैं -- कोई linking की आवश्यकता नहीं है। एक unpublished package build को consuming app (B1Admin, B1App, आदि) के अंदर परीक्षण करने के लिए, consumer में एक अस्थायी Yarn portal जोड़ें:

```bash
# consuming project में
yarn link ../Packages/helpers
# ... परीक्षण ...
yarn unlink ../Packages/helpers && yarn install
```

पहले package को build करें (`yarn build` workspace root पर) -- consumer compiled `dist/` output को पढ़ता है, source को नहीं।

:::warning
`yarn link` consumer के `package.json` में एक portal resolution लिखता है। इसे कभी भी commit न करें -- जब done हो तो हमेशा `yarn unlink` करें और reinstall करें।
:::
