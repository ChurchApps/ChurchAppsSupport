---
title: "Verificatie & Toestemmingen"
---

# Verificatie & Toestemmingen

<div class="article-intro">

De ChurchApps API maakt gebruik van JWT-gebaseerde verificatie. Gebruikers loggen in om een token te ontvangen dat hun identiteit, kerklidmaatschap en toestemmingen codeert. Deze pagina behandelt de auth-flow, het toestemmingsmodel en OAuth-ondersteuning.

</div>

## Inlogflow

### Standaardinloggen

```
POST /membership/users/login
```

**Verwijzing:** Openbaar

Accepteert één van drie referentietypen:

| Veld | Beschrijving |
|-------|-------------|
| `email` + `password` | Standaard e-mail/wachtwoordinloggen |
| `jwt` | Opnieuw verifiëren met een bestaande JWT |
| `authGuid` | Eenmalige auth-link (gebruikt in welkoms- en reset-e-mails) |

**Antwoord:**

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

Het `token` veld is een JWT dat als `Authorization: Bearer <token>` in latere aanvragen moet worden verzonden.

### Tokeninhoud

De JWT codeert:
- `id` — Gebruikers-ID
- `churchId` — Momenteel geselecteerde kerk
- `personId` — Persoonverslag voor de geselecteerde kerk
- Per-API-toestemmingsmatrixen

### Kerkzelectie

Gebruikers kunnen tot meerdere kerken behoren. Het inlogantwoord bevat alle kerken met hun toestemmingen. Om van kerk te wisselen, genereert de client een nieuwe JWT gericht op een ander kerk vanuit de inlogantwoordgegevens.

## Gebruikersregistratie

### Een nieuwe gebruiker registreren

```
POST /membership/users/register
```

**Verwijzing:** Openbaar

```json
{
  "email": "jane@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "appName": "B1 Admin",
  "appUrl": "https://app.b1.church"
}
```

Maakt een gebruiker aan met een tijdelijk wachtwoord en stuurt een welkoms-e-mail met een auth-link. De eerste gebruiker die op een nieuw instantie is geregistreerd, krijgt automatisch serverbeheerderraafdracht.

### Een nieuwe kerk registreren

```
POST /membership/churches/add
```

**Verwijzing:** JWT

Na het registreren van een gebruiker, roep dit eindpunt aan om een kerk te maken en deze aan de gebruiker te koppelen.

## Wachtwoordbeheer

| Methode | Pad | Verwijzing | Beschrijving |
|--------|------|-------|-------------|
| POST | `/membership/users/forgot` | Openbaar | Stuur een wachtwoord-reset-e-mail. Body: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Openbaar | Stel een nieuw wachtwoord in met een auth GUID uit een reset-e-mail. Body: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Wijzig het wachtwoord van de huidige gebruiker. Body: `{ "newPassword": "..." }` |

## Toestemmingsmodel

Toestemmingen worden door modules georganiseerd en aan gebruikers toegewezen via rollen. Elke toestemming heeft een **inhoudstype** en een **actie**.

### Toestemmingsverwijzing

| Weergavepagina | Inhoudstype | Actie | Beschrijving |
|----------------|--------------|--------|-------------|
| **Aanwezigheid** | Attendance | Checkin | Leden inchecken bij diensten |
| | Attendance | Edit | Aanwezigheidsverslagen bewerken |
| | Services | Edit | Diensten en servicetijden beheren |
| | Attendance | View | Aanwezigheidsverslagen bekijken |
| | Attendance | View Summary | Aanwezigheids samenvattingen en rapporten bekijken |
| **Donaties** | Donations | Edit | Donatie-verslagen maken en bewerken |
| | Settings | Edit | Geven/betalingsinstellingen bewerken |
| | Donations | View Summary | Donatie samenvattingsrapporten bekijken |
| | Donations | View | Individuele donatieverslagen bekijken |
| **Mensen en groepen** | Forms | Admin | Volledige formbeheer |
| | Forms | Edit | Formdefinities bewerken |
| | Plans | Edit | Serviceplanning bewerken |
| | Group Members | Edit | Groepsleden toevoegen/verwijderen |
| | Groups | Edit | Groepen maken en bewerken |
| | Households | Edit | Huishoudentoewijzingen bewerken |
| | People | Edit | Elk persoonverslag bewerken |
| | People | Edit Self | Alleen je eigen persoonverslag bewerken |
| | Roles | Edit | Rollen en gebruikerstoewijzingen beheren |
| | Group Members | View | Groepsledenlijsten bekijken |
| | People | View Members | Alleen leden bekijken (geen bezoekers) |
| | People | View | Alle mensen bekijken |
| | Roles | View | Rollen en toewijzingen bekijken |
| | Settings | Edit | Kerkinstellingen bewerken |
| **Inhoud** | Content | Edit | Pagina's, secties, elementen bewerken |
| | Settings | Edit | Inhoudinstellingen bewerken |
| | StreamingServices | Edit | Streaming service-configuratie beheren |
| | Chat | Host | Chat-sessies hosten/modereren |
| **Berichten** | Texting | Send | SMS-tekstberichten verzenden |

### Hoe toestemmingen worden gecontroleerd

In controllers worden toestemmingen gecontroleerd met de `au.checkAccess()` methode:

```typescript
// Vereisen specifieke toestemming
if (!au.checkAccess(Permissions.people.edit)) return this.json({}, 401);

// Of in actionWrapper -- het CRUD-systeem controleert automatisch
crudSettings: {
  permissions: {
    view: Permissions.people.view,
    edit: Permissions.people.edit
  }
}
```

### Serverbeheerder

De `Server.Admin` toestemming verleent volledige toegang in alle kerken. Dit wordt toegewezen aan de eerste geregistreerde gebruiker en kan aan anderen worden verleend via de serverbeheerderrole.

## OAuth 2.0

De API ondersteunt OAuth 2.0 voor integratie van derden. Twee subsidietypen zijn beschikbaar.

### Autorisatiecodestroom

1. **Autoriseren:** `POST /membership/oauth/authorize` (JWT vereist)
   - Body: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "..." }`
   - Retourneert: `{ "code": "...", "state": "..." }`

2. **Code voor token uitwisselen:** `POST /membership/oauth/token` (Openbaar)
   - Body: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "..." }`
   - Retourneert: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Token vernieuwen:** `POST /membership/oauth/token` (Openbaar)
   - Body: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

Toegangstokens verlopen na **12 uur**.

### Apparaatcodestroom (RFC 8628)

Voor apparaten zonder browser (TV-apps, kiosken):

1. **Apparaatcode aanvragen:** `POST /membership/oauth/device/authorize` (Openbaar)
   - Body: `{ "client_id": "...", "scope": "..." }`
   - Retourneert: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **Gebruiker voert de code in** op de verificatie-URI en keurt goed of weigert

3. **Poll voor token:** `POST /membership/oauth/token` (Openbaar)
   - Body: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Retourneert `authorization_pending` totdat goedgekeurd, dan retourneert het toegangstoken

### OAuth Client Management

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | Lijst alle OAuth clients |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Get client op ID |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Get client op client ID (geheim geredacteerd) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | OAuth client maken of bijwerken |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | OAuth client verwijderen |

### Apparaat Goedkeuringseindpunten

| Methode | Pad | Verwijzing | Beschrijving |
|--------|------|-------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Zoekopdracht apparaatcodeinformatie voor goedkeuringsuivoering |
| POST | `/membership/oauth/device/approve` | JWT | Apparaatautorisatie goedkeuren. Body: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Apparaatautorisatie weigeren. Body: `{ "user_code": "..." }` |

## Openbare versus geverifieerde eindpunten

De API gebruikt twee wrapper-functies die verificatievereisten bepalen:

- **`actionWrapper`** -- Vereist een geldige JWT. Het geverifieerde gebruikersobject (`au`) is beschikbaar met `churchId`, `userId` en toestemmingscontroles.
- **`actionWrapperAnon`** -- Geen verificatie vereist. Gebruikt voor inloggen, registratie, openbare inhoudsaanzoeken en webhook-ontvangers.

In de eindpunttabellen in deze documentatie worden deze aangeduid als **JWT** en **Openbaar** in de Verificatie kolom.

## Gerelateerde pagina's

- [Modulestructuur](../module-structure) — Hoe controllers, opslagplaatsen en modellen zijn georganiseerd
- [Lokale setup](../local-setup) — Voer de API lokaal uit voor ontwikkeling
