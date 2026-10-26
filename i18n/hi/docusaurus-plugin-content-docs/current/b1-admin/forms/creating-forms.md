---
title: "फ़ॉर्म बनाना"
---

# फ़ॉर्म बनाना

<div class="article-intro">

अपने congregation से जानकारी इकट्ठा करने के लिए custom forms बनाएं। आप event registrations, surveys, visitor cards, membership applications और बहुत कुछ के लिए forms बना सकते हैं। Forms आपके database के लोगों से जोड़े जा सकते हैं, या अपने अलग public URL वाले standalone pages के रूप में उपयोग किए जा सकते हैं।

</div>

## प्रशिक्षण वीडियो

<YouTube id="sr9wxEj9ghQ" title="Creating Forms and Managing Submissions in B1" />

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- **People** forms (व्यक्ति रिकॉर्ड से जुड़े) के लिए, पहले आपके database में [लोग](../people/adding-people.md) होने चाहिए।
- जो forms **payments** इकट्ठा करते हैं, उनके लिए [Stripe ऑनलाइन giving के लिए कॉन्फ़िगर](../donations/online-giving-setup.md) होना ज़रूरी है।

</div>

## नया फ़ॉर्म बनाना

1. [Jump menu](../introduction.md#getting-around-with-the-jump-menu) खोलें (B1 Admin में ऊपर-बाईं ओर का search bar), **People** को expand करें, और **Forms** पर click करें।
2. **Add Form** पर click करें।
3. अपने फ़ॉर्म का **name** लिखें।
4. **Associate With** dropdown से फ़ॉर्म का प्रकार चुनें:
   - **People** -- फ़ॉर्म के submissions को [लोगों के रिकॉर्ड](../people/adding-people.md) से जोड़ता है। People forms व्यक्ति के रिकॉर्ड से भरे जाते हैं, इसलिए उनका कोई shareable link नहीं होता।
   - **Stand Alone** -- अपने public URL वाला एक स्वतंत्र फ़ॉर्म बनाता है, जो बाहरी registrations के लिए आदर्श है। केवल Stand Alone forms में [header photo](#adding-a-header-photo), [QR code](#sharing-a-form-with-a-qr-code), [linked group](#linking-a-form-to-a-group), और **Create a person record from submissions** विकल्प मिलते हैं।
5. फ़ॉर्म बनाने के लिए **Save** पर click करें।

आपका नया फ़ॉर्म सूची में दिखेगा। सवाल जोड़ना शुरू करने के लिए उस पर click करें।

## खाली फ़ॉर्म प्रिंट करना {#printing-a-blank-form}

हाथ में देने के लिए कागज़ की प्रति चाहिए -- welcome desk पर visitor card के लिए, या ऐसे किसी व्यक्ति के लिए जिसके पास इंटरनेट नहीं है और जो हाथ से भर सके? forms की मुख्य सूची में किसी फ़ॉर्म के बगल में **Print** पर click करें ताकि preview खुले, फिर **Print** पर click करें। खाली fields में हर सवाल के लिए एक underline या checkbox छपता है ताकि लोग उन्हें हाथ से भर सकें; ज़रूरी सवालों पर तारे (asterisk) का निशान होता है। पेज के ऊपर आपके church का logo दिखता है ([Website > Appearance](../website/appearance.md) से **Light Background Logo**, अगर आपने अपलोड किया है), उसके नीचे church का नाम, और फिर फ़ॉर्म का नाम। कोई और print विकल्प नहीं है -- पूरा फ़ॉर्म प्रिंट करें या कुछ नहीं।

## QR Code से फ़ॉर्म साझा करना {#sharing-a-form-with-a-qr-code}

Stand Alone forms की मुख्य सूची में उनके बगल में **QR Code** link होता है (archived forms में नहीं होता)। उस पर click करने से फ़ॉर्म के public URL का QR code खुलता है, जिसके नीचे link दिखता है। code को image के रूप में सेव करने के लिए **Download PNG** पर click करें, जिसे आप bulletins पर छाप सकते हैं या slides पर दिखा सकते हैं। जो कोई उसे scan करता है, वह फ़ॉर्म अपने phone पर खोल लेता है।

## सवाल जोड़ना {#adding-questions}

1. अपना फ़ॉर्म खोलें और **Questions** tab पर जाएं।
2. **Add Question** पर click करें।
3. Provider dropdown से **field type** चुनें। उपलब्ध प्रकारों में शामिल हैं:
   - **Textbox** -- छोटे text उत्तरों के लिए
   - **Date** -- तारीख चुनने के लिए
   - **Email** -- email पतों के लिए
   - **Phone Number** -- फ़ोन नंबर इनपुट के लिए
   - **Multiple Choice** -- पहले से तय विकल्पों में से चुनने के लिए
   - **Payment** -- भुगतान इकट्ठा करने के लिए
4. सवाल का **Title** और वैकल्पिक **Description** लिखें। लोग फ़ॉर्म भरते समय description सवाल के नीचे देखते हैं, इसलिए इसका उपयोग संकेतों के लिए करें, जैसे "Include any allergies we should know about."
5. अगर field अनिवार्य है तो **Require an answer** को चिह्नित करें।
6. **Save** पर click करें।
7. और सवाल जोड़ने के लिए दोहराएं।

:::warning
**Payment** field type के लिए Stripe का कॉन्फ़िगर होना ज़रूरी है। अगर आपने अभी तक ऑनलाइन giving सेट नहीं की है, तो payment fields जोड़ने से पहले [Online Giving Setup](../donations/online-giving-setup.md) देखें।
:::

## फ़ॉर्म सदस्य प्रबंधित करना {#managing-form-members}

1. अपना फ़ॉर्म खोलें और **Form Members** tab पर जाएं।
2. किसी व्यक्ति को खोजें और एक भूमिका के साथ जोड़ें:
   - **Admin** -- फ़ॉर्म संपादित कर सकता है और सभी submissions देख सकता है।
   - **View Only** -- submissions देख सकता है, लेकिन फ़ॉर्म संपादित नहीं कर सकता।

## फ़ॉर्म को Group से जोड़ना {#linking-a-form-to-a-group}

आप किसी भी Stand Alone फ़ॉर्म को group से जोड़ सकते हैं -- उदाहरण के लिए, किसी small group के लिए prayer request फ़ॉर्म, या youth trip के लिए medical release:

1. अपने फ़ॉर्म के **Details** खोलें।
2. **Linked group** के अंतर्गत group चुनें, या उसे **None** पर ही रहने दें।
3. **Save** पर click करें।

एक बार फ़ॉर्म जुड़ जाने पर:

- **Group members** को B1.church पर group के पेज में एक **Forms** section दिखता है, जब तक फ़ॉर्म खुला है, और उसके साथ एक **Fill out** बटन होता है जो उसे खोलता है (देखें [Group Details](../../b1-church/groups/group-details.md#linked-forms))।
- **Group leaders** बंद फ़ॉर्म भी देखते हैं, और हर submission के उत्तर पढ़ और प्रिंट कर सकते हैं (एक submission या **Print all**)। Leaders केवल उत्तर देख सकते हैं -- वे फ़ॉर्म तभी संपादित कर सकते हैं जब वे [form members](#managing-form-members) भी हों।
- **B1 Admin** में, group के पेज पर **Linked forms** section दिखता है, जिसमें हर जुड़ा फ़ॉर्म **Open** या **Closed** के रूप में सूचीबद्ध होता है। यह group के leaders और उन लोगों को दिखता है जो forms प्रबंधित कर सकते हैं। देखें [Group Members](../groups/group-members.md#linked-forms)।

जब कोई फ़ॉर्म अपनी उपलब्धता की समय-सीमा से बाहर हो, तब वह closed होता है। Archived forms group पेज पर नहीं दिखते।

### Submitters को Group में अपने-आप जोड़ना {#automatically-adding-submitters-to-a-group}

फ़ॉर्म को group से जोड़ने पर वह अपने-आप किसी को group में नहीं जोड़ता। हर submitter को linked group की सूची में जोड़ने के लिए, फ़ॉर्म के details में **Create a person record from submissions** भी चालू करें और **Save** पर click करें।

जब भी कोई फ़ॉर्म submit करता है, मिला हुआ या नया बना व्यक्ति group में जोड़ दिया जाता है (जो लोग पहले से group के सदस्य हैं, उन्हें छोड़ दिया जाता है)। यह उन चीज़ों के लिए उपयोगी है जैसे camp sign-up फ़ॉर्म, जो camp की roster group अपने-आप बना दे।

### Follow-up Email भेजना

**Create a person record from submissions** चालू होने पर, आप फ़ॉर्म submit करने वाले हर व्यक्ति को email भी भेज सकते हैं। फ़ॉर्म के details में **Follow-up Email Subject** और **Follow-up Email Body** भरें। दोनों में आप `{firstName}` और `{churchName}` tokens उपयोग कर सकते हैं। email केवल तभी भेजा जाता है जब दोनों fields भरे हों।

:::info
Follow-up emails केवल तब भेजे जाते हैं जब आपके church को group email भेजने की मंज़ूरी मिल चुकी हो, और वे आपके church की रोज़ की email सीमा में गिने जाते हैं। देखें [Turning On Group Email for Your Church](../groups/group-members.md#turning-on-group-email-for-your-church)।
:::

## फ़ॉर्म की प्रतिलिपि बनाना

किसी फ़ॉर्म को नए फ़ॉर्म की शुरुआत के लिए दोबारा उपयोग करने के लिए, Forms की सूची में फ़ॉर्म के बगल में **Duplicate** पर click करें और पुष्टि करें। B1 सभी सवालों सहित फ़ॉर्म की हूबहू प्रतिलिपि बनाता है, जिसका आप नाम बदल सकते हैं और स्वतंत्र रूप से संपादित कर सकते हैं।

:::tip
हर साल दोहराए जाने वाले events के लिए duplication बहुत उपयोगी है, जहां registration के सवाल हर साल एक जैसे रहते हैं। पिछले साल का फ़ॉर्म duplicate करें, नाम और तारीखें अपडेट करें, और आप तैयार हैं।
:::

## फ़ॉर्म के गुण कॉन्फ़िगर करना

आप अपने फ़ॉर्म का नाम और सेटिंग्स कभी भी अपडेट कर सकते हैं। Stand Alone forms के लिए आपको एक अनोखा **public URL** भी दिखेगा, जिसे आप किसी के भी साथ साझा कर सकते हैं, साथ ही एक **Description** field भी -- यह public फ़ॉर्म पेज पर सवालों के ऊपर दिखने वाला text है, जो लोगों को फ़ॉर्म भरने से पहले बताता है कि वह किस लिए है।

### Header Photo जोड़ना {#adding-a-header-photo}

Stand Alone forms फ़ॉर्म के ऊपर एक **Header Photo** दिखा सकते हैं। फ़ॉर्म के details में, photo box या **Add Photo** पर click करें, फिर कोई image चुनें या अपलोड करें (वह 16:9 आकार में crop होती है)। **Save** पर click करें। photo फ़ॉर्म के नाम के नीचे, description के ऊपर दिखता है -- फ़ॉर्म के public URL पेज पर, और जहां भी फ़ॉर्म website के **Form** element से embed होता है। उसे बदलने के लिए **Change Photo** या हटाने के लिए **Remove** का उपयोग करें।

**Thank You Message** field में सेट करें कि फ़ॉर्म submit करने के बाद लोगों को क्या दिखे, जिसमें फ़ॉर्म का public URL पेज भी शामिल है। अगर यह खाली छोड़ा जाए, तो उन्हें "Thank you for submitting the form!" दिखता है।

:::tip
Stand Alone forms event registrations के लिए बहुत अच्छे हैं। public URL email, social media पर साझा करें, या फ़ॉर्म को सीधे अपनी church website पर embed करें।
:::

:::info
अपनी B1 website पर फ़ॉर्म embed करने के लिए, अपने website editor पर जाएं, एक नई section जोड़ें, और **Form** element चुनें। फिर वह फ़ॉर्म चुनें जिसे आप दिखाना चाहते हैं। अपनी website संपादित करने के बारे में विवरण के लिए [Managing Pages](../website/managing-pages.md) देखें।
:::
