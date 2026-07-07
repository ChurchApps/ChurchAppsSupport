---
title: "Mga Check-In"
---

# Mga Check-In

<div class="article-intro">

Ang check-in ay isang sistema na may tatlong mga pintuan: ang B1Checkin kiosk app para sa staffed at self-serve stations, ang self check-in sa loob ng B1App member portal, at ang admin-side attendance sa B1Admin. Lahat ng tatlo ay nagsusulat sa parehong attendance module sa core Api, at ang classroom routing ay lubos na hinihimok ng Groups — walang hiwalay na "locations" o "rooms" entity. Ang isang child-safety layer ay nakaupo sa itaas: per-visit check-in types, server-side capacity at volunteer-ratio gates, kiosk-side age/grade eligibility, trusted-pickup verification sa check-out, at parent paging sa pamamagit ng texting provider ng church. Ang pahinang ito ay nagsasaad ng data model, ang check-in flows, ang safety layer, at ang label printing pipeline.

</div>

## Pangkalahatang-ideya

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

| Ibabaw | Repo | Stack | Papel |
|---------|------|-------|------|
| Kiosk | `B1Checkin` | Expo / React Native, expo-router file routing; EAS builds para sa Android, Amazon Fire, at iOS; OTA updates sa pamamagit ng `expo-updates` | Staffed o self-serve station na may label printing at verified check-out |
| Self check-in | `B1App` | Next.js (b1.church member portal) | Ang mga naka-log in na miyembro ay nag-check in ng kanilang household mula sa phone; walang printing |
| Admin | `B1Admin` | React SPA | Nag-configure ng service structure, nag-assign ng groups sa service times, nag-design ng labels, nag-record ng manual attendance, tumatakbo ng reports |

Lahat ng tatlo ay tumatawag sa parehong dalawang API modules sa pamamagit ng `ApiHelper`: **MembershipApi** (`/membership`) para sa people, households, at groups; **AttendanceApi** (`/attendance`) para sa lahat ng nasa ibaba.

## Data model (`Api/src/modules/attendance`)

| Entity / table | Key fields | Kahulugan |
|----------------|-----------|---------|
| `campuses` | name, address | Deprecated dito — ang mga campuses ay mastered sa membership module (`/membership/campuses`); ang attendance copy ay naka-freeze read-only para sa legacy readers (`models/Campus.ts`) |
| `services` | campusId, name | Isang recurring gathering, e.g. "Sunday Morning" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name | Isang time slot sa loob ng service, e.g. "9:00 AM" (`models/ServiceTime.ts`) |
| `groupServiceTimes` | groupId, serviceTimeId | Join table: kung aling mga grupo (classrooms) ang nagsasagawa sa kung aling service times (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Isang meeting ng isang grupo sa isang petsa — ginawa ng lazy sa check-in time (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Isang tao na dumalo sa isang petsa (`models/Visit.ts`). Ang `checkinType` ay `member` / `guest` / `volunteer` (NULL = legacy member), itinakda ng kiosk at kina-consume ng capacity/ratio gates |
| `visitSessions` | visitId, sessionId | Kung aling session(s) ang saklaw ng isang visit — isang bata na nag-check in sa dalawang service times ay nakakakuha ng dalawang rows (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON blocks) | Designable label layouts (`models/LabelTemplate.ts`) |

### Kung paano ang completed check-in ay persisted

Ang `VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) ay nag-handle ng `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Ang body ay isang array ng `Visit` objects, bawat isa ay may `visitSessions` na ang embedded `session` ay nagpapangalan lamang ng `(serviceTimeId, groupId)` pair. Ang server ay pagkatapos:

1. **Gates capacity at ratios bago ang anumang write.** Ang `evaluateGates()` → `CheckinGateHelper.evaluate()` ay nag-check ng bawat targeted room's capacity, guest capacity, closed flag, at volunteer ratio laban sa current occupancy. Ang postCheckin ay **hindi transactional**, kaya ang gate ay dapat patakbuhin bago ang unang save — isang hard violation ay nagbabalik ng 409 na nagpapangalan sa offending room(s) at walang iniimbak. Tingnan ang [Capacity and volunteer-ratio gates](#capacity-and-volunteer-ratio-gates).
2. **Resolves sessions nang lazy.** Ang `getSessionId()` ay nakakahanap o lumilikha ng `sessions` row para sa `(groupId, serviceTimeId, today)` — ang session ids ay naka-cache in-process per date. Ang mga bagong session ay naglalabas ng `session.created` webhook. Ang loop ay isang awaited `for..of` — isang mas maaga na fire-and-forget `forEach(async …)` ay nag-race sa save at nagsulat ng NULL sessionIds sa first-session creation (fixed; noted sa code comment sa loop).
3. **Replaces ang day's records.** Ang anumang existing visits para sa mga taong iyon sa service na iyon ngayon ay inilabas kasama ang kanilang visitSessions, pagkatapos ang submitted set ay nagsave. Ang pag-re-check-in ng pamilya ay kaya isang idempotent "ito ang kasalukuyang estado" operation, hindi isang append. Ang pagpasa ng `?checkDuplicates=true` ay bumabalik ng `{ duplicates: [personId…] }` nang hindi nagsusulat, kung paano ang kiosk ay bumabala bago ang overwriting.
4. **Generates isang security code bawat batch.** Ang `SecurityCodeHelper.generate()` ay gumagawa ng 4-character code mula sa alphabet `23456789BCDFGHJKLMNPQRSTVWXYZ` (walang vowels o ambiguous characters, kaya ang mga codes ay hindi maaaring mag-spell ng words o misread). Ang server ay sumusubok muli sa collision laban sa parehong church's same-day open visits at timbre ang code sa bawat visit sa batch.
5. **Returns `{ streaks, securityCode }`.** Ang `streaks` ay nag-map ng personId sa consecutive-week attendance count; ang kiosk ay nagdiriwang ng milestones (bawat 5th week) gamit ang confetti.

Bawat nakatipong visit ay naglalabas din ng `attendance.recorded` webhook. Ang read side, `GET /attendance/visits/checkin`, ay nagbabalik ng mga visit ng people mula sa kanilang **last logged date** — kung iyon ay isang nakaraang linggo ang ids ay nag-strip, kaya ang client ay makakatanggap ng pre-filled copy ng nakaraang linggo's room selections na magsasave bilang bagong records.

### Checkout

Dalawang endpoints ang kumukumpleto ng loop (`VisitController`):

- `GET /attendance/visits/code/:code` — mga today's not-yet-checked-out visits na may security code, na may sessions populated.
- `POST /attendance/visits/checkout` — body `{ visitIds, checkedOutBy?, checkedOutById? }`; timbre ang `checkoutTime` at kung sino ang pumick up, at naglalabas ng `attendance.checkout` webhook bawat visit.

Mga permission: ang mga kiosk ay nag-authenticate gamit ang `attendance.checkin`, na nagbibigay ng eksaktong check-in/check-out/label-template surface; ang `attendance.view`/`attendance.edit` ay sumasaklaw sa reporting at manual entry; ang istraktura (services, service times, group assignments) ay nangangailangan ng `services.edit`.

## Ang Groups ay hinihimok ang room routing

Walang room o classroom entity kahit saan sa system. Isang "room" ay isang membership **group** na may `trackAttendance` enabled, na naka-link sa isang o higit pang service times sa pamamagit ng `groupServiceTimes`. Ang group fields (sa `Api/src/modules/membership/models/Group.ts`) na bumubuo sa kiosk behavior:

| Larangan | Epekto |
|------|--------|
| `trackAttendance` | Ang Group ay nakikibahagi sa attendance sa lahat; ang B1Admin's setup tree ay nag-flag ng `trackAttendance` groups na walang `groupServiceTimes` row bilang unassigned |
| `parentPickup` | Markahan ang isang child room: ang pag-check in dito ay ginagawang "child" ang visit, na nag-print ng family pickup label at naglalagay ng security code sa nametag |
| `printNametag` | Kung ang check-ins sa grupo na ito ay nag-print ng nametag sa lahat |
| `capacity` / `guestCapacity` / `checkinClosed` | Room capacity limits at isang hard "closed" switch, na ipinapatupad ng server-side ng check-in gate (na-edit sa B1Admin's group settings sa ilalim ng "Check-In Capacity") |
| `volunteerRatio` / `minVolunteers` | Children-per-volunteer ratio at minimum volunteer headcount, na ipinapatupad bawat church-wide `ratioEnforcement` setting |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Age/grade eligibility bounds na sinusuri sa kiosk-side upang i-highlight o ma-dim ang mga kuwarto |

Bawat client ay denormalizes sa parehong paraan (e.g. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): i-load ang `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes`, at `GET /membership/groups` sa parallel, pagkatapos para sa bawat service time ay kolektahin ang mga grupo na ang `groupServiceTimes` row ay tumuturo dito sa `serviceTime.groups`. Ang array na ito ay kung ano ang room picker ay nagpapakita, na inorganisa ng group `categoryName`.

Ang mga assignment ay na-edit mula sa group's page sa B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), at ang buong Campus → Service → Service Time → Group tree ay na-visualize sa `B1Admin/src/attendance/components/AttendanceSetup.tsx` sa pamamagit ng `GET /attendance/attendancerecords/tree`.

:::info
Dahil ang mga grupo ay ang single source of truth, ang parehong group membership ay nagbibigay ng kiosk routing, roster-style attendance sa B1Admin's group pages, at attendance reporting — ang pag-assign ng grupo sa isang service time ay ang tanging hakbang na kailangan upang gawin itong check-in destination.
:::

## Child safety

### Mga check-in type

Bawat visit ay may `checkinType` — `member`, `guest`, o `volunteer` (NULL ay nangangahulugang legacy/member; migration `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Ang uri ay pinili **kiosk-side**: Member / Guest / Volunteer chips sa expanded member row (`B1Checkin/src/components/MemberServiceTimes.tsx`), stamped sa bawat pending visit sa completion (`app/checkinComplete.tsx`, defaulting sa `member`). Ang server ay kumikita dito sa gate — ang mga volunteer ay umabot tungo sa ratio coverage sa halip na laban sa capacity, at ang mga guest ay umabot laban sa `guestCapacity`.

### Capacity at volunteer-ratio gates

Ang `CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) ay tumatakbo sa loob ng `postCheckin` bago ang anumang save (ang endpoint ay non-transactional, kaya ang gating-before-save ay ang correctness mechanism). Nag-load ito ng current occupancy bawat targeted group (`VisitRepo.countActiveByGroupToday`) at ang group config sa pamamagit ng membership module gateway, pagkatapos ay naglalista ng violations:

- **Hard (laging block):** Ang `checkinClosed`, `current + incoming > capacity`, guest count sa `guestCapacity`. Ang batch ay tinatanggihan na may `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` — ang kiosk ay nagpapakita ng named room.
- **Ratio (warn o block):** Ang incoming non-volunteers sa kuwarto kung saan `volunteers < minVolunteers`, walang mga volunteer sa lahat, o `children > volunteers × volunteerRatio`. Ang severity ay sumusunod sa per-church setting `ratioEnforcement` (`"warn"` default / `"block"`, na-edit sa B1Admin Manage Church → Check-In, `CheckinSettingsEdit.tsx`). Ang warn-mode ay nagbabalik ng `409 { warning: true, error: "ratio", … }` maliban kung ang client ay muling nagpadala na may `acknowledgeWarnings=true` — ang muling padala na iyon ay ang kiosk's staff-confirm override.

### Age/grade eligibility (kiosk-side)

Ang room eligibility ay advisory UI, sinusuri sa kiosk, hindi ipinapatupad ng server. Ang `B1Checkin/src/helpers/EligibilityHelper.ts` ay naghahambing ng birthdate/grade ng tao laban sa group's `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` (grade order: PreK, K, 1–12, Graduated) at nagbabalik ng `eligible` / `ineligible` / `unknown` — ang missing data ay gumagawa ng `unknown` at hindi kailanman nagtago ng kuwarto. Ang mga edad at grades ay naka-compute bilang ng church's **grade promotion date** (`gradePromotionDate` setting, `"MM-DD"`, na-edit sa `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); ang kiosk ay nag-fetch nito mula sa `GET /attendance/checkin/settings`, at ang `resolveAsOfDate` ay pumipili ng pinakamabagong occurrence sa o bago ngayon. Ang room picker ay nag-highlight ng eligible rooms at nag-dim ng ineligible ones; ang pagpili ng dimmed room ay nangangailangan ng staff confirmation.

### Trusted at not-authorized pickup

Ang mga pickup people ay isang membership entity, bawat household: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, optional personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). Ang CRUD ay `GET /membership/householdpickup/:householdId` (anumang naka-authenticate na church user, kaya ang mga kiosk ay maaaring basahin ito) kasama ang `POST` / `DELETE` na gated ng `people.edit`. Ang staff ay nag-manage ng listahan sa person page's **Pickup** card (`B1Admin/src/people/components/PickupPeople.tsx`) — photo, relationship, at isang Trusted/Not Authorized status chip.

Sa check-out (`B1Checkin/app/checkout.tsx`) ang kiosk ay nag-load ng household's pickup list: ang `trusted` entries ay nag-render bilang tappable pickup cards kasama ang household-adult photo grid, at isang free-typed "Other" name ay fuzzy-matched (Levenshtein, `src/helpers/PickupMatchHelper.ts`) laban sa `notAuthorized` entries — ang match ay nag-block ng check-out gamit ang warning sheet at isang staff **Override** button. Ang override ay naka-log sa visit mismo: ito ay nagpadala ng `checkedOutBy` bilang `"OVERRIDE: {name}"` sa pamamagit ng normal `POST /attendance/visits/checkout`, kaya ito ay lumabas sa attendance record at ang `attendance.checkout` webhook sa halip na isang hiwalay na audit table.

### Paging a parent at emergency broadcast

Ang `CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) ay nag-expose ng dalawang SMS endpoints:

- `POST /page` — `{ visitId, message }`: nag-page sa mga guardians ng isang naka-check in na bata (kiosk check-out screen, manned mode).
- `POST /broadcast` — `{ serviceId, message }`: nag-text sa bawat naka-check in na household's adults para sa isang service (kiosk admin settings, nasa likod ng type-`EMERGENCY`-to-confirm sheet sa `B1Checkin/app/adminSettings.tsx`).

Pareho ay nilulutas ang household adults sa pamamagit ng membership gateway, pagkatapos ay hand delivery sa **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — ang cross-module door sa configured texting provider ng church (`@churchapps/texting`: TextInChurch, Clearstream, o MutualMinistry; walang built-in SMS sender). Ang gateway ay nag-log ng `sentText` row kasama ang per-recipient `deliveryLog` entries at nag-cap ng batch sa 500 recipients; na walang provider na naka-configure ito ay nagbabalik ng `no_provider`, na ang kiosk ay nagdadala bilang "No SMS provider configured". Ang controller's `dispatch()` ay nag-dedup ng phone numbers at nag-skip ng mga taong walang mobile o may `optedOut` set, na nagbabalik ng `{ sent, failed, skippedOptedOut, skippedNoPhone }` kaya ang kiosk ay maaaring ipakita kung ano ang naka-skip.

## Ang kiosk (B1Checkin)

Ang mga screen ay expo-router files sa ilalim ng `B1Checkin/app/`; ang cross-screen state ay nabubuhay sa isang static `CachedData` class (`src/helpers/CachedData.ts`), hindi React state.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Lookup** (`app/lookup.tsx`) — paghahanap sa pamamagit ng phone (`GET /membership/people/search/phone?number=`, last-4 o full) o sa pamamagit ng pangalan (`GET /membership/people/search?term=`). Ang pagpili ng match ay nag-load ng household (`GET /membership/people/household/{householdId}`) at existing visits (`GET /attendance/visits/checkin`), seeding `pendingVisits` na may selections ng nakaraang linggo.
2. **Household review** (`app/household.tsx`, `src/components/MemberList.tsx`) — bawat member row ay nagpapakita ng already-checked-in badge, allergy/`nametagNotes` badge, at kanilang current room chips. Ang pagpapalawak ng miyembro ay naglalista ng bawat service time na may room button kasama ang Member / Guest / Volunteer check-in-type chips (`MemberServiceTimes.tsx`).
3. **Group assignment** (`app/selectGroup.tsx`) — isang category tree na itinayo mula sa `serviceTime.groups`, na may age/grade-eligible rooms na na-highlight at ineligible ones na na-dim sa likod ng staff confirm (tingnan ang [Age/grade eligibility](#agegrade-eligibility-kiosk-side)); ang pagpili ng kuwarto ay nagsusulat ng `{ session: { serviceTimeId, groupId } }` visitSession sa pending visit ng taong iyon (`src/helpers/VisitSessionHelper.ts`). Ang "None" ay nag-clear nito.
4. **Complete** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` na may `pendingVisits` (bawat isa ay stamped na may `checkinType`), pagkatapos ay nag-print ng labels kung ang printer ay naka-configure at auto-returns sa lookup. Ang `409` capacity response ay nagpapakita ng named full/closed room; ang ratio warning ay nag-alok ng staff confirm na muling nagpadala na may `acknowledgeWarnings=true`.

Ang **check-out** screen (`app/checkout.tsx`) ay tumatanggap ng 4-character security code sa pamamagit ng auto-focused input — kaya ang USB/Bluetooth keyboard-wedge barcode scanners ay gumagana na walang camera — o isang on-screen keypad na gumagamit ng parehong alphabet, auto-submitting sa 4 characters. Ito ay tumitingin sa code, nagpapakita ng mga batang pinupickup, at nagpresenta ng household's **trusted pickup people** bilang tappable cards kasama ang photo grid ng household adults (kasama ang "Other" free-text option na ay fuzzy-checked laban sa not-authorized names — tingnan ang [Trusted at not-authorized pickup](#trusted-at-not-authorized-pickup)), pagkatapos ay nagpadala ng `POST /attendance/visits/checkout` na may pangalan/id ng picker. Sa manned mode ang screen ay nag-alok din ng **Page a parent** (`POST /attendance/checkin/page`) at isang **security-label reprint** — ang `reprint()` ay muling binubuo ang family's labels gamit ang `LabelHelper.getAllLabelsFor(...)` at pinapasa sila sa pamamagit ng parehong `PrintUI` pipeline bilang check-in.

Ang station personality ay isang AsyncStorage flag `@StationMode` (`"self"` | `"manned"`, na-toggle sa `app/adminSettings.tsx`). Ang manned mode ay nagdadagdag ng check-out entry point sa lookup screen at per-member profile editing (`POST /membership/people`) mula sa household screen. Ang kiosk hardening ay built in: isang optional PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) ay nag-gate ng admin at printer screens, ang admin screen ay bumubukas lamang sa pamamagit ng 7 rapid taps sa header logo, at isang idle attract screen (`src/hooks/useInactivityTimer.ts`) ay kumukuha alihan sa pagitan ng mga pamilya.

## Self check-in (B1App)

Ang mga miyembro ay nag-check in mula sa b1.church portal sa `/mobile/checkin` screen (routed ng `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` sa `screens/CheckinPage.tsx`). Nangangailangan ito ng naka-log in na user at naglalakad ng parehong apat na hakbang bilang ang kiosk — services → household → groups → complete — laban sa parehong endpoints, na may state na inilabas sa `B1App/src/helpers/CheckinHelper.ts`. Ang mga pagkakaiba mula sa kiosk: ang household ay nagmula sa naka-log in na user's sariling `householdId` (walang search step), at ang flow ay nagtatapos sa confirmation screen — walang security code display at walang label printing. Ang mga types at `ApiHelper`/`ArrayHelper` ay nanggagaling sa `@churchapps/helpers` at `@churchapps/apphelper`; walang React components na ibinabahagi sa B1Admin.

## Admin-side attendance (B1Admin)

- **Setup** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) ay nag-render ng structure tree at lumilikha ng services (`ServiceEdit.tsx`) at service times (`ServiceTimeEdit.tsx`). Ang Campus data ay nagmula sa membership sa pamamagit ng `useCampuses()` hook.
- **Manual attendance** ay nabubuhay sa Groups side, hindi ang attendance section: ang `B1Admin/src/groups/components/GroupSessionsTab.tsx` ay lumilikha ng sessions (`POST /attendance/sessions`) at nag-mark ng mga tao na kasalukuyan sa pamamagit ng `POST /attendance/visitsessions/log`, na naghahanap-o-lumilikha ng visit para sa taong iyon at session. Ang mga group leaders ay maaaring mag-record ng attendance para sa kanilang sariling mga grupo nang walang `attendance.edit` permission — ang mga controllers ay nag-check ng `au.leaderGroupIds`.
- **Reporting** — ang attendance trend at group attendance ay server-defined reports (`B1Admin/src/components/reporting/ReportWithFilter.tsx` laban sa ReportingApi); ang per-person history ay `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Label printing

### Mga template at ang designer

Ang mga simbahan ay nag-design ng kanilang sariling labels sa B1Admin sa `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, maaabot mula sa Check-In settings page). Ang isang template ay isang `labelTemplates` row na ang `content` ay isang JSON array ng blocks — `text`, `field`, `barcode`, `qrcode`, o `box` — bawat isa ay iniposisyon sa percent coordinates na may font, alignment, symbology (`code39`/`code128`/`qr`), at optional visibility conditions (e.g. i-render lamang ang allergy box kapag `person.nametagNotes` ay non-empty). Dalawang `labelType`s ay umiiral: `nametag` (isa bawat naka-check in na tao; fields tulad ng `person.displayName`, `sessions`, `securityCode`) at `pickup` (isa bawat pamilya; fields tulad ng `children`, `childrenAllergies`). Ang server ay nag-enforce ng isang default bawat uri bawat church (`LabelTemplateController.save`). Ang designer ay nagpadala ng starter templates na sumasalamin sa kiosk's bundled labels at previews laban sa sample data.

### Rendering at printing sa kiosk

Sa check-in completion, ang `B1Checkin/src/helpers/LabelHelper.ts` ay nagdedesisyon kung ano ang i-print mula sa group flags sa bawat pending visit: nametags para sa `printNametag` groups, kasama ang isang family pickup label kung ang anumang visit ay tumama sa `parentPickup` group. Ang security code mula sa check-in response ay napupunta sa child nametags at ang pickup label; ang adult nametags ay nag-print nang walang code. Kung ang church ay may mga template, ang `LabelRenderer` (`src/helpers/LabelRenderer.ts`) ay nagiging blocks + isang field context sa isang standalone HTML document; kung hindi ang bundled HTML labels sa `B1Checkin/assets/labels/` ay ginagamit na may placeholder substitution.

Ang mga barcode ay nabubuo bilang inline SVG ng pure-TypeScript encoders sa `B1Checkin/src/helpers/barcode.ts` — Code 39 pattern tables at Code 128 (code set B na may mod-103 checksum) width tables, kasama ang QR sa pamamagit ng `qrcode` package. **Ang mga encoders na ito ay sinandig na kopyahin sa B1Admin** (`LabelEditor.tsx` inlines ang parehong tables, noted sa code comment) kaya ang designer previews ay pixel-faithful sa kiosk output; isang pagbabago sa isa ay dapat na sumasalamin sa iba.

Ang print pipeline (`src/components/PrintUI.tsx`) ay nag-render ng bawat HTML label sa isang `WebView`, kumukuha dito sa JPG sa pamamagit ng `react-native-view-shot`, at isinasagawa ang image URIs sa native **printer-helper** Expo module (`B1Checkin/modules/printer-helper/`). Ang module ay nag-expose ng `scan()`, `checkInit()`, `printUris()`, at status events, na may provider bawat brand sa parehong platforms:

| Brand | Android | iOS | Mga Tala |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | QL-series network printers (QL-800/810W/820NWB/1100/1110NWB…), die-cut 29×90 labels, ang nirerekomendang default |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Network discovery + TCP/ZPL image printing |

Ang pagpili ng printer ay nabubuhay sa `app/printers.tsx` (ang network scan ay nagbabalik ng `brand~model~ip` entries; ang pagpili ay nanatili sa AsyncStorage), at ang `src/helpers/PrinterLog.ts` ay nagpapanatili ng on-device diagnostic log na naging surface sa pamamagit ng live status dot sa kiosk header.

## Guest registration

Dalawang daan ang lumilikha ng isang tao sa mid-check-in:

- **Sa kiosk** — ang household screen's "Add guest" ay bumubukas ng `B1Checkin/app/addGuest.tsx`, na unang naghahanap ng `GET /membership/people/search?term=` para sa existing non-member match at kung hindi ay lumilikha ng isa na may `POST /membership/people`, na naka-attach sa kasalukuyang household. Ang guest ay pagkatapos ay dumadaloy sa group assignment tulad ng anumang miyembro.
- **Self-serve sa pamamagit ng QR** — kung ang church setting `enableQRGuestRegistration` ay on (na-configure sa B1Admin's Check-In settings, na-read mula sa `GET /membership/settings/public/{churchId}`), ang kiosk lookup screen ay nagpapakita ng QR code na nag-link sa `https://{subdomain}.b1.church/guest-register?serviceId=`. Ang pahinang B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) ay nagbibigay-daan sa isang bumibisitang pamilya na mag-register ng kanilang sarili sa kanilang sariling phone sa pamamagit ng anonymous `POST /membership/people/guest-register` endpoint, na pinapanatiling mabilis ang kiosk line.

## Mga Kaugnay na Pahina

- [Attendance Endpoints](../api/endpoints/attendance) -- Buong REST surface para sa campuses, services, sessions, visits, at visit sessions
- [Membership Endpoints](../api/endpoints/membership) -- People, households, at groups
- [Webhooks](../api/webhooks) -- Ang `session.created`, `attendance.recorded`, at `attendance.checkout` events
- [Module Structure](../api/module-structure) -- Kung paano ang attendance module ay inorganisa sa server-side
