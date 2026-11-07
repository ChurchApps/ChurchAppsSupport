---
title: "Donorbox"
description: "Zapier で Donorbox を B1 Admin に接続し、オンライン献金から献金記録と献金者のプロフィールが手作業のエクスポートなしで自動的に作成されるようにします。"
---

# Donorbox

<div class="article-intro">

Donorbox で寄付を受け付けつつ、人や寄付金領収書の管理は B1 で行っている教会では、Donorbox の即時 Zapier トリガーを使って、B1 内に対応する寄付記録を自動作成できます。寄付者がまだ存在しない場合は、B1 の人物レコードとしても作成されます。手作業での突き合わせも、毎月のエクスポートも必要ありません。

</div>

<div class="prereqs">
<h4>始める前に</h4>

- 少なくとも 1 つのキャンペーンがある [Donorbox](https://donorbox.org) アカウント
- [Zapier](https://zapier.com) アカウント
- **Edit Settings** 権限を持つ B1Admin ユーザー

</div>

## 設定できる連携

| 方向 | Donorbox のトリガー | B1 のアクション |
|---|---|---|
| Donorbox → B1 | New or Updated Donation（即時） | Find Person → Add Donation |
| Donorbox → B1 | New or Updated Donor | Create Person |
| Donorbox → B1 | New or Updated Plan（定期寄付） | Find Person → Add Donation（メモにプラン ID を使用） |

Donorbox のトリガーは **即時** 型として提供されており、実際の寄付から数秒以内に発火します。ポーリングによる遅延はありません。

## セットアップ

### 1. B1 の API キーを発行する

B1Admin で **Settings → Developer → API Keys → New API Key** を開きます。スコープは次のとおりです。

- `people:read` — メールアドレスで寄付者を検索するため
- `people:write` — 寄付者が新規の場合に作成するため
- `donations:write` — 寄付を記録するため

この方向のトリガーは B1 ではなく Donorbox 側のものなので、ここで `settings:write` は必要ありません。

### 2. 「寄付を記録する」Zap を作成する

1. **トリガー** — Donorbox: New Donation。Donorbox の API キーを使って接続します（Donorbox で *Account → Profile → API Settings* を開きます）。
2. **アクション** — B1.church: Find Person。トリガーから得た寄付者のメールアドレスを *Email* の検索フィールドに割り当てます。
3. **アクション** — Filter by Zapier（任意）: 寄付者が見つからなかった場合にのみ続行します。
4. **アクション** — B1.church: Create Person。名、姓、メールアドレスを割り当て、寄付者が単なる寄付記録ではなく、メンバーとして登録されるようにします。
5. **アクション** — B1.church: Add Donation。次のように割り当てます。
   - 金額 → `data.amount`
   - 寄付日 → トリガーの寄付日
   - 基金 → Donorbox のキャンペーンに対応する B1 の基金を選択します（Zapier では、フィルターや整形ステップを使って基金を切り替えることもできます）
   - 方法 → 「Online」
   - メモ → Donorbox のトランザクション ID（照合時に便利です）

Zap をオンにします。次に Donorbox で実際の寄付が行われると、自動的に **B1Admin → Donations** に記録されます。

## よくあるレシピ

### 基金ごとに 1 つの Zap

複数の Donorbox キャンペーンをそれぞれ別の B1 基金に対応させる場合は、キャンペーンごとに 1 つの Zap を作成し、先頭に Donorbox の *campaign* フィルターを置くのが最も簡潔です。こうすると基金の対応関係が固定され、検索ステップを省けます。

### 更新された寄付を訂正として扱う

Donorbox の *New or Updated Donation* は、編集時にも発火します。Zapier の *Path* ステップで `event_type` によって処理を分岐させます。「new」の場合は Add Donation、「updated」の場合は Find Donation と Update を実行します（注意: B1 の Zapier アプリには現在 Update Donation アクションがありません。当面は「updated」イベントを Slack チャンネルに送り、手動で確認してください）。

### 定期プランの変更を Slack チャンネルに通知する

- **トリガー** — Donorbox: New or Updated Plan
- **アクション** — Slack: Send Message を `#donations` に送信（例: 「プランを変更 — Sarah さんの毎月の寄付は現在 200 ドルです」）

## 制限事項と注意点

- **寄付者はメールアドレスで照合してください。** Donorbox は B1 の人物 ID を共有しないため、永続的に照合できるキーはメールアドレスだけです。別のメールアドレスで寄付する人は、B1 に新しい人物として作成されます。毎月の照合ではこの点を確認してください。
- **返金は個別には表示されません。** Donorbox は同じ寄付に対してステータス更新を送信します。B1 の Zapier アプリには現在 *Update Donation* アクションがないため、現時点で安全な方法は、返金イベントを別途記録し、寄付を手動で調整することです。
- **まず Donorbox のサンドボックスでテストしてください。** 本番の B1 に架空の寄付が作成されるのを防げます。Donorbox は、本番用とは別のテストモード用認証情報を提供しています。

## トラブルシューティング

- **毎回「Person not found」の警告が出る** — *Create Person* が not-found の分岐で実行されるように手順を並べていれば問題ありません。Create Person ステップも実行されない場合は、API キーに `people:write` 権限があるか確認してください。
- **寄付金額が 100 倍大きい、または小さい** — Donorbox は、ペイロードの種類によって金額をセント単位で送る場合と、ドル単位で送る場合があります。必要に応じて *Formatter by Zapier — Numbers* ステップで 100 で割ってください。
- **1 件の寄付が重複して記録される** — Donorbox は *New Donation* と *Updated Donation* の両方を発火させます。`event_type = "donation.succeeded"` でフィルターするか、重複しないフィルターを持つ 2 つの Zap を作成してください。

## 関連項目

- [Zapier（概要）](../zapier.md) — すべての Zapier レシピの B1 側の説明
- [Subsplash](./subsplash.md) — Zapier アプリを持つ別の寄付プラットフォーム
- [Mailchimp](./mailchimp.md) — 「新しい寄付」をメールタグに連携
