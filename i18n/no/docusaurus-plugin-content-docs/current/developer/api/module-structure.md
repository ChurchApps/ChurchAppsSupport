---
title: "Modulstruktur"
---

# Modulstruktur

<div class="article-intro">

Hver API-modul følger en konsistent intern struktur med kontrollere, repositorier, modeller og hjelpere. Å forstå dette oppsettet gjør det enkelt å navigere i kodebasen og legge til ny funksjonalitet i en hvilken som helst modul.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp API-et lokalt -- se [Lokalt API-oppsett](./local-setup)
- Gå gjennom [database](./database)-arkitekturen for å forstå datatilgangslaget

</div>

## Katalogoppsett

Moduler ligger under `src/modules/{name}/`. En typisk modul inneholder fire kataloger:

```
src/modules/{name}/
├── controllers/    ← Rutebehandlere (Express-endepunkter)
├── repositories/   ← Datatilgangslag (typede SQL-spørringer)
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

De seks kjernedatamodulene -- membership, attendance, content, giving, messaging og doing -- følger alle dette oppsettet. Noen få spesialiserte moduler (som reporting, som betjener rapporter på tvers av moduler og ikke eier noen data selv) ligger sammen med dem under `src/modules/`.

## Én applikasjon, mange moduler

API-et er en **modulær monolitt**: moduler markerer grenser for kodeorganisering og dataeierskap, ikke separate tjenester. Ved oppstart registreres hver moduls kontrollere i én enkelt dependency injection-beholder bak én Express-applikasjon, slik at hele API-et bygges, kjøres og distribueres som én enhet -- Lambda-funksjonene beskrevet nedenfor er alle inngangspunkter til den samme applikasjonen.

Hver moduls ruter ligger under et URL-prefiks som samsvarer med modulnavnet:

```
/membership/*    /attendance/*    /content/*
/giving/*        /messaging/*     /doing/*
```

Dette holder hver moduls API-overflate selvstendig, samtidig som klienter fortsatt snakker med én enkelt vert.

## Kontrollere

Kontrollere definerer API-rutene for en modul. Hver modul har sin egen basiskontroller (for eksempel `MembershipBaseController`), som utvider den delte `BaseController` -- som selv er bygget på `CustomBaseController` fra `@churchapps/apihelper`. Ruter registreres med Inversify-dekoratorer.

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

`actionWrapper` autentiserer forespørselen og fyller `this.repos` med modulens repositorier før den kjører handlingen din.

### Rutedekoratorer

| Dekorator | HTTP-metode |
|-----------|-------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

Dekoratoren `@controller("/base")` setter grunnstien for alle ruter i kontrolleren.

## Repositorier

Repositorier håndterer alle databaseoperasjoner. Det finnes ingen ORM -- spørringer skrives med spørringsbyggeren Kysely, typet mot modulens databaseskjema. Hver moduls `db/index.ts` eksponerer en `getDb()`-funksjon som returnerer modulens typede Kysely-instans.

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

Inne i en kontroller er modulens repositorier tilgjengelige som `this.repos`. Utenfor kontrollere kan du hente dem gjennom `RepoManager`:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

## Kommunikasjon på tvers av moduler

Hver modul eier sin egen database (se [Database](./database)), og en modul spør aldri direkte mot en annen moduls tabeller. Når én modul trenger data eid av en annen -- for eksempel når doing-modulen slår opp personer fra membership -- går den gjennom den eiende modulens **gateway** i `src/shared/modules/`:

```typescript
import { getMembershipModuleGateway } from "../../../shared/modules/index.js";

const people = await getMembershipModuleGateway().loadPeople(churchId, personIds);
```

Hver gateway (`MembershipModuleGateway`, `GivingModuleGateway`, og så videre) er et TypeScript-grensesnitt som definerer nøyaktig hvilke operasjoner den eiende modulen eksponerer for resten av API-et. Grensesnittet er kontrakten: de nåværende implementasjonene leser den eiende modulens database in-process, men fordi kallere bare avhenger av grensesnittet, kunne en implementasjon byttes ut -- for eksempel med én som gjør HTTP-kall -- hvis en modul noen gang ble skilt ut som en egen tjeneste.

:::info
Hvis dataene du trenger befinner seg i en annen modul, og modulens gateway ikke eksponerer en operasjon for det, utvid gateway-grensesnittet i stedet for å gå direkte inn i den andre modulens repositorier eller database.
:::

## Autentisering og autorisasjon

### JWT-autentisering

Alle forespørsler autentiseres via JWT-token håndtert av `CustomAuthProvider`. Tokenet valideres automatisk, og den autentiserte brukerkonteksten (`au`) er tilgjengelig i hver kontrollerhandling.

### Tillatelseskontroller

Bruk `au.checkAccess()` for å bekrefte at gjeldende bruker har den nødvendige tillatelsen. Tillatelser er forhåndsdefinerte konstanter som kombinerer en innholdstype og en handling:

```typescript
au.checkAccess(Permissions.people.view);    // Lesetilgang
au.checkAccess(Permissions.people.edit);    // Skrivetilgang
```

Hvis brukeren mangler den nødvendige tillatelsen, returneres et feilsvar automatisk.

:::warning
Kall alltid `au.checkAccess()` før du utfører noen dataoperasjoner. Hopp aldri over tillatelseskontroller, selv for tilsynelatende skrivebeskyttede endepunkter.
:::

## Miljøkonfigurasjon

`Environment`-klassen håndterer konfigurasjon på tvers av miljøer:

- **Lokal utvikling:** Leser fra `.env`-filen i prosjektroten
- **Distribuerte miljøer:** Leser fra AWS SSM Parameter Store

```typescript
// Access environment variables
const jwtSecret = Environment.jwtSecret;
const corsOrigin = Environment.corsOrigin;
```

Denne abstraksjonen betyr at koden din ikke trenger å vite hvor konfigurasjonen kommer fra.

## Lambda-funksjoner

Når det distribueres til AWS, kjører API-et som seks Lambda-funksjoner:

| Funksjon | Formål |
|----------|---------|
| `web` | Håndterer alle HTTP REST API-forespørsler |
| `socket` | Administrerer WebSocket-tilkoblinger for sanntidsfunksjoner |
| `timer15Min` | Planlagt hvert 30. minutt for e-postvarsler (navnet er historisk) |
| `timerMidnight` | Planlagt daglig for sammendrags-e-poster og vedlikehold |
| `timerScheduledTasks` | Planlagt daglig for forfalte automatiseringer og behandling av forsinkede arbeidsflyter |
| `timerWebhooks` | Planlagt hvert minutt for å levere utgående webhooks i kø |

:::info
Lokalt kjører `web`-funksjonen på port 8084, og `socket`-funksjonen kjører på port 8087. Timer-funksjonene kan utløses manuelt under utvikling.
:::

## Relaterte artikler

- **[Database](./database)** -- Tilkoblingsstrenger, skjemaskript og datatilgangsmønstre
- **[Lokalt API-oppsett](./local-setup)** -- Fullstendig trinnvis oppsettguide
- **[ApiHelper](../shared-libraries/api-helper)** -- Det delte biblioteket som tilbyr `CustomBaseController` og autentiseringsmellomvare
