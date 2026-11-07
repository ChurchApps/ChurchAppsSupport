---
title: "Text In Church"
description: "Zapier で B1 Admin と Text In Church を連携させます。API キーの発行、コネクトカードから B1 へ送る Zap の作成、グループメンバーシップの同期を行います。"
---

# Text In Church

<div class="article-intro">

[Text In Church](https://textinchurch.com) は、SMS とドリップワークフロー、コネクトカードの自動化をまとめて提供するサービスです。その Zapier アプリは両方向に対応しています。B1 のイベントを Text In Church のワークフローに送ることも、Text In Church 側のコネクトカードや新規連絡先のトリガーを B1 に取り込むこともできます。

</div>

<div class="prereqs">
<h4>始める前に</h4>

- Zapier 連携を含むプランの [Text In Church](https://textinchurch.com) アカウント
- [Zapier](https://zapier.com) アカウント
- **Edit Settings** 権限を持つ B1Admin ユーザー

</div>

## 設定できる連携

| 方向 | トリガー | アクション |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | Create/Update Person + Add to Group |
| B1 → Text In Church | B1 `form.submission.created` | 担当チームを通じてテキストメッセージを送信 |
| B1 → Text In Church | B1 `group.member.added` | Add to Group（グループメンバーシップを同期） |
| Text In Church → B1 | Connect Card Submitted | B1: Create Person + Add Group Member |
| Text In Church → B1 | Person Created | B1: Create Person |
| Text In Church → B1 | Person Joined Group | B1: Add Group Member |

Text In Church のアクションには、*Send Text Message*、*Send Voice Broadcast*、*Create Task*、*Find Person/Group*、グループメンバーシップの追加と削除も含まれます。

## セットアップ

### 1. B1 API キーを発行する

**Settings → Developer → API Keys → New API Key**：

- `settings:write`：B1 がトリガーとなる Zap に必要です
- `people:read`、`people:write`：人物の検索や作成に使用します
- `groups:write`：グループの同期に使用します
- （任意）`donations:write`：献金の確認を TIC に連携する場合に必要です

### 2. Text In Church を Zapier に接続する

[Text In Church の Zapier 連携ガイド](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration)に従ってください。TIC のダッシュボード内で API トークンを生成します。

### 3. コネクトカードから B1 への Zap を作成する

最もよく使われる連携の方向です。TIC から送信されたコネクトカードが、自動的に B1 の新しい人物として登録されます。

1. **トリガー**：Text In Church: Connect Card Submitted
2. **アクション**：B1.church: Find Person（メールアドレスで検索）
3. **分岐**：見つかったかどうかで分岐します
   - 見つからない場合：B1.church: Create Person
   - 見つかった場合：そのまま続行
4. **アクション**：B1.church: Add Group Member を "New Contact" グループに追加

Zap をオンにします。次に TIC経由で送信されたコネクトカードは、自動的に **B1Admin → People** に登録されます。

## よく使うレシピ

### B1 のフォームから、コネクトカード形式のワークフローを開始する

- **トリガー**：B1.church: New Form Submission（「I'm new here」フォームの ID で絞り込み）
- **アクション**：Text In Church: Create/Update Person。フォームのメール、電話番号、名前の回答を対応づけます
- **アクション**：Text In Church: Add to Group。そのグループにはあらかじめ作成したウェルカムワークフローを設定しておきます

### グループメンバーシップを同期する

- **トリガー**：B1.church: New Group Member（特定の `groupId` で絞り込み）
- **アクション**：Text In Church: Add to Group（同じ人物を、同期対象のグループに追加）。完全に同期したい場合は、`group.member.removed` の Zap と組み合わせてください。

### メンバーが参加したらリーダーに通知する

- **トリガー**：B1.church: New Group Member
- **アクション**：Text In Church: Send Text Message。送信先はグループリーダーの電話番号、本文は `"{first} {last} just joined {group}"` とします。

## 制限と注意点

- **TIC の Zapier アプリはプランによって制限されます。** TIC のダッシュボードで Zapier 連携がグレーアウトしている場合は、TIC のサポートに連絡して、お使いのプランで有効化してもらってください。
- **グループ ID は B1 ではなく TIC のものです。** メンバーシップを同期する場合は、どこかで対応表を管理する必要があります（Zapier の *Lookup Table*、または各 Zap に直接記述する方法があります）。
- **Send Text Message にはクレジットが必要です。** *Send Text* を実行する Zap ごとに、TIC の SMS 割り当て分が消費されます。

## トラブルシューティング

- **Connect Card のトリガーが実行されない**：TIC で Zapier 連携のスイッチがオンになっているか確認してください。また、テストに使用したフォームが汎用アンケートではなく「Connect Card」として設定されているかも確認してください。
- **B1 での Create Person が 401 エラーで失敗する**：API キーが誤っているか、失効しているか、`people:write` が付与されていません。キーを再発行してください。
- **B1 に重複した人物が登録される**：TIC は同じイベントに対して *Person Created* と *Connect Card Submitted* の両方を送信します。どちらか一方を情報の基準とし、もう一方には Zapier の Filter を追加してください。

## 関連情報

- [Clearstream](./clearstream.md)：同様に Zapier と連携できる別の SMS プラットフォーム
- [Zapier（概要）](../zapier.md)：すべての Zapier レシピに共通する B1 側の説明
- [Text In Church の Zapier ガイド](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration)（TIC のドキュメント）
