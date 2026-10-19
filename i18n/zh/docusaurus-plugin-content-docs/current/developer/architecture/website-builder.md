---
title: "网站构建器架构"
---

# 网站构建器架构

<div class="article-intro">

B1App 提供的每个教会网站都是根据内容树渲染的，内容树包括页面、分区和元素，存储在 ContentApi 中，并在 B1Admin 中以可视化方式编辑。一个共享的组件库同时渲染编辑器预览和线上网站，一个元素类型目录定义了页面上可以出现哪些内容，而独立的 AI 服务可以生成或重写该内容树。本页介绍整个技术栈：`@churchapps/helpers` 中的元素约定、渲染流水线、教会数据元素、全站小组件、博客层、访问受限页面、SEO、AI 生成以及对话式表单。

</div>

## 概览

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

整个技术栈遵循三条规则：

1. **一棵树，两种渲染器。** 页面是一棵 `pages → sections → elements` 树，每个节点都将其设置保存为 `answers` JSON 数据块。相同的 apphelper 组件既渲染 B1Admin 中的拖放式编辑器，也渲染 B1App 中服务端渲染的公开网站，不存在单独的"发布格式"。
2. **约定位于 `@churchapps/helpers` 中。** `ElementTypes.ts` 是元素类型的唯一目录；渲染器通过 apphelper 中的注册表进行解析；编辑器表单位于 B1Admin 中。新增一种元素类型，需要按此顺序修改这三处。
3. **公开网站读取匿名端点。** B1App 所需的一切内容——页面树、设置、博客文章、重定向，以及其他模块中的教会数据端点——都是公开的。身份验证是可选的：匿名树端点上的 JWT 可解锁仅限会员访问的页面，其他行为不变。

## 内容树

内容模块（`Api/src/modules/content`）负责管理构建器的数据：

| 数据表 | 作用 |
|-------|------|
| `pages` | 每个 URL 对应一个页面：`url`、`title`、`layout`，以及用于访问控制的 `visibility`/`groupIds`，和用于 SEO 的 `metaDescription` |
| `sections` | 页面（或数据块）中的水平分区：背景、文字颜色，以及 `answersJSON`，其中保存样式以及 `dividerTop`/`dividerBottom` 形状分隔线配置 |
| `elements` | 分区内的内容块：`elementType` + `answersJSON`，布局类型（行/列、轮播）可以嵌套 |
| `blocks` | 可复用的分区/元素组（页脚数据块、元素数据块），可在多个页面间共享 |
| `posts` | 独立的博客文章（参阅[博客](#blog)） |
| `redirects` | 每个教会的 `fromPath → toPath` 配对，上限为 200 条（参阅 [SEO](#seo-and-discoverability)） |
| `settings` | 键值形式的教会设置；标记为 `public` 的记录可匿名访问，并包含小组件/分析配置 |

某个 URL 的完整树只需一次匿名调用即可获取，即 `GET /content/pages/:churchId/tree?url=/about`，B1App 正是基于此结果进行服务端渲染。编辑器请求则改为按 ID 获取，并保留内部 ID。

## 元素约定

### 目录（`@churchapps/helpers`）

`Packages/helpers/src/ElementTypes.ts` 将每种元素类型定义为一个 `ElementTypeDefinition`，包括 `elementType`、`label`、`category`、`schemaVersion`、`defaults`，以及用于其答案的类 JSON Schema 风格的 `answersSchema`。`validateElementAnswers()` 有意保持宽松：未知类型和多余的键都会通过验证，因此旧内容不会因目录升级而损坏。目前共提供 **35 种类型**：

| 类别 | 元素类型 |
|----------|---------------|
| 布局（6） | row、column、box、carousel、whiteSpace、block |
| 内容（11） | text、textWithPhoto、card、faq、iconFeature、testimonial、socialIcons、countdown、stats、table、buttonLink |
| 媒体（4） | image、gallery、video、map |
| 教会（12） | logo、sermons、stream、donation、donateLink、form、calendar、groupList、groups、campaignProgress、staffGrid、serviceTimes |
| 高级（2） | rawHTML、iframe |

`sermons` 元素是教会类型中配置选项最丰富的一个：`layout` 答案可选择 `browse`（旧版完整浏览器）、`grid`、`list` 或 `featuredLatest`；在非浏览布局中，`playlistId`、`itemCount`、`showTitles` 和 `showDates` 可对其进行进一步细化。

`rawHTML` 元素有两个答案：`rawHTML`（标记）和 `javascript`。通过 `innerHTML` 插入的脚本永远不会执行，因此 `RawHTMLElement` 会将标记中的每个 `<script>` 节点重新创建为新元素。这些非解析器插入的节点在 CSP 的 `strict-dynamic` 策略下被视为可信。如果 `javascript` 答案以 `<` 开头（即连同 `<script>` 标签一起粘贴的厂商代码片段），则会被当作标记解析，并按相同方式处理。否则，它将作为普通的内联脚本运行。当 JavaScript 框中只有一个裸 URL 时，B1Admin 会进行标记提示，因为单独的 URL 会作为空操作脚本运行。如果未配置 Google Maps API 密钥，`map` 元素将不渲染任何内容，也不会加载 Google Maps 脚本。

### 渲染器（`@churchapps/apphelper`）

渲染器位于 `Packages/apphelper/src/website/components/elementTypes/` 中，每种类型一个组件，并通过 `ElementRegistry.ts` 进行解析。这是一个双层映射：`Element.tsx` 为全部 35 种类型注册默认渲染器（`registerDefaultElementRenderer`），宿主应用则可在运行时覆盖其中任何一种（`registerElementRenderer`），无需分叉该包。

### 编辑器表单（B1Admin）

编辑器中各类型的设置表单位于 `B1Admin/src/site/admin/elements/` 中：`ElementEdit.tsx` 会分派给专用组件（如 `GalleryEdit`、`TestimonialEdit`、`StatsEdit` 等），或为每种类型使用内联字段构建器。该目录面向 AI 的镜像是 API 的 MCP `describe_page_builder` 工具（参阅 [MCP 服务器](../api/mcp)）。

编辑器预览挂载的 `Theme` 与线上网站相同，该主题会根据教会的全局样式设置 `--headingFont` / `--bodyFont` CSS 变量。B1App 通过 `pages.css` 应用这些变量，而 B1Admin 无法导入该文件，因此 `ContentEditor.tsx` 会注入 `EDITOR_PAGE_FONT_CSS`（`src/site/admin/editorCss.ts`），将这些变量应用于 `.page` 的正文文本以及 `h1`–`h6`。如果没有它，预览中的标题会显示为管理端字体。

### 分区形状分隔线

分区可以在任一边缘添加装饰性形状分隔线。其配置保存在分区的 `answersJSON` 中，为 `dividerTop` / `dividerBottom` 对象：`{ shape, color, height, flip }`，其中 `shape` 的取值为 `wave, waves, slant, curve, triangle, peaks` 之一。Apphelper 提供了 `SectionDivider` 组件和 `parseDividerConfig()` 辅助函数；两个应用的 Section 渲染器（`B1App/src/components/Section.tsx`、`B1Admin/src/site/admin/Section.tsx`）都会解析答案并挂载分隔线，而 B1Admin 的 `SectionEdit.tsx` 则提供选择器界面。这些包仅提供构建模块，分区层面的集成工作由使用它们的应用负责。

## 教会数据元素

有三种元素类型渲染的是实时教会数据，而非创作的内容。模块隔离原则依然适用：每种元素都会从浏览器直接调用所属模块自己的公开端点：

| 元素 | 端点 | 说明 |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | 返回 `{ fundId, totalAmount, donationCount }`，可选 `?startDate=&endDate=` 时间范围；该元素会将其与 `goalAmount` 答案进行比较 |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **仅限选择加入**：该群组必须设置 `publicRoster`（默认关闭）。返回的数据经过刻意精简，仅包括 `personId`、`displayName`、`leader` 和照片，不包含任何联系方式或人口统计字段 |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | 返回"校区 → 服事 → 时间"的树形结构；apphelper 渲染器会据此尽力输出 schema.org `Event` JSON-LD（API 返回的是纯数据） |

:::warning
`publicRoster` 是 `staffGrid` 的隐私开关。切勿扩大公开群组成员的数据投影范围，也不要绕过该标志——名册端点按设计是匿名的，而精简的字段列表正是其安全保障。
:::

### 日历元素与活动页面

`calendar` 元素的答案包括 `calendarType`（`group` | `curated`）、`calendarId`、`display`（`month`，默认值，或 `upcoming`）以及 `tag`。B1App 在 `src/components/Element.tsx` 中使用 `registerElementRenderer("calendar", …)` 覆盖了 apphelper 渲染器：

- **`display: "upcoming"`** 会渲染 B1App 的 `UpcomingEventsElement`：它会加载 `GET /content/events/public/group/:churchId/:groupId` 或 `GET /content/curatedEvents/public/calendar/:churchId/:curatedCalendarId`，使用 `buildOccurrences()`（`src/helpers/EventOccurrences.ts`，每个活动在一年内展开为一次出现）展开重复规则，并将前 12 项显示为照片卡片（`events.photoUrl`，若无则回退为主题深色上的标题），链接至 `/events/{id}`，并提供一个用于该日历 ICS 订阅源的"订阅"菜单。
- **`display: "month"`** 会渲染 apphelper 的 `CalendarElement`，并带有 `eventUrl` 回调。`GroupCalendar` / `CuratedCalendar` → `EventCalendar` / `CuratedEventCalendar` 点击后会导航至该 URL，而不是打开详情对话框（B1Admin 不传递 `eventUrl`，因此管理端日历仍保留对话框）。
- **`tag`** 会使用 `EventHelper.hasTag()`（来自 `@churchapps/helpers`）对两种显示方式进行筛选：与逗号分隔的 `events.tags` 进行不区分大小写的匹配；为空时显示全部内容。curated 日历的联接会选择 `e.tags`，以便 curated 活动携带这些标签。

Curated 活动通过 `realEventId`（`eventPageId()`）建立链接，因此 URL 始终指向底层活动。`/{sdSlug}/events/[eventId]` 是一个专用路由（不经过构建器流水线）：它会加载 `GET /content/events/public/:churchId/:id`——对于待审核/已拒绝的活动以及没有报名的私人活动，该端点返回 `null`；并会从未被拒绝的场地预订中添加 `roomNames`——然后渲染 `EventPageContent`（照片主视觉、Markdown 描述、"时间/地点"侧边栏、当 `registrationEnabled` 为真时显示的**报名参加此活动**，以及指向 `GET /content/events/public/:churchId/:id/ical` 的**添加到我的日历**链接），使用该照片作为 Open Graph 图片，并通过 `EventPageJsonLd` 为下一次出现的活动输出 `Event` JSON-LD。未知或隐藏的活动会返回真正的 404。

## 全站小组件

有两个小组件会出现在每个公开页面上，而不是树的内部：**AnnouncementBanner**（可关闭的页面顶部横幅）和 **Launcher**（用于"奉献/到访/观看"类链接的浮动操作中心）。这两个组件及其 `parse*Config()` 辅助函数都包含在 apphelper 中。其配置存储为两条公开设置记录，键名分别为 `announcementBanner` 和 `launcher`，由 B1Admin 的 `SiteWidgetsEdit`（位于外观页面）写入，并由 B1App 的公开布局通过 `GET /content/settings/public/:churchId` 读取。API 将这些数据视为不透明的键值对；键名则是两个应用之间的约定。

## 博客 {#blog}

博客是一种独立的内容类型，而不是构建器页面之上的一层。`posts` 表中的一行保存整篇文章：`title`、`slug`、`excerpt`、`content`（Markdown 正文）、`authorId`、`photoUrl`、`publishDate`、`category`、`tags`。公开接口（均为匿名访问，由 `PostController` 提供）：

| 路由 | 用途 |
|-------|---------|
| `GET /content/posts/public/:churchId` | 已发布的文章，支持 `?category=&tag=` 筛选，并分页 |
| `GET /content/posts/public/:churchId/categories` | 已发布文章中的不重复分类 |
| `GET /content/posts/public/:churchId/slug/:slug` | 一篇已发布的文章 |
| `GET /content/posts/rss/:churchId?siteUrl=` | RSS 2.0 订阅源，标题为教会名称，每个条目包含分类以及摘要或内容描述 |

文章在设置了 `publishDate` 且该日期已到时即视为"已发布"；未来的 `publishDate` 表示定时发布的文章（对公众隐藏，并在管理端显示"已定时"标签）。读取接口会通过会员模块网关，根据 `authorId` 解析出 `authorName`，为每篇文章补充作者信息。若缺少摘要，则在列表卡片、元描述和 RSS 中使用去除 Markdown 后的内容（约 160 个字符）作为替代。B1App 提供 `/{sdSlug}/blog` 页面——这是一个编辑式列表页（居中的标题，在筛选时会变为当前激活的分类或标签名称；分类标签筛选行；左侧带缩略图的文章行，并显示作者信息和摘要），同时以备用链接的形式公布 RSS 订阅源；以及 `/{sdSlug}/blog/[postSlug]`，这是一个专用路由（不经过 Zone/Section 流水线），包括居中的标题（分类引导、标题、作者信息、主色强调线）、与容器等宽的 16:9 主视觉、约 720px 宽阅读栏中的 Markdown 正文、文章页脚中的标签，以及`"More in {category}"`的相关文章条带，并输出包含作者信息的 `BlogPosting` JSON-LD。两个页面的样式完全来自主题令牌，因此会继承每个教会的配色。博客 URL 会包含在每个教会的站点地图中。B1Admin 的创作界面（**网站 → 博客**）在对话框中编辑文章：包括带预览切换的 Markdown 编辑器、裁剪为 16:9 的图库图片选择器、作者人员选择器（默认为正在编辑的用户）、基于现有分类的分类自动补全、重复 slug 验证，以及发布开关；已发布的记录会链接到线上文章，页面还会提示管理员添加 `/blog` 导航链接。

## 会员专属页面

`pages.visibility` 复用了导航链接的枚举值——`everyone`（默认）、`visitors`、`members`、`staff`、`team`、`groups`（配合 `groupIds`）——但它是**硬性访问控制**，而非导航筛选（`PageVisibilityHelper.canViewPage`）。流程如下：

1. 匿名树端点会在基于 URL 的获取请求中检查可见性。匿名访问受限页面的调用者会收到 `{ restricted: true, visibility }`，而非内容——树结构绝不会泄露内容。
2. 该端点仍会识别 JWT：`CustomAuthProvider` 会对*每一个*请求（包括匿名路由）验证 `Authorization` 标头，因此已登录会员对同一 URL 的请求可以正常解析。
3. 当收到 `restricted` 响应时，B1App 会渲染 `RestrictedPage`：它会从已存储的凭据中恢复会话，使用 JWT 重新获取树结构并进行渲染；如果没有会话，则显示带有 `returnUrl` 的登录拦截页面。

:::info
各级别的访问控制粒度有所不同：`groups` 会将令牌中的 `groupIds` 与页面列表进行比对，`staff` 会检查 `membershipStatus`，但 `members` 和 `team` 目前只要是该教会的任何已登录用户即可通过。若需严格控制，请使用 `groups`。
:::

## SEO 与可发现性 {#seo-and-discoverability}

以上所有内容均由 B1App 基于 ContentApi 的数据进行渲染——API 负责存储，应用负责输出：

| 关注点 | 工作方式 |
|---------|--------------|
| 元描述 | `pages.metaDescription`（≤300 个字符）通过 `MetaHelper.getMetaData()` 流入每个由构建器渲染的路由的 Next.js `Metadata`（description 与 Open Graph）。B1Admin 的页面设置包含一个 AI"生成"按钮（见下文） |
| 重定向 | 每个教会的 `redirects` 记录在 `/content/redirects` 中管理（`content.edit` 权限，上限 200 行，路径已规范化）。当路径本应返回 404 时，B1App 的页面路由会通过 `GET /content/redirects/public/:churchId` 解析该路径，并通过 Next 的 `permanentRedirect` 返回 HTTP 308；未匹配的路径则交由 `notFound()` 处理 |
| 品牌化 404 | `not-found.tsx` 会渲染 `BrandedNotFound`，显示教会的徽标、名称和主题，而不是通用错误页面。未知的 `/register/[eventId]`、`/events/[eventId]`、`/stream/[pageSlug]` 和 `/volunteer/[planId]` 路径会返回真正的 404，未知子域名和格式错误的页面 slug 也是如此（参阅[网站路由与多站点](./websites)） |
| 结构化数据 | 博客文章使用 `BlogPosting` JSON-LD；每个讲道页面（`/{sdSlug}/sermons/[sermonId]`）以及包含 `sermons` 元素的页面使用 `VideoObject`；构建器页面和每个 `/{sdSlug}/events/[eventId]` 页面上，由日历/活动元素生成 `Event`（下一次出现的时间，并将活动照片作为 `image`）；`serviceTimes` 元素则输出 schema.org `Event` |
| 讲道页面 | 每篇公开讲道都会在 `/sermons/[sermonId]` 拥有一个可供爬取的页面，并包含完整的元数据——讲道不再被锁定在客户端浏览器元素之中 |
| 分析 | 公开设置键 `ga4MeasurementId`（在 B1Admin 中与重定向一起管理）会通过 `next/script` 注入每个教会专属的 GA4 gtag。当其为有效的 `G-` ID 时，B1 应用（`/{sdSlug}/mobile`）也会将其页面浏览数据发送至该 ID，同时也会发送至 ChurchApps 自身的代码（GTM 容器 ID 仅用于网站）。每个 `gtag('config')` 都会携带一个 `display_mode`，其值为 `installed` 或 `browser`，依据 `navigator.standalone` 或 `(display-mode: standalone)` 媒体查询判断（`B1App/src/helpers/mobileAnalytics.ts`） |
| 站点地图与订阅源 | 每个教会的 `sitemap.xml` 路由包括构建器页面、博客 URL，以及最近 50 个讲道页面（其 `<lastmod>` 取自每篇讲道的发布日期）。当这些页面有内容时（公开群组、报名计划），它还会列出内置的 `/sermons`、`/groups` 和 `/volunteer` 页面，除非已保存的重定向替换了该路径。当教会没有首页时，`/` 会被排除在外，因为此时 `/` 会重定向到不允许的 `/mobile`。博客列表页会公布 RSS 订阅源 |
| 无障碍 | 公开页面框架在每个布局包装器中都渲染了一个跳过链接，指向 `<main id="main-content">` 地标 |

## AI 生成（AskApi）

页面和站点生成运行在 **AskApi** 中，这是一个独立的服务，位于 `/website` 控制器下。它使用与其他所有服务相同的 `CustomAuthProvider` JWT 进行身份验证，并且**在内容方面是无状态的**：每个端点都返回 JSON，由调用方（B1Admin）通过 ContentApi 保存结果（`POST /content/pages/importTree` 可通过一次调用创建包含完整嵌套分区与元素树的页面；它始终插入到调用方所属的教会下，并忽略请求体中的 ID）。

### 页面生成（`planPage` → `writePage`）

B1Admin 中 `AddPageModal` 里的"AI"页面模板使用一套低成本流水线（`AskApi/src/helpers/SiteGenHelper.ts`），其核心规则是：**没有任何模型会输出构建器 JSON**。两个模型通过 Vercel AI Gateway（普通 HTTP，SSM 密钥 `/{env}/aiGatewayApiKey` 或 `AI_GATEWAY_API_KEY`）分工协作：

- **JEV**（`typesafe-ai/jev`）——一个类型安全的决策模型，它返回带概率的选项、分数和布尔值，但无法撰写文本。它会从固定的模板库中依次选择每个分区、为布局打分、核实文案，并挑选图库照片和图标。输入每百万 token 约 0.04 美元，输出免费，因此每页约 90 次调用的成本仅为几分钱的零头。
- **一个小型聊天模型（默认为 GPT-4.1 mini）**——负责填充所选模板中具名的、有长度上限的文本槽位。撰写模型是一个常量，可通过 `SITEGEN_COPY_MODEL` 环境变量覆盖（网关上的任何聊天模型 ID，例如 `anthropic/claude-haiku-4.5`）。在对三个教会进行的盲测并排对比中，Claude Haiku 4.5 的语气略显温暖，但 GPT-4.1 mini 与其接近，且成本约为其四分之一、速度更快，因此它被设为默认值。包含全部三种布局的完整页面成本约为 1.3 美分，其中约 80% 来自撰写模型。

| 阶段 | 端点 | 发生的事情 |
|-------|-------|-------|
| 1 | `POST /website/planPage` | 对页面类型进行分类（首页、到访、关于……），然后根据 JEV 每一轮的概率采样 10 个候选布局（主视觉 + 分区数量 → 每个分区 → 结束语），去重后让 JEV 对每个候选的契合度、流畅度和缺口进行评分，返回前 3 名，以及写作语气和 `suggestedStyle`（配色 + 字体）。到目前为止分区相同的候选会向 JEV 提出完全相同的问题，因此各轮会按前缀进行记忆化。最高分低于 6 分时会被记录为 `lowLayoutScore`——该日志即是值得新增的模板待办清单。约 2 秒 |
| 2 | `POST /website/writePage`（每个候选调用一次） | 撰写模型每次调用并行填充两个分区的槽位文案，并返回五个主标题供 JEV 选择；JEV 核实每个分区的事实；未通过检查、使用套话或重复前文内容的分区（代码中检查共享的 4 词片段）会以具体原因并行重写；代码清理会删除包含通用教会网站套话的句子（除非教会自己的描述中使用了这些套话）；JEV 挑选照片主题、图标和主视觉的形状分隔线，并对结果评分。返回一棵可直接保存的分区树及其分数。约 6–9 秒 |
| 3 | `POST /content/pages/importTree` | B1Admin 只写入排名最高的布局（若写入失败，则以次高者作为备选），保存并打开预览（点击保存后约 10 秒） |

每个阶段都是独立的请求，以确保每次调用都在 API Gateway 的 29 秒限制之内。`SiteGenHelper.buildTree` 中的模板是来自目录的固定分区与元素树（`text`、`row`/`column`、`card`、`iconFeature`、`faq`、`table`、`testimonial`、`textWithPhoto`、`box`、`map`、`sermons`），并引用主题令牌（`var(--accent)`、`var(--lightAccent)` 等），因此生成的页面会继承教会现有的外观设置。若要新增分区模板，需要将其槽位列表添加到 `SECTIONS`，并将其树添加到 `buildTree`；单元测试会遍历每个模板并验证其树结构。

**输入。** 文案只能陈述两个来源中的事实：用户输入的内容，以及 `churchContext.facts`——即 B1Admin 在规划前收集的记录（公开的服事时间和公开的群组名称，以及教会名称和地址）。同样的标志也控制依赖数据的模板：当教会在 B1 中维护服事时间时，`times` 会渲染实时的 `serviceTimes` 元素（否则渲染手动输入的表格），`groups` 和 `countdown` 仅在背后有数据时才会提供。JEV 调用采用对冲策略：1.5 秒后会发起一次重复调用，以先返回的结果为准，因为网关偶尔会卡住，而这些调用的成本几乎可以忽略不计。

**紧扣主题。** 用户的提示词是*页面的主题*，而非关于教会的背景信息。`planPage` 会对请求进行分类（`home`、`visit`、`about`、`ministries`、`give`、`contact`、`event`、`topic`），对于 `event` 和 `topic` 页面，甚至不会提供通用教会模板（牧师寄语、讲道、事工、群组、社区影响、每周时间和倒计时、视频主视觉），而是提供 `details`（何时/何地/需携带什么）和日期 `eventCountdown`。两位评审都会对内容是否切题进行评分。B1Admin 会将计划中的 `pageType` 传入每次 `writePage` 调用。

**从简短请求生成完整页面。** 页面包含三到六个中间分区、较为充裕的槽位长度、卡片分区的引导句，以及五个问题的常见问题部分；修复流程会扩写任何返回内容过于单薄的分区。生成只需点击一次：不会提出后续问题。如果请求遗漏了完整页面所需的常规细节（开始时间、房间、需携带的物品、报名方式），撰写模型会填入一个合理且适度的选项，供教会自行修改。由于各分区是并行撰写的，这些缺口**会一次性**在 `planPage` 中决定（`assumedDetails`，即与布局采样并行运行的一次小型撰写模型调用），并通过 `churchContext.assumedDetails` 传回每一次 `writePage` 调用，因此不会出现一个分区写 5:00、另一个分区写 5:30 的情况。JEV 会修复任何与请求、教会记录或已确定细节相矛盾的分区。已确定的细节不会在界面中展示；教会会像对待任何页面一样审阅和编辑该页面。有些内容绝不会被编造：人员姓名、电话号码、电子邮件和网址、价格、统计数据、教会历史、归于某人名下的引语，以及请求中未给出日期时对应的星期几。

**视觉元素。** 模板从不指定其照片或图标。它们只留出空槽位，然后由一个通用流程（`SiteGenHelper` 中的 `visualSlots` → `pickVisuals` → `applyVisuals`）遍历完成的树并填充每一个槽位：标记为 `auto:photo` 的分区背景或图库条目、`auto:icon`、主视觉的 `auto:divider`，以及没有任何标记但 `photo` 为空的 `textWithPhoto`、`card` 或 `image` 元素。JEV 会根据其旁边的文字来挑选每个槽位（卡片的照片根据该卡片的标题和文字，背景则根据分区的文案），并确保同一页面中不会重复同一主题。因此，新模板也能自动获得照片。照片是以 `pexels:<term>` 占位符形式输出的 Pexels 搜索主题，由 B1Admin 通过 `POST /content/stock/search` 解析；不发送 `resolvesPhotos` 的客户端则会改用内置的主视觉图片、纯色带状背景和无照片的卡片。我们刻意不使用人物肖像类主题，牧师模板也不带照片：绝不能让素材库中的陌生人代替真实的人。对于尚无页面的教会，B1Admin 会将 `suggestedStyle` 应用到全局样式中；已有的网站则保持原有外观。

### 其他端点

:::info
B1Admin 客户端中的 `SectionToolbar` 重写按钮以及页面列表中的"生成站点"按钮仍处于注释状态。下列 AskApi 端点仍会响应；仅隐藏了相应的 UI。
:::

| 端点 | 用途 |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | 最初的两步页面流程（先生成大纲，然后每个分区调用一次 LLM 并输出元素 JSON）。由于成本原因，B1Admin 已改用 `planPage`/`writePage` 取代它；保留它是为了供 API 使用者调用 |
| `POST /website/generateSite` | 整站生成。**按设计分为两阶段**：`planOnly: true` 调用只返回多页面计划（一次快速的模型调用），然后客户端再请求完整内容——从而使每个请求都在 Lambda/API Gateway 的超时时间之内 |
| `POST /website/rewriteSection` | 保持结构的重写：模型只能修改包含文本的答案。在修改前后会比较递归的结构签名（ID + 类型 + 顺序）；任何不匹配都会返回带有 `fallback: true` 的原始分区，而不是损坏的结构 |
| `POST /website/generateAltText` | 对最多 20 个图片 URL 进行视觉调用；返回简洁的替代文本（≤125 个字符，去掉"photo of"前缀） |
| `POST /website/generateMetaDescription` | 根据页面的文字内容生成一条 SEO 元描述（≤155 个字符）——与 B1Admin 页面设置中的"生成"按钮相连 |

这些端点的提示词是位于 `AskApi/config/instructions/` 下的 Markdown 文件，其中包括模型生成时所依据的元素目录。有两项设计确保了该目录的准确性：客户端在每个请求中都会传递 `availableElementTypes`（提示词只能使用该列表中的类型——服务器从不硬编码完整集合），而且 API 的 MCP `describe_page_builder` 工具也提供同样的指南，供通过 [MCP](../api/mcp) 工作的 AI 代理使用。模型为通过 OpenRouter 调用的 Anthropic Claude——分区内容使用 3.5 Haiku（看重延迟），大纲、站点计划和视觉任务使用 3.5 Sonnet；若未配置 OpenRouter 密钥，则回退至 OpenAI。

## 对话式表单

表单（会员模块）新增了对话模式，专为类似连接卡的页面设计。`forms` 表中的四个列用于驱动该模式：`displayMode`（`standard` | `conversational`）、`autoCreatePerson`、`followUpSubject`、`followUpBody`。

- **渲染**——当 `displayMode` 为 `conversational` 时，apphelper 的 `FormSubmissionEdit` 会切换到 `ConversationalForm` 组件（每次只显示一个问题）；B1App 的表单页面会传递该模式。无论哪种模式，提交的数据负载都相同。
- **自动创建人员**——提交时若设置了 `autoCreatePerson`，`ConversationalFormHelper.findOrCreatePerson` 会按电子邮件（不区分大小写）去重，否则创建一个家庭和一个 `membershipStatus: "Guest"` 的人员，然后将该提交关联到此人员。
- **后续电子邮件**——当设置了主题和正文时，提交者会通过现有的事务性通道（`TransactionalEmailHelper`）收到一封模板化的电子邮件（包含 `{firstName}` / `{churchName}` 占位符），而绝不会经过通知摘要通道。这两项附带操作都是非致命的：失败时绝不会丢失提交的数据。

这四个字段目前需通过 API 设置；B1Admin 的表单编辑器尚未提供这些字段。

## 公开站点缓存

B1App 的公开渲染路径会缓存带有教会标签的请求（生产环境为 `next: { revalidate: 300, tags: [sdSlug] }`，开发环境为 `0`），因此在 ContentApi 写入之后，线上页面最多可能会陈旧五分钟。B1App 上的 `POST /api/revalidate/{sdSlug}` 会调用 `revalidateTag(sdSlug)`，是提前清除该缓存的唯一方法。

有两个写入方会触发该缓存的清除：

1. **B1Admin**——`B1Admin/src/site/siteCache.ts` 中的 `clearSiteCache()` 会在编辑器保存后发送 POST 请求。它优先使用当前站点的子域名（次级站点必须清除*该*标签，而非教会的默认标签）。
2. **Api**——不经过 B1Admin 的内容变更（API 密钥、MCP、AI）会从内容控制器触发 `SiteCacheHelper.bump(churchId)`。该辅助函数通过 `SubDomainHelper` 解析教会的子域名，并向 `{b1AppRoot}/api/revalidate/{sd}` 发送 POST 请求。失败会被静默忽略，因此无法访问的 B1App 不会导致保存操作失败。

会触发清除的控制器包括：页面（保存、删除、复制、发布、丢弃、取消发布、AI 临时内容）、分区、元素、数据块、链接、全局样式、博客文章和重定向。开发环境的 `b1AppRoot` 为 `http://{subdomain}.localtest.me:3301`；演示和生产环境则为 `https://{subdomain}.b1.church`。

## 相关页面

- [网站路由与多站点](./websites)——请求如何解析到教会/站点，以及自定义域名如何路由
- [内容端点](../api/endpoints/content)——页面、分区、元素、数据块、文章、重定向和设置的完整 REST 接口
- [AppHelper](../shared-libraries/app-helper)——提供渲染器、注册表、分隔线和小组件的 npm 包
- [MCP 服务器](../api/mcp)——包括 `describe_page_builder` 指南工具
- [页面编辑器（终端用户）](/docs/b1-admin/website/page-editor)——面向员工的编辑器文档
