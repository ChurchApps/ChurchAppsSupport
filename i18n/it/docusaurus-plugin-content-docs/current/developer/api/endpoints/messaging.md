---
title: "Endpoint di messaggistica"
description: "Riferimento per gli endpoint API di messaggistica di ChurchApps: conversazioni, regole di accesso alle note, SMS, modelli email, notifiche e dispositivi."
---

# Endpoint di messaggistica

<div class="article-intro">

Il modulo Messaging gestisce conversazioni in tempo reale, messaggi di chat, notifiche push, invio di SMS/email, connessioni WebSocket, messaggi privati, registrazione dei dispositivi e provider di messaggistica. Fornisce il livello di comunicazione usato da tutte le applicazioni ChurchApps, sia per la chat delle dirette streaming sia per le notifiche asincrone.

</div>

**Percorso base:** `/messaging`

## Conversazioni {#conversations}

Percorso base: `/messaging/conversations`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Carica le conversazioni per ID separati da virgola, con primo e ultimo messaggio |
| GET | `/messages/:contentType/:contentId` | JWT | — | Carica le conversazioni di un contenuto con messaggi paginati (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Ottiene le conversazioni di tipo post dei gruppi dell'utente corrente |
| GET | `/posts/group/:groupId` | JWT | — | Ottiene le conversazioni di tipo post di un gruppo specifico |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Le note più recenti di tutti i record per la pagina Note di B1 Admin. `section` è `people`, `groups`, `events` o `workflows` (altrimenti 400); `limit` vale 25 di default (massimo 100); `before` è il cursore della pagina precedente. Ogni nota passa comunque la regola del proprio tipo (permesso People Edit / note riservate, leader del gruppo, visualizzatori dell'evento, visualizzatori della scheda del flusso di lavoro), quindi i chiamanti vedono solo le note che potrebbero aprire. Il testo della nota è troncato a 300 caratteri |
| GET | `/current/:churchId/:contentType/:contentId` | Pubblico | — | Ottiene o crea la conversazione corrente per il contenuto (decifra automaticamente contentId) |
| GET | `/:churchId/:contentType/:contentId` | Pubblico | — | Carica le conversazioni per tipo di contenuto e ID |
| GET | `/:churchId/:id` | Pubblico | — | Carica una singola conversazione tramite ID |
| POST | `/` | JWT | — | Crea o aggiorna conversazioni (batch) |
| POST | `/start` | JWT | — | Avvia una nuova conversazione con un messaggio di commento iniziale |
| DELETE | `/:churchId/:id` | JWT | — | Elimina una conversazione |

### Controllo degli accessi alle note delle persone {#person-notes-access-control}

Le conversazioni con `contentType: "person"` (la scheda Note di una scheda persona) o `contentType: "personConfidential"` (la sezione Note riservate) sono protette in ogni percorso di lettura e scrittura, incluse le rotte pubbliche sopra elencate, che restituiscono `401` per questi tipi di contenuto. `person` richiede il permesso **People / Edit** di MembershipApi; `personConfidential` richiede **People / View Confidential Notes**. Per le chiavi API con ambito, `people:write` copre entrambe le azioni (l'utente della chiave deve comunque avere il permesso del ruolo sottostante).

### Controllo degli accessi alle note di gruppo e di evento {#group-and-event-notes-access-control}

Altri due tipi di contenuto nota sono protetti allo stesso modo, in ogni percorso di lettura e scrittura (incluse le rotte pubbliche sopra), e non sono mai aperti a pubblicazioni anonime:

- **`groupNote`** (`contentId` = ID del gruppo) -- il flusso **Note dei leader** di un gruppo. Solo i leader di quel gruppo (`leaderGroupIds` nel JWT) possono leggere o pubblicare. Nessun permesso dello staff concede l'accesso, inclusi `content.edit` e i permessi di appartenenza ai gruppi.
- **`eventNote`** (`contentId` = ID dell'evento) -- le note di un evento di calendario. Lo staff con `content.edit` o **Calendars / Admin** può sempre leggere e pubblicare. Altrimenti l'accesso segue il `notesViewRole` (lettura) e il `notesPostRole` (pubblicazione) dell'evento: `staff` (predefinito, usato quando il campo è `null`) non consente a nessun altro, `leaders` consente i leader del gruppo dell'evento, e `members` consente i membri e i leader del gruppo dell'evento. Un evento senza `groupId` è riservato allo staff.

### Controllo degli accessi alle note delle schede del flusso di lavoro {#workflow-card-notes-access-control}

Le conversazioni con `contentType: "workflowCard"` (le note su una scheda del flusso di lavoro, dove `contentId` è l'ID dell'attività della scheda) possono essere lette e scritte solo da chi può aprire quella scheda: un utente con il permesso DoingApi **Tasks / View**, oppure la persona o il gruppo a cui la scheda è assegnata, creata da o relativa. Tutti gli altri ricevono `401` in ogni percorso di lettura, incluse le rotte pubbliche sopra. La conversazione di una scheda viene collegata tramite la scheda stessa con `POST /doing/tasks/:id/conversation` (corpo `{ "conversationId": "..." }`; vince la prima conversazione collegata), che possono chiamare gli editor della scheda e il suo assegnatario.

### Esempio: avviare una conversazione {#example-start-a-conversation}

```
POST /messaging/conversations/start
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "contentType": "group",
  "contentId": "group-123",
  "title": "Weekly Discussion",
  "comment": "Welcome to this week's discussion thread!"
}
```

```json
{
  "id": "conv-456",
  "churchId": "church-789",
  "contentType": "group",
  "contentId": "group-123",
  "title": "Weekly Discussion",
  "dateCreated": "2026-02-17T10:00:00.000Z",
  "visibility": "public",
  "allowAnonymousPosts": false,
  "groupId": "group-123"
}
```

## Messaggi {#messages}

Percorso base: `/messaging/messages`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Carica tutti i messaggi di una conversazione |
| GET | `/catchup/:churchId/:conversationId` | Pubblico | — | Carica tutti i messaggi di una conversazione (recupero pubblico per la chat in diretta) |
| GET | `/:churchId/:id` | Pubblico | — | Carica un singolo messaggio tramite ID |
| POST | `/` | JWT | — | Salva messaggi (batch). Invia aggiornamenti in tempo reale e attiva le notifiche. Modificare un messaggio esistente richiede di esserne l'autore oppure avere `content.edit`; l'autore salvato non può mai essere riassegnato |
| POST | `/send` | Pubblico | — | Invia messaggi (batch, pubblico). Invia aggiornamenti in tempo reale tramite WebSocket e attiva le notifiche |
| POST | `/setCallout` | JWT | — | (legacy) Trasmette in tempo reale un messaggio di evidenza. Nessun client attivo; la chat delle dirette non mostra più gli evidenziati |
| DELETE | `/:churchId/:id` | JWT | — | Elimina un messaggio e trasmette in tempo reale l'eliminazione. Vedi [Moderazione dei messaggi](#message-moderation) |

### Moderazione dei messaggi {#message-moderation}

L'eliminazione di un messaggio è consentita a:

- l'autore del messaggio;
- lo staff con `content.edit` (in tutta la chiesa);
- i **leader di gruppo**, per le conversazioni con `contentType` `group` o `groupAnnouncement` il cui `contentId` è un gruppo che guidano (`leaderGroupIds` nel JWT).

Le conversazioni di note su persone (`person` / `personConfidential`) non sono mai moderate dai leader: usano invece i permessi delle note (`people.edit`, `people.viewConfidentialNotes`).

I leader possono solo eliminare, non modificare: riscrivere il messaggio di un altro membro resta limitato all'autore e allo staff con `content.edit`.

### Esempio: inviare un messaggio {#example-send-a-message}

```
POST /messaging/messages/send

[
  {
    "churchId": "church-789",
    "conversationId": "conv-456",
    "personId": "person-123",
    "displayName": "John Smith",
    "content": "Hello everyone!",
    "messageType": "comment"
  }
]
```

```json
[
  {
    "id": "msg-001",
    "churchId": "church-789",
    "conversationId": "conv-456",
    "personId": "person-123",
    "displayName": "John Smith",
    "timeSent": "2026-02-17T10:05:00.000Z",
    "content": "Hello everyone!",
    "messageType": "comment"
  }
]
```

## Messaggi privati {#private-messages}

Percorso base: `/messaging/privatemessages`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Carica tutti i messaggi privati dell'utente corrente (include l'ultimo messaggio per conversazione e segna tutto come letto) |
| GET | `/existing/:personId` | JWT | — | Trova una conversazione privata esistente con una specifica persona |
| GET | `/:id` | JWT | — | Carica un messaggio privato tramite ID (cancella la notifica se destinato all'utente corrente) |
| POST | `/` | JWT | — | Invia messaggi privati (batch). Attiva una notifica push al destinatario |

## Notifiche {#notifications}

Percorso base: `/messaging/notifications`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Ottiene il numero di notifiche non lette dell'utente corrente |
| GET | `/my` | JWT | — | Carica tutte le notifiche dell'utente corrente (le segna tutte come lette) |
| GET | `/tmpEmail` | Pubblico | — | Attiva il riepilogo giornaliero delle notifiche via email (endpoint di debug/cron) |
| GET | `/:churchId/person/:personId` | JWT | — | Carica le notifiche di una specifica persona |
| GET | `/:churchId/:id` | JWT | — | Carica una notifica tramite ID |
| POST | `/` | JWT | — | Crea o aggiorna notifiche (batch) |
| POST | `/create` | JWT | — | Crea notifiche per più persone. Corpo: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Segna come lette tutte le notifiche di una persona |
| POST | `/sendTest` | JWT | — | Invia una notifica push di prova. Corpo: `{ personId, title }` |
| POST | `/ping` | Pubblico | — | Crea una notifica da un trigger esterno. Corpo: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Elimina una notifica |
| GET | `/groupPreview/:groupId` | JWT | `groupMembers.edit` | Conta quanti membri di un gruppo raggiungerebbe una push |
| GET | `/churchPreview` | JWT | `content.edit` | Conta quante persone raggiungerebbe una push a tutti quelli con l'app |
| POST | `/group/send` | JWT | `groupMembers.edit` | Invia subito una push ai membri di un gruppo |

### Esempio: creare notifiche {#example-create-notifications}

```
POST /messaging/notifications/create
Authorization: Bearer <token>

{
  "peopleIds": ["person-123", "person-456"],
  "contentType": "group",
  "contentId": "group-789",
  "message": "New event posted in your group",
  "link": "/groups/group-789"
}
```

## Notifiche programmate {#scheduled-notifications}

Percorso base: `/messaging/scheduledNotifications`

Push programmate in anticipo. `audience` è `church` (tutti quelli con l'app; richiede `content.edit`) oppure `group` (richiede `groupMembers.edit` e un `groupId`). Il titolo è limitato a 80 caratteri e il messaggio a 240. Una riga scaduta viene inviata dal timer che gira ogni minuto.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | `groupMembers.edit` o `content.edit` | Elenca le notifiche programmate e quelle recenti della chiesa |
| POST | `/` | JWT | per destinatari | Crea una notifica programmata, oppure ne aggiorna una quando è impostato `id`. Corpo: `{ id?, audience, groupId?, title, message, link?, imageUrl?, sendAt }`. Aggiornarne una che non è più in attesa restituisce 409 |
| POST | `/:id/sendNow` | JWT | per destinatari | Invia subito una notifica in attesa. Restituisce 409 se è già stata inviata, annullata o è in invio |
| DELETE | `/:id` | JWT | per destinatari | Annulla una notifica in attesa, oppure rimuove dall'elenco una notifica inviata, fallita o annullata. Restituisce 409 mentre è in invio |
| DELETE | `/` | JWT | `groupMembers.edit` o `content.edit` | Rimuove tutte le notifiche inviate, fallite e annullate per i destinatari a cui l'utente può inviare. Restituisce `{ deleted }` |

## Preferenze di notifica {#notification-preferences}

Percorso base: `/messaging/notificationpreferences`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/categories` | JWT | — | Elenca le categorie di notifica con i canali predefiniti e quelli consentiti |
| GET | `/my` | JWT | — | Carica le preferenze di notifica dell'utente corrente (crea i valori predefiniti se non esistono) |
| POST | `/` | JWT | — | Salva le preferenze dell'utente corrente. Corpo: uno o più tra `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, più `overrides: [{ categoryKey, channel, optedIn }]` facoltativo (il canale può essere `push`, `email`, `in_app` o `sms`; le categorie bloccate vengono ignorate). `allowSms` è il consenso del membro ai promemoria via SMS. È ancora accettato il vecchio formato con array di righe |

## Connessioni {#connections}

Percorso base: `/messaging/connections`

Gestisce le connessioni WebSocket/in tempo reale per la chat, le conversazioni di gruppo, i messaggi privati e le dirette streaming. Vedi [Architettura in tempo reale](../../realtime.md) per il protocollo completo.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Pubblico | — | Carica tutte le connessioni di una conversazione |
| POST | `/` | Pubblico | — | Registra connessioni (batch). Attiva una trasmissione della presenza sulla conversazione. Elementi del corpo: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Pubblico | — | Aggiorna il nome visualizzato di una connessione tramite socket ID. Corpo: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Pubblico | — | Rimuove una connessione da una conversazione. Attiva una trasmissione della presenza |
| POST | `/tmpSendAlert` | Pubblico | — | Invia un avviso di notifica alle connessioni di una persona. Corpo: `{ churchId, personId }` |

## Dispositivi {#devices}

Percorso base: `/messaging/devices`

Gestisce la registrazione dei dispositivi per le notifiche push e l'abbinamento dei contenuti (ad esempio l'app Lessons sugli schermi TV).

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | Registra o aggiorna un dispositivo (registrazione push mobile). Corrisponde tramite token FCM o ID dispositivo |
| POST | `/enrollAnon` | Pubblico | — | Registra un dispositivo anonimo e genera un codice di abbinamento di 4 caratteri |
| POST | `/` | Pubblico | — | Salva dispositivi (batch) |
| GET | `/pair/:pairingCode` | JWT | — | Abbina un dispositivo usando il suo codice di abbinamento. `?contentType=&contentId=` facoltativi per assegnare un contenuto |
| GET | `/status/:deviceId` | Pubblico | — | Verifica lo stato di abbinamento di un dispositivo |
| GET | `/:churchId` | JWT | — | Carica tutti i dispositivi di una chiesa |
| GET | `/:churchId/person/:personId` | JWT | — | Carica tutti i dispositivi di una persona |
| GET | `/:churchId/:id` | JWT | — | Carica un dispositivo tramite ID |
| DELETE | `/:churchId/:id` | JWT | — | Elimina un dispositivo |

### Esempio: registrare un dispositivo {#example-enroll-a-device}

```
POST /messaging/devices/enroll
Authorization: Bearer <token>

{
  "fcmToken": "firebase-token-abc123",
  "appName": "B1App",
  "label": "John's iPhone",
  "deviceInfo": "iOS 17, iPhone 15"
}
```

```json
{
  "id": "device-001",
  "churchId": "church-789",
  "fcmToken": "firebase-token-abc123",
  "appName": "B1App",
  "label": "John's iPhone",
  "registrationDate": "2026-02-17T10:00:00.000Z",
  "lastActiveDate": "2026-02-17T10:00:00.000Z"
}
```

## Contenuti dei dispositivi {#device-contents}

Percorso base: `/messaging/devicecontents`

Gestisce le assegnazioni di contenuti per i dispositivi abbinati (ad esempio quale lezione viene mostrata su una TV).

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Carica le assegnazioni di contenuto di un dispositivo |
| POST | `/` | JWT | — | Salva le assegnazioni di contenuto dei dispositivi (batch) |
| DELETE | `/:id` | JWT | — | Elimina un'assegnazione di contenuto di un dispositivo |

## SMS {#texting}

Percorso base: `/messaging/texting`

Gestisce i provider di SMS, l'invio di messaggi di testo ai gruppi e il monitoraggio delle consegne.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | Carica i provider di SMS della chiesa (le credenziali sono mascherate) |
| GET | `/status` | JWT | — | `{ enabled }` -- indica se la chiesa ha un provider di SMS attivo. Qualsiasi utente autenticato della chiesa; serve a mostrare le opzioni **Testo** solo quando è possibile inviare SMS |
| GET | `/inboundUrl` | JWT | `texting.send` o `settings.edit` | `{ url }` -- l'URL webhook di risposta (STOP) della chiesa da incollare nel provider |
| POST | `/inbound/:churchId/:token` | Pubblico | — | Webhook dei messaggi in entrata del provider. `token` è un HMAC dell'ID della chiesa. Una risposta che è esattamente una parola di interruzione (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`) imposta `optedOut` per ogni persona corrispondente e disattiva il suo `allowSms`. Restituisce `{ optedOut: <count> }`; le altre risposte restituiscono `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Anteprima dei destinatari di un SMS per un gruppo (conteggi di idonei, disiscritti, senza telefono) |
| GET | `/sent` | JWT | — | Carica tutti i record degli SMS inviati dalla chiesa |
| GET | `/sent/:id/details` | JWT | — | Carica un SMS inviato con i log di consegna per destinatario |
| POST | `/providers` | JWT | — | Salva i provider di SMS (batch). Cifra le credenziali API |
| POST | `/send` | JWT | — | Invia un SMS a tutti i membri idonei di un gruppo. Corpo: `{ groupId, message }`. I campi di unione (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) vengono risolti per ciascun destinatario |
| POST | `/sendPerson` | JWT | — | Invia un SMS a una singola persona. Corpo: `{ personId, phoneNumber, message }`. I campi di unione vengono risolti e viene registrato il testo risolto |
| DELETE | `/providers/:id` | JWT | — | Elimina un provider di SMS |

### Esempio: inviare un SMS a un gruppo {#example-send-group-text}

```
POST /messaging/texting/send
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "message": "Reminder: Service starts at 10 AM this Sunday!"
}
```

```json
{
  "totalMembers": 50,
  "recipientCount": 42,
  "successCount": 40,
  "failCount": 2,
  "optedOutCount": 5,
  "noPhoneCount": 3
}
```

## Modelli email {#email-templates}

Percorso base: `/messaging/emailTemplates`

Gestisce i modelli email riutilizzabili e l'invio di email basate su modelli ai gruppi.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Carica tutti i modelli email della chiesa |
| GET | `/:id` | JWT | — | Carica un singolo modello email tramite ID |
| GET | `/sendStatus` | JWT | `groupMembers.edit` o `tasks.admin` | Lo stato delle email di gruppo della chiesa: `{ approved, paused, remaining, requested }`. La finestra Invia email di B1Admin e l'azione **Invia email** del flusso di lavoro lo usano per avvisare quando le email non partiranno |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Chiede al supporto di approvare la chiesa per le email di gruppo (al massimo una volta a settimana per chiesa) |
| GET | `/preview/:groupId` | JWT | — | Anteprima della consegna email per un gruppo (conteggio dei destinatari idonei, membri senza email) |
| POST | `/` | JWT | — | Crea o aggiorna modelli email (batch) |
| POST | `/send` | JWT | — | Invia un'email basata su modello a tutti i membri di un gruppo. Corpo: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Elimina un modello email |

### Esempio: inviare un'email a un gruppo {#example-send-email-to-group}

```
POST /messaging/emailTemplates/send
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "subject": "This Week's Update - {{churchName}}",
  "htmlContent": "<p>Hello {{firstName}},</p><p>Here's what's happening this week...</p>"
}
```

```json
{
  "totalMembers": 50,
  "recipientCount": 45,
  "successCount": 44,
  "failCount": 1,
  "noEmailCount": 5
}
```

**Campi di unione supportati:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## IP bloccati {#blocked-ips}

Percorso base: `/messaging/blockedips`

(legacy) Blocco degli IP per la chat delle dirette streaming. Il client di B1App non chiama più `POST /` -- il blocco degli IP è stato rimosso con la migrazione alla consegna unificata. La rotta `/clear` viene ancora invocata da server a server da `StreamingServiceController` quando i servizi di streaming vengono salvati.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (legacy) Salva gli IP bloccati (batch). Nessun client attivo |
| POST | `/clear` | JWT | — | Rimuove tutti gli IP bloccati per specifici servizi. Corpo: `[{ serviceId, churchId }]` |

## Log di consegna {#delivery-logs}

Percorso base: `/messaging/deliverylogs`

Traccia lo stato di consegna dei messaggi inviati (SMS, notifiche push, email).

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Carica i log di consegna per tipo di contenuto e ID |
| GET | `/person/:personId` | JWT | — | Carica i log di consegna di una persona. `?startDate=&endDate=` facoltativi per filtrare |
| GET | `/recent` | JWT | — | Carica i log di consegna recenti della chiesa. `?limit=` facoltativo (predefinito 100) |
| GET | `/:id` | JWT | — | Carica un log di consegna tramite ID |

## Pagine correlate {#related-pages}

- [Architettura in tempo reale](../../realtime.md) -- Protocollo WebSocket, sottoscrizioni alle stanze e framework di consegna unificato
- [Notifiche push web](../../web-push.md) -- Registrazione e consegna delle push nel browser
- [Endpoint di Membership](./membership.md) -- Persone, gruppi, ruoli e identità di base
- [Endpoint di Attendance](./attendance.md) -- Tracciamento di servizi e visite
- [Autenticazione e permessi](./authentication.md) -- Flusso di accesso, JWT, OAuth, modello dei permessi
- [Struttura dei moduli](../module-structure.md) -- Schema di organizzazione del codice
