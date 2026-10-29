---
title: "चेक-इन"
---

# चेक-इन

<div class="article-intro">

चेक-इन तीन प्रवेश-द्वारों वाली एक प्रणाली है: स्टाफ़ वाले और स्व-सेवा स्टेशनों के लिए B1Checkin किओस्क ऐप, B1App सदस्य पोर्टल के भीतर स्व-चेक-इन, और B1Admin में एडमिन-पक्ष उपस्थिति। तीनों core Api के एक ही attendance module में लिखते हैं, और कक्षा रूटिंग पूरी तरह Groups द्वारा संचालित होती है -- कोई अलग "locations" या "rooms" entity नहीं है। इसके ऊपर एक child-safety परत है: प्रति-visit check-in types, server-side capacity और volunteer-ratio gates, kiosk-side age/grade पात्रता, check-out पर trusted-pickup सत्यापन, और चर्च के texting provider के माध्यम से माता-पिता को paging। यह पृष्ठ data model, check-in flows, safety परत, और label printing pipeline को मैप करता है।

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

| Surface | Repo | Stack | भूमिका |
|---------|------|-------|------|
| Kiosk | `B1Checkin` | Expo / React Native, expo-router file routing; Android, Amazon Fire, और iOS के लिए EAS builds; `expo-updates` के माध्यम से OTA updates | label printing और सत्यापित check-out के साथ स्टाफ़ वाला या स्व-सेवा स्टेशन |
| Self check-in | `B1App` | Next.js (b1.church सदस्य पोर्टल) | लॉग इन सदस्य फ़ोन से अपना household चेक इन करते हैं; कोई printing नहीं |
| Admin | `B1Admin` | React SPA | service structure कॉन्फ़िगर करता है, groups को service times असाइन करता है, labels डिज़ाइन करता है, मैन्युअल उपस्थिति दर्ज करता है, रिपोर्ट चलाता है |

तीनों `ApiHelper` के माध्यम से वही दो API modules कॉल करते हैं: **MembershipApi** (`/membership`) लोगों, households और groups के लिए; **AttendanceApi** (`/attendance`) नीचे की हर चीज़ के लिए।

## डेटा मॉडल (`Api/src/modules/attendance`)

| Entity / table | मुख्य फ़ील्ड | अर्थ |
|----------------|-----------|---------|
| `campuses` | name, address | यहाँ अप्रचलित -- campuses membership module में मास्टर किए जाते हैं (`/membership/campuses`); attendance की प्रति legacy readers के लिए केवल-पढ़ने योग्य फ़्रीज़ है (`models/Campus.ts`) |
| `services` | campusId, name | एक आवर्ती सभा, जैसे "Sunday Morning" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | एक सेवा के भीतर एक समय स्लॉट, जैसे "9:00 AM" (`models/ServiceTime.ts`)। शेड्यूल कॉलम वैकल्पिक हैं (migration `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) और [check-in विंडो](#scheduled-check-in-windows) को चलाते हैं |
| `groupServiceTimes` | groupId, serviceTimeId | Join table: कौन से समूह (कक्षाएँ) किन service times पर मिलते हैं (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | एक तारीख पर एक समूह की एक बैठक -- check-in के समय आलसी रूप से बनती है (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | एक तारीख पर एक व्यक्ति की उपस्थिति (`models/Visit.ts`)। `checkinType` `member` / `guest` / `volunteer` है (NULL = legacy member), जिसे kiosk सेट करता है और capacity/ratio gates उपयोग करते हैं |
| `visitSessions` | visitId, sessionId | एक visit किन session(s) को कवर करती है -- दो service times पर चेक इन किया गया बच्चा दो rows पाता है (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON blocks) | डिज़ाइन करने योग्य label लेआउट (`models/LabelTemplate.ts`) |

### पूर्ण check-in कैसे सहेजा जाता है

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) `POST /attendance/visits/checkin?serviceId=&peopleIds=` को संभालता है। body `Visit` ऑब्जेक्ट्स की एक सरणी है, हर एक में `visitSessions` होते हैं जिनका embedded `session` केवल एक `(serviceTimeId, groupId)` जोड़ी नाम देता है। फिर सर्वर:

1. **किसी भी write से पहले capacity और ratios गेट करता है।** `evaluateGates()` → `CheckinGateHelper.evaluate()` हर लक्षित कक्षा की capacity, guest capacity, closed flag, और volunteer ratio को वर्तमान occupancy के विरुद्ध जाँचता है। postCheckin **transactional नहीं** है, इसलिए gate पहले save से पहले चलना चाहिए -- एक कठोर उल्लंघन उस कक्षा/कक्षाओं का नाम लेते हुए 409 लौटाता है और कुछ भी सहेजा नहीं जाता। देखें [Capacity और volunteer-ratio gates](#capacity-and-volunteer-ratio-gates)।
2. **Sessions आलसी रूप से हल करता है।** `getSessionId()` `(groupId, serviceTimeId, today)` के लिए `sessions` row खोजता या बनाता है -- session ids प्रति तारीख process-में cache होते हैं। नए sessions एक `session.created` webhook emit करते हैं। लूप एक awaited `for..of` है -- एक पुराना fire-and-forget `forEach(async …)` save से होड़ करता था और पहले session बनाते समय NULL sessionIds लिखता था (ठीक किया गया; लूप पर एक code comment में नोट है)।
3. **दिन के रिकॉर्ड बदलता है।** उन लोगों के इस सेवा पर आज के मौजूदा visits उनके visitSessions सहित हटा दिए जाते हैं, फिर सबमिट किया गया सेट सहेजा जाता है। इसलिए किसी परिवार को फिर से चेक इन करना एक idempotent "यह वर्तमान स्थिति है" संचालन है, append नहीं। इसके बजाय `?checkDuplicates=true` पास करने पर बिना लिखे `{ duplicates: [personId…] }` लौटता है, जिससे kiosk overwrite से पहले चेतावनी देता है।
4. **हर batch के लिए एक security code बनाता है।** `SecurityCodeHelper.generate()` वर्णमाला `23456789BCDFGHJKLMNPQRSTVWXYZ` से 4-अक्षर का code बनाता है (कोई स्वर या भ्रमित करने वाले अक्षर नहीं, इसलिए codes शब्द नहीं बना सकते या गलत नहीं पढ़े जा सकते)। सर्वर उसी चर्च के उसी-दिन के खुले visits के विरुद्ध टकराव पर पुनः प्रयास करता है और batch के हर visit पर code छापता है।
5. **`{ streaks, securityCode }` लौटाता है।** `streaks` personId को लगातार-सप्ताह उपस्थिति गिनती से मैप करता है; kiosk मील के पत्थरों (हर 5वें सप्ताह) पर confetti से जश्न मनाता है।

हर सहेजा गया visit एक `attendance.recorded` webhook भी emit करता है। read पक्ष, `GET /attendance/visits/checkin`, लोगों के visits को उनकी **अंतिम लॉग की गई तारीख** से लौटाता है -- यदि वह पिछला सप्ताह था तो ids हटा दिए जाते हैं, इसलिए client को पिछले सप्ताह की कक्षा चयनों की एक पहले से भरी प्रति मिलती है जो नए रिकॉर्ड के रूप में सहेजी जाएगी।

### Check-out

दो endpoints लूप पूरा करते हैं (`VisitController`):

- `GET /attendance/visits/code/:code` — आज के वे visits जो अभी check out नहीं हुए और उस security code को रखते हैं, sessions भरे हुए।
- `POST /attendance/visits/checkout` — body `{ visitIds, checkedOutBy?, checkedOutById? }`; `checkoutTime` और किसने पिकअप किया उसे अंकित करता है, और प्रति visit एक `attendance.checkout` webhook emit करता है।

अनुमतियाँ: kiosks `attendance.checkin` से प्रमाणीकृत होते हैं, जो ठीक check-in/check-out/label-template surface देती है; `attendance.view`/`attendance.edit` रिपोर्टिंग और मैन्युअल प्रविष्टि को कवर करते हैं; संरचना (services, service times, group असाइनमेंट) के लिए `services.edit` चाहिए। सदस्य स्व चेक-इन (B1App) को कोई अनुमति नहीं चाहिए: चर्च में लिंक्ड व्यक्ति वाला कोई भी प्रमाणित उपयोगकर्ता `GET`/`POST /attendance/visits/checkin` कॉल कर सकता है, और सर्वर सबमिट किए गए `personId`s को कॉलर के अपने household तक सीमित करता है (अन्यथा 403 -- यही बाड़ दूसरे परिवारों के `securityCode`s को अपठनीय रखती है)। सदस्यता ही अनुदान है; सदस्य इस सुविधा को *देखते* हैं या नहीं, यह चर्च के B1App navigation tabs से नियंत्रित होता है। अन्य check-in endpoints (`code/:code`, `checkout`, `guardians`, `CheckinController`) केवल kiosk/स्टाफ़ के लिए रहते हैं।

## समूह कक्षा रूटिंग चलाते हैं

पूरे सिस्टम में कहीं भी कोई room या classroom entity नहीं है। "room" एक membership **group** है जिसमें `trackAttendance` सक्षम है, जो `groupServiceTimes` के माध्यम से एक या अधिक service times से जुड़ा है। समूह के फ़ील्ड (`Api/src/modules/membership/models/Group.ts` पर) जो kiosk व्यवहार को आकार देते हैं:

| Field | प्रभाव |
|------|--------|
| `trackAttendance` | समूह उपस्थिति में भाग लेता है; B1Admin का setup tree बिना `groupServiceTimes` row वाले `trackAttendance` समूहों को असाइन न किए गए के रूप में चिह्नित करता है |
| `parentPickup` | एक child room चिह्नित करता है: उसमें चेक इन करने से visit "child" visit बन जाती है, जो एक family pickup label प्रिंट करती है और nametag पर security code लगाती है |
| `printNametag` | क्या इस समूह में check-ins पर बिल्कुल nametag प्रिंट होता है |
| `capacity` / `guestCapacity` / `checkinClosed` | कक्षा capacity सीमाएँ और एक कठोर "closed" स्विच, जिसे check-in gate सर्वर-side लागू करता है (B1Admin के समूह सेटिंग्स में "Check-In Capacity" के अंतर्गत संपादित) |
| `volunteerRatio` / `minVolunteers` | बच्चे-प्रति-स्वयंसेवक अनुपात और न्यूनतम स्वयंसेवक संख्या, चर्च-व्यापी `ratioEnforcement` सेटिंग के अनुसार लागू |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | आयु/ग्रेड पात्रता सीमाएँ, जो कक्षाओं को उजागर या धुंधला करने के लिए kiosk-side मूल्यांकित होती हैं |

हर client इसी तरह denormalize करता है (जैसे `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes`, और `GET /membership/groups` को समानांतर लोड करें, फिर हर service time के लिए उन समूहों को इकट्ठा करें जिनकी `groupServiceTimes` row उसकी ओर इशारा करती है, `serviceTime.groups` में। यही array वह है जो कक्षा picker दिखाता है, समूह `categoryName` के अनुसार व्यवस्थित।

असाइनमेंट B1Admin में समूह के पृष्ठ से संपादित होते हैं (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), और पूरा Campus → Service → Service Time → Group tree `B1Admin/src/attendance/components/AttendanceSetup.tsx` में `GET /attendance/attendancerecords/tree` के माध्यम से दृश्यमान होता है।

:::info
चूँकि समूह एकमात्र सत्य का स्रोत हैं, वही समूह सदस्यता kiosk रूटिंग, B1Admin के समूह पृष्ठों पर roster-शैली उपस्थिति, और उपस्थिति रिपोर्टिंग को शक्ति देती है -- किसी समूह को एक service time असाइन करना ही उसे चेक-इन गंतव्य बनाने के लिए एकमात्र आवश्यक कदम है।
:::

## बाल सुरक्षा

### Check-in types

हर visit में एक `checkinType` होता है -- `member`, `guest`, या `volunteer` (NULL का अर्थ legacy/member है; migration `tools/migrations/attendance/2026-07-03_checkin_type.ts`)। यह प्रकार **kiosk-side** चुना जाता है: विस्तारित सदस्य पंक्ति पर Member / Guest / Volunteer chips (`B1Checkin/src/components/MemberServiceTimes.tsx`), जो completion पर हर pending visit पर अंकित होते हैं (`app/checkinComplete.tsx`, डिफ़ॉल्ट `member`)। सर्वर gate में इसका उपयोग करता है -- स्वयंसेवक capacity के विरुद्ध गिने जाने के बजाय ratio coverage में गिने जाते हैं, और guests `guestCapacity` के विरुद्ध गिने जाते हैं।

### Capacity और volunteer-ratio gates {#capacity-and-volunteer-ratio-gates}

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) `postCheckin` के भीतर किसी भी save से पहले चलता है (endpoint non-transactional है, इसलिए save-से-पहले gating ही correctness तंत्र है)। यह हर लक्षित समूह के लिए वर्तमान occupancy (`VisitRepo.countActiveByGroupToday`) और membership module gateway के माध्यम से समूह कॉन्फ़िग लोड करता है, फिर उल्लंघनों को वर्गीकृत करता है:

- **Hard (हमेशा रोकता है):** `checkinClosed`, `current + incoming > capacity`, guest संख्या `guestCapacity` से अधिक। batch को `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` के साथ अस्वीकार किया जाता है -- kiosk नामित कक्षा दिखाता है।
- **Ratio (चेतावनी या रोक):** गैर-स्वयंसेवक जो ऐसी कक्षा में आ रहे हैं जहाँ `volunteers < minVolunteers`, बिल्कुल स्वयंसेवक नहीं, या `children > volunteers × volunteerRatio`। गंभीरता प्रति-चर्च सेटिंग `ratioEnforcement` (`"warn"` डिफ़ॉल्ट / `"block"`, B1Admin Manage Church → Check-In में संपादित, `CheckinSettingsEdit.tsx`) का अनुसरण करती है। warn-mode `409 { warning: true, error: "ratio", … }` लौटाता है, जब तक client `acknowledgeWarnings=true` के साथ पुनः सबमिट न करे -- वही पुनः सबमिट kiosk का स्टाफ़-पुष्टि override है।

### निर्धारित check-in विंडो {#scheduled-check-in-windows}

एक service time में वैकल्पिक साप्ताहिक शेड्यूल हो सकता है (`dayOfWeek` 0–6, जहाँ 0 = रविवार, `startTime`/`endTime` `HH:mm` के रूप में, `checkinOpenMinutes`, `checkinCloseMinutes`), जो B1Admin के **Attendance → Setup** service-time फ़ॉर्म में संपादित होता है (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, "Check-in Schedule")। `CheckinGateHelper.hasSchedule()` एक service time को तभी निर्धारित मानता है जब `dayOfWeek` और `startTime` दोनों सेट हों; बिना-निर्धारित समय कभी समय से gate नहीं होते। `isServiceTimeOpen()` स्थानीय दीवार-घड़ी समय में विंडो गणना करता है (`DateHelper.toChurchTime`)। समय क्षेत्र `CheckinTimeZoneHelper.load()` (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`) द्वारा हर service time के लिए हल होता है: सेवा के campus का `timezone` (`service.campusId`, `MembershipModuleGateway.loadCampusTimeZones` के माध्यम से) पहले आता है, फिर चर्च का `timeZone` (B1Admin के Church Information में सेट), फिर पहला गैर-हटाया गया campus जिसका `timezone` है (`loadCampusTimeZone`), और उसके बाद ही `America/New_York`। campus पहले आता है क्योंकि कई चर्चों के चर्च क्षेत्र के रूप में `America/New_York` backfill हुआ था। नीचे की listing और posting दोनों पथ इसे उसी तरह हल करते हैं। विंडो शुरुआत से `checkinOpenMinutes` पहले से अंत के बाद `checkinCloseMinutes` (या कोई अंत न हो तो शुरुआत के बाद) तक चलती है, जो आधी रात या सप्ताह सीमा पार करने वाली विंडो को संभालती है।

विंडो दो स्थानों पर लागू होती है:

- **Listing:** `GET /attendance/servicetimes` हर पंक्ति पर एक गणना किया गया `checkinOpen` boolean लगाता है। B1App का स्व चेक-इन (`CheckinPage.tsx`) और B1Checkin का service picker (`app/services.tsx`) हर समय रखते हैं। जब किसी सेवा के सभी समय बंद होते हैं, तो वे निकटतम खुलने का समय दिखाते हैं ("Check-in opens Sun 9:30 AM." B1App में, "Check-in for this service opens Sun 9:30 AM." B1Checkin में, `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel` से), और जब कोई खुलने का समय गणना नहीं हो सकता तो "Check-in isn't open for this service right now." पर वापस जाते हैं (kiosk किसी अन्य सेवा को चुनने के लिए Back बटन देता है)। अन्यथा बंद समय एक गैर-चयन योग्य "Closed" / "Closed · opens 9:30 AM" पंक्ति के रूप में दिखते हैं। B1Checkin का household स्क्रीन (`MemberServiceTimes.tsx`) `ServiceTimeHelper.isCheckinOpen()` के साथ device घड़ी पर लाइव openness दोबारा मूल्यांकित करता है (device का समय क्षेत्र, चर्च का नहीं), ताकि लंबे समय से चल रहा kiosk समय पर खुले और बंद हो, और उस बंद समय पर "Kids Room 1 · Checked in" (समूह का नाम) दिखाता है जो व्यक्ति पहले से रखता है।
- **Posting:** `evaluateGates()` के भीतर, capacity/ratio मूल्यांकन से पहले, `findClosedServiceTimeGroups()` पूरे batch को `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` से अस्वीकार करता है, यदि कोई लक्षित session का service time अपनी विंडो से बाहर है। चूँकि हर check-in के साथ किसी परिवार के आज के मौजूदा visits फिर से पोस्ट होते हैं, वे sessions जो व्यक्ति पहले से रखता है (मौजूदा visits में `personId|sessionId`) इस gate को छोड़ देते हैं, ताकि बाद का खुला service time इसलिए अस्वीकार न हो कि पहले की विंडो बंद हो गई थी। B1Checkin इसे अपनी hard-gate स्क्रीन के माध्यम से कारण "check-in isn't open right now" के साथ प्रस्तुत करता है (capacity उल्लंघन अब भी "room is full or closed" पढ़ते हैं)।

### आयु/ग्रेड पात्रता (kiosk-side) {#agegrade-eligibility-kiosk-side}

कक्षा पात्रता सलाहकार UI है, जो kiosk पर मूल्यांकित होती है, सर्वर द्वारा लागू नहीं। `B1Checkin/src/helpers/EligibilityHelper.ts` किसी व्यक्ति की जन्मतिथि/ग्रेड की तुलना समूह के `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` से करता है (ग्रेड क्रम: PreK, K, 1–12, Graduated) और `eligible` / `ineligible` / `unknown` लौटाता है -- गायब डेटा `unknown` देता है और कभी कक्षा नहीं छिपाता। आयु और ग्रेड चर्च की **grade promotion date** (`gradePromotionDate` सेटिंग, `"MM-DD"`, `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx` में संपादित) की स्थिति में गणना होते हैं; kiosk इसे `GET /attendance/checkin/settings` से लाता है, और `resolveAsOfDate` आज या उससे पहले की सबसे हाल की घटना चुनता है। कक्षा picker पात्र कक्षाओं को उजागर करता है और अपात्र को धुंधला करता है; धुंधली कक्षा चुनने के लिए स्टाफ़ पुष्टि चाहिए।

### विश्वसनीय और अनधिकृत pickup {#trusted-and-not-authorized-pickup}

Pickup लोग एक membership entity हैं, प्रति household: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, वैकल्पिक personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes)। CRUD `GET /membership/householdpickup/:householdId` (कोई भी प्रमाणित चर्च उपयोगकर्ता, ताकि kiosks इसे पढ़ सकें) और `people.edit` द्वारा gated `POST` / `DELETE` है। स्टाफ़ सूची को व्यक्ति पृष्ठ के **Pickup** कार्ड पर प्रबंधित करता है (`B1Admin/src/people/components/PickupPeople.tsx`) -- फ़ोटो, relationship, और Trusted/Not Authorized स्थिति चिप।

check-out पर (`B1Checkin/app/checkout.tsx`) kiosk household की pickup सूची लोड करता है: `trusted` प्रविष्टियाँ household-वयस्क फ़ोटो ग्रिड के साथ tappable pickup कार्ड के रूप में दिखती हैं, और मुक्त-टाइप किया गया "Other" नाम `notAuthorized` प्रविष्टियों से fuzzy-match (Levenshtein, `src/helpers/PickupMatchHelper.ts`) होता है -- मिलान check-out को चेतावनी शीट के साथ रोकता है और स्टाफ़ **Override** बटन देता है। override visit पर ही लॉग होता है: यह सामान्य `POST /attendance/visits/checkout` के माध्यम से `checkedOutBy` को `"OVERRIDE: {name}"` के रूप में पोस्ट करता है, इसलिए यह अलग audit table के बजाय attendance रिकॉर्ड और `attendance.checkout` webhook में जाता है।

### पेज-a-parent और आपातकालीन प्रसारण

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) दो SMS endpoints प्रदान करता है:

- `POST /page` — `{ visitId, message }`: एक चेक-इन किए गए बच्चे के अभिभावकों को पेज करता है (kiosk check-out स्क्रीन, manned mode)।
- `POST /broadcast` — `{ serviceId, message }`: किसी सेवा के लिए हर चेक-इन किए गए household के वयस्कों को टेक्स्ट करता है (kiosk admin सेटिंग्स, `B1Checkin/app/adminSettings.tsx` में type-`EMERGENCY`-to-confirm शीट के पीछे)।

दोनों membership gateway के माध्यम से household वयस्कों को हल करते हैं, फिर डिलीवरी **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) को सौंपते हैं -- चर्च के कॉन्फ़िगर किए गए texting provider का cross-module द्वार (`@churchapps/texting`: TextInChurch, Clearstream, या MutualMinistry; कोई built-in SMS sender नहीं है)। gateway एक `sentText` row के साथ प्रति-प्राप्तकर्ता `deliveryLog` प्रविष्टियाँ लॉग करता है और एक batch को 500 प्राप्तकर्ताओं तक सीमित करता है; कोई provider कॉन्फ़िगर न होने पर यह `no_provider` लौटाता है, जिसे kiosk "No SMS provider configured" के रूप में दिखाता है। controller का `dispatch()` फ़ोन नंबरों को deduplicate करता है और जिन लोगों के पास मोबाइल नहीं या `optedOut` सेट है उन्हें छोड़ता है, और `{ sent, failed, skippedOptedOut, skippedNoPhone }` लौटाता है ताकि kiosk दिखा सके कि क्या छोड़ा गया।

## Kiosk (B1Checkin)

स्क्रीन `B1Checkin/app/` के अंतर्गत expo-router files हैं; स्क्रीनों के बीच की state एक static `CachedData` class (`src/helpers/CachedData.ts`) में रहती है, React state में नहीं।

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Lookup** (`app/lookup.tsx`) — फ़ोन से खोजें (`GET /membership/people/search/phone?number=`, अंतिम-4 या पूरा) या नाम से (`GET /membership/people/search?term=`)। एक मिलान चुनने पर household (`GET /membership/people/household/{householdId}`) और मौजूदा visits (`GET /attendance/visits/checkin`) लोड होते हैं, जो `pendingVisits` को पिछले सप्ताह के चयनों से भरते हैं।
2. **Household समीक्षा** (`app/household.tsx`, `src/components/MemberList.tsx`) — हर सदस्य पंक्ति पर पहले से-चेक-इन बैज, allergy/`nametagNotes` बैज, और उनके वर्तमान कक्षा chips दिखते हैं। किसी सदस्य को विस्तारित करने पर हर service time सूचीबद्ध होता है, कक्षा बटन के साथ, और Member / Guest / Volunteer check-in-type chips (`MemberServiceTimes.tsx`)। हर service time नाम के नीचे `ServiceTimeHelper.getGroupSummary()` वहाँ पेश किए गए समूह दिखाता है (`serviceTime.groups` के नाम, trim किए गए, केस-असंवेदनशील रूप से deduplicated, कॉमा से जुड़े); जिस समय में कोई समूह नहीं है वहाँ कुछ नहीं दिखता।
3. **समूह असाइनमेंट** (`app/selectGroup.tsx`) — `serviceTime.groups` से बनी एक category tree, जिसमें आयु/ग्रेड-पात्र कक्षाएँ उजागर और अपात्र कक्षाएँ स्टाफ़ पुष्टि के पीछे धुंधली होती हैं (देखें [आयु/ग्रेड पात्रता](#agegrade-eligibility-kiosk-side)); कक्षा चुनने पर उस व्यक्ति के pending visit में `{ session: { serviceTimeId, groupId } }` visitSession लिखा जाता है (`src/helpers/VisitSessionHelper.ts`)। "None" उसे साफ़ करता है।
4. **Complete** (`app/checkinComplete.tsx`) — `pendingVisits` के साथ `POST /attendance/visits/checkin` (हर एक अपने `checkinType` से अंकित), फिर printer कॉन्फ़िगर होने पर labels प्रिंट करता है और lookup पर स्वतः लौटता है। 409 capacity या `notOpen` प्रतिक्रिया कारण सहित नामित कक्षा दिखाती है (full/closed, या check-in not open); ratio चेतावनी एक स्टाफ़ पुष्टि प्रस्तुत करती है जो `acknowledgeWarnings=true` के साथ पुनः सबमिट करती है।

**Check-out** स्क्रीन (`app/checkout.tsx`) एक स्वतः-फ़ोकस किए गए input के माध्यम से 4-अक्षर का security code स्वीकार करती है -- ताकि USB/Bluetooth keyboard-wedge बारकोड scanners बिना कैमरे के काम करें -- या उसी वर्णमाला वाला on-screen keypad, 4 अक्षरों पर स्वतः सबमिट। **Scan** बटन एक शीट खोलता है जिसमें साझा `src/components/CodeScanner.tsx` कैमरा है (डिफ़ॉल्ट रूप से back-facing, QR, Code 128, और Code 39 स्वीकार करता है), ताकि बिना wedge scanner वाले स्टेशन pickup label पढ़ सकें; स्कैन किया गया code वही `handleCode()` पथ लेता है जो टाइप किए गए input लेता है। यह code खोजता है, उठाए जा रहे बच्चे दिखाता है, और household के **विश्वसनीय pickup लोगों** को household वयस्कों की फ़ोटो ग्रिड के साथ tappable कार्ड के रूप में प्रस्तुत करता है (साथ में एक "Other" मुक्त-टेक्स्ट विकल्प जो अनधिकृत नामों से fuzzy-check होता है -- देखें [विश्वसनीय और अनधिकृत pickup](#trusted-and-not-authorized-pickup)), फिर picker के नाम/id के साथ `POST /attendance/visits/checkout` पोस्ट करता है। manned mode में स्क्रीन **Page a parent** (`POST /attendance/checkin/page`) और एक **security-label reprint** भी देती है -- `reprint()` `LabelHelper.getAllLabelsFor(...)` से परिवार के labels फिर से बनाता है और उन्हें check-in जैसी ही `PrintUI` pipeline से भेजता है।

Station personality एक AsyncStorage flag `@StationMode` (`"self"` | `"manned"`, `app/adminSettings.tsx` में toggle) है। Manned mode lookup स्क्रीन पर check-out entry point और household स्क्रीन से प्रति-सदस्य profile संपादन (`POST /membership/people`) जोड़ता है। Kiosk hardening अंतर्निर्मित है: एक वैकल्पिक PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) admin और printer स्क्रीनों को gate करता है, admin स्क्रीन केवल header logo पर 7 तेज़ taps से खुलती है, और एक निष्क्रिय attract स्क्रीन (`src/hooks/useInactivityTimer.ts`) परिवारों के बीच नियंत्रण लेती है।

## स्व चेक-इन (B1App)

सदस्य b1.church पोर्टल से `/mobile/checkin` स्क्रीन पर चेक इन करते हैं (`B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` द्वारा `screens/CheckinPage.tsx` पर रूट किया गया)। इसके लिए लॉग इन उपयोगकर्ता चाहिए और यह kiosk के समान चार चरण चलाता है -- सेवाएँ → household → समूह → complete -- समान endpoints के विरुद्ध, state `B1App/src/helpers/CheckinHelper.ts` में। kiosk से अंतर: household लॉग इन उपयोगकर्ता के अपने `householdId` से आता है (कोई खोज चरण नहीं), और कोई label printing नहीं है -- इसके बजाय completion स्क्रीन batch का security code एक QR (`qrcode.react`) के रूप में दिखाती है, साथ में "show this at a check-in station" संकेत। यदि page लोड होने पर household पहले से चेक इन है, तो "Show check-in code" बटन पहले मौजूदा visit (`GET /attendance/visits/checkin` से) से `securityCode` रखने वाला QR दोबारा दिखाता है। चेक-इन submit के समय तुरंत दर्ज हो जाता है (कोई pending state नहीं); QR केवल kiosk पर label printing को चलाता है।

**Phone-to-kiosk label printing** (`B1Checkin/app/scan.tsx`, lookup स्क्रीन पर QR "Scan code" बटन से पहुँचा): kiosk `CodeScanner` (एक `expo-camera` `CameraView`, डिफ़ॉल्ट रूप से front-facing, पलटने योग्य) दिखाता है जो QR codes के लिए स्कैन करता है। `ScanCodeHelper.parse()` payload तभी स्वीकार करता है जब वह security-code वर्णमाला में केवल 4-अक्षर का code हो, और `ScanCodeHelper.isRepeat()` 4 सेकंड तक उसी code को अनदेखा करता है, इसलिए B1App QR और छपे label के QR block दोनों काम करते हैं। स्क्रीन फिर check-out reprint पथ का पालन करती है -- `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` -- और lookup पर लौटती है। scan के समय कोई attendance write नहीं होता; केवल labels। बिना सक्रिय visits वाले codes, बिना printer वाले स्टेशन, और बिना label वाली कक्षाएँ हर एक एक toast दिखाती हैं और lookup पर लौटती हैं।

प्रकार और `ApiHelper`/`ArrayHelper` `@churchapps/helpers` और `@churchapps/apphelper` से आते हैं; कोई React components B1Admin के साथ साझा नहीं होते।

## Admin-पक्ष उपस्थिति (B1Admin)

- **Setup** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) संरचना tree दिखाता है और services (`ServiceEdit.tsx`) व service times (`ServiceTimeEdit.tsx`) बनाता है। Campus डेटा `useCampuses()` hook के माध्यम से membership से आता है।
- **मैन्युअल उपस्थिति** attendance section में नहीं, बल्कि Groups की ओर रहती है: `B1Admin/src/groups/components/GroupSessionsTab.tsx` sessions बनाता है (`POST /attendance/sessions`; जोड़ते समय `SessionEdit.tsx` चुने गए service time को साझा करने वाले हर अन्य समूह के लिए एक session शामिल कर सकता है, उन समूहों को छोड़ते हुए जिनका उस तारीख पर पहले से session है) और `POST /attendance/visitsessions/log` के माध्यम से लोगों को उपस्थित चिह्नित करता है, जो उस व्यक्ति और session के लिए visit खोजता या बनाता है। समूह लीडर बिना `attendance.edit` अनुमति के अपने समूहों की उपस्थिति दर्ज कर सकते हैं -- controllers `au.leaderGroupIds` जाँचते हैं।
- **रिपोर्टिंग** — attendance trend और group attendance सर्वर-परिभाषित रिपोर्ट हैं (`B1Admin/src/components/reporting/ReportWithFilter.tsx` ReportingApi के विरुद्ध; परिभाषाएँ `Api/reports/*.json` में)। दोनों `startDate`/`endDate` लेते हैं (अंतिम तारीख समावेशी); trend रिपोर्ट डिफ़ॉल्ट रूप से एक वर्ष पहले से आज तक होती है और प्रति-सप्ताह `sessionDates` कॉलम जोड़ती है, और group attendance की स्क्रीन पर tree हर visit का `checkinTime` और व्यक्ति का `membershipStatus` शामिल करती है। group attendance का CSV सहायक `groupAttendanceDownload` रिपोर्ट से आता है, जिसे `GroupAttendanceDownloadHelper` हर समूह सदस्य के लिए एक पंक्ति में बदलता है, हर तारीख वाले session के लिए एक present/absent कॉलम के साथ; व्यक्ति का इतिहास `GET /attendance/attendancerecords?personId=` है (`B1Admin/src/people/components/PersonAttendance.tsx`)।

## Label printing

### Templates और designer

चर्च अपने labels B1Admin में `/mobile/checkin/labels` पर डिज़ाइन करते हैं (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, Check-In सेटिंग्स पृष्ठ से पहुँचा)। एक template एक `labelTemplates` row है जिसका `content` blocks का JSON array है -- `text`, `field`, `barcode`, `qrcode`, या `box` -- हर एक प्रतिशत निर्देशांक में, font, alignment, symbology (`code39`/`code128`/`qr`), और वैकल्पिक visibility शर्तों के साथ (जैसे allergy box तभी दिखाएँ जब `person.nametagNotes` खाली न हो)। दो `labelType` हैं: `nametag` (चेक इन किए गए हर व्यक्ति के लिए एक; `person.displayName`, `sessions`, `securityCode`, और `person.isBirthdayWeek` जैसे फ़ील्ड -- `"true"` जब जन्मदिन का महीना/दिन आज के 3 दिनों के भीतर हो, वर्ष के अंत तक लिपटते हुए, `LabelHelper.isBirthdayWithin()` से गणना) और `pickup` (हर परिवार के लिए एक; `children`, `childrenAllergies` जैसे फ़ील्ड)। सर्वर हर चर्च के लिए प्रति प्रकार एक डिफ़ॉल्ट लागू करता है (`LabelTemplateController.save`)। designer kiosk के अंतर्निर्मित labels को प्रतिबिंबित करने वाले starter templates देता है और नमूना डेटा के विरुद्ध पूर्वावलोकन करता है।

### Kiosk पर रेंडरिंग और printing

check-in completion पर, `B1Checkin/src/helpers/LabelHelper.ts` हर pending visit पर समूह flags से तय करता है कि क्या प्रिंट करना है: `printNametag` समूहों के लिए nametags, प्लस यदि कोई visit `parentPickup` समूह पर पहुँचा हो तो एक family pickup label। `checkinType` `volunteer` वाले visits `LabelHelper.selectChildVisits()` द्वारा छोड़े जाते हैं, इसलिए Parent Pickup कक्षा में काम करने वाला childcare कार्यकर्ता कभी pickup label ट्रिगर नहीं करता। check-in response से security code बच्चों के nametags और pickup label पर जाता है; वयस्क nametags बिना code के प्रिंट होते हैं। यदि चर्च के पास templates हैं, तो `LabelRenderer` (`src/helpers/LabelRenderer.ts`) blocks + field context को एक स्वतंत्र HTML document में बदलता है; अन्यथा `B1Checkin/assets/labels/` के अंतर्निर्मित HTML labels placeholder substitution के साथ उपयोग होते हैं।

बारकोड `B1Checkin/src/helpers/barcode.ts` में शुद्ध-TypeScript encoders द्वारा inline SVG के रूप में बनते हैं -- Code 39 pattern tables और Code 128 (code set B, mod-103 checksum के साथ) width tables, साथ में `qrcode` package के माध्यम से QR। **ये encoders जानबूझकर B1Admin में दोहराए गए हैं** (`LabelEditor.tsx` वही tables inline करता है, एक code comment में नोट है), ताकि designer पूर्वावलोकन kiosk output से pixel-faithful हों; एक में बदलाव दूसरे में भी लागू होना चाहिए।

print pipeline (`src/components/PrintUI.tsx`) हर HTML label को एक `WebView` में रेंडर करता है, `react-native-view-shot` के माध्यम से JPG में capture करता है, और image URIs को native **printer-helper** Expo module (`B1Checkin/modules/printer-helper/`) को देता है। module `scan()`, `checkInit()`, `printUris()`, और status events उजागर करता है, दोनों platforms पर हर brand के लिए एक provider के साथ:

| Brand | Android | iOS | नोट्स |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | QL-series network printers (QL-800/810W/820NWB/1100/1110NWB…), die-cut 29×90 labels, अनुशंसित डिफ़ॉल्ट |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Network discovery + TCP/ZPL image printing |

Printer चयन `app/printers.tsx` पर रहता है (network scan `brand~model~ip` प्रविष्टियाँ लौटाता है; चयन AsyncStorage में सहेजा जाता है), और `src/helpers/PrinterLog.ts` एक on-device diagnostic log रखता है जो kiosk header में एक live status dot के माध्यम से दिखता है।

## अतिथि पंजीकरण

दो पथ check-in के बीच एक व्यक्ति बनाते हैं:

- **Kiosk पर** — household स्क्रीन का "Add guest" `B1Checkin/app/addGuest.tsx` खोलता है, जो पहले `GET /membership/people/search?term=` से एक मौजूदा गैर-सदस्य मिलान खोजता है, और अन्यथा `POST /membership/people` से एक बनाता है, वर्तमान household से जुड़ा हुआ। फिर अतिथि किसी भी सदस्य की तरह कक्षा असाइनमेंट से गुज़रता है।
- **QR के माध्यम से स्व-सेवा** — जब चर्च सेटिंग `enableQRGuestRegistration` चालू हो (B1Admin की Check-In सेटिंग्स में कॉन्फ़िगर, `GET /membership/settings/public/{churchId}` से पढ़ी गई), तो kiosk lookup स्क्रीन `https://{subdomain}.b1.church/guest-register?serviceId=` से जुड़ने वाला QR कोड दिखाती है। वह B1App पृष्ठ (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) एक आने वाले परिवार को अपने फ़ोन पर गुमनाम `POST /membership/people/guest-register` endpoint के माध्यम से खुद को पंजीकृत करने देता है, जिससे kiosk की कतार चलती रहती है। QR sheet पर **Register here** बटन भी है जो वही पृष्ठ kiosk पर (`app/guestRegister.tsx`) incognito, cache-disabled `WebView` में खोलता है; `src/helpers/GuestRegisterHelper.ts` QR और WebView दोनों के लिए URL बनाता है और `https://{subdomain}.b1.church/guest-register` से बाहर navigation रोकता है। स्क्रीन **Done**, back, या 120 सेकंड की निष्क्रियता पर lookup पर वापस जाती है (फ़ॉर्म टाइपिंग WebView से activity के रूप में relay होती है), WebView को unmount करती है ताकि एक परिवार की प्रविष्टियाँ अगले तक न पहुँचें।

QR साइन-अप चर्च सेटिंग्स से चलता है जो B1Admin में **QR Guest Registration** कार्ड से सहेजी जाती हैं (`src/mobile/CheckInPage.tsx`):

| सेटिंग | दृश्यता | उद्देश्य |
|---|---|---|
| `enableQRGuestRegistration` | public | kiosk QR और गुमनाम endpoints के लिए opt-in स्विच |
| `guestRegistrationFields` | public | `email`, `phone`, `address`, `birthDate`, `gender`, `maritalStatus`, `grade`, `comments` का JSON map → `"off"` / `"optional"` / `"required"`। डिफ़ॉल्ट: email और phone वैकल्पिक, बाकी off। पहला/अंतिम नाम हमेशा आवश्यक |
| `guestRegistrationImage` | public | हेडर फ़ोटो URL; B1App इसे फ़ॉर्म और पुष्टि स्क्रीन पर आइकन की जगह 16:9 में रेंडर करता है |
| `guestRegistrationGroupId` | private | वह समूह जिसमें हर साइन-अप जुड़ता है (अतिथि इसे कभी नहीं देखते या चुनते) |
| `guestRegistrationRecordAttendance` | private | उस समूह के लिए उपस्थिति भी दर्ज करने हेतु `"true"` |

B1App का `src/components/checkin/GuestRegister.tsx` गुमनाम `GET /membership/people/guest-register/options?churchId=` से चेकलिस्ट लाता है और केवल शामिल फ़ील्ड रेंडर करता है (primary contact पर email, phone, marital status, और address; हर सदस्य पर birth date, gender, और grade; एक comments बॉक्स), और केवल वही भेजता है। सर्वर `GuestRegistrationHelper.sanitize()` में चेकलिस्ट फिर से लागू करता है -- off फ़ील्ड हटा दिए जाते हैं, गायब आवश्यक या सूची से बाहर मान 400 होते हैं -- इससे पहले कि `PersonHelper.registerGuestHousehold()` चले। यह पहले हर सदस्य के लिए जिसके पास email या phone है `PersonRepo.findGuestMatch()` कॉल करता है: ठीक एक जीवित व्यक्ति जिसका वही पहला नाम और वही email या phone अंक हो, पुनः उपयोग होता है (शून्य या कई मिलान एक नया व्यक्ति बनाते हैं, इसलिए यह कभी अनुमान नहीं लगाता)। बिना संपर्क वाले सदस्य का मिलान मिलान किए गए household के भीतर पहले नाम से होता है। पुनः उपयोग किए गए लोग कभी संपादित नहीं होते, इसलिए गुमनाम फ़ॉर्म संग्रहीत विवरण को overwrite नहीं कर सकता, और प्रतिक्रिया सबमिट किए गए नाम दोहराती है। मेल न खाने वाले सदस्य मिलान किए गए household या एक नए में `membershipStatus: "Visitor"` के साथ जुड़ते हैं, और हर नए व्यक्ति के लिए `person.created` emit करते हैं। बाद में, विफलताएँ लौटाई नहीं, बल्कि लॉग की जाती हैं: सदस्य कॉन्फ़िगर किए गए समूह में जुड़ते हैं (`group.member.added`); यदि उपस्थिति रिकॉर्डिंग चालू है, तो `AttendanceModuleGateway.recordAttendance()` हर सदस्य को उस समूह के हर निर्धारित service time के लिए उपस्थित चिह्नित करता है जिसकी check-in विंडो (`CheckinGateHelper.isServiceTimeOpen`) अभी खुली है, आज की चर्च-स्थानीय तारीख के लिए आवश्यकता होने पर session बनाते हुए -- बिना-निर्धारित service times और विंडो से बाहर साइन-अप कुछ दर्ज नहीं करते; और comments head of household पर एक छिपा हुआ person-note conversation बनते हैं (message author "Guest sign-up"), `person.conversationId` के माध्यम से लिंक्ड।

## संबंधित पृष्ठ

- [Attendance Endpoints](../api/endpoints/attendance) -- campuses, services, sessions, visits, और visit sessions के लिए पूर्ण REST surface
- [Membership Endpoints](../api/endpoints/membership) -- लोग, households, और groups
- [Webhooks](../api/webhooks) -- `session.created`, `attendance.recorded`, और `attendance.checkout` इवेंट
- [Module Structure](../api/module-structure) -- attendance module server-side पर कैसे व्यवस्थित है
