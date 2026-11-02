---
title: "Autenticazione e permessi"
---

# Autenticazione e permessi

<div class="article-intro">

L'API di ChurchApps usa l'autenticazione basata su JWT. Gli utenti effettuano l'accesso per ricevere un token che codifica la loro identità, l'appartenenza alla chiesa e i permessi. Questa pagina descrive il flusso di autenticazione, il modello dei permessi e il supporto OAuth.

</div>

## Flusso di accesso

### Accesso standard

```
POST /membership/users/login
```

**Autenticazione:** Pubblico

Accetta uno di tre tipi di credenziali:

| Campo | Descrizione |
|-------|-------------|
| `email` + `password` | Accesso standard con email e password |
| `jwt` | Ri-autenticazione con un JWT esistente |
| `authGuid` | Link di autenticazione monouso (usato nelle email di benvenuto/reimpostazione) |

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

### Accesso a due fattori {#two-factor-sign-in}

Gli utenti possono attivare l'accesso a due fattori con app di autenticazione (TOTP). Per questi utenti, un accesso con `email` + `password`, `authGuid` oppure SSO non restituisce un token. Restituisce invece una richiesta di verifica:

```json
{ "mfaRequired": true, "mfaToken": "<challenge-token>" }
```

Il token di verifica è valido per 5 minuti. Rinvialo allo stesso endpoint insieme al codice:

```json
{ "mfaToken": "<challenge-token>", "mfaCode": "123456" }
```

`mfaCode` può essere il codice attuale a 6 cifre dell'app di autenticazione oppure uno dei dieci codici di backup monouso dell'utente. Un codice errato restituisce `Invalid code`, e i tentativi ripetuti falliti sono limitati per account. Un nuovo accesso con `jwt` non viene mai sottoposto a verifica, quindi le sessioni esistenti continuano a rinnovarsi. L'oggetto `user` della risposta di accesso contiene `mfaEnabled`.

Endpoint self-service (solo per l'utente connesso, sotto `/membership/users/mfa`):

| Endpoint | Descrizione |
|----------|-------------|
| `GET /status` | `{ enabled, backupCodesLeft }` |
| `POST /setup` | Avvia la configurazione; restituisce `{ secret, otpauthUrl }` per il codice QR |
| `POST /enable` | Corpo `{ code }`; lo attiva e restituisce `{ backupCodes }` una sola volta |
| `POST /disable` | Corpo `{ code }` (codice dell'app di autenticazione o di backup); lo disattiva |
| `POST /reset/:userId` | Solo Server.Admin; lo disattiva per un altro utente |

I segreti sono memorizzati cifrati e i codici di backup sono memorizzati come hash. Attivazione, disattivazione e reimpostazione vengono registrate nel registro di controllo.

### Contenuto del token

Il JWT codifica:
- `id` — ID utente
- `churchId` — Chiesa attualmente selezionata
- `personId` — Scheda persona per la chiesa selezionata
- Array dei permessi per ciascuna API

### Selezione della chiesa

Gli utenti possono appartenere a più chiese. La risposta di accesso include tutte le chiese con i relativi permessi. Per cambiare chiesa, il client genera un nuovo JWT limitato a un'altra chiesa a partire dai dati della risposta di accesso.

## Registrazione utenti

### Registrare un nuovo utente

```
POST /membership/users/register
```

**Autenticazione:** Pubblico

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

Sono accettati due campi facoltativi anti-bot: `website` (un campo nascosto trappola che gli utenti reali lasciano vuoto) e `fillMs` (quanto a lungo è stato aperto il modulo, in millisecondi). Se `website` è compilato oppure `fillMs` è inferiore a 2000, non viene creato alcun account, ma l'endpoint restituisce comunque un normale `200`, così i bot non possono capire di essere stati respinti. I client che omettono entrambi i campi si registrano normalmente.

### Registrare una nuova chiesa

```
POST /membership/churches/add
```

**Autenticazione:** JWT

Dopo aver registrato un utente, chiama questo endpoint per creare una chiesa e associarvi l'utente.

## Gestione delle password

| Metodo | Percorso | Autenticazione | Descrizione |
|--------|----------|----------------|-------------|
| POST | `/membership/users/forgot` | Pubblico | Invia un'email di reimpostazione della password. Corpo: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Pubblico | Imposta una nuova password usando un GUID di autenticazione dall'email di reimpostazione. Corpo: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Cambia la password dell'utente corrente. Corpo: `{ "newPassword": "..." }` |

## Modello dei permessi

I permessi sono organizzati per modulo e assegnati agli utenti tramite i ruoli. Ogni permesso ha un **tipo di contenuto** e un'**azione**.

### Riferimento dei permessi

| Sezione visualizzata | Tipo di contenuto | Azione | Descrizione |
|----------------|--------------|--------|-------------|
| **Presenze** | Attendance | Checkin | Registra i membri al check-in ai culti |
| | Attendance | Edit | Modifica i record di presenza |
| | Services | Edit | Gestisce i culti e gli orari dei culti |
| | Attendance | View | Visualizza i record di presenza |
| | Attendance | View Summary | Visualizza i riepiloghi e i report delle presenze |
| **Donazioni** | Donations | Edit | Crea e modifica i record delle donazioni |
| | Settings | Edit | Modifica le impostazioni di offerte/pagamenti |
| | Donations | View Summary | Visualizza i report riepilogativi delle donazioni |
| | Donations | View | Visualizza i singoli record delle donazioni |
| **Persone e gruppi** | Forms | Admin | Piena amministrazione dei moduli |
| | Forms | Edit | Modifica le definizioni dei moduli |
| | Plans | Edit | Modifica i piani di servizio |
| | Group Members | Edit | Aggiunge/rimuove membri del gruppo |
| | Groups | Edit | Crea e modifica i gruppi |
| | Households | Edit | Modifica le assegnazioni ai nuclei familiari |
| | People | Edit | Modifica qualsiasi scheda persona |
| | People | Edit Self | Modifica solo la propria scheda persona |
| | Roles | Edit | Gestisce i ruoli e le assegnazioni degli utenti |
| | Group Members | View | Visualizza gli elenchi dei membri dei gruppi |
| | People | View Members | Visualizza solo i membri (non i visitatori) |
| | People | View | Visualizza tutte le persone |
| | Roles | View | Visualizza i ruoli e le assegnazioni |
| | Settings | Edit | Modifica le impostazioni della chiesa |
| **Contenuti** | Content | Edit | Modifica pagine, sezioni, elementi |
| | Settings | Edit | Modifica le impostazioni dei contenuti |
| | StreamingServices | Edit | Gestisce la configurazione dei servizi di streaming |
| | Chat | Host | Ospita/modera le sessioni di chat |
| **Messaggistica** | Texting | Send | Invia messaggi SMS |

### Come vengono verificati i permessi

Nei controller, i permessi si verificano con il metodo `au.checkAccess()`:

```typescript
// Richiede un permesso specifico
if (!au.checkAccess(Permissions.people.edit)) return this.json({}, 401);

// Oppure all'interno di actionWrapper — il sistema CRUD verifica automaticamente
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

2. **Scambio del codice con un token:** `POST /membership/oauth/token` (Pubblico)
   - Corpo: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "...", "code_verifier": "..." }`
   - Invia `code_verifier` quando il passaggio di autorizzazione ha usato un `code_challenge`; i client pubblici omettono `client_secret`. Sono accettati corpi JSON o codificati come form
   - Restituisce: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Rinnovo del token:** `POST /membership/oauth/token` (Pubblico)
   - Corpo: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

I token di accesso scadono dopo **12 ore**.

### Flusso con codice dispositivo (RFC 8628)

Per i dispositivi senza browser (app per TV, chioschi):

1. **Richiesta del codice dispositivo:** `POST /membership/oauth/device/authorize` (Pubblico)
   - Corpo: `{ "client_id": "...", "scope": "..." }`
   - Restituisce: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **L'utente inserisce il codice** nell'URI di verifica e approva o nega

3. **Interrogazione per il token:** `POST /membership/oauth/token` (Pubblico)
   - Corpo: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Restituisce `authorization_pending` finché non viene approvato, poi restituisce il token di accesso

### Gestione dei client OAuth

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | Elenca tutti i client OAuth |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Ottiene un client per ID |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Ottiene un client per client ID (segreto oscurato) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | Crea o aggiorna un client |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | Elimina un client |
| POST | `/membership/oauth/register` | Pubblico | — | Registrazione dinamica del client (RFC 7591) per client pubblici come i connettori MCP. Vedi [App collegate](../connected-apps#dynamic-client-registration) |

### Endpoint di approvazione dei dispositivi

| Metodo | Percorso | Autenticazione | Descrizione |
|--------|----------|----------------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Ottiene le informazioni sul codice dispositivo in attesa per l'interfaccia di approvazione |
| POST | `/membership/oauth/device/approve` | JWT | Approva un'autorizzazione del dispositivo. Corpo: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Nega un'autorizzazione del dispositivo. Corpo: `{ "user_code": "..." }` |

## Endpoint pubblici e autenticati

L'API usa due funzioni wrapper che determinano i requisiti di autenticazione:

- **`actionWrapper`** — Richiede un JWT valido. L'oggetto utente autenticato (`au`) è disponibile con `churchId`, `userId` e i controlli dei permessi.
- **`actionWrapperAnon`** — Nessuna autenticazione richiesta. Usato per accesso, registrazione, consultazioni di contenuti pubblici e ricevitori di webhook.

Nelle tabelle degli endpoint di questa documentazione, questi vengono indicati rispettivamente come **JWT** e **Pubblico** nella colonna Autenticazione.

## Pagine correlate

- [Struttura del modulo](../module-structure) — Come sono organizzati controller, repository e modelli
- [Setup locale](../local-setup) — Eseguire l'API in locale per lo sviluppo
