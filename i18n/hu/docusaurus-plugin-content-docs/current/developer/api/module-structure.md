---
title: "Modul-struktúra"
description: "Ismerteti az API moduljainak felépítését: vezérlők, adattárak, átjárók, hitelesítési ellenőrzések és a hat Lambda-függvény, amelyek a kódot futtatják a B1 fejlesztői környezetekben."
---

# Modul-struktúra

<div class="article-intro">

Minden API-modul egységes belső felépítést követ, amely vezérlőkből, adattárakból, modellekből és segédfüggvényekből áll. Ennek a szerkezetnek az ismerete megkönnyíti a kódbázisban való navigálást és új funkciók hozzáadását bármelyik modulhoz.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Állítsa be helyileg az API-t – lásd: [Helyi API-beállítás](./local-setup.md)
- Tekintse át az [Adatbázis](./database.md) architektúráját, hogy megértse az adat-hozzáférési réteget

</div>

## Könyvtárstruktúra

A modulok a `src/modules/{name}/` könyvtár alatt helyezkednek el. Egy tipikus modul négy könyvtárat tartalmaz:

```
src/modules/{name}/
├── controllers/    ← Útvonalkezelők (Express-végpontok)
├── repositories/   ← Adat-hozzáférési réteg (típusos SQL-lekérdezések)
├── models/         ← TypeScript-interfészek és típusok
└── helpers/        ← Modulspecifikus üzleti logika
```

Példaként a membership modul:

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

A hat alapvető adatmodul – a membership, az attendance, a content, a giving, a messaging és a doing – mind ezt a felépítést követi. Néhány speciális modul (például a reporting, amely modulok közötti jelentéseket szolgál ki, és nem rendelkezik saját adatokkal) ezek mellett helyezkedik el a `src/modules/` alatt.

## Egy alkalmazás, sok modul

Az API egy **moduláris monolit**: a modulok a kódszervezés és az adatbirtoklás határait jelölik ki, nem különálló szolgáltatásokat. Indításkor minden modul vezérlői egyetlen függőséginjektálási konténerbe kerülnek be, amely egyetlen Express-alkalmazás mögött fut. Így az egész API egy egységként épül, fut és települ – a lent leírt, telepített függvények mind ugyanennek az alkalmazásnak a belépési pontjai.

Minden modul útvonalai a modul nevének megfelelő URL-előtag alatt érhetők el:

```
/membership/*    /attendance/*    /content/*
/giving/*        /messaging/*     /doing/*
```

Ez minden modul API-felületét önállóvá teszi, miközben az ügyfelek továbbra is egyetlen gazdagéphez kapcsolódnak.

## Vezérlők

A vezérlők határozzák meg a modul API-útvonalait. Minden modulnak van saját alap-vezérlője (például `MembershipBaseController`), amely a közös `BaseController`-ből származik – ez maga is a `@churchapps/apihelper` csomag `CustomBaseController`-jére épül. Az útvonalakat Inversify-dekorátorokkal regisztráljuk.

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
      // au = a hitelesített felhasználó kontextusa
      if (!au.checkAccess(Permissions.people.view)) return this.json({}, 401);
      return this.repos.person.loadRecent(au.churchId);
    });
  }
}
```

Az `actionWrapper` hitelesíti a kérést, és a műveletének futtatása előtt feltölti a `this.repos`-t a modul adattáraival.

### Útvonal-dekorátorok

| Dekorátor | HTTP-metódus |
|-----------|--------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

A `@controller("/base")` dekorátor állítja be a vezérlő összes útvonalának alap-elérési útját.

## Adattárak

Az adattárak kezelik az összes adatbázis-műveletet. Nincs ORM – a lekérdezéseket a Kysely lekérdezésépítővel írjuk, amely a modul adatbázis-sémájához típusos. Minden modul `db/index.ts` fájlja exportál egy `getDb()` függvényt, amely visszaadja a modul típusos Kysely-példányát.

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

A vezérlőkön belül a modul adattárai a `this.repos`-on keresztül érhetők el. A vezérlőkön kívül a `RepoManager`-en keresztül szerezhetők meg:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

## Modulok közötti kommunikáció

Minden modul a saját adatbázisával rendelkezik (lásd: [Adatbázis](./database.md)), és egyetlen modul sem kérdezi közvetlenül egy másik modul tábláit. Ha egy modulnak egy másik modul tulajdonában lévő adatra van szüksége – például a doing modulnak a membership-ből kell személyeket feloldania –, akkor az adott modul tulajdonosának **átjáróján** (gateway) keresztül teszi ezt, amely a `src/shared/modules/` könyvtárban található:

```typescript
import { getMembershipModuleGateway } from "../../../shared/modules/index.js";

const people = await getMembershipModuleGateway().loadPeople(churchId, personIds);
```

Minden átjáró (`MembershipModuleGateway`, `GivingModuleGateway` és így tovább) egy TypeScript-interfész, amely pontosan meghatározza, mely műveleteket teszi elérhetővé a tulajdonos modul a API többi részének. Az interfész a szerződés: a jelenlegi megvalósítások a tulajdonos modul adatbázisát a folyamaton belül olvassák, de mivel a hívók csak az interfésztől függenek, a megvalósítás lecserélhető – például olyanra, amely HTTP-hívásokat intéz –, ha egy modult valaha külön szolgáltatássá vonnának ki.

:::info
Ha a szükséges adat egy másik modulban található, és annak átjárója nem teszi elérhetővé a megfelelő műveletet, bővítse az átjáró interfészét, ahelyett hogy a másik modul adattáraihoz vagy adatbázisához nyúlna.
:::

## Hitelesítés és jogosultságkezelés

### JWT-hitelesítés

Minden kérés a `CustomAuthProvider` által kezelt JWT-tokenekkel hitelesített. A token automatikusan ellenőrződik, és a hitelesített felhasználó kontextusa (`au`) minden vezérlőművelethez rendelkezésre áll.

### Jogosultság-ellenőrzés

Az `au.checkAccess()` használatával ellenőrizheti, hogy az aktuális felhasználó rendelkezik-e a szükséges jogosultsággal. A jogosultságok előre definiált konstansok, amelyek egy tartalomtípust és egy műveletet kombinálnak:

```typescript
au.checkAccess(Permissions.people.view);    // Olvasási hozzáférés
au.checkAccess(Permissions.people.edit);    // Írási hozzáférés
```

Ha a felhasználónak nincs meg a szükséges jogosultsága, a rendszer automatikusan hibaválaszt küld vissza.

:::warning
Mindig hívja meg az `au.checkAccess()`-t, mielőtt adatműveletet végezne. Soha ne hagyja ki a jogosultság-ellenőrzést, még a látszólag csak olvasási végpontok esetén sem.
:::

## Környezeti konfiguráció

Az `Environment` osztály kezeli a konfigurációt a különböző környezetekben:

- **Helyi fejlesztés:** a projekt gyökérkönyvtárában lévő `.env` fájlból olvas
- **Telepített környezetek:** az AWS SSM Parameter Store-ból olvas

```typescript
// Környezeti változók elérése
const jwtSecret = Environment.jwtSecret;
const corsOrigin = Environment.corsOrigin;
```

Ez az absztrakció azt jelenti, hogy a kódjának nem kell tudnia, honnan származik a konfiguráció.

## Lambda-függvények

AWS-re telepítve az API hat Lambda-függvényként fut:

| Függvény | Feladat |
|----------|---------|
| `web` | Kezeli az összes HTTP REST API-kérést |
| `socket` | Valós idejű funkciókhoz tartozó WebSocket-kapcsolatokat kezel |
| `timer15Min` | 30 percenként ütemezve e-mail-értesítésekhez (a név történeti okokból maradt így) |
| `timerMidnight` | Naponta ütemezve összefoglaló e-mailekhez és karbantartáshoz |
| `timerScheduledTasks` | Naponta ütemezve esedékes automatizálásokhoz és lejárt munkafolyamatok feldolgozásához |
| `timerWebhooks` | Percenként ütemezve a sorba állított kimenő webhookok kézbesítéséhez |

:::info
Helyileg a `web` függvény a 8084-es porton, a `socket` függvény a 8087-es porton fut. Az időzítő-függvények fejlesztés közben kézzel is elindíthatók.
:::

## Kapcsolódó cikkek

- **[Adatbázis](./database.md)** – Kapcsolati karakterláncok, sémaszkriptek és adat-hozzáférési minták
- **[Helyi API-beállítás](./local-setup.md)** – Teljes, lépésenkénti beállítási útmutató
- **[ApiHelper](../shared-libraries/api-helper.md)** – A megosztott könyvtár, amely a `CustomBaseController`-t és az auth middleware-t biztosítja
