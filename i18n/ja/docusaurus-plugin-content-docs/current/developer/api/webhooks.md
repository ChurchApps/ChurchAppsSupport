---
title: "ウェブフック"
description: "B1 Admin からリアルタイムの Webhook を設定します。エンドポイントの登録、イベントの選択、HMAC 署名の検証、再試行の処理、失敗したペイロードの再送信を扱います。"
---

# ウェブフック

<div class="article-intro">

ウェブフックを使うと、教会はリアルタイムの通知を、自動化プラットフォーム（Zapier、Make、n8n）、CRM、会計システムなど、HTTP POSTを受け付けるサードパーティツールへ送信できます。B1で人、グループ、または世帯が変更されると、B1は購読しているすべてのURLに、そのイベント用の署名付きJSONペイロードを送信します。

</div>

<div class="prereqs">
<h4>始める前に</h4>

- **Edit Church Settings** 権限を持つ教会管理者が、ウェブフックを登録・管理します
- 受信エンドポイントは、公開アドレスの **HTTPS** で到達可能である必要があります
- 署名シークレットを安全に保管する方法を用意してください。シークレットは一度しか表示されません

</div>

## 概要

ウェブフックは**送信専用**です。B1があなたのエンドポイントを呼び出すのであり、あなたがB1を呼び出すことはありません。各ウェブフックは、送信先URL、署名シークレット、購読するイベントのリストで構成される、教会ごとの購読設定です。

配信には**永続的なアウトボックス**を使用します。購読中のイベントが発生すると、B1は配信レコードを記録し、バックグラウンドワーカーが約1分以内にそれをPOSTします。配信に失敗した場合は、指数バックオフで再試行されます。配信が遅れたり、エンドポイントが一時的にダウンしたりしても、データが失われることはありません。

## ウェブフックの登録

### B1Admin での登録

**設定 → 開発者 → ウェブフック → 新規ウェブフック** に移動します。名前、ペイロードのURLを入力し、購読するイベントを選択します。保存すると、**署名シークレットが一度だけ表示されます**。すぐにコピーして、連携先に保存してください。その後は再表示されません（後で再生成することはできますが、元のシークレットを取得することはできません）。

### APIでの登録

すべてのエンドポイントは、Membershipモジュールの基本パス `/membership/webhooks` 以下にあり、`Settings / Edit` 権限を持つ教会管理者のJWT、または `settings:write` スコープで発行された [APIキー](./api-keys.md) のいずれかが必要です。同じルートでどちらも受け付けます。これにより、ZapまたはシナリオがオンになったときにZapierやMakeが教会の代わりにウェブフックを登録できます。

```http
POST /membership/webhooks
Authorization: Bearer <jwt>
Content-Type: application/json

{
  "name": "Zapier — new members",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"]
}
```

作成時のレスポンスには、**作成時のレスポンスのみ**に `secret` が含まれます。

```json
{
  "id": "a1b2c3d4e5f",
  "name": "Zapier — new members",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"],
  "active": true,
  "secret": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822c"
}
```

| メソッドとパス | 用途 |
|---|---|
| `GET /membership/webhooks` | 教会のウェブフック一覧を取得（シークレットは含まれません） |
| `GET /membership/webhooks/events` | 有効なイベント名の一覧 |
| `GET /membership/webhooks/:id` | 1件のウェブフックを読み込み |
| `POST /membership/webhooks` | 作成（`id` なし）または更新（`id` あり） |
| `POST /membership/webhooks/:id/regenerate-secret` | 署名シークレットを再生成します。新しい値は一度だけ返されます |
| `DELETE /membership/webhooks/:id` | ウェブフックを削除 |
| `GET /membership/webhooks/:id/deliveries` | ウェブフックの最近の配信試行を表示 |
| `GET /membership/webhooks/deliveries/:deliveryId` | 1件の配信の完全なペイロードとレスポンス |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | 配信を再キューに入れます |

## イベントの一覧

イベント名は `{entity}.{action}` の形式に従います。最新の一覧は `GET /membership/webhooks/events` から取得してください。

| イベント | 発生するタイミング |
|---|---|
| `person.created` | 人が追加されたとき |
| `person.updated` | 人の記録が変更されたとき |
| `person.destroyed` | 人が削除されたとき |
| `household.created` | 世帯が追加されたとき |
| `household.updated` | 世帯が変更されたとき |
| `household.destroyed` | 世帯が削除されたとき |
| `group.created` | グループが追加されたとき |
| `group.updated` | グループが変更されたとき |
| `group.destroyed` | グループが削除されたとき |
| `group.member.added` | 人がグループに追加されたとき |
| `group.member.removed` | 人がグループから削除されたとき |
| `donation.created` | 献金が記録されたとき（手動入力、オンライン、または保留 → 完了への移行） |
| `donation.updated` | 献金の記録が編集されたとき |
| `attendance.recorded` | 来場が記録されたとき（手動入力またはチェックイン） |
| `session.created` | 新しい出席セッションが作成されたとき（手動、または最初のチェックイン時に自動） |
| `form.submission.created` | フォームが送信されたとき |
| `event.created` | カレンダーのイベントが追加されたとき |
| `event.updated` | カレンダーのイベントが編集されたとき |
| `event.destroyed` | カレンダーのイベントが削除されたとき |

## ペイロードの形式

すべての配信は、JSON本文とともに以下のヘッダーを付けたHTTP `POST` です。

| ヘッダー | 説明 |
|---|---|
| `Content-Type` | 常に `application/json` |
| `X-B1-Event` | イベント名（例：`person.created`） |
| `X-B1-Delivery-Id` | この配信試行の一意のID。重複排除に使用します |
| `X-B1-Signature` | 生のリクエスト本文のHMAC-SHA256署名（後述） |
| `X-B1-Timestamp` | リクエストを送信したUnixエポック秒 |
| `User-Agent` | `B1-Webhooks/1.0` |

本文では、変更されたリソースを小さなエンベロープで包みます。

```json
{
  "event": "person.created",
  "churchId": "AbC123XyZ90",
  "occurredAt": "2026-05-17T14:32:08.114Z",
  "data": {
    "id": "Pq7Rs2Tu4Vw",
    "churchId": "AbC123XyZ90",
    "name": { "display": "Jordan Rivera", "first": "Jordan", "last": "Rivera" },
    "contactInfo": { "email": "jordan@example.com" }
  }
}
```

`*.destroyed` イベントの場合、`data` には削除されたレコードの `id` と `churchId` のみが含まれます。

他のレコードをIDで参照するイベントのペイロードには、配信時に解決される人が読める名前も含まれます。グループメンバーのイベントでは `personName` と `groupName`、出席、献金、リストメンバーのイベントでは `personName`、`session.created` では `groupName`、`form.submission.created` では `formName`（送信が人に紐づく場合は `personName` も）が含まれます。

## コネクタータイプ

デフォルトの配信形式は、上記のJSONエンベロープ（`connectorType: "standard"`）です。[SlackとDiscord](/docs/b1-admin/integrations/slack-discord) の場合、同じウェブフックエンジンが、それらのサービスがそのまま受け付けるチャット形式のメッセージを投稿します。

| `connectorType` | 送信される本文 | 使用するタイミング |
|---|---|---|
| `"standard"`（デフォルト） | 署名付きの `{event, churchId, occurredAt, data}` エンベロープ | 独自の連携を作成する場合、またはZapier、Make、カスタムサーバーに送信する場合 |
| `"slack"` | `{ "text": "💝 New donation: $50.00" }` | SlackのIncoming Webhook URLに直接投稿する場合 |
| `"discord"` | `{ "content": "💝 New donation: $50.00" }` | DiscordのチャンネルウェブフックURLに直接投稿する場合 |
| `"mailchimp"` | 該当なし。コネクター自体がMailchimpのAPIを呼び出します | URLをホストせずに [オーディエンスの同期](/docs/b1-admin/integrations/services/mailchimp) を行いたい場合 |

コネクタータイプは、ウェブフックエディターの **Connector Type** ドロップダウンで設定するか、`POST /membership/webhooks` の本文で `connectorType` を指定して設定します。SlackおよびDiscordの配信でも署名付きの `X-B1-Signature` ヘッダーは引き続き送信されます（無視されるだけで問題ありません）。そのため、後でウェブフックを `standard` に戻す際に再署名は必要ありません。

SlackとDiscordは、本文の形式を変換するだけです。エンジンは引き続き、教会が指定したURLにPOSTします。`mailchimp` は、独自にHTTPのやり取りを行う最初のコネクターです。各イベントに対して、Mailchimp APIへの認証済みのupsert、アーカイブ、タグ付けリクエストを発行します（`MailchimpConnector.deliver`）。その認証情報（`{apiKey, audienceId}`）は `webhooks.connectorConfig` にAES暗号化されて保存され、APIからは書き込みのみ可能です。Mailchimpのウェブフックは、人、グループメンバー、リストメンバーのイベントのみを受け付けます。保存時のルートでは、APIキーとオーディエンスをMailchimpで検証してから受け付けます。配信レコードには標準のエンベロープが保存されるため、配信ログでは、B1が受け取った内容とMailchimpのレスポンスの両方を確認できます。マッピングできない状況（メールアドレスのない人、マッピングのないイベント）は、再試行を繰り返すことなく、`Skipped:` で始まるレスポンス本文とともに成功として完了します。

## テスト配信

すべてのウェブフックエディターには **Send Test Event** ボタンがあります。対応するAPI呼び出しは `POST /membership/webhooks/:id/test` です。テストルートは、最初に購読しているイベント用の合成ペイロードを作成し、実際の署名付き配信の経路（SlackやDiscordの場合は `formatForConnector` も経由）で同期的に送信し、`responseStatus` と `responseBody` を含む配信レコードを返します。本番で連携を有効にする前に、接続と署名の処理を確認するために使用してください。`mailchimp` のウェブフックの場合、テストでは合成イベントを送るのではなく、保存された認証情報をMailchimp APIで検証します（合成イベントを送ると、教会の実際のオーディエンスに偽の購読者が書き込まれてしまうためです）。その際は、レコードを作成せずに、配信と同じ形式の結果を返します。

## 署名の検証

ペイロードを信頼する前に、必ず `X-B1-Signature` を検証してください。署名は、`sha256=` に続けて、シークレットをキーとして**生のリクエスト本文**に対して計算したHMAC-SHA256の16進数の値です。パースしたJSONを再シリアライズせず、受信したバイト列に対して計算してください。

**Node.js**

```js
const crypto = require("crypto");

function isValid(rawBody, signatureHeader, secret) {
  const expected = "sha256=" + crypto.createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signatureHeader || "");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
```

**Python**

```python
import hashlib, hmac

def is_valid(raw_body: bytes, signature_header: str, secret: str) -> bool:
    expected = "sha256=" + hmac.new(secret.encode(), raw_body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature_header or "")
```

**PHP**

```php
function isValid(string $rawBody, string $signatureHeader, string $secret): bool {
    $expected = "sha256=" . hash_hmac("sha256", $rawBody, $secret);
    return hash_equals($expected, $signatureHeader ?? "");
}
```

署名が一致しないリクエストは拒否してください。必要に応じて、`X-B1-Timestamp` が数分以上前のリクエストも拒否すると、リプレイ攻撃の時間枠を制限できます。

## SDKのサポート

Node.jsの場合、`@churchapps/integration-sdk` には、型付きの検証機能と、Expressのミドルウェアが含まれています。生の本文の取得、署名のチェック、エンベロープの解析を代わりに行います。

```ts
import express from "express";
import { b1WebhookMiddleware } from "@churchapps/integration-sdk";

const app = express();
// Capture the raw body before JSON parsing — required so the signature still verifies.
app.use(express.json({ verify: (req, _res, buf) => { (req as any).rawBody = buf; } }));

app.post("/webhooks/b1", b1WebhookMiddleware({ secret: process.env.B1_WEBHOOK_SECRET! }), (req, res) => {
  const env = req.b1Webhook!;
  switch (env.event) {
    case "donation.created": console.log("new gift", env.data.amount); break;
  }
  res.sendStatus(200);
});
```

SDKはまた、Express以外のランタイム（サーバーレス関数、Fastifyなど）向けに `WebhookVerifier.verify(secret, rawBody, signatureHeader)` を提供しています。詳細はnpmのパッケージをご覧ください。

## 配信と再試行

エンドポイントは、できるだけ速やかに `2xx` ステータスを返す必要があります。理想的には、処理の完了を待たず、作業をキューに入れた後に返してください。`2xx`以外のレスポンス、接続の失敗、または **10秒** を超える応答は、配信の失敗として扱われます。

配信に失敗した場合は、指数バックオフで再試行されます。試行回数は、約5日間で**16回**です。再試行の間隔は1分から始まり、数時間を経て、最後の試行では3日間隔まで延びます。16回目の試行が失敗すると、配信は `exhausted` とマークされ、破棄されます。

配信は**少なくとも1回**保証されます。たとえば、エンドポイントが処理に成功したもののレスポンスが失われた場合など、同じ配信が複数回届くことがあります。`X-B1-Delivery-Id` ヘッダーを使って重複を排除してください。各IDは一度だけ処理し、重複する配信は何もしないものとして扱ってください。

### 自動無効化

ウェブフックで**3回連続して `exhausted` の配信**が発生すると、B1はそのウェブフックを自動的に無効にします。エンドポイントを修正してから、B1Adminで（または `"active": true` を指定して `POST /membership/webhooks` を使って）ウェブフックを再度有効にしてください。

## 送信内容の確認と再配信

B1Adminのウェブフックエディターには **Recent Deliveries** の表が表示されます。イベント、ステータス、試行回数、レスポンスコード、タイムスタンプが確認できます。行を選択すると、送信された完全なペイロードと、返ってきたレスポンスが表示されます。

**Redeliver** を使うと、過去の配信を元のペイロードのまま再キューに入れられます。エンドポイントのバグを修正した後や、エンドポイントがダウンしていた間に取りこぼしたイベントを補充する場合に便利です。

## URLの要件

ウェブフックのURLは教会が指定するため、B1はサーバーサイドリクエストフォージェリ（SSRF）に対する保護を適用しています。ウェブフックのURLは、登録時に検証され、配信の前にも再度チェックされます。次のいずれかに該当する場合、そのURLは拒否されます。

- **`https`** を使用していない
- `localhost`、`.local` / `.internal` のホスト名を指している
- **プライベート、ループバック、リンクローカル、またはクラウドメタデータ**のIPアドレスに解決される

エンドポイントは、公開アクセス可能なHTTPSサービスである必要があります。
