---
title: "Modulių struktūra"
description: "Kaip išdėstyti API modulius: valdikliai, saugyklos, šliuzai, autentifikacijos tikrinimai ir šešios Lambda funkcijos B1 kūrėjų aplinkose."
---

# Modulių struktūra

<div class="article-intro">

Kiekvienas API modulis seka nuoseklią vidinę struktūrą, kurią sudaro valdikliai, saugyklos, modeliai ir pagalbinės funkcijos. Supratus šį išdėstymą, lengva naršyti kodo bazę ir pridėti naujų funkcijų bet kuriam moduliui.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Paruoškite API vietiniam naudojimui — žr. [Vietinis API paruošimas](./local-setup.md)
- Peržiūrėkite [Duomenų bazės](./database.md) architektūrą, kad suprastumėte duomenų prieigos sluoksnį

</div>

## Katalogų išdėstymas

Moduliai yra `src/modules/{name}/` kataloge. Tipiniame modulyje yra keturi katalogai:

```
src/modules/{name}/
├── controllers/    ← Route handlers (Express endpoints)
├── repositories/   ← Data access layer (typed SQL queries)
├── models/         ← TypeScript interfaces and types
└── helpers/        ← Module-specific business logic
```

Pavyzdžiui, narystės modulis:

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

Šešiuose pagrindiniuose duomenų moduliuose — narystė (membership), lankomumas (attendance), turinys (content), aukos (giving), žinutės (messaging) ir veikla (doing) — naudojamas šis išdėstymas. Keli specializuoti moduliai (pavyzdžiui, ataskaitos (reporting), kurios teikia tarpmodulines ataskaitas ir neturi savo duomenų) yra šalia jų `src/modules/` kataloge.

## Viena programa, daug modulių

API yra **modulinis monolitas**: moduliai žymi kodo organizavimo ir duomenų nuosavybės ribas, o ne atskiras paslaugas. Paleidimo metu visi modulių valdikliai registruojami viename priklausomybių injekcijos konteineryje, veikiančiame vienoje Express programoje. Todėl visas API yra kuriamas, paleidžiamas ir diegiamas kaip vienas vienetas — toliau aprašytos diegtos funkcijos yra šios pačios programos įėjimo taškai.

Kiekvieno modulio maršrutai yra pagal modulio pavadinimą atitinkantį URL priešdėlį:

```
/membership/*    /attendance/*    /content/*
/giving/*        /messaging/*     /doing/*
```

Taip kiekvieno modulio API paviršius išlieka savarankiškas, o klientai vis tiek bendrauja su vienu serveriu.

## Valdikliai

Valdikliai apibrėžia modulio API maršrutus. Kiekvienas modulis turi savo bazinį valdiklį (pavyzdžiui, `MembershipBaseController`), kuris paveldi bendrą `BaseController` — pats sukurtą remiantis `CustomBaseController` iš `@churchapps/apihelper`. Maršrutai registruojami naudojant Inversify dekoratorius.

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

`actionWrapper` autentifikuoja užklausą ir prieš vykdant jūsų veiksmą užpildo `this.repos` modulio saugyklomis.

### Maršrutų dekoratoriai

| Dekoratorius | HTTP metodas |
|-----------|-------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

Dekoratorius `@controller("/base")` nustato bazinį kelią visiems valdiklio maršrutams.

## Saugyklos

Saugyklos atlieka visas duomenų bazės operacijas. ORM nenaudojamas — užklausos rašomos naudojant Kysely užklausų kūrėją, tipizuotą pagal modulio duomenų bazės schemą. Kiekvieno modulio `db/index.ts` eksportuoja funkciją `getDb()`, kuri grąžina tipizuotą modulio Kysely egzemplioriutą.

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

Valdiklio viduje modulio saugyklos pasiekiamos per `this.repos`. Už valdiklių ribų jas gaunate per `RepoManager`:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

## Komunikacija tarp modulių

Kiekvienas modulis valdo savo duomenų bazę (žr. [Duomenų bazė](./database.md)), ir modulis niekada tiesiogiai neužklausia kito modulio lentelių. Kai vienam moduliui reikia kito modulio valdomų duomenų — pavyzdžiui, veiklos modulis nustato žmones iš narystės modulio — jis kreipiasi per atitinkamo modulio **šliuzą** kataloge `src/shared/modules/`:

```typescript
import { getMembershipModuleGateway } from "../../../shared/modules/index.js";

const people = await getMembershipModuleGateway().loadPeople(churchId, personIds);
```

Kiekvienas šliuzas (`MembershipModuleGateway`, `GivingModuleGateway` ir kiti) yra TypeScript sąsaja, tiksliai apibrėžianti, kokias operacijas savininkas modulis atskleidžia likusiai API daliai. Sąsaja yra sutartis: dabartinės realizacijos nuskaito savininko modulio duomenų bazę tame pačiame procese, tačiau kadangi kviečiantieji priklauso tik nuo sąsajos, realizaciją būtų galima pakeisti — pavyzdžiui, į tokią, kuri vykdo HTTP užklausas — jei kada nors modulis būtų iškeltas į atskirą paslaugą.

:::info
Jei reikalingi duomenys yra kitame modulyje, o to modulio šliuzas jų operacijos neatskleidžia, išplėskite šliuzo sąsają, o ne kreipkitės į kito modulio saugyklas ar duomenų bazę.
:::

## Autentifikavimas ir autorizacija

### JWT autentifikavimas

Visos užklausos autentifikuojamos naudojant JWT žetonus, kuriuos apdoroja `CustomAuthProvider`. Žetonas tikrinamas automatiškai, o autentifikuoto vartotojo kontekstas (`au`) yra prieinamas kiekvienam valdiklio veiksmui.

### Leidimų tikrinimas

Naudokite `au.checkAccess()`, kad patikrintumėte, ar dabartinis vartotojas turi reikiamą leidimą. Leidimai yra iš anksto apibrėžtos konstantos, jungiančios turinio tipą ir veiksmą:

```typescript
au.checkAccess(Permissions.people.view);    // Read access
au.checkAccess(Permissions.people.edit);    // Write access
```

Jei vartotojas neturi reikiamo leidimo, automatiškai grąžinamas klaidos atsakymas.

:::warning
Visada iškvieskite `au.checkAccess()` prieš atlikdami bet kokias duomenų operacijas. Niekada nepraleiskite leidimų tikrinimo, net ir su galinčiais atrodyti tik skaitymo galiniais taškais.
:::

## Aplinkos konfigūracija

Klasė `Environment` tvarko konfigūraciją skirtingose aplinkose:

- **Vietinė kūrimo aplinka:** nuskaito iš `.env` failo projekto šakniniame kataloge
- **Diegtos aplinkos:** nuskaito iš AWS SSM Parameter Store

```typescript
// Access environment variables
const jwtSecret = Environment.jwtSecret;
const corsOrigin = Environment.corsOrigin;
```

Ši abstrakcija reiškia, kad jūsų kodui nereikia žinoti, iš kur ateina konfigūracija.

## Lambda funkcijos

Diegiant AWS, API veikia kaip šešios Lambda funkcijos:

| Funkcija | Paskirtis |
|----------|---------|
| `web` | Apdoroja visas HTTP REST API užklausas |
| `socket` | Valdo WebSocket ryšius realaus laiko funkcijoms |
| `timer15Min` | Suplanuota kas 30 minučių el. laiškų pranešimams (pavadinimas istorinis) |
| `timerMidnight` | Suplanuota kasdien skaitmeniniams laiškams ir priežiūrai |
| `timerScheduledTasks` | Suplanuota kasdien esamoms automatizacijoms ir pavėluotiems darbo eigos veiksmams apdoroti |
| `timerWebhooks` | Suplanuota kas minutę išsiųsti eilėje laukiančius išeinančius webhook'us |

:::info
Vietiniu režimu funkcija `web` veikia prievade 8084, o funkcija `socket` — prievade 8087. Laikmačio funkcijas kūrimo metu galima paleisti rankiniu būdu.
:::

## Susiję straipsniai

- **[Duomenų bazė](./database.md)** — Ryšio eilutės, schemos scenarijai ir duomenų prieigos modeliai
- **[Vietinis API paruošimas](./local-setup.md)** — Išsamus žingsnis po žingsnio paruošimo vadovas
- **[ApiHelper](../shared-libraries/api-helper.md)** — Bendra biblioteka, teikianti `CustomBaseController` ir autentifikavimo tarpinę programinę įrangą
