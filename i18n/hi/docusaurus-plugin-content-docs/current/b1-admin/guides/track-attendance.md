---
title: "गाइड: चर्च की उपस्थिति (Attendance) ट्रैक करें"
description: "B1 Admin में campuses और service times सेट करके, उपस्थिति को मैन्युअली या self check-in से दर्ज करके, और reports पढ़कर चर्च की उपस्थिति ट्रैक करें।"
---

# चर्च की उपस्थिति ट्रैक करें

<div class="article-intro">

अपनी services और groups के लिए attendance ट्रैकिंग सेट करें — campuses और service times कॉन्फ़िगर करने से लेकर उपस्थिति को मैन्युअली या self-service check-in ऐप से दर्ज करने और reports में रुझान देखने तक। अंत में, आपके पास यह पूरी तस्वीर होगी कि कौन आ रहा है और कब।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- admin पहुँच वाला B1 Admin account
- [आपकी directory में जोड़े गए लोग](../people/adding-people.md)
- वे ministries जिन्हें आप ट्रैक करना चाहते हैं, उनके [बनाए गए groups](../groups/creating-groups.md)

</div>

## चरण 1: Campuses और Services कॉन्फ़िगर करें {#step-1-configure-campuses--services}

तय करें कि आपका चर्च कहाँ और कब मिलता है।

इन कामों के लिए [Attendance Setup](../attendance/setup.md) गाइड का पालन करें:

1. [Jump menu](../introduction.md#getting-around-with-the-jump-menu) में **People > Attendance** चुनें और **Setup** पर क्लिक करें
2. अपना campus (जैसे "Main Campus") और उसकी services जोड़ें
3. service times जोड़ें (जैसे "Sunday 9:00 AM", "Sunday 11:00 AM", "Wednesday 7:00 PM")

## चरण 2: Group Attendance ट्रैकिंग चालू करें {#step-2-enable-group-attendance-tracking}

उन groups के लिए attendance ट्रैकिंग चालू करें जिन पर आप नज़र रखना चाहते हैं।

इन कामों के लिए [Creating Groups](../groups/creating-groups.md) गाइड का पालन करें:

1. हर वह group खोलें जिसे आप ट्रैक करना चाहते हैं, **Edit** पर क्लिक करें, और **Track Attendance** को **Yes** पर सेट करें
2. अगर group किसी service के दौरान मिलता है, तो **Add Service Time** में समय चुनें और plus बटन दबाएँ ताकि उपस्थिति सही service के साथ दर्ज हो, फिर **Save** पर क्लिक करें

:::info
हर group को attendance ट्रैकिंग की ज़रूरत नहीं होती। इसे उन groups के लिए चालू करें जिनकी भागीदारी पर आप नज़र रखना चाहते हैं — जैसे बच्चों की कक्षाएँ, small groups, Sunday school, आदि।
:::

## चरण 3: Attendance मैन्युअली दर्ज करें {#step-3-record-attendance-manually}

हर service और group में आए लोगों पर निशान लगाएँ।

इन कामों के लिए [Recording Attendance](../attendance/recording-attendance.md) गाइड का पालन करें:

1. कोई group खोलें, उसके **Sessions** सेक्शन में **All sessions** पर क्लिक करें, **New** पर क्लिक करें, और **Service Time** और **Session Date** चुनें। उस service time की हर कक्षा के लिए एक साथ sessions बनाने हेतु **Also add for the other _N_ groups in _service time_** चेक करें।
2. जो लोग आए उन पर निशान लगाएँ और **Save Attendance** पर क्लिक करें

अगर आपको नामों की बजाय केवल कुल संख्या चाहिए (जैसे मुख्य service के लिए), तो **Attendance** पेज पर **Enter headcount** पर क्लिक करें — देखें [Headcount Entry](../attendance/headcount-entry.md)।

:::tip
मैन्युअल ट्रैकिंग वयस्कों की services, small groups, और ऐसी किसी भी स्थिति के लिए बहुत अच्छी है जहाँ check-in kiosk व्यावहारिक न हो।
:::

## चरण 4: Self Check-In सेट करें (वैकल्पिक) {#step-4-set-up-self-check-in-optional}

सदस्यों को tablet kiosk के माध्यम से खुद check in करने दें।

इन कामों के लिए [Check-In](../attendance/check-in.md) गाइड का पालन करें:

1. self-service check-in के लिए tablet पर B1 Checkin ऐप इंस्टॉल करें
2. सदस्य अपना नाम खोजते हैं और खुद व अपने परिवार को check in करते हैं
3. Check-in की उपस्थिति के रिकॉर्ड मैन्युअली दर्ज रिकॉर्ड के साथ दिखते हैं — डेटा में कोई अंतर नहीं होता

:::info
hardware और printer कॉन्फ़िगरेशन सहित पूर्ण बच्चों की ministry सेटअप के लिए देखें [Children's Check-In Guide](./childrens-checkin.md)।
:::

## चरण 5: Attendance Reports देखें {#step-5-view-attendance-reports}

अपने चर्च में भागीदारी की बड़ी तस्वीर देखें।

[Attendance Reports](../reports/attendance-reports.md) गाइड का पालन करें। **Attendance** पेज पर **All years** पर क्लिक करें ताकि ये reports tabs के रूप में मिलें:

1. **Attendance Trend** — समय के साथ उपस्थिति देखें और बढ़ोतरी या गिरावट पहचानें
2. **Headcount Trend** — आपके हाथ से दर्ज किए गए headcount totals का चार्ट बनाएँ
3. **Group Attendance** — किसी तारीख की सीमा में हर group session में कौन आया, यह देखें, CSV डाउनलोड के साथ

किसी एक group की दिन-प्रतिदिन गिनती के लिए, **Daily Group Attendance** report खोलें, जो **admin.b1.church/reports/dailyGroupAttendance** पर है।

:::info
attendance reports मैन्युअली दर्ज और self-check-in दोनों तरह की उपस्थिति को मिलाते हैं। डेटा कैसे दिखता है इसमें कोई अंतर नहीं है — दोनों तरीके एक ही reports में जाते हैं।
:::

## हो गया! {#youre-done}

आपकी attendance ट्रैकिंग सेट हो चुकी है। चाहे आप उपस्थिति मैन्युअली दर्ज करें, check-in ऐप इस्तेमाल करें, या दोनों — सारा डेटा एक ही reports में आता है ताकि आपके चर्च की भागीदारी की स्पष्ट तस्वीर मिले।

## संबंधित लेख {#related-articles}

- [Attendance Setup](../attendance/setup.md) — campuses और services कॉन्फ़िगर करें
- [Headcount Entry](../attendance/headcount-entry.md) — नामों के बिना कुल संख्या दर्ज करें
- [Recording Attendance](../attendance/recording-attendance.md) — उपस्थिति मैन्युअली दर्ज करें
- [Tracking Attendance](../attendance/tracking-attendance.md) — उपस्थिति के रुझान देखें
- [Check-In](../attendance/check-in.md) — self-service check-in ऐप
- [Creating Groups](../groups/creating-groups.md) — attendance ट्रैकिंग वाले groups सेट करें
- [Attendance Reports](../reports/attendance-reports.md) — उपस्थिति के रुझान देखें
- [Children's Check-In Guide](./childrens-checkin.md) — पूर्ण बच्चों की ministry check-in सेटअप
