---
title: "网站构建器架构"
description: "B1 网站构建器的开发者概览：内容树、共享元素目录、渲染流程，以及 B1 Admin 和 B1.church 中的 AI 页面生成。"
---

# 网站构建器架构

<div class="article-intro">

由 B1App 提供的每个教会网站，都是从一棵内容树渲染而来的——页面、区块、元素——这棵树存储在 ContentApi 中，并在 B1Admin 中以可视化方式编辑。一套共享的组件库同时渲染编辑器预览和线上网站，一份元素类型目录定义了页面上可以出现哪些内容，而独立的 AI 服务则可以生成或改写这棵树。本页梳理了整个技术栈：`@churchapps/helpers` 中的元素契约、渲染流水线、教会数据元素、全站小组件、博客层、访问受限页面、SEO、AI 生成以及对话式表单。

</div>

## 概览

```
┌──────────────────────────────┐             ┌─────────────────────────────────────────┐
│  B1Admin —— 编辑器             │             │  Api —— /content 模块（ContentApi）       │
│  ContentEditor · SectionEdit │  POST /…    │                                         │
│  ElementEdit · PageLinkEdit  │ ──────────▶ │  pages ─ sections ─ elements   blocks   │
│  SiteWidgetsEdit · Blog      │             │  posts   redirects   settings   styles  │
└──────────┬───────────────────┘             └───────────────┬─────────────────────────┘
           │                                                 │ GET /content/pages/:churchId/tree?url=…
           │        共享渲染流水线                              ▼            （匿名，识别 JWT）
           │   ┌───────────────────────────────┐   ┌─────────────────────────────────┐
           └──▶│  @churchapps/helpers          │◀──│  B1App —— 公开网站（Next.js）    │
               │    ElementTypes.ts（目录）     │   │  Zone → Section → Element       │
               │  @churchapps/apphelper        │   │  + 小组件、JSON-LD、站点地图、     │
               │    ElementRegistry、渲染器     │   │    重定向、品牌化 404             │
               │    SectionDivider、小组件      │   └───────────────┬─────────────────┘
               └───────────────────────────────┘                   │ 教会数据元素
┌──────────────────────────────┐                                   ▼
│  AskApi —— /website/*（AI）   │             ┌─────────────────────────────────────────┐
│  generateSite · rewriteSection│            │  /giving/funds/public/…/total           │
│  generateAltText · metaDesc  │             │  /membership/groupmembers/public/…      │
│  返回 JSON；由 B1Admin 保存    │             │  /attendance/servicetimes/public/…      │
└──────────────────────────────┘             └─────────────────────────────────────────┘
```

整个技术栈遵循三条规则：

1. **一棵树，两种渲染器。** 页面是一棵 `pages → sections → elements` 树，其中每个节点都将其设置以 `answers` JSON 数据块的形式保存。同样的 apphelper 组件既渲染 B1Admin 中的拖放式编辑器，也渲染 B1App 中服务端渲染的公开网站——不存在单独的"发布格式"。
2. **契约位于 `@churchapps/helpers` 中。** `ElementTypes.ts` 是元素类型的唯一目录；渲染器通过 apphelper 中的注册表解析；编辑器表单位于 B1Admin 中。新增一种元素类型需要按此顺序修改这三处。
3. **公开网站读取匿名端点。** B1App 所需的一切——页面树、设置、博客文章、重定向，以及其他模块中的教会数据端点——都是公开的。身份验证是可选的：匿名树端点上的 JWT 只会解锁仅限成员的页面，其他一切都不会改变。

## 内容树

内容模块（`Api/src/modules/content`）负责管理构建器的数据：

| 数据表 | 作用 |
|-------|------|
| `pages` | 每个网址对应一个页面：`url`、`title`、`layout`，以及用于访问控制的 `visibility`/`groupIds`，和用于 SEO 的 `metaDescription` |
| `sections` | 页面（或区块）中的水平板块：背景、文字颜色，以及一个 `answersJSON`，其中包含样式信息以及 `dividerTop`/`dividerBottom` 形状分隔线的配置 |
| `elements` | 区块内的内容模块：`elementType` + `answersJSON`，布局类型（行/列、轮播）可以嵌套 |
| `blocks` | 可复用的区块/元素组（页脚区块、元素区块），可在多个页面间共享 |
| `posts` | 独立的博客文章（参见[博客](#blog)） |
| `redirects` | 每个教会的 `fromPath → toPath` 配对，上限为 200 条（参见 [SEO](#seo-and-discoverability)） |
| `settings` | 键值形式的教会设置；标记为 `public` 的记录会被匿名提供，并包含小组件/分析配置 |

某个网址的完整树只需一次匿名调用即可获取——`GET /content/pages/:churchId/tree?url=/about`——B1App 正是基于它进行服务端渲染。编辑器的请求则按 ID 获取，并保留内部 ID。

## 元素契约

### 目录（`@churchapps/helpers`）

`Packages/helpers/src/ElementTypes.ts` 将每种元素类型定义为一个 `ElementTypeDefinition`：`elementType`、`label`、`category`、`schemaVersion`、`defaults`，以及用于其答案的类 JSON-schema 风格的 `answersSchema`。`validateElementAnswers()` 刻意保持宽松——未知类型和多余的键都会通过校验，因此旧内容不会因目录升级而损坏。目前共有 **35 种类型**：

| 类别 | 元素类型 |
|----------|---------------|
| 布局（6） | row、column、box、carousel、whiteSpace、block |
| 内容（11） | text、textWithPhoto、card、faq、iconFeature、testimonial、socialIcons、countdown、stats、table、buttonLink |
| 媒体（4） | image、gallery、video、map |
| 教会（12） | logo、sermons、stream、donation、donateLink、form、calendar、groupList、groups、campaignProgress、staffGrid、serviceTimes |
| 高级（2） | rawHTML、iframe |

`sermons` 元素是教会类型中配置项最多的：`layout` 答案可选择 `browse`（旧版完整浏览器）、`grid`、`list` 或 `featuredLatest`，而 `playlistId`、`itemCount`、`showTitles` 和 `showDates` 则对非浏览布局进行细化。

`rawHTML` 元素有两个答案：`rawHTML`（标记）和 `javascript`。通过 `innerHTML` 插入的脚本永远不会执行，因此 `RawHTMLElement` 会将标记中的每个 `<script>` 节点重新创建为新元素。这些非解析器插入的节点在 CSP 的 `strict-dynamic` 下被视为可信。以 `<` 开头的 `javascript` 答案（连同其 `<script>` 标签一起粘贴的供应商代码片段）会被当作标记解析，并获得相同的处理。否则，它将作为普通的内联脚本运行。B1Admin 会对 JavaScript 框中的裸网址进行标记，因为单独的网址会作为空操作脚本运行。当未配置 Maps API 密钥时，`map` 元素不会渲染任何内容，也不会加载 Google Maps 脚本。

### 渲染器（`@churchapps/apphelper`）

渲染器位于 `Packages/apphelper/src/website/components/elementTypes/`，每种类型一个组件，通过 `ElementRegistry.ts` 解析——这是一个两层映射：`Element.tsx` 为全部 35 种类型注册默认渲染器（`registerDefaultElementRenderer`），宿主应用则可以在运行时覆盖其中任何一种（`registerElementRenderer`），而无需 fork 该包。

### 编辑器表单（B1Admin）

编辑器中各类型的设置表单位于 `B1Admin/src/site/admin/elements/`——`ElementEdit.tsx` 会分派给专用组件（`GalleryEdit`、`TestimonialEdit`、`StatsEdit` 等），或为每种类型分派内联的字段构建器。面向 AI 的该目录镜像是 API 的 MCP `describe_page_builder` 工具（参见 [MCP 服务器](../api/mcp.md)）。

编辑器预览挂载的 `Theme` 与线上网站相同，它会根据教会的全局样式设置 `--headingFont` / `--bodyFont` CSS 变量。B1App 通过 `pages.css` 应用这些变量，而 B1Admin 无法导入该文件，因此 `ContentEditor.tsx` 会注入 `EDITOR_PAGE_FONT_CSS`（`src/site/admin/editorCss.ts`），将其应用于 `.page` 正文文字以及 `h1`–`h6`。若缺少该步骤，预览中的标题会以管理端字体显示。

### 区块形状分隔线

区块的任一边缘都可以带有装饰性的形状分隔线。其配置保存在区块的 `answersJSON` 中，作为 `dividerTop` / `dividerBottom` 对象——`{ shape, color, height, flip }`，其中 `shape` 为 `wave, waves, slant, curve, triangle, peaks` 之一。apphelper 提供了 `SectionDivider` 组件和 `parseDividerConfig()` 辅助函数；两个应用的 Section 渲染器（`B1App/src/components/Section.tsx`、`B1Admin/src/site/admin/Section.tsx`）都会解析答案并挂载分隔线，而 B1Admin 中的 `SectionEdit.tsx` 则提供了选择器界面。这些包仅提供构建模块——区块层面的接线工作由使用它们的应用负责。

## 教会数据元素

有三种元素类型渲染的是实时的教会数据，而非人工编写的内容。模块隔离依然适用——每一种都会从浏览器直接调用其所属模块自己的公开端点：

| 元素 | 端点 | 说明 |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | 返回 `{ fundId, totalAmount, donationCount }`，可选 `?startDate=&endDate=` 时间窗口；该元素会将其与 `goalAmount` 答案进行比较 |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **仅限选择加入**：小组必须设置 `publicRoster`（默认关闭）。返回的投影字段刻意保持最小化——`personId`、`displayName`、`leader`、照片——不包含任何联系方式或人口统计字段 |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | 返回校区 → 礼拜 → 时间的树状结构；apphelper 渲染器会据此尽力生成 schema.org `Event` JSON-LD（API 返回的是纯数据） |

:::warning
`publicRoster` 是 `staffGrid` 的隐私闸门。切勿扩大公开的小组成员投影范围，或绕过该标志——名册端点按设计是匿名的，而最小化的字段列表正是其安全保障所在。
:::

### 日历元素与活动页面

`calendar` 元素的答案包括 `calendarType`（`group` | `curated`）、`calendarId`、`display`（`month`，默认值，或 `upcoming`）以及 `tag`。B1App 在 `src/components/Element.tsx` 中通过 `registerElementRenderer("calendar", …)` 覆盖了 apphelper 的渲染器：

- **`display: "upcoming"`** 会渲染 B1App 的 `UpcomingEventsElement`：它加载 `GET /content/events/public/group/:churchId/:groupId` 或 `GET /content/curatedEvents/public/calendar/:churchId/:curatedCalendarId`，使用 `buildOccurrences()`（`src/helpers/EventOccurrences.ts`，每个活动在一年内展开为一次发生）展开重复活动，并以照片卡片的形式显示前 12 个（`events.photoUrl`，若无照片则回退为主题深色背景上的标题），链接到 `/events/{id}`，并附带一个用于日历 ICS 订阅源的订阅菜单。
- **`display: "month"`** 会渲染 apphelper 的 `CalendarElement`，并带有 `eventUrl` 回调。`GroupCalendar` / `CuratedCalendar` → `EventCalendar` / `CuratedEventCalendar` 在点击时会导航至该网址，而不是打开详情对话框（B1Admin 不传入 `eventUrl`，因此管理端日历保留其对话框）。
- **`tag`** 通过 `EventHelper.hasTag()`（`@churchapps/helpers`）对两种显示方式进行筛选：与逗号分隔的 `events.tags` 进行不区分大小写的匹配；为空则显示全部。精选日历的关联查询会选取 `e.tags`，使精选活动也携带标签。

精选活动通过 `realEventId`（`eventPageId()`）进行链接，因此网址始终指向底层活动。`/{sdSlug}/events/[eventId]` 是一个专用路由（不经过构建器流水线）：它加载 `GET /content/events/public/:churchId/:id`——对于待审核/已拒绝的活动以及没有报名功能的私密活动，该接口返回 `null`；并且会从未被拒绝的场地预订中添加 `roomNames`——然后渲染 `EventPageContent`（照片横幅、Markdown 描述、When/Where 侧边栏，当 `registrationEnabled` 时显示 **Register for this Event**（报名参加此活动）按钮，以及指向 `GET /content/events/public/:churchId/:id/ical` 的 **Add to my calendar**（添加到我的日历）链接），将照片用作 Open Graph 图片，并通过 `EventPageJsonLd` 为下一次发生输出 `Event` JSON-LD。对于未知或隐藏的活动，将返回真正的 404。

## 全站小组件

有两个小组件会出现在每个公开页面上，而不是在树内部渲染：**AnnouncementBanner**（可关闭的页面顶部横幅）和 **Launcher**（用于奉献/来访/观看等链接的浮动操作中心）。两个组件及其 `parse*Config()` 辅助函数都随 apphelper 提供。其配置存储在两行公开设置中——键名分别为 `announcementBanner` 和 `launcher`——由 B1Admin 的 `SiteWidgetsEdit`（位于外观页面）写入，并由 B1App 的公开布局通过 `GET /content/settings/public/:churchId` 读取。API 将它们视为不透明的键值对；键名是两个应用之间的约定。

## 博客 {#blog}

博客是一种独立的内容类型，而不是构建器页面之上的一层。`posts` 行保存整篇文章：`title`、`slug`、`excerpt`、`content`（Markdown 正文）、`authorId`、`photoUrl`、`publishDate`、`category`、`tags`。公开接口（均为匿名，由 `PostController` 提供）：

| 路由 | 用途 |
|-------|---------|
| `GET /content/posts/public/:churchId` | 已发布的文章，可按 `?category=&tag=` 筛选，支持分页 |
| `GET /content/posts/public/:churchId/categories` | 已发布文章中所有不重复的分类 |
| `GET /content/posts/public/:churchId/slug/:slug` | 单篇已发布的文章 |
| `GET /content/posts/rss/:churchId?siteUrl=` | RSS 2.0 订阅源，标题为教会名称，每条目包含分类以及摘要或内容描述 |

文章在设置了 `publishDate` 且该日期已过后即视为"已发布"；未来的 `publishDate` 则表示已排期的文章（对公众隐藏，在管理端显示为 Scheduled 标签）。读取端点会通过会员模块网关，根据 `authorId` 解析出 `authorName`，为每篇文章补充该字段。缺少摘要的文章会在列表卡片、元描述和 RSS 中回退为去除 Markdown 后的内容（约 160 个字符）。B1App 提供 `/{sdSlug}/blog`——一个编辑风格的列表页（居中的页眉，筛选时会变为当前分类/标签名称；分类标签筛选行；左侧缩略图的文章行，附带署名和摘要），并将 RSS 订阅源作为备用链接公布；以及 `/{sdSlug}/blog/[postSlug]`，这是一个专用路由（不经过 Zone/Section 流水线），包含居中的页眉（分类标题、标题、署名、主色强调线）、容器宽度的 16:9 横幅、约 720px 阅读栏宽的 Markdown 正文、文章底部的标签按钮、一个 `"More in {category}"` 相关文章条带，以及包含作者信息的 `BlogPosting` JSON-LD。这两个页面的样式完全基于主题令牌，因此会继承每个教会的配色。博客网址被包含在各教会的站点地图中。B1Admin 的编辑界面（**Site → Blog**）以对话框的形式编辑文章：包括带预览切换的 Markdown 编辑器、裁剪为 16:9 的图库图片选择器、作者人员选择器（默认为当前编辑的用户）、根据已有分类提供的分类自动补全、重复 slug 校验，以及发布开关；已发布的记录会链接到线上文章，页面还会提示管理员添加 `/blog` 导航链接。评论交由第三方服务处理：全教会范围的公开内容设置 `blogFooterHtml`（在博客页面的 **Below Every Post**（每篇文章下方）中编辑，仅在具有 Settings→Edit 权限时可见）会由 B1App 的 `BlogFooterEmbed` 渲染在每篇文章下方；它会重新创建 `<script>` 标签，使其在 `'strict-dynamic'` 下执行，并按顺序运行（外部 `src` 加载完成后，才会运行下一个内联脚本），因为供应商代码片段通常会先加载一个库，然后再调用它。

## 仅限成员的页面

`pages.visibility` 复用了导航链接的枚举值——`everyone`（默认）、`visitors`、`members`、`staff`、`team`、`groups`（配合 `groupIds`）——但它作为**硬性访问闸门**，而非导航过滤器（`PageVisibilityHelper.canViewPage`）。流程如下：

1. 匿名的树端点会在基于网址的获取中检查可见性。匿名访问受限页面的调用者会收到 `{ restricted: true, visibility }`，而不是内容——树结构永远不会泄露。
2. 该端点仍然识别 JWT：`CustomAuthProvider` 会对*每个*请求（包括匿名路由）验证 `Authorization` 请求头，因此已登录成员对同一网址的获取会正常解析。
3. 当 B1App 收到 `restricted` 响应时，会渲染 `RestrictedPage`：它会从已存储的凭据中恢复会话，携带 JWT 重新获取树并渲染——若没有会话，则显示带有 `returnUrl` 的登录闸门。

:::info
闸门的粒度因级别而异：`groups` 会将令牌中的 `groupIds` 与页面的列表进行比对，`staff` 会检查 `membershipStatus`，但 `members` 和 `team` 目前会放行该教会的任何已登录用户。应将 `groups` 视为严格的选项。
:::

## SEO 与可发现性 {#seo-and-discoverability}

以上所有内容都由 B1App 基于 ContentApi 的数据进行渲染——API 负责存储，应用负责输出：

| 关注点 | 工作方式 |
|---------|--------------|
| 元描述 | `pages.metaDescription`（≤300 个字符）通过 `MetaHelper.getMetaData()` 流入每个构建器渲染路由的 Next.js `Metadata`（description + Open Graph）。B1Admin 的页面设置包含一个 AI "Generate"（生成）按钮（见下文） |
| 重定向 | 每个教会的 `redirects` 行在 `/content/redirects` 下管理（`content.edit`，200 行上限，路径已标准化）。在即将返回 404 时，B1App 的页面路由会将路径与 `GET /content/redirects/public/:churchId` 进行比对，并通过 Next 的 `permanentRedirect` 返回 HTTP 308；未匹配的路径则交给 `notFound()` 处理 |
| 品牌化 404 | `not-found.tsx` 会渲染带有教会标志、名称和主题的 `BrandedNotFound`，而不是通用错误页。未知的 `/register/[eventId]`、`/events/[eventId]`、`/stream/[pageSlug]` 和 `/volunteer/[planId]` 路径会返回真正的 404，未知的子域名和格式错误的页面 slug 也是如此（参见[网站路由与多站点](./websites.md)） |
| 结构化数据 | 博客文章上的 `BlogPosting` JSON-LD；单场讲道页面（`/{sdSlug}/sermons/[sermonId]`）以及包含 `sermons` 元素的页面上的 `VideoObject`；构建器页面上日历/活动元素以及每个 `/{sdSlug}/events/[eventId]` 页面的 `Event`（下一次发生，以活动照片作为 `image`）；`serviceTimes` 元素生成的 schema.org `Event` |
| 讲道页面 | 每场公开讲道都有一个可供爬虫抓取的页面 `/sermons/[sermonId]`，包含完整的元数据——讲道不再被锁定在客户端的浏览器元素中 |
| 分析 | 公开设置键 `ga4MeasurementId`（在 B1Admin 中与重定向一起管理）通过 `next/script` 注入每个教会专属的 GA4 gtag。当其为有效的 `G-` ID 时，B1 应用（`/{sdSlug}/mobile`）也会将其页面浏览量发送到该 ID，同时发送 ChurchApps 自己的标签（GTM 容器 ID 仅限网站使用）。每个 `gtag('config')` 都会根据 `navigator.standalone` 或 `(display-mode: standalone)` 媒体查询携带 `installed` 或 `browser` 形式的 `display_mode`（`B1App/src/helpers/mobileAnalytics.ts`） |
| 站点地图与订阅源 | 各教会的 `sitemap.xml` 路由包含构建器页面、博客网址以及最近 50 个讲道页面（`<lastmod>` 取自每场讲道的发布日期）。当 `/sermons`、`/groups` 和 `/volunteer` 页面有内容时（公开小组、报名计划），也会列出这些内置页面，除非已保存的重定向替换了该路径。若教会没有首页，则不包括 `/`，因为此时 `/` 会重定向到被禁止的 `/mobile`。博客列表会公布 RSS 订阅源 |
| 无障碍 | 公开的界面框架在每个布局包装器中都渲染一个指向 `<main id="main-content">` 地标的跳过链接 |

## AI 生成（AskApi）

页面和网站的生成在 **AskApi** 中运行，这是一个独立的服务，位于 `/website` 控制器之下。它使用与其他所有服务相同的 `CustomAuthProvider` JWT 进行身份验证，并且**在内容方面是无状态的**：每个端点都返回 JSON，由调用方（B1Admin）通过 ContentApi 保存结果（`POST /content/pages/importTree` 会在一次调用中创建一个包含完整嵌套区块和元素树的页面；它始终插入到调用方所属的教会中，并忽略请求体中的 ID）。

### 页面生成（`planPage` → `writePage`）

B1Admin 的 `AddPageModal` 中的"AI"页面模板使用一套低成本的流水线（`AskApi/src/helpers/SiteGenHelper.ts`），其基于一条规则：**任何模型都不输出构建器 JSON**。两个模型通过 Vercel AI Gateway（普通 HTTP，SSM 密钥 `/{env}/aiGatewayApiKey` 或 `AI_GATEWAY_API_KEY`）分担工作：

- **JEV**（`typesafe-ai/jev`）—— 一个类型安全的决策模型，它返回带有概率的选择、评分和布尔值，但不能撰写文字。它从固定的模板库中依次选择每个区块，为布局评分，核查文案，并挑选图库照片和图标。输入约为每百万 token 0.04 美元，输出免费，因此每页约 90 次调用的成本仅为几分之一美分。
- **一个小型聊天模型（默认为 GPT-4.1 mini）**—— 为所选模板中具名的、限定长度的文字槽位填充内容。撰写模型是一个常量，可通过 `SITEGEN_COPY_MODEL` 环境变量覆盖（网关上的任意聊天模型 ID，例如 `anthropic/claude-haiku-4.5`）。在对三个教会进行的双盲并排比较中，Claude Haiku 4.5 的语气略显温暖，但 GPT-4.1 mini 很接近，成本约低 4 倍且速度更快，因此被设为默认值。包含全部三种布局的完整页面成本约为 1.3 美分，其中约 80% 来自撰写模型。

| 阶段 | 端点 | 发生的事情 |
|-------|----------|--------------|
| 1 | `POST /website/planPage` | 对页面类型（首页、来访、关于……）进行分类，然后根据 JEV 每一轮的概率采样 10 个候选布局（首图 + 区块数量 → 每个区块 → 结束区块），去重后由 JEV 对每个候选的契合度/流畅度/缺口进行评分，并返回前 3 名，以及一种写作语气和 `suggestedStyle`（配色 + 字体）。到目前为止共享相同区块的候选会向 JEV 提出完全相同的问题，因此各轮会按前缀进行记忆化处理。最佳评分低于 6 时会记录为 `lowLayoutScore`——该日志即是值得添加的模板的待办清单。约 2 秒 |
| 2 | `POST /website/writePage`（每个候选一次调用） | 撰写模型每次调用并行为两个区块填充槽位文案，并返回五条首图标题供 JEV 选择；JEV 对每个区块进行事实核查；未通过检查、使用套话或重复讲述前文内容（共享的 4 词片段，在代码中检查）的区块，会附带具体原因并行重写；代码清理会删除包含教会网站套话的句子（除非教会自己的描述中使用了这些词）；JEV 挑选照片主题、图标以及首图的形状分隔线，并为结果评分。返回一个可直接保存的区块树及评分。约 6–9 秒 |
| 3 | `POST /content/pages/importTree` | B1Admin 只写入排名最高的布局（若该写入失败，则以第二名作为备用），保存并打开预览（点击保存后约 10 秒） |

每个阶段都是独立的请求，以确保每次调用都在 API Gateway 的 29 秒限制之内。`SiteGenHelper.buildTree` 中的模板是来自目录的固定区块与元素树（`text`、`row`/`column`、`card`、`iconFeature`、`faq`、`table`、`testimonial`、`textWithPhoto`、`box`、`map`、`sermons`），并引用主题令牌（`var(--accent)`、`var(--lightAccent)` ……），因此生成的页面会继承教会现有的外观设置。新增一个区块模板，需要将其槽位列表添加到 `SECTIONS`，并将其树添加到 `buildTree`；单元测试会遍历每个模板并校验其树结构。

**输入。** 文案只能陈述来自两个来源的事实：用户输入的内容，以及 `churchContext.facts`——即 B1Admin 在规划前收集的记录（公开的礼拜时间和公开的小组名称，以及教会名称和地址）。同样的标志也控制依赖数据的模板：当教会在 B1 中保存了礼拜时间时，`times` 会渲染实时的 `serviceTimes` 元素（否则为手动输入的表格），而 `groups` 和 `countdown` 只有在背后有数据时才会提供。JEV 的调用采用对冲策略——若 1.5 秒后仍未返回，则发起一次重复调用，并以先返回的答案为准——因为网关偶尔会卡顿，而这些调用的成本几乎可以忽略不计。

**紧扣主题。** 用户的提示词是*页面的主题*，而非教会的背景信息。`planPage` 会对请求进行分类（`home`、`visit`、`about`、`ministries`、`give`、`contact`、`event`、`topic`），对于 `event` 和 `topic` 页面，甚至不会提供通用教会模板（牧师笔记、讲道、事工、小组、社区影响、每周时间与倒计时、视频横幅），而会提供 `details`（何时/何地/需要带什么）以及日期 `eventCountdown`。两位评审都会对主题相关性进行评分。B1Admin 会将规划中的 `pageType` 传入每次 `writePage` 调用。

**从简短请求生成完整页面。** 页面包含三到六个中间区块、较为充裕的槽位长度、卡片区块上的引导语，以及一个五问的 FAQ；修复流程会扩写任何内容单薄的区块。生成只需点击一次：不会有后续问题。当请求遗漏了完整页面所需的普通细节（开始时间、房间、需要带什么、如何报名）时，撰写模型会填入一个合理、保守的选择，供教会自行编辑。由于区块是并行撰写的，这些缺口会在 `planPage` 中**统一决定一次**（`assumedDetails`，即与布局采样并行运行的一次小型撰写调用），并通过 `churchContext.assumedDetails` 传回每一次 `writePage` 调用，从而避免一个区块写 5:00、另一个区块却写 5:30。JEV 会修复任何与请求、教会记录或这些已决定细节相矛盾的区块。这些已决定的细节不会在界面中显示；教会会像对待其他页面一样审阅和编辑该页面。有些内容是绝不会编造的：人名、电话号码、电子邮件和网址、价格、统计数据、教会历史、归于某人的引语，以及请求中未给出星期几的日期的星期。

**视觉元素。** 模板从不指定其照片或图标。它们只留出槽位，然后一个通用的处理步骤（`SiteGenHelper` 中的 `visualSlots` → `pickVisuals` → `applyVisuals`）遍历完成的树并填满每一个槽位：标记为 `auto:photo` 的区块背景或图库条目、`auto:icon`、首图的 `auto:divider`，以及在完全没有标记的情况下，任何 `photo` 为空的 `textWithPhoto`、`card` 或 `image` 元素。JEV 会根据其旁边的文字为每个槽位挑选内容（卡片的照片根据该卡片的标题和文字选取；背景则根据区块的文案选取），并且同一页面上不会重复同一主题。因此新模板可以免费获得照片。照片是以 `pexels:<term>` 占位符形式输出的 Pexels 搜索主题，B1Admin 会通过 `POST /content/stock/search` 解析它们；不发送 `resolvesPhotos` 的客户端则会获得内置的首图、纯色带状背景以及无照片的卡片。刻意不使用人像主题，并且牧师模板不包含照片：绝不能让图库中的陌生人代替真实的人。对于尚未有页面的教会，B1Admin 会将 `suggestedStyle` 应用到全局样式；已有网站则保持原有外观。

### 其他端点

:::info
B1Admin 中的 `SectionToolbar` 改写按钮和页面列表中的"Generate Site"（生成网站）按钮在客户端仍处于注释状态。下列 AskApi 端点仍会响应；只是这些界面已被隐藏。
:::

| 端点 | 用途 |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | 最初的两步页面流程（先生成大纲，然后为每个区块进行一次 LLM 调用，输出元素 JSON）。由于成本原因，在 B1Admin 中已被 `planPage`/`writePage` 取代；保留给 API 使用者 |
| `POST /website/generateSite` | 整站生成。**按设计分两阶段**：`planOnly: true` 调用只返回多页规划（一次快速的模型调用），然后客户端再请求完整内容——从而使每个请求都在 Lambda/API Gateway 的超时限制之内 |
| `POST /website/rewriteSection` | 保持结构的改写：模型只能修改包含文字的答案。改写前后会比较递归的结构签名（ID + 类型 + 顺序）；任何不匹配都会返回带有 `fallback: true` 的原始区块，而不是被破坏的结构 |
| `POST /website/generateAltText` | 对最多 20 个图片网址进行视觉调用；返回简洁的替代文字（≤125 个字符，去除 "photo of" 前缀） |
| `POST /website/generateMetaDescription` | 根据页面的文字内容生成一条 SEO 元描述（≤155 个字符）——与 B1Admin 页面设置中的 Generate 按钮相连 |

这些端点的提示词是位于 `AskApi/config/instructions/` 下的 Markdown 文件，其中包括模型生成时所依据的元素目录。有两项设计确保了目录的准确性：客户端在每次请求中都会传入 `availableElementTypes`（提示词只能使用该列表中的类型——服务器从不硬编码完整集合），而 API 的 MCP `describe_page_builder` 工具则为通过 [MCP](../api/mcp.md) 工作的 AI 代理提供相同的指南。模型为通过 OpenRouter 调用的 Anthropic Claude——区块内容使用 3.5 Haiku（为了降低延迟），大纲、网站规划和视觉则使用 3.5 Sonnet——当未配置 OpenRouter 密钥时，回退到 OpenAI。

## 对话式表单

表单（会员模块）新增了对话式模式，面向连接卡式页面。`forms` 表中的四列驱动此功能：`displayMode`（`standard` | `conversational`）、`autoCreatePerson`、`followUpSubject`、`followUpBody`。

- **渲染** —— 当 `displayMode` 为 `conversational` 时，apphelper 的 `FormSubmissionEdit` 会切换为 `ConversationalForm` 组件（一次显示一个问题）；B1App 的表单页面会传递该模式。两种模式下的提交负载相同。
- **自动创建人员** —— 提交时若设置了 `autoCreatePerson`，`ConversationalFormHelper.findOrCreatePerson` 会按电子邮件（不区分大小写）去重，否则创建一个家庭和一名会籍状态为 `membershipStatus: "Guest"` 的人员，然后将该提交关联到该人员。
- **跟进邮件** —— 当设置了主题和正文时，提交者会通过现有的事务性邮件路径（`TransactionalEmailHelper`）收到一封模板化的邮件（包含 `{firstName}` / `{churchName}` 标记），而绝不会通过通知摘要通道发送。这两项附带操作都是非致命的：失败不会导致提交丢失。

这四个字段目前只能通过 API 设置；B1Admin 的表单编辑器尚未提供这些选项。

## 公开网站缓存

B1App 的公开渲染路径会缓存带有教会标签的获取请求（生产环境为 `next: { revalidate: 300, tags: [sdSlug] }`，开发环境为 `0`），因此在 ContentApi 写入之后，线上页面最多可能会陈旧五分钟。B1App 上的 `POST /api/revalidate/{sdSlug}` 会调用 `revalidateTag(sdSlug)`，是提前清除该缓存的唯一途径。

有两个写入方会触发它：

1. **B1Admin** —— `B1Admin/src/site/siteCache.ts` 中的 `clearSiteCache()` 会在编辑器保存后发送 POST 请求。它优先使用当前站点的子域名（辅助站点必须清除*该*标签，而非教会的默认标签）。
2. **Api** —— 从未经过 B1Admin 的内容变更（API 密钥、MCP、AI）会从内容控制器中触发 `SiteCacheHelper.bump(churchId)`。该辅助函数通过 `SubDomainHelper` 解析教会的子域名，并向 `{b1AppRoot}/api/revalidate/{sd}` 发送 POST 请求。失败会被静默吞掉，因此无法访问的 B1App 不会导致保存失败。

会触发 bump 的控制器包括：页面（保存、删除、复制、发布、放弃、取消发布、AI 临时页面）、区块、元素、区块组、链接、全局样式、博客文章和重定向。开发环境的 `b1AppRoot` 为 `http://{subdomain}.localtest.me:3301`；演示和生产环境使用 `https://{subdomain}.b1.church`。

## 相关页面

- [网站路由与多站点](./websites.md) —— 请求如何解析到某个教会/站点，以及自定义域名如何路由
- [内容端点](../api/endpoints/content.md) —— 页面、区块、元素、博客文章、重定向和设置的完整 REST 接口
- [AppHelper](../shared-libraries/app-helper.md) —— 提供渲染器、注册表、分隔线和小组件的 npm 包
- [MCP 服务器](../api/mcp.md) —— 包括 `describe_page_builder` 指南工具
- [页面编辑器（终端用户）](/docs/b1-admin/website/page-editor) —— 面向工作人员的编辑器文档
