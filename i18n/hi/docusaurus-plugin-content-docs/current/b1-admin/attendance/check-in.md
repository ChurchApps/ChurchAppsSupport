---
title: "चेक-इन"
---

# चेक-इन

<div class="article-intro">

B1 Admin एक साथी **B1 Checkin** ऐप के माध्यम से सेवाओं में स्व-चेक-इन को सपोर्ट करता है। सदस्य जब आते हैं तो kiosks या समर्पित डिवाइसों पर अपने और अपने परिवार को चेक-इन कर सकते हैं, जिससे प्रक्रिया तेज़ होती है और आपके स्वयंसेवकों पर काम कम हो जाता है। हर चेक-इन स्वचालित रूप से attendance के रूप में दर्ज हो जाता है।

</div>

<div class="prereqs">
<h4>शुरुआत से पहले</h4>

- आपके campuses, service times, और groups को [Attendance Setup](setup.md) में कॉन्फ़िगर किया जाना चाहिए।
- आपके डेटाबेस में [लोग होने चाहिए](../people/adding-people.md) जिनके [households](../people/adding-people.md#managing-households) सेट अप हों ताकि परिवार एक साथ चेक-इन कर सकें।
- आपको एक टैबलेट की जरूरत होगी और वैकल्पिक रूप से Brother लेबल प्रिंटर (नीचे [recommended hardware](#recommended-hardware) देखें)।

</div>

## यह कैसे काम करता है

B1 Checkin ऐप आपके B1 Admin attendance सेटअप से जुड़ता है। जब कोई सदस्य चेक-इन करता है, तो उनकी attendance स्वचालित रूप से सही campus, service time, और group के विरुद्ध दर्ज हो जाती है। आपको चेक-इन सिस्टम का उपयोग करने वाले किसी के लिए भी manually attendance दर्ज करने की आवश्यकता नहीं है।

## चेक-इन सेटअप करना

1. **पहले अपनी attendance structure को कॉन्फ़िगर करें।** B1 Admin में, **Attendance > Setup** पर जाएं और सुनिश्चित करें कि आपके campuses, service times, और groups जगह पर हैं। चेक-इन ऐप इस कॉन्फ़िगरेशन पर निर्भर करता है। विवरण के लिए [Attendance Setup](setup.md) देखें।
2. **B1 Checkin ऐप** को उन डिवाइसों पर इंस्टॉल करें जिन्हें आप उपयोग करना चाहते हैं। ऐप निम्नलिखित प्लेटफ़ॉर्म पर उपलब्ध है:
   - **Android/Samsung Tablets:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire Tablets:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **अपने चर्च के account credentials का उपयोग करके B1 Checkin ऐप में साइन इन करें।**
4. **वर्तमान gathering के लिए campus और service time चुनें।**
5. अब सदस्य डिवाइस पर अपना नाम खोज सकते हैं और चेक-इन कर सकते हैं।

:::tip
चेक-इन डिवाइसों को दृश्यमान, आसानी से पहुंचने वाली जगहों जैसे लॉबी entrances या welcome desks में रखें। सेवाओं के दौरान एक brief announcement सदस्यों को बताता है कि यह विकल्प उपलब्ध है।
:::

:::tip
यदि आपके चर्च के कई campuses हैं, तो आपको [Attendance Setup](setup.md) में प्रत्येक campus के लिए setup को दोहराना होगा। प्रत्येक चेक-इन डिवाइस को एक अलग campus के लिए कॉन्फ़िगर किया जा सकता है।
:::

## अनुशंसित Hardware

**Tablets** — ये ऐप के साथ अच्छी तरह काम करते हैं:

- **Compact:** Samsung Galaxy Tab A7 Lite 8.7"
- **Large Screen:** Samsung Galaxy Tab A8 10.5"
- **Budget:** Amazon Fire HD 10

**Printers** — चेक-इन Brother लेबल प्रिंटर के साथ नाम टैग प्रिंट करने के लिए काम करते हैं:

- **Best:** Brother QL-1110NWB (Bluetooth और WiFi के माध्यम से कई tablets को सपोर्ट करता है)
- **Good:** Brother QL-810W (WiFi के माध्यम से कई tablets को सपोर्ट करता है)
- **Budget:** Brother QL-1100 (केवल WiFi)

**Labels:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
केवल Brother लेबल प्रिंटर B1 Checkin ऐप के साथ compatible हैं। अन्य printer brands नाम टैग प्रिंट करने के लिए काम नहीं करेंगे।
:::

:::info
अपने printer के setup instructions को follow करें ताकि यह अपने tablet के समान WiFi नेटवर्क से जुड़ जाए। आप [Brother support site](https://support.brother.com) पर Brother printer drivers और setup guides पा सकते हैं।
:::

## Kiosk Appearance को Customize करना

आप B1 Checkin ऐप के look और feel को अपने चर्च के branding से match करने के लिए customize कर सकते हैं। B1 Admin में, **Attendance > Kiosk Theme** पर जाएं और निम्नलिखित को कॉन्फ़िगर करें:

### Colors

अपने चर्च branding से match करने के लिए आठ color settings को customize करें:

- **Primary** और **Primary Contrast** -- Main brand color और इसका text color।
- **Secondary** और **Secondary Contrast** -- Accent color और इसका text color।
- **Header Background** और **Subheader Background** -- Kiosk header areas के लिए colors।
- **Button Background** और **Button Text** -- Interactive buttons के लिए colors।

### Background Image

Kiosk welcome और lookup screens के लिए एक optional background image अपलोड करें। Recommended size 1920x1080 pixels है।

### Idle Screen / Screensaver

एक screensaver कॉन्फ़िगर करें जो inactivity की एक अवधि के बाद activate हो:

1. Idle screen को **on** या **off** करें।
2. **timeout** को सेट करें (screensaver शुरू होने से पहले inactivity के कितने seconds, minimum 10 seconds)।
3. एक या अधिक **slides** जोड़ें -- प्रत्येक slide का एक image और एक display duration है (minimum 3 seconds)।

:::tip
जब kiosk actively उपयोग में न हो तो announcements, upcoming events, या welcome messages दिखाने के लिए idle screen का उपयोग करें।
:::

## QR Code के माध्यम से Guest Registration

चेक-इन kiosk एक QR code दिखा सकता है जो visitors अपने फोन पर स्कैन करते हैं ताकि वे अपने और अपने परिवार को खुद register कर सकें। यह पहली बार आने वाले guests के लिए चेक-इन प्रक्रिया को तेज़ करता है।

जब कोई guest QR code स्कैन करता है, तो उन्हें एक [guest registration page](../../b1-church/checkin/guest-registration) पर ले जाया जाता है जहां वे अपना नाम, email, और family members को दर्ज करते हैं। फिर एक volunteer उन्हें kiosk पर ढूंढ सकता है और उन्हें चेक-इन कर सकता है।

### QR Guest Registration को Enable करना

QR code display को turn on करने के लिए:

1. B1 Admin में, **Mobile** को left sidebar में जाएं (phone icon)।
2. **Check-In** tab को चुनें।
3. **QR Guest Registration** को on करें।

:::note
यह setting **Mobile** के तहत है, Attendance > Kiosk Theme के तहत नहीं।
:::

## क्या रिकॉर्ड होता है

हर चेक-इन B1 Admin में एक attendance record बनाता है। आप [Attendance](tracking-attendance.md) और [Groups](../groups/group-members.md) tabs पर इन records को manually entered attendance की तरह देख सकते हैं। इसमें कोई अंतर नहीं है कि डेटा कैसे दिखाई देता है — दोनों तरीके एक ही reports में feed होते हैं।
