---
title: "寄付エンドポイント"
description: "ChurchApps の Giving API エンドポイントのリファレンスです。寄付、バッチ、ゲートウェイ、定期購読、支払い方法を扱い、B1 Admin と連携する開発者向けの認証と権限ルールを記載しています。"
---

# 寄付エンドポイント

<div class="article-intro">

寄付モジュールでは、寄付、基金、決済処理、定期寄付、およびそれに関連する財務処理を管理します。複数の決済ゲートウェイ（Stripe、PayPal）に対応し、単発の寄付と定期的な寄付を処理し、寄付のバッチを追跡し、非同期の決済イベントを処理するためのWebhookも提供します。

</div>

**ベースパス:** `/giving`

## 寄付

ベースパス: `/giving/donations`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View または本人の personId | すべての寄付を一覧表示します。`?batchId=` または `?personId=` で絞り込めます。`?personId=` を指定した場合、寄付明細書と同様に非控除対象の基金への寄付は除外されます。ただし Donations.View 権限を持つ呼び出し元が `&includeNonDeductible=1` を追加した場合は含まれます。B1Admin の人物レコードはこのパラメータを付けます |
| GET | `/:id` | JWT | Donations.View | ID で寄付を取得します |
| GET | `/my` | JWT | — | 現在のユーザーの寄付を取得します |
| GET | `/my/summary?year=` | JWT | — | 現在のユーザーの年間寄付合計を取得します（既定は今年）。レスポンスは `{ year, total, count, currency, isConverted }` の形式で、合計は教会の通貨に換算されます。会員のホームページにある寄付プレビューに使われます |
| GET | `/?startDate=&endDate=` | JWT | Donations.View | 指定期間内（両端を含む）の寄付を取得します。開始日と終了日は `YYYY-MM-DD` 形式で必須です。指定がない場合は `400` を返します。B1Admin の寄付明細書ページは、教会の全期間ではなく、このクエリで1暦年分を取得します |
| GET | `/summary` | JWT | Donations.ViewSummary | 寄付の集計を取得します。`?startDate=&endDate=&type=` で絞り込めます。人ごとの内訳には `type=person` を使用します |
| GET | `/testEmail` | 公開 | — | テストメールを送信します（開発およびデバッグ用） |
| POST | `/` | JWT | Donations.Edit または Donations.Enter | 寄付（バッチ）を作成または更新します。Donations.Enter のみの場合、対象バッチと（更新時は）寄付が現在属しているバッチの両方が開いている必要があります。また、ゲートウェイ経由の寄付（`transactionId` を持つもの）は変更できません。条件を満たさない場合は `403 { "error": "This batch is closed." }` を返します |
| DELETE | `/:id` | JWT | Donations.Edit または Donations.Enter | 寄付を削除します。Donations.Enter のみの場合、寄付が開いているバッチにあり、かつゲートウェイ経由の寄付でない必要があります。そうでない場合は `403` を返します |

### 例: バッチ別の寄付一覧

```
GET /giving/donations?batchId=abc-123
Authorization: Bearer <token>
```

```json
[
  {
    "id": "don-456",
    "batchId": "abc-123",
    "personId": "per-789",
    "donationDate": "2025-03-15T00:00:00.000Z",
    "amount": 100.00,
    "method": "card"
  }
]
```

### 例: 寄付の集計を取得

```
GET /giving/donations/summary?startDate=2025-01-01&endDate=2025-12-31
Authorization: Bearer <token>
```

```json
[
  {
    "week": "2025-01-06",
    "fund": "General Fund",
    "totalAmount": 2500.00,
    "count": 15
  }
]
```

## 寄付バッチ

ベースパス: `/giving/donationbatches`

`GenericCrudController` を拡張しており、`getById`、`getAll`、`post`、`delete` の CRUD ルートを持ちます。削除操作では、バッチ内のすべての寄付も削除されます。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary または Donations.Enter | すべての寄付バッチを一覧表示します |
| GET | `/:id` | JWT | Donations.ViewSummary または Donations.Enter | ID で寄付バッチを取得します |
| POST | `/` | JWT | Donations.Edit または Donations.Enter | 寄付バッチを作成または更新します。Donations.Enter のみの場合、既存のバッチを更新するにはそのバッチが開いている必要があり、そうでない場合は `403 { "error": "This batch is closed." }` を返します。ここでは `status` は無視されるため、バッチを保存しても再オープンはできません |
| POST | `/:id/close` | JWT | Donations.Edit | バッチを締めます。`status` を `closed` に、`closedDate` を現在時刻に、`closedBy` を呼び出し元のユーザー ID に設定します。バッチを返します |
| POST | `/:id/reopen` | JWT | Donations.Edit | バッチを再オープンします。`status` を `open` に設定し、`closedDate` と `closedBy` をクリアします。バッチを返します |
| DELETE | `/:id` | JWT | Donations.Edit | バッチとそのすべての寄付を削除します |

各バッチには `status`（`open` または `closed`。新規作成されたバッチと既存のバッチはいずれも `open`）、`closedDate`、`closedBy` が含まれます。Donations.Edit は任意のバッチの寄付を変更できます。Donations.Enter（ロールエディターでは **寄付の入力** と表示されます）は、バッチが開いている間だけ寄付と基金の配分を追加、変更、削除できます。

## 寄付 (Donate)

ベースパス: `/giving/donate`

請求、定期寄付、Webhook、手数料計算を含む、公開向けの寄付フローを処理します。ベースの CRUD ルートは有効になっていません。すべてのエンドポイントはカスタムです。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | 公開 | — | 教会で利用可能な決済ゲートウェイを取得します（公開キーのみ） |
| POST | `/client-token` | JWT | — | ゲートウェイの初期化用にクライアントトークンを生成します |
| POST | `/create-order` | JWT | — | 決済オーダーを作成します（PayPal 形式のチェックアウト） |
| POST | `/charge` | JWT | — | 単発の寄付の請求を処理します |
| POST | `/subscribe` | JWT | — | 定期寄付のサブスクリプションを作成します |
| POST | `/log` | 公開 | — | 寄付をログに記録します。ボディ: `{ donation, fundData }` |
| POST | `/webhook/:provider` | 公開 | — | 決済 Webhook イベントを受信します（Stripe、PayPal）。`?churchId=` が必要です |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | 指定期間の Stripe イベントを再送します。ボディ: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | 公開 | — | 取引手数料を計算します。ボディ: `{ type, provider, gatewayId, amount, currency }`。`?churchId=` が必要です |
| POST | `/captcha-verify` | 公開 | — | reCAPTCHA トークンを検証します。ボディ: `{ token, churchId? }`。人間による回答の場合、`{ response: "human", pass }` を返します。`pass` は署名付きのゲスト寄付パスで、有効期間は10分です（`churchId` を送信した場合は、その教会に対してのみ有効です） |

API が `CAPTCHA_ENFORCE=true` で動作している場合、サインインしていないゲストによる `/giving/donate/create-order`、`/charge`、`/subscribe`、`/giving/paymentmethods/addcard`、`/giving/paymentmethods/ach-setup-intent-anon` の呼び出し（およびゲスト向けの価格付き `POST /content/registrations/register` の呼び出し）には、ボディに `captchaPass` を含める必要があります。含まれていない場合は、403 `Captcha verification required` を返します。Stripe のゲストフローでは2回の呼び出し（カードの追加、その後の請求）が行われるため、パスは有効期限が切れるまで再利用できます。サインイン済みの呼び出しは影響を受けません。`CAPTCHA_ENFORCE` の既定値は `false` です。`@churchapps/apphelper` のゲスト寄付フォームは、パスを自動的に送信します。

### 例: 寄付の請求を処理

```
POST /giving/donate/charge
Authorization: Bearer <token>

{
  "provider": "stripe",
  "amount": 50.00,
  "currency": "usd",
  "person": { "id": "per-123", "email": "donor@example.com" },
  "funds": [{ "id": "fund-001", "name": "General Fund", "amount": 50.00 }],
  "church": { "name": "First Church", "subDomain": "firstchurch" }
}
```

```json
{
  "id": "ch_abc123",
  "status": "succeeded",
  "provider": "stripe"
}
```

### 例: 定期寄付のサブスクリプションを作成

```
POST /giving/donate/subscribe
Authorization: Bearer <token>

{
  "provider": "stripe",
  "amount": 100.00,
  "customerId": "cus_abc123",
  "interval": { "interval_count": 1, "interval": "month" },
  "billing_cycle_anchor": 1710460800,
  "person": { "id": "per-123", "email": "donor@example.com" },
  "funds": [{ "id": "fund-001", "name": "General Fund", "amount": 100.00 }],
  "church": { "name": "First Church", "subDomain": "firstchurch" }
}
```

```json
{
  "id": "sub_xyz789",
  "status": "active",
  "provider": "stripe"
}
```

## 基金

ベースパス: `/giving/funds`

`GenericCrudController` を拡張しており、`getById`、`getAll`、`post`、`delete` の CRUD ルートを持ちます。`view` の権限は `null` です（基金の閲覧に権限は不要です）。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | すべての基金を一覧表示します |
| GET | `/:id` | JWT | — | ID で基金を取得します |
| GET | `/churchId/:churchId` | 公開 | — | 特定の教会のすべての基金を取得します（公開） |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | 公開 | — | 基金の寄付合計を取得します: `{ fundId, totalAmount, donationCount }`。ウェブサイトビルダーの `campaignProgress` 要素で使用されます |
| POST | `/` | JWT | Donations.Edit | 基金を作成または更新します |
| DELETE | `/:id` | JWT | Donations.Edit | 基金を削除します |

## 基金への寄付

ベースパス: `/giving/funddonations`

個々の寄付が各基金にどのように配分されたかを追跡します。ベースの CRUD ルートは有効になっていません。すべてのエンドポイントはカスタムです。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | 基金への寄付を一覧表示します。`?donationId=`、`?personId=`、`?fundId=`、`?fundName=` で絞り込めます。`?startDate=&endDate=` を追加して日付で絞り込むこともできます |
| GET | `/:id` | JWT | Donations.View | ID で基金への寄付を取得します |
| GET | `/my` | JWT | — | 現在のユーザーの基金への寄付を取得します |
| POST | `/` | JWT | Donations.Edit または Donations.Enter | 基金への寄付（バッチ）を作成または更新します。Donations.Enter のみの場合、親の寄付が開いているバッチにあり、かつゲートウェイ経由の寄付でない必要があります。そうでない場合は `403` を返します |
| DELETE | `/:id` | JWT | Donations.Edit または Donations.Enter | 基金への寄付を削除します。Donations.Enter についても、開いているバッチに関する同じルールが適用されます |

## ゲートウェイ

ベースパス: `/giving/gateways`

決済ゲートウェイの設定（Stripe、PayPal など）を管理します。ベースの CRUD ルートは有効になっていません。すべてのエンドポイントはカスタムです。ゲートウェイの秘密情報は、保存時に暗号化されます。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 教会のすべてのゲートウェイを一覧表示します |
| GET | `/:id` | JWT | Settings.Edit | ID でゲートウェイを取得します |
| GET | `/churchId/:churchId` | 公開 | — | 教会のゲートウェイを取得します（公開キーのみ） |
| GET | `/configured/:churchId` | 公開 | — | 教会に決済ゲートウェイが設定されているかを確認します |
| POST | `/` | JWT | Settings.Edit | ゲートウェイを作成または更新します（キーの暗号化、Webhook と商品の作成を行います） |
| PATCH | `/:id` | JWT | Settings.Edit | ゲートウェイを部分的に更新します |
| DELETE | `/:id` | JWT | Settings.Edit | ゲートウェイを削除します（関連する Webhook も削除されます） |

### 例: ゲートウェイの設定を確認

```
GET /giving/gateways/configured/church-123
```

```json
{
  "configured": true
}
```

## 顧客

ベースパス: `/giving/customers`

`GenericCrudController` を拡張しており、`getAll` と `delete` の CRUD ルートを持ちます。人物を決済ゲートウェイの顧客レコードに関連付けます。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | すべての顧客を一覧表示します |
| GET | `/:id` | JWT | Donations.ViewSummary または本人のレコード | ID で顧客を取得します |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary または本人のレコード | 顧客の決済ゲートウェイのサブスクリプションを取得します |
| DELETE | `/:id` | JWT | Donations.Edit | 顧客を削除します |

## サブスクリプション

ベースパス: `/giving/subscriptions`

定期寄付のサブスクリプションを管理します。ベースの CRUD ルートは有効になっていません。すべてのエンドポイントはカスタムです。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | すべてのサブスクリプションを一覧表示します |
| GET | `/:id` | JWT | Donations.ViewSummary | ID でサブスクリプションを取得します |
| POST | `/` | JWT | Donations.Edit または本人のサブスクリプション | 決済ゲートウェイを通じてサブスクリプションを更新します |
| DELETE | `/:id` | JWT | Donations.Edit または本人のサブスクリプション | サブスクリプションを解約し、データベースから削除します。ボディ: `{ provider, reason }` |

## サブスクリプションの基金

ベースパス: `/giving/subscriptionfunds`

定期寄付のサブスクリプションに対する基金の配分を追跡します。ベースの CRUD ルートは有効になっていません。すべてのエンドポイントはカスタムです。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View または本人のサブスクリプション | サブスクリプションの基金を一覧表示します。`?subscriptionId=` で絞り込めます |
| GET | `/:id` | JWT | Donations.ViewSummary | ID でサブスクリプションの基金を取得します |
| DELETE | `/:id` | JWT | Donations.Edit | サブスクリプションの基金を削除します |
| DELETE | `/subscription/:id` | JWT | Donations.Edit または本人のサブスクリプション | サブスクリプションのすべての基金を削除します |

## 支払い方法

ベースパス: `/giving/paymentmethods`

決済ゲートウェイの API を通じて、保存された支払い方法（カードや銀行口座）を管理します。ベースの CRUD ルートは有効になっていません。すべてのエンドポイントはカスタムです。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View または本人の personId | 人物に保存されているすべての支払い方法（カードや銀行口座）を取得します |
| POST | `/addcard` | JWT | — | カードの支払い方法を追加します。ボディ: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit または本人の personId | カードの詳細を更新します。ボディ: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit または本人の personId | 銀行口座の連携のための Stripe ACH SetupIntent を作成します。ボディ: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | 公開 | — | ゲストの寄付用に匿名の ACH SetupIntent を作成します。ボディ: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit または本人の personId | トークンを使って銀行口座を追加します（非推奨。`ach-setup-intent` を使用してください）。ボディ: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit または本人の personId | 銀行口座の詳細を更新します。ボディ: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit または本人の顧客 | 少額入金で銀行口座を検証します。ボディ: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit または本人の顧客 | 支払い方法（カードまたは銀行口座）を削除します |

## イベントログ

ベースパス: `/giving/eventLog`

`GenericCrudController` を拡張しており、`getById`、`getAll`、`post`、`delete` の CRUD ルートを持ちます。監査と重複排除のために、決済ゲートウェイの Webhook イベントを記録します。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | すべてのイベントログを一覧表示します |
| GET | `/:id` | JWT | Donations.ViewSummary | ID でイベントログを取得します |
| GET | `/type/:type` | JWT | Donations.ViewSummary | イベントの種類で絞り込んだイベントログを取得します |
| POST | `/` | JWT | Donations.Edit | イベントログを作成または更新します |
| DELETE | `/:id` | JWT | Donations.Edit | イベントログを削除します |

## 関連ページ

- [会員エンドポイント](./membership.md) — 人物、教会、グループ、ロール、権限
- [認証と権限](./authentication.md) — ログインの流れ、JWT、OAuth、権限モデル
- [モジュール構成](../module-structure.md) — コードの構成パターン
