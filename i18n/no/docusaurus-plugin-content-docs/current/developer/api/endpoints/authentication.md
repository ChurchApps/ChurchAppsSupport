---
title: "Autentisering og tillatelser"
---

# Autentisering og tillatelser

<div class="article-intro">

ChurchApps API bruker JWT-basert autentisering. Brukere logger inn for å motta et token som koder identiteten, kirkemedlemskapet og tillatelsene deres. Denne siden dekker autentiseringsflyten, tillatelsesmodellen og OAuth-støtte.

</div>

## Innloggingsflyt

### Standard innlogging

```
POST /membership/users/login
```

**Auth:** Public

Aksepterer én av tre legitimasjonstyper:

| Felt | Beskrivelse |
|------|-------------|
| `email` + `password` | Standard e-post/passord-innlogging |
| `jwt` | Re-autentiser med et eksisterende JWT |
| `authGuid` | Engangs-autentiseringslenke (brukes i velkomst-/tilbakestillingse-poster) |

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

`token`-feltet er et JWT som bør sendes som `Authorization: Bearer <token>` på etterfølgende forespørsler.

### Tokeninnhold

JWT-et koder:
- `id` — Bruker-ID
- `churchId` — Nåværende valgt kirke
- `personId` — Personoppføring for den valgte kirken
- Tillatelses-lister per API

### Kirkevalg

Brukere kan tilhøre flere kirker. Innloggingsresponsen inkluderer alle kirker med tillatelsene deres. For å bytte kirke genererer klienten et nytt JWT avgrenset til en annen kirke fra innloggingsresponsdataene.

## Brukerregistrering

### Registrer en ny bruker

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

Oppretter en bruker med et midlertidig passord og sender en velkomst-e-post med en autentiseringslenke. Den første brukeren som registreres på en ny instans får automatisk serveradministratortilgang.

### Registrer en ny kirke

```
POST /membership/churches/add
```

**Auth:** JWT

Etter å ha registrert en bruker, kall dette endepunktet for å opprette en kirke og tilknytte brukeren til den.

## Passordadministrasjon

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/membership/users/forgot` | Public | Send e-post for tilbakestilling av passord. Body: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Public | Angi nytt passord ved hjelp av en auth-GUID fra en tilbakestillingse-post. Body: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Endre gjeldende brukers passord. Body: `{ "newPassword": "..." }` |

## Tillatelsesmodell

Tillatelser er organisert etter modul og tildelt brukere gjennom roller. Hver tillatelse har en **innholdstype** og en **handling**.

### Tillatelsesreferanse

| Visningsseksjon | Innholdstype | Handling | Beskrivelse |
|-----------------|--------------|----------|-------------|
| **Attendance** | Attendance | Checkin | Sjekk inn medlemmer ved gudstjenester |
| | Attendance | Edit | Rediger oppmøteregistreringer |
| | Services | Edit | Administrer gudstjenester og gudstjenestetider |
| | Attendance | View | Vis oppmøteregistreringer |
| | Attendance | View Summary | Vis oppmøteoppsummeringer og rapporter |
| **Donations** | Donations | Edit | Opprett og rediger gaveregistreringer |
| | Settings | Edit | Rediger gave-/betalingsinnstillinger |
| | Donations | View Summary | Vis gaveoppsummeringsrapporter |
| | Donations | View | Vis individuelle gaveregistreringer |
| **People and Groups** | Forms | Admin | Full skjemaadministrasjon |
| | Forms | Edit | Rediger skjemadefinisjoner |
| | Plans | Edit | Rediger tjenesteplaner |
| | Group Members | Edit | Legg til/fjern gruppemedlemmer |
| | Groups | Edit | Opprett og rediger grupper |
| | Households | Edit | Rediger husstandstilordninger |
| | People | Edit | Rediger enhver personoppføring |
| | People | Edit Self | Rediger kun din egen personoppføring |
| | Roles | Edit | Administrer roller og brukertilordninger |
| | Group Members | View | Vis gruppemedlemslister |
| | People | View Members | Vis kun medlemmer (ikke besøkende) |
| | People | View | Vis alle personer |
| | Roles | View | Vis roller og tilordninger |
| | Settings | Edit | Rediger kirkeinnstillinger |
| **Content** | Content | Edit | Rediger sider, seksjoner, elementer |
| | Settings | Edit | Rediger innholdsinnstillinger |
| | StreamingServices | Edit | Administrer konfigurasjon for strømmingstjenester |
| | Chat | Host | Vært/moderer chat-økter |
| **Messaging** | Texting | Send | Send SMS-tekstmeldinger |

### Hvordan tillatelser kontrolleres

I kontrollere sjekkes tillatelser ved hjelp av `au.checkAccess()`-metoden:

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

### Serveradministrator

`Server.Admin`-tillatelsen gir full tilgang på tvers av alle kirker. Denne tildeles den første registrerte brukeren og kan gis til andre gjennom serveradministratorrollen.

## OAuth 2.0

API-et støtter OAuth 2.0 for tredjepartsintegrasjoner. To grant-typer er tilgjengelige.

### Authorization Code-flyt

1. **Autoriser:** `POST /membership/oauth/authorize` (JWT påkrevd)
   - Body: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "..." }`
   - Returnerer: `{ "code": "...", "state": "..." }`

2. **Bytt kode mot token:** `POST /membership/oauth/token` (Public)
   - Body: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "..." }`
   - Returnerer: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Oppdater token:** `POST /membership/oauth/token` (Public)
   - Body: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

Tilgangstokens utløper etter **12 timer**.

### Device Code-flyt (RFC 8628)

For enheter uten nettleser (TV-apper, kiosker):

1. **Forespør enhetskode:** `POST /membership/oauth/device/authorize` (Public)
   - Body: `{ "client_id": "...", "scope": "..." }`
   - Returnerer: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **Brukeren skriver inn koden** på verifiserings-URI-en og godkjenner eller avslår

3. **Poller etter token:** `POST /membership/oauth/token` (Public)
   - Body: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Returnerer `authorization_pending` til godkjent, deretter returneres tilgangstokenet

### OAuth-klientadministrasjon

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | List alle OAuth-klienter |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Hent klient etter ID |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Hent klient etter klient-ID (hemmelighet redigert bort) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | Opprett eller oppdater en klient |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | Slett en klient |

### Enhetsgodkjenningsendepunkter

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Hent ventende enhetskodeinfo for godkjennings-UI |
| POST | `/membership/oauth/device/approve` | JWT | Godkjenn en enhetsautorisasjon. Body: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Avslå en enhetsautorisasjon. Body: `{ "user_code": "..." }` |

## Offentlige vs. autentiserte endepunkter

API-et bruker to wrapperfunksjoner som bestemmer autentiseringskrav:

- **`actionWrapper`** — Krever et gyldig JWT. Det autentiserte brukerobjektet (`au`) er tilgjengelig med `churchId`, `userId` og tillatelseskontroller.
- **`actionWrapperAnon`** — Ingen autentisering kreves. Brukes for innlogging, registrering, offentlige innholdsoppslag og webhook-mottakere.

I endepunkttabellene gjennom denne dokumentasjonen indikeres disse som henholdsvis **JWT** og **Public** i Auth-kolonnen.

## Relaterte sider

- [Modulstruktur](../module-structure) — Hvordan kontrollere, repositories og modeller er organisert
- [Lokalt oppsett](../local-setup) — Kjøre API-et lokalt for utvikling
