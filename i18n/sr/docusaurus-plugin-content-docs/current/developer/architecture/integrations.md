---
title: "Интеграције и проширења"
---

# Интеграције и проширења

<div class="article-intro">

Све чиме трећа страна може да се повеже ради преко једног API-ја и једног модела ауторизације. Ова страна је мапа: именује сваку површину за интеграцију, показује како се повезују и упућује на детаљну референцу за сваку од њих. Ако правите нешто за B1, почните овде да изаберете прави улаз, па пратите линк до странице која га детаљно описује.

</div>

## Површине на први поглед

Постоји шест начина за улаз и излаз, и сви деле исти слој за ауторизацију:

- **[REST API](../api/api-keys)** — цела површина производа, доступна са bearer токеном из било ког језика.
- **[API кључеви](../api/api-keys)** — најједноставнији акредитив: токен `cak_…` везан за једну особу у једној цркви.
- **[OAuth 2.0 и повезане апликације](../api/connected-apps)** — сагласност по цркви за апликације са више закупаца; издаје исти JWT који добија корисник.
- **[Webhook-ови](../api/webhooks)** — потписани одлазни догађаји са гарантованом доставом.
- **[MCP сервер](../api/mcp)** — омотач за AI преко REST API-ја на `/mcp`.
- **[Провајдери садржаја](../freeplay-content-provider)** — улазни пут за спољне медијске библиотеке у FreePlay и B1 апликације.

Све осим провајдера садржаја служи се кроз један монолитни API (репозиторијум [Api](https://github.com/ChurchApps/Api)), чији су модули монтирани под стабилним основним путањама — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting` и `/mcp`.

## Како се све уклапа

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

Три стрелице говоре целу причу: трећа страна **позива** са bearer токеном (API кључ или OAuth JWT, укључујући и преко `/mcp`); API **позива назад** преко потписаних webhook-ова; а провајдери садржаја су једини **улазни пут садржаја** где сам B1 има улогу OAuth *клијента* који преузима медије из спољног извора.

## Заједнички модел ауторизације

Сваки акредитив — корисников JWT за пријаву, OAuth токен за приступ или API кључ — своди се на **исти `Principal`** и проверава се на исти начин. Не постоји посебан пут за „интеграциону ауторизацију“; акредитив са ограниченим овлашћењима једноставно је неразличит од корисника са нижим привилегијама.

### Структура JWT-а

B1 токени за приступ су HS256 JWT-ови који се издају у `Api/src/modules/membership/auth/AuthenticatedUser.ts`. Скуп претензија (claims):

| Претензија | Значење |
|---|---|
| `id`, `email`, `firstName`, `lastName` | Особа иза токена |
| `churchId` | Једина црква у којој токен делује — сидро за сво ограничавање података |
| `personId` | Запис особе унутар те цркве |
| `permissions` | Раван низ RBAC стрингова дозвола (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Чланство у групама / вођство група, за провере на нивоу групе |
| `membershipStatus` | Гост наспрам члана, за контролу самопослуживања |

OAuth токен за приступ има потпуно исти облик као JWT за пријаву. Једина разлика је то што је његов низ `permissions` био филтриран кроз одобрене опсege пре потписивања (`getCombinedApiJwt(...)`).

### Ограничење по цркви

`churchId` је претензија токена, а не параметар захтева, па акредитив никада не може да дође до других цркава. Сваки упит ка репозиторијуму филтрира по `churchId` позиваоца; API кључ или OAuth токен је везан за тачно једну цркву у тренутку издавања.

### Дозволе на основу улога на граници

Контролери ограничавају радње позивом `au.checkAccess(contentType, action)` над низом `permissions` токена. Опсези су **филтер, никад додела** (`Api/src/shared/auth/Scopes.ts`): `SCOPE_CATALOG` мапира сваки опсег (нпр. `people:read`, `donations:write`) на RBAC парове које дозвољава, а `filterPermissionsByScopes()` укршта то са *тренутним* дозволама особе при сваком разрешавању. Последице:

- Укидање дозволе у B1Admin-у прекида приступ акредитива при следећем захтеву — токени никад не одступају од улоге.
- Опсег може само да *уклања* дозволе, па акредитив са ограниченим опсегом никад не може да се подигне на администрацију сервера или домена (те дозволе су намерно неповезане ни са једним опсегом).
- API кључеви носе префикс `cak_`; `CustomAuthProvider.getUser()` то препознаје, хешира тајну и поново разрешава живе RBAC дозволе власника при сваком позиву.

Погледајте [API кључеви → Опсези](../api/api-keys#scopes) за потпун каталог.

## Референца о површинама

### REST API

Комплетна површина производа. Било која крајња тачка са аутентификацијом прихвата или JWT или `cak_…` API кључ у заглављу `Authorization: Bearer`. Не постоји посебна табела рута само за кључеве или само за OAuth. Модули и њихове основне путање налазе се под `Api/src/modules/*`.

### API кључеви

Лични токен за приступ `cak_<prefix>.<secret>`, који се прави у **B1Admin → Settings → Developer → API Keys**. Чува се само SHA-256 хеш; сирови кључ се приказује једном. Управља се на `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Најбољи је за скрипте једне цркве и за конекторе попут Zapier-а, Make-а и Google Sheets-а. → **[API кључеви](../api/api-keys)**

### OAuth 2.0 и повезане апликације

За апликације са више закупаца којима је потребна сагласност сваке цркве. Имплементирано у `Api/src/modules/membership/controllers/OAuthController.ts` под `/membership/oauth`. Сервер подржава три гранта:

- **Authorization Code** — `POST /oauth/authorize` (са аутентификацијом) враћа кратковечни код; `POST /oauth/token` са `grant_type=authorization_code` размењује га за JWT за приступ (≈ 7 дана) и refresh токен (≈ 90 дана). Јавни клијенти без тајне морају да користе PKCE (само `S256`): `code_challenge` при овлашћивању и одговарајући `code_verifier` при размени токена.
- **Device Code** (RFC 8628) — `POST /oauth/device/authorize` издаје `user_code`; корисник га одобрава у B1Admin-у (`/oauth/device/approve`); уређај проверава `/oauth/token` са грантом device-code. Намењено је за ТВ-е, киоске и CLI алате без прегледача.
- **Refresh Token** — `grant_type=refresh_token` издаје нови токен за приступ; јавни клијенти без тајне могу га изоставити.

Јавни клијенти могу и сами да се региструју позивом `POST /oauth/register` (RFC 7591, динамичка регистрација клијента); добијају `client_id` без тајне, а њихови redirect URI-ји морају бити `https` или loopback.

**Повезана апликација** је приказ одобреног токена намењен администратору цркве; може се видети и опозвати на `/membership/oauth/connections`. Контролер такође садржи OAuth **relay-session** мост (`/oauth/relay/*`) који омогућава уређају без прегледача да заврши пријаву код *спољног* провајдера. → **[Повезане апликације и OAuth](../api/connected-apps)**

### Webhook-ови

Једина одлазна површина. Црква претплаћује јавни HTTPS крајњи пункт на догађаје. Када наступи одговарајућа промена, `WebhookDispatcher.emit(churchId, event, payload)` обогаћује корисна оптерећења која садрже само ID-јеве приказним именима (`personName`, `groupName`, `formName`; претраге се извршавају тек када се претплата подудари), бележи испоруку, а позадински радник шаље потписани JSON омотач уз поновне покушаје са паузама и поновну испоруку. Механизам је у `Api/src/shared/webhooks/`, а CRUD по цркви је под `/membership/webhooks` (`WebhookController.ts`). Поље `connectorType` преобликује тело за Slack и Discord. Конектор `mailchimp` иде даље и преузима цео HTTP разговор (метод, URL и ауторизација по догађају према Mailchimp API-ју; акредитиви су шифровани у `webhooks.connectorConfig`). → **[Webhook-ови](../api/webhooks)**

### MCP сервер

Омотач намењен AI-ју на `/mcp` (`Api/src/modules/mcp/`). Три општа алата — `list_endpoints`, `describe_endpoint` и `api_call` — динамички излажу целу REST површину било ком MCP клијенту. Аутентификација је исти bearer токен као и све остало. За клијенте који се пријављују преко OAuth-а (claude.ai прилагођени конектори), одговор 401 са `/mcp` носи заглавље `WWW-Authenticate` које упућује на `/.well-known/oauth-protected-resource`. Путања `/.well-known/oauth-authorization-server` оглашава крајње тачке `/membership/oauth`, динамичку регистрацију, PKCE и страницу за сагласност B1Admin-а на `/oauth` (`WellKnownController.ts`, `OAuthMetadata.ts`). `api_call` поново улази у Express стек у истом процесу, па се сва правила о дозволама и ограничењима по цркви и даље примењују. → **[MCP сервер](../api/mcp)**

### Провајдери садржаја

Улазни пут садржаја налази се у посебном пакету `Packages/content-providers` (`@churchapps/content-providers`), а не у API-ју. Сваки провајдер имплементира интерфејс `IProvider` (`src/interfaces.ts`) — `browse`, `getPlaylist`, `getInstructions` и куке за аутентификацију — и сам се региструје у регистар `Map` (`src/providers/registry.ts`). Овде је **B1 OAuth клијент**: провајдер декларише `AuthType` вредност `none`, `oauth_pkce`, `device_flow` или `form_login`, а заједничке помоћне функције (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) изводе клијентски PKCE или device flow према спољном извору. Данас постоји једанаест провајдера, укључујући Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church и B1.church, који снабдевају FreePlay и B1 апликације. → **[FreePlay провајдер садржаја](../freeplay-content-provider)**

**Годишњи планови** теку овим путем. Издавач курикулума (са `lessons.edit`) одржава уређене низове недеља 1/2/3 у администрацији Lessons.church (табеле `yearPlans` и `yearPlanWeeks` у `LessonsApi`, са опционалним `startMonth` и по недељи вредношћу `anchor`: `easter` или `christmas`). `GET /yearPlans/public` на LessonsApi-ју анонимно служи активне планове и попуњава програм, студију и место сваке недеље из стабла лекција. Функција B1Admin-а **Serving → Plans → Schedule Lesson → Apply Year Plan** користи ту крајњу тачку и уписује по један DoingApi план за сваку укључену недељу (`providerId=lessonschurch`, `providerPlanId=/lessons/{programId}/{studyId}/{lessonId}/{venueId}`). Планови са `startMonth` разрешавају везане недеље према изабраној години (Ускрс по грегоријанском рачуну, Божић као недеља на или пре 25. децембра) и попуњавају периоде између њих. Планови без `startMonth` и даље мапирају недељу N на `startDate + (N−1)×7` дана. Недеље из спољних OLF провајдера или са непотпуном путањом се прескачу у време примене. Цркве уређују настале планове као и све остале, а FreePlay пушта све што је на плану.

## Резиме

| Површина | Механизам ауторизације | Смер | Где је имплементирано | Референца |
|---|---|---|---|---|
| REST API | `Bearer` JWT или кључ `cak_…` | Улазни | `Api/src/modules/*` | [API кључеви](../api/api-keys) |
| API кључеви | `cak_` токен хеширан SHA-256 | Акредитив | `Api/.../membership/controllers/ApiKeyController.ts` | [API кључеви](../api/api-keys) |
| OAuth 2.0 / Повезане апликације | Код за ауторизацију (PKCE) · device · refresh → JWT; динамичка регистрација клијента | Улазни | `Api/.../membership/controllers/OAuthController.ts` | [Повезане апликације](../api/connected-apps) |
| Webhook-ови | Тајна за сваки webhook, потпис HMAC-SHA256 | Одлазни | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhook-ови](../api/webhooks) |
| MCP сервер | `Bearer` JWT, OAuth JWT (откривен преко `/.well-known`) или кључ `cak_…` | Улазни (AI) | `Api/src/modules/mcp/` | [MCP сервер](../api/mcp) |
| Провајдери садржаја | По провајдеру: нема / OAuth PKCE / device / форма | Улазни садржај | `Packages/content-providers/` | [Провајдер садржаја](../freeplay-content-provider) |

## Готови конектори

Уместо да сви граде од нуле, ChurchApps испоручује конекторе изнад горе наведених површина:

- **[Slack и Discord](/docs/b1-admin/integrations/slack-discord)** — `connectorType` за webhook преобликује стандардни омотач у поруку за ћаскање; подешава се искључиво у B1Admin-у, без налога треће стране.
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)** — `connectorType` `mailchimp` синхронизује особе у Mailchimp публику и мапира припадност групама и листама на ознаке (`Api/src/shared/webhooks/MailchimpConnector.ts`). За разлику од конектора за ћаскање, сам шаље своје ауторизоване захтеве за сваки догађај (upsert, archive, tag) уместо да шаље POST на URL који је доставила црква. API кључ и ID публике чувају се шифровани у `webhooks.connectorConfig`. Једносмерно је и користи само стандардна поља за спајање.
- **[Zapier](/docs/b1-admin/integrations/zapier)** и **[Make](/docs/b1-admin/integrations/make)** — окидају се на догађаје webhook-а и делују преко REST API-ја. Сами региструју свој webhook када се Zap или сценарио укључи (потребан је кључ са `settings:write`). Изворни код Zapier апликације налази се у репозиторијуму `Integrations` под `zapier/` (Zapier CLI, постављање помоћу `zapier push`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — додатак са аутентификацијом API кључем који на захтев извози особе, донације, групе и присуство.
- **[Claude](/docs/b1-admin/integrations/claude)** и **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — MCP клијенти усмерени на `/mcp`.

За ваш сопствени код, **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) омотава све то: типизирани REST клијент, OAuth клијент (auth-code, refresh и device flow) и HMAC верификатор webhook-ова са Express middleware-ом.

## Повезане странице

- [API кључеви](../api/api-keys) — најједноставнији акредитив и каталог опсега
- [Повезане апликације и OAuth](../api/connected-apps) — токови сагласности за више закупаца
- [Webhook-ови](../api/webhooks) — систем одлазних догађаја
- [MCP сервер](../api/mcp) — AI омотач за интеграцију
- [FreePlay провајдер садржаја](../freeplay-content-provider) — постајање улазним извором садржаја
- [Интеграције (за крајње кориснике)](/docs/b1-admin/integrations/) — водичи за подешавање готових конектора
