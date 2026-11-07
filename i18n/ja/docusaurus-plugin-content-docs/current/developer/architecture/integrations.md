---
title: "連携と拡張のサーフェス"
description: "ChurchApps B1 に接続する方法の一覧です。REST API、API キー、OAuth、Webhook、MCP、コンテンツプロバイダーを扱い、それぞれのリファレンスへのリンクがあります。"
---

# 連携と拡張のサーフェス

<div class="article-intro">

サードパーティが接続できるものはすべて、1 つの API と 1 つの認可モデルを経由します。このページはその全体像です。連携先のすべてのサーフェスを示し、それらがどのように接続されるかを説明し、各サーフェスの詳細なリファレンスへのリンクを提供します。B1 向けに開発する場合は、まずここで適切な入口を選び、そのあとリンク先で詳しい説明を確認してください。

</div>

## サーフェスの概要

外部とやり取りする方法は 6 つあり、いずれも同じ認証レイヤーを共有しています。

- **[REST API](../api/api-keys.md)** — 製品のサーフェス全体で、任意の言語からベアラートークンを使って呼び出せます。
- **[API キー](../api/api-keys.md)** — 最も簡単な認証情報です。1 つの教会の 1 人の人物に紐づく `cak_…` トークンです。
- **[OAuth 2.0 と接続アプリ](../api/connected-apps.md)** — マルチテナントアプリ向けに教会ごとの同意を管理します。ユーザーが取得するものと同じ JWT を発行します。
- **[Webhook](../api/webhooks.md)** — 署名付きで、確実に配信される送信イベントです。
- **[MCP サーバー](../api/mcp.md)** — `/mcp` で提供される、REST API を AI から利用するためのラッパーです。
- **[コンテンツプロバイダー](../freeplay-content-provider.md)** — 外部のメディアライブラリを FreePlay と B1 アプリに取り込む受信経路です。

コンテンツプロバイダー以外のすべては、単一のモノリシックな API（[Api](https://github.com/ChurchApps/Api) リポジトリ）で提供されます。その各モジュールは、`/membership`、`/giving`、`/attendance`、`/content`、`/messaging`、`/doing`、`/reporting`、`/mcp` といった固定のベースパスの下にマウントされています。

## 全体の仕組み

```
   ┌─────────────────────┐                          ┌───────────────────────────────────────┐
   │  Third-party app     │   Bearer  cak_… / JWT    │              B1 API (Api)              │
   │  · server / SaaS     │ ───────────────────────▶ │  ┌─────────────────────────────────┐  │
   │  · Zapier / Make     │                          │  │ CustomAuthProvider.getUser()    │  │
   │  · Google Sheets     │                          │  │   cak_ key ─┐                    │  │
   │  · CLI / scripts     │                          │  │   OAuth JWT ┴▶ Principal          │  │
   │  · AI client (MCP)   │ ─── POST /mcp ──────────▶ │  │   scopes filter → permissions[] │  │
   └─────────────────────┘                          │  └────────────────┬────────────────┘  │
             ▲                                        │                   ▼                    │
             │                                        │  API modules: /membership /giving     │
             │        signed JSON POST                │  /attendance /content /messaging …    │
             │   (person / donation / group / …)      │                   │                    │
             └──────────── webhooks ◀─────────────────┼─ shared/webhooks/WebhookDispatcher     │
                     (durable, HMAC-SHA256 signed)     └───────────────────────────────────────┘

   External content sources (Planning Center, Dropbox, Life.Church, CBN, …)
             │   OAuth PKCE / device flow / none   ──  B1 is the OAuth *client* here  ──▶
             ▼
   Packages/content-providers   ──▶   FreePlay / B1 apps        (inbound content path)
```

この図の矢印は 3 つで全体を表しています。サードパーティは、ベアラートークン（API キーまたは OAuth JWT、`/mcp` 経由を含む）を使って**呼び出し**ます。API は署名付き Webhook を通じて**呼び返し**ます。そして、コンテンツプロバイダーは B1 自体が OAuth の*クライアント*として外部ソースからメディアを取得する、唯一の**コンテンツの受信**経路です。

## 共通の認証モデル

ユーザーのログイン JWT、OAuth アクセストークン、API キーのいずれであっても、すべての認証情報は**同一の `Principal`** に解決され、同じ方法で検証されます。「連携用の認証」という別の経路は存在しません。スコープ付きの認証情報は、権限の低いユーザーと区別がつきません。

### JWT の構造

B1 のアクセストークンは HS256 の JWT で、`Api/src/modules/membership/auth/AuthenticatedUser.ts` で発行されます。クレームセットは次のとおりです。

| クレーム | 意味 |
|---|---|
| `id`、`email`、`firstName`、`lastName` | トークンの持ち主である人物 |
| `churchId` | このトークンが動作する単一の教会。すべてのデータスコーピングの基準になります |
| `personId` | その教会内の人物レコード |
| `permissions` | RBAC の権限文字列（`[apiName_]contentType_contentId_action`）のフラットな配列 |
| `groupIds`、`leaderGroupIds` | グループ単位のチェックに使う、グループへの所属と指導者の情報 |
| `membershipStatus` | セルフサービスの制御に使う、ゲストか会員かの区別 |

OAuth アクセストークンの形式はログイン JWT とバイト単位で同一です。違いは、`permissions` 配列が署名前に付与されたスコープでフィルタリングされている点だけです（`getCombinedApiJwt(...)`）。

### 教会ごとのスコーピング

`churchId` はリクエストパラメーターではなくトークンのクレームなので、認証情報が教会の枠を越えてアクセスすることはできません。すべてのリポジトリクエリは呼び出し元の `churchId` でフィルタリングされ、API キーや OAuth トークンは発行時に 1 つの教会に厳密に紐づけられます。

### 境界での役割ベースの権限

コントローラーは、トークンの `permissions` 配列に対して `au.checkAccess(contentType, action)` を呼び出して操作を制御します。スコープは**フィルターであり、権限の付与ではありません**（`Api/src/shared/auth/Scopes.ts`）。`SCOPE_CATALOG` は各スコープ（例：`people:read`、`donations:write`）を、それが許可する RBAC の組み合わせに対応付けます。`filterPermissionsByScopes()` は、解決のたびにそれを人物の*現在の*権限と突き合わせます。その結果、次のことが成り立ちます。

- B1Admin で権限を取り消すと、次のリクエストから認証情報のアクセスも止まります。トークンが役割からずれることはありません。
- スコープは権限を*削除する*ことしかできないため、スコープ付きの認証情報がサーバーやドメインの管理者権限に昇格することはありません（これらの権限はどのスコープにも意図的に対応付けられていません）。
- API キーには `cak_` の接頭辞が付きます。`CustomAuthProvider.getUser()` はこの接頭辞で分岐し、シークレットをハッシュ化して、呼び出しのたびに所有者の人物の現在の RBAC を解決し直します。

スコープの全一覧は [API キー → スコープ](../api/api-keys.md#scopes) を参照してください。

## サーフェスのリファレンス

### REST API

製品のサーフェス全体です。認証が必要なエンドポイントはすべて、`Authorization: Bearer` ヘッダーで JWT または `cak_…` API キーを受け付けます。API キー専用や OAuth 専用のルートテーブルは別途存在しません。モジュールとそのベースパスは `Api/src/modules/*` にあります。

### API キー

`cak_<prefix>.<secret>` 形式の個人用アクセストークンで、**B1Admin → Settings → Developer → API Keys** で作成します。保存されるのは SHA-256 のハッシュだけで、元のキーは一度だけ表示されます。`/membership/apiKeys` で管理されます（`Api/src/modules/membership/controllers/ApiKeyController.ts`）。1 つの教会の独自のスクリプトや、Zapier、Make、Google Sheets などのコネクターに最適です。→ **[API キー](../api/api-keys.md)**

### OAuth 2.0 と接続アプリ

各教会の同意が必要なマルチテナントアプリ向けです。`/membership/oauth` 配下の `Api/src/modules/membership/controllers/OAuthController.ts` に実装されています。サーバーは 3 種類の付与タイプをサポートしています。

- **認可コード** — 認証済みの `POST /oauth/authorize` が短命のコードを返します。`grant_type=authorization_code` を指定した `POST /oauth/token` でそれをアクセス JWT（約 7 日間）とリフレッシュトークン（約 90 日間）に交換します。シークレットを持たない公開クライアントは PKCE（`S256` のみ）を使う必要があり、認可時に `code_challenge`、トークン交換時に対応する `code_verifier` を指定します。
- **デバイスコード**（RFC 8628） — `POST /oauth/device/authorize` が `user_code` を発行し、ユーザーが B1Admin（`/oauth/device/approve`）でそれを承認します。デバイスは、デバイスコードの付与タイプを使って `/oauth/token` をポーリングします。ブラウザがないテレビ、キオスク、CLI 向けです。
- **リフレッシュトークン** — `grant_type=refresh_token` で新しいアクセストークンを発行します。シークレットを持たない公開クライアントはシークレットを省略できます。

公開クライアントは `POST /oauth/register`（RFC 7591 の動的クライアント登録）で自分自身を登録することもできます。登録すると `client_id` が得られ、シークレットはありません。リダイレクト URI は `https` またはループバックである必要があります。

**接続アプリ**は、付与されたトークンを教会の管理者向けに表示したもので、`/membership/oauth/connections` で一覧表示と取り消しができます。コントローラーには、ブラウザのないデバイスが*外部*プロバイダーに対してサインインを完了できるようにする、OAuth の**リレーセッション**ブリッジ（`/oauth/relay/*`）も含まれています。→ **[接続アプリと OAuth](../api/connected-apps.md)**

### Webhook

唯一の送信サーフェスです。教会は公開された HTTPS エンドポイントをイベントに登録します。該当する変更が発生すると、`WebhookDispatcher.emit(churchId, event, payload)` が ID のみのペイロードに表示名（`personName`、`groupName`、`formName`。検索はサブスクリプションが一致した後にのみ実行されます）を補い、配信を記録します。バックグラウンドワーカーが、リトライとバックオフ、再配信を伴って、署名付きの JSON エンベロープを POST します。エンジンは `Api/src/shared/webhooks/` にあり、教会ごとの CRUD は `/membership/webhooks`（`WebhookController.ts`）で提供されます。`connectorType` フィールドは Slack や Discord 向けにボディの形式を変えます。`mailchimp` コネクターはさらに進んで、HTTP のやり取り全体を担当します（イベントごとのメソッド、URL、認証を Mailchimp の API に対して行い、認証情報は `webhooks.connectorConfig` に暗号化して保存されます）。→ **[Webhook](../api/webhooks.md)**

### MCP サーバー

`/mcp`（`Api/src/modules/mcp/`）で提供される、AI 向けのラッパーです。`list_endpoints`、`describe_endpoint`、`api_call` の 3 つの汎用ツールで、REST API のサーフェス全体を任意の MCP クライアントに動的に公開します。認証は他のものと同じベアラートークンです。OAuth でサインインするクライアント（claude.ai のカスタムコネクター）向けには、`/mcp` からの 401 応答に `/.well-known/oauth-protected-resource` を指す `WWW-Authenticate` ヘッダーが付きます。また、`/.well-known/oauth-authorization-server` は `/membership/oauth` のエンドポイント、動的登録、PKCE、B1Admin の `/oauth` 同意ページを公開しています（`WellKnownController.ts`、`OAuthMetadata.ts`）。`api_call` はプロセス内で Express のスタックに再度入るため、すべての権限と教会のスコーピングのルールが引き続き適用されます。→ **[MCP サーバー](../api/mcp.md)**

### コンテンツプロバイダー

コンテンツの受信経路であり、API ではなく別パッケージ `Packages/content-providers`（`@churchapps/content-providers`）に含まれます。各プロバイダーは `IProvider` インターフェース（`src/interfaces.ts`）を実装します。これには `browse`、`getPlaylist`、`getInstructions` と認証用のフックが含まれます。そして、`Map` のレジストリ（`src/providers/registry.ts`）に自分自身を登録します。ここでは **B1 が OAuth クライアント**です。プロバイダーは `none`、`oauth_pkce`、`device_flow`、`form_login` のいずれかの `AuthType` を宣言し、共有のヘルパー（`OAuthHelper`、`DeviceFlowHelper`、`TokenHelper`、`ApiHelper`）が外部ソースに対してクライアント側の PKCE やデバイスフローを実行します。現在 11 のプロバイダーが提供されており、Planning Center、Dropbox、Life.Church、CBN、BibleProject、Jesus Film、Lessons.church、B1.church などが含まれます。これらは FreePlay と B1 アプリにコンテンツを供給します。→ **[FreePlay コンテンツプロバイダー](../freeplay-content-provider.md)**

**年間プラン**もこの経路を利用します。カリキュラムの発行者（`lessons.edit` 権限を持つ）は、Lessons.church の管理画面で、順序付けられた第 1〜3 週の一連の流れを管理します（`LessonsApi` のテーブル `yearPlans` と `yearPlanWeeks`。任意の `startMonth` と、週ごとの `anchor`（`easter` または `christmas`）を含みます）。LessonsApi の `GET /yearPlans/public` は、公開されている計画を匿名で提供します。その際、各週のプログラム、学習、会場をレッスンツリーから補完します。B1Admin の **Serving → Plans → Schedule Lesson → Apply Year Plan** がこのエンドポイントを利用し、対象の週ごとに 1 つの DoingApi プラン（`providerId=lessonschurch`、`providerPlanId=/lessons/{programId}/{studyId}/{lessonId}/{venueId}`）を書き込みます。`startMonth` を持つ計画は、固定された週を選んだ年に合わせて解決します（イースターはグレゴリオ暦の計算法、クリスマスは 12 月 25 日以前の日曜日）。そして、その間の期間を埋めます。`startMonth` を持たない計画では、第 N 週は依然として `startDate + (N−1)×7` 日にマッピングされます。外部の OLF プロバイダーの週や、パスが不完全な週は、適用時にスキップされます。教会は作成されたプランを通常のプランと同様に編集でき、FreePlay はプランに載っているものを再生します。

## まとめ

| サーフェス | 認証方式 | 方向 | 実装場所 | 参照 |
|---|---|---|---|---|
| REST API | `Bearer` JWT または `cak_…` キー | 受信 | `Api/src/modules/*` | [API キー](../api/api-keys.md) |
| API キー | SHA-256 でハッシュ化された `cak_` トークン | 認証情報 | `Api/.../membership/controllers/ApiKeyController.ts` | [API キー](../api/api-keys.md) |
| OAuth 2.0 / 接続アプリ | 認可コード（PKCE）・デバイス・リフレッシュ → JWT。動的クライアント登録 | 受信 | `Api/.../membership/controllers/OAuthController.ts` | [接続アプリ](../api/connected-apps.md) |
| Webhook | プッシュごとのシークレット、HMAC-SHA256 署名 | 送信 | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhook](../api/webhooks.md) |
| MCP サーバー | `Bearer` JWT、OAuth JWT（`/.well-known` で検出）、または `cak_…` キー | 受信（AI） | `Api/src/modules/mcp/` | [MCP サーバー](../api/mcp.md) |
| コンテンツプロバイダー | プロバイダーごと：なし / OAuth PKCE / デバイス / フォーム | コンテンツの受信 | `Packages/content-providers/` | [コンテンツプロバイダー](../freeplay-content-provider.md) |

## 提供されているコネクター

すべてを一から作らなくてもよいように、ChurchApps は上記のサーフェスの上に構築されたコネクターを提供しています。

- **[Slack と Discord](/docs/b1-admin/integrations/slack-discord)** — Webhook の `connectorType` が標準のエンベロープをチャットメッセージの形式に変換します。サードパーティのアカウントは不要で、すべて B1Admin で設定します。
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)** — `mailchimp` の connectorType は、人物を Mailchimp のオーディエンスに同期し、グループやリストの所属をタグにマッピングします（`Api/src/shared/webhooks/MailchimpConnector.ts`）。チャット系のコネクターと異なり、教会が指定した URL に POST するのではなく、イベントごとに独自の認証付きリクエスト（更新、アーカイブ、タグ付け）を発行します。API キーとオーディエンス ID は `webhooks.connectorConfig` に暗号化して保存されます。一方向で、標準のマージフィールドのみを扱います。
- **[Zapier](/docs/b1-admin/integrations/zapier)** と **[Make](/docs/b1-admin/integrations/make)** — Webhook のイベントをトリガーとし、REST API を通じて動作します。Zap やシナリオを有効にすると、独自の Webhook を登録します（`settings:write` 権限を持つキーが必要です）。Zapier アプリのソースは `Integrations` リポジトリの `zapier/` にあり、Zapier CLI で `zapier push` を使ってデプロイします。
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — API キーで認証するアドオンで、人物、寄付、グループ、出席のデータを必要なときにエクスポートします。
- **[Claude](/docs/b1-admin/integrations/claude)** と **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — `/mcp` を指す MCP クライアントです。

独自のコードから利用する場合は、**[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)**（`Packages/integration-sdk`）がこれらすべてをまとめています。型付きの REST クライアント、OAuth クライアント（認可コード・リフレッシュ・デバイスフロー）、Express ミドルウェア付きの HMAC Webhook 検証機能が含まれます。

## 関連ページ

- [API キー](../api/api-keys.md) — 最も簡単な認証情報と、スコープの一覧
- [接続アプリと OAuth](../api/connected-apps.md) — マルチテナントの同意フロー
- [Webhook](../api/webhooks.md) — 送信イベントのシステム
- [MCP サーバー](../api/mcp.md) — AI 連携のラッパー
- [FreePlay コンテンツプロバイダー](../freeplay-content-provider.md) — 受信コンテンツのソースになる方法
- [連携（エンドユーザー向け）](/docs/b1-admin/integrations/) — 提供されているコネクターのセットアップガイド
