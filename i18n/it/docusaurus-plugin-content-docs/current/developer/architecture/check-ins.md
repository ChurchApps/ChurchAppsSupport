---
title: "Check-in"
---

# Check-in

<div class="article-intro">

Il check-in è un unico sistema con tre punti di accesso: l'app chiosco B1Checkin per le postazioni presidiate e self-service, il self check-in all'interno del portale dei membri B1App e le presenze lato amministrazione in B1Admin. Tutti e tre scrivono nello stesso modulo presenze dell'Api principale, e l'instradamento nelle aule è governato interamente dai Gruppi -- non esiste un'entità separata di "sedi" o "stanze". Sopra c'è uno strato di sicurezza per i bambini: tipi di check-in per visita, controlli di capienza e di rapporto con i volontari lato server, idoneità per età/classe lato chiosco, verifica del ritiro da parte di persone fidate al check-out e avviso ai genitori tramite il fornitore SMS della chiesa. Questa pagina mappa il modello dei dati, i flussi di check-in, lo strato di sicurezza e la pipeline di stampa delle etichette.

</div>

## Panoramica

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
  └▶ LabelHelper (modelli di etichetta, o HTML predefinito di riserva)
       └▶ LabelRenderer → documento HTML + codici a barre SVG inline
            └▶ PrintUI: rendering WebView → cattura JPG con ViewShot
                 └▶ modulo nativo printer-helper → Brother QL / Zebra
```

| Superficie | Repository | Stack | Ruolo |
|---------|------|-------|------|
| Chiosco | `B1Checkin` | Expo / React Native, instradamento file con expo-router; build EAS per Android, Amazon Fire e iOS; aggiornamenti OTA via `expo-updates` | Postazione presidiata o self-service con stampa delle etichette e check-out verificato |
| Self check-in | `B1App` | Next.js (portale dei membri b1.church) | I membri registrati registrano il proprio nucleo familiare dal telefono; nessuna stampa |
| Admin | `B1Admin` | SPA React | Configura la struttura dei culti, assegna i gruppi agli orari dei culti, progetta le etichette, registra le presenze manuali, esegue i report |

Tutti e tre chiamano gli stessi due moduli dell'API tramite `ApiHelper`: **MembershipApi** (`/membership`) per persone, nuclei familiari e gruppi; **AttendanceApi** (`/attendance`) per tutto ciò che segue.

## Modello dei dati (`Api/src/modules/attendance`)

| Entità / tabella | Campi chiave | Significato |
|----------------|-----------|---------|
| `campuses` | name, address | Obsoleta qui -- le sedi sono gestite nel modulo membership (`/membership/campuses`); la copia del modulo presenze è congelata in sola lettura per i lettori legacy (`models/Campus.ts`) |
| `services` | campusId, name | Un incontro ricorrente, ad esempio "Culto della domenica mattina" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Una fascia oraria all'interno di un culto, ad esempio "9:00" (`models/ServiceTime.ts`). Le colonne della pianificazione sono facoltative (migrazione `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) e determinano la [finestra di check-in](#scheduled-check-in-windows) |
| `groupServiceTimes` | groupId, serviceTimeId | Tabella di join: quali gruppi (aule) si incontrano in quali orari di culto (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Un incontro di un gruppo in una data -- creato in modo pigro al momento del check-in (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Una persona che partecipa in una data (`models/Visit.ts`). `checkinType` è `member` / `guest` / `volunteer` (NULL = membro legacy), impostato dal chiosco e usato dai controlli di capienza/rapporto |
| `visitSessions` | visitId, sessionId | Quale/i sessione/i copre una visita -- un bambino registrato a due orari di culto ottiene due righe (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (blocchi JSON) | Layout di etichette progettabili (`models/LabelTemplate.ts`) |

### Come viene salvato un check-in completato

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) gestisce `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Il corpo è un array di oggetti `Visit`, ciascuno con `visitSessions` il cui `session` incorporato indica solo una coppia `(serviceTimeId, groupId)`. Il server poi:

1. **Verifica capienza e rapporti prima di qualsiasi scrittura.** `evaluateGates()` → `CheckinGateHelper.evaluate()` controlla per ogni aula coinvolta la capienza, la capienza ospiti, il flag di chiusura e il rapporto con i volontari rispetto all'occupazione attuale. postCheckin **non è transazionale**, quindi il controllo deve avvenire prima del primo salvataggio -- una violazione bloccante restituisce un 409 che indica l'aula (o le aule) coinvolte e non viene salvato nulla. Vedi [Controlli di capienza e rapporto con i volontari](#capacity-and-volunteer-ratio-gates).
2. **Risolve le sessioni in modo pigro.** `getSessionId()` trova o crea la riga `sessions` per `(groupId, serviceTimeId, oggi)` -- gli id delle sessioni sono memorizzati nella cache del processo per data. Le nuove sessioni emettono un webhook `session.created`. Il ciclo è un `for..of` con await -- un precedente `forEach(async …)` senza attesa causava una race condition con il salvataggio e scriveva sessionId NULL alla creazione della prima sessione (corretto; annotato con un commento nel codice accanto al ciclo).
3. **Sostituisce i record della giornata.** Le visite esistenti di quelle persone per quel culto oggi vengono eliminate insieme ai loro visitSessions, poi viene salvato l'insieme inviato. Ripetere il check-in di una famiglia è quindi un'operazione idempotente "questo è lo stato attuale", non un'aggiunta. Passando `?checkDuplicates=true`, invece, si ottiene `{ duplicates: [personId…] }` senza scrivere nulla, ed è così che il chiosco avvisa prima di sovrascrivere.
4. **Genera un codice di sicurezza per batch.** `SecurityCodeHelper.generate()` produce un codice di 4 caratteri dall'alfabeto `23456789BCDFGHJKLMNPQRSTVWXYZ` (senza vocali né caratteri ambigui, così i codici non possono formare parole né essere letti male). Il server riprova in caso di collisione con le visite aperte dello stesso giorno della stessa chiesa e applica il codice a ogni visita del batch.
5. **Restituisce `{ streaks, securityCode }`.** `streaks` associa a personId il conteggio di presenze settimanali consecutive; il chiosco celebra i traguardi (ogni 5a settimana) con i coriandoli.

Ogni visita salvata emette anche un webhook `attendance.recorded`. Il lato di lettura, `GET /attendance/visits/checkin`, restituisce le visite delle persone dalla loro **ultima data registrata** -- se quella era una settimana precedente gli id vengono rimossi, così il client riceve una copia precompilata delle selezioni delle aule della settimana scorsa che verrà salvata come nuovi record.

### Check-out

Due endpoint completano il ciclo (`VisitController`):

- `GET /attendance/visits/code/:code` — le visite di oggi non ancora chiuse che hanno quel codice di sicurezza, con le sessioni popolate.
- `POST /attendance/visits/checkout` — corpo `{ visitIds, checkedOutBy?, checkedOutById? }`; imposta `checkoutTime` e chi ha ritirato il bambino, ed emette un webhook `attendance.checkout` per ogni visita.

Permessi: i chioschi si autenticano con `attendance.checkin`, che concede esattamente la superficie di check-in/check-out/modelli di etichetta, più le ricerche sui nuclei che un chiosco richiede senza `people.view` (ricerca per telefono/nome, membri del nucleo nel modello di check-in e l'elenco delle persone autorizzate al ritiro). `SessionHelper.filterChurches` di B1Checkin offre solo le chiese in cui l'account possiede `Attendance/Checkin` oppure `Attendance/Edit`. `Checkin` non fa più parte dei permessi di Everyone (ruolo null) (`RoleHelper` e migrazione `2026-11-01_remove_everyone_checkin`), quindi va concesso tramite un ruolo reale; `attendance.view`/`attendance.edit` coprono i report e l'inserimento manuale; la struttura (culti, orari dei culti, assegnazioni dei gruppi) richiede `services.edit`. Il self check-in del membro (B1App) non richiede alcun permesso: qualsiasi utente autenticato con una persona collegata nella chiesa può chiamare `GET`/`POST /attendance/visits/checkin`, e il server limita i `personId` inviati al nucleo familiare del chiamante (403 altrimenti -- questo vincolo è ciò che impedisce di leggere i `securityCode` delle altre famiglie). L'appartenenza è il permesso; se i membri *vedano* la funzione è controllato dalle schede di navigazione di B1App della chiesa. Gli altri endpoint di check-in (`code/:code`, `checkout`, `guardians`, `CheckinController`) restano riservati a chiosco e staff.

## I gruppi governano l'instradamento nelle aule

Nel sistema non esiste un'entità aula o stanza. Una "stanza" è un **gruppo** di membership con `trackAttendance` attivo, collegato a uno o più orari di culto tramite `groupServiceTimes`. I campi del gruppo (in `Api/src/modules/membership/models/Group.ts`) che determinano il comportamento del chiosco:

| Campo | Effetto |
|------|--------|
| `trackAttendance` | Il gruppo partecipa alle presenze; la struttura di configurazione di B1Admin segnala come non assegnati i gruppi `trackAttendance` privi di una riga in `groupServiceTimes` |
| `parentPickup` | Contrassegna un'aula per bambini: il check-in in essa rende la visita una visita "bambino", che stampa un'etichetta di ritiro per la famiglia e inserisce il codice di sicurezza sul cartellino |
| `printNametag` | Se i check-in in questo gruppo stampano un cartellino con il nome |
| `capacity` / `guestCapacity` / `checkinClosed` | Limiti di capienza dell'aula e un interruttore rigido di "chiuso", applicati lato server dal controllo di check-in (modificati nelle impostazioni del gruppo in B1Admin, sotto "Capienza check-in") |
| `volunteerRatio` / `minVolunteers` | Rapporto bambini per volontario e numero minimo di volontari, applicati secondo l'impostazione della chiesa `ratioEnforcement` |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Limiti di idoneità per età/classe valutati lato chiosco per evidenziare o attenuare le aule |

Ogni client denormalizza allo stesso modo (ad esempio `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): carica in parallelo `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` e `GET /membership/groups`, poi per ogni orario di culto raccoglie i gruppi la cui riga `groupServiceTimes` punta a esso in `serviceTime.groups`. Quell'array è ciò che mostra il selettore delle aule, organizzato per `categoryName` del gruppo.

Le assegnazioni si modificano dalla pagina del gruppo in B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` -- `POST`/`DELETE /attendance/groupservicetimes`), e l'intero albero Sede → Culto → Orario del culto → Gruppo è visualizzato in `B1Admin/src/attendance/components/AttendanceSetup.tsx` tramite `GET /attendance/attendancerecords/tree`.

:::info
Poiché i gruppi sono l'unica fonte di verità, la stessa appartenenza ai gruppi alimenta l'instradamento del chiosco, le presenze in stile appello nelle pagine dei gruppi di B1Admin e i report sulle presenze -- assegnare un gruppo a un orario di culto è l'unico passaggio necessario per farne una destinazione di check-in.
:::

## Sicurezza dei bambini

### Tipi di check-in {#check-in-types}

Ogni visita porta un `checkinType` -- `member`, `guest` oppure `volunteer` (NULL significa legacy/membro; migrazione `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Il tipo viene scelto **lato chiosco**: i chip Membro / Ospite / Volontario sulla riga espansa del membro (`B1Checkin/src/components/MemberServiceTimes.tsx`), applicati a ciascuna visita in attesa al completamento (`app/checkinComplete.tsx`, con valore predefinito `member`). Il server lo usa nel controllo -- i volontari contano per la copertura del rapporto invece che contro la capienza, e gli ospiti contano contro `guestCapacity`.

### Controlli di capienza e rapporto con i volontari {#capacity-and-volunteer-ratio-gates}

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) viene eseguito all'interno di `postCheckin` prima di qualsiasi salvataggio (l'endpoint non è transazionale, quindi il controllo prima del salvataggio è il meccanismo di correttezza). Carica l'occupazione attuale per ogni gruppo coinvolto (`VisitRepo.countActiveByGroupToday`) e la configurazione del gruppo tramite il gateway del modulo membership, poi classifica le violazioni:

- **Bloccanti (bloccano sempre):** `checkinClosed`, `current + incoming > capacity`, numero di ospiti oltre `guestCapacity`. Il batch viene rifiutato con `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` -- il chiosco mostra l'aula indicata.
- **Rapporto (avviso o blocco):** i non volontari in arrivo in un'aula dove `volunteers < minVolunteers`, senza alcun volontario, oppure `children > volunteers × volunteerRatio`. La gravità segue l'impostazione della chiesa `ratioEnforcement` (`"warn"` predefinito / `"block"`, modificabile in B1Admin, Gestisci chiesa → Check-in, `CheckinSettingsEdit.tsx`). In modalità avviso restituisce `409 { warning: true, error: "ratio", … }` a meno che il client non reinvii con `acknowledgeWarnings=true` -- quell'invio è la conferma dello staff sul chiosco.

### Finestre di check-in programmate {#scheduled-check-in-windows}

Un orario di culto può avere una pianificazione settimanale facoltativa (`dayOfWeek` da 0 a 6 con 0 = domenica, `startTime`/`endTime` come `HH:mm`, `checkinOpenMinutes`, `checkinCloseMinutes`), modificata nel modulo dell'orario di culto in **Presenze → Configurazione** di B1Admin (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, "Pianificazione del check-in"). `CheckinGateHelper.hasSchedule()` considera un orario di culto pianificato solo quando sono impostati sia `dayOfWeek` sia `startTime`; gli orari non pianificati non sono mai soggetti a limiti temporali. `isServiceTimeOpen()` calcola la finestra nell'ora locale (`DateHelper.toChurchTime`). Il fuso orario viene risolto per ogni orario di culto da `CheckinTimeZoneHelper.load()` (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`): per primo il `timezone` della sede del culto (`service.campusId`, tramite `MembershipModuleGateway.loadCampusTimeZones`), poi il `timeZone` della chiesa (impostato in B1Admin nelle Informazioni sulla chiesa), poi la prima sede non rimossa che ha un `timezone` (`loadCampusTimeZone`), e solo infine `America/New_York`. La sede viene prima perché molte chiese avevano `America/New_York` retro-compilato come fuso orario della chiesa. Sia l'elenco sia la registrazione seguono la stessa risoluzione. La finestra va da `checkinOpenMinutes` prima dell'inizio a `checkinCloseMinutes` dopo la fine (o dopo l'inizio se manca la fine), gestendo le finestre che attraversano la mezzanotte o il confine della settimana.

La finestra viene applicata in due punti:

- **Elenco:** `GET /attendance/servicetimes` associa a ogni riga un booleano calcolato `checkinOpen`. Il self check-in di B1App (`CheckinPage.tsx`) e il selettore dei culti di B1Checkin (`app/services.tsx`) mantengono tutti gli orari. Quando tutti gli orari di un culto sono chiusi mostrano il prossimo apertura ("Il check-in apre dom 9:30" in B1App, "Il check-in per questo culto apre dom 9:30" in B1Checkin, da `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`), con il ripiego su "Il check-in non è aperto per questo culto in questo momento." quando non è possibile calcolare alcuna apertura (il chiosco offre un pulsante Indietro per scegliere un altro culto). Altrimenti gli orari chiusi compaiono come riga non selezionabile "Chiuso" / "Chiuso · apre 9:30". La schermata del nucleo familiare di B1Checkin (`MemberServiceTimes.tsx`) rivaluta l'apertura in tempo reale sull'orologio del dispositivo con `ServiceTimeHelper.isCheckinOpen()` (fuso orario del dispositivo, non quello della chiesa), così un chiosco lasciato acceso apre e chiude puntualmente, e mostra "Kids Room 1 · Registrato" (nome del gruppo) su un orario chiuso in cui la persona è già registrata.
- **Registrazione:** all'interno di `evaluateGates()`, prima della valutazione di capienza/rapporto, `findClosedServiceTimeGroups()` respinge il batch con `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` se l'orario di culto di una sessione coinvolta è fuori dalla sua finestra. Poiché le visite di oggi di un nucleo familiare vengono ripubblicate a ogni check-in, le sessioni che la persona già possiede (`personId|sessionId` nelle visite esistenti) saltano questo controllo, così l'aggiunta di un orario di culto successivo aperto non viene rifiutata solo perché una finestra precedente si è chiusa. B1Checkin mostra questo esito nella sua schermata di blocco con il motivo "il check-in non è aperto in questo momento" (le violazioni di capienza riportano ancora "l'aula è piena o chiusa").

### Idoneità per età/classe (lato chiosco) {#agegrade-eligibility-kiosk-side}

L'idoneità delle aule è un'indicazione per l'interfaccia, valutata sul chiosco, non imposta dal server. `B1Checkin/src/helpers/EligibilityHelper.ts` confronta data di nascita/classe di una persona con `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` del gruppo (ordine delle classi: Prescuola, K, da 1 a 12, Diplomato) e restituisce `eligible` / `ineligible` / `unknown` -- dati mancanti producono `unknown` e non nascondono mai un'aula. Età e classi sono calcolate alla **data di promozione di classe** della chiesa (impostazione `gradePromotionDate`, `"MM-DD"`, modificata in `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); il chiosco la recupera da `GET /attendance/checkin/settings`, e `resolveAsOfDate` sceglie l'occorrenza più recente non successiva a oggi. Il selettore delle aule evidenzia le aule idonee e attenua quelle non idonee; scegliere un'aula attenuata richiede la conferma dello staff.

### Ritiro da parte di persone fidate e non autorizzate {#trusted-and-not-authorized-pickup}

Le persone autorizzate al ritiro sono un'entità del modulo membership, per nucleo familiare: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` -- householdId, personId facoltativo, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). Le operazioni CRUD sono `GET /membership/householdpickup/:householdId` (qualsiasi utente autenticato della chiesa, così i chioschi possono leggerle) più `POST` / `DELETE` protetti da `people.edit`. Lo staff gestisce l'elenco nella scheda **Ritiro** della pagina persona (`B1Admin/src/people/components/PickupPeople.tsx`) -- foto, relazione e un chip di stato Fidata / Non autorizzata.

Al check-out (`B1Checkin/app/checkout.tsx`) il chiosco carica l'elenco delle persone autorizzate del nucleo: le voci `trusted` compaiono come schede toccabili accanto alla griglia di foto degli adulti del nucleo, e un nome "Altro" digitato liberamente viene confrontato in modo approssimato (distanza di Levenshtein, `src/helpers/PickupMatchHelper.ts`) con le voci `notAuthorized` -- una corrispondenza blocca il check-out con una schermata di avviso e un pulsante staff **Forza**. La forzatura viene registrata sulla visita stessa: invia `checkedOutBy` come `"OVERRIDE: {nome}"` tramite il normale `POST /attendance/visits/checkout`, così finisce nel record di presenza e nel webhook `attendance.checkout` anziché in una tabella di audit separata.

### Avviso ai genitori ed emergenza

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) espone due endpoint SMS:

- `POST /page` — `{ visitId, message }`: avvisa i tutori di un solo bambino registrato (schermata di check-out del chiosco, modalità presidiata).
- `POST /broadcast` — `{ serviceId, message }`: invia un SMS a tutti gli adulti di ogni nucleo registrato per un culto (impostazioni admin del chiosco, dietro una schermata di conferma di tipo `EMERGENCY` in `B1Checkin/app/adminSettings.tsx`).

Entrambi risolvono gli adulti del nucleo tramite il gateway membership, poi affidano l'invio a **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) -- la porta tra moduli verso il fornitore SMS configurato dalla chiesa (`@churchapps/texting`: TextInChurch, Clearstream o MutualMinistry; non esiste un mittente SMS integrato). Il gateway registra una riga `sentText` più le voci `deliveryLog` per destinatario e limita un batch a 500 destinatari; senza un fornitore configurato restituisce `no_provider`, che il chiosco mostra come "Nessun fornitore SMS configurato". Il `dispatch()` del controller elimina i numeri duplicati e salta le persone senza cellulare o con `optedOut` impostato, restituendo `{ sent, failed, skippedOptedOut, skippedNoPhone }` così il chiosco può mostrare cosa è stato saltato.

## Il chiosco (B1Checkin)

Le schermate sono file expo-router sotto `B1Checkin/app/`; lo stato condiviso tra schermate risiede in una classe statica `CachedData` (`src/helpers/CachedData.ts`), non nello stato di React.

```
index (avvio/accesso automatico) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             carica serviceTimes, groups, │             │  └─────────┘ └▶ addGuest  └▶ stampa etichette,
             groupServiceTimes,           │             └▶ checkout (presidiato)       ritorno automatico
             labelTemplates               │                                            alla ricerca
```

1. **Ricerca** (`app/lookup.tsx`) — cerca per telefono (`GET /membership/people/search/phone?number=`, ultime 4 cifre o numero completo) oppure per nome (`GET /membership/people/search?term=`). Selezionando una corrispondenza si carica il nucleo (`GET /membership/people/household/{householdId}`) e le visite esistenti (`GET /attendance/visits/checkin`), popolando `pendingVisits` con le selezioni della settimana scorsa.
2. **Verifica del nucleo** (`app/household.tsx`, `src/components/MemberList.tsx`) — ogni riga del membro mostra un badge di già registrato, un badge di allergia/`nametagNotes` e i chip delle aule correnti. Espandendo un membro si elencano tutti gli orari di culto con un pulsante aula e i chip del tipo di check-in Membro / Ospite / Volontario (`MemberServiceTimes.tsx`). Sotto il nome di ciascun orario di culto, `ServiceTimeHelper.getGroupSummary()` mostra i gruppi offerti lì (i nomi di `serviceTime.groups`, ripuliti, deduplicati senza distinzione tra maiuscole e minuscole, separati da virgola); non viene mostrato nulla se l'orario non ha gruppi.
3. **Assegnazione del gruppo** (`app/selectGroup.tsx`) — un albero di categorie costruito da `serviceTime.groups`, con le aule idonee per età/classe evidenziate e quelle non idonee attenuate dietro una conferma dello staff (vedi [Idoneità per età/classe](#agegrade-eligibility-kiosk-side)); scegliere un'aula scrive un visitSession `{ session: { serviceTimeId, groupId } }` nella visita in attesa di quella persona (`src/helpers/VisitSessionHelper.ts`). "Nessuno" lo azzera.
4. **Completamento** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` con `pendingVisits` (ciascuna con il proprio `checkinType`), poi stampa le etichette se è configurata una stampante e torna automaticamente alla ricerca. Una risposta `409` di capienza o `notOpen` mostra l'aula indicata con il motivo (piena/chiusa, oppure check-in non aperto); un avviso di rapporto offre una conferma dello staff che reinvia con `acknowledgeWarnings=true`.

La schermata di **check-out** (`app/checkout.tsx`) accetta il codice di sicurezza di 4 caratteri tramite un campo a messa a fuoco automatica -- così gli scanner di codici a barre USB/Bluetooth in modalità tastiera funzionano senza fotocamera -- oppure un tastierino a schermo con lo stesso alfabeto, che invia automaticamente a 4 caratteri. Il pulsante **Scansiona** apre un foglio con la fotocamera condivisa `src/components/CodeScanner.tsx` (per impostazione predefinita quella posteriore, che accetta QR, Code 128 e Code 39), così le postazioni senza scanner a tastiera possono leggere l'etichetta di ritiro; un codice scansionato segue lo stesso percorso `handleCode()` dell'input digitato. Cerca il codice, mostra i bambini da ritirare e presenta le **persone fidate al ritiro** del nucleo come schede toccabili, accanto a una griglia di foto degli adulti del nucleo (più un'opzione "Altro" a testo libero controllata in modo approssimato rispetto ai nomi non autorizzati -- vedi [Ritiro da parte di persone fidate e non autorizzate](#trusted-and-not-authorized-pickup)), poi invia `POST /attendance/visits/checkout` con nome/id scelto. In modalità presidiata la schermata offre anche **Avvisa un genitore** (`POST /attendance/checkin/page`) e una **ristampa dell'etichetta di sicurezza** -- `reprint()` ricostruisce le etichette della famiglia con `LabelHelper.getAllLabelsFor(...)` e le invia attraverso lo stesso percorso `PrintUI` del check-in.

La personalità della postazione è un flag AsyncStorage `@StationMode` (`"self"` | `"manned"`, modificabile in `app/adminSettings.tsx`). La modalità presidiata aggiunge il punto di accesso al check-out nella schermata di ricerca e la modifica del profilo della persona (`POST /membership/people`) dalla schermata del nucleo. Le protezioni del chiosco sono integrate: un PIN facoltativo (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) protegge le schermate admin e stampante, la schermata admin si apre solo con 7 tocchi rapidi sul logo nell'intestazione, e una schermata di attrazione inattiva (`src/hooks/useInactivityTimer.ts`) subentra tra una famiglia e l'altra.

## Self check-in (B1App)

I membri si registrano dal portale b1.church nella schermata `/mobile/checkin` (instradata da `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` verso `screens/CheckinPage.tsx`). Richiede un utente connesso e percorre gli stessi quattro passaggi del chiosco -- culti → nucleo → gruppi → completamento -- sugli stessi identici endpoint, con lo stato mantenuto in `B1App/src/helpers/CheckinHelper.ts`. Le differenze rispetto al chiosco: il nucleo viene dal proprio `householdId` dell'utente connesso (nessun passaggio di ricerca), e non c'è stampa delle etichette -- la schermata di completamento mostra invece il codice di sicurezza del batch come QR (`qrcode.react`) con l'indicazione "mostralo a una postazione di check-in". Se il nucleo è già registrato quando si carica la pagina, un pulsante "Mostra codice di check-in" visualizza di nuovo il QR dalla prima visita esistente (da `GET /attendance/visits/checkin`) che porta un `securityCode`. Il check-in viene registrato immediatamente all'invio (non esiste uno stato in attesa); il QR serve solo a stampare le etichette sul chiosco.

**Stampa delle etichette dal telefono al chiosco** (`B1Checkin/app/scan.tsx`, raggiunta dal pulsante "Scansiona codice" del QR nella schermata di ricerca): il chiosco mostra `CodeScanner` (un `CameraView` di `expo-camera`, per impostazione predefinita quella frontale, con possibilità di cambio) che cerca codici QR. `ScanCodeHelper.parse()` accetta un contenuto solo se è un codice nudo di 4 caratteri dell'alfabeto dei codici di sicurezza, e `ScanCodeHelper.isRepeat()` ignora lo stesso codice per 4 secondi, così funzionano sia il QR di B1App sia il blocco QR di un'etichetta stampata. La schermata segue poi il percorso di ristampa del check-out -- `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` -- e torna alla ricerca. Nessuna scrittura di presenze avviene al momento della scansione; solo etichette. I codici senza visite attive, le postazioni senza stampante e i gruppi senza etichette mostrano ciascuno un messaggio e tornano alla ricerca.

I tipi e `ApiHelper`/`ArrayHelper` provengono da `@churchapps/helpers` e `@churchapps/apphelper`; nessun componente React è condiviso con B1Admin.

## Presenze lato amministrazione (B1Admin)

- **Configurazione** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) mostra l'albero della struttura e crea culti (`ServiceEdit.tsx`) e orari dei culti (`ServiceTimeEdit.tsx`). I dati delle sedi arrivano da membership tramite l'hook `useCampuses()`.
- **Presenze manuali** si trovano nella sezione Gruppi, non in quella delle presenze: `B1Admin/src/groups/components/GroupSessionsTab.tsx` crea le sessioni (`POST /attendance/sessions`; in fase di aggiunta, `SessionEdit.tsx` può includere una sessione per ogni altro gruppo che condivide l'orario di culto scelto, saltando i gruppi che hanno già una sessione in quella data) e segna le persone come presenti tramite `POST /attendance/visitsessions/log`, che trova o crea la visita per quella persona e sessione. I leader dei gruppi possono registrare le presenze per i propri gruppi senza il permesso `attendance.edit` -- i controller verificano `au.leaderGroupIds`.
- **Report** — l'andamento delle presenze e le presenze per gruppo sono report definiti dal server (`B1Admin/src/components/reporting/ReportWithFilter.tsx` su ReportingApi; definizioni in `Api/reports/*.json`). Entrambi accettano `startDate`/`endDate` (data di fine inclusa); il report di andamento ha per default da un anno fa fino a oggi e aggiunge una colonna `sessionDates` per settimana, mentre l'albero visualizzato delle presenze per gruppo include il `checkinTime` di ogni visita e lo `membershipStatus` della persona. Il CSV delle presenze per gruppo proviene dal report companion `groupAttendanceDownload`, trasformato da `GroupAttendanceDownloadHelper` in una riga per membro del gruppo con una colonna presente/assente per ogni sessione datata; la cronologia per persona è `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Stampa delle etichette

### Modelli ed editor

Le chiese progettano le proprie etichette in B1Admin su `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, raggiunta dalla pagina delle impostazioni del check-in). Un modello è una riga `labelTemplates` il cui `content` è un array JSON di blocchi -- `text`, `field`, `barcode`, `qrcode` oppure `box` -- ciascuno posizionato in coordinate percentuali con carattere, allineamento, simbologia (`code39`/`code128`/`qr`) e condizioni di visibilità facoltative (ad esempio mostrare il riquadro delle allergie solo quando `person.nametagNotes` non è vuoto). Esistono due `labelType`: `nametag` (uno per persona registrata; campi come `person.displayName`, `sessions`, `securityCode` e `person.isBirthdayWeek` -- `"true"` quando il mese/giorno del compleanno cade entro 3 giorni da oggi, anche a cavallo di fine anno, calcolato da `LabelHelper.isBirthdayWithin()`) e `pickup` (uno per famiglia; campi come `children`, `childrenAllergies`). Il server impone un solo predefinito per tipo per chiesa (`LabelTemplateController.save`). L'editor include modelli di partenza che riproducono le etichette predefinite del chiosco e mostra l'anteprima con dati di esempio.

### Rendering e stampa sul chiosco

Al completamento del check-in, `B1Checkin/src/helpers/LabelHelper.ts` decide cosa stampare in base ai flag di gruppo di ciascuna visita in attesa: cartellini per i gruppi con `printNametag`, più una etichetta di ritiro per la famiglia se una visita ha colpito un gruppo `parentPickup`. Le visite con `checkinType` `volunteer` vengono saltate da `LabelHelper.selectChildVisits()`, quindi un addetto all'infanzia in un'aula di Ritiro dei genitori non fa mai scattare un'etichetta di ritiro. Il codice di sicurezza nella risposta del check-in finisce sui cartellini dei bambini e sull'etichetta di ritiro; i cartellini degli adulti vengono stampati senza codice. Se la chiesa ha dei modelli, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) trasforma blocchi e contesto dei campi in un documento HTML autonomo; altrimenti si usano le etichette HTML predefinite in `B1Checkin/assets/labels/` con la sostituzione dei segnaposto.

I codici a barre vengono generati come SVG inline da codificatori TypeScript puri in `B1Checkin/src/helpers/barcode.ts` -- tabelle dei pattern di Code 39 e tabelle delle larghezze di Code 128 (set di codici B con checksum mod-103), più il QR tramite il pacchetto `qrcode`. **Questi codificatori sono intenzionalmente duplicati in B1Admin** (`LabelEditor.tsx` include le stesse tabelle, come annotato in un commento nel codice), così le anteprime dell'editor sono fedeli al pixel rispetto all'output del chiosco; una modifica in uno dei due va replicata nell'altro.

La pipeline di stampa (`src/components/PrintUI.tsx`) renderizza ogni etichetta HTML in un `WebView`, la cattura in JPG tramite `react-native-view-shot` e passa gli URI delle immagini al modulo Expo nativo **printer-helper** (`B1Checkin/modules/printer-helper/`). Il modulo espone `scan()`, `checkInit()`, `printUris()` e gli eventi di stato, con un provider per marca su entrambe le piattaforme:

| Marca | Android | iOS | Note |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (SDK di stampa Brother) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Stampanti di rete della serie QL (QL-800/810W/820NWB/1100/1110NWB…), etichette da 29×90 mm a fustella, il predefinito consigliato |
| Zebra | `ZebraProvider.kt` (SDK Link-OS) | `ZebraProvider.swift` + `ZebraBridge` | Individuazione in rete + stampa dell'immagine via TCP/ZPL |

La selezione della stampante si trova in `app/printers.tsx` (la scansione di rete restituisce voci `marca~modello~ip`; la scelta viene salvata in AsyncStorage), e `src/helpers/PrinterLog.ts` mantiene un registro diagnostico sul dispositivo, visibile tramite un pallino di stato in tempo reale nell'intestazione del chiosco.

## Registrazione degli ospiti

Due percorsi creano una persona durante il check-in:

- **Sul chiosco** — il pulsante "Aggiungi ospite" nella schermata del nucleo apre `B1Checkin/app/addGuest.tsx`, che prima cerca `GET /membership/people/search?term=` una corrispondenza esistente non membro e altrimenti ne crea una con `POST /membership/people`, collegata al nucleo corrente. L'ospite poi attraversa l'assegnazione del gruppo come ogni altro membro.
- **Self-service tramite QR** — quando l'impostazione della chiesa `enableQRGuestRegistration` è attiva (configurata nelle impostazioni Check-in di B1Admin, letta da `GET /membership/settings/public/{churchId}`), la schermata di ricerca del chiosco mostra un QR che porta a `https://{subdomain}.b1.church/guest-register?serviceId=`. Quella pagina di B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) permette a una famiglia in visita di registrarsi dal proprio telefono tramite l'endpoint anonimo `POST /membership/people/guest-register`, mantenendo scorrevole la fila al chiosco. Il foglio del QR ha anche un pulsante **Registrati qui** che apre la stessa pagina sul chiosco (`app/guestRegister.tsx`) in un `WebView` in incognito e senza cache; `src/helpers/GuestRegisterHelper.ts` costruisce l'URL sia per il QR sia per il WebView e blocca la navigazione verso l'esterno di `https://{subdomain}.b1.church/guest-register`. La schermata torna alla ricerca con **Fatto**, con il pulsante indietro, oppure dopo 120 secondi di inattività (la digitazione nel modulo viene inoltrata dal WebView come attività), smontando il WebView così i dati di una famiglia non arrivano mai alla successiva.

L'iscrizione tramite QR è guidata dalle impostazioni della chiesa salvate dalla scheda **Registrazione ospiti tramite QR** di B1Admin (`src/mobile/CheckInPage.tsx`):

| Impostazione | Visibilità | Scopo |
|---|---|---|
| `enableQRGuestRegistration` | pubblica | Interruttore di adesione per il QR del chiosco e per gli endpoint anonimi |
| `guestRegistrationFields` | pubblica | Mappa JSON di `email`, `phone`, `address`, `birthDate`, `gender`, `maritalStatus`, `grade`, `comments` → `"off"` / `"optional"` / `"required"`. Predefinito: email e telefono facoltativi, gli altri disattivati. Nome e cognome sono sempre obbligatori |
| `guestRegistrationImage` | pubblica | URL della foto di intestazione; B1App la mostra in formato 16:9 al posto dell'icona nel modulo e nella schermata di conferma |
| `guestRegistrationGroupId` | privata | Gruppo a cui vengono aggiunte tutte le iscrizioni (gli ospiti non lo vedono né lo scelgono) |
| `guestRegistrationRecordAttendance` | privata | `"true"` per registrare anche le presenze in quel gruppo |

`src/components/checkin/GuestRegister.tsx` di B1App recupera l'elenco di controllo dall'endpoint anonimo `GET /membership/people/guest-register/options?churchId=` e mostra solo i campi inclusi (email, telefono, stato civile e indirizzo per il contatto principale; data di nascita, sesso e classe per ciascun membro; una sola casella commenti), inviando solo quelli. Il server riapplica l'elenco di controllo in `GuestRegistrationHelper.sanitize()` -- i campi disattivati vengono scartati, i campi obbligatori mancanti o con valori fuori lista producono un 400 -- prima che venga eseguito `PersonHelper.registerGuestHousehold()`. Per prima cosa chiama `PersonRepo.findGuestMatch()` per ogni membro con un'email o un telefono: esattamente una persona attiva con lo stesso nome e la stessa email o le stesse cifre del telefono viene riutilizzata (zero o più corrispondenze creano una nuova persona, quindi non tira mai a indovinare). Un membro senza recapiti viene abbinato per nome all'interno del nucleo abbinato. Le persone riutilizzate non vengono mai modificate, così un modulo anonimo non può sovrascrivere dati già memorizzati, e la risposta ripete i nomi inviati. I membri non abbinati entrano nel nucleo abbinato oppure in uno nuovo, come `membershipStatus: "Visitor"`, emettendo `person.created` per ogni nuova persona. Dopo, gli errori vengono registrati anziché restituiti: i membri vengono aggiunti al gruppo configurato (`group.member.added`); se la registrazione delle presenze è attiva, `AttendanceModuleGateway.recordAttendance()` segna ogni membro presente per ciascuno degli orari di culto del gruppo che ha una pianificazione e la cui finestra di check-in (`CheckinGateHelper.isServiceTimeOpen`) è aperta in questo momento, creando la sessione per la data odierna nel fuso orario della chiesa se necessario -- gli orari non pianificati e le iscrizioni fuori finestra non registrano nulla; infine i commenti diventano una conversazione di nota privata sulla persona di riferimento del nucleo (autore del messaggio "Guest sign-up"), collegata tramite `person.conversationId`.

## Pagine correlate

- [Endpoint Presenze](../api/endpoints/attendance) -- Superficie REST completa per sedi, culti, sessioni, visite e visitSessions
- [Endpoint Membership](../api/endpoints/membership) -- Persone, nuclei familiari e gruppi
- [Webhook](../api/webhooks) -- Gli eventi `session.created`, `attendance.recorded` e `attendance.checkout`
- [Struttura del modulo](../api/module-structure) -- Come è organizzato lato server il modulo presenze
