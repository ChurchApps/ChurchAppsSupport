---
title: "Endpoint di Messaggistica"
---

# Endpoint di Messaggistica

<div class="article-intro">

Il modulo di Messaggistica gestisce conversazioni in tempo reale, messaggi di chat, notifiche push, consegna SMS/email, connessioni WebSocket, messaggistica privata, registrazione dei dispositivi e provider di messaggistica di testo. Fornisce il livello di comunicazione utilizzato in tutte le applicazioni ChurchApps.

</div>

**Percorso di base:** `/messaging`

## Conversazioni

Percorso di base: `/messaging/conversations`

| Metodo | Percorso | Autenticazione | Autorizzazione | Descrizione |
|--------|---------|--------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Carica conversazioni per ID |
| GET | `/messages/:contentType/:contentId` | JWT | — | Carica conversazioni per contenuto |
| POST | `/` | JWT | — | Crea o aggiorna conversazioni |
| DELETE | `/:churchId/:id` | JWT | — | Elimina una conversazione |

### Controllo di accesso alle note di persona

Le conversazioni con `contentType: "person"` (scheda Note su un record di persona) richiedono il permesso **People / Edit** della MembershipApi. Per le chiavi API con ambito, `people:write` trasporta entrambe le azioni.

## Messaggi

Percorso di base: `/messaging/messages`

| Metodo | Percorso | Autenticazione | Descrizione |
|--------|---------|--------|------------|
| GET | `/conversation/:conversationId` | JWT | — | Carica i messaggi per una conversazione |
| POST | `/` | JWT | — | Salva i messaggi |
| DELETE | `/:churchId/:id` | JWT | — | Elimina un messaggio |

## Notifiche

Percorso di base: `/messaging/notifications`

| Metodo | Percorso | Autenticazione | Descrizione |
|--------|---------|--------|------------|
| GET | `/my` | JWT | — | Carica tutte le notifiche per l'utente corrente |
| POST | `/create` | JWT | — | Crea notifiche per più persone |
| POST | `/` | JWT | — | Crea o aggiorna notifiche |
| DELETE | `/:churchId/:id` | JWT | — | Elimina una notifica |

## Dispositivi

Percorso di base: `/messaging/devices`

Gestisce la registrazione dei dispositivi per le notifiche push e l'accoppiamento del contenuto.

| Metodo | Percorso | Autenticazione | Descrizione |
|--------|---------|--------|------------|
| POST | `/enroll` | JWT | — | Registra o aggiorna un dispositivo |
| POST | `/enrollAnon` | Public | — | Registra un dispositivo anonimo |
| GET | `/pair/:pairingCode` | JWT | — | Accoppia un dispositivo usando il codice di accoppiamento |

## Messaggistica di Testo

Percorso di base: `/messaging/texting`

Gestisce i provider di messaggistica SMS, la messaggistica di gruppo e il tracciamento della consegna.

| Metodo | Percorso | Autenticazione | Descrizione |
|--------|---------|--------|------------|
| GET | `/providers` | JWT | — | Carica i provider di messaggistica di testo per la chiesa |
| POST | `/send` | JWT | — | Invia SMS a tutti i membri idonei di un gruppo |
| POST | `/sendPerson` | JWT | — | Invia SMS a una singola persona |

## Modelli Email

Percorso di base: `/messaging/emailTemplates`

Gestisce i modelli di email riutilizzabili e l'invio di email con modello.

| Metodo | Percorso | Autenticazione | Descrizione |
|--------|---------|--------|------------|
| GET | `/` | JWT | — | Carica tutti i modelli di email per la chiesa |
| POST | `/` | JWT | — | Crea o aggiorna modelli di email |
| POST | `/send` | JWT | — | Invia email con modello a tutti i membri di un gruppo |

---

## Pagine Correlate

- [Architettura in Tempo Reale](../../realtime) — Protocollo WebSocket e framework di consegna unificata
- [Endpoint di Autenticazione](./authentication) -- Flusso di accesso, JWT, OAuth e modello di autorizzazione
