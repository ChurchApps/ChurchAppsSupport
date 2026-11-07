---
title: "Subsplash"
description: "Zapier で Subsplash の献金、新規の人物、フォーム回答を B1 に接続します。献金とプロフィールが B1 Admin に自動的に登録されます。"
---

# Subsplash

<div class="article-intro">

教会アプリ、献金、フォームに Subsplash を使っているものの、人物と献金の記録の正本（システム・オブ・レコード）として B1 を使いたい場合は、Subsplash の Zapier アプリで献金、新しいプロフィール、フォームの回答をリアルタイムで B1 に送信できます。ただし、Subsplash の Zapier アプリは現在 **トリガーのみ** に対応しており、連携は一方向（Subsplash → B1）であることにご注意ください。

</div>

<div class="prereqs">
<h4>始める前に</h4>

- **API + Zapier** へのアクセスを含むプランの Subsplash アカウント（これらはプランによって制限されています。利用可能かどうかは Subsplash の Client Success Manager にご確認ください）
- [Zapier](https://zapier.com) のアカウント
- **Edit Settings** 権限を持つ B1Admin のユーザー

</div>

## 連携できる内容

以下のトリガーはすべて Subsplash のものです。アクションは B1 のものです。

| Subsplash のトリガー | B1 のアクション |
|---|---|
| New Donation | Find Person → Add Donation（人物が存在しない場合は Create Person） |
| New Pledge | Add Donation（`notes` = "Pledge: …" を指定） |
| New Person Created | Create Person |
| Person Updated Profile | （直接の B1 アクションはありません。手動で確認できるよう Google スプレッドシートに記録してください） |
| New Form Response | Create Person +（任意で）フォームの内容に基づいて Add Group Member |

現在、Subsplash のアプリがサポートしている方向は Subsplash → B1 のみです。

## セットアップ

### 1. B1 API キーを作成する

B1Admin で **Settings → Developer → API Keys → New API Key** を開きます。スコープは次のとおりです。

- `people:read`：メールアドレスで寄付者を検索するため
- `people:write`：寄付者が存在しない場合に作成するため
- `donations:write`：献金を記録するため
- （`settings:write` は不要です。この連携ではトリガーを B1 ではなく Subsplash が管理しています）

### 2. Subsplash を Zapier に接続する

[Subsplash の Zapier 連携ガイド](https://support.subsplash.com/en/articles/9825926-zapier-integration)に従ってください。Subsplash ダッシュボード内で API トークンが発行され、Zapier はこれを使ってトリガー側の認証を行います。

### 3. 「献金を記録する」Zap を作成する

1. **Trigger**：Subsplash: New Donation
2. **Action**：B1.church: Find Person（メールアドレスで検索）
3. **Filter / Path**：「person found」によって分岐します
   - **見つかった場合：** B1.church: Add Donation。金額、日付、ファンド、方法（= "Online"）、メモ（notes = Subsplash のトランザクション ID）を対応付けます。
   - **見つからなかった場合：** B1.church: Create Person → B1.church: Add Donation（新しく作成した人物の ID を使用）。

Zap をオンにします。これ以降、Subsplash の献金は数秒以内に **B1Admin → Donations** に反映されます。

## よくあるレシピ

### 初めての献金があったときにお礼を送る

- **Trigger**：Subsplash: New Donation
- **Action**：Filter by Zapier：寄付者の初回の献金である場合にのみ続行します（過去の献金者の一覧を含む Google スプレッドシートに対して Donor Email で *Lookup Table* を使うか、寄付者の作成日に基づいて Zapier の *Paths* ステップを使います）
- **Action**：Mailchimp / SMTP / SendGrid：初回献金へのお礼メッセージを送信
- **Action**：B1.church: Add Donation（通常どおり）

### 確約献金を通常の献金の流れから分ける

- **Trigger**：Subsplash: New Pledge
- **Action**：B1.church: Add Donation で `notes = "Pledge — Subsplash"` を指定し、運営用のファンドとは別の `Pledges` というファンドを使います。こうすることで、**B1Admin → Donations → Summary** で確約献金を個別に集計できます。

### 新しいアプリ利用者を B1 の人物として同期する

- **Trigger**：Subsplash: New Person Created
- **Action**：B1.church: Create Person。名前、メールアドレス、電話番号を入力します。また、"Subsplash App Users" のようなグループに新しい人物を追加して、B1 でタグ付けします。

## 制限事項と注意点

- **Subsplash の Zapier アプリはトリガーのみです。** B1 側の変更を Subsplash にも反映させたい場合（例：B1 に新しく追加された人物を Subsplash にも登録する場合）は、B1 の Zapier アプリのトリガーから、カスタムの *Webhooks by Zapier — POST* アクションを使って Subsplash の REST API を呼び出すブリッジを構築する必要があります。これはレシピではなく、カスタム連携です。
- **API アクセスはプランによって制限されています。** Zapier の接続が `403 Forbidden` で失敗する場合、お使いの Subsplash プランには API アクセスが含まれていない可能性が高いです。Client Success Manager にお問い合わせください。
- **ファンドの対応付けは手動です。** Subsplash はキャンペーン名またはカテゴリ名を渡しますが、B1 には数値のファンド ID が必要です。Zap にファンドを直接記述するか、Subsplash のキャンペーンと B1 のファンドを対応付ける Zapier の *Lookup Table* を管理してください。

## トラブルシューティング

- **献金後にトリガーが発動しない**：Subsplash の Zapier ダッシュボードで、接続が引き続き *Connected* と表示されているか確認してください。Subsplash 側で API トークンが再発行されている場合、Zap は何の通知もなく停止します。その場合は再接続してください。
- **B1 の *Add Donation* が 422 で失敗する**：多くの場合、`fundId` が未入力か、認識されていないことが原因です。**B1Admin → Donations → Funds** でファンドの一覧を開き、正確な ID を Zap のステップにコピーしてください。
- **初回の献金で同じトリガーが2回発動する**：Zapier が確認応答を受け取れなかった場合、Subsplash がトリガーを再送することがあります。重複を除外するために、献金 ID（Subsplash がペイロードに含めて送信します）に対して *Filter by Zapier* を追加してください。

## 関連項目

- [Donorbox](./donorbox.md)：レシピの形式は同じですが、別の献金プラットフォームです
- [Zapier（概要）](../zapier.md)：すべての Zapier レシピの B1 側の説明
- [Subsplash の Zapier 連携ガイド](https://support.subsplash.com/en/articles/9825926-zapier-integration)（Subsplash のドキュメント）
