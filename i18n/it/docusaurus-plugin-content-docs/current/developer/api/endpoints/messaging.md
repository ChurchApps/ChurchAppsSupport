---
title: "Endpoint di Messaggistica"
---

# Endpoint di Messaggistica

<div class="article-intro">

Il modulo di Messaggistica gestisce conversazioni in tempo reale, messaggi di chat, notifiche push, consegna SMS/email, connessioni WebSocket, messaggistica privata, registrazione dei dispositivi e provider di texting. Fornisce il livello di comunicazione utilizzato in tutte le applicazioni ChurchApps sia per la chat di trasmissione in diretta che per le notifiche asincrone.

</div>

**Percorso base:** `/messaging`

## Conversazioni

Percorso base: `/messaging/conversations`

| Metodo | Percorso | Auth | Autorizzazione | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Carica conversazioni per ID separati da virgola con primi/ultimi messaggi |
| GET | `/messages/:contentType/:contentId` | JWT | — | Carica conversazioni per contenuto con messaggi impaginati (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Ottieni conversazioni di tipo post per i gruppi dell'utente attuale |
| GET | `/posts/group/:groupId` | JWT | — | Ottieni conversazioni di tipo post per un gruppo specifico |
| GET | `/current/:churchId/:contentType/:contentId` | Pubblico | — | Ottieni o crea la conversazione attuale per il contenuto (auto-decrittografa contentId) |
| GET | `/:churchId/:contentType/:contentId` | Pubblico | — | Carica conversazioni per tipo di contenuto e ID |
| GET | `/:churchId/:id` | Pubblico | — | Carica una singola conversazione per ID |
| POST | `/` | JWT | — | Crea o aggiorna conversazioni (batch) |
| POST | `/start` | JWT | — | Avvia una nuova conversazione con un messaggio di commento iniziale |
| DELETE | `/:churchId/:id` | JWT | — | Elimina una conversazione |

### Controllo di accesso alle note della persona

Le conversazioni con `contentType: "person"` (la scheda Note su un record di persona) o `contentType: "personConfidential"` (la sezione Note Confidenziali) sono controllate su ogni percorso di lettura e scrittura, inclusi i percorsi altrimenti pubblici di cui sopra, che restituiscono `401` per questi tipi di contenuto. `person` richiede il permesso **Persone / Modifica** dell'API Membership; `personConfidential` richiede **Persone / Visualizza Note Confidenziali**. Per le chiavi API scoped, `people:write` esegue entrambe le azioni (l'utente della chiave deve comunque detenere il permesso di ruolo sottostante).

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

| Metodo | Percorso | Auth | Autorizzazione | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Carica tutti i messaggi per una conversazione |
| GET | `/catchup/:churchId/:conversationId` | Pubblico | — | Carica tutti i messaggi per una conversazione (catch-up pubblico per chat dal vivo) |
| GET | `/:churchId/:id` | Pubblico | — | Carica un singolo messaggio per ID |
| POST | `/` | JWT | — | Salva messaggi (batch). Invia aggiornamenti in tempo reale e attiva notifiche |
| POST | `/send` | Pubblico | — | Invia messaggi (batch, pubblico). Invia aggiornamenti in tempo reale tramite WebSocket e attiva notifiche |
| POST | `/setCallout` | JWT | — | (legacy) Trasmetti un messaggio di callout in tempo reale. Nessun client attivo; la chat di trasmissione in diretta non renderizza più i callout |
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

| Metodo | Percorso | Auth | Autorizzazione | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Carica tutti i messaggi privati per l'utente attuale (include ultimo messaggio per conversazione, contrassegna tutti come letti) |
| GET | `/existing/:personId` | JWT | — | Trova una conversazione privata esistente con una persona specifica |
| GET | `/:id` | JWT | — | Carica un messaggio privato per ID (cancella la notifica se indirizzato all'utente attuale) |
| POST | `/` | JWT | — | Invia messaggi privati (batch). Attiva la notifica push al destinatario |

## Notifiche

Percorso base: `/messaging/notifications`

| Metodo | Percorso | Auth | Autorizzazione | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Ottieni il conteggio delle notifiche non lette per l'utente attuale |
| GET | `/my` | JWT | — | Carica tutte le notifiche per l'utente attuale (contrassegna tutti come letti) |
| GET | `/tmpEmail` | Pubblico | — | Attiva il digest email di notifica giornaliera (endpoint debug/cron) |
| GET | `/:churchId/person/:personId` | JWT | — | Carica le notifiche per una persona specifica |
| GET | `/:churchId/:id` | JWT | — | Carica una notifica per ID |
| POST | `/` | JWT | — | Crea o aggiorna notifiche (batch) |
| POST | `/create` | JWT | — | Crea notifiche per più persone. Corpo: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Contrassegna tutte le notifiche come lette per una persona |
| POST | `/sendTest` | JWT | — | Invia una notifica push di test. Corpo: `{ personId, title }` |
| POST | `/ping` | Pubblico | — | Crea una notifica da un trigger esterno. Corpo: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
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

Estende CRUD standard. La classe base fornisce POST `/` (crea o aggiorna, nessuna autorizzazione richiesta).

| Metodo | Percorso | Auth | Autorizzazione | Descrizione |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Crea o aggiorna preferenze di notifica (dalla classe base CRUD) |
| GET | `/my` | JWT | — | Carica le preferenze di notifica per l'utente attuale (auto-crea default se non esistono) |

## Connessioni

Percorso base: `/messaging/connections`

Gestisce le connessioni WebSocket/real-time per chat, conversazioni di gruppo, messaggi privati e trasmissione in diretta. Vedi [Architettura Real-time](../../realtime) per il protocollo end-to-end.

| Metodo | Percorso | Auth | Autorizzazione | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Pubblico | — | Carica tutte le connessioni per una conversazione |
| POST | `/` | Pubblico | — | Registra connessioni (batch). Attiva una trasmissione di frequenza sulla conversazione. Elementi del corpo: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Pubblico | — | Aggiorna il nome visualizzato per una connessione per ID socket. Corpo: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Pubblico | — | Chiudi una connessione da una conversazione. Attiva una trasmissione di frequenza |
| POST | `/tmpSendAlert` | Pubblico | — | Invia un avviso di notifica alle connessioni di una persona. Corpo: `{ churchId, personId }` |

## Dispositivi

Percorso base: `/messaging/devices`

Gestisce la registrazione dei dispositivi per le notifiche push e l'associazione di contenuto (ad es., l'app Lessons su display TV).

| Metodo | Percorso | Auth | Autorizzazione | Descrizione |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | Registra o aggiorna un dispositivo (registrazione push mobile). Corrisponde per token FCM o ID dispositivo |
| POST | `/enrollAnon` | Pubblico | — | Registra un dispositivo anonimo e genera un codice di associazione di 4 caratteri |
| POST | `/` | Pubblico | — | Salva dispositivi (batch) |
| GET | `/pair/:pairingCode` | JWT | — | Associa un dispositivo usando il suo codice di associazione. Opzionale `?contentType=&contentId=` per assegnare il contenuto |
| GET | `/status/:deviceId` | Pubblico | — | Controlla lo stato di associazione di un dispositivo |
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

## Contenuti Dispositivo

Percorso base: `/messaging/devicecontents`

Gestisce le assegnazioni di contenuto per dispositivi associati (ad es., quale lezione viene visualizzata su una TV).

| Metodo | Percorso | Auth | Autorizzazione | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Carica le assegnazioni di contenuto per un dispositivo |
| POST | `/` | JWT | — | Salva le assegnazioni di contenuto del dispositivo (batch) |
| DELETE | `/:id` | JWT | — | Elimina un'assegnazione di contenuto del dispositivo |

## Texting

Percorso base: `/messaging/texting`

Gestisce i provider di texting SMS, la messaggistica di testo di gruppo e il tracciamento della consegna.

| Metodo | Percorso | Auth | Autorizzazione | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | Carica i provider di texting per la chiesa (le credenziali sono mascherate) |
| GET | `/preview/:groupId` | JWT | — | Anteprima dei destinatari per un testo di gruppo (conteggi idonei, non coinvolti, senza telefono) |
| GET | `/sent` | JWT | — | Carica tutti i record dei messaggi di testo inviati per la chiesa |
| GET | `/sent/:id/details` | JWT | — | Carica un testo inviato con registri di consegna per destinatario |
| POST | `/providers` | JWT | — | Salva i provider di texting (batch). Crittografa le credenziali dell'API |
| POST | `/send` | JWT | — | Invia un SMS a tutti i membri idonei di un gruppo. Corpo: `{ groupId, message }` |
| POST | `/sendPerson` | JWT | — | Invia un SMS a una singola persona. Corpo: `{ personId, phoneNumber, message }` |
| DELETE | `/providers/:id` | JWT | — | Elimina un provider di texting |

### Esempio: Invia Testo di Gruppo

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

## Modelli di Email

Percorso base: `/messaging/emailTemplates`

Gestisce i modelli di email riutilizzabili e l'invio di email con template ai gruppi.

| Metodo | Percorso | Auth | Autorizzazione | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Carica tutti i modelli di email per la chiesa |
| GET | `/:id` | JWT | — | Carica un singolo modello di email per ID |
| GET | `/preview/:groupId` | JWT | — | Anteprima della consegna email per un gruppo (conteggio dei destinatari idonei, membri senza email) |
| POST | `/` | JWT | — | Crea o aggiorna modelli di email (batch) |
| POST | `/send` | JWT | — | Invia un'email con template a tutti i membri di un gruppo. Corpo: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Elimina un modello di email |

### Esempio: Invia Email al Gruppo

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

**Campi di fusione supportati:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## IP Bloccati

Percorso base: `/messaging/blockedips`

(legacy) Blocco IP per chat di trasmissione in diretta. Il client B1App non chiama più `POST /` -- il blocco IP è stato rimosso nella migrazione di consegna unificata. Il percorso `/clear` è ancora invocato server-to-server da `StreamingServiceController` quando vengono salvati i servizi di streaming.

| Metodo | Percorso | Auth | Autorizzazione | Descrizione |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (legacy) Salva IP bloccati (batch). Nessun client attivo |
| POST | `/clear` | JWT | — | Cancella tutti gli IP bloccati per servizi specifici. Corpo: `[{ serviceId, churchId }]` |

## Registri di Consegna

Percorso base: `/messaging/deliverylogs`

Traccia lo stato di consegna per i messaggi inviati (SMS, notifiche push, email).

| Metodo | Percorso | Auth | Autorizzazione | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Carica i registri di consegna per tipo di contenuto e ID |
| GET | `/person/:personId` | JWT | — | Carica i registri di consegna per una persona. Filtri opzionali `?startDate=&endDate=` |
| GET | `/recent` | JWT | — | Carica i registri di consegna recenti per la chiesa. Opzionale `?limit=` (default 100) |
| GET | `/:id` | JWT | — | Carica un registro di consegna per ID |

## Pagine Correlate

- [Architettura Real-time](../../realtime) -- Protocollo WebSocket, sottoscrizioni di stanze e il framework di consegna unificato
- [Notifiche Push Web](../../web-push) -- Registrazione della push del browser e consegna
- [Endpoint Membership](./membership) -- Persone, gruppi, ruoli e identità centrale
- [Endpoint Frequenza](./attendance) -- Tracciamento del servizio e della visita
- [Autenticazione e Autorizzazioni](./authentication) -- Flusso di login, JWT, OAuth e modello di autorizzazione
- [Struttura Modulo](../module-structure) -- Modelli di organizzazione del codice
