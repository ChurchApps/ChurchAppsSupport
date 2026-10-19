---
title: "Calendars बनाना"
---

# Calendars बनाना

<div class="article-intro">

B1 Admin में calendar बनाने से आप एक या अधिक groups को जोड़कर events का एक curated view बना सकते हैं। Events group leaders अपने groups के भीतर प्रबंधित करते हैं, और आपका calendar उन events को एक ही जगह दिखाता है। Edit access वाले Admins किसी भी group के लिए events जोड़ या edit कर सकते हैं। गैर-admin group leaders केवल उन groups के events प्रबंधित कर सकते हैं जिनका वे नेतृत्व करते हैं।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- उन [groups](../groups/creating-groups.md) को सेट करें जिनके events आप अपने calendar में शामिल करना चाहते हैं
- B1 Admin में Calendars section तक administrative access की ज़रूरत है

</div>

## नया Calendar बनाना

1. B1 Admin में, [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ऊपर-बाएं कोने का search bar) खोलें, **Calendars** को विस्तृत करें, और **Calendars** पर क्लिक करें।
2. पेज के ऊपर **Add Calendar** पर क्लिक करें। calendar सूची के नीचे नया calendar फ़ॉर्म खुलता है।
3. अपने calendar के लिए **नाम** दर्ज करें (उदाहरण के लिए, "Youth Ministry Events" या "Main Church Calendar")।
4. वैकल्पिक **विवरण** जोड़ें, ताकि आपकी team समझ सके कि यह calendar किसलिए है।
5. नया calendar सहेजने के लिए **Create** पर क्लिक करें।

## Calendar Detail Page

नया calendar बनाने के बाद, उसकी पंक्ति पर **Manage Events** पर क्लिक करें ताकि detail page खुले। इस page के दो मुख्य हिस्से हैं:

- **बायां कॉलम** -- calendar का नाम उसकी actions (**New Event**, **Edit**, **Import .ics**, और **Print**) के साथ, इसके बाद **Groups in Calendar** सूची, जो दिखाती है कि कौन-से groups इस calendar में शामिल हैं। किसी group को calendar से हटाने के लिए उसके आगे **Remove** पर क्लिक करें।
- **मुख्य क्षेत्र** -- **Calendar Events** view, जिसमें जुड़े हुए groups से लिए गए events दिखते हैं, और ऊपर **Subscribe** और **Add Group** बटन हैं।

## Groups जोड़ना

जिन groups के calendar में events हैं, वे अपने-आप detail page के बाईं ओर **Groups in Calendar** सूची में दिखते हैं।

1. इस calendar से group जोड़ने के लिए calendar के ऊपर **Add Group** पर क्लिक करें।
2. ड्रॉपडाउन से group चुनें।
3. चुनें कि उस group से **सभी events** शामिल करने हैं या केवल **विशिष्ट events**।
4. **Save** पर क्लिक करें।

:::tip
Groups को calendar से जोड़ना events को अपने-आप इकट्ठा करने का एक शक्तिशाली तरीका है। जब कोई group leader अपने [group](../groups/creating-groups.md) में event जोड़ता है, तो वह आपके church-wide calendar में बिना आपकी किसी अतिरिक्त मेहनत के आ सकता है।
:::

:::info
अगर आप एक ही calendar बनाना चाहते हैं जो church के कई groups से events खींचे, तो एक सरल तरीके के लिए [Curated Calendar](curated-calendar) देखें।
:::

## Events जोड़ना और Edit करना {#adding-and-editing-events}

किसी event को जोड़ने के लिए calendar detail page पर **New Event** पर क्लिक करें, या बदलने के लिए calendar पर कोई event खोलकर **Edit** पर क्लिक करें। **New Event** / **Edit Event** फ़ॉर्म में ये fields हैं:

- **Group** -- वह group जिससे event जुड़ा है। अगर आपके church में event templates हैं, तो आप फ़ॉर्म भरने के लिए **Template** भी चुन सकते हैं।
- **Title** (शीर्षक)
- **Event photo** -- कोई image चुनने या अपलोड करने के लिए **Add Photo** (या खाली photo box) पर क्लिक करें, जो एक चौड़े 16:9 आकार में crop होती है। उसे बदलने के लिए **Change Photo** पर क्लिक करें। यह photo आपकी website पर event के page के ऊपर दिखती है, और जब Calendar element **Upcoming events** दिखाता है, तो उसकी tile के रूप में (देखें [Showing Events on Your Website](#showing-events-on-your-website))।
- **Description** (विवरण) -- आपकी website पर event के page पर दिखता है। Bold text, lists और links समर्थित हैं।
- **Start** और **End**, **Repeats**, और **Visibility** (**Public** या **Private**)।
- **Tags** -- comma-separated labels, जैसे `youth, students`। आपकी website पर Calendar element को केवल एक निश्चित tag वाले events दिखाने के लिए सेट किया जा सकता है। यह वही **Tags** field है जो event की registration settings में भी दिखता है।
- **Who can view notes** और **Who can post notes** -- कौन event के notes पढ़ और जोड़ सकता है (देखें [Event Notes](#event-notes))। **Staff only** (डिफ़ॉल्ट), **Group leaders** (event के group के leaders), या **Group members** (event के group के सभी लोग, उसके leaders सहित) में से चुनें।
- **Rooms** और **Resources** -- event के लिए जगह और उपकरण आरक्षित करें। देखें [Rooms, Resources & Scheduling](rooms-resources)।

**Save** पर क्लिक करें। अगर event repeat होता है, तो B1 पुष्टि मांगता है, क्योंकि सेव करने पर series की हर occurrence अपडेट होती है।

### Event Notes {#event-notes}

हर event का अपना notes thread होता है, जो planning और follow-up के लिए है। calendar detail page पर किसी event पर क्लिक करें; dialog में event का विवरण, उसके reminders, और नीचे उसके **Notes** दिखते हैं। एक note टाइप करें और उसे thread में जोड़ने के लिए post करें।

जिन staff के पास content edit करने या calendars administer करने की permission है, वे हमेशा event notes पढ़ और post कर सकते हैं। Event पर **Who can view notes** और **Who can post notes** settings तय करते हैं कि event के group के leaders या members भी ऐसा कर सकते हैं या नहीं।

### आपकी Website पर Events दिखाना {#showing-events-on-your-website}

अपनी website पर calendar रखने के लिए, किसी page में **Calendar** element जोड़ें और यह calendar चुनें। element एक month calendar या upcoming-event tiles की grid दिखा सकता है, और उसे एक tag वाले events तक सीमित किया जा सकता है। जो visitors किसी event पर क्लिक करते हैं, वे उस event के अपने page पर जाते हैं। देखें [Using the Calendar element](../website/page-editor.md#using-the-calendar-element)।

## Event Registration सक्षम करना {#enabling-event-registration}

आप किसी भी calendar event के लिए registration सक्षम कर सकते हैं, ताकि members B1 website या mobile app के माध्यम से साइन अप कर सकें।

1. किसी मौजूदा event पर क्लिक करें या नया event बनाएं।
2. event editor में, **Registration** को toggle करके सक्षम करें।
3. Registration settings कॉन्फ़िगर करें:
   - **Capacity** (वैकल्पिक) -- registrations की अधिकतम संख्या सेट करें। असीमित के लिए खाली छोड़ें।
   - **Registration Opens** -- वह तारीख और समय जब registration उपलब्ध होती है।
   - **Registration Closes** -- वह तारीख और समय जब registration बंद होती है।
   - **Tags** -- comma-separated labels (जैसे "youth, retreat, vbs") ताकि registerable events को वर्गीकृत करने में मदद मिले।
   - **Registration Questions** -- वैकल्पिक रूप से एक [form](../forms/creating-forms.md) जोड़ें, ताकि registrants साइन अप के दौरान अतिरिक्त सवालों के जवाब दें (जैसे dietary restrictions, T-shirt size, emergency contact, आदि)। सवाल छोड़ने के लिए **None** चुनें।
   - **Enable Waitlist** -- जब event भर जाए, तो अतिरिक्त registrants को दूर भेजने के बजाय waitlist में शामिल होने दें। देखें [Paid Registrations](paid-registrations#waitlist)।
4. event सहेजें।

Paid events के लिए, वही settings page आपको मूल्य वाले **Attendee Types**, वैकल्पिक **Selections** (add-ons), और **Discount Codes** परिभाषित करने देता है, जिसमें भुगतान आपके church के giving provider के माध्यम से लिया जाता है। पूरी प्रक्रिया के लिए देखें [Paid Registrations](paid-registrations)।

एक बार registration सक्षम हो जाने पर, जब members [B1 website](../../b1-church/events/registering) या [B1 Mobile app](../../b1-mobile/events/registering) पर event देखेंगे, तो उन्हें **Register for this Event** बटन दिखेगा। अगर आपने form जोड़ा है, तो registrants को registration के दौरान एक **Questions** चरण दिखता है और उनके जवाब उनके registration के साथ सहेजे जाते हैं।

:::info
Registration Questions केवल उन forms के साथ काम करते हैं जो **Restricted** चिह्नित नहीं हैं। Restricted form registration के दौरान दिखाए जाने के बजाय अपने-आप छोड़ दिया जाता है, इसलिए event के साथ सवाल जोड़ते समय एक unrestricted form का उपयोग करें।
:::

### Registrations प्रबंधित करना

अपने events के registrations देखने और प्रबंधित करने के लिए:

1. Jump menu में, **Calendars > Registrations** चुनें।
2. आपको सभी उन events की एक table दिखेगी जिनमें registration सक्षम है, जिसमें event का शीर्षक, तारीख, वर्तमान registration संख्या बनाम capacity, और tags होंगे।
3. पूरी registrations सूची देखने के लिए किसी event पर क्लिक करें, जिसमें नाम, member count, attendee types, payment status, और registration की तारीख शामिल हैं।
4. detail page से, आप ये कर सकते हैं:
   - **Add Attendee** -- किसी ऐसे व्यक्ति को मैन्युअली register करें जिसने offline या फ़ोन पर साइन अप किया हो।
   - व्यक्तिगत registrations को **Cancel** करें
   - registrations को स्थायी रूप से **Delete** करें
   - जब जगह खाली हो, तो waitlisted registrations को **Promote** करें
   - **Export CSV** -- सभी registrations download करें, जिसमें attendee types, selections, payment amounts, और question answers शामिल हैं

अगर event के साथ Registration Questions जुड़े हैं, तो detail page पर **Unanswered questions only** filter भी दिखता है, जिससे उन registrants को जल्दी ढूंढा जा सके जिन्होंने अभी तक जवाब नहीं दिए हैं, और हर उत्तर दिए गए registration पर **View Answers** बटन दिखता है ताकि उनके जवाब देखे जा सकें। Paid events में **Type** column, **Paid / Total** column, प्रति-type counts, और एक payments detail dialog जुड़ जाते हैं -- देखें [Paid Registrations](paid-registrations#the-registration-roster)।

:::tip
यह देखने के लिए कि events कितनी तेज़ी से भर रहे हैं, capacity progress bar का उपयोग करें। जब event capacity पर या उससे ऊपर होता है, तो bar लाल हो जाता है।
:::

## आगे के कदम

- [Curated Calendar](curated-calendar) -- कई groups से खींचने वाला calendar बनाएं
- [Paid Registrations](paid-registrations) -- Attendee types, add-on selections, discount codes, payments, और waitlists
- [Event Registration Guide](../guides/event-registration) -- event registration सेट करने की चरण-दर-चरण गाइड
- [Calendars Overview](./) -- calendars के overview पर वापस जाएं
