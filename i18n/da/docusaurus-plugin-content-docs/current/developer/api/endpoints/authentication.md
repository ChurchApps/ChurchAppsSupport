---
title: "Godkendelse & Tilladelser"
---

# Godkendelse & Tilladelser

<div class="article-intro">

ChurchApps API'en bruger JWT-baseret godkendelse. Brugere logger ind for at modtage et token, der koder deres identitet, kirkegodkendelse og tilladelser. Denne side dækker auth-flow, tilladels model og OAuth-understøttelse.

</div>

## Login flow

### Standard login

```
POST /membership/users/login
```

**Auth:** Offentlig

Accepterer en af tre referencetyper:

| Felt | Beskrivelse |
|-------|-------------|
| `email` + `password` | Standard e-mail/adgangskode login |
| `jwt` | Re-godkend med en eksisterende JWT |
| `authGuid` | Engangsgodkendels link (brugt i velkomst/reset e-mails) |

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

Feltet `token` er en JWT, der skal sendes som `Authorization: Bearer <token>` på efterfølgende anmodninger.

## Tilladels model

Tilladelser er organiseret efter modul og tildelt brugere gennem roller. Hver tilladelse har en **indholds type** og en **handling**.

### Tilladels reference

| Visningssektion | Indholds type | Handling | Beskrivelse |
|----------------|--------------|--------|-------------|
| **Tilstedeværelse** | Attendance | Checkin | Tjek ind medlemmer ved tjenester |
| | Attendance | Edit | Rediger tilstedeværelse poster |
| | Services | Edit | Administrer tjenester og serviceider |
| | Attendance | View | Se tilstedeværelse poster |
| | Attendance | View Summary | Se tilstedeværelse opsummeringer og rapporter |
| **Donationer** | Donations | Edit | Opret og rediger donations poster |
| | Settings | Edit | Rediger giver/betalings indstillinger |
| | Donations | View Summary | Se donationss opsummerings rapporter |
| | Donations | View | Se individuelle donations poster |
| **Mennesker og grupper** | Forms | Admin | Fuld formular administration |
| | Forms | Edit | Rediger formular definitioner |
| | Plans | Edit | Rediger serviceplaner |
| | Group Members | Edit | Tilføj/fjern gruppemedlemmer |
| | Groups | Edit | Opret og rediger grupper |
| | Households | Edit | Rediger husstand tildeling |
| | People | Edit | Rediger enhver persons post |
| | People | Edit Self | Rediger kun dit eget persons post |
| | Roles | Edit | Administrer roller og bruger tildeling |
| | Group Members | View | Se gruppebedlemmer lister |
| | People | View Members | Se medlemmer kun (ikke besøgende) |
| | People | View | Se alle mennesker |
| | Roles | View | Se roller og tildeling |
| | Settings | Edit | Rediger kirkgindstillinger |
| **Indhold** | Content | Edit | Rediger sider, afsnit, elementer |
| | Settings | Edit | Rediger indholds indstillinger |
| | StreamingServices | Edit | Administrer streaming services konfiguration |
| | Chat | Host | Vært/moderator chat sessioner |
| **Messaging** | Texting | Send | Send SMS text beskeder |

## Relaterede sider

- [Modul struktur](../module-structure) — Hvordan kontrollere, lagere og modeller er organiseret
- [Lokal opsætning](../local-setup) — Kør API'en lokalt til udvikling
