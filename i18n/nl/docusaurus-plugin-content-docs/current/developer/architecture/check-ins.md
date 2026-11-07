---
title: "Check-ins"
description: "Hoe inchecken werkt in B1Checkin, B1App en B1 Admin: het aanwezigheidsdatamodel, groepen als ruimten, capaciteitsgrenzen en regels voor veilig ophalen."
---

# Check-ins

<div class="article-intro">

Check-in is één systeem met drie ingangen: de B1Checkin-kioskapp voor bemande en zelfbediening-stations, zelf inchecken in het ledenportaal van B1App, en aanwezigheidsregistratie aan de beheerkant in B1Admin. Alle drie schrijven naar dezelfde aanwezigheidsmodule in de core Api, en de routering naar lokalen wordt volledig bepaald door Groepen. Er is geen aparte entiteit voor "locaties" of "ruimtes". Daarbovenop zit een laag voor kinderveiligheid: check-intypen per bezoek, capaciteits- en vrijwilligersratiocontroles aan de serverzijde, leeftijds- en klascontroles op de kiosk, geverifieerd ophalen bij het uitchecken, en ouderoproepen via de sms-provider van de kerk. Deze pagina beschrijft het datamodel, de check-in-stromen, de veiligheidslaag en de pijplijn voor het printen van labels.

</div>

## Overzicht

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

| Oppervlak | Repository | Stack | Rol |
|-----------|------------|-------|-----|
| Kiosk | `B1Checkin` | Expo / React Native, bestandsgebaseerde routering met expo-router; EAS-builds voor Android, Amazon Fire en iOS; OTA-updates via `expo-updates` | Bemand of zelfbediening-station met labelprinten en geverifieerd uitchecken |
| Zelf inchecken | `B1App` | Next.js (ledenportaal b1.church) | Ingelogde leden checken hun huishouden in vanaf een telefoon; geen printen |
| Admin | `B1Admin` | React SPA | Configureert de dienststructuur, wijst groepen toe aan dienstijden, ontwerpt labels, registreert handmatige aanwezigheid en draait rapporten |

Alle drie roepen dezelfde twee API-modules aan via `ApiHelper`: **MembershipApi** (`/membership`) voor personen, huishoudens en groepen, en **AttendanceApi** (`/attendance`) voor alles hieronder.

## Datamodel (`Api/src/modules/attendance`)

| Entiteit / tabel | Belangrijke velden | Betekenis |
|------------------|--------------------|-----------|
| `campuses` | name, address | Verouderd op deze plek. Campussen worden beheerd in de membership-module (`/membership/campuses`); de kopie in de attendance-module is bevroren en alleen-lezen voor oudere lezers (`models/Campus.ts`) |
| `services` | campusId, name | Een terugkerende samenkomst, bijvoorbeeld "Zondagochtend" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Een tijdslot binnen een dienst, bijvoorbeeld "9:00" (`models/ServiceTime.ts`). De roosterkolommen zijn optioneel (migratie `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) en bepalen het [check-invenster](#scheduled-check-in-windows) |
| `groupServiceTimes` | groupId, serviceTimeId | Koppeltabel: welke groepen (lokalen) op welke dienstijden samenkomen (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Eén bijeenkomst van één groep op één datum. Wordt lui aangemaakt op het moment van inchecken (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Eén persoon die op één datum aanwezig is (`models/Visit.ts`). `checkinType` is `member` / `guest` / `volunteer` (NULL = verouderd lid). Wordt ingesteld door de kiosk en gebruikt door de capaciteits- en ratiocontroles |
| `visitSessions` | visitId, sessionId | Welke sessie(s) een bezoek dekt. Een kind dat op twee dienstijden is ingecheckt, krijgt twee rijen (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON-blokken) | Ontwerpbare labelindelingen (`models/LabelTemplate.ts`) |

### Hoe een voltooide check-in wordt opgeslagen

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) verwerkt `POST /attendance/visits/checkin?serviceId=&peopleIds=`. De body is een array van `Visit`-objecten. Elk object bevat `visitSessions` waarvan de ingebedde `session` alleen een paar `(serviceTimeId, groupId)` aanduidt. De server doet daarna het volgende:

1. **Controleert capaciteit en ratio's vóór elke schrijfactie.** `evaluateGates()` → `CheckinGateHelper.evaluate()` controleert voor elke betrokken ruimte de capaciteit, gastcapaciteit, de gesloten-vlag en de vrijwilligersratio ten opzichte van de huidige bezetting. postCheckin is **niet transactioneel**, dus de controle moet vóór de eerste opslag plaatsvinden. Een harde overtreding geeft een 409 terug met de betrokken ruimte(n), en er wordt niets opgeslagen. Zie [Capaciteits- en vrijwilligersratiocontroles](#capacity-and-volunteer-ratio-gates).
2. **Lost sessies lui op.** `getSessionId()` zoekt de rij in `sessions` voor `(groupId, serviceTimeId, vandaag)` of maakt die aan. Sessie-ids worden per datum in het proces gecachet. Nieuwe sessies sturen een `session.created`-webhook. De lus is een `for..of` met `await`. Een eerdere fire-and-forget `forEach(async …)` liep gelijk op met de opslag en schreef NULL-sessionIds weg bij het aanmaken van de eerste sessie. Dit is opgelost en staat vermeld in een codecommentaar bij de lus.
3. **Vervangt de records van die dag.** Bestaande bezoeken van die personen bij die dienst vandaag worden verwijderd, samen met hun visitSessions. Daarna wordt de ingediende set opgeslagen. Opnieuw inchecken van een gezin is daardoor een idempotente handeling ("dit is de huidige stand"), geen toevoeging. Met `?checkDuplicates=true` geeft de server `{ duplicates: [personId…] }` terug zonder iets op te slaan. Zo waarschuwt de kiosk voordat er wordt overschreven.
4. **Genereert één beveiligingscode per batch.** `SecurityCodeHelper.generate()` maakt een code van 4 tekens uit het alfabet `23456789BCDFGHJKLMNPQRSTVWXYZ`. Dit alfabet bevat geen klinkers en geen dubbelzinnige tekens, zodat codes geen woorden kunnen vormen en niet verkeerd gelezen worden. Bij een botsing met de openstaande bezoeken van dezelfde kerk op dezelfde dag probeert de server het opnieuw. De code wordt op elk bezoek in de batch gezet.
5. **Geeft `{ streaks, securityCode }` terug.** `streaks` koppelt een personId aan het aantal opeenvolgende weken aanwezigheid. De kiosk viert mijlpalen (elke 5e week) met confetti.

Elk opgeslagen bezoek stuurt ook een `attendance.recorded`-webhook. De leeskant, `GET /attendance/visits/checkin`, geeft de bezoeken van de personen terug vanaf hun **laatst geregistreerde datum**. Als dat een vorige week was, worden de ids verwijderd. De client krijgt dan een vooraf ingevulde kopie van de groepskeuzes van vorige week, die als nieuwe records worden opgeslagen.

### Uitchecken

Twee endpoints sluiten de cyclus af (`VisitController`):

- `GET /attendance/visits/code/:code`: de bezoeken van vandaag die nog niet zijn uitgecheckt en die deze beveiligingscode dragen, met de sessies ingevuld.
- `POST /attendance/visits/checkout`: body `{ visitIds, checkedOutBy?, checkedOutById? }`. Zet `checkoutTime` en wie het kind heeft opgehaald, en stuurt per bezoek een `attendance.checkout`-webhook.

Rechten: kiosken authenticeren met `attendance.checkin`. Dat recht geeft precies het oppervlak voor in- en uitchecken en voor labelsjablonen, plus de huishoudopzoekingen die een kiosk nodig heeft zonder `people.view` (zoeken op telefoon of naam, huishoudleden in het check-in-model, en de lijst met ophaalpersonen van het huishouden). B1Checkin's `SessionHelper.filterChurches` toont alleen kerken waar het account `Attendance/Checkin` of `Attendance/Edit` heeft. `Checkin` hoort niet meer bij de rechten van iedereen (null-rol) (`RoleHelper` en migratie `2026-11-01_remove_everyone_checkin`). Het moet dus via een echte rol worden toegekend. `attendance.view` en `attendance.edit` dekken rapportage en handmatige invoer. De structuur (diensten, dienstijden, groepstoewijzingen) vereist `services.edit`. Zelf inchecken door leden (B1App) vereist geen enkel recht: elke ingelogde gebruiker met een gekoppelde persoon in de kerk mag `GET`/`POST /attendance/visits/checkin` aanroepen. De server beperkt de ingediende `personId`s tot het eigen huishouden van de aanroeper (anders 403). Deze afscherming zorgt ervoor dat de `securityCode`s van andere gezinnen onleesbaar blijven. Lidmaatschap is de toegang. Of leden de functie *zien*, wordt bepaald door de navigatietabbladen van B1App van de kerk. De overige check-in-endpoints (`code/:code`, `checkout`, `guardians`, `CheckinController`) blijven alleen voor kiosken en medewerkers.

## Groepen bepalen de routering naar lokalen

Nergens in het systeem bestaat een entiteit voor ruimtes of lokalen. Een "ruimte" is een ledengroep met `trackAttendance` ingeschakeld, gekoppeld aan een of meer dienstijden via `groupServiceTimes`. De groepsvelden (in `Api/src/modules/membership/models/Group.ts`) die het gedrag op de kiosk bepalen:

| Veld | Effect |
|------|--------|
| `trackAttendance` | De groep doet in het geheel mee aan aanwezigheidsregistratie. De installatieboom in B1Admin markeert `trackAttendance`-groepen zonder `groupServiceTimes`-rij als niet-toegewezen |
| `parentPickup` | Markeert een kinderruimte. Inchecken in zo'n ruimte maakt het bezoek een "kind"-bezoek. Dat print een labelkaart voor het ophalen door het gezin en zet de beveiligingscode op het naamlabel |
| `printNametag` | Of check-ins bij deze groep überhaupt een naamlabel printen |
| `capacity` / `guestCapacity` / `checkinClosed` | Capaciteitslimieten van de ruimte en een harde "gesloten"-schakelaar. Worden aan de serverzijde afgedwongen door de check-in-controle (te bewerken in B1Admin bij de groepsinstellingen onder "Check-In Capacity") |
| `volunteerRatio` / `minVolunteers` | Verhouding kinderen per vrijwilliger en minimaal aantal vrijwilligers. Wordt afgedwongen volgens de kerkbrede instelling `ratioEnforcement` |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Grenzen voor leeftijd en klas. Worden op de kiosk geëvalueerd om ruimtes te markeren of te dimmen |

Elke client denormaliseert op dezelfde manier (bijvoorbeeld `B1Checkin/app/services.tsx` en `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`). Ze laden parallel `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` en `GET /membership/groups`. Voor elke dienstijd verzamelen ze vervolgens de groepen waarvan de `groupServiceTimes`-rij naar die dienstijd wijst, in `serviceTime.groups`. Die array is wat de ruimtekiezer toont, gegroepeerd op de `categoryName` van de groep.

Toewijzingen worden bewerkt op de groepspagina in B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx`, via `POST`/`DELETE /attendance/groupservicetimes`). De volledige boom Campus → Dienst → Dienstijd → Groep wordt gevisualiseerd in `B1Admin/src/attendance/components/AttendanceSetup.tsx` via `GET /attendance/attendancerecords/tree`.

:::info
Omdat groepen de enige bron van waarheid zijn, voedt hetzelfde groepslidmaatschap de routering op de kiosk, het aanwezigheidsoverzicht per groep in B1Admin en de aanwezigheidsrapportage. Een groep aan een dienstijd toewijzen is de enige stap die nodig is om die groep een check-in-bestemming te maken.
:::

## Kinderveiligheid

### Check-intypen

Elk bezoek heeft een `checkinType`: `member`, `guest` of `volunteer`. NULL betekent verouderd of lid. Zie migratie `tools/migrations/attendance/2026-07-03_checkin_type.ts`. Het type wordt **op de kiosk** gekozen, via de chips Lid / Gast / Vrijwilliger op de uitgeklapte rij van het lid (`B1Checkin/src/components/MemberServiceTimes.tsx`). Het wordt bij het voltooien op elk openstaand bezoek gezet (`app/checkinComplete.tsx`, standaard `member`). De server gebruikt het in de controle: vrijwilligers tellen mee voor de ratiodekking in plaats van voor de capaciteit, en gasten tellen mee voor `guestCapacity`.

### Capaciteits- en vrijwilligersratiocontroles

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) draait binnen `postCheckin` vóór elke opslag. Het endpoint is niet transactioneel, dus de controle vóór het opslaan is het correctheidsmechanisme. Per betrokken groep laadt de functie de huidige bezetting (`VisitRepo.countActiveByGroupToday`) en de groepsconfiguratie via de gateway van de membership-module. Daarna classificeert ze de overtredingen:

- **Hard (blokkeert altijd):** `checkinClosed`, `huidig + inkomend > capacity`, of het aantal gasten is hoger dan `guestCapacity`. De batch wordt geweigerd met `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }`. De kiosk toont de genoemde ruimte.
- **Ratio (waarschuwen of blokkeren):** inkomende niet-vrijwilligers in een ruimte waar `volunteers < minVolunteers`, waar helemaal geen vrijwilligers zijn, of waar `children > volunteers × volunteerRatio`. De ernst volgt de instelling `ratioEnforcement` per kerk (`"warn"` is de standaard, `"block"` is de andere optie). Te bewerken in B1Admin via Manage Church → Check-In (`CheckinSettingsEdit.tsx`). In de waarschuwingsmodus geeft de server `409 { warning: true, error: "ratio", … }` terug, tenzij de client opnieuw indient met `acknowledgeWarnings=true`. Dat opnieuw indienen is de bevestigingsoverride van de medewerker op de kiosk.

### Geplande check-invensters

Een dienstijd kan een optioneel wekelijks rooster hebben: `dayOfWeek` van 0 tot 6 (0 = zondag), `startTime`/`endTime` als `HH:mm`, `checkinOpenMinutes` en `checkinCloseMinutes`. Dit wordt bewerkt in het formulier voor dienstijden onder **Attendance → Setup** in B1Admin ("Check-in Schedule", `B1Admin/src/attendance/components/ServiceTimeEdit.tsx`). `CheckinGateHelper.hasSchedule()` beschouwt een dienstijd alleen als gepland wanneer zowel `dayOfWeek` als `startTime` zijn ingevuld. Dienstijden zonder rooster worden nooit op tijd afgeschermd. `isServiceTimeOpen()` berekent het venster in lokale kerktijd (`DateHelper.toChurchTime`). De tijdzone wordt per dienstijd bepaald door `CheckinTimeZoneHelper.load()` (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`). Eerst komt de `timezone` van de campus van de dienst (`service.campusId`, via `MembershipModuleGateway.loadCampusTimeZones`). Daarna volgt de `timeZone` van de kerk (ingesteld bij Church Information in B1Admin), dan de eerste niet-verwijderde campus met een `timezone` (`loadCampusTimeZone`), en pas als laatste `America/New_York`. De campus gaat voor omdat veel kerken `America/New_York` als kerktijdzone hebben gekregen via een achteraf uitgevoerde migratie. De lijst- en de postroute hieronder bepalen de tijdzone op dezelfde manier. Het venster loopt van `checkinOpenMinutes` vóór de start tot `checkinCloseMinutes` na het einde (of na de start als er geen einde is). Vensters die over middernacht of over de weggrens lopen, worden correct afgehandeld.

Het venster wordt op twee plaatsen afgedwongen:

- **Lijst:** `GET /attendance/servicetimes` voegt aan elke rij een berekende boolean `checkinOpen` toe. Het zelf inchecken in B1App (`CheckinPage.tsx`) en de dienstkiezer van B1Checkin (`app/services.tsx`) tonen alle tijden. Als alle tijden van een dienst gesloten zijn, tonen ze de eerstvolgende opening: "Check-in opent zo 9:30." in B1App en "Check-in voor deze dienst opent zo 9:30." in B1Checkin. Dit komt van `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`. Als er geen opening berekend kan worden, staat er "Check-in is op dit moment niet open voor deze dienst." (De kiosk biedt dan een knop Terug om een andere dienst te kiezen.) Gesloten tijden worden verder weergegeven als een niet-selecteerbare rij "Gesloten" of "Gesloten · opent 9:30". Het huishoudscherm van B1Checkin (`MemberServiceTimes.tsx`) controleert de openheid live op de klok van het apparaat met `ServiceTimeHelper.isCheckinOpen()`. Dit gebruikt de tijdzone van het apparaat, niet die van de kerk. Zo gaat een kiosk die blijft draaien op de juiste tijd open en dicht. Bij een gesloten tijd waarvoor de persoon al is ingecheckt, toont het scherm "Kinderruimte 1 · Ingecheckt" (groepsnaam).
- **Versturen:** binnen `evaluateGates()` wijst `findClosedServiceTimeGroups()` de batch af met `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }`. Dat gebeurt als de dienstijd van een betrokken sessie buiten het venster valt. Omdat de bestaande bezoeken van een huishouden voor vandaag bij elke check-in opnieuw worden verstuurd, slaan sessies die de persoon al heeft (`personId|sessionId` in de bestaande bezoeken) deze controle over. Zo wordt het toevoegen van een latere open dienstijd niet geweigerd omdat een eerder venster is gesloten. B1Checkin toont dit via het harde-blokkeringsscherm met de reden "check-in is op dit moment niet open". Capaciteitsoverschrijdingen blijven de tekst "ruimte is vol of gesloten" tonen.

### Leeftijds- en klascontrole (op de kiosk)

Het geschiktheidscheck voor ruimtes is een adviserende UI-functie die op de kiosk wordt uitgevoerd. De server dwingt het niet af. `B1Checkin/src/helpers/EligibilityHelper.ts` vergelijkt de geboortedatum en klas van een persoon met de `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` van de groep. De klasvolgorde is PreK, K, 1 t/m 12, Graduated. Het resultaat is `eligible`, `ineligible` of `unknown`. Ontbrekende gegevens leveren `unknown` op en verbergen nooit een ruimte. Leeftijden en klassen worden berekend op de **datum van klasverhoging** van de kerk (instelling `gradePromotionDate`, formaat `"MM-DD"`, te bewerken in `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`). De kiosk haalt die op via `GET /attendance/checkin/settings`. `resolveAsOfDate` kiest de meest recente datum die op of vóór vandaag valt. De ruimtekiezer markeert geschikte ruimtes en dimt ongeschikte. Wie een gedimde ruimte kiest, heeft een bevestiging van een medewerker nodig.

### Vertrouwde en niet-toegestane ophaalpersonen

Ophaalpersonen zijn een membership-entiteit per huishouden: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts`, met householdId, optioneel personId, naam, photoUrl, relationship, `status` `trusted` / `notAuthorized`, en notities). Het CRUD bestaat uit `GET /membership/householdpickup/:householdId` (voor elke ingelogde kerkgebruiker, zodat kiosken het kunnen lezen) en `POST` / `DELETE`, beveiligd met `people.edit`. Medewerkers beheren de lijst op de kaart **Pickup** van de personenpagina (`B1Admin/src/people/components/PickupPeople.tsx`): foto, relatie en een chip met de status Vertrouwd of Niet toegestaan.

Bij het uitchecken (`B1Checkin/app/checkout.tsx`) laadt de kiosk de ophaallijst van het huishouden. Items met status `trusted` verschijnen als aantikbare ophaalkaarten naast het raster met foto's van de volwassenen uit het huishouden. Een vrij ingevoerde naam onder "Anders" wordt vergeleken met de items `notAuthorized`, met fuzzy matching (Levenshtein, `src/helpers/PickupMatchHelper.ts`). Een treffer blokkeert het uitchecken met een waarschuwingsblad en een knop **Negeren** voor medewerkers. De override wordt op het bezoek zelf vastgelegd. Het stuurt `checkedOutBy` als `"OVERRIDE: {name}"` mee via het normale `POST /attendance/visits/checkout`. Zo komt het terecht in de aanwezigheidsregistratie en in de webhook `attendance.checkout`, en niet in een aparte auditlijst.

### Ouders oproepen en noodmelding

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) biedt twee sms-endpoints:

- `POST /page`: `{ visitId, message }`. Pagina't de voogden van één ingecheckt kind (uitcheckscherm van de kiosk, bemande modus).
- `POST /broadcast`: `{ serviceId, message }`. Stuurt een sms naar de volwassenen van elk ingecheckt huishouden voor een dienst (kioskbeheer, achter een bevestigingsblad van type `EMERGENCY` in `B1Checkin/app/adminSettings.tsx`).

Beide routes zoeken de volwassenen van het huishouden op via de membership-gateway. Daarna geven ze de verzending door aan **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`). Dat is de doorgang tussen modules naar de sms-provider van de kerk (`@churchapps/texting`: TextInChurch, Clearstream of MutualMinistry). Er is geen ingebouwde sms-verzender. De gateway schrijft een rij `sentText` en per ontvanger een `deliveryLog`-item, en beperkt een batch tot 500 ontvangers. Zonder geconfigureerde provider geeft hij `no_provider` terug. De kiosk toont dat als "Geen sms-provider ingesteld". De `dispatch()`-methode van de controller ontdubbelt telefoonnummers en slaat personen over zonder mobiel nummer of met `optedOut`. Hij geeft `{ sent, failed, skippedOptedOut, skippedNoPhone }` terug, zodat de kiosk kan tonen wat is overgeslagen.

## De kiosk (B1Checkin)

De schermen zijn expo-router-bestanden in `B1Checkin/app/`. Gedeelde status tussen schermen staat in een statische klasse `CachedData` (`src/helpers/CachedData.ts`) en niet in React-state.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Zoeken** (`app/lookup.tsx`): zoek op telefoonnummer (`GET /membership/people/search/phone?number=`, laatste 4 of volledig) of op naam (`GET /membership/people/search?term=`). Als je een treffer kiest, laadt het scherm het huishouden (`GET /membership/people/household/{householdId}`) en de bestaande bezoeken (`GET /attendance/visits/checkin`). Daarmee worden de `pendingVisits` gevuld met de keuzes van vorige week.
2. **Huishoudoverzicht** (`app/household.tsx`, `src/components/MemberList.tsx`): elke ledenrij toont een badge "al ingecheckt", een badge voor allergie of `nametagNotes`, en de huidige ruimtechips. Wie een lid uitklapt, ziet elke dienstijd met een ruimteknop en de chips Lid / Gast / Vrijwilliger voor het check-intype (`MemberServiceTimes.tsx`). Onder elke naam van een dienstijd toont `ServiceTimeHelper.getGroupSummary()` de groepen die daar worden aangeboden. Dat zijn de namen uit `serviceTime.groups`, zonder spaties aan de randen, zonder dubbelen (hoofdletterongevoelig), gescheiden door komma's. Als de tijd geen groepen heeft, wordt er niets getoond.
3. **Groepstoewijzing** (`app/selectGroup.tsx`): een categorieboom op basis van `serviceTime.groups`. Ruimtes waarvoor de leeftijd of klas past, worden gemarkeerd. Ongeschikte ruimtes worden gedimd en vereisen een bevestiging van een medewerker (zie [Leeftijds- en klascontrole](#agegrade-eligibility-kiosk-side)). Als je een ruimte kiest, schrijft het scherm een visitSession `{ session: { serviceTimeId, groupId } }` naar het openstaande bezoek van die persoon (`src/helpers/VisitSessionHelper.ts`). "Geen" wist de keuze.
4. **Voltooien** (`app/checkinComplete.tsx`): `POST /attendance/visits/checkin` met de `pendingVisits`. Elk bezoek krijgt zijn `checkinType` mee. Daarna worden labels geprint als er een printer is ingesteld, en keert het scherm automatisch terug naar zoeken. Een `409` met de reden capaciteit of `notOpen` toont de genoemde ruimte met de reden (vol of gesloten, of check-in niet open). Bij een ratiowaarschuwing biedt het scherm een bevestiging voor de medewerker die opnieuw indient met `acknowledgeWarnings=true`.

Het scherm **uitchecken** (`app/checkout.tsx`) neemt de beveiligingscode van 4 tekens in via een automatisch gefocust invoerveld. Daardoor werken USB- en Bluetooth-barcodescanners die als toetsenbord werken, zonder camera. Ook kan de code worden ingevoerd op een schermtoetsenbord met hetzelfde alfabet. Bij 4 tekens wordt automatisch verzonden. Een knop **Scannen** opent een blad met de gedeelde camera `src/components/CodeScanner.tsx` (standaard de achtercamera, en QR-, Code 128- en Code 39-codes worden herkend). Zo kunnen stations zonder barcodescanner het ophaallabel lezen. Een gescande code gaat via dezelfde `handleCode()`-route als getypte invoer. Het scherm zoekt de code op, toont de kinderen die worden opgehaald, en toont de **vertrouwde ophaalpersonen** van het huishouden als aantikbare kaarten, naast een fotoraster van de volwassenen uit het huishouden. Daar komt een optie "Anders" met vrije tekst bij, die fuzzy wordt vergeleken met de namen die niet zijn toegestaan (zie [Vertrouwde en niet-toegestane ophaalpersonen](#trusted-and-not-authorized-pickup)). Daarna wordt `POST /attendance/visits/checkout` verzonden met de naam en het id van de gekozen persoon. In de bemande modus biedt het scherm ook **Ouder oproepen** (`POST /attendance/checkin/page`) en **opnieuw afdrukken van het beveiligingslabel**. `reprint()` bouwt de labels van het gezin opnieuw met `LabelHelper.getAllLabelsFor(...)` en stuurt ze door dezelfde `PrintUI`-pijplijn als bij het inchecken.

De stationsmodus is een vlag in AsyncStorage: `@StationMode` (`"self"` of `"manned"`), in te stellen in `app/adminSettings.tsx`. De bemande modus voegt het uitchecken toe aan het zoekscherm en maakt het mogelijk om profielen van leden te bewerken (`POST /membership/people`) vanuit het huishoudscherm. De kiosk heeft ingebouwde beveiliging. Een optionele pincode (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) beschermt het beheer- en printerscherm. Het beheerscherm opent alleen na 7 snelle tikken op het logo in de koptekst. Tussen gezinnen in neemt een inactief startscherm over (`src/hooks/useInactivityTimer.ts`).

## Zelf inchecken (B1App)

Leden checken in via de portal b1.church, op het scherm `/mobile/checkin`. `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` stuurt dat door naar `screens/CheckinPage.tsx`. Er is een ingelogde gebruiker nodig. Het scherm doorloopt dezelfde vier stappen als de kiosk: diensten, huishouden, groepen en voltooien. Daarvoor gebruikt het dezelfde endpoints, met de status in `B1App/src/helpers/CheckinHelper.ts`. Verschillen met de kiosk: het huishouden komt van de `householdId` van de ingelogde gebruiker (er is geen zoekstap), en er wordt niets geprint. In plaats daarvan toont het voltooiingsscherm de beveiligingscode van de batch als QR-code (`qrcode.react`), met de tekst "toon dit bij een check-instation". Als het huishouden al is ingecheckt wanneer de pagina laadt, toont een knop "Toon check-in-code" de QR-code opnieuw. Die komt uit het eerste bestaande bezoek (uit `GET /attendance/visits/checkin`) dat een `securityCode` heeft. De check-in wordt direct bij het versturen vastgelegd. Er is geen tussenstand. De QR-code is alleen nodig om labels te printen op de kiosk.

**Labels printen vanaf de telefoon naar de kiosk** (`B1Checkin/app/scan.tsx`, bereikbaar via de knop "Code scannen" bij de QR-code op het zoekscherm): de kiosk toont `CodeScanner` (een `CameraView` van `expo-camera`, standaard de voorcamera, en omschakelbaar) en scant op QR-codes. `ScanCodeHelper.parse()` accepteert alleen een losse code van 4 tekens uit het beveiligingsalfabet. `ScanCodeHelper.isRepeat()` negeert dezelfde code gedurende 4 seconden. Zo werken zowel de QR-code van B1App als het QR-blok op een afgedrukt label. Het scherm volgt daarna het pad voor opnieuw afdrukken bij het uitchecken: `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI`. Daarna keert het terug naar zoeken. Bij het scannen wordt niets in de aanwezigheidsregistratie geschreven. Het gaat alleen om labels. Codes zonder actieve bezoeken, stations zonder printer en groepen zonder labels geven elk een melding en keren terug naar zoeken.

De typen en `ApiHelper`/`ArrayHelper` komen uit `@churchapps/helpers` en `@churchapps/apphelper`. Er worden geen React-componenten gedeeld met B1Admin.

## Aanwezigheid aan de beheerkant (B1Admin)

- **Setup:** `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) toont de structuurboom en maakt diensten (`ServiceEdit.tsx`) en dienstijden (`ServiceTimeEdit.tsx`) aan. De campusgegevens komen uit membership via de hook `useCampuses()`.
- **Handmatige aanwezigheid** staat bij de groepen en niet in het aanwezigheidsgedeelte. `B1Admin/src/groups/components/GroupSessionsTab.tsx` maakt sessies aan (`POST /attendance/sessions`). Bij het toevoegen kan `SessionEdit.tsx` één sessie opnemen per andere groep die de gekozen dienstijd deelt. Groepen die op die datum al een sessie hebben, worden overgeslagen. Personen worden aanwezig gemarkeerd via `POST /attendance/visitsessions/log`. Dat zoekt het bezoek van die persoon en die sessie, of maakt het aan. Groepsleiders kunnen aanwezigheid registreren voor hun eigen groepen zonder het recht `attendance.edit`. De controllers controleren daarvoor `au.leaderGroupIds`.
- **Rapportage:** trends in aanwezigheid en aanwezigheid per groep zijn rapporten die door de server worden gedefinieerd (`B1Admin/src/components/reporting/ReportWithFilter.tsx` tegen ReportingApi, definities in `Api/reports/*.json`). Beide nemen `startDate` en `endDate` (de einddatum is inbegrepen). Het trendrapport toont standaard het jaar tot vandaag en voegt een kolom `sessionDates` per week toe. De boom op het scherm van aanwezigheid per groep bevat voor elk bezoek de `checkinTime` en de `membershipStatus` van de persoon. Het CSV-bestand van aanwezigheid per groep komt uit het bijbehorende rapport `groupAttendanceDownload`. `GroupAttendanceDownloadHelper` draait dat om naar één rij per groepslid, met een kolom aanwezig/afwezig per datum. De geschiedenis per persoon is beschikbaar via `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Labels printen

### Sjablonen en de ontwerper

Kerken ontwerpen hun eigen labels in B1Admin op `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` en `components/LabelEditor.tsx`). Je bereikt het via de pagina Check-In-instellingen. Een sjabloon is een rij in `labelTemplates` waarvan `content` een JSON-array van blokken is: `text`, `field`, `barcode`, `qrcode` of `box`. Elk blok staat met procentuele coördinaten gepositioneerd en heeft lettertype, uitlijning, symbologie (`code39`/`code128`/`qr`) en eventueel zichtbaarheidsvoorwaarden. Bijvoorbeeld: het allergiekader alleen tonen als `person.nametagNotes` niet leeg is. Er bestaan twee `labelType`s. `nametag` is er één per ingecheckte persoon, met velden als `person.displayName`, `sessions`, `securityCode` en `person.isBirthdayWeek`. Die laatste is `"true"` wanneer de maand en dag van de verjaardag binnen 3 dagen van vandaag liggen, ook over de jaarwisseling heen (`LabelHelper.isBirthdayWithin()`). `pickup` is er één per gezin, met velden als `children` en `childrenAllergies`. De server dwingt per kerk en per type één standaardsjabloon af (`LabelTemplateController.save`). De ontwerper bevat startsjablonen die de gebundelde labels van de kiosk nabootsen. Een voorbeeld wordt getoond met voorbeeldgegevens.

### Weergave en printen op de kiosk

Bij het voltooien van de check-in bepaalt `B1Checkin/src/helpers/LabelHelper.ts` wat er geprint wordt, aan de hand van de groepsvlaggen op elk openstaand bezoek. Naamlabels komen voor groepen met `printNametag`, en er is één labelkaart voor het ophalen door het gezin als een bezoek een groep met `parentPickup` heeft geraakt. Bezoeken met `checkinType` `volunteer` worden overgeslagen door `LabelHelper.selectChildVisits()`. Een kinderopvangmedewerker in een ruimte voor ouderophaal triggert dus nooit een ophaallabel. De beveiligingscode uit het check-in-antwoord komt op de naamlabels van kinderen en op het ophaallabel. Naamlabels van volwassenen worden zonder code geprint. Als de kerk sjablonen heeft, zet `LabelRenderer` (`src/helpers/LabelRenderer.ts`) de blokken en een veldcontext om in een zelfstandig HTML-document. Anders worden de gebundelde HTML-labels in `B1Checkin/assets/labels/` gebruikt, met invulling van de plaatshouders.

Barcodes worden als inline SVG gegenereerd door zuivere TypeScript-encoders in `B1Checkin/src/helpers/barcode.ts`. Dat zijn de patroontabellen voor Code 39 en de breedtetabellen voor Code 128 (codeset B met mod-103-controlegetal), plus QR via het pakket `qrcode`. **Deze encoders zijn bewust gedupliceerd in B1Admin** (`LabelEditor.tsx` neemt dezelfde tabellen over, en een codecommentaar vermeldt dat). Zo zijn de previews in de ontwerper pixelgetrouw aan de uitvoer van de kiosk. Een wijziging in de een moet dus ook in de ander worden doorgevoerd.

De printpijplijn (`src/components/PrintUI.tsx`) rendert elk HTML-label in een `WebView`, legt het vast als JPG via `react-native-view-shot` en geeft de afbeeldings-URI's door aan de native Expo-module **printer-helper** (`B1Checkin/modules/printer-helper/`). De module biedt `scan()`, `checkInit()`, `printUris()` en statusgebeurtenissen. Op beide platforms is er per merk een provider:

| Merk | Android | iOS | Opmerkingen |
|------|---------|-----|-------------|
| Brother | `BrotherProvider.kt` (Brother print-SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Netwerkprinters van de QL-serie (QL-800/810W/820NWB/1100/1110NWB…), 29×90 mm stansetiketten. Aanbevolen standaard |
| Zebra | `ZebraProvider.kt` (Link-OS-SDK) | `ZebraProvider.swift` + `ZebraBridge` | Netwerkdetectie en TCP-afdruk van afbeeldingen in ZPL |

De printerkeuze staat in `app/printers.tsx`. Een netwerkscan geeft items `brand~model~ip` terug, en de keuze wordt opgeslagen in AsyncStorage. `src/helpers/PrinterLog.ts` houdt een diagnostisch logboek op het apparaat bij. Dat wordt getoond via een statusbolletje in de koptekst van de kiosk.

## Gastregistratie

Er zijn twee manieren om midden in een check-in een persoon aan te maken:

- **Op de kiosk:** met "Gast toevoegen" op het huishoudscherm opent `B1Checkin/app/addGuest.tsx`. Eerst zoekt het via `GET /membership/people/search?term=` naar een bestaande persoon die geen lid is. Anders maakt het er een aan met `POST /membership/people`, gekoppeld aan het huidige huishouden. De gast doorloopt daarna de groepstoewijzing zoals elk lid.
- **Zelf aanmelden via QR:** als de kerkinstelling `enableQRGuestRegistration` aan staat (in te stellen bij de Check-In-instellingen van B1Admin, uitgelezen via `GET /membership/settings/public/{churchId}`), toont het zoekscherm op de kiosk een QR-code die verwijst naar `https://{subdomain}.b1.church/guest-register?serviceId=`. Die pagina van B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) laat een bezoekend gezin zich op de eigen telefoon registreren via het anonieme endpoint `POST /membership/people/guest-register`. Zo blijft de rij bij de kiosk in beweging. Het QR-blad heeft ook een knop **Hier registreren**. Die opent dezelfde pagina op de kiosk (`app/guestRegister.tsx`) in een `WebView` die incognito is en geen cache gebruikt. `src/helpers/GuestRegisterHelper.ts` bouwt de URL voor zowel de QR-code als de WebView, en blokkeert navigatie naar iets anders dan `https://{subdomain}.b1.church/guest-register`. Het scherm keert terug naar zoeken bij **Klaar**, bij terug, of na 120 seconden inactiviteit. Het typen in het formulier telt als activiteit en wordt vanuit de WebView doorgegeven. Daarna wordt de WebView losgekoppeld, zodat de gegevens van het ene gezin nooit bij het volgende terechtkomen.

De QR-aanmelding wordt aangestuurd door de kerkinstellingen die zijn opgeslagen op de kaart **QR Guest Registration** in B1Admin (`src/mobile/CheckInPage.tsx`):

| Instelling | Zichtbaarheid | Doel |
|---|---|---|
| `enableQRGuestRegistration` | openbaar | Aan/uit-schakelaar voor de QR-code op de kiosk en de anonieme endpoints |
| `guestRegistrationFields` | openbaar | JSON-map van `email`, `phone`, `address`, `birthDate`, `gender`, `maritalStatus`, `grade`, `comments` → `"off"` / `"optional"` / `"required"`. Standaard: e-mail en telefoon optioneel, de rest uit. Voor- en achternaam zijn altijd verplicht |
| `guestRegistrationImage` | openbaar | URL van een koptekstfoto. B1App toont die in 16:9 in plaats van het pictogram op het formulier en op de bevestigingspagina |
| `guestRegistrationGroupId` | privé | Groep waaraan elke aanmelding wordt toegevoegd (gasten zien of kiezen die nooit) |
| `guestRegistrationRecordAttendance` | privé | `"true"` om ook aanwezigheid voor die groep te registreren |

`src/components/checkin/GuestRegister.tsx` van B1App haalt de checklist op via het anonieme `GET /membership/people/guest-register/options?churchId=`. Het toont alleen de ingeschakelde velden: e-mail, telefoon, burgerlijke staat en adres bij de hoofdcontactpersoon, geboortedatum, geslacht en klas per lid, en één opmerkingenveld. Alleen die velden worden verstuurd. De server past de checklist opnieuw toe in `GuestRegistrationHelper.sanitize()`. Uitgeschakelde velden worden verwijderd, en ontbrekende verplichte waarden of waarden buiten de lijst geven een 400. Daarna draait `PersonHelper.registerGuestHousehold()`. Eerst roept het voor elk lid met e-mail of telefoon `PersonRepo.findGuestMatch()` aan. Precies één actieve persoon met dezelfde voornaam en hetzelfde e-mailadres of dezelfde telefoonnummercijfers wordt hergebruikt. Bij nul of meerdere treffers wordt een nieuwe persoon aangemaakt. Er wordt dus nooit geraden. Een lid zonder contactgegevens wordt binnen het gevonden huishouden op voornaam gezocht. Hergebruikte personen worden nooit bewerkt, zodat een anoniem formulier nooit opgeslagen gegevens kan overschrijven. Het antwoord herhaalt de ingevoerde namen. Leden zonder treffer komen in het gevonden huishouden of in een nieuw huishouden, met `membershipStatus: "Visitor"`. Voor elke nieuwe persoon wordt `person.created` verzonden. Daarna worden fouten gelogd in plaats van teruggegeven. Leden worden toegevoegd aan de ingestelde groep (`group.member.added`). Als het registreren van aanwezigheid aan staat, markeert `AttendanceModuleGateway.recordAttendance()` elk lid als aanwezig voor elke dienstijd van de groep die een rooster heeft en waarvan het check-invenster (`CheckinGateHelper.isServiceTimeOpen`) nu open is. Daarbij wordt de sessie voor de kerkelijke datum van vandaag aangemaakt als dat nodig is. Ongeplande dienstijden en aanmeldingen buiten het venster leveren niets op. Opmerkingen worden een verborgen persoonsnotitie-gesprek bij het hoofd van het huishouden (auteur van het bericht: "Gastaanmelding"), gekoppeld via `person.conversationId`.

## Gerelateerde pagina's

- [Aanwezigheid-endpoints](../api/endpoints/attendance.md): de volledige REST-interface voor campussen, diensten, sessies, bezoeken en bezoek-sessies
- [Membership-endpoints](../api/endpoints/membership.md): personen, huishoudens en groepen
- [Webhooks](../api/webhooks.md): de gebeurtenissen `session.created`, `attendance.recorded` en `attendance.checkout`
- [Modulestructuur](../api/module-structure.md): hoe de attendance-module server-side is ingedeeld
