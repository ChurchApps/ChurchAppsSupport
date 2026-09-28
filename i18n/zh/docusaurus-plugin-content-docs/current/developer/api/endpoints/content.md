---
title: "内容端点"
---

# 内容端点

<div class="article-intro">

内容模块管理网站页面、部分、元素、块、博客文章、重定向、讲道、播放列表、流媒体服务、事件、策展日历、文件、库、圣经翻译和经文查找、歌曲、编排、全局样式、库存照片和设置。它是 API 中最大的模块，为所有 ChurchApps 应用程序提供 CMS、媒体/流媒体、敬拜规划和圣经功能。

</div>

**基本路径:** `/content`

## 页面

基本路径: `/content/pages`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | 公开 | — | 按 URL 或 ID 加载完整页面树（部分、元素、块）。通过 URL 获取时去除内部 ID。基于 URL 的获取强制使用 `pages.visibility` — 受限页面返回 `{ restricted: true, visibility }`，除非 (optional) JWT 满足要求 |
| GET | `/public/:churchId` | 公开 | — | 列出公开页面（`url`、`title`、`metaDescription`）；仅限 `visibility = everyone` |
| GET | `/:id` | JWT | — | 按 ID 获取页面 |
| GET | `/` | JWT | — | 列出教会的所有页面 |
| POST | `/duplicate/:id` | JWT | Content.Edit | 复制页面及其所有部分和元素 |
| POST | `/temp/ai` | JWT | Content.Edit | 保存 AI 生成的页面（一次调用中的页面、部分和元素） |
| POST | `/importTree` | JWT | Content.Edit | 从嵌套树创建页面（`title`、`url`、`sections[].elements[]…`）。始终在调用者的教会下插入；体内的 id 被忽略。行必须包括其 `column` 子项。最多 30 个部分/500 个元素 |
| POST | `/` | JWT | Content.Edit | 创建或更新页面 (batch) |
| DELETE | `/:id` | JWT | Content.Edit | 删除页面 |

### 示例: 加载页面树

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

## 部分

基本路径: `/content/sections`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取部分 |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | 复制部分或将其转换为可重用块 |
| POST | `/` | JWT | Content.Edit | 创建或更新部分 (batch)。自动更新排序顺序 |
| DELETE | `/:id` | JWT | Content.Edit | 删除部分（自动更新排序顺序） |

## 元素

基本路径: `/content/elements`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取元素 |
| POST | `/duplicate/:id` | JWT | Content.Edit | 复制元素及其所有子项 |
| POST | `/` | JWT | Content.Edit | 创建或更新元素 (batch)。自动管理行列和轮播幻灯片 |
| DELETE | `/:id` | JWT | Content.Edit | 删除元素 |

## 块

基本路径: `/content/blocks`

扩展标准 CRUD（从具有 Content.Edit 权限的基类中获取 `/:id`、GET `/`、POST `/`、DELETE `/:id`）。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取块 |
| GET | `/` | JWT | — | 列出所有块 |
| GET | `/:churchId/tree/:id` | 公开 | — | 加载包含部分和元素的完整块树 |
| GET | `/blockType/:blockType` | JWT | — | 按类型加载块（例如 footerBlock、elementBlock） |
| GET | `/public/footer/:churchId` | 公开 | — | 为教会加载页脚块树 |
| POST | `/` | JWT | Content.Edit | 创建或更新块 |
| DELETE | `/:id` | JWT | Content.Edit | 删除块 |

## 链接

基本路径: `/content/links`

扩展标准 CRUD（从具有 Content.Edit 权限的基类中获取 `/:id`、GET `/`、POST `/`、DELETE `/:id`）。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取链接 |
| GET | `/` | JWT | — | 列出所有链接。可选的 `?category=` 过滤。保存后自动排序 |
| GET | `/church/:churchId/filtered?category=` | JWT | — | 按可见性加载链接过滤（所有人、访客、成员、员工、团队） |
| GET | `/church/:churchId?category=` | 公开 | — | 按类别为教会加载链接（公开） |
| POST | `/` | JWT | Content.Edit | 创建或更新链接 (batch)。按类别自动排序 |
| DELETE | `/:id` | JWT | Content.Edit | 删除链接 |

## 全局样式

基本路径: `/content/globalStyles`

扩展标准 CRUD（从具有 Content.Edit 权限的基类中发送 `/`、DELETE `/:id`）。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | 公开 | — | 为教会加载全局样式（如果未设置，返回默认值） |
| GET | `/` | JWT | — | 为经过身份验证的教会加载全局样式 |
| POST | `/` | JWT | Content.Edit | 创建或更新全局样式 |
| DELETE | `/:id` | JWT | Content.Edit | 删除全局样式 |

## 页面历史

基本路径: `/content/pageHistory`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | 列出页面的历史记录条目 |
| GET | `/block/:blockId` | JWT | Content.Edit | 列出块的历史记录条目 |
| GET | `/:id` | JWT | Content.Edit | 按 ID 获取历史记录条目 |
| POST | `/` | JWT | Content.Edit | 保存页面/块快照。定期清理超过 30 天的条目 |
| POST | `/restore/:id` | JWT | Content.Edit | 从历史快照还原页面/块（删除当前内容并从快照重新创建） |
| POST | `/restoreSnapshot` | JWT | Content.Edit | 从内联快照对象还原。Body: `{ pageId, blockId, snapshot }` |

## 文章 (博客)

基本路径: `/content/posts`

博客文章是独立行：`title`、`slug`（每个教会唯一）、`excerpt`、`content`（markdown 正文）、`authorId`、`photoUrl`、`publishDate`、`category` 和 `tags`。一旦设置 `publishDate` 且在过去，文章就会发布。读取端点用从 `authorId` 解析的 `authorName` 丰富每个文章。参见 [Website Builder Architecture](../../architecture/website-builder#blog)。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | 公开 | — | 列出已发布的文章，分页（每页最多 50 个） |
| GET | `/public/:churchId/categories` | 公开 | — | 已发布文章中的不同类别 |
| GET | `/public/:churchId/slug/:slug` | 公开 | — | 按 slug 获取已发布的文章 |
| GET | `/rss/:churchId?siteUrl=` | 公开 | — | 已发布文章的 RSS 2.0 feed（链接构建为 `{siteUrl}/blog/{slug}`） |
| GET | `/:id` | JWT | — | 按 ID 获取文章 |
| GET | `/` | JWT | — | 列出教会的所有文章 |
| POST | `/` | JWT | Content.Edit | 创建或更新文章 (batch) |
| DELETE | `/:id` | JWT | Content.Edit | 删除文章 |

## 重定向

基本路径: `/content/redirects`

每个教会 URL 重定向（`fromPath` → `toPath`），每个教会限 200 个。路径规范化（小写、前导斜杠、无尾随斜杠）且 `fromPath` 在教会中唯一。B1App 在会发生 404 时解析这些并发出 HTTP 308。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?path=` | 公开 | — | 解析路径（或在省略 `path` 时列出所有重定向） |
| GET | `/:id` | JWT | — | 按 ID 获取重定向 |
| GET | `/` | JWT | — | 列出教会的所有重定向 |
| POST | `/` | JWT | Content.Edit | 创建或更新重定向。拒绝 `fromPath = toPath` 并强制执行 200 行上限 |
| DELETE | `/:id` | JWT | Content.Edit | 删除重定向 |

## 讲道

基本路径: `/content/sermons`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | 获取 FreeShow 播放列表结构示例 |
| GET | `/public/tvWrapper/:churchId` | JWT | — | 获取包含讲道、课程和 FreeShow 来源的 TV 应用包装器 |
| GET | `/public/tvFeed/:churchId/:sermonId` | 公开 | — | 获取单个讲道作为 TV feed 播放列表 |
| GET | `/public/tvFeed/:churchId` | 公开 | — | 获取所有公开播放列表/讲道作为 TV feed |
| GET | `/public/:churchId` | 公开 | — | 列出教会的所有公开讲道 |
| GET | `/timeline?sermonIds=` | JWT | — | 加载讲道的时间线数据 |
| GET | `/lookup?videoType=&videoData=` | 公开 | — | 从 YouTube 或 Vimeo 查询讲道元数据 |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | 从讲道字幕生成 AI 社交媒体文章建议 |
| GET | `/outline?url=&title=&author=` | JWT | — | 从 URL 生成 AI 课程大纲 |
| GET | `/youtubeImport/:channelId` | JWT | — | 从 YouTube 频道导入视频 |
| GET | `/vimeoImport/:channelId` | JWT | — | 从 Vimeo 频道导入视频 |
| GET | `/:id` | JWT | — | 按 ID 获取讲道 |
| GET | `/` | JWT | — | 列出所有讲道 |
| POST | `/` | JWT | StreamingServices.Edit | 创建或更新讲道 (batch，支持 base64 缩略图上传) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | 删除讲道 |

### 示例: 查询 YouTube 讲道

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

基本路径: `/content/playlists`

扩展标准 CRUD（从具有 StreamingServices.Edit 权限的基类中获取 `/:id`、GET `/`、DELETE `/:id`）。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取播放列表 |
| GET | `/` | JWT | — | 列出所有播放列表 |
| GET | `/public/:churchId` | 公开 | — | 列出教会的所有公开播放列表 |
| POST | `/` | JWT | StreamingServices.Edit | 创建或更新播放列表 (batch，支持 base64 缩略图上传) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | 删除播放列表 |

## 流媒体服务

基本路径: `/content/streamingServices`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | 获取服务的加密主机聊天室 ID |
| GET | `/` | JWT | — | 列出所有流媒体服务。自动清理过期的非循环服务并推进循环服务 |
| POST | `/` | JWT | StreamingServices.Edit | 创建或更新流媒体服务 (batch) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | 删除流媒体服务（也清除被阻止的 IP） |

## 事件

基本路径: `/content/events`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | 为团队加载时间线事件 |
| GET | `/timeline?eventIds=` | JWT | — | 加载当前用户团队的时间线事件 |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | 公开 | — | 订阅事件作为 ICS 日历 feed |
| GET | `/group/:groupId` | JWT | — | 获取团队的事件（包括例外日期） |
| GET | `/public/group/:churchId/:groupId` | 公开 | — | 获取团队的公开事件 |
| GET | `/:id` | JWT | — | 按 ID 获取事件 |
| POST | `/` | JWT | — | 创建或更新事件 (batch) |
| DELETE | `/:id` | JWT | Content.Edit | 删除事件 |

## 事件例外

基本路径: `/content/eventExceptions`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取事件例外 |
| POST | `/` | JWT | Content.Edit | 创建或更新事件例外 (batch) |
| DELETE | `/:id` | JWT | Content.Edit | 删除事件例外 |

## 策展日历

基本路径: `/content/curatedCalendars`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取策展日历 |
| GET | `/` | JWT | — | 列出所有策展日历 |
| POST | `/` | JWT | Content.Edit | 创建或更新策展日历 (batch) |
| DELETE | `/:id` | JWT | Content.Edit | 删除策展日历 |

## 策展事件

基本路径: `/content/curatedEvents`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | 获取日历的策展事件（包括事件详情和例外日期，除非设置了 `?withoutEvents`） |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | 公开 | — | 获取日历的公开策展事件 |
| GET | `/:id` | JWT | — | 按 ID 获取策展事件 |
| GET | `/` | JWT | — | 列出所有策展事件 |
| POST | `/` | JWT | Content.Edit | 创建或更新策展事件。支持 `eventIds` 数组添加特定团队事件 |
| DELETE | `/:id` | JWT | Content.Edit | 删除策展事件 |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | 从策展日历中删除特定事件 |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | 从策展日历中删除团队的所有事件 |

## 文件

基本路径: `/content/files`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | 按内容类型和内容 ID 获取文件 |
| GET | `/` | JWT | — | 列出教会网站的所有文件 |
| GET | `/:id` | JWT | — | 按 ID 获取文件 |
| POST | `/` | JWT | Content.Edit* | 上传文件 (base64)。*如果用户是与 `contentId` 匹配的团队成员，也允许 |
| POST | `/postUrl` | JWT | Content.Edit* | 获取预签名的 S3 上传 URL。*也允许团队成员。每个内容项最多 100MB |
| DELETE | `/:id` | JWT | Content.Edit* | 删除文件并从存储中移除。*也允许团队成员 |

## 库

基本路径: `/content/gallery`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | 公开 | — | 列出文件夹中的库存照片 |
| GET | `/:folder` | JWT | Content.Edit | 列出文件夹中的库图像 |
| POST | `/requestUpload` | JWT | Content.Edit | 获取库图像的预签名 S3 上传 URL |
| DELETE | `/:folder/:image` | JWT | Content.Edit | 删除库图像 |

## 圣经

基本路径: `/content/bibles`

所有圣经端点都是公开的（无需身份验证）。数据是从外部来源获取并在本地缓存的。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | 公开 | — | 列出所有圣经译本（如果缓存为空，从源获取） |
| GET | `/stats?startDate=&endDate=` | 公开 | — | 获取日期范围内的圣经查询统计信息 |
| GET | `/availableTranslations/:source` | 公开 | — | 列出来源的可用译本（例如 api.bible） |
| GET | `/updateTranslations` | 公开 | — | 从所有来源同步所有译本 |
| GET | `/updateTranslations/:source` | 公开 | — | 从特定来源同步译本 |
| GET | `/updateCopyrights` | 公开 | — | 更新缺少它的译本的版权信息 |
| GET | `/:translationKey/updateCopyright` | 公开 | — | 更新特定译本的版权 |
| GET | `/:translationKey/search?query=&limit=` | 公开 | — | 在译本中搜索经文 |
| GET | `/:translationKey/books` | 公开 | — | 获取译本的书籍（本地缓存） |
| GET | `/:translationKey/:bookKey/chapters` | 公开 | — | 获取书籍的章节（本地缓存） |
| GET | `/:translationKey/chapters/:chapterKey/verses` | 公开 | — | 获取章节的经文（本地缓存） |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | 公开 | — | 获取范围内的经文文本。记录查询。某些译本绕过缓存以获得许可 |

### 示例: 获取经文文本

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

## 歌曲

基本路径: `/content/songs`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | 按查询搜索歌曲 |
| GET | `/:id` | JWT | — | 按 ID 获取歌曲 |
| GET | `/` | JWT | Content.Edit | 列出所有歌曲 |
| POST | `/` | JWT | Content.Edit | 创建或更新歌曲 (batch) |
| POST | `/import` | JWT | — | 从 FreeShow 导入歌曲 (batch) |
| DELETE | `/:id` | JWT | Content.Edit | 删除歌曲 |

## 歌曲详情

基本路径: `/content/songDetails`

歌曲详情是全局的（不受教会限制）。这些代表在教会之间共享的规范歌曲元数据。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取歌曲详情（全局） |
| GET | `/` | JWT | — | 列出教会的歌曲详情 |
| POST | `/create` | JWT | — | 从 PraiseCharts ID 创建歌曲详情（如果已创建则返回现有）。自动从 PraiseCharts 和 MusicBrainz 获取元数据 |
| POST | `/` | JWT | — | 创建或更新歌曲详情 (batch) |

## 歌曲详情链接

基本路径: `/content/songDetailLinks`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取歌曲详情链接 |
| GET | `/songDetail/:songDetailId` | JWT | — | 获取歌曲详情的所有链接 |
| POST | `/` | JWT | — | 创建或更新歌曲详情链接 (batch)。如果链接则自动获取 MusicBrainz 数据 |
| DELETE | `/:id` | JWT | — | 删除歌曲详情链接 |

## 编排

基本路径: `/content/arrangements`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取编排 |
| GET | `/song/:songId` | JWT | Content.Edit | 获取歌曲的编排 |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | 获取歌曲详情的编排 |
| GET | `/` | JWT | Content.Edit | 列出所有编排 |
| POST | `/` | JWT | Content.Edit | 创建或更新编排 (batch) |
| POST | `/freeShow/missing` | JWT | — | 查找教会中不存在的 FreeShow ID。Body: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | 删除编排（也删除键；如果不存在编排则删除歌曲） |

## 编排键

基本路径: `/content/arrangementKeys`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | 公开 | — | 获取编排键及完整歌曲数据以供演讲者查看 |
| GET | `/:id` | JWT | — | 按 ID 获取编排键 |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | 获取编排的键 |
| GET | `/` | JWT | Content.Edit | 列出所有编排键 |
| POST | `/` | JWT | Content.Edit | 创建或更新编排键 (batch) |
| DELETE | `/:id` | JWT | Content.Edit | 删除编排键 |

## 设置

基本路径: `/content/settings`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | 获取当前用户的设置 |
| GET | `/` | JWT | Settings.Edit | 获取教会的所有设置 |
| GET | `/public/:churchId` | 公开 | — | 获取教会的公开设置（以键值对返回） |
| POST | `/my` | JWT | — | 保存用户级别设置（支持 base64 图像上传） |
| POST | `/` | JWT | Settings.Edit | 保存教会级别设置（支持 base64 图像上传） |
| DELETE | `/my/:id` | JWT | — | 删除用户设置 |

## 预览

基本路径: `/content/preview`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | 公开 | — | 按子域键为教会加载流媒体预览数据（选项卡、链接、服务、讲道） |

## 库 (库存照片)

基本路径: `/content/stock`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| POST | `/search` | 公开 | — | 搜索 Pexels 库存照片。Body: `{ term: "church" }` |

## PraiseCharts

基本路径: `/content/praiseCharts`

与 PraiseCharts 集成以发现敬拜歌曲和下载乐谱。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | 获取歌曲的原始 PraiseCharts 数据 |
| GET | `/hasAccount` | JWT | — | 检查用户是否有关联的 PraiseCharts 账户 |
| GET | `/search?q=` | JWT | — | 搜索 PraiseCharts 目录 |
| GET | `/products/:id?keys=` | JWT | — | 获取歌曲的产品（如果经过身份验证则从库，否则从目录） |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | 从库获取原始编排数据 |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | 从 PraiseCharts 下载文件（PDF 或 ZIP）。返回 `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | 公开 | — | 获取 PraiseCharts 的 OAuth 授权 URL |
| GET | `/access?verifier=&token=&secret=` | JWT | — | 交换 OAuth 验证程序以获取访问令牌并保存到用户设置 |
| GET | `/library` | JWT | — | 浏览用户的 PraiseCharts 库 |

## 支持

基本路径: `/content/support`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | 公开 | — | 使用 AWS Polly 将 SSML 转换为 MP3 音频。Body: `{ ssml: "<speak>...</speak>" }` |

## 相关页面

- [Website Builder Architecture](../../architecture/website-builder) -- 页面、部分、元素、文章和重定向如何跨应用程序组合
- [Membership Endpoints](./membership) -- 人员、教会、团队、角色、权限
- [Attendance Endpoints](./attendance) -- 服务和访问跟踪
- [Authentication & Permissions](./authentication) -- 登录流、JWT、权限模型
- [Module Structure](../module-structure) -- 代码组织模式
