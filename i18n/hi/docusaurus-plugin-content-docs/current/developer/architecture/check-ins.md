---
title: "चेक-इन"
---

# चेक-इन

<div class="article-intro">

चेक-इन एक सिस्टम है जिसके तीन प्रवेश द्वार हैं: स्टाफ़ वाले और सेल्फ़-सर्विस स्टेशनों के लिए B1Checkin किओस्क ऐप, B1App सदस्य पोर्टल के भीतर सेल्फ़ चेक-इन, और B1Admin में एडमिन-साइड उपस्थिति। तीनों मुख्य Api के एक ही attendance मॉड्यूल में लिखते हैं, और कक्षा का रूटिंग पूरी तरह Groups द्वारा होता है -- कोई अलग "locations" या "rooms" इकाई नहीं है। इसके ऊपर एक बाल-सुरक्षा परत है: हर विज़िट के लिए चेक-इन प्रकार, सर्वर-साइड क्षमता और स्वयंसेवक-अनुपात की सीमाएँ, किओस्क-साइड आयु/कक्षा पात्रता, चेक-आउट पर विश्वसनीय पिकअप सत्यापन, और चर्च के टेक्स्टिंग प्रोवाइडर के माध्यम से माता-पिता को पेज करना। यह पृष्ठ डेटा मॉडल, चेक-इन प्रवाह, सुरक्षा परत और लेबल प्रिंटिंग पाइपलाइन का मानचित्र देता है।

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
|---------|------|-------|------|
| किओस्क | `B1Checkin` | Expo / React Native, expo-router फ़ाइल रूटिंग; Android, Amazon Fire और iOS के लिए EAS बिल्ड; `expo-updates` के माध्यम से OTA अपडेट | लेबल प्रिंटिंग और सत्यापित चेक-आउट के साथ स्टाफ़ वाला या सेल्फ़-सर्विस स्टेशन |
| सेल्फ़ चेक-इन | `B1App` | Next.js (b1.church सदस्य पोर्टल) | लॉग इन सदस्य फ़ोन से अपना परिवार चेक-इन करते हैं; कोई प्रिंटिंग नहीं |
| एडमिन | `B1Admin` | React SPA | सेवा संरचना सेट करता है, सेवा समय में समूह असाइन करता है, लेबल डिज़ाइन करता है, मैन्युअल उपस्थिति दर्ज करता है, रिपोर्ट चलाता है |

तीनों `ApiHelper` के माध्यम से दो API मॉड्यूल को कॉल करते हैं: **MembershipApi** (`/membership`) लोगों, परिवारों और समूहों के लिए; **AttendanceApi** (`/attendance`) नीचे की हर चीज़ के लिए।

## डेटा मॉडल (`Api/src/modules/attendance`)

| इकाई / टेबल | मुख्य फ़ील्ड | अर्थ |
|----------------|-----------|---------|
| `campuses` | name, address | यहाँ अप्रचलित -- campuses membership मॉड्यूल (`/membership/campuses`) में मास्टर रहते हैं; attendance की प्रति पुराने रीडर्स के लिए केवल-पढ़ने योग्य और फ़्रोज़न है (`models/Campus.ts`) |
| `services` | campusId, name | एक आवर्ती सभा, जैसे "Sunday Morning" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | किसी सेवा के भीतर एक समय स्लॉट, जैसे "9:00 AM" (`models/ServiceTime.ts`)। शेड्यूल वाले कॉलम वैकल्पिक हैं (माइग्रेशन `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) और [चेक-इन विंडो](#scheduled-check-in-windows) को चलाते हैं |
| `groupServiceTimes` | groupId, serviceTimeId | जॉइन टेबल: कौन से समूह (कक्षाएँ) किन सेवा समयों पर मिलते हैं (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | किसी एक तारीख को एक समूह की एक बैठक -- चेक-इन के समय आलसी रूप से बनाई जाती है (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | किसी एक तारीख को एक व्यक्ति की उपस्थिति (`models/Visit.ts`)। `checkinType` `member` / `guest` / `volunteer` है (NULL = पुराना सदस्य), जिसे किओस्क सेट करता है और क्षमता/अनुपात गेट उपयोग करते हैं |
| `visitSessions` | visitId, sessionId | कोई विज़िट किन सत्रों को कवर करती है -- जो बच्चा दो सेवा समयों पर चेक-इन है, उसकी दो पंक्तियाँ होती हैं (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON blocks) | डिज़ाइन किए जा सकने वाले लेबल लेआउट (`models/LabelTemplate.ts`) |

### पूरा हुआ चेक-इन कैसे सहेजा जाता है

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) `POST /attendance/visits/checkin?serviceId=&peopleIds=` को संभालता है। बॉडी `Visit` ऑब्जेक्ट्स का एक array है, जिनमें से हर एक में `visitSessions` हैं, जिनका एम्बेडेड `session` केवल एक `(serviceTimeId, groupId)` जोड़ी बताता है। फिर सर्वर:

1. **कोई भी लिखने से पहले क्षमता और अनुपात जाँचता है।** `evaluateGates()` → `CheckinGateHelper.evaluate()` हर लक्षित कमरे की क्षमता, अतिथि क्षमता, बंद फ़्लैग और वर्तमान उपस्थिति के मुकाबले स्वयंसेवक अनुपात जाँचता है। postCheckin **ट्रांज़ैक्शनल नहीं है**, इसलिए गेट को पहले सेव से पहले चलना चाहिए -- कठोर उल्लंघन होने पर 409 लौटता है जिसमें प्रभावित कमरे(के नाम) होते हैं, और कुछ भी सहेजा नहीं जाता। देखें [क्षमता और स्वयंसेवक-अनुपात गेट](#capacity-and-volunteer-ratio-gates)।
2. **सत्रों को आलसी रूप से हल करता है।** `getSessionId()` `(groupId, serviceTimeId, today)` के लिए `sessions` पंक्ति खोजता या बनाता है -- सत्र id प्रति तारीख प्रोसेस-इन-मेमोरी कैश होती हैं। नए सत्र `session.created` webhook भेजते हैं। लूप एक awaited `for..of` है -- पहले का fire-and-forget `forEach(async …)` सेव से दौड़ करता था और पहला सत्र बनते समय NULL sessionIds लिखता था (ठीक किया गया; लूप पर कोड टिप्पणी में नोट है)।
3. **उस दिन के रिकॉर्ड बदलता है।** उन लोगों की उस सेवा पर आज की मौजूदा विज़िट्स उनके visitSessions सहित हटाई जाती हैं, फिर सबमिट किया गया सेट सहेजा जाता है। इसलिए किसी परिवार को दोबारा चेक-इन करना एक idempotent "यह वर्तमान स्थिति है" ऑपरेशन है, न कि जोड़ना। `?checkDuplicates=true` पास करने पर बिना लिखे `{ duplicates: [personId…] }` लौटता है, और किओस्क इसी से ओवरराइट करने से पहले चेतावनी देता है।
4. **हर बैच के लिए एक सुरक्षा कोड बनाता है।** `SecurityCodeHelper.generate()` वर्णमाला `23456789BCDFGHJKLMNPQRSTVWXYZ` से 4-अक्षर का कोड बनाता है (कोई स्वर या भ्रमित करने वाले अक्षर नहीं, ताकि कोड शब्द न बना सकें या गलत न पढ़े जाएँ)। सर्वर उसी चर्च की उसी दिन की खुली विज़िट्स से टकराव होने पर पुनः प्रयास करता है और बैच की हर विज़िट पर कोड लगाता है।
5. **`{ streaks, securityCode }` लौटाता है।** `streaks` personId को लगातार-सप्ताह उपस्थिति गणना से मैप करता है; किओस्क मील के पत्थरों (हर 5वें सप्ताह) पर कॉन्फ़ेटी से जश्न मनाता है।

सहेजी गई हर विज़िट `attendance.recorded` webhook भी भेजती है। पढ़ने वाला हिस्सा, `GET /attendance/visits/checkin`, लोगों की विज़िट्स उनकी **अंतिम दर्ज तारीख** से लौटाता है -- यदि वह पिछला सप्ताह था, तो ids हटा दिए जाते हैं, ताकि क्लाइंट को पिछले सप्ताह के कमरे चयनों की पूर्व-भरी प्रति मिले, जो नए रिकॉर्ड के रूप में सहेजी जाएगी।

### चेक-आउट

दो एंडपॉइंट लूप पूरा करते हैं (`VisitController`):

- `GET /attendance/visits/code/:code` -- आज की, जो अभी चेक-आउट नहीं हुई हैं और जिनमें वह सुरक्षा कोड है, ऐसी विज़िट्स, sessions भरे हुए।
- `POST /attendance/visits/checkout` -- बॉडी `{ visitIds, checkedOutBy?, checkedOutById? }`; `checkoutTime` और पिकअप करने वाले व्यक्ति को सेट करता है, और हर विज़िट के लिए `attendance.checkout` webhook भेजता है।

अनुमतियाँ: किओस्क `attendance.checkin` से प्रमाणित होते हैं, जो ठीक उतनी पहुँच देता है जितनी चेक-इन/चेक-आउट/लेबल टेम्पलेट के लिए चाहिए; `attendance.view`/`attendance.edit` रिपोर्टिंग और मैन्युअल प्रविष्टि कवर करते हैं; संरचना (सेवाएँ, सेवा समय, समूह असाइनमेंट) के लिए `services.edit` चाहिए। सदस्य सेल्फ़ चेक-इन (B1App) को कोई अनुमति नहीं चाहिए: चर्च में लिंक्ड व्यक्ति वाला कोई भी प्रमाणित उपयोगकर्ता `GET`/`POST /attendance/visits/checkin` कॉल कर सकता है, और सर्वर सबमिट किए गए `personId` को कॉलर के अपने परिवार तक सीमित करता है (अन्यथा 403) -- यही बाड़ दूसरे परिवारों के `securityCode` को अपठनीय रखती है। सदस्यता ही अनुमति है; सदस्य इस सुविधा को *देखते* हैं या नहीं, यह चर्च के B1App नेविगेशन टैब से नियंत्रित होता है। अन्य चेक-इन एंडपॉइंट (`code/:code`, `checkout`, `guardians`, `CheckinController`) केवल किओस्क/स्टाफ़ के लिए रहते हैं।

## समूह कमरा रूटिंग चलाते हैं

पूरे सिस्टम में कहीं भी कोई कमरा या कक्षा इकाई नहीं है। "कमरा" एक membership **समूह** है जिसमें `trackAttendance` चालू है, और जो `groupServiceTimes` के माध्यम से एक या अधिक सेवा समयों से जुड़ा है। समूह के वे फ़ील्ड (`Api/src/modules/membership/models/Group.ts` में) जो किओस्क व्यवहार तय करते हैं:

| फ़ील्ड | प्रभाव |
|------|--------|
| `trackAttendance` | समूह उपस्थिति में भाग लेता है; B1Admin का सेटअप ट्री, बिना `groupServiceTimes` पंक्ति वाले `trackAttendance` समूहों को अनअसाइन्ड चिह्नित करता है |
| `parentPickup` | बच्चों का कमरा चिह्नित करता है: इसमें चेक-इन करने पर विज़िट "child" विज़िट बन जाती है, जो परिवार का पिकअप लेबल प्रिंट करती है और नेमटैग पर सुरक्षा कोड लगाती है |
| `printNametag` | इस समूह में चेक-इन पर नेमटैग प्रिंट होगा या नहीं |
| `capacity` / `guestCapacity` / `checkinClosed` | कमरे की क्षमता सीमाएँ और एक कठोर "बंद" स्विच, जो सर्वर-साइड चेक-इन गेट द्वारा लागू होते हैं (B1Admin के समूह सेटिंग्स में "Check-In Capacity" के अंतर्गत संपादित) |
| `volunteerRatio` / `minVolunteers` | प्रति स्वयंसेवक बच्चों का अनुपात और न्यूनतम स्वयंसेवक संख्या, जो चर्च-व्यापी `ratioEnforcement` सेटिंग के अनुसार लागू होते हैं |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | आयु/कक्षा पात्रता की सीमाएँ, जिनका मूल्यांकन किओस्क-साइड होता है ताकि कमरे उभारे या फीके किए जा सकें |

हर क्लाइंट इसी तरह डीनॉर्मलाइज़ करता है (जैसे `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` और `GET /membership/groups` को समानांतर लोड करें, फिर हर सेवा समय के लिए, जिन समूहों की `groupServiceTimes` पंक्ति उस सेवा समय की ओर इशारा करती है, उन्हें `serviceTime.groups` में इकट्ठा करें। यही array कमरा चुनने वाले में दिखता है, जो समूह के `categoryName` के अनुसार व्यवस्थित होता है।

असाइनमेंट B1Admin में समूह के पृष्ठ से संपादित होते हैं (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` -- `POST`/`DELETE /attendance/groupservicetimes`), और पूरा Campus → Service → Service Time → Group ट्री `B1Admin/src/attendance/components/AttendanceSetup.tsx` में `GET /attendance/attendancerecords/tree` के माध्यम से दिखाया जाता है।

:::info
चूँकि समूह ही एकमात्र सत्य का स्रोत हैं, वही समूह सदस्यता किओस्क रूटिंग, B1Admin के समूह पृष्ठों पर रोस्टर-शैली उपस्थिति, और उपस्थिति रिपोर्टिंग को शक्ति देती है -- किसी समूह को सेवा समय पर असाइन करना ही उसे चेक-इन गंतव्य बनाने के लिए एकमात्र आवश्यक कदम है।
:::

## बाल सुरक्षा

### चेक-इन प्रकार

हर विज़िट में `checkinType` होता है -- `member`, `guest`, या `volunteer` (NULL का अर्थ पुराना/सदस्य है; माइग्रेशन `tools/migrations/attendance/2026-07-03_checkin_type.ts`)। यह प्रकार **किओस्क-साइड** चुना जाता है: विस्तारित सदस्य पंक्ति पर Member / Guest / Volunteer चिप्स (`B1Checkin/src/components/MemberServiceTimes.tsx`), जो चेक-इन पूरा होते समय हर लंबित विज़िट पर लगाए जाते हैं (`app/checkinComplete.tsx`, डिफ़ॉल्ट `member`)। सर्वर इसे गेट में उपयोग करता है -- स्वयंसेवक क्षमता के विरुद्ध गिने जाने के बजाय अनुपात कवरेज में गिने जाते हैं, और अतिथि `guestCapacity` के विरुद्ध गिने जाते हैं।

### क्षमता और स्वयंसेवक-अनुपात गेट {#capacity-and-volunteer-ratio-gates}

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) `postCheckin` के भीतर किसी भी सेव से पहले चलता है (एंडपॉइंट ट्रांज़ैक्शनल नहीं है, इसलिए सही होने का तरीका सेव से पहले गेटिंग है)। यह हर लक्षित समूह की वर्तमान उपस्थिति (`VisitRepo.countActiveByGroupToday`) और membership मॉड्यूल गेटवे के माध्यम से समूह कॉन्फ़िगरेशन लोड करता है, फिर उल्लंघनों को वर्गीकृत करता है:

- **कठोर (हमेशा रोकता है):** `checkinClosed`, `current + incoming > capacity`, अतिथि संख्या `guestCapacity` से अधिक। पूरा बैच `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` के साथ अस्वीकार होता है -- किओस्क प्रभावित कमरे का नाम दिखाता है।
- **अनुपात (चेतावनी या रोक):** आने वाले गैर-स्वयंसेवक उस कमरे में जहाँ `volunteers < minVolunteers`, बिल्कुल कोई स्वयंसेवक नहीं, या `children > volunteers × volunteerRatio`। गंभीरता प्रति-चर्च सेटिंग `ratioEnforcement` (`"warn"` डिफ़ॉल्ट / `"block"`, B1Admin Manage Church → Check-In, `CheckinSettingsEdit.tsx` में संपादित) से तय होती है। warn-मोड में `409 { warning: true, error: "ratio", … }` लौटता है, जब तक क्लाइंट `acknowledgeWarnings=true` के साथ दोबारा सबमिट न करे -- वही दोबारा सबमिट किओस्क का स्टाफ़-पुष्टि ओवरराइड है।

### निर्धारित चेक-इन विंडो {#scheduled-check-in-windows}

किसी सेवा समय में वैकल्पिक साप्ताहिक शेड्यूल हो सकता है (`dayOfWeek` 0–6, जिसमें 0 = रविवार; `startTime`/`endTime` `HH:mm` के रूप में; `checkinOpenMinutes`, `checkinCloseMinutes`), जो B1Admin के **Attendance → Setup** सेवा-समय फ़ॉर्म में संपादित होता है (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, "Check-in Schedule")। `CheckinGateHelper.hasSchedule()` किसी सेवा समय को तभी निर्धारित मानता है जब `dayOfWeek` और `startTime` दोनों सेट हों; बिना शेड्यूल वाले समय कभी समय से बंद नहीं होते। `isServiceTimeOpen()` विंडो चर्च के स्थानीय समय में गणना करता है (`DateHelper.toChurchTime`)। समय क्षेत्र चर्च का `timeZone` है; जिन चर्चों में यह सेट नहीं है, वे पहले ऐसे पहले गैर-हटाए गए campus का `timezone` लेते हैं (`MembershipModuleGateway.loadCampusTimeZone`), और उसके भी न होने पर `America/New_York`। सूची और पोस्टिंग दोनों पथ इसे नीचे दिए अनुसार `checkinOpenMinutes` से शुरुआत से पहले से `checkinCloseMinutes` बाद तक (या अंत न हो तो शुरुआत के बाद) एक ही तरह हल करते हैं, और आधी रात या सप्ताह की सीमा पार करने वाली विंडो को भी संभालते हैं।

विंडो दो जगह लागू होती है:

- **सूची:** `GET /attendance/servicetimes` हर पंक्ति पर गणना किया गया `checkinOpen` बूलियन जोड़ता है। B1App का सेल्फ़ चेक-इन (`CheckinPage.tsx`) और B1Checkin का सेवा चयनकर्ता (`app/services.tsx`) दोनों वे समय हटा देते हैं जहाँ `checkinOpen === false` है, और जब किसी सेवा के समय तो हों पर कोई खुला न हो, तब "Check-in isn't open for this service right now." दिखाते हैं (किओस्क पर दूसरी सेवा चुनने के लिए Back बटन मिलता है)।
- **पोस्टिंग:** `evaluateGates()` के भीतर, क्षमता/अनुपात मूल्यांकन से पहले, `findClosedServiceTimeGroups()` बैच को `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` के साथ अस्वीकार करता है, यदि किसी लक्षित सत्र का सेवा समय उसकी विंडो के बाहर है। B1Checkin इसे अपनी कठोर-गेट स्क्रीन पर "check-in isn't open right now" कारण के साथ दिखाता है (क्षमता उल्लंघन अब भी "room is full or closed" पढ़ते हैं)।

### आयु/कक्षा पात्रता (किओस्क-साइड) {#agegrade-eligibility-kiosk-side}

कमरे की पात्रता सलाहकार UI है, जिसका मूल्यांकन किओस्क पर होता है, सर्वर द्वारा लागू नहीं होता। `B1Checkin/src/helpers/EligibilityHelper.ts` किसी व्यक्ति की जन्मतिथि/कक्षा की तुलना समूह के `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` से करता है (कक्षा क्रम: PreK, K, 1–12, Graduated) और `eligible` / `ineligible` / `unknown` लौटाता है -- डेटा न होने पर `unknown` आता है और कोई कमरा कभी नहीं छिपता। आयु और कक्षा चर्च की **कक्षा प्रोन्नति तिथि** (`gradePromotionDate` सेटिंग, `"MM-DD"`, `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx` में संपादित) की तिथि पर गणना होती है; किओस्क इसे `GET /attendance/checkin/settings` से लाता है, और `resolveAsOfDate` आज या उससे पहले की सबसे हाल की तिथि चुनता है। कमरा चयनकर्ता पात्र कमरों को उभारता है और अपात्र कमरों को फीका करता है; फीके कमरे को चुनने के लिए स्टाफ़ पुष्टि चाहिए।

### विश्वसनीय और अनधिकृत पिकअप {#trusted-and-not-authorized-pickup}

पिकअप के लोग एक membership इकाई हैं, प्रति परिवार: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` -- householdId, वैकल्पिक personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes)। CRUD है `GET /membership/householdpickup/:householdId` (कोई भी प्रमाणित चर्च उपयोगकर्ता, ताकि किओस्क पढ़ सकें) और `POST` / `DELETE`, जो `people.edit` से सुरक्षित हैं। स्टाफ़ सूची व्यक्ति के पृष्ठ के **Pickup** कार्ड पर प्रबंधित करता है (`B1Admin/src/people/components/PickupPeople.tsx`) -- फ़ोटो, रिश्ता, और Trusted/Not Authorized स्टेटस चिप।

चेक-आउट पर (`B1Checkin/app/checkout.tsx`) किओस्क परिवार की पिकअप सूची लोड करता है: `trusted` प्रविष्टियाँ परिवार के वयस्कों की फ़ोटो ग्रिड के साथ टैप-योग्य पिकअप कार्ड के रूप में दिखती हैं, और मुक्त-लिखित "Other" नाम को `notAuthorized` प्रविष्टियों से फ़ज़ी-मैच किया जाता है (Levenshtein, `src/helpers/PickupMatchHelper.ts`)। मैच होने पर चेतावनी शीट के साथ चेक-आउट रुक जाता है और स्टाफ़ का **Override** बटन दिखता है। ओवरराइड विज़िट पर ही दर्ज होता है: यह सामान्य `POST /attendance/visits/checkout` के माध्यम से `checkedOutBy` को `"OVERRIDE: {name}"` के रूप में भेजता है, इसलिए यह उपस्थिति रिकॉर्ड और `attendance.checkout` webhook में जाता है, अलग ऑडिट टेबल में नहीं।

### माता-पिता को पेज करना और आपातकालीन प्रसारण

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) दो SMS एंडपॉइंट देता है:

- `POST /page` -- `{ visitId, message }`: किसी एक चेक-इन बच्चे के अभिभावकों को पेज करता है (किओस्क चेक-आउट स्क्रीन, manned मोड में)।
- `POST /broadcast` -- `{ serviceId, message }`: किसी सेवा के लिए हर चेक-इन परिवार के वयस्कों को टेक्स्ट भेजता है (किओस्क एडमिन सेटिंग्स, `B1Checkin/app/adminSettings.tsx` में टाइप-`EMERGENCY` टाइप करके पुष्टि करने वाली शीट के पीछे)।

दोनों membership गेटवे के माध्यम से परिवार के वयस्कों को खोजते हैं, फिर डिलीवरी **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) को सौंपते हैं -- चर्च के कॉन्फ़िगर किए गए टेक्स्टिंग प्रोवाइडर (`@churchapps/texting`: TextInChurch, Clearstream, या MutualMinistry; कोई बिल्ट-इन SMS भेजने वाला नहीं है) का क्रॉस-मॉड्यूल द्वार। गेटवे एक `sentText` पंक्ति और प्रति-प्राप्तकर्ता `deliveryLog` प्रविष्टियाँ लिखता है, और एक बैच को 500 प्राप्तकर्ताओं तक सीमित करता है; कोई प्रोवाइडर कॉन्फ़िगर न होने पर `no_provider` लौटता है, जिसे किओस्क "No SMS provider configured" के रूप में दिखाता है। कंट्रोलर का `dispatch()` फ़ोन नंबरों को डुप्लिकेट से हटाता है और ऐसे लोगों को छोड़ता है जिनका मोबाइल नहीं है या जिन पर `optedOut` है, और `{ sent, failed, skippedOptedOut, skippedNoPhone }` लौटाता है, ताकि किओस्क दिखा सके कि क्या छोड़ा गया।

## किओस्क (B1Checkin)

स्क्रीन `B1Checkin/app/` के अंतर्गत expo-router फ़ाइलें हैं; स्क्रीनों के बीच की स्थिति एक स्टेटिक `CachedData` क्लास (`src/helpers/CachedData.ts`) में रहती है, React state में नहीं।

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **लुकअप** (`app/lookup.tsx`) -- फ़ोन से खोजें (`GET /membership/people/search/phone?number=`, अंतिम-4 या पूरा) या नाम से (`GET /membership/people/search?term=`)। किसी मिलान को चुनने पर परिवार लोड होता है (`GET /membership/people/household/{householdId}`) और मौजूदा विज़िट्स (`GET /attendance/visits/checkin`), जो `pendingVisits` को पिछले सप्ताह के चयनों से भरती हैं।
2. **परिवार समीक्षा** (`app/household.tsx`, `src/components/MemberList.tsx`) -- हर सदस्य पंक्ति पर पहले से-चेक-इन बैज, एलर्जी/`nametagNotes` बैज, और उनके वर्तमान कमरा चिप दिखते हैं। किसी सदस्य को विस्तार देने पर हर सेवा समय दिखता है, जिसमें कमरा बटन और Member / Guest / Volunteer चेक-इन-प्रकार चिप्स हैं (`MemberServiceTimes.tsx`)। हर सेवा समय के नाम के नीचे, `ServiceTimeHelper.getGroupSummary()` वहाँ दी जाने वाली समूह सूची दिखाता है (`serviceTime.groups` के नाम, ट्रिम किए हुए, केस-इनसेंसिटिव रूप से डुप्लिकेट हटाए हुए, कॉमा से जुड़े); यदि समय पर कोई समूह न हो तो कुछ नहीं दिखता।
3. **समूह असाइनमेंट** (`app/selectGroup.tsx`) -- `serviceTime.groups` से बना श्रेणी ट्री, जिसमें आयु/कक्षा-पात्र कमरे उभारे जाते हैं और अपात्र कमरे स्टाफ़ पुष्टि के पीछे फीके रहते हैं (देखें [आयु/कक्षा पात्रता](#agegrade-eligibility-kiosk-side))। कमरा चुनने पर उस व्यक्ति की लंबित विज़िट में `{ session: { serviceTimeId, groupId } }` visitSession लिखा जाता है (`src/helpers/VisitSessionHelper.ts`)। "None" उसे साफ़ करता है।
4. **पूरा** (`app/checkinComplete.tsx`) -- `pendingVisits` के साथ `POST /attendance/visits/checkin` (हर एक पर उसका `checkinType` लगा होता है), फिर यदि प्रिंटर कॉन्फ़िगर है तो लेबल प्रिंट होते हैं और स्क्रीन लुकअप पर अपने आप लौट जाती है। `409` क्षमता या `notOpen` प्रतिक्रिया कारण सहित प्रभावित कमरा दिखाती है (भरा/बंद, या चेक-इन खुला नहीं); अनुपात चेतावनी स्टाफ़ पुष्टि देती है, जो `acknowledgeWarnings=true` के साथ दोबारा सबमिट करती है।

**चेक-आउट** स्क्रीन (`app/checkout.tsx`) 4-अक्षर का सुरक्षा कोड एक ऑटो-फ़ोकस इनपुट के माध्यम से स्वीकार करती है -- इसलिए USB/Bluetooth कीबोर्ड-वेज बारकोड स्कैनर कैमरे के बिना काम करते हैं -- या उसी वर्णमाला वाला ऑन-स्क्रीन कीपैड, जो 4 अक्षरों पर स्वतः सबमिट होता है। **Scan** बटन एक शीट खोलता है जिसमें साझा `src/components/CodeScanner.tsx` कैमरा है (डिफ़ॉल्ट रूप से बैक-फ़ेसिंग, QR, Code 128, और Code 39 स्वीकार करता है), ताकि बिना वेज स्कैनर वाले स्टेशन भी पिकअप लेबल पढ़ सकें; स्कैन किया गया कोड उसी `handleCode()` पथ में जाता है जहाँ टाइप किया गया इनपुट जाता है। यह कोड खोजता है, उठाए जा रहे बच्चे दिखाता है, और परिवार के **विश्वसनीय पिकअप लोगों** को टैप-योग्य कार्ड के रूप में परिवार के वयस्कों की फ़ोटो ग्रिड के साथ दिखाता है (साथ में "Other" मुक्त-टेक्स्ट विकल्प, जिसे अनधिकृत नामों से फ़ज़ी-चेक किया जाता है -- देखें [विश्वसनीय और अनधिकृत पिकअप](#trusted-and-not-authorized-pickup)), फिर पिकर के नाम/id के साथ `POST /attendance/visits/checkout` भेजता है। manned मोड में यह स्क्रीन **Page a parent** (`POST /attendance/checkin/page`) और **सुरक्षा-लेबल पुनः प्रिंट** भी देती है -- `reprint()` `LabelHelper.getAllLabelsFor(...)` से परिवार के लेबल फिर से बनाता है और उन्हें चेक-इन वाले उसी `PrintUI` पाइपलाइन से गुज़ारता है।

स्टेशन का व्यक्तित्व एक AsyncStorage फ़्लैग `@StationMode` (`"self"` | `"manned"`, `app/adminSettings.tsx` में टॉगल) है। manned मोड लुकअप स्क्रीन पर चेक-आउट प्रवेश बिंदु और परिवार स्क्रीन से प्रति-सदस्य प्रोफ़ाइल संपादन (`POST /membership/people`) जोड़ता है। किओस्क की सुरक्षा अंतर्निहित है: एक वैकल्पिक PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) एडमिन और प्रिंटर स्क्रीनों को सुरक्षित करता है, एडमिन स्क्रीन केवल हेडर लोगो पर 7 तेज़ टैप से खुलती है, और एक निष्क्रिय attract स्क्रीन (`src/hooks/useInactivityTimer.ts`) परिवारों के बीच नियंत्रण लेती है।

## सेल्फ़ चेक-इन (B1App)

सदस्य b1.church पोर्टल पर `/mobile/checkin` स्क्रीन से चेक-इन करते हैं (`B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` द्वारा `screens/CheckinPage.tsx` तक रूट)। इसके लिए लॉग इन उपयोगकर्ता चाहिए, और यह किओस्क वाले चार चरणों -- सेवाएँ → परिवार → समूह → पूरा -- से उसी एंडपॉइंट्स के विरुद्ध गुज़रता है, जिसकी स्थिति `B1App/src/helpers/CheckinHelper.ts` में रहती है। किओस्क से अंतर: परिवार लॉग इन उपयोगकर्ता के अपने `householdId` से आता है (खोज चरण नहीं है), और कोई लेबल प्रिंटिंग नहीं है -- इसके बजाय पूरा होने वाली स्क्रीन बैच का सुरक्षा कोड QR (`qrcode.react`) के रूप में दिखाती है, साथ में "show this at a check-in station" संकेत। यदि पेज लोड होने पर परिवार पहले से चेक-इन है, तो "Show check-in code" बटन पहली मौजूदा विज़िट (`GET /attendance/visits/checkin`) से, जिसमें `securityCode` हो, QR फिर से दिखाता है। चेक-इन सबमिट के समय तुरंत दर्ज होता है (कोई लंबित स्थिति नहीं); QR केवल किओस्क पर लेबल प्रिंटिंग चलाता है।

**फ़ोन से किओस्क पर लेबल प्रिंटिंग** (`B1Checkin/app/scan.tsx`, लुकअप स्क्रीन के QR "Scan code" बटन से पहुँचा): किओस्क QR कोड के लिए स्कैन करते हुए `CodeScanner` (`expo-camera` `CameraView`, डिफ़ॉल्ट रूप से फ़्रंट-फ़ेसिंग, पलटने योग्य) दिखाता है। `ScanCodeHelper.parse()` केवल तभी पेलोड स्वीकार करता है जब वह सुरक्षा-कोड वर्णमाला में केवल 4-अक्षर का कोड हो, और `ScanCodeHelper.isRepeat()` उसी कोड को 4 सेकंड तक अनदेखा करता है, इसलिए B1App का QR और प्रिंट किए गए लेबल का QR ब्लॉक दोनों काम करते हैं। फिर स्क्रीन चेक-आउट पुनः-प्रिंट पथ का अनुसरण करती है -- `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` -- और लुकअप पर लौट जाती है। स्कैन के समय कोई उपस्थिति लेखन नहीं होता; केवल लेबल। बिना सक्रिय विज़िट वाले कोड, बिना प्रिंटर वाले स्टेशन, और बिना लेबल वाले समूह हर एक एक toast दिखाते हैं और लुकअप पर लौट जाते हैं।

प्रकार और `ApiHelper`/`ArrayHelper` `@churchapps/helpers` और `@churchapps/apphelper` से आते हैं; B1Admin के साथ कोई React कंपोनेंट साझा नहीं होता।

## एडमिन-साइड उपस्थिति (B1Admin)

- **सेटअप** -- `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) संरचना ट्री दिखाता है और सेवाएँ (`ServiceEdit.tsx`) व सेवा समय (`ServiceTimeEdit.tsx`) बनाता है। Campus डेटा `useCampuses()` हुक के माध्यम से membership से आता है।
- **मैन्युअल उपस्थिति** attendance सेक्शन में नहीं, बल्कि Groups की ओर रहती है: `B1Admin/src/groups/components/GroupSessionsTab.tsx` सत्र बनाता है (`POST /attendance/sessions`; जोड़ते समय `SessionEdit.tsx` चुने गए सेवा समय को साझा करने वाले हर अन्य समूह के लिए एक-एक सत्र शामिल कर सकता है, और जिन समूहों का उस तारीख पर सत्र पहले से है उन्हें छोड़ देता है) और `POST /attendance/visitsessions/log` के माध्यम से लोगों को उपस्थित चिह्नित करता है, जो उस व्यक्ति और सत्र के लिए विज़िट खोजता या बनाता है। समूह के नेता `attendance.edit` अनुमति के बिना अपने समूहों की उपस्थिति दर्ज कर सकते हैं -- कंट्रोलर `au.leaderGroupIds` जाँचते हैं।
- **रिपोर्टिंग** -- attendance trend और group attendance सर्वर-परिभाषित रिपोर्ट हैं (`B1Admin/src/components/reporting/ReportWithFilter.tsx` ReportingApi के विरुद्ध; परिभाषाएँ `Api/reports/*.json` में)। दोनों `startDate`/`endDate` लेते हैं (अंतिम तिथि शामिल); trend रिपोर्ट का डिफ़ॉल्ट एक वर्ष पहले से आज तक है और हर सप्ताह के लिए `sessionDates` कॉलम जोड़ती है, और group attendance की स्क्रीन पर दिखने वाली ट्री में हर विज़िट का `checkinTime` और व्यक्ति का `membershipStatus` शामिल है। Group attendance का CSV सहयोगी `groupAttendanceDownload` रिपोर्ट से आता है, जिसे `GroupAttendanceDownloadHelper` हर समूह सदस्य के लिए एक पंक्ति में बदलता है, जिसमें हर तिथि वाले सत्र के लिए उपस्थित/अनुपस्थित कॉलम होता है; व्यक्ति का इतिहास `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`) से मिलता है।

## लेबल प्रिंटिंग

### टेम्पलेट और डिज़ाइनर

चर्च B1Admin में `/mobile/checkin/labels` पर अपने लेबल डिज़ाइन करते हैं (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, चेक-इन सेटिंग्स पृष्ठ से पहुँचा जाता है)। टेम्पलेट एक `labelTemplates` पंक्ति है जिसका `content` ब्लॉक्स का JSON array है -- `text`, `field`, `barcode`, `qrcode`, या `box` -- हर एक प्रतिशत निर्देशांक में स्थित, फ़ॉन्ट, संरेखण, सिंबोलॉजी (`code39`/`code128`/`qr`) और वैकल्पिक दृश्यता शर्तों के साथ (जैसे एलर्जी बॉक्स केवल तब रेंडर करें जब `person.nametagNotes` खाली न हो)। दो `labelType` हैं: `nametag` (चेक-इन किए हर व्यक्ति के लिए एक; फ़ील्ड जैसे `person.displayName`, `sessions`, `securityCode`, और `person.isBirthdayWeek` -- `"true"` जब जन्मदिन का माह/दिन आज से 3 दिनों के भीतर हो, वर्ष के अंत को पार करते हुए, जिसकी गणना `LabelHelper.isBirthdayWithin()` करता है) और `pickup` (हर परिवार के लिए एक; फ़ील्ड जैसे `children`, `childrenAllergies`)। सर्वर हर चर्च के लिए हर प्रकार में एक ही डिफ़ॉल्ट लागू करता है (`LabelTemplateController.save`)। डिज़ाइनर किओस्क के बंडल लेबलों से मेल खाने वाले स्टार्टर टेम्पलेट देता है और नमूना डेटा पर पूर्वावलोकन करता है।

### किओस्क पर रेंडरिंग और प्रिंटिंग

चेक-इन पूरा होने पर, `B1Checkin/src/helpers/LabelHelper.ts` हर लंबित विज़िट पर समूह फ़्लैग से तय करता है कि क्या प्रिंट करना है: `printNametag` समूहों के लिए नेमटैग, और यदि किसी विज़िट ने `parentPickup` समूह को छुआ है तो एक परिवार पिकअप लेबल। `checkinType` `volunteer` वाली विज़िट `LabelHelper.selectChildVisits()` द्वारा छोड़ी जाती हैं, इसलिए Parent Pickup कमरे में काम करने वाला बाल-सेवा कार्यकर्ता कभी पिकअप लेबल ट्रिगर नहीं करता। चेक-इन प्रतिक्रिया का सुरक्षा कोड बच्चों के नेमटैग और पिकअप लेबल पर जाता है; वयस्क नेमटैग बिना कोड के प्रिंट होते हैं। यदि चर्च के पास टेम्पलेट हैं, तो `LabelRenderer` (`src/helpers/LabelRenderer.ts`) ब्लॉक्स और फ़ील्ड संदर्भ को एक स्वतंत्र HTML दस्तावेज़ में बदलता है; अन्यथा `B1Checkin/assets/labels/` के बंडल HTML लेबल प्लेसहोल्डर प्रतिस्थापन के साथ उपयोग होते हैं।

बारकोड `B1Checkin/src/helpers/barcode.ts` में शुद्ध-TypeScript एनकोडरों द्वारा inline SVG के रूप में बनते हैं -- Code 39 पैटर्न टेबल और Code 128 (mod-103 चेकसम के साथ code set B) चौड़ाई टेबल, और `qrcode` पैकेज के माध्यम से QR। **ये एनकोडर जानबूझकर B1Admin में दोहराए गए हैं** (`LabelEditor.tsx` वही टेबल inline करता है, जिसका कोड टिप्पणी में उल्लेख है), ताकि डिज़ाइनर पूर्वावलोकन किओस्क आउटपुट से पिक्सेल-सटीक हों; एक में बदलाव दूसरे में भी लागू होना चाहिए।

प्रिंट पाइपलाइन (`src/components/PrintUI.tsx`) हर HTML लेबल को `WebView` में रेंडर करती है, `react-native-view-shot` से JPG में कैप्चर करती है, और छवि URI को नेटिव **printer-helper** Expo मॉड्यूल (`B1Checkin/modules/printer-helper/`) को सौंपती है। मॉड्यूल `scan()`, `checkInit()`, `printUris()` और स्थिति इवेंट देता है, जिसमें दोनों प्लेटफ़ॉर्म पर हर ब्रांड का एक प्रोवाइडर है:

| ब्रांड | Android | iOS | टिप्पणियाँ |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | QL-श्रृंखला नेटवर्क प्रिंटर (QL-800/810W/820NWB/1100/1110NWB…), 29×90 डाई-कट लेबल, अनुशंसित डिफ़ॉल्ट |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | नेटवर्क खोज + TCP/ZPL छवि प्रिंटिंग |

प्रिंटर चयन `app/printers.tsx` पर है (नेटवर्क स्कैन `brand~model~ip` प्रविष्टियाँ लौटाता है; चुनाव AsyncStorage में सहेजा जाता है), और `src/helpers/PrinterLog.ts` एक ऑन-डिवाइस डायग्नोस्टिक लॉग रखता है, जो किओस्क हेडर में लाइव स्टेटस डॉट के माध्यम से दिखता है।

## अतिथि पंजीकरण

दो पथ चेक-इन के बीच में एक व्यक्ति बनाते हैं:

- **किओस्क पर** -- परिवार स्क्रीन का "Add guest" `B1Checkin/app/addGuest.tsx` खोलता है, जो पहले `GET /membership/people/search?term=` पर किसी मौजूदा गैर-सदस्य मिलान को खोजता है, और अन्यथा `POST /membership/people` से एक नया बनाता है, जो वर्तमान परिवार से जुड़ता है। अतिथि फिर किसी भी सदस्य की तरह समूह असाइनमेंट से गुज़रता है।
- **QR के माध्यम से सेल्फ़-सर्विस** -- जब चर्च सेटिंग `enableQRGuestRegistration` चालू होती है (B1Admin की Check-In सेटिंग्स में कॉन्फ़िगर, `GET /membership/settings/public/{churchId}` से पढ़ी जाती है), तो किओस्क लुकअप स्क्रीन `https://{subdomain}.b1.church/guest-register?serviceId=` से लिंक करने वाला QR कोड दिखाती है। वह B1App पृष्ठ (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) एक आने वाले परिवार को अपने फ़ोन पर स्वयं पंजीकरण करने देता है, अनाम `POST /membership/people/guest-register` एंडपॉइंट के माध्यम से, जिससे किओस्क की कतार चलती रहती है। QR शीट पर एक **Register here** बटन भी है, जो वही पृष्ठ किओस्क पर (`app/guestRegister.tsx`) एक गुप्त, कैश-रहित `WebView` में खोलता है; `src/helpers/GuestRegisterHelper.ts` QR और WebView दोनों के लिए URL बनाता है और `https://{subdomain}.b1.church/guest-register` से बाहर के नेविगेशन को रोकता है। स्क्रीन **Done**, बैक, या 120 सेकंड की निष्क्रियता पर लुकअप पर लौट जाती है (फ़ॉर्म टाइपिंग WebView से गतिविधि के रूप में आती है), और WebView को अनमाउंट करती है, ताकि एक परिवार की प्रविष्टियाँ अगले तक न पहुँचें।

## संबंधित पृष्ठ

- [Attendance एंडपॉइंट](../api/endpoints/attendance) -- campuses, services, sessions, visits और visit sessions का पूरा REST सेट
- [Membership एंडपॉइंट](../api/endpoints/membership) -- लोग, परिवार और समूह
- [Webhooks](../api/webhooks) -- `session.created`, `attendance.recorded`, और `attendance.checkout` इवेंट
- [मॉड्यूल संरचना](../api/module-structure) -- attendance मॉड्यूल सर्वर-साइड कैसे व्यवस्थित है
