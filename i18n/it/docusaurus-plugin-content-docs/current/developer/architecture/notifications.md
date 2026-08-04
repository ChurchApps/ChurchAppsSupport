---
title: "Architettura di notifiche e promemoria"
---

# Architettura di notifiche e promemoria

<div class="article-intro">

Ogni messaggio che un membro della chiesa vede al di fuori della pagina che sta guardando — un conteggio badge, una notifica push, un'email digest — passa attraverso una delle due porte in MessagingApi. Questa pagina documenta l'imbuto, il motore di promemoria che lo alimenta secondo una pianificazione, e il modello di preferenze che decide cosa raggiunge effettivamente una persona.

</div>

## Panoramica — due porte

```
qualsiasi cosa programmata ──▶ ReminderEngine (definizioni → occorrenze → scansione) ─┐
chat / richieste / workflow / invii in blocco ─────────────────────────────────────────┼─▶ createNotifications()
                                                                                        │    gate in_app → socket → push → email (→ slot sms)
posta account/legale ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, applicato via lint]
```

1. **Tutto ciò che comunica qualcosa a una persona** passa attraverso `NotificationHelper.createNotifications()` nel modulo di messaggistica. Persiste una riga `notifications` ed esegue l'escalation socket → push → email, valutando `PreferenceGateHelper` per canale — incluso `in_app` al livello 0.
2. **Tutto ciò che è programmato** è un `reminderDefinition` (a livello di entità o di scope) espanso in `reminderOccurrences` e inviato da `ReminderEngine.scan()` su un timer ricorrente. Un solo expander, un solo dispatcher, un solo registro di invio (`reminderSentLog`).
3. **L'email diretta** esiste solo dietro `TransactionalEmailHelper.sendTransactional()`. Una regola ESLint la applica in fase di compilazione — vedi sotto.

:::tip La porta email è applicata via lint, non solo per convenzione
`Api/tools/eslint-rules/email-door.cjs` definisce `no-direct-email-helper`: qualsiasi chiamata a `EmailHelper.sendTemplatedEmail()` o `EmailHelper.sendEmail()` al di fuori di `NotificationHelper.ts` o `TransactionalEmailHelper.ts` fa fallire il lint. Se hai bisogno di inviare un'email, instradala attraverso l'imbuto (`createNotifications` con `emailImmediate`) o attraverso `TransactionalEmailHelper.sendTransactional()` — non esiste una terza via che passi la CI.
:::

## L'imbuto delle notifiche

`NotificationHelper.createNotifications()` è il punto di ingresso unico per tutto ciò che non è programmato o transazionale:

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
    deliveryStartLevel?: number;      // 0 socket (default), 1 push, 2 solo-email
    category?: string;                // asse di preferenza; derivato da contentType se omesso
    emailByPerson?: Record<string, { subject: string; html: string }>;
    emailImmediate?: boolean;         // invia l'email ora invece di aspettare il digest
  }
)
```

Per ogni destinatario salva una riga in `notifications` e chiama `attemptDeliveryWithEscalation`, che percorre la scala di canali qui sotto. Una riga ancora non letta per la stessa coppia `(contentType, contentId)` sopprime la ricreazione — questo guard anti-duplicazione viene saltato per gli invii `emailImmediate` (gli offset dei promemoria, l'"email a tutti" dello staff, i passaggi del workflow gestiscono la propria deduplicazione) e per i messaggi diretti, che fanno sempre il ping del socket.

`shared/helpers/NotificationService.ts` rispecchia la stessa firma (`NotificationServiceOptions`) per i chiamanti al di fuori del modulo di messaggistica ed è registrato con il modulo di messaggistica all'avvio.

## Catena di escalation dei canali

La consegna inizia a un livello (0 per default, o superiore per promemoria/invii espliciti) e prosegue al canale successivo solo se il precedente non ha avuto successo. Ogni livello è controllato da `PreferenceGateHelper` prima che venga tentato qualsiasi cosa.

| Livello | Canale | Comportamento |
|-------|---------|----------|
| 0 | **in_app / socket** | Il gate `in_app` viene controllato per primo. Se soppresso (silenziato), la riga viene persistita con `isNew=false` e la consegna si ferma completamente — nessun ping socket, nessun badge, nessuna ulteriore escalation. Altrimenti il server cerca connessioni socket aperte per la stanza `alerts` della persona e invia un frame `notification` (o `privateMessage`). Per le notifiche ordinarie, una consegna socket riuscita ferma qui la catena — il timer di 30 minuti ricontrolla gli elementi non letti e li fa escalare più tardi. I messaggi diretti non si fermano mai al socket: una PWA installata può mantenere aperto il socket degli alert in background, il che altrimenti sopprimerebbe il push a livello di sistema operativo. |
| 1 | **push** | Controllato su `allowPush` / opt-out di categoria / ore di silenzio. Invia sia ai token Expo push che alle sottoscrizioni Web Push trovate sulle righe `devices` della persona, deduplicando per endpoint e potando i token obsoleti lungo il percorso. |
| 2 | **email** | Controllato su `emailFrequency` e opt-out di categoria. Gli invii immediati (`emailImmediate`) vengono renderizzati subito e scrivono una riga `deliveryLogs`; altrimenti la notifica resta in sospeso per il digest in batch, descritto sotto. |
| — | **sms** | L'impianto di preferenze (`allowSms`, elenchi di canali per categoria) tiene già conto di un canale SMS, ma nessun produttore invia attraverso di esso oggi — resta riservato per il prodotto SMS in blocco, che gira come un flusso separato e isolato tramite `TextingController` / `@churchapps/texting`. |

Le notifiche non lette rimaste al livello socket o push vengono fatte escalare dal timer di 30 minuti (`NotificationHelper.escalateDelivery`). L'email in batch viene inviata da `NotificationHelper.sendEmailNotifications(frequency)`, guidata dalla preferenza `emailFrequency` di ogni persona: `individual` gira sul timer di 30 minuti, `daily` gira sul timer notturno. (`weekly` è un valore di preferenza valido ma non ha ancora un'esecuzione batch dedicata.)

## Motore di promemoria

I promemoria programmati — promemoria di evento, scadenze di attività, promemoria di assegnazione a servizio/piano — passano tutti attraverso un motore generalizzato invece di una logica cron su misura per funzionalità.

```
reminderDefinitions ──espande──▶ reminderOccurrences ──scansiona (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 offset/canali/messaggio        una riga per (definition,             deliveryStartLevel: 1
 a livello entità o scope       entity, occurrence, offset)          + registro reminderSentLog
```

**Le definizioni** (`reminderDefinitions`) sono a livello di entità (`entityId` impostato — un evento, un'attività, o un piano specifico) oppure a livello di scope (`entityId` null, `scopeId` impostato — ad es. ogni piano sotto un tipo di piano di servizio). Una definizione porta un CSV di offset in minuti (`offsets`, ad es. `"1440,60"` per un giorno e un'ora prima), un orario di invio locale (`sendLocalTime`), un CSV di canali (`channels` — includere `email` attiva un'email ricca immediata al momento dell'invio), una `recipientMode`, e un `message` personalizzato opzionale.

**L'espansione** materializza righe di attivazione per l'orizzonte futuro (una finestra mobile multi-giorno). Gira sul timer notturno, e in modo sincrono ogni volta che una definizione viene salvata, così un promemoria per un evento dell'ultimo minuto si attiva comunque. Le definizioni di scope si espandono tramite `loadScopeEntities` dell'adattatore, producendo un insieme di occorrenze per ogni entità concreta; le occorrenze a livello di entità usano la chiave `definitionId:occurrenceISO:offset`, mentre le occorrenze scoped hanno un namespace per id entità così non collidono mai. Fare upsert di un'occorrenza **resuscita** una riga precedentemente cancellata — cancella-poi-ri-espandi è il modo standard per ri-sincronizzare un promemoria dopo che l'entità sottostante cambia; le righe già `sent`, `failed`, o `processing` vengono lasciate intatte.

**Il dispatch** (`ReminderEngine.scan()`) gira sul timer di 30 minuti. Rivendica le occorrenze scadute (un lease impedisce l'elaborazione doppia), carica i destinatari tramite l'adattatore dell'entità, filtra chi è già registrato in `reminderSentLog` per quella occorrenza, e chiama `createNotifications` con `deliveryStartLevel: 1` (salta direttamente al push) più `emailImmediate`/`emailByPerson` quando i canali della definizione includono l'email.

Un bus di eventi interno reagisce alle mutazioni delle entità senza aspettare l'espansione notturna: gli eventi di contenuto (tramite il dispatcher webhook) e gli eventi di aggiornamento piano/attività attivano una ri-espansione o cancellazione immediata per l'entità interessata, e un aggiornamento di piano ri-espande anche qualsiasi definizione di scope legata al suo tipo di piano.

### Adattatori

Il motore è indipendente dal tipo di entità; ogni tipo di entità supportato si collega tramite un adattatore (`helpers/adapters/`):

| Tipo di entità | Adattatore | Note |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | I destinatari sono limitati agli iscritti o ai membri del gruppo a seconda dell'evento e della `recipientMode`. |
| `plan` | `PlanReminderAdapter` | I destinatari sono le assegnazioni di piano Accettate + Non confermate. `buildEmails` chiama `DoingModuleGateway.buildPlanReminderEmails`, che renderizza posizioni, note, e un messaggio personalizzato tramite `doing/helpers/PlanReminderEmailHelper`, inclusi pulsanti Accetta/Rifiuta firmati da `ReminderTokenHelper` che inviano a un endpoint pubblico di risposta all'assegnazione. |
| `task` | `TaskReminderAdapter` | I destinatari sono gli assegnatari dell'attività. |

### Endpoint

| Metodo | Percorso | Scopo |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Carica o salva la definizione di promemoria per un'entità. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Carica o salva una definizione di promemoria a livello di scope (ereditata). |
| `DELETE` | `/messaging/reminders/:defId` | Elimina una definizione e cancella le sue occorrenze in sospeso. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Anteprima del conteggio dei destinatari e dei prossimi orari di attivazione per un promemoria evento prima di salvare. |
| `GET` | `/messaging/reminders/log` | Cronologia recente delle occorrenze di promemoria per una chiesa. |
| `POST` | `/messaging/reminders/mute` | Silenzia i promemoria per un'entità specifica. |

Salvare una definizione attiva una ri-espansione sincrona per quella entità o scope, così gli editor vedono le "prossime attivazioni" aggiornate senza aspettare il lavoro notturno.

## Messaggi diretti

I messaggi diretti percorrono lo stesso imbuto di tutto il resto invece di un percorso di escalation separato. Ogni conversazione non letta ottiene una singola **riga ombra** in `notifications` (`contentType='privateMessage'`, `contentId` = l'id del messaggio privato, `category='direct_messages'`) che possiede tutto lo stato di consegna — escalation socket/push/email, tracciamento della lettura, tutto. La tabella `privateMessages` stessa mantiene il payload del messaggio e una colonna `notifyPersonId`, che è la fonte del badge non letto e viene cancellata quando il destinatario legge la conversazione.

Le righe ombra sono invisibili alla campanella delle notifiche: sono escluse dalla query del conteggio non letto, dalla query dell'elenco notifiche, e dalle query di segna-come-letto/elimina, che filtrano tutte `contentType <> 'privateMessage'`. Ogni ping DM colpisce il socket indipendentemente dallo stato non letto (semantica di chat dal vivo — nessuna deduplicazione), e i DM non si fermano mai alla consegna via socket come fanno le notifiche ordinarie, poiché una PWA in background può mantenere un socket aperto pur avendo ancora bisogno di un push a livello di sistema operativo. Se una persona silenzia le notifiche DM, la riga ombra viene parcheggiata (`isNew=false`, `notifyPersonId` cancellato) — ancora visibile all'interno della conversazione stessa, solo senza badge o avvisi.

## Preferenze e gating

Ogni invio passa attraverso `PreferenceGateHelper.evaluate()`, una funzione pura (tutto lo stato viene passato in ingresso, nessuna chiamata al DB nel percorso caldo) che restituisce `allow`, `suppress`, o `defer`. I livelli vengono eseguiti in ordine, e il primo che decide vince:

1. **Categoria bloccata** — alcune categorie sono obbligatorie (livello 0) e bypassano ogni altro livello.
2. **Silenziamento globale / interruzione del canale** — `masterMute`, `allowPush`, `allowSms`, o `emailFrequency='never'` sopprimono direttamente.
3. **Ore di silenzio** — solo push e SMS (l'email è considerata non intrusiva). Se l'ora attuale nel fuso orario della persona ricade nella loro finestra di silenzio, una categoria transazionale passa comunque; una non transazionale viene rimandata alla fine della finestra di silenzio, calcolata come istante UTC corretto per l'ora legale tramite `TimezoneHelper.wallClockToUtc`.
4. **Override di preferenza per categoria** — un opt-out esplicito per una coppia categoria × canale; l'assenza significa il default della categoria.
5. **Silenziamento per entità** — un silenziamento registrato contro un'entità specifica (ad es. un evento, un piano) restringe più dell'impostazione a livello di categoria, ma si applica solo quando il chiamante fornisce un id/tipo di entità insieme alla notifica.

Tabelle coinvolte: `notificationPreferences` (globale — `masterMute`, `emailFrequency` tra `individual|daily|weekly|never`, `allowPush`, finestra ore di silenzio + fuso orario, `allowSms`), `notificationPreferenceOverrides` (per categoria × canale), e `notificationEntityMutes` (per entità).

Questo gate è applicato per l'in-app (livello 0), il push (livello 1), e l'email (livello 2) dentro l'imbuto — incluse le email di promemoria/digest immediate. L'email transazionale (codici di autenticazione, reset password, inviti, ricevute di donazione) lo bypassa per design; questo è l'intero scopo della seconda porta.

## Pianificazione

Sia il motore di promemoria sia il digest delle notifiche cavalcano timer programmati esistenti invece di introdurre nuova infrastruttura:

| Timer | Pianificazione | Esegue |
|-------|----------|------|
| Timer da 30 minuti | ogni 30 minuti | Fa l'escalation delle notifiche non lette; invia le email digest a frequenza `individual`; invia le occorrenze di promemoria scadute (`ReminderEngine.scan`); digest di approvazione; esecuzioni di automazione scadute |
| Timer notturno | 05:00 UTC | Promemoria di presenza di gruppo; avanza i servizi in streaming ricorrenti; aggiorna gli elenchi auto-refresh; espande le occorrenze di promemoria per il prossimo orizzonte (`ReminderEngine.expandAll`); invia le email digest a frequenza `daily` |

Localmente, la stessa logica può essere attivata su richiesta con `npm run timer:30min` e `npm run timer:midnight` dal progetto `Api`.

## Inventario dei file

| Area | File |
|------|-------|
| Imbuto | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Ingresso condiviso | `Api/src/shared/helpers/NotificationService.ts` |
| Porta transazionale | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, regola di lint `Api/tools/eslint-rules/email-door.cjs` |
| Motore di promemoria | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Repository dei promemoria | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Email di servizio/piano | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Editor dei promemoria (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx` |
| Editor promemoria / preferenze (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Pagine correlate

- [Architettura in tempo reale](../realtime) — il protocollo WebSocket e i primitivi client (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) su cui si basa il livello di consegna in-app
- [Notifiche push web](../web-push) — la configurazione VAPID e il percorso Browser Push API usato dal livello di escalation push
- [Endpoint di messaging](../api/endpoints/messaging) — superficie REST completa per messaggi, conversazioni, connessioni, e rotte di notifica/promemoria
