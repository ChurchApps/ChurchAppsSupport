---
title: "Структура модула"
description: "Објашњава распоред модула API-ја: контролере, репозиторијуме, пролазе, провере аутентификације и шест Lambda функција у B1 окружењима."
---

# Структура модула

<div class="article-intro">

Сваки API модул прати доследну унутрашњу структуру са контролерима, репозиторијумима, моделима и помоћним функцијама. Разумевање овог распореда олакшава сналажење у кодној бази и додавање нове функционалности у било који модул.

</div>

<div class="prereqs">
<h4>Пре почетка</h4>

- Подесите API локално -- погледајте [Локално подешавање API-ја](./local-setup.md)
- Прегледајте архитектуру [базе података](./database.md) да бисте разумели слој за приступ подацима

</div>

## Распоред директоријума

Модули се налазе под `src/modules/{name}/`. Типичан модул садржи четири директоријума:

```
src/modules/{name}/
├── controllers/    ← Route handlers (Express endpoints)
├── repositories/   ← Data access layer (typed SQL queries)
├── models/         ← TypeScript interfaces and types
└── helpers/        ← Module-specific business logic
```

На пример, модул membership:

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

Шест основних модула за податке -- membership, attendance, content, giving, messaging и doing -- прате овај распоред. Неколико специјализованих модула (као што је reporting, који обрађује извештаје преко више модула и сам не поседује податке) налази се поред њих у `src/modules/`.

## Једна апликација, много модула

API је **модуларни монолит**: модули означавају границе организације кода и власништва над подацима, а не посебне сервисе. При покретању, контролери сваког модула се региструју у јединствени контејнер за ињекцију зависности иза једне Express апликације, тако да се цео API гради, покреће и поставља као јединствена целина -- функције које се постављају, описане у наставку, све су улазне тачке у ову исту апликацију.

Руте сваког модула налазе се под URL префиксом који одговара називу модула:

```
/membership/*    /attendance/*    /content/*
/giving/*        /messaging/*     /doing/*
```

Тако API површина сваког модула остаје самостална, док клијенти и даље комуницирају са једним хостом.

## Контролери

Контролери дефинишу API руте за модул. Сваки модул има сопствени базни контролер (на пример `MembershipBaseController`), који наслеђује заједнички `BaseController` -- који је сам изграђен на основу `CustomBaseController` из `@churchapps/apihelper`. Руте се региструју помоћу Inversify декоратора.

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

`actionWrapper` аутентификује захтев и попуњава `this.repos` репозиторијумима модула пре извршавања ваше акције.

### Декоратори руте

| Декоратор | HTTP метода |
|-----------|-------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

Декоратор `@controller("/base")` поставља базну путању за све руте у контролеру.

## Репозиторијуми

Репозиторијуми обрађују све операције над базом података. ORM није коришћен -- упити се пишу помоћу Kysely query builder-а, типизованог према шеми базе података модула. Фајл `db/index.ts` сваког модула излаже функцију `getDb()` која враћа типизовану Kysely инстанцу модула.

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

Унутар контролера, репозиторијумима модула се приступа преко `this.repos`. Ван контролера, добијте их преко `RepoManager`:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

## Комуникација између модула

Сваки модул поседује сопствену базу података (погледајте [База података](./database.md)), и модул никада директно не упућује упите на табеле другог модула. Када један модул треба податке које поседује други -- на пример, модул doing преузима особе из membership-а -- то чини преко **gateway**-а власничког модула у `src/shared/modules/`:

```typescript
import { getMembershipModuleGateway } from "../../../shared/modules/index.js";

const people = await getMembershipModuleGateway().loadPeople(churchId, personIds);
```

Сваки gateway (`MembershipModuleGateway`, `GivingModuleGateway` и тако даље) је TypeScript интерфејс који тачно дефинише које операције власнички модул излаже осталом делу API-ја. Интерфејс је уговор: тренутне имплементације читају базу података власничког модула у самом процесу, али пошто позиваоци зависе само од интерфејса, имплементација би могла бити замењена -- на пример, оном која шаље HTTP захтеве -- ако би модул икада био издвојен у посебан сервис.

:::info
Ако се подаци које су вам потребни налазе у другом модулу и његов gateway не излаже операцију за њих, проширите интерфејс gateway-а, уместо да задирете у репозиторијуме или базу података другог модула.
:::

## Аутентификација и ауторизација

### JWT аутентификација

Сви захтеви се аутентификују помоћу JWT токена које обрађује `CustomAuthProvider`. Токен се аутоматски проверава, а контекст аутентификованог корисника (`au`) доступан је у свакој акцији контролера.

### Провере дозвола

Користите `au.checkAccess()` да проверите да ли тренутни корисник има потребну дозволу. Дозволе су унапред дефинисане константе које комбинују тип садржаја и акцију:

```typescript
au.checkAccess(Permissions.people.view);    // Read access
au.checkAccess(Permissions.people.edit);    // Write access
```

Ако корисник нема потребну дозволу, аутоматски се враћа одговор са грешком.

:::warning
Увек позовите `au.checkAccess()` пре извођења било каквих операција над подацима. Никада не прескачите провере дозвола, чак ни за привидно само-читајуће крајње тачке.
:::

## Конфигурација окружења

Класа `Environment` управља конфигурацијом у различитим окружењима:

- **Локални развој:** Чита из `.env` фајла у корену пројекта
- **Постављена окружења:** Чита из AWS SSM Parameter Store-а

```typescript
// Access environment variables
const jwtSecret = Environment.jwtSecret;
const corsOrigin = Environment.corsOrigin;
```

Захваљујући овој апстракцији, ваш код не мора да зна одакле долази конфигурација.

## Lambda функције

Када се постави на AWS, API ради као шест Lambda функција:

| Функција | Намена |
|----------|--------|
| `web` | Обрађује све HTTP REST API захтеве |
| `socket` | Управља WebSocket конекцијама за функције у реалном времену |
| `timer15Min` | Заказана на сваких 30 минута за имејл обавештења (назив је историјски) |
| `timerMidnight` | Заказана дневно за дневне дајџест имејлове и одржавање |
| `timerScheduledTasks` | Заказана дневно за доспеле аутоматизације и обраду закаснелих радних токова |
| `timerWebhooks` | Заказана на сваки минут за испоруку заказаних одлазних webhook-ова |

:::info
Локално, функција `web` ради на порту 8084, а функција `socket` на порту 8087. Функције тајмера могу се ручно покренути током развоја.
:::

## Повезани чланци

- **[База података](./database.md)** -- Стринг за повезивање, скрипте шеме и обрасци приступа подацима
- **[Локално подешавање API-ја](./local-setup.md)** -- Комплетан водич корак по корак
- **[ApiHelper](../shared-libraries/api-helper.md)** -- Дељена библиотека која обезбеђује `CustomBaseController` и auth middleware
