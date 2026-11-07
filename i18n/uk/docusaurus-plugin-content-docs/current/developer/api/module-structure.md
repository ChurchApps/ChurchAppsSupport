---
title: "Структура модуля"
---

# Структура модуля

<div class="article-intro">

Кожен модуль API має єдину внутрішню структуру з контролерами, репозиторіями, моделями та допоміжними функціями. Розуміння цієї схеми полегшує навігацію по кодовій базі та додавання нової функціональності до будь-якого модуля.

</div>

<div class="prereqs">
<h4>Перш ніж почати</h4>

- Налаштуйте API локально -- див. [Налаштування локального API](./local-setup)
- Ознайомтеся з архітектурою [бази даних](./database), щоб зрозуміти рівень доступу до даних

</div>

## Структура каталогів

Модулі розміщуються в `src/modules/{name}/`. Типовий модуль містить чотири каталоги:

```
src/modules/{name}/
├── controllers/    ← Route handlers (Express endpoints)
├── repositories/   ← Data access layer (typed SQL queries)
├── models/         ← TypeScript interfaces and types
└── helpers/        ← Module-specific business logic
```

Наприклад, модуль membership:

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

Шість основних модулів даних -- membership, attendance, content, giving, messaging і doing -- мають однакову структуру. Кілька спеціалізованих модулів (наприклад, reporting, який формує міжмодульні звіти та не має власних даних) розташовані поруч із ними в `src/modules/`.

## Один застосунок, багато модулів

API є **модульним монолітом**: модулі позначають межі організації коду та володіння даними, а не окремі сервіси. Під час запуску контролери кожного модуля реєструються в одному контейнері впровадження залежностей за одним застосунком Express, тож весь API збирається, запускається та розгортається як єдине ціле. Розгорнуті функції, описані нижче, є точками входу в цей самий застосунок.

Маршрути кожного модуля розміщуються під префіксом URL, що відповідає назві модуля:

```
/membership/*    /attendance/*    /content/*
/giving/*        /messaging/*     /doing/*
```

Це робить API кожного модуля самодостатнім, а клієнти, як і раніше, звертаються до одного хоста.

## Контролери

Контролери визначають маршрути API для модуля. Кожен модуль має власний базовий контролер (наприклад, `MembershipBaseController`), який успадковує спільний `BaseController` -- той, у свою чергу, побудований на `CustomBaseController` з `@churchapps/apihelper`. Маршрути реєструються за допомогою декораторів Inversify.

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

`actionWrapper` автентифікує запит і наповнює `this.repos` репозиторіями модуля перед виконанням вашої дії.

### Декоратори маршрутів

| Декоратор | HTTP-метод |
|-----------|-------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

Декоратор `@controller("/base")` задає базовий шлях для всіх маршрутів у контролері.

## Репозиторії

Репозиторії виконують усі операції з базою даних. ORM не використовується -- запити написані за допомогою конструктора запитів Kysely, типізованого відповідно до схеми бази даних модуля. Файл `db/index.ts` кожного модуля надає функцію `getDb()`, яка повертає типізований екземпляр Kysely цього модуля.

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

Усередині контролера репозиторії модуля доступні як `this.repos`. Поза контролерами їх можна отримати через `RepoManager`:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

## Взаємодія між модулями

Кожен модуль володіє власною базою даних (див. [База даних](./database)), і модуль ніколи не звертається безпосередньо до таблиць іншого модуля. Коли одному модулю потрібні дані, якими володіє інший -- наприклад, модуль doing отримує відомості про людей із membership, -- він звертається через **шлюз** відповідного модуля у `src/shared/modules/`:

```typescript
import { getMembershipModuleGateway } from "../../../shared/modules/index.js";

const people = await getMembershipModuleGateway().loadPeople(churchId, personIds);
```

Кожен шлюз (`MembershipModuleGateway`, `GivingModuleGateway` тощо) є інтерфейсом TypeScript, який точно визначає, які операції модуль надає решті API. Інтерфейс є контрактом: поточні реалізації читають базу даних модуля в межах того самого процесу, але оскільки викликачі залежать лише від інтерфейсу, реалізацію можна замінити -- наприклад, на таку, що робить HTTP-виклики, -- якщо модуль колись буде винесено в окремий сервіс.

:::info
Якщо потрібні вам дані належать іншому модулю, а його шлюз не надає для них операції, розширте інтерфейс шлюзу, а не звертайтеся безпосередньо до репозиторіїв чи бази даних іншого модуля.
:::

## Автентифікація та авторизація

### Автентифікація JWT

Усі запити автентифікуються за допомогою токенів JWT, які обробляє `CustomAuthProvider`. Токен перевіряється автоматично, а контекст автентифікованого користувача (`au`) доступний у кожній дії контролера.

### Перевірка дозволів

Використовуйте `au.checkAccess()`, щоб перевірити, чи має поточний користувач потрібний дозвіл. Дозволи -- це попередньо визначені константи, що поєднують тип вмісту та дію:

```typescript
au.checkAccess(Permissions.people.view);    // Read access
au.checkAccess(Permissions.people.edit);    // Write access
```

Якщо користувач не має потрібного дозволу, автоматично повертається відповідь із помилкою.

:::warning
Завжди викликайте `au.checkAccess()` перед будь-якими операціями з даними. Ніколи не пропускайте перевірку дозволів, навіть для ендпоїнтів, які лише читають дані.
:::

## Конфігурація середовища

Клас `Environment` керує конфігурацією в різних середовищах:

- **Локальна розробка:** читає файл `.env` у корені проєкту
- **Розгорнуті середовища:** читає AWS SSM Parameter Store

```typescript
// Access environment variables
const jwtSecret = Environment.jwtSecret;
const corsOrigin = Environment.corsOrigin;
```

Ця абстракція означає, що вашому коду не потрібно знати, звідки береться конфігурація.

## Функції Lambda

Після розгортання в AWS API працює як шість функцій Lambda:

| Функція | Призначення |
|----------|---------|
| `web` | Обробляє всі запити HTTP REST API |
| `socket` | Керує підключеннями WebSocket для функцій реального часу |
| `timer15Min` | Запускається кожні 30 хвилин для сповіщень електронною поштою (назва історична) |
| `timerMidnight` | Запускається щодня для дайджест-листів і технічного обслуговування |
| `timerScheduledTasks` | Запускається щодня для термінових автоматизацій і обробки прострочених робочих процесів |
| `timerWebhooks` | Запускається щохвилини для доставки вихідних webhook з черги |

:::info
Локально функція `web` працює на порту 8084, а функція `socket` -- на порту 8087. Функції таймерів можна запускати вручну під час розробки.
:::

## Пов'язані статті

- **[База даних](./database)** -- рядки підключення, скрипти схеми та шаблони доступу до даних
- **[Налаштування локального API](./local-setup)** -- повний покроковий посібник з налаштування
- **[ApiHelper](../shared-libraries/api-helper)** -- спільна бібліотека, яка надає `CustomBaseController` і проміжне програмне забезпечення автентифікації
