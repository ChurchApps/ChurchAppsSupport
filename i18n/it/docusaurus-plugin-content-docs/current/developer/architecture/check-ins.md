---
title: "Check-in"
---

# Check-in

<div class="article-intro">

Il check-in è un unico sistema con tre porte d'ingresso: l'app chiosco B1Checkin per stazioni presidiate e self-service, il self check-in all'interno del portale membri B1App, e la gestione presenze lato admin in B1Admin. Tutti e tre scrivono nello stesso modulo di presenze nell'Api centrale, e l'instradamento delle classi è guidato interamente dai Gruppi — non esiste un'entità separata "locazioni" o "stanze". Uno strato di sicurezza per i bambini si trova al di sopra: tipi di check-in per visita, limiti server-side di capacità e rapporto volontari, idoneità di età/grado lato chiosco, verifica del ritiro autorizzato al check-out, e avvisi ai genitori tramite il provider di messaggistica della chiesa. Questa pagina mappa il modello dati, i flussi di check-in, lo strato di sicurezza, e la pipeline di stampa delle etichette.

</div>

## Panoramica

```
┌──────────────────────────┐
│ B1Checkin (chiosco Expo) │──┐         ┌──────────────────────────────────────────────┐
│  ricerca → nucleo →      │  │         │ Api                                          │
│  gruppi → completa/stampa│  │  HTTPS  │  ┌─ modulo membership ────────────────────┐ │
├──────────────────────────┤  ├───────▶ │  │ people · households · groups            │ │
│ B1App (self check-in)    │──┤         │  └─────────────────────────────────────────┘ │
│  schermata /mobile/checkin│  │        │  ┌─ modulo attendance ─────────────────────┐ │
├──────────────────────────┤  │         │  │ campuses → services → serviceTimes      │ │
│ B1Admin (staff)          │──┘         │  │ groupServiceTimes  (instradamento stanze)│ │
│  setup · report ·        │            │  │ sessions ← visitSessions → visits       │ │
│  designer etichette      │            │  │ labelTemplates                          │ │
└──────────────────────────┘            │  └─────────────────────────────────────────┘ │
                                        └──────────────────────────────────────────────┘

Percorso di stampa etichette (solo chiosco):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (modelli etichetta, o fallback HTML integrato)
       └▶ LabelRenderer → documento HTML + codici a barre SVG inline
            └▶ PrintUI: rendering WebView → cattura JPG con ViewShot
                 └▶ modulo nativo printer-helper → Brother QL / Zebra
```

| Superficie | Repo | Stack | Ruolo |
|---------|------|-------|------|
| Chiosco | `B1Checkin` | Expo / React Native, routing a file expo-router; build EAS per Android, Amazon Fire, e iOS; aggiornamenti OTA via `expo-updates` | Stazione presidiata o self-service con stampa di etichette e check-out verificato |
| Self check-in | `B1App` | Next.js (portale membri b1.church) | I membri connessi fanno il check-in del proprio nucleo da un telefono; nessuna stampa |
| Admin | `B1Admin` | SPA React | Configura la struttura del servizio, assegna i gruppi agli orari di servizio, progetta le etichette, registra le presenze manualmente, esegue i report |

Tutti e tre chiamano gli stessi due moduli API tramite `ApiHelper`: **MembershipApi** (`/membership`) per persone, nuclei familiari e gruppi; **AttendanceApi** (`/attendance`) per tutto il resto.

## Modello dati (`Api/src/modules/attendance`)

| Entità / tabella | Campi chiave | Significato |
|----------------|-----------|---------|
| `campuses` | name, address | Deprecato qui — i campus sono gestiti nel modulo membership (`/membership/campuses`); la copia in attendance è congelata in sola lettura per i lettori legacy (`models/Campus.ts`) |
| `services` | campusId, name | Una riunione ricorrente, ad es. "Domenica mattina" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name | Una fascia oraria all'interno di un servizio, ad es. "9:00" (`models/ServiceTime.ts`) |
| `groupServiceTimes` | groupId, serviceTimeId | Tabella di join: quali gruppi (aule) si riuniscono a quali orari di servizio (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Un incontro di un gruppo in una data — creato in modo lazy al momento del check-in (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Una persona che partecipa in una data (`models/Visit.ts`). `checkinType` è `member` / `guest` / `volunteer` (NULL = member legacy), impostato dal chiosco e consumato dai limiti di capacità/rapporto |
| `visitSessions` | visitId, sessionId | Quale/i sessione/i copre una visita — un bambino registrato in due orari di servizio riceve due righe (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (blocchi JSON) | Layout di etichette progettabili (`models/LabelTemplate.ts`) |

### Come viene persistito un check-in completato

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) gestisce `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Il corpo è un array di oggetti `Visit`, ciascuno con `visitSessions` il cui `session` incorporato nomina solo una coppia `(serviceTimeId, groupId)`. Il server quindi:

1. **Controlla capacità e rapporti prima di qualsiasi scrittura.** `evaluateGates()` → `CheckinGateHelper.evaluate()` verifica la capacità di ogni stanza target, la capacità ospiti, il flag di chiusura, e il rapporto volontari rispetto all'occupazione attuale. postCheckin **non è transazionale**, quindi il controllo deve essere eseguito prima del primo salvataggio — una violazione dura restituisce un 409 che nomina la/le stanza/e in violazione e nulla viene persistito. Vedi [Limiti di capacità e rapporto volontari](#limiti-di-capacità-e-rapporto-volontari).
2. **Risolve le sessioni in modo lazy.** `getSessionId()` trova o crea la riga `sessions` per `(groupId, serviceTimeId, oggi)` — gli id di sessione vengono messi in cache in-processo per data. Le nuove sessioni emettono un webhook `session.created`. Il ciclo è un `for..of` atteso — un precedente `forEach(async …)` fire-and-forget correva in gara col salvataggio e scriveva sessionId NULL alla creazione della prima sessione (risolto; annotato in un commento nel codice del ciclo).
3. **Sostituisce i record del giorno.** Qualsiasi visita esistente per quelle persone a quel servizio oggi viene eliminata insieme alle relative visitSessions, poi il set inviato viene salvato. Rifare il check-in di una famiglia è quindi un'operazione idempotente "questo è lo stato attuale", non un'aggiunta. Passare `?checkDuplicates=true` restituisce invece `{ duplicates: [personId…] }` senza scrivere, che è il modo in cui il chiosco avvisa prima di sovrascrivere.
4. **Genera un codice di sicurezza per batch.** `SecurityCodeHelper.generate()` produce un codice di 4 caratteri dall'alfabeto `23456789BCDFGHJKLMNPQRSTVWXYZ` (senza vocali o caratteri ambigui, così i codici non possono formare parole o essere fraintesi). Il server riprova in caso di collisione contro le visite aperte della stessa chiesa nello stesso giorno e timbra il codice su ogni visita del batch.
5. **Restituisce `{ streaks, securityCode }`.** `streaks` associa personId al conteggio di presenze settimanali consecutive; il chiosco celebra i traguardi (ogni 5a settimana) con coriandoli.

Ogni visita salvata emette anche un webhook `attendance.recorded`. Il lato di lettura, `GET /attendance/visits/checkin`, restituisce le visite delle persone dalla loro **ultima data registrata** — se era la settimana precedente gli id vengono rimossi, così il client riceve una copia pre-compilata delle selezioni di stanza della settimana scorsa che verrà salvata come nuovi record.

### Check-out

Due endpoint completano il ciclo (`VisitController`):

- `GET /attendance/visits/code/:code` — le visite di oggi non ancora effettuate il check-out che portano quel codice di sicurezza, con le sessioni popolate.
- `POST /attendance/visits/checkout` — corpo `{ visitIds, checkedOutBy?, checkedOutById? }`; timbra `checkoutTime` e chi ha ritirato, ed emette un webhook `attendance.checkout` per visita.

Permessi: i chioschi si autenticano con `attendance.checkin`, che concede esattamente la superficie check-in/check-out/modello-etichetta; `attendance.view`/`attendance.edit` coprono il reporting e l'inserimento manuale; la struttura (servizi, orari di servizio, assegnazioni di gruppo) richiede `services.edit`.

## I gruppi guidano l'instradamento delle stanze

Non esiste alcuna entità stanza o aula nel sistema. Una "stanza" è un **gruppo** di membership con `trackAttendance` abilitato, collegato a uno o più orari di servizio tramite `groupServiceTimes`. I campi del gruppo (su `Api/src/modules/membership/models/Group.ts`) che modellano il comportamento del chiosco:

| Campo | Effetto |
|------|--------|
| `trackAttendance` | Il gruppo partecipa affatto alle presenze; l'albero di setup di B1Admin contrassegna i gruppi con `trackAttendance` privi di una riga `groupServiceTimes` come non assegnati |
| `parentPickup` | Contrassegna una stanza per bambini: fare il check-in su di essa rende la visita una visita "bambino", che stampa un'etichetta di ritiro familiare e mette il codice di sicurezza sul nametag |
| `printNametag` | Se i check-in a questo gruppo stampano affatto un nametag |
| `capacity` / `guestCapacity` / `checkinClosed` | Limiti di capacità della stanza e un interruttore "chiuso" rigido, applicato server-side dal controllo di check-in (modificato nelle impostazioni del gruppo di B1Admin sotto "Capacità Check-In") |
| `volunteerRatio` / `minVolunteers` | Rapporto bambini-per-volontario e numero minimo di volontari, applicato secondo l'impostazione `ratioEnforcement` a livello di chiesa |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Limiti di idoneità per età/grado valutati lato chiosco per evidenziare o attenuare le stanze |

Ogni client denormalizza allo stesso modo (ad es. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): carica `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes`, e `GET /membership/groups` in parallelo, poi per ogni orario di servizio raccoglie i gruppi la cui riga `groupServiceTimes` punta ad esso in `serviceTime.groups`. Questo array è ciò che mostra il selettore di stanze, organizzato per `categoryName` del gruppo.

Le assegnazioni vengono modificate dalla pagina del gruppo in B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), e l'intero albero Campus → Servizio → Orario servizio → Gruppo è visualizzato in `B1Admin/src/attendance/components/AttendanceSetup.tsx` tramite `GET /attendance/attendancerecords/tree`.

:::info
Poiché i gruppi sono l'unica fonte di verità, la stessa appartenenza a un gruppo alimenta l'instradamento del chiosco, le presenze in stile roster nelle pagine gruppo di B1Admin, e il reporting delle presenze — assegnare un gruppo a un orario di servizio è l'unico passo necessario per renderlo una destinazione di check-in.
:::

## Sicurezza dei bambini

### Tipi di check-in

Ogni visita porta un `checkinType` — `member`, `guest`, o `volunteer` (NULL significa legacy/member; migrazione `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Il tipo viene scelto **lato chiosco**: chip Member / Guest / Volunteer sulla riga del membro espansa (`B1Checkin/src/components/MemberServiceTimes.tsx`), timbrato su ogni visita in sospeso al completamento (`app/checkinComplete.tsx`, con default `member`). Il server lo consuma nel controllo — i volontari contano ai fini della copertura del rapporto invece che contro la capacità, e gli ospiti contano contro `guestCapacity`.

### Limiti di capacità e rapporto volontari

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) viene eseguito dentro `postCheckin` prima di qualsiasi salvataggio (l'endpoint non è transazionale, quindi il controllo-prima-del-salvataggio è il meccanismo di correttezza). Carica l'occupazione attuale per gruppo target (`VisitRepo.countActiveByGroupToday`) e la configurazione del gruppo tramite il gateway del modulo membership, poi classifica le violazioni:

- **Rigido (blocca sempre):** `checkinClosed`, `current + incoming > capacity`, conteggio ospiti oltre `guestCapacity`. Il batch viene rifiutato con `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` — il chiosco mostra la stanza nominata.
- **Rapporto (avviso o blocco):** persone non-volontarie in ingresso in una stanza dove `volunteers < minVolunteers`, nessun volontario affatto, o `children > volunteers × volunteerRatio`. La gravità segue l'impostazione a livello di chiesa `ratioEnforcement` (default `"warn"` / `"block"`, modificata in B1Admin Manage Church → Check-In, `CheckinSettingsEdit.tsx`). La modalità avviso restituisce `409 { warning: true, error: "ratio", … }` a meno che il client non reinvii con `acknowledgeWarnings=true` — quel reinvio è l'override di conferma dello staff del chiosco.

### Idoneità per età/grado (lato chiosco)

L'idoneità della stanza è UI consultiva, valutata sul chiosco, non applicata dal server. `B1Checkin/src/helpers/EligibilityHelper.ts` confronta la data di nascita/grado di una persona con `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` del gruppo (ordine di grado: PreK, K, 1–12, Diplomato) e restituisce `eligible` / `ineligible` / `unknown` — i dati mancanti producono `unknown` e non nascondono mai una stanza. Le età e i gradi vengono calcolati a partire dalla **data di promozione di grado** della chiesa (impostazione `gradePromotionDate`, `"MM-DD"`, modificata in `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); il chiosco la recupera da `GET /attendance/checkin/settings`, e `resolveAsOfDate` sceglie l'occorrenza più recente il o prima di oggi. Il selettore di stanze evidenzia le stanze idonee e attenua quelle non idonee; scegliere una stanza attenuata richiede una conferma dello staff.

### Ritiro autorizzato e non autorizzato

Le persone autorizzate al ritiro sono un'entità di membership, per nucleo familiare: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, personId opzionale, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). Il CRUD è `GET /membership/householdpickup/:householdId` (qualsiasi utente autenticato della chiesa, così i chioschi possono leggerlo) più `POST` / `DELETE` protetti da `people.edit`. Lo staff gestisce l'elenco nella scheda **Pickup** della pagina della persona (`B1Admin/src/people/components/PickupPeople.tsx`) — foto, relazione, e un chip di stato Trusted/Not Authorized.

Al check-out (`B1Checkin/app/checkout.tsx`) il chiosco carica l'elenco di ritiro del nucleo: le voci `trusted` vengono renderizzate come schede di ritiro toccabili accanto alla griglia di foto degli adulti del nucleo, e un nome libero "Altro" viene confrontato in modo fuzzy (Levenshtein, `src/helpers/PickupMatchHelper.ts`) contro le voci `notAuthorized` — una corrispondenza blocca il check-out con un foglio di avviso e un pulsante **Override** dello staff. L'override viene registrato sulla visita stessa: invia `checkedOutBy` come `"OVERRIDE: {name}"` attraverso il normale `POST /attendance/visits/checkout`, così finisce nel record delle presenze e nel webhook `attendance.checkout` piuttosto che in una tabella di audit separata.

### Avviso ai genitori e trasmissione di emergenza

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) espone due endpoint SMS:

- `POST /page` — `{ visitId, message }`: avvisa i tutori di un bambino registrato (schermata di check-out del chiosco, modalità presidiata).
- `POST /broadcast` — `{ serviceId, message }`: invia SMS a tutti gli adulti dei nuclei registrati per un servizio (impostazioni admin del chiosco, dietro un foglio di conferma con digitazione `EMERGENCY` in `B1Checkin/app/adminSettings.tsx`).

Entrambi risolvono gli adulti del nucleo tramite il gateway di membership, poi affidano la consegna a **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — la porta cross-modulo verso il provider di messaggistica configurato della chiesa (`@churchapps/texting`: TextInChurch, Clearstream, o MutualMinistry; non esiste un mittente SMS integrato). Il gateway registra una riga `sentText` più voci `deliveryLog` per destinatario e limita un batch a 500 destinatari; senza un provider configurato restituisce `no_provider`, che il chiosco mostra come "Nessun provider SMS configurato". Il `dispatch()` del controller deduplica i numeri di telefono e salta le persone senza cellulare o con `optedOut` impostato, restituendo `{ sent, failed, skippedOptedOut, skippedNoPhone }` così il chiosco può mostrare cosa è stato saltato.

## Il chiosco (B1Checkin)

Le schermate sono file expo-router sotto `B1Checkin/app/`; lo stato tra schermate vive in una classe statica `CachedData` (`src/helpers/CachedData.ts`), non nello stato React.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             carica orari di servizio,   │             │  └─────────┘ └▶ addGuest  └▶ stampa etichette,
             gruppi, groupServiceTimes,  │             └▶ checkout (presidiata)         auto-ritorno
             labelTemplates              │                                              a lookup
```

1. **Ricerca** (`app/lookup.tsx`) — ricerca per telefono (`GET /membership/people/search/phone?number=`, ultime 4 cifre o intero) o per nome (`GET /membership/people/search?term=`). Selezionare una corrispondenza carica il nucleo (`GET /membership/people/household/{householdId}`) e le visite esistenti (`GET /attendance/visits/checkin`), pre-popolando `pendingVisits` con le selezioni della settimana scorsa.
2. **Revisione del nucleo** (`app/household.tsx`, `src/components/MemberList.tsx`) — ogni riga membro mostra un badge già-registrato, un badge allergie/`nametagNotes`, e i loro chip di stanza attuali. Espandere un membro elenca ogni orario di servizio con un pulsante stanza più i chip di tipo check-in Member / Guest / Volunteer (`MemberServiceTimes.tsx`).
3. **Assegnazione gruppo** (`app/selectGroup.tsx`) — un albero di categorie costruito da `serviceTime.groups`, con le stanze idonee per età/grado evidenziate e quelle non idonee attenuate dietro una conferma dello staff (vedi [Idoneità per età/grado](#idoneità-per-etàgrado-lato-chiosco)); scegliere una stanza scrive una visitSession `{ session: { serviceTimeId, groupId } }` nella visita in sospeso di quella persona (`src/helpers/VisitSessionHelper.ts`). "Nessuna" la cancella.
4. **Completa** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` con `pendingVisits` (ciascuna timbrata con il proprio `checkinType`), poi stampa le etichette se è configurata una stampante e ritorna automaticamente alla ricerca. Una risposta `409` di capacità mostra la stanza piena/chiusa nominata; un avviso di rapporto offre una conferma dello staff che reinvia con `acknowledgeWarnings=true`.

La schermata di **check-out** (`app/checkout.tsx`) accetta il codice di sicurezza a 4 caratteri tramite un campo con focus automatico — così gli scanner di codici a barre USB/Bluetooth in modalità keyboard-wedge funzionano senza fotocamera — o un tastierino a schermo che usa lo stesso alfabeto, inviando automaticamente a 4 caratteri. Cerca il codice, mostra i bambini in fase di ritiro, e presenta le **persone autorizzate al ritiro** del nucleo come schede toccabili accanto a una griglia di foto degli adulti del nucleo (più un'opzione di testo libero "Altro" verificata in modo fuzzy contro i nomi non autorizzati — vedi [Ritiro autorizzato e non autorizzato](#ritiro-autorizzato-e-non-autorizzato)), poi invia `POST /attendance/visits/checkout` con il nome/id di chi ritira. In modalità presidiata la schermata offre anche **Avvisa un genitore** (`POST /attendance/checkin/page`) e una **ristampa dell'etichetta di sicurezza** — `reprint()` ricostruisce le etichette della famiglia con `LabelHelper.getAllLabelsFor(...)` e le fa passare attraverso la stessa pipeline `PrintUI` del check-in.

La personalità della stazione è un flag AsyncStorage `@StationMode` (`"self"` | `"manned"`, commutato in `app/adminSettings.tsx`). La modalità presidiata aggiunge il punto di ingresso al check-out nella schermata di ricerca e la modifica del profilo per membro (`POST /membership/people`) dalla schermata del nucleo. L'irrobustimento del chiosco è integrato: un PIN opzionale (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) protegge le schermate di amministrazione e stampante, la schermata admin si apre solo tramite 7 tocchi rapidi sul logo dell'intestazione, e una schermata attract per inattività (`src/hooks/useInactivityTimer.ts`) subentra tra una famiglia e l'altra.

## Self check-in (B1App)

I membri fanno il check-in dal portale b1.church nella schermata `/mobile/checkin` (instradata da `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` a `screens/CheckinPage.tsx`). Richiede un utente connesso e percorre gli stessi quattro passaggi del chiosco — servizi → nucleo → gruppi → completa — contro gli endpoint identici, con lo stato mantenuto in `B1App/src/helpers/CheckinHelper.ts`. Le differenze rispetto al chiosco: il nucleo proviene dallo `householdId` dell'utente connesso (nessun passaggio di ricerca), e non c'è stampa di etichette — invece la schermata di completamento mostra il codice di sicurezza del batch come QR (`qrcode.react`) con un suggerimento "mostralo a una stazione di check-in". Se il nucleo ha già effettuato il check-in quando la pagina si carica, un pulsante "Mostra codice check-in" ri-mostra il QR dal `securityCode` della visita esistente. Il check-in viene registrato immediatamente al momento dell'invio (non c'è uno stato in sospeso); il QR serve solo a guidare la stampa delle etichette al chiosco.

**Stampa di etichette da telefono a chiosco** (`B1Checkin/app/scan.tsx`, raggiungibile dal pulsante "Scan code" nella schermata di ricerca): il chiosco apre una `CameraView` di `expo-camera` (frontale per default, capovolgibile) che scansiona codici QR. Un payload scansionato viene accettato quando è un codice nudo di 4 caratteri nell'alfabeto dei codici di sicurezza, così funzionano sia il QR di B1App sia il blocco QR di un'etichetta stampata. La schermata segue poi il percorso di ristampa del check-out — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — e ritorna alla ricerca. Nessuna scrittura di presenza avviene al momento della scansione; solo etichette. Codici senza visite attive, stazioni senza stampante, e gruppi senza etichetta mostrano ciascuno un toast e ritornano alla ricerca.

I tipi e `ApiHelper`/`ArrayHelper` provengono da `@churchapps/helpers` e `@churchapps/apphelper`; nessun componente React è condiviso con B1Admin.

## Presenze lato admin (B1Admin)

- **Setup** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) renderizza l'albero della struttura e crea servizi (`ServiceEdit.tsx`) e orari di servizio (`ServiceTimeEdit.tsx`). I dati del campus provengono da membership tramite l'hook `useCampuses()`.
- **Le presenze manuali** si trovano lato Gruppi, non nella sezione presenze: `B1Admin/src/groups/components/GroupSessionsTab.tsx` crea sessioni (`POST /attendance/sessions`) e contrassegna le persone presenti tramite `POST /attendance/visitsessions/log`, che trova-o-crea la visita per quella persona e sessione. I leader di gruppo possono registrare le presenze per i propri gruppi senza il permesso `attendance.edit` — i controller verificano `au.leaderGroupIds`.
- **Reporting** — la tendenza delle presenze e le presenze di gruppo sono report definiti dal server (`B1Admin/src/components/reporting/ReportWithFilter.tsx` contro ReportingApi); la cronologia per persona è `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Stampa delle etichette

### Modelli e il designer

Le chiese progettano le proprie etichette in B1Admin su `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, raggiungibile dalla pagina impostazioni Check-In). Un modello è una riga `labelTemplates` il cui `content` è un array JSON di blocchi — `text`, `field`, `barcode`, `qrcode`, o `box` — ciascuno posizionato in coordinate percentuali con font, allineamento, simbologia (`code39`/`code128`/`qr`), e condizioni di visibilità opzionali (ad es. renderizza il riquadro allergie solo quando `person.nametagNotes` non è vuoto). Esistono due `labelType`: `nametag` (uno per persona registrata; campi come `person.displayName`, `sessions`, `securityCode`) e `pickup` (uno per famiglia; campi come `children`, `childrenAllergies`). Il server applica un unico default per tipo per chiesa (`LabelTemplateController.save`). Il designer fornisce modelli di partenza che rispecchiano le etichette integrate del chiosco e mostra un'anteprima su dati di esempio.

### Rendering e stampa sul chiosco

Al completamento del check-in, `B1Checkin/src/helpers/LabelHelper.ts` decide cosa stampare in base ai flag del gruppo su ogni visita in sospeso: nametag per i gruppi `printNametag`, più un'etichetta di ritiro familiare se qualche visita ha colpito un gruppo `parentPickup`. Il codice di sicurezza dalla risposta di check-in va sui nametag dei bambini e sull'etichetta di ritiro; i nametag degli adulti vengono stampati senza codice. Se la chiesa ha dei modelli, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) trasforma i blocchi + un contesto di campo in un documento HTML autonomo; altrimenti vengono usate le etichette HTML integrate in `B1Checkin/assets/labels/` con sostituzione di segnaposto.

I codici a barre vengono generati come SVG inline da encoder in puro TypeScript in `B1Checkin/src/helpers/barcode.ts` — tabelle di pattern Code 39 e Code 128 (code set B con checksum mod-103), più QR tramite il pacchetto `qrcode`. **Questi encoder sono intenzionalmente duplicati in B1Admin** (`LabelEditor.tsx` incorpora le stesse tabelle, annotato in un commento nel codice) così le anteprime del designer sono fedeli al pixel rispetto all'output del chiosco; una modifica all'uno deve essere rispecchiata nell'altro.

La pipeline di stampa (`src/components/PrintUI.tsx`) renderizza ogni etichetta HTML in una `WebView`, la cattura in JPG tramite `react-native-view-shot`, e passa gli URI immagine al modulo Expo nativo **printer-helper** (`B1Checkin/modules/printer-helper/`). Il modulo espone `scan()`, `checkInit()`, `printUris()`, ed eventi di stato, con un provider per marca su entrambe le piattaforme:

| Marca | Android | iOS | Note |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Stampanti di rete serie QL (QL-800/810W/820NWB/1100/1110NWB…), etichette die-cut 29×90, il default consigliato |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Scoperta di rete + stampa immagini TCP/ZPL |

La selezione della stampante vive in `app/printers.tsx` (la scansione di rete restituisce voci `brand~model~ip`; la scelta persiste in AsyncStorage), e `src/helpers/PrinterLog.ts` mantiene un registro diagnostico on-device mostrato tramite un punto di stato live nell'intestazione del chiosco.

## Registrazione ospiti

Due percorsi creano una persona a metà check-in:

- **Al chiosco** — "Aggiungi ospite" nella schermata del nucleo apre `B1Checkin/app/addGuest.tsx`, che prima cerca in `GET /membership/people/search?term=` una corrispondenza non-membro esistente e altrimenti ne crea una con `POST /membership/people`, collegandola al nucleo attuale. L'ospite scorre poi attraverso l'assegnazione al gruppo come qualsiasi membro.
- **Self-service via QR** — quando l'impostazione della chiesa `enableQRGuestRegistration` è attiva (configurata nelle impostazioni Check-In di B1Admin, letta da `GET /membership/settings/public/{churchId}`), la schermata di ricerca del chiosco mostra un codice QR che collega a `https://{subdomain}.b1.church/guest-register?serviceId=`. Quella pagina di B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) permette a una famiglia in visita di registrarsi da sola sul proprio telefono tramite l'endpoint anonimo `POST /membership/people/guest-register`, mantenendo la fila del chiosco in movimento.

## Pagine correlate

- [Endpoint di attendance](../api/endpoints/attendance) -- Superficie REST completa per campus, servizi, sessioni, visite, e sessioni di visita
- [Endpoint di membership](../api/endpoints/membership) -- Persone, nuclei familiari, e gruppi
- [Webhook](../api/webhooks) -- Gli eventi `session.created`, `attendance.recorded`, e `attendance.checkout`
- [Struttura del modulo](../api/module-structure) -- Come è organizzato lato server il modulo attendance
