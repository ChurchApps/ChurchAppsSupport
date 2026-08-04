# MinistryStuff (पेड स्टोरेज और टेक्सटिंग)

MinistryStuff.org वह अलग पेड सर्विस है जो उन दो चीज़ों को फंड करती है जिन्हें ChurchApps मुफ़्त में नहीं दे सकता — बल्क फ़ाइल स्टोरेज (1TB+) और SMS क्रेडिट — फ्लैट-रेट मासिक सब्सक्रिप्शन के रूप में। ChurchApps खुद 100% मुफ़्त रहता है; B1 में किसी भी चीज़ के लिए MinistryStuff सब्सक्रिप्शन ज़रूरी नहीं है, और हर इंटीग्रेशन पॉइंट एक प्रोवाइडर सीम है जिसे कोई तीसरा पक्ष भी लागू कर सकता है।

## घटक

| हिस्सा | रेपो | भूमिका |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (dev में पोर्ट 8097) | बिलिंग (Stripe), SMS भेजना + क्रेडिट लेजर (AWS End User Messaging), स्टोरेज (S3 + कोटा अकाउंटिंग)। एकल MySQL DB `ministrystuff`। |
| MinistryStuffWeb | `MinistryStuffWeb/` (dev में पोर्ट 3103) | ministrystuff.org — मार्केटिंग, प्राइसिंग, और अकाउंट पोर्टल (प्लान, उपयोग, Stripe Checkout/Customer Portal रीडायरेक्ट)। |
| Texting प्रोवाइडर | `Packages/texting` → `MinistryStuffProvider` | Clearstream/TextInChurch के साथ `ministrystuff` के रूप में रजिस्टर्ड। |
| Storage सीम | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (डिफ़ॉल्ट, मुफ़्त) मूल S3/disk स्विच को wrap करता है; `FileStorageHelper` बिना बदलाव के डिफ़ॉल्ट प्रोवाइडर को delegate करता है। |
| Api वायरिंग | `Api/` content + messaging मॉड्यूल | `MinistryStuffStorageProvider` + `StorageResolver` (content), `TextingConfigHelper` सर्विस-की injection (messaging), `storageProviders` टेबल, `/content/storage/*` + `/messaging/texting/credits` एंडपॉइंट्स। |

## पहचान और विश्वास

- वही अकाउंट, वही चर्च: MinistryStuffApi शेयर्ड `JWT_SECRET` (sibling-app पैटर्न, जैसे B1Transfer) के साथ ChurchApps JWTs को वेरिफाई करता है। पोर्टल MembershipApi के विरुद्ध लॉग इन करता है और `?jwt=` हैंड-ऑफ स्वीकार करता है।
- सर्वर-टू-सर्वर (core Api → MinistryStuffApi): `X-Service-Key` हेडर (`MINISTRYSTUFF_SERVICE_KEY`, दोनों तरफ) + स्पष्ट `churchId`। Entitlement हमेशा उस चर्च के सब्सक्रिप्शन के विरुद्ध चेक किया जाता है। चर्च कभी भी MinistryStuff क्रेडेंशियल्स नहीं रखते — B1Admin में प्रोवाइडर को चुनना ही काफी है।

## टेक्सटिंग फ़्लो

B1Admin Send Text → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → वर्तमान अवधि के `smsCreditGrants` के विरुद्ध सेगमेंट काउंट डेबिट किया जाता है → AWS End User Messaging (या dev में `smsMode: mock`)। क्रेडिट एक **हार्ड स्टॉप** हैं: समाप्त क्रेडिट पूरी तरह रिजेक्ट कर देते हैं (`insufficient_credits`, B1Admin में एक फ्रेंडली अपग्रेड प्रॉम्प्ट के रूप में दिखाया जाता है) — कभी भी आंशिक भेजना नहीं, कभी ओवरएज बिलिंग नहीं। क्रेडिट ग्रांट्स Stripe `invoice.paid` वेबहुक्स से हर बिलिंग अवधि में idempotent रूप से जारी किए जाते हैं। ऑप्ट-आउट (`smsOptOuts`) हर भेजने से पहले फ़िल्टर किए जाते हैं।

## स्टोरेज फ़्लो

एक चर्च की प्रोवाइडर रो (`content.storageProviders`, B1Admin → Settings → File Storage में मैनेज की गई) यह तय करती है कि **नए** अपलोड कहाँ जाएँ। `contentPath` एक absolute प्रति-फ़ाइल URL है, इसलिए मिश्रित प्रोवाइडर बिना किसी माइग्रेशन के साथ-साथ रह सकते हैं: पुरानी फ़ाइलें `content.churchapps.org` से सर्व होती रहती हैं, नई `content.ministrystuff.org` से। अपलोड Api → `StorageResolver.forChurch` → प्रोवाइडर `store`/`getUploadUrl` (S3 मोड में `content-length-range` के साथ presigned POST; disk/dev मोड में base64 फ़ॉलबैक) के माध्यम से बहते हैं; डिलीट स्टोर की गई URL से route होते हैं (`StorageResolver.forUrl`)। कोटा = प्लान बाइट्स, `storageObjects` (`stored` + `pending` रिज़र्वेशन) से गिना जाता है; कोटा से अधिक होने पर नए अपलोड ब्लॉक होते हैं (`storage_quota_exceeded`) — कुछ भी कभी डिलीट या अतिरिक्त बिल नहीं किया जाता। मुफ़्त ChurchApps टियर अछूता रहता है (पहले जैसी ही सीमाएँ; कोई चर्च-वाइड कोटा नहीं)।

दायरा नोट: प्रोवाइडर सिलेक्शन content **files/resources** फ़्लो को कवर करता है (जहाँ बल्क मीडिया रहता है)। गैलरी/लोगो/फोटो अपलोड डिफ़ॉल्ट प्रोवाइडर पर ही रहते हैं — वे स्टोरेज से keys सूचीबद्ध करते हैं और क्लाइंट-साइड पर URLs बनाते हैं, इसलिए प्रति-चर्च रूटिंग अभी लागू नहीं होती।

## बिलिंग

सब्सक्राइब करने के लिए Stripe Checkout (hosted), कार्ड अपडेट/कैंसिल/इनवॉइस के लिए Stripe Customer Portal — MinistryStuffWeb के पास कोई कार्ड फ़ॉर्म नहीं है। एक `subscriptions` रो प्रति (चर्च, प्रोडक्ट); प्लान/टियर कोड में रहते हैं (`MinistryStuffApi/src/helpers/Plans.ts`) कॉन्फ़िग से Stripe price ids के साथ। वेबहुक (`/billing/webhook`, raw-body signature verification, `webhookEvents` dedup) सब्सक्रिप्शन लाइफ़साइकल को ड्राइव करता है: active → past_due (grace) → canceled।

## Dev सेटअप

MinistryStuffApi चलाएँ (`yarn dev`, 8097; शेयर्ड `JWT_SECRET` + `MINISTRYSTUFF_SERVICE_KEY` के साथ `.env` चाहिए) और वही service key `Api/.env` में सेट करें। `Api/config/dev.json` पहले से `ministryStuffApi` को `localhost:8097` पर पॉइंट करता है। MinistryStuffWeb को `VITE_STAGE=dev` के साथ `.env` चाहिए। Dev `smsMode: mock` और disk storage का उपयोग करता है — कोई AWS ज़रूरी नहीं।
