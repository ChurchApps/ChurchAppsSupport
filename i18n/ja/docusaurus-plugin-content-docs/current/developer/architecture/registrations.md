---
title: "イベント登録"
---

# イベント登録

<div class="article-intro">

ネイティブのイベント登録機能はコンテンツモジュールに含まれ、有料登録の対応以降、完全な決済モデルを備えています。価格設定された参加者タイプ、価格設定された追加オプション、割引コード、教会の既存の献金ゲートウェイを通じた支払い、そしてステータスに基づくキャンセル待ち機能があります。支払い処理は献金の仕組みを意図的に再利用しています。登録コントローラーは、[献金](./giving)で説明されている `GatewayService` / `IGatewayProvider` の抽象化を通じて課金するため、コンテンツモジュールにはカード情報やゲートウェイSDKの知識が一切含まれません。このページでは、データモデル、価格設定と定員のルール、そして登録・支払い・キャンセル待ちの流れを整理します。

</div>

## 概要

```
┌──────────────────────────────┐            ┌─────────────────────────────────────────────┐
│ B1App (member portal)        │            │ Api — content module                        │
│  registration wizard ·       │   HTTPS    │  RegistrationController                     │
│  My Registrations            │ ─────────▶ │   /content/registrations                    │
├──────────────────────────────┤            │  RegistrationPricingHelper (server pricing) │
│ B1Admin (staff)              │            │  RegistrationHelper (emails)                │
│  event registration settings │            └───────────────┬─────────────────────────────┘
│  · roster · CSV export       │                            │ processCharge
└──────────────────────────────┘                            ▼
                                            ┌─────────────────────────────────────────────┐
                                            │ shared gateway abstraction (giving)         │
                                            │  GatewayService → IGatewayProvider          │
                                            │  Stripe · PayPal · Kingdom Funding          │
                                            └─────────────────────────────────────────────┘
```

スタック全体で、次の3つのルールが守られています。

1. **価格はサーバーが決定します。** クライアントは、タイプID、オプションID、数量を送信します。`RegistrationPricingHelper.computeTotal()` が合計金額をサーバー側で計算し、クーポンは課金時に再検証されます。クライアントから送られた金額は決して信頼されません。
2. **定員は挿入時にアトミックに強制されます。** 定員のある挿入はすべて `INSERT … SELECT … FROM dual WHERE (有効な行数) < 定員` という文を使用するため、同時に行われた2件の登録が最後の1枠を両方とも取ることはできません。件数は保存されず、ステータス（`pending`/`confirmed`）から導出されます。
3. **支払いは献金の仕組みを利用します。** `RegistrationController` は、教会に設定されたゲートウェイを使って共有の `GatewayService.processCharge` を呼び出します。これは寄付と同じプロバイダー抽象化、トークン化の仕組み、SCA への対応を用いています。

## データモデル（`Api/src/modules/content`）

モデルは `models/Registration.ts` にあり、テーブルのマッピングは `db/DatabaseTypes.ts` にあります。`repositories/` 配下にテーブルごとに1つのリポジトリがあります。

| テーブル | 意味 | 主なフィールド |
|-------|---------|-----------|
| `registrations` | 1件の登録（1つのイベントに対する1つの世帯／グループ） | eventId, personId, householdId, **status**（`pending` / `confirmed` / `waitlisted` / `cancelled`）, totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | 登録に含まれる1人の参加者 | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | イベントごとの参加者タイプ（例：大人／子ども） | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | 価格付きの名前付き追加オプション（例：Tシャツ） | eventId, name, description, **price**, **capacity**, **maxQuantity**（登録ごとの上限）, sort, active |
| `registrationSelectionChoices` | 登録者または参加者が選んだオプションの数量 | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | 登録に対する1回の成功した課金 | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind（`charge`）, status（`succeeded`）, personId |
| `registrationCoupons` | イベントごとの割引コード | eventId, code, **discountType**（`percent` / `amount`）, **value**, startDate, endDate, **minMembers**, **maxUses**, active |

補足事項：

- **キャンセル待ち専用のテーブルはありません。** キャンセル待ちの組は `status = 'waitlisted'` の `registrations` 行として保存されます。キャンセル待ちの全体的なライフサイクルは、この1つのテーブル上のステータス遷移によって管理されます。
- **件数を保存する列はありません。** 「販売済み」や「使用済み」の件数（イベント定員、タイプごとの定員、オプションごとの定員、クーポンの使用回数）は、ステータスが `('pending','confirmed')` に含まれる行に対する相関サブクエリで計算されます（`RegistrationTypeRepo.loadActiveWithUsage`、`RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`）。そのため、登録をキャンセルすると、帳簿処理なしで定員が解放されます。
- 価格はMySQLのDECIMAL列です（通信上は文字列）。価格計算ヘルパー内で `Number()` によって数値に変換されます。

## REST API

すべてのエンドポイントは `/content/registrations` 配下にあり（`controllers/RegistrationController.ts`）、`Permissions.registrations`（`view` / `edit`）によって制御されています。

| ルート | アクセス | 目的 |
|-------|--------|---------|
| `POST /register` | 匿名 | 申込全体の送信：ゲスト、メンバー、またはスタッフによる参加者追加。サーバー側の価格計算、定員チェック、任意の課金 |
| `GET /types/event/:eventId`、`GET /selections/event/:eventId` | 公開 | ウィザード用に、算出済みの `used` / `remainingCapacity` を含むタイプやオプションを返す |
| `POST /types`、`DELETE /types/:id`（`/selections`、`/coupons` も同様） | `registrations.edit` | スタッフ用の設定CRUD |
| `POST /coupons/validate` | 公開 | ウィザード中のインラインでの割引コード検証 |
| `GET /coupons/event/:eventId` | スタッフ | 使用回数付きのクーポン一覧 |
| `GET /event/:eventId` · `GET /event/:eventId/count` | スタッフ · 公開 | 名簿。定員表示用の有効件数 |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | 認証済み | マイ登録、詳細、支払い履歴 |
| `PUT /:id` | 所有者／スタッフ | 送信後の編集。参加者とオプションの選択を、新たなアトミックな定員チェック付きで置き換え、`totalAmount` を再計算します。自動的な課金や返金は行いません |
| `POST /:id/pay` | 所有者 | 「支払いを完了」：`totalAmount − amountPaid` を課金し、`waitlisted`／`pending` を `confirmed` に変更 |
| `POST /:id/promote` | スタッフ | キャンセル待ちからの手動での繰り上げ |
| `POST /:id/cancel` · `DELETE /:id` | 所有者 · スタッフ | キャンセル／削除。どちらもキャンセル待ちの自動繰り上げを発生させます |

同じイベントで、同じ `personId` による既存の未キャンセル登録がある場合は、409で拒否されます。また、作成された登録ごとに `WebhookDispatcher` を通じて `registration.created` Webhookが発行されます。

## 価格設定と割引コード

`helpers/RegistrationPricingHelper.ts` が、金額計算の唯一の基準です。

- `computeTotal()` は、各参加者のタイプ価格と、各オプションの選択ごとの `price × quantity` を合計します。
- `validateCoupon()` は、有効フラグ、期間（`startDate`／`endDate`）、送信された参加人数に対する `minMembers`、ステータスから導出される利用件数に対する `maxUses` を検証します。
- `applyDiscount()`：`percent` は `total × value/100` を差し引き、`amount` は `value` を差し引きます。どちらも結果は0で下限が設定されます。

ウィザードは、インラインでのフィードバックのために `POST /coupons/validate` を呼び出しますが、`register` はサーバー側でクーポンを再検証し、再適用します。クライアント側に表示された合計金額は参考情報にすぎません。

## アトミックな定員チェックの仕組み

定員のある挿入はすべて、定員チェックを `INSERT` 自体の一部にすることで、トランザクションやロックなしに安全に競合を処理します。イベント全体の定員は `RegistrationRepo.atomicInsertWithCapacityCheck` で処理されます。

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

影響を受けた行が0件であれば、「定員に達している」を意味します。同じ仕組みが、タイプごとの挿入（`RegistrationMemberRepo.atomicInsertWithTypeCapacity`、有効な登録に結合された参加者を数える）と、オプションごとの数量（`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`、`COALESCE(SUM(quantity),0) + ? <= capacity` を使用）も保護します。登録の途中で参加者またはオプションの挿入が失敗した場合、コントローラーは `deleteCascade()` で部分的な登録をロールバックし、どのタイプまたはオプションが売り切れたかを報告します。

## 支払いの流れ

コントローラー内の `processRegistrationCharge` は、登録が金銭に関わる唯一の箇所であり、献金の仕組みを薄く利用するクライアントです。

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

トークン化は、寄付と全く同じくブラウザ内で行われます（[献金](./giving)を参照）。ウィザードは apphelper の決済プロバイダーレジストリを再利用するため、ログイン済みのメンバーは保存済みのカードで支払うことができ、ゲストは新しいカードをトークン化します。コントローラーは `DonateController` のプロバイダー固有の挙動を踏襲します（Kingdom Funding の `pm-{id}` 支払い方法ID、Stripe の SCA による `requires_action` レスポンスは、支払いを記録せずにクライアントへ返されます）。課金が成功すると、`registrationPayments` の行が書き込まれ、`amountPaid` が増加し、登録が確定されます。**返金機能は実装されていません。** キャンセルされた有料登録は支払い行を保持し、返金はゲートウェイのダッシュボードで個別に処理されます。

どちらの入口も同じコードパスを通ります。`register`（申込時の支払い）と `pay`（残額の支払い、またはキャンセル待ちからの確定）です。

`register` は、次の2つの場合に課金を省略し、`amountPaid = 0` の `pending` として登録を保存します。全額が未払いの残高として残ります。

- **スタッフによる参加者追加。** リクエストに、呼び出し元のものではない `personId` が含まれ、`guestInfo` がなく、呼び出し元がその教会で `registrations.edit` 権限を持っている場合。対象の人物が存在している必要があり（存在しなければ404）、世帯メンバーのフィルターは迂回され、カードへの課金は行われません。
- **ゲートウェイなし。** 教会に献金ゲートウェイが設定されていない場合（`hasGateway` は `gateway.loadAll` を確認します）。B1App の支払いステップでは、カードフォームの代わりに **登録して後で支払う** が表示されます。

ゲスト（`au.id` なし）の有料登録には、`POST /giving/donate/captcha-verify` からの `captchaPass` が必要です。`CaptchaPass.verify`（現在は `shared/helpers` にあります）は、課金の直前に実行されるため、キャンセル待ちや無料の申込には影響しません。`CAPTCHA_ENFORCE=true` の場合にパスが欠落しているか無効であれば、新しい登録は `deleteCascade()` でロールバックされ、呼び出しは403を返します。B1App の `RegistrationPaymentForm` は、ゲストにreCAPTCHAのチェックボックスを表示し、カードの保存と登録の両方でパスを送信します。

## キャンセル待ちのライフサイクル

イベントが満員で、かつイベントの `waitlistEnabled` フラグがオンの場合、`register` は参加組を `waitlisted` として保存し（定員チェックは省略）、キャンセル待ちの枠であることを示す通常の確認メールを送信します。繰り上げは3つの経路で行われます。`cancel`、`delete`、およびスタッフ用の `promote` エンドポイントです。これらはすべて `RegistrationRepo.promoteFromWaitlist` に集約され、最も古いキャンセル待ちの行を選んで、アトミックに状態を切り替えます。

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…active count for the event…) < ?
```

`status='waitlisted'` の条件により、同時に行われた繰り上げが同じ行を2回繰り上げることはできません。また、定員のサブクエリにより、繰り上げによって定員を超えて販売されることもありません。繰り上げられた行は `confirmed` ではなく `pending` になります。残高がまだ支払われていない可能性があるためです。`RegistrationHelper.sendWaitlistAvailabilityEmail` は、登録者に空席ができたことを知らせ、`totalAmount − amountPaid > 0` の場合は、教会の B1 の `/mobile/registrations` ページ（マイ登録）へのリンクを含めます。このリンクは `B1AppRoot` と教会のサブドメインから生成されます。支払いを済ませると（または残高がない場合は）、その参加が確定します。

:::info
定員を増やしただけでは、自動的な繰り上げは行われません。定員を増やした後、スタッフが名簿の繰り上げ操作を使用する必要があります。キャンセルと削除では、自動的に繰り上げが行われます。
:::

## クライアント側の画面

- **B1App ウィザード**：1つの共有フック `B1App/src/components/registration/useEventRegistration.ts` が、ウェブサイトのコンポーネント（`components/registration/EventRegister.tsx`）とモバイルのポータル画面（`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`）の両方を駆動し、`info → members → selections → questions → payment → confirm` のステップを進みます（中間のステップは、イベントにオプション、添付されたフォーム、または0以外の合計金額がある場合のみ表示されます）。情報と参加者のステップでは、参加者タイプごとの選択UIを表示し、残りの定員と売り切れの状態をリアルタイムで示します。支払いステップ（`RegistrationPaymentForm.tsx`）では、注文の概要、割引コードの入力、そしてログイン済みのメンバーには apphelper の決済プロバイダーレジストリを通じた保存済みの支払い方法を表示します。ゲストは新しいカードをトークン化します。**登録** のモバイル画面（`screens/RegistrationsPage.tsx`）は「マイ登録」であり、ステータス、未払い残高、支払いを完了（`POST /:id/pay`）、編集（`PUT /:id`：連絡先、参加者タイプ、オプションの数量）、キャンセルを表示します。
- **B1Admin の設定**：`B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` には、キャンセル待ちを有効にするスイッチと、参加者タイプ、オプション、割引コードのためのアコーディオン（`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`）があり、いずれも `/types`、`/selections`、`/coupons` のルートに対してCRUD操作を行います。
- **B1Admin の名簿**：`B1Admin/src/registrations/RegistrationDetailsPage.tsx`。参加者ごとのタイプ列、支払い済み／合計の列と残高のチップ、タイプごとの件数チップ、支払い詳細ダイアログ（`RegistrationDetailDialog.tsx`、`GET /payments/:registrationId` から取得）、キャンセル待ちの「繰り上げ」行アクション、そして参加者タイプ、オプション、支払い済み／合計／残高、質問への回答を含むCSVエクスポートがあります。

モジュールをまたぐ参照（ゲストの人物の特定または作成、メール用の教会情報の読み込み）は、`getMembershipModuleGateway()` を経由します。コンテンツモジュールがメンバーシップのテーブルを直接読むことはありません。

## 関連ページ

- [献金](./giving)：この機能が再利用する、ゲートウェイの抽象化、プロバイダーレジストリ、トークン化の仕組み
- [コンテンツのエンドポイント](../api/endpoints/content)：コンテンツモジュールの REST API
- [Webhook](../api/webhooks)：`registration.created` イベント
- [モジュール構成](../api/module-structure)：サーバー側でコンテンツモジュールがどのように構成されているか
