---
title: "चेक-इन"
description: "B1Checkin, B1App और B1 Admin में चेक-इन कैसे काम करता है: उपस्थिति डेटा मॉडल, कक्षों के रूप में समूह, क्षमता सीमाएँ और पिकअप सुरक्षा नियम।"
---

# चेक-इन

<div class="article-intro">

चेक-इन एक सिस्टम है जिसके तीन प्रवेश द्वार हैं: स्टाफ़ वाले और सेल्फ़-सर्व स्टेशनों के लिए B1Checkin किओस्क ऐप, B1App सदस्य पोर्टल के भीतर सेल्फ़ चेक-इन, और B1Admin में एडमिन-पक्ष उपस्थिति। तीनों मुख्य Api के एक ही attendance मॉड्यूल में लिखते हैं, और कक्षा routing पूरी तरह Groups से चलता है -- कोई अलग "locations" या "rooms" entity नहीं है। एक बाल-सुरक्षा परत इसके ऊपर बैठती है: हर विज़िट के लिए चेक-इन प्रकार, सर्वर-साइड क्षमता और स्वयंसेवक-अनुपात गेट, किओस्क-साइड आयु/ग्रेड पात्रता, चेक-आउट पर विश्वसनीय पिकअप सत्यापन, और चर्च के टेक्स्टिंग प्रदाता के माध्यम से माता-पिता को पेजिंग। यह पृष्ठ डेटा मॉडल, चेक-इन प्रवाह, सुरक्षा परत, और लेबल प्रिंटिंग पाइपलाइन का मानचित्र देता है।

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
|---------|-----------|-------|--------|
| Kiosk | `B1Checkin` | Expo / React Native, expo-router फ़ाइल routing; Android, Amazon Fire, और iOS के लिए EAS builds; `expo-updates` के माध्यम से OTA अपडेट | स्टाफ़ वाला या सेल्फ़-सर्व स्टेशन, लेबल प्रिंटिंग और सत्यापित चेक-आउट के साथ |
| Self check-in | `B1App` | Next.js (b1.church सदस्य पोर्टल) | लॉग-इन सदस्य फ़ोन से अपना परिवार चेक इन करते हैं; कोई प्रिंटिंग नहीं |
| Admin | `B1Admin` | React SPA | सेवा संरचना कॉन्फ़िगर करता है, सेवा समयों को समूह असाइन करता है, लेबल डिज़ाइन करता है, मैन्युअल उपस्थिति दर्ज करता है, रिपोर्ट चलाता है |

तीनों `ApiHelper` के माध्यम से एक ही दो API मॉड्यूलों को कॉल करते हैं: लोग, परिवार और समूहों के लिए **MembershipApi** (`/membership`); और नीचे की हर चीज़ के लिए **AttendanceApi** (`/attendance`)।

## डेटा मॉडल (`Api/src/modules/attendance`)

| Entity / तालिका | मुख्य फ़ील्ड | अर्थ |
|----------------|-----------|---------|
| `campuses` | name, address | यहाँ अब अप्रचलित -- परिसर membership मॉड्यूल (`/membership/campuses`) में मास्टर किए जाते हैं; attendance की प्रति पुरानी पाठकों के लिए केवल-पढ़ने योग्य जमी हुई है (`models/Campus.ts`) |
| `services` | campusId, name | एक आवर्ती सभा, जैसे "Sunday Morning" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | एक सेवा के भीतर एक समय-स्लॉट, जैसे "9:00 AM" (`models/ServiceTime.ts`)। शेड्यूल कॉलम वैकल्पिक हैं (माइग्रेशन `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) और [चेक-इन विंडो](#scheduled-check-in-windows) को चलाते हैं |
| `groupServiceTimes` | groupId, serviceTimeId | जॉइन तालिका: कौन से समूह (कक्षाएँ) किन सेवा समयों पर मिलते हैं (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | एक तारीख पर एक समूह की एक बैठक -- चेक-इन के समय आलसी रूप से बनती है (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | एक तारीख पर एक व्यक्ति की उपस्थिति (`models/Visit.ts`)। `checkinType` `member` / `guest` / `volunteer` है (NULL = लेगेसी सदस्य), किओस्क द्वारा सेट और क्षमता/अनुपात गेट द्वारा उपयोग |
| `visitSessions` | visitId, sessionId | एक विज़िट कौन से सत्र(सत्रों) को कवर करती है -- दो सेवा समयों पर चेक इन किए बच्चे की दो पंक्तियाँ होती हैं (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON blocks) | डिज़ाइन करने योग्य लेबल लेआउट (`models/LabelTemplate.ts`) |

### पूरा हुआ चेक-इन कैसे सहेजा जाता है

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) `POST /attendance/visits/checkin?serviceId=&peopleIds=` को संभालता है। बॉडी `Visit` ऑब्जेक्ट्स की एक सरणी है, हर एक में `visitSessions` होते हैं जिनका एम्बेडेड `session` केवल एक `(serviceTimeId, groupId)` जोड़ी बताता है। फिर सर्वर:

1. **किसी भी लिखाई से पहले क्षमता और अनुपात गेट करता है।** `evaluateGates()` → `CheckinGateHelper.evaluate()` हर लक्षित कक्ष की क्षमता, अतिथि क्षमता, बंद फ़्लैग, और वर्तमान उपस्थिति के विरुद्ध स्वयंसेवक अनुपात जाँचता है। postCheckin **ट्रांज़ैक्शनल नहीं** है, इसलिए गेट को पहले save से पहले चलना चाहिए -- एक गंभीर उल्लंघन उल्लंघन करने वाले कक्ष(कक्षों) के नाम सहित 409 लौटाता है और कुछ भी सहेजा नहीं जाता। देखें [Capacity and volunteer-ratio gates](#capacity-and-volunteer-ratio-gates)।
2. **सत्र आलसी रूप से हल करता है।** `getSessionId()` `(groupId, serviceTimeId, today)` के लिए `sessions` पंक्ति खोजता या बनाता है -- सत्र ids प्रति तारीख प्रक्रिया-के-भीतर कैश होते हैं। नए सत्र `session.created` webhook भेजते हैं। लूप एक awaited `for..of` है -- पहले का fire-and-forget `forEach(async …)` save से दौड़ लगाता था और पहले सत्र के निर्माण पर NULL sessionIds लिखता था (ठीक किया गया; लूप पर एक कोड टिप्पणी में नोट है)।
3. **उस दिन के रिकॉर्ड बदलता है।** उस सेवा में आज उन लोगों की कोई भी मौजूदा विज़िट उनके visitSessions सहित हटा दी जाती है, फिर सबमिट किया गया सेट सहेजा जाता है। किसी परिवार को फिर से चेक इन करना इसलिए एक idempotent "यह वर्तमान स्थिति है" संचालन है, append नहीं। इसके बजाय `?checkDuplicates=true` पास करने पर बिना लिखे `{ duplicates: [personId…] }` लौटता है, जिससे किओस्क overwrite से पहले चेतावनी देता है।
4. **हर बैच के लिए एक सुरक्षा कोड बनाता है।** `SecurityCodeHelper.generate()` वर्णमाला `23456789BCDFGHJKLMNPQRSTVWXYZ` से 4-अक्षर का कोड बनाता है (कोई स्वर या अस्पष्ट अक्षर नहीं, ताकि कोड शब्द न बनाएँ या गलत न पढ़े जाएँ)। सर्वर उसी चर्च की उसी दिन की खुली विज़िटों के विरुद्ध टक्कर पर पुनः प्रयास करता है और बैच की हर विज़िट पर कोड अंकित करता है।
5. **`{ streaks, securityCode }` लौटाता है।** `streaks` personId को लगातार-सप्ताह उपस्थिति गिनती से मैप करता है; किओस्क मील के पत्थरों (हर 5वें सप्ताह) पर कन्फ़ेटी से जश्न मनाता है।

सहेजी गई हर विज़िट एक `attendance.recorded` webhook भी भेजती है। पढ़ने का पक्ष, `GET /attendance/visits/checkin`, लोगों की विज़िट उनकी **अंतिम लॉग की गई तारीख** से लौटाता है -- यदि वह पिछला सप्ताह था तो ids हटा दिए जाते हैं, इसलिए क्लाइंट को पिछले सप्ताह के कक्ष चयनों की पूर्व-भरी प्रति मिलती है जो नए रिकॉर्ड के रूप में सहेजी जाएगी।

### चेक-आउट

दो endpoints लूप पूरा करते हैं (`VisitController`):

- `GET /attendance/visits/code/:code` -- उस सुरक्षा कोड वाली आज की, अभी तक चेक-आउट न हुई विज़िट, sessions भरी हुई।
- `POST /attendance/visits/checkout` -- बॉडी `{ visitIds, checkedOutBy?, checkedOutById? }`; `checkoutTime` और पिकअप करने वाले को अंकित करता है, और हर विज़िट के लिए एक `attendance.checkout` webhook भेजता है।

अनुमतियाँ: किओस्क `attendance.checkin` से प्रमाणित होते हैं, जो ठीक चेक-इन/चेक-आउट/लेबल-टेम्पलेट सतह देती है, साथ ही वे परिवार खोजें जो किओस्क को `people.view` के बिना चाहिए (फ़ोन/नाम खोज, चेक-इन मॉडल में परिवार के सदस्य, और परिवार की पिकअप सूची)। B1Checkin का `SessionHelper.filterChurches` केवल वे चर्च दिखाता है जहाँ खाते के पास `Attendance/Checkin` या `Attendance/Edit` है। `Checkin` अब Everyone (null-role) अनुमतियों का हिस्सा नहीं है (`RoleHelper` और माइग्रेशन `2026-11-01_remove_everyone_checkin`), इसलिए इसे एक वास्तविक भूमिका के माध्यम से देना होगा; `attendance.view`/`attendance.edit` रिपोर्टिंग और मैन्युअल प्रविष्टि को कवर करते हैं; संरचना (सेवाएँ, सेवा समय, समूह असाइनमेंट) के लिए `services.edit` चाहिए। सदस्य सेल्फ़ चेक-इन (B1App) को कोई अनुमति नहीं चाहिए: चर्च में लिंक्ड व्यक्ति वाला कोई भी प्रमाणित उपयोगकर्ता `GET`/`POST /attendance/visits/checkin` कॉल कर सकता है, और सर्वर सबमिट किए गए `personId`s को कॉलर के अपने परिवार तक सीमित करता है (अन्यथा 403 -- यही बाड़ है जो अन्य परिवारों के `securityCode`s को अपठनीय रखती है)। सदस्यता ही अनुदान है; सदस्य इस सुविधा को *देखते* हैं या नहीं, यह चर्च के B1App नेविगेशन टैब नियंत्रित करते हैं। अन्य चेक-इन endpoints (`code/:code`, `checkout`, `guardians`, `CheckinController`) केवल किओस्क/स्टाफ़ के लिए रहते हैं।

## समूह कक्ष routing चलाते हैं

पूरे सिस्टम में कहीं भी कोई कमरा या कक्षा entity नहीं है। "कमरा" एक सदस्यता **समूह** है जिसमें `trackAttendance` सक्षम है, और जो `groupServiceTimes` के माध्यम से एक या अधिक सेवा समयों से जुड़ा है। समूह के फ़ील्ड (`Api/src/modules/membership/models/Group.ts` पर) जो किओस्क व्यवहार को आकार देते हैं:

| फ़ील्ड | प्रभाव |
|------|--------|
| `trackAttendance` | समूह उपस्थिति में भाग लेता है; B1Admin का setup tree बिना `groupServiceTimes` पंक्ति वाले `trackAttendance` समूहों को असाइन न किए गए के रूप में चिह्नित करता है |
| `parentPickup` | एक बच्चा कक्ष चिह्नित करता है: उसमें चेक इन करने से विज़िट "child" विज़िट बनती है, जो एक परिवार पिकअप लेबल प्रिंट करती है और नेमटैग पर सुरक्षा कोड लगाती है |
| `printNametag` | क्या इस समूह में चेक-इन पर कोई नेमटैग प्रिंट होता है |
| `capacity` / `guestCapacity` / `checkinClosed` | कक्ष क्षमता सीमाएँ और एक कठोर "closed" स्विच, जिसे चेक-इन गेट द्वारा सर्वर-साइड लागू किया जाता है (B1Admin के समूह सेटिंग्स में "Check-In Capacity" के अंतर्गत संपादित) |
| `volunteerRatio` / `minVolunteers` | बच्चे-प्रति-स्वयंसेवक अनुपात और न्यूनतम स्वयंसेवक संख्या, चर्च-व्यापी `ratioEnforcement` सेटिंग के अनुसार लागू |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | आयु/ग्रेड पात्रता सीमाएँ, जिन्हें किओस्क-साइड पर कक्षों को उजागर या धुंधला करने के लिए मूल्यांकित किया जाता है |

हर क्लाइंट इसी तरह सामान्यीकृत करता है (जैसे `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes`, और `GET /membership/groups` को समानांतर लोड करें, फिर हर सेवा समय के लिए उन समूहों को एकत्र करें जिनकी `groupServiceTimes` पंक्ति उस पर इंगित करती है `serviceTime.groups` में। वही सरणी कक्ष पिकर में दिखती है, समूह `categoryName` के अनुसार व्यवस्थित।

असाइनमेंट B1Admin में समूह के पृष्ठ से संपादित होते हैं (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` -- `POST`/`DELETE /attendance/groupservicetimes`), और पूरा Campus → Service → Service Time → Group tree `B1Admin/src/attendance/components/AttendanceSetup.tsx` में `GET /attendance/attendancerecords/tree` के माध्यम से दिखाया जाता है।

:::info
चूँकि समूह ही एकमात्र सत्य का स्रोत हैं, वही समूह सदस्यता किओस्क routing, B1Admin के समूह पृष्ठों पर रोस्टर-शैली उपस्थिति, और उपस्थिति रिपोर्टिंग को शक्ति देती है -- किसी समूह को सेवा समय असाइन करना ही उसे चेक-इन गंतव्य बनाने के लिए एकमात्र आवश्यक कदम है।
:::

## बाल सुरक्षा

### चेक-इन प्रकार {#check-in-types}

हर विज़िट एक `checkinType` रखती है -- `member`, `guest`, या `volunteer` (NULL का अर्थ लेगेसी/सदस्य है; माइग्रेशन `tools/migrations/attendance/2026-07-03_checkin_type.ts`)। प्रकार **किओस्क-साइड** पर चुना जाता है: विस्तारित सदस्य पंक्ति पर Member / Guest / Volunteer चिप्स (`B1Checkin/src/components/MemberServiceTimes.tsx`), जो पूरा होने पर हर लंबित विज़िट पर अंकित होता है (`app/checkinComplete.tsx`, डिफ़ॉल्ट `member`)। सर्वर इसे गेट में उपयोग करता है -- स्वयंसेवक क्षमता के विरुद्ध गिनने के बजाय अनुपात कवरेज में गिने जाते हैं, और अतिथि `guestCapacity` के विरुद्ध गिने जाते हैं।

### क्षमता और स्वयंसेवक-अनुपात गेट {#capacity-and-volunteer-ratio-gates}

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) किसी भी save से पहले `postCheckin` के भीतर चलता है (endpoint non-transactional है, इसलिए save-से-पहले-गेटिंग ही सही होने का तंत्र है)। यह `VisitRepo.countActiveByGroupToday` के माध्यम से लक्षित समूह की वर्तमान उपस्थिति और membership मॉड्यूल गेटवे के माध्यम से समूह कॉन्फ़िग लोड करता है, फिर उल्लंघनों को वर्गीकृत करता है:

- **गंभीर (हमेशा ब्लॉक):** `checkinClosed`, `current + incoming > capacity`, guest संख्या `guestCapacity` से अधिक। बैच `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` के साथ अस्वीकार होता है -- किओस्क नामित कक्ष दिखाता है।
- **अनुपात (चेतावनी या ब्लॉक):** आने वाले गैर-स्वयंसेवकों को ऐसे कक्ष में जहाँ `volunteers < minVolunteers`, बिल्कुल स्वयंसेवक नहीं, या `children > volunteers × volunteerRatio`। गंभीरता चर्च-प्रति सेटिंग `ratioEnforcement` (`"warn"` डिफ़ॉल्ट / `"block"`, B1Admin Manage Church → Check-In, `CheckinSettingsEdit.tsx` में संपादित) का पालन करती है। Warn मोड `409 { warning: true, error: "ratio", … }` लौटाता है जब तक क्लाइंट `acknowledgeWarnings=true` के साथ फिर से सबमिट न करे -- वह फिर से सबमिट किओस्क का स्टाफ़-पुष्टि ओवरराइड है।

### निर्धारित चेक-इन विंडो {#scheduled-check-in-windows}

एक सेवा समय में एक वैकल्पिक साप्ताहिक शेड्यूल हो सकता है (`dayOfWeek` 0–6, जहाँ 0 = रविवार, `startTime`/`endTime` `HH:mm` के रूप में, `checkinOpenMinutes`, `checkinCloseMinutes`), जिसे B1Admin के **Attendance → Setup** सेवा-समय फ़ॉर्म में संपादित किया जाता है (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, "Check-in Schedule")। `CheckinGateHelper.hasSchedule()` किसी सेवा समय को तभी निर्धारित मानता है जब `dayOfWeek` और `startTime` दोनों सेट हों; अनिर्धारित समय कभी समय से गेट नहीं होते। `isServiceTimeOpen()` स्थानीय दीवार-घड़ी समय में विंडो की गणना करता है (`DateHelper.toChurchTime`)। क्षेत्र हर सेवा समय के लिए `CheckinTimeZoneHelper.load()` (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`) द्वारा हल होता है: सेवा के परिसर का `timezone` (`service.campusId`, `MembershipModuleGateway.loadCampusTimeZones` के माध्यम से) पहले आता है, फिर चर्च का `timeZone` (B1Admin की Church Information में सेट), फिर पहला गैर-हटाया गया परिसर जिसका `timezone` है (`loadCampusTimeZone`), और केवल तब `America/New_York`। परिसर पहले आता है क्योंकि अधिकांश चर्चों में `America/New_York` उनके चर्च क्षेत्र के रूप में भरा गया था। नीचे की सूची और पोस्ट दोनों पथ इसे उसी तरह हल करते हैं। विंडो `checkinOpenMinutes` पहले के प्रारंभ से लेकर `checkinCloseMinutes` बाद के अंत तक (या अंत न होने पर प्रारंभ के बाद) चलती है, आधी रात या सप्ताह की सीमा पार करने वाली विंडो को संभालते हुए।

विंडो दो स्थानों पर लागू होती है:

- **सूची:** `GET /attendance/servicetimes` हर पंक्ति पर एक गणना किया गया `checkinOpen` boolean लगाता है। B1App का सेल्फ़ चेक-इन (`CheckinPage.tsx`) और B1Checkin का सेवा पिकर (`app/services.tsx`) हर समय रखते हैं। जब किसी सेवा के सभी समय बंद होते हैं, तो वे सबसे जल्दी खुलने वाला समय दिखाते हैं ("Check-in opens Sun 9:30 AM." B1App में, "Check-in for this service opens Sun 9:30 AM." B1Checkin में, `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel` से), और जब कोई खुलने का समय गणना नहीं हो सकता तो "Check-in isn't open for this service right now." पर वापस जाते हैं (किओस्क दूसरी सेवा चुनने के लिए एक Back बटन देता है)। अन्यथा बंद समय एक गैर-चयन योग्य "Closed" / "Closed · opens 9:30 AM" पंक्ति के रूप में दिखते हैं। B1Checkin की परिवार स्क्रीन (`MemberServiceTimes.tsx`) `ServiceTimeHelper.isCheckinOpen()` के साथ डिवाइस घड़ी पर लाइव खुलने की स्थिति फिर से मूल्यांकित करती है (डिवाइस का समय क्षेत्र, चर्च का नहीं), ताकि चालू छोड़ा गया किओस्क समय पर खुले और बंद हो, और उस बंद समय पर "Kids Room 1 · Checked in" (समूह का नाम) दिखाती है जो व्यक्ति पहले से रखता है।
- **पोस्ट करना:** `evaluateGates()` के भीतर, क्षमता/अनुपात मूल्यांकन से पहले, `findClosedServiceTimeGroups()` बैच को `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` के साथ अस्वीकार करता है यदि किसी लक्षित सत्र का सेवा समय उसकी विंडो से बाहर है। चूँकि किसी परिवार की आज की मौजूदा विज़िट हर चेक-इन के साथ फिर से पोस्ट होती हैं, व्यक्ति के पास पहले से मौजूद सत्र (मौजूदा विज़िट में `personId|sessionId`) इस गेट को छोड़ देते हैं, ताकि एक बाद का खुला सेवा समय जोड़ना इसलिए अस्वीकार न हो कि पहले की विंडो बंद हो गई। B1Checkin इसे अपनी hard-gate स्क्रीन के माध्यम से "check-in isn't open right now" कारण के साथ दिखाता है (क्षमता उल्लंघन अब भी "room is full or closed" पढ़ते हैं)।

### आयु/ग्रेड पात्रता (किओस्क-साइड) {#agegrade-eligibility-kiosk-side}

कक्ष पात्रता केवल सलाहकार UI है, जिसका मूल्यांकन किओस्क पर होता है, सर्वर द्वारा लागू नहीं। `B1Checkin/src/helpers/EligibilityHelper.ts` किसी व्यक्ति की जन्मतिथि/ग्रेड की तुलना समूह के `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` से करता है (ग्रेड क्रम: PreK, K, 1–12, Graduated) और `eligible` / `ineligible` / `unknown` लौटाता है -- गायब डेटा `unknown` देता है और कभी कक्ष नहीं छिपाता। आयु और ग्रेड चर्च की **ग्रेड प्रमोशन तारीख** (`gradePromotionDate` सेटिंग, `"MM-DD"`, `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx` में संपादित) के अनुसार गणना होते हैं; किओस्क इसे `GET /attendance/checkin/settings` से लाता है, और `resolveAsOfDate` आज या उससे पहले की सबसे हाल की घटना चुनता है। कक्ष पिकर पात्र कक्षों को उजागर करता है और अपात्र कक्षों को धुंधला करता है; धुंधले कक्ष को चुनने के लिए स्टाफ़ पुष्टि चाहिए।

### विश्वसनीय और अनधिकृत पिकअप {#trusted-and-not-authorized-pickup}

पिकअप लोग एक सदस्यता entity हैं, परिवार-प्रति: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` -- householdId, वैकल्पिक personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes)। CRUD `GET /membership/householdpickup/:householdId` है (कोई भी प्रमाणित चर्च उपयोगकर्ता, ताकि किओस्क इसे पढ़ सकें) प्लस `POST` / `DELETE` जो `people.edit` द्वारा गेट होते हैं। स्टाफ़ यह सूची व्यक्ति पृष्ठ के **Pickup** कार्ड पर प्रबंधित करता है (`B1Admin/src/people/components/PickupPeople.tsx`) -- फ़ोटो, संबंध, और एक Trusted/Not Authorized स्थिति चिप।

चेक-आउट (`B1Checkin/app/checkout.tsx`) पर किओस्क परिवार की पिकअप सूची लोड करता है: `trusted` प्रविष्टियाँ परिवार के वयस्कों की फ़ोटो ग्रिड के साथ टैप योग्य पिकअप कार्ड के रूप में दिखती हैं, और मुक्त-टाइप किया गया "Other" नाम `notAuthorized` प्रविष्टियों के विरुद्ध फ़ज़ी-मैच होता है (Levenshtein, `src/helpers/PickupMatchHelper.ts`) -- एक मैच चेतावनी शीट के साथ चेक-आउट ब्लॉक करता है और स्टाफ़ **Override** बटन देता है। ओवरराइड विज़िट पर ही लॉग होता है: यह सामान्य `POST /attendance/visits/checkout` के माध्यम से `checkedOutBy` को `"OVERRIDE: {name}"` के रूप में भेजता है, इसलिए यह एक अलग ऑडिट तालिका के बजाय उपस्थिति रिकॉर्ड और `attendance.checkout` webhook में जाता है।

### माता-पिता को पेज करना और आपातकालीन प्रसारण

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) दो SMS endpoints देता है:

- `POST /page` -- `{ visitId, message }`: एक चेक-इन बच्चे के अभिभावकों को पेज करता है (किओस्क चेक-आउट स्क्रीन, मैन्ड मोड)।
- `POST /broadcast` -- `{ serviceId, message }`: किसी सेवा के लिए हर चेक-इन परिवार के वयस्कों को टेक्स्ट करता है (किओस्क एडमिन सेटिंग्स, `B1Checkin/app/adminSettings.tsx` में एक टाइप-`EMERGENCY`-पुष्टि शीट के पीछे)।

दोनों membership गेटवे के माध्यम से परिवार के वयस्कों को हल करते हैं, फिर डिलीवरी **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) को सौंपते हैं -- चर्च के कॉन्फ़िगर किए गए टेक्स्टिंग प्रदाता (`@churchapps/texting`: TextInChurch, Clearstream, या MutualMinistry; कोई अंतर्निहित SMS भेजने वाला नहीं है) का क्रॉस-मॉड्यूल द्वार। गेटवे एक `sentText` पंक्ति और प्रति-प्राप्तकर्ता `deliveryLog` प्रविष्टियाँ लॉग करता है और एक बैच को 500 प्राप्तकर्ताओं तक सीमित करता है; बिना प्रदाता के यह `no_provider` लौटाता है, जिसे किओस्क "No SMS provider configured" के रूप में दिखाता है। नियंत्रक का `dispatch()` फ़ोन नंबरों को डुप्लिकेट से हटाता है और बिना मोबाइल वाले या `optedOut` लोगों को छोड़ता है, `{ sent, failed, skippedOptedOut, skippedNoPhone }` लौटाते हुए ताकि किओस्क दिखा सके कि क्या छोड़ा गया।

## किओस्क (B1Checkin)

स्क्रीनें `B1Checkin/app/` के अंतर्गत expo-router फ़ाइलें हैं; स्क्रीनों के बीच की स्थिति एक स्थैतिक `CachedData` क्लास (`src/helpers/CachedData.ts`) में रहती है, React state में नहीं।

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Lookup** (`app/lookup.tsx`) -- फ़ोन से खोजें (`GET /membership/people/search/phone?number=`, अंतिम-4 या पूरा) या नाम से (`GET /membership/people/search?term=`)। किसी मिलान को चुनने पर परिवार (`GET /membership/people/household/{householdId}`) और मौजूदा विज़िट (`GET /attendance/visits/checkin`) लोड होते हैं, और `pendingVisits` को पिछले सप्ताह के चयनों से भरते हैं।
2. **परिवार समीक्षा** (`app/household.tsx`, `src/components/MemberList.tsx`) -- हर सदस्य पंक्ति पर पहले से चेक-इन बैज, एलर्जी/`nametagNotes` बैज, और उनके वर्तमान कक्ष चिप्स दिखते हैं। किसी सदस्य को विस्तृत करने पर हर सेवा समय कक्ष बटन के साथ और Member / Guest / Volunteer चेक-इन-प्रकार चिप्स सूचीबद्ध होते हैं (`MemberServiceTimes.tsx`)। हर सेवा समय के नाम के नीचे, `ServiceTimeHelper.getGroupSummary()` वहाँ दिए गए समूह दिखाता है (`serviceTime.groups` के नाम, ट्रिम किए हुए, केस-इनसेंसिटिव रूप से डी-डुप्लिकेट, अल्पविराम से जुड़े); समय में कोई समूह न हो तो कुछ नहीं दिखता।
3. **समूह असाइनमेंट** (`app/selectGroup.tsx`) -- `serviceTime.groups` से बना एक श्रेणी tree, आयु/ग्रेड-पात्र कक्ष उजागर और अपात्र धुंधले, स्टाफ़ पुष्टि के पीछे (देखें [आयु/ग्रेड पात्रता](#agegrade-eligibility-kiosk-side)); कक्ष चुनने पर उस व्यक्ति की लंबित विज़िट में एक `{ session: { serviceTimeId, groupId } }` visitSession लिखा जाता है (`src/helpers/VisitSessionHelper.ts`)। "None" उसे साफ़ करता है।
4. **पूरा करें** (`app/checkinComplete.tsx`) -- `pendingVisits` के साथ `POST /attendance/visits/checkin` (हर एक अपने `checkinType` के साथ अंकित), फिर यदि प्रिंटर कॉन्फ़िगर है तो लेबल प्रिंट करता है और लुकअप पर स्वतः लौटता है। `409` क्षमता या `notOpen` प्रतिक्रिया कारण सहित नामित कक्ष दिखाती है (भरा/बंद, या चेक-इन नहीं खुला है); अनुपात चेतावनी एक स्टाफ़ पुष्टि देती है जो `acknowledgeWarnings=true` के साथ फिर से सबमिट होती है।

**चेक-आउट** स्क्रीन (`app/checkout.tsx`) 4-अक्षर का सुरक्षा कोड एक स्वतः-फ़ोकस्ड इनपुट के माध्यम से स्वीकार करती है -- ताकि USB/Bluetooth कीबोर्ड-वेज बारकोड स्कैनर बिना कैमरे के काम करें -- या उसी वर्णमाला वाला स्क्रीन पर कीपैड, 4 अक्षरों पर स्वतः सबमिट। **Scan** बटन एक शीट खोलता है जिसमें साझा `src/components/CodeScanner.tsx` कैमरा है (डिफ़ॉल्ट रूप से बैक-फ़ेसिंग, QR, Code 128, और Code 39 स्वीकार करता है), ताकि वेज स्कैनर वाले बिना स्टेशन भी पिकअप लेबल पढ़ सकें; स्कैन किया गया कोड टाइप किए गए इनपुट के समान `handleCode()` पथ में जाता है। यह कोड खोजता है, पिकअप हो रहे बच्चे दिखाता है, और परिवार के **विश्वसनीय पिकअप लोगों** को टैप योग्य कार्डों के रूप में परिवार के वयस्कों की फ़ोटो ग्रिड के साथ प्रस्तुत करता है (साथ में एक "Other" मुक्त-टेक्स्ट विकल्प जो अनधिकृत नामों के विरुद्ध फ़ज़ी-जाँचा जाता है -- देखें [विश्वसनीय और अनधिकृत पिकअप](#trusted-and-not-authorized-pickup)), फिर पिकर के नाम/id के साथ `POST /attendance/visits/checkout` पोस्ट करता है। मैन्ड मोड में स्क्रीन **Page a parent** (`POST /attendance/checkin/page`) और एक **सुरक्षा-लेबल पुनः-प्रिंट** भी देती है -- `reprint()` `LabelHelper.getAllLabelsFor(...)` से परिवार के लेबल पुनर्निर्मित करता है और उन्हें चेक-इन वाली उसी `PrintUI` पाइपलाइन से गुज़ारता है।

स्टेशन का व्यक्तित्व एक AsyncStorage फ़्लैग `@StationMode` (`"self"` | `"manned"`, `app/adminSettings.tsx` में टॉगल) है। मैन्ड मोड लुकअप स्क्रीन पर चेक-आउट प्रवेश बिंदु और परिवार स्क्रीन से प्रति-सदस्य प्रोफ़ाइल संपादन (`POST /membership/people`) जोड़ता है। किओस्क सख्ती अंतर्निहित है: एक वैकल्पिक PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) एडमिन और प्रिंटर स्क्रीन को गेट करता है, एडमिन स्क्रीन केवल हेडर लोगो पर 7 तेज़ टैप से खुलती है, और एक निष्क्रिय attract स्क्रीन (`src/hooks/useInactivityTimer.ts`) परिवारों के बीच नियंत्रण लेती है।

## सेल्फ़ चेक-इन (B1App)

सदस्य b1.church पोर्टल से `/mobile/checkin` स्क्रीन पर चेक इन करते हैं (`B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` द्वारा `screens/CheckinPage.tsx` पर रूट)। इसके लिए लॉग-इन उपयोगकर्ता चाहिए और यह वही चार चरण चलता है जो किओस्क चलाता है -- सेवाएँ → परिवार → समूह → पूरा -- उन्हीं endpoints के विरुद्ध, स्थिति `B1App/src/helpers/CheckinHelper.ts` में। किओस्क से अंतर: परिवार लॉग-इन उपयोगकर्ता के अपने `householdId` से आता है (कोई खोज चरण नहीं), और कोई लेबल प्रिंटिंग नहीं है -- इसके बजाय पूर्णता स्क्रीन बैच का सुरक्षा कोड एक QR (`qrcode.react`) के रूप में दिखाती है, "show this at a check-in station" संकेत के साथ। यदि पृष्ठ लोड होने पर परिवार पहले से चेक इन है, तो एक "Show check-in code" बटन पहली मौजूदा विज़िट (`GET /attendance/visits/checkin` से) से QR फिर दिखाता है जिसमें `securityCode` हो। चेक-इन सबमिट के समय तुरंत दर्ज होता है (कोई लंबित स्थिति नहीं); QR केवल किओस्क पर लेबल प्रिंटिंग चलाता है।

**फ़ोन-से-किओस्क लेबल प्रिंटिंग** (`B1Checkin/app/scan.tsx`, लुकअप स्क्रीन पर QR "Scan code" बटन से पहुँचा): किओस्क `CodeScanner` (एक `expo-camera` `CameraView`, डिफ़ॉल्ट रूप से फ़्रंट-फ़ेसिंग, पलटने योग्य) दिखाता है जो QR कोड स्कैन करता है। `ScanCodeHelper.parse()` एक payload तभी स्वीकार करता है जब वह सुरक्षा-कोड वर्णमाला में केवल 4-अक्षर का कोड हो, और `ScanCodeHelper.isRepeat()` उसी कोड को 4 सेकंड के लिए अनदेखा करता है, इसलिए B1App QR और छपे लेबल का QR ब्लॉक दोनों काम करते हैं। स्क्रीन फिर चेक-आउट पुनः-प्रिंट पथ का अनुसरण करती है -- `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` -- और लुकअप पर लौटती है। स्कैन के समय कोई उपस्थिति लिखी नहीं जाती; केवल लेबल। बिना सक्रिय विज़िट वाले कोड, बिना प्रिंटर वाले स्टेशन, और बिना लेबल वाले समूह हर एक एक toast दिखाते हैं और लुकअप पर लौटते हैं।

प्रकार और `ApiHelper`/`ArrayHelper` `@churchapps/helpers` और `@churchapps/apphelper` से आते हैं; B1Admin के साथ कोई React कंपोनेंट साझा नहीं होता।

## एडमिन-पक्ष उपस्थिति (B1Admin)

- **Setup** -- `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) संरचना tree रेंडर करता है और सेवाएँ (`ServiceEdit.tsx`) और सेवा समय (`ServiceTimeEdit.tsx`) बनाता है। परिसर डेटा `useCampuses()` hook के माध्यम से membership से आता है।
- **मैन्युअल उपस्थिति** उपस्थिति अनुभाग पर नहीं, बल्कि समूह पक्ष पर रहती है: `B1Admin/src/groups/components/GroupSessionsTab.tsx` सत्र बनाता है (`POST /attendance/sessions`; जोड़ते समय, `SessionEdit.tsx` चुने गए सेवा समय को साझा करने वाले हर अन्य समूह के लिए एक सत्र शामिल कर सकता है, उस तारीख पर पहले से सत्र वाले समूहों को छोड़ते हुए) और `POST /attendance/visitsessions/log` के माध्यम से लोगों को उपस्थित चिह्नित करता है, जो उस व्यक्ति और सत्र के लिए विज़िट खोजता या बनाता है। समूह लीडर `attendance.edit` अनुमति के बिना अपने समूहों की उपस्थिति दर्ज कर सकते हैं -- नियंत्रक `au.leaderGroupIds` जाँचते हैं।
- **रिपोर्टिंग** -- उपस्थिति रुझान और समूह उपस्थिति सर्वर-परिभाषित रिपोर्ट हैं (`B1Admin/src/components/reporting/ReportWithFilter.tsx` ReportingApi के विरुद्ध; परिभाषाएँ `Api/reports/*.json` में)। दोनों `startDate`/`endDate` लेते हैं (अंतिम तारीख समावेशी); रुझान रिपोर्ट डिफ़ॉल्ट रूप से एक साल पहले से आज तक होती है और प्रति-सप्ताह `sessionDates` कॉलम जोड़ती है, और समूह उपस्थिति का स्क्रीन tree हर विज़िट का `checkinTime` और व्यक्ति का `membershipStatus` शामिल करता है। समूह उपस्थिति का CSV सहयोगी `groupAttendanceDownload` रिपोर्ट से आता है, जिसे `GroupAttendanceDownloadHelper` हर समूह सदस्य के लिए एक पंक्ति में बदलता है जिसमें हर तारीख वाले सत्र के लिए एक उपस्थित/अनुपस्थित कॉलम होता है; व्यक्ति-प्रति इतिहास `GET /attendance/attendancerecords?personId=` है (`B1Admin/src/people/components/PersonAttendance.tsx`)।

## लेबल प्रिंटिंग

### टेम्पलेट और डिज़ाइनर

चर्च अपने लेबल B1Admin में `/mobile/checkin/labels` पर डिज़ाइन करते हैं (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, चेक-इन सेटिंग्स पृष्ठ से पहुँचा)। एक टेम्पलेट एक `labelTemplates` पंक्ति है जिसकी `content` ब्लॉकों की एक JSON सरणी है -- `text`, `field`, `barcode`, `qrcode`, या `box` -- हर एक प्रतिशत निर्देशांक में फ़ॉन्ट, संरेखण, प्रतीक-पद्धति (`code39`/`code128`/`qr`), और वैकल्पिक दृश्यता शर्तों सहित स्थित (जैसे एलर्जी बॉक्स केवल तभी रेंडर करें जब `person.nametagNotes` खाली न हो)। दो `labelType` होते हैं: `nametag` (चेक-इन व्यक्ति प्रति एक; `person.displayName`, `sessions`, `securityCode`, और `person.isBirthdayWeek` जैसे फ़ील्ड -- `"true"` जब जन्मदिन का महीना/दिन आज से 3 दिनों के भीतर हो, वर्ष के अंत को पार करते हुए, `LabelHelper.isBirthdayWithin()` द्वारा गणना) और `pickup` (परिवार प्रति एक; `children`, `childrenAllergies` जैसे फ़ील्ड)। सर्वर चर्च-प्रति प्रकार पर एक ही डिफ़ॉल्ट लागू करता है (`LabelTemplateController.save`)। डिज़ाइनर किओस्क के बंडल किए लेबलों को प्रतिबिंबित करने वाले स्टार्टर टेम्पलेट देता है और नमूना डेटा के विरुद्ध पूर्वावलोकन करता है।

### किओस्क पर रेंडरिंग और प्रिंटिंग

चेक-इन पूरा होने पर `B1Checkin/src/helpers/LabelHelper.ts` हर लंबित विज़िट पर समूह फ़्लैग से तय करता है कि क्या प्रिंट करना है: `printNametag` समूहों के लिए नेमटैग, और यदि किसी विज़िट ने `parentPickup` समूह को छुआ है तो एक परिवार पिकअप लेबल। `checkinType` `volunteer` वाली विज़िट `LabelHelper.selectChildVisits()` द्वारा छोड़ी जाती हैं, इसलिए Parent Pickup कक्ष में एक चाइल्डकेयर कार्यकर्ता कभी पिकअप लेबल ट्रिगर नहीं करता। चेक-इन प्रतिक्रिया से सुरक्षा कोड बच्चों के नेमटैग और पिकअप लेबल पर जाता है; वयस्क नेमटैग बिना कोड के प्रिंट होते हैं। यदि चर्च के पास टेम्पलेट हैं, तो `LabelRenderer` (`src/helpers/LabelRenderer.ts`) ब्लॉक + एक फ़ील्ड संदर्भ को एक स्वतंत्र HTML दस्तावेज़ में बदलता है; अन्यथा `B1Checkin/assets/labels/` में बंडल HTML लेबल placeholder प्रतिस्थापन के साथ उपयोग होते हैं।

बारकोड `B1Checkin/src/helpers/barcode.ts` में शुद्ध-TypeScript encoders द्वारा inline SVG के रूप में बनाए जाते हैं -- Code 39 पैटर्न तालिकाएँ और Code 128 (code set B, mod-103 checksum के साथ) चौड़ाई तालिकाएँ, साथ में `qrcode` पैकेज के माध्यम से QR। **ये encoders जानबूझकर B1Admin में दोहराए गए हैं** (`LabelEditor.tsx` वही तालिकाएँ inline करता है, एक कोड टिप्पणी में नोट है) ताकि डिज़ाइनर पूर्वावलोकन किओस्क आउटपुट से पिक्सल-समान हों; एक में बदलाव दूसरे में प्रतिबिंबित होना चाहिए।

प्रिंट पाइपलाइन (`src/components/PrintUI.tsx`) हर HTML लेबल को एक `WebView` में रेंडर करती है, `react-native-view-shot` के माध्यम से JPG में कैप्चर करती है, और इमेज URIs को मूल **printer-helper** Expo मॉड्यूल (`B1Checkin/modules/printer-helper/`) को सौंपती है। मॉड्यूल `scan()`, `checkInit()`, `printUris()`, और स्थिति इवेंट देता है, दोनों प्लेटफ़ॉर्म पर हर ब्रांड के लिए एक provider के साथ:

| ब्रांड | Android | iOS | टिप्पणियाँ |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | QL-श्रृंखला नेटवर्क प्रिंटर (QL-800/810W/820NWB/1100/1110NWB…), डाई-कट 29×90 लेबल, अनुशंसित डिफ़ॉल्ट |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | नेटवर्क discovery + TCP/ZPL इमेज प्रिंटिंग |

प्रिंटर चयन `app/printers.tsx` पर रहता है (नेटवर्क स्कैन `brand~model~ip` प्रविष्टियाँ लौटाता है; चयन AsyncStorage में बना रहता है), और `src/helpers/PrinterLog.ts` एक ऑन-डिवाइस डायग्नोस्टिक लॉग रखता है जो किओस्क हेडर में एक लाइव स्थिति बिंदु के माध्यम से दिखाया जाता है।

## अतिथि पंजीकरण

दो पथ चेक-इन के बीच एक व्यक्ति बनाते हैं:

- **किओस्क पर** -- परिवार स्क्रीन का "Add guest" `B1Checkin/app/addGuest.tsx` खोलता है, जो पहले किसी मौजूदा गैर-सदस्य मिलान के लिए `GET /membership/people/search?term=` खोजता है और अन्यथा `POST /membership/people` से एक बनाता है, वर्तमान परिवार से जुड़ा हुआ। अतिथि फिर किसी भी सदस्य की तरह समूह असाइनमेंट से गुज़रता है।
- **QR के माध्यम से सेल्फ़-सर्व** -- जब चर्च सेटिंग `enableQRGuestRegistration` चालू हो (B1Admin की चेक-इन सेटिंग्स में कॉन्फ़िगर, `GET /membership/settings/public/{churchId}` से पढ़ी गई), तो किओस्क लुकअप स्क्रीन `https://{subdomain}.b1.church/guest-register?serviceId=` से जुड़ा QR कोड दिखाती है। वह B1App पृष्ठ (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) आने वाले परिवार को गुमनाम `POST /membership/people/guest-register` endpoint के माध्यम से अपने फ़ोन पर स्वयं को पंजीकृत करने देता है, किओस्क की कतार चलती रखते हुए। QR शीट पर एक **Register here** बटन भी है जो वही पृष्ठ किओस्क पर (`app/guestRegister.tsx`) एक गुप्त, कैश-रहित `WebView` में खोलता है; `src/helpers/GuestRegisterHelper.ts` QR और WebView दोनों के लिए URL बनाता है और `https://{subdomain}.b1.church/guest-register` से बाहर के नेविगेशन को रोकता है। **Done**, बैक, या 120 सेकंड की निष्क्रियता पर स्क्रीन लुकअप पर वापस जाती है (फ़ॉर्म टाइपिंग WebView से गतिविधि के रूप में प्रसारित होती है), WebView को अनमाउंट करते हुए ताकि एक परिवार की प्रविष्टियाँ अगले तक न पहुँचें।

QR साइन-अप उन चर्च सेटिंग्स से चलता है जो B1Admin के **QR Guest Registration** कार्ड (`src/mobile/CheckInPage.tsx`) से सहेजी गई हैं:

| सेटिंग | दृश्यता | उद्देश्य |
|---|---|---|
| `enableQRGuestRegistration` | public | किओस्क QR और गुमनाम endpoints के लिए opt-in स्विच |
| `guestRegistrationFields` | public | `email`, `phone`, `address`, `birthDate`, `gender`, `maritalStatus`, `grade`, `comments` → `"off"` / `"optional"` / `"required"` का JSON मानचित्र। डिफ़ॉल्ट: email और phone वैकल्पिक, बाकी off। पहला/अंतिम नाम हमेशा आवश्यक |
| `guestRegistrationImage` | public | हेडर फ़ोटो URL; B1App इसे फ़ॉर्म और पुष्टि स्क्रीन पर आइकन की जगह 16:9 में रेंडर करता है |
| `guestRegistrationGroupId` | private | वह समूह जिसमें हर साइन-अप जुड़ता है (अतिथि इसे कभी नहीं देखते या चुनते) |
| `guestRegistrationRecordAttendance` | private | उस समूह के लिए उपस्थिति भी दर्ज करने हेतु `"true"` |

B1App का `src/components/checkin/GuestRegister.tsx` गुमनाम `GET /membership/people/guest-register/options?churchId=` से चेकलिस्ट लाता है और केवल शामिल फ़ील्ड रेंडर करता है (प्राथमिक संपर्क पर email, phone, marital status, और address; हर सदस्य पर birth date, gender, और grade; एक comments बॉक्स), और केवल वही भेजता है। सर्वर `GuestRegistrationHelper.sanitize()` में चेकलिस्ट फिर से लागू करता है -- off फ़ील्ड हटा दिए जाते हैं, गायब आवश्यक या सूची-से-बाहर मान 400 होते हैं -- इससे पहले कि `PersonHelper.registerGuestHousehold()` चले। यह पहले हर सदस्य के लिए email या phone वाले `PersonRepo.findGuestMatch()` को कॉल करता है: उसी पहले नाम और उसी email या phone अंकों वाला ठीक एक जीवित व्यक्ति पुन: उपयोग होता है (शून्य या कई मिलान नए व्यक्ति बनाते हैं, इसलिए यह अनुमान कभी नहीं लगाता)। संपर्क-रहित सदस्य मिलान किए गए परिवार के भीतर पहले नाम से मिलता है। पुन: उपयोग किए गए लोग कभी संपादित नहीं होते, इसलिए एक गुमनाम फ़ॉर्म संग्रहीत विवरण को overwrite नहीं कर सकता, और प्रतिक्रिया सबमिट किए गए नाम दोहराती है। बिना मिलान वाले सदस्य मिलान किए गए या नए परिवार में `membershipStatus: "Visitor"` के रूप में जुड़ते हैं, और हर नए व्यक्ति के लिए `person.created` भेजते हैं। उसके बाद, विफलताएँ लौटाई नहीं जातीं बल्कि लॉग होती हैं: सदस्य कॉन्फ़िगर किए गए समूह में जोड़े जाते हैं (`group.member.added`); यदि उपस्थिति रिकॉर्डिंग चालू है, तो `AttendanceModuleGateway.recordAttendance()` हर सदस्य को समूह के हर उस सेवा समय के लिए उपस्थित चिह्नित करता है जिसका शेड्यूल है और जिसकी चेक-इन विंडो (`CheckinGateHelper.isServiceTimeOpen`) अभी खुली है, आवश्यकता होने पर चर्च-स्थानीय आज की तारीख के लिए सत्र बनाते हुए -- अनिर्धारित सेवा समय और विंडो के बाहर के साइन-अप कुछ दर्ज नहीं करते; और टिप्पणियाँ परिवार प्रमुख पर एक छिपी व्यक्ति-नोट बातचीत बनती हैं (संदेश लेखक "Guest sign-up"), `person.conversationId` के माध्यम से जुड़ी।

## संबंधित पृष्ठ

- [Attendance Endpoints](../api/endpoints/attendance.md) -- परिसर, सेवाओं, सत्रों, विज़िटों और विज़िट सत्रों के लिए पूर्ण REST सतह
- [Membership Endpoints](../api/endpoints/membership.md) -- लोग, परिवार और समूह
- [Webhooks](../api/webhooks.md) -- `session.created`, `attendance.recorded`, और `attendance.checkout` इवेंट
- [Module Structure](../api/module-structure.md) -- attendance मॉड्यूल सर्वर-साइड पर कैसे व्यवस्थित है
