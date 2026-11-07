---
title: "Štruktúra modulov"
---

# Štruktúra modulov

<div class="article-intro">

Každý modul API má jednotnú vnútornú štruktúru s kontrolérmi, repozitármi, modelmi a pomocnými súbormi. Keď pochopíte toto rozloženie, ľahšie sa v kóde zorientujete a budete vedieť pridávať nové funkcie do ľubovoľného modulu.

</div>

<div class="prereqs">
<h4>Pred začatím</h4>

- Nastavte API lokálne – pozri [Lokálne nastavenie API](./local-setup)
- Prečítajte si architektúru [Databázy](./database), aby ste pochopili vrstvu prístupu k dátam

</div>

## Rozloženie adresárov

Moduly sa nachádzajú v `src/modules/{name}/`. Typický modul obsahuje štyri adresáre:

```
src/modules/{name}/
├── controllers/    ← Obslužné funkcie trás (koncové body Express)
├── repositories/   ← Vrstva prístupu k dátam (typované SQL dotazy)
├── models/         ← TypeScript rozhrania a typy
└── helpers/        ← Obchodná logika špecifická pre modul
```

Ako príklad uvádzame modul membership:

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

Šesť základných dátových modulov – membership, attendance, content, giving, messaging a doing – má rovnaké rozloženie. Niekoľko špecializovaných modulov (napríklad reporting, ktorý slúži na reporty naprieč modulmi a nevlastní žiadne vlastné dáta) je umiestnených vedľa nich v `src/modules/`.

## Jedna aplikácia, mnoho modulov

API je **modulárny monolit**: moduly vymedzujú hranice organizácie kódu a vlastníctva dát, nie samostatné služby. Pri spustení sa kontroléry každého modulu zaregistrujú do jedného kontajnera pre injekciu závislostí za jednou aplikáciou Express, takže celé API sa zostavuje, spúšťa a nasadzuje ako jeden celok. Nasadené funkcie opísané nižšie sú vstupné body do tej istej aplikácie.

Trasy každého modulu sa nachádzajú pod predponou URL zodpovedajúcou názvu modulu:

```
/membership/*    /attendance/*    /content/*
/giving/*        /messaging/*     /doing/*
```

Vďaka tomu je povrch API každého modulu samostatný, zatiaľ čo klienti komunikujú s jedným hostiteľom.

## Kontroléry

Kontroléry definujú trasy API pre modul. Každý modul má vlastný základný kontrolér (napríklad `MembershipBaseController`), ktorý dedí zo spoločného `BaseController` – ten je zase postavený na `CustomBaseController` z `@churchapps/apihelper`. Trasy sa registrujú pomocou dekorátorov Inversify.

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
      // au = kontext overeného používateľa
      if (!au.checkAccess(Permissions.people.view)) return this.json({}, 401);
      return this.repos.person.loadRecent(au.churchId);
    });
  }
}
```

Metóda `actionWrapper` overí požiadavku a pred spustením vašej akcie naplní `this.repos` repozitármi modulu.

### Dekorátory trás

| Dekorátor | Metóda HTTP |
|-----------|-------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

Dekorátor `@controller("/base")` nastavuje základnú cestu pre všetky trasy v kontroléri.

## Repozitáre

Repozitáre spracúvajú všetky operácie s databázou. Nepoužívame ORM – dotazy sa píšu pomocou staviteľa dotazov Kysely, typovaného podľa databázovej schémy modulu. Súbor `db/index.ts` každého modulu sprístupňuje funkciu `getDb()`, ktorá vracia typovanú inštanciu Kysely pre daný modul.

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

V kontroléri sú repozitáre modulu dostupné ako `this.repos`. Mimo kontrolérov ich získate cez `RepoManager`:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

## Komunikácia medzi modulmi

Každý modul vlastní vlastnú databázu (pozri [Databázu](./database)) a modul nikdy neposiela dotazy priamo do tabuliek iného modulu. Ak jeden modul potrebuje dáta, ktoré vlastní iný – napríklad modul doing potrebuje načítať osoby z modulu membership – obráti sa na **bránu** vlastniaceho modulu v `src/shared/modules/`:

```typescript
import { getMembershipModuleGateway } from "../../../shared/modules/index.js";

const people = await getMembershipModuleGateway().loadPeople(churchId, personIds);
```

Každá brána (`MembershipModuleGateway`, `GivingModuleGateway` a ďalšie) je rozhranie TypeScript, ktoré presne definuje, ktoré operácie vlastniaci modul sprístupňuje ostatným častiam API. Rozhranie je zmluva: aktuálne implementácie čítajú databázu vlastniaceho modulu v rámci toho istého procesu, ale keďže volajúci závisia iba od rozhrania, implementáciu by bolo možné nahradiť – napríklad implementáciou, ktorá volá HTTP – ak by sa niekedy modul vyčlenil do samostatnej služby.

:::info
Ak dáta, ktoré potrebujete, sa nachádzajú v inom module a jeho brána pre ne neposkytuje operáciu, rozšírte rozhranie brány namiesto toho, aby ste zasahovali do repozitárov alebo databázy iného modulu.
:::

## Autentifikácia a autorizácia

### Autentifikácia JWT

Všetky požiadavky sa overujú pomocou tokenov JWT, ktoré spracúva `CustomAuthProvider`. Token sa overuje automaticky a kontext overeného používateľa (`au`) je dostupný v každej akcii kontroléra.

### Kontroly oprávnení

Použite `au.checkAccess()` na overenie, či má aktuálny používateľ požadované oprávnenie. Oprávnenia sú vopred definované konštanty, ktoré kombinujú typ obsahu a akciu:

```typescript
au.checkAccess(Permissions.people.view);    // Prístup na čítanie
au.checkAccess(Permissions.people.edit);    // Prístup na zápis
```

Ak používateľ nemá požadované oprávnenie, automaticky sa vráti chybová odpoveď.

:::warning
Pred každou operáciou s dátami vždy zavolajte `au.checkAccess()`. Nikdy nepreskakujte kontroly oprávnení, a to ani pri koncových bodoch, ktoré sa zdajú byť len na čítanie.
:::

## Konfigurácia prostredia

Trieda `Environment` spravuje konfiguráciu pre jednotlivé prostredia:

- **Lokálny vývoj:** číta zo súboru `.env` v koreňovom adresári projektu
- **Nasadené prostredia:** číta z AWS SSM Parameter Store

```typescript
// Prístup k premenným prostredia
const jwtSecret = Environment.jwtSecret;
const corsOrigin = Environment.corsOrigin;
```

Táto abstrakcia znamená, že váš kód nemusí vedieť, odkiaľ konfigurácia pochádza.

## Funkcie Lambda

Po nasadení do AWS beží API ako šesť funkcií Lambda:

| Funkcia | Účel |
|----------|---------|
| `web` | Spracúva všetky požiadavky HTTP REST API |
| `socket` | Spravuje spojenia WebSocket pre funkcie v reálnom čase |
| `timer15Min` | Spúšťa sa každých 30 minút na odosielanie e-mailových upozornení (názov je historický) |
| `timerMidnight` | Spúšťa sa denne na odosielanie súhrnných e-mailov a údržbu |
| `timerScheduledTasks` | Spúšťa sa denne na splatné automatizácie a spracovanie zameškaných pracovných postupov |
| `timerWebhooks` | Spúšťa sa každú minútu na doručovanie čakajúcich odchádzajúcich webhookov |

:::info
Lokálne funkcia `web` beží na porte 8084 a funkcia `socket` na porte 8087. Funkcie časovačov je počas vývoja možné spustiť manuálne.
:::

## Súvisiace články

- **[Databáza](./database)** – Reťazce pripojenia, skripty schémy a vzory prístupu k dátam
- **[Lokálne nastavenie API](./local-setup)** – Kompletný podrobný návod na nastavenie
- **[ApiHelper](../shared-libraries/api-helper)** – Zdieľaná knižnica, ktorá poskytuje `CustomBaseController` a autentifikačný middleware
