---
title: "Google スプレッドシート"
---

# Google スプレッドシート

<div class="article-intro">

**B1 Export** は、B1.church 向けの公式 Google スプレッドシート用アドオンです。任意のスプレッドシートにサイドバーを追加し、B1 教会の人物、献金、グループ、出席のデータを、ワンクリックで名前付きのタブにエクスポートできます。このアドオンは完全にユーザーの Google アカウント内で動作します。各エクスポートで行われる読み取り専用の API 呼び出しを除けば、ChurchApps のサーバーには一切関与しません。

</div>

<div class="prereqs">
<h4>始める前に</h4>

- エクスポート先のスプレッドシートに編集権限がある Google アカウント
- エクスポートしたいデータへの読み取り権限を持つ教会管理者（または同等の権限を持つ人）。B1 の API キーを発行できる必要があります
- Google Workspace Marketplace からインストールした B1 Export アドオン

</div>

## エクスポートされる内容

| メニュー項目 | シートのタブ | データ |
|---|---|---|
| Export People | `B1 People` | ID、表示名、名、姓、メールアドレス、会員ステータス |
| Export Donations | `B1 Donations` | ID、人物ID、日付、金額、支払い方法、バッチID |
| Export Groups | `B1 Groups` | ID、名前、カテゴリ、メンバー数 |
| Export Attendance | `B1 Attendance` | ID、人物ID、来場日、サービスID、グループID |

エクスポートを実行するたびに、対応する名前付きタブの内容が**置き換えられます**。再実行すると行が追加されるのではなく、最新のスナップショットが得られます。スプレッドシートのほかのタブは変更されません。

## セットアップ

### 1. 適切なスコープを持つ B1 API キーを作成する

1. B1Admin で **Settings → Developer → API Keys** を開きます。
2. **New API Key** をクリックし、名前を "Sheets Export" に設定して、エクスポートする対象に応じた **read** スコープを付与します。
   - 人物のエクスポートには `people:read`
   - 献金のエクスポートには `donations:read`
   - グループのエクスポートには `groups:read`
   - 出席のエクスポートには `attendance:read`
3. エクスポートだけに使うキーには `settings:write` は**不要**です。このスコープは Webhook を登録するコネクタ（Zapier / Make）専用です。キーの権限は必要最小限に保ってください。
4. 保存して `cak_…` で始まるキーをコピーします。

### 2. アドオンをインストールする

1. エクスポート先のスプレッドシートを開きます。
2. **Extensions → Add-ons → Get add-ons** を選択します。
3. **B1 Export** を検索してインストールします。Google からスプレッドシートへのアクセスと外部 HTTP リクエストの許可を求められます。外部 HTTP の許可は、アドオンが B1 API を呼び出すために必要です。

インストールが完了すると、この Google アカウントで開くすべてのスプレッドシートの **Extensions** メニューに **B1 Export** が表示されます。

### 3. キーを接続する

1. **Extensions → B1 Export → Connect…** を選択します。初回以降は、メニューバーの **B1 Export → Connect…** からも開けます。
2. API キーをサイドバーに貼り付けます。テスト環境に接続する場合を除き、Base URL は `https://api.churchapps.org` のままにして、**Save** をクリックします。
3. **Test Connection** をクリックします。緑色の "Connection OK" が表示されれば、キーは正しく機能しています。

キーは**ユーザーごとのプロパティ**（`PropertiesService.getUserProperties()`）に保存されます。このキーはあなたの Google アカウントに紐づき、スプレッドシートに書き込まれることはなく、ほかの編集者にも表示されません。

## エクスポートの実行

次のいずれかの方法で実行します。

- **メニューから** — **Extensions → B1 Export → Export People**（Donations / Groups / Attendance も同様）を選択します
- **サイドバーから** — サイドバーを開き（Connect…）、対応するデータセットのボタンをクリックします

完了すると通知が表示されます。例：「_N_ 行を 'B1 People' に書き込みました。」

## エクスポートしたデータでレポートを作成する

エクスポートされたタブは通常の Google スプレッドシートのデータです。タブを参照する数式を使って、独自の分析を作成できます。

- カード献金を合計する**集計タブ**：`=SUMIF('B1 Donations'!E:E, "card", 'B1 Donations'!D:D)`
- 会員だけを抽出する**フィルター表示**：`=FILTER('B1 People'!A:F, 'B1 People'!F:F = "Member")`
- `B1 Attendance` のデータを使った出席の推移の**グラフ**

エクスポートを再実行すると元のタブが更新され、数式の結果も自動的に反映されます。

## 定期エクスポートの設定

このアドオンは、デフォルトでは必要なときに手動で実行する仕組みです。週次や月次でエクスポートしたい場合は、Apps Script の時間主導型トリガーを使います。

1. スプレッドシートで **Extensions → Apps Script** を開きます（アドオンに紐づいたスクリプトが開きます）。
2. 左側のサイドバーにある **⏰ Triggers** アイコンをクリックします。
3. `exportPeople`（または任意のエクスポート関数）の **Add Trigger** をクリックします。イベントの種類として *Time-driven*、*Week timer* を選び、たとえば *Every Monday 6am* のように設定します。

エクスポートは、あなたの Google アカウントの権限でバックグラウンド実行されます。API キーが更新または無効化されて実行に失敗した場合は、次回の失敗時にトリガーからメールが届きます。

## 権限とプライバシー

- このアドオンが要求するのは `spreadsheets.currentonly`（開いているスプレッドシートのみ操作可能）と `script.external_request`（`UrlFetchApp` で B1 API を呼び出すため）だけです。Google ドライブ、Gmail、そのほかの Google データにはアクセスしません。
- B1 API キーはユーザーごとに保存されるため、同じスプレッドシートのほかの編集者からは見えません。
- B1 API へのすべての呼び出しは、`Authorization: Bearer cak_…` ヘッダーを付けて HTTPS 経由で行われます。

## トラブルシューティング

- **"No API key set"** — **Extensions → B1 Export → Connect…** を開き、キーを貼り付けてください。
- **"B1 rejected the API key (401)"** — キーが無効化されたか、誤っています。キーを再発行して貼り付け直してください。
- **"This API key lacks permission for /giving/donations (403)"** — キーに `donations:read` がありません。B1Admin でキーのスコープを更新してください。
- **実行後にシートが更新されない** — 参照しているタブ名（`B1 People` など）が正しいか確認してください。タブが存在しない場合は、エクスポート時に自動作成されます。
- **"Quota exceeded"** — Apps Script では、`UrlFetchApp` にユーザーごとの 1 日あたりの上限があります（通常は 1 日数千回の呼び出し）。レコード数が多い教会では、エクスポートを複数日に分けるか、大量データの同期には [Make](./make) やカスタム連携を使う必要があるかもしれません。

## アドオンのカスタマイズ

このアドオンはオープンソースです。Apps Script のプロジェクトは `B1Integrations/GoogleSheetsAddon/` リポジトリにあります。エクスポートしていない列や、別のデータセット、別の出力形式が必要な場合は、そのリポジトリに Issue または PR を作成してください。

## 関連情報

- [Zapier](./zapier) — オンデマンドのエクスポートではなく、リアルタイムの同期が必要な場合
- [Make](./make) — より複雑な変換を伴う同期が必要な場合
- [API キー（開発者向けリファレンス）](/docs/developer/api/api-keys)
