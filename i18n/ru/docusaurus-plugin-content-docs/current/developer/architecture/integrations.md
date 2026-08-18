---
title: "Поверхность интеграции и расширения"
---

# Поверхность интеграции и расширения

<div class="article-intro">

Все, что может подключить третья сторона, проходит через один API и одну модель авторизации. Эта страница - это карта: она называет все поверхности интеграции, показывает, как они соединяются, и ссылается на подробный справочник для каждой. Если вы разрабатываете для B1, начните здесь, чтобы выбрать правильный путь, затем перейдите по ссылке на страницу, которая документирует это подробно.

</div>

## Поверхности с одного взгляда

Есть шесть способов входа и выхода, и все они используют одного и того же уровень аутентификации:

- **[REST API](../api/api-keys)** — вся поверхность продукта, вызывается с токеном носителя из любого языка.
- **[API ключи](../api/api-keys)** — самые простые учетные данные: `cak_…` токен, привязанный к одному человеку в одной церкви.
- **[OAuth 2.0 и подключенные приложения](../api/connected-apps)** — согласие за церковь для приложений с несколькими клиентами; выпускает один и тот же JWT, который получает пользователь.
- **[Webhooks](../api/webhooks)** — подписанные, устойчивые исходящие события.
- **[MCP сервер](../api/mcp)** — оборачивающий слой, обращенный к AI, поверх REST API в `/mcp`.
- **[Поставщики контента](../freeplay-content-provider)** — входящий путь для внешних библиотек мультимедиа в FreePlay и приложения B1.

Все, кроме поставщиков контента, обслуживается единственным монолитным API (репозиторий [Api](https://github.com/ChurchApps/Api)), модули которого монтируются под стабильные базовые пути — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting` и `/mcp`.

## Как это соединяется

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

Три стрелки рассказывают всю историю: третья сторона **вызывает с помощью** токена носителя (API ключ или OAuth JWT, в том числе через `/mcp`); API **вызывает обратно** через подписанные webhooks; и поставщики контента - это один **входящий контент** путь, где B1 сам является OAuth *клиентом*, вытягивающим медиа из внешнего источника.

## Модель общей аутентификации

Любые учетные данные — JWT логина пользователя, токен доступа OAuth или API ключ — разрешаются в **одного `Principal`** и проверяются одинаково. Нет отдельного пути "интеграционной аутентификации"; учетные данные с областью просто неотличимы от менее привилегированного пользователя.

### Структура JWT

Токены доступа B1 - это HS256 JWT, выданные в `Api/src/modules/membership/auth/AuthenticatedUser.ts`. Набор претензий:

| Претензия | Значение |
|---|---|
| `id`, `email`, `firstName`, `lastName` | Человек позади токена |
| `churchId` | Единая церковь, в которой действует этот токен — якорь для всех областей данных |
| `personId` | Запись о человеке внутри этой церкви |
| `permissions` | Плоский массив строк RBAC разрешений (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Членство в группе / лидерство, для проверок в области группы |
| `membershipStatus` | Гость против члена, для самообслуживания ворот |

Токен доступа OAuth - это байт за байтом той же формы, что и JWT логина — единственное отличие в том, что его массив `permissions` был **отфильтрован через предоставленные области перед подписанием** (`getCombinedApiJwt(...)`).

### Сканирование за церковью

`churchId` - это претензия токена, не параметр запроса, поэтому учетные данные никогда не могут охватить церкви. Каждый запрос хранилища фильтруется по `churchId` вызывающей стороны; API ключ или токен OAuth привязан ровно к одной церкви во время выдачи.

### Разрешения на основе ролей на границе

Контроллеры направляют действия с `au.checkAccess(contentType, action)` в массив `permissions` токена. Области - это **фильтр, никогда не предоставление** (`Api/src/shared/auth/Scopes.ts`): `SCOPE_CATALOG` отображает каждую область (например, `people:read`, `donations:write`) в RBAC пары, которые она разрешает, и `filterPermissionsByScopes()` пересекает это с *текущими* разрешениями человека при каждом разрешении. Последствия:

- Отзыв разрешения в B1Admin отрезает доступ учетных данных при следующем запросе — токены никогда не отстают от роли.
- Область может только *удалить* разрешения, поэтому учетные данные с областью никогда не могут повыситься на сервер / администрацию домена (эти разрешения намеренно не отображаются на какую-либо область).
- API ключи имеют префикс `cak_`; `CustomAuthProvider.getUser()` разветвляется на нем, хеширует секрет и повторно разрешает живые RBAC владельца человека при каждом вызове.

Смотрите [API ключи → Области](../api/api-keys#scopes) для полного каталога.

## Справочник поверхностей

### REST API

Полная поверхность продукта. Любая аутентифицированная конечная точка принимает либо JWT, либо `cak_…` API ключ в заголовке `Authorization: Bearer` — нет отдельной таблицы маршрутов только для ключа или только для OAuth. Модули и их базовые пути находятся под `Api/src/modules/*`.

### API ключи

Личный токен доступа `cak_<prefix>.<secret>`, созданный в **B1Admin → Settings → Developer → API Keys**. Хранится только хеш SHA-256; необработанный ключ показывается один раз. Управляется в `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Лучше всего для собственных скриптов одной церкви и для соединителей, таких как Zapier, Make и Google Sheets. → **[API ключи](../api/api-keys)**

### OAuth 2.0 и подключенные приложения

Для приложений с несколькими клиентами, которым нужно согласие каждой церкви. Реализовано в `Api/src/modules/membership/controllers/OAuthController.ts` под `/membership/oauth`. Сервер поддерживает три гранта:

- **Authorization Code** — `POST /oauth/authorize` (аутентифицированный) возвращает короткоживущий код; `POST /oauth/token` с `grant_type=authorization_code` обменивает его на JWT доступа (≈ 7 дней) плюс токен обновления (≈ 90 дней).
- **Device Code** (RFC 8628) — `POST /oauth/device/authorize` выпускает `user_code`; пользователь утверждает это в B1Admin (`/oauth/device/approve`); устройство опрашивает `/oauth/token` с грантом device-code. Для телевизоров, киосков и CLI без браузера.
- **Refresh Token** — `grant_type=refresh_token` выпускает новый токен доступа; общественные (без секрета) клиенты могут опустить секрет.

**Connected App** - это обращенный к администратору церкви вид предоставленного токена, указанный и отзываемый в `/membership/oauth/connections`. Контроллер также размещает мост **relay-session** OAuth (`/oauth/relay/*`), который позволяет устройству без браузера завершить вход в систему против *внешнего* поставщика. → **[Connected Apps & OAuth](../api/connected-apps)**

### Webhooks

Единственная исходящая поверхность. Церковь подписывает общедоступную конечную точку HTTPS на события; когда происходит совпадающее изменение, `WebhookDispatcher.emit(churchId, event, payload)` обогащает полезные нагрузки с использованием только id с отображаемыми именами (`personName`, `groupName`, `formName` — поиски работают только один раз при совпадении подписки), записывает доставку, и фоновый рабочий процесс отправляет подписанный JSON конверт с повтором/задержкой и повторной доставкой. Двигатель в `Api/src/shared/webhooks/`, CRUD за церковь под `/membership/webhooks` (`WebhookController.ts`). Поле `connectorType` переформатирует тело для Slack / Discord; соединитель `mailchimp` идет дальше и владеет целым HTTP обменом (для каждого события метод/URL/auth против API Mailchimp, учетные данные зашифрованы в `webhooks.connectorConfig`). → **[Webhooks](../api/webhooks)**

### MCP сервер

Оборачивающий слой, обращенный к AI, в `/mcp` (`Api/src/modules/mcp/`). Три универсальных инструмента — `list_endpoints`, `describe_endpoint`, `api_call` — динамически раскрывают всю поверхность REST для любого клиента MCP. Аутентификация - это один и тот же токен носителя, что и все остальное, и `api_call` повторно входит в стек Express внутри процесса, поэтому каждое разрешение и правило область церкви по-прежнему применяется. → **[MCP сервер](../api/mcp)**

### Поставщики контента

Входящий контент путь, в отдельном пакете `Packages/content-providers` (`@churchapps/content-providers`) вместо API. Каждый поставщик реализует интерфейс `IProvider` (`src/interfaces.ts`) — `browse`, `getPlaylist`, `getInstructions`, плюс крючки аутентификации — и самостоятельно регистрируется в `Map` реестре (`src/providers/registry.ts`). Здесь **B1 является OAuth клиентом**: поставщик объявляет `AuthType` `none`, `oauth_pkce`, `device_flow` или `form_login`, и общие помощники (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) запускают клиентскую PKCE / device flow против внешнего источника. Одиннадцать поставщиков поставляются сегодня — включая Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church и B1.church — подающих FreePlay и приложения B1. → **[FreePlay Content Provider](../freeplay-content-provider)**

## Резюме

| Поверхность | Механизм аутентификации | Направление | Где реализовано | Справочник |
|---|---|---|---|---|
| REST API | `Bearer` JWT или `cak_…` ключ | Входящий | `Api/src/modules/*` | [API ключи](../api/api-keys) |
| API ключи | Хешированный `cak_` токен SHA-256 | Учетные данные | `Api/.../membership/controllers/ApiKeyController.ts` | [API ключи](../api/api-keys) |
| OAuth 2.0 / Connected Apps | Код auth · device · refresh → JWT | Входящий | `Api/.../membership/controllers/OAuthController.ts` | [Connected Apps](../api/connected-apps) |
| Webhooks | Per-hook secret, HMAC-SHA256 signature | Исходящий | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooks](../api/webhooks) |
| MCP сервер | `Bearer` JWT или `cak_…` ключ | Входящий (AI) | `Api/src/modules/mcp/` | [MCP сервер](../api/mcp) |
| Content providers | Per-provider: none / OAuth PKCE / device / form | Входящий контент | `Packages/content-providers/` | [Content Provider](../freeplay-content-provider) |

## Готовые соединители

Вместо того, чтобы каждый строил с нуля, ChurchApps поставляет соединители поверх поверхностей выше:

- **[Slack & Discord](/docs/b1-admin/integrations/slack-discord)** — webhook `connectorType` переформатирует стандартный конверт в сообщение чата; настроено полностью в B1Admin, нет третьей стороны учетная запись.
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)** — `mailchimp` connectorType, который синхронизирует людей в аудиторию Mailchimp и отображает членство в группе/списке на теги (`Api/src/shared/webhooks/MailchimpConnector.ts`). В отличие от соединителей чата, он выпускает свои собственные аутентифицированные запросы за событие (upsert/archive/tag) вместо отправки POST на URL, предоставленный церковью; API ключ и идентификатор аудитории хранятся в зашифрованном виде в `webhooks.connectorConfig`. Односторонний, только стандартные поля слияния.
- **[Zapier](/docs/b1-admin/integrations/zapier)** и **[Make](/docs/b1-admin/integrations/make)** — срабатывают на события webhook и действуют через REST API; они регистрируют свой собственный webhook, когда Zap/сценарий включается (нужен ключ с `settings:write`). Источник приложения Zapier находится в репозитории `Integrations` под `zapier/` (Zapier CLI, развертнутый с `zapier push`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — аддон, аутентифицированный API-ключом, который экспортирует People / Donations / Groups / Attendance по запросу.
- **[Claude](/docs/b1-admin/integrations/claude)** и **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — MCP клиенты, указанные на `/mcp`.

Для вашего собственного кода, **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) оборачивает все это: типизированный REST клиент, OAuth клиент (auth-code / refresh / device flow) и HMAC webhook верификатор с промежуточным ПО Express.

## Связанные страницы

- [API ключи](../api/api-keys) — самые простые учетные данные и каталог областей
- [Connected Apps & OAuth](../api/connected-apps) — потоки согласия с несколькими клиентами
- [Webhooks](../api/webhooks) — система исходящих событий
- [MCP сервер](../api/mcp) — оборачивающий слой интеграции AI
- [FreePlay Content Provider](../freeplay-content-provider) — становление входящим источником контента
- [Integrations (end-user)](/docs/b1-admin/integrations/) — готовые руководства по настройке соединителя
