---
title: "Autentificare și permisiuni"
description: "Referință pentru autentificarea JWT, autentificarea în doi pași, fluxurile OAuth 2.0 și modelul de permisiuni al API-ului ChurchApps, pentru dezvoltatorii care construiesc integrări."
---

# Autentificare și permisiuni

<div class="article-intro">

API-ul ChurchApps folosește autentificare bazată pe JWT. Utilizatorii se conectează și primesc un token care codifică identitatea lor, apartenența la biserică și permisiunile. Această pagină descrie fluxul de autentificare, modelul de permisiuni și suportul OAuth.

</div>

## Fluxul de conectare

### Conectare standard

```
POST /membership/users/login
```

**Autentificare:** Publică

Acceptă unul dintre cele trei tipuri de credențiale:

| Câmp | Descriere |
|-------|-------------|
| `email` + `password` | Conectare standard cu e-mail și parolă |
| `jwt` | Reautentificare cu un JWT existent |
| `authGuid` | Link de autentificare de unică folosință (folosit în e-mailurile de bun venit și de resetare) |

**Răspuns:**

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

Câmpul `token` este un JWT care trebuie trimis ca `Authorization: Bearer <token>` în cererile următoare.

### Autentificare în doi pași

Utilizatorii pot activa autentificarea în doi pași cu aplicația de autentificare (TOTP). Pentru acești utilizatori, conectarea cu `email` + `password`, `authGuid` sau SSO nu returnează un token. În schimb, răspunde cu o provocare:

```json
{ "mfaRequired": true, "mfaToken": "<challenge-token>" }
```

Tokenul de provocare este valabil 5 minute. Trimiteți-l înapoi la același endpoint împreună cu codul:

```json
{ "mfaToken": "<challenge-token>", "mfaCode": "123456" }
```

`mfaCode` poate fi codul curent de 6 cifre din aplicația de autentificare sau unul dintre cele zece coduri de rezervă de unică folosință ale utilizatorului. Un cod greșit returnează `Invalid code`, iar eșecurile repetate sunt limitate ca rată pe fiecare cont. O reconectare cu `jwt` nu este niciodată supusă provocării, astfel încât sesiunile existente continuă să se reîmprospăteze. Obiectul `user` din răspunsul de conectare conține `mfaEnabled`.

Endpoint-uri self-service (doar pentru utilizatorul autentificat, sub `/membership/users/mfa`):

| Endpoint | Descriere |
|----------|-------------|
| `GET /status` | `{ enabled, backupCodesLeft }` |
| `POST /setup` | Pornește configurarea; returnează `{ secret, otpauthUrl }` pentru codul QR |
| `POST /enable` | Corp `{ code }`; activează și returnează `{ backupCodes }` o singură dată |
| `POST /disable` | Corp `{ code }` (cod din aplicație sau cod de rezervă); dezactivează |
| `POST /reset/:userId` | Doar Server.Admin; dezactivează pentru alt utilizator |

Secretele sunt stocate criptate, iar codurile de rezervă sunt stocate sub formă de hash-uri. Activarea, dezactivarea și resetarea sunt înregistrate în jurnalul de audit.

### Conținutul tokenului

JWT-ul codifică:
- `id` — ID-ul utilizatorului
- `churchId` — Biserica selectată în prezent
- `personId` — Înregistrarea persoanei pentru biserica selectată
- Matrice de permisiuni pe fiecare API

### Selectarea bisericii

Utilizatorii pot aparține mai multor biserici. Răspunsul de conectare include toate bisericile, cu permisiunile lor. Pentru a comuta între biserici, clientul generează un nou JWT limitat la o altă biserică, din datele de răspuns ale conectării.

## Înregistrarea utilizatorilor

### Înregistrarea unui utilizator nou

```
POST /membership/users/register
```

**Autentificare:** Publică

```json
{
  "email": "jane@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "appName": "B1 Admin",
  "appUrl": "https://app.b1.church"
}
```

Creează un utilizator cu o parolă temporară și trimite un e-mail de bun venit cu un link de autentificare. Primul utilizator înregistrat pe o instanță nouă primește automat acces de administrator de server.

Sunt acceptate două câmpuri opționale de capcană pentru boți: `website` (un câmp ascuns de tip honeypot, pe care utilizatorii reali îl lasă gol) și `fillMs` (cât timp a fost deschis formularul, în milisecunde). Dacă `website` este completat sau `fillMs` este sub 2000, nu se creează niciun cont, dar endpoint-ul returnează totuși un răspuns `200` obișnuit, astfel încât boții să nu poată afla că au fost respinși. Clienții care omit ambele câmpuri se înregistrează normal.

### Înregistrarea unei biserici noi

```
POST /membership/churches/add
```

**Autentificare:** JWT

După înregistrarea unui utilizator, apelați acest endpoint pentru a crea o biserică și a asocia utilizatorul cu aceasta.

## Gestionarea parolelor

| Metodă | Cale | Autentificare | Descriere |
|--------|------|------|-------------|
| POST | `/membership/users/forgot` | Publică | Trimite un e-mail de resetare a parolei. Corp: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Publică | Setează o parolă nouă folosind un GUID de autentificare din e-mailul de resetare. Corp: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Schimbă parola utilizatorului curent. Corp: `{ "newPassword": "..." }` |

## Modelul de permisiuni

Permisiunile sunt organizate pe module și atribuite utilizatorilor prin roluri. Fiecare permisiune are un **tip de conținut** și o **acțiune**.

### Referința permisiunilor

| Secțiune afișată | Tip de conținut | Acțiune | Descriere |
|----------------|--------------|--------|-------------|
| **Prezență** | Attendance | Checkin | Înregistrează membrii la servicii |
| | Attendance | Edit | Editează înregistrările de prezență |
| | Services | Edit | Gestionează serviciile și orele serviciilor |
| | Attendance | View | Vizualizează înregistrările de prezență |
| | Attendance | View Summary | Vizualizează rezumatele și rapoartele de prezență |
| **Donații** | Donations | Edit | Creează și editează înregistrările de donații |
| | Settings | Edit | Editează setările de donații/plată |
| | Donations | View Summary | Vizualizează rapoartele rezumative ale donațiilor |
| | Donations | View | Vizualizează înregistrările individuale de donații |
| **Persoane și grupuri** | Forms | Admin | Administrare completă a formularelor |
| | Forms | Edit | Editează definițiile formularelor |
| | Plans | Edit | Editează planurile de servicii |
| | Group Members | Edit | Adaugă/elimină membrii grupurilor |
| | Groups | Edit | Creează și editează grupuri |
| | Households | Edit | Editează atribuirile gospodăriilor |
| | People | Edit | Editează orice înregistrare de persoană |
| | People | Edit Self | Editează doar propria înregistrare de persoană |
| | Roles | Edit | Gestionează rolurile și atribuirile utilizatorilor |
| | Group Members | View | Vizualizează listele membrilor grupurilor |
| | People | View Members | Vizualizează doar membrii (nu vizitatorii) |
| | People | View | Vizualizează toate persoanele |
| | Roles | View | Vizualizează rolurile și atribuirile |
| | Settings | Edit | Editează setările bisericii |
| **Conținut** | Content | Edit | Editează pagini, secțiuni, elemente |
| | Settings | Edit | Editează setările de conținut |
| | StreamingServices | Edit | Gestionează configurația serviciilor de streaming |
| | Chat | Host | Găzduiește/moderează sesiunile de chat |
| **Mesagerie** | Texting | Send | Trimite mesaje text SMS |

### Cum sunt verificate permisiunile

În controlere, permisiunile sunt verificate cu metoda `au.checkAccess()`:

```typescript
// Necesită o permisiune specifică
if (!au.checkAccess(Permissions.people.edit)) return this.json({}, 401);

// Sau în cadrul actionWrapper — sistemul CRUD verifică automat
crudSettings: {
  permissions: {
    view: Permissions.people.view,
    edit: Permissions.people.edit
  }
}
```

### Administrator de server

Permisiunea `Server.Admin` acordă acces complet în toate bisericile. Aceasta este atribuită primului utilizator înregistrat și poate fi acordată altora prin rolul de administrator de server.

## OAuth 2.0

API-ul acceptă OAuth 2.0 pentru integrări cu terțe părți. Sunt disponibile două tipuri de acordare.

### Fluxul cu cod de autorizare

1. **Autorizare:** `POST /membership/oauth/authorize` (necesită JWT)
   - Corp: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "...", "code_challenge": "...", "code_challenge_method": "S256" }`
   - `code_challenge` / `code_challenge_method` (PKCE, doar `S256`) sunt obligatorii pentru clienții publici fără secret
   - Returnează: `{ "code": "...", "state": "..." }`

2. **Schimbul codului pe token:** `POST /membership/oauth/token` (Publică)
   - Corp: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "...", "code_verifier": "..." }`
   - Trimiteți `code_verifier` când pasul de autorizare a folosit un `code_challenge`; clienții publici omit `client_secret`. Sunt acceptate corpuri JSON sau codificate ca formular
   - Returnează: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Reîmprospătarea tokenului:** `POST /membership/oauth/token` (Publică)
   - Corp: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

Tokenurile de acces expiră după **12 ore**.

### Fluxul cu cod de dispozitiv (RFC 8628)

Pentru dispozitive fără browser (aplicații TV, chioșcuri):

1. **Solicitarea codului de dispozitiv:** `POST /membership/oauth/device/authorize` (Publică)
   - Corp: `{ "client_id": "...", "scope": "..." }`
   - Returnează: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **Utilizatorul introduce codul** la adresa de verificare și aprobă sau refuză

3. **Interogarea pentru token:** `POST /membership/oauth/token` (Publică)
   - Corp: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Returnează `authorization_pending` până la aprobare, apoi returnează tokenul de acces

### Gestionarea clienților OAuth

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | Listează toți clienții OAuth |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Obține clientul după ID |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Obține clientul după ID-ul clientului (secretul este ascuns) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | Creează sau actualizează un client |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | Șterge un client |
| POST | `/membership/oauth/register` | Publică | — | Înregistrare dinamică a clientului (RFC 7591) pentru clienții publici, cum ar fi conectorii MCP. Vezi [Aplicații conectate](../connected-apps.md#dynamic-client-registration) |

### Endpoint-uri de aprobare a dispozitivelor

| Metodă | Cale | Autentificare | Descriere |
|--------|------|------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Obține informațiile codului de dispozitiv în așteptare pentru interfața de aprobare |
| POST | `/membership/oauth/device/approve` | JWT | Aprobă o autorizare de dispozitiv. Corp: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Refuză o autorizare de dispozitiv. Corp: `{ "user_code": "..." }` |

## Endpoint-uri publice și autentificate

API-ul folosește două funcții wrapper care determină cerințele de autentificare:

- **`actionWrapper`** — Necesită un JWT valid. Obiectul utilizatorului autentificat (`au`) este disponibil cu `churchId`, `userId` și verificările de permisiuni.
- **`actionWrapperAnon`** — Nu necesită autentificare. Folosit pentru conectare, înregistrare, căutări de conținut public și receptori de webhook.

În tabelele de endpoint-uri din această documentație, acestea sunt indicate ca **JWT**, respectiv **Publică**, în coloana Autentificare.

## Pagini conexe

- [Structura modulelor](../module-structure.md) — Cum sunt organizate controlerele, depozitele și modelele
- [Configurarea locală](../local-setup.md) — Rularea API-ului local pentru dezvoltare
