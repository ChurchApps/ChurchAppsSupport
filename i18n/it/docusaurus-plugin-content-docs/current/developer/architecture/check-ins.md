---
title: "Check-in"
description: "Come funziona il check-in in B1Checkin, B1App e B1 Admin: il modello dei dati delle presenze, i gruppi come aule, i controlli di capienza e le regole di sicurezza per il ritiro."
---

# Check-in {#check-ins}

<div class="article-intro">

Il check-in è un unico sistema con tre punti di accesso: l'app chiosco B1Checkin per le postazioni con personale e self-service, il self check-in nel portale membri di B1App e le presenze lato amministrazione in B1Admin. Tutti e tre scrivono nello stesso modulo delle presenze nell'Api principale, e l'instradamento verso le aule è gestito interamente dai Gruppi -- non esiste un'entità separata di "sedi" o "stanze". Sopra c'è un livello di sicurezza per i minori: tipi di check-in per visita, controlli di capienza e di rapporto con i volontari lato server, idoneità per età/classe lato chiosco, verifica della persona autorizzata al ritiro al check-out e avvisi ai genitori tramite il fornitore SMS della chiesa. Questa pagina descrive il modello dei dati, i flussi di check-in, il livello di sicurezza e la pipeline di stampa delle etichette.

</div>

## Panoramica {#overview}

```
┌──────────────────────────┐
│ B1Checkin (chiosco Expo) │──┐         ┌──────────────────────────────────────────────┐
│  ricerca → nucleo →      │  │         │ Api                                          │
│  gruppi → completa/stampa│  │  HTTPS  │  ┌─ modulo membership ─────────────────────┐ │
├──────────────────────────┤  ├───────▶ │  │ persone · nuclei · gruppi               │ │
│ B1App (self check-in)    │──┤         │  └─────────────────────────────────────────┘ │
│  schermata /mobile/checkin│  │         │  ┌─ modulo attendance ─────────────────────┐ │
├──────────────────────────┤  │         │  │ sedi → culti → orari dei culti          │ │
│ B1Admin (staff)          │──┘         │  │ groupServiceTimes  (instradamento aule) │ │
│  configurazione · report │            │  │ sessions ← visitSessions → visits       │ │
│  editor etichette        │            │  │ labelTemplates                          │ │
└──────────────────────────┘            │  └─────────────────────────────────────────┘ │
                                        └──────────────────────────────────────────────┘

Percorso di stampa delle etichette (solo chiosco):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (modelli di etichette, oppure il fallback HTML incluso)
       └▶ LabelRenderer → documento HTML + codici a barre SVG inline
            └▶ PrintUI: rendering WebView → cattura JPG con ViewShot
                 └▶ modulo nativo printer-helper → Brother QL / Zebra
```

| Superficie | Repository | Stack | Ruolo |
|---------|------|-------|------|
| Chiosco | `B1Checkin` | Expo / React Native, routing a file con expo-router; build EAS per Android, Amazon Fire e iOS; aggiornamenti OTA tramite `expo-updates` | Postazione con personale o self-service con stampa delle etichette e check-out verificato |
| Self check-in | `B1App` | Next.js (portale membri b1.church) | I membri connessi registrano il proprio nucleo dal telefono; nessuna stampa |
| Amministrazione | `B1Admin` | SPA React | Configura la struttura dei servizi, assegna i gruppi agli orari dei servizi, progetta le etichette, registra le presenze manuali, produce i report |

Tutti e tre chiamano gli stessi due moduli dell'API tramite `ApiHelper`: **MembershipApi** (`/membership`) per persone, nuclei e gruppi; **AttendanceApi** (`/attendance`) per tutto ciò che è descritto sotto.

## Modello dei dati (`Api/src/modules/attendance`) {#data-model-apisrcmodulesattendance}

| Entità / tabella | Campi chiave | Significato |
|----------------|-----------|---------|
| `campuses` | name, address | Obsoleta qui -- i campus sono gestiti nel modulo membership (`/membership/campuses`); la copia nel modulo presenze è congelata in sola lettura per i lettori legacy (`models/Campus.ts`) |
| `services` | campusId, name | Un incontro ricorrente, ad esempio "Domenica mattina" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Una fascia oraria all'interno di un servizio, ad esempio "9:00" (`models/ServiceTime.ts`). Le colonne di pianificazione sono facoltative (migrazione `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) e determinano la [finestra di check-in](#scheduled-check-in-windows) |
| `groupServiceTimes` | groupId, serviceTimeId | Tabella di collegamento: quali gruppi (aule) si riuniscono in quali orari dei servizi (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Un incontro di un gruppo in una data -- creato in modo pigro al momento del check-in (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Una persona che partecipa in una data (`models/Visit.ts`). `checkinType` è `member` / `guest` / `volunteer` (NULL = membro legacy), impostato dal chiosco e usato dai controlli di capienza e rapporto |
| `visitSessions` | visitId, sessionId | Quale/i sessione/i copre una visita -- un bambino registrato a due orari di servizio ottiene due righe (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (blocchi JSON) | Layout di etichette progettabili (`models/LabelTemplate.ts`) |

### Come viene salvato un check-in completato {#how-a-completed-check-in-is-persisted}

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) gestisce `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Il corpo è un array di oggetti `Visit`, ciascuno con `visitSessions` il cui `session` incorporato indica solo una coppia `(serviceTimeId, groupId)`. Il server poi:

1. **Applica i controlli di capienza e di rapporto prima di qualsiasi scrittura.** `evaluateGates()` → `CheckinGateHelper.evaluate()` verifica per ogni aula coinvolta la capienza, la capienza degli ospiti, lo stato di chiusura e il rapporto con i volontari rispetto all'occupazione attuale. postCheckin **non è transazionale**, quindi il controllo deve avvenire prima del primo salvataggio: una violazione grave restituisce un 409 che indica l'aula (o le aule) coinvolte e non viene salvato nulla. Vedi [Controlli di capienza e rapporto con i volontari](#capacity-and-volunteer-ratio-gates).
2. **Risolve le sessioni in modo pigro.** `getSessionId()` trova o crea la riga di `sessions` per `(groupId, serviceTimeId, oggi)` -- gli id di sessione sono memorizzati nella cache del processo per data. Le nuove sessioni emettono un webhook `session.created`. Il ciclo è un `for..of` con `await` -- un precedente `forEach(async …)` senza attesa andava in competizione con il salvataggio e scriveva sessionId NULL alla creazione della prima sessione (corretto; documentato in un commento nel codice accanto al ciclo).
3. **Sostituisce i record del giorno.** Tutte le visite esistenti di quelle persone per quel servizio oggi vengono eliminate insieme alle loro visitSessions, poi viene salvato l'insieme inviato. Ripetere il check-in di una famiglia è quindi un'operazione idempotente di "questo è lo stato attuale", non un'aggiunta. Passando `?checkDuplicates=true` si ottiene invece `{ duplicates: [personId…] }` senza scrivere nulla: è il modo in cui il chiosco avvisa prima di sovrascrivere.
4. **Genera un codice di sicurezza per batch.** `SecurityCodeHelper.generate()` produce un codice di 4 caratteri dall'alfabeto `23456789BCDFGHJKLMNPQRSTVWXYZ` (senza vocali né caratteri ambigui, così i codici non possono formare parole né essere letti male). Il server riprova in caso di collisione con le visite aperte dello stesso giorno della stessa chiesa e applica il codice a ogni visita del batch.
5. **Restituisce `{ streaks, securityCode }`.** `streaks` associa a ogni personId il conteggio delle settimane consecutive di presenza; il chiosco festeggia le tappe (ogni 5ª settimana) con i coriandoli.

Ogni visita salvata emette anche un webhook `attendance.recorded`. La lettura, `GET /attendance/visits/checkin`, restituisce le visite delle persone a partire dalla loro **ultima data registrata** -- se quella era una settimana precedente, gli id vengono rimossi, così il client riceve una copia precompilata delle selezioni di aula della settimana scorsa che verrà salvata come nuovi record.

### Check-out {#check-out}

Tre endpoint completano il ciclo (`VisitController`):

- `GET /attendance/visits/code/:code` -- le visite di oggi non ancora registrate in uscita con quel codice di sicurezza, con le sessioni compilate.
- `GET /attendance/visits/active?peopleIds=` -- le visite di oggi non ancora registrate in uscita per le persone indicate (qualsiasi codice di sicurezza), con le sessioni compilate; restituisce 400 quando `peopleIds` è vuoto. Alimenta il check-out per nome.
- `POST /attendance/visits/checkout` -- corpo `{ visitIds, checkedOutBy?, checkedOutById? }`; registra `checkoutTime` e chi ha ritirato il bambino, ed emette un webhook `attendance.checkout` per ogni visita.

Permessi: i chioschi si autenticano con `attendance.checkin`, che concede esattamente la superficie di check-in/check-out/modelli di etichette, più le ricerche sui nuclei di cui il chiosco ha bisogno senza `people.view` (ricerca per telefono/nome, membri del nucleo nel modello di check-in ed elenco delle persone autorizzate al ritiro del nucleo). `SessionHelper.filterChurches` di B1Checkin mostra solo le chiese in cui l'account ha `Attendance/Checkin` o `Attendance/Edit`. `Checkin` non fa più parte dei permessi di Everyone (ruolo nullo) (`RoleHelper` e la migrazione `2026-11-01_remove_everyone_checkin`), quindi deve essere concesso tramite un ruolo reale; `attendance.view`/`attendance.edit` coprono i report e l'inserimento manuale; la struttura (servizi, orari dei servizi, assegnazioni dei gruppi) richiede `services.edit`. Il self check-in dei membri (B1App) non richiede alcun permesso: qualsiasi utente autenticato con una persona collegata nella chiesa può chiamare `GET`/`POST /attendance/visits/checkin`, e il server limita i `personId` inviati al nucleo familiare del chiamante (altrimenti 403) -- questo vincolo impedisce di leggere i `securityCode` di altre famiglie. L'appartenenza è la concessione; se i membri *vedono* la funzione è controllato dalle schede di navigazione di B1App della chiesa. Gli altri endpoint di check-in (`code/:code`, `active`, `checkout`, `guardians`, `CheckinController`) restano riservati a chioschi e personale.

## I gruppi governano l'instradamento nelle aule {#groups-drive-room-routing}

Non esiste un'entità per stanze o aule in tutto il sistema. Un'"aula" è un **gruppo** di membership con `trackAttendance` attivo, collegato a uno o più orari di servizio tramite `groupServiceTimes`. I campi del gruppo (in `Api/src/modules/membership/models/Group.ts`) che determinano il comportamento del chiosco:

| Campo | Effetto |
|------|--------|
| `trackAttendance` | Il gruppo partecipa alle presenze; l'albero di configurazione di B1Admin segnala come non assegnati i gruppi `trackAttendance` senza una riga in `groupServiceTimes` |
| `parentPickup` | Contrassegna un'aula per bambini: registrarsi lì rende la visita una visita "bambino", che stampa un'etichetta di ritiro familiare e inserisce il codice di sicurezza sul cartellino |
| `printNametag` | Se i check-in in questo gruppo stampano un cartellino |
| `capacity` / `guestCapacity` / `checkinClosed` | Limiti di capienza dell'aula e un interruttore "chiuso" immediato, applicati lato server dal controllo di check-in (modificati nelle impostazioni del gruppo in B1Admin sotto "Capienza del check-in") |
| `volunteerRatio` / `minVolunteers` | Rapporto bambini-volontari e numero minimo di volontari, applicati secondo l'impostazione della chiesa `ratioEnforcement` |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Limiti di idoneità per età/classe valutati dal chiosco per evidenziare o oscurare le aule |

Ogni client denormalizza nello stesso modo (ad esempio `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): carica in parallelo `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` e `GET /membership/groups`, poi per ogni orario di servizio raccoglie in `serviceTime.groups` i gruppi la cui riga di `groupServiceTimes` punta a quell'orario. Quell'array è ciò che mostra il selettore delle aule, organizzato per `categoryName` del gruppo.

Le assegnazioni si modificano dalla pagina del gruppo in B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` -- `POST`/`DELETE /attendance/groupservicetimes`), e l'intero albero Campus → Servizio → Orario del servizio → Gruppo è visualizzato in `B1Admin/src/attendance/components/AttendanceSetup.tsx` tramite `GET /attendance/attendancerecords/tree`.

:::info
Poiché i gruppi sono l'unica fonte di verità, la stessa appartenenza ai gruppi alimenta l'instradamento del chiosco, le presenze per elenco nelle pagine dei gruppi di B1Admin e i report sulle presenze -- assegnare un gruppo a un orario di servizio è l'unico passaggio necessario per renderlo una destinazione di check-in.
:::

## Sicurezza dei bambini {#child-safety}

### Tipi di check-in {#check-in-types}

Ogni visita porta un `checkinType` -- `member`, `guest` oppure `volunteer` (NULL significa legacy/membro; migrazione `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Il tipo viene scelto **lato chiosco**: i chip Membro / Ospite / Volontario sulla riga espansa del membro (`B1Checkin/src/components/MemberServiceTimes.tsx`), applicati a ciascuna visita in attesa al completamento (`app/checkinComplete.tsx`, con `member` come valore predefinito). Il server lo usa nel controllo: i volontari contano ai fini del rapporto anziché contro la capienza, e gli ospiti contano contro `guestCapacity`.

### Controlli di capienza e rapporto con i volontari {#capacity-and-volunteer-ratio-gates}

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) viene eseguito dentro `postCheckin` prima di qualsiasi salvataggio (l'endpoint non è transazionale, quindi il controllo prima del salvataggio è il meccanismo di correttezza). Carica l'occupazione attuale per ogni gruppo coinvolto (`VisitRepo.countActiveByGroupToday`) e la configurazione del gruppo tramite il gateway del modulo membership, poi classifica le violazioni:

- **Bloccanti (bloccano sempre):** `checkinClosed`, `current + incoming > capacity`, numero di ospiti oltre `guestCapacity`. Il batch viene rifiutato con `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` -- il chiosco mostra l'aula indicata.
- **Rapporto (avviso o blocco):** i non volontari in arrivo in un'aula dove `volunteers < minVolunteers`, senza alcun volontario, oppure `children > volunteers × volunteerRatio`. La gravità segue l'impostazione della chiesa `ratioEnforcement` (`"warn"` predefinito / `"block"`, modificabile in B1Admin, Gestisci chiesa → Check-In, `CheckinSettingsEdit.tsx`). In modalità avviso restituisce `409 { warning: true, error: "ratio", … }` a meno che il client non rinvii la richiesta con `acknowledgeWarnings=true` -- quel rinvio è la conferma del personale che il chiosco permette di forzare.

### Finestre di check-in programmate {#scheduled-check-in-windows}

Un orario di servizio può avere una pianificazione settimanale facoltativa (`dayOfWeek` da 0 a 6 con 0 = domenica, `startTime`/`endTime` in formato `HH:mm`, `checkinOpenMinutes`, `checkinCloseMinutes`), modificata nel modulo dell'orario di servizio in **Presenze → Configurazione** di B1Admin (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, "Pianificazione del check-in"). `CheckinGateHelper.hasSchedule()` considera un orario di servizio pianificato solo quando sono impostati sia `dayOfWeek` sia `startTime`; gli orari non pianificati non sono mai vincolati all'orario. `isServiceTimeOpen()` calcola la finestra nell'ora locale (`DateHelper.toChurchTime`). Il fuso orario è risolto per ogni orario di servizio da `CheckinTimeZoneHelper.load()` (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`): prima il `timezone` del campus del servizio (`service.campusId`, tramite `MembershipModuleGateway.loadCampusTimeZones`), poi il `timeZone` della chiesa (impostato in Informazioni sulla chiesa di B1Admin), poi il primo campus non rimosso che ha un `timezone` (`loadCampusTimeZone`), e solo infine `America/New_York`. Il campus viene prima perché molte chiese avevano `America/New_York` retroattivamente come fuso della chiesa. Sia l'elenco sia il percorso di registrazione descritti sotto risolvono il fuso allo stesso modo. La finestra va da `checkinOpenMinutes` prima dell'inizio a `checkinCloseMinutes` dopo la fine (o dopo l'inizio se non c'è una fine), gestendo finestre che attraversano la mezzanotte o il cambio settimana.

La finestra è applicata in due punti:

- **Elenco:** `GET /attendance/servicetimes` associa a ogni riga un booleano calcolato `checkinOpen`. Il self check-in di B1App (`CheckinPage.tsx`) e il selettore dei servizi di B1Checkin (`app/services.tsx`) mantengono tutti gli orari. Quando tutti gli orari di un servizio sono chiusi, mostrano la prossima apertura ("Il check-in apre dom 9:30" in B1App, "Il check-in per questo servizio apre dom 9:30" in B1Checkin, da `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`), con il ripiego "Il check-in non è aperto per questo servizio in questo momento." quando non è possibile calcolare alcuna apertura (il chiosco offre un pulsante Indietro per scegliere un altro servizio). Altrimenti gli orari chiusi appaiono come una riga "Chiuso" / "Chiuso · apre alle 9:30" non selezionabile. La schermata del nucleo di B1Checkin (`MemberServiceTimes.tsx`) ricalcola in tempo reale l'apertura con l'orologio del dispositivo (`ServiceTimeHelper.isCheckinOpen()`, fuso orario del dispositivo, non quello della chiesa), così un chiosco lasciato acceso apre e chiude in orario, e mostra "Aula 1 bambini · Registrato" (nome del gruppo) su un orario chiuso in cui la persona è già registrata.
- **Registrazione:** all'interno di `evaluateGates()`, prima della valutazione di capienza/rapporto, `findClosedServiceTimeGroups()` rifiuta il batch con `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` se l'orario di servizio di una sessione coinvolta è fuori dalla sua finestra. Poiché le visite di oggi di un nucleo familiare vengono reinviate a ogni check-in, le sessioni già possedute dalla persona (`personId|sessionId` nelle visite esistenti) saltano questo controllo, così l'aggiunta di un orario successivo ancora aperto non viene rifiutata perché una finestra precedente è chiusa. B1Checkin mostra questo risultato nella sua schermata di blocco con il motivo "il check-in non è aperto in questo momento" (le violazioni di capienza continuano a riportare "aula piena o chiusa").

### Idoneità per età/classe (lato chiosco) {#agegrade-eligibility-kiosk-side}

L'idoneità delle aule è un'indicazione per l'interfaccia, valutata sul chiosco, non imposta dal server. `B1Checkin/src/helpers/EligibilityHelper.ts` confronta data di nascita/classe di una persona con `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` del gruppo (ordine delle classi: PreK, K, da 1 a 12, Diplomato) e restituisce `eligible` / `ineligible` / `unknown` -- dati mancanti producono `unknown` e non nascondono mai un'aula. Età e classi sono calcolate alla **data di promozione di classe** della chiesa (impostazione `gradePromotionDate`, `"MM-DD"`, modificata in `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); il chiosco la recupera da `GET /attendance/checkin/settings`, e `resolveAsOfDate` sceglie l'occorrenza più recente non successiva a oggi. Il selettore delle aule evidenzia quelle idonee e oscura quelle non idonee; scegliere un'aula oscurata richiede la conferma del personale.

### Ritiro da parte di persone fidate e non autorizzate {#trusted-and-not-authorized-pickup}

Le persone autorizzate al ritiro sono un'entità del modulo membership, per nucleo familiare: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` -- householdId, personId facoltativo, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). Le operazioni CRUD sono `GET /membership/householdpickup/:householdId` (qualsiasi utente autenticato della chiesa, così i chioschi possono leggerla) più `POST` / `DELETE` protetti da `people.edit`. Il personale gestisce l'elenco nella scheda **Ritiro** della pagina della persona (`B1Admin/src/people/components/PickupPeople.tsx`) -- foto, relazione e un chip di stato Fidato / Non autorizzato.

Al check-out (`B1Checkin/app/checkout.tsx`) il chiosco carica l'elenco delle persone autorizzate del nucleo: le voci `trusted` compaiono come schede toccabili per il ritiro, accanto alla griglia di foto degli adulti del nucleo, e un nome "Altro" digitato liberamente viene confrontato in modo approssimato (distanza di Levenshtein, `src/helpers/PickupMatchHelper.ts`) con le voci `notAuthorized` -- una corrispondenza blocca il check-out con una scheda di avviso e un pulsante **Forza** per il personale. La forzatura viene registrata sulla visita stessa: invia `checkedOutBy` come `"OVERRIDE: {name}"` tramite il normale `POST /attendance/visits/checkout`, quindi finisce nel registro delle presenze e nel webhook `attendance.checkout` invece che in una tabella di audit separata.

### Avviso ai genitori ed emergenza {#page-a-parent-and-emergency-broadcast}

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) espone due endpoint per gli SMS:

- `POST /page` -- `{ visitId, message }`: avvisa i tutori di un solo bambino registrato (schermata di check-out del chiosco, modalità con personale).
- `POST /broadcast` -- `{ serviceId, message }`: invia un SMS agli adulti di ogni nucleo registrato per un servizio (impostazioni amministrative del chiosco, dietro una scheda di conferma che richiede di digitare `EMERGENCY`, in `B1Checkin/app/adminSettings.tsx`).

Entrambi risolvono gli adulti del nucleo tramite il gateway di membership, poi affidano la consegna a **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) -- il varco tra moduli verso il fornitore SMS configurato dalla chiesa (`@churchapps/texting`: TextInChurch, Clearstream o MutualMinistry; non esiste un mittente SMS integrato). Il gateway registra una riga `sentText` più le voci `deliveryLog` per destinatario e limita un batch a 500 destinatari; senza un fornitore configurato restituisce `no_provider`, che il chiosco mostra come "Nessun fornitore SMS configurato". Il `dispatch()` del controller elimina i numeri di telefono duplicati e salta le persone senza cellulare o con `optedOut` impostato, restituendo `{ sent, failed, skippedOptedOut, skippedNoPhone }` così il chiosco può mostrare cosa è stato saltato.

## Il chiosco (B1Checkin) {#the-kiosk-b1checkin}

Le schermate sono file expo-router in `B1Checkin/app/`; lo stato tra schermate è nella classe statica `CachedData` (`src/helpers/CachedData.ts`), non nello stato di React.

```
index (avvio/accesso automatico) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             carica serviceTimes, groups, │             │  └─────────┘ └▶ addGuest  └▶ stampa etichette,
             groupServiceTimes,           │             └▶ checkout (con personale)     ritorno automatico
             labelTemplates               │                                            a lookup
```

1. **Ricerca** (`app/lookup.tsx`) -- cerca per telefono (`GET /membership/people/search/phone?number=`, ultime 4 cifre o numero completo) oppure per nome (`GET /membership/people/search?term=`). Selezionando una corrispondenza si carica il nucleo (`GET /membership/people/household/{householdId}`) e le visite esistenti (`GET /attendance/visits/checkin`), precompilando `pendingVisits` con le selezioni della settimana precedente.
2. **Revisione del nucleo** (`app/household.tsx`, `src/components/MemberList.tsx`) -- ogni riga di membro mostra un badge di già registrato, un badge per allergie/`nametagNotes` e i chip delle aule attuali. Espandendo un membro si elenca ogni orario di servizio con un pulsante per l'aula e i chip del tipo di check-in Membro / Ospite / Volontario (`MemberServiceTimes.tsx`). Sotto il nome di ogni orario, `ServiceTimeHelper.getGroupSummary()` mostra i gruppi offerti in quell'orario (i nomi di `serviceTime.groups`, con spazi eliminati, senza duplicati indipendentemente dalle maiuscole, separati da virgole); non viene mostrato nulla quando l'orario non ha gruppi.
3. **Assegnazione del gruppo** (`app/selectGroup.tsx`) -- un albero di categorie costruito da `serviceTime.groups`, con le aule idonee per età/classe evidenziate e quelle non idonee oscurate dietro una conferma del personale (vedi [Idoneità per età/classe](#agegrade-eligibility-kiosk-side)); scegliendo un'aula si scrive una `{ session: { serviceTimeId, groupId } }` visitSession nella visita in attesa della persona (`src/helpers/VisitSessionHelper.ts`). "Nessuna" la cancella.
4. **Completa** (`app/checkinComplete.tsx`) -- `POST /attendance/visits/checkin` con `pendingVisits` (ciascuna con il proprio `checkinType`), poi stampa le etichette se è configurata una stampante e torna automaticamente alla ricerca. Una risposta `409` di capienza o `notOpen` mostra l'aula indicata con il motivo (piena/chiusa, oppure check-in non aperto); un avviso di rapporto offre una conferma del personale che reinvia la richiesta con `acknowledgeWarnings=true`.

La schermata di **check-out** (`app/checkout.tsx`) accetta il codice di sicurezza di 4 caratteri tramite un campo a fuoco automatico -- così i lettori di codici a barre USB/Bluetooth funzionano senza fotocamera -- oppure tramite un tastierino a schermo che usa lo stesso alfabeto, con invio automatico a 4 caratteri. Il pulsante **Scansiona** apre una scheda con la fotocamera condivisa `src/components/CodeScanner.tsx` (di default quella posteriore, con QR, Code 128 e Code 39), così le postazioni senza lettore a tastiera possono leggere l'etichetta di ritiro; un codice scansionato segue lo stesso percorso `handleCode()` dell'inserimento manuale. Il pulsante **Cerca per nome** sostituisce l'inserimento del codice con `src/components/HouseholdSearch.tsx` (ricerca per cognome o telefono, con gli stessi endpoint `/membership/people/search` della ricerca); selezionando una persona si carica il suo nucleo (`GET /membership/people/household/{householdId}`) e si chiama `GET /attendance/visits/active?peopleIds=` con l'id di ogni membro, così un'etichetta smarrita non blocca il ritiro. In entrambi i casi mostra i bambini da ritirare e presenta le **persone fidate per il ritiro** del nucleo come schede toccabili, accanto a una griglia di foto degli adulti del nucleo (più un'opzione "Altro" a testo libero, controllata in modo approssimato rispetto ai nomi non autorizzati -- vedi [Ritiro da parte di persone fidate e non autorizzate](#trusted-and-not-authorized-pickup)), poi invia `POST /attendance/visits/checkout` con nome/id scelto. In modalità con personale la schermata offre anche **Avvisa un genitore** (`POST /attendance/checkin/page`) e la **ristampa dell'etichetta di sicurezza** -- `reprint()` ricostruisce le etichette della famiglia con `LabelHelper.getAllLabelsFor(...)` e le passa alla stessa pipeline `PrintUI` del check-in.

La modalità della postazione è un flag AsyncStorage `@StationMode` (`"self"` | `"manned"`, modificabile in `app/adminSettings.tsx`). La modalità con personale aggiunge il punto di accesso al check-out nella schermata di ricerca e la modifica del profilo per persona (`POST /membership/people`) dalla schermata del nucleo. Il chiosco include protezioni integrate: un PIN facoltativo (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) protegge le schermate di amministrazione e della stampante, la schermata di amministrazione si apre solo con 7 tocchi rapidi sul logo nell'intestazione, e una schermata di attesa inattiva (`src/hooks/useInactivityTimer.ts`) subentra tra una famiglia e l'altra.

## Self check-in (B1App) {#self-check-in-b1app}

I membri si registrano dal portale b1.church nella schermata `/mobile/checkin` (instradata da `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` verso `screens/CheckinPage.tsx`). Richiede un utente connesso e segue gli stessi quattro passi del chiosco -- servizi → nucleo → gruppi → completa -- con gli stessi endpoint, con lo stato gestito in `B1App/src/helpers/CheckinHelper.ts`. Le differenze rispetto al chiosco: il nucleo viene dal `householdId` dell'utente connesso (nessun passo di ricerca), e non c'è stampa delle etichette -- la schermata di completamento mostra invece il codice di sicurezza del batch come QR (`qrcode.react`), con il suggerimento "mostra questo a una postazione di check-in". Se il nucleo è già registrato quando la pagina si carica, un pulsante "Mostra codice di check-in" mostra di nuovo il QR dalla prima visita esistente che contiene un `securityCode` (da `GET /attendance/visits/checkin`). La registrazione viene salvata subito all'invio (non esiste uno stato in attesa); il QR serve solo per la stampa delle etichette sul chiosco.

**Stampa delle etichette dal telefono al chiosco** (`B1Checkin/app/scan.tsx`, raggiunta dal pulsante "Scansiona codice" sul QR nella schermata di ricerca): il chiosco mostra `CodeScanner` (un `CameraView` di `expo-camera`, di default rivolto verso l'utente, con possibilità di cambiare) che cerca codici QR. `ScanCodeHelper.parse()` accetta un contenuto solo se è un codice di 4 caratteri nudo nell'alfabeto dei codici di sicurezza, e `ScanCodeHelper.isRepeat()` ignora lo stesso codice per 4 secondi, così funzionano sia il QR di B1App sia il blocco QR di un'etichetta stampata. La schermata segue poi il percorso di ristampa del check-out -- `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` -- e torna alla ricerca. Al momento della scansione non avviene alcuna scrittura delle presenze: solo le etichette. I codici senza visite attive, le postazioni senza stampante e i gruppi senza etichette mostrano ciascuno un messaggio temporaneo e riportano alla ricerca.

Tipi e `ApiHelper`/`ArrayHelper` provengono da `@churchapps/helpers` e `@churchapps/apphelper`; nessun componente React è condiviso con B1Admin.

## Presenze lato amministrazione (B1Admin) {#admin-side-attendance-b1admin}

- **Configurazione** -- `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) mostra l'albero della struttura e crea servizi (`ServiceEdit.tsx`) e orari dei servizi (`ServiceTimeEdit.tsx`). I dati dei campus provengono dal modulo membership tramite l'hook `useCampuses()`.
- **Presenze manuali** si trovano nella sezione Gruppi, non nella sezione Presenze: `B1Admin/src/groups/components/GroupSessionsTab.tsx` crea le sessioni (`POST /attendance/sessions`; quando si aggiunge, `SessionEdit.tsx` può includere una sessione per ogni altro gruppo che condivide l'orario di servizio scelto, saltando i gruppi che hanno già una sessione in quella data) e segna le persone come presenti tramite `POST /attendance/visitsessions/log`, che trova o crea la visita di quella persona e di quella sessione. I leader dei gruppi possono registrare le presenze per i propri gruppi senza il permesso `attendance.edit` -- i controller verificano `au.leaderGroupIds`.
- **Report** -- l'andamento delle presenze e le presenze per gruppo sono report definiti dal server (`B1Admin/src/components/reporting/ReportWithFilter.tsx` su ReportingApi; definizioni in `Api/reports/*.json`). Entrambi accettano `startDate`/`endDate` (data di fine inclusa); il report di andamento usa di default da un anno fa fino a oggi e aggiunge una colonna `sessionDates` per settimana, mentre l'albero a schermo delle presenze per gruppo include il `checkinTime` di ogni visita e il `membershipStatus` della persona. Il CSV delle presenze per gruppo proviene dal report complementare `groupAttendanceDownload`, trasformato da `GroupAttendanceDownloadHelper` in una riga per ogni membro del gruppo con una colonna presente/assente per ogni sessione datata; lo storico delle singole persone è `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Stampa delle etichette {#label-printing}

### Modelli ed editor {#templates-and-the-designer}

Le chiese progettano le proprie etichette in B1Admin su `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, raggiunta dalla pagina delle impostazioni del Check-In). Un modello è una riga di `labelTemplates` il cui `content` è un array JSON di blocchi -- `text`, `field`, `barcode`, `qrcode` oppure `box` -- ciascuno posizionato in coordinate percentuali con carattere, allineamento, simbologia (`code39`/`code128`/`qr`) e condizioni di visibilità facoltative (ad esempio mostrare il riquadro allergie solo quando `person.nametagNotes` non è vuoto). Esistono due `labelType`: `nametag` (una per persona registrata; campi come `person.displayName`, `sessions`, `securityCode` e `person.isBirthdayWeek` -- `"true"` quando il giorno e il mese del compleanno cadono entro 3 giorni da oggi, anche a cavallo di fine anno, calcolato da `LabelHelper.isBirthdayWithin()`) e `pickup` (una per famiglia; campi come `children`, `childrenAllergies`). Il server applica un solo modello predefinito per tipo in ogni chiesa (`LabelTemplateController.save`). Il designer include modelli iniziali che replicano le etichette incluse nel chiosco e mostra l'anteprima con dati di esempio.

### Rendering e stampa sul chiosco {#rendering-and-printing-on-the-kiosk}

Al completamento del check-in, `B1Checkin/src/helpers/LabelHelper.ts` decide cosa stampare dai flag dei gruppi di ogni visita in attesa: i cartellini per i gruppi con `printNametag`, più un'etichetta di ritiro familiare se una visita ha toccato un gruppo `parentPickup`. Le visite con `checkinType` `volunteer` vengono saltate da `LabelHelper.selectChildVisits()`, quindi un addetto all'infanzia in una stanza Ritiro genitori non fa mai scattare un'etichetta di ritiro. Il codice di sicurezza della risposta di check-in viene riportato sui cartellini dei bambini e sull'etichetta di ritiro; i cartellini degli adulti vengono stampati senza codice. Se la chiesa ha dei modelli, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) trasforma i blocchi e il contesto dei campi in un documento HTML autonomo; altrimenti si usano le etichette HTML incluse in `B1Checkin/assets/labels/` con sostituzione dei segnaposto.

I codici a barre sono generati come SVG inline da codificatori TypeScript puri in `B1Checkin/src/helpers/barcode.ts` -- tabelle dei pattern di Code 39 e tabelle delle larghezze di Code 128 (code set B con checksum mod-103), più il QR tramite il pacchetto `qrcode`. **Questi codificatori sono intenzionalmente duplicati in B1Admin** (`LabelEditor.tsx` include le stesse tabelle, come indicato in un commento nel codice), così le anteprime del designer coincidono al pixel con l'output del chiosco; una modifica a uno dei due va replicata nell'altro.

La pipeline di stampa (`src/components/PrintUI.tsx`) renderizza ogni etichetta HTML in un `WebView`, la cattura in JPG con `react-native-view-shot` e passa gli URI delle immagini al modulo Expo nativo **printer-helper** (`B1Checkin/modules/printer-helper/`). Il modulo espone `scan()`, `checkInit()`, `printUris()` e gli eventi di stato, con un provider per marca su entrambe le piattaforme:

| Marca | Android | iOS | Note |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (SDK di stampa Brother) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Stampanti di rete della serie QL (QL-800/810W/820NWB/1100/1110NWB…), etichette die-cut 29×90, il predefinito consigliato |
| Zebra | `ZebraProvider.kt` (SDK Link-OS) | `ZebraProvider.swift` + `ZebraBridge` | Rilevamento in rete + stampa di immagini TCP/ZPL |

La selezione della stampante si trova in `app/printers.tsx` (la scansione di rete restituisce voci `brand~model~ip`; la scelta viene salvata in AsyncStorage), e `src/helpers/PrinterLog.ts` mantiene un registro diagnostico sul dispositivo, mostrato tramite un indicatore di stato in tempo reale nell'intestazione del chiosco.

## Registrazione degli ospiti {#guest-registration}

Due percorsi creano una persona durante il check-in:

- **Al chiosco** -- il pulsante "Aggiungi ospite" della schermata del nucleo apre `B1Checkin/app/addGuest.tsx`, che prima cerca una corrispondenza di non membro esistente tramite `GET /membership/people/search?term=` e altrimenti ne crea una con `POST /membership/people`, collegata al nucleo attuale. L'ospite passa poi all'assegnazione del gruppo come qualsiasi membro.
- **Self-service tramite QR** -- quando l'impostazione della chiesa `enableQRGuestRegistration` è attiva (configurata nelle impostazioni del Check-In di B1Admin e letta da `GET /membership/settings/public/{churchId}`), la schermata di ricerca del chiosco mostra un QR che collega a `https://{subdomain}.b1.church/guest-register?serviceId=`. Quella pagina di B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) permette a una famiglia in visita di registrarsi dal proprio telefono tramite l'endpoint anonimo `POST /membership/people/guest-register`, mantenendo scorrevole la fila al chiosco. La scheda del QR ha anche un pulsante **Registrati qui** che apre la stessa pagina sul chiosco (`app/guestRegister.tsx`) in un `WebView` in incognito, senza cache; `src/helpers/GuestRegisterHelper.ts` costruisce l'URL sia per il QR sia per il WebView e blocca la navigazione verso altri indirizzi rispetto a `https://{subdomain}.b1.church/guest-register`. La schermata torna alla ricerca con **Fine**, con il pulsante indietro, o dopo 120 secondi di inattività (la digitazione nel modulo viene inoltrata dal WebView come attività), smontando il WebView così i dati di una famiglia non arrivano mai alla successiva.

La registrazione tramite QR è governata dalle impostazioni della chiesa salvate dalla scheda **Registrazione ospiti tramite QR** in B1Admin (`src/mobile/CheckInPage.tsx`):

| Impostazione | Visibilità | Scopo |
|---|---|---|
| `enableQRGuestRegistration` | pubblica | Interruttore di attivazione per il QR del chiosco e per gli endpoint anonimi |
| `guestRegistrationFields` | pubblica | Mappa JSON di `email`, `phone`, `address`, `birthDate`, `gender`, `maritalStatus`, `grade`, `comments` → `"off"` / `"optional"` / `"required"`. Predefinito: email e telefono facoltativi, il resto disattivato. Nome e cognome sono sempre obbligatori |
| `guestRegistrationImage` | pubblica | URL della foto di intestazione; B1App la mostra in formato 16:9 al posto dell'icona nel modulo e nella schermata di conferma |
| `guestRegistrationGroupId` | privata | Gruppo a cui viene aggiunta ogni registrazione (gli ospiti non lo vedono né lo scelgono) |
| `guestRegistrationRecordAttendance` | privata | `"true"` per registrare anche la presenza in quel gruppo |

`src/components/checkin/GuestRegister.tsx` di B1App recupera la lista di controllo dall'endpoint anonimo `GET /membership/people/guest-register/options?churchId=` e mostra solo i campi inclusi (email, telefono, stato civile e indirizzo per il contatto principale; data di nascita, sesso e classe per ogni membro; un'unica casella per i commenti), inviando solo quelli. Il server riapplica la lista di controllo in `GuestRegistrationHelper.sanitize()` -- i campi disattivati vengono eliminati, i valori obbligatori mancanti o non ammessi producono un 400 -- prima che venga eseguito `PersonHelper.registerGuestHousehold()`. Per prima cosa chiama `PersonRepo.findGuestMatch()` per ogni membro con un'email o un telefono: esattamente una persona attiva con lo stesso nome e le stesse cifre di email o telefono viene riutilizzata (zero corrispondenze o più di una creano una nuova persona, quindi non si tira mai a indovinare). Un membro senza recapiti viene abbinato per nome all'interno del nucleo corrispondente. Le persone riutilizzate non vengono mai modificate, così un modulo anonimo non può sovrascrivere i dati memorizzati, e la risposta riporta i nomi inviati. I membri non trovati entrano nel nucleo corrispondente o in uno nuovo, come `membershipStatus: "Visitor"`, emettendo `person.created` per ogni nuova persona. Successivamente, gli errori vengono registrati anziché restituiti: i membri vengono aggiunti al gruppo configurato (`group.member.added`); se la registrazione delle presenze è attiva, `AttendanceModuleGateway.recordAttendance()` segna ogni membro come presente per ciascuno degli orari di servizio del gruppo che hanno una pianificazione e la cui finestra di check-in (`CheckinGateHelper.isServiceTimeOpen`) è aperta in questo momento, creando la sessione per la data odierna nel fuso della chiesa se necessario -- gli orari non pianificati e le registrazioni fuori finestra non registrano nulla; infine i commenti diventano una conversazione nascosta di nota sulla persona per il capofamiglia (autore del messaggio "Registrazione ospite"), collegata tramite `person.conversationId`.

## Pagine correlate {#related-pages}

- [Endpoint di Presenze](../api/endpoints/attendance.md) -- L'intera superficie REST per campus, servizi, sessioni, visite e sessioni di visita
- [Endpoint di Membership](../api/endpoints/membership.md) -- Persone, nuclei e gruppi
- [Webhook](../api/webhooks.md) -- Gli eventi `session.created`, `attendance.recorded` e `attendance.checkout`
- [Struttura del modulo](../api/module-structure.md) -- Come è organizzato lato server il modulo presenze
