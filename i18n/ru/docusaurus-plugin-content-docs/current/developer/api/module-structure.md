---
title: "Структура модулей"
---

# Структура модулей

<div class="article-intro">

Каждый модуль API следует единообразной внутренней структуре с контроллерами, репозиториями, моделями и хелперами. Понимание этой компоновки позволяет легко ориентироваться в кодовой базе и добавлять новую функциональность в любой модуль.

</div>

<div class="prereqs">
<h4>Перед началом работы</h4>

- Настройте API локально -- см. [Локальная настройка API](./local-setup)
- Ознакомьтесь с архитектурой [базы данных](./database), чтобы понять уровень доступа к данным

</div>

## Структура каталогов

Каждый модуль располагается в `src/modules/{name}/` и содержит четыре каталога:

```
src/modules/{name}/
├── controllers/    ← Обработчики маршрутов (эндпоинты Express)
├── repositories/   ← Уровень доступа к данным (прямой SQL)
├── models/         ← Интерфейсы и типы TypeScript
└── helpers/        ← Бизнес-логика модуля
```

Например, модуль membership:

```
src/modules/membership/
├── controllers/
│   ├── PersonController.ts
│   ├── GroupController.ts
│   └── ...
├── repositories/
│   ├── PersonRepository.ts
│   ├── GroupRepository.ts
│   └── ...
├── models/
│   ├── Person.ts
│   ├── Group.ts
│   └── ...
└── helpers/
    └── ...
```

## Контроллеры

Контроллеры определяют API-маршруты модуля. Они наследуют `CustomBaseController` из `@churchapps/apihelper` и используют декораторы Inversify для регистрации маршрутов.

```typescript
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { CustomBaseController } from "@churchapps/apihelper";

@controller("/people")
export class PersonController extends CustomBaseController {

  @httpGet("/")
  public async loadAll() {
    return this.actionWrapper(async (au) => {
      // au = контекст аутентифицированного пользователя
      au.checkAccess("People", "View");
      const repos = RepositoryManager.getRepositories<MembershipRepositories>("membership");
      return repos.person.loadByChurchId(au.churchId);
    });
  }

  @httpPost("/")
  public async save() {
    return this.actionWrapper(async (au) => {
      au.checkAccess("People", "Edit");
      const data = this.request.body;
      // ... логика сохранения
    });
  }
}
```

### Декораторы маршрутов

| Декоратор | HTTP-метод |
|-----------|-------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

Декоратор `@controller("/base")` задаёт базовый путь для всех маршрутов контроллера.

## Репозитории

Репозитории выполняют все операции с базой данных, используя прямой SQL через `DB.query()`. ORM не используется -- SQL пишется напрямую.

```typescript
export class PersonRepository {
  public async loadByChurchId(churchId: string) {
    return DB.query("SELECT * FROM people WHERE churchId=?", [churchId]);
  }

  public async save(person: Person) {
    // Логика INSERT или UPDATE
  }
}
```

Доступ к репозиториям осуществляется через `RepositoryManager`:

```typescript
const repos = RepositoryManager.getRepositories<MembershipRepositories>("membership");
const people = await repos.person.loadByChurchId(churchId);
```

## Аутентификация и авторизация

### JWT-аутентификация

Все запросы аутентифицируются через JWT-токены, обрабатываемые `CustomAuthProvider`. Токен проверяется автоматически, и контекст аутентифицированного пользователя (`au`) доступен в каждом действии контроллера.

### Проверка разрешений

Используйте `au.checkAccess()` для проверки наличия необходимого разрешения у текущего пользователя:

```typescript
au.checkAccess("People", "View");    // Доступ на чтение
au.checkAccess("People", "Edit");    // Доступ на запись
```

Если у пользователя нет необходимого разрешения, ответ с ошибкой возвращается автоматически.

:::warning
Всегда вызывайте `au.checkAccess()` перед выполнением операций с данными. Никогда не пропускайте проверку разрешений, даже для эндпоинтов, работающих только на чтение.
:::

## Конфигурация окружения

Класс `Environment` управляет конфигурацией в разных средах:

- **Локальная разработка:** Чтение из файла `.env` в корне проекта
- **Развёрнутые окружения:** Чтение из AWS SSM Parameter Store

```typescript
// Доступ к переменным окружения
const dbConnection = Environment.membershipDb;
const jwtSecret = Environment.jwtSecret;
```

Эта абстракция означает, что вашему коду не нужно знать, откуда берётся конфигурация.

## Lambda-функции

При развёртывании в AWS API работает как четыре Lambda-функции:

| Функция | Назначение |
|----------|---------|
| `web` | Обрабатывает все HTTP REST API-запросы |
| `socket` | Управляет WebSocket-соединениями для функций реального времени |
| `timer15Min` | Запускается каждые 15 минут для уведомлений по электронной почте |
| `timerMidnight` | Запускается ежедневно для дайджестов и задач обслуживания |

:::info
Локально функция `web` работает на порту 8084, а функция `socket` -- на порту 8087. Функции таймеров можно запускать вручную во время разработки.
:::

## Связанные статьи

- **[База данных](./database)** -- Строки подключения, скрипты схемы и паттерны доступа к данным
- **[Локальная настройка API](./local-setup)** -- Полное пошаговое руководство по настройке
- **[ApiHelper](../shared-libraries/api-helper)** -- Общая библиотека, предоставляющая `CustomBaseController` и middleware аутентификации
