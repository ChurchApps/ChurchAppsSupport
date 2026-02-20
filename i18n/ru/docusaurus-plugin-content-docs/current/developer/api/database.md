---
title: "База данных"
---

# База данных

<div class="article-intro">

API ChurchApps использует архитектуру **отдельная база данных для каждого модуля**. Каждый из шести модулей имеет собственную базу данных MySQL с независимым пулом соединений, обеспечивая чёткие границы данных при сохранении единого развёртывания.

</div>

<div class="prereqs">
<h4>Перед началом работы</h4>

- Установите **MySQL 8.0+** -- см. [Предварительные требования](../setup/prerequisites)
- Настройте строки подключения к базе данных в файле `.env` -- см. [Переменные окружения](../setup/environment-variables)

</div>

## Обзор архитектуры

```
Api
├── membership_db   ← Люди, группы, разрешения
├── attendance_db   ← Служения, сессии, записи
├── content_db      ← Страницы, разделы, элементы
├── giving_db       ← Пожертвования, фонды, платежи
├── messaging_db    ← Переписки, уведомления
└── doing_db        ← Задачи, планы, назначения
```

### Ключевые архитектурные решения

- **Одна база данных на модуль** -- Каждый модуль поддерживает собственную базу данных MySQL с выделенным пулом соединений (`EnhancedPoolHelper`). Это обеспечивает независимость модулей и возможность независимого развития схемы.
- **Паттерн «Репозиторий» с прямым SQL** -- ORM не используется. Весь доступ к данным осуществляется через классы репозиториев, выполняющие SQL напрямую через `DB.query()`. Это даёт полный контроль над производительностью и поведением запросов.
- **Мультитенантность по умолчанию** -- Каждый запрос ограничен `churchId`. Все таблицы содержат столбец `churchId`, а уровень репозитория автоматически обеспечивает изоляцию арендаторов.

## Строки подключения

Подключение к базе данных каждого модуля настраивается в `.env` с использованием стандартного формата строки подключения MySQL:

```
mysql://user:password@host:port/database
```

Например, для локальной среды разработки настройка может выглядеть так:

```env
MEMBERSHIP_DB=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_DB=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_DB=mysql://root:password@localhost:3306/churchapps_content
GIVING_DB=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_DB=mysql://root:password@localhost:3306/churchapps_messaging
DOING_DB=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
В продакшене строки подключения хранятся в AWS SSM Parameter Store и считываются классом `Environment` при запуске.
:::

## Скрипты схемы

Скрипты схемы базы данных расположены в каталоге `tools/dbScripts/`, организованном по модулям:

```
tools/dbScripts/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

Эти скрипты определяют создание таблиц, индексы и необходимые начальные данные.

## Инициализация базы данных

### Инициализация всех баз данных

```bash
npm run initdb
```

Эта команда создаёт все шесть баз данных и выполняет скрипты схемы для каждой из них.

### Инициализация отдельного модуля

```bash
npm run initdb:membership
npm run initdb:attendance
npm run initdb:content
npm run initdb:giving
npm run initdb:messaging
npm run initdb:doing
```

:::tip
При работе с конкретным модулем вы можете повторно инициализировать только базу данных этого модуля, не затрагивая остальные.
:::

## Паттерн доступа к данным

Репозитории обращаются к данным через метод `DB.query()`. Типичный метод репозитория выглядит так:

```typescript
public async loadByChurchId(churchId: string) {
  return DB.query("SELECT * FROM people WHERE churchId=?", [churchId]);
}
```

Репозитории получают через `RepositoryManager`:

```typescript
const repos = RepositoryManager.getRepositories<MembershipRepositories>("membership");
const people = await repos.person.loadByChurchId(churchId);
```

:::warning
Всегда включайте `churchId` в запросы для поддержания мультитенантной изоляции. Никогда не выполняйте запросы между арендаторами без конкретной авторизованной причины.
:::

## Связанные статьи

- **[Структура модулей](./module-structure)** -- Как организованы контроллеры и репозитории внутри каждого модуля
- **[Локальная настройка API](./local-setup)** -- Полное пошаговое руководство по настройке
