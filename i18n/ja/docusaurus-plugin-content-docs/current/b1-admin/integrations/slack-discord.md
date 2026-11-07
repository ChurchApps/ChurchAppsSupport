---
title: "Slack と Discord"
description: "受信 Webhook を使い、新しい人物、献金、フォーム送信などの B1 Admin のイベントを Slack または Discord のチャンネルに投稿します。Zapier は不要です。"
---

# Slack と Discord

<div class="article-intro">

B1 から新しい人の登録、寄付、グループへの参加、フォームの送信、カレンダーのイベントなどの通知を、Slack または Discord のチャンネルに直接投稿できます。サードパーティのアカウントも、保守が必要な Zap も必要ありません。B1 がイベントをチャットメッセージの形式に整えて、チャンネルの Webhook URL に直接送信します。

</div>

<div class="prereqs">
<h4>始める前に</h4>

- B1Admin で **設定の編集** 権限が必要です
- チャンネルの Incoming Webhook を作成するために、Slack ワークスペースまたは Discord サーバーの管理者の協力が必要です
- 通知を受け取るチャンネルを決めてください（複数のイベントを同じチャンネルにまとめることも、チャンネルを分けることもできます）

</div>

## 仕組み

B1 には、チャットプラットフォーム向けの組み込みの **コネクタータイプ** があります。タイプが **Slack** または **Discord** の Webhook を作成すると、Webhook エンジンは通常どおり配信、再試行、署名付きヘッダーの処理を行います。ただし、送信される本文は B1 の通常の `{event,churchId,data}` 形式から、各サービスが期待する小さな `{text}`（Slack）または `{content}`（Discord）のメッセージ形式に変換されます。

既存の送信 Webhook の仕組み以外で、B1 のサーバーが教会ごとに Slack へアクセスすることはありません。新しく用意するものや、追加の費用もありません。

## Slack の手順

### 1. Slack の Incoming Webhook URL を取得する

1. 通知を受け取りたい Slack ワークスペースで [api.slack.com/apps](https://api.slack.com/apps) を開きます。
2. **Create New App → From scratch** をクリックし、「B1 Notifications」などの名前を付けて、ワークスペースを選択します。
3. 左側のメニューで **Incoming Webhooks** を選び、**Activate Incoming Webhooks** を *On* に切り替えます。
4. **Add New Webhook to Workspace** をクリックし、チャンネル（例：`#donations`）を選んでから **Allow** をクリックします。
5. Slack の画面に戻ると、`https://hooks.slack.com/services/T0XXXXXXX/B0YYYYYYY/zzz…` のような新しい **Webhook URL** が表示されます。これをコピーしてください。B1 に必要なのはこの情報だけです。

:::caution
Slack の Webhook URL は秘密情報として扱ってください。この URL を知っている人は、誰でもチャンネルに任意のメッセージを投稿できます。誤って公開してしまった場合は、Slack のアプリページで URL を再生成してください（再生成すると URL が変わるだけなので、B1 側の URL も更新してください）。
:::

### 2. B1Admin で接続する

1. B1Admin で **設定 → 開発者 → Webhook** に移動します。
2. **新しい Webhook** をクリックします。
3. 次の項目を入力します。
   - **名前**：「寄付 → #donations」のような、分かりやすい名前。この名前はチームのメンバーだけに表示されます。
   - **コネクタータイプ**：**Slack** を選びます。
   - **ペイロード URL**：手順 1 でコピーした Slack の URL を貼り付けます。
   - **イベント**：メッセージとして受け取りたいイベントにチェックを入れます。寄付用のチャンネルなら `donation.created` だけで十分です。#people チャンネルなら `person.created` と `group.member.added` を試してみてください。
4. **保存** をクリックします。「Signing Secret」のダイアログが表示されますが、Slack では署名を検証しないため無視して閉じて構いません。

### 3. テストする

一覧から Webhook を開き直し、**テストイベントを送信** をクリックします。1〜2 秒以内に、次のようなメッセージが Slack チャンネルに表示されます。

> 💝 新しい寄付: $50.00

同じ画面の **最近の配信** の表に新しい行が追加され、ステータスが `succeeded` と表示されれば完了です。

## Discord の手順

### 1. Discord の Webhook URL を取得する

1. Discord サーバーで、通知を受け取りたいチャンネルにカーソルを合わせ、**⚙ 歯車**（チャンネルを編集）をクリックします。
2. **連携 → Webhook → 新しい Webhook** を開きます。
3. 名前を付け、必要に応じてアバターを設定してから、**Webhook URL をコピー** をクリックします。`https://discord.com/api/webhooks/123…/abc…` のような形式の URL です。

### 2. B1Admin で接続する

**コネクタータイプ** を **Discord** に設定する以外は、上記の Slack の手順と同じです。Discord の URL を **ペイロード URL** に貼り付けて保存してください。

:::tip
Discord の URL の末尾に `/slack` を追加する **必要はありません**。B1 は Slack 互換の形式ではなく、Discord ネイティブの `{content}` 形式のペイロードを送信します。Discord が発行した URL をそのまま貼り付けてください。
:::

### 3. テストする

同じ **テストイベントを送信** ボタンを使います。Discord では選んだチャンネルにメッセージが表示され、配信ログのステータスが `succeeded` に変わります。

## メッセージの例

| イベント | メッセージの例 |
|---|---|
| `person.created` | 👤 新しい人が追加されました：Jordan Rivera |
| `person.updated` | 👤 人の情報が更新されました：Jordan Rivera |
| `group.created` | 👥 新しいグループが作成されました：火曜日の聖書の学び |
| `group.member.added` | ➕ グループにメンバーが追加されました |
| `donation.created` | 💝 新しい寄付：$50.00 |
| `donation.updated` | 💝 寄付が更新されました：$75.00 |
| `attendance.recorded` | ✅ 出席が記録されました |
| `form.submission.created` | 📝 新しいフォームの送信を受け取りました |
| `event.created` | 📅 新しいイベント：イースター礼拝 |

すべてのイベントは [Webhook イベントカタログ](/docs/developer/api/webhooks#event-catalog) にあります。そこに記載されているイベントは、どれでも Slack や Discord に振り分けられます。

## トピックごとにチャンネルを分ける

すべてのイベントを 1 か所にまとめる必要はありません。多くの教会では、いくつかの Webhook を設定しています。

- **#donations** チャンネル：`donation.created` だけを受け取る
- **#new-people** チャンネル：`person.created` と `group.member.added` を受け取る
- **#admin-alerts** チャンネル：`form.submission.created` など、件数の少ない通知を受け取る

教会ごとの Webhook の数に上限はありません。それぞれの Webhook は独立しているため、ある Webhook を削除したり無効にしたりしても、他の Webhook には影響しません。

## 配信の確認

Webhook 編集画面の **最近の配信** の表には、直近 50 件の送信履歴が表示されます。行をクリックすると、実際に送信されたペイロードと、返ってきたレスポンスを確認できます。Slack のコネクタの場合、ペイロードは `{"text":"💝 New donation: $50.00"}` のようになります。B1 は配信前に変換するため、元の `{event,churchId,...}` 形式のデータにはなりません。

配信が失敗した場合（赤色の `failed` または `exhausted` バッジ）、ダイアログには HTTP ステータスとレスポンス本文が表示されます。これを見れば、Slack や Discord がどこを受け付けなかったのか正確に分かります。多くの場合、URL のコピーミスが原因です。

## トラブルシューティング

- **メッセージが表示されず、配信ステータスが `400`** — 通常、コネクタータイプが **Standard** のままで、URL が Slack または Discord のものになっています。Slack と Discord は元の形式のデータを受け付けません。ドロップダウンを **Slack** または **Discord** に切り替えて、テストを再送信してください。
- **Webhook が自動的に無効になった** — 配信が 3 回連続で失敗すると、B1 は Webhook を停止します。URL を修正し（Slack や Discord で URL を再生成した場合も含む）、**有効** を再度オンにしてください。
- **メッセージは届いたが詳細が不足している** — どのチャットプラットフォームにもメッセージサイズの上限があります。B1 のメッセージは意図的に 1 行の簡潔なものになっています。より詳しい通知が必要な場合は、[Zapier](./zapier.md) または [Make](./make.md) を使い、Slack のアクションで詳細なメッセージを作成してください。

## 後からコネクタータイプを変更する

既存の Webhook のコネクタータイプは変更できます。変更内容は次回の配信から反映されます。Slack から Standard に切り替える場合は、URL を自社の HTTPS エンドポイントに変更してください。Webhook の作成時に発行された同じ署名シークレットを使って、元の形式のデータを検証できるようになります。

## 関連項目

- [Zapier](./zapier.md) — B1 のイベントをきっかけに、複数のステップからなるワークフローを実行したい場合
- [Make](./make.md) — ビジュアルなシナリオビルダー
- [Webhook（開発者向けリファレンス）](/docs/developer/api/webhooks) — 独自のサーバーに Webhook を向ける場合の、ペイロードと署名形式の詳細
