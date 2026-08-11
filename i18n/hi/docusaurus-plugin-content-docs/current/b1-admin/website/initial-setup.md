---
title: "प्रारंभिक सेटअप"
---

# प्रारंभिक सेटअप

<div class="article-intro">

हर B1 account एक website के साथ आता है जो पहले से तैयार है। यह guide आपको अपनी चर्च domain को set up करने, अपनी site के appearance को configure करने, अपने पहले pages बनाने, और अपने navigation को organize करने के through चलाता है।

</div>

<div class="prereqs">
<h4>शुरुआत करने से पहले</h4>

- आपको administrative access के साथ एक B1.church account की आवश्यकता है
- यदि एक custom domain का उपयोग कर रहे हैं, तो अपने DNS provider login credentials तैयार रखें (उदाहरण के लिए, GoDaddy, Cloudflare, या AWS)
- अपनी चर्च logo को PNG प्रारूप में तैयार करें transparent background के साथ सर्वोत्तम परिणामों के लिए

</div>

## अपने Domain को Set Up करना

आपकी चर्च को B1.church पर स्वचालित रूप से एक subdomain प्राप्त होता है (उदाहरण के लिए, `yourchurch.b1.church`)। आप अपने B1 site के लिए अपने स्वयं के custom domain को भी point कर सकते हैं।

1. **B1.church Admin** पर जाएं admin.b1.church को visit करके या अपने profile dropdown पर क्लिक करके और **Switch App** को चुनकर।
2. शीर्ष-बाएं कोने में **section menu** खोलें (छोटे तीर के साथ section का नाम) और **Settings** चुनें।
3. अपने subdomain को view करने के लिए **Manage** पर क्लिक करें। इसे कुछ छोटे और recognizable के लिए सेट करें बिना spaces के।
4. एक custom domain का उपयोग करने के लिए, अपने DNS provider (जैसे GoDaddy, Cloudflare, या AWS) में लॉगिन करें और दो records जोड़ें:
   - एक **A record** आपके root domain के लिए `3.23.251.61` को point करते हुए
   - एक **CNAME record** `www` के लिए `proxy.b1.church` को point करते हुए
5. B1.church Admin में वापस जाएं, अपने custom domain को list में जोड़ें, और **Add** फिर **Save** पर क्लिक करें। आपकी site आपके custom domain से कुछ मिनटों के अंदर accessible होगी।

:::tip
यदि आप Settings विकल्प नहीं देखते हैं, तो जिस व्यक्ति ने आपके चर्च account को set up किया है उससे पूछें कि वह आपको "Edit Church Settings" permission दे। [Roles & Permissions](../settings/roles-permissions.md) के लिए विवरण देखें।
:::

## अपना पहला पृष्ठ बनाना

1. B1 Admin में, left menu में **Website** पर क्लिक करें Website Pages view को खोलने के लिए।
2. top right corner में **Add Page** पर क्लिक करें।
3. पृष्ठ type के रूप में **Blank** चुनें और इसे "Home" नाम दें।
4. **Page Settings** पर क्लिक करें और URL path को `/` के लिए सेट करें (कोई text के साथ एक forward slash) आपके home page के लिए। अन्य pages `/page-name` का उपयोग करते हैं।
5. **Edit Content** पर क्लिक करें building शुरू करने के लिए। हर पृष्ठ एक **Section** से शुरू होना चाहिए -- यह सभी अन्य elements के लिए container है।
6. एक section जोड़ने के बाद, सभी अन्य elements को drag करके insert करने के लिए **Add Content** फिर से पर क्लिक करें text, images, videos, cards, forms, और अधिक को।

:::info
Pages और navigation के साथ काम करने के विस्तृत निर्देशों के लिए, [Managing Pages](managing-pages) देखें। Visual editor के लिए एक पूर्ण guide के लिए, [Using the Page Editor](page-editor) देखें।
:::

## Site Appearance को Configure करना

1. Website Pages view से, top पर **Appearance** tab पर क्लिक करें।
2. अपने brand colors set करने के लिए **Color Palette** का उपयोग करें primary, secondary, और accent tones के लिए।
3. **Typography Settings** के तहत, font browser से अपने heading और body fonts चुनें।
4. **Logo** के तहत अपनी चर्च logo को upload करें Style Settings में। Light background और dark background दोनों versions provide करें।
5. अपनी **Site Footer** को अपनी चर्च की contact information और links के साथ configure करें।

:::info
Appearance में जो परिवर्तन आप करते हैं वे आपकी पूरी वेबसाइट पर लागू होते हैं। प्रत्येक setting पर विस्तृत निर्देशों के लिए [Appearance](appearance) page देखें।
:::

## Navigation को Set Up करना

आपके navigation links Website Pages view में दिखाई देते हैं। उन्हें organize करने के लिए:

1. एक नया navigation link बनाने के लिए **Add** पर क्लिक करें और इसे अपने एक pages के लिए point करें।
2. उन्हें reorder करने के लिए links को drag और drop करें या उन्हें parent items के नीचे nest करें।
3. Navigation सही लगता है यह confirm करने के लिए अपनी site का preview करें।

## अगले कदम

- [Managing Pages](managing-pages) -- विस्तार से pages और navigation के साथ कैसे काम करें सीखें
- [Appearance](appearance) -- अपनी site के colors, fonts, और layout को fine-tune करें
- [Files](files) -- अपनी वेबसाइट के लिए images और documents को upload करें
