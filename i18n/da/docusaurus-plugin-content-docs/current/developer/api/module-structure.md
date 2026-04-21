---
title: "Modulstruktur"
---

# Modulstruktur

<div class="article-intro">

Hvert API-modul følger en konsistent intern struktur med controllere, repositories, modeller og hjælpere. Forståelse af dette layout gør det enkelt at navigere i kodebasen og tilføje ny funktionalitet til ethvert modul.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Opsætning af API lokalt -- se [Lokalt API Setup](./local-setup)
- Gennemgå [Database](./database) arkitektur for at forstå dataaccesslaget

</div>

## Mappestruktur

Hvert modul bor under `src/modules/{name}/` og indeholder fire mappetyper:

```
src/modules/{name}/
├── controllers/    ← Route handlers (Express endpoints)
├── repositories/   ← Data access layer (direct SQL)
├── models/         ← TypeScript interfaces and types
└── helpers/        ← Module-specific business logic
```

For eksempel medlemskabsmodulet:

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

## Controllere

Controllere definerer API-ruterne for et modul. De udvider `CustomBaseController` fra `@churchapps/apihelper` og bruger Inversify-dekoratører til rutregister.

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

### Route Dekoratører

| Dekoratør | HTTP-metode |
|-----------|-------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

Dekoratøren `@controller("/base")` indstiller basestien for alle ruter i controlleren.

## Repositories

Repositories håndterer alle databaseoperationer ved hjælp af direkte SQL via `DB.query()`. Der er ingen ORM -- du skriver SQL direkte.

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

Få adgang til repositories gennem `RepositoryManager`:

```typescript
const repos = RepositoryManager.getRepositories<MembershipRepositories>("membership");
const people = await repos.person.loadByChurchId(churchId);
```

## Godkendelse og godkendelse

### JWT-godkendelse

Alle anmodninger godkendes via JWT-tokens håndteret af `CustomAuthProvider`. Tokenet valideres automatisk, og den godkendte brugersammenhæng (`au`) er tilgængelig i hver controlleraction.

### Tilladelseskontroller

Brug `au.checkAccess()` til at verificere, at den nuværende bruger har den påkrævede tilladelse:

```typescript
au.checkAccess("People", "View");    // Read access
au.checkAccess("People", "Edit");    // Write access
```

Hvis brugeren mangler den påkrævede tilladelse, returneres en fejlsvar automatisk.

:::warning
Kald altid `au.checkAccess()` før du udfører dataoperationer. Spring aldrig tilladelseskontroller over, selv for tilsyneladende skrivebeskyttede endpoints.
:::

## Miljøkonfiguration

Klassen `Environment` håndterer konfiguration på tværs af miljøer:

- **Lokal udvikling:** Læser fra `.env`-filen i projektrodet
- **Implementerede miljøer:** Læser fra AWS SSM Parameter Store

```typescript
// Access environment variables
const dbConnection = Environment.membershipDb;
const jwtSecret = Environment.jwtSecret;
```

Denne abstraktion betyder, at din kode ikke behøver at vide, hvor konfigurationen kommer fra.

## Lambda-funktioner

Når der implementeres på AWS, køres API'en som fire Lambda-funktioner:

| Function | Formål |
|----------|---------|
| `web` | Håndterer alle HTTP REST API-anmodninger |
| `socket` | Administrerer WebSocket-forbindelser til realtidsfunktioner |
| `timer15Min` | Planlagt hver 15. minut til e-mail-meddelelser |
| `timerMidnight` | Planlagt dagligt til e-mail-sammendrag og vedligeholdelse |

:::info
Lokalt kører `web`-funktionen på port 8084 og `socket`-funktionen på port 8087. Timer-funktionerne kan udløses manuelt under udvikling.
:::

## Relaterede artikler

- **[Database](./database)** -- Forbindelsesstrenke, skemascripter og dataadgangsmønstre
- **[Lokalt API Setup](./local-setup)** -- Komplet trin-for-trin opsætningsvejledning
- **[ApiHelper](../shared-libraries/api-helper)** -- Det delte bibliotek, der leverer `CustomBaseController` og auth middleware
