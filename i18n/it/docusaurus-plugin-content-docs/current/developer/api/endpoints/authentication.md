---
title: "Autenticazione e permessi"
---

# Autenticazione e permessi

<div class="article-intro">

L'API di ChurchApps usa l'autenticazione basata su JWT. Gli utenti effettuano il login per ricevere un token che codifica la loro identità, l'appartenenza alla chiesa e i permessi. Questa pagina descrive il flusso di autenticazione, il modello dei permessi e il supporto OAuth.

</div>

## Flusso di login

### Login standard

```
POST /membership/users/login
```

**Auth:** Public

Accetta uno di tre tipi di credenziali:

| Campo | Descrizione |
|-------|-------------|
| `email` + `password` | Login standard con email e password |
| `jwt` | Nuova autenticazione con un JWT esistente |
| `authGuid` | Link di autenticazione monouso (usato nelle email di benvenuto e di reimpostazione) |

**Risposta:**

```json
{
  "user": {
    "id": "abc-123",
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@example.com"
  },
  "churches": [
    {
      "church": { "id": "church-1", "name": "First Church", "subDomain": "firstchurch" },
      "person": { "id": "person-1", "membershipStatus": "Member" },
      "groups": [{ "id": "group-1", "name": "Choir", "leader": false }],
      "apis": [
        {
          "keyName": "MembershipApi",
          "permissions": [
            { "contentType": "People", "action": "View" },
            { "contentType": "People", "action": "Edit" }
          ]
        }
      ]
    }
  ],
  "token": "<jwt-token>"
}
```

Il campo `token` è un JWT che deve essere inviato come `Authorization: Bearer <token>` nelle richieste successive.

### Accesso con verifica in due passaggi

Gli utenti possono attivare la verifica in due passaggi con app di autenticazione (TOTP). Per questi utenti, un login con `email` + `password`, `authGuid` o SSO non restituisce un token. Restituisce invece una sfida:

```json
{ "mfaRequired": true, "mfaToken": "<challenge-token>" }
```

Il token di sfida è valido per 5 minuti. Va inviato di nuovo allo stesso endpoint insieme al codice:

```json
{ "mfaToken": "<challenge-token>", "mfaCode": "123456" }
```

`mfaCode` può essere il codice corrente a 6 cifre dell'app di autenticazione oppure uno dei dieci codici di backup monouso dell'utente. Un codice errato restituisce `Invalid code`, e i tentativi falliti ripetuti sono limitati per account. Un nuovo login con `jwt` non viene mai sottoposto a sfida, quindi le sessioni esistenti continuano a essere rinnovate. L'oggetto `user` della risposta di login contiene `mfaEnabled`.

Endpoint self-service (solo per l'utente autenticato, sotto `/membership/users/mfa`):

| Endpoint | Descrizione |
|----------|-------------|
| `GET /status` | `{ enabled, backupCodesLeft }` |
| `POST /setup` | Avvia la configurazione; restituisce `{ secret, otpauthUrl }` per il codice QR |
| `POST /enable` | Corpo `{ code }`; attiva la verifica e restituisce `{ backupCodes }` una sola volta |
| `POST /disable` | Corpo `{ code }` (codice dell'app o codice di backup); la disattiva |
| `POST /reset/:userId` | Solo Server.Admin; la disattiva per un altro utente |

I segreti sono memorizzati cifrati e i codici di backup sono memorizzati come hash. Attivazione, disattivazione e reimpostazione vengono registrate nel log di audit.

### Contenuto del token

Il JWT codifica:
- `id` — ID utente
- `churchId` — Chiesa attualmente selezionata
- `personId` — Record della persona per la chiesa selezionata
- Array dei permessi per ogni API

### Selezione della chiesa

Gli utenti possono appartenere a più chiese. La risposta di login include tutte le chiese con i relativi permessi. Per cambiare chiesa, il client genera un nuovo JWT limitato a un'altra chiesa presa dai dati della risposta di login.

## Registrazione utente

### Registrare un nuovo utente

```
POST /membership/users/register
```

**Auth:** Public

```json
{
  "email": "jane@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "appName": "B1 Admin",
  "appUrl": "https://app.b1.church"
}
```

Crea un utente con una password temporanea e invia un'email di benvenuto con un link di autenticazione. Il primo utente registrato su una nuova istanza riceve automaticamente l'accesso di amministratore del server.

Sono accettati due campi facoltativi anti-bot: `website` (un campo honeypot nascosto che gli utenti reali lasciano vuoto) e `fillMs` (quanto tempo è rimasto aperto il modulo, in millisecondi). Se `website` è compilato oppure `fillMs` è inferiore a 2000, non viene creato alcun account, ma l'endpoint restituisce comunque una normale risposta `200`, in modo che i bot non possano capire di essere stati respinti. I client che omettono entrambi i campi si registrano normalmente.

### Registrare una nuova chiesa

```
POST /membership/churches/add
```

**Auth:** JWT

Dopo aver registrato un utente, chiama questo endpoint per creare una chiesa e associarvi l'utente.

## Gestione delle password

| Metodo | Percorso | Auth | Descrizione |
|--------|----------|------|-------------|
| POST | `/membership/users/forgot` | Public | Invia un'email di reimpostazione della password. Corpo: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Public | Imposta una nuova password usando un GUID di autenticazione dall'email di reimpostazione. Corpo: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Cambia la password dell'utente corrente. Corpo: `{ "newPassword": "..." }` |

## Modello dei permessi

I permessi sono organizzati per modulo e assegnati agli utenti tramite i ruoli. Ogni permesso ha un **tipo di contenuto** e un'**azione**.

### Riferimento dei permessi

| Sezione visualizzata | Tipo di contenuto | Azione | Descrizione |
|----------------------|-------------------|--------|-------------|
| **Presenze** | Attendance | Checkin | Registra la presenza dei membri ai culti |
| | Attendance | Edit | Modifica i record di presenza |
| | Services | Edit | Gestisce i culti e gli orari dei culti |
| | Attendance | View | Visualizza i record di presenza |
| | Attendance | View Summary | Visualizza i riepiloghi e i report delle presenze |
| **Donazioni** | Donations | Edit | Crea e modifica i record delle donazioni |
| | Settings | Edit | Modifica le impostazioni di offerte/pagamenti |
| | Donations | View Summary | Visualizza i report di riepilogo delle donazioni |
| | Donations | View | Visualizza i singoli record delle donazioni |
| **Persone e gruppi** | Forms | Admin | Piena amministrazione dei moduli |
| | Forms | Edit | Modifica le definizioni dei moduli |
| | Plans | Edit | Modifica i piani di servizio |
| | Group Members | Edit | Aggiunge/rimuove membri dei gruppi |
| | Groups | Edit | Crea e modifica i gruppi |
| | Households | Edit | Modifica le assegnazioni dei nuclei familiari |
| | People | Edit | Modifica qualsiasi record di persona |
| | People | Edit Self | Modifica solo il proprio record di persona |
| | Roles | Edit | Gestisce i ruoli e le assegnazioni degli utenti |
| | Group Members | View | Visualizza gli elenchi dei membri dei gruppi |
| | People | View Members | Visualizza solo i membri (non i visitatori) |
| | People | View | Visualizza tutte le persone |
| | Roles | View | Visualizza i ruoli e le assegnazioni |
| | Settings | Edit | Modifica le impostazioni della chiesa |
| **Contenuti** | Content | Edit | Modifica pagine, sezioni, elementi |
| | Settings | Edit | Modifica le impostazioni dei contenuti |
| | StreamingServices | Edit | Gestisce la configurazione dei servizi in streaming |
| | Chat | Host | Ospita/modera le sessioni di chat |
| **Messaggistica** | Texting | Send | Invia messaggi di testo SMS |

### Come vengono verificati i permessi

Nei controller, i permessi vengono verificati con il metodo `au.checkAccess()`:

```typescript
// Require specific permission
if (!au.checkAccess(Permissions.people.edit)) return this.json({}, 401);

// Or within actionWrapper — the CRUD system checks automatically
crudSettings: {
  permissions: {
    view: Permissions.people.view,
    edit: Permissions.people.edit
  }
}
```

### Amministratore del server

Il permesso `Server.Admin` concede pieno accesso a tutte le chiese. Viene assegnato al primo utente registrato e può essere concesso ad altri tramite il ruolo di amministratore del server.

## OAuth 2.0

L'API supporta OAuth 2.0 per le integrazioni di terze parti. Sono disponibili due tipi di concessione.

### Flusso con codice di autorizzazione

1. **Autorizzazione:** `POST /membership/oauth/authorize` (richiede JWT)
   - Corpo: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "...", "code_challenge": "...", "code_challenge_method": "S256" }`
   - `code_challenge` / `code_challenge_method` (PKCE, solo `S256`) sono obbligatori per i client pubblici senza segreto
   - Restituisce: `{ "code": "...", "state": "..." }`

2. **Scambio del codice con un token:** `POST /membership/oauth/token` (Public)
   - Corpo: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "...", "code_verifier": "..." }`
   - Invia `code_verifier` quando il passaggio di autorizzazione ha usato un `code_challenge`; i client pubblici omettono `client_secret`. Sono accettati corpi JSON o codificati come form
   - Restituisce: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Token di aggiornamento:** `POST /membership/oauth/token` (Public)
   - Corpo: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

I token di accesso scadono dopo **12 ore**.

### Flusso con codice dispositivo (RFC 8628)

Per i dispositivi senza browser (app per TV, chioschi):

1. **Richiesta del codice dispositivo:** `POST /membership/oauth/device/authorize` (Public)
   - Corpo: `{ "client_id": "...", "scope": "..." }`
   - Restituisce: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **L'utente inserisce il codice** nell'URI di verifica e approva o nega l'accesso

3. **Interrogazione per il token:** `POST /membership/oauth/token` (Public)
   - Corpo: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Restituisce `authorization_pending` finché non viene approvato, quindi restituisce il token di accesso

### Gestione dei client OAuth

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | Elenca tutti i client OAuth |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Ottiene un client tramite ID |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Ottiene un client tramite client ID (segreto oscurato) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | Crea o aggiorna un client |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | Elimina un client |
| POST | `/membership/oauth/register` | Public | — | Registrazione dinamica del client (RFC 7591) per client pubblici come i connettori MCP. Vedi [App connesse](../connected-apps#dynamic-client-registration) |

### Endpoint di approvazione dei dispositivi

| Metodo | Percorso | Auth | Descrizione |
|--------|----------|------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Ottiene le informazioni sul codice dispositivo in attesa per l'interfaccia di approvazione |
| POST | `/membership/oauth/device/approve` | JWT | Approva un'autorizzazione del dispositivo. Corpo: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Nega un'autorizzazione del dispositivo. Corpo: `{ "user_code": "..." }` |

## Endpoint pubblici e autenticati

L'API usa due funzioni wrapper che determinano i requisiti di autenticazione:

- **`actionWrapper`** — Richiede un JWT valido. L'oggetto utente autenticato (`au`) è disponibile con `churchId`, `userId` e i controlli dei permessi.
- **`actionWrapperAnon`** — Non richiede autenticazione. Usato per login, registrazione, consultazione di contenuti pubblici e ricevitori di webhook.

Nelle tabelle degli endpoint di questa documentazione, questi sono indicati rispettivamente come **JWT** e **Public** nella colonna Auth.

## Pagine correlate

- [Struttura del modulo](../module-structure) — Come sono organizzati controller, repository e modelli
- [Configurazione locale](../local-setup) — Eseguire l'API localmente per lo sviluppo
