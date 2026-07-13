---
title: "Kungena/Kuphuma"
---

# Kungena/Kuphuma

<div class="article-intro">

Kungena kuluhlelo lolulodvwa lolunetimnyango letintsatfu: i-app ye-kiosk B1Checkin yetitishi letinetisebenti kanye naletitimela, kungena kwekutimela ngekhatsi kwe-portal yelunga B1App, kanye nekuya lokulawulwa ngumphatsi ku-B1Admin. Tonkhe letintsatfu tibhala ku-module ye-attendance lefanako ku-core Api, futsi kucondziswa kwemakamelo kucondziswa ngalokuphelele ngemaGroups -- akukho sitfo lesehlukene se-"tindzawo" nome se-"emakamelo". Luhlu lwekuvikela luhleti phezu kwaloko: tinhlobo tekungena ngekuvakasha ngakunye, tivimbo te-server temtsamo nesilinganiso setisebenti, kufaneleka kweminyaka/libanga ekhasi le-kiosk, kucinisekiswa kwekutsatfwa lokutsenjwako ekuphumeni, kanye nekubita batali ngendlela yemhlinzeki wemilayeto webandla. Leli khasi lenta imephu yemodeli yelwati, luketjani lwekungena, luhlu lwekuvikela, kanye neluketjani lwekushicilela ema-label.

</div>

## Sifingqo

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

| Indzawo | Repository | Sakhiwo | Umsebenti |
|---------|------|-------|------|
| Kiosk | `B1Checkin` | Expo / React Native, kucondzisa ngefayela ye-expo-router; kwakhiwa nge-EAS kwa-Android, Amazon Fire, kanye ne-iOS; tibuyekezo te-OTA ngendlela ye-`expo-updates` | Sitishi lesinetisebenti nome sekutimela lesinekushicilela ema-label kanye nekuphuma lokucinisekisiwe |
| Kungena kwekutimela | `B1App` | Next.js (portal yelunga b1.church) | Emalunga lasengenile atfola likhaya labo lingene ku-foni yabo; akukho kushicilela |
| Umphatsi | `B1Admin` | React SPA | Ilungiselela sakhiwo semsebenti, ihlela emacembu kutikhatsi temsebenti, yakha ema-label, ibhala kuya lokwentiwe ngesandla, futsi isebentisa imibiko | 

Tonkhe letintsatfu tibita ema-module lamabili lafanako e-API ngendlela ye-`ApiHelper`: **MembershipApi** (`/membership`) yebantfu, emakhaya, kanye nemacembu; **AttendanceApi** (`/attendance`) yakho konkhe lokungentasi.

## Imodeli Yelwati (`Api/src/modules/attendance`)

| Sitfo / lithebula | Tinsimu letisemcoka | Lokushoko |
|----------------|-----------|---------|
| `campuses` | ligama, likheli | Kudzimatile lapha -- ema-campus alawulwa ku-module ye-membership (`/membership/campuses`); likopi le-attendance lifakwe emhlane futsi lifundzeka kuphela kubafundzi bakadze (`models/Campus.ts`) |
| `services` | campusId, ligama | Umhlangano lophindzaphindzako, sibonelo "Sonto Ekuseni" (`models/Service.ts`) |
| `serviceTimes` | serviceId, ligama | Sikhatsi ngekhatsi kwemsebenti, sibonelo "9:00 Ekuseni" (`models/ServiceTime.ts`) |
| `groupServiceTimes` | groupId, serviceTimeId | Lithebula lekuhlanganisa: ngumaphi emacembu (emakamelo) lahlangana ngasiphi sikhatsi semsebenti (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Umhlangano munye welicembu linye ngelilanga linye -- wakhiwa ngesikhatsi sekungena kuphela (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Umuntfu munye longenile ngelilanga linye (`models/Visit.ts`). `checkinType` ngu-`member` / `guest` / `volunteer` (NULL = lunga lakadze), lihlonyulwa yi-kiosk futsi lisetjentiswa ngetivimbo temtsamo/setilinganiso |
| `visitSessions` | visitId, sessionId | Ngumiphi imihlangano lekungena kwentela -- umntfwana longene tikhatsi temsebenti letimbili utfola imigca lemibili (`models/VisitSession.ts`) |
| `labelTemplates` | ligama, labelType (`nametag`/`pickup`), bubanti, budze, isDefault, lokucuketfwe (JSON blocks) | Sakhiwo se-label lesingahlelwa (`models/LabelTemplate.ts`) |

### Indlela Kungena Lokucedziwe Kugcinwa Ngayo

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) iphatsa `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Umtimba luhlu lwetintfo te-`Visit`, ngayinye iphatsa `visitSessions` lapho `session` ibitwa kuphela `(serviceTimeId, groupId)`. I-server yentela:

1. **Ivimba mtsamo netilinganiso ngembi kwekubhala nome ngabe yini.** `evaluateGates()` → `CheckinGateHelper.evaluate()` ihlola mtsamo, mtsamo wetivakashi, luphawu lwekuvalwa, kanye nesilinganiso setisebenti sekamelo ngalinye lelicondzisiwe kumelene neluboniswa lwanyalo. postCheckin **ayisiyo transactional**, ngako-ke sivimbo kufanele sisebente ngembi kwekugcina kwekucala -- kwephulwa lokucinile kubuyisa 409 lebita kamelo(makamelo) lonalenkinga futsi kute lokugciniwe. Bona [Tivimbo Temtsamo Nesilinganiso Setisebenti](#tivimbo-temtsamo-nesilinganiso-setisebenti).
2. **Ifundza imihlangano ngekungakhatsateli.** `getSessionId()` ifundza nome yakhe umgca we-`sessions` we-`(groupId, serviceTimeId, lamuhla)` -- ema-id emhlangano agcinwa ngekhatsi kwenchubo ngelilanga ngalinye. Imihlangano lemisha ikhipha i-webhook ye-`session.created`. Luhlu lu-awaited `for..of` -- `forEach(async …)` yangaphambilini yagijimisana negcino futsi yabhala ema-sessionId angu-NULL ekuvekweni kwemhlangano wekucala (kulungisiwe; kunemphawulo ekhodini ku-loop). 
3. **Ibuyisela emarekhodi elilanga.** Nome ngabe yikuphi lokungena lokukhona kwalabobantfu kulomsebenti lamuhla kususwa kanye nema-visitSessions abo, bese lokuhlonyuliwe kugcinwa. Kuphindze kungena komndeni yisento se-"lokhu-nguleso-simo-njengamanje", hhayi sekwengeta. Kutfumela `?checkDuplicates=true` esikhundleni saloko kubuyisa `{ duplicates: [personId…] }` ngaphandle kwekubhala, loko yindlela i-kiosk exwayisa ngayo ngembi kwekubhala phezu.
4. **Yakha khodi yekuphepha yinye ngesibatje ngasinye.** `SecurityCodeHelper.generate()` yakha khodi yetinhlamvu letine kusuka enhlwenhlwa `23456789BCDFGHJKLMNPQRSTVWXYZ` (kute tinhlamvu tekukhuluma nome letifana kufundzeka, kuze emakhodi angeke akhulume emagama nome afundzeke kabi). I-server iphindza nayadibana nalenye kumelene nekungena lokusavaliwe lelilanga lelifanako lalelo bandla, bese ifaka lelokhodi kuko konkhe kungena ngesibatje. 
5. **Ibuyisa `{ streaks, securityCode }`.** `streaks` ihlanganisa personId nenani lemaviki lalandzelanako engenile; i-kiosk igubha imigomo (nguleliviki lesihlanu ngasinye) nge-confetti.

Kungena ngakunye lokugciniwe futsi kukhipha i-webhook ye-`attendance.recorded`. Lucalo lolufundzako, `GET /attendance/visits/checkin`, lubuyisa kungena kwebantfu kusuka **elilangeni labo lekugcina lelibhaliwe** -- nangabe lokho bekulingakadze ema-id ayakhishwa, ngako-ke i-client itfola likopi lelifake ngembi lekukhetsa kwemakamelo kwelivikwelidlule leletawugcinwa njengemarekhodi lamasha.

### Kuphuma

Ema-endpoint lamabili acedza sikhamba (`VisitController`):

- `GET /attendance/visits/code/:code` -- kungena lokungakaphumi lamuhla lokuphatsa lelokhodi lekuphepha, imihlangano seyifakiwe.
- `POST /attendance/visits/checkout` -- umtimba `{ visitIds, checkedOutBy?, checkedOutById? }`; ifaka sikhatsi se-`checkoutTime` nekutsi ngubani lotsatsile, futsi ikhipha i-webhook ye-`attendance.checkout` ngekungena ngakunye.

Emalungelo: ema-kiosk atitivela nge-`attendance.checkin`, lenika kuphela indzawo yekungena/kuphuma/label-template; `attendance.view`/`attendance.edit` igoqela imibiko nekufaka ngesandla; sakhiwo (imisebenti, tikhatsi temsebenti, kuhlelwa kwemacembu) kudzinga `services.edit`.

## Emacembu Acondzisa Kuya Kwemakamelo

Akukho sitfo sekamelo nome sekilasi nome kuphi kulolu luhlelo. "Ikamelo" li**cembu** lemembership lelinge-`trackAttendance` ihlonyuliwe, lihlanganiswe nesikhatsi(tikhatsi) semsebenti ngendlela ye-`groupServiceTimes`. Tinsimu telicembu (ku-`Api/src/modules/membership/models/Group.ts`) letakha kutiphatsa kwe-kiosk:

| Insimu | Umphumela |
|------|--------|
| `trackAttendance` | Licembu liyangena kuya nome ngabe yini; sihlahla sekulungiselela se-B1Admin sihlonyula emacembu la-`trackAttendance` langakabi nemugca we-`groupServiceTimes` njenge-angakahleleki |
| `parentPickup` | Ihlonyula ikamelo lemntfwana: kungena kulo kwenta kungena kube "kwemntfwana", loku lokukhipha lebheli lekutsatfwa komndeni futsi kufaka khodi yekuphepha ku-nametag |
| `printNametag` | Kutsi kungena kulelicembu kuphrinta yini i-nametag |
| `capacity` / `guestCapacity` / `checkinClosed` | Timkhawulo temtsamo wekamelo kanye nesiswitji lesicinile se-"lokuvaliwe", lokuphotselwako yi-server ngendlela ye-check-in gate (kuhleleka ku-tilungiselelo telicembu ku-B1Admin ngaphasi kwe-"Mtsamo Wekungena") |
| `volunteerRatio` / `minVolunteers` | Silinganiso sebantfwana ngabasiti ngamunye kanye nenani lelincane lebasiti, lokuphotselwako ngendlela yesilungiselelo sebandla lonkhe `ratioEnforcement` |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Imikhawulo yekufaneleka ngeminyaka/libanga ehlolwa ku-kiosk kute kukhanyisele nome kudzimate emakamelo |

Kila client wenta ngendlela lefananako (sibonelo `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): layisha `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes`, kanye ne-`GET /membership/groups` ndzawonye, bese ngesikhatsi semsebenti ngasinye ubutsele emacembu lomugca wawo we-`groupServiceTimes` locondzise kuko ku-`serviceTime.groups`. Loluhlu ngulo lokukhonjiswa sikhethi sekamelo, sihlelwe nge-`categoryName` yelicembu.

Kuhleleka kuhlelwa kusuka ekhasini lelicembu ku-B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` -- `POST`/`DELETE /attendance/groupservicetimes`), kantsi sihlahla sonkhe se-Campus → Service → Service Time → Group sibonakaliswe ku-`B1Admin/src/attendance/components/AttendanceSetup.tsx` ngendlela ye-`GET /attendance/attendancerecords/tree`.

:::info
Njengobe emacembu ayincondvo yeliciniso lelilodvwa, bulunga belicembu lelifanako bunika emandla kucondzisa kwe-kiosk, kuya lokufana ne-roster ekhasini lelicembu le-B1Admin, kanye nemibiko yekuya -- kuhlanganisa licembu nesikhatsi semsebenti kuphela lesinyatselo lesidzingekako kutsi kube yindzawo yekungena.
:::

## Kuvikelwa Kwebantfwana

### Tinhlobo Tekungena

Kungena ngakunye kuphatsa `checkinType` -- `member`, `guest`, nome `volunteer` (NULL isho lakadze/lunga; migration `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Loluhlobo lukhetfwa **ku-kiosk**: emachips la-Member / Guest / Volunteer emgceni welunga lolunwetiwe (`B1Checkin/src/components/MemberServiceTimes.tsx`), lifakwa kungena ngakunye lokusalindzile ngesikhatsi sekucedza (`app/checkinComplete.tsx`, ihlala i-`member` ngekwendlulo). I-server iyisebentisa kusivimbo -- basiti babalwa kuya kusekelo selilinganiso esikhundleni sekumelana nemtsamo, kantsi tivakashi tibalwa kumelene ne-`guestCapacity`.

### Tivimbo Temtsamo Nesilinganiso Setisebenti

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) isebenta ngekhatsi kwe-`postCheckin` ngembi kwekugcina nome ngabe yini (endpoint ayisiyo transactional, ngako-ke kuvimba-ngembi-kwekugcina yindlela yekucinisa buchwepheshe lobufanele). Ilayisha luboniswa lwanyalo lwelicembu lelicondzisiwe ngalinye (`VisitRepo.countActiveByGroupToday`) kanye nekulungiselelwa kwelicembu ngendlela yesango le-module ye-membership, bese ihlela kwephulwa:

- **Lokucinile (kuvimba njalo):** `checkinClosed`, `current + incoming > capacity`, linani letivakashi lelidlula `guestCapacity`. Sibatje siyaliwa nge-`409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` -- i-kiosk ikhombisa ikamelo lelibitiwe.
- **Silinganiso (xwayisa nome vimba):** labo labangesibo basiti labangena ekamelweni lapho `volunteers < minVolunteers`, kute basiti nome kanye, nome `children > volunteers × volunteerRatio`. Bukhulu bulandzela lulungiselelo lwebandla `ratioEnforcement` (`"warn"` ngekwendlulo / `"block"`, kuhlelwa ku-B1Admin Manage Church → Check-In, `CheckinSettingsEdit.tsx`). Simo se-warn sibuyisa `409 { warning: true, error: "ratio", … }` ngaphandle kwekutsi client iphindze itfumele nge-`acknowledgeWarnings=true` -- lokuphindza kutfumela kuyindlela yekucinisekiswa yesisebenti se-kiosk.

### Kufaneleka Ngeminyaka/Libanga (ku-Kiosk)

Kufaneleka kwekamelo yindlela yekukhombisa kuphela, ehlolwa ku-kiosk, hhayi lokuphotselwako yi-server. `B1Checkin/src/helpers/EligibilityHelper.ts` icatsanisa lilanga lekutalwa/libanga lomuntfu neminyaka/libanga lelicembu `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` (luhlu lwemabanga: PreK, K, 1-12, Sesicedzile) futsi ibuyisa `eligible` / `ineligible` / `unknown` -- lwati loluphelele kubuyisa `unknown` futsi akukaze kufihle ikamelo. Iminyaka nemabanga kubalwa kusukela **elilangeni lekunyuselwa libanga** lebandla (lulungiselelo lwe-`gradePromotionDate`, `"MM-DD"`, luhlelwa ku-`B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); i-kiosk iyifundza kusuka ku-`GET /attendance/checkin/settings`, kantsi `resolveAsOfDate` ikhetsa sikhatsi lesisha lesengcile lesiko nome ngembi kwalamuhla. Sikhethi sekamelo sikhanyisela emakamelo lafanele futsi sidzimate lawo langakafaneleki; kukhetsa ikamelo lelidzimatile kudzinga kucinisekiswa yisisebenti.

### Kutsatfwa Lokutsenjwako Nalokungakavunyelwa

Bantfu labatsatsako baba yisitfo se-membership, ngekhaya ngalinye: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` -- householdId, personId lengakhethwa, ligama, photoUrl, buhlobo, `status` `trusted` / `notAuthorized`, imininingwane). I-CRUD ngu-`GET /membership/householdpickup/:householdId` (nome ngubani lotivelile webandla, ngako-ke ema-kiosk angayifundza) kanye ne-`POST` / `DELETE` levikelwe yi-`people.edit`. Sisebenti silawula loluhlu ekhasini lomuntfu ku-**Pickup** kadi (`B1Admin/src/people/components/PickupPeople.tsx`) -- sitfombe, buhlobo, kanye nechips ye-status ye-Trusted/Not Authorized.

Ekuphumeni (`B1Checkin/app/checkout.tsx`) i-kiosk ilayisha luhlu lwekutsatfwa lwekhaya: imigca ye-`trusted` ibonakala njengemakadi latsintekako etulu kwesitfombe semadala ekhaya, futsi ligama lelibhalwe ngekutimela le-"Other" lifananiswa (Levenshtein, `src/helpers/PickupMatchHelper.ts`) kumelene nemigca ye-`notAuthorized` -- kufaneleka kuvimba kuphuma nge-warning sheet kanye nenkinobho ye-**Override** yesisebenti. Loku kwephulwa kubhalwa evisitini ngekwayo: kukhipha `checkedOutBy` njenge-`"OVERRIDE: {name}"` ngendlela lejwayelekile ye-`POST /attendance/visits/checkout`, ngako-ke kuwela erekhodini lekuya kanye ne-webhook ye-`attendance.checkout` kunekutsi kuwele kulithebula lelehlukene lekuhlola.

### Kubita Umtali Nekutfumela Kuwo Wonkhe Ngesikhatsi Sengoti

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) ikhombisa ema-endpoint lamabili e-SMS:

- `POST /page` -- `{ visitId, message }`: ibita batali bemntfwana munye longenile (sikrini sekuphuma se-kiosk, simo lesinesisebenti).
- `POST /broadcast` -- `{ serviceId, message }`: itfumela umlayeto kuwo onkhe emadzala emakhaya lakhona longenile ngemsebenti (tilungiselelo temphatsi we-kiosk, ngemuva kwesheki lesicela kubhalwa "EMERGENCY" kucinisekisa ku-`B1Checkin/app/adminSettings.tsx`).

Tombili tifundza emadzala ekhaya ngendlela yesango le-membership, bese tinikela kuhanjiswa ku-**`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) -- lomnyango lendlula ema-module ongena kumhlinzeki wemilayeto welungiselelwe webandla (`@churchapps/texting`: TextInChurch, Clearstream, nome MutualMinistry; akukho msindi we-SMS lowakhelwe ngekhatsi). Lisango libhala umgca we-`sentText` kanye nemigca ye-`deliveryLog` ngamuntfu ngamuntfu futsi livimba sibatje ku-500 bemukeli; ngaphandle kwemhlinzeki lolungiselelwe kubuyisa `no_provider`, lokukhonjiswa yi-kiosk njenge-"Akukho mhlinzeki we-SMS lolungiselelwe". `dispatch()` ye-controller ivimba kuphindzaphindza kwetinombolo tefoni futsi idlule bantfu labangenafoni yekusayina nome labahlonyuliwe `optedOut`, ibuyisa `{ sent, failed, skippedOptedOut, skippedNoPhone }` kute i-kiosk ikhombise loko lokudluliwe.

## I-Kiosk (B1Checkin)

Ema-sikrini yimafayela e-expo-router ngaphasi kwe-`B1Checkin/app/`; luhlaka lolusendlula ema-sikrini luhlala ku-class le-`CachedData` lemi kwayo (`src/helpers/CachedData.ts`), hhayi luhlaka lwe-React.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Kufuna** (`app/lookup.tsx`) -- kufuna ngenombolo yefoni (`GET /membership/people/search/phone?number=`, tinhlamvu tekugcina letine nome kugcwele) nome ngeligama (`GET /membership/people/search?term=`). Kukhetsa lokufananako kulayisha likhaya (`GET /membership/people/household/{householdId}`) kanye nekungena lokukhona (`GET /attendance/visits/checkin`), kuhlanyela `pendingVisits` nekukhetsa kwelivikwelidlule.
2. **Kubukwa Kwekhaya** (`app/household.tsx`, `src/components/MemberList.tsx`) -- umgca ngamunye welunga ukhombisa luphawu lolukhombisa kutsi seluvele lungenile, luphawu lwe-allergy/`nametagNotes`, kanye netichips telikamelo lalo lanyalo. Kwandzisa lunga kukhombisa sikhatsi ngasinye semsebenti kanye nenkinobho yekamelo kanye nemachips la-Member / Guest / Volunteer (`MemberServiceTimes.tsx`).
3. **Kuhlela Licembu** (`app/selectGroup.tsx`) -- sihlahla se-category lesakhiwe kusuka ku-`serviceTime.groups`, ngemakamelo lafanele ngeminyaka/libanga akhanyiselwe kantsi langakafaneleki adzimatelwe ngemuva kwekucinisekiswa yisisebenti (bona [Kufaneleka Ngeminyaka/Libanga](#kufaneleka-ngeminyakalibanga-ku-kiosk)); kukhetsa ikamelo kubhala `{ session: { serviceTimeId, groupId } }` visitSession ekungeneni lokusalindzile komuntfu loyo (`src/helpers/VisitSessionHelper.ts`). "Kute" iyakhipha.
4. **Kucedza** (`app/checkinComplete.tsx`) -- `POST /attendance/visits/checkin` nge-`pendingVisits` (ngayinye ifakwe `checkinType` yayo), bese kushicilela ema-label nangabe kunelishicileli lelilungiselelwe futsi kubuyele emuva ku-lookup ngekungakhatsateli. Simo se-`409` semtsamo sikhombisa ikamelo leligcwele/lelivaliwe ligama; sixwayiso sesilinganiso sinika sisebenti sicinisekiswa lesiphindze sitfumele nge-`acknowledgeWarnings=true`.

Sikrini se-**kuphuma** (`app/checkout.tsx`) semukela khodi yekuphepha yetinhlamvu letine ngengeniso lecondze ngekutakhoma -- ngako-ke ema-scanner ekhodi lebalanced e-USB/Bluetooth aasebenta ngaphandle kwekhamera -- nome ikeypad esikrinini lesetjentisa lenhlwenhlwa lefanako, itfumela ngekutakhoma nase tinhlamvu letine setiphelele. Ifuna khodi, ikhombisa bantfwana labatsatfwako, futsi ikhombisa **bantfu betsemba yekhaya** balo njengemakadi latsintekako eceleni kwesitfombe semadla ekhaya (kanye nekhetso "Other" lelibhalwa lelihlolwa kumelene nemagama langakavunyelwa -- bona [Kutsatfwa Lokutsenjwako Nalokungakavunyelwa](#kutsatfwa-lokutsenjwako-nalokungakavunyelwa)), bese itfumela `POST /attendance/visits/checkout` ngeligama/id lomtsatsi. Ku-manned mode sikrini sinika futsi **Bita Umtali** (`POST /attendance/checkin/page`) kanye ne-**kuphindze kushicilelwe kwelable lekuphepha** -- `reprint()` yakha kabusha ema-label emndeni nge-`LabelHelper.getAllLabelsFor(...)` futsi iwatfumele ngeluketjani lolufanako lwe-`PrintUI` njengekungena.

Simo setitishi yiflegi ye-AsyncStorage `@StationMode` (`"self"` | `"manned"`, lishintjwa ku-`app/adminSettings.tsx`). Simo se-manned sengeta indzawo yekuphuma ekhasini lekufuna kanye nekuhlela profayela lwelunga ngalinye (`POST /membership/people`) kusuka ekhasini lekhaya. Kucinisa kwe-kiosk kwakhelwe ngekhatsi: iphini lelingakhetfwa (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) livimba emakhasi emphatsi neshicileli, ikhasi lemphatsi livulwa kuphela nge-thepha lelisheshako lesikhombisa kalikhombisa ku-logo yeholide, futsi sikrini se-attract lesingasebenti (`src/hooks/useInactivityTimer.ts`) sitsatsa endzaweni emkatsi wemindeni.

## Kungena Kwekutimela (B1App)

Emalunga angena kusuka ku-portal ye-b1.church ekhasini le-`/mobile/checkin` (lecondziswa yi-`B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` iye ku-`screens/CheckinPage.tsx`). Kudzinga umsebentisi longenile futsi ihamba ngetinyatselo letine letifanako ne-kiosk -- imisebenti → likhaya → emacembu → kucedza -- kumelene nema-endpoint lafanako, luhlaka lugcinwe ku-`B1App/src/helpers/CheckinHelper.ts`. Umehluko kusuka ku-kiosk: likhaya livela ku-`householdId` yalowo msebentisi longenile ngekwakhe (akukho sinyatselo sekufuna), futsi akukho kushicilela -- esikhundleni saloko sikrini sekucedza sikhombisa khodi yekuphepha yesibatje njenge-QR (`qrcode.react`) ngesincomo se-"khombisa loku esitisheni sekungena". Nangabe likhaya selivele lingenile ngesikhatsi lekhasi lilayishwa, inkinobho ye-"Khombisa khodi yekungena" ikhombisa kabusha i-QR kusuka ku-`securityCode` yekungena lokukhona. Kungena kubhalwa kalula ngesikhatsi sekutfumela (akukho simo lesilindzile); i-QR icondzisa kuphela kushicilela kwelable ku-kiosk.

**Kushicilela Kwelable Kusuka Kufonini Kuya Ku-Kiosk** (`B1Checkin/app/scan.tsx`, lefikwa kuyo kusuka enkinobheni ye-"Skena khodi" ekhasini lekufuna): i-kiosk ivula i-`CameraView` ye-`expo-camera` (ibheke ngembili ngekwendlulo, ingashintjwa) iskena emakhodi e-QR. Lokutfunyelwe lokuskeniwe kwemukelwa nangabe kuyikhodi yetinhlamvu letine kuphela kulenhlwenhlwa yekhodi yekuphepha, ngako-ke kubili i-QR ye-B1App kanye ne-QR yelabel lelishicilelwe kuyasebenta. Sikrini bese silandzela luketjani lwekuphindze kushicilela lokuphuma -- `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` -- futsi kubuyele ku-lookup. Akukho kubhala kweko kwentiwako ngesikhatsi sekuskena; ema-label kuphela. Emakhodi langekho nekungena lokusebentako, titishi letingenashicileli, kanye nemacembu langenamalabel kuveza toast bese kubuyela ku-lookup.

Tinhlobo kanye ne-`ApiHelper`/`ArrayHelper` tivela ku-`@churchapps/helpers` kanye ne-`@churchapps/apphelper`; akukho tincenye te-React letabelwana ne-B1Admin.

## Kuya Lokulawulwa Ngumphatsi (B1Admin)

- **Kulungiselela** -- `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) ibonakalisa sihlahla sesakhiwo futsi yakha imisebenti (`ServiceEdit.tsx`) kanye netikhatsi temsebenti (`ServiceTimeEdit.tsx`). Lwati lwe-campus luvela ku-membership ngendlela ye-hook ye-`useCampuses()`.
- **Kuya ngesandla** kuhlala ecaleni le-Groups, hhayi endzaweni ye-attendance: `B1Admin/src/groups/components/GroupSessionsTab.tsx` yakha imihlangano (`POST /attendance/sessions`) futsi ihlonyula bantfu njengabakhona nge-`POST /attendance/visitsessions/log`, lefundza nome yakhe kungena kwaloyo muntfu nemhlangano. Baholi bemacembu bangabhala kuya kwemacembu abo ngaphandle kwelungelo le-`attendance.edit` -- ema-controller ahlola `au.leaderGroupIds`.
- **Kubika** -- luhambo lwekuya kanye nekuya kwelicembu yimibiko lehlelwe yi-server (`B1Admin/src/components/reporting/ReportWithFilter.tsx` kumelene ne-ReportingApi); umlandvo womuntfu ngamunye ngu-`GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Kushicilela Kwema-Label

### Ema-Template Nesakhi

Emabandla akha ema-label awo ku-B1Admin ku-`/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, lefikwa kuyo kusuka ekhasini letilungiselelo tekungena). Template ngumgca we-`labelTemplates` lapho `content` iluhlu lwe-JSON lwema-block -- `text`, `field`, `barcode`, `qrcode`, nome `box` -- ngayinye ibekwe ngendzawo yema-percent nge-fonti, kucondziswa, i-symbology (`code39`/`code128`/`qr`), kanye netimo tekuboneka letingakhetfwa (sibonelo bonakalisa kuphela ibhokisi ye-allergy nangabe `person.nametagNotes` ingeyize). Tinhlobo letimbili te-`labelType` tikhona: `nametag` (yinye ngamuntfu ngamuntfu longenile; tinsimu njenge-`person.displayName`, `sessions`, `securityCode`) kanye ne-`pickup` (yinye ngemndeni; tinsimu njenge-`children`, `childrenAllergies`). I-server iphotselela lokulodwa lokwendlulo ngaluhlobo ngebandla ngalinye (`LabelTemplateController.save`). Sakhi sinike ema-template ekucala lafanana nema-label alungiselelwe e-kiosk futsi sibukisa ngelwati lwesibonelo.

### Kubonakaliswa Nekushicilela Ku-Kiosk

Ekucedzeni kwekungena, `B1Checkin/src/helpers/LabelHelper.ts` inquma kutsi kuphrintwa ini kusuka etiflegini telicembu kungena ngakunye lokusalindzile: ema-nametag emacembu la-`printNametag`, kanye nelabel linye lekutsatfwa komndeni nangabe kungena kunye kutsintse licembu le-`parentPickup`. Khodi yekuphepha kusuka empendvulweni yekungena iya ema-nametag ebantfwana kanye nelabel lekutsatfwa; ema-nametag emadzala ashicilelwa ngaphandle kwekhodi. Nangabe libandla linetemplate, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) iguqula ema-block + luhlaka lweminsimu kubeludokhumenti le-HTML lelimile lodvwa; kungenjalo ema-label e-HTML lahlanganisiwe ku-`B1Checkin/assets/labels/` asetjentiswa nekufakwa kwendzawo.

Ema-barcode akhiwa njenge-inline SVG ngema-encoder e-TypeScript lecwephile ku-`B1Checkin/src/helpers/barcode.ts` -- emathebula ephethini ye-Code 39 kanye ne-Code 128 (code set B ngesibalo se-mod-103 checksum) emathebula ebubanti, kanye ne-QR ngendlela yephakheji ye-`qrcode`. **Lama-encoder aphindzaphindziwe ngabomo ku-B1Admin** (`LabelEditor.tsx` ifaka ngekhatsi ema-thebula lafanako, kunemphawulo ekhodini) kuze imibukiso yesakhi ihambisane nge-pixel nemphumela we-kiosk; lushintjo kulokunye kufanele lucifwe kulokunye.

Luketjani lwekushicilela (`src/components/PrintUI.tsx`) lubonakalisa i-label ngayinye ye-HTML ku-`WebView`, luyibambe ibe yi-JPG ngendlela ye-`react-native-view-shot`, futsi lunikele tinombolo temfanekiso ku-module ye-Expo yendalo ye-**printer-helper** (`B1Checkin/modules/printer-helper/`). Lomodule ikhipha `scan()`, `checkInit()`, `printUris()`, kanye netehlakalo tesimo, nemhlinzeki ngaluhlobo lwelogwebu kuwo womabili emapulatifomu:

| Logwebu | Android | iOS | Luphawu |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Emashicileli emnyango we-QL (QL-800/810W/820NWB/1100/1110NWB…), ema-label la-die-cut la-29×90, lokwendlalelwe lokuncomekako |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Kubona emnyangweni nge-TCP kanye nekushicilela imifanekiso nge-ZPL |

Kukhetsa lishicileli kuhlala ku-`app/printers.tsx` (kubona emnyangweni kubuyisa tintfo te-`brand~model~ip`; loku lokukhetfwe kuyagcinwa ku-AsyncStorage), kantsi `src/helpers/PrinterLog.ts` igcina luhlu lwekuhlola olusetidivayisini lolubonakaliswa ngelicashaza lesimo lelisebentako ehlokweni le-kiosk.

## Kubhalisa Tivakashi

Tindlela letimbili tikhawakhe umuntfu ngekhatsi kwekungena:

- **Ku-Kiosk** -- "Faka sivakashi" ekhasini lekhaya ivula `B1Checkin/app/addGuest.tsx`, lekucala ifuna ku-`GET /membership/people/search?term=` kufumana lofanako longasilo lunga bese kungenjalo yakha munye nge-`POST /membership/people`, ahlanganiswe nekhaya lelisebentako. Sivakashi bese sihamba ngendlela yekuhlela licembu njengalunye lelunga.
- **Kutibhalisa Ngekutimela Nge-QR** -- nangabe lulungiselelo lwebandla `enableQRGuestRegistration` luhlonyuliwe (luhlelwa etilungiselelweni tekungena te-B1Admin, lufundzwe kusuka ku-`GET /membership/settings/public/{churchId}`), sikrini sekufuna se-kiosk sikhombisa khodi ye-QR lehlanganisa ku-`https://{subdomain}.b1.church/guest-register?serviceId=`. Lelikhasi le-B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) livumela umndeni longumvakashi kutibhalisa ngefoni yabo ngekwabo ngendlela ye-endpoint lengakhethi ye-`POST /membership/people/guest-register`, kugcinisa lulayini we-kiosk luhamba.

## Emakhasi Lahambelanako

- [Ema-Endpoint E-Attendance](../api/endpoints/attendance) -- Indzawo yonkhe ye-REST yema-campus, imisebenti, imihlangano, kungena, kanye netimihlangano yekungena
- [Ema-Endpoint E-Membership](../api/endpoints/membership) -- Bantfu, emakhaya, kanye nemacembu
- [Ema-Webhook](../api/webhooks) -- Tehlakalo te-`session.created`, `attendance.recorded`, kanye ne-`attendance.checkout`
- [Sakhiwo Se-Module](../api/module-structure) -- Indlela module ye-attendance ihlelwe ngayo ecaleni le-server
