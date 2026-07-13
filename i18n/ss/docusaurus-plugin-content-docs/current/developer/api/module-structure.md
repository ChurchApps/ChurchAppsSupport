---
title: "Umumo We-Module"
---

# Umumo We-Module

<div class="article-intro">

I-module ngayinye ye-API ilandzela umumo longekhatsi lohlala njalo ofaka ema-controller, ema-repository, ema-model, kanye netisiti tekusita. Kucondzisisa lokuhlelwa kwako kwenta kube lula kuhamba ku-codebase kanye nekwengeta imisebenti lemisha ku-module nome ngiyiphi.

</div>

<div class="prereqs">
<h4>Ngaphambi Kwekucala</h4>

- Hlela i-API endzaweni yakho -- buka [Local API Setup](./local-setup)
- Buyeketa umumo we-[Database](./database) kuze ucondzisise umcabango wekufinyelela idatha

</div>

## Umumo Wefolda

Ema-module ahlala ngaphansi kwe-`src/modules/{name}/`. I-module levamile ifaka emafolda lamane:

```
src/modules/{name}/
├── controllers/    ← Baphatsi bemikhondvo (ema-Express endpoint)
├── repositories/   ← Layela lekufinyelela idatha (imibuto ye-SQL lekhitiwe)
├── models/         ← Ema-interface ne-type e-TypeScript
└── helpers/        ← Umcabango webhizinisi lokhetsekile we-module
```

Sibonelo, i-module ye-membership:

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

Ema-module lasisekelo lasitfupha edatha -- membership, attendance, content, giving, messaging, ne-doing -- onkhe alandzela lomumo. Ema-module lambalwa lakhetsekile (njenge-reporting, lesebentisa emabhalo langaphandle kwe-module futsi ingenayo idatha yayo) ahlala eceleni kwawo ngaphansi kwe-`src/modules/`.

## I-App Yinye, Ema-Module Lamanyenti

I-API yi-**modular monolith**: ema-module akhomba imincele yekuhlelwa kwe-khodi kanye nebunikati bedatha, hhayi tinsita letihlukene. Ekucaleni, ema-controller wonkhe module abhaliswa ku-container yinye ye-dependency-injection ngemuva kwe-app yinye ye-Express, ngako yonkhe i-API iyakhiwa, isebenta, futsi ideployiwe njengeyunithi yinye -- ema-function ladeployiwe lachaziwe ngentasi onkhe angema-entry point kulena app yinye lefanako.

Yonkhe imikhondvo ye-module ihlala ngaphansi kwe-URL prefix lehambisana negama le-module:

```
/membership/*    /attendance/*    /content/*
/giving/*        /messaging/*     /doing/*
```

Loku kugcina i-API surface ye-module ngayinye izimele ngesikhatsi ema-client asakhuluma ne-host yinye.

## Ema-Controller

Ema-controller achaza imikhondvo ye-API ye-module. I-module ngayinye inayo i-base controller yayo (sibonelo `MembershipBaseController`), lesandisa i-`BaseController` lehlanganyelwako -- ngokwayo yakhelwe etulu kwe-`CustomBaseController` lesuka ku-`@churchapps/apihelper`. Imikhondvo ibhaliswa nge-decorator te-Inversify.

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
      // au = simo semsebentisi lotivakalisiwe
      if (!au.checkAccess(Permissions.people.view)) return this.json({}, 401);
      return this.repos.person.loadRecent(au.churchId);
    });
  }
}
```

I-`actionWrapper` iyativakalisa sicelo bese ihlanganisa i-`this.repos` neti-repository te-module ngaphambi kwekuchubeka nesento sakho.

### Ema-Decorator Emikhondvo

| Decorator | Indlela ye-HTTP |
|-----------|-------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

I-decorator ye-`@controller("/base")` ihlela indlela lesisekelo yayo yonkhe imikhondvo ku-controller.

## Ema-Repository

Ema-Repository aphatsa tonkhe tento te-database. Akukho ORM -- imibuto ibhalwa nge-Kysely query builder, ikhitiwe kuhambisana ne-schema ye-database ye-module. I-`db/index.ts` ye-module ngayinye ikhipha function le-`getDb()` lebuyisela i-instance ye-Kysely lekhitiwe ye-module.

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

Ngekhatsi kwe-controller, ema-repository e-module atfolakala njenge-`this.repos`. Ngaphandle kwema-controller, atfolwe nge-`RepoManager`:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

## Kukhulumisana Emkhatsini Wema-Module

I-module ngayinye inayo i-database yayo (buka [Database](./database)), futsi i-module ayikaze ibute emathebula eminye i-module ngco. Nangabe module linye lidzinga idatha lenikatiwe leminye -- sibonelo, i-module ye-doing isombulula bantfu kusuka ku-membership -- iyachubeka nge-**gateway** ye-module lenikatiwe ku-`src/shared/modules/`:

```typescript
import { getMembershipModuleGateway } from "../../../shared/modules/index.js";

const people = await getMembershipModuleGateway().loadPeople(churchId, personIds);
```

Yonkhe gateway (`MembershipModuleGateway`, `GivingModuleGateway`, njll.) yi-interface ye-TypeScript lechaza ngalokucacile kutsi ngutiphi tento i-module lenikatiwe iyakhipha kuletinye te-API. I-interface yisivumelwano: ema-implementation ekwamanjena afundza database ye-module lenikatiwe ngekhatsi kwenchubo, kepha njengobe labatsatsi bencika kuphela ku-interface, implementation ingashintjwa -- sibonelo, kuye leyenta ticelo te-HTTP -- nangabe module lingakhishwa kuya kuba insita lehlukene.

:::info
Nangabe idatha loyidzingako ihlala kuleminye i-module futsi i-gateway yayo ayikhiphi sento sayo, andzisa i-interface ye-gateway kunekungena etibhaleni nobe database yaleminye i-module.
:::

## Kutivakalisa Nekuvunyelwa

### Kutivakalisa nge-JWT

Tonkhe ticelo tiyativakaliswa nge-token te-JWT letiphatswa yi-`CustomAuthProvider`. I-token iyahlolwa ngekutentekela futsi simo semsebentisi lotivakalisiwe (`au`) siyatfolakala kuwo wonkhe umsebenti we-controller.

### Kuhlola Timvumo

Sebentisa i-`au.checkAccess()` kucinisekisa kutsi umsebentisi wanyalo unemvumo ledzingekako. Timvumo tichazwe ngaphambilini njengema-constant lahlanganisa luhlobo lwekucuketfwe kanye nesento.

```typescript
au.checkAccess(Permissions.people.view);    // Kufinyelela kwekufundza
au.checkAccess(Permissions.people.edit);    // Kufinyelela kwekubhala
```

Nangabe umsebentisi angenayo imvumo ledzingekako, imphendvulo yeliphutsa iyabuyiselwa ngekutentekela.

:::warning
Njalo shaya i-`au.checkAccess()` ngaphambi kwekwenta nome ngusiphi sento sedatha. Ungakaze weke kuhlola imvumo, ngisho nakuma-endpoint lakhangeka kungathi ekufundza kuphela.
:::

## Kuhlela Simo Se-Environment

Class le-`Environment` iphatsa kuhlela kuwo wonkhe simo:

- **Kutfutfuka endzaweni:** Ifundza kusuka kufayela le-`.env` ku-root yeprojekthi
- **Simo lesideployiwe:** Ifundza kusuka ku-AWS SSM Parameter Store

```typescript
// Finyelela ema-environment variable
const jwtSecret = Environment.jwtSecret;
const corsOrigin = Environment.corsOrigin;
```

Loku kwabstract kusho kutsi khodi yakho ayidzingi kwati kutsi kuhlelwa lokutsite kuvela kuphi.

## Ema-Function e-Lambda

Nawudeployiwe ku-AWS, i-API isebenta njengema-function lasi-6 e-Lambda:

| Function | Injongo |
|----------|---------|
| `web` | Iphatsa tonkhe ticelo te-HTTP REST API |
| `socket` | Iphatsa kuxhumana kwe-WebSocket kuletintfo tesikhatsi lesiphila |
| `timer15Min` | Ihlelwe njalo ngemizuzu langu-30 kutatiso te-imeyili (ligama ngelemlandvo) |
| `timerMidnight` | Ihlelwe langa nga langa kuma-digest emeyili nekugcinwa |
| `timerScheduledTasks` | Ihlelwe langa nga langa kuma-automation lasadzingeka kanye nekuchubekisa i-workflow lesendlulile sikhatsi |
| `timerWebhooks` | Ihlelwe njalo ngemzuzu kuletfula ema-webhook laphumako lasesetja |

:::info
Endzaweni yakho, function ye-`web` isebenta ku-port 8084 kanti function ye-`socket` isebenta ku-port 8087. Ema-function e-timer angahlanjwa ngesandla ngesikhatsi sekutfutfuka.
:::

## Emahlandla Lahlobene

- **[Database](./database)** -- Emastringi ekuxhumana, ema-script e-schema, kanye netindlela tekufinyelela idatha
- **[Local API Setup](./local-setup)** -- Umhlahlandlela logcwele wesinyatselo ngesinyatselo
- **[ApiHelper](../shared-libraries/api-helper)** -- Liphakheji lelihlanganyelwako leliniketa i-`CustomBaseController` kanye ne-auth middleware
