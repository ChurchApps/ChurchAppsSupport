---
title: "चेक-इन"
---

# चेक-इन

<div class="article-intro">

चेक-इन एक सिस्टम है जिसके तीन फ्रंट दरवाजे हैं: कर्मचारी-संचालित और स्व-सेवा स्टेशनों के लिए B1Checkin कियोस्क ऐप, B1App सदस्य पोर्टल के अंदर स्व चेक-इन, और B1Admin में प्रशासक-पक्ष उपस्थिति। ये सभी तीन कोर Api में एक ही उपस्थिति मॉड्यूल में लिखते हैं, और कक्षा राउटिंग पूरी तरह से समूहों द्वारा संचालित होती है — कोई अलग "स्थान" या "कमरा" इकाई नहीं है। बाल सुरक्षा की एक परत इसके ऊपर बैठती है: प्रति-visit चेक-इन प्रकार, सर्वर-पक्ष क्षमता और स्वेच्छासेवक-अनुपात गेट, कियोस्क-पक्ष आयु/grade eligibility, चेक-आउट पर विश्वसनीय-पिकअप सत्यापन, और चर्च के टेक्सटिंग प्रदाता पर माता-पिता को पेज करना। यह पृष्ठ डेटा मॉडल, चेक-इन प्रवाह, सुरक्षा परत, और लेबल प्रिंटिंग पाइपलाइन को मैप करता है।

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
| Kiosk | `B1Checkin` | Expo / React Native, expo-router फाइल राउटिंग; Android, Amazon Fire, और iOS के लिए EAS builds; `expo-updates` के माध्यम से OTA अपडेट | कर्मचारी-संचालित या स्व-सेवा स्टेशन लेबल प्रिंटिंग और सत्यापित चेक-आउट के साथ |
| Self check-in | `B1App` | Next.js (b1.church सदस्य पोर्टल) | लॉगिन किए गए सदस्य अपने घर को फोन से चेक इन करते हैं; कोई प्रिंटिंग नहीं |
| Admin | `B1Admin` | React SPA | सेवा संरचना को कॉन्फ़िगर करता है, सेवा समय के लिए समूहों को असाइन करता है, लेबल डिजाइन करता है, मैनुअल उपस्थिति दर्ज करता है, रिपोर्ट चलाता है |

सभी तीन `ApiHelper` के माध्यम से एक ही दो API मॉड्यूल को कॉल करते हैं: **MembershipApi** (`/membership`) लोगों, घरों, और समूहों के लिए; **AttendanceApi** (`/attendance`) नीचे की हर चीज के लिए।

## डेटा मॉडल (`Api/src/modules/attendance`)

| इकाई / तालिका | मुख्य फ़ील्ड | अर्थ |
|----------------|-----------|---------|
| `campuses` | name, address | यहां deprecated है — campuses को सदस्यता मॉड्यूल में mastered किया जाता है (`/membership/campuses`); attendance कॉपी legacy readers के लिए read-only है frozen (`models/Campus.ts`) |
| `services` | campusId, name | एक आवर्ती gathering, जैसे "Sunday Morning" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name | एक सेवा के भीतर एक समय स्लॉट, जैसे "9:00 AM" (`models/ServiceTime.ts`) |
| `groupServiceTimes` | groupId, serviceTimeId | Join तालिका: कौन से समूह (कक्षाएं) किन सेवा समय पर मिलते हैं (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | एक तारीख पर एक समूह की एक मीटिंग — चेक-इन समय पर lazily बनाया जाता है (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | एक तारीख पर एक व्यक्ति को अटेंड करना (`models/Visit.ts`)। `checkinType` है `member` / `guest` / `volunteer` (NULL = legacy member), कियोस्क द्वारा सेट और क्षमता/अनुपात gates द्वारा उपभोग किया जाता है |
| `visitSessions` | visitId, sessionId | किस session(s) को visit शामिल करता है — एक बच्चा जो दो service times में चेक इन करता है दो पंक्तियां मिलती हैं (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON blocks) | डिजाइन किए जा सकने वाले लेबल layouts (`models/LabelTemplate.ts`) |

### पूर्ण चेक-इन कैसे persisted है

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) `POST /attendance/visits/checkin?serviceId=&peopleIds=` को संभालता है। बॉडी `Visit` ऑब्जेक्ट्स की एक सरणी है, प्रत्येक `visitSessions` को ले जाता है जिसका embedded `session` केवल एक `(serviceTimeId, groupId)` जोड़ी को नाम देता है। सर्वर फिर:

1. **किसी भी लिखने से पहले क्षमता और अनुपात को gate करता है।** `evaluateGates()` → `CheckinGateHelper.evaluate()` प्रत्येक लक्षित कमरे की क्षमता, guest क्षमता, बंद flag, और स्वेच्छासेवक अनुपात को वर्तमान occupancy के विरुद्ध जांचता है। postCheckin **transactional नहीं है**, इसलिए gate पहली save से पहले चलना चाहिए — एक कठिन उल्लंघन एक 409 लौटाता है जिसमें अपराधी कमरे(s) का नाम है और कुछ भी persisted नहीं है। देखें [Capacity और volunteer-ratio gates](#capacity-and-volunteer-ratio-gates)।
2. **Sessions को lazily resolve करता है।** `getSessionId()` `(groupId, serviceTimeId, today)` के लिए `sessions` पंक्ति को ढूंढता या बनाता है — session ids प्रति तारीख प्रक्रिया में cached हैं। नई sessions `session.created` webhook उत्सर्जित करते हैं। लूप एक awaited `for..of` है — एक पहली fire-and-forget `forEach(async …)` save को race करता है और पहले-session बनाने पर NULL sessionIds लिखता है (fixed; code comment में लूप पर नोट किया गया)।
3. **दिन की रिकॉर्ड्स को replace करता है।** आज उस सेवा में उन लोगों के लिए कोई existing visits उनके visitSessions के साथ delete किए जाते हैं, फिर जमा किया गया सेट saved है। एक परिवार को फिर से चेक-इन करना इसलिए एक idempotent "यह वर्तमान स्थिति है" ऑपरेशन है, एक append नहीं। `?checkDuplicates=true` को पास करने से `{ duplicates: [personId…] }` लिखने के बिना return होता है — यह कैसे कियोस्क से पहले चेतावनी दी जाती है।
4. **प्रति batch एक सुरक्षा कोड generate करता है।** `SecurityCodeHelper.generate()` एक 4-character कोड alphabet `23456789BCDFGHJKLMNPQRSTVWXYZ` से produce करता है (कोई vowels या ambiguous characters नहीं, इसलिए codes शब्दों को spell नहीं कर सकते या misread नहीं कर सकते)। सर्वर एक ही चर्च के same-day open visits के विरुद्ध collision पर retry करता है और प्रत्येक visit में batch में code को stamp करता है।
5. **`{ streaks, securityCode }` लौटाता है।** `streaks` personId को consecutive-week attendance count में map करता है; कियोस्क मीलस्टोन (हर 5वें सप्ताह) को confetti से celebrate करता है।

प्रत्येक saved visit एक `attendance.recorded` webhook भी उत्सर्जित करता है। read side, `GET /attendance/visits/checkin`, लोगों के **last logged date** से उनकी visits लौटाता है — यदि वह एक पिछले सप्ताह था तो ids को strip किया जाता है, इसलिए क्लाइंट को पिछले सप्ताह के room selections की एक pre-filled copy मिलती है जो नई records के रूप में save होगी।

### चेक-आउट

दो endpoints loop को complete करते हैं (`VisitController`):

- `GET /attendance/visits/code/:code` — आज की not-yet-checked-out visits उस सुरक्षा कोड को ले जा रहीं, sessions के साथ populated।
- `POST /attendance/visits/checkout` — body `{ visitIds, checkedOutBy?, checkedOutById? }`; `checkoutTime` को stamp करता है और कौन picked up करता है, और प्रति visit एक `attendance.checkout` webhook उत्सर्जित करता है।

Permissions: kiosks `attendance.checkin` के साथ authenticate करते हैं, जो सटीक check-in/check-out/label-template सतह को grant करता है; `attendance.view`/`attendance.edit` reporting और manual entry को cover करते हैं; structure (services, service times, group assignments) के लिए `services.edit` की आवश्यकता है।

## समूह कमरे की राउटिंग को चलाते हैं

सिस्टम में कहीं भी कोई कमरे या कक्षा इकाई नहीं है। एक "कमरा" एक membership **group** है जिसमें `trackAttendance` सक्षम है, एक या अधिक सेवा समय से `groupServiceTimes` के माध्यम से जुड़ा हुआ है। group fields (`Api/src/modules/membership/models/Group.ts` पर) जो kiosk behavior को shape करते हैं:

| फील्ड | प्रभाव |
|------|--------|
| `trackAttendance` | Group सभी में attendance में भाग लेता है; B1Admin की setup tree को `trackAttendance` groups के साथ no `groupServiceTimes` row को unassigned के रूप में flag करता है |
| `parentPickup` | एक child room को marks करता है: इसमें check-in करना visit को "child" visit बनाता है, जो परिवार के pickup label को print करता है और nametag पर सुरक्षा कोड को रखता है |
| `printNametag` | क्या इस group के लिए check-ins एक nametag को सब कुछ print करते हैं |
| `capacity` / `guestCapacity` / `checkinClosed` | कमरे की क्षमता सीमाएं और एक hard "closed" switch, server-side द्वारा check-in gate द्वारा enforce किए गए (B1Admin के group settings में "Check-In Capacity" के तहत edited) |
| `volunteerRatio` / `minVolunteers` | Children-per-volunteer अनुपात और न्यूनतम volunteer headcount, church-wide `ratioEnforcement` setting per enforce किया गया |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Age/grade eligibility bounds kiosk-side पर evaluated rooms को highlight या dim करने के लिए |

हर क्लाइंट एक ही तरह से denormalizes करता है (जैसे `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes`, और `GET /membership/groups` को parallel में load करें, फिर प्रत्येक service time के लिए समूहों को एकत्र करें जिनकी `groupServiceTimes` पंक्ति इसे इंगित करती है को `serviceTime.groups` में। वह सरणी वह है जो room picker दिखाता है, group `categoryName` द्वारा organized।

Assignments को B1Admin में group के page से edited किया जाता है (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), और पूरा Campus → Service → Service Time → Group tree को `B1Admin/src/attendance/components/AttendanceSetup.tsx` में visualized किया जाता है `GET /attendance/attendancerecords/tree` के माध्यम से।

:::info
क्योंकि groups एकल सत्य का स्रोत हैं, same group membership kiosk routing को power करता है, B1Admin के group pages में roster-style attendance, और attendance reporting — एक group को service time में assign करना इसे check-in destination बनाने के लिए जरूरी एकमात्र step है।
:::

## बाल सुरक्षा

### चेक-इन प्रकार

हर visit एक `checkinType` को ले जाता है — `member`, `guest`, या `volunteer` (NULL का अर्थ है legacy/member; migration `tools/migrations/attendance/2026-07-03_checkin_type.ts`)। प्रकार को **kiosk-side** चुना जाता है: Member / Guest / Volunteer chips expanded member row पर (`B1Checkin/src/components/MemberServiceTimes.tsx`), completion पर हर pending visit पर stamped (`app/checkinComplete.tsx`, defaulting to `member`)। सर्वर इसे gate में consumes करता है — volunteers capacity के विरुद्ध के बजाय ratio coverage की ओर count करते हैं, और guests `guestCapacity` के विरुद्ध count करते हैं।

### क्षमता और volunteer-ratio gates

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) postCheckin के अंदर किसी भी save से पहले चलता है (endpoint non-transactional है, इसलिए gating-before-save correctness mechanism है)। यह वर्तमान occupancy को प्रति लक्षित group में load करता है (`VisitRepo.countActiveByGroupToday`) और membership module gateway के माध्यम से group config, फिर violations को classify करता है:

- **Hard (हमेशा block):** `checkinClosed`, `current + incoming > capacity`, guest count over `guestCapacity`। batch `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` के साथ reject किया जाता है — कियोस्क named room को दिखाता है।
- **Ratio (warn या block):** एक कमरे में incoming non-volunteers जहां `volunteers < minVolunteers`, कोई volunteers नहीं, या `children > volunteers × volunteerRatio`। Severity per-church setting `ratioEnforcement` (`"warn"` default / `"block"`, B1Admin Manage Church → Check-In में edited, `CheckinSettingsEdit.tsx`) को follow करता है। Warn-mode `409 { warning: true, error: "ratio", … }` return करता है जब तक कि क्लाइंट `acknowledgeWarnings=true` के साथ resubmit न करे — वह resubmit kiosk का staff-confirm override है।

### आयु/grade eligibility (kiosk-side)

कमरे की eligibility advisory UI है, kiosk पर evaluated, सर्वर द्वारा enforce नहीं किया गया। `B1Checkin/src/helpers/EligibilityHelper.ts` एक व्यक्ति के birthdate/grade को group के `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` के विरुद्ध तुलना करता है (grade order: PreK, K, 1–12, Graduated) और `eligible` / `ineligible` / `unknown` return करता है — missing data `unknown` yield करता है और कभी एक कमरे को hide नहीं करता। ages और grades church के **grade promotion date** को compute किए जाते हैं (`gradePromotionDate` setting, `"MM-DD"`, `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx` में edited); कियोस्क इसे `GET /attendance/checkin/settings` से fetch करता है, और `resolveAsOfDate` आज या उससे पहले सबसे recent occurrence को pick करता है। room picker eligible rooms को highlight करता है और ineligible को dim करता है; एक dimmed room को pick करने के लिए staff confirmation की आवश्यकता है।

### विश्वसनीय और अनुमोदित नहीं pickup

Pickup लोग एक membership इकाई हैं, प्रति household: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, optional personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes)। CRUD है `GET /membership/householdpickup/:householdId` (कोई भी authenticated चर्च user, तो kiosks इसे read कर सकते हैं) साथ ही `POST` / `DELETE` `people.edit` से gated। कर्मचारी व्यक्ति page के **Pickup** card पर सूची को manage करते हैं (`B1Admin/src/people/components/PickupPeople.tsx`) — photo, relationship, और एक Trusted/Not Authorized status chip।

चेक-आउट पर (`B1Checkin/app/checkout.tsx`) कियोस्क household के pickup list को load करता है: `trusted` entries को household-adult photo grid के साथ tappable pickup cards के रूप में render किए जाते हैं, और एक free-typed "Other" नाम को fuzzy-matched किया जाता है (Levenshtein, `src/helpers/PickupMatchHelper.ts`) `notAuthorized` entries के विरुद्ध — एक match check-out को एक warning sheet के साथ block करता है और एक staff **Override** बटन। override को visit itself पर logged किया जाता है: यह normal `POST /attendance/visits/checkout` के माध्यम से `checkedOutBy` को `"OVERRIDE: {name}"` के रूप में posts करता है, तो यह attendance record और `attendance.checkout` webhook में lands बजाय एक अलग audit table के।

### माता-पिता को page करें और आपातकालीन प्रसारण

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) दो SMS endpoints को expose करता है:

- `POST /page` — `{ visitId, message }`: एक checked-in बच्चे के guardians को page करता है (kiosk check-out screen, manned mode)।
- `POST /broadcast` — `{ serviceId, message }`: एक सेवा के लिए हर checked-in household के adults को texts करता है (kiosk admin settings, एक type-`EMERGENCY`-to-confirm sheet के पीछे `B1Checkin/app/adminSettings.tsx` में)।

दोनों household adults को membership gateway के माध्यम से resolve करते हैं, फिर **`MessagingModuleGateway.sendBulkText`** को delivery के लिए हाथ करते हैं (`Api/src/shared/modules/MessagingModuleGateway.ts`) — चर्च के configured texting provider में cross-module door (`@churchapps/texting`: TextInChurch, Clearstream, या MutualMinistry; कोई built-in SMS sender नहीं)। gateway एक `sentText` पंक्ति साथ ही per-recipient `deliveryLog` entries को log करता है और 500 recipients पर एक batch को cap करता है; कोई provider configured के बिना यह `no_provider` return करता है, जो कियोस्क "No SMS provider configured" के रूप में surface करता है। controller का `dispatch()` phone numbers को dedupe करता है और people को no mobile या `optedOut` सेट के साथ skip करता है, `{ sent, failed, skippedOptedOut, skippedNoPhone }` return करता है ताकि kiosk दिखा सके कि क्या skip किया गया था।

## कियोस्क (B1Checkin)

Screens `B1Checkin/app/` के तहत expo-router files हैं; cross-screen state एक static `CachedData` class में रहता है (`src/helpers/CachedData.ts`), React state में नहीं।

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Lookup** (`app/lookup.tsx`) — phone द्वारा search करें (`GET /membership/people/search/phone?number=`, last-4 या full) या name द्वारा (`GET /membership/people/search?term=`)। एक match को select करना household को load करता है (`GET /membership/people/household/{householdId}`) और existing visits (`GET /attendance/visits/checkin`), seeding `pendingVisits` को पिछले सप्ताह के selections के साथ।
2. **Household review** (`app/household.tsx`, `src/components/MemberList.tsx`) — प्रत्येक member row एक already-checked-in badge, allergy/`nametagNotes` badge, और उनके current room chips दिखाता है। एक member को expand करना हर service time को एक room button साथ ही Member / Guest / Volunteer check-in-type chips को list करता है (`MemberServiceTimes.tsx`)।
3. **Group assignment** (`app/selectGroup.tsx`) — `serviceTime.groups` से built एक category tree, age/grade-eligible rooms के साथ highlighted और ineligible को staff confirm के पीछे dimmed (देखें [Age/grade eligibility](#agegrade-eligibility-kiosk-side)); एक room को pick करना उस person के pending visit में एक `{ session: { serviceTimeId, groupId } }` visitSession को लिखता है (`src/helpers/VisitSessionHelper.ts`)। "None" इसे clears करता है।
4. **Complete** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` को `pendingVisits` के साथ (प्रत्येक को अपने `checkinType` के साथ stamped), फिर एक printer configured है तो labels को print करता है और lookup पर auto-return करता है। एक `409` capacity response named full/closed room को दिखाता है; एक ratio warning staff confirm को offer करता है जो `acknowledgeWarnings=true` के साथ resubmit करता है।

**चेक-आउट** screen (`app/checkout.tsx`) 4-character सुरक्षा कोड को एक auto-focused input के माध्यम से accept करता है — तो USB/Bluetooth keyboard-wedge barcode scanners कोई camera के बिना काम करते हैं — या एक on-screen keypad का उपयोग करके same alphabet, 4 characters पर auto-submitting। यह कोड को look up करता है, picked up किए जा रहे बच्चों को दिखाता है, और household के **विश्वसनीय pickup लोग** को household adults के photo grid के साथ tappable cards के रूप में present करता है (साथ ही एक "Other" free-text विकल्प जो not-authorized names के विरुद्ध fuzzy-checked है — देखें [विश्वसनीय और अनुमोदित नहीं pickup](#trusted-and-not-authorized-pickup)), फिर picker के नाम/id के साथ `POST /attendance/visits/checkout` को posts करता है। manned mode में screen भी **माता-पिता को page करें** (`POST /attendance/checkin/page`) और एक **सुरक्षा-लेबल reprint** को offer करता है — `reprint()` परिवार के labels को `LabelHelper.getAllLabelsFor(...)` के साथ rebuilds और उन्हें check-in के रूप में same `PrintUI` pipeline के माध्यम से feeds करता है।

Station personality एक AsyncStorage flag है `@StationMode` (`"self"` | `"manned"`, `app/adminSettings.tsx` में toggled)। Manned mode lookup screen पर check-out entry point को add करता है और household screen से per-member profile editing को (`POST /membership/people`)। Kiosk hardening built-in है: एक optional PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) admin और printer screens को gates करता है, admin screen केवल header logo पर 7 rapid taps के माध्यम से खुलता है, और एक idle attract screen (`src/hooks/useInactivityTimer.ts`) परिवार के बीच take over करता है।

## स्व check-in (B1App)

सदस्य b1.church portal से `/mobile/checkin` screen पर check in करते हैं (routed by `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` to `screens/CheckinPage.tsx`)। यह एक logged-in user की आवश्यकता है और kiosk के समान चार steps को walk करता है — services → household → groups → complete — एक ही endpoints के विरुद्ध, `B1App/src/helpers/CheckinHelper.ts` में held state के साथ। kiosk से अंतर: household logged-in user के अपने `householdId` से आता है (कोई search step नहीं), और flow एक confirmation screen पर समाप्त होता है — कोई सुरक्षा कोड display नहीं और कोई लेबल printing नहीं। Types और `ApiHelper`/`ArrayHelper` को `@churchapps/helpers` और `@churchapps/apphelper` से आते हैं; कोई React components B1Admin के साथ shared नहीं हैं।

## Admin-side उपस्थिति (B1Admin)

- **Setup** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) structure tree को render करता है और services create करता है (`ServiceEdit.tsx`) और service times (`ServiceTimeEdit.tsx`)। Campus data membership से `useCampuses()` hook के माध्यम से आता है।
- **Manual attendance** attendance section नहीं, Groups side पर रहता है: `B1Admin/src/groups/components/GroupSessionsTab.tsx` sessions create करता है (`POST /attendance/sessions`) और लोगों को `POST /attendance/visitsessions/log` के माध्यम से present marks करता है, जो उस व्यक्ति और session के लिए visit को find-or-create करता है। Group leaders `attendance.edit` permission के बिना अपने groups के लिए attendance को record कर सकते हैं — controllers `au.leaderGroupIds` को check करते हैं।
- **Reporting** — attendance trend और group attendance server-defined reports हैं (`B1Admin/src/components/reporting/ReportWithFilter.tsx` against ReportingApi); per-person history `GET /attendance/attendancerecords?personId=` है (`B1Admin/src/people/components/PersonAttendance.tsx`)।

## लेबल प्रिंटिंग

### टेम्पलेट और डिजाइनर

चर्च अपने labels को B1Admin में `/mobile/checkin/labels` पर design करते हैं (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, Check-In settings page से पहुंचा गया)। एक template एक `labelTemplates` row है जिसका `content` एक JSON array of blocks है — `text`, `field`, `barcode`, `qrcode`, या `box` — हर एक percent coordinates में positioned font, alignment, symbology (`code39`/`code128`/`qr`) के साथ, और optional visibility conditions (जैसे केवल allergy box को render करें जब `person.nametagNotes` non-empty हो)। दो `labelType`s exist: `nametag` (checked-in person एक पर; fields जैसे `person.displayName`, `sessions`, `securityCode`) और `pickup` (परिवार एक पर; fields जैसे `children`, `childrenAllergies`)। सर्वर एक single default per type per church को enforce करता है (`LabelTemplateController.save`)। डिजाइनर starter templates ship करता है kiosk के bundled labels को mirror करते हुए और sample data के विरुद्ध preview करते हुए।

### Rendering और kiosk पर printing

Check-in completion पर, `B1Checkin/src/helpers/LabelHelper.ts` हर pending visit पर group flags से क्या print करने को decide करता है: `printNametag` groups के लिए nametags, साथ ही एक family pickup label यदि कोई visit एक `parentPickup` group hit हो। check-in response से सुरक्षा कोड child nametags और pickup label पर जाता है; adult nametags कोड के बिना print होते हैं। यदि चर्च को templates हैं, तो `LabelRenderer` (`src/helpers/LabelRenderer.ts`) blocks + एक field context को एक standalone HTML document में turns करता है; अन्यथा bundled HTML labels `B1Checkin/assets/labels/` में placeholder substitution के साथ used हैं।

Barcodes को pure-TypeScript encoders द्वारा inline SVG के रूप में `B1Checkin/src/helpers/barcode.ts` में generate किया जाता है — Code 39 pattern tables और Code 128 (code set B with mod-103 checksum) width tables, साथ ही QR via `qrcode` package के माध्यम से। **ये encoders जानबूझकर B1Admin में duplicate किए गए हैं** (`LabelEditor.tsx` same tables को inlines करता है, code comment में noted) ताकि designer previews kiosk output के लिए pixel-faithful हों; एक change को दूसरे में mirrored होना चाहिए।

Print pipeline (`src/components/PrintUI.tsx`) हर HTML label को एक `WebView` में render करता है, `react-native-view-shot` के माध्यम से इसे JPG में capture करता है, और image URIs को native **printer-helper** Expo module को hand करता है (`B1Checkin/modules/printer-helper/`)। module `scan()`, `checkInit()`, `printUris()`, और status events को expose करता है, दोनों platforms पर brand per provider के साथ:

| Brand | Android | iOS | Notes |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | QL-series network printers (QL-800/810W/820NWB/1100/1110NWB…), die-cut 29×90 labels, the recommended default |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Network discovery + TCP/ZPL image printing |

Printer selection `app/printers.tsx` पर रहता है (network scan `brand~model~ip` entries return करता है; choice AsyncStorage में persist होता है), और `src/helpers/PrinterLog.ts` एक on-device diagnostic log को रखता है kiosk header में एक live status dot के माध्यम से surfaced।

## अतिथि पंजीकरण

दो paths एक व्यक्ति को mid-check-in create करते हैं:

- **कियोस्क पर** — household screen का "Add guest" `B1Checkin/app/addGuest.tsx` को opens करता है, जो पहले existing non-member match के लिए `GET /membership/people/search?term=` को search करता है और अन्यथा एक create करता है `POST /membership/people` के साथ, current household में attach किया गया। guest फिर किसी भी member की तरह group assignment के माध्यम से flows करता है।
- **Self-serve via QR** — जब चर्च setting `enableQRGuestRegistration` पर हो (B1Admin के Check-In settings में configured, `GET /membership/settings/public/{churchId}` से read किया गया), kiosk lookup screen एक QR code को दिखाता है `https://{subdomain}.b1.church/guest-register?serviceId=` को link करता है। वह B1App page (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) एक visiting family को उनके अपने phone पर anonymous `POST /membership/people/guest-register` endpoint के माध्यम से register करने देता है, kiosk line को moving रखते हुए।

## संबंधित पृष्ठ

- [Attendance Endpoints](../api/endpoints/attendance) -- campuses, services, sessions, visits, और visit sessions के लिए पूर्ण REST surface
- [Membership Endpoints](../api/endpoints/membership) -- लोग, घर, और समूह
- [Webhooks](../api/webhooks) -- `session.created`, `attendance.recorded`, और `attendance.checkout` events
- [Module Structure](../api/module-structure) -- कैसे attendance module को server-side organize किया जाता है
