---
title: "Autentisering og tillatelser"
---

# Autentisering og tillatelser

<div class="article-intro">

ChurchApps API bruker JWT-basert autentisering. Brukere logger inn for å motta et token som koder identiteten deres, kirketilhørigheten og tillatelsene deres. Denne siden dekker autentiseringsflyten, tillatelsesmodellen og OAuth-støtten.

</div>

## Innloggingsflyt

### Standard innlogging

```
POST /membership/users/login
```

**Autentisering:** Offentlig

Godtar en av tre typer legitimasjon:

| Felt | Beskrivelse |
|-------|-------------|
| `email` + `password` | Standard innlogging med e-post og passord |
| `jwt` | Autentiser på nytt med et eksisterende JWT |
| `authGuid` | Engangs-autentiseringslenke (brukt i velkomst- og tilbakestillings-e-poster) |

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

Feltet `token` er et JWT som skal sendes som `Authorization: Bearer <token>` i påfølgende forespørsler.

### Tofaktorinnlogging {#two-factor-sign-in}

Brukere kan slå på tofaktorinnlogging med autentiseringsapp (TOTP). For disse brukerne returnerer en `email` + `password`-, `authGuid`- eller SSO-innlogging ikke et token. I stedet svarer den med en utfordring:

```json
{ "mfaRequired": true, "mfaToken": "<challenge-token>" }
```

Utfordringstokenet gjelder i 5 minutter. Send det tilbake til samme endepunkt sammen med koden:

```json
{ "mfaToken": "<challenge-token>", "mfaCode": "123456" }
```

`mfaCode` kan være den nåværende 6-sifrede koden fra autentiseringsappen, eller en av brukerens ti engangs-reservekoder. En feil kode returnerer `Invalid code`, og gjentatte feil begrenses per konto. En innlogging med `jwt` utfordres aldri, slik at eksisterende økter fortsetter å fornyes. Innloggingsresponsens `user`-objekt har feltet `mfaEnabled`.

Selvbetjeningsendepunkter (kun for innlogget bruker, under `/membership/users/mfa`):

| Endepunkt | Beskrivelse |
|----------|-------------|
| `GET /status` | `{ enabled, backupCodesLeft }` |
| `POST /setup` | Starter oppsettet; returnerer `{ secret, otpauthUrl }` for QR-koden |
| `POST /enable` | Body `{ code }`; slår den på og returnerer `{ backupCodes }` én gang |
| `POST /disable` | Body `{ code }` (autentiserings- eller reservekode); slår den av |
| `POST /reset/:userId` | Kun Server.Admin; slår den av for en annen bruker |

Hemmeligheter lagres kryptert, og reservekoder lagres som hasher. Aktivering, deaktivering og tilbakestilling skrives til revisjonsloggen.

### Tokeninnhold

JWT koder:
- `id` — Bruker-ID
- `churchId` — Valgt kirke
- `personId` — Personpost for den valgte kirken
- Tillatelsesmatriser per API

### Kirkevalg

Brukere kan tilhøre flere kirker. Innloggingsresponsen inkluderer alle kirker med deres tillatelser. For å bytte kirke genererer klienten et nytt JWT avgrenset til en annen kirke, basert på dataene i innloggingsresponsen.

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

Oppretter en bruker med et midlertidig passord og sender en velkomst-e-post med en autentiseringslenke. Den første brukeren som registreres på en ny instans, får automatisk tilgang som serveradministrator.

To valgfrie felt for bottfelle godtas: `website` (et skjult honeypot-felt som ekte brukere lar stå tomt) og `fillMs` (hvor lenge skjemaet var åpent, i millisekunder). Hvis `website` er fylt ut eller `fillMs` er under 2000, opprettes ingen konto, men endepunktet returnerer likevel en vanlig `200`-respons, slik at bots ikke kan se at de ble avvist. Klienter som utelater begge feltene registrerer seg som vanlig.

### Registrer en ny kirke

```
POST /membership/churches/add
```

**Autentisering:** JWT

Etter at du har registrert en bruker, kall dette endepunktet for å opprette en kirke og knytte brukeren til den.

## Passordhåndtering

| Metode | Sti | Autentisering | Beskrivelse |
|--------|------|------|-------------|
| POST | `/membership/users/forgot` | Offentlig | Send en e-post for tilbakestilling av passord. Body: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Offentlig | Sett et nytt passord ved hjelp av en auth-GUID fra en tilbakestillings-e-post. Body: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Endre den innloggede brukerens passord. Body: `{ "newPassword": "..." }` |

## Tillatelsesmodell

Tillatelser er organisert etter modul og tilordnes brukere gjennom roller. Hver tillatelse har en **innholdstype** og en **handling**.

### Tillatelsesreferanse

| Visningsseksjon | Innholdstype | Handling | Beskrivelse |
|----------------|--------------|--------|-------------|
| **Oppmøte** | Attendance | Checkin | Sjekk inn medlemmer ved gudstjenester |
| | Attendance | Edit | Rediger oppmøteregistreringer |
| | Services | Edit | Administrer gudstjenester og gudstjenestetider |
| | Attendance | View | Se oppmøteregistreringer |
| | Attendance | View Summary | Se oppmøteoppsummeringer og rapporter |
| **Gaver** | Donations | Edit | Opprett og rediger giveregistreringer |
| | Settings | Edit | Rediger innstillinger for gaver/betaling |
| | Donations | View Summary | Se oppsummeringsrapporter for gaver |
| | Donations | View | Se enkeltregistreringer av gaver |
| **Personer og grupper** | Forms | Admin | Full administrasjon av skjemaer |
| | Forms | Edit | Rediger skjemadefinisjoner |
| | Plans | Edit | Rediger tjenesteplaner |
| | Group Members | Edit | Legg til/fjern gruppemedlemmer |
| | Groups | Edit | Opprett og rediger grupper |
| | Households | Edit | Rediger husstandstilordninger |
| | People | Edit | Rediger alle personposter |
| | People | Edit Self | Rediger bare din egen personpost |
| | Roles | Edit | Administrer roller og brukertilordninger |
| | Group Members | View | Se gruppemedlemslister |
| | People | View Members | Se bare medlemmer (ikke besøkende) |
| | People | View | Se alle personer |
| | Roles | View | Se roller og tilordninger |
| | Settings | Edit | Rediger kirkeinnstillinger |
| **Innhold** | Content | Edit | Rediger sider, seksjoner, elementer |
| | Settings | Edit | Rediger innholdsinnstillinger |
| | StreamingServices | Edit | Administrer konfigurasjon av direktesending |
| | Chat | Host | Vær vert for/moderer chatøkter |
| **Meldinger** | Texting | Send | Send SMS-meldinger |

### Slik sjekkes tillatelser

I kontrollere sjekkes tillatelser med metoden `au.checkAccess()`:

```typescript
// Krev en bestemt tillatelse
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

Tillatelsen `Server.Admin` gir full tilgang på tvers av alle kirker. Den tilordnes den første registrerte brukeren og kan gis til andre gjennom serveradministratorrollen.

## OAuth 2.0

API-et støtter OAuth 2.0 for tredjepartsintegrasjoner. To granttyper er tilgjengelige.

### Autorisasjonskodeflyt

1. **Autoriser:** `POST /membership/oauth/authorize` (krever JWT)
   - Body: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "...", "code_challenge": "...", "code_challenge_method": "S256" }`
   - `code_challenge` / `code_challenge_method` (PKCE, kun `S256`) kreves for offentlige klienter uten hemmelighet
   - Returnerer: `{ "code": "...", "state": "..." }`

2. **Bytt kode mot token:** `POST /membership/oauth/token` (Offentlig)
   - Body: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "...", "code_verifier": "..." }`
   - Send `code_verifier` når autoriseringssteget brukte en `code_challenge`; offentlige klienter utelater `client_secret`. JSON- og skjemakodede body-formater godtas
   - Returnerer: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Forny token:** `POST /membership/oauth/token` (Offentlig)
   - Body: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

Tilgangstokener utløper etter **12 timer**.

### Enhetskodeflyt (RFC 8628)

For enheter uten nettleser (TV-apper, kiosker):

1. **Be om enhetskode:** `POST /membership/oauth/device/authorize` (Offentlig)
   - Body: `{ "client_id": "...", "scope": "..." }`
   - Returnerer: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **Brukeren skriver inn koden** på verifiseringsadressen og godkjenner eller avslår

3. **Spør etter token:** `POST /membership/oauth/token` (Offentlig)
   - Body: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Returnerer `authorization_pending` til den er godkjent, og returnerer deretter tilgangstokenet

### Administrasjon av OAuth-klienter

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | List alle OAuth-klienter |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Hent klient etter ID |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Hent klient etter klient-ID (hemmelighet skjult) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | Opprett eller oppdater en klient |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | Slett en klient |
| POST | `/membership/oauth/register` | Offentlig | — | Dynamisk klientregistrering (RFC 7591) for offentlige klienter som MCP-tilkoblinger. Se [Tilkoblede apper](../connected-apps#dynamic-client-registration) |

### Endepunkter for godkjenning av enheter

| Metode | Sti | Autentisering | Beskrivelse |
|--------|------|------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Hent info om ventende enhetskode for godkjenningsgrensesnittet |
| POST | `/membership/oauth/device/approve` | JWT | Godkjenn en enhetsautorisasjon. Body: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Avslå en enhetsautorisasjon. Body: `{ "user_code": "..." }` |

## Offentlige vs. autentiserte endepunkter

API-et bruker to innpakningsfunksjoner som avgjør autentiseringskrav:

- **`actionWrapper`** — Krever et gyldig JWT. Den autentiserte brukerobjektet (`au`) er tilgjengelig med `churchId`, `userId` og tillatelsessjekker.
- **`actionWrapperAnon`** — Ingen autentisering kreves. Brukes til innlogging, registrering, offentlige innholdsoppslag og webhook-mottakere.

I endepunkttabellene i denne dokumentasjonen angis disse som henholdsvis **JWT** og **Offentlig** i kolonnen Autentisering.

## Relaterte sider

- [Modulstruktur](../module-structure) — Hvordan kontrollere, repositorier og modeller er organisert
- [Lokalt oppsett](../local-setup) — Kjør API-et lokalt for utvikling
