---
title: "役職の割り当て"
---

# 役職の割り当て

<div class="article-intro">

B1 Adminでは、役職ベースの権限システムを使って、チームの各ユーザーが見たり操作したりできる範囲を管理します。役職を割り当てることで、スタッフやボランティアに必要な領域へのアクセスだけを与えられ、それ以上は与えません。適切に役職を管理すると、教会のデータを安全に保ちながら、チームが効率よく働けるようになります。

</div>

<div class="prereqs">
<h4>始める前に</h4>

- B1 Adminで**Domain Admin**のアクセス権、または**Settings**を管理する権限を持つ役職が必要です。
- 役職を割り当てたい人は、事前にディレクトリに登録されている必要があります。まだ追加していない場合は、[人の追加](adding-people.md)を参照してください。

</div>

## 役職について

役職とは、1人以上のユーザーに割り当てる権限のセットです。たとえば、[寄付記録](../donations/recording-donations.md)へのアクセスを許可する「Finance Team」の役職や、[出席機能](../attendance/check-in.md)だけを使えるようにする「Check-In Volunteer」の役職を作成できます。

役職では、次のようなB1 Adminの特定の領域へのアクセスを管理します。

- **People** -- メンバーのプロフィールの閲覧と編集。人のレコードの Notes セクションには **Edit People** が必要です。また、**View Confidential Notes** の権限によって、Confidential Notes セクション(牧会的ケア、個人的な経歴などの機微な記録用)へのアクセスを管理します。**View People Names Only** を持つ人は、詳細なディレクトリを見られなくても、名前で人を検索できます(表示されるのは名前、写真、メンバーシップの状態だけです)。**View Attendance** または **Edit Attendance** と組み合わせると、ボランティアは**Groups**を開いて名前でクラス名簿を確認できます。**Edit Attendance** があれば、[出席を記録](../attendance/recording-attendance.md)することもできます。詳しくは[名前のみの閲覧](../settings/roles-permissions.md#people-names-only)を参照してください。
- **Donations** -- 寄付の管理と財務レポート。**Enter Donations** は、集計チーム向けの限定的な権限です。寄付を入力できますが、まだ開いている[バッチ](../donations/batches.md#who-can-change-a-batch)に対してのみ入力できます。
- **Attendance** -- 出席データの記録と閲覧
- **Forms** -- [カスタムフォーム](../forms/creating-forms.md)の作成と管理
- **Groups** -- [グループのメンバーシップ](../groups/group-members.md)とカレンダーの管理
- **Settings** -- 教会全体の設定の構成

:::warning
**Domain Admin**は、B1 Adminのすべての領域に完全にアクセスできます。この権限は編集も制限もできません。この役職は、主要な管理者だけに割り当ててください。
:::

## 役職の表示と管理

1. [ジャンプメニュー](../introduction.md#getting-around-with-the-jump-menu)(B1 Admin左上の検索バー)を開き、**Settings**を展開します。
2. **Roles**をクリックします。
3. 教会に設定されているすべての役職の一覧が表示されます。**Members**列には、各役職に所属しているユーザー数が表示されます。
4. 任意の役職をクリックすると、そのメンバーと権限を確認できます。

## 役職へのユーザーの追加

1. ジャンプメニューで、**Settings > Roles**を選択します。
2. ユーザーを追加したい役職をクリックします。
3. **Members**セクションで、名前から人を検索します。
4. **Add**をクリックして、その人を役職に割り当てます。

ユーザーは次回ログインしたときから、その役職に関連付けられたすべての権限を使えるようになります。

## 役職の権限の編集

1. ジャンプメニューで、**Settings > Roles**を選択します。
2. 変更したい役職をクリックします。
3. **Permissions**セクションで、役職にアクセスさせたい領域のチェックボックスをオンまたはオフにします。各権限グループには、チェックされている権限の数が表示されます(例: **2 of 5**)。
4. 変更内容は、チェックボックスをオンまたはオフにするとすぐに保存されます。

:::tip
最小権限の原則に従いましょう。各役職には、本当に必要な権限だけを与えてください。こうすると、データを安全に保ち、誤った変更が起こる可能性も減らせます。
:::

## 役職の例

- **Office Staff** -- People、Donations、Attendance、Formsへのアクセス
- **Group Leaders** -- [Groups](../groups/creating-groups.md)へのアクセスのみ
- **Check-In Volunteers** -- [チェックイン用キオスク](../attendance/check-in.md)にサインインするアカウントに必要な **Checkin** の出席権限
- **Finance Team** -- [Donations](../donations/recording-donations.md)へのアクセスと財務レポート
- **Counting Team** -- **Enter Donations** と **View Donations**。ボランティアは、寄付の概要を見ることなく、献金を開いているバッチに入力できます

寄付と人に関する権限の詳細は、[役職と権限](../settings/roles-permissions.md)を参照してください。
