---
title: "モバイルメッセージ"
---

# Mobile Message

<div class="article-intro">

[Mobile Message](https://mobilemessage.com.au) は、オーストラリアの SMS API です。現地の電話番号を提供し、オーストラリアでの料金も競争力があるため、オーストラリアの教会で人気があります。Clearstream や Text In Church が米国向けに作られているのに対し、Mobile Message は現地のニーズに合っています。現在、Mobile Message に専用の Zapier アプリはありませんが、公開された REST API があるため、**Webhooks by Zapier**（または Make の HTTP モジュール）を使って、数分で B1 のイベントと Mobile Message のテキストメッセージを連携できます。

</div>

<div class="prereqs">
<h4>始める前に</h4>

- 登録済みの Sender ID と API 認証情報（*Account → API Settings* にある API のユーザー名とパスワード）を持つ [Mobile Message](https://mobilemessage.com.au) アカウント
- [Zapier](https://zapier.com) アカウント（または [Make](https://www.make.com)）
- **Edit Settings** 権限を持つ B1Admin ユーザー

</div>

## 連携できること

Mobile Message の API は「SMS を送信する」ためのもので、トリガーはなく、送信のみを行います。そのため、紹介するレシピはすべて B1 から SMS への連携です。

| 方向 | B1 のトリガー | 結果 |
|---|---|---|
| B1 → Mobile Message | `person.created` | 新しく登録された人に歓迎のテキストを送信 |
| B1 → Mobile Message | `donation.created` | 寄付者に感謝のテキストを送信 |
| B1 → Mobile Message | `form.submission.created` | 当番チームに呼び出し通知を送信 |
| B1 → Mobile Message | `event.created` | リストの相手にリマインダーを一斉送信 |

## セットアップ

### 1. B1 API キーを作成する

**Settings → Developer → API Keys → New API Key**：

- `settings:write` — トリガーの Webhook を登録するため
- `people:read` — `personId` から受信者の電話番号を取得するため

### 2. Webhooks by Zapier で Zap を作成する

1. **トリガー** — B1.church：目的のイベントを選択します（例：New Donation）。
2. **アクション** — B1.church：Find Person（`data.personId` を使用）で、電話番号と名前を取得します。
3. **アクション** — Webhooks by Zapier：**POST**。以下のとおりに設定します。

POST ステップの設定：

- **URL** — `https://api.mobilemessage.com.au/v1/messages`
- **Payload Type** — JSON
- **Data** —
  ```json
  {
    "messages": [
      {
        "to": "{{step2_phone}}",
        "message": "Thanks for your gift, {{step2_first_name}}!",
        "sender": "YourChurch"
      }
    ]
  }
  ```
- **Headers** — `Content-Type: application/json`（Webhooks by Zapier が自動的に追加します）
- **Basic Auth** — *Basic Auth* フィールドに `<api_username>|<api_password>` を設定します（Zapier が適切な `Authorization: Basic …` ヘッダーに変換します）

Zap をオンにします。B1Admin で試しに寄付を登録し、テキストメッセージが届くことを確認します。

## よくあるレシピ

### 当日朝のイベントリマインダー

- **トリガー** — Schedule by Zapier（毎日午前 7 時）
- **アクション** — B1.church：今日のイベントを検索します（または、固定の日付フィルターを使った Find ステップを使うか、今日のイベント一覧を Google スプレッドシートに保存します）
- **アクション** — Webhooks by Zapier：登録済みの購読者グループ宛てに、イベント一覧を含めて Mobile Message へ POST します

### 一斉送信にバッチエンドポイントを使う

Mobile Message の `/v1/messages` エンドポイントは、1 回の呼び出しで最大 10,000 件のメッセージを受け付けます。B1 のグループに一斉送信するには、次のようにします。

- **トリガー** — B1.church：New Form Submission（特定のフォームに絞り込み）
- **アクション** — B1.church：対象グループのメンバー一覧を取得します（*Webhooks by Zapier — GET* ステップで `/membership/groupmembers?groupId=…` を呼び出します）
- **アクション** — Formatter by Zapier → Utilities：レスポンスを 1 行ずつに分割し（Line-itemize）、`messages` 配列に変換します
- **アクション** — Webhooks by Zapier：配列全体を `/v1/messages` に POST します

### Make を使う場合

Make を使う場合は、B1 Watch Events トリガーの後に **HTTP — Make a request** モジュールを配置し、同じように設定します（POST、Basic Auth、JSON ボディ）。B1 側の設定については、[Make の概要](../make)を参照してください。

## 制限事項と注意点

- **Basic Auth が唯一の認証方式です**：Mobile Message は、ダッシュボードでユーザー名とパスワードを発行します。どちらも秘密情報として扱ってください。
- **`sender` は、Mobile Message アカウントに登録された Sender ID である必要があります**。そうでない場合、送信は `400 Invalid sender` を返します。オーストラリアの規制により、送信者の登録が求められます。
- **オーストラリアの電話番号**は、`0412345678`（国内形式）または `+61412345678`（国際形式）で指定できます。API はどちらも受け付けますが、海外にも送信する場合は `+61…` の形式に統一することをおすすめします。
- **1 リクエストあたり最大 10,000 件のメッセージ**：一斉送信には便利ですが、B1 の Webhook 1 回の配信でこれほど大きなリストが生成されることはまれです。バッチエンドポイントは、スケジュールされた大量送信の Zap のために取っておいてください。

## トラブルシューティング

- **POST が `401 Unauthorized` を返す**：Basic Auth の認証情報が正しくありません。Mobile Message ダッシュボードの *Account → API Settings* から再度コピーしてください。ユーザー名は、別の API キーではなく、デフォルトではアカウントのメールアドレスであることに注意してください。
- **POST が `400 Invalid sender` を返す**：`sender` の値が、アカウントに登録された Sender ID ではありません。先に Mobile Message ダッシュボードで登録してください。
- **メッセージは届くが途中で切れている**：Mobile Message は約 160 文字を超えるメッセージを複数のパートに分割し、パートごとに課金します。レスポンス本文を確認してください。パートの数が記載されています。

## 関連情報

- [Clearstream](./clearstream)、[Text In Church](./text-in-church)：ネイティブの Zapier アプリを持つ別の SMS プロバイダーです（Webhooks by Zapier のステップは不要です）
- [Zapier（概要）](../zapier)：すべての Zapier レシピの B1 側の説明です
- [Mobile Message API ドキュメント](https://mobilemessage.com.au/api-documentation)
