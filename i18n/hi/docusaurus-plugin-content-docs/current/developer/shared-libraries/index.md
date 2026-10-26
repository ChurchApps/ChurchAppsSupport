---
title: "साझा लाइब्रेरी"
---

# साझा लाइब्रेरी

<div class="article-intro">

ChurchApps का साझा कोड `@churchapps/*` स्कोप के अंतर्गत npm पर प्रकाशित होता है। सभी साझा पैकेज एक ही रिपॉज़िटरी में रहते हैं -- [Packages](https://github.com/ChurchApps/Packages) -- जो एक Yarn (Berry) workspace के रूप में प्रबंधित होती है और [changesets](https://github.com/changesets/changesets) से संस्करणित की जाती है।

</div>

## पैकेज

| पैकेज | विवरण | उपयोग करने वाले |
|---------|-------------|-----------------|
| [`@churchapps/helpers`](./helpers) | आधार परत: फ़्रेमवर्क-मुक्त हेल्पर फ़ंक्शन और साझा TypeScript इंटरफ़ेस जो ऐप्स के बीच डेटा अनुबंध बनाते हैं | सभी प्रोजेक्ट |
| [`@churchapps/apihelper`](./api-helper) | सर्वर-साइड Express उपयोगिताएँ: auth, बेस कंट्रोलर, डेटाबेस एक्सेस, AWS और ईमेल एकीकरण | सभी APIs |
| [`@churchapps/apphelper`](./app-helper) | साझा React कंपोनेंट और फ़ीचर मॉड्यूल (लॉगिन, दान, फ़ॉर्म, markdown, वेबसाइट) | सभी वेब ऐप्स |
| `@churchapps/content-providers` | तृतीय-पक्ष कंटेंट प्रदाताओं (Lessons.church, Planning Center, Dropbox, और अन्य) के लिए एब्स्ट्रैक्शन | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | B1.church एकीकरण बनाने के लिए टूलकिट: webhook सत्यापन, टाइप्ड REST क्लाइंट, OAuth हेल्पर | बाहरी एकीकरण डेवलपर |
| `@churchapps/texting` | SMS प्रदाता एब्स्ट्रैक्शन (Text In Church, Clearstream, Mutual Ministry, MinistryStuff, Nalo Solutions, Twilio) | Api |

निर्भरता की दिशा सख़्ती से नीचे की ओर है: ऐप्स `apihelper` और `apphelper` पर निर्भर करते हैं, और ये दोनों `@churchapps/helpers` को **peer dependency** के रूप में घोषित करते हैं ताकि हर ऐप ठीक एक प्रति को हल करे।

## Workspace सेटअप

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

रिपॉज़िटरी Yarn Berry का उपयोग करती है (रूट `packageManager` फ़ील्ड अधिकृत है) और एक ही lockfile रखती है। `yarn build` निर्भरता क्रम में हर पैकेज बनाता है; `yarn test` सभी पैकेज परीक्षण चलाता है।

## Changesets से रिलीज़ करना

पैकेज में हर बदलाव एक changeset के साथ जाता है:

1. workspace रूट पर `yarn changeset` चलाएँ। जो पैकेज आपने छुए हैं उन्हें चुनें, बंप प्रकार चुनें (patch = fix, minor = नया export या फ़ीचर, major = breaking), और एक पंक्ति का सारांश लिखें -- यही CHANGELOG प्रविष्टि बनता है।
2. उत्पन्न `.changeset/*.md` फ़ाइल को अपने कोड बदलाव के साथ commit करें। एक pre-commit hook उन commits को रोकता है जो बिना staged changeset के किसी पैकेज का सोर्स बदलते हैं।
3. प्रकाशित करने के लिए तैयार होने पर रूट पर `yarn publish-all` चलाएँ। यह लंबित changesets को खपाता है (संस्करण बढ़ाना, CHANGELOG लिखना, आंतरिक निर्भरता रेंज सिंक करना), निर्भरता क्रम में सब कुछ बनाता है, और बढ़े हुए पैकेज npm पर प्रकाशित करता है। फिर संस्करण बढ़ोतरी commit और push करें।

:::warning
किसी एक पैकेज के अंदर कच्चा `npm publish` कभी न चलाएँ -- यह build क्रम और उन संस्करण बहीखातों को छोड़ देता है जिन्हें रिलीज़ स्क्रिप्ट संभालती है। प्रकाशन के लिए `@churchapps` स्कोप पर प्रकाशन अधिकार वाला npm खाता चाहिए।
:::

## उपभोक्ता ऐप के विरुद्ध स्थानीय विकास

workspace के भीतर पैकेज अपने सहोदरों के विरुद्ध सीधे बनते हैं -- किसी linking की आवश्यकता नहीं। किसी अप्रकाशित पैकेज build का परीक्षण उपभोक्ता ऐप (B1Admin, B1App, आदि) के अंदर करने के लिए, उपभोक्ता में एक अस्थायी Yarn portal जोड़ें:

```bash
# in the consuming project
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

पहले पैकेज बनाएँ (workspace रूट पर `yarn build`) -- उपभोक्ता सोर्स के बजाय संकलित `dist/` आउटपुट पढ़ता है।

:::warning
`yarn link` उपभोक्ता के `package.json` में एक portal resolution लिखता है। इसे कभी commit न करें -- काम खत्म होने पर हमेशा `yarn unlink` करें और फिर reinstall करें।
:::
