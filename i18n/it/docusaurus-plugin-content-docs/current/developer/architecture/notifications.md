---
title: "Architettura Notifiche e Promemoria"
---

# Architettura Notifiche e Promemoria

<div class="article-intro">

Ogni messaggio che un membro della chiesa vede al di fuori della pagina che sta guardando — un conteggio di badge, una notifica push, un digest email — passa attraverso una di due porte nel MessagingApi. Questa pagina documenta il funnel, il motore di promemoria che lo alimenta su un programma, e il modello di preferenza che decide cosa raggiunge effettivamente una persona.

</div>

## Panoramica — due porte

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email (→ sms slot)
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Qualsiasi cosa che dica a una persona qualcosa** passa attraverso `NotificationHelper.createNotifications()` nel modulo di messaggistica. Persiste una riga `notifications` e aumenta socket → push → email, valutando `PreferenceGateHelper` per canale — incluso `in_app` al livello 0.
2. **Qualsiasi cosa programmata** è una `reminderDefinition` (a livello di entità o di ambito) espansa in `reminderOccurrences` e inviata da `ReminderEngine.scan()` su un timer ricorrente. Un espansore, un dispatcher, un ledger di invio (`reminderSentLog`).
3. **Email diretta** esiste solo dietro `TransactionalEmailHelper.sendTransactional()`. Una regola ESLint la applica al momento della compilazione — vedi sotto.

:::tip La porta email è lint-applicata, non solo una convenzione
`Api/tools/eslint-rules/email-door.cjs` definisce `no-direct-email-helper`: qualsiasi chiamata a `EmailHelper.sendTemplatedEmail()` o `EmailHelper.sendEmail()` al di fuori di `NotificationHelper.ts` o `TransactionalEmailHelper.ts` non supera il lint. Se hai bisogno di inviare un'email, instradala attraverso il funnel (`createNotifications` con `emailImmediate`) o attraverso `TransactionalEmailHelper.sendTransactional()` — non esiste un terzo modo che passa CI.
:::

## Il funnel di notificazione

`NotificationHelper.createNotifications()` è il singolo punto di ingresso per qualsiasi cosa che non sia programmata o transazionale:

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

Per ogni destinatario salva una riga in `notifications` e chiama `attemptDeliveryWithEscalation`, che percorre la scala del canale sottostante. Una riga ancora non letta per lo stesso `(contentType, contentId)` sopprime la ricreazione — questa guardia dedup viene saltata per i send `emailImmediate` (offset di promemoria, staff "invia a tutti", i passaggi del workflow possiedono il loro proprio dedup) e per i messaggi diretti, che pinzano sempre il socket.

`shared/helpers/NotificationService.ts` rispecchia la stessa firma (`NotificationServiceOptions`) per i chiamanti al di fuori del modulo di messaggistica ed è registrata con il modulo di messaggistica all'avvio.

## Catena di escalation dei canali

La consegna inizia a un livello (0 per impostazione predefinita, o superiore per promemoria/invii espliciti) e procede solo al canale successivo se il precedente non ha avuto successo. Ogni livello è gated da `PreferenceGateHelper` prima che qualsiasi cosa venga tentata.

| Livello | Canale | Comportamento |
|-------|---------|----------|
| 0 | **in_app / socket** | Il gate `in_app` viene controllato per primo. Se soppresso (muto), la riga viene persistita con `isNew=false` e la consegna si ferma completamente — nessun ping socket, nessun badge, nessuna ulteriore escalation. Altrimenti il server cerca le connessioni socket aperte per la stanza `alerts` della persona e spinge un frame `notification` (o `privateMessage`). Per le notifiche ordinarie, una consegna socket riuscita ferma la catena qui — il timer di 30 minuti ri-controlla gli elementi non letti e li aumenta in seguito. I messaggi diretti non si fermano mai al socket: un PWA installato può mantenere il socket degli avvisi aperto in background, il che altrimenti sopprimerebbe il push a livello del sistema operativo. |
| 1 | **push** | Gated su `allowPush` / opt-out di categoria / ore tranquille. Invia a entrambi i token di spinta Expo e le sottoscrizioni di Web Push trovate sulle righe `devices` della persona, deduplicando per endpoint e potando token stantii nel processo. |
| 2 | **email** | Gated su `emailFrequency` e opt-out di categoria. Gli invii immediati (`emailImmediate`) eseguono il rendering subito e scrivono una riga `deliveryLogs`; altrimenti la notifica viene lasciata in sospeso per il digest batch, descritto di seguito. |
| — | **sms** | L'impianto idraulico di preferenza (`allowSms`, elenchi di canali per categoria) già spiega un canale SMS, ma nessun produttore invia attraverso di esso oggi — rimane riservato per il prodotto SMS bulk, che funziona come un flusso separato e silos tramite `TextingController` / `@churchapps/texting`. |

Le notifiche non lette lasciate a socket o push vengono aumentate dal timer di 30 minuti (`NotificationHelper.escalateDelivery`). L'email batch viene inviata da `NotificationHelper.sendEmailNotifications(frequency)`, guidata dalla preferenza `emailFrequency` di ogni persona: `individual` viene eseguito sul timer di 30 minuti, `daily` viene eseguito al timer di notte. (`weekly` è un valore di preferenza valido ma non ha ancora una corsa batch dedicata.)

## Motore di promemoria

I promemoria programmati — promemoria di eventi, date di scadenza dei compiti, promemoria di servizio/assegnazione del piano — vanno tutti attraverso un motore generalizzato anziché logica cron bespoke per funzione.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Definizioni** (`reminderDefinitions`) sono a livello di entità (`entityId` impostato — un evento, attività o piano specifico) o a livello di ambito (`entityId` null, `scopeId` impostato — ad es. ogni piano sotto un tipo di piano di servizio). Una definizione porta un CSV di offset di minuti (`offsets`, ad es. `"1440,60"` per un giorno e un'ora prima), un'ora di invio locale (`sendLocalTime`), un CSV di canali (`channels` — incluso `email` attiva un'email ricca immediata al momento dell'invio), un `recipientMode`, e un `message` personalizzato facoltativo.

**Espansione** materializza fire rows per l'orizzonte in avanti (una finestra rolling multi-giorno). Viene eseguita sul timer di notte, e in modo sincronico ogni volta che una definizione viene salvata in modo che un promemoria per un evento dell'ultimo minuto si attivi comunque. Le definizioni di ambito si espandono tramite il `loadScopeEntities` dell'adattatore, producendo un set di occorrenze per entità concreta; le occorrenze a livello di entità utilizzano la chiave `definitionId:occurrenceISO:offset`, mentre le occorrenze scoped si denominano tramite id di entità in modo che non collidano mai. L'upsert di un'occorrenza **risorge** una riga precedentemente cancellata — la cancellazione-poi-re-espansione è il modo standard per re-sincronizzare un promemoria dopo il cambio dell'entità sottostante; le righe già `sent`, `failed`, o `processing` vengono lasciate intatte.

**Dispatch** (`ReminderEngine.scan()`) viene eseguito sul timer di 30 minuti. Rivendica occorrenze dovute (un lease previene l'elaborazione doppia), carica i destinatari attraverso l'adattatore dell'entità, filtra via chiunque sia già registrato in `reminderSentLog` per quell'occorrenza, e chiama `createNotifications` con `deliveryStartLevel: 1` (salta direttamente a push) più `emailImmediate`/`emailByPerson` quando i canali della definizione includono email.

Un bus di eventi interno reagisce alle mutazioni di entità senza attendere l'espansione di notte: gli eventi di contenuto (tramite il dispatcher webhook) e gli eventi di aggiornamento piano/attività attivano la re-espansione immediata o la cancellazione per l'entità interessata, e un aggiornamento del piano riespande anche qualsiasi definizione di ambito legata al suo tipo di piano.

### Adattatori

Il motore è agnostico rispetto all'entità; ogni tipo di entità supportato si collega tramite un adattatore (`helpers/adapters/`):

| Tipo di entità | Adattatore | Note |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | I destinatari sono limitati ai registranti o ai membri del gruppo a seconda dell'evento e del `recipientMode`. |
| `plan` | `PlanReminderAdapter` | I destinatari sono assegnazioni del piano Accettate + Non confermate. `buildEmails` chiama in `DoingModuleGateway.buildPlanReminderEmails`, che esegue il rendering di posizioni, note e un messaggio personalizzato tramite `doing/helpers/PlanReminderEmailHelper`, inclusi i pulsanti Accetta/Rifiuta firmati da `ReminderTokenHelper` che inviano a un endpoint di risposta di assegnazione pubblico. |
| `task` | `TaskReminderAdapter` | I destinatari sono i responsabili dell'attività. |

### Endpoint

| Metodo | Percorso | Scopo |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Carica o salva la definizione di promemoria per un'entità. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Carica o salva una definizione di promemoria a livello di ambito (ereditata). |
| `DELETE` | `/messaging/reminders/:defId` | Elimina una definizione e annulla le sue occorrenze in sospeso. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Anteprima del numero di destinatari e dei prossimi tempi di fuoco per un promemoria di evento prima del salvataggio. |
| `GET` | `/messaging/reminders/log` | Cronologia di occorrenza di promemoria recente per una chiesa. |
| `POST` | `/messaging/reminders/mute` | Silenzia i promemoria per un'entità specifica. |

Il salvataggio di una definizione attiva una ri-espansione sincronizzata per quell'entità o ambito, in modo che gli editor vedano "prossimi fuochi" aggiornati senza attendere il lavoro notturno.

## Messaggi diretti

I messaggi diretti guidano lo stesso funnel come tutto il resto anziché un percorso di escalation separato. Ogni conversazione non letta ottiene una **riga shadow** in `notifications` (`contentType='privateMessage'`, `contentId` = l'id del messaggio privato, `category='direct_messages'`) che possiede tutto lo stato di consegna — escalation socket/push/email, tracciamento della lettura, tutto. La tabella `privateMessages` stessa mantiene il payload del messaggio e una colonna `notifyPersonId`, che è la fonte del badge non letto e si azzera quando il destinatario legge la conversazione.

Le righe shadow sono invisibili alla campana delle notifiche: vengono escluse dalla query del conteggio non letto, dalla query dell'elenco di notificazione e dalle query di lettura/eliminazione contrassegnate, che tutte filtrano `contentType <> 'privateMessage'`. Ogni ping DM colpisce il socket indipendentemente dallo stato non letto (semantica chat dal vivo — nessun dedup), e i DM non si fermano mai alla consegna del socket come fanno le notifiche ordinarie, poiché un PWA in background può mantenere un socket aperto mentre aveva comunque bisogno di un push a livello del sistema operativo. Se una persona silenzia le notifiche DM, la riga shadow è parcheggiata (`isNew=false`, `notifyPersonId` azzerato) — ancora visibile all'interno della conversazione stessa, solo senza badge o avvisi.

## Preferenze e gating

Ogni invio passa attraverso `PreferenceGateHelper.evaluate()`, una funzione pura (tutto lo stato passato in, nessuna chiamata DB sul percorso caldo) che restituisce `allow`, `suppress`, o `defer`. I livelli vengono eseguiti in ordine, e il primo che decide vince:

1. **Categoria bloccata** — alcune categorie sono obbligatorie (livello 0) e bypass ogni altro livello.
2. **Master mute / channel kill** — `masterMute`, `allowPush`, `allowSms`, o `emailFrequency='never'` sopprimono completamente.
3. **Ore tranquille** — solo push e SMS (l'email è considerata non intrusiva). Se l'ora della parete corrente nel fuso orario della persona rientra nella loro finestra tranquilla, una categoria transazionale passa comunque; una non transazionale viene rinviata alla fine della finestra tranquilla, calcolata come un istante UTC corretto per DST tramite `TimezoneHelper.wallClockToUtc`.
4. **Override di preferenza per categoria** — un opt-out esplicito per una coppia categoria × canale; l'assenza significa l'impostazione predefinita della categoria.
5. **Mute per entità** — un mute registrato contro un'entità specifica (ad es. un evento, un piano) vincola ulteriormente l'impostazione a livello di categoria, ma si applica solo quando il chiamante fornisce un id/tipo di entità accanto alla notifica.

Tabelle coinvolte: `notificationPreferences` (globale — `masterMute`, `emailFrequency` di `individual|daily|weekly|never`, `allowPush`, finestra di ore tranquille + fuso orario, `allowSms`), `notificationPreferenceOverrides` (per categoria × canale), e `notificationEntityMutes` (per entità).

Questo gate è applicato per in-app (livello 0), push (livello 1), e email (livello 2) all'interno del funnel — incluse immediate reminder/digest email. L'email transazionale (codici di autenticazione, ripristini di password, inviti, ricevute di donazione) bypass per design; quello è l'intero punto della seconda porta.

## Limiti email redatti da chiesa

L'email il cui contenuto una chiesa ha scritto esce dall'identità SES condivisa di ChurchApps, quindi è misurata per chiesa da `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Quattro percorsi la chiamano: invia di gruppo/template (`EmailTemplateController`, tipo di contenuto `email`), email di follow-up di modulo (`FormSubmissionController`, `formFollowUp`), azioni di workflow **Invia email** (`NotificationHelper` con `churchAuthored`, `workflowEmail`), e inviti di account B1 (`UserController.sendInviteEmail`, `invite`). La posta di sistema (codici di autenticazione, ricevute, promemoria) non è misurata.

- **Gate di approvazione.** Una chiesa non invia nulla fino a quando un amministratore del server imposta `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → chip **Group Email**). Le chiese archiviate sono sempre bloccate. La finestra di dialogo Invia email di B1Admin legge `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) e, se non approvata, mostra una scheda **Richiedi revisione** invece dell'editor. `POST /messaging/emailTemplates/requestApproval` invia supporto, al massimo una volta per chiesa per settimana.
- **Allowance guadagnato.** Una chiesa approvata ottiene `max(150, 2 × il suo miglior giorno redatto da chiesa negli ultimi 30 giorni)`, limitato a 2.000 per 24 ore rotanti. Le attuali 24 ore sono escluse dal "miglior giorno" in modo che un picco non possa aumentare il suo limite proprio.
- **Riserva, quindi risolvi.** `reserve()` scrive una riga `deliveryLogs` per destinatario prima di inviare, ri-controlla l'allowance con quelle righe conteggiate, e si ritira se due richieste hanno corse passato il limite (l'invio restituisce 429). `settle()` contrassegna ogni riga inviata o non riuscita.
- **Pausa reclamo.** La Lambda `sesFeedback` (`Api/src/lambda/ses-feedback-handler.ts`, alimentata da SES → SNS) fissa ogni rimbalzo permanente o reclamo alla chiesa il cui email redatto da chiesa ha raggiunto quell'indirizzo intorno a quell'ora, archiviato come `deliveryMethod` `sesBounce` / `sesComplaint`. Una chiesa è messa in pausa a 2+ reclami (≥ 0,3% degli invii) o 10+ rimbalzi duri (≥ 5%) su 7 giorni.

## Programmazione

Sia il motore di promemoria che il digest di notificazione guidano i timer programmati esistenti anziché introdurre nuove infrastrutture:

| Timer | Programma | Esecuzioni |
|-------|----------|------|
| Timer di 30 minuti | ogni 30 minuti | Aumenta le notifiche non lette; invia email digest con frequenza `individual`; invia occorrenze di promemoria dovute (`ReminderEngine.scan`); digest di approvazione; esecuzioni di automazione dovute |
| Timer notturno | 05:00 UTC | Promemoria di frequenza di partecipazione a gruppi; servizi di streaming ricorrenti avanzati; elenchi di auto-aggiornamento di refresh; espandi occorrenze di promemoria per il prossimo orizzonte (`ReminderEngine.expandAll`); invia email digest con frequenza `daily` |

Localmente, la stessa logica può essere attivata su richiesta con `npm run timer:30min` e `npm run timer:midnight` dal progetto `Api`.

## Inventario file

| Area | File |
|------|-------|
| Funnel | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Ingresso condiviso | `Api/src/shared/helpers/NotificationService.ts` |
| Porta transazionale | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, lint rule `Api/tools/eslint-rules/email-door.cjs` |
| Limiti email chiesa | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Motore di promemoria | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Repository di promemoria | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Email di servizio/piano | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Editor di promemoria (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx` |
| Editor di promemoria / preferenze (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Pagine correlate

- [Real-time Architecture](../realtime) — il protocollo WebSocket e i primitivi client (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) su cui il livello di consegna in-app cavalca
- [Web Push Notifications](../web-push) — setup VAPID e il percorso della Push API del browser utilizzato dal livello di escalation push
- [Messaging Endpoints](../api/endpoints/messaging) — superficie REST completa per messaggi, conversazioni, connessioni, e notification/reminder routes
