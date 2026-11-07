---
title: "コンテンツエンドポイント"
description: "ChurchApps Content API のエンドポイントリファレンスです。ウェブサイトのページ、ブログ記事、リダイレクト、説教、イベント、ファイル、聖書検索、B1 Admin の賛美歌を扱います。"
---

# コンテンツエンドポイント

<div class="article-intro">

コンテンツモジュールは、Webサイトのページ、セクション、エレメント、ブロック、ブログ投稿、リダイレクト、説教、プレイリスト、ストリーミングサービス、イベント、キュレーションカレンダー、ファイル、ギャラリー、聖書の翻訳と節の検索、楽曲、アレンジ、グローバルスタイル、ストック写真、設定を管理します。API の中で最大のモジュールであり、すべての ChurchApps アプリケーションにおいて、CMS、メディアとストリーミング、礼拝の計画、聖書機能を支えています。

</div>

**ベースパス:** `/content`

## ページ

ベースパス: `/content/pages`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|------|
| GET | `/:churchId/tree?url=&id=` | 公開 | — | URL または ID でページツリー全体（セクション、エレメント、ブロック）を読み込みます。URL で取得した場合は内部 ID を除去します。URL による取得では `pages.visibility` が適用されます。制限のあるページは、（任意の）JWT が条件を満たさない限り `{ restricted: true, visibility }` を返します |
| GET | `/public/:churchId` | 公開 | — | 公開ページ（`url`、`title`、`metaDescription`）を一覧表示します。`visibility = everyone` のページのみが対象です |
| GET | `/:id` | JWT | — | ID でページを取得します |
| GET | `/` | JWT | — | 教会のすべてのページを一覧表示します |
| POST | `/duplicate/:id` | JWT | Content.Edit | すべてのセクションとエレメントを含めてページを複製します |
| POST | `/temp/ai` | JWT | Content.Edit | AI で生成したページを保存します（ページ、セクション、エレメントを 1 回の呼び出しで処理します） |
| POST | `/importTree` | JWT | Content.Edit | ネストされたツリー（`title`、`url`、`sections[].elements[]…`）からページを作成します。常に呼び出し元の教会の下に挿入され、リクエストボディ内の ID は無視されます。行には `column` の子要素を含める必要があります。上限は 30 セクション、500 エレメントです |
| POST | `/` | JWT | Content.Edit | ページを作成または更新します（一括） |
| DELETE | `/:id` | JWT | Content.Edit | ページを削除します |

### 例: ページツリーの読み込み

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

## セクション

ベースパス: `/content/sections`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | ID でセクションを取得します |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | セクションを複製するか、再利用可能なブロックに変換します |
| POST | `/` | JWT | Content.Edit | セクションを作成または更新します（一括）。並び順を自動更新します |
| DELETE | `/:id` | JWT | Content.Edit | セクションを削除します（並び順を自動更新します） |

## エレメント

ベースパス: `/content/elements`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | ID でエレメントを取得します |
| POST | `/duplicate/:id` | JWT | Content.Edit | すべての子要素を含めてエレメントを複製します |
| POST | `/` | JWT | Content.Edit | エレメントを作成または更新します（一括）。行の列とカルーセルのスライドを自動管理します |
| DELETE | `/:id` | JWT | Content.Edit | エレメントを削除します |

## ブロック

ベースパス: `/content/blocks`

基底クラスの標準 CRUD（GET `/:id`、GET `/`、POST `/`、DELETE `/:id`）を拡張しています。書き込みには Content.Edit 権限が必要です。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | ID でブロックを取得します |
| GET | `/` | JWT | — | すべてのブロックを一覧表示します |
| GET | `/:churchId/tree/:id` | 公開 | — | セクションとエレメントを含むブロックツリー全体を読み込みます |
| GET | `/blockType/:blockType` | JWT | — | 種類別にブロックを読み込みます（例: footerBlock、elementBlock） |
| GET | `/public/footer/:churchId` | 公開 | — | 教会のフッターブロックツリーを読み込みます |
| POST | `/` | JWT | Content.Edit | ブロックを作成または更新します |
| DELETE | `/:id` | JWT | Content.Edit | ブロックを削除します |

## リンク

ベースパス: `/content/links`

基底クラスの標準 CRUD（GET `/:id`、GET `/`、POST `/`、DELETE `/:id`）を拡張しています。書き込みには Content.Edit 権限が必要です。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | ID でリンクを取得します |
| GET | `/` | JWT | — | すべてのリンクを一覧表示します。任意で `?category=` によるフィルターを指定できます。保存後に自動で並べ替えられます |
| GET | `/church/:churchId/filtered?category=` | JWT | — | 公開範囲（everyone、visitors、members、staff、groups）で絞り込んだリンクを読み込みます |
| GET | `/church/:churchId?category=` | 公開 | — | 教会のカテゴリー別リンクを読み込みます（公開） |
| POST | `/` | JWT | Content.Edit | リンクを作成または更新します（一括）。カテゴリー別に自動で並べ替えられます |
| DELETE | `/:id` | JWT | Content.Edit | リンクを削除します |

## グローバルスタイル

ベースパス: `/content/globalStyles`

基底クラスの標準 CRUD（POST `/`、DELETE `/:id`）を拡張しています。書き込みには Content.Edit 権限が必要です。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|------|
| GET | `/church/:churchId` | 公開 | — | 教会のグローバルスタイルを読み込みます（未設定の場合は既定値を返します） |
| GET | `/` | JWT | — | 認証済みの教会のグローバルスタイルを読み込みます |
| POST | `/` | JWT | Content.Edit | グローバルスタイルを作成または更新します |
| DELETE | `/:id` | JWT | Content.Edit | グローバルスタイルを削除します |

## ページ履歴

ベースパス: `/content/pageHistory`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|------|
| GET | `/page/:pageId` | JWT | Content.Edit | ページの履歴エントリーを一覧表示します |
| GET | `/block/:blockId` | JWT | Content.Edit | ブロックの履歴エントリーを一覧表示します |
| GET | `/:id` | JWT | Content.Edit | ID で履歴エントリーを取得します |
| POST | `/` | JWT | Content.Edit | ページまたはブロックのスナップショットを保存します。30 日より古いエントリーは定期的にクリーンアップされます |
| POST | `/restore/:id` | JWT | Content.Edit | 履歴のスナップショットからページまたはブロックを復元します（現在の内容を削除してから、スナップショットから再作成します） |
| POST | `/restoreSnapshot` | JWT | Content.Edit | インラインのスナップショットオブジェクトから復元します。リクエストボディ: `{ pageId, blockId, snapshot }` |

## 投稿（ブログ）

ベースパス: `/content/posts`

ブログ投稿は独立した行として保存され、`title`、`slug`（教会内で一意）、`excerpt`、`content`（Markdown 本文）、`authorId`、`photoUrl`、`publishDate`、`category`、`tags` を持ちます。投稿は `publishDate` が設定され、かつ過去の日時になると公開されます。読み取り系のエンドポイントは、各投稿に `authorId` から解決した `authorName` を追加します。詳細は [ウェブサイトビルダーのアーキテクチャ](../../architecture/website-builder.md#blog) を参照してください。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | 公開 | — | 公開済みの投稿をページ分けして一覧表示します（1 ページあたり最大 50 件） |
| GET | `/public/:churchId/categories` | 公開 | — | 公開済みの投稿に含まれる重複のないカテゴリーを返します |
| GET | `/public/:churchId/slug/:slug` | 公開 | — | スラッグで公開済みの投稿を取得します |
| GET | `/rss/:churchId?siteUrl=` | 公開 | — | 公開済みの投稿の RSS 2.0 フィードです（リンクは `{siteUrl}/blog/{slug}` の形式で生成されます） |
| GET | `/:id` | JWT | — | ID で投稿を取得します |
| GET | `/` | JWT | — | 教会のすべての投稿を一覧表示します |
| POST | `/` | JWT | Content.Edit | 投稿を作成または更新します（一括） |
| DELETE | `/:id` | JWT | Content.Edit | 投稿を削除します |

## リダイレクト

ベースパス: `/content/redirects`

教会ごとの URL リダイレクト（`fromPath` → `toPath`）で、1 教会あたり 200 件までです。パスは正規化されます（小文字化、先頭にスラッシュ、末尾のスラッシュなし）。`fromPath` は教会ごとに一意です。B1App は 404 になるはずのリクエストでこれらを解決し、HTTP 308 を返します。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|------|
| GET | `/public/:churchId?path=` | 公開 | — | パスを解決します（`path` を省略するとすべてのリダイレクトを一覧表示します） |
| GET | `/:id` | JWT | — | ID でリダイレクトを取得します |
| GET | `/` | JWT | — | 教会のすべてのリダイレクトを一覧表示します |
| POST | `/` | JWT | Content.Edit | リダイレクトを作成または更新します。`fromPath = toPath` は拒否され、200 件の上限が適用されます |
| DELETE | `/:id` | JWT | Content.Edit | リダイレクトを削除します |

## 説教

ベースパス: `/content/sermons`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|------|
| GET | `/public/freeshowSample` | JWT | — | FreeShow のプレイリスト構造のサンプルを取得します |
| GET | `/public/tvWrapper/:churchId` | JWT | — | 説教、レッスン、FreeShow のソースを含む TV アプリのラッパーを取得します |
| GET | `/public/tvFeed/:churchId/:sermonId` | 公開 | — | 1 件の説教を TV フィードのプレイリストとして取得します |
| GET | `/public/tvFeed/:churchId` | 公開 | — | 公開されているすべてのプレイリストと説教を TV フィードとして取得します |
| GET | `/public/:churchId` | 公開 | — | 教会の公開されているすべての説教を一覧表示します |
| GET | `/timeline?sermonIds=` | JWT | — | 説教のタイムラインデータを読み込みます |
| GET | `/lookup?videoType=&videoData=` | 公開 | — | YouTube または Vimeo から説教のメタデータを検索します |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | 説教の字幕から、AI によるソーシャルメディア投稿の候補を生成します |
| GET | `/outline?url=&title=&author=` | JWT | — | URL から AI でレッスンのアウトラインを生成します |
| GET | `/youtubeImport/:channelId` | JWT | — | YouTube チャンネルから動画を取り込みます。YouTube の検索 API がタイトルや説明に含める HTML エンティティ（`&amp;`、`&#39;` など）はデコードされます |
| GET | `/vimeoImport/:channelId` | JWT | — | Vimeo チャンネルから動画を取り込みます |
| GET | `/:id` | JWT | — | ID で説教を取得します |
| GET | `/` | JWT | — | すべての説教を一覧表示します |
| POST | `/` | JWT | StreamingServices.Edit | 説教を作成または更新します。配列または単一の説教オブジェクトを受け付けます（常に配列を返します）。リクエストボディが空の場合は 400 を返します。base64 形式のサムネイルのアップロードに対応しています |
| DELETE | `/:id` | JWT | StreamingServices.Edit | 説教を削除します |

### 例: YouTube の説教を検索する

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

## プレイリスト

ベースパス: `/content/playlists`

基底クラスの標準 CRUD（GET `/:id`、GET `/`、DELETE `/:id`）を拡張しています。書き込みには StreamingServices.Edit 権限が必要です。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | ID でプレイリストを取得します |
| GET | `/` | JWT | — | すべてのプレイリストを一覧表示します |
| GET | `/public/:churchId` | 公開 | — | 教会の公開されているすべてのプレイリストを一覧表示します |
| POST | `/` | JWT | StreamingServices.Edit | プレイリストを作成または更新します（一括）。base64 形式のサムネイルのアップロードに対応しています |
| DELETE | `/:id` | JWT | StreamingServices.Edit | プレイリストを削除します |

## ストリーミングサービス

ベースパス: `/content/streamingServices`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|------|
| GET | `/:id/hostChat` | JWT | Chat.Host | サービスの暗号化されたホストチャットルーム ID を取得します |
| GET | `/` | JWT | — | すべてのストリーミングサービスを一覧表示します。期限切れの非定期サービスは自動で削除され、定期サービスは次の回に進められます |
| POST | `/` | JWT | StreamingServices.Edit | ストリーミングサービスを作成または更新します（一括） |
| DELETE | `/:id` | JWT | StreamingServices.Edit | ストリーミングサービスを削除します（ブロックされた IP アドレスも解除されます） |

## イベント

ベースパス: `/content/events`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | グループのタイムラインイベントを読み込みます（例外日を含むため、削除された回を除外できます） |
| GET | `/timeline?eventIds=` | JWT | — | 現在のユーザーのグループのタイムラインイベントを読み込みます（例外日を含みます） |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | 公開 | — | イベントを ICS カレンダーフィードとして購読します |
| GET | `/group/:groupId` | JWT | — | グループのイベントを取得します（例外日を含みます） |
| GET | `/public/group/:churchId/:groupId` | 公開 | — | グループの公開イベントを取得します |
| GET | `/public/:churchId/:id` | 公開 | — | 公開ページ用に 1 件のイベントを取得します。却下されていない予約の部屋名を `roomNames` として含みます。保留中または却下されたイベント、および登録を受け付けない非公開イベントの場合は `null` を返します |
| GET | `/public/:churchId/:id/ical` | 公開 | — | この 1 件のイベントを `.ics` ファイル（`text/calendar`、例外日を適用）としてダウンロードします。同じルールで非表示になっている場合は `404` を返します |
| GET | `/:id` | JWT | — | ID でイベントを取得します |
| POST | `/` | JWT | — | イベントを作成または更新します（一括） |
| DELETE | `/:id` | JWT | Content.Edit、Calendars.Admin、またはグループリーダー | イベントとその予約を削除します。イベントのグループのリーダーは削除できます。申請者は自分の保留中の申請を取り下げられます |

イベントのレコードには、`photoUrl`（公開イベントページと今後のイベントタイルに表示される 16:9 のイベント写真）、`tags`（カンマ区切りで、Web サイトのカレンダーエレメントのタグフィルターで使用されます）、`notesViewRole` / `notesPostRole`（`null` の場合は `staff`、`leaders`、または `members`）が含まれます。これらは、イベントの `eventNote` の会話へのアクセスを制御します。詳細は [グループとイベントのノートへのアクセス制御](./messaging.md#group-and-event-notes-access-control) を参照してください。公開されているキュレーションイベントのレスポンスにも、各イベントの `photoUrl` と `tags` が含まれます。

## イベントの例外

ベースパス: `/content/eventExceptions`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | ID でイベントの例外を取得します |
| POST | `/` | JWT | Content.Edit、Calendars.Admin、またはグループリーダー | イベントの例外を作成または更新します（一括）。リーダーは、自分が率いるグループのイベントに対してのみ例外を追加できます |
| DELETE | `/:id` | JWT | Content.Edit、Calendars.Admin、またはグループリーダー | イベントの例外を削除します |

## キュレーションカレンダー

ベースパス: `/content/curatedCalendars`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | ID でキュレーションカレンダーを取得します |
| GET | `/` | JWT | — | すべてのキュレーションカレンダーを一覧表示します |
| POST | `/` | JWT | Content.Edit | キュレーションカレンダーを作成または更新します（一括） |
| DELETE | `/:id` | JWT | Content.Edit | キュレーションカレンダーを削除します |

## キュレーションイベント

ベースパス: `/content/curatedEvents`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | カレンダーのキュレーションイベントを取得します（`?withoutEvents` を指定しない限り、イベントの詳細と例外日を含みます） |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | 公開 | — | カレンダーの公開されているキュレーションイベントを取得します |
| GET | `/:id` | JWT | — | ID でキュレーションイベントを取得します |
| GET | `/` | JWT | — | すべてのキュレーションイベントを一覧表示します |
| POST | `/` | JWT | Content.Edit | キュレーションイベントを作成または更新します。特定のグループのイベントを追加するための `eventIds` 配列に対応しています |
| DELETE | `/:id` | JWT | Content.Edit | キュレーションイベントを削除します |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | 特定のイベントをキュレーションカレンダーから削除します |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | グループのすべてのイベントをキュレーションカレンダーから削除します |

## ファイル

ベースパス: `/content/files`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|------|
| GET | `/:contentType/:contentId` | JWT | — | コンテンツの種類とコンテンツ ID でファイルを取得します |
| GET | `/` | JWT | — | 教会の Web サイトのすべてのファイルを一覧表示します |
| GET | `/:id` | JWT | — | ID でファイルを取得します |
| POST | `/` | JWT | Content.Edit* | ファイルをアップロードします（base64）。*`contentId` に対応するグループのメンバーにも許可されます |
| POST | `/postUrl` | JWT | Content.Edit* | 事前署名された S3 のアップロード URL を取得します。*グループのメンバーにも許可されます。コンテンツ 1 件あたり最大 100MB です |
| DELETE | `/:id` | JWT | Content.Edit* | ファイルを削除し、ストレージからも削除します。*グループのメンバーにも許可されます |

## ギャラリー

ベースパス: `/content/gallery`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|------|
| GET | `/stock/:folder` | 公開 | — | フォルダー内のストック写真を一覧表示します |
| GET | `/:folder` | JWT | Content.Edit | フォルダー内のギャラリー画像を一覧表示します |
| POST | `/requestUpload` | JWT | Content.Edit | ギャラリー画像用の事前署名された S3 のアップロード URL を取得します |
| DELETE | `/:folder/:image` | JWT | Content.Edit | ギャラリー画像を削除します |

## 聖書

ベースパス: `/content/bibles`

すべての聖書エンドポイントは公開されており、認証は不要です。データは外部のソースから取得され、ローカルにキャッシュされます。api.bible へのリクエストは 15 秒でタイムアウトします。タイムアウトすると **504** を返します。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|------|
| GET | `/` | 公開 | — | すべての聖書の翻訳を一覧表示します（キャッシュが空の場合はソースから取得します） |
| GET | `/stats?startDate=&endDate=` | 公開 | — | 指定した期間の聖書の検索統計を取得します |
| GET | `/availableTranslations/:source` | 公開 | — | ソース（例: api.bible）で利用可能な翻訳を一覧表示します |
| GET | `/updateTranslations` | 公開 | — | すべてのソースからすべての翻訳を同期します |
| GET | `/updateTranslations/:source` | 公開 | — | 特定のソースから翻訳を同期します |
| GET | `/updateCopyrights` | 公開 | — | 著作権情報が欠けている翻訳の著作権情報を更新します |
| GET | `/:translationKey/updateCopyright` | 公開 | — | 特定の翻訳の著作権情報を更新します |
| GET | `/:translationKey/search?query=&limit=` | 公開 | — | 翻訳内の節を検索します |
| GET | `/:translationKey/books` | 公開 | — | 翻訳の巻を取得します（ローカルにキャッシュします） |
| GET | `/:translationKey/:bookKey/chapters` | 公開 | — | 巻の章を取得します（ローカルにキャッシュします） |
| GET | `/:translationKey/chapters/:chapterKey/verses` | 公開 | — | 章の節を取得します（ローカルにキャッシュします） |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | 公開 | — | 範囲の節のテキストを取得します。検索はログに記録されます。一部の翻訳は、ライセンス上の理由からキャッシュをバイパスします |

### 例: 聖句テキストを取得する

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

## 楽曲

ベースパス: `/content/songs`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|------|
| GET | `/search?q=` | JWT | — | クエリで楽曲を検索します |
| GET | `/:id` | JWT | — | ID で楽曲を取得します |
| GET | `/` | JWT | Content.Edit | すべての楽曲を一覧表示します |
| POST | `/` | JWT | Content.Edit | 楽曲を作成または更新します（一括） |
| POST | `/import` | JWT | — | FreeShow から楽曲を取り込みます（一括） |
| DELETE | `/:id` | JWT | Content.Edit | 楽曲を削除します |

## 楽曲の詳細

ベースパス: `/content/songDetails`

楽曲の詳細はグローバルなデータで、教会ごとに分かれていません。教会をまたいで共有される、正規の楽曲メタデータを表します。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | ID で楽曲の詳細を取得します（グローバル） |
| GET | `/` | JWT | — | 教会の楽曲の詳細を一覧表示します |
| POST | `/create` | JWT | — | PraiseCharts の ID から楽曲の詳細を作成します（すでに作成済みの場合は既存のものを返します）。PraiseCharts と MusicBrainz からメタデータを自動取得します |
| POST | `/` | JWT | — | 楽曲の詳細を作成または更新します（一括） |

## 楽曲の詳細リンク

ベースパス: `/content/songDetailLinks`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | ID で楽曲の詳細リンクを取得します |
| GET | `/songDetail/:songDetailId` | JWT | — | 楽曲の詳細に紐づくすべてのリンクを取得します |
| POST | `/` | JWT | — | 楽曲の詳細リンクを作成または更新します（一括）。リンクされている場合は MusicBrainz のデータを自動取得します |
| DELETE | `/:id` | JWT | — | 楽曲の詳細リンクを削除します |

## アレンジ

ベースパス: `/content/arrangements`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | ID でアレンジを取得します |
| GET | `/song/:songId` | JWT | Content.Edit | 楽曲のアレンジを取得します |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | 楽曲の詳細のアレンジを取得します |
| GET | `/` | JWT | Content.Edit | すべてのアレンジを一覧表示します |
| POST | `/` | JWT | Content.Edit | アレンジを作成または更新します（一括） |
| POST | `/freeShow/missing` | JWT | — | 教会に存在しない FreeShow の ID を見つけます。リクエストボディ: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | アレンジを削除します（キーも削除します。アレンジが残っていない場合は楽曲も削除します） |

## アレンジのキー

ベースパス: `/content/arrangementKeys`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|------|
| GET | `/presenter/:churchId/:id` | 公開 | — | プレゼンター表示用に、楽曲の完全なデータを含むアレンジのキーを取得します |
| GET | `/:id` | JWT | — | ID でアレンジのキーを取得します |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | アレンジのキーを取得します |
| GET | `/` | JWT | Content.Edit | すべてのアレンジのキーを一覧表示します |
| POST | `/` | JWT | Content.Edit | アレンジのキーを作成または更新します（一括） |
| DELETE | `/:id` | JWT | Content.Edit | アレンジのキーを削除します |

## 設定

ベースパス: `/content/settings`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|------|
| GET | `/my` | JWT | — | 現在のユーザーの設定を取得します |
| GET | `/` | JWT | Settings.Edit | 教会のすべての設定を取得します |
| GET | `/public/:churchId` | 公開 | — | 教会の公開設定を取得します（キーと値のペアで返されます） |
| POST | `/my` | JWT | — | ユーザー単位の設定を保存します（base64 形式の画像のアップロードに対応しています） |
| POST | `/` | JWT | Settings.Edit | 教会単位の設定を保存します（base64 形式の画像のアップロードに対応しています） |
| DELETE | `/my/:id` | JWT | — | ユーザー設定を削除します |

## プレビュー

ベースパス: `/content/preview`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|------|
| GET | `/data/:key` | 公開 | — | サブドメインのキーで、教会のストリーミングプレビューデータ（タブ、リンク、サービス、説教）を読み込みます |

## ギャラリー（ストック写真）

ベースパス: `/content/stock`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|------|
| POST | `/search` | 公開 | — | Pexels のストック写真を検索します。リクエストボディ: `{ term: "church" }` |

## PraiseCharts

ベースパス: `/content/praiseCharts`

礼拝の楽曲の発見と楽譜のダウンロードのための PraiseCharts との連携です。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|------|
| GET | `/raw/:id` | JWT | — | 楽曲の PraiseCharts の生データを取得します |
| GET | `/hasAccount` | JWT | — | ユーザーに PraiseCharts アカウントが連携されているかを確認します |
| GET | `/search?q=` | JWT | — | PraiseCharts のカタログを検索します |
| GET | `/products/:id?keys=` | JWT | — | 楽曲の製品を取得します（認証済みの場合はライブラリから、それ以外はカタログから取得します） |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | ライブラリからアレンジの生データを取得します |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | PraiseCharts からファイル（PDF または ZIP）をダウンロードします。`{ redirectUrl }` を返します |
| GET | `/authUrl?returnUrl=` | 公開 | — | PraiseCharts の OAuth 認可 URL を取得します |
| GET | `/access?verifier=&token=&secret=` | JWT | — | OAuth の検証子をアクセストークンと交換し、ユーザー設定に保存します |
| GET | `/library` | JWT | — | ユーザーの PraiseCharts ライブラリを閲覧します |

## サポート

ベースパス: `/content/support`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|------|
| POST | `/createAudio` | 公開 | — | AWS Polly を使って SSML を MP3 音声に変換します。リクエストボディ: `{ ssml: "<speak>...</speak>" }` |

## 関連ページ

- [ウェブサイトビルダーのアーキテクチャ](../../architecture/website-builder.md) -- ページ、セクション、エレメント、投稿、リダイレクトが各アプリでどのように組み合わさるか
- [メンバーシップエンドポイント](./membership.md) -- 人物、教会、グループ、役割、権限
- [出席エンドポイント](./attendance.md) -- 礼拝と訪問の記録
- [認証と権限](./authentication.md) -- ログインの流れ、JWT、権限モデル
- [モジュール構成](../module-structure.md) -- コードの構成パターン
