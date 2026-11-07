---
title: "オープンレッスン形式"
description: "Lessons.church に向けたサードパーティのカリキュラムプロバイダー向けの形式仕様。プロバイダーツリーと会場フィードの JSON フィールド、操作、メディアファイルを説明します。"
---

# オープンレッスン形式

<div class="article-intro">

オープンレッスン形式は、サードパーティのコンテンツ提供者がLessons.churchに教材を公開するための標準化されたJSONスキーマです。この形式でフィードを提供している組織は、外部プロバイダーとして追加でき、そのコンテンツを組み込みのライブラリと並べて閲覧・再生できるようになります。

</div>

## 仕組み

プロバイダーは2種類のエンドポイントを提供します。

1. **プロバイダーツリー** -- プログラム、スタディ、レッスン、会場の全カタログを返す単一のURLです。各会場には、詳細なレッスン内容を指すフィードURLが含まれます。
2. **会場フィード** -- 会場ごとに1つのURLを用意し、レッスンの全内容（セクション、アクション、メディアファイル）を返します。

教会がLessons.churchにプロバイダーのURLを追加すると、プラットフォームはツリーを取得して利用可能なコンテンツを見つけ、その後、個々の会場フィードをオンデマンドで取得します。

## プロバイダーツリー

プロバイダーのURLは、次の構造のJSONオブジェクトを返す必要があります。

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
              "bottomLine": "God keeps His promises.",
              "verse": "Genesis 9:13 — I have set my rainbow in the clouds…",
              "parentQuestion": "What is one promise God has kept in our family?",
              "parentNote": "Pray together thanking God for keeping His promises.",
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

### ツリーのフィールド

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `programs[].id` | 文字列 | プログラムの一意の識別子 |
| `programs[].name` | 文字列 | 表示名 |
| `programs[].slug` | 文字列 | URLに使える分かりやすい名前 |
| `programs[].image` | 文字列 | プログラムの画像URL（任意） |
| `programs[].about` | 文字列 | 説明（任意） |
| `studies[].id` | 文字列 | スタディの一意の識別子 |
| `studies[].name` | 文字列 | 表示名 |
| `studies[].slug` | 文字列 | URLに使える分かりやすい名前 |
| `studies[].image` | 文字列 | スタディの画像URL（任意） |
| `lessons[].id` | 文字列 | レッスンの一意の識別子 |
| `lessons[].name` | 文字列 | 表示名 |
| `lessons[].slug` | 文字列 | URLに使える分かりやすい名前 |
| `lessons[].title` | 文字列 | 正式なタイトル |
| `lessons[].image` | 文字列 | レッスンの画像URL（任意） |
| `lessons[].description` | 文字列 | レッスンの概要（任意）。ライブラリを閲覧する教師向けのカタログ文であり、保護者へのお持ち帰り内容ではありません。 |
| `lessons[].bottomLine` | 文字列 | 保護者へのお持ち帰りを一文で示したもの（任意） |
| `lessons[].verse` | 文字列 | 暗唱聖句の箇所と短い本文（任意） |
| `lessons[].parentQuestion` | 文字列 | 保護者が家庭で子どもに尋ねる質問（任意） |
| `lessons[].parentNote` | 文字列 | 保護者向けの追加メモ（任意、Markdown） |
| `venues[].id` | 文字列 | 会場の一意の識別子 |
| `venues[].name` | 文字列 | 会場名（例: 「Kids」「Adults」「Youth」） |
| `venues[].apiUrl` | 文字列 | 会場フィードを返すURL（後述） |

保護者向けの4つのお持ち帰りフィールド（`bottomLine`、`verse`、`parentQuestion`、`parentNote`）は、ツリーと会場フィードの両方で任意です。省略された場合は空として扱われます。これらに`description`の内容をコピーしないでください。

**会場**は、年齢層や設定などの異なる対象者に合わせて調整された、同じレッスンの別バージョンを表します。

## 会場フィード

各会場の`apiUrl`は、次のスキーマに一致するJSONオブジェクトを返す必要があります。

```json
{
  "id": "venue-1",
  "name": "Kids",
  "lessonId": "lesson-1",
  "lessonName": "The Baptism of Jesus",
  "lessonImage": "https://example.com/images/lesson1.jpg",
  "lessonDescription": "An introduction to Jesus' ministry.",
  "bottomLine": "God keeps His promises.",
  "verse": "Genesis 9:13 — I have set my rainbow in the clouds…",
  "parentQuestion": "What is one promise God has kept in our family?",
  "parentNote": "Pray together thanking God for keeping His promises.",
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

### 会場フィードのフィールド

#### ルートオブジェクト

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `id` | 文字列 | 会場の識別子 |
| `name` | 文字列 | 会場名 |
| `lessonId` | 文字列 | レッスンの識別子 |
| `lessonName` | 文字列 | レッスンの表示名 |
| `lessonImage` | 文字列 | レッスンの画像URL |
| `lessonDescription` | 文字列 | レッスンの概要（カタログ文） |
| `bottomLine` | 文字列 | 保護者へのお持ち帰りを一文で示したもの（任意） |
| `verse` | 文字列 | 暗唱聖句の箇所と短い本文（任意） |
| `parentQuestion` | 文字列 | 保護者が家庭で子どもに尋ねる質問（任意） |
| `parentNote` | 文字列 | 保護者向けの追加メモ、Markdown（任意） |
| `studyName` | 文字列 | 親スタディの名前 |
| `studySlug` | 文字列 | 親スタディのスラッグ |
| `programName` | 文字列 | 親プログラムの名前 |
| `programSlug` | 文字列 | 親プログラムのスラッグ |
| `programAbout` | 文字列 | プログラムの説明 |
| `downloads` | 配列 | ダウンロード可能なファイルのまとまり |
| `sections` | 配列 | 順序付けられたレッスンのセクション |

#### セクション

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `id` | 文字列 | セクションの識別子 |
| `name` | 文字列 | セクションのタイトル |
| `sort` | 数値 | 表示順 |
| `materials` | 文字列 | 教材や準備に関するメモ（任意） |
| `actions` | 配列 | このセクション内の順序付けられたアクション |

#### アクション

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `id` | 文字列 | アクションの識別子 |
| `actionType` | 文字列 | 次のいずれか: `play`、`text`、`question`、`quote`、`subhead` |
| `content` | 文字列 | テキストの内容、またはメディアのラベル |
| `sort` | 数値 | 表示順 |
| `role` | 文字列 | 役割名（例: 「Leader」「Kids」）（任意） |
| `roleId` | 文字列 | 役割の識別子（任意） |
| `files` | 配列 | `play`アクションのメディアファイル（任意） |

#### ファイル

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `id` | 文字列 | ファイルの識別子 |
| `name` | 文字列 | ファイル名 |
| `url` | 文字列 | 直接ダウンロードするURL |
| `streamUrl` | 文字列 | ストリーミングURL（例: Vimeoのリンク）（任意） |
| `fileType` | 文字列 | MIMEタイプ（例: `video/mp4`、`image/jpeg`） |
| `seconds` | 数値 | 音声や動画の再生時間（秒）（任意） |
| `bytes` | 数値 | ファイルサイズ（バイト）（任意） |
| `thumbnail` | 文字列 | サムネイル画像のURL（任意） |
| `loop` | 真偽値 | メディアをループ再生するかどうか（任意、既定値はfalse） |

#### ダウンロード

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `name` | 文字列 | ダウンロードのまとまりの名前（例: 「印刷用教材」） |
| `files` | 配列 | このダウンロードのまとまりに含まれるファイル（上記のファイルと同じフィールド） |

## アクションの種類

| 種類 | 用途 |
|------|---------|
| `play` | メディアの再生 -- 動画、音声、スライドショー。`files`を含める必要があります。 |
| `text` | 静的なテキストの内容。Markdown風の太字（`**テキスト**`）に対応しています。 |
| `question` | 参加者に向けた話し合いや振り返りの質問。 |
| `quote` | 強調された引用または聖書の箇所。 |
| `subhead` | セクション内の見出しまたは区切り。 |

:::tip
フィードが実際にどのように動作するかを確認するには、組み込みのLessons.churchコンテンツツリーを `https://api.lessons.church/lessons/public/tree` で表示し、そこから任意の会場フィードのURLを取得してみてください。
:::
