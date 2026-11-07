---
title: "メッセージングのエンドポイント"
---

# メッセージングのエンドポイント

<div class="article-intro">

メッセージングモジュールは、リアルタイムの会話、チャットメッセージ、プッシュ通知、SMS/メールの配信、WebSocket接続、プライベートメッセージ、デバイス登録、テキストメッセージングプロバイダーを管理します。ライブ配信のチャットと非同期の通知の両方のために、ChurchApps のすべてのアプリケーションで使われる通信基盤を提供します。

</div>

**ベースパス:** `/messaging`

## 会話

ベースパス: `/messaging/conversations`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | カンマ区切りのIDで会話を読み込み、最初と最後のメッセージを含めます |
| GET | `/messages/:contentType/:contentId` | JWT | — | コンテンツに紐づく会話を、ページ分けされたメッセージとともに読み込みます（`?page=&limit=`） |
| GET | `/posts` | JWT | — | 現在のユーザーのグループにある投稿タイプの会話を取得します |
| GET | `/posts/group/:groupId` | JWT | — | 特定のグループの投稿タイプの会話を取得します |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | B1 Admin のメモページ向けに、すべてのレコードの中から最新のメモを取得します。`section` は `people`、`groups`、`events`、`workflows` のいずれかです（それ以外は400）。`limit` の既定値は25（最大100）、`before` は前のページからのカーソルです。各メモは、そのタイプのルール（People の編集権限または機密メモの権限、グループのリーダー、イベントの閲覧者、ワークフローカードの閲覧者）を引き続き満たす必要があるため、呼び出し元は開けるメモだけを見ることができます。メモ本文は300文字で切り詰められます |
| GET | `/current/:churchId/:contentType/:contentId` | 公開 | — | コンテンツの現在の会話を取得、または作成します（contentId を自動復号します） |
| GET | `/:churchId/:contentType/:contentId` | 公開 | — | コンテンツタイプとIDで会話を読み込みます |
| GET | `/:churchId/:id` | 公開 | — | IDを指定して1件の会話を読み込みます |
| POST | `/` | JWT | — | 会話を作成または更新します（一括） |
| POST | `/start` | JWT | — | 最初のコメントメッセージを付けて新しい会話を開始します |
| DELETE | `/:churchId/:id` | JWT | — | 会話を削除します |

### 人物メモへのアクセス制御

`contentType: "person"`（人物レコードのメモタブ）または `contentType: "personConfidential"`（機密メモのセクション）の会話は、すべての読み取り・書き込みのパスで制限されます。上記の公開ルートも含まれ、これらのコンテンツタイプに対しては `401` を返します。`person` には MembershipApi の **People / Edit** 権限が必要で、`personConfidential` には **People / View Confidential Notes** 権限が必要です。スコープ付きAPIキーの場合、`people:write` は両方のアクションを含みます（ただし、キーのユーザーが基になるロールの権限を持っている必要があります）。

### グループおよびイベントのメモへのアクセス制御 {#group-and-event-notes-access-control}

さらに2つのメモのコンテンツタイプも、同じように、すべての読み取り・書き込みのパス（上記の公開ルートを含む）で制限されており、匿名での投稿は決して許可されません。

- **`groupNote`**（`contentId` = グループID）— グループの **Leader notes** フィード。そのグループのリーダー（JWT の `leaderGroupIds`）だけが読み取りや投稿を行えます。`content.edit` やグループメンバーシップの権限を含め、どのスタッフ権限もアクセスを許可しません。
- **`eventNote`**（`contentId` = イベントID）— カレンダーイベントのメモです。`content.edit` または **Calendars / Admin** を持つスタッフは、常に読み取りと投稿ができます。それ以外の場合、アクセスはイベントの `notesViewRole`（読み取り）と `notesPostRole`（投稿）に従います。`staff`（既定値、フィールドが `null` の場合に使用）は他の誰にも許可せず、`leaders` はイベントのグループのリーダーに許可し、`members` はイベントのグループのメンバーとリーダーに許可します。`groupId` のないイベントはスタッフ専用です。

### ワークフローカードのメモへのアクセス制御

`contentType: "workflowCard"`（ワークフローカードのメモ。`contentId` はカードのタスクID）の会話は、そのカードを開くことができる人だけが読み書きできます。具体的には、DoingApi の **Tasks / View** 権限を持つユーザー、またはカードの担当者、作成者、対象となっている人物またはグループです。それ以外の人は、上記の公開ルートを含むすべての読み取りパスで `401` を受け取ります。カードの会話は、`POST /doing/tasks/:id/conversation`（ボディ `{ "conversationId": "..." }`、最初に添付された会話が優先）を使ってカード自体から添付されます。これはカードの編集者と担当者が呼び出せます。

### 例: 会話を開始する

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
|--------|------|------|------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | 会話のすべてのメッセージを読み込みます |
| GET | `/catchup/:churchId/:conversationId` | 公開 | — | 会話のすべてのメッセージを読み込みます（ライブチャット用の公開キャッチアップ） |
| GET | `/:churchId/:id` | 公開 | — | IDを指定して1件のメッセージを読み込みます |
| POST | `/` | JWT | — | メッセージを保存します（一括）。リアルタイムの更新を送信し、通知をトリガーします。既存のメッセージを更新するには、その作成者であるか `content.edit` を持っている必要があります。保存された作成者は決して再割り当てできません |
| POST | `/send` | 公開 | — | メッセージを送信します（一括、公開）。WebSocket経由でリアルタイムの更新を送信し、通知をトリガーします |
| POST | `/setCallout` | JWT | — |（レガシー）コールアウトメッセージをリアルタイムで一斉送信します。現在アクティブなクライアントはありません。ライブ配信のチャットではコールアウトは表示されなくなりました |
| DELETE | `/:churchId/:id` | JWT | — | メッセージを削除し、削除をリアルタイムで一斉送信します。[メッセージのモデレーション](#message-moderation)を参照してください |

### メッセージのモデレーション

次の人はメッセージを削除できます。

- メッセージの作成者
- （教会内のどこでも）`content.edit` を持つスタッフ
- **グループのリーダー**。`contentType` が `group` または `groupAnnouncement` の会話で、`contentId` が自分がリードしているグループである場合（JWT の `leaderGroupIds`）

人物メモの会話（`person` / `personConfidential`）は、リーダーによるモデレーションの対象外です。これらはメモの権限（`people.edit`、`people.viewConfidentialNotes`）を使用します。

リーダーは削除のみ可能で、編集はできません。他のメンバーのメッセージを書き直せるのは、引き続き作成者と `content.edit` のスタッフに限られます。

### 例: メッセージを送信する

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

## プライベートメッセージ

ベースパス: `/messaging/privatemessages`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|-------------|
| GET | `/` | JWT | — | 現在のユーザーのすべてのプライベートメッセージを読み込みます（会話ごとの最新メッセージを含み、すべてを既読にします） |
| GET | `/existing/:personId` | JWT | — | 特定の人物との既存のプライベート会話を検索します |
| GET | `/:id` | JWT | — | IDを指定してプライベートメッセージを読み込みます（現在のユーザー宛の場合、通知をクリアします） |
| POST | `/` | JWT | — | プライベートメッセージを送信します（一括）。受信者にプッシュ通知をトリガーします |

## 通知

ベースパス: `/messaging/notifications`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|-------------|
| GET | `/unreadCount` | JWT | — | 現在のユーザーの未読通知数を取得します |
| GET | `/my` | JWT | — | 現在のユーザーのすべての通知を読み込みます（すべてを既読にします） |
| GET | `/tmpEmail` | 公開 | — | 1日ごとのメール通知ダイジェストをトリガーします（デバッグ/cron 用エンドポイント） |
| GET | `/:churchId/person/:personId` | JWT | — | 特定の人物の通知を読み込みます |
| GET | `/:churchId/:id` | JWT | — | IDを指定して通知を読み込みます |
| POST | `/` | JWT | — | 通知を作成または更新します（一括） |
| POST | `/create` | JWT | — | 複数の人物に対して通知を作成します。ボディ: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | 人物のすべての通知を既読にします |
| POST | `/sendTest` | JWT | — | テスト用のプッシュ通知を送信します。ボディ: `{ personId, title }` |
| POST | `/ping` | 公開 | — | 外部のトリガーから通知を作成します。ボディ: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | 通知を削除します |

### 例: 通知を作成する

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

## 通知設定

ベースパス: `/messaging/notificationpreferences`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|-------------|
| GET | `/categories` | JWT | — | 通知カテゴリを、既定のチャンネルと許可されたチャンネルとともに一覧表示します |
| GET | `/my` | JWT | — | 現在のユーザーの通知設定を読み込みます（設定がない場合は既定値を自動作成します） |
| POST | `/` | JWT | — | 現在のユーザーの設定を保存します。ボディ: `allowPush`、`allowSms`、`emailFrequency`、`masterMute`、`quietHoursStart`、`quietHoursEnd`、`timeZone`、`maxPushPerDay` のいずれか、および任意で `overrides: [{ categoryKey, channel, optedIn }]`（channel は `push`、`email`、`in_app`、`sms` のいずれか。ロックされたカテゴリは無視されます）。`allowSms` は、テキストによるリマインダーへのメンバーのオプトインです。行の配列形式の古いボディも引き続き受け付けます |

## 接続

ベースパス: `/messaging/connections`

チャット、グループの会話、プライベートメッセージ、ライブ配信のための WebSocket/リアルタイム接続を管理します。エンドツーエンドのプロトコルについては、[リアルタイムアーキテクチャ](../../realtime)を参照してください。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|-------------|
| GET | `/:churchId/:conversationId` | 公開 | — | 会話のすべての接続を読み込みます |
| POST | `/` | 公開 | — | 接続を登録します（一括）。会話に対して出席状況のブロードキャストをトリガーします。ボディの項目: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | 公開 | — | ソケットIDで指定した接続の表示名を更新します。ボディ: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | 公開 | — | 会話から接続を切断します。出席状況のブロードキャストをトリガーします |
| POST | `/tmpSendAlert` | 公開 | — | 人物の接続に通知アラートを送信します。ボディ: `{ churchId, personId }` |

## デバイス

ベースパス: `/messaging/devices`

プッシュ通知とコンテンツのペアリング（例: テレビ画面の Lessons アプリ）のためのデバイス登録を管理します。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|-------------|
| POST | `/enroll` | JWT | — | デバイスを登録または更新します（モバイルのプッシュ登録）。FCM トークンまたはデバイスIDで照合します |
| POST | `/enrollAnon` | 公開 | — | 匿名デバイスを登録し、4文字のペアリングコードを生成します |
| POST | `/` | 公開 | — | デバイスを保存します（一括） |
| GET | `/pair/:pairingCode` | JWT | — | ペアリングコードを使ってデバイスをペアリングします。コンテンツを割り当てるには、任意で `?contentType=&contentId=` を指定します |
| GET | `/status/:deviceId` | 公開 | — | デバイスのペアリング状態を確認します |
| GET | `/:churchId` | JWT | — | 教会のすべてのデバイスを読み込みます |
| GET | `/:churchId/person/:personId` | JWT | — | 人物のすべてのデバイスを読み込みます |
| GET | `/:churchId/:id` | JWT | — | IDを指定してデバイスを読み込みます |
| DELETE | `/:churchId/:id` | JWT | — | デバイスを削除します |

### 例: デバイスを登録する

```
POST /messaging/devices/enroll
Authorization: Bearer <token>

{
  "fcmToken": "firebase-token-abc123",
  "appName": "B1Mobile",
  "label": "John's iPhone",
  "deviceInfo": "iOS 17, iPhone 15"
}
```

```json
{
  "id": "device-001",
  "churchId": "church-789",
  "fcmToken": "firebase-token-abc123",
  "appName": "B1Mobile",
  "label": "John's iPhone",
  "registrationDate": "2026-02-17T10:00:00.000Z",
  "lastActiveDate": "2026-02-17T10:00:00.000Z"
}
```

## デバイスコンテンツ

ベースパス: `/messaging/devicecontents`

ペアリング済みデバイスへのコンテンツの割り当てを管理します（例: テレビに表示されるレッスン）。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | デバイスのコンテンツ割り当てを読み込みます |
| POST | `/` | JWT | — | デバイスのコンテンツ割り当てを保存します（一括） |
| DELETE | `/:id` | JWT | — | デバイスのコンテンツ割り当てを削除します |

## テキストメッセージ

ベースパス: `/messaging/texting`

SMS のテキストメッセージングプロバイダー、グループへのテキスト送信、配信状況の追跡を管理します。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|-------------|
| GET | `/providers` | JWT | — | 教会のテキストメッセージングプロバイダーを読み込みます（認証情報はマスクされます） |
| GET | `/status` | JWT | — | `{ enabled }`。教会に有効なテキストメッセージングプロバイダーがあるかどうかを返します。サインイン済みのすべての教会ユーザーが利用でき、テキストを送信できる場合にのみ **Text** オプションを表示するために使われます |
| GET | `/inboundUrl` | JWT | `texting.send` または `settings.edit` | `{ url }`。プロバイダーに貼り付ける、教会の受信（STOP）Webhook URL を返します |
| POST | `/inbound/:churchId/:token` | 公開 | — | プロバイダーの受信メッセージ用 Webhook です。`token` は教会IDの HMAC です。返信が停止ワード（`STOP`、`STOPALL`、`UNSUBSCRIBE`、`CANCEL`、`END`、`QUIT`、`OPTOUT`、`REVOKE`）と完全に一致した場合、一致するすべての人物を `optedOut` にし、その人物の `allowSms` をオフにします。`{ optedOut: <count> }` を返します。その他の返信では `{ optedOut: 0 }` を返します |
| GET | `/preview/:groupId` | JWT | — | グループへのテキスト送信の受信者をプレビューします（対象、オプトアウト済み、電話番号なしの人数） |
| GET | `/sent` | JWT | — | 教会の送信済みテキストメッセージの記録をすべて読み込みます |
| GET | `/sent/:id/details` | JWT | — | 受信者ごとの配信ログとともに、送信済みのテキストを読み込みます |
| POST | `/providers` | JWT | — | テキストメッセージングプロバイダーを保存します（一括）。API の認証情報は暗号化されます |
| POST | `/send` | JWT | — | グループの対象となるすべてのメンバーに SMS を送信します。ボディ: `{ groupId, message }`。差し込みフィールド（`{{firstName}}`、`{{lastName}}`、`{{displayName}}`、`{{churchName}}`）は受信者ごとに解決されます |
| POST | `/sendPerson` | JWT | — | 1人の人物に SMS を送信します。ボディ: `{ personId, phoneNumber, message }`。差し込みフィールドは解決され、解決後のテキストがログに記録されます |
| DELETE | `/providers/:id` | JWT | — | テキストメッセージングプロバイダーを削除します |

### 例: グループにテキストを送信する

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
|--------|------|------|------|-------------|
| GET | `/` | JWT | — | 教会のすべてのメールテンプレートを読み込みます |
| GET | `/:id` | JWT | — | IDを指定して1件のメールテンプレートを読み込みます |
| GET | `/sendStatus` | JWT | `groupMembers.edit` または `tasks.admin` | 教会のグループメール状況: `{ approved, paused, remaining, requested }`。B1Admin の「メールを送信」ダイアログと、ワークフローの **Send email** アクションがこれを使い、メールが送信されない場合に警告を表示します |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | 教会がグループメールを利用できるよう、サポートチームに承認を依頼します（教会ごとに週1回まで） |
| GET | `/preview/:groupId` | JWT | — | グループのメール配信をプレビューします（対象の受信者数、メールアドレスのないメンバー） |
| POST | `/` | JWT | — | メールテンプレートを作成または更新します（一括） |
| POST | `/send` | JWT | — | グループのすべてのメンバーにテンプレート化されたメールを送信します。ボディ: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | メールテンプレートを削除します |

### 例: グループにメールを送信する

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

## ブロックされたIP

ベースパス: `/messaging/blockedips`

（レガシー）ライブ配信のチャット向けのIPブロックです。B1App のクライアントは `POST /` をもう呼び出しません。IPブロックは統一配信への移行の際に削除されました。`/clear` ルートは、配信サービスが保存されたときに `StreamingServiceController` からサーバー間で引き続き呼び出されます。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|-------------|
| POST | `/` | JWT | — |（レガシー）ブロックされたIPを保存します（一括）。現在アクティブなクライアントはありません |
| POST | `/clear` | JWT | — | 特定のサービスについて、ブロックされたIPをすべて消去します。ボディ: `[{ serviceId, churchId }]` |

## 配信ログ

ベースパス: `/messaging/deliverylogs`

送信済みメッセージ（SMS、プッシュ通知、メール）の配信状況を追跡します。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | コンテンツタイプとIDで配信ログを読み込みます |
| GET | `/person/:personId` | JWT | — | 人物の配信ログを読み込みます。任意で `?startDate=&endDate=` によりフィルタリングできます |
| GET | `/recent` | JWT | — | 教会の最近の配信ログを読み込みます。任意で `?limit=`（既定値は100）を指定できます |
| GET | `/:id` | JWT | — | IDを指定して配信ログを読み込みます |

## 関連ページ

- [リアルタイムアーキテクチャ](../../realtime) — WebSocket のプロトコル、ルームの購読、統一配信フレームワーク
- [Web プッシュ通知](../../web-push) — ブラウザのプッシュ登録と配信
- [メンバーシップのエンドポイント](./membership) — 人物、グループ、ロール、中核となる ID
- [出席のエンドポイント](./attendance) — 礼拝と訪問の記録
- [認証と権限](./authentication) — ログインの流れ、JWT、OAuth、権限モデル
- [モジュール構造](../module-structure) — コードの構成パターン
