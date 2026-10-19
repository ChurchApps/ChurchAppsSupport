---
title: "Check-Ins"
---

# Check-Ins

<div class="article-intro">

Isang sistema ang check-in na may tatlong pintuan: ang B1Checkin kiosk app para sa mga istasyong may staff at self-serve, self check-in sa loob ng B1App member portal, at attendance sa panig ng admin sa B1Admin. Lahat ng tatlo ay sumusulat sa iisang attendance module sa core Api, at ang routing ng classroom ay ganap na pinapatakbo ng Groups -- walang hiwalay na entity na "locations" o "rooms". May child-safety layer sa ibabaw nito: check-in types kada pagbisita, capacity at volunteer-ratio gate sa server, eligibility ayon sa edad/grade sa kiosk, trusted-pickup verification sa check-out, at parent paging sa pamamagitan ng texting provider ng simbahan. Inilalarawan ng pahinang ito ang data model, mga daloy ng check-in, ang safety layer, at ang label printing pipeline.

</div>

## Pangkalahatang Tanaw

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

| Surface | Repo | Stack | Tungkulin |
|---------|------|-------|------|
| Kiosk | `B1Checkin` | Expo / React Native, expo-router file routing; EAS builds for Android, Amazon Fire, and iOS; OTA updates via `expo-updates` | Istasyong may staff o self-serve na may label printing at na-verify na check-out |
| Self check-in | `B1App` | Next.js (b1.church member portal) | Naka-log in na miyembro ang nagche-check in ng kanilang household mula sa telepono; walang printing |
| Admin | `B1Admin` | React SPA | Nagko-configure ng istruktura ng serbisyo, nag-a-assign ng mga grupo sa service time, nagdidisenyo ng label, nagtatala ng manual na attendance, nagpapatakbo ng mga report |

Lahat ng tatlo ay tumatawag sa parehong dalawang API module sa pamamagitan ng `ApiHelper`: **MembershipApi** (`/membership`) para sa mga tao, household, at grupo; **AttendanceApi** (`/attendance`) para sa lahat ng nasa ibaba.

## Modelo ng Data (`Api/src/modules/attendance`)

| Entity / table | Mga pangunahing field | Kahulugan |
|----------------|-----------|---------|
| `campuses` | name, address | Deprecated dito -- ang mga campus ay minamaster sa membership module (`/membership/campuses`); ang kopya sa attendance ay naka-freeze na read-only para sa mga legacy reader (`models/Campus.ts`) |
| `services` | campusId, name | Isang paulit-ulit na pagtitipon, halimbawa "Sunday Morning" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Isang time slot sa loob ng isang service, halimbawa "9:00 AM" (`models/ServiceTime.ts`). Opsyonal ang mga schedule column (migration `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) at ang mga ito ang nagpapatakbo ng [check-in window](#scheduled-check-in-windows) |
| `groupServiceTimes` | groupId, serviceTimeId | Join table: aling mga grupo (classroom) ang nagtitipon sa aling service time (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Isang pagpupulong ng isang grupo sa isang petsa -- lazy na ginagawa sa oras ng check-in (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Isang tao na dumalo sa isang petsa (`models/Visit.ts`). Ang `checkinType` ay `member` / `guest` / `volunteer` (NULL = legacy member), itinakda ng kiosk at ginagamit ng capacity/ratio gate |
| `visitSessions` | visitId, sessionId | Aling session(s) ang sakop ng isang visit -- ang batang nag-check in sa dalawang service time ay may dalawang row (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON blocks) | Mga label layout na maaaring idisenyo (`models/LabelTemplate.ts`) |

### Paano Sine-save ang Kumpletong Check-in

Hinahawakan ng `VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) ang `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Ang body ay array ng mga `Visit` object, na bawat isa ay may `visitSessions` na ang naka-embed na `session` ay tumutukoy lang sa isang pares na `(serviceTimeId, groupId)`. Pagkatapos, ang server ay:

1. **Gina-gate ang capacity at ratio bago ang anumang write.** Tinatawag ng `evaluateGates()` ang `CheckinGateHelper.evaluate()`, na tinitingnan ang capacity, guest capacity, closed flag, at volunteer ratio ng bawat targeted room laban sa kasalukuyang occupancy. Hindi transactional ang postCheckin, kaya dapat tumakbo ang gate bago ang unang save -- ang malinaw na paglabag ay nagbabalik ng 409 na tumutukoy sa (mga) apektadong room at walang nase-save. Tingnan ang [Capacity and volunteer-ratio gates](#capacity-and-volunteer-ratio-gates).
2. **Lazy na nireresolba ang mga session.** Hinahanap o ginagawa ng `getSessionId()` ang row ng `sessions` para sa `(groupId, serviceTimeId, today)` -- naka-cache sa proseso ang mga session id kada petsa. Ang mga bagong session ay naglalabas ng `session.created` webhook. Ang loop ay awaited na `for..of` -- ang dating fire-and-forget na `forEach(async …)` ay nag-race sa save at nagsulat ng NULL sessionId sa unang paggawa ng session (naayos na; nakasaad sa code comment sa loop).
3. **Pinapalitan ang mga record ng araw.** Ang anumang umiiral na visit ng mga taong iyon sa service na iyon ngayon ay binubura kasama ng kanilang visitSessions, at saka sine-save ang isinumiteng set. Kaya ang muling pag-check in ng isang pamilya ay isang idempotent na operasyon na "ito na ang kasalukuyang estado", hindi append. Ang pagpasa ng `?checkDuplicates=true` ay nagbabalik ng `{ duplicates: [personId…] }` nang hindi nagsusulat, at ito ang paraan ng kiosk para magbabala bago mag-overwrite.
4. **Gumagawa ng isang security code kada batch.** Gumagawa ang `SecurityCodeHelper.generate()` ng 4-character na code mula sa alpabetong `23456789BCDFGHJKLMNPQRSTVWXYZ` (walang patinig o nakakalitong character, kaya hindi makakabuo ng salita ang mga code at hindi madaling mabasang mali). Nagre-retry ang server kapag nagkabanggaan sa mga bukas na visit ngayong araw ng parehong simbahan, at ini-stamp ang code sa bawat visit sa batch.
5. **Nagbabalik ng `{ streaks, securityCode }`.** Ang `streaks` ay nagmamapa ng personId sa bilang ng sunud-sunod na linggong pagdalo; ipinagdiriwang ng kiosk ang mga milestone (bawat ika-5 linggo) gamit ang confetti.

Bawat na-save na visit ay naglalabas din ng `attendance.recorded` webhook. Ang read side, `GET /attendance/visits/checkin`, ay nagbabalik ng mga visit ng mga tao mula sa kanilang **huling naitalang petsa** -- kung nakaraang linggo iyon, tinatanggal ang mga id, kaya ang client ay tumatanggap ng pre-filled na kopya ng mga pinili nilang room noong nakaraang linggo na magse-save bilang bagong record.

### Check-out

Dalawang endpoint ang nagsasara ng loop (`VisitController`):

- `GET /attendance/visits/code/:code` -- Ang mga visit ngayong araw na hindi pa na-check out at may dalang security code na iyon, kasama ang mga session.
- `POST /attendance/visits/checkout` -- Body na `{ visitIds, checkedOutBy?, checkedOutById? }`; nagse-stamp ng `checkoutTime` at kung sino ang nagsundo, at naglalabas ng `attendance.checkout` webhook kada visit.

Mga permission: nag-a-authenticate ang mga kiosk gamit ang `attendance.checkin`, na nagbibigay ng eksaktong check-in/check-out/label-template surface; sakop ng `attendance.view`/`attendance.edit` ang reporting at manual na pagpapasok; ang istruktura (services, service times, group assignment) ay nangangailangan ng `services.edit`. Hindi nangangailangan ng anumang permission ang member self check-in (B1App): sinumang naka-authenticate na user na may naka-link na tao sa simbahan ay puwedeng tumawag sa `GET`/`POST /attendance/visits/checkin`, at nililimitahan ng server ang isinumiteng `personId` sa sariling household ng tumatawag (403 kung hindi -- ang bakod na ito ang pumipigil na mabasa ng ibang pamilya ang kanilang `securityCode`). Ang pagiging miyembro ang nagbibigay ng pahintulot; ang pagkakita ng mga miyembro sa feature ay kinokontrol ng mga B1App navigation tab ng simbahan. Ang iba pang check-in endpoint (`code/:code`, `checkout`, `guardians`, `CheckinController`) ay para sa kiosk/staff lang.

## Ginagabayan ng Mga Grupo ang Routing

Walang room o classroom entity saanman sa sistema. Ang "room" ay isang membership **group** na naka-enable ang `trackAttendance`, na naka-link sa isa o higit pang service time sa pamamagitan ng `groupServiceTimes`. Ang mga field ng grupo (sa `Api/src/modules/membership/models/Group.ts`) na humuhubog sa kilos ng kiosk:

| Field | Epekto |
|------|--------|
| `trackAttendance` | Lumalahok ang grupo sa attendance; ang setup tree ng B1Admin ay minamarkahan ang mga `trackAttendance` na grupong walang row sa `groupServiceTimes` bilang hindi naka-assign |
| `parentPickup` | Minamarkahan ang isang child room: ang check-in dito ay ginagawang "child" visit, na nagpi-print ng family pickup label at naglalagay ng security code sa nametag |
| `printNametag` | Kung ang mga check-in sa grupong ito ay nagpi-print ng nametag |
| `capacity` / `guestCapacity` / `checkinClosed` | Mga limitasyon sa kapasidad ng room at isang mahigpit na "closed" switch, ipinapatupad sa server ng check-in gate (ine-edit sa group settings ng B1Admin sa ilalim ng "Check-In Capacity") |
| `volunteerRatio` / `minVolunteers` | Ratio ng bata sa bawat volunteer at minimum na bilang ng volunteer, ipinapatupad ayon sa church-wide na setting na `ratioEnforcement` |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Mga hangganan ng eligibility ayon sa edad/grade, sinusuri sa kiosk para i-highlight o i-dim ang mga room |

Pare-parehong denormalize ng bawat client ang data (halimbawa, `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): i-load nang sabay-sabay ang `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes`, at `GET /membership/groups`, pagkatapos para sa bawat service time, kolektahin ang mga grupong ang row sa `groupServiceTimes` ay tumuturo rito sa `serviceTime.groups`. Ang array na ito ang ipinapakita ng room picker, nakaayos ayon sa `categoryName` ng grupo.

Ine-edit ang mga assignment mula sa pahina ng grupo sa B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` -- `POST`/`DELETE /attendance/groupservicetimes`), at ang buong Campus → Service → Service Time → Group tree ay nakikita sa `B1Admin/src/attendance/components/AttendanceSetup.tsx` sa pamamagitan ng `GET /attendance/attendancerecords/tree`.

:::info
Dahil ang mga grupo ang iisang pinagmumulan ng katotohanan, ang parehong membership ng grupo ang nagpapatakbo ng kiosk routing, attendance na tulad ng roster sa mga pahina ng grupo ng B1Admin, at attendance reporting -- ang pag-assign ng grupo sa isang service time ang tanging hakbang na kailangan para maging destinasyon ng check-in ito.
:::

## Child Safety

### Mga Uri ng Check-in

Bawat visit ay may dalang `checkinType` -- `member`, `guest`, o `volunteer` (ang NULL ay nangangahulugang legacy/member; migration `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Pinipili ang uri **sa panig ng kiosk**: ang mga chip na Member / Guest / Volunteer sa pinalawak na row ng miyembro (`B1Checkin/src/components/MemberServiceTimes.tsx`), at iniistamp sa bawat pending visit sa pagkumpleto (`app/checkinComplete.tsx`, default na `member`). Ginagamit ito ng server sa gate -- ang mga volunteer ay nabibilang sa ratio coverage sa halip na laban sa capacity, at ang mga guest ay binibilang laban sa `guestCapacity`.

### Capacity at Volunteer-Ratio Gate {#capacity-and-volunteer-ratio-gates}

Tumatakbo ang `CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) sa loob ng `postCheckin` bago ang anumang save (non-transactional ang endpoint, kaya ang gating-bago-ang-save ang mekanismo ng kawastuhan). Kinukuha nito ang kasalukuyang occupancy ng bawat targeted na grupo (`VisitRepo.countActiveByGroupToday`) at ang config ng grupo sa pamamagitan ng membership module gateway, pagkatapos ay ini-classify ang mga paglabag:

- **Mahigpit (laging hinaharangan):** `checkinClosed`, `current + incoming > capacity`, bilang ng guest na lumampas sa `guestCapacity`. Tinatanggihan ang batch gamit ang `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` -- ipinapakita ng kiosk ang pangalan ng room.
- **Ratio (nagbababala o nagbablock):** mga hindi-volunteer na papasok sa room kung saan `volunteers < minVolunteers`, walang volunteer, o `children > volunteers × volunteerRatio`. Sumusunod ang kalubhaan sa per-church na setting na `ratioEnforcement` (`"warn"` ang default / `"block"`, ine-edit sa B1Admin Manage Church → Check-In, `CheckinSettingsEdit.tsx`). Sa warn mode, nagbabalik ng `409 { warning: true, error: "ratio", … }` maliban kung muling isumite ng client gamit ang `acknowledgeWarnings=true` -- ang muling pagsusumite ang override ng staff-confirm ng kiosk.

### Mga Scheduled na Check-in Window {#scheduled-check-in-windows}

Maaaring magdala ang isang service time ng opsyonal na lingguhang schedule (`dayOfWeek` 0–6 na may 0 = Linggo, `startTime`/`endTime` bilang `HH:mm`, `checkinOpenMinutes`, `checkinCloseMinutes`), na ine-edit sa form ng service-time sa **Attendance → Setup** ng B1Admin (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, "Check-in Schedule"). Tinuturing lang ng `CheckinGateHelper.hasSchedule()` na may schedule ang isang service time kapag parehong nakatakda ang `dayOfWeek` at `startTime`; hindi kailanman sine-gate ayon sa oras ang mga walang schedule. Kinukwenta ng `isServiceTimeOpen()` ang window sa oras ng simbahan (`DateHelper.toChurchTime`). Ang time zone ay ang `timeZone` ng simbahan; ang mga simbahang walang nakatakda ay babagsak sa unang hindi-tinanggal na campus na may `timezone` (`MembershipModuleGateway.loadCampusTimeZone`), at saka lang sa `America/New_York`. Pareho ang paraan ng pag-resolve ng listing at posting path sa ibaba mula sa `checkinOpenMinutes` bago ang simula hanggang `checkinCloseMinutes` pagkatapos ng pagtatapos (o pagkatapos ng simula kapag walang pagtatapos), at kinakaya ang mga window na tumatawid sa hatinggabi o sa hangganan ng linggo.

Ipinapatupad ang window sa dalawang lugar:

- **Listing:** Nilalagyan ng `GET /attendance/servicetimes` ang bawat row ng kinwentang boolean na `checkinOpen`. Parehong inaalis ng self check-in ng B1App (`CheckinPage.tsx`) at ng service picker ng B1Checkin (`app/services.tsx`) ang mga oras na may `checkinOpen === false`, at nagpapakita ng "Check-in isn't open for this service right now." kapag may oras ang serbisyo pero walang bukas (may Back button ang kiosk para pumili ng ibang serbisyo).
- **Posting:** sa loob ng `evaluateGates()`, bago ang capacity/ratio evaluation, tinatanggihan ng `findClosedServiceTimeGroups()` ang batch gamit ang `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` kung ang service time ng alinmang targeted session ay nasa labas ng window nito. Ipinapakita ito ng B1Checkin sa pamamagitan ng hard-gate screen nito na may dahilang "check-in isn't open right now" (ang mga paglabag sa capacity ay nagsasabing "room is full or closed").

### Eligibility ayon sa Edad/Grade (sa Kiosk) {#agegrade-eligibility-kiosk-side}

Advisory UI lang ang eligibility ng room, sinusuri sa kiosk, hindi ipinapatupad ng server. Inihahambing ng `B1Checkin/src/helpers/EligibilityHelper.ts` ang birthdate/grade ng tao laban sa `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` ng grupo (pagkakasunod ng grade: PreK, K, 1–12, Graduated) at nagbabalik ng `eligible` / `ineligible` / `unknown` -- ang kawalan ng datos ay nagbubunga ng `unknown` at hindi kailanman nagtatago ng room. Kinakalkula ang edad at grade bilang ng **grade promotion date** ng simbahan (setting na `gradePromotionDate`, `"MM-DD"`, ine-edit sa `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); kinukuha ito ng kiosk mula sa `GET /attendance/checkin/settings`, at pinipili ng `resolveAsOfDate` ang pinakabagong pagkakataon na nasa o bago ngayon. Hini-highlight ng room picker ang mga eligible na room at dinidim ang mga ineligible; ang pagpili ng dimmed na room ay nangangailangan ng staff confirmation.

### Pinagkakatiwalaan at Hindi Awtorisadong Pagsundo {#trusted-and-not-authorized-pickup}

Ang mga taong susundo ay isang membership entity, bawat household: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` -- householdId, opsyonal na personId, name, photoUrl, relationship, `status` na `trusted` / `notAuthorized`, notes). Ang CRUD ay `GET /membership/householdpickup/:householdId` (sinumang naka-authenticate na user ng simbahan, para mabasa ito ng mga kiosk) at `POST` / `DELETE` na nangangailangan ng `people.edit`. Pinamamahalaan ng staff ang listahan sa card na **Pickup** ng pahina ng tao (`B1Admin/src/people/components/PickupPeople.tsx`) -- larawan, relationship, at isang status chip na Trusted/Not Authorized.

Sa check-out (`B1Checkin/app/checkout.tsx`), ni-load ng kiosk ang listahan ng sundo ng household: ang mga entry na `trusted` ay lumalabas bilang mga pindutin-na pickup card kasama ang photo grid ng mga adult ng household, at ang malayang tinype na pangalang "Other" ay fuzzy-matched (Levenshtein, `src/helpers/PickupMatchHelper.ts`) laban sa mga entry na `notAuthorized` -- ang match ay humaharang sa check-out gamit ang warning sheet at isang staff na button na **Override**. Naitatala ang override sa mismong visit: ipinapadala nito ang `checkedOutBy` bilang `"OVERRIDE: {name}"` sa normal na `POST /attendance/visits/checkout`, kaya napupunta ito sa attendance record at sa `attendance.checkout` webhook sa halip na sa hiwalay na audit table.

### Page-a-Parent at Emergency Broadcast

Naglalantad ang `CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) ng dalawang SMS endpoint:

- `POST /page` -- `{ visitId, message }`: nagpe-page sa mga guardian ng isang check-in na bata (check-out screen ng kiosk, manned mode).
- `POST /broadcast` -- `{ serviceId, message }`: nagte-text sa mga adult ng bawat check-in na household para sa isang serbisyo (admin settings ng kiosk, sa likod ng sheet na type-`EMERGENCY`-to-confirm sa `B1Checkin/app/adminSettings.tsx`).

Parehong nire-resolve ng dalawa ang mga adult ng household sa pamamagitan ng membership gateway, pagkatapos ay ibinibigay ang paghahatid sa **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) -- ang cross-module na pintuan papunta sa naka-configure na texting provider ng simbahan (`@churchapps/texting`: TextInChurch, Clearstream, o MutualMinistry; walang built-in na SMS sender). Naglalagay ang gateway ng row na `sentText` kasama ang per-recipient na `deliveryLog` na entry at naglilimita ng batch sa 500 tatanggap; kapag walang naka-configure na provider, nagbabalik ito ng `no_provider`, na ipinapakita ng kiosk bilang "No SMS provider configured". Dinededupe ng `dispatch()` ng controller ang mga numero ng telepono at nilalaktawan ang mga taong walang mobile o may `optedOut`, at nagbabalik ng `{ sent, failed, skippedOptedOut, skippedNoPhone }` para maipakita ng kiosk kung ano ang nilaktawan.

## Ang Kiosk (B1Checkin)

Ang mga screen ay expo-router file sa ilalim ng `B1Checkin/app/`; ang state na nagtatawid ng mga screen ay nasa static na `CachedData` class (`src/helpers/CachedData.ts`), hindi sa React state.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Lookup** (`app/lookup.tsx`) -- Maghanap sa pamamagitan ng telepono (`GET /membership/people/search/phone?number=`, huling 4 o buo) o pangalan (`GET /membership/people/search?term=`). Ang pagpili ng tugma ay nag-lo-load ng household (`GET /membership/people/household/{householdId}`) at mga umiiral na visit (`GET /attendance/visits/checkin`), na naglalagay ng `pendingVisits` sa mga pinili noong nakaraang linggo.
2. **Pagrepaso ng household** (`app/household.tsx`, `src/components/MemberList.tsx`) -- Ang bawat row ng miyembro ay may badge na naka-check in na, badge ng allergy/`nametagNotes`, at mga kasalukuyang room chip nila. Ang pagpapalawak ng isang miyembro ay naglilista ng bawat service time na may room button kasama ang mga chip ng check-in type na Member / Guest / Volunteer (`MemberServiceTimes.tsx`). Sa ilalim ng pangalan ng bawat service time, ipinapakita ng `ServiceTimeHelper.getGroupSummary()` ang mga grupong inaalok doon (ang mga pangalan sa `serviceTime.groups`, na tinrim, de-duplicated nang hindi sensitibo sa case, pinagsama gamit ang kuwit); walang lumalabas kapag walang grupo ang oras.
3. **Pag-assign ng grupo** (`app/selectGroup.tsx`) -- Isang category tree na binuo mula sa `serviceTime.groups`, kung saan naka-highlight ang mga room na eligible ayon sa edad/grade at dinidim ang mga ineligible sa likod ng staff confirm (tingnan ang [Eligibility ayon sa Edad/Grade](#agegrade-eligibility-kiosk-side)); ang pagpili ng room ay sumusulat ng `{ session: { serviceTimeId, groupId } }` na visitSession sa pending visit ng taong iyon (`src/helpers/VisitSessionHelper.ts`). Ang "None" ay nagkakansela nito.
4. **Kumpleto** (`app/checkinComplete.tsx`) -- `POST /attendance/visits/checkin` gamit ang `pendingVisits` (bawat isa ay may `checkinType`), pagkatapos ay nagpi-print ng mga label kung may naka-configure na printer at kusang bumabalik sa lookup. Ang tugon na `409` para sa capacity o `notOpen` ay nagpapakita ng pangalan ng room kasama ang dahilan (puno/sarado, o hindi bukas ang check-in); ang ratio warning ay nag-aalok ng staff confirm na muling nagsusumite gamit ang `acknowledgeWarnings=true`.

Ang screen ng **check-out** (`app/checkout.tsx`) ay tumatanggap ng 4-character na security code sa pamamagitan ng input na awtomatikong naka-focus -- kaya gumagana ang USB/Bluetooth na keyboard-wedge na barcode scanner nang walang camera -- o isang on-screen na keypad na gumagamit ng parehong alpabeto, na kusang nagsusumite sa 4 na character. Nagbubukas ang button na **Scan** ng sheet na may shared na camera na `src/components/CodeScanner.tsx` (back-facing bilang default, tumatanggap ng QR, Code 128, at Code 39) para sa mga istasyong walang wedge scanner na makabasa ng pickup label; ang na-scan na code ay dumadaan sa parehong `handleCode()` path tulad ng na-type na input. Hinahanap nito ang code, ipinapakita ang mga batang susunduin, at inilalatag ang **trusted pickup people** ng household bilang mga pindutin-na card kasama ang photo grid ng mga adult ng household (kasama ang opsyong "Other" na libreng teksto na fuzzy-checked laban sa mga pangalang not-authorized -- tingnan ang [Pinagkakatiwalaan at Hindi Awtorisadong Pagsundo](#trusted-and-not-authorized-pickup)), pagkatapos ay nagpo-post ng `POST /attendance/visits/checkout` gamit ang pangalan/id ng pinili. Sa manned mode, nag-aalok din ang screen ng **Page a parent** (`POST /attendance/checkin/page`) at isang **security-label reprint** -- muling binubuo ng `reprint()` ang mga label ng pamilya gamit ang `LabelHelper.getAllLabelsFor(...)` at ipinapasa ang mga ito sa parehong `PrintUI` pipeline ng check-in.

Ang personalidad ng istasyon ay isang AsyncStorage flag na `@StationMode` (`"self"` | `"manned"`, pinapalitan sa `app/adminSettings.tsx`). Idinadagdag ng manned mode ang entry point ng check-out sa lookup screen at ang per-member na pag-edit ng profile (`POST /membership/people`) mula sa household screen. Naka-built in ang kiosk hardening: isang opsyonal na PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) ang nagpoprotekta sa admin at printer screen, bumubukas lang ang admin screen sa 7 mabilis na tap sa logo ng header, at isang idle attract screen (`src/hooks/useInactivityTimer.ts`) ang pumapalit sa pagitan ng mga pamilya.

## Self Check-in (B1App)

Nagche-check in ang mga miyembro mula sa b1.church portal sa `/mobile/checkin` screen (dinidirekta ng `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` sa `screens/CheckinPage.tsx`). Nangangailangan ito ng naka-log in na user at dinadaanan ang parehong apat na hakbang ng kiosk -- services → household → groups → complete -- laban sa magkakaparehong endpoint, na may state na hawak sa `B1App/src/helpers/CheckinHelper.ts`. Ang mga pagkakaiba sa kiosk: ang household ay nagmumula sa sariling `householdId` ng naka-log in na user (walang hakbang sa paghahanap), at walang label printing -- sa halip, ipinapakita ng completion screen ang security code ng batch bilang QR (`qrcode.react`) na may hint na "show this at a check-in station". Kung naka-check in na ang household kapag na-load ang pahina, muling ipinapakita ng button na "Show check-in code" ang QR mula sa unang umiiral na visit (mula sa `GET /attendance/visits/checkin`) na may dalang `securityCode`. Naitatala agad ang check-in sa oras ng pagsusumite (walang pending state); ang QR ay nagpapatakbo lang ng label printing sa kiosk.

**Phone-to-kiosk na label printing** (`B1Checkin/app/scan.tsx`, na naaabot mula sa button na "Scan code" ng QR sa lookup screen): ipinapakita ng kiosk ang `CodeScanner` (isang `expo-camera` `CameraView`, front-facing bilang default, nababaligtad) na nag-i-scan ng QR code. Tumatanggap ang `ScanCodeHelper.parse()` ng payload lang kapag ito ay bare na 4-character na code sa alpabeto ng security code, at binabalewala ng `ScanCodeHelper.isRepeat()` ang parehong code sa loob ng 4 na segundo, kaya gumagana ang QR ng B1App at ang QR block ng naka-print na label. Sumusunod pagkatapos ang screen sa reprint path ng check-out -- `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` -- at bumabalik sa lookup. Walang attendance write na nangyayari sa oras ng scan; labels lang. Ang mga code na walang aktibong visit, mga istasyong walang printer, at mga grupong walang label ay bawat isa ay nagpapakita ng toast at bumabalik sa lookup.

Ang mga type at `ApiHelper`/`ArrayHelper` ay galing sa `@churchapps/helpers` at `@churchapps/apphelper`; walang React component na ibinabahagi sa B1Admin.

## Attendance sa Panig ng Admin (B1Admin)

- **Setup** -- `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) ay nagre-render ng structure tree at gumagawa ng mga service (`ServiceEdit.tsx`) at service time (`ServiceTimeEdit.tsx`). Ang data ng campus ay galing sa membership sa pamamagitan ng hook na `useCampuses()`.
- **Manual na attendance** ay nasa panig ng Groups, hindi sa attendance section: gumagawa ang `B1Admin/src/groups/components/GroupSessionsTab.tsx` ng mga session (`POST /attendance/sessions`; kapag nagdadagdag, maaaring isama ng `SessionEdit.tsx` ang isang session para sa bawat ibang grupong kasama sa piniling service time, nilalaktawan ang mga grupong may session na sa petsang iyon) at minamarkahang present ang mga tao sa pamamagitan ng `POST /attendance/visitsessions/log`, na naghahanap o gumagawa ng visit para sa taong iyon at session na iyon. Maaaring magtala ng attendance ang mga group leader para sa sarili nilang grupo nang walang permission na `attendance.edit` -- tinitingnan ng mga controller ang `au.leaderGroupIds`.
- **Reporting** -- ang trend ng attendance at group attendance ay mga report na tinutukoy ng server (`B1Admin/src/components/reporting/ReportWithFilter.tsx` laban sa ReportingApi; mga definition sa `Api/reports/*.json`). Parehong tumatanggap ng `startDate`/`endDate` (kasama ang end date); ang trend report ay nagde-default mula isang taon ang nakalipas hanggang ngayon at nagdaragdag ng per-week na column na `sessionDates`, at ang on-screen tree ng group attendance ay may kasamang `checkinTime` ng bawat visit at `membershipStatus` ng tao. Ang CSV ng group attendance ay galing sa kasamang report na `groupAttendanceDownload`, na pina-pivot ng `GroupAttendanceDownloadHelper` sa isang row kada miyembro ng grupo na may column na present/absent para sa bawat petsang session; ang kasaysayan ng bawat tao ay `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Label Printing

### Mga Template at ang Designer

Dinidisenyo ng mga simbahan ang sarili nilang label sa B1Admin sa `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, na naaabot mula sa pahina ng settings ng Check-In). Ang template ay isang row ng `labelTemplates` na ang `content` ay JSON array ng mga block -- `text`, `field`, `barcode`, `qrcode`, o `box` -- na bawat isa ay nakaposisyon sa percent coordinates na may font, alignment, symbology (`code39`/`code128`/`qr`), at opsyonal na visibility condition (halimbawa, ipakita lang ang allergy box kapag may laman ang `person.nametagNotes`). May dalawang `labelType`: `nametag` (isa kada naka-check in na tao; mga field tulad ng `person.displayName`, `sessions`, `securityCode`, at `person.isBirthdayWeek` -- `"true"` kapag ang buwan/araw ng kaarawan ay nasa loob ng 3 araw mula ngayon, na bumabalot sa hangganan ng taon, kinakalkula ng `LabelHelper.isBirthdayWithin()`) at `pickup` (isa kada pamilya; mga field tulad ng `children`, `childrenAllergies`). Nagpapatupad ang server ng iisang default kada uri kada simbahan (`LabelTemplateController.save`). Kasama sa designer ang mga starter template na kapareho ng mga bundled label ng kiosk at nagpe-preview gamit ang sample data.

### Rendering at Printing sa Kiosk

Sa pagkumpleto ng check-in, nagpapasya ang `B1Checkin/src/helpers/LabelHelper.ts` kung ano ang ipi-print batay sa mga flag ng grupo sa bawat pending visit: mga nametag para sa mga grupong `printNametag`, at isang family pickup label kung may visit na tumama sa grupong `parentPickup`. Nilalaktawan ng `LabelHelper.selectChildVisits()` ang mga visit na may `checkinType` na `volunteer`, kaya hindi nagti-trigger ng pickup label ang isang childcare worker sa Parent Pickup room. Ang security code mula sa tugon ng check-in ay napupunta sa mga nametag ng bata at sa pickup label; ang mga nametag ng adult ay walang code. Kung may template ang simbahan, ginagawang standalone na HTML document ng `LabelRenderer` (`src/helpers/LabelRenderer.ts`) ang mga block + field context; kung wala, ginagamit ang mga bundled na HTML label sa `B1Checkin/assets/labels/` na may placeholder substitution.

Ginagawa ang mga barcode bilang inline SVG ng mga pure-TypeScript encoder sa `B1Checkin/src/helpers/barcode.ts` -- mga pattern table ng Code 39 at mga width table ng Code 128 (code set B na may mod-103 checksum), at QR sa pamamagitan ng package na `qrcode`. **Sadyang dinoble ang mga encoder na ito sa B1Admin** (`LabelEditor.tsx` ay naglalagay ng parehong table nang inline, nakasaad sa code comment) para maging pixel-faithful sa output ng kiosk ang mga preview ng designer; ang pagbabago sa isa ay dapat isalamin sa isa pa.

Ang print pipeline (`src/components/PrintUI.tsx`) ay nagre-render ng bawat HTML label sa isang `WebView`, kinukuha ito bilang JPG sa pamamagitan ng `react-native-view-shot`, at ibinibigay ang mga image URI sa native na Expo module na **printer-helper** (`B1Checkin/modules/printer-helper/`). Inilalantad ng module ang `scan()`, `checkInit()`, `printUris()`, at mga status event, na may provider bawat brand sa parehong platform:

| Brand | Android | iOS | Mga Tala |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Mga network printer ng QL-series (QL-800/810W/820NWB/1100/1110NWB…), die-cut na 29×90 na label, ang inirerekomendang default |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Network discovery + TCP/ZPL image printing |

Nasa `app/printers.tsx` ang pagpili ng printer (ang network scan ay nagbabalik ng mga entry na `brand~model~ip`; ang pinili ay sine-save sa AsyncStorage), at pinananatili ng `src/helpers/PrinterLog.ts` ang on-device na diagnostic log na ipinapakita sa pamamagitan ng live status dot sa header ng kiosk.

## Guest Registration

Dalawang paraan ang lumilikha ng tao sa gitna ng check-in:

- **Sa kiosk** -- Ang "Add guest" ng household screen ay nagbubukas ng `B1Checkin/app/addGuest.tsx`, na unang naghahanap sa `GET /membership/people/search?term=` ng umiiral na hindi-miyembrong tugma at kung wala, gumagawa ng bago gamit ang `POST /membership/people`, na nakakabit sa kasalukuyang household. Dumadaan ang guest sa pag-assign ng grupo tulad ng sinumang miyembro.
- **Self-serve sa pamamagitan ng QR** -- Kapag naka-on ang setting ng simbahan na `enableQRGuestRegistration` (naka-configure sa Check-In settings ng B1Admin, binabasa mula sa `GET /membership/settings/public/{churchId}`), ang lookup screen ng kiosk ay nagpapakita ng QR code na tumuturo sa `https://{subdomain}.b1.church/guest-register?serviceId=`. Ang pahinang iyon sa B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) ay nagpapahintulot sa bisitang pamilya na magparehistro sa sarili nilang telepono sa pamamagitan ng anonymous na endpoint na `POST /membership/people/guest-register`, na pinapanatiling umuusad ang pila sa kiosk. May button na **Register here** din ang QR sheet na nagbubukas ng parehong pahina sa kiosk (`app/guestRegister.tsx`) sa isang incognito, cache-disabled na `WebView`; ang `src/helpers/GuestRegisterHelper.ts` ang gumagawa ng URL para sa QR at sa WebView at hinaharangan ang navigation palabas sa `https://{subdomain}.b1.church/guest-register`. Bumabalik ang screen sa lookup sa **Done**, sa back, o pagkalipas ng 120 segundong walang aktibidad (ang pag-type sa form ay ipinapadala mula sa WebView bilang aktibidad), at inaalis ang WebView para hindi umabot sa susunod na pamilya ang mga entry ng isa.

## Mga Kaugnay na Pahina

- [Attendance Endpoints](../api/endpoints/attendance) -- Buong REST surface para sa campuses, services, sessions, visits, at visit sessions
- [Membership Endpoints](../api/endpoints/membership) -- People, households, at groups
- [Webhooks](../api/webhooks) -- Ang mga event na `session.created`, `attendance.recorded`, at `attendance.checkout`
- [Module Structure](../api/module-structure) -- Kung paano inoorganisa ang attendance module sa server side
