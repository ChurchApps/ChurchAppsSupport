---
title: "Zapier"
description: "B1 Admin を Zapier に接続し、新しい人物、献金、グループメンバーをきっかけに自動化を開始します。コーディング不要で、B1 にレコードを書き戻すこともできます。"
---

# Zapier

<div class="article-intro">

Zapier 上の公式 B1.church アプリを使うと、教会内で起きたイベント（新しい人物の登録、新しい献金、新しいグループメンバーなど）をきっかけに Zap を実行し、B1 にレコードを書き戻せます。コーディングもインフラの準備も不要です。Zapier のドラッグ＆ドロップ式エディターで設定し、API キーを貼り付けて、Zap をオンにするだけです。

</div>

:::caution Zapier の審査待ち
B1.church アプリは構築済みで動作していますが、Zap エディターのアプリディレクトリに一般公開される前に、Zapier による審査を待っている段階です。承認されるまでは、招待されたアカウントのみが利用できます。以下の内容は、承認後の動作を説明したものです。
:::

<div class="prereqs">
<h4>始める前に</h4>

- [Zapier](https://zapier.com) のアカウント（数個の Zap であれば無料プランで十分です）
- B1Admin で **Edit Settings** 権限を持つ教会の管理者（API キーを作成します）
- 実現したいことのイメージ（例：「B1 で人物を追加したら、Mailchimp のリストにも追加する」）

</div>

## トリガーとアクション

| 種類 | 内容 | B1 のイベント / エンドポイント |
|---|---|---|
| **トリガー** | New Person | `person.created` |
| **トリガー** | Updated Person | `person.updated` |
| **トリガー** | New Donation | `donation.created` |
| **トリガー** | New Group Member | `group.member.added` |
| **トリガー** | New Form Submission | `form.submission.created` |
| **アクション** | Create Person | 新しい人物を追加する |
| **アクション** | Add Donation | 献金を記録する |
| **アクション** | Add Group Member | 人物をグループに追加する |
| **アクション** | Find Person | ID、メールアドレス、または名前で人物を検索する。該当者がいない場合はタスクが失敗する |

これらは Zapier が対応する 7,000 以上のアプリと自由に組み合わせられます。

## セットアップ

### 1. B1 API キーを作成する

1. B1Admin で **Settings → Developer → API Keys** に移動します。
2. **New API Key** をクリックし、「Zapier」などの名前を付けて、Zap に必要なスコープを選択します。
3. **重要：** Zapier のトリガーは、Zap をオンにした際に代わりに Webhook を登録します。そのためには **`settings:write`** スコープが必要です。いずれかの Zap で B1 のトリガーを使う場合は、必ず `settings:write` を含めてください。
4. アクションに必要なスコープも付与します。たとえば「Add Donation」アクションには `donations:write`、「Create Person」アクションには `people:write` が必要です。
5. 保存します。完全な `cak_…` キーは **一度だけ** 表示されるので、必ずコピーしてください。

### 2. Zapier を B1 に接続する

1. Zapier で新しい Zap を作成します。
2. B1 のトリガーまたはアクションを初めて選択すると、Zapier から **Sign in to B1.church** を求められます。
3. 手順 1 で作成した API キーを貼り付け、**Yes, Continue** をクリックします。Zapier がお使いの教会に対してキーを検証します。

この接続は Zapier に保存され、お使いのアカウントのすべての Zap で再利用されます。

### 3. Zap を作成する

トリガーを選択し、1 つ以上のアクションステップを追加します。以下に例を示します。

## よくある活用例

### 新しい B1 の人物を Mailchimp に追加する

- **トリガー** — B1：New Person
- **アクション** — Mailchimp：Add/Update Subscriber。B1 の `name__first`、`name__last`、`contactInfo__email` を、Mailchimp の First Name / Last Name / Email フィールドに対応付けます。

### 献金を Slack チャンネルに投稿する（標準のコネクターより詳細なカード形式）

- **トリガー** — B1：New Donation
- **アクション** — Slack：Send Channel Message。標準の [Slackコネクター](./slack-discord.md) ではできない、ボタンや添付ファイルなどを含む任意のレイアウトを作成できます。

### 新しいグループメンバーを Google グループに追加する

- **トリガー** — B1：New Group Member（特定の `groupId` で絞り込み）
- **アクション** — Filter by Zapier：対象の B1 グループの場合のみ次に進みます
- **アクション** — B1：Find Person（トリガーの `personId` を使ってメールアドレスを取得します）
- **アクション** — Google Groups：Add Member

### フォームの送信内容をプロジェクト管理ツールに転送する

- **トリガー** — B1：New Form Submission
- **アクション** — Notion / Linear / Asana / Trello：Create page / issue / task

## トリガーの仕組み

トリガーは定期的な問い合わせ（ポーリング）ではなく **REST フック** で動作します。15 分ごとに B1 へ問い合わせるわけではありません。Zap をオンにすると、Zapier は非公開の Zapier URL を指す Webhook を B1 に登録するよう依頼します。イベントが発生すると、B1 はそのデータを Zapier に POST し、Zap が **数秒以内に** 実行されます。Zap をオフにすると、Zapier は B1 に Webhook の削除を依頼するので、不要な購読が残ることはありません。

そのため、トリガーは Zap をオンにした **後** に発生したイベントに対してのみ動作します。過去のデータは遡って処理されません。Zap をオンにしても、前日の献金が再実行されることはありません。

## 制限と注意事項

- **同じトリガーを使う複数の Zap** は、それぞれ独自の B1 Webhook を登録します。競合は起きませんが、**Settings → Developer → Webhooks** を確認した際に「Zapier — donation.created」という同名の行が 3 つ並んでいても、驚かないようにしてください。
- **Zap 設定時のテストデータ** — Zap を作成すると、フィールドを対応付けるためのサンプルデータを Zapier が求めます。該当するイベントが B1 にあれば、直近のものを取得します。なければ、アプリ定義に含まれる合成サンプルを使用します。
- **アクションの失敗は Zap のエラーとして表示されます** — Zapier のタスク履歴に記録されます。よくある原因は、必要なスコープがない API キーです（例：「Add Donation」アクションには `donations:write` が必要）。正しいスコープで API キーを作り直し、Zapier で再接続してください。
- **外部 API 呼び出しの上限** — アクションから行われるすべての B1 API 呼び出しは、Zapier のタスク上限に計上されます。B1 側の利用枠には影響しません。

## トラブルシューティング

- **接続時に「Authentication failed」と表示される** — API キーが誤っているか、取り消されているか、または Zap に必要なスコープが不足しています。B1Admin で、少なくとも `settings:write` と、Zap が使用するリソースのスコープを含めて API キーを作り直し、接続を更新してください。
- **トリガーが動作しない** — Webhook が正しく登録されたか確認してください。B1Admin の **Settings → Developer → Webhooks** に「Zapier — &lt;event&gt;」という行が表示されるはずです。表示されない場合は、Zap をオンにした時点で API キーに `settings:write` がなかった可能性が高いです。キーを修正し、Zap をオフにしてから再度オンにしてください。
- **トリガーが 2 回実行される** — Zapier は、応答が失われた場合にまれにイベントを再送します。厳密な重複排除が必要な場合は、一意の ID（例：人物の `id`）に対して「Filter by Zapier」ステップを使用してください。

## 関連項目

- [Make](./make.md) — 同じ仕組みを別のプラットフォームで実現する方法
- [Slack & Discord](./slack-discord.md) — Zapier を使わない、よりシンプルなチャット通知
- [Webhooks（開発者向けリファレンス）](/docs/developer/api/webhooks)
