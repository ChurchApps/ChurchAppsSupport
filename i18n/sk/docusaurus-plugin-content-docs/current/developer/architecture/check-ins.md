---
title: "Prijímanie návštevníkov"
description: "Ako funguje prihlasovanie naprieč B1Checkin, B1App a B1 Admin: dátový model účasti, skupiny ako miestnosti, limity kapacity a pravidlá bezpečného vyzdvihnutia detí."
---

# Prijímanie návštevníkov

<div class="article-intro">

Prijímanie návštevníkov je jeden systém s tromi vstupmi: kioskovou aplikáciou B1Checkin pre obsluhované a samoobslužné stanice, samoobslužným prijímaním v členskom portáli B1App a správou účasti v B1Admin. Všetky tri zapisujú do rovnakého modulu účasti v jadre Api a smerovanie do učební je úplne riadené skupinami — neexistuje žiadna samostatná entita „miestnosti" ani „lokality". Nad tým beží vrstva ochrany detí: typy prijatia pre jednotlivé návštevy, serverové kontroly kapacity a pomeru dobrovoľníkov, kontrola veku a ročníka na kiosku, overovanie dôveryhodných osôb pri vyzdvihnutí a upozornenie rodičov cez poskytovateľa SMS služby cirkvi. Táto stránka mapuje dátový model, postupy prijímania, vrstvu ochrany a tlač štítkov.

</div>

## Prehľad

```
┌──────────────────────────┐
│ B1Checkin (Expo kiosk)   │──┐         ┌──────────────────────────────────────────────┐
│  vyhľadanie → domácnosť →│  │         │ Api                                          │
│  skupiny → dokončenie/   │  │  HTTPS  │  ┌─ modul členstva ────────────────────────┐ │
│  tlač                    │  ├───────▶ │  │ osoby · domácnosti · skupiny           │ │
├──────────────────────────┤  │         │  └─────────────────────────────────────────┘ │
│ B1App (samoprijatie)     │──┤         │  ┌─ modul účasti ──────────────────────────┐ │
│  obrazovka /mobile/checkin│ │         │  │ campuses → services → serviceTimes      │ │
├──────────────────────────┤  │         │  │ groupServiceTimes  (smerovanie do učební)│ │
│ B1Admin (zamestnanci)    │──┘         │  │ sessions ← visitSessions → visits       │ │
│  nastavenie · prehľady · │            │  │ labelTemplates                          │ │
│  návrhár štítkov         │            │  └─────────────────────────────────────────┘ │
└──────────────────────────┘            └──────────────────────────────────────────────┘

Cesta tlače štítkov (iba kiosk):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (šablony štítkov alebo zabudovaný HTML záložný variant)
       └▶ LabelRenderer → HTML dokument + vložené SVG čiarové kódy
            └▶ PrintUI: vykreslenie vo WebView → zachytenie JPG cez ViewShot
                 └▶ natívny modul printer-helper → Brother QL / Zebra
```

| Povrch | Repozitár | Technológie | Úloha |
|--------|-----------|-------------|-------|
| Kiosk | `B1Checkin` | Expo / React Native, smerovanie súborov cez expo-router; zostavenia EAS pre Android, Amazon Fire a iOS; aktualizácie OTA cez `expo-updates` | Obsluhovaná alebo samoobslužná stanica s tlačou štítkov a overeným odhlásením |
| Samoprijatie | `B1App` | Next.js (členský portál b1.church) | Prihlásení členovia prijímajú svoju domácnosť z telefónu; bez tlače |
| Správa | `B1Admin` | React SPA | Nastavuje štruktúru bohoslužieb, priraďuje skupiny k časom bohoslužieb, navrhuje štítky, zapisuje ručnú účasť a spúšťa prehľady |

Všetky tri volajú tie isté dva moduly API cez `ApiHelper`: **MembershipApi** (`/membership`) pre osoby, domácnosti a skupiny; **AttendanceApi** (`/attendance`) pre všetko nižšie.

## Dátový model (`Api/src/modules/attendance`)

| Entita / tabuľka | Kľúčové polia | Význam |
|------------------|---------------|--------|
| `campuses` | name, address | Zastarané — lokality sa spravujú v module členstva (`/membership/campuses`); kópia v účasti je zmrazená iba na čítanie pre staršie čitatele (`models/Campus.ts`) |
| `services` | campusId, name | Opakujúce sa stretnutie, napr. „Nedeľné ráno" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Časový úsek v rámci bohoslužby, napr. „9:00" (`models/ServiceTime.ts`). Stĺpce plánu sú voliteľné (migrácia `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) a riadia [okno prijímania](#planovane-okna-prijimania) |
| `groupServiceTimes` | groupId, serviceTimeId | Spojovacia tabuľka: ktoré skupiny (učebne) sa stretávajú v ktorých časoch bohoslužieb (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Jedno stretnutie jednej skupiny v jeden dátum — vytvára sa lenivo v čase prijatia (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Jedna osoba navštevujúca bohoslužbu v jeden dátum (`models/Visit.ts`). `checkinType` je `member` / `guest` / `volunteer` (NULL = starší člen), nastavuje ho kiosk a spotrebúvajú ho brány kapacity/pomeru |
| `visitSessions` | visitId, sessionId | Ktoré relácie návšteva pokrýva — dieťa prijaté do dvoch časov bohoslužieb dostane dva riadky (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (bloky JSON) | Navrhnuté rozloženia štítkov (`models/LabelTemplate.ts`) |

### Ako sa uložené dokončené prijatie

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) spracúva `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Telo je pole objektov `Visit`, z ktorých každý nesie `visitSessions`, pričom vnorená `session` určuje iba dvojicu `(serviceTimeId, groupId)`. Server potom:

1. **Kontroluje kapacitu a pomery pred akýmkoľvek zápisom.** `evaluateGates()` → `CheckinGateHelper.evaluate()` overí kapacitu každej cieľovej miestnosti, kapacitu hostí, príznak uzavretia a pomer dobrovoľníkov voči aktuálnej obsadenosti. postCheckin **nie je transakčný**, preto musí brána bežať pred prvým uložením — pri tvrdom porušení sa vráti 409 s menom dotknutej miestnosti (alebo miestností) a nič sa neuloží. Pozri [Brány kapacity a pomeru dobrovoľníkov](#brany-kapacity-a-pomeru-dobrovolnikov).
2. **Lenivo rieši relácie.** `getSessionId()` nájde alebo vytvorí riadok `sessions` pre `(groupId, serviceTimeId, dnes)` — ID relácií sa ukladajú do pamäte procesu podľa dátumu. Nové relácie vysielajú webhook `session.created`. Slučka je čakajúci `for..of` — skorší `forEach(async …)` bez čakania pretekal s uložením a pri vytváraní prvej relácie zapisoval NULL sessionIds (opravené; poznámka v kóde pri slučke).
3. **Nahrádza záznamy dňa.** Existujúce návštevy týchto osôb na túto bohoslužbu dnes sa zmažú spolu s ich visitSessions, potom sa uloží odoslaná sada. Opätovné prijatie rodiny je preto idempotentná operácia „toto je aktuálny stav", nie pripájanie. Ak sa namiesto toho pošle `?checkDuplicates=true`, vráti sa `{ duplicates: [personId…] }` bez zápisu — takto kiosk upozorní pred prepísaním.
4. **Vygeneruje jeden bezpečnostný kód na dávku.** `SecurityCodeHelper.generate()` vytvorí 4-znakový kód z abecedy `23456789BCDFGHJKLMNPQRSTVWXYZ` (žiadne samohlásky ani zamieňané znaky, takže kódy nemôžu tvoriť slová ani sa čítať nesprávne). Server pri kolízii opakuje generovanie voči otvoreným návštevám rovnakého kostola z toho istého dňa a kód pridelí každej návšteve v dávke.
5. **Vracia `{ streaks, securityCode }`.** `streaks` mapuje personId na počet po sebe idúcich týždňov účasti; kiosk oslavuje míľniky (každý 5. týždeň) konfetami.

Každá uložená návšteva tiež vysiela webhook `attendance.recorded`. Čítacia strana, `GET /attendance/visits/checkin`, vracia návštevy osôb z ich **naposledy zaznamenaného dátumu** — ak išlo o predchádzajúci týždeň, ID sa odstránia, takže klient dostane predvyplnú kópiu výberov miestností z minulého týždňa, ktorá sa uloží ako nové záznamy.

### Odhlásenie

Dva koncové body uzatvárajú cyklus (`VisitController`):

- `GET /attendance/visits/code/:code` — dnešné ešte neodhlásené návštevy s daným bezpečnostným kódom, s naplnenými reláciami.
- `POST /attendance/visits/checkout` — telo `{ visitIds, checkedOutBy?, checkedOutById? }`; nastaví `checkoutTime` a kto dieťa vyzdvihol, a pre každú návštevu vyšle webhook `attendance.checkout`.

Oprávnenia: kiosky sa overujú právom `attendance.checkin`, ktoré udeľuje presne povrch prijatia/odhlásenia/šablón štítkov, plus vyhľadávanie domácností, ktoré kiosk potrebuje bez `people.view` (vyhľadávanie podľa telefónu/mena, členovia domácnosti v modeli prijatia a zoznam osôb oprávnených na vyzdvihnutie). `SessionHelper.filterChurches` v B1Checkin ponúka iba cirkvi, kde účet drží `Attendance/Checkin` alebo `Attendance/Edit`. `Checkin` už nie je súčasťou oprávnení Everyone (null-role) (`RoleHelper` a migrácia `2026-11-01_remove_everyone_checkin`), preto ho treba udeliť cez skutočnú rolu; `attendance.view`/`attendance.edit` pokrývajú prehľady a ručné zadávanie; štruktúra (bohoslužby, časy, priradenia skupín) vyžaduje `services.edit`. Samoprijatie členov (B1App) nevyžaduje žiadne oprávnenie: každý overený používateľ s prepojenou osobou v cirkvi smie volať `GET`/`POST /attendance/visits/checkin` a server obmedzí odoslané `personId` na domácnosť volajúceho (inak 403 — práve táto hranica bráni čítaniu `securityCode` iných rodín). Členstvo je oprávnenie; to, či členovia *vidia* funkciu, riadia navigačné karty B1App danej cirkvi. Ostatné koncové body prijatia (`code/:code`, `checkout`, `guardians`, `CheckinController`) zostávajú iba pre kiosky a zamestnancov.

## Skupiny riadia smerovanie do miestností

V systéme nikde neexistuje entita miestnosti ani učebne. „Miestnosť" je skupina členstva s zapnutým `trackAttendance`, prepojená s jedným alebo viacerými časmi bohoslužieb cez `groupServiceTimes`. Polia skupiny (v `Api/src/modules/membership/models/Group.ts`), ktoré formujú správanie kiosku:

| Pole | Účinok |
|------|--------|
| `trackAttendance` | Skupina sa vôbec zúčastňuje účasti; strom nastavenia v B1Admin označí skupiny `trackAttendance` bez riadku `groupServiceTimes` ako nepriradené |
| `parentPickup` | Označuje detskú miestnosť: prijatie do nej urobí návštevu „detskou", vytlačí rodinný štítok na vyzdvihnutie a umiestni bezpečnostný kód na menovku |
| `printNametag` | Či prijatia do tejto skupiny vôbec tlačia menovku |
| `capacity` / `guestCapacity` / `checkinClosed` | Limity kapacity miestnosti a tvrdý prepínač „uzavreté", vynucované na serveri bránou prijatia (upravuje sa v nastaveniach skupiny v B1Admin pod „Kapacita prijatia") |
| `volunteerRatio` / `minVolunteers` | Pomer detí na dobrovoľníka a minimálny počet dobrovoľníkov, vynucované podľa celocirkevného nastavenia `ratioEnforcement` |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Hranice veku/ročníka na strane kiosku, slúžia na zvýraznenie alebo stlmenie miestností |

Každý klient denormalizuje rovnakým spôsobom (napr. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): paralelne načíta `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` a `GET /membership/groups`, potom pre každý čas bohoslužby zozbiera skupiny, ktorých riadok `groupServiceTimes` na ňj ukazuje, do `serviceTime.groups`. Toto pole zobrazuje výber miestnosti, zoradený podľa `categoryName` skupiny.

Priradenia sa upravujú na stránke skupiny v B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`) a celý strom Lokalita → Bohoslužba → Čas bohoslužby → Skupina sa zobrazuje v `B1Admin/src/attendance/components/AttendanceSetup.tsx` cez `GET /attendance/attendancerecords/tree`.

:::info
Keďže skupiny sú jediným zdrojom pravdy, rovnaké členstvo v skupine poháňa smerovanie na kiosku, prehľad účasti v štýle súpisky na stránkach skupín v B1Admin aj reportovanie účasti — priradenie skupiny k času bohoslužby je jediný krok potrebný na to, aby sa stala cieľom prijatia.
:::

## Ochrana detí

### Typy prijatia

Každá návšteva nesie `checkinType` — `member`, `guest` alebo `volunteer` (NULL znamená starší/členský; migrácia `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Typ sa volí **na strane kiosku**: čipy Člen / Hosť / Dobrovoľník na rozbalenom riadku člena (`B1Checkin/src/components/MemberServiceTimes.tsx`) a pri dokončení sa pripíše ku každej čakajúcej návšteve (`app/checkinComplete.tsx`, predvolene `member`). Server ho spotrebúva v bráne — dobrovoľníci sa počítajú do pokrytia pomeru namiesto kapacity a hostia sa počítajú voči `guestCapacity`.

### Brány kapacity a pomeru dobrovoľníkov

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) beží v `postCheckin` pred každým uložením (koncový bod nie je transakčný, takže kontrola pred uložením je mechanizmus správnosti). Načíta aktuálnu obsadenosť pre každú cieľovú skupinu (`VisitRepo.countActiveByGroupToday`) a konfiguráciu skupiny cez bránu modulu členstva, potom porušenia klasifikuje:

- **Tvrdé (vždy blokujú):** `checkinClosed`, `current + incoming > capacity`, počet hostí nad `guestCapacity`. Dávka sa odmietne s `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` — kiosk zobrazí pomenovanú miestnosť.
- **Pomer (upozornenie alebo blokovanie):** prichádzajúci nededikovaní do miestnosti, kde `volunteers < minVolunteers`, žiadni dobrovoľníci vôbec alebo `children > volunteers × volunteerRatio`. Závažnosť sa riadi nastavením cirkvi `ratioEnforcement` (`"warn"` predvolene / `"block"`, upravuje sa v B1Admin Spravovať cirkev → Prijímanie, `CheckinSettingsEdit.tsx`). Režim upozornenia vráti `409 { warning: true, error: "ratio", … }`, pokiaľ klient neodošle znova s `acknowledgeWarnings=true` — toto opätovné odoslanie je prepísanie potvrdené zamestnancom na kiosku.

### Plánované okná prijímania

Čas bohoslužby môže mať voliteľný týždenný plán (`dayOfWeek` 0–6, kde 0 = nedeľa, `startTime`/`endTime` ako `HH:mm`, `checkinOpenMinutes`, `checkinCloseMinutes`), upravuje sa vo formulári času bohoslužby v B1Admin **Účasť → Nastavenie** (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, „Plán prijímania"). `CheckinGateHelper.hasSchedule()` považuje čas bohoslužby za naplánovaný iba vtedy, keď sú nastavené `dayOfWeek` aj `startTime`; nenaplánované časy nikdy nie sú časovo obmedzené. `isServiceTimeOpen()` vypočíta okno v miestnom čase na stene (`DateHelper.toChurchTime`). Časové pásmo sa pre každý čas bohoslužby určí cez `CheckinTimeZoneHelper.load()` (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`): ako prvé ide `timezone` lokality služby (`service.campusId`, cez `MembershipModuleGateway.loadCampusTimeZones`), potom `timeZone` cirkvi (nastavené v B1Admin v Informáciách o cirkvi), potom prvá neodstránená lokalita, ktorá má `timezone` (`loadCampusTimeZone`), a až nakoniec `America/New_York`. Lokalita má prednosť, lebo mnohé cirkvi mali pásmo `America/New_York` spätne doplnené ako pásmo cirkvi. Výpis aj zápis nižšie určujú pásmo rovnakým spôsobom. Okno sa spúšťa `checkinOpenMinutes` pred začiatkom a končí `checkinCloseMinutes` po konci (alebo po začiatku, ak koniec nie je), a zvláda okná presahujúce polnoc alebo hranicu týždňa.

Okno sa vynucuje na dvoch miestach:

- **Výpis:** `GET /attendance/servicetimes` označí každý riadok vypočítanou logickou hodnotou `checkinOpen`. Samoprijatie v B1App (`CheckinPage.tsx`) a výber služby v B1Checkin (`app/services.tsx`) ponechávajú každý čas. Keď sú všetky časy danej služby zatvorené, zobrazia najbližšie otvorenie („Prijímanie sa otvorí v nedeľu o 9:30." v B1App, „Prijímanie na túto službu sa otvorí v nedeľu o 9:30." v B1Checkin, z `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`), inak text „Prijímanie na túto službu momentálne nie je otvorené." vtedy, keď sa nedá vypočítať žiadne otvorenie (kiosk ponúka tlačidlo Späť na výber inej služby). Inak sa zatvorené časy zobrazia ako nevoliteľný riadok „Zatvorené" / „Zatvorené · otvorí sa o 9:30". Obrazovka domácnosti v B1Checkin (`MemberServiceTimes.tsx`) znovu vyhodnocuje otvorenosť naživo podľa hodín zariadenia cez `ServiceTimeHelper.isCheckinOpen()` (časové pásmo zariadenia, nie cirkvi), takže kiosk, ktorý beží bez dozoru, sa otvára a zatvára načas, a na zatvorenom čase, ktorý osoba už drží, zobrazí „Detská miestnosť 1 · Prijatý" (názov skupiny).
- **Zápis:** vnútri `evaluateGates()`, pred vyhodnotením kapacity/pomeru, `findClosedServiceTimeGroups()` odmietne dávku s `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }`, ak je čas bohoslužby ktoréhokoľvek cieľového sedenia mimo svojho okna. Keďže existujúce návštevy domácnosti na dnes sa pri každom prijatí znovu odosielajú, relácie, ktoré osoba už drží (`personId|sessionId` v existujúcich návštevách), túto bránu preskočia, takže pridanie neskoršieho otvoreného času bohoslužby nie je odmietnuté len preto, že predchádzajúce okno sa už zatvorilo. B1Checkin to zobrazí cez obrazovku tvrdej brány s dôvodom „prijímanie momentálne nie je otvorené" (porušenia kapacity stále znejú „miestnosť je plná alebo zatvorená").

### Kontrola veku/ročníka (na strane kiosku)

Oprávnenosť miestnosti je poradné používateľské rozhranie, vyhodnocuje sa na kiosku, nie je vynucovaná serverom. `B1Checkin/src/helpers/EligibilityHelper.ts` porovnáva dátum narodenia/ročník osoby s `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` skupiny (poradie ročníkov: PreK, K, 1–12, Graduated) a vracia `eligible` / `ineligible` / `unknown` — chýbajúce údaje dajú `unknown` a nikdy neskryjú miestnosť. Veky a ročníky sa počítajú k **dátumu postupu do vyššieho ročníka** cirkvi (nastavenie `gradePromotionDate`, `"MM-DD"`, upravuje sa v `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); kiosk ho načíta z `GET /attendance/checkin/settings` a `resolveAsOfDate` vyberie najnovší výskyt v deň dnešný alebo skôr. Výber miestnosti zvýrazňuje oprávnené miestnosti a stlmuje neoprávnené; výber stlmenej miestnosti vyžaduje potvrdenie zamestnanca.

### Dôveryhodné a neautorizované vyzdvihnutie

Osoby oprávnené na vyzdvihnutie sú entita členstva, pre každú domácnosť: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, voliteľné personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). Správa cez `GET /membership/householdpickup/:householdId` (ktorýkoľvek overený používateľ cirkvi, aby kiosky mohli čítať) plus `POST` / `DELETE` chránené oprávnením `people.edit`. Zamestnanci spravujú zoznam na karte **Vyzdvihnutie** na stránke osoby (`B1Admin/src/people/components/PickupPeople.tsx`) — fotografia, príbuzenský vzťah a čip stavu Dôveryhodný / Neautorizovaný.

Pri odhlásení (`B1Checkin/app/checkout.tsx`) kiosk načíta zoznam osôb oprávnených na vyzdvihnutie domácnosti: položky `trusted` sa zobrazia ako klepacie karty vyzdvihnutia vedľa mriežky fotografií dospelých z domácnosti a voľne zadané meno „Iný" sa porovnáva s položkami `notAuthorized` podľa podobnosti (Levenshtein, `src/helpers/PickupMatchHelper.ts`) — zhoda blokuje odhlásenie s výstražným listom a tlačidlom zamestnanca **Prepísať**. Prepísanie sa zaznamená priamo na návšteve: cez bežný `POST /attendance/visits/checkout` odošle `checkedOutBy` ako `"OVERRIDE: {name}"`, takže sa objaví v zázname účasti a vo webhooku `attendance.checkout`, a nie v samostatnej auditnej tabuľke.

### Vyvolanie rodiča a núdzové vysielanie

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) sprístupňuje dva koncové body SMS:

- `POST /page` — `{ visitId, message }`: vyvolá rodičov jedného prijatého dieťaťa (obrazovka odhlásenia na kiosku, režim s obsluhou).
- `POST /broadcast` — `{ serviceId, message }`: pošle SMS všetkým dospelým z každej prijatej domácnosti pre danú službu (nastavenia administrátora kiosku, za listom potvrdenia typu `EMERGENCY` v `B1Checkin/app/adminSettings.tsx`).

Oba určujú dospelých z domácností cez bránu členstva a potom doručenie odovzdajú **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — medzimodulová brána k nakonfigurovanému poskytovateľovi SMS služby cirkvi (`@churchapps/texting`: TextInChurch, Clearstream alebo MutualMinistry; vstavaný odosielateľ SMS neexistuje). Brána zapisuje riadok `sentText` plus záznamy `deliveryLog` pre každého príjemcu a obmedzuje dávku na 500 príjemcov; ak nie je nakonfigurovaný žiadny poskytovateľ, vráti `no_provider`, čo kiosk zobrazí ako „Nie je nakonfigurovaný poskytovateľ SMS". `dispatch()` kontrolora odstraňuje duplicitné telefónne čísla a preskakuje osoby bez mobilu alebo s nastaveným `optedOut`, pričom vracia `{ sent, failed, skippedOptedOut, skippedNoPhone }`, aby kiosk mohol ukázať, čo bolo preskočené.

## Kiosk (B1Checkin)

Obrazovky sú súbory expo-router v `B1Checkin/app/`; údaje medzi obrazovkami žijú v statickej triede `CachedData` (`src/helpers/CachedData.ts`), nie v stave React.

```
index (štart/automatické prihlásenie) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             načíta serviceTimes, groups, │             │  └─────────┘ └▶ addGuest  └▶ tlač štítkov,
             groupServiceTimes,           │             └▶ checkout (s obsluhou)       automatický návrat
             labelTemplates               │                                            na lookup
```

1. **Vyhľadanie** (`app/lookup.tsx`) — hľadanie podľa telefónu (`GET /membership/people/search/phone?number=`, posledné 4 alebo úplné) alebo podľa mena (`GET /membership/people/search?term=`). Výber zhody načíta domácnosť (`GET /membership/people/household/{householdId}`) a existujúce návštevy (`GET /attendance/visits/checkin`), čím naplní `pendingVisits` výbermi z minulého týždňa.
2. **Kontrola domácnosti** (`app/household.tsx`, `src/components/MemberList.tsx`) — každý riadok člena zobrazuje odznak už prijatého, odznak alergie/`nametagNotes` a aktuálne čipy miestností. Rozbalenie člena vypíše každý čas bohoslužby s tlačidlom miestnosti a čipmi typu prijatia Člen / Hosť / Dobrovoľník (`MemberServiceTimes.tsx`). Pod názvom každého času bohoslužby `ServiceTimeHelper.getGroupSummary()` zobrazí skupiny ponúkané v tomto čase (názvy `serviceTime.groups`, orezané, bez duplicít bez ohľadu na veľkosť písmen, oddelené čiarkou); ak čas nemá žiadne skupiny, nič sa nezobrazí.
3. **Priradenie skupiny** (`app/selectGroup.tsx`) — strom kategórií zostavený z `serviceTime.groups`, miestnosti oprávnené podľa veku/ročníka sú zvýraznené a neoprávnené stlmené za potvrdením zamestnanca (pozri [Kontrola veku/ročníka](#kontrola-veku-rocnika-na-strane-kiosku)); výber miestnosti zapíše `{ session: { serviceTimeId, groupId } }` visitSession do čakajúcej návštevy danej osoby (`src/helpers/VisitSessionHelper.ts`). „Žiadna" to zruší.
4. **Dokončenie** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` s `pendingVisits` (každá s pripísaným `checkinType`), potom tlač štítkov, ak je nastavená tlačiareň, a automatický návrat na lookup. Odpoveď `409` pre kapacitu alebo `notOpen` zobrazí pomenovanú miestnosť s dôvodom (plná/zatvorená alebo prijímanie nie je otvorené); upozornenie na pomer ponúkne potvrdenie zamestnanca, ktoré odošle znova s `acknowledgeWarnings=true`.

Obrazovka **odhlásenia** (`app/checkout.tsx`) prijíma 4-znakový bezpečnostný kód cez automaticky zameraný vstup — takže čítačky čiarových kódov typu klávesnice cez USB/Bluetooth fungujú bez kamery — alebo klávesnicu na obrazovke s rovnakou abecedou, ktorá sa automaticky odošle pri 4 znakoch. Tlačidlo **Skenovať** otvorí list so zdieľanou kamerou `src/components/CodeScanner.tsx` (štandardne zadnou, prijíma QR, Code 128 a Code 39), aby stanice bez čítačky mohli prečítať štítok na vyzdvihnutie; naskenovaný kód ide cez rovnakú cestu `handleCode()` ako zadaný text. Vyhľadá kód, zobrazí deti, ktoré sa vyzdvihujú, a predloží **dôveryhodné osoby na vyzdvihnutie** domácnosti ako klepacie karty vedľa mriežky fotografií dospelých z domácnosti (plus možnosť voľného textu „Iný", ktorá sa podobnostne kontroluje voči menám neautorizovaných — pozri [Dôveryhodné a neautorizované vyzdvihnutie](#dovery-hodne-a-neautorizovane-vyzdvihnutie)), potom odošle `POST /attendance/visits/checkout` s menom/ID vybranej osoby. V režime s obsluhou obrazovka ponúka aj **Vyvolať rodiča** (`POST /attendance/checkin/page`) a **opätovnú tlač bezpečnostného štítka** — `reprint()` znovu zostaví štítky rodiny pomocou `LabelHelper.getAllLabelsFor(...)` a pošle ich cez rovnaký kanál `PrintUI` ako pri prijatí.

Charakter stanice je príznak AsyncStorage `@StationMode` (`"self"` | `"manned"`, prepína sa v `app/adminSettings.tsx`). Režim s obsluhou pridáva na obrazovke vyhľadávania vstupný bod odhlásenia a úpravu profilu jednotlivých členov (`POST /membership/people`) z obrazovky domácnosti. Zabezpečenie kiosku je zabudované: voliteľný PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) chráni obrazovky správy a tlačiarne, obrazovka správy sa otvorí iba 7 rýchlymi klepnutiami na logo v hlavičke a nečinná úvodná obrazovka (`src/hooks/useInactivityTimer.ts`) sa zapína medzi rodinami.

## Samoprijatie (B1App)

Členovia sa prijímajú z portálu b1.church na obrazovke `/mobile/checkin` (smeruje ju `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` na `screens/CheckinPage.tsx`). Vyžaduje prihláseného používateľa a prechádza rovnakými štyrmi krokmi ako kiosk — služby → domácnosť → skupiny → dokončenie — proti identickým koncovým bodom, pričom stav drží `B1App/src/helpers/CheckinHelper.ts`. Rozdiely oproti kiosku: domácnosť pochádza z vlastného `householdId` prihláseného používateľa (bez kroku vyhľadávania) a tlač štítkov neexistuje — namiesto toho obrazovka dokončenia zobrazí bezpečnostný kód dávky ako QR kód (`qrcode.react`) s nápovedou „ukážte toto na prijímacej stanici". Ak je domácnosť už prijatá pri načítaní stránky, tlačidlo „Zobraziť kód prijatia" znovu zobrazí QR z prvej existujúcej návštevy (z `GET /attendance/visits/checkin`), ktorá nesie `securityCode`. Prijatie sa zapíše ihneď pri odoslaní (neexistuje čakajúci stav); QR poháňa tlač štítkov iba na kiosku.

**Tlač štítkov z telefónu na kiosk** (`B1Checkin/app/scan.tsx`, dosiahnuteľné tlačidlom „Skenovať kód" pri QR na obrazovke vyhľadávania): kiosk zobrazí `CodeScanner` (`CameraView` z `expo-camera`, štandardne prednou kamerou, prepínateľnou), ktorý hľadá QR kódy. `ScanCodeHelper.parse()` prijme užitočné zaťaženie iba vtedy, keď ide o holý 4-znakový kód v abecede bezpečnostného kódu, a `ScanCodeHelper.isRepeat()` ignoruje rovnaký kód 4 sekundy, takže funguje QR z B1App aj QR blok vytlačeného štítka. Obrazovka potom ide cestou opätovnej tlače z odhlásenia — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — a vráti sa na vyhľadávanie. Pri skenovaní sa nezapisuje žiadna účasť; ide iba o štítky. Kódy bez aktívnych návštev, stanice bez tlačiarne a skupiny bez štítkov zobrazia upozornenie a vrátia sa na vyhľadávanie.

Typy a `ApiHelper`/`ArrayHelper` pochádzajú z `@churchapps/helpers` a `@churchapps/apphelper`; žiadne komponenty React nie sú zdieľané s B1Admin.

## Účasť na strane správy (B1Admin)

- **Nastavenie** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) zobrazuje strom štruktúry a vytvára služby (`ServiceEdit.tsx`) a časy bohoslužieb (`ServiceTimeEdit.tsx`). Údaje o lokalitách pochádzajú z členstva cez hook `useCampuses()`.
- **Ručná účasť** je na strane skupín, nie v sekcii účasti: `B1Admin/src/groups/components/GroupSessionsTab.tsx` vytvára relácie (`POST /attendance/sessions`; pri pridávaní môže `SessionEdit.tsx` zahrnúť jednu reláciu pre každú inú skupinu zdieľajúcu zvolený čas bohoslužby, pričom preskočí skupiny, ktoré už majú reláciu v danom dátume) a označuje osoby ako prítomné cez `POST /attendance/visitsessions/log`, ktorý nájde alebo vytvorí návštevu pre danú osobu a reláciu. Vedúci skupín môžu zapisovať účasť pre svoje skupiny bez oprávnenia `attendance.edit` — kontroléry overujú `au.leaderGroupIds`.
- **Reportovanie** — trend účasti a účasť v skupine sú prehľady definované na serveri (`B1Admin/src/components/reporting/ReportWithFilter.tsx` oproti ReportingApi; definície v `Api/reports/*.json`). Obe berú `startDate`/`endDate` (koncový dátum vrátane); prehľad trendu predvolene zobrazuje obdobie od pred jedného roka do dnes a pridáva stĺpec `sessionDates` po týždňoch, a strom účasti v skupine na obrazovke obsahuje `checkinTime` každej návštevy a `membershipStatus` osoby. CSV účasti v skupine pochádza z doplnkového prehľadu `groupAttendanceDownload`, ktorý `GroupAttendanceDownloadHelper` prevráti do jedného riadku na člena skupiny so stĺpcom prítomný/neprítomný pre každú datovanú reláciu; história jednotlivej osoby je `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Tlač štítkov

### Šablóny a návrhár

Cirkvi si navrhujú vlastné štítky v B1Admin na `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, dosiahnuteľné zo stránky nastavení prijímania). Šablóna je riadok `labelTemplates`, ktorého `content` je pole blokov JSON — `text`, `field`, `barcode`, `qrcode` alebo `box` — každý umiestnený v percentuálnych súradniciach s písmom, zarovnaním, symbológiou (`code39`/`code128`/`qr`) a voliteľnými podmienkami viditeľnosti (napr. vykresliť box alergie iba vtedy, keď `person.nametagNotes` nie je prázdne). Existujú dva `labelType`: `nametag` (jeden pre každú prijatú osobu; polia ako `person.displayName`, `sessions`, `securityCode` a `person.isBirthdayWeek` — `"true"`, keď mesiac/deň narodenín je do 3 dní od dneška, cez koniec roka, počíta `LabelHelper.isBirthdayWithin()`) a `pickup` (jeden na rodinu; polia ako `children`, `childrenAllergies`). Server vynucuje jednu predvolenú šablónu na typ v cirkvi (`LabelTemplateController.save`). Návrhár obsahuje štartovacie šablóny zrkadliace zabudované štítky kiosku a náhľady proti ukážkovým údajom.

### Vykresľovanie a tlač na kiosku

Pri dokončení prijatia `B1Checkin/src/helpers/LabelHelper.ts` rozhodne, čo vytlačiť, podľa príznakov skupiny na každej čakajúcej návšteve: menovky pre skupiny `printNametag`, plus jeden rodinný štítok na vyzdvihnutie, ak niektorá návšteva zasiahla skupinu `parentPickup`. Návštevy s `checkinType` `volunteer` preskočí `LabelHelper.selectChildVisits()`, takže opatrovateľ v miestnosti Vyzdvihnutie rodičmi nikdy nespustí štítok na vyzdvihnutie. Bezpečnostný kód z odpovede na prijatie sa umiestni na menovky detí a štítok na vyzdvihnutie; menovky dospelých sa tlačia bez kódu. Ak má cirkev šablóny, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) premení bloky + kontext polí na samostatný HTML dokument; inak sa použijú zabudované HTML štítky v `B1Checkin/assets/labels/` s nahradením zástupných symbolov.

Čiarové kódy sa generujú ako vložené SVG čisto TypeScriptovými kodérmi v `B1Checkin/src/helpers/barcode.ts` — tabuľky vzorov Code 39 a tabuľky šírok Code 128 (sada kódov B s kontrolným súčtom mod 103), plus QR cez balík `qrcode`. **Tieto kodéry sú zámerne duplikované v B1Admin** (`LabelEditor.tsx` obsahuje tie isté tabuľky inline, čo je uvedené v komentári v kóde), aby náhľady návrhára boli pixelovo totožné s výstupom kiosku; zmena v jednom sa musí zrkadliť v druhom.

Tlačový kanál (`src/components/PrintUI.tsx`) vykreslí každý HTML štítok vo `WebView`, zachytí ho do JPG cez `react-native-view-shot` a odovzdá URI obrázkov natívnemu modulu Expo **printer-helper** (`B1Checkin/modules/printer-helper/`). Modul vystavuje `scan()`, `checkInit()`, `printUris()` a udalosti stavu, s poskytovateľom pre každú značku na oboch platformách:

| Značka | Android | iOS | Poznámky |
|--------|---------|-----|----------|
| Brother | `BrotherProvider.kt` (SDK tlače Brother) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Sieťové tlačiarne rady QL (QL-800/810W/820NWB/1100/1110NWB…), vyseknuté štítky 29×90, odporúčaná predvoľba |
| Zebra | `ZebraProvider.kt` (SDK Link-OS) | `ZebraProvider.swift` + `ZebraBridge` | Objavovanie v sieti + tlač obrázkov TCP/ZPL |

Výber tlačiarne je v `app/printers.tsx` (sieťové skenovanie vráti položky `brand~model~ip`; voľba sa ukladá do AsyncStorage) a `src/helpers/PrinterLog.ts` udržiava diagnostický záznam na zariadení, zobrazovaný cez živú stavovú bodku v hlavičke kiosku.

## Registrácia hostí

Dve cesty vytvárajú osobu počas prijímania:

- **Na kiosku** — tlačidlo „Pridať hosťa" na obrazovke domácnosti otvorí `B1Checkin/app/addGuest.tsx`, ktoré najprv hľadá existujúcu zhodu nečlena cez `GET /membership/people/search?term=` a inak vytvorí novú cez `POST /membership/people`, pripojenú k aktuálnej domácnosti. Hosť potom prechádza priradením skupiny ako ktorýkoľvek člen.
- **Samoobsluha cez QR** — keď je nastavenie cirkvi `enableQRGuestRegistration` zapnuté (nastavuje sa v nastaveniach prijímania v B1Admin, číta sa z `GET /membership/settings/public/{churchId}`), obrazovka vyhľadávania na kiosku zobrazí QR kód smerujúci na `https://{subdomain}.b1.church/guest-register?serviceId=`. Táto stránka B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) umožňuje návštevnej rodine zaregistrovať sa vlastným telefónom cez anonymný koncový bod `POST /membership/people/guest-register`, čím sa rad pri kiosku hýbe ďalej. List QR má tiež tlačidlo **Registrovať sa tu**, ktoré otvorí tú istú stránku na kiosku (`app/guestRegister.tsx`) v `WebView` v režime inkognito bez vyrovnávacej pamäte; `src/helpers/GuestRegisterHelper.ts` zostavuje URL pre QR aj WebView a blokuje navigáciu mimo `https://{subdomain}.b1.church/guest-register`. Obrazovka sa vráti na vyhľadávanie pri **Hotovo**, späť alebo po 120 sekundách nečinnosti (písanie vo formulári sa z WebView posiela ako aktivita), pričom odpojí WebView, aby záznamy jednej rodiny nikdy nedosiahli ďalšiu.

Registrácia cez QR sa riadi nastaveniami cirkvi uloženými z karty **QR registrácia hostí** v B1Admin (`src/mobile/CheckInPage.tsx`):

| Nastavenie | Viditeľnosť | Účel |
|---|---|---|
| `enableQRGuestRegistration` | verejné | Prepínač zapnutia pre QR na kiosku a anonymné koncové body |
| `guestRegistrationFields` | verejné | JSON mapa `email`, `phone`, `address`, `birthDate`, `gender`, `maritalStatus`, `grade`, `comments` → `"off"` / `"optional"` / `"required"`. Predvolene: e-mail a telefón voliteľné, ostatné vypnuté. Meno a priezvisko sú vždy povinné |
| `guestRegistrationImage` | verejné | URL hlavičkovej fotografie; B1App ju vykreslí v pomere 16:9 namiesto ikony na formulári a potvrdzovacej obrazovke |
| `guestRegistrationGroupId` | súkromné | Skupina, do ktorej sa pridá každá registrácia (hostia ju nikdy nevidia ani nevyberajú) |
| `guestRegistrationRecordAttendance` | súkromné | `"true"` na zaznamenanie účasti aj pre túto skupinu |

`src/components/checkin/GuestRegister.tsx` v B1App načíta zoznam z anonymného `GET /membership/people/guest-register/options?churchId=` a vykreslí iba zahrnuté polia (e-mail, telefón, rodinný stav a adresa pri primárnom kontakte; dátum narodenia, pohlavie a ročník pre každého člena; jedno pole pre komentáre) a odosiela iba tie. Server znovu aplikuje zoznam v `GuestRegistrationHelper.sanitize()` — vypnuté polia sa zahodia, chýbajúce povinné alebo hodnoty mimo zoznamu sú 400 — predtým, než sa spustí `PersonHelper.registerGuestHousehold()`. Najprv zavolá `PersonRepo.findGuestMatch()` pre každého člena s e-mailom alebo telefónom: práve jedna živá osoba s rovnakým menom a rovnakým e-mailom alebo rovnakými číslicami telefónu sa znovu použije (nula alebo viac zhôd vytvorí novú osobu, takže sa nikdy nehádá). Člen bez kontaktu sa páruje podľa mena v rámci spárovanej domácnosti. Znovu použité osoby sa nikdy neupravujú, takže anonymný formulár nemôže prepísať uložené údaje, a odpoveď zopakuje odoslané mená. Nespárovaní členovia sa pripoja k spárovanej alebo novej domácnosti ako `membershipStatus: "Visitor"` a pre každú novú osobu vyšle `person.created`. Potom sa chyby zaznamenávajú, nie vracajú: členovia sa pridajú do nakonfigurovanej skupiny (`group.member.added`); ak je zaznamenávanie účasti zapnuté, `AttendanceModuleGateway.recordAttendance()` označí každého člena ako prítomného pre každý čas bohoslužby skupiny, ktorý má plán a ktorého okno prijímania (`CheckinGateHelper.isServiceTimeOpen`) je práve otvorené, pričom v prípade potreby vytvorí reláciu pre dnešný dátum podľa miestneho času cirkvi — nenaplánované časy bohoslužieb a registrácie mimo okna nezaznamenajú nič; a komentáre sa stanú skrytou konverzáciou s poznámkou k osobe pri hlave domácnosti (autor správy „Registrácia hosťa"), prepojenou cez `person.conversationId`.

## Súvisiace stránky

- [Koncové body účasti](../api/endpoints/attendance.md) -- Úplné REST rozhranie pre lokality, služby, relácie, návštevy a položky návštev
- [Koncové body členstva](../api/endpoints/membership.md) -- Osoby, domácnosti a skupiny
- [Webhooky](../api/webhooks.md) -- Udalosti `session.created`, `attendance.recorded` a `attendance.checkout`
- [Štruktúra modulu](../api/module-structure.md) -- Ako je modul účasti organizovaný na strane servera
