---
title: "B1App में नेविगेट करना"
---

# B1App में नेविगेट करना {#navigating-b1app}

<div class="article-intro">

B1.church में सदस्य पोर्टल एक फ़ोन-प्रथम वेब ऐप है जो `/mobile` के अंतर्गत चलता है। यह किसी भी browser में काम करता है और इसे आपकी home screen पर install किया जा सकता है। यह पेज Home डैशबोर्ड, नीचे के tab bar, More पेज और Me पेज को समझाता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- अपनी निजी जानकारी देखने के लिए आपको [लॉग इन](./logging-in.md) होना ज़रूरी है। साइन-आउट विज़िटर फिर भी सार्वजनिक सामग्री ब्राउज़ कर सकते हैं, और जहां किसी feature के लिए खाता चाहिए, वहां उन्हें **Sign In** बटन दिया जाता है।

</div>

## होम {#home}

`https://yourchurchname.b1.church/mobile` खोलने पर आप `/mobile/dashboard` पर **Home** डैशबोर्ड पर पहुंचते हैं। Home सदस्य पोर्टल का लैंडिंग पेज है। यह एक अभिवादन ("Good morning", "Good afternoon", या "Good evening" आपके पहले नाम के साथ) और आज की तारीख से शुरू होता है, उसके बाद ऐसे सेक्शन आते हैं जो केवल तभी दिखते हैं जब वे लागू हों:

- **Photo tiles** -- आपके church द्वारा फ़ोटो दिए गए tabs (Verse of the Day सहित) आपके church के नाम के नीचे photo tiles के रूप में दिखते हैं। आपके church की पसंद के अनुसार वे दो-स्तंभ grid, एक row जिसे आप बगल में swipe करते हैं, या हर नाम के साथ एक छोटे thumbnail वाली सूची के रूप में लगाए जाते हैं -- देखें [Home Screen Tiles](../../b1-admin/settings/mobile-app.md#home-screen-tiles)। हर photo tab यहां दिखता है, यहां तक कि वह भी जिसका tab bar में भी स्थान है।
- **Latest sermon** -- आपके church का सबसे नया sermon, **All sermons** लिंक के साथ
- **Verse of the Day** -- आज का verse; पूरा [Verse of the Day](../content/verse-of-the-day.md) पेज खोलने के लिए इस पर tap करें
- **You're serving** -- आपकी अगली आने वाली serving assignments, **All plans** लिंक के साथ। यदि किसी assignment का अभी भी आपका जवाब बाकी है, तो वे पहले दिखती हैं, उन पर **Needs reply** badge और **Accept** / **Decline** बटन के साथ, ताकि आप Home से सीधे जवाब दे सकें (**Decline** पहले पुष्टि मांगता है); अन्यथा आपकी अगली assignments पर **Accepted** या **Confirmed** badge दिखता है। उसकी plan खोलने के लिए किसी assignment पर tap करें।
- **Your groups** -- आपके अधिकतम तीन groups, उनके meeting समय और स्थान के साथ, और **All groups** लिंक
- **Upcoming events** -- साइन इन होने पर, आपके सदस्य groups के अगले तीन आने वाले events, हर एक की तारीख और समय के साथ (और यदि event की फ़ोटो है तो thumbnail)। उस group के events खोलने के लिए event पर tap करें। पूरी आने वाली सूची खोलने के लिए **All upcoming events** पर tap करें, जो आपके [Me पेज](./me-page.md#upcoming) पर खुलती है, और इसमें आपके serving assignments और registrations भी शामिल हैं।
- **Giving** -- इस साल आपने कितना दिया है ("Given in" वर्तमान वर्ष के साथ), एक **Give** बटन, और आपके [donation history](../giving/donation-history.md) का **History** लिंक। यदि आपके church ने सदस्यों के giving history को पहले के वर्ष तक सीमित किया है या उसे छिपा दिया है, तो यह छिपा रहता है; तब आपके church का giving tool **More from** के अंतर्गत एक बटन के रूप में दिखता है।
- **More from** *आपका church* -- बाकी tools के बटन जो आपके church ने चालू किए हैं और जो पहले से tab bar में या ऊपर नहीं दिखाए गए हैं। जिन्हें आप सबसे ज़्यादा इस्तेमाल करते हैं, वे आगे आ जाते हैं।

serving, groups और giving सेक्शन केवल तभी दिखते हैं जब आप साइन इन हों, आपके church ने वह tool चालू किया हो, और आपके पास दिखाने के लिए कुछ हो -- उदाहरण के लिए, कोई आने वाली assignment या कम से कम एक group। कंप्यूटर पर, Home दो स्तंभों में लगा होता है।

यदि आप साइन-आउट हैं, तो Home greeting की जगह **Welcome** शीर्षक दिखाता है, एक छोटे संकेत ("Sign in to see your groups, giving, and more.") और **Sign In** बटन के साथ। यह संकेत तब भी दिखता है जब आपके church ने Home के लिए अभी कुछ और सेट न किया हो। आपका church इस संकेत को बदल सकता है या छिपा सकता है -- देखें [Mobile App Settings](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt)। जब यह छिपा हो, तब भी आप **More** पेज या **Me** पेज से साइन इन कर सकते हैं।

## नीचे का Tab Bar {#the-bottom-tab-bar}

फ़ोन पर, tab bar स्क्रीन के नीचे स्थिर रहता है:

- **Home** -- हमेशा पहला tab
- आपके church द्वारा कॉन्फ़िगर किए गए अधिकतम तीन tabs
- **More** -- More पेज खोलता है

Built-in स्क्रीन (जैसे Groups, Giving, या Plans) पहले tab स्थान पाती हैं; बचे हुए स्थान आपके church के custom पेजों को मिलते हैं। केवल बाहरी वेबसाइटों के लिंक और Verse of the Day को कभी tab नहीं दिया जाता। यदि आपके church ने फ़िट होने से ज़्यादा tabs कॉन्फ़िगर किए हैं, तो बाकी खोते नहीं: वे **More** पेज पर और Home पर **More from** सेक्शन में दिखते हैं। Church administrators tab का क्रम B1 Admin में **Mobile → Navigation** के अंतर्गत सेट करते हैं।

## कंप्यूटर पर {#on-a-computer}

बड़ी स्क्रीन पर, जैसे कंप्यूटर या बड़ा tablet, नीचे का tab bar स्क्रीन के ऊपर एक header से बदल जाता है जो आपके church के रंग में होता है। इसमें आपके church का logo दिखता है, या logo सेट न होने पर उसका नाम (उस पर click करके Home पर लौटें), **Home**, आपके church द्वारा कॉन्फ़िगर किए गए अधिकतम पांच tabs, और **More**, दाईं ओर bell और आपकी profile फ़ोटो के साथ। जब आप कोई detail स्क्रीन खोलते हैं, तो पेज की सामग्री के ऊपर **Back** लिंक दिखता है।

## More पेज {#the-more-page}

**More** पर tap करने पर `/mobile/more` पर More पेज खुलता है। इसमें शामिल है:

- आपका नाम और फ़ोटो, **Edit Profile** लिंक के साथ -- देखें [अपनी प्रोफ़ाइल संपादित करना](./editing-your-profile.md)
- आपके church के नाम के अंतर्गत, क्रम में, वे सभी tabs जो आपके church ने कॉन्फ़िगर किए हैं। बाहरी वेबसाइटों के लिंक नए browser tab में खुलते हैं।
- एक **Account** सेक्शन जिसमें:
  - **Me** -- आपका निजी पेज (केवल साइन इन होने पर)
  - **Appearance** -- **Light Mode** और **Dark Mode** के बीच बदलें
  - **Admin Portal** -- केवल तभी दिखता है जब आपके पास church में administrator अनुमतियां हों; यह B1 Admin को नए tab में खोलता है
  - **Install App** -- `/mobile/install` पर [इंस्टॉल निर्देश](./installing-pwa.md) खोलता है (ऐप इंस्टॉल होने के बाद छिप जाता है)
- **Sign out**, या साइन-आउट होने पर **Sign In** बटन
- आपके church का नाम और privacy policy का लिंक

## App Bar {#the-app-bar}

फ़ोन पर, हर स्क्रीन के ऊपर की bar में दिखता है:

- आपके church का logo (या यदि church ने logo अपलोड नहीं किया है तो उसका नाम) Home और अन्य मुख्य स्क्रीन पर, या किसी detail स्क्रीन में गहराई से जाने पर back arrow। स्क्रीन का शीर्षक पेज के सबसे ऊपर दिखता है।
- Notifications और messages के लिए **bell** icon, जिसमें अपठित आइटमों का badge होता है -- नीचे [Notifications और Messages](#notifications-and-messages) देखें
- आपकी **profile फ़ोटो**, जो `/mobile/profileEdit` पर आपकी profile खोलती है -- देखें [अपनी प्रोफ़ाइल संपादित करना](./editing-your-profile.md)

bell और profile फ़ोटो केवल साइन इन होने पर दिखते हैं।

## Notifications और Messages {#notifications-and-messages}

bell पर tap करने से एक panel खुलता है जिसमें दो सेक्शन हैं:

- **Messages** -- आपकी सबसे हाल की निजी बातचीत, **New message** लिंक के साथ नई शुरू करने के लिए
- **Notifications** -- आपकी सबसे हाल की notifications, अपठित पर **New** badge के साथ। किसी notification पर tap करें ताकि उस group, plan या conversation पर जा सकें जहां से वह आई थी।

हर सेक्शन दिखाता है कि उसमें कितने अपठित आइटम हैं। पूरा inbox `/mobile/notifications` पर खोलने के लिए नीचे **See all** पर tap करें।

## सेक्शन वाले पेज {#pages-with-sections}

Detail पेज -- एक group, एक plan, आपका Me पेज, Plans और Giving स्क्रीन -- tabs के बजाय सेक्शनों के एक पेज के रूप में लगे होते हैं। हर सेक्शन एक छोटा preview दिखाता है, और सेक्शन के header में एक लिंक (जैसे **All members**, **All events**, या **Full service order**) पूरी सूची खोलता है। उस view के ऊपर का **Back to** लिंक आपको उस पेज पर लौटाता है जहां से आप आए थे।

## Me पेज {#the-me-page}

**Me** (`/mobile/me`) आपका निजी केंद्र है। यह आपका नाम और फ़ोटो **Edit Profile** और **Settings** ([notification preferences](./notification-preferences.md)) बटनों के साथ दिखाता है, फिर वह सब जो आपके लिए आने वाला है -- serving assignments, event registrations, और group events -- उसके बाद आपका household, आपके groups, इस साल आपकी [giving](../giving/), सबमिट किए गए forms, attendance history, आपकी [registrations](../events/my-registrations.md), और हाल की notifications और messages। विवरण के लिए देखें [Me पेज](./me-page)।

यदि आप साइन-आउट हैं, तो Me पेज की जगह **Sign In** बटन दिखता है।

## अपनी Home Screen पर इंस्टॉल करना {#installing-to-your-home-screen}

सदस्य पोर्टल एक Progressive Web App है। अपने device के लिए चरण-दर-चरण निर्देशों के लिए `/mobile/install` खोलें (या More पेज पर **Install App** चुनें)। इंस्टॉल होने के बाद, यह आपकी home screen से browser के बिना, पूरी स्क्रीन पर खुलता है। देखें [Installing as an App (PWA)](./installing-pwa.md)।

## आपके Church की सार्वजनिक वेबसाइट {#your-churchs-public-website}

सदस्य पोर्टल के बाहर, आपके church की सार्वजनिक वेबसाइट का अपना header navigation है, जिसमें आपके administrators द्वारा कॉन्फ़िगर किए गए लिंक हैं -- जैसे [sermons](../content/sermons.md), [Bible](../content/bible.md), [live streaming](../content/live-streaming.md), और एक सार्वजनिक group सूची। फ़ोन पर ये लिंक header में ऊपर-दाईं ओर hamburger icon के पीछे होते हैं।

:::info
आपके church के अनुसार tabs और tools अलग-अलग होते हैं। Administrators B1 Admin के माध्यम से तय करते हैं कि सदस्यों को कौन से सेक्शन दिखें, इसलिए यदि यहां वर्णित कोई feature आपको नहीं दिखता, तो हो सकता है आपके church ने उसे चालू न किया हो।
:::
