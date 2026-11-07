---
title: "Doing エンドポイント"
---

# Doing エンドポイント

<div class="article-intro">

Doing モジュールは、礼拝プランの作成、ボランティアのスケジュール管理、タスク管理、オートメーションを担当します。時間とポジションを含む礼拝プランの作成、ボランティアの割り当て、ブロックアウト日の管理、礼拝の順序項目の作成、外部コンテンツプロバイダーとの連携、条件とアクションを使った自動ワークフローの設定などのためのツールを提供します。

</div>

**ベースパス:** `/doing`

## プラン

ベースパス: `/doing/plans`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 教会のすべてのプランを一覧表示 |
| GET | `/:id` | JWT | — | ID でプランを取得 |
| GET | `/ids?ids=` | JWT | — | カンマ区切りの ID で複数のプランを取得 |
| GET | `/types/:planTypeId` | JWT | — | プランタイプ別にプランを取得 |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + ministry edit | 指定期間に割り当てられたボランティアに対して **Text Volunteers** が送信する奉仕の概要をプレビュー: `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }`（1人につき1件。オプトアウトした人と電話番号がない人は除外し、共有番号は重複を除外し、200件を上限とする） |
| GET | `/presenter` | JWT | — | 今後7日間のプランを取得（プレゼンター表示） |
| GET | `/confirmationWorkflows?ministryId=` | JWT | Ministry edit | プランで選択できる、有効な奉仕割り当て確認ワークフロー（`workflowType = "assignmentConfirmation"`）: `[{ id, name }]` |
| GET | `/public/current/:planTypeId` | Public | — | プランタイプの現在のプランを取得 |
| GET | `/public/signup/:churchId` | Public | — | 自己登録を受け付けているプランを、直近のものから順に返します。各プランには自己登録ポジション（`categoryName`、次に `name` で並べ替え、Accepted/Unconfirmed の割り当て数を示す `filledCount` を含む）と時間帯が含まれます。教会の設定 `volunteerSignupNextOnly` が `"true"` の場合は、プランタイプごとに最初のプランのみを返します。各 `plan` には計算された `signupDeadline`（ISO 形式の日時、または `null`）が含まれます。これは、プランの最も早い `service` 種別の時間の `signupDeadlineHours` 前の時刻です（礼拝の時間がない場合は、時間のあるエントリのいずれか。プランに時間がない場合は、教会のタイムゾーンでの `serviceDate` の 9:00） |
| GET | `/signup/:planId/volunteers` | JWT | — | プランの自己登録ポジションごとの `[{ positionId, names }]`（Accepted/Unconfirmed の担当者の表示名）。プランの `showVolunteerNames` がオンでない場合は `[]` を返します |
| POST | `/` | JWT | — | プランを作成または更新（単一のオブジェクトまたは配列を受け付けます）。`confirmationWorkflowId` を設定すると、プランを奉仕確認ワークフローに参加させ、`null` を設定すると今後のリクエストで参加を取り消します。`signupDeadlineHours: null` を送信すると期限をクリアします。フィールドを省略すると保存済みの値を維持します |
| POST | `/copy/:id` | JWT | Ministry edit | ポジション、時間帯、割り当て、礼拝の順序項目を含めてプランをコピーします。ボディには `ministryId`、`serviceDate`、`copyMode`（"none"、"positions"、"all"）、`copyServiceOrder`（真偽値）を含めます。`targetPlanId` を指定しない場合は新しいプランが作成され、ボディで指定されない限り、`notes`、`signupDeadlineHours`、`showVolunteerNames`、`autoReplaceOnDecline` はコピー元のプランから引き継がれます。`targetPlanId` を指定すると、既存のプランにコピーします（呼び出し元がそのプランを編集できる必要があります）。B1Admin の **「毎週繰り返す」** オプションは、週ごとにこのエンドポイントを呼び出し、毎回前週に作成されたプランからコピーします |
| POST | `/textRange` | JWT | `texting.send` + ministry edit | 教会のテキストメッセージプロバイダーを通じて、日付範囲内に割り当てられたすべてのボランティアにメッセージを送信します。ボディ: `{ startDate, endDate, ministryId, planTypeId?, message }`（メッセージは最大1600文字。差し込みフィールドは受信者ごとに解決されます）。プレビューの件数に加え、`recipientCount`、`successCount`、`failCount` を返します。送信が途中で停止した場合は `error`（`no_provider` または `insufficient_credits`）も返します |
| POST | `/:id/issueRequests` | JWT | Plan edit | プランの新しい Unconfirmed の未通知の割り当てを、確認ワークフローを通じて発行します。各割り当てを通知済みとしてマークし、割り当てごとに1つのワークフローカードを開始します。ボディは空です。`{ issued }` を返します。プランが公開済み（`prepared` でない）で、少なくとも1つのステップを持つ有効な `confirmationWorkflowId` があり、回答期限が過ぎていない場合を除き失敗します |
| POST | `/autofill/:id` | JWT | — | プランのボランティア割り当てを自動入力します。ボディ: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | プランと、関連するすべての時間帯、割り当て、ポジション、プラン項目を削除 |

### 例: プランをコピーする

```
POST /doing/plans/copy/abc-123
Authorization: Bearer <token>

{
  "serviceDate": "2026-03-01T10:00:00.000Z",
  "copyMode": "all",
  "copyServiceOrder": true
}
```

```json
{
  "id": "def-456",
  "churchId": "church-1",
  "serviceDate": "2026-03-01T10:00:00.000Z"
}
```

## プランタイプ

ベースパス: `/doing/planTypes`

CRUD 基底クラスを拡張（GET `/`、GET `/:id`、POST `/`、DELETE `/:id` — 権限チェックなし）。

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | すべてのプランタイプを一覧表示 |
| GET | `/:id` | JWT | — | ID でプランタイプを取得 |
| GET | `/ids?ids=` | JWT | — | カンマ区切りの ID で複数のプランタイプを取得 |
| GET | `/ministryId/:ministryId` | JWT | — | 奉仕部門のプランタイプを取得 |
| POST | `/` | JWT | — | プランタイプを作成または更新 |
| DELETE | `/:id` | JWT | — | プランタイプを削除 |

## プラン項目

ベースパス: `/doing/planItems`

親子のツリー構造で整理された礼拝の順序項目（見出し、セクション、賛美歌など）を管理します。

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID でプラン項目を取得 |
| GET | `/ids?ids=` | JWT | — | カンマ区切りの ID で複数のプラン項目を取得 |
| GET | `/plan/:planId` | JWT | — | プランのすべてのプラン項目を取得（ツリー構造を返す） |
| GET | `/presenter/:churchId/:planId` | Public | — | プレゼンター表示用のプラン項目を取得（ツリー構造を返す） |
| POST | `/` | JWT | — | プラン項目を作成または更新 |
| POST | `/sort` | JWT | — | プラン項目の並び順を更新（同階層の項目を並べ替え） |
| DELETE | `/:id` | JWT | — | プラン項目を削除 |

## プランフィード

ベースパス: `/doing/planFeed`

プレゼンター用のプラン項目フィードを提供します。プラン項目が存在しない場合は、プランの `contentId` を使って Lessons.church のベニューフィードから自動的に入力します。

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:planId` | Public | — | プレゼンター用のプランフィードを取得（空の場合はベニューフィードから自動入力） |

## ポジション

ベースパス: `/doing/positions`

CRUD 基底クラスを拡張（GET `/:id`、POST `/`、DELETE `/:id` — 権限チェックなし）。

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID でポジションを取得 |
| GET | `/ids?ids=` | JWT | — | カンマ区切りの ID で複数のポジションを取得 |
| GET | `/plan/ids?planIds=` | JWT | — | カンマ区切りのプラン ID で複数のプランのポジションを取得 |
| GET | `/plan/:planId` | JWT | — | プランのすべてのポジションを取得 |
| POST | `/` | JWT | — | ポジションを作成または更新 |
| DELETE | `/:id` | JWT | — | ポジションを削除 |

## 時間帯

ベースパス: `/doing/times`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/all` | JWT | — | 教会のすべての時間帯を一覧表示 |
| GET | `/:id` | JWT | — | ID で時間帯を取得 |
| GET | `/plans?planIds=` | JWT | — | カンマ区切りのプラン ID で複数のプランの時間帯を取得 |
| GET | `/plan/:planId` | JWT | — | プランのすべての時間帯を取得 |
| POST | `/` | JWT | — | 時間帯を作成または更新 |
| DELETE | `/:id` | JWT | — | 時間帯を削除 |

## 割り当て

ベースパス: `/doing/assignments`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | 現在のユーザーの割り当てを取得 |
| GET | `/my/upcoming` | JWT | — | 昨日以降の日付のプランにある現在のユーザーの割り当てを最大20件、直近のものから順に返します（仮押さえ、または `prepared` のプランはスキップ）: `{ assignmentId, status, positionName, planId, planName, serviceDate }`。メンバーのホームページの奉仕プレビューに使用されます |
| GET | `/:id` | JWT | — | ID で割り当てを取得 |
| GET | `/plan/ids?planIds=` | JWT | — | カンマ区切りのプラン ID で複数のプランの割り当てを取得 |
| GET | `/plan/:planId` | JWT | — | プランのすべての割り当てを取得 |
| POST | `/` | JWT | — | 割り当てを作成または更新（ステータスは既定で "Unconfirmed"） |
| POST | `/accept/:id` | JWT | — | 割り当てを承諾（割り当てられた本人である必要があります） |
| POST | `/decline/:id` | JWT | — | 割り当てを辞退（割り当てられた本人である必要があります） |
| POST | `/signup` | JWT | — | ポジションに自己登録します。ボディ: `{ positionId }`。ポジションが自己登録を許可し、空きがある必要があります。Accepted の割り当てを作成します。プランの登録期限（上記のとおり、最初の礼拝時間から逆算）を過ぎている場合は、"Signup deadline has passed" で拒否されます |
| DELETE | `/signup/:id` | JWT | — | 自分の自己登録を取り消します。プランの登録期限を過ぎている場合は、"Removal deadline has passed" で拒否されます |
| DELETE | `/:id` | JWT | — | 割り当てを削除 |

### 例: 割り当てを承諾する

```
POST /doing/assignments/accept/assign-123
Authorization: Bearer <token>
```

```json
{
  "id": "assign-123",
  "personId": "person-456",
  "positionId": "pos-789",
  "planId": "plan-abc",
  "status": "Accepted"
}
```

## ブロックアウト日

ベースパス: `/doing/blockoutDates`

CRUD 基底クラスを拡張（GET `/:id`、DELETE `/:id` — 権限チェックなし）。

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID でブロックアウト日を取得 |
| GET | `/ids?ids=` | JWT | — | カンマ区切りの ID で複数のブロックアウト日を取得 |
| GET | `/my` | JWT | — | 現在のユーザーのブロックアウト日を取得 |
| GET | `/upcoming` | JWT | — | 教会のすべての今後のブロックアウト日を取得 |
| POST | `/` | JWT | — | ブロックアウト日を作成または更新（`personId` が指定されない場合は現在のユーザーを既定値とする） |
| DELETE | `/:id` | JWT | — | ブロックアウト日を削除 |

## タスク

ベースパス: `/doing/tasks`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------|------------|
| GET | `/` | JWT | — | 現在のユーザーの未完了のタスクを取得 |
| GET | `/:id` | JWT | — | ID でタスクを取得 |
| GET | `/:id/contact` | JWT | Can view the card | ワークフローカードの対象者の連絡先情報: `{ personId, displayName, mobilePhone, email }`。People へのアクセス権がない、担当に割り当てられた連絡担当者が本人に連絡できるようにします |
| GET | `/closed` | JWT | — | 現在のユーザーの完了済みのタスクを取得 |
| GET | `/timeline?taskIds=` | JWT | — | カンマ区切りのタスク ID でタスクのタイムラインデータを取得 |
| GET | `/directoryUpdate/:personId` | JWT | — | 人物のディレクトリ更新タスクを取得 |
| POST | `/` | JWT | — | タスクを作成または更新。ディレクトリ更新タスクを処理するには `?type=directoryUpdate` を追加します（写真を自動アップロードします） |
| POST | `/:id/conversation` | JWT | `tasks.edit` または card assignee | カードにメモの会話を添付します。ボディ: `{ conversationId }`。最初に添付された会話が優先され、以降の呼び出しではカードを変更せずに返します |
| POST | `/loadForGroups` | JWT | — | 特定のグループのタスクを読み込みます。ボディ: `{ groupIds: [], status: "Open" }` |

## オートメーション

ベースパス: `/doing/automations`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------|------------|
| GET | `/` | JWT | — | 教会のすべてのオートメーションを一覧表示 |
| GET | `/:id` | JWT | — | ID でオートメーションを取得 |
| GET | `/check` | Public | — | すべてのオートメーションのチェックを実行 |
| POST | `/` | JWT | — | オートメーションを作成または更新 |
| DELETE | `/:id` | JWT | — | オートメーションを削除 |

## アクション

ベースパス: `/doing/actions`

アクションは、オートメーションが実行されたときに何が起こるかを定義します。

| Method | Path | Auth | Permission | Description |
|--------|------|------|------|------------|
| GET | `/:id` | JWT | — | ID でアクションを取得 |
| GET | `/automation/:id` | JWT | — | オートメーションのすべてのアクションを取得 |
| POST | `/` | JWT | — | アクションを作成または更新 |
| DELETE | `/:id` | JWT | — | アクションを削除 |

## 条件

ベースパス: `/doing/conditions`

条件は、オートメーションを実行するための基準を定義します。

| Method | Path | Auth | Permission | Description |
|--------|------|------|------|------------|
| GET | `/:id` | JWT | — | ID で条件を取得 |
| GET | `/automation/:id` | JWT | — | オートメーションのすべての条件を取得 |
| POST | `/` | JWT | — | 条件を作成または更新 |
| DELETE | `/:id` | JWT | — | 条件を削除 |

## 接続条件

ベースパス: `/doing/conjunctions`

接続条件は、オートメーション内の複数の条件を組み合わせます（AND/OR のロジック）。

| Method | Path | Auth | Permission | Description |
|--------|------|------|------|------------|
| GET | `/:id` | JWT | — | ID で接続条件を取得 |
| GET | `/automation/:id` | JWT | — | オートメーションのすべての接続条件を取得 |
| POST | `/` | JWT | — | 接続条件を作成または更新 |
| DELETE | `/:id` | JWT | — | 接続条件を削除 |

## コンテンツプロバイダー認証

ベースパス: `/doing/contentProviderAuths`

CRUD 基底クラスを拡張（GET `/`、GET `/:id`、POST `/`、DELETE `/:id` — 権限チェックなし）。

外部コンテンツプロバイダー（プレゼンテーションソフトウェアとの連携など）の OAuth 認証レコードを管理します。

`accessToken` と `refreshToken` は、`EncryptionHelper` で保存時に暗号化され、読み取り時に復号されるため、API は引き続き平文のトークンを返します。暗号化の導入前に保存された行は平文のままです（平文には `|` が含まれません）。それらはそのまま返され、次回保存されたときに暗号化されます。

| Method | Path | Auth | Permission | Description |
|--------|------|------|------|------------|
| GET | `/` | JWT | — | すべてのコンテンツプロバイダー認証を一覧表示 |
| GET | `/:id` | JWT | — | ID でコンテンツプロバイダー認証を取得 |
| GET | `/ids?ids=` | JWT | — | カンマ区切りの ID で複数のコンテンツプロバイダー認証を取得 |
| GET | `/ministry/:ministryId` | JWT | — | 奉仕部門のすべてのコンテンツプロバイダー認証を取得 |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | 特定の奉仕部門とプロバイダーの認証レコードを取得 |
| POST | `/` | JWT | — | コンテンツプロバイダー認証を作成または更新 |
| DELETE | `/:id` | JWT | — | コンテンツプロバイダー認証を削除 |

## プロバイダープロキシ

ベースパス: `/doing/providerProxy`

外部コンテンツプロバイダー（ProPresenter、EasyWorship など）へのリクエストを中継します。トークンの有効期限が切れると、トークンの更新を自動的に処理します。

| Method | Path | Auth | Permission | Description |
|--------|------|------|------|------------|
| POST | `/browse` | JWT | — | コンテンツプロバイダーのファイルを参照。ボディ: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | コンテンツプロバイダーからプレゼンテーションを取得。ボディ: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | コンテンツプロバイダーからプレイリストを取得。ボディ: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | コンテンツ項目の指示を取得。ボディ: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | コンテンツ項目の詳細な指示を取得。ボディ: `{ ministryId, providerId, path }` |

## 関連ページ

- [Membership エンドポイント](./membership) — 人物、グループ、役割、権限
- [Attendance エンドポイント](./attendance) — 礼拝と訪問の記録
- [モジュール構成](../module-structure) — コードの構成パターン
