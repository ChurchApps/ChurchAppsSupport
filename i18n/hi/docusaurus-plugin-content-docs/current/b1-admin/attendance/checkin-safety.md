---
title: "चेक-इन सुरक्षा"
---

# चेक-इन सुरक्षा

<div class="article-intro">

B1 में चेक-इन के लिए बाल-सुरक्षा नियंत्रणों का एक सेट शामिल है: कमरे की क्षमता की सीमाएं और स्वयंसेवक-से-बाल अनुपात, kiosk पर आयु और ग्रेड guidance, चेक-इन types जो सदस्यों, अतिथियों, और स्वयंसेवकों को distinguish करते हैं, और एक household के लिए trusted-pickup list जो check-out पर verified है। यह पृष्ठ covers करता है कि B1 Admin में प्रत्येक safety feature को कैसे configure करें।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- अपनी [attendance structure](setup.md) और [check-in kiosks](check-in.md) को सेटअप करें
- Rooms [groups](../groups/creating-groups.md) हैं जो service times से linked हैं -- नीचे दिए गए safety settings group पर रहती हैं
- Page-a-parent और emergency broadcast को एक connected texting provider की आवश्यकता है ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream), या Mutual Ministry)

</div>

## कमरे की क्षमता और एक कमरे को बंद करना

प्रत्येक check-in room (group) अपनी स्वयं की सीमाओं को enforce कर सकता है। Group को खोलें, सेटिंग्स को edit करने के लिए **pencil icon** को click करें, और **Check-In Capacity** section को खोजें:

- **Capacity** -- अधिकतम संख्या लोगों की जो एक बार इस कमरे में check in हो सकते हैं। जब कमरा भरा हो, इसे चेक-इन blocked है और kiosk भरे हुए कमरे को नाम देता है।
- **Guest Capacity** -- कमरे कितने guests को रख सकता है इसकी एक optional अलग cap।
- **Closed for Check-In** -- इस कमरे को सभी check-ins को तुरंत रोकने के लिए **Yes** पर सेट करें (उदाहरण के लिए, जब एक class cancel हो या कमरा unavailable हो)। Check-outs अभी भी काम करते हैं।

## स्वयंसेवक अनुपात

Group पर same **Check-In Capacity** section में staffing rules शामिल हैं:

- **Children per Volunteer** -- अधिकतम संख्या बच्चों की कि प्रत्येक checked-in स्वयंसेवक cover कर सकता है (उदाहरण के लिए 5 का मतलब है एक स्वयंसेवक प्रति पाँच बच्चों के लिए)।
- **Minimum Volunteers** -- smallest संख्या स्वयंसेवकों की जो check in होने चाहिए इससे पहले कि बच्चे कमरे में check in हो सकें।

स्वयंसेवक इन नियमों की ओर count करते हैं जब वे kiosk पर **Volunteer** type के साथ check in करते हैं ([Check-In Types](#check-in-types) नीचे देखें)।

### Warn बनाम Block चुनना

कितनी कड़ाई से अनुपातों को enforce किया जाता है यह एक church-wide सेटिंग है:

1. B1 Admin में, **Settings > Manage Church** पर जाएं और **Check-In** tile को खोलें।
2. **Volunteer Ratio Enforcement** सेट करें:
   - **Warn (allow with confirmation)** -- Kiosk एक warning दिखाता है जब एक कमरा ratio से ऊपर हो या अपने minimum volunteers से नीचे हो, और एक staff member anyway proceed करने की confirm कर सकते हैं। यह default है।
   - **Block (prevent check-in)** -- कमरे को check-in refuse किया जाता है जब तक पर्याप्त स्वयंसेवक check in न हों।

:::info
Capacity और Closed for Check-In हमेशा hard limits हैं -- warn/block choice केवल स्वयंसेवक अनुपातों पर लागू होता है।
:::

## चेक-इन Types

हर check-in records करता है कि व्यक्ति एक **Member**, **Guest**, या **Volunteer** है। Type को kiosk household screen पर chips के साथ चुना जाता है (Member default है)। Types safety rules को feed करते हैं -- स्वयंसेवक ratio coverage प्रदान करते हैं, और अतिथि कमरे के Guest Capacity के विरुद्ध count करते हैं।

## आयु और ग्रेड कमरे की Guidance

आप प्रत्येक कमरे को आयु या ग्रेड bounds दे सकते हैं ताकि kiosk families को appropriate rooms की ओर guide करे:

- Group की सेटिंग्स पर, minimum/maximum age (years और months) और/या ग्रेड कमरे के लिए set करने के लिए **Age & Grade** section का उपयोग करें।
- Kiosk पर, एक बाल के लिए qualify करने वाले कमरे को highlight किया जाता है और कमरे जो वह नहीं करते हैं dimmed हैं। एक dimmed कमरे को अभी भी एक staff confirmation के साथ choose किया जा सकता है -- guidance कभी नहीं hard-blocks।

Grades आपके church की **grade promotion date** पर roll over करते हैं:

1. B1 Admin में, **Settings > Manage Church** पर जाएं और grade promotion tile को खोलें।
2. महीना और दिन set करें जब आपका church students को promote करता है (उदाहरण के लिए, August 1)। Kiosk पर ages और grades most recent promotion date के रूप में computed हैं।

## Trusted और Not-Authorized Pickup लोग

प्रत्येक household उन लोगों की एक list carry कर सकता है जो -- या नहीं हैं -- अपने बच्चों को pick up करने की अनुमति दी गई है।

1. **People** में एक व्यक्ति के page को खोलें और **Pickup** card को खोजें।
2. **Add** को click करें। एक existing व्यक्ति के लिए search करें, या **Name**, **Relationship**, और एक photo enter करके system में किसी को जोड़ें जो नहीं है।
3. **Status** सेट करें:
   - **Trusted** -- Check-out पर, यह व्यक्ति उनके photo के साथ एक tappable pickup card के रूप में दिखाई देता है, verified pickup को fast बनाते हुए।
   - **Not Authorized** -- यदि कोई इस नाम के अंतर्गत pickup attempt करता है, kiosk एक warning के साथ check-out को block करता है। एक staff member override कर सकते हैं, और override को attendance record पर recorded किया जाता है।

Card पर एक व्यक्ति के status chip को Trusted और Not Authorized के बीच toggle करने के लिए click करें।

:::tip
जब भी possible हो trusted pickup लोगों में photos जोड़ें -- check-out screen को photo दिखाता है ताकि स्वयंसेवक visually verify कर सकें कि person उनके सामने खड़ा है।
:::

## Page-a-Parent और Emergency Broadcast

दोनों features अपने church के connected texting provider के माध्यम से text messages भेजते हैं -- कोई built-in SMS service नहीं है, इसलिए supported providers में से एक को पहले configure किया जाना चाहिए।

- **Page a parent** -- एक manned kiosk के check-out screen से, staff एक checked-in बाल के माता-पिता/guardians को text कर सकते हैं (उदाहरण के लिए, "कृपया nursery में आएं")।
- **Emergency broadcast** -- Kiosk की admin settings से, staff selected service के लिए हर checked-in household के guardians को एक बार text कर सकते हैं। **EMERGENCY** type करके sending को confirm करने की आवश्यकता है।

लोग जिन्होंने texts को opt out किया है, या जिनके पास file पर कोई mobile number नहीं है, स्वचालित रूप से skipped हैं -- kiosk रिपोर्ट करता है कि कितने messages भेजे गए और कितने skipped किए गए।

Kiosk-side walkthrough देखें [Check-Out & Child Safety](../../b1-checkin/check-in/checking-out) में।

## संबंधित लेख

- [Check-In](check-in.md) -- kiosk setup और hardware
- [Check-Out & Child Safety](../../b1-checkin/check-in/checking-out) -- kiosk check-out, pickup verification, और paging flows
- [Creating Groups](../groups/creating-groups.md) -- जहां room settings रहती हैं
- [Attendance Setup](setup.md) -- services, service times, और room assignments
