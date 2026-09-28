---
title: "网站构建器架构"
---

# 网站构建器架构

<div class="article-intro">

B1App 提供的每个教会网站都从内容树（页面、部分、元素）进行渲染，这些内容存储在 ContentApi 中，并在 B1Admin 中进行可视化编辑。一个共享的组件库同时渲染编辑器预览和实时网站，一个单一的元素类型目录定义了什么可以出现在页面上，而一个单独的 AI 服务可以生成或重写该树。本页面映射整个堆栈：`@churchapps/helpers` 中的元素契约、渲染管道、教会数据元素、站点级小部件、博客层、访问门控页面、SEO、AI 生成和对话式表单。

</div>

## 概述

```
┌──────────────────────────────┐             ┌─────────────────────────────────────────┐
│  B1Admin — editor            │             │  Api — /content module (ContentApi)     │
│  ContentEditor · SectionEdit │  POST /…    │                                         │
│  ElementEdit · PageLinkEdit  │ ──────────▶ │  pages ─ sections ─ elements   blocks   │
│  SiteWidgetsEdit · Blog      │             │  posts   redirects   settings   styles  │
└──────────┬───────────────────┘             └───────────────┬─────────────────────────┘
           │                                                 │ GET /content/pages/:churchId/tree?url=…
           │        shared render pipeline                   ▼            (anon, JWT honored)
           │   ┌───────────────────────────────┐   ┌─────────────────────────────────┐
           └──▶│  @churchapps/helpers          │◀──│  B1App — public site (Next.js)  │
               │    ElementTypes.ts (catalog)  │   │  Zone → Section → Element       │
               │  @churchapps/apphelper        │   │  + widgets, JSON-LD, sitemap,   │
               │    ElementRegistry, renderers │   │    redirects, branded 404       │
               │    SectionDivider, widgets    │   └───────────────┬─────────────────┘
               └───────────────────────────────┘                   │ church-data elements
┌──────────────────────────────┐                                   ▼
│  AskApi — /website/* (AI)    │             ┌─────────────────────────────────────────┐
│  generateSite · rewriteSection│            │  /giving/funds/public/…/total           │
│  generateAltText · metaDesc  │             │  /membership/groupmembers/public/…      │
│  returns JSON; B1Admin saves │             │  /attendance/servicetimes/public/…      │
└──────────────────────────────┘             └─────────────────────────────────────────┘
```

整个堆栈保持三个规则：

1. **一棵树，两个渲染器。** 页面是一个 `pages → sections → elements` 树，其中每个节点都以 `answers` JSON blob 的形式携带其设置。同一个 apphelper 组件渲染 B1Admin 中的拖放编辑器和 B1App 中的服务器渲染公共网站——没有单独的"发布格式"。
2. **契约存在于 `@churchapps/helpers`。** `ElementTypes.ts` 是元素类型的单一目录；渲染器通过 apphelper 中的注册表进行解析；编辑器表单存在于 B1Admin 中。添加元素类型意味着按该顺序接触所有三个。
3. **公共网站读取匿名端点。** B1App 需要的一切——页面树、设置、博客文章、重定向和其他模块中的教会数据端点——都是公共的。身份验证是可选的：匿名树端点上的 JWT 会解锁仅限成员的页面，其他什么都不改变。

## 内容树

内容模块（`Api/src/modules/content`）拥有构建器的数据：

| 表 | 角色 |
|-------|------|
| `pages` | 每个 URL 一个页面：`url`、`title`、`layout`，加上 `visibility`/`groupIds`（访问门控）和 `metaDescription`（SEO） |
| `sections` | 页面上的水平条带（或在块中）：背景、文本颜色和携带样式的 `answersJSON` 加上 `dividerTop`/`dividerBottom` 形状分隔线配置 |
| `elements` | 部分内的内容片段：`elementType` + `answersJSON`，对于布局类型（行/列、旋转木马）可嵌套 |
| `blocks` | 可重用的部分/元素组（页脚块、元素块）跨页面共享 |
| `posts` | 独立博客文章（见 [博客](#blog)） |
| `redirects` | 每个教会 `fromPath → toPath` 对，上限为 200 个（见 [SEO](#seo-and-discoverability)） |
| `settings` | 键值教会设置；标记为 `public` 的行被匿名提供并携带小部件/分析配置 |

一个 URL 的整棵树来自单个匿名调用——`GET /content/pages/:churchId/tree?url=/about`——这是 B1App 服务器渲染的内容。编辑器请求会根据 id 获取并保持内部 id。

## 元素契约

### 目录（`@churchapps/helpers`）

`Packages/helpers/src/ElementTypes.ts` 将每个元素类型定义为 `ElementTypeDefinition`：`elementType`、`label`、`category`、`schemaVersion`、`defaults` 和其答案的 JSON-schema 风格 `answersSchema`。`validateElementAnswers()` 故意宽松——未知类型和额外键会通过，所以旧内容在目录升级时不会破裂。**今天有 35 种类型：**

| 类别 | 元素类型 |
|----------|---------------|
| 布局 (6) | row, column, box, carousel, whiteSpace, block |
| 内容 (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| 媒体 (4) | image, gallery, video, map |
| 教会 (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| 高级 (2) | rawHTML, iframe |

`sermons` 元素是教会类型中配置最多的：`layout` 答案选择 `browse`（旧版完整浏览器）、`grid`、`list` 或 `featuredLatest`，其中 `playlistId`、`itemCount`、`showTitles` 和 `showDates` 细化非浏览布局。

### 渲染器（`@churchapps/apphelper`）

渲染器位于 `Packages/apphelper/src/website/components/elementTypes/` 中，每种类型一个组件，通过 `ElementRegistry.ts` 进行解析——一个两层的地图，其中 `Element.tsx` 为所有 35 种类型注册默认渲染器（`registerDefaultElementRenderer`），而主机应用可以在运行时覆盖任何类型（`registerElementRenderer`）而不用分叉包。

### 编辑器表单（B1Admin）

编辑器的按类型设置表单位于 `B1Admin/src/site/admin/elements/` 中——`ElementEdit.tsx` 分发到专用组件（`GalleryEdit`、`TestimonialEdit`、`StatsEdit` 等）或每种类型的内联字段构建器。这个目录的 AI 面镜像是 API 的 MCP `describe_page_builder` 工具（见 [MCP Server](../api/mcp)）。

### 部分形状分隔线

部分可以在两条边上携带装饰性的形状分隔线。配置存在于部分的 `answersJSON` 中，作为 `dividerTop` / `dividerBottom` 对象——`{ shape, color, height, flip }`，其中 `shape` 是 `wave, waves, slant, curve, triangle, peaks` 之一。Apphelper 提供 `SectionDivider` 组件和 `parseDividerConfig()` 帮助程序；两个应用的部分渲染器（`B1App/src/components/Section.tsx`、`B1Admin/src/site/admin/Section.tsx`）解析答案并挂载分隔线，`B1Admin` 中的 `SectionEdit.tsx` 提供选择器 UI。包只提供构建块——部分级布线是使用应用的工作。

## 教会数据元素

三种元素类型渲染实时教会数据而不是创作内容。模块隔离仍然适用——每种类型都从浏览器调用拥有模块自己的公共端点：

| 元素 | 端点 | 注意 |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | 返回 `{ fundId, totalAmount, donationCount }`，可选的 `?startDate=&endDate=` 窗口；元素将其与其 `goalAmount` 答案进行比较 |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **仅选择加入**：组必须设置 `publicRoster`（默认关闭）。投影故意最小——`personId`、`displayName`、`leader`、照片——没有联系或人口统计字段 |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | 返回校园 → 服务 → 时间树；apphelper 渲染器从中发出尽力的 schema.org `Event` JSON-LD（API 返回纯数据） |

:::warning
`publicRoster` 是 `staffGrid` 的隐私门控。永远不要扩展公开组成员投影或绕过标志——花名册端点故意设计为匿名的，最小字段列表是安全属性。
:::

## 站点级小部件

两个小部件在每个公共页面上呈现而不是在树内：**AnnouncementBanner**（可关闭的页面顶部栏）和 **Launcher**（用于提供/访问/观看风格链接的浮动操作中心）。两个组件和它们的 `parse*Config()` 帮助程序都在 apphelper 中提供。配置是两个公共设置行——键 `announcementBanner` 和 `launcher`——由 B1Admin 的 `SiteWidgetsEdit`（在外观页面上）编写，由 B1App 的公共布局通过 `GET /content/settings/public/:churchId` 读取。API 将这些视为不透明的键值对；键名是两个应用之间的约定。

## 博客

博客是一个独立的内容类型，不是生成器页面的层。`posts` 行保存整个文章：`title`、`slug`、`excerpt`、`content`（markdown 主体）、`authorId`、`photoUrl`、`publishDate`、`category`、`tags`。公共表面（全部匿名，`PostController`）：

| 路由 | 目的 |
|-------|---------|
| `GET /content/posts/public/:churchId` | 发布的文章，可按 `?category=&tag=` 过滤，分页 |
| `GET /content/posts/public/:churchId/categories` | 已发布文章中的不同类别 |
| `GET /content/posts/public/:churchId/slug/:slug` | 一篇已发布的文章 |
| `GET /content/posts/rss/:churchId?siteUrl=` | RSS 2.0 源，标题为教会名称，带有每项类别和摘录或内容描述 |

一篇文章在 `publishDate` 设置并已过去后是"已发布"；未来的 `publishDate` 是计划的文章（公开隐藏，在管理中显示带有计划芯片）。读取端点通过会员模块网关从 `authorId` 解析 `authorName` 来丰富每篇文章。缺少摘录会在列表卡片、元描述和 RSS 中回退到stripped-markdown内容（~160 个字符）。B1App 提供 `/{sdSlug}/blog`——一个社论列表（当过滤时变为活动类别/标签名称的中心标题、类别芯片过滤行、带有署名和摘录的缩略图左侧文章行）带有 RSS 源作为备用链接——和 `/{sdSlug}/blog/[postSlug]`，一个专用路由（不是区域/部分管道）带有中心标题（类别提示、标题、署名、主色强调规则）、容器宽度的 16:9 英雄、~720px 阅读列中的 markdown 主体、文章页脚的标签芯片、`"More in {category}"` 相关文章带和包括作者的 `BlogPosting` JSON-LD。两个页面完全从主题令牌样式，所以它们继承每个教会的调色板。博客 URL 包含在每个教会的网站地图中。B1Admin 的创作 UI（**站点 → 博客**）在对话框中编辑文章：带预览切换的 markdown 编辑器、16:9 裁剪的图片库选择器、作者人员选择器（默认为编辑用户）、由现有类别播种的类别自动完成、重复 slug 验证和发布切换；发布的行链接到实时文章，页面促使管理员添加 `/blog` 导航链接。

## 仅成员页面

`pages.visibility` 重用导航链接枚举——`everyone`（默认）、`visitors`、`members`、`staff`、`team`、`groups`（带有 `groupIds`）——但作为**硬访问门控**，不是导航过滤器（`PageVisibilityHelper.canViewPage`）。流程：

1. 匿名树端点检查 URL 基础获取的可见性。门控页面的匿名调用者获得 `{ restricted: true, visibility }` 而不是内容——树永远不会泄露。
2. 端点仍然尊重 JWT：`CustomAuthProvider` 在*每个*请求上验证 `Authorization` 标头，包括匿名路由，因此认证的成员对同一 URL 的获取正常解析。
3. B1App 在 `restricted` 响应上呈现 `RestrictedPage`：它从存储的凭据中补充会话，使用 JWT 重新获取树，并呈现它——或在没有会话时显示带有 `returnUrl` 的登录门控。

:::info
门控的粒度因级别而异：`groups` 检查令牌的 `groupIds` 对比页面的列表，`staff` 检查 `membershipStatus`，但 `members` 和 `team` 目前通过教会的任何认证用户。将 `groups` 视为严格选项。
:::

## SEO 和可发现性

所有这些都是 B1App 端的 ContentApi 数据渲染——API 存储，应用发出：

| 关注点 | 工作原理 |
|---------|--------------|
| 元描述 | `pages.metaDescription`（≤300 个字符）通过 `MetaHelper.getMetaData()` 流入 Next.js `Metadata`（描述 + Open Graph），在每个构建器渲染的路由上。B1Admin 的页面设置包括一个 AI"生成"按钮（见下文） |
| 重定向 | 每个教会 `redirects` 行在 `/content/redirects` 管理（`content.edit`，200 行上限，规范化路径）。在可能的 404 上，B1App 的页面路由根据 `GET /content/redirects/public/:churchId` 解析路径，并通过 Next 的 `permanentRedirect` 发出 HTTP 308；不匹配的路径掉入 `notFound()` |
| 品牌 404 | `not-found.tsx` 呈现 `BrandedNotFound`，带有教会的徽标、名称和主题，而不是通用错误 |
| 结构化数据 | 博客文章上的 `BlogPosting` JSON-LD；`VideoObject` 在每节课页面上（`/{sdSlug}/sermons/[sermonId]`）和在包含 `sermons` 元素的页面上；来自构建器页面上的日历/事件元素的 `Event`；来自 `serviceTimes` 元素的 schema.org `Event` |
| 讲道页面 | 每个公开讲道获得一个在 `/sermons/[sermonId]` 的可爬行页面，包含完整元数据——讲道不再锁定在客户端浏览器元素内 |
| 分析 | 公共设置键 `ga4MeasurementId`（在 B1Admin 中的重定向旁边管理）通过 `next/script` 注入每个教会的 GA4 gtag |
| 网站地图和源 | 每个教会的 `sitemap.xml` 路由包括构建器页面和博客 URL；博客列表宣传 RSS 源 |
| 可访问性 | 公共 chrome 呈现在每个布局包装中针对 `<main id="main-content">` 地标的跳过链接 |

## AI 生成（AskApi）

页面和网站生成在 **AskApi** 中运行，这是一个单独的服务，在 `/website` 控制器下。它使用与其他所有内容相同的 `CustomAuthProvider` JWT 进行身份验证，并且对内容是**无状态的**：每个端点返回 JSON，调用者（B1Admin）通过 ContentApi 持久化结果（`POST /content/pages/importTree` 在一个调用中使用其完整嵌套的部分/元素树创建页面；它总是在调用者的教会下插入并忽略主体中的 id）。

### 页面生成（`planPage` → `writePage`）

B1Admin 的 `AddPageModal` 中的"AI"页面模板使用一个低成本管道（`AskApi/src/helpers/SiteGenHelper.ts`），建立在一个规则上：**没有模型发出构建器 JSON**。两个模型通过 Vercel AI 网关（普通 HTTP，SSM 键 `/{env}/aiGatewayApiKey` 或 `AI_GATEWAY_API_KEY`）分割工作：

- **JEV** (`typesafe-ai/jev`) — 一个类型化决策模型，返回选择、分数和有概率的布尔值，但不能写文本。它从固定模板库中逐个选择每个部分，为布局打分，fact-checks 复制，并选择库存照片和图标。输入成本约为每百万令牌 $0.04，输出免费，所以每页约 90 个调用花费不到一分钱。
- **一个小聊天模型（默认为 GPT-4.1 mini）** — 填充所选模板的命名的、长度限制的文本槽。作者是一个常数，可以用 `SITEGEN_COPY_MODEL` 环境变量覆盖（网关上的任何聊天模型 id，例如 `anthropic/claude-haiku-4.5`）。在三个教会的盲并排比较中，Claude Haiku 4.5 的阅读略微温暖，但 GPT-4.1 mini 接近，大约便宜 4 倍和更快，所以它是默认值。带有所有三个布局的完整页面成本约为 1.3 美分，其中约 80% 是作者。

| 阶段 | 端点 | 发生什么 |
|-------|----------|--------------|
| 1 | `POST /website/planPage` | 对页面类型（主页、访问、关于…）进行分类，然后从 JEV 的按轮概率中对 10 个候选布局进行采样（英雄 + 部分计数 → 每个部分 → 更近），去重复，让 JEV 为每个评分适应度/流量/间隙，并返回前 3 个加上写作语音和 `suggestedStyle`（调色板 + 字体）。迄今为止共享相同部分的候选人提出 JEV 一个相同的问题，所以轮被前缀记忆。最佳分数低于 6 被记录为 `lowLayoutScore`——该日志是值得添加的模板待办事项。~2 秒 |
| 2 | `POST /website/writePage`（每候选一个调用） | 作者并行填充两个部分的槽复制，并返回 JEV 在其中选择的五个英雄标题；JEV fact-checks 每个部分；失败、使用库存短语或重新讲述早期部分的部分（共享 4 字运行，在代码中检查）与特定原因并行重写；代码清理删除带有库存教会网站短语的句子（除非教会自己的描述使用它们）；JEV 选择照片主题、图标和英雄的形状分隔线，并评分结果。返回一个准备保存的部分树和一个分数。~6-9 秒 |
| 3 | `POST /content/pages/importTree` | B1Admin 仅写入排名最好的布局（如果该写入失败，第二名是备用选项），保存它并打开预览（~10 秒后保存） |

每个阶段都是其自己的请求，因此每个调用都停留在 API 网关 29 秒的限制内。`SiteGenHelper.buildTree` 中的模板是来自目录的固定部分 + 元素树（`text`、`row`/`column`、`card`、`iconFeature`、`faq`、`table`、`testimonial`、`textWithPhoto`、`box`、`map`、`sermons`），并参考主题令牌（`var(--accent)`、`var(--lightAccent)`…），因此生成的页面继承教会现有的外观设置。添加部分模板意味着将其槽列表添加到 `SECTIONS` 并将其树添加到 `buildTree`；单位测试遍历每个模板并验证树。

**输入。** 复制只能陈述来自两个来源的事实：用户输入的内容和 `churchContext.facts`——B1Admin 在规划之前收集的记录（公开服务时间和公开组名称，加上教会名称和地址）。相同的标志启用数据支持的模板：`times` 在教会在 B1 中保留服务时间时呈现实时 `serviceTimes` 元素（否则是类型化表格），`groups` 和 `countdown` 仅在有数据支持时提供。JEV 调用被对冲——一个重复在 1.5 秒后触发，第一个答案获胜——因为网关偶尔会停顿，调用几乎是免费的。

**保持主题。** 用户的提示是页面的*主题*，不是关于教会的背景。`planPage` 对请求进行分类（`home`、`visit`、`about`、`ministries`、`give`、`contact`、`event`、`topic`），对于 `event` 和 `topic` 页面，通用教会模板（牧师笔记、讲道、事工、小组、社区影响、每周时间和倒计时、视频英雄）甚至没有提供，而 `details`（何时/何地/带什么）和日期 `eventCountdown` 是。两个法官为话题性评分。B1Admin 从计划中将 `pageType` 传递到每个 `writePage` 调用中。

**从短请求中完整页面。** 页面有三到六个中间部分、慷慨的槽长度、卡片部分的介绍行和五问 FAQ，修复通过扩展任何看起来稀薄的部分。生成是一次点击：没有后续问题。请求省略完整页面需要的普通细节（开始时间、房间、要带什么、如何注册）的地方，作者用一个合理的、温和的选择为教会填充它编辑。因为部分并行编写，这些间隙被决定**一次**，在 `planPage`（`assumedDetails`，一个与布局采样并行运行的小作者调用），并传回每个 `writePage` 调用通过 `churchContext.assumedDetails`，所以一个部分不能说 5:00，而另一个说 5:30。JEV 修复任何与请求矛盾的部分、教会的记录或这些决定的细节。决定的细节不在 UI 中浮现；教会像任何其他一样审查和编辑页面。永远不会编造一些东西：人名、电话号码、电子邮件和网址、价格、统计数据、教会的历史、归因于人们的引用，以及请求没有为其给出的日期的周日。

**视觉。** 模板永远不会命名他们的照片或图标。他们留下槽打开，一个通用通过（`visualSlots` → `pickVisuals` → `applyVisuals` 在 `SiteGenHelper`）遍历完成的树并填充每一个：一个部分背景或图片库条目标记为 `auto:photo`，`auto:icon`，英雄的 `auto:divider`，以及，完全没有标记，任何 `textWithPhoto`、`card` 或 `image` 元素其 `photo` 为空。JEV 从旁边的文本中选择每一个（一个卡片的照片来自那个卡片的标题和文本；来自部分副本的背景），没有受试者在页面上重复。因此，一个新模板免费获得照片。照片是 Pexels 搜索主题，作为 `pexels:<term>` 占位符发出，B1Admin 通过 `POST /content/stock/search` 解析；不发送 `resolvesPhotos` 的客户端获得内置英雄图像、平面彩色条带和无照片卡片。故意没有肖像主题，牧师模板不携带照片：库存陌生人必须永远不站在真人的位置。对于没有页面的教会，B1Admin 将 `suggestedStyle` 应用于全局样式；现有网站保持他们的外观。

### 其他端点

:::info
B1Admin 中的 `SectionToolbar` 重写按钮和页面列表"生成网站"按钮仍然注释掉客户端。下面的 AskApi 端点仍然响应；只有那个 UI 被隐藏。
:::

| 端点 | 目的 |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | 原始两步页面流程（大纲，然后每部分一个发出元素 JSON 的 LLM 调用）。在 B1Admin 中由于成本被 `planPage`/`writePage` 取代；为 API 消费者保留 |
| `POST /website/generateSite` | 整个网站生成。**设计两阶段**：一个 `planOnly: true` 调用只返回多页面计划（一个快速模型调用），然后客户端请求完整内容——保持每个请求在 Lambda/API-Gateway 超时内 |
| `POST /website/rewriteSection` | 结构保留重写：模型只能改变文本带动答案。递归结构签名（id + 类型 + 顺序）在之前和之后进行比较；任何不匹配返回原始部分，`fallback: true` 而不是腐败结构 |
| `POST /website/generateAltText` | 视觉调用超过最多 20 个图像 URL；返回简洁的 alt 文本（≤125 个字符，"photo of"前缀被剥离） |
| `POST /website/generateMetaDescription` | 一个 SEO 元描述（≤155 个字符）来自页面的文本内容——连接到 B1Admin 页面设置上的生成按钮 |

这些端点的提示是 `AskApi/config/instructions/` 下的 markdown 文件，包括模型生成的元素目录。两个设计点保持目录诚实：客户端在每个请求上传递 `availableElementTypes`（提示只能使用该列表中的类型——服务器永远不会硬编码完整集合），而 API 的 MCP `describe_page_builder` 工具为通过 [MCP](../api/mcp) 工作的 AI 代理携带相同的指南。模型是通过 OpenRouter 的 Anthropic Claude——用于部分内容的 3.5 Haiku（延迟）、用于大纲、网站计划和视觉的 3.5 Sonnet——当没有配置 OpenRouter 键时有 OpenAI 后备。

## 对话式表单

表单（会员模块）获得了一个对话模式，针对连接卡式页面。`forms` 上的四列驱动它：`displayMode`（`standard` | `conversational`），`autoCreatePerson`、`followUpSubject`、`followUpBody`。

- **渲染** — apphelper 的 `FormSubmissionEdit` 在 `displayMode` 是 `conversational` 时切换到 `ConversationalForm` 组件（一次一个问题）；B1App 的表单页面通过模式。任何一种方式都有相同的提交有效载荷。
- **自动创建人员** — 在提交时使用 `autoCreatePerson` 集合，`ConversationalFormHelper.findOrCreatePerson` 按电子邮件去重（不区分大小写）并用 `membershipStatus: "Guest"` 创建家庭 + 人员，然后将提交链接到该人员。
- **跟进电子邮件** — 当设置了主题和主体时，提交者通过现有事务路径（`TransactionalEmailHelper`）获得模板化电子邮件（带有 `{firstName}` / `{churchName}` 令牌），永远不是通知摘要门。两个副作用都是非致命的：失败永远不会丢失提交。

四个字段今天通过 API 设置；B1Admin 表单编辑器还没有暴露它们。

## 公共网站缓存

B1App 的公共渲染路径缓存教会标记的获取（在生产中 `next: { revalidate: 300, tags: [sdSlug] }`；在开发中 `0`），因此实时页面在 ContentApi 写入后最多五分钟可以保持陈旧。`POST /api/revalidate/{sdSlug}` 在 B1App 上调用 `revalidateTag(sdSlug)` 并是唯一的早期丢弃该缓存的方式。

两个写入者击中它：

1. **B1Admin** — `B1Admin/src/site/siteCache.ts` 中的 `clearSiteCache()` 在编辑器保存后 POST。它更喜欢活跃网站的子域（二级网站必须破坏*那个*标签，而不是教会的默认值）。
2. **Api** — 永远不通过 B1Admin 的内容突变（API 键、MCP、AI）从内容控制器触发 `SiteCacheHelper.bump(churchId)`。帮助器通过 `SubDomainHelper` 解析教会子域，并向 B1App POST `{b1AppRoot}/api/revalidate/{sd}`。失败被吞没，所以无法到达的 B1App 不能失败保存。

冲击的控制器：页面（保存、删除、重复、发布、丢弃、取消发布、AI 临时）、部分、元素、块、链接、全局样式、文章和重定向。开发 `b1AppRoot` 是 `http://{subdomain}.localtest.me:3301`；演示/暂存/生产使用 `https://{subdomain}.b1.church`。

## 相关页面

- [网站路由和多站点](./websites) — 请求如何解析到教会/网站以及自定义域如何路由
- [内容端点](../api/endpoints/content) — 页面、部分、元素、块、文章、重定向和设置的完整 REST 表面
- [AppHelper](../shared-libraries/app-helper) — npm 包，提供渲染器、注册表、分隔线和小部件
- [MCP Server](../api/mcp) — 包括 `describe_page_builder` 指南工具
- [页面编辑器（终端用户）](/docs/b1-admin/website/page-editor) — 员工面的编辑器文档
