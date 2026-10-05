---
title: "उपलब्धता कैलेंडर"
---

# उपलब्धता कैलेंडर

<div class="article-intro">

Availability Calendar आपको अपने पूरे चर्च में सभी room और resource bookings का एक bird's-eye view देता है। यहां से आप देख सकते हैं कि क्या scheduled है, conflicts को उनके होने से पहले spot करें, और किसी भी event के लिए सीधे एक room या resource को book करें।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- Rooms & Resources section में कम से कम एक [room या resource](rooms-resources) को सेट अप करें
- B1 Admin में Calendars section तक edit access की आवश्यकता है

</div>

## Availability Calendar को खोलना

B1 Admin में, [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (शीर्ष-बाएं खोज बार) खोलें, **Calendars** विस्तृत करें, और **Availability** पर क्लिक करें।

## Calendar को पढ़ना

Calendar डिफ़ॉल्ट रूप से current month को display करता है। आप शीर्ष पर arrows के साथ आगे और back navigate कर सकते हैं, या month, week, और day views के बीच switch कर सकते हैं।

प्रत्येक event booking status द्वारा color-coded है:

| Color | Meaning |
|-------|---------|
| Green | Approved |
| Orange | Pending approval |
| Grey | Blocked out (not available) |

एक event पर hovering करने से event title और room या resource दिखाई देता है जिससे यह attached है।

## Room या Resource द्वारा Filter करना

Calendar को एक single room या resource तक narrow करने के लिए शीर्ष left में **Filter** dropdown का उपयोग करें। पूर्ण view में वापस लौटने के लिए **All Rooms & Resources** select करें।

## एक Room या Resource को Book करना

1. page के top right corner में **Book** बटन पर क्लिक करें।
2. जो dialog खुल जाता है उसमें, event details को fill करें:
   - **Title** — event का नाम
   - **Start** और **End** date/time
   - **Visibility** — Public या Private
   - **Rooms** — reserve करने के लिए एक या अधिक rooms select करें
   - **Resources** — reserve करने के लिए एक या अधिक resources select करें
3. Optionally **Setup** और **Teardown** times को set करें (minutes में)। ये booking को दोनों ends पर pad करते हैं ताकि space को setup और cleanup के लिए reserve किया जा सके, भले ही event start/end times समान रहें।
4. Booking को repeat करने के लिए, **Repeats** को check करें और recurrence को configure करें:
   - **Repeat every** -- interval को set करें (उदाहरण के लिए, हर 2 weeks)।
   - **Frequency** -- Daily, Weekly, या Monthly। Weekly आपको week के specific day(s) को pick करने देता है; Monthly आपको month के एक fixed day या एक relative pattern जैसे "the second Tuesday" को pick करने देता है।
   - **Ends** -- Never, एक specific date पर, या एक set number के occurrences के बाद।
5. एक custom booking window को specify करने के लिए (event start/end से भिन्न), **Custom Booking Window** को toggle करें और window start और end times को enter करें। यह उपयोग करें जब एक room को event के listed hours के बाहर accessible होने की आवश्यकता हो।
6. Booking को submit करने के लिए **Save** पर क्लिक करें।

:::info
यदि room या resource के पास एक **Approval Group** configured है, तो booking उस group के एक leader द्वारा approve किए जाने तक **Pending** के रूप में दिखाई देगा। [Calendar Approvals](approvals) को approval workflow के लिए देखें।
:::

:::tip
Calendar save करने से पहले कोई conflicts को highlight करेगा। यदि आप एक conflict warning देखते हैं, तो अपने times को adjust करें या एक भिन्न room को चुनें।
:::

## संबंधित आलेख

- [Rooms, Resources & Scheduling](rooms-resources) — bookable spaces और equipment को सेट अप करें
- [Calendar Approvals](approvals) — booking requests को approve या deny करें
- [Creating Calendars](creating-calendars) — event calendars को manage करें
