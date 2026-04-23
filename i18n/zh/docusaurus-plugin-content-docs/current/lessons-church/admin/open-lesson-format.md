---
title: "开放课程格式"
---

# 开放课程格式

<div class="article-intro">

开放课程格式是一个标准化的JSON架构，允许第三方内容提供商为Lessons.church发布课程。任何托管此格式提要的组织都可以作为外部提供商添加，使其内容可与内置库一起浏览和播放。

</div>

## 工作原理

提供商托管两种类型的端点：

1. **提供商树** -- 返回完整的程序、学习、课程和场地目录的单个URL。每个场地包含一个指向详细课程内容的提要URL。
2. **场地提要** -- 每个场地一个URL，返回完整的课程内容（部分、操作和媒体文件）。

当教会在Lessons.church中添加您的提供商URL时，平台会获取您的树以发现可用内容，然后按需获取各个场地提要。

## 提供商树

您的提供商URL必须返回具有此结构的JSON对象：

```json
{
  "programs": [
    {
      "id": "program-1",
      "name": "Gospel of Mark",
      "slug": "gospel-of-mark",
      "image": "https://example.com/images/mark.jpg",
      "about": "A 12-week study through the Gospel of Mark.",
      "studies": [
        {
          "id": "study-1",
          "name": "The Beginning",
          "slug": "the-beginning",
          "image": "https://example.com/images/study1.jpg",
          "lessons": [
            {
              "id": "lesson-1",
              "name": "The Baptism of Jesus",
              "slug": "baptism-of-jesus",
              "title": "The Baptism of Jesus",
              "image": "https://example.com/images/lesson1.jpg",
              "description": "An introduction to Jesus' ministry.",
              "venues": [
                {
                  "id": "venue-1",
                  "name": "Kids",
                  "apiUrl": "https://example.com/feed/venues/venue-1"
                },
                {
                  "id": "venue-2",
                  "name": "Adults",
                  "apiUrl": "https://example.com/feed/venues/venue-2"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

### 树字段

| 字段 | 类型 | 描述 |
|-------|------|-------------|
| `programs[].id` | string | 唯一的程序标识符 |
| `programs[].name` | string | 显示名称 |
| `programs[].slug` | string | URL友好名称 |
| `programs[].image` | string | 程序图像URL（可选） |
| `programs[].about` | string | 描述（可选） |
| `studies[].id` | string | 唯一的学习标识符 |
| `studies[].name` | string | 显示名称 |
| `studies[].slug` | string | URL友好名称 |
| `studies[].image` | string | 学习图像URL（可选） |
| `lessons[].id` | string | 唯一的课程标识符 |
| `lessons[].name` | string | 显示名称 |
| `lessons[].slug` | string | URL友好名称 |
| `lessons[].title` | string | 完整标题 |
| `lessons[].image` | string | 课程图像URL（可选） |
| `lessons[].description` | string | 课程摘要（可选） |
| `venues[].id` | string | 唯一的场地标识符 |
| `venues[].name` | string | 场地名称（例如"儿童"、"成人"、"青年"） |
| `venues[].apiUrl` | string | 返回场地提要的URL（见下文） |

**场地**代表针对不同受众（年龄组、场景等）定制的相同课程的不同版本。

## 场地提要

每个场地的`apiUrl`必须返回符合此架构的JSON对象：

```json
{
  "id": "venue-1",
  "name": "Kids",
  "lessonId": "lesson-1",
  "lessonName": "The Baptism of Jesus",
  "lessonImage": "https://example.com/images/lesson1.jpg",
  "lessonDescription": "An introduction to Jesus' ministry.",
  "studyName": "The Beginning",
  "studySlug": "the-beginning",
  "programName": "Gospel of Mark",
  "programSlug": "gospel-of-mark",
  "programAbout": "A 12-week study through the Gospel of Mark.",
  "downloads": [],
  "sections": [
    {
      "id": "section-1",
      "name": "Opening Discussion",
      "sort": 1,
      "materials": "Whiteboard and markers",
      "actions": [
        {
          "id": "action-1",
          "actionType": "text",
          "content": "**Key Verse:** Mark 1:9-11",
          "sort": 1
        },
        {
          "id": "action-2",
          "actionType": "question",
          "content": "What do you know about baptism?",
          "sort": 2,
          "role": "Leader"
        },
        {
          "id": "action-3",
          "actionType": "play",
          "content": "Intro Video",
          "sort": 3,
          "files": [
            {
              "id": "file-1",
              "name": "intro-video.mp4",
              "url": "https://example.com/media/intro.mp4",
              "streamUrl": "https://vimeo.com/123456789",
              "fileType": "video/mp4",
              "seconds": 180,
              "bytes": 52428800,
              "thumbnail": "https://example.com/media/intro-thumb.jpg",
              "loop": false
            }
          ]
        }
      ]
    }
  ]
}
```

### 场地提要字段

#### 根对象

| 字段 | 类型 | 描述 |
|-------|------|-------------|
| `id` | string | 场地标识符 |
| `name` | string | 场地名称 |
| `lessonId` | string | 课程标识符 |
| `lessonName` | string | 课程显示名称 |
| `lessonImage` | string | 课程图像URL |
| `lessonDescription` | string | 课程摘要 |
| `studyName` | string | 父学习名称 |
| `studySlug` | string | 父学习slug |
| `programName` | string | 父程序名称 |
| `programSlug` | string | 父程序slug |
| `programAbout` | string | 程序描述 |
| `downloads` | array | 可下载的文件包 |
| `sections` | array | 有序的课程部分 |

#### 部分

| 字段 | 类型 | 描述 |
|-------|------|-------------|
| `id` | string | 部分标识符 |
| `name` | string | 部分标题 |
| `sort` | number | 显示顺序 |
| `materials` | string | 材料或准备说明（可选） |
| `actions` | array | 该部分内的有序操作 |

#### 操作

| 字段 | 类型 | 描述 |
|-------|------|-------------|
| `id` | string | 操作标识符 |
| `actionType` | string | 以下之一：`play`、`text`、`question`、`quote`、`subhead` |
| `content` | string | 文本内容或媒体标签 |
| `sort` | number | 显示顺序 |
| `role` | string | 角色名称，例如"Leader"、"Kids"（可选） |
| `roleId` | string | 角色标识符（可选） |
| `files` | array | `play`操作的媒体文件（可选） |

#### 文件

| 字段 | 类型 | 描述 |
|-------|------|-------------|
| `id` | string | 文件标识符 |
| `name` | string | 文件名 |
| `url` | string | 直接下载URL |
| `streamUrl` | string | 流URL，例如Vimeo链接（可选） |
| `fileType` | string | MIME类型（例如`video/mp4`、`image/jpeg`） |
| `seconds` | number | 音频/视频持续时间（秒）（可选） |
| `bytes` | number | 文件大小（字节）（可选） |
| `thumbnail` | string | 缩略图URL（可选） |
| `loop` | boolean | 媒体是否应循环播放（可选，默认为false） |

#### 下载

| 字段 | 类型 | 描述 |
|-------|------|-------------|
| `name` | string | 下载包名称（例如"可打印材料"） |
| `files` | array | 此下载包中的文件（与上面的文件字段相同） |

## 操作类型

| 类型 | 用途 |
|------|---------|
| `play` | 媒体播放 -- 视频、音频或幻灯片。必须包含`files`。 |
| `text` | 静态文本内容。支持markdown样式粗体（`**text**`）。 |
| `question` | 讨论或反思问题。 |
| `quote` | 突出的引用或经文。 |
| `subhead` | 部分内的标题或分隔符。 |

:::tip
要查看提要实际运行的工作示例，您可以在`https://api.lessons.church/lessons/public/tree`查看内置的Lessons.church内容树，并从中获取任何场地提要URL。
:::
