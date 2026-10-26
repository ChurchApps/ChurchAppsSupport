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

### Contenuto del token

Il JWT codifica:
- `id` — ID utente
- `churchId` — Chiesa attualmente selezionata
- `personId` — Record della persona per la chiesa selezionata
- Array di permessi per ogni API

### Selezione della chiesa

Gli utenti possono appartenere a più chiese. La risposta di accesso include tutte le chiese con i relativi permessi. Per cambiare chiesa, il client genera un nuovo JWT limitato a un'altra chiesa presente nei dati della risposta di accesso.

## Registrazione utente

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

Sono accettati due campi facoltativi anti-bot: `website` (un campo honeypot nascosto che gli utenti reali lasciano vuoto) e `fillMs` (per quanto tempo il modulo è stato aperto, in millisecondi). Se `website` è compilato oppure `fillMs` è inferiore a 2000, non viene creato alcun account, ma l'endpoint restituisce comunque una normale risposta `200`, così i bot non possono capire di essere stati respinti. I client che omettono entrambi i campi si registrano normalmente.

### Registrare una nuova chiesa

```
POST /membership/churches/add
```

**Autenticazione:** JWT

Dopo aver registrato un utente, chiama questo endpoint per creare una chiesa e associarvi l'utente.

## Gestione della password

| Metodo | Percorso | Autenticazione | Descrizione |
|--------|------|------|-------------|
| POST | `/membership/users/forgot` | Pubblico | Invia un'email di reimpostazione della password. Corpo: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Pubblico | Imposta una nuova password usando un GUID di autenticazione dall'email di reimpostazione. Corpo: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Modifica la password dell'utente corrente. Corpo: `{ "newPassword": "..." }` |

## Modello dei permessi

I permessi sono organizzati per modulo e assegnati agli utenti tramite i ruoli. Ogni permesso ha un **tipo di contenuto** e un'**azione**.

### Riferimento dei permessi

| Sezione visualizzata | Tipo di contenuto | Azione | Descrizione |
|----------------|--------------|--------|-------------|
| **Attendance** | Attendance | Checkin | Effettuare il check-in dei membri ai servizi |
| | Attendance | Edit | Modificare i record di presenza |
| | Services | Edit | Gestire servizi e orari di servizio |
| | Attendance | View | Visualizzare i record di presenza |
| | Attendance | View Summary | Visualizzare riepiloghi e report delle presenze |
| **Donations** | Donations | Edit | Creare e modificare i record delle donazioni |
| | Settings | Edit | Modificare le impostazioni di offerte/pagamenti |
| | Donations | View Summary | Visualizzare i report di riepilogo delle donazioni |
| | Donations | View | Visualizzare i singoli record delle donazioni |
| **People and Groups** | Forms | Admin | Amministrazione completa dei moduli |
| | Forms | Edit | Modificare le definizioni dei moduli |
| | Plans | Edit | Modificare i piani di servizio |
| | Group Members | Edit | Aggiungere/rimuovere membri del gruppo |
| | Groups | Edit | Creare e modificare i gruppi |
| | Households | Edit | Modificare le assegnazioni dei nuclei familiari |
| | People | Edit | Modificare qualsiasi record di persona |
| | People | Edit Self | Modificare solo il proprio record di persona |
| | Roles | Edit | Gestire i ruoli e le assegnazioni agli utenti |
| | Group Members | View | Visualizzare gli elenchi dei membri del gruppo |
| | People | View Members | Visualizzare solo i membri (non i visitatori) |
| | People | View | Visualizzare tutte le persone |
| | Roles | View | Visualizzare ruoli e assegnazioni |
| | Settings | Edit | Modificare le impostazioni della chiesa |
| **Content** | Content | Edit | Modificare pagine, sezioni, elementi |
| | Settings | Edit | Modificare le impostazioni dei contenuti |
| | StreamingServices | Edit | Gestire la configurazione dei servizi di streaming |
| | Chat | Host | Ospitare/moderare le sessioni di chat |
| **Messaging** | Texting | Send | Inviare messaggi SMS |

### Come vengono verificati i permessi

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

### Amministratore del server

Il permesso `Server.Admin` concede l'accesso completo a tutte le chiese. Viene assegnato al primo utente registrato e può essere concesso ad altri tramite il ruolo di amministratore del server.

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

Per dispositivi senza browser (app per TV, chioschi):

1. **Richiedi un codice dispositivo:** `POST /membership/oauth/device/authorize` (Pubblico)
   - Corpo: `{ "client_id": "...", "scope": "..." }`
   - Restituisce: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **L'utente inserisce il codice** nell'URI di verifica e approva o nega

3. **Interroga per il token:** `POST /membership/oauth/token` (Pubblico)
   - Corpo: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Restituisce `authorization_pending` finché non viene approvato, poi restituisce il token di accesso

### Gestione dei client OAuth

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | Elenca tutti i client OAuth |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Ottiene un client tramite ID |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Ottiene un client tramite client ID (segreto oscurato) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | Crea o aggiorna un client |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | Elimina un client |
| POST | `/membership/oauth/register` | Pubblico | — | Registrazione dinamica del client (RFC 7591) per client pubblici come i connettori MCP. Vedi [Connected Apps](../connected-apps#dynamic-client-registration) |

### Endpoint di approvazione del dispositivo

| Metodo | Percorso | Autenticazione | Descrizione |
|--------|------|------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Ottiene le informazioni sul codice dispositivo in attesa per l'interfaccia di approvazione |
| POST | `/membership/oauth/device/approve` | JWT | Approva un'autorizzazione del dispositivo. Corpo: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Nega un'autorizzazione del dispositivo. Corpo: `{ "user_code": "..." }` |

## Endpoint pubblici e autenticati

L'API usa due funzioni wrapper che determinano i requisiti di autenticazione:

- **`actionWrapper`** — Richiede un JWT valido. L'oggetto utente autenticato (`au`) è disponibile con `churchId`, `userId` e i controlli dei permessi.
- **`actionWrapperAnon`** — Nessuna autenticazione richiesta. Usato per accesso, registrazione, consultazione di contenuti pubblici e ricevitori di webhook.

Nelle tabelle degli endpoint di questa documentazione, questi sono indicati rispettivamente come **JWT** e **Pubblico** nella colonna Autenticazione.

## Pagine correlate

- [Struttura del modulo](../module-structure) — Come sono organizzati controller, repository e modelli
- [Configurazione locale](../local-setup) — Esecuzione dell'API in locale per lo sviluppo
