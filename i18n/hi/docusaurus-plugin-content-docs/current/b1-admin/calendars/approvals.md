---
title: "कैलेंडर स्वीकृति"
---

# कैलेंडर स्वीकृति

<div class="article-intro">

Approvals page वह जगह है जहां administrators pending room और resource booking requests को review और act करते हैं, साथ ही calendar events जिन्हें published होने से पहले approval की आवश्यकता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- Rooms या resources को एक **Approval Group** के साथ कॉन्फ़िगर करें [Rooms & Resources](rooms-resources) में
- आपको **Calendars Admin** अनुमति या **content.edit** अनुमति चाहिए

</div>

## Approvals खोलना

B1 Admin में, [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (शीर्ष-बाएं खोज बार) खोलें, **Calendars** विस्तृत करें, और **Approvals** पर क्लिक करें। Pending booking requests और review के लिए waiting events यहां list किए जाते हैं।

## Booking Requests

जब एक group एक event बनाता है और एक room या resource का request करता है, तो request **Room & Resource Requests** panel में दिखाई देता है। प्रत्येक row दिखाता है:

- Requested किया जा रहा room या resource
- Event का नाम और date/time
- Requesting group

### Conflict Indicators

यदि एक ही room या resource के लिए दो requests overlap करते हैं, तो एक conflict warning icon दिखाई देता है। किसी एक को approve करने से पहले conflicting requests को सावधानीपूर्वक review करें।

### Approving या Rejecting

किसी भी booking request पर **✓** (approve) या **✗** (reject) icon पर क्लिक करें। Requesting group को निर्णय की notification मिलती है। Approved bookings उस room या resource के लिए event के लिए locked होते हैं; rejected bookings दूसरों के लिए slot को free करते हैं।

जब आप approve पर क्लिक करते हैं, एक **Approve booking** dialog खुल जाता है ताकि आप एक ही step में event को भी publish कर सकें:

1. **Publish to public calendar** को check करें ताकि event को अपने group के calendar पर public बनाया जा सके। Unchecked छोड़ें ताकि event की visibility को change किए बिना booking को approve किया जा सके।
2. एक बार **Publish to public calendar** को check कर दिया जाए, तो आप optionally **Also add to calendar** से एक curated calendar चुन सकते हैं ताकि event को एक भी अपने [curated calendars](curated-calendar) में जोड़ा जा सके। इसे **None** पर सेट करके छोड़ें ताकि यह skip किया जा सके। (यह option केवल तब दिखाई देता है यदि आपके पास **content.edit** अनुमति है।)
3. **Approve** पर क्लिक करें।

## Pending Events

यदि आपकी calendar workflow events को events को public के लिए visible होने से पहले approval की आवश्यकता है, तो pending events **Event Requests** panel में दिखाई देते हैं। एक event को approve करें ताकि इसे calendar को publish किया जा सके, या reject करें ताकि submitter को notify किया जा सके कि changes की आवश्यकता है।

:::tip
एक room पर Approval Group को [Rooms & Resources](rooms-resources) में setup करें ताकि उस room के लिए approval की requirement दी जा सके। Access वाले groups तब events बनाते समय room को request कर सकते हैं, और वह requests इस page में flow करते हैं।
:::

## संबंधित आलेख

- [Rooms, Resources & Scheduling](rooms-resources) — bookable rooms और resources को कॉन्फ़िगर करें
- [Creating Calendars](creating-calendars) — calendars और events को manage करें
