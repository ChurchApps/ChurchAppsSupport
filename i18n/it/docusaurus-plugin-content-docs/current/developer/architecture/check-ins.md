---
title: "Check-in"
---

# Check-in

<div class="article-intro">

Il check-in è un sistema con tre porte d'ingresso: l'app chiosco B1Checkin per stazioni presidiate e self-serve, il self check-in all'interno del portale dei membri B1App, e l'assistenza di amministrazione in B1Admin. Tutti e tre scrivono nello stesso modulo di presenza nell'Api centrale, e il routing delle classi è guidato interamente da Gruppi — non c'è alcuna entità "locazioni" o "stanze" separata. Uno strato di sicurezza dei bambini si siede in cima: tipi di check-in per visita, cancelli di capacità e rapporto di volontari lato server, eleggibilità di età/grado lato chiosco, verifica di pickup autorizzato al check-out, e avviso di genitori sul provider di messaggistica della chiesa. Questa pagina mappa il modello di dati, i flussi di check-in, lo strato di sicurezza, e la pipeline di stampa delle etichette.

</div>

## Panoramica

```
┌──────────────────────────┐
│ B1Checkin (Expo chiosco) │──┐         ┌──────────────────────────────────────────────┐
│  ricerca → nucleo →      │  │         │ Api                                          │
│  gruppi → completa/stampa│  │  HTTPS  │  ┌─ modulo di appartenenza ──────────────┐ │
├──────────────────────────┤  ├───────▶ │  │ people · nuclei · gruppi              │ │
│ B1App (self check-in)    │──┤         │  └─────────────────────────────────────────┘ │
│  schermata /mobile/      │  │         │  ┌─ modulo di presenza ──────────────────┐ │
│  checkin                 │  │         │  │ campus → servizi → orari servizi    │ │
├──────────────────────────┤  │         │  │ orariGruppo  (routing stanze)       │ │
│ B1Admin (staff)          │──┘         │  │ sessioni ← visitSessioni → visit    │ │
│  setup · report ·        │            │  │ modellietichette                    │ │
│  designer etichette      │            │  └─────────────────────────────────────────┘ │
└──────────────────────────┘            │                                              │
                                        └──────────────────────────────────────────────┘

Percorso di stampa etichette (solo chiosco):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (modelli etichetta, o fallback HTML bundle)
       └▶ LabelRenderer → documento HTML + codici a barre SVG inline
            └▶ PrintUI: rendering WebView → cattura JPG ViewShot
                 └▶ modulo printer-helper nativo → Brother QL / Zebra
```

| Superficie | Repo | Stack | Ruolo |
|---------|------|-------|------|
| Chiosco | `B1Checkin` | Expo / React Native, file routing expo-router; build EAS per Android, Amazon Fire, e iOS; aggiornamenti OTA via `expo-updates` | Stazione presidiate o self-serve con stampa di etichette e check-out verificato |
| Self check-in | `B1App` | Next.js (portale dei membri b1.church) | I membri connessi controllano il loro nucleo da un telefono; nessuna stampa |
| Admin | `B1Admin` | SPA React | Configura la struttura del servizio, assegna i gruppi agli orari di servizio, progetta le etichette, registra la frequenza manuale, esegue i report |

Tutti e tre chiamano gli stessi due moduli API attraverso `ApiHelper`: **MembershipApi** (`/membership`) per persone, nuclei, e gruppi; **AttendanceApi** (`/attendance`) per tutto il resto.

## Modello di dati (`Api/src/modules/attendance`)

| Entità / tabella | Campi chiave | Significato |
|----------------|-----------|---------|
| `campuses` | name, address | Deprecato qui — i campus sono mastered nel modulo di appartenenza (`/membership/campuses`); la copia di presenza è congelata read-only per i lettori legacy (`models/Campus.ts`) |
| `services` | campusId, name | Una riunione ricorrente, ad es. "Domenica Mattina" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name | Uno slot di tempo all'interno di un servizio, ad es. "09:00" (`models/ServiceTime.ts`) |
| `groupServiceTimes` | groupId, serviceTimeId | Tabella join: quali gruppi (classi) si riuniscono a quali orari di servizio (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Un incontro di un gruppo in una data — creato lazily al tempo del check-in (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Una persona che frequenta in una data (`models/Visit.ts`). `checkinType` è `member` / `guest` / `volunteer` (NULL = legacy member), impostato dal chiosco e consumato dai cancelli di capacità/rapporto |
| `visitSessions` | visitId, sessionId | Quale(i) sessione(i) una visita copre — un bambino controllato in due orari di servizio ottiene due righe (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (blocchi JSON) | Layout etichette designabili (`models/LabelTemplate.ts`) |

### Come un check-in completato viene persistito

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) gestisce `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Il corpo è un array di oggetti `Visit`, ognuno portando `visitSessions` il cui `session` embedded nomina solo una coppia `(serviceTimeId, groupId)`. Il server poi:

1. **Cancelli di capacità e rapporti di gate prima di qualsiasi scrittura.** `evaluateGates()` → `CheckinGateHelper.evaluate()` verifica la capacità di ogni stanza mirata, capacità ospite, flag chiuso, e rapporto di volontari contro l'occupazione attuale. postCheckin **non è transazionale**, quindi il gate deve eseguire prima del primo salvataggio — una violazione dura ritorna 409 nominando le stanza offendenti e nulla viene persistito. Vedi [Cancelli di capacità e rapporto di volontari](#cancelli-di-capacità-e-rapporto-di-volontari).
2. **Risolve le sessioni lazily.** `getSessionId()` trova o crea la riga `sessions` per `(groupId, serviceTimeId, oggi)` — gli id di sessione sono cache in-processo per data. Le nuove sessioni emettono un webhook `session.created`. Il ciclo è un `for..of` atteso — un precedente `forEach(async …)` fire-and-forget ha corso il salvataggio e scritto NULL sessionIds sulla creazione della prima sessione (risolto; notato in un commento di codice nel ciclo).
3. **Sostituisce i record del giorno.** Qualsiasi visita esistente per quelle persone a quel servizio oggi vengono eliminate insieme alle loro visitSessions, poi il set inviato viene salvato. Il re-check-in di una famiglia è quindi un'operazione idempotente "questo è lo stato attuale", non un'aggiunta. Passare `?checkDuplicates=true` invece ritorna `{ duplicates: [personId…] }` senza scrivere, che è come il chiosco avverte prima di sovrascrivere.
4. **Genera un codice di sicurezza per batch.** `SecurityCodeHelper.generate()` produce un codice di 4 caratteri dall'alfabeto `23456789BCDFGHJKLMNPQRSTVWXYZ` (no vocali o caratteri ambigui, così i codici non possono stavellare parole o fraintendere). Il server riprova sulla collisione contro i visitatori open dello stesso giorno della stessa chiesa e timbra il codice su ogni visita nel batch.
5. **Ritorna `{ streaks, securityCode }`.** `streaks` mappa personId al conteggio di presenze settimanali consecutive; il chiosco celebra le pietre miliari (ogni 5a settimana) con coriandoli.

Ogni visita salvata emette anche un webhook `attendance.recorded`. Il lato lettura, `GET /attendance/visits/checkin`, ritorna i visitatori delle persone dalla loro **data registrata più recente** — se quella era una settimana precedente gli id vengono spogliati, così il client riceve una copia pre-compilata delle selezioni di stanza della scorsa settimana che salveranno come nuovi record.

### Check-out

Due endpoint completano il ciclo (`VisitController`):

- `GET /attendance/visits/code/:code` — i visitatori di oggi non ancora controllati in uscita portando quel codice di sicurezza, con sessioni popolate.
- `POST /attendance/visits/checkout` — corpo `{ visitIds, checkedOutBy?, checkedOutById? }`; timbra `checkoutTime` e chi ha ritirato, ed emette un webhook `attendance.checkout` per visita.

Permessi: i chioschi si autenticano con `attendance.checkin`, che concede esattamente la superficie check-in/check-out/modello-etichetta; `attendance.view`/`attendance.edit` coprono il report e l'entry manuale; la struttura (servizi, orari di servizio, assegnazioni di gruppo) richiede `services.edit`.

## I gruppi guidano il routing delle stanze

Non c'è alcuna entità di stanza o aula da nessuna parte nel sistema. Una "stanza" è un **gruppo** di appartenenza con `trackAttendance` abilitato, collegato a uno o più orari di servizio attraverso `groupServiceTimes`. I campi del gruppo (su `Api/src/modules/membership/models/Group.ts`) che modellano il comportamento del chiosco:

| Campo | Effetto |
|------|--------|
| `trackAttendance` | Il gruppo partecipa alla presenza per nulla; l'albero di setup di B1Admin contrassegna i gruppi `trackAttendance` senza riga `groupServiceTimes` come non assegnati |
| `parentPickup` | Contrassegna una stanza per bambini: il check-in ad essa rende la visita una visita "bambino", che stampa un'etichetta di pickup familiare e mette il codice di sicurezza sul tag di nome |
| `printNametag` | Se i check-in a questo gruppo stampano un nametag per nulla |
| `capacity` / `guestCapacity` / `checkinClosed` | Limiti di capacità della stanza e un interruttore "chiuso" duro, applicato lato server dal gate di check-in (modificato nelle impostazioni di gruppo di B1Admin sotto "Capacità Check-In") |
| `volunteerRatio` / `minVolunteers` | Rapporto bambini-per-volontario e numero minimo di volontari, applicato per l'impostazione chiesa-wide `ratioEnforcement` |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Limiti di eleggibilità di età/grado valutati lato chiosco per evidenziare o attenuare le stanze |

Ogni client denormalizza allo stesso modo (ad es. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): carica `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes`, e `GET /membership/groups` in parallelo, poi per ogni orario di servizio raccoglie i gruppi la cui riga `groupServiceTimes` punta ad esso in `serviceTime.groups`. Questo array è quello che il selettore di stanze mostra, organizzato per `categoryName` del gruppo.

Gli assegnamenti vengono modificati dalla pagina del gruppo in B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), e l'intero albero Campus → Servizio → Orario servizio → Gruppo è visualizzato in `B1Admin/src/attendance/components/AttendanceSetup.tsx` tramite `GET /attendance/attendancerecords/tree`.

:::info
Perché i gruppi sono l'unica fonte di verità, la stessa appartenenza al gruppo alimenta il routing del chiosco, la frequenza in stile roster sulle pagine del gruppo di B1Admin, e il report di presenza — assegnare un gruppo a un orario di servizio è l'unico passo necessario per renderlo una destinazione di check-in.
:::

## Sicurezza dei bambini

### Tipi di check-in

Ogni visita porta un `checkinType` — `member`, `guest`, o `volunteer` (NULL significa legacy/member; migrazione `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Il tipo è scelto **lato chiosco**: chip Member / Guest / Volunteer sulla riga del membro espanso (`B1Checkin/src/components/MemberServiceTimes.tsx`), timbrato su ogni visita in sospeso al completamento (`app/checkinComplete.tsx`, valore default `member`). Il server lo consuma nel gate — i volontari contano verso la copertura del rapporto invece che contro la capacità, e gli ospiti contano contro `guestCapacity`.

### Cancelli di capacità e rapporto di volontari

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) esegue dentro `postCheckin` prima di qualsiasi salvataggio (l'endpoint non è transazionale, quindi il gating-before-save è il meccanismo di correttezza). Carica l'occupazione attuale per gruppo mirato (`VisitRepo.countActiveByGroupToday`) e la configurazione del gruppo attraverso il gateway del modulo di appartenenza, poi classifica le violazioni:

- **Duro (sempre blocco):** `checkinClosed`, `current + incoming > capacity`, numero ospite oltre `guestCapacity`. Il batch viene rifiutato con `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` — il chiosco mostra la stanza nominata.
- **Rapporto (avviso o blocco):** non-volontari in ingresso in una stanza dove `volunteers < minVolunteers`, nessun volontario per nulla, o `children > volunteers × volunteerRatio`. La gravità segue l'impostazione chiesa-wide `ratioEnforcement` (`"warn"` default / `"block"`, modificato in B1Admin Manage Church → Check-In, `CheckinSettingsEdit.tsx`). La modalità avviso ritorna `409 { warning: true, error: "ratio", … }` a meno che il client reinvii con `acknowledgeWarnings=true` — quel reinvio è la conferma del personale di override del chiosco.

### Eleggibilità di età/grado (lato chiosco)

L'eleggibilità della stanza è consultiva dell'interfaccia utente, valutata sul chiosco, non applicata dal server. `B1Checkin/src/helpers/EligibilityHelper.ts` confronta la data di nascita/grado di una persona contro `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` del gruppo (ordine grado: PreK, K, 1–12, Graduated) e ritorna `eligible` / `ineligible` / `unknown` — i dati mancanti producono `unknown` e non nascondono mai una stanza. Le età e i gradi sono calcolati a partire dalla **data di promozione di grado** della chiesa (`gradePromotionDate` impostazione, `"MM-DD"`, modificato in `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); il chiosco la recupera da `GET /attendance/checkin/settings`, e `resolveAsOfDate` sceglie l'occorrenza più recente su o prima di oggi. Il selettore di stanze evidenzia le stanze idonee e attenuate quelle iniddonee; scegliere una stanza attenuata richiede una conferma del personale.

### Pickup autorizzato e non autorizzato

Le persone che ritirano sono un'entità di appartenenza, per nucleo: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, optional personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). CRUD è `GET /membership/householdpickup/:householdId` (qualsiasi utente della chiesa autenticato, così i chioschi possono leggerlo) più `POST` / `DELETE` controllato da `people.edit`. Il personale gestisce l'elenco sulla scheda **Pickup** della pagina della persona (`B1Admin/src/people/components/PickupPeople.tsx`) — foto, relazione, e un chip di stato Trusted/Not Authorized.

Al check-out (`B1Checkin/app/checkout.tsx`) il chiosco carica l'elenco di pickup del nucleo: le voci `trusted` vengono renderizzate come schede di pickup toccabili insieme alla griglia di foto degli adulti del nucleo, e un nome libero "Altro" è fuzzy-matched (Levenshtein, `src/helpers/PickupMatchHelper.ts`) contro le voci `notAuthorized` — una corrispondenza blocca il check-out con un foglio di avviso e un pulsante **Override** del personale. L'override viene registrato sulla visita stessa: posta `checkedOutBy` come `"OVERRIDE: {name}"` attraverso il normale `POST /attendance/visits/checkout`, così atterra nel record di presenze e nel webhook `attendance.checkout` piuttosto che una tabella di audit separata.

### Avviso genitore e broadcast di emergenza

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) espone due endpoint SMS:

- `POST /page` — `{ visitId, message }`: avvisa i tutori di un bambino controllato (schermata di check-out chiosco, modalità presidiate).
- `POST /broadcast` — `{ serviceId, message }`: invia messaggi di testo a ogni nucleo adulto controllato per un servizio (impostazioni admin chiosco, dietro un foglio di conferma tipo `EMERGENCY` in `B1Checkin/app/adminSettings.tsx`).

Entrambi risolvono gli adulti del nucleo attraverso il gateway di appartenenza, poi affidano la consegna a **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — la porta tra moduli nella finestra di configurazione della chiesa (`@churchapps/texting`: TextInChurch, Clearstream, o MutualMinistry; non c'è mittente SMS incorporato). Il gateway registra una riga `sentText` più voci `deliveryLog` per destinatario e limita un batch a 500 destinatari; senza provider configurato ritorna `no_provider`, che il chiosco presenta come "Nessun provider SMS configurato". Il `dispatch()` del controller deduplica i numeri di telefono e salta le persone senza mobile o con `optedOut` impostato, ritornando `{ sent, failed, skippedOptedOut, skippedNoPhone }` così il chiosco può mostrare cosa è stato saltato.

## Il chiosco (B1Checkin)

Le schermate sono file expo-router sotto `B1Checkin/app/`; lo stato tra schermate vive in una classe statica `CachedData` (`src/helpers/CachedData.ts`), non stato React.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             carica orari di servizio,    │             │  └─────────┘ └▶ addGuest  └▶ stampa etichette,
             gruppi,                      │             └▶ checkout (presidiate)      auto-ritorno
             gruppiOrarServizi,           │                                          a lookup
             modellietichette             │
```

1. **Lookup** (`app/lookup.tsx`) — ricerca per telefono (`GET /membership/people/search/phone?number=`, ultimi 4 o completo) o per nome (`GET /membership/people/search?term=`). Selezionare una corrispondenza carica il nucleo (`GET /membership/people/household/{householdId}`) e i visitatori esistenti (`GET /attendance/visits/checkin`), seminando `pendingVisits` con le selezioni della scorsa settimana.
2. **Revisione del nucleo** (`app/household.tsx`, `src/components/MemberList.tsx`) — ogni riga di membro mostra un badge già-controllato, badge di allergia/`nametagNotes`, e i loro chip di stanza attuali. Espandere un membro elenca ogni orario di servizio con un pulsante di stanza più i chip di tipo check-in Member / Guest / Volunteer (`MemberServiceTimes.tsx`).
3. **Assegnazione di gruppo** (`app/selectGroup.tsx`) — un albero di categoria costruito da `serviceTime.groups`, con le stanze idonee per età/grado evidenziate e quelle iniddonee attenuate dietro una conferma del personale (vedi [Eleggibilità di età/grado](#eleggibilità-di-etàgrado-lato-chiosco)); selezionare una stanza scrive un `{ session: { serviceTimeId, groupId } }` visitSession nella visita in sospeso di quella persona (`src/helpers/VisitSessionHelper.ts`). "Nessuno" lo cancella.
4. **Completa** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` con `pendingVisits` (ognuno timbrato con il suo `checkinType`), poi stampa le etichette se una stampante è configurata e auto-ritorna a lookup. Una risposta `409` di capacità mostra la stanza piena/chiusa nominata; un avviso di rapporto offre una conferma del personale che reinvia con `acknowledgeWarnings=true`.

La schermata **check-out** (`app/checkout.tsx`) accetta il codice di sicurezza di 4 caratteri attraverso un input auto-focused — così i scanner di codice a barre USB/Bluetooth keyboard-wedge funzionano senza fotocamera — o un tastierino sullo schermo usando lo stesso alfabeto, auto-invio a 4 caratteri. Cerca il codice, mostra i bambini che vengono ritirati, e presenta il **le persone autorizzate di pickup** del nucleo come schede toccabili insieme a una griglia di foto degli adulti del nucleo (più un'opzione libera "Altro" che è fuzzy-controllata contro i nomi non autorizzati — vedi [Pickup autorizzato e non autorizzato](#pickup-autorizzato-e-non-autorizzato)), poi posta `POST /attendance/visits/checkout` con il nome/id di chi ritira. In modalità presidiate la schermata offre anche **Avviso a un genitore** (`POST /attendance/checkin/page`) e una **ristampa di etichetta di sicurezza** — `reprint()` ricostruisce le etichette della famiglia con `LabelHelper.getAllLabelsFor(...)` e le alimenta attraverso la stessa pipeline `PrintUI` del check-in.

La personalità della stazione è un flag AsyncStorage `@StationMode` (`"self"` | `"manned"`, commutato in `app/adminSettings.tsx`). La modalità presidiate aggiunge il punto di ingresso al check-out sulla schermata di lookup e la modifica del profilo per membro (`POST /membership/people`) dalla schermata del nucleo. L'indurimento del chiosco è incorporato: un PIN opzionale (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) controlla le schermate di amministrazione e stampante, la schermata di amministrazione si apre solo tramite 7 tap rapidi sul logo dell'intestazione, e una schermata attract di inattività (`src/hooks/useInactivityTimer.ts`) prende il controllo tra le famiglie.

## Self check-in (B1App)

I membri controllano dal portale b1.church alla schermata `/mobile/checkin` (instradato da `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` a `screens/CheckinPage.tsx`). Richiede un utente connesso e cammina gli stessi quattro passaggi del chiosco — servizi → nucleo → gruppi → completa — contro gli endpoint identici, con stato mantenuto in `B1App/src/helpers/CheckinHelper.ts`. Le differenze dal chiosco: il nucleo proviene dal `householdId` dell'utente connesso (nessun passo di ricerca), e il flusso termina in una schermata di conferma — nessuna visualizzazione del codice di sicurezza e nessuna stampa di etichette. Tipi e `ApiHelper`/`ArrayHelper` provengono da `@churchapps/helpers` e `@churchapps/apphelper`; nessun componente React è condiviso con B1Admin.

## Frequenza lato amministrazione (B1Admin)

- **Setup** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) renderizza l'albero di struttura e crea servizi (`ServiceEdit.tsx`) e orari di servizio (`ServiceTimeEdit.tsx`). I dati del campus provengono dall'appartenenza tramite il gancio `useCampuses()`.
- **Frequenza manuale** si trova dal lato dei Gruppi, non la sezione di presenza: `B1Admin/src/groups/components/GroupSessionsTab.tsx` crea sessioni (`POST /attendance/sessions`) e contrassegna le persone presenti tramite `POST /attendance/visitsessions/log`, che trova-o-crea la visita per quella persona e sessione. I leader del gruppo possono registrare la frequenza per i loro gruppi senza il permesso `attendance.edit` — i controller verificano `au.leaderGroupIds`.
- **Report** — tendenza di frequenza e frequenza di gruppo sono report definiti dal server (`B1Admin/src/components/reporting/ReportWithFilter.tsx` contro ReportingApi); la cronologia per persona è `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Stampa di etichette

### Modelli e il designer

Le chiese progettano le loro stesse etichette in B1Admin a `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, raggiunto dalla pagina impostazioni Check-In). Un modello è una riga `labelTemplates` il cui `content` è un array JSON di blocchi — `text`, `field`, `barcode`, `qrcode`, o `box` — ognuno posizionato in coordinate di percentuale con carattere, allineamento, simbologia (`code39`/`code128`/`qr`), e condizioni di visibilità facoltative (ad es. renderizza il riquadro allergia solo quando `person.nametagNotes` non è vuoto). Due `labelType` esistono: `nametag` (uno per persona controllata; campi come `person.displayName`, `sessions`, `securityCode`) e `pickup` (uno per famiglia; campi come `children`, `childrenAllergies`). Il server applica un singolo default per tipo per chiesa (`LabelTemplateController.save`). Il designer spedisce modelli di partenza che rispecchiano le etichette bundle del chiosco e l'anteprima contro dati di esempio.

### Rendering e stampa sul chiosco

Al completamento del check-in, `B1Checkin/src/helpers/LabelHelper.ts` decide cosa stampare dai flag del gruppo su ogni visita in sospeso: nametag per i gruppi `printNametag`, più un'etichetta di pickup familiare se qualche visita ha colpito un gruppo `parentPickup`. Il codice di sicurezza dalla risposta di check-in va su nametag di bambini e l'etichetta di pickup; i nametag degli adulti stampano senza un codice. Se la chiesa ha modelli, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) trasforma i blocchi + un contesto di campo in un documento HTML autonomo; altrimenti le etichette HTML bundle in `B1Checkin/assets/labels/` vengono utilizzate con sostituzione di placeholder.

I codici a barre vengono generati come SVG inline da codificatori pure-TypeScript in `B1Checkin/src/helpers/barcode.ts` — tabelle di pattern Code 39 e Code 128 (code set B con checksum mod-103), più QR tramite il pacchetto `qrcode`. **Questi codificatori sono intenzionalmente duplicati in B1Admin** (`LabelEditor.tsx` inline le stesse tabelle, notato in un commento di codice) così le anteprime del designer sono fedeli ai pixel di output del chiosco; un cambiamento a uno deve essere rispecchiato nell'altro.

La pipeline di stampa (`src/components/PrintUI.tsx`) renderizza ogni etichetta HTML in una `WebView`, la cattura a JPG tramite `react-native-view-shot`, e passa gli URI dell'immagine al modulo **printer-helper** Expo nativo (`B1Checkin/modules/printer-helper/`). Il modulo espone `scan()`, `checkInit()`, `printUris()`, e eventi di stato, con un provider per marca su entrambe le piattaforme:

| Marca | Android | iOS | Note |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Stampanti di rete serie QL (QL-800/810W/820NWB/1100/1110NWB…), etichette die-cut 29×90, il default consigliato |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Scoperta di rete + stampa immagini TCP/ZPL |

La selezione della stampante vive a `app/printers.tsx` (la scansione di rete ritorna voci `brand~model~ip`; la scelta persiste ad AsyncStorage), e `src/helpers/PrinterLog.ts` tiene un registro diagnostico on-device affiorato attraverso un punto di stato in tempo reale nell'intestazione del chiosco.

## Registrazione ospite

Due percorsi creano una persona a metà check-in:

- **Al chiosco** — l'apertura dello schermo del nucleo "Aggiungi ospite" apre `B1Checkin/app/addGuest.tsx`, che prima ricerca `GET /membership/people/search?term=` per una corrispondenza non-membro esistente e altrimenti ne crea una con `POST /membership/people`, allegata al nucleo attuale. L'ospite poi scorre attraverso l'assegnazione di gruppo come qualsiasi membro.
- **Self-serve tramite QR** — quando l'impostazione della chiesa `enableQRGuestRegistration` è accesa (configurato nelle impostazioni di Check-In di B1Admin, letto da `GET /membership/settings/public/{churchId}`), la schermata di lookup del chiosco mostra un codice QR che si collega a `https://{subdomain}.b1.church/guest-register?serviceId=`. Quella pagina B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) permette a una famiglia visitante di registrarsi da sola sul loro telefono tramite l'endpoint anonimo `POST /membership/people/guest-register`, mantenendo la linea di chiosco in movimento.

## Pagine correlate

- [Endpoint di presenza](../api/endpoints/attendance) -- Superficie REST completa per campus, servizi, sessioni, visite, e sessioni di visita
- [Endpoint di appartenenza](../api/endpoints/membership) -- Persone, nuclei, e gruppi
- [Webhook](../api/webhooks) -- Gli eventi `session.created`, `attendance.recorded`, e `attendance.checkout`
- [Struttura del modulo](../api/module-structure) -- Come il modulo di presenza è organizzato lato server
