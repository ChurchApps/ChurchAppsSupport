---
title: "B1App में नेविगेट करना"
---

# B1App में नेविगेट करना

<div class="article-intro">

B1.church का member portal एक phone-first web app है, जो `/mobile` के अंतर्गत रहता है। यह किसी भी browser में काम करता है और इसे आपकी home screen पर install किया जा सकता है। यह पेज Home dashboard, नीचे का tab bar, More page, और Me page समझाता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- अपनी व्यक्तिगत जानकारी देखने के लिए आपको [logged in](./logging-in.md) होना चाहिए। Sign out किए हुए visitors सार्वजनिक content ब्राउज़ कर सकते हैं, और जहां किसी feature के लिए account चाहिए वहां उन्हें **Sign In** button दिया जाता है।

</div>

## Home

`https://yourchurchname.b1.church/mobile` खोलने पर आप **Home** dashboard पर पहुंचते हैं, जो `/mobile/dashboard` पर है। Home member portal का landing page है। यह एक अभिवादन ("Good morning", "Good afternoon", या "Good evening" आपके पहले नाम के साथ) और आज की तारीख से शुरू होता है, उसके बाद ऐसे sections आते हैं जो केवल तभी दिखते हैं जब वे लागू हों:

- **Latest sermon** -- आपके church का नवीनतम sermon, **All sermons** link के साथ
- **Verse of the Day** -- आज का verse; पूरा [Verse of the Day](../content/verse-of-the-day.md) page खोलने के लिए उस पर tap करें
- **You're serving** -- आपकी अगली आने वाली serving assignments, **All plans** link के साथ। यदि किसी assignment को अभी भी आपके उत्तर की ज़रूरत है, तो वे पहले **Needs reply** badge और **Accept** / **Decline** buttons के साथ दिखती हैं ताकि आप Home से ही जवाब दे सकें; अन्यथा आपकी अगली assignments पर **Accepted** या **Confirmed** badge दिखता है। assignment का plan खोलने के लिए उस पर tap करें।
- **Your groups** -- आपके अधिकतम तीन groups उनके meeting time और location के साथ, और **All groups** link
- **Giving** -- इस साल (वर्तमान वर्ष के लिए "Given in") आपने कितना दिया है, एक **Give** button, और आपके [donation history](../giving/donation-history.md) का **History** link
- **More from** *आपके church* से -- आपके church द्वारा चालू किए गए बाकी tools के buttons, जो पहले से tab bar में या ऊपर नहीं दिखाए गए हैं। जिनका आप सबसे अधिक उपयोग करते हैं वे आगे आ जाते हैं।

serving, groups, और giving sections केवल तभी दिखते हैं जब आप sign in हों, आपके church ने वह tool चालू किया हो, और दिखाने के लिए कुछ हो -- उदाहरण के लिए, कोई आने वाली assignment या कम से कम एक group। कंप्यूटर पर, Home दो columns में व्यवस्थित होता है।

यदि आप sign out हैं, तो Home अभिवादन के स्थान पर **Welcome** heading दिखाता है, एक छोटे prompt ("Sign in to see your groups, giving, and more.") और एक **Sign In** button के साथ। आपका church इस prompt के शब्द बदल सकता है या इसे छिपा सकता है -- देखें [Mobile App Settings](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt)। जब यह छिपा होता है, तब भी आप **More** page या **Me** page से sign in कर सकते हैं।

## नीचे का Tab Bar

phone पर, screen के नीचे एक tab bar स्थिर रहता है:

- **Home** -- हमेशा पहला tab
- आपके church द्वारा कॉन्फ़िगर किए गए tabs में से अधिकतम तीन
- **More** -- More page खोलता है

बाहरी websites, custom pages, और Verse of the Day के links को कभी tab नहीं मिलता। यदि आपके church ने फिट होने से अधिक tabs कॉन्फ़िगर किए हैं, तो बाकी खोते नहीं हैं: वे **More** page पर और Home पर **More from** section में दिखते हैं। church administrators B1 Admin में **Mobile → Navigation** के अंतर्गत tab का क्रम सेट करते हैं।

## Computer पर

किसी बड़ी screen, जैसे computer या बड़े tablet पर, नीचे का tab bar screen के ऊपर एक header से बदल जाता है, जो आपके church के रंग में होता है। इसमें आपके church का नाम दिखता है (उस पर click करके Home पर लौटें), **Home**, आपके church द्वारा कॉन्फ़िगर किए गए अधिकतम पांच tabs, और **More**, और दाईं ओर bell और आपकी profile photo। जब आप कोई detail screen खोलते हैं, तो page content के ऊपर एक **Back** link दिखता है।

## More Page

**More** पर tap करने से `/mobile/more` पर More page खुलता है। इसमें शामिल है:

- आपका नाम और photo, **Edit Profile** link के साथ -- देखें [Editing Your Profile](./editing-your-profile.md)
- आपके church के नाम के नीचे, क्रम में, आपके church द्वारा कॉन्फ़िगर किए गए हर tab। बाहरी websites के links एक नए browser tab में खुलते हैं।
- एक **Account** section, जिसमें:
  - **Me** -- आपका व्यक्तिगत page (केवल sign in होने पर)
  - **Appearance** -- **Light Mode** और **Dark Mode** के बीच switch करें
  - **Admin Portal** -- केवल तभी दिखता है जब आपके church में आपके पास administrator permissions हों; यह B1 Admin को एक नए tab में खोलता है
  - **Install App** -- `/mobile/install` पर [install निर्देश](./installing-pwa.md) खोलता है (ऐप install होने के बाद यह छिप जाता है)
- **Sign out**, या यदि आप sign out हैं तो **Sign In** button
- आपके church का नाम और privacy policy का link

## App Bar

phone पर, हर screen के ऊपर की bar में दिखता है:

- Home और अन्य मुख्य screens पर आपके church का नाम, या जब आप किसी detail screen में गहराई तक गए हों तो एक back arrow। screen का शीर्षक page के ऊपर स्वयं दिखता है।
- notifications और messages के लिए एक **bell** icon, जिस पर न पढ़े गए items का badge होता है -- नीचे [Notifications and Messages](#notifications-and-messages) देखें
- आपकी **profile photo**, जो `/mobile/profileEdit` पर आपकी profile खोलती है -- देखें [Editing Your Profile](./editing-your-profile.md)

bell और profile photo केवल तभी दिखते हैं जब आप sign in हों।

## Notifications और Messages

bell पर tap करने से दो sections वाला एक panel खुलता है:

- **Messages** -- आपकी सबसे हाल की निजी बातचीत, एक नई शुरू करने के लिए **New message** link के साथ
- **Notifications** -- आपकी सबसे हाल की notifications, जिन्हें नहीं पढ़ा गया उन पर **New** badge के साथ। जिस group, plan, या conversation से notification आई है उस पर जाने के लिए उस पर tap करें।

हर section दिखाता है कि उसमें कितने न पढ़े गए items हैं। अपना पूरा inbox `/mobile/notifications` पर खोलने के लिए नीचे **See all** पर tap करें।

## Sections वाले Pages

detail pages -- एक group, एक plan, आपका Me page, और Plans व Giving screens -- tabs के बजाय sections के एक page के रूप में व्यवस्थित होते हैं। हर section एक छोटा preview दिखाता है, और section के header में एक link (जैसे **All members**, **All events**, या **Full service order**) पूरी सूची खोलता है। उस view के ऊपर का **Back to** link आपको उस page पर वापस ले जाता है जहां से आप आए थे।

## Me Page

**Me** (`/mobile/me`) आपका व्यक्तिगत केंद्र है। यह आपका नाम और photo, **Edit Profile** और **Settings** ([notification preferences](./notification-preferences.md)) buttons के साथ दिखाता है, फिर आपके लिए आने वाली चीज़ें -- serving assignments, event registrations, और group events -- उसके बाद आपका household, आपके groups, इस साल आपकी [giving](../giving/), आपके [registrations](../events/my-registrations.md), और हाल की notifications और messages। विवरण के लिए [The Me Page](./me-page) देखें।

यदि आप sign out हैं, तो Me page इसके बजाय **Sign In** button दिखाता है।

## अपनी Home Screen पर Install करना

member portal एक Progressive Web App है। अपने device के लिए चरण-दर-चरण निर्देशों के लिए `/mobile/install` पर जाएं (या More page पर **Install App** चुनें)। install होने के बाद, यह आपकी home screen से browser के ढांचे के बिना पूर्ण-स्क्रीन खुलता है। देखें [Installing as an App (PWA)](./installing-pwa.md)।

## आपके Church की Public Website

member portal के बाहर, आपके church की public website का अपना header navigation होता है, जिसमें आपके administrators द्वारा कॉन्फ़िगर किए गए links हैं -- जैसे [sermons](../content/sermons.md), [Bible](../content/bible.md), [live streaming](../content/live-streaming.md) वाले pages, और एक public group list। phone पर ये links header के ऊपर-दाईं ओर hamburger icon के पीछे होते हैं।

:::info
आप जो tabs और tools देखते हैं वे church के अनुसार अलग होते हैं। Administrators B1 Admin के माध्यम से नियंत्रित करते हैं कि members को कौन-से sections दिखें, इसलिए यदि आपको यहां वर्णित कोई feature नहीं दिखता, तो हो सकता है कि आपके church ने उसे चालू न किया हो।
:::
