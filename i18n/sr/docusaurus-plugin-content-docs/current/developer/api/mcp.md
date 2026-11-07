---
title: "MCP сервер"
---

# MCP сервер

<div class="article-intro">

B1 API укључује [MCP (Model Context Protocol)](https://modelcontextprotocol.io) сервер на путањи `/mcp`. Сваки AI клијент који подржава MCP — claude.ai прилагођени конектори, Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor или ваш сопствени — може да се повеже на њега и позове основни REST API у име аутентификованог корисника цркве. То је танак, општи омотач: три општа алата описују целу површину API-ја динамички, уместо да се сваки endpoint посебно модeлује, плус један алат са водичем за домен, за градитеља сајтова.

</div>

<div class="prereqs">
<h4>Пре почетка</h4>

- [B1 API кључ](./api-keys) (`cak_…`) са дозволама (scopes) које клијент треба да има, или MCP клијент који може да се пријави путем OAuth-а (видети [OAuth откривање](#oauth-discovery))
- Доступан B1 API хост — `https://api.churchapps.org` за хостоване цркве или ваша сопствена инсталација
- MCP клијент. За подешавање за крајње кориснике видети [Claude](/docs/b1-admin/integrations/claude) и [ChatGPT](/docs/b1-admin/integrations/chatgpt)

</div>

## Крајња тачка

```
POST /mcp
Content-Type: application/json
Accept: application/json, text/event-stream
Authorization: Bearer cak_<prefix>.<secret>
```

| Аспект | Вредност |
|---|---|
| **Путања** | `/mcp` (у односу на API хост) |
| **Метода** | Само `POST` — захтев/одговор и SSE стриминг се обављају на истој крајњој тачки |
| **Транспорт** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **Модел сесије** | Без стања (stateless). За сваки захтев се прави нова MCP серверска инстанца — без ID-а сесије и без наставка |
| **Аутентификација** | Bearer токен. `cak_…` API кључеви и B1 JWT-ови (укључујући OAuth приступне токене) функционишу; разрешавање је исто као и за било коју другу аутентификовану крајњу тачку |

Захтев чије `Authorization` заглавље недостаје или је неважеће враћа:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

са HTTP статусом 401 и заглављем `WWW-Authenticate: Bearer resource_metadata="<api>/.well-known/oauth-protected-resource"`, које OAuth-подржавајући клијенти прате да би започели пријаву.

На хостованом API-ју (продукција и демо), `/mcp` се служи преко API Gateway HTTP API-ја, а не преко REST API-ја који се користи за остале крајње тачке. REST API преименује `WWW-Authenticate` у `x-amzn-remapped-www-authenticate` на Lambda proxy одговорима, што је код клијената попут ChatGPT-а остављало голи 401 без начина да започну пријаву. HTTP API прослеђује заглавље непромењено.

## Алати

Три општа алата и један водич. Модел користи `list_endpoints` за откривање, `describe_endpoint` да сазна облик корисног терета, `api_call` за стварно позивање API-ја, и `describe_page_builder` када задатак укључује садржај сајта.

### `list_endpoints`

Враћа комплетан попис регистрованих REST рута, филтрираних опционалним подниском и/или HTTP глаголом. Сваки унос садржи назив контролера и API дозволе које су највероватније потребне.

**Улаз:**

| Поље | Тип | Опис |
|---|---|---|
| `filter` | string (опционално) | Подниска без разлике у величини слова, упоређује се са путањом, нпр. `"people"` |
| `method` | enum (опционално) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**Излаз:** JSON документ облика

```json
{
  "total": 24,
  "endpoints": [
    {
      "method": "GET",
      "path": "/membership/people",
      "controller": "PersonController.getAll",
      "likelyScopes": ["people:read", "people:write"]
    }
  ]
}
```

Попис се прави једном, при покретању API-ја, из живе табеле рута — све што може да се позове помоћу `curl`-а појављује се овде.

### `describe_endpoint`

Враћа кратак опис и, где је доступан, ручно курирани пример тела захтева и одговора за једну крајњу тачку.

**Улаз:**

| Поље | Тип | Опис |
|---|---|---|
| `method` | string | HTTP глагол |
| `path` | string | Пуна путања како је вратио `list_endpoints` |

**Излаз:** за курироване крајње тачке, пример са `summary`, `requestBody` и `responseSample`. За некуриноване крајње тачке, резервна порука која упућује модел да прво позове `GET` да види облик. Око десетак најпрометнијих рута (people, groups, donations, attendance, funds) је курирано.

### `api_call`

Позива изабрану REST крајњу тачку, у самом процесу, кроз исти Express middleware стек као и обичан HTTP захтев — аутентификација, парсирање тела, аудит логовање и ограничавање по цркви важе све.

**Улаз:**

| Поље | Тип | Опис |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | string | Путања укључујући евентуални модул-префикс, нпр. `/membership/people` |
| `query` | object (опционално) | Плитак објекат са параметрима query стринга |
| `body` | any (опционално) | JSON тело захтева — обично низ објеката модела за `POST` |

**Излаз:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* JSON одговор контролера */ ]
}
```

Резултат алата је означен са `isError: true` за сваки одговор са статусом ≥ 400.

### `describe_page_builder`

Једини неопшти алат: статички, самосталан водич за прављење страница сајта кроз `/content/*` крајње тачке — модел података Page → Section → Element, ток креирања, сваки `elementType` са обликом његовог `answersJSON`, подешавања на нивоу секције као што су облици подели `dividerTop`/`dividerBottom`, и примерак од почетка до краја. Не узима улаз и одражава каталог елемената који се одржава у B1Admin уређивачу (видети [Архитектура градитеља сајтова](../architecture/website-builder)). Очекује се да агенти позову овај алат једном пре креирања или измене садржаја странице, а затим делују преко `api_call`.

## Модел аутентификације

Сам MCP захтев пролази кроз `CustomAuthProvider.getUser()` — исти пут који користи свака аутентификована B1 крајња тачка. `cak_…` bearer се разрешава у `Principal` чије су дозволе тренутни RBAC издаваоца кључа, **укрштене** са додељеним дозволама кључа. Ово укрштање се поново израчунава за сваки захтев, па:

- Уклањање дозволе из кључа (брисањем и поновним креирањем) прекида приступ при следећем позиву.
- Уклањање дозволе са основне особе у B1Admin-у прекида приступ при следећем позиву, чак и ако кључ још постоји.

За угнежђене `api_call` позиве, оригинално `Authorization` заглавље се копира на синтетички захтев, па `CustomAuthProvider` ради поново и укрштање дозвола се примењује за сваки позив. Токени се не кеширају.

## Листа блокираних путања

Мали скуп рута није доступан преко `api_call`-а, чак ни са валидним кључем:

| Образац | Разлог |
|---|---|
| `/giving/donate/webhook/*` | Крајње тачке провајдерских webhook-ова очекују необрађена, потписом проверена тела од Stripe/PayPal — нису намењене општим позиваоцима |
| `/membership/oauth/clients*` | Регистрација OAuth клијената је резервисана за оператера |
| `/membership/people/apiEmails` | Ограничено оператерским `jwtSecret`-ом, а не корисничким дозволама |
| Било која рута која очекује `multipart/form-data` | Отпремања датотека нису погодна за JSON-RPC |

Блокирана путања враћа `isError: true` резултат алата са описном поруком; базна рута никада није позвана.

## Ограничење величине одговора

Тело сваког `api_call` одговора је ограничено на **64 KB** снимљеног излаза. Ако упит премаши ограничење, одговор садржи `"truncated": true` и од модела се очекује да покуша поново са ужим параметрима упита. Ово спречава да један одговор алата пређе контекстни прозор клијента.

## Ограничење броја захтева

Не постоји ограничење броја захтева на нивоу апликације за `/mcp`. Ограничавање се препушта API Gateway-у / Lambda конкурентности у продукцији, а у самохостованим инсталацијама ономе што ваш reverse proxy наметне.

## OAuth откривање

MCP сервер објављује OAuth 2.1 метаподатке, тако да клијенти који се повезују само на OAuth-откривене сервере — посебно UI „Add custom connector” на Claude.ai — могу да пријаве корисника без налепљеног кључа. `/mcp` је заштићени ресурс, постојећи [OAuth провајдер](./connected-apps) под `/membership/oauth` је сервер за ауторизацију, а страница `/oauth` у B1Admin-у је екран за сагласност.

| Крајња тачка | Сврха |
|---|---|
| `GET /.well-known/oauth-protected-resource` (такође `/.well-known/oauth-protected-resource/mcp`) | Метаподаци заштићеног ресурса (RFC 9728): `resource` је `<api>/mcp`, `authorization_servers` је корен API-ја, `scopes_supported` наводи сваку [дозволу API кључа](./api-keys#scopes) |
| `GET /.well-known/oauth-authorization-server` | Метаподаци сервера за ауторизацију (RFC 8414): `authorization_endpoint` је B1Admin `/oauth`, `token_endpoint` је `/membership/oauth/token`, `registration_endpoint` је `/membership/oauth/register` |
| `POST /membership/oauth/register` | Динамичка регистрација клијента (RFC 7591) |

Ток који извршава клијент попут claude.ai:

1. `POST /mcp` без токена враћа 401 са `WWW-Authenticate` заглављем које показује на метаподатке заштићеног ресурса.
2. Клијент чита оба документа са метаподацима, затим се региструје помоћу `POST /membership/oauth/register`, шаљући `client_name`, `redirect_uris` и опционално `scope`. Сваки самостално регистрован клијент је **јавни** клијент: не издаје се тајна и одговор садржи `token_endpoint_auth_method: "none"`. Адресе за преусмеравање морају бити `https`, или `http` на loopback адреси (`localhost`, `127.0.0.1`, `[::1]`); највише 10 по клијенту. Регистрација је ограничена на 20 по сату по IP адреси.
3. Корисник се шаље на B1Admin `/oauth` са `code_challenge` и `code_challenge_method=S256`. Страница за сагласност наводи сваку затражену дозволу једноставним језиком (или „Све што твој B1 налог може да приступи” када ниједна није затражена), приказује хост на који ће корисник бити враћен и напомиње када се апликација сама регистровала. Корисник кликне **Allow**.
4. Клијент мења код на `/membership/oauth/token` са `grant_type=authorization_code` и својим `code_verifier`, а касније освежава са `grant_type=refresh_token`. Прихватају се и form-encoded и JSON тела.
5. Добијени приступни токен је B1 JWT са дозволама, који се користи као bearer на `/mcp`.

Правила PKCE-а: прихвата се само `S256`. Клијент без тајне мора да пошаље `code_challenge` при ауторизацији и одговарајући `code_verifier` при размени токена; поверљиви клијенти (са тајном) могу и даље да користе само тајну. Адресе за преусмеравање морају се тачно поклапати са регистрованом адресом.

Клијенти који у својој конфигурацији прихватају статични bearer токен — Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, прилагођени код — могу и даље да користе `cak_…` кључ.

## Локални развој

MCP крајња тачка се монтира заједно са свим осталим када се API покреће локално:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

При покретању, лог линија `📡 MCP server ready at /mcp — N routes in inventory` потврђује да је попис изграђен.

Проверите га помоћу MCP Inspector-а:

```bash
npx @modelcontextprotocol/inspector
```

У Inspector UI-ју, усмерите га на `http://localhost:8084/mcp` и поставите `Authorization` заглавље на `Bearer cak_<prefix>.<secret>`. Прво позовите `list_endpoints`; требало би да видите комплетан списак рута. Затим, `api_call({ method: "GET", path: "/membership/people" })` би требало да врати ваше локалне seed особе.

## Распоред кода

MCP сервер се налази у `src/modules/mcp/` у Api репозиторијуму. Важније датотеке:

| Датотека | Сврха |
|---|---|
| `McpController.ts` | `@controller("/mcp")`; повезује `StreamableHTTPServerTransport` за сваки захтев и шаље `WWW-Authenticate` изазов при 401 |
| `WellKnownController.ts` / `OAuthMetadata.ts` | Служи OAuth документе за откривање из `/.well-known` |
| `McpServer.ts` | Прави MCP `Server` и региструје четири алата |
| `RouteInventory.ts` | Прелази inversify-express-utils метаподатке при покретању да набрoји руте |
| `internalDispatch.ts` | Синтетички `req`/`res` који поново улази у Express апликацију у самом процесу |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | Курирани примери захтева/одговора за најпрометније крајње тачке |

## Повезано

- [API кључеви](./api-keys)
- [Webhook-ови](./webhooks)
- [Повезане апликације (OAuth)](./connected-apps)
- [Claude — подешавање за крајње кориснике](/docs/b1-admin/integrations/claude)
- [ChatGPT — подешавање за крајње кориснике](/docs/b1-admin/integrations/chatgpt)
