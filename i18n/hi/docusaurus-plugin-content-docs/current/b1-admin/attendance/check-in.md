---
title: "चेक-इन"
---

# चेक-इन {#check-in}

<div class="article-intro">

B1 Admin, साथी **B1 Checkin** ऐप के माध्यम से सेवाओं में self check-in की सुविधा देता है। सदस्य पहुंचने पर kiosks या समर्पित devices पर खुद को और अपने परिवार को check in कर सकते हैं, जिससे प्रक्रिया तेज़ होती है और आपके volunteers का काम कम होता है। हर check-in अपने-आप attendance के रूप में दर्ज हो जाता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- आपके campuses, service times, और groups [Attendance Setup](setup.md) में कॉन्फ़िगर होने चाहिए।
- आपके database में [लोग](../people/adding-people.md) होने चाहिए, जिनके [households](../people/adding-people.md#managing-households) सेट हों, ताकि परिवार एक साथ check in कर सकें।
- आपको एक tablet चाहिए और वैकल्पिक रूप से एक Brother label printer (नीचे [hardware recommendations](#recommended-hardware) देखें)।

</div>

## यह कैसे काम करता है {#how-it-works}

B1 Checkin ऐप आपके B1 Admin attendance setup से जुड़ता है। जब कोई सदस्य check in करता है, तो उसकी attendance सही campus, service time, और group के अंतर्गत अपने-आप दर्ज हो जाती है। जो लोग check-in system का उपयोग करते हैं, उनकी attendance आपको मैन्युअली दर्ज करने की ज़रूरत नहीं है।

## चेक-इन सेट करना {#setting-up-check-in}

1. **पहले अपनी attendance संरचना कॉन्फ़िगर करें।** B1 Admin में **People > Attendance** पर जाएं और **Setup** पर click करें, ताकि आपके campuses, service times, और groups सही जगह पर हों। check-in ऐप इसी कॉन्फ़िगरेशन पर निर्भर करता है। वैकल्पिक रूप से, हर service time को [check-in schedule](setup.md#setting-a-check-in-schedule) दें, ताकि check-in हर हफ्ते अपने-आप खुले और बंद हो। Schedules service के campus के time zone का उपयोग करते हैं, या यदि campus का time zone सेट नहीं है तो आपके church के time zone का। Kiosk जिस service time की window बंद है, उसे **Closed** दिखाता है और परिवारों को बताता है कि check-in कब खुलेगा। विवरण के लिए [Attendance Setup](setup.md) देखें।
2. **जिन devices का उपयोग करना चाहते हैं, उन पर B1 Checkin ऐप इंस्टॉल करें।** यह ऐप निम्न platforms पर उपलब्ध है:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung Tablets:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire Tablets:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **अपने church के account credentials से B1 Checkin ऐप में sign in करें।**
4. **वर्तमान gathering के लिए campus और service time चुनें।**
5. सदस्य अब device पर अपना नाम खोज सकते हैं और check in कर सकते हैं।

:::tip
Check-in devices को ऐसी जगहों पर रखें जो दिखें और आसानी से पहुंच में हों, जैसे lobby के entrance या welcome desk। सेवाओं के दौरान एक छोटी announcement से सदस्यों को पता चलता है कि यह विकल्प उपलब्ध है।
:::

:::tip
यदि आपके church में कई campuses हैं, तो [Attendance Setup](setup.md) में हर campus के लिए setup दोहराना होगा। हर check-in device को अलग campus के लिए कॉन्फ़िगर किया जा सकता है।
:::

## सुझाए गए hardware {#recommended-hardware}

**Tablets** -- इन में से कोई भी ऐप के साथ अच्छी तरह काम करता है:

- **Compact:** Samsung Galaxy Tab A7 Lite 8.7"
- **Large Screen:** Samsung Galaxy Tab A8 10.5"
- **Budget:** Amazon Fire HD 10

**Printers** -- name tags प्रिंट करने के लिए check-ins Brother label printers के साथ काम करते हैं:

- **Best:** Brother QL-1110NWB (Bluetooth और WiFi के माध्यम से कई tablets का समर्थन करता है)
- **Good:** Brother QL-810W (WiFi के माध्यम से कई tablets का समर्थन करता है)
- **Budget:** Brother QL-1100 (केवल WiFi)

**Labels:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
केवल Brother label printers B1 Checkin ऐप के साथ compatible हैं। अन्य printer brands name tags प्रिंट करने के लिए काम नहीं करेंगे।
:::

:::info
अपने printer का setup निर्देश पालन करके उसे अपने tablet के उसी WiFi network से जोड़ें। Brother printer drivers और setup guides [Brother support site](https://support.brother.com) पर मिलेंगे।
:::

## Kiosk का रूप कस्टमाइज़ करना {#customizing-the-kiosk-appearance}

आप B1 Checkin ऐप का रूप और अनुभव अपने church की branding से मिलाने के लिए कस्टमाइज़ कर सकते हैं। B1 Admin में **Mobile > B1 CheckIn** पर जाएं और **Kiosk Theme** card का उपयोग करके ये सेट करें:

### रंग {#colors}

अपनी church की branding से मिलाने के लिए आठ रंग सेटिंग्स कस्टमाइज़ करें:

- **Primary** और **Primary Contrast** -- मुख्य brand color और उसका text color।
- **Secondary** और **Secondary Contrast** -- accent color और उसका text color।
- **Header Background** और **Subheader Background** -- kiosk के header क्षेत्रों के रंग।
- **Button Background** और **Button Text** -- interactive buttons के रंग।

### Background image {#background-image}

kiosk के welcome और lookup screens के लिए एक वैकल्पिक background image अपलोड करें। अनुशंसित आकार 1920x1080 pixels है।

### Idle screen / Screensaver {#idle-screen--screensaver}

एक screensaver कॉन्फ़िगर करें जो कुछ समय की निष्क्रियता के बाद चालू हो:

1. Idle screen को **on** या **off** करें।
2. **timeout** सेट करें (निष्क्रियता के कितने सेकंड बाद screensaver शुरू हो, न्यूनतम 10 सेकंड)।
3. एक या अधिक **slides** जोड़ें -- हर slide में एक image और प्रदर्शन की अवधि होती है (न्यूनतम 3 सेकंड)।

:::tip
जब kiosk सक्रिय रूप से उपयोग में न हो, तब idle screen पर announcements, आने वाले events, या welcome messages दिखाने के लिए इसका उपयोग करें।
:::

## QR code के जरिए guest registration {#guest-registration-via-qr-code}

check-in kiosk एक QR code दिखा सकता है, जिसे आगंतुक स्कैन करके अपने फ़ोन पर खुद और अपने परिवार को register कर सकते हैं। इससे पहली बार आने वाले guests के लिए check-in प्रक्रिया तेज़ होती है।

जब कोई guest QR code स्कैन करता है, तो उसे एक [guest registration page](../../b1-church/checkin/guest-registration) पर ले जाया जाता है, जहां वह अपना नाम, email, और परिवार के सदस्य दर्ज करता है। इसके बाद एक volunteer kiosk पर उसे खोजकर check in कर सकता है।

### QR guest registration सक्षम करना {#enabling-qr-guest-registration}

QR code दिखाना चालू करने के लिए:

1. B1 Admin में [Jump menu](../introduction.md#getting-around-with-the-jump-menu) खोलें (ऊपर-बाईं ओर का search bar) और **Mobile** को expand करें।
2. **B1 CheckIn** पर click करें।
3. **QR Guest Registration** को on करें और **Save** पर click करें।

:::note
यह सेटिंग **Mobile > B1 CheckIn** के अंतर्गत है (उसी page पर जहां **Kiosk Theme** card है), Attendance के अंतर्गत नहीं। Attendance page पर **Kiosk** action में इस page का link है।
:::

### Registration link साझा करना {#sharing-the-registration-link}

QR guest registration सक्षम होने पर, toggle के नीचे **Share registration QR code** section दिखता है। इससे kiosk QR code के अलावा guests को registration form तक पहुंचाने के दो तरीके मिलते हैं:

- **Copy link** -- registration URL को कॉपी करता है, ताकि आप उसे अपनी church website, emails, या कहीं भी online पेस्ट कर सकें।
- **Download PNG** -- QR code को एक image के रूप में डाउनलोड करता है, जिसे आप flyers, bulletins, या signage पर प्रिंट कर सकते हैं।

:::tip
Registration link को अपनी church website के "Plan Your Visit" या "I'm New" page पर जोड़ें, ताकि guests आने से पहले ही register कर सकें।
:::

## क्या रिकॉर्ड होता है {#what-gets-recorded}

हर check-in B1 Admin में एक attendance record बनाता है। आप इन records को [Attendance](tracking-attendance.md) page पर और हर [group के](../groups/group-members.md) sessions में देख सकते हैं, ठीक वैसे ही जैसे मैन्युअली दर्ज attendance देखी जाती है। डेटा कैसा दिखता है, इसमें कोई अंतर नहीं है -- दोनों तरीके एक ही reports में जाते हैं।
