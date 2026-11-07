---
title: "プロフィール変更の承認"
description: "B1 Admin で会員からのプロフィール変更リクエストを確認し承認します。また、それを受け取る Directory Approval Group を設定します。"
---

# プロフィール変更の承認

<div class="article-intro">

教会で会員のプロフィール更新に管理者の承認が必要な場合、会員は B1 Mobile アプリから変更内容を送信し、その申請は B1 Admin にタスクとして表示されます。このガイドでは、それらの申請を確認して承認する方法を説明します。

</div>

<div class="prereqs">
<h4>始める前に</h4>

- **Mobile &rarr; Member portal** で **Directory Approval Group** に指定されているグループのメンバーである必要があります
- 承認グループが設定されていない場合、プロフィールの変更は確認なしで直ちに適用されます

</div>

## 保留中の申請の探し方

会員がプロフィールの変更を送信すると、承認グループに割り当てられたタスクとして表示されます。次の 2 か所から確認できます。

**ダッシュボード（ホームページ）から:**
1. B1 Admin にログインします。ダッシュボードが自動的に読み込まれます。
2. **My tasks** セクションで **All tasks** をクリックします。（My tasks には、あなた個人に割り当てられた未完了のタスクのみが表示されます。）
3. **Assigned to My Groups** タブをクリックします。保留中のプロフィール変更申請がここに一覧表示されます。

**Serving &rarr; My Work から:**
1. [ジャンプメニュー](../introduction.md#getting-around-with-the-jump-menu)（B1 Admin の左上にある検索バー）を開き、**Serving** を展開します。
2. **My Work** をクリックします。
3. Tasks の下にある **Assigned to My Groups** タブをクリックします。

## 申請の確認と承認

1. **Profile Update** タスクをクリックして開きます。
2. **Requested Changes** の下に、会員が更新を希望する各項目と、送信された新しい値が表示されます。
3. 変更内容を確認します。
4. **Apply** をクリックして承認し、変更を会員のプロフィールに保存します。

変更が適用されると、タスクは自動的に完了になります。

## 承認グループの設定

教会でプロフィール変更に承認を必要とする場合は、先に Directory Approval Group を設定する必要があります。

1. ジャンプメニューを開き、**Mobile** を展開します。
2. **Member portal**（「Portal settings」ページ）をクリックします。
3. **Directory Approval Group** の下で、プロフィール変更申請を確認すべきメンバーのグループを選択します。
4. **Save** をクリックします。

そのグループのメンバーは、ダッシュボードの **Assigned to My Groups** に、届いたプロフィール変更申請が表示されます。

同じ Directory Approval Group は、**アカウント削除の申請**も確認します。詳しくは [アカウント削除申請の確認](./account-deletion.md) を参照してください。

:::tip
承認者が設定されたグループの実際のメンバーであることを確認してください。申請が表示されるのはグループのメンバーだけです。
:::

## 関連記事

- [プロフィールの管理](./managing-profile.md) — ご自身のアカウント設定を編集する
- [アカウント削除申請の確認](./account-deletion.md) — アカウント削除にも同じ承認グループによる確認の流れが適用されます
- [B1 Mobile の設定](../../b1-mobile/profile/editing-profile.md) — 会員がプロフィール変更を送信したときに表示される内容
