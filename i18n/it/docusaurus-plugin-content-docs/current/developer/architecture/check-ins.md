---
title: "Check-in"
---

# Check-in {#check-ins}

<div class="article-intro">

Il check-in è un unico sistema con tre punti di accesso: l'app chiosco B1Checkin per le postazioni con personale e self-service, il self check-in all'interno del portale membri B1App e le presenze lato amministrazione in B1Admin. Tutti e tre scrivono nello stesso modulo presenze dell'Api principale, e l'instradamento verso le aule è gestito interamente dai Gruppi — non esiste un'entità separata di "sedi" o "stanze". Sopra c'è uno strato di sicurezza dei minori: tipi di check-in per visita, controlli lato server di capienza e rapporto volontari, controlli di idoneità per età/classe lato chiosco, verifica del ritiro autorizzato al check-out e chiamate ai genitori tramite il provider di SMS della chiesa. Questa pagina descrive il modello dei dati, i flussi di check-in, lo strato di sicurezza e la pipeline di stampa delle etichette.

</div>

## Panoramica {#overview}

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

| Superficie | Repository | Stack | Ruolo |
|---------|------|-------|------|
| Chiosco | `B1Checkin` | Expo / React Native, routing a file con expo-router; build EAS per Android, Amazon Fire e iOS; aggiornamenti OTA tramite `expo-updates` | Postazione con personale o self-service con stampa delle etichette e check-out verificato |
| Self check-in | `B1App` | Next.js (portale membri b1.church) | I membri connessi registrano il proprio nucleo dal telefono; nessuna stampa |
| Amministrazione | `B1Admin` | SPA React | Configura la struttura dei servizi, assegna i gruppi agli orari di servizio, progetta le etichette, registra le presenze manuali, esegue i report |

Tutti e tre chiamano gli stessi due moduli dell'API tramite `ApiHelper`: **MembershipApi** (`/membership`) per persone, nuclei e gruppi; **AttendanceApi** (`/attendance`) per tutto ciò che è descritto sotto.

## Modello dei dati (`Api/src/modules/attendance`) {#data-model-apisrcmodulesattendance}

| Entità / tabella | Campi chiave | Significato |
|----------------|-----------|---------|
| `campuses` | name, address | Obsoleta qui — le sedi sono gestite nel modulo membership (`/membership/campuses`); la copia del modulo presenze è congelata in sola lettura per i lettori legacy (`models/Campus.ts`) |
| `services` | campusId, name | Un incontro ricorrente, ad esempio "Sunday Morning" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Una fascia oraria all'interno di un servizio, ad esempio "9:00 AM" (`models/ServiceTime.ts`). Le colonne di pianificazione sono facoltative (migrazione `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) e regolano la [finestra di check-in](#scheduled-check-in-windows) |
| `groupServiceTimes` | groupId, serviceTimeId | Tabella di unione: quali gruppi (aule) si incontrano in quali orari di servizio (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Un incontro di un gruppo in una data — creato in modo pigro al momento del check-in (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Una persona che partecipa in una data (`models/Visit.ts`). `checkinType` è `member` / `guest` / `volunteer` (NULL = membro legacy), impostato dal chiosco e usato dai controlli di capienza/rapporto |
| `visitSessions` | visitId, sessionId | Quale/i sessione/i copre una visita — un bambino registrato a due orari di servizio ottiene due righe (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (blocchi JSON) | Layout di etichette progettabili (`models/LabelTemplate.ts`) |

### Come viene salvato un check-in completato {#how-a-completed-check-in-is-persisted}

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) gestisce `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Il body è un array di oggetti `Visit`, ognuno con `visitSessions` il cui `session` incorporato indica solo una coppia `(serviceTimeId, groupId)`. Il server poi:

1. **Applica i controlli di capienza e rapporto prima di qualsiasi scrittura.** `evaluateGates()` → `CheckinGateHelper.evaluate()` verifica per ogni aula di destinazione la capienza, la capienza ospiti, lo stato di chiusura e il rapporto volontari rispetto all'occupazione attuale. postCheckin **non è transazionale**, quindi il controllo deve avvenire prima del primo salvataggio — una violazione grave restituisce un 409 che indica le aule coinvolte e nulla viene salvato. Vedi [Controlli di capienza e rapporto volontari](#capacity-and-volunteer-ratio-gates).
2. **Risolve le sessioni in modo pigro.** `getSessionId()` trova o crea la riga `sessions` per `(groupId, serviceTimeId, oggi)` — gli ID di sessione sono memorizzati nella cache del processo per data. Le nuove sessioni emettono un webhook `session.created`. Il ciclo è un `for..of` con await — un precedente `forEach(async …)` senza attesa competeva con il salvataggio e scriveva NULL come sessionId alla creazione della prima sessione (corretto; annotato con un commento nel codice al ciclo).
3. **Sostituisce i record della giornata.** Le visite esistenti di quelle persone per quel servizio oggi vengono eliminate insieme alle loro visitSessions, poi viene salvato l'insieme inviato. Ripetere il check-in di una famiglia è quindi un'operazione idempotente "questo è lo stato attuale", non un'aggiunta. Passando `?checkDuplicates=true` si ottiene invece `{ duplicates: [personId…] }` senza scrivere nulla, ed è così che il chiosco avvisa prima di sovrascrivere.
4. **Genera un codice di sicurezza per ogni batch.** `SecurityCodeHelper.generate()` produce un codice di 4 caratteri dall'alfabeto `23456789BCDFGHJKLMNPQRSTVWXYZ` (senza vocali né caratteri ambigui, così i codici non possono formare parole né essere letti in modo errato). Il server riprova in caso di collisione con le visite aperte dello stesso giorno della stessa chiesa e applica il codice a ogni visita del batch.
5. **Restituisce `{ streaks, securityCode }`.** `streaks` associa personId al numero di settimane consecutive di presenza; il chiosco celebra le tappe (ogni 5ª settimana) con i coriandoli.

Ogni visita salvata emette anche un webhook `attendance.recorded`. Il lato lettura, `GET /attendance/visits/checkin`, restituisce le visite delle persone dalla loro **ultima data registrata** — se era una settimana precedente, gli ID vengono rimossi, così il client riceve una copia precompilata delle selezioni di aula della settimana scorsa che verrà salvata come nuovi record.

### Check-out {#check-out}

Due endpoint completano il ciclo (`VisitController`):

- `GET /attendance/visits/code/:code` — le visite di oggi non ancora chiuse che hanno quel codice di sicurezza, con le sessioni popolate.
- `POST /attendance/visits/checkout` — body `{ visitIds, checkedOutBy?, checkedOutById? }`; imposta `checkoutTime` e chi ha effettuato il ritiro, ed emette un webhook `attendance.checkout` per ogni visita.

Permessi: i chioschi si autenticano con `attendance.checkin`, che concede esattamente la superficie di check-in/check-out/modelli di etichetta; `attendance.view`/`attendance.edit` coprono i report e l'inserimento manuale; la struttura (servizi, orari di servizio, assegnazioni dei gruppi) richiede `services.edit`. Il self check-in del membro (B1App) non richiede alcun permesso: qualsiasi utente autenticato con una persona collegata nella chiesa può chiamare `GET`/`POST /attendance/visits/checkin`, e il server limita i `personId` inviati al nucleo del chiamante (altrimenti 403) — questo vincolo impedisce che i `securityCode` di altre famiglie siano leggibili. L'appartenenza è la concessione; se i membri *vedano* la funzione è controllato dalle schede di navigazione di B1App della chiesa. Gli altri endpoint di check-in (`code/:code`, `checkout`, `guardians`, `CheckinController`) restano riservati a chiosco/personale.

## I gruppi guidano l'instradamento verso le aule {#groups-drive-room-routing}

Nel sistema non esiste un'entità di stanza o aula. Una "stanza" è un **gruppo** di membership con `trackAttendance` attivo, collegato a uno o più orari di servizio tramite `groupServiceTimes`. I campi del gruppo (in `Api/src/modules/membership/models/Group.ts`) che determinano il comportamento del chiosco:

| Campo | Effetto |
|------|--------|
| `trackAttendance` | Il gruppo partecipa alle presenze; l'albero di configurazione di B1Admin segnala come non assegnati i gruppi `trackAttendance` privi di una riga in `groupServiceTimes` |
| `parentPickup` | Contrassegna un'aula per bambini: il check-in in essa rende la visita una visita "bambino", che stampa un'etichetta di ritiro familiare e inserisce il codice di sicurezza nel cartellino |
| `printNametag` | Se i check-in in questo gruppo stampano un cartellino |
| `capacity` / `guestCapacity` / `checkinClosed` | Limiti di capienza dell'aula e un interruttore "chiuso" rigido, applicati lato server dal controllo di check-in (modificati in B1Admin nelle impostazioni del gruppo sotto "Check-In Capacity") |
| `volunteerRatio` / `minVolunteers` | Rapporto bambini per volontario e numero minimo di volontari, applicati secondo l'impostazione `ratioEnforcement` a livello di chiesa |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Limiti di idoneità per età/classe valutati lato chiosco per evidenziare o attenuare le aule |

Ogni client denormalizza nello stesso modo (ad esempio `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): carica in parallelo `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` e `GET /membership/groups`, poi per ogni orario di servizio raccoglie nel `serviceTime.groups` i gruppi la cui riga `groupServiceTimes` punta ad esso. Questo array è ciò che mostra il selettore delle aule, organizzato per `categoryName` del gruppo.

Le assegnazioni si modificano dalla pagina del gruppo in B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), e l'intero albero Campus → Servizio → Orario di servizio → Gruppo è visualizzato in `B1Admin/src/attendance/components/AttendanceSetup.tsx` tramite `GET /attendance/attendancerecords/tree`.

:::info
Poiché i gruppi sono l'unica fonte di verità, la stessa appartenenza ai gruppi alimenta l'instradamento del chiosco, l'elenco delle presenze nelle pagine dei gruppi in B1Admin e i report sulle presenze — assegnare un gruppo a un orario di servizio è l'unico passo necessario per renderlo una destinazione di check-in.
:::

## Sicurezza dei minori {#child-safety}

### Tipi di check-in {#check-in-types}

Ogni visita ha un `checkinType` — `member`, `guest` o `volunteer` (NULL significa legacy/membro; migrazione `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Il tipo viene scelto **lato chiosco**: i chip Member / Guest / Volunteer nella riga espansa del membro (`B1Checkin/src/components/MemberServiceTimes.tsx`), applicati a ogni visita in attesa al completamento (`app/checkinComplete.tsx`, con valore predefinito `member`). Il server lo usa nel controllo: i volontari contano per la copertura del rapporto invece che contro la capienza, e gli ospiti contano contro `guestCapacity`.

### Controlli di capienza e rapporto volontari {#capacity-and-volunteer-ratio-gates}

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) viene eseguito all'interno di `postCheckin` prima di qualsiasi salvataggio (l'endpoint non è transazionale, quindi il controllo prima del salvataggio è il meccanismo di correttezza). Carica l'occupazione attuale per ogni gruppo di destinazione (`VisitRepo.countActiveByGroupToday`) e la configurazione del gruppo tramite il gateway del modulo membership, poi classifica le violazioni:

- **Rigide (bloccano sempre):** `checkinClosed`, `current + incoming > capacity`, numero di ospiti oltre `guestCapacity`. Il batch viene rifiutato con `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` — il chiosco mostra l'aula indicata.
- **Rapporto (avviso o blocco):** non volontari in arrivo in un'aula dove `volunteers < minVolunteers`, nessun volontario, oppure `children > volunteers × volunteerRatio`. La gravità segue l'impostazione per chiesa `ratioEnforcement` (`"warn"` predefinito / `"block"`, modificabile in B1Admin Gestione chiesa → Check-In, `CheckinSettingsEdit.tsx`). In modalità avviso restituisce `409 { warning: true, error: "ratio", … }` a meno che il client non reinvii con `acknowledgeWarnings=true` — quel reinvio è la sostituzione di conferma del personale del chiosco.

### Finestre di check-in pianificate {#scheduled-check-in-windows}

Un orario di servizio può avere una pianificazione settimanale facoltativa (`dayOfWeek` da 0 a 6 con 0 = domenica, `startTime`/`endTime` come `HH:mm`, `checkinOpenMinutes`, `checkinCloseMinutes`), modificabile nel form dell'orario di servizio **Presenze → Configurazione** di B1Admin (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, "Check-in Schedule"). `CheckinGateHelper.hasSchedule()` considera un orario di servizio pianificato solo quando sono impostati sia `dayOfWeek` sia `startTime`; gli orari non pianificati non sono mai limitati nel tempo. `isServiceTimeOpen()` calcola la finestra nell'ora locale dell'orologio (`DateHelper.toChurchTime`). Il fuso orario viene risolto per ogni orario di servizio da `CheckinTimeZoneHelper.load()` (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`): prima il `timezone` della sede del servizio (`service.campusId`, tramite `MembershipModuleGateway.loadCampusTimeZones`), poi il `timeZone` della chiesa (impostato in Informazioni sulla chiesa di B1Admin), poi la prima sede non rimossa che ha un `timezone` (`loadCampusTimeZone`), e solo infine `America/New_York`. La sede viene prima perché molte chiese avevano `America/New_York` retroattivamente come fuso della chiesa. Sia la lista sia i percorsi di invio sotto risolvono il fuso allo stesso modo. La finestra va da `checkinOpenMinutes` prima dell'inizio a `checkinCloseMinutes` dopo la fine (o dopo l'inizio se non c'è una fine), gestendo finestre che attraversano la mezzanotte o il confine della settimana.

La finestra è applicata in due punti:

- **Lista:** `GET /attendance/servicetimes` assegna a ogni riga un booleano calcolato `checkinOpen`. Il self check-in di B1App (`CheckinPage.tsx`) e il selettore di servizi del chiosco B1Checkin (`app/services.tsx`) mantengono ogni orario. Quando tutti gli orari di un servizio sono chiusi, mostrano la prossima apertura ("Check-in opens Sun 9:30 AM." in B1App, "Check-in for this service opens Sun 9:30 AM." in B1Checkin, da `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`), con ripiego su "Check-in isn't open for this service right now." quando non è possibile calcolare un'apertura (il chiosco offre un pulsante Indietro per scegliere un altro servizio). Altrimenti gli orari chiusi appaiono come una riga "Closed" / "Closed · opens 9:30 AM" non selezionabile. La schermata del nucleo di B1Checkin (`MemberServiceTimes.tsx`) ricalcola in tempo reale l'apertura con l'orologio del dispositivo tramite `ServiceTimeHelper.isCheckinOpen()` (fuso orario del dispositivo, non quello della chiesa), così un chiosco lasciato acceso apre e chiude puntuale, e mostra "Kids Room 1 · Checked in" (nome del gruppo) su un orario chiuso che la persona possiede già.
- **Invio:** all'interno di `evaluateGates()`, prima della valutazione di capienza/rapporto, `findClosedServiceTimeGroups()` rifiuta il batch con `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` se l'orario di servizio di una sessione di destinazione è fuori dalla sua finestra. Poiché le visite esistenti di un nucleo per oggi vengono rinviate a ogni check-in, le sessioni che la persona possiede già (`personId|sessionId` nelle visite esistenti) saltano questo controllo, così l'aggiunta di un orario di servizio successivo e aperto non viene rifiutata perché una finestra precedente si è chiusa. B1Checkin mostra questo tramite la sua schermata di blocco con il motivo "check-in isn't open right now" (le violazioni di capienza indicano ancora "room is full or closed").

### Idoneità per età/classe (lato chiosco) {#agegrade-eligibility-kiosk-side}

L'idoneità delle aule è un'interfaccia informativa, valutata sul chiosco e non imposta dal server. `B1Checkin/src/helpers/EligibilityHelper.ts` confronta la data di nascita/classe di una persona con `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` del gruppo (ordine delle classi: PreK, K, 1–12, Graduated) e restituisce `eligible` / `ineligible` / `unknown` — i dati mancanti danno `unknown` e non nascondono mai un'aula. Età e classi sono calcolate alla **data di promozione delle classi** della chiesa (impostazione `gradePromotionDate`, `"MM-DD"`, modificabile in `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); il chiosco la recupera da `GET /attendance/checkin/settings`, e `resolveAsOfDate` sceglie l'occorrenza più recente non successiva a oggi. Il selettore delle aule evidenzia le aule idonee e attenua quelle non idonee; scegliere un'aula attenuata richiede una conferma del personale.

### Ritiro autorizzato e non autorizzato {#trusted-and-not-authorized-pickup}

Le persone autorizzate al ritiro sono un'entità di membership, per nucleo: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, personId facoltativo, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). Il CRUD è `GET /membership/householdpickup/:householdId` (qualsiasi utente autenticato della chiesa, così i chioschi possono leggerlo) più `POST` / `DELETE` protetti da `people.edit`. Il personale gestisce l'elenco nella scheda **Ritiro** della pagina della persona (`B1Admin/src/people/components/PickupPeople.tsx`) — foto, relazione e un chip di stato Trusted/Not Authorized.

Al check-out (`B1Checkin/app/checkout.tsx`) il chiosco carica l'elenco di ritiro del nucleo: le voci `trusted` appaiono come schede di ritiro toccabili accanto alla griglia di foto degli adulti del nucleo, e un nome "Other" digitato liberamente viene confrontato in modo approssimativo (distanza di Levenshtein, `src/helpers/PickupMatchHelper.ts`) con le voci `notAuthorized` — una corrispondenza blocca il check-out con un foglio di avviso e un pulsante **Override** del personale. La sostituzione viene registrata sulla visita stessa: invia `checkedOutBy` come `"OVERRIDE: {name}"` tramite il normale `POST /attendance/visits/checkout`, così finisce nel registro delle presenze e nel webhook `attendance.checkout` invece che in una tabella di audit separata.

### Avvisare un genitore e trasmissione di emergenza {#pagea-parent-and-emergency-broadcast}

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) espone due endpoint SMS:

- `POST /page` — `{ visitId, message }`: avvisa i tutori di un solo bambino registrato (schermata di check-out del chiosco, modalità presidiata).
- `POST /broadcast` — `{ serviceId, message }`: invia un SMS a tutti gli adulti dei nuclei registrati per un servizio (impostazioni amministrative del chiosco, dietro un foglio di conferma che richiede di digitare `EMERGENCY` in `B1Checkin/app/adminSettings.tsx`).

Entrambi risolvono gli adulti dei nuclei tramite il gateway membership, poi affidano la consegna a **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — la porta tra moduli verso il provider di SMS configurato dalla chiesa (`@churchapps/texting`: TextInChurch, Clearstream o MutualMinistry; non esiste un mittente SMS integrato). Il gateway registra una riga `sentText` più voci `deliveryLog` per destinatario e limita un batch a 500 destinatari; senza un provider configurato restituisce `no_provider`, che il chiosco mostra come "No SMS provider configured". Il `dispatch()` del controller elimina i duplicati tra i numeri di telefono e salta le persone senza cellulare o con `optedOut` impostato, restituendo `{ sent, failed, skippedOptedOut, skippedNoPhone }` così il chiosco può mostrare cosa è stato saltato.

## Il chiosco (B1Checkin) {#the-kiosk-b1checkin}

Le schermate sono file expo-router sotto `B1Checkin/app/`; lo stato condiviso tra le schermate risiede in una classe statica `CachedData` (`src/helpers/CachedData.ts`), non nello stato di React.

```
index (avvio/accesso automatico) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             carica serviceTimes, groups, │             │  └─────────┘ └▶ addGuest  └▶ stampa etichette,
             groupServiceTimes,           │             └▶ checkout (presidiato)       ritorno automatico
             labelTemplates               │                                            a lookup
```

1. **Ricerca** (`app/lookup.tsx`) — cerca per telefono (`GET /membership/people/search/phone?number=`, ultime 4 cifre o numero completo) o per nome (`GET /membership/people/search?term=`). Selezionando una corrispondenza carica il nucleo (`GET /membership/people/household/{householdId}`) e le visite esistenti (`GET /attendance/visits/checkin`), popolando `pendingVisits` con le selezioni della settimana scorsa.
2. **Revisione del nucleo** (`app/household.tsx`, `src/components/MemberList.tsx`) — ogni riga membro mostra un badge di già registrato, un badge di allergia/`nametagNotes` e i chip delle aule attuali. Espandendo un membro si elencano tutti gli orari di servizio con un pulsante aula e i chip del tipo di check-in Member / Guest / Volunteer (`MemberServiceTimes.tsx`). Sotto il nome di ogni orario di servizio, `ServiceTimeHelper.getGroupSummary()` mostra i gruppi offerti in quell'orario (i nomi di `serviceTime.groups`, puliti, senza duplicati indipendentemente dalle maiuscole, separati da virgola); non viene mostrato nulla se l'orario non ha gruppi.
3. **Assegnazione al gruppo** (`app/selectGroup.tsx`) — un albero di categorie costruito da `serviceTime.groups`, con le aule idonee per età/classe evidenziate e quelle non idonee attenuate dietro una conferma del personale (vedi [Idoneità per età/classe](#agegrade-eligibility-kiosk-side)); scegliere un'aula scrive una visitSession `{ session: { serviceTimeId, groupId } }` nella visita in attesa di quella persona (`src/helpers/VisitSessionHelper.ts`). "None" la cancella.
4. **Completamento** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` con `pendingVisits` (ciascuna con il proprio `checkinType`), poi stampa le etichette se è configurata una stampante e torna automaticamente alla ricerca. Una risposta `409` di capienza o `notOpen` mostra l'aula indicata con il motivo (piena/chiusa, oppure check-in non aperto); un avviso di rapporto propone una conferma del personale che reinvia con `acknowledgeWarnings=true`.

La schermata di **check-out** (`app/checkout.tsx`) accetta il codice di sicurezza di 4 caratteri tramite un campo a messa a fuoco automatica — così funzionano anche gli scanner di codici a barre a tastiera USB/Bluetooth senza fotocamera — oppure un tastierino a schermo che usa lo stesso alfabeto, con invio automatico a 4 caratteri. Un pulsante **Scan** apre un foglio con la fotocamera condivisa `src/components/CodeScanner.tsx` (per impostazione predefinita quella posteriore, con supporto a QR, Code 128 e Code 39), così le postazioni senza scanner possono leggere l'etichetta di ritiro; un codice scansionato passa dallo stesso percorso `handleCode()` dell'input digitato. Cerca il codice, mostra i bambini da ritirare e presenta le **persone autorizzate al ritiro del nucleo** come schede toccabili accanto a una griglia di foto degli adulti del nucleo (più un'opzione "Other" a testo libero che viene confrontata in modo approssimativo con i nomi non autorizzati — vedi [Ritiro autorizzato e non autorizzato](#trusted-and-not-authorized-pickup)), poi invia `POST /attendance/visits/checkout` con nome/ID di chi ritira. In modalità presidiata la schermata offre anche **Avvisa un genitore** (`POST /attendance/checkin/page`) e una **ristampa dell'etichetta di sicurezza** — `reprint()` ricostruisce le etichette della famiglia con `LabelHelper.getAllLabelsFor(...)` e le invia nello stesso percorso `PrintUI` del check-in.

La modalità della postazione è un flag AsyncStorage `@StationMode` (`"self"` | `"manned"`, attivabile in `app/adminSettings.tsx`). La modalità presidiata aggiunge il punto di ingresso al check-out nella schermata di ricerca e la modifica del profilo della persona (`POST /membership/people`) dalla schermata del nucleo. La sicurezza del chiosco è integrata: un PIN facoltativo (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) protegge le schermate di amministrazione e delle stampanti, la schermata di amministrazione si apre solo con 7 tocchi rapidi sul logo dell'intestazione, e una schermata di attesa inattiva (`src/hooks/useInactivityTimer.ts`) subentra tra una famiglia e l'altra.

## Self check-in (B1App) {#self-check-in-b1app}

I membri effettuano il check-in dal portale b1.church nella schermata `/mobile/checkin` (instradata da `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` verso `screens/CheckinPage.tsx`). Richiede un utente connesso e percorre gli stessi quattro passi del chiosco — servizi → nucleo → gruppi → completamento — sugli stessi endpoint, con lo stato in `B1App/src/helpers/CheckinHelper.ts`. Le differenze rispetto al chiosco: il nucleo proviene dal `householdId` dell'utente connesso (nessun passo di ricerca), e non c'è stampa delle etichette — la schermata di completamento mostra invece l'ID di sicurezza del batch come QR (`qrcode.react`) con l'indicazione "show this at a check-in station". Se il nucleo è già registrato quando la pagina si carica, un pulsante "Show check-in code" mostra di nuovo il QR dalla prima visita esistente (da `GET /attendance/visits/checkin`) che ha un `securityCode`. Il check-in viene registrato immediatamente al momento dell'invio (non esiste uno stato in attesa); il QR serve solo a stampare le etichette sul chiosco.

**Stampa delle etichette da telefono a chiosco** (`B1Checkin/app/scan.tsx`, raggiunta dal pulsante "Scan code" del QR nella schermata di ricerca): il chiosco mostra `CodeScanner` (un `CameraView` di `expo-camera`, di default quella frontale, con possibilità di cambiarla) che cerca i QR. `ScanCodeHelper.parse()` accetta un contenuto solo se è un semplice codice di 4 caratteri dell'alfabeto del codice di sicurezza, e `ScanCodeHelper.isRepeat()` ignora lo stesso codice per 4 secondi, così funzionano sia il QR di B1App sia il blocco QR di un'etichetta stampata. La schermata segue poi il percorso di ristampa del check-out — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — e torna alla ricerca. Al momento della scansione non avviene alcuna scrittura delle presenze; solo etichette. I codici senza visite attive, le postazioni senza stampante e i gruppi senza etichette mostrano ciascuno un messaggio e riportano alla ricerca.

I tipi e `ApiHelper`/`ArrayHelper` provengono da `@churchapps/helpers` e `@churchapps/apphelper`; nessun componente React è condiviso con B1Admin.

## Presenze lato amministrazione (B1Admin) {#admin-side-attendance-b1admin}

- **Configurazione** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) mostra l'albero della struttura e permette di creare servizi (`ServiceEdit.tsx`) e orari di servizio (`ServiceTimeEdit.tsx`). I dati delle sedi arrivano da membership tramite l'hook `useCampuses()`.
- **Presenze manuali** si trovano nella sezione dei gruppi, non in quella delle presenze: `B1Admin/src/groups/components/GroupSessionsTab.tsx` crea le sessioni (`POST /attendance/sessions`; quando si aggiunge, `SessionEdit.tsx` può includere una sessione per ogni altro gruppo che condivide l'orario di servizio scelto, saltando i gruppi che hanno già una sessione in quella data) e segna le persone come presenti tramite `POST /attendance/visitsessions/log`, che trova o crea la visita di quella persona per quella sessione. I leader dei gruppi possono registrare le presenze dei propri gruppi senza il permesso `attendance.edit` — i controller verificano `au.leaderGroupIds`.
- **Report** — l'andamento delle presenze e le presenze per gruppo sono report definiti lato server (`B1Admin/src/components/reporting/ReportWithFilter.tsx` su ReportingApi; definizioni in `Api/reports/*.json`). Entrambi accettano `startDate`/`endDate` (data di fine inclusa); il report di andamento predefinisce da un anno fa fino a oggi e aggiunge una colonna `sessionDates` per settimana, mentre l'albero delle presenze per gruppo a schermo include il `checkinTime` di ogni visita e lo `membershipStatus` della persona. Il CSV delle presenze per gruppo proviene dal report complementare `groupAttendanceDownload`, pivotato da `GroupAttendanceDownloadHelper` in una riga per membro del gruppo con una colonna presente/assente per ogni sessione datata; lo storico per persona è `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Stampa delle etichette {#label-printing}

### Modelli e progettazione {#templates-and-the-designer}

Le chiese progettano le proprie etichette in B1Admin su `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, raggiunto dalla pagina delle impostazioni del Check-In). Un modello è una riga `labelTemplates` il cui `content` è un array JSON di blocchi — `text`, `field`, `barcode`, `qrcode` o `box` — ognuno posizionato in coordinate percentuali con carattere, allineamento, simbologia (`code39`/`code128`/`qr`) e condizioni di visibilità facoltative (ad esempio mostrare il riquadro delle allergie solo quando `person.nametagNotes` non è vuoto). Esistono due `labelType`: `nametag` (uno per persona registrata; campi come `person.displayName`, `sessions`, `securityCode` e `person.isBirthdayWeek` — `"true"` quando mese/giorno del compleanno cadono entro 3 giorni da oggi, con passaggio a cavallo dell'anno, calcolato da `LabelHelper.isBirthdayWithin()`) e `pickup` (uno per famiglia; campi come `children`, `childrenAllergies`). Il server impone un solo predefinito per tipo per chiesa (`LabelTemplateController.save`). Il progettista include modelli di partenza che rispecchiano le etichette incluse nel chiosco e mostra l'anteprima con dati di esempio.

### Rendering e stampa sul chiosco {#rendering-and-printing-on-the-kiosk}

Al completamento del check-in, `B1Checkin/src/helpers/LabelHelper.ts` decide cosa stampare in base ai flag di gruppo di ogni visita in attesa: cartellini per i gruppi con `printNametag`, più un'etichetta di ritiro familiare se una visita ha colpito un gruppo `parentPickup`. Le visite con `checkinType` `volunteer` vengono saltate da `LabelHelper.selectChildVisits()`, così un operatore dell'infanzia in un'aula Parent Pickup non attiva mai un'etichetta di ritiro. Il codice di sicurezza della risposta di check-in va sui cartellini dei bambini e sull'etichetta di ritiro; i cartellini degli adulti vengono stampati senza codice. Se la chiesa ha dei modelli, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) trasforma blocchi e contesto dei campi in un documento HTML autonomo; altrimenti vengono usate le etichette HTML incluse in `B1Checkin/assets/labels/` con sostituzione dei segnaposto.

I codici a barre sono generati come SVG inline da codificatori TypeScript puri in `B1Checkin/src/helpers/barcode.ts` — tabelle di pattern Code 39 e tabelle di larghezza Code 128 (set B con checksum mod-103), più QR tramite il pacchetto `qrcode`. **Questi codificatori sono intenzionalmente duplicati in B1Admin** (`LabelEditor.tsx` include le stesse tabelle, come indicato in un commento nel codice), così le anteprime del progettista corrispondono pixel per pixel all'output del chiosco; una modifica a uno deve essere replicata nell'altro.

La pipeline di stampa (`src/components/PrintUI.tsx`) rende ogni etichetta HTML in un `WebView`, la cattura come JPG tramite `react-native-view-shot` e passa gli URI delle immagini al modulo Expo nativo **printer-helper** (`B1Checkin/modules/printer-helper/`). Il modulo espone `scan()`, `checkInit()`, `printUris()` ed eventi di stato, con un provider per marca su entrambe le piattaforme:

| Marca | Android | iOS | Note |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (SDK di stampa Brother) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Stampanti di rete della serie QL (QL-800/810W/820NWB/1100/1110NWB…), etichette fustellate 29×90, il predefinito consigliato |
| Zebra | `ZebraProvider.kt` (SDK Link-OS) | `ZebraProvider.swift` + `ZebraBridge` | Rilevamento in rete + stampa di immagini TCP/ZPL |

La scelta della stampante si trova in `app/printers.tsx` (la scansione di rete restituisce voci `brand~model~ip`; la scelta viene salvata in AsyncStorage), e `src/helpers/PrinterLog.ts` conserva un registro diagnostico sul dispositivo, visualizzato tramite un indicatore di stato nell'intestazione del chiosco.

## Registrazione degli ospiti {#guest-registration}

Due percorsi creano una persona durante il check-in:

- **Al chiosco** — il pulsante "Add guest" della schermata del nucleo apre `B1Checkin/app/addGuest.tsx`, che prima cerca in `GET /membership/people/search?term=` una corrispondenza non membro esistente e altrimenti ne crea una con `POST /membership/people`, collegata al nucleo corrente. L'ospite prosegue poi con l'assegnazione al gruppo come ogni membro.
- **Self-service tramite QR** — quando l'impostazione della chiesa `enableQRGuestRegistration` è attiva (configurata nelle impostazioni del Check-In di B1Admin, letta da `GET /membership/settings/public/{churchId}`), la schermata di ricerca del chiosco mostra un QR che punta a `https://{subdomain}.b1.church/guest-register?serviceId=`. Quella pagina di B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) permette a una famiglia in visita di registrarsi dal proprio telefono tramite l'endpoint anonimo `POST /membership/people/guest-register`, mantenendo scorrevole la fila al chiosco. Il foglio del QR ha anche un pulsante **Register here** che apre la stessa pagina sul chiosco (`app/guestRegister.tsx`) in un `WebView` in incognito con cache disabilitata; `src/helpers/GuestRegisterHelper.ts` costruisce l'URL sia per il QR sia per il WebView e blocca la navigazione verso altri indirizzi rispetto a `https://{subdomain}.b1.church/guest-register`. La schermata torna alla ricerca con **Done**, con il pulsante indietro o dopo 120 secondi di inattività (la digitazione nel modulo viene inoltrata dal WebView come attività), smontando il WebView così i dati di una famiglia non arrivano mai alla successiva.

## Pagine correlate {#related-pages}

- [Endpoint Presenze](../api/endpoints/attendance) -- Superficie REST completa per sedi, servizi, sessioni, visite e sessioni di visita
- [Endpoint Membership](../api/endpoints/membership) -- Persone, nuclei e gruppi
- [Webhook](../api/webhooks) -- Gli eventi `session.created`, `attendance.recorded` e `attendance.checkout`
- [Struttura del modulo](../api/module-structure) -- Come è organizzato lato server il modulo presenze
