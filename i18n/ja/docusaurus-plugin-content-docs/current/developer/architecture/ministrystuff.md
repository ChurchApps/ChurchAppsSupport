# MinistryStuff（有料ストレージ・SMS）

MinistryStuff.org は、ChurchApps が無料で提供できない2つのもの、つまり大容量のファイルストレージ（1TB以上）と SMS クレジットを賄うための、別の有料サービスです。どちらも定額の月額サブスクリプションとして提供されます。ChurchApps 自体は 100% 無料のままで、B1 で MinistryStuff のサブスクリプションが必要になる機能はありません。各連携ポイントはプロバイダーの差し替え口（seam）になっており、サードパーティも同じものを実装できます。

## コンポーネント

| 構成要素 | リポジトリ | 役割 |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/`（開発時ポート 8097） | 請求処理（Stripe）、SMS 送信とクレジット台帳（AWS End User Messaging）、ストレージ（S3 とクォータ計算）。MySQL データベース `ministrystuff` は1つだけです。 |
| MinistryStuffWeb | `MinistryStuffWeb/`（開発時ポート 3103） | ministrystuff.org。マーケティングサイト、料金ページ、アカウントポータル（プラン、利用状況、Stripe Checkout / Customer Portal へのリダイレクト）を提供します。 |
| テキストメッセージのプロバイダー | `Packages/texting` → `MinistryStuffProvider` | Clearstream や TextInChurch と並んで `ministrystuff` として登録されています。 |
| ストレージの差し替え口 | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider`（デフォルトで無料）は、元の S3/ディスク切り替え処理をラップしています。`FileStorageHelper` は変更せず、デフォルトのプロバイダーに処理を委譲します。 |
| Api の接続部分 | `Api/` のコンテンツおよびメッセージングモジュール | `MinistryStuffStorageProvider` と `StorageResolver`（コンテンツ）、`TextingConfigHelper` によるサービスキーの注入（メッセージング）、`storageProviders` テーブル、`/content/storage/*` と `/messaging/texting/credits` のエンドポイント。 |

## アイデンティティと信頼

- **同じアカウント、同じ教会。** MinistryStuffApi は、共有の `JWT_SECRET` を使って ChurchApps の JWT を検証します（B1Transfer と同じ兄弟アプリのパターンです）。ポータルは MembershipApi に対してログインし、`?jwt=` によるハンドオフを受け付けます。
- **サーバー間通信（コア Api → MinistryStuffApi）。** `X-Service-Key` ヘッダー（`MINISTRYSTUFF_SERVICE_KEY`、両側で同じ値）と、明示的な `churchId` を使います。利用資格は、必ずその教会のサブスクリプションに対して確認されます。教会が MinistryStuff の認証情報を持つことはありません。B1Admin でプロバイダーを選択するだけで済みます。

## テキストメッセージの流れ

B1Admin の「テキスト送信」→ Api の `TextingController` → `@churchapps/texting` の `getProvider("ministrystuff")` → MinistryStuffApi の `/sms/send` または `/sms/sendBulk` → 現在の請求期間の `smsCreditGrants` からセグメント数を差し引く → AWS End User Messaging（開発環境では `smsMode: mock`）。

クレジットは**厳格な上限**です。クレジットを使い切ると、メッセージは全体が拒否されます（`insufficient_credits`。B1Admin では親しみやすいアップグレードの案内として表示されます）。一部だけ送信されることも、超過分が請求されることもありません。クレジットの付与は、Stripe の `invoice.paid` Webhook から請求期間ごとに冪等に発行されます。配信停止（`smsOptOuts`）は、送信のたびに必ず除外されます。

`TextingController` を経由せず、同じプロバイダーの差し替え口に届く経路もあります。チェックインのアラート（`CheckinController` → `MessagingModuleGateway.sendBulkText`）と、ワークフローの **テキスト送信** ステップアクション（`Api/src/modules/doing/helpers/StepActionHelper.ts` の `sendText` → `MessagingModuleGateway.sendPersonText`）です。後者は送信者が null の `sentTexts` と `deliveryLogs` の行を書き込みます。

差し込みフィールド（`{{firstName}}`、`{{lastName}}`、`{{displayName}}`、`{{churchName}}`）は、受信者ごとに `MergeFieldHelper.resolve` で解決されます。結果は 1,600 文字に制限されます。`TextingController` では、`{{` を含む一斉送信メッセージは1回の `sendBulk` ではなく、受信者ごとに `sendMessage` として送られます。プレースホルダーを含まないメッセージは、従来どおり1回の一括送信になります。

## ストレージの流れ

教会のプロバイダー行（`content.storageProviders`。B1Admin の「設定 → ファイルストレージ」で管理）によって、**新しい**アップロードの保存先が決まります。`contentPath` はファイルごとの絶対 URL なので、移行なしで複数のプロバイダーを共存させられます。既存のファイルは `content.churchapps.org` から引き続き配信され、新しいファイルは `content.ministrystuff.org` から配信されます。

アップロードは、Api → `StorageResolver.forChurch` → プロバイダーの `store` / `getUploadUrl` の順に流れます。S3 モードでは、`content-length-range` 付きの署名済み POST が使われます。ディスクや開発環境のモードでは、base64 にフォールバックします。削除は保存された URL によって振り分けられます（`StorageResolver.forUrl`）。

クォータはプラン上のバイト数で、`storageObjects`（`stored` と `pending` の予約分）から計算されます。クォータを超えると新規アップロードはブロックされます（`storage_quota_exceeded`）。ただし、ファイルが削除されたり、追加料金が請求されたりすることはありません。無料の ChurchApps プランは変更されず、これまでと同じ制限が適用されます（教会全体のクォータはありません）。

適用範囲についての補足：プロバイダーの選択は、コンテンツの**ファイルとリソース**の流れ（大容量のメディアが保存される場所）に適用されます。ギャラリー、ロゴ、写真のアップロードは、引き続きデフォルトのプロバイダーを使います。これらはストレージからキーを一覧取得し、URL をクライアント側で組み立てるため、教会ごとのルート設定はまだ適用されていません。

同じ差し替え口は、[持ち込み型ストレージ（BYOS）](./byos-storage) の基盤にもなっています。教会は MinistryStuff のプランを使う代わりに、Google Drive、Dropbox、OneDrive、または独自の S3 互換バケットを連携できます。

## 請求

加入には Stripe Checkout（ホスト型）を、カードの更新、解約、請求書の確認には Stripe Customer Portal を使います。MinistryStuffWeb にはカード入力フォームはありません。

サブスクリプションの行は、教会と商品の組み合わせごとに1つ作られます。プランとティアはコードに定義されており（`MinistryStuffApi/src/helpers/Plans.ts`）、Stripe の価格 ID は設定から読み込まれます。Webhook（`/billing/webhook`。生のリクエストボディを使った署名検証を行い、`webhookEvents` で重複を排除します）が、サブスクリプションのライフサイクルを駆動します。有効 → 支払い遅延（猶予期間）→ 解約、の順に移行します。

## 開発環境のセットアップ

MinistryStuffApi を起動します（`yarn dev`、ポート 8097。共有の `JWT_SECRET` と `MINISTRYSTUFF_SERVICE_KEY` を記載した `.env` が必要です）。同じサービスキーを `Api/.env` にも設定します。`Api/config/dev.json` では、`ministryStuffApi` がすでに `localhost:8097` を指しています。MinistryStuffWeb には、`VITE_STAGE=dev` を記載した `.env` が必要です。開発環境では `smsMode: mock` とディスクストレージを使うため、AWS は不要です。
