---
title: "アカウント削除リクエストの確認"
description: "B1 Admin で会員のアカウント削除リクエストを承認または却下します。Directory Approval Group を経由して処理し、30日間の GDPR の期限を守ります。"
---

# アカウント削除リクエストの確認

<div class="article-intro">

教会に Directory Approval Group が設定されている場合、アカウントの削除はすぐには実行されません。メンバーのリクエストはタスクとなり、何かが削除される前に承認グループが確認します。このページでは、リクエストの送信方法、承認または拒否の手順、そして各ケースで何が起こるかを説明します。

</div>

<div class="prereqs">
<h4>始める前に</h4>

- **Mobile &rarr; Member portal** で **Directory Approval Group** を設定しておく必要があります。設定していない場合、プロフィールページの **Delete my account** をクリックすると、確認の手順なしにアカウントがすぐに削除されます。詳しくは [モバイルアプリの設定](../settings/mobile-app.md) を参照してください。
- リクエストの承認または拒否には **People &gt; Edit** の権限が必要です。

</div>

## メンバーが削除をリクエストする方法

アカウントの削除は **My Profile** ページからリクエストします。このページは [プロフィールの管理](./managing-profile.md) で説明している共通のアカウントページで、**Account Deletion** セクションにあります。承認グループが設定されている場合、リクエストを確定しても、すぐには何も削除されません。代わりに次の処理が行われます。

1. 「"Account deletion request"」というタイトルのオープンなタスクを作成し、Directory Approval Group に割り当てます。タスクは **Serving &rarr; My Work** に表示されます。
2. そのメンバーの **Delete my account** ボタンを無効にし、リクエストが確認待ちであることを知らせる通知を表示します。

確認待ちのリクエストがある状態で再度リクエストを送信すると、同じタスクが開き直されるだけです。ひとりのメンバーが同時に保留できる削除リクエストは 1 件だけです。

## リクエストの確認

1. **Serving &rarr; My Work** に移動します（ダッシュボードの **Assigned to My Groups** からも同じ場所に行けます。[プロフィール変更リクエスト](./approving-profile-changes.md) が表示されるのも同じ場所です）。
2. 「"Account deletion request from *Name*"」というタイトルのタスクを開きます。
3. 2 つの操作が表示されます。**Approve deletion** と **Decline** です。

### 承認する

確認メッセージ「**"Permanently anonymize this person's record and remove their login? This cannot be undone."**」に同意すると、そのメンバーの個人情報は一般的な値に置き換えられ、ログイン情報も削除されます。この匿名化処理は、メンバーのレコードで **Data Management &gt; Anonymize** を実行したときと同じものです（[データセキュリティ](../settings/data-security.md) を参照）。タスクは自動的に閉じられ、メンバーには承認されたことが通知されます。

### 拒否する

拒否するには理由の入力が必要です。GDPR では、法的な例外に該当する場合にのみ削除リクエストを断ることが認められているためです。

- **法的な保存義務**（寄付、税務、雇用に関する記録）
- **法的請求のために必要**
- **その他**: テキストボックスに説明を入力してください（10 文字以上）

メンバーには、入力した理由とともに決定内容が通知されます。メンバーが納得できない場合は、リクエストを再提出するか、監督機関に申し立てることができます。

:::info
教会には削除リクエストへの対応期限が 30 日あります。タスクの期限は 28 日後に設定されます。タスクが未完了のままの場合、21 日目と 27 日目に承認グループへ自動的にリマインダーが送信されます。
:::

:::tip
削除リクエストとプロフィール変更リクエストは、同じ Directory Approval Group と、同じ Tasks ベースの確認フローを使用します。ディレクトリ情報の更新リクエストも確認する必要がある場合は、[プロフィール変更の承認](./approving-profile-changes.md) を参照してください。
:::

## 関連記事

- [プロフィールの管理](./managing-profile.md) — メンバーが自分のアカウントの削除をリクエストする場所
- [プロフィール変更の承認](./approving-profile-changes.md) — ディレクトリ情報の更新リクエストに関する類似の確認フロー
- [データセキュリティ](../settings/data-security.md) — GDPR への準拠と、管理者が行う匿名化
- [モバイルアプリの設定](../settings/mobile-app.md) — Directory Approval Group の設定
