---
title: "Check-in"
---

# Check-in

<div class="article-intro">

Il check-in è un unico sistema con tre punti di accesso: l'app kiosk B1Checkin per le postazioni con personale e self-service, il self check-in all'interno del portale membri B1App e la gestione delle presenze lato amministrazione in B1Admin. Tutti e tre scrivono nello stesso modulo presenze dell'Api principale, e l'instradamento nelle classi è gestito interamente dai Gruppi: non esiste un'entità separata di "sedi" o "stanze". Sopra c'è un livello di sicurezza per i minori: tipi di check-in per visita, controlli lato server su capacità e rapporto volontari, verifica di età e classe sul kiosk, verifica del ritiro affidabile al check-out e avvisi ai genitori tramite il provider di SMS della chiesa. Questa pagina descrive il modello dei dati, i flussi di check-in, il livello di sicurezza e la pipeline di stampa delle etichette.

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
|------------|------|-------|-------|
| Kiosk | `B1Checkin` | Expo / React Native, routing dei file con expo-router; build EAS per Android, Amazon Fire e iOS; aggiornamenti OTA tramite `expo-updates` | Postazione con personale o self-service, con stampa delle etichette e check-out verificato |
| Self check-in | `B1App` | Next.js (portale membri b1.church) | I membri registrati registrano il proprio nucleo familiare dal telefono; nessuna stampa |
| Amministrazione | `B1Admin` | SPA React | Configura la struttura dei servizi, assegna i gruppi agli orari di servizio, progetta le etichette, registra le presenze manuali ed esegue i report |

Tutti e tre chiamano gli stessi due moduli dell'API tramite `ApiHelper`: **MembershipApi** (`/membership`) per persone, nuclei familiari e gruppi; **AttendanceApi** (`/attendance`) per tutto ciò che è descritto di seguito.

## Modello dei dati (`Api/src/modules/attendance`)

| Entità / tabella | Campi chiave | Significato |
|------------------|--------------|-------------|
| `campuses` | name, address | Obsoleta in questo contesto: le sedi sono gestite nel modulo membership (`/membership/campuses`); la copia nelle presenze è congelata in sola lettura per i lettori legacy (`models/Campus.ts`) |
| `services` | campusId, name | Un incontro ricorrente, ad esempio "Domenica mattina" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Una fascia oraria all'interno di un servizio, ad esempio "9:00" (`models/ServiceTime.ts`). Le colonne di pianificazione sono facoltative (migrazione `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) e determinano la [finestra di check-in](#scheduled-check-in-windows) |
| `groupServiceTimes` | groupId, serviceTimeId | Tabella di collegamento: quali gruppi (classi) si riuniscono in quali orari di servizio (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Un incontro di un gruppo in una data, creato al momento del check-in (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Una persona presente in una data (`models/Visit.ts`). `checkinType` è `member` / `guest` / `volunteer` (NULL = membro legacy), impostato dal kiosk e usato dai controlli di capacità e rapporto |
| `visitSessions` | visitId, sessionId | La o le sessioni coperte da una visita: un bambino registrato a due orari di servizio ottiene due righe (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (blocchi JSON) | Layout di etichette personalizzabili (`models/LabelTemplate.ts`) |

### Come viene salvato un check-in completato

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) gestisce `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Il corpo è un array di oggetti `Visit`, ciascuno con `visitSessions` il cui `session` incorporato indica solo una coppia `(serviceTimeId, groupId)`. Il server quindi:

1. **Verifica capacità e rapporti prima di qualsiasi scrittura.** `evaluateGates()` → `CheckinGateHelper.evaluate()` controlla, per ogni stanza coinvolta, capacità, capacità ospiti, flag di chiusura e rapporto volontari rispetto all'occupazione attuale. postCheckin **non è transazionale**, quindi il controllo deve avvenire prima del primo salvataggio: una violazione grave restituisce un 409 che indica la o le stanze coinvolte, e non viene salvato nulla. Vedi [Controlli di capacità e rapporto volontari](#capacity-and-volunteer-ratio-gates).
2. **Risolve le sessioni in modo pigro.** `getSessionId()` trova o crea la riga `sessions` per `(groupId, serviceTimeId, oggi)`; gli id di sessione sono memorizzati nella cache del processo per data. Le nuove sessioni generano un webhook `session.created`. Il ciclo è un `for..of` con await: una precedente versione `forEach(async …)` senza attesa causava una race condition con il salvataggio e scriveva sessionId NULL alla creazione della prima sessione (corretto; annotato con un commento nel codice accanto al ciclo).
3. **Sostituisce i record della giornata.** Tutte le visite esistenti di quelle persone per quel servizio di oggi vengono eliminate insieme ai relativi visitSessions, poi viene salvato l'insieme inviato. Ripetere il check-in di una famiglia è quindi un'operazione idempotente ("questo è lo stato attuale"), non un'aggiunta. Passando `?checkDuplicates=true` si ottiene `{ duplicates: [personId…] }` senza scrivere nulla, ed è così che il kiosk avvisa prima di sovrascrivere.
4. **Genera un codice di sicurezza per ogni batch.** `SecurityCodeHelper.generate()` produce un codice di 4 caratteri dall'alfabeto `23456789BCDFGHJKLMNPQRSTVWXYZ` (niente vocali né caratteri ambigui, così i codici non possono formare parole né essere letti in modo errato). Il server riprova in caso di collisione con le visite aperte dello stesso giorno della stessa chiesa e assegna il codice a ogni visita del batch.
5. **Restituisce `{ streaks, securityCode }`.** `streaks` associa a ogni personId il numero di settimane consecutive di presenza; il kiosk festeggia i traguardi (ogni 5ª settimana) con coriandoli.

Ogni visita salvata genera anche un webhook `attendance.recorded`. Il lato lettura, `GET /attendance/visits/checkin`, restituisce le visite delle persone a partire dalla loro **ultima data registrata**: se era una settimana precedente, gli id vengono rimossi e il client riceve una copia precompilata delle selezioni di stanza della settimana scorsa, che verranno salvate come nuovi record.

### Check-out

Due endpoint completano il ciclo (`VisitController`):

- `GET /attendance/visits/code/:code`: le visite di oggi non ancora registrate in uscita con quel codice di sicurezza, con le sessioni popolate.
- `POST /attendance/visits/checkout`: corpo `{ visitIds, checkedOutBy?, checkedOutById? }`; imposta `checkoutTime` e chi ha ritirato il bambino, ed emette un webhook `attendance.checkout` per ogni visita.

Permessi: i kiosk si autenticano con `attendance.checkin`, che concede esattamente l'accesso a check-in, check-out e modelli di etichette; `attendance.view` e `attendance.edit` coprono report e inserimento manuale; la struttura (servizi, orari di servizio, assegnazioni dei gruppi) richiede `services.edit`. Il self check-in del membro (B1App) non richiede alcun permesso: qualsiasi utente autenticato con una persona collegata nella chiesa può chiamare `GET`/`POST /attendance/visits/checkin`, e il server limita i `personId` inviati a quelli del proprio nucleo familiare (altrimenti 403). Questa barriera impedisce di leggere i `securityCode` di altre famiglie. L'appartenenza è il permesso; se i membri *vedono* la funzione è controllato dalle schede di navigazione di B1App della chiesa. Gli altri endpoint di check-in (`code/:code`, `checkout`, `guardians`, `CheckinController`) restano riservati a kiosk e personale.

## I gruppi guidano l'instradamento delle stanze

Nel sistema non esiste alcuna entità stanza o classe. Una "stanza" è un **gruppo** di membership con `trackAttendance` attivo, collegato a uno o più orari di servizio tramite `groupServiceTimes`. I campi del gruppo (in `Api/src/modules/membership/models/Group.ts`) che determinano il comportamento del kiosk sono:

| Campo | Effetto |
|-------|---------|
| `trackAttendance` | Il gruppo partecipa alle presenze; l'albero di configurazione di B1Admin segnala come non assegnati i gruppi `trackAttendance` privi di una riga in `groupServiceTimes` |
| `parentPickup` | Contrassegna una stanza per bambini: registrarsi lì rende la visita una visita "bambino", che stampa un'etichetta di ritiro familiare e riporta il codice di sicurezza sul cartellino |
| `printNametag` | Indica se i check-in a questo gruppo stampano un cartellino |
| `capacity` / `guestCapacity` / `checkinClosed` | Limiti di capacità della stanza e un interruttore "chiuso" diretto, applicati lato server dal controllo di check-in (modificabili nelle impostazioni del gruppo in B1Admin sotto "Capacità check-in") |
| `volunteerRatio` / `minVolunteers` | Rapporto bambini per volontario e numero minimo di volontari, applicati secondo l'impostazione `ratioEnforcement` valida per tutta la chiesa |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Limiti di età e classe valutati sul kiosk per evidenziare o attenuare le stanze |

Tutti i client normalizzano i dati allo stesso modo (ad esempio `B1Checkin/app/services.tsx` e `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): caricano in parallelo `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` e `GET /membership/groups`, quindi per ogni orario di servizio raccolgono in `serviceTime.groups` i gruppi la cui riga `groupServiceTimes` punta a quell'orario. Questo array è ciò che mostra il selettore delle stanze, organizzato per `categoryName` del gruppo.

Le assegnazioni si modificano dalla pagina del gruppo in B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx`, con `POST`/`DELETE /attendance/groupservicetimes`), mentre l'intero albero Campus → Servizio → Orario di servizio → Gruppo è visualizzato in `B1Admin/src/attendance/components/AttendanceSetup.tsx` tramite `GET /attendance/attendancerecords/tree`.

:::info
Poiché i gruppi sono l'unica fonte di verità, la stessa appartenenza al gruppo alimenta l'instradamento del kiosk, l'elenco delle presenze in stile appello nelle pagine dei gruppi di B1Admin e il report delle presenze. Assegnare un gruppo a un orario di servizio è l'unico passaggio necessario per renderlo una destinazione di check-in.
:::

## Sicurezza dei minori

### Tipi di check-in

Ogni visita ha un `checkinType`: `member`, `guest` o `volunteer` (NULL significa legacy/membro; migrazione `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Il tipo è scelto **sul kiosk**: chip Membro / Ospite / Volontario sulla riga del membro espansa (`B1Checkin/src/components/MemberServiceTimes.tsx`), applicato a ogni visita in attesa al completamento (`app/checkinComplete.tsx`, con valore predefinito `member`). Il server lo usa nel controllo: i volontari contano per la copertura del rapporto invece che per la capacità, e gli ospiti contano rispetto a `guestCapacity`.

### Controlli di capacità e rapporto volontari {#capacity-and-volunteer-ratio-gates}

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) viene eseguito dentro `postCheckin`, prima di qualsiasi salvataggio (l'endpoint non è transazionale, quindi il controllo prima del salvataggio è il meccanismo che garantisce la correttezza). Carica l'occupazione attuale per ogni gruppo coinvolto (`VisitRepo.countActiveByGroupToday`) e la configurazione del gruppo tramite il gateway del modulo membership, quindi classifica le violazioni:

- **Bloccanti (bloccano sempre):** `checkinClosed`, `attuali + in arrivo > capacity`, numero di ospiti superiore a `guestCapacity`. Il batch viene rifiutato con `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }`, e il kiosk mostra la stanza interessata.
- **Rapporto (avviso o blocco):** non-volontari in arrivo in una stanza dove `volunteers < minVolunteers`, nessun volontario presente, oppure `children > volunteers × volunteerRatio`. La gravità segue l'impostazione della chiesa `ratioEnforcement` (`"warn"` predefinito / `"block"`, modificabile in B1Admin, Gestisci chiesa → Check-In, `CheckinSettingsEdit.tsx`). In modalità avviso restituisce `409 { warning: true, error: "ratio", … }`, a meno che il client non rinvii con `acknowledgeWarnings=true`: quel reinvio è la conferma del personale sul kiosk.

### Finestre di check-in pianificate {#scheduled-check-in-windows}

Un orario di servizio può avere una pianificazione settimanale facoltativa (`dayOfWeek` da 0 a 6, con 0 = domenica; `startTime`/`endTime` in formato `HH:mm`; `checkinOpenMinutes`; `checkinCloseMinutes`), modificabile nel modulo dell'orario di servizio in B1Admin, **Presenze → Configurazione** (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, "Pianificazione check-in"). `CheckinGateHelper.hasSchedule()` considera un orario di servizio pianificato solo quando sono impostati sia `dayOfWeek` sia `startTime`; gli orari non pianificati non sono mai limitati nel tempo. `isServiceTimeOpen()` calcola la finestra nell'ora locale della chiesa (`DateHelper.toChurchTime`). Il fuso orario è il `timeZone` della chiesa; le chiese che non lo hanno impostato usano il primo campus non rimosso che ha un `timezone` (`MembershipModuleGateway.loadCampusTimeZone`), e solo in ultima istanza `America/New_York`. Sia l'elenco sia i percorsi di invio qui sotto risolvono il fuso orario allo stesso modo. La finestra va da `checkinOpenMinutes` prima dell'inizio fino a `checkinCloseMinutes` dopo la fine (o dopo l'inizio, se manca la fine), gestendo anche finestre che attraversano la mezzanotte o il cambio settimana.

La finestra è applicata in due punti:

- **Elenco:** `GET /attendance/servicetimes` aggiunge a ogni riga un booleano calcolato `checkinOpen`. Il self check-in di B1App (`CheckinPage.tsx`) e il selettore dei servizi di B1Checkin (`app/services.tsx`) eliminano gli orari con `checkinOpen === false` e mostrano "Il check-in non è aperto per questo servizio in questo momento." quando un servizio ha orari ma nessuno di essi è aperto (il kiosk offre un pulsante Indietro per scegliere un altro servizio).
- **Invio:** all'interno di `evaluateGates()`, prima della valutazione di capacità e rapporto, `findClosedServiceTimeGroups()` rifiuta il batch con `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` se l'orario di servizio di una sessione coinvolta è fuori dalla finestra. B1Checkin lo mostra tramite la schermata di blocco con il motivo "il check-in non è aperto in questo momento" (le violazioni di capacità continuano a dire "la stanza è piena o chiusa").

### Idoneità per età e classe (lato kiosk) {#agegrade-eligibility-kiosk-side}

L'idoneità delle stanze è un'indicazione dell'interfaccia, valutata sul kiosk e non imposta dal server. `B1Checkin/src/helpers/EligibilityHelper.ts` confronta data di nascita e classe di una persona con `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` del gruppo (ordine delle classi: PreK, K, 1–12, Diplomato) e restituisce `eligible`, `ineligible` o `unknown`. I dati mancanti danno `unknown` e non nascondono mai una stanza. Età e classi sono calcolate alla **data di promozione** della chiesa (impostazione `gradePromotionDate`, formato `"MM-DD"`, modificabile in `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); il kiosk la legge da `GET /attendance/checkin/settings`, e `resolveAsOfDate` sceglie l'occorrenza più recente non successiva a oggi. Il selettore delle stanze evidenzia quelle idonee e attenua quelle non idonee; selezionare una stanza attenuata richiede una conferma del personale.

### Ritiro affidabile e ritiro non autorizzato {#trusted-and-not-authorized-pickup}

Le persone autorizzate al ritiro sono un'entità di membership, legata al nucleo familiare: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts`, con householdId, personId facoltativo, name, photoUrl, relationship, `status` `trusted` / `notAuthorized` e notes). Le operazioni CRUD sono `GET /membership/householdpickup/:householdId` (accessibile a qualsiasi utente autenticato della chiesa, così i kiosk possono leggerla), più `POST` e `DELETE` protetti da `people.edit`. Il personale gestisce l'elenco nella scheda **Ritiro** della pagina della persona (`B1Admin/src/people/components/PickupPeople.tsx`): foto, parentela e un chip di stato Affidabile / Non autorizzato.

Al check-out (`B1Checkin/app/checkout.tsx`) il kiosk carica l'elenco di ritiro del nucleo: le voci `trusted` compaiono come schede di ritiro toccabili accanto alla griglia di foto degli adulti del nucleo. Un nome digitato liberamente come "Altro" viene confrontato in modo approssimato (distanza di Levenshtein, `src/helpers/PickupMatchHelper.ts`) con le voci `notAuthorized`: una corrispondenza blocca il check-out con una scheda di avviso e un pulsante **Sovrascrivi** per il personale. La sovrascrittura viene registrata sulla visita stessa: invia `checkedOutBy` come `"OVERRIDE: {name}"` tramite il normale `POST /attendance/visits/checkout`, quindi finisce nel registro delle presenze e nel webhook `attendance.checkout`, invece che in una tabella di audit separata.

### Avviso ai genitori e comunicazione di emergenza

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) espone due endpoint SMS:

- `POST /page`, con `{ visitId, message }`: avvisa i tutori di un bambino registrato (schermata di check-out del kiosk, in modalità con personale).
- `POST /broadcast`, con `{ serviceId, message }`: invia un SMS a tutti gli adulti dei nuclei registrati per un servizio (impostazioni amministrative del kiosk, dietro una scheda di conferma che richiede di digitare `EMERGENCY` in `B1Checkin/app/adminSettings.tsx`).

Entrambi risolvono gli adulti del nucleo tramite il gateway membership, poi affidano la consegna a **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`): la porta tra moduli verso il provider di SMS configurato dalla chiesa (`@churchapps/texting`: TextInChurch, Clearstream o MutualMinistry; non esiste un mittente SMS integrato). Il gateway registra una riga `sentText` più le voci `deliveryLog` per destinatario, e limita un batch a 500 destinatari. Senza provider configurato restituisce `no_provider`, che il kiosk mostra come "Nessun provider SMS configurato". Il `dispatch()` del controller elimina i numeri di telefono duplicati e salta le persone senza cellulare o con `optedOut` impostato, restituendo `{ sent, failed, skippedOptedOut, skippedNoPhone }` così il kiosk può mostrare cosa è stato saltato.

## Il kiosk (B1Checkin)

Le schermate sono file expo-router sotto `B1Checkin/app/`; lo stato condiviso tra le schermate vive in una classe statica `CachedData` (`src/helpers/CachedData.ts`), non nello stato di React.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Ricerca** (`app/lookup.tsx`): cerca per telefono (`GET /membership/people/search/phone?number=`, ultime 4 cifre o numero completo) o per nome (`GET /membership/people/search?term=`). Selezionando una corrispondenza carica il nucleo (`GET /membership/people/household/{householdId}`) e le visite esistenti (`GET /attendance/visits/checkin`), popolando `pendingVisits` con le selezioni della settimana scorsa.
2. **Revisione del nucleo** (`app/household.tsx`, `src/components/MemberList.tsx`): ogni riga membro mostra un badge "già registrato", un badge allergie o `nametagNotes` e i chip delle stanze correnti. Espandendo un membro si elencano tutti gli orari di servizio con un pulsante stanza e i chip Membro / Ospite / Volontario (`MemberServiceTimes.tsx`). Sotto il nome di ogni orario di servizio, `ServiceTimeHelper.getGroupSummary()` mostra i gruppi offerti in quell'orario (i nomi di `serviceTime.groups`, con spazi superflui rimossi, senza duplicati ignorando maiuscole e minuscole, separati da virgole); non viene mostrato nulla se l'orario non ha gruppi.
3. **Assegnazione del gruppo** (`app/selectGroup.tsx`): un albero per categorie costruito da `serviceTime.groups`, con le stanze idonee per età e classe evidenziate e quelle non idonee attenuate dietro una conferma del personale (vedi [Idoneità per età e classe](#agegrade-eligibility-kiosk-side)). Scegliendo una stanza si scrive un visitSession `{ session: { serviceTimeId, groupId } }` nella visita in attesa di quella persona (`src/helpers/VisitSessionHelper.ts`). "Nessuno" lo cancella.
4. **Completamento** (`app/checkinComplete.tsx`): `POST /attendance/visits/checkin` con `pendingVisits` (ciascuna con il proprio `checkinType`), poi stampa le etichette se è configurata una stampante e torna automaticamente alla ricerca. Una risposta `409` di capacità o `notOpen` mostra la stanza interessata con il motivo (piena o chiusa, oppure check-in non aperto). Un avviso di rapporto offre una conferma del personale che reinvia con `acknowledgeWarnings=true`.

La schermata di **check-out** (`app/checkout.tsx`) accetta il codice di sicurezza di 4 caratteri tramite un campo a fuoco automatico, così funzionano i lettori di codici a barre USB o Bluetooth che simulano la tastiera senza fotocamera, oppure un tastierino a schermo con lo stesso alfabeto, che invia automaticamente al quarto carattere. Un pulsante **Scansiona** apre una scheda con la fotocamera condivisa `src/components/CodeScanner.tsx` (per impostazione predefinita quella posteriore, con QR, Code 128 e Code 39), così le postazioni senza lettore possono leggere l'etichetta di ritiro. Un codice scansionato segue lo stesso percorso `handleCode()` dell'input digitato. La schermata cerca il codice, mostra i bambini da ritirare e presenta le **persone affidabili al ritiro** del nucleo come schede toccabili accanto a una griglia di foto degli adulti del nucleo (più un'opzione libera "Altro", verificata in modo approssimato rispetto ai nomi non autorizzati; vedi [Ritiro affidabile e ritiro non autorizzato](#trusted-and-not-authorized-pickup)), poi invia `POST /attendance/visits/checkout` con nome e id scelti. In modalità con personale la schermata offre anche **Avvisa un genitore** (`POST /attendance/checkin/page`) e una **ristampa dell'etichetta di sicurezza**: `reprint()` ricostruisce le etichette della famiglia con `LabelHelper.getAllLabelsFor(...)` e le invia attraverso la stessa pipeline `PrintUI` del check-in.

La modalità della postazione è un flag AsyncStorage `@StationMode` (`"self"` | `"manned"`, attivabile in `app/adminSettings.tsx`). La modalità con personale aggiunge il punto d'accesso al check-out nella schermata di ricerca e la modifica del profilo di ogni persona dalla schermata del nucleo (`POST /membership/people`). La sicurezza del kiosk è integrata: un PIN facoltativo (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) protegge le schermate di amministrazione e delle stampanti; la schermata di amministrazione si apre solo con 7 tocchi rapidi sul logo nell'intestazione; e una schermata di attesa inattiva (`src/hooks/useInactivityTimer.ts`) subentra tra una famiglia e l'altra.

## Self check-in (B1App)

I membri registrano la propria presenza dal portale b1.church, alla schermata `/mobile/checkin` (instradata da `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` a `screens/CheckinPage.tsx`). Richiede un utente con accesso e segue gli stessi quattro passaggi del kiosk (servizi, nucleo, gruppi, completamento) sugli stessi endpoint, con lo stato in `B1App/src/helpers/CheckinHelper.ts`. Differenze rispetto al kiosk: il nucleo proviene dal `householdId` dell'utente connesso (nessun passaggio di ricerca), e non c'è stampa delle etichette. La schermata di completamento mostra invece il codice di sicurezza del batch come QR (`qrcode.react`), con il suggerimento "mostra questo codice a una postazione di check-in". Se il nucleo è già registrato al caricamento della pagina, il pulsante "Mostra codice di check-in" ripropone il QR dalla prima visita esistente (da `GET /attendance/visits/checkin`) che contiene un `securityCode`. Il check-in viene registrato subito all'invio (non esiste uno stato in attesa); il QR serve solo a stampare le etichette sul kiosk.

**Stampa delle etichette dal telefono al kiosk** (`B1Checkin/app/scan.tsx`, raggiunto dal pulsante "Scansiona codice" del QR nella schermata di ricerca): il kiosk mostra `CodeScanner` (un `CameraView` di `expo-camera`, per impostazione predefinita quella frontale, ribaltabile) in attesa di codici QR. `ScanCodeHelper.parse()` accetta un payload solo se è un codice nudo di 4 caratteri nell'alfabeto dei codici di sicurezza, e `ScanCodeHelper.isRepeat()` ignora lo stesso codice per 4 secondi, così funzionano sia il QR di B1App sia il blocco QR di un'etichetta stampata. La schermata segue poi il percorso di ristampa del check-out (`GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI`) e torna alla ricerca. Nessuna scrittura delle presenze avviene durante la scansione: solo etichette. I codici senza visite attive, le postazioni senza stampante e i gruppi senza etichetta mostrano ciascuno un breve messaggio e tornano alla ricerca.

Tipi e `ApiHelper`/`ArrayHelper` provengono da `@churchapps/helpers` e `@churchapps/apphelper`; nessun componente React è condiviso con B1Admin.

## Presenze lato amministrazione (B1Admin)

- **Configurazione**: `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) mostra l'albero della struttura e permette di creare servizi (`ServiceEdit.tsx`) e orari di servizio (`ServiceTimeEdit.tsx`). I dati delle sedi arrivano dalla membership tramite l'hook `useCampuses()`.
- **Presenze manuali** si trovano nella sezione Gruppi, non in quella delle presenze: `B1Admin/src/groups/components/GroupSessionsTab.tsx` crea le sessioni (`POST /attendance/sessions`; durante l'aggiunta, `SessionEdit.tsx` può includere una sessione per ciascun altro gruppo che condivide l'orario di servizio scelto, saltando i gruppi che hanno già una sessione in quella data) e segna le persone come presenti tramite `POST /attendance/visitsessions/log`, che trova o crea la visita per quella persona e sessione. I responsabili dei gruppi possono registrare le presenze dei propri gruppi senza il permesso `attendance.edit`: i controller verificano `au.leaderGroupIds`.
- **Reportistica**: il report sull'andamento delle presenze e quello per gruppo sono report definiti dal server (`B1Admin/src/components/reporting/ReportWithFilter.tsx`, tramite ReportingApi; definizioni in `Api/reports/*.json`). Entrambi accettano `startDate` e `endDate` (data finale inclusa). Il report sull'andamento usa come predefinito il periodo da un anno fa a oggi e aggiunge una colonna `sessionDates` per settimana, mentre l'albero a schermo del report per gruppo include il `checkinTime` di ogni visita e lo `membershipStatus` della persona. Il CSV del report per gruppo proviene dal report collegato `groupAttendanceDownload`, pivotato da `GroupAttendanceDownloadHelper` in una riga per membro del gruppo, con una colonna presente/assente per ogni sessione datata. La cronologia per persona è `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Stampa delle etichette

### Modelli ed editor

Le chiese progettano le proprie etichette in B1Admin su `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` e `components/LabelEditor.tsx`, raggiunto dalla pagina delle impostazioni di Check-In). Un modello è una riga `labelTemplates` il cui `content` è un array JSON di blocchi (`text`, `field`, `barcode`, `qrcode` o `box`), ciascuno posizionato in coordinate percentuali, con font, allineamento, simbologia (`code39`/`code128`/`qr`) e condizioni di visibilità facoltative (ad esempio mostrare il riquadro allergie solo se `person.nametagNotes` non è vuoto). Esistono due `labelType`: `nametag` (uno per persona registrata; campi come `person.displayName`, `sessions`, `securityCode` e `person.isBirthdayWeek`, che vale `"true"` quando mese e giorno del compleanno cadono entro 3 giorni da oggi, anche a cavallo di fine anno, calcolato da `LabelHelper.isBirthdayWithin()`) e `pickup` (uno per famiglia; campi come `children`, `childrenAllergies`). Il server impone un solo predefinito per tipo per chiesa (`LabelTemplateController.save`). L'editor include modelli iniziali che rispecchiano le etichette predefinite del kiosk e mostra l'anteprima con dati di esempio.

### Rendering e stampa sul kiosk

Al completamento del check-in, `B1Checkin/src/helpers/LabelHelper.ts` decide cosa stampare in base ai flag di gruppo di ogni visita in attesa: cartellini per i gruppi con `printNametag`, più un'unica etichetta di ritiro familiare se una visita ha coinvolto un gruppo `parentPickup`. Le visite con `checkinType` `volunteer` vengono saltate da `LabelHelper.selectChildVisits()`, quindi un volontario dell'asilo in una stanza di Ritiro genitori non attiva mai un'etichetta di ritiro. Il codice di sicurezza della risposta di check-in va sui cartellini dei bambini e sull'etichetta di ritiro; i cartellini degli adulti vengono stampati senza codice. Se la chiesa ha dei modelli, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) trasforma blocchi e contesto dei campi in un documento HTML autonomo; altrimenti si usano le etichette HTML predefinite in `B1Checkin/assets/labels/`, con sostituzione dei segnaposto.

I codici a barre sono generati come SVG inline da codificatori TypeScript puri in `B1Checkin/src/helpers/barcode.ts`: tabelle dei pattern Code 39 e tabelle di larghezza Code 128 (code set B con checksum mod-103), più il QR tramite il pacchetto `qrcode`. **Questi codificatori sono intenzionalmente duplicati in B1Admin** (`LabelEditor.tsx` include le stesse tabelle, come indicato in un commento nel codice), così le anteprime del designer sono fedeli al pixel rispetto all'output del kiosk. Una modifica a uno dei due va replicata nell'altro.

La pipeline di stampa (`src/components/PrintUI.tsx`) renderizza ogni etichetta HTML in un `WebView`, la cattura in JPG con `react-native-view-shot` e passa gli URI delle immagini al modulo Expo nativo **printer-helper** (`B1Checkin/modules/printer-helper/`). Il modulo espone `scan()`, `checkInit()`, `printUris()` e gli eventi di stato, con un provider per marca su entrambe le piattaforme:

| Marca | Android | iOS | Note |
|-------|---------|-----|------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Stampanti di rete della serie QL (QL-800/810W/820NWB/1100/1110NWB…), etichette fustellate 29×90, la scelta predefinita consigliata |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Rilevamento in rete e stampa di immagini via TCP/ZPL |

La scelta della stampante si trova in `app/printers.tsx` (la scansione di rete restituisce voci `brand~model~ip`; la scelta viene salvata in AsyncStorage). `src/helpers/PrinterLog.ts` mantiene un registro diagnostico sul dispositivo, visibile tramite un indicatore di stato nell'intestazione del kiosk.

## Registrazione degli ospiti

Due percorsi creano una persona durante il check-in:

- **Al kiosk**: il pulsante "Aggiungi ospite" nella schermata del nucleo apre `B1Checkin/app/addGuest.tsx`, che prima cerca una corrispondenza esistente non membro con `GET /membership/people/search?term=` e altrimenti ne crea una con `POST /membership/people`, collegata al nucleo corrente. L'ospite poi segue l'assegnazione dei gruppi come qualsiasi membro.
- **Self-service tramite QR**: quando l'impostazione della chiesa `enableQRGuestRegistration` è attiva (configurabile nelle impostazioni di Check-In di B1Admin e letta da `GET /membership/settings/public/{churchId}`), la schermata di ricerca del kiosk mostra un QR che punta a `https://{subdomain}.b1.church/guest-register?serviceId=`. Quella pagina di B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) permette a una famiglia in visita di registrarsi dal proprio telefono tramite l'endpoint anonimo `POST /membership/people/guest-register`, mantenendo scorrevole la fila al kiosk. La scheda del QR ha anche un pulsante **Registrati qui** che apre la stessa pagina sul kiosk (`app/guestRegister.tsx`) in un `WebView` in incognito con cache disattivata. `src/helpers/GuestRegisterHelper.ts` costruisce l'URL sia per il QR sia per il WebView e blocca la navigazione verso indirizzi diversi da `https://{subdomain}.b1.church/guest-register`. La schermata torna alla ricerca con **Fine**, con il pulsante indietro o dopo 120 secondi di inattività (la digitazione nel modulo viene trasmessa dal WebView come attività), smontando il WebView così i dati di una famiglia non arrivano mai alla successiva.

## Pagine correlate

- [Endpoint Presenze](../api/endpoints/attendance): l'intera API REST per sedi, servizi, sessioni, visite e visite-sessione
- [Endpoint Membership](../api/endpoints/membership): persone, nuclei e gruppi
- [Webhook](../api/webhooks): gli eventi `session.created`, `attendance.recorded` e `attendance.checkout`
- [Struttura dei moduli](../api/module-structure): come è organizzato lato server il modulo presenze
