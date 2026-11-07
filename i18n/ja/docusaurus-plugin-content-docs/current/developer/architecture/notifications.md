---
title: "通知とリマインダーのアーキテクチャ"
---

# 通知とリマインダーのアーキテクチャ

<div class="article-intro">

見ているページの外で教会のメンバーに届くすべてのメッセージ（バッジの件数、プッシュ通知、ダイジェストメールなど）は、MessagingApi の 2 つの入口のいずれかを通ります。このページでは、その共通の経路、スケジュールに従ってそこへ流し込むリマインダーエンジン、そして実際に人へ届くものを決める設定モデルについて説明します。

</div>

## 概要：2 つの入口

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **人に何かを知らせるものはすべて** messaging モジュールの `NotificationHelper.createNotifications()` を通ります。この関数は `notifications` の行を保存し、レベル 0 の `in_app` を含め、チャンネルごとに `PreferenceGateHelper` を評価しながら socket → push → email の順にエスカレーションします。
2. **スケジュールされたものはすべて** `reminderDefinition`（エンティティ単位またはスコープ単位）として定義され、`reminderOccurrences` に展開されたうえで、定期タイマー上の `ReminderEngine.scan()` によって配信されます。展開処理は 1 つ、配信処理は 1 つ、送信台帳（`reminderSentLog`）も 1 つです。
3. **メールを直接送るのは** `TransactionalEmailHelper.sendTransactional()` の内部に限られます。この制約は ESLint ルールでコンパイル時に強制されます。詳しくは後述します。

:::tip メールの入口はリントで強制されています。単なる慣習ではありません
`Api/tools/eslint-rules/email-door.cjs` は `no-direct-email-helper` ルールを定義しています。`NotificationHelper.ts` と `TransactionalEmailHelper.ts` の外で `EmailHelper.sendTemplatedEmail()` または `EmailHelper.sendEmail()` を呼び出すと、リントに失敗します。メールを送る必要がある場合は、ファネル（`emailImmediate` を指定した `createNotifications`）を経由するか、`TransactionalEmailHelper.sendTransactional()` を使ってください。CI を通過する別の方法はありません。
:::

## 通知ファネル

`NotificationHelper.createNotifications()` は、スケジュールされていない通知やトランザクション系ではないすべての通知に対する唯一の入口です。

```typescript
createNotifications(
  peopleIds: string[],
  churchId: string,
  contentType: string,
  contentId: string,
  message: string,
  link?: string,
  triggeredByPersonId?: string,
  options?: {
    deliveryStartLevel?: number;      // 0 socket (default), 1 push, 2 email-only
    category?: string;                // preference axis; derived from contentType if omitted
    emailByPerson?: Record<string, { subject: string; html: string }>;
    emailImmediate?: boolean;         // send email now instead of waiting for the digest
  }
)
```

受信者ごとに `notifications` に行を保存し、下記のチャンネルの階段を順に処理する `attemptDeliveryWithEscalation` を呼び出します。同じ `(contentType, contentId)` の未読行がすでにある場合は、新たな作成を抑止します。この重複防止ガードは、`emailImmediate` を指定した送信（リマインダーのオフセット、スタッフによる「全員にメール」、ワークフローのステップは独自に重複を管理します）と、ダイレクトメッセージではスキップされます。ダイレクトメッセージは常に socket に通知します。

`shared/helpers/NotificationService.ts` は、messaging モジュール外の呼び出し元向けに同じシグネチャ（`NotificationServiceOptions`）を提供しており、起動時に messaging モジュールへ登録されます。

## チャンネルのエスカレーション

配信は、ある階層から始まります（既定ではレベル 0。リマインダーや明示的な送信ではより高いレベル）。前のチャンネルで配信できなかった場合にのみ、次のチャンネルへ進みます。各レベルでは、何かを試みる前に `PreferenceGateHelper` による判定を通します。

| レベル | チャンネル | 動作 |
|-------|----------|------|
| 0 | **in_app / socket** | まず `in_app` の判定を行います。抑止（ミュート）されている場合は、行を `isNew=false` で保存し、配信はそこで完全に止まります。socket への通知、バッジ、以降のエスカレーションは一切行いません。抑止されていない場合、サーバーはその人の `alerts` ルームに開いている socket 接続を探し、`notification`（または `privateMessage`）フレームを送信します。通常の通知では、socket への配信が成功すると、そこでチェーンは止まります。その後は 30 分タイマーが未読項目を再確認し、必要に応じて後からエスカレーションします。ダイレクトメッセージは socket で止まることはありません。インストール済みの PWA はバックグラウンドで alerts の socket を開いたままにできるため、そうしないと OS レベルのプッシュ通知が抑制されてしまうからです。 |
| 1 | **push** | `allowPush`、カテゴリーのオプトアウト、静穏時間によって制御されます。その人の `devices` 行に登録されている Expo のプッシュトークンと Web Push のサブスクリプションの両方に送信し、エンドポイントで重複を除去し、古いトークンを削除します。 |
| 2 | **email** | `emailFrequency` とカテゴリーのオプトアウトによって制御されます。即時送信（`emailImmediate`）は直ちにレンダリングし、`deliveryLogs` に行を書き込みます。それ以外の場合、通知は後述のバッチダイジェストで送られるまで保留されます。 |
| — | **sms** | エスカレーションの階段の一段ではありません。SMS を送る唯一の制御対象の送信元はリマインダーエンジンです。定義の `channels` に `sms` が含まれている場合、`ReminderEngine.sendSms()` は、各受信者にプッシュ・メールの通知**に加えて**テキストを送ります（[テキストリマインダー](#text-reminders)を参照）。一括のテキスト送信（`TextingController` / `@churchapps/texting`）、サービング概要の **Text Volunteers**（`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`）、ワークフローの **Send Text** ステップ（`StepActionHelper.sendText` → `sendPersonText`）はすべて、教会のプロバイダーを通じて直接テキストを送信します。そのため、通知の設定や静穏時間は適用されず、適用されるのは本人の `optedOut` フラグだけです。 |

socket やプッシュの段階で未読のままの通知は、30 分タイマー（`NotificationHelper.escalateDelivery`）によってエスカレーションされます。バッチメールは `NotificationHelper.sendEmailNotifications(frequency)` が送信します。その頻度は各人の `emailFrequency` 設定によって決まります。`individual` は 30 分タイマーで実行され、`daily` は夜間タイマーで実行されます。（`weekly` は有効な設定値ですが、専用のバッチ実行はまだありません。）

## リマインダーエンジン

スケジュールされたリマインダー（イベントのリマインダー、タスクの期限、奉仕や計画の割り当てのリマインダー）はすべて、機能ごとに個別の cron ロジックを持つのではなく、1 つの汎用エンジンを通ります。

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**定義**（`reminderDefinitions`）は、エンティティ単位（`entityId` が設定されている。特定のイベント、タスク、計画）か、スコープ単位（`entityId` が null で `scopeId` が設定されている。例：ある奉仕計画タイプの下にあるすべての計画）のいずれかです。定義には、分単位のオフセットの CSV（`offsets`、例：1 日前と 1 時間前を表す `"1440,60"`）、現地時間での送信時刻（`sendLocalTime`）、チャンネルの CSV（`channels`。`email` を含むと、送信時に即時のリッチメールが送られます）、`recipientMode`、任意のカスタム `message` が含まれます。

**展開**では、先の一定期間（ローリングの複数日の期間）について発火行を実体化します。夜間タイマーで実行されるほか、定義が保存されるたびに同期的にも実行されるため、直前に作成されたイベントのリマインダーも確実に発火します。スコープ定義は、アダプターの `loadScopeEntities` を通じて展開され、具体的なエンティティごとに 1 つの発生セットを生成します。エンティティ単位の発生は `definitionId:occurrenceISO:offset` というキーを使い、スコープ単位の発生はエンティティ ID で名前空間を分けるため、互いに衝突しません。発生を upsert すると、以前キャンセルされた行が**復活**します。基礎となるエンティティが変わった後にリマインダーを再同期する標準的な方法は、キャンセルしてから再展開することです。すでに `sent`、`failed`、`processing` になっている行は変更されません。

**配信**（`ReminderEngine.scan()`）は 30 分タイマーで実行されます。期限の来た発生を取得し（リースによって二重処理を防ぎます）、エンティティのアダプターを通じて受信者を読み込み、その発生について `reminderSentLog` にすでに記録されている人を除外し、`createNotifications` を `deliveryStartLevel: 1`（プッシュへ直接進む）で呼び出します。定義のチャンネルにメールが含まれる場合は、`emailImmediate` と `emailByPerson` も指定します。

### テキストリマインダー

定義の `channels` に `sms` が含まれている場合、`scan()` はプッシュ・メールの通知を作成した後、同じ新規受信者に対して `ReminderEngine.sendSms()` を呼び出します。テキスト送信はメンバーごとのオプトインです。

- 受信者はそれぞれ `PreferenceGateHelper.evaluate(..., "sms", ...)` を通過します。そのため `allowSms` がオンになっている必要があります（既定ではオフで、B1App の **Text messages** スイッチによって設定されます）。また、そのカテゴリーの `sms` チャンネルがオフに上書きされていてはいけません。`event_reminders`、`serving_schedule`、`tasks` は、`defaultChannels` と `allowedChannels` の両方に `sms` を含みます。
- `mobilePhone` がない人や `optedOut` が設定されている人は抑止されます。教会にテキストのプロバイダーが設定されていない場合は、理由 `no_provider` で、そのバッチの残りすべてが抑止されます。
- 本文は `ReminderEngine.smsBody()` によって作成されます。形式は `"<Church name>: <message> Reply STOP to opt out."` で、1 つの 160 文字のセグメントに収まるよう切り詰められます。
- 受信者ごとに `reminderSentLog` の行が 1 つ作成されます。`channel` は `"sms"`、ステータスは `sent` / `suppressed` / `failed` のいずれかです。この行はプッシュ・メールの行とは別のキーで管理されるため、テキストの送信に失敗しても、プッシュやメールが再送されることはありません。

エディターで **Text** が表示されるのは、`GET /messaging/texting/status` が `{ enabled: true }` を返したとき（教会の最初のテキストプロバイダーが有効になっているとき）だけです。

**STOP によるオプトアウト。** `POST /messaging/texting/inbound/:churchId/:token` は匿名の Webhook で、教会がプロバイダーに貼り付けて使います（B1Admin はテキスト設定で `GET /messaging/texting/inboundUrl` から URL を表示します）。トークンは教会 ID の HMAC です（`SmsOptOutHelper.token`）。`SmsOptOutHelper.parse` は、Twilio 形式のフォームフィールドと、Clearstream / TextInChurch 形式の JSON の両方を受け付けます。返信がキャリアの停止ワード（`STOP`、`STOPALL`、`UNSUBSCRIBE`、`CANCEL`、`END`、`QUIT`、`OPTOUT`、`REVOKE`）と完全に一致する場合、その教会で削除されていない、携帯番号が一致するすべての人に対して、`people.optedOut = true` と `allowSms = false` が設定されます。それ以外の返信は確認応答されるものの、無視されます。

内部のイベントバスは、夜間の展開を待たずにエンティティの変更に反応します。コンテンツのイベント（Webhook ディスパッチャー経由）と、計画・タスクの更新イベントは、影響を受けるエンティティの即時再展開またはキャンセルを引き起こします。また、計画の更新では、その計画タイプに紐づくスコープ定義も再展開されます。

### アダプター

エンジンはエンティティの種類に依存しません。サポートされている各エンティティの種類は、アダプター（`helpers/adapters/`）を通じて接続されます。

| エンティティの種類 | アダプター | 備考 |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | 受信者は、イベントと `recipientMode` によって、登録者またはグループメンバーに限定されます。 |
| `plan` | `PlanReminderAdapter` | 受信者は、公開済み（下書きではない）計画における承諾済み・未確認の割り当てです。奉仕の確認ワークフローを通じて発行された未確認の割り当ては、承諾されるまで除外されます（後述）。`buildEmails` は `DoingModuleGateway.buildPlanReminderEmails` を呼び出します。これは `doing/helpers/PlanReminderEmailHelper` を通じて、担当内容、メモ、カスタムメッセージをレンダリングします。そこには、`ReminderTokenHelper` によって署名された承諾・辞退ボタンも含まれ、これらは公開の割り当て応答エンドポイントに送信されます。 |
| `task` | `TaskReminderAdapter` | 受信者は、タスクの担当者です。 |

### エンドポイント

| メソッド | パス | 目的 |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | 1 つのエンティティのリマインダー定義を読み込む、または保存する。 |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | スコープ単位（継承された）のリマインダー定義を読み込む、または保存する。 |
| `DELETE` | `/messaging/reminders/:defId` | 定義を削除し、保留中の発生をキャンセルする。 |
| `GET` | `/messaging/reminders/event/:eventId/preview` | 保存前に、イベントのリマインダーの受信者数と次回の発火時刻をプレビューする。 |
| `GET` | `/messaging/reminders/log` | 教会の最近のリマインダー発生履歴。 |
| `POST` | `/messaging/reminders/mute` | 特定のエンティティのリマインダーをミュートする。 |

定義を保存すると、そのエンティティまたはスコープについて同期的な再展開が実行されます。そのため、編集者は夜間ジョブを待たずに、最新の「次回の発火」を確認できます。

## ダイレクトメッセージ

ダイレクトメッセージは、別の エスカレーション経路ではなく、他のすべてと同じファネルを利用します。未読の会話ごとに、`notifications` に 1 つの**シャドウ行**が作成されます（`contentType='privateMessage'`、`contentId` は非公開メッセージの ID、`category='direct_messages'`）。この行がすべての配信状態を管理します。socket・プッシュ・メールのエスカレーション、既読の追跡など、すべてです。`privateMessages` テーブル自体は、メッセージ本文と `notifyPersonId` 列を保持します。`notifyPersonId` は未読バッジの元になっており、受信者が会話を読むとクリアされます。

シャドウ行は通知のベル（ベルアイコン）からは見えません。未読件数のクエリ、通知一覧のクエリ、既読化・削除のクエリからは除外されており、これらはすべて `contentType <> 'privateMessage'` でフィルターされています。DM の通知は、未読状態に関係なく毎回 socket に届きます（ライブチャットとしての動作で、重複防止は行いません）。また、DM は通常の通知のように socket の段階で止まることはありません。バックグラウンドの PWA は socket を開いたままにできますが、OS レベルのプッシュ通知は依然として必要だからです。人がダイレクトメッセージの通知をミュートすると、シャドウ行は保留状態になります（`isNew=false`、`notifyPersonId` はクリア）。会話そのものの中には引き続き表示されますが、バッジやアラートは表示されません。

## 設定と判定

すべての送信は `PreferenceGateHelper.evaluate()` を通過します。これは純粋関数です（必要な状態はすべて引数で渡され、ホットパスで DB 呼び出しは行いません）。戻り値は `allow`、`suppress`、`defer` のいずれかです。判定のレイヤーは順番に実行され、最初に結論を出したレイヤーの結果が採用されます。

1. **ロックされたカテゴリー**：一部のカテゴリーは必須（tier 0）であり、他のすべてのレイヤーをバイパスします。
2. **マスターミュートとチャンネルの停止**：`masterMute`、`allowPush`、`allowSms`（既定ではオフ。メンバーがオプトインします）、または `emailFrequency='never'` の場合、即座に抑止されます。
3. **静穏時間**：プッシュと SMS のみが対象です（メールは邪魔になりにくいとみなされます）。その人のタイムゾーンでの現在の壁時計時刻が静穏時間帯に入っている場合、トランザクション系のカテゴリーは引き続き届きます。トランザクション系ではないカテゴリーは、静穏時間の終了時刻まで保留されます。終了時刻は `TimezoneHelper.wallClockToUtc` を通じて、夏時間に正しく対応した UTC の時刻として計算されます。
4. **カテゴリーごとの設定による上書き**：1 つのカテゴリー × チャンネルの組み合わせに対する明示的なオプトアウトです。設定がない場合は、そのカテゴリーの既定値が使われます。
5. **エンティティ単位のミュート**：特定のエンティティ（例：1 つのイベント、1 つの計画）に対して記録されたミュートは、カテゴリー単位の設定よりも制限を強めます。ただし、呼び出し元が通知と一緒にエンティティの ID と種類を渡した場合にのみ適用されます。

関係するテーブルは次のとおりです。`notificationPreferences`（全体の設定。`masterMute`、`emailFrequency`（`individual|daily|weekly|never` のいずれか）、`allowPush`、静穏時間の範囲とタイムゾーン、`allowSms`）、`notificationPreferenceOverrides`（カテゴリー × チャンネル単位）、`notificationEntityMutes`（エンティティ単位）です。

この判定は、ファネル内でアプリ内通知（レベル 0）、プッシュ（レベル 1）、メール（レベル 2）に適用されます。即時のリマインダーメールやダイジェストメールも対象です。また、`ReminderEngine.sendSms()` 内のリマインダーのテキストにも適用されます。トランザクション系のメール（認証コード、パスワードのリセット、招待、寄付の領収書）は、設計上この判定をバイパスします。それこそが 2 つ目の入口の存在理由です。

### 奉仕の確認ワークフロー

計画は、`workflowType = "assignmentConfirmation"` のワークフロー（`plans.confirmationWorkflowId`）を利用するように設定できます。その場合、公開・通知の操作は、割り当てごとの通知の代わりに `POST /doing/plans/:id/issueRequests` を呼び出します。新たに作成された未確認の割り当てごとに、`notified` と `confirmationWorkflowId` が設定され、ワークフローのカードが 1 枚作成されます（`tasks.assignmentId`、一意の `followupKey`）。このカードは、アプリ内のみのアラート（`appOnly: true`。プッシュ・メールへのエスカレーションはありません）を送信し、その後、ワークフローの `sendAssignmentRequest` アクションを実行します。これらのアクションは `MessagingModuleGateway.sendServingWorkflowMessage` を通過します。メールは `NotificationHelper.sendWorkflowEmail` 経由で送られ（判定を通過し、`ChurchEmailLimiter` の上限に従い、`workflowEmail` として計上されます）、SMS は `allowSms` と `serving_schedule` カテゴリーの判定を満たした場合に限り `sendPersonText` 経由で送られます。承諾・辞退（イベントバス上の `assignment.updated`）によってカードは閉じられます。30 分タイマー（`AssignmentWorkflowHelper.processPending`）は、取りこぼされた開始やイベントを修復し、フォローアップの期限までに返信のなかったリクエストを、リーダーによるレビュータスクに変換します。ライフサイクル全体は `Api/docs/assignment-confirmation-workflows.md` を参照してください。

## 教会が作成するメールの上限

教会が作成した内容のメールは、ChurchApps 共有の SES アイデンティティから送信されるため、`Api/src/shared/helpers/ChurchEmailLimiter.ts` によって教会ごとに計量されます。この仕組みを呼び出す経路は 4 つあります。グループ・テンプレートの送信（`EmailTemplateController`、コンテンツ種別 `email`）、フォーム後のフォローアップメール（`FormSubmissionController`、`formFollowUp`）、ワークフローの **Send email** アクション（`churchAuthored` を指定した `NotificationHelper`、`workflowEmail`）、奉仕の確認依頼メール（`NotificationHelper.sendWorkflowEmail`、`workflowEmail`）です。システムメール（認証コード、領収書、リマインダー）と、役割・グループへの招待（`UserController.sendInviteEmail`。固定テンプレート）は計量されません。

- **承認ゲート。** サーバー管理者が `churches.emailApprovedDate` を設定するまで、教会は何も送信できません（`POST /membership/churches/:id/emailApproval`。Server Admin → Churches → **Group Email** チップ）。アーカイブ済みの教会は常にブロックされます。B1Admin の Send Email ダイアログは `GET /messaging/emailTemplates/sendStatus`（`approved`、`paused`、`remaining`、`requested`）を読み取り、未承認の場合はエディターの代わりに **Request review** カードを表示します。ワークフローのステップエディターは同じエンドポイントを読み取り（`groupMembers.edit` に加えて `tasks.admin` にも公開されています）、教会が未承認または一時停止中の場合に **Send email** アクションについて警告します。送信時には、`ChurchEmailLimiter.remaining()` が 1 未満の場合、`MessagingModuleGateway.sendTemplatedEmail` は通知を作成せずに `false` を返します。そのため、カードの履歴が、破棄されたメールについて **Email sent** と表示することはありません。`POST /messaging/emailTemplates/requestApproval` は、教会ごとに週に最大 1 回、サポートへメールを送信します。
- **獲得された許容量。** 承認済みの教会には、`max(150, 2 × 過去 30 日間における教会作成メールの最大の 1 日の送信数)` が与えられます。上限は、ローリングの 24 時間あたり 2,000 通です。現在の 24 時間は「最大の 1 日」の計算から除外されるため、一時的な集中送信によって自身の上限を引き上げることはできません。
- **予約してから確定する。** `reserve()` は、送信前に受信者ごとに `deliveryLogs` の行を 1 つ書き込み、それらの行を含めて許容量を再確認します。2 つのリクエストが上限を同時にすり抜けた場合は取り消されます（送信は 429 を返します）。`settle()` は、各行を送信済みまたは失敗としてマークします。
- **苦情による一時停止。** `sesFeedback` Lambda（`Api/src/lambda/ses-feedback-handler.ts`。SES → SNS から供給されます）は、恒久的なバウンスや苦情を、その時期にそのアドレスへ教会作成メールを届けた教会に紐づけ、`deliveryMethod` の `sesBounce` / `sesComplaint` として保存します。教会は、7 日間で苦情が 2 件以上（送信数の 0.3% 以上）、またはハードバウンスが 10 件以上（5% 以上）に達すると一時停止されます。

## スケジューリング

リマインダーエンジンと通知のダイジェストは、どちらも新しいインフラを導入するのではなく、既存の定期タイマーに乗っています。

| タイマー | スケジュール | 実行内容 |
|-------|----------|------|
| 30 分タイマー | 30 分ごと | 未読通知のエスカレーション。`individual` 頻度のダイジェストメールの送信。期限の来たリマインダー発生の配信（`ReminderEngine.scan`）。承認ダイジェスト。期限の来た自動化の実行。 |
| 夜間タイマー | 協定世界時 05:00 | グループの出席リマインダー。定期配信の進行。自動更新リストの更新。次の期間についてのリマインダー発生の展開（`ReminderEngine.expandAll`）。`daily` 頻度のダイジェストメールの送信。 |

ローカルでは、`Api` プロジェクトから `npm run timer:30min` と `npm run timer:midnight` を実行することで、同じ処理をオンデマンドで実行できます。

## ファイル一覧

| 領域 | ファイル |
|------|-------|
| ファネル | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| 共有のエントリーポイント | `Api/src/shared/helpers/NotificationService.ts` |
| トランザクションの入口 | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, lint rule `Api/tools/eslint-rules/email-door.cjs` |
| 教会のメール上限 | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| リマインダーエンジン | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| テキスト送信 / STOP によるオプトアウト | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts`（`/status`、`/inboundUrl`、`/inbound/:churchId/:token`）、`Api/src/modules/doing/helpers/MatrixTextHelper.ts`（サービング概要の **Text Volunteers**） |
| リマインダーのリポジトリ | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| 奉仕・計画のメール | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| リマインダーの編集画面（B1Admin） | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| リマインダーの編集 / 設定（B1App） | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## 関連ページ

- [リアルタイムアーキテクチャ](../realtime)：アプリ内配信の段階が利用している WebSocket のプロトコルとクライアント側の基本機能（`SocketHelper`、`SubscriptionManager`、`ConversationStore`）
- [Web プッシュ通知](../web-push)：VAPID の設定と、プッシュのエスカレーション段階で使われるブラウザーの Push API の経路
- [メッセージング エンドポイント](../api/endpoints/messaging)：メッセージ、会話、つながり、通知・リマインダーのルートに関する REST API の全体
