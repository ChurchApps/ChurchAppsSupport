---
title: "Check-In"
---

# Check-In

<div class="article-intro">

B1 Admin सहयोगी **B1 Checkin** app के माध्यम से सेवाओं में self check-in का समर्थन करता है। सदस्य पहुंचने पर kiosks या समर्पित devices पर खुद को और अपने परिवार को check in कर सकते हैं, जिससे प्रक्रिया तेज़ होती है और volunteers का बोझ कम होता है। हर check-in अपने आप attendance के रूप में दर्ज होता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- आपके campuses, service times, और groups [Attendance Setup](setup.md) में कॉन्फ़िगर होने चाहिए।
- आपके पास [database में लोग](../people/adding-people.md) होने चाहिए, जिनके [households](../people/adding-people.md#managing-households) सेट हों ताकि परिवार एक साथ check in कर सके।
- आपको एक tablet और वैकल्पिक रूप से एक Brother label printer चाहिए (नीचे [hardware recommendations](#recommended-hardware) देखें)।

</div>

## यह कैसे काम करता है

B1 Checkin app आपके B1 Admin attendance setup से जुड़ता है। जब कोई सदस्य check in करता है, तो उसकी attendance सही campus, service time, और group के अंतर्गत अपने आप दर्ज हो जाती है। जो लोग check-in system का उपयोग करते हैं, उनके लिए आपको attendance manually दर्ज करने की ज़रूरत नहीं है।

## Check-In सेट अप करना

1. **पहले अपनी attendance संरचना कॉन्फ़िगर करें।** B1 Admin में, **People > Attendance** पर जाएं और **Setup** पर click करें, ताकि आपके campuses, service times, और groups मौजूद हों। check-in app इसी कॉन्फ़िगरेशन पर निर्भर है। वैकल्पिक रूप से हर service time को एक [check-in schedule](setup.md#setting-a-check-in-schedule) दें ताकि check-in हर हफ्ते अपने आप खुले और बंद हो। Schedules आपके चर्च के time zone का उपयोग करते हैं, या यदि चर्च का time zone सेट नहीं है तो आपके campus के time zone का; kiosk उन service times को छिपा देता है जिनकी window बंद है, और परिवारों को बताता है कि check-in अभी खुला नहीं है। विवरण के लिए [Attendance Setup](setup.md) देखें।
2. **B1 Checkin app इंस्टॉल करें** उन devices पर जिन्हें आप उपयोग करना चाहते हैं। यह app निम्न platforms पर उपलब्ध है:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung Tablets:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire Tablets:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. अपने चर्च के account credentials से **B1 Checkin app में sign in करें**।
4. वर्तमान gathering के लिए **campus और service time चुनें**।
5. अब सदस्य device पर अपना नाम खोजकर check in कर सकते हैं।

:::tip
Check-in devices ऐसी जगह रखें जहां वे दिखें और आसानी से पहुंचे जा सकें, जैसे lobby के प्रवेश द्वार या welcome desks। सेवाओं के दौरान एक संक्षिप्त घोषणा से सदस्यों को पता चलता है कि यह विकल्प उपलब्ध है।
:::

:::tip
यदि आपके चर्च में कई campuses हैं, तो [Attendance Setup](setup.md) में हर campus के लिए setup दोहराना होगा। हर check-in device को अलग campus के लिए कॉन्फ़िगर किया जा सकता है।
:::

## अनुशंसित Hardware {#recommended-hardware}

**Tablets** — इनमें से कोई भी app के साथ अच्छी तरह काम करता है:

- **Compact:** Samsung Galaxy Tab A7 Lite 8.7"
- **Large Screen:** Samsung Galaxy Tab A8 10.5"
- **Budget:** Amazon Fire HD 10

**Printers** — check-ins name tags प्रिंट करने के लिए Brother label printers के साथ काम करते हैं:

- **Best:** Brother QL-1110NWB (Bluetooth और WiFi के माध्यम से कई tablets का समर्थन करता है)
- **Good:** Brother QL-810W (WiFi के माध्यम से कई tablets का समर्थन करता है)
- **Budget:** Brother QL-1100 (केवल WiFi)

**Labels:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
केवल Brother label printers B1 Checkin app के साथ संगत हैं। अन्य brands के printers name tags प्रिंट नहीं करेंगे।
:::

:::info
अपने printer के setup निर्देशों का पालन करके उसे उसी WiFi network से जोड़ें जिससे आपका tablet जुड़ा है। Brother printer drivers और setup guides [Brother support site](https://support.brother.com) पर मिलेंगे।
:::

## Kiosk का रूप अनुकूलित करना

आप B1 Checkin app का रूप और अनुभव अपने चर्च की branding से मिलाने के लिए बदल सकते हैं। B1 Admin में, **Mobile > B1 CheckIn** पर जाएं और **Kiosk Theme** card का उपयोग करके configure करें:

### Colors

अपने चर्च की branding से मिलाने के लिए आठ color settings को अनुकूलित करें:

- **Primary** और **Primary Contrast** -- मुख्य brand color और उसका text color।
- **Secondary** और **Secondary Contrast** -- accent color और उसका text color।
- **Header Background** और **Subheader Background** -- kiosk header क्षेत्रों के colors।
- **Button Background** और **Button Text** -- interactive buttons के colors।

### Background Image

Kiosk की welcome और lookup screens के लिए एक वैकल्पिक background image अपलोड करें। अनुशंसित आकार 1920x1080 pixels है।

### Idle Screen / Screensaver

एक screensaver कॉन्फ़िगर करें जो निष्क्रियता की एक अवधि के बाद सक्रिय हो:

1. Idle screen को **on** या **off** toggle करें।
2. **timeout** सेट करें (निष्क्रियता के कितने सेकंड बाद screensaver शुरू हो, न्यूनतम 10 सेकंड)।
3. एक या अधिक **slides** जोड़ें -- हर slide में एक image और प्रदर्शन की अवधि होती है (न्यूनतम 3 सेकंड)।

:::tip
जब kiosk सक्रिय रूप से उपयोग नहीं हो रहा हो, तब idle screen पर घोषणाएं, आने वाले events, या स्वागत संदेश दिखाने के लिए उसका उपयोग करें।
:::

## QR Code से Guest Registration

Check-in kiosk एक QR code दिखा सकता है जिसे स्कैन करके आगंतुक अपने फ़ोन पर खुद और अपने परिवार को register कर सकते हैं। इससे पहली बार आने वाले guests के लिए check-in प्रक्रिया तेज़ होती है।

जब कोई guest QR code स्कैन करता है, तो वह एक [guest registration page](../../b1-church/checkin/guest-registration) पर पहुंचता है जहां वे अपना नाम, email और परिवार के सदस्य भरते हैं। फिर एक volunteer kiosk पर उन्हें खोजकर check in कर सकता है।

### QR Guest Registration चालू करना

QR code display चालू करने के लिए:

1. B1 Admin में, [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ऊपर-बाईं ओर का search bar) खोलें और **Mobile** को expand करें।
2. **B1 CheckIn** पर click करें।
3. **QR Guest Registration** को on toggle करें और **Save** पर click करें।

:::note
यह setting **Mobile > B1 CheckIn** के अंतर्गत है (वही पेज जहां **Kiosk Theme** card है), Attendance के अंतर्गत नहीं। Attendance पेज पर **Kiosk** action में इस पेज का link है।
:::

### Registration Link साझा करना

एक बार QR Guest Registration चालू होने पर, toggle के नीचे **Share registration QR code** section दिखता है। इससे kiosk QR code के अलावा guests को registration form तक पहुंचाने के दो तरीके मिलते हैं:

- **Copy link** — registration URL copy करता है, ताकि आप उसे अपनी church website पर, emails में, या कहीं भी ऑनलाइन चिपका सकें।
- **Download PNG** — QR code को एक image के रूप में download करता है, जिसे आप flyers, bulletins, या signage पर प्रिंट कर सकते हैं।

:::tip
Registration link को अपनी church website के "Plan Your Visit" या "I'm New" पेज पर जोड़ें, ताकि guests पहुंचने से पहले ही register कर सकें।
:::

## क्या दर्ज होता है

हर check-in B1 Admin में एक attendance record बनाता है। ये records आप [Attendance](tracking-attendance.md) पेज पर और हर [group's](../groups/group-members.md) sessions में देख सकते हैं, ठीक वैसे ही जैसे manually दर्ज attendance। डेटा का दिखावा अलग नहीं होता — दोनों तरीके एक ही reports में जाते हैं।
