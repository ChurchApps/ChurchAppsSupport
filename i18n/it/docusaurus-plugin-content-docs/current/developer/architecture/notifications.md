---
title: "Architettura di notifiche e promemoria"
---

# Architettura di notifiche e promemoria {#notifications--reminders-architecture}

<div class="article-intro">

Ogni messaggio che un membro della chiesa vede al di fuori della pagina che sta guardando — un contatore nel badge, una notifica push, un'email di riepilogo — passa per una di due porte in MessagingApi. Questa pagina descrive l'imbuto, il motore dei promemoria che lo alimenta secondo una pianificazione e il modello delle preferenze che decide cosa raggiunge effettivamente una persona.

</div>

## Panoramica — due porte {#overview--two-doors}

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Qualsiasi cosa che comunichi qualcosa a una persona** passa per `NotificationHelper.createNotifications()` nel modulo messaging. Salva una riga in `notifications` ed effettua l'escalation socket → push → email, valutando `PreferenceGateHelper` per ogni canale — incluso `in_app` al livello 0.
2. **Qualsiasi cosa pianificata** è una `reminderDefinition` (a livello di entità o di ambito) espansa in `reminderOccurrences` e inviata da `ReminderEngine.scan()` su un timer ricorrente. Un espansore, un dispatcher, un unico registro degli invii (`reminderSentLog`).
3. **L'email diretta** esiste solo dietro `TransactionalEmailHelper.sendTransactional()`. Una regola ESLint lo impone in fase di compilazione — vedi sotto.

:::tip La porta email è imposta dal linter, non solo per convenzione
`Api/tools/eslint-rules/email-door.cjs` definisce `no-direct-email-helper`: qualsiasi chiamata a `EmailHelper.sendTemplatedEmail()` o `EmailHelper.sendEmail()` al di fuori di `NotificationHelper.ts` o `TransactionalEmailHelper.ts` fa fallire il lint. Se devi inviare un'email, passa dall'imbuto (`createNotifications` con `emailImmediate`) o da `TransactionalEmailHelper.sendTransactional()` — non esiste una terza via che superi la CI.
:::

## L'imbuto delle notifiche {#the-notification-funnel}

`NotificationHelper.createNotifications()` è l'unico punto di ingresso per tutto ciò che non è pianificato né transazionale:

```typescript
createNotifications(
  peopleIds: string[],
  churchId: string,
  contentType: string,
  contentId: string,
  message: string,
  link?: string,
  triggeredByPersonId?: string,
  options?: {
    deliveryStartLevel?: number;      // 0 socket (default), 1 push, 2 email-only
    category?: string;                // preference axis; derived from contentType if omitted
    emailByPerson?: Record<string, { subject: string; html: string }>;
    emailImmediate?: boolean;         // send email now instead of waiting for the digest
  }
)
```

Per ogni destinatario salva una riga in `notifications` e chiama `attemptDeliveryWithEscalation`, che percorre la scala dei canali sotto. Una riga ancora non letta per la stessa coppia `(contentType, contentId)` impedisce di ricrearla — questa protezione dai duplicati viene saltata per gli invii `emailImmediate` (scadenze dei promemoria, "invia email a tutti" da parte dello staff, passaggi di workflow che gestiscono da soli la deduplicazione) e per i messaggi diretti, che inviano sempre un ping al socket.

`shared/helpers/NotificationService.ts` replica la stessa firma (`NotificationServiceOptions`) per i chiamanti al di fuori del modulo messaging ed è registrato presso il modulo messaging all'avvio.

## Catena di escalation dei canali {#channel-escalation-chain}

La consegna parte da un livello (0 per impostazione predefinita, oppure superiore per i promemoria o gli invii espliciti) e passa al canale successivo solo se il precedente non ha avuto successo. Ogni livello è filtrato da `PreferenceGateHelper` prima che venga tentato qualcosa.

| Livello | Canale | Comportamento |
|-------|---------|----------|
| 0 | **in_app / socket** | Il filtro `in_app` viene controllato per primo. Se la notifica è soppressa (silenziata), la riga viene salvata con `isNew=false` e la consegna si ferma del tutto — nessun ping al socket, nessun badge, nessuna ulteriore escalation. Altrimenti il server cerca le connessioni socket aperte per la stanza `alerts` della persona e invia un frame `notification` (o `privateMessage`). Per le notifiche ordinarie, una consegna riuscita via socket ferma la catena qui — il timer di 30 minuti ricontrolla gli elementi non letti e li escala in seguito. I messaggi diretti non si fermano mai al socket: una PWA installata può tenere aperto in background il socket di alerts, il che altrimenti sopprimerebbe la push a livello di sistema operativo. |
| 1 | **push** | Subordinato a `allowPush` / alla disattivazione per categoria / alle ore di silenzio. Invia sia ai token push di Expo sia alle sottoscrizioni Web Push trovate nelle righe `devices` della persona, deduplicando per endpoint ed eliminando i token obsoleti lungo il percorso. |
| 2 | **email** | Subordinato a `emailFrequency` e alla disattivazione per categoria. Gli invii immediati (`emailImmediate`) vengono generati subito e scrivono una riga `deliveryLogs`; altrimenti la notifica resta in sospeso per il riepilogo a lotti descritto sotto. |
| — | **sms** | Non è un livello della scala di escalation. L'unico produttore di SMS filtrato è il motore dei promemoria: quando i `channels` di una definizione includono `sms`, `ReminderEngine.sendSms()` invia un SMS a ogni destinatario **in aggiunta** alla notifica push/email (vedi [Promemoria via SMS](#text-reminders)). Gli SMS in blocco (`TextingController` / `@churchapps/texting`), l'invio **Text Volunteers** della panoramica del servizio (`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`) e l'azione del workflow **Send Text** (`StepActionHelper.sendText` → `sendPersonText`) inviano tutti SMS direttamente tramite il provider della chiesa, quindi le preferenze di notifica e le ore di silenzio non si applicano — viene rispettato solo il flag `optedOut` della persona. |

Le notifiche non lette ferme al socket o alla push vengono escalate dal timer di 30 minuti (`NotificationHelper.escalateDelivery`). L'invio email a lotti è gestito da `NotificationHelper.sendEmailNotifications(frequency)`, guidato dalla preferenza `emailFrequency` di ogni persona: `individual` gira sul timer di 30 minuti, `daily` gira sul timer notturno. (`weekly` è un valore di preferenza valido ma non ha ancora una esecuzione a lotti dedicata.)

## Motore dei promemoria {#reminder-engine}

I promemoria pianificati — promemoria di eventi, scadenze di attività, promemoria di assegnazione per il servizio/piani — passano tutti da un unico motore generalizzato invece che da logiche cron specifiche per funzionalità.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Definizioni** (`reminderDefinitions`) sono a livello di entità (`entityId` impostato — un evento, un'attività o un piano specifico) oppure a livello di ambito (`entityId` nullo, `scopeId` impostato — ad esempio ogni piano sotto un tipo di piano di servizio). Una definizione contiene un elenco CSV di offset in minuti (`offsets`, ad esempio `"1440,60"` per un giorno e un'ora prima), un orario locale di invio (`sendLocalTime`), un elenco CSV di canali (`channels` — includendo `email` si attiva un'email ricca immediata al momento dell'invio), una `recipientMode` e un messaggio personalizzato facoltativo.

**L'espansione** materializza le righe di invio per l'orizzonte futuro (una finestra scorrevole di più giorni). Viene eseguita sul timer notturno e in modo sincrono ogni volta che una definizione viene salvata, così un promemoria per un evento dell'ultimo minuto viene comunque inviato. Le definizioni di ambito si espandono tramite `loadScopeEntities` dell'adapter, producendo un insieme di occorrenze per ogni entità concreta; le occorrenze a livello di entità usano la chiave `definitionId:occurrenceISO:offset`, mentre quelle di ambito hanno uno spazio dei nomi basato sull'ID dell'entità, così non collidono mai. Inserire un'occorrenza **ripristina** una riga precedentemente annullata — annullare e poi riespandere è il modo standard per risincronizzare un promemoria dopo che l'entità sottostante è cambiata; le righe già `sent`, `failed` o `processing` non vengono toccate.

**L'invio** (`ReminderEngine.scan()`) gira sul timer di 30 minuti. Richiede le occorrenze scadute (un lease impedisce la doppia elaborazione), carica i destinatari tramite l'adapter dell'entità, esclude chiunque sia già registrato in `reminderSentLog` per quell'occorrenza e chiama `createNotifications` con `deliveryStartLevel: 1` (passa direttamente alla push) più `emailImmediate`/`emailByPerson` quando i canali della definizione includono l'email.

### Promemoria via SMS {#text-reminders}

Quando i `channels` di una definizione includono `sms`, `scan()` chiama `ReminderEngine.sendSms()` dopo la creazione delle notifiche push/email, per gli stessi destinatari appena selezionati. L'invio di SMS è opt-in per ogni membro:

- Ogni destinatario passa per `PreferenceGateHelper.evaluate(..., "sms", ...)`, quindi `allowSms` deve essere attivo (di default è disattivato ed è impostato dall'interruttore **Messaggi di testo** di B1App) e il canale `sms` della categoria non deve essere disattivato per sovrascrittura. `event_reminders`, `serving_schedule` e `tasks` elencano `sms` sia in `defaultChannels` sia in `allowedChannels`.
- Le persone senza `mobilePhone` o con `optedOut` impostato vengono soppresse. Se la chiesa non ha un provider di SMS, il resto del batch viene soppresso con motivo `no_provider`.
- Il corpo è costruito da `ReminderEngine.smsBody()`: `"<Nome chiesa>: <messaggio> Reply STOP to opt out."`, troncato a un singolo segmento di 160 caratteri.
- Ogni destinatario ottiene una propria riga `reminderSentLog` con `channel: "sms"` e stato `sent` / `suppressed` / `failed`, tenuta separata dalla riga push/email, così un SMS fallito non rinvia mai la push o l'email.

Gli editor mostrano **Text** solo quando `GET /messaging/texting/status` restituisce `{ enabled: true }` (il primo provider di SMS della chiesa è attivo).

**Opt-out con STOP.** `POST /messaging/texting/inbound/:churchId/:token` è un webhook anonimo che la chiesa incolla nel proprio provider (B1Admin mostra l'URL da `GET /messaging/texting/inboundUrl` nelle impostazioni dei messaggi di testo). Il token è un HMAC dell'ID della chiesa (`SmsOptOutHelper.token`). `SmsOptOutHelper.parse` accetta i campi di form in stile Twilio e il JSON in stile Clearstream/TextInChurch; se la risposta è esattamente una parola di stop del vettore (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), ogni persona non rimossa della chiesa il cui numero di cellulare corrisponde riceve `people.optedOut = true` e `allowSms = false`. Le altre risposte vengono confermate e ignorate.

Un bus di eventi interno reagisce alle modifiche delle entità senza attendere l'espansione notturna: gli eventi di contenuto (tramite il webhook dispatcher) e gli eventi di aggiornamento di piani/attività attivano una ri-espansione o un annullamento immediati per l'entità interessata, e un aggiornamento del piano ri-espande anche le definizioni di ambito legate al suo tipo di piano.

### Adapter {#adapters}

Il motore è indipendente dall'entità; ogni tipo di entità supportato si collega tramite un adapter (`helpers/adapters/`):

| Tipo di entità | Adapter | Note |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Destinatari limitati ai partecipanti iscritti o ai membri del gruppo, a seconda dell'evento e della `recipientMode`. |
| `plan` | `PlanReminderAdapter` | I destinatari sono le assegnazioni al piano con stato Accepted + Unconfirmed. `buildEmails` richiama `DoingModuleGateway.buildPlanReminderEmails`, che genera posizioni, note e un messaggio personalizzato tramite `doing/helpers/PlanReminderEmailHelper`, includendo i pulsanti Accetta/Rifiuta firmati da `ReminderTokenHelper` che inviano POST a un endpoint pubblico di risposta all'assegnazione. |
| `task` | `TaskReminderAdapter` | I destinatari sono l'assegnatario o gli assegnatari dell'attività. |

### Endpoint {#endpoints}

| Metodo | Percorso | Scopo |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Carica o salva la definizione del promemoria per una singola entità. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Carica o salva una definizione di promemoria a livello di ambito (ereditato). |
| `DELETE` | `/messaging/reminders/:defId` | Elimina una definizione e annulla le sue occorrenze in sospeso. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Anteprima del numero di destinatari e dei prossimi orari di invio per un promemoria di evento prima di salvarlo. |
| `GET` | `/messaging/reminders/log` | Storico recente delle occorrenze dei promemoria per una chiesa. |
| `POST` | `/messaging/reminders/mute` | Silenzia i promemoria per una specifica entità. |

Salvare una definizione attiva una ri-espansione sincrona per quell'entità o ambito, così gli editor vedono i "prossimi invii" aggiornati senza attendere il job notturno.

## Messaggi diretti {#direct-messages}

I messaggi diretti seguono lo stesso imbuto di tutto il resto invece di un percorso di escalation separato. Ogni conversazione non letta ottiene una **riga ombra** in `notifications` (`contentType='privateMessage'`, `contentId` = l'ID del messaggio privato, `category='direct_messages'`) che gestisce tutto lo stato di consegna — escalation socket/push/email, tracciamento della lettura, tutto. La tabella `privateMessages` conserva il contenuto del messaggio e una colonna `notifyPersonId`, che è la fonte del badge dei non letti e viene azzerata quando il destinatario legge la conversazione.

Le righe ombra sono invisibili alla campanella delle notifiche: vengono escluse dalla query del conteggio dei non letti, dalla query dell'elenco delle notifiche e dalle query di segna-come-letto/elimina, che filtrano tutte con `contentType <> 'privateMessage'`. Ogni ping di un DM raggiunge il socket indipendentemente dallo stato di lettura (semantica di chat dal vivo — nessuna deduplicazione), e i DM non si fermano mai alla consegna via socket come fanno le notifiche ordinarie, perché una PWA in background può tenere aperto un socket e comunque aver bisogno di una push a livello di sistema operativo. Se una persona silenzia le notifiche dei DM, la riga ombra viene parcheggiata (`isNew=false`, `notifyPersonId` azzerato) — resta visibile all'interno della conversazione stessa, ma senza badge né avvisi.

## Preferenze e filtri {#preferences--gating}

Ogni invio passa per `PreferenceGateHelper.evaluate()`, una funzione pura (tutto lo stato viene passato in ingresso, nessuna chiamata al database sul percorso critico) che restituisce `allow`, `suppress` o `defer`. I livelli vengono eseguiti in ordine, e il primo che decide vince:

1. **Categoria bloccata** — alcune categorie sono obbligatorie (livello 0) e aggirano tutti gli altri livelli.
2. **Silenziamento globale / disattivazione del canale** — `masterMute`, `allowPush`, `allowSms` (disattivato per impostazione predefinita — i membri scelgono di attivarlo) o `emailFrequency='never'` sopprimono direttamente.
3. **Ore di silenzio** — solo push e SMS (l'email è considerata non invadente). Se l'ora locale nel fuso orario della persona cade nella sua finestra di silenzio, una categoria transazionale passa comunque; una categoria non transazionale viene rinviata alla fine della finestra di silenzio, calcolata come istante UTC corretto rispetto all'ora legale tramite `TimezoneHelper.wallClockToUtc`.
4. **Sovrascrittura per preferenza di categoria** — una disattivazione esplicita per una coppia categoria × canale; l'assenza indica il valore predefinito della categoria.
5. **Silenziamento per entità** — un silenziamento registrato su una specifica entità (ad esempio un evento o un piano) restringe ulteriormente rispetto all'impostazione di categoria, ma si applica solo quando il chiamante fornisce un ID/tipo di entità insieme alla notifica.

Tabelle coinvolte: `notificationPreferences` (globali — `masterMute`, `emailFrequency` di `individual|daily|weekly|never`, `allowPush`, finestra e fuso orario delle ore di silenzio, `allowSms`), `notificationPreferenceOverrides` (per categoria × canale) e `notificationEntityMutes` (per entità).

Questo filtro è applicato per in-app (livello 0), push (livello 1) ed email (livello 2) all'interno dell'imbuto — comprese le email immediate di promemoria e riepilogo — e per i SMS di promemoria in `ReminderEngine.sendSms()`. L'email transazionale (codici di accesso, reimpostazioni della password, inviti, ricevute di donazione) aggira il filtro per progettazione; è questo il senso della seconda porta.

## Limiti delle email scritte dalla chiesa {#church-authored-email-limits}

Le email il cui contenuto è scritto da una chiesa partono dall'identità SES condivisa di ChurchApps, quindi vengono conteggiate per chiesa da `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Tre percorsi lo richiamano: invii di gruppi/modelli (`EmailTemplateController`, tipo di contenuto `email`), email di follow-up dei moduli (`FormSubmissionController`, `formFollowUp`) e azioni del workflow **Send email** (`NotificationHelper` con `churchAuthored`, `workflowEmail`). Le email di sistema (codici di accesso, ricevute, promemoria) e gli inviti a ruoli e gruppi (`UserController.sendInviteEmail`, un modello fisso) non vengono conteggiati.

- **Filtro di approvazione.** Una chiesa non invia nulla finché un amministratore del server non imposta `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → chip **Group Email**). Le chiese archiviate sono sempre bloccate. La finestra Send Email di B1Admin legge `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) e, se non approvata, mostra una scheda **Request review** al posto dell'editor. `POST /messaging/emailTemplates/requestApproval` invia un'email al supporto, al massimo una volta alla settimana per chiesa.
- **Quota guadagnata.** Una chiesa approvata riceve `max(150, 2 × il suo miglior giorno di email scritte dalla chiesa negli ultimi 30 giorni)`, con un tetto di 2.000 nelle ultime 24 ore mobili. Le ultime 24 ore correnti sono escluse dal calcolo del "miglior giorno", così un picco non può alzare da solo il proprio limite.
- **Prenota, poi regola.** `reserve()` scrive una riga `deliveryLogs` per destinatario prima dell'invio, ricontrolla la quota contando quelle righe e fa marcia indietro se due richieste hanno superato il limite insieme (l'invio restituisce 429). `settle()` contrassegna ogni riga come inviata o fallita.
- **Pausa per reclami.** La Lambda `sesFeedback` (`Api/src/lambda/ses-feedback-handler.ts`, alimentata da SES → SNS) associa ogni rimbalzo permanente o reclamo alla chiesa la cui email scritta dalla chiesa ha raggiunto quell'indirizzo in quel periodo, memorizzato come `deliveryMethod` `sesBounce` / `sesComplaint`. Una chiesa viene messa in pausa con 2 o più reclami (≥ 0,3% degli invii) oppure con 10 o più rimbalzi definitivi (≥ 5%) nell'arco di 7 giorni.

## Pianificazione {#scheduling}

Sia il motore dei promemoria sia il riepilogo delle notifiche si appoggiano ai timer pianificati già esistenti invece di introdurre nuova infrastruttura:

| Timer | Pianificazione | Esegue |
|-------|----------|------|
| Timer da 30 minuti | ogni 30 minuti | Escala le notifiche non lette; invia le email di riepilogo con frequenza `individual`; invia le occorrenze di promemoria scadute (`ReminderEngine.scan`); riepiloghi di approvazione; esecuzioni di automazione scadute |
| Timer notturno | 05:00 UTC | Promemoria di presenza dei gruppi; avanza i servizi in streaming ricorrenti; aggiorna le liste a aggiornamento automatico; espande le occorrenze di promemoria per il prossimo orizzonte (`ReminderEngine.expandAll`); invia le email di riepilogo con frequenza `daily` |

In locale, la stessa logica può essere avviata su richiesta con `npm run timer:30min` e `npm run timer:midnight` dal progetto `Api`.

## Inventario dei file {#file-inventory}

| Area | File |
|------|------|
| Imbuto | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Punto di ingresso condiviso | `Api/src/shared/helpers/NotificationService.ts` |
| Porta transazionale | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, regola lint `Api/tools/eslint-rules/email-door.cjs` |
| Limiti email della chiesa | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Motore dei promemoria | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Texting / opt-out STOP | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (panoramica del servizio **Text Volunteers**) |
| Repository dei promemoria | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Email di servizio/piani | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Editor dei promemoria (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| Editor dei promemoria / preferenze (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Pagine correlate {#related-pages}

- [Architettura in tempo reale](../realtime) — il protocollo WebSocket e le primitive lato client (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) su cui si appoggia il livello di consegna in-app
- [Notifiche push web](../web-push) — configurazione VAPID e percorso dell'API Push del browser usato dal livello di escalation push
- [Endpoint dei messaggi](../api/endpoints/messaging) — superficie REST completa per messaggi, conversazioni, connessioni e rotte di notifiche/promemoria
