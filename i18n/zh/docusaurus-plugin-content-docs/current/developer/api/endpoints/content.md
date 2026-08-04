---
title: "内容端点"
---

# 内容端点

<div class="article-intro">

内容模块管理网站页面、板块、元素、可复用区块、博客文章、重定向、讲道、播放列表、直播流服务、活动、精选日历、文件、图库、圣经译本与经文查询、诗歌、编排版本、全局样式、图库图片以及设置。它是 API 中规模最大的模块，为所有 ChurchApps 应用提供 CMS、媒体/直播、敬拜策划以及圣经相关功能的支持。

</div>

**基础路径：** `/content`

## 页面

基础路径：`/content/pages`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Public | — | 按 URL 或 ID 加载完整的页面树（板块、元素、区块）。按 URL 获取时会去除内部 ID。基于 URL 的获取会强制执行 `pages.visibility`——受限页面会返回 `{ restricted: true, visibility }`，除非（可选的）JWT 满足权限门槛 |
| GET | `/public/:churchId` | Public | — | 列出公开页面（`url`、`title`、`metaDescription`）；仅限 `visibility = everyone` 的页面 |
| GET | `/:id` | JWT | — | 按 ID 获取页面 |
| GET | `/` | JWT | — | 列出教会的所有页面 |
| POST | `/duplicate/:id` | JWT | Content.Edit | 复制页面及其所有板块和元素 |
| POST | `/temp/ai` | JWT | Content.Edit | 保存 AI 生成的页面（一次调用同时保存页面、板块和元素） |
| POST | `/` | JWT | Content.Edit | 创建或更新页面（批量） |
| DELETE | `/:id` | JWT | Content.Edit | 删除页面 |

### 示例：加载页面树

```
GET /content/pages/abc-church-id/tree?url=/about
```

```json
{
  "name": "About",
  "url": "/about",
  "sections": [
    {
      "background": "#FFFFFF",
      "textColor": "dark",
      "elements": [
        { "elementType": "textWithPhoto", "answers": { "text": "Welcome" } }
      ]
    }
  ]
}
```

## 板块

基础路径：`/content/sections`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取板块 |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | 复制板块，或将其转换为可复用区块 |
| POST | `/` | JWT | Content.Edit | 创建或更新板块（批量）。自动更新排序顺序 |
| DELETE | `/:id` | JWT | Content.Edit | 删除板块（自动更新排序顺序） |

## 元素

基础路径：`/content/elements`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取元素 |
| POST | `/duplicate/:id` | JWT | Content.Edit | 复制元素及其所有子元素 |
| POST | `/` | JWT | Content.Edit | 创建或更新元素（批量）。自动管理行列布局与轮播幻灯片 |
| DELETE | `/:id` | JWT | Content.Edit | 删除元素 |

## 可复用区块

基础路径：`/content/blocks`

继承标准 CRUD（基类提供 GET `/:id`、GET `/`、POST `/`、DELETE `/:id`，写入操作需要 Content.Edit 权限）。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取区块 |
| GET | `/` | JWT | — | 列出所有区块 |
| GET | `/:churchId/tree/:id` | Public | — | 加载包含板块和元素的完整区块树 |
| GET | `/blockType/:blockType` | JWT | — | 按类型加载区块（如 footerBlock、elementBlock） |
| GET | `/public/footer/:churchId` | Public | — | 加载某教会的页脚区块树 |
| POST | `/` | JWT | Content.Edit | 创建或更新区块 |
| DELETE | `/:id` | JWT | Content.Edit | 删除区块 |

## 链接

基础路径：`/content/links`

继承标准 CRUD（基类提供 GET `/:id`、GET `/`、POST `/`、DELETE `/:id`，写入操作需要 Content.Edit 权限）。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取链接 |
| GET | `/` | JWT | — | 列出所有链接。可选 `?category=` 筛选。保存后自动排序 |
| GET | `/church/:churchId/filtered?category=` | JWT | — | 加载按可见性（所有人、访客、会员、工作人员、小组）筛选的链接 |
| GET | `/church/:churchId?category=` | Public | — | 按分类加载某教会的链接（公开） |
| POST | `/` | JWT | Content.Edit | 创建或更新链接（批量）。按分类自动排序 |
| DELETE | `/:id` | JWT | Content.Edit | 删除链接 |

## 全局样式

基础路径：`/content/globalStyles`

继承标准 CRUD（基类提供 POST `/`、DELETE `/:id`，写入操作需要 Content.Edit 权限）。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | Public | — | 加载某教会的全局样式（未设置时返回默认值） |
| GET | `/` | JWT | — | 加载已认证教会的全局样式 |
| POST | `/` | JWT | Content.Edit | 创建或更新全局样式 |
| DELETE | `/:id` | JWT | Content.Edit | 删除全局样式 |

## 页面历史

基础路径：`/content/pageHistory`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | 列出某页面的历史条目 |
| GET | `/block/:blockId` | JWT | Content.Edit | 列出某区块的历史条目 |
| GET | `/:id` | JWT | Content.Edit | 按 ID 获取历史条目 |
| POST | `/` | JWT | Content.Edit | 保存页面/区块快照。定期清理超过 30 天的旧条目 |
| POST | `/restore/:id` | JWT | Content.Edit | 从历史快照恢复页面/区块（删除当前内容并根据快照重新创建） |
| POST | `/restoreSnapshot` | JWT | Content.Edit | 从内联快照对象恢复。请求体：`{ pageId, blockId, snapshot }` |

## 文章（博客）

基础路径：`/content/posts`

博客文章是独立的数据行：包含 `title`、`slug`（每教会唯一）、`excerpt`、`content`（Markdown 正文）、`authorId`、`photoUrl`、`publishDate`、`category` 和 `tags`。一旦设置了 `publishDate` 且该日期已过，文章即被视为已发布。读取端点会将 `authorId` 解析为 `authorName` 一并返回。请参见[网站构建器架构](../../architecture/website-builder#blog)。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Public | — | 分页列出已发布文章（每页最多 50 篇） |
| GET | `/public/:churchId/categories` | Public | — | 已发布文章中的所有不重复分类 |
| GET | `/public/:churchId/slug/:slug` | Public | — | 按 slug 获取已发布文章 |
| GET | `/rss/:churchId?siteUrl=` | Public | — | 已发布文章的 RSS 2.0 订阅源（链接构建为 `{siteUrl}/blog/{slug}`） |
| GET | `/:id` | JWT | — | 按 ID 获取文章 |
| GET | `/` | JWT | — | 列出教会的所有文章 |
| POST | `/` | JWT | Content.Edit | 创建或更新文章（批量） |
| DELETE | `/:id` | JWT | Content.Edit | 删除文章 |

## 重定向

基础路径：`/content/redirects`

按教会设置的 URL 重定向（`fromPath` → `toPath`），每个教会最多 200 条。路径会被标准化（转小写、加前导斜杠、去除尾部斜杠），且 `fromPath` 在每个教会内唯一。B1App 会在遇到潜在的 404 时解析这些重定向，并返回 HTTP 308。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?path=` | Public | — | 解析某个路径（省略 `path` 时列出所有重定向） |
| GET | `/:id` | JWT | — | 按 ID 获取重定向 |
| GET | `/` | JWT | — | 列出教会的所有重定向 |
| POST | `/` | JWT | Content.Edit | 创建或更新重定向。拒绝 `fromPath = toPath`，并强制执行 200 条上限 |
| DELETE | `/:id` | JWT | Content.Edit | 删除重定向 |

## 讲道

基础路径：`/content/sermons`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | 获取示例 FreeShow 播放列表结构 |
| GET | `/public/tvWrapper/:churchId` | JWT | — | 获取包含讲道、课程和 FreeShow 来源的电视应用包装数据 |
| GET | `/public/tvFeed/:churchId/:sermonId` | Public | — | 将单篇讲道作为电视订阅源播放列表获取 |
| GET | `/public/tvFeed/:churchId` | Public | — | 将所有公开播放列表/讲道作为电视订阅源获取 |
| GET | `/public/:churchId` | Public | — | 列出某教会的所有公开讲道 |
| GET | `/timeline?sermonIds=` | JWT | — | 加载讲道的时间线数据 |
| GET | `/lookup?videoType=&videoData=` | Public | — | 从 YouTube 或 Vimeo 查询讲道元数据 |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | 根据讲道字幕生成 AI 社交媒体推文建议 |
| GET | `/outline?url=&title=&author=` | JWT | — | 根据 URL 生成 AI 课程大纲 |
| GET | `/youtubeImport/:channelId` | JWT | — | 从 YouTube 频道导入视频 |
| GET | `/vimeoImport/:channelId` | JWT | — | 从 Vimeo 频道导入视频 |
| GET | `/:id` | JWT | — | 按 ID 获取讲道 |
| GET | `/` | JWT | — | 列出所有讲道 |
| POST | `/` | JWT | StreamingServices.Edit | 创建或更新讲道（批量，支持 base64 缩略图上传） |
| DELETE | `/:id` | JWT | StreamingServices.Edit | 删除讲道 |

### 示例：查询一条 YouTube 讲道

```
GET /content/sermons/lookup?videoType=youtube&videoData=dQw4w9WgXcQ
```

```json
{
  "title": "Sunday Service - Faith in Action",
  "description": "Pastor John speaks about faith...",
  "thumbnail": "https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg",
  "duration": 2400,
  "publishDate": "2025-01-15T10:00:00Z"
}
```

## 播放列表

基础路径：`/content/playlists`

继承标准 CRUD（基类提供 GET `/:id`、GET `/`、DELETE `/:id`，写入操作需要 StreamingServices.Edit 权限）。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取播放列表 |
| GET | `/` | JWT | — | 列出所有播放列表 |
| GET | `/public/:churchId` | Public | — | 列出某教会的所有公开播放列表 |
| POST | `/` | JWT | StreamingServices.Edit | 创建或更新播放列表（批量，支持 base64 缩略图上传） |
| DELETE | `/:id` | JWT | StreamingServices.Edit | 删除播放列表 |

## 直播流服务

基础路径：`/content/streamingServices`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | 获取某场服务的加密主持人聊天室 ID |
| GET | `/` | JWT | — | 列出所有直播流服务。自动清理已过期的非重复服务，并推进重复性服务 |
| POST | `/` | JWT | StreamingServices.Edit | 创建或更新直播流服务（批量） |
| DELETE | `/:id` | JWT | StreamingServices.Edit | 删除直播流服务（同时清除被阻止的 IP） |

## 活动

基础路径：`/content/events`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | 加载某小组的时间线活动 |
| GET | `/timeline?eventIds=` | JWT | — | 加载当前用户所属小组的时间线活动 |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Public | — | 以 ICS 日历订阅源的形式订阅活动 |
| GET | `/group/:groupId` | JWT | — | 获取某小组的活动（含例外日期） |
| GET | `/public/group/:churchId/:groupId` | Public | — | 获取某小组的公开活动 |
| GET | `/:id` | JWT | — | 按 ID 获取活动 |
| POST | `/` | JWT | — | 创建或更新活动（批量） |
| DELETE | `/:id` | JWT | Content.Edit | 删除活动 |

## 活动例外

基础路径：`/content/eventExceptions`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取活动例外 |
| POST | `/` | JWT | Content.Edit | 创建或更新活动例外（批量） |
| DELETE | `/:id` | JWT | Content.Edit | 删除活动例外 |

## 精选日历

基础路径：`/content/curatedCalendars`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取精选日历 |
| GET | `/` | JWT | — | 列出所有精选日历 |
| POST | `/` | JWT | Content.Edit | 创建或更新精选日历（批量） |
| DELETE | `/:id` | JWT | Content.Edit | 删除精选日历 |

## 精选活动

基础路径：`/content/curatedEvents`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | 获取某日历的精选活动（除非设置了 `?withoutEvents`，否则包含活动详情和例外日期） |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Public | — | 获取某日历的公开精选活动 |
| GET | `/:id` | JWT | — | 按 ID 获取精选活动 |
| GET | `/` | JWT | — | 列出所有精选活动 |
| POST | `/` | JWT | Content.Edit | 创建或更新精选活动。支持通过 `eventIds` 数组添加特定的小组活动 |
| DELETE | `/:id` | JWT | Content.Edit | 删除精选活动 |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | 从精选日历中移除某个特定活动 |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | 从精选日历中移除某小组的所有活动 |

## 文件

基础路径：`/content/files`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | 按内容类型和内容 ID 获取文件 |
| GET | `/` | JWT | — | 列出教会网站的所有文件 |
| GET | `/:id` | JWT | — | 按 ID 获取文件 |
| POST | `/` | JWT | Content.Edit* | 上传文件（base64）。*若用户是与 `contentId` 匹配的小组成员，也允许操作 |
| POST | `/postUrl` | JWT | Content.Edit* | 获取预签名的 S3 上传 URL。*同样允许小组成员操作。每个内容项最多 100MB |
| DELETE | `/:id` | JWT | Content.Edit* | 删除文件并从存储中移除。*同样允许小组成员操作 |

## 图库

基础路径：`/content/gallery`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | Public | — | 列出某文件夹中的图库图片 |
| GET | `/:folder` | JWT | Content.Edit | 列出某文件夹中的图库图片 |
| POST | `/requestUpload` | JWT | Content.Edit | 获取图库图片的预签名 S3 上传 URL |
| DELETE | `/:folder/:image` | JWT | Content.Edit | 删除图库图片 |

## 圣经

基础路径：`/content/bibles`

所有圣经相关端点均为公开端点（无需认证）。数据从外部来源获取并在本地缓存。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | Public | — | 列出所有圣经译本（若缓存为空则从来源获取） |
| GET | `/stats?startDate=&endDate=` | Public | — | 获取某日期范围内的圣经查询统计 |
| GET | `/availableTranslations/:source` | Public | — | 列出某来源（如 api.bible）可用的译本 |
| GET | `/updateTranslations` | Public | — | 从所有来源同步全部译本 |
| GET | `/updateTranslations/:source` | Public | — | 从特定来源同步译本 |
| GET | `/updateCopyrights` | Public | — | 为缺少版权信息的译本更新版权信息 |
| GET | `/:translationKey/updateCopyright` | Public | — | 更新特定译本的版权信息 |
| GET | `/:translationKey/search?query=&limit=` | Public | — | 在某译本中搜索经文 |
| GET | `/:translationKey/books` | Public | — | 获取某译本的书卷列表（在本地缓存） |
| GET | `/:translationKey/:bookKey/chapters` | Public | — | 获取某书卷的章节列表（在本地缓存） |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Public | — | 获取某章的经文列表（在本地缓存） |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Public | — | 获取某范围的经文内容。会记录查询日志。部分译本出于授权原因不使用缓存 |

### 示例：获取经文内容

```
GET /content/bibles/de4e12af7f28f599-02/verses/GEN.1.1-GEN.1.3
```

```json
[
  { "verseKey": "GEN.1.1", "content": "In the beginning God created the heavens and the earth.", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 1 },
  { "verseKey": "GEN.1.2", "content": "Now the earth was formless and empty...", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 2 },
  { "verseKey": "GEN.1.3", "content": "And God said, \"Let there be light,\" and there was light.", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 3 }
]
```

## 诗歌

基础路径：`/content/songs`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | 按关键词搜索诗歌 |
| GET | `/:id` | JWT | — | 按 ID 获取诗歌 |
| GET | `/` | JWT | Content.Edit | 列出所有诗歌 |
| POST | `/` | JWT | Content.Edit | 创建或更新诗歌（批量） |
| POST | `/import` | JWT | — | 从 FreeShow 导入诗歌（批量） |
| DELETE | `/:id` | JWT | Content.Edit | 删除诗歌 |

## 诗歌详情

基础路径：`/content/songDetails`

诗歌详情是全局性的（不限定于某个教会）。这些数据代表跨教会共享的标准诗歌元数据。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取诗歌详情（全局） |
| GET | `/` | JWT | — | 列出该教会的诗歌详情 |
| POST | `/create` | JWT | — | 从 PraiseCharts ID 创建诗歌详情（若已存在则返回现有记录）。自动从 PraiseCharts 和 MusicBrainz 获取元数据 |
| POST | `/` | JWT | — | 创建或更新诗歌详情（批量） |

## 诗歌详情链接

基础路径：`/content/songDetailLinks`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取诗歌详情链接 |
| GET | `/songDetail/:songDetailId` | JWT | — | 获取某诗歌详情的所有链接 |
| POST | `/` | JWT | — | 创建或更新诗歌详情链接（批量）。如已关联则自动获取 MusicBrainz 数据 |
| DELETE | `/:id` | JWT | — | 删除诗歌详情链接 |

## 编排版本

基础路径：`/content/arrangements`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取编排版本 |
| GET | `/song/:songId` | JWT | Content.Edit | 获取某首诗歌的编排版本 |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | 获取某诗歌详情的编排版本 |
| GET | `/` | JWT | Content.Edit | 列出所有编排版本 |
| POST | `/` | JWT | Content.Edit | 创建或更新编排版本（批量） |
| POST | `/freeShow/missing` | JWT | — | 查找该教会中不存在的 FreeShow ID。请求体：`{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | 删除编排版本（同时删除其调号；若不再有任何编排版本则同时删除该诗歌） |

## 编排调号

基础路径：`/content/arrangementKeys`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | Public | — | 获取带完整诗歌数据的编排调号，用于演示视图 |
| GET | `/:id` | JWT | — | 按 ID 获取编排调号 |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | 获取某编排版本的调号 |
| GET | `/` | JWT | Content.Edit | 列出所有编排调号 |
| POST | `/` | JWT | Content.Edit | 创建或更新编排调号（批量） |
| DELETE | `/:id` | JWT | Content.Edit | 删除编排调号 |

## 设置

基础路径：`/content/settings`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | 获取当前用户的设置 |
| GET | `/` | JWT | Settings.Edit | 获取该教会的所有设置 |
| GET | `/public/:churchId` | Public | — | 获取某教会的公开设置（以键值对形式返回） |
| POST | `/my` | JWT | — | 保存用户级设置（支持 base64 图片上传） |
| POST | `/` | JWT | Settings.Edit | 保存教会级设置（支持 base64 图片上传） |
| DELETE | `/my/:id` | JWT | — | 删除某用户设置 |

## 预览

基础路径：`/content/preview`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | Public | — | 按子域名标识为某教会加载直播预览数据（标签页、链接、礼拜、讲道） |

## 图库（图库图片）

基础路径：`/content/stock`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| POST | `/search` | Public | — | 搜索 Pexels 图库图片。请求体：`{ term: "church" }` |

## PraiseCharts

基础路径：`/content/praiseCharts`

与 PraiseCharts 的集成，用于敬拜诗歌发现和乐谱下载。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | 获取某首诗歌的原始 PraiseCharts 数据 |
| GET | `/hasAccount` | JWT | — | 检查用户是否已关联 PraiseCharts 账户 |
| GET | `/search?q=` | JWT | — | 搜索 PraiseCharts 目录 |
| GET | `/products/:id?keys=` | JWT | — | 获取某首诗歌的产品信息（若已认证则来自用户库，否则来自目录） |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | 从用户库获取原始编排版本数据 |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | 从 PraiseCharts 下载文件（PDF 或 ZIP）。返回 `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Public | — | 获取 PraiseCharts 的 OAuth 授权 URL |
| GET | `/access?verifier=&token=&secret=` | JWT | — | 用 OAuth verifier 换取访问令牌并保存到用户设置 |
| GET | `/library` | JWT | — | 浏览用户的 PraiseCharts 资源库 |

## 支持

基础路径：`/content/support`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | Public | — | 使用 AWS Polly 将 SSML 转换为 MP3 音频。请求体：`{ ssml: "<speak>...</speak>" }` |

## 相关页面

- [网站构建器架构](../../architecture/website-builder) -- 页面、板块、元素、文章和重定向如何在各应用间协同工作
- [成员管理端点](./membership) -- 人员、教会、小组、角色、权限
- [出席端点](./attendance) -- 礼拜和来访跟踪
- [认证与权限](./authentication) -- 登录流程、JWT、权限模型
- [模块结构](../module-structure) -- 代码组织模式
