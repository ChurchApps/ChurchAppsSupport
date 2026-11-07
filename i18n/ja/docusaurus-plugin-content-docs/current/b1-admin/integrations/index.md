---
title: "連携"
description: "B1 Admin を Slack、Discord、Zapier、Make、Google スプレッドシート、Claude などの AI アシスタントに接続します。各連携の設定手順と必要な API キーの権限を説明します。"
---

# 連携

<div class="article-intro">

B1 は、チームがすでに使っているツールと連携できます。スタッフへの通知には Slack や Discord に接続し、Zapier や Make で業務を自動化し、Google スプレッドシートへのデータ書き出しをいつでも行えます。別途の連携プラットフォームを契約する必要はなく、ChurchApps 側で追加のサーバーを運用することもありません。すべての連携は各サービス提供元のインフラ上で動作し、B1 の Webhook や REST API を通じて教会のデータとやり取りします。

</div>

## 利用できる連携

| 連携先 | 内容 | 方向 | 設定にかかる時間 |
|---|---|---|---|
| **[Slack](./slack-discord.md)** | 新しい人の登録、献金、申し込みなどの通知を読みやすい形式で Slack チャンネルに投稿 | B1 → Slack | 2分 |
| **[Discord](./slack-discord.md)** | 同じ内容を Discord チャンネルに投稿 | B1 → Discord | 2分 |
| **[Zapier](./zapier.md)** | B1 のイベントをトリガーにし、Zapier の 7,000 以上のアプリで B1 の操作を実行 | 双方向 | Zap ごとに 5～10分 |
| **[Make](./make.md)** | Zapier と同じ考え方を、Make のビジュアルなシナリオ作成画面で実現 | 双方向 | シナリオごとに 5～10分 |
| **[Google スプレッドシート](./google-sheets.md)** | 人、献金、グループ、出席データを必要なときにスプレッドシートへ書き出し | B1 → シート | 5分 |
| **[Claude](./claude.md)** | Anthropic の Claude に、あなたの権限の範囲内で教会データについて質問。試用は無料で、おすすめです | 双方向 | 3分未満 |
| **[ChatGPT](./chatgpt.md)** | OpenAI の ChatGPT で同じことを実現（有料の ChatGPT プランが必要） | 双方向 | 10分 |
| **[接続サービス](./services/index.md)** | Mailchimp、Donorbox、Subsplash、VOMO、Clearstream、Text In Church、Mobile Message、Checkr の設定手順集 | サービスによる | それぞれ 5～10分 |

## 選び方

- **チャットに通知を届けたいだけ**なら、**Slack** か **Discord** を使いましょう。第三者のアカウントは不要で、管理する Zap もありません。設定はすべて B1Admin 内で完結します。
- **複数のアプリにまたがる自動化**（例：「献金があったら、Mailchimp のリストに追加し、Slack の #donations に通知する」）をしたい場合は、**Zapier** か **Make** を使いましょう。Zapier は使いやすく、Make は規模が大きくなるほど低コストで、より柔軟なロジックを組めます。
- **単発のデータ取得や定期レポート**が必要なら、**Google スプレッドシート**を使いましょう。アドオンのサイドバーに API キーを貼り付けて、書き出しをクリックします。
- **平易な言葉で質問したい**（「先週の日曜日に初めて来た人は何人？」「今月の献金を要約して」など）なら、まずは **[Claude](./claude.md)** から始めましょう。試用は無料で、3分未満で設定できます。有料プランがあれば **[ChatGPT](./chatgpt.md)** も利用できます。Claude は B1 アカウントでサインインして接続し、ChatGPT は B1 の API キーを使います。
- **独自の連携を作りたい**場合は、上記のどれでもありません。[API キー](/docs/developer/api/api-keys)を使って [REST API](/docs/developer/api) を直接呼び出すか、管理下のサーバーを [Webhook](/docs/developer/api/webhooks) に登録してください。

## 共通の仕組み

すべての連携は **B1 の API キー**で認証します。このキーは B1Admin の **Settings → Developer → API Keys** で作成します。API キーには次の特徴があります。

- 教会内の特定の人物に紐づき、その人物の権限を引き継ぐ
- **スコープ**で権限を絞り込める。たとえば Google スプレッドシートの書き出しには `people:read` だけで十分で、`settings:write` は不要
- いつでも取り消せる。取り消すと、その連携のアクセスだけがすぐに止まり、他には影響しない

一部のコネクタ（Zapier、Make）は、Zap またはシナリオをオンにしたときに、代わりに [Webhook](/docs/developer/api/webhooks) を登録し、オフにしたときに削除します。Webhook の URL を自分で管理する必要はありません。

:::tip
Zapier と Make が Webhook を自動的に登録できるようにするには、API キーに **`settings:write`** スコープが必要です（連携先のリソースに対するスコープも必要です）。読み取り専用のキーでも、アクションと書き出しは利用できますが、トリガーは利用できません。
:::

## 費用

ChurchApps は無料のオープンソースです。Slack と Discord、[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)、そして公式の Zapier、Make、Google スプレッドシート用コネクタも、当方側では無料です。各サービスの提供元は、自社のプラットフォームに対して料金を請求する場合があります。（Zapier と Make はどちらも無料枠が充実しています。Slack、Discord、Google スプレッドシートは、この用途であれば無料です。）

## 独自に構築する

上記のどれも合わない場合でも、B1 のすべての機能は外部から利用できます。

- **[REST API](/docs/developer/api)**：`Authorization: Bearer cak_…` ヘッダーを付ければ、どの言語からでも B1 を呼び出せます
- **[Webhook](/docs/developer/api/webhooks)**：公開された HTTPS エンドポイントを、1つ以上のイベントタイプに登録すると、署名付きの JSON ペイロードを受け取れます
- **[OAuth と接続アプリ](/docs/developer/api/connected-apps)**：多くの教会で使われる SaaS 製品を開発する場合に使用します

## 次のステップ

- [Slack と Discord](./slack-discord.md)：チャットへの通知を投稿する
- [Zapier](./zapier.md)：7,000 以上のアプリと接続する
- [Make](./make.md)：ビジュアルなワークフロー自動化
- [Google スプレッドシート](./google-sheets.md)：スプレッドシートへ書き出す
- [Claude](./claude.md)：Anthropic の Claude に教会データについて質問する
- [ChatGPT](./chatgpt.md)：OpenAI の ChatGPT に教会データについて質問する
- [接続サービス](./services/index.md)：サービスごとの設定手順（Mailchimp、Donorbox、Clearstream など）
