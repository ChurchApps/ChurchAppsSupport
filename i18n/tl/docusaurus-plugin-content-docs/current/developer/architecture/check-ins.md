---
title: "Mga Check-In"
---

# Mga Check-In

<div class="article-intro">

Ang check-in ay isang sistema na may tatlong pasukan: ang B1Checkin kiosk app para sa mga istasyong may nagbabantay at self-serve, ang self check-in sa loob ng B1App member portal, at ang attendance sa panig ng admin sa B1Admin. Lahat ng tatlo ay nagsusulat sa iisang attendance module sa core Api, at ang pag-ruta sa mga silid-aralan ay ganap na hinihimok ng mga Grupo -- walang hiwalay na entity para sa "lokasyon" o "silid". May patong ng kaligtasan ng bata sa ibabaw nito: mga uri ng check-in bawat visit, mga gate sa kapasidad at ratio ng boluntaryo sa panig ng server, pagiging karapat-dapat ayon sa edad/grado sa panig ng kiosk, beripikasyon ng pinagkakatiwalaang sundo sa check-out, at pag-page sa magulang sa pamamagitan ng texting provider ng simbahan. Inilalarawan ng pahinang ito ang data model, ang mga daloy ng check-in, ang patong ng kaligtasan, at ang pipeline ng pag-print ng label.

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
| Kiosk | `B1Checkin` | Expo / React Native, expo-router file routing; mga EAS build para sa Android, Amazon Fire, at iOS; mga OTA update sa pamamagitan ng `expo-updates` | Istasyong may nagbabantay o self-serve na may pag-print ng label at beripikadong check-out |
| Self check-in | `B1App` | Next.js (b1.church member portal) | Ang mga naka-log in na miyembro ay nagche-check in ng kanilang sambahayan mula sa telepono; walang pag-print |
| Admin | `B1Admin` | React SPA | Nagko-configure ng istruktura ng serbisyo, nagtatalaga ng mga grupo sa mga oras ng serbisyo, nagdidisenyo ng mga label, nagre-record ng manu-manong attendance, at nagpapatakbo ng mga ulat |

Ang lahat ng tatlo ay tumatawag sa parehong dalawang API module sa pamamagitan ng `ApiHelper`: **MembershipApi** (`/membership`) para sa mga tao, sambahayan, at grupo; **AttendanceApi** (`/attendance`) para sa lahat ng nasa ibaba.

## Data model (`Api/src/modules/attendance`)

| Entity / table | Mga pangunahing field | Kahulugan |
|----------------|-----------|---------|
| `campuses` | name, address | Hindi na ginagamit dito -- ang mga campus ay minamaster sa membership module (`/membership/campuses`); ang kopya sa attendance ay naka-freeze bilang read-only para sa mga lumang reader (`models/Campus.ts`) |
| `services` | campusId, name | Isang paulit-ulit na pagtitipon, hal. "Sunday Morning" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name | Isang time slot sa loob ng isang serbisyo, hal. "9:00 AM" (`models/ServiceTime.ts`) |
| `groupServiceTimes` | groupId, serviceTimeId | Join table: kung aling mga grupo (silid-aralan) ang nagtitipon sa aling mga oras ng serbisyo (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Isang pagtitipon ng isang grupo sa isang petsa -- lazy na nililikha sa oras ng check-in (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Isang taong dumalo sa isang petsa (`models/Visit.ts`). Ang `checkinType` ay `member` / `guest` / `volunteer` (NULL = lumang member), itinatakda ng kiosk at ginagamit ng mga gate sa kapasidad/ratio |
| `visitSessions` | visitId, sessionId | Kung aling (mga) sesyon ang sakop ng isang visit -- ang batang na-check in sa dalawang oras ng serbisyo ay magkakaroon ng dalawang row (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON blocks) | Mga layout ng label na maaaring idisenyo (`models/LabelTemplate.ts`) |

### Paano sine-save ang natapos na check-in

Ang `VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) ang humahawak ng `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Ang body ay isang array ng mga `Visit` object, bawat isa ay may dalang `visitSessions` na ang naka-embed na `session` ay pangalan lamang ng isang pares na `(serviceTimeId, groupId)`. Pagkatapos ay gagawin ng server ang sumusunod:

1. **Bina-gate ang kapasidad at mga ratio bago ang anumang pagsulat.** Sinusuri ng `evaluateGates()` → `CheckinGateHelper.evaluate()` ang kapasidad, kapasidad ng bisita, closed flag, at ratio ng boluntaryo ng bawat target na silid laban sa kasalukuyang okupasyon. Ang postCheckin ay **hindi transactional**, kaya dapat tumakbo ang gate bago ang unang pag-save -- ang matinding paglabag ay nagbabalik ng 409 na nagpapangalan sa mga silid na lumabag at walang nase-save. Tingnan ang [Mga gate sa kapasidad at ratio ng boluntaryo](#capacity-and-volunteer-ratio-gates).
2. **Lazy na nireresolba ang mga sesyon.** Hinahanap o ginagawa ng `getSessionId()` ang row ng `sessions` para sa `(groupId, serviceTimeId, today)` -- ang mga session id ay kina-cache sa loob ng proseso kada petsa. Ang mga bagong sesyon ay nag-e-emit ng webhook na `session.created`. Ang loop ay isang awaited na `for..of` -- ang naunang fire-and-forget na `forEach(async …)` ay nag-race sa pag-save at nagsulat ng NULL na sessionId sa unang paglikha ng sesyon (naayos na; nakasaad sa isang code comment sa loop).
3. **Pinapalitan ang mga tala ng araw.** Ang anumang kasalukuyang visit ng mga taong iyon sa serbisyong iyon ngayong araw ay binubura kasama ang kanilang mga visitSession, at pagkatapos ay sine-save ang isinumiteng set. Kaya ang muling pag-check in ng isang pamilya ay isang idempotent na operasyong "ito ang kasalukuyang estado," hindi pagdaragdag. Ang pagpasa ng `?checkDuplicates=true` ay nagbabalik naman ng `{ duplicates: [personId…] }` nang walang isinusulat, na siyang paraan ng kiosk para magbabala bago mag-overwrite.
4. **Gumagawa ng isang security code bawat batch.** Ang `SecurityCodeHelper.generate()` ay gumagawa ng 4-na-karakter na code mula sa alpabetong `23456789BCDFGHJKLMNPQRSTVWXYZ` (walang patinig o malilitong karakter, kaya hindi makakabuo ng salita ang mga code o mababasa nang mali). Uulit ang server kapag may banggaan laban sa mga bukas na visit ng parehong simbahan sa parehong araw, at ilalagay ang code sa bawat visit sa batch.
5. **Nagbabalik ng `{ streaks, securityCode }`.** Ang `streaks` ay nagmamapa ng personId sa bilang ng magkakasunod na linggong pagdalo; ipinagdiriwang ng kiosk ang mga milestone (bawat ika-5 linggo) gamit ang confetti.

Ang bawat na-save na visit ay nag-e-emit din ng webhook na `attendance.recorded`. Ang read side, `GET /attendance/visits/checkin`, ay nagbabalik ng mga visit ng mga tao mula sa kanilang **huling naka-log na petsa** -- kung ito ay nakaraang linggo, tinatanggal ang mga id kaya ang client ay nakakatanggap ng pre-filled na kopya ng mga pinili noong nakaraang linggong silid na masi-save bilang mga bagong tala.

### Check-out

Dalawang endpoint ang kumukumpleto sa daloy (`VisitController`):

- `GET /attendance/visits/code/:code` -- ang mga visit ngayong araw na hindi pa nacheck-out na may security code na iyon, kasama ang mga sesyon.
- `POST /attendance/visits/checkout` -- body na `{ visitIds, checkedOutBy?, checkedOutById? }`; tina-timestamp ang `checkoutTime` at kung sino ang sumundo, at nag-e-emit ng webhook na `attendance.checkout` bawat visit.

Mga permission: ang mga kiosk ay nag-a-authenticate gamit ang `attendance.checkin`, na nagbibigay lamang ng check-in/check-out/label-template na saklaw; ang `attendance.view`/`attendance.edit` ay sumasaklaw sa pag-uulat at manu-manong pagpasok; ang istruktura (mga serbisyo, oras ng serbisyo, pagtatalaga ng grupo) ay nangangailangan ng `services.edit`. Ang self check-in ng miyembro (B1App) ay hindi nangangailangan ng anumang permission: sinumang naka-authenticate na user na may naka-link na tao sa simbahan ay maaaring tumawag ng `GET`/`POST /attendance/visits/checkin`, at nililimitahan ng server ang mga isinumiteng `personId` sa sariling sambahayan ng tumatawag (403 kung hindi -- ito ang bakod na pumipigil na mabasa ang mga `securityCode` ng ibang pamilya). Ang pagiging miyembro ang pahintulot; ang kung *makikita* ba ng mga miyembro ang feature ay kinokontrol ng mga navigation tab ng B1App ng simbahan. Ang iba pang endpoint ng check-in (`code/:code`, `checkout`, `guardians`, `CheckinController`) ay nananatiling para lamang sa kiosk/staff.

## Ang mga Grupo ang nagtatakda ng ruta ng silid

Walang entity ng silid o silid-aralan saanman sa sistema. Ang "silid" ay isang **grupo** ng membership na naka-enable ang `trackAttendance`, naka-link sa isa o higit pang oras ng serbisyo sa pamamagitan ng `groupServiceTimes`. Ang mga field ng grupo (sa `Api/src/modules/membership/models/Group.ts`) na humuhubog sa asal ng kiosk:

| Field | Epekto |
|------|--------|
| `trackAttendance` | Sumasali ang grupo sa attendance; ang setup tree ng B1Admin ay nagmamarka ng mga grupong `trackAttendance` na walang row sa `groupServiceTimes` bilang hindi nakatalaga |
| `parentPickup` | Nagmamarka ng silid ng mga bata: ang pag-check in dito ay gagawing "child" visit ang visit, na nagpi-print ng family pickup label at naglalagay ng security code sa nametag |
| `printNametag` | Kung magpi-print ba ng nametag ang mga check-in sa grupong ito |
| `capacity` / `guestCapacity` / `checkinClosed` | Mga limitasyon sa kapasidad ng silid at isang mahigpit na switch na "sarado," ipinapatupad sa panig ng server ng check-in gate (ine-edit sa mga setting ng grupo sa B1Admin sa ilalim ng "Check-In Capacity") |
| `volunteerRatio` / `minVolunteers` | Ratio ng bata kada boluntaryo at pinakamababang bilang ng boluntaryo, ipinapatupad ayon sa setting na `ratioEnforcement` ng buong simbahan |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Mga hangganan ng edad/grado na sinusuri sa panig ng kiosk para i-highlight o i-dim ang mga silid |

Ganito rin ang denormalization ng bawat client (hal. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): sabay na i-load ang `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes`, at `GET /membership/groups`, pagkatapos para sa bawat oras ng serbisyo ay kolektahin ang mga grupong ang row ng `groupServiceTimes` ay tumuturo rito sa `serviceTime.groups`. Ang array na iyon ang ipinapakita ng room picker, nakaayos ayon sa `categoryName` ng grupo.

Ang mga pagtatalaga ay ine-edit mula sa pahina ng grupo sa B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` -- `POST`/`DELETE /attendance/groupservicetimes`), at ang buong puno ng Campus → Service → Service Time → Group ay nakikita sa `B1Admin/src/attendance/components/AttendanceSetup.tsx` sa pamamagitan ng `GET /attendance/attendancerecords/tree`.

:::info
Dahil ang mga grupo ang nag-iisang pinagmumulan ng katotohanan, ang parehong pagiging miyembro ng grupo ang nagpapagana sa pag-ruta ng kiosk, roster-style na attendance sa mga pahina ng grupo ng B1Admin, at pag-uulat ng attendance -- ang pagtatalaga ng grupo sa oras ng serbisyo ang tanging hakbang na kailangan para gawin itong destinasyon ng check-in.
:::

## Kaligtasan ng bata

### Mga uri ng check-in

Bawat visit ay may `checkinType` -- `member`, `guest`, o `volunteer` (ang NULL ay nangangahulugang lumang/member; migration na `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Ang uri ay pinipili sa **panig ng kiosk**: mga chip na Member / Guest / Volunteer sa pinalawak na row ng miyembro (`B1Checkin/src/components/MemberServiceTimes.tsx`), na itinatatak sa bawat nakabinbing visit sa pagkumpleto (`app/checkinComplete.tsx`, default ay `member`). Ginagamit ito ng server sa gate -- ang mga boluntaryo ay bumibilang sa saklaw ng ratio sa halip na laban sa kapasidad, at ang mga bisita ay bumibilang laban sa `guestCapacity`.

### Mga gate sa kapasidad at ratio ng boluntaryo

Ang `CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) ay tumatakbo sa loob ng `postCheckin` bago ang anumang pag-save (ang endpoint ay hindi transactional, kaya ang pag-gate-bago-mag-save ang mekanismo ng kawastuhan). Nilo-load nito ang kasalukuyang okupasyon bawat target na grupo (`VisitRepo.countActiveByGroupToday`) at ang config ng grupo sa pamamagitan ng gateway ng membership module, at pagkatapos ay inuuri ang mga paglabag:

- **Matindi (laging humaharang):** `checkinClosed`, `current + incoming > capacity`, bilang ng bisita na lampas sa `guestCapacity`. Tinatanggihan ang batch ng `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` -- ipinapakita ng kiosk ang pinangalanang silid.
- **Ratio (magbabala o hahadlang):** mga papasok na hindi boluntaryo sa silid na ang `volunteers < minVolunteers`, walang boluntaryo, o `children > volunteers × volunteerRatio`. Ang tindi ay sumusunod sa setting ng bawat simbahan na `ratioEnforcement` (`"warn"` default / `"block"`, ine-edit sa B1Admin Manage Church → Check-In, `CheckinSettingsEdit.tsx`). Ang warn-mode ay nagbabalik ng `409 { warning: true, error: "ratio", … }` maliban kung muling isumite ng client na may `acknowledgeWarnings=true` -- ang muling pagsumite na iyon ang staff-confirm override ng kiosk.

### Pagiging karapat-dapat ayon sa edad/grado (sa panig ng kiosk)

Ang pagiging karapat-dapat sa silid ay advisory na UI, sinusuri sa kiosk, hindi ipinapatupad ng server. Inihahambing ng `B1Checkin/src/helpers/EligibilityHelper.ts` ang kapanganakan/grado ng tao sa `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` ng grupo (pagkakasunod-sunod ng grado: PreK, K, 1–12, Graduated) at nagbabalik ng `eligible` / `ineligible` / `unknown` -- ang nawawalang data ay nagbibigay ng `unknown` at hindi kailanman nagtatago ng silid. Ang mga edad at grado ay kinukwenta ayon sa **petsa ng promosyon ng grado** ng simbahan (setting na `gradePromotionDate`, `"MM-DD"`, ine-edit sa `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); kinukuha ito ng kiosk mula sa `GET /attendance/checkin/settings`, at pinipili ng `resolveAsOfDate` ang pinakahuling paglitaw sa o bago ang araw ngayon. Hini-highlight ng room picker ang mga karapat-dapat na silid at dina-dim ang mga hindi; ang pagpili ng dimmed na silid ay nangangailangan ng kumpirmasyon ng staff.

### Pinagkakatiwalaan at hindi awtorisadong sundo

Ang mga taong sumusundo ay entity ng membership, bawat sambahayan: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` -- householdId, opsyonal na personId, name, photoUrl, relationship, `status` na `trusted` / `notAuthorized`, notes). Ang CRUD ay `GET /membership/householdpickup/:householdId` (sinumang naka-authenticate na user ng simbahan, para mabasa ito ng mga kiosk) kasama ang `POST` / `DELETE` na may bantay na `people.edit`. Pinamamahalaan ng staff ang listahan sa card na **Pickup** ng pahina ng tao (`B1Admin/src/people/components/PickupPeople.tsx`) -- larawan, relasyon, at chip ng katayuang Trusted/Not Authorized.

Sa check-out (`B1Checkin/app/checkout.tsx`), nilo-load ng kiosk ang listahan ng sundo ng sambahayan: ang mga entry na `trusted` ay nagre-render bilang mga pickup card na maaaring i-tap kasabay ng photo grid ng mga nasa hustong gulang ng sambahayan, at ang malayang tinype na pangalan sa "Other" ay fuzzy-matched (Levenshtein, `src/helpers/PickupMatchHelper.ts`) laban sa mga entry na `notAuthorized` -- ang pagtutugma ay haharang sa check-out na may babalang sheet at isang **Override** button para sa staff. Ang override ay nilo-log sa mismong visit: nagpo-post ito ng `checkedOutBy` bilang `"OVERRIDE: {name}"` sa pamamagitan ng karaniwang `POST /attendance/visits/checkout`, kaya napupunta ito sa tala ng attendance at sa webhook na `attendance.checkout` sa halip na sa hiwalay na audit table.

### Page-a-parent at emergency broadcast

Ang `CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) ay may dalawang SMS endpoint:

- `POST /page` -- `{ visitId, message }`: nagpa-page sa mga tagapag-alaga ng isang batang naka-check in (check-out screen ng kiosk, manned mode).
- `POST /broadcast` -- `{ serviceId, message }`: nagte-text sa mga nasa hustong gulang ng bawat sambahayang naka-check in para sa isang serbisyo (mga admin setting ng kiosk, sa likod ng sheet na kailangang i-type ang `EMERGENCY` para kumpirmahin sa `B1Checkin/app/adminSettings.tsx`).

Parehong nireresolba ang mga nasa hustong gulang ng sambahayan sa pamamagitan ng membership gateway, at pagkatapos ay ipinapasa ang paghahatid sa **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) -- ang cross-module na pinto papunta sa naka-configure na texting provider ng simbahan (`@churchapps/texting`: TextInChurch, Clearstream, o MutualMinistry; walang built-in na SMS sender). Nilo-log ng gateway ang isang row ng `sentText` kasama ang mga entry ng `deliveryLog` bawat tatanggap at nililimitahan ang batch sa 500 tatanggap; kapag walang naka-configure na provider ay nagbabalik ito ng `no_provider`, na ipinapakita ng kiosk bilang "No SMS provider configured". Ang `dispatch()` ng controller ay nagde-dedupe ng mga numero ng telepono at nilalaktawan ang mga taong walang mobile o may `optedOut`, na nagbabalik ng `{ sent, failed, skippedOptedOut, skippedNoPhone }` para maipakita ng kiosk kung ano ang nilaktawan.

## Ang kiosk (B1Checkin)

Ang mga screen ay mga file ng expo-router sa ilalim ng `B1Checkin/app/`; ang estado sa pagitan ng mga screen ay nasa isang static na klaseng `CachedData` (`src/helpers/CachedData.ts`), hindi sa React state.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Lookup** (`app/lookup.tsx`) -- maghanap gamit ang telepono (`GET /membership/people/search/phone?number=`, huling 4 o buo) o gamit ang pangalan (`GET /membership/people/search?term=`). Ang pagpili ng tugma ay naglo-load ng sambahayan (`GET /membership/people/household/{householdId}`) at mga kasalukuyang visit (`GET /attendance/visits/checkin`), at nagsisimula ng `pendingVisits` gamit ang mga pinili noong nakaraang linggo.
2. **Pagsusuri ng sambahayan** (`app/household.tsx`, `src/components/MemberList.tsx`) -- bawat row ng miyembro ay nagpapakita ng badge na naka-check in na, badge ng allergy/`nametagNotes`, at ang kanilang kasalukuyang mga chip ng silid. Ang pagpapalawak ng miyembro ay naglilista ng bawat oras ng serbisyo na may button ng silid kasama ang mga chip ng uri ng check-in na Member / Guest / Volunteer (`MemberServiceTimes.tsx`). Sa ilalim ng pangalan ng bawat oras ng serbisyo, ipinapakita ng `ServiceTimeHelper.getGroupSummary()` ang mga grupong iniaalok doon (ang mga pangalan sa `serviceTime.groups`, trinim, de-duplicated nang hindi sensitibo sa laki ng titik, pinagsama ng kuwit); walang ipinapakita kapag walang grupo ang oras.
3. **Pagtatalaga ng grupo** (`app/selectGroup.tsx`) -- isang puno ng kategorya na binuo mula sa `serviceTime.groups`, na may mga silid na karapat-dapat sa edad/grado na naka-highlight at ang mga hindi karapat-dapat ay naka-dim sa likod ng kumpirmasyon ng staff (tingnan ang [Pagiging karapat-dapat ayon sa edad/grado](#agegrade-eligibility-kiosk-side)); ang pagpili ng silid ay nagsusulat ng visitSession na `{ session: { serviceTimeId, groupId } }` sa nakabinbing visit ng taong iyon (`src/helpers/VisitSessionHelper.ts`). Ang "None" ay nag-aalis nito.
4. **Kumpleto** (`app/checkinComplete.tsx`) -- `POST /attendance/visits/checkin` na may `pendingVisits` (bawat isa ay may tatak na `checkinType`), pagkatapos ay nagpi-print ng mga label kung may naka-configure na printer at awtomatikong bumabalik sa lookup. Ang tugon na `409` sa kapasidad ay nagpapakita ng pinangalanang puno/saradong silid; ang babala sa ratio ay nag-aalok ng kumpirmasyon ng staff na muling magsusumite na may `acknowledgeWarnings=true`.

Ang **check-out** screen (`app/checkout.tsx`) ay tumatanggap ng 4-na-karakter na security code sa pamamagitan ng auto-focused na input -- kaya gumagana ang mga USB/Bluetooth keyboard-wedge barcode scanner nang walang camera -- o isang on-screen keypad na gumagamit ng parehong alpabeto, na awtomatikong nagsusumite sa 4 na karakter. Ang button na **Scan** ay nagbubukas ng sheet na may nakabahaging camera na `src/components/CodeScanner.tsx` (likurang camera bilang default, tumatanggap ng QR, Code 128, at Code 39) para mabasa ng mga istasyong walang wedge scanner ang pickup label; ang na-scan na code ay dumadaan sa parehong landas na `handleCode()` gaya ng tinype na input. Hinahanap nito ang code, ipinapakita ang mga batang susunduin, at ipinapakita ang mga **pinagkakatiwalaang sundo** ng sambahayan bilang mga card na maaaring i-tap kasabay ng photo grid ng mga nasa hustong gulang ng sambahayan (kasama ang opsyong "Other" na malayang ita-type na fuzzy-checked laban sa mga pangalang hindi awtorisado -- tingnan ang [Pinagkakatiwalaan at hindi awtorisadong sundo](#trusted-and-not-authorized-pickup)), at pagkatapos ay nagpo-post ng `POST /attendance/visits/checkout` na may pangalan/id ng sumusundo. Sa manned mode, nag-aalok din ang screen ng **Page a parent** (`POST /attendance/checkin/page`) at **muling pag-print ng security label** -- ang `reprint()` ay muling binubuo ang mga label ng pamilya gamit ang `LabelHelper.getAllLabelsFor(...)` at ipinapasa ang mga ito sa parehong pipeline ng `PrintUI` gaya ng check-in.

Ang personalidad ng istasyon ay isang AsyncStorage flag na `@StationMode` (`"self"` | `"manned"`, ina-toggle sa `app/adminSettings.tsx`). Ang manned mode ay nagdaragdag ng entry point ng check-out sa lookup screen at pag-edit ng profile bawat miyembro (`POST /membership/people`) mula sa household screen. Built-in ang pagpapatibay ng kiosk: isang opsyonal na PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) ang nagbabantay sa mga screen ng admin at printer, ang admin screen ay bubukas lamang sa 7 mabilis na tap sa logo sa header, at isang idle attract screen (`src/hooks/useInactivityTimer.ts`) ang pumapalit sa pagitan ng mga pamilya.

## Self check-in (B1App)

Nagche-check in ang mga miyembro mula sa b1.church portal sa screen na `/mobile/checkin` (iniruruta ng `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` papunta sa `screens/CheckinPage.tsx`). Nangangailangan ito ng naka-log in na user at dumadaan sa parehong apat na hakbang ng kiosk -- mga serbisyo → sambahayan → mga grupo → kumpleto -- laban sa magkaparehong mga endpoint, na ang estado ay hawak sa `B1App/src/helpers/CheckinHelper.ts`. Ang mga pagkakaiba sa kiosk: ang sambahayan ay galing sa sariling `householdId` ng naka-log in na user (walang hakbang ng paghahanap), at walang pag-print ng label -- sa halip, ipinapakita ng completion screen ang security code ng batch bilang QR (`qrcode.react`) na may paalalang "ipakita ito sa istasyon ng check-in." Kung naka-check in na ang sambahayan pagkabukas ng pahina, ang button na "Show check-in code" ay muling nagpapakita ng QR mula sa unang kasalukuyang visit (mula sa `GET /attendance/visits/checkin`) na may `securityCode`. Ang check-in ay agad na nire-record sa oras ng pagsumite (walang nakabinbing estado); ang QR ay para lamang sa pag-print ng label sa kiosk.

**Pag-print ng label mula sa telepono papunta sa kiosk** (`B1Checkin/app/scan.tsx`, naaabot mula sa QR button na "Scan code" sa lookup screen): ipinapakita ng kiosk ang `CodeScanner` (isang `expo-camera` `CameraView`, harap na camera bilang default, maaaring i-flip) na naghahanap ng mga QR code. Tumatanggap lamang ang `ScanCodeHelper.parse()` ng payload kapag ito ay payak na 4-na-karakter na code sa alpabeto ng security code, at binabalewala ng `ScanCodeHelper.isRepeat()` ang parehong code sa loob ng 4 na segundo, kaya gumagana ang QR ng B1App at ang QR block ng naka-print na label. Pagkatapos ay sinusundan ng screen ang landas ng muling pag-print sa check-out -- `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` -- at bumabalik sa lookup. Walang attendance write na nangyayari sa oras ng pag-scan; mga label lamang. Ang mga code na walang aktibong visit, mga istasyong walang printer, at mga grupong walang label ay bawat isa ay nagpapakita ng toast at bumabalik sa lookup.

Ang mga type at `ApiHelper`/`ArrayHelper` ay galing sa `@churchapps/helpers` at `@churchapps/apphelper`; walang React component na ibinabahagi sa B1Admin.

## Attendance sa panig ng admin (B1Admin)

- **Setup** -- ang `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) ay nagre-render ng puno ng istruktura at gumagawa ng mga serbisyo (`ServiceEdit.tsx`) at oras ng serbisyo (`ServiceTimeEdit.tsx`). Ang data ng campus ay galing sa membership sa pamamagitan ng hook na `useCampuses()`.
- **Manu-manong attendance** ay nasa panig ng Mga Grupo, hindi sa seksyon ng attendance: ang `B1Admin/src/groups/components/GroupSessionsTab.tsx` ay gumagawa ng mga sesyon (`POST /attendance/sessions`; kapag nagdaragdag, ang `SessionEdit.tsx` ay maaaring magsama ng isang sesyon bawat ibang grupong may parehong napiling oras ng serbisyo, nilalaktawan ang mga grupong may sesyon na sa petsang iyon) at minamarkahang present ang mga tao sa pamamagitan ng `POST /attendance/visitsessions/log`, na naghahanap o gumagawa ng visit para sa taong iyon at sesyon. Maaaring mag-record ng attendance ang mga lider ng grupo para sa sarili nilang mga grupo nang walang permission na `attendance.edit` -- sinusuri ng mga controller ang `au.leaderGroupIds`.
- **Pag-uulat** -- ang trend ng attendance at attendance ng grupo ay mga ulat na tinutukoy ng server (`B1Admin/src/components/reporting/ReportWithFilter.tsx` laban sa ReportingApi; mga depinisyon sa `Api/reports/*.json`). Ang dalawa ay kumukuha ng `startDate`/`endDate` (kasama ang end date); ang trend report ay default na isang taon ang nakalipas hanggang ngayon at nagdaragdag ng column na `sessionDates` bawat linggo, at ang on-screen tree ng attendance ng grupo ay kasama ang `checkinTime` ng bawat visit at ang `membershipStatus` ng tao. Ang CSV ng attendance ng grupo ay galing sa kasamang ulat na `groupAttendanceDownload`, na ginagawang pivot ng `GroupAttendanceDownloadHelper` sa isang row bawat miyembro ng grupo na may column na present/absent para sa bawat sesyong may petsa; ang kasaysayan bawat tao ay `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Pag-print ng label

### Mga template at ang designer

Ang mga simbahan ay nagdidisenyo ng sarili nilang mga label sa B1Admin sa `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, naaabot mula sa pahina ng mga setting ng Check-In). Ang template ay isang row ng `labelTemplates` na ang `content` ay isang JSON array ng mga block -- `text`, `field`, `barcode`, `qrcode`, o `box` -- bawat isa ay nakaposisyon sa mga porsyentong koordinado na may font, alignment, symbology (`code39`/`code128`/`qr`), at opsyonal na mga kondisyon ng visibility (hal. i-render lamang ang allergy box kapag may laman ang `person.nametagNotes`). May dalawang `labelType`: `nametag` (isa bawat taong naka-check in; mga field tulad ng `person.displayName`, `sessions`, `securityCode`, at `person.isBirthdayWeek` -- `"true"` kapag ang buwan/araw ng kaarawan ay nasa loob ng 3 araw mula ngayon, na umiikot sa katapusan ng taon, kinukwenta ng `LabelHelper.isBirthdayWithin()`) at `pickup` (isa bawat pamilya; mga field tulad ng `children`, `childrenAllergies`). Ipinapatupad ng server ang iisang default bawat uri bawat simbahan (`LabelTemplateController.save`). Ang designer ay may kasamang mga panimulang template na kahawig ng mga bundled na label ng kiosk at nagpe-preview gamit ang sample na data.

### Pag-render at pag-print sa kiosk

Sa pagkumpleto ng check-in, ang `B1Checkin/src/helpers/LabelHelper.ts` ang nagpapasya kung ano ang ipi-print mula sa mga group flag sa bawat nakabinbing visit: mga nametag para sa mga grupong `printNametag`, kasama ang isang family pickup label kung may anumang visit na tumama sa grupong `parentPickup`. Ang mga visit na may `checkinType` na `volunteer` ay nilalaktawan ng `LabelHelper.selectChildVisits()`, kaya ang manggagawa sa childcare sa isang silid na Parent Pickup ay hindi kailanman magti-trigger ng pickup label. Ang security code mula sa tugon ng check-in ay napupunta sa mga nametag ng bata at sa pickup label; ang mga nametag ng nasa hustong gulang ay nagpi-print nang walang code. Kung may mga template ang simbahan, ginagawa ng `LabelRenderer` (`src/helpers/LabelRenderer.ts`) ang mga block + field context bilang standalone na HTML document; kung wala, ginagamit ang mga bundled na HTML label sa `B1Checkin/assets/labels/` na may placeholder substitution.

Ang mga barcode ay ginagawa bilang inline SVG ng mga purong-TypeScript na encoder sa `B1Checkin/src/helpers/barcode.ts` -- mga pattern table ng Code 39 at mga width table ng Code 128 (code set B na may mod-103 checksum), kasama ang QR sa pamamagitan ng package na `qrcode`. **Sadyang dinoble ang mga encoder na ito sa B1Admin** (ang `LabelEditor.tsx` ay nag-i-inline ng parehong mga table, nakasaad sa isang code comment) para ang mga preview ng designer ay pixel-faithful sa output ng kiosk; ang pagbabago sa isa ay dapat gayahin sa isa pa.

Ang print pipeline (`src/components/PrintUI.tsx`) ay nagre-render ng bawat HTML label sa isang `WebView`, kinukuha ito bilang JPG sa pamamagitan ng `react-native-view-shot`, at ibinibigay ang mga image URI sa native na Expo module na **printer-helper** (`B1Checkin/modules/printer-helper/`). Ang module ay naglalantad ng `scan()`, `checkInit()`, `printUris()`, at mga status event, na may provider bawat brand sa parehong platform:

| Brand | Android | iOS | Mga Tala |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Mga network printer na QL-series (QL-800/810W/820NWB/1100/1110NWB…), die-cut na 29×90 label, ang inirerekomendang default |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Network discovery + TCP/ZPL image printing |

Ang pagpili ng printer ay nasa `app/printers.tsx` (ang network scan ay nagbabalik ng mga entry na `brand~model~ip`; ang pinili ay nase-save sa AsyncStorage), at ang `src/helpers/PrinterLog.ts` ay nagtatago ng diagnostic log sa device na lumalabas sa pamamagitan ng live status dot sa header ng kiosk.

## Pagpaparehistro ng bisita

Dalawang landas ang gumagawa ng tao sa gitna ng check-in:

- **Sa kiosk** -- ang "Add guest" sa household screen ay nagbubukas ng `B1Checkin/app/addGuest.tsx`, na unang naghahanap sa `GET /membership/people/search?term=` ng kasalukuyang tugmang hindi miyembro at kung wala ay gumagawa ng isa gamit ang `POST /membership/people`, nakakabit sa kasalukuyang sambahayan. Ang bisita ay dadaan na sa pagtatalaga ng grupo gaya ng sinumang miyembro.
- **Self-serve sa pamamagitan ng QR** -- kapag naka-on ang setting ng simbahan na `enableQRGuestRegistration` (kino-configure sa mga setting ng Check-In ng B1Admin, binabasa mula sa `GET /membership/settings/public/{churchId}`), ang lookup screen ng kiosk ay nagpapakita ng QR code na nagli-link sa `https://{subdomain}.b1.church/guest-register?serviceId=`. Ang pahina ng B1App na iyon (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) ay hinahayaan ang bumibisitang pamilya na magrehistro sa sarili nilang telepono sa pamamagitan ng anonymous na endpoint na `POST /membership/people/guest-register`, para tuloy-tuloy ang pila sa kiosk. Ang QR sheet ay may button ding **Register here** na nagbubukas ng parehong pahina sa kiosk (`app/guestRegister.tsx`) sa isang incognito, cache-disabled na `WebView`; ang `src/helpers/GuestRegisterHelper.ts` ang bumubuo ng URL para sa QR at sa WebView at hinaharang ang nabigasyon palabas ng `https://{subdomain}.b1.church/guest-register`. Bumabalik ang screen sa lookup sa **Done**, back, o 120 segundo ng kawalan ng aktibidad (ang pagta-type sa form ay ipinapasa mula sa WebView bilang aktibidad), at ina-unmount ang WebView para ang mga ipinasok ng isang pamilya ay hindi makarating sa susunod.

## Mga Kaugnay na Pahina

- [Mga Endpoint ng Attendance](../api/endpoints/attendance) -- Buong REST surface para sa mga campus, serbisyo, sesyon, visit, at visit session
- [Mga Endpoint ng Membership](../api/endpoints/membership) -- Mga tao, sambahayan, at grupo
- [Webhooks](../api/webhooks) -- Ang mga event na `session.created`, `attendance.recorded`, at `attendance.checkout`
- [Istruktura ng Module](../api/module-structure) -- Kung paano inaayos ang attendance module sa panig ng server
