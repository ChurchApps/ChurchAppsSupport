---
title: "Architettura notifiche e promemoria"
---

# Architettura notifiche e promemoria

<div class="article-intro">

Ogni messaggio che un membro della chiesa vede al di fuori della pagina che sta guardando — un conteggio di badge, una notifica push, un'email digest — passa attraverso una delle due porte in MessagingApi. Questa pagina documenta l'imbuto, il motore di promemoria che lo alimenta su programma, e il modello di preferenza che decide cosa effettivamente raggiunge una persona.

</div>

## Panoramica — due porte

```
qualcosa di programmato ──▶ ReminderEngine (definizioni → occorrenze → scansione) ─┐
chat / richieste / workflow / invii bulk ──────────────────────────────────────────┼─▶ createNotifications()
                                                                                  │    in_app gate → socket → push → email (→ slot sms)
posta account/legale ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Tutto ciò che dice a una persona qualcosa** passa attraverso `NotificationHelper.createNotifications()` nel modulo di messaggistica. Persiste una riga `notifications` e scala socket → push → email, valutando `PreferenceGateHelper` per canale — incluso `in_app` al livello 0.
2. **Tutto ciò che è programmato** è un `reminderDefinition` (a livello di entità o di scope) espanso in `reminderOccurrences` e inviato da `ReminderEngine.scan()` su un timer ricorrente. Un expander, un dispatcher, un libro mastro di invio (`reminderSentLog`).
3. **Email diretta** esiste solo dietro `TransactionalEmailHelper.sendTransactional()`. Una regola ESLint applica questo al tempo di compilazione — vedi sotto.

:::tip La porta email è lint-applicata, non solo convenzione
`Api/tools/eslint-rules/email-door.cjs` definisce `no-direct-email-helper`: qualsiasi chiamata a `EmailHelper.sendTemplatedEmail()` o `EmailHelper.sendEmail()` fuori da `NotificationHelper.ts` o `TransactionalEmailHelper.ts` fallisce il lint. Se hai bisogno di inviare un'email, instradala attraverso l'imbuto (`createNotifications` con `emailImmediate`) o attraverso `TransactionalEmailHelper.sendTransactional()` — non c'è una terza via che passa CI.
:::

## L'imbuto di notificazione

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
    category?: string;                // asse di preferenza; ricavato da contentType se omesso
    emailByPerson?: Record<string, { subject: string; html: string }>;
    emailImmediate?: boolean;         // invia email ora invece di aspettare il digest
  }
)
```

Per ogni destinatario salva una riga in `notifications` e chiama `attemptDeliveryWithEscalation`, che percorre la scala di canale sotto. Una riga ancora non letta per lo stesso `(contentType, contentId)` sopprime la ricreazione — questa protezione di dedup è saltata per invii `emailImmediate` (offset di promemoria, staff "email all", passaggi del workflow hanno il loro proprio dedup) e per messaggi diretti, che sempre eseguono il ping del socket.

`shared/helpers/NotificationService.ts` rispecchia la stessa firma (`NotificationServiceOptions`) per i chiamanti al di fuori del modulo di messaggistica ed è registrato con il modulo di messaggistica al boot.

## Catena di escalation dei canali

La consegna inizia a un livello (0 per default, o superiore per promemoria/invii espliciti) e procede solo al canale successivo se il precedente non ha avuto successo. Ogni livello è controllato da `PreferenceGateHelper` prima di tentare qualsiasi cosa.

| Livello | Canale | Comportamento |
|-------|---------|----------|
| 0 | **in_app / socket** | Il gate `in_app` viene controllato per primo. Se soppresso (muto), la riga è persistita con `isNew=false` e la consegna si ferma interamente — nessun ping socket, nessun badge, nessun ulteriore escalation. Altrimenti il server cerca connessioni socket aperte per la stanza `alerts` della persona e spinge un frame `notification` (o `privateMessage`). Per le notifiche ordinarie, una consegna socket riuscita ferma la catena qui — il timer di 30 minuti ricontrolla gli elementi non letti e li scala più tardi. I messaggi diretti non si fermano mai al socket: un PWA installato può mantenere aperto il socket di alert in background, il che altrimenti sopprirebbe il push a livello di SO. |
| 1 | **push** | Controllato su `allowPush` / opt-out categoria / ore silenziose. Invia a token Expo push e sottoscrizioni Web Push trovati sulle righe `devices` della persona, deduplicando per endpoint e potando token stantii lungo la strada. |
| 2 | **email** | Controllato su `emailFrequency` e opt-out categoria. I invii immediati (`emailImmediate`) renderizzano subito e scrivono una riga `deliveryLogs`; altrimenti la notifica viene lasciata in sospeso per il digest batch, descritto sotto. |
| — | **sms** | L'impianto di preferenza (`allowSms`, elenchi di canali per categoria) già tiene conto di un canale SMS, ma nessun produttore invia attraverso di esso oggi — rimane riservato per il prodotto SMS bulk, che esegue come un flusso separato e silos tramite `TextingController` / `@churchapps/texting`. |

Le notifiche non lette lasciate al socket o push vengono scalate dal timer di 30 minuti (`NotificationHelper.escalateDelivery`). L'email batch viene inviata da `NotificationHelper.sendEmailNotifications(frequency)`, guidata dalla preferenza `emailFrequency` di ogni persona: `individual` esegue sul timer di 30 minuti, `daily` esegue sul timer notturno. (`weekly` è un valore di preferenza valido ma non ha ancora una corsa batch dedicata.)

## Motore di promemoria

I promemoria programmati — promemoria di evento, date di scadenza di attività, promemoria di assegnazione di servizio/piano — tutti passano attraverso un motore generalizzato invece di logica cron bespoke per-feature.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 offset/canali/messaggio       una riga per (definition,              deliveryStartLevel: 1
 a livello di entità o scope   entità, occurrence, offset)           + libro mastro reminderSentLog
```

**Definizioni** (`reminderDefinitions`) sono a livello di entità (`entityId` impostato — un evento, attività, o piano specifico) o a livello di scope (`entityId` null, `scopeId` impostato — ad es. ogni piano sotto un tipo di piano di servizio). Una definizione porta un CSV di offset di minuti (`offsets`, ad es. `"1440,60"` per un giorno e un'ora prima), un'ora di invio locale (`sendLocalTime`), un CSV di canali (`channels` — incluso `email` attiva un'email ricca immediata al tempo di invio), una `recipientMode`, e un `message` personalizzato opzionale.

**Espansione** materializza righe di fuoco per l'orizzonte avanti (una finestra multi-giorno mobile). Esegue sul timer notturno, e sincronicamente ogni volta che una definizione viene salvata in modo che un promemoria per un evento dell'ultimo minuto si attivi ancora. Le definizioni di scope si fan out tramite l'`loadScopeEntities` dell'adattatore, producendo un insieme di occorrenza per entità concreta; le occorrenze a livello di entità usano la chiave `definitionId:occurrenceISO:offset`, mentre le occorrenze scoped namespace da id entità in modo che non si scontrino mai. Upserting un'occorrenza **risorge** una riga precedentemente cancellata — cancel-then-re-expand è il modo standard di ri-sincronizzare un promemoria dopo che l'entità sottostante cambia; le righe già `sent`, `failed`, o `processing` vengono lasciate intatte.

**Dispatch** (`ReminderEngine.scan()`) esegue sul timer di 30 minuti. Sostiene le occorrenze dovute (un lease impedisce il double-processing), carica i destinatari attraverso l'adattatore dell'entità, filtra chiunque già registrato in `reminderSentLog` per quella occorrenza, e chiama `createNotifications` con `deliveryStartLevel: 1` (salta diritto a push) più `emailImmediate`/`emailByPerson` quando i canali della definizione includono email.

Un bus di evento interno reagisce alle mutazioni di entità senza aspettare l'espansione notturna: gli eventi di contenuto (tramite il dispatcher webhook) e gli eventi di aggiornamento di piano/attività attivano l'espansione immediata o la cancellazione per l'entità interessata, e un aggiornamento di piano ri-espande anche qualsiasi definizione di scope legata al suo tipo di piano.

### Adattatori

Il motore è entity-agnostic; ogni tipo di entità supportato si collega attraverso un adattatore (`helpers/adapters/`):

| Tipo di entità | Adattatore | Note |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | I destinatari sono scoped ai registranti o ai membri del gruppo a seconda dell'evento e `recipientMode`. |
| `plan` | `PlanReminderAdapter` | I destinatari sono gli incarichi di piano Accepted + Unconfirmed. `buildEmails` chiama in `DoingModuleGateway.buildPlanReminderEmails`, che renderizza posizioni, note, e un messaggio personalizzato tramite `doing/helpers/PlanReminderEmailHelper`, inclusi pulsanti Accept/Decline firmati da `ReminderTokenHelper` che postano a un endpoint di risposta di assegnazione pubblica. |
| `task` | `TaskReminderAdapter` | I destinatari sono gli assegnatari del compito. |

### Endpoint

| Metodo | Percorso | Scopo |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Carica o salva la definizione di promemoria per un'entità. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Carica o salva una definizione di promemoria a livello di scope (ereditato). |
| `DELETE` | `/messaging/reminders/:defId` | Elimina una definizione e cancella le sue occorrenze in sospeso. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Anteprima conteggio destinatari e prossimi tempi di fuoco per un promemoria di evento prima di salvare. |
| `GET` | `/messaging/reminders/log` | Cronologia recente di occorrenza di promemoria per una chiesa. |
| `POST` | `/messaging/reminders/mute` | Muta i promemoria per un'entità specifica. |

Salvare una definizione attiva una ri-espansione sincrona per quella entità o scope, in modo che gli editor vedano "prossimi fuochi" aggiornati senza aspettare il lavoro notturno.

## Messaggi diretti

I messaggi diretti percorrono lo stesso imbuto di tutto il resto piuttosto che un percorso di escalation separato. Ogni conversazione non letta ottiene una **riga shadow** in `notifications` (`contentType='privateMessage'`, `contentId` = l'id del messaggio privato, `category='direct_messages'`) che possiede tutto lo stato di consegna — escalation socket/push/email, tracciamento lettura, tutto. La tabella `privateMessages` stessa mantiene il payload del messaggio e una colonna `notifyPersonId`, che è la fonte del badge non letto e viene cancellata quando il destinatario legge la conversazione.

Le righe shadow sono invisibili alla campana di notifiche: sono escluse dalla query del conteggio non letto, dalla query della lista di notifiche, e dalle query mark-read/delete, tutte che filtrano `contentType <> 'privateMessage'`. Ogni ping DM colpisce il socket indipendentemente dallo stato non letto (semantica di chat dal vivo — no dedup), e i DM non si fermano mai alla consegna socket come fanno le notifiche ordinarie, poiché un PWA in background può mantenere aperto un socket mentre ha ancora bisogno di un push a livello di SO. Se una persona muta le notifiche DM, la riga shadow è parcheggiata (`isNew=false`, `notifyPersonId` cancellato) — ancora visibile all'interno della conversazione stessa, solo senza badge o avvisi.

## Preferenze e controllo

Ogni invio passa attraverso `PreferenceGateHelper.evaluate()`, una funzione pura (tutto lo stato passato in, nessuna chiamata DB sul percorso caldo) che ritorna `allow`, `suppress`, o `defer`. I livelli eseguono in ordine, e il primo che decide vince:

1. **Categoria bloccata** — alcune categorie sono obbligatorie (livello 0) e bypassano ogni altro livello.
2. **Master mute / channel kill** — `masterMute`, `allowPush`, `allowSms`, o `emailFrequency='never'` sopprimono esplicitamente.
3. **Ore silenziose** — solo push e SMS (l'email è considerata non intrusiva). Se l'ora attuale del muro nel fuso orario della persona cade nella loro finestra silenziosa, una categoria transazionale passa lo stesso; una non transazionale è differita alla fine della finestra silenziosa, calcolata come istante UTC corretto per DST tramite `TimezoneHelper.wallClockToUtc`.
4. **Override di preferenza per categoria** — un opt-out esplicito per una coppia categoria × canale; l'assenza significa il default della categoria.
5. **Mute per entità** — un mute registrato contro un'entità specifica (ad es. un evento, un piano) restringe più che l'impostazione a livello di categoria, ma si applica solo quando il chiamante fornisce un tipo/id entità insieme alla notifica.

Tabelle coinvolte: `notificationPreferences` (globale — `masterMute`, `emailFrequency` di `individual|daily|weekly|never`, `allowPush`, finestra ore silenziose + fuso orario, `allowSms`), `notificationPreferenceOverrides` (per categoria × canale), e `notificationEntityMutes` (per entità).

Questo gate è applicato per in-app (livello 0), push (livello 1), e email (livello 2) dentro l'imbuto — incluse email di promemoria/digest immediato. L'email transazionale (codici di auth, ripristini di password, inviti, ricevute di donazione) lo bypassa per design; questo è l'intero punto della seconda porta.

## Pianificazione

Sia il motore di promemoria che il digest di notifiche cavalcano timer programmati esistenti piuttosto che introdurre nuova infrastruttura:

| Timer | Programma | Esegue |
|-------|----------|------|
| Timer di 30 minuti | ogni 30 minuti | Scala le notifiche non lette; invia email digest di frequenza `individual`; dispatch occorrenze di promemoria dovute (`ReminderEngine.scan`); digest di approvazione; esecuzioni di automazione dovuta |
| Timer notturno | 05:00 UTC | Promemoria di frequenza di partecipazione di gruppo; avanza servizi di streaming ricorrenti; aggiorna elenchi auto-refresh; espandi occorrenze di promemoria per il prossimo orizzonte (`ReminderEngine.expandAll`); invia email digest di frequenza `daily` |

Localmente, la stessa logica può essere attivata su richiesta con `npm run timer:30min` e `npm run timer:midnight` dal progetto `Api`.

## Inventario file

| Area | File |
|------|-------|
| Imbuto | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Ingresso condiviso | `Api/src/shared/helpers/NotificationService.ts` |
| Porta transazionale | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, regola di lint `Api/tools/eslint-rules/email-door.cjs` |
| Motore di promemoria | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Repository di promemoria | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Email di servizio/piano | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Editor di promemoria (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx` |
| Editor di promemoria / preferenze (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Pagine correlate

- [Architettura in tempo reale](../realtime) — il protocollo WebSocket e i primitivi client (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) su cui cavalca il livello di consegna in-app
- [Notifiche push del web](../web-push) — setup VAPID e il percorso Browser Push API usato dal livello di escalation push
- [Endpoint di messaggistica](../api/endpoints/messaging) — superficie REST completa per messaggi, conversazioni, connessioni, e rotte di notifica/promemoria
