---
title: "网站路由与多站点"
---

# 网站路由与多站点

<div class="article-intro">

现在,一个教会可以承载不止一个独立网站,每个网站既可以运行在 `*.b1.church` 子域名下,也可以运行在完全自定义、教会自有的域名下。本页面梳理的是位于构建器*之下*的路由层：一个进入的请求如何解析到某个教会**以及**某个具体站点、多站点数据模型（那个能让所有既有站点渲染行为保持不变的 `siteId` 哨兵值）,以及自定义域名边缘——一个部署在 EC2 上、自主维护的 Caddy 反向代理,负责终止 TLS,并将各个教会域名改写到其对应的 `*.b1.church` 上游。至于一个请求解析完成后实际渲染的内容——页面/版块/元素树——请参见[网站构建器](./website-builder)。

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

以下三条规则贯穿这一层：

1. **一个哨兵值让一切保持向后兼容。**`siteId = ''` 代表主站点。这项功能上线前就存在的每一个页面、区块、链接、全局样式和域名记录都携带 `''`,渲染表现与以往一模一样。所谓“第二个”网站,不过是一组带有非空 `siteId` 的记录;任何未携带 `?siteId=` 调用的内容端点都会返回主站点内容——与旧请求逐字节一致。
2. **域名解析基于主机标签,并最终收敛到同一路径。**一个 `*.b1.church` 子域名直接按其主机标签路由;一个自定义域名会在到达 B1App 之前,在 Caddy 边缘被改写为其对应的 `{sub}.b1.church` 标签（并有一个中间件层的数据库查询,作为在原始自定义 `Host` 情况下的兜底方案,为其打上 `x-site` 请求头）。两条路径最终都会落到同一个 `[sdSlug]` 路由,以及同一次 `churches/lookup` 调用上,因此下游渲染逻辑完全一致。
3. **Caddy 边缘本身无状态,依赖单一事实来源。**自定义域名终止于一个自主维护、部署在 EC2 上的 Caddy 反向代理,该代理会把每个域名改写到其对应的 `{sub}.b1.church` 上游。保存一个域名会触发一次尽力而为的 `CaddyHelper.updateCaddy()` 调用,而 Caddy 本身也会直接读取 `domains` 表（见下方的 `authorize` 和 `hostmap` 两个端点）。这张表才是权威数据源——Caddy 不可达绝不会导致域名保存失败。

## 站点解析

### `*.b1.church` 子域名

`B1App/next.config.mjs` 按主机名对进入的请求进行改写。一条主机规则以模式 `(?<subdomain>.*?)\..*` 捕获主机名的**第一段**,并将 `/` 和 `/:path*` 改写为 `/{subdomain}`——也就是 `[sdSlug]` 这个 App Router 路由段。因此 `grace.b1.church/about` 会变成 `/grace/about`。

在 `src/app/[sdSlug]/` 内部,`ConfigHelper.load(sdSlug)`（`src/helpers/ConfigHelper.ts`）会调用 `GET /membership/churches/lookup/?subDomain={sdSlug}`。`ChurchController.getBySubDomain` 的响应现在有两个分支：

| 匹配到的 slug | 响应内容 | 含义 |
|--------------|----------|------|
| `churches.subDomain` | `{ id, name, subDomain }` | 该教会的主站点 |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | 一个**次要站点**——控制器会回退到 `sites` 表,解析出所属的教会,并原样返回所查询的 slug 及额外的 `siteId` |

那个额外的 `siteId` 是区分“次要站点请求”与“主站点请求”的唯一标志;流水线中的其他一切逻辑都是共享的。

### 自定义域名

一个教会自有的域名会终止于 **Caddy 边缘**（详见下文）,后者会先把 `Host` 请求头改写为该站点的 `{sub}.b1.church`,再转发给 B1App。因此在正常路径下,B1App 收到的是一个*内部*的 `*.b1.church` 主机名,并像处理原生子域名一样按主机标签解析它——中间件的数据库查询根本不会触发。`src/middleware.ts` 依然会在每个请求上运行,但只做一件常规工作和一件兜底工作：

1. **始终执行** —— 它会**删除任何客户端提交的 `x-site` 请求头**。这个请求头是可被伪造的改写输入,只有在中间件自己设置的情况下才会被信任;剥离它正是中间件在 Caddy 之后要做的真正工作。
2. **兜底,仅针对非内部 `Host`** —— 对于一个绕开了 Caddy 改写、直接到达 B1App 的原始自定义域名 `Host`,中间件会调用 `GET /membership/domains/public/lookup/{host}`,如果返回了一个 `subDomain`,就设置 `x-site: {subDomain}.b1.church`。在 Caddy 之后的正常路径上,由于 `Host` 已经是 `*.b1.church` 形式,这个分支不会被触发。

内部主机名——`localhost`、`b1.church`,以及后缀为 `.b1.church`、`.localtest.me`、`.localhost`、`.up.railway.app`、`.vercel.app` 的主机名——会完全跳过这次查询（它们要么已经通过主机标签改写解析完毕,要么本就是预览/部署环境的主机名）。

查询本身（`DomainRepo.loadByName`）会对 `domains → churches` 和 `domains → sites` 做左连接,并返回 `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)`——如果该域名指向某个次要站点,就返回该站点的子域名,否则返回该教会的子域名。它会先精确匹配主机名;如果该主机名以 `www.` 开头且未匹配上,会**再重试一次**,匹配去掉前缀后的裸域名。

回到 `next.config.mjs`,`x-site` 的改写规则被放在通用主机规则**之前**,因此它会优先生效。`x-site: grace.b1.church` → 第一段 `grace` → `[sdSlug] = grace`,从这里开始,解析过程与子域名路径完全一致（同样的 `churches/lookup`,同样的 `siteId`）。

:::info
`x-site` 请求头从外部来看是不可信的。中间件会无条件剥离任何入站的 `x-site`,然后再视情况自行设置一个;改写规则也只会看到中间件设置的值——客户端无法通过发送一个请求头就把自己强行接到另一个教会的内容上。
:::

关于中间件还有两个运维细节：

- **缓存。**每个主机名的解析结果（无论是命中,还是确认过的未命中——但绝不会缓存网络错误)都会在一个内存中的 `Map` 里缓存 **10 分钟**,按每个无服务器实例（isolate）独立缓存。
- **匹配器。**该匹配器特意重新纳入了 `/sitemap.xml`、`/robots.txt` 和 `/manifest.webmanifest`。它的第一条匹配模式会排除带点的路径,否则会误伤这几个文件;因此把它们重新加了回来,以确保一个自定义域名的按教会区分的 SEO/PWA 文件也能拿到 `x-site` 请求头。

### `siteId` 的贯穿传递

`ConfigHelper` 会把解析出的 `siteId` 保存在其按请求生成的 `ConfigurationInterface` 中（使用 React 的 `cache()` 做记忆化),并将其以 **有条件的方式** 附加为 `?siteId=` 参数,传给自身以及各页面组件所发起的内容调用——空的 `siteId`（即主教会子域名的情况）会完全省略这个参数。会传递 `siteId` 的端点包括：页面树（`/content/pages/:id/tree`）、站点地图所用的公开页面列表（`/content/pages/public/:id`）、全局样式（`/content/globalStyles/church/:id`）、导航链接（`/content/links/church/:id`）,以及独立的页脚区块端点（`/content/blocks/public/footer/:id`）。在正常渲染路径下,页脚是随页面树一起到达的（标记为 `zone: "siteFooter"` 的版块),本身已经带着 `siteId` 一并获取,因此不存在页脚数据脱离站点范围的缺口。

会员门户（B1App 的 `mobile` 部分）刻意被排除在这套体系之外：`loadChurchAppearance.ts` 通过 `churches/lookup` 解析出教会,但读取的是教会级别的 `/settings/public/{id}`,从不传递 `siteId`——在 v1 版本中,门户是全教会通用的（见下文）。

## 每个教会拥有多个网站

### 数据模型

新增的 `membership.sites` 表被刻意设计得非常小巧：

| 列 | 类型 | 说明 |
|--------|------|-------|
| `id` | `char(11)`主键 | |
| `churchId` | `char(11)` | 所属教会 |
| `name` | `varchar(255)` | 展示名称（例如“西班牙语站”“青年站”） |
| `subDomain` | `varchar(45)` | **唯一索引**——全局命名空间（详见下文） |

站点范围限定随后只是在内容表和域名表中添加了一个单一的非空默认列：

| 表（所属模块） | 列 | `''` 的含义 |
|----------------|--------|-----------|
| `domains`（membership） | `siteId char(11) NOT NULL DEFAULT ''` | 该域名服务于主站点 |
| `pages`、`links`、`globalStyles`、`blocks`（content） | `siteId char(11) NOT NULL DEFAULT ''` | 主站点——此外对于 **`blocks`** 而言,`''` 还额外表示*跨所有站点共享* |

两个迁移脚本负责添加这一切（`tools/migrations/membership/2026-07-02_sites.ts`、`tools/migrations/content/2026-07-02_site_id.ts`）。由于该列默认为 `''`,所有既有记录都无需回填即可保持既有行为。

**全局子域名命名空间。**`sites.subDomain` 与 `churches.subDomain` 共享*同一个*命名空间——一个站点子域名永远不能与某个教会的子域名或另一个站点的子域名冲突。这一点在**两条**保存路径上都被强制执行：`SiteController.save` 会拒绝一个同时命中 `churches` 或 `sites` 的 slug,`ChurchController.validateSave` 也会反向执行同样的检查。数据库层面还有一个 `sites.subDomain` 上的唯一索引作为兜底。

**页面唯一性**约束已从 `(churchId, url)` 扩展为 `(churchId, siteId, url)`,因此同一个教会的两个站点可以各自拥有自己的 `/about`。

### 按站点区分的内容,及其兜底逻辑

每一个按站点区分的内容**列表/树形**端点都接受一个可选的 `?siteId=`（缺省时视为 `''`,即主站点）：页面树/列表/公开接口、区块列表/按类型/页脚、导航链接（匿名/已过滤/全部),以及全局样式。版块和元素本身*不*直接区分站点——它们通过所属的页面或区块继承站点归属。

有两条解析链路值得关注：

- **全局样式——“站点自身 → 主站点 → 默认值”。**`GlobalStyleRepo.loadForChurch(churchId, siteId)` 会返回该站点自己的记录;如果一个次要站点没有自己的记录,则原样返回**主站点（`''`）的记录**（保留主站点的 `id`/`siteId`,客户端会依据这一点来实现“写时复制”);如果连主站点的记录都不存在,`GlobalStyleController` 会返回一套硬编码的默认配色/字体方案。
- **页脚区块——站点专属优先,共享区块兜底。**`BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` 会同时返回共享（`''`）*和*站点专属的记录;解析器会优先选用该站点自己的页脚,若无则回退到共享页脚。这一逻辑同时运行于 `TreeHelper.insertBlocks`（页面树)和独立的 `/content/blocks/public/footer/:churchId` 端点中。

### 站点删除的级联处理

`SiteController.delete`（受 membership 模块“设置 → 编辑”权限控制）分三步拆除一个次要站点：

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` 会级联删除该站点拥有的全部内容：其**页面**及其对应的版块、元素、`pageHistory` 和 `posts`;其自有的**区块**及其对应的版块、元素和 `pageHistory`;以及其**导航链接**和**全局样式**。有一道防护措施拒绝对 `''` 执行此操作——主站点/共享哨兵值永远不会被级联删除。
2. `DomainRepo.clearSiteId` 会将该站点名下的域名**重新分配**回主站点（`siteId → ''`),而非直接删除,因此一个自定义域名可以在站点被删除后继续存活。
3. `sites` 记录被删除,Caddy 路由随之重新同步（尽力而为)。

### B1Admin 界面

| 功能 | 位置 | 实现机制 |
|-----------|-------|----------|
| 站点切换器 | `useSiteSelection` + `SiteSwitcher`（空值 = “主网站”) | 读取 URL 参数 `?site=`,并将其作为 `?siteId=` 传递给 ContentApi 调用。出现在“站点”下的三个**列表类**区域——**页面**、**区块**、**外观**——但*不*出现在页面/区块编辑器中,因为编辑器直接在记录上携带 `siteId` |
| 站点创建/删除 | `SitesDialog`（从切换器的“管理网站…”入口打开) | `POST /membership/sites` / `DELETE /membership/sites/:id`（名称 + 子域名)。受 membership “设置 → 编辑”权限控制（服务端为 `Permissions.settings.edit`;B1Admin 中为 `Permissions.membershipApi.settings.edit`)。**仅支持创建/删除——v1 中没有重命名界面** |
| 按域名分配站点 | 设置 → 域名 下的 `DomainSettingsEdit` | 每一行都有一个站点下拉选择器,会把 `siteId` 随该域名一起提交到 `/membership/domains`。如果 API 未返回任何站点（旧版后端),该列会自动隐藏 |
| 写时复制样式 | `StylesManager.prepareForSave` | 当已加载的全局样式记录的 `siteId` 与当前选中的站点不一致时（也就是说 API 返回的是作为兜底的主站点记录),它会丢弃主站点记录的 `id`,盖上当前的 `siteId`,从而强制**插入**一条新的站点专属记录,而不是覆盖主站点记录。同样的“不一致即分叉”逻辑也适用于站点页脚区块 |

:::info
**v1 中仍为全教会通用的部分（这是一个刻意的范围划定选择,而非数据模型的限制）：** **博客**（`BlogPage` 没有站点切换器,加载 `/posts` 时不带 `siteId`)、**全站小组件**（公告横幅 + 悬浮入口)、**重定向**、**Logo / GA4 / 教会设置**,以及**会员门户**（B1App 的 mobile 部分)。请注意这并不等于“整个外观页面”都是全教会通用的——次要站点的全局样式（配色、字体、排版、间距、导航、自定义 CSS）**确实**通过上述写时复制路径实现了按站点区分;只有外观页面中的横幅/悬浮入口/重定向/Logo 这几个子面板仍是全教会通用的。
:::

## 自定义域名：Caddy 边缘（静态配置方案）

:::info
**方向已于 2026-07-02 修订。**此前将自定义域名托管迁移到 Vercel 托管域名的计划已被**取消**,所有 Vercel 域名注册相关代码（`VercelHelper`、其 `vercelToken`/`vercelProjectId`/`vercelTeamId` 环境变量、SSM 参数,以及健康检查条目）都已从 Api 中移除。自主维护的 **Caddy 反向代理（部署在 EC2 上）将继续保留**,作为永久的自定义域名边缘。剩下的工作只是内部性质的：把 Caddy *运行时*的 admin-API 配置方式,替换为一份能在重启后依然存活的*静态*配置。
:::

### 边缘节点

每一个自定义教会域名的 DNS 都指向同一台 EC2 主机——`3.23.251.61`,也可通过 `proxy.b1.church` 访问。B1Admin 的“设置 → 域名”界面会指导教会添加一条根域名的 `A → 3.23.251.61` 记录,或一条 `CNAME → proxy.b1.church` 记录。Caddy 用一张按域名颁发的 Let's Encrypt 证书终止 TLS,把 `Host` 请求头改写为该域名对应的 `{sub}.b1.church` 上游,并反向代理到 B1App——B1App 随后会像处理任何原生子域名一样按主机标签路由该请求（见上文的[自定义域名](#自定义域名)一节）。

上游映射来自 `DomainRepo.loadPairs`,它的拨号目标会 **COALESCE 出所分配站点的子域名**,从而确保一个域名代理到正确的*次要*站点,并在没有分配站点时回退到教会的主站点：

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

`www.*` 开头的记录会被排除在这张映射之外;Caddy 会用一个 `302` 重定向把 `www.{host}` 指向裸域名。

### 两个匿名端点为边缘节点提供数据

`DomainController` 暴露了两个未经认证的只读端点,供这台主机直接消费——之所以是匿名的,是因为边缘节点在查询它们时,还根本不存在任何教会上下文：

| 端点 | 返回内容 | 作用 |
|----------|---------|------|
| `GET /membership/domains/authorize?domain=` | 如果该域名——或者对于 `www.` 未命中的情况,其裸域名——存在于 `domains` 中,则返回 `200`;否则返回 `404`（包括空 `domain` 的情况） | Caddy 的**按需 TLS `ask` 网关**：决定是否为一个到来的 SNI 签发证书的滥用防护机制 |
| `GET /membership/domains/hostmap` | `text/plain`,每一条可路由域名各占一行,格式为已排序的 `{domain} {sub}.b1.church` | 该主机定时刷新所用的主机名 → 上游映射文件 |

`authorize` 复用了 `DomainRepo.loadByName`（先精确匹配主机名,再对 `www.` 情况重试一次去掉前缀的裸域名);`hostmap` 复用了 `loadPairs`——因此它同样是站点感知的,并排除了 `www.*`,与代理路由逻辑完全一致——只是去掉了 `:443` 后缀。

### 域名保存/删除——单次尽力而为的推送

`DomainController.save` 写入 `domains` 记录后,会发起**一次尽力而为**的 `CaddyHelper.updateCaddy()` 调用,该调用被包裹在一个 `try/catch` 中,失败时只记录日志（`console.error`）并吞掉异常;`delete` 操作也是同样处理（这同时修复了此前删除后残留旧路由的 bug）,次要站点的删除（`SiteController.delete`）也是如此。`updateCaddy` 本身受一个 **10 秒**的 Axios 超时限制,因此一台不可达或已停止的 Caddy 永远不会导致域名保存操作返回 `500`——`domains` 表始终是事实来源。

### 当前状态——静态配置,无运行时状态

这台主机（位于永久弹性 IP 之后的 Windows EC2 实例）以**静态 Caddyfile**的形式运行 Caddy：按需 TLS 的 `ask` 指向 `/membership/domains/authorize`,再加上一个主机名 → 上游的映射文件,由一个计划任务每 5 分钟从 `/membership/domains/hostmap` 刷新一次,并以一次优雅的 `caddy reload` 收尾。这份配置在重启后依然完好无损,不存在运行时状态——不需要任何“重新预热”的舞步——一个未知的 SNI 会被 **TLS 直接拒绝**（对于一个被 `authorize` 拒绝的主机名,不会为其签发任何证书),而一个已授权但尚未纳入映射的主机名（同步窗口期内新添加的域名）会得到一个干净的 404。新域名在保存后约 5 分钟内即可路由;其证书会在首次命中时签发。搭建/运维流程与经过实战检验的坑,详见 [Caddy 自定义域名代理](../deployment/caddy-proxy)。

### 旧版运行时推送——回滚路径,待删除

`CaddyHelper`（membership 模块）仍然可以通过其 **admin API**（`caddyHost:caddyPort`,SSM 参数 `caddyHost`/`caddyPort`;未设置时为空操作;在 `ServerHealthController` 的“集成”分组下展示）驱动 Caddy：`updateCaddy()` 会 PATCH 一整份路由数组,`initializeCaddy()` 加上 `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` 端点则会从零重建一台运行时配置的服务器。那种模式下的配置只存在于 Caddy 的内存中——正是这套架构要替代的“重启即失忆”问题所在。这套机制目前仅作为回滚路径保留,计划在静态主机稳定运行一段时间后予以删除;域名保存/删除时那次尽力而为的 `updateCaddy()` 推送,对静态主机而言只是一次无害的空操作（其 admin API 仅监听 localhost）。

## 相关页面

- [Caddy 自定义域名代理](../deployment/caddy-proxy) —— 边缘节点本身：全新主机的搭建、WinSW 服务、映射同步任务,以及运维相关的坑
- [网站构建器](./website-builder) —— 页面/版块/元素树、渲染器、博客、SEO 和 AI 生成（一个请求解析到某个教会/站点之后实际渲染的内容）
- [Content 端点](../api/endpoints/content) —— 涵盖页面、区块、链接和全局样式的 REST 接入面,现在全部支持 `?siteId=`
- [B1App](../web-apps/b1-app) —— 承载中间件和 `[sdSlug]` 路由的 Next.js 应用
- [Web 应用部署](../deployment/web-apps) —— B1App 如何部署到 Vercel
