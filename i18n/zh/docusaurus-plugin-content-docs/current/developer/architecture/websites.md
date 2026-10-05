---
title: "网站路由与多站点"
---

# 网站路由与多站点

<div class="article-intro">

一个教会现在可以提供多个不同的网站，每个网站都可以在 `*.b1.church` 子域上或在完全自定义的、教会拥有的域上上线。本页面映射了建设者下方的路由层：传入请求如何解析为教会**和**特定站点、多站点数据模型（`siteId` sentinel 保持每个预先存在的站点渲染不变），以及自定义域边缘 — 在 EC2 上自管理的 Caddy 代理，终止 TLS 并将每个教会域重写到其 `*.b1.church` 上游。有关请求解析后实际渲染的内容 — 页面/部分/元素树 — 请参阅[网站建设者](./website-builder)。

</div>

## 概述

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

三条规则在这一层中成立：

1. **一个 sentinel 保持一切向后兼容。** `siteId = ''` 是主站点。每个页面、块、链接、全局样式和域行在此功能之前进行的 `''` 进行，完全像以前一样渲染。一个*第二个*网站只是一组行与非空 `siteId`，并且任何内容端点称为不带 `?siteId=` 返回主站点 — 字节对字节的旧请求。
2. **分辨率是基于 host-label 的并收敛。** `*.b1.church` 子域通过其 host 标签直接路由；自定义域在 B1App 看到它之前在 Caddy 边缘被重写到其 `{sub}.b1.church` 标签（带有中间件 DB 查找作为任何原始自定义 `Host` 的回退）。两条腿都落在相同的 `[sdSlug]` 路由和相同的 `churches/lookup` 调用上，所以下游渲染是相同的。
3. **Caddy 边缘在一个真理来源上是无状态的。** 自定义域在 EC2 上自管理的 Caddy 代理处终止，将每个域重写到其 `{sub}.b1.church` 上游。域保存会触发单一最佳努力 `CaddyHelper.updateCaddy()`，而 Caddy 也直接读取 `domains` 表（下面的 `authorize` 和 `hostmap` 端点）。该表是权威的 — 无法到达的 Caddy 永远无法造成保存失败。

## 站点分辨率

### `*.b1.church` 子域

`B1App/next.config.mjs` 通过 host 重写传入请求。带有模式 `(?<subdomain>.*?)\..*` 的主机规则捕获**第一个标签**主机并重写 `/` 和 `/:path*` 到 `/{subdomain}` — `[sdSlug]` App-Router 段。所以 `grace.b1.church/about` 变成 `/grace/about`。

在 `src/app/[sdSlug]/` 内，`ConfigHelper.load(sdSlug)`（`src/helpers/ConfigHelper.ts`）调用 `GET /membership/churches/lookup/?subDomain={sdSlug}`。`ChurchController.getBySubDomain` 响应现在有两个分支：

| Slug 匹配 | 响应 | 含义 |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | 该教会的主站点 |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | 一个**次要站点** — 控制器回退到 `sites`，解析拥有教会，并回应查询的 slug 加上额外的 `siteId` |

那个额外的 `siteId` 是唯一将次要站点请求与主站点请求区分开的东西；管道中的其他一切都是共享的。

### 自定义域

教会拥有的域在**Caddy 边缘**（详细信息下文）终止，在代理到 B1App 前将 `Host` 头重写到站点的 `{sub}.b1.church`。所以在常规路径上 B1App 接收一个*内部* `*.b1.church` 主机并像本地子域一样通过 host 标签解析它 — 中间件的 DB 查找从不触发。`src/middleware.ts` 仍在每个请求上运行，但有一个始终打开的作业和一个回退：

1. **始终** — 它**删除任何客户端提供的 `x-site` 头**。那个头是可欺骗的重写输入，仅当中间件本身设置它时才被信任；删除它是中间件在 Caddy 后面的真实工作。
2. **回退，仅限非内部 `Host`** — 对于到达 B1App *不带* Caddy 重写的原始自定义域 `Host`，它调用 `GET /membership/domains/public/lookup/{host}` 并且如果返回 `subDomain`，设置 `x-site: {subDomain}.b1.church`。在 Caddy 后面这个分支是惯性的，因为 `Host` 已经是 `*.b1.church`。

内部主机 — `localhost`、`b1.church` 和后缀 `.b1.church`、`.localtest.me`、`.localhost`、`.up.railway.app`、`.vercel.app` — 完全跳过查找（它们已由 host-label 重写解析或是预览/部署主机）。

查找本身（`DomainRepo.loadByName`）左连接 `domains → churches` 和 `domains → sites` 并返回 `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` — 分配的次要站点的子域（如果域指向一个），否则教会的。它首先匹配精确主机；如果那个主机以 `www.` 开始并错过了，它重试**一次**反对光秃秃的顶端。

回到 `next.config.mjs`，`x-site` 重写规则被放置**前面**通用主机规则，所以他们赢了。`x-site: grace.b1.church` → 第一个标签 `grace` → `[sdSlug] = grace`，并从那里分辨率与子域路径相同（相同 `churches/lookup`、相同 `siteId`）。

:::info
`x-site` 头从外部不受信任。中间件无条件地删除任何入站 `x-site` 在可选地设置自己的之前，重写规则仅看到中间件设置的值 — 一个客户端不能通过发送头强制自己到另一个教会的内容。
:::

关于中间件的两个操作细节：

- **缓存。** 每个主机的结果（一个命中*或*确认的错过 — 从不是网络错误）被缓存**10 分钟**在一个内存中 `Map`，每个无服务器隔离。
- **匹配器。** 匹配器故意重新包括 `/sitemap.xml`、`/robots.txt` 和 `/manifest.webmanifest`。其第一个模式排除点缀的路径，这会否则删除那些文件；他们被添加回来，所以自定义域的每教会 SEO/PWA 文件也接收 `x-site` 头。
- **规范头。** 对于教会页面，中间件追加一个 `Link: <{proto}://{host}{path}>; rel="canonical"` 响应头命名的页面实际被提供的主机 — 子域或自定义域（`helpers/canonicalLink.ts`）。在非教会主机上被跳过（`b1.church`、`localhost`、`*.vercel.app`、`*.up.railway.app`）并在 `/mobile`、`/login`、`/logout` 和生成的 robots/sitemap/manifest 文件上。

### 禁用公共网站

一个教会可以在 B1Admin 中打开**禁用公共网站**（教会级内容设置 `hidePublicSite = "true"`）。网站然后只服务其成员面向的路由：

- **B1App 中间件**查找子域（`/membership/churches/lookup` 然后 `/content/settings/public/:churchId`）并将任何路径的匿名请求外的允许列表重定向到 `/login?returnUrl={path}{query}`。允许列表（`helpers/publicSite.ts`）是 `/login`、`/logout`、`/mobile/*`、`/register/*`、`/guest-register` 和 manifest/robots/sitemap 文件。仅缓存确认的答案（在生产中 60 秒，因为管理员的重新验证调用不能清除这个每实例地图；在 dev/test 中未缓存）。API 错误提供网站而不是锁定每个人。
- **登录的成员看到完整的网站。** 带有过期 `jwt` 饼干（中间件的 `hasSession()` 解码有效负载的 `exp` 没有验证签名 -- 这是一个软门，不是访问控制）的请求跳过重定向，所以登录后成员返回到他们要求的页面并看到常规页面、内置页面（组、布道等）和头导航。页面组件和 `Header` 不再检查 `hidePublicSite` 本身。
- **`robots.txt`** 禁止一切，如在 noindex 主机上。
- **API。** `GET /content/pages/public/:churchId`（网站地图的页面列表）返回 `[]`，所以匿名调用者不能列出页面。

### `siteId` 线程

`ConfigHelper` 在其每请求 `ConfigurationInterface`（用 React `cache()` 记忆）上存储已解析的 `siteId`，并将 `?siteId=` 追加到内容调用它和页面组件进行 — **有条件地**：一个空 `siteId`（主教会子域）完全省略参数。线程端点是页面树（`/content/pages/:id/tree`）、网站地图使用的公开页面列表（`/content/pages/public/:id`）、全局样式（`/content/globalStyles/church/:id`）、导航链接（`/content/links/church/:id`）和独立页脚块（`/content/blocks/public/footer/:id`）。在常规渲染路径上，页脚到达页面树内（标记为 `zone: "siteFooter"` 的部分），已用 `siteId` 获取，所以没有未范围的页脚间隙。

成员门户（B1App `mobile`）故意坐在这之外：`loadChurchAppearance.ts` 通过 `churches/lookup` 解决教会，但读教会级 `/settings/public/{id}` 并从不线程 `siteId` — 门户在 v1 中是全教会的（见下文）。

## 多个网站每教会

### 数据模型

新的 `membership.sites` 表故意很小：

| 列 | 类型 | 注意 |
|--------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | 拥有教会 |
| `name` | `varchar(255)` | 显示名称（例如"Español"、"Youth"） |
| `subDomain` | `varchar(45)` | **唯一索引** — 全球命名空间（下方） |

站点范围然后是添加到内容和域表的单个可空自由列：

| 表（模块） | 列 | `''` 意思 |
|----------------|--------|-----------|
| `domains`（membership） | `siteId char(11) NOT NULL DEFAULT ''` | 域提供主站点 |
| `pages`、`links`、`globalStyles`、`blocks`（content） | `siteId char(11) NOT NULL DEFAULT ''` | 主站点 — 并在**`blocks`**上，`''` 另外表示*在所有站点间共享* |

两个迁移添加所有这个（`tools/migrations/membership/2026-07-02_sites.ts`、`tools/migrations/content/2026-07-02_site_id.ts`）。因为列默认为 `''`，每个现有行保持今天的行为而没有回填。

**全球子域命名空间。** `sites.subDomain` 共享*一个*命名空间与 `churches.subDomain` — 站点子域永远不能与教会子域或另一个站点的碰撞。这在**两条**保存路径上强制执行：`SiteController.save` 拒绝命中 `churches` 或 `sites` 的 slug，而 `ChurchController.validateSave` 在反向执行相同操作。唯一索引在 `sites.subDomain` 支持它在数据库级别。

**页面唯一性**从 `(churchId, url)` 扩大到 `(churchId, siteId, url)`，所以一个教会的两个站点可以各自拥有自己的 `/about`。

### 每站点内容，带回退

每个站点范围内容**列表/树**端点接受可选 `?siteId=`（缺失 ⇒ `''` = 主站点）：页面树 / 列表 / 公开、块列表 / 按类型 / 页脚、链接（匿名 / 过滤 / 全部）和全局样式。部分和元素*不*直接范围 — 他们通过其父页面或块继承。

两个分辨率链做有趣的工作：

- **全局样式 — `site → primary → default`。** `GlobalStyleRepo.loadForChurch(churchId, siteId)` 返回站点自己的行；如果次要站点没有一个，它返回**主站点（`''`）行 as-is**（保持主站点的 `id`/`siteId`，客户端使用复制写时读）；如果也没有主站点，`GlobalStyleController` 返回一个硬编码的默认调色板/字体。
- **页脚块 — 站点特定的赢了，共享回退。** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` 返回共享（`''`）*和*站点特定的行；分辨器选择站点自己的页脚（如果存在），否则共享一个。相同的逻辑在 `TreeHelper.insertBlocks`（页面树）和独立 `/content/blocks/public/footer/:churchId` 端点中都运行。

### 站点删除级联

`SiteController.delete`（在成员设置→编辑权限上门控）在三个步骤中撕裂次要站点：

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` 级联网站拥有的所有内容：其**页面** → 它们的部分、元素、`pageHistory` 和 `posts`；它自己的**块** → 它们的部分、元素和 `pageHistory`；其**链接**和**全局样式**。一个防护拒绝为 `''` 运行 — 主/共享 sentinel 从不级联。
2. `DomainRepo.clearSiteId` **重新分配**网站的域回到主站点（`siteId → ''`）而不是删除它们，所以自定义域在站点删除中幸存。
3. `sites` 行被删除，Caddy 路由被重新同步（最佳努力）。

### B1Admin 表面

| 能力 | 在哪里 | 机制 |
|-----------|-------|-----------|
| 站点切换器 | `useSiteSelection` + `SiteSwitcher`（空 = "主网站"） | 读取 `?site=` URL 参数并将其作为 `?siteId=` 线程到 ContentApi 调用中。在三个站点**列表**区域上呈现 — **页面**、**块**、**外观** — 但*不是*页面/块编辑器，它在记录上带有 `siteId` |
| 站点创建/删除 | `SitesDialog`，从切换器的"管理网站…"条目打开 | `POST /membership/sites` / `DELETE /membership/sites/:id`（名称 + subDomain）。在成员设置→编辑权限上门控（`Permissions.settings.edit` 服务器端；`Permissions.membershipApi.settings.edit` 在 B1Admin 中）。**仅创建/删除 — v1 中没有重命名 UI** |
| 每域站点分配 | `DomainSettingsEdit` 在设置→域下 | 一个每行站点下拉发送 `siteId` 每域到 `/membership/domains`。如果 API 返回没有站点的列表（更旧后端），列隐藏 |
| 复制写时读样式 | `StylesManager.prepareForSave` | 当加载的全局样式行的 `siteId` 与所选站点不匹配时（即 API 作为回退返回继承主站点），它删除主站点的 `id` 并戳记当前 `siteId`，强制一个新站点特定行的**插入**而不是覆盖主站点。相同的在不匹配时分叉应用到站点页脚块 |

:::info
**在 v1 中保持教会范围的内容（一个深思熟虑的范围选择，不是数据模型限制）：** **博客**（`BlogPage` 没有切换器并加载 `/posts` 没有 `siteId`）、**站点小组件**（公告横幅 + 启动器）、**重定向**、**徽标 / GA4 / 教会设置** 和**成员门户**（B1App mobile）。注意这是*不是*"所有外观" — 次要站点的全局样式（调色板、字体、排版、间距、导航、自定义 CSS）**是**每站点通过上面的复制写时读路径；仅有外观页面的横幅/启动器/重定向/徽标子面板保持全教会。
:::

## 自定义域：Caddy 边缘（静态配置计划）

:::info
**方向于 2026-07-02 修订。** 早期计划将自定义域托管移到 Vercel 管理的域上**取消**，并且所有 Vercel 域注册代码（`VercelHelper`、其 `vercelToken`/`vercelProjectId`/`vercelTeamId` 环境变量、SSM 参数和健康条目）从 Api 中删除。自管理的**Caddy 代理在 EC2 上**保持作为永久自定义域边缘。唯一剩余的工作是内部：交换 Caddy 的*运行时*管理 API 配置用于一个*静态*配置，该配置在重新启动后存活。
:::

### 边缘

每个自定义教会域指向 DNS 到一个 EC2 框 — `3.23.251.61`，也可以作为 `proxy.b1.church` 到达。B1Admin 的设置→域屏幕指示教会添加一个顶点 `A → 3.23.251.61` 或一个 `CNAME → proxy.b1.church`。Caddy 终止 TLS 与一个每域让我们加密证书，重写 `Host` 头到域的 `{sub}.b1.church` 上游，并反向代理到 B1App — 它然后像任何本地子域一样通过 host 标签路由（见上面的[自定义域](#custom-domains)）。

上游映射来自 `DomainRepo.loadPairs`，其拨号**COALESCES 分配的站点的子域**所以域代理到正确的*次要*站点，回退到教会的主站点：

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

`www.*` 行从地图中被排除；Caddy 通过一个 `302` 重定向到顶点代替提供 `www.{host}`。

### 两个匿名端点供给边缘

`DomainController` 暴露两个未认证、只读端点盒子直接消费 — 必要时匿名，因为边缘在任何教会背景存在前查询它们：

| 端点 | 返回 | 角色 |
|----------|---------|------|
| `GET /membership/domains/authorize?domain=` | `200` 如果域 — 或对于一个 `www.` 错误，其光秃秃的顶点 — 存在于 `domains`；`404` 否则（包括一个空 `domain`） | Caddy 的**按需 TLS `ask`**：滥用控制决定是否为传入的 SNI 颁发证书 |
| `GET /membership/domains/hostmap` | `text/plain`，每个可路由域一个排序 `{domain} {sub}.b1.church` 行 | 主机→上游映射文件框刷新定时器上 |

`authorize` 重用 `DomainRepo.loadByName`（精确主机，然后一个单一 `www.`→顶点重试）；`hostmap` 重用 `loadPairs` — 所以它是站点感知的并且 `www.*` 排除的，与代理路由相同 — 并仅剥离 `:443` 后缀。

### 域保存/删除 — 一个最佳努力推送

`DomainController.save` 写 `domains` 行然后进行一个**单一最佳努力** `CaddyHelper.updateCaddy()` 调用，在一个 `try/catch` 中包装记录（`console.error`）并吞下；`delete` 做相同（也修复了以前的陈旧路由删除错误），如同次要站点删除（`SiteController.delete`）。`updateCaddy` 本身由一个**10s** Axios 超时界定，所以一个无法到达或停止的 Caddy 永远无法 `500` 一个域保存 — `domains` 表是真理的来源。

### 当前状态 — 静态配置，没有运行时状态

框（持久弹性 IP 后的 Windows EC2）从一个**静态 Caddyfile** 运行 Caddy：按需 TLS 其 `ask` 指向 `/membership/domains/authorize`，加上一个主机→上游映射文件由定期任务从 `/membership/domains/hostmap` 刷新每 5 分钟，以一个优雅 `caddy reload` 结束。配置在重新启动时存活零运行时状态 — 没有重新启动舞蹈 — 以及一个未知的 SNI 是**TLS 拒绝的**（没有证书铸造对于一个 `authorize` 拒绝的主机），而一个授权但还未映射的主机（一个新域在同步窗口内）得到一个清洁 404。新域在保存后约 5 分钟内变为可路由；它们的证书在第一次命中时被铸造。构建/设置、操作和现场测试的陷阱：[Caddy 自定义域代理](../deployment/caddy-proxy)。

### 遗留运行时推送 — 回滚路径，待删除

`CaddyHelper`（成员模块）仍然可以通过其**管理 API**在 `caddyHost:caddyPort`（SSM `caddyHost`/`caddyPort`；未设置时无操作；在 `ServerHealthController` 的集成组下呈现）驱动 Caddy：`updateCaddy()` PATCH 一个完整路由数组，而 `initializeCaddy()` + `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` 端点从头重建一个运行时配置的服务器。那个模式的配置仅存在于 Caddy 的内存中 — 重新启动遗忘这个架构替换。机制仅作为回滚路径保留并计划删除一旦静态框已稳定；在域保存/删除上的最佳努力 `updateCaddy()` 推送是针对静态框的无害无操作（其管理 API 是仅本地主机的）。

## 相关页面

- [Caddy 自定义域代理](../deployment/caddy-proxy) — 边缘框本身：全新框设置、WinSW 服务、地图同步任务和操作陷阱
- [网站建设者](./website-builder) — 页面/部分/元素树、渲染器、博客、SEO 和 AI 生成（一旦请求已解析为教会/站点后呈现的内容）
- [内容端点](../api/endpoints/content) — 页面、块、链接和全局样式的 REST 表面，现在都 `?siteId=` 感知
- [B1App](../web-apps/b1-app) — 托管中间件和 `[sdSlug]` 路由的 Next.js 应用
- [Web 应用部署](../deployment/web-apps) — B1App 如何部署到 Vercel
