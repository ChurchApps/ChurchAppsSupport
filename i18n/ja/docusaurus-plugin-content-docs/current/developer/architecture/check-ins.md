---
title: "チェックイン"
---

# チェックイン

<div class="article-intro">

チェックインは、3つの入口を持つ1つのシステムです。スタッフ配置型およびセルフサービス型の受付に使うB1Checkinキオスクアプリ、B1Appの会員ポータル内のセルフチェックイン、そしてB1Adminでの管理側の出席記録です。3つすべてがAPIのコア内にある同じ出席モジュールに書き込みを行い、教室へのルーティングは完全にグループによって決まります。「ロケーション」や「部屋」という独立したエンティティはありません。その上に子どもの安全を守る仕組みが重なっており、訪問ごとのチェックイン種別、サーバー側の定員と引率者比率の制限、キオスク側の年齢・学年の対象判定、チェックアウト時の信頼できる引き取り者の確認、そして教会が利用するテキストメッセージ配信サービス経由の保護者への呼び出しが含まれます。このページでは、データモデル、チェックインの流れ、安全の仕組み、ラベル印刷の流れを説明します。

</div>

## 概要

```
┌──────────────────────────┐
│ B1Checkin (Expo kiosk)   │──┐         ┌──────────────────────────────────────────────┐
│  lookup → household →    │  │         │ Api                                          │
│  groups → complete/print │  │  HTTPS  │  ┌─ membership module ─────────────────────┐ │
├──────────────────────────┤  ├───────▶ │  │ people · households · groups            │ │
│ B1App (self check-in)    │──┤         │  └─────────────────────────────────────────┘ │
│  /mobile/checkin screen  │  │         │  ┌─ attendance module ─────────────────────┐ │
├──────────────────────────┤  │         │  │ campuses → services → serviceTimes      │ │
│ B1Admin (staff)          │──┘         │  │ groupServiceTimes  (room routing)       │ │
│  setup · reports ·       │            │  │ sessions ← visitSessions → visits       │ │
│  label designer          │            │  │ labelTemplates                          │ │
└──────────────────────────┘            │  └─────────────────────────────────────────┘ │
                                        └──────────────────────────────────────────────┘

Label print path (kiosk only):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (label templates, or bundled HTML fallback)
       └▶ LabelRenderer → HTML doc + inline SVG barcodes
            └▶ PrintUI: WebView render → ViewShot JPG capture
                 └▶ printer-helper native module → Brother QL / Zebra
```

| 画面 | リポジトリ | 技術スタック | 役割 |
|---------|------|-------|------|
| キオスク | `B1Checkin` | Expo / React Native、expo-routerによるファイルベースのルーティング。Android、Amazon Fire、iOS向けのEASビルド。`expo-updates`によるOTAアップデート | ラベル印刷と本人確認付きチェックアウトを備えた、スタッフ配置型またはセルフサービス型の受付 |
| セルフチェックイン | `B1App` | Next.js（b1.church会員ポータル） | ログイン済みの会員がスマートフォンから世帯のチェックインを行う。印刷は行わない |
| 管理画面 | `B1Admin` | React SPA | 礼拝の構成を設定し、礼拝時間にグループを割り当て、ラベルをデザインし、手動で出席を記録し、レポートを実行する |

3つの画面はすべて、`ApiHelper`を通じて同じ2つのAPIモジュールを呼び出します。**MembershipApi**（`/membership`）は人物、世帯、グループを扱い、**AttendanceApi**（`/attendance`）は以下のすべてを扱います。

## データモデル（`Api/src/modules/attendance`）

| エンティティ／テーブル | 主なフィールド | 意味 |
|----------------|-----------|---------|
| `campuses` | name, address | ここでは非推奨。キャンパスは会員モジュール（`/membership/campuses`）で管理され、出席側のコピーはレガシーの読み取り専用として固定されています（`models/Campus.ts`） |
| `services` | campusId, name | 「日曜朝」などの定期的な集まり（`models/Service.ts`） |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | 礼拝内の時間枠。例：「9:00 AM」（`models/ServiceTime.ts`）。スケジュール関連の列は任意で（マイグレーション `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`）、[チェックイン時間帯](#チェックイン時間帯)を決定します |
| `groupServiceTimes` | groupId, serviceTimeId | 結合テーブル。どのグループ（教室）がどの礼拝時間に集まるかを示します（`models/GroupServiceTime.ts`） |
| `sessions` | groupId, serviceTimeId, sessionDate | ある日付における、あるグループの1回の集まり。チェックイン時に遅延作成されます（`models/Session.ts`） |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | ある日付に、ある人物が出席した記録（`models/Visit.ts`）。`checkinType`は`member`／`guest`／`volunteer`のいずれかです（NULLは旧形式の会員）。キオスクが設定し、定員・比率の制限で使用されます |
| `visitSessions` | visitId, sessionId | 訪問がカバーするセッション。2つの礼拝時間にチェックインした子どもには2行が作成されます（`models/VisitSession.ts`） |
| `labelTemplates` | name, labelType（`nametag`／`pickup`）, width, height, isDefault, content（JSONブロック） | デザイン可能なラベルのレイアウト（`models/LabelTemplate.ts`） |

### チェックイン完了時の保存の流れ

`VisitController.postCheckin`（`Api/src/modules/attendance/controllers/VisitController.ts`）は`POST /attendance/visits/checkin?serviceId=&peopleIds=`を処理します。リクエストボディは`Visit`オブジェクトの配列で、各オブジェクトは`visitSessions`を持ちます。その中の埋め込み`session`は`(serviceTimeId, groupId)`の組のみを指定します。サーバーは次の処理を行います。

1. **書き込みの前に定員と比率を確認します。** `evaluateGates()`→`CheckinGateHelper.evaluate()`が、対象となる各部屋の定員、ゲストの定員、閉鎖フラグ、そして現在の在室人数に対する引率者比率を確認します。postCheckinはトランザクションではないため、最初の保存より前にゲートを実行する必要があります。重大な違反があれば、該当する部屋を名指しして409を返し、何も保存されません。[定員と引率者比率のゲート](#定員と引率者比率のゲート)を参照してください。
2. **セッションを遅延解決します。** `getSessionId()`が、`(groupId, serviceTimeId, today)`に対応する`sessions`の行を検索し、なければ作成します。セッションIDは日付ごとにプロセス内でキャッシュされます。新しいセッションが作成されると`session.created`のWebhookが発行されます。ループは`await`付きの`for..of`です。以前は`forEach(async …)`を火と忘れ方式で使っていたため、保存と競合し、最初のセッション作成時にsessionIdがNULLで書き込まれていました（修正済み。ループ箇所のコードコメントに記載）。
3. **その日の記録を置き換えます。** 今日その礼拝に対してこれらの人物のために既に存在する訪問は、visitSessionsとともにすべて削除され、その後送信された一式が保存されます。そのため、家族を再チェックインさせる操作は、追加ではなく「これが現在の状態である」という冪等な操作になります。代わりに`?checkDuplicates=true`を付けると、書き込みを行わずに`{ duplicates: [personId…] }`を返します。キオスクは上書きの前に警告を出すためにこれを使います。
4. **バッチごとに1つのセキュリティコードを生成します。** `SecurityCodeHelper.generate()`は、英数字`23456789BCDFGHJKLMNPQRSTVWXYZ`から4文字のコードを生成します（母音や紛らわしい文字を含まないため、コードが単語になったり読み違えられたりしません）。サーバーは同じ教会の同日の未チェックアウト訪問との衝突があれば再試行し、バッチ内のすべての訪問にそのコードを付与します。
5. **`{ streaks, securityCode }`を返します。** `streaks`は人物IDから、連続した週の出席回数へのマップです。キオスクは節目（5週ごと）を紙吹雪で祝います。

保存された訪問ごとに`attendance.recorded`のWebhookも発行されます。読み取り側の`GET /attendance/visits/checkin`は、人物の訪問を**最後に記録された日付**から返します。それが前の週であった場合、IDは取り除かれ、クライアントは先週の教室選択を事前入力したコピーを受け取ります。これは新しい記録として保存されます。

### チェックアウト

チェックアウトは2つのエンドポイントで完了します（`VisitController`）。

- `GET /attendance/visits/code/:code` — そのセキュリティコードを持つ、今日まだチェックアウトされていない訪問を、セッション情報付きで返します。
- `POST /attendance/visits/checkout` — ボディは`{ visitIds, checkedOutBy?, checkedOutById? }`です。`checkoutTime`と引き取った人を記録し、訪問ごとに`attendance.checkout`のWebhookを発行します。

権限：キオスクは`attendance.checkin`で認証します。これは、チェックイン・チェックアウト・ラベルテンプレートの操作に加え、`people.view`なしでキオスクに必要な世帯の検索（電話番号・名前による検索、チェックイン用モデルでの世帯メンバー、世帯の引き取りリスト）のみを許可します。B1Checkinの`SessionHelper.filterChurches`は、アカウントが`Attendance/Checkin`または`Attendance/Edit`を持つ教会のみを表示します。`Checkin`はもはやEveryone（ロールなし）の権限に含まれていないため（`RoleHelper`およびマイグレーション`2026-11-01_remove_everyone_checkin`）、実際のロールを通じて付与する必要があります。`attendance.view`／`attendance.edit`はレポートと手動入力を扱います。構成（礼拝、礼拝時間、グループの割り当て）には`services.edit`が必要です。会員のセルフチェックイン（B1App）には権限は不要です。リンクされた人物を持つ認証済みユーザーであれば誰でも、その教会の`GET`／`POST /attendance/visits/checkin`を呼び出せ、サーバーは送信された`personId`を呼び出し元自身の世帯に限定します（それ以外は403）。この制限があるため、他の家族の`securityCode`は読み取れません。会員であることが付与の根拠であり、会員に機能が*見える*かどうかは、教会のB1Appナビゲーションタブで制御されます。その他のチェックイン用エンドポイント（`code/:code`、`checkout`、`guardians`、`CheckinController`）は、引き続きキオスクおよびスタッフ専用です。

## グループによる教室ルーティング

システム内には、部屋や教室のエンティティは存在しません。「部屋」とは、`trackAttendance`が有効な会員**グループ**であり、`groupServiceTimes`を通じて1つ以上の礼拝時間にリンクされたものです。キオスクの動作を決めるグループのフィールド（`Api/src/modules/membership/models/Group.ts`）は次のとおりです。

| フィールド | 効果 |
|------|--------|
| `trackAttendance` | グループが出席に参加するかどうか。B1Adminの構成ツリーでは、`groupServiceTimes`の行がない`trackAttendance`グループに未割り当ての印が付きます |
| `parentPickup` | 子どもの部屋であることを示します。このグループにチェックインすると、その訪問は「子ども」の訪問となり、家族の引き取りラベルが印刷され、ネームタグにセキュリティコードが記載されます |
| `printNametag` | このグループへのチェックインでネームタグを印刷するかどうか |
| `capacity`／`guestCapacity`／`checkinClosed` | 部屋の定員上限と、即時に「閉鎖」するスイッチ。サーバー側でチェックインゲートが適用されます（B1Adminのグループ設定の「Check-In Capacity」で編集） |
| `volunteerRatio`／`minVolunteers` | 子どもと引率者の比率、および引率者の最低人数。教会全体の`ratioEnforcement`設定に従って適用されます |
| `minAgeMonths`／`maxAgeMonths`／`minGrade`／`maxGrade` | 年齢・学年の対象範囲。キオスク側で評価され、部屋を強調表示または減光します |

すべてのクライアントは同じように非正規化を行います（例：`B1Checkin/app/services.tsx`、`B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`）。`GET /attendance/servicetimes?serviceId=`、`GET /attendance/groupservicetimes`、`GET /membership/groups`を並列に読み込み、各礼拝時間について、`groupServiceTimes`の行がその礼拝時間を指しているグループを集めて`serviceTime.groups`に格納します。この配列が部屋の選択画面に表示され、グループの`categoryName`ごとに整理されます。

割り当ては、B1Adminのグループページ（`B1Admin/src/groups/components/ServiceTimesEdit.tsx`。`POST`／`DELETE /attendance/groupservicetimes`）から編集します。キャンパス → 礼拝 → 礼拝時間 → グループの全体の階層は、`B1Admin/src/attendance/components/AttendanceSetup.tsx`で`GET /attendance/attendancerecords/tree`を使って可視化されます。

:::info
グループがシステムの唯一の情報源であるため、同じグループの所属関係が、キオスクのルーティング、B1Adminのグループページでの名簿形式の出席、出席レポートを支えています。礼拝時間にグループを割り当てることが、チェックインの行き先にするために必要な唯一の手順です。
:::

## 子どもの安全

### チェックインの種別

すべての訪問は`checkinType`を持ちます。`member`、`guest`、`volunteer`のいずれかです（NULLは旧形式／会員を意味します。マイグレーション`tools/migrations/attendance/2026-07-03_checkin_type.ts`）。種別は**キオスク側で**選択されます。展開された会員の行にある「Member／Guest／Volunteer」のチップで選ぶ方式です（`B1Checkin/src/components/MemberServiceTimes.tsx`）。完了時に各保留中の訪問に設定され（`app/checkinComplete.tsx`、既定値は`member`）、サーバーがゲートでこれを使用します。引率者は定員ではなく比率のカバーとして数えられ、ゲストは`guestCapacity`に対して数えられます。

### 定員と引率者比率のゲート

`CheckinGateHelper.evaluate()`（`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`）は、保存の前に`postCheckin`の内部で実行されます（このエンドポイントはトランザクションではないため、保存前にゲートをかけることが正しさを保証する仕組みです）。対象となる各グループについて、現在の在室人数（`VisitRepo.countActiveByGroupToday`）と、会員モジュールのゲートウェイを通じたグループ設定を読み込み、その後違反を分類します。

- **重大（常にブロック）：** `checkinClosed`、`現在人数 + 追加人数 > capacity`、ゲート人数が`guestCapacity`を超える場合。バッチは`409 { error: "capacity", groups: [{ groupId, groupName, reason }] }`で拒否され、キオスクは該当する部屋を表示します。
- **比率（警告またはブロック）：** 引率者ではない追加者が、`volunteers < minVolunteers`の部屋に入る場合、引率者が1人もいない場合、または`children > volunteers × volunteerRatio`の場合。重大度は教会ごとの`ratioEnforcement`設定に従います（既定値は`"warn"`、もう一方は`"block"`。B1Adminの「Manage Church → Check-In」、`CheckinSettingsEdit.tsx`で編集）。警告モードでは、クライアントが`acknowledgeWarnings=true`を付けて再送しない限り`409 { warning: true, error: "ratio", … }`を返します。この再送がキオスクのスタッフ確認による上書きです。

### チェックイン時間帯

礼拝時間には、任意の週単位のスケジュールを設定できます（`dayOfWeek`は0〜6、0は日曜日。`startTime`／`endTime`は`HH:mm`形式、`checkinOpenMinutes`、`checkinCloseMinutes`）。これはB1Adminの**Attendance → Setup**の礼拝時間フォーム（`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`、「Check-in Schedule」）で編集します。`CheckinGateHelper.hasSchedule()`は、`dayOfWeek`と`startTime`の両方が設定されている場合にのみ、礼拝時間をスケジュールありとみなします。スケジュールのない時間は時間によるゲートをかけられることはありません。`isServiceTimeOpen()`は、現地の壁時計時間（`DateHelper.toChurchTime`）で時間帯を計算します。タイムゾーンは`CheckinTimeZoneHelper.load()`（`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`）によって礼拝時間ごとに決定されます。まず、礼拝のキャンパス（`service.campusId`、`MembershipModuleGateway.loadCampusTimeZones`経由）の`timezone`が使われます。次に教会の`timeZone`（B1Adminの「Church Information」で設定）、次に`timezone`を持つ最初の削除されていないキャンパス（`loadCampusTimeZone`）、最後に`America/New_York`です。多くの教会では`America/New_York`が教会のタイムゾーンとして一括設定されていたため、キャンパスを優先しています。以下の一覧表示と投稿の両方のパスでも、同じ順序で解決されます。時間帯は、開始時刻の`checkinOpenMinutes`前から、終了時刻の`checkinCloseMinutes`後まで（終了時刻がない場合は開始時刻後）です。日付や週をまたぐ時間帯も扱います。

時間帯は2か所で適用されます。

- **一覧表示：** `GET /attendance/servicetimes`は、各行に計算済みの`checkinOpen`の真偽値を付与します。B1Appのセルフチェックイン（`CheckinPage.tsx`）およびB1Checkinのサービス選択（`app/services.tsx`）は、すべての時間を表示します。ある礼拝のすべての時間が閉じている場合は、直近で開く時間を表示します（B1Appでは「Check-in opens Sun 9:30 AM.」、B1Checkinでは「Check-in for this service opens Sun 9:30 AM.」。`CheckinHelper.opensLabel`／`ServiceTimeHelper.getOpensLabel`による）。開始時刻を算出できない場合は「Check-in isn't open for this service right now.」にフォールバックします（キオスクには別の礼拝を選べるよう「戻る」ボタンがあります）。それ以外では、閉じている時間は選択できない「Closed」／「Closed · opens 9:30 AM」の行として表示されます。B1Checkinの世帯画面（`MemberServiceTimes.tsx`）は、`ServiceTimeHelper.isCheckinOpen()`を使って、機器の時計で（教会のタイムゾーンではなく端末のタイムゾーンで）開閉状態を随時再評価します。そのため、起動したままのキオスクも正確な時刻に開閉します。また、本人がすでにチェックインしている閉じた時間には「Kids Room 1 · Checked in」（グループ名）と表示されます。
- **投稿：** `evaluateGates()`の内部、定員・比率の評価の前に、`findClosedServiceTimeGroups()`が、対象となるセッションのいずれかの礼拝時間が時間帯の外にある場合、`409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }`でバッチを拒否します。チェックインのたびに世帯の今日の既存の訪問が再投稿されるため、本人がすでに保持しているセッション（既存の訪問にある`personId|sessionId`）はこのゲートを免除されます。そのため、先に閉じた時間帯があったからといって、後から開く礼拝時間の追加が拒否されることはありません。B1Checkinはこれを、「check-in isn't open right now」という理由とともにハードゲート画面に表示します（定員違反の場合は引き続き「room is full or closed」と表示されます）。

### 年齢・学年の対象判定（キオスク側）

部屋の対象判定は助言的なUIであり、キオスク上で評価されます。サーバーによる強制ではありません。`B1Checkin/src/helpers/EligibilityHelper.ts`は、人物の生年月日と学年を、グループの`minAgeMonths`／`maxAgeMonths`／`minGrade`／`maxGrade`と比較し（学年の順序：PreK、K、1〜12、Graduated）、`eligible`／`ineligible`／`unknown`を返します。データが欠けている場合は`unknown`となり、部屋が非表示になることはありません。年齢と学年は、教会の**学年進級日**（`gradePromotionDate`設定、`"MM-DD"`形式。`B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`で編集）時点で計算されます。キオスクは`GET /attendance/checkin/settings`からこれを取得し、`resolveAsOfDate`が今日以前で直近の発生日を選びます。部屋の選択画面は、対象となる部屋を強調表示し、対象外の部屋を減光します。減光された部屋を選ぶにはスタッフの確認が必要です。

### 信頼できる引き取り者と引き渡し不可の人物

引き取り者は会員モジュールのエンティティで、世帯ごとに管理されます（`householdPickupPeople`、`Api/src/modules/membership/models/HouseholdPickupPerson.ts`。householdId、任意のpersonId、name、photoUrl、relationship、`status`（`trusted`／`notAuthorized`）、notes）。CRUDは、認証済みの教会ユーザーであれば誰でも読めるように`GET /membership/householdpickup/:householdId`で提供され（キオスクが読み取れるようにするため）、`POST`／`DELETE`は`people.edit`で制御されます。スタッフは人物ページの**Pickup**カードでリストを管理します（`B1Admin/src/people/components/PickupPeople.tsx`）。写真、続柄、そして「Trusted／Not Authorized」のステータスチップが表示されます。

チェックアウト時（`B1Checkin/app/checkout.tsx`）、キオスクは世帯の引き取りリストを読み込みます。`trusted`のエントリは、世帯の大人の写真グリッドと並んで、タップ可能な引き取りカードとして表示されます。自由入力された「Other」の名前は、`notAuthorized`のエントリに対してあいまい一致（レーベンシュタイン距離、`src/helpers/PickupMatchHelper.ts`）されます。一致すると、警告シートでチェックアウトがブロックされ、スタッフの**Override**ボタンが表示されます。上書きは訪問そのものに記録されます。通常の`POST /attendance/visits/checkout`を通じて`checkedOutBy`を`"OVERRIDE: {name}"`として送信するため、別の監査テーブルではなく、出席記録と`attendance.checkout`のWebhookに残ります。

### 保護者への呼び出しと緊急一斉連絡

`CheckinController`（`Api/src/modules/attendance/controllers/CheckinController.ts`、`/attendance/checkin`）は、2つのSMSエンドポイントを公開しています。

- `POST /page`：`{ visitId, message }`。チェックインした1人の子どもの保護者に呼び出しを送ります（キオスクのチェックアウト画面、有人モード）。
- `POST /broadcast`：`{ serviceId, message }`。ある礼拝にチェックインしたすべての世帯の大人にテキストを送ります（キオスクの管理設定。`B1Checkin/app/adminSettings.tsx`にある、種別`EMERGENCY`の入力で確認するシートの背後にあります）。

どちらも会員ゲートウェイを通じて世帯の大人を解決し、その後配信を**`MessagingModuleGateway.sendBulkText`**（`Api/src/shared/modules/MessagingModuleGateway.ts`）に渡します。これは、教会が設定したテキスト配信サービス（`@churchapps/texting`：TextInChurch、Clearstream、MutualMinistry。組み込みのSMS送信機能はありません）への、モジュール間の入口です。ゲートウェイは`sentText`の行と受信者ごとの`deliveryLog`エントリを記録し、1バッチあたり500人を上限とします。配信サービスが設定されていない場合は`no_provider`を返し、キオスクは「No SMS provider configured」と表示します。コントローラーの`dispatch()`は電話番号の重複を除き、携帯番号がない人物や`optedOut`が設定されている人物をスキップします。そして`{ sent, failed, skippedOptedOut, skippedNoPhone }`を返し、キオスクがスキップされた内容を表示できるようにします。

## キオスク（B1Checkin）

画面は`B1Checkin/app/`配下のexpo-routerファイルです。画面をまたぐ状態は、React stateではなく、静的な`CachedData`クラス（`src/helpers/CachedData.ts`）に保持されます。

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **検索**（`app/lookup.tsx`）：電話番号（`GET /membership/people/search/phone?number=`。下4桁または全桁）または名前（`GET /membership/people/search?term=`）で検索します。一致する人物を選ぶと、世帯（`GET /membership/people/household/{householdId}`）と既存の訪問（`GET /attendance/visits/checkin`）を読み込み、先週の選択を`pendingVisits`に設定します。
2. **世帯の確認**（`app/household.tsx`、`src/components/MemberList.tsx`）：各メンバーの行には、チェックイン済みのバッジ、アレルギーや`nametagNotes`のバッジ、現在の部屋のチップが表示されます。メンバーを展開すると、すべての礼拝時間が、部屋のボタンおよびMember／Guest／Volunteerのチェックイン種別チップとともに一覧表示されます（`MemberServiceTimes.tsx`）。各礼拝時間の名前の下には、`ServiceTimeHelper.getGroupSummary()`がそこで提供されているグループを表示します（`serviceTime.groups`の名前を、前後の空白を除き、大文字小文字を区別せずに重複を除いて、カンマ区切りにしたもの）。その時間にグループがない場合は、何も表示されません。
3. **グループの割り当て**（`app/selectGroup.tsx`）：`serviceTime.groups`から構築されたカテゴリのツリーで、年齢・学年の対象となる部屋は強調表示され、対象外の部屋は、スタッフの確認の背後で減光されます（[年齢・学年の対象判定](#年齢学年の対象判定キオスク側)を参照）。部屋を選ぶと、その人物の保留中の訪問に`{ session: { serviceTimeId, groupId } }`のvisitSessionが書き込まれます（`src/helpers/VisitSessionHelper.ts`）。「None」を選ぶとクリアされます。
4. **完了**（`app/checkinComplete.tsx`）：`pendingVisits`（それぞれに`checkinType`が設定されている）とともに`POST /attendance/visits/checkin`を送信します。その後、プリンターが設定されていればラベルを印刷し、自動的に検索画面に戻ります。`409`の定員または`notOpen`の応答は、理由（満員・閉鎖、またはチェックインが開いていない）とともに該当する部屋を表示します。比率の警告があると、スタッフの確認を求め、`acknowledgeWarnings=true`を付けて再送します。

**チェックアウト**画面（`app/checkout.tsx`）は、自動フォーカスされた入力欄で4文字のセキュリティコードを受け付けます。これにより、USBまたはBluetoothのキーボード型バーコードスキャナーがカメラなしで使えます。また、同じ英数字を使った画面上のキーパッドも使え、4文字になると自動送信されます。**スキャン**ボタンを押すと、共有の`src/components/CodeScanner.tsx`カメラ（既定は背面カメラ。QR、Code 128、Code 39に対応）のシートが開きます。そのため、ウェッジ型スキャナーがない受付でも引き取りラベルを読み取れます。スキャンされたコードは、入力されたものと同じ`handleCode()`の経路に渡されます。コードを検索し、引き取られる子どもを表示し、世帯の**信頼できる引き取り者**をタップ可能なカードとして、世帯の大人の写真グリッドと並べて提示します（自由入力の「Other」オプションもあり、これは引き渡し不可の名前に対してあいまい一致で確認されます。[信頼できる引き取り者と引き渡し不可の人物](#信頼できる引き取り者と引き渡し不可の人物)を参照）。その後、選ばれた人物の名前・IDとともに`POST /attendance/visits/checkout`を送信します。有人モードでは、この画面は**保護者を呼び出す**（`POST /attendance/checkin/page`）と**セキュリティラベルの再印刷**も提供します。`reprint()`は`LabelHelper.getAllLabelsFor(...)`で家族のラベルを作り直し、チェックインと同じ`PrintUI`の流れに渡します。

受付の性格は、AsyncStorageのフラグ`@StationMode`（`"self"`または`"manned"`。`app/adminSettings.tsx`で切り替え）で決まります。有人モードでは、検索画面にチェックアウトの入口が加わり、世帯画面から人物ごとのプロフィール編集（`POST /membership/people`）も行えます。キオスクの保護機能も組み込まれています。任意のPIN（`app/setPin.tsx`、`src/components/PinEntryModal.tsx`）で管理画面とプリンター画面を保護でき、管理画面はヘッダーのロゴを7回連続でタップした場合にのみ開きます。また、アイドル時のアトラクション画面（`src/hooks/useInactivityTimer.ts`）が、家族と家族の間に表示されます。

## セルフチェックイン（B1App）

会員は、b1.churchポータルの`/mobile/checkin`画面からチェックインします（`B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx`から`screens/CheckinPage.tsx`へ振り分けられます）。ログイン済みのユーザーが必要で、キオスクと同じ4つの手順（礼拝 → 世帯 → グループ → 完了）を、同じエンドポイントに対して進みます。状態は`B1App/src/helpers/CheckinHelper.ts`で保持されます。キオスクとの違いは次のとおりです。世帯はログイン済みユーザー自身の`householdId`から取得され（検索の手順はありません）、ラベル印刷はありません。代わりに完了画面に、そのバッチのセキュリティコードがQR（`qrcode.react`）として表示され、「受付でこれを提示してください」という案内が表示されます。ページ読み込み時に世帯がすでにチェックイン済みであれば、「Show check-in code」ボタンが、最初の既存の訪問（`GET /attendance/visits/checkin`から、`securityCode`を持つもの）のQRを再表示します。チェックインは送信時に即座に記録されます（保留状態はありません）。QRはキオスクでのラベル印刷にのみ使われます。

**スマートフォンからキオスクへのラベル印刷**（`B1Checkin/app/scan.tsx`。検索画面のQR「Scan code」ボタンから遷移します）：キオスクは`CodeScanner`（`expo-camera`の`CameraView`。既定は前面カメラで、切り替え可能）を表示し、QRコードを読み取ります。`ScanCodeHelper.parse()`は、セキュリティコードの英数字に含まれる4文字のみのペイロードを受け付け、`ScanCodeHelper.isRepeat()`は同じコードを4秒間無視します。そのため、B1AppのQRも、印刷されたラベルのQRブロックも使えます。その後、画面はチェックアウト時の再印刷の流れに従います。`GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI`で、検索画面に戻ります。スキャン時に出席の書き込みは行われず、ラベルのみが対象です。有効な訪問がないコード、プリンターがない受付、ラベルのないグループは、いずれもトーストで通知し、検索画面に戻ります。

型と`ApiHelper`／`ArrayHelper`は`@churchapps/helpers`と`@churchapps/apphelper`から提供されます。B1Adminとの間で共有されるReactコンポーネントはありません。

## 管理側の出席（B1Admin）

- **構成**：`/attendance`（`B1Admin/src/attendance/AttendancePage.tsx`）は構造のツリーを表示し、礼拝（`ServiceEdit.tsx`）と礼拝時間（`ServiceTimeEdit.tsx`）を作成します。キャンパスのデータは、`useCampuses()`フックを通じて会員から取得されます。
- **手動の出席記録**は、出席セクションではなくグループ側にあります。`B1Admin/src/groups/components/GroupSessionsTab.tsx`がセッションを作成し（`POST /attendance/sessions`。追加時、`SessionEdit.tsx`は、選ばれた礼拝時間を共有する他のグループごとに1つのセッションを含めることができます。その日付にすでにセッションがあるグループはスキップされます）、`POST /attendance/visitsessions/log`を通じて人物を出席として記録します。これは、その人物とセッションに対する訪問を検索し、なければ作成します。グループのリーダーは、`attendance.edit`権限がなくても自分のグループの出席を記録できます。コントローラーが`au.leaderGroupIds`を確認するためです。
- **レポート**：出席の推移とグループの出席は、サーバー側で定義されたレポートです（ReportingAPIに対する`B1Admin/src/components/reporting/ReportWithFilter.tsx`。定義は`Api/reports/*.json`）。どちらも`startDate`／`endDate`（終了日を含む）を取ります。推移レポートの既定は1年前から今日までで、週ごとの`sessionDates`列が加わります。グループの出席の画面上のツリーには、各訪問の`checkinTime`と、その人物の`membershipStatus`が含まれます。グループの出席のCSVは、関連する`groupAttendanceDownload`レポートから得られ、`GroupAttendanceDownloadHelper`によって、グループのメンバーごとに1行、日付のあるセッションごとに出席・欠席の列を持つ形に組み替えられます。人物ごとの履歴は`GET /attendance/attendancerecords?personId=`で取得します（`B1Admin/src/people/components/PersonAttendance.tsx`）。

## ラベル印刷

### テンプレートとデザイナー

教会はB1Adminの`/mobile/checkin/labels`（`B1Admin/src/attendance/LabelsPage.tsx`と`components/LabelEditor.tsx`。チェックインの設定ページから開きます）で、独自のラベルをデザインします。テンプレートは`labelTemplates`の行で、その`content`はブロックのJSON配列です。ブロックは`text`、`field`、`barcode`、`qrcode`、`box`のいずれかで、パーセント座標で配置され、フォント、配置、記号体系（`code39`／`code128`／`qr`）、任意の表示条件（例：`person.nametagNotes`が空でない場合にのみアレルギーの枠を表示）を持ちます。`labelType`は2種類あります。`nametag`（チェックインした人物ごとに1枚。`person.displayName`、`sessions`、`securityCode`、`person.isBirthdayWeek`などのフィールド。`person.isBirthdayWeek`は、誕生日の月と日が今日から3日以内にある場合に`"true"`となり、年末をまたぐ場合も含みます。`LabelHelper.isBirthdayWithin()`で計算）と、`pickup`（世帯ごとに1枚。`children`、`childrenAllergies`などのフィールド）です。サーバーは、教会ごとに種別ごとの既定値を1つだけ許可します（`LabelTemplateController.save`）。デザイナーには、キオスクに同梱されたラベルを模したスターターテンプレートが含まれ、サンプルデータでプレビューできます。

### キオスクでのレンダリングと印刷

チェックインが完了すると、`B1Checkin/src/helpers/LabelHelper.ts`が、各保留中の訪問のグループの設定から、印刷する内容を決定します。`printNametag`のグループにはネームタグを、いずれかの訪問が`parentPickup`のグループに入った場合は家族の引き取りラベルを1枚印刷します。`checkinType`が`volunteer`の訪問は`LabelHelper.selectChildVisits()`によってスキップされるため、Parent Pickupの部屋にいる保育スタッフが引き取りラベルを発生させることはありません。チェックイン応答のセキュリティコードは、子どものネームタグと引き取りラベルに記載されます。大人のネームタグにはコードは記載されません。教会にテンプレートがあれば、`LabelRenderer`（`src/helpers/LabelRenderer.ts`）がブロックとフィールドのコンテキストから、独立したHTML文書を生成します。テンプレートがなければ、`B1Checkin/assets/labels/`に同梱されたHTMLラベルが、プレースホルダーの置換とともに使われます。

バーコードは、純粋なTypeScriptのエンコーダーにより、インラインSVGとして生成されます（`B1Checkin/src/helpers/barcode.ts`。Code 39のパターン表、Code 128のコードセットB（mod-103チェックサム付き）の幅の表、そして`qrcode`パッケージによるQR）。**これらのエンコーダーは、B1Adminにも意図的に重複して実装されています**（`LabelEditor.tsx`が同じ表をインラインで持っており、コードコメントに記載されています）。これは、デザイナーのプレビューがキオスクの出力とピクセル単位で一致するようにするためです。一方を変更した場合は、もう一方にも反映する必要があります。

印刷の流れ（`src/components/PrintUI.tsx`）は、各HTMLラベルを`WebView`でレンダリングし、`react-native-view-shot`でJPGとして取り込み、その画像のURIをネイティブの**printer-helper**のExpoモジュール（`B1Checkin/modules/printer-helper/`）に渡します。このモジュールは`scan()`、`checkInit()`、`printUris()`、およびステータスイベントを公開しており、両プラットフォームでブランドごとのプロバイダーを持ちます。

| ブランド | Android | iOS | 備考 |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt`（Brother print SDK） | `BrotherProvider.swift`（`BRLMPrinterKit.xcframework`） | QLシリーズのネットワークプリンター（QL-800/810W/820NWB/1100/1110NWB…）、型抜きの29×90ラベル。推奨の既定値 |
| Zebra | `ZebraProvider.kt`（Link-OS SDK） | `ZebraProvider.swift` + `ZebraBridge` | ネットワーク検出とTCP／ZPLによる画像印刷 |

プリンターの選択は`app/printers.tsx`で行います（ネットワークスキャンは`brand~model~ip`形式のエントリを返し、選択内容はAsyncStorageに保存されます）。`src/helpers/PrinterLog.ts`は端末上の診断ログを保持し、キオスクのヘッダーのライブステータスドットから確認できます。

## ゲストの登録

チェックインの途中で人物を作成する経路は2つあります。

- **キオスクで**：世帯画面の「Add guest」は`B1Checkin/app/addGuest.tsx`を開きます。これはまず`GET /membership/people/search?term=`で既存の非会員の一致を検索し、なければ`POST /membership/people`で作成して、現在の世帯に紐づけます。その後ゲストは、会員と同じようにグループの割り当てを通ります。
- **QRによるセルフサービス**：教会の設定`enableQRGuestRegistration`が有効な場合（B1Adminのチェックイン設定で構成。`GET /membership/settings/public/{churchId}`から読み込まれます）、キオスクの検索画面には、`https://{subdomain}.b1.church/guest-register?serviceId=`へのリンクを含むQRコードが表示されます。そのB1Appのページ（`src/app/[sdSlug]/(public)/guest-register/page.tsx`）では、訪問中の家族が自分のスマートフォンで自分自身を登録でき、匿名の`POST /membership/people/guest-register`エンドポイントを通じて行います。これにより、キオスクの行列が止まりません。QRのシートには**Register here**ボタンもあり、キオスク上（`app/guestRegister.tsx`）で同じページを、シークレットモードでキャッシュを無効にした`WebView`で開きます。`src/helpers/GuestRegisterHelper.ts`は、QRとWebViewの両方のURLを組み立て、`https://{subdomain}.b1.church/guest-register`以外への移動をブロックします。画面は、**Done**、戻る、または120秒間の無操作（フォームへの入力はWebViewからアクティビティとして通知されます）で検索画面に戻り、WebViewをアンマウントするため、ある家族の入力が次の家族に渡ることはありません。

QRによる登録は、B1Adminの**QR Guest Registration**カード（`src/mobile/CheckInPage.tsx`）で保存された教会の設定によって動作します。

| 設定 | 公開範囲 | 目的 |
|---|---|---|
| `enableQRGuestRegistration` | 公開 | キオスクのQRおよび匿名エンドポイントのオプトインスイッチ |
| `guestRegistrationFields` | 公開 | `email`、`phone`、`address`、`birthDate`、`gender`、`maritalStatus`、`grade`、`comments`を`"off"`／`"optional"`／`"required"`に対応付けるJSONマップ。既定値：メールと電話は任意、その他はオフ。姓名は常に必須 |
| `guestRegistrationImage` | 公開 | ヘッダー写真のURL。B1Appはフォームと確認画面で、アイコンの代わりにこれを16:9で表示します |
| `guestRegistrationGroupId` | 非公開 | すべての登録が追加されるグループ（ゲストはこれを見ることも選ぶこともできません） |
| `guestRegistrationRecordAttendance` | 非公開 | `"true"`の場合、そのグループの出席も記録します |

B1Appの`src/components/checkin/GuestRegister.tsx`は、匿名の`GET /membership/people/guest-register/options?churchId=`からチェックリストを取得し、含まれるフィールドのみを表示して（主たる連絡先にはメール、電話、婚姻状況、住所。メンバーごとに生年月日、性別、学年。コメント欄は1つ）、表示されたものだけを送信します。サーバーは`PersonHelper.registerGuestHousehold()`の前に、`GuestRegistrationHelper.sanitize()`でチェックリストを再度適用します。オフのフィールドは破棄され、必須のフィールドが欠けている場合や一覧にない値は400となります。`PersonRepo.findGuestMatch()`は、メールまたは電話を持つメンバーごとに呼び出されます。同じ名、かつ同じメールまたは電話の数字が一致する生存中の人物がちょうど1人いれば、その人物が再利用されます（一致が0人または複数の場合は新しい人物が作成されるため、推測は行いません）。連絡先のないメンバーは、一致した世帯の中で名によって照合されます。再利用された人物は決して編集されないため、匿名のフォームが保存された詳細を上書きすることはできません。レスポンスは送信された名を返します。一致しなかったメンバーは、一致した世帯または新しい世帯に、`membershipStatus: "Visitor"`として加わります。新しい人物ごとに`person.created`が発行されます。その後、失敗はレスポンスとしてではなくログに記録されます。メンバーは設定されたグループに追加されます（`group.member.added`）。出席の記録が有効な場合、`AttendanceModuleGateway.recordAttendance()`は、そのグループの礼拝時間のうち、スケジュールがあり、チェックインの時間帯（`CheckinGateHelper.isServiceTimeOpen`）が今開いているものすべてについて、各メンバーを出席としてマークします。必要に応じて教会のローカルな今日の日付でセッションを作成します。スケジュールのない礼拝時間や時間帯外の登録は、何も記録しません。コメントは世帯主に対する非表示の人物ノートの会話になり（メッセージの作成者は「Guest sign-up」）、`person.conversationId`を通じてリンクされます。

## 関連ページ

- [出席のエンドポイント](../api/endpoints/attendance) -- キャンパス、礼拝、セッション、訪問、訪問セッションのための完全なREST API
- [会員のエンドポイント](../api/endpoints/membership) -- 人物、世帯、グループ
- [Webhook](../api/webhooks) -- `session.created`、`attendance.recorded`、`attendance.checkout`のイベント
- [モジュールの構成](../api/module-structure) -- 出席モジュールがサーバー側でどのように構成されているか
