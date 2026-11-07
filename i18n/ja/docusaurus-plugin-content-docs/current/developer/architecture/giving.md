---
title: "献金のアーキテクチャ"
---

# 献金のアーキテクチャ

<div class="article-intro">

ChurchApps では、献金をゲートウェイ経由の仕組みで処理しています。教会は自身の Stripe(または PayPal、Kingdom Funding、Paystack)アカウントを保持し、B1 が決済処理業者として資金の流れに入ることはありません。カード情報はブラウザ上でトークン化され、ChurchApps のサーバーに送られることはありません。このページでは、スタック全体を説明します。`@churchapps/apphelper` のクライアント側プロバイダーレジストリ、GivingApi のゲートウェイ抽象化、献金のデータモデル、そしてゲートウェイの Webhook がデータベースにどのように照合されるかを扱います。

</div>

## 概要

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (browser)  │                   │  Payment gateway                      │
│                             │                   │  (Stripe / PayPal / KF / Paystack)  │
│  @churchapps/apphelper      │                   │                                       │
│  ┌───────────────────────┐  │ card entry in the │  Stripe Elements · KF tokenizer ·     │
│  │ Payment provider      │──┼──────────────────▶│  PayPal Hosted Fields                 │
│  │ registry              │  │◀── token / nonce ─│  (card never reaches a B1 server)     │
│  │ getPaymentProvider()  │  │                   └──────────▲────────────────┬───────────┘
│  │ Stripe · PayPal · KF  │  │                              │                │
│  └──────────┬────────────┘  │                              │                │
└─────────────┼───────────────┘                              │                │
              │  POST /giving/donate/charge | /subscribe     │                │
              │  { token, amount, funds, person }            │                │
              ▼                            charge / subscribe│                │ signed webhook
┌─────────────────────────────────────────────┐ (secret key) │                │ event
│  GivingApi — /giving module                 │──────────────┘                │
│  DonateController → GatewayService          │                               │
│  → GatewayFactory → IGatewayProvider        │◀──────────────────────────────┘
│  donations · funds · subscriptions · …      │  POST /giving/donate/webhook/:provider
└─────────────────────┬───────────────────────┘
                      │  save donations + fundDonations — dedup via eventLogs / transactionId
                      ▼
                MySQL (giving schema)
```

このスタック全体には、次の 3 つの原則があります。

1. **カードはゲートウェイが保持する。** どのプロバイダーの入力ウィジェットも、ブラウザ上でトークン化を行います。API が受け取るのはトークン、ノンス、または注文 ID のみです。
2. **ひとつの抽象化で、複数のプロバイダーに対応する。** ブラウザはレジストリから `PaymentProvider` を解決し、サーバーはファクトリから `IGatewayProvider` を解決します。どちらも、ゲートウェイのレコードに保存された同じ正規化済みプロバイダー名をキーにしています。
3. **決済の確定元は Webhook である。** 決済リクエストの応答は楽観的に記録されますが、完了した献金を確定させる(または作成する)のは、ゲートウェイから届く署名付き Webhook です。両側に冪等性のガードがあります。

## クライアント側: 決済プロバイダーレジストリ(`@churchapps/apphelper`)

レジストリは `Packages/apphelper/src/donations/providers/` にあります。各プロバイダーのウィジェットとヘルパーは、それぞれ専用のサブフォルダー(`providers/stripe/`、`providers/paypal/`、`providers/kingdomfunding/`、`providers/paystack/`)に置かれています。`providers/` の外側では、プロバイダー名による分岐は行いません。`PaymentProvider`(`providers/types.ts` を参照)は、ひとつのゲートウェイについてホストアプリに必要なものをすべてまとめたものです。具体的には、管理画面での表示ラベル、対応通貨、手数料フィールド、既定の手数料率、ダッシュボードやサインアップの URL を含む `descriptor` と、保存済みカード、ACH、定期払い、インラインでの新規カード入力、トークン化時の自動保存といった機能フラグの組である `capabilities` です。さらに、会員による入力用の React ウィジェット(`MemberWrapper`/`MemberEntry`)、ゲストの献金(`GuestForm`)、保存済み決済方法の編集(`MethodEditForm`)、フォーム質問への支払い(`FormPayment`)も含まれます。そして、プロバイダーごとにチャージのペイロードの形が異なる唯一の箇所である `buildChargeRequest(ctx, token)` も含みます。各プロバイダーの `MemberWrapper` は、ゲートウェイのレコードの公開鍵から自身の SDK を読み込みます。そのため、ホストアプリがゲートウェイの SDK をインポートすることはありません(B1App と B1Admin は `@stripe/*` に依存していません)。`pickDefaultGateway(gateways, capability?)` は、ある画面でその教会のどのゲートウェイを使うかを一元的に決めます。

`providers/registry.ts` には組み込みのプロバイダーが登録されています。これらは、モジュールの副作用による登録ではなく、**値として直接参照**されます。そのため、バンドラーのツリーシェイキングによって登録が失われることはありません。

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| 関数 | 目的 |
|----------|---------|
| `getPaymentProvider(name)` | 正規化された名前で解決します。設定が誤っているプロバイダーがあっても献金フォームが強制終了しないよう、Stripe にフォールバックします |
| `registerPaymentProvider(p)` | 実行時に追加のプロバイダーを登録します(ホストアプリ独自のゲートウェイ用) |
| `listPaymentProviders()` | 組み込みとカスタムの両方を列挙します。管理画面のゲートウェイのドロップダウンを作るために使われます |
| `hasPaymentProvider(name)` | 登録されているかどうかを確認します |

**クライアント側の組み込みプロバイダー: Stripe、PayPal、Kingdom Funding、Paystack。** B1App と B1Admin はレジストリを*参照するだけ*です(`getPaymentProvider`、`listPaymentProviders`)。どちらも `registerPaymentProvider` は呼び出しません。登録は apphelper の内部に留まります。

各プロバイダーのトークン化の方法は異なりますが、いずれもカード情報は B1 の外に保たれます。

| プロバイダー | 入力ウィジェット | API に返されるトークン |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` の `CardElement` → `stripe.createPaymentMethod(...)`。ゲストフォームには、単発の献金で Apple Pay / Google Pay を扱う `ExpressCheckoutElement` も組み込まれており、その `onConfirm` は同じ `pm_…` ID を返します | 支払い方法の ID(`pm_…`)。銀行口座は `/paymentmethods/ach-setup-intent` を経由します。USD のゲートウェイでは Financial Connections の `us_bank_account`、CAD のゲートウェイではカナダの PAD である `acss_debit` を使います(ホスト型のマンデートモーダルを表示し、マンデートは請求書やサブスクリプションの `default_for` に設定されます。単発の請求では、マンデート ID を渡します) |
| Kingdom Funding | ゲートウェイの公開鍵で識別されるホスト型トークナイザーフォーム | 一回限りのノンス |
| PayPal | PayPal Hosted Fields(カード、定期払い)に加え、Venmo の資金源を持つ PayPal Smart Buttons(一回限り)。両者は SDK の読み込みを共有し、サーバー側の注文は `/donate/client-token` と `/donate/create-order` を経由して作成されます | 取得済みの注文 ID |
| Paystack | Paystack Inline のポップアップ(`js.paystack.co/v2/inline.js`)。決済はポップアップ自体が処理します(カード、モバイルマネー、銀行振込、USSD) | 支払い済みの取引参照。保存済みの支払い方法は、Paystack の `AUTH_…` 認可コードです |

Stripe の `finalizeResult` は、献金が完了したとみなされる前に、ブラウザ上で 3-D Secure / SCA を実行します(`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`)。共通のフォームは `provider.finalizeResult(result)` を呼び出すだけで、その中身は把握していません。

## サーバー側: ゲートウェイの抽象化(GivingApi)

`/giving` モジュール(`Api/src/modules/giving`)は REST の公開面を提供します。ゲートウェイの基盤は `Api/src/shared/helpers` にあります。`DonateController` はゲートウェイの SDK を直接呼び出しません。`GatewayService` を経由し、`GatewayService` が `GatewayFactory` から適切な `IGatewayProvider` を解決して、復号済みの `GatewayConfig` を渡します。

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider`(`shared/helpers/gateways/IGatewayProvider.ts`)は、すべてのゲートウェイが実装する契約です。Webhook のライフサイクル(`createWebhookEndpoint`、`verifyWebhookSignature`、`classifyWebhookEvent`)、決済(`prepareCharge`、`processCharge`、`prepareSubscription`、`createSubscription`、`finalizeSubscription`、`cancelSubscription`)、手数料(`calculateFees`)、保存済み支払い方法の扱い(`listNormalizedPaymentMethods`、`buildAttachOptions`、`buildLocalMethodRecord`、`deletePaymentMethod`、`verifyMethodOwnership`、`ownsPaymentMethodId`)、そして任意の拡張機能(顧客、注文、SetupIntent、イベントの再生、定期払いの請求書が失敗した場合の `retryFailedPayment`、Apple Pay のドメイン確認のための `registerPaymentMethodDomain`)を定義しています。任意のフックを実装しないプロバイダーは、その操作が非対応と報告され、UI はそのコントロールを非表示にします。各プロバイダークラスは、独自の `capabilities` マトリクス(対応通貨、ACH、返金、定期払いの要件、取引の上限)を宣言します。`GatewayService.getProviderCapabilities(provider)` はそれを読み取るだけです。`logsDonationsImmediately` のようなフラグは、コントローラーの挙動を制御します。そのためコントローラーには、プロバイダー名による条件分岐は一切ありません。

**`GatewayFactory` に登録されているサーバー側プロバイダー:**

| プロバイダー | 提供状況 |
|----------|-------------|
| Stripe | 常に有効 |
| PayPal | 常に有効 |
| Kingdom Funding | 常に有効 |
| Paystack | 常に有効(ナイジェリア、ガーナ、南アフリカ、ケニア、コートジボワールの加盟店。通貨は NGN/GHS/ZAR/KES/XOF/USD) |
| Square | 環境変数 `ENABLE_SQUARE` で有効にするオプトイン |
| ePayMints | 環境変数 `ENABLE_EPAYMINTS` で有効にするオプトイン |

Paystack は他とは異なり、GivingApi が関与する前に資金が動きます。ポップアップが寄付者に請求し、`processCharge` は `GET /transaction/verify/:reference` です。支払われた金額と通貨は、記録される献金と一致している必要があります(既に記録済みの参照が再度記録されることはありません)。定期的な献金の初回分は `finalizeSubscription` から記録されます(検証 → `POST /plan` → `POST /subscription`。`start_date` は 1 間隔後です)。Webhook は秘密鍵そのもので署名されます(`x-paystack-signature`、生のボディに対する HMAC-SHA512)。Paystack には Webhook を管理する API がないため、管理画面には、教会がダッシュボードに貼り付けるための URL が表示されます。更新時の `charge.success` イベントには資金の配分情報が含まれません。そのため、プロバイダーは寄付者のローカルの `subscriptions`/`subscriptionFunds` の行から配分を復元します。`reusable` になるのはカードの認可だけです。モバイルマネーによる献金は一回限りなので、`createSubscription` はこれを拒否します。デモデータには、Paystack のテストモードの GHS ゲートウェイを持つ 2 つ目の教会(Accra Community Church、`CHU00000002`)が含まれています。これにより、Paystack の Playwright スイートが Grace の Stripe のスイートと並行して実行されます。

`ENABLE_CUSTOM_GATEWAY_PROVIDERS` が設定されている場合、カスタムプロバイダーを実行時に登録できます。その基底クラスは `AbstractExperimentalGatewayProvider` です。プロバイダー名は大文字と小文字を区別せずに照合されます。

### ゲートウェイの設定と秘密情報

管理者は `POST /giving/gateways`(`GatewayController`)を通じてゲートウェイの認証情報を保存します。保存時に、コントローラーは秘密鍵と Webhook 鍵を、永続化の前に `EncryptionHelper` で暗号化します。その後、localhost 以外のホストでは、教会の既存の Webhook を削除し、`/giving/donate/webhook/{provider}?churchId=…` を指す新しい Webhook をプロビジョニングします。教会はプロバイダーごとに 1 行を保持します。ゲートウェイを保存すると、同じプロバイダーの既存の行だけが置き換えられます。公開の読み取り(`GET /giving/gateways/churchId/:churchId`、`/configured/:churchId`)は、公開鍵のみを返します。

## データモデル

giving スキーマ(`Api/src/modules/giving/db/DatabaseTypes.ts`、モデルは `models/` 内)は、Kysely を通じてアクセスする MySQL のスキーマです。

| テーブル | 役割 |
|-------|------|
| `gateways` | 教会ごとのプロバイダー設定: `provider`、`publicKey`、暗号化された `privateKey`/`webhookKey`、`productId`、`payFees`、`currency`、`settings`、`environment` |
| `funds` | 献金の用途指定(`name`、`taxDeductible`、`productId`) |
| `donationBatches` | 入力と報告のためのグループ(`name`、`batchDate`、`status` は `open`/`closed`、`closedDate`、`closedBy`) |
| `donations` | 1 回の献金: `batchId`、`personId`、`donationDate`、`amount`、`currency`、`method`、`status`(`pending`/`complete`/`failed`/`refunded`。明細書、合計、ダッシュボード、献金レポートは `complete` または null のみを集計します)、`transactionId` |
| `fundDonations` | 献金を 1 つ以上の用途に割り当てたもの(`donationId`、`fundId`、`amount`) |
| `subscriptions` | 定期的な献金。`id` はゲートウェイのサブスクリプション ID で、`personId`、`customerId`、`gatewayId` にリンクされます |
| `subscriptionFunds` | 定期的な献金の用途ごとの配分 |
| `customers` | `personId` をプロバイダーごとのゲートウェイの顧客 ID にリンクします |
| `gatewayPaymentMethods` | 保存済みのカードや銀行口座: `customerId`、`externalId`、`methodType`、`displayName`、`metadata` |
| `eventLogs` | Webhook やイベントの監査証跡、および重複排除のキー(`provider`、`providerId`、`eventType`、`status`、`resolved`) |
| `campaigns` / `pledges` | 用途に紐づく確約キャンペーンと、各人の確約額 |

献金は `fundDonations` を通じて複数の用途に分割されます。献金レコードは合計額を持ち、各 `fundDonation` がその一部を持ちます。`donations.currency` と `gateways.currency` は ISO の通貨コードを保持します。各プロバイダーは `supportedCurrencies` を公開しており、金額は `CurrencyHelper.formatCurrencyWithLocale` で整形されます。

## エンドツーエンドのフロー

### 会員による一回限りの献金と定期的な献金(B1App)

ログイン済みの献金画面(`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`)は、apphelper の 3 つのコンポーネント、`MultiGatewayDonationForm`、`PaymentMethods`、`RecurringDonations` を組み合わせています。B1App は周辺のデータ読み込みを行います。`GET /donations/my`、`/gateways`、`/paymentmethods/personid/:id`、`/customers/:id/subscriptions` を呼び出し、ゲートウェイの一覧を渡します。解決されたプロバイダーは、ゲートウェイの公開鍵から自身の SDK を読み込みます。実際の請求は apphelper の内部で行われます。解決されたプロバイダーが(新規または保存済みの)支払い方法をトークン化し、一回限りの献金であれば `/giving/donate/charge`、定期的な献金であれば `/giving/donate/subscribe` に送信します。どちらのエンドポイントも、サインインしている寄付者を、その人自身の `personId` に紐づけます(他人に紐づけられるのは `donations.edit` の権限を持つ人のみです)。また、合計が請求額を超える用途の配分は拒否されます。定期的な献金では、`subscriptions` の行と `subscriptionFunds` が作成され、スケジュールがゲートウェイに渡されます(Stripe Subscriptions、PayPal Billing Plans、または KF の定期スケジュール)。

### ゲスト・匿名での献金

公開の献金ページ(`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`)と「今すぐ献金」パネルは、`@churchapps/apphelper/website` の `NonAuthDonationWrapper` を描画します。これは reCAPTCHA とゲートウェイの Elements コンテキストを、プロバイダーの `GuestForm` の周囲に注入します。ゲストはログインも、保存済みの支払い方法も、履歴もありません。フローは次のとおりです。`GET /giving/funds/churchId/:id` と `GET /giving/donate/gateways/:churchId`(公開鍵のみ)を取得し、`POST /giving/donate/captcha-verify` で訪問者を検証し、ブラウザ上でトークン化して、`/giving/donate/charge`(または `/subscribe`)に送信します。検証の呼び出しは、10 分間有効な HMAC 署名付きの `captchaPass`(`Api/src/modules/giving/helpers/CaptchaPass.ts`)を返します。フォームは、ゲストによる決済関連の呼び出しのたびにこれを送信します。`CAPTCHA_ENFORCE=true` の場合、API は、その教会に対する有効なパスがないゲストの `create-order`、`charge`、`subscribe`、`addcard`、`ach-setup-intent-anon` の呼び出しを拒否します。有料のイベント登録をするゲスト(`POST /content/registrations/register`)も、請求の直前に同じパスを確認します。詳しくは [Event Registrations](./registrations#payment-flow) を参照してください。ゲストによる ACH では、匿名の `POST /giving/paymentmethods/ach-setup-intent-anon` を使います。これは即時の確認(Financial Connections)のみを許可します。少額入金による確認は数日後に完了するため、その時点ではゲストはすでにページを離れており、献金を完了できないからです。フォームは、確認されていない SetupIntent での請求を拒否し、寄付者にカードによる支払い、またはサインイン済みの銀行口座の設定を案内します。

ゲストフォームには、同じチャージ呼び出しで使われる 3 つのオプションがあります。献金 URL の `?fundId=` と `?amount=` は、用途の配分を事前に選択します(各プロバイダーのゲストフォームがマウント時に読み取り、通常の用途変更ハンドラーを経由するため、合計と手数料が更新されます)。`anonymous: true` を指定すると、`DonateController.charge` はクライアントから送られた人物を破棄し、献金を `personId = null` で記録します。ゲストフォームは `/people/loadOrCreate` と、顧客/保管の手順をスキップします。また、即時記録を行う 3 つのプロバイダーは、ゲートウェイの顧客から人物を解決することをやめます。Apple Pay では、そのページのドメインを Stripe に登録する必要があります。そのため、Stripe のゲストフォームは、セッションごとに一度、公開かつレート制限付きの `POST /giving/donate/register-domain` にリクエストを送ります。このエンドポイントは、教会に属するドメインのみを受け付けます(`<subDomain>.b1.church`、コンテンツモジュールのドメインテーブルの行、またはローカルホスト)。その後、Stripe の payment-method-domains API を呼び出します。

### 管理者による記録と Stripe のインポート(B1Admin)

B1Admin の献金セクション(`B1Admin/src/donations/`)は、財務チームが作業する場所です。一括入力(`components/BulkDonationEntry.tsx`)は、`/giving/donations` と `/giving/funddonations` に送信することで、現金、小切手、現物の献金を記録します。この処理にゲートウェイは関与しません。人物の記録にある **Log a gift** のシート(`components/LogGiftDialog.tsx`)も、一件の献金について同じことをします。まず、`batchDate` が献金日と一致するバッチを探し、なければその日付の名前でバッチを作成します(`POST /giving/donationbatches`)。その後の手順が失敗した場合は、献金と新しく作成したバッチを削除します。用途、バッチ、キャンペーン、明細書は、それぞれ `/giving/*` の CRUD ルートに対応します。献金明細のページ(`BatchGivingStatementsPage`、`PrintAllStatementsPage`)は、教会の全履歴ではなく、暦年 1 年分を `GET /donations?startDate=&endDate=` と `GET /fundDonations?startDate=&endDate=` で取得します。全履歴では Lambda のレスポンスサイズの上限を超えるおそれがあるためです。会員向けの献金パネル(`B1Admin/src/donationComponents/`)は、B1App と同じ apphelper のコンポーネントを再利用しています。

レポートと会計への引き渡しは、クライアント側、またはレポート実行処理の作業であり、ゲートウェイの作業ではありません。バッチページの QuickBooks エクスポートは、バッチの `donations` と `fundDonations` から仕訳の CSV を作成します(Undeposited Funds を借方に、用途ごとに貸方を 1 行ずつ)。Summary ページの Lapsed Givers 表示は、`Api/reports/lapsedGivers.json` を汎用のレポート実行処理で実行し、`ReportOutput` で人物の名前を解決します。国ごとの領収書の形式(カナダ、オーストラリア、ニュージーランド)は、教会の設定であり、会員のキーバリューストアに保存されます。これは `GivingStatementDocument` で描画され、B1App の印刷ページにも複製されています。B1Admin の明細書の印刷ページ(`PrintDonationPage`、`PrintAllStatementsPage`)は、教会の `logoLight` 設定を渡します(`B1Admin/src/components/PrintChurchHeader.tsx` の `usePrintLogo` を経由)。これにより、各明細書の上部にロゴが印刷されます。また、画像の読み込みを待ってから自動で印刷を開始します。

### バッチの状態と献金入力の権限

確定した入金をそのまま残すため、バッチを締めることができます。`POST /giving/donationbatches/:id/close` と `/:id/reopen`(Donations.Edit の権限のみ)は、`status`、`closedDate`、`closedBy` を書き込める唯一の経路です(`DonationBatchRepo.setStatus`)。通常のバッチの保存はこれらに一切触れないため、バッチを確定しても、それが再度開かれることはありません。書き込み権限は `Api/src/modules/giving/helpers/BatchAccessHelper.ts` に一元化されています。Donations.Edit はすべてを変更できます。一方、より限定的な Donations.Enter の権限(`GivingApi` / `Donations` / `Enter`、ロールエディターでは "Enter Donations")は、バッチを作成し、献金と用途の配分を保存または削除できます。ただし、それは献金の現在のバッチと移動先のバッチの両方が開いている場合に限られ、ゲートウェイによる献金(`transactionId` を持つもの)には決して適用されません。ブロックされた書き込みは `403 { error: "This batch is closed." }` を返します。バッチの読み取りは Donations.ViewSummary または Donations.Enter のいずれかを受け付けるため、窓口担当者は入力先のバッチを選択できます。クライアント側では、`B1Admin/src/donations/batchAccess.ts` がこれらのルール(`canSeeBatches`、`canEnterDonations`、`canChangeBatch`)を反映しています。また、`Header` と `SecondaryMenuHelper` は、バッチを閲覧できる人には、View Summary の権限がなくても **Donations > Batches** を表示します。

### 通貨が混在する合計の換算

通貨が混在しうる献金を、単一の合計として返すエンドポイントはすべて、異なる通貨を単純に足し合わせるのではなく、サーバー側で教会の既定の通貨に換算します。対象は、献金の概要の KPI(`GivingKpiCards`)、献金バッチの合計、用途の合計、そして B1App の献金画面の年初来・期間の合計です。`Api/src/shared/helpers/ExchangeRateHelper.ts` は、教会の通貨をキーとして `api.frankfurter.dev` から為替レートを取得し、12 時間プロセス内にキャッシュし、`convertTotals(rows, churchCurrency, rates)` を公開します。行は SQL で通貨ごとにあらかじめグループ化されます(献金ごとの換算ではなく、数個のグループのみです)。各グループが換算されて合計され、結果には `isConverted` フラグが付きます。クライアントはこのフラグを使い、「現在の為替レートで換算」という注記を表示します。`GET /donations/exchange-rates` は、レートの表を必要とするクライアント(B1App の献金画面)に公開します。ただし、レートがリクエストから受け付けられることは決してなく、常にサーバー側で取得されます。そのため、クライアントが報告される合計に影響を与えることはできません。個々の献金レコードと、元の通貨による過去のレポートは換算されません。換算されるのは、合計額のみです。

Stripe のインポート(`B1Admin/src/donations/StripeImportPage.tsx`)は、B1 の外で行われた献金を取り込みます。まず `dryRun: true` を指定して `POST /giving/donate/replay-stripe-events` を呼び出してプレビューし、次に `dryRun: false` で取り込みます。サーバーは日付範囲の Stripe イベントを一覧し、既に記録済みのものはスキップします。照合は、まず `eventLogs` のプロバイダー ID、次に取引 ID、そして `DonationRepo.findMatchingDonation`(金額、日付、人物)の順に行われるため、再実行しても二重に取り込まれることはありません。サブスクリプションの `charge.succeeded` / `payment_intent.succeeded` イベントはスキップされます。これらの献金は `invoice.paid` によって記録されているためです。新しい Stripe API のバージョンでは `PaymentIntent.invoice` が削除されているため、スキップは "Subscription …" という説明文でも判定されます。

## Webhook と照合

確定した決済とサブスクリプションの状態の変更は、`POST /giving/donate/webhook/:provider?churchId=…`(`DonateController.webhook`)に届きます。処理は意図的に冪等になっています。

1. **検証** — `GatewayService.verifyWebhook` はプロバイダーの署名チェックに処理を委譲します。署名が不正な場合は 401 を返します。処理を必要としないイベントは、200 で即座に終了します。
2. **イベントの重複排除** — `EventLogRepo.loadByProviderId` は、`eventLogs` に既に記録されている Webhook をスキップします。
3. **献金の重複排除** — 何かを作成する前に、ペイロードが持ちうるすべての候補 ID に対して `DonationRepo.loadByTransactionId` を確認します。これにより、重複配信、複数段階の ACH イベント(保留中 → 決済済み)、そして `/donate/charge` が既に献金を楽観的に記録していたケースを吸収します。
4. **適用** — プロバイダーの `classifyWebhookEvent(eventType)` が、そのイベントの意味を返します(`donation` の保留中/完了、`cancel-subscription`、または `ignore`)。完了した決済は `complete` の献金を作成します(または、既存の `pending` や `failed` の献金を昇格させます)。ACH 形式のイベントは、決済されるまで `pending` として記録されます。サブスクリプションの請求書が失敗した場合(Stripe の `invoice.payment_failed`)は、請求書 ID をキーとする `failed` の献金を作成します。キャンセルのイベントは、ローカルの `subscriptions` の行を削除します。コントローラーは、プロバイダー固有のイベント名を調べることは決してありません。

### 失敗した定期的な献金と督促

`failed` の献金は、回収作業の単位です。`GET /giving/donations/failed` は、それらを一覧表示します。各項目には `eventLogs` から取得した最新のゲートウェイの失敗メッセージと、ゲートウェイの capabilities に基づく `canRetry` フラグが付きます。`POST /giving/donate/retry/:donationId` はプロバイダーの `retryFailedPayment` を呼び出します(Stripe は未払いの請求書を支払います)。その結果生じた Webhook が、通常の重複排除の経路を通じて、その行を `complete` に昇格させます。督促メールは、Webhook ハンドラーから 0 日目に寄付者へ送られ、その後は深夜のタイマー(`lambda/timer-handler.ts` と `RailwayCron.ts` の両方に接続)にある `DunningHelper.run` から、3 日目と 7 日目に送られます。送信のたびに `eventLogs` に `provider: "dunning"`、`providerId: "<donationId>:<day>"` として記録されるため、再実行されても二重に送信されることはありません。Stripe が諦めてサブスクリプションをキャンセルした場合(`customer.subscription.deleted` で `cancellation_details.reason: "payment_failed"`)、`DunningHelper.notifyCanceled` は寄付者に一度だけメールを送ります(`providerId: "<subscriptionId>:canceled"`)。寄付者または管理者が開始したキャンセルでは、何も送られません。Stripe は既存のエンドポイントにイベントを追加しません。そのため、`StripeHelper.webhookEvents` を変更した後は、ゲートウェイを保存し直すか、本番環境に対して `tools/manual/stripe-webhook-events.ts` を実行してください(既定はドライラン、書き込むには `--apply` を指定します)。

`logsDonationsImmediately` を持つプロバイダー(PayPal、Kingdom Funding、Paystack)は、`/charge` の応答から請求を記録します(正常系では Webhook の往復は不要です)。一方、Stripe は `payment_intent.succeeded` / `invoice.paid` と、ACH の `payment_intent.processing` に依存します。手数料の処理(`POST /giving/donate/fee`、ゲートウェイの `payFees` フラグ、そして各プロバイダーの `calculateFees`)は、寄付者側で「手数料を負担する」ための総額の計算を行います。B1 はプラットフォームの取り分を取らないため、アプリケーション手数料が追加されることはありません。

:::info
請求と Webhook の経路は、同じ `donations` / `fundDonations` の行を書き込みます。`transactionId` は結合キーです。これにより、楽観的な請求の記録と、後から届く Webhook が、ひとつの献金に対して 2 つの献金を生み出すことを防ぎます。
:::

## 関連ページ

- [Giving Endpoints](../api/endpoints/giving) — 献金、用途、バッチ、ゲートウェイ、サブスクリプション、支払い方法、Webhook に関する REST の公開面全体
- [AppHelper](../shared-libraries/app-helper) — 決済プロバイダーレジストリと献金コンポーネントを提供する npm パッケージ
- [Module Structure](../api/module-structure) — GivingApi モジュールがサーバー側でどのように構成されているか
