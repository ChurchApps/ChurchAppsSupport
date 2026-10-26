---
title: "Интеграции и система расширений"
---

# Интеграции и система расширений

<div class="article-intro">

Всё, что может подключить сторонний разработчик, работает через один API и одну модель авторизации. Эта страница — карта: она перечисляет все поверхности интеграции, показывает, как они связаны, и ссылается на подробную справку по каждой из них. Если вы разрабатываете что-то для B1, начните отсюда, чтобы выбрать нужную точку входа, а затем перейдите по ссылке на страницу, где она описана подробно.

</div>

## Поверхности интеграции

Есть шесть способов войти или выйти, и все они используют один и тот же слой авторизации:

- **[REST API](../api/api-keys)** — вся продуктовая поверхность, доступная с bearer-токеном из любого языка.
- **[API-ключи](../api/api-keys)** — самый простой учётные данные: токен `cak_…`, привязанный к одному человеку в одной церкви.
- **[OAuth 2.0 и подключённые приложения](../api/connected-apps)** — согласие каждой церкви для многоарендных приложений; выдаёт тот же JWT, что получает пользователь.
- **[Webhook-и](../api/webhooks)** — подписанные исходящие события с надёжной доставкой.
- **[Сервер MCP](../api/mcp)** — обёртка над REST API для ИИ по адресу `/mcp`.
- **[Провайдеры контента](../freeplay-content-provider)** — входящий путь для внешних медиатек в FreePlay и приложения B1.

Всё, кроме провайдеров контента, обслуживается единым монолитным API (репозиторий [Api](https://github.com/ChurchApps/Api)), модули которого подключаются по стабильным базовым путям — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting` и `/mcp`.

## Как всё связано

```
   ┌─────────────────────┐                          ┌───────────────────────────────────────┐
   │  Third-party app     │   Bearer  cak_… / JWT    │              B1 API (Api)              │
   │  · server / SaaS     │ ───────────────────────▶ │  ┌─────────────────────────────────┐  │
   │  · Zapier / Make     │                          │  │ CustomAuthProvider.getUser()    │  │
   │  · Google Sheets     │                          │  │   cak_ key ─┐                    │  │
   │  · CLI / scripts     │                          │  │   OAuth JWT ┴▶ Principal          │  │
   │  · AI client (MCP)   │ ─── POST /mcp ──────────▶ │  │   scopes filter → permissions[] │  │
   └─────────────────────┘                          │  └────────────────┬────────────────┘  │
             ▲                                        │                   ▼                    │
             │                                        │  API modules: /membership /giving     │
             │        signed JSON POST                │  /attendance /content /messaging …    │
             │   (person / donation / group / …)      │                   │                    │
             └──────────── webhooks ◀─────────────────┼─ shared/webhooks/WebhookDispatcher     │
                     (durable, HMAC-SHA256 signed)     └───────────────────────────────────────┘

   External content sources (Planning Center, Dropbox, Life.Church, CBN, …)
             │   OAuth PKCE / device flow / none   ──  B1 is the OAuth *client* here  ──▶
             ▼
   Packages/content-providers   ──▶   FreePlay / B1 apps        (inbound content path)
```

Три стрелки описывают всё: сторонний разработчик **обращается** к системе с bearer-токеном (API-ключ или JWT OAuth, в том числе через `/mcp`); API **обращается в обратную сторону** через подписанные webhook-и; а провайдеры контента — это единственный путь **входящего контента**, где сам B1 выступает клиентом OAuth и забирает медиа из внешнего источника.

## Общая модель авторизации

Каждые учётные данные — JWT входа пользователя, токен доступа OAuth или API-ключ — превращаются в **один и тот же `Principal`** и проверяются одинаково. Отдельного пути «интеграционной авторизации» нет; ограниченные учётные данные просто неотличимы от пользователя с меньшими правами.

### Структура JWT

Токены доступа B1 — это JWT HS256, которые выпускаются в `Api/src/modules/membership/auth/AuthenticatedUser.ts`. Набор утверждений (claims):

| Утверждение | Значение |
|---|---|
| `id`, `email`, `firstName`, `lastName` | Человек, стоящий за токеном |
| `churchId` | Единственная церковь, в которой действует токен — основа для всей ограниченности данных |
| `personId` | Запись человека внутри этой церкви |
| `permissions` | Плоский массив строк прав RBAC (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Членство в группах и руководство группами для проверок на уровне группы |
| `membershipStatus` | Гость или участник — для ограничения самообслуживания |

Токен доступа OAuth по структуре полностью совпадает с JWT входа; единственное отличие в том, что его массив `permissions` был **отфильтрован по выданным областям (scopes) перед подписанием** (`getCombinedApiJwt(...)`).

### Ограничение по церкви

`churchId` — это утверждение в токене, а не параметр запроса, поэтому учётные данные никогда не могут выйти за пределы своей церкви. Каждый запрос к репозиторию фильтруется по `churchId` вызывающего; API-ключ или токен OAuth привязывается ровно к одной церкви в момент выпуска.

### Права на основе ролей на границе

Контроллеры ограничивают действия через `au.checkAccess(contentType, action)` по массиву `permissions` токена. Области (scopes) — это **фильтр, а не предоставление прав** (`Api/src/shared/auth/Scopes.ts`): `SCOPE_CATALOG` сопоставляет каждую область (например, `people:read`, `donations:write`) с парами RBAC, которые она разрешает, а `filterPermissionsByScopes()` пересекает их с **текущими** правами человека при каждом обращении. Отсюда следует:

- Отзыв права в B1Admin прекращает доступ учётных данных уже при следующем запросе — токены никогда не расходятся с ролью.
- Область может только *убрать* права, поэтому ограниченные учётные данные никогда не могут получить права администратора сервера или домена (эти права намеренно не сопоставлены ни с одной областью).
- У API-ключей префикс `cak_`; `CustomAuthProvider.getUser()` распознаёт его, хеширует секрет и заново получает живые права RBAC владельца при каждом вызове.

Полный каталог см. в [API-ключи → Области](../api/api-keys#scopes).

## Справка по поверхностям

### REST API

Полная продуктовая поверхность. Любой аутентифицированный эндпоинт принимает либо JWT, либо API-ключ `cak_…` в заголовке `Authorization: Bearer` — отдельной таблицы маршрутов только для ключей или только для OAuth нет. Модули и их базовые пути находятся в `Api/src/modules/*`.

### API-ключи

Персональный токен доступа вида `cak_<prefix>.<secret>`, который создаётся в **B1Admin → Settings → Developer → API Keys**. Хранится только SHA-256-хеш; сам ключ показывается один раз. Управляется по адресу `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Лучше всего подходит для собственных скриптов одной церкви и для коннекторов вроде Zapier, Make и Google Sheets. → **[API-ключи](../api/api-keys)**

### OAuth 2.0 и подключённые приложения

Для многоарендных приложений, которым нужно согласие каждой церкви. Реализовано в `Api/src/modules/membership/controllers/OAuthController.ts` по пути `/membership/oauth`. Сервер поддерживает три типа грантов:

- **Authorization Code** — `POST /oauth/authorize` (требует аутентификации) возвращает короткоживущий код; `POST /oauth/token` с `grant_type=authorization_code` обменивает его на JWT доступа (≈ 7 дней) и refresh-токен (≈ 90 дней). Публичные клиенты (без секрета) обязаны использовать PKCE (только `S256`): `code_challenge` при авторизации и соответствующий `code_verifier` при обмене токена.
- **Device Code** (RFC 8628) — `POST /oauth/device/authorize` выдаёт `user_code`; пользователь подтверждает его в B1Admin (`/oauth/device/approve`); устройство опрашивает `/oauth/token` с грантом device-code. Для телевизоров, киосков и CLI без браузера.
- **Refresh Token** — `grant_type=refresh_token` выпускает новый токен доступа; публичные клиенты (без секрета) могут не передавать секрет.

Публичные клиенты могут самостоятельно регистрироваться через `POST /oauth/register` (динамическая регистрация клиентов RFC 7591); они получают `client_id` без секрета, а их URI перенаправления должны быть `https` или loopback.

**Подключённое приложение** — это представление предоставленного токена для администратора церкви; оно показывается и отзывается по адресу `/membership/oauth/connections`. Контроллер также содержит мост **relay-сессий** OAuth (`/oauth/relay/*`), который позволяет устройству без браузера завершить вход во *внешнем* провайдере. → **[Подключённые приложения и OAuth](../api/connected-apps)**

### Webhook-и

Единственная исходящая поверхность. Церковь подписывает публичный HTTPS-эндпоинт на события; когда происходит подходящее изменение, `WebhookDispatcher.emit(churchId, event, payload)` дополняет payload, содержащий только идентификаторы, отображаемыми именами (`personName`, `groupName`, `formName` — поиск выполняется только тогда, когда есть подходящая подписка), записывает факт доставки, а фоновый воркер отправляет POST с подписанным JSON-конвертом с повторными попытками, экспоненциальной задержкой и повторной доставкой. Движок находится в `Api/src/shared/webhooks/`, CRUD для каждой церкви — по адресу `/membership/webhooks` (`WebhookController.ts`). Поле `connectorType` меняет тело для Slack и Discord; коннектор `mailchimp` идёт дальше и сам ведёт весь HTTP-обмен (метод/URL/авторизация для каждого события по API Mailchimp, учётные данные зашифрованы в `webhooks.connectorConfig`). → **[Webhook-и](../api/webhooks)**

### Сервер MCP

ИИ-обёртка по адресу `/mcp` (`Api/src/modules/mcp/`). Три универсальных инструмента — `list_endpoints`, `describe_endpoint`, `api_call` — динамически открывают всю REST-поверхность любому клиенту MCP. Авторизация — тот же bearer-токен, что и везде. Для клиентов, которые входят через OAuth (пользовательские коннекторы claude.ai), ответ 401 от `/mcp` содержит заголовок `WWW-Authenticate`, указывающий на `/.well-known/oauth-protected-resource`, а `/.well-known/oauth-authorization-server` объявляет эндпоинты `/membership/oauth`, динамическую регистрацию, PKCE и страницу согласия B1Admin `/oauth` (`WellKnownController.ts`, `OAuthMetadata.ts`). `api_call` повторно входит в стек Express внутри процесса, поэтому все правила доступа и ограничения по церкви продолжают действовать. → **[Сервер MCP](../api/mcp)**

### Провайдеры контента

Входящий путь контента находится в отдельном пакете `Packages/content-providers` (`@churchapps/content-providers`), а не в API. Каждый провайдер реализует интерфейс `IProvider` (`src/interfaces.ts`) — `browse`, `getPlaylist`, `getInstructions` и хуки авторизации — и сам регистрируется в реестре `Map` (`src/providers/registry.ts`). Здесь **B1 выступает клиентом OAuth**: провайдер объявляет `AuthType` со значением `none`, `oauth_pkce`, `device_flow` или `form_login`, а общие помощники (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) выполняют на стороне клиента PKCE или device flow с внешним источником. Сегодня поставляются одиннадцать провайдеров — в том числе Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church и B1.church — и они передают контент в FreePlay и приложения B1. → **[Провайдер контента FreePlay](../freeplay-content-provider)**

**Планы на год** работают по этому пути. Издатель учебных материалов (с правом `lessons.edit`) ведёт упорядоченные последовательности «неделя 1/2/3» в админке Lessons.church (таблицы `yearPlans` / `yearPlanWeeks` в LessonsApi, с необязательным `startMonth` и для каждой недели — `anchor` со значением `easter` или `christmas`); `GET /yearPlans/public` в LessonsApi отдаёт действующие планы анонимно, наполняя программу, учебный материал и место каждой недели из дерева уроков. В B1Admin раздел **Serving → Plans → Schedule Lesson → Apply Year Plan** использует этот эндпоинт и записывает по одному плану DoingApi на каждую включённую неделю (`providerId=lessonschurch`, `providerPlanId=/lessons/{programId}/{studyId}/{lessonId}/{venueId}`). Планы с `startMonth` привязывают недели с якорем к выбранному году (Пасха по григорианскому вычислению, Рождество — ближайшее воскресенье не позже 25 декабря) и заполняют промежутки между ними; планы без `startMonth` по-прежнему сопоставляют неделю N с датой `startDate + (N−1)×7` дней. Недели из внешних провайдеров OLF или с неполным путём пропускаются при применении; церкви редактируют получившиеся планы как обычные, а FreePlay воспроизводит всё, что стоит в плане.

## Сводка

| Поверхность | Механизм авторизации | Направление | Где реализовано | Справка |
|---|---|---|---|---|
| REST API | `Bearer` JWT или ключ `cak_…` | Входящее | `Api/src/modules/*` | [API-ключи](../api/api-keys) |
| API-ключи | Токен `cak_` с хешем SHA-256 | Учётные данные | `Api/.../membership/controllers/ApiKeyController.ts` | [API-ключи](../api/api-keys) |
| OAuth 2.0 / подключённые приложения | Код авторизации (PKCE) · device · refresh → JWT; динамическая регистрация клиентов | Входящее | `Api/.../membership/controllers/OAuthController.ts` | [Подключённые приложения](../api/connected-apps) |
| Webhook-и | Секрет для каждого хука, подпись HMAC-SHA256 | Исходящее | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhook-и](../api/webhooks) |
| Сервер MCP | `Bearer` JWT, JWT OAuth (обнаруживается через `/.well-known`) или ключ `cak_…` | Входящее (ИИ) | `Api/src/modules/mcp/` | [Сервер MCP](../api/mcp) |
| Провайдеры контента | Для каждого провайдера: нет / OAuth PKCE / device / форма | Входящий контент | `Packages/content-providers/` | [Провайдер контента](../freeplay-content-provider) |

## Готовые коннекторы

Вместо того чтобы всё строить с нуля, ChurchApps поставляет коннекторы поверх перечисленных выше поверхностей:

- **[Slack и Discord](/docs/b1-admin/integrations/slack-discord)** — тип коннектора `webhook` превращает стандартный конверт в сообщение чата; настраивается полностью в B1Admin, без стороннего аккаунта.
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)** — тип коннектора `mailchimp`, который синхронизирует людей с аудиторией Mailchimp и сопоставляет членство в группах и списках с тегами (`Api/src/shared/webhooks/MailchimpConnector.ts`). В отличие от коннекторов чатов, он выполняет собственные аутентифицированные запросы на каждое событие (upsert/archive/tag), а не отправляет POST на URL, указанный церковью; API-ключ и идентификатор аудитории хранятся зашифрованными в `webhooks.connectorConfig`. Односторонняя синхронизация, только стандартные поля для слияния.
- **[Zapier](/docs/b1-admin/integrations/zapier)** и **[Make](/docs/b1-admin/integrations/make)** — запускаются по событиям webhook и действуют через REST API; они регистрируют собственный webhook при включении Zap/сценария (нужен ключ с правом `settings:write`). Исходный код приложения Zapier находится в репозитории `Integrations` в каталоге `zapier/` (Zapier CLI, публикуется командой `zapier push`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — надстройка с аутентификацией по API-ключу, которая по запросу экспортирует Людей / Пожертвования / Группы / Посещаемость.
- **[Claude](/docs/b1-admin/integrations/claude)** и **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — клиенты MCP, направленные на `/mcp`.

Для собственного кода **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) оборачивает всё это: типизированный REST-клиент, клиент OAuth (auth code / refresh / device flow) и верификатор webhook-ов HMAC с middleware для Express.

## Связанные страницы

- [API-ключи](../api/api-keys) — самый простой вид учётных данных и каталог областей
- [Подключённые приложения и OAuth](../api/connected-apps) — потоки согласия многоарендных приложений
- [Webhook-и](../api/webhooks) — система исходящих событий
- [Сервер MCP](../api/mcp) — ИИ-обёртка для интеграций
- [Провайдер контента FreePlay](../freeplay-content-provider) — как стать источником входящего контента
- [Интеграции (для конечных пользователей)](/docs/b1-admin/integrations/) — руководства по настройке готовых коннекторов
