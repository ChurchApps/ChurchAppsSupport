---
title: "चेक-इन"
---

# चेक-इन

<div class="article-intro">

चेक-इन एक ही सिस्टम है जिसके तीन प्रवेश-द्वार हैं: स्टाफ़ वाले और सेल्फ़-सर्विस स्टेशनों के लिए B1Checkin किओस्क ऐप, B1App मेंबर पोर्टल के भीतर सेल्फ़ चेक-इन, और B1Admin में प्रशासनिक स्तर की उपस्थिति। तीनों कोर Api के एक ही attendance मॉड्यूल में लिखते हैं, और कक्षा का रूटिंग पूरी तरह Groups से होता है — "locations" या "rooms" नाम की कोई अलग इकाई नहीं है। इसके ऊपर एक बाल-सुरक्षा परत है: प्रति-विज़िट चेक-इन प्रकार, सर्वर-साइड क्षमता और स्वयंसेवक-अनुपात की रोकें, किओस्क-साइड आयु/कक्षा पात्रता, चेक-आउट पर विश्वसनीय पिकअप सत्यापन, और चर्च के टेक्स्टिंग प्रदाता के ज़रिए माता-पिता को पेज करना। यह पृष्ठ डेटा मॉडल, चेक-इन प्रवाह, सुरक्षा परत और लेबल प्रिंटिंग पाइपलाइन का नक्शा प्रस्तुत करता है।

</div>

## अवलोकन

```
┌──────────────────────────┐
│ B1Checkin (Expo kiosk)   │──┐         ┌──────────────────────────────────────────────┐
│  lookup → household →    │  │         │ Api                                          │
│  groups → complete/print │  │  HTTPS  │  ┌─ membership module ─────────────────────┐ │
├──────────────────────────┤  ├───────▶ │  │ people · households · groups            │ │
│ B1App (self check-in)    │──┤         │  └─────────────────────────────────────────┘ │
│  /mobile/checkin screen  │  │         │  ┌─ attendance module ─────────────────────┐ │
├──────────────────────────┤  │         │  │ campuses → services → serviceTimes      │ │
│ B1Admin (staff)          │──┘         │  │ groupServiceTimes  (room routing)       │ │
│  setup · reports ·       │            │  │ sessions ← visitSessions → visits       │ │
│  label designer          │            │  │ labelTemplates                          │ │
└──────────────────────────┘            │  └─────────────────────────────────────────┘ │
                                        └──────────────────────────────────────────────┘

Label print path (kiosk only):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (label templates, or bundled HTML fallback)
       └▶ LabelRenderer → HTML doc + inline SVG barcodes
            └▶ PrintUI: WebView render → ViewShot JPG capture
                 └▶ printer-helper native module → Brother QL / Zebra
```

| सतह | रिपॉज़िटरी | स्टैक | भूमिका |
|-----|-----------|-------|--------|
| किओस्क | `B1Checkin` | Expo / React Native, expo-router फ़ाइल रूटिंग; Android, Amazon Fire और iOS के लिए EAS बिल्ड; `expo-updates` के ज़रिए OTA अपडेट | लेबल प्रिंटिंग और सत्यापित चेक-आउट के साथ स्टाफ़ वाला या सेल्फ़-सर्विस स्टेशन |
| सेल्फ़ चेक-इन | `B1App` | Next.js (b1.church मेंबर पोर्टल) | लॉग-इन सदस्य फ़ोन से अपना परिवार चेक-इन करते हैं; कोई प्रिंटिंग नहीं |
| प्रशासन | `B1Admin` | React SPA | सेवा संरचना सेट करना, सेवा समय पर समूह असाइन करना, लेबल डिज़ाइन करना, मैन्युअल उपस्थिति दर्ज करना, रिपोर्ट चलाना |

तीनों एक ही दो API मॉड्यूल को `ApiHelper` के माध्यम से कॉल करते हैं: **MembershipApi** (`/membership`) लोगों, परिवारों और समूहों के लिए; **AttendanceApi** (`/attendance`) नीचे दिए गए सब कुछ के लिए।

## डेटा मॉडल (`Api/src/modules/attendance`)

| इकाई / टेबल | मुख्य फ़ील्ड | अर्थ |
|----------------|-----------|---------|
| `campuses` | name, address | यहाँ अब अप्रचलित — कैंपस membership मॉड्यूल (`/membership/campuses`) में मास्टर रहते हैं; attendance वाली प्रति पुरानी रीडर्स के लिए केवल-पढ़ने-योग्य रूप में जमी हुई है (`models/Campus.ts`) |
| `services` | campusId, name | एक आवर्ती सभा, जैसे "Sunday Morning" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | किसी सेवा के भीतर एक समय-स्लॉट, जैसे "9:00 AM" (`models/ServiceTime.ts`)। शेड्यूल वाले कॉलम वैकल्पिक हैं (migration `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) और [चेक-इन विंडो](#scheduled-check-in-windows) को चलाते हैं |
| `groupServiceTimes` | groupId, serviceTimeId | जॉइन टेबल: कौन-से समूह (कक्षाएँ) किन सेवा समयों पर मिलते हैं (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | किसी एक तारीख को किसी एक समूह की एक बैठक — चेक-इन के समय आलसी रूप से बनती है (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | एक तारीख को एक व्यक्ति की उपस्थिति (`models/Visit.ts`)। `checkinType` `member` / `guest` / `volunteer` है (NULL = पुराना सदस्य), किओस्क द्वारा सेट होता है और क्षमता/अनुपात रोकों द्वारा उपयोग होता है |
| `visitSessions` | visitId, sessionId | कौन-से session(s) एक विज़िट को कवर करते हैं — दो सेवा समयों पर चेक-इन किए गए बच्चे को दो पंक्तियाँ मिलती हैं (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON blocks) | डिज़ाइन किए जा सकने वाले लेबल लेआउट (`models/LabelTemplate.ts`) |

### पूरा हुआ चेक-इन कैसे सहेजा जाता है

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) `POST /attendance/visits/checkin?serviceId=&peopleIds=` को संभालता है। बॉडी `Visit` ऑब्जेक्ट्स का एक array है, जिनमें से हर एक `visitSessions` रखता है, जिसका embedded `session` केवल एक `(serviceTimeId, groupId)` जोड़ी बताता है। फिर सर्वर:

1. **किसी भी लिखाई से पहले क्षमता और अनुपात जाँचता है।** `evaluateGates()` → `CheckinGateHelper.evaluate()` हर लक्षित कमरे की क्षमता, अतिथि क्षमता, बंद फ़्लैग और स्वयंसेवक अनुपात को वर्तमान उपस्थिति के मुकाबले जाँचता है। postCheckin **ट्रांज़ैक्शनल नहीं** है, इसलिए गेट को पहली save से पहले चलना होगा — कठोर उल्लंघन पर 409 लौटता है जो प्रभावित कमरे(के) नाम बताता है और कुछ भी सहेजा नहीं जाता। देखें [क्षमता और स्वयंसेवक-अनुपात गेट](#capacity-and-volunteer-ratio-gates)।
2. **Sessions को आलसी रूप से हल करता है।** `getSessionId()` `(groupId, serviceTimeId, today)` के लिए `sessions` पंक्ति खोजता या बनाता है — session ids प्रति तारीख प्रोसेस के भीतर कैश होते हैं। नए sessions `session.created` webhook emit करते हैं। यह लूप एक awaited `for..of` है — पहले का fire-and-forget `forEach(async …)` save से टकराता था और पहले session के बनने पर NULL sessionIds लिख देता था (ठीक किया जा चुका है; लूप पर एक कोड कमेंट में नोट है)।
3. **दिन के रिकॉर्ड बदलता है।** उस सेवा पर आज उन लोगों की जो मौजूदा विज़िट हैं, वे उनके visitSessions सहित हटा दी जाती हैं, फिर प्रस्तुत सेट सहेजा जाता है। इसलिए किसी परिवार को फिर से चेक-इन करना एक idempotent "यह वर्तमान स्थिति है" ऑपरेशन है, न कि append। `?checkDuplicates=true` पास करने पर बिना लिखे `{ duplicates: [personId…] }` लौटता है, और किओस्क इसी से ओवरराइट करने से पहले चेतावनी देता है।
4. **हर batch के लिए एक security code बनाता है।** `SecurityCodeHelper.generate()` अक्षर-समूह `23456789BCDFGHJKLMNPQRSTVWXYZ` से 4-अक्षर का कोड बनाता है (कोई स्वर या भ्रमित करने वाले अक्षर नहीं, ताकि कोड शब्द न बनाएँ या गलत न पढ़े जाएँ)। सर्वर उसी चर्च की उसी दिन की खुली विज़िट्स के साथ टकराव पर पुनः प्रयास करता है और batch की हर विज़िट पर कोड अंकित करता है।
5. **`{ streaks, securityCode }` लौटाता है।** `streaks` personId को लगातार-सप्ताह उपस्थिति गिनती से मैप करता है; किओस्क मील के पत्थरों (हर 5वें सप्ताह) पर confetti से जश्न मनाता है।

हर सहेजी गई विज़िट एक `attendance.recorded` webhook भी emit करती है। पढ़ने वाला भाग, `GET /attendance/visits/checkin`, लोगों की विज़िट्स उनकी **आखिरी दर्ज तारीख** से लौटाता है — यदि वह पिछला सप्ताह था तो ids हटा दिए जाते हैं, इसलिए क्लाइंट को पिछले सप्ताह के कमरे-चयनों की पूर्व-भरी प्रति मिलती है जो नए रिकॉर्ड के रूप में सहेजी जाएगी।

### चेक-आउट

दो एंडपॉइंट्स लूप पूरा करते हैं (`VisitController`):

- `GET /attendance/visits/code/:code` — आज की वे विज़िट्स जो अभी चेक-आउट नहीं हुईं और जिनपर वह security code है, sessions भरे हुए।
- `POST /attendance/visits/checkout` — बॉडी `{ visitIds, checkedOutBy?, checkedOutById? }`; `checkoutTime` और पिकअप करने वाले व्यक्ति को अंकित करता है, और हर विज़िट के लिए एक `attendance.checkout` webhook emit करता है।

अनुमतियाँ: किओस्क `attendance.checkin` से प्रमाणित होते हैं, जो ठीक चेक-इन/चेक-आउट/लेबल-टेम्पलेट सतह देता है; `attendance.view`/`attendance.edit` रिपोर्टिंग और मैन्युअल प्रविष्टि को कवर करते हैं; संरचना (सेवाएँ, सेवा समय, समूह असाइनमेंट) के लिए `services.edit` चाहिए। सदस्य का सेल्फ़ चेक-इन (B1App) किसी अनुमति की ज़रूरत नहीं रखता: चर्च में जुड़े व्यक्ति वाला कोई भी प्रमाणित उपयोगकर्ता `GET`/`POST /attendance/visits/checkin` कॉल कर सकता है, और सर्वर प्रस्तुत `personId`s को कॉलर के अपने परिवार तक सीमित करता है (अन्यथा 403) — यही बाड़ दूसरे परिवारों के `securityCode` को अपठनीय रखती है। सदस्यता ही अनुमति है; सदस्य इस सुविधा को *देखते* हैं या नहीं, यह चर्च के B1App नेविगेशन टैब नियंत्रित करते हैं। बाकी चेक-इन एंडपॉइंट्स (`code/:code`, `checkout`, `guardians`, `CheckinController`) केवल किओस्क/स्टाफ़ के लिए रहते हैं।

## समूह कमरा-रूटिंग चलाते हैं

सिस्टम में कहीं भी कोई कमरा या कक्षा की इकाई नहीं है। "कमरा" वह membership **group** है जिसमें `trackAttendance` सक्षम है, और जो `groupServiceTimes` के ज़रिए एक या अधिक सेवा समयों से जुड़ा है। समूह के वे फ़ील्ड (`Api/src/modules/membership/models/Group.ts` पर) जो किओस्क व्यवहार को आकार देते हैं:

| फ़ील्ड | प्रभाव |
|------|--------|
| `trackAttendance` | समूह उपस्थिति में भाग लेता है; B1Admin का setup tree बिना `groupServiceTimes` पंक्ति वाले `trackAttendance` समूहों को unassigned चिह्नित करता है |
| `parentPickup` | बाल-कमरा चिह्नित करता है: इसमें चेक-इन करने से विज़िट "child" विज़िट बनती है, जो परिवार का पिकअप लेबल प्रिंट करती है और नेमटैग पर security code रखती है |
| `printNametag` | इस समूह में चेक-इन पर नेमटैग प्रिंट होगा या नहीं |
| `capacity` / `guestCapacity` / `checkinClosed` | कमरे की क्षमता सीमाएँ और एक कठोर "closed" स्विच, जिन्हें चेक-इन गेट सर्वर-साइड लागू करता है (B1Admin के group settings में "Check-In Capacity" के अंतर्गत संपादित) |
| `volunteerRatio` / `minVolunteers` | प्रति स्वयंसेवक बच्चों का अनुपात और न्यूनतम स्वयंसेवक संख्या, जो चर्च-व्यापी `ratioEnforcement` सेटिंग के अनुसार लागू होती है |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | आयु/कक्षा पात्रता की सीमाएँ, जिन्हें किओस्क-साइड पर कमरों को उजागर या धुंधला करने के लिए जाँचा जाता है |

हर क्लाइंट इसी तरह डीनॉर्मलाइज़ करता है (जैसे `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes`, और `GET /membership/groups` को समानांतर लोड करें, फिर हर सेवा समय के लिए वे समूह एकत्र करें जिनकी `groupServiceTimes` पंक्ति उसी की ओर इशारा करती है और उन्हें `serviceTime.groups` में डालें। यह array वही है जिसे कमरा-चयन दिखाता है, जो समूह के `categoryName` के अनुसार व्यवस्थित होता है।

असाइनमेंट B1Admin में समूह के पेज से संपादित होते हैं (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), और पूरा Campus → Service → Service Time → Group tree `B1Admin/src/attendance/components/AttendanceSetup.tsx` में `GET /attendance/attendancerecords/tree` के ज़रिए दिखाया जाता है।

:::info
चूँकि समूह ही एकमात्र सत्य का स्रोत हैं, वही समूह सदस्यता किओस्क रूटिंग, B1Admin के समूह पेजों पर roster-शैली उपस्थिति, और उपस्थिति रिपोर्टिंग को शक्ति देती है — किसी समूह को सेवा समय पर असाइन करना ही उसे चेक-इन गंतव्य बनाने के लिए एकमात्र कदम है।
:::

## बाल सुरक्षा

### चेक-इन प्रकार

हर विज़िट में `checkinType` होता है — `member`, `guest`, या `volunteer` (NULL का अर्थ पुराना/सदस्य है; migration `tools/migrations/attendance/2026-07-03_checkin_type.ts`)। यह प्रकार **किओस्क-साइड** पर चुना जाता है: विस्तारित सदस्य पंक्ति पर Member / Guest / Volunteer चिप्स (`B1Checkin/src/components/MemberServiceTimes.tsx`), और पूरा होने पर हर लंबित विज़िट पर अंकित होता है (`app/checkinComplete.tsx`, डिफ़ॉल्ट `member`)। सर्वर इसे गेट में उपयोग करता है — स्वयंसेवक क्षमता के विरुद्ध नहीं, बल्कि अनुपात कवरेज में गिने जाते हैं, और अतिथि `guestCapacity` के विरुद्ध गिने जाते हैं।

### क्षमता और स्वयंसेवक-अनुपात गेट

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) `postCheckin` के भीतर किसी भी save से पहले चलता है (एंडपॉइंट गैर-ट्रांज़ैक्शनल है, इसलिए save से पहले गेटिंग ही सही होने की व्यवस्था है)। यह हर लक्षित समूह की वर्तमान उपस्थिति लोड करता है (`VisitRepo.countActiveByGroupToday`) और membership मॉड्यूल गेटवे के ज़रिए समूह कॉन्फ़िगरेशन, फिर उल्लंघनों को वर्गीकृत करता है:

- **कठोर (हमेशा रोकता है):** `checkinClosed`, `current + incoming > capacity`, अतिथि संख्या `guestCapacity` से अधिक। batch `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` के साथ अस्वीकार होता है — किओस्क नाम वाला कमरा दिखाता है।
- **अनुपात (चेतावनी या रोक):** वे गैर-स्वयंसेवक जो ऐसे कमरे में आ रहे हैं जहाँ `volunteers < minVolunteers`, बिल्कुल कोई स्वयंसेवक नहीं, या `children > volunteers × volunteerRatio`। गंभीरता प्रति-चर्च सेटिंग `ratioEnforcement` (`"warn"` डिफ़ॉल्ट / `"block"`, B1Admin Manage Church → Check-In में संपादित, `CheckinSettingsEdit.tsx`) से तय होती है। warn मोड में `409 { warning: true, error: "ratio", … }` लौटता है, जब तक क्लाइंट `acknowledgeWarnings=true` के साथ फिर से जमा न करे — वही पुनः-जमा किओस्क का स्टाफ़-पुष्टि ओवरराइड है।

### निर्धारित चेक-इन विंडो

सेवा समय में वैकल्पिक साप्ताहिक शेड्यूल हो सकता है (`dayOfWeek` 0–6, जहाँ 0 = रविवार, `startTime`/`endTime` `HH:mm` रूप में, `checkinOpenMinutes`, `checkinCloseMinutes`), जिसे B1Admin के **Attendance → Setup** सेवा-समय फ़ॉर्म (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, "Check-in Schedule") में संपादित किया जाता है। `CheckinGateHelper.hasSchedule()` किसी सेवा समय को तभी निर्धारित मानता है जब `dayOfWeek` और `startTime` दोनों सेट हों; बिना शेड्यूल वाले समय कभी समय से बाधित नहीं होते। `isServiceTimeOpen()` विंडो को स्थानीय दीवार-घड़ी समय (`DateHelper.toChurchTime`) में गणना करता है। समय क्षेत्र हर सेवा समय के लिए `CheckinTimeZoneHelper.load()` (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`) द्वारा तय होता है: सेवा के कैंपस (`service.campusId`, `MembershipModuleGateway.loadCampusTimeZones` के ज़रिए) का `timezone` पहले आता है, फिर चर्च का `timeZone` (B1Admin की Church Information में सेट), फिर पहला गैर-हटाया गया कैंपस जिसका `timezone` हो (`loadCampusTimeZone`), और अंत में ही `America/New_York`। कैंपस पहले आता है क्योंकि अधिकांश चर्चों में चर्च का क्षेत्र backfill होकर `America/New_York` बन गया था। नीचे की सूची और पोस्टिंग दोनों पथ इसे इसी तरह हल करते हैं। विंडो `checkinOpenMinutes` पहले से लेकर शुरुआत से पहले शुरू होती है और `checkinCloseMinutes` के बाद तक चलती है (या अंत न होने पर शुरुआत के बाद), और आधी रात या सप्ताह की सीमा पार करने वाली विंडो को संभालती है।

विंडो दो स्थानों पर लागू होती है:

- **सूची:** `GET /attendance/servicetimes` हर पंक्ति पर एक गणना किया गया `checkinOpen` boolean जोड़ता है। B1App का सेल्फ़ चेक-इन (`CheckinPage.tsx`) और B1Checkin का सेवा-चयनकर्ता (`app/services.tsx`) हर समय रखते हैं। जब किसी सेवा के सभी समय बंद होते हैं, तो वे सबसे निकटतम खुलने का समय दिखाते हैं ("Check-in opens Sun 9:30 AM." B1App में, "Check-in for this service opens Sun 9:30 AM." B1Checkin में, `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel` से), और जब कोई खुलने का समय न निकाला जा सके तो "Check-in isn't open for this service right now." पर वापस जाते हैं (किओस्क एक Back बटन देता है ताकि कोई दूसरी सेवा चुनी जा सके)। अन्यथा बंद समय "Closed" / "Closed · opens 9:30 AM" वाली न-चयन योग्य पंक्ति के रूप में दिखते हैं। B1Checkin की household स्क्रीन (`MemberServiceTimes.tsx`) डिवाइस घड़ी पर `ServiceTimeHelper.isCheckinOpen()` के साथ खुलेपन को लाइव जाँचती है (डिवाइस का समय क्षेत्र, चर्च का नहीं), ताकि चालू छोड़ा गया किओस्क समय पर खुले और बंद हो, और उस बंद समय पर "Kids Room 1 · Checked in" (समूह का नाम) दिखाता है जो व्यक्ति पहले से रखता है।
- **पोस्टिंग:** `evaluateGates()` के भीतर, क्षमता/अनुपात मूल्यांकन से पहले, `findClosedServiceTimeGroups()` batch को `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` के साथ अस्वीकार करता है यदि किसी लक्षित session का सेवा समय अपनी विंडो से बाहर है। चूँकि किसी परिवार की आज की मौजूदा विज़िट्स हर चेक-इन के साथ फिर से पोस्ट होती हैं, इसलिए वे sessions जो व्यक्ति पहले से रखता है (मौजूदा विज़िट्स में `personId|sessionId`) इस गेट को छोड़ देते हैं, ताकि बाद का खुला सेवा समय जोड़ने पर इसलिए इनकार न हो कि पहले की विंडो बंद हो गई। B1Checkin इसे अपनी hard-gate स्क्रीन के ज़रिए "check-in isn't open right now" कारण के साथ दिखाता है (क्षमता उल्लंघन अब भी "room is full or closed" पढ़ते हैं)।

### आयु/कक्षा पात्रता (किओस्क-साइड)

कमरा पात्रता सलाहकार UI है, जिसका मूल्यांकन किओस्क पर होता है, सर्वर द्वारा लागू नहीं होता। `B1Checkin/src/helpers/EligibilityHelper.ts` किसी व्यक्ति की जन्मतिथि/कक्षा की तुलना समूह के `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` से करता है (कक्षा क्रम: PreK, K, 1–12, Graduated) और `eligible` / `ineligible` / `unknown` लौटाता है — डेटा न होने पर `unknown` आता है और कोई कमरा कभी छिपता नहीं। आयु और कक्षाएँ चर्च की **grade promotion date** (`gradePromotionDate` सेटिंग, `"MM-DD"`, `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx` में संपादित) की स्थिति में गणना होती हैं; किओस्क इसे `GET /attendance/checkin/settings` से लाता है, और `resolveAsOfDate` आज या उससे पहले की सबसे हालिया घटना चुनता है। कमरा-चयनकर्ता पात्र कमरों को उजागर करता है और अपात्र कमरों को धुंधला करता है; धुंधले कमरे को चुनने के लिए स्टाफ़ की पुष्टि चाहिए।

### विश्वसनीय और अनधिकृत पिकअप

पिकअप के लोग एक membership इकाई हैं, प्रति परिवार: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, वैकल्पिक personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes)। CRUD `GET /membership/householdpickup/:householdId` (कोई भी प्रमाणित चर्च उपयोगकर्ता, ताकि किओस्क इसे पढ़ सकें) और `people.edit` द्वारा गेट किए गए `POST` / `DELETE` के रूप में है। स्टाफ़ यह सूची व्यक्ति पेज के **Pickup** कार्ड पर प्रबंधित करता है (`B1Admin/src/people/components/PickupPeople.tsx`) — फ़ोटो, रिश्ता, और Trusted/Not Authorized स्टेटस चिप।

चेक-आउट पर (`B1Checkin/app/checkout.tsx`) किओस्क परिवार की पिकअप सूची लोड करता है: `trusted` प्रविष्टियाँ परिवार के वयस्कों के फ़ोटो ग्रिड के साथ टैप-योग्य पिकअप कार्ड के रूप में दिखती हैं, और मुक्त-टाइप किया गया "Other" नाम `notAuthorized` प्रविष्टियों से fuzzy-match (Levenshtein, `src/helpers/PickupMatchHelper.ts`) होता है — मिलान होने पर चेतावनी शीट के साथ चेक-आउट रुक जाता है और स्टाफ़ का **Override** बटन आता है। ओवरराइड विज़िट पर ही दर्ज होता है: यह सामान्य `POST /attendance/visits/checkout` के ज़रिए `checkedOutBy` को `"OVERRIDE: {name}"` के रूप में भेजता है, इसलिए यह अलग ऑडिट टेबल के बजाय उपस्थिति रिकॉर्ड और `attendance.checkout` webhook में जाता है।

### पेज-अ-पेरेंट और आपातकालीन प्रसारण

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) दो SMS एंडपॉइंट्स देता है:

- `POST /page` — `{ visitId, message }`: चेक-इन किए गए एक बच्चे के अभिभावकों को पेज करता है (किओस्क चेक-आउट स्क्रीन, manned मोड)।
- `POST /broadcast` — `{ serviceId, message }`: किसी सेवा के लिए चेक-इन किए गए हर परिवार के वयस्कों को टेक्स्ट भेजता है (किओस्क एडमिन सेटिंग्स, `B1Checkin/app/adminSettings.tsx` में `EMERGENCY` टाइप करके पुष्टि करने वाली शीट के पीछे)।

दोनों पथ membership गेटवे से वयस्कों को हल करते हैं, फिर डिलीवरी **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) को सौंपते हैं — चर्च के कॉन्फ़िगर किए गए टेक्स्टिंग प्रदाता (`@churchapps/texting`: TextInChurch, Clearstream, या MutualMinistry; कोई अंतर्निर्मित SMS भेजने वाला नहीं है) का क्रॉस-मॉड्यूल द्वार। गेटवे `sentText` पंक्ति और प्रति-प्राप्तकर्ता `deliveryLog` प्रविष्टियाँ दर्ज करता है और एक बैच को 500 प्राप्तकर्ताओं तक सीमित रखता है; कोई प्रदाता कॉन्फ़िगर न होने पर वह `no_provider` लौटाता है, जिसे किओस्क "No SMS provider configured" के रूप में दिखाता है। कंट्रोलर का `dispatch()` फ़ोन नंबरों को dedupe करता है और जिन लोगों के पास मोबाइल नहीं या `optedOut` सेट है उन्हें छोड़ता है, और `{ sent, failed, skippedOptedOut, skippedNoPhone }` लौटाता है ताकि किओस्क दिखा सके कि क्या छोड़ा गया।

## किओस्क (B1Checkin)

स्क्रीन `B1Checkin/app/` के अंतर्गत expo-router फ़ाइलें हैं; स्क्रीन-के-बीच की स्थिति एक static `CachedData` क्लास (`src/helpers/CachedData.ts`) में रहती है, React state में नहीं।

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **लुकअप** (`app/lookup.tsx`) — फ़ोन से खोजें (`GET /membership/people/search/phone?number=`, अंतिम 4 या पूरा नंबर) या नाम से (`GET /membership/people/search?term=`)। किसी मिलान को चुनने पर परिवार (`GET /membership/people/household/{householdId}`) और मौजूदा विज़िट्स (`GET /attendance/visits/checkin`) लोड होते हैं, और `pendingVisits` में पिछले सप्ताह के चयन भरे जाते हैं।
2. **परिवार समीक्षा** (`app/household.tsx`, `src/components/MemberList.tsx`) — हर सदस्य पंक्ति पर पहले से-चेक-इन बैज, एलर्जी/`nametagNotes` बैज, और उनके वर्तमान कमरा चिप्स दिखते हैं। किसी सदस्य को विस्तृत करने पर हर सेवा समय, कमरा बटन के साथ, और Member / Guest / Volunteer चेक-इन-प्रकार चिप्स (`MemberServiceTimes.tsx`) सूचीबद्ध होते हैं। हर सेवा समय के नाम के नीचे `ServiceTimeHelper.getGroupSummary()` वहाँ दिए जाने वाले समूह दिखाता है (`serviceTime.groups` के नाम, छंटे हुए, केस-अनसेंसिटिव रूप से dedupe, comma से जुड़े); जिस समय पर कोई समूह न हो वहाँ कुछ नहीं दिखता।
3. **समूह असाइनमेंट** (`app/selectGroup.tsx`) — `serviceTime.groups` से बना श्रेणी-वृक्ष, जिसमें आयु/कक्षा-पात्र कमरे उजागर होते हैं और अपात्र कमरे स्टाफ़ पुष्टि के पीछे धुंधले होते हैं (देखें [आयु/कक्षा पात्रता](#agegrade-eligibility-kiosk-side)); कमरा चुनने पर उस व्यक्ति की लंबित विज़िट में `{ session: { serviceTimeId, groupId } }` visitSession लिखा जाता है (`src/helpers/VisitSessionHelper.ts`)। "None" उसे साफ़ करता है।
4. **पूर्ण** (`app/checkinComplete.tsx`) — `pendingVisits` के साथ `POST /attendance/visits/checkin` (हर एक पर उसका `checkinType` अंकित), फिर अगर प्रिंटर कॉन्फ़िगर है तो लेबल प्रिंट होते हैं और लुकअप पर स्वतः लौटता है। `409` क्षमता या `notOpen` प्रतिक्रिया कारण के साथ प्रभावित कमरा दिखाती है (भरा/बंद, या चेक-इन नहीं खुला); अनुपात चेतावनी एक स्टाफ़ पुष्टि देती है जो `acknowledgeWarnings=true` के साथ फिर जमा करती है।

**चेक-आउट** स्क्रीन (`app/checkout.tsx`) 4-अक्षर का security code एक स्वतः-फ़ोकस इनपुट के ज़रिए स्वीकार करती है — ताकि USB/Bluetooth कीबोर्ड-वेज बारकोड स्कैनर बिना कैमरे के काम करें — या उसी अक्षर-समूह वाला ऑन-स्क्रीन कीपैड, जो 4 अक्षरों पर स्वतः सबमिट होता है। **Scan** बटन एक शीट खोलता है जिसमें साझा `src/components/CodeScanner.tsx` कैमरा है (डिफ़ॉल्ट रूप से back-facing, QR, Code 128 और Code 39 स्वीकार करता है), ताकि बिना wedge स्कैनर वाले स्टेशन पिकअप लेबल पढ़ सकें; स्कैन किया गया कोड वही `handleCode()` पथ लेता है जो टाइप किए इनपुट को। यह कोड को देखता है, उठाए जा रहे बच्चे दिखाता है, और परिवार के **विश्वसनीय पिकअप लोग** को परिवार के वयस्कों के फ़ोटो ग्रिड के साथ टैप-योग्य कार्ड के रूप में प्रस्तुत करता है (साथ में एक "Other" मुक्त-टेक्स्ट विकल्प जो अनधिकृत नामों से fuzzy-check होता है — देखें [विश्वसनीय और अनधिकृत पिकअप](#trusted-and-not-authorized-pickup)), फिर चयनकर्ता के नाम/id के साथ `POST /attendance/visits/checkout` भेजता है। manned मोड में स्क्रीन **Page a parent** (`POST /attendance/checkin/page`) और **सुरक्षा-लेबल का पुनर्मुद्रण** भी देती है — `reprint()` `LabelHelper.getAllLabelsFor(...)` से परिवार के लेबल फिर बनाता है और उन्हें चेक-इन वाली उसी `PrintUI` पाइपलाइन से भेजता है।

स्टेशन का व्यक्तित्व एक AsyncStorage फ़्लैग `@StationMode` (`"self"` | `"manned"`, `app/adminSettings.tsx` में टॉगल) है। manned मोड लुकअप स्क्रीन पर चेक-आउट प्रवेश-बिंदु और परिवार स्क्रीन से प्रति-सदस्य प्रोफ़ाइल संपादन (`POST /membership/people`) जोड़ता है। किओस्क की सुरक्षा अंतर्निर्मित है: एक वैकल्पिक PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) एडमिन और प्रिंटर स्क्रीन को गेट करता है, एडमिन स्क्रीन केवल हेडर लोगो पर 7 तेज़ टैप से खुलती है, और एक निष्क्रिय attract स्क्रीन (`src/hooks/useInactivityTimer.ts`) परिवारों के बीच नियंत्रण ले लेती है।

## सेल्फ़ चेक-इन (B1App)

सदस्य b1.church पोर्टल में `/mobile/checkin` स्क्रीन पर चेक-इन करते हैं (`B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` से `screens/CheckinPage.tsx` तक रूट होकर)। इसके लिए लॉग-इन उपयोगकर्ता चाहिए और यह किओस्क वाले उन्हीं चार चरणों — सेवाएँ → परिवार → समूह → पूर्ण — से गुज़रता है, वही एंडपॉइंट्स के विरुद्ध, और स्थिति `B1App/src/helpers/CheckinHelper.ts` में रहती है। किओस्क से अंतर: परिवार लॉग-इन उपयोगकर्ता के अपने `householdId` से आता है (कोई खोज चरण नहीं), और लेबल प्रिंटिंग नहीं है — इसके बजाय पूर्ण स्क्रीन batch का security code एक QR (`qrcode.react`) के रूप में दिखाती है, साथ में "show this at a check-in station" संकेत। यदि पेज लोड होने पर परिवार पहले से चेक-इन है, तो "Show check-in code" बटन पहली मौजूदा विज़िट (`GET /attendance/visits/checkin` से) का QR दोबारा दिखाता है जिसमें `securityCode` हो। चेक-इन सबमिट के समय तुरंत दर्ज होता है (कोई लंबित स्थिति नहीं); QR केवल किओस्क पर लेबल प्रिंटिंग को चलाता है।

**फ़ोन से किओस्क लेबल प्रिंटिंग** (`B1Checkin/app/scan.tsx`, लुकअप स्क्रीन पर QR "Scan code" बटन से पहुँचा): किओस्क QR कोड के लिए स्कैन करते हुए `CodeScanner` (एक `expo-camera` `CameraView`, डिफ़ॉल्ट रूप से front-facing, पलटने योग्य) दिखाता है। `ScanCodeHelper.parse()` केवल तभी payload स्वीकार करता है जब वह security-code अक्षर-समूह में एक नंगा 4-अक्षर कोड हो, और `ScanCodeHelper.isRepeat()` उसी कोड को 4 सेकंड के लिए अनदेखा करता है, इसलिए B1App का QR और छपे लेबल का QR ब्लॉक दोनों काम करते हैं। स्क्रीन फिर चेक-आउट रीप्रिंट पथ का अनुसरण करती है — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — और लुकअप पर लौटती है। स्कैन के समय उपस्थिति में कोई लिखाई नहीं होती; केवल लेबल। सक्रिय विज़िट न होने वाले कोड, बिना प्रिंटर वाले स्टेशन, और बिना लेबल वाले समूह हर एक एक toast दिखाते हैं और लुकअप पर लौटते हैं।

Types और `ApiHelper`/`ArrayHelper` `@churchapps/helpers` और `@churchapps/apphelper` से आते हैं; कोई React कॉम्पोनेंट B1Admin के साथ साझा नहीं है।

## प्रशासनिक उपस्थिति (B1Admin)

- **Setup** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) संरचना tree दिखाता है और सेवाएँ (`ServiceEdit.tsx`) और सेवा समय (`ServiceTimeEdit.tsx`) बनाता है। कैंपस डेटा `useCampuses()` हुक के ज़रिए membership से आता है।
- **मैन्युअल उपस्थिति** उपस्थिति सेक्शन पर नहीं, समूहों की ओर रहती है: `B1Admin/src/groups/components/GroupSessionsTab.tsx` sessions बनाता है (`POST /attendance/sessions`; जोड़ते समय `SessionEdit.tsx` चुने गए सेवा समय को साझा करने वाले हर अन्य समूह के लिए एक session शामिल कर सकता है, और उन समूहों को छोड़ता है जिनका उस तारीख पर पहले से session है), और `POST /attendance/visitsessions/log` के ज़रिए लोगों को उपस्थित चिह्नित करता है, जो उस व्यक्ति और session के लिए विज़िट खोजता या बनाता है। समूह लीडर `attendance.edit` अनुमति के बिना अपने समूहों की उपस्थिति दर्ज कर सकते हैं — कंट्रोलर `au.leaderGroupIds` जाँचते हैं।
- **रिपोर्टिंग** — उपस्थिति प्रवृत्ति और समूह उपस्थिति सर्वर-परिभाषित रिपोर्ट हैं (`B1Admin/src/components/reporting/ReportWithFilter.tsx` ReportingApi के विरुद्ध; परिभाषाएँ `Api/reports/*.json` में)। दोनों `startDate`/`endDate` लेते हैं (अंतिम तारीख शामिल); प्रवृत्ति रिपोर्ट डिफ़ॉल्ट रूप से एक साल पहले से आज तक होती है और प्रति-सप्ताह `sessionDates` कॉलम जोड़ती है, और समूह उपस्थिति का स्क्रीन पर tree हर विज़िट का `checkinTime` और व्यक्ति का `membershipStatus` शामिल करता है। समूह उपस्थिति का CSV सहयोगी `groupAttendanceDownload` रिपोर्ट से आता है, जिसे `GroupAttendanceDownloadHelper` हर समूह सदस्य के लिए एक पंक्ति में बदलता है, जिसमें हर तारीख वाले session के लिए उपस्थित/अनुपस्थित कॉलम होता है; प्रति-व्यक्ति इतिहास `GET /attendance/attendancerecords?personId=` से है (`B1Admin/src/people/components/PersonAttendance.tsx`)।

## लेबल प्रिंटिंग

### टेम्पलेट और डिज़ाइनर

चर्च B1Admin में `/mobile/checkin/labels` पर अपने लेबल स्वयं डिज़ाइन करते हैं (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, चेक-इन सेटिंग्स पेज से पहुँचा जाता है)। टेम्पलेट एक `labelTemplates` पंक्ति है जिसका `content` ब्लॉकों का JSON array है — `text`, `field`, `barcode`, `qrcode`, या `box` — हर एक प्रतिशत निर्देशांकों में स्थित, फ़ॉन्ट, संरेखण, symbology (`code39`/`code128`/`qr`), और वैकल्पिक दृश्यता शर्तों के साथ (जैसे एलर्जी बॉक्स तभी रेंडर करना जब `person.nametagNotes` खाली न हो)। दो `labelType` हैं: `nametag` (चेक-इन किए गए हर व्यक्ति के लिए एक; `person.displayName`, `sessions`, `securityCode`, और `person.isBirthdayWeek` जैसे फ़ील्ड — `"true"` जब जन्मदिन का माह/दिन आज से 3 दिनों के भीतर हो, वर्ष के अंत को पार करते हुए, जिसकी गणना `LabelHelper.isBirthdayWithin()` करता है) और `pickup` (परिवार के लिए एक; `children`, `childrenAllergies` जैसे फ़ील्ड)। सर्वर हर प्रकार के लिए चर्च में एक ही डिफ़ॉल्ट लागू करता है (`LabelTemplateController.save`)। डिज़ाइनर किओस्क के बंडल लेबलों को प्रतिबिंबित करने वाले शुरुआती टेम्पलेट देता है और नमूना डेटा के विरुद्ध पूर्वावलोकन करता है।

### किओस्क पर रेंडरिंग और प्रिंटिंग

चेक-इन पूरा होने पर `B1Checkin/src/helpers/LabelHelper.ts` हर लंबित विज़िट के समूह फ़्लैग से तय करता है कि क्या प्रिंट करना है: `printNametag` समूहों के लिए नेमटैग, और यदि किसी विज़िट ने `parentPickup` समूह को छुआ हो तो एक परिवार पिकअप लेबल। `checkinType` `volunteer` वाली विज़िट्स `LabelHelper.selectChildVisits()` द्वारा छोड़ी जाती हैं, इसलिए Parent Pickup कमरे में काम करने वाला बाल-देखभाल कार्यकर्ता कभी पिकअप लेबल ट्रिगर नहीं करता। चेक-इन प्रतिक्रिया का security code बच्चों के नेमटैग और पिकअप लेबल पर जाता है; वयस्क नेमटैग बिना कोड के प्रिंट होते हैं। यदि चर्च के पास टेम्पलेट हैं, तो `LabelRenderer` (`src/helpers/LabelRenderer.ts`) ब्लॉक + एक फ़ील्ड संदर्भ को एक स्वतंत्र HTML दस्तावेज़ में बदलता है; अन्यथा `B1Checkin/assets/labels/` के बंडल HTML लेबल प्लेसहोल्डर प्रतिस्थापन के साथ उपयोग होते हैं।

बारकोड `B1Checkin/src/helpers/barcode.ts` में शुद्ध-TypeScript एनकोडरों द्वारा inline SVG के रूप में बनते हैं — Code 39 पैटर्न सारणियाँ और Code 128 (mod-103 checksum के साथ code set B) चौड़ाई सारणियाँ, साथ ही `qrcode` पैकेज के ज़रिए QR। **ये एनकोडर जानबूझकर B1Admin में दोहराए गए हैं** (`LabelEditor.tsx` वही सारणियाँ inline करता है, कोड कमेंट में नोट है) ताकि डिज़ाइनर पूर्वावलोकन किओस्क आउटपुट से पिक्सेल-सटीक हों; किसी एक में बदलाव को दूसरे में भी दोहराना होगा।

प्रिंट पाइपलाइन (`src/components/PrintUI.tsx`) हर HTML लेबल को `WebView` में रेंडर करती है, `react-native-view-shot` के ज़रिए JPG में कैप्चर करती है, और छवि URIs को नेटिव **printer-helper** Expo मॉड्यूल (`B1Checkin/modules/printer-helper/`) को सौंपती है। मॉड्यूल `scan()`, `checkInit()`, `printUris()`, और स्थिति इवेंट देता है, दोनों प्लेटफ़ॉर्म पर हर ब्रांड के लिए एक प्रदाता के साथ:

| ब्रांड | Android | iOS | टिप्पणियाँ |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | QL-श्रेणी के नेटवर्क प्रिंटर (QL-800/810W/820NWB/1100/1110NWB…), 29×90 डाई-कट लेबल, अनुशंसित डिफ़ॉल्ट |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | नेटवर्क खोज + TCP/ZPL छवि प्रिंटिंग |

प्रिंटर चयन `app/printers.tsx` पर रहता है (नेटवर्क स्कैन `brand~model~ip` प्रविष्टियाँ लौटाता है; चुनाव AsyncStorage में सहेजा जाता है), और `src/helpers/PrinterLog.ts` एक ऑन-डिवाइस डायग्नोस्टिक लॉग रखता है जो किओस्क हेडर में एक लाइव स्टेटस डॉट के ज़रिए दिखता है।

## अतिथि पंजीकरण

मध्य-चेक-इन दो तरीकों से एक व्यक्ति बनता है:

- **किओस्क पर** — परिवार स्क्रीन का "Add guest" `B1Checkin/app/addGuest.tsx` खोलता है, जो पहले `GET /membership/people/search?term=` से किसी मौजूदा गैर-सदस्य मिलान को खोजता है, और अन्यथा `POST /membership/people` से एक नया बनाता है, जो वर्तमान परिवार से जुड़ता है। अतिथि फिर बाकी सदस्यों की तरह समूह असाइनमेंट से गुज़रता है।
- **QR के ज़रिए सेल्फ़-सर्विस** — जब चर्च सेटिंग `enableQRGuestRegistration` चालू हो (B1Admin की Check-In सेटिंग्स में कॉन्फ़िगर, `GET /membership/settings/public/{churchId}` से पढ़ी गई), तो किओस्क लुकअप स्क्रीन `https://{subdomain}.b1.church/guest-register?serviceId=` से लिंक करने वाला QR कोड दिखाती है। वह B1App पेज (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) आने वाले परिवार को उनके अपने फ़ोन पर पंजीकरण करने देता है, अनाम `POST /membership/people/guest-register` एंडपॉइंट के ज़रिए, जिससे किओस्क की कतार चलती रहती है। QR शीट में **Register here** बटन भी है जो किओस्क पर (`app/guestRegister.tsx`) वही पेज एक incognito, cache-disabled `WebView` में खोलता है; `src/helpers/GuestRegisterHelper.ts` QR और WebView दोनों के लिए URL बनाता है और `https://{subdomain}.b1.church/guest-register` से बाहर के नेविगेशन को रोकता है। स्क्रीन **Done**, back, या 120 सेकंड की निष्क्रियता पर लुकअप पर लौट जाती है (फ़ॉर्म टाइपिंग WebView से activity के रूप में रिले होती है), और WebView को अनमाउंट करती है ताकि एक परिवार की प्रविष्टियाँ अगले तक न पहुँचें।

QR साइन-अप उन चर्च सेटिंग्स से चलता है जो B1Admin के **QR Guest Registration** कार्ड (`src/mobile/CheckInPage.tsx`) से सहेजी जाती हैं:

| सेटिंग | दृश्यता | उद्देश्य |
|---|---|---|
| `enableQRGuestRegistration` | public | किओस्क QR और अनाम एंडपॉइंट्स के लिए ऑप्ट-इन स्विच |
| `guestRegistrationFields` | public | `email`, `phone`, `address`, `birthDate`, `gender`, `maritalStatus`, `grade`, `comments` → `"off"` / `"optional"` / `"required"` का JSON मानचित्र। डिफ़ॉल्ट: ईमेल और फ़ोन वैकल्पिक, बाकी off। पहला/अंतिम नाम हमेशा आवश्यक हैं |
| `guestRegistrationImage` | public | हेडर फ़ोटो URL; B1App इसे फ़ॉर्म और पुष्टि स्क्रीन पर आइकन की जगह 16:9 में रेंडर करता है |
| `guestRegistrationGroupId` | private | वह समूह जिसमें हर साइन-अप जुड़ता है (अतिथि इसे कभी देखते या चुनते नहीं) |
| `guestRegistrationRecordAttendance` | private | `"true"` पर उस समूह के लिए उपस्थिति भी दर्ज होती है |

B1App का `src/components/checkin/GuestRegister.tsx` अनाम `GET /membership/people/guest-register/options?churchId=` से चेकलिस्ट लाता है और केवल शामिल फ़ील्ड रेंडर करता है (प्राथमिक संपर्क पर ईमेल, फ़ोन, वैवाहिक स्थिति और पता; प्रति सदस्य जन्मतिथि, लिंग और कक्षा; एक टिप्पणी बॉक्स), और केवल वही भेजता है। सर्वर चेकलिस्ट को `GuestRegistrationHelper.sanitize()` में फिर से लागू करता है — off फ़ील्ड हटा दिए जाते हैं, गायब आवश्यक या सूची से बाहर के मान 400 बनते हैं — फिर `PersonHelper.registerGuestHousehold()` एक नया परिवार बनाता है (ईमेल डी-डुप्लिकेशन नहीं) जिसमें हर सदस्य `membershipStatus: "Visitor"` के साथ होता है, और हर एक के लिए `person.created` emit करता है। इसके बाद की विफलताएँ लौटाई नहीं जातीं, केवल लॉग होती हैं: सदस्य कॉन्फ़िगर किए गए समूह में जोड़े जाते हैं (`group.member.added`); यदि उपस्थिति दर्ज करना चालू है, तो `AttendanceModuleGateway.recordAttendance()` हर सदस्य को उस समूह के हर उस सेवा समय के लिए उपस्थित चिह्नित करता है जिसका शेड्यूल हो और जिसकी चेक-इन विंडो (`CheckinGateHelper.isServiceTimeOpen`) अभी खुली हो, आज की चर्च-स्थानीय तारीख के लिए ज़रूरत हो तो session बनाते हुए — बिना शेड्यूल वाले सेवा समय और विंडो से बाहर के साइन-अप कुछ दर्ज नहीं करते; और टिप्पणियाँ परिवार के मुखिया पर एक छिपी हुई person-note बातचीत बन जाती हैं (संदेश लेखक "Guest sign-up"), `person.conversationId` से जुड़ी हुई।

## संबंधित पृष्ठ

- [Attendance Endpoints](../api/endpoints/attendance) -- कैंपस, सेवाएँ, sessions, visits, और visit sessions के लिए पूरी REST सतह
- [Membership Endpoints](../api/endpoints/membership) -- लोग, परिवार और समूह
- [Webhooks](../api/webhooks) -- `session.created`, `attendance.recorded`, और `attendance.checkout` इवेंट्स
- [Module Structure](../api/module-structure) -- सर्वर-साइड पर attendance मॉड्यूल कैसे व्यवस्थित है
