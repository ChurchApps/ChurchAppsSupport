---
title: "メンバーシップのエンドポイント"
---

# メンバーシップのエンドポイント

<div class="article-intro">

メンバーシップモジュールは、人物、教会、グループ、世帯、役割、権限、フォーム、設定を管理します。最大のモジュールであり、他のすべてのモジュールの基盤となる ID と認可の機能を提供します。

</div>

**ベースパス:** `/membership`

## 人物

ベースパス: `/membership/people`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View または Member | 教会のすべての人物を一覧表示 |
| GET | `/:id` | JWT | People.View または本人のレコード | ID で人物を取得（フォーム送信を含む） |
| GET | `/ids?ids=` | JWT | People.View、Member、または People.ViewNames | カンマ区切りの ID で複数の人物を取得。People.View を持たない People.ViewNames の呼び出し元には基本モデルを返し、公開を停止している人物は除外（呼び出し元本人を除く） |
| GET | `/basic?ids=` | JWT | — | 複数の人物の基本情報（名前のみ）を取得 |
| GET | `/names?ids=` | JWT | 任意の教会権限 | 呼び出し元がすでに持っているカンマ区切りの ID について `[{ id, name: { display, first, last }, photo }]` を、姓、名の順で並べて返す。People.View がない役割（寄付、出席）でも人物にラベルを付けられる。検索やディレクトリのフィルタは不可 |
| POST | `/names` | JWT | 任意の教会権限 | `GET /names` と同じ。ボディ: `{ peopleIds }`（または `{ ids }`） |
| GET | `/recent` | JWT | People.View、Member、または People.ViewNames | 最近追加された人物。People.View を持たない People.ViewNames の呼び出し元（ディレクトリへのアクセス権がある会員も含む）には基本モデル（`id`、`name.display`、`photo`、`membershipStatus`）を返し、公開を停止している人物は除外 |
| GET | `/guest-register/options?churchId=` | 公開 | — | QR によるゲスト登録のチェックリスト。`{ email, phone, address, birthDate, gender, maritalStatus, grade, comments }` を返し、各値は `"off"`、`"optional"`、`"required"` のいずれか（公開設定 `guestRegistrationFields` から解析。値がない、または不正な場合は、メールと電話を任意、その他を off とする）。一致するサイトまたは教会のトークンがない限り `enableQRGuestRegistration` が必要。レート制限あり（429） |
| GET | `/search?term=&email=` | JWT | People.View、Member、または People.ViewNames | 名前またはメールで人物を検索（最大 100 件、姓、名の順）。People.View を持たない People.ViewNames の呼び出し元（ディレクトリへのアクセス権がある会員も含む）は、基本モデルを返す名前検索のみ可能。`email` による検索は `[]` を返す |
| GET | `/search/phone?number=` | JWT | People.View または Member | 電話番号で検索 |
| GET | `/search/group?groupId=` | JWT | People.View または Member | 特定のグループの人物を取得 |
| GET | `/household/:householdId` | JWT | — | 世帯のすべての人物を取得 |
| GET | `/attendance` | JWT | People.Edit | フィルタ（campusId、serviceId、serviceTimeId、groupId、categoryName、startDate、endDate）で出席者を読み込む |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | 人物とグループのタイムラインデータを読み込む |
| GET | `/directory/:id` | JWT | — | ディレクトリ表示用の人物を取得（表示設定を反映） |
| GET | `/claim/:churchId` | JWT | — | 教会において、現在のユーザー用の人物レコードを申請する |
| POST | `/` | JWT | People.Edit または EditSelf | 人物を作成または更新（一括） |
| POST | `/search` | JWT | People.View、Member、または People.ViewNames | 人物を検索（POST 版）。ボディ: `{ term }` または `{ email }`。`GET /search` と同じ名前のみのルールが適用される |
| POST | `/advancedSearch` | JWT | People.View または Member | 複数条件での検索（年齢、birthMonth、membershipStatus など）。ボディは条件の配列。空のボディは条件なしを意味し、配列以外のボディは 400 を返す |
| POST | `/loadOrCreate` | 公開 | — | メールで人物を検索、または作成する。ボディ: `{ churchId, email, firstName, lastName }` |
| POST | `/guest-register` | 公開 | — | QR によるゲスト登録。ボディ: `{ churchId, members: [{ firstName, lastName, email?, phone?, birthDate?, gender?, grade? }], address?, maritalStatus?, comments? }`（1〜10 名。email、phone、maritalStatus は最初のメンバーのみに適用）。教会が無効にした項目は破棄され、必須項目が欠けている場合や値が不正な場合は 400 を返す。まず既存の人物を再利用する。メンバーは、削除されていない人物のうち、名（大文字小文字を区別しない）が同じで、かつメールまたは電話番号の数字（自宅、勤務先、携帯）が一致する人物が 1 名だけいる場合に一致とみなす。メールも電話もないメンバーは、一致した世帯内で名のみで一致させる。一致した人物は決して編集されない。一致しなかったメンバーは、一致した世帯に加わるか、なければ新しい世帯（最初のメンバーの姓で命名）に、`membershipStatus: "Visitor"` と共有の `address` を付けて加わる。`comments` は最初のメンバーのメモとして保存し、`guestRegistrationGroupId` が設定されていれば全員を非公開のそのグループに追加する。`guestRegistrationRecordAttendance` が `"true"` の場合は、そのグループの予定された礼拝時間のうち、チェックインの受付時間が現在開いているものについて出席を記録する。`{ householdId, people: [{ id, name }] }` を返し、保存された名前ではなく送信された名前をそのまま返す。オプトイン、トークン、レート制限のルールは options の呼び出しと同じ |
| POST | `/household/:householdId` | JWT | People.Edit | 世帯メンバーの割り当てを更新 |
| POST | `/public/email` | 公開 | — | 人物にメールを送信する。ボディ: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | 内部 | — | ID で人物のメールを読み込む（サーバー間通信、jwtSecret が必要） |
| DELETE | `/:id` | JWT | People.Edit | 人物を削除 |

### 例: 人物を検索

```
GET /membership/people/search?term=John
Authorization: Bearer <token>
```

```json
[
  {
    "id": "abc-123",
    "name": { "first": "John", "last": "Smith" },
    "contactInfo": { "email": "john@example.com" },
    "membershipStatus": "Member"
  }
]
```

### 例: 人物を作成

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## ユーザー

ベースパス: `/membership/users`

ログイン、登録、パスワード管理のエンドポイントについては、[認証と権限](./authentication)を参照してください。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------------|-------------|
| POST | `/login` | 公開 | — | ログイン（メールとパスワード、JWT の更新、または authGuid） |
| POST | `/register` | 公開 | — | 新しいユーザーを登録 |
| POST | `/forgot` | 公開 | — | パスワードリセットのメールを送信 |
| POST | `/setPasswordGuid` | 公開 | — | メールのリンクにある認証 GUID を使ってパスワードを設定 |
| POST | `/verifyCredentials` | 公開 | — | メールとパスワードを検証し、関連する教会を返す |
| POST | `/loadOrCreate` | JWT | — | メールまたは userId でユーザーを検索、または作成する |
| POST | `/setDisplayName` | JWT | — | ユーザーの名と姓を更新 |
| POST | `/updateEmail` | JWT | — | ユーザーのメールアドレスを変更 |
| POST | `/updatePassword` | JWT | — | ユーザーのパスワードを変更（最低 6 文字） |
| POST | `/updateOptedOut` | JWT | — | 人物の公開停止状態を設定 |
| POST | `/sendInviteEmail` | JWT | People.Edit | この教会の人物に招待メールを送信（`email`、`personName`、`contextName`）。ボタンは、アカウントがない人には**サインアップ**、既存のユーザーには**ログイン**と表示される。一度もログインしたことがないユーザーには、代わりに 7 日で期限切れになる**パスワードを設定**リンクが届く。固定のテンプレートのため、教会の 1 日あたりのメール上限にはカウントされない |
| GET | `/search?term=` | JWT | Server.Admin | 名前やメールですべてのユーザーを検索 |
| DELETE | `/` | JWT | — | 現在のユーザーアカウントを削除 |

## 教会

ベースパス: `/membership/churches`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 現在のユーザーのすべての教会を読み込む |
| GET | `/:id` | JWT | — | ID で教会を取得 |
| GET | `/:id/getDomainAdmin` | JWT | — | 教会のドメイン管理者ユーザーを取得 |
| GET | `/:id/impersonate` | JWT | Server.Admin | 教会になりすます（サーバー管理者のみ） |
| GET | `/all?term=` | JWT | Server.Admin | すべての教会を検索（管理者） |
| GET | `/search/?name=` | 公開 | — | 名前で教会を検索 |
| GET | `/lookup/?subDomain=&id=` | 公開 | — | サブドメインまたは ID で教会を検索 |
| POST | `/` | JWT | Settings.Edit | 教会の詳細を更新 |
| POST | `/add` | JWT | — | 新しい教会を登録。必須項目: name、address1、city、state、zip、country |
| POST | `/search` | 公開 | — | 名前で教会を検索（POST 版） |
| POST | `/select` | JWT | — | 教会を選択、または切り替える。ボディ: `{ churchId }` または `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | 教会をアーカイブまたはアーカイブ解除する |
| POST | `/byIds` | 公開 | — | ID で複数の教会を読み込む |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | 7 日以上放置された教会を削除 |

## グループ

ベースパス: `/membership/groups`

標準の CRUD を拡張（基底クラスの GET `/`、GET `/:id`）。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | すべてのグループを一覧表示 |
| GET | `/:id` | JWT | — | ID でグループを取得 |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | 礼拝のフィルタでグループを検索 |
| GET | `/my` | JWT | — | 現在のユーザーのグループを取得 |
| GET | `/my/:tag` | JWT | — | 現在のユーザーのグループを、タグで絞り込んで取得 |
| GET | `/tag/:tag` | JWT | — | 特定のタグを持つすべてのグループを取得 |
| GET | `/public/:churchId/:id` | 公開 | — | 教会と ID で公開グループを取得 |
| GET | `/public/:churchId/tag/:tag` | 公開 | — | タグで公開グループを取得 |
| GET | `/public/:churchId/label?label=` | 公開 | — | ラベルで公開グループを取得 |
| GET | `/public/:churchId/slug/:slug` | 公開 | — | スラッグで公開グループを取得 |
| POST | `/` | JWT | Groups.Edit | グループを作成または更新（スラッグを自動生成） |
| DELETE | `/:id` | JWT | Groups.Edit | グループを削除（ミニストリーグループの場合は子チームも削除） |

## グループメンバー

ベースパス: `/membership/groupmembers`

標準の CRUD を拡張（基底クラスの GET `/:id`、DELETE `/:id`）。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | ID でグループメンバーを取得 |
| GET | `/` | JWT | GroupMembers.View* | グループメンバーを一覧表示。`?groupId=`、`?groupIds=`、`?personId=` で絞り込む。*ユーザーがグループに所属している場合、または自分の personId を照会する場合も許可される。また、Attendance.View または Attendance.Edit を持つユーザーには、機密ではない任意のグループの `?groupId=` も許可される（13 歳未満のメンバーも含まれる） |
| GET | `/my` | JWT | — | 現在のユーザーのグループ所属を取得 |
| GET | `/basic/:groupId` | JWT | — | グループの基本的なメンバー一覧を取得 |
| GET | `/public/leaders/:churchId/:groupId` | 公開 | — | グループのリーダーを取得（公開） |
| GET | `/public/:churchId/:groupId` | 公開 | — | グループの公開名簿を取得（最小限の項目: `personId`、`displayName`、`leader`、写真）。グループが `publicRoster` でオプトインしている場合のみ。ウェブサイトビルダーの `staffGrid` 要素で使用される |
| POST | `/` | JWT | GroupMembers.Edit | グループメンバーを追加または更新 |
| DELETE | `/:id` | JWT | GroupMembers.View | グループメンバーを削除 |

## 世帯

ベースパス: `/membership/households`

標準の CRUD コントローラー。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | すべての世帯を一覧表示 |
| GET | `/:id` | JWT | — | ID で世帯を取得 |
| POST | `/` | JWT | People.Edit | 世帯を作成または更新 |
| DELETE | `/:id` | JWT | People.Edit | 世帯を削除 |

## 役割

ベースパス: `/membership/roles`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | ID で役割を取得 |
| GET | `/church/:churchId` | JWT | Roles.View | 教会のすべての役割を取得。各役割には、それに所属する異なるユーザーの数である `memberCount` が含まれる |
| POST | `/` | JWT | Roles.Edit | 役割を作成または更新 |
| DELETE | `/:id` | JWT | Roles.Edit | 役割を削除（その権限とメンバーも削除される） |

## 役割メンバー

ベースパス: `/membership/rolemembers`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | 役割のメンバーを取得。ユーザーの詳細を含めるには `?include=users` を追加 |
| POST | `/` | JWT | Roles.Edit | 役割にメンバーを追加（メールが存在しない場合はユーザーを作成） |
| DELETE | `/:id` | JWT | Roles.View | 役割メンバーを削除 |
| DELETE | `/self/:churchId/:userId` | JWT | — | 自分を教会から削除 |

## 役割の権限

ベースパス: `/membership/rolepermissions`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | 役割の権限を取得（ID に `null` を指定すると「Everyone」役割） |
| POST | `/` | JWT | Roles.Edit | 役割の権限を作成または更新 |
| DELETE | `/:id` | JWT | Roles.Edit | 役割の権限を削除 |

## 権限

ベースパス: `/membership/permissions`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 利用可能なすべての権限の一覧を取得 |

各エントリには、`apiName`、`section`（コンテンツの種類）、`action`、そして B1Admin の役割エディターに表示される `displaySection` と `displayAction` のラベルが含まれます。最近追加されたものは、`MembershipApi` / `People` / `View Names`（**名前のみ表示**、People and Groups の下）と、`GivingApi` / `Donations` / `Enter`（**寄付を入力**、Donations の下。[寄付のバッチ](./giving.md#donation-batches)を参照）です。

## フォーム

ベースパス: `/membership/forms`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin または Forms.Edit | すべてのフォームを一覧表示（管理者はすべて、編集者は割り当てられたフォームと非メンバー向けフォームを表示） |
| GET | `/:id` | JWT | フォームへのアクセス | ID でフォームを取得 |
| GET | `/archived` | JWT | Forms.Admin または Forms.Edit | アーカイブ済みのフォームを一覧表示 |
| GET | `/group/:groupId` | JWT | グループメンバー、グループリーダー、または Forms.Admin | グループにリンクされたスタンドアロンのフォーム（`forms.groupId`）。アーカイブ済みを除き、名前順。`id`、`name`、`description`、`open`（受付期間内かどうか）を返す。メンバーは公開中のフォームのみ取得でき、リーダーとフォーム管理者は非公開のフォームも取得できる。グループページのリンク済みフォームを支える |
| GET | `/standalone/:id?churchId=` | JWT | — | スタンドアロンのフォームを取得（制限付きのフォームには認証が必要） |
| POST | `/` | JWT | Forms.Admin または Forms.Edit | フォームを作成または更新。スタンドアロンのフォームは、任意の `photoUrl`（フォームの上に表示されるヘッダー写真）と `groupId`（リンクするグループ）を受け付ける |
| DELETE | `/:id` | JWT | フォームへのアクセス | フォームを削除 |

## フォームの送信

ベースパス: `/membership/formsubmissions`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin または Forms.Edit | 送信を一覧表示。`?personId=` または `?formId=` で絞り込む |
| GET | `/my?include=questions,answers` | JWT | — | 本人のみ対象：サインインしている会員が送信した、またはその人物にリンクされたスタンドアロンのフォーム（人物用フォームは除く）を最大 50 件、新しい順に返す（`contentType` が `person`、`contentId` が本人の人物 ID のもの。例：管理者が人物を変更した後）。各項目には `form.name` が含まれる。`include` を指定すると、各フォームの質問と送信の回答を付加する。ユーザーが人物にリンクされていない場合は `401` を返す。B1 Me ページの**マイフォーム**セクションを支える |
| GET | `/group/:groupId` | JWT | グループのリーダー | グループのリーダー向けの回答。リンクされたフォームごと、および登録フォームを持つグループイベントごとに 1 件のエントリ。各エントリには `form`、`event`（`id`、`title`、`start`。イベントのエントリのみ）、`questions`、`submissions`（`answers` と `personName` を含む。匿名の場合は `null`）が含まれる |
| GET | `/:id` | JWT | Forms.Admin、Forms.Edit、または閲覧権限 | ID で送信を取得。`?include=form,questions,answers` を追加できる。フォームのリンク先グループのリーダー、およびイベント登録が属するグループのリーダーも読み取れる |
| GET | `/formId/:formId` | JWT | フォームへのアクセス（閲覧） | フォームのすべての送信を取得（フォーム、質問、回答を含む）。フォームのリンク先グループのリーダーは閲覧権限を持つ |
| POST | `/` | JWT | — | フォームの回答を送信（制限付き、非制限のフォームを処理し、メール通知を送信）。フォームに `autoCreatePerson` がある場合、メールでゲストの人物を検索、または作成し、送信にリンクする。フォームにさらに `groupId` がある場合は、その人物をグループに追加する。`followUpSubject` と `followUpBody` が設定されている場合は、送信者にテンプレート化されたフォローアップメールを送信する。呼び出し元がフォームを管理できない場合、`submittedBy` は常にサインインしている会員の人物に設定される（匿名の送信の場合は空のまま） |
| DELETE | `/:id` | JWT | Forms.Admin または Forms.Edit | 送信とその回答を削除 |

## 質問

ベースパス: `/membership/questions`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | フォームへのアクセス | フォームの質問を一覧表示。`?formId=` が必要 |
| GET | `/:id` | JWT | フォームへのアクセス | ID で質問を取得 |
| GET | `/unrestricted?formId=` | JWT | — | 非制限のフォームの質問を取得 |
| GET | `/sort/:id/up` | JWT | — | 質問を並び順で上に移動 |
| GET | `/sort/:id/down` | JWT | — | 質問を並び順で下に移動 |
| POST | `/` | JWT | フォームへのアクセス | 質問を作成または更新（並び順を自動で割り当て） |
| DELETE | `/:id?formId=` | JWT | フォームへのアクセス | 質問を削除 |

## 回答

ベースパス: `/membership/answers`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin または Forms.Edit | 回答を一覧表示。`?formSubmissionId=` で絞り込む |
| POST | `/` | JWT | Forms.Admin または Forms.Edit | 回答を作成または更新 |

## メンバーの権限

ベースパス: `/membership/memberpermissions`

特定のフォームに対するメンバーごとのアクセスを管理します。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | フォームへのアクセス | ID でメンバーの権限を取得 |
| GET | `/member/:id` | JWT | フォームへのアクセス | メンバーのすべてのフォームの権限を取得 |
| GET | `/form/:id` | JWT | フォームへのアクセス | フォームのすべてのメンバーの権限を取得 |
| GET | `/form/:id/my` | JWT | フォームへのアクセス | フォームに対する現在のユーザーの権限を取得 |
| POST | `/` | JWT | フォームへのアクセス | メンバーの権限を作成または更新 |
| DELETE | `/:id?formId=` | JWT | フォームへのアクセス | メンバーの権限を削除 |
| DELETE | `/member/:id?formId=` | JWT | フォームへのアクセス | フォームに対するメンバーのすべての権限を削除 |

## 設定

ベースパス: `/membership/settings`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | 教会のすべての設定を取得 |
| GET | `/public/:churchId` | 公開 | — | 教会の公開設定を取得 |
| POST | `/` | JWT | Settings.Edit | 設定を保存（base64 画像のアップロードに対応） |

## ドメイン

ベースパス: `/membership/domains`

標準の CRUD を拡張（基底クラスの GET `/:id`、GET `/`、DELETE `/:id`）。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | すべてのドメインを一覧表示 |
| GET | `/:id` | JWT | — | ID でドメインを取得 |
| GET | `/lookup/:domainName` | JWT | — | 名前でドメインを検索 |
| GET | `/public/lookup/:domainName` | 公開 | — | 名前による公開のドメイン検索 |
| GET | `/health/check` | 公開 | — | 未確認のドメインに対してヘルスチェックを実行 |
| POST | `/` | JWT | Settings.Edit | ドメインを作成または更新（Caddy の更新をトリガー） |
| DELETE | `/:id` | JWT | Settings.Edit | ドメインを削除 |

## ユーザーと教会

ベースパス: `/membership/userchurch`

ユーザーと教会の関連付けを管理します。

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | ユーザー ID で、ユーザーと教会のレコードを取得 |
| GET | `/personid/:personId` | JWT | — | 人物にリンクされたユーザーのメールを取得 |
| GET | `/user/:userId` | JWT | Server.Admin | ユーザーのすべての教会を読み込む |
| POST | `/` | JWT | — | ユーザーと教会の関連付けを作成 |
| PATCH | `/:userId` | JWT | — | 最終アクセス時刻を更新し、アクセスを記録 |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | ユーザーと教会のレコードを削除 |

## 表示設定

ベースパス: `/membership/visibilityPreferences`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | 現在のユーザーの表示設定を取得 |
| POST | `/` | JWT | — | 表示設定を保存（住所、電話、メールの表示） |

## クエリ

ベースパス: `/membership/query`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|------|
| POST | `/members` | JWT | — | AI を使った自然言語による会員検索。ボディ: `{ text, subDomain, siteUrl }` |

## クライアントエラー

ベースパス: `/membership/clientErrors`

| メソッド | パス | 認証 | 権限 | 説明 |
|--------|------|------|------|------|
| POST | `/` | JWT | — | クライアント側のエラーを記録 |

## 関連ページ

- [認証と権限](./authentication): ログインの流れ、JWT、OAuth、権限モデル
- [出席のエンドポイント](./attendance): 礼拝と訪問の記録
- [モジュールの構造](../module-structure): コードの構成パターン
