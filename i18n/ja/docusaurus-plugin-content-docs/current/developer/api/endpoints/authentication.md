---
title: "認証と権限"
description: "インテグレーションを構築する開発者向けに、ChurchApps API の JWT ログイン、二段階認証、OAuth 2.0 のフロー、権限モデルを説明するリファレンスです。"
---

# 認証と権限

<div class="article-intro">

ChurchApps API は JWT ベースの認証を使用します。ユーザーがログインすると、ユーザーの ID、教会の所属、権限を含むトークンが発行されます。このページでは、認証の流れ、権限モデル、OAuth のサポートについて説明します。

</div>

## ログインの流れ

### 標準ログイン

```
POST /membership/users/login
```

**認証:** 公開

次の 3 種類の認証情報のいずれかを受け付けます。

| フィールド | 説明 |
|-------|-------------|
| `email` + `password` | 標準のメールアドレスとパスワードによるログイン |
| `jwt` | 既存の JWT による再認証 |
| `authGuid` | ワンタイムの認証リンク（ようこそメールやパスワードリセットメールで使用） |

**レスポンス:**

```json
{
  "user": {
    "id": "abc-123",
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@example.com"
  },
  "churches": [
    {
      "church": { "id": "church-1", "name": "First Church", "subDomain": "firstchurch" },
      "person": { "id": "person-1", "membershipStatus": "Member" },
      "groups": [{ "id": "group-1", "name": "Choir", "leader": false }],
      "apis": [
        {
          "keyName": "MembershipApi",
          "permissions": [
            { "contentType": "People", "action": "View" },
            { "contentType": "People", "action": "Edit" }
          ]
        }
      ]
    }
  ],
  "token": "<jwt-token>"
}
```

`token` フィールドは JWT です。以降のリクエストでは `Authorization: Bearer <token>` として送信してください。

### 2 段階認証でのサインイン

認存者は、認証アプリ（TOTP）による 2 段階認証を有効にできます。このユーザーの場合、`email` + `password`、`authGuid`、または SSO によるログインでは、トークンは返されません。代わりに、次のようなチャレンジが返されます。

```json
{ "mfaRequired": true, "mfaToken": "<challenge-token>" }
```

チャレンジトークンの有効期限は 5 分です。コードを添えて同じエンドポイントに送信してください。

```json
{ "mfaToken": "<challenge-token>", "mfaCode": "123456" }
```

`mfaCode` には、認証アプリに表示されている現在の 6 桁のコード、またはユーザーの 10 個ある使い捨てバックアップコードのいずれかを指定できます。コードが誤っている場合は `Invalid code` が返されます。失敗が繰り返されると、アカウントごとにレート制限がかかります。`jwt` による再ログインでは 2 段階認証は求められないため、既存のセッションは引き続き更新されます。ログインレスポンスの `user` オブジェクトには `mfaEnabled` が含まれます。

セルフサービスのエンドポイント（サインイン中のユーザーのみ、`/membership/users/mfa` 配下）:

| エンドポイント | 説明 |
|----------|-------------|
| `GET /status` | `{ enabled, backupCodesLeft }` を返します |
| `POST /setup` | 設定を開始します。QR コード用に `{ secret, otpauthUrl }` を返します |
| `POST /enable` | ボディは `{ code }`。有効化し、`{ backupCodes }` を一度だけ返します |
| `POST /disable` | ボディは `{ code }`（認証アプリのコードまたはバックアップコード）。無効化します |
| `POST /reset/:userId` | Server.Admin のみ。他のユーザーの 2 段階認証を無効化します |

シークレットは暗号化して保存され、バックアップコードはハッシュ化して保存されます。有効化、無効化、リセットはすべて監査ログに記録されます。

### トークンの内容

JWT には次の情報が含まれます。
- `id` — ユーザー ID
- `churchId` — 現在選択されている教会
- `personId` — 選択中の教会における人物レコード
- API ごとの権限配列

### 教会の選択

ユーザーは複数の教会に所属できます。ログインレスポンスには、所属するすべての教会とその権限が含まれます。教会を切り替えるには、クライアントがログインレスポンスのデータをもとに、別の教会を対象とした新しい JWT を生成します。

## ユーザー登録

### 新規ユーザーの登録

```
POST /membership/users/register
```

**認証:** 公開

```json
{
  "email": "jane@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "appName": "B1 Admin",
  "appUrl": "https://app.b1.church"
}
```

一時パスワードを設定したユーザーを作成し、認証リンク付きのようこそメールを送信します。新しいインスタンスで最初に登録されたユーザーには、自動的にサーバー管理者の権限が付与されます。

任意のボット対策フィールドを 2 つ受け付けます。`website`（実際のユーザーは空のままにする、非表示のハニーポット（おとり）フィールド）と `fillMs`（フォームが開かれていた時間、ミリ秒単位）です。`website` に値が入っている場合、または `fillMs` が 2000 未満の場合は、アカウントは作成されません。ただし、ボットに拒否されたことが分からないよう、エンドポイントは通常どおり `200` を返します。両方のフィールドを省略したクライアントは、通常どおり登録されます。

### 新規教会の登録

```
POST /membership/churches/add
```

**認証:** JWT

ユーザーを登録したあと、このエンドポイントを呼び出して教会を作成し、ユーザーをその教会に関連付けます。

## パスワードの管理

| メソッド | パス | 認証 | 説明 |
|--------|------|------|-------------|
| POST | `/membership/users/forgot` | 公開 | パスワードリセットメールを送信します。ボディ: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | 公開 | リセットメールの認証 GUID を使って新しいパスワードを設定します。ボディ: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | サインイン中のユーザーのパスワードを変更します。ボディ: `{ "newPassword": "..." }` |

## 権限モデル

権限はモジュールごとに整理され、ロールを通じてユーザーに割り当てられます。各権限は、**コンテンツタイプ**と**アクション**を持ちます。

### 権限の一覧

| 表示セクション | コンテンツタイプ | アクション | 説明 |
|----------------|--------------|--------|-------------|
| **出席** | Attendance | Checkin | 礼拝でメンバーのチェックインを行います |
| | Attendance | Edit | 出席記録を編集します |
| | Services | Edit | 礼拝とその時間を管理します |
| | Attendance | View | 出席記録を閲覧します |
| | Attendance | View Summary | 出席の概要とレポートを閲覧します |
| **献金** | Donations | Edit | 献金記録を作成し、編集します |
| | Settings | Edit | 献金・支払いの設定を編集します |
| | Donations | View Summary | 献金の概要レポートを閲覧します |
| | Donations | View | 個々の献金記録を閲覧します |
| **人とグループ** | Forms | Admin | フォームのすべての管理を行います |
| | Forms | Edit | フォームの定義を編集します |
| | Plans | Edit |礼拝プランを編集します |
| | Group Members | Edit | グループメンバーを追加・削除します |
| | Groups | Edit | グループを作成し、編集します |
| | Households | Edit | 世帯の割り当てを編集します |
| | People | Edit | 任意の人物レコードを編集します |
| | People | Edit Self | 自分自身の人物レコードのみを編集します |
| | Roles | Edit | ロールとユーザーの割り当てを管理します |
| | Group Members | View | グループメンバーの一覧を閲覧します |
| | People | View Members | メンバーのみを閲覧します（訪問者は除く） |
| | People | View | すべての人物を閲覧します |
| | Roles | View | ロールと割り当てを閲覧します |
| | Settings | Edit | 教会の設定を編集します |
| **コンテンツ** | Content | Edit | ページ、セクション、要素を編集します |
| | Settings | Edit | コンテンツの設定を編集します |
| | StreamingServices | Edit | 配信サービスの設定を管理します |
| | Chat | Host | チャットセッションをホストし、モデレートします |
| **メッセージ** | Texting | Send | SMS テキストメッセージを送信します |

### 権限のチェック方法

コントローラーでは、`au.checkAccess()` メソッドを使って権限をチェックします。

```typescript
// 特定の権限を要求する
if (!au.checkAccess(Permissions.people.edit)) return this.json({}, 401);

// または actionWrapper 内では、CRUD システムが自動的にチェックします
crudSettings: {
  permissions: {
    view: Permissions.people.view,
    edit: Permissions.people.edit
  }
}
```

### サーバー管理者

`Server.Admin` 権限は、すべての教会に対するフルアクセスを与えます。この権限は最初に登録されたユーザーに割り当てられ、サーバー管理者ロールを通じて他のユーザーにも付与できます。

## OAuth 2.0

API は、サードパーティとの連携のために OAuth 2.0 をサポートしています。利用できる許可タイプは 2 種類です。

### 認可コードフロー

1. **認可:** `POST /membership/oauth/authorize`（JWT が必要）
   - ボディ: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "...", "code_challenge": "...", "code_challenge_method": "S256" }`
   - `code_challenge` と `code_challenge_method`（PKCE、`S256` のみ）は、シークレットを持たない公開クライアントでは必須です
   - 返り値: `{ "code": "...", "state": "..." }`

2. **コードをトークンに交換:** `POST /membership/oauth/token`（公開）
   - ボディ: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "...", "code_verifier": "..." }`
   - 認可ステップで `code_challenge` を使用した場合は、`code_verifier` を送信してください。公開クライアントは `client_secret` を省略します。JSON またはフォームエンコードのボディを受け付けます
   - 返り値: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **トークンの更新:** `POST /membership/oauth/token`（公開）
   - ボディ: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

アクセストークンの有効期限は **12 時間** です。

### デバイスコードフロー（RFC 8628）

ブラウザを利用できないデバイス（TV アプリ、キオスクなど）向けです。

1. **デバイスコードのリクエスト:** `POST /membership/oauth/device/authorize`（公開）
   - ボディ: `{ "client_id": "...", "scope": "..." }`
   - 返り値: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **ユーザーが認証ページでコードを入力します。** 確認ページでコードを入力し、承認または拒否します

3. **トークンをポーリング:** `POST /membership/oauth/token`（公開）
   - ボディ: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - 承認されるまでは `authorization_pending` を返し、承認後にアクセストークンを返します

### OAuth クライアントの管理

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | すべての OAuth クライアントを一覧表示します |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | ID を指定してクライアントを取得します |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | クライアント ID を指定してクライアントを取得します（シークレットは非表示） |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | クライアントを作成または更新します |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | クライアントを削除します |
| POST | `/membership/oauth/register` | 公開 | — | MCP コネクタなどの公開クライアント向けの動的クライアント登録（RFC 7591）。[接続済みアプリ](../connected-apps.md#dynamic-client-registration)を参照してください |

### デバイス承認のエンドポイント

| メソッド | パス | 認証 | 説明 |
|--------|------|------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | 承認画面のために、保留中のデバイスコード情報を取得します |
| POST | `/membership/oauth/device/approve` | JWT | デバイスの認可を承認します。ボディ: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | デバイスの認可を拒否します。ボディ: `{ "user_code": "..." }` |

## 公開エンドポイントと認証が必要なエンドポイント

API では、認証の要否を決める 2 つのラッパー関数を使用します。

- **`actionWrapper`** — 有効な JWT が必要です。認証済みユーザーオブジェクト（`au`）が利用でき、`churchId`、`userId`、権限チェックを扱えます。
- **`actionWrapperAnon`** — 認証は不要です。ログイン、登録、公開コンテンツの参照、Webhook の受信に使用されます。

このドキュメント全体のエンドポイントの表では、認証列にそれぞれ **JWT** と **公開** と示しています。

## 関連ページ

- [モジュール構成](../module-structure.md) — コントローラー、リポジトリ、モデルの構成
- [ローカルでのセットアップ](../local-setup.md) — 開発用にローカルで API を実行する方法
