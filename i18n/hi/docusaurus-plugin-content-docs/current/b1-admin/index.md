---
title: "B1 Admin अवलोकन"
---

# B1 Admin अवलोकन

<div class="article-intro">

B1 Admin आपका church management dashboard है। यह आपके church के संचालन के हर पहलू को प्रबंधित करने के उपकरण देता है -- member directory और donations से लेकर website बनाने और live streaming तक -- सब कुछ एक ही जगह से।

</div>

## शुरू करना

1. अपना browser खोलें और [admin.b1.church](https://admin.b1.church) पर जाएं
2. अपने username और password से sign in करें
3. आप **Dashboard** पर पहुंचेंगे, जो आपका home page है। यह इस हफ्ते का service order, कौन real time में check in और serve कर रहा है, जिस पर आपका ध्यान चाहिए (जैसे pending approvals या join requests), आपके open tasks, और आपके groups दिखाता है

:::tip
B1 Admin में नए हैं? वीडियो walkthrough के लिए [Introduction](./introduction) से शुरू करें, फिर [Settings](./settings/) पर जाकर अपनी church की जानकारी कॉन्फ़िगर करें और अपनी team को आमंत्रित करें।
:::

## आपका Dashboard

Dashboard आपका B1 Admin home page (`/`) है। यह आपके church की साप्ताहिक service के इर्द-गिर्द बना है:

- **इस हफ्ते की service** -- मौजूदा या आने वाले plan का नाम और service का क्रम, पूरे plan के link के साथ
- **Live status** -- जैसे ही लोग Sunday को check in करना शुरू करते हैं, page दिखाता है कि कमरे में कितने लोग हैं, इस घंटे कौन serve कर रहा है, पहली बार आए guests, और capacity bars के साथ हर कमरे का विवरण
- **Needs Attention** -- pending approvals और group join requests जिन पर कार्रवाई चाहिए
- **My tasks** और **My Groups** -- आपके open tasks (**Add Task** से एक जोड़ें, या पूरी सूची के लिए **All tasks** पर click करें) और वे groups जिनके आप सदस्य हैं

Dashboard पर क्या दिखता है यह आपकी [भूमिका](./settings/roles-permissions.md) पर निर्भर करता है। उदाहरण के लिए, पूरे plan का link केवल तभी दिखता है जब आप वह plan खोल सकते हैं (आप plans संपादित करते हैं, plan के ministry के सदस्य हैं, या उस पर serve कर रहे हैं), और **All groups** link केवल तब दिखता है जब आप groups प्रबंधित कर सकते हैं, group members देख सकते हैं, या people देख सकते हैं।

:::tip
Sermons, Calendars, Mobile, और Settings सहित हर section, B1 Admin के ऊपर-बाईं ओर [Jump menu](./introduction.md#getting-around-with-the-jump-menu) में है। उसे खोलने के लिए click करें या **Ctrl+K** (या **Cmd+K**) दबाएं, फिर ब्राउज़ करें या टाइप करना शुरू करें।
:::

## मुख्य विशेषताएं

- **[People](./people/)** - अपनी church directory प्रबंधित करें, सदस्य जोड़ें, bulk में डेटा संपादित करें, और household या sortable table के अनुसार ब्राउज़ करें। हर व्यक्ति एक ही record page पर खुलता है, जिसमें उसका विवरण बाईं ओर और उपस्थिति, giving, groups, notes और forms के सार उसके बगल में होते हैं। [Notes](./people/notes) पेज लोगों, groups, events और workflow cards में हाल के notes की सूची देता है
- **[Groups](./groups/)** - join requests, सदस्य प्रबंधन, group email, व्यक्तिगत group texts, और छपने योग्य contact rosters के साथ church groups बनाएं और व्यवस्थित करें। हर group एक ही पेज पर खुलता है, जिसकी कार्रवाइयां बाईं ओर और सदस्य, sessions, calendar और health के सार उनके बगल में होते हैं
- **[Attendance](./attendance/)** - campuses और service times सेट करें, नामित उपस्थिति ट्रैक करें जिसमें छपने योग्य class roll sheets हों, देखें कि कौन सी classes की उपस्थिति अभी दर्ज होनी बाकी है, trend reports के साथ सरल headcounts लॉग करें, हर service time को check-in schedule दें ताकि self check-in अपने-आप खुले और बंद हो (हर campus के समय क्षेत्र में), और पहली बार आए guests को आपके चुने हुए fields के साथ [QR code](./attendance/check-in#guest-registration-via-qr-code) से sign up करने दें
- **[Donations](./donations/)** - कई मुद्राओं में giving दर्ज करें, funds प्रबंधित करें, किसी व्यक्ति के रिकॉर्ड से एक गिफ़्ट लॉग करें, batches प्रिंट करें (एक-एक करके या तारीख की सीमा के भीतर सभी) fund subtotals के साथ, batches गिने जाने के बाद बंद करें, CSV फ़ाइल से batch आयात करें, **Enter Donations** अनुमति के साथ गिनती टीमों को गिफ़्ट दर्ज करने दें, और आपके church के logo के साथ छपे statements बनाएं
- **[Serving](./serving/)** - volunteers का समन्वय करें, service plans बनाएं (या हर हफ्ते 12 हफ्तों तक एक plan आगे copy करें), push, email या text से reminders भेजें, **Text Volunteers** से तय सभी लोगों को text करें, tasks प्रबंधित करें, और लोगों को चरण-दर-चरण workflows से आगे बढ़ाएं जो emails और texts भेज सकते हैं, staff सदस्य को सूचित कर सकते हैं, उपस्थिति दर्ज कर सकते हैं, और ट्रैक कर सकते हैं कि volunteers ने अपने serving assignments की पुष्टि की या नहीं
- **[Forms](./forms/)** - registrations और डेटा संग्रह के लिए custom forms बनाएं, header photo जोड़ें, stand-alone forms को QR code से साझा करें, और किसी form को group से जोड़ें ताकि उसके leaders उत्तर पढ़ और प्रिंट कर सकें
- **[Reports](./reports/)** - birthday, attendance, और donation reports देखें
- **[Website](./website/)** - अपनी church website बनाएं और प्रबंधित करें, custom navigation styles के साथ, अपनी GA4 ID से अपनी site और B1 app पर visits ट्रैक करें, या सार्वजनिक site बंद करके केवल member portal रखें
- **[Sermons](./sermons/)** - अपनी sermon library, live streaming, और एक अपने-आप बनने वाला podcast feed प्रबंधित करें
- **[Calendars](./calendars/)** - चुने हुए calendars बनाएं, room/resource bookings प्रबंधित करें, और उपलब्धता देखें
- **[Settings](./settings/)** - एक ही scrolling पेज से सब कुछ कॉन्फ़िगर करें, जिसमें quick-jump सूची हो: church की जानकारी, region, date और phone number format, texting (अपने Twilio account सहित), सदस्य संख्या के साथ roles, permissions, और custom person fields

:::info
किसी भी पेज के ऊपर-दाईं ओर के प्रश्न चिह्न icon पर click करके त्वरित सहायता और documentation पाएं। रंग theme (**Default**, **Classic**, या **Custom**) बदलने या light और dark mode के बीच स्विच करने के लिए, अपना user menu खोलें और **Theme Preferences** का उपयोग करें।
:::

सहायता के लिए, [support@churchapps.org](mailto:support@churchapps.org) पर email करें।
