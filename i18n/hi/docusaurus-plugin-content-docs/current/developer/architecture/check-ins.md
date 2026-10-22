---
title: "चेक-इन"
---

# चेक-इन {#check-ins}

<div class="article-intro">

चेक-इन एक ही सिस्टम है जिसके तीन फ़्रंट डोर हैं: स्टाफ़्ड और सेल्फ़-सर्विस स्टेशनों के लिए B1Checkin किओस्क ऐप, B1App सदस्य पोर्टल के भीतर सेल्फ़ चेक-इन, और B1Admin में एडमिन-साइड उपस्थिति। ये तीनों मुख्य Api के एक ही attendance मॉड्यूल में लिखते हैं, और क्लासरूम रूटिंग पूरी तरह Groups से चलती है — "locations" या "rooms" नाम की कोई अलग इकाई नहीं है। इसके ऊपर एक बाल-सुरक्षा परत है: हर विज़िट के लिए चेक-इन प्रकार, सर्वर-साइड क्षमता और स्वयंसेवक-अनुपात गेट, किओस्क-साइड आयु/कक्षा पात्रता, चेक-आउट पर विश्वसनीय पिकअप सत्यापन, और चर्च के टेक्स्टिंग प्रदाता के माध्यम से माता-पिता को पेज करना। यह पेज डेटा मॉडल, चेक-इन प्रवाह, सुरक्षा परत, और लेबल प्रिंटिंग पाइपलाइन का मानचित्र है।

</div>

## अवलोकन {#overview}

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
|---------|------|-------|------|
| किओस्क | `B1Checkin` | Expo / React Native, expo-router फ़ाइल रूटिंग; Android, Amazon Fire, और iOS के लिए EAS बिल्ड; `expo-updates` के माध्यम से OTA अपडेट | स्टाफ़्ड या सेल्फ़-सर्विस स्टेशन, जिसमें लेबल प्रिंटिंग और सत्यापित चेक-आउट होता है |
| सेल्फ़ चेक-इन | `B1App` | Next.js (b1.church सदस्य पोर्टल) | लॉग-इन सदस्य फ़ोन से अपना परिवार चेक इन करते हैं; कोई प्रिंटिंग नहीं |
| एडमिन | `B1Admin` | React SPA | सेवा संरचना कॉन्फ़िगर करता है, सेवा समय पर ग्रुप असाइन करता है, लेबल डिज़ाइन करता है, मैनुअल उपस्थिति दर्ज करता है, रिपोर्ट चलाता है |

तीनों `ApiHelper` के माध्यम से उन्हीं दो API मॉड्यूलों को कॉल करते हैं: **MembershipApi** (`/membership`) व्यक्तियों, परिवारों और ग्रुप्स के लिए; **AttendanceApi** (`/attendance`) नीचे की हर चीज़ के लिए।

## डेटा मॉडल (`Api/src/modules/attendance`) {#data-model-apisrcmodulesattendance}

| इकाई / टेबल | मुख्य फ़ील्ड | अर्थ |
|----------------|-----------|---------|
| `campuses` | name, address | यहां अप्रचलित — campuses membership मॉड्यूल (`/membership/campuses`) में मास्टर होते हैं; attendance की प्रति पुराने रीडर्स के लिए केवल-पढ़ने योग्य फ़्रोज़न है (`models/Campus.ts`) |
| `services` | campusId, name | एक आवर्ती सभा, जैसे "Sunday Morning" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | सेवा के भीतर एक समय स्लॉट, जैसे "9:00 AM" (`models/ServiceTime.ts`)। शेड्यूल कॉलम वैकल्पिक हैं (माइग्रेशन `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) और [चेक-इन विंडो](#scheduled-check-in-windows) को चलाते हैं |
| `groupServiceTimes` | groupId, serviceTimeId | जॉइन टेबल: कौन से ग्रुप (क्लासरूम) किन सेवा समयों पर मिलते हैं (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | एक तिथि पर एक ग्रुप की एक बैठक — चेक-इन के समय आलसी रूप से बनती है (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | एक तिथि पर एक व्यक्ति की उपस्थिति (`models/Visit.ts`)। `checkinType` `member` / `guest` / `volunteer` है (NULL = पुराना सदस्य), जिसे किओस्क सेट करता है और क्षमता/अनुपात गेट उपयोग करते हैं |
| `visitSessions` | visitId, sessionId | विज़िट किन session(s) को कवर करती है — दो सेवा समयों पर चेक इन किया गया बच्चा दो पंक्तियां पाता है (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON blocks) | डिज़ाइन किए जा सकने वाले लेबल लेआउट (`models/LabelTemplate.ts`) |

### पूरा हुआ चेक-इन कैसे सहेजा जाता है {#how-a-completed-check-in-is-persisted}

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) `POST /attendance/visits/checkin?serviceId=&peopleIds=` को संभालता है। बॉडी `Visit` ऑब्जेक्ट्स का एक ऐरे है, जिनमें से हर एक `visitSessions` रखता है, जिनका एम्बेडेड `session` केवल एक `(serviceTimeId, groupId)` जोड़ी बताता है। फिर सर्वर:

1. **किसी भी लिखने से पहले क्षमता और अनुपात गेट करता है।** `evaluateGates()` → `CheckinGateHelper.evaluate()` हर लक्षित कमरे की क्षमता, गेस्ट क्षमता, बंद फ़्लैग, और वर्तमान उपस्थिति के विरुद्ध स्वयंसेवक अनुपात जांचता है। postCheckin **ट्रांज़ैक्शनल नहीं** है, इसलिए गेट को पहले सेव से पहले चलना चाहिए — कठोर उल्लंघन पर 409 लौटता है जो प्रभावित कमरे(कमरों) के नाम बताता है, और कुछ भी सहेजा नहीं जाता। देखें [क्षमता और स्वयंसेवक-अनुपात गेट](#capacity-and-volunteer-ratio-gates)।
2. **सत्रों को आलसी रूप से resolve करता है।** `getSessionId()` `(groupId, serviceTimeId, today)` के लिए `sessions` पंक्ति खोजता या बनाता है — session ids तिथि के अनुसार प्रोसेस-इन-मेमोरी कैश होते हैं। नए सत्र `session.created` webhook भेजते हैं। लूप एक awaited `for..of` है — पहले का fire-and-forget `forEach(async …)` सेव से दौड़ करता था और पहले सत्र बनने पर NULL sessionIds लिखता था (ठीक किया गया; लूप पर कोड कमेंट में नोट है)।
3. **दिन के रिकॉर्ड बदल देता है।** उस सेवा पर आज उन लोगों की कोई भी मौजूदा विज़िट उनकी visitSessions के साथ हटा दी जाती है, फिर सबमिट किया गया सेट सहेजा जाता है। किसी परिवार को दोबारा चेक इन करना इसलिए एक इडेम्पोटेंट "यह वर्तमान स्थिति है" ऑपरेशन है, न कि append। `?checkDuplicates=true` के साथ बुलाने पर बिना लिखे `{ duplicates: [personId…] }` लौटता है, और किओस्क इसी से ओवरराइट करने से पहले चेतावनी देता है।
4. **हर बैच के लिए एक सिक्योरिटी कोड बनाता है।** `SecurityCodeHelper.generate()` वर्णमाला `23456789BCDFGHJKLMNPQRSTVWXYZ` से 4-अक्षर का कोड बनाता है (कोई स्वर या अस्पष्ट अक्षर नहीं, इसलिए कोड शब्द नहीं बना सकते या गलत नहीं पढ़े जा सकते)। सर्वर उसी चर्च की उसी दिन की खुली विज़िट के विरुद्ध टकराव पर फिर प्रयास करता है और बैच की हर विज़िट पर कोड अंकित करता है।
5. **`{ streaks, securityCode }` लौटाता है।** `streaks` personId को लगातार-सप्ताह उपस्थिति गिनती से मैप करता है; किओस्क मील के पत्थरों (हर 5वें सप्ताह) पर कन्फ़ेटी से जश्न मनाता है।

हर सहेजी गई विज़िट `attendance.recorded` webhook भी भेजती है। पढ़ने वाला हिस्सा, `GET /attendance/visits/checkin`, लोगों की विज़िट उनकी **अंतिम दर्ज तिथि** से लौटाता है — यदि वह पिछला सप्ताह था, तो id हटा दिए जाते हैं, इसलिए क्लाइंट को पिछले सप्ताह के कमरा-चयन की पूर्व-भरी प्रति मिलती है, जो नए रिकॉर्ड के रूप में सहेजी जाएगी।

### चेक-आउट {#check-out}

दो एंडपॉइंट लूप पूरा करते हैं (`VisitController`):

- `GET /attendance/visits/code/:code` — आज की वे विज़िट जो अभी चेक-आउट नहीं हुईं और उस सिक्योरिटी कोड को रखती हैं, sessions भरी हुई।
- `POST /attendance/visits/checkout` — बॉडी `{ visitIds, checkedOutBy?, checkedOutById? }`; `checkoutTime` और किसने पिकअप किया, यह अंकित करता है, और हर विज़िट के लिए एक `attendance.checkout` webhook भेजता है।

अनुमतियां: किओस्क `attendance.checkin` से प्रमाणित होते हैं, जो ठीक चेक-इन/चेक-आउट/लेबल-टेम्पलेट सतह देता है; `attendance.view`/`attendance.edit` रिपोर्टिंग और मैनुअल प्रविष्टि कवर करते हैं; संरचना (सेवाएं, सेवा समय, ग्रुप असाइनमेंट) के लिए `services.edit` चाहिए। सदस्य सेल्फ़ चेक-इन (B1App) को कोई अनुमति नहीं चाहिए: चर्च में लिंक्ड व्यक्ति वाला कोई भी प्रमाणित उपयोगकर्ता `GET`/`POST /attendance/visits/checkin` कॉल कर सकता है, और सर्वर सबमिट किए गए `personId` को कॉलर के अपने परिवार तक सीमित रखता है (अन्यथा 403) — यही बाड़ दूसरे परिवारों के `securityCode` को अपठनीय रखती है। सदस्यता ही अनुदान है; सदस्यों को यह सुविधा *दिखती* है या नहीं, यह चर्च के B1App नेविगेशन टैब नियंत्रित करते हैं। बाकी चेक-इन एंडपॉइंट (`code/:code`, `checkout`, `guardians`, `CheckinController`) केवल किओस्क/स्टाफ़ के लिए रहते हैं।

## ग्रुप्स रूम रूटिंग चलाते हैं {#groups-drive-room-routing}

पूरे सिस्टम में कहीं भी कोई रूम या क्लासरूम इकाई नहीं है। "रूम" वह membership **group** है जिसमें `trackAttendance` सक्षम है, और जो `groupServiceTimes` के माध्यम से एक या अधिक सेवा समयों से जुड़ा है। वे ग्रुप फ़ील्ड (`Api/src/modules/membership/models/Group.ts` पर) जो किओस्क व्यवहार बनाते हैं:

| फ़ील्ड | प्रभाव |
|------|--------|
| `trackAttendance` | ग्रुप उपस्थिति में बिल्कुल भाग लेता है; B1Admin का सेटअप ट्री, जिन `trackAttendance` ग्रुप्स में `groupServiceTimes` पंक्ति नहीं है, उन्हें असाइन न किए गए के रूप में चिह्नित करता है |
| `parentPickup` | एक बच्चा कमरा चिह्नित करता है: उसमें चेक इन करने से विज़िट "child" विज़िट बनती है, जो एक परिवार पिकअप लेबल प्रिंट करती है और नेमटैग पर सिक्योरिटी कोड रखती है |
| `printNametag` | इस ग्रुप में चेक-इन पर नेमटैग प्रिंट होता है या नहीं |
| `capacity` / `guestCapacity` / `checkinClosed` | कमरे की क्षमता सीमाएं और एक कठोर "closed" स्विच, जिन्हें चेक-इन गेट सर्वर-साइड लागू करता है (B1Admin के ग्रुप सेटिंग्स में "Check-In Capacity" के अंतर्गत संपादित) |
| `volunteerRatio` / `minVolunteers` | बच्चे-प्रति-स्वयंसेवक अनुपात और न्यूनतम स्वयंसेवक संख्या, चर्च-व्यापी `ratioEnforcement` सेटिंग के अनुसार लागू |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | आयु/कक्षा पात्रता सीमाएं, जिन्हें कमरों को हाइलाइट या धुंधला करने के लिए किओस्क-साइड मूल्यांकित किया जाता है |

हर क्लाइंट इसी तरह डीनॉर्मलाइज़ करता है (जैसे `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes`, और `GET /membership/groups` को समानांतर लोड करें, फिर हर सेवा समय के लिए वे ग्रुप इकट्ठा करें जिनकी `groupServiceTimes` पंक्ति उसी की ओर इशारा करती है, और उन्हें `serviceTime.groups` में डालें। वही ऐरे रूम पिकर में दिखता है, जो ग्रुप `categoryName` के अनुसार व्यवस्थित होता है।

असाइनमेंट B1Admin में ग्रुप के पेज से संपादित होते हैं (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), और पूरा Campus → Service → Service Time → Group ट्री `B1Admin/src/attendance/components/AttendanceSetup.tsx` में `GET /attendance/attendancerecords/tree` के माध्यम से विज़ुअलाइज़ होता है।

:::info
चूंकि ग्रुप एकमात्र सत्य का स्रोत हैं, वही ग्रुप सदस्यता किओस्क रूटिंग, B1Admin के ग्रुप पेजों पर रोस्टर-शैली उपस्थिति, और उपस्थिति रिपोर्टिंग को शक्ति देती है — किसी ग्रुप को सेवा समय पर असाइन करना ही उसे चेक-इन गंतव्य बनाने के लिए एकमात्र आवश्यक कदम है।
:::

## बाल सुरक्षा {#child-safety}

### चेक-इन प्रकार {#check-in-types}

हर विज़िट में `checkinType` होता है — `member`, `guest`, या `volunteer` (NULL का अर्थ पुराना/सदस्य है; माइग्रेशन `tools/migrations/attendance/2026-07-03_checkin_type.ts`)। प्रकार **किओस्क-साइड** चुना जाता है: विस्तारित सदस्य पंक्ति पर Member / Guest / Volunteer चिप्स (`B1Checkin/src/components/MemberServiceTimes.tsx`), और पूरा होने पर हर पेंडिंग विज़िट पर अंकित किया जाता है (`app/checkinComplete.tsx`, डिफ़ॉल्ट `member`)। सर्वर इसे गेट में उपयोग करता है — स्वयंसेवक क्षमता के विरुद्ध गिने जाने के बजाय अनुपात कवरेज में गिने जाते हैं, और गेस्ट `guestCapacity` के विरुद्ध गिने जाते हैं।

### क्षमता और स्वयंसेवक-अनुपात गेट {#capacity-and-volunteer-ratio-gates}

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) किसी भी सेव से पहले `postCheckin` के अंदर चलता है (एंडपॉइंट ट्रांज़ैक्शनल नहीं है, इसलिए सेव से पहले गेटिंग ही शुद्धता का तंत्र है)। यह लक्षित हर ग्रुप की वर्तमान उपस्थिति (`VisitRepo.countActiveByGroupToday`) और मेंबरशिप मॉड्यूल गेटवे के माध्यम से ग्रुप कॉन्फ़िग लोड करता है, फिर उल्लंघनों को वर्गीकृत करता है:

- **कठोर (हमेशा ब्लॉक):** `checkinClosed`, `current + incoming > capacity`, गेस्ट संख्या `guestCapacity` से अधिक। बैच `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` के साथ अस्वीकार होता है — किओस्क नामित कमरा दिखाता है।
- **अनुपात (चेतावनी या ब्लॉक):** उस कमरे में आने वाले गैर-स्वयंसेवक, जहां `volunteers < minVolunteers` हो, बिल्कुल स्वयंसेवक न हों, या `children > volunteers × volunteerRatio` हो। गंभीरता प्रति-चर्च सेटिंग `ratioEnforcement` (`"warn"` डिफ़ॉल्ट / `"block"`, B1Admin Manage Church → Check-In, `CheckinSettingsEdit.tsx` में संपादित) का पालन करती है। warn-मोड में `409 { warning: true, error: "ratio", … }` लौटता है, जब तक क्लाइंट `acknowledgeWarnings=true` के साथ फिर से सबमिट न करे — वही री-सबमिट किओस्क का स्टाफ़-पुष्टि ओवरराइड है।

### निर्धारित चेक-इन विंडो {#scheduled-check-in-windows}

सेवा समय में वैकल्पिक साप्ताहिक शेड्यूल हो सकता है (`dayOfWeek` 0–6, जहां 0 = रविवार; `startTime`/`endTime` `HH:mm` के रूप में; `checkinOpenMinutes`, `checkinCloseMinutes`), जिसे B1Admin के **Attendance → Setup** सेवा-समय फ़ॉर्म (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, "Check-in Schedule") में संपादित किया जाता है। `CheckinGateHelper.hasSchedule()` सेवा समय को तभी निर्धारित मानता है जब `dayOfWeek` और `startTime` दोनों सेट हों; बिना शेड्यूल वाले समय पर कभी समय-गेट नहीं लगता। `isServiceTimeOpen()` विंडो को स्थानीय दीवार-घड़ी समय में गणना करता है (`DateHelper.toChurchTime`)। समय क्षेत्र `CheckinTimeZoneHelper.load()` (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`) द्वारा हर सेवा समय के लिए resolve होता है: सेवा के campus का `timezone` (`service.campusId`, `MembershipModuleGateway.loadCampusTimeZones` के माध्यम से) पहले आता है, फिर चर्च का `timeZone` (B1Admin की Church Information में सेट), फिर पहला गैर-हटाया गया campus जिसका `timezone` हो (`loadCampusTimeZone`), और उसके बाद ही `America/New_York`। campus पहले इसलिए आता है क्योंकि कई चर्चों के चर्च-क्षेत्र में `America/New_York` बैकफ़िल हो गया था। नीचे की सूची और पोस्टिंग दोनों पाथ इसे उसी तरह resolve करते हैं। विंडो `checkinOpenMinutes` पहले से लेकर शुरुआत तक, और अंत के बाद `checkinCloseMinutes` तक चलती है (या कोई अंत न होने पर शुरुआत के बाद), और आधी रात या सप्ताह की सीमा पार करने वाली विंडो भी संभालती है।

विंडो दो जगह लागू होती है:

- **सूचीकरण:** `GET /attendance/servicetimes` हर पंक्ति पर एक गणना किया गया `checkinOpen` बूलियन लगाता है। B1App का सेल्फ़ चेक-इन (`CheckinPage.tsx`) और B1Checkin का सेवा पिकर (`app/services.tsx`) हर समय रखते हैं। जब किसी सेवा के सारे समय बंद होते हैं, तो वे सबसे निकटतम खुलने का समय दिखाते हैं ("Check-in opens Sun 9:30 AM." B1App में, "Check-in for this service opens Sun 9:30 AM." B1Checkin में, `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel` से), और जब कोई खुलने का समय गणना नहीं हो सकता तो "Check-in isn't open for this service right now." पर लौटते हैं (किओस्क पर बैक बटन होता है ताकि कोई दूसरी सेवा चुनी जा सके)। अन्यथा बंद समय "Closed" / "Closed · opens 9:30 AM" वाली बिना चुनी जा सकने वाली पंक्ति के रूप में दिखते हैं। B1Checkin की परिवार स्क्रीन (`MemberServiceTimes.tsx`) डिवाइस घड़ी पर `ServiceTimeHelper.isCheckinOpen()` (डिवाइस का समय क्षेत्र, चर्च का नहीं) से खुलेपन को लाइव जांचती है, ताकि चालू छोड़ा गया किओस्क सही समय पर खुले-बंद होता रहे, और उस बंद समय पर जहां व्यक्ति पहले से चेक इन है वहां "Kids Room 1 · Checked in" (ग्रुप का नाम) दिखाती है।
- **पोस्टिंग:** `evaluateGates()` के भीतर, क्षमता/अनुपात मूल्यांकन से पहले, `findClosedServiceTimeGroups()` पूरे बैच को `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` के साथ अस्वीकार करता है यदि किसी लक्षित session का सेवा समय उसकी विंडो से बाहर है। चूंकि किसी परिवार की आज की मौजूदा विज़िट हर चेक-इन के साथ दोबारा पोस्ट होती हैं, व्यक्ति के पास पहले से मौजूद sessions (विद्यमान विज़िट में `personId|sessionId`) इस गेट को छोड़ देते हैं, ताकि किसी पहले की विंडो बंद होने के कारण बाद के खुले सेवा समय को जोड़ने से इनकार न हो। B1Checkin इसे अपनी हार्ड-गेट स्क्रीन के माध्यम से "check-in isn't open right now" कारण के साथ दिखाता है (क्षमता उल्लंघन अब भी "room is full or closed" पढ़ते हैं)।

### आयु/कक्षा पात्रता (किओस्क-साइड) {#agegrade-eligibility-kiosk-side}

कमरे की पात्रता सलाहकार UI है, जिसका मूल्यांकन किओस्क पर होता है, सर्वर द्वारा लागू नहीं किया जाता। `B1Checkin/src/helpers/EligibilityHelper.ts` किसी व्यक्ति की जन्मतिथि/कक्षा की तुलना ग्रुप के `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` से करता है (कक्षा क्रम: PreK, K, 1–12, Graduated) और `eligible` / `ineligible` / `unknown` लौटाता है — डेटा गायब होने पर `unknown` आता है और कभी कमरा नहीं छिपाता। आयु और कक्षाएं चर्च की **grade promotion date** (`gradePromotionDate` सेटिंग, `"MM-DD"`, `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx` में संपादित) के अनुसार गणना होती हैं; किओस्क इसे `GET /attendance/checkin/settings` से लाता है, और `resolveAsOfDate` आज या उससे पहले की सबसे हाल की घटना चुनता है। रूम पिकर पात्र कमरों को हाइलाइट करता है और अपात्र कमरों को धुंधला करता है; धुंधले कमरे को चुनने के लिए स्टाफ़ की पुष्टि चाहिए।

### विश्वसनीय और अनधिकृत पिकअप {#trusted-and-not-authorized-pickup}

पिकअप लोग membership इकाई हैं, जो प्रति परिवार होते हैं: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, वैकल्पिक personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes)। CRUD `GET /membership/householdpickup/:householdId` (कोई भी प्रमाणित चर्च उपयोगकर्ता, ताकि किओस्क इसे पढ़ सकें) और `people.edit` द्वारा सुरक्षित `POST` / `DELETE` है। स्टाफ़ यह सूची व्यक्ति के पेज के **Pickup** कार्ड (`B1Admin/src/people/components/PickupPeople.tsx`) पर प्रबंधित करता है — फ़ोटो, रिश्ता, और एक Trusted/Not Authorized स्टेटस चिप।

चेक-आउट पर (`B1Checkin/app/checkout.tsx`) किओस्क परिवार की पिकअप सूची लोड करता है: `trusted` प्रविष्टियां परिवार के वयस्कों के फ़ोटो ग्रिड के साथ टैप करने योग्य पिकअप कार्ड के रूप में दिखती हैं, और मुफ़्त टाइप किया गया "Other" नाम `notAuthorized` प्रविष्टियों से फ़ज़ी-मैच (Levenshtein, `src/helpers/PickupMatchHelper.ts`) किया जाता है — मिलान होने पर चेतावनी शीट के साथ चेक-आउट ब्लॉक होता है और स्टाफ़ का **Override** बटन दिखता है। ओवरराइड विज़िट पर ही दर्ज होता है: यह सामान्य `POST /attendance/visits/checkout` के माध्यम से `checkedOutBy` को `"OVERRIDE: {name}"` के रूप में पोस्ट करता है, इसलिए यह उपस्थिति रिकॉर्ड और `attendance.checkout` webhook में जाता है, किसी अलग ऑडिट टेबल में नहीं।

### माता-पिता को पेज करना और आपातकालीन प्रसारण {#page-a-parent-and-emergency-broadcast}

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) दो SMS एंडपॉइंट उजागर करता है:

- `POST /page` — `{ visitId, message }`: चेक-इन किए गए एक बच्चे के अभिभावकों को पेज करता है (किओस्क चेक-आउट स्क्रीन, manned मोड)।
- `POST /broadcast` — `{ serviceId, message }`: किसी सेवा के लिए चेक इन किए गए हर परिवार के वयस्कों को टेक्स्ट करता है (किओस्क एडमिन सेटिंग्स, `B1Checkin/app/adminSettings.tsx` में टाइप `EMERGENCY` करके पुष्टि करने वाली शीट के पीछे)।

दोनों membership गेटवे के माध्यम से परिवार के वयस्कों को resolve करते हैं, फिर डिलीवरी **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) को सौंपते हैं — चर्च के कॉन्फ़िगर किए गए टेक्स्टिंग प्रदाता (`@churchapps/texting`: TextInChurch, Clearstream, या MutualMinistry; कोई अंतर्निहित SMS भेजने वाला नहीं है) का क्रॉस-मॉड्यूल द्वार। गेटवे एक `sentText` पंक्ति और प्रति प्राप्तकर्ता `deliveryLog` प्रविष्टियां लिखता है, और एक बैच को 500 प्राप्तकर्ताओं तक सीमित रखता है; कोई प्रदाता कॉन्फ़िगर न होने पर यह `no_provider` लौटाता है, जिसे किओस्क "No SMS provider configured" के रूप में दिखाता है। कंट्रोलर का `dispatch()` फ़ोन नंबर डुप्लिकेट हटाता है और जिन लोगों का मोबाइल नहीं है या `optedOut` सेट है, उन्हें छोड़ देता है, और `{ sent, failed, skippedOptedOut, skippedNoPhone }` लौटाता है ताकि किओस्क दिखा सके कि क्या छोड़ा गया।

## किओस्क (B1Checkin) {#the-kiosk-b1checkin}

स्क्रीनें `B1Checkin/app/` के अंतर्गत expo-router फ़ाइलें हैं; स्क्रीन-के-बीच की स्थिति एक स्टैटिक `CachedData` क्लास (`src/helpers/CachedData.ts`) में रहती है, React state में नहीं।

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Lookup** (`app/lookup.tsx`) — फ़ोन से खोजें (`GET /membership/people/search/phone?number=`, अंतिम-4 या पूरा) या नाम से (`GET /membership/people/search?term=`)। किसी मिलान को चुनने पर परिवार लोड होता है (`GET /membership/people/household/{householdId}`) और मौजूदा विज़िट (`GET /attendance/visits/checkin`), जो `pendingVisits` को पिछले सप्ताह के चयन से भरती हैं।
2. **परिवार समीक्षा** (`app/household.tsx`, `src/components/MemberList.tsx`) — हर सदस्य पंक्ति पर पहले से-चेक-इन बैज, एलर्जी/`nametagNotes` बैज, और उनके वर्तमान रूम चिप्स दिखते हैं। किसी सदस्य को विस्तारित करने पर हर सेवा समय रूम बटन के साथ और Member / Guest / Volunteer चेक-इन-प्रकार चिप्स (`MemberServiceTimes.tsx`) के साथ सूचीबद्ध होता है। हर सेवा समय के नाम के नीचे `ServiceTimeHelper.getGroupSummary()` वहां दिए गए ग्रुप दिखाता है (`serviceTime.groups` के नाम, छंटे हुए, केस-अंसंवेदी डुप्लिकेट हटाए गए, कॉमा से जुड़े); समय में ग्रुप न होने पर कुछ नहीं दिखता।
3. **ग्रुप असाइनमेंट** (`app/selectGroup.tsx`) — `serviceTime.groups` से बना एक कैटेगरी ट्री, जिसमें आयु/कक्षा-पात्र कमरे हाइलाइट और अपात्र कमरे स्टाफ़ पुष्टि के पीछे धुंधले होते हैं (देखें [आयु/कक्षा पात्रता](#agegrade-eligibility-kiosk-side)); कमरा चुनने पर उस व्यक्ति की पेंडिंग विज़िट में `{ session: { serviceTimeId, groupId } }` visitSession लिखा जाता है (`src/helpers/VisitSessionHelper.ts`)। "None" उसे साफ़ करता है।
4. **पूरा** (`app/checkinComplete.tsx`) — `pendingVisits` के साथ `POST /attendance/visits/checkin` (हर एक पर उसका `checkinType` अंकित), फिर यदि प्रिंटर कॉन्फ़िगर है तो लेबल प्रिंट होते हैं और लुकअप पर स्वतः लौट आते हैं। `409` क्षमता या `notOpen` उत्तर कारण सहित नामित कमरा दिखाता है (भरा/बंद, या चेक-इन नहीं खुला); अनुपात चेतावनी स्टाफ़ पुष्टि का विकल्प देती है जो `acknowledgeWarnings=true` के साथ फिर सबमिट करती है।

**चेक-आउट** स्क्रीन (`app/checkout.tsx`) 4-अक्षर का सिक्योरिटी कोड एक ऑटो-फ़ोकस्ड इनपुट के माध्यम से स्वीकार करती है — ताकि USB/Bluetooth कीबोर्ड-वेज बारकोड स्कैनर बिना कैमरे के काम करें — या उसी वर्णमाला वाला ऑन-स्क्रीन कीपैड, 4 अक्षरों पर स्वतः सबमिट होता है। **Scan** बटन एक शीट खोलता है जिसमें साझा `src/components/CodeScanner.tsx` कैमरा होता है (डिफ़ॉल्ट रूप से बैक-फ़ेसिंग, QR, Code 128, और Code 39 स्वीकार करता है), ताकि वेज स्कैनर न होने वाले स्टेशन पिकअप लेबल पढ़ सकें; स्कैन किया गया कोड टाइप किए गए इनपुट के समान `handleCode()` पाथ में जाता है। यह कोड खोजता है, उठाए जा रहे बच्चों को दिखाता है, और परिवार के **विश्वसनीय पिकअप लोगों** को परिवार के वयस्कों के फ़ोटो ग्रिड के साथ टैप करने योग्य कार्ड के रूप में प्रस्तुत करता है (साथ में "Other" मुक्त-टेक्स्ट विकल्प, जो अनधिकृत नामों से फ़ज़ी-जांचा जाता है — देखें [विश्वसनीय और अनधिकृत पिकअप](#trusted-and-not-authorized-pickup)), फिर पिकर के नाम/id के साथ `POST /attendance/visits/checkout` पोस्ट करता है। manned मोड में स्क्रीन **Page a parent** (`POST /attendance/checkin/page`) और **सुरक्षा-लेबल पुनः प्रिंट** भी देती है — `reprint()` `LabelHelper.getAllLabelsFor(...)` से परिवार के लेबल फिर बनाता है और उन्हें चेक-इन वाली उसी `PrintUI` पाइपलाइन से गुज़ारता है।

स्टेशन का व्यक्तित्व AsyncStorage फ़्लैग `@StationMode` (`"self"` | `"manned"`, `app/adminSettings.tsx` में टॉगल) है। manned मोड लुकअप स्क्रीन पर चेक-आउट एंट्री पॉइंट और परिवार स्क्रीन से प्रति-सदस्य प्रोफ़ाइल संपादन (`POST /membership/people`) जोड़ता है। किओस्क हार्डनिंग अंतर्निहित है: एक वैकल्पिक PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) एडमिन और प्रिंटर स्क्रीनों को गेट करता है, एडमिन स्क्रीन हेडर लोगो पर 7 तेज़ टैप से ही खुलती है, और एक निष्क्रिय attract स्क्रीन (`src/hooks/useInactivityTimer.ts`) परिवारों के बीच नियंत्रण संभालती है।

## सेल्फ़ चेक-इन (B1App) {#self-check-in-b1app}

सदस्य b1.church पोर्टल पर `/mobile/checkin` स्क्रीन से चेक इन करते हैं (`B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` द्वारा `screens/CheckinPage.tsx` पर रूट)। इसके लिए लॉग-इन उपयोगकर्ता चाहिए, और यह किओस्क वाले उन्हीं चार चरणों — सेवाएं → परिवार → ग्रुप → पूरा — से समान एंडपॉइंट्स के विरुद्ध गुज़रता है, जिसकी स्थिति `B1App/src/helpers/CheckinHelper.ts` में रहती है। अंतर: परिवार लॉग-इन उपयोगकर्ता के अपने `householdId` से आता है (कोई खोज चरण नहीं), और यहां लेबल प्रिंट नहीं होते — इसके बजाय पूरा होने वाली स्क्रीन बैच का सिक्योरिटी कोड QR (`qrcode.react`) के रूप में दिखाती है, साथ में "show this at a check-in station" संकेत। यदि पेज लोड होने पर परिवार पहले से चेक इन है, तो "Show check-in code" बटन पहली मौजूदा विज़िट (`GET /attendance/visits/checkin` से) से QR फिर दिखाता है जिसमें `securityCode` हो। चेक-इन सबमिट के समय तुरंत दर्ज होता है (कोई पेंडिंग स्थिति नहीं); QR केवल किओस्क पर लेबल प्रिंटिंग चलाता है।

**फ़ोन से किओस्क लेबल प्रिंटिंग** (`B1Checkin/app/scan.tsx`, लुकअप स्क्रीन पर QR "Scan code" बटन से पहुंचा): किओस्क QR कोड के लिए स्कैन करते हुए `CodeScanner` (`expo-camera` `CameraView`, डिफ़ॉल्ट रूप से फ़्रंट-फ़ेसिंग, पलटने योग्य) दिखाता है। `ScanCodeHelper.parse()` पेलोड तभी स्वीकार करता है जब वह सिक्योरिटी-कोड वर्णमाला में केवल 4-अक्षर का कोड हो, और `ScanCodeHelper.isRepeat()` उसी कोड को 4 सेकंड तक अनदेखा करता है, इसलिए B1App QR और छपे लेबल का QR ब्लॉक दोनों काम करते हैं। फिर स्क्रीन चेक-आउट रीप्रिंट पाथ का अनुसरण करती है — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — और लुकअप पर लौट आती है। स्कैन के समय कोई उपस्थिति लिखी नहीं जाती; केवल लेबल। बिना सक्रिय विज़िट वाले कोड, बिना प्रिंटर वाले स्टेशन, और बिना लेबल वाले ग्रुप हर एक एक टोस्ट दिखाते हैं और लुकअप पर लौट आते हैं।

टाइप और `ApiHelper`/`ArrayHelper` `@churchapps/helpers` और `@churchapps/apphelper` से आते हैं; B1Admin के साथ कोई React कंपोनेंट साझा नहीं होता।

## एडमिन-साइड उपस्थिति (B1Admin) {#admin-side-attendance-b1admin}

- **सेटअप** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) संरचना ट्री दिखाता है और सेवाएं (`ServiceEdit.tsx`) व सेवा समय (`ServiceTimeEdit.tsx`) बनाता है। Campus डेटा `useCampuses()` हुक के माध्यम से membership से आता है।
- **मैनुअल उपस्थिति** उपस्थिति सेक्शन में नहीं, बल्कि Groups की ओर रहती है: `B1Admin/src/groups/components/GroupSessionsTab.tsx` sessions बनाता है (`POST /attendance/sessions`; जोड़ते समय `SessionEdit.tsx` चुने गए सेवा समय को साझा करने वाले हर अन्य ग्रुप के लिए एक session शामिल कर सकता है, और जिन ग्रुप्स का उस तिथि पर session पहले से है उन्हें छोड़ देता है), और `POST /attendance/visitsessions/log` के माध्यम से लोगों को उपस्थित चिह्नित करता है, जो उस व्यक्ति और session के लिए विज़िट खोजता या बनाता है। ग्रुप लीडर `attendance.edit` अनुमति के बिना अपने ग्रुप की उपस्थिति दर्ज कर सकते हैं — कंट्रोलर `au.leaderGroupIds` जांचते हैं।
- **रिपोर्टिंग** — उपस्थिति ट्रेंड और ग्रुप उपस्थिति सर्वर-परिभाषित रिपोर्ट हैं (ReportingApi के विरुद्ध `B1Admin/src/components/reporting/ReportWithFilter.tsx`; परिभाषाएं `Api/reports/*.json` में)। दोनों `startDate`/`endDate` लेते हैं (अंतिम तिथि समावेशी); ट्रेंड रिपोर्ट डिफ़ॉल्ट रूप से एक साल पहले से आज तक होती है और प्रति सप्ताह `sessionDates` कॉलम जोड़ती है, जबकि ग्रुप उपस्थिति के स्क्रीन ट्री में हर विज़िट का `checkinTime` और व्यक्ति का `membershipStatus` शामिल है। ग्रुप उपस्थिति का CSV सहयोगी `groupAttendanceDownload` रिपोर्ट से आता है, जिसे `GroupAttendanceDownloadHelper` हर ग्रुप सदस्य के लिए एक पंक्ति में, और हर तिथि वाले session के लिए उपस्थित/अनुपस्थित कॉलम के साथ पिवट करता है; व्यक्ति का इतिहास `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`) से मिलता है।

## लेबल प्रिंटिंग {#label-printing}

### टेम्पलेट और डिज़ाइनर {#templates-and-the-designer}

चर्च B1Admin में `/mobile/checkin/labels` पर अपने लेबल खुद डिज़ाइन करते हैं (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, चेक-इन सेटिंग्स पेज से पहुंचा)। टेम्पलेट एक `labelTemplates` पंक्ति है जिसका `content` ब्लॉक्स का JSON ऐरे है — `text`, `field`, `barcode`, `qrcode`, या `box` — जिनमें से हर एक प्रतिशत निर्देशांक में, फ़ॉन्ट, संरेखण, सिंबोलॉजी (`code39`/`code128`/`qr`), और वैकल्पिक दृश्यता शर्तों (जैसे एलर्जी बॉक्स केवल तभी रेंडर करें जब `person.nametagNotes` खाली न हो) के साथ स्थित होता है। दो `labelType` हैं: `nametag` (हर चेक-इन व्यक्ति के लिए एक; फ़ील्ड जैसे `person.displayName`, `sessions`, `securityCode`, और `person.isBirthdayWeek` — `"true"` जब जन्मदिन का महीना/दिन आज से 3 दिनों के भीतर हो, वर्ष के अंत को पार करते हुए, जिसकी गणना `LabelHelper.isBirthdayWithin()` करता है) और `pickup` (हर परिवार के लिए एक; फ़ील्ड जैसे `children`, `childrenAllergies`)। सर्वर प्रति चर्च प्रति प्रकार एक डिफ़ॉल्ट लागू करता है (`LabelTemplateController.save`)। डिज़ाइनर किओस्क के बंडल लेबल से मेल खाने वाले स्टार्टर टेम्पलेट देता है और नमूना डेटा पर पूर्वावलोकन करता है।

### किओस्क पर रेंडरिंग और प्रिंटिंग {#rendering-and-printing-on-the-kiosk}

चेक-इन पूरा होने पर `B1Checkin/src/helpers/LabelHelper.ts` हर पेंडिंग विज़िट के ग्रुप फ़्लैग से तय करता है कि क्या प्रिंट करना है: `printNametag` ग्रुप्स के लिए नेमटैग, और यदि किसी विज़िट ने `parentPickup` ग्रुप को छुआ है तो एक परिवार पिकअप लेबल। `checkinType` `volunteer` वाली विज़िट `LabelHelper.selectChildVisits()` द्वारा छोड़ दी जाती हैं, ताकि Parent Pickup रूम में काम करने वाला बाल-देखभाल कर्मी कभी पिकअप लेबल ट्रिगर न करे। चेक-इन प्रतिक्रिया से सिक्योरिटी कोड बच्चों के नेमटैग और पिकअप लेबल पर जाता है; वयस्क नेमटैग बिना कोड के प्रिंट होते हैं। चर्च में टेम्पलेट हों तो `LabelRenderer` (`src/helpers/LabelRenderer.ts`) ब्लॉक्स + फ़ील्ड संदर्भ को एक स्वतंत्र HTML दस्तावेज़ में बदलता है; अन्यथा `B1Checkin/assets/labels/` के बंडल HTML लेबल प्लेसहोल्डर प्रतिस्थापन के साथ उपयोग होते हैं।

बारकोड शुद्ध-TypeScript एनकोडर्स द्वारा `B1Checkin/src/helpers/barcode.ts` में inline SVG के रूप में बनते हैं — Code 39 पैटर्न तालिकाएं और Code 128 (mod-103 चेकसम के साथ code set B) चौड़ाई तालिकाएं, और `qrcode` पैकेज के माध्यम से QR। **ये एनकोडर्स जानबूझकर B1Admin में दोहराए गए हैं** (`LabelEditor.tsx` वही तालिकाएं inline करता है, जिसका कोड कमेंट में उल्लेख है), ताकि डिज़ाइनर पूर्वावलोकन किओस्क आउटपुट के पिक्सेल-सटीक हों; एक में बदलाव दूसरे में भी लागू होना चाहिए।

प्रिंट पाइपलाइन (`src/components/PrintUI.tsx`) हर HTML लेबल को `WebView` में रेंडर करती है, `react-native-view-shot` से JPG में कैप्चर करती है, और इमेज URIs को नेटिव **printer-helper** Expo मॉड्यूल (`B1Checkin/modules/printer-helper/`) को सौंपती है। मॉड्यूल `scan()`, `checkInit()`, `printUris()`, और स्टेटस इवेंट्स उजागर करता है, जिसमें दोनों प्लेटफ़ॉर्म पर हर ब्रांड के लिए एक प्रोवाइडर है:

| ब्रांड | Android | iOS | नोट्स |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | QL-श्रृंखला नेटवर्क प्रिंटर (QL-800/810W/820NWB/1100/1110NWB…), die-cut 29×90 लेबल, अनुशंसित डिफ़ॉल्ट |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | नेटवर्क खोज + TCP/ZPL इमेज प्रिंटिंग |

प्रिंटर चयन `app/printers.tsx` पर होता है (नेटवर्क स्कैन `brand~model~ip` प्रविष्टियां लौटाता है; चुनाव AsyncStorage में सहेजा जाता है), और `src/helpers/PrinterLog.ts` एक ऑन-डिवाइस डायग्नोस्टिक लॉग रखता है, जो किओस्क हेडर में लाइव स्टेटस डॉट के माध्यम से दिखता है।

## अतिथि पंजीकरण {#guest-registration}

चेक-इन के बीच में व्यक्ति बनाने के दो पाथ हैं:

- **किओस्क पर** — परिवार स्क्रीन का "Add guest" `B1Checkin/app/addGuest.tsx` खोलता है, जो पहले `GET /membership/people/search?term=` से मौजूदा गैर-सदस्य मिलान खोजता है और अन्यथा `POST /membership/people` से एक बनाता है, जो वर्तमान परिवार से जुड़ता है। फिर अतिथि किसी भी सदस्य की तरह ग्रुप असाइनमेंट से गुज़रता है।
- **QR के माध्यम से स्व-सेवा** — जब चर्च सेटिंग `enableQRGuestRegistration` चालू हो (B1Admin की Check-In सेटिंग्स में कॉन्फ़िगर, `GET /membership/settings/public/{churchId}` से पढ़ी जाती है), तो किओस्क लुकअप स्क्रीन `https://{subdomain}.b1.church/guest-register?serviceId=` से लिंक करने वाला QR कोड दिखाती है। वह B1App पेज (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) आने वाले परिवार को अपने फ़ोन पर गुमनाम `POST /membership/people/guest-register` एंडपॉइंट से पंजीकृत करने देता है, जिससे किओस्क की कतार चलती रहती है। QR शीट पर एक **Register here** बटन भी है जो किओस्क पर (`app/guestRegister.tsx`) वही पेज एक incognito, कैश-रहित `WebView` में खोलता है; `src/helpers/GuestRegisterHelper.ts` QR और WebView दोनों के लिए URL बनाता है और `https://{subdomain}.b1.church/guest-register` के बाहर नेविगेशन रोकता है। **Done**, बैक, या 120 सेकंड की निष्क्रियता पर स्क्रीन लुकअप पर लौट जाती है (WebView से फ़ॉर्म टाइपिंग गतिविधि के रूप में भेजी जाती है), और WebView को अनमाउंट करती है ताकि एक परिवार की प्रविष्टियां अगले परिवार तक न पहुंचें।

## संबंधित पेज {#related-pages}

- [Attendance Endpoints](../api/endpoints/attendance) -- campuses, services, sessions, visits, और visit sessions के लिए पूरी REST सतह
- [Membership Endpoints](../api/endpoints/membership) -- लोग, परिवार, और ग्रुप
- [Webhooks](../api/webhooks) -- `session.created`, `attendance.recorded`, और `attendance.checkout` इवेंट्स
- [Module Structure](../api/module-structure) -- attendance मॉड्यूल सर्वर-साइड कैसे व्यवस्थित है
