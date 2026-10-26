---
title: "Architettura di notifiche e promemoria"
---

# Architettura di notifiche e promemoria

<div class="article-intro">

Ogni messaggio che una persona della chiesa vede al di fuori della pagina che sta consultando — un contatore di notifiche, una notifica push, un'email di riepilogo — passa attraverso una di due porte in MessagingApi. Questa pagina descrive il percorso, il motore dei promemoria che lo alimenta secondo una pianificazione e il modello delle preferenze che decide cosa raggiunge davvero una persona.

</div>

## Panoramica — due porte

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Qualsiasi cosa che comunichi qualcosa a una persona** passa attraverso `NotificationHelper.createNotifications()` nel modulo di messaggistica. Salva una riga nella tabella `notifications` e fa salire la consegna da socket a push a email, valutando `PreferenceGateHelper` per ogni canale — incluso `in_app` al livello 0.
2. **Qualsiasi cosa programmata** è una `reminderDefinition` (a livello di entità o di ambito) espansa in `reminderOccurrences` e inviata da `ReminderEngine.scan()` su un timer ricorrente. Un solo espansore, un solo dispatcher, un solo registro degli invii (`reminderSentLog`).
3. **Le email dirette** esistono solo dietro `TransactionalEmailHelper.sendTransactional()`. Una regola ESLint lo impone in fase di compilazione — vedi sotto.

:::tip La porta email è imposta dal lint, non solo per convenzione
`Api/tools/eslint-rules/email-door.cjs` definisce `no-direct-email-helper`: qualsiasi chiamata a `EmailHelper.sendTemplatedEmail()` o `EmailHelper.sendEmail()` al di fuori di `NotificationHelper.ts` o `TransactionalEmailHelper.ts` fa fallire il lint. Se devi inviare un'email, passa attraverso il flusso (`createNotifications` con `emailImmediate`) oppure attraverso `TransactionalEmailHelper.sendTransactional()` — non esiste una terza via che superi la CI.
:::

## Il flusso delle notifiche

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

Per ogni destinatario viene salvata una riga in `notifications` e viene richiamato `attemptDeliveryWithEscalation`, che percorre la scala dei canali descritta sotto. Una riga ancora non letta per la stessa coppia `(contentType, contentId)` impedisce di ricrearla: questa protezione contro i duplicati viene saltata per gli invii con `emailImmediate` (promemoria con scostamento, "email a tutti" dello staff, i passaggi dei workflow gestiscono la propria deduplicazione) e per i messaggi diretti, che fanno sempre squillare il socket.

`shared/helpers/NotificationService.ts` replica la stessa firma (`NotificationServiceOptions`) per i chiamanti al di fuori del modulo di messaggistica ed è registrato nel modulo di messaggistica all'avvio.

## Catena di escalation dei canali

La consegna parte da un livello (0 per impostazione predefinita, o più alto per i promemoria e gli invii espliciti) e passa al canale successivo solo se il precedente non ha avuto successo. Ogni livello è filtrato da `PreferenceGateHelper` prima che venga tentato qualsiasi invio.

| Livello | Canale | Comportamento |
|-------|---------|----------|
| 0 | **in_app / socket** | Per prima cosa viene verificato il gate `in_app`. Se l'invio è soppresso (silenziato), la riga viene salvata con `isNew=false` e la consegna si interrompe del tutto — nessun ping via socket, nessun badge, nessun'ulteriore escalation. Altrimenti il server cerca le connessioni socket aperte nella stanza `alerts` della persona e invia un frame `notification` (o `privateMessage`). Per le notifiche ordinarie, una consegna riuscita via socket interrompe qui la catena — il timer da 30 minuti ricontrolla gli elementi non letti e li fa salire di livello più tardi. I messaggi diretti non si fermano mai al socket: una PWA installata può tenere aperto il socket degli avvisi in background, il che altrimenti sopprimerebbe la push a livello di sistema operativo. |
| 1 | **push** | Filtrato da `allowPush` / dalla disattivazione per categoria / dalle ore silenziose. Invia sia ai token push di Expo sia alle sottoscrizioni Web Push presenti nelle righe `devices` della persona, deduplicando per endpoint ed eliminando per strada i token obsoleti. |
| 2 | **email** | Filtrato da `emailFrequency` e dalla disattivazione per categoria. Gli invii immediati (`emailImmediate`) vengono generati subito e scrivono una riga in `deliveryLogs`; altrimenti la notifica resta in attesa del riepilogo in batch, descritto più avanti. |
| — | **sms** | Non è un livello della scala di escalation. L'unico produttore di SMS filtrato è il motore dei promemoria: quando i `channels` di una definizione includono `sms`, `ReminderEngine.sendSms()` invia un SMS a ogni destinatario **oltre** alla notifica push/email (vedi [Promemoria via SMS](#text-reminders)). L'invio di SMS in blocco (`TextingController` / `@churchapps/texting`), l'azione di riepilogo **Invia SMS ai volontari** della pianificazione del servizio (`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`) e l'azione del workflow **Invia SMS** (`StepActionHelper.sendText` → `sendPersonText`) inviano tutti direttamente tramite il fornitore della chiesa, quindi le preferenze di notifica e le ore silenziose non si applicano a loro — viene rispettato solo il flag `optedOut` della persona. |

Le notifiche non lette rimaste al livello socket o push vengono fatte salire di livello dal timer da 30 minuti (`NotificationHelper.escalateDelivery`). L'email in batch viene inviata da `NotificationHelper.sendEmailNotifications(frequency)`, guidata dalla preferenza `emailFrequency` di ciascuna persona: `individual` viene eseguita con il timer da 30 minuti, `daily` viene eseguita con il timer notturno. (`weekly` è un valore di preferenza valido ma non ha ancora un'esecuzione in batch dedicata.)

## Motore dei promemoria

I promemoria programmati — promemoria per eventi, scadenze dei compiti, promemoria per le assegnazioni di servizio/pianificazione — passano tutti attraverso un unico motore generalizzato anziché attraverso una logica cron dedicata per ogni funzionalità.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Definizioni** (`reminderDefinitions`) sono a livello di entità (`entityId` valorizzato — un evento, un compito o un piano specifico) oppure a livello di ambito (`entityId` nullo, `scopeId` valorizzato — ad esempio ogni piano di un tipo di piano di servizio). Una definizione contiene un CSV di scostamenti in minuti (`offsets`, ad esempio `"1440,60"` per uno e un'ora prima), un orario locale di invio (`sendLocalTime`), un CSV di canali (`channels` — includendo `email`, che al momento dell'invio genera subito un'email ricca), una `recipientMode` e un eventuale `message` personalizzato.

**L'espansione** materializza le righe di invio per l'orizzonte futuro (una finestra mobile di più giorni). Viene eseguita con il timer notturno e in modo sincrono ogni volta che una definizione viene salvata, così che un promemoria per un evento dell'ultimo minuto venga comunque inviato. Le definizioni di ambito si distribuiscono tramite `loadScopeEntities` dell'adattatore, producendo un insieme di occorrenze per ogni entità concreta; le occorrenze a livello di entità usano la chiave `definitionId:occurrenceISO:offset`, mentre quelle di ambito usano come namespace l'id dell'entità, così non si sovrappongono mai. L'upsert di un'occorrenza **ripristina** una riga precedentemente annullata — annulla e rispecifica è il modo standard per risincronizzare un promemoria quando l'entità sottostante cambia; le righe già `sent`, `failed` o `processing` restano intatte.

**La consegna** (`ReminderEngine.scan()`) viene eseguita con il timer da 30 minuti. Prende in carico le occorrenze scadute (un lease impedisce l'elaborazione doppia), carica i destinatari tramite l'adattatore dell'entità, esclude chi è già registrato in `reminderSentLog` per quella occorrenza e richiama `createNotifications` con `deliveryStartLevel: 1` (salta direttamente alla push) più `emailImmediate`/`emailByPerson` quando i canali della definizione includono l'email.

### Promemoria via SMS

Quando i `channels` di una definizione includono `sms`, `scan()` chiama `ReminderEngine.sendSms()` dopo che sono state create le notifiche push/email, per gli stessi destinatari appena selezionati. L'invio di SMS è una scelta esplicita per ogni membro:

- Ogni destinatario passa attraverso `PreferenceGateHelper.evaluate(..., "sms", ...)`, quindi `allowSms` deve essere attivo (per impostazione predefinita è disattivo ed è impostato dall'interruttore **Messaggi di testo** di B1App) e il canale `sms` della categoria non deve essere disattivato tramite override. `event_reminders`, `serving_schedule` e `tasks` includono `sms` sia in `defaultChannels` sia in `allowedChannels`.
- Le persone senza `mobilePhone` o con `optedOut` impostato vengono escluse. Se la chiesa non ha un fornitore di SMS, il resto del lotto viene escluso con motivo `no_provider`.
- Il testo viene costruito da `ReminderEngine.smsBody()`: `"<Church name>: <message> Reply STOP to opt out."`, troncato a un singolo segmento da 160 caratteri.
- Ogni destinatario ottiene una propria riga in `reminderSentLog` con `channel: "sms"` e stato `sent` / `suppressed` / `failed`, distinta dalla riga push/email, così un SMS fallito non rinvia mai la push o l'email.

Gli editor mostrano **Testo** solo quando `GET /messaging/texting/status` restituisce `{ enabled: true }` (il primo fornitore di SMS della chiesa è abilitato).

**Disattivazione con STOP.** `POST /messaging/texting/inbound/:churchId/:token` è un webhook anonimo che la chiesa incolla nel proprio fornitore (B1Admin mostra l'URL ottenuto da `GET /messaging/texting/inboundUrl` nelle impostazioni dei messaggi di testo). Il token è un HMAC dell'id della chiesa (`SmsOptOutHelper.token`). `SmsOptOutHelper.parse` accetta i campi di modulo in stile Twilio e il JSON in stile Clearstream/TextInChurch; se la risposta è esattamente una parola di arresto del vettore (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), ogni persona non rimossa della chiesa il cui numero di cellulare corrisponde riceve `people.optedOut = true` e `allowSms = false`. Le altre risposte vengono confermate e ignorate.

Un bus di eventi interno reagisce alle modifiche delle entità senza attendere l'espansione notturna: gli eventi di contenuto (tramite il dispatcher dei webhook) e gli eventi di aggiornamento di piani/compiti fanno scattare un'espansione o un annullamento immediato per l'entità interessata, e un aggiornamento del piano espande anche di nuovo le definizioni di ambito collegate al suo tipo di piano.

### Adattatori

Il motore è indipendente dall'entità; ogni tipo di entità supportato si collega tramite un adattatore (`helpers/adapters/`):

| Tipo di entità | Adattatore | Note |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | I destinatari sono limitati agli iscritti o ai membri del gruppo, a seconda dell'evento e di `recipientMode`. |
| `plan` | `PlanReminderAdapter` | I destinatari sono le assegnazioni Accettate + Non confermate nei piani pubblicati (non bozze). Le assegnazioni non confermate emesse tramite un workflow di conferma del servizio sono escluse finché non vengono accettate (vedi sotto). `buildEmails` richiama `DoingModuleGateway.buildPlanReminderEmails`, che genera posizioni, note e un messaggio personalizzato tramite `doing/helpers/PlanReminderEmailHelper`, includendo i pulsanti Accetta/Rifiuta firmati da `ReminderTokenHelper` che inviano dati a un endpoint pubblico di risposta all'assegnazione. |
| `task` | `TaskReminderAdapter` | I destinatari sono l'assegnatario o gli assegnatari del compito. |

### Endpoint

| Metodo | Percorso | Scopo |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Carica o salva la definizione del promemoria per una singola entità. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Carica o salva una definizione di promemoria a livello di ambito (ereditata). |
| `DELETE` | `/messaging/reminders/:defId` | Elimina una definizione e annulla le sue occorrenze in attesa. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Mostra in anteprima il numero di destinatari e i prossimi orari di invio di un promemoria per un evento, prima del salvataggio. |
| `GET` | `/messaging/reminders/log` | Cronologia recente delle occorrenze dei promemoria per una chiesa. |
| `POST` | `/messaging/reminders/mute` | Silenzia i promemoria per una specifica entità. |

Il salvataggio di una definizione attiva una ri-espansione sincrona per quell'entità o ambito, così gli editor vedono subito i "prossimi invii" aggiornati senza attendere il job notturno.

## Messaggi diretti

I messaggi diretti seguono lo stesso flusso di tutto il resto anziché un percorso di escalation separato. Ogni conversazione non letta genera una **riga ombra** in `notifications` (`contentType='privateMessage'`, `contentId` = l'id del messaggio privato, `category='direct_messages'`) che gestisce tutto lo stato della consegna — escalation socket/push/email, tracciamento della lettura, tutto. La tabella `privateMessages` conserva il contenuto del messaggio e una colonna `notifyPersonId`, che è la fonte del badge dei non letti e viene azzerata quando il destinatario legge la conversazione.

Le righe ombra sono invisibili alla campanella delle notifiche: vengono escluse dalla query del conteggio dei non letti, dalla query dell'elenco delle notifiche e dalle query di segna-come-letto/elimina, che filtrano tutte per `contentType <> 'privateMessage'`. Ogni ping di messaggio diretto colpisce il socket indipendentemente dallo stato di lettura (semantica di chat in tempo reale — nessuna deduplicazione), e i messaggi diretti non si fermano mai al socket come le notifiche ordinarie, dato che una PWA in background può mantenere aperto un socket pur avendo ancora bisogno di una push a livello di sistema operativo. Se una persona silenzia le notifiche dei messaggi diretti, la riga ombra viene messa in pausa (`isNew=false`, `notifyPersonId` azzerato) — resta visibile all'interno della conversazione stessa, ma senza badge né avvisi.

## Preferenze e filtri

Ogni invio passa attraverso `PreferenceGateHelper.evaluate()`, una funzione pura (tutto lo stato viene passato in ingresso, nessuna chiamata al database sul percorso critico) che restituisce `allow`, `suppress` o `defer`. I livelli vengono eseguiti in ordine, e vince il primo che decide:

1. **Categoria bloccata** — alcune categorie sono obbligatorie (livello 0) e aggirano tutti gli altri livelli.
2. **Silenziamento generale / disattivazione del canale** — `masterMute`, `allowPush`, `allowSms` (disattivato per impostazione predefinita — i membri scelgono di attivarlo) o `emailFrequency='never'` sopprimono direttamente.
3. **Ore silenziose** — solo push e SMS (l'email è considerata non invasiva). Se l'ora locale attuale nel fuso orario della persona rientra nella sua finestra silenziosa, una categoria transazionale passa comunque; una categoria non transazionale viene rinviata alla fine della finestra silenziosa, calcolata come istante UTC corretto per l'ora legale tramite `TimezoneHelper.wallClockToUtc`.
4. **Sostituzione delle preferenze per categoria** — una disattivazione esplicita per una coppia categoria × canale; l'assenza significa il valore predefinito della categoria.
5. **Silenziamento per entità** — un silenziamento registrato per una specifica entità (ad esempio un evento o un piano) limita più del livello di categoria, ma si applica solo quando il chiamante fornisce insieme alla notifica un id/tipo di entità.

Tabelle coinvolte: `notificationPreferences` (globali — `masterMute`, `emailFrequency` con valori `individual|daily|weekly|never`, `allowPush`, finestra delle ore silenziose + fuso orario, `allowSms`), `notificationPreferenceOverrides` (per categoria × canale) e `notificationEntityMutes` (per entità).

Questo filtro viene applicato per le notifiche in-app (livello 0), push (livello 1) ed email (livello 2) all'interno del flusso — incluse le email immediate di promemoria/riepilogo — e per i messaggi di promemoria via SMS in `ReminderEngine.sendSms()`. L'email transazionale (codici di accesso, reimpostazioni della password, inviti, ricevute di donazione) lo aggira per progettazione; è proprio questo lo scopo della seconda porta.

### Flussi di conferma del servizio

Un piano può scegliere un workflow `workflowType = "assignmentConfirmation"` (`plans.confirmationWorkflowId`). Pubblica/Notifica chiama quindi `POST /doing/plans/:id/issueRequests` invece della notifica per singola assegnazione: ogni nuova assegnazione Non confermata riceve `notified` + `confirmationWorkflowId` e una scheda di workflow (`tasks.assignmentId`, `followupKey` univoco). La scheda invia un avviso solo per l'app (`appOnly: true` — nessuna escalation push/email), poi esegue le azioni `sendAssignmentRequest` del workflow, che passano da `MessagingModuleGateway.sendServingWorkflowMessage`: email tramite `NotificationHelper.sendWorkflowEmail` (gate delle preferenze + `ChurchEmailLimiter`, conteggiata come `workflowEmail`), SMS tramite `sendPersonText` solo con `allowSms` e il filtro della categoria `serving_schedule`. Accetta/Rifiuta (`assignment.updated` sul bus degli eventi) chiude la scheda; il timer da 30 minuti (`AssignmentWorkflowHelper.processPending`) ripara avvii ed eventi mancati e trasforma una richiesta senza risposta alla scadenza del sollecito in un compito di revisione per il responsabile. Ciclo di vita completo: `Api/docs/assignment-confirmation-workflows.md`.

## Limiti delle email scritte dalla chiesa

Le email il cui contenuto è stato scritto da una chiesa partono dall'identità SES condivisa di ChurchApps, quindi vengono conteggiate per chiesa da `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Quattro percorsi lo richiamano: invii a gruppi/modelli (`EmailTemplateController`, tipo di contenuto `email`), email di follow-up dei moduli (`FormSubmissionController`, `formFollowUp`), azioni del workflow **Invia email** (`NotificationHelper` con `churchAuthored`, `workflowEmail`) ed email di richiesta di conferma del servizio (`NotificationHelper.sendWorkflowEmail`, `workflowEmail`). La posta di sistema (codici di accesso, ricevute, promemoria) e gli inviti a ruoli e gruppi (`UserController.sendInviteEmail`, un modello fisso) non vengono conteggiati.

- **Filtro di approvazione.** Una chiesa non invia nulla finché un amministratore del server non imposta `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Amministrazione server → Chiese → chip **Email di gruppo**). Le chiese archiviate sono sempre bloccate. La finestra Invia email di B1Admin legge `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) e, se non approvata, mostra una scheda **Richiedi revisione** invece dell'editor. L'editor dei passaggi del workflow legge lo stesso endpoint (accessibile anche a `tasks.admin` oltre che a `groupMembers.edit`) per avvisare sulle azioni **Invia email** quando la chiesa non è approvata o è in pausa. Al momento dell'invio, `MessagingModuleGateway.sendTemplatedEmail` restituisce `false` senza creare alcuna notifica quando `ChurchEmailLimiter.remaining()` è inferiore a 1, così la cronologia della scheda non dichiara mai **Email inviata** per un messaggio scartato. `POST /messaging/emailTemplates/requestApproval` invia un'email al supporto, al massimo una volta a settimana per chiesa.
- **Quota guadagnata.** Una chiesa approvata ottiene `max(150, 2 × il suo miglior giorno di email scritte dalla chiesa negli ultimi 30 giorni)`, con un tetto di 2.000 nelle ultime 24 ore mobili. Le 24 ore correnti sono escluse dal calcolo del "miglior giorno", così una raffica non può alzare il proprio limite.
- **Prenota, poi regola.** `reserve()` scrive una riga in `deliveryLogs` per ogni destinatario prima dell'invio, ricontrolla la quota contando queste righe e fa marcia indietro se due richieste hanno superato il limite in contemporanea (l'invio restituisce 429). `settle()` contrassegna ogni riga come inviata o fallita.
- **Sospensione per reclami.** La funzione Lambda `sesFeedback` (`Api/src/lambda/ses-feedback-handler.ts`, alimentata da SES → SNS) associa ogni rimbalzo permanente o reclamo alla chiesa la cui email scritta dalla chiesa ha raggiunto quell'indirizzo in quel periodo, memorizzato come `deliveryMethod` `sesBounce` / `sesComplaint`. Una chiesa viene sospesa con 2 o più reclami (≥ 0,3% degli invii) oppure con 10 o più rimbalzi definitivi (≥ 5%) in 7 giorni.

## Pianificazione

Sia il motore dei promemoria sia il riepilogo delle notifiche si appoggiano ai timer pianificati già esistenti, senza introdurre nuova infrastruttura:

| Timer | Pianificazione | Esegue |
|-------|----------|------|
| Timer da 30 minuti | ogni 30 minuti | Fa salire di livello le notifiche non lette; invia le email di riepilogo con frequenza `individual`; invia le occorrenze di promemoria scadute (`ReminderEngine.scan`); riepiloghi di approvazione; esecuzioni di automazioni scadute |
| Timer notturno | 05:00 UTC | Promemoria di presenza ai gruppi; avanza i servizi in streaming ricorrenti; aggiorna gli elenchi con aggiornamento automatico; espande le occorrenze di promemoria per il prossimo orizzonte (`ReminderEngine.expandAll`); invia le email di riepilogo con frequenza `daily` |

In locale, la stessa logica può essere avviata su richiesta con `npm run timer:30min` e `npm run timer:midnight` dal progetto `Api`.

## Inventario dei file

| Area | File |
|------|------|
| Flusso | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Punto di ingresso condiviso | `Api/src/shared/helpers/NotificationService.ts` |
| Porta transazionale | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, regola di lint `Api/tools/eslint-rules/email-door.cjs` |
| Limiti email della chiesa | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Motore dei promemoria | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Messaggi di testo / disattivazione STOP | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (riepilogo della pianificazione **Invia SMS ai volontari**) |
| Repository dei promemoria | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Email di pianificazione/piani | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Editor dei promemoria (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| Editor dei promemoria / preferenze (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Pagine correlate

- [Architettura in tempo reale](../realtime) — il protocollo WebSocket e le primitive lato client (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) su cui si appoggia il livello di consegna in-app
- [Notifiche Web Push](../web-push) — configurazione VAPID e il percorso dell'API Push del browser usato dal livello di escalation push
- [Endpoint di messaggistica](../api/endpoints/messaging) — l'intera superficie REST per messaggi, conversazioni, connessioni e route di notifica/promemoria
