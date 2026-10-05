---
title: "Check-In"
---

# Check-In

<div class="article-intro">

Il Check-In è un sistema con tre porte d'accesso: l'app kiosk B1Checkin per stazioni gestite e self-serve, il self check-in all'interno del portale dei membri B1App e la frequenza amministrativa in B1Admin. Tutti e tre scrivono lo stesso modulo di presenze nell'Api di base, e l'instradamento delle aule è interamente guidato da Gruppi — non c'è un'entità separata "posizioni" o "stanze". Un livello di sicurezza dei bambini si trova in cima: tipi di check-in per visitazione, cancelli di capacità e rapporto volontario lato server, idoneità di età/grado lato kiosk, verifica di pickup affidabile al check-out e paging dei genitori tramite il provider di servizi di testo della chiesa. Questa pagina mappa il modello di dati, i flussi di check-in, il livello di sicurezza e la pipeline di stampa di etichette.

</div>

## Panoramica

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

Percorso stampa etichetta (solo kiosk):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (label templates, or bundled HTML fallback)
       └▶ LabelRenderer → HTML doc + inline SVG barcodes
            └▶ PrintUI: WebView render → ViewShot JPG capture
                 └▶ printer-helper native module → Brother QL / Zebra
```

| Surface | Repo | Stack | Role |
|---------|------|-------|------|
| Kiosk | `B1Checkin` | Expo / React Native, expo-router file routing; EAS builds for Android, Amazon Fire, and iOS; OTA updates via `expo-updates` | Stazione gestita o self-serve con stampa di etichette e check-out verificato |
| Self check-in | `B1App` | Next.js (b1.church member portal) | I membri connessi fanno il check-in della loro famiglia da un telefono; nessuna stampa |
| Admin | `B1Admin` | React SPA | Configura la struttura del servizio, assegna i gruppi agli orari di servizio, progetta le etichette, registra la frequenza manuale, esegue i report |

Tutti e tre chiamano gli stessi due moduli API tramite `ApiHelper`: **MembershipApi** (`/membership`) per persone, famiglie e gruppi; **AttendanceApi** (`/attendance`) per tutto il resto.

## Modello di dati (`Api/src/modules/attendance`)

| Entity / table | Key fields | Meaning |
|----------------|-----------|---------|
| `campuses` | name, address | Deprecato qui — le sedi sono gestite nel modulo di iscrizione (`/membership/campuses`); la copia di presenze è congelata di sola lettura per i lettori legacy (`models/Campus.ts`) |
| `services` | campusId, name | Una riunione ricorrente, ad es. "Sunday Morning" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name | Un intervallo di tempo all'interno di un servizio, ad es. "9:00 AM" (`models/ServiceTime.ts`) |
| `groupServiceTimes` | groupId, serviceTimeId | Tabella di unione: quali gruppi (aule) si riuniscono a quali orari di servizio (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Una riunione di un gruppo in una data — creata pigrizia al momento del check-in (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Una persona che frequenta in una data (`models/Visit.ts`). `checkinType` è `member` / `guest` / `volunteer` (NULL = legacy member), impostato dal kiosk e consumato dai cancelli di capacità/rapporto |
| `visitSessions` | visitId, sessionId | Quale sessione(i) copre una visita — un bambino registrato a due orari di servizio ottiene due righe (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON blocks) | Layout di etichette progettabili (`models/LabelTemplate.ts`) |

### Come un check-in completato viene persistito

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) gestisce `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Il corpo è un array di oggetti `Visit`, ognuno contenente `visitSessions` i cui `session` incorporato nomina solo una coppia `(serviceTimeId, groupId)`. Il server quindi:

1. **Cancelli di capacità e rapporti prima di qualsiasi scrittura.** `evaluateGates()` → `CheckinGateHelper.evaluate()` controlla la capacità di ogni stanza mirata, la capacità degli ospiti, il flag chiuso e il rapporto volontario rispetto all'occupazione attuale. postCheckin **non è transazionale**, quindi il cancello deve funzionare prima del primo salvataggio — una violazione difficile restituisce un 409 con il nome della stanza offensiva e nulla viene persistito. Vedi [Cancelli di capacità e rapporto volontario](#capacity-and-volunteer-ratio-gates).
2. **Risolve le sessioni pigrizia.** `getSessionId()` trova o crea la riga `sessions` per `(groupId, serviceTimeId, today)` — gli ID sessione sono memorizzati nella cache in-process per data. Le nuove sessioni emettono un webhook `session.created`. Il ciclo è un `for..of` in attesa — un precedente `forEach(async …)` fire-and-forget ha corso il salvataggio e ha scritto NULL sessionIds sulla creazione della prima sessione (fisso; notato in un commento del codice nel ciclo).
3. **Sostituisce i record del giorno.** Qualsiasi visita esistente per quelle persone a quel servizio oggi viene eliminata insieme ai loro visitSessions, quindi l'insieme inviato viene salvato. Re-controllare una famiglia è quindi un'operazione idempotente "questo è lo stato attuale", non un'aggiunta. Passando `?checkDuplicates=true` invece restituisce `{ duplicates: [personId…] }` senza scrivere, che è come il kiosk avverte prima di sovrascrivere.
4. **Genera un codice di sicurezza per batch.** `SecurityCodeHelper.generate()` produce un codice a 4 caratteri dall'alfabeto `23456789BCDFGHJKLMNPQRSTVWXYZ` (nessuna vocale o carattere ambiguo, quindi i codici non possono deletterare parole o leggere male). Il server riprova sulla collisione rispetto alle visite aperte dello stesso giorno della stessa chiesa e timbra il codice su ogni visita nel batch.
5. **Restituisce `{ streaks, securityCode }`.** `streaks` mappa personId al conteggio di frequenza settimanale consecutiva; il kiosk celebra i traguardi (ogni 5a settimana) con coriandoli.

Ogni visita salvata emette anche un webhook `attendance.recorded`. Il lato di lettura, `GET /attendance/visits/checkin`, restituisce le visite delle persone dall'**ultima data registrata** — se era una settimana precedente gli ID vengono eliminati, quindi il client riceve una copia pre-compilata della selezione della stanza della scorsa settimana che salverà come nuovi record.

### Check-out

Due endpoint completano il loop (`VisitController`):

- `GET /attendance/visits/code/:code` — le visite non ancora controllate di oggi portando quel codice di sicurezza, con sessioni popolate.
- `POST /attendance/visits/checkout` — corpo `{ visitIds, checkedOutBy?, checkedOutById? }`; timbra `checkoutTime` e chi ha ritirato, ed emette un webhook `attendance.checkout` per visita.

Autorizzazioni: i kiosk si autenticano con `attendance.checkin`, che concede esattamente la superficie di check-in/check-out/modello di etichetta; `attendance.view`/`attendance.edit` coprono reporting e entry manuale; la struttura (servizi, orari di servizio, assegnazioni di gruppi) richiede `services.edit`. Il self check-in dei membri (B1App) non ha bisogno di alcuna autorizzazione: qualsiasi utente autenticato con una persona collegata nella chiesa può chiamare `GET`/`POST /attendance/visits/checkin`, e il server limita i `personId` inviati a quelli della famiglia del chiamante (403 altrimenti — questo recinto è quello che mantiene il `securityCode` dei altri nuclei familiari illeggibile). L'iscrizione è la concessione; se i membri *vedono* la funzione è controllato dalle schede di navigazione B1App della chiesa. Gli altri endpoint di check-in (`code/:code`, `checkout`, `guardians`, `CheckinController`) rimangono solo kiosk/staff.

## I gruppi guidano l'instradamento delle stanze

Non c'è un'entità stanza o aula da nessuna parte del sistema. Una "stanza" è un **gruppo** di iscrizione con `trackAttendance` abilitato, collegato a uno o più orari di servizio tramite `groupServiceTimes`. I campi del gruppo (su `Api/src/modules/membership/models/Group.ts`) che modellano il comportamento del kiosk:

| Field | Effect |
|------|--------|
| `trackAttendance` | Il gruppo partecipa alla frequenza in tutto; l'albero di configurazione di B1Admin contrassegna i gruppi `trackAttendance` senza alcuna riga `groupServiceTimes` come non assegnati |
| `parentPickup` | Contrassegna una stanza per bambini: il check-in ad essa rende la visita una visita "bambino", che stampa un'etichetta di ritiro familiare e mette il codice di sicurezza sul cartellino |
| `printNametag` | Se il check-in a questo gruppo stampa un cartellino |
| `capacity` / `guestCapacity` / `checkinClosed` | Limiti di capacità della stanza e un interruttore "chiuso" difficile, applicato lato server dal cancello di check-in (modificato nelle impostazioni del gruppo di B1Admin in "Capacità di Check-In") |
| `volunteerRatio` / `minVolunteers` | Rapporto bambini per volontario e conteggio di volontari minimo, applicato secondo l'impostazione a livello di chiesa `ratioEnforcement` |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Limiti di idoneità per età/grado valutati sul kiosk per evidenziare o attenuare le stanze |

Ogni client denormalizza allo stesso modo (ad es. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): carica `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` e `GET /membership/groups` in parallelo, quindi per ogni ora di servizio raccogli i gruppi la cui riga `groupServiceTimes` la indica in `serviceTime.groups`. Questo array è quello che il selezionatore di stanze mostra, organizzato per `categoryName` del gruppo.

Le assegnazioni vengono modificate dalla pagina del gruppo in B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), e l'intero albero Campus → Servizio → Ora di Servizio → Gruppo è visualizzato in `B1Admin/src/attendance/components/AttendanceSetup.tsx` tramite `GET /attendance/attendancerecords/tree`.

:::info
Poiché i gruppi sono l'unica fonte di verità, la stessa appartenenza al gruppo alimenta l'instradamento del kiosk, la frequenza in stile elenco in B1Admin delle pagine di gruppo e il reporting delle frequenze — assegnare un gruppo a un'ora di servizio è l'unico passo necessario per renderlo una destinazione di check-in.
:::

## Sicurezza dei bambini

### Tipi di check-in

Ogni visita porta un `checkinType` — `member`, `guest` o `volunteer` (NULL significa legacy/membro; migrazione `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Il tipo è scelto **lato kiosk**: Chip Membro / Ospite / Volontario sulla riga membro espansa (`B1Checkin/src/components/MemberServiceTimes.tsx`), timbrato su ogni visita in sospeso al completamento (`app/checkinComplete.tsx`, predefinito a `member`). Il server lo consuma nel cancello — i volontari contano verso la copertura del rapporto invece che contro la capacità, e gli ospiti contano contro `guestCapacity`.

### Cancelli di capacità e rapporto volontario

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) gira all'interno di `postCheckin` prima di qualsiasi salvataggio (l'endpoint non è transazionale, quindi gating-before-save è il meccanismo di correttezza). Carica l'occupazione attuale per gruppo mirato (`VisitRepo.countActiveByGroupToday`) e la configurazione del gruppo tramite il gateway del modulo di iscrizione, quindi classifica le violazioni:

- **Difficile (blocco sempre):** `checkinClosed`, `current + incoming > capacity`, il conteggio degli ospiti oltre `guestCapacity`. Il batch viene rifiutato con `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` — il kiosk mostra la stanza denominata.
- **Rapporto (avviso o blocco):** in entrata non volontari in una stanza dove `volunteers < minVolunteers`, nessun volontario in assoluto, o `children > volunteers × volunteerRatio`. La gravità segue l'impostazione per chiesa `ratioEnforcement` (`"warn"` predefinito / `"block"`, modificata in B1Admin Gestisci Chiesa → Check-In, `CheckinSettingsEdit.tsx`). La modalità Avviso restituisce `409 { warning: true, error: "ratio", … }` a meno che il client non reinvii con `acknowledgeWarnings=true` — quel reinvio è l'override di conferma dello staff del kiosk.

### Idoneità per età/grado (lato kiosk)

L'idoneità della stanza è UI consigliativa, valutata sul kiosk, non applicata dal server. `B1Checkin/src/helpers/EligibilityHelper.ts` confronta la data di nascita/grado di una persona rispetto ai `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` del gruppo (ordine di grado: PreK, K, 1–12, Laureato) e restituisce `eligible` / `ineligible` / `unknown` — i dati mancanti generano `unknown` e non nascondono mai una stanza. Le età e i gradi sono calcolati a partire dalla **data di promozione di grado** della chiesa (`gradePromotionDate` impostazione, `"MM-DD"`, modificata in `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); il kiosk lo recupera da `GET /attendance/checkin/settings`, e `resolveAsOfDate` sceglie l'occorrenza più recente in o prima di oggi. Il selezionatore di stanze evidenzia le stanze idonee e attenua quelle non idonee; la selezione di una stanza attenuata richiede una conferma dello staff.

### Pickup affidabile e non autorizzato

Le persone di pickup sono un'entità di iscrizione, per famiglia: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, personId facoltativo, nome, photoUrl, relazione, `status` `trusted` / `notAuthorized`, note). CRUD è `GET /membership/householdpickup/:householdId` (qualsiasi utente di chiesa autenticato, quindi i kiosk possono leggerlo) più `POST` / `DELETE` protetto da `people.edit`. Il personale gestisce l'elenco nella pagina della persona scheda **Pickup** (`B1Admin/src/people/components/PickupPeople.tsx`) — foto, relazione e un chip di stato Trusted/Non Autorizzato.

Al check-out (`B1Checkin/app/checkout.tsx`) il kiosk carica l'elenco di pickup della famiglia: gli ingressi `trusted` si rendono come schede di pickup toccabili accanto alla griglia di foto degli adulti della famiglia, e un nome digitato liberamente viene fuzzy-matched (Levenshtein, `src/helpers/PickupMatchHelper.ts`) contro gli ingressi `notAuthorized` — un match blocca il check-out con un foglio di avvertimento e un pulsante **Override** dello staff. L'override viene registrato sulla visita stessa: pubblica `checkedOutBy` come `"OVERRIDE: {name}"` tramite il normale `POST /attendance/visits/checkout`, quindi atterra nel record di presenze e nel webhook `attendance.checkout` piuttosto che in una tabella di audit separata.

### Page-a-parent e broadcast di emergenza

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) espone due endpoint SMS:

- `POST /page` — `{ visitId, message }`: pagina i tutor di un bambino registrato (schermo di check-out del kiosk, modalità gestita).
- `POST /broadcast` — `{ serviceId, message }`: invia un SMS a tutti gli adulti del nucleo familiare registrati per un servizio (impostazioni di amministrazione del kiosk, dietro un foglio di conferma di tipo `EMERGENCY` in `B1Checkin/app/adminSettings.tsx`).

Entrambi risolvono gli adulti del nucleo familiare tramite il gateway di iscrizione, quindi consegnano la consegna a **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — la porta cross-modulo nel provider di servizi di testo configurato della chiesa (`@churchapps/texting`: TextInChurch, Clearstream, o MutualMinistry; non c'è mittente SMS integrato). Il gateway registra una riga `sentText` più voci `deliveryLog` per destinatario e limita un batch a 500 destinatari; senza un provider configurato restituisce `no_provider`, che il kiosk presenta come "Nessun provider SMS configurato". Il `dispatch()` del controller deduplicha i numeri di telefono e salta le persone senza cellulare o `optedOut` impostato, restituendo `{ sent, failed, skippedOptedOut, skippedNoPhone }` in modo che il kiosk possa mostrare quello che è stato saltato.

## Il kiosk (B1Checkin)

Le schermate sono file expo-router in `B1Checkin/app/`; lo stato tra schermate vive in una classe statica `CachedData` (`src/helpers/CachedData.ts`), non nello stato React.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             carica serviceTimes, gruppi, │             │  └─────────┘ └▶ addGuest  └▶ stampa etichette,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-ritorno
             labelTemplates               │                                            al lookup
```

1. **Lookup** (`app/lookup.tsx`) — cerca per telefono (`GET /membership/people/search/phone?number=`, ultimi 4 o completo) o per nome (`GET /membership/people/search?term=`). Selezionando una corrispondenza carica il nucleo familiare (`GET /membership/people/household/{householdId}`) e le visite esistenti (`GET /attendance/visits/checkin`), seminando `pendingVisits` con le selezioni della scorsa settimana.
2. **Revisione del nucleo familiare** (`app/household.tsx`, `src/components/MemberList.tsx`) — ogni riga di membro mostra un badge già controllato, un badge di allergia/`nametagNotes`, e i loro attuali chip di stanza. Espandendo un membro elenca ogni ora di servizio con un pulsante di stanza più i chip di tipo check-in Membro / Ospite / Volontario (`MemberServiceTimes.tsx`). Sotto ogni nome di ora di servizio, `ServiceTimeHelper.getGroupSummary()` mostra i gruppi offerti lì (i nomi `serviceTime.groups`, tagliati, deduplicati senza distinzione tra maiuscole e minuscole, uniti da virgola); nulla si rende quando l'orario non ha gruppi.
3. **Assegnazione del gruppo** (`app/selectGroup.tsx`) — un albero di categoria costruito da `serviceTime.groups`, con stanze idonee per età/grado evidenziate e quelle non idonee attenuate dietro una conferma dello staff (vedi [Idoneità per età/grado](#agegrade-eligibility-kiosk-side)); la selezione di una stanza scrive un visitSession `{ session: { serviceTimeId, groupId } }` nella visita in sospeso di quella persona (`src/helpers/VisitSessionHelper.ts`). "Nessuno" la cancella.
4. **Completa** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` con `pendingVisits` (ognuno timbrato con il suo `checkinType`), quindi stampa le etichette se una stampante è configurata e ritorna automaticamente al lookup. Una risposta di capacità `409` mostra la stanza piena/chiusa denominata; un avviso di rapporto offre una conferma dello staff che reinvia con `acknowledgeWarnings=true`.

La schermata **check-out** (`app/checkout.tsx`) accetta il codice di sicurezza a 4 caratteri tramite un input auto-focalizzato — così che gli scanner di codici a barre USB/Bluetooth keyboard-wedge funzionino senza fotocamera — o un tastierino su schermo usando lo stesso alfabeto, inviando automaticamente a 4 caratteri. Un pulsante **Scan** apre un foglio con la `src/components/CodeScanner.tsx` della fotocamera condivisa (fronte-retro per impostazione predefinita, accettando QR, Code 128 e Code 39) in modo che le stazioni senza uno scanner a cuneo possano leggere l'etichetta di ritiro; un codice scansionato alimenta lo stesso percorso `handleCode()` dell'input digitato. Cerca il codice, mostra i bambini da ritirare, e presenta le **persone di ritiro affidabili** della famiglia come schede toccabili accanto a una griglia di foto degli adulti della famiglia (più un'opzione "Altro" a testo libero che viene fuzzy-verificata contro nomi non autorizzati — vedi [Pickup affidabile e non autorizzato](#trusted-and-not-authorized-pickup)), quindi pubblica `POST /attendance/visits/checkout` con il nome/id del ritiratore. In modalità gestita la schermata offre anche **Page a genitore** (`POST /attendance/checkin/page`) e una **ristampa di etichetta di sicurezza** — `reprint()` ricostruisce le etichette della famiglia con `LabelHelper.getAllLabelsFor(...)` e le alimenta tramite la stessa pipeline `PrintUI` come check-in.

La personalità della stazione è un flag AsyncStorage `@StationMode` (`"self"` | `"manned"`, attivato in `app/adminSettings.tsx`). La modalità gestita aggiunge il punto di ingresso di check-out sulla schermata di lookup e la modifica del profilo per membro (`POST /membership/people`) dalla schermata di nucleo familiare. L'indurimento del kiosk è integrato: un PIN facoltativo (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) protegge gli schermi di amministrazione e della stampante, lo schermo di amministrazione si apre solo tramite 7 tocchi rapidi sul logo dell'intestazione, e una schermata di attrazione inattiva (`src/hooks/useInactivityTimer.ts`) prende il controllo tra le famiglie.

## Self check-in (B1App)

I membri controllano dal portale b1.church nella schermata `/mobile/checkin` (instradate da `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` a `screens/CheckinPage.tsx`). Richiede un utente connesso e attraversa gli stessi quattro passaggi del kiosk — servizi → nucleo familiare → gruppi → completa — rispetto agli endpoint identici, con lo stato tenuto in `B1App/src/helpers/CheckinHelper.ts`. Le differenze dal kiosk: il nucleo familiare proviene dal `householdId` dell'utente connesso (nessun passaggio di ricerca), e non c'è stampa di etichette — invece la schermata di completamento mostra il codice di sicurezza del batch come QR (`qrcode.react`) con un suggerimento "mostra questo a una stazione di check-in". Se il nucleo familiare è già controllato quando la pagina carica, un pulsante "Mostra codice di check-in" mostra nuovamente il QR dalla prima visita esistente (da `GET /attendance/visits/checkin`) che porta un `securityCode`. Il check-in viene registrato immediatamente al momento dell'invio (non c'è uno stato in sospeso); il QR guida solo la stampa di etichette al kiosk.

**Stampa di etichette da telefono a kiosk** (`B1Checkin/app/scan.tsx`, raggiunto dal pulsante "Scansiona codice" della schermata QR sul lookup): il kiosk mostra `CodeScanner` (una `CameraView` dell'`expo-camera`, fronte per impostazione predefinita, capovolgibile) scansionando i codici QR. `ScanCodeHelper.parse()` accetta un payload solo quando è un codice a 4 caratteri nudo nell'alfabeto del codice di sicurezza, e `ScanCodeHelper.isRepeat()` ignora lo stesso codice per 4 secondi, quindi il QR B1App e il QR dell'etichetta stampata funzionano entrambi. La schermata segue quindi il percorso di ristampa del check-out — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — e ritorna al lookup. Nessuna scrittura di frequenza accade al momento della scansione; solo etichette. I codici senza visite attive, le stazioni senza stampante e i gruppi senza etichette si rendono un toast e ritornano al lookup.

I tipi e `ApiHelper`/`ArrayHelper` provengono da `@churchapps/helpers` e `@churchapps/apphelper`; nessun componente React è condiviso con B1Admin.

## Frequenza sul lato amministrativo (B1Admin)

- **Setup** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) esegue il rendering dell'albero della struttura e crea i servizi (`ServiceEdit.tsx`) e gli orari di servizio (`ServiceTimeEdit.tsx`). I dati di sede provengono dall'iscrizione tramite l'hook `useCampuses()`.
- **L'frequenza manuale** vive dal lato Gruppi, non dalla sezione di frequenza: `B1Admin/src/groups/components/GroupSessionsTab.tsx` crea sessioni (`POST /attendance/sessions`; quando si aggiunge, `SessionEdit.tsx` può includere una sessione per un altro gruppo che condivide l'orario di servizio scelto, saltando i gruppi che hanno già una sessione in quella data) e contrassegna le persone presenti tramite `POST /attendance/visitsessions/log`, che trova o crea la visita per quella persona e sessione. I leader del gruppo possono registrare le presenze per i loro gruppi senza l'autorizzazione `attendance.edit` — i controller controllano `au.leaderGroupIds`.
- **Reporting** — le tendenze di frequenza e le presenze di gruppo sono report definiti dal server (`B1Admin/src/components/reporting/ReportWithFilter.tsx` rispetto a ReportingApi; definizioni in `Api/reports/*.json`). Entrambi accettano `startDate`/`endDate` (data di fine inclusiva); il report di tendenza predefinito a un anno fa fino a oggi e aggiunge una colonna `sessionDates` per settimana, e l'albero su schermo della frequenza di gruppo include il `checkinTime` di ogni visita e lo `membershipStatus` della persona. Il CSV della frequenza del gruppo proviene dal report `groupAttendanceDownload` del compagno, ruotato da `GroupAttendanceDownloadHelper` in una riga per membro del gruppo con una colonna presente/assente per sessione datata; la cronologia per persona è `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Stampa di etichette

### Modelli e il designer

Le chiese progettano le loro stesse etichette in B1Admin in `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, raggiunto dalla pagina di impostazioni di Check-In). Un modello è una riga `labelTemplates` il cui `content` è un array JSON di blocchi — `text`, `field`, `barcode`, `qrcode` o `box` — ognuno posizionato in coordinate percentuali con font, allineamento, simbologia (`code39`/`code128`/`qr`) e condizioni di visibilità facoltative (ad es. solo renderizza il riquadro di allergia quando `person.nametagNotes` è non vuoto). Esistono due `labelType`: `nametag` (uno per persona registrata; campi come `person.displayName`, `sessions`, `securityCode` e `person.isBirthdayWeek` -- `"true"` quando il mese/giorno del compleanno è entro 3 giorni da oggi, avvolgendosi attraverso la fine dell'anno, calcolato da `LabelHelper.isBirthdayWithin()`) e `pickup` (uno per famiglia; campi come `children`, `childrenAllergies`). Il server applica un singolo predefinito per tipo per chiesa (`LabelTemplateController.save`). Il designer spedisce modelli di avvio che rispecchiano le etichette in bundle del kiosk e visualizza un'anteprima rispetto ai dati di esempio.

### Rendering e stampa sul kiosk

Al completamento del check-in, `B1Checkin/src/helpers/LabelHelper.ts` decide cosa stampare dai flag del gruppo su ogni visita in sospeso: cartellini per gruppi `printNametag`, più un'etichetta di ritiro familiare se qualsiasi visita ha raggiunto un gruppo `parentPickup`. Le visite con `checkinType` `volunteer` vengono saltate da `LabelHelper.selectChildVisits()`, quindi un operatore dell'asilo in una stanza Parent Pickup non innesca mai un'etichetta di ritiro. Il codice di sicurezza dalla risposta di check-in va su cartellini con nomi per bambini e l'etichetta di ritiro; i cartellini con nomi degli adulti vengono stampati senza un codice. Se la chiesa ha modelli, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) trasforma i blocchi + un contesto di campo in un documento HTML autonomo; altrimenti le etichette HTML in bundle in `B1Checkin/assets/labels/` vengono utilizzate con sostituzione di placeholder.

I codici a barre vengono generati come SVG inline da encoder TypeScript puri in `B1Checkin/src/helpers/barcode.ts` — tabelle di modelli Code 39 e Code 128 (set di codice B con checksum mod-103) tabelle di larghezza, più QR tramite il pacchetto `qrcode`. **Questi encoder sono intenzionalmente duplicati in B1Admin** (`LabelEditor.tsx` incorpora le stesse tabelle, notato in un commento del codice) in modo che le anteprime del designer siano fedeli ai pixel all'output del kiosk; un cambiamento a uno deve essere rispecchiato nell'altro.

La pipeline di stampa (`src/components/PrintUI.tsx`) esegue il rendering di ogni etichetta HTML in una `WebView`, la cattura in JPG tramite `react-native-view-shot`, e passa gli URI dell'immagine al **printer-helper** nativo Expo module (`B1Checkin/modules/printer-helper/`). Il modulo espone `scan()`, `checkInit()`, `printUris()` e eventi di stato, con un provider per marchio su entrambe le piattaforme:

| Brand | Android | iOS | Notes |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Stampanti di rete serie QL (QL-800/810W/820NWB/1100/1110NWB…), etichette tagliate a forma 29×90, il predefinito consigliato |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Scoperta di rete + stampa di immagini TCP/ZPL |

La selezione della stampante vive a `app/printers.tsx` (la scansione di rete restituisce voci `brand~model~ip`; la scelta persiste in AsyncStorage), e `src/helpers/PrinterLog.ts` mantiene un registro diagnostico su dispositivo sottoposto a rendering tramite un punto di stato dal vivo nell'intestazione del kiosk.

## Registrazione dei Visitatori

Due percorsi creano una persona durante il check-in:

- **Al kiosk** — la schermata del nucleo familiare "Aggiungi ospite" apre `B1Checkin/app/addGuest.tsx`, che prima ricerca `GET /membership/people/search?term=` una corrispondenza non membro esistente e altrimenti ne crea una con `POST /membership/people`, allegata al nucleo familiare attuale. L'ospite scorre quindi l'assegnazione del gruppo come qualsiasi membro.
- **Self-serve via QR** — quando l'impostazione della chiesa `enableQRGuestRegistration` è attiva (configurata nelle impostazioni di Check-In di B1Admin, letta da `GET /membership/settings/public/{churchId}`), la schermata di lookup del kiosk mostra un codice QR che collega a `https://{subdomain}.b1.church/guest-register?serviceId=`. Quella pagina B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) lascia che una famiglia visitante si registri da sola sul proprio telefono tramite l'endpoint anonimo `POST /membership/people/guest-register`, mantenendo la linea del kiosk in movimento. Il foglio QR ha anche un pulsante **Registrati qui** che apre la stessa pagina sul kiosk (`app/guestRegister.tsx`) in una `WebView` in incognito disabilitata dalla cache; `src/helpers/GuestRegisterHelper.ts` costruisce l'URL per il QR e la WebView e blocca la navigazione da `https://{subdomain}.b1.church/guest-register`. La schermata pop indietro al lookup su **Fine**, indietro o 120 secondi di inattività (il testo del modulo è inoltrato dalla WebView come attività), smontando la WebView in modo che gli ingressi di una famiglia non raggiungano mai il successivo.

## Pagine Correlate

- [Endpoint di Presenze](../api/endpoints/attendance) -- Superficie REST completa per sedi, servizi, sessioni, visite e sessioni di visita
- [Endpoint di Iscrizione](../api/endpoints/membership) -- Persone, famiglie e gruppi
- [Webhook](../api/webhooks) -- Gli eventi `session.created`, `attendance.recorded` e `attendance.checkout`
- [Struttura dei Moduli](../api/module-structure) -- Come il modulo di frequenza è organizzato lato server
