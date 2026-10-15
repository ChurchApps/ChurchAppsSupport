---
title: "Church Settings"
---

# Church Settings

<div class="article-intro">

Church Settings पेज वह जगह है जहां आप अपने church की बुनियादी जानकारी, contact details, और branding कॉन्फ़िगर करते हैं। ये विवरण सभी ChurchApps tools में उपयोग होते हैं, जिनमें आपकी B1.church website और B1 Mobile app शामिल हैं।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- आपको "Edit Church Settings" permission चाहिए। यदि आपके पास access नहीं है, तो [Roles & Permissions](./roles-permissions.md) देखें।
- अपने church का address, contact जानकारी, और logo तैयार रखें

</div>

## अपने Church की जानकारी Edit करना

1. B1 Admin में, [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ऊपर-बाईं ओर का search bar) खोलें, **Settings** को expand करें, और **Settings** पर click करें।
2. **Church Information** section (पेज के शीर्ष पर) में **Edit** पर click करें।
3. निम्नलिखित में से कोई भी fields अपडेट करें:
   - **Church Name** -- सभी ChurchApps products में दिखने वाला नाम।
   - **Address** -- आपके church का वास्तविक पता।
   - **Contact Information** -- phone number, email, और अन्य contact विवरण।
4. अपने बदलाव लागू करने के लिए **Save** पर click करें।

## अपना Subdomain सेट करना

आपके church को **yourchurch.1.church** पर एक निःशुल्क subdomain मिलता है। यह वह web address है जहां members और visitors आपके church की online उपस्थिति देख सकते हैं।

1. Settings page पर, **Church Information** section में **Edit** पर click करें और **Subdomain** field खोजें।
2. अपना पसंदीदा subdomain लिखें (जैसे, gracechurch.1.church के लिए "gracechurch")।
3. अपने बदलाव save करें।

:::info
आपका subdomain सभी ChurchApps churches में अनोखा होना चाहिए। यदि आपका पसंदीदा नाम पहले से लिया जा चुका है, तो अपने शहर या राज्य को जोड़कर देखें (जैसे, "gracechurch-dallas")।
:::

यदि आप चाहते हैं कि visitors आपकी site तक आपके अपने domain पर पहुंचें (जैसे, **www.gracechurch.org**), तो [Custom Domain](./custom-domain.md) देखें।

## Branding कॉन्फ़िगर करना

सभी ChurchApps tools में अपने church के दिखने का तरीका अनुकूलित करें:

1. logo area पर click करके और एक image file चुनकर अपना **church logo** upload करें।
2. अपनी website और [mobile app](./mobile-app.md) पर उपयोग होने वाली कोई भी अतिरिक्त **church images** जोड़ें।

:::tip
सर्वोत्तम परिणामों के लिए PNG format में पारदर्शी background वाला logo उपयोग करें। इससे वह light और dark, दोनों backgrounds पर अच्छा दिखता है।
:::

## सप्ताह का पहला दिन

चुनें कि आपके calendars किस दिन से शुरू हों। Church Info section में **First Day of Week** dropdown का default **Sunday** है, लेकिन इसे किसी भी दिन पर सेट किया जा सकता है। एक बार बदलने पर, यह B1 Admin और B1.church member portal के calendar grids में लागू होता है -- group calendars, curated calendars, और event editor, सभी हफ्ते उसी दिन से शुरू करके दिखाते हैं जो आप चुनते हैं।

## Region (तारीख और Phone Format)

**Region** setting यह नियंत्रित करती है कि B1 में तारीखें और समय कैसे लिखे जाते हैं। डिफ़ॉल्ट रूप से तारीखें United States format में होती हैं (जैसे "Sep 28, 2026" और "9/28/2026")। US के बाहर के churches अपना format चुन सकते हैं -- उदाहरण के लिए, English (United Kingdom) चुनने पर "28 Sept 2026" और "28/09/2026" दिखता है।

1. Settings page पर, बाईं सूची में **Region** पर click करें, फिर **Region** section में **Edit** पर click करें।
2. **Region** dropdown से अपना region चुनें। हर विकल्प एक नमूना तारीख दिखाता है ताकि आप देख सकें कि तारीखें कैसी दिखेंगी।
3. **Save** पर click करें।

Region section फिर आपका चुना हुआ region, **Date format** का एक नमूना, और आपका **Phone numbers** format दिखाता है।

### Phone Number Format

उसी Region section में एक **Phone numbers** setting है, जो नियंत्रित करती है कि व्यक्ति के record पर phone numbers कैसे दर्ज होते हैं:

- **International (with country code)** -- डिफ़ॉल्ट। phone fields में एक country flag picker दिखता है और numbers country code के साथ सहेजे जाते हैं (जैसे, +1 918 555 1234)।
- **Local (as typed)** -- phone fields सादे text boxes बन जाते हैं और numbers ठीक वैसे ही सहेजे जाते हैं जैसे आप लिखते हैं, बिना किसी country code के (जैसे, 0701 234 5678)। यदि आपका church local format में numbers लिखता है और नहीं चाहता कि B1 country code जोड़े, तो यह चुनें।

जब **Local** चुना होता है, तो Region section आपके region के बगल में "Local phone numbers" भी दिखाता है।

:::tip
texting तब सबसे अच्छा काम करती है जब numbers में country code हो। यदि आप B1 से texts भेजते हैं, तो **International** format रखें, या सुनिश्चित करें कि Local mode में आप जो numbers लिखते हैं उनमें country code हो।
:::

आपका region B1 Admin और आपकी B1.church website तथा member portal पर तारीखों और समय पर लागू होता है, जिसमें sermons, blog posts, group calendars, और serving plans शामिल हैं, ताकि members वही format देखें जो आपका staff देखता है।

## Texting {#texting}

B1 Admin से किसी व्यक्ति या पूरे group को SMS भेजने के लिए एक texting provider जोड़ें। texts provider के साथ आपके अपने account से भेजे जाते हैं, इसलिए उनकी pricing और limits लागू होती हैं।

1. Settings page पर, बाईं सूची में **Texting** पर click करें, फिर **Texting** section में **Edit** पर click करें।
2. एक **Provider** चुनें:
   - **Clearstream** -- एक **API Key** लिखें। इसे अपने Clearstream Account Settings में API Keys के अंतर्गत बनाएं।
   - **Text In Church** -- एक **API Key** लिखें। पहले Text In Church Support से developer API access मांगें, फिर अपनी Account Settings > Developer API section में एक key बनाएं।
   - **Nalo Solutions** (Ghana) -- अपने Nalo Solutions account की auth key को **API Key** के रूप में लिखें, और एक **Sender ID** (11 अक्षरों तक) जिसे Nalo ने आपके लिए स्वीकृत किया है।
3. **Save** पर click करें।

texting बंद करने के लिए, **Provider** को **None** पर सेट करें और save करें। इससे सहेजा गया provider हट जाता है।

### STOP लिखने वाले लोगों को Opt Out करना

एक बार provider सहेजा जाने के बाद, **Edit** के साथ Texting section फिर खोलें। provider settings के नीचे, एक read-only **Inbound (STOP) webhook URL** field आपके church के लिए एक अनोखा web address दिखाता है। address चुनने के लिए field पर click करें, उसे copy करें, और अपने texting provider की inbound message (reply) webhook setting में paste करें। यह ऊपर के उन सभी providers के साथ काम करता है जो आने वाले replies को webhook पर forward कर सकते हैं।

इसके बाद, जब कोई आपके किसी text के जवाब में **STOP** (या STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT, या REVOKE) लिखता है, तो B1 हर उस व्यक्ति को खोजता है जिसका mobile number मेल खाता है, उन्हें opted out चिह्नित करता है, और उनके text reminders बंद कर देता है। फिर group texts में वे छोड़ दिए जाते हैं। अन्य replies को अनदेखा किया जाता है।

:::info
यह **Hide me from the member directory** वाली उसी opt-out setting का उपयोग करता है, इसलिए जो लोग STOP लिखते हैं वे अपनी profile पर **Hidden from directory** के रूप में भी दिखते हैं। यह field केवल तब दिखता है जब सहेजा गया provider चुना हो -- यदि आप dropdown को किसी दूसरे provider पर बदलते हैं, तो URL दोबारा देखने के लिए पहले save करें।
:::

एक बार provider जुड़ जाने पर, text भेजने की अनुमति वाले staff को group के पेज (**Text this group**) और mobile phone वाले व्यक्ति के पेज (**Send text message**) पर **Text** button दिखता है। अपना संदेश लिखें और **Send** पर click करें। dialog अक्षर और SMS segments गिनता है। किसी group के लिए, भेजने से पहले यह दिखाता है कि कितने members को text मिलेगा:

- जिन members के record पर कोई mobile phone नहीं है, उन्हें छोड़ दिया जाता है।
- जिन members ने **Hide me from the member directory** चुना है, उन्हें opted out माना जाता है और छोड़ दिया जाता है।
- जो परिवार के सदस्य एक ही mobile number साझा करते हैं, उन्हें text केवल एक बार मिलता है।

### Merge Fields से Texts को Personalize करना {#personalizing-texts-with-merge-fields}

संदेश वाले box के नीचे, Text dialog placeholder chips दिखाता है: **First Name**, **Last Name**, **Display Name**, और **Church Name**। किसी chip पर click करने से उसका placeholder (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, या `{{churchName}}`) आपके cursor पर डाला जाता है। text भेजे जाने पर, हर placeholder उस प्राप्तकर्ता के विवरण से बदल दिया जाता है, इसलिए `Hi {{firstName}}, see you Sunday!` जैसा group text हर सदस्य तक उसके अपने नाम के साथ पहुंचता है। placeholders group texts और किसी एक व्यक्ति को भेजे गए texts, दोनों में काम करते हैं।

:::info
1,600 अक्षरों की सीमा उस संदेश पर लागू होती है जैसा आप उसे लिखते हैं। placeholders भरे जाने के बाद, 1,600 अक्षरों से लंबा कोई भी text उसी लंबाई पर काट दिया जाता है।
:::

texts [workflow](../serving/workflows.md#sending-a-text) के step से **Send Text** action के माध्यम से भी स्वचालित रूप से भेजे जा सकते हैं, जो उसी provider और placeholders का उपयोग करता है।

## File Storage

डिफ़ॉल्ट रूप से, आप अपनी website पर ([Files](../website/files.md) के माध्यम से) और अन्य content areas में जो files upload करते हैं, वे B1 के निःशुल्क hosted storage पर 100MB तक जाती हैं। यदि आपको अधिक जगह चाहिए, तो इसके बजाय अपना cloud storage जोड़ सकते हैं -- तब नई uploads सीधे आपके account में जाती हैं, बिना किसी platform सीमा के।

1. Settings page पर, बाईं सूची में **File Storage** पर click करें, फिर **File Storage** section में **Edit** पर click करें।
2. एक provider चुनें: **Google Drive**, **Dropbox**, **OneDrive**, या एक **S3-compatible bucket** (AWS S3, Cloudflare R2, Backblaze B2, आदि)।
3. Google Drive, Dropbox, या OneDrive के लिए **Connect** पर click करें और access अधिकृत करने के लिए sign in करें। S3-compatible bucket के लिए, अपनी access key, secret, bucket name, और public URL base लिखें।
4. **Save** पर click करें।

:::info
यह केवल आपकी website Files और similar content areas में नई uploads को प्रभावित करता है। Gallery images, thumbnails, logos, और person photos हमेशा B1 के डिफ़ॉल्ट storage पर रहते हैं।
:::

## Grade Promotion

यदि आप बच्चों और students पर **Grade** ट्रैक करते हैं, तो B1 आपके चुने हुए दिन (जैसे, 1 अगस्त) पर सभी को स्वचालित रूप से एक कक्षा ऊपर कर सकता है, बजाय इसके कि आपको हर profile हाथ से edit करनी पड़े।

1. Settings page पर, बाईं सूची में **Grade Promotion** पर click करें, फिर **Grade Promotion** section में **Edit** पर click करें।
2. switch चालू करें (यह **Enabled** दिखाता है) और हर साल grades promote करने के लिए **Month** और **Day** चुनें। उस दिन, जिस किसी की grade है वह एक कक्षा ऊपर जाता है, और 12वीं कक्षा के छात्र **Graduated** बन जाते हैं।
3. अपने बदलाव save करें।

स्वचालित promotion बंद करने के लिए, switch को बंद करें ताकि वह **Disabled** दिखाए, और save करें। promotion की तारीख हट जाती है और grades अपने-आप नहीं बदलेंगे।

## Volunteer Signup {#volunteer-signup}

डिफ़ॉल्ट रूप से, [volunteer signups](../../b1-church/serving/volunteer-signup.md) देखने वाले members को हर वह आने वाला हफ्ता दिखता है जिसमें खुली positions हैं। यदि वह सूची लंबी हो जाए, तो इसके बजाय आप हर plan type का केवल अगला हफ्ता दिखा सकते हैं।

1. Settings page पर, बाईं सूची में **Volunteer Signup** पर click करें, फिर **Volunteer Signup** section में **Edit** पर click करें।
2. **Show only the next week of each plan type** चालू करें।
3. अपने बदलाव save करें।

इसके चालू होने पर, हर plan type केवल अपना अगला आने वाला plan दिखाता है। अगला हफ्ता तब दिखता है जब वह तारीख बीत जाती है। section की **Weeks shown** पंक्ति **Only the next week of each plan type** या **All upcoming weeks** पढ़ती है।

## Giving Privacy {#giving-privacy}

giving access वाले लोग आम तौर पर किसी व्यक्ति के [person record](../people/adding-people.md#editing-details) पर उसके giving totals देखते हैं। यदि आप नहीं चाहते कि हर बार record खुलने पर राशियां स्क्रीन पर दिखें, तो आप उन्हें तब तक छिपा सकते हैं जब तक कोई पूछे नहीं।

1. Settings page पर, बाईं सूची में **Giving privacy** पर click करें, फिर **Giving privacy** section में **Edit** पर click करें।
2. **Hide giving on person records until clicked** चालू करें।
3. अपने बदलाव save करें।

इसके चालू होने पर, person record पर giving card कहता है "Giving is hidden on person records." उस व्यक्ति का giving लोड करके दिखाने के लिए **Show giving** पर click करें। जब आप कोई दूसरा व्यक्ति खोलते हैं, तो वह फिर छिप जाता है। giving कौन देख सकता है, यह नहीं बदलता: केवल giving access वाले लोग ही card देखते हैं।

## Import और Export

Settings page पर आपके church के नाम के नीचे **Import/Export** link एक नई browser window में एक समर्पित tool खोलता है। इसका उपयोग करें:

- किसी अन्य church management system से member डेटा import करने के लिए।
- backup या migration के उद्देश्य से अपना ChurchApps डेटा export करने के लिए।

यह विशेष रूप से तब उपयोगी है जब आप अपने church को पहली बार सेट कर रहे हों और मौजूदा records को ChurchApps में लाने की ज़रूरत हो।

:::warning
डेटा import करते समय, हमेशा पहले अपने मौजूदा records का backup लें। import operations आपके system में डेटा जोड़ते हैं और कई बार चलाने पर duplicate entries बना सकते हैं।
:::
