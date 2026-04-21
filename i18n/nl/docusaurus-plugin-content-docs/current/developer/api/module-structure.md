---
title: "Module Structure"
---

# Module Structure

<div class="article-intro">

Elke API-module volgt een consistente interne structuur met controllers, repositories, modellen en helpers. Het begrijpen van deze lay-out maakt het eenvoudig om in de codebase te navigeren en nieuwe functionaliteit aan elke module toe te voegen.

</div>

<div class="prereqs">
<h4>Voordat u begint</h4>

- Stel de API lokaal in -- zie [Local API Setup](./local-setup)
- Lees de [Database](./database)-architectuur om de gegevenstoegangslaag te begrijpen

</div>

## Mappenindeling

Elke module bevindt zich onder `src/modules/{name}/` en bevat vier mappen:

```
src/modules/{name}/
├── controllers/    ← Routehandlers (Express-eindpunten)
├── repositories/   ← Gegevenstoegangslaag (directe SQL)
├── models/         ← TypeScript-interfaces en -types
└── helpers/        ← Module-specifieke bedrijfslogica
```

Bijvoorbeeld de lidmaatschapmodule:

```
src/modules/membership/
├── controllers/
│   ├── PersonController.ts
│   ├── GroupController.ts
│   └── ...
├── repositories/
│   ├── PersonRepository.ts
│   ├── GroupRepository.ts
│   └── ...
├── models/
│   ├── Person.ts
│   ├── Group.ts
│   └── ...
└── helpers/
    └── ...
```

## Controllers

Controllers definiëren de API-routes voor een module. Ze breiden `CustomBaseController` uit van `@churchapps/apihelper` en gebruiken Inversify-decorators voor routeregistratie.

```typescript
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { CustomBaseController } from "@churchapps/apihelper";

@controller("/people")
export class PersonController extends CustomBaseController {

  @httpGet("/")
  public async loadAll() {
    return this.actionWrapper(async (au) => {
      // au = authenticated user context
      au.checkAccess("People", "View");
      const repos = RepositoryManager.getRepositories<MembershipRepositories>("membership");
      return repos.person.loadByChurchId(au.churchId);
    });
  }

  @httpPost("/")
  public async save() {
    return this.actionWrapper(async (au) => {
      au.checkAccess("People", "Edit");
      const data = this.request.body;
      // ... save logic
    });
  }
}
```

### Routedecorators

| Decorator | HTTP-methode |
|-----------|-------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

De `@controller("/base")`-decorator stelt het basispad in voor alle routes in de controller.

## Repositories

Repositories verwerken alle databasebewerkingen met behulp van directe SQL via `DB.query()`. Er is geen ORM -- u schrijft SQL rechtstreeks.

```typescript
export class PersonRepository {
  public async loadByChurchId(churchId: string) {
    return DB.query("SELECT * FROM people WHERE churchId=?", [churchId]);
  }

  public async save(person: Person) {
    // INSERT or UPDATE logic
  }
}
```

Toegang tot repositories via de `RepositoryManager`:

```typescript
const repos = RepositoryManager.getRepositories<MembershipRepositories>("membership");
const people = await repos.person.loadByChurchId(churchId);
```

## Verificatie en Autorisatie

### JWT-verificatie

Alle verzoeken worden geverifieerd via JWT-tokens die door `CustomAuthProvider` worden verwerkt. Het token wordt automatisch gevalideerd en de geverifieerde gebruikerscontext (`au`) is beschikbaar in elke controller-actie.

### Machtigheidcontroles

Gebruik `au.checkAccess()` om te verifiëren dat de huidige gebruiker de vereiste machtiging heeft:

```typescript
au.checkAccess("People", "View");    // Read access
au.checkAccess("People", "Edit");    // Write access
```

Als de gebruiker de vereiste machtiging niet heeft, wordt automatisch een foutreactie geretourneerd.

:::warning
Roep altijd `au.checkAccess()` aan voordat u databasebewerkingen uitvoert. Sla nooit machtigheidcontroles over, zelfs niet voor schijnbaar alleen-lezen eindpunten.
:::

## Omgevingsconfiguratie

De `Environment`-klasse handelt configuratie in omgevingen af:

- **Lokale ontwikkeling:** Lezen uit het `.env`-bestand in de projectroot
- **Geïmplementeerde omgevingen:** Lezen uit AWS SSM Parameter Store

```typescript
// Access environment variables
const dbConnection = Environment.membershipDb;
const jwtSecret = Environment.jwtSecret;
```

Deze abstractie betekent dat uw code niet hoeft te weten waar de configuratie vandaan komt.

## Lambda-functies

Bij implementatie in AWS draait de API als vier Lambda-functies:

| Functie | Doel |
|----------|---------|
| `web` | Verwerkt alle HTTP REST API-verzoeken |
| `socket` | Beheert WebSocket-verbindingen voor real-time-functies |
| `timer15Min` | Gepland elke 15 minuten voor e-mailmeldingen |
| `timerMidnight` | Gepland dagelijks voor digest-e-mails en onderhoud |

:::info
Lokaal draait de `web`-functie op poort 8084 en de `socket`-functie op poort 8087. De timerfuncties kunnen handmatig worden geactiveerd tijdens de ontwikkeling.
:::

## Gerelateerde Artikelen

- **[Database](./database)** -- Verbindingsreeksen, schemaschriften en gegevenstoegangspatronen
- **[Local API Setup](./local-setup)** -- Volledige stapsgewijze setupgids
- **[ApiHelper](../shared-libraries/api-helper)** -- De gedeelde bibliotheek die `CustomBaseController` en authenticatiemiddleware biedt
