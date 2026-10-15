---
title: "Group Details"
---

# Group Details

<div class="article-intro">

जब आप groups page से किसी group पर click करते हैं, तो आप group detail page पर पहुंचते हैं। आप क्या देखते हैं, यह इस पर निर्भर करता है कि आप logged in हैं या नहीं -- logged in सदस्यों को अतिरिक्त sections और features दिखते हैं।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- [groups ब्राउज़ करके](./browsing-groups.md) देखने के लिए कोई group खोजें।
- हर section तक पूरी पहुंच के लिए, अपने account में [log in](../getting-started/logging-in.md) करें।

</div>

## Visitor View (Logged In नहीं)

यदि आप logged in नहीं हैं, तो आपको ये दिखेंगे:

- **Header** -- group का नाम, उसके meeting time और location के साथ। computer पर, उसके ऊपर group की photo दिखती है।
- **Sign in to join** -- group के नाम के नीचे एक button। group join करने या join request भेजने के लिए sign in करें (या account बनाएं)। sign in करने के बाद, आप वापस group पर लौटते हैं और सीधे join step पर पहुंच जाते हैं।
- **About** -- group का पूरा विवरण, जो उसका उद्देश्य और क्या अपेक्षित है यह समझाता है।
- **Leaders** -- group के leaders के नाम। किसी leader की profile देखने के लिए उनके नाम पर tap कर सकते हैं।
- **Upcoming Events** -- group के अगले तीन आने वाले events, हर एक में तारीख, समय, और event का शीर्षक, और जब event में registration हो तो **Register** link। यदि group के कोई आने वाले events नहीं हैं, तो यह section छिपा रहता है।

## Member View (Logged In)

यदि आप logged in हैं पर group के सदस्य नहीं हैं, तो आपको group का header और **About** section दिखता है, साथ में group को join करने का विकल्प (नीचे [Joining a Group](#joining-a-group) देखें)। आगे बताए गए sections तब दिखते हैं जब आप सदस्य बनते हैं।

जब आप सदस्य होते हैं, तो group के header में उसका नाम, meeting day, समय, और location दिखता है, और यदि आपके church ने group chat चालू किया है तो **Open chat** button। यदि आप group के leader हैं, तो नाम के नीचे **You · Leader** tag दिखता है। computer पर, header बाईं ओर एक column में group की photo के साथ रहता है, और sections उसके दाईं ओर दिखते हैं।

page sections का एक पन्ना है। हर section एक छोटा preview दिखाता है, और section के header में एक link पूरा view खोलता है; लौटने के लिए **Back to** *group name* पर tap करें। उपलब्ध sections ये हैं:

- **Next event** -- group का अगला आने वाला event, **Going** / **Maybe** / **Can't go** buttons के साथ (देखें [Event RSVPs](./event-rsvps.md))। group का calendar खोलने के लिए **All events** पर tap करें: महीनों के बीच जाने के लिए arrows का उपयोग करें, और **Calendar** (एक month grid जहां किसी दिन पर tap करके उसके events देखे जाते हैं) और **List** (महीने के events तारीख के क्रम में, दिन के अनुसार समूहित) के बीच switch करें। जब आप वर्तमान महीना देख रहे हों, तो सूची आज से शुरू होती है, इसलिए वह केवल वही दिखाती है जो अभी आने वाला है। यदि group के events में tags हैं, तो आप tag से filter कर सकते हैं।
- **This week's lesson** -- यदि आपका group किसी Lessons.church plan type से जुड़ा है और इस हफ्ते के lesson में माता-पिता के घर ले जाने वाली content है, तो वह **Next event** के नीचे दिखती है (केवल सदस्यों के लिए)।
- **Messages** -- group chat के नवीनतम संदेश। पढ़ने और पोस्ट करने के लिए **Open chat** पर tap करें। केवल सदस्यों को दिखता है, और केवल तभी जब आपके church ने इस group के लिए group chat चालू किया हो। अधिक विवरण के लिए [Group Conversations](./conversations.md) देखें।
- **Members** -- group के सदस्यों का preview (पहले leaders), और सदस्यों व leaders की गिनती। पूरी सूची के लिए **All members** पर tap करें, जिसे आप **Search Members** से खोज सकते हैं। किसी सदस्य का नाम tap करके [member directory](../community/member-directory.md) में उनकी profile देखें।
- **Resources** -- group के लिए पोस्ट की गई पहली कुछ साझा files और links। सभी देखने के लिए **All resources** पर tap करें; अपलोड की गई files डाउनलोड कर सकते हैं या linked resources खोल सकते हैं।
- **Plans** -- group का अगला service plan। सभी देखने के लिए **All plans** पर tap करें। केवल तभी दिखता है जब group के पास plans हों।
- **Attendance** -- केवल group leaders (और attendance permission वाले staff) को दिखता है। दिखाता है कि attendance आखिरी बार कब ली गई थी; group मीटिंग में कौन आया यह दर्ज करने के लिए **Take attendance** पर tap करें।
- **About** -- group का पूरा विवरण, rich text formatting के साथ प्रदर्शित। केवल तभी दिखता है जब group का कोई विवरण हो।

सदस्यों को पेज के नीचे **Leave Group** link भी दिखता है।

## Leader की क्षमताएं

यदि आप group के leader हैं, तो आपके पास अतिरिक्त editing क्षमताएं हैं:

- **Events बनाना और edit करना** -- group calendar में event जोड़ने के लिए **All events**, फिर **Add Event** पर tap करें। event बनाते समय, आप उसके साथ rooms और resources reserve कर सकते हैं -- उपलब्ध rooms और resources में से चुनें, वैकल्पिक setup और teardown समय सेट करें, और booking अनुरोध अपने-आप approval के लिए जमा हो जाता है।
- **Repeating events edit करना** -- edit करने के लिए repeating event खोलने पर, B1 पहले पूछता है कि कौन-सी तारीखें बदलनी हैं: **Just this date**, **This and all following dates**, या **All dates**। कोई एक चुनें और event खोलने के लिए **Save** पर click करें। यदि आपने **Just this date** चुना, तो **Recurring** switch छिप जाता है और आपके बदलाव (या delete) केवल उस एक तारीख पर लागू होते हैं।
- **Event reminders सेट करना** -- मौजूदा event edit करते समय, उसके शुरू होने से पहले लोगों को याद दिलाने के लिए **Send reminders** चालू करें। चुनें कि वे कब भेजे जाएं, **Time of Day**, **Who should be reminded?**, और एक वैकल्पिक **Message**, फिर **Send By** के अंतर्गत **Push**, **Email**, या यदि आपके church में texting सेट है तो **Text** चुनें। texts केवल उन लोगों को जाते हैं जिन्होंने अपनी [Notification Preferences](../getting-started/notification-preferences.md) में text reminders चालू किए हैं।
- **Resources प्रबंधित करना** -- files अपलोड करें (100 MB तक storage), links जोड़ें, या मौजूदा resources हटाएं।
- **Attendance ट्रैक करना** -- **Attendance** section में **Take attendance** के साथ group sessions की attendance दर्ज करें।

group का नाम, विवरण, या सदस्य सूची बदलने के लिए B1 Admin का उपयोग करें। देखें [Group Members](../../b1-admin/groups/group-members.md)।

## Group Join करना

जब आप logged in होते हैं और अभी तक सदस्य नहीं होते, तो group detail page पर एक join button दिखता है। button का label group की join policy पर निर्भर करता है:

- **Join Group** -- group खुला है। इस पर click करने से आप तुरंत सदस्य बन जाते हैं।
- **Request to Join** -- group को approval चाहिए। इस पर click करने से एक dialog खुलता है, जहां आप group leader को एक वैकल्पिक संदेश लिख सकते हैं, फिर अपना अनुरोध जमा कर सकते हैं। अपने अनुरोधों को प्रबंधित करने के विवरण के लिए [Requesting to Join a Group](./join-requests.md) देखें।

अनुरोध भेजने के बाद, button की जगह एक **Request Pending** सूचना आ जाती है: "Your request to join has been sent. A group leader will review it."

यदि आप logged in नहीं थे और **Sign in to join** पर click किया था, तो sign in करने के बाद आप group पर लौटते हैं और join step अपने-आप शुरू हो जाता है: एक open group आपको तुरंत जोड़ देता है, और approval चाहिए वाला group **Request to Join** dialog खोलता है।

यदि दोनों में से कोई भी button दिखाई नहीं देता, तो group बंद है और सदस्यों को leader या administrator द्वारा हाथ से जोड़ा जाना होगा।

:::info
group join करने या join request भेजने के लिए आपका sign in होना आवश्यक है। यदि कोई group बंद है और आप उसमें जुड़ना चाहते हैं, तो अपने church कार्यालय या group के किसी leader से संपर्क करें।
:::
