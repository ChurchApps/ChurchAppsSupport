---
title: "Check-In"
---

# Check-In

<div class="article-intro">

Check-in este un sistem cu trei puncte de acces: aplicația kiosc B1Checkin pentru stațiile cu personal și cele self-service, self check-in în portalul pentru membri B1App și prezența din B1Admin, pe partea administrativă. Toate trei scriu în același modul de prezență din Api-ul principal, iar rutarea în sălile de clasă este determinată exclusiv de Grupuri — nu există o entitate separată de tip „locații” sau „săli”. Peste acestea există un strat de siguranță pentru copii: tipuri de check-in pe fiecare vizită, verificări de capacitate și raport voluntari pe server, eligibilitate după vârstă/clasă pe kiosc, verificarea persoanelor de încredere la ridicare și anunțarea părinților prin furnizorul de SMS-uri al bisericii. Această pagină descrie modelul de date, fluxurile de check-in, stratul de siguranță și procesul de tipărire a etichetelor.

</div>

## Prezentare generală

```
┌──────────────────────────┐
│ B1Checkin (kiosc Expo)   │──┐         ┌──────────────────────────────────────────────┐
│  căutare → gospodărie →  │  │         │ Api                                          │
│  grupuri → finalizare/   │  │  HTTPS  │  ┌─ modulul membership ────────────────────┐ │
│  tipărire                │  ├───────▶ │  │ persoane · gospodării · grupuri         │ │
├──────────────────────────┤  │         │  └─────────────────────────────────────────┘ │
│ B1App (self check-in)    │──┤         │  ┌─ modulul attendance ────────────────────┐ │
│  ecranul /mobile/checkin │  │         │  │ campusuri → servicii → serviceTimes     │ │
├──────────────────────────┤  │         │  │ groupServiceTimes  (rutare în săli)     │ │
│ B1Admin (personal)       │──┘         │  │ sessions ← visitSessions → visits       │ │
│  configurare · rapoarte ·│            │  │ labelTemplates                          │ │
│  editor de etichete      │            │  └─────────────────────────────────────────┘ │
└──────────────────────────┘            └──────────────────────────────────────────────┘

Calea de tipărire a etichetelor (doar kiosc):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (șabloane de etichete sau varianta HTML inclusă)
       └▶ LabelRenderer → document HTML + coduri de bare SVG inline
            └▶ PrintUI: randare WebView → captură JPG cu ViewShot
                 └▶ modul nativ printer-helper → Brother QL / Zebra
```

| Suprafață | Repo | Stack | Rol |
|---------|------|-------|------|
| Kiosc | `B1Checkin` | Expo / React Native, rutare de fișiere cu expo-router; build-uri EAS pentru Android, Amazon Fire și iOS; actualizări OTA prin `expo-updates` | Stație cu personal sau self-service, cu tipărire de etichete și check-out verificat |
| Self check-in | `B1App` | Next.js (portalul pentru membri b1.church) | Membrii autentificați își înregistrează gospodăria de pe telefon; fără tipărire |
| Admin | `B1Admin` | SPA React | Configurează structura serviciilor, atribuie grupuri la ore de serviciu, proiectează etichete, înregistrează prezența manuală și generează rapoarte |

Toate trei apelează aceleași două module API prin `ApiHelper`: **MembershipApi** (`/membership`) pentru persoane, gospodării și grupuri; **AttendanceApi** (`/attendance`) pentru tot ce urmează.

## Modelul de date (`Api/src/modules/attendance`)

| Entitate / tabel | Câmpuri-cheie | Semnificație |
|----------------|-----------|---------|
| `campuses` | name, address | Învechit aici — campusurile sunt administrate în modulul membership (`/membership/campuses`); copia din attendance este înghețată, doar pentru citire, pentru cititorii vechi (`models/Campus.ts`) |
| `services` | campusId, name | O adunare recurentă, de exemplu „Duminica dimineața” (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Un interval orar în cadrul unui serviciu, de exemplu „9:00” (`models/ServiceTime.ts`). Coloanele de program sunt opționale (migrarea `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) și determină [fereastra de check-in](#ferestre-de-check-in-programate) |
| `groupServiceTimes` | groupId, serviceTimeId | Tabel de legătură: ce grupuri (săli de clasă) se întâlnesc la ce ore de serviciu (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | O întâlnire a unui grup, într-o anumită dată — creată leneș, în momentul check-in-ului (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | O persoană prezentă într-o anumită dată (`models/Visit.ts`). `checkinType` este `member` / `guest` / `volunteer` (NULL = membru vechi), setat de kiosc și folosit de verificările de capacitate/raport |
| `visitSessions` | visitId, sessionId | La ce sesiune(i) se referă o vizită — un copil înregistrat la două ore de serviciu primește două rânduri (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (blocuri JSON) | Machete de etichete proiectabile (`models/LabelTemplate.ts`) |

### Cum este salvat un check-in finalizat

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) gestionează `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Corpul cererii este un tablou de obiecte `Visit`, fiecare cu `visitSessions`, a căror `session` încorporată indică doar o pereche `(serviceTimeId, groupId)`. Serverul apoi:

1. **Verifică capacitatea și rapoartele înainte de orice scriere.** `evaluateGates()` → `CheckinGateHelper.evaluate()` verifică, pentru fiecare sală vizată, capacitatea, capacitatea pentru oaspeți, indicatorul de închidere și raportul voluntari față de ocuparea curentă. postCheckin **nu este tranzacțional**, deci verificarea trebuie făcută înainte de prima salvare — o încălcare gravă returnează un 409 care numește sala (sălile) în cauză, iar nimic nu este salvat. Vezi [Verificările de capacitate și raportul voluntari](#verificările-de-capacitate-și-raportul-voluntari).
2. **Rezolvă sesiunile leneș.** `getSessionId()` găsește sau creează rândul din `sessions` pentru `(groupId, serviceTimeId, azi)` — ID-urile de sesiune sunt memorate în cache, pe proces, pentru fiecare dată. Sesiunile noi emit un webhook `session.created`. Bucla este un `for..of` cu `await` — un `forEach(async …)` cu fire-and-forget, folosit anterior, a intrat în cursă cu salvarea și a scris NULL în sessionId la crearea primei sesiuni (remediat; menționat într-un comentariu de cod din buclă).
3. **Înlocuiește înregistrările zilei.** Toate vizitele existente ale acestor persoane, din ziua aceea, la serviciul respectiv, sunt șterse împreună cu visitSessions lor, apoi se salvează setul trimis. Un nou check-in al unei familii este, prin urmare, o operațiune idempotentă de tipul „aceasta este starea curentă”, nu una de adăugare. Trimiterea `?checkDuplicates=true` returnează în schimb `{ duplicates: [personId…] }` fără a scrie nimic — așa își avertizează kioscul utilizatorul înainte de a suprascrie.
4. **Generează un cod de securitate pentru fiecare lot.** `SecurityCodeHelper.generate()` produce un cod de 4 caractere din alfabetul `23456789BCDFGHJKLMNPQRSTVWXYZ` (fără vocale sau caractere ambigue, astfel încât codurile nu pot forma cuvinte și nu pot fi citite greșit). Serverul reîncearcă la coliziune cu vizitele deschise ale aceleiași biserici din aceeași zi și aplică codul pe fiecare vizită din lot.
5. **Returnează `{ streaks, securityCode }`.** `streaks` asociază personId cu numărul de săptămâni consecutive de prezență; kioscul sărbătorește etapele (la fiecare a 5-a săptămână) cu confetti.

Fiecare vizită salvată emite și un webhook `attendance.recorded`. Partea de citire, `GET /attendance/visits/checkin`, returnează vizitele persoanelor din **ultima dată înregistrată**. Dacă aceasta a fost într-o săptămână anterioară, ID-urile sunt eliminate, astfel încât clientul primește o copie pre-completată a selecțiilor de sală din săptămâna trecută, care se vor salva ca înregistrări noi.

### Check-out

Două endpoint-uri închid ciclul (`VisitController`):

- `GET /attendance/visits/code/:code` — vizitele de astăzi, încă neînchise, care au acel cod de securitate, cu sesiunile populate.
- `POST /attendance/visits/checkout` — corpul `{ visitIds, checkedOutBy?, checkedOutById? }`; setează `checkoutTime` și persoana care a ridicat copilul și emite un webhook `attendance.checkout` pentru fiecare vizită.

Permisiuni: kioscurile se autentifică cu `attendance.checkin`, care acordă exact suprafața de check-in/check-out/șabloane de etichete, plus căutările de gospodărie de care are nevoie un kiosc fără `people.view` (căutare după telefon/nume, membrii gospodăriei în modelul de check-in și lista de ridicare a gospodăriei). `SessionHelper.filterChurches` din B1Checkin afișează doar bisericile în care contul are `Attendance/Checkin` sau `Attendance/Edit`. `Checkin` nu mai face parte din permisiunile Everyone (rol nul) (`RoleHelper` și migrarea `2026-11-01_remove_everyone_checkin`), deci trebuie acordat printr-un rol real; `attendance.view`/`attendance.edit` acoperă rapoartele și introducerea manuală; structura (servicii, ore de serviciu, atribuirea grupurilor) necesită `services.edit`. Self check-in-ul membrului (B1App) nu necesită nicio permisiune: orice utilizator autentificat cu o persoană asociată în biserică poate apela `GET`/`POST /attendance/visits/checkin`, iar serverul limitează `personId`-urile trimise la gospodăria proprie a apelantului (403 altfel — această barieră împiedică citirea `securityCode`-urilor altor familii). Apartenența este permisiunea; dacă membrii *văd* funcția este controlat de filele de navigare B1App ale bisericii. Celelalte endpoint-uri de check-in (`code/:code`, `checkout`, `guardians`, `CheckinController`) rămân rezervate kioscurilor și personalului.

## Grupurile determină rutarea în săli

Nu există nicăieri în sistem o entitate de tip cameră sau sală. O „sală” este un **grup** din modulul membership, cu `trackAttendance` activat, legat de una sau mai multe ore de serviciu prin `groupServiceTimes`. Câmpurile grupului (din `Api/src/modules/membership/models/Group.ts`) care modelează comportamentul kioscului:

| Câmp | Efect |
|------|--------|
| `trackAttendance` | Grupul participă la prezență; arborele de configurare din B1Admin marchează grupurile `trackAttendance` fără un rând în `groupServiceTimes` ca nealocate |
| `parentPickup` | Marchează o sală pentru copii: check-in-ul într-o astfel de sală face din vizită una de „copil”, care tipărește o etichetă de ridicare pentru familie și pune codul de securitate pe ecusonul de nume |
| `printNametag` | Dacă check-in-urile în acest grup tipăresc sau nu un ecuson |
| `capacity` / `guestCapacity` / `checkinClosed` | Limitele de capacitate ale sălii și un comutator „închis” ferm, aplicate pe server de verificarea check-in-ului (se editează în setările grupului din B1Admin, la „Check-In Capacity”) |
| `volunteerRatio` / `minVolunteers` | Raportul copii-per-voluntar și numărul minim de voluntari, aplicate conform setării `ratioEnforcement` la nivelul bisericii |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Limitele de vârstă/clasă pentru eligibilitate, evaluate pe kiosc pentru a evidenția sau estompa sălile |

Fiecare client denormalizează în același fel (de exemplu `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): încarcă în paralel `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` și `GET /membership/groups`, apoi, pentru fiecare oră de serviciu, colectează în `serviceTime.groups` grupurile al căror rând din `groupServiceTimes` indică spre ea. Acest tablou este cel afișat în selectorul de săli, organizat după `categoryName` al grupului.

Atribuirile se editează de pe pagina grupului din B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), iar întregul arbore Campus → Serviciu → Oră de serviciu → Grup este vizualizat în `B1Admin/src/attendance/components/AttendanceSetup.tsx` prin `GET /attendance/attendancerecords/tree`.

:::info
Pentru că grupurile sunt singura sursă de adevăr, aceeași apartenență la grup alimentează rutarea de la kiosc, prezența de tip listă din paginile de grup din B1Admin și rapoartele de prezență — atribuirea unui grup unei ore de serviciu este singurul pas necesar pentru ca acesta să devină destinație de check-in.
:::

## Siguranța copiilor

### Tipurile de check-in

Fiecare vizită are un `checkinType` — `member`, `guest` sau `volunteer` (NULL înseamnă vechi/membru; migrarea `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Tipul este ales **pe kiosc**: cipurile Membru / Oaspete / Voluntar de pe rândul extins al membrului (`B1Checkin/src/components/MemberServiceTimes.tsx`), aplicate pe fiecare vizită în așteptare la finalizare (`app/checkinComplete.tsx`, implicit `member`). Serverul îl folosește în verificare — voluntarii contează în acoperirea raportului, în loc să se scadă din capacitate, iar oaspeții se numără în `guestCapacity`.

### Verificările de capacitate și raportul voluntari

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) rulează în `postCheckin`, înainte de orice salvare (endpoint-ul nu este tranzacțional, deci verificarea înainte de salvare este mecanismul de corectitudine). Încarcă ocuparea curentă pentru fiecare grup vizat (`VisitRepo.countActiveByGroupToday`) și configurația grupului prin gateway-ul modulului membership, apoi clasifică încălcările:

- **Strictă (blochează întotdeauna):** `checkinClosed`, `current + incoming > capacity`, numărul de oaspeți peste `guestCapacity`. Lotul este respins cu `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` — kioscul afișează sala numită.
- **Raport (avertizează sau blochează):** non-voluntari care intră într-o sală unde `volunteers < minVolunteers`, fără niciun voluntar, sau unde `children > volunteers × volunteerRatio`. Gravitatea urmează setarea bisericii `ratioEnforcement` (`"warn"` implicit / `"block"`, editată în B1Admin Manage Church → Check-In, `CheckinSettingsEdit.tsx`). Modul de avertizare returnează `409 { warning: true, error: "ratio", … }`, cu excepția cazului în care clientul retrimite cu `acknowledgeWarnings=true` — această retrimitere este suprascrierea de confirmare a personalului de la kiosc.

### Ferestre de check-in programate

O oră de serviciu poate avea un program săptămânal opțional (`dayOfWeek` 0–6, cu 0 = duminică, `startTime`/`endTime` ca `HH:mm`, `checkinOpenMinutes`, `checkinCloseMinutes`), editat în formularul de oră de serviciu din B1Admin, la **Attendance → Setup** (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, „Check-in Schedule”). `CheckinGateHelper.hasSchedule()` consideră o oră de serviciu programată doar dacă sunt setate atât `dayOfWeek`, cât și `startTime`; orele neprogramate nu sunt niciodată limitate în timp. `isServiceTimeOpen()` calculează fereastra în ora locală a peretelui (`DateHelper.toChurchTime`). Fusul orar este rezolvat pentru fiecare oră de serviciu de `CheckinTimeZoneHelper.load()` (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`): mai întâi `timezone` campusului serviciului (`service.campusId`, prin `MembershipModuleGateway.loadCampusTimeZones`), apoi `timeZone` al bisericii (setat în Church Information din B1Admin), apoi primul campus nesters care are un `timezone` (`loadCampusTimeZone`) și abia la final `America/New_York`. Campusul vine primul pentru că multe biserici aveau `America/New_York` completat retroactiv ca fus al bisericii. Atât listarea, cât și căile de trimitere de mai jos rezolvă fusul în același mod. Fereastra merge de la `checkinOpenMinutes` înainte de start până la `checkinCloseMinutes` după sfârșit (sau după start, dacă nu există sfârșit), tratând ferestrele care trec de miezul nopții sau de limita săptămânii.

Fereastra este aplicată în două locuri:

- **Listare:** `GET /attendance/servicetimes` adaugă fiecărui rând un câmp booleean calculat `checkinOpen`. Self check-in-ul din B1App (`CheckinPage.tsx`) și selectorul de servicii din B1Checkin (`app/services.tsx`) păstrează toate orele. Când toate orele unui serviciu sunt închise, afișează următoarea deschidere („Check-in opens Sun 9:30 AM.” în B1App, „Check-in for this service opens Sun 9:30 AM.” în B1Checkin, din `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`), iar dacă nu se poate calcula nicio deschidere, mesajul devine „Check-in isn't open for this service right now.” (kioscul oferă un buton Înapoi pentru a alege alt serviciu). În caz contrar, orele închise apar ca un rând neselectabil „Closed” / „Closed · opens 9:30 AM”. Ecranul de gospodărie din B1Checkin (`MemberServiceTimes.tsx`) reevaluează deschiderea în timp real, după ceasul dispozitivului, cu `ServiceTimeHelper.isCheckinOpen()` (fusul orar al dispozitivului, nu al bisericii), astfel încât un kiosc lăsat pornit se deschide și se închide la timp, iar la o oră închisă în care persoana este deja înregistrată afișează „Kids Room 1 · Checked in” (numele grupului).
- **Trimitere:** în `evaluateGates()`, înainte de evaluarea capacității/raportului, `findClosedServiceTimeGroups()` respinge lotul cu `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` dacă orice sesiune vizată are ora de serviciu în afara ferestrei. Deoarece vizitele existente ale unei gospodării din ziua respectivă sunt retrimise la fiecare check-in, sesiunile pe care persoana le deține deja (`personId|sessionId` din vizitele existente) trec peste această verificare, astfel încât adăugarea unei ore de serviciu ulterioare deschise nu este refuzată doar pentru că o fereastră anterioară s-a închis. B1Checkin afișează aceasta prin ecranul său de blocare strictă, cu motivul „check-in-ul nu este deschis acum” (încălcările de capacitate afișează în continuare „room is full or closed”).

### Eligibilitatea după vârstă/clasă (pe kiosc)

Eligibilitatea sălilor este un element de interfață cu rol consultativ, evaluat pe kiosc, nu impus de server. `B1Checkin/src/helpers/EligibilityHelper.ts` compară data nașterii/clasa unei persoane cu `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` ale grupului (ordinea claselor: PreK, K, 1–12, Graduated) și returnează `eligible` / `ineligible` / `unknown` — datele lipsă dau `unknown` și nu ascund niciodată o sală. Vârstele și clasele se calculează la **data promovării în clasa următoare** a bisericii (setarea `gradePromotionDate`, `"MM-DD"`, editată în `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); kioscul o preia din `GET /attendance/checkin/settings`, iar `resolveAsOfDate` alege cea mai recentă apariție din ziua de azi sau anterioară. Selectorul de săli evidențiază sălile eligibile și estompează pe cele neeligibile; alegerea unei săli estompate necesită confirmarea personalului.

### Persoane de încredere și ridicări neautorizate

Persoanele care pot ridica copiii sunt o entitate din membership, pe gospodărie: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, personId opțional, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). CRUD-ul este `GET /membership/householdpickup/:householdId` (orice utilizator autentificat al bisericii, astfel încât kioscurile pot citi), plus `POST` / `DELETE` protejate de `people.edit`. Personalul gestionează lista pe cardul **Pickup** de pe pagina persoanei (`B1Admin/src/people/components/PickupPeople.tsx`) — fotografie, relație și un cip de stare Trusted/Not Authorized.

La check-out (`B1Checkin/app/checkout.tsx`), kioscul încarcă lista de ridicare a gospodăriei: intrările `trusted` apar ca carduri de ridicare apăsabile, alături de grila cu fotografiile adulților din gospodărie, iar un nume introdus liber, „Other”, este comparat aproximativ (distanța Levenshtein, `src/helpers/PickupMatchHelper.ts`) cu intrările `notAuthorized` — o potrivire blochează check-out-ul cu o fereastră de avertizare și un buton **Override** pentru personal. Suprascrierea este înregistrată pe vizita însăși: trimite `checkedOutBy` ca `"OVERRIDE: {name}"` prin `POST /attendance/visits/checkout` obișnuit, astfel încât apare în registrul de prezență și în webhook-ul `attendance.checkout`, nu într-un tabel separat de audit.

### Anunțarea părinților și alerta de urgență

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) expune două endpoint-uri SMS:

- `POST /page` — `{ visitId, message }`: trimite mesaj tutorilor unui copil înregistrat (ecranul de check-out de la kiosc, în modul cu personal).
- `POST /broadcast` — `{ serviceId, message }`: trimite SMS adulților din fiecare gospodărie înregistrată pentru un serviciu (setările de administrator ale kioscului, în spatele unei fișe de confirmare de tip `EMERGENCY` din `B1Checkin/app/adminSettings.tsx`).

Ambele rezolvă adulții din gospodării prin gateway-ul membership, apoi predau livrarea către **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — ușa dintre module către furnizorul de mesagerie configurat al bisericii (`@churchapps/texting`: TextInChurch, Clearstream sau MutualMinistry; nu există un expeditor SMS încorporat). Gateway-ul înregistrează un rând `sentText` plus intrări `deliveryLog` pentru fiecare destinatar și limitează un lot la 500 de destinatari; fără un furnizor configurat, returnează `no_provider`, pe care kioscul o afișează ca „No SMS provider configured”. Metoda `dispatch()` a controllerului elimină duplicatele de numere de telefon și sare peste persoanele fără telefon mobil sau cu `optedOut` setat, returnând `{ sent, failed, skippedOptedOut, skippedNoPhone }`, astfel încât kioscul poate arăta ce a fost omis.

## Kioscul (B1Checkin)

Ecranele sunt fișiere expo-router din `B1Checkin/app/`; starea dintre ecrane se află într-o clasă statică `CachedData` (`src/helpers/CachedData.ts`), nu în starea React.

```
index (pornire/autentificare automată) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             încarcă serviceTimes, groups,│             │  └─────────┘ └▶ addGuest  └▶ tipărește etichetele,
             groupServiceTimes,           │             └▶ checkout (cu personal)      revine automat
             labelTemplates               │                                            la lookup
```

1. **Căutare** (`app/lookup.tsx`) — căutare după telefon (`GET /membership/people/search/phone?number=`, ultimele 4 cifre sau numărul complet) sau după nume (`GET /membership/people/search?term=`). Selectarea unei potriviri încarcă gospodăria (`GET /membership/people/household/{householdId}`) și vizitele existente (`GET /attendance/visits/checkin`), populând `pendingVisits` cu selecțiile din săptămâna trecută.
2. **Verificarea gospodăriei** (`app/household.tsx`, `src/components/MemberList.tsx`) — fiecare rând de membru afișează o insignă de „deja înregistrat”, o insignă pentru alergii/`nametagNotes` și cipurile cu sălile curente. Extinderea unui membru listează fiecare oră de serviciu, cu un buton de sală și cipurile de tip de check-in Membru / Oaspete / Voluntar (`MemberServiceTimes.tsx`). Sub numele fiecărei ore de serviciu, `ServiceTimeHelper.getGroupSummary()` afișează grupurile oferite acolo (numele din `serviceTime.groups`, curățate, fără duplicate, indiferent de majuscule, unite prin virgulă); nu se afișează nimic dacă ora nu are grupuri.
3. **Atribuirea grupului** (`app/selectGroup.tsx`) — un arbore de categorii construit din `serviceTime.groups`, cu sălile eligibile după vârstă/clasă evidențiate și cele neeligibile estompate, în spatele unei confirmări de personal (vezi [Eligibilitatea după vârstă/clasă](#eligibilitatea-după-vârstăclasă-pe-kiosc)); alegerea unei săli scrie un `{ session: { serviceTimeId, groupId } }` visitSession în vizita în așteptare a persoanei respective (`src/helpers/VisitSessionHelper.ts`). „None” îl șterge.
4. **Finalizare** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` cu `pendingVisits` (fiecare marcat cu `checkinType`), apoi tipărește etichetele dacă este configurată o imprimantă și revine automat la căutare. Un răspuns `409` de capacitate sau `notOpen` afișează sala numită cu motivul (plin/închis sau check-in neînceput); o avertizare de raport oferă o confirmare de personal care retrimite cu `acknowledgeWarnings=true`.

Ecranul de **check-out** (`app/checkout.tsx`) acceptă codul de securitate din 4 caractere printr-un câmp cu focus automat — astfel, scanerele de coduri de bare cu tastatură USB/Bluetooth funcționează fără cameră — sau o tastatură numerică pe ecran, care folosește același alfabet și trimite automat la 4 caractere. Un buton **Scan** deschide o fereastră cu camera partajată `src/components/CodeScanner.tsx` (implicit camera din spate, acceptând QR, Code 128 și Code 39), astfel încât stațiile fără scaner cu cablu să poată citi eticheta de ridicare; un cod scanat intră pe aceeași cale `handleCode()` ca un text introdus. Ecranul caută codul, afișează copiii care sunt ridicați și prezintă **persoanele de încredere pentru ridicare** ale gospodăriei ca carduri apăsabile, alături de o grilă cu fotografiile adulților din gospodărie (plus opțiunea liberă „Other”, verificată aproximativ față de numele neautorizate — vezi [Persoane de încredere și ridicări neautorizate](#persoane-de-încredere-și-ridicări-neautorizate)), apoi trimite `POST /attendance/visits/checkout` cu numele/ID-ul persoanei alese. În modul cu personal, ecranul oferă și **Page a parent** (`POST /attendance/checkin/page`) și o **reimprimare a etichetei de securitate** — `reprint()` reconstruiește etichetele familiei cu `LabelHelper.getAllLabelsFor(...)` și le trimite prin aceeași conductă `PrintUI` ca la check-in.

Caracterul stației este un indicator AsyncStorage `@StationMode` (`"self"` | `"manned"`, comutat în `app/adminSettings.tsx`). Modul cu personal adaugă punctul de intrare pentru check-out pe ecranul de căutare și editarea profilului fiecărei persoane (`POST /membership/people`) din ecranul gospodăriei. Securitatea kioscului este integrată: un PIN opțional (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) protejează ecranele de administrare și de imprimantă, ecranul de administrare se deschide doar prin 7 atingeri rapide pe logoul din antet, iar un ecran de atracție inactiv (`src/hooks/useInactivityTimer.ts`) preia controlul între familii.

## Self check-in (B1App)

Membrii se înregistrează de pe portalul b1.church, la ecranul `/mobile/checkin` (rutat de `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` către `screens/CheckinPage.tsx`). Necesită un utilizator autentificat și parcurge aceiași patru pași ca kioscul — servicii → gospodărie → grupuri → finalizare — prin aceleași endpoint-uri, cu starea păstrată în `B1App/src/helpers/CheckinHelper.ts`. Diferențele față de kiosc: gospodăria provine din `householdId` propriu al utilizatorului autentificat (fără pas de căutare), iar nu există tipărire de etichete — în schimb, ecranul de finalizare afișează codul de securitate al lotului ca un cod QR (`qrcode.react`), cu indicația „show this at a check-in station”. Dacă gospodăria este deja înregistrată când se încarcă pagina, butonul „Show check-in code” reafișează codul QR din prima vizită existentă (din `GET /attendance/visits/checkin`) care are un `securityCode`. Check-in-ul este înregistrat imediat la trimitere (nu există stare de așteptare); codul QR servește doar la tipărirea etichetelor la kiosc.

**Tipărirea etichetelor de pe telefon la kiosc** (`B1Checkin/app/scan.tsx`, accesat din butonul „Scan code” de sub codul QR de pe ecranul de căutare): kioscul afișează `CodeScanner` (un `CameraView` din `expo-camera`, implicit cu camera frontală, cu posibilitate de comutare) care caută coduri QR. `ScanCodeHelper.parse()` acceptă un conținut doar dacă este un cod simplu de 4 caractere din alfabetul codului de securitate, iar `ScanCodeHelper.isRepeat()` ignoră același cod timp de 4 secunde, astfel încât atât QR-ul din B1App, cât și blocul QR al unei etichete tipărite funcționează. Ecranul urmează apoi calea de reimprimare a check-out-ului — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — și revine la căutare. Nu se face nicio scriere de prezență la scanare; doar etichete. Codurile fără vizite active, stațiile fără imprimantă și grupurile fără etichete afișează fiecare câte un mesaj scurt și revin la căutare.

Tipurile și `ApiHelper`/`ArrayHelper` provin din `@churchapps/helpers` și `@churchapps/apphelper`; nu există componente React comune cu B1Admin.

## Prezența din administrare (B1Admin)

- **Configurare** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) afișează arborele structurii și creează servicii (`ServiceEdit.tsx`) și ore de serviciu (`ServiceTimeEdit.tsx`). Datele despre campusuri provin din membership, prin hook-ul `useCampuses()`.
- **Prezența manuală** se află în secțiunea Grupuri, nu în secțiunea de prezență: `B1Admin/src/groups/components/GroupSessionsTab.tsx` creează sesiuni (`POST /attendance/sessions`; la adăugare, `SessionEdit.tsx` poate include câte o sesiune pentru fiecare alt grup care împarte ora de serviciu aleasă, sărind peste grupurile care au deja o sesiune în acea dată) și marchează persoanele prezente prin `POST /attendance/visitsessions/log`, care găsește sau creează vizita pentru persoana și sesiunea respectivă. Liderii de grup pot înregistra prezența pentru propriile grupuri fără permisiunea `attendance.edit` — controllerele verifică `au.leaderGroupIds`.
- **Rapoarte** — tendința prezenței și prezența pe grupe sunt rapoarte definite pe server (`B1Admin/src/components/reporting/ReportWithFilter.tsx`, împotriva ReportingApi; definițiile sunt în `Api/reports/*.json`). Ambele primesc `startDate`/`endDate` (data de final inclusivă); raportul de tendință implicit acoperă perioada de la acum un an până astăzi și adaugă o coloană `sessionDates` pe săptămână, iar arborele de pe ecran al prezenței pe grupe include `checkinTime` al fiecărei vizite și `membershipStatus` al persoanei. CSV-ul prezenței pe grupe provine din raportul asociat `groupAttendanceDownload`, pivotat de `GroupAttendanceDownloadHelper` într-un rând pentru fiecare membru al grupului, cu o coloană prezent/absent pentru fiecare sesiune datată; istoricul pe persoană este `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Tipărirea etichetelor

### Șabloane și editorul

Bisericile își proiectează propriile etichete în B1Admin, la `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, accesat din pagina de setări Check-In). Un șablon este un rând `labelTemplates` al cărui `content` este un tablou JSON de blocuri — `text`, `field`, `barcode`, `qrcode` sau `box` — fiecare poziționat în coordonate procentuale, cu font, aliniere, simbologie (`code39`/`code128`/`qr`) și condiții opționale de vizibilitate (de exemplu, să afișeze caseta cu alergii doar când `person.nametagNotes` nu este gol). Există două `labelType`-uri: `nametag` (una pentru fiecare persoană înregistrată; câmpuri precum `person.displayName`, `sessions`, `securityCode` și `person.isBirthdayWeek` — `"true"` când luna/ziua nașterii se află la cel mult 3 zile de azi, cu trecere peste sfârșitul anului, calculat de `LabelHelper.isBirthdayWithin()`) și `pickup` (una pentru fiecare familie; câmpuri precum `children`, `childrenAllergies`). Serverul impune un singur implicit pentru fiecare tip și biserică (`LabelTemplateController.save`). Editorul include șabloane de pornire care reproduc etichetele incluse în kiosc și afișează o previzualizare cu date de test.

### Randarea și tipărirea la kiosc

La finalizarea check-in-ului, `B1Checkin/src/helpers/LabelHelper.ts` decide ce se tipărește, pe baza indicatorilor de grup ai fiecărei vizite în așteptare: ecusoane pentru grupurile cu `printNametag`, plus o etichetă de ridicare pentru familie dacă vreo vizită a atins un grup `parentPickup`. Vizitele cu `checkinType` `volunteer` sunt omise de `LabelHelper.selectChildVisits()`, astfel încât un voluntar dintr-o sală Parent Pickup nu declanșează niciodată o etichetă de ridicare. Codul de securitate din răspunsul de check-in merge pe ecusoanele copiilor și pe eticheta de ridicare; ecusoanele adulților se tipăresc fără cod. Dacă biserica are șabloane, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) transformă blocurile și contextul câmpurilor într-un document HTML independent; altfel se folosesc etichetele HTML incluse din `B1Checkin/assets/labels/`, cu înlocuirea substituenților.

Codurile de bare sunt generate ca SVG inline de codificatoare în TypeScript pur din `B1Checkin/src/helpers/barcode.ts` — tabelele de modele Code 39 și tabelele de lățimi Code 128 (set de caractere B cu sumă de control mod-103), plus QR prin pachetul `qrcode`. **Aceste codificatoare sunt duplicate intenționat în B1Admin** (`LabelEditor.tsx` include aceleași tabele, menționat într-un comentariu de cod), pentru ca previzualizările din editor să fie fidele pixel cu pixel față de ieșirea kioscului; o modificare la unul trebuie reflectată și în celălalt.

Conducta de tipărire (`src/components/PrintUI.tsx`) randează fiecare etichetă HTML într-un `WebView`, o capturează ca JPG prin `react-native-view-shot` și transmite URI-urile imaginilor modulului nativ Expo **printer-helper** (`B1Checkin/modules/printer-helper/`). Modulul expune `scan()`, `checkInit()`, `printUris()` și evenimente de stare, cu un provider pentru fiecare marcă pe ambele platforme:

| Marcă | Android | iOS | Note |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (SDK-ul de tipărire Brother) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Imprimante de rețea din seria QL (QL-800/810W/820NWB/1100/1110NWB…), etichete decupate de 29×90, varianta recomandată implicit |
| Zebra | `ZebraProvider.kt` (SDK Link-OS) | `ZebraProvider.swift` + `ZebraBridge` | Descoperire în rețea + tipărire de imagini TCP/ZPL |

Alegerea imprimantei se face în `app/printers.tsx` (scanarea rețelei returnează intrări `brand~model~ip`; alegerea se salvează în AsyncStorage), iar `src/helpers/PrinterLog.ts` păstrează un jurnal de diagnostic pe dispozitiv, afișat printr-un indicator de stare live în antetul kioscului.

## Înregistrarea oaspeților

Două căi creează o persoană în timpul check-in-ului:

- **La kiosc** — butonul „Add guest” de pe ecranul gospodăriei deschide `B1Checkin/app/addGuest.tsx`, care caută mai întâi `GET /membership/people/search?term=` o potrivire existentă, care nu este membru, iar dacă nu găsește nimic creează o persoană nouă cu `POST /membership/people`, atașată la gospodăria curentă. Oaspetele trece apoi prin atribuirea grupului ca orice membru.
- **Self-serve prin QR** — când setarea bisericii `enableQRGuestRegistration` este activată (configurată în setările Check-In din B1Admin și citită din `GET /membership/settings/public/{churchId}`), ecranul de căutare al kioscului afișează un cod QR care duce la `https://{subdomain}.b1.church/guest-register?serviceId=`. Pagina B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) permite unei familii în vizită să se înregistreze singură de pe telefonul propriu, prin endpoint-ul anonim `POST /membership/people/guest-register`, menținând coada de la kiosc în mișcare. Fereastra codului QR are și un buton **Register here**, care deschide aceeași pagină pe kiosc (`app/guestRegister.tsx`) într-un `WebView` incognito, fără cache; `src/helpers/GuestRegisterHelper.ts` construiește URL-ul atât pentru QR, cât și pentru WebView și blochează navigarea în afara adresei `https://{subdomain}.b1.church/guest-register`. Ecranul revine la căutare la **Done**, la înapoi sau după 120 de secunde de inactivitate (tastarea în formular este transmisă din WebView ca activitate), demontând WebView-ul, astfel încât datele unei familii nu ajung niciodată la următoarea.

Înregistrarea prin QR este condusă de setările bisericii salvate din cardul **QR Guest Registration** din B1Admin (`src/mobile/CheckInPage.tsx`):

| Setare | Vizibilitate | Scop |
|---|---|---|
| `enableQRGuestRegistration` | publică | Comutator de activare pentru QR-ul de la kiosc și endpoint-urile anonime |
| `guestRegistrationFields` | publică | Hartă JSON de `email`, `phone`, `address`, `birthDate`, `gender`, `maritalStatus`, `grade`, `comments` → `"off"` / `"optional"` / `"required"`. Implicit: emailul și telefonul sunt opționale, restul dezactivate. Prenumele și numele sunt întotdeauna obligatorii |
| `guestRegistrationImage` | publică | URL-ul fotografiei de antet; B1App o afișează 16:9 în locul pictogramei, pe formular și pe ecranul de confirmare |
| `guestRegistrationGroupId` | privată | Grupul la care este adăugat fiecare înscris (oaspeții nu îl văd și nu îl pot alege) |
| `guestRegistrationRecordAttendance` | privată | `"true"` pentru a înregistra și prezența la acel grup |

`src/components/checkin/GuestRegister.tsx` din B1App preia lista de verificare de la endpoint-ul anonim `GET /membership/people/guest-register/options?churchId=` și afișează doar câmpurile incluse (email, telefon, stare civilă și adresă pentru persoana de contact principală; data nașterii, genul și clasa pentru fiecare membru; o singură casetă de comentarii), trimițând doar acestea. Serverul reaplică lista de verificare în `GuestRegistrationHelper.sanitize()` — câmpurile dezactivate sunt eliminate, iar valorile obligatorii lipsă sau în afara listei produc un 400 — înainte ca `PersonHelper.registerGuestHousehold()` să ruleze. Mai întâi apelează `PersonRepo.findGuestMatch()` pentru fiecare membru cu email sau telefon: exact o persoană activă cu același prenume și același email sau aceleași cifre de telefon este reutilizată (zero sau mai multe potriviri creează o persoană nouă, deci nu ghicește niciodată). Un membru fără date de contact este potrivit după prenume în interiorul gospodăriei potrivite. Persoanele reutilizate nu sunt niciodată modificate, astfel încât un formular anonim nu poate suprascrie datele stocate, iar răspunsul repetă numele trimise. Membrii nepotriviți se alătură gospodăriei potrivite sau unei gospodării noi, cu `membershipStatus: "Visitor"`, emițând `person.created` pentru fiecare persoană nouă. Ulterior, eșecurile sunt înregistrate în jurnal, nu returnate: membrii sunt adăugați în grupul configurat (`group.member.added`); dacă înregistrarea prezenței este activă, `AttendanceModuleGateway.recordAttendance()` marchează fiecare membru prezent pentru fiecare oră de serviciu a grupului care are program și a cărei fereastră de check-in (`CheckinGateHelper.isServiceTimeOpen`) este deschisă chiar în acel moment, creând sesiunea pentru data de azi, după data locală a bisericii, dacă este nevoie — orele neprogramate și înscrierile din afara ferestrei nu înregistrează nimic; iar comentariile devin o conversație ascunsă de notă despre persoană pentru capul gospodăriei (autorul mesajului „Guest sign-up”), legată prin `person.conversationId`.

## Pagini conexe

- [Endpoint-uri Attendance](../api/endpoints/attendance) -- Suprafața REST completă pentru campusuri, servicii, sesiuni, vizite și vizite-sesiuni
- [Endpoint-uri Membership](../api/endpoints/membership) -- Persoane, gospodării și grupuri
- [Webhook-uri](../api/webhooks) -- Evenimentele `session.created`, `attendance.recorded` și `attendance.checkout`
- [Structura modulului](../api/module-structure) -- Cum este organizat modulul attendance pe server
