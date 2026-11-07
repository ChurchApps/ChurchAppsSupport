---
title: "ウェブサイトビルダーのアーキテクチャ"
description: "B1 ウェブサイトビルダーの開発者向けマップです。コンテンツツリー、共有エレメントのカタログ、レンダリングの流れ、B1 Admin と B1.church の AI ページ生成を扱います。"
---

# ウェブサイトビルダーのアーキテクチャ

<div class="article-intro">

B1App で提供されるすべての教会ウェブサイトは、ContentApi に保存され、B1Admin でビジュアルに編集されるコンテンツツリー（ページ、セクション、要素）から描画されます。共通のコンポーネントライブラリがエディターのプレビューと公開サイトの両方を描画し、ページに配置できる要素の種類は要素タイプのカタログで定義されます。また、別個の AI サービスがそのツリーを生成または書き換えることができます。このページでは、スタック全体を解説します。すなわち、`@churchapps/helpers` の要素の契約、描画パイプライン、教会データ要素、サイト全体のウィジェット、ブログのレイヤー、アクセス制限付きページ、SEO、AI 生成、対話型フォームです。

</div>

## 概要

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

スタック全体に共通する3つのルールがあります。

1. **ツリーは1つ、レンダラーは2つ。** ページは `pages → sections → elements` のツリーで、各ノードはその設定を `answers` JSON の塊として保持します。同じ apphelper のコンポーネントが、B1Admin のドラッグ＆ドロップ式エディターと、B1App がサーバーサイドで描画する公開サイトの両方を描画します。別個の「公開用フォーマット」は存在しません。
2. **契約は `@churchapps/helpers` にあります。** `ElementTypes.ts` が要素タイプの唯一のカタログです。レンダラーは apphelper のレジストリを通じて解決され、エディターのフォームは B1Admin にあります。要素タイプを追加するには、この3か所すべてを、この順序で変更する必要があります。
3. **公開サイトは匿名のエンドポイントを読み取ります。** B1App が必要とするもの（ページツリー、設定、ブログ投稿、リダイレクト、他モジュールの教会データエンドポイント）はすべて公開されています。認証は任意です。匿名のツリーエンドポイントに JWT を付けると会員限定ページが表示されるようになりますが、それ以外は何も変わりません。

## コンテンツツリー

コンテンツモジュール（`Api/src/modules/content`）がビルダーのデータを管理します。

| テーブル | 役割 |
|-------|------|
| `pages` | URL ごとに1ページ。`url`、`title`、`layout`、加えてアクセス制御用の `visibility`/`groupIds` と、SEO 用の `metaDescription` |
| `sections` | ページ（またはブロック内）の水平の帯。背景、テキストの色、そして `answersJSON`。スタイル情報に加え、`dividerTop`/`dividerBottom` の形状の区切り線の設定を保持します |
| `elements` | セクション内のコンテンツ部品。`elementType` と `answersJSON` を持ちます。レイアウト系のタイプ（row/column、carousel）はネストできます |
| `blocks` | ページをまたいで共有される、再利用可能なセクションや要素のグループ（フッターのブロック、要素のブロック） |
| `posts` | 独立したブログ投稿（[ブログ](#blog)を参照） |
| `redirects` | 教会ごとの `fromPath → toPath` の組。200件まで（[SEO](#seo-and-discoverability)を参照） |
| `settings` | キーと値の教会設定。`public` の行は匿名で提供され、ウィジェットと分析の設定を保持します |

1つの URL のツリー全体は、匿名の1回の呼び出しで返されます（`GET /content/pages/:churchId/tree?url=/about`）。B1App はこれを基にサーバーサイドで描画します。エディターからのリクエストは、代わりに ID で取得し、内部の ID を保持します。

## 要素の契約

### カタログ（`@churchapps/helpers`）

`Packages/helpers/src/ElementTypes.ts` は、すべての要素タイプを `ElementTypeDefinition` として定義します。定義には `elementType`、`label`、`category`、`schemaVersion`、`defaults`、そして回答のための JSON スキーマ風の `answersSchema` が含まれます。`validateElementAnswers()` は意図的に寛容です。未知のタイプや余分なキーは通過するため、カタログをアップグレードしても古いコンテンツが壊れることはありません。**現在、35 種類の要素タイプが提供されています。**

| カテゴリ | 要素タイプ |
|----------|---------------|
| layout（6） | row, column, box, carousel, whiteSpace, block |
| content（11） | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media（4） | image, gallery, video, map |
| church（12） | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| advanced（2） | rawHTML, iframe |

`sermons` 要素は、教会向けのタイプの中で最も設定の自由度が高い要素です。`layout` の回答で `browse`（従来の全画面ブラウザー）、`grid`、`list`、`featuredLatest` のいずれかを選択します。`browse` 以外のレイアウトでは、`playlistId`、`itemCount`、`showTitles`、`showDates` で表示をさらに調整できます。

`rawHTML` 要素には2つの回答があります。`rawHTML`（マークアップ）と `javascript` です。`innerHTML` を通じて挿入されたスクリプトは実行されないため、`RawHTMLElement` はマークアップ内のすべての `<script>` ノードを新しい要素として作り直します。これらのパーサーを経由しないノードは、CSP の `strict-dynamic` の下で信頼されます。`<` で始まる `javascript` の回答（`<script>` タグ付きで貼り付けられたベンダーのスニペット）は、マークアップとして解析され、同じ処理を受けます。それ以外の場合は、通常のインラインスクリプトとして実行されます。B1Admin は、JavaScript の入力欄にある単独の URL にフラグを立てます。単独の URL は何もしないスクリプトとして実行されるためです。`map` 要素は何も描画せず、Google Maps API キーが設定されていない場合は Google Maps のスクリプトも読み込みません。

### レンダラー（`@churchapps/apphelper`）

レンダラーは `Packages/apphelper/src/website/components/elementTypes/` にあり、タイプごとに1つのコンポーネントがあります。`ElementRegistry.ts` を通じて解決されます。これは2層のマップで、`Element.tsx` が35種類すべてのデフォルトレンダラーを登録し（`registerDefaultElementRenderer`）、ホストアプリはパッケージをフォークすることなく、実行時にそのいずれも上書きできます（`registerElementRenderer`）。

### エディターのフォーム（B1Admin）

エディターのタイプごとの設定フォームは `B1Admin/src/site/admin/elements/` にあります。`ElementEdit.tsx` は、専用のコンポーネント（`GalleryEdit`、`TestimonialEdit`、`StatsEdit` など）、またはタイプごとのインラインのフィールドビルダーに処理を振り分けます。このカタログの AI 向けの写しは、API の MCP ツール `describe_page_builder` です（[MCP サーバー](../api/mcp.md)を参照）。

エディターのプレビューは、公開サイトと同じ `Theme` をマウントします。これは教会のグローバルスタイルから `--headingFont` / `--bodyFont` の CSS 変数を設定します。B1App はこれらの変数を `pages.css` を通じて適用しますが、B1Admin はそれをインポートできません。そのため `ContentEditor.tsx` は `EDITOR_PAGE_FONT_CSS`（`src/site/admin/editorCss.ts`）を挿入し、`.page` の本文テキストと `h1`–`h6` に適用します。これがないと、プレビューの見出しが管理画面のフォントで表示されてしまっていました。

### セクションの形状の区切り線

セクションは、上下どちらかの端に装飾的な形状の区切り線を持つことができます。設定はセクションの `answersJSON` に `dividerTop` / `dividerBottom` のオブジェクトとして保存されます。その形式は `{ shape, color, height, flip }` で、`shape` は `wave, waves, slant, curve, triangle, peaks` のいずれかです。apphelper は `SectionDivider` コンポーネントと `parseDividerConfig()` ヘルパーを提供します。両アプリのセクションレンダラー（`B1App/src/components/Section.tsx`、`B1Admin/src/site/admin/Section.tsx`）が回答を解析して区切り線をマウントし、B1Admin の `SectionEdit.tsx` が選択 UI を提供します。パッケージが提供するのは構成要素のみで、セクションレベルの組み込みは利用するアプリの役割です。

## 教会データ要素

作成されたコンテンツではなく、教会のライブデータを描画する要素タイプが3つあります。モジュールの分離は引き続き適用されます。それぞれが、ブラウザから所有モジュール自身の公開エンドポイントを呼び出します。

| 要素 | エンドポイント | 備考 |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | `{ fundId, totalAmount, donationCount }` を返します。任意の `?startDate=&endDate=` で期間を指定できます。要素は結果を `goalAmount` の回答と比較します |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **オプトインのみ**です。グループには `publicRoster` の設定が必要です（デフォルトはオフ）。提供する項目は意図的に最小限です。`personId`、`displayName`、`leader`、写真のみで、連絡先や属性の情報は含みません |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | キャンパス → 礼拝 → 時間のツリーを返します。apphelper の描画処理は、そこから best-effort で schema.org の `Event` JSON-LD を出力します（API はプレーンなデータを返します） |

:::warning
`publicRoster` は `staffGrid` のプライバシーの防護です。公開されるグループメンバーの提供項目を広げたり、フラグを迂回したりしないでください。ローステルのエンドポイントは設計上匿名であり、項目を最小限に絞ることが安全性の要です。
:::

### カレンダー要素とイベントページ

`calendar` 要素の回答は、`calendarType`（`group` | `curated`）、`calendarId`、`display`（デフォルトの `month`、または `upcoming`）、`tag` です。B1App は `src/components/Element.tsx` で、`registerElementRenderer("calendar", …)` を使って apphelper のレンダラーを上書きします。

- **`display: "upcoming"`** は B1App の `UpcomingEventsElement` を描画します。`GET /content/events/public/group/:churchId/:groupId` または `GET /content/curatedEvents/public/calendar/:churchId/:curatedCalendarId` を読み込み、`buildOccurrences()`（`src/helpers/EventOccurrences.ts`、1年以内のイベントごとに1回の発生）で繰り返しを展開します。先頭の12件を写真のタイルとして表示し（`events.photoUrl`、写真がない場合はテーマのダークカラー上にタイトルを表示）、`/events/{id}` へリンクします。カレンダーの ICS フィードを購読するメニューも付きます。
- **`display: "month"`** は、apphelper の `CalendarElement` を `eventUrl` コールバック付きで描画します。`GroupCalendar` / `CuratedCalendar` → `EventCalendar` / `CuratedEventCalendar` は、詳細ダイアログを開く代わりに、クリック時にその URL へ移動します（B1Admin は `eventUrl` を渡さないため、管理画面のカレンダーは従来どおりダイアログを使います）。
- **`tag`** は、`EventHelper.hasTag()`（`@churchapps/helpers`）により両方の表示をフィルターします。カンマ区切りの `events.tags` と大文字小文字を区別せずに照合し、空の場合はすべて表示します。キュレーションカレンダーの結合では `e.tags` を選択するため、キュレーションされたイベントにもタグが含まれます。

キュレーションされたイベントは `realEventId`（`eventPageId()`）でリンクされるため、URL は常に元のイベントを指します。`/{sdSlug}/events/[eventId]` は専用のルートです（ビルダーのパイプラインは通りません）。`GET /content/events/public/:churchId/:id` を読み込みます。このエンドポイントは、保留中または却下されたイベント、および登録のない非公開イベントに対しては `null` を返し、却下されていない部屋の予約から `roomNames` を追加します。`EventPageContent` を描画します（写真のヒーロー、Markdown の説明、日時・場所のサイド欄、`registrationEnabled` のときは **Register for this Event**、そして `GET /content/events/public/:churchId/:id/ical` への **Add to my calendar** リンク）。写真は Open Graph の画像として使われ、`EventPageJsonLd` を通じて次回の発生分の `Event` JSON-LD を出力します。不明なイベントや非表示のイベントは 404 を返します。

## サイト全体のウィジェット

ツリーの内部ではなく、2つのウィジェットがすべての公開ページに描画されます。**AnnouncementBanner**（閉じられるページ上部のバー）と **Launcher**（給付、訪問、視聴などのリンクをまとめるフローティングのアクションハブ）です。どちらのコンポーネントも、その `parse*Config()` ヘルパーも apphelper に含まれます。設定は、2つの公開設定の行で構成されます。キーは `announcementBanner` と `launcher` です。B1Admin の `SiteWidgetsEdit`（外観ページ）が書き込み、B1App の公開レイアウトが `GET /content/settings/public/:churchId` を通じて読み込みます。API はこれらを不透明なキーと値のペアとして扱います。キー名は2つのアプリの間の取り決めです。

## ブログ

ブログは独立したコンテンツタイプであり、ビルダーのページの上に重ねられたレイヤーではありません。`posts` の1行が投稿全体を保持します。`title`、`slug`、`excerpt`、`content`（Markdown の本文）、`authorId`、`photoUrl`、`publishDate`、`category`、`tags` です。公開インターフェース（すべて匿名、`PostController`）は次のとおりです。

| ルート | 目的 |
|-------|---------|
| `GET /content/posts/public/:churchId` | 公開済みの投稿。`?category=&tag=` でフィルターでき、ページ分割されます |
| `GET /content/posts/public/:churchId/categories` | 公開済みの投稿全体にわたる、重複のないカテゴリ |
| `GET /content/posts/public/:churchId/slug/:slug` | 公開済みの投稿1件 |
| `GET /content/posts/rss/:churchId?siteUrl=` | RSS 2.0 フィード。タイトルは教会名になり、各項目にカテゴリと、抜粋または本文から作られた説明文が付きます |

`publishDate` が設定され、その日時を過ぎると、投稿は「公開済み」になります。未来の `publishDate` は予約投稿です（公開側では非表示で、管理画面では Scheduled のチップ付きで表示されます）。読み取り用のエンドポイントは、各投稿に `authorName` を付加します。これは `authorId` から membership モジュールのゲートウェイを通じて解決されます。抜粋がない場合は、一覧カード、メタディスクリプション、RSS で、マークダウンを除去した本文（約160文字）が代わりに使われます。

B1App は次のページを提供します。`/{sdSlug}/blog` は編集的な一覧です。中央寄せのヘッダーは、絞り込み時にアクティブなカテゴリ名またはタグ名になります。カテゴリのチップによる絞り込みの行があり、サムネイルを左に置く投稿の行には筆者名と抜粋が付きます。RSS フィードは代替リンクとして告知されます。`/{sdSlug}/blog/[postSlug]` は専用のルートです（Zone/Section のパイプラインは通りません）。中央寄せのヘッダー（カテゴリのキッカー、タイトル、筆者名、プライマリカラーのアクセントライン）、コンテナ幅の 16:9 のヒーロー、約720pxの読みやすい本文欄に Markdown の本文、記事のフッターにタグのチップ、`"More in {category}"` の関連投稿の帯、そして筆者を含む `BlogPosting` JSON-LD があります。両ページはテーマのトークンだけでスタイルされるため、各教会の配色を引き継ぎます。ブログの URL は教会ごとのサイトマップに含まれます。

B1Admin の投稿作成 UI（**Site → Blog**）は、ダイアログで投稿を編集します。プレビューの切り替え付きの Markdown エディター、16:9 に切り抜くギャラリーの画像選択、筆者のピッカー（デフォルトは編集中のユーザー）、既存のカテゴリから候補を出すカテゴリの自動補完、スラッグの重複チェック、公開のトグルがあります。公開済みの行は公開投稿へのリンクになり、ページには `/blog` のナビゲーションリンクを追加するよう促す表示が出ます。コメントはサードパーティのサービスに任せています。教会全体の公開コンテンツ設定 `blogFooterHtml`（ブログページの **Below Every Post** で編集し、Settings→Edit のときだけ表示されます）が、B1App の `BlogFooterEmbed` によってすべての投稿の下に描画されます。このコンポーネントは `<script>` タグを作り直すため、`'strict-dynamic'` の下でも実行され、順番どおりに実行されます（外部の `src` の読み込みが完了してから次のインラインスクリプトが実行されます）。ベンダーのスニペットは、まずライブラリを読み込み、その後でそれを呼び出すためです。

## 会員限定ページ

`pages.visibility` はナビゲーションリンクの列挙型を再利用します。`everyone`（デフォルト）、`visitors`、`members`、`staff`、`team`、`groups`（`groupIds` と併用）です。ただし、これはナビゲーションの絞り込みではなく、**厳格なアクセス制御**として働きます（`PageVisibilityHelper.canViewPage`）。流れは次のとおりです。

1. 匿名のツリーエンドポイントは、URL ベースの取得時に公開範囲を確認します。制限されたページへの匿名の呼び出し元には、コンテンツの代わりに `{ restricted: true, visibility }` が返されます。ツリーが漏れることはありません。
2. エンドポイントは JWT も引き続き扱います。`CustomAuthProvider` は、匿名のルートを含む*すべての*リクエストで `Authorization` ヘッダーを検証します。そのため、認証済みの会員が同じ URL を取得すると、通常どおり解決されます。
3. B1App は `restricted` の応答を受け取ると `RestrictedPage` を描画します。保存された認証情報からセッションを復元し、JWT を付けてツリーを再取得して描画します。セッションがない場合は、`returnUrl` 付きのログイン画面を表示します。

:::info
制限の細かさはレベルによって異なります。`groups` はトークンの `groupIds` をページのリストと照合し、`staff` は `membershipStatus` を確認します。一方、`members` と `team` は現在、その教会の認証済みユーザーであれば誰でも通過させます。厳格にしたい場合は `groups` を使ってください。
:::

## SEO と検索での発見性

これらはすべて、ContentApi のデータの上で B1App 側が描画するものです。API が保存し、アプリが出力します。

| 項目 | 仕組み |
|---------|--------------|
| メタディスクリプション | `pages.metaDescription`（300文字以内）は `MetaHelper.getMetaData()` を通じて、ビルダーで描画されるすべてのルートの Next.js の `Metadata`（description と Open Graph）に反映されます。B1Admin のページ設定には、AI による「Generate」ボタンがあります（後述） |
| リダイレクト | 教会ごとの `redirects` の行は `/content/redirects` で管理されます（`content.edit`、200行の上限、パスは正規化されます）。404 になりそうな場合、B1App のページルートは `GET /content/redirects/public/:churchId` に対してパスを照合し、Next の `permanentRedirect` を通じて HTTP 308 を返します。一致しないパスは `notFound()` に流れます |
| ブランド付きの 404 | `not-found.tsx` は、汎用的なエラーの代わりに、教会のロゴ、名称、テーマを使った `BrandedNotFound` を描画します。未知の `/register/[eventId]`、`/events/[eventId]`、`/stream/[pageSlug]`、`/volunteer/[planId]` のパスは、通常の 404 を返します。未知のサブドメインや不正な形式のページスラッグも同様です（[ウェブサイトのルーティングとマルチサイト](./websites.md)を参照） |
| 構造化データ | ブログ投稿には `BlogPosting` JSON-LD。個別の説教ページ（`/{sdSlug}/sermons/[sermonId]`）と、`sermons` 要素を含むページには `VideoObject`。ビルダーのページ上のカレンダーとイベントの要素、および各 `/{sdSlug}/events/[eventId]` ページからは `Event`（次回の発生分、イベントの写真を `image` として使用）。`serviceTimes` 要素からは schema.org の `Event` |
| 説教ページ | 公開されているすべての説教には、完全なメタデータを備えたクロール可能なページ `/sermons/[sermonId]` が与えられます。説教は、もはやクライアントサイドのブラウザー要素の中に閉じ込められません |
| 分析 | 公開設定のキー `ga4MeasurementId`（B1Admin でリダイレクトの隣に管理）は、`next/script` を通じて教会ごとの GA4 gtag を挿入します。B1 アプリ（`/{sdSlug}/mobile`）も、有効な `G-` ID の場合は、ChurchApps 自身のタグと並んで、そのIDにページビューを送信します（GTM のコンテナ ID はウェブサイト専用のままです）。各 `gtag('config')` には、`navigator.standalone` または `(display-mode: standalone)` のメディアクエリに基づいて、`installed` または `browser` の `display_mode` が付きます（`B1App/src/helpers/mobileAnalytics.ts`） |
| サイトマップとフィード | 教会ごとの `sitemap.xml` ルートには、ビルダーのページ、ブログの URL、直近50件の説教ページ（各説教の公開日から `<lastmod>` 付き）が含まれます。組み込みの `/sermons`、`/groups`、`/volunteer` のページも、コンテンツがある場合（公開グループ、ボランティアの予定）は含まれます。ただし、保存されたリダイレクトがそのパスを置き換えている場合は除きます。教会にホームページがない場合は `/` が除外されます。その場合、`/` は対象外の `/mobile` へリダイレクトされるためです。ブログの一覧は RSS フィードを告知します |
| アクセシビリティ | 公開サイトの共通枠は、すべてのレイアウトのラッパーで、`<main id="main-content">` のランドマークを指すスキップリンクを描画します |

## AI による生成（AskApi）

ページとサイトの生成は、別のサービスである **AskApi** で、`/website` コントローラーの下で実行されます。他のすべてと同じ `CustomAuthProvider` の JWT で認証し、コンテンツに関しては**状態を持ちません**。すべてのエンドポイントは JSON を返し、呼び出し元（B1Admin）が結果を ContentApi を通じて保存します（`POST /content/pages/importTree` は、ネストされたセクションと要素のツリー全体を1回の呼び出しでページとして作成します。常に呼び出し元の教会の下に挿入し、本文の ID は無視します）。

### ページ生成（`planPage` → `writePage`）

B1Admin の `AddPageModal` にある「AI」のページテンプレートは、低コストのパイプライン（`AskApi/src/helpers/SiteGenHelper.ts`）を使います。このパイプラインは次の1つのルールに基づいています。**どのモデルもビルダーの JSON を出力しません。** 2つのモデルが、Vercel AI Gateway（プレーンな HTTP。SSM のキー `/{env}/aiGatewayApiKey` または `AI_GATEWAY_API_KEY`）を通じて作業を分担します。

- **JEV**（`typesafe-ai/jev`）— 選択肢、スコア、真偽値を確率付きで返す型付きの判断モデルです。ただし、文章は書けません。固定のテンプレートライブラリから各セクションを順番に選び、レイアウトをスコア付けし、本文の事実確認を行い、フリー素材の写真とアイコンを選びます。入力は100万トークンあたり約 $0.04、出力は無料です。そのため、1ページあたり約90回の呼び出しでも、コストは1セントの何分の一かです。
- **小型のチャットモデル（デフォルトは GPT-4.1 mini）**— 選ばれたテンプレートの、名前付きで長さに上限のあるテキストのスロットを埋めます。執筆モデルは1つの定数で、環境変数 `SITEGEN_COPY_MODEL` で上書きできます（ゲートウェイ上の任意のチャットモデル ID。例: `anthropic/claude-haiku-4.5`）。3つの教会を対象にした並べて比較する盲検テストでは、Claude Haiku 4.5 の方がやや温かみのある文章になりました。ただし GPT-4.1 mini も僅差で、コストは約4分の1、速度も速かったため、デフォルトになっています。3つのレイアウトすべてを含む完全なページの費用は約1.3セントで、そのうち約80%が執筆モデルによるものです。

| フェーズ | エンドポイント | 内容 |
|-------|-------|-------------|
| 1 | `POST /website/planPage` | ページの種類（home、visit、about など）を分類します。その後、JEV のラウンドごとの確率から10個の候補レイアウトをサンプリングします（ヒーロー + セクション数 → 各セクション → クロージャー）。重複を除去し、JEV に各候補の適合性、流れ、不足点をスコア付けさせます。上位3件、ライティングのトーン、`suggestedStyle`（パレットとフォント）を返します。ここまでのセクションが同じ候補は、JEV に同一の質問をするため、ラウンドは接頭辞ごとにメモ化されます。最高スコアが6未満の場合は `lowLayoutScore` として記録されます。このログが、追加する価値のあるテンプレートのバックログです。約2秒 |
| 2 | `POST /website/writePage`（候補ごとに1回の呼び出し） | 執筆モデルが、1回の呼び出しで2セクションずつ、並列にスロットの文章を埋め、JEV が選ぶための見出しの候補を5つ返します。JEV はすべてのセクションの事実確認を行います。失敗した、定型句を使った、または前のセクションを言い直している（4語の連続一致をコードでチェック）セクションは、具体的な理由を添えて並列に書き直されます。コードによる整理で、教会サイトの定型句を含む文は削除されます（教会自身の説明文がその句を使っている場合を除く）。JEV は写真の題材、アイコン、ヒーローの形状の区切り線を選び、結果をスコア付けします。保存可能なセクションのツリーとスコアを返します。約6〜9秒 |
| 3 | `POST /content/pages/importTree` | B1Admin は、最も上位にランクされたレイアウトだけを書き込みます（その書き込みが失敗した場合は、次点がフォールバックになります）。保存してプレビューを開きます（保存後約10秒） |

各フェーズは独立したリクエストであるため、どの呼び出しも API Gateway の29秒の制限内に収まります。`SiteGenHelper.buildTree` のテンプレートは、カタログから得た固定のセクションと要素のツリーです（`text`、`row`/`column`、`card`、`iconFeature`、`faq`、`table`、`testimonial`、`textWithPhoto`、`box`、`map`、`sermons`）。テーマのトークン（`var(--accent)`、`var(--lightAccent)`…）を参照するため、生成されたページは教会の既存の外観設定を引き継ぎます。セクションのテンプレートを追加するには、そのスロットの一覧を `SECTIONS` に、ツリーを `buildTree` に追加します。ユニットテストはすべてのテンプレートを調べ、ツリーを検証します。

**入力。** 本文が述べてよい事実は、2つの情報源に限られます。ユーザーが入力した内容と、`churchContext.facts` です。後者は、計画の前に B1Admin が収集する記録です（公開されている礼拝時間と公開グループの名称、加えて教会の名前と住所）。同じフラグが、データに依存するテンプレートを制御します。教会が礼拝時間を B1 で管理している場合、`times` はライブの `serviceTimes` 要素を描画します（そうでない場合は入力された表）。`groups` と `countdown` は、その背後にデータがある場合にだけ提供されます。ゲートウェイが時々停止することがあり、呼び出しはほぼ無料のため、JEV の呼び出しには保険がかけられています。重複する呼び出しは1.5秒後に発行され、最初の回答が採用されます。

**主題から外れないこと。** ユーザーのプロンプトは、教会についての背景ではなく、*ページの主題*です。`planPage` はリクエストを分類します（`home`、`visit`、`about`、`ministries`、`give`、`contact`、`event`、`topic`）。`event` と `topic` のページには、一般的な教会向けのテンプレート（牧師のメッセージ、説教、ミニストリー、グループ、地域への貢献、週間の時間とカウントダウン、動画のヒーロー）は提示されません。代わりに `details`（日時・場所・持ち物）と、日付の `eventCountdown` が提示されます。両方の審査モデルは、主題との関連性をスコア付けします。B1Admin は、計画の `pageType` を各 `writePage` の呼び出しに渡します。

**短いリクエストから完全なページを作る。** ページには中間のセクションが3〜6個あり、スロットの文章は十分な長さがあります。カードのセクションには導入文があり、FAQ は5つの質問で構成されます。修復の工程では、薄すぎるセクションを拡張します。生成は1クリックで、追加の質問はありません。完全なページに必要な通常の詳細（開始時刻、部屋、持ち物、申し込み方法）がリクエストに含まれていない場合、執筆モデルは、教会が編集できるような、もっともらしく控えめな選択肢で埋めます。セクションは並列に書かれるため、そうした空白は**一度だけ**、`planPage` で決定されます（`assumedDetails`。レイアウトのサンプリングと並行して動く、1回の小さな執筆モデルの呼び出しです）。そして `churchContext.assumedDetails` を通じて、すべての `writePage` の呼び出しに戻されます。そのため、あるセクションが5:00と言い、別のセクションが5:30と言うことはありません。JEV は、リクエスト、教会の記録、または決定された詳細と矛盾するセクションを修復します。決定された詳細は UI には表示されません。教会は、他のどのページとも同様に、ページを確認して編集します。作り話にしないものもあります。人の名前、電話番号、メールアドレスや Web アドレス、価格、統計、教会の歴史、人物に帰属する引用、そしてリクエストが指定していない日付の曜日です。

**ビジュアル。** テンプレートは、写真やアイコンの名前を指定しません。スロットを空けたままにし、1つの汎用的な工程（`SiteGenHelper` の `visualSlots` → `pickVisuals` → `applyVisuals`）が、完成したツリーを歩いてすべてのスロットを埋めます。`auto:photo` と印の付いたセクションの背景またはギャラリーの項目、`auto:icon`、ヒーローの `auto:divider`、そして印がまったくない場合は、`photo` が空の `textWithPhoto`、`card`、`image` の要素すべてが対象になります。JEV は、それぞれの隣にあるテキストから選びます（カードの写真はそのカードのタイトルと本文から、背景はセクションの文章から）。ページ内で同じ題材が繰り返されることはありません。そのため、新しいテンプレートでも写真は自動的に付きます。写真は Pexels の検索題材で、`pexels:<term>` というプレースホルダーとして出力されます。B1Admin はこれを `POST /content/stock/search` を通じて解決します。`resolvesPhotos` を送らないクライアントには、代わりに組み込みのヒーロー画像、単色の帯、写真のないカードが表示されます。人物の写真の題材は意図的に使わず、牧師のテンプレートには写真を入れていません。フリー素材の見知らぬ人が、実在の人物の代わりになることがあってはならないからです。まだページがない教会では、B1Admin が `suggestedStyle` をグローバルスタイルに適用します。既存のサイトは、今までの外観を保ちます。

### その他のエンドポイント

:::info
B1Admin の `SectionToolbar` の書き換えボタンと、ページ一覧の「Generate Site」ボタンは、クライアント側でコメントアウトされたままです。以下の AskApi のエンドポイントは引き続き応答します。非表示になっているのは UI だけです。
:::

| エンドポイント | 目的 |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | 元の2段階のページのフローです（アウトラインを作り、次にセクションごとに1回の LLM 呼び出しで要素の JSON を出力します）。コストの理由から、B1Admin では `planPage`/`writePage` に置き換えられました。API の利用者向けに残されています |
| `POST /website/generateSite` | サイト全体の生成です。**設計上2段階です。** `planOnly: true` の呼び出しは、複数ページの計画だけを返します（高速なモデルの呼び出しが1回）。その後、クライアントが完全なコンテンツを要求します。これにより、すべてのリクエストが Lambda/API Gateway のタイムアウト内に収まります |
| `POST /website/rewriteSection` | 構造を保った書き換えです。モデルが変更できるのは、テキストを含む回答だけです。書き換えの前後で再帰的な構造のシグネチャ（ID + タイプ + 順序）を比較します。不一致があれば、壊れた構造の代わりに、元のセクションを `fallback: true` 付きで返します |
| `POST /website/generateAltText` | 最大20件の画像 URL に対するビジョン呼び出しです。簡潔な代替テキスト（125文字以内。「photo of」の接頭辞は除去）を返します |
| `POST /website/generateMetaDescription` | ページのテキスト内容から、SEO のメタディスクリプション（155文字以内）を1つ生成します。B1Admin のページ設定の Generate ボタンに接続されています |

これらのエンドポイントのプロンプトは、`AskApi/config/instructions/` 以下の Markdown ファイルです。モデルが生成元とする要素カタログも含まれます。カタログを正確に保つための設計上の2点があります。クライアントはすべてのリクエストで `availableElementTypes` を渡します。プロンプトはその一覧にあるタイプしか使えません。サーバーが全体の集合をハードコードすることはありません。また、API の MCP ツール `describe_page_builder` は、[MCP](../api/mcp.md) を通じて作業する AI エージェントのための同じガイドを持っています。モデルは OpenRouter 経由の Anthropic Claude です。セクションの本文には 3.5 Haiku（レイテンシー重視）、アウトライン、サイトの計画、ビジョンには 3.5 Sonnet を使用します。OpenRouter のキーが設定されていない場合は、OpenAI へのフォールバックがあります。

## 対話型フォーム

フォーム（membership モジュール）に、コネクトカード形式のページを想定した対話型モードが加わりました。`forms` の4つの列がそれを制御します。`displayMode`（`standard` | `conversational`）、`autoCreatePerson`、`followUpSubject`、`followUpBody` です。

- **描画**: `displayMode` が `conversational` のとき、apphelper の `FormSubmissionEdit` は `ConversationalForm` コンポーネント（一度に1つの質問）に切り替わります。B1App のフォームページはそのモードを受け渡します。どちらの場合も、送信のペイロードは同じです。
- **人物の自動作成**: `autoCreatePerson` が設定された状態で送信されると、`ConversationalFormHelper.findOrCreatePerson` がメールアドレス（大文字小文字を区別しない）で重複を排除します。該当がない場合は、`membershipStatus: "Guest"` の世帯と人物を作成し、その人物に送信内容を紐付けます。
- **フォローアップのメール**: 件名と本文が設定されている場合、送信者はテンプレート化されたメールを受け取ります（`{firstName}` / `{churchName}` のトークン付き）。送信は既存のトランザクションメールの経路（`TransactionalEmailHelper`）を通り、通知のダイジェストの経路は決して使いません。どちらの副作用も致命的ではありません。失敗しても送信内容が失われることはありません。

現在、この4つのフィールドは API で設定します。B1Admin のフォームエディターからは、まだ設定できません。

## 公開サイトのキャッシュ

B1App の公開描画のパスは、教会のタグが付いた取得結果をキャッシュします（本番では `next: { revalidate: 300, tags: [sdSlug] }`、開発では `0`）。そのため、ContentApi への書き込みの後、ライブのページは最大5分間古いままになることがあります。B1App の `POST /api/revalidate/{sdSlug}` は `revalidateTag(sdSlug)` を呼び出します。これが、そのキャッシュを早めに破棄する唯一の方法です。

このキャッシュを更新する経路は2つあります。

1. **B1Admin**: `B1Admin/src/site/siteCache.ts` の `clearSiteCache()` が、エディターの保存後に POST します。アクティブなサイトのサブドメインを優先します。セカンダリのサイトは、教会のデフォルトではなく*そのタグ*を無効化する必要があるためです。
2. **Api**: B1Admin を経由しないコンテンツの変更（API キー、MCP、AI）は、コンテンツのコントローラーから `SiteCacheHelper.bump(churchId)` を実行します。このヘルパーは `SubDomainHelper` を通じて教会のサブドメインを解決し、`{b1AppRoot}/api/revalidate/{sd}` に POST します。失敗は握りつぶされるため、到達できない B1App が保存を失敗させることはありません。

`bump` を実行するコントローラーは次のとおりです。ページ（保存、削除、複製、公開、破棄、非公開化、AI の一時保存）、セクション、要素、ブロック、リンク、グローバルスタイル、投稿、リダイレクト。開発環境の `b1AppRoot` は `http://{subdomain}.localtest.me:3301`、デモと本番は `https://{subdomain}.b1.church` を使用します。

## 関連ページ

- [ウェブサイトのルーティングとマルチサイト](./websites.md)：リクエストが教会やサイトにどう解決されるか、カスタムドメインがどうルーティングされるか
- [コンテンツのエンドポイント](../api/endpoints/content.md)：ページ、セクション、要素、ブロック、投稿、リダイレクト、設定のための REST API の全体像
- [AppHelper](../shared-libraries/app-helper.md)：描画処理、レジストリ、区切り線、ウィジェットを提供する npm パッケージ
- [MCP サーバー](../api/mcp.md)：ガイドツール `describe_page_builder` を含む
- [ページエディター（エンドユーザー向け）](/docs/b1-admin/website/page-editor)：スタッフ向けのエディターのドキュメント
