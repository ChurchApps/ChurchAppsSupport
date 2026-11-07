---
title: "Checkr"
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com)は、スタッフやボランティアの身元調査（バックグラウンドチェック）を行うサービスです。子どもや若者向けのプログラムを運営する教会であれば、ほぼどこでも必要になる仕組みです。B1には**身元調査の機能が組み込まれていません**。調査の発注、結果の管理、審査のコンプライアンスはすべてCheckrで行います。以下の手順では、B1のイベントをCheckrにつなぐ部分だけを設定します。Checkrには Zapier のアプリはありませんが、[Make.comのCheckr連携](https://www.make.com/en/integrations/checkr)は動作確認済みで、B1のイベントから調査を開始するために必要なアクションを利用できます。

</div>

<div class="prereqs">
<h4>始める前に</h4>

- APIアクセスと、少なくとも1つの審査パッケージが設定された[Checkr](https://checkr.com)アカウント
- [Make](https://www.make.com)アカウント
- **設定の編集**権限を持つB1Adminユーザー

</div>

## 連携できる内容

MakeのCheckrアプリは、1つのトリガーと6つのアクションを提供します。

| 方向 | B1 / Makeのトリガー | アクション |
|---|---|---|
| B1 → Checkr | B1 `group.member.added`（ボランティアグループに絞り込み） | Checkr: Create Candidate → Create Background Check Invitation |
| Checkr → B1 | Checkrのwebhook（招待 / レポートのイベント） | B1: 本人の記録を更新（例：タグ「Checkr cleared」を付与） |

MakeのCheckrアクション：Create Candidate、Create Background Check Invitation、Get Candidate、Get Report、Get Report's ETA、Get an Invitation。このほか、検索モジュールが4つあります。

## セットアップ

### 1. B1のAPIキーを発行する

**設定 → 開発者 → APIキー → 新しいAPIキー**：

- `settings:write` — トリガーのwebhook用
- `people:read` — 調査を開始する際に、本人の氏名やメールアドレスを調べるため
- （任意）`people:write` — 審査結果をカスタムフィールドやタグとして書き戻したい場合

### 2. Makeで「ボランティア登録時に身元調査を開始する」シナリオを作る

1. **トリガー** — B1.church：イベントを監視（`group.member.added`）。
2. **フィルター** — `data.groupId` が「子どもボランティア」（または同等のグループ）に一致する場合のみ処理を続行。
3. **アクション** — B1.church：人物を検索（`data.personId` を使用）し、メールアドレスと姓名を取得。
4. **アクション** — Checkr：Create Candidate。手順3の値を姓・名・メールにマッピング。
5. **アクション** — Checkr：Create Background Check Invitation。手順4で作成された候補者IDを *candidate_id* フィールドに設定。審査パッケージ（例：`tasker_standard`、またはお使いのアカウントで利用できるもの）を選択。
6. （任意）**アクション** — Slack：セーフミニストリーの担当者に、身元調査を開始したことを通知。

シナリオをオンにします。対象グループに新しく参加したボランティアには、メールでCheckrの招待が自動的に届きます。本人がスマートフォンやパソコンで手続きを行い、Checkrが審査を実施します。

### 3.（任意）審査結果を受け取る

1. **トリガー** — Checkr：Watch Events（webhook）。Makeはシナリオを有効化すると、Checkrにwebhookを登録します。
2. **フィルター** — `event_type = report.completed` の場合のみ処理を続行。
3. **アクション** — Checkr：Get Report（webhookから受け取ったレポートIDを使用）。
4. **アクション** — B1.church：人物を検索（候補者のメールアドレスで検索）。
5. **条件付きのアクション** — Slack / メールで担当者に通知。ステータスは `clear` / `consider` / `suspended` のいずれか。

注意：B1には現時点で「身元調査のステータス」を保存するフィールドがありません。現実的な選択肢は次の3つです。(a) 結果を非公開のSlackチャンネルに投稿して確認する、(b) 監査用にGoogleスプレッドシートに記録する、(c) `clear` の場合に「審査済みボランティア」のB1グループにその人を追加する。

## よくある活用例

### 2年ごとにボランティアを再審査する

上記の流れにMakeのスケジュールトリガーを組み合わせます。

- **トリガー** — Make：Schedule（毎月）
- **アクション** — B1.church：「審査済みボランティア」グループのメンバーを一覧表示
- **フィルター** — Makeで絞り込み：審査済みの日付が22か月より前
- **アクション** — Checkr：Create Background Check Invitation（初回と同じ流れ）

### 審査が完了するまで、最初の段階のアクセスを制限する

B1のグループ所属で利用権限を管理している場合（例：「審査済み」グループのメンバーだけが奉仕のスケジュールに表示される）、Checkrの `report.completed` イベントを受け取るまで、新しいボランティアを保留用のグループに入れておきます。

## 制限と注意事項

- **Checkrは、ほとんどの審査パッケージで米国のみ対応しています。** オーストラリア、英国、カナダの教会では、別のサービスを検討する必要があります。
- **料金は調査ごとに発生します。** Makeで招待を作成するたびに、実際の調査が1件消費されます。まずはCheckrのサンドボックス（テスト環境）またはステージング用アカウントで試してください。（MakeのCheckrアプリは接続時に入力した認証情報を使うため、認証情報を切り替えることでサンドボックスと本番を切り替えられます。）
- **Checkr APIの利用はプランによって制限されています。** 小規模なCheckrアカウントは管理画面のみのプランの場合があります。APIを有効にするには、Checkrに問い合わせてください。

## トラブルシューティング

- **Create Candidateが `403` で失敗する** — Checkr APIトークンが読み取り専用か、アカウントに必要な権限がありません。Checkrのダッシュボードで書き込み権限を付けて再発行してください。
- **招待メールが届かない** — 手順3で候補者のメールアドレスを確認してください。B1でその人のメール欄が空になっている可能性があります。Checkrのステップの前に、メールアドレスが必須になるフィルターを追加してください。
- **webhookのトリガーが動かない** — MakeのアカウントがWebhookの送信に対応した有料プランでない場合、Checkrへのwebhook登録が静かに失敗することがあります。Checkrのダッシュボードの *Webhooks* ページで、MakeのURLが登録されているか確認してください。

## 関連項目

- [Make（概要）](../make) — Makeのすべてのシナリオにおける、B1側の設定
- [モバイルメッセージ](./mobile-message) — Zapier のアプリがないSMSプロバイダー向け。CheckrのMake連携と同じWebhook / HTTPの方式です
- [Checkr APIドキュメント](https://docs.checkr.com/)
