---
title: "App connesse e OAuth"
---

# App connesse e OAuth

<div class="article-intro">

L'API B1 supporta OAuth 2.0, così un'applicazione di terze parti può chiedere a ciascun amministratore di chiesa il permesso di accedere ai suoi dati — senza che la chiesa condivida mai una password o una chiave API. Un'**App connessa** è un token OAuth approvato da un amministratore di chiesa; revocarlo interrompe l'accesso dell'app di terze parti con un solo clic. Usa questo percorso per connettori SaaS multi-tenant. Per un'integrazione con una sola chiesa, preferisci le [Chiavi API](./api-keys).

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un **client** OAuth deve essere registrato prima che le chiese possano concedergli l'accesso — da un amministratore server di B1, oppure dal client stesso tramite [registrazione dinamica](#dynamic-client-registration)
- Tutti gli endpoint OAuth si trovano nel modulo Membership: `/membership/oauth/...`
- I token di accesso sono JWT — contengono i permessi dell'utente filtrati in base agli scope concessi

</div>

## Concetti

| Termine | Significato |
|---|---|
| **Client OAuth** | L'app di terze parti stessa — identificata da `client_id`, protetta da `client_secret`. Registrata una volta presso B1, condivisa tra tutte le chiese che la installano. |
| **App connessa** | Una specifica coppia `(client, amministratore di chiesa)` in cui l'amministratore ha concesso l'accesso al client. Ogni App connessa è supportata da un refresh token OAuth. |
| **Token di accesso** | Un JWT di breve durata (≈ 7 giorni) che il client usa per le chiamate API. Stessa forma di un JWT utente — `Authorization: Bearer <jwt>`. |
| **Refresh token** | Una stringa opaca di lunga durata (≈ 90 giorni) che il client usa per generare nuovi token di accesso. |
| **Scope** | Limita ciò che il token di accesso può fare — vedi il [catalogo degli scope](./api-keys#scopes). |

## Flussi di autorizzazione

B1 supporta tre flussi OAuth, tutti definiti da RFC 6749 + RFC 8628.

### Authorization Code (app web)

Usalo quando la tua app ha una componente lato server e può mantenere riservato il `client_secret`.

1. **Autorizza**

   ```http
   POST /membership/oauth/authorize
   Authorization: Bearer <user JWT>
   Content-Type: application/json

   { "client_id": "...", "redirect_uri": "https://app.example.com/cb",
     "response_type": "code", "scope": "people:read groups:read", "state": "xyz" }
   ```

   I client pubblici (senza `client_secret`) devono inoltre inviare `"code_challenge": "..."` e `"code_challenge_method": "S256"` (PKCE, RFC 7636). Viene accettato solo `S256`.

   Restituisce `{ "code": "...", "state": "xyz" }`. L'endpoint del codice di autorizzazione è intenzionalmente una POST autenticata — la tua app raccoglie il JWT B1 dell'utente (di solito ospitando un pulsante nella sessione B1 dell'utente) e lo inoltra come parte del passaggio di consenso.

2. **Scambia il codice con i token**

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "authorization_code", "code": "...",
     "client_id": "...", "client_secret": "...", "redirect_uri": "..." }
   ```

   Se il passaggio di autorizzazione ha inviato un `code_challenge`, includi il corrispondente `"code_verifier": "..."`. Un client pubblico invia il verifier e omette `client_secret`. L'endpoint dei token accetta corpi JSON o codificati come form (`application/x-www-form-urlencoded`).

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

3. **Aggiorna** quando il token di accesso sta per scadere:

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "refresh_token", "refresh_token": "...",
     "client_id": "...", "client_secret": "..." }
   ```

   Il refresh token scade dopo 90 giorni di inattività; se è scaduto, l'amministratore della chiesa deve autorizzare di nuovo.

### Codice dispositivo (TV, chioschi, CLI)

Usalo quando il dispositivo non ha un browser. Definito da RFC 8628.

1. **Richiedi un codice dispositivo**

   ```http
   POST /membership/oauth/device/authorize
   Content-Type: application/json

   { "client_id": "...", "scope": "content:read" }
   ```

   Restituisce il codice visibile all'utente e l'intervallo di polling:

   ```json
   { "device_code": "...", "user_code": "WXYZ-1234",
     "verification_uri": "https://app.b1.church/device",
     "expires_in": 900, "interval": 5 }
   ```

2. Mostra `user_code` + `verification_uri` all'utente.

3. **Interroga** `/membership/oauth/token` con `grant_type=urn:ietf:params:oauth:grant-type:device_code` e il `device_code`. Risposte standard:

   | Errore | Significato |
   |---|---|
   | `authorization_pending` | L'utente non ha ancora approvato — continua a interrogare all'intervallo suggerito |
   | `expired_token` | Il codice dispositivo ha superato `expires_in` — ricomincia da capo |
   | `access_denied` | L'utente ha negato la richiesta |
   | _(nessun errore — 200 OK)_ | Approvato — il corpo è una `B1TokenResponse` |

4. Una volta approvato, conserva il `refresh_token` e usa l'`access_token` finché non scade.

L'SDK B1 include `B1OAuthClient.awaitDeviceToken(...)`, che esegue per te il ciclo di polling con un backoff sensato conforme a RFC.

### Refresh token

Sempre disponibile come richiesta autonoma una volta che hai un `refresh_token`:

```http
POST /membership/oauth/token
{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "..." }
```

Tornano un nuovo `access_token` e un nuovo `refresh_token`. I **client pubblici** (senza `client_secret`) possono omettere `client_secret` al refresh — utile per le app OAuth mobile/desktop che non possono mantenere un segreto.

I refresh token ruotano, ma quello vecchio non viene scartato subito. Se un client non riceve la risposta di refresh (ad esempio una TV che ha perso alimentazione o Wi-Fi a metà richiesta), può riprovare con il `refresh_token` precedente per un massimo di **7 giorni**. Il tentativo riesce solo finché il token sostitutivo non è stato ancora usato; il sostituto non usato viene quindi scartato e viene emessa una nuova coppia. Una volta che il sostituto è stato a sua volta aggiornato, il vecchio token restituisce `invalid_grant`. Revocare una connessione revoca anche i token ruotati ancora nella finestra di tolleranza, e l'elenco delle app connesse mostra ogni connessione una sola volta.

## Forma del token

Un token di accesso è un JWT emesso da B1, identico a quello che un utente otterrebbe da `POST /membership/users/login` — stesso claim di permessi modulare, stesso comportamento di `checkAccess` in ogni controller — **tranne** che l'array dei permessi è stato filtrato tramite gli scope concessi al momento dell'emissione. Un token di accesso con scope non può fare nulla che una chiave API con scope simili non possa fare, e non esiste un "percorso OAuth" separato in nessun controller; `actionWrapper` non sa se il portatore è una persona, una chiave API o un client OAuth.

## App connesse (per l'utente)

Dal punto di vista di un amministratore di chiesa, "App connesse" è l'elenco delle app a cui è stato concesso l'accesso alla sua chiesa. Ogni riga è una coppia `(OAuthClient, OAuthToken)` attiva.

In B1Admin: **Impostazioni → Sviluppatore → App connesse** mostra:

- Il nome del client
- Gli scope approvati dall'amministratore
- La data in cui l'accesso è stato concesso
- Un pulsante **Revoca**

| Metodo e percorso | Autenticazione | Scopo |
|---|---|---|
| `GET /membership/oauth/connections` | JWT | Elenca le connessioni attive dell'utente chiamante (unite al nome del client e agli scope) |
| `DELETE /membership/oauth/connections/:id` | JWT | Revoca una connessione tramite l'id del token OAuth — il token smette di funzionare alla richiesta successiva |

L'elenco esclude automaticamente i token scaduti.

## Scope e consenso

Le stringhe di scope sono lo stesso catalogo delle [chiavi API](./api-keys#scopes). Le buone pratiche per i client:

- **Richiedi gli scope più ristretti che funzionano.** Le chiese se ne accorgono se chiedi `donations:write` quando ti serve solo leggere le persone.
- **Usa un refresh token insieme a token di accesso di breve durata.** I token di accesso di lunga durata sono più difficili da revocare rapidamente.
- **Mostra sempre all'utente gli scope concessi** nella tua interfaccia, così può verificare a cosa ha acconsentito.

## Gestione dei client OAuth

I client OAuth (le app di terze parti stesse) sono registrati a livello globale. Un client confidenziale con `client_secret` viene creato da un amministratore server di B1 — per ottenerne uno, contatta il team ChurchApps per una coppia `client_id` / `client_secret` e registra i tuoi URI di reindirizzamento. I client pubblici come i connettori MCP possono registrarsi da soli (vedi sotto).

Gli URI di reindirizzamento registrati devono corrispondere esattamente al `redirect_uri` della richiesta; una corrispondenza parziale o per prefisso viene rifiutata.

| Metodo e percorso | Permesso | Descrizione |
|---|---|---|
| `GET /membership/oauth/clients` | Server.Admin | Elenca tutti i client OAuth |
| `GET /membership/oauth/clients/clientId/:clientId` | — | Recupera un client tramite il suo id pubblico (segreto oscurato) |
| `POST /membership/oauth/clients` | Server.Admin | Crea o aggiorna un client |
| `DELETE /membership/oauth/clients/:id` | Server.Admin | Elimina un client |

### Registrazione dinamica del client

`POST /membership/oauth/register` (pubblico, RFC 7591) permette a un client come il connettore MCP di claude.ai di registrarsi da solo. È pubblicizzato dal documento `/.well-known/oauth-authorization-server` dell'API — vedi [Server MCP → Scoperta OAuth](./mcp#oauth-discovery).

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

Nella pagina di consenso di B1Admin, un client registrato da sé riceve un avviso che indica che si è registrato da solo, che non può mai fare più di quanto possa fare l'account B1 dell'utente stesso, e che può essere disconnesso da **Impostazioni → Sviluppatore → App connesse**.

## Supporto SDK

Il pacchetto `@churchapps/integration-sdk` incapsula ogni flusso OAuth con funzioni di supporto tipizzate — `B1OAuthClient.exchangeCode()`, `.refresh()`, `.startDeviceFlow()`, `.pollDeviceToken()`, `.awaitDeviceToken()`. Vedi il README del pacchetto e [Webhook](./webhooks#sdk-support) per un esempio completo.
