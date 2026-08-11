---
title: "Check-in"
---

# Check-in

<div class="article-intro">

Check-in è un sistema con tre porte d'ingresso: l'app kiosk B1Checkin per stazioni presenziate e self-serve, l'auto-check-in dentro il portale B1App per i membri, e la frequenza lato admin in B1Admin. Tutti e tre scrivono nello stesso modulo di frequenza nel core Api, e l'instradamento delle aule è guidato interamente dai Gruppi -- non esiste alcuna entità separata "locations" o "rooms". Un livello di sicurezza infantile siede in cima: per-visite tipi di check-in, gate di capacità lato server e rapporto di volontari, idoneità età/grado lato kiosk, verifica della consegna fidataria al checkout, e paging dei genitori sul provider di texting della chiesa. Questa pagina mappa il modello di dati, i flussi di check-in, il livello di sicurezza e la pipeline di stampa delle etichette.

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

Percorso di stampa etichette (solo kiosk):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (label templates, or bundled HTML fallback)
       └▶ LabelRenderer → HTML doc + inline SVG barcodes
            └▶ PrintUI: WebView render → ViewShot JPG capture
                 └▶ printer-helper native module → Brother QL / Zebra
```

| Superficie | Repo | Stack | Ruolo |
|---------|------|-------|-------|
| Kiosk | `B1Checkin` | Expo / React Native, expo-router file routing; EAS builds per Android, Amazon Fire e iOS; OTA updates via `expo-updates` | Stazione presenziat o self-serve con stampa di etichette e checkout verificato |
| Auto check-in | `B1App` | Next.js (portale B1.church per i membri) | I membri loggati controllano la loro famiglia dal telefono; nessuna stampa |
| Admin | `B1Admin` | React SPA | Configura la struttura del servizio, assegna gruppi agli orari di servizio, progetta etichette, registra la frequenza manuale, esegue rapporti |

Tutti e tre chiamano gli stessi due moduli API attraverso `ApiHelper`: **MembershipApi** (`/membership`) per persone, famiglie e gruppi; **AttendanceApi** (`/attendance`) per tutto il resto.

## Modello di dati (`Api/src/modules/attendance`)

| Entità / tabella | Campi chiave | Significato |
|----------------|-----------|---------|
| `campuses` | name, address | Deprecato qui -- i campus sono masterizzati nel modulo membership (`/membership/campuses`); la copia di frequenza è congelata di sola lettura per lettori legacy (`models/Campus.ts`) |
| `services` | campusId, name | Un raduno ricorrente, ad es. "Sunday Morning" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name | Una fascia oraria all'interno di un servizio, ad es. "9:00 AM" (`models/ServiceTime.ts`) |
| `groupServiceTimes` | groupId, serviceTimeId | Tabella di join: quali gruppi (aule) si incontrano a quali orari di servizio (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Un incontro di un gruppo in una data -- creato pigramente al momento del check-in (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Una persona che frequenta in una data (`models/Visit.ts`). `checkinType` è `member` / `guest` / `volunteer` (NULL = legacy member), impostato dal kiosk e consumato dai gate di capacità/rapporto |
| `visitSessions` | visitId, sessionId | Quale sessione(i) copre una visita -- un bambino controllato in due orari di servizio ottiene due righe (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON blocks) | Layout di etichette progetabili (`models/LabelTemplate.ts`) |

### Come viene persistito un check-in completato

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) gestisce `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Il corpo è un array di oggetti `Visit`, ciascuno che porta `visitSessions` i cui `session` incorporati denominano solo una coppia `(serviceTimeId, groupId)`. Il server quindi:

1. **Gate di capacità e rapporti prima di qualsiasi scrittura.** `evaluateGates()` → `CheckinGateHelper.evaluate()` controlla ogni stanza mirata per capacità, capacità ospite, bandiera chiusa e rapporto di volontari rispetto all'occupazione attuale. postCheckin **non è transazionale**, quindi il gate deve funzionare prima del primo salvataggio -- una violazione dura restituisce un 409 che nomina la/le stanza/e trasgressiva e nulla viene persistito. Vedi [Gate di Capacità e Rapporto Volontari](#capacity-and-volunteer-ratio-gates).
2. **Risolve le sessioni pigramente.** `getSessionId()` trova o crea la riga `sessions` per `(groupId, serviceTimeId, today)` -- gli id di sessione sono memorizzati in-process per data. Le nuove sessioni emettono un webhook `session.created`. Il ciclo è un `for..of` atteso -- un `forEach(async …)` fire-and-forget precedente ha corso il salvataggio e ha scritto NULL sessionIds alla creazione della sessione (riparato; notato in un commento di codice nel ciclo).
3. **Sostituisce i record del giorno.** Eventuali visite esistenti per quelle persone a quel servizio oggi vengono eliminate insieme alle loro visitSessions, quindi l'insieme inviato viene salvato. Il nuovo check-in di una famiglia è quindi un'operazione idempotente "questo è lo stato attuale", non un'append. Passare `?checkDuplicates=true` al posto restituisce `{ duplicates: [personId…] }` senza scrivere, che è il modo in cui il kiosk avvisa prima di sovrascrivere.
4. **Genera un codice di sicurezza per batch.** `SecurityCodeHelper.generate()` produce un codice di 4 caratteri dall'alfabeto `23456789BCDFGHJKLMNPQRSTVWXYZ` (nessuna vocale o caratteri ambigui, quindi i codici non possono dare forma a parole o fraintendere). Il server ritenta la collisione rispetto ai visitati aperti nello stesso giorno della stessa chiesa e timbra il codice su ogni visita nel batch.
5. **Restituisce `{ streaks, securityCode }`.** `streaks` mappa personId al conteggio di frequenza settimanale consecutiva; il kiosk celebra i traguardi (ogni 5ª settimana) con coriandoli.

Ogni visita salvata emette anche un webhook `attendance.recorded`. Il lato lettura, `GET /attendance/visits/checkin`, restituisce i visitati delle persone dalla loro **ultima data registrata** -- se era una settimana precedente gli id vengono eliminati, in modo che il client riceva una copia pre-riempita delle selezioni della stanza della scorsa settimana che salveranno come nuovi record.

### Check-out

Due endpoint completano il ciclo (`VisitController`):

- `GET /attendance/visits/code/:code` -- visite odierne non ancora controllate che portano quel codice di sicurezza, con sessioni popolate.
- `POST /attendance/visits/checkout` -- corpo `{ visitIds, checkedOutBy?, checkedOutById? }`; timbra `checkoutTime` e chi ha ripreso, e emette un webhook `attendance.checkout` per visita.

Autorizzazioni: i kiosk si autenticano con `attendance.checkin`, che concede esattamente la superficie di check-in/check-out/template-etichette; `attendance.view`/`attendance.edit` coprono report e input manuale; la struttura (servizi, orari di servizio, assegnazioni di gruppo) richiede `services.edit`. L'auto check-in dei membri (B1App) non necessita di alcuna autorizzazione: qualsiasi utente autenticato con una persona collegata nella chiesa può chiamare `GET`/`POST /attendance/visits/checkin`, e il server limita i `personId` inviati alla famiglia dell'utente (403 altrimenti -- questo steccato è ciò che mantiene i `securityCode` di altre famiglie illeggibili). L'appartenenza è la concessione; se i membri *vedono* la funzione è controllato dalle schede di navigazione B1App della chiesa. Gli altri endpoint di check-in (`code/:code`, `checkout`, `guardians`, `CheckinController`) rimangono solo kiosk/staff.

## I Gruppi guidano l'instradamento della stanza

Non c'è nessuna entità di stanza o aula da nessuna parte nel sistema. Una "stanza" è un **gruppo** di membership con `trackAttendance` abilitato, collegato a uno o più orari di servizio tramite `groupServiceTimes`. I campi del gruppo (su `Api/src/modules/membership/models/Group.ts`) che plasmare il comportamento del kiosk:

| Campo | Effetto |
|------|--------|
| `trackAttendance` | Il gruppo partecipa affatto alla frequenza; l'albero di setup di B1Admin contrassegna i gruppi `trackAttendance` senza righe `groupServiceTimes` come non assegnati |
| `parentPickup` | Contrassegna una stanza per bambini: il check-in in essa fa una visita "child", che stampa un'etichetta di consegna familiare e mette il codice di sicurezza sul nametag |
| `printNametag` | Se i check-in a questo gruppo stampano affatto un nametag |
| `capacity` / `guestCapacity` / `checkinClosed` | Limiti di capacità della stanza e un interruttore "closed" duro, applicato server-side dal gate di check-in (modificato nelle impostazioni di gruppo di B1Admin sotto "Check-In Capacity") |
| `volunteerRatio` / `minVolunteers` | Rapporto bambini-per-volontario e conteggio minimo di volontari, applicato in base all'impostazione della chiesa-larga `ratioEnforcement` |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Limiti di idoneità età/grado valutati lato kiosk per evidenziare o affievolire le stanze |

Ogni cliente denormalizza allo stesso modo (ad es. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): carica `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` e `GET /membership/groups` in parallelo, quindi per ogni ora di servizio raccogli i gruppi la cui riga `groupServiceTimes` punta ad esso in `serviceTime.groups`. Quel array è quello che il selettore di stanza mostra, organizzato per `categoryName` del gruppo.

Le assegnazioni vengono modificate dalla pagina del gruppo in B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` -- `POST`/`DELETE /attendance/groupservicetimes`), e l'intero albero Campus → Servizio → Ora di Servizio → Gruppo è visualizzato in `B1Admin/src/attendance/components/AttendanceSetup.tsx` tramite `GET /attendance/attendancerecords/tree`.

:::info
Poiché i gruppi sono l'unica fonte di verità, l'iscrizione al gruppo stesso alimenta l'instradamento del kiosk, la frequenza di stile roster nelle pagine del gruppo di B1Admin e il rapporto di frequenza -- assegnare un gruppo a un'ora di servizio è l'unico passo necessario per renderlo una destinazione di check-in.
:::

## Sicurezza infantile

### Tipi di Check-in

Ogni visita porta un `checkinType` -- `member`, `guest`, o `volunteer` (NULL significa legacy/member; migrazione `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Il tipo è scelto **lato kiosk**: chip Membro / Ospite / Volontario sulla riga membro espansa (`B1Checkin/src/components/MemberServiceTimes.tsx`), timbrato su ogni visita in sospeso al completamento (`app/checkinComplete.tsx`, di default su `member`). Il server lo consuma nel gate -- i volontari contano verso la copertura del rapporto anziché contro la capacità, e gli ospiti contano contro `guestCapacity`.

### Gate di Capacità e Rapporto Volontari

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) viene eseguito dentro `postCheckin` prima di qualsiasi salvataggio (l'endpoint è non transazionale, quindi il gating-before-save è il meccanismo di correttezza). Carica l'occupazione attuale per gruppo mirato (`VisitRepo.countActiveByGroupToday`) e la configurazione del gruppo attraverso il gateway del modulo di membership, quindi classifica le violazioni:

- **Duro (sempre blocco):** `checkinClosed`, `current + incoming > capacity`, conteggio ospite oltre `guestCapacity`. Il batch viene rifiutato con `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` -- il kiosk mostra la stanza nominata.
- **Rapporto (avvisa o blocca):** non-volontari in arrivo in una stanza dove `volunteers < minVolunteers`, nessun volontario affatto, o `children > volunteers × volunteerRatio`. La gravità segue l'impostazione della chiesa per-chiesa `ratioEnforcement` (`"warn"` default / `"block"`, modificato in B1Admin Gestisci Chiesa → Check-In, `CheckinSettingsEdit.tsx`). Il modo di avviso restituisce `409 { warning: true, error: "ratio", … }` a meno che il client non reinvii con `acknowledgeWarnings=true` -- quel reinvio è l'override di conferma dello staff del kiosk.

### Idoneità Età/Grado (lato kiosk)

L'idoneità della stanza è UI di avviso, valutata sul kiosk, non applicata dal server. `B1Checkin/src/helpers/EligibilityHelper.ts` confronta la data di nascita/grado di una persona rispetto ai `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` del gruppo (ordine di grado: PreK, K, 1–12, Laureato) e restituisce `eligible` / `ineligible` / `unknown` -- i dati mancanti producono `unknown` e non nascondono mai una stanza. Le età e i gradi sono calcolati a partire dalla **data di promozione di grado** della chiesa (`gradePromotionDate` impostazione, `"MM-DD"`, modificato in `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); il kiosk lo recupera da `GET /attendance/checkin/settings`, e `resolveAsOfDate` sceglie l'occorrenza più recente entro e su oggi. Il selettore di stanza evidenzia le stanze idonee e offusca quelle non idonee; selezionando una stanza offuscata richiede una conferma dello staff.

### Consegna Affidabile e Non Autorizzata

Le persone di consegna sono un'entità di membership, per famiglia: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` -- householdId, personId facoltativo, nome, photoUrl, relationship, `status` `trusted` / `notAuthorized`, note). CRUD è `GET /membership/householdpickup/:householdId` (qualsiasi utente della chiesa autenticato, così i kiosk possono leggerlo) più `POST` / `DELETE` controllato da `people.edit`. Lo staff gestisce l'elenco nella scheda **Consegna** della pagina della persona (`B1Admin/src/people/components/PickupPeople.tsx`) -- foto, relazione e un chip di stato Affidabile/Non Autorizzato.

Al checkout (`B1Checkin/app/checkout.tsx`) il kiosk carica l'elenco di consegna della famiglia: le voci `trusted` si rendono come schede di consegna toccabili accanto alla griglia di foto degli adulti della famiglia, e un nome digitato liberamente "Altro" viene corrisponduto sfocato (Levenshtein, `src/helpers/PickupMatchHelper.ts`) rispetto alle voci `notAuthorized` -- una corrispondenza blocca il checkout con un foglio di avviso e un pulsante **Override** dello staff. L'override viene registrato nella visita stessa: invia `checkedOutBy` come `"OVERRIDE: {name}"` tramite il normale `POST /attendance/visits/checkout`, in modo che vada nel record di frequenza e il webhook `attendance.checkout` piuttosto che una tabella di audit separata.

### Page-a-Parent e Broadcast di Emergenza

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) espone due endpoint SMS:

- `POST /page` -- `{ visitId, message }`: pagina i tutori di un bambino controllato (schermata di checkout del kiosk, modo presidiato).
- `POST /broadcast` -- `{ serviceId, message }`: testa ogni famiglia controllata in adulti per un servizio (impostazioni admin del kiosk, dietro un foglio di conferma di tipo `EMERGENCY` in `B1Checkin/app/adminSettings.tsx`).

Entrambi risolvono adulti della famiglia attraverso il gateway di membership, quindi passano la consegna a **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) -- la porta tra moduli nella porta del provider di texting configurato della chiesa (`@churchapps/texting`: TextInChurch, Clearstream, o MutualMinistry; non c'è mittente SMS integrato). Il gateway registra una riga `sentText` più voci `deliveryLog` per destinatario e limita un batch a 500 destinatari; senza un provider configurato restituisce `no_provider`, che il kiosk produce come "Nessun provider SMS configurato". Il `dispatch()` del controller dedup numeri di telefono e salta persone senza mobile o `optedOut` impostato, restituendo `{ sent, failed, skippedOptedOut, skippedNoPhone }` in modo che il kiosk possa mostrare cosa è stato saltato.

## Il kiosk (B1Checkin)

Le schermate sono file expo-router sotto `B1Checkin/app/`; lo stato tra schermate vive in una classe statica `CachedData` (`src/helpers/CachedData.ts`), non lo stato di React.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Lookup** (`app/lookup.tsx`) -- ricerca per telefono (`GET /membership/people/search/phone?number=`, ultimi 4 o completo) o per nome (`GET /membership/people/search?term=`). Selezionando una corrispondenza carica la famiglia (`GET /membership/people/household/{householdId}`) e visite esistenti (`GET /attendance/visits/checkin`), seminando `pendingVisits` con le selezioni della scorsa settimana.
2. **Revisione della famiglia** (`app/household.tsx`, `src/components/MemberList.tsx`) -- ogni riga del membro mostra un badge già controllato, un badge di allergia/`nametagNotes` e i loro chip della stanza attuale. L'espansione di un membro elenca ogni ora di servizio con un pulsante di stanza più i chip di tipo di check-in Membro / Ospite / Volontario (`MemberServiceTimes.tsx`).
3. **Assegnazione di gruppo** (`app/selectGroup.tsx`) -- un albero di categoria costruito da `serviceTime.groups`, con stanze idonee per età/grado evidenziate e quelle non idonee offuscate dietro una conferma dello staff (vedi [Idoneità Età/Grado](#agegrade-eligibility-kiosk-side)); selezionando una stanza scrive una `{ session: { serviceTimeId, groupId } }` visitSession nella visita in sospeso di quella persona (`src/helpers/VisitSessionHelper.ts`). "None" la cancella.
4. **Completamento** (`app/checkinComplete.tsx`) -- `POST /attendance/visits/checkin` con `pendingVisits` (ciascuno timbrato con il suo `checkinType`), quindi stampa etichette se una stampante è configurata e auto-ritorni alla ricerca. Una risposta `409` di capacità mostra la stanza nominata piena/chiusa; un avviso di rapporto offre una conferma dello staff che reinvia con `acknowledgeWarnings=true`.

La **schermata di checkout** (`app/checkout.tsx`) accetta il codice di sicurezza di 4 caratteri attraverso un input auto-focalizzato -- in modo che gli scanner di codici a barre della tastiera USB/Bluetooth funzionino senza la fotocamera -- o un tastierino sullo schermo usando lo stesso alfabeto, auto-invio a 4 caratteri. Cerca il codice, mostra i bambini che vengono ripreso, e presenta le **persone di consegna affidabile** della famiglia come schede toccabili accanto a una griglia di foto di adulti della famiglia (più un'opzione "Altro" di testo libero che viene controllata sfocatamente rispetto ai nomi non autorizzati -- vedi [Consegna Affidabile e Non Autorizzata](#trusted-and-not-authorized-pickup)), quindi invia `POST /attendance/visits/checkout` con il nome/id di chi ha fatto la consegna. In modo presidiato la schermata offre anche **Page a Parent** (`POST /attendance/checkin/page`) e una **ristampa di etichetta di sicurezza** -- `reprint()` ricostruisce le etichette della famiglia con `LabelHelper.getAllLabelsFor(...)` e le alimenta attraverso la stessa pipeline `PrintUI` del check-in.

La personalità della stazione è un flag AsyncStorage `@StationMode` (`"self"` | `"manned"`, commutato in `app/adminSettings.tsx`). Il modo presidiato aggiunge il punto di ingresso di checkout sulla schermata di ricerca e la modifica dei profili per membro (`POST /membership/people`) dalla schermata della famiglia. L'hardening del chiosco è integrato: un PIN facoltativo (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) controlla le schermate di admin e stampante, la schermata di admin si apre solo tramite 7 tocchi rapidi sul logo dell'intestazione, e una schermata di attrazione inattiva (`src/hooks/useInactivityTimer.ts`) riprende tra le famiglie.

## Auto check-in (B1App)

I membri si controllano dal portale b1.church alla schermata `/mobile/checkin` (instradata da `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` a `screens/CheckinPage.tsx`). Richiede un utente loggato e percorre gli stessi quattro passaggi del kiosk -- servizi → famiglia → gruppi → completamento -- rispetto agli endpoint identici, con stato mantenuto in `B1App/src/helpers/CheckinHelper.ts`. Le differenze rispetto al kiosk: la famiglia viene da `householdId` loggato in dell'utente (nessun passo di ricerca), e non c'è stampa di etichette -- al posto la schermata di completamento mostra il `securityCode` del batch come QR (`qrcode.react`) con un suggerimento "mostra questo su una stazione di check-in". Se la famiglia è già controllata quando la pagina si carica, un pulsante "Mostra codice check-in" ridisplay il QR dal `securityCode` della visita esistente. Il check-in viene registrato immediatamente al momento dell'invio (non c'è stato in sospeso); il QR guida solo la stampa di etichette al chiosco.

**Stampa di etichette da telefono a kiosk** (`B1Checkin/app/scan.tsx`, raggiunto dal pulsante "Scansione codice" sulla schermata di ricerca): il kiosk apre una `CameraView` di `expo-camera` (di fronte per default, capovolgibile) che scansiona i codici QR. Un payload scansionato viene accettato quando è un codice di 4 caratteri nudo nell'alfabeto del codice di sicurezza, in modo che sia il QR B1App che il blocco QR di un'etichetta stampata funzionino. La schermata quindi segue il percorso di ristampa del checkout -- `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` -- e ritorna alla ricerca. Nessuna scrittura di frequenza accade al momento della scansione; solo etichette. I codici senza visite attive, le stazioni senza stampante e i gruppi senza etichette ciascuno producono un toast e ritornano alla ricerca.

I tipi e `ApiHelper`/`ArrayHelper` vengono da `@churchapps/helpers` e `@churchapps/apphelper`; nessun componente React viene condiviso con B1Admin.

## Frequenza lato admin (B1Admin)

- **Setup** -- `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) rende l'albero di struttura e crea servizi (`ServiceEdit.tsx`) e orari di servizio (`ServiceTimeEdit.tsx`). I dati di campus provengono da membership tramite l'hook `useCampuses()`.
- **Frequenza manuale** vive dal lato Gruppi, non dalla sezione frequenza: `B1Admin/src/groups/components/GroupSessionsTab.tsx` crea sessioni (`POST /attendance/sessions`) e contrassegna le persone presenti tramite `POST /attendance/visitsessions/log`, che trova o crea la visita per quella persona e sessione. I leader di gruppo possono registrare la frequenza per i loro gruppi senza il permesso `attendance.edit` -- i controller controllano `au.leaderGroupIds`.
- **Rapporto** -- frequenza e frequenza del gruppo sono rapporti definiti dal server (`B1Admin/src/components/reporting/ReportWithFilter.tsx` su ReportingApi); la storia per persona è `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Stampa di Etichette

### Modelli e il Designer

Le chiese progettano le loro etichette in B1Admin at `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, raggiunto dalla pagina Impostazioni Check-In). Un modello è una riga `labelTemplates` la cui `content` è un array JSON di blocchi -- `text`, `field`, `barcode`, `qrcode`, o `box` -- ciascuno posizionato in coordinate percentuali con carattere, allineamento, simbologia (`code39`/`code128`/`qr`), e condizioni di visibilità opzionali (ad es. rendere solo il box allergia quando `person.nametagNotes` è non-vuoto). Due `labelType`s esistono: `nametag` (uno per persona controllata; campi come `person.displayName`, `sessions`, `securityCode`) e `pickup` (uno per famiglia; campi come `children`, `childrenAllergies`). Il server applica un singolo default per tipo per chiesa (`LabelTemplateController.save`). Il designer spedisce modelli di avvio specchiano le etichette in bundle del kiosk e anteprima su dati di esempio.

### Rendering e Stampa sul Chiosco

Al completamento del check-in, `B1Checkin/src/helpers/LabelHelper.ts` decide cosa stampare dai flag del gruppo su ogni visita in sospeso: nametag per i gruppi `printNametag`, più un'etichetta di consegna della famiglia se qualsiasi visita ha colpito un gruppo `parentPickup`. Il codice di sicurezza dalla risposta di check-in va su nametag di bambini e sull'etichetta di consegna; i nametag per adulti stampano senza un codice. Se la chiesa ha modelli, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) trasforma blocchi + un contesto di campo in un documento HTML autonomo; altrimenti le etichette HTML in bundle in `B1Checkin/assets/labels/` vengono utilizzate con sostituzione del segnaposto.

I codici a barre vengono generati come SVG inline da encoder TypeScript puri in `B1Checkin/src/helpers/barcode.ts` -- tabelle di modelli di codice 39 e code 128 (set di codice B con checksum mod-103) plus QR tramite il pacchetto `qrcode`. **Questi encoder sono intenzionalmente duplicati in B1Admin** (`LabelEditor.tsx` inline le stesse tabelle, notato in un commento di codice) così le anteprime del designer sono fedeli al pixel all'output del kiosk; una modifica a una deve essere rispecchiata nell'altra.

La pipeline di stampa (`src/components/PrintUI.tsx`) rende ogni etichetta HTML in una `WebView`, la cattura a JPG tramite `react-native-view-shot`, e passa gli URI delle immagini al modulo Expo nativo **printer-helper** (`B1Checkin/modules/printer-helper/`). Il modulo espone `scan()`, `checkInit()`, `printUris()` e eventi di stato, con un fornitore per marchio su entrambe le piattaforme:

| Marchio | Android | iOS | Note |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Stampanti di rete QL-series (QL-800/810W/820NWB/1100/1110NWB…), etichette a taglio del morso 29×90, il default consigliato |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Scoperta di rete + stampa immagine TCP/ZPL |

La selezione della stampante vive su `app/printers.tsx` (la scansione di rete restituisce voci `brand~model~ip`; la scelta persiste su AsyncStorage), e `src/helpers/PrinterLog.ts` mantiene un registro diagnostico su dispositivo prodotto attraverso un punto di stato live nell'intestazione del kiosk.

## Registrazione Ospite

Due percorsi creano una persona mid-check-in:

- **Al chiosco** -- la schermata della famiglia "Aggiungi ospite" apre `B1Checkin/app/addGuest.tsx`, che ricerca prima `GET /membership/people/search?term=` per una corrispondenza non membro esistente e altrimenti ne crea una con `POST /membership/people`, allegata alla famiglia attuale. L'ospite quindi scorre l'assegnazione di gruppo come qualsiasi membro.
- **Self-serve via QR** -- quando l'impostazione della chiesa `enableQRGuestRegistration` è on (configurato nelle impostazioni Check-In di B1Admin, leggi da `GET /membership/settings/public/{churchId}`), la schermata di ricerca del kiosk mostra un codice QR che si collega a `https://{subdomain}.b1.church/guest-register?serviceId=`. Quella pagina B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) consente a una famiglia in visita di registrarsi da sola sul proprio telefono tramite l'endpoint anonimo `POST /membership/people/guest-register`, mantenendo la linea del chiosco in movimento.

## Pagine Correlate

- [Endpoint Frequenza](../api/endpoints/attendance) -- Superficie REST completa per campus, servizi, sessioni, visite e sessioni di visita
- [Endpoint Membership](../api/endpoints/membership) -- Persone, famiglie e gruppi
- [Webhooks](../api/webhooks) -- Gli eventi `session.created`, `attendance.recorded` e `attendance.checkout`
- [Struttura Modulo](../api/module-structure) -- Come il modulo di frequenza è organizzato lato server
