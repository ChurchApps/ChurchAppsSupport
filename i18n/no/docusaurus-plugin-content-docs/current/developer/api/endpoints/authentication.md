---
title: "Autentisering og tillatelser"
---

# Autentisering og tillatelser {#authentication--permissions}

<div class="article-intro">

ChurchApps API bruker JWT-basert autentisering. Brukere logger inn og får et token som koder deres identitet, menighetsmedlemskap og tillatelser. Denne siden dekker innloggingsflyten, tillatelsesmodellen og støtten for OAuth.

</div>

## Innloggingsflyt {#login-flow}

### Standard innlogging {#standard-login}

```
POST /membership/users/login
```

**Autentisering:** Offentlig

Godtar en av tre typer legitimasjon:

| Felt | Beskrivelse |
|-------|-------------|
| `email` + `password` | Standard innlogging med e-post og passord |
| `jwt` | Autentiser på nytt med en eksisterende JWT |
| `authGuid` | Engangslenke for autentisering (brukes i velkomst- og tilbakestillingse-poster) |

**Svar:**

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

Feltet `token` er en JWT som skal sendes som `Authorization: Bearer <token>` i påfølgende forespørsler.

### Tokeninnhold {#token-contents}

JWT-en koder:
- `id` — bruker-ID
- `churchId` — valgt menighet
- `personId` — personposten i den valgte menigheten
- Tillatelsesmatriser per API

### Valg av menighet {#church-selection}

Brukere kan tilhøre flere menigheter. Innloggingssvaret inkluderer alle menighetene med deres tillatelser. For å bytte menighet genererer klienten en ny JWT som er avgrenset til en annen menighet, basert på data fra innloggingssvaret.

## Brukerregistrering {#user-registration}

### Registrer en ny bruker {#register-a-new-user}

```
POST /membership/users/register
```

**Autentisering:** Offentlig

```json
{
  "email": "jane@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "appName": "B1 Admin",
  "appUrl": "https://app.b1.church"
}
```

Oppretter en bruker med et midlertidig passord og sender en velkomst-e-post med en autentiseringslenke. Den første brukeren som registreres på en ny instans får automatisk serveradministratortilgang.

To valgfrie felt for å fange roboter godtas: `website` (et skjult honeypot-felt som ekte brukere lar stå tomt) og `fillMs` (hvor lenge skjemaet var åpent, i millisekunder). Hvis `website` er fylt ut, eller `fillMs` er under 2000, opprettes ingen konto, men endepunktet returnerer fortsatt et vanlig `200`-svar, slik at boter ikke kan se at de ble avvist. Klienter som utelater begge feltene registrerer seg som vanlig.

### Registrer en ny menighet {#register-a-new-church}

```
POST /membership/churches/add
```

**Autentisering:** JWT

Etter å ha registrert en bruker, kall dette endepunktet for å opprette en menighet og knytte brukeren til den.

## Passordhåndtering {#password-management}

| Metode | Sti | Autentisering | Beskrivelse |
|--------|------|------|-------------|
| POST | `/membership/users/forgot` | Offentlig | Send en e-post for tilbakestilling av passord. Body: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Offentlig | Sett et nytt passord ved hjelp av en autentiserings-GUID fra en tilbakestillingse-post. Body: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Endre gjeldende brukers passord. Body: `{ "newPassword": "..." }` |

## Tillatelsesmodell {#permission-model}

Tillatelser er organisert etter modul og tildeles brukere gjennom roller. Hver tillatelse har en **innholdstype** og en **handling**.

### Tillatelsesreferanse {#permission-reference}

| Visningsseksjon | Innholdstype | Handling | Beskrivelse |
|----------------|--------------|--------|-------------|
| **Attendance** | Attendance | Checkin | Sjekk inn medlemmer på gudstjenester |
| | Attendance | Edit | Rediger oppmøteposter |
| | Services | Edit | Administrer gudstjenester og gudstjenestetider |
| | Attendance | View | Se oppmøteposter |
| | Attendance | View Summary | Se oppmøteoppsummeringer og rapporter |
| **Donations** | Donations | Edit | Opprett og rediger giverposter |
| | Settings | Edit | Rediger innstillinger for gaver/betaling |
| | Donations | View Summary | Se oppsummeringsrapporter for gaver |
| | Donations | View | Se enkeltstående giverposter |
| **People and Groups** | Forms | Admin | Full skjemaadministrasjon |
| | Forms | Edit | Rediger skjemadefinisjoner |
| | Plans | Edit | Rediger tjenesteplaner |
| | Group Members | Edit | Legg til/fjern gruppemedlemmer |
| | Groups | Edit | Opprett og rediger grupper |
| | Households | Edit | Rediger husholdningstilordninger |
| | People | Edit | Rediger alle personposter |
| | People | Edit Self | Rediger bare din egen personpost |
| | Roles | Edit | Administrer roller og brukertilordninger |
| | Group Members | View | Se gruppemedlemslister |
| | People | View Members | Se bare medlemmer (ikke besøkende) |
| | People | View | Se alle personer |
| | Roles | View | Se roller og tilordninger |
| | Settings | Edit | Rediger menighetsinnstillinger |
| **Content** | Content | Edit | Rediger sider, seksjoner og elementer |
| | Settings | Edit | Rediger innholdsinnstillinger |
| | StreamingServices | Edit | Administrer konfigurasjon for strømmetjenester |
| | Chat | Host | Vær vert for og modererer chatøkter |
| **Messaging** | Texting | Send | Send SMS-meldinger |

### Slik sjekkes tillatelser {#how-permissions-are-checked}

I kontrollere sjekkes tillatelser med metoden `au.checkAccess()`:

```typescript
// Krev spesifikk tillatelse
if (!au.checkAccess(Permissions.people.edit)) return this.json({}, 401);

// Eller innenfor actionWrapper — CRUD-systemet sjekker automatisk
crudSettings: {
  permissions: {
    view: Permissions.people.view,
    edit: Permissions.people.edit
  }
}
```

### Serveradministrator {#server-admin}

Tillatelsen `Server.Admin` gir full tilgang på tvers av alle menigheter. Den tildeles den første registrerte brukeren og kan gis til andre gjennom serveradministratorrollen.

## OAuth 2.0 {#oauth-20}

API-et støtter OAuth 2.0 for tredjepartsintegrasjoner. To granttyper er tilgjengelige.

### Autorisasjonskodeflyt {#authorization-code-flow}

1. **Autoriser:** `POST /membership/oauth/authorize` (krever JWT)
   - Body: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "...", "code_challenge": "...", "code_challenge_method": "S256" }`
   - `code_challenge` / `code_challenge_method` (PKCE, bare `S256`) kreves for offentlige klienter uten hemmelighet
   - Returnerer: `{ "code": "...", "state": "..." }`

2. **Bytt kode mot token:** `POST /membership/oauth/token` (Offentlig)
   - Body: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "...", "code_verifier": "..." }`
   - Send `code_verifier` når autoriseringssteget brukte en `code_challenge`. Offentlige klienter utelater `client_secret`. JSON- eller skjemakodede body-er godtas
   - Returnerer: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Oppdater token:** `POST /membership/oauth/token` (Offentlig)
   - Body: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

Tilgangstokener utløper etter **12 timer**.

### Enhetskodeflyt (RFC 8628) {#device-code-flow-rfc-8628}

For enheter uten nettleser (TV-apper, kiosker):

1. **Be om enhetskode:** `POST /membership/oauth/device/authorize` (Offentlig)
   - Body: `{ "client_id": "...", "scope": "..." }`
   - Returnerer: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **Brukeren skriver inn koden** på verifiseringsadressen og godkjenner eller avslår

3. **Spør etter token:** `POST /membership/oauth/token` (Offentlig)
   - Body: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Returnerer `authorization_pending` til forespørselen er godkjent, og deretter tilgangstokenet

### Administrasjon av OAuth-klienter {#oauth-client-management}

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | List alle OAuth-klienter |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Hent klient med ID |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Hent klient med klient-ID (hemmeligheten er skjult) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | Opprett eller oppdater en klient |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | Slett en klient |
| POST | `/membership/oauth/register` | Offentlig | — | Dynamisk klientregistrering (RFC 7591) for offentlige klienter, for eksempel MCP-koblinger. Se [Tilkoblede apper](../connected-apps#dynamic-client-registration) |

### Endepunkter for godkjenning av enheter {#device-approval-endpoints}

| Metode | Sti | Autentisering | Beskrivelse |
|--------|------|------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Hent informasjon om ventende enhetskode til godkjenningsgrensesnittet |
| POST | `/membership/oauth/device/approve` | JWT | Godkjenn en enhetsautorisering. Body: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Avslå en enhetsautorisering. Body: `{ "user_code": "..." }` |

## Offentlige kontra autentiserte endepunkter {#public-vs-authenticated-endpoints}

API-et bruker to wrapperfunksjoner som avgjør autentiseringskravene:

- **`actionWrapper`** — Krever en gyldig JWT. Det autentiserte brukerobjektet (`au`) er tilgjengelig med `churchId`, `userId` og tillatelsessjekker.
- **`actionWrapperAnon`** — Ingen autentisering kreves. Brukes til innlogging, registrering, offentlige innholdsoppslag og webhook-mottakere.

I endepunkttabellene i denne dokumentasjonen er disse angitt som henholdsvis **JWT** og **Offentlig** i kolonnen for autentisering.

## Relaterte sider {#related-pages}

- [Modulstruktur](../module-structure) — Hvordan kontrollere, repositories og modeller er organisert
- [Lokalt oppsett](../local-setup) — Kjør API-et lokalt for utvikling
