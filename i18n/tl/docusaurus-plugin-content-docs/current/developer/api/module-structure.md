---
title: "Istraktura ng Module"
---

# Istraktura ng Module

<div class="article-intro">

Ang bawat API module ay sumusunod sa isang pare-parehong panloob na istraktura na may mga controller, repository, modelo, at helper. Ang pag-unawa sa layout na ito ay nagpapadali sa pag-navigate sa codebase at pagdagdag ng bagong functionality sa anumang module.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-setup ang API nang lokal -- tingnan ang [Lokal na Pag-setup ng API](./local-setup)
- Suriin ang arkitektura ng [Database](./database) upang maunawaan ang layer ng pag-access ng data

</div>

## Layout ng Direktoryo

Ang bawat module ay nabubuhay sa ilalim ng `src/modules/{name}/` at naglalaman ng apat na direktoryo:

```
src/modules/{name}/
├── controllers/    ← Mga route handler (mga Express endpoint)
├── repositories/   ← Layer ng pag-access ng data (direktang SQL)
├── models/         ← Mga TypeScript interface at uri
└── helpers/        ← Business logic na partikular sa module
```

Halimbawa, ang membership module:

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

## Mga Controller

Tinutukoy ng mga controller ang mga API route para sa isang module. Nag-eextend sila ng `CustomBaseController` mula sa `@churchapps/apihelper` at gumagamit ng mga Inversify decorator para sa pagpaparehistro ng ruta.

```typescript
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { CustomBaseController } from "@churchapps/apihelper";

@controller("/people")
export class PersonController extends CustomBaseController {

  @httpGet("/")
  public async loadAll() {
    return this.actionWrapper(async (au) => {
      // au = konteksto ng naka-authenticate na gumagamit
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
      // ... lohika ng pag-save
    });
  }
}
```

### Mga Route Decorator

| Decorator | HTTP Method |
|-----------|-------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

Ang `@controller("/base")` decorator ay nagtatakda ng base path para sa lahat ng ruta sa controller.

## Mga Repository

Hina-handle ng mga repository ang lahat ng operasyon sa database gamit ang direktang SQL sa pamamagitan ng `DB.query()`. Walang ORM -- direkta kang nagsusulat ng SQL.

```typescript
export class PersonRepository {
  public async loadByChurchId(churchId: string) {
    return DB.query("SELECT * FROM people WHERE churchId=?", [churchId]);
  }

  public async save(person: Person) {
    // INSERT o UPDATE lohika
  }
}
```

I-access ang mga repository sa pamamagitan ng `RepositoryManager`:

```typescript
const repos = RepositoryManager.getRepositories<MembershipRepositories>("membership");
const people = await repos.person.loadByChurchId(churchId);
```

## Authentication at Awtorisasyon

### JWT Authentication

Lahat ng kahilingan ay naka-authenticate sa pamamagitan ng mga JWT token na hina-handle ng `CustomAuthProvider`. Awtomatikong vina-validate ang token at ang konteksto ng naka-authenticate na gumagamit (`au`) ay magagamit sa bawat aksyon ng controller.

### Mga Pagsusuri ng Pahintulot

Gamitin ang `au.checkAccess()` upang i-verify na ang kasalukuyang gumagamit ay may kinakailangang pahintulot:

```typescript
au.checkAccess("People", "View");    // Access sa pagbabasa
au.checkAccess("People", "Edit");    // Access sa pagsusulat
```

Kung ang gumagamit ay walang kinakailangang pahintulot, awtomatikong ibinabalik ang isang tugon na error.

:::warning
Palaging tawagan ang `au.checkAccess()` bago magsagawa ng anumang mga operasyon sa data. Huwag kailanman laktawan ang mga pagsusuri ng pahintulot, kahit para sa mga endpoint na tila read-only lang.
:::

## Configuration ng Kapaligiran

Hina-handle ng `Environment` class ang configuration sa iba't ibang kapaligiran:

- **Lokal na development:** Nagbabasa mula sa `.env` file sa root ng proyekto
- **Mga na-deploy na kapaligiran:** Nagbabasa mula sa AWS SSM Parameter Store

```typescript
// I-access ang mga variable ng kapaligiran
const dbConnection = Environment.membershipDb;
const jwtSecret = Environment.jwtSecret;
```

Ang abstraction na ito ay nangangahulugang hindi kailangang malaman ng iyong code kung saan nanggagaling ang configuration.

## Mga Lambda Function

Kapag na-deploy sa AWS, ang API ay tumatakbo bilang apat na Lambda function:

| Function | Layunin |
|----------|---------|
| `web` | Hina-handle ang lahat ng HTTP REST API request |
| `socket` | Pinapamahalaan ang mga koneksyon ng WebSocket para sa mga real-time na tampok |
| `timer15Min` | Naka-schedule tuwing 15 minuto para sa mga abiso sa email |
| `timerMidnight` | Naka-schedule araw-araw para sa mga digest email at maintenance |

:::info
Sa lokal, ang `web` function ay tumatakbo sa port 8084 at ang `socket` function ay tumatakbo sa port 8087. Ang mga timer function ay maaaring ma-trigger nang mano-mano sa panahon ng development.
:::

## Mga Kaugnay na Artikulo

- **[Database](./database)** -- Mga connection string, script ng schema, at mga pattern ng pag-access ng data
- **[Lokal na Pag-setup ng API](./local-setup)** -- Kumpletong gabay sa pag-setup nang sunud-sunod
- **[ApiHelper](../shared-libraries/api-helper)** -- Ang shared library na nagbibigay ng `CustomBaseController` at auth middleware
