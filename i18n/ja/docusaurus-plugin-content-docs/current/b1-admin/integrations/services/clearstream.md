---
title: "Clearstream"
description: "Zapier を通じて Clearstream SMS を B1 Admin に接続します。新しい献金やフォーム送信時にテキストを送り、届いた返信を人物情報として取り込みます。"
---

# Clearstream

<div class="article-intro">

B1の任意のイベント（新しい人の登録、新しい献金、フォーム送信、カレンダーの更新など）から[Clearstream](https://clearstream.io)のテキストメッセージを送信し、返信をB1のレコードとして取り込めます。Clearstream の Zapier アプリは両方向に対応しているため、全体の設定はカスタムコードではなくレシピとして構成できます。

</div>

<div class="prereqs">
<h4>始める前に</h4>

- 少なくとも1つのリストとSMS送信枠がある[Clearstream](https://clearstream.io)アカウント
- [Zapier](https://zapier.com)アカウント
- **Edit Settings**権限を持つB1Adminユーザー

</div>

## 構成できる内容

| 方向 | トリガー | アクション |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream: Create/Update Subscriber + Send Text to Number |
| B1 → Clearstream | B1 `donation.created` | Clearstream: Send Text to List（例：財務チームへの通知） |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream: Send Text to a routing list（例：祈りの依頼チームへの送信） |
| Clearstream → B1 | New Incoming Text | B1: Create Person。受信したキーワードでタグ付け |

Clearstream の Zapier アクション：*Send Text to Number*、*Send Text to List*、*Create/Update Subscriber*、*Add Subscriber to Automated Workflow*、*Add Tag to Subscriber*、*Remove Subscriber From List*。

## セットアップ

### 1. B1のAPIキーを発行する

**Settings → Developer → API Keys → New API Key**：

- `settings:write`：B1がトリガーのWebhookを登録するために必要です
- `people:read`：イベントから人物を検索するために必要です（`personId` → 名前/電話番号/メールアドレス）
- （任意）Clearstream からの返信でB1の連絡先を作成する場合は `people:write`

### 2. 「新しい献金のテキスト送信」Zapを作成する

1. **トリガー**：B1.church: New Donation
2. **アクション**：B1.church: Find Person（献金の `personId`）
3. **アクション**：Clearstream: Send Text to Number。受信者には手順2で取得した人物の電話番号を指定し、メッセージを作成します（`"Thanks for your gift, {first}! …"`）。

Zapをオンにします。B1はオンにした時点で献金のWebhookを登録します。**Settings → Developer → Webhooks** に `Zapier — donation.created` が表示されます。

### 3.（任意）返信をB1のレコードとして取り込む

1. **トリガー**：Clearstream: New Incoming Text
2. **アクション**：キーワードでZapierのフィルターを適用します。例：テキスト本文が `PRAY` で始まる場合のみ続行
3. **アクション**：B1.church: Find Person（電話番号で検索）
4. **アクション**：フィルター/パス。見つからなければ作成します。いずれの場合も、テキスト本文を保存先（Slack、Google スプレッドシート、または Webhooks by Zapier 経由の B1 フォーム送信）に記録します。

## よく使うレシピ

### ボランティアチームへの呼び出し

- **トリガー**：B1.church: New Form Submission（祈りの依頼フォームのIDでフィルター）
- **アクション**：Clearstream: Send Text to List。宛先は当番の牧会チームのリストです。本文は `New prayer request: {data.questions.0.answer}` と記述します。

### 初めての来訪者へのフォローアップ

- **トリガー**：B1.church: New Person。B1の人物タグ「First-time visitor」でフィルター
- **アクション**：Clearstream: Add Subscriber to Automated Workflow。ワークフローのIDを、あらかじめ用意した7日間のテキスト配信に対応付けます。

### キーワードによるグループ参加

- **トリガー**：Clearstream: New Incoming Text（キーワード `MENS` でフィルター）
- **アクション**：B1.church: Find Person（電話番号で検索）。見つからなかった場合の分岐 → Create Person
- **アクション**：B1.church: Add Group Member。Men's Ministry グループに追加します

## 制限と注意事項

- **Clearstream はSMSをメッセージ単位で計測します。** Send Text アクションは、本文の長さと受信者数に応じて1つ以上のクレジットを消費します。ご利用のプランの枠を確認してください。
- **Send Text to Number** で使う電話番号は **E.164形式**（例：`+15555550199`）である必要があります。B1の人物レコードには入力された値がそのまま保存されます。形式を保証できない場合は、*Formatter by Zapier — Numbers → Format Phone Number* のステップを使用してください。
- **B1側でヘッダーの設定は不要です。** Clearstream の認証はすべて Zapier の接続内で完結します。

## トラブルシューティング

- **トリガーが実行されない**：Zapをオンにした後、`Settings → Developer → Webhooks` に `Zapier — <event>` の行が表示されるはずです。表示されない場合、B1のAPIキーに `settings:write` が不足しています。キーを再発行し、接続し直してください。
- **Clearstream が「Invalid phone number」と返す**：受信者の項目がE.164形式になっていません。Format Phone Number のステップを追加してください。
- **Send Text to List が `403` で失敗する**：Clearstream のAPIユーザーにそのリストへの権限がないか、リストIDが誤っています。リストIDは Clearstream のリスト詳細ページで確認できます。

## 関連項目

- [Text In Church](./text-in-church.md)：別のSMSプラットフォーム。構成は似ています
- [Mobile Message](./mobile-message.md)：米国以外の教会向け
- [Zapier（概要）](../zapier.md)：すべての Zapier レシピに共通する B1 側の説明
- [Clearstream API docs](https://api-docs.clearstream.io/)：Zapier アプリの範囲を超えるカスタム連携向け
