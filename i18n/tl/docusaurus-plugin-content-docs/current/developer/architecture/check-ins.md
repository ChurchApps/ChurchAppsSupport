---
title: "Pag-check-in"
---

# Pag-check-in

<div class="article-intro">

Iisang sistema ang check-in na may tatlong pasukan: ang B1Checkin kiosk app para sa mga istasyong may staff at self-serve, ang self check-in sa loob ng B1App member portal, at ang attendance sa panig ng admin sa B1Admin. Lahat ng tatlo ay sumusulat sa iisang attendance module sa core Api, at ang routing ng silid-aralan ay pinapatakbo nang buo ng Groups. Walang hiwalay na "locations" o "rooms" na entity. May child-safety layer sa ibabaw nito: check-in types kada visit, server-side na capacity at volunteer-ratio gates, kiosk-side na age/grade eligibility, trusted-pickup verification sa check-out, at parent paging sa pamamagitan ng texting provider ng simbahan. Inilalarawan ng pahinang ito ang data model, ang mga daloy ng check-in, ang safety layer, at ang pipeline ng pag-print ng label.

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

| Surface | Repo | Stack | Tungkulin |
|---------|------|-------|------|
| Kiosk | `B1Checkin` | Expo / React Native, expo-router file routing; EAS builds para sa Android, Amazon Fire, at iOS; OTA updates sa pamamagitan ng `expo-updates` | Staffed o self-serve na istasyon na may pag-print ng label at verified na check-out |
| Self check-in | `B1App` | Next.js (b1.church member portal) | Naka-log in na miyembro ang nagche-check in ng kanilang household mula sa telepono; walang pag-print |
| Admin | `B1Admin` | React SPA | Nagko-configure ng service structure, nagtatalaga ng groups sa service times, nagdidisenyo ng label, nagtatala ng manual na attendance, nagpapatakbo ng reports |

Lahat ng tatlo ay tumatawag sa parehong dalawang API module sa pamamagitan ng `ApiHelper`: **MembershipApi** (`/membership`) para sa mga tao, household, at groups; **AttendanceApi** (`/attendance`) para sa lahat ng nasa ibaba.

## Data model (`Api/src/modules/attendance`)

| Entity / table | Mga pangunahing field | Kahulugan |
|----------------|-----------|---------|
| `campuses` | name, address | Deprecated na rito. Ang campuses ay minamaster sa membership module (`/membership/campuses`); ang kopya sa attendance ay frozen at read-only para sa mga legacy reader (`models/Campus.ts`) |
| `services` | campusId, name | Isang paulit-ulit na pagtitipon, halimbawa "Sunday Morning" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Isang time slot sa loob ng service, halimbawa "9:00 AM" (`models/ServiceTime.ts`). Opsyonal ang mga schedule column (migration `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) at ang mga ito ang nagpapatakbo ng [check-in window](#scheduled-check-in-windows) |
| `groupServiceTimes` | groupId, serviceTimeId | Join table: aling mga group (silid-aralan) ang nagkikita sa aling service times (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Isang pagkikita ng isang group sa isang petsa. Nalilikha kapag kailangan, sa oras ng check-in (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Isang taong dumalo sa isang petsa (`models/Visit.ts`). Ang `checkinType` ay `member` / `guest` / `volunteer` (NULL = legacy na member), itinakda ng kiosk at ginagamit ng capacity/ratio gates |
| `visitSessions` | visitId, sessionId | Aling session(s) ang sinasaklaw ng isang visit. Ang batang na-check in sa dalawang service time ay may dalawang row (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON blocks) | Mga label layout na maaaring idisenyo (`models/LabelTemplate.ts`) |

### Paano sine-save ang natapos na check-in

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) ang humahawak sa `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Ang body ay isang array ng mga `Visit` object, na ang bawat isa ay may dalang `visitSessions` na ang naka-embed na `session` ay tumutukoy lamang sa isang pares na `(serviceTimeId, groupId)`. Pagkatapos, ginagawa ng server ang sumusunod:

1. **Chine-check ang capacity at ratio bago ang anumang write.** Tinatawag ng `evaluateGates()` ang `CheckinGateHelper.evaluate()`, na tinitingnan ang capacity, guest capacity, closed flag, at volunteer ratio ng bawat targeted na room laban sa kasalukuyang occupancy. Hindi transactional ang postCheckin, kaya dapat tumakbo ang gate bago ang unang save. Kapag may malinaw na paglabag, nagbabalik ito ng 409 na pinangalanan ang (mga) apektadong room, at walang nase-save. Tingnan ang [Capacity and volunteer-ratio gates](#capacity-and-volunteer-ratio-gates).
2. **Tamad na nireresolba ang mga session.** Hinahanap o ginagawa ng `getSessionId()` ang row sa `sessions` para sa `(groupId, serviceTimeId, today)`. Naka-cache sa proseso ang session ids kada petsa. Naglalabas ng `session.created` webhook ang mga bagong session. Ang loop ay isang awaited na `for..of`. Dati, ang fire-and-forget na `forEach(async …)` ay nag-race sa save at nagsulat ng NULL na sessionIds noong unang nalikha ang session. Naayos na ito, at may code comment sa loop na nagsasabi nito.
3. **Pinapalitan ang mga record ng araw na iyon.** Anumang umiiral na visit ng mga taong ito sa service na iyon ngayong araw ay binubura kasama ang kanilang visitSessions, saka sine-save ang isinumiteng set. Kaya ang muling pag-check in ng isang pamilya ay isang idempotent na operasyong "ito na ang kasalukuyang estado", hindi basta pagdagdag. Kapag `?checkDuplicates=true` ang ipinasa, nagbabalik ito ng `{ duplicates: [personId…] }` nang hindi nagsusulat. Ito ang paraan kung paano nagbababala ang kiosk bago mag-overwrite.
4. **Gumagawa ng isang security code kada batch.** Gumagawa ang `SecurityCodeHelper.generate()` ng 4-character na code mula sa alpabetong `23456789BCDFGHJKLMNPQRSTVWXYZ`. Walang patinig at walang nakakalitong karakter, kaya hindi bumubuo ng salita ang mga code at hindi madaling mabasa nang mali. Nagre-retry ang server kapag nagbanggaan sa bukas na visit ng parehong simbahan ngayong araw, at inilalagay ang code sa bawat visit sa batch.
5. **Nagbabalik ng `{ streaks, securityCode }`.** Ang `streaks` ay nagmamapa ng personId sa bilang ng magkakasunod na linggong pagdalo. Ipinagdiriwang ng kiosk ang mga milestone (bawat ika-5 linggo) gamit ang confetti.

Naglalabas din ng `attendance.recorded` webhook ang bawat na-save na visit. Ang read side, ang `GET /attendance/visits/checkin`, ay nagbabalik ng mga visit ng mga tao mula sa **huling naitalang petsa**. Kapag nakaraang linggo ang petsang iyon, tinatanggal ang mga id, kaya ang client ay tumatanggap ng pre-filled na kopya ng mga pinili sa room noong nakaraang linggo na magse-save bilang bagong record.

### Check-out

Dalawang endpoint ang bumubuo sa kabuuan (`VisitController`):

- `GET /attendance/visits/code/:code`: ang mga visit ngayong araw na hindi pa na-check out at may dalang security code na iyon, kasama ang mga naka-populate na session.
- `POST /attendance/visits/checkout`: body na `{ visitIds, checkedOutBy?, checkedOutById? }`. Itinatala nito ang `checkoutTime` at kung sino ang sumundo, at naglalabas ng `attendance.checkout` webhook kada visit.

Mga pahintulot: nagsa-authenticate ang mga kiosk gamit ang `attendance.checkin`, na nagbibigay ng eksaktong check-in/check-out/label-template na access. Sakop ng `attendance.view`/`attendance.edit` ang reporting at manual na pagpasok. Nangangailangan ng `services.edit` ang istruktura (services, service times, group assignments). Hindi nangangailangan ng anumang pahintulot ang self check-in ng miyembro (B1App): sinumang naka-authenticate na user na may naka-link na tao sa simbahan ay maaaring tumawag sa `GET`/`POST /attendance/visits/checkin`, at nililimitahan ng server ang isinumiteng `personId` sa sariling household ng tumatawag (403 kung hindi). Ang bakod na ito ang pumipigil sa pagbasa ng `securityCode` ng ibang pamilya. Ang pagiging miyembro ang nagbibigay ng access. Ang kung nakikita ng miyembro ang feature ay kinokontrol ng mga navigation tab ng B1App ng simbahan. Limitado sa kiosk/staff ang iba pang check-in endpoint (`code/:code`, `checkout`, `guardians`, `CheckinController`).

## Ang groups ang nagpapatakbo ng room routing

Walang room o classroom entity saanman sa sistema. Ang "room" ay isang membership **group** na naka-enable ang `trackAttendance`, na naka-link sa isa o higit pang service time sa pamamagitan ng `groupServiceTimes`. Ang mga group field (nasa `Api/src/modules/membership/models/Group.ts`) na humuhubog sa kilos ng kiosk:

| Field | Epekto |
|------|--------|
| `trackAttendance` | Nakikilahok ang group sa attendance; ang setup tree ng B1Admin ay minamarkahan bilang unassigned ang mga group na `trackAttendance` na walang row sa `groupServiceTimes` |
| `parentPickup` | Minamarkahan ang isang child room. Ang pag-check in dito ay ginagawang "child" visit ang visit, na nagpi-print ng family pickup label at naglalagay ng security code sa nametag |
| `printNametag` | Kung magpi-print ng nametag ang mga check-in sa group na ito |
| `capacity` / `guestCapacity` / `checkinClosed` | Mga limitasyon sa kapasidad ng room at isang mahigpit na "closed" switch. Ipinapatupad ng server sa pamamagitan ng check-in gate (ini-edit sa group settings ng B1Admin sa ilalim ng "Check-In Capacity") |
| `volunteerRatio` / `minVolunteers` | Ratio ng bata sa volunteer at minimum na bilang ng volunteer, ipinapatupad ayon sa setting na `ratioEnforcement` ng buong simbahan |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Mga hangganan ng edad/grade para sa eligibility, sinusuri sa kiosk para i-highlight o i-dim ang mga room |

Pare-pareho ang paraan ng bawat client sa pag-denormalize (halimbawa `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): sabay-sabay na kinukuha ang `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes`, at `GET /membership/groups`. Pagkatapos, para sa bawat service time, kinokolekta ang mga group na ang row sa `groupServiceTimes` ay tumuturo rito sa `serviceTime.groups`. Ang array na iyon ang ipinapakita ng room picker, na nakaayos ayon sa `categoryName` ng group.

Ina-edit ang mga pagtatalaga mula sa page ng group sa B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx`, gamit ang `POST`/`DELETE /attendance/groupservicetimes`). Nakikita naman ang buong Campus → Service → Service Time → Group tree sa `B1Admin/src/attendance/components/AttendanceSetup.tsx` sa pamamagitan ng `GET /attendance/attendancerecords/tree`.

:::info
Dahil ang groups ang iisang pinagmumulan ng katotohanan, ang parehong group membership ang nagpapagana sa routing ng kiosk, sa roster-style na attendance sa mga group page ng B1Admin, at sa attendance reporting. Ang pagtatalaga ng group sa service time ay ang tanging hakbang na kailangan para maging destinasyon ng check-in.
:::

## Child safety

### Mga check-in type

Bawat visit ay may dalang `checkinType`: `member`, `guest`, o `volunteer`. Ang NULL ay nangangahulugang legacy/member (migration `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Pinipili ang type **sa panig ng kiosk**: mga chip na Member / Guest / Volunteer sa pinalawak na row ng miyembro (`B1Checkin/src/components/MemberServiceTimes.tsx`), at ikinakabit sa bawat nakabinbing visit sa pagtatapos (`app/checkinComplete.tsx`, default na `member`). Ginagamit ito ng server sa gate: ang mga volunteer ay binibilang sa ratio coverage sa halip na sa capacity, at ang mga guest ay binibilang laban sa `guestCapacity`.

### Capacity at volunteer-ratio gates

Tumatakbo ang `CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) sa loob ng `postCheckin` bago ang anumang save. Hindi transactional ang endpoint, kaya ang pag-gate bago mag-save ang mekanismo ng katumpakan. Kinukuha nito ang kasalukuyang occupancy kada targeted na group (`VisitRepo.countActiveByGroupToday`) at ang config ng group sa pamamagitan ng membership module gateway, saka ini-uuri ang mga paglabag:

- **Mahigpit (laging hinaharang):** `checkinClosed`, `current + incoming > capacity`, at bilang ng guest na lampas sa `guestCapacity`. Tinatanggihan ang batch sa pamamagitan ng `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }`, at ipinapakita ng kiosk ang pinangalanang room.
- **Ratio (nagbababala o humaharang):** mga hindi volunteer na papasok sa room kung saan `volunteers < minVolunteers`, walang volunteer, o `children > volunteers × volunteerRatio`. Nakadepende ang tindi sa setting ng simbahan na `ratioEnforcement` (`"warn"` ang default, o `"block"`; ini-edit sa B1Admin Manage Church → Check-In, `CheckinSettingsEdit.tsx`). Sa warn mode, nagbabalik ito ng `409 { warning: true, error: "ratio", … }` maliban kung muling isumite ng client ang request na may `acknowledgeWarnings=true`. Ang muling pagsusumite na iyon ang override ng staff-confirm ng kiosk.

### Mga naka-iskedyul na check-in window

Maaaring may opsyonal na lingguhang schedule ang isang service time (`dayOfWeek` 0–6 kung saan 0 = Linggo, `startTime`/`endTime` bilang `HH:mm`, `checkinOpenMinutes`, `checkinCloseMinutes`). Ini-edit ito sa form ng service time sa **Attendance → Setup** ng B1Admin (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, "Check-in Schedule"). Itinuturing lamang ng `CheckinGateHelper.hasSchedule()` na naka-iskedyul ang isang service time kapag parehong may `dayOfWeek` at `startTime`. Hindi kailanman tinitingnan ayon sa oras ang mga hindi naka-iskedyul na service time. Kinakalkula ng `isServiceTimeOpen()` ang window sa lokal na oras ng orasan (`DateHelper.toChurchTime`). Kinukuha ang zone para sa bawat service time ng `CheckinTimeZoneHelper.load()` (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`). Una ang `timezone` ng campus ng service (`service.campusId`, sa pamamagitan ng `MembershipModuleGateway.loadCampusTimeZones`), sumunod ang `timeZone` ng simbahan (itinakda sa Church Information ng B1Admin), pagkatapos ang unang campus na hindi tinanggal at may `timezone` (`loadCampusTimeZone`), at saka pa lamang ang `America/New_York`. Nauuna ang campus dahil maraming simbahan ang may backfill na `America/New_York` bilang zone ng simbahan. Pareho ang paraan ng pag-resolve ng listing at posting path sa ibaba. Ang window ay nagsisimula `checkinOpenMinutes` bago ang simula at nagtatapos `checkinCloseMinutes` pagkatapos ng dulo (o pagkatapos ng simula kapag walang dulo). Kaya nitong hawakan ang mga window na tumatawid sa hatinggabi o sa hangganan ng linggo.

Ipinapatupad ang window sa dalawang lugar:

- **Listing:** Nilalagyan ng `GET /attendance/servicetimes` ang bawat row ng computed na boolean na `checkinOpen`. Pinananatili ng self check-in ng B1App (`CheckinPage.tsx`) at ng service picker ng B1Checkin (`app/services.tsx`) ang bawat oras. Kapag sarado ang lahat ng oras ng isang service, ipinapakita nila ang pinakamalapit na pagbubukas ("Check-in opens Sun 9:30 AM." sa B1App, "Check-in for this service opens Sun 9:30 AM." sa B1Checkin, mula sa `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`). Kapag hindi makalkula ang pagbubukas, ipinapakita ang "Check-in isn't open for this service right now." (may Back button ang kiosk para pumili ng ibang service). Kung hindi, ang mga saradong oras ay lumalabas bilang hindi mapipiling row na "Closed" / "Closed · opens 9:30 AM". Muling sinusuri ng household screen ng B1Checkin (`MemberServiceTimes.tsx`) kung bukas ang oras nang live gamit ang orasan ng device at `ServiceTimeHelper.isCheckinOpen()` (time zone ng device, hindi ng simbahan), kaya nagbubukas at nagsasara sa tamang oras ang kiosk na naiwang tumatakbo. Ipinapakita rin nito ang "Kids Room 1 · Checked in" (pangalan ng group) sa saradong oras na hawak na ng tao.
- **Posting:** sa loob ng `evaluateGates()`, bago ang capacity/ratio evaluation, tinatanggihan ng `findClosedServiceTimeGroups()` ang batch sa pamamagitan ng `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` kung ang service time ng anumang targeted na session ay nasa labas ng window nito. Dahil muling ipino-post ang umiiral na visit ng isang household ngayong araw sa bawat check-in, nilalampasan ng gate na ito ang mga session na hawak na ng tao (`personId|sessionId` sa umiiral na mga visit). Kaya hindi natatanggihan ang pagdagdag ng susunod na bukas na service time dahil nagsara na ang naunang window. Ipinapakita ito ng B1Checkin sa pamamagitan ng hard-gate screen nito na may dahilan na "check-in isn't open right now" (ang mga paglabag sa capacity ay nagsasabing "room is full or closed").

### Age/grade eligibility (sa panig ng kiosk)

Advisory na UI ang eligibility ng room, sinusuri sa kiosk at hindi ipinapatupad ng server. Inihahambing ng `B1Checkin/src/helpers/EligibilityHelper.ts` ang birthdate/grade ng tao sa `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` ng group (pagkakasunod ng grade: PreK, K, 1–12, Graduated). Nagbabalik ito ng `eligible` / `ineligible` / `unknown`. Kapag kulang ang datos, `unknown` ang lalabas at hindi kailanman natatago ang room. Kinakalkula ang edad at grade ayon sa **grade promotion date** ng simbahan (setting na `gradePromotionDate`, `"MM-DD"`, ini-edit sa `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`). Kinukuha ito ng kiosk mula sa `GET /attendance/checkin/settings`, at pinipili ng `resolveAsOfDate` ang pinakabagong pangyayari na nasa o bago ngayong araw. Itinatampok ng room picker ang mga eligible na room at dinidim ang mga ineligible. Ang pagpili ng dimmed na room ay nangangailangan ng kumpirmasyon ng staff.

### Pinagkakatiwalaan at hindi awtorisadong pagsundo

Ang mga taong susundo ay isang membership entity, kada household: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts`, na may householdId, opsyonal na personId, name, photoUrl, relationship, `status` na `trusted` / `notAuthorized`, at notes). Ang CRUD ay `GET /membership/householdpickup/:householdId` (sinumang naka-authenticate na user ng simbahan, para mabasa ito ng mga kiosk), kasama ang `POST` / `DELETE` na may gate na `people.edit`. Pinamamahalaan ng staff ang listahan sa card na **Pickup** ng page ng tao (`B1Admin/src/people/components/PickupPeople.tsx`): larawan, relasyon, at chip ng status na Trusted/Not Authorized.

Sa check-out (`B1Checkin/app/checkout.tsx`), kinukuha ng kiosk ang listahan ng susundo ng household. Ang mga entry na `trusted` ay lumalabas bilang mga pickup card na maaaring pindutin, kasama ang grid ng larawan ng mga adult sa household. Ang "Other" na pangalang tinype nang malaya ay fuzzy-matched (Levenshtein, `src/helpers/PickupMatchHelper.ts`) laban sa mga entry na `notAuthorized`. Kapag tumama ang match, hinaharang ang check-out sa pamamagitan ng warning sheet at ng staff na **Override** button. Naitatala ang override sa mismong visit: ipinapadala nito ang `checkedOutBy` bilang `"OVERRIDE: {name}"` sa karaniwang `POST /attendance/visits/checkout`. Kaya napupunta ito sa attendance record at sa `attendance.checkout` webhook, at hindi sa hiwalay na audit table.

### Page-a-parent at emergency broadcast

Naglalantad ang `CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) ng dalawang SMS endpoint:

- `POST /page`, na may `{ visitId, message }`: nagpapadala ng page sa mga guardian ng iisang naka-check-in na bata (check-out screen ng kiosk, manned mode).
- `POST /broadcast`, na may `{ serviceId, message }`: nagte-text sa lahat ng adult ng bawat naka-check-in na household para sa isang service (admin settings ng kiosk, sa likod ng sheet na nangangailangan ng type na `EMERGENCY` para kumpirmahin, sa `B1Checkin/app/adminSettings.tsx`).

Parehong nireresolba ng dalawa ang adult ng household sa pamamagitan ng membership gateway, saka ipinapasa ang pagpapadala sa **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`). Ito ang cross-module na pinto papunta sa texting provider na naka-configure ng simbahan (`@churchapps/texting`: TextInChurch, Clearstream, o MutualMinistry; walang built-in na SMS sender). Naglalagay ang gateway ng row na `sentText` at mga entry na `deliveryLog` kada tatanggap, at nililimitahan ang batch sa 500 tatanggap. Kapag walang naka-configure na provider, nagbabalik ito ng `no_provider`, at ipinapakita ito ng kiosk bilang "No SMS provider configured". Dinededupe ng `dispatch()` ng controller ang mga numero ng telepono at nilalaktawan ang mga taong walang mobile o may `optedOut`. Nagbabalik ito ng `{ sent, failed, skippedOptedOut, skippedNoPhone }` para maipakita ng kiosk kung ano ang nilaktawan.

## Ang kiosk (B1Checkin)

Ang mga screen ay mga file ng expo-router sa ilalim ng `B1Checkin/app/`. Ang estadong nasa pagitan ng mga screen ay nasa static na klaseng `CachedData` (`src/helpers/CachedData.ts`), hindi sa React state.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Lookup** (`app/lookup.tsx`): maghanap sa pamamagitan ng telepono (`GET /membership/people/search/phone?number=`, huling 4 digit o buo) o sa pangalan (`GET /membership/people/search?term=`). Kapag pinili ang isang tugma, kinukuha ang household (`GET /membership/people/household/{householdId}`) at ang mga umiiral na visit (`GET /attendance/visits/checkin`), at pinupuno ang `pendingVisits` ng mga pinili noong nakaraang linggo.
2. **Pagrepaso ng household** (`app/household.tsx`, `src/components/MemberList.tsx`): ipinapakita ng bawat row ng miyembro ang badge na naka-check in na, badge ng allergy/`nametagNotes`, at kasalukuyang chip ng room. Kapag pinalawak ang isang miyembro, nakalista ang bawat service time na may button ng room, kasama ang mga chip ng check-in type na Member / Guest / Volunteer (`MemberServiceTimes.tsx`). Sa ilalim ng pangalan ng bawat service time, ipinapakita ng `ServiceTimeHelper.getGroupSummary()` ang mga group na inaalok doon (ang mga pangalan sa `serviceTime.groups`, na tinanggalan ng espasyo, dinedupe nang hindi sensitibo sa malaking/maliit na titik, at pinagsama gamit ang kuwit). Walang lumalabas kapag walang group ang oras.
3. **Pagtatalaga ng group** (`app/selectGroup.tsx`): puno ng kategorya na binuo mula sa `serviceTime.groups`. Naka-highlight ang mga room na eligible sa edad/grade, at dinidim ang mga ineligible sa likod ng kumpirmasyon ng staff (tingnan ang [Age/grade eligibility](#agegrade-eligibility-kiosk-side)). Kapag pinili ang room, nagsusulat ito ng visitSession na `{ session: { serviceTimeId, groupId } }` sa nakabinbing visit ng taong iyon (`src/helpers/VisitSessionHelper.ts`). Binubura ng "None" ang pagpili.
4. **Kumpleto** (`app/checkinComplete.tsx`): `POST /attendance/visits/checkin` na may `pendingVisits` (bawat isa ay may markang `checkinType`). Pagkatapos, nagpi-print ng label kung may naka-configure na printer, at kusang bumabalik sa lookup. Kapag nagbalik ang `409` ng capacity o `notOpen`, ipinapakita ang pinangalanang room kasama ang dahilan (puno/sarado, o hindi bukas ang check-in). Kapag may ratio warning, nag-aalok ito ng staff confirm na muling nagsusumite gamit ang `acknowledgeWarnings=true`.

Ang screen ng **check-out** (`app/checkout.tsx`) ay tumatanggap ng 4-character na security code sa pamamagitan ng input na kusang nakatutok. Kaya gumagana ang USB/Bluetooth na keyboard-wedge barcode scanner nang walang camera. Tumatanggap din ito ng on-screen keypad na gumagamit ng parehong alpabeto, at kusang nagsusumite kapag umabot sa 4 na karakter. Ang button na **Scan** ay nagbubukas ng sheet na may shared na camera na `src/components/CodeScanner.tsx` (default ang back-facing, tumatanggap ng QR, Code 128, at Code 39). Ginagamit ito ng mga istasyong walang wedge scanner para mabasa ang pickup label. Ang na-scan na code ay papasok sa parehong `handleCode()` path tulad ng tinype na input. Hinahanap ng screen ang code, ipinapakita ang mga batang susunduin, at inilalahad ang **mga pinagkakatiwalaang taong susundo** ng household bilang mga card na maaaring pindutin, kasama ang grid ng larawan ng mga adult sa household (at ang opsyong "Other" na libreng teksto na fuzzy-checked laban sa mga pangalang hindi awtorisado, tingnan ang [Trusted and not-authorized pickup](#trusted-and-not-authorized-pickup)). Pagkatapos, nagpo-post ito ng `POST /attendance/visits/checkout` gamit ang pangalan/id ng pumili. Sa manned mode, nag-aalok din ang screen ng **Page a parent** (`POST /attendance/checkin/page`) at ng **security-label reprint**. Muling binubuo ng `reprint()` ang mga label ng pamilya gamit ang `LabelHelper.getAllLabelsFor(...)` at ipinapasa ang mga ito sa parehong pipeline ng `PrintUI` gaya ng check-in.

Ang personalidad ng istasyon ay isang flag ng AsyncStorage na `@StationMode` (`"self"` o `"manned"`, binabago sa `app/adminSettings.tsx`). Idinadagdag ng manned mode ang entry point ng check-out sa lookup screen, at ang pag-e-edit ng profile ng bawat miyembro (`POST /membership/people`) mula sa household screen. Naka-built in ang kiosk hardening. May opsyonal na PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) na nagbabantay sa admin at printer screen. Bumubukas lamang ang admin screen sa pamamagitan ng 7 mabilisang tap sa logo sa header. At sa pagitan ng mga pamilya, pumapalit ang idle attract screen (`src/hooks/useInactivityTimer.ts`).

## Self check-in (B1App)

Nagche-check in ang mga miyembro mula sa b1.church portal sa screen na `/mobile/checkin` (ibinibigay ng `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` sa `screens/CheckinPage.tsx`). Kailangan nito ng naka-log in na user, at dumadaan sa parehong apat na hakbang ng kiosk: services → household → groups → complete. Gumagamit ito ng parehong endpoint, at nasa `B1App/src/helpers/CheckinHelper.ts` ang estado. Ang pagkakaiba sa kiosk: ang household ay galing sa sariling `householdId` ng naka-log in na user (walang hakbang sa paghahanap), at walang pag-print ng label. Sa halip, ipinapakita ng completion screen ang security code ng batch bilang QR (`qrcode.react`) na may hint na "show this at a check-in station". Kapag naka-check in na ang household pagkakarga ng page, ire-display ng button na "Show check-in code" ang QR mula sa unang umiiral na visit (mula sa `GET /attendance/visits/checkin`) na may dalang `securityCode`. Agad na naitatala ang check-in sa oras ng pagsusumite (walang pending state). Ang QR lamang ang nagpapagana ng pag-print ng label sa kiosk.

**Pag-print ng label mula sa telepono papunta sa kiosk** (`B1Checkin/app/scan.tsx`, na naaabot mula sa button na "Scan code" ng QR sa lookup screen): ipinapakita ng kiosk ang `CodeScanner` (isang `expo-camera` `CameraView`, default ang front-facing at maaaring ibaliktad) na naghahanap ng QR code. Tinatanggap ng `ScanCodeHelper.parse()` ang payload lamang kapag ito ay isang bare na 4-character na code sa alpabeto ng security code. Binabalewala ng `ScanCodeHelper.isRepeat()` ang parehong code sa loob ng 4 na segundo, kaya gumagana ang QR ng B1App at ang QR block ng nakalimbag na label. Pagkatapos, sinusundan ng screen ang reprint path ng check-out: `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI`. Pagkatapos nito, bumabalik ito sa lookup. Walang nagaganap na pagsusulat ng attendance sa oras ng scan. Mga label lamang. Ang mga code na walang aktibong visit, mga istasyong walang printer, at mga group na walang label ay bawat isa ay nagpapakita ng toast at bumabalik sa lookup.

Ang mga type at `ApiHelper`/`ArrayHelper` ay galing sa `@churchapps/helpers` at `@churchapps/apphelper`. Walang React component na ibinabahagi sa B1Admin.

## Attendance sa panig ng admin (B1Admin)

- **Setup**: `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) ang nagre-render ng structure tree at gumagawa ng services (`ServiceEdit.tsx`) at service times (`ServiceTimeEdit.tsx`). Galing sa membership ang datos ng campus sa pamamagitan ng `useCampuses()` hook.
- **Manual na attendance** ay nasa panig ng Groups, hindi sa attendance section. Gumagawa ng session ang `B1Admin/src/groups/components/GroupSessionsTab.tsx` (`POST /attendance/sessions`). Kapag nagdadagdag, maaaring isama ng `SessionEdit.tsx` ang isang session para sa bawat ibang group na may kaparehong napiling service time, at nilalaktawan ang mga group na may session na sa petsang iyon. Minamarkahan ng tao bilang present sa pamamagitan ng `POST /attendance/visitsessions/log`, na naghahanap o gumagawa ng visit para sa taong iyon at session na iyon. Maaaring magtala ng attendance ang mga group leader para sa sarili nilang group nang walang pahintulot na `attendance.edit`, dahil tinitingnan ng mga controller ang `au.leaderGroupIds`.
- **Reporting**: ang trend ng attendance at group attendance ay mga report na tinutukoy ng server (`B1Admin/src/components/reporting/ReportWithFilter.tsx` laban sa ReportingApi; mga kahulugan sa `Api/reports/*.json`). Parehong tumatanggap ng `startDate`/`endDate` (kasama ang end date). Ang trend report ay default mula isang taon na ang nakalipas hanggang ngayon, at nagdadagdag ng column na `sessionDates` kada linggo. Kasama sa on-screen tree ng group attendance ang `checkinTime` ng bawat visit at ang `membershipStatus` ng tao. Galing sa kasamang report na `groupAttendanceDownload` ang CSV ng group attendance. Inii-pivot ito ng `GroupAttendanceDownloadHelper` sa isang row kada miyembro ng group, na may column na present/absent para sa bawat petsadong session. Ang kasaysayan ng bawat tao ay `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Pag-print ng label

### Mga template at ang designer

Dinidisenyo ng mga simbahan ang sarili nilang label sa B1Admin sa `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` at `components/LabelEditor.tsx`, na maaabot mula sa page ng settings ng Check-In). Ang template ay isang row na `labelTemplates` na ang `content` ay JSON array ng mga block: `text`, `field`, `barcode`, `qrcode`, o `box`. Bawat isa ay nakaposisyon sa porsyentong koordinado, may font, alignment, symbology (`code39`/`code128`/`qr`), at opsyonal na kondisyon ng visibility (halimbawa, ipakita lamang ang kahon ng allergy kapag may laman ang `person.nametagNotes`). May dalawang `labelType`: `nametag` (isa kada naka-check-in na tao; mga field tulad ng `person.displayName`, `sessions`, `securityCode`, at `person.isBirthdayWeek`, na `"true"` kapag nasa loob ng 3 araw mula ngayon ang buwan/araw ng kaarawan, kahit tumawid sa katapusan ng taon, kinakalkula ng `LabelHelper.isBirthdayWithin()`) at `pickup` (isa kada pamilya; mga field tulad ng `children` at `childrenAllergies`). Nagpapatupad ang server ng iisang default kada type bawat simbahan (`LabelTemplateController.save`). Kasama sa designer ang mga starter template na sumasalamin sa mga naka-bundle na label ng kiosk, at nagpapakita ng preview gamit ang sample data.

### Pag-render at pag-print sa kiosk

Sa pagtatapos ng check-in, nagpapasya ang `B1Checkin/src/helpers/LabelHelper.ts` kung ano ang ipi-print batay sa mga group flag ng bawat nakabinbing visit: mga nametag para sa mga group na `printNametag`, at isang family pickup label kung may visit na tumama sa group na `parentPickup`. Nilalaktawan ng `LabelHelper.selectChildVisits()` ang mga visit na may `checkinType` na `volunteer`, kaya hindi nagti-trigger ng pickup label ang isang childcare worker sa Parent Pickup room. Ikinakabit ang security code mula sa response ng check-in sa nametag ng bata at sa pickup label. Walang code ang nametag ng adult. Kung may template ang simbahan, ginagawang standalone na HTML document ng `LabelRenderer` (`src/helpers/LabelRenderer.ts`) ang mga block at field context. Kung wala, ginagamit ang mga naka-bundle na HTML label sa `B1Checkin/assets/labels/` na may pagpapalit ng placeholder.

Ginagawang inline SVG ang mga barcode ng mga encoder na pure-TypeScript sa `B1Checkin/src/helpers/barcode.ts`. Kasama rito ang mga pattern table ng Code 39, mga width table ng Code 128 (code set B na may mod-103 checksum), at QR sa pamamagitan ng package na `qrcode`. **Sadyang doble ang mga encoder na ito sa B1Admin** (`LabelEditor.tsx` ay naglalaman ng parehong table, at nakasaad ito sa code comment), para magkatulad hanggang sa pixel ang preview ng designer sa output ng kiosk. Kailangang salaminin sa isa ang anumang pagbabago sa isa pa.

Ang print pipeline (`src/components/PrintUI.tsx`) ay nagre-render ng bawat HTML label sa isang `WebView`, kinukuha ito bilang JPG sa pamamagitan ng `react-native-view-shot`, at ibinibigay ang mga URI ng larawan sa native na Expo module na **printer-helper** (`B1Checkin/modules/printer-helper/`). Inilalantad ng module ang `scan()`, `checkInit()`, `printUris()`, at mga status event, na may provider kada brand sa parehong platform:

| Brand | Android | iOS | Mga tala |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Mga network printer ng seryeng QL (QL-800/810W/820NWB/1100/1110NWB…), mga die-cut na label na 29×90, ang inirerekomendang default |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` at `ZebraBridge` | Network discovery at TCP/ZPL image printing |

Nasa `app/printers.tsx` ang pagpili ng printer (ang network scan ay nagbabalik ng mga entry na `brand~model~ip`, at naka-save sa AsyncStorage ang pinili). Pinananatili naman ng `src/helpers/PrinterLog.ts` ang diagnostic log sa device, na ipinapakita sa pamamagitan ng live status dot sa header ng kiosk.

## Guest registration

May dalawang paraan para makalikha ng tao sa gitna ng check-in:

- **Sa kiosk**: ang "Add guest" sa household screen ay nagbubukas ng `B1Checkin/app/addGuest.tsx`. Una nitong hinahanap sa `GET /membership/people/search?term=` ang umiiral na hindi miyembrong tugma. Kung wala, gumagawa ito ng bago sa pamamagitan ng `POST /membership/people`, na ikinakabit sa kasalukuyang household. Dumadaan ang guest sa pagtatalaga ng group gaya ng ibang miyembro.
- **Self-serve sa pamamagitan ng QR**: kapag naka-on ang setting ng simbahan na `enableQRGuestRegistration` (naka-configure sa Check-In settings ng B1Admin, binabasa mula sa `GET /membership/settings/public/{churchId}`), ang lookup screen ng kiosk ay nagpapakita ng QR code na tumuturo sa `https://{subdomain}.b1.church/guest-register?serviceId=`. Hinahayaan ng page na ito ng B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) na magparehistro ang bisitang pamilya sa sarili nilang telepono sa pamamagitan ng anonymous na endpoint na `POST /membership/people/guest-register`, para tuloy-tuloy ang pila sa kiosk. May button na **Register here** din ang QR sheet na nagbubukas ng parehong page sa kiosk (`app/guestRegister.tsx`) sa isang incognito at walang-cache na `WebView`. Binubuo ng `src/helpers/GuestRegisterHelper.ts` ang URL para sa QR at sa WebView, at hinaharangan ang nabigasyon palabas ng `https://{subdomain}.b1.church/guest-register`. Bumabalik sa lookup ang screen kapag pinindot ang **Done**, kapag bumalik, o pagkatapos ng 120 segundo ng kawalan ng aktibidad (ang pag-type sa form ay ipinapasa mula sa WebView bilang aktibidad). Inaalis ang WebView sa pagkakakabit, kaya hindi napupunta sa susunod na pamilya ang mga entry ng nakaraan.

Ang pag-sign up sa pamamagitan ng QR ay pinapatakbo ng mga setting ng simbahan na sine-save mula sa card na **QR Guest Registration** sa B1Admin (`src/mobile/CheckInPage.tsx`):

| Setting | Visibility | Layunin |
|---|---|---|
| `enableQRGuestRegistration` | public | Opt-in na switch para sa QR ng kiosk at sa mga anonymous na endpoint |
| `guestRegistrationFields` | public | JSON map ng `email`, `phone`, `address`, `birthDate`, `gender`, `maritalStatus`, `grade`, `comments` → `"off"` / `"optional"` / `"required"`. Default: opsyonal ang email at telepono, naka-off ang iba. Palaging kinakailangan ang unang at apelyido |
| `guestRegistrationImage` | public | URL ng larawan sa header. Ipinapakita ito ng B1App na 16:9 sa lugar ng icon sa form at sa screen ng kumpirmasyon |
| `guestRegistrationGroupId` | private | Group kung saan idinadagdag ang bawat sign-up (hindi ito nakikita o napipili ng mga guest) |
| `guestRegistrationRecordAttendance` | private | `"true"` para maitala rin ang attendance para sa group na iyon |

Kinukuha ng `src/components/checkin/GuestRegister.tsx` ng B1App ang checklist mula sa anonymous na `GET /membership/people/guest-register/options?churchId=`. Ipinapakita lamang nito ang mga kasamang field (email, telepono, marital status, at address sa primary contact; birth date, gender, at grade bawat miyembro; at isang kahon ng comments), at tanging ang mga iyon ang ipinapadala. Muling ipinapatupad ng server ang checklist sa `GuestRegistrationHelper.sanitize()`. Tinatanggal ang mga field na naka-off, at ang nawawalang kinakailangang field o value na wala sa listahan ay nagiging 400. Pagkatapos, gumagawa ang `PersonHelper.registerGuestHousehold()` ng bagong household (walang dedupe ng email) kung saan ang bawat miyembro ay may `membershipStatus: "Visitor"`, at naglalabas ng `person.created` para sa bawat isa. Pagkatapos nito, ang mga pagkabigo ay nilo-log at hindi ibinabalik. Idinadagdag ang mga miyembro sa naka-configure na group (`group.member.added`). Kung naka-on ang pagtatala ng attendance, minamarkahan ng `AttendanceModuleGateway.recordAttendance()` ang bawat miyembro bilang present para sa bawat service time ng group na may schedule at bukas ang check-in window nito ngayon (`CheckinGateHelper.isServiceTimeOpen`). Kung kinakailangan, gumagawa ito ng session para sa petsa ngayon ayon sa oras ng simbahan. Walang naitatala para sa mga unscheduled na service time at para sa mga sign-up na nasa labas ng window. At nagiging hidden person-note conversation sa head of household ang mga comment (author ng mensahe: "Guest sign-up"), na naka-link sa pamamagitan ng `person.conversationId`.

## Mga Kaugnay na Pahina

- [Attendance Endpoints](../api/endpoints/attendance) -- Buong REST surface para sa campuses, services, sessions, visits, at visit sessions
- [Membership Endpoints](../api/endpoints/membership) -- Mga tao, household, at groups
- [Webhooks](../api/webhooks) -- Ang mga event na `session.created`, `attendance.recorded`, at `attendance.checkout`
- [Module Structure](../api/module-structure) -- Kung paano inoorganisa ang attendance module sa server-side
