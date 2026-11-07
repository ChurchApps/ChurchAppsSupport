---
title: "Prijavos"
---

# Prijavos

<div class="article-intro">

Prijava yra viena sistema su trimis įėjimais: B1Checkin kioskų programėlė personalizuotoms ir savitarnos stotims, savarankiška prijava B1App narių portale ir administracinė lankomumo fiksavimo dalis B1Admin. Visi trys įrašo duomenis į tą patį lankomumo modulį Api serveryje, o klasių nukreipimas valdomas tik per grupes — atskiro „vietų" ar „kambarių" objekto nėra. Viršuje veikia vaikų saugumo sluoksnis: prijungimo tipai kiekvienam apsilankymui, serverio pusės talpos ir savanorių santykio kontrolė, kioske tikrinamas amžius ir klasė, išėjimo metu patikrinamas patikimas paėmimas bei tėvams siunčiami pranešimai per bažnyčios SMS paslaugų teikėją. Šis puslapis aprašo duomenų modelį, prijungimo eigas, saugumo sluoksnį ir etikečių spausdinimo grandinę.

</div>

## Apžvalga

```
┌──────────────────────────┐
│ B1Checkin (Expo kiosk)   │──┐         ┌──────────────────────────────────────────────┐
│  paieška → namų ūkis →   │  │         │ Api                                          │
│  grupės → baigti/spausdinti│  │  HTTPS  │  ┌─ narystės modulis ──────────────────────┐ │
├──────────────────────────┤  ├───────▶ │  │ asmenys · namų ūkiai · grupės           │ │
│ B1App (savitarnos prijava)│──┤         │  └─────────────────────────────────────────┘ │
│  /mobile/checkin ekranas │  │         │  ┌─ lankomumo modulis ─────────────────────┐ │
├──────────────────────────┤  │         │  │ campuses → services → serviceTimes      │ │
│ B1Admin (darbuotojai)    │──┘         │  │ groupServiceTimes  (kambarių nukreipimas)│ │
│  sąranka · ataskaitos ·  │            │  │ sessions ← visitSessions → visits       │ │
│  etikečių dizaineris     │            │  │ labelTemplates                          │ │
└──────────────────────────┘            │  └─────────────────────────────────────────┘ │
                                        └──────────────────────────────────────────────┘

Etikečių spausdinimo kelias (tik kioske):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (etikečių šablonai arba įtaisytas HTML atsarginis variantas)
       └▶ LabelRenderer → HTML dokumentas + įterpti SVG brūkšniniai kodai
            └▶ PrintUI: WebView atvaizdavimas → ViewShot JPG fiksavimas
                 └▶ printer-helper vietinis modulis → Brother QL / Zebra
```

| Paviršius | Saugykla | Technologijos | Vaidmuo |
|-----------|----------|---------------|---------|
| Kioskas | `B1Checkin` | Expo / React Native, expo-router failų maršrutizavimas; EAS kūrimai Android, Amazon Fire ir iOS; OTA atnaujinimai per `expo-updates` | Personalizuota ar savitarnos stotis su etikečių spausdinimu ir patikrintu išėjimu |
| Savitarnos prijava | `B1App` | Next.js (b1.church narių portalas) | Prisijungę nariai prijungia savo namų ūkį iš telefono; spausdinimo nėra |
| Administravimas | `B1Admin` | React SPA | Konfigūruoja pamaldų struktūrą, priskiria grupes pamaldų laikams, kuria etiketes, įveda rankinį lankomumą, rengia ataskaitas |

Visi trys kreipiasi į tuos pačius du API modulius per `ApiHelper`: **MembershipApi** (`/membership`) asmenims, namų ūkiams ir grupėms; **AttendanceApi** (`/attendance`) visam kitam, kas aprašyta toliau.

## Duomenų modelis (`Api/src/modules/attendance`)

| Objektas / lentelė | Pagrindiniai laukai | Reikšmė |
|--------------------|---------------------|---------|
| `campuses` | name, address | Pasenusi — kampusai tvarkomi narystės modulyje (`/membership/campuses`); lankomumo kopija įšaldyta tik skaitymui senesniems komponentams (`models/Campus.ts`) |
| `services` | campusId, name | Pasikartojantis susibūrimas, pvz., „Sekmadienio rytas" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Laiko tarpas pamaldose, pvz., „9:00" (`models/ServiceTime.ts`). Tvarkaraščio stulpeliai neprivalomi (migracija `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) ir valdo [prijungimo langą](#planuojami-prijungimo-langai) |
| `groupServiceTimes` | groupId, serviceTimeId | Jungiamoji lentelė: kurios grupės (klasės) susirenka kuriuose pamaldų laikuose (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Vienas vienos grupės susitikimas vienu datos (`models/Session.ts`) — sukuriamas tingiai prijungimo metu |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Vienas asmuo, dalyvaujantis vieną dieną (`models/Visit.ts`). `checkinType` yra `member` / `guest` / `volunteer` (NULL = senas narys); nustato kioskas ir naudoja talpos / santykio kontrolės vartai |
| `visitSessions` | visitId, sessionId | Kuriuos seansus apima apsilankymas — vaikas, prijungtas prie dviejų pamaldų laikų, turi dvi eilutes (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON blokai) | Pritaikomi etikečių išdėstymai (`models/LabelTemplate.ts`) |

### Kaip įrašoma užbaigta prijungimas

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) apdoroja `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Turinys — `Visit` objektų masyvas, kiekvienas su `visitSessions`, kurių įterptas `session` nurodo tik porą `(serviceTimeId, groupId)`. Tuomet serveris:

1. **Patikrina talpą ir santykius prieš bet kokį įrašymą.** `evaluateGates()` → `CheckinGateHelper.evaluate()` tikrina kiekvieno tikslinio kambario talpą, svečių talpą, uždarymo vėliavėlę ir savanorių santykį pagal dabartinį užimtumą. postCheckin **nėra transakcinis**, todėl vartai turi veikti prieš pirmą išsaugojimą — rimtas pažeidimas grąžina 409 su nurodytu kambariu (-iais) ir nieko neįrašoma. Žr. [Talpos ir savanorių santykio vartai](#talpos-ir-savanoriu-santykio-vartai).
2. **Tingiai nustato seansus.** `getSessionId()` randa arba sukuria `sessions` eilutę `(groupId, serviceTimeId, today)` — seansų id talpinami proceso atmintyje pagal datą. Nauji seansai išsiunčia `session.created` webhook. Ciklas yra laukiamas `for..of` — ankstesnis `forEach(async …)` be laukimo lenktyniavo su įrašymu ir įrašė NULL sessionId pirmojo seanso sukūrimo metu (ištaisyta; pastaba kodo komentare ciklo vietoje).
3. **Pakeičia dienos įrašus.** Visi esami tų asmenų apsilankymai tą pamaldų dieną ištrinami kartu su jų visitSessions, tada įrašomas pateiktas rinkinys. Todėl pakartotinė šeimos prijunga yra idempotentinė operacija „tai dabartinė būsena", o ne papildymas. Perdavus `?checkDuplicates=true`, grąžinamas `{ duplicates: [personId…] }` be įrašymo — taip kioskas įspėja prieš perrašymą.
4. **Sugeneruoja vieną saugumo kodą kiekvienai partijai.** `SecurityCodeHelper.generate()` sukuria 4 simbolių kodą iš abėcėlės `23456789BCDFGHJKLMNPQRSTVWXYZ` (be balsių ir painiųjų simbolių, todėl kodai nesudaro žodžių ir nesupainiojami). Serveris kartoja, jei susidurta su tos pačios bažnyčios tos pačios dienos atvirais apsilankymais, ir šį kodą įrašo į kiekvieną partijos apsilankymą.
5. **Grąžina `{ streaks, securityCode }`.** `streaks` susieja personId su nuosekliu savaičių lankymų skaičiumi; kioskas pasitinka etapinius pasiekimus (kas 5-ą savaitę) konfeti.

Kiekvienas išsaugotas apsilankymas taip pat išsiunčia `attendance.recorded` webhook. Skaitymo pusė, `GET /attendance/visits/checkin`, grąžina asmenų apsilankymus nuo jų **paskutinės užregistruotos datos** — jei tai buvo ankstesnė savaitė, id pašalinami, ir klientas gauna iš anksto užpildytą praėjusios savaitės kambarių pasirinkimų kopiją, kuri bus išsaugota kaip nauji įrašai.

### Išėjimas

Du galutiniai taškai užbaigia ciklą (`VisitController`):

- `GET /attendance/visits/code/:code` — šiandienos dar neišėjusių apsilankymų su tuo saugumo kodu, su užpildytais seansais.
- `POST /attendance/visits/checkout` — turinys `{ visitIds, checkedOutBy?, checkedOutById? }`; įrašo `checkoutTime` ir, kas pasiėmė, bei kiekvienam apsilankymui išsiunčia `attendance.checkout` webhook.

Leidimai: kioskai autentifikuojasi su `attendance.checkin`, kuris suteikia tiksliai prijungimo / išėjimo / etikečių šablonų paviršių, be to, namų ūkio paieškas, kurių kioskui reikia be `people.view` (paieška pagal telefoną ar vardą, namų ūkio nariai prijungimo modelyje ir namų ūkio paėmimo sąrašas). B1Checkin `SessionHelper.filterChurches` rodo tik bažnyčias, kuriose paskyra turi `Attendance/Checkin` arba `Attendance/Edit`. `Checkin` nebėra Everyone (null-role) leidimų dalis (`RoleHelper` ir migracija `2026-11-01_remove_everyone_checkin`), todėl jį reikia suteikti per tikrą vaidmenį; `attendance.view`/`attendance.edit` apima ataskaitas ir rankinį įvedimą; struktūrai (pamaldos, pamaldų laikai, grupių priskyrimai) reikia `services.edit`. Narių savitarnos prijungimui (B1App) leidimų nereikia: bet kuris prisijungęs vartotojas su susietu asmeniu bažnyčioje gali kviesti `GET`/`POST /attendance/visits/checkin`, o serveris apriboja pateiktus `personId` tik skelbėjo namų ūkiu (kitaip 403 — šis barjeras neleidžia pasiekti kitų šeimų `securityCode`). Narystė yra leidimas; ar nariai *mato* funkciją, valdo bažnyčios B1App navigacijos skirtukai. Kiti prijungimo galutiniai taškai (`code/:code`, `checkout`, `guardians`, `CheckinController`) lieka tik kiosko / darbuotojų.

## Grupės valdo kambarių nukreipimą

Sistemoje nėra jokio kambario ar klasės objekto. „Kambarys" yra narystės **grupė** su įjungtu `trackAttendance`, susieta su vienu ar daugiau pamaldų laikų per `groupServiceTimes`. Grupės laukai (`Api/src/modules/membership/models/Group.ts`), formuojantys kiosko elgseną:

| Laukas | Poveikis |
|--------|----------|
| `trackAttendance` | Grupė apskritai dalyvauja lankomume; B1Admin sąrankos medis pažymi `trackAttendance` grupes be `groupServiceTimes` eilutės kaip nepriskirtas |
| `parentPickup` | Pažymi vaikų kambarį: prijungimas prie jo daro apsilankymą „vaiko" apsilankymu, kuris išspausdina šeimos paėmimo etiketę ir įrašo saugumo kodą ant vardinės etiketės |
| `printNametag` | Ar prijungimai prie šios grupės apskritai spausdina vardinę etiketę |
| `capacity` / `guestCapacity` / `checkinClosed` | Kambario talpos ribos ir griežtas „uždaryta" jungiklis, kuriuos įgyvendina serveris per prijungimo vartus (redaguojama B1Admin grupės nustatymuose skiltyje „Check-In Capacity") |
| `volunteerRatio` / `minVolunteers` | Vaikų ir savanorio santykis bei minimalus savanorių skaičius, taikomi pagal bažnyčios mastu galiojantį `ratioEnforcement` nustatymą |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Amžiaus / klasės tinkamumo ribos, vertinamos kioske, kad kambariai būtų paryškinti arba pritemdyti |

Visi klientai denormalizuoja vienodai (pvz., `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): lygiagrečiai įkeliama `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` ir `GET /membership/groups`, tuomet kiekvienam pamaldų laikui surenkamos grupės, kurių `groupServiceTimes` eilutė į jį nurodo, į `serviceTime.groups`. Šis masyvas yra tai, ką rodo kambario pasirinkiklis, sugrupuotas pagal grupės `categoryName`.

Priskyrimai redaguojami grupės puslapyje B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), o visas medis Kampusas → Pamaldos → Pamaldų laikas → Grupė vizualizuojamas `B1Admin/src/attendance/components/AttendanceSetup.tsx` per `GET /attendance/attendancerecords/tree`.

:::info
Kadangi grupės yra vienintelis tiesos šaltinis, ta pati grupių narystė valdo kioskų nukreipimą, sąrašo tipo lankomumą B1Admin grupių puslapiuose ir lankomumo ataskaitas — grupės priskyrimas pamaldų laikui yra vienintelis žingsnis, reikalingas, kad ji taptų prijungimo paskirties vieta.
:::

## Vaikų saugumas

### Prijungimo tipai

Kiekvienas apsilankymas turi `checkinType` — `member`, `guest` arba `volunteer` (NULL reiškia seną / narį; migracija `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Tipą pasirenka **kiosko pusėje**: Narys / Svečias / Savanoris žymos išplėstoje nario eilutėje (`B1Checkin/src/components/MemberServiceTimes.tsx`), o užbaigus prijungimą jos priskiriamos kiekvienam laukiančiam apsilankymui (`app/checkinComplete.tsx`, pagal numatytuosius — `member`). Serveris tipą naudoja vartuose: savanoriai skaičiuojami į santykio aprėptį, o ne prieš talpą, o svečiai skaičiuojami prieš `guestCapacity`.

### Talpos ir savanorių santykio vartai

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) vykdomas `postCheckin` viduje prieš bet kokį įrašymą (galutinis taškas nėra transakcinis, todėl vartai prieš įrašymą yra teisingumo mechanizmas). Jis įkelia dabartinį užimtumą pagal tikslines grupes (`VisitRepo.countActiveByGroupToday`) ir grupės konfigūraciją per narystės modulio tarpinį sluoksnį, tuomet klasifikuoja pažeidimus:

- **Griežti (visada blokuoja):** `checkinClosed`, `current + incoming > capacity`, svečių skaičius viršija `guestCapacity`. Partija atmetama su `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` — kioskas parodo nurodytą kambarį.
- **Santykio (įspėja arba blokuoja):** į kambarį įeinantys ne savanoriai, kai `volunteers < minVolunteers`, visai nėra savanorių arba `children > volunteers × volunteerRatio`. Rimtumą lemia bažnyčios nustatymas `ratioEnforcement` (`"warn"` numatytasis / `"block"`, redaguojamas B1Admin Manage Church → Check-In, `CheckinSettingsEdit.tsx`). Įspėjimo režimas grąžina `409 { warning: true, error: "ratio", … }`, nebent klientas pakartotinai pateikia su `acknowledgeWarnings=true` — šis pakartotinis pateikimas yra kiosko darbuotojo patvirtinimo perrašymas.

### Planuojami prijungimo langai

Pamaldų laikas gali turėti neprivalomą savaitinį tvarkaraštį (`dayOfWeek` 0–6, kur 0 = sekmadienis, `startTime`/`endTime` kaip `HH:mm`, `checkinOpenMinutes`, `checkinCloseMinutes`), redaguojamą B1Admin **Attendance → Setup** pamaldų laiko formoje (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, „Check-in Schedule"). `CheckinGateHelper.hasSchedule()` laiko pamaldų laiką planuotu tik tada, kai nustatyti ir `dayOfWeek`, ir `startTime`; neplanuoti laikai niekada neribojami laiku. `isServiceTimeOpen()` apskaičiuoja langą vietiniu sienos laiku (`DateHelper.toChurchTime`). Zoną kiekvienam pamaldų laikui nustato `CheckinTimeZoneHelper.load()` (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`): pirmiausia imama paslaugos kampuso `timezone` (`service.campusId`, per `MembershipModuleGateway.loadCampusTimeZones`), po to bažnyčios `timeZone` (nustatoma B1Admin Church Information), tada pirmas nepašalintas kampusas, turintis `timezone` (`loadCampusTimeZone`), ir tik tuomet `America/New_York`. Kampusas pirmauja, nes dauguma bažnyčių turėjo atgal užpildytą `America/New_York` kaip bažnyčios zoną. Tiek sąrašo, tiek įrašymo keliai žemiau zoną nustato vienodai. Langas tęsiasi nuo `checkinOpenMinutes` prieš pradžią iki `checkinCloseMinutes` po pabaigos (arba po pradžios, jei pabaigos nėra), apdorojant langus, kertančius vidurnaktį ar savaitės ribą.

Langas taikomas dviejose vietose:

- **Sąrašas:** `GET /attendance/servicetimes` kiekvienam įrašui priskiria apskaičiuotą `checkinOpen` loginį lauką. B1App savitarnos prijungimas (`CheckinPage.tsx`) ir B1Checkin paslaugų pasirinkimas (`app/services.tsx`) palieka visus laikus. Kai visi tam tikros paslaugos laikai uždaryti, rodomas artimiausias atsidarymas („Check-in opens Sun 9:30 AM." B1App, „Check-in for this service opens Sun 9:30 AM." B1Checkin, iš `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`), o jei atsidarymo laiko apskaičiuoti nepavyksta, rodoma „Check-in isn't open for this service right now." (kioskas siūlo grįžimo mygtuką pasirinkti kitą paslaugą). Kitu atveju uždaryti laikai rodomi kaip nepasirenkama eilutė „Closed" / „Closed · opens 9:30 AM". B1Checkin namų ūkio ekranas (`MemberServiceTimes.tsx`) atnaujina atvirumą tiesiogiai pagal įrenginio laikrodį su `ServiceTimeHelper.isCheckinOpen()` (įrenginio laiko zona, ne bažnyčios), todėl kioskas, paliktas veikti, atsidaro ir užsidaro laiku, ir ant uždaryto laiko, kurį asmuo jau turi, rodo „Kids Room 1 · Checked in" (grupės pavadinimas).
- **Įrašymas:** `evaluateGates()` viduje, prieš talpos / santykio vertinimą, `findClosedServiceTimeGroups()` atmeta partiją su `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }`, jei bet kurio tikslinio seanso pamaldų laikas yra už jo lango. Kadangi namų ūkio esami šiandienos apsilankymai pakartotinai pateikiami su kiekvienu prijungimu, seansai, kuriuos asmuo jau turi (`personId|sessionId` esamuose apsilankymuose), praleidžia šį vartą, todėl pridėjus vėlesnį atvirą pamaldų laiką jis nėra atmetamas dėl to, kad ankstesnis langas užsidarė. B1Checkin tai rodo per griežto vartų ekraną su priežastimi „check-in isn't open right now" (talpos pažeidimai vis dar rodo „room is full or closed").

### Amžiaus / klasės tinkamumas (kiosko pusėje)

Kambarių tinkamumas yra patariamasis UI, vertinamas kioske, o ne įgyvendinamas serveryje. `B1Checkin/src/helpers/EligibilityHelper.ts` palygina asmens gimimo datą / klasę su grupės `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` (klasių tvarka: PreK, K, 1–12, Graduated) ir grąžina `eligible` / `ineligible` / `unknown` — trūkstami duomenys duoda `unknown` ir niekada nepaslepia kambario. Amžiai ir klasės apskaičiuojami bažnyčios **klasės perkėlimo datai** (`gradePromotionDate` nustatymas, `"MM-DD"`, redaguojamas `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); kioskas jį gauna iš `GET /attendance/checkin/settings`, o `resolveAsOfDate` parenka artimiausią pasikartojimą, įvykusį šiandien arba anksčiau. Kambarių pasirinkiklis paryškina tinkamus kambarius ir pritemdo netinkamus; pasirinkus pritemdytą kambarį, reikalingas darbuotojo patvirtinimas.

### Patikimas ir neleidžiamas paėmimas

Paėmimo asmenys yra narystės objektas, kiekvienam namų ūkiui: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, neprivalomas personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). CRUD veikia per `GET /membership/householdpickup/:householdId` (bet kuris prisijungęs bažnyčios vartotojas, kad kioskai galėtų skaityti) ir `POST` / `DELETE`, valdomus per `people.edit`. Darbuotojai sąrašą tvarko asmens puslapio kortelėje **Pickup** (`B1Admin/src/people/components/PickupPeople.tsx`) — nuotrauka, ryšys ir Patikimas / Neleidžiama statuso žymė.

Išėjimo metu (`B1Checkin/app/checkout.tsx`) kioskas įkelia namų ūkio paėmimo sąrašą: `trusted` įrašai rodomi kaip spaudžiamos paėmimo kortelės kartu su suaugusių namų ūkio narių nuotraukų tinkleliu, o laisvai įvestas vardas „Other" lyginamas su `notAuthorized` įrašais pagal panašumą (Levenshtein, `src/helpers/PickupMatchHelper.ts`) — atitikimas blokuoja išėjimą įspėjimo lapu ir darbuotojo mygtuku **Override**. Perrašymas įrašomas pačiame apsilankyme: per įprastą `POST /attendance/visits/checkout` siunčiamas `checkedOutBy` kaip `"OVERRIDE: {name}"`, todėl jis patenka į lankomumo įrašą ir `attendance.checkout` webhook, o ne į atskirą audito lentelę.

### Tėvų pasiekimas ir skubus pranešimas

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) pateikia du SMS galutinius taškus:

- `POST /page` — `{ visitId, message }`: siunčia žinutę vieno prijungto vaiko globėjams (kiosko išėjimo ekranas, darbuotojų režimas).
- `POST /broadcast` — `{ serviceId, message }`: išsiunčia SMS visiems prijungtų namų ūkių suaugusiesiems vienai paslaugai (kiosko administravimo nustatymai, už `EMERGENCY` tipo patvirtinimo lapo `B1Checkin/app/adminSettings.tsx`).

Abu per narystės tarpinį sluoksnį nustato namų ūkio suaugusiuosius, tada perduoda pristatymą **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — tarpmodulinis įėjimas į bažnyčios sukonfigūruotą SMS paslaugų teikėją (`@churchapps/texting`: TextInChurch, Clearstream arba MutualMinistry; įmontuoto SMS siuntėjo nėra). Tarpinis sluoksnis įrašo `sentText` eilutę ir kiekvieno gavėjo `deliveryLog` įrašus bei riboja partiją 500 gavėjų; kai paslaugos teikėjas nesukonfigūruotas, grąžinamas `no_provider`, kurį kioskas rodo kaip „No SMS provider configured". Valdiklio `dispatch()` pašalina pasikartojančius telefono numerius ir praleidžia asmenis be mobiliojo numerio arba su nustatytu `optedOut`, grąžindamas `{ sent, failed, skippedOptedOut, skippedNoPhone }`, kad kioskas galėtų parodyti, kas buvo praleista.

## Kioskas (B1Checkin)

Ekranai yra expo-router failai `B1Checkin/app/` kataloge; tarpekranų būsena laikoma statinėje `CachedData` klasėje (`src/helpers/CachedData.ts`), o ne React būsenoje.

```
index (paleidimas / automatinis prisijungimas) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             įkelia serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ spausdina etiketes,
             groupServiceTimes,           │             └▶ checkout (darbuotojų)       automatiškai grįžta
             labelTemplates               │                                            į lookup
```

1. **Paieška** (`app/lookup.tsx`) — ieškoma pagal telefoną (`GET /membership/people/search/phone?number=`, paskutiniai 4 arba pilnas) arba pagal vardą (`GET /membership/people/search?term=`). Pasirinkus atitikimą, įkeliamas namų ūkis (`GET /membership/people/household/{householdId}`) ir esami apsilankymai (`GET /attendance/visits/checkin`), užpildant `pendingVisits` praėjusios savaitės pasirinkimais.
2. **Namų ūkio peržiūra** (`app/household.tsx`, `src/components/MemberList.tsx`) — kiekvienoje nario eilutėje rodomas jau prijungtas ženklelis, alergijos / `nametagNotes` ženklelis ir dabartiniai kambarių žetonai. Išplėtus narį, išvardijami visi pamaldų laikai su kambario mygtuku ir Narys / Svečias / Savanoris prijungimo tipo žymos (`MemberServiceTimes.tsx`). Po kiekvieno pamaldų laiko pavadinimu `ServiceTimeHelper.getGroupSummary()` rodo ten siūlomas grupes (`serviceTime.groups` pavadinimai, apkarpyti, be pasikartojimų nepaisant raidžių dydžio, sujungti kableliais); jei laikas neturi grupių, nieko nerodoma.
3. **Grupės priskyrimas** (`app/selectGroup.tsx`) — kategorijų medis, sudarytas iš `serviceTime.groups`, su amžiaus / klasės tinkamais kambariais, paryškintais, ir netinkamais, pritemdytais už darbuotojo patvirtinimo (žr. [Amžius / klasės tinkamumas](#amziaus-klases-tinkamumas-kiosko-puseje)); pasirinkus kambarį, į to asmens laukiantį apsilankymą įrašomas `{ session: { serviceTimeId, groupId } }` visitSession (`src/helpers/VisitSessionHelper.ts`). „None" jį išvalo.
4. **Užbaigimas** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` su `pendingVisits` (kiekvienas su savo `checkinType`), tuomet spausdinamos etiketės, jei sukonfigūruotas spausdintuvas, ir automatiškai grįžtama į paiešką. `409` talpos ar `notOpen` atsakymas parodo nurodytą kambarį su priežastimi (pilna / uždaryta arba prijungimas neatidarytas); santykio įspėjimas siūlo darbuotojo patvirtinimą, kuris pakartotinai pateikia su `acknowledgeWarnings=true`.

Ekranas **Išėjimas** (`app/checkout.tsx`) priima 4 simbolių saugumo kodą per automatiškai fokusuojamą įvestį — taip USB / Bluetooth klaviatūros tipo brūkšninių kodų skaitytuvai veikia be kameros — arba ekrano klaviatūrą su ta pačia abėcėle, automatiškai pateikiamą, kai įvedama 4 simboliai. Mygtukas **Scan** atidaro lapą su bendra kamera `src/components/CodeScanner.tsx` (pagal numatytuosius galinė, priimanti QR, Code 128 ir Code 39), kad stotys be laidinio skaitytuvo galėtų nuskaityti paėmimo etiketę; nuskaitytas kodas patenka į tą patį `handleCode()` kelią kaip įvestas tekstas. Ekranas suranda kodą, parodo vaikus, kurie yra paimami, ir pateikia namų ūkio **patikimus paėmimo asmenis** kaip spaudžiamas korteles kartu su suaugusių namų ūkio narių nuotraukų tinkleliu (ir „Other" laisvo teksto parinktį, kuri lyginama su neleidžiamais vardais — žr. [Patikimas ir neleidžiamas paėmimas](#patikimas-ir-neleidziamas-paemimas)), tada siunčia `POST /attendance/visits/checkout` su paėmėjo vardu / id. Darbuotojų režime ekranas taip pat siūlo **Page a parent** (`POST /attendance/checkin/page`) ir **saugumo etiketės pakartotinį spausdinimą** — `reprint()` atkuria šeimos etiketes per `LabelHelper.getAllLabelsFor(...)` ir perduoda jas tuo pačiu `PrintUI` keliu kaip ir prijungimui.

Stoties charakteris yra AsyncStorage vėliavėlė `@StationMode` (`"self"` | `"manned"`, perjungiama `app/adminSettings.tsx`). Darbuotojų režimas prideda išėjimo įėjimo tašką paieškos ekrane ir individualaus nario profilio redagavimą (`POST /membership/people`) namų ūkio ekrane. Kiosko apsauga įdiegta iš anksto: neprivalomas PIN kodas (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) saugo administravimo ir spausdintuvo ekranus, administravimo ekranas atsiveria tik 7 greitais bakstelėjimais ant antraštės logotipo, o neaktyvumo laikmatis (`src/hooks/useInactivityTimer.ts`) tarp šeimų parodo pradinį ekraną.

## Savitarnos prijungimas (B1App)

Nariai prisijungia iš b1.church portalo `/mobile/checkin` ekrane (maršrutizuoja `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` į `screens/CheckinPage.tsx`). Reikia prisijungusio vartotojo, ir jis praeina tuos pačius keturis žingsnius kaip kioskas — paslaugos → namų ūkis → grupės → užbaigimas — su identiškais galutiniais taškais, o būsena laikoma `B1App/src/helpers/CheckinHelper.ts`. Skirtumai nuo kiosko: namų ūkis imamas iš prisijungusio vartotojo `householdId` (paieškos žingsnio nėra), o spausdinimo nėra — vietoje to užbaigimo ekrane rodomas partijos saugumo kodas kaip QR (`qrcode.react`) su užuomina „show this at a check-in station". Jei namų ūkis jau prijungtas, puslapiui įsikraunant, mygtukas „Show check-in code" iš pirmo esamo apsilankymo, turinčio `securityCode` (iš `GET /attendance/visits/checkin`), pakartotinai parodo QR. Prijungimas užregistruojamas iš karto pateikimo metu (laukiančios būsenos nėra); QR tik valdo etikečių spausdinimą kioske.

**Etikečių spausdinimas iš telefono į kioską** (`B1Checkin/app/scan.tsx`, pasiekiama iš QR mygtuko „Scan code" paieškos ekrane): kioskas rodo `CodeScanner` (`expo-camera` `CameraView`, pagal numatytuosius priekinė, perjungiama), skenuojantį QR kodus. `ScanCodeHelper.parse()` priima krovinį tik tada, kai tai nuogas 4 simbolių kodas saugumo kodo abėcėlėje, o `ScanCodeHelper.isRepeat()` ignoruoja tą patį kodą 4 sekundes, todėl veikia ir B1App QR, ir atspausdinto etiketės QR blokas. Ekranas tuomet seka išėjimo pakartotinio spausdinimo kelią — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — ir grįžta į paiešką. Skenavimo metu lankomumo įrašas nevyksta; tik etiketės. Kodai be aktyvių apsilankymų, stotys be spausdintuvo ir grupės be etikečių kiekviena rodo pranešimą ir grįžta į paiešką.

Tipai ir `ApiHelper` / `ArrayHelper` ateina iš `@churchapps/helpers` ir `@churchapps/apphelper`; React komponentai su B1Admin nesidalijami.

## Administravimo pusės lankomumas (B1Admin)

- **Sąranka** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) rodo struktūros medį ir kuria paslaugas (`ServiceEdit.tsx`) bei pamaldų laikus (`ServiceTimeEdit.tsx`). Kampusų duomenys ateina iš narystės per `useCampuses()` kabliuką.
- **Rankinis lankomumas** yra grupių pusėje, o ne lankomumo skyriuje: `B1Admin/src/groups/components/GroupSessionsTab.tsx` kuria seansus (`POST /attendance/sessions`; pridedant, `SessionEdit.tsx` gali įtraukti po vieną seansą kiekvienai kitai grupei, bendrinančiai pasirinktą pamaldų laiką, praleidžiant grupes, kurioms tą datą jau yra seansas) ir pažymi asmenis dalyvavusiais per `POST /attendance/visitsessions/log`, kuris randa arba sukuria to asmens ir seanso apsilankymą. Grupių vadovai gali įrašyti lankomumą savo grupėms be `attendance.edit` leidimo — valdikliai tikrina `au.leaderGroupIds`.
- **Ataskaitos** — lankomumo tendencijos ir grupių lankomumas yra serverio apibrėžtos ataskaitos (`B1Admin/src/components/reporting/ReportWithFilter.tsx` su ReportingApi; apibrėžimai `Api/reports/*.json`). Abi priima `startDate`/`endDate` (pabaigos data įskaitoma); tendencijų ataskaita pagal numatytuosius rodo nuo metų atgal iki šiandien ir prideda kiekvienos savaitės `sessionDates` stulpelį, o grupių lankomumo ekrano medis apima kiekvieno apsilankymo `checkinTime` ir asmens `membershipStatus`. Grupių lankomumo CSV ateina iš susijusios `groupAttendanceDownload` ataskaitos, kurią `GroupAttendanceDownloadHelper` suvedžioja į po vieną eilutę kiekvienam grupės nariui su buvo / nebuvo stulpeliu kiekvienam datuotam seansui; asmens istorija pasiekiama per `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Etikečių spausdinimas

### Šablonai ir dizaineris

Bažnyčios kuria savo etiketes B1Admin `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, pasiekiama iš Check-In nustatymų puslapio). Šablonas yra `labelTemplates` eilutė, kurios `content` yra JSON blokų masyvas — `text`, `field`, `barcode`, `qrcode` arba `box` — kiekvienas išdėstytas procentinėmis koordinatėmis su šriftu, lygiavimu, simbolika (`code39`/`code128`/`qr`) ir neprivalomomis matomumo sąlygomis (pvz., rodyti alergijų langelį tik tada, kai `person.nametagNotes` nėra tuščias). Yra du `labelType`: `nametag` (vienas kiekvienam prijungtam asmeniui; laukai kaip `person.displayName`, `sessions`, `securityCode` ir `person.isBirthdayWeek` — `"true"`, kai gimtadienio mėnuo ir diena yra per 3 dienas nuo šiandienos, apvyniojant per metų sandūrą, skaičiuojama `LabelHelper.isBirthdayWithin()`) ir `pickup` (vienas kiekvienai šeimai; laukai kaip `children`, `childrenAllergies`). Serveris užtikrina vieną numatytąjį šabloną kiekvienam tipui bažnyčioje (`LabelTemplateController.save`). Dizaineris pateikia pradinius šablonus, atitinkančius kiosko įtaisytas etiketes, ir peržiūri juos su pavyzdiniais duomenimis.

### Atvaizdavimas ir spausdinimas kiosko pusėje

Užbaigus prijungimą, `B1Checkin/src/helpers/LabelHelper.ts` nusprendžia, ką spausdinti, pagal kiekvieno laukiančio apsilankymo grupės žymas: vardines etiketes `printNametag` grupėms, plius vieną šeimos paėmimo etiketę, jei bet kuris apsilankymas pateko į `parentPickup` grupę. Apsilankymus su `checkinType` `volunteer` praleidžia `LabelHelper.selectChildVisits()`, todėl savanoris vaikų priežiūros darbuotojas Tėvų paėmimo kambaryje niekada nesukelia paėmimo etiketės. Saugumo kodas iš prijungimo atsakymo dedamas ant vaikų vardinių etikečių ir paėmimo etiketės; suaugusiųjų vardinės etiketės spausdinamos be kodo. Jei bažnyčia turi šablonų, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) paverčia blokus ir lauko kontekstą į savarankišką HTML dokumentą; kitu atveju naudojamos įtaisytos HTML etiketės `B1Checkin/assets/labels/` kataloge su vietos rezervuotųjų žymių pakeitimu.

Brūkšniniai kodai generuojami kaip įterpti SVG grynojo TypeScript kodavimo įrankiais `B1Checkin/src/helpers/barcode.ts` — Code 39 šablonų lentelės ir Code 128 (kodų rinkinys B su mod-103 kontroline suma) plotių lentelės, o QR — per `qrcode` paketą. **Šie kodavimo įrankiai tyčia dubliuojami B1Admin** (`LabelEditor.tsx` įtraukia tas pačias lenteles, pažymėta kodo komentare), kad dizainerio peržiūros būtų pikseliui tikslios kiosko išvesčiai; vieno pakeitimas turi būti atspindėtas kitame.

Spausdinimo grandinė (`src/components/PrintUI.tsx`) atvaizduoja kiekvieną HTML etiketę `WebView`, fiksuoja ją į JPG per `react-native-view-shot` ir perduoda vaizdų URI vietiniam **printer-helper** Expo moduliui (`B1Checkin/modules/printer-helper/`). Modulis atskleidžia `scan()`, `checkInit()`, `printUris()` ir būsenos įvykius, su tiekėju kiekvienam prekės ženklui abiejose platformose:

| Prekės ženklas | Android | iOS | Pastabos |
|----------------|---------|-----|----------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | QL serijos tinklo spausdintuvai (QL-800/810W/820NWB/1100/1110NWB…), kirstos 29×90 etiketės, rekomenduojamas numatytasis |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Tinklo aptikimas + TCP/ZPL vaizdų spausdinimas |

Spausdintuvo pasirinkimas yra `app/printers.tsx` (tinklo skenavimas grąžina `brand~model~ip` įrašus; pasirinkimas išsaugomas AsyncStorage), o `src/helpers/PrinterLog.ts` laiko įrenginio diagnostikos žurnalą, rodomą per gyvą būsenos tašką kiosko antraštėje.

## Svečių registracija

Du keliai sukuria asmenį prijungimo metu:

- **Kiosko vietoje** — namų ūkio ekrano „Add guest" atveria `B1Checkin/app/addGuest.tsx`, kuris pirmiausia ieško esamo ne nario atitikimo per `GET /membership/people/search?term=`, o jei nieko nerandama, sukuria naują per `POST /membership/people`, pridėtą prie dabartinio namų ūkio. Svečias tuomet eina per grupės priskyrimą kaip ir bet kuris narys.
- **Savitarna per QR** — kai bažnyčios nustatymas `enableQRGuestRegistration` įjungtas (konfigūruojamas B1Admin Check-In nustatymuose, skaitomas iš `GET /membership/settings/public/{churchId}`), kioskų paieškos ekranas rodo QR kodą, vedantį į `https://{subdomain}.b1.church/guest-register?serviceId=`. Šis B1App puslapis (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) leidžia lankančiai šeimai užsiregistruoti savo telefone per anoniminį `POST /membership/people/guest-register` galutinį tašką, palaikant kioskų eilę judančią. QR lape taip pat yra mygtukas **Register here**, kuris atveria tą patį puslapį kiosko ekrane (`app/guestRegister.tsx`) inkognito, be talpyklos `WebView`; `src/helpers/GuestRegisterHelper.ts` sukuria URL ir QR, ir WebView, ir blokuoja naršymą už `https://{subdomain}.b1.church/guest-register` ribų. Ekranas grįžta į paiešką paspaudus **Done**, atgal arba po 120 sekundžių neaktyvumo (formos rašymas perduodamas iš WebView kaip aktyvumas), ir atjungia WebView, kad vienos šeimos įrašai nepasiektų kitos.

QR registraciją valdo bažnyčios nustatymai, įrašomi iš **QR Guest Registration** kortelės B1Admin (`src/mobile/CheckInPage.tsx`):

| Nustatymas | Matomumas | Paskirtis |
|---|---|---|
| `enableQRGuestRegistration` | viešas | Įjungimo jungiklis kioskų QR ir anoniminiams galutiniams taškams |
| `guestRegistrationFields` | viešas | JSON žemėlapis `email`, `phone`, `address`, `birthDate`, `gender`, `maritalStatus`, `grade`, `comments` → `"off"` / `"optional"` / `"required"`. Numatytasis: el. paštas ir telefonas neprivalomi, likusieji išjungti. Vardas ir pavardė visada privalomi |
| `guestRegistrationImage` | viešas | Antraštės nuotraukos URL; B1App ją atvaizduoja 16:9 formate vietoj piktogramos formoje ir patvirtinimo ekrane |
| `guestRegistrationGroupId` | privatus | Grupė, į kurią pridedama kiekviena registracija (svečiai jos niekada nemato ir nerenkasi) |
| `guestRegistrationRecordAttendance` | privatus | `"true"`, kad taip pat būtų įrašytas tos grupės lankomumas |

B1App `src/components/checkin/GuestRegister.tsx` gauna kontrolinį sąrašą iš anoniminio `GET /membership/people/guest-register/options?churchId=` ir atvaizduoja tik įtrauktus laukus (el. paštas, telefonas, šeimyninė padėtis ir adresas pagrindiniam kontaktui; gimimo data, lytis ir klasė kiekvienam nariui; vienas komentarų laukas), siųsdamas tik juos. Serveris vėl taiko kontrolinį sąrašą `GuestRegistrationHelper.sanitize()` — išjungti laukai atmetami, trūkstamos privalomos arba sąrašo nepatenkančios reikšmės yra 400 — prieš paleidžiant `PersonHelper.registerGuestHousehold()`. Pirmiausia jis kiekvienam nariui su el. paštu arba telefonu iškviečia `PersonRepo.findGuestMatch()`: tiksliai vienas gyvas asmuo su tuo pačiu vardu ir tuo pačiu el. paštu arba telefono skaitmenimis yra pakartotinai naudojamas (nulis ar keli atitikimai sukuria naują asmenį, todėl niekada nespėliojama). Nariai be kontaktų atitinkami pagal vardą atitinkamame namų ūkyje. Pakartotinai naudojami asmenys niekada nekeičiami, todėl anoniminė forma negali perrašyti saugomų duomenų, o atsakymas pakartoja pateiktus vardus. Neatitikę nariai prisijungia prie atitikusio namų ūkio arba prie naujo, kaip `membershipStatus: "Visitor"`, kiekvienam naujam asmeniui išsiųsdami `person.created`. Vėliau klaidos įrašomos į žurnalą, o ne grąžinamos: nariai pridedami į sukonfigūruotą grupę (`group.member.added`); jei lankomumo įrašymas įjungtas, `AttendanceModuleGateway.recordAttendance()` pažymi kiekvieną narį kaip dalyvaujantį kiekvienam tos grupės pamaldų laikui, kuris turi tvarkaraštį ir kurio prijungimo langas (`CheckinGateHelper.isServiceTimeOpen`) šiuo metu atviras, sukurdamas seansą šiandienos bažnyčios vietinei datai, jei reikia — neplanuoti pamaldų laikai ir registracijos už lango nieko neįrašo; o komentarai tampa paslėpta asmens pastabos pokalbiu namų ūkio vadovui (žinutės autorius „Guest sign-up"), susietu per `person.conversationId`.

## Susiję puslapiai

- [Lankomumo galutiniai taškai](../api/endpoints/attendance) -- Pilnas REST paviršius kampusams, paslaugoms, seansams, apsilankymams ir apsilankymų seansams
- [Narystės galutiniai taškai](../api/endpoints/membership) -- Asmenys, namų ūkiai ir grupės
- [Webhook'ai](../api/webhooks) -- `session.created`, `attendance.recorded` ir `attendance.checkout` įvykiai
- [Modulio struktūra](../api/module-structure) -- Kaip lankomumo modulis organizuotas serverio pusėje
