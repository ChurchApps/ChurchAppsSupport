---
title: "Prijave"
---

# Prijave

<div class="article-intro">

Prijava je en sistem s tremi vhodi: aplikacija B1Checkin za kiosk na postajah z osebjem in za samopostrežno prijavo, samoprijava v portalu za člane B1App ter prijave na strani skrbnika v B1Admin. Vse tri zapisujejo v isti modul obiskov v jedru Api, razvrščanje v učilnice pa poteka izključno prek skupin – ni ločene entitete »lokacije« ali »sobe«. Nad tem stoji plast za varnost otrok: vrste prijav po obisku, strežniške omejitve zmogljivosti in razmerja prostovoljcev, preverjanje zaupanja vrednih oseb za prevzem pri odjavi, kiosk-stran preverjanje starosti in razreda ter obveščanje staršev prek ponudnika SMS-sporočil cerkve. Ta stran opisuje podatkovni model, tokove prijave, plast za varnost, ter postopek tiskanja oznak.

</div>

## Pregled

```
┌──────────────────────────┐
│ B1Checkin (Expo kiosk)   │──┐         ┌──────────────────────────────────────────────┐
│  iskanje → gospodinjstvo │  │         │ Api                                          │
│  → skupine → zaključek/  │  │  HTTPS  │  ┌─ modul članstva ────────────────────────┐ │
│  tiskanje                │  ├───────▶ │  │ osebe · gospodinjstva · skupine         │ │
├──────────────────────────┤  │         │  └─────────────────────────────────────────┘ │
│ B1App (samoprijava)      │──┤         │  ┌─ modul obiskov ─────────────────────────┐ │
│  zaslon /mobile/checkin  │  │         │  │ campuses → services → serviceTimes      │ │
├──────────────────────────┤  │         │  │ groupServiceTimes  (usmerjanje v sobe)  │ │
│ B1Admin (osebje)         │──┘         │  │ sessions ← visitSessions → visits       │ │
│  nastavitve · poročila · │            │  │ labelTemplates                          │ │
│  oblikovalnik oznak      │            │  └─────────────────────────────────────────┘ │
└──────────────────────────┘            └──────────────────────────────────────────────┘

Pot tiskanja oznak (samo kiosk):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (predloge oznak ali vgrajeni HTML rezerva)
       └▶ LabelRenderer → HTML dokument + vgrajene SVG kode
            └▶ PrintUI: upodobitev v WebView → zajem JPG z ViewShot
                 └▶ nativni modul printer-helper → Brother QL / Zebra
```

| Površina | Repozitorij | Sklad | Vloga |
|----------|-------------|-------|-------|
| Kiosk | `B1Checkin` | Expo / React Native, usmerjanje datotek expo-router; gradnje EAS za Android, Amazon Fire in iOS; posodobitve OTA prek `expo-updates` | Postaja z osebjem ali samopostrežna postaja s tiskanjem oznak in preverjeno odjavo |
| Samoprijava | `B1App` | Next.js (portal za člane b1.church) | Prijavljeni člani se s telefona prijavijo za svoje gospodinjstvo; brez tiskanja |
| Skrbnik | `B1Admin` | React SPA | Nastavi strukturo bogoslužij, dodeli skupine časom bogoslužij, oblikuje oznake, beleži ročno udeležbo in pripravlja poročila |

Vse tri površine kličejo isti dva modula API prek `ApiHelper`: **MembershipApi** (`/membership`) za osebe, gospodinjstva in skupine ter **AttendanceApi** (`/attendance`) za vse spodaj.

## Podatkovni model (`Api/src/modules/attendance`)

| Entiteta / tabela | Ključna polja | Pomen |
|-------------------|---------------|-------|
| `campuses` | name, address | Zastarelo – kampusi se vodijo v modulu članstva (`/membership/campuses`); kopija v modulu obiskov je zamrznjena in samo za branje za starejše bralce (`models/Campus.ts`) |
| `services` | campusId, name | Ponavljajoče se srečanje, npr. »Nedeljsko jutro« (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Časovni termin znotraj bogoslužja, npr. »9:00« (`models/ServiceTime.ts`). Stolpci urnika so izbirni (migracija `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) in določajo [okno za prijavo](#okna-za-prijavo-po-urniku) |
| `groupServiceTimes` | groupId, serviceTimeId | Vezna tabela: katere skupine (učilnice) se srečujejo ob katerih časih bogoslužja (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Eno srečanje ene skupine na en datum – ustvari se leno ob prijavi (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Ena oseba na enem datumu obiska (`models/Visit.ts`). `checkinType` je `member` / `guest` / `volunteer` (NULL = stari član); nastavi ga kiosk, uporabljata pa ga omejitve zmogljivosti in razmerij |
| `visitSessions` | visitId, sessionId | Katera srečanja pokriva obisk – otrok, prijavljen na dva časa bogoslužja, dobi dve vrstici (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (bloki JSON) | Oblikovljive postavitve oznak (`models/LabelTemplate.ts`) |

### Kako se dokončana prijava shrani

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) obdeluje `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Telo je polje objektov `Visit`, vsak s `visitSessions`, katerih vdelani `session` navaja le par `(serviceTimeId, groupId)`. Strežnik nato:

1. **Preveri zmogljivost in razmerja pred vsakim zapisom.** `evaluateGates()` → `CheckinGateHelper.evaluate()` preveri zmogljivost vsake ciljne sobe, zmogljivost za goste, zaprtost in razmerje prostovoljcev glede na trenutno zasedenost. postCheckin **ni transakcijski**, zato se omejitev mora izvesti pred prvim shranjevanjem – ob kršitvi vrne 409, ki navede prizadete sobe, ničesar pa se ne shrani. Glej [Omejitve zmogljivosti in razmerja prostovoljcev](#omejitve-zmogljivosti-in-razmerja-prostovoljcev).
2. **Razreši srečanja leno.** `getSessionId()` poišče ali ustvari vrstico v `sessions` za `(groupId, serviceTimeId, danes)` – ID-ji srečanj so predpomnjeni v procesu po datumu. Nova srečanja sprožijo webhook `session.created`. Zanka je čakajoča `for..of` – prejšnji `forEach(async …)` brez čakanja je tekmoval s shranjevanjem in ob ustvarjanju prvega srečanja zapisal NULL kot sessionId (popravljeno; omenjeno v komentarju kode pri zanki).
3. **Nadomesti zapise dneva.** Vsi obstoječi obiski teh oseb pri tem bogoslužju danes se izbrišejo skupaj z njihovimi visitSessions, nato se shrani poslani nabor. Ponovna prijava družine je zato idempotentna operacija »to je trenutno stanje«, ne dodajanje. Če pošljete `?checkDuplicates=true`, se vrne `{ duplicates: [personId…] }` brez zapisa – tako kiosk opozori, preden prepiše podatke.
4. **Ustvari eno varnostno kodo na paket.** `SecurityCodeHelper.generate()` ustvari 4-znakovno kodo iz abecede `23456789BCDFGHJKLMNPQRSTVWXYZ` (brez samoglasnikov in dvoumnih znakov, zato kode ne tvorijo besed in jih ni mogoče zamenjati). Strežnik ob trku ponovi poskus glede na odprte obiske iste cerkve za isti dan in kodo nastavi na vsak obisk v paketu.
5. **Vrne `{ streaks, securityCode }`.** `streaks` preslika personId v število zaporednih tednov obiska; kiosk praznuje mejnike (vsak peti teden) s konfetiji.

Vsak shranjen obisk sproži tudi webhook `attendance.recorded`. Branje, `GET /attendance/visits/checkin`, vrne obiske oseb od njihovega **zadnjega zabeleženega datuma** – če je bil ta prejšnji teden, se ID-ji odstranijo, zato odjemalec prejme predizpolnjeno kopijo izbir sob iz prejšnjega tedna, ki se shrani kot nova zapisa.

### Odjava

Dve končni točki zaključita krog (`VisitController`):

- `GET /attendance/visits/code/:code` – današnji še neodjavljeni obiski z to varnostno kodo, z napolnjenimi srečanji.
- `POST /attendance/visits/checkout` – telo `{ visitIds, checkedOutBy?, checkedOutById? }`; nastavi `checkoutTime` in kdo je prevzel otroka ter za vsak obisk sproži webhook `attendance.checkout`.

Dovoljenja: kiosk se overi z `attendance.checkin`, ki dodeli točno površino prijave/odjave/predlog oznak, plus iskanja gospodinjstva, ki jih kiosk potrebuje brez `people.view` (iskanje po telefonu/imenu, člani gospodinjstva v modelu prijave in seznam prevzemnih oseb gospodinjstva). `SessionHelper.filterChurches` v B1Checkin ponudi samo cerkve, kjer ima račun `Attendance/Checkin` ali `Attendance/Edit`. `Checkin` ni več del dovoljenj skupine Everyone (null-role) (`RoleHelper` in migracija `2026-11-01_remove_everyone_checkin`), zato ga je treba dodeliti prek prave vloge; `attendance.view`/`attendance.edit` pokrivata poročila in ročni vnos; struktura (bogoslužja, časi bogoslužij, dodelitve skupin) zahteva `services.edit`. Samoprijava člana (B1App) ne potrebuje nobenega dovoljenja: vsak prijavljen uporabnik s povezano osebo v cerkvi lahko kliče `GET`/`POST /attendance/visits/checkin`, strežnik pa omeji poslane `personId` na lastno gospodinjstvo klicatelja (sicer 403) – ta ograda preprečuje, da bi tuje družine lahko brale njihove `securityCode`. Članstvo je dovoljenje; ali člani *vidijo* funkcijo, nadzoruje zavihek v navigaciji B1App, ki ga nastavi cerkev. Ostale končne točke prijave (`code/:code`, `checkout`, `guardians`, `CheckinController`) ostanejo namenjene samo kiosku/osebju.

## Skupine usmerjajo razporeditev v sobe

V sistemu ni nikjer entitete sobe ali učilnice. »Soba« je članska **skupina** z omogočenim `trackAttendance`, povezana z enim ali več časi bogoslužij prek `groupServiceTimes`. Polja skupine (v `Api/src/modules/membership/models/Group.ts`), ki oblikujejo obnašanje kioska:

| Polje | Učinek |
|------|--------|
| `trackAttendance` | Skupina sploh sodeluje pri udeležbi; drevo nastavitve v B1Admin označi skupine `trackAttendance` brez vrstice `groupServiceTimes` kot nedodeljene |
| `parentPickup` | Označuje otroško sobo: prijava vanjo naredi obisk »otroški«, natisne družinsko oznako za prevzem in postavi varnostno kodo na oznako z imenom |
| `printNametag` | Ali prijave v to skupino sploh natisnejo oznako z imenom |
| `capacity` / `guestCapacity` / `checkinClosed` | Omejitve zmogljivosti sobe in trdo stikalo »zaprto«, ki ga uveljavi strežniška omejitev prijave (ureja se v B1Admin v nastavitvah skupine pod »Zmogljivost prijave«) |
| `volunteerRatio` / `minVolunteers` | Razmerje otrok na prostovoljca in najmanjše število prostovoljcev, uveljavljeno po nastavitvi `ratioEnforcement` za celotno cerkev |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Meje starosti/razreda za upravičenost, ki jih kiosk oceni in po katerih označi ali zatemni sobe |

Vsak odjemalec denormalizira enako (npr. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): vzporedno naloži `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` in `GET /membership/groups`, nato za vsak čas bogoslužja zbere skupine, katerih vrstica `groupServiceTimes` kaže nanj, v `serviceTime.groups`. To polje je tisto, kar prikaže izbirnik sob, razvrščeno po `categoryName` skupine.

Dodelitve se urejajo na strani skupine v B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` – `POST`/`DELETE /attendance/groupservicetimes`), celotno drevo Kampus → Bogoslužje → Čas bogoslužja → Skupina pa je prikazano v `B1Admin/src/attendance/components/AttendanceSetup.tsx` prek `GET /attendance/attendancerecords/tree`.

:::info
Ker so skupine edini vir resnice, ista članstva v skupinah poganjajo usmerjanje na kiosku, seznam udeležbe po tipu imenika na straneh skupin v B1Admin in poročanje o udeležbi – dodelitev skupine času bogoslužja je edini korak, potreben, da postane cilj prijave.
:::

## Varnost otrok

### Vrste prijav

Vsak obisk nosi `checkinType` – `member`, `guest` ali `volunteer` (NULL pomeni staro/člansko; migracija `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Vrsto izbere **kiosk**: čipi Član / Gost / Prostovoljec na razširjeni vrstici člana (`B1Checkin/src/components/MemberServiceTimes.tsx`), ob zaključku pa se vtisnejo na vsak čakajoči obisk (`app/checkinComplete.tsx`, privzeto `member`). Strežnik jo upošteva v omejitvi – prostovoljci štejejo k pokritosti razmerja namesto proti zmogljivosti, gostje pa štejejo proti `guestCapacity`.

### Omejitve zmogljivosti in razmerja prostovoljcev

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) se izvede znotraj `postCheckin` pred vsakim shranjevanjem (končna točka ni transakcijska, zato je pravilnost zagotovljena z omejitvijo pred shranjevanjem). Za vsako ciljno skupino naloži trenutno zasedenost (`VisitRepo.countActiveByGroupToday`) in konfiguracijo skupine prek prehoda modula članstva, nato kršitve razvrsti:

- **Trdo (vedno blokira):** `checkinClosed`, `current + incoming > capacity`, število gostov nad `guestCapacity`. Paket se zavrne z `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` – kiosk prikaže imenovano sobo.
- **Razmerje (opozori ali blokira):** dohodni neprostovoljci v sobo, kjer je `volunteers < minVolunteers`, sploh ni prostovoljcev ali `children > volunteers × volunteerRatio`. Resnost sledi nastavitvi cerkve `ratioEnforcement` (`"warn"` privzeto / `"block"`, ureja se v B1Admin Upravljanje cerkve → Prijava, `CheckinSettingsEdit.tsx`). Način opozorila vrne `409 { warning: true, error: "ratio", … }`, razen če odjemalec ponovno pošlje z `acknowledgeWarnings=true` – ta ponovna oddaja je kioskova potrditev s strani osebja.

### Okna za prijavo po urniku

Čas bogoslužja lahko vsebuje izbiren tedenski urnik (`dayOfWeek` 0–6, kjer je 0 = nedelja, `startTime`/`endTime` kot `HH:mm`, `checkinOpenMinutes`, `checkinCloseMinutes`), ureja pa se v obrazcu časa bogoslužja v B1Admin pod **Udeležba → Nastavitev** (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, »Urnik prijave«). `CheckinGateHelper.hasSchedule()` obravnava čas bogoslužja kot urejen le, kadar sta nastavljena `dayOfWeek` in `startTime`; neurejeni časi nikoli niso časovno omejeni. `isServiceTimeOpen()` izračuna okno v lokalnem stenskem času (`DateHelper.toChurchTime`). Časovni pas se za vsak čas bogoslužja razreši prek `CheckinTimeZoneHelper.load()` (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`): najprej `timezone` kampusa storitve (`service.campusId`, prek `MembershipModuleGateway.loadCampusTimeZones`), nato `timeZone` cerkve (nastavljen v B1Admin pod Podatki o cerkvi), nato prvi neodstranjeni kampus, ki ima `timezone` (`loadCampusTimeZone`), in šele nato `America/New_York`. Kampus je prvi, ker je večina cerkva imela časovni pas `America/New_York` naknadno vpisan kot časovni pas cerkve. Tako seznam kot pot objave spodaj časovni pas razrešita enako. Okno teče od `checkinOpenMinutes` pred začetkom do `checkinCloseMinutes` po koncu (ali po začetku, če konca ni), ter obravnava okna, ki prečkajo polnoč ali mejo tedna.

Okno se uveljavi na dveh mestih:

- **Seznam:** `GET /attendance/servicetimes` vsaki vrstici doda izračunano logično vrednost `checkinOpen`. Samoprijava B1App (`CheckinPage.tsx`) in izbirnik storitev v B1Checkin (`app/services.tsx`) ohranita vsak čas. Ko so vsi časi neke storitve zaprti, prikažeta najbližji začetek (»Prijava se odpre ned 9:30.« v B1App, »Prijava za to storitev se odpre ned 9:30.« v B1Checkin, iz `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`), ob manjkajočem izračunu odpiranja pa »Prijava za to storitev trenutno ni odprta.« (kiosk ponuja gumb Nazaj za izbiro druge storitve). Sicer so zaprti časi prikazani kot neizbirna vrstica »Zaprto« / »Zaprto · odpre se ob 9:30«. Zaslon gospodinjstva v B1Checkin (`MemberServiceTimes.tsx`) odprtost živo ponovno oceni po uri naprave z `ServiceTimeHelper.isCheckinOpen()` (časovni pas naprave, ne cerkve), tako da kiosk, ki teče brez nadzora, odpira in zapira ob pravem času, na zaprtem času, ki ga oseba že ima, pa prikaže »Otroška soba 1 · Prijavljen« (ime skupine).
- **Objava:** znotraj `evaluateGates()`, pred oceno zmogljivosti/razmerja, `findClosedServiceTimeGroups()` zavrne paket z `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }`, če je čas bogoslužja katerega koli ciljnega srečanja zunaj svojega okna. Ker se obstoječi obiski gospodinjstva za danes ponovno objavijo ob vsaki prijavi, srečanja, ki jih oseba že ima (`personId|sessionId` v obstoječih obiskih), to omejitev preskočijo – tako dodajanje kasnejšega odprtega časa bogoslužja ni zavrnjeno, ker se je prejšnje okno že zaprlo. B1Checkin to prikaže na zaslonu trde omejitve z razlogom »prijava trenutno ni odprta« (kršitve zmogljivosti še vedno pišejo »soba je polna ali zaprta«).

### Upravičenost po starosti/razredu (na kiosku)

Upravičenost sob je pomožni uporabniški vmesnik, ocenjen na kiosku, ne pa uveljavljen na strežniku. `B1Checkin/src/helpers/EligibilityHelper.ts` primerja datum rojstva/razred osebe z `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` skupine (vrstni red razredov: PreK, K, 1–12, Graduated) in vrne `eligible` / `ineligible` / `unknown` – manjkajoči podatki dajo `unknown` in nikoli ne skrijejo sobe. Starosti in razredi se izračunajo na dan **napredovanja razreda** cerkve (nastavitev `gradePromotionDate`, `"MM-DD"`, ureja se v `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); kiosk jo pridobi iz `GET /attendance/checkin/settings`, `resolveAsOfDate` pa izbere najnovejše pojavitev na ta dan ali pred njim. Izbirnik sob označi upravičene sobe in zatemni neupravičene; če izberete zatemnjeno sobo, je potrebna potrditev osebja.

### Zaupanja vredni in nepooblaščeni prevzem

Osebe za prevzem so entiteta članstva, na gospodinjstvo: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` – householdId, izbirni personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). CRUD je `GET /membership/householdpickup/:householdId` (vsak prijavljen uporabnik cerkve, da lahko kiosk bere) ter `POST` / `DELETE`, omejena z `people.edit`. Osebje seznam upravlja na kartici **Prevzem** na strani osebe (`B1Admin/src/people/components/PickupPeople.tsx`) – fotografija, sorodstvo in oznaka stanja Zaupanja vreden/Nepooblaščen.

Pri odjavi (`B1Checkin/app/checkout.tsx`) kiosk naloži seznam prevzema gospodinjstva: vnosi `trusted` se prikažejo kot klikljive kartice za prevzem poleg mreže fotografij odraslih iz gospodinjstva, prosto vneseno ime »Drugo« pa se mehko primerja (Levenshtein, `src/helpers/PickupMatchHelper.ts`) z vnosi `notAuthorized` – ujemanje blokira odjavo z opozorilnim listom in gumbom osebja **Prezri**. Prezrtje se beleži na samem obisku: pošlje `checkedOutBy` kot `"OVERRIDE: {name}"` prek običajnega `POST /attendance/visits/checkout`, zato se zapiše v evidenco udeležbe in webhook `attendance.checkout`, ne pa v ločeno revizijsko tabelo.

### Obvesti starša in sporočilo za nujne primere

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) izpostavlja dve končni točki za SMS:

- `POST /page` – `{ visitId, message }`: pošlje sporočilo skrbnikom ene prijavljene otroke (zaslon odjave na kiosku, način z osebjem).
- `POST /broadcast` – `{ serviceId, message }`: pošlje SMS odraslim iz vseh prijavljenih gospodinjstev za eno storitev (nastavitve skrbnika na kiosku, za potrditvenim listom, ki zahteva vnos tipa `EMERGENCY`, v `B1Checkin/app/adminSettings.tsx`).

Obe končni točki najprej razrešita odrasle iz gospodinjstev prek prehoda članstva, nato dostavo predata **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) – medmodulni prehod do nastavljenega ponudnika SMS-sporočil cerkve (`@churchapps/texting`: TextInChurch, Clearstream ali MutualMinistry; vgrajenega pošiljatelja SMS ni). Prehod zabeleži vrstico `sentText` in po en vnos `deliveryLog` za vsakega prejemnika ter omeji paket na 500 prejemnikov; brez nastavljenega ponudnika vrne `no_provider`, kar kiosk prikaže kot »Ponudnik SMS ni nastavljen«. Krmilnikova `dispatch()` odstrani podvojene telefonske številke in preskoči osebe brez mobilne številke ali z nastavljenim `optedOut`, ter vrne `{ sent, failed, skippedOptedOut, skippedNoPhone }`, da kiosk lahko prikaže, kaj je bilo preskočeno.

## Kiosk (B1Checkin)

Zasloni so datoteke expo-router v `B1Checkin/app/`; stanje med zasloni živi v statičnem razredu `CachedData` (`src/helpers/CachedData.ts`), ne v stanju React.

```
index (zagon/samodejna prijava) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
           naloži serviceTimes, groups,   │             │  └─────────┘ └▶ addGuest  └▶ tiskanje oznak,
           groupServiceTimes,             │             └▶ checkout (z osebjem)        samodejna vrnitev
           labelTemplates                 │                                            na lookup
```

1. **Iskanje** (`app/lookup.tsx`) – iskanje po telefonu (`GET /membership/people/search/phone?number=`, zadnje 4 ali celotna številka) ali po imenu (`GET /membership/people/search?term=`). Izbira zadetka naloži gospodinjstvo (`GET /membership/people/household/{householdId}`) in obstoječe obiske (`GET /attendance/visits/checkin`) ter napolni `pendingVisits` z izbirami prejšnjega tedna.
2. **Pregled gospodinjstva** (`app/household.tsx`, `src/components/MemberList.tsx`) – vsaka vrstica člana prikaže značko, da je že prijavljen, značko alergij/`nametagNotes` in trenutne čipe sob. Razširitev člana izpiše vsak čas bogoslužja z gumbom sobe ter čipi Član / Gost / Prostovoljec (`MemberServiceTimes.tsx`). Pod imenom vsakega časa bogoslužja `ServiceTimeHelper.getGroupSummary()` prikaže skupine, ki se tam ponujajo (imena iz `serviceTime.groups`, obrezana, brez podvajanj brez upoštevanja velikosti črk, zložena z vejico); če čas nima skupin, se ne prikaže nič.
3. **Dodelitev skupine** (`app/selectGroup.tsx`) – drevo kategorij, zgrajeno iz `serviceTime.groups`, z označenimi sobami, ki ustrezajo starosti/razredu, in zatemnjenimi neustreznimi za potrditev osebja (glej [Upravičenost po starosti/razredu](#upravicenost-po-starostirazredu-na-kiosku)); izbira sobe zapiše vnos `{ session: { serviceTimeId, groupId } }` visitSession v čakajoči obisk te osebe (`src/helpers/VisitSessionHelper.ts`). »Brez« ga počisti.
4. **Zaključek** (`app/checkinComplete.tsx`) – `POST /attendance/visits/checkin` s `pendingVisits` (vsak z `checkinType`), nato natisne oznake, če je nastavljen tiskalnik, in samodejno vrne na iskanje. Odgovor `409` za zmogljivost ali `notOpen` prikaže imenovano sobo z razlogom (polna/zaprta ali prijava ni odprta); opozorilo o razmerju ponudi potrditev osebja, ki ponovno pošlje z `acknowledgeWarnings=true`.

Zaslon **odjave** (`app/checkout.tsx`) sprejme 4-znakovno varnostno kodo prek samodejno fokusiranega vnosnega polja – tako skenerji črtnih kod s tipkovnico USB/Bluetooth delujejo brez kamere – ali na zaslonski tipkovnici z isto abecedo, ki samodejno odda pri 4 znakih. Gumb **Skeniraj** odpre list s skupno kamero `src/components/CodeScanner.tsx` (privzeto zadnja kamera, sprejema QR, Code 128 in Code 39), tako da postaje brez skenerja s tipkovnico lahko preberejo oznako za prevzem; skenirana koda gre skozi isto pot `handleCode()` kot tipkana vnos. Zaslon poišče kodo, prikaže otroke, ki se prevzemajo, in ponudi **zaupanja vredne osebe za prevzem** gospodinjstva kot klikljive kartice poleg mreže fotografij odraslih iz gospodinjstva (ter možnost »Drugo« za prosto vnesen tekst, ki se mehko preverja proti imenom nepooblaščenih – glej [Zaupanja vredni in nepooblaščeni prevzem](#zaupanja-vredni-in-nepooblascen-prevzem)), nato pošlje `POST /attendance/visits/checkout` z imenom/ID izbranega prevzemnika. V načinu z osebjem zaslon ponudi tudi **Obvesti starša** (`POST /attendance/checkin/page`) in **ponovni tisk varnostne oznake** – `reprint()` ponovno sestavi oznake družine z `LabelHelper.getAllLabelsFor(...)` in jih pošlje skozi isti cevovod `PrintUI` kot pri prijavi.

Značaj postaje je zastavica AsyncStorage `@StationMode` (`"self"` | `"manned"`, preklaplja se v `app/adminSettings.tsx`). Način z osebjem doda vstopno točko odjave na zaslon iskanja in urejanje profila posameznega člana (`POST /membership/people`) na zaslonu gospodinjstva. Zaščita kioska je vgrajena: neobvezna PIN koda (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) ščiti skrbniški zaslon in zaslon tiskalnika, skrbniški zaslon se odpre samo s 7 hitrimi dotiki logotipa v glavi, neaktivni zaslon za privlačnost (`src/hooks/useInactivityTimer.ts`) pa prevzame med družinami.

## Samoprijava (B1App)

Člani se prijavijo na portalu b1.church na zaslonu `/mobile/checkin` (usmerja ga `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` na `screens/CheckinPage.tsx`). Potrebna je prijava uporabnika in gre skozi enake štiri korake kot kiosk – storitve → gospodinjstvo → skupine → zaključek – prek enakih končnih točk, stanje pa se hrani v `B1App/src/helpers/CheckinHelper.ts`. Razlike v primerjavi s kioskom: gospodinjstvo pride iz lastnega `householdId` prijavljenega uporabnika (brez koraka iskanja), tiskanja oznak ni – namesto tega zaslon z zaključkom prikaže varnostno kodo paketa kot QR (`qrcode.react`) z namigom »pokažite to na postaji za prijavo«. Če je gospodinjstvo že prijavljeno, ko se stran naloži, gumb »Pokaži kodo za prijavo« ponovno prikaže QR iz prvega obstoječega obiska (iz `GET /attendance/visits/checkin`), ki nosi `securityCode`. Prijava se zabeleži takoj ob oddaji (ni vmesnega stanja); QR služi samo za tiskanje oznak na kiosku.

**Tiskanje oznak z mobilnika na kiosk** (`B1Checkin/app/scan.tsx`, do katerega pride gumb »Skeniraj kodo« pod QR na zaslonu iskanja): kiosk prikaže `CodeScanner` (`expo-camera` `CameraView`, privzeto sprednja kamera, z možnostjo preklopa), ki išče QR kode. `ScanCodeHelper.parse()` sprejme podatek samo, če je goli 4-znakovna koda v abecedi varnostnih kod, `ScanCodeHelper.isRepeat()` pa 4 sekunde ignorira isto kodo, zato delujeta tako QR iz B1App kot QR blok natisnjene oznake. Zaslon nato sledi poti ponovnega tiska ob odjavi – `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` – in se vrne na iskanje. Pri skeniranju ne pride do pisanja v evidenco udeležbe; gre samo za oznake. Kode brez aktivnih obiskov, postaje brez tiskalnika in skupine brez oznak vsaka prikažejo kratko sporočilo in vrnejo na iskanje.

Tipi ter `ApiHelper`/`ArrayHelper` prihajajo iz `@churchapps/helpers` in `@churchapps/apphelper`; nobenih React komponent ni deljenih z B1Admin.

## Udeležba na strani skrbnika (B1Admin)

- **Nastavitev** – `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) prikaže drevo strukture ter ustvarja storitve (`ServiceEdit.tsx`) in čase bogoslužij (`ServiceTimeEdit.tsx`). Podatki o kampusih prihajajo iz članstva prek kljuka `useCampuses()`.
- **Ročna udeležba** je na strani Skupine, ne v razdelku udeležbe: `B1Admin/src/groups/components/GroupSessionsTab.tsx` ustvarja srečanja (`POST /attendance/sessions`; pri dodajanju lahko `SessionEdit.tsx` vključi po eno srečanje za vsako drugo skupino, ki deli izbrani čas bogoslužja, preskoči pa skupine, ki imajo na ta datum že srečanje) in označuje osebe kot prisotne prek `POST /attendance/visitsessions/log`, ki poišče ali ustvari obisk za to osebo in srečanje. Vodje skupin lahko beležijo udeležbo za svoje skupine brez dovoljenja `attendance.edit` – krmilniki preverjajo `au.leaderGroupIds`.
- **Poročanje** – poročilo o trendu udeležbe in udeležba skupin sta poročili, ki ju določa strežnik (`B1Admin/src/components/reporting/ReportWithFilter.tsx` proti ReportingApi; definicije v `Api/reports/*.json`). Oba sprejemata `startDate`/`endDate` (končni datum vključno); poročilo o trendu privzeto obsega od pred enega leta do danes in doda stolpec `sessionDates` po tednih, drevo udeležbe skupine na zaslonu pa vključuje `checkinTime` vsakega obiska in `membershipStatus` osebe. CSV za udeležbo skupin prihaja iz pomožnega poročila `groupAttendanceDownload`, ki ga `GroupAttendanceDownloadHelper` preoblikuje v eno vrstico na člana skupine s stolpcem prisoten/odsoten za vsako datirano srečanje; zgodovina posamezne osebe je `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Tiskanje oznak

### Predloge in oblikovalnik

Cerkve oblikujejo lastne oznake v B1Admin na `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, do katerega pridemo s strani nastavitev prijave). Predloga je vrstica `labelTemplates`, katere `content` je polje blokov JSON – `text`, `field`, `barcode`, `qrcode` ali `box` – vsak postavljen v odstotnih koordinatah s pisavo, poravnavo, simboliko (`code39`/`code128`/`qr`) in izbirnimi pogoji prikaza (npr. polje alergij prikaži samo, če `person.nametagNotes` ni prazen). Obstajata dve vrsti `labelType`: `nametag` (ena na prijavljeno osebo; polja kot `person.displayName`, `sessions`, `securityCode` in `person.isBirthdayWeek` – `"true"`, kadar je mesec/dan rojstva v 3 dneh od danes, tudi čez konec leta, izračuna `LabelHelper.isBirthdayWithin()`) in `pickup` (ena na družino; polja kot `children`, `childrenAllergies`). Strežnik uveljavi največ eno privzeto predlogo na vrsto za cerkev (`LabelTemplateController.save`). Oblikovalnik ponuja začetne predloge, ki zrcalijo vgrajene oznake kioska, in predogled na vzorčnih podatkih.

### Upodabljanje in tiskanje na kiosku

Ob zaključku prijave `B1Checkin/src/helpers/LabelHelper.ts` odloči, kaj natisniti, glede na zastavice skupine pri vsakem čakajočem obisku: oznake z imenom za skupine `printNametag` ter eno družinsko oznako za prevzem, če je kateri obisk zadel skupino `parentPickup`. Obiske s `checkinType` `volunteer` preskoči `LabelHelper.selectChildVisits()`, zato vzgojitelj v sobi Prevzem staršev nikoli ne sproži oznake za prevzem. Varnostna koda iz odgovora prijave gre na oznake otrok in oznako za prevzem; oznake odraslih se natisnejo brez kode. Če ima cerkev predloge, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) pretvori bloke + kontekst polj v samostojen HTML dokument; sicer se uporabijo vgrajene HTML oznake v `B1Checkin/assets/labels/` z nadomeščanjem označb.

Črtne kode se ustvarijo kot vgrajen SVG s čistimi TypeScript kodirniki v `B1Checkin/src/helpers/barcode.ts` – vzorčne tabele Code 39 in tabele širin Code 128 (nabor B z mod-103 kontrolno vsoto), QR pa prek paketa `qrcode`. **Ti kodirniki so namenoma podvojeni v B1Admin** (`LabelEditor.tsx` vključuje iste tabele, kar je omenjeno v komentarju kode), da so predogledi oblikovalnika piksel za pikslom enaki izpisu kioska; sprememba enega se mora prenesti v drugega.

Cevovod tiskanja (`src/components/PrintUI.tsx`) upodobi vsako HTML oznako v `WebView`, jo z `react-native-view-shot` zajame v JPG ter predsa URI-je slik nativnemu Expo modulu **printer-helper** (`B1Checkin/modules/printer-helper/`). Modul izpostavlja `scan()`, `checkInit()`, `printUris()` in dogodke stanja, z ponudnikom za vsako blagovno znamko na obeh platformah:

| Blagovna znamka | Android | iOS | Opombe |
|-----------------|---------|-----|--------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Omrežni tiskalniki serije QL (QL-800/810W/820NWB/1100/1110NWB…), izrezane oznake 29×90, priporočen privzeti |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Odkrivanje v omrežju + tiskanje slik prek TCP/ZPL |

Izbira tiskalnika je na `app/printers.tsx` (skeniranje omrežja vrne vnose `brand~model~ip`; izbira se shrani v AsyncStorage), `src/helpers/PrinterLog.ts` pa hrani dnevnik diagnostike na napravi, prikazan prek žive statusne pike v glavi kioska.

## Registracija gostov

Dve poti ustvarita osebo med prijavo:

- **Na kiosku** – gumb »Dodaj gosta« na zaslonu gospodinjstva odpre `B1Checkin/app/addGuest.tsx`, ki najprej išče `GET /membership/people/search?term=` obstoječega ujemanja med ne-člani, sicer pa ustvari novo z `POST /membership/people`, pripeto na trenutno gospodinjstvo. Gost nato teče skozi dodelitev skupine kot vsak član.
- **Samopostrežna prijava prek QR** – ko je nastavitev cerkve `enableQRGuestRegistration` vklopljena (nastavi se v nastavitvah prijave B1Admin, prebrana iz `GET /membership/settings/public/{churchId}`), zaslon iskanja na kiosku prikaže QR kodo, ki vodi na `https://{subdomain}.b1.church/guest-register?serviceId=`. Ta stran B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) omogoča, da se obiskujoča družina registrira sama na svojem telefonu prek anonimne končne točke `POST /membership/people/guest-register`, s čimer kioskska vrsta teče naprej. List z QR ima tudi gumb **Registriraj tukaj**, ki odpre isto stran na kiosku (`app/guestRegister.tsx`) v `WebView` brez predpomnjenja v način brez beleženja (incognito); `src/helpers/GuestRegisterHelper.ts` ustvari URL za QR in WebView ter blokira navigacijo zunaj `https://{subdomain}.b1.church/guest-register`. Zaslon se vrne na iskanje ob **Končano**, nazaj ali po 120 sekundah neaktivnosti (vnašanje v obrazec se iz WebView posreduje kot aktivnost), pri čemer se WebView odstrani, da vnosi ene družine nikoli ne pridejo do naslednje.

Prijava QR se upravlja z nastavitvami cerkve, shranjenimi na kartici **QR registracija gostov** v B1Admin (`src/mobile/CheckInPage.tsx`):

| Nastavitev | Vidnost | Namen |
|---|---|---|
| `enableQRGuestRegistration` | javno | Vklop/izklop QR na kiosku in anonimnih končnih točk |
| `guestRegistrationFields` | javno | JSON preslikava `email`, `phone`, `address`, `birthDate`, `gender`, `maritalStatus`, `grade`, `comments` → `"off"` / `"optional"` / `"required"`. Privzeto: e-pošta in telefon neobvezna, ostalo izključeno. Ime in priimek sta vedno obvezna |
| `guestRegistrationImage` | javno | URL glave s fotografijo; B1App jo prikaže v razmerju 16:9 namesto ikone na obrazcu in potrditvenem zaslonu |
| `guestRegistrationGroupId` | zasebno | Skupina, v katero se doda vsaka prijava (gostje je nikoli ne vidijo ali izberejo) |
| `guestRegistrationRecordAttendance` | zasebno | `"true"`, da se za to skupino zabeleži tudi udeležba |

`src/components/checkin/GuestRegister.tsx` v B1App pridobi seznam možnosti iz anonimne `GET /membership/people/guest-register/options?churchId=` in prikaže samo vključena polja (e-pošta, telefon, zakonski stan in naslov pri glavnem stiku; datum rojstva, spol in razred pri vsakem članu; eno polje za komentarje), pošlje pa samo te. Strežnik ponovno uveljavi seznam v `GuestRegistrationHelper.sanitize()` – izključena polja se zavržejo, manjkajoče obvezne ali vrednosti zunaj seznama pomenijo 400 – preden se zažene `PersonHelper.registerGuestHousehold()`. Najprej za vsakega člana z e-pošto ali telefonom pokliče `PersonRepo.findGuestMatch()`: natanko ena živa oseba z istim imenom in enako e-pošto ali telefonsko številko se ponovno uporabi (nič ali več zadetkov ustvari novo osebo, zato nikoli ne ugiba). Član brez stikov se ujema po imenu znotraj ujemajočega se gospodinjstva. Ponovno uporabljenih oseb nikoli ne urejamo, zato anonimni obrazec ne more prepisati shranjenih podatkov, odgovor pa ponovi poslana imena. Neujemajoči se člani se pridružijo ujemajočemu se ali novemu gospodinjstvu kot `membershipStatus: "Visitor"`, za vsako novo osebo pa se sproži `person.created`. Nato se napake beležijo, namesto da bi se vrnile: člani se dodajo v nastavljeno skupino (`group.member.added`); če je beleženje udeležbe vklopljeno, `AttendanceModuleGateway.recordAttendance()` označi vsakega člana za prisotnega pri vsakem času bogoslužja skupine, ki ima urnik in čigar okno za prijavo (`CheckinGateHelper.isServiceTimeOpen`) je trenutno odprto, pri čemer po potrebi ustvari srečanje za današnji datum po lokalnem času cerkve – neurejeni časi bogoslužij in prijave zunaj okna ne zabeležijo ničesar; komentarji pa postanejo skrit pogovor o opombah osebe pri glavi gospodinjstva (avtor sporočila »Prijava gosta«), povezan prek `person.conversationId`.

## Sorodne strani

- [Končne točke udeležbe](../api/endpoints/attendance) -- Celoten REST vmesnik za kampuse, storitve, srečanja, obiske in obiske srečanj
- [Končne točke članstva](../api/endpoints/membership) -- Osebe, gospodinjstva in skupine
- [Webhooki](../api/webhooks) -- Dogodki `session.created`, `attendance.recorded` in `attendance.checkout`
- [Struktura modula](../api/module-structure) -- Kako je modul udeležbe organiziran na strežniški strani
