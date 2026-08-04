---
title: "Check-Ins"
---

# Check-Ins

<div class="article-intro">

Check-in एक सिस्टम है जिसके तीन front doors हैं: staffed और self-serve स्टेशनों के लिए B1Checkin kiosk ऐप, B1App member पोर्टल के अंदर self check-in, और B1Admin में admin-side attendance। ये तीनों core Api में उसी attendance मॉड्यूल में लिखते हैं, और classroom routing पूरी तरह Groups द्वारा संचालित होती है — कोई अलग "locations" या "rooms" entity नहीं है। एक child-safety लेयर इसके ऊपर बैठती है: प्रति-visit check-in types, server-side capacity और volunteer-ratio gates, kiosk-side age/grade eligibility, check-out पर trusted-pickup वेरिफ़िकेशन, और चर्च के texting प्रोवाइडर के ज़रिए parent paging। यह पृष्ठ data मॉडल, check-in फ़्लो, safety लेयर, और label printing pipeline को मैप करता है।

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

| सतह | रेपो | स्टैक | भूमिका |
|---------|------|-------|------|
| Kiosk | `B1Checkin` | Expo / React Native, expo-router फ़ाइल राउटिंग; Android, Amazon Fire, और iOS के लिए EAS builds; `expo-updates` के ज़रिए OTA अपडेट | Label printing और verified check-out के साथ staffed या self-serve स्टेशन |
| Self check-in | `B1App` | Next.js (b1.church member पोर्टल) | Logged-in members अपने household को फ़ोन से check in करते हैं; कोई printing नहीं |
| Admin | `B1Admin` | React SPA | Service संरचना कॉन्फ़िगर करता है, service times को groups असाइन करता है, labels डिज़ाइन करता है, manual attendance रिकॉर्ड करता है, reports चलाता है |

तीनों `ApiHelper` के ज़रिए एक ही दो API मॉड्यूल को कॉल करते हैं: लोगों, households, और groups के लिए **MembershipApi** (`/membership`); नीचे की हर चीज़ के लिए **AttendanceApi** (`/attendance`)।

## डेटा मॉडल (`Api/src/modules/attendance`)

| Entity / table | मुख्य फ़ील्ड | अर्थ |
|----------------|-----------|---------|
| `campuses` | name, address | यहाँ deprecated है — campuses membership मॉड्यूल में master होते हैं (`/membership/campuses`); attendance की कॉपी legacy readers के लिए read-only frozen है (`models/Campus.ts`) |
| `services` | campusId, name | एक आवर्ती gathering, जैसे "Sunday Morning" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name | एक service के भीतर एक time slot, जैसे "9:00 AM" (`models/ServiceTime.ts`) |
| `groupServiceTimes` | groupId, serviceTimeId | Join टेबल: कौन से groups (classrooms) किन service times पर मिलते हैं (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | किसी एक तारीख़ पर एक group की एक मीटिंग — check-in समय पर lazily बनाई जाती है (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | किसी एक तारीख़ पर एक व्यक्ति का attendance (`models/Visit.ts`)। `checkinType` `member` / `guest` / `volunteer` है (NULL = legacy member), kiosk द्वारा सेट और capacity/ratio gates द्वारा उपयोग किया जाता है |
| `visitSessions` | visitId, sessionId | एक visit किस session(s) को कवर करती है — दो service times में check-in करने वाले एक बच्चे को दो rows मिलती हैं (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON blocks) | डिज़ाइन करने योग्य label layouts (`models/LabelTemplate.ts`) |

### एक पूरा हुआ check-in कैसे persist होता है

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) `POST /attendance/visits/checkin?serviceId=&peopleIds=` को हैंडल करता है। बॉडी `Visit` ऑब्जेक्ट्स की एक array है, हर एक `visitSessions` carry करता है जिसका embedded `session` केवल एक `(serviceTimeId, groupId)` जोड़ी को नाम देता है। सर्वर फिर:

1. **किसी भी write से पहले capacity और ratios को gate करता है।** `evaluateGates()` → `CheckinGateHelper.evaluate()` हर लक्षित room की capacity, guest capacity, closed flag, और volunteer ratio को वर्तमान occupancy के विरुद्ध जाँचता है। postCheckin **transactional नहीं है**, इसलिए gate को पहली save से पहले चलना चाहिए — एक hard violation दोषी room(s) का नाम लेते हुए एक 409 लौटाता है और कुछ भी persist नहीं होता। देखें [Capacity और volunteer-ratio gates](#capacity-and-volunteer-ratio-gates)।
2. **Sessions को lazily resolve करता है।** `getSessionId()` `(groupId, serviceTimeId, today)` के लिए `sessions` row को ढूँढता या बनाता है — session ids प्रति तारीख़ प्रोसेस में cache होते हैं। नए sessions एक `session.created` webhook emit करते हैं। Loop एक awaited `for..of` है — एक पहले वाला fire-and-forget `forEach(async …)` save को race करता था और पहले-session बनाने पर NULL sessionIds लिखता था (ठीक कर दिया गया; loop पर एक code comment में नोट किया गया है)।
3. **दिन के रिकॉर्ड्स को replace करता है।** आज उस service में उन लोगों के लिए कोई भी मौजूदा visits उनकी visitSessions के साथ डिलीट कर दी जाती हैं, फिर सबमिट किया गया सेट सेव होता है। एक परिवार को दोबारा check-in करना इसलिए एक idempotent "यही वर्तमान स्थिति है" ऑपरेशन है, न कि एक append। `?checkDuplicates=true` पास करना इसके बजाय बिना कुछ लिखे `{ duplicates: [personId…] }` लौटाता है, जो kiosk को overwrite से पहले चेतावनी देने का तरीका है।
4. **प्रति batch एक security code बनाता है।** `SecurityCodeHelper.generate()` alphabet `23456789BCDFGHJKLMNPQRSTVWXYZ` से एक 4-अक्षर का कोड बनाता है (कोई vowels या ambiguous characters नहीं, ताकि codes शब्द न बन सकें या misread न हों)। सर्वर उसी चर्च की उसी दिन की open visits के विरुद्ध collision पर retry करता है और batch की हर visit पर कोड stamp करता है।
5. **`{ streaks, securityCode }` लौटाता है।** `streaks` personId को लगातार-सप्ताह attendance गिनती से मैप करता है; kiosk मील के पत्थर (हर 5वें सप्ताह) को confetti से celebrate करता है।

हर सेव की गई visit एक `attendance.recorded` webhook भी emit करती है। Read side, `GET /attendance/visits/checkin`, लोगों की visits उनकी **आख़िरी logged तारीख़** से लौटाता है — यदि वह पिछला सप्ताह था तो ids strip कर दी जाती हैं, इसलिए क्लाइंट को पिछले सप्ताह के room selections की एक pre-filled कॉपी मिलती है जो नए रिकॉर्ड्स के रूप में सेव होगी।

### Check-out

दो endpoints लूप पूरा करते हैं (`VisitController`):

- `GET /attendance/visits/code/:code` — आज की not-yet-checked-out visits जो वह security code carry करती हैं, sessions के साथ populated।
- `POST /attendance/visits/checkout` — बॉडी `{ visitIds, checkedOutBy?, checkedOutById? }`; `checkoutTime` और किसने पिकअप किया वह stamp करता है, और प्रति visit एक `attendance.checkout` webhook emit करता है।

Permissions: kiosks `attendance.checkin` से authenticate करते हैं, जो बिल्कुल check-in/check-out/label-template सतह की अनुमति देता है; `attendance.view`/`attendance.edit` reporting और manual entry को कवर करते हैं; संरचना (services, service times, group assignments) के लिए `services.edit` चाहिए।

## Room routing को Groups चलाते हैं

सिस्टम में कहीं भी कोई room या classroom entity नहीं है। एक "room" एक membership **group** है जिसमें `trackAttendance` सक्षम है, एक या अधिक service times से `groupServiceTimes` के ज़रिए लिंक्ड। Group के फ़ील्ड (`Api/src/modules/membership/models/Group.ts` पर) जो kiosk व्यवहार को आकार देते हैं:

| फ़ील्ड | प्रभाव |
|------|--------|
| `trackAttendance` | Group बिल्कुल attendance में भाग लेता है या नहीं; B1Admin की setup tree उन `trackAttendance` groups को unassigned के रूप में फ़्लैग करती है जिनकी कोई `groupServiceTimes` row नहीं है |
| `parentPickup` | एक child room को चिह्नित करता है: इसमें check-in करना visit को एक "child" visit बनाता है, जो एक family pickup label प्रिंट करता है और nametag पर security code डालता है |
| `printNametag` | क्या इस group में check-ins बिल्कुल एक nametag प्रिंट करते हैं |
| `capacity` / `guestCapacity` / `checkinClosed` | Room capacity सीमाएँ और एक hard "closed" स्विच, server-side पर check-in gate द्वारा लागू (B1Admin की group settings में "Check-In Capacity" के तहत edited) |
| `volunteerRatio` / `minVolunteers` | Children-per-volunteer अनुपात और न्यूनतम volunteer headcount, चर्च-वाइड `ratioEnforcement` सेटिंग के अनुसार लागू |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Rooms को highlight या dim करने के लिए kiosk-side पर मूल्यांकित Age/grade eligibility सीमाएँ |

हर क्लाइंट उसी तरह denormalize करता है (जैसे `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes`, और `GET /membership/groups` को parallel में लोड करें, फिर हर service time के लिए उन groups को इकट्ठा करें जिनकी `groupServiceTimes` row उसकी ओर इशारा करती है, `serviceTime.groups` में। वह array ही है जो room picker दिखाता है, group `categoryName` से व्यवस्थित।

Assignments को B1Admin में group के पेज से edit किया जाता है (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), और पूरा Campus → Service → Service Time → Group tree `B1Admin/src/attendance/components/AttendanceSetup.tsx` में `GET /attendance/attendancerecords/tree` के ज़रिए visualize होता है।

:::info
क्योंकि groups सत्य का एकमात्र स्रोत हैं, वही group membership kiosk routing, B1Admin के group pages में roster-style attendance, और attendance reporting को शक्ति देती है — एक group को एक service time से असाइन करना ही उसे एक check-in destination बनाने के लिए ज़रूरी एकमात्र कदम है।
:::

## बाल सुरक्षा

### Check-in types

हर visit एक `checkinType` carry करती है — `member`, `guest`, या `volunteer` (NULL का मतलब legacy/member है; migration `tools/migrations/attendance/2026-07-03_checkin_type.ts`)। Type **kiosk-side** चुना जाता है: expanded member row पर Member / Guest / Volunteer chips (`B1Checkin/src/components/MemberServiceTimes.tsx`), completion पर हर pending visit पर stamped (`app/checkinComplete.tsx`, डिफ़ॉल्ट `member`)। सर्वर इसे gate में उपयोग करता है — volunteers capacity के विरुद्ध जाने के बजाय ratio coverage की ओर गिनते हैं, और guests `guestCapacity` के विरुद्ध गिने जाते हैं।

### Capacity और volunteer-ratio gates

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) postCheckin के अंदर किसी भी save से पहले चलता है (endpoint non-transactional है, इसलिए gating-before-save ही correctness तंत्र है)। यह membership module gateway के ज़रिए प्रति लक्षित group वर्तमान occupancy (`VisitRepo.countActiveByGroupToday`) और group config लोड करता है, फिर violations को classify करता है:

- **Hard (हमेशा block):** `checkinClosed`, `current + incoming > capacity`, `guestCapacity` से ज़्यादा guest गिनती। Batch `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` के साथ रिजेक्ट होता है — kiosk नामित room दिखाता है।
- **Ratio (warn या block):** एक room में incoming non-volunteers जहाँ `volunteers < minVolunteers`, बिल्कुल कोई volunteers नहीं, या `children > volunteers × volunteerRatio`। Severity प्रति-चर्च सेटिंग `ratioEnforcement` (`"warn"` डिफ़ॉल्ट / `"block"`, B1Admin Manage Church → Check-In में edited, `CheckinSettingsEdit.tsx`) का पालन करती है। Warn-mode `409 { warning: true, error: "ratio", … }` लौटाता है जब तक क्लाइंट `acknowledgeWarnings=true` के साथ resubmit न करे — वह resubmit ही kiosk का staff-confirm override है।

### आयु/grade eligibility (kiosk-side)

Room eligibility advisory UI है, kiosk पर मूल्यांकित, सर्वर द्वारा लागू नहीं। `B1Checkin/src/helpers/EligibilityHelper.ts` एक व्यक्ति की birthdate/grade की group के `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` से तुलना करता है (grade क्रम: PreK, K, 1–12, Graduated) और `eligible` / `ineligible` / `unknown` लौटाता है — गायब डेटा `unknown` देता है और कभी किसी room को छिपाता नहीं। Ages और grades चर्च की **grade promotion तारीख़** के अनुसार गणित किए जाते हैं (`gradePromotionDate` सेटिंग, `"MM-DD"`, `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx` में edited); kiosk इसे `GET /attendance/checkin/settings` से fetch करता है, और `resolveAsOfDate` आज या उससे पहले की सबसे हाल की घटना चुनता है। Room picker eligible rooms को highlight करता है और ineligible को dim करता है; एक dimmed room चुनने के लिए staff confirmation चाहिए।

### Trusted और not-authorized pickup

Pickup people एक membership entity हैं, प्रति household: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, वैकल्पिक personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes)। CRUD `GET /membership/householdpickup/:householdId` है (कोई भी authenticated चर्च यूज़र, इसलिए kiosks इसे पढ़ सकते हैं) प्लस `POST` / `DELETE` जो `people.edit` से gated है। स्टाफ़ व्यक्ति के पेज के **Pickup** कार्ड पर सूची मैनेज करता है (`B1Admin/src/people/components/PickupPeople.tsx`) — फोटो, relationship, और एक Trusted/Not Authorized status chip।

Check-out पर (`B1Checkin/app/checkout.tsx`) kiosk household की pickup सूची लोड करता है: `trusted` entries household-adult फोटो grid के साथ tappable pickup कार्ड्स के रूप में render होती हैं, और एक free-typed "Other" नाम को `notAuthorized` entries के विरुद्ध fuzzy-match किया जाता है (Levenshtein, `src/helpers/PickupMatchHelper.ts`) — एक मैच check-out को एक warning sheet और एक staff **Override** बटन के साथ ब्लॉक कर देता है। Override को visit पर ही log किया जाता है: यह सामान्य `POST /attendance/visits/checkout` के ज़रिए `checkedOutBy` को `"OVERRIDE: {name}"` के रूप में post करता है, इसलिए यह एक अलग audit table के बजाय attendance रिकॉर्ड और `attendance.checkout` webhook में जाता है।

### Parent को page करना और आपातकालीन प्रसारण

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) दो SMS endpoints expose करता है:

- `POST /page` — `{ visitId, message }`: एक checked-in बच्चे के guardians को page करता है (kiosk check-out screen, manned mode)।
- `POST /broadcast` — `{ serviceId, message }`: एक service के लिए हर checked-in household के adults को टेक्स्ट करता है (kiosk admin settings, `B1Checkin/app/adminSettings.tsx` में एक type-`EMERGENCY`-to-confirm sheet के पीछे)।

दोनों membership gateway के ज़रिए household adults को resolve करते हैं, फिर delivery **`MessagingModuleGateway.sendBulkText`** को सौंपते हैं (`Api/src/shared/modules/MessagingModuleGateway.ts`) — चर्च के कॉन्फ़िगर किए गए texting प्रोवाइडर के लिए cross-module दरवाज़ा (`@churchapps/texting`: TextInChurch, Clearstream, या MutualMinistry; कोई built-in SMS sender नहीं है)। Gateway एक `sentText` row प्लस प्रति-recipient `deliveryLog` entries लॉग करता है और एक batch को 500 recipients पर cap करता है; कोई प्रोवाइडर कॉन्फ़िगर न होने पर यह `no_provider` लौटाता है, जिसे kiosk "No SMS provider configured" के रूप में दिखाता है। कंट्रोलर का `dispatch()` फ़ोन नंबरों को deduplicate करता है और उन लोगों को skip करता है जिनका कोई mobile नहीं है या जिन्होंने `optedOut` सेट किया है, `{ sent, failed, skippedOptedOut, skippedNoPhone }` लौटाते हुए ताकि kiosk दिखा सके कि क्या skip किया गया।

## Kiosk (B1Checkin)

Screens `B1Checkin/app/` के तहत expo-router फ़ाइलें हैं; cross-screen state एक static `CachedData` क्लास में रहता है (`src/helpers/CachedData.ts`), न कि React state में।

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Lookup** (`app/lookup.tsx`) — फ़ोन से खोजें (`GET /membership/people/search/phone?number=`, आख़िरी-4 या पूरा) या नाम से (`GET /membership/people/search?term=`)। एक मैच चुनना household को लोड करता है (`GET /membership/people/household/{householdId}`) और मौजूदा visits (`GET /attendance/visits/checkin`), `pendingVisits` को पिछले सप्ताह के selections से seed करते हुए।
2. **Household review** (`app/household.tsx`, `src/components/MemberList.tsx`) — हर member row एक already-checked-in बैज, allergy/`nametagNotes` बैज, और उनकी वर्तमान room chips दिखाती है। एक member को expand करना हर service time को एक room बटन प्लस Member / Guest / Volunteer check-in-type chips के साथ सूचीबद्ध करता है (`MemberServiceTimes.tsx`)।
3. **Group assignment** (`app/selectGroup.tsx`) — `serviceTime.groups` से बना एक category tree, जिसमें age/grade-eligible rooms highlighted और ineligible वाले staff confirm के पीछे dimmed हैं (देखें [Age/grade eligibility](#agegrade-eligibility-kiosk-side)); एक room चुनना उस व्यक्ति की pending visit में एक `{ session: { serviceTimeId, groupId } }` visitSession लिखता है (`src/helpers/VisitSessionHelper.ts`)। "None" इसे साफ़ कर देता है।
4. **Complete** (`app/checkinComplete.tsx`) — `pendingVisits` (हर एक अपने `checkinType` के साथ stamped) के साथ `POST /attendance/visits/checkin`, फिर यदि एक printer कॉन्फ़िगर है तो labels प्रिंट करता है और lookup पर auto-return करता है। एक `409` capacity response नामित full/closed room दिखाता है; एक ratio warning एक staff confirm ऑफ़र करती है जो `acknowledgeWarnings=true` के साथ resubmit करती है।

**Check-out** स्क्रीन (`app/checkout.tsx`) 4-अक्षर के security code को एक auto-focused input के ज़रिए स्वीकार करती है — इसलिए USB/Bluetooth keyboard-wedge barcode scanners बिना किसी camera के काम करते हैं — या उसी alphabet का उपयोग करने वाला एक on-screen keypad, 4 अक्षरों पर auto-submitting। यह कोड को देखता है, पिकअप किए जा रहे बच्चों को दिखाता है, और household के **trusted pickup people** को household adults के फोटो grid के साथ tappable कार्ड्स के रूप में प्रस्तुत करता है (प्लस एक "Other" free-text विकल्प जो not-authorized नामों के विरुद्ध fuzzy-checked है — देखें [Trusted और not-authorized pickup](#trusted-and-not-authorized-pickup)), फिर picker के नाम/id के साथ `POST /attendance/visits/checkout` को post करता है। Manned mode में स्क्रीन **Page a parent** (`POST /attendance/checkin/page`) और एक **security-label reprint** भी ऑफ़र करती है — `reprint()` परिवार के labels को `LabelHelper.getAllLabelsFor(...)` से rebuild करता है और उन्हें check-in जैसी ही `PrintUI` pipeline से feed करता है।

Station personality एक AsyncStorage फ़्लैग `@StationMode` है (`"self"` | `"manned"`, `app/adminSettings.tsx` में toggled)। Manned mode lookup स्क्रीन पर check-out entry point जोड़ता है और household स्क्रीन से प्रति-member profile editing (`POST /membership/people`)। Kiosk hardening built-in है: एक वैकल्पिक PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) admin और printer screens को gate करता है, admin स्क्रीन केवल header logo पर 7 तेज़ taps से खुलती है, और एक idle attract स्क्रीन (`src/hooks/useInactivityTimer.ts`) परिवारों के बीच takeover कर लेती है।

## Self check-in (B1App)

Members b1.church पोर्टल से `/mobile/checkin` स्क्रीन पर check in करते हैं (routed by `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` to `screens/CheckinPage.tsx`)। इसके लिए एक logged-in यूज़र चाहिए और यह kiosk जैसे ही चार steps पर चलता है — services → household → groups → complete — वही endpoints के विरुद्ध, state `B1App/src/helpers/CheckinHelper.ts` में held। Kiosk से अंतर: household logged-in यूज़र के अपने `householdId` से आता है (कोई search step नहीं), और कोई label printing नहीं है — इसके बजाय completion स्क्रीन batch का security code एक QR के रूप में दिखाती है (`qrcode.react`) एक "इसे एक check-in स्टेशन पर दिखाएँ" संकेत के साथ। यदि household पेज लोड होते समय पहले से checked in है, एक "Show check-in code" बटन मौजूदा visit के `securityCode` से QR को दोबारा दिखाता है। Check-in सबमिट होते ही तुरंत रिकॉर्ड हो जाता है (कोई pending स्टेट नहीं है); QR केवल kiosk पर label printing को ड्राइव करता है।

**फ़ोन-से-kiosk label printing** (`B1Checkin/app/scan.tsx`, lookup स्क्रीन पर "Scan code" बटन से पहुँचा गया): kiosk QR codes स्कैन करने वाला एक `expo-camera` `CameraView` खोलता है (डिफ़ॉल्ट रूप से front-facing, flippable)। एक scanned payload तभी स्वीकार होता है जब यह security-code alphabet में एक bare 4-अक्षर का कोड हो, इसलिए B1App का QR और एक प्रिंटेड label का QR ब्लॉक दोनों काम करते हैं। स्क्रीन फिर check-out reprint पाथ का पालन करती है — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — और lookup पर लौट आती है। स्कैन के समय कोई attendance write नहीं होती; केवल labels। कोई active visits न होने वाले codes, बिना printer वाले स्टेशन, और लेबल-रहित groups हर एक एक toast दिखाते हैं और lookup पर लौट आते हैं।

Types और `ApiHelper`/`ArrayHelper` `@churchapps/helpers` और `@churchapps/apphelper` से आते हैं; B1Admin के साथ कोई React components शेयर नहीं होते।

## Admin-side attendance (B1Admin)

- **Setup** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) संरचना tree रेंडर करता है और services (`ServiceEdit.tsx`) और service times (`ServiceTimeEdit.tsx`) बनाता है। Campus डेटा `useCampuses()` hook के ज़रिए membership से आता है।
- **Manual attendance** attendance सेक्शन में नहीं, Groups साइड पर रहता है: `B1Admin/src/groups/components/GroupSessionsTab.tsx` sessions बनाता है (`POST /attendance/sessions`) और `POST /attendance/visitsessions/log` के ज़रिए लोगों को present मार्क करता है, जो उस व्यक्ति और session के लिए visit को ढूँढता या बनाता है। Group leaders `attendance.edit` अनुमति के बिना अपने groups के लिए attendance रिकॉर्ड कर सकते हैं — कंट्रोलर `au.leaderGroupIds` चेक करते हैं।
- **Reporting** — attendance trend और group attendance सर्वर-defined reports हैं (`B1Admin/src/components/reporting/ReportWithFilter.tsx` ReportingApi के विरुद्ध); प्रति-व्यक्ति इतिहास `GET /attendance/attendancerecords?personId=` है (`B1Admin/src/people/components/PersonAttendance.tsx`)।

## Label printing

### Templates और designer

चर्च B1Admin में `/mobile/checkin/labels` पर अपने labels डिज़ाइन करते हैं (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, Check-In settings पेज से पहुँचा गया)। एक template एक `labelTemplates` row है जिसका `content` blocks का एक JSON array है — `text`, `field`, `barcode`, `qrcode`, या `box` — हर एक percent coordinates में positioned, font, alignment, symbology (`code39`/`code128`/`qr`), और वैकल्पिक visibility conditions के साथ (जैसे केवल तब allergy box रेंडर करना जब `person.nametagNotes` non-empty हो)। दो `labelType` मौजूद हैं: `nametag` (हर checked-in व्यक्ति के लिए एक; `person.displayName`, `sessions`, `securityCode` जैसे फ़ील्ड्स) और `pickup` (हर परिवार के लिए एक; `children`, `childrenAllergies` जैसे फ़ील्ड्स)। सर्वर प्रति चर्च प्रति type एक ही डिफ़ॉल्ट लागू करता है (`LabelTemplateController.save`)। Designer kiosk के bundled labels को mirror करने वाले starter templates शिप करता है और sample data के विरुद्ध preview करता है।

### Kiosk पर Rendering और printing

Check-in पूरा होने पर, `B1Checkin/src/helpers/LabelHelper.ts` हर pending visit पर group flags से तय करता है कि क्या प्रिंट करना है: `printNametag` groups के लिए nametags, प्लस एक family pickup label यदि किसी visit ने एक `parentPickup` group को hit किया। Check-in response का security code child nametags और pickup label पर जाता है; adult nametags बिना किसी कोड के प्रिंट होते हैं। यदि चर्च के पास templates हैं, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) blocks + एक field context को एक standalone HTML document में बदल देता है; अन्यथा `B1Checkin/assets/labels/` में bundled HTML labels placeholder substitution के साथ उपयोग होते हैं।

Barcodes को `B1Checkin/src/helpers/barcode.ts` में pure-TypeScript encoders द्वारा inline SVG के रूप में जनरेट किया जाता है — Code 39 pattern tables और Code 128 (mod-103 checksum वाला code set B) width tables, प्लस `qrcode` पैकेज के ज़रिए QR। **ये encoders जानबूझकर B1Admin में duplicate किए गए हैं** (`LabelEditor.tsx` वही tables inline करता है, एक code comment में नोट किया गया) ताकि designer previews kiosk output के लिए pixel-faithful रहें; एक में बदलाव को दूसरे में mirror होना चाहिए।

Print pipeline (`src/components/PrintUI.tsx`) हर HTML label को एक `WebView` में रेंडर करता है, इसे `react-native-view-shot` के ज़रिए JPG में capture करता है, और image URIs को native **printer-helper** Expo module को सौंपता है (`B1Checkin/modules/printer-helper/`)। Module `scan()`, `checkInit()`, `printUris()`, और status events को expose करता है, दोनों प्लेटफ़ॉर्म पर हर brand के लिए एक प्रोवाइडर के साथ:

| Brand | Android | iOS | नोट्स |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | QL-series नेटवर्क printers (QL-800/810W/820NWB/1100/1110NWB…), die-cut 29×90 labels, अनुशंसित डिफ़ॉल्ट |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | नेटवर्क डिस्कवरी + TCP/ZPL image printing |

Printer selection `app/printers.tsx` पर रहता है (network scan `brand~model~ip` entries लौटाता है; चुनाव AsyncStorage में persist होता है), और `src/helpers/PrinterLog.ts` kiosk header में एक live status dot के ज़रिए दिखाए गए एक on-device diagnostic log को रखता है।

## Guest registration

दो पाथ mid-check-in एक व्यक्ति बनाते हैं:

- **Kiosk पर** — household स्क्रीन का "Add guest" `B1Checkin/app/addGuest.tsx` खोलता है, जो पहले एक मौजूदा non-member मैच के लिए `GET /membership/people/search?term=` खोजता है और अन्यथा वर्तमान household से जुड़ा एक `POST /membership/people` से बनाता है। Guest फिर किसी भी member की तरह group assignment से गुज़रता है।
- **QR के ज़रिए Self-serve** — जब चर्च सेटिंग `enableQRGuestRegistration` चालू हो (B1Admin की Check-In settings में कॉन्फ़िगर, `GET /membership/settings/public/{churchId}` से पढ़ी गई), kiosk lookup स्क्रीन `https://{subdomain}.b1.church/guest-register?serviceId=` से लिंक करने वाला एक QR कोड दिखाती है। वह B1App पेज (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) एक visiting family को anonymous `POST /membership/people/guest-register` endpoint के ज़रिए अपने खुद के फ़ोन पर खुद को रजिस्टर करने देता है, kiosk की लाइन को चलते रखते हुए।

## संबंधित पृष्ठ

- [Attendance Endpoints](../api/endpoints/attendance) -- campuses, services, sessions, visits, और visit sessions के लिए पूर्ण REST सतह
- [Membership Endpoints](../api/endpoints/membership) -- लोग, households, और groups
- [Webhooks](../api/webhooks) -- `session.created`, `attendance.recorded`, और `attendance.checkout` events
- [Module Structure](../api/module-structure) -- attendance मॉड्यूल को server-side कैसे व्यवस्थित किया जाता है
