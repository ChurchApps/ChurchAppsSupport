---
title: "Endpoint di messaggistica"
description: "Riferimento per gli endpoint API di messaggistica di ChurchApps: conversazioni, regole di accesso alle note, SMS, modelli email, notifiche e dispositivi."
---

# Endpoint di messaggistica

<div class="article-intro">

Il modulo Messaggistica gestisce conversazioni in tempo reale, messaggi di chat, notifiche push, invio di SMS ed email, connessioni WebSocket, messaggi privati, registrazione dei dispositivi e provider di messaggi di testo. Fornisce il livello di comunicazione utilizzato in tutte le applicazioni ChurchApps, sia per la chat delle dirette streaming sia per le notifiche asincrone.

</div>

**Percorso base:** `/messaging`

## Conversazioni

Percorso base: `/messaging/conversations`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Carica le conversazioni tramite ID separati da virgola, con primo e ultimo messaggio |
| GET | `/messages/:contentType/:contentId` | JWT | — | Carica le conversazioni per un contenuto con messaggi paginati (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Ottiene le conversazioni di tipo post dei gruppi dell'utente corrente |
| GET | `/posts/group/:groupId` | JWT | — | Ottiene le conversazioni di tipo post per un gruppo specifico |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Le note più recenti di tutti i record, per la pagina Note di B1 Admin. `section` può essere `people`, `groups`, `events` o `workflows` (altrimenti 400); `limit` vale 25 per impostazione predefinita (massimo 100); `before` è il cursore della pagina precedente. Ogni nota deve comunque superare la regola del proprio tipo (permesso Persone / Modifica o note riservate, leader del gruppo, visualizzatori dell'evento, visualizzatori della scheda del flusso di lavoro), quindi i chiamanti vedono solo le note che potrebbero aprire. Il testo delle note viene troncato a 300 caratteri |
| GET | `/current/:churchId/:contentType/:contentId` | Pubblico | — | Ottiene o crea la conversazione corrente per un contenuto (decifra automaticamente contentId) |
| GET | `/:churchId/:contentType/:contentId` | Pubblico | — | Carica le conversazioni per tipo di contenuto e ID |
| GET | `/:churchId/:id` | Pubblico | — | Carica una singola conversazione tramite ID |
| POST | `/` | JWT | — | Crea o aggiorna conversazioni (in batch) |
| POST | `/start` | JWT | — | Avvia una nuova conversazione con un commento iniziale |
| DELETE | `/:churchId/:id` | JWT | — | Elimina una conversazione |

### Controllo degli accessi alle note delle persone

Le conversazioni con `contentType: "person"` (la scheda Note di un record persona) o `contentType: "personConfidential"` (la sezione Note riservate) sono protette in ogni percorso di lettura e scrittura, inclusi gli endpoint pubblici sopra indicati, che restituiscono `401` per questi tipi di contenuto. `person` richiede il permesso **Persone / Modifica** di MembershipApi; `personConfidential` richiede **Persone / Visualizza note riservate**. Per le chiavi API con ambito, `people:write` include entrambe le azioni (l'utente della chiave deve comunque possedere il relativo permesso del ruolo).

### Controllo degli accessi alle note di gruppi ed eventi {#group-and-event-notes-access-control}

Altri due tipi di contenuto delle note sono protetti allo stesso modo, in ogni percorso di lettura e scrittura (inclusi gli endpoint pubblici sopra indicati), e non sono mai aperti alla pubblicazione anonima:

- **`groupNote`** (`contentId` = ID del gruppo) -- il feed **Note dei leader** di un gruppo. Possono leggere o pubblicare solo i leader di quel gruppo (`leaderGroupIds` nel JWT). Nessun permesso dello staff concede l'accesso, inclusi `content.edit` e i permessi di appartenenza al gruppo.
- **`eventNote`** (`contentId` = ID dell'evento) -- le note di un evento del calendario. Lo staff con `content.edit` o **Calendari / Amministrazione** può sempre leggere e pubblicare. Altrimenti l'accesso segue `notesViewRole` (lettura) e `notesPostRole` (pubblicazione) dell'evento: `staff` (il valore predefinito, usato quando il campo è `null`) non concede l'accesso ad altri, `leaders` concede l'accesso ai leader del gruppo dell'evento e `members` concede l'accesso ai membri e ai leader del gruppo dell'evento. Un evento senza `groupId` è riservato allo staff.

### Controllo degli accessi alle note delle schede del flusso di lavoro

Le conversazioni con `contentType: "workflowCard"` (le note su una scheda del flusso di lavoro, dove `contentId` è l'ID dell'attività della scheda) possono essere lette e scritte solo da chi può aprire quella scheda: un utente con il permesso **Attività / Visualizza** di DoingApi, oppure la persona o il gruppo a cui la scheda è assegnata, da cui è stata creata o a cui si riferisce. Tutti gli altri ricevono `401` in ogni percorso di lettura, inclusi gli endpoint pubblici sopra indicati. La conversazione di una scheda viene collegata alla scheda stessa tramite `POST /doing/tasks/:id/conversation` (corpo `{ "conversationId": "..." }`; vince la prima conversazione collegata), operazione che possono eseguire gli editor della scheda e il suo assegnatario.

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
| GET | `/:churchId/:id` | Pubblico | — | Carica un singolo messaggio tramite ID |
| POST | `/` | JWT | — | Salva messaggi (in batch). Invia aggiornamenti in tempo reale e attiva le notifiche. Modificare un messaggio esistente richiede di esserne l'autore o di possedere `content.edit`; l'autore memorizzato non può mai essere riassegnato |
| POST | `/send` | Pubblico | — | Invia messaggi (in batch, pubblico). Invia aggiornamenti in tempo reale tramite WebSocket e attiva le notifiche |
| POST | `/setCallout` | JWT | — | (legacy) Trasmette in tempo reale un messaggio di evidenza. Nessun client attivo; la chat delle dirette non mostra più gli evidenziati |
| DELETE | `/:churchId/:id` | JWT | — | Elimina un messaggio e trasmette l'eliminazione in tempo reale. Vedi [Moderazione dei messaggi](#message-moderation) |

### Moderazione dei messaggi

È consentita l'eliminazione di un messaggio a:

- l'autore del messaggio;
- lo staff con `content.edit` (in tutta la chiesa);
- **i leader del gruppo**, per le conversazioni con `contentType` pari a `group` o `groupAnnouncement` il cui `contentId` è un gruppo da loro guidato (`leaderGroupIds` nel JWT).

Le conversazioni di note su persone (`person` / `personConfidential`) non sono mai moderabili dai leader: usano invece i permessi sulle note (`people.edit`, `people.viewConfidentialNotes`).

I leader possono solo eliminare, non modificare: riscrivere il messaggio di un altro membro resta riservato all'autore e allo staff con `content.edit`.

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
| GET | `/` | JWT | — | Carica tutti i messaggi privati dell'utente corrente (include l'ultimo messaggio per conversazione e segna tutto come letto) |
| GET | `/existing/:personId` | JWT | — | Trova una conversazione privata esistente con una persona specifica |
| GET | `/:id` | JWT | — | Carica un messaggio privato tramite ID (cancella la notifica se è indirizzato all'utente corrente) |
| POST | `/` | JWT | — | Invia messaggi privati (in batch). Attiva una notifica push per il destinatario |

## Notifiche

Percorso base: `/messaging/notifications`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/unreadCount` | JWT | — | Ottiene il numero di notifiche non lette per l'utente corrente |
| GET | `/my` | JWT | — | Carica tutte le notifiche dell'utente corrente (le segna tutte come lette) |
| GET | `/tmpEmail` | Pubblico | — | Attiva il riepilogo giornaliero delle notifiche via email (endpoint di debug/cron) |
| GET | `/:churchId/person/:personId` | JWT | — | Carica le notifiche di una persona specifica |
| GET | `/:churchId/:id` | JWT | — | Carica una notifica tramite ID |
| POST | `/` | JWT | — | Crea o aggiorna notifiche (in batch) |
| POST | `/create` | JWT | — | Crea notifiche per più persone. Corpo: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Segna tutte le notifiche di una persona come lette |
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
| GET | `/my` | JWT | — | Carica le preferenze di notifica dell'utente corrente (crea automaticamente quelle predefinite se non esistono) |
| POST | `/` | JWT | — | Salva le preferenze dell'utente corrente. Corpo: uno qualsiasi tra `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, più l'opzionale `overrides: [{ categoryKey, channel, optedIn }]` (il canale può essere `push`, `email`, `in_app` o `sms`; le categorie bloccate vengono ignorate). `allowSms` è il consenso del membro ai promemoria via SMS. È ancora accettato il vecchio formato con array di righe |

## Connessioni

Percorso base: `/messaging/connections`

Gestisce le connessioni WebSocket e in tempo reale per la chat, le conversazioni di gruppo, i messaggi privati e le dirette streaming. Vedi [Architettura in tempo reale](../../realtime.md) per il protocollo completo.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/:churchId/:conversationId` | Pubblico | — | Carica tutte le connessioni di una conversazione |
| POST | `/` | Pubblico | — | Registra connessioni (in batch). Attiva un aggiornamento delle presenze in diretta sulla conversazione. Elementi del corpo: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Pubblico | — | Aggiorna il nome visualizzato di una connessione tramite ID socket. Corpo: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Pubblico | — | Rimuove una connessione da una conversazione. Attiva un aggiornamento delle presenze in diretta |
| POST | `/tmpSendAlert` | Pubblico | — | Invia un avviso di notifica alle connessioni di una persona. Corpo: `{ churchId, personId }` |

## Dispositivi

Percorso base: `/messaging/devices`

Gestisce la registrazione dei dispositivi per le notifiche push e l'abbinamento dei contenuti (ad esempio l'app Lessons sui display TV).

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| POST | `/enroll` | JWT | — | Registra o aggiorna un dispositivo (registrazione push mobile). Corrisponde tramite token FCM o ID dispositivo |
| POST | `/enrollAnon` | Pubblico | — | Registra un dispositivo anonimo e genera un codice di abbinamento di 4 caratteri |
| POST | `/` | Pubblico | — | Salva dispositivi (in batch) |
| GET | `/pair/:pairingCode` | JWT | — | Abbina un dispositivo tramite il suo codice di abbinamento. `?contentType=&contentId=` facoltativi per assegnare un contenuto |
| GET | `/status/:deviceId` | Pubblico | — | Verifica lo stato di abbinamento di un dispositivo |
| GET | `/:churchId` | JWT | — | Carica tutti i dispositivi di una chiesa |
| GET | `/:churchId/person/:personId` | JWT | — | Carica tutti i dispositivi di una persona |
| GET | `/:churchId/:id` | JWT | — | Carica un dispositivo tramite ID |
| DELETE | `/:churchId/:id` | JWT | — | Elimina un dispositivo |

### Esempio: registrare un dispositivo

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

## Contenuti dei dispositivi

Percorso base: `/messaging/devicecontents`

Gestisce le assegnazioni di contenuto per i dispositivi abbinati (ad esempio quale lezione viene mostrata su una TV).

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Carica le assegnazioni di contenuto di un dispositivo |
| POST | `/` | JWT | — | Salva le assegnazioni di contenuto dei dispositivi (in batch) |
| DELETE | `/:id` | JWT | — | Elimina un'assegnazione di contenuto di un dispositivo |

## Invio SMS

Percorso base: `/messaging/texting`

Gestisce i provider per l'invio di SMS, la messaggistica di gruppo via SMS e il monitoraggio delle consegne.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/providers` | JWT | — | Carica i provider SMS della chiesa (le credenziali sono mascherate) |
| GET | `/status` | JWT | — | `{ enabled }` — indica se la chiesa ha un provider SMS attivo. Disponibile per qualsiasi utente registrato della chiesa; serve a mostrare le opzioni **Testo** solo quando è possibile inviare SMS |
| GET | `/inboundUrl` | JWT | `texting.send` o `settings.edit` | `{ url }` — l'URL webhook dei messaggi in entrata (STOP) della chiesa da incollare nel provider |
| POST | `/inbound/:churchId/:token` | Pubblico | — | Webhook dei messaggi in entrata del provider. `token` è un HMAC dell'ID della chiesa. Una risposta che è esattamente una parola di interruzione (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`) imposta `optedOut` su ogni persona corrispondente e disattiva il loro `allowSms`. Restituisce `{ optedOut: <count> }`; le altre risposte restituiscono `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Anteprima dei destinatari di un SMS di gruppo (conteggi di destinatari idonei, disiscritti e senza telefono) |
| GET | `/sent` | JWT | — | Carica tutti i record degli SMS inviati dalla chiesa |
| GET | `/sent/:id/details` | JWT | — | Carica un SMS inviato con i registri di consegna per ogni destinatario |
| POST | `/providers` | JWT | — | Salva i provider SMS (in batch). Cifra le credenziali API |
| POST | `/send` | JWT | — | Invia un SMS a tutti i membri idonei di un gruppo. Corpo: `{ groupId, message }`. I campi di unione (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) vengono risolti per ogni destinatario |
| POST | `/sendPerson` | JWT | — | Invia un SMS a una singola persona. Corpo: `{ personId, phoneNumber, message }`. I campi di unione vengono risolti e il testo risolto è quello registrato |
| DELETE | `/providers/:id` | JWT | — | Elimina un provider SMS |

### Esempio: inviare un SMS di gruppo

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

## Modelli email

Percorso base: `/messaging/emailTemplates`

Gestisce i modelli email riutilizzabili e l'invio di email basate su modelli ai gruppi.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/` | JWT | — | Carica tutti i modelli email della chiesa |
| GET | `/:id` | JWT | — | Carica un singolo modello email tramite ID |
| GET | `/sendStatus` | JWT | `groupMembers.edit` o `tasks.admin` | Lo stato delle email di gruppo della chiesa: `{ approved, paused, remaining, requested }`. La finestra di invio email di B1Admin e l'azione **Invia email** del flusso di lavoro lo usano per avvisare quando le email non verranno inviate |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Chiede al supporto di approvare la chiesa per le email di gruppo (al massimo una volta a settimana per chiesa) |
| GET | `/preview/:groupId` | JWT | — | Anteprima della consegna email per un gruppo (numero di destinatari idonei, membri senza email) |
| POST | `/` | JWT | — | Crea o aggiorna modelli email (in batch) |
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

(legacy) Blocco degli IP per la chat delle dirette streaming. Il client B1App non chiama più `POST /`: il blocco IP è stato rimosso con la migrazione alla consegna unificata. La route `/clear` viene ancora invocata da server a server da `StreamingServiceController` quando vengono salvati i servizi di streaming.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| POST | `/` | JWT | — | (legacy) Salva IP bloccati (in batch). Nessun client attivo |
| POST | `/clear` | JWT | — | Rimuove tutti gli IP bloccati per servizi specifici. Corpo: `[{ serviceId, churchId }]` |

## Registri di consegna

Percorso base: `/messaging/deliverylogs`

Traccia lo stato di consegna dei messaggi inviati (SMS, notifiche push, email).

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Carica i registri di consegna per tipo di contenuto e ID |
| GET | `/person/:personId` | JWT | — | Carica i registri di consegna di una persona. `?startDate=&endDate=` facoltativi per filtrare |
| GET | `/recent` | JWT | — | Carica i registri di consegna recenti della chiesa. `?limit=` facoltativo (predefinito 100) |
| GET | `/:id` | JWT | — | Carica un registro di consegna tramite ID |

## Pagine correlate

- [Architettura in tempo reale](../../realtime.md) -- protocollo WebSocket, sottoscrizioni alle stanze e framework di consegna unificato
- [Notifiche push web](../../web-push.md) -- registrazione e consegna delle notifiche push nel browser
- [Endpoint Membership](./membership.md) -- persone, gruppi, ruoli e identità di base
- [Endpoint Attendance](./attendance.md) -- tracciamento di servizi e visite
- [Autenticazione e permessi](./authentication.md) -- flusso di accesso, JWT, OAuth, modello dei permessi
- [Struttura del modulo](../module-structure.md) -- schemi di organizzazione del codice
