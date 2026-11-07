---
title: "MCP サーバー"
description: "B1 API への MCP アクセスを設定し、Claude Code、Cursor、Claude Desktop などの AI クライアントが API キーまたは OAuth サインインを使って教会のデータエンドポイントを呼び出せるようにします。"
---

# MCP サーバー

<div class="article-intro">

B1 API には、`/mcp` で利用できる [MCP (Model Context Protocol)](https://modelcontextprotocol.io) サーバーが含まれています。claude.ai のカスタムコネクタ、Claude Code、Claude Desktop、OpenAI Agents SDK、Cursor など、MCP に対応した AI クライアントや独自のクライアントから接続し、認証済みの教会ユーザーの代わりに基盤となる REST API を呼び出せます。これは汎用的な薄いラッパーです。各エンドポイントを個別に定義する代わりに、3 つの汎用ツールで API 全体を動的に公開します。加えて、ウェブサイトビルダー向けのドメインガイドツールが 1 つあります。

</div>

<div class="prereqs">
<h4>始める前に</h4>

- クライアントに必要なスコープを付与した [B1 API キー](./api-keys.md)（`cak_…`）。または OAuth でサインインできる MCP クライアント（[OAuth Discovery](#oauth-discovery) を参照）
- 到達可能な B1 API のホスト。ホスト型の教会の場合は `https://api.churchapps.org`、自前でデプロイしている場合はそのエンドポイント
- MCP クライアント。エンドユーザー向けのセットアップは [Claude](/docs/b1-admin/integrations/claude) と [ChatGPT](/docs/b1-admin/integrations/chatgpt) を参照してください

</div>

## エンドポイント

```
POST /mcp
Content-Type: application/json
Accept: application/json, text/event-stream
Authorization: Bearer cak_<prefix>.<secret>
```

| 項目 | 値 |
|---|---|
| **パス** | `/mcp`（API ホストからの相対パス） |
| **メソッド** | `POST` のみ。リクエスト/レスポンスも SSE ストリーミングも同じエンドポイントで行われます |
| **トランスポート** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **セッションモデル** | ステートレスです。リクエストごとに新しい MCP サーバーインスタンスが生成されます。セッション ID も再開機能もありません |
| **認証** | Bearer トークン。`cak_…` の API キーと B1 JWT（OAuth アクセストークンを含む）のいずれも使用できます。解決方法は他の認証必須エンドポイントと同じです |

`Authorization` ヘッダーがない、または無効なリクエストには、次の応答が返されます。

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

このとき、HTTP ステータスは 401 で、`WWW-Authenticate: Bearer resource_metadata="<api>/.well-known/oauth-protected-resource"` ヘッダーが付与されます。OAuth に対応したクライアントは、このヘッダーに従ってサインインを開始します。

ホスト型 API（本番環境とデモ環境）では、`/mcp` は他のエンドポイントで使われる REST API ではなく、API Gateway の HTTP API を経由して提供されます。REST API は Lambda プロキシのレスポンスで `WWW-Authenticate` を `x-amzn-remapped-www-authenticate` に変換してしまいます。その結果、ChatGPT などのクライアントはサインインを開始する手段のないベア 401 を受け取っていました。HTTP API ではこのヘッダーがそのまま渡されます。

## ツール

汎用ツール 3 つと、ガイド 1 つがあります。モデルは、探索に `list_endpoints`、ペイロードの形を確認するために `describe_endpoint`、実際の API 呼び出しに `api_call` を使います。ウェブサイトのコンテンツに関わる作業では `describe_page_builder` を使います。

### `list_endpoints`

登録済みの REST ルートの一覧を返します。省略可能な部分文字列と HTTP メソッドで絞り込めます。各項目には、コントローラー名と、必要になる可能性が高い API キーのスコープが含まれます。

**入力:**

| フィールド | 型 | 説明 |
|---|---|---|
| `filter` | string（省略可） | パスに対して大文字と小文字を区別せずに照合する部分文字列（例: `"people"`） |
| `method` | enum（省略可） | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**出力:** 次の形式の JSON ドキュメントです。

```json
{
  "total": 24,
  "endpoints": [
    {
      "method": "GET",
      "path": "/membership/people",
      "controller": "PersonController.getAll",
      "likelyScopes": ["people:read", "people:write"]
    }
  ]
}
```

一覧は API の起動時に、稼働中のルートテーブルから一度だけ構築されます。`curl` で呼び出せるものはすべてここに表示されます。

### `describe_endpoint`

1 つのエンドポイントについて、短い概要を返します。用意されている場合は、手作業で作成されたリクエストボディとレスポンスのサンプルも含まれます。

**入力:**

| フィールド | 型 | 説明 |
|---|---|---|
| `method` | string | HTTP メソッド |
| `path` | string | `list_endpoints` が返す完全なパス |

**出力:** サンプルが用意されているエンドポイントでは、`summary`、`requestBody`、`responseSample` を含む例が返されます。サンプルのないエンドポイントでは、フォールバックのメッセージが返されます。このメッセージは、モデルに対してまず `GET` を呼び出して形を確認するよう指示します。アクセスの多い主要ルート（people、groups、donations、attendance、funds）のうち、十数件にサンプルが用意されています。

### `api_call`

選択した REST エンドポイントを、プロセス内で、通常の HTTP リクエストと同じ Express のミドルウェアスタックを通して呼び出します。認証、ボディの解析、監査ログ、教会ごとのスコープ制限がすべて適用されます。

**入力:**

| フィールド | 型 | 説明 |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | string | モジュールのプレフィックスを含むパス（例: `/membership/people`） |
| `query` | object（省略可） | クエリ文字列パラメーターのフラットなオブジェクト |
| `body` | any（省略可） | JSON のリクエストボディ。通常は `POST` 用のモデルオブジェクトの配列 |

**出力:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* the controller's JSON response */ ]
}
```

ステータスが 400 以上のレスポンスでは、ツールの結果に `isError: true` が付与されます。

### `describe_page_builder`

汎用ではない唯一のツールです。`/content/*` エンドポイントを通じてウェブサイトのページを作成する、静的で自己完結したガイドです。Page → Section → Element のデータモデル、作成の手順、各 `elementType` とその `answersJSON` の形、`dividerTop`/`dividerBottom` の形状区切りのようなセクションレベルの設定、エンドツーエンドの具体例を扱います。B1Admin エディターで管理されている要素のカタログを反映しています（[ウェブサイトビルダーのアーキテクチャ](../architecture/website-builder.md)を参照）。エージェントは、ページコンテンツを作成または編集する前に一度このツールを呼び出し、その後 `api_call` で操作することが想定されています。

## 認証モデル

MCP リクエスト自体は `CustomAuthProvider.getUser()` を通過します。これは、認証が必要な B1 エンドポイントがすべて使用する経路と同じです。`cak_…` のベアラーは `Principal` に解決されます。その権限は、キーを発行した人物の現在の RBAC と、キーに付与されたスコープの**積集合**です。この積集合はリクエストごとに再計算されるため、次のようになります。

- キーからスコープを削除すると（キーを削除して作り直すことで）、次の呼び出しからアクセスが無効になります。
- B1Admin で基盤となる人物から権限を削除すると、キーがまだ存在していても、次の呼び出しからアクセスが無効になります。

入れ子になった `api_call` の呼び出しでは、元の `Authorization` ヘッダーが合成リクエストにコピーされます。そのため `CustomAuthProvider` が再び実行され、スコープの積集合が呼び出しごとに再適用されます。トークンのキャッシュは行いません。

## パスのブロックリスト

有効なキーがあっても、`api_call` からは到達できないルートがいくつかあります。

| パターン | 理由 |
|---|---|
| `/giving/donate/webhook/*` | プロバイダーの Webhook エンドポイントは、Stripe/PayPal から署名検証済みの生のボディを受け取ることを前提としており、一般の呼び出し元を想定していないため |
| `/membership/oauth/clients*` | OAuth クライアントの登録は運用者のみが行うため |
| `/membership/people/apiEmails` | ユーザー権限ではなく、運用者の `jwtSecret` によって保護されているため |
| `multipart/form-data` を要求する任意のルート | ファイルのアップロードは JSON-RPC と相性が良くないため |

ブロックされたパスは、説明的なメッセージとともに `isError: true` のツール結果を返します。基盤となるルートは呼び出されません。

## レスポンスサイズの上限

`api_call` の各レスポンスボディは、取得された出力が **64 KB** を上限とします。クエリが上限を超えると、レスポンスには `"truncated": true` が付与され、モデルはより絞り込んだクエリパラメーターで再試行することが期待されます。これにより、1 回のツールレスポンスがクライアントのコンテキストウィンドウを使い切ることを防ぎます。

## レート制限

`/mcp` にはアプリケーションレベルのレート制限はありません。本番環境では、スロットリングは API Gateway と Lambda の同時実行数制御に任されています。自前でホストしている場合は、リバースプロキシが適用する制限に従います。

## OAuth Discovery

MCP サーバーは OAuth 2.1 のメタデータを公開しています。これにより、OAuth で検出されたサーバーにしか接続しないクライアント（特に Claude.ai の「カスタムコネクタを追加」画面）でも、貼り付けたキーを使わずにユーザーをサインインさせられます。`/mcp` が保護されたリソースであり、`/membership/oauth` にある既存の [OAuth プロバイダー](./connected-apps.md)が認可サーバーとして機能します。B1Admin の `/oauth` ページが同意画面になります。

| エンドポイント | 目的 |
|---|---|
| `GET /.well-known/oauth-protected-resource`（`/.well-known/oauth-protected-resource/mcp` も可） | 保護されたリソースのメタデータ（RFC 9728）。`resource` は `<api>/mcp`、`authorization_servers` は API のルート、`scopes_supported` はすべての [API キースコープ](./api-keys.md#scopes)を一覧にします |
| `GET /.well-known/oauth-authorization-server` | 認可サーバーのメタデータ（RFC 8414）。`authorization_endpoint` は B1Admin の `/oauth`、`token_endpoint` は `/membership/oauth/token`、`registration_endpoint` は `/membership/oauth/register` です |
| `POST /membership/oauth/register` | 動的クライアント登録（RFC 7591） |

claude.ai などのクライアントが実行する流れは次のとおりです。

1. トークンなしで `POST /mcp` を呼び出すと、保護されたリソースのメタデータを指す `WWW-Authenticate` ヘッダーとともに 401 が返されます。
2. クライアントは両方のメタデータドキュメントを読み取り、`POST /membership/oauth/register` で自身を登録します。送信するのは `client_name`、`redirect_uris`、必要に応じて `scope` です。自己登録されたクライアントはすべて**パブリッククライアント**になります。シークレットは発行されず、レスポンスには `token_endpoint_auth_method: "none"` が含まれます。リダイレクト URI は `https` である必要があります。ループバックアドレス（`localhost`、`127.0.0.1`、`[::1]`）の場合のみ `http` を使えます。クライアントごとに登録できる URI は最大 10 件です。登録は IP アドレスごとに 1 時間あたり 20 件に制限されます。
3. ユーザーは `code_challenge` と `code_challenge_method=S256` を付けて B1Admin の `/oauth` に移動します。同意画面には要求された各スコープが平易な言葉で表示されます（スコープの指定がない場合は「B1 アカウントでアクセスできるすべての情報」と表示されます）。また、ユーザーが戻される先のホストを示し、アプリが自己登録したことを通知します。ユーザーが **Allow** をクリックします。
4. クライアントは `grant_type=authorization_code` と `code_verifier` を使って `/membership/oauth/token` でコードを交換し、その後 `grant_type=refresh_token` でトークンを更新します。フォームエンコードされたボディと JSON のボディの両方を受け付けます。
5. 得られるアクセストークンはスコープ付きの B1 JWT であり、`/mcp` へのベアラーとして使用します。

PKCE のルール: 受け付けるのは `S256` のみです。シークレットを持たないクライアントは、認可時に `code_challenge` を送信し、トークン交換時に対応する `code_verifier` を送信する必要があります。機密クライアント（シークレットを持つもの）は、シークレットだけを使うこともできます。リダイレクト URI は、登録されている URI と完全に一致する必要があります。

Claude Code、Claude Desktop、OpenAI Agents SDK、Cursor、独自のコードなど、設定で静的なベアラートークンを受け付けるクライアントは、代わりに `cak_…` キーを使い続けることができます。

## ローカル開発

API をローカルで実行すると、MCP エンドポイントは他の機能と並んでマウントされます。

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

起動時に出力されるログ行 `📡 MCP server ready at /mcp — N routes in inventory` で、一覧が構築されたことを確認できます。

MCP Inspector で動作を確認します。

```bash
npx @modelcontextprotocol/inspector
```

Inspector の UI で `http://localhost:8084/mcp` を指定し、`Authorization` ヘッダーに `Bearer cak_<prefix>.<secret>` を設定します。まず `list_endpoints` を呼び出すと、ルートの完全な一覧が表示されるはずです。次に `api_call({ method: "GET", path: "/membership/people" })` を呼び出すと、ローカルのシードデータの人物が返されるはずです。

## コードの構成

MCP サーバーは Api リポジトリの `src/modules/mcp/` にあります。主なファイルは次のとおりです。

| ファイル | 目的 |
|---|---|
| `McpController.ts` | `@controller("/mcp")`。リクエストごとに `StreamableHTTPServerTransport` を組み込み、401 の際に `WWW-Authenticate` の認証チャレンジを送信します |
| `WellKnownController.ts` / `OAuthMetadata.ts` | `/.well-known` の OAuth 検出ドキュメントを提供します |
| `McpServer.ts` | MCP の `Server` を構築し、4 つのツールを登録します |
| `RouteInventory.ts` | 起動時に inversify-express-utils のメタデータをたどり、ルートを列挙します |
| `internalDispatch.ts` | プロセス内で Express アプリに再び入る、合成の `req`/`res` を提供します |
| `tools/` | `listEndpoints.ts`、`describeEndpoint.ts`、`apiCall.ts`、`describePageBuilder.ts` |
| `examples.ts` | アクセスの多いエンドポイントについて、手作業で作成したリクエスト/レスポンスのサンプル |

## 関連項目

- [API キー](./api-keys.md)
- [Webhook](./webhooks.md)
- [接続済みアプリ（OAuth）](./connected-apps.md)
- [Claude — エンドユーザー向けセットアップ](/docs/b1-admin/integrations/claude)
- [ChatGPT — エンドユーザー向けセットアップ](/docs/b1-admin/integrations/chatgpt)
