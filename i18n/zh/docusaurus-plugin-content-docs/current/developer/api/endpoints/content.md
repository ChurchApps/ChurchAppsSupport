---
title: "内容端点"
---

# 内容端点

<div class="article-intro">

内容模块管理网站页面、区块、元素、块、讲道、播放列表、流媒体服务、活动、策划日历、文件、图库、圣经译本和经文查询、歌曲、编曲、全局样式、图片素材和设置。它是 API 中最大的模块，为所有 ChurchApps 应用提供 CMS、媒体/流媒体、敬拜规划和圣经功能。

</div>

**基础路径：** `/content`

## 页面

基础路径：`/content/pages`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | 公开 | — | 按 URL 或 ID 加载完整页面树（区块、元素、块）。通过 URL 获取时会剥离内部 ID |
| GET | `/:id` | JWT | — | 按 ID 获取页面 |
| GET | `/` | JWT | — | 列出教会的所有页面 |
| POST | `/duplicate/:id` | JWT | Content.Edit | 复制页面及其所有区块和元素 |
| POST | `/temp/ai` | JWT | Content.Edit | 保存 AI 生成的页面（一次调用保存页面、区块和元素） |
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

## 区块

基础路径：`/content/sections`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取区块 |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | 复制区块或将其转换为可复用块 |
| POST | `/` | JWT | Content.Edit | 创建或更新区块（批量）。自动更新排序顺序 |
| DELETE | `/:id` | JWT | Content.Edit | 删除区块（自动更新排序顺序） |

## 元素

基础路径：`/content/elements`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取元素 |
| POST | `/duplicate/:id` | JWT | Content.Edit | 复制元素及其所有子元素 |
| POST | `/` | JWT | Content.Edit | 创建或更新元素（批量）。自动管理行列和轮播幻灯片 |
| DELETE | `/:id` | JWT | Content.Edit | 删除元素 |

## 块

基础路径：`/content/blocks`

继承标准 CRUD（基类提供 GET `/:id`、GET `/`、POST `/`、DELETE `/:id`，写入需要 Content.Edit 权限）。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取块 |
| GET | `/` | JWT | — | 列出所有块 |
| GET | `/:churchId/tree/:id` | 公开 | — | 加载包含区块和元素的完整块树 |
| GET | `/blockType/:blockType` | JWT | — | 按类型加载块（如 footerBlock、elementBlock） |
| GET | `/public/footer/:churchId` | 公开 | — | 加载教会的页脚块树 |
| POST | `/` | JWT | Content.Edit | 创建或更新块 |
| DELETE | `/:id` | JWT | Content.Edit | 删除块 |

## 链接

基础路径：`/content/links`

继承标准 CRUD（基类提供 GET `/:id`、GET `/`、POST `/`、DELETE `/:id`，写入需要 Content.Edit 权限）。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取链接 |
| GET | `/` | JWT | — | 列出所有链接。可选 `?category=` 过滤器。保存后自动排序 |
| GET | `/church/:churchId/filtered?category=` | JWT | — | 按可见性加载过滤后的链接（所有人、访客、成员、工作人员、群组） |
| GET | `/church/:churchId?category=` | 公开 | — | 按类别加载教会链接（公开） |
| POST | `/` | JWT | Content.Edit | 创建或更新链接（批量）。按类别自动排序 |
| DELETE | `/:id` | JWT | Content.Edit | 删除链接 |

## 全局样式

基础路径：`/content/globalStyles`

继承标准 CRUD（基类提供 POST `/`、DELETE `/:id`，写入需要 Content.Edit 权限）。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | 公开 | — | 加载教会的全局样式（如无则返回默认值） |
| GET | `/` | JWT | — | 加载已认证教会的全局样式 |
| POST | `/` | JWT | Content.Edit | 创建或更新全局样式 |
| DELETE | `/:id` | JWT | Content.Edit | 删除全局样式 |

## 页面历史

基础路径：`/content/pageHistory`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | 列出页面的历史条目 |
| GET | `/block/:blockId` | JWT | Content.Edit | 列出块的历史条目 |
| GET | `/:id` | JWT | Content.Edit | 按 ID 获取历史条目 |
| POST | `/` | JWT | Content.Edit | 保存页面/块快照。定期清理超过 30 天的条目 |
| POST | `/restore/:id` | JWT | Content.Edit | 从历史快照恢复页面/块（删除当前内容并从快照重新创建） |
| POST | `/restoreSnapshot` | JWT | Content.Edit | 从内联快照对象恢复。请求体：`{ pageId, blockId, snapshot }` |

## 讲道

基础路径：`/content/sermons`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | 获取示例 FreeShow 播放列表结构 |
| GET | `/public/tvWrapper/:churchId` | JWT | — | 获取包含讲道、课程和 FreeShow 来源的电视应用包装 |
| GET | `/public/tvFeed/:churchId/:sermonId` | 公开 | — | 获取单个讲道作为电视信号源播放列表 |
| GET | `/public/tvFeed/:churchId` | 公开 | — | 获取所有公开播放列表/讲道作为电视信号源 |
| GET | `/public/:churchId` | 公开 | — | 列出教会的所有公开讲道 |
| GET | `/timeline?sermonIds=` | JWT | — | 加载讲道的时间线数据 |
| GET | `/lookup?videoType=&videoData=` | 公开 | — | 从 YouTube 或 Vimeo 查询讲道元数据 |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | 从讲道字幕生成 AI 社交媒体帖子建议 |
| GET | `/outline?url=&title=&author=` | JWT | — | 从 URL 生成 AI 课程大纲 |
| GET | `/youtubeImport/:channelId` | JWT | — | 从 YouTube 频道导入视频 |
| GET | `/vimeoImport/:channelId` | JWT | — | 从 Vimeo 频道导入视频 |
| GET | `/:id` | JWT | — | 按 ID 获取讲道 |
| GET | `/` | JWT | — | 列出所有讲道 |
| POST | `/` | JWT | StreamingServices.Edit | 创建或更新讲道（批量，支持 base64 缩略图上传） |
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

基础路径：`/content/playlists`

继承标准 CRUD（基类提供 GET `/:id`、GET `/`、DELETE `/:id`，写入需要 StreamingServices.Edit 权限）。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取播放列表 |
| GET | `/` | JWT | — | 列出所有播放列表 |
| GET | `/public/:churchId` | 公开 | — | 列出教会的所有公开播放列表 |
| POST | `/` | JWT | StreamingServices.Edit | 创建或更新播放列表（批量，支持 base64 缩略图上传） |
| DELETE | `/:id` | JWT | StreamingServices.Edit | 删除播放列表 |

## 流媒体服务

基础路径：`/content/streamingServices`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | 获取服务的加密主持聊天室 ID |
| GET | `/` | JWT | — | 列出所有流媒体服务。自动清理过期的非循环服务并推进循环服务 |
| POST | `/` | JWT | StreamingServices.Edit | 创建或更新流媒体服务（批量） |
| DELETE | `/:id` | JWT | StreamingServices.Edit | 删除流媒体服务（同时清除封锁的 IP） |

## 活动

基础路径：`/content/events`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | 加载群组的时间线活动 |
| GET | `/timeline?eventIds=` | JWT | — | 加载当前用户群组的时间线活动 |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | 公开 | — | 以 ICS 日历源订阅活动 |
| GET | `/group/:groupId` | JWT | — | 获取群组的活动（包含例外日期） |
| GET | `/public/group/:churchId/:groupId` | 公开 | — | 获取群组的公开活动 |
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

## 策划日历

基础路径：`/content/curatedCalendars`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取策划日历 |
| GET | `/` | JWT | — | 列出所有策划日历 |
| POST | `/` | JWT | Content.Edit | 创建或更新策划日历（批量） |
| DELETE | `/:id` | JWT | Content.Edit | 删除策划日历 |

## 策划活动

基础路径：`/content/curatedEvents`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | 获取日历的策划活动（包含活动详情和例外日期，除非设置了 `?withoutEvents`） |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | 公开 | — | 获取日历的公开策划活动 |
| GET | `/:id` | JWT | — | 按 ID 获取策划活动 |
| GET | `/` | JWT | — | 列出所有策划活动 |
| POST | `/` | JWT | Content.Edit | 创建或更新策划活动。支持 `eventIds` 数组添加特定群组活动 |
| DELETE | `/:id` | JWT | Content.Edit | 删除策划活动 |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | 从策划日历中移除特定活动 |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | 从策划日历中移除群组的所有活动 |

## 文件

基础路径：`/content/files`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | 按内容类型和内容 ID 获取文件 |
| GET | `/` | JWT | — | 列出教会网站的所有文件 |
| GET | `/:id` | JWT | — | 按 ID 获取文件 |
| POST | `/` | JWT | Content.Edit* | 上传文件（base64）。*如果用户是与 `contentId` 匹配的群组成员也允许操作 |
| POST | `/postUrl` | JWT | Content.Edit* | 获取预签名的 S3 上传 URL。*群组成员也允许操作。每个内容项最大 100MB |
| DELETE | `/:id` | JWT | Content.Edit* | 删除文件并从存储中移除。*群组成员也允许操作 |

## 图库

基础路径：`/content/gallery`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | 公开 | — | 列出文件夹中的图片素材 |
| GET | `/:folder` | JWT | Content.Edit | 列出文件夹中的图库图片 |
| POST | `/requestUpload` | JWT | Content.Edit | 获取图库图片的预签名 S3 上传 URL |
| DELETE | `/:folder/:image` | JWT | Content.Edit | 删除图库图片 |

## 圣经

基础路径：`/content/bibles`

所有圣经端点都是公开的（无需认证）。数据从外部来源获取并在本地缓存。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | 公开 | — | 列出所有圣经译本（如缓存为空则从来源获取） |
| GET | `/stats?startDate=&endDate=` | 公开 | — | 获取日期范围内的圣经查询统计 |
| GET | `/availableTranslations/:source` | 公开 | — | 列出来源（如 api.bible）的可用译本 |
| GET | `/updateTranslations` | 公开 | — | 从所有来源同步所有译本 |
| GET | `/updateTranslations/:source` | 公开 | — | 从特定来源同步译本 |
| GET | `/updateCopyrights` | 公开 | — | 更新缺少版权信息的译本的版权信息 |
| GET | `/:translationKey/updateCopyright` | 公开 | — | 更新特定译本的版权信息 |
| GET | `/:translationKey/search?query=&limit=` | 公开 | — | 在某译本中搜索经文 |
| GET | `/:translationKey/books` | 公开 | — | 获取某译本的书卷（本地缓存） |
| GET | `/:translationKey/:bookKey/chapters` | 公开 | — | 获取某书卷的章节（本地缓存） |
| GET | `/:translationKey/chapters/:chapterKey/verses` | 公开 | — | 获取某章节的经文（本地缓存） |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | 公开 | — | 获取一段经文的文本。记录查询日志。部分译本因授权原因绕过缓存 |

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

基础路径：`/content/songs`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | 按关键词搜索歌曲 |
| GET | `/:id` | JWT | — | 按 ID 获取歌曲 |
| GET | `/` | JWT | Content.Edit | 列出所有歌曲 |
| POST | `/` | JWT | Content.Edit | 创建或更新歌曲（批量） |
| POST | `/import` | JWT | — | 从 FreeShow 导入歌曲（批量） |
| DELETE | `/:id` | JWT | Content.Edit | 删除歌曲 |

## 歌曲详情

基础路径：`/content/songDetails`

歌曲详情是全局的（不按教会限定范围）。它们代表跨教会共享的标准歌曲元数据。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取歌曲详情（全局） |
| GET | `/` | JWT | — | 列出教会的歌曲详情 |
| POST | `/create` | JWT | — | 从 PraiseCharts ID 创建歌曲详情（如已创建则返回现有记录）。自动从 PraiseCharts 和 MusicBrainz 获取元数据 |
| POST | `/` | JWT | — | 创建或更新歌曲详情（批量） |

## 歌曲详情链接

基础路径：`/content/songDetailLinks`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取歌曲详情链接 |
| GET | `/songDetail/:songDetailId` | JWT | — | 获取某歌曲详情的所有链接 |
| POST | `/` | JWT | — | 创建或更新歌曲详情链接（批量）。如有关联则自动获取 MusicBrainz 数据 |
| DELETE | `/:id` | JWT | — | 删除歌曲详情链接 |

## 编曲

基础路径：`/content/arrangements`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取编曲 |
| GET | `/song/:songId` | JWT | Content.Edit | 获取某歌曲的编曲 |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | 获取某歌曲详情的编曲 |
| GET | `/` | JWT | Content.Edit | 列出所有编曲 |
| POST | `/` | JWT | Content.Edit | 创建或更新编曲（批量） |
| POST | `/freeShow/missing` | JWT | — | 查找教会中不存在的 FreeShow ID。请求体：`{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | 删除编曲（同时删除调性；如无剩余编曲则删除歌曲） |

## 编曲调性

基础路径：`/content/arrangementKeys`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | 公开 | — | 获取带有完整歌曲数据的编曲调性（演示视图） |
| GET | `/:id` | JWT | — | 按 ID 获取编曲调性 |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | 获取某编曲的调性 |
| GET | `/` | JWT | Content.Edit | 列出所有编曲调性 |
| POST | `/` | JWT | Content.Edit | 创建或更新编曲调性（批量） |
| DELETE | `/:id` | JWT | Content.Edit | 删除编曲调性 |

## 设置

基础路径：`/content/settings`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | 获取当前用户的设置 |
| GET | `/` | JWT | Settings.Edit | 获取教会的所有设置 |
| GET | `/public/:churchId` | 公开 | — | 获取教会的公开设置（以键值对返回） |
| GET | `/imports?playlistId=&channelId=&type=` | JWT | Settings.Edit | 获取自动导入设置（YouTube/Vimeo 频道 ID） |
| POST | `/my` | JWT | — | 保存用户级别设置（支持 base64 图片上传） |
| POST | `/` | JWT | Settings.Edit | 保存教会级别设置（支持 base64 图片上传） |
| DELETE | `/my/:id` | JWT | — | 删除用户设置 |

## 预览

基础路径：`/content/preview`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | 公开 | — | 按子域名键加载教会的流媒体预览数据（标签页、链接、服务、讲道） |

## 图库（图片素材）

基础路径：`/content/stock`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| POST | `/search` | 公开 | — | 搜索 Pexels 图片素材。请求体：`{ term: "church" }` |

## PraiseCharts

基础路径：`/content/praiseCharts`

与 PraiseCharts 的集成，用于敬拜歌曲发现和乐谱下载。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | 获取歌曲的原始 PraiseCharts 数据 |
| GET | `/hasAccount` | JWT | — | 检查用户是否有关联的 PraiseCharts 账户 |
| GET | `/search?q=` | JWT | — | 搜索 PraiseCharts 目录 |
| GET | `/products/:id?keys=` | JWT | — | 获取歌曲的产品（如已认证则从曲库获取，否则从目录获取） |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | 从曲库获取原始编曲数据 |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | 从 PraiseCharts 下载文件（PDF 或 ZIP）。返回 `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | 公开 | — | 获取 PraiseCharts 的 OAuth 授权 URL |
| GET | `/access?verifier=&token=&secret=` | JWT | — | 用 OAuth 验证器换取访问令牌并保存到用户设置 |
| GET | `/library` | JWT | — | 浏览用户的 PraiseCharts 曲库 |

## 支持

基础路径：`/content/support`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | 公开 | — | 使用 AWS Polly 将 SSML 转换为 MP3 音频。请求体：`{ ssml: "<speak>...</speak>" }` |

## 相关页面

- [成员管理端点](./membership) -- 人员、教会、群组、角色、权限
- [出席端点](./attendance) -- 礼拜和访问跟踪
- [认证与权限](./authentication) -- 登录流程、JWT、权限模型
- [模块结构](../module-structure) -- 代码组织模式
