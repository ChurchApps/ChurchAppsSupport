---
title: "Mga Check-In"
---

# Mga Check-In

<div class="article-intro">

Ang check-in ay isang system na may tatlong pinto sa harap: ang B1Checkin kiosk app para sa mga istasyong staffed at self-serve, self check-in sa loob ng B1App member portal, at admin-side attendance sa B1Admin. Ang lahat ng tatlo ay sumusuling sa parehong attendance module sa core Api, at ang classroom routing ay hinihimok nang buong ng Mga Grupo -- walang hiwalay na "lokasyon" o "kwarto" entity. Ang layer ng kaligtasan ng bata ay nakalulunsad sa itaas: per-visit check-in types, server-side capacity at volunteer-ratio gates, kiosk-side age/grade eligibility, trusted-pickup verification sa check-out, at parent paging sa texting provider ng simbahan. Ang pahina na ito ay nagmamapa ng data model, ang check-in flows, ang safety layer, at ang label printing pipeline.

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
| Kiosk | `B1Checkin` | Expo / React Native, expo-router file routing; EAS builds para sa Android, Amazon Fire, at iOS; OTA updates sa pamamagitan ng `expo-updates` | Staffed o self-serve station na may label printing at verified check-out |
| Self check-in | `B1App` | Next.js (b1.church member portal) | Logged-in members ay nag-check ng kanilang household mula sa telepono; walang pag-print |
| Admin | `B1Admin` | React SPA | Nag-configure ng service structure, nagtatag ng mga grupo sa mga oras ng serbisyo, nagdidisenyo ng mga label, nag-record ng manual attendance, tumatakbo ng mga ulat |

Ang lahat ng tatlo ay tawag sa pareho dalawang modules ng API sa pamamagitan ng `ApiHelper`: **MembershipApi** (`/membership`) para sa mga tao, household, at mga grupo; **AttendanceApi** (`/attendance`) para sa lahat sa ibaba.

## Data model (`Api/src/modules/attendance`)

| Entity / table | Key fields | Meaning |
|----------------|-----------|---------|
| `campuses` | name, address | Deprecated dito -- ang mga kampus ay master sa membership module (`/membership/campuses`); ang attendance copy ay naka-freeze read-only para sa legacy readers (`models/Campus.ts`) |
| `services` | campusId, name | Isang paulit-ulit na pagtitipon, hal. "Linggo ng Umaga" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name | Isang time slot sa loob ng serbisyo, hal. "9:00 AM" (`models/ServiceTime.ts`) |
| `groupServiceTimes` | groupId, serviceTimeId | Join table: aling mga grupo (classrooms) ay nagtutulungan sa aling mga oras ng serbisyo (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Isang pagpupulong ng isang grupo sa isang petsa -- ginawa nang lazy sa oras ng check-in (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Isang tao na dumalo sa isang petsa (`models/Visit.ts`). Ang `checkinType` ay `member` / `guest` / `volunteer` (NULL = legacy member), itakda ng kiosk at ginagamit ng capacity/ratio gates |
| `visitSessions` | visitId, sessionId | Aling session(s) ang bisita ay sumasaklaw -- isang bata na nag-check sa dalawang oras ng serbisyo ay makakakuha ng dalawang row (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON blocks) | Mga designable na layout ng label (`models/LabelTemplate.ts`) |

### Kung paano napatuloy ang isang kumpleto na check-in

Ang `VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) ay humahawak ng `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Ang katawan ay isang array ng `Visit` mga bagay, bawat isa ay may `visitSessions` na ang nakabalot na `session` ay pangalan lamang ang `(serviceTimeId, groupId)` pair. Ang server pagkatapos ay:

1. **Gate ang kapasidad at ratio bago ang anumang isulat.** `evaluateGates()` → `CheckinGateHelper.evaluate()` sinusuri ang bawat targeted room ng kapasidad, kapasidad ng guest, closed flag, at volunteer ratio laban sa kasalukuyang paggamit. Ang postCheckin ay **hindi transactional**, kaya ang gate ay dapat tumakbo bago ang unang save -- isang hard violation ay nagbabalik ng 409 naming ang offending room(s) at walang nanatili. Tingnan ang [Capacity and volunteer-ratio gates](#capacity-and-volunteer-ratio-gates).
2. **Lutasin ang mga session nang lazy.** `getSessionId()` ay nakahanap o lumilikha ng `sessions` row para sa `(groupId, serviceTimeId, ngayon)` -- ang mga session ids ay cached sa loob-proseso bawat petsa. Ang mga bagong session ay naglalabas ng `session.created` webhook. Ang loop ay isang naghihintay na `for..of` -- isang mas maagang fire-and-forget `forEach(async …)` ay nag-race ng save at nagsulat ng NULL sessionIds sa unang paglikha ng session (fixed; napansin sa code comment sa loop).
3. **Palitan ang araw ng mga record.** Ang anumang umiiral na bisita para sa mga taong iyon sa serbisyong iyon ngayong araw ay tinatanggal kasama ang kanilang visitSessions, pagkatapos ang isinumiteng set ay naka-save. Ang pag-recheck-in ng pamilya ay samakatuwid isang idempotent na "ito ang kasalukuyang estado" operasyon, hindi isang append. Ang pagpasa ng `?checkDuplicates=true` sa halip ay nagbabalik ng `{ duplicates: [personId…] }` nang hindi nagsusulat, na kung paano nagbabagay ang kiosk bago ang pagsusulat.
4. **Lumikha ng isang security code bawat batch.** `SecurityCodeHelper.generate()` ay gumagawa ng isang 4-character code mula sa alpabeto `23456789BCDFGHJKLMNPQRSTVWXYZ` (walang vowels o ambiguous characters, kaya ang mga code ay hindi maaaring magwika ng mga salita o hindi nabasa). Ang server ay sumusubok sa collision laban sa parehong church ng parehong-araw na bukas na mga bisita at stamp ang code sa bawat bisita sa batch.
5. **Nagbabalik ng `{ streaks, securityCode }`.** `streaks` na mga mapa ng personId sa consecutive-week attendance count; ang kiosk ay nagdiriwang ng mga milestone (bawat ika-5 linggo) na may confetti.

Bawat nakaligtas na bisita ay nagpapalabas din ng `attendance.recorded` webhook. Ang read side, `GET /attendance/visits/checkin`, ay nagbabalik ng mga bisita ng mga tao mula sa kanilang **huling naka-log na petsa** -- kung iyon ay isang nakaraang linggo ang mga ids ay nang-strip, kaya ang client ay tumatanggap ng pre-filled copy ng huling linggo ng pagpili ng kwarto na magsasave bilang mga bagong record.

### Check-out

Dalawang endpoint ang kumpleto sa loop (`VisitController`):

- `GET /attendance/visits/code/:code` -- ngayong araw na hindi pa checkout visits na may security code na iyon, na may sessions na puno.
- `POST /attendance/visits/checkout` -- body `{ visitIds, checkedOutBy?, checkedOutById? }`; stamp ang `checkoutTime` at sino ang pumickup, at naglalabas ng `attendance.checkout` webhook bawat bisita.

Mga pahintulot: ang mga kiosk ay nag-authenticate na may `attendance.checkin`, na nagbibigay lamang ng check-in/check-out/label-template surface; ang `attendance.view`/`attendance.edit` ay sumasaklaw sa reporting at manual entry; ang structure (mga serbisyo, oras ng serbisyo, pagtatalaga ng grupo) ay nangangailangan ng `services.edit`. Ang member self check-in (B1App) ay hindi kailangan ng anumang pahintulot sa lahat: ang anumang authenticated user na may naka-link na tao sa simbahan ay maaaring tawagan ang `GET`/`POST /attendance/visits/checkin`, at ang server ay nagsasangkot ng submitted `personId`s sa sariling household ng caller (403 sa ibang paraan -- ang bakod na ito ay kung ano ang napanatili sa iba't ibang pamilya ng `securityCode`s na hindi nabasang). Ang pagsasama ay ang grant; kung nakikita ng mga miyembro ang feature ay kinokontrol ng navigation tabs ng B1App ng simbahan. Ang iba pang check-in endpoints (`code/:code`, `checkout`, `guardians`, `CheckinController`) ay manatiling kiosk/staff-only.

## Mga grupo ang gumagabay ng room routing

Walang kwarto o klasroom entity saanman sa system. Ang "kwarto" ay isang membership **grupo** na may `trackAttendance` enabled, na naka-link sa isa o higit pang mga oras ng serbisyo sa pamamagitan ng `groupServiceTimes`. Ang mga field ng grupo (sa `Api/src/modules/membership/models/Group.ts`) na bumubuo sa behavior ng kiosk:

| Field | Effect |
|------|--------|
| `trackAttendance` | Ang grupo ay sumasali sa pagdalo sa lahat; ang setup tree ng B1Admin ay nag-flag ng `trackAttendance` na mga grupo na walang `groupServiceTimes` row bilang unassigned |
| `parentPickup` | Minarkahan ang isang child room: ang check-in dito ay gumagawa ng bisita na isang "child" bisita, na nag-print ng isang pamilya pickup label at naglalagay ng security code sa nametag |
| `printNametag` | Kung ang check-in sa grupon na ito ay nag-print ng nametag sa lahat |
| `capacity` / `guestCapacity` / `checkinClosed` | Mga limitasyon ng kapasidad ng kwarto at isang hard "closed" switch, ginagayo ng server-side ng check-in gate (binago sa setting ng B1Admin group sa ilalim ng "Check-In Capacity") |
| `volunteerRatio` / `minVolunteers` | Mga bata bawat volunteer ratio at minimum volunteer headcount, ginagayo bawat church-wide na setting ng `ratioEnforcement` |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Mga hangganan ng edad/baitang eligibility na sinusuri ng kiosk-side upang i-highlight o idim ang mga kuwarto |

Bawat client ay denormalize sa parehong paraan (hal. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): mag-load ng `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes`, at `GET /membership/groups` sa parallel, pagkatapos para sa bawat oras ng serbisyo kolektahin ang mga grupo na ang `groupServiceTimes` row ay tumuturo dito sa `serviceTime.groups`. Ang array na ito ay kung ano ang room picker ay nagpapakita, na inorganisa ayon sa grupo `categoryName`.

Ang mga pagtatalaga ay binago mula sa pahina ng grupo sa B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` -- `POST`/`DELETE /attendance/groupservicetimes`), at ang buong Campus → Serbisyo → Oras ng Serbisyo → Grupo tree ay nakikita sa `B1Admin/src/attendance/components/AttendanceSetup.tsx` sa pamamagitan ng `GET /attendance/attendancerecords/tree`.

:::info
Dahil ang mga grupo ay ang solong source ng katotohanan, ang parehong pagsasama ng grupo ay nagpapalakas sa kiosk routing, roster-style attendance sa mga pahina ng grupo ng B1Admin, at attendance reporting -- ang pagtatalaga ng grupo sa isang oras ng serbisyo ay ang lamang hakbang na kailangan upang gawin itong destinasyon ng check-in.
:::

## Kaligtasan ng bata

### Uri ng check-in

Bawat bisita ay may `checkinType` -- `member`, `guest`, o `volunteer` (NULL ang ibig sabihin legacy/member; migration `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Ang uri ay pinili ng **kiosk-side**: Miyembro / Guest / Volunteer chips sa expanded member row (`B1Checkin/src/components/MemberServiceTimes.tsx`), stamped sa bawat pending visit sa pagkumpleto (`app/checkinComplete.tsx`, defaulting sa `member`). Ang server ay ginagamit ito sa gate -- ang mga volunteer ay bumibilang patungo sa ratio coverage sa halip na laban sa kapasidad, at ang mga bisita ay bumibilang laban sa `guestCapacity`.

### Mga gate ng kapasidad at volunteer-ratio

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) ay tumatakbo sa loob ng `postCheckin` bago ang anumang save (ang endpoint ay hindi transactional, kaya ang gating-before-save ay ang correctness mechanism). Ito ay nag-load ng kasalukuyang paggamit bawat targeted group (`VisitRepo.countActiveByGroupToday`) at ang config ng grupo sa pamamagitan ng gateway ng membership module, pagkatapos ay nagsasayaw ng mga violation:

- **Hard (palaging block):** `checkinClosed`, `current + incoming > capacity`, guest count over `guestCapacity`. Ang batch ay tinanggihan na may `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` -- ang kiosk ay nagpapakita ng named room.
- **Ratio (magbigay ng babala o block):** incoming non-volunteers sa isang kwarto kung saan ang `volunteers < minVolunteers`, walang volunteers sa lahat, o `children > volunteers × volunteerRatio`. Ang severity ay sumusunod sa per-church setting `ratioEnforcement` (`"warn"` default / `"block"`, binago sa B1Admin Manage Church → Check-In, `CheckinSettingsEdit.tsx`). Ang warn-mode ay nagbabalik ng `409 { warning: true, error: "ratio", … }` kung hindi ang client ay muling nag-submit na may `acknowledgeWarnings=true` -- ang muling nag-submit na iyon ay ang kiosk staff-confirm override.

### Edad/baitang eligibility (kiosk-side)

Ang room eligibility ay advisory UI, sinusuri sa kiosk, hindi ibinigay ng server. `B1Checkin/src/helpers/EligibilityHelper.ts` ay naghahambing ng birthdate/grade ng tao laban sa grupo `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` (order ng baitang: PreK, K, 1–12, Nagtapos) at nagbabalik ng `eligible` / `ineligible` / `unknown` -- ang nawawalang data ay nagbubunga ng `unknown` at hindi kailanman nagtago ng kwarto. Ang mga edad at baitang ay kinakamit bilang ng grade promotion date ng simbahan (`gradePromotionDate` setting, `"MM-DD"`, binago sa `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); ang kiosk ay nag-fetch nito mula sa `GET /attendance/checkin/settings`, at ang `resolveAsOfDate` ay pumipili ng pinaka-kamakailang paglitaw sa o bago ang ngayon. Ang room picker ay nag-highlight ng eligible rooms at nag-dim ng ineligible na mga; ang pag-pick ng isang dimmed room ay nangangailangan ng staff confirmation.

### Nakatitiwala at hindi-authorized pickup

Ang mga taong pickup ay isang entity ng pagsasama, bawat household: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` -- householdId, optional personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). Ang CRUD ay `GET /membership/householdpickup/:householdId` (ang anumang authenticated church user, kaya ang mga kiosk ay maaaring basahin) plus `POST` / `DELETE` gated ng `people.edit`. Ang mga kawani ay namamahala sa listahan sa pahina ng tao **Pickup** card (`B1Admin/src/people/components/PickupPeople.tsx`) -- larawan, relasyon, at isang chip ng Trusted/Not Authorized status.

Sa check-out (`B1Checkin/app/checkout.tsx`) ang kiosk ay nag-load ng pickup list ng household: ang mga entry ng `trusted` ay render bilang tappable pickup cards sa tabi ng grid ng larawan ng adult ng household, at isang libreng-typed "Iba" pangalan ay fuzzy-matched (Levenshtein, `src/helpers/PickupMatchHelper.ts`) laban sa mga entry ng `notAuthorized` -- ang tugma ay nag-block ng check-out na may warning sheet at isang staff **Override** button. Ang override ay naka-log sa bisita mismo: ito ay nagpo-post ng `checkedOutBy` bilang `"OVERRIDE: {name}"` sa pamamagitan ng normal na `POST /attendance/visits/checkout`, kaya ito ay umiikot sa attendance record at ang `attendance.checkout` webhook sa halip na isang hiwalay na audit table.

### Pahina ng isang magulang at emergency broadcast

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) ay nagbubunyag ng dalawang SMS endpoints:

- `POST /page` -- `{ visitId, message }`: mga pahina ng mga guardians ng isang checked-in child (kiosk check-out screen, manned mode).
- `POST /broadcast` -- `{ serviceId, message }`: mga teksto ng bawat checked-in household's adults para sa isang serbisyo (kiosk admin settings, likod ng isang type-`EMERGENCY`-to-confirm sheet sa `B1Checkin/app/adminSettings.tsx`).

Pareho ay nagsasagawa ng mga adult ng household sa pamamagitan ng gateway ng pagsasama, pagkatapos ay hand delivery sa **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) -- ang cross-module pinto sa texting provider ng simbahan (`@churchapps/texting`: TextInChurch, Clearstream, o MutualMinistry; walang built-in SMS sender). Ang gateway ay nag-log ng `sentText` row plus per-recipient `deliveryLog` entries at sumasaklaw sa batch sa 500 recipients; na walang provider na configured ito ay nagbabalik ng `no_provider`, na ang kiosk ay ibabahagi bilang "Walang SMS provider configured". Ang `dispatch()` ng controller ay nag-deduplicate ng phone numbers at nag-skip ng mga taong walang mobile o `optedOut` set, nagbabalik ng `{ sent, failed, skippedOptedOut, skippedNoPhone }` upang ang kiosk ay makita kung ano ang na-skip.

## Ang kiosk (B1Checkin)

Ang mga screen ay expo-router files sa ilalim ng `B1Checkin/app/`; ang cross-screen state ay buhay sa isang static `CachedData` class (`src/helpers/CachedData.ts`), hindi React state.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Lookup** (`app/lookup.tsx`) -- maghanap sa pamamagitan ng telepono (`GET /membership/people/search/phone?number=`, huling-4 o puno) o sa pamamagitan ng pangalan (`GET /membership/people/search?term=`). Ang pagpili ng tugma ay nag-load ng household (`GET /membership/people/household/{householdId}`) at mga umiiral na bisita (`GET /attendance/visits/checkin`), seeding `pendingVisits` na may pagpili ng huling linggo.
2. **Household review** (`app/household.tsx`, `src/components/MemberList.tsx`) -- bawat miyembro row ay nagpapakita ng isang na-check-in na badge, allergy/`nametagNotes` badge, at ang kanilang kasalukuyang chips ng kuwarto. Ang pagpapalawak ng miyembro ay naglalista ng bawat oras ng serbisyo na may kuwartong pindutan plus ang Miyembro / Bisita / Volunteer check-in-type chips (`MemberServiceTimes.tsx`).
3. **Pagtatalaga ng grupo** (`app/selectGroup.tsx`) -- isang tree ng kategorya na itinayo mula sa `serviceTime.groups`, na may edad/baitang-eligible na mga kuwartong naka-highlight at ineligible na mga na nakatago sa likod ng isang staff confirm (tingnan ang [Edad/baitang eligibility](#agegrade-eligibility-kiosk-side)); ang pag-pick ng kwarto ay nagsusulat ng `{ session: { serviceTimeId, groupId } }` visitSession sa pending visit ng taong iyon (`src/helpers/VisitSessionHelper.ts`). Ang "Wala" ay nag-clear nito.
4. **Kumpletuhin** (`app/checkinComplete.tsx`) -- `POST /attendance/visits/checkin` na may `pendingVisits` (bawat stamped na may `checkinType`), pagkatapos ay nag-print ng mga label kung ang printer ay configured at auto-return sa lookup. Ang `409` capacity response ay nagpapakita ng named full/closed room; ang ratio warning ay nag-aalok ng staff confirm na muling nag-submit na may `acknowledgeWarnings=true`.

Ang screen ng **check-out** (`app/checkout.tsx`) ay tumatanggap ng 4-character security code sa pamamagitan ng isang auto-focused input -- kaya ang USB/Bluetooth keyboard-wedge barcode scanners ay gumagana nang walang camera -- o isang on-screen keypad gamit ang parehong alpabeto, auto-submitting sa 4 characters. Ito ay tumitingin sa code, ay nagpapakita ng mga bata na ina-pick up, at naghahatid ng **mga nakahuyang taong pickup** ng household bilang tappable cards sa tabi ng isang grid ng larawan ng mga adult ng household (plus isang "Iba" libreng-text option na ay fuzzy-checked laban sa hindi-authorized names -- tingnan ang [Nakatitiwala at hindi-authorized pickup](#trusted-and-not-authorized-pickup)), pagkatapos ay nagpo-post ng `POST /attendance/visits/checkout` na may pangalan/id ng picker. Sa manned mode ang screen ay nag-aalok din ng **Pahina ng isang magulang** (`POST /attendance/checkin/page`) at isang **security-label reprint** -- ang `reprint()` ay muling bumubuo ng mga label ng pamilya na may `LabelHelper.getAllLabelsFor(...)` at nagpadala sa kanila sa pamamagitan ng parehong `PrintUI` pipeline bilang check-in.

Ang kaluluwa ng istasyon ay isang AsyncStorage flag `@StationMode` (`"self"` | `"manned"`, toggled sa `app/adminSettings.tsx`). Ang manned mode ay nagdadagdag ng entry point ng check-out sa screen ng lookup at per-member profile editing (`POST /membership/people`) mula sa household screen. Ang kiosk hardening ay built-in: isang optional PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) ay nag-gate ng admin at printer screens, ang admin screen ay bubukas lamang sa pamamagitan ng 7 mabilis na tap sa header logo, at isang attract screen ng idle (`src/hooks/useInactivityTimer.ts`) ay nangunguna sa pagitan ng mga pamilya.

## Self check-in (B1App)

Ang mga miyembro ay nag-check-in mula sa b1.church portal sa `/mobile/checkin` screen (routed ng `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` sa `screens/CheckinPage.tsx`). Ito ay nangangailangan ng isang logged-in user at naglalakad sa parehong apat na hakbang bilang ang kiosk -- mga serbisyo → household → mga grupo → kumpletuhin -- laban sa parehong endpoints, na may state na inihawak sa `B1App/src/helpers/CheckinHelper.ts`. Ang mga pagkakaiba mula sa kiosk: ang household ay nagmula sa logged-in user ang sarili `householdId` (walang hakbang sa paghahanap), at walang pag-print ng label -- sa halip ang screen ng pagkumpleto ay nagpapakita ng batch security code bilang QR (`qrcode.react`) na may hint ng "ipakita ito sa station ng check-in". Kung ang household ay na-check-in na kapag ang pahina ay nag-load, isang pindutan ng "Ipakita ang check-in code" ay muling nagpapakita ng QR mula sa `securityCode` ng umiiral na bisita. Ang check-in ay itala kaagad sa submit time (walang pending state); ang QR lamang ay gumagawa ng pag-print ng label sa kiosk.

**Telefono-sa-kiosk label printing** (`B1Checkin/app/scan.tsx`, na maaabot mula sa "Scan code" pindutan sa screen ng lookup): ang kiosk ay bumubukas ng isang `expo-camera` `CameraView` (front-facing by default, flippable) scanning para sa QR codes. Ang scanned payload ay tinatanggap kapag ito ay isang bare 4-character code sa security-code alphabet, kaya ang parehong B1App QR at isang printed label ng QR block ay gumagana. Ang screen pagkatapos ay sumusunod sa check-out reprint path -- `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` -- at bumabalik sa lookup. Walang attendance write nangyayari sa scan time; mga label lamang. Ang mga code na walang aktibong bisita, mga istasyon na walang printer, at mga label-less na grupo ay bawat isa ay nagbubukas ng isang toast at bumabalik sa lookup.

Ang mga uri at `ApiHelper`/`ArrayHelper` ay nagmula sa `@churchapps/helpers` at `@churchapps/apphelper`; walang React components ay ibinabahagi sa B1Admin.

## Admin-side attendance (B1Admin)

- **Setup** -- `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) ay gumagawa ng rendering ng structure tree at lumilikha ng mga serbisyo (`ServiceEdit.tsx`) at oras ng serbisyo (`ServiceTimeEdit.tsx`). Ang Campus data ay nagmula sa pagsasama sa pamamagitan ng `useCampuses()` hook.
- **Manual attendance** ay buhay sa Mga Grupo side, hindi ang attendance section: `B1Admin/src/groups/components/GroupSessionsTab.tsx` ay lumilikha ng mga session (`POST /attendance/sessions`) at minarkahan ang mga taong present sa pamamagitan ng `POST /attendance/visitsessions/log`, na nakahanap-o-lumilikha ng bisita para sa taong iyon at session. Ang mga lider ng grupo ay maaaring mag-record ng attendance para sa sarili nilang mga grupo nang walang `attendance.edit` permission -- ang mga controller ay sinusuri ang `au.leaderGroupIds`.
- **Ulat** -- ang attendance trend at group attendance ay server-defined reports (`B1Admin/src/components/reporting/ReportWithFilter.tsx` laban sa ReportingApi); ang per-person history ay `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Pag-print ng Label

### Mga template at ang designer

Ang mga simbahan ay nagdisenyo ng sarili nila mga label sa B1Admin sa `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, na maaabot mula sa pahina ng Check-In settings). Ang template ay isang `labelTemplates` row na ang `content` ay isang JSON array ng blocks -- `text`, `field`, `barcode`, `qrcode`, o `box` -- bawat isa na positioned sa percent coordinates na may font, alignment, symbology (`code39`/`code128`/`qr`), at optional na visibility conditions (hal. render lamang ang allergy box kapag ang `person.nametagNotes` ay non-empty). Ang dalawang `labelType`s ay umiiral: `nametag` (isa bawat checked-in person; fields tulad ng `person.displayName`, `sessions`, `securityCode`) at `pickup` (isa bawat pamilya; fields tulad ng `children`, `childrenAllergies`). Ang server ay nagpapatupad ng isang default sa bawat uri bawat simbahan (`LabelTemplateController.save`). Ang designer ay naghahatid ng starter templates na sumasalamin sa bundled labels ng kiosk at mga preview laban sa sample data.

### Pag-render at pag-print sa kiosk

Sa check-in completion, `B1Checkin/src/helpers/LabelHelper.ts` ay nagsasagawa ng mga desisyon kung ano ang mag-print mula sa mga flag ng grupo sa bawat pending visit: mga nametag para sa `printNametag` na mga grupo, plus isa pamilya pickup label kung ang anumang bisita ay tumama sa isang `parentPickup` grupo. Ang security code mula sa check-in response ay napupunta sa child nametags at ang pickup label; ang adult nametags ay nag-print nang walang code. Kung ang simbahan ay may mga template, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) ay nagiging mga blocks + isang field context sa isang standalone HTML document; sa ibang paraan bundled HTML labels sa `B1Checkin/assets/labels/` ay ginagamit na may placeholder substitution.

Ang mga barcode ay nabuo bilang inline SVG ng pure-TypeScript encoders sa `B1Checkin/src/helpers/barcode.ts` -- Code 39 pattern tables at Code 128 (code set B na may mod-103 checksum) width tables, plus QR sa pamamagitan ng `qrcode` package. **Ang mga encoder na ito ay intentionally duplicated sa B1Admin** (`LabelEditor.tsx` inlines ang parehong mga talahanayan, napansin sa code comment) kaya ang designer previews ay pixel-faithful sa kiosk output; isang pagbabago sa isa ay dapat na salamin sa ibang.

Ang print pipeline (`src/components/PrintUI.tsx`) ay gumagawa ng bawat HTML label sa `WebView`, kumukuha nito sa JPG sa pamamagitan ng `react-native-view-shot`, at naghahatid ng mga image URIs sa native **printer-helper** Expo module (`B1Checkin/modules/printer-helper/`). Ang module ay nagbubunyag ng `scan()`, `checkInit()`, `printUris()`, at status events, na may provider bawat brand sa parehong mga platform:

| Brand | Android | iOS | Notes |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | QL-series network printers (QL-800/810W/820NWB/1100/1110NWB…), die-cut 29×90 labels, ang inirerekomendang default |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Network discovery + TCP/ZPL image printing |

Ang pagpili ng printer ay buhay sa `app/printers.tsx` (ang network scan ay nagbabalik ng `brand~model~ip` entries; ang pagpili ay nanatili sa AsyncStorage), at `src/helpers/PrinterLog.ts` ay nagpapanatili ng isang on-device diagnostic log na ibinahagi sa pamamagitan ng isang live status dot sa header ng kiosk.

## Guest registration

Dalawang landas ang lumilikha ng isang tao mid-check-in:

- **Sa kiosk** -- ang household screen's "Add guest" ay bumubukas ng `B1Checkin/app/addGuest.tsx`, na unang naghahanap ng `GET /membership/people/search?term=` para sa isang umiiral na non-member match at sa ibang paraan lumilikha ng isa na may `POST /membership/people`, na nakakabit sa kasalukuyang household. Ang bisita pagkatapos ay umaagos sa pamamagitan ng assignment ng grupo tulad ng anumang miyembro.
- **Self-serve sa pamamagitan ng QR** -- kapag ang church setting na `enableQRGuestRegistration` ay bukas (configured sa B1Admin's Check-In settings, basahin mula sa `GET /membership/settings/public/{churchId}`), ang kiosk lookup screen ay nagpapakita ng QR code na naka-link sa `https://{subdomain}.b1.church/guest-register?serviceId=`. Ang B1App page (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) ay nagbibigay-daan sa isang bumibisitang pamilya na magparehistro sa kanilang sarili sa kanilang sariling telepono sa pamamagitan ng anonymous `POST /membership/people/guest-register` endpoint, na pinanatili ang kiosk line na gumagalaw.

## Mga Kaugnay na Pahina

- [Attendance Endpoints](../api/endpoints/attendance) -- Buong REST surface para sa mga kampus, mga serbisyo, mga session, mga bisita, at bisita sessions
- [Membership Endpoints](../api/endpoints/membership) -- Mga tao, household, at mga grupo
- [Webhooks](../api/webhooks) -- Ang `session.created`, `attendance.recorded`, at `attendance.checkout` na mga kaganapan
- [Module Structure](../api/module-structure) -- Kung paano ang attendance module ay inayos server-side
