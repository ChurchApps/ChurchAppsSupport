---
title: "Check-Ins"
---

# Check-Ins

<div class="article-intro">

Check-in एक system है जिसके तीन front doors हैं: staffed और self-serve stations के लिए B1Checkin kiosk app, B1App member portal के अंदर self check-in, और B1Admin में admin-side attendance। तीनों core Api में same attendance module को write करते हैं, और classroom routing पूरी तरह से Groups द्वारा driven होता है — कोई separate "locations" या "rooms" entity नहीं है। एक child-safety layer top पर बैठता है: per-visit check-in types, server-side capacity और volunteer-ratio gates, kiosk-side age/grade eligibility, check-out पर trusted-pickup verification, और church के texting provider पर parent paging। यह page data model, check-in flows, safety layer, और label printing pipeline को map करता है।

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

| Surface | Repo | Stack | Role |
|---------|------|-------|------|
| Kiosk | `B1Checkin` | Expo / React Native, expo-router file routing; EAS builds for Android, Amazon Fire, और iOS; `expo-updates` via OTA updates | Staffed या self-serve station जिसमें label printing और verified check-out हो |
| Self check-in | `B1App` | Next.js (b1.church member portal) | Logged-in members अपने household को एक phone से check करते हैं; कोई printing नहीं |
| Admin | `B1Admin` | React SPA | Service structure को configure करता है, groups को service times को assign करता है, labels design करता है, manual attendance record करता है, reports run करता है |

तीनों `ApiHelper` के through same दो API modules को call करते हैं: **MembershipApi** (`/membership`) people, households, और groups के लिए; **AttendanceApi** (`/attendance`) बाकी सब के लिए।

## Data model (`Api/src/modules/attendance`)

| Entity / table | Key fields | Meaning |
|---|---|---|
| `campuses` | name, address | Deprecated here — campuses membership module में master किए जाते हैं (`/membership/campuses`); attendance copy frozen read-only है legacy readers के लिए (`models/Campus.ts`) |
| `services` | campusId, name | एक recurring gathering, उदाहरण के लिए "Sunday Morning" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name | एक service के अंदर एक time slot, उदाहरण के लिए "9:00 AM" (`models/ServiceTime.ts`) |
| `groupServiceTimes` | groupId, serviceTimeId | Join table: कौन से groups (classrooms) किन service times पर meet करते हैं (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | एक group की एक meeting एक date पर — lazily created check-in time पर (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | एक date पर एक person attending (`models/Visit.ts`)। `checkinType` है `member` / `guest` / `volunteer` (NULL = legacy member), kiosk द्वारा set और capacity/ratio gates द्वारा consumed |
| `visitSessions` | visitId, sessionId | कौन से session(s) एक visit cover करता है — एक child दो service times को check in करने पर दो rows मिलते हैं (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON blocks) | Designable label layouts (`models/LabelTemplate.ts`) |

### एक completed check-in कैसे persisted होता है

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) `POST /attendance/visits/checkin?serviceId=&peopleIds=` को handle करता है। Body एक array of `Visit` objects है, जिसमें प्रत्येक `visitSessions` carry करता है जिसका embedded `session` केवल एक `(serviceTimeId, groupId)` pair को name करता है। Server फिर:

1. **किसी भी write से पहले capacity और ratios को gate करता है।** `evaluateGates()` → `CheckinGateHelper.evaluate()` प्रत्येक targeted room की capacity, guest capacity, closed flag, और volunteer ratio को current occupancy के विरुद्ध check करता है। postCheckin non-transactional है, इसलिए gate को first save से पहले run करना चाहिए — एक hard violation `409` return करता है offending room(s) को naming करते हुए और कुछ भी persist नहीं होता है। [Capacity और volunteer-ratio gates](#capacity-and-volunteer-ratio-gates) देखें।

2. **Lazily sessions को resolve करता है।** `getSessionId()` `sessions` row को find या create करता है `(groupId, serviceTimeId, today)` के लिए — session ids को per-date in-process cache किया जाता है। New sessions एक `session.created` webhook emit करते हैं। Loop एक awaited `for..of` है — एक earlier fire-and-forget `forEach(async …)` ने save को race किया और first-session creation पर NULL sessionIds को write किया (fixed; loop में एक code comment पर noted)।

3. **Day के records को replace करता है।** उन लोगों के लिए existing visits उस service पर आज delete किए जाते हैं उनके visitSessions के साथ, फिर submitted set saved किया जाता है। एक family को re-checking-in करना इसलिए एक idempotent "यह current state है" operation है, append नहीं। `?checkDuplicates=true` passing के बजाय `{ duplicates: [personId…] }` return करता है बिना लिखे, जो है कैसे kiosk overwriting से पहले warn करता है।

4. **Batch per एक security code generate करता है।** `SecurityCodeHelper.generate()` alphabet से एक 4-character code produce करता है `23456789BCDFGHJKLMNPQRSTVWXYZ` (कोई vowels या ambiguous characters नहीं, ताकि codes शब्द spell न कर सकें या misread न हों)। Server same-day open visits के against collision पर retry करता है और batch में हर visit पर code stamp करता है।

5. **`{ streaks, securityCode }` return करता है।** `streaks` personId को consecutive-week attendance count में map करता है; kiosk milestones (हर 5वें week) को confetti से celebrate करता है।

प्रत्येक saved visit एक `attendance.recorded` webhook भी emit करता है। Read side, `GET /attendance/visits/checkin`, लोगों के visits return करता है उनके **last logged date** से — यदि वह एक पिछले week था तो ids stripped होते हैं, तो client एक pre-filled copy receive करता है जो last week के room selections का जो save होगा new records के रूप में।

### Check-out

दो endpoints loop को complete करते हैं (`VisitController`):

- `GET /attendance/visits/code/:code` — आज के not-yet-checked-out visits जिनमें वह security code है, sessions populated के साथ।
- `POST /attendance/visits/checkout` — body `{ visitIds, checkedOutBy?, checkedOutById? }`; `checkoutTime` stamp करता है और कौन pick up करता है, और per-visit एक `attendance.checkout` webhook emit करता है।

अनुमतियां: kiosks `attendance.checkin` के साथ authenticate करते हैं, जो exactly check-in/check-out/label-template surface को grant करता है; `attendance.view`/`attendance.edit` reporting और manual entry को cover करते हैं; structure (services, service times, group assignments) को `services.edit` की आवश्यकता है। Member self check-in (B1App) को कोई permission की आवश्यकता नहीं है: church में एक linked person वाला कोई भी authenticated user `GET`/`POST /attendance/visits/checkin` को call कर सकता है, और server submitted `personId`s को caller के own household तक restrict करता है (अन्यथा 403 — यह fence ही है जो अन्य families के `securityCode`s को unreadable रखता है)। Membership grant है; कि क्या members feature को see करते हैं church के B1App navigation tabs द्वारा controlled होता है। अन्य check-in endpoints (`code/:code`, `checkout`, `guardians`, `CheckinController`) kiosk/staff-only रहती हैं।

## Groups room routing को drive करते हैं

System में कोई room या classroom entity नहीं है। एक "room" एक membership **group** है `trackAttendance` enabled के साथ, `groupServiceTimes` के through एक या अधिक service times से linked। Group fields (`Api/src/modules/membership/models/Group.ts` पर) जो kiosk behavior को shape करते हैं:

| Field | Effect |
|---|---|
| `trackAttendance` | Group सब पर attendance में participate करता है; B1Admin setup tree को `trackAttendance` groups को flag करता है जिनके कोई `groupServiceTimes` row नहीं है unassigned के रूप में |
| `parentPickup` | एक child room को mark करता है: इसे check in करने से visit एक "child" visit बनता है, जो एक family pickup label print करता है और security code को nametag पर रखता है |
| `printNametag` | क्या check-ins इस group को नametag बिल्कुल print करते हैं |
| `capacity` / `guestCapacity` / `checkinClosed` | Room capacity limits और एक hard "closed" switch, server-side द्वारा check-in gate द्वारा enforced (B1Admin group settings में "Check-In Capacity" के तहत edited) |
| `volunteerRatio` / `minVolunteers` | Children-per-volunteer ratio और minimum volunteer headcount, church-wide `ratioEnforcement` setting के per enforced |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Age/grade eligibility bounds kiosk-side evaluated highlight या dim rooms के लिए |

हर client same way denormalize करता है (उदाहरण के लिए `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): parallel में `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes`, और `GET /membership/groups` को load करें, फिर हर service time के लिए groups को collect करें जिनकी `groupServiceTimes` row इसे point करती है `serviceTime.groups` में। यह array है जो room picker show करता है, group `categoryName` द्वारा organized।

Assignments को B1Admin में group page से edit किया जाता है (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), और पूरे Campus → Service → Service Time → Group tree को `B1Admin/src/attendance/components/AttendanceSetup.tsx` में `GET /attendance/attendancerecords/tree` के via visualized होता है।

:::info
क्योंकि groups single source of truth हैं, same group membership kiosk routing, roster-style attendance को B1Admin group pages में, और attendance reporting को power करता है — एक group को service time के लिए assign करना single step है जो इसे check-in destination बनाने के लिए आवश्यक है।
:::

## Child safety

### Check-in types

हर visit एक `checkinType` carry करता है — `member`, `guest`, या `volunteer` (NULL का मतलब legacy/member; migration `tools/migrations/attendance/2026-07-03_checkin_type.ts`)। Type को **kiosk-side चुना जाता है**: Member / Guest / Volunteer chips expanded member row पर (`B1Checkin/src/components/MemberServiceTimes.tsx`), completion पर pending visit के लिए stamp किया जाता है (`app/checkinComplete.tsx`, defaulting `member` को)। Server इसे gate में consume करता है — volunteers capacity के बजाय ratio coverage की ओर count करते हैं, और guests `guestCapacity` के विरुद्ध count करते हैं।

### Capacity और volunteer-ratio gates

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) postCheckin के अंदर कोई save से पहले run होता है (endpoint non-transactional है, तो gating-before-save correctness mechanism है)। यह current occupancy को targeted group के per load करता है (`VisitRepo.countActiveByGroupToday`) और group config को membership module gateway के through, फिर violations को classify करता है:

- **Hard (हमेशा block):** `checkinClosed`, `current + incoming > capacity`, guest count over `guestCapacity`। Batch को `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` के साथ reject किया जाता है — kiosk named room को दिखाता है।
- **Ratio (warn या block):** incoming non-volunteers एक room में जहां `volunteers < minVolunteers`, कोई volunteers नहीं, या `children > volunteers × volunteerRatio`। Severity per-church setting `ratioEnforcement` को follow करती है (`"warn"` default / `"block"`, B1Admin Manage Church → Check-In में edited, `CheckinSettingsEdit.tsx`)। Warn-mode `409 { warning: true, error: "ratio", … }` return करता है जब तक client resubmit नहीं करता `acknowledgeWarnings=true` के साथ — वह resubmit kiosk का staff-confirm override है।

### Age/grade eligibility (kiosk-side)

Room eligibility advisory UI है, kiosk पर evaluated, server द्वारा enforced नहीं। `B1Checkin/src/helpers/EligibilityHelper.ts` एक person की birthdate/grade को group के `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` के विरुद्ध compare करता है (grade order: PreK, K, 1–12, Graduated) और `eligible` / `ineligible` / `unknown` return करता है — missing data `unknown` yield करता है और कभी room को hide नहीं करता है। Ages और grades को church के **grade promotion date** (`gradePromotionDate` setting, `"MM-DD"`, `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx` में edited) के रूप में compute किया जाता है; kiosk `GET /attendance/checkin/settings` से fetch करता है, और `resolveAsOfDate` today के on या before का most recent occurrence pick करता है। Room picker eligible rooms को highlight करता है और ineligible ones को dim करता है; एक dimmed room pick करना एक staff confirmation को require करता है।

### Trusted और not-authorized pickup

Pickup people एक membership entity हैं, per household: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, optional personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes)। CRUD है `GET /membership/householdpickup/:householdId` (कोई authenticated church user, ताकि kiosks इसे read कर सकें) plus `POST` / `DELETE` `people.edit` द्वारा gated। Staff person page के **Pickup** card पर list को manage करते हैं (`B1Admin/src/people/components/PickupPeople.tsx`) — photo, relationship, और एक Trusted/Not Authorized status chip।

Check-out पर (`B1Checkin/app/checkout.tsx`) kiosk household के pickup list को load करता है: `trusted` entries household-adult photo grid के साथ-साथ tappable pickup cards के रूप में render होते हैं, और एक free-typed "Other" नाम को fuzzy-matched किया जाता है (Levenshtein, `src/helpers/PickupMatchHelper.ts`) `notAuthorized` entries के विरुद्ध — एक match check-out को warning sheet के साथ block करता है और एक staff **Override** button। Override logged होता है visit पर ही: यह `checkedOutBy` को `"OVERRIDE: {name}"` के रूप में post करता है normal `POST /attendance/visits/checkout` के through, तो यह attendance record में land करता है और `attendance.checkout` webhook के बजाय एक separate audit table।

### Page-a-parent और emergency broadcast

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) दो SMS endpoints को expose करता है:

- `POST /page` — `{ visitId, message }`: एक checked-in child के guardians को page करता है (kiosk check-out screen, manned mode)।
- `POST /broadcast` — `{ serviceId, message }`: एक service के सभी checked-in household adults को text करता है (kiosk admin settings, एक type-`EMERGENCY`-to-confirm sheet के behind `B1Checkin/app/adminSettings.tsx` में)।

दोनों household adults को membership gateway के through resolve करते हैं, फिर delivery को **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) को hand करते हैं — church के configured texting provider (`@churchapps/texting`: TextInChurch, Clearstream, या MutualMinistry; कोई built-in SMS sender नहीं) में cross-module door। Gateway एक `sentText` row plus per-recipient `deliveryLog` entries log करता है और एक batch को 500 recipients तक cap करता है; कोई provider configured के बिना यह `no_provider` return करता है, जो kiosk surface करता है "No SMS provider configured"। Controller का `dispatch()` phone numbers को dedupe करता है और people को skip करता है कोई mobile के साथ या `optedOut` set के साथ, `{ sent, failed, skippedOptedOut, skippedNoPhone }` return करता है ताकि kiosk दिखा सके क्या skip किया गया।

## The kiosk (B1Checkin)

Screens expo-router files हैं `B1Checkin/app/` के अंदर; cross-screen state एक static `CachedData` class में lives (`src/helpers/CachedData.ts`), React state में नहीं।

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Lookup** (`app/lookup.tsx`) — phone द्वारा search करता है (`GET /membership/people/search/phone?number=`, last-4 या full) या नाम द्वारा (`GET /membership/people/search?term=`)। एक match को select करने से household load होता है (`GET /membership/people/household/{householdId}`) और existing visits (`GET /attendance/visits/checkin`), `pendingVisits` को last week के selections से seed करते हुए।

2. **Household review** (`app/household.tsx`, `src/components/MemberList.tsx`) — प्रत्येक member row एक already-checked-in badge, allergy/`nametagNotes` badge, और उनके current room chips दिखाता है। एक member को expand करने से हर service time को एक room button plus Member / Guest / Volunteer check-in-type chips के साथ list किया जाता है (`MemberServiceTimes.tsx`)।

3. **Group assignment** (`app/selectGroup.tsx`) — एक category tree built `serviceTime.groups` से, age/grade-eligible rooms को highlight किया गया और ineligible ones dimmed के पीछे staff confirm; एक room pick करना एक `{ session: { serviceTimeId, groupId } }` visitSession को उस person के pending visit में write करता है (`src/helpers/VisitSessionHelper.ts`)। "None" इसे clear करता है।

4. **Complete** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` `pendingVisits` के साथ (प्रत्येक अपने `checkinType` के साथ stamp किया गया), फिर labels print करता है यदि printer configured है और auto-return lookup को करता है। एक `409` capacity response named full/closed room दिखाता है; एक ratio warning staff confirm offer करता है जो `acknowledgeWarnings=true` के साथ resubmit करता है।

**Check-out** screen (`app/checkout.tsx`) एक auto-focused input के through 4-character security code को accept करता है — तो USB/Bluetooth keyboard-wedge barcode scanners कोई camera के बिना काम करते हैं — या same alphabet का उपयोग करके एक on-screen keypad, 4 characters पर auto-submitting। यह code को look up करता है, picked up किए जा रहे children को दिखाता है, और household के **trusted pickup people** को tappable cards के रूप में present करता है household adults के photo grid के साथ-साथ (plus एक "Other" free-text option जो not-authorized names के विरुद्ध fuzzy-checked होता है — [Trusted और not-authorized pickup](#trusted-and-not-authorized-pickup) देखें), फिर picker के नाम/id के साथ `POST /attendance/visits/checkout` को posts करता है। Manned mode में screen भी **Page a parent** offer करता है (`POST /attendance/checkin/page`) और एक **security-label reprint** — `reprint()` family के labels को rebuild करता है `LabelHelper.getAllLabelsFor(...)` के साथ और उन्हें same `PrintUI` pipeline के through feed करता है check-in के रूप में।

Station personality एक AsyncStorage flag है `@StationMode` (`"self"` | `"manned"`, `app/adminSettings.tsx` में toggled)। Manned mode lookup screen पर check-out entry point और household screen से per-member profile editing को add करता है (`POST /membership/people`)। Kiosk hardening built in है: एक optional PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) admin और printer screens को gates करता है, admin screen केवल header logo पर 7 rapid taps के via opens होता है, और एक idle attract screen (`src/hooks/useInactivityTimer.ts`) families के बीच take over होता है।

## Self check-in (B1App)

Members b1.church portal पर `/mobile/checkin` screen से check in करते हैं (`B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` द्वारा routed `screens/CheckinPage.tsx` को)। यह एक logged-in user को require करता है और kiosk के समान चार steps को walk करता है — services → household → groups → complete — identical endpoints के विरुद्ध, state को `B1App/src/helpers/CheckinHelper.ts` में held। Kiosk से विभिन्नताएं: household logged-in user के own `householdId` से come करता है (कोई search step नहीं), और कोई label printing नहीं — completion screen के बजाय batch के security code को एक QR के रूप में show करता है (`qrcode.react`) एक "show this को एक check-in station में" hint के साथ। यदि household submit time पर already checked in है, एक "Show check-in code" button existing visit के `securityCode` से QR को re-display करता है। Check-in immediate submit time पर record किया जाता है (कोई pending state नहीं); QR केवल kiosk पर label printing को drive करता है।

**Phone-to-kiosk label printing** (`B1Checkin/app/scan.tsx`, lookup screen पर "Scan code" button से reached): kiosk एक `expo-camera` `CameraView` को open करता है (front-facing by default, flippable) QR codes के लिए scan करता हुआ। एक scanned payload accept किया जाता है जब यह एक bare 4-character code है security-code alphabet में, तो दोनों B1App QR और printed label का QR block काम करते हैं। Screen फिर check-out reprint path को follow करता है — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — और lookup को return करता है। कोई attendance write scan time पर नहीं होता; labels-only। Codes कोई active visits के साथ, stations कोई printer के साथ, और label-less groups प्रत्येक एक toast surface करते हैं और lookup को return करते हैं।

Types और `ApiHelper`/`ArrayHelper` `@churchapps/helpers` और `@churchapps/apphelper` से come करते हैं; कोई React components B1Admin के साथ shared नहीं हैं।

## Admin-side attendance (B1Admin)

- **Setup** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) structure tree को render करता है और services (`ServiceEdit.tsx`) और service times (`ServiceTimeEdit.tsx`) को creates करता है। Campus data membership से `useCampuses()` hook के via आता है।
- **Manual attendance** attendance side पर नहीं lives, Groups side पर: `B1Admin/src/groups/components/GroupSessionsTab.tsx` sessions create करता है (`POST /attendance/sessions`) और लोगों को `POST /attendance/visitsessions/log` के via present mark करता है, जो उस person के लिए visit को find-या-create करता है। Group leaders अपने groups के लिए attendance record कर सकते हैं बिना `attendance.edit` permission के — controllers `au.leaderGroupIds` को check करते हैं।
- **Reporting** — attendance trend और group attendance server-defined reports हैं (`B1Admin/src/components/reporting/ReportWithFilter.tsx` ReportingApi के विरुद्ध); per-person history है `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`)।

## Label printing

### Templates और designer

Churches अपने labels को B1Admin में `/mobile/checkin/labels` पर design करते हैं (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, Check-In settings page से reached)। एक template एक `labelTemplates` row है जिसका `content` एक JSON array of blocks है — `text`, `field`, `barcode`, `qrcode`, या `box` — प्रत्येक percent coordinates में positioned जिसमें font, alignment, symbology (`code39`/`code128`/`qr`), और optional visibility conditions हों (उदाहरण के लिए केवल allergy box render करें जब `person.nametagNotes` non-empty हो)। दो `labelType`s exist: `nametag` (एक per checked-in person; fields जैसे `person.displayName`, `sessions`, `securityCode`) और `pickup` (एक per family; fields जैसे `children`, `childrenAllergies`)। Server एक single default को per type enforce करता है per church (`LabelTemplateController.save`)। Designer bundled labels को mirror करने वाले starter templates को ship करता है और sample data के विरुद्ध preview करता है।

### Kiosk पर rendering और printing

Check-in completion पर, `B1Checkin/src/helpers/LabelHelper.ts` decide करता है प्रत्येक pending visit पर group flags से क्या print करना है: `printNametag` groups के लिए nametags, plus एक family pickup label यदि कोई visit `parentPickup` group को hit करता है। Check-in response से security code को child nametags पर जाता है और pickup label पर; adult nametags बिना code print होते हैं। यदि church के templates हैं, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) blocks + एक field context को एक standalone HTML document में turn करता है; अन्यथा bundled HTML labels `B1Checkin/assets/labels/` में placeholder substitution के साथ उपयोग किए जाते हैं।

Barcodes pure-TypeScript encoders द्वारा inline SVG के रूप में generate होते हैं `B1Checkin/src/helpers/barcode.ts` में — Code 39 pattern tables और Code 128 (code set B जिसमें mod-103 checksum है) width tables, plus QR `qrcode` package के via। **ये encoders intentionally B1Admin में duplicate होते हैं** (`LabelEditor.tsx` same tables को inline करता है, एक code comment में noted) ताकि designer previews pixel-faithful हों kiosk output को; एक change को दोनों में mirror किया जाना चाहिए।

Print pipeline (`src/components/PrintUI.tsx`) प्रत्येक HTML label को एक `WebView` में render करता है, `react-native-view-shot` के via JPG में capture करता है, और image URIs को native **printer-helper** Expo module को hand करता है (`B1Checkin/modules/printer-helper/`)। Module `scan()`, `checkInit()`, `printUris()`, और status events को expose करता है, दोनों platforms पर एक provider per brand के साथ:

| Brand | Android | iOS | Notes |
|---|---|---|---|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | QL-series network printers (QL-800/810W/820NWB/1100/1110NWB…), die-cut 29×90 labels, recommended default |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Network discovery + TCP/ZPL image printing |

Printer selection `app/printers.tsx` पर lives (network scan `brand~model~ip` entries return करता है; choice AsyncStorage को persist करता है), और `src/helpers/PrinterLog.ts` एक on-device diagnostic log रखता है kiosk header में एक live status dot के through surfaced।

## Guest registration

Check-in के बीच एक person create करने के दो paths:

- **Kiosk पर** — household screen का "Add guest" `B1Checkin/app/addGuest.tsx` को opens करता है, जो पहले `GET /membership/people/search?term=` के लिए एक existing non-member match को search करता है और अन्यथा `POST /membership/people` के साथ एक create करता है, current household को attach किया जाता है। Guest फिर group assignment के जैसे किसी भी member के रूप में flow करता है।
- **Self-serve via QR** — जब church setting `enableQRGuestRegistration` पर है (B1Admin के Check-In settings में configured, `GET /membership/settings/public/{churchId}` से read), lookup screen एक QR code display करता है `https://{subdomain}.b1.church/guest-register?serviceId=` को linking करता हुआ। वह B1App page (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) एक visiting family को register करने देता है अपने phone पर anonymous `POST /membership/people/guest-register` endpoint के through, kiosk line को moving रखता है।

## संबंधित पृष्ठ

- [Attendance Endpoints](../api/endpoints/attendance) -- Campuses, services, sessions, visits, और visit sessions के लिए पूरी REST surface
- [Membership Endpoints](../api/endpoints/membership) -- People, households, और groups
- [Webhooks](../api/webhooks) -- `session.created`, `attendance.recorded`, और `attendance.checkout` events
- [Module Structure](../api/module-structure) -- Server-side कैसे attendance module organize किया जाता है
