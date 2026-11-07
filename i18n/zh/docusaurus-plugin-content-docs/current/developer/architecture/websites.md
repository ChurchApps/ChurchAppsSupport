---
title: "网站路由与多站点"
description: "B1.church 如何将子域名和自定义域名映射到对应的教会或次要网站，以及处理自定义域名 TLS 的 Caddy 边缘节点。"
---

# 网站路由与多站点

<div class="article-intro">

一个教会现在可以提供多个不同的网站，每个网站都可以位于 `*.b1.church` 子域名上，也可以位于完全自定义的、归教会所有的域名上。本页梳理的是位于构建器*下层*的路由层：传入请求如何同时解析到某个教会**以及**某个具体站点，多站点的数据模型（即保证所有既有站点渲染不变的 `siteId` 哨兵值），以及自定义域名的边缘层——即在 EC2 上自行管理的 Caddy 代理，它负责终止 TLS，并将每个教会域名重写到其 `*.b1.church` 上游。关于请求解析完成后实际渲染的内容（页面/区块/元素树），请参阅[网站构建器](./website-builder.md)。

</div>

## 概览

```
   grace.b1.church              www.gracechurch.org  （自定义域名）
   （b1.church 子域名）                  │
          │                               ▼
          │             ┌──────────────────────────────────────────┐
          │             │ Caddy 边缘层 —— EC2 3.23.251.61           │
          │             │             (proxy.b1.church)             │
          │             │  • 终止 TLS（每个域名的 LE 证书）          │
          │             │  • 将 Host 重写为 {sub}.b1.church         │
          │             │  • 反向代理到 B1App                       │
          │             └────────────────────┬─────────────────────┘
          │                  Host = {sub}.b1.church
          ▼                                  ▼
   ┌────────────────────────────────────────────────────────────┐
   │ B1App src/middleware.ts                                     │
   │  • 始终：删除客户端提供的任何 x-site（防伪造）                  │
   │  • 内部 *.b1.church Host ⇒ 域名查询保持惰性                    │
   │  • 原始自定义 Host（绕过 Caddy）⇒ 查询 → 设置 x-site           │
   └───────────────────────────┬────────────────────────────────┘
                               ▼  next.config.mjs → host 的第一段标签 → /[sdSlug]/…
              ┌─────────────────────────────────────────────────┐
              │ [sdSlug] · ConfigHelper.load(sdSlug)             │
              │   GET /membership/churches/lookup/?subDomain=…   │
              │   → { id, name, subDomain, siteId? }             │
              │   将 ?siteId= 传入每个内容调用：                  │
              │   /content/pages/:id/tree · /globalStyles ·      │
              │   /blocks/public/footer · /links · sitemap       │
              └─────────────────────────────────────────────────┘

  域名保存/删除（B1Admin 设置→域名 → POST /membership/domains）
        └─ 尽力而为的 CaddyHelper.updateCaddy()（已包裹、非致命，10 秒超时）
  Caddy 通过两个匿名端点直接读取 domains 表：
        GET /membership/domains/authorize  — 按需 TLS 的 `ask`（已知 200 / 未知 404）
        GET /membership/domains/hostmap    — host→{sub}.b1.church 映射（每 5 分钟刷新）
```

该层遵循三条规则：

1. **哨兵值保证向后兼容。** `siteId = ''` 表示主站点。在此功能推出之前存在的每个页面、区块、链接、全局样式和域名行都带有 `''`，并且渲染方式与之前完全相同。*第二个*网站只是一组 `siteId` 非空的行，而任何未携带 `?siteId=` 调用的内容端点都会返回主站点——与旧请求逐字节一致。
2. **基于主机标签的解析，且最终收敛。** `*.b1.church` 子域名直接按其主机标签路由；自定义域名则在 B1App 看到它之前，就由 Caddy 边缘层重写为其 `{sub}.b1.church` 标签（同时，中间件的数据库查询会为任何原始的自定义 `Host` 设置一个 `x-site` 请求头作为备用）。两条路径最终都落在同一个 `[sdSlug]` 路由和同一个 `churches/lookup` 调用上，因此下游的渲染完全一致。
3. **Caddy 边缘层对唯一的数据源是无状态的。** 自定义域名在 EC2 上自行管理的 Caddy 代理处终止，该代理会将每个域名重写到其 `{sub}.b1.church` 上游。域名保存会触发一次尽力而为的 `CaddyHelper.updateCaddy()`，同时 Caddy 也会直接读取 `domains` 表（即下文的 `authorize` 和 `hostmap` 端点）。该表是权威数据源——无法访问的 Caddy 永远不会导致保存失败。

## 站点解析

### `*.b1.church` 子域名

`B1App/next.config.mjs` 会根据主机名重写传入的请求。一条主机规则使用模式 `(?<subdomain>.*?)\..*`，捕获主机的**第一段标签**，并将 `/` 和 `/:path*` 重写为 `/{subdomain}`——即 `[sdSlug]` App Router 段。因此 `grace.b1.church/about` 会变为 `/grace/about`。

在 `src/app/[sdSlug]/` 内部，`ConfigHelper.load(sdSlug)`（`src/helpers/ConfigHelper.ts`）会调用 `GET /membership/churches/lookup/?subDomain={sdSlug}`。`ChurchController.getBySubDomain` 的响应现在有两种分支：

| 匹配的 slug | 响应 | 含义 |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | 该教会的主站点 |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | **辅助站点**——控制器回退到 `sites`，解析所属的教会，并回显所查询的 slug 以及额外的 `siteId` |

这个额外的 `siteId` 是区分辅助站点请求与主站点请求的唯一依据；流水线中的其他部分均为共享。

与任何一张表都不匹配的 slug 会以 `200` 返回 `{}`。`ConfigHelper.load` 会将没有 `id` 的响应视为未知站点，并调用 Next 的 `notFound()`，因此未知的子域名会得到真正的 404，而不是让之后的每个调用都请求 `/…/undefined`。构建器页面路由也会通过 `pageTreePath()`（`src/helpers/pageTreePath.ts`）构建其树路径，该函数会对 slug 进行 URL 编码，因此格式错误的 slug（反斜杠、空格）会返回 404，而不是将 API 的 `400` 暴露为 500。

### 自定义域名 {#custom-domains}

教会自有的域名在 **Caddy 边缘层**（详见下文）终止，该层会在代理到 B1App 之前，将 `Host` 请求头重写为站点的 `{sub}.b1.church`。因此在正常路径上，B1App 接收到的是*内部的* `*.b1.church` 主机，并像处理原生子域名一样按主机标签解析它——中间件的数据库查询永远不会触发。`src/middleware.ts` 仍然会在每个请求上运行，但只承担一项始终生效的任务和一项备用任务：

1. **始终执行** —— 它会**删除任何客户端提供的 `x-site` 请求头**。该请求头是可被伪造的重写输入，只有在中间件本身设置它时才会被信任；在 Caddy 之后，删除它是中间件真正的职责。
2. **仅针对非内部 `Host` 的备用路径** —— 对于绕过 Caddy 的重写而直接到达 B1App 的原始自定义域名 `Host`，它会调用 `GET /membership/domains/public/lookup/{host}`，如果返回了 `subDomain`，则设置 `x-site: {subDomain}.b1.church`。在 Caddy 之后，此分支处于惰性状态，因为 `Host` 已经是 `*.b1.church`。

内部主机——`localhost`、`b1.church`，以及后缀为 `.b1.church`、`.localtest.me`、`.localhost`、`.up.railway.app`、`.vercel.app` 的主机——会完全跳过查询（它们已经通过主机标签重写完成解析，或者属于预览/部署主机）。

查询本身（`DomainRepo.loadByName`）对 `domains → churches` 和 `domains → sites` 执行左连接，并返回 `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)`——如果域名指向某个辅助站点，则返回该辅助站点的子域名，否则返回教会的子域名。它首先精确匹配主机；如果该主机以 `www.` 开头且未命中，则会**重试一次**，改为匹配裸顶级域名（apex）。

回到 `next.config.mjs`，`x-site` 重写规则被放置在通用主机规则**之前**，因此会优先生效。`x-site: grace.b1.church` → 第一段标签 `grace` → `[sdSlug] = grace`，此后的解析与子域名路径完全相同（相同的 `churches/lookup`，相同的 `siteId`）。

:::info
从外部来看，`x-site` 请求头是不可信的。中间件会无条件地剥离任何传入的 `x-site`，然后再有选择地设置它自己的值，并且重写规则只会看到由中间件设置的值——客户端无法通过发送请求头强行访问另一个教会的内容。
:::

中间件的两个运行细节：

- **缓存。** 每个主机的结果（命中*或*确认未命中——网络错误则不缓存）会在每个无服务器隔离环境中以内存中的 `Map` 缓存 **10 分钟**。
- **匹配器。** 匹配器刻意重新包含了 `/sitemap.xml`、`/robots.txt` 和 `/manifest.webmanifest`。其第一个模式会排除带点的路径，否则这些文件会被丢弃；将它们重新加入，可以确保自定义域名的各教会 SEO/PWA 文件也能收到 `x-site` 请求头。
- **规范（canonical）请求头。** 对于教会页面，中间件会追加一个 `Link: <{proto}://{host}{path}>; rel="canonical"` 响应头，指明页面实际提供服务的主机——子域名或自定义域名（`helpers/canonicalLink.ts`）。当自定义域名通过 [Caddy 代理](../deployment/caddy-proxy.md)到达 B1App 时，请求主机是 `{sub}.b1.church` 子域名，因此中间件会改为从 `X-Church-Host` 获取访问者的域名——但前提是 `/domains/public/lookup/{host}` 确认该域名映射到同一个子域名（`ownsSubdomain()`）。随后，规范链接、`robots.txt` 和 `sitemap.xml` 都会指向自定义域名，而不是 `b1.church` 子域名。在非教会主机（`b1.church`、`localhost`、`*.vercel.app`、`*.up.railway.app`）以及 `/mobile`、`/login`、`/logout` 和生成的 robots/sitemap/manifest 文件上，该功能会被跳过。

### 已禁用的公开网站

教会可以在 B1Admin 中开启 **Disable Public Website**（禁用公开网站）（教会级别的内容设置 `hidePublicSite = "true"`）。此后，该站点将只提供面向成员的路由：

- **B1App 中间件** 会查询子域名（先 `/membership/churches/lookup`，然后 `/content/settings/public/:churchId`），并将匿名用户对任何不在白名单内的路径的请求重定向到 `/login?returnUrl={path}{query}`。白名单（`helpers/publicSite.ts`）包括 `/login`、`/logout`、`/mobile/*`、`/register/*`、`/guest-register`，以及 manifest/robots/sitemap 文件。只有已确认的结果才会被缓存（生产环境为 60 秒，因为管理员的 revalidate 调用无法清除这个按实例划分的映射；开发/测试环境则不缓存）。API 出错时仍会提供站点服务，而不是把所有人都锁在外面。
- **已登录成员可以看到完整站点。** 携带未过期 `jwt` Cookie 的请求（中间件的 `hasSession()` 会解码载荷中的 `exp`，但不验证签名——这是软性闸门，而非访问控制）会跳过重定向，因此成员登录后会返回其请求的页面，并看到正常的页面、内置页面（小组、讲道等）和页眉导航。页面组件和 `Header` 不再自行检查 `hidePublicSite`。
- **`robots.txt`** 会禁止所有内容，与 noindex 主机的做法相同。
- **API。** `GET /content/pages/public/:churchId`（站点地图的页面列表）返回 `[]`，因此匿名调用者无法列出页面。

### `siteId` 的传递

`ConfigHelper` 会将解析出的 `siteId` 存储在其每次请求的 `ConfigurationInterface` 上（通过 React `cache()` 进行记忆化），并将 `?siteId=` 附加到它及页面组件发出的内容调用中——但这是**有条件的**：空的 `siteId`（主教会子域名）会完全省略该参数。被传递的端点包括页面树（`/content/pages/:id/tree`）、站点地图使用的公开页面列表（`/content/pages/public/:id`）、全局样式（`/content/globalStyles/church/:id`）、导航链接（`/content/links/church/:id`），以及独立的页脚区块（`/content/blocks/public/footer/:id`）。在正常的渲染路径上，页脚随页面树一同到达（标记为 `zone: "siteFooter"` 的区块），且该页面树已使用 `siteId` 获取，因此不存在未限定范围的页脚缺口。

成员门户（B1App `mobile`）刻意不在此范围之内：`loadChurchAppearance.ts` 通过 `churches/lookup` 解析教会，但读取的是教会级别的 `/settings/public/{id}`，并且从不传递 `siteId`——在 v1 中，成员门户是全教会范围的（见下文）。

## 每个教会的多个网站

### 数据模型

新的 `membership.sites` 表刻意保持精简：

| 列 | 类型 | 说明 |
|--------|------|-------|
| `id` | `char(11)` 主键 | |
| `churchId` | `char(11)` | 所属教会 |
| `name` | `varchar(255)` | 显示名称（例如"Español"、"Youth"） |
| `subDomain` | `varchar(45)` | **唯一索引**——全局命名空间（见下文） |

站点范围的界定随后只需在内容表和域名表中添加一个非空列：

| 数据表（模块） | 列 | `''` 的含义 |
|----------------|--------|-----------|
| `domains`（membership） | `siteId char(11) NOT NULL DEFAULT ''` | 该域名提供主站点服务 |
| `pages`、`links`、`globalStyles`、`blocks`（content） | `siteId char(11) NOT NULL DEFAULT ''` | 主站点——而在 **`blocks`** 上，`''` 还额外表示*在所有站点之间共享* |

两个迁移脚本添加了上述所有内容（`tools/migrations/membership/2026-07-02_sites.ts`、`tools/migrations/content/2026-07-02_site_id.ts`）。由于该列默认为 `''`，所有既有行都保持当前的行为，无需回填数据。

**全局子域名命名空间。** `sites.subDomain` 与 `churches.subDomain` 共享*同一个*命名空间——辅助站点的子域名永远不会与某个教会的子域名或另一个站点的子域名发生冲突。这一点在**两条**保存路径上都会强制执行：`SiteController.save` 会拒绝命中 `churches` 或 `sites` 的 slug，而 `ChurchController.validateSave` 则反向执行相同的检查。在数据库层面，`sites.subDomain` 上的唯一索引为其提供保障。

**页面的唯一性**从 `(churchId, url)` 扩展为 `(churchId, siteId, url)`，因此同一教会的两个站点各自都可以拥有自己的 `/about`。

### 带回退的站点级内容

每个站点范围内的内容**列表/树**端点都接受可选的 `?siteId=`（缺省即为 `''`，即主站点）：页面树 / 列表 / 公开页面、区块列表 / 按类型 / 页脚、链接（匿名 / 筛选 / 全部），以及全局样式。区块和元素并不直接受范围限定——它们通过其父页面或区块继承。

有两条解析链承担了主要的工作：

- **全局样式——`站点 → 主站点 → 默认`。** `GlobalStyleRepo.loadForChurch(churchId, siteId)` 返回该站点自己的行；如果辅助站点没有自己的行，则会原样返回**主站点（`''`）的行**（保留主站点的 `id`/`siteId`，客户端会用它们进行写时复制）；如果连主站点也没有，`GlobalStyleController` 会返回硬编码的默认配色和字体。
- **页脚区块——站点专属的优先，共享的作为回退。** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` 会同时返回共享的（`''`）行和站点专属的行；解析器若存在站点自己的页脚则选用它，否则选用共享的页脚。同样的逻辑在 `TreeHelper.insertBlocks`（页面树）和独立的 `/content/blocks/public/footer/:churchId` 端点中都会运行。

### 站点删除级联

`SiteController.delete`（受会员模块的 Settings→Edit 权限控制）分三步拆除一个辅助站点：

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` 级联删除该站点拥有的所有内容：其**页面**→其区块、元素、`pageHistory` 和 `posts`；其自有的**区块**→其区块、元素和 `pageHistory`；其**链接**和 **globalStyles**。一项守卫会拒绝对 `''` 执行该操作——主站点/共享哨兵值永远不会被级联删除。
2. `DomainRepo.clearSiteId` 会将该站点的域名**重新分配**回主站点（`siteId → ''`），而不是将其删除，因此自定义域名在站点删除后依然保留。
3. 删除 `sites` 行，并重新同步 Caddy 路由（尽力而为）。

### B1Admin 界面

| 功能 | 位置 | 机制 |
|-----------|-----------|-----------|
| 站点切换器 | `useSiteSelection` + `SiteSwitcher`（空值 = "Main Website"（主网站）） | 读取 `?site=` URL 参数，并将其作为 `?siteId=` 传入 ContentApi 调用。出现在三个站点**列表**区域——**Pages**（页面）、**Blocks**（区块）、**Appearance**（外观）——但不出现在页面/区块编辑器中，因为编辑器会将 `siteId` 记录在记录本身上 |
| 站点的创建/删除 | `SitesDialog`，从切换器的"Manage websites…"（管理网站……）条目打开 | `POST /membership/sites` / `DELETE /membership/sites/:id`（名称 + subDomain）。受会员模块的 Settings→Edit 权限控制（服务端为 `Permissions.settings.edit`；B1Admin 中为 `Permissions.membershipApi.settings.edit`）。**仅支持创建/删除——v1 中没有重命名界面** |
| 按域名分配站点 | 设置→域名下的 `DomainSettingsEdit` | 每一行的站点下拉菜单会针对每个域名将 `siteId` 提交到 `/membership/domains`。如果 API 没有返回任何站点（较旧的后端），则隐藏该列 |
| 写时复制样式 | `StylesManager.prepareForSave` | 当加载的全局样式行的 `siteId` 与所选站点不匹配时（即 API 将继承的主站点作为回退返回），它会去掉主站点的 `id` 并标记当前的 `siteId`，从而强制**插入**一条新的站点专属行，而不是覆盖主站点的行。同样的分叉逻辑也适用于站点页脚区块 |

:::info
**v1 中保持全教会范围的内容（这是刻意的范围选择，而非数据模型的限制）：** **博客**（`BlogPage` 没有切换器，并且加载 `/posts` 时不带 `siteId`）、**站点小组件**（公告横幅 + 启动器）、**重定向**、**标志 / GA4 / 教会设置**，以及**成员门户**（B1App mobile）。请注意，这*并非*"整个外观（Appearance）"——辅助站点的全局样式（配色、字体、排版、间距、导航、自定义 CSS）**确实**通过上述写时复制路径实现了站点级别的独立；只有外观页面中的横幅/启动器/重定向/标志子面板仍然是全教会范围的。
:::

## 自定义域名：Caddy 边缘层（静态配置方案）

:::info
**方向已于 2026-07-02 修订。** 此前将自定义域名托管迁移到 Vercel 托管域名的计划已**取消**，所有 Vercel 域名注册代码（`VercelHelper`、其 `vercelToken`/`vercelProjectId`/`vercelTeamId` 环境变量、SSM 参数和健康检查条目）均已从 Api 中移除。在 EC2 上自行管理的 **Caddy 代理保留下来**，作为永久的自定义域名边缘层。剩下的工作纯属内部事务：将 Caddy 的*运行时*管理 API 配置替换为能在重启后保持不变的*静态*配置。
:::

### 边缘层

每个自定义的教会域名都将 DNS 指向同一台 EC2 主机——`3.23.251.61`，也可通过 `proxy.b1.church` 访问。B1Admin 的设置→域名页面会指示教会添加裸域名 `A → 3.23.251.61` 或 `CNAME → proxy.b1.church`。Caddy 使用每个域名专属的 Let's Encrypt 证书终止 TLS，将 `Host` 请求头重写为该域名的 `{sub}.b1.church` 上游，并反向代理到 B1App——B1App 随后会像处理任何原生子域名一样，按主机标签对其进行路由（参见上文的[自定义域名](#custom-domains)）。

上游映射来自 `DomainRepo.loadPairs`，其拨号目标会对**分配站点的子域名进行 COALESCE**，因此域名会被代理到正确的*辅助*站点，若无则回退到教会的主站点：

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

`www.*` 行会从映射中排除；Caddy 则通过向裸域名发送 `302` 重定向来服务 `www.{host}`。

### 为边缘层提供数据的两个匿名端点

`DomainController` 公开了两个无需身份验证、只读的端点，由主机直接调用——由于边缘层在任何教会上下文存在之前就会查询它们，因此出于必要它们必须是匿名的：

| 端点 | 返回 | 作用 |
|----------|---------|------|
| `GET /membership/domains/authorize?domain=` | 如果该域名——或对于 `www.` 未命中的情况，其裸域名——存在于 `domains` 中，则返回 `200`；否则返回 `404`（包括空的 `domain`） | Caddy 的**按需 TLS `ask`**：决定是否为传入的 SNI 签发证书的滥用控制机制 |
| `GET /membership/domains/hostmap` | `text/plain`，每个可路由域名一行、已排序的 `{domain} {sub}.b1.church` | 主机定时刷新的 host→上游映射文件 |

`authorize` 复用了 `DomainRepo.loadByName`（精确主机，然后进行一次 `www.`→裸域名的重试）；`hostmap` 复用了 `loadPairs`——因此它能感知站点，并排除 `www.*`，与代理路由完全一致——只是去掉了 `:443` 后缀。

### 域名保存/删除——一次尽力而为的推送

`DomainController.save` 会写入 `domains` 行，然后进行**一次尽力而为**的 `CaddyHelper.updateCaddy()` 调用，该调用包裹在 `try/catch` 中，记录日志（`console.error`）后将错误吞掉；`delete` 也执行相同的操作（这同时也修复了之前删除时路由陈旧的 bug），辅助站点删除（`SiteController.delete`）亦是如此。`updateCaddy` 本身受 **10 秒** Axios 超时限制，因此无法访问或已停止的 Caddy 永远不会导致域名保存返回 `500`——`domains` 表才是事实来源。

### 当前状态——静态配置，无运行时状态

该主机（位于永久弹性 IP 之后的 Windows EC2）从一份**静态的 Caddyfile**运行 Caddy：按需 TLS，其 `ask` 指向 `/membership/domains/authorize`；另外还有一个主机→上游映射文件，由计划任务每 5 分钟从 `/membership/domains/hostmap` 刷新一次，并以优雅的 `caddy reload` 结束。配置在重启后依然有效，无需任何运行时状态，也无需重新"预热"——未知的 SNI 会被 **TLS 拒绝**（对 `authorize` 拒绝的主机不会签发证书），而已授权但尚未映射的主机（同步窗口内的全新域名）则会收到干净的 404。新域名在保存后约 5 分钟内即可路由；其证书会在首次访问时签发。构建/设置、运维以及经过实践检验的注意事项：参见 [Caddy 自定义域名代理](../deployment/caddy-proxy.md)。

### 旧版运行时推送——回滚路径，待删除

`CaddyHelper`（membership 模块）仍然可以通过其**管理 API** 驱动 Caddy，地址为 `caddyHost:caddyPort`（SSM 的 `caddyHost`/`caddyPort`；未设置时为空操作；在 `ServerHealthController` 的 Integrations 组中显示）：`updateCaddy()` 会 PATCH 一个完整的路由数组，而 `initializeCaddy()` 以及 `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` 端点则会从头重建一个运行时配置的服务器。该模式的配置仅存在于 Caddy 的内存中——正是本架构所取代的"重启即失忆"问题。这套机制仅作为回滚路径保留，并计划在静态主机稳定运行后删除；域名保存/删除时的尽力而为 `updateCaddy()` 推送对静态主机而言是无害的空操作（其管理 API 仅限 localhost）。

## 相关页面

- [Caddy 自定义域名代理](../deployment/caddy-proxy.md) —— 边缘主机本身：全新主机的设置、WinSW 服务、映射同步任务以及运维注意事项
- [网站构建器](./website-builder.md) —— 页面/区块/元素树、渲染器、博客、SEO 和 AI 生成（请求解析到某个教会/站点之后渲染的内容）
- [内容端点](../api/endpoints/content.md) —— 页面、区块、链接和全局样式的 REST 接口，现均支持 `?siteId=`
- [B1App](../web-apps/b1-app.md) —— 承载中间件和 `[sdSlug]` 路由的 Next.js 应用
- [Web 应用部署](../deployment/web-apps.md) —— B1App 如何部署到 Vercel
