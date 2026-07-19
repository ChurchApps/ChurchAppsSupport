---
title: "Modulstruktur"
---

# Modulstruktur

<div class="article-intro">

Hver API-modul følger en konsistent intern struktur med kontrollere, repositorier, modeller og hjelpere. Å forstå dette oppsettet gjør det enkelt å navigere kodebasis og legge til ny funksjonalitet i enhver modul.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp API lokalt -- se [Lokalt API-oppsett](./local-setup)
- Gjennomgå [Database](./database)-arkitekturen for å forstå dataaccesslaget

</div>

## Kataloglayout

Moduler bor under `src/modules/{name}/`. En typisk modul inneholder fire kataloger:

```
src/modules/{name}/
├── controllers/    ← Rutehåndtere (Express-endepunkter)
├── repositories/   ← Dataaccesslag (typifiserte SQL-spørringer)
├── models/         ← TypeScript-grensesnitt og typer
└── helpers/        ← Modulspesifikk forretningslogikk
```

For eksempel medlemskapsmodulen:

```
src/modules/membership/
├── controllers/
│   ├── PersonController.ts
│   ├── GroupController.ts
│   └── ...
├── repositories/
│   ├── PersonRepo.ts
│   ├── GroupRepo.ts
│   └── ...
├── models/
│   ├── Person.ts
│   ├── Group.ts
│   └── ...
└── helpers/
    └── ...
```

De seks kjernedatamodulene -- medlemskap, oppmøte, innhold, giver, meldinger og gjøremål -- følger alle denne oppsettet. Noen få spesialiserte moduler (som rapportering, som betjener rapporter på tvers av moduler og eier ingen data selv) sitter sammen med dem under `src/modules/`.

## En applikasjon, mange moduler

API-en er en **modulær monolitt**: moduler markerer grenser for kodeorganisering og dataeierskap, ikke separate tjenester. Ved oppstart registreres hver moduls kontrollere i en enkelt avhengighetsinjeksjonsbeholder bak en enkelt Express-applikasjon, så hele API-en bygges, kjøres og distribueres som en enhet -- de distribuerte funksjonene som er beskrevet nedenfor er alle inngangspunkter til denne samme applikasjonen.

Hver moduls ruter bor under et URL-prefiks som samsvarer med modulnavnet:

```
/membership/*    /attendance/*    /content/*
/giving/*        /messaging/*     /doing/*
```

Dette holder hver moduls API-overflate selvstendig mens klienter fortsatt snakker med en enkelt vert.

## Kontrollere

Kontrollere definerer API-rutene for en modul. Hver modul har sin egen basiskontoller (for eksempel `MembershipBaseController`), som utvider den delte `BaseController` -- selv bygget på `CustomBaseController` fra `@churchapps/apihelper`. Ruter registreres med Inversify-dekoratører.

```typescript
import express from "express";
import { controller, httpGet } from "inversify-express-utils";
import { MembershipBaseController } from "./MembershipBaseController.js";
import { Permissions } from "../helpers/index.js";

@controller("/membership/people")
export class PersonController extends MembershipBaseController {

  @httpGet("/recent")
  public async getRecent(req: express.Request, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      // au = authenticated user context
      if (!au.checkAccess(Permissions.people.view)) return this.json({}, 401);
      return this.repos.person.loadRecent(au.churchId);
    });
  }
}
```

`actionWrapper` autentiserer forespørselen og hydrerer `this.repos` med modulens repositorier før handling kjøres.

### Rutedekratører

| Dekoratør | HTTP-metode |
|-----------|-------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

`@controller("/base")`-dekoratøren setter grunnstien for alle ruter i kontrolleren.

## Repositorier

Repositorier håndterer alle databaseoperasjoner. Det er ingen ORM -- spørringer skrives med Kysely-spørringsbyggeren, typifisert mot modulens databaseskjema. Hver moduls `db/index.ts` eksponerer en `getDb()`-funksjon som returnerer modulens typifiserte Kysely-instans.

```typescript
import { injectable } from "inversify";
import { getDb } from "../db/index.js";

@injectable()
export class PersonRepo {
  public async load(churchId: string, id: string) {
    return getDb().selectFrom("people").selectAll()
      .where("id", "=", id)
      .where("churchId", "=", churchId)
      .executeTakeFirst();
  }
}
```

Inne i en kontoller, er modulens repositorier tilgjengelig som `this.repos`. Utenfor kontrollere, hent dem gjennom `RepoManager`:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

## Kommunikasjon på tvers av moduler

Hver modul eier sin egen database (se [Database](./database)), og en modul spør aldri direkte andre moduls tabeller. Når en modul trenger data eid av en annen -- for eksempel gjøremålmodulen som løser personer fra medlemskap -- den går gjennom eiermodulens **gateway** i `src/shared/modules/`:

```typescript
import { getMembershipModuleGateway } from "../../../shared/modules/index.js";

const people = await getMembershipModuleGateway().loadPeople(churchId, personIds);
```

Hver gateway (`MembershipModuleGateway`, `GivingModuleGateway`, og så videre) er et TypeScript-grensesnitt som definerer nøyaktig hvilke operasjoner eiermodulen eksponerer for resten av API-en. Grensesnittet er kontrakten: de nåværende implementeringene leser eiermodulens database in-process, men fordi oppringere bare avhenger av grensesnittet, kunne en implementering byttes ut -- for eksempel for en som gjør HTTP-anrop -- hvis en modul noen gang ble ekstrahert til en egen tjeneste.

:::info
Hvis dataene du trenger bor i en annen modul og dens gateway ikke eksponerer en operasjon for det, utvid gateway-grensesnittet i stedet for å nå inn i andre moduls repositorier eller database.
:::

## Autentisering og autorisering

### JWT-autentisering

Alle forespørsler autentiseres via JWT-tokens håndtert av `CustomAuthProvider`. Tokenet valideres automatisk og den autentiserte brukersammenhengen (`au`) er tilgjengelig i hver kontroller-handling.

### Tillatelseskontroller

Bruk `au.checkAccess()` for å verifisere at gjeldende bruker har den nødvendige tillatelsen. Tillatelser er forhåndsdefinerte konstanter som kombinerer en innholdstype og en handling:

```typescript
au.checkAccess(Permissions.people.view);    // Lesetilgang
au.checkAccess(Permissions.people.edit);    // Skrivetilgang
```

Hvis brukeren mangler den nødvendige tillatelsen, returneres automatisk et feilsvar.

:::warning
Kall alltid `au.checkAccess()` før du utfører noen dataoperasjoner. Hopp aldri over tillatelskontroller, selv for tilsynelatende skrivebeskyttede endepunkter.
:::

## Miljøkonfigurering

`Environment`-klassen håndterer konfigurering på tvers av miljøer:

- **Lokal utvikling:** Leser fra `.env`-filen i prosjektroten
- **Distribuerte miljøer:** Leser fra AWS SSM Parameter Store

```typescript
// Tilgangsmiljøvariabler
const jwtSecret = Environment.jwtSecret;
const corsOrigin = Environment.corsOrigin;
```

Denne abstraksjonen betyr at koden din ikke trenger å vite hvor konfigurasjonen kommer fra.

## Lambda-funksjoner

Når de distribueres til AWS, kjører API-en som seks Lambda-funksjoner:

| Funksjon | Formål |
|----------|---------|
| `web` | Håndterer alle HTTP REST API-forespørsler |
| `socket` | Administrerer WebSocket-forbindelser for sanntidsfunksjoner |
| `timer15Min` | Planlagt hvert 30. minutt for e-postvarslinger (navnet er historisk) |
| `timerMidnight` | Planlagt daglig for digesteposte og vedlikehold |
| `timerScheduledTasks` | Planlagt daglig for forfallte automatiseringer og overdue arbeitsflytbehandling |
| `timerWebhooks` | Planlagt hvert minutt for å levere køede utgående webhooks |

:::info
Lokalt kjører `web`-funksjonen på port 8084 og `socket`-funksjonen kjører på port 8087. Timer-funksjonene kan utløses manuelt under utvikling.
:::

## Relaterte artikler

- **[Database](./database)** -- Tilkoblingstrenger, schemaskript og dataaccessmønstre
- **[Lokalt API-oppsett](./local-setup)** -- Fullstendig trinn-for-trinn-oppsettguide
- **[ApiHelper](../shared-libraries/api-helper)** -- Det delte biblioteket som tilbyr `CustomBaseController` og auth-middleware
