---
title: "Check-Ins"
---

# Check-Ins

<div class="article-intro">

Check-in एक प्रणाली है जिसमें तीन front doors हैं: B1Checkin kiosk ऐप staffed और self-serve stations के लिए, B1App सदस्य पोर्टल के भीतर self check-in, और B1Admin में admin-side उपस्थिति। तीनों समान attendance module को core Api में लिखते हैं, और classroom routing पूरी तरह से Groups द्वारा driven होती है — कोई अलग "locations" या "rooms" entity नहीं है। एक child-safety layer शीर्ष पर बैठती है: per-visit check-in types, server-side capacity और volunteer-ratio gates, kiosk-side age/grade eligibility, trusted-pickup verification at check-out, और parent paging over the church's texting provider। यह पृष्ठ data model, check-in flows, safety layer, और label printing pipeline को map करता है।

</div>

## Overview

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

| Surface | Repo | Stack | Role |
|---------|------|-------|------|
| Kiosk | `B1Checkin` | Expo / React Native, expo-router file routing; EAS builds for Android, Amazon Fire, और iOS; `expo-updates` के माध्यम से OTA updates | Staffed या self-serve station with label printing और verified check-out |
| Self check-in | `B1App` | Next.js (b1.church member portal) | Logged-in सदस्य अपने household को phone से check in करते हैं; कोई printing नहीं |
| Admin | `B1Admin` | React SPA | Service structure को configure करता है, groups को service times में assign करता है, labels को design करता है, manual attendance को record करता है, reports को run करता है |

तीनों `ApiHelper` के माध्यम से एक ही दो API modules को call करते हैं: **MembershipApi** (`/membership`) लोगों, households, और समूहों के लिए; **AttendanceApi** (`/attendance`) नीचे दिए गए सभी चीजों के लिए।

## Data model (`Api/src/modules/attendance`)

| Entity / table | Key fields | Meaning |
|----------------|-----------|---------|
| `campuses` | name, address | यहां deprecated है — campuses को membership module में master किया जाता है (`/membership/campuses`); attendance copy को frozen read-only रखा गया है legacy readers के लिए (`models/Campus.ts`) |
| `services` | campusId, name | एक recurring gathering, उदाहरण के लिए "Sunday Morning" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name | एक service के भीतर एक time slot, उदाहरण के लिए "9:00 AM" (`models/ServiceTime.ts`) |
| `groupServiceTimes` | groupId, serviceTimeId | Join table: कौन से समूह (classrooms) किन service times पर मिलते हैं (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | एक समूह की एक बैठक एक दिन पर — check-in time पर lazily बनाया जाता है (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | एक दिन पर एक व्यक्ति attending (`models/Visit.ts`)। `checkinType` है `member` / `guest` / `volunteer` (NULL = legacy member), kiosk द्वारा set किया गया है और capacity/ratio gates द्वारा consumed किया गया है |
| `visitSessions` | visitId, sessionId | कौन से session(s) एक visit को cover करते हैं — एक बच्चे को दो service times में check in करने को दो rows मिलते हैं (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON blocks) | Designable label layouts (`models/LabelTemplate.ts`) |

### एक completed check-in कैसे persisted है

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) `POST /attendance/visits/checkin?serviceId=&peopleIds=` को handle करता है। Body एक array है `Visit` objects का, प्रत्येक `visitSessions` carry करता है जिनका embedded `session` सिर्फ `(serviceTimeId, groupId)` pair को names करता है। Server फिर:

1. **किसी भी write से पहले capacity और ratios को gate करता है।** `evaluateGates()` → `CheckinGateHelper.evaluate()` प्रत्येक targeted room की capacity, guest capacity, closed flag, और volunteer ratio को current occupancy के विरुद्ध check करता है। postCheckin **transactional नहीं है**, इसलिए gate को पहली save से पहले चलना चाहिए — एक hard violation एक 409 return करता है जो offending room(s) को name करता है और कुछ भी persist नहीं होता है। [Capacity और volunteer-ratio gates](#capacity-और-volunteer-ratio-gates) देखें।
2. **Sessions को lazily resolve करता है।** `getSessionId()` `sessions` row को find या create करता है `(groupId, serviceTimeId, today)` के लिए — session ids को in-process per date cached किया जाता है। नए sessions एक `session.created` webhook emit करते हैं। Loop एक awaited `for..of` है — एक earlier fire-and-forget `forEach(async …)` ने save को race किया था और first-session creation पर NULL sessionIds को लिखा था (fixed; एक code comment पर noted है at the loop)।
3. **दिन के रिकॉर्ड को replace करता है।** किसी भी existing visits के लिए ये लोग आज के service को delete किया जाता है उनके visitSessions के साथ, फिर submitted set को saved किया जाता है। एक परिवार को फिर से check in करना एक idempotent "यह current state है" operation है, एक append नहीं। `?checkDuplicates=true` को pass करने के बजाय `{ duplicates: [personId…] }` को return करता है बिना लिखे, यह कैसे kiosk को overwriting से पहले warn करता है।
4. **प्रति batch एक security code को generate करता है।** `SecurityCodeHelper.generate()` एक 4-character code को alphabet `23456789BCDFGHJKLMNPQRSTVWXYZ` से produce करता है (कोई vowels या ambiguous characters नहीं, इसलिए codes शब्दों को spell नहीं कर सकते या misread नहीं हो सकते)। Server को collision के विरुद्ध retry करता है same church के same-day open visits के विरुद्ध और batch में हर visit पर code को stamp करता है।
5. **`{ streaks, securityCode }` return करता है।** `streaks` personId को consecutive-week attendance count में map करता है; kiosk milestones को celebrate करता है (हर 5वें week) confetti के साथ।

प्रत्येक saved visit भी एक `attendance.recorded` webhook को emit करता है। Read side, `GET /attendance/visits/checkin`, लोगों के visits को उनके **last logged date** से return करता है — यदि वह एक पिछले week था तो ids stripped हैं, इसलिए client को एक pre-filled copy मिलता है last week के room selections का जो नए records के रूप में save होगा।

### Check-out

दो endpoints loop को complete करते हैं (`VisitController`):

- `GET /attendance/visits/code/:code` — आज के not-yet-checked-out visits जो उस security code को carry करते हैं, sessions populated के साथ।
- `POST /attendance/visits/checkout` — body `{ visitIds, checkedOutBy?, checkedOutById? }`; `checkoutTime` को stamp करता है और कौन picked up किया है, और एक `attendance.checkout` webhook को emit करता है प्रत्येक visit के लिए।

Permissions: kiosks को `attendance.checkin` के साथ authenticate करते हैं, जो सटीक check-in/check-out/label-template surface को grant करता है; `attendance.view`/`attendance.edit` reporting और manual entry को cover करते हैं; structure (services, service times, group assignments) को `services.edit` की आवश्यकता होती है। Member self check-in (B1App) को कोई permission की आवश्यकता नहीं है: कोई भी authenticated church user जिसके पास linked person है church में `GET`/`POST /attendance/visits/checkin` को call कर सकता है, और server को submitted `personId`s को restrict करता है caller के own household के लिए (403 अन्यथा — यह fence है जो दूसरे families के `securityCode`s को unreadable रखता है)। Membership grant है; चाहे members feature को see करें यह church के B1App navigation tabs द्वारा controlled होता है। अन्य check-in endpoints (`code/:code`, `checkout`, `guardians`, `CheckinController`) kiosk/staff-only रहते हैं।

## समूह room routing को drive करते हैं

पूरी system में कोई room या classroom entity नहीं है। एक "room" एक membership **group** है जिसमें `trackAttendance` enabled है, एक या अधिक service times के साथ `groupServiceTimes` के माध्यम से linked है। Group fields (on `Api/src/modules/membership/models/Group.ts`) जो kiosk behavior को shape करते हैं:

| Field | Effect |
|------|--------|
| `trackAttendance` | Group attendance में सभी participate करता है; B1Admin के setup tree को `trackAttendance` groups को flag करता है जिनके पास कोई `groupServiceTimes` row नहीं है unassigned के रूप में |
| `parentPickup` | एक child room को marks करता है: इसे check in करने से visit को "child" visit बनाता है, जो family pickup label को print करता है और security code को nametag पर डालता है |
| `printNametag` | चाहे इस group के लिए check-ins को nametag print करें |
| `capacity` / `guestCapacity` / `checkinClosed` | Room capacity limits और एक hard "closed" switch, server-side द्वारा check-in gate द्वारा enforced (B1Admin के group settings में edited है "Check-In Capacity" के तहत) |
| `volunteerRatio` / `minVolunteers` | Children-per-volunteer ratio और minimum volunteer headcount, per the church-wide `ratioEnforcement` setting को enforced किया गया है |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Age/grade eligibility bounds को kiosk-side evaluate किया गया है highlight या dim rooms को |

हर client same way को denormalize करता है (उदाहरण के लिए `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes`, और `GET /membership/groups` को parallel में load करें, फिर प्रत्येक service time के लिए समूहों को collect करें जिनका `groupServiceTimes` row इसे point करता है `serviceTime.groups` में। यह array है जो room picker को show करता है, group `categoryName` द्वारा organized।

Assignments को edit किया जाता है B1Admin में group के page से (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), और पूरा Campus → Service → Service Time → Group tree को `B1Admin/src/attendance/components/AttendanceSetup.tsx` के माध्यम से `GET /attendance/attendancerecords/tree` के माध्यम से visualize किया जाता है।

:::info
क्योंकि groups single source of truth हैं, same group membership kiosk routing, roster-style attendance in B1Admin के group pages, और attendance reporting को power करता है — एक group को service time में assign करना single step है जो required होता है एक check-in destination बनाने के लिए।
:::

## Child safety

### Check-in types

हर visit एक `checkinType` carry करता है — `member`, `guest`, या `volunteer` (NULL का मतलब है legacy/member; migration `tools/migrations/attendance/2026-07-03_checkin_type.ts`)। Type को **kiosk-side** choose किया जाता है: Member / Guest / Volunteer chips expanded member row पर (`B1Checkin/src/components/MemberServiceTimes.tsx`), completion पर प्रत्येक pending visit पर stamped (`app/checkinComplete.tsx`, defaulting को `member`)। Server को gate में consume करता है — volunteers को ratio coverage के लिए count करते हैं capacity के विरुद्ध, और guests को `guestCapacity` के विरुद्ध count करते हैं।

### Capacity और volunteer-ratio gates

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) `postCheckin` के अंदर कोई भी save (endpoint non-transactional है, इसलिए gating-before-save को correctness mechanism है) से पहले run करता है। यह current occupancy को प्रत्येक targeted group के लिए load करता है (`VisitRepo.countActiveByGroupToday`) और group config को membership module gateway के माध्यम से, फिर violations को classify करता है:

- **Hard (always block):** `checkinClosed`, `current + incoming > capacity`, guest count over `guestCapacity`। Batch को `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` के साथ reject करता है — kiosk named room को show करता है।
- **Ratio (warn या block):** incoming non-volunteers को एक room में जहां `volunteers < minVolunteers`, कोई volunteers नहीं, या `children > volunteers × volunteerRatio`। Severity को per-church setting `ratioEnforcement` follow करता है (`"warn"` default / `"block"`, B1Admin Manage Church में edited → Check-In, `CheckinSettingsEdit.tsx`)। Warn-mode को `409 { warning: true, error: "ratio", … }` return करता है जब तक client को resubmit नहीं करता `acknowledgeWarnings=true` के साथ — वह resubmit kiosk का staff-confirm override है।

### Age/grade eligibility (kiosk-side)

Room eligibility advisory UI है, kiosk पर evaluated, server द्वारा enforce नहीं किया गया। `B1Checkin/src/helpers/EligibilityHelper.ts` एक person के birthdate/grade को group के `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` के विरुद्ध compare करता है (grade order: PreK, K, 1–12, Graduated) और `eligible` / `ineligible` / `unknown` return करता है — missing data को `unknown` yield करता है और कभी room को hide नहीं करता है। Ages और grades को church के **grade promotion date** (`gradePromotionDate` setting, `"MM-DD"`, `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx` में edited) के रूप में compute किया जाता है; kiosk को `GET /attendance/checkin/settings` से fetch करता है, और `resolveAsOfDate` आज को या इससे पहले most recent occurrence को pick करता है। Room picker को eligible rooms को highlight करता है और ineligible ones को dim करता है; एक dimmed room को pick करने के लिए staff confirmation की आवश्यकता होती है।

### Trusted और not-authorized pickup

Pickup people एक membership entity है, per household: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, optional personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes)। CRUD है `GET /membership/householdpickup/:householdId` (कोई भी authenticated church user, इसलिए kiosks को read कर सकते हैं) plus `POST` / `DELETE` को `people.edit` द्वारा gated। Staff को person page के **Pickup** card पर list को manage करते हैं (`B1Admin/src/people/components/PickupPeople.tsx`) — photo, relationship, और एक Trusted/Not Authorized status chip।

Check-out पर (`B1Checkin/app/checkout.tsx`) kiosk को household के pickup list को load करता है: `trusted` entries को tappable pickup cards के रूप में render करता है household-adult photo grid के साथ, और एक free-typed "Other" name को fuzzy-match किया जाता है (Levenshtein, `src/helpers/PickupMatchHelper.ts`) के विरुद्ध `notAuthorized` entries — एक match को check-out को एक warning sheet के साथ block करता है और एक staff **Override** बटन। Override को visit पर logged किया जाता है: यह `checkedOutBy` को `"OVERRIDE: {name}"` के रूप में post करता है normal `POST /attendance/visits/checkout` के माध्यम से, इसलिए यह attendance record में और `attendance.checkout` webhook में land करता है बजाय एक अलग audit table के।

### Page-a-parent और emergency broadcast

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) दो SMS endpoints को expose करता है:

- `POST /page` — `{ visitId, message }`: एक checked-in child के guardians को pages करता है (kiosk check-out screen, manned mode)।
- `POST /broadcast` — `{ serviceId, message }`: एक service के लिए हर checked-in household के adults को texts करता है (kiosk admin settings, एक type-`EMERGENCY`-to-confirm sheet के पीछे `B1Checkin/app/adminSettings.tsx` में)।

दोनों household adults को membership gateway के माध्यम से resolve करते हैं, फिर delivery को **`MessagingModuleGateway.sendBulkText`** को (`Api/src/shared/modules/MessagingModuleGateway.ts`) — cross-module door church के configured texting provider में (@churchapps/texting`: TextInChurch, Clearstream, या MutualMinistry; कोई built-in SMS sender नहीं है)। Gateway को एक `sentText` row plus per-recipient `deliveryLog` entries को log करता है और batch को 500 recipients पर cap करता है; कोई provider configured के बिना यह `no_provider` return करता है, जो kiosk को surface करता है "No SMS provider configured" के रूप में। Controller का `dispatch()` phone numbers को dedupes करता है और people को no mobile या `optedOut` set के साथ skip करता है, `{ sent, failed, skippedOptedOut, skippedNoPhone }` return करता है इसलिए kiosk दिखा सकता है क्या skip किया गया था।

## Kiosk (B1Checkin)

Screens हैं expo-router files `B1Checkin/app/` के तहत; cross-screen state एक static `CachedData` class में live होता है (`src/helpers/CachedData.ts`), React state में नहीं।

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Lookup** (`app/lookup.tsx`) — phone द्वारा search करता है (`GET /membership/people/search/phone?number=`, last-4 या full) या name द्वारा (`GET /membership/people/search?term=`)। एक match को select करने पर household को load करता है (`GET /membership/people/household/{householdId}`) और existing visits (`GET /attendance/visits/checkin`), `pendingVisits` को last week के selections के साथ seed करता है।
2. **Household review** (`app/household.tsx`, `src/components/MemberList.tsx`) — हर member row एक already-checked-in badge, allergy/`nametagNotes` badge, और उनके current room chips को show करता है। एक member को expand करने से हर service time को एक room button plus Member / Guest / Volunteer check-in-type chips (`MemberServiceTimes.tsx`) के साथ list करता है। हर service time name के तहत, `ServiceTimeHelper.getGroupSummary()` को offered groups को show करता है (the `serviceTime.groups` names, trimmed, de-duplicated case-insensitively, comma-joined); कुछ भी render नहीं करता है जब time के पास कोई groups नहीं होते हैं।
3. **Group assignment** (`app/selectGroup.tsx`) — `serviceTime.groups` से built एक category tree, age/grade-eligible rooms को highlight किया गया है और ineligible ones को staff confirm के पीछे dim किया गया है ([Age/grade eligibility](#agegrade-eligibility-kiosk-side) देखें); एक room को pick करने से `{ session: { serviceTimeId, groupId } }` visitSession को उस व्यक्ति के pending visit में write करता है (`src/helpers/VisitSessionHelper.ts`)। "None" को यह clear करता है।
4. **Complete** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` के साथ `pendingVisits` (प्रत्येक अपनी `checkinType` के साथ stamped), फिर labels को print करता है यदि printer configured है और auto-return lookup के लिए। एक `409` capacity response full/closed room को named करता है; एक ratio warning staff को confirm करता है कि जो `acknowledgeWarnings=true` के साथ resubmit करता है।

**Check-out screen** (`app/checkout.tsx`) को 4-character security code को एक auto-focused input के माध्यम से accept करता है — इसलिए USB/Bluetooth keyboard-wedge barcode scanners बिना camera के काम करते हैं — या एक on-screen keypad को same alphabet का उपयोग करके, 4 characters पर auto-submitting। एक **Scan** बटन एक sheet को open करता है shared `src/components/CodeScanner.tsx` camera के साथ (back-facing by default, QR, Code 128, और Code 39 को accepting) इसलिए stations बिना wedge scanner के code को scan कर सकते हैं; scanned code को typed input के same `handleCode()` path में feed करता है। यह code को look up करता है, picked up किए जा रहे children को show करता है, और household के **trusted pickup people** को present करता है tappable cards के रूप में household adults के photo grid के साथ (plus एक "Other" free-text option जो not-authorized names के विरुद्ध fuzzy-checked होता है — [Trusted और not-authorized pickup](#trusted-और-not-authorized-pickup) देखें), फिर `POST /attendance/visits/checkout` को picker के name/id के साथ posts करता है। Manned mode में screen भी **Page a parent** (`POST /attendance/checkin/page`) और एक **security-label reprint** को offer करता है — `reprint()` को family के labels को rebuild करता है `LabelHelper.getAllLabelsFor(...)` के साथ और same `PrintUI` pipeline के माध्यम से feed करता है check-in के रूप में।

Station personality एक AsyncStorage flag है `@StationMode` (`"self"` | `"manned"`, `app/adminSettings.tsx` में toggled)। Manned mode को check-out entry point को lookup screen पर add करता है और per-member profile editing को household screen से (`POST /membership/people`)। Kiosk hardening built-in है: एक optional PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) gates admin और printer screens, admin screen केवल header logo पर 7 rapid taps के माध्यम से opens, और एक idle attract screen (`src/hooks/useInactivityTimer.ts`) families के बीच take over करता है।

## Self check-in (B1App)

सदस्य b1.church portal से `/mobile/checkin` screen पर check in करते हैं (routed by `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` को `screens/CheckinPage.tsx`)। यह एक logged-in user की आवश्यकता होती है और same चार steps को kiosk को विरुद्ध करता है — services → household → groups → complete — identical endpoints के विरुद्ध, state को `B1App/src/helpers/CheckinHelper.ts` में held के साथ। Kiosk से differences: household logged-in user के own `householdId` से आता है (कोई search step नहीं), और कोई label printing नहीं है — instead completion screen batch के security code को एक QR (`qrcode.react`) के रूप में show करता है एक "show this at a check-in station" hint के साथ। यदि household पहले से ही check in है जब page को load करता है, एक "Show check-in code" button QR को re-display करता है पहली existing visit (`GET /attendance/visits/checkin`) से जो एक `securityCode` को carry करता है। Check-in को immediately submit time पर record किया जाता है (कोई pending state नहीं है); QR केवल label printing को kiosk पर drive करता है।

**Phone-to-kiosk label printing** (`B1Checkin/app/scan.tsx`, lookup screen पर "Scan code" button से reached): kiosk को `CodeScanner` (`एक `expo-camera` `CameraView`, front-facing by default, flippable) scan करने वाले को show करता है QR codes के लिए। `ScanCodeHelper.parse()` एक payload को केवल accept करता है जब यह एक bare 4-character code है security-code alphabet में, और `ScanCodeHelper.isRepeat()` same code को 4 seconds के लिए ignore करता है, इसलिए both B1App QR और एक printed label का QR block काम करता है। Screen फिर check-out reprint path को follow करता है — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — और lookup को return करता है। कोई attendance write नहीं होता है scan time पर; केवल labels। Codes के साथ नहीं active visits, stations के बिना printer, और label-less groups प्रत्येक toast को surface करता है और lookup को return करता है।

Types और `ApiHelper`/`ArrayHelper` को `@churchapps/helpers` और `@churchapps/apphelper` से आते हैं; कोई React components को B1Admin के साथ share नहीं किया जाता है।

## Admin-side attendance (B1Admin)

- **Setup** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) structure tree को render करता है और services को create करता है (`ServiceEdit.tsx`) और service times (`ServiceTimeEdit.tsx`)। Campus data को membership से `useCampuses()` hook के माध्यम से आता है।
- **Manual attendance** समूह side पर lives, attendance section पर नहीं: `B1Admin/src/groups/components/GroupSessionsTab.tsx` sessions को create करता है (`POST /attendance/sessions`; जब adding करता है, `SessionEdit.tsx` को chosen service time को share करने के लिए एक session प्रति दूसरे समूह को include कर सकता है, समूहों को skip करके जिनके पास उस दिन पर already एक session है) और लोगों को `POST /attendance/visitsessions/log` के माध्यम से present को mark करता है, जो visit को उस व्यक्ति और session के लिए find-or-creates करता है। समूह नेताओं को अपने own समूहों के लिए attendance को record कर सकते हैं बिना `attendance.edit` अनुमति के — controllers को `au.leaderGroupIds` को check करते हैं।
- **Reporting** — attendance trend और group attendance server-defined reports हैं (`B1Admin/src/components/reporting/ReportWithFilter.tsx` against ReportingApi; definitions in `Api/reports/*.json`)। दोनों को `startDate`/`endDate` लेते हैं (end date inclusive); trend report को one year ago through today को default करता है और एक per-week `sessionDates` column को add करता है, और group attendance के on-screen tree को include करता है हर visit के `checkinTime` और person के `membershipStatus`। Group attendance का CSV को companion `groupAttendanceDownload` report से आता है, `GroupAttendanceDownloadHelper` द्वारा pivoted एक row per group member के साथ एक present/absent column per dated session; per-person history है `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`)।

## Label printing

### Templates और designer

Churches को B1Admin में `/mobile/checkin/labels` पर own labels को design करते हैं (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, Check-In settings page से reached)। एक template एक `labelTemplates` row है जिसका `content` एक JSON array है blocks का — `text`, `field`, `barcode`, `qrcode`, या `box` — प्रत्येक positioned percent coordinates में font, alignment, symbology (`code39`/`code128`/`qr`), और optional visibility conditions (उदाहरण के लिए केवल render करना allergy box जब `person.nametagNotes` non-empty है)। दो `labelType`s exist: `nametag` (एक per checked-in person; fields जैसे `person.displayName`, `sessions`, `securityCode`, और `person.isBirthdayWeek` -- `"true"` जब birthday का month/day today के 3 days के भीतर है, year end को wrap करके, computed by `LabelHelper.isBirthdayWithin()`) और `pickup` (एक per family; fields जैसे `children`, `childrenAllergies`)। Server को एक single default per type per church को enforce करता है (`LabelTemplateController.save`)। Designer को starter templates को ship करता है kiosk के bundled labels को mirror करते हुए और sample data के विरुद्ध preview करता है।

### Kiosk पर rendering और printing

Check-in completion पर, `B1Checkin/src/helpers/LabelHelper.ts` decide करता है क्या print करना है हर pending visit पर group flags से: nametags के लिए `printNametag` समूह, plus एक family pickup label यदि कोई visit को एक `parentPickup` समूह में hit किया है। Visits के साथ `checkinType` `volunteer` को `LabelHelper.selectChildVisits()` द्वारा skip किया जाता है, इसलिए एक child care worker Parent Pickup room में कभी pickup label को trigger नहीं करता है। यदि church को templates हैं, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) blocks + एक field context को एक standalone HTML document में turn करता है; अन्यथा bundled HTML labels in `B1Checkin/assets/labels/` को placeholder substitution के साथ use किया जाता है।

Barcodes को pure-TypeScript encoders (`B1Checkin/src/helpers/barcode.ts`) से inline SVG से generate किया जाता है — Code 39 pattern tables और Code 128 (code set B with mod-103 checksum) width tables, plus QR via the `qrcode` package। **ये encoders intentionally duplicated हैं B1Admin में** (`LabelEditor.tsx` को same tables inline करता है, एक code comment में noted) इसलिए designer previews को pixel-faithful होते हैं kiosk output के लिए; एक change को दोनों में mirror किया जाना चाहिए।

Print pipeline (`src/components/PrintUI.tsx`) हर HTML label को एक `WebView` में render करता है, यह को JPG में capture करता है `react-native-view-shot` के माध्यम से, और image URIs को native **printer-helper** Expo module को (`B1Checkin/modules/printer-helper/`) hand करता है। Module को `scan()`, `checkInit()`, `printUris()`, और status events को expose करता है, brand दोनों platforms पर एक provider के साथ:

| Brand | Android | iOS | Notes |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | QL-series network printers (QL-800/810W/820NWB/1100/1110NWB…), die-cut 29×90 labels, recommended default |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Network discovery + TCP/ZPL image printing |

Printer selection को `app/printers.tsx` पर live करता है (network scan को return करता है `brand~model~ip` entries; choice को AsyncStorage में persist होता है), और `src/helpers/PrinterLog.ts` एक on-device diagnostic log को keep करता है kiosk header में एक live status dot के माध्यम से surfaced।

## Guest registration

दो paths एक check-in के दौरान mid एक व्यक्ति को create करते हैं:

- **Kiosk पर** — household screen के "Add guest" को `B1Checkin/app/addGuest.tsx` को open करता है, जो पहले `GET /membership/people/search?term=` के लिए एक existing non-member match को search करता है और अन्यथा एक को create करता है `POST /membership/people` के साथ, current household को attached। Guest फिर group assignment को like any member को flow करता है।
- **Self-serve via QR** — जब church setting `enableQRGuestRegistration` पर है (B1Admin में Check-In settings में configured, `GET /membership/settings/public/{churchId}` से read), kiosk lookup screen एक QR code को show करता है `https://{subdomain}.b1.church/guest-register?serviceId=` को linking करके। वह B1App page (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) एक visiting family को उनके own phone के माध्यम से register करने देता है anonymous `POST /membership/people/guest-register` endpoint के माध्यम से, kiosk line को moving रखते हुए। QR sheet को भी एक **Register here** बटन है जो same page को kiosk पर (`app/guestRegister.tsx`) एक incognito, cache-disabled `WebView` में open करता है; `src/helpers/GuestRegisterHelper.ts` दोनों QR और WebView के लिए URL को build करता है और `https://{subdomain}.b1.church/guest-register` के off को navigation को block करता है। Screen को **Done**, back, या 120 seconds पर inactivity पर pop करता है (form typing को WebView से relayed किया जाता है activity के रूप में), WebView को unmount करता है इसलिए एक family के entries कभी नहीं next को reach करते हैं।

## संबंधित पृष्ठ

- [Attendance Endpoints](../api/endpoints/attendance) -- campuses, services, sessions, visits, और visit sessions के लिए Full REST surface
- [Membership Endpoints](../api/endpoints/membership) -- लोग, households, और समूह
- [Webhooks](../api/webhooks) -- the `session.created`, `attendance.recorded`, और `attendance.checkout` events
- [Module Structure](../api/module-structure) -- attendance module को server-side पर कैसे organize किया जाता है
