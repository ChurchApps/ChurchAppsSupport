---
title: "Autenticazione e Permessi"
---

# Autenticazione e Permessi

<div class="article-intro">

L'API di ChurchApps utilizza l'autenticazione basata su JWT. Gli utenti effettuano il login per ricevere un token che codifica la loro identità, appartenenza alla chiesa e permessi. Questa pagina copre il flusso di autenticazione, il modello dei permessi e il supporto OAuth.

</div>

## Flusso di Login

### Login Standard

```
POST /membership/users/login
```

**Auth:** Public

Accetta uno dei tre tipi di credenziali:

| Campo | Descrizione |
|-------|-------------|
| `email` + `password` | Login standard email/password |
| `jwt` | Re-autenticazione con un JWT esistente |
| `authGuid` | Link di autenticazione monouso (usato nelle email di benvenuto/reset) |

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

### Contenuto del Token

Il JWT codifica:
- `id` — ID Utente
- `churchId` — Chiesa attualmente selezionata
- `personId` — Record persona per la chiesa selezionata
- Array di permessi per-API

### Selezione della Chiesa

Gli utenti possono appartenere a più chiese. La risposta di login include tutte le chiese con i rispettivi permessi. Per cambiare chiesa, il client genera un nuovo JWT delimitato a una chiesa diversa dai dati della risposta di login.

## Registrazione Utente

### Registra un Nuovo Utente

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

Crea un utente con una password temporanea e invia un'email di benvenuto con un link di autenticazione. Il primo utente registrato su una nuova istanza ottiene automaticamente l'accesso di amministratore del server.

### Registra una Nuova Chiesa

```
POST /membership/churches/add
```

**Auth:** JWT

Dopo aver registrato un utente, chiama questo endpoint per creare una chiesa e associare l'utente ad essa.

## Gestione Password

| Metodo | Percorso | Auth | Descrizione |
|--------|----------|------|-------------|
| POST | `/membership/users/forgot` | Public | Invia un'email di reset password. Body: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Public | Imposta una nuova password usando un GUID di autenticazione da un'email di reset. Body: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Cambia la password dell'utente corrente. Body: `{ "newPassword": "..." }` |

## Modello dei Permessi

I permessi sono organizzati per modulo e assegnati agli utenti tramite ruoli. Ogni permesso ha un **tipo di contenuto** e un'**azione**.

### Riferimento Permessi

| Sezione Display | Tipo Contenuto | Azione | Descrizione |
|----------------|----------------|--------|-------------|
| **Attendance** | Attendance | Checkin | Check-in dei membri ai servizi |
| | Attendance | Edit | Modifica registrazioni presenze |
| | Services | Edit | Gestisci servizi e orari dei servizi |
| | Attendance | View | Visualizza registrazioni presenze |
| | Attendance | View Summary | Visualizza riepiloghi e report presenze |
| **Donations** | Donations | Edit | Crea e modifica registrazioni donazioni |
| | Settings | Edit | Modifica impostazioni donazioni/pagamenti |
| | Donations | View Summary | Visualizza report riepilogo donazioni |
| | Donations | View | Visualizza singole registrazioni donazioni |
| **People and Groups** | Forms | Admin | Amministrazione completa dei moduli |
| | Forms | Edit | Modifica definizioni moduli |
| | Plans | Edit | Modifica piani di servizio |
| | Group Members | Edit | Aggiungi/rimuovi membri del gruppo |
| | Groups | Edit | Crea e modifica gruppi |
| | Households | Edit | Modifica assegnazioni nuclei familiari |
| | People | Edit | Modifica qualsiasi record persona |
| | People | Edit Self | Modifica solo il proprio record persona |
| | Roles | Edit | Gestisci ruoli e assegnazioni utente |
| | Group Members | View | Visualizza liste membri del gruppo |
| | People | View Members | Visualizza solo i membri (non i visitatori) |
| | People | View | Visualizza tutte le persone |
| | Roles | View | Visualizza ruoli e assegnazioni |
| | Settings | Edit | Modifica impostazioni della chiesa |
| **Content** | Content | Edit | Modifica pagine, sezioni, elementi |
| | Settings | Edit | Modifica impostazioni contenuto |
| | StreamingServices | Edit | Gestisci configurazione servizi di streaming |
| | Chat | Host | Ospita/modera sessioni di chat |
| **Messaging** | Texting | Send | Invia messaggi SMS |

### Come Vengono Controllati i Permessi

Nei controller, i permessi vengono controllati usando il metodo `au.checkAccess()`:

```typescript
// Richiedi permesso specifico
if (!au.checkAccess(Permissions.people.edit)) return this.json({}, 401);

// O all'interno di actionWrapper — il sistema CRUD controlla automaticamente
crudSettings: {
  permissions: {
    view: Permissions.people.view,
    edit: Permissions.people.edit
  }
}
```

### Amministratore del Server

Il permesso `Server.Admin` garantisce l'accesso completo a tutte le chiese. Viene assegnato al primo utente registrato e può essere concesso ad altri tramite il ruolo di amministratore del server.

## OAuth 2.0

L'API supporta OAuth 2.0 per integrazioni di terze parti. Sono disponibili due tipi di grant.

### Flusso Authorization Code

1. **Autorizza:** `POST /membership/oauth/authorize` (JWT richiesto)
   - Body: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "..." }`
   - Restituisce: `{ "code": "...", "state": "..." }`

2. **Scambia codice per token:** `POST /membership/oauth/token` (Public)
   - Body: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "..." }`
   - Restituisce: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Refresh token:** `POST /membership/oauth/token` (Public)
   - Body: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

I token di accesso scadono dopo **12 ore**.

### Flusso Device Code (RFC 8628)

Per dispositivi senza browser (app TV, chioschi):

1. **Richiedi device code:** `POST /membership/oauth/device/authorize` (Public)
   - Body: `{ "client_id": "...", "scope": "..." }`
   - Restituisce: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **L'utente inserisce il codice** all'URI di verifica e approva o rifiuta

3. **Polling per token:** `POST /membership/oauth/token` (Public)
   - Body: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Restituisce `authorization_pending` fino all'approvazione, poi restituisce il token di accesso

### Gestione Client OAuth

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | Lista tutti i client OAuth |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Ottieni client per ID |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Ottieni client per client ID (segreto redatto) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | Crea o aggiorna un client |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | Elimina un client |

### Endpoint Approvazione Dispositivo

| Metodo | Percorso | Auth | Descrizione |
|--------|----------|------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Ottieni info device code in attesa per l'interfaccia di approvazione |
| POST | `/membership/oauth/device/approve` | JWT | Approva un'autorizzazione dispositivo. Body: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Rifiuta un'autorizzazione dispositivo. Body: `{ "user_code": "..." }` |

## Endpoint Pubblici vs Autenticati

L'API usa due funzioni wrapper che determinano i requisiti di autenticazione:

- **`actionWrapper`** — Richiede un JWT valido. L'oggetto utente autenticato (`au`) è disponibile con `churchId`, `userId` e controlli dei permessi.
- **`actionWrapperAnon`** — Nessuna autenticazione richiesta. Usato per login, registrazione, ricerche di contenuto pubblico e ricevitori di webhook.

Nelle tabelle degli endpoint in questa documentazione, questi sono indicati rispettivamente come **JWT** e **Public** nella colonna Auth.

## Pagine Correlate

- [Struttura dei Moduli](../module-structure) — Come sono organizzati controller, repository e modelli
- [Setup Locale](../local-setup) — Eseguire l'API localmente per lo sviluppo
