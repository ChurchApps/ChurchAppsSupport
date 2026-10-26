---
title: "Check-In"
---

# Check-In

<div class="article-intro">

Il check-in è un unico sistema con tre punti di accesso: l'app kiosk B1Checkin per le postazioni con personale e self-service, il self check-in all'interno del portale membri B1App e la gestione delle presenze lato amministrazione in B1Admin. Tutti e tre scrivono nello stesso modulo presenze dell'Api principale, e l'instradamento verso le aule è interamente guidato dai Gruppi: non esiste un'entità separata di "sedi" o "stanze". Sopra questo sistema si colloca un livello di sicurezza per i minori: tipi di check-in per ogni visita, controlli lato server su capacità e rapporto volontari, controlli di idoneità per età e classe lato kiosk, verifica del ritiro fidato al check-out e avvisi ai genitori tramite il provider di messaggistica SMS della chiesa. Questa pagina descrive il modello dei dati, i flussi di check-in, il livello di sicurezza e la pipeline di stampa delle etichette.

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

Label print path (kiosk only):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (label templates, or bundled HTML fallback)
       └▶ LabelRenderer → HTML doc + inline SVG barcodes
            └▶ PrintUI: WebView render → ViewShot JPG capture
                 └▶ printer-helper native module → Brother QL / Zebra
```

| Superficie | Repo | Stack | Ruolo |
|---------|------|-------|------|
| Kiosk | `B1Checkin` | Expo / React Native, routing basato su file con expo-router; build EAS per Android, Amazon Fire e iOS; aggiornamenti OTA tramite `expo-updates` | Postazione con personale o self-service con stampa delle etichette e check-out verificato |
| Self check-in | `B1App` | Next.js (portale membri b1.church) | I membri registrati registrano il proprio nucleo familiare dal telefono; nessuna stampa |
| Admin | `B1Admin` | React SPA | Configura la struttura dei servizi, assegna i gruppi agli orari di servizio, progetta le etichette, registra le presenze manuali, genera i report |

Tutti e tre chiamano gli stessi due moduli dell'API tramite `ApiHelper`: **MembershipApi** (`/membership`) per persone, nuclei e gruppi; **AttendanceApi** (`/attendance`) per tutto ciò che è descritto di seguito.

## Modello dei dati (`Api/src/modules/attendance`)

| Entità / tabella | Campi principali | Significato |
|----------------|-----------|---------|
| `campuses` | name, address | Obsoleta in questo contesto: i campus sono gestiti nel modulo membership (`/membership/campuses`); la copia del modulo presenze è congelata in sola lettura per i lettori legacy (`models/Campus.ts`) |
| `services` | campusId, name | Un incontro ricorrente, ad esempio "Domenica mattina" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Una fascia oraria all'interno di un servizio, ad esempio "9:00" (`models/ServiceTime.ts`). Le colonne della programmazione sono opzionali (migrazione `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) e determinano la [finestra di check-in](#scheduled-check-in-windows) |
| `groupServiceTimes` | groupId, serviceTimeId | Tabella di join: quali gruppi (aule) si riuniscono in quali orari di servizio (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Un incontro di un gruppo in una data — creato in modo pigro al momento del check-in (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | La partecipazione di una persona in una data (`models/Visit.ts`). `checkinType` è `member` / `guest` / `volunteer` (NULL = membro legacy), impostato dal kiosk e utilizzato dai controlli di capacità e rapporto |
| `visitSessions` | visitId, sessionId | Quale/i sessione/i copre una visita — un bambino registrato a due orari di servizio ottiene due righe (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (blocchi JSON) | Layout di etichette personalizzabili (`models/LabelTemplate.ts`) |

### Come viene salvato un check-in completato

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) gestisce `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Il corpo è un array di oggetti `Visit`, ciascuno con `visitSessions` il cui `session` incorporato indica solo una coppia `(serviceTimeId, groupId)`. Il server quindi:

1. **Applica i controlli di capacità e rapporto prima di qualsiasi scrittura.** `evaluateGates()` → `CheckinGateHelper.evaluate()` verifica per ogni aula coinvolta la capacità, la capacità ospiti, il flag di chiusura e il rapporto volontari rispetto all'occupazione attuale. postCheckin **non è transazionale**, quindi il controllo deve avvenire prima del primo salvataggio: una violazione grave restituisce un 409 che indica l'aula o le aule coinvolte e non viene salvato nulla. Vedi [Gate di capacità e rapporto volontari](#capacity-and-volunteer-ratio-gates).
2. **Risolve le sessioni in modo pigro.** `getSessionId()` trova o crea la riga `sessions` per `(groupId, serviceTimeId, oggi)`; gli id di sessione sono memorizzati in cache in-process per data. Le nuove sessioni emettono un webhook `session.created`. Il ciclo è un `for..of` con await: in precedenza un `forEach(async …)` senza attesa causava una race condition con il salvataggio e scriveva sessionId NULL alla creazione della prima sessione (corretto; annotato con un commento nel codice in corrispondenza del ciclo).
3. **Sostituisce i record della giornata.** Eventuali visite esistenti per quelle persone in quel servizio oggi vengono eliminate insieme ai rispettivi visitSessions, poi viene salvato l'insieme inviato. Un nuovo check-in di una famiglia è quindi un'operazione idempotente che stabilisce "questo è lo stato attuale", non un'aggiunta. Passando `?checkDuplicates=true` si ottiene invece `{ duplicates: [personId…] }` senza scrivere nulla: è così che il kiosk avvisa prima di sovrascrivere.
4. **Genera un codice di sicurezza per ogni batch.** `SecurityCodeHelper.generate()` produce un codice di 4 caratteri dall'alfabeto `23456789BCDFGHJKLMNPQRSTVWXYZ` (senza vocali né caratteri ambigui, così i codici non possono formare parole né essere letti male). Il server riprova in caso di collisione con le visite aperte dello stesso giorno della stessa chiesa e imprime il codice su ogni visita del batch.
5. **Restituisce `{ streaks, securityCode }`.** `streaks` associa a ogni personId il numero di settimane consecutive di presenza; il kiosk festeggia i traguardi (ogni 5ª settimana) con i coriandoli.

Ogni visita salvata emette anche un webhook `attendance.recorded`. Il lato lettura, `GET /attendance/visits/checkin`, restituisce le visite delle persone a partire dalla **ultima data registrata**: se si tratta di una settimana precedente, gli id vengono rimossi e il client riceve una copia precompilata delle selezioni delle aule della settimana scorsa, che verrà salvata come nuovi record.

### Check-out

Due endpoint completano il ciclo (`VisitController`):

- `GET /attendance/visits/code/:code` — visite di oggi non ancora chiuse che riportano quel codice di sicurezza, con le sessioni popolate.
- `POST /attendance/visits/checkout` — corpo `{ visitIds, checkedOutBy?, checkedOutById? }`; registra `checkoutTime` e chi ha ritirato il bambino, ed emette un webhook `attendance.checkout` per ogni visita.

Permessi: i kiosk si autenticano con `attendance.checkin`, che concede esattamente l'accesso a check-in, check-out e modelli di etichetta; `attendance.view`/`attendance.edit` coprono i report e l'inserimento manuale; la struttura (servizi, orari di servizio, assegnazioni dei gruppi) richiede `services.edit`. Il self check-in del membro (B1App) non richiede alcun permesso: qualsiasi utente autenticato con una persona collegata nella chiesa può chiamare `GET`/`POST /attendance/visits/checkin`, e il server limita i `personId` inviati al nucleo familiare del chiamante (altrimenti 403; è questa barriera a impedire che i `securityCode` di altre famiglie siano leggibili). L'appartenenza è la concessione; se i membri *vedano* la funzione è controllato dalle schede di navigazione di B1App della chiesa. Gli altri endpoint di check-in (`code/:code`, `checkout`, `guardians`, `CheckinController`) restano riservati a kiosk e personale.

## I gruppi guidano l'instradamento verso le aule

Nel sistema non esiste alcuna entità di stanza o aula. Una "stanza" è un **gruppo** del modulo membership con `trackAttendance` abilitato, collegato a uno o più orari di servizio tramite `groupServiceTimes`. I campi del gruppo (in `Api/src/modules/membership/models/Group.ts`) che determinano il comportamento del kiosk sono:

| Campo | Effetto |
|------|--------|
| `trackAttendance` | Il gruppo partecipa alle presenze; l'albero di configurazione di B1Admin segnala come non assegnati i gruppi `trackAttendance` privi di una riga in `groupServiceTimes` |
| `parentPickup` | Contrassegna un'aula per bambini: registrarsi in essa rende la visita una visita "bambino", che stampa un'etichetta di ritiro familiare e riporta il codice di sicurezza sul cartellino |
| `printNametag` | Se i check-in a questo gruppo stampano un cartellino |
| `capacity` / `guestCapacity` / `checkinClosed` | Limiti di capacità dell'aula e un interruttore "chiuso" rigido, applicati lato server dal gate di check-in (modificabili nelle impostazioni del gruppo in B1Admin sotto "Capacità check-in") |
| `volunteerRatio` / `minVolunteers` | Rapporto bambini per volontario e numero minimo di volontari, applicati in base all'impostazione `ratioEnforcement` a livello di chiesa |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Limiti di idoneità per età e classe valutati lato kiosk per evidenziare o attenuare le aule |

Tutti i client denormalizzano allo stesso modo (ad esempio `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): caricano in parallelo `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` e `GET /membership/groups`, quindi per ogni orario di servizio raccolgono in `serviceTime.groups` i gruppi la cui riga `groupServiceTimes` punta a quell'orario. Questo array è ciò che mostra il selettore delle aule, organizzato per `categoryName` del gruppo.

Le assegnazioni si modificano dalla pagina del gruppo in B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), mentre l'intero albero Campus → Servizio → Orario di servizio → Gruppo è visualizzato in `B1Admin/src/attendance/components/AttendanceSetup.tsx` tramite `GET /attendance/attendancerecords/tree`.

:::info
Poiché i gruppi sono l'unica fonte di verità, la stessa appartenenza ai gruppi alimenta l'instradamento del kiosk, la presenza in forma di elenco nelle pagine dei gruppi di B1Admin e i report sulle presenze: assegnare un gruppo a un orario di servizio è l'unico passaggio necessario per renderlo una destinazione di check-in.
:::

## Sicurezza dei minori

### Tipi di check-in

Ogni visita riporta un `checkinType` — `member`, `guest` o `volunteer` (NULL indica legacy/membro; migrazione `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Il tipo viene scelto **lato kiosk**: i chip Membro / Ospite / Volontario sulla riga del membro espansa (`B1Checkin/src/components/MemberServiceTimes.tsx`), applicati a ciascuna visita in sospeso al completamento (`app/checkinComplete.tsx`, con valore predefinito `member`). Il server lo utilizza nel gate: i volontari contano per la copertura del rapporto invece che contro la capacità, e gli ospiti contano contro `guestCapacity`.

### Gate di capacità e rapporto volontari {#capacity-and-volunteer-ratio-gates}

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) viene eseguito all'interno di `postCheckin` prima di qualsiasi salvataggio (l'endpoint non è transazionale, quindi il controllo prima del salvataggio è il meccanismo che garantisce la correttezza). Carica l'occupazione attuale per ogni gruppo coinvolto (`VisitRepo.countActiveByGroupToday`) e la configurazione del gruppo tramite il gateway del modulo membership, quindi classifica le violazioni:

- **Gravi (bloccano sempre):** `checkinClosed`, `attuali + in ingresso > capacity`, numero di ospiti superiore a `guestCapacity`. Il batch viene rifiutato con `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` — il kiosk mostra l'aula indicata.
- **Rapporto (avviso o blocco):** non volontari in ingresso in un'aula in cui `volunteers < minVolunteers`, nessun volontario, oppure `children > volunteers × volunteerRatio`. La gravità segue l'impostazione della chiesa `ratioEnforcement` (`"warn"` predefinito / `"block"`, modificabile in B1Admin Gestione chiesa → Check-In, `CheckinSettingsEdit.tsx`). In modalità avviso restituisce `409 { warning: true, error: "ratio", … }` a meno che il client non reinvii con `acknowledgeWarnings=true` — quel reinvio è la conferma del personale che il kiosk consente.

### Pianificazione delle finestre di check-in {#scheduled-check-in-windows}

Un orario di servizio può avere una programmazione settimanale facoltativa (`dayOfWeek` da 0 a 6 con 0 = domenica, `startTime`/`endTime` in formato `HH:mm`, `checkinOpenMinutes`, `checkinCloseMinutes`), modificabile nel modulo orario di servizio di B1Admin in **Presenze → Configurazione** (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, "Programmazione check-in"). `CheckinGateHelper.hasSchedule()` considera un orario di servizio programmato solo quando sono impostati sia `dayOfWeek` sia `startTime`; gli orari non programmati non sono mai limitati nel tempo. `isServiceTimeOpen()` calcola la finestra nell'ora locale a parete (`DateHelper.toChurchTime`). Il fuso orario viene risolto per ogni orario di servizio da `CheckinTimeZoneHelper.load()` (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`): per primo viene considerato il `timezone` del campus del servizio (`service.campusId`, tramite `MembershipModuleGateway.loadCampusTimeZones`), poi il `timeZone` della chiesa (impostato in B1Admin, Informazioni sulla chiesa), poi il primo campus non rimosso che ha un `timezone` (`loadCampusTimeZone`), e solo infine `America/New_York`. Il campus viene prima perché molte chiese avevano `America/New_York` retroattivamente come fuso della chiesa. Sia il percorso di elenco sia quello di invio, descritti sotto, risolvono il fuso allo stesso modo. La finestra va da `checkinOpenMinutes` prima dell'inizio a `checkinCloseMinutes` dopo la fine (o dopo l'inizio se non c'è una fine), gestendo finestre che attraversano la mezzanotte o il confine della settimana.

La finestra viene applicata in due punti:

- **Elenco:** `GET /attendance/servicetimes` assegna a ogni riga un booleano calcolato `checkinOpen`. Il self check-in di B1App (`CheckinPage.tsx`) e il selettore dei servizi di B1Checkin (`app/services.tsx`) mantengono visibili tutti gli orari. Quando tutti gli orari di un servizio sono chiusi, mostrano l'apertura più vicina ("Il check-in apre dom 9:30." in B1App, "Il check-in per questo servizio apre dom 9:30." in B1Checkin, da `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`), con ripiego su "Il check-in non è aperto per questo servizio in questo momento." quando non è possibile calcolare un'apertura (il kiosk offre un pulsante Indietro per scegliere un altro servizio). Altrimenti gli orari chiusi appaiono come una riga non selezionabile "Chiuso" / "Chiuso · apre alle 9:30". La schermata del nucleo familiare di B1Checkin (`MemberServiceTimes.tsx`) ricalcola l'apertura in tempo reale sull'orologio del dispositivo con `ServiceTimeHelper.isCheckinOpen()` (fuso orario del dispositivo, non quello della chiesa), così un kiosk lasciato in funzione apre e chiude puntuale, e mostra "Aula bambini 1 · Registrato" (nome del gruppo) su un orario chiuso per cui la persona è già registrata.
- **Invio:** all'interno di `evaluateGates()`, prima della valutazione di capacità e rapporto, `findClosedServiceTimeGroups()` rifiuta il batch con `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` se l'orario di servizio di una sessione coinvolta è fuori dalla sua finestra. Poiché le visite esistenti di un nucleo per oggi vengono ripubblicate a ogni check-in, le sessioni che la persona possiede già (`personId|sessionId` nelle visite esistenti) saltano questo gate, così l'aggiunta di un orario di servizio successivo aperto non viene rifiutata perché una finestra precedente si è chiusa. B1Checkin mostra questo esito nella sua schermata di gate bloccante con il motivo "il check-in non è aperto in questo momento" (le violazioni di capacità continuano a riportare "aula piena o chiusa").

### Idoneità per età e classe (lato kiosk) {#agegrade-eligibility-kiosk-side}

L'idoneità alle aule è un'indicazione dell'interfaccia, valutata sul kiosk e non imposta dal server. `B1Checkin/src/helpers/EligibilityHelper.ts` confronta la data di nascita e la classe di una persona con `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` del gruppo (ordine delle classi: PreK, K, 1–12, Diplomato) e restituisce `eligible` / `ineligible` / `unknown` — dati mancanti producono `unknown` e non nascondono mai un'aula. Età e classi sono calcolate alla **data di promozione di classe** della chiesa (impostazione `gradePromotionDate`, `"MM-DD"`, modificabile in `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); il kiosk la ottiene da `GET /attendance/checkin/settings`, e `resolveAsOfDate` sceglie l'occorrenza più recente alla data odierna o precedente. Il selettore delle aule evidenzia quelle idonee e attenua quelle non idonee; selezionare un'aula attenuata richiede la conferma del personale.

### Ritiro fidato e ritiro non autorizzato {#trusted-and-not-authorized-pickup}

Le persone autorizzate al ritiro sono un'entità del modulo membership, per nucleo familiare: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, personId facoltativo, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). Le operazioni CRUD sono `GET /membership/householdpickup/:householdId` (qualsiasi utente autenticato della chiesa, così i kiosk possono leggerla) più `POST` / `DELETE` protette da `people.edit`. Il personale gestisce l'elenco nella scheda **Ritiro** della pagina della persona (`B1Admin/src/people/components/PickupPeople.tsx`) — foto, relazione e un chip di stato Fidato / Non autorizzato.

Al check-out (`B1Checkin/app/checkout.tsx`) il kiosk carica l'elenco dei ritiri del nucleo: le voci `trusted` appaiono come schede di ritiro toccabili accanto alla griglia delle foto degli adulti del nucleo, e un nome digitato liberamente nell'opzione "Altro" viene confrontato in modo approssimativo (distanza di Levenshtein, `src/helpers/PickupMatchHelper.ts`) con le voci `notAuthorized` — una corrispondenza blocca il check-out con una scheda di avviso e un pulsante **Override** riservato al personale. L'override viene registrato sulla visita stessa: invia `checkedOutBy` come `"OVERRIDE: {nome}"` tramite il normale `POST /attendance/visits/checkout`, così finisce nel registro delle presenze e nel webhook `attendance.checkout` anziché in una tabella di audit separata.

### Avviso ai genitori e comunicazione di emergenza

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) espone due endpoint SMS:

- `POST /page` — `{ visitId, message }`: avvisa i tutori di un bambino registrato (schermata di check-out del kiosk, modalità presidiata).
- `POST /broadcast` — `{ serviceId, message }`: invia un SMS agli adulti di ogni nucleo registrato per un servizio (impostazioni admin del kiosk, dietro una scheda di conferma che richiede di digitare `EMERGENCY` in `B1Checkin/app/adminSettings.tsx`).

Entrambi risolvono gli adulti del nucleo tramite il gateway del modulo membership, quindi affidano la consegna a **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — il punto di accesso tra moduli verso il provider di messaggistica configurato dalla chiesa (`@churchapps/texting`: TextInChurch, Clearstream o MutualMinistry; non esiste un mittente SMS integrato). Il gateway registra una riga `sentText` più le voci `deliveryLog` per destinatario e limita un batch a 500 destinatari; se non è configurato alcun provider restituisce `no_provider`, che il kiosk mostra come "Nessun provider SMS configurato". Il `dispatch()` del controller elimina i numeri di telefono duplicati e salta le persone senza cellulare o con `optedOut` impostato, restituendo `{ sent, failed, skippedOptedOut, skippedNoPhone }` così il kiosk può mostrare cosa è stato saltato.

## Il kiosk (B1Checkin)

Le schermate sono file expo-router sotto `B1Checkin/app/`; lo stato condiviso tra le schermate vive in una classe statica `CachedData` (`src/helpers/CachedData.ts`), non nello stato di React.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Ricerca** (`app/lookup.tsx`) — cerca per telefono (`GET /membership/people/search/phone?number=`, ultime 4 cifre o numero completo) oppure per nome (`GET /membership/people/search?term=`). Selezionando una corrispondenza carica il nucleo (`GET /membership/people/household/{householdId}`) e le visite esistenti (`GET /attendance/visits/checkin`), popolando `pendingVisits` con le selezioni della settimana scorsa.
2. **Revisione del nucleo** (`app/household.tsx`, `src/components/MemberList.tsx`) — ogni riga membro mostra un badge di "già registrato", un badge per allergie/`nametagNotes` e i chip delle aule attuali. Espandendo un membro compaiono tutti gli orari di servizio con un pulsante aula e i chip del tipo di check-in Membro / Ospite / Volontario (`MemberServiceTimes.tsx`). Sotto il nome di ogni orario di servizio, `ServiceTimeHelper.getGroupSummary()` mostra i gruppi offerti in quell'orario (i nomi di `serviceTime.groups`, senza spazi superflui, senza duplicati indipendentemente dalle maiuscole, separati da virgole); se l'orario non ha gruppi non viene mostrato nulla.
3. **Assegnazione del gruppo** (`app/selectGroup.tsx`) — un albero per categorie costruito da `serviceTime.groups`, con le aule idonee per età/classe evidenziate e quelle non idonee attenuate dietro una conferma del personale (vedi [Idoneità per età e classe](#agegrade-eligibility-kiosk-side)); selezionando un'aula si scrive una visitSession `{ session: { serviceTimeId, groupId } }` nella visita in sospeso di quella persona (`src/helpers/VisitSessionHelper.ts`). "Nessuno" la annulla.
4. **Completamento** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` con `pendingVisits` (ciascuna con il proprio `checkinType`), poi stampa le etichette se è configurata una stampante e torna automaticamente alla ricerca. Una risposta `409` di capacità o `notOpen` mostra l'aula indicata con il motivo (piena/chiusa, oppure check-in non aperto); un avviso di rapporto propone una conferma del personale che reinvia con `acknowledgeWarnings=true`.

La schermata di **check-out** (`app/checkout.tsx`) accetta il codice di sicurezza di 4 caratteri tramite un campo con messa a fuoco automatica — così funzionano i lettori di codici a barre USB/Bluetooth in modalità tastiera senza fotocamera — oppure una tastiera a schermo che usa lo stesso alfabeto, con invio automatico al quarto carattere. Un pulsante **Scansiona** apre una scheda con la fotocamera condivisa `src/components/CodeScanner.tsx` (posteriore per impostazione predefinita, accetta QR, Code 128 e Code 39), così le postazioni senza lettore a tastiera possono leggere l'etichetta di ritiro; un codice scansionato segue lo stesso percorso `handleCode()` dell'input digitato. La schermata cerca il codice, mostra i bambini da ritirare e presenta le **persone fidate al ritiro** del nucleo come schede toccabili accanto a una griglia di foto degli adulti del nucleo (più l'opzione di testo libero "Altro", controllata in modo approssimativo rispetto ai nomi non autorizzati — vedi [Ritiro fidato e ritiro non autorizzato](#trusted-and-not-authorized-pickup)), poi invia `POST /attendance/visits/checkout` con nome/id scelti. In modalità presidiata la schermata offre anche **Avvisa un genitore** (`POST /attendance/checkin/page`) e la **ristampa dell'etichetta di sicurezza** — `reprint()` ricostruisce le etichette della famiglia con `LabelHelper.getAllLabelsFor(...)` e le invia attraverso la stessa pipeline `PrintUI` del check-in.

La modalità della postazione è un flag AsyncStorage `@StationMode` (`"self"` | `"manned"`, modificabile in `app/adminSettings.tsx`). La modalità presidiata aggiunge il punto di accesso al check-out nella schermata di ricerca e la modifica del profilo di ogni persona (`POST /membership/people`) dalla schermata del nucleo. La sicurezza del kiosk è integrata: un PIN facoltativo (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) protegge le schermate di amministrazione e delle stampanti, la schermata di amministrazione si apre solo con 7 tocchi rapidi sul logo nell'intestazione, e una schermata di attrazione inattiva (`src/hooks/useInactivityTimer.ts`) subentra tra una famiglia e l'altra.

## Self check-in (B1App)

I membri effettuano il check-in dal portale b1.church nella schermata `/mobile/checkin` (instradata da `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` verso `screens/CheckinPage.tsx`). Richiede un utente autenticato e percorre gli stessi quattro passaggi del kiosk — servizi → nucleo → gruppi → completamento — con gli stessi endpoint, con lo stato gestito in `B1App/src/helpers/CheckinHelper.ts`. Le differenze rispetto al kiosk: il nucleo proviene dal `householdId` dell'utente autenticato (nessun passaggio di ricerca), e non è prevista la stampa delle etichette — la schermata di completamento mostra invece il codice di sicurezza del gruppo come QR (`qrcode.react`) con l'indicazione "mostra questo alla postazione di check-in". Se il nucleo è già registrato al caricamento della pagina, un pulsante "Mostra codice di check-in" visualizza di nuovo il QR dalla prima visita esistente (da `GET /attendance/visits/checkin`) che riporta un `securityCode`. La registrazione viene salvata immediatamente al momento dell'invio (non esiste uno stato in sospeso); il QR serve solo a stampare le etichette sul kiosk.

**Stampa delle etichette dal telefono al kiosk** (`B1Checkin/app/scan.tsx`, raggiunta dal pulsante "Scansiona codice" del QR nella schermata di ricerca): il kiosk mostra `CodeScanner` (un `CameraView` di `expo-camera`, con fotocamera frontale per impostazione predefinita e invertibile) in cerca di codici QR. `ScanCodeHelper.parse()` accetta un contenuto solo se è un codice nudo di 4 caratteri dell'alfabeto dei codici di sicurezza, e `ScanCodeHelper.isRepeat()` ignora lo stesso codice per 4 secondi, così funzionano sia il QR di B1App sia il blocco QR di un'etichetta stampata. La schermata segue poi il percorso di ristampa del check-out — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — e torna alla ricerca. Durante la scansione non avviene alcuna scrittura nelle presenze: solo etichette. I codici senza visite attive, le postazioni senza stampante e i gruppi senza etichette mostrano ciascuno un messaggio temporaneo e riportano alla ricerca.

Tipi e `ApiHelper`/`ArrayHelper` provengono da `@churchapps/helpers` e `@churchapps/apphelper`; nessun componente React è condiviso con B1Admin.

## Presenze lato amministrazione (B1Admin)

- **Configurazione** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) mostra l'albero della struttura e consente di creare servizi (`ServiceEdit.tsx`) e orari di servizio (`ServiceTimeEdit.tsx`). I dati dei campus provengono dal modulo membership tramite l'hook `useCampuses()`.
- **Presenze manuali** si trovano nella sezione Gruppi, non nella sezione presenze: `B1Admin/src/groups/components/GroupSessionsTab.tsx` crea le sessioni (`POST /attendance/sessions`; quando si aggiunge, `SessionEdit.tsx` può includere una sessione per ogni altro gruppo che condivide l'orario di servizio scelto, saltando i gruppi che hanno già una sessione in quella data) e segna le persone come presenti tramite `POST /attendance/visitsessions/log`, che trova o crea la visita per quella persona e sessione. I responsabili di gruppo possono registrare le presenze per i propri gruppi senza il permesso `attendance.edit` — i controller verificano `au.leaderGroupIds`.
- **Report** — l'andamento delle presenze e le presenze per gruppo sono report definiti dal server (`B1Admin/src/components/reporting/ReportWithFilter.tsx` su ReportingApi; definizioni in `Api/reports/*.json`). Entrambi accettano `startDate`/`endDate` (data di fine inclusa); il report di andamento usa per impostazione predefinita da un anno fa fino a oggi e aggiunge una colonna `sessionDates` per settimana, mentre l'albero a schermo delle presenze per gruppo include il `checkinTime` di ogni visita e lo `membershipStatus` della persona. Il CSV delle presenze per gruppo proviene dal report complementare `groupAttendanceDownload`, trasformato da `GroupAttendanceDownloadHelper` in una riga per membro del gruppo con una colonna presente/assente per ogni sessione datata; la cronologia per persona è `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Stampa delle etichette

### Modelli e editor

Le chiese progettano le proprie etichette in B1Admin all'indirizzo `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, raggiunto dalla pagina delle impostazioni del Check-In). Un modello è una riga `labelTemplates` il cui `content` è un array JSON di blocchi — `text`, `field`, `barcode`, `qrcode` o `box` — ciascuno posizionato in coordinate percentuali con font, allineamento, simbologia (`code39`/`code128`/`qr`) e condizioni di visibilità facoltative (ad esempio mostrare il riquadro allergie solo quando `person.nametagNotes` non è vuoto). Esistono due `labelType`: `nametag` (uno per persona registrata; campi come `person.displayName`, `sessions`, `securityCode` e `person.isBirthdayWeek` — `"true"` quando il mese/giorno del compleanno cade entro 3 giorni da oggi, anche a cavallo di fine anno, calcolato da `LabelHelper.isBirthdayWithin()`) e `pickup` (uno per famiglia; campi come `children`, `childrenAllergies`). Il server impone un solo predefinito per tipo per chiesa (`LabelTemplateController.save`). L'editor include modelli di partenza che riprendono le etichette incluse nel kiosk e permette di visualizzarne l'anteprima con dati di esempio.

### Rendering e stampa sul kiosk

Al completamento del check-in, `B1Checkin/src/helpers/LabelHelper.ts` decide cosa stampare in base ai flag di gruppo di ogni visita in sospeso: cartellini per i gruppi con `printNametag`, più un'etichetta di ritiro familiare unica se una visita ha interessato un gruppo `parentPickup`. Le visite con `checkinType` `volunteer` vengono escluse da `LabelHelper.selectChildVisits()`, quindi un volontario di un'aula di ritiro dei genitori non attiva mai un'etichetta di ritiro. Il codice di sicurezza della risposta di check-in viene riportato sui cartellini dei bambini e sull'etichetta di ritiro; i cartellini degli adulti vengono stampati senza codice. Se la chiesa dispone di modelli, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) trasforma i blocchi e un contesto di campi in un documento HTML autonomo; altrimenti si usano le etichette HTML incluse in `B1Checkin/assets/labels/` con sostituzione dei segnaposto.

I codici a barre sono generati come SVG inline da codificatori in puro TypeScript in `B1Checkin/src/helpers/barcode.ts` — tabelle dei pattern Code 39 e tabelle delle larghezze Code 128 (code set B con checksum mod-103), più il QR tramite il pacchetto `qrcode`. **Questi codificatori sono intenzionalmente duplicati in B1Admin** (`LabelEditor.tsx` include le stesse tabelle, come indicato in un commento nel codice) così che le anteprime dell'editor siano fedeli al pixel dell'output del kiosk; una modifica in uno dei due deve essere riportata nell'altro.

La pipeline di stampa (`src/components/PrintUI.tsx`) renderizza ogni etichetta HTML in un `WebView`, la cattura come JPG con `react-native-view-shot` e passa gli URI delle immagini al modulo Expo nativo **printer-helper** (`B1Checkin/modules/printer-helper/`). Il modulo espone `scan()`, `checkInit()`, `printUris()` e gli eventi di stato, con un provider per marca su entrambe le piattaforme:

| Marca | Android | iOS | Note |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (SDK di stampa Brother) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Stampanti di rete della serie QL (QL-800/810W/820NWB/1100/1110NWB…), etichette die-cut 29×90, predefinita consigliata |
| Zebra | `ZebraProvider.kt` (SDK Link-OS) | `ZebraProvider.swift` + `ZebraBridge` | Rilevamento in rete + stampa di immagini TCP/ZPL |

La selezione della stampante si trova in `app/printers.tsx` (la scansione di rete restituisce voci `brand~model~ip`; la scelta viene salvata in AsyncStorage), e `src/helpers/PrinterLog.ts` conserva un registro diagnostico sul dispositivo, visibile tramite un indicatore di stato in tempo reale nell'intestazione del kiosk.

## Registrazione degli ospiti

Due percorsi creano una persona durante il check-in:

- **Al kiosk** — il pulsante "Aggiungi ospite" nella schermata del nucleo apre `B1Checkin/app/addGuest.tsx`, che prima cerca una corrispondenza tra i non membri esistenti tramite `GET /membership/people/search?term=` e altrimenti crea una nuova persona con `POST /membership/people`, collegata al nucleo corrente. L'ospite poi segue l'assegnazione del gruppo come qualsiasi altro membro.
- **Self-service tramite QR** — quando l'impostazione della chiesa `enableQRGuestRegistration` è attiva (configurata nelle impostazioni del Check-In di B1Admin e letta da `GET /membership/settings/public/{churchId}`), la schermata di ricerca del kiosk mostra un codice QR che rimanda a `https://{subdomain}.b1.church/guest-register?serviceId=`. Quella pagina di B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) permette a una famiglia in visita di registrarsi dal proprio telefono tramite l'endpoint anonimo `POST /membership/people/guest-register`, mantenendo scorrevole la fila al kiosk. La scheda del QR ha anche un pulsante **Registrati qui** che apre la stessa pagina sul kiosk (`app/guestRegister.tsx`) in un `WebView` in incognito con cache disabilitata; `src/helpers/GuestRegisterHelper.ts` costruisce l'URL sia per il QR sia per il WebView e blocca la navigazione verso l'esterno di `https://{subdomain}.b1.church/guest-register`. La schermata torna alla ricerca con **Fine**, con il pulsante indietro, o dopo 120 secondi di inattività (la digitazione nel modulo viene inoltrata dal WebView come attività), smontando il WebView così che i dati inseriti da una famiglia non raggiungano mai la successiva.

La registrazione tramite QR è governata dalle impostazioni della chiesa salvate dalla scheda **Registrazione ospiti tramite QR** di B1Admin (`src/mobile/CheckInPage.tsx`):

| Impostazione | Visibilità | Scopo |
|---|---|---|
| `enableQRGuestRegistration` | pubblica | Interruttore di adesione per il QR del kiosk e per gli endpoint anonimi |
| `guestRegistrationFields` | pubblica | Mappa JSON di `email`, `phone`, `address`, `birthDate`, `gender`, `maritalStatus`, `grade`, `comments` → `"off"` / `"optional"` / `"required"`. Predefinito: email e telefono facoltativi, gli altri disattivati. Nome e cognome sono sempre obbligatori |
| `guestRegistrationImage` | pubblica | URL della foto di intestazione; B1App la mostra in formato 16:9 al posto dell'icona nel modulo e nella schermata di conferma |
| `guestRegistrationGroupId` | privata | Gruppo a cui viene aggiunta ogni registrazione (gli ospiti non la vedono né la scelgono mai) |
| `guestRegistrationRecordAttendance` | privata | `"true"` per registrare anche la presenza in quel gruppo |

`src/components/checkin/GuestRegister.tsx` di B1App recupera la lista di controllo dall'endpoint anonimo `GET /membership/people/guest-register/options?churchId=` e mostra solo i campi inclusi (email, telefono, stato civile e indirizzo per il contatto principale; data di nascita, genere e classe per ogni membro; una casella commenti), inviando soltanto quelli. Il server riapplica la lista di controllo in `GuestRegistrationHelper.sanitize()` — i campi disattivati vengono eliminati, i valori obbligatori mancanti o fuori lista generano un 400 — prima che `PersonHelper.registerGuestHousehold()` crei un nuovo nucleo (senza deduplicazione per email) con ogni membro come `membershipStatus: "Visitor"`, emettendo `person.created` per ciascuno. Successivamente, gli errori vengono registrati anziché restituiti: i membri vengono aggiunti al gruppo configurato (`group.member.added`); se la registrazione delle presenze è attiva, `AttendanceModuleGateway.recordAttendance()` segna ogni membro come presente per ciascun orario di servizio del gruppo che ha una programmazione e la cui finestra di check-in (`CheckinGateHelper.isServiceTimeOpen`) è aperta in questo momento, creando la sessione per la data odierna nel fuso della chiesa se necessario — gli orari non programmati e le registrazioni fuori finestra non registrano nulla; infine, i commenti diventano una conversazione di nota nascosta sulla persona del capofamiglia (autore del messaggio "Registrazione ospite"), collegata tramite `person.conversationId`.

## Pagine correlate

- [Endpoint delle presenze](../api/endpoints/attendance) -- L'intera API REST per campus, servizi, sessioni, visite e visitSessions
- [Endpoint del membership](../api/endpoints/membership) -- Persone, nuclei e gruppi
- [Webhook](../api/webhooks) -- Gli eventi `session.created`, `attendance.recorded` e `attendance.checkout`
- [Struttura dei moduli](../api/module-structure) -- Come è organizzato lato server il modulo presenze
