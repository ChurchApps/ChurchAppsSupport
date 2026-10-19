---
title: "网站路由与多站点"
---

# 网站路由与多站点

<div class="article-intro">

一个教会现在可以提供多个不同的网站，每个网站既可以位于 `*.b1.church` 子域名下，也可以使用完全自定义的、由教会自有的域名。本页介绍构建器*底层*的路由层：传入请求如何解析为教会**以及**具体的站点，多站点数据模型（用于保证所有既有站点照常渲染的 `siteId` 哨兵值），以及自定义域名边缘层——一个部署在 EC2 上的自管 Caddy 代理，负责终止 TLS 并将每个教会域名改写到其 `*.b1.church` 上游。关于请求解析完成后实际渲染的内容（页面/分区/元素树），请参阅 [网站构建器](./website-builder)。

</div>

## 概览

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

这一层有三条规则贯穿始终：

1. **哨兵值确保向后兼容。** `siteId = ''` 表示主站点。在此功能出现之前就存在的每个页面、区块、链接、全局样式和域名记录都带有 `''`，渲染结果与之前完全一致。*第二个*网站只是一组 `siteId` 非空的记录，而任何未带 `?siteId=` 调用的内容接口都会返回主站点——与旧请求逐字节相同。
2. **解析基于主机标签，并且最终收敛。** `*.b1.church` 子域名直接通过其主机标签进行路由；自定义域名在 Caddy 边缘层被改写为其 `{sub}.b1.church` 标签，然后 B1App 才会收到请求（如果原始自定义 `Host` 绕过了 Caddy，则由中间件通过数据库查询设置 `x-site` 头作为兜底）。两条路径最终都进入相同的 `[sdSlug]` 路由和相同的 `churches/lookup` 调用，因此下游渲染完全一致。
3. **Caddy 边缘层无状态，所有数据来自唯一的数据源。** 自定义域名在自管的 EC2 Caddy 代理上终止，该代理将每个域名改写到其 `{sub}.b1.church` 上游。保存域名时会触发一次尽力而为的 `CaddyHelper.updateCaddy()`，同时 Caddy 也会直接读取 `domains` 表（即下文的 `authorize` 和 `hostmap` 接口）。以数据表为准——Caddy 无法访问时也绝不会导致保存失败。

## 站点解析

### `*.b1.church` 子域名

`B1App/next.config.mjs` 会按主机重写传入的请求。主机规则模式 `(?<subdomain>.*?)\..*` 会捕获主机的**第一个标签**，并将 `/` 和 `/:path*` 重写为 `/{subdomain}`——即 `[sdSlug]` App Router 路由段。因此 `grace.b1.church/about` 会变为 `/grace/about`。

在 `src/app/[sdSlug]/` 中，`ConfigHelper.load(sdSlug)`（`src/helpers/ConfigHelper.ts`）会调用 `GET /membership/churches/lookup/?subDomain={sdSlug}`。`ChurchController.getBySubDomain` 的响应现在有两个分支：

| 标识匹配 | 响应 | 含义 |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | 该教会的主站点 |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | **次要站点**——控制器回退到 `sites` 表，解析所属教会，并返回所查询的标识以及额外的 `siteId` |

这个额外的 `siteId` 是区分次要站点请求与主站点请求的唯一依据；其余流程完全共用。

与两张表都不匹配的标识会返回 `{}` 和 `200`。`ConfigHelper.load` 将不包含 `id` 的响应视为未知站点，并调用 Next 的 `notFound()`，因此未知子域名会得到真正的 404，而不会让后续所有调用都请求 `/…/undefined`。构建器页面路由还会通过 `pageTreePath()`（`src/helpers/pageTreePath.ts`）构建其树路径，该函数会对标识进行 URL 编码，因此格式错误的标识（包含反斜杠、空格）会返回 404，而不会将 API 的 `400` 暴露为 500。

### 自定义域名 {#custom-domains}

教会自有的域名在 **Caddy 边缘层**（见下文详述）上终止，Caddy 会在代理到 B1App 之前将 `Host` 头改写为站点的 `{sub}.b1.church`。因此在常规路径上，B1App 收到的是*内部*的 `*.b1.church` 主机，并像原生子域名一样按主机标签进行解析——中间件的数据库查询永远不会触发。`src/middleware.ts` 仍会对每个请求运行，但只有一项始终执行的任务和一项兜底任务：

1. **始终执行** —— 它会**删除客户端提供的任何 `x-site` 头**。该头是可被伪造的重写输入，只有中间件自身设置时才会被信任；在 Caddy 后面，去除它正是中间件的真正职责。
2. **兜底，仅适用于非内部 `Host`** —— 对于绕过 Caddy 改写、直接到达 B1App 的原始自定义域名 `Host`，它会调用 `GET /membership/domains/public/lookup/{host}`，如果返回了 `subDomain`，则设置 `x-site: {subDomain}.b1.church`。在 Caddy 后面，此分支不起作用，因为 `Host` 已经是 `*.b1.church`。

内部主机——`localhost`、`b1.church`，以及后缀 `.b1.church`、`.localtest.me`、`.localhost`、`.up.railway.app`、`.vercel.app`——会完全跳过查询（它们已通过主机标签重写完成解析，或者本身就是预览/部署主机）。

查询本身（`DomainRepo.loadByName`）对 `domains → churches` 和 `domains → sites` 执行左连接，并返回 `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)`——如果域名指向某个次要站点，则返回该站点的子域名，否则返回教会的子域名。它首先匹配精确主机；如果该主机以 `www.` 开头且未命中，则会针对裸顶级域名**重试一次**。

回到 `next.config.mjs`，`x-site` 重写规则被放置在通用主机规则**之前**，因此会优先生效。`x-site: grace.b1.church` → 第一个标签 `grace` → `[sdSlug] = grace`，此后解析过程与子域名路径完全相同（相同的 `churches/lookup`，相同的 `siteId`）。

:::info
来自外部的 `x-site` 头是不可信的。中间件会无条件剥离任何传入的 `x-site`，然后才可选地设置其自身的值，并且重写规则只会看到中间件设置的值——客户端无法通过发送头部强行访问其他教会的内容。
:::

中间件的两个运行细节：

- **缓存。** 每个主机的结果（命中*或*确认未命中——网络错误除外）会在每个无服务器隔离实例中缓存在内存 `Map` 里，缓存时长为 **10 分钟**。
- **匹配器。** 匹配器特意重新包含了 `/sitemap.xml`、`/robots.txt` 和 `/manifest.webmanifest`。其第一个模式会排除带点的路径，否则这些文件会被丢弃；将它们重新加入后，自定义域名的每教会 SEO/PWA 文件也能接收到 `x-site` 头。
- **规范链接头。** 对于教会页面，中间件会追加一个响应头 `Link: <{proto}://{host}{path}>; rel="canonical"`，指明页面实际提供服务的主机——子域名或自定义域名（`helpers/canonicalLink.ts`）。在非教会主机（`b1.church`、`localhost`、`*.vercel.app`、`*.up.railway.app`）上，以及 `/mobile`、`/login`、`/logout` 和自动生成的 robots/sitemap/manifest 文件上，会跳过此头。

### 已禁用的公开网站

教会可以在 B1Admin 中开启**禁用公开网站**（教会级内容设置 `hidePublicSite = "true"`）。此后该站点将只提供面向成员的路由：

- **B1App 中间件** 会查询子域名（先 `/membership/churches/lookup`，再 `/content/settings/public/:churchId`），并将匿名请求重定向到允许列表之外的任何路径，跳转至 `/login?returnUrl={path}{query}`。允许列表（`helpers/publicSite.ts`）包括 `/login`、`/logout`、`/mobile/*`、`/register/*`、`/guest-register`，以及 manifest/robots/sitemap 文件。只有已确认的结果才会被缓存（生产环境为 60 秒，因为管理员的重新验证调用无法清除每个实例的内存映射；开发/测试环境不缓存）。API 错误时会继续提供站点服务，而不会把所有人锁在外面。
- **已登录成员可以看到完整站点。** 携带未过期 `jwt` Cookie 的请求（中间件的 `hasSession()` 会解码载荷中的 `exp`，但不验证签名——这是一道软性关卡，而非访问控制）会跳过重定向，因此成员登录后会返回其请求的页面，并看到正常页面、内置页面（小组、讲道等）以及顶部导航。页面组件和 `Header` 不再自行检查 `hidePublicSite`。
- **`robots.txt`** 会禁止一切抓取，与 noindex 主机的做法相同。
- **API。** `GET /content/pages/public/:churchId`（站点地图的页面列表）返回 `[]`，因此匿名调用者无法列出页面。

### `siteId` 传递

`ConfigHelper` 将解析得到的 `siteId` 存储在其每请求的 `ConfigurationInterface` 上（通过 React `cache()` 进行记忆），并**有条件地**为它和页面组件发出的内容调用追加 `?siteId=`：空的 `siteId`（主教会子域名）会完全省略该参数。被传递的接口包括页面树（`/content/pages/:id/tree`）、站点地图使用的公开页面列表（`/content/pages/public/:id`）、全局样式（`/content/globalStyles/church/:id`）、导航链接（`/content/links/church/:id`），以及独立的页脚区块（`/content/blocks/public/footer/:id`）。在常规渲染路径上，页脚包含在页面树中（分区标记为 `zone: "siteFooter"`），已经使用 `siteId` 获取，因此不存在未限定范围的页脚漏洞。

会员门户（B1App `mobile`）特意不在此范围内：`loadChurchAppearance.ts` 通过 `churches/lookup` 解析教会，但读取的是教会级的 `/settings/public/{id}`，且从不传递 `siteId`——在 v1 中，门户覆盖整个教会（见下文）。

## 单个教会的多个网站

### 数据模型

新增的 `membership.sites` 表刻意保持精简：

| 列 | 类型 | 说明 |
|--------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | 所属教会 |
| `name` | `varchar(255)` | 显示名称（例如 "Español"、"Youth"） |
| `subDomain` | `varchar(45)` | **唯一索引**——全局命名空间（见下文） |

站点范围划分因此只需在内容表和域名表中添加一个非空的单列：

| 表（模块） | 列 | `''` 的含义 |
|----------------|--------|-----------|
| `domains`（membership） | `siteId char(11) NOT NULL DEFAULT ''` | 该域名提供主站点服务 |
| `pages`、`links`、`globalStyles`、`blocks`（content） | `siteId char(11) NOT NULL DEFAULT ''` | 主站点——而在 **`blocks`** 上，`''` 还额外表示*所有站点共享* |

两次迁移添加了这些内容（`tools/migrations/membership/2026-07-02_sites.ts`、`tools/migrations/content/2026-07-02_site_id.ts`）。由于列默认值为 `''`，每条现有记录都保持当前行为，无需回填。

**全局子域名命名空间。** `sites.subDomain` 与 `churches.subDomain` 共用*同一个*命名空间——站点子域名永远不会与教会子域名或其他站点的子域名冲突。这在**两条**保存路径上都会强制执行：`SiteController.save` 会拒绝与 `churches` 或 `sites` 中任一标识冲突的 slug，而 `ChurchController.validateSave` 则反向执行同样的检查。`sites.subDomain` 上的唯一索引在数据库层面提供保障。

**页面唯一性** 从 `(churchId, url)` 扩展为 `(churchId, siteId, url)`，因此同一教会的两个站点可以各自拥有自己的 `/about`。

### 按站点划分的内容，并带有回退机制

每个支持站点范围的内容**列表/树**接口都接受可选的 `?siteId=`（缺省即 `''`，表示主站点）：页面树/列表/公开页面，区块列表/按类型/页脚，链接（匿名/筛选/全部），以及全局样式。分区和元素并不直接划分范围，而是通过其父页面或区块继承。

有两条解析链承担着关键工作：

- **全局样式 —— `站点 → 主站点 → 默认`。** `GlobalStyleRepo.loadForChurch(churchId, siteId)` 返回站点自己的记录；如果次要站点没有记录，则**原样返回主站点（`''`）的记录**（保留主站点的 `id`/`siteId`，客户端会据此执行写时复制）；如果主站点也没有，`GlobalStyleController` 会返回硬编码的默认配色/字体。
- **页脚区块 —— 站点专属优先，共享回退。** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` 返回共享（`''`）记录*和*站点专属记录；解析器优先选择站点自己的页脚，否则使用共享页脚。同样的逻辑同时运行于 `TreeHelper.insertBlocks`（页面树）和独立的 `/content/blocks/public/footer/:churchId` 接口中。

### 站点删除级联

`SiteController.delete`（需要会员模块的“设置→编辑”权限）分三步拆除一个次要站点：

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` 级联删除该站点拥有的所有内容：其**页面** → 对应的分区、元素、`pageHistory` 和 `posts`；其自有的**区块** → 对应的分区、元素和 `pageHistory`；其**链接**和 **globalStyles**。有一道守卫会拒绝对 `''` 运行——主站点/共享哨兵值永远不会被级联删除。
2. `DomainRepo.clearSiteId` 会将该站点的域名**重新分配**回主站点（`siteId → ''`），而不是删除它们，因此自定义域名在站点删除后依然保留。
3. 删除 `sites` 记录，并重新同步 Caddy 路由（尽力而为）。

### B1Admin 功能面

| 功能 | 位置 | 机制 |
|-----------|-------|-----------|
| 站点切换器 | `useSiteSelection` + `SiteSwitcher`（空值 = "Main Website"） | 读取 `?site=` URL 参数，并将其作为 `?siteId=` 传递给 ContentApi 调用。出现在三个站点**列表**区域——**页面**、**区块**、**外观**——但不出现在页面/区块编辑器中，编辑器通过记录本身携带 `siteId` |
| 站点创建/删除 | `SitesDialog`，从切换器的"管理网站…"入口打开 | `POST /membership/sites` / `DELETE /membership/sites/:id`（名称 + subDomain）。需要会员模块的“设置→编辑”权限（服务端为 `Permissions.settings.edit`；B1Admin 中为 `Permissions.membershipApi.settings.edit`）。**仅支持创建/删除——v1 中没有重命名界面** |
| 按域名分配站点 | 位于“设置→域名”下的 `DomainSettingsEdit` | 每行的站点下拉框会将每个域名的 `siteId` 提交到 `/membership/domains`。如果 API 未返回任何站点（旧版后端），该列会隐藏 |
| 写时复制样式 | `StylesManager.prepareForSave` | 当已加载的全局样式记录的 `siteId` 与所选站点不匹配时（即 API 将继承的主站点作为回退返回），它会丢弃主站点的 `id` 并盖上当前的 `siteId`，强制**插入**一条新的站点专属记录，而不是覆盖主站点。站点页脚区块也适用同样的分叉机制 |

:::info
**在 v1 中仍然覆盖整个教会的内容（这是有意的范围选择，而非数据模型的限制）：** **博客**（`BlogPage` 没有切换器，并且加载 `/posts` 时不带 `siteId`）、**站点小组件**（公告横幅 + 启动器）、**重定向**、**徽标 / GA4 / 教会设置**，以及**会员门户**（B1App 移动端）。请注意，这*并非*"整个外观"——次要站点的全局样式（配色、字体、排版、间距、导航、自定义 CSS）**确实**通过上述写时复制路径按站点划分；只有外观页面中的横幅/启动器/重定向/徽标子面板仍然覆盖整个教会。
:::

## 自定义域名：Caddy 边缘层（静态配置方案）

:::info
**方向已于 2026-07-02 修订。** 此前将自定义域名托管迁移到 Vercel 托管域名的计划已**取消**，所有 Vercel 域名注册代码（`VercelHelper`、其 `vercelToken`/`vercelProjectId`/`vercelTeamId` 环境变量、SSM 参数以及健康检查条目）已从 Api 中移除。自管的 **EC2 上的 Caddy 代理保留**，作为永久的自定义域名边缘层。剩余的工作仅属内部事务：将 Caddy 的*运行时*管理 API 配置替换为能在重启后保留的*静态*配置。
:::

### 边缘层

每个教会自定义域名都将 DNS 指向同一台 EC2 主机——`3.23.251.61`，也可通过 `proxy.b1.church` 访问。B1Admin 的“设置→域名”页面会指示教会添加一条顶点 `A → 3.23.251.61` 记录或一条 `CNAME → proxy.b1.church` 记录。Caddy 使用每个域名单独的 Let's Encrypt 证书终止 TLS，将 `Host` 头改写为该域名对应的 `{sub}.b1.church` 上游，并反向代理到 B1App——B1App 随后会像处理原生子域名一样按主机标签进行路由（见上文的[自定义域名](#custom-domains)）。

上游映射来自 `DomainRepo.loadPairs`，其拨号目标会对分配站点的子域名执行 COALESCE，因此域名会代理到正确的*次要*站点，若无则回退到教会的主站点：

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

`www.*` 记录会被排除在映射之外；Caddy 通过 `302` 重定向到顶点域名来处理 `www.{host}`。

### 两个为边缘层提供数据的匿名接口

`DomainController` 公开了两个无需认证、只读的接口，由主机直接使用——由于边缘层在任何教会上下文存在之前就会查询它们，因此它们必须是匿名的：

| 接口 | 返回 | 作用 |
|----------|----------|------|
| `GET /membership/domains/authorize?domain=` | 如果该域名——或对于 `www.` 未命中的情况，其裸顶点域名——存在于 `domains` 中，则返回 `200`；否则返回 `404`（包括 `domain` 为空的情况） | Caddy 的**按需 TLS `ask`**：决定是否为传入的 SNI 签发证书的滥用控制机制 |
| `GET /membership/domains/hostmap` | `text/plain`，每个可路由域名一行，按排序输出 `{domain} {sub}.b1.church` | 主机定期刷新的主机→上游映射文件 |

`authorize` 复用 `DomainRepo.loadByName`（精确主机，然后单次 `www.`→顶点重试）；`hostmap` 复用 `loadPairs`——因此它能感知站点，并排除 `www.*`，与代理路由完全一致——并仅去掉 `:443` 后缀。

### 域名保存/删除——一次尽力而为的推送

`DomainController.save` 会写入 `domains` 记录，然后进行**一次尽力而为**的 `CaddyHelper.updateCaddy()` 调用，该调用包裹在 `try/catch` 中，会记录日志（`console.error`）并吞掉错误；`delete` 也是如此（这也修复了之前删除时路由陈旧的 bug），次要站点的删除（`SiteController.delete`）同样如此。`updateCaddy` 本身受 **10 秒** Axios 超时限制，因此无法访问或已停止的 Caddy 永远不会导致域名保存返回 `500`——`domains` 表才是数据的真正来源。

### 当前状态——静态配置，无运行时状态

该主机（位于永久弹性 IP 之后的 Windows EC2）从一份**静态 Caddyfile** 运行 Caddy：按需 TLS，其 `ask` 指向 `/membership/domains/authorize`，另外还有一个主机→上游映射文件，由一个计划任务每 5 分钟从 `/membership/domains/hostmap` 刷新一次，该任务以优雅的 `caddy reload` 结束。配置在重启后依然保留，无需任何运行时状态——无需重新预热；未知的 SNI 会被**拒绝 TLS 握手**（不会为 `authorize` 拒绝的主机签发证书），而已授权但尚未映射的主机（在同步窗口内的全新域名）则会收到干净的 404。新域名在保存后约 5 分钟内即可路由；其证书会在首次访问时签发。构建/设置、运维以及经过实战检验的注意事项，请参阅 [Caddy 自定义域名代理](../deployment/caddy-proxy)。

### 旧版运行时推送——回滚路径，待删除

`CaddyHelper`（membership 模块）仍可通过其**管理 API** 驱动 Caddy，地址为 `caddyHost:caddyPort`（SSM `caddyHost`/`caddyPort`；未设置时为空操作；在 `ServerHealthController` 的 Integrations 分组下展示）：`updateCaddy()` 会 PATCH 一个完整的路由数组，而 `initializeCaddy()` 加上 `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` 接口则会从头重建一个运行时配置的服务器。该模式的配置只存在于 Caddy 的内存中——正是本架构所取代的"重启即遗忘"问题。这部分机制仅作为回滚路径保留，并计划在静态主机稳定运行后删除；域名保存/删除时的尽力而为 `updateCaddy()` 推送对静态主机来说是无害的空操作（其管理 API 仅限 localhost 访问）。

## 相关页面

- [Caddy 自定义域名代理](../deployment/caddy-proxy) —— 边缘主机本身：全新主机设置、WinSW 服务、映射同步任务以及运维注意事项
- [网站构建器](./website-builder) —— 页面/分区/元素树、渲染器、博客、SEO 和 AI 生成（请求解析到教会/站点后实际渲染的内容）
- [内容接口](../api/endpoints/content) —— 页面、区块、链接和全局样式的 REST 接口，现均支持 `?siteId=`
- [B1App](../web-apps/b1-app) —— 承载中间件和 `[sdSlug]` 路由的 Next.js 应用
- [Web 应用部署](../deployment/web-apps) —— B1App 如何部署到 Vercel
