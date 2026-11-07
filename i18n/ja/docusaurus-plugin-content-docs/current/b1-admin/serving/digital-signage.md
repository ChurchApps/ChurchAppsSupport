---
title: "デジタルサイネージ"
description: "常に現在の計画を表示するフィード URL を使い、B1 Admin からロビーや廊下のテレビにレッスン内容を送信します。FreePlay TV を使うこともできます。"
---

# デジタルサイネージ

<div class="article-intro">

デジタルサイネージのフィードを使うと、レッスンの内容をロビーや廊下のテレビに表示できます。プランの種類ごとにフィード URL が発行され、その URL は常に現在のプランの内容を表示するため、毎週の更新は不要です。テレビで FreePlay を使っている場合は、FreePlay Admin でそのプランの種類をテレビにスケジュールすることもできます。

</div>

<div class="prereqs">
<h4>始める前に</h4>

- [Lessons.church](../../b1-church/content/lessons.md) などでレッスンの内容をスケジュールした、[プランの種類](./plans.md)を設定しておく
- [SignPresenter](https://www.signpresenter.com) のアカウントを用意し、表示用のデバイスを設定しておく。または [FreePlay](../../freeplay/index.md) を実行しているテレビを用意しておく

</div>

## フィード URL の取得

1. **Serving** に移動し、プランの種類が含まれる奉仕部門を選択して、そのプランの種類をクリックして開きます。
2. プランの種類のページ上部にある **Digital Signage** (テレビのアイコン) をクリックします。
3. **Digital Signage Feed** ダイアログで、**Feed Url** の横にあるコピーボタンをクリックします。

:::info
フィード URL はプランの種類に紐づいており、個別のプランには紐づいていません。そのプランの種類で現在のプランとして設定されているものに自動的に追従するため、設定は一度行えば十分です。
:::

## SignPresenter への接続

このフィードは、サードパーティ製のデジタルサイネージアプリである [SignPresenter](https://www.signpresenter.com) で使えるように作られています。コピーした URL を SignPresenter に外部フィードとして貼り付けると、接続された画面に現在のレッスン内容を表示できます。

SignPresenter 内での手順については、[SignPresenter の Lessons.church ガイド](https://support.signpresenter.com/topics/lessons-dot-church.html)をご覧ください。ダイアログにもこの手順へのリンクがあります。

## 代わりに FreePlay のテレビを使う

画面で [FreePlay](../../freeplay/index.md) を使っている場合、フィード URL は不要です。**Digital Signage Feed** ダイアログには **admin.freeplay.church/calendar** へのリンクがあり、そこで FreePlay のテレビにこのプランの種類をスケジュールできます。

1. ダイアログの **admin.freeplay.church/calendar** リンクをクリックします。FreePlay Admin は B1 Admin と同じログインを使います。
2. テレビのスクリーングループを選択し、**Add schedule** をクリックします。
3. **Play** の下で、**Service plans** からプランの種類を選びます。現在のプランには **(current plan)** と表示されています。
4. 曜日と時間を設定してから、**Save** をクリックします。

テレビには、設定した時間に、そのプランの種類で現在のプランが毎週表示されます。Go Curriculum のレッスンでも、カスタマイズしたプランを含めて同じように使えます。FreePlay は、奉仕部門の **Content Providers** で紐づけられた Go Curriculum アカウント (「[レッスンのスケジュール](./scheduling-lessons.md)」を参照)でサインインします。部門に設定がない場合は、教会の Go Curriculum 接続が使われます。すべてのオプションについては [カレンダーのスケジュール設定](../../freeplay/scheduled-mode/scheduling-the-calendar.md)を、テレビを追加する場合は [画面のペアリング](../../freeplay/scheduled-mode/pairing-a-screen.md)をご覧ください。

:::note
フィード URL には Go Curriculum のメディアは含まれません。そのコンテンツには教会の Go Curriculum ログインが必要なためです。ロビーや教室のテレビに Go Curriculum のレッスンを表示するには、FreePlay を使ってください。
:::

## 次のステップ

- このサイネージ表示に送るプランを [プラン](./plans.md)ページで管理する
- [Lessons.church](./scheduling-lessons.md) でコンテンツをスケジュールする
- [スケジュールモード](../../freeplay/scheduled-mode/index.md) で FreePlay のテレビをカレンダーに登録する
