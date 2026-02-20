---
title: "Endpoint Messaging"
---

# Endpoint Messaging

<div class="article-intro">

Il modulo Messaging gestisce le conversazioni in tempo reale, i messaggi di chat, le notifiche push, l'invio SMS/email, le connessioni WebSocket, la messaggistica privata, la registrazione dei dispositivi e i provider di messaggistica testuale. Fornisce il livello di comunicazione utilizzato in tutte le applicazioni ChurchApps sia per la chat in diretta streaming che per le notifiche asincrone.

</div>

**Percorso base:** `/messaging`

## Conversazioni

Percorso base: `/messaging/conversations`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Carica le conversazioni per ID separati da virgola con primo/ultimo messaggio |
| GET | `/messages/:contentType/:contentId` | JWT | — | Carica le conversazioni per contenuto con messaggi paginati (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Ottieni le conversazioni di tipo post per i gruppi dell'utente corrente |
| GET | `/posts/group/:groupId` | JWT | — | Ottieni le conversazioni di tipo post per un gruppo specifico |
| GET | `/current/:churchId/:contentType/:contentId` | Pubblico | — | Ottieni o crea la conversazione corrente per un contenuto (decrittografa automaticamente il contentId) |
| GET | `/:churchId/:contentType/:contentId` | Pubblico | — | Carica le conversazioni per tipo di contenuto e ID |
| GET | `/:churchId/:id` | Pubblico | — | Carica una singola conversazione per ID |
| POST | `/` | JWT | — | Crea o aggiorna conversazioni (batch) |
| POST | `/start` | JWT | — | Avvia una nuova conversazione con un messaggio di commento iniziale |
| DELETE | `/:churchId/:id` | JWT | — | Elimina una conversazione |

### Esempio: Avvia una Conversazione

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

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Carica tutti i messaggi per una conversazione |
| GET | `/catchup/:churchId/:conversationId` | Pubblico | — | Carica tutti i messaggi per una conversazione (recupero pubblico per chat dal vivo) |
| GET | `/:churchId/:id` | Pubblico | — | Carica un singolo messaggio per ID |
| POST | `/` | JWT | — | Salva messaggi (batch). Invia aggiornamenti in tempo reale e attiva le notifiche |
| POST | `/send` | Pubblico | — | Invia messaggi (batch, pubblico). Invia aggiornamenti in tempo reale tramite WebSocket e attiva le notifiche |
| POST | `/setCallout` | JWT | — | Trasmetti un messaggio di richiamo a una conversazione in tempo reale |
| DELETE | `/:churchId/:id` | JWT | — | Elimina un messaggio e trasmetti l'eliminazione in tempo reale |

### Esempio: Invia un Messaggio

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

## Messaggi Privati

Percorso base: `/messaging/privatemessages`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | — | Carica tutti i messaggi privati per l'utente corrente (include l'ultimo messaggio per conversazione, segna tutti come letti) |
| GET | `/existing/:personId` | JWT | — | Trova una conversazione privata esistente con una persona specifica |
| GET | `/:id` | JWT | — | Carica un messaggio privato per ID (cancella la notifica se indirizzato all'utente corrente) |
| POST | `/` | JWT | — | Invia messaggi privati (batch). Attiva la notifica push al destinatario |

## Notifiche

Percorso base: `/messaging/notifications`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/unreadCount` | JWT | — | Ottieni il conteggio delle notifiche non lette per l'utente corrente |
| GET | `/my` | JWT | — | Carica tutte le notifiche per l'utente corrente (segna tutte come lette) |
| GET | `/tmpEmail` | Pubblico | — | Attiva il digest email giornaliero delle notifiche (endpoint di debug/cron) |
| GET | `/:churchId/person/:personId` | JWT | — | Carica le notifiche per una persona specifica |
| GET | `/:churchId/:id` | JWT | — | Carica una notifica per ID |
| POST | `/` | JWT | — | Crea o aggiorna notifiche (batch) |
| POST | `/create` | JWT | — | Crea notifiche per più persone. Body: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Segna tutte le notifiche come lette per una persona |
| POST | `/sendTest` | JWT | — | Invia una notifica push di test. Body: `{ personId, title }` |
| POST | `/ping` | Pubblico | — | Crea una notifica da un trigger esterno. Body: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Elimina una notifica |

### Esempio: Crea Notifiche

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

## Preferenze di Notifica

Percorso base: `/messaging/notificationpreferences`

Estende il CRUD standard. La classe base fornisce POST `/` (crea o aggiorna, nessun permesso richiesto).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| POST | `/` | JWT | — | Crea o aggiorna le preferenze di notifica (dalla classe base CRUD) |
| GET | `/my` | JWT | — | Carica le preferenze di notifica per l'utente corrente (crea automaticamente i valori predefiniti se non esistono) |

## Connessioni

Percorso base: `/messaging/connections`

Gestisce le connessioni WebSocket/in tempo reale per la chat in diretta streaming.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/:churchId/:conversationId` | Pubblico | — | Carica tutte le connessioni per una conversazione |
| POST | `/` | Pubblico | — | Registra connessioni (batch). Numera automaticamente gli utenti anonimi e invia aggiornamenti di presenza/IP bloccati |
| POST | `/setName` | Pubblico | — | Aggiorna il nome visualizzato per una connessione tramite ID socket. Body: `{ socketId, name }` |
| POST | `/tmpSendAlert` | Pubblico | — | Invia un avviso di notifica alle connessioni di una persona. Body: `{ churchId, personId }` |

## Dispositivi

Percorso base: `/messaging/devices`

Gestisce la registrazione dei dispositivi per le notifiche push e l'abbinamento dei contenuti (es. app Lessons su display TV).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| POST | `/enroll` | JWT | — | Registra o aggiorna un dispositivo (registrazione push mobile). Corrisponde per token FCM o ID dispositivo |
| POST | `/enrollAnon` | Pubblico | — | Registra un dispositivo anonimo e genera un codice di abbinamento a 4 caratteri |
| POST | `/` | Pubblico | — | Salva dispositivi (batch) |
| GET | `/pair/:pairingCode` | JWT | — | Abbina un dispositivo utilizzando il suo codice di abbinamento. Opzionale `?contentType=&contentId=` per assegnare il contenuto |
| GET | `/status/:deviceId` | Pubblico | — | Verifica lo stato di abbinamento di un dispositivo |
| GET | `/:churchId` | JWT | — | Carica tutti i dispositivi per una chiesa |
| GET | `/:churchId/person/:personId` | JWT | — | Carica tutti i dispositivi per una persona |
| GET | `/:churchId/:id` | JWT | — | Carica un dispositivo per ID |
| DELETE | `/:churchId/:id` | JWT | — | Elimina un dispositivo |

### Esempio: Registra un Dispositivo

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

## Contenuti dei Dispositivi

Percorso base: `/messaging/devicecontents`

Gestisce le assegnazioni di contenuto per i dispositivi abbinati (es. quale lezione è visualizzata su una TV).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Carica le assegnazioni di contenuto per un dispositivo |
| POST | `/` | JWT | — | Salva le assegnazioni di contenuto del dispositivo (batch) |
| DELETE | `/:id` | JWT | — | Elimina un'assegnazione di contenuto del dispositivo |

## Messaggistica Testuale

Percorso base: `/messaging/texting`

Gestisce i provider di messaggistica SMS, la messaggistica di gruppo e il tracciamento delle consegne.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/providers` | JWT | — | Carica i provider di messaggistica testuale per la chiesa (le credenziali sono mascherate) |
| GET | `/preview/:groupId` | JWT | — | Anteprima dei destinatari per un messaggio di gruppo (conteggi idonei, rinunce, senza telefono) |
| GET | `/sent` | JWT | — | Carica tutti i record dei messaggi di testo inviati per la chiesa |
| GET | `/sent/:id/details` | JWT | — | Carica un messaggio inviato con i log di consegna per destinatario |
| POST | `/providers` | JWT | — | Salva i provider di messaggistica testuale (batch). Crittografa le credenziali API |
| POST | `/send` | JWT | — | Invia un SMS a tutti i membri idonei di un gruppo. Body: `{ groupId, message }` |
| POST | `/sendPerson` | JWT | — | Invia un SMS a una singola persona. Body: `{ personId, phoneNumber, message }` |
| DELETE | `/providers/:id` | JWT | — | Elimina un provider di messaggistica testuale |

### Esempio: Invia Messaggio di Testo al Gruppo

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

## IP Bloccati

Percorso base: `/messaging/blockedips`

Gestisce il blocco degli IP per le conversazioni chat in diretta streaming.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| POST | `/` | JWT | — | Salva gli IP bloccati (batch). Trasmetti la lista aggiornata dei blocchi alla conversazione |
| POST | `/clear` | JWT | — | Cancella tutti gli IP bloccati per servizi specifici. Body: `[{ serviceId, churchId }]` |

## Log di Consegna

Percorso base: `/messaging/deliverylogs`

Traccia lo stato di consegna per i messaggi inviati (SMS, notifiche push, email).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Carica i log di consegna per tipo di contenuto e ID |
| GET | `/person/:personId` | JWT | — | Carica i log di consegna per una persona. Filtri opzionali `?startDate=&endDate=` |
| GET | `/recent` | JWT | — | Carica i log di consegna recenti per la chiesa. Opzionale `?limit=` (predefinito 100) |
| GET | `/:id` | JWT | — | Carica un log di consegna per ID |

## Pagine Correlate

- [Endpoint Membership](./membership) -- Persone, gruppi, ruoli e identità principale
- [Endpoint Attendance](./attendance) -- Tracciamento servizi e visite
- [Autenticazione e Permessi](./authentication) -- Flusso di login, JWT, OAuth, modello dei permessi
- [Struttura dei Moduli](../module-structure) -- Pattern di organizzazione del codice
