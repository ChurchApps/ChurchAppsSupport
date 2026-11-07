---
title: "ウェブサイトのルーティングとマルチサイト"
---

# ウェブサイトのルーティングとマルチサイト

<div class="article-intro">

ひとつの教会が複数の異なるウェブサイトを提供できるようになりました。各サイトは `*.b1.church` のサブドメインにも、教会が所有する完全なカスタムドメインにも配置できます。このページでは、ビルダーの *下位* にあるルーティング層を扱います。リクエストがどのように教会と特定のサイトに解決されるか、マルチサイトのデータモデル（既存のすべてのサイトを変更せずに表示し続ける `siteId` センチネル値）、そして、TLS を終端し各教会ドメインを `*.b1.church` のアップストリームに書き換える、EC2 上のセルフマネージド Caddy プロキシであるカスタムドメインのエッジについて説明します。リクエストが解決された後に実際に何が描画されるか（ページ／セクション／要素のツリー）については、[ウェブサイトビルダー](./website-builder) を参照してください。

</div>

## 概要

```
   grace.b1.church              www.gracechurch.org  (custom domain)
   (b1.church subdomain)                  │
          │                               ▼
          │             ┌──────────────────────────────────────────┐
          │             │ Caddy edge — EC2 3.23.251.61              │
          │             │             (proxy.b1.church)             │
          │             │  • terminates TLS (per-domain LE cert)    │
          │             │  • rewrites Host → {sub}.b1.church        │
          │             │  • reverse-proxies to B1App               │
          │             └────────────────────┬─────────────────────┘
          │                  Host = {sub}.b1.church
          ▼                                  ▼
   ┌────────────────────────────────────────────────────────────┐
   │ B1App src/middleware.ts                                     │
   │  • always: delete any client-supplied x-site (anti-spoof)   │
   │  • internal *.b1.church Host ⇒ domains lookup stays inert   │
   │  • raw custom Host (bypassing Caddy) ⇒ lookup → set x-site  │
   └───────────────────────────┬────────────────────────────────┘
                               ▼  next.config.mjs → host first-label → /[sdSlug]/…
              ┌─────────────────────────────────────────────────┐
              │ [sdSlug] · ConfigHelper.load(sdSlug)             │
              │   GET /membership/churches/lookup/?subDomain=…   │
              │   → { id, name, subDomain, siteId? }             │
              │   threads ?siteId= into every content call:      │
              │   /content/pages/:id/tree · /globalStyles ·      │
              │   /blocks/public/footer · /links · sitemap       │
              └─────────────────────────────────────────────────┘

  domain save/delete (B1Admin Settings→Domains → POST /membership/domains)
        └─ best-effort CaddyHelper.updateCaddy()  (wrapped, non-fatal, 10s timeout)
  Caddy reads the domains table itself via two anonymous endpoints:
        GET /membership/domains/authorize  — on-demand-TLS `ask` (200 known / 404 unknown)
        GET /membership/domains/hostmap    — host→{sub}.b1.church map (5-min refresh)
```

この層全体には、次の3つのルールが適用されます。

1. **センチネル値により、既存の動作との互換性が保たれます。** `siteId = ''` はプライマリサイトを表します。この機能の導入前から存在するすべてのページ、ブロック、リンク、グローバルスタイル、ドメインの行は `''` を持ち、以前とまったく同じように描画されます。*2つ目*のウェブサイトは、単に空でない `siteId` を持つ行の集合にすぎません。`?siteId=` を付けずに呼び出されたコンテンツのエンドポイントは、プライマリサイトを返します。これは従来のリクエストとバイト単位で同一です。

2. **解決はホストラベルに基づき、最終的に同じ結果に収束します。** `*.b1.church` のサブドメインは、そのホストラベルによって直接ルーティングされます。カスタムドメインは、B1App が受け取る前にエッジの Caddy によって `{sub}.b1.church` ラベルに書き換えられます（書き換えを経由しない生のカスタム `Host` に対しては、フォールバックとして `x-site` ヘッダーを設定するミドルウェアの DB 検索が働きます）。どちらの経路も同じ `[sdSlug]` ルートと同じ `churches/lookup` の呼び出しに到達するため、後続の描画は同一になります。

3. **Caddy エッジは、単一の信頼できる情報源に基づくステートレスな構成です。** カスタムドメインは、各ドメインを `{sub}.b1.church` のアップストリームに書き換える、EC2 上のセルフマネージドな Caddy プロキシで終端されます。ドメインを保存すると、ベストエフォートの `CaddyHelper.updateCaddy()` が1回呼び出されます。また Caddy は、`domains` テーブルを（後述の `authorize` と `hostmap` のエンドポイントを通じて）直接読み取ります。テーブルが正として扱われるため、到達不能な Caddy によって保存が失敗することはありません。

## サイトの解決

### `*.b1.church` のサブドメイン

`B1App/next.config.mjs` は、受信リクエストをホストに基づいて書き換えます。パターン `(?<subdomain>.*?)\..*` を持つホストルールは、ホストの**最初のラベル**を取り出し、`/` と `/:path*` を `/{subdomain}` に書き換えます。これは App Router の `[sdSlug]` セグメントです。したがって `grace.b1.church/about` は `/grace/about` になります。

`src/app/[sdSlug]/` 内では、`ConfigHelper.load(sdSlug)`（`src/helpers/ConfigHelper.ts`）が `GET /membership/churches/lookup/?subDomain={sdSlug}` を呼び出します。`ChurchController.getBySubDomain` のレスポンスには、現在2つの分岐があります。

| スラッグの一致 | レスポンス | 意味 |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | その教会のプライマリサイト |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | **セカンダリサイト**。コントローラーは `sites` にフォールバックし、所有する教会を解決して、照会したスラッグと追加の `siteId` を返す |

セカンダリサイトへのリクエストとプライマリへのリクエストを区別するのは、この追加の `siteId` だけです。パイプラインのそれ以外の部分はすべて共通です。

どちらのテーブルにも一致しないスラッグは、`200` とともに `{}` を返します。`ConfigHelper.load` は `id` を含まないレスポンスを未知のサイトとみなし、Next の `notFound()` を呼び出します。そのため、未知のサブドメインは、後続のすべての呼び出しが `/…/undefined` を要求する代わりに、正しい 404 を返します。ビルダーページのルートも、`pageTreePath()`（`src/helpers/pageTreePath.ts`）を使ってツリーのパスを組み立てます。この関数はスラッグを URL エンコードするため、不正な形式のスラッグ（バックスラッシュやスペースを含むもの）は、API の `400` を 500 として表面化させるのではなく、404 を返します。

### カスタムドメイン

教会が所有するドメインは **Caddy エッジ**（後述）で終端され、Caddy は B1App にプロキシする前に `Host` ヘッダーをサイトの `{sub}.b1.church` に書き換えます。そのため通常の経路では、B1App は*内部*の `*.b1.church` ホストを受け取り、ネイティブのサブドメインとまったく同じようにホストラベルで解決します。ミドルウェアの DB 検索は実行されません。`src/middleware.ts` はすべてのリクエストで引き続き実行されますが、常時実行される処理が1つと、フォールバックが1つあります。

1. **常に** — クライアントから送られた `x-site` ヘッダーを**すべて削除します**。このヘッダーは偽装可能な書き換え入力であり、ミドルウェア自身が設定した場合にのみ信頼されます。このヘッダーを取り除くことが、Caddy の背後でのミドルウェアの本来の役割です。

2. **フォールバック（内部ではない `Host` のみ）** — Caddy の書き換えを経ずに B1App に到達する、生のカスタムドメインの `Host` に対しては、`GET /membership/domains/public/lookup/{host}` を呼び出します。そのレスポンスに `subDomain` が含まれていれば、`x-site: {subDomain}.b1.church` を設定します。Caddy の背後では、`Host` がすでに `*.b1.church` であるため、この分岐は動作しません。

内部ホスト（`localhost`、`b1.church`、および `.b1.church`、`.localtest.me`、`.localhost`、`.up.railway.app`、`.vercel.app` の各サフィックス）は、検索をまったく行いません（これらはすでにホストラベルの書き換えによって解決されているか、プレビュー用またはデプロイ用のホストです）。

検索自体（`DomainRepo.loadByName`）は、`domains → churches` と `domains → sites` を LEFT JOIN し、`COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` を返します。つまり、ドメインがセカンダリサイトを指している場合は割り当てられたそのサイトのサブドメインを、そうでなければ教会のサブドメインを返します。まず完全一致するホストを検索します。そのホストが `www.` で始まり一致しなかった場合は、ルートドメイン（apex）に対して**1回だけ**再試行します。

`next.config.mjs` に戻ると、`x-site` の書き換えルールは汎用のホストルールより**前に**配置されるため、優先されます。`x-site: grace.b1.church` → 最初のラベル `grace` → `[sdSlug] = grace` となり、そこからの解決はサブドメインの経路とまったく同じです（同じ `churches/lookup`、同じ `siteId`）。

:::info
`x-site` ヘッダーは外部からは信頼されないものとして扱います。ミドルウェアは、自身が値を設定する前に、受信した `x-site` をすべて無条件に削除します。また書き換えルールが参照するのは、ミドルウェアが設定した値だけです。クライアントはヘッダーを送信しても、他の教会のコンテンツに自分を割り込ませることはできません。
:::

ミドルウェアに関する運用上の詳細が2点あります。

- **キャッシュ。** 各ホストの結果（ヒット*または*確認済みの不一致。ネットワークエラーは決してキャッシュしない）は、サーバーレスの分離環境ごとにインメモリの `Map` に **10 分間** キャッシュされます。

- **マッチャー。** マッチャーは、意図的に `/sitemap.xml`、`/robots.txt`、`/manifest.webmanifest` を再度対象に含めています。最初のパターンはドットを含むパスを除外しますが、それではこれらのファイルが対象から外れてしまいます。そのため、これらを再び含めることで、カスタムドメインの教会ごとの SEO／PWA ファイルも `x-site` ヘッダーを受け取れるようにしています。

- **正規リンクヘッダー。** 教会のページについて、ミドルウェアは `Link: <{proto}://{host}{path}>; rel="canonical"` というレスポンスヘッダーを追加します。これは、ページが実際に提供されたホスト（サブドメインまたはカスタムドメイン）を示します（`helpers/canonicalLink.ts`）。カスタムドメインが [Caddy プロキシ](../deployment/caddy-proxy.md) を経由して B1App に到達する場合、リクエストのホストは `{sub}.b1.church` のサブドメインになります。そのため、ミドルウェアは代わりに `X-Church-Host` から訪問者のドメインを使用します。ただしこれは、`/domains/public/lookup/{host}` によってそのドメインが同じサブドメインに対応していることが確認された後に限られます（`ownsSubdomain()`）。その結果、正規リンク、`robots.txt`、`sitemap.xml` は、`b1.church` のサブドメインではなくカスタムドメインを指すようになります。非教会ホスト（`b1.church`、`localhost`、`*.vercel.app`、`*.up.railway.app`）や、`/mobile`、`/login`、`/logout`、および生成された robots／sitemap／manifest ファイルでは、この処理はスキップされます。

### 公開ウェブサイトの無効化

教会は B1Admin で **Disable Public Website（公開ウェブサイトを無効化）** をオンにできます（教会レベルのコンテンツ設定 `hidePublicSite = "true"`）。その場合、サイトはメンバー向けのルートのみを提供します。

- **B1App のミドルウェア** はサブドメインを検索し（`/membership/churches/lookup` の後に `/content/settings/public/:churchId`）、許可リスト外のパスに対する匿名リクエストを `/login?returnUrl={path}{query}` にリダイレクトします。許可リスト（`helpers/publicSite.ts`）は、`/login`、`/logout`、`/mobile/*`、`/register/*`、`/guest-register`、およびマニフェスト／robots／sitemap ファイルです。キャッシュされるのは確認済みの応答のみです（本番環境では 60 秒。管理者の再検証呼び出しではインスタンスごとのこの Map をクリアできないためです。開発環境／テスト環境ではキャッシュしません）。API エラーが発生した場合は、全員を締め出すのではなく、サイトを提供します。
- **サインイン済みのメンバーには、サイト全体が表示されます。** 有効期限内の `jwt` Cookie を持つリクエストは（ミドルウェアの `hasSession()` は、署名を検証せずにペイロードの `exp` をデコードします。これは緩いゲートであり、アクセス制御ではありません）リダイレクトをスキップします。そのため、ログイン後のメンバーは要求していたページに戻り、通常のページ、組み込みページ（グループ、説教など）、ヘッダーのナビゲーションを表示できます。ページコンポーネントと `Header` は、もはや `hidePublicSite` を自分でチェックしません。
- **`robots.txt`** は、noindex のホストと同様に、すべてのクロールを禁止します。
- **API。** `GET /content/pages/public/:churchId`（サイトマップのページ一覧）は `[]` を返すため、匿名の呼び出し元はページを一覧表示できません。

### `siteId` の受け渡し

`ConfigHelper` は、解決された `siteId` をリクエストごとの `ConfigurationInterface` に保存し（React の `cache()` でメモ化）、それ自身とページコンポーネントが行うコンテンツ呼び出しに `?siteId=` を追加します。これは**条件付き**です。空の `siteId`（プライマリ教会のサブドメイン）の場合、パラメーターは完全に省略されます。受け渡し対象のエンドポイントは、ページツリー（`/content/pages/:id/tree`）、サイトマップで使われる公開ページ一覧（`/content/pages/public/:id`）、グローバルスタイル（`/content/globalStyles/church/:id`）、ナビゲーションリンク（`/content/links/church/:id`）、および単独のフッターブロック（`/content/blocks/public/footer/:id`）です。通常の描画経路では、フッターはページツリーの中（`zone: "siteFooter"` とタグ付けされたセクション）で到着し、すでに `siteId` 付きで取得されているため、スコープされていないフッターの隙間は存在しません。

メンバーポータル（B1App の `mobile`）は、意図的にこの仕組みの対象外です。`loadChurchAppearance.ts` は `churches/lookup` を使って教会を解決しますが、教会レベルの `/settings/public/{id}` を読み取るだけで、`siteId` を受け渡すことは決してありません。v1 ではポータルは教会全体を対象とします（後述）。

## 1つの教会における複数のウェブサイト

### データモデル

新しい `membership.sites` テーブルは、意図的に非常にシンプルな構成になっています。

| 列 | 型 | 備考 |
|--------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | 所有する教会 |
| `name` | `varchar(255)` | 表示名（例：「Español」、「Youth」） |
| `subDomain` | `varchar(45)` | **一意インデックス**。グローバルな名前空間（下記参照） |

サイトのスコープ設定は、コンテンツテーブルとドメインテーブルに追加された、NULL を許可しない単一の列によって行われます。

| テーブル（モジュール） | 列 | `''` の意味 |
|----------------|--------|-----------|
| `domains`（membership） | `siteId char(11) NOT NULL DEFAULT ''` | ドメインがプライマリサイトを提供する |
| `pages`、`links`、`globalStyles`、`blocks`（content） | `siteId char(11) NOT NULL DEFAULT ''` | プライマリサイト。**`blocks`** の場合、`''` は加えて*すべてのサイトで共有*されることも意味する |

これらすべては、2つのマイグレーションによって追加されます（`tools/migrations/membership/2026-07-02_sites.ts`、`tools/migrations/content/2026-07-02_site_id.ts`）。列のデフォルトが `''` であるため、既存のすべての行は、バックフィルなしで現在の動作を維持します。

**グローバルなサブドメインの名前空間。** `sites.subDomain` は、`churches.subDomain` と*同じ一つの*名前空間を共有します。サイトのサブドメインが、教会のサブドメインや他のサイトのサブドメインと衝突することは決してありません。これは**両方の**保存経路で強制されます。`SiteController.save` は、`churches` または `sites` のいずれかに一致するスラッグを拒否し、`ChurchController.validateSave` は逆方向で同じことを行います。`sites.subDomain` の一意インデックスが、データベースレベルでこれを支えています。

**ページの一意性** は、`(churchId, url)` から `(churchId, siteId, url)` に拡張されました。これにより、1つの教会の2つのサイトが、それぞれ独自の `/about` を持つことができます。

### フォールバックを伴うサイトごとのコンテンツ

サイトごとにスコープされるすべてのコンテンツの**一覧／ツリー**エンドポイントは、省略可能な `?siteId=` を受け取ります（省略時は ⇒ `''` = プライマリ）。対象は、ページのツリー／一覧／公開ページ、ブロックの一覧／種類別／フッター、リンク（匿名／フィルター済み／すべて）、およびグローバルスタイルです。セクションと要素は直接スコープされません。それらは親のページまたはブロックを通じて継承します。

2つの解決チェーンが、注目すべき処理を行います。

- **グローバルスタイル — `サイト → プライマリ → デフォルト`。** `GlobalStyleRepo.loadForChurch(churchId, siteId)` は、そのサイト自身の行を返します。セカンダリサイトに行がない場合は、**プライマリ（`''`）の行をそのまま**返します（クライアントがコピーオンライトに使用する、プライマリの `id`／`siteId` を保持します）。プライマリの行もない場合、`GlobalStyleController` はハードコードされたデフォルトのパレット／フォントを返します。
- **フッターブロック — サイト固有のものが優先され、共有のものがフォールバックになります。** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` は、共有の（`''`）行と*サイト固有の*行の両方を返します。リゾルバーは、サイト自身のフッターが存在すればそれを選び、なければ共有のフッターを選びます。同じロジックが、`TreeHelper.insertBlocks`（ページツリー）と単独の `/content/blocks/public/footer/:churchId` エンドポイントの両方で実行されます。

### サイト削除時のカスケード

`SiteController.delete`（メンバーシップの Settings→Edit 権限によって制限されます）は、セカンダリサイトを次の3つのステップで削除します。

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` は、そのサイトが所有するすべてのコンテンツをカスケード削除します。すなわち、その**ページ** → それらのセクション、要素、`pageHistory`、`posts`。そのサイト自身の**ブロック** → それらのセクション、要素、`pageHistory`。さらに、その**リンク**と **globalStyles**。`''` に対してはガードにより実行が拒否されます。プライマリ／共有のセンチネル値は、決してカスケード削除されません。
2. `DomainRepo.clearSiteId` は、サイトのドメインを削除するのではなく、プライマリに**再割り当て**します（`siteId → ''`）。そのため、サイトを削除してもカスタムドメインは残ります。
3. `sites` の行が削除され、Caddy のルートが再同期されます（ベストエフォート）。

### B1Admin の画面

| 機能 | 場所 | 仕組み |
|-----------|-------|-----------|
| サイト切り替え | `useSiteSelection` + `SiteSwitcher`（空 = "Main Website"） | URL パラメーター `?site=` を読み取り、ContentApi の呼び出しに `?siteId=` として受け渡します。サイトの 3 つの**一覧**領域（**Pages**、**Blocks**、**Appearance**）に表示されます。ただし、レコードに `siteId` を持つページ／ブロックのエディターには表示されません |
| サイトの作成／削除 | `SitesDialog`。切り替え機能の "Manage websites…" の項目から開きます | `POST /membership/sites` / `DELETE /membership/sites/:id`（名前と subDomain）。メンバーシップの Settings→Edit 権限によって制限されます（サーバー側は `Permissions.settings.edit`、B1Admin では `Permissions.membershipApi.settings.edit`）。**作成と削除のみ可能です。v1 には名前変更の UI はありません** |
| ドメインごとのサイト割り当て | Settings→Domains の下にある `DomainSettingsEdit` | 行ごとのサイトのドロップダウンは、ドメインごとの `siteId` を `/membership/domains` に送信します。API がサイトを返さない場合（古いバックエンド）は、この列は非表示になります |
| コピーオンライトのスタイル | `StylesManager.prepareForSave` | 読み込まれたグローバルスタイルの行の `siteId` が、選択されているサイトと一致しない場合（つまり API がフォールバックとして継承されたプライマリを返した場合）、プライマリの `id` を削除し、現在の `siteId` を設定します。これにより、プライマリを上書きする代わりに、サイト固有の新しい行の**挿入**が強制されます。同じ不一致による分岐は、サイトのフッターブロックにも適用されます |

:::info
**v1 で教会全体の設定のままとなるもの（データモデルの制限ではなく、意図的なスコープの選択です）：** **ブログ**（`BlogPage` には切り替え機能がなく、`siteId` なしで `/posts` を読み込みます）、**サイトのウィジェット**（お知らせバナーとランチャー）、**リダイレクト**、**ロゴ／GA4／教会の設定**、および**メンバーポータル**（B1App のモバイル）。これは「Appearance 全体」を指すものではないことに注意してください。セカンダリサイトのグローバルスタイル（パレット、フォント、タイポグラフィ、間隔、ナビゲーション、カスタム CSS）は、上記のコピーオンライトの仕組みによって**サイトごと**に設定されます。教会全体のままなのは、Appearance ページのバナー／ランチャー／リダイレクト／ロゴのサブパネルだけです。
:::

## カスタムドメイン：Caddy エッジ（静的設定の計画）

:::info
**方針の変更（2026-07-02）。** カスタムドメインのホスティングを Vercel 管理のドメインに移行する以前の計画は**中止されました**。Vercel のドメイン登録に関するコード一式（`VercelHelper`、その `vercelToken`／`vercelProjectId`／`vercelTeamId` の環境変数、SSM パラメーター、およびヘルスチェックの項目）は、API から削除されました。EC2 上のセルフマネージドな **Caddy プロキシは残り**、カスタムドメインの恒久的なエッジとなります。残っている作業は内部的なものだけです。つまり、Caddy の*ランタイム*の管理 API による設定を、再起動後も維持される*静的*な設定に置き換えることです。
:::

### エッジ

すべての教会のカスタムドメインは、DNS を 1 台の EC2 インスタンス（`3.23.251.61`、`proxy.b1.church` でもアクセス可能）に向けます。B1Admin の Settings→Domains 画面では、教会に対して、ルートドメイン（apex）に `A → 3.23.251.61` を、または `CNAME → proxy.b1.church` を追加するよう案内されます。Caddy は、ドメインごとの Let's Encrypt 証明書で TLS を終端し、`Host` ヘッダーをそのドメインの `{sub}.b1.church` のアップストリームに書き換えて、B1App にリバースプロキシします。B1App は、その後、ネイティブのサブドメインと同じようにホストラベルでルーティングします（上記の[カスタムドメイン](#custom-domains)を参照）。

アップストリームのマッピングは `DomainRepo.loadPairs` から取得されます。その dial（接続先）は、割り当てられたサイトのサブドメインを **COALESCE** することで、ドメインが正しい*セカンダリ*サイトにプロキシされるようにします。該当しない場合は、教会のプライマリにフォールバックします。

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

`www.*` の行はマップから除外されます。代わりに、Caddy は `www.{host}` に対して、ルートドメインへの `302` リダイレクトで応答します。

### エッジに情報を供給する2つの匿名エンドポイント

`DomainController` は、インスタンスが直接利用する、認証不要の読み取り専用エンドポイントを2つ公開しています。エッジは教会のコンテキストが存在する前にこれらを照会するため、必然的に匿名となっています。

| エンドポイント | 返すもの | 役割 |
|----------|----------|------|
| `GET /membership/domains/authorize?domain=` | ドメインが `domains` に存在する場合（`www.` で一致しなかった場合は、そのルートドメインが存在する場合）は `200`。それ以外は（空の `domain` を含む）`404` | Caddy の**オンデマンド TLS の `ask`**。受信した SNI に対して証明書を発行するかどうかを判断する、不正利用防止の制御です |
| `GET /membership/domains/hostmap` | `text/plain`。ルーティング可能なドメインごとに 1 行ずつ、ソート済みの `{domain} {sub}.b1.church` を返します | インスタンスがタイマーで更新する、ホストからアップストリームへのマップファイル |

`authorize` は `DomainRepo.loadByName` を再利用します（完全一致するホスト、その後 `www.` からルートドメインへの1回の再試行）。`hostmap` は `loadPairs` を再利用します。そのため、サイトを認識し、`www.*` を除外しており、プロキシのルートと同一です。また、`:443` のサフィックスを取り除くだけです。

### ドメインの保存／削除 — ベストエフォートの通知は1回

`DomainController.save` は `domains` の行を書き込み、その後、**ベストエフォートの** `CaddyHelper.updateCaddy()` 呼び出しを1回行います。この呼び出しは `try/catch` で囲まれており、エラーはログに記録され（`console.error`）、握りつぶされます。`delete` も同様に行います（これにより、以前の削除時にルートが古いまま残るバグも修正されました）。セカンダリサイトの削除（`SiteController.delete`）も同様です。`updateCaddy` 自体は **10 秒** の Axios タイムアウトで制限されているため、到達不能または停止した Caddy が、ドメインの保存で `500` を返すことは決してありません。`domains` テーブルが正となる情報源です。

### 現在の状態 — 静的な設定、ランタイムの状態なし

このインスタンス（固定の Elastic IP の背後にある Windows EC2）は、**静的な Caddyfile** で Caddy を実行します。`ask` が `/membership/domains/authorize` を指すオンデマンド TLS と、`/membership/domains/hostmap` から 5 分ごとに更新されるホストからアップストリームへのマップファイルを使用します。この更新は、スケジュールされたタスクによって行われ、最後に正常な `caddy reload` を実行します。設定はランタイムの状態を持たずに再起動後も維持されます。再初期化の手順は不要です。未知の SNI は **TLS で拒否**されます（`authorize` が拒否したホストに対して証明書は発行されません）。一方、認可されているがまだマップされていないホスト（同期期間内の新規ドメイン）には、きれいな 404 が返されます。新しいドメインは、保存から約 5 分以内にルーティング可能になります。その証明書は、最初のアクセス時に発行されます。ビルドとセットアップ、運用、そして実運用で確認された注意点については、[Caddy カスタムドメインプロキシ](../deployment/caddy-proxy)を参照してください。

### 従来のランタイムへの通知 — ロールバック用の経路、削除予定

`CaddyHelper`（メンバーシップモジュール）は、`caddyHost:caddyPort` にある**管理 API** を通じて、依然として Caddy を操作できます（SSM の `caddyHost`／`caddyPort`。未設定の場合は何もしません。`ServerHealthController` の Integrations グループに表示されます）。`updateCaddy()` は、ルートの配列全体を PATCH で送信します。`initializeCaddy()` と、`GET /membership/domains/caddy/init` ／ `GET /membership/domains/caddy` のエンドポイントは、ランタイムで設定されたサーバーを最初から再構築します。このモードの設定は Caddy のメモリ内にのみ存在していました。これは、今回のアーキテクチャが置き換えた、再起動で設定が失われる問題です。この仕組みは、ロールバック用の経路としてのみ残されており、静的なインスタンスが安定稼働した後に削除される予定です。ドメインの保存／削除時のベストエフォートの `updateCaddy()` 通知は、静的なインスタンスに対しては何もしない処理（no-op）として無害です（その管理 API は localhost からのみアクセス可能です）。

## 関連ページ

- [Caddy カスタムドメインプロキシ](../deployment/caddy-proxy) — エッジのインスタンスそのもの。新規インスタンスのセットアップ、WinSW サービス、マップ同期タスク、および運用上の注意点
- [ウェブサイトビルダー](./website-builder) — ページ／セクション／要素のツリー、レンダラー、ブログ、SEO、AI による生成（リクエストが教会／サイトに解決された後に描画される内容）
- [コンテンツエンドポイント](../api/endpoints/content) — ページ、ブロック、リンク、グローバルスタイルの REST インターフェース。すべてが `?siteId=` に対応するようになりました
- [B1App](../web-apps/b1-app) — ミドルウェアと `[sdSlug]` ルーティングをホストする Next.js アプリ
- [Web アプリのデプロイ](../deployment/web-apps) — B1App を Vercel にデプロイする方法
