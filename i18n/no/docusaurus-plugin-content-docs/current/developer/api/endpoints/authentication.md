---
title: "Autentisering og tillatelser"
---

# Autentisering og tillatelser

<div class="article-intro">

ChurchApps API bruker JWT-basert autentisering. Brukere logger inn for å motta et token som koder identiteten deres, kirkemedlemskap og tillatelser. Denne siden dekker autentiseringsflyten, tillatelsesmodellen og OAuth-støtten.

</div>

## Innloggingsflyt

### Standard innlogging

```
POST /membership/users/login
```

**Autentisering:** Offentlig

Godtar én av tre typer legitimasjon:

| Felt | Beskrivelse |
|-------|-------------|
| `email` + `password` | Standard innlogging med e-post og passord |
| `jwt` | Autentiser på nytt med en eksisterende JWT |
| `authGuid` | Engangs autentiseringslenke (brukes i velkomst- og tilbakestillings-e-poster) |

**Respons:**

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

### Tokeninnhold

JWT-en inneholder:
- `id` — Bruker-ID
- `churchId` — For øyeblikket valgt kirke
- `personId` — Personpost for den valgte kirken
- Tillatelsesarrayer per API

### Kirkevalg

Brukere kan tilhøre flere kirker. Innloggingsresponsen inkluderer alle kirker med tilhørende tillatelser. For å bytte kirke genererer klienten en ny JWT knyttet til en annen kirke, basert på dataene i innloggingsresponsen.

## Brukerregistrering

### Registrer en ny bruker

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

To valgfrie felt for botfelle godtas: `website` (et skjult honeypot-felt som ekte brukere lar stå tomt) og `fillMs` (hvor lenge skjemaet var åpent, i millisekunder). Hvis `website` er fylt ut eller `fillMs` er under 2000, opprettes ingen konto, men endepunktet returnerer fortsatt en normal `200`-respons slik at roboter ikke kan se at de ble avvist. Klienter som utelater begge feltene registrerer seg som vanlig.

### Registrer en ny kirke

```
POST /membership/churches/add
```

**Autentisering:** JWT

Etter at en bruker er registrert, kall dette endepunktet for å opprette en kirke og knytte brukeren til den.

## Passordhåndtering

| Metode | Sti | Autentisering | Beskrivelse |
|--------|------|------|-------------|
| POST | `/membership/users/forgot` | Offentlig | Send en e-post for tilbakestilling av passord. Body: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Offentlig | Sett et nytt passord ved hjelp av en autentiserings-GUID fra en tilbakestillings-e-post. Body: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Endre passordet til gjeldende bruker. Body: `{ "newPassword": "..." }` |

## Tillatelsesmodell

Tillatelser er organisert etter modul og tildelt brukere gjennom roller. Hver tillatelse har en **innholdstype** og en **handling**.

### Tillatelsesreferanse

| Visningsseksjon | Innholdstype | Handling | Beskrivelse |
|----------------|--------------|--------|-------------|
| **Oppmøte** | Attendance | Checkin | Sjekk inn medlemmer på tjenester |
| | Attendance | Edit | Rediger oppmøteposter |
| | Services | Edit | Administrer tjenester og tjenestetider |
| | Attendance | View | Vis oppmøteposter |
| | Attendance | View Summary | Vis oppsummeringer og rapporter for oppmøte |
| **Gaver** | Donations | Edit | Opprett og rediger givingsposter |
| | Settings | Edit | Rediger innstillinger for gaver/betaling |
| | Donations | View Summary | Vis oppsummeringsrapporter for gaver |
| | Donations | View | Vis enkeltstående givingsposter |
| **Personer og grupper** | Forms | Admin | Full administrasjon av skjemaer |
| | Forms | Edit | Rediger skjemadefinisjoner |
| | Plans | Edit | Rediger tjenesteplaner |
| | Group Members | Edit | Legg til/fjern gruppemedlemmer |
| | Groups | Edit | Opprett og rediger grupper |
| | Households | Edit | Rediger husstandstilordninger |
| | People | Edit | Rediger enhver personpost |
| | People | Edit Self | Rediger kun din egen personpost |
| | Roles | Edit | Administrer roller og brukertilordninger |
| | Group Members | View | Vis gruppemedlemslister |
| | People | View Members | Vis kun medlemmer (ikke besøkende) |
| | People | View | Vis alle personer |
| | Roles | View | Vis roller og tilordninger |
| | Settings | Edit | Rediger kirkeinnstillinger |
| **Innhold** | Content | Edit | Rediger sider, seksjoner, elementer |
| | Settings | Edit | Rediger innholdsinnstillinger |
| | StreamingServices | Edit | Administrer konfigurasjon for strømmetjenester |
| | Chat | Host | Vert/moderer chatøkter |
| **Meldinger** | Texting | Send | Send SMS-tekstmeldinger |

### Slik sjekkes tillatelser

I kontrollere sjekkes tillatelser med metoden `au.checkAccess()`:

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

### Serveradministrator

Tillatelsen `Server.Admin` gir full tilgang på tvers av alle kirker. Den tildeles den første registrerte brukeren og kan gis til andre gjennom serveradministratorrollen.

## OAuth 2.0

API-et støtter OAuth 2.0 for tredjepartsintegrasjoner. To tilgangstyper er tilgjengelige.

### Authorization Code-flyt

1. **Autoriser:** `POST /membership/oauth/authorize` (krever JWT)
   - Body: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "...", "code_challenge": "...", "code_challenge_method": "S256" }`
   - `code_challenge` / `code_challenge_method` (PKCE, kun `S256`) er påkrevd for offentlige klienter uten hemmelighet
   - Returnerer: `{ "code": "...", "state": "..." }`

2. **Bytt kode mot token:** `POST /membership/oauth/token` (Offentlig)
   - Body: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "...", "code_verifier": "..." }`
   - Send `code_verifier` når autoriseringssteget brukte en `code_challenge`; offentlige klienter utelater `client_secret`. JSON- eller skjemakodede body-er godtas
   - Returnerer: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Forny token:** `POST /membership/oauth/token` (Offentlig)
   - Body: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

Tilgangstokener utløper etter **12 timer**.

### Device Code-flyt (RFC 8628)

For enheter uten nettleser (TV-apper, kiosker):

1. **Be om enhetskode:** `POST /membership/oauth/device/authorize` (Offentlig)
   - Body: `{ "client_id": "...", "scope": "..." }`
   - Returnerer: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **Brukeren skriver inn koden** på verifiseringsadressen og godkjenner eller avslår

3. **Spør etter token:** `POST /membership/oauth/token` (Offentlig)
   - Body: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Returnerer `authorization_pending` inntil den er godkjent, og returnerer deretter tilgangstokenet

### Administrasjon av OAuth-klienter

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | List alle OAuth-klienter |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Hent klient etter ID |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Hent klient etter klient-ID (hemmelighet skjult) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | Opprett eller oppdater en klient |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | Slett en klient |
| POST | `/membership/oauth/register` | Offentlig | — | Dynamisk klientregistrering (RFC 7591) for offentlige klienter, for eksempel MCP-koblinger. Se [Tilkoblede apper](../connected-apps#dynamic-client-registration) |

### Endepunkter for enhetsgodkjenning

| Metode | Sti | Autentisering | Beskrivelse |
|--------|------|------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Hent info om ventende enhetskode for godkjenningsgrensesnittet |
| POST | `/membership/oauth/device/approve` | JWT | Godkjenn en enhetsautorisering. Body: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Avslå en enhetsautorisering. Body: `{ "user_code": "..." }` |

## Offentlige kontra autentiserte endepunkter

API-et bruker to innpakningsfunksjoner som bestemmer autentiseringskrav:

- **`actionWrapper`** — Krever en gyldig JWT. Det autentiserte brukerobjektet (`au`) er tilgjengelig med `churchId`, `userId` og tillatelsessjekker.
- **`actionWrapperAnon`** — Ingen autentisering kreves. Brukes til innlogging, registrering, offentlige innholdsoppslag og webhook-mottakere.

I endepunkttabellene i denne dokumentasjonen angis disse som henholdsvis **JWT** og **Offentlig** i Autentisering-kolonnen.

## Relaterte sider

- [Modulstruktur](../module-structure) — Hvordan kontrollere, repositories og modeller er organisert
- [Lokalt oppsett](../local-setup) — Kjøre API-et lokalt for utvikling
