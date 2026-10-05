---
title: "Endpoint di Messaggistica"
---

# Endpoint di Messaggistica

<div class="article-intro">

Il modulo Messaggistica gestisce le conversazioni in tempo reale, i messaggi di chat, le notifiche push, la consegna di SMS/email, le connessioni WebSocket, la messaggistica privata, la registrazione dei dispositivi e i provider di servizi di testo. Fornisce il livello di comunicazione utilizzato in tutte le applicazioni ChurchApps sia per la chat di streaming dal vivo che per le notifiche asincrone.

</div>

**Percorso base:** `/messaging`

## Conversazioni

Percorso base: `/messaging/conversations`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Carica le conversazioni per ID separati da virgola con i primi/ultimi messaggi |
| GET | `/messages/:contentType/:contentId` | JWT | — | Carica le conversazioni per il contenuto con messaggi impaginati (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Ottieni conversazioni di tipo post per i gruppi dell'utente corrente |
| GET | `/posts/group/:groupId` | JWT | — | Ottieni conversazioni di tipo post per un gruppo specifico |
| GET | `/current/:churchId/:contentType/:contentId` | Public | — | Ottieni o crea la conversazione corrente per il contenuto (decrittografa automaticamente contentId) |
| GET | `/:churchId/:contentType/:contentId` | Public | — | Carica le conversazioni per tipo di contenuto e ID |
| GET | `/:churchId/:id` | Public | — | Carica una singola conversazione per ID |
| POST | `/` | JWT | — | Crea o aggiorna le conversazioni (batch) |
| POST | `/start` | JWT | — | Avvia una nuova conversazione con un messaggio di commento iniziale |
| DELETE | `/:churchId/:id` | JWT | — | Elimina una conversazione |

### Controllo dell'accesso alle note personali

Le conversazioni con `contentType: "person"` (la scheda Note su un record di persona) o `contentType: "personConfidential"` (la sezione Note Riservate) sono protette su ogni percorso di lettura e scrittura, inclusi i percorsi altrimenti pubblici sopra, che restituiscono `401` per questi tipi di contenuto. `person` richiede l'autorizzazione MembershipApi **Persone / Modifica**; `personConfidential` richiede **Persone / Visualizza Note Riservate**. Per le chiavi API con ambito, `people:write` copre entrambe le azioni (l'utente della chiave deve comunque detenere l'autorizzazione del ruolo sottostante).

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

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Carica tutti i messaggi per una conversazione |
| GET | `/catchup/:churchId/:conversationId` | Public | — | Carica tutti i messaggi per una conversazione (recupero pubblico per chat dal vivo) |
| GET | `/:churchId/:id` | Public | — | Carica un singolo messaggio per ID |
| POST | `/` | JWT | — | Salva i messaggi (batch). Invia aggiornamenti in tempo reale e attiva le notifiche. L'aggiornamento di un messaggio esistente richiede di esserne l'autore o di detenere `content.edit`; l'autore memorizzato non è mai riassegnabile |
| POST | `/send` | Public | — | Invia messaggi (batch, pubblico). Invia aggiornamenti in tempo reale tramite WebSocket e attiva le notifiche |
| POST | `/setCallout` | JWT | — | (legacy) Trasmetti un messaggio di callout in tempo reale. Nessun client attivo; la chat in streaming dal vivo non esegue più il rendering dei callout |
| DELETE | `/:churchId/:id` | JWT | — | Elimina un messaggio e trasmetti l'eliminazione in tempo reale. Vedi [Moderazione dei messaggi](#message-moderation) |

### Moderazione dei messaggi

L'eliminazione di un messaggio è consentita per:

- l'autore del messaggio;
- il personale con `content.edit` (in qualsiasi luogo della chiesa);
- **leader di gruppo**, per le conversazioni con un `contentType` di `group` o `groupAnnouncement` il cui `contentId` è un gruppo che conducono (`leaderGroupIds` su JWT).

Le conversazioni con note personali (`person` / `personConfidential`) non sono mai moderate dai leader — utilizzano le autorizzazioni delle note (`people.edit`, `people.viewConfidentialNotes`).

I leader ricevono solo l'eliminazione, non la modifica: la riscrittura del messaggio di un altro membro rimane limitata all'autore e al personale `content.edit`.

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

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Carica tutti i messaggi privati per l'utente corrente (include l'ultimo messaggio per conversazione, contrassegna tutti come letti) |
| GET | `/existing/:personId` | JWT | — | Trova una conversazione privata esistente con una persona specifica |
| GET | `/:id` | JWT | — | Carica un messaggio privato per ID (cancella la notifica se indirizzata all'utente corrente) |
| POST | `/` | JWT | — | Invia messaggi privati (batch). Attiva la notifica push al destinatario |

## Notifiche

Percorso base: `/messaging/notifications`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Ottieni il conteggio delle notifiche non lette per l'utente corrente |
| GET | `/my` | JWT | — | Carica tutte le notifiche per l'utente corrente (contrassegna tutte come lette) |
| GET | `/tmpEmail` | Public | — | Attiva il digest di notifiche email giornaliere (endpoint debug/cron) |
| GET | `/:churchId/person/:personId` | JWT | — | Carica le notifiche per una persona specifica |
| GET | `/:churchId/:id` | JWT | — | Carica una notifica per ID |
| POST | `/` | JWT | — | Crea o aggiorna le notifiche (batch) |
| POST | `/create` | JWT | — | Crea notifiche per più persone. Corpo: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Contrassegna tutte le notifiche come lette per una persona |
| POST | `/sendTest` | JWT | — | Invia una notifica push di prova. Corpo: `{ personId, title }` |
| POST | `/ping` | Public | — | Crea una notifica da un trigger esterno. Corpo: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
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

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Crea o aggiorna le preferenze di notifica (dalla classe base CRUD) |
| GET | `/my` | JWT | — | Carica le preferenze di notifica per l'utente corrente (crea automaticamente i valori predefiniti se non esistono) |

## Connessioni

Percorso base: `/messaging/connections`

Gestisce le connessioni WebSocket/in tempo reale per chat, conversazioni di gruppo, messaggi privati e streaming dal vivo. Vedi [Architettura in Tempo Reale](../../realtime) per il protocollo end-to-end.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Public | — | Carica tutte le connessioni per una conversazione |
| POST | `/` | Public | — | Registra le connessioni (batch). Attiva una trasmissione di frequenza sulla conversazione. Elementi del corpo: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Public | — | Aggiorna il nome visualizzato per una connessione per socket ID. Corpo: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Public | — | Elimina una connessione da una conversazione. Attiva una trasmissione di frequenza |
| POST | `/tmpSendAlert` | Public | — | Invia un avviso di notifica alle connessioni di una persona. Corpo: `{ churchId, personId }` |

## Dispositivi

Percorso base: `/messaging/devices`

Gestisce la registrazione dei dispositivi per le notifiche push e l'associazione dei contenuti (ad es., app Lezioni sui display TV).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | Registra o aggiorna un dispositivo (registrazione push mobile). Abbina per token FCM o ID dispositivo |
| POST | `/enrollAnon` | Public | — | Registra un dispositivo anonimo e genera un codice di associazione a 4 caratteri |
| POST | `/` | Public | — | Salva i dispositivi (batch) |
| GET | `/pair/:pairingCode` | JWT | — | Accoppia un dispositivo utilizzando il suo codice di associazione. Facoltativo `?contentType=&contentId=` per assegnare il contenuto |
| GET | `/status/:deviceId` | Public | — | Controlla lo stato di associazione di un dispositivo |
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

Gestisce le assegnazioni di contenuto per i dispositivi associati (ad es., quale lezione viene visualizzata su una TV).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Carica le assegnazioni di contenuto per un dispositivo |
| POST | `/` | JWT | — | Salva le assegnazioni di contenuto del dispositivo (batch) |
| DELETE | `/:id` | JWT | — | Elimina un'assegnazione di contenuto del dispositivo |

## Servizio di Messaggi di Testo

Percorso base: `/messaging/texting`

Gestisce i provider di servizi di messaggistica SMS, la messaggistica di testo di gruppo e il tracciamento della consegna.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | Carica i provider di servizi di testo per la chiesa (le credenziali sono mascherate) |
| GET | `/preview/:groupId` | JWT | — | Visualizza l'anteprima dei destinatari per un messaggio di testo di gruppo (conti idonei, esclusi, senza telefono) |
| GET | `/sent` | JWT | — | Carica tutti i record di messaggi di testo inviati per la chiesa |
| GET | `/sent/:id/details` | JWT | — | Carica un messaggio di testo inviato con registri di consegna per destinatario |
| POST | `/providers` | JWT | — | Salva i provider di servizi di testo (batch). Crittografa le credenziali API |
| POST | `/send` | JWT | — | Invia un SMS a tutti i membri idonei di un gruppo. Corpo: `{ groupId, message }`. I campi di unione (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) vengono risolti per destinatario |
| POST | `/sendPerson` | JWT | — | Invia un SMS a una singola persona. Corpo: `{ personId, phoneNumber, message }`. I campi di unione vengono risolti e il testo risolto è quello che viene registrato |
| DELETE | `/providers/:id` | JWT | — | Elimina un provider di servizi di testo |

### Esempio: Invia Messaggio di Testo di Gruppo

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

Gestisce i modelli di email riutilizzabili e l'invio di email basate su modelli ai gruppi.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Carica tutti i modelli di email per la chiesa |
| GET | `/:id` | JWT | — | Carica un singolo modello di email per ID |
| GET | `/preview/:groupId` | JWT | — | Visualizza l'anteprima della consegna di email per un gruppo (numero di destinatari idonei, membri senza email) |
| POST | `/` | JWT | — | Crea o aggiorna i modelli di email (batch) |
| POST | `/send` | JWT | — | Invia un'email basata su modello a tutti i membri di un gruppo. Corpo: `{ groupId, subject, htmlContent }` |
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

**Campi di unione supportati:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## IP Bloccati

Percorso base: `/messaging/blockedips`

(legacy) Blocco IP per chat in streaming dal vivo. Il client B1App non chiama più `POST /` — il blocco IP è stato rimosso nella migrazione della consegna unificata. Il percorso `/clear` è ancora invocato da server a server da `StreamingServiceController` quando i servizi di streaming vengono salvati.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (legacy) Salva gli IP bloccati (batch). Nessun client attivo |
| POST | `/clear` | JWT | — | Cancella tutti gli IP bloccati per servizi specifici. Corpo: `[{ serviceId, churchId }]` |

## Registri di Consegna

Percorso base: `/messaging/deliverylogs`

Traccia lo stato di consegna per i messaggi inviati (SMS, notifiche push, email).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Carica i registri di consegna per tipo di contenuto e ID |
| GET | `/person/:personId` | JWT | — | Carica i registri di consegna per una persona. Filtri facoltativi `?startDate=&endDate=` |
| GET | `/recent` | JWT | — | Carica i registri di consegna recenti per la chiesa. Facoltativo `?limit=` (predefinito 100) |
| GET | `/:id` | JWT | — | Carica un registro di consegna per ID |

## Pagine Correlate

- [Architettura in Tempo Reale](../../realtime) -- Protocollo WebSocket, sottoscrizioni di stanze e framework di consegna unificato
- [Notifiche Push Web](../../web-push) -- Iscrizione push del browser e consegna
- [Endpoint di Iscrizione](./membership) -- Persone, gruppi, ruoli e identità centrale
- [Endpoint di Presenze](./attendance) -- Tracciamento di servizi e visite
- [Autenticazione e Autorizzazioni](./authentication) -- Flusso di accesso, JWT, OAuth, modello di autorizzazione
- [Struttura dei Moduli](../module-structure) -- Modelli di organizzazione del codice
