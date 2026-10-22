---
title: "चर्च सेटिंग्स"
---

# चर्च सेटिंग्स {#church-settings}

<div class="article-intro">

Church Settings पेज वह जगह है जहां आप अपने चर्च की basic जानकारी, contact विवरण और branding configure करते हैं। ये विवरण ChurchApps के सभी tools में इस्तेमाल होते हैं, जिनमें आपकी B1.church website और B1 Mobile app शामिल हैं।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- आपको "Edit Church Settings" की अनुमति चाहिए। अगर आपके पास पहुंच नहीं है, तो [भूमिकाएं और अनुमतियां](./roles-permissions.md) देखें।
- अपने चर्च का address, contact जानकारी और logo तैयार रखें

</div>

## चर्च की जानकारी संपादित करना {#editing-your-church-information}

1. B1 Admin में, [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ऊपर-बाईं ओर का search bar) खोलें, **Settings** को expand करें, और **Settings** पर click करें।
2. पेज के सबसे ऊपर **Church Information** section में **Edit** पर click करें।
3. इनमें से कोई भी field अपडेट करें:
   - **Church Name** -- वह नाम जो सभी ChurchApps products में दिखता है।
   - **Address** -- आपके चर्च का भौतिक address।
   - **Contact Information** -- फ़ोन नंबर, email और अन्य contact विवरण।
   - **Time Zone** -- आपके चर्च का time zone। नीचे [समय क्षेत्र](#time-zone) देखें।
4. अपने बदलाव लागू करने के लिए **Save** पर click करें।

## अपना subdomain सेट करना {#setting-up-your-subdomain}

आपके चर्च को **yourchurch.1.church** पर एक मुफ़्त subdomain मिलता है। यही वह web address है जहां सदस्य और आगंतुक आपके चर्च की online उपस्थिति तक पहुंच सकते हैं।

1. Settings पेज पर, **Church Information** section में **Edit** पर click करें और **Subdomain** field ढूंढें।
2. अपना पसंदीदा subdomain दर्ज करें (उदाहरण के लिए, gracechurch.1.church के लिए "gracechurch")।
3. अपने बदलाव save करें।

:::info
आपका subdomain सभी ChurchApps चर्चों में अनोखा होना चाहिए। अगर आपका पसंदीदा नाम पहले से लिया गया है, तो अपने शहर या राज्य का नाम जोड़कर देखें (उदाहरण के लिए, "gracechurch-dallas")।
:::

अगर आप चाहते हैं कि आगंतुक आपकी साइट अपने खुद के domain पर देखें (उदाहरण के लिए, **www.gracechurch.org**), तो [कस्टम डोमेन](./custom-domain.md) देखें।

## Branding कॉन्फ़िगर करना {#configuring-branding}

सभी ChurchApps tools में अपने चर्च के दिखने का तरीका बदलें:

1. **church logo** वाले क्षेत्र पर click करके और एक image file चुनकर अपना चर्च logo अपलोड करें।
2. आपकी website और [mobile app](./mobile-app.md) पर इस्तेमाल होने वाली अतिरिक्त **church images** जोड़ें।

:::tip
सबसे अच्छे परिणाम के लिए, PNG format में पारदर्शी background वाला logo इस्तेमाल करें। इससे वह light और dark दोनों backgrounds पर अच्छा दिखेगा।
:::

## सप्ताह का पहला दिन {#first-day-of-week}

चुनें कि आपके calendars किस दिन से शुरू होने चाहिए। **Church Info** section में **First Day of Week** dropdown डिफ़ॉल्ट रूप से **Sunday** पर होता है, लेकिन इसे किसी भी दिन पर सेट किया जा सकता है। एक बार बदलने के बाद, यह B1 Admin और B1.church member portal के calendar grids में लागू होता है -- group calendars, curated calendars, और event editor सभी आपके चुने दिन से शुरू होने वाले हफ्ते दिखाते हैं।

## समय क्षेत्र {#time-zone}

**Church Information** section में **Time Zone** dropdown आपके चर्च का time zone सेट करता है (उदाहरण के लिए, *America/Chicago*)। खाली छोड़ने के लिए **None** चुनें। सेव होने के बाद, यह zone Church Information summary में दिखता है।

B1 इस time zone का उपयोग पूरे चर्च के समय के लिए करता है, जैसे event reminders और आपके [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md) TVs के schedules। [चेक-इन schedule](../attendance/setup.md#setting-a-check-in-schedule) सबसे पहले सेवा के [कैंपस](./campuses.md) के time zone में मापे जाते हैं, और चर्च के time zone का इस्तेमाल तभी होता है जब उस campus का कोई time zone न हो। अगर आपके सभी campuses एक ही time zone में हैं, तो इसे चर्च और हर campus दोनों पर सेट करें।

## क्षेत्र (तारीख और फ़ोन फ़ॉर्मेट) {#region-date-and-phone-format}

**Region** setting नियंत्रित करती है कि B1 में तारीखें और समय कैसे लिखे जाते हैं। डिफ़ॉल्ट रूप से तारीखें United States format में होती हैं (उदाहरण के लिए, "Sep 28, 2026" और "9/28/2026")। अमेरिका के बाहर के चर्च अपना format चुन सकते हैं -- उदाहरण के लिए, English (United Kingdom) चुनने पर "28 Sept 2026" और "28/09/2026" दिखते हैं।

1. Settings पेज पर, बाईं ओर की सूची में **Region** पर click करें, फिर **Region** section में **Edit** पर click करें।
2. **Region** dropdown से अपना region चुनें। हर विकल्प एक नमूना तारीख दिखाता है ताकि आप देख सकें कि तारीखें कैसी दिखेंगी।
3. **Save** पर click करें।

Region section फिर आपका चुना हुआ region, **Date format** का नमूना और आपका **Phone numbers** format दिखाता है।

### फ़ोन नंबर फ़ॉर्मेट {#phone-number-format}

उसी Region section में एक **Phone numbers** setting है, जो नियंत्रित करती है कि किसी व्यक्ति के record पर फ़ोन नंबर कैसे दर्ज किए जाते हैं:

- **International (with country code)** -- डिफ़ॉल्ट। फ़ोन fields में country flag picker दिखता है और नंबर country code के साथ सेव होते हैं (उदाहरण के लिए, +1 918 555 1234)।
- **Local (as typed)** -- फ़ोन fields सादे text boxes बन जाते हैं और नंबर वैसे ही सेव होते हैं जैसे आप टाइप करते हैं, बिना country code जोड़े (उदाहरण के लिए, 0701 234 5678)। यह चुनें अगर आपका चर्च स्थानीय format में नंबर लिखता है और B1 को country code जोड़ने नहीं देना चाहता।

जब **Local** चुना होता है, तो Region section आपके region के बगल में "Local phone numbers" भी दिखाता है।

:::tip
Texting सबसे अच्छा तब काम करती है जब नंबरों में country code हो। अगर आप B1 से texts भेजते हैं, तो **International** format रखें, या Local mode में टाइप किए गए नंबरों में country code सुनिश्चित करें।
:::

आपका region पूरे B1 Admin और आपकी B1.church website तथा member portal पर तारीखों और समय पर लागू होता है, जिसमें sermons, blog posts, group calendars और serving plans शामिल हैं, ताकि सदस्य भी वही तारीख format देखें जो आपका staff देखता है।

## टेक्स्टिंग {#texting}

B1 Admin से किसी व्यक्ति या पूरे group को SMS भेजने के लिए एक texting provider जोड़ें। Texts आपके provider के अपने account से भेजे जाते हैं, इसलिए उनकी कीमतें और सीमाएं लागू होती हैं।

1. Settings पेज पर, बाईं ओर की सूची में **Texting** पर click करें, फिर **Texting** section में **Edit** पर click करें।
2. एक **Provider** चुनें:
   - **Clearstream** -- एक **API Key** दर्ज करें। इसे अपने Clearstream Account Settings में API Keys के अंतर्गत बनाएं।
   - **Text In Church** -- एक **API Key** दर्ज करें। पहले Text In Church Support से developer API access मांगें, फिर अपने Account Settings > Developer API section में key बनाएं।
   - **Nalo Solutions** (Ghana) -- अपने Nalo Solutions account की auth key को **API Key** के रूप में दर्ज करें, और एक **Sender ID** (अधिकतम 11 अक्षर) जो Nalo ने आपके लिए approve किया हो।
3. **Save** पर click करें।

Texting बंद करने के लिए **Provider** को **None** पर सेट करें और save करें। इससे सेव किया गया provider हट जाता है।

### STOP लिखने वाले लोगों को opt out करना {#opting-out-people-who-reply-stop}

एक बार provider सेव हो जाने पर, **Edit** से Texting section दोबारा खोलें। Provider settings के नीचे, एक केवल-पढ़ने योग्य **Inbound (STOP) webhook URL** field दिखता है, जिसमें एक web address होता है जो आपके चर्च के लिए अनोखा है। Address चुनने के लिए field पर click करें, उसे copy करें, और अपने texting provider की inbound message (reply) webhook setting में paste करें। यह ऊपर दिए गए किसी भी provider के साथ काम करता है जो incoming replies को webhook पर भेज सकता है।

इसके बाद, जब कोई आपके किसी text के जवाब में **STOP** (या STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT, या REVOKE) लिखता है, तो B1 हर उस व्यक्ति को ढूंढता है जिसका mobile नंबर मेल खाता है, उसे opted out चिह्नित करता है, और उसके text reminders बंद कर देता है। फिर वे group texts में छोड़ दिए जाते हैं। बाकी replies अनदेखे रहते हैं।

:::info
यह वही opt-out setting इस्तेमाल करता है जो **Hide me from the member directory** के लिए है, इसलिए STOP लिखने वाले लोग अपने profile पर **Hidden from directory** भी दिखते हैं। यह field केवल तभी दिखता है जब सेव किया गया provider चुना हो -- अगर आप dropdown को किसी दूसरे provider पर बदलते हैं, तो URL दोबारा देखने के लिए पहले save करें।
:::

एक बार provider connect हो जाने पर, texts भेजने की अनुमति वाले staff को किसी group के पेज (**Text this group**) और मोबाइल नंबर वाले व्यक्ति के पेज (**Send text message**) पर **Text** button दिखता है। अपना message टाइप करें और **Send** पर click करें। Dialog characters और SMS segments गिनता है। किसी group के लिए, भेजने से पहले यह दिखाता है कि कितने सदस्यों को text मिलेगा:

- जिन सदस्यों का mobile नंबर फ़ाइल में नहीं है, उन्हें छोड़ दिया जाता है।
- जिन सदस्यों ने **Hide me from the member directory** चुना है, वे opted out माने जाते हैं और छोड़ दिए जाते हैं।
- एक ही mobile नंबर साझा करने वाले परिवार के सदस्यों को text केवल एक बार मिलता है।

### Merge Fields से texts को personalize करना {#personalizing-texts-with-merge-fields}

Message box के नीचे, Text dialog placeholder chips दिखाता है: **First Name**, **Last Name**, **Display Name**, और **Church Name**। किसी chip पर click करें ताकि उसका placeholder (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, या `{{churchName}}`) आपके cursor पर डाला जाए। Text भेजे जाने पर, हर placeholder प्राप्तकर्ता के विवरण से बदल दिया जाता है, इसलिए `Hi {{firstName}}, see you Sunday!` जैसा group text हर सदस्य तक उसके अपने नाम के साथ पहुंचता है। Placeholders group texts और किसी एक व्यक्ति को भेजे गए texts, दोनों में काम करते हैं।

:::info
1,600 अक्षरों की सीमा उस message पर लागू होती है जैसा आप उसे टाइप करते हैं। Placeholders भरने के बाद, 1,600 अक्षरों से लंबा कोई भी text उस लंबाई पर काट दिया जाता है।
:::

Texts [वर्कफ़्लो](../serving/workflows.md#sending-a-text) के **Send Text** step से भी अपने-आप भेजे जा सकते हैं, जो वही provider और placeholders इस्तेमाल करता है।

## फ़ाइल स्टोरेज {#file-storage}

डिफ़ॉल्ट रूप से, आपकी website पर [फ़ाइलें](../website/files.md) के ज़रिए अपलोड की गई फ़ाइलें और अन्य content क्षेत्र B1 की मुफ़्त hosted storage का उपयोग करते हैं, जो 100MB तक है। अगर आपको और जगह चाहिए, तो इसकी जगह अपना cloud storage जोड़ सकते हैं -- नए uploads सीधे आपके account में जाएंगे, बिना किसी platform सीमा के।

1. Settings पेज पर, बाईं ओर की सूची में **File Storage** पर click करें, फिर **File Storage** section में **Edit** पर click करें।
2. एक provider चुनें: **Google Drive**, **Dropbox**, **OneDrive**, या एक **S3-compatible bucket** (AWS S3, Cloudflare R2, Backblaze B2, आदि)।
3. Google Drive, Dropbox, या OneDrive के लिए **Connect** पर click करें और access अधिकृत करने के लिए sign in करें। S3-compatible bucket के लिए, अपना access key, secret, bucket name, और public URL base दर्ज करें।
4. **Save** पर click करें।

:::info
यह केवल आपकी website Files और ऐसे ही अन्य content क्षेत्रों में होने वाले नए uploads को प्रभावित करता है। Gallery images, thumbnails, logos, और person photos हमेशा B1 के डिफ़ॉल्ट storage पर रहते हैं।
:::

## ग्रेड प्रमोशन {#grade-promotion}

अगर आप बच्चों और students पर **Grade** ट्रैक करते हैं, तो B1 आपके चुनी हुई तारीख (उदाहरण के लिए, 1 अगस्त) पर सभी को अपने-आप एक ग्रेड ऊपर कर सकता है, बजाय इसके कि आपको हर profile हाथ से edit करना पड़े।

1. Settings पेज पर, बाईं ओर की सूची में **Grade Promotion** पर click करें, फिर **Grade Promotion** section में **Edit** पर click करें।
2. Switch चालू करें (यह **Enabled** दिखाता है) और हर साल grades promote करने के लिए **Month** और **Day** चुनें। उस तारीख को, जिस किसी का grade है वह एक ग्रेड ऊपर जाता है, और 12th grade के students **Graduated** हो जाते हैं।
3. अपने बदलाव save करें।

अपने-आप प्रमोशन रोकने के लिए, switch बंद करें ताकि वह **Disabled** दिखाए, और save करें। Promotion की तारीख हट जाती है और grades अपने-आप नहीं बदलेंगे।

## स्वयंसेवक साइन-अप {#volunteer-signup}

डिफ़ॉल्ट रूप से, [स्वयंसेवक साइन-अप](../../b1-church/serving/volunteer-signup.md) देखने वाले सदस्य हर आने वाला ऐसा हफ्ता देखते हैं जिसमें खाली पद हों। अगर यह सूची लंबी हो जाती है, तो आप हर plan type का केवल अगला हफ्ता दिखा सकते हैं।

1. Settings पेज पर, बाईं ओर की सूची में **Volunteer Signup** पर click करें, फिर **Volunteer Signup** section में **Edit** पर click करें।
2. **Show only the next week of each plan type** चालू करें।
3. अपने बदलाव save करें।

इसके चालू होने पर, हर plan type केवल अपना अगला आने वाला plan दिखाता है। अगला हफ्ता तब दिखता है जब वर्तमान तारीख बीत जाती है। Section की **Weeks shown** पंक्ति **Only the next week of each plan type** या **All upcoming weeks** पढ़ती है।

## दान की गोपनीयता {#giving-privacy}

जिन लोगों को giving की पहुंच है, वे आम तौर पर किसी व्यक्ति के [व्यक्ति का record](../people/adding-people.md#editing-details) पर उसके giving totals देखते हैं। अगर आप नहीं चाहते कि हर बार record खोलने पर राशि स्क्रीन पर दिखे, तो आप उन्हें तब तक छिपा सकते हैं जब तक कोई उसे मांगे।

1. Settings पेज पर, बाईं ओर की सूची में **Giving privacy** पर click करें, फिर **Giving privacy** section में **Edit** पर click करें।
2. **Hide giving on person records until clicked** चालू करें।
3. अपने बदलाव save करें।

इसके चालू होने पर, person record पर giving card कहता है "Giving is hidden on person records." उस व्यक्ति की giving लोड करके दिखाने के लिए **Show giving** पर click करें। किसी दूसरे व्यक्ति का record खोलने पर यह फिर छिप जाती है। कौन giving देख सकता है, यह नहीं बदलता: केवल giving की पहुंच वाले लोग ही card देखते हैं।

## Import और Export {#import-and-export}

Settings पेज पर आपके चर्च के नाम के नीचे **Import/Export** link एक नई browser window में एक विशेष tool खोलता है। इसका उपयोग इन कामों के लिए करें:

- किसी दूसरे church management system से सदस्यों का डेटा import करना।
- बैकअप या migration के उद्देश्य से अपना ChurchApps डेटा export करना।

जब आप पहली बार अपना चर्च सेट कर रहे हों और मौजूदा records को ChurchApps में लाने की ज़रूरत हो, तब यह विशेष रूप से मददगार है।

:::warning
डेटा import करते समय, हमेशा पहले अपने मौजूदा records का बैकअप लें। Import operations आपके system में डेटा जोड़ते हैं और बार-बार चलाने पर duplicate entries बना सकते हैं।
:::
