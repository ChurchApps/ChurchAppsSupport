---
title: "Autentisering och behörigheter"
---

# Autentisering och behörigheter

<div class="article-intro">

ChurchApps API:et använder JWT-baserad autentisering. Användare loggar in och får en token som innehåller deras identitet, kyrkmedlemskap och behörigheter. Den här sidan beskriver autentiseringsflödet, behörighetsmodellen och OAuth-stödet.

</div>

## Inloggningsflöde

### Standardinloggning

```
POST /membership/users/login
```

**Auth:** Public

Accepterar en av tre typer av inloggningsuppgifter:

| Fält | Beskrivning |
|-------|-------------|
| `email` + `password` | Standardinloggning med e-post och lösenord |
| `jwt` | Autentisera på nytt med en befintlig JWT |
| `authGuid` | Engångslänk för autentisering (används i välkomst- och återställningsmejl) |

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

Fältet `token` är en JWT som ska skickas som `Authorization: Bearer <token>` i efterföljande anrop.

### Tvåstegsinloggning

Användare kan aktivera tvåstegsinloggning med autentiseringsapp (TOTP). För dessa användare returnerar en inloggning med `email` + `password`, `authGuid` eller SSO ingen token. I stället svarar servern med en utmaning:

```json
{ "mfaRequired": true, "mfaToken": "<challenge-token>" }
```

Utmaningstoken är giltig i 5 minuter. Skicka tillbaka den till samma endpoint tillsammans med koden:

```json
{ "mfaToken": "<challenge-token>", "mfaCode": "123456" }
```

`mfaCode` kan vara den aktuella 6-siffriga koden från autentiseringsappen eller en av användarens tio engångsbackupkoder. En felaktig kod ger `Invalid code`, och upprepade misslyckade försök begränsas per konto. En återinloggning med `jwt` utmanas aldrig, så befintliga sessioner fortsätter att förnyas. Användarobjektet i inloggningssvaret innehåller `mfaEnabled`.

Endpoints för självbetjäning (endast för inloggad användare, under `/membership/users/mfa`):

| Endpoint | Beskrivning |
|----------|-------------|
| `GET /status` | `{ enabled, backupCodesLeft }` |
| `POST /setup` | Startar konfigurationen; returnerar `{ secret, otpauthUrl }` för QR-koden |
| `POST /enable` | Body `{ code }`; aktiverar funktionen och returnerar `{ backupCodes }` en enda gång |
| `POST /disable` | Body `{ code }` (autentiseringskod eller backupkod); inaktiverar funktionen |
| `POST /reset/:userId` | Endast Server.Admin; inaktiverar funktionen för en annan användare |

Hemligheter lagras krypterade och backupkoder lagras som hash-värden. Aktivering, inaktivering och återställning skrivs till granskningsloggen.

### Tokeninnehåll

JWT:en innehåller:
- `id` — Användar-ID
- `churchId` — För närvarande vald kyrka
- `personId` — Personposten för den valda kyrkan
- Behörighetsmatriser per API

### Val av kyrka

Användare kan tillhöra flera kyrkor. Inloggningssvaret innehåller alla kyrkor med deras behörigheter. För att byta kyrka skapar klienten en ny JWT som gäller för en annan kyrka i inloggningssvarets data.

## Registrering av användare

### Registrera en ny användare

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

Skapar en användare med ett tillfälligt lösenord och skickar ett välkomstmejl med en autentiseringslänk. Den första användaren som registreras på en ny instans får automatiskt serveradministratörsbehörighet.

Två valfria botfällefält accepteras: `website` (ett dolt honeypot-fält som riktiga användare lämnar tomt) och `fillMs` (hur länge formuläret var öppet, i millisekunder). Om `website` är ifyllt eller `fillMs` är under 2000 skapas inget konto, men endpointen returnerar ändå ett normalt utseende `200`-svar så att botar inte kan se att de har avvisats. Klienter som utelämnar båda fälten registreras som vanligt.

### Registrera en ny kyrka

```
POST /membership/churches/add
```

**Auth:** JWT

Efter att en användare har registrerats anropar du denna endpoint för att skapa en kyrka och koppla användaren till den.

## Lösenordshantering

| Metod | Sökväg | Auth | Beskrivning |
|--------|------|------|-------------|
| POST | `/membership/users/forgot` | Public | Skickar ett mejl för återställning av lösenord. Body: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Public | Anger ett nytt lösenord med hjälp av en autentiserings-GUID från ett återställningsmejl. Body: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Ändrar den aktuella användarens lösenord. Body: `{ "newPassword": "..." }` |

## Behörighetsmodell

Behörigheter är organiserade per modul och tilldelas användare via roller. Varje behörighet har en **innehållstyp** och en **åtgärd**.

### Behörighetsreferens

| Visningsavsnitt | Innehållstyp | Åtgärd | Beskrivning |
|----------------|--------------|--------|-------------|
| **Närvaro** | Attendance | Checkin | Checka in medlemmar vid gudstjänster |
| | Attendance | Edit | Redigera närvaroposter |
| | Services | Edit | Hantera gudstjänster och gudstjänsttider |
| | Attendance | View | Visa närvaroposter |
| | Attendance | View Summary | Visa sammanfattningar och rapporter om närvaro |
| **Gåvor** | Donations | Edit | Skapa och redigera gåvoposter |
| | Settings | Edit | Redigera inställningar för gåvor och betalningar |
| | Donations | View Summary | Visa sammanfattningsrapporter för gåvor |
| | Donations | View | Visa enskilda gåvoposter |
| **Personer och grupper** | Forms | Admin | Fullständig administration av formulär |
| | Forms | Edit | Redigera formulärdefinitioner |
| | Plans | Edit | Redigera gudstjänstplaner |
| | Group Members | Edit | Lägg till/ta bort gruppmedlemmar |
| | Groups | Edit | Skapa och redigera grupper |
| | Households | Edit | Redigera hushållstilldelningar |
| | People | Edit | Redigera vilken personpost som helst |
| | People | Edit Self | Redigera endast din egen personpost |
| | Roles | Edit | Hantera roller och användartilldelningar |
| | Group Members | View | Visa gruppmedlemslistor |
| | People | View Members | Visa endast medlemmar (inte besökare) |
| | People | View | Visa alla personer |
| | Roles | View | Visa roller och tilldelningar |
| | Settings | Edit | Redigera kyrkans inställningar |
| **Innehåll** | Content | Edit | Redigera sidor, avsnitt och element |
| | Settings | Edit | Redigera innehållsinställningar |
| | StreamingServices | Edit | Hantera konfiguration för streamingtjänster |
| | Chat | Host | Vara värd för och modererar chattsessioner |
| **Meddelanden** | Texting | Send | Skicka sms |

### Så kontrolleras behörigheter

I controllers kontrolleras behörigheter med metoden `au.checkAccess()`:

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

### Serveradministratör

Behörigheten `Server.Admin` ger full åtkomst till alla kyrkor. Den tilldelas den första registrerade användaren och kan ges till andra via rollen för serveradministratör.

## OAuth 2.0

API:et stöder OAuth 2.0 för integrationer från tredje part. Två grant-typer finns tillgängliga.

### Flöde med auktoriseringskod

1. **Auktorisera:** `POST /membership/oauth/authorize` (JWT krävs)
   - Body: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "...", "code_challenge": "...", "code_challenge_method": "S256" }`
   - `code_challenge` / `code_challenge_method` (PKCE, endast `S256`) krävs för publika klienter utan hemlighet
   - Returnerar: `{ "code": "...", "state": "..." }`

2. **Byt kod mot token:** `POST /membership/oauth/token` (Publik)
   - Body: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "...", "code_verifier": "..." }`
   - Skicka `code_verifier` när auktoriseringssteget använde en `code_challenge`; publika klienter utelämnar `client_secret`. JSON- eller formulärkodade body accepteras
   - Returnerar: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Förnya token:** `POST /membership/oauth/token` (Publik)
   - Body: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

Åtkomsttokens upphör efter **12 timmar**.

### Device code-flöde (RFC 8628)

För enheter utan webbläsare (TV-appar, kiosker):

1. **Begär device code:** `POST /membership/oauth/device/authorize` (Publik)
   - Body: `{ "client_id": "...", "scope": "..." }`
   - Returnerar: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **Användaren anger koden** på verifieringsadressen och godkänner eller nekar

3. **Hämta token med polling:** `POST /membership/oauth/token` (Publik)
   - Body: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Returnerar `authorization_pending` tills den godkänts, och returnerar sedan åtkomsttoken

### Hantera OAuth-klienter

| Metod | Sökväg | Auth | Behörighet | Beskrivning |
|--------|------|------|------------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | Lista alla OAuth-klienter |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Hämta klient med ID |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Hämta klient med klient-ID (hemligheten dold) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | Skapa eller uppdatera en klient |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | Ta bort en klient |
| POST | `/membership/oauth/register` | Public | — | Dynamisk klientregistrering (RFC 7591) för publika klienter, till exempel MCP-kopplingar. Se [Anslutna appar](../connected-apps#dynamic-client-registration) |

### Endpoints för godkännande av enheter

| Metod | Sökväg | Auth | Beskrivning |
|--------|------|------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Hämtar information om väntande device code för godkännandegränssnittet |
| POST | `/membership/oauth/device/approve` | JWT | Godkänner en enhetsauktorisering. Body: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Nekar en enhetsauktorisering. Body: `{ "user_code": "..." }` |

## Publika kontra autentiserade endpoints

API:et använder två wrapper-funktioner som avgör autentiseringskraven:

- **`actionWrapper`** — Kräver en giltig JWT. Det autentiserade användarobjektet (`au`) är tillgängligt med `churchId`, `userId` och behörighetskontroller.
- **`actionWrapperAnon`** — Kräver ingen autentisering. Används för inloggning, registrering, sökningar av publikt innehåll och webhook-mottagare.

I endpoint-tabellerna i den här dokumentationen anges dessa som **JWT** respektive **Public** i kolumnen Auth.

## Relaterade sidor

- [Modulstruktur](../module-structure) — Hur controllers, repositories och modeller är organiserade
- [Lokal installation](../local-setup) — Köra API:et lokalt för utveckling
