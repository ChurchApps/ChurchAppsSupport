---
title: "Attendance सेटअप"
---

# Attendance सेटअप {#attendance-setup}

<div class="article-intro">

attendance ट्रैक करने से पहले, आपको B1 Admin को बताना होगा कि आपके church के भौतिक स्थान कौन से हैं, सेवाएं कब होती हैं, और हर सेवा में कौन से groups मिलते हैं। यह एक बार का setup वह संरचना बनाता है जो आपके church में हर attendance ट्रैकिंग और reporting को चलाती है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- आपके पास attendance प्रबंधित करने की permission वाला एक सक्रिय B1 Admin account होना चाहिए। यदि आपको अपने access level के बारे में निश्चित नहीं है, तो [Roles & Permissions](../people/roles-permissions.md) देखें।
- यदि आप groups को service times सौंपने की योजना बना रहे हैं, तो पहले सुनिश्चित करें कि आपके [groups बन चुके हैं](../groups/creating-groups.md)।

</div>

## मुख्य अवधारणाएं {#key-concepts}

- **Campus** -- एक भौतिक स्थान जहां आपका church मिलता है (उदाहरण के लिए, "Main Campus," "North Campus")। Campuses **Settings** के अंतर्गत प्रबंधित होते हैं।
- **Service** -- किसी campus पर एक आवर्ती gathering (उदाहरण के लिए, "Sunday Service," "Midweek")।
- **Service Time** -- वह विशेष समय जब कोई service होती है (उदाहरण के लिए, "9:00 AM," "11:00 AM")।
- **Scheduled Group** -- एक group जो किसी विशेष service time को सौंपा गया है। Attendance उसी service के संदर्भ में ट्रैक होती है।
- **Unscheduled Group** -- एक group जो किसी service time से जुड़े बिना अपनी attendance स्वयं ट्रैक करता है।

## अपनी attendance संरचना सेट करना {#setting-up-your-attendance-structure}

1. **B1 Admin** खोलें, [Jump menu](../introduction.md#getting-around-with-the-jump-menu) खोलें (ऊपर-बाईं ओर का search bar), और **People** को expand करें।
2. **Attendance** पर click करें, फिर बाईं column में **Setup** पर click करें। **Service structure** table खुलता है, जिसके ऊपर आपके campuses, service times, और scheduled व unscheduled groups की गिनती दिखती है।
3. **Service structure** panel के ऊपर-दाएं कोने में **Manage Campuses** पर click करें। यह आपको **Settings → Campuses** पर ले जाता है। **Add Campus** पर click करें, अपने स्थान का नाम दर्ज करें (पता और time zone वैकल्पिक हैं), और **Save** पर click करें।
4. **People → Attendance** पर वापस जाएं और **Setup** पर click करें। आपका campus अब setup table में दिखता है।
5. अपने campus के नीचे **Service** column में **+ button** पर click करें। "Sunday Service" जैसा service नाम दर्ज करें और **Save** पर click करें।
6. service के नीचे **Time** column में **+ button** पर click करें। **Service Time** का नाम जैसे "9:00 AM" दर्ज करें, वैकल्पिक रूप से [check-in schedule](#setting-a-check-in-schedule) भरें, और **Save** पर click करें। हर service time के लिए दोहराएं।
7. किसी group को service time से जोड़ने के लिए, **People > Groups** से group खोलें, **Edit** पर click करें, और **Add Service Time** का उपयोग करें -- अगला section देखें।

### किसी group पर Track Attendance सक्षम करना {#enabling-track-attendance-on-a-group}

किसी group की attendance दर्ज होने से पहले, उस group के लिए Track Attendance चालू होना चाहिए।

1. Jump menu में **People > Groups** चुनें और group चुनें।
2. group के नाम के नीचे **Edit** बटन पर click करें।
3. **Track Attendance** को **Yes** पर सेट करें।
4. **Save** पर click करें।

:::tip
यदि आपने पिछले कदम में group को किसी service time को सौंपा था, तो group के edit screen पर **Add Service Time** विकल्प का उपयोग करके उसे सही service से भी जोड़ें। इससे sessions सही campus और समय से जुड़े रहते हैं।
:::

:::tip
यदि कोई group नियमित service के बाहर मिलता है -- जैसे एक midweek small group जो अपनी attendance स्वयं ट्रैक करता है -- तो आप उसे unscheduled group के रूप में छोड़ सकते हैं। फिर भी वह attendance reporting के लिए **Group Attendance** report में दिखेगा।
:::

## Check-in schedule सेट करना {#setting-a-check-in-schedule}

हर service time का एक वैकल्पिक check-in schedule हो सकता है, ताकि [self check-in](check-in.md) हर हफ्ते अपने-आप खुले और बंद हो। schedule के बिना, उस service time के लिए check-in हर समय उपलब्ध रहता है (जब तक कमरा किसी अन्य कारण से बंद न हो, जैसे भरा होना)।

1. **Setup** view पर, किसी service time के **Time** column में उसके नाम पर click करें (या नया जोड़ें)।
2. **Check-in Schedule** के अंतर्गत, वह सप्ताह का **Day** चुनें जिस दिन service time मिलता है।
3. **Start Time** और, वैकल्पिक रूप से, **End Time** सेट करें।
4. **Open check-in (minutes before start)** दर्ज करें -- उदाहरण के लिए, `30` का अर्थ है service शुरू होने से आधा घंटा पहले check-in खुलेगा।
5. **Close check-in (minutes after end)** दर्ज करें -- उदाहरण के लिए, `15` का अर्थ है end time के बाद 15 मिनट तक check-in खुला रहेगा। यदि आपने end time नहीं सेट किया, तो यह start time से गिना जाता है।
6. **Save** पर click करें।

schedule हर हफ्ते दोहराया जाता है और service के campus के time zone में मापा जाता है। यदि उस campus का time zone नहीं है, तो आपके church का [Time Zone](../settings/church-settings.md#time-zone) उपयोग होता है, फिर पहले campus का time zone जिसमें वह सेट हो, और अंत में Eastern time (America/New_York)। यदि check-in गलत घंटे पर खुलता है, तो [Campuses](../settings/campuses.md) में campus का **Time Zone** जांचें। schedule हटाने के लिए **Day** को वापस **No schedule** पर सेट करें और **Save** पर click करें। schedule तभी प्रभावी होता है जब **Day** और **Start Time** दोनों सेट हों।

जब किसी service time की check-in window बंद हो:

- **B1.church पर self check-in** उस service time को **Closed** के रूप में सूचीबद्ध करता है (या, उदाहरण के लिए, **Closed · opens Sun 9:30 AM**), और उसे चुना नहीं जा सकता। यदि किसी service का कोई भी समय खुला नहीं है, तो परिवारों को दिखता है कि check-in कब खुलेगा, जैसे "Check-in opens Sun 9:30 AM."
- **B1 Checkin kiosk ऐप** भी service time को उसके खुलने के समय के साथ **Closed** दिखाता है। यदि किसी service का हर समय बंद है, तो kiosk बताता है कि उस service का check-in कब खुलेगा। जो व्यक्ति पहले से किसी बंद service time पर check in है, उसका group उसकी जगह **Checked in** दिखाता है। यदि check-in के बीच में window बंद हो जाती है, तो kiosk उस check-in को पूरा नहीं करता और **Can't check in yet** screen दिखाता है, जिसमें प्रभावित कमरा सूचीबद्ध होता है ताकि परिवार कोई अन्य चुन सके।

जो परिवार किसी पहले की service time पर check in कर चुका है, वह उसके window बंद होने के बाद भी लौटकर कोई बाद की खुली service time जोड़ सकता है। उनके मौजूदा check-ins बने रहते हैं।

:::tip
एक उदार open window सेट करें (उदाहरण के लिए, शुरू होने से 45 मिनट पहले), ताकि जल्दी पहुंचने वाले परिवार और volunteers check in कर सकें, और एक छोटी close window ताकि देर से आने वाले लोग service शुरू होने के बाद भी check in कर सकें।
:::

## अपना setup संपादित करना {#editing-your-setup}

आप अपना setup कभी भी अपडेट कर सकते हैं। किसी campus, service time, या group को चुनें और उसका विवरण बदलने के लिए **Edit**, या उसे हटाने के लिए **Delete** पर click करें।

:::info
किसी service time को हटाने से पिछले attendance records नहीं हटते। आपका ऐतिहासिक डेटा सुरक्षित रहता है, भले ही आप अपना schedule बदल दें।
:::

## आगे क्या है {#whats-next}

एक बार आपके campuses, service times, और groups तैयार हो जाएं, तो आप मैन्युअली [attendance दर्ज करना](recording-attendance.md) शुरू करने या अपनी services के लिए [self check-in](check-in.md) सेट करने के लिए तैयार हैं।
