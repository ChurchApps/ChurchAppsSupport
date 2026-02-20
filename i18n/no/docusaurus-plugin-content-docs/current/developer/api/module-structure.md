---
title: "Modulstruktur"
---

# Modulstruktur

<div class="article-intro">

Hver API-modul følger en konsistent intern struktur med kontrollere, repositories, modeller og hjelpere. Å forstå denne oppbyggingen gjør det enkelt å navigere i kodebasen og legge til ny funksjonalitet i enhver modul.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp API-et lokalt -- se [Lokalt API-oppsett](./local-setup)
- Gjennomgå [Database](./database)-arkitekturen for å forstå datatilgangslaget

</div>

## Katalogoppsett

Hver modul ligger under `src/modules/{navn}/` og inneholder fire kataloger:

```
src/modules/{navn}/
├── controllers/    ← Rutehåndterere (Express-endepunkter)
├── repositories/   ← Datatilgangslag (direkte SQL)
├── models/         ← TypeScript-grensesnitt og typer
└── helpers/        ← Modulspesifikk forretningslogikk
```

For eksempel membership-modulen:

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

## Kontrollere

Kontrollere definerer API-rutene for en modul. De utvider `CustomBaseController` fra `@churchapps/apihelper` og bruker Inversify-dekoratører for ruteregistrering.

```typescript
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { CustomBaseController } from "@churchapps/apihelper";

@controller("/people")
export class PersonController extends CustomBaseController {

  @httpGet("/")
  public async loadAll() {
    return this.actionWrapper(async (au) => {
      // au = autentisert brukerkontekst
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
      // ... lagringslogikk
    });
  }
}
```

### Rutedekoratører

| Dekoratør | HTTP-metode |
|-----------|-------------|
| `@httpGet("/sti")` | GET |
| `@httpPost("/sti")` | POST |
| `@httpPut("/sti")` | PUT |
| `@httpPatch("/sti")` | PATCH |
| `@httpDelete("/sti")` | DELETE |

`@controller("/base")`-dekoratøren setter basestien for alle ruter i kontrolleren.

## Repositories

Repositories håndterer alle databaseoperasjoner ved hjelp av direkte SQL via `DB.query()`. Det er ingen ORM -- du skriver SQL direkte.

```typescript
export class PersonRepository {
  public async loadByChurchId(churchId: string) {
    return DB.query("SELECT * FROM people WHERE churchId=?", [churchId]);
  }

  public async save(person: Person) {
    // INSERT- eller UPDATE-logikk
  }
}
```

Få tilgang til repositories gjennom `RepositoryManager`:

```typescript
const repos = RepositoryManager.getRepositories<MembershipRepositories>("membership");
const people = await repos.person.loadByChurchId(churchId);
```

## Autentisering og autorisasjon

### JWT-autentisering

Alle forespørsler autentiseres via JWT-tokens håndtert av `CustomAuthProvider`. Tokenet valideres automatisk, og den autentiserte brukerkonteksten (`au`) er tilgjengelig i hver kontrollerhandling.

### Tillatelseskontroller

Bruk `au.checkAccess()` for å verifisere at gjeldende bruker har den nødvendige tillatelsen:

```typescript
au.checkAccess("People", "View");    // Lesetilgang
au.checkAccess("People", "Edit");    // Skrivetilgang
```

Hvis brukeren mangler den nødvendige tillatelsen, returneres en feilrespons automatisk.

:::warning
Kall alltid `au.checkAccess()` før du utfører dataoperasjoner. Hopp aldri over tillatelseskontroller, selv for tilsynelatende skrivebeskyttede endepunkter.
:::

## Miljøkonfigurasjon

`Environment`-klassen håndterer konfigurasjon på tvers av miljøer:

- **Lokal utvikling:** Leser fra `.env`-filen i prosjektets rotkatalog
- **Distribuerte miljøer:** Leser fra AWS SSM Parameter Store

```typescript
// Tilgang til miljøvariabler
const dbConnection = Environment.membershipDb;
const jwtSecret = Environment.jwtSecret;
```

Denne abstraksjonen betyr at koden din ikke trenger å vite hvor konfigurasjonen kommer fra.

## Lambda-funksjoner

Når API-et distribueres til AWS, kjører det som fire Lambda-funksjoner:

| Funksjon | Formål |
|----------|--------|
| `web` | Håndterer alle HTTP REST API-forespørsler |
| `socket` | Administrerer WebSocket-tilkoblinger for sanntidsfunksjoner |
| `timer15Min` | Planlagt hvert 15. minutt for e-postvarsler |
| `timerMidnight` | Planlagt daglig for oppsummeringse-poster og vedlikehold |

:::info
Lokalt kjører `web`-funksjonen på port 8084 og `socket`-funksjonen på port 8087. Timerfunksjonene kan utløses manuelt under utvikling.
:::

## Relaterte artikler

- **[Database](./database)** -- Tilkoblingsstrenger, skjemaskript og datatilgangsmønstre
- **[Lokalt API-oppsett](./local-setup)** -- Fullstendig trinnvis oppsettsguide
- **[ApiHelper](../shared-libraries/api-helper)** -- Det delte biblioteket som tilbyr `CustomBaseController` og autentiseringsmellomvare
