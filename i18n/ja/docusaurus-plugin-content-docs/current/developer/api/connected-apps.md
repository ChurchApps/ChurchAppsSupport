---
title: "接続済みアプリ & OAuth"
---

# 接続済みアプリ & OAuth

<div class="article-intro">

B1 APIは OAuth 2.0 に対応しており、サードパーティのアプリケーションが各教会の管理者にデータへのアクセス許可を求めることができます。この仕組みでは、教会がパスワードや API キーを共有することはありません。**接続済みアプリ**とは、教会の管理者が承認した OAuth トークンのことです。接続を取り消すと、サードパーティアプリのアクセスは1クリックで停止します。マルチテナントの SaaS コネクタにはこの方法を使用してください。単一の教会との連携には、[APIキー](./api-keys)を推奨します。

</div>

<div class="prereqs">
<h4>始める前に</h4>

- 教会がアクセスを許可する前に、OAuth **クライアント**を登録しておく必要があります。登録は B1 のサーバー管理者が行うか、クライアント自身が[動的登録](#dynamic-client-registration)で行います。
- すべての OAuth エンドポイントは、メンバーシップモジュールの `/membership/oauth/...` 配下にあります。
- アクセストークンは JWT です。付与されたスコープでフィルタリングされたユーザーの権限を保持しています。

</div>

## 基本概念

| 用語 | 意味 |
|---|---|
| **OAuth クライアント** | サードパーティアプリそのものです。`client_id` で識別され、`client_secret` で保護されます。B1 に一度登録すると、それをインストールするすべての教会で共有されます。 |
| **接続済みアプリ** | 教会の管理者がクライアントにアクセスを許可した、特定の `(クライアント, 教会管理者)` の組み合わせです。各接続済みアプリは OAuth のリフレッシュトークンに紐づいています。 |
| **アクセストークン** | クライアントが API 呼び出しに使用する、有効期間の短い JWT です（約7日間）。ユーザーの JWT と同じ形式で、`Authorization: Bearer <jwt>` の形で送信します。 |
| **リフレッシュトークン** | クライアントが新しいアクセストークンを発行するために使用する、有効期間の長い不透明な文字列です（約90日間）。 |
| **スコープ** | アクセストークンで実行できる操作の範囲を絞り込みます。[スコープ一覧](./api-keys#scopes)を参照してください。 |

## 認可フロー

B1 は、RFC 6749 および RFC 8628 で定義された3つの OAuth フローに対応しています。

### 認可コードフロー（Web アプリ向け）

アプリにサーバー側のコンポーネントがあり、`client_secret` を非公開にできる場合に使用します。

1. **認可**

   ```http
   POST /membership/oauth/authorize
   Authorization: Bearer <user JWT>
   Content-Type: application/json

   { "client_id": "...", "redirect_uri": "https://app.example.com/cb",
     "response_type": "code", "scope": "people:read groups:read", "state": "xyz" }
   ```

   パブリッククライアント（`client_secret` を持たないクライアント）は、`"code_challenge": "..."` と `"code_challenge_method": "S256"` も送信する必要があります（PKCE、RFC 7636）。受け付けるのは `S256` のみです。

   レスポンスは `{ "code": "...", "state": "xyz" }` です。認可コードのエンドポイントは、意図的に認証付きの POST としています。アプリはユーザーの B1 JWT を取得し（通常は、ユーザーの B1 セッション内にボタンを設置して取得します）、同意の手順の一部として転送します。

2. **コードをトークンに交換**

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "authorization_code", "code": "...",
     "client_id": "...", "client_secret": "...", "redirect_uri": "..." }
   ```

   認可の手順で `code_challenge` を送信した場合は、対応する `"code_verifier": "..."` を含めてください。パブリッククライアントは verifier を送信し、`client_secret` は省略します。トークンエンドポイントは、JSON と form-encoded（`application/x-www-form-urlencoded`）のボディの両方を受け付けます。

   トークンのレスポンスは次のとおりです。

   ```json
   {
     "access_token": "eyJ...",
     "token_type": "Bearer",
     "expires_in": 604800,
     "created_at": 1715000000,
     "refresh_token": "abc123…",
     "scope": "people:read groups:read"
   }
   ```

3. アクセストークンの有効期限が近づいたら**リフレッシュ**します。

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "refresh_token", "refresh_token": "...",
     "client_id": "...", "client_secret": "..." }
   ```

   リフレッシュトークンは、90日間使用されないと期限切れになります。期限切れの場合は、教会の管理者が再度認可する必要があります。

### デバイスコードフロー（テレビ、キオスク、CLI 向け）

デバイスにブラウザがない場合に使用します。RFC 8628 で定義されています。

1. **デバイスコードをリクエスト**

   ```http
   POST /membership/oauth/device/authorize
   Content-Type: application/json

   { "client_id": "...", "scope": "content:read" }
   ```

   ユーザーに表示するコードと、ポーリングの間隔が返されます。

   ```json
   { "device_code": "...", "user_code": "WXYZ-1234",
     "verification_uri": "https://app.b1.church/device",
     "expires_in": 900, "interval": 5 }
   ```

2. `user_code` と `verification_uri` をユーザーに表示します。

3. `grant_type=urn:ietf:params:oauth:grant-type:device_code` と `device_code` を指定して、`/membership/oauth/token` を**ポーリング**します。標準的なレスポンスは次のとおりです。

   | エラー | 意味 |
   |---|---|
   | `authorization_pending` | ユーザーがまだ承認していません。提示された間隔でポーリングを続けてください。 |
   | `expired_token` | デバイスコードが `expires_in` を過ぎています。最初からやり直してください。 |
   | `access_denied` | ユーザーがリクエストを拒否しました。 |
   | _（エラーなし・200 OK）_ | 承認されました。ボディは `B1TokenResponse` です。 |

4. 承認されたら、`refresh_token` を保存し、期限が切れるまで `access_token` を使用します。

B1 SDK には `B1OAuthClient.awaitDeviceToken(...)` が含まれています。これは、RFC に準拠した適切なバックオフを使ってポーリングのループを代わりに実行します。

### リフレッシュトークン

`refresh_token` を保持していれば、いつでも単独のリクエストとして使用できます。

```http
POST /membership/oauth/token
{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "..." }
```

新しい `access_token` と `refresh_token` が返されます。**パブリッククライアント**（`client_secret` を持たないクライアント）は、リフレッシュ時に `client_secret` を省略できます。これは、秘密情報を保持できないモバイルやデスクトップの OAuth アプリに便利です。

リフレッシュトークンはローテーションされますが、古いトークンはすぐには破棄されません。クライアントがリフレッシュの応答を受け取れなかった場合（たとえば、リクエスト中にテレビの電源が切れたり Wi-Fi が切断されたりした場合）、以前の `refresh_token` を使って最大**7日間**まで再試行できます。再試行が成功するのは、置き換えられた新しいトークンがまだ使用されていない場合のみです。未使用の置き換えトークンは破棄され、新しいペアが発行されます。置き換えられたトークン自体がリフレッシュされた後は、古いトークンは `invalid_grant` を返します。接続を取り消すと、猶予期間内にあるローテーション済みのトークンも取り消されます。また、接続済みアプリの一覧には、各接続が1回だけ表示されます。

## トークンの形式

アクセストークンは、`POST /membership/users/login` でユーザーが取得するものと同じ、B1 が発行する JWT です。モジュール式の権限クレームも、すべてのコントローラーでの `checkAccess` の動作も同じです。**ただし**、権限の配列は、発行時に付与されたスコープでフィルタリングされています。スコープが限定されたアクセストークンでできることは、同じように限定された API キーでもできることに限られます。また、どのコントローラーにも個別の「OAuth の経路」はありません。`actionWrapper` は、呼び出し元が個人か、API キーか、OAuth クライアントかを認識しません。

## 接続済みアプリ（ユーザー向け）

教会の管理者から見ると、「接続済みアプリ」とは、教会へのアクセスを許可されたアプリの一覧です。各行は、有効な `(OAuthClient, OAuthToken)` の組み合わせを表しています。

B1Admin では、**Settings → Developer → Connected Apps** に次の情報が表示されます。

- クライアントの名前
- 管理者が承認したスコープ
- アクセスが許可された日付
- **Revoke**（取り消し）ボタン

| メソッドとパス | 認証 | 目的 |
|---|---|---|
| `GET /membership/oauth/connections` | JWT | 呼び出し元自身の有効な接続を一覧表示します（クライアント名とスコープを結合して表示します）。 |
| `DELETE /membership/oauth/connections/:id` | JWT | OAuth トークンの ID を指定して接続を取り消します。トークンは次のリクエストから使用できなくなります。 |

一覧には、期限切れのトークンは自動的に含まれません。

## スコープと同意

スコープの文字列は、[APIキー](./api-keys#scopes)と同じ一覧を使用します。クライアントの推奨事項は次のとおりです。

- **動作する中で最も狭いスコープをリクエストしてください。** 人の情報を読み取るだけなのに `donations:write` を要求すると、教会はそれに気づきます。
- **リフレッシュトークンと有効期間の短いアクセストークンを併用してください。** 有効期間の長いアクセストークンは、迅速に取り消すことが難しくなります。
- **付与されたスコープを、必ず自分の UI でユーザーに提示してください。** そうすることで、ユーザーは同意した内容を確認できます。

## OAuth クライアントの管理

OAuth クライアント（サードパーティアプリそのもの）はグローバルに登録されます。`client_secret` を持つ機密クライアントは、B1 のサーバー管理者が発行します。出荷するには、ChurchApps チームに連絡して `client_id` と `client_secret` のペアを取得し、リダイレクト URI を登録してください。MCP コネクタなどのパブリッククライアントは、以下のとおり自己登録できます。

登録されたリダイレクト URI は、リクエストの `redirect_uri` と完全に一致する必要があります。前方一致や部分一致は拒否されます。

| メソッドとパス | 権限 | 説明 |
|---|---|---|
| `GET /membership/oauth/clients` | Server.Admin | すべての OAuth クライアントを一覧表示します |
| `GET /membership/oauth/clients/clientId/:clientId` | — | 公開 ID でクライアントを取得します（シークレットは非表示になります） |
| `POST /membership/oauth/clients` | Server.Admin | クライアントを作成または更新します |
| `DELETE /membership/oauth/clients/:id` | Server.Admin | クライアントを削除します |

### 動的クライアント登録

`POST /membership/oauth/register`（公開、RFC 7591）を使うと、claude.ai の MCP コネクタなどのクライアントが自己登録できます。この機能は、API の `/.well-known/oauth-authorization-server` ドキュメントで公開されています。詳しくは [MCPサーバー → OAuth ディスカバリー](./mcp#oauth-discovery)を参照してください。

```http
POST /membership/oauth/register
Content-Type: application/json

{ "client_name": "My AI assistant", "redirect_uris": ["https://assistant.example.com/oauth/callback"], "scope": "people:read" }
```

201 が返され、`client_id`、`client_id_issued_at`、`client_name`、`redirect_uris`、`grant_types`（`authorization_code`、`refresh_token`）、`response_types`（`code`）、`token_endpoint_auth_method: "none"` が含まれます。

- シークレットは発行されないため、クライアントはすべての認可で PKCE を使用する必要があります。
- `redirect_uris` は、1〜10 個の `https` URL である必要があります。ただし、`localhost`、`127.0.0.1`、`[::1]` の場合は `http` も使用できます。
- `client_name` は45文字に切り詰められます（デフォルトは「AI assistant」）。
- IP アドレスごとに、1時間あたり20件の登録に制限されています。

B1Admin の同意ページでは、自己登録されたクライアントに対して、自己登録されたことを示す通知が表示されます。このクライアントは、ユーザー自身の B1 アカウントより多くの操作を行うことはできません。また、**Settings → Developer → Connected Apps** から接続を解除できます。

## SDK のサポート

`@churchapps/integration-sdk` パッケージは、すべての OAuth フローを型付きのヘルパーでラップしています。`B1OAuthClient.exchangeCode()`、`.refresh()`、`.startDeviceFlow()`、`.pollDeviceToken()`、`.awaitDeviceToken()` などがあります。パッケージの README と、エンドツーエンドの例については [Webhook](./webhooks#sdk-support) を参照してください。
