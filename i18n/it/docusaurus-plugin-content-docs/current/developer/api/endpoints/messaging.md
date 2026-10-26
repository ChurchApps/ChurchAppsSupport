---
title: "Endpoint Messaging"
---

# Endpoint Messaging

<div class="article-intro">

Il modulo Messaging gestisce conversazioni in tempo reale, messaggi di chat, notifiche push, consegna di SMS/email, connessioni WebSocket, messaggi privati, registrazione dei dispositivi e provider di messaggistica SMS. Fornisce il livello di comunicazione utilizzato in tutte le applicazioni ChurchApps, sia per la chat delle dirette in streaming sia per le notifiche asincrone.

</div>

**Percorso base:** `/messaging`

## Conversazioni

Percorso base: `/messaging/conversations`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Carica le conversazioni tramite ID separati da virgola con il primo e l'ultimo messaggio |
| GET | `/messages/:contentType/:contentId` | JWT | — | Carica le conversazioni per un contenuto con messaggi paginati (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Ottiene le conversazioni di tipo post dei gruppi dell'utente corrente |
| GET | `/posts/group/:groupId` | JWT | — | Ottiene le conversazioni di tipo post di un gruppo specifico |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Le note più recenti di tutti i record, per la pagina Notes di B1 Admin. `section` è `people`, `groups`, `events` o `workflows` (altrimenti 400); `limit` vale 25 per impostazione predefinita (massimo 100); `before` è il cursore della pagina precedente. Ogni nota deve comunque rispettare la regola del proprio tipo (permesso People Edit / note riservate, leader del gruppo, spettatori dell'evento, spettatori della scheda del flusso di lavoro), quindi chi chiama vede solo le note che potrebbe aprire. Il testo delle note è troncato a 300 caratteri |
| GET | `/current/:churchId/:contentType/:contentId` | Pubblico | — | Ottiene o crea la conversazione corrente per un contenuto (decodifica automaticamente contentId) |
| GET | `/:churchId/:contentType/:contentId` | Pubblico | — | Carica le conversazioni per tipo di contenuto e ID |
| GET | `/:churchId/:id` | Pubblico | — | Carica una singola conversazione per ID |
| POST | `/` | JWT | — | Crea o aggiorna conversazioni (in blocco) |
| POST | `/start` | JWT | — | Avvia una nuova conversazione con un commento iniziale |
| DELETE | `/:churchId/:id` | JWT | — | Elimina una conversazione |

### Controllo degli accessi alle note personali

Le conversazioni con `contentType: "person"` (la scheda Notes di un record persona) o `contentType: "personConfidential"` (la sezione Confidential Notes) sono protette in ogni percorso di lettura e scrittura, compresi quelli pubblici elencati sopra, che restituiscono `401` per questi tipi di contenuto. `person` richiede il permesso **People / Edit** di MembershipApi; `personConfidential` richiede **People / View Confidential Notes**. Per le chiavi API con ambito, `people:write` comprende entrambe le azioni (l'utente della chiave deve comunque possedere il permesso del ruolo sottostante).

### Controllo degli accessi alle note di gruppo ed evento {#group-and-event-notes-access-control}

Altri due tipi di note sono protetti allo stesso modo, in ogni percorso di lettura e scrittura (compresi quelli pubblici sopra), e non sono mai aperti alla pubblicazione anonima:

- **`groupNote`** (`contentId` = ID del gruppo) -- il feed **Leader notes** di un gruppo. Solo i leader di quel gruppo (`leaderGroupIds` nel JWT) possono leggere o pubblicare. Nessun permesso di staff concede l'accesso, inclusi `content.edit` e i permessi di appartenenza al gruppo.
- **`eventNote`** (`contentId` = ID dell'evento) -- le note di un evento del calendario. Lo staff con `content.edit` o **Calendars / Admin** può sempre leggere e pubblicare. Altrimenti l'accesso segue `notesViewRole` (lettura) e `notesPostRole` (pubblicazione) dell'evento: `staff` (il valore predefinito, usato quando il campo è `null`) non concede l'accesso a nessun altro, `leaders` concede l'accesso ai leader del gruppo dell'evento, e `members` concede l'accesso ai membri e ai leader del gruppo dell'evento. Un evento senza `groupId` è riservato allo staff.

### Controllo degli accessi alle note delle schede del flusso di lavoro

Le conversazioni con `contentType: "workflowCard"` (le note di una scheda del flusso di lavoro, dove `contentId` è l'ID dell'attività della scheda) possono essere lette e scritte solo da chi può aprire quella scheda: un utente con il permesso DoingApi **Tasks / View**, oppure la persona o il gruppo a cui la scheda è assegnata, creata o riferita. Tutti gli altri ricevono `401` in ogni percorso di lettura, compresi i percorsi pubblici sopra. La conversazione di una scheda viene collegata tramite la scheda stessa con `POST /doing/tasks/:id/conversation` (corpo `{ "conversationId": "..." }`; vince la prima conversazione collegata), operazione che possono eseguire gli editor della scheda e il suo assegnatario.

### Esempio: avviare una conversazione

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

## Messaggi

Percorso base: `/messaging/messages`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Carica tutti i messaggi di una conversazione |
| GET | `/catchup/:churchId/:conversationId` | Pubblico | — | Carica tutti i messaggi di una conversazione (recupero pubblico per la chat dal vivo) |
| GET | `/:churchId/:id` | Pubblico | — | Carica un singolo messaggio per ID |
| POST | `/` | JWT | — | Salva messaggi (in blocco). Invia aggiornamenti in tempo reale e attiva le notifiche. Modificare un messaggio esistente richiede di esserne l'autore o di avere `content.edit`; l'autore memorizzato non può mai essere riassegnato |
| POST | `/send` | Pubblico | — | Invia messaggi (in blocco, pubblico). Invia aggiornamenti in tempo reale tramite WebSocket e attiva le notifiche |
| POST | `/setCallout` | JWT | — | (legacy) Trasmette in tempo reale un messaggio di evidenza. Nessun client attivo; la chat della diretta non mostra più gli evidenziati |
| DELETE | `/:churchId/:id` | JWT | — | Elimina un messaggio e trasmette in tempo reale l'eliminazione. Vedi [Moderazione dei messaggi](#message-moderation) |

### Moderazione dei messaggi {#message-moderation}

L'eliminazione di un messaggio è consentita a:

- l'autore del messaggio;
- lo staff con `content.edit` (in tutta la chiesa);
- i **leader di gruppo**, per le conversazioni con `contentType` `group` o `groupAnnouncement` il cui `contentId` è un gruppo che guidano (`leaderGroupIds` nel JWT).

Le conversazioni sulle note personali (`person` / `personConfidential`) non sono mai moderate dai leader: usano invece i permessi sulle note (`people.edit`, `people.viewConfidentialNotes`).

I leader possono eliminare ma non modificare: riscrivere il messaggio di un altro membro resta riservato all'autore e allo staff con `content.edit`.

### Esempio: inviare un messaggio

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

## Messaggi privati

Percorso base: `/messaging/privatemessages`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/` | JWT | — | Carica tutti i messaggi privati dell'utente corrente (include l'ultimo messaggio per conversazione, segna tutti come letti) |
| GET | `/existing/:personId` | JWT | — | Trova una conversazione privata esistente con una persona specifica |
| GET | `/:id` | JWT | — | Carica un messaggio privato per ID (cancella la notifica se è indirizzato all'utente corrente) |
| POST | `/` | JWT | — | Invia messaggi privati (in blocco). Attiva una notifica push al destinatario |

## Notifiche

Percorso base: `/messaging/notifications`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/unreadCount` | JWT | — | Ottiene il numero di notifiche non lette dell'utente corrente |
| GET | `/my` | JWT | — | Carica tutte le notifiche dell'utente corrente (le segna tutte come lette) |
| GET | `/tmpEmail` | Pubblico | — | Attiva il riepilogo giornaliero delle notifiche via email (endpoint di debug/cron) |
| GET | `/:churchId/person/:personId` | JWT | — | Carica le notifiche di una persona specifica |
| GET | `/:churchId/:id` | JWT | — | Carica una notifica per ID |
| POST | `/` | JWT | — | Crea o aggiorna notifiche (in blocco) |
| POST | `/create` | JWT | — | Crea notifiche per più persone. Corpo: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Segna come lette tutte le notifiche di una persona |
| POST | `/sendTest` | JWT | — | Invia una notifica push di prova. Corpo: `{ personId, title }` |
| POST | `/ping` | Pubblico | — | Crea una notifica da un trigger esterno. Corpo: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Elimina una notifica |

### Esempio: creare notifiche

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

## Preferenze di notifica

Percorso base: `/messaging/notificationpreferences`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/categories` | JWT | — | Elenca le categorie di notifica con i canali predefiniti e quelli consentiti |
| GET | `/my` | JWT | — | Carica le preferenze di notifica dell'utente corrente (crea i valori predefiniti se non esistono) |
| POST | `/` | JWT | — | Salva le preferenze dell'utente corrente. Corpo: uno qualsiasi di `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, più `overrides: [{ categoryKey, channel, optedIn }]` facoltativo (il canale può essere `push`, `email`, `in_app` o `sms`; le categorie bloccate vengono ignorate). `allowSms` è il consenso del membro a ricevere promemoria via SMS. Viene ancora accettato il vecchio formato con un array di righe |

## Connessioni

Percorso base: `/messaging/connections`

Gestisce le connessioni WebSocket/in tempo reale per la chat, le conversazioni di gruppo, i messaggi privati e le dirette in streaming. Per il protocollo completo, vedi [Architettura in tempo reale](../../realtime).

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/:churchId/:conversationId` | Pubblico | — | Carica tutte le connessioni di una conversazione |
| POST | `/` | Pubblico | — | Registra connessioni (in blocco). Attiva una trasmissione delle presenze sulla conversazione. Elementi del corpo: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Pubblico | — | Aggiorna il nome visualizzato di una connessione tramite socket ID. Corpo: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Pubblico | — | Rimuove una connessione da una conversazione. Attiva una trasmissione delle presenze |
| POST | `/tmpSendAlert` | Pubblico | — | Invia un avviso di notifica alle connessioni di una persona. Corpo: `{ churchId, personId }` |

## Dispositivi

Percorso base: `/messaging/devices`

Gestisce la registrazione dei dispositivi per le notifiche push e l'abbinamento dei contenuti (per esempio, l'app Lessons sui display TV).

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| POST | `/enroll` | JWT | — | Registra o aggiorna un dispositivo (registrazione push mobile). Corrisponde tramite token FCM o ID dispositivo |
| POST | `/enrollAnon` | Pubblico | — | Registra un dispositivo anonimo e genera un codice di abbinamento di 4 caratteri |
| POST | `/` | Pubblico | — | Salva dispositivi (in blocco) |
| GET | `/pair/:pairingCode` | JWT | — | Abbina un dispositivo tramite il suo codice di abbinamento. Facoltativo `?contentType=&contentId=` per assegnare un contenuto |
| GET | `/status/:deviceId` | Pubblico | — | Verifica lo stato di abbinamento di un dispositivo |
| GET | `/:churchId` | JWT | — | Carica tutti i dispositivi di una chiesa |
| GET | `/:churchId/person/:personId` | JWT | — | Carica tutti i dispositivi di una persona |
| GET | `/:churchId/:id` | JWT | — | Carica un dispositivo per ID |
| DELETE | `/:churchId/:id` | JWT | — | Elimina un dispositivo |

### Esempio: registrare un dispositivo

```
POST /messaging/devices/enroll
Authorization: Bearer <token>

{
  "fcmToken": "firebase-token-abc123",
  "appName": "B1Mobile",
  "label": "John's iPhone",
  "deviceInfo": "iOS 17, iPhone 15"
}
```

```json
{
  "id": "device-001",
  "churchId": "church-789",
  "fcmToken": "firebase-token-abc123",
  "appName": "B1Mobile",
  "label": "John's iPhone",
  "registrationDate": "2026-02-17T10:00:00.000Z",
  "lastActiveDate": "2026-02-17T10:00:00.000Z"
}
```

## Contenuti dei dispositivi

Percorso base: `/messaging/devicecontents`

Gestisce le assegnazioni di contenuti ai dispositivi abbinati (per esempio, quale lezione viene mostrata su un TV).

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Carica le assegnazioni di contenuti di un dispositivo |
| POST | `/` | JWT | — | Salva le assegnazioni di contenuti dei dispositivi (in blocco) |
| DELETE | `/:id` | JWT | — | Elimina un'assegnazione di contenuto a un dispositivo |

## Messaggi di testo

Percorso base: `/messaging/texting`

Gestisce i provider di SMS, l'invio di messaggi di testo di gruppo e il monitoraggio delle consegne.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/providers` | JWT | — | Carica i provider di messaggistica della chiesa (le credenziali sono mascherate) |
| GET | `/status` | JWT | — | `{ enabled }` — indica se la chiesa ha un provider di messaggistica attivo. Qualsiasi utente della chiesa autenticato; serve a mostrare le opzioni **Text** solo quando è possibile inviare messaggi |
| GET | `/inboundUrl` | JWT | `texting.send` o `settings.edit` | `{ url }` — l'URL webhook in entrata (STOP) della chiesa da incollare nel provider |
| POST | `/inbound/:churchId/:token` | Pubblico | — | Webhook del provider per i messaggi in entrata. `token` è un HMAC dell'ID della chiesa. Una risposta che è esattamente una parola di arresto (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`) imposta `optedOut` su ogni persona corrispondente e disattiva il loro `allowSms`. Restituisce `{ optedOut: <count> }`; le altre risposte restituiscono `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Anteprima dei destinatari di un messaggio di gruppo (conteggi di idonei, rinunciatari e senza telefono) |
| GET | `/sent` | JWT | — | Carica tutti i record dei messaggi di testo inviati dalla chiesa |
| GET | `/sent/:id/details` | JWT | — | Carica un messaggio inviato con i registri di consegna per destinatario |
| POST | `/providers` | JWT | — | Salva i provider di messaggistica (in blocco). Cifra le credenziali API |
| POST | `/send` | JWT | — | Invia un SMS a tutti i membri idonei di un gruppo. Corpo: `{ groupId, message }`. I campi di unione (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) vengono risolti per ciascun destinatario |
| POST | `/sendPerson` | JWT | — | Invia un SMS a una singola persona. Corpo: `{ personId, phoneNumber, message }`. I campi di unione vengono risolti e viene registrato il testo risolto |
| DELETE | `/providers/:id` | JWT | — | Elimina un provider di messaggistica |

### Esempio: inviare un messaggio di testo al gruppo

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

## Modelli di email

Percorso base: `/messaging/emailTemplates`

Gestisce i modelli email riutilizzabili e l'invio di email basate su modello ai gruppi.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/` | JWT | — | Carica tutti i modelli email della chiesa |
| GET | `/:id` | JWT | — | Carica un singolo modello email per ID |
| GET | `/sendStatus` | JWT | `groupMembers.edit` o `tasks.admin` | Lo stato delle email di gruppo della chiesa: `{ approved, paused, remaining, requested }`. La finestra Send Email di B1Admin e l'azione **Send email** del flusso di lavoro lo usano per avvisare quando le email non verranno inviate |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Chiede al supporto di approvare la chiesa per le email di gruppo (al massimo una volta a settimana per chiesa) |
| GET | `/preview/:groupId` | JWT | — | Anteprima della consegna email per un gruppo (numero di destinatari idonei, membri senza email) |
| POST | `/` | JWT | — | Crea o aggiorna modelli email (in blocco) |
| POST | `/send` | JWT | — | Invia un'email basata su modello a tutti i membri di un gruppo. Corpo: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Elimina un modello email |

### Esempio: inviare un'email al gruppo

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

## IP bloccati

Percorso base: `/messaging/blockedips`

(legacy) Blocco degli IP per la chat delle dirette in streaming. Il client B1App non chiama più `POST /` -- il blocco degli IP è stato rimosso con la migrazione alla consegna unificata. La rotta `/clear` viene ancora invocata da server a server da `StreamingServiceController` quando vengono salvati i servizi in streaming.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| POST | `/` | JWT | — | (legacy) Salva gli IP bloccati (in blocco). Nessun client attivo |
| POST | `/clear` | JWT | — | Rimuove tutti gli IP bloccati per servizi specifici. Corpo: `[{ serviceId, churchId }]` |

## Registri di consegna

Percorso base: `/messaging/deliverylogs`

Tiene traccia dello stato di consegna dei messaggi inviati (SMS, notifiche push, email).

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Carica i registri di consegna per tipo di contenuto e ID |
| GET | `/person/:personId` | JWT | — | Carica i registri di consegna di una persona. Facoltativi `?startDate=&endDate=` per filtrare |
| GET | `/recent` | JWT | — | Carica i registri di consegna recenti della chiesa. Facoltativo `?limit=` (predefinito 100) |
| GET | `/:id` | JWT | — | Carica un registro di consegna per ID |

## Pagine correlate

- [Architettura in tempo reale](../../realtime) -- Protocollo WebSocket, sottoscrizione alle stanze e framework di consegna unificato
- [Notifiche push web](../../web-push) -- Registrazione e consegna delle notifiche push nel browser
- [Endpoint Membership](./membership) -- Persone, gruppi, ruoli e identità di base
- [Endpoint delle presenze](./attendance) -- Tracciamento di servizi e visite
- [Autenticazione e permessi](./authentication) -- Flusso di accesso, JWT, OAuth, modello dei permessi
- [Struttura del modulo](../module-structure) -- Schemi di organizzazione del codice
