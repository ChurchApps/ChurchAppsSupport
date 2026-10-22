---
title: "App connesse e OAuth"
---

# App connesse e OAuth {#connected-apps--oauth}

<div class="article-intro">

L'API di B1 supporta OAuth 2.0, così un'applicazione di terze parti può chiedere a ciascun amministratore di chiesa il permesso di accedere ai suoi dati, senza che la chiesa condivida mai una password o una chiave API. Un'**App connessa** è un token OAuth che un amministratore di chiesa ha approvato; revocarlo interrompe l'accesso dell'app di terze parti con un solo clic. Usa questo percorso per i connettori SaaS multi-tenant. Per un'integrazione con una sola chiesa, preferisci le [Chiavi API](./api-keys).

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un **client** OAuth deve essere registrato prima che le chiese possano concedergli l'accesso -- da un amministratore del server di B1, oppure dal client stesso tramite [registrazione dinamica](#dynamic-client-registration)
- Tutti gli endpoint OAuth si trovano nel modulo Membership: `/membership/oauth/...`
- I token di accesso sono JWT -- contengono i permessi dell'utente filtrati dagli ambiti concessi

</div>

## Concetti {#concepts}

| Termine | Significato |
|---|---|
| **Client OAuth** | L'app di terze parti stessa -- identificata da `client_id`, protetta da `client_secret`. Registrata una volta sola presso B1, condivisa tra tutte le chiese che la installano. |
| **App connessa** | Una specifica coppia `(client, amministratore di chiesa)` in cui l'amministratore ha concesso l'accesso al client. Ogni App connessa è supportata da un token di aggiornamento OAuth. |
| **Token di accesso** | Un JWT a breve durata (≈ 7 giorni) che il client usa per le chiamate API. Stessa struttura di un JWT utente -- `Authorization: Bearer <jwt>`. |
| **Token di aggiornamento** | Una stringa opaca a lunga durata (≈ 90 giorni) che il client usa per generare nuovi token di accesso. |
| **Ambito** | Limita ciò che il token di accesso può fare -- vedi il [catalogo degli ambiti](./api-keys#scopes). |

## Flussi di autorizzazione {#grant-flows}

B1 supporta tre flussi OAuth, tutti definiti da RFC 6749 + RFC 8628.

### Codice di autorizzazione (app web) {#authorization-code-web-apps}

Usalo quando la tua app ha una componente lato server e può mantenere riservato il `client_secret`.

1. **Autorizzazione**

   ```http
   POST /membership/oauth/authorize
   Authorization: Bearer <user JWT>
   Content-Type: application/json

   { "client_id": "...", "redirect_uri": "https://app.example.com/cb",
     "response_type": "code", "scope": "people:read groups:read", "state": "xyz" }
   ```

   I client pubblici (senza `client_secret`) devono inviare anche `"code_challenge": "..."` e `"code_challenge_method": "S256"` (PKCE, RFC 7636). Viene accettato solo `S256`.

   Restituisce `{ "code": "...", "state": "xyz" }`. L'endpoint del codice di autorizzazione è intenzionalmente un POST autenticato -- la tua app raccoglie il JWT di B1 dell'utente (di solito ospitando un pulsante nella sessione B1 dell'utente) e lo inoltra come parte del passaggio di consenso.

2. **Scambio del codice con i token**

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "authorization_code", "code": "...",
     "client_id": "...", "client_secret": "...", "redirect_uri": "..." }
   ```

   Se il passaggio di autorizzazione ha inviato un `code_challenge`, includi il corrispondente `"code_verifier": "..."`. Un client pubblico invia il verifier e omette `client_secret`. L'endpoint dei token accetta corpi JSON o codificati come modulo (`application/x-www-form-urlencoded`).

   Restituisce la risposta con i token:

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

3. **Aggiornamento** quando il token di accesso sta per scadere:

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "refresh_token", "refresh_token": "...",
     "client_id": "...", "client_secret": "..." }
   ```

   Il token di aggiornamento scade dopo 90 giorni di inutilizzo; se è scaduto, l'amministratore della chiesa deve autorizzare di nuovo.

### Codice dispositivo (TV, chioschi, CLI) {#device-code-tvs-kiosks-cli}

Usalo quando il dispositivo non ha un browser. Definito da RFC 8628.

1. **Richiedi un codice dispositivo**

   ```http
   POST /membership/oauth/device/authorize
   Content-Type: application/json

   { "client_id": "...", "scope": "content:read" }
   ```

   Restituisce il codice mostrato all'utente e l'intervallo di polling:

   ```json
   { "device_code": "...", "user_code": "WXYZ-1234",
     "verification_uri": "https://app.b1.church/device",
     "expires_in": 900, "interval": 5 }
   ```

2. Mostra `user_code` e `verification_uri` all'utente.

3. **Esegui il polling** di `/membership/oauth/token` con `grant_type=urn:ietf:params:oauth:grant-type:device_code` e il `device_code`. Risposte standard:

   | Errore | Significato |
   |---|---|
   | `authorization_pending` | L'utente non ha ancora approvato -- continua il polling all'intervallo suggerito |
   | `expired_token` | Il codice dispositivo ha superato `expires_in` -- ricomincia da capo |
   | `access_denied` | L'utente ha rifiutato la richiesta |
   | _(nessun errore — 200 OK)_ | Approvato -- il corpo è un `B1TokenResponse` |

4. Una volta approvato, conserva il `refresh_token` e usa l'`access_token` fino alla sua scadenza.

L'SDK di B1 include `B1OAuthClient.awaitDeviceToken(...)`, che esegue il ciclo di polling al posto tuo con un backoff conforme a RFC.

### Token di aggiornamento {#refresh-token}

Disponibile sempre come richiesta autonoma, una volta che possiedi un `refresh_token`:

```http
POST /membership/oauth/token
{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "..." }
```

Vengono restituiti un nuovo `access_token` e un nuovo `refresh_token`. I **client pubblici** (senza `client_secret`) possono omettere `client_secret` durante l'aggiornamento -- utile per le app OAuth per mobile e desktop, che non possono mantenere un segreto.

## Struttura del token {#token-shape}

Un token di accesso è un JWT emesso da B1, identico a quello che un utente otterrebbe da `POST /membership/users/login` -- stessa dichiarazione modulare dei permessi, stesso comportamento di `checkAccess` in ogni controller -- **tranne** che l'array dei permessi è stato filtrato in base agli ambiti concessi al momento della creazione. Un token di accesso con ambiti non può fare nulla che una chiave API con ambiti simili non possa fare, e non esiste un "percorso OAuth" separato in nessun controller: `actionWrapper` non sa se il portatore del token è una persona, una chiave API o un client OAuth.

## App connesse (per l'utente) {#connected-apps-user-facing}

Dal punto di vista di un amministratore di chiesa, "App connesse" è l'elenco delle app a cui è stato concesso l'accesso alla sua chiesa. Ogni riga è una coppia `(OAuthClient, OAuthToken)` attiva.

In B1Admin: **Impostazioni → Sviluppatore → App connesse** mostra:

- Il nome del client
- Gli ambiti che l'amministratore ha approvato
- La data in cui l'accesso è stato concesso
- Un pulsante **Revoca**

| Metodo e percorso | Autenticazione | Scopo |
|---|---|---|
| `GET /membership/oauth/connections` | JWT | Elenca le connessioni attive dell'utente chiamante (con il nome del client e gli ambiti) |
| `DELETE /membership/oauth/connections/:id` | JWT | Revoca una connessione tramite l'id del token OAuth -- il token smette di funzionare alla richiesta successiva |

L'elenco esclude automaticamente i token scaduti.

## Ambiti e consenso {#scopes--consent}

Le stringhe degli ambiti sono lo stesso catalogo delle [chiavi API](./api-keys#scopes). Buone pratiche per i client:

- **Richiedi gli ambiti più ristretti che funzionano.** Le chiese se ne accorgono se chiedi `donations:write` quando ti serve solo leggere le persone.
- **Usa un token di aggiornamento insieme a token di accesso a breve durata.** I token di accesso a lunga durata sono più difficili da revocare rapidamente.
- **Mostra sempre all'utente gli ambiti concessi** nella tua interfaccia, così può verificare a cosa ha acconsentito.

## Gestione dei client OAuth {#oauth-client-management}

I client OAuth (le app di terze parti stesse) vengono registrati a livello globale. Un client riservato con un `client_secret` viene creato da un amministratore del server di B1 -- per ottenerne uno, contatta il team di ChurchApps per una coppia `client_id` / `client_secret` e registra i tuoi URI di reindirizzamento. I client pubblici, come i connettori MCP, possono registrarsi da soli (vedi sotto).

Gli URI di reindirizzamento registrati devono corrispondere esattamente al `redirect_uri` della richiesta; una corrispondenza parziale o per prefisso viene rifiutata.

| Metodo e percorso | Permesso | Descrizione |
|---|---|---|
| `GET /membership/oauth/clients` | Server.Admin | Elenca tutti i client OAuth |
| `GET /membership/oauth/clients/clientId/:clientId` | — | Ottieni un client tramite il suo id pubblico (segreto oscurato) |
| `POST /membership/oauth/clients` | Server.Admin | Crea o aggiorna un client |
| `DELETE /membership/oauth/clients/:id` | Server.Admin | Elimina un client |

### Registrazione dinamica del client {#dynamic-client-registration}

`POST /membership/oauth/register` (pubblico, RFC 7591) permette a un client come il connettore MCP di claude.ai di registrarsi da solo. È pubblicizzato dal documento `/.well-known/oauth-authorization-server` dell'API -- vedi [Server MCP → Scoperta OAuth](./mcp#oauth-discovery).

```http
POST /membership/oauth/register
Content-Type: application/json

{ "client_name": "My AI assistant", "redirect_uris": ["https://assistant.example.com/oauth/callback"], "scope": "people:read" }
```

Restituisce 201 con `client_id`, `client_id_issued_at`, `client_name`, `redirect_uris`, `grant_types` (`authorization_code`, `refresh_token`), `response_types` (`code`) e `token_endpoint_auth_method: "none"`.

- Non viene mai emesso alcun segreto, quindi il client deve usare PKCE in ogni autorizzazione.
- `redirect_uris` deve contenere da 1 a 10 URL `https`, oppure `http` su `localhost`, `127.0.0.1` o `[::1]`.
- `client_name` viene troncato a 45 caratteri (predefinito "AI assistant").
- Limitato a 20 registrazioni all'ora per IP.

Nella pagina di consenso di B1Admin, un client registrato da sé riceve un avviso che indica che si è registrato autonomamente, non può mai fare più di quanto possa fare l'account B1 dell'utente, e può essere disconnesso da **Impostazioni → Sviluppatore → App connesse**.

## Supporto SDK {#sdk-support}

Il pacchetto `@churchapps/integration-sdk` incapsula ogni flusso OAuth con funzioni di supporto tipizzate -- `B1OAuthClient.exchangeCode()`, `.refresh()`, `.startDeviceFlow()`, `.pollDeviceToken()`, `.awaitDeviceToken()`. Vedi il README del pacchetto e [Webhook](./webhooks#sdk-support) per un esempio completo.
