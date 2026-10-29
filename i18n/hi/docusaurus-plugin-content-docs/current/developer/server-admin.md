---
title: "सर्वर एडमिनिस्ट्रेशन"
---

# सर्वर एडमिनिस्ट्रेशन

<div class="article-intro">

ChurchApps में सर्वर एडमिनिस्ट्रेशन की सुविधाएँ केवल **Server.Admin** अनुमति वाले उपयोगकर्ताओं को उपलब्ध हैं। इन उपकरणों का उपयोग सिस्टम में सभी चर्चों के लिए प्लेटफ़ॉर्म संचालन, सहायता और समस्या निवारण में होता है।

</div>

:::warning सीमित पहुँच
इस पृष्ठ पर वर्णित सुविधाओं के लिए **Server.Admin** अनुमति आवश्यक है और ये नियमित चर्च एडमिनिस्ट्रेटरों को उपलब्ध नहीं हैं। ये केवल प्लेटफ़ॉर्म ऑपरेटरों और सहायता स्टाफ़ के लिए हैं।
:::

## Server Admin तक पहुँचना

Server.Admin अनुमति वाले उपयोगकर्ता B1 Admin से सर्वर एडमिन पैनल तक पहुँच सकते हैं:

1. [admin.b1.church](https://admin.b1.church) पर लॉग इन करें
2. [Jump menu](../b1-admin/introduction.md#getting-around-with-the-jump-menu) खोलें, **Settings** का विस्तार करें, और **Server Admin** पर क्लिक करें। (आप सीधे `admin.b1.church/admin` पर भी जा सकते हैं।)
3. Server Admin पैनल बाईं ओर तीन समूहों में अपने अनुभाग सूचीबद्ध करता है: **Directory** (Churches, Users, Impersonate User), **Operations** (Background Jobs, Commons, Usage Trends), और **System** (Translation Lookups, Server Health, Database Migrations)

## Two-Factor Sign-In रीसेट करना

यदि किसी उपयोगकर्ता ने [दो-चरणीय साइन-इन](../b1-admin/profile/managing-profile.md#two-factor-sign-in) चालू किया है और उसका फ़ोन और बैकअप कोड दोनों खो गए हैं, तो एक सर्वर एडमिन उसे बंद कर सकता है:

1. Server Admin पैनल का **Users** अनुभाग खोलें और उपयोगकर्ता को खोजें।
2. दो-चरणीय साइन-इन वाले उपयोगकर्ताओं पर **Two-factor on** बैज दिखता है। उसके बगल में **Reset 2FA** पर क्लिक करें।
3. प्रॉम्प्ट की पुष्टि करें। ऐसा केवल यह पुष्टि करने के बाद करें कि आप किससे बात कर रहे हैं।

इसके बाद उपयोगकर्ता केवल अपने पासवर्ड से लॉग इन कर सकता है और अपनी प्रोफ़ाइल से दो-चरणीय साइन-इन फिर से सेट कर सकता है। रीसेट `mfa_reset` के रूप में ऑडिट लॉग में दर्ज होते हैं। endpoint है `POST /membership/users/mfa/reset/:userId`, जिसके लिए Server.Admin आवश्यक है।

## User Impersonation

impersonation सुविधा सर्वर एडमिनों को सहायता और समस्या निवारण के उद्देश्य से किसी दूसरे उपयोगकर्ता के रूप में लॉग इन करने देती है। यह तब उपयोगी है जब उपयोगकर्ता द्वारा रिपोर्ट की गई समस्याओं की जाँच की जा रही हो या चर्चों को उनका सिस्टम कॉन्फ़िगर करने में मदद की जा रही हो।

### उपयोगकर्ता का प्रतिरूपण कैसे करें

1. Server Admin पैनल का **Impersonate User** अनुभाग खोलें
2. खोज फ़ील्ड में उपयोगकर्ता का नाम या ईमेल पता दर्ज करें
3. **Search** पर क्लिक करें या Enter दबाएँ
4. खोज परिणामों से वह उपयोगकर्ता चुनें जिसका आप प्रतिरूपण करना चाहते हैं
5. दिखने वाले डायलॉग में प्रतिरूपण की पुष्टि करें
6. आप उस उपयोगकर्ता के रूप में लॉग इन हो जाएँगे और उनके खाते पर पुनर्निर्देशित होंगे

### महत्वपूर्ण नोट्स

- प्रतिरूपण लक्ष्य उपयोगकर्ता की अनुमतियों और चर्च पहुँच के साथ एक नया सत्र बनाता है
- किसी दूसरे उपयोगकर्ता का प्रतिरूपण करने पर आपका मूल एडमिन सत्र समाप्त हो जाता है
- प्रतिरूपित अवस्था में किए गए सभी कार्य ऑडिट ट्रेल में दर्ज होते हैं
- अपने एडमिन खाते पर लौटने के लिए, लॉग आउट करें और अपनी क्रेडेंशियल से फिर लॉग इन करें
- प्रतिरूपण का उपयोग केवल सहायता के लिए आवश्यक होने पर करें, और उपयोगकर्ताओं के खातों तक सहायता के लिए पहुँचते समय हमेशा उन्हें सूचित करें

### API Endpoint

प्रतिरूपण सुविधा Membership API में `/users/:userId/impersonate` endpoint द्वारा समर्थित है। तकनीकी विवरण के लिए [Membership Endpoints](/docs/developer/api/endpoints/membership#users) देखें।

### सुरक्षा संबंधी विचार

- प्रतिरूपण के लिए Server.Admin अनुमति आवश्यक है -- यह अनुमति कम से कम और केवल भरोसेमंद प्लेटफ़ॉर्म ऑपरेटरों को दी जानी चाहिए
- सभी प्रतिरूपण इवेंट एडमिन उपयोगकर्ता ID और लक्ष्य उपयोगकर्ता ID के साथ लॉग होते हैं
- प्रतिरूपण होने पर चर्चों को सूचित नहीं किया जाता, इसलिए इस सुविधा के कब और कैसे उपयोग के लिए स्पष्ट नीतियाँ बनाएँ
- जवाबदेही के लिए अपनी सहायता टिकट प्रणाली में प्रतिरूपण इवेंट दर्ज करने पर विचार करें

## Commons Moderation

Commons उपयोगकर्ता द्वारा सबमिट की गई सामग्री के लिए साझा moderation queue है, जो सभी उत्पादों में चलती है -- WorshipCommons गीत, Lessons.church पाठ, FreeShow templates, और B1 वेबसाइट builder templates सभी प्रति-उत्पाद अलग review टूल के बजाय एक ही queue से गुज़रते हैं।

### Commons तक पहुँचना

1. Server Admin पैनल में **Commons** टैब पर जाएँ।
2. आपको तीन उप-टैब दिखेंगे: **Queue**, **Reports**, और **Assets**।

एक सीमित **music editor** भूमिका भी Queue टैब देख सकती है, लेकिन उन सबमिशन को स्वीकृत करने से रोकी जाती है जो किसी गीत के अधिकार या लाइसेंसिंग बदलते हैं।

### Queue

Queue सभी उत्पादों में हर लंबित सबमिशन सूचीबद्ध करती है, जिसे उत्पाद और संपत्ति प्रकार से फ़िल्टर किया जा सकता है। हर पंक्ति दिखाती है कि सबमिशन एक नई संपत्ति है, उसके मूल लेखक द्वारा संपादन है, या किसी तीसरे पक्ष द्वारा संपादन, साथ में सबमिटर का स्वीकृति रिकॉर्ड और सबमिशन कितनी देर से प्रतीक्षा में है (72 घंटे पार होने पर चिह्नित)।

**Review** पर क्लिक करके फ़ील्ड-स्तरीय diffs, फ़ाइल पूर्वावलोकन, और आइटम के एक एम्बेडेड केवल-पढ़ने योग्य पूर्वावलोकन वाला एक drawer खोलें। स्वीकृत या अस्वीकृत करने के लिए **a**/**r** keyboard shortcuts उपयोग करें, और drawer से बाहर निकले बिना अगले या पिछले सबमिशन पर जाने के लिए **j**/**k**। अस्वीकार करने के लिए एक कारण (जैसे quality, duplicate, licensing, ccli, ai, या off-topic) और एक नोट चुनना आवश्यक है।

### Reports

Reports टैब उन कॉपीराइट और नीति/गुणवत्ता रिपोर्टों को संभालता है जो पहले से प्रकाशित संपत्तियों पर दर्ज हुई हैं, जो अलग Copyright और Policy & Other queues और एक Resolved इतिहास में बँटी हैं। किसी रिपोर्ट पर काम शुरू करने के लिए उसे claim करें, फिर एक resolution (upheld, dismissed, या duplicate) और एक action (none, unpublish, या remove) के साथ उसे resolve करें।

### Assets

Assets टैब प्रकाशित सामग्री का एक खोजने योग्य ब्राउज़र है, जिसमें कार्रवाइयाँ हैं: एक संपत्ति को **Feature** करना (उसे उत्पाद के होम पेज पर उजागर करता है), उसे **Unpublish**/**Republish** करना, या उसे **Remove** करना (कॉपीराइट या नीति कारण के साथ)।

विशेष रूप से गीतों के लिए, यहीं एक गीत **Sunday-ready** बनता है और किसी चर्च की B1 Admin गीत खोज में दिखने के योग्य होता है: एक समीक्षक संपत्ति खोलता है और हर प्रकाशित key को **Listened** चिह्नित करता है, एक बार उसे सुनने और पुष्टि करने के बाद कि स्कोर, कॉर्ड और स्लाइड सभी मौजूद हैं। एक गीत तभी Sunday-ready होता है जब हर key की जाँच हो जाए।

:::info
Commons moderation केवल स्टाफ़ के लिए है -- व्यक्तिगत चर्च कभी यह queue नहीं देखते। वह एक जगह जहाँ किसी व्यक्तिगत चर्च का B1 Admin Commons डेटा छूता है, वह [गीत खोज](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons) में "WorshipCommons — free" अनुभाग है, जो केवल वे गीत दिखाता है जो पहले ही इस समीक्षा प्रक्रिया से गुज़र चुके हैं।
:::

अंतर्निहित डेटा मॉडल और सबमिशन जीवन-चक्र के लिए [Content Commons architecture](/docs/developer/architecture/commons) पृष्ठ देखें।

## Group Email स्वीकृति

चर्च तब तक चर्च-लिखित ईमेल (group email, form follow-ups, workflow emails, और account invites) नहीं भेज सकते जब तक कोई सर्वर एडमिन उन्हें स्वीकृत न करे। यह बॉट-पंजीकृत चर्चों को स्पैम के लिए साझा ChurchApps भेजने वाले पते का उपयोग करने से रोकता है।

1. Server Admin पैनल में **Churches** टैब खोलें।
2. हर चर्च पर **Group Email** चिप दिखती है: **Approved** (हरा) या **Not approved** (रूपरेखा)।
3. किसी चर्च को स्वीकृत करने, या स्वीकृति रद्द करने के लिए चिप पर क्लिक करें और पुष्टि करें।

चर्च स्टाफ़ B1 Admin के Send Email डायलॉग में **Request review** बटन से स्वीकृति माँगता है। अनुरोध सहायता पते पर ईमेल होता है और उसमें चर्च का नाम, ID, पंजीकरण तिथि, स्थान, और किसने माँगा, यह सूचीबद्ध होता है। एक चर्च हर सप्ताह एक अनुरोध भेज सकता है। दैनिक भत्ते और बाउंस व शिकायतों पर स्वचालित रोक के लिए [Church-authored email limits](/docs/developer/architecture/notifications#church-authored-email-limits) देखें।

## Database Migrations

**Deploy Prod** workflow लंबित migrations स्वयं लागू करता है। होस्टेड डेटाबेस केवल Api के नेटवर्क के भीतर से कनेक्शन स्वीकार करते हैं, इसलिए GitHub runner उन तक नहीं पहुँच सकता; इसके बजाय `serverless deploy` के ठीक बाद workflow Api का `migrate` Lambda (`api-Prod-migrate`) invoke करता है, जो इस टैब के समान runner से हर module की लंबित migrations चलाता है और किसी भी module की त्रुटि या अस्वीकार होने पर deploy विफल कर देता है। **Rollback Prod** केवल Lambda code वापस लाता है; लागू हो चुकी migrations लागू रहती हैं। **Database Migrations** टैब स्थिति जाँचने, वह सब चलाने के लिए जो deploy ने नहीं चलाया (उदाहरण के लिए demo environment पर, जिसका deploy migrate नहीं करता), और बिना इतिहास वाले modules को baseline करने के लिए है। (Self-hosted Docker इंस्टॉल तब भी Api container शुरू होने पर migrations स्वचालित रूप से चलाते हैं।)

यह टैब वर्तमान environment और हर module (membership, attendance, giving, आदि) के लिए एक पंक्ति दिखाता है, उसकी स्थिति, लागू और लंबित migrations की संख्या, और अंतिम लागू की गई migration के साथ।

- **Run Pending Migrations** हर लंबित migration को एक-एक module करके, क्रम में लागू करता है। यह पहली विफलता पर रुकता है और हर module के लिए दिखाता है कि क्या लागू हुआ।
- **No history** चिह्नित module का डेटाबेस migration tracking से पहले का है। यह कभी स्वचालित रूप से नहीं चलता, क्योंकि इससे पुराने data migrations लाइव tables पर फिर से चल जाएँगे। उसके बजाय उस module पर **Check Schema** क्लिक करें। Api हर migration द्वारा बनाए गए tables, columns, और indexes की तुलना लाइव डेटाबेस से करता है और हर migration को **Already applied**, **Missing**, **Partly applied**, या **Data only** चिह्नित करता है। जाँच कुछ नहीं बदलती।
- जाँच के परिणामों में, **Record as Already Applied** पहचानी गई migrations को चलाए बिना migration इतिहास में लिखता है (पुष्टि के बाद)। आखिरी **Already applied** migration तक की सब कुछ दर्ज होती है, जिसमें उस सीमा में **Data only** वाली भी शामिल हैं; **Missing** वाली लंबित रहती हैं और फिर **Run Pending Migrations** से सामान्य रूप से चलाई जा सकती हैं।
- **Partly applied** migration दर्ज होने से रोकती है। यदि migration को दोबारा चलाना सुरक्षित है (पहले पढ़ें), तो **Re-run** चिह्नित करें ताकि वह लंबित रहे और ऊपर से फिर चले।

Server Admin पैनल और CLI (`yarn migrate:up`) एक ही Kysely migrator और `kysely_migration` table उपयोग करते हैं, इसलिए वे हमेशा इस पर सहमत रहते हैं कि क्या लागू हुआ। सहायक endpoints हैं `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect`, और `POST .../:module/baseline`, सभी केवल Server.Admin के लिए।

## संबंधित पृष्ठ

- [Authentication & Permissions](/docs/developer/api/endpoints/authentication) — अनुमति मॉडल और JWT प्रमाणीकरण
- [Membership Endpoints](/docs/developer/api/endpoints/membership) — उपयोगकर्ता और चर्च प्रबंधन API
- [Audit Log](/docs/b1-admin/reports/audit-log) — किसी चर्च की गतिविधि लॉग देखें
- [Content Commons Architecture](/docs/developer/architecture/commons) — साझा संपत्ति मॉडल और moderation जीवन-चक्र
