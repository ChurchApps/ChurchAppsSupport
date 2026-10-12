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

जब एक group एक event बनाता है और एक room या resource का request करता है, तो request **Room & Resource Requests** section में दिखाई देता है। प्रत्येक row दिखाता है:

- Event का नाम और date/time
- Requested किया जा रहा room या resource (multi-unit resources के लिए quantity के साथ)
- एक status badge जो दिखाता है कि request में conflicts हैं या नहीं

### Conflict Indicators

यदि एक request उसी room या resource की किसी दूसरी booking या blockout के साथ overlap करती है, तो उसकी status पर **Conflicts** badge दिखाई देता है; विवरण देखने के लिए उस पर hover करें। जिन requests में कोई overlap नहीं है उन पर **No conflicts** दिखता है। किसी एक को approve करने से पहले conflicting requests को सावधानीपूर्वक review करें।

### Approving या Rejecting

किसी भी booking request पर **Approve** या **Reject** पर क्लिक करें (reject करने से पहले पुष्टि मांगी जाती है)। Requesting group को निर्णय की notification मिलती है। Approved bookings उस room या resource के लिए event के लिए locked होते हैं; rejected bookings दूसरों के लिए slot को free करते हैं।

जब आप **Approve** पर क्लिक करते हैं, एक **Approve booking** dialog खुल जाता है ताकि आप एक ही step में event को भी publish कर सकें:

1. **Publish to public calendar** को check करें ताकि event को अपने group के calendar पर public बनाया जा सके। Unchecked छोड़ें ताकि event की visibility को change किए बिना booking को approve किया जा सके।
2. एक बार **Publish to public calendar** को check कर दिया जाए, तो आप optionally **Also add to calendar** से एक curated calendar चुन सकते हैं ताकि event को एक भी अपने [curated calendars](curated-calendar) में जोड़ा जा सके। इसे **None** पर सेट करके छोड़ें ताकि यह skip किया जा सके। (यह option केवल तब दिखाई देता है यदि आपके पास **content.edit** अनुमति है।)
3. **Approve** पर क्लिक करें।

## Pending Events

यदि आपकी calendar workflow events को events को public के लिए visible होने से पहले approval की आवश्यकता है, तो pending events **Event Requests** section में दिखाई देते हैं। Calendar पर event publish करने के लिए **Approve** पर क्लिक करें, या submitter को notify करने के लिए **Reject** पर क्लिक करें कि changes की आवश्यकता है।

:::tip
एक room पर Approval Group को [Rooms & Resources](rooms-resources) में setup करें ताकि उस room के लिए approval की requirement दी जा सके। Access वाले groups तब events बनाते समय room को request कर सकते हैं, और वह requests इस page में flow करते हैं।
:::

## संबंधित आलेख

- [Rooms, Resources & Scheduling](rooms-resources) — bookable rooms और resources को कॉन्फ़िगर करें
- [Creating Calendars](creating-calendars) — calendars और events को manage करें
