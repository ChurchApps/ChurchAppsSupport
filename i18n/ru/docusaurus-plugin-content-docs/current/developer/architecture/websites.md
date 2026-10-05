---
title: "Маршрутизация веб-сайтов и мультисайт"
---

# Маршрутизация веб-сайтов и мультисайт

<div class="article-intro">

Одна церковь теперь может обслуживать более одного отдельного веб-сайта, и каждый может находиться на поддомене `*.b1.church` или на полностью пользовательском домене, принадлежащем церкви. На этой странице представлена слой маршрутизации, который находится *под* конструктором: как входящий запрос разрешается в церковь **и** на конкретный сайт, модель данных мультисайта (sentinel `siteId`, который сохраняет каждый существующий сайт без изменений), и преимущество пользовательского домена — самоуправляемый прокси Caddy на EC2, который заканчивает TLS и переписывает каждый доменный домен церкви на его `*.b1.church` восстановленный. Для того, что на самом деле отображается после разрешения запроса — дерево страницы/раздела/элемента — см. [Website Builder](./website-builder).

</div>

## Обзор

```
   grace.b1.church              www.gracechurch.org  (custom domain)
   (b1.church subdomain)                  │
          │                               ▼
          │             ┌──────────────────────────────────────────┐
          │             │ Caddy edge — EC2 3.23.251.61              │
          │             │             (proxy.b1.church)             │
          │             │  • terminates TLS (per-domain LE cert)    │
          │             │  • rewrites Host → {sub}.b1.church        │
          │             │  • reverse-proxies to B1App               │
          │             └────────────────────┬─────────────────────┘
          │                  Host = {sub}.b1.church
          ▼                                  ▼
   ┌────────────────────────────────────────────────────────────┐
   │ B1App src/middleware.ts                                     │
   │  • always: delete any client-supplied x-site (anti-spoof)   │
   │  • internal *.b1.church Host ⇒ domains lookup stays inert   │
   │  • raw custom Host (bypassing Caddy) ⇒ lookup → set x-site  │
   └───────────────────────────┬────────────────────────────────┘
                               ▼  next.config.mjs → host first-label → /[sdSlug]/…
              ┌─────────────────────────────────────────────────┐
              │ [sdSlug] · ConfigHelper.load(sdSlug)             │
              │   GET /membership/churches/lookup/?subDomain=…   │
              │   → { id, name, subDomain, siteId? }             │
              │   threads ?siteId= into every content call:      │
              │   /content/pages/:id/tree · /globalStyles ·      │
              │   /blocks/public/footer · /links · sitemap       │
              └─────────────────────────────────────────────────┘

  domain save/delete (B1Admin Settings→Domains → POST /membership/domains)
        └─ best-effort CaddyHelper.updateCaddy()  (wrapped, non-fatal, 10s timeout)
  Caddy reads the domains table itself via two anonymous endpoints:
        GET /membership/domains/authorize  — on-demand-TLS `ask` (200 known / 404 unknown)
        GET /membership/domains/hostmap    — host→{sub}.b1.church map (5-min refresh)
```

Три правила действуют во всем этом слое:

1. **Sentinel сохраняет все в обратной совместимости.** `siteId = ''` — это основной сайт. Каждая страница, блок, ссылка, глобальный стиль и строка домена, которые существовали до этой функции, несут `''` и отображаются точно так же, как раньше. *Второй* веб-сайт — это просто набор строк с непустым `siteId`, и любой вызов конечной точки содержимого без `?siteId=` возвращает основной сайт — byte-for-byte старый запрос.
2. **Разрешение основано на метке хоста и сходится.** Поддомен `*.b1.church` маршрутизируется по его метке хоста напрямую; пользовательский домен переписывается на его метку `{sub}.b1.church` на краю Caddy перед тем, как B1App ее видит (с поиском БД middleware, который штампует заголовок `x-site` как резервный для любого необработанного пользовательского `Host`). Обе ноги приземляются на тот же маршрут `[sdSlug]` и тот же вызов `churches/lookup`, поэтому нижестоящий рендеринг идентичен.
3. **Край Caddy без состояния над одним источником истины.** Пользовательские домены заканчиваются на самоуправляемый прокси Caddy на EC2, который переписывает каждый домен на его восстановленный `{sub}.b1.church`. Сохранение домена запускает одиночный best-effort `CaddyHelper.updateCaddy()`, и Caddy также читает таблицу `domains` напрямую (конечные точки `authorize` и `hostmap` ниже). Таблица авторитетна — недостижимый Caddy никогда не может не пройти сохранение.

## Разрешение сайта

### Поддомены `*.b1.church`

`B1App/next.config.mjs` переписывает входящие запросы по хосту. Правило хоста с шаблоном `(?<subdomain>.*?)\..*` захватывает **первую метку** хоста и переписывает `/` и `/:path*` в `/{subdomain}` — сегмент App-Router `[sdSlug]`. Таким образом, `grace.b1.church/about` становится `/grace/about`.

Внутри `src/app/[sdSlug]/`, `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) вызывает `GET /membership/churches/lookup/?subDomain={sdSlug}`. Ответ `ChurchController.getBySubDomain` теперь имеет две ветви:

| Slug matches | Response | Meaning |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | Основной сайт этой церкви |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | **Вторичный сайт** — контроллер возвращается к `sites`, разрешает владеющую церковь и повторяет отправленный слаг плюс дополнительный `siteId` |

Этот дополнительный `siteId` — это единственное, что отличает запрос вторичного сайта от первичного; все остальное в конвейере общее.

### Пользовательские домены

Домен, принадлежащий церкви, заканчивается на **край Caddy** (подробно описан ниже), который переписывает заголовок `Host` на `{sub}.b1.church` сайта перед проксированием к B1App. Таким образом, на нормальном пути B1App получает *внутренний* хост `*.b1.church` и разрешает его по метке хоста точно как встроенный поддомен — поиск БД middleware никогда не срабатывает. `src/middleware.ts` по-прежнему работает на каждом запросе, но с одной постоянно включенной работой и одним резервным:

1. **Всегда** — он **удаляет любой заголовок `x-site`, предоставленный клиентом**. Этот заголовок — поддельный ввод переписи и ему доверяют только при установке самим middleware; его удаление — это настоящая работа middleware за Caddy.
2. **Резервный, только не-внутренний `Host`** — для необработанного пользовательского домена `Host`, который достигает B1App *без* переписи Caddy, он вызывает `GET /membership/domains/public/lookup/{host}` и, если это возвращает `subDomain`, устанавливает `x-site: {subDomain}.b1.church`. За Caddy эта ветвь инертна, поскольку `Host` уже `*.b1.church`.

Внутренние хосты — `localhost`, `b1.church` и суффиксы `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` — полностью пропускают поиск (они уже разрешены переписью host-label или являются хостами preview/deploy).

Сам поиск (`DomainRepo.loadByName`) left-joins `domains → churches` и `domains → sites` и возвращает `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` — назначенный вторичный сайт subdomain, если домен указывает на один, в противном случае на церковь. Сначала он соответствует точному хосту; если этот хост начинался с `www.` и пропустил, он повторяется **один раз** против голого апекса.

Назад в `next.config.mjs`, правила переписи `x-site` размещены **перед** универсальными правилами хоста, поэтому они выигрывают. `x-site: grace.b1.church` → первая метка `grace` → `[sdSlug] = grace`, и оттуда разрешение идентично пути поддомена (тот же `churches/lookup`, тот же `siteId`).

:::info
Заголовок `x-site` ненадежен со стороны. Middleware безусловно удаляет любой входящий `x-site` перед избирательной установкой своего собственного, и правила переписи видят только установленное middleware значение — клиент не может заставить себя на контент другой церкви, отправив заголовок.
:::

Два операционных деталей на middleware:

- **Кэш.** Результат каждого хоста (попадание *или* подтвержденный пропуск — никогда ошибка сети) кэшируется на **10 минут** в памяти `Map`, на изолят serverless.
- **Matcher.** Matcher намеренно повторно включает `/sitemap.xml`, `/robots.txt` и `/manifest.webmanifest`. Его первый шаблон исключает пути с точками, которые в противном случае опустили бы эти файлы; они добавлены обратно, так что пользовательский домен SEO/PWA файлы для каждой церкви также получают заголовок `x-site`.
- **Канонический заголовок.** Для страниц церкви middleware добавляет заголовок ответа `Link: <{proto}://{host}{path}>; rel="canonical"`, называя хост, с которого страница была фактически обслужена — поддомен или пользовательский домен (`helpers/canonicalLink.ts`). Он пропускается на non-church хостах (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`) и на `/mobile`, `/login`, `/logout` и сгенерированных файлах robots/sitemap/manifest.

### Отключенный общественный веб-сайт

Церковь может включить **Disable Public Website** в B1Admin (параметр содержимого на уровне церкви `hidePublicSite = "true"`). Затем сайт обслуживает только свои маршруты, ориентированные на членов:

- **B1App middleware** ищет поддомен (`/membership/churches/lookup` затем `/content/settings/public/:churchId`) и перенаправляет анонимные запросы для любого пути вне списка разрешений на `/login?returnUrl={path}{query}`. Список разрешений (`helpers/publicSite.ts`) — это `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register` и файлы manifest/robots/sitemap. Только подтвержденные ответы кэшируются (60 секунд в производстве, поскольку вызов revalidate админ не может очистить этот map для каждого экземпляра; не кэшируется в dev/test). Ошибка API обслуживает сайт, а не блокирует всех.
- **Вошедшие члены видят полный сайт.** Запрос, несущий неистекший cookie `jwt` (middleware `hasSession()` декодирует полезную нагрузку `exp` без проверки подписи — это мягкие gate, не контроль доступа), пропускает перенаправление, поэтому после входа член возвращается на страницу, которую он запросил, и видит обычные страницы, встроенные страницы (Groups, Sermons, etc.) и навигацию заголовка. Компоненты страницы и `Header` больше не проверяют `hidePublicSite`.
- **`robots.txt`** запрещает все, как на хостах noindex.
- **API.** `GET /content/pages/public/:churchId` (список страниц sitemap) возвращает `[]`, поэтому анонимные вызывающие не могут указать страницы.

### Потокообработка `siteId`

`ConfigHelper` хранит разрешенный `siteId` на его per-request `ConfigurationInterface` (мемоизировано с React `cache()`) и добавляет `?siteId=` к вызовам содержимого, которые он и компоненты страницы делают — **условно**: пустой `siteId` (основной поддомен церкви) опускает параметр полностью. Потокообработанные конечные точки — это дерево страниц (`/content/pages/:id/tree`), список общественных страниц, используемый sitemap (`/content/pages/public/:id`), глобальные стили (`/content/globalStyles/church/:id`), навигационные ссылки (`/content/links/church/:id`) и блок автономного footer (`/content/blocks/public/footer/:id`). На нормальном пути рендеринга footer поступает внутри дерева страниц (разделы, помеченные `zone: "siteFooter"`), уже получены с `siteId`, поэтому нет gap unfetched footer.

Портал членов (B1App `mobile`) намеренно сидит вне этого: `loadChurchAppearance.ts` разрешает церковь через `churches/lookup`, но читает церковь-уровень `/settings/public/{id}` и никогда не потокообрабатывает `siteId` — портал в v1 ширина церкви (см. ниже).

## Несколько веб-сайтов на одну церковь

### Модель данных

Новая таблица `membership.sites` намеренно крошечная:

| Column | Type | Notes |
|--------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Владеющая церковь |
| `name` | `varchar(255)` | Отображаемое имя (например, "Español", "Youth") |
| `subDomain` | `varchar(45)` | **Unique index** — глобальное пространство имен (ниже) |

Размещение сайта — это тогда один nullable-free столбец, добавленный к таблицам содержимого и домена:

| Table (module) | Column | `''` means |
|----------------|--------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Домен обслуживает основной сайт |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Основной сайт — и на **`blocks`**, `''` дополнительно означает *общегиповый для всех сайтов* |

Две миграции добавляют все это (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Поскольку столбец по умолчанию `''`, каждая существующая строка сохраняет сегодняшнее поведение без заполнения.

**Глобальное пространство имен поддомена.** `sites.subDomain` делит *один* namespace с `churches.subDomain` — поддомен сайта никогда не может столкнуться с поддоменом церкви или другим сайтом. Это обеспечивается на **обоих** путях сохранения: `SiteController.save` отклоняет slug, который попадает в `churches` или `sites`, и `ChurchController.validateSave` делает то же самое в обратном. Уникальный индекс на `sites.subDomain` поддерживает его на уровне базы данных.

**Уникальность страниц** расширена с `(churchId, url)` на `(churchId, siteId, url)`, поэтому два сайта одной церкви могут каждый владеть своим собственным `/about`.

### Содержимое, специфичное для каждого сайта, с резервными копиями

Каждый сайт-scoped контент **list/tree** конечной точки принимает опциональный `?siteId=` (отсутствие ⇒ `''` = основной): дерево/список/публичные страницы, список/по-типу/footer блоков, ссылки (anon / filtered / all) и глобальные стили. Разделы и элементы *не* scoped напрямую — они наследуют через свою родительскую страницу или блок.

Два резолюционных цепочки делают интересную работу:

- **Глобальные стили — `site → primary → default`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` возвращает строку сайта; если вторичный сайт не имеет, он возвращает **основную (`''`) строку как есть** (сохраняя основное `id`/`siteId`, которое клиент использует для copy-on-write); если нет основного либо, `GlobalStyleController` возвращает hard-coded palette/fonts по умолчанию.
- **Блок footer — site-specific побеждает, shared падает назад.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` возвращает общегиповые (`''`) *и* site-specific строки; резолвер выбирает footer сайта, если присутствует, иначе общегиповый. Та же логика работает как в `TreeHelper.insertBlocks` (tree страницы), так и в автономной конечной точке `/content/blocks/public/footer/:churchId`.

### Каскад удаления сайта

`SiteController.delete` (gated на membership Settings→Edit permission) разбирает вторичный сайт в три шага:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` каскадирует весь контент, которым владеет сайт: его **pages** → их разделы, элементы, `pageHistory` и `posts`; его собственные **blocks** → их разделы, элементы и `pageHistory`; его **links** и **globalStyles**. Guard отказывает запуск для `''` — основной/shared sentinel никогда не каскадируется.
2. `DomainRepo.clearSiteId` **переназначает** домены сайта обратно на основной (`siteId → ''`) вместо удаления, поэтому пользовательский домен пережи deletion сайта.
3. Строка `sites` удалена и маршруты Caddy пересинхронизированы (best-effort).

### Поверхность B1Admin

| Capability | Where | Mechanism |
|-----------|-------|-----------|
| Переключатель сайта | `useSiteSelection` + `SiteSwitcher` (empty = "Main Website") | Читает параметр URL `?site=` и потокообрабатывает его как `?siteId=` в вызовы ContentApi. Присутствует на трех областях Site **list** — **Pages**, **Blocks**, **Appearance** — но *не* редакторах страницы/блока, которые несут `siteId` на записи |
| Создание/удаление сайтов | `SitesDialog`, открыт из записи "Manage websites…" переключателя | `POST /membership/sites` / `DELETE /membership/sites/:id` (name + subDomain). Gated на membership Settings→Edit permission (`Permissions.settings.edit` server-side; `Permissions.membershipApi.settings.edit` в B1Admin). **Только создание/удаление — в v1 нет UI переименования** |
| Per-domain назначение сайта | `DomainSettingsEdit` под Settings→Domains | Dropdown сайта per-row публикует `siteId` per domain на `/membership/domains`. Столбец скрывается, если API возвращает no sites (старший backend) |
| Copy-on-write стили | `StylesManager.prepareForSave` | Когда загруженная строка global-style `siteId` не совпадает с выбранным сайтом (т.е. API вернула унаследованный основной как резервный), она опускает основное `id` и штампует текущий `siteId`, принуждая **insert** новой site-specific строки вместо перезаписи основного. Тот же fork-on-mismatch применяется к footer блоку сайта |

:::info
**Что остается в масштабе церкви в v1 (намеренный выбор размещения, не data-model ограничение):** **blog** (`BlogPage` не имеет переключателя и загружает `/posts` с no `siteId`), **site widgets** (banner объявления + launcher), **redirects**, **logo / GA4 / church settings** и **member portal** (B1App mobile). Обратите внимание, что это *не* "все Appearance" — глобальные стили вторичного сайта (palette, fonts, typography, spacing, nav, custom CSS) **are** per-site через путь copy-on-write выше; только sub-panels banner/launcher/redirects/logo страницы Appearance остаются в масштабе церкви.
:::

## Пользовательские домены: край Caddy (план static-config)

:::info
**Направление пересмотрено 2026-07-02.** Более ранний план по переводу пользовательского домена на Vercel-управляемые домены был **отменен**, и весь код регистрации домена Vercel (`VercelHelper`, его env vars `vercelToken`/`vercelProjectId`/`vercelTeamId`, SSM params и health entries) был удален из Api. Самоуправляемый **Caddy proxy на EC2 остается** как постоянный край пользовательского домена. Единственная оставшаяся работа — внутренняя: обмен Caddy *runtime* admin-API конфигурации на *static* конфиг, который пережи перезагрузки.
:::

### Край

Каждый пользовательский домен церкви указывает DNS на один ящик EC2 — `3.23.251.61`, также достижимый как `proxy.b1.church`. На экране Settings→Domains B1Admin инструктирует церкви добавить apex `A → 3.23.251.61` или `CNAME → proxy.b1.church`. Caddy завершает TLS с per-domain Let's Encrypt cert, переписывает заголовок `Host` на восстановленный `{sub}.b1.church` сайта на B1App — который затем маршрутизирует его по метке хоста как любой встроенный поддомен (см. [Custom domains](#custom-domains) выше).

Отображение восстановленных типов из `DomainRepo.loadPairs`, который **COALESCEs назначенный site subdomain**, поэтому домен проксирует на правильный *вторичный* сайт, падая обратно на основной церкви:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

Строки `www.*` исключены из карты; Caddy обслуживает `www.{host}` через перенаправление `302` на apex вместо.

### Два анонимных endpoints питают край

`DomainController` раскрывает два неаутентифицированных, read-only endpoints, которые box потребляет напрямую — анонимные по необходимости, поскольку край запрашивает их перед любым контекстом церкви:

| Endpoint | Returns | Role |
|----------|---------|------|
| `GET /membership/domains/authorize?domain=` | `200`, если домен — или, для пропуска `www.`, его bare apex — существует в `domains`; `404` иначе (включая empty `domain`) | Caddy's **on-demand-TLS `ask`**: контроль злоупотреблений, решающий, выдавать ли cert для входящего SNI |
| `GET /membership/domains/hostmap` | `text/plain`, один отсортированный `{domain} {sub}.b1.church` line per routable domain | Файл host→upstream map, который box освежает на timer |

`authorize` повторно использует `DomainRepo.loadByName` (exact host, затем single `www.`→apex retry); `hostmap` повторно использует `loadPairs` — поэтому он site-aware и `www.*`-excluded, идентичные proxy маршрутам — и просто strips suffix `:443`.

### Сохранение/удаление домена — one best-effort push

`DomainController.save` пишет строки `domains` и затем делает **single best-effort** вызов `CaddyHelper.updateCaddy()`, обернутый в `try/catch`, который логирует (`console.error`) и проглатывает; `delete` делает то же (что также исправило prior stale-route-on-delete bug), как делает вторичное удаление сайта (`SiteController.delete`). `updateCaddy` сам bounded **10s** Axios timeout, поэтому недостижимый или stopped Caddy никогда не может `500` сохранение домена — таблица `domains` — источник истины.

### Текущее состояние — static config, no runtime state

Box (Windows EC2 за постоянным Elastic IP) работает Caddy из **static Caddyfile**: on-demand TLS, чей `ask` указывает на `/membership/domains/authorize`, плюс host→upstream файл карты, освеженный каждые 5 минут из `/membership/domains/hostmap` на scheduled task, который заканчивается graceful `caddy reload`. Config пережи перезагрузки с zero runtime state — no re-priming dance — и unknown SNI — **TLS-refused** (no cert выдана для хоста, который `authorize` отклоняет), пока authorized-but-not-yet-mapped хост (brand-new домен внутри окна синхронизации) получает clean 404. Новые домены становятся маршрутизируемыми в пределах ~5 минут сохранения; их сертификаты выданы на первый hit. Build/setup, operations и field-tested gotchas: [Caddy Custom-Domain Proxy](../deployment/caddy-proxy).

### Legacy runtime push — rollback path, pending deletion

`CaddyHelper` (membership module) все еще может запустить Caddy через его **admin API** в `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort`; no-op когда unset; посчитано под `ServerHealthController`'s Integrations group): `updateCaddy()` PATCHes полный routes array, и `initializeCaddy()` + endpoints `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` перестраивают runtime-configured сервер с нуля. Конфиг того режима жил только в памяти Caddy — restart-amnesia, которую заменила эта архитектура. Машинерия остается чистой как rollback path и запланирована на удаление, как только static box была стабильна; best-effort `updateCaddy()` push на домен save/delete инертна против static box (его admin API localhost-only).

## Related Pages

- [Caddy Custom-Domain Proxy](../deployment/caddy-proxy) — сам edge box: fresh-box setup, WinSW service, map sync task и operational gotchas
- [Website Builder](./website-builder) — дерево страницы/раздела/элемента, renderers, blog, SEO и AI generation (что отображается как только запрос разрешен на церковь/сайт)
- [Content Endpoints](../api/endpoints/content) — REST поверхность для страниц, блоков, ссылок и глобальных стилей, все теперь `?siteId=`-aware
- [B1App](../web-apps/b1-app) — Next.js приложение, которое хостит middleware и `[sdSlug]` routing
- [Web App Deployment](../deployment/web-apps) — как B1App развертывается на Vercel
