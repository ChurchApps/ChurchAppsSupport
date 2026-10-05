---
title: "Architettura di Notifiche e Promemoria"
---

# Architettura di Notifiche e Promemoria

<div class="article-intro">

Ogni messaggio che un membro della chiesa vede al di fuori della pagina che sta visualizzando — un badge di conteggio, una notifica push, un'email di riepilogo — passa attraverso una delle due porte in MessagingApi. Questa pagina documenta il funnel, il motore di promemoria che lo alimenta secondo una pianificazione e il modello di preferenza che decide chi riceve effettivamente un messaggio.

</div>

## Panoramica — due porte

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email (→ sms slot)
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Qualsiasi cosa comunichi informazioni a una persona** passa attraverso `NotificationHelper.createNotifications()` nel modulo di messaggistica. Salva una riga in `notifications` e fa scalare socket → push → email, valutando `PreferenceGateHelper` per canale — incluso `in_app` al livello 0.
2. **Qualsiasi cosa pianificata** è una `reminderDefinition` (a livello di entità o di scope) espansa in `reminderOccurrences` e inviata da `ReminderEngine.scan()` su un timer ricorrente. Un espandente, un dispatcher, un registro di invio (`reminderSentLog`).
3. **Email diretta** esiste solo dietro `TransactionalEmailHelper.sendTransactional()`. Una regola ESLint lo applica al momento della compilazione — vedi sotto.

:::tip La porta email è appliquata da lint, non solo da convenzione
`Api/tools/eslint-rules/email-door.cjs` definisce `no-direct-email-helper`: qualsiasi chiamata a `EmailHelper.sendTemplatedEmail()` o `EmailHelper.sendEmail()` al di fuori di `NotificationHelper.ts` o `TransactionalEmailHelper.ts` non supera lint. Se devi inviare un'email, instradala attraverso il funnel (`createNotifications` con `emailImmediate`) o attraverso `TransactionalEmailHelper.sendTransactional()` — non esiste un terzo modo che superi CI.
:::

## Il funnel di notifiche

`NotificationHelper.createNotifications()` è il singolo punto di ingresso per qualsiasi cosa non sia pianificata o transazionale:

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

Per ogni destinatario salva una riga in `notifications` e chiama `attemptDeliveryWithEscalation`, che percorre la scala del canale sotto. Una riga già letta per lo stesso `(contentType, contentId)` supprime la ricreazione — questa protezione di dedup viene ignorata per gli invii `emailImmediate` (offset promemoria, staff "email all", i passaggi del workflow possiedono il proprio dedup) e per i messaggi diretti, che sempre eseguono il ping sul socket.

`shared/helpers/NotificationService.ts` rispecchia la stessa firma (`NotificationServiceOptions`) per i chiamanti al di fuori del modulo di messaggistica e viene registrato con il modulo di messaggistica al boot.

## Catena di escalation del canale

La consegna inizia a un livello (0 per impostazione predefinita, o superiore per promemoria/invii espliciti) e procede al canale successivo solo se il precedente non ha avuto successo. Ogni livello è controllato da `PreferenceGateHelper` prima che qualsiasi cosa venga tentata.

| Livello | Canale | Comportamento |
|-------|---------|----------|
| 0 | **in_app / socket** | Il gate `in_app` viene controllato per primo. Se soppresso (silenziato), la riga viene salvata con `isNew=false` e la consegna si interrompe interamente — nessun ping socket, nessun badge, nessun'ulteriore escalation. Altrimenti il server cerca le connessioni socket aperte per la stanza `alerts` della persona e invia un frame `notification` (o `privateMessage`). Per le notifiche ordinarie, una consegna socket con successo interrompe la catena qui — il timer di 30 minuti riconta gli elementi non letti e li fa escalare in seguito. I messaggi diretti non si fermano mai al socket: un'app PWA installata può tenere aperto il socket degli avvisi in background, il che altrimenti sopprimerebbe il push a livello del sistema operativo. |
| 1 | **push** | Controllato su `allowPush` / esclusione categoria / orari silenziosi. Invia sia ai token push Expo che alle iscrizioni Web Push trovate nelle righe `devices` della persona, deduplicando per endpoint e eliminando i token obsoleti lungo il percorso. |
| 2 | **email** | Controllato su `emailFrequency` e esclusione categoria. Gli invii immediati (`emailImmediate`) si rendono subito e scrivono una riga `deliveryLogs`; altrimenti la notifica rimane in sospeso per il riepilogo batch, descritto di seguito. |
| — | **sms** | L'impianto delle preferenze (`allowSms`, elenchi di canali per categoria) tiene già conto di un canale SMS, ma nessun produttore invia attraverso di esso oggi — rimane riservato per il prodotto SMS bulk, che viene eseguito come un flusso separato e isolato tramite `TextingController` / `@churchapps/texting`. L'azione del passaggio del flusso di lavoro **Send Text** (`StepActionHelper.sendText` → `MessagingModuleGateway.sendPersonText`) aggira anche questo funnel: invia il messaggio della persona direttamente attraverso il provider della chiesa, quindi le preferenze di notifica e gli orari silenziosi non si applicano — solo il flag `optedOut` della persona è onorato. |

Le notifiche non lette lasciate al socket o al push vengono escalate dal timer di 30 minuti (`NotificationHelper.escalateDelivery`). L'email batch viene inviata da `NotificationHelper.sendEmailNotifications(frequency)`, guidata dalla preferenza `emailFrequency` di ogni persona: `individual` viene eseguito sul timer di 30 minuti, `daily` viene eseguito sul timer notturno. (`weekly` è un valore di preferenza valido ma non ha ancora un'esecuzione batch dedicata.)

## Motore di Promemoria

I promemoria pianificati — promemoria di eventi, date di scadenza delle attività, promemoria di assegnazione di servizio/piano — passano tutti attraverso un unico motore generalizzato piuttosto che una logica cron personalizzata per funzione.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Definizioni** (`reminderDefinitions`) sono a livello di entità (`entityId` impostato — uno specifico evento, attività o piano) o a livello di scope (`entityId` null, `scopeId` impostato — ad es. ogni piano sotto un tipo di piano di servizio). Una definizione contiene un CSV di offset di minuti (`offsets`, ad es. `"1440,60"` per un giorno e un'ora prima), un'ora di invio locale (`sendLocalTime`), un CSV di canali (`channels` — incluso `email` attiva un'email ricca immediata all'ora di invio), una `recipientMode` e un `message` personalizzato facoltativo.

**Espansione** materializza righe di fuoco per l'orizzonte avanti (una finestra mobile di più giorni). Viene eseguita sul timer notturno e sincronicamente ogni volta che una definizione viene salvata in modo che un promemoria per un evento last-minute si attivi comunque. Le definizioni di scope si espandono tramite `loadScopeEntities` dell'adapter, producendo un set di occorrenze per entità concreta; le occorrenze a livello di entità utilizzano la chiave `definitionId:occurrenceISO:offset`, mentre le occorrenze con scope vengono spaziate per id di entità in modo che non collisionino mai. L'upsert di un'occorrenza **resurrect** una riga precedentemente cancellata — cancel-then-re-expand è il modo standard per risincronizzare un promemoria dopo il cambio dell'entità sottostante; le righe già `sent`, `failed` o `processing` vengono lasciate intatte.

**Dispatch** (`ReminderEngine.scan()`) viene eseguito sul timer di 30 minuti. Rivendica le occorrenze dovute (un lease previene il doppio-processing), carica i destinatari tramite l'adapter dell'entità, filtra chiunque sia già registrato in `reminderSentLog` per quell'occorrenza, e chiama `createNotifications` con `deliveryStartLevel: 1` (salta direttamente a push) più `emailImmediate`/`emailByPerson` quando i canali della definizione includono email.

Un bus di evento interno reagisce alle mutazioni di entità senza attendere l'espansione notturna: gli eventi di contenuto (tramite il dispatcher di webhook) e gli eventi di aggiornamento di piano/attività attivano l'espansione immediata o l'annullamento per l'entità interessata, e un aggiornamento del piano ri-espande anche tutte le definizioni di scope legate al suo tipo di piano.

### Adattatori

Il motore è agnostico dell'entità; ogni tipo di entità supportato si collega tramite un adattatore (`helpers/adapters/`):

| Tipo di entità | Adattatore | Note |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | I destinatari sono limitati ai registrati o ai membri del gruppo a seconda dell'evento e della `recipientMode`. |
| `plan` | `PlanReminderAdapter` | I destinatari sono le assegnazioni di piano Accepted + Unconfirmed. `buildEmails` richiama `DoingModuleGateway.buildPlanReminderEmails`, che rende posizioni, note e un messaggio personalizzato tramite `doing/helpers/PlanReminderEmailHelper`, inclusi i pulsanti Accept/Decline firmati da `ReminderTokenHelper` che si invia a un endpoint di risposta di assegnazione pubblica. |
| `task` | `TaskReminderAdapter` | I destinatari sono i responsabili dell'attività. |

### Endpoint

| Metodo | Percorso | Scopo |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Carica o salva la definizione del promemoria per un'entità. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Carica o salva una definizione di promemoria a livello di scope (ereditata). |
| `DELETE` | `/messaging/reminders/:defId` | Elimina una definizione e annulla le sue occorrenze in sospeso. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Anteprima della conta dei destinatari e dei tempi di attivazione successivi per un promemoria di evento prima di salvare. |
| `GET` | `/messaging/reminders/log` | Storia di occorrenza di promemoria recente per una chiesa. |
| `POST` | `/messaging/reminders/mute` | Silenzia i promemoria per un'entità specifica. |

Salvare una definizione attiva una ri-espansione sincrona per quell'entità o scope, in modo che i redattori vedano "next fires" aggiornati senza attendere il lavoro notturno.

## Messaggi diretti

I messaggi diretti cavalcano lo stesso funnel di tutto il resto piuttosto che un percorso di escalation separato. Ogni conversazione non letta ottiene una **riga ombra** in `notifications` (`contentType='privateMessage'`, `contentId` = l'id del messaggio privato, `category='direct_messages'`) che possiede tutto lo stato di consegna — escalation socket/push/email, tracciamento di lettura, tutto. La tabella `privateMessages` stessa tiene il payload del messaggio e una colonna `notifyPersonId`, che è la fonte del badge non letto e viene cancellata quando il destinatario legge la conversazione.

Le righe ombra sono invisibili al campanello di notifiche: sono escluse dalla query di conteggio non letto, dalla query di elenco di notifiche e dalle query di mark-read/delete, che tutti filtrano `contentType <> 'privateMessage'`. Ogni ping DM colpisce il socket indipendentemente dallo stato non letto (semantica di chat dal vivo — nessun dedup), e i DM non si fermano mai alla consegna del socket come fanno le notifiche ordinarie, poiché un'app PWA in background può tenere aperto un socket pur avendo bisogno di un push a livello del sistema operativo. Se una persona silenzia le notifiche DM, la riga ombra viene parcheggiata (`isNew=false`, `notifyPersonId` cancellato) — ancora visibile all'interno della conversazione stessa, solo senza badge o avvisi.

## Preferenze e cancellazione

Ogni invio passa attraverso `PreferenceGateHelper.evaluate()`, una funzione pura (tutto lo stato viene passato in, nessuna chiamata DB sul percorso caldo) che restituisce `allow`, `suppress` o `defer`. Gli strati vengono eseguiti in ordine, e il primo che decide vince:

1. **Categoria bloccata** — alcune categorie sono obbligatorie (livello 0) e aggiran ogni altro livello.
2. **Master mute / channel kill** — `masterMute`, `allowPush`, `allowSms` o `emailFrequency='never'` supprimono completamente.
3. **Orari silenziosi** — push e SMS solo (l'email è considerata non invadente). Se l'ora corrente del muro nel fuso orario della persona rientra nella loro finestra silenziosa, una categoria transazionale passa comunque; una non transazionale viene rinviata alla fine della finestra silenziosa, calcolata come un istante UTC corretto per DST tramite `TimezoneHelper.wallClockToUtc`.
4. **Override di preferenza per categoria** — un opt-out esplicito per una coppia categoria × canale; l'assenza significa il valore predefinito della categoria.
5. **Mute per entità** — un mute registrato contro un'entità specifica (ad es. un evento, un piano) restringes ulteriormente il setting a livello di categoria, ma si applica solo quando il chiamante fornisce un id/tipo di entità insieme alla notifica.

Tabelle coinvolte: `notificationPreferences` (globale — `masterMute`, `emailFrequency` di `individual|daily|weekly|never`, `allowPush`, finestra di orari silenziosi + fuso orario, `allowSms`), `notificationPreferenceOverrides` (per categoria × canale), e `notificationEntityMutes` (per entità).

Questo gate è applicato per in_app (livello 0), push (livello 1) e email (livello 2) all'interno del funnel — inclusi promemoria immediati/email di riepilogo batch. L'email transazionale (codici di autenticazione, ripristini di password, inviti, ricevute di donazione) lo aggira per impostazione; questo è l'intero scopo della seconda porta.

## Limiti di email scritti da chiesa

L'email il cui contenuto è scritto da una chiesa esce dall'identità SES condivisa di ChurchApps, quindi è misurata per chiesa da `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Quattro percorsi lo chiamano: invii di gruppo/template (`EmailTemplateController`, tipo di contenuto `email`), email di follow-up del modulo (`FormSubmissionController`, `formFollowUp`), azioni **Send email** del flusso di lavoro (`NotificationHelper` con `churchAuthored`, `workflowEmail`) e inviti di account B1 (`UserController.sendInviteEmail`, `invite`). La posta di sistema (codici di autenticazione, ricevute, promemoria) non è misurata.

- **Porta di approvazione.** Una chiesa non invia niente finché un amministratore del server non imposta `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → chip **Group Email**). Le chiese archiviate sono sempre bloccate. Il dialogo Send Email di B1Admin legge `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) e, quando non approvato, mostra una scheda **Request review** invece dell'editor. `POST /messaging/emailTemplates/requestApproval` invia un'email di supporto, al massimo una volta per chiesa per settimana.
- **Indennità guadagnata.** Una chiesa approvata ottiene `max(150, 2 × its best church-authored day in the prior 30 days)`, plafonato a 2.000 per rotolamento 24 ore. Le 24 ore correnti sono escluse dal "best day" in modo che un'esplosione non possa aumentare il proprio limite.
- **Riserva, quindi liquida.** `reserve()` scrive una riga `deliveryLogs` per destinatario prima di inviare, riconta l'indennità con quelle righe conteggiate, e si ritira se due richieste hanno superato il limite simultaneamente (l'invio restituisce 429). `settle()` contrassegna ogni riga inviata o non riuscita.
- **Pausa di reclamo.** La Lambda `sesFeedback` (`Api/src/lambda/ses-feedback-handler.ts`, alimentata da SES → SNS) fissa ogni rimbalzo permanente o reclamo alla chiesa il cui email scritto da chiesa ha raggiunto quell'indirizzo intorno a quel momento, memorizzato come `deliveryMethod` `sesBounce` / `sesComplaint`. Una chiesa viene messa in pausa a 2+ reclami (≥ 0,3% di invii) o 10+ rimbalzi duri (≥ 5%) in 7 giorni.

## Pianificazione

Sia il motore di promemoria che il riepilogo di notifica utilizzano timer pianificati esistenti piuttosto che introdurre nuova infrastruttura:

| Timer | Pianificazione | Esecuzioni |
|-------|----------|------|
| Timer di 30 minuti | ogni 30 minuti | Escalate le notifiche non lette; invio email di riepilogo frequenza `individual`; dispatch le occorrenze di promemoria dovute (`ReminderEngine.scan`); approvazione di riepiloghi; esecuzioni di automazione dovuta |
| Timer notturno | 05:00 UTC | Promemoria di presenza raggruppati; anticipare i servizi di streaming ricorrenti; aggiornare elenchi auto-refresh; espandere le occorrenze di promemoria per il prossimo orizzonte (`ReminderEngine.expandAll`); inviare email di riepilogo frequenza `daily` |

Localmente, la stessa logica può essere attivata su richiesta con `npm run timer:30min` e `npm run timer:midnight` dal progetto `Api`.

## Inventario file

| Area | File |
|------|-------|
| Funnel | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Ingresso condiviso | `Api/src/shared/helpers/NotificationService.ts` |
| Porta transazionale | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, regola lint `Api/tools/eslint-rules/email-door.cjs` |
| Limiti di email di chiesa | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Motore di promemoria | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Repository di promemoria | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Email di servizio/piano | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Editor di promemoria (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx` |
| Editor di promemoria / preferenze (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Pagine Correlate

- [Architettura Real-time](../realtime) — il protocollo WebSocket e i primitivi client (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) su cui il livello di consegna in-app si basa
- [Notifiche Web Push](../web-push) — configurazione VAPID e il percorso dell'API Push del browser utilizzato dal livello di escalation push
- [Endpoint di Messaggistica](../api/endpoints/messaging) — intera superficie REST per messaggi, conversazioni, connessioni e percorsi di notifica/promemoria
