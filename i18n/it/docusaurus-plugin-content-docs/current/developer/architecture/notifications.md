---
title: "Architettura di notifiche e promemoria"
description: "Come l'API di B1 Admin instrada notifiche, promemoria programmati, limiti delle email della chiesa e disiscrizioni dagli SMS attraverso un unico imbuto di consegna e un unico controllo delle preferenze."
---

# Architettura di notifiche e promemoria

<div class="article-intro">

Ogni messaggio che un membro della chiesa vede al di fuori della pagina in cui si trova -- un contatore sulla campanella, una notifica push, un'email di riepilogo -- passa per una di due porte del MessagingApi. Questa pagina documenta l'imbuto, il motore dei promemoria che lo alimenta secondo una pianificazione, e il modello delle preferenze che decide cosa raggiunge davvero una persona.

</div>

## Panoramica -- due porte {#overview--two-doors}

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
scheduled staff push ─▶ scheduledNotifications (1-minute timer) ───────────┤
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Qualsiasi cosa che comunichi qualcosa a una persona** passa da `NotificationHelper.createNotifications()` nel modulo messaging. Salva una riga nella tabella `notifications` e fa salire il livello socket → push → email, valutando `PreferenceGateHelper` per ogni canale -- incluso `in_app` al livello 0.
2. **Qualsiasi cosa programmata** è una `reminderDefinition` (a livello di entità o di ambito), espansa in `reminderOccurrences` e inviata da `ReminderEngine.scan()` su un timer ricorrente. Un solo espansore, un solo dispatcher, un solo registro degli invii (`reminderSentLog`). L'unica eccezione è una push programmata dallo staff dalla pagina **Mobile > Notifiche push** di B1Admin o dalla finestra **Notifica** di un gruppo: è una riga di `scheduledNotifications` (destinatari `church` o `group`), inviata da `ScheduledNotificationHelper.dispatchDue()` sul timer di 1 minuto. Una riga in ritardo di oltre 30 minuti rispetto al suo `sendAt` al primo tentativo viene segnata come fallita con `missed send window` invece di essere inviata in ritardo, e un invio fallito viene ritentato fino a 3 volte. I destinatari vengono risolti al momento dell'invio da `PushAudienceHelper`, lo stesso helper usato dall'invio immediato al gruppo, e consegnati tramite `createNotifications()` come `churchPushNotification` (categoria di preferenza `announcements`) oppure `groupPushNotification`.
3. **Le email dirette** esistono solo dietro `TransactionalEmailHelper.sendTransactional()`. Una regola ESLint lo impone in fase di compilazione -- vedi sotto.

:::tip La porta delle email è imposta dal lint, non è solo una convenzione
`Api/tools/eslint-rules/email-door.cjs` definisce `no-direct-email-helper`: qualsiasi chiamata a `EmailHelper.sendTemplatedEmail()` o `EmailHelper.sendEmail()` al di fuori di `NotificationHelper.ts` o `TransactionalEmailHelper.ts` fa fallire il lint. Se devi inviare un'email, passa dall'imbuto (`createNotifications` con `emailImmediate`) oppure da `TransactionalEmailHelper.sendTransactional()` -- non esiste una terza via che superi la CI.
:::

## L'imbuto delle notifiche {#the-notification-funnel}

`NotificationHelper.createNotifications()` è l'unico punto di ingresso per tutto ciò che non è programmato né transazionale:

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

Per ogni destinatario salva una riga in `notifications` e chiama `attemptDeliveryWithEscalation`, che percorre la scala dei canali descritta sotto. Una riga ancora non letta per la stessa coppia `(contentType, contentId)` impedisce la ricreazione -- questo controllo di deduplicazione viene saltato per gli invii `emailImmediate` (scalini dei promemoria, "email a tutti" dello staff, i passi dei flussi di lavoro gestiscono la propria deduplicazione) e per i messaggi diretti, che fanno sempre squillare il socket.

`shared/helpers/NotificationService.ts` replica la stessa firma (`NotificationServiceOptions`) per i chiamanti al di fuori del modulo messaging ed è registrato nel modulo messaging all'avvio.

## Catena di escalation dei canali {#channel-escalation-chain}

La consegna parte da un livello (0 di default, o più alto per i promemoria e per gli invii espliciti) e passa al canale successivo solo se il precedente non è riuscito. Ogni livello è filtrato da `PreferenceGateHelper` prima che venga tentato qualcosa.

| Livello | Canale | Comportamento |
|-------|---------|----------|
| 0 | **in_app / socket** | Viene controllato per primo il gate `in_app`. Se soppresso (silenziato), la riga viene salvata con `isNew=false` e la consegna si ferma del tutto -- niente ping sul socket, niente badge, nessuna ulteriore escalation. Altrimenti il server cerca le connessioni socket aperte nella stanza `alerts` della persona e invia un frame `notification` (o `privateMessage`). Per le notifiche ordinarie, una consegna riuscita via socket ferma qui la catena -- il timer di 30 minuti ricontrolla le voci non lette e le fa salire di livello in seguito. I messaggi diretti non si fermano mai al socket: una PWA installata può tenere aperto il socket degli avvisi in background, il che altrimenti sopprimerebbe la push a livello di sistema operativo. |
| 1 | **push** | Filtrato da `allowPush` / disattivazione per categoria / ore di silenzio. Invia sia ai token push Expo sia alle sottoscrizioni Web Push trovate nelle righe `devices` della persona, eliminando i duplicati per endpoint e rimuovendo per strada i token obsoleti. |
| 2 | **email** | Filtrato da `emailFrequency` e dalla disattivazione per categoria. Gli invii immediati (`emailImmediate`) vengono generati subito e scrivono una riga in `deliveryLogs`; altrimenti la notifica resta in attesa del riepilogo in batch, descritto più sotto. |
| -- | **sms** | Non è un livello della scala di escalation. L'unico produttore di SMS filtrato è il motore dei promemoria: quando i `channels` di una definizione includono `sms`, `ReminderEngine.sendSms()` invia un SMS a ogni destinatario **oltre** alla notifica push/email (vedi [Promemoria via SMS](#text-reminders)). L'invio di SMS in blocco (`TextingController` / `@churchapps/texting`), l'azione **Invia SMS ai volontari** della panoramica dei servizi (`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`) e l'azione del passo di flusso di lavoro **Invia SMS** (`StepActionHelper.sendText` → `sendPersonText`) inviano tutti direttamente tramite il provider della chiesa, quindi le preferenze di notifica e le ore di silenzio non si applicano -- viene rispettato solo il flag `optedOut` della persona. |

Le notifiche non lette lasciate al livello socket o push vengono fatte salire di livello dal timer di 30 minuti (`NotificationHelper.escalateDelivery`). Le email in batch vengono inviate da `NotificationHelper.sendEmailNotifications(frequency)`, guidato dalla preferenza `emailFrequency` di ciascuna persona: `individual` gira sul timer di 30 minuti, `daily` gira sul timer notturno. (`weekly` è un valore di preferenza valido ma non ha ancora un'esecuzione in batch dedicata.)

## Motore dei promemoria {#reminder-engine}

I promemoria programmati -- promemoria per eventi, scadenze delle attività, promemoria di incarichi di servizio e piani -- passano tutti da un unico motore generalizzato, invece che da una logica cron specifica per ogni funzionalità.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Definizioni** (`reminderDefinitions`) sono a livello di entità (`entityId` impostato -- un evento, un'attività o un piano specifico) oppure a livello di ambito (`entityId` nullo, `scopeId` impostato -- ad esempio ogni piano sotto un tipo di piano di servizio). Una definizione contiene un CSV di scostamenti in minuti (`offsets`, ad esempio `"1440,60"` per un giorno e un'ora prima), un orario locale di invio (`sendLocalTime`), un CSV di canali (`channels` -- includendo `email`, che attiva un'email ricca immediata al momento dell'invio), una `recipientMode` e un eventuale messaggio personalizzato (`message`).

**L'espansione** materializza le righe di attivazione per l'orizzonte successivo (una finestra mobile di più giorni). Viene eseguita dal timer notturno e in modo sincrono ogni volta che una definizione viene salvata, così un promemoria per un evento organizzato all'ultimo momento scatta comunque. Le definizioni di ambito si espandono tramite `loadScopeEntities` dell'adattatore, producendo un insieme di occorrenze per ogni entità concreta; le occorrenze a livello di entità usano la chiave `definitionId:occurrenceISO:offset`, mentre quelle di ambito hanno uno spazio dei nomi basato sull'ID dell'entità, così non collidono mai. Inserire o aggiornare un'occorrenza **riattiva** una riga annullata in precedenza -- annullare e poi respandere di nuovo è il modo standard per risincronizzare un promemoria dopo che l'entità sottostante è cambiata; le righe già `sent`, `failed` o `processing` restano intatte.

**L'invio** (`ReminderEngine.scan()`) gira sul timer di 30 minuti. Prende in carico le occorrenze scadute (un lease impedisce la doppia elaborazione), carica i destinatari tramite l'adattatore dell'entità, esclude chiunque sia già registrato in `reminderSentLog` per quell'occorrenza, e chiama `createNotifications` con `deliveryStartLevel: 1` (salta direttamente alla push) più `emailImmediate`/`emailByPerson` quando i canali della definizione includono l'email.

### Promemoria via SMS {#text-reminders}

Quando i `channels` di una definizione includono `sms`, `scan()` chiama `ReminderEngine.sendSms()` dopo aver creato le notifiche push/email, per gli stessi destinatari appena selezionati. L'invio di SMS è un'adesione per ogni singolo membro:

- Ogni destinatario passa da `PreferenceGateHelper.evaluate(..., "sms", ...)`, quindi `allowSms` deve essere attivo (è disattivato di default e viene impostato dall'interruttore **Messaggi di testo** di B1App) e il canale `sms` della categoria non deve essere disattivato a livello di override. `event_reminders`, `serving_schedule` e `tasks` elencano `sms` sia in `defaultChannels` sia in `allowedChannels`.
- Le persone senza `mobilePhone` o con `optedOut` impostato vengono soppresse. Se la chiesa non ha un provider di SMS, il resto del lotto viene soppresso con motivo `no_provider`.
- Il corpo del messaggio è costruito da `ReminderEngine.smsBody()`: `"<Church name>: <message> Reply STOP to opt out."`, troncato a un singolo segmento da 160 caratteri.
- Ogni destinatario riceve una propria riga in `reminderSentLog` con `channel: "sms"` e stato `sent` / `suppressed` / `failed`, tenuta separata dalla riga di push/email, così un SMS fallito non rimanda mai la push o l'email.

Gli editor mostrano **Testo** solo quando `GET /messaging/texting/status` restituisce `{ enabled: true }` (il primo provider di SMS della chiesa è attivo).

**Disiscrizione con STOP.** `POST /messaging/texting/inbound/:churchId/:token` è un webhook anonimo che la chiesa incolla nel proprio provider (B1Admin mostra l'URL ottenuto da `GET /messaging/texting/inboundUrl` nelle impostazioni dei messaggi di testo). Il token è un HMAC dell'ID della chiesa (`SmsOptOutHelper.token`). `SmsOptOutHelper.parse` accetta sia i campi di modulo in stile Twilio sia il JSON in stile Clearstream/TextInChurch; se la risposta è esattamente una parola di interruzione del gestore (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), ogni persona non rimossa della chiesa il cui numero di cellulare corrisponde riceve `people.optedOut = true` e `allowSms = false`. Le altre risposte vengono confermate e ignorate.

Un bus di eventi interno reagisce alle modifiche delle entità senza attendere l'espansione notturna: gli eventi sui contenuti (tramite il dispatcher dei webhook) e gli eventi di aggiornamento di piani e attività attivano una nuova espansione o un annullamento immediato per l'entità interessata, e un aggiornamento del piano rielabora anche le definizioni di ambito legate al suo tipo di piano.

### Adattatori {#adapters}

Il motore non conosce le entità: ogni tipo di entità supportato si collega tramite un adattatore (`helpers/adapters/`):

| Tipo di entità | Adattatore | Note |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Destinatari limitati agli iscritti o ai membri del gruppo, a seconda dell'evento e della `recipientMode`. |
| `plan` | `PlanReminderAdapter` | I destinatari sono gli incarichi Accettati + Non confermati sui piani pubblicati (non in bozza). Gli incarichi non confermati emessi tramite un flusso di conferma del servizio sono esclusi finché non vengono accettati (vedi sotto). `buildEmails` richiama `DoingModuleGateway.buildPlanReminderEmails`, che genera posizioni, note e un messaggio personalizzato tramite `doing/helpers/PlanReminderEmailHelper`, inclusi i pulsanti Accetta/Rifiuta firmati da `ReminderTokenHelper` che inviano a un endpoint pubblico di risposta agli incarichi. |
| `task` | `TaskReminderAdapter` | I destinatari sono l'assegnatario o gli assegnatari dell'attività. |

### Endpoint {#endpoints}

| Metodo | Percorso | Scopo |
|--------|---------|-------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Carica o salva la definizione di promemoria di una singola entità. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Carica o salva una definizione di promemoria a livello di ambito (ereditata). |
| `DELETE` | `/messaging/reminders/:defId` | Elimina una definizione e annulla le sue occorrenze in attesa. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Anteprima del numero di destinatari e dei prossimi orari di invio per un promemoria di evento, prima del salvataggio. |
| `GET` | `/messaging/reminders/log` | Cronologia recente delle occorrenze dei promemoria di una chiesa. |
| `POST` | `/messaging/reminders/mute` | Silenzia i promemoria per una specifica entità. |

Il salvataggio di una definizione attiva una nuova espansione sincrona per quell'entità o ambito, così gli editor vedono i "prossimi invii" aggiornati senza attendere il job notturno.

## Messaggi diretti {#direct-messages}

I messaggi diretti seguono lo stesso imbuto di tutto il resto, invece di avere un percorso di escalation separato. Ogni conversazione non letta ottiene una **riga ombra** in `notifications` (`contentType='privateMessage'`, `contentId` = l'ID del messaggio privato, `category='direct_messages'`) che gestisce tutto lo stato di consegna -- escalation socket/push/email, tracciamento della lettura, tutto. La tabella `privateMessages` conserva il contenuto del messaggio e una colonna `notifyPersonId`, che è la fonte del badge dei non letti e viene azzerata quando il destinatario legge la conversazione.

Le righe ombra sono invisibili alla campanella delle notifiche: sono escluse dalla query di conteggio dei non letti, dalla query dell'elenco delle notifiche e dalle query di segnatura come letto/eliminazione, che filtrano tutte `contentType <> 'privateMessage'`. Ogni ping di un messaggio diretto raggiunge il socket indipendentemente dallo stato di lettura (semantica della chat in tempo reale -- nessuna deduplicazione), e i messaggi diretti non si fermano mai alla consegna via socket come le notifiche ordinarie, perché una PWA in background può tenere aperto un socket e avere comunque bisogno di una push a livello di sistema operativo. Se una persona silenzia le notifiche dei messaggi diretti, la riga ombra viene parcheggiata (`isNew=false`, `notifyPersonId` azzerato) -- resta visibile all'interno della conversazione stessa, solo senza badge o avvisi.

## Preferenze e controllo {#preferences--gating}

Ogni invio passa da `PreferenceGateHelper.evaluate()`, una funzione pura (tutto lo stato viene passato in ingresso, nessuna chiamata al database sul percorso critico) che restituisce `allow`, `suppress` o `defer`. I livelli vengono applicati in ordine, e il primo che decide vince:

1. **Categoria bloccata** -- alcune categorie sono obbligatorie (livello 0) e aggirano tutti gli altri livelli.
2. **Silenzio generale / disattivazione del canale** -- `masterMute`, `allowPush`, `allowSms` (disattivato di default -- i membri aderiscono esplicitamente) o `emailFrequency='never'` sopprimono direttamente.
3. **Ore di silenzio** -- solo per push e SMS (l'email è considerata non invadente). Se l'ora locale nel fuso orario della persona cade nella sua finestra di silenzio, una categoria transazionale passa comunque; una non transazionale viene rinviata alla fine della finestra di silenzio, calcolata come istante UTC corretto rispetto all'ora legale tramite `TimezoneHelper.wallClockToUtc`.
4. **Override di preferenza per categoria** -- una disattivazione esplicita per una coppia categoria × canale; l'assenza significa il valore predefinito della categoria.
5. **Silenzio per entità** -- un silenzio registrato su una specifica entità (ad esempio un evento o un piano) limita più del livello di categoria, ma si applica solo quando il chiamante fornisce un ID e un tipo di entità insieme alla notifica.

Tabelle coinvolte: `notificationPreferences` (globali -- `masterMute`, `emailFrequency` tra `individual|daily|weekly|never`, `allowPush`, finestra delle ore di silenzio e fuso orario, `allowSms`), `notificationPreferenceOverrides` (per categoria × canale) e `notificationEntityMutes` (per entità).

Questo controllo è applicato per in-app (livello 0), push (livello 1) ed email (livello 2) all'interno dell'imbuto -- incluse le email immediate di promemoria e riepilogo -- e per i SMS di promemoria in `ReminderEngine.sendSms()`. Le email transazionali (codici di accesso, reimpostazioni della password, inviti, ricevute di donazione) aggirano il controllo per progetto: è proprio lo scopo della seconda porta.

### Flussi di conferma degli incarichi di servizio {#serving-confirmation-workflows}

Un piano può scegliere un flusso di lavoro `workflowType = "assignmentConfirmation"` (`plans.confirmationWorkflowId`). Pubblica/Notifica chiama quindi `POST /doing/plans/:id/issueRequests` invece della notifica per singolo incarico: ogni nuovo incarico Non confermato riceve `notified` + `confirmationWorkflowId` e una scheda di flusso di lavoro (`tasks.assignmentId`, `followupKey` univoco). La scheda invia un avviso solo per l'app (`appOnly: true` -- nessuna escalation push/email), poi esegue le azioni `sendAssignmentRequest` del flusso, che passano da `MessagingModuleGateway.sendServingWorkflowMessage`: email tramite `NotificationHelper.sendWorkflowEmail` (controllo delle preferenze + `ChurchEmailLimiter`, conteggiata come `workflowEmail`), SMS tramite `sendPersonText` solo con `allowSms` e il filtro della categoria `serving_schedule`. Accetta/Rifiuta (`assignment.updated` sul bus di eventi) chiude la scheda; il timer di 30 minuti (`AssignmentWorkflowHelper.processPending`) ripara inizi ed eventi mancati e trasforma una richiesta senza risposta alla scadenza del follow-up in un'attività di revisione per il responsabile. Ciclo di vita completo: `Api/docs/assignment-confirmation-workflows.md`.

## Limiti delle email scritte dalla chiesa {#church-authored-email-limits}

Le email il cui contenuto è scritto da una chiesa partono dall'identità SES condivisa di ChurchApps, quindi vengono conteggiate per chiesa da `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Quattro percorsi lo richiamano: invii di gruppo/modelli (`EmailTemplateController`, tipo di contenuto `email`), email di follow-up dei moduli (`FormSubmissionController`, `formFollowUp`), azioni **Invia email** dei flussi di lavoro (`NotificationHelper` con `churchAuthored`, `workflowEmail`) e email di richiesta per la conferma degli incarichi (`NotificationHelper.sendWorkflowEmail`, `workflowEmail`). La posta di sistema (codici di accesso, ricevute, promemoria) e gli inviti a ruoli e gruppi (`UserController.sendInviteEmail`, un modello fisso) non vengono conteggiati.

- **Gate di approvazione.** Una chiesa non invia nulla finché un amministratore del server non imposta `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Server Admin → Chiese → chip **Email di gruppo**). Le chiese archiviate sono sempre bloccate. La finestra Invia email di B1Admin legge `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) e, se non approvata, mostra una scheda **Richiedi revisione** al posto dell'editor. L'editor dei passi del flusso di lavoro legge lo stesso endpoint (aperto anche a `tasks.admin` oltre che a `groupMembers.edit`) per avvisare sulle azioni **Invia email** quando la chiesa non è approvata o è in pausa. Al momento dell'invio, `MessagingModuleGateway.sendTemplatedEmail` restituisce `false` senza creare una notifica quando `ChurchEmailLimiter.remaining()` è inferiore a 1, così la cronologia della scheda non dichiara mai **Email inviata** per un messaggio scartato. `POST /messaging/emailTemplates/requestApproval` invia un'email al supporto, al massimo una volta a settimana per chiesa.
- **Quota guadagnata.** Una chiesa approvata riceve `max(150, 2 × its best church-authored day in the prior 30 days)`, con un tetto di 2.000 per 24 ore mobili. Le ultime 24 ore correnti sono escluse dal calcolo del "miglior giorno", così un picco non può alzare il proprio limite.
- **Prenota, poi regola.** `reserve()` scrive una riga in `deliveryLogs` per ogni destinatario prima dell'invio, ricontrolla la quota contando anche quelle righe, e si ritira se due richieste hanno superato il limite in contemporanea (l'invio restituisce 429). `settle()` segna ogni riga come inviata o fallita.
- **Pausa per reclami.** La Lambda `sesFeedback` (`Api/src/lambda/ses-feedback-handler.ts`, alimentata da SES → SNS) associa ogni rimbalzo permanente o reclamo alla chiesa la cui email scritta dalla chiesa ha raggiunto quell'indirizzo in quel momento, salvati come `deliveryMethod` `sesBounce` / `sesComplaint`. Una chiesa viene messa in pausa con 2 o più reclami (≥ 0,3% degli invii) oppure con 10 o più rimbalzi definitivi (≥ 5%) nell'arco di 7 giorni.

## Pianificazione {#scheduling}

Sia il motore dei promemoria sia il riepilogo delle notifiche usano timer pianificati già esistenti, senza introdurre nuova infrastruttura:

| Timer | Pianificazione | Esegue |
|-------|---------|--------|
| Timer di 30 minuti | ogni 30 minuti | Fa salire di livello le notifiche non lette; invia le email di riepilogo con frequenza `individual`; invia le occorrenze di promemoria scadute (`ReminderEngine.scan`); riepiloghi di approvazione; esecuzioni di automazioni scadute |
| Timer di 1 minuto (`timerWebhooks`) | ogni minuto | Invia le notifiche push programmate scadute (`ScheduledNotificationHelper.dispatchDue`, job `scheduledNotifications`) |
| Timer notturno | 05:00 UTC | Promemoria di presenza dei gruppi; avanza i servizi di streaming ricorrenti; aggiorna le liste a rinnovo automatico; espande le occorrenze dei promemoria per il prossimo orizzonte (`ReminderEngine.expandAll`); invia le email di riepilogo con frequenza `daily` |

In locale, la stessa logica può essere avviata su richiesta con `npm run timer:30min` e `npm run timer:midnight` dal progetto `Api`.

## Inventario dei file {#file-inventory}

| Area | File |
|------|-------|
| Imbuto | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Punto di ingresso condiviso | `Api/src/shared/helpers/NotificationService.ts` |
| Porta transazionale | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, regola lint `Api/tools/eslint-rules/email-door.cjs` |
| Limiti delle email della chiesa | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Motore dei promemoria | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| SMS / disiscrizione STOP | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (**Invia SMS ai volontari** della panoramica dei servizi) |
| Repository dei promemoria | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Email di servizio/piano | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Editor dei promemoria (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| Editor dei promemoria / preferenze (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Pagine correlate {#related-pages}

- [Architettura in tempo reale](../realtime.md) -- il protocollo WebSocket e le primitive lato client (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) su cui si appoggia il livello di consegna in-app
- [Notifiche push web](../web-push.md) -- configurazione VAPID e percorso dell'API Push del browser usato dal livello di escalation push
- [Endpoint di messaggistica](../api/endpoints/messaging.md) -- l'intera superficie REST per messaggi, conversazioni, connessioni e percorsi di notifica/promemoria
