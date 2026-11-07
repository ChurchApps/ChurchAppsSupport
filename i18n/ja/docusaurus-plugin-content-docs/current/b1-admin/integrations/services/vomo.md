---
title: "VOMO"
description: "Zapier で VOMO の奉仕者登録とキオスクのチェックインを B1 Admin の人物とグループに接続します。API キーの権限と設定手順を含みます。"
---

# VOMO

<div class="article-intro">

VOMOは、ボランティア参加のためのプラットフォームです。人々はVOMOでプロジェクトに申し込み、キオスクでチェックインし、ボランティア時間を積み上げていきます。ボランティアの予定管理にはVOMOを、人物記録にはB1を使っている場合、Zapierを使って両者の会員情報とチェックイン情報を同期させることができます。そうすれば、どちらか一方だけが古くなることを防げます。

</div>

<div class="prereqs">
<h4>始める前に</h4>

- Zapierに対応したプランの[VOMO](https://vomo.org)アカウント（不明な場合はVOMOのサポートに確認してください）
- [Zapier](https://zapier.com)アカウント
- **Edit Settings**権限を持つB1Adminユーザー

</div>

## 連携できる内容

VOMOのZapierアプリには、4つのインスタントトリガーと4つのアクションがあります。多くの教会が求めている連携パターンは次のとおりです。

| 方向 | トリガー | アクション |
|---|---|---|
| VOMO → B1 | VOMO Membership（作成時） | B1: Find Person → Create Person（新規の場合のみ） |
| VOMO → B1 | VOMOのキオスクチェックイン | B1: 「Currently Serving」グループにGroup Memberを追加、または出席として記録 |
| B1 → VOMO | B1 `person.created` | VOMO: メールアドレスでFind Organizerを実行。見つからない場合はカスタムステップ |
| いずれでも | VOMO Participation（申し込み） | B1: プロジェクト専用グループにGroup Memberを追加 |

VOMO側のアクションは、**プロジェクトの下書き作成**と、既存のオーガナイザーやプロジェクトの**検索**に限られます。現時点では「この人をVOMOのプロジェクトに追加する」というアクションはありません。そのため、実質的な連携の中心はVOMOからB1への方向になります。

## 設定

### 1. B1のAPIキーを発行する

**Settings → Developer → API Keys → New API Key**の順に進みます。スコープは次のとおりです。

- `people:read`、`people:write`：ボランティアをB1の人物として検索・作成するため
- `groups:write`：奉仕チームのグループに追加するため
- （任意）`attendance:write`：キオスクのチェックインを出席として扱う場合

### 2. 会員同期のZapを作成する

1. **トリガー**：VOMO: Membership（イベント = `created`）
2. **アクション**：B1.church: Find Person（メールアドレスで照合）
3. **フィルターまたはパス**：見つかったかどうかで分岐します。
   - 見つからない場合：B1.church: Create Personを実行し、その後、適切なボランティアグループにAdd Group Memberを実行します。
   - 見つかった場合：B1.church: Add Group Memberを直接実行します。
4. 有効にします。これで、VOMOの新しいボランティアが適切なグループ所属の状態でB1に表示されるようになります。

### 3.（任意）キオスクチェックインのZapを作成する

1. **トリガー**：VOMO: Kiosk
2. **アクション**：B1.church: Find Person（メールアドレスで検索）
3. **アクション**：用途に応じて選択します。
   - *出席として扱う場合*：Webhooks by ZapierからB1の`/attendance/visits`エンドポイントにPOSTします。（B1のZapierアプリには、まだ専用の*Record Attendance*アクションがありません。）B1の[APIキー](/docs/developer/api/api-keys)は、`Authorization: Bearer cak_…`ヘッダーに設定します。
   - *グループ所属として扱う場合*：「Currently Serving (Today)」グループを対象にB1.church: Add Group Memberを実行します。その日の後半に、スケジュールされたクリーンアップで削除するための2つ目のZapを作成します。

## よく使われるレシピ

### プロジェクトごとのグループ同期

- **トリガー**：VOMO: Participation（作成時）
- **アクション**：プロジェクトIDでZapierのフィルターを適用し、その後
- **アクション**：VOMOのプロジェクト名に対応するB1のグループにB1.church: Add Group Memberを実行します。

VOMOのプロジェクトが終了したら、B1のグループを手動で空にしてください。または、*Participation deleted*トリガーと組み合わせて、該当者を自動的に削除することもできます。

### SMSで「お申し込みありがとうございます」を送る

同じZapの中で、VOMO Participationの後にClearstream Send TextまたはText In Church Send Messageを連鎖させます。どちらもZapierの専用アクションがあります。詳しくは[Clearstream](./clearstream.md)と[Text In Church](./text-in-church.md)を参照してください。

### 離脱を検知する

毎日実行するZapierの*Schedule*トリガーで、今月奉仕チームに加わったB1の人物のリストについて、VOMOのFind Organizerを呼び出します。VOMOが「見つからない」と返した場合、その人はVOMOを有効化していないため、声をかける必要があります。

## 制限と注意事項

- **メールアドレスが結合キーです。** VOMOのペイロードにはユーザーのメールアドレスは含まれますが、B1の人物IDは含まれません。両方のシステムで異なるメールアドレスを使っている人は、重複して作成されます。
- **現時点でVOMOのZapierアプリに「プロジェクトに追加」アクションはありません。** B1からVOMOのプロジェクトへの登録が必要な場合は、*Webhooks by Zapier*のステップからVOMOのREST APIにPOSTする必要があります。これはカスタム連携になります。
- **VOMOの無料プランや下位プランでは、Zapierが利用できない場合があります。** 連携の開始日を約束する前に、VOMOのサポートに確認してください。

## トラブルシューティング

- **トリガーが発火しない**：VOMOのインスタントトリガーには、APIトークンが有効であることが必要です。Zapを再テストし、トークンが再発行されていた場合はVOMOを再接続してください。
- **B1の*Add Group Member*が422で失敗する**：アクションのグループIDが存在しません。**B1Admin → Groups**を開き、対象のグループをクリックして、URLのID部分をZapのステップにコピーしてください。
- **1人のVOMOボランティアから、B1に重複した人物が作られる**：その人は、B1にすでに登録されているものとは別のメールアドレスで申し込んだ可能性があります。メールアドレスを統一するか、作成前に電話番号でも検索するZapierの*Path*を追加してください。

## 関連項目

- [Zapier（概要）](../zapier.md)：すべてのZapierレシピのB1側の情報
- [Clearstream](./clearstream.md)、[Text In Church](./text-in-church.md)：ボランティアの申し込みをSMSの確認メッセージと組み合わせます
- [Webhooks（開発者向けリファレンス）](/docs/developer/api/webhooks)：VOMOがトリガーにできるイベント
