---
title: "Endpoint di Messaggistica"
---

# Endpoint di Messaggistica

<div class="article-intro">

Il modulo Messaging gestisce conversazioni in tempo reale, messaggi di chat, notifiche push, invio di SMS ed email, connessioni WebSocket, messaggi privati, registrazione dei dispositivi e provider di messaggi di testo. Fornisce il livello di comunicazione usato in tutte le applicazioni ChurchApps, sia per la chat delle dirette streaming sia per le notifiche asincrone.

</div>

**Percorso base:** `/messaging`

## Conversazioni

Percorso base: `/messaging/conversations`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Carica le conversazioni tramite ID separati da virgole, con primo e ultimo messaggio |
| GET | `/messages/:contentType/:contentId` | JWT | — | Carica le conversazioni per un contenuto con messaggi paginati (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Ottiene le conversazioni di tipo post per i gruppi dell'utente corrente |
| GET | `/posts/group/:groupId` | JWT | — | Ottiene le conversazioni di tipo post per un gruppo specifico |
| GET | `/current/:churchId/:contentType/:contentId` | Pubblico | — | Ottiene o crea la conversazione corrente per il contenuto (decifra automaticamente contentId) |
| GET | `/:churchId/:contentType/:contentId` | Pubblico | — | Carica le conversazioni per tipo di contenuto e ID |
| GET | `/:churchId/:id` | Pubblico | — | Carica una singola conversazione tramite ID |
| POST | `/` | JWT | — | Crea o aggiorna conversazioni (batch) |
| POST | `/start` | JWT | — | Avvia una nuova conversazione con un messaggio di commento iniziale |
| DELETE | `/:churchId/:id` | JWT | — | Elimina una conversazione |

### Controllo degli accessi alle note sulle persone

Le conversazioni con `contentType: "person"` (la scheda Note di un profilo persona) o `contentType: "personConfidential"` (la sezione Note riservate) sono protette in ogni percorso di lettura e scrittura, incluse le rotte pubbliche sopra indicate, che restituiscono `401` per questi tipi di contenuto. `person` richiede il permesso **Persone / Modifica** di MembershipApi; `personConfidential` richiede **Persone / Visualizza note riservate**. Per le chiavi API con ambito, `people:write` include entrambe le azioni (l'utente della chiave deve comunque possedere il permesso del ruolo sottostante).

### Controllo degli accessi alle note di gruppo ed evento {#group-and-event-notes-access-control}

Altri due tipi di note sono protetti allo stesso modo, in ogni percorso di lettura e scrittura (incluse le rotte pubbliche), e non sono mai aperti alla pubblicazione anonima:

- **`groupNote`** (`contentId` = ID del gruppo) -- il feed **Note dei leader** di un gruppo. Possono leggere o pubblicare solo i leader di quel gruppo (`leaderGroupIds` nel JWT). Nessun permesso dello staff concede l'accesso, inclusi `content.edit` e i permessi di appartenenza al gruppo.
- **`eventNote`** (`contentId` = ID dell'evento) -- le note su un evento del calendario. Lo staff con `content.edit` o **Calendari / Admin** può sempre leggere e pubblicare. Altrimenti l'accesso segue `notesViewRole` (lettura) e `notesPostRole` (pubblicazione) dell'evento: `staff` (il valore predefinito, usato quando il campo è `null`) non concede l'accesso ad altri, `leaders` concede l'accesso ai leader del gruppo dell'evento, e `members` concede l'accesso ai membri e ai leader del gruppo dell'evento. Un evento senza `groupId` è riservato allo staff.

### Controllo degli accessi alle note delle schede del flusso di lavoro

Le conversazioni con `contentType: "workflowCard"` (le note su una scheda del flusso di lavoro, dove `contentId` è l'ID dell'attività della scheda) possono essere lette e scritte solo da chi può aprire quella scheda: un utente con il permesso **Attività / Visualizza** di DoingApi, oppure la persona o il gruppo a cui la scheda è assegnata, da cui è stata creata o a cui si riferisce. Tutti gli altri ricevono `401` in ogni percorso di lettura, incluse le rotte pubbliche sopra indicate. La conversazione di una scheda viene collegata tramite la scheda stessa con `POST /doing/tasks/:id/conversation` (corpo `{ "conversationId": "..." }`; vince la prima conversazione collegata), operazione che possono eseguire gli editor della scheda e il suo assegnatario.

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
| POST | `/` | JWT | — | Salva messaggi (batch). Invia aggiornamenti in tempo reale e attiva le notifiche. Modificare un messaggio esistente richiede di esserne l'autore o avere `content.edit`; l'autore memorizzato non può mai essere riassegnato |
| POST | `/send` | Pubblico | — | Invia messaggi (batch, pubblico). Invia aggiornamenti in tempo reale tramite WebSocket e attiva le notifiche |
| POST | `/setCallout` | JWT | — | (legacy) Trasmette in tempo reale un messaggio di evidenza. Nessun client attivo; la chat delle dirette streaming non mostra più le evidenze |
| DELETE | `/:churchId/:id` | JWT | — | Elimina un messaggio e trasmette in tempo reale l'eliminazione. Vedi [Moderazione dei messaggi](#message-moderation) |

### Moderazione dei messaggi {#message-moderation}

L'eliminazione di un messaggio è consentita a:

- l'autore del messaggio;
- lo staff con `content.edit` (in tutta la chiesa);
- **i leader di gruppo**, per le conversazioni con `contentType` `group` o `groupAnnouncement` il cui `contentId` è un gruppo da loro guidato (`leaderGroupIds` nel JWT).

Le conversazioni di note su persone (`person` / `personConfidential`) non sono mai moderate dai leader: usano invece i permessi sulle note (`people.edit`, `people.viewConfidentialNotes`).

I leader possono solo eliminare, non modificare: riscrivere il messaggio di un altro membro resta limitato all'autore e allo staff con `content.edit`.

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
| GET | `/` | JWT | — | Carica tutti i messaggi privati dell'utente corrente (include l'ultimo messaggio per conversazione e li segna tutti come letti) |
| GET | `/existing/:personId` | JWT | — | Trova una conversazione privata esistente con una persona specifica |
| GET | `/:id` | JWT | — | Carica un messaggio privato tramite ID (cancella la notifica se indirizzato all'utente corrente) |
| POST | `/` | JWT | — | Invia messaggi privati (batch). Attiva una notifica push per il destinatario |

## Notifiche

Percorso base: `/messaging/notifications`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/unreadCount` | JWT | — | Ottiene il numero di notifiche non lette per l'utente corrente |
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
| POST | `/` | JWT | — | Salva le preferenze dell'utente corrente. Corpo: uno o più tra `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, più l'elemento facoltativo `overrides: [{ categoryKey, channel, optedIn }]` (channel può essere `push`, `email`, `in_app` o `sms`; le categorie bloccate vengono ignorate). `allowSms` è il consenso del membro ai promemoria via SMS. Viene ancora accettato il vecchio corpo a elenco di righe |

## Connessioni

Percorso base: `/messaging/connections`

Gestisce le connessioni WebSocket/in tempo reale per la chat, le conversazioni di gruppo, i messaggi privati e le dirette streaming. Vedi [Architettura in tempo reale](../../realtime) per il protocollo completo.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/:churchId/:conversationId` | Pubblico | — | Carica tutte le connessioni di una conversazione |
| POST | `/` | Pubblico | — | Registra connessioni (batch). Attiva una trasmissione delle presenze sulla conversazione. Elementi del corpo: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Pubblico | — | Aggiorna il nome visualizzato di una connessione tramite socket ID. Corpo: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Pubblico | — | Rimuove una connessione da una conversazione. Attiva una trasmissione delle presenze |
| POST | `/tmpSendAlert` | Pubblico | — | Invia un avviso di notifica alle connessioni di una persona. Corpo: `{ churchId, personId }` |

## Dispositivi

Percorso base: `/messaging/devices`

Gestisce la registrazione dei dispositivi per le notifiche push e l'associazione dei contenuti (ad esempio l'app Lessons su una TV).

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| POST | `/enroll` | JWT | — | Registra o aggiorna un dispositivo (registrazione push mobile). Corrisponde tramite token FCM o ID dispositivo |
| POST | `/enrollAnon` | Pubblico | — | Registra un dispositivo anonimo e genera un codice di associazione a 4 caratteri |
| POST | `/` | Pubblico | — | Salva dispositivi (batch) |
| GET | `/pair/:pairingCode` | JWT | — | Associa un dispositivo tramite il suo codice di associazione. `?contentType=&contentId=` facoltativi per assegnare contenuti |
| GET | `/status/:deviceId` | Pubblico | — | Verifica lo stato di associazione di un dispositivo |
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

Gestisce le assegnazioni di contenuti ai dispositivi associati (ad esempio quale lezione viene mostrata su una TV).

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Carica le assegnazioni di contenuto di un dispositivo |
| POST | `/` | JWT | — | Salva le assegnazioni di contenuto dei dispositivi (batch) |
| DELETE | `/:id` | JWT | — | Elimina un'assegnazione di contenuto di un dispositivo |

## Messaggi di testo

Percorso base: `/messaging/texting`

Gestisce i provider di SMS, l'invio di messaggi di testo ai gruppi e il monitoraggio delle consegne.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/providers` | JWT | — | Carica i provider di messaggi di testo della chiesa (le credenziali sono mascherate) |
| GET | `/status` | JWT | — | `{ enabled }` — indica se la chiesa ha un provider di messaggi di testo attivo. Qualsiasi utente registrato della chiesa; usato per mostrare le opzioni **Testo** solo quando è possibile inviare messaggi |
| GET | `/inboundUrl` | JWT | `texting.send` o `settings.edit` | `{ url }` — l'URL webhook in entrata (STOP) della chiesa da incollare nel provider |
| POST | `/inbound/:churchId/:token` | Pubblico | — | Webhook per i messaggi in entrata del provider. `token` è un HMAC dell'ID della chiesa. Una risposta che è esattamente una parola di interruzione (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`) imposta `optedOut` su ogni persona corrispondente e disattiva il suo `allowSms`. Restituisce `{ optedOut: <count> }`; le altre risposte restituiscono `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Anteprima dei destinatari di un messaggio di gruppo (conteggi di idonei, disiscritti e senza telefono) |
| GET | `/sent` | JWT | — | Carica tutti i record dei messaggi di testo inviati dalla chiesa |
| GET | `/sent/:id/details` | JWT | — | Carica un messaggio inviato con i log di consegna per ciascun destinatario |
| POST | `/providers` | JWT | — | Salva i provider di messaggi di testo (batch). Cifra le credenziali API |
| POST | `/send` | JWT | — | Invia un SMS a tutti i membri idonei di un gruppo. Corpo: `{ groupId, message }`. I campi unione (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) vengono risolti per ogni destinatario |
| POST | `/sendPerson` | JWT | — | Invia un SMS a una singola persona. Corpo: `{ personId, phoneNumber, message }`. I campi unione vengono risolti e viene registrato il testo risolto |
| DELETE | `/providers/:id` | JWT | — | Elimina un provider di messaggi di testo |

### Esempio: inviare un messaggio di testo di gruppo

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
| GET | `/preview/:groupId` | JWT | — | Anteprima dell'invio email per un gruppo (numero di destinatari idonei, membri senza email) |
| POST | `/` | JWT | — | Crea o aggiorna modelli email (batch) |
| POST | `/send` | JWT | — | Invia un'email basata su modello a tutti i membri di un gruppo. Corpo: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Elimina un modello email |

### Esempio: inviare un'email a un gruppo

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

**Campi unione supportati:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## IP bloccati

Percorso base: `/messaging/blockedips`

(legacy) Blocco degli IP per la chat delle dirette streaming. Il client B1App non chiama più `POST /` — il blocco IP è stato rimosso con la migrazione alla consegna unificata. La rotta `/clear` viene ancora invocata da server a server da `StreamingServiceController` quando i servizi di streaming vengono salvati.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| POST | `/` | JWT | — | (legacy) Salva IP bloccati (batch). Nessun client attivo |
| POST | `/clear` | JWT | — | Cancella tutti gli IP bloccati per servizi specifici. Corpo: `[{ serviceId, churchId }]` |

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

- [Architettura in tempo reale](../../realtime) -- protocollo WebSocket, sottoscrizioni alle stanze e framework di consegna unificato
- [Notifiche push web](../../web-push) -- registrazione e consegna delle notifiche push nel browser
- [Endpoint Membership](./membership) -- persone, gruppi, ruoli e identità di base
- [Endpoint Attendance](./attendance) -- tracciamento di servizi e visite
- [Autenticazione e permessi](./authentication) -- flusso di accesso, JWT, OAuth, modello dei permessi
- [Struttura del modulo](../module-structure) -- organizzazione del codice
