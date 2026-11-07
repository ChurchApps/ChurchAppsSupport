---
title: "Struktura modulu"
---

# Struktura modulu

<div class="article-intro">

Každý modul API se řídí jednotnou vnitřní strukturou s controllery, repozitáři, modely a pomocnými funkcemi. Když této struktuře rozumíte, snadno se v kódu zorientujete a můžete do libovolného modulu přidat novou funkcionalitu.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Nastavte API lokálně -- viz [Lokální nastavení API](./local-setup)
- Prostudujte si architekturu [databáze](./database), abyste pochopili vrstvu přístupu k datům

</div>

## Rozložení adresářů

Moduly se nacházejí v adresáři `src/modules/{name}/`. Typický modul obsahuje čtyři adresáře:

```
src/modules/{name}/
├── controllers/    ← Obslužné rutiny (koncové body Expressu)
├── repositories/   ← Vrstva přístupu k datům (typované SQL dotazy)
├── models/         ← TypeScript rozhraní a typy
└── helpers/        ← Obchodní logika specifická pro modul
```

Například modul membership:

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

Šest základních datových modulů -- membership, attendance, content, giving, messaging a doing -- sleduje toto rozložení. Několik specializovaných modulů (například reporting, který slouží pro reporty napříč moduly a sám žádná data nevlastní) se nachází vedle nich v adresáři `src/modules/`.

## Jedna aplikace, mnoho modulů

API je **modulární monolit**: moduly vymezují hranice organizace kódu a vlastnictví dat, nejsou to samostatné služby. Při startu se controllery všech modulů zaregistrují do jednoho kontejneru pro injekci závislostí za jednou aplikací Express, takže se celé API sestavuje, spouští a nasazuje jako jediná jednotka. Nasazené funkce popsané níže jsou všechny vstupní body do této jedné aplikace.

Všechny trasy každého modulu leží pod URL prefixem odpovídajícím názvu modulu:

```
/membership/*    /attendance/*    /content/*
/giving/*        /messaging/*     /doing/*
```

Díky tomu je API každého modulu soběstačné, zatímco klienti stále komunikují s jediným hostitelem.

## Controllery

Controllery definují trasy API pro modul. Každý modul má vlastní základní controller (například `MembershipBaseController`), který dědí ze sdíleného `BaseController` -- ten sám staví na `CustomBaseController` z `@churchapps/apihelper`. Trasy se registrují pomocí dekorátorů Inversify.

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

Metoda `actionWrapper` ověří požadavek a před spuštěním vaší akce naplní `this.repos` repozitáři daného modulu.

### Dekorátory tras

| Dekorátor | HTTP metoda |
|-----------|-------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

Dekorátor `@controller("/base")` nastavuje základní cestu pro všechny trasy v controlleru.

## Repozitáře

Repozitáře zajišťují veškeré operace s databází. ORM nepoužíváme -- dotazy se píšou pomocí query builderu Kysely, typovaného podle databázového schématu daného modulu. Soubor `db/index.ts` každého modulu vystavuje funkci `getDb()`, která vrací typovanou instanci Kysely daného modulu.

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

Uvnitř controlleru jsou repozitáře modulu dostupné jako `this.repos`. Mimo controllery je získáte přes `RepoManager`:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

## Komunikace mezi moduly

Každý modul vlastní svou databázi (viz [Databáze](./database)) a modul nikdy nedotazuje tabulky jiného modulu přímo. Když modul potřebuje data, která vlastní jiný modul -- například modul doing získává osoby z modulu membership -- jde to přes **bránu** (gateway) vlastnícího modulu v `src/shared/modules/`:

```typescript
import { getMembershipModuleGateway } from "../../../shared/modules/index.js";

const people = await getMembershipModuleGateway().loadPeople(churchId, personIds);
```

Každá brána (`MembershipModuleGateway`, `GivingModuleGateway` a tak dále) je rozhraní TypeScript, které přesně definuje, jaké operace vlastnící modul vystavuje zbytku API. Rozhraní je smlouvou: současné implementace čtou databázi vlastnícího modulu přímo v rámci procesu, ale protože volající závisí pouze na rozhraní, lze implementaci vyměnit -- například za takovou, která provádí HTTP volání -- kdyby byl některý modul někdy vyčleněn do samostatné služby.

:::info
Pokud data, která potřebujete, leží v jiném modulu a jeho brána pro ně neposkytuje operaci, rozšiřte rozhraní brány namísto toho, abyste sahali do repozitářů nebo databáze jiného modulu.
:::

## Autentizace a autorizace

### Autentizace JWT

Všechny požadavky se autentizují pomocí tokenů JWT, které zpracovává `CustomAuthProvider`. Token se automaticky ověří a kontext ověřeného uživatele (`au`) je k dispozici v každé akci controlleru.

### Kontroly oprávnění

Pomocí `au.checkAccess()` ověřte, že aktuální uživatel má požadované oprávnění. Oprávnění jsou předdefinované konstanty, které kombinují typ obsahu a akci:

```typescript
au.checkAccess(Permissions.people.view);    // Read access
au.checkAccess(Permissions.people.edit);    // Write access
```

Pokud uživatel požadované oprávnění nemá, automaticky se vrátí chybová odpověď.

:::warning
Před jakoukoli operací s daty vždy zavolejte `au.checkAccess()`. Kontrolu oprávnění nikdy nevynechávejte, ani u koncových bodů, které se zdají být pouze pro čtení.
:::

## Konfigurace prostředí

Třída `Environment` zajišťuje konfiguraci napříč prostředími:

- **Lokální vývoj:** Čte ze souboru `.env` v kořenovém adresáři projektu
- **Nasazená prostředí:** Čte z AWS SSM Parameter Store

```typescript
// Access environment variables
const jwtSecret = Environment.jwtSecret;
const corsOrigin = Environment.corsOrigin;
```

Díky této abstrakci váš kód nemusí vědět, odkud konfigurace pochází.

## Funkce Lambda

Při nasazení na AWS API běží jako šest funkcí Lambda:

| Funkce | Účel |
|--------|------|
| `web` | Zpracovává všechny požadavky HTTP REST API |
| `socket` | Spravuje připojení WebSocket pro funkce v reálném čase |
| `timer15Min` | Spouští se každých 30 minut kvůli e-mailovým oznámením (název je historický) |
| `timerMidnight` | Spouští se denně kvůli souhrnným e-mailům a údržbě |
| `timerScheduledTasks` | Spouští se denně kvůli splatným automatizacím a zpracování zpožděných pracovních postupů |
| `timerWebhooks` | Spouští se každou minutu kvůli doručování čekajících odchozích webhooků |

:::info
Lokálně funkce `web` běží na portu 8084 a funkce `socket` na portu 8087. Časovače je možné během vývoje spouštět ručně.
:::

## Související články

- **[Databáze](./database)** -- Připojovací řetězce, skripty schématu a vzory přístupu k datům
- **[Lokální nastavení API](./local-setup)** -- Kompletní podrobný průvodce nastavením
- **[ApiHelper](../shared-libraries/api-helper)** -- Sdílená knihovna, která poskytuje `CustomBaseController` a middleware pro autentizaci
