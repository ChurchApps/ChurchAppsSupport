---
title: "Mga Check-In"
---

# Mga Check-In

<div class="article-intro">

Iisang sistema ang check-in na may tatlong pintuan: ang B1Checkin kiosk app para sa mga staffed at self-serve na istasyon, ang self check-in sa loob ng B1App member portal, at ang attendance sa panig ng admin sa B1Admin. Lahat ng tatlo ay sumusulat sa parehong attendance module sa core Api, at ang routing ng silid-aralan ay ganap na pinapatakbo ng Groups -- walang hiwalay na entity na "locations" o "rooms". May child-safety layer sa ibabaw nito: mga uri ng check-in kada pagbisita, server-side na capacity at volunteer-ratio gate, kiosk-side na pagsusuri ng edad/grade, trusted-pickup verification sa check-out, at parent paging sa pamamagitan ng texting provider ng simbahan. Inilalarawan ng pahinang ito ang data model, mga daloy ng check-in, safety layer, at label printing pipeline.

</div>

## Pangkalahatang-tanaw

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

| Surface | Repo | Stack | Papel |
|---------|------|-------|------|
| Kiosk | `B1Checkin` | Expo / React Native, expo-router file routing; EAS builds para sa Android, Amazon Fire, at iOS; OTA updates sa pamamagitan ng `expo-updates` | Staffed o self-serve na istasyon na may label printing at verified check-out |
| Self check-in | `B1App` | Next.js (b1.church member portal) | Naka-log in na miyembrong nagche-check in ng kanilang household mula sa telepono; walang printing |
| Admin | `B1Admin` | React SPA | Nagko-configure ng istruktura ng serbisyo, nagtatalaga ng grupo sa oras ng serbisyo, nagdidisenyo ng label, nagre-record ng manual na attendance, nagpapatakbo ng mga ulat |

Lahat ng tatlo ay tumatawag sa parehong dalawang API module sa pamamagitan ng `ApiHelper`: **MembershipApi** (`/membership`) para sa mga tao, household, at grupo; **AttendanceApi** (`/attendance`) para sa lahat ng nasa ibaba.

## Data model (`Api/src/modules/attendance`)

| Entity / table | Mga pangunahing field | Kahulugan |
|----------------|-----------|---------|
| `campuses` | name, address | Deprecated dito -- ang mga campus ay minamaster sa membership module (`/membership/campuses`); ang kopya sa attendance ay naka-freeze na read-only para sa mga legacy reader (`models/Campus.ts`) |
| `services` | campusId, name | Isang paulit-ulit na pagtitipon, halimbawa "Sunday Morning" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Isang time slot sa loob ng serbisyo, halimbawa "9:00 AM" (`models/ServiceTime.ts`). Opsyonal ang mga schedule column (migration `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) at nagtutulak ng [check-in window](#scheduled-check-in-windows) |
| `groupServiceTimes` | groupId, serviceTimeId | Join table: aling mga grupo (silid-aralan) ang nagpupulong sa aling oras ng serbisyo (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Isang pagpupulong ng isang grupo sa isang petsa -- lazily na ginagawa sa oras ng check-in (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Isang taong dumalo sa isang petsa (`models/Visit.ts`). Ang `checkinType` ay `member` / `guest` / `volunteer` (NULL = legacy member), itinatakda ng kiosk at ginagamit ng capacity/ratio gate |
| `visitSessions` | visitId, sessionId | Aling session(s) ang sakop ng isang pagbisita -- ang batang naka-check in sa dalawang oras ng serbisyo ay makakakuha ng dalawang row (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON blocks) | Mga disenyong layout ng label (`models/LabelTemplate.ts`) |

### Paano pinapanatili ang kumpletong check-in

Hinahawakan ng `VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) ang `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Ang body ay array ng mga `Visit` object, bawat isa ay may dalang `visitSessions` na ang naka-embed na `session` ay naglalaman lang ng pares na `(serviceTimeId, groupId)`. Pagkatapos, ang server ay:

1. **Ginagate ang capacity at ratio bago ang anumang write.** Ang `evaluateGates()` → `CheckinGateHelper.evaluate()` ay sinusuri ang capacity, guest capacity, closed flag, at volunteer ratio ng bawat target na kuwarto laban sa kasalukuyang occupancy. Hindi transactional ang postCheckin, kaya dapat tumakbo ang gate bago ang unang save -- ang mabigat na paglabag ay nagbabalik ng 409 na pinangalanan ang kuwartong may problema at walang naka-save. Tingnan ang [Capacity and volunteer-ratio gates](#capacity-and-volunteer-ratio-gates).
2. **Lazily na nireresolba ang mga session.** Hahanapin o gagawin ng `getSessionId()` ang row ng `sessions` para sa `(groupId, serviceTimeId, today)` -- ang mga session id ay naka-cache sa proseso kada petsa. Ang mga bagong session ay naglalabas ng webhook na `session.created`. Ang loop ay isang awaited na `for..of` -- ang dating fire-and-forget na `forEach(async …)` ay nakipagkarera sa save at nagsulat ng NULL na sessionId sa paggawa ng unang session (naayos na; may nota sa code comment sa loop).
3. **Pinapalitan ang mga record ng araw.** Anumang umiiral na visit ng mga taong iyon sa serbisyong iyon ngayong araw ay binubura kasama ng kanilang visitSessions, pagkatapos sine-save ang isinumiteng set. Kaya ang muling pag-check in ng isang pamilya ay isang idempotent na operasyong "ito ang kasalukuyang estado", hindi append. Kapag ipinasa ang `?checkDuplicates=true`, nagbabalik ito ng `{ duplicates: [personId…] }` nang hindi nagsusulat, na siyang paraan ng pag-warn ng kiosk bago mag-overwrite.
4. **Gumagawa ng isang security code kada batch.** Ang `SecurityCodeHelper.generate()` ay gumagawa ng 4-character na code mula sa alpabetong `23456789BCDFGHJKLMNPQRSTVWXYZ` (walang patinig o mga kalitong character, kaya hindi makakabuo ng salita ang mga code at hindi madaling mabasa nang mali). Nire-retry ng server kapag may banggaan laban sa bukas na mga pagbisita ng parehong simbahan ngayong araw, at ini-stamp ang code sa bawat visit sa batch.
5. **Nagbabalik ng `{ streaks, securityCode }`.** Ang `streaks` ay nagmamapa ng personId sa bilang ng sunod-sunod na linggo ng attendance; ipinagdiriwang ng kiosk ang mga milestone (bawat ika-5 linggo) gamit ang confetti.

Bawat visit na nai-save ay naglalabas din ng webhook na `attendance.recorded`. Ang read side, `GET /attendance/visits/checkin`, ay nagbabalik ng mga pagbisita ng mga tao mula sa kanilang **huling naitalang petsa** -- kung nakaraang linggo iyon, tinatanggal ang mga id, kaya ang client ay tumatanggap ng pre-filled na kopya ng mga pagpili ng silid noong nakaraang linggo na masi-save bilang bagong record.

### Check-out

Dalawang endpoint ang kumukumpleto sa ikot (`VisitController`):

- `GET /attendance/visits/code/:code` -- ang mga visit ngayong araw na hindi pa na-check out at may dalang security code na iyon, kasama ang populated na sessions.
- `POST /attendance/visits/checkout` -- body `{ visitIds, checkedOutBy?, checkedOutById? }`; ini-stamp ang `checkoutTime` at kung sino ang kumuha, at naglalabas ng webhook na `attendance.checkout` kada visit.

Mga permiso: nagva-validate ang mga kiosk gamit ang `attendance.checkin`, na eksaktong nagbibigay ng check-in/check-out/label-template surface, kasama ang mga household lookup na kailangan ng kiosk nang walang `people.view` (phone/name search, household members sa check-in model, at ang listahan ng household pickup). Ang `SessionHelper.filterChurches` ng B1Checkin ay nag-aalok lang ng mga simbahan kung saan may hawak ang account na `Attendance/Checkin` o `Attendance/Edit`. Hindi na bahagi ng mga permiso ng Everyone (null-role) ang `Checkin` (`RoleHelper` at migration `2026-11-01_remove_everyone_checkin`), kaya dapat ibigay ito sa pamamagitan ng tunay na role; sinasaklaw ng `attendance.view`/`attendance.edit` ang pag-uulat at manual na pagpasok; ang istruktura (mga serbisyo, oras ng serbisyo, takda ng grupo) ay nangangailangan ng `services.edit`. Ang self check-in ng miyembro (B1App) ay hindi nangangailangan ng anumang permiso: kahit sinong naka-authenticate na user na may naka-link na tao sa simbahan ay maaaring tumawag sa `GET`/`POST /attendance/visits/checkin`, at nilimitahan ng server ang isinumiteng `personId` sa sariling household ng caller (403 kung hindi -- ito ang bakod na pumipigil sa pagbasa ng `securityCode` ng ibang pamilya). Ang pagiging miyembro ang nagbibigay ng grant; kung nakikita ng mga miyembro ang feature ay kinokontrol ng mga tab ng navigation ng B1App ng simbahan. Nananatiling kiosk/staff-only ang iba pang check-in endpoint (`code/:code`, `checkout`, `guardians`, `CheckinController`).

## Ang mga group ang nagpapatakbo ng routing ng silid

Walang entity ng silid o klase kahit saan sa sistema. Ang "silid" ay isang membership **group** na naka-enable ang `trackAttendance`, naka-link sa isa o higit pang oras ng serbisyo sa pamamagitan ng `groupServiceTimes`. Ang mga field ng grupo (sa `Api/src/modules/membership/models/Group.ts`) na humuhubog sa kilos ng kiosk:

| Field | Epekto |
|------|--------|
| `trackAttendance` | Sumasali ang grupo sa attendance; minamarkahan ng setup tree ng B1Admin ang mga grupong `trackAttendance` na walang row sa `groupServiceTimes` bilang hindi nakatalaga |
| `parentPickup` | Minamarkahan ang silid ng bata: ang check-in dito ay ginagawang "child" visit ang pagbisita, na nagpi-print ng pickup label ng pamilya at naglalagay ng security code sa nametag |
| `printNametag` | Kung magpi-print ng nametag ang mga check-in sa grupong ito |
| `capacity` / `guestCapacity` / `checkinClosed` | Mga limitasyon ng capacity ng silid at isang mahigpit na "closed" switch, ipinapatupad sa server ng check-in gate (ine-edit sa group settings ng B1Admin sa ilalim ng "Check-In Capacity") |
| `volunteerRatio` / `minVolunteers` | Ratio ng bata kada boluntaryo at minimum na bilang ng boluntaryo, ipinapatupad ayon sa setting na `ratioEnforcement` ng buong simbahan |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Mga hangganan ng kwalipikasyon sa edad/grade na sinusuri sa kiosk para i-highlight o i-dim ang mga silid |

Pareho ang denormalization ng bawat client (hal. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): i-load nang sabay-sabay ang `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes`, at `GET /membership/groups`, pagkatapos para sa bawat oras ng serbisyo, kolektahin ang mga grupong ang row sa `groupServiceTimes` ay tumuturo rito sa `serviceTime.groups`. Ang array na ito ang ipinapakita ng room picker, nakaayos ayon sa `categoryName` ng grupo.

Ine-edit ang mga takda mula sa pahina ng grupo sa B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` -- `POST`/`DELETE /attendance/groupservicetimes`), at ang buong tree ng Campus → Service → Service Time → Group ay nakikita sa `B1Admin/src/attendance/components/AttendanceSetup.tsx` sa pamamagitan ng `GET /attendance/attendancerecords/tree`.

:::info
Dahil ang mga grupo ang iisang pinagmumulan ng katotohanan, ang parehong membership ng grupo ang nagpapagana sa routing ng kiosk, sa roster-style na attendance sa mga pahina ng grupo ng B1Admin, at sa pag-uulat ng attendance -- ang pagtatalaga ng grupo sa oras ng serbisyo ang tanging hakbang na kailangan para maging destinasyon ng check-in.
:::

## Child safety

### Mga uri ng check-in {#check-in-types}

Bawat visit ay may dalang `checkinType` -- `member`, `guest`, o `volunteer` (ang NULL ay nangangahulugang legacy/member; migration `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Pinipili ang uri **sa panig ng kiosk**: ang mga chip na Member / Guest / Volunteer sa pinalawak na row ng miyembro (`B1Checkin/src/components/MemberServiceTimes.tsx`), ini-stamp sa bawat pending visit sa pagkumpleto (`app/checkinComplete.tsx`, default na `member`). Ginagamit ito ng server sa gate -- ang mga boluntaryo ay binibilang sa saklaw ng ratio sa halip na laban sa capacity, at ang mga guest ay binibilang laban sa `guestCapacity`.

### Capacity at volunteer-ratio gate {#capacity-and-volunteer-ratio-gates}

Tumatakbo ang `CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) sa loob ng `postCheckin` bago ang anumang save (hindi transactional ang endpoint, kaya ang gating-bago-save ang mekanismo ng katumpakan). Naglo-load ito ng kasalukuyang occupancy bawat target na grupo (`VisitRepo.countActiveByGroupToday`) at ng configuration ng grupo sa pamamagitan ng membership module gateway, pagkatapos ikinaklase ang mga paglabag:

- **Mahigpit (laging hinaharangan):** `checkinClosed`, `current + incoming > capacity`, guest count na lampas sa `guestCapacity`. Tinatanggihan ang batch gamit ang `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` -- ipinapakita ng kiosk ang pinangalanang silid.
- **Ratio (nagbababala o nagbloblock):** ang mga papasok na hindi-boluntaryo sa silid kung saan `volunteers < minVolunteers`, walang boluntaryo, o `children > volunteers × volunteerRatio`. Sumusunod ang tindi sa per-church na setting na `ratioEnforcement` (`"warn"` ang default / `"block"`, ine-edit sa B1Admin Manage Church → Check-In, `CheckinSettingsEdit.tsx`). Sa warn mode, nagbabalik ito ng `409 { warning: true, error: "ratio", … }` maliban kung muling isumite ng client na may `acknowledgeWarnings=true` -- ang muling pagsusumite ang override ng staff-confirm ng kiosk.

### Mga scheduled check-in window {#scheduled-check-in-windows}

Ang oras ng serbisyo ay maaaring may opsyonal na lingguhang schedule (`dayOfWeek` 0–6 na may 0 = Linggo, `startTime`/`endTime` bilang `HH:mm`, `checkinOpenMinutes`, `checkinCloseMinutes`), ine-edit sa form ng service-time ng **Attendance → Setup** ng B1Admin (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, "Check-in Schedule"). Tinatrato ng `CheckinGateHelper.hasSchedule()` ang oras ng serbisyo bilang naka-iskedyul lang kapag parehong nakatakda ang `dayOfWeek` at `startTime`; hindi kailanman ginagatean ayon sa oras ang mga hindi naka-iskedyul na oras. Kinakalkula ng `isServiceTimeOpen()` ang window sa lokal na wall-clock time (`DateHelper.toChurchTime`). Nireresolba ang zone kada oras ng serbisyo ng `CheckinTimeZoneHelper.load()` (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`): ang `timezone` ng campus ng serbisyo (`service.campusId`, sa pamamagitan ng `MembershipModuleGateway.loadCampusTimeZones`) ang nauuna, pagkatapos ang `timeZone` ng simbahan (itinakda sa Church Information ng B1Admin), pagkatapos ang unang hindi naalis na campus na may `timezone` (`loadCampusTimeZone`), at saka lang ang `America/New_York`. Nauuna ang campus dahil maraming simbahan ang may `America/New_York` na naka-backfill bilang zone ng simbahan. Pareho ang pagre-resolve ng listing at posting path sa ibaba. Tumatakbo ang window mula `checkinOpenMinutes` bago ang simula hanggang `checkinCloseMinutes` pagkatapos ng pagtatapos (o pagkatapos ng simula kung walang end), at hinahawakan ang mga window na tumatawid sa hatinggabi o sa hangganan ng linggo.

Ipinapatupad ang window sa dalawang lugar:

- **Listing:** Ang `GET /attendance/servicetimes` ay nag-stamp sa bawat row ng kinalkulang boolean na `checkinOpen`. Pinapanatili ng self check-in ng B1App (`CheckinPage.tsx`) at ng service picker ng B1Checkin (`app/services.tsx`) ang bawat oras. Kapag sarado ang lahat ng oras ng isang serbisyo, ipinapakita nila ang pinakamalapit na pagbubukas ("Check-in opens Sun 9:30 AM." sa B1App, "Check-in for this service opens Sun 9:30 AM." sa B1Checkin, mula sa `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`), at bumabalik sa "Check-in isn't open for this service right now." kapag walang maikalkulang pagbubukas (nag-aalok ang kiosk ng butones na Back para pumili ng ibang serbisyo). Kung hindi, ang mga saradong oras ay lumalabas bilang hindi-napipiling row na "Closed" / "Closed · opens 9:30 AM". Muling sinusuri ng household screen ng B1Checkin (`MemberServiceTimes.tsx`) ang pagbubukas nang live sa orasan ng device gamit ang `ServiceTimeHelper.isCheckinOpen()` (time zone ng device, hindi ng simbahan) para magbukas at magsara sa tamang oras ang kiosk na iniwang tumatakbo, at ipinapakita ang "Kids Room 1 · Checked in" (pangalan ng grupo) sa saradong oras na hawak na ng tao.
- **Posting:** sa loob ng `evaluateGates()`, bago ang capacity/ratio evaluation, tinatanggihan ng `findClosedServiceTimeGroups()` ang batch gamit ang `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` kung may target na session na nasa labas ng window ng oras ng serbisyo nito. Dahil muling ipinopost ang umiiral na mga pagbisita ng household ngayong araw sa bawat check-in, nilalampasan ng mga session na hawak na ng tao (`personId|sessionId` sa umiiral na mga visit) ang gate na ito, kaya hindi tinatanggihan ang pagdaragdag ng mas huling bukas na oras ng serbisyo dahil nagsara na ang naunang window. Ipinapakita ito ng B1Checkin sa pamamagitan ng hard-gate screen nito na may dahilang "check-in isn't open right now" (ang mga paglabag sa capacity ay nagbabasa pa ring "room is full or closed").

### Eligibility sa edad/grade (sa panig ng kiosk) {#agegrade-eligibility-kiosk-side}

Advisory na UI ang eligibility ng silid, sinusuri sa kiosk, hindi ipinapatupad ng server. Inihahambing ng `B1Checkin/src/helpers/EligibilityHelper.ts` ang birthdate/grade ng tao sa `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` ng grupo (pagkakasunod ng grade: PreK, K, 1–12, Graduated) at nagbabalik ng `eligible` / `ineligible` / `unknown` -- ang nawawalang datos ay nagbubunga ng `unknown` at hindi kailanman nagtatago ng silid. Kinakalkula ang edad at grade bilang ng **grade promotion date** ng simbahan (setting na `gradePromotionDate`, `"MM-DD"`, ine-edit sa `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); kinukuha ito ng kiosk mula sa `GET /attendance/checkin/settings`, at pinipili ng `resolveAsOfDate` ang pinakabagong pangyayari sa o bago ngayon. Ina-highlight ng room picker ang mga eligible na silid at dini-dim ang mga ineligible; ang pagpili sa dim na silid ay nangangailangan ng staff confirmation.

### Trusted at not-authorized na pickup {#trusted-and-not-authorized-pickup}

Ang mga taong susundo ay isang membership entity, kada household: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` -- householdId, opsyonal na personId, name, photoUrl, relationship, `status` na `trusted` / `notAuthorized`, notes). Ang CRUD ay `GET /membership/householdpickup/:householdId` (sinumang naka-authenticate na user ng simbahan, para mabasa ito ng mga kiosk) kasama ang `POST` / `DELETE` na sakop ng `people.edit`. Pinamamahalaan ng staff ang listahan sa card na **Pickup** ng pahina ng tao (`B1Admin/src/people/components/PickupPeople.tsx`) -- larawan, relationship, at chip ng status na Trusted/Not Authorized.

Sa check-out (`B1Checkin/app/checkout.tsx`), nilo-load ng kiosk ang listahan ng pickup ng household: ang mga entry na `trusted` ay lumalabas bilang mga pickup card na maaaring i-tap kasama ng photo grid ng mga adult sa household, at ang pangalang "Other" na tina-type nang malaya ay fuzzy-matched (Levenshtein, `src/helpers/PickupMatchHelper.ts`) laban sa mga entry na `notAuthorized` -- ang tugma ay humaharang sa check-out gamit ang warning sheet at butones na staff na **Override**. Naitatala ang override sa mismong visit: ipinapadala nito ang `checkedOutBy` bilang `"OVERRIDE: {name}"` sa pamamagitan ng normal na `POST /attendance/visits/checkout`, kaya napupunta ito sa attendance record at sa webhook na `attendance.checkout` sa halip na sa hiwalay na audit table.

### Page-a-parent at emergency broadcast

Ang `CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) ay naglalantad ng dalawang SMS endpoint:

- `POST /page` -- `{ visitId, message }`: nagpapa-page sa mga guardian ng isang naka-check-in na bata (screen ng check-out ng kiosk, manned mode).
- `POST /broadcast` -- `{ serviceId, message }`: nagte-text sa mga adult ng bawat naka-check-in na household para sa isang serbisyo (admin settings ng kiosk, sa likod ng sheet na type-`EMERGENCY`-to-confirm sa `B1Checkin/app/adminSettings.tsx`).

Parehong nire-resolve ang mga adult ng household sa pamamagitan ng membership gateway, pagkatapos ibinibigay ang paghahatid sa **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) -- ang cross-module na pinto papunta sa naka-configure na texting provider ng simbahan (`@churchapps/texting`: TextInChurch, Clearstream, o MutualMinistry; walang built-in na SMS sender). Naglalagay ang gateway ng row na `sentText` kasama ang per-recipient na entry ng `deliveryLog` at nilalimitahan ang batch sa 500 tatanggap; kapag walang naka-configure na provider, nagbabalik ito ng `no_provider`, na ipinapakita ng kiosk bilang "No SMS provider configured". Ang `dispatch()` ng controller ay nag-aalis ng duplicate na numero ng telepono at nilalaktawan ang mga taong walang mobile o nakatakdang `optedOut`, nagbabalik ng `{ sent, failed, skippedOptedOut, skippedNoPhone }` para maipakita ng kiosk kung ano ang nilaktawan.

## Ang kiosk (B1Checkin)

Ang mga screen ay mga expo-router file sa ilalim ng `B1Checkin/app/`; ang state na nasa pagitan ng mga screen ay nasa static na klase na `CachedData` (`src/helpers/CachedData.ts`), hindi sa React state.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Lookup** (`app/lookup.tsx`) -- maghanap ayon sa telepono (`GET /membership/people/search/phone?number=`, huling-4 o buo) o ayon sa pangalan (`GET /membership/people/search?term=`). Ang pagpili sa isang tugma ay nagla-load ng household (`GET /membership/people/household/{householdId}`) at ng umiiral na visit (`GET /attendance/visits/checkin`), na pinupunan ang `pendingVisits` ng mga pagpili noong nakaraang linggo.
2. **Pagrepaso ng household** (`app/household.tsx`, `src/components/MemberList.tsx`) -- ang bawat row ng miyembro ay nagpapakita ng badge na nakapag-check in na, badge ng allergy/`nametagNotes`, at mga chip ng kasalukuyang silid. Ang pagpapalawak ng miyembro ay naglilista ng bawat oras ng serbisyo na may butones ng silid at ng mga chip ng uri ng check-in na Member / Guest / Volunteer (`MemberServiceTimes.tsx`). Sa ilalim ng pangalan ng bawat oras ng serbisyo, ipinapakita ng `ServiceTimeHelper.getGroupSummary()` ang mga grupong inaalok doon (ang mga pangalan ng `serviceTime.groups`, tinrim, de-duplicated nang hindi sensitibo sa case, pinagsama-sama ng kuwit); walang lumilitaw kapag walang grupo ang oras.
3. **Pagtatalaga ng grupo** (`app/selectGroup.tsx`) -- isang category tree na binuo mula sa `serviceTime.groups`, na may mga silid na kwalipikado sa edad/grade na naka-highlight at ang mga hindi kwalipikado ay naka-dim sa likod ng staff confirm (tingnan ang [Age/grade eligibility](#agegrade-eligibility-kiosk-side)); ang pagpili ng silid ay nagsusulat ng `{ session: { serviceTimeId, groupId } }` na visitSession sa pending visit ng taong iyon (`src/helpers/VisitSessionHelper.ts`). Ang "None" ay nag-aalis nito.
4. **Complete** (`app/checkinComplete.tsx`) -- `POST /attendance/visits/checkin` na may `pendingVisits` (bawat isa ay may `checkinType`), pagkatapos nagpi-print ng mga label kung may naka-configure na printer at awtomatikong bumabalik sa lookup. Ang tugon na `409` para sa capacity o `notOpen` ay nagpapakita ng pinangalanang silid na may dahilan (puno/sarado, o hindi bukas ang check-in); ang ratio warning ay nag-aalok ng staff confirm na muling nagsusumite na may `acknowledgeWarnings=true`.

Ang screen ng **check-out** (`app/checkout.tsx`) ay tumatanggap ng 4-character na security code sa pamamagitan ng input na awtomatikong nakatutok -- kaya gumagana ang mga USB/Bluetooth keyboard-wedge barcode scanner nang walang camera -- o isang on-screen na keypad na gumagamit ng parehong alpabeto, na awtomatikong nagsusumite sa 4 na character. Ang butones na **Scan** ay nagbubukas ng sheet na may nakabahaging camera na `src/components/CodeScanner.tsx` (default na back-facing, tumatanggap ng QR, Code 128, at Code 39) para magamit ng mga istasyong walang wedge scanner ang pickup label; ang na-scan na code ay dumadaloy sa parehong `handleCode()` path ng typed na input. Hinahanap nito ang code, ipinapakita ang mga batang susunduin, at inihahain ang **mga trusted pickup person** ng household bilang mga pickup card na maaaring i-tap kasabay ng photo grid ng mga adult sa household (kasama ang opsyong "Other" na libreng teksto na fuzzy-checked laban sa mga pangalang not-authorized -- tingnan ang [Trusted and not-authorized pickup](#trusted-and-not-authorized-pickup)), pagkatapos nagpo-post ng `POST /attendance/visits/checkout` gamit ang pangalan/id ng pinili. Sa manned mode, nag-aalok din ang screen ng **Page a parent** (`POST /attendance/checkin/page`) at isang **security-label reprint** -- muling binubuo ng `reprint()` ang mga label ng pamilya gamit ang `LabelHelper.getAllLabelsFor(...)` at ipinapasa ang mga ito sa parehong `PrintUI` pipeline ng check-in.

Ang "personalidad" ng istasyon ay isang AsyncStorage flag na `@StationMode` (`"self"` | `"manned"`, binabago sa `app/adminSettings.tsx`). Idinadagdag ng manned mode ang entry point ng check-out sa lookup screen at ang per-member profile editing (`POST /membership/people`) mula sa household screen. Naka-built in ang kiosk hardening: isang opsyonal na PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) ang nagbabantay sa admin at printer screen, bumubukas ang admin screen lang sa 7 mabilisang tap sa header logo, at isang idle attract screen (`src/hooks/useInactivityTimer.ts`) ang pumapalit sa pagitan ng mga pamilya.

## Self check-in (B1App)

Nagche-check in ang mga miyembro mula sa b1.church portal sa screen na `/mobile/checkin` (itinuturo ng `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` sa `screens/CheckinPage.tsx`). Nangangailangan ito ng naka-log in na user at dumaraan sa parehong apat na hakbang ng kiosk -- services → household → groups → complete -- laban sa parehong endpoint, na may state na nasa `B1App/src/helpers/CheckinHelper.ts`. Ang mga pagkakaiba sa kiosk: ang household ay mula sa sariling `householdId` ng naka-log in na user (walang hakbang sa paghahanap), at walang label printing -- sa halip, ipinapakita ng completion screen ang security code ng batch bilang QR (`qrcode.react`) na may hint na "show this at a check-in station". Kung naka-check in na ang household pagkaload ng pahina, muling ipinapakita ng butones na "Show check-in code" ang QR mula sa unang umiiral na visit (mula sa `GET /attendance/visits/checkin`) na may dalang `securityCode`. Agad na naitatala ang check-in sa oras ng pagsusumite (walang pending state); ang QR ay nagtutulak lang ng label printing sa kiosk.

**Label printing mula sa telepono papunta sa kiosk** (`B1Checkin/app/scan.tsx`, na naaabot mula sa butones na "Scan code" ng QR sa lookup screen): ipinapakita ng kiosk ang `CodeScanner` (isang `expo-camera` `CameraView`, default na front-facing, maaaring i-flip) na nag-i-scan ng mga QR code. Tumatanggap ang `ScanCodeHelper.parse()` ng payload lang kapag ito ay bare na 4-character na code sa alpabeto ng security code, at binabalewala ng `ScanCodeHelper.isRepeat()` ang parehong code sa loob ng 4 na segundo, kaya gumagana ang QR ng B1App at ang QR block ng naka-print na label. Pagkatapos, sinusundan ng screen ang reprint path ng check-out -- `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` -- at bumabalik sa lookup. Walang attendance write na nangyayari sa oras ng pag-scan; labels-only. Ang mga code na walang aktibong visit, mga istasyong walang printer, at mga grupong walang label ay bawat isa ay naglalabas ng toast at bumabalik sa lookup.

Ang mga type at `ApiHelper`/`ArrayHelper` ay galing sa `@churchapps/helpers` at `@churchapps/apphelper`; walang React component na ibinabahagi sa B1Admin.

## Attendance sa panig ng admin (B1Admin)

- **Setup** -- `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) ang nagre-render ng structure tree at lumilikha ng mga serbisyo (`ServiceEdit.tsx`) at oras ng serbisyo (`ServiceTimeEdit.tsx`). Galing sa membership ang datos ng campus sa pamamagitan ng hook na `useCampuses()`.
- **Manual na attendance** ay nasa panig ng Groups, hindi sa seksyon ng attendance: ang `B1Admin/src/groups/components/GroupSessionsTab.tsx` ay gumagawa ng mga session (`POST /attendance/sessions`; kapag nagdaragdag, maaaring isama ng `SessionEdit.tsx` ang isang session bawat ibang grupong kasama sa piniling oras ng serbisyo, nilalaktawan ang mga grupong may session na sa petsang iyon) at minamarkahang present ang mga tao sa pamamagitan ng `POST /attendance/visitsessions/log`, na naghahanap o gumagawa ng visit para sa taong iyon at session. Maaaring mag-record ng attendance ang mga group leader para sa sarili nilang mga grupo nang hindi kailangan ang permiso na `attendance.edit` -- tinitingnan ng mga controller ang `au.leaderGroupIds`.
- **Pag-uulat** -- ang trend ng attendance at group attendance ay mga ulat na tinutukoy ng server (`B1Admin/src/components/reporting/ReportWithFilter.tsx` laban sa ReportingApi; mga definition sa `Api/reports/*.json`). Parehong tumatanggap ng `startDate`/`endDate` (kasama ang end date); ang trend report ay default sa isang taon na ang nakaraan hanggang ngayon at nagdaragdag ng column na `sessionDates` kada linggo, at ang on-screen tree ng group attendance ay kasama ang `checkinTime` ng bawat visit at ang `membershipStatus` ng tao. Ang CSV ng group attendance ay galing sa kasamang ulat na `groupAttendanceDownload`, na pinipivot ng `GroupAttendanceDownloadHelper` sa isang row bawat miyembro ng grupo na may column na present/absent bawat petsang session; ang kasaysayan ng bawat tao ay `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Label printing

### Mga template at ang designer

Nagdidisenyo ang mga simbahan ng sarili nilang label sa B1Admin sa `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, naaabot mula sa pahina ng Check-In settings). Ang template ay isang row ng `labelTemplates` na ang `content` ay JSON array ng mga block -- `text`, `field`, `barcode`, `qrcode`, o `box` -- bawat isa ay nakaposisyon sa percent na coordinate na may font, alignment, symbology (`code39`/`code128`/`qr`), at opsyonal na mga kondisyon ng visibility (hal. i-render lang ang allergy box kapag may laman ang `person.nametagNotes`). May dalawang `labelType`: `nametag` (isa bawat naka-check-in na tao; mga field gaya ng `person.displayName`, `sessions`, `securityCode`, at `person.isBirthdayWeek` -- `"true"` kapag ang buwan/araw ng kaarawan ay nasa loob ng 3 araw mula ngayon, na bumabalot sa pagtatapos ng taon, kinakalkula ng `LabelHelper.isBirthdayWithin()`) at `pickup` (isa bawat pamilya; mga field gaya ng `children`, `childrenAllergies`). Nagpapatupad ang server ng iisang default kada uri kada simbahan (`LabelTemplateController.save`). Kasama sa designer ang mga starter template na kumokopya sa mga label na nakabundle sa kiosk at nagpe-preview laban sa sample na datos.

### Pag-render at pag-print sa kiosk

Sa pagkumpleto ng check-in, nagpapasya ang `B1Checkin/src/helpers/LabelHelper.ts` kung ano ang ipi-print mula sa mga flag ng grupo sa bawat pending visit: mga nametag para sa mga grupong `printNametag`, kasama ang isang pickup label ng pamilya kung may visit na tumama sa grupong `parentPickup`. Nilalaktawan ng `LabelHelper.selectChildVisits()` ang mga visit na may `checkinType` na `volunteer`, kaya hindi kailanman nagti-trigger ng pickup label ang isang childcare worker sa Parent Pickup room. Ang security code mula sa tugon ng check-in ay napupunta sa nametag ng bata at sa pickup label; ang nametag ng adult ay walang code. Kung may template ang simbahan, ginagawang standalone na HTML document ng `LabelRenderer` (`src/helpers/LabelRenderer.ts`) ang mga block + field context; kung wala, ginagamit ang mga nakabundle na HTML label sa `B1Checkin/assets/labels/` na may placeholder substitution.

Ginagawa ang mga barcode bilang inline SVG ng mga pure-TypeScript encoder sa `B1Checkin/src/helpers/barcode.ts` -- mga pattern table ng Code 39 at mga width table ng Code 128 (code set B na may mod-103 checksum), kasama ang QR sa pamamagitan ng package na `qrcode`. **Sinadyang kinopya ang mga encoder na ito sa B1Admin** (ini-inline ng `LabelEditor.tsx` ang parehong table, may nota sa code comment) para maging pixel-faithful sa output ng kiosk ang mga preview ng designer; kailangang i-mirror sa isa ang anumang pagbabago sa isa.

Ang print pipeline (`src/components/PrintUI.tsx`) ay nagre-render ng bawat HTML label sa isang `WebView`, kinukuha ito bilang JPG sa pamamagitan ng `react-native-view-shot`, at ipinapasa ang mga image URI sa native na Expo module na **printer-helper** (`B1Checkin/modules/printer-helper/`). Inilalantad ng module ang `scan()`, `checkInit()`, `printUris()`, at mga status event, na may provider bawat brand sa parehong platform:

| Brand | Android | iOS | Mga tala |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Mga network printer ng QL-series (QL-800/810W/820NWB/1100/1110NWB…), die-cut na 29×90 na label, ang inirerekomendang default |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Network discovery + TCP/ZPL image printing |

Nasa `app/printers.tsx` ang pagpili ng printer (ang network scan ay nagbabalik ng mga entry na `brand~model~ip`; ang pagpili ay nase-save sa AsyncStorage), at pinananatili ng `src/helpers/PrinterLog.ts` ang on-device diagnostic log na lumilitaw sa pamamagitan ng live na status dot sa header ng kiosk.

## Guest registration

Dalawang daan ang gumagawa ng tao habang nasa check-in:

- **Sa kiosk** -- binubuksan ng "Add guest" ng household screen ang `B1Checkin/app/addGuest.tsx`, na unang naghahanap sa `GET /membership/people/search?term=` ng umiiral na hindi-miyembrong tugma at kung wala ay gumagawa ng bago gamit ang `POST /membership/people`, nakakabit sa kasalukuyang household. Ang bisita ay dumadaan sa pagtatalaga ng grupo gaya ng sinumang miyembro.
- **Self-serve sa pamamagitan ng QR** -- kapag naka-on ang setting ng simbahan na `enableQRGuestRegistration` (ina-configure sa Check-In settings ng B1Admin, binabasa mula sa `GET /membership/settings/public/{churchId}`), ang lookup screen ng kiosk ay nagpapakita ng QR code na nagli-link sa `https://{subdomain}.b1.church/guest-register?serviceId=`. Ang pahinang iyon ng B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) ay nagpapahintulot sa bisitang pamilya na magparehistro sa sarili nilang telepono sa pamamagitan ng anonymous na endpoint na `POST /membership/people/guest-register`, na pinananatiling umuusad ang pila sa kiosk. Mayroon ding butones na **Register here** ang QR sheet na nagbubukas ng parehong pahina sa kiosk (`app/guestRegister.tsx`) sa isang incognito, cache-disabled na `WebView`; binubuo ng `src/helpers/GuestRegisterHelper.ts` ang URL para sa QR at sa WebView, at hinaharangan ang navigation palabas sa `https://{subdomain}.b1.church/guest-register`. Bumabalik ang screen sa lookup sa **Done**, sa back, o pagkatapos ng 120 segundong kawalan ng aktibidad (ang pag-type sa form ay ipinapasa mula sa WebView bilang aktibidad), at ina-unmount ang WebView para hindi umabot sa susunod na pamilya ang mga entry ng isang pamilya.

Ang QR sign-up ay pinapatakbo ng mga setting ng simbahan na sine-save mula sa card na **QR Guest Registration** sa B1Admin (`src/mobile/CheckInPage.tsx`):

| Setting | Visibility | Layunin |
|---|---|---|
| `enableQRGuestRegistration` | public | Opt-in switch para sa QR ng kiosk at sa mga anonymous na endpoint |
| `guestRegistrationFields` | public | JSON map ng `email`, `phone`, `address`, `birthDate`, `gender`, `maritalStatus`, `grade`, `comments` → `"off"` / `"optional"` / `"required"`. Default: optional ang email at telepono, naka-off ang iba. Laging kinakailangan ang first/last name |
| `guestRegistrationImage` | public | URL ng header photo; ire-render ito ng B1App nang 16:9 sa halip na icon sa form at sa confirmation screen |
| `guestRegistrationGroupId` | private | Grupong idinadagdagan ng bawat sign-up (hindi kailanman nakikita o napipili ng mga bisita) |
| `guestRegistrationRecordAttendance` | private | `"true"` para i-record din ang attendance sa grupong iyon |

Kinukuha ng `src/components/checkin/GuestRegister.tsx` ng B1App ang checklist mula sa anonymous na `GET /membership/people/guest-register/options?churchId=` at nire-render lang ang mga kasamang field (email, phone, marital status, at address sa primary contact; birth date, gender, at grade bawat miyembro; isang kahon ng comments), at ipinapadala lang ang mga iyon. Muling inilalapat ng server ang checklist sa `GuestRegistrationHelper.sanitize()` -- inaalis ang mga naka-off na field, ang nawawalang kinakailangang field o halagang wala sa listahan ay 400 -- bago tumakbo ang `PersonHelper.registerGuestHousehold()`. Unang tinatawag nito ang `PersonRepo.findGuestMatch()` para sa bawat miyembrong may email o telepono: ang eksaktong isang buhay na tao na may parehong first name at parehong email o phone digits ay muling ginagamit (zero o maraming tugma ay gumagawa ng bagong tao, kaya hindi ito nanghuhula kailanman). Ang miyembrong walang contact ay tumutugma ayon sa first name sa loob ng natugmang household. Hindi kailanman ini-edit ang muling ginamit na mga tao, kaya hindi maaaring i-overwrite ng anonymous na form ang nakaimbak na detalye, at inuulit ng tugon ang isinumiteng mga pangalan. Ang hindi natugmang miyembro ay sumasali sa natugmang household o sa bago, bilang `membershipStatus: "Visitor"`, na naglalabas ng `person.created` para sa bawat bagong tao. Pagkatapos, ang mga pagkabigo ay ini-log sa halip na ibalik: ang mga miyembro ay idinadagdag sa naka-configure na grupo (`group.member.added`); kung naka-on ang pag-record ng attendance, minamarkahan ng `AttendanceModuleGateway.recordAttendance()` ang bawat miyembrong present para sa bawat oras ng serbisyo ng grupo na may schedule at kung saan bukas ang check-in window nito (`CheckinGateHelper.isServiceTimeOpen`) sa sandaling iyon, at ginagawa ang session para sa petsa ngayon ayon sa oras ng simbahan kung kailangan -- ang mga hindi naka-iskedyul na oras ng serbisyo at sign-up sa labas ng window ay walang nire-record; at ang mga comment ay nagiging nakatagong person-note conversation sa head of household (message author "Guest sign-up"), na naka-link sa pamamagitan ng `person.conversationId`.

## Mga Kaugnay na Pahina

- [Attendance Endpoints](../api/endpoints/attendance) -- Kumpletong REST surface para sa mga campus, serbisyo, session, visit, at visit session
- [Membership Endpoints](../api/endpoints/membership) -- Mga tao, household, at grupo
- [Webhooks](../api/webhooks) -- Ang mga event na `session.created`, `attendance.recorded`, at `attendance.checkout`
- [Module Structure](../api/module-structure) -- Kung paano inaayos ang attendance module sa panig ng server
