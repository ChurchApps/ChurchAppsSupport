---
title: "内容端点"
---

# 内容端点

<div class="article-intro">

内容模块管理网站页面、部分、元素、块、博客文章、重定向、讲道、播放列表、流服务、事件、策展日历、文件、库、圣经翻译和经文查询。它是 API 中最大的模块，支持 CMS、媒体/流、敬拜规划和所有 ChurchApps 应用程序中的圣经功能。

</div>

**基本路径：** `/content`

## 页面

基本路径：`/content/pages`

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Public | — | 按 URL 或 ID 加载完整页面树（部分、元素、块）。按 URL 获取时删除内部 ID。URL-based fetches 强制 `pages.visibility` -- 受控页面返回 `{ restricted: true, visibility }`，除非（可选）JWT 满足网关 |
| GET | `/public/:churchId` | Public | — | 列出公开页面（`url`、`title`、`metaDescription`）；仅 `visibility = everyone` |
| GET | `/:id` | JWT | — | 按 ID 获取页面 |
| GET | `/` | JWT | — | 列出教会的所有页面 |
| POST | `/duplicate/:id` | JWT | Content.Edit | 使用所有部分和元素复制页面 |
| POST | `/temp/ai` | JWT | Content.Edit | 保存 AI 生成的页面（在一次调用中保存页面、部分和元素） |
| POST | `/` | JWT | Content.Edit | 创建或更新页面（批处理） |
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

## 部分

基本路径：`/content/sections`

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取部分 |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | 复制部分或将其转换为可重用块 |
| POST | `/` | JWT | Content.Edit | 创建或更新部分（批处理）。自动更新排序顺序 |
| DELETE | `/:id` | JWT | Content.Edit | 删除部分（自动更新排序顺序） |

## 元素

基本路径：`/content/elements`

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取元素 |
| POST | `/duplicate/:id` | JWT | Content.Edit | 使用所有子元素复制元素 |
| POST | `/` | JWT | Content.Edit | 创建或更新元素（批处理）。自动管理行列和轮播幻灯片 |
| DELETE | `/:id` | JWT | Content.Edit | 删除元素 |

## 块

基本路径：`/content/blocks`

扩展标准 CRUD（GET `/:id`、GET `/`、POST `/`、DELETE `/:id` 来自具有 Content.Edit 权限的基类以进行写入）。

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取块 |
| GET | `/` | JWT | — | 列出所有块 |
| GET | `/:churchId/tree/:id` | Public | — | 使用部分和元素加载完整块树 |
| GET | `/blockType/:blockType` | JWT | — | 按类型加载块（例如 footerBlock、elementBlock） |
| GET | `/public/footer/:churchId` | Public | — | 为教会加载页脚块树 |
| POST | `/` | JWT | Content.Edit | 创建或更新块 |
| DELETE | `/:id` | JWT | Content.Edit | 删除块 |

## 链接

基本路径：`/content/links`

扩展标准 CRUD（GET `/:id`、GET `/`、POST `/`、DELETE `/:id` 来自具有 Content.Edit 权限的基类以进行写入）。

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取链接 |
| GET | `/` | JWT | — | 列出所有链接。可选 `?category=` 筛选。保存后自动排序 |
| GET | `/church/:churchId/filtered?category=` | JWT | — | 加载按可见性过滤的链接（所有人、访客、成员、工作人员、小组） |
| GET | `/church/:churchId?category=` | Public | — | 按类别为教会加载链接（公开） |
| POST | `/` | JWT | Content.Edit | 创建或更新链接（批处理）。按类别自动排序 |
| DELETE | `/:id` | JWT | Content.Edit | 删除链接 |

## 全局样式

基本路径：`/content/globalStyles`

扩展标准 CRUD（POST `/`、DELETE `/:id` 来自具有 Content.Edit 权限的基类以进行写入）。

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | Public | — | 为教会加载全局样式（如果未设置则返回默认值） |
| GET | `/` | JWT | — | 为认证的教会加载全局样式 |
| POST | `/` | JWT | Content.Edit | 创建或更新全局样式 |
| DELETE | `/:id` | JWT | Content.Edit | 删除全局样式 |

## 页面历史

基本路径：`/content/pageHistory`

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | 列出页面的历史条目 |
| GET | `/block/:blockId` | JWT | Content.Edit | 列出块的历史条目 |
| GET | `/:id` | JWT | Content.Edit | 按 ID 获取历史条目 |
| POST | `/` | JWT | Content.Edit | 保存页面/块快照。定期清除超过 30 天的条目 |
| POST | `/restore/:id` | JWT | Content.Edit | 从历史快照恢复页面/块（删除当前内容并从快照重新创建） |
| POST | `/restoreSnapshot` | JWT | Content.Edit | 从内联快照对象恢复。正文：`{ pageId, blockId, snapshot }` |

## 文章（博客）

基本路径：`/content/posts`

博客文章是常规页面上的元数据：每篇文章的 `pageId` 引用包含正文的页面，文章行添加 `title`、`slug`（每教会唯一）、`excerpt`、`authorId`、`photoUrl`、`publishDate`、`category` 和 `tags`。一旦 `publishDate` 设置并在过去，文章就发布。请参见[网站构建器架构](../../architecture/website-builder#博客文章超过页面)。

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Public | — | 列出已发布文章、分页（每页最多 50） |
| GET | `/public/:churchId/slug/:slug` | Public | — | 按 slug 获取已发布文章的元数据 |
| GET | `/rss/:churchId?siteUrl=` | Public | — | RSS 2.0 feed of published posts（链接构建为 `{siteUrl}/blog/{slug}`） |
| GET | `/:id` | JWT | — | 按 ID 获取文章 |
| GET | `/` | JWT | — | 列出教会的所有文章 |
| POST | `/` | JWT | Content.Edit | 创建或更新文章（批处理） |
| DELETE | `/:id` | JWT | Content.Edit | 删除文章 |

## 重定向

基本路径：`/content/redirects`

每教会 URL 重定向（`fromPath` → `toPath`），每教会限制 200 个。路径被标准化（小写、前导斜杠、无尾部斜杠），`fromPath` 每教会唯一。B1App 在会在 404s 上解析这些并发出 HTTP 308。

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?path=` | Public | — | 解析路径（或在省略 `path` 时列出所有重定向） |
| GET | `/:id` | JWT | — | 按 ID 获取重定向 |
| GET | `/` | JWT | — | 列出教会的所有重定向 |
| POST | `/` | JWT | Content.Edit | 创建或更新重定向。拒绝 `fromPath = toPath` 并强制 200 行上限 |
| DELETE | `/:id` | JWT | Content.Edit | 删除重定向 |

## 讲道

基本路径：`/content/sermons`

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | 获取示例 FreeShow 播放列表结构 |
| GET | `/public/tvWrapper/:churchId` | JWT | — | 使用讲道、课程和 FreeShow 源获取电视应用包装器 |
| GET | `/public/tvFeed/:churchId/:sermonId` | Public | — | 获取单个讲道作为电视 feed 播放列表 |
| GET | `/public/tvFeed/:churchId` | Public | — | 获取所有公开播放列表/讲道作为电视 feed |
| GET | `/public/:churchId` | Public | — | 列出教会的所有公开讲道 |
| GET | `/timeline?sermonIds=` | JWT | — | 为讲道加载时间线数据 |
| GET | `/lookup?videoType=&videoData=` | Public | — | 从 YouTube 或 Vimeo 查询讲道元数据 |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | 从讲道字幕生成 AI 社交媒体文章建议 |
| GET | `/outline?url=&title=&author=` | JWT | — | 从 URL 生成 AI 课程大纲 |
| GET | `/youtubeImport/:channelId` | JWT | — | 从 YouTube 频道导入视频 |
| GET | `/vimeoImport/:channelId` | JWT | — | 从 Vimeo 频道导入视频 |
| GET | `/:id` | JWT | — | 按 ID 获取讲道 |
| GET | `/` | JWT | — | 列出所有讲道 |
| POST | `/` | JWT | StreamingServices.Edit | 创建或更新讲道（批处理、支持 base64 缩略图上传） |
| DELETE | `/:id` | JWT | StreamingServices.Edit | 删除讲道 |

### 示例：查询 YouTube 讲道

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

基本路径：`/content/playlists`

扩展标准 CRUD（GET `/:id`、GET `/`、DELETE `/:id` 来自具有 StreamingServices.Edit 权限的基类以进行写入）。

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取播放列表 |
| GET | `/` | JWT | — | 列出所有播放列表 |
| GET | `/public/:churchId` | Public | — | 列出教会的所有公开播放列表 |
| POST | `/` | JWT | StreamingServices.Edit | 创建或更新播放列表（批处理、支持 base64 缩略图上传） |
| DELETE | `/:id` | JWT | StreamingServices.Edit | 删除播放列表 |

## 流服务

基本路径：`/content/streamingServices`

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | 获取加密的主机聊天室 ID |
| GET | `/` | JWT | — | 列出所有流服务。自动清除过期非重复服务并推进重复的 |
| POST | `/` | JWT | StreamingServices.Edit | 创建或更新流服务（批处理） |
| DELETE | `/:id` | JWT | StreamingServices.Edit | 删除流服务（也清除阻止的 IP） |

## 事件

基本路径：`/content/events`

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | 为小组加载时间线事件 |
| GET | `/timeline?eventIds=` | JWT | — | 为当前用户的小组加载时间线事件 |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Public | — | 将事件订阅为 ICS 日历 feed |
| GET | `/group/:groupId` | JWT | — | 获取小组的事件（包括异常日期） |
| GET | `/public/group/:churchId/:groupId` | Public | — | 获取小组的公开事件 |
| GET | `/:id` | JWT | — | 按 ID 获取事件 |
| POST | `/` | JWT | — | 创建或更新事件（批处理） |
| DELETE | `/:id` | JWT | Content.Edit | 删除事件 |

## 事件异常

基本路径：`/content/eventExceptions`

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取事件异常 |
| POST | `/` | JWT | Content.Edit | 创建或更新事件异常（批处理） |
| DELETE | `/:id` | JWT | Content.Edit | 删除事件异常 |

## 策展日历

基本路径：`/content/curatedCalendars`

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取策展日历 |
| GET | `/` | JWT | — | 列出所有策展日历 |
| POST | `/` | JWT | Content.Edit | 创建或更新策展日历（批处理） |
| DELETE | `/:id` | JWT | Content.Edit | 删除策展日历 |

## 策展事件

基本路径：`/content/curatedEvents`

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | 获取日历的策展事件（包括事件详细信息和异常日期，除非设置了 `?withoutEvents`） |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Public | — | 获取日历的公开策展事件 |
| GET | `/:id` | JWT | — | 按 ID 获取策展事件 |
| GET | `/` | JWT | — | 列出所有策展事件 |
| POST | `/` | JWT | Content.Edit | 创建或更新策展事件。支持 `eventIds` 数组以添加特定小组事件 |
| DELETE | `/:id` | JWT | Content.Edit | 删除策展事件 |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | 从策展日历中删除特定事件 |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | 从策展日历中删除小组的所有事件 |

## 文件

基本路径：`/content/files`

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | 按内容类型和内容 ID 获取文件 |
| GET | `/` | JWT | — | 列出教会网站的所有文件 |
| GET | `/:id` | JWT | — | 按 ID 获取文件 |
| POST | `/` | JWT | Content.Edit* | 上传文件（base64）。*如果用户是匹配 `contentId` 的小组成员，也允许 |
| POST | `/postUrl` | JWT | Content.Edit* | 获取预签名的 S3 上传 URL。*也允许小组成员。每个内容项最多 100MB |
| DELETE | `/:id` | JWT | Content.Edit* | 删除文件并从存储中删除。*也允许小组成员 |

## 库

基本路径：`/content/gallery`

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | Public | — | 列出文件夹中的库照片 |
| GET | `/:folder` | JWT | Content.Edit | 列出文件夹中的库图像 |
| POST | `/requestUpload` | JWT | Content.Edit | 获取库图像的预签名 S3 上传 URL |
| DELETE | `/:folder/:image` | JWT | Content.Edit | 删除库图像 |

## 圣经

基本路径：`/content/bibles`

所有圣经端点都是公开的（无需认证）。数据从外部源获取并在本地缓存。

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | Public | — | 列出所有圣经翻译（如果缓存为空，则从源获取） |
| GET | `/stats?startDate=&endDate=` | Public | — | 获取日期范围内的圣经查询统计 |
| GET | `/availableTranslations/:source` | Public | — | 列出来自源的可用翻译（例如 api.bible） |
| GET | `/updateTranslations` | Public | — | 从所有源同步所有翻译 |
| GET | `/updateTranslations/:source` | Public | — | 从特定源同步翻译 |
| GET | `/updateCopyrights` | Public | — | 为缺少版权信息的翻译更新版权信息 |
| GET | `/:translationKey/updateCopyright` | Public | — | 更新特定翻译的版权 |
| GET | `/:translationKey/search?query=&limit=` | Public | — | 在翻译中搜索经文 |
| GET | `/:translationKey/books` | Public | — | 获取翻译的书籍（在本地缓存） |
| GET | `/:translationKey/:bookKey/chapters` | Public | — | 获取书籍的章节（在本地缓存） |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Public | — | 获取章节的经文（在本地缓存） |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Public | — | 获取范围的经文文本。日志查询。某些翻译出于许可跳过缓存 |

### 示例：获取经文文本

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

基本路径：`/content/songs`

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | 按查询搜索歌曲 |
| GET | `/:id` | JWT | — | 按 ID 获取歌曲 |
| GET | `/` | JWT | Content.Edit | 列出所有歌曲 |
| POST | `/` | JWT | Content.Edit | 创建或更新歌曲（批处理） |
| POST | `/import` | JWT | — | 从 FreeShow 导入歌曲（批处理） |
| DELETE | `/:id` | JWT | Content.Edit | 删除歌曲 |

## 歌曲详细信息

基本路径：`/content/songDetails`

歌曲详细信息是全球性的（不是教会范围）。这些代表跨教会共享的规范歌曲元数据。

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取歌曲详细信息（全球） |
| GET | `/` | JWT | — | 列出教会的歌曲详细信息 |
| POST | `/create` | JWT | — | 从 PraiseCharts ID 创建歌曲详细信息（如果已创建则返回现有）。自动从 PraiseCharts 和 MusicBrainz 获取元数据 |
| POST | `/` | JWT | — | 创建或更新歌曲详细信息（批处理） |

## 歌曲详细信息链接

基本路径：`/content/songDetailLinks`

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取歌曲详细信息链接 |
| GET | `/songDetail/:songDetailId` | JWT | — | 获取歌曲详细信息的所有链接 |
| POST | `/` | JWT | — | 创建或更新歌曲详细信息链接（批处理）。如果已链接，自动获取 MusicBrainz 数据 |
| DELETE | `/:id` | JWT | — | 删除歌曲详细信息链接 |

## 编排

基本路径：`/content/arrangements`

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取编排 |
| GET | `/song/:songId` | JWT | Content.Edit | 获取歌曲的编排 |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | 获取歌曲详细信息的编排 |
| GET | `/` | JWT | Content.Edit | 列出所有编排 |
| POST | `/` | JWT | Content.Edit | 创建或更新编排（批处理） |
| POST | `/freeShow/missing` | JWT | — | 查找教会中不存在的 FreeShow ID。正文：`{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | 删除编排（也删除键；如果没有编排保留，则删除歌曲） |

## 编排键

基本路径：`/content/arrangementKeys`

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | Public | — | 获取编排键及完整歌曲数据用于演示者视图 |
| GET | `/:id` | JWT | — | 按 ID 获取编排键 |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | 获取编排的键 |
| GET | `/` | JWT | Content.Edit | 列出所有编排键 |
| POST | `/` | JWT | Content.Edit | 创建或更新编排键（批处理） |
| DELETE | `/:id` | JWT | Content.Edit | 删除编排键 |

## 设置

基本路径：`/content/settings`

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | 获取当前用户的设置 |
| GET | `/` | JWT | Settings.Edit | 获取教会的所有设置 |
| GET | `/public/:churchId` | Public | — | 获取教会的公开设置（作为键值对返回） |
| POST | `/my` | JWT | — | 保存用户级设置（支持 base64 图像上传） |
| POST | `/` | JWT | Settings.Edit | 保存教会级设置（支持 base64 图像上传） |
| DELETE | `/my/:id` | JWT | — | 删除用户设置 |

## 预览

基本路径：`/content/preview`

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | Public | — | 按子域键为教会加载流预览数据（选项卡、链接、服务、讲道） |

## 库（库照片）

基本路径：`/content/stock`

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| POST | `/search` | Public | — | 搜索 Pexels 库照片。正文：`{ term: "church" }` |

## PraiseCharts

基本路径：`/content/praiseCharts`

与 PraiseCharts 集成，用于敬拜歌曲发现和乐谱下载。

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | 获取歌曲的原始 PraiseCharts 数据 |
| GET | `/hasAccount` | JWT | — | 检查用户是否有已链接的 PraiseCharts 账户 |
| GET | `/search?q=` | JWT | — | 搜索 PraiseCharts 目录 |
| GET | `/products/:id?keys=` | JWT | — | 获取歌曲的产品（如果经过身份验证则从库，否则从目录） |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | 从库获取原始编排数据 |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | 从 PraiseCharts 下载文件（PDF 或 ZIP）。返回 `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Public | — | 获取 PraiseCharts OAuth 授权 URL |
| GET | `/access?verifier=&token=&secret=` | JWT | — | 交换 OAuth 验证器获取访问令牌并保存到用户设置 |
| GET | `/library` | JWT | — | 浏览用户的 PraiseCharts 库 |

## 支持

基本路径：`/content/support`

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | Public | — | 使用 AWS Polly 将 SSML 转换为 MP3 音频。正文：`{ ssml: "<speak>...</speak>" }` |

## 相关页面

- [网站构建器架构](../../architecture/website-builder) -- 页面、部分、元素、文章和重定向如何跨应用程序配合
- [成员端点](./membership) -- 人员、教会、小组、角色、权限
- [出勤端点](./attendance) -- 服务和访问跟踪
- [验证和权限](./authentication) -- 登录流、JWT、权限模型
- [模块结构](../module-structure) -- 代码组织模式
