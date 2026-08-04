---
title: "网站构建器架构"
---

# 网站构建器架构

<div class="article-intro">

每一个由 B1App 提供服务的教会网站,都是从一棵存储在 ContentApi 中、在 B1Admin 中以可视化方式编辑的内容树——页面、版块、元素——渲染出来的。同一套共享组件库既渲染编辑器中的预览效果,也渲染线上正式站点;同一份元素类型目录定义了页面上可以出现哪些内容;还有一个独立的 AI 服务可以生成或改写这棵内容树。本页面梳理整套技术栈：`@churchapps/helpers` 中的元素契约、渲染流水线、教会数据类元素、全站级组件、博客层、访问受限页面、SEO,以及对话式表单。

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

以下三条规则贯穿整个技术栈：

1. **一棵树,两套渲染器。**一个页面就是一棵 `pages → sections → elements` 树,树上每个节点都以一个 `answers` JSON 块的形式携带自己的配置。同一套 apphelper 组件既渲染 B1Admin 中的拖放式编辑器,也渲染 B1App 中的服务端渲染正式站点——不存在所谓单独的“发布格式”。
2. **契约定义在 `@churchapps/helpers` 中。**`ElementTypes.ts` 是唯一的元素类型目录;渲染器通过 apphelper 中的一个注册表进行解析;编辑器表单则位于 B1Admin。新增一种元素类型意味着要依次改动这三处。
3. **正式站点只读取匿名端点。**B1App 所需要的一切——页面树、设置、博客文章、重定向,以及其他模块中的教会数据端点——全部是公开的。认证是可选的：在匿名的树形端点上附带一个 JWT,就能解锁仅限会员查看的页面,除此之外不会有任何其他变化。

## 内容树

content 模块（`Api/src/modules/content`）拥有构建器的所有数据：

| 表 | 角色 |
|-------|------|
| `pages` | 一个 URL 对应一个页面：`url`、`title`、`layout`,以及 `visibility`/`groupIds`（访问权限控制）和 `metaDescription`（SEO） |
| `sections` | 页面（或某个区块内）中的横向分区：背景、文字颜色,以及一个携带样式信息和 `dividerTop`/`dividerBottom` 波浪分割线配置的 `answersJSON` |
| `elements` | 版块内的内容片段：`elementType` + `answersJSON`,对于布局类型（行/列、轮播图）可以嵌套 |
| `blocks` | 可跨页面复用的版块/元素组合（页脚区块、元素区块） |
| `posts` | 独立的博客文章（参见[博客](#博客)） |
| `redirects` | 每个教会自己的一组 `fromPath → toPath` 重定向对,上限 200 条（参见 [SEO](#seo-与可发现性)） |
| `settings` | 键值对形式的教会设置;标记为 `public` 的记录会被匿名读取,并携带小组件/统计相关的配置 |

某个 URL 对应的整棵树,是通过一次匿名调用——`GET /content/pages/:churchId/tree?url=/about`——一并返回的,B1App 就是基于这个结果做服务端渲染的。编辑器端的请求则是按 ID 获取,并保留内部 ID。

## 元素契约

### 目录（`@churchapps/helpers`）

`Packages/helpers/src/ElementTypes.ts` 将每一种元素类型都定义为一个 `ElementTypeDefinition`：`elementType`、`label`、`category`、`schemaVersion`、`defaults`,以及一个类似 JSON-schema 风格的 `answersSchema` 用于描述其配置项。`validateElementAnswers()` 被刻意设计得很宽松——未知类型和多余的字段都会放行,因此旧内容不会因为目录升级而损坏。**目前共上线了 35 种类型：**

| 分类 | 元素类型 |
|----------|---------------|
| 布局（6 种） | row（行）、column（列）、box（盒子）、carousel（轮播）、whiteSpace（空白）、block（区块） |
| 内容（11 种） | text（文本）、textWithPhoto（图文）、card（卡片）、faq（常见问答）、iconFeature（图标特性）、testimonial（见证）、socialIcons（社交图标）、countdown（倒计时）、stats（数据统计）、table（表格）、buttonLink（按钮链接） |
| 媒体（4 种） | image（图片）、gallery（相册）、video（视频）、map（地图） |
| 教会（12 种） | logo（标志）、sermons（讲道）、stream（直播）、donation（捐赠）、donateLink（捐赠链接）、form（表单）、calendar（日历）、groupList（小组列表）、groups（小组）、campaignProgress（活动进度）、staffGrid（同工墙）、serviceTimes（服务时间） |
| 高级（2 种） | rawHTML（原始 HTML）、iframe |

`sermons`（讲道）元素是教会类元素中可配置性最高的一个：一个 `layout` 配置项可选择 `browse`（旧版完整浏览器）、`grid`（网格）、`list`（列表）或 `featuredLatest`（精选最新）,并可通过 `playlistId`、`itemCount`、`showTitles`、`showDates` 进一步细化非 `browse` 布局的展示效果。

### 渲染器（`@churchapps/apphelper`）

渲染器位于 `Packages/apphelper/src/website/components/elementTypes/`,每种类型一个组件,通过 `ElementRegistry.ts` 解析——这是一个双层映射：`Element.tsx` 为全部 35 种类型注册默认渲染器（`registerDefaultElementRenderer`）,宿主应用可以在运行时覆盖其中任意一个（`registerElementRenderer`）,而无需 fork 整个包。

### 编辑器表单（B1Admin）

编辑器中按类型划分的设置表单位于 `B1Admin/src/site/admin/elements/`——`ElementEdit.tsx` 会分发到一个专用组件（`GalleryEdit`、`TestimonialEdit`、`StatsEdit` 等）,或者针对某些类型使用一个内联字段构建器。这份目录面向 AI 的对应物是 API 的 MCP 工具 `describe_page_builder`（参见 [MCP 服务器](../api/mcp)）。

### 版块波浪分割线

版块可以在上边缘或下边缘装饰性地添加波浪分割线。相关配置存放在版块的 `answersJSON` 中,以 `dividerTop` / `dividerBottom` 对象的形式出现——`{ shape, color, height, flip }`,其中 `shape` 可取 `wave`（波浪）、`waves`（多重波浪）、`slant`（斜线）、`curve`（曲线）、`triangle`（三角形）、`peaks`（尖峰）之一。apphelper 提供了 `SectionDivider` 组件和 `parseDividerConfig()` 辅助函数;两个应用各自的版块渲染器（`B1App/src/components/Section.tsx`、`B1Admin/src/site/admin/Section.tsx`）都会解析这些配置并挂载分割线组件,B1Admin 中的 `SectionEdit.tsx` 则提供了选择器界面。包本身只提供构建这一基础组件的能力——版块层面的具体接线工作是各消费方应用自己的职责。

## 教会数据类元素

有三种元素类型渲染的是实时的教会数据,而非人工编写的内容。模块隔离原则在这里依然适用——每一种都由浏览器直接调用其所属模块自己的公开端点：

| 元素 | 端点 | 说明 |
|---------|----------|-------|
| `campaignProgress`（活动进度） | `GET /giving/funds/public/:churchId/:fundId/total` | 返回 `{ fundId, totalAmount, donationCount }`,可选带 `?startDate=&endDate=` 时间窗口;该元素会将其与自身的 `goalAmount` 配置项进行比对 |
| `staffGrid`（同工墙） | `GET /membership/groupmembers/public/:churchId/:groupId` | **仅限自主开启**：该小组必须设置了 `publicRoster`（默认关闭）。返回的字段被刻意设计得极简——`personId`、`displayName`、`leader`、照片——不包含任何联系方式或人口统计学字段 |
| `serviceTimes`（服务时间） | `GET /attendance/servicetimes/public/:churchId` | 返回 校区 → 服务 → 时间 的树状结构;apphelper 中的渲染器会据此生成尽力而为的 schema.org `Event` JSON-LD（API 本身只返回纯数据） |

:::warning
`publicRoster` 是 `staffGrid`（同工墙）功能的隐私开关。切勿扩大公开的小组成员字段集,也不要绕过这个开关——该花名册端点本就是设计为匿名可访问的,精简的字段列表正是其安全保障所在。
:::

## 全站级组件

有两个组件会渲染在每一个公开页面上,而非嵌入内容树内部：**AnnouncementBanner**（可关闭的页面顶部横幅）和 **Launcher**（用于“捐赠/来访/观看”类链接的悬浮操作入口）。这两个组件及其各自的 `parse*Config()` 辅助函数都随 apphelper 一起发布。相关配置以两条公开设置记录的形式存在——键名分别为 `announcementBanner` 和 `launcher`——由 B1Admin 的 `SiteWidgetsEdit`（位于外观页面）写入,并由 B1App 的公开布局通过 `GET /content/settings/public/:churchId` 读取。API 把它们当作不透明的键值对来处理;这些键名只是两个应用之间的一种约定。

## 博客

博客是一种独立的内容类型,而非构建器页面之上的一层。一条 `posts` 记录保存了整篇文章：`title`、`slug`、`excerpt`、`content`（Markdown 正文）、`authorId`、`photoUrl`、`publishDate`、`category`、`tags`。公开接入面（全部匿名,`PostController`）：

| 路由 | 用途 |
|-------|------|
| `GET /content/posts/public/:churchId` | 已发布的文章,可按 `?category=&tag=` 筛选,支持分页 |
| `GET /content/posts/public/:churchId/categories` | 已发布文章中出现过的不重复分类 |
| `GET /content/posts/public/:churchId/slug/:slug` | 单篇已发布文章 |
| `GET /content/posts/rss/:churchId?siteUrl=` | RSS 2.0 订阅源,以教会名称为标题,每一项都带有分类和摘要（或正文摘录）作为描述 |

一篇文章只要 `publishDate` 已设置且已过去,就被视为“已发布”;未来的 `publishDate` 则代表一篇定时发布的文章（公开端不可见,在管理端会以“已排期”标签显示）。读取端点会通过 membership 模块网关,根据 `authorId` 解析出 `authorName` 并附加到每篇文章上。缺失摘要时会回退到去除 Markdown 标记后的正文内容（约 160 字符）,用于列表卡片、meta 描述和 RSS。B1App 提供 `/{sdSlug}/blog`——一个编辑风格的列表页（居中的标题,在按分类/标签筛选时会变为当前分类/标签名称,分类标签筛选行,缩略图居左的文章行,附带作者署名和摘要）,并以备用链接的形式声明 RSS 订阅源——以及 `/{sdSlug}/blog/[postSlug]`,这是一个专用路由（不走 Zone/Section 渲染流水线）,带有居中标题（分类小标题、标题、作者署名、主色调装饰线）、容器宽度的 16:9 首图、约 720px 宽的 Markdown 正文阅读列、文章底部的标签芯片、一个“更多 {分类} 相关文章”的相关文章列表,以及包含作者信息的 `BlogPosting` JSON-LD 结构化数据。两个页面的样式都完全来自主题令牌,因此会自动继承每个教会各自的调色方案。博客链接会被纳入按教会生成的站点地图。B1Admin 的创作界面（**站点 → 博客**）在一个对话框中编辑文章：带预览切换的 Markdown 编辑器、16:9 裁剪的相册图片选择器、作者的人员选择器（默认为正在编辑的用户）、基于已有分类的分类自动补全、重复 slug 校验,以及一个发布开关;已发布的记录会链接到线上文章,页面还会提示管理员添加一个 `/blog` 导航链接。

## 仅限会员页面

`pages.visibility` 复用了导航链接中的枚举值——`everyone`（所有人,默认）、`visitors`（访客）、`members`（会员）、`staff`（工作人员）、`team`（团队）、`groups`（指定小组,配合 `groupIds`）——但在这里它是一道**硬性访问权限控制**,而非导航过滤（`PageVisibilityHelper.canViewPage`）。流程如下：

1. 匿名的树形端点会在基于 URL 的请求上检查可见性。匿名用户访问一个受限页面时,得到的是 `{ restricted: true, visibility }` 而不是内容——这棵树永远不会泄露给未授权者。
2. 该端点仍然会识别 JWT：`CustomAuthProvider` 会在*每一个*请求上校验 `Authorization` 请求头,包括匿名路由,因此已认证会员对同一 URL 的请求会正常解析。
3. B1App 在收到 `restricted` 响应时会渲染 `RestrictedPage`：它会从已存储的凭证中恢复会话,携带 JWT 重新获取该树,并渲染出来——如果没有会话,则会显示带 `returnUrl` 的登录页面。

:::info
访问权限的判定粒度因级别而异：`groups`（小组）会用令牌中的 `groupIds` 对照页面所设定的列表进行检查,`staff`（工作人员）会检查 `membershipStatus`,但 `members`（会员）和 `team`（团队）目前只要求是该教会的任何已认证用户即可通过。请把 `groups` 视为最严格的选项。
:::

## SEO 与可发现性

以下全部是 B1App 侧基于 ContentApi 数据完成的渲染——API 负责存储,应用负责呈现：

| 关注点 | 实现方式 |
|---------|---------|
| Meta 描述 | `pages.metaDescription`（不超过 300 字符）会通过 `MetaHelper.getMetaData()` 汇入每一个构建器渲染路由的 Next.js `Metadata`（description 与 Open Graph）。B1Admin 的页面设置中带有一个 AI“生成”按钮（见下文） |
| 重定向 | 每个教会自己的 `redirects` 记录,在 `/content/redirects` 管理（需要 `content.edit` 权限,上限 200 条,路径经过规范化）。当命中一个疑似 404 时,B1App 的页面路由会用该路径去查询 `GET /content/redirects/public/:churchId`,并通过 Next 的 `permanentRedirect` 返回 HTTP 308;未匹配的路径则回落到 `notFound()` |
| 品牌化 404 页面 | `not-found.tsx` 会渲染带有该教会 Logo、名称和主题风格的 `BrandedNotFound`,而非一个通用错误页 |
| 结构化数据 | 博客文章上的 `BlogPosting` JSON-LD;每篇讲道独立页面（`/{sdSlug}/sermons/[sermonId]`）以及包含 `sermons` 元素的页面上的 `VideoObject`;构建器页面中日历/活动元素生成的 `Event`;`serviceTimes` 元素生成的 schema.org `Event` |
| 讲道页面 | 每一篇公开讲道都会得到一个可被搜索引擎抓取的独立页面 `/sermons/[sermonId]`,带有完整的元数据——讲道内容不再被锁死在客户端浏览器组件内部 |
| 统计分析 | 公开设置项 `ga4MeasurementId`（在 B1Admin 中与重定向设置放在一起管理）会通过 `next/script` 注入按教会区分的 GA4 gtag |
| 站点地图与订阅源 | 每个教会的 `sitemap.xml` 路由会包含构建器页面和博客链接;博客列表页会声明 RSS 订阅源 |
| 无障碍访问 | 公开的页面外壳会在每一层布局包装器中渲染一个跳转链接,目标指向 `<main id="main-content">` 这一地标区域 |

## AI 生成（AskApi）

页面与站点生成功能运行在 **AskApi** 这一独立服务中,位于 `/website` 控制器下。它使用与其他一切相同的 `CustomAuthProvider` JWT 进行认证,并且**在内容层面是无状态的**：每个端点都只返回 JSON,由调用方（B1Admin）通过 ContentApi 完成持久化（`POST /content/pages/temp/ai` 一次性保存一整套生成出来的页面-版块-元素组合）。

:::info
截至 2026-07-03,B1Admin 中通往这条流水线的入口——`AddPageModal` 中的站点“AI”模板、`SectionToolbar` 的改写按钮,以及页面列表中的“生成站点”按钮——在客户端被临时注释掉了,该功能正在重新设计中。下方列出的 AskApi 端点不受影响,依然正常响应;只是 B1Admin 的界面暂时被隐藏了。
:::

| 端点 | 用途 |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | 最初的两步式页面生成流程：先生成大纲,再逐个版块调用一次。B1Admin 的 `AddPageModal` 中“AI”页面模板驱动的正是这个流程——先大纲,再并行生成各版块,最后预览 |
| `POST /website/generateSite` | 整站生成。**按设计分两个阶段**：先用 `planOnly: true` 调用一次,只返回多页面的规划（一次快速模型调用）,随后客户端再请求完整内容——从而保证每一次请求都不超出 Lambda/API 网关的超时限制 |
| `POST /website/rewriteSection` | 保结构改写：模型只能修改带文本内容的配置项。改写前后会比对一个递归结构签名（ID + 类型 + 顺序）;一旦出现不匹配,会返回带 `fallback: true` 标记的原始版块,而不是一个损坏的结构 |
| `POST /website/generateAltText` | 对最多 20 个图片 URL 进行视觉模型调用;返回简洁的替代文本（不超过 125 字符,并去除“照片：”一类的前缀） |
| `POST /website/generateMetaDescription` | 根据页面文字内容生成一条 SEO meta 描述（不超过 155 字符)——与 B1Admin 页面设置中的“生成”按钮相连 |

提示词是位于 `AskApi/config/instructions/` 下的 Markdown 文件,其中包括模型生成内容时所依据的元素目录。有两个设计要点确保这份目录始终保持真实可信：客户端在每次请求时都会传入 `availableElementTypes`（提示词只能使用这份列表中的类型——服务器从不硬编码完整的类型集合）,并且 API 的 MCP 工具 `describe_page_builder` 为通过 [MCP](../api/mcp) 工作的 AI 代理提供了同一份指南。所用模型是通过 OpenRouter 调用的 Anthropic Claude——3.5 Haiku 用于版块内容（追求低延迟）,3.5 Sonnet 用于大纲、站点规划和视觉理解——在未配置 OpenRouter 密钥时会回退到 OpenAI。

## 对话式表单

表单功能（membership 模块）新增了一种面向“联系卡”式页面的对话式模式。`forms` 表上的四个字段驱动这一功能：`displayMode`（`standard`（标准）| `conversational`（对话式））、`autoCreatePerson`、`followUpSubject`、`followUpBody`。

- **渲染** —— 当 `displayMode` 为 `conversational` 时,apphelper 的 `FormSubmissionEdit` 会切换到 `ConversationalForm` 组件（一次只显示一个问题）;B1App 的表单页面会原样传递这个模式。无论哪种模式,提交的负载格式都相同。
- **自动创建人员记录** —— 当 `autoCreatePerson` 已设置时,提交后 `ConversationalFormHelper.findOrCreatePerson` 会按邮箱（不区分大小写）去重,若无匹配则创建一个家庭 + 一个 `membershipStatus: "Guest"` 的人员记录,并将该次提交关联到这个人。
- **跟进邮件** —— 当设置了主题和正文时,提交者会收到一封模板化邮件（支持 `{firstName}` / `{churchName}` 占位符）,发送渠道是既有的事务性邮件路径（`TransactionalEmailHelper`）,而不会经过通知摘要那个入口。这两个附加动作都是非致命的：即便失败,也绝不会导致该次提交本身丢失。

目前这四个字段只能通过 API 设置;B1Admin 的表单编辑器尚未在界面上暴露它们。

## 相关页面

- [网站路由与多站点](./websites) —— 一个请求如何解析到某个教会/站点,以及自定义域名如何路由
- [Content 端点](../api/endpoints/content) —— 涵盖页面、版块、元素、区块、文章、重定向和设置的完整 REST 接入面
- [AppHelper](../shared-libraries/app-helper) —— 提供渲染器、注册表、分割线组件和全站小组件的 npm 包
- [MCP 服务器](../api/mcp) —— 包括 `describe_page_builder` 这一指南工具
- [页面编辑器（面向终端用户）](/docs/b1-admin/website/page-editor) —— 面向工作人员的编辑器文档
