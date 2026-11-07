---
title: "Modulstruktur"
description: "Förklarar hur API:ets moduler är uppbyggda, med controllers, repositories, gateways, behörighetskontroller och de sex Lambda-funktionerna som kör koden i B1-utvecklingsmiljöer."
---

# Modulstruktur

<div class="article-intro">

Varje API-modul följer en enhetlig intern struktur med controllers, repositories, models och helpers. När du förstår den här uppbyggnaden blir det enklare att navigera i kodbasen och lägga till ny funktionalitet i valfri modul.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Installera API:et lokalt – se [Lokal API-installation](./local-setup.md)
- Läs igenom [databasarkitekturen](./database.md) för att förstå dataåtkomstlagret

</div>

## Katalogstruktur

Modulerna ligger under `src/modules/{name}/`. En typisk modul innehåller fyra kataloger:

```
src/modules/{name}/
├── controllers/    ← Route handlers (Express endpoints)
├── repositories/   ← Data access layer (typed SQL queries)
├── models/         ← TypeScript interfaces and types
└── helpers/        ← Module-specific business logic
```

Som exempel visas medlemsmodulen:

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

De sex centrala datamodulerna – membership, attendance, content, giving, messaging och doing – följer alla den här strukturen. Några specialiserade moduler, till exempel reporting, som levererar rapporter över flera moduler och inte äger någon egen data, ligger vid sidan av dem under `src/modules/`.

## En applikation, många moduler

API:et är en **modulär monolit**. Modulerna markerar gränser för kodorganisation och dataägande, inte separata tjänster. Vid start registreras alla modulers controllers i en enda dependency injection-container bakom en gemensam Express-applikation. Hela API:et byggs, körs och driftsätts därför som en enhet. De driftsatta funktionerna som beskrivs längre ned är alla ingångspunkter till samma applikation.

Varje moduls routes ligger under ett URL-prefix som motsvarar modulens namn:

```
/membership/*    /attendance/*    /content/*
/giving/*        /messaging/*     /doing/*
```

På så sätt är varje moduls API-yta självständig, samtidigt som klienterna fortfarande pratar med en enda värd.

## Controllers

Controllers definierar API:ets routes för en modul. Varje modul har en egen basecontroller (till exempel `MembershipBaseController`), som ärver från den delade `BaseController`. Den i sin tur bygger på `CustomBaseController` från `@churchapps/apihelper`. Routes registreras med Inversify-dekoratorer.

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

`actionWrapper` autentiserar anropet och fyller `this.repos` med modulens repositories innan din åtgärd körs.

### Route-dekoratorer

| Dekorator | HTTP-metod |
|-----------|-------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

Dekoratorn `@controller("/base")` anger bassökvägen för alla routes i controllern.

## Repositories

Repositories hanterar alla databasoperationer. Det finns ingen ORM. Frågor skrivs med Kysely-query builder och är typade mot modulens databasschema. Varje moduls `db/index.ts` exponerar en funktion `getDb()` som returnerar modulens typade Kysely-instans.

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

Inuti en controller finns modulens repositories tillgängliga som `this.repos`. Utanför controllers hämtar du dem via `RepoManager`:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

## Kommunikation mellan moduler

Varje modul äger sin egen databas (se [Databas](./database.md)). En modul frågar aldrig en annan moduls tabeller direkt. När en modul behöver data som ägs av en annan modul, till exempel när doing-modulen slår upp personer från membership, går den via den ägande modulens **gateway** i `src/shared/modules/`:

```typescript
import { getMembershipModuleGateway } from "../../../shared/modules/index.js";

const people = await getMembershipModuleGateway().loadPeople(churchId, personIds);
```

Varje gateway (`MembershipModuleGateway`, `GivingModuleGateway` och så vidare) är ett TypeScript-interface som anger exakt vilka operationer den ägande modulen exponerar för resten av API:et. Interfacet är kontraktet. De nuvarande implementationerna läser den ägande modulens databas i samma process. Eftersom anropare bara är beroende av interfacet skulle en implementation kunna bytas ut, till exempel mot en som gör HTTP-anrop, om en modul någon gång bröts ut till en egen tjänst.

:::info
Om data du behöver finns i en annan modul och gatewayen inte exponerar en operation för den, utöka gateway-interfacet i stället för att gå direkt till den andra modulens repositories eller databas.
:::

## Autentisering och behörighet

### JWT-autentisering

Alla anrop autentiseras med JWT-tokens som hanteras av `CustomAuthProvider`. Token valideras automatiskt, och den autentiserade användarkontexten (`au`) finns tillgänglig i varje controller-åtgärd.

### Behörighetskontroller

Använd `au.checkAccess()` för att kontrollera att den aktuella användaren har rätt behörighet. Behörigheter är fördefinierade konstanter som kombinerar en innehållstyp och en åtgärd:

```typescript
au.checkAccess(Permissions.people.view);    // Read access
au.checkAccess(Permissions.people.edit);    // Write access
```

Om användaren saknar den behörighet som krävs returneras ett felsvar automatiskt.

:::warning
Anropa alltid `au.checkAccess()` innan du utför några dataoperationer. Hoppa aldrig över behörighetskontroller, inte ens för till synes skrivskyddade endpoints.
:::

## Miljökonfiguration

Klassen `Environment` hanterar konfigurationen för de olika miljöerna:

- **Lokal utveckling:** Läser från `.env`-filen i projektets rot
- **Driftsatta miljöer:** Läser från AWS SSM Parameter Store

```typescript
// Access environment variables
const jwtSecret = Environment.jwtSecret;
const corsOrigin = Environment.corsOrigin;
```

Tack vare den här abstraktionen behöver din kod inte veta var konfigurationen kommer ifrån.

## Lambda-funktioner

När API:et driftsätts på AWS körs det som sex Lambda-funktioner:

| Funktion | Syfte |
|----------|---------|
| `web` | Hanterar alla HTTP REST API-anrop |
| `socket` | Hanterar WebSocket-anslutningar för realtidsfunktioner |
| `timer15Min` | Schemalagd var 30:e minut för e-postnotiser (namnet är historiskt) |
| `timerMidnight` | Schemalagd dagligen för sammanfattningsmejl och underhåll |
| `timerScheduledTasks` | Schemalagd dagligen för förfallna automationer och försenade arbetsflöden |
| `timerWebhooks` | Schemalagd varje minut för att skicka köade utgående webhooks |

:::info
Lokalt körs funktionen `web` på port 8084 och funktionen `socket` på port 8087. Timerfunktionerna kan startas manuellt under utveckling.
:::

## Relaterade artiklar

- **[Databas](./database.md)** – Anslutningssträngar, schemaskript och mönster för dataåtkomst
- **[Lokal API-installation](./local-setup.md)** – Fullständig steg-för-steg-guide för installation
- **[ApiHelper](../shared-libraries/api-helper.md)** – Det delade biblioteket som tillhandahåller `CustomBaseController` och autentiseringsmiddleware
