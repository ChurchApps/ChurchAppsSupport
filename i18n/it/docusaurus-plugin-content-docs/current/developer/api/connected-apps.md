---
title: "App connesse e OAuth"
---

# App connesse e OAuth

<div class="article-intro">

L'API B1 supporta OAuth 2.0 affinché un'applicazione di terze parti possa chiedere il permesso a ogni amministratore della chiesa per accedere ai loro dati — senza che la chiesa condivida mai una password o chiave API. Un'**App connessa** è un token OAuth che un amministratore della chiesa ha approvato; revocarlo taglia l'accesso dell'app di terze parti con un clic. Utilizza questo percorso per connettori SaaS multi-tenant. Per un'integrazione a chiesa singola preferisci [Chiavi API](./api-keys).

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un **client** OAuth deve essere registrato (attualmente da un amministratore del server B1) prima che le chiese possano concedergli accesso
- Tutti gli endpoint OAuth vivono sotto il modulo Membership: `/membership/oauth/...`
- I token di accesso sono JWT — portano i permessi dell'utente filtrati dagli ambiti concessi

</div>

## Concetti

| Termine | Significato |
|---|---|
| **Client OAuth** | L'app di terze parti stessa — identificata da `client_id`, protetta da `client_secret`. Registrata una volta con B1, condivisa tra tutte le chiese che la installano. |
| **App connessa** | Una coppia specifica `(client, church-admin)` dove l'admin ha concesso al client l'accesso. Ogni app connessa è sostenuta da un token di aggiornamento OAuth. |
| **Token di accesso** | Un JWT a breve durata (≈ 7 giorni) che il client utilizza per le chiamate API. Stessa forma di un JWT utente — `Authorization: Bearer <jwt>`. |
| **Token di aggiornamento** | Una stringa opaca a lunga durata (≈ 90 giorni) che il client utilizza per coniare nuovi token di accesso. |
| **Ambito** | Limita quello che il token di accesso può fare — vedi il [catalogo di ambiti](./api-keys#scopes). |

## Flussi di concessione

B1 supporta tre flussi OAuth, tutti definiti da RFC 6749 + RFC 8628.

### Codice di autorizzazione (app web)

Usa quando la tua app ha una componente lato server e può mantenere `client_secret` privato.

1. **Autorizza**

   ```http
   POST /membership/oauth/authorize
   Authorization: Bearer <user JWT>
   Content-Type: application/json

   { "client_id": "...", "redirect_uri": "https://app.example.com/cb",
     "response_type": "code", "scope": "people:read groups:read", "state": "xyz" }
   ```

   Restituisce `{ "code": "...", "state": "xyz" }`. L'endpoint del codice di autorizzazione è intenzionalmente un POST autenticato — la tua app raccoglie il JWT B1 dell'utente (in genere ospitando un pulsante nella sessione B1 dell'utente) e lo inoltra come parte del passaggio di consenso.

2. **Scambia il codice per i token**

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "authorization_code", "code": "...",
     "client_id": "...", "client_secret": "...", "redirect_uri": "..." }
   ```

   Restituisce la risposta del token:

   ```json
   {
     "access_token": "eyJ...",
     "token_type": "Bearer",
     "expires_in": 604800,
     "created_at": 1715000000,
     "refresh_token": "abc123…",
     "scope": "people:read groups:read"
   }
   ```

3. **Aggiorna** quando il token di accesso sta per scadere:

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "refresh_token", "refresh_token": "...",
     "client_id": "...", "client_secret": "..." }
   ```

   Il token di aggiornamento scade dopo 90 giorni di mancato utilizzo; se è scaduto l'amministratore della chiesa riautorizza.

### Codice dispositivo (TV, chioschi, CLI)

Usa quando il dispositivo non ha un browser. Definito da RFC 8628.

1. **Richiedi un codice dispositivo**

   ```http
   POST /membership/oauth/device/authorize
   Content-Type: application/json

   { "client_id": "...", "scope": "content:read" }
   ```

   Restituisce il codice rivolto all'utente e l'intervallo di polling:

   ```json
   { "device_code": "...", "user_code": "WXYZ-1234",
     "verification_uri": "https://app.b1.church/device",
     "expires_in": 900, "interval": 5 }
   ```

2. Visualizza `user_code` + `verification_uri` all'utente.

3. **Poll** `/membership/oauth/token` con `grant_type=urn:ietf:params:oauth:grant-type:device_code` e il `device_code`. Risposte standard:

   | Errore | Significato |
   |---|---|
   | `authorization_pending` | L'utente non ha ancora approvato — continua a fare polling all'intervallo suggerito |
   | `expired_token` | Il codice dispositivo è passato `expires_in` — ricomincia |
   | `access_denied` | L'utente ha rifiutato la richiesta |
   | _(nessuno — 200 OK)_ | Approvato — il corpo è un `B1TokenResponse` |

4. Una volta approvato, archivia il `refresh_token` e utilizza l'`access_token` fino alla scadenza.

L'SDK B1 include `B1OAuthClient.awaitDeviceToken(...)` che esegue il ciclo di polling per te con backoff conforme alla RFC.

### Token di aggiornamento

Sempre disponibile come richiesta autonoma una volta che possiedi un `refresh_token`:

```http
POST /membership/oauth/token
{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "..." }
```

Ritornano un nuovo `access_token` e `refresh_token`. I **client pubblici** (nessun `client_secret`) possono omettere `client_secret` sull'aggiornamento — utile per app OAuth mobile/desktop che non possono mantenere un segreto.

## Forma del token

Un token di accesso è un JWT emesso da B1 identico a quello che un utente otterrebbe da `POST /membership/users/login` — stesso reclamo di permesso modulare, stesso comportamento di `checkAccess` in ogni controller — **ad eccezione** dell'array di permessi è stato filtrato attraverso gli ambiti concessi al momento della coniazione. Un token di accesso con scopo non può fare nulla che un token API con scopo simile non potrebbe, e non c'è un "percorso OAuth" separato in alcun controller; `actionWrapper` non è consapevole se il portatore è una persona, una chiave API o un client OAuth.

## App connesse (rivolte all'utente)

Dal punto di vista di un amministratore della chiesa, "App connesse" è l'elenco delle app a cui è stato concesso l'accesso alla loro chiesa. Ogni riga è una coppia live `(OAuthClient, OAuthToken)`.

In B1Admin: **Impostazioni → Sviluppatore → App connesse** mostra:

- Il nome del client
- Gli ambiti che l'admin ha approvato
- La data in cui l'accesso è stato concesso
- Un pulsante **Revoca**

| Metodo e percorso | Auth | Scopo |
|---|---|---|
| `GET /membership/oauth/connections` | JWT | Elencare le proprie connessioni attive (unite al nome del client + ambiti) |
| `DELETE /membership/oauth/connections/:id` | JWT | Revocare una connessione con il suo id di token OAuth — il token smette di funzionare alla richiesta successiva |

L'elenco esclude automaticamente i token scaduti.

## Ambiti e consenso

Le stringhe di ambito sono lo stesso catalogo delle [chiavi API](./api-keys#scopes). Pratiche consigliate per i client:

- **Richiedi gli ambiti più ristretti che funzionano.** Le chiese notano se chiedi `donations:write` quando hai bisogno solo di leggere le persone.
- **Utilizza un token di aggiornamento più token di accesso a breve durata.** I token di accesso a lunga durata sono più difficili da revocare rapidamente.
- **Presenta sempre gli ambiti concessi all'utente** nella tua interfaccia utente affinché possano verificare a cosa hanno acconsentito.

## Gestione del client OAuth

I client OAuth (le app di terze parti stesse) sono attualmente registrati globalmente da un amministratore del server B1. L'auto-registrazione per chiesa è sulla roadmap — fino ad allora, per spedire un connettore pubblico contatta il team ChurchApps per coniare una coppia `client_id` / `client_secret` e registrare i tuoi URI di reindirizzamento.

| Metodo e percorso | Permesso | Descrizione |
|---|---|---|
| `GET /membership/oauth/clients` | Server.Admin | Elencare tutti i client OAuth |
| `GET /membership/oauth/clients/clientId/:clientId` | — | Ottenere un client con il suo id pubblico (segreto redatto) |
| `POST /membership/oauth/clients` | Server.Admin | Creare o aggiornare un client |
| `DELETE /membership/oauth/clients/:id` | Server.Admin | Eliminare un client |

## Supporto SDK

Il pacchetto `@churchapps/integration-sdk` avvolge ogni flusso OAuth con helper tipizzati — `B1OAuthClient.exchangeCode()`, `.refresh()`, `.startDeviceFlow()`, `.pollDeviceToken()`, `.awaitDeviceToken()`. Vedi il README del pacchetto e [Webhook](./webhooks#sdk-support) per un esempio end-to-end.
