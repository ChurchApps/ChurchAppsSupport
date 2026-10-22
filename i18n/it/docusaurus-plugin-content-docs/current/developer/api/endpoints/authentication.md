---
title: "Autenticazione e permessi"
---

# Autenticazione e permessi {#authentication--permissions}

<div class="article-intro">

L'API di ChurchApps utilizza l'autenticazione basata su JWT. Gli utenti effettuano il login per ricevere un token che codifica la loro identità, l'appartenenza alla chiesa e i permessi. Questa pagina descrive il flusso di autenticazione, il modello dei permessi e il supporto OAuth.

</div>

## Flusso di login {#login-flow}

### Login standard {#standard-login}

```
POST /membership/users/login
```

**Auth:** Pubblico

Accetta uno dei tre tipi di credenziali:

| Campo | Descrizione |
|-------|-------------|
| `email` + `password` | Login standard con email e password |
| `jwt` | Riautenticazione con un JWT esistente |
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

Il campo `token` è un JWT da inviare come `Authorization: Bearer <token>` nelle richieste successive.

### Contenuto del token {#token-contents}

Il JWT codifica:
- `id` — ID utente
- `churchId` — chiesa attualmente selezionata
- `personId` — record della persona per la chiesa selezionata
- Array di permessi per ogni API

### Selezione della chiesa {#church-selection}

Gli utenti possono appartenere a più chiese. La risposta di login include tutte le chiese con i relativi permessi. Per cambiare chiesa, il client genera un nuovo JWT limitato a un'altra chiesa, usando i dati della risposta di login.

## Registrazione utente {#user-registration}

### Registrare un nuovo utente {#register-a-new-user}

```
POST /membership/users/register
```

**Auth:** Pubblico

```json
{
  "email": "jane@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "appName": "B1 Admin",
  "appUrl": "https://app.b1.church"
}
```

Crea un utente con una password temporanea e invia un'email di benvenuto con un link di autenticazione. Il primo utente registrato su una nuova istanza ottiene automaticamente l'accesso di amministratore del server.

Sono accettati due campi facoltativi anti-bot: `website` (un campo nascosto come trappola, che gli utenti reali lasciano vuoto) e `fillMs` (quanto tempo è rimasto aperto il modulo, in millisecondi). Se `website` è compilato oppure `fillMs` è inferiore a 2000, non viene creato alcun account, ma l'endpoint restituisce comunque un normale `200`, così i bot non possono capire di essere stati respinti. I client che omettono entrambi i campi si registrano normalmente.

### Registrare una nuova chiesa {#register-a-new-church}

```
POST /membership/churches/add
```

**Auth:** JWT

Dopo aver registrato un utente, chiama questo endpoint per creare una chiesa e associarvi l'utente.

## Gestione della password {#password-management}

| Metodo | Percorso | Auth | Descrizione |
|--------|------|------|-------------|
| POST | `/membership/users/forgot` | Pubblico | Invia un'email di reimpostazione della password. Body: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Pubblico | Imposta una nuova password usando un GUID di autenticazione dall'email di reimpostazione. Body: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Modifica la password dell'utente corrente. Body: `{ "newPassword": "..." }` |

## Modello dei permessi {#permission-model}

I permessi sono organizzati per modulo e assegnati agli utenti tramite i ruoli. Ogni permesso ha un **tipo di contenuto** e un'**azione**.

### Riferimento dei permessi {#permission-reference}

| Sezione visualizzata | Tipo di contenuto | Azione | Descrizione |
|----------------|--------------|--------|-------------|
| **Presenze** | Attendance | Checkin | Effettua il check-in dei membri ai servizi |
| | Attendance | Edit | Modifica le registrazioni di presenza |
| | Services | Edit | Gestisce i servizi e gli orari di servizio |
| | Attendance | View | Visualizza le registrazioni di presenza |
| | Attendance | View Summary | Visualizza riepiloghi e report delle presenze |
| **Donazioni** | Donations | Edit | Crea e modifica le registrazioni delle donazioni |
| | Settings | Edit | Modifica le impostazioni delle offerte/pagamenti |
| | Donations | View Summary | Visualizza i report riepilogativi delle donazioni |
| | Donations | View | Visualizza le singole registrazioni delle donazioni |
| **Persone e gruppi** | Forms | Admin | Amministrazione completa dei moduli |
| | Forms | Edit | Modifica le definizioni dei moduli |
| | Plans | Edit | Modifica i piani di culto |
| | Group Members | Edit | Aggiunge/rimuove membri dei gruppi |
| | Groups | Edit | Crea e modifica i gruppi |
| | Households | Edit | Modifica le assegnazioni dei nuclei familiari |
| | People | Edit | Modifica qualsiasi scheda persona |
| | People | Edit Self | Modifica solo la propria scheda persona |
| | Roles | Edit | Gestisce i ruoli e le assegnazioni degli utenti |
| | Group Members | View | Visualizza gli elenchi dei membri dei gruppi |
| | People | View Members | Visualizza solo i membri (non i visitatori) |
| | People | View | Visualizza tutte le persone |
| | Roles | View | Visualizza ruoli e assegnazioni |
| | Settings | Edit | Modifica le impostazioni della chiesa |
| **Contenuti** | Content | Edit | Modifica pagine, sezioni, elementi |
| | Settings | Edit | Modifica le impostazioni dei contenuti |
| | StreamingServices | Edit | Gestisce la configurazione dei servizi in streaming |
| | Chat | Host | Ospita/moderare le sessioni di chat |
| **Messaggistica** | Texting | Send | Invia messaggi SMS |

### Come vengono verificati i permessi {#how-permissions-are-checked}

Nei controller, i permessi vengono verificati con il metodo `au.checkAccess()`:

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

### Amministratore del server {#server-admin}

Il permesso `Server.Admin` concede pieno accesso a tutte le chiese. Viene assegnato al primo utente registrato e può essere concesso ad altri tramite il ruolo di amministratore del server.

## OAuth 2.0 {#oauth-20}

L'API supporta OAuth 2.0 per le integrazioni di terze parti. Sono disponibili due tipi di grant.

### Flusso Authorization Code {#authorization-code-flow}

1. **Autorizzazione:** `POST /membership/oauth/authorize` (richiede JWT)
   - Body: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "...", "code_challenge": "...", "code_challenge_method": "S256" }`
   - `code_challenge` / `code_challenge_method` (PKCE, solo `S256`) sono obbligatori per i client pubblici senza segreto
   - Restituisce: `{ "code": "...", "state": "..." }`

2. **Scambio del codice con un token:** `POST /membership/oauth/token` (Pubblico)
   - Body: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "...", "code_verifier": "..." }`
   - Invia `code_verifier` quando il passaggio di autorizzazione ha usato un `code_challenge`; i client pubblici omettono `client_secret`. Sono accettati corpi JSON o codificati come form
   - Restituisce: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Refresh del token:** `POST /membership/oauth/token` (Pubblico)
   - Body: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

I token di accesso scadono dopo **12 ore**.

### Flusso Device Code (RFC 8628) {#device-code-flow-rfc-8628}

Per i dispositivi senza browser (app per TV, chioschi):

1. **Richiesta del codice dispositivo:** `POST /membership/oauth/device/authorize` (Pubblico)
   - Body: `{ "client_id": "...", "scope": "..." }`
   - Restituisce: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **L'utente inserisce il codice** sull'URI di verifica e approva o nega l'accesso

3. **Interrogazione per il token:** `POST /membership/oauth/token` (Pubblico)
   - Body: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Restituisce `authorization_pending` finché non viene approvato, poi restituisce il token di accesso

### Gestione dei client OAuth {#oauth-client-management}

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | Elenca tutti i client OAuth |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Ottieni un client tramite ID |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Ottieni un client tramite client ID (segreto oscurato) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | Crea o aggiorna un client |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | Elimina un client |
| POST | `/membership/oauth/register` | Pubblico | — | Registrazione dinamica del client (RFC 7591) per i client pubblici come i connettori MCP. Vedi [App connesse](../connected-apps#dynamic-client-registration) |

### Endpoint di approvazione dei dispositivi {#device-approval-endpoints}

| Metodo | Percorso | Auth | Descrizione |
|--------|------|------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Ottieni le informazioni sul codice dispositivo in attesa per l'interfaccia di approvazione |
| POST | `/membership/oauth/device/approve` | JWT | Approva un'autorizzazione del dispositivo. Body: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Nega un'autorizzazione del dispositivo. Body: `{ "user_code": "..." }` |

## Endpoint pubblici e autenticati {#public-vs-authenticated-endpoints}

L'API usa due funzioni wrapper che determinano i requisiti di autenticazione:

- **`actionWrapper`** — Richiede un JWT valido. L'oggetto utente autenticato (`au`) è disponibile con `churchId`, `userId` e i controlli dei permessi.
- **`actionWrapperAnon`** — Nessuna autenticazione richiesta. Usato per login, registrazione, consultazione di contenuti pubblici e ricevitori di webhook.

Nelle tabelle degli endpoint di questa documentazione, questi sono indicati rispettivamente come **JWT** e **Pubblico** nella colonna Auth.

## Pagine correlate {#related-pages}

- [Struttura del modulo](../module-structure) — Come sono organizzati controller, repository e modelli
- [Ambiente locale](../local-setup) — Esecuzione dell'API in locale per lo sviluppo
