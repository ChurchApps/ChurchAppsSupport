---
title: "メッセージングのエンドポイント"
description: "ChurchApps メッセージング API エンドポイントのリファレンス：会話、メモへのアクセスルール、テキストメッセージ、メールテンプレート、通知、デバイス。"
---

# メッセージングのエンドポイント

<div class="article-intro">

メッセージングモジュールは、リアルタイムの会話、チャットメッセージ、プッシュ通知、SMS/メール配信、WebSocket 接続、個人間メッセージ、デバイス登録、テキストメッセージのプロバイダーを管理します。ライブ配信のチャットと非同期通知の両方のために、すべての ChurchApps アプリケーションで使用される通信基盤を提供します。

</div>

**ベースパス:** `/messaging`

## 会話

ベースパス: `/messaging/conversations`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | カンマ区切りの ID を指定して、最初と最後のメッセージを含む会話を読み込みます |
| GET | `/messages/:contentType/:contentId` | JWT | — | コンテンツに紐づく会話を、ページ分けされたメッセージとともに読み込みます（`?page=&limit=`） |
| GET | `/posts` | JWT | — | 現在のユーザーのグループに属する投稿タイプの会話を取得します |
| GET | `/posts/group/:groupId` | JWT | — | 特定のグループの投稿タイプの会話を取得します |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | B1 Admin のメモページ向けに、すべてのレコードの中から最新のメモを取得します。`section` は `people`、`groups`、`events`、`workflows` のいずれかです（それ以外は 400 エラー）。`limit` の既定値は 25（最大 100）です。`before` は前のページから得られるカーソルです。各メモは、そのメモの種類ごとのルール（People の編集権限または機密メモの権限、グループのリーダー、イベントの閲覧者、ワークフローカードの閲覧者）を引き続き満たす必要があるため、呼び出し元は開くことができるメモだけを参照できます。メモの本文は 300 文字で切り詰められます |
| GET | `/current/:churchId/:contentType/:contentId` | 公開 | — | コンテンツの現在の会話を取得、または作成します（contentId は自動で復号されます） |
| GET | `/:churchId/:contentType/:contentId` | 公開 | — | コンテンツの種類と ID で会話を読み込みます |
| GET | `/:churchId/:id` | 公開 | — | ID を指定して単一の会話を読み込みます |
| POST | `/` | JWT | — | 会話を作成または更新します（一括） |
| POST | `/start` | JWT | — | 最初のコメントメッセージを添えて新しい会話を開始します |
| DELETE | `/:churchId/:id` | JWT | — | 会話を削除します |

### 個人メモへのアクセス制御

`contentType: "person"`（人物レコードのメモタブ）または `contentType: "personConfidential"`（機密メモのセクション）の会話は、すべての読み取りおよび書き込みの経路で制限されます。上記の公開ルートも例外ではなく、これらのコンテンツタイプに対しては `401` を返します。`person` には MembershipApi の **People / Edit** 権限が必要で、`personConfidential` には **People / View Confidential Notes** 権限が必要です。スコープ付き API キーの場合、`people:write` が両方の操作を許可しますが、キーのユーザーは基になるロールの権限も保持している必要があります。

### グループおよびイベントのメモへのアクセス制御 {#group-and-event-notes-access-control}

さらに 2 つのメモのコンテンツタイプも、同じくすべての読み取りおよび書き込みの経路（上記の公開ルートを含む）で制限されており、匿名での投稿は一切許可されません。

- **`groupNote`**（`contentId` = グループ ID）-- グループの **Leader notes**（リーダーメモ）フィード。そのグループのリーダー（JWT の `leaderGroupIds`）だけが読み取りまたは投稿できます。`content.edit` やグループメンバーシップ関連の権限を含め、どのスタッフ権限もアクセスを許可しません。
- **`eventNote`**（`contentId` = イベント ID）-- カレンダーのイベントに付くメモ。`content.edit` または **Calendars / Admin** を持つスタッフは、常に読み取りと投稿ができます。それ以外の場合は、イベントの `notesViewRole`（読み取り）と `notesPostRole`（投稿）に従います。`staff`（既定値。フィールドが `null` の場合に使用）は他の誰にも許可せず、`leaders` はイベントのグループのリーダーに許可し、`members` はイベントのグループのメンバーとリーダーに許可します。`groupId` のないイベントはスタッフ専用です。

### ワークフローカードのメモへのアクセス制御

`contentType: "workflowCard"`の会話（ワークフローカードのメモ。`contentId` はカードのタスク ID）は、そのカードを開ける人だけが読み書きできます。具体的には、DoingApi の **Tasks / View** 権限を持つユーザー、またはカードの担当者・作成者・対象となっている人物またはグループです。それ以外の人は、上記の公開ルートを含むすべての読み取りの経路で `401` を受け取ります。カードの会話は、カード自体を通じて `POST /doing/tasks/:id/conversation`（本文 `{ "conversationId": "..." }`）で紐づけられます。最初に紐づけられた会話が優先されます。この操作は、カードの編集者と担当者が実行できます。

### 例：会話を開始する

```
POST /messaging/conversations/start
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "contentType": "group",
  "contentId": "group-123",
  "title": "Weekly Discussion",
  "comment": "Welcome to this week's discussion thread!"
}
```

```json
{
  "id": "conv-456",
  "churchId": "church-789",
  "contentType": "group",
  "contentId": "group-123",
  "title": "Weekly Discussion",
  "dateCreated": "2026-02-17T10:00:00.000Z",
  "visibility": "public",
  "allowAnonymousPosts": false,
  "groupId": "group-123"
}
```

## メッセージ

ベースパス: `/messaging/messages`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | 会話のすべてのメッセージを読み込みます |
| GET | `/catchup/:churchId/:conversationId` | 公開 | — | 会話のすべてのメッセージを読み込みます（ライブチャット用の公開キャッチアップ） |
| GET | `/:churchId/:id` | 公開 | — | ID を指定して単一のメッセージを読み込みます |
| POST | `/` | JWT | — | メッセージを保存します（一括）。リアルタイムの更新を送信し、通知をトリガーします。既存のメッセージを更新するには、その投稿者であるか `content.edit` を保有している必要があります。保存された投稿者は変更できません |
| POST | `/send` | 公開 | — | メッセージを送信します（一括、公開）。WebSocket でリアルタイムの更新を送信し、通知をトリガーします |
| POST | `/setCallout` | JWT | — | （レガシー）コールアウトメッセージをリアルタイムで一斉配信します。アクティブなクライアントはありません。ライブ配信のチャットではコールアウトはもう表示されません |
| DELETE | `/:churchId/:id` | JWT | — | メッセージを削除し、削除をリアルタイムで配信します。[メッセージのモデレーション](#message-moderation)を参照してください |

### メッセージのモデレーション

メッセージの削除が許可されるのは、次の場合です。

- メッセージの投稿者本人。
- `content.edit` を持つスタッフ（教会全体で有効）。
- **グループのリーダー**。`contentType` が `group` または `groupAnnouncement` の会話で、`contentId` がそのリーダーを務めるグループである場合（JWT の `leaderGroupIds`）。

個人メモの会話（`person` / `personConfidential`）は、リーダーによるモデレーションの対象外です。代わりにメモの権限（`people.edit`、`people.viewConfidentialNotes`）を使用します。

リーダーに許可されるのは削除のみで、編集は許可されません。他のメンバーのメッセージを書き換えることは、引き続き投稿者と `content.edit` を持つスタッフに限られます。

### 例：メッセージを送信する

```
POST /messaging/messages/send

[
  {
    "churchId": "church-789",
    "conversationId": "conv-456",
    "personId": "person-123",
    "displayName": "John Smith",
    "content": "Hello everyone!",
    "messageType": "comment"
  }
]
```

```json
[
  {
    "id": "msg-001",
    "churchId": "church-789",
    "conversationId": "conv-456",
    "personId": "person-123",
    "displayName": "John Smith",
    "timeSent": "2026-02-17T10:05:00.000Z",
    "content": "Hello everyone!",
    "messageType": "comment"
  }
]
```

## 個人間メッセージ

ベースパス: `/messaging/privatemessages`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 現在のユーザーのすべての個人間メッセージを読み込みます（会話ごとの最新メッセージを含み、すべてを既読にします） |
| GET | `/existing/:personId` | JWT | — | 特定の人物との既存の個人間会話を検索します |
| GET | `/:id` | JWT | — | ID を指定して個人間メッセージを読み込みます（現在のユーザー宛てであれば通知を消去します） |
| POST | `/` | JWT | — | 個人間メッセージを送信します（一括）。受信者にプッシュ通知をトリガーします |

## 通知

ベースパス: `/messaging/notifications`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | 現在のユーザーの未読通知件数を取得します |
| GET | `/my` | JWT | — | 現在のユーザーのすべての通知を読み込みます（すべてを既読にします） |
| GET | `/tmpEmail` | 公開 | — | 1 日 1 回のメール通知ダイジェストをトリガーします（デバッグ・cron 用エンドポイント） |
| GET | `/:churchId/person/:personId` | JWT | — | 特定の人物の通知を読み込みます |
| GET | `/:churchId/:id` | JWT | — | ID を指定して通知を読み込みます |
| POST | `/` | JWT | — | 通知を作成または更新します（一括） |
| POST | `/create` | JWT | — | 複数の人物に対して通知を作成します。本文：`{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | 特定の人物のすべての通知を既読にします |
| POST | `/sendTest` | JWT | — | テスト用のプッシュ通知を送信します。本文：`{ personId, title }` |
| POST | `/ping` | 公開 | — | 外部のトリガーから通知を作成します。本文：`{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | 通知を削除します |

### 例：通知を作成する

```
POST /messaging/notifications/create
Authorization: Bearer <token>

{
  "peopleIds": ["person-123", "person-456"],
  "contentType": "group",
  "contentId": "group-789",
  "message": "New event posted in your group",
  "link": "/groups/group-789"
}
```

## 通知の設定

ベースパス: `/messaging/notificationpreferences`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------------|-------------|
| GET | `/categories` | JWT | — | 通知カテゴリの一覧を、既定の通知チャンネルと許可されたチャンネルとともに取得します |
| GET | `/my` | JWT | — | 現在のユーザーの通知設定を読み込みます（設定がない場合は既定値を自動作成します） |
| POST | `/` | JWT | — | 現在のユーザーの設定を保存します。本文には `allowPush`、`allowSms`、`emailFrequency`、`masterMute`、`quietHoursStart`、`quietHoursEnd`、`timeZone`、`maxPushPerDay` のいずれかを指定できます。さらに任意で `overrides: [{ categoryKey, channel, optedIn }]` を指定できます（channel には `push`、`email`、`in_app`、`sms` のいずれかを指定できます。ロックされたカテゴリは無視されます）。`allowSms` は、テキストメッセージによるリマインダーへのメンバーのオプトインです。行の配列形式の旧式の本文も引き続き受け付けます |

## 接続

ベースパス: `/messaging/connections`

チャット、グループの会話、個人間メッセージ、ライブ配信のための WebSocket/リアルタイム接続を管理します。エンドツーエンドのプロトコルについては、[リアルタイムアーキテクチャ](../../realtime.md)を参照してください。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | 公開 | — | 会話のすべての接続を読み込みます |
| POST | `/` | 公開 | — | 接続を登録します（一括）。その会話で出席状況のブロードキャストをトリガーします。本文の項目：`{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | 公開 | — | ソケット ID で指定した接続の表示名を更新します。本文：`{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | 公開 | — | 会話から接続を削除します。出席状況のブロードキャストをトリガーします |
| POST | `/tmpSendAlert` | 公開 | — | 人物の接続にお知らせアラートを送信します。本文：`{ churchId, personId }` |

## デバイス

ベースパス: `/messaging/devices`

プッシュ通知とコンテンツのペアリング（例：TV ディスプレイ上の Lessons アプリ）のためのデバイス登録を管理します。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | デバイスを登録または更新します（モバイルのプッシュ登録）。FCM トークンまたはデバイス ID で照合します |
| POST | `/enrollAnon` | 公開 | — | 匿名デバイスを登録し、4 文字のペアリングコードを生成します |
| POST | `/` | 公開 | — | デバイスを保存します（一括） |
| GET | `/pair/:pairingCode` | JWT | — | ペアリングコードを使ってデバイスをペアリングします。コンテンツを割り当てるには、任意で `?contentType=&contentId=` を指定します |
| GET | `/status/:deviceId` | 公開 | — | デバイスのペアリング状態を確認します |
| GET | `/:churchId` | JWT | — | 教会のすべてのデバイスを読み込みます |
| GET | `/:churchId/person/:personId` | JWT | — | 特定の人物のすべてのデバイスを読み込みます |
| GET | `/:churchId/:id` | JWT | — | ID を指定してデバイスを読み込みます |
| DELETE | `/:churchId/:id` | JWT | — | デバイスを削除します |

### 例：デバイスを登録する

```
POST /messaging/devices/enroll
Authorization: Bearer <token>

{
  "fcmToken": "firebase-token-abc123",
  "appName": "B1App",
  "label": "John's iPhone",
  "deviceInfo": "iOS 17, iPhone 15"
}
```

```json
{
  "id": "device-001",
  "churchId": "church-789",
  "fcmToken": "firebase-token-abc123",
  "appName": "B1App",
  "label": "John's iPhone",
  "registrationDate": "2026-02-17T10:00:00.000Z",
  "lastActiveDate": "2026-02-17T10:00:00.000Z"
}
```

## デバイスのコンテンツ

ベースパス: `/messaging/devicecontents`

ペアリング済みデバイスへのコンテンツの割り当てを管理します（例：TV にどのレッスンを表示するか）。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | デバイスのコンテンツ割り当てを読み込みます |
| POST | `/` | JWT | — | デバイスのコンテンツ割り当てを保存します（一括） |
| DELETE | `/:id` | JWT | — | デバイスのコンテンツ割り当てを削除します |

## テキストメッセージ

ベースパス: `/messaging/texting`

SMS のテキストメッセージプロバイダー、グループへのテキスト送信、配信状況の追跡を管理します。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | 教会のテキストメッセージプロバイダーを読み込みます（認証情報はマスクされます） |
| GET | `/status` | JWT | — | `{ enabled }`：教会で有効なテキストメッセージプロバイダーがあるかどうかを返します。サインイン済みの教会のユーザーであれば誰でも利用できます。テキストを送信できる場合にのみ **Text** のオプションを表示するために使われます |
| GET | `/inboundUrl` | JWT | `texting.send` または `settings.edit` | `{ url }`：プロバイダーに貼り付けるための、教会の受信用（STOP）Webhook URL を返します |
| POST | `/inbound/:churchId/:token` | 公開 | — | プロバイダーの受信メッセージ用 Webhook。`token` は教会 ID の HMAC です。返信が停止ワード（`STOP`、`STOPALL`、`UNSUBSCRIBE`、`CANCEL`、`END`、`QUIT`、`OPTOUT`、`REVOKE`）とちょうど一致する場合、一致するすべての人物を `optedOut` にし、その人物の `allowSms` をオフにします。`{ optedOut: <count> }` を返します。それ以外の返信の場合は `{ optedOut: 0 }` を返します |
| GET | `/preview/:groupId` | JWT | — | グループへのテキスト送信の受信者をプレビューします（対象、オプトアウト済み、電話番号なしの件数） |
| GET | `/sent` | JWT | — | 教会の送信済みテキストメッセージの記録をすべて読み込みます |
| GET | `/sent/:id/details` | JWT | — | 受信者ごとの配信ログとともに、送信済みのテキストを読み込みます |
| POST | `/providers` | JWT | — | テキストメッセージプロバイダーを保存します（一括）。API の認証情報は暗号化されます |
| POST | `/send` | JWT | — | グループの対象となるすべてのメンバーに SMS を送信します。本文：`{ groupId, message }`。差し込みフィールド（`{{firstName}}`、`{{lastName}}`、`{{displayName}}`、`{{churchName}}`）は受信者ごとに解決されます |
| POST | `/sendPerson` | JWT | — | 特定の 1 人に SMS を送信します。本文：`{ personId, phoneNumber, message }`。差し込みフィールドは解決され、解決後のテキストが記録されます |
| DELETE | `/providers/:id` | JWT | — | テキストメッセージプロバイダーを削除します |

### 例：グループにテキストを送信する

```
POST /messaging/texting/send
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "message": "Reminder: Service starts at 10 AM this Sunday!"
}
```

```json
{
  "totalMembers": 50,
  "recipientCount": 42,
  "successCount": 40,
  "failCount": 2,
  "optedOutCount": 5,
  "noPhoneCount": 3
}
```

## メールテンプレート

ベースパス: `/messaging/emailTemplates`

再利用可能なメールテンプレートの管理と、グループへのテンプレート化されたメールの送信を行います。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 教会のすべてのメールテンプレートを読み込みます |
| GET | `/:id` | JWT | — | ID を指定して単一のメールテンプレートを読み込みます |
| GET | `/sendStatus` | JWT | `groupMembers.edit` または `tasks.admin` | 教会のグループメール状況：`{ approved, paused, remaining, requested }`。B1Admin の「メールを送信」ダイアログとワークフローの **Send email** アクションは、メールが送信されない場合に警告を表示するためにこれを使用します |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | 教会がグループメールを利用できるよう、サポートに承認を依頼します（教会ごとに週 1 回まで） |
| GET | `/preview/:groupId` | JWT | — | グループのメール配信をプレビューします（配信対象の受信者数、メールアドレスがないメンバー） |
| POST | `/` | JWT | — | メールテンプレートを作成または更新します（一括） |
| POST | `/send` | JWT | — | グループのすべてのメンバーにテンプレート化されたメールを送信します。本文：`{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | メールテンプレートを削除します |

### 例：グループにメールを送信する

```
POST /messaging/emailTemplates/send
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "subject": "This Week's Update - {{churchName}}",
  "htmlContent": "<p>Hello {{firstName}},</p><p>Here's what's happening this week...</p>"
}
```

```json
{
  "totalMembers": 50,
  "recipientCount": 45,
  "successCount": 44,
  "failCount": 1,
  "noEmailCount": 5
}
```

**対応している差し込みフィールド:** `{{firstName}}`、`{{lastName}}`、`{{displayName}}`、`{{email}}`、`{{churchName}}`

## ブロックされた IP アドレス

ベースパス: `/messaging/blockedips`

（レガシー）ライブ配信のチャット向けの IP ブロック機能です。B1App のクライアントはもう `POST /` を呼び出しません。IP ブロックは統合配信への移行で削除されました。`/clear` ルートは、配信サービスが保存されたときに `StreamingServiceController` からサーバー間で引き続き呼び出されます。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | （レガシー）ブロックされた IP アドレスを保存します（一括）。アクティブなクライアントはありません |
| POST | `/clear` | JWT | — | 特定のサービスについて、ブロックされたすべての IP アドレスを解除します。本文：`[{ serviceId, churchId }]` |

## 配信ログ

ベースパス: `/messaging/deliverylogs`

送信済みメッセージ（SMS、プッシュ通知、メール）の配信状況を追跡します。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | コンテンツの種類と ID で配信ログを読み込みます |
| GET | `/person/:personId` | JWT | — | 特定の人物の配信ログを読み込みます。任意で `?startDate=&endDate=` によりフィルタリングできます |
| GET | `/recent` | JWT | — | 教会の最近の配信ログを読み込みます。任意で `?limit=` を指定できます（既定値は 100） |
| GET | `/:id` | JWT | — | ID を指定して配信ログを読み込みます |

## 関連ページ

- [リアルタイムアーキテクチャ](../../realtime.md) -- WebSocket プロトコル、ルームの購読、統合配信フレームワーク
- [Web プッシュ通知](../../web-push.md) -- ブラウザでのプッシュ登録と配信
- [メンバーシップのエンドポイント](./membership.md) -- 人物、グループ、ロール、中核となる ID
- [出席のエンドポイント](./attendance.md) -- 礼拝と来訪の追跡
- [認証と権限](./authentication.md) -- ログインの流れ、JWT、OAuth、権限モデル
- [モジュールの構造](../module-structure.md) -- コードの構成パターン
