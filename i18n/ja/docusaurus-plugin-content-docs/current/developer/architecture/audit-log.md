---
title: "監査ログと元に戻せるバッチ"
description: "すべてのモジュールでユーザーの変更を記録する API の監査ログと、B1 Admin でインポートのバッチを行単位で取り消す方法を説明します。"
---

# 監査ログと元に戻せるバッチ

<div class="article-intro">

Api では、ユーザーが行うすべての変更操作が、誰が・何を・いつ・どこから行ったかとともに記録されます。コントローラーごとに個別の設定は必要ありません。その上に、バッチの仕組みがあります。インポートや一括操作をバッチとしてタグ付けすると、後から行単位で **元に戻す** ことができます（Planning Center 方式）。どちらも membership データベースの単一の `auditLogs` テーブルに保存され、すべて `BaseController.actionWrapper` という一つの共通の入口から制御されます。このページでは、何が監査されるか、データがどこに保存されるか、その設計を決めるパフォーマンス上のトレードオフ、そして複数のデータベースにまたがるトランザクションを使わずに、元に戻す処理を安全に行う方法を説明します。

</div>

## 概要

```
every mutating request (POST/PUT/PATCH/DELETE)
        │
        ▼
BaseController.actionWrapper ──▶ derive {module, entityType, category, action}
        │                         from req.baseUrl + method  (AUDIT_REGISTRY = overrides/opt-outs only)
        │
        ├─ normal mode ─────────▶ run action ─▶ await AuditLogHelper.log(after-values)  ──┐
        │                                        (deletes also capture a before-image)     │
        │                                                                                  ▼
        └─ X-Batch-Id present ──▶ snapshot before-images (strict) ─▶ run action ─▶ audit rows tagged batchId
                                                                                           │
                                                                                           ▼
                                                             auditLogs  (membership DB, one table, all modules)
                                                                                           │
   POST /membership/batches/:id/undo ──▶ BatchUndoHelper ──▶ walk rows reverse, per entity ┘
                                          conflict guard → restore / delete / re-insert
```

以下の内容を支える構造上の事実は二つあります。

1. **actor（操作したユーザー）を知っているのはコントローラー層だけです。** リポジトリは `AuthenticatedUser` を受け取らず、`au` を保持するのはコントローラーだけです。すべてのモジュールのコントローラーは `BaseController.actionWrapper` を通るため、監査の仕組みはそこに組み込まれています。リポジトリのシグネチャは一切変更していません。
2. **一つのテーブルがすべてのモジュールを扱います。** 寄付、出欠、コンテンツなどの監査行は、membership 以外のコントローラーから書き込む場合でも、`RepoManager.getRepos("membership")` を経由して membership データベースの `auditLogs` に書き込まれます。そのため「Jane が今日変更したすべてのもの」を一つのクエリで取得できます。

## 監査される内容

監査は、すべてのルートにおけるすべての変更系の HTTP メソッドで **デフォルトで有効** です。`actionWrapper` は、ルートごとの設定なしにリクエストから監査フィールドを導出します。

| フィールド | 導出元 |
|-------|--------------|
| `module` | `this.moduleName`（所有しているモジュール） |
| `entityType` | `req.baseUrl` の最後のセグメントを単数形にしたもの（例: `/membership/people` → `person`） |
| `category` | デフォルトは `entityType` |
| `action` | `POST /` の場合は `${entityType}_saved`、`DELETE /:id` の場合は `${entityType}_deleted`、それ以外は `${entityType}_${method}:${routePath}`。これにより、CRUD 以外のサブルート（例: `task_post:/:id/move`）も自動的に記録されます。 |

`BaseController.AUDIT_REGISTRY` は **上書きと除外のためだけ** に使います。許可リストではありません。ルートをここに登録するのは、カテゴリや entityType の名前を変更するため、`{ dbModule, table }` を宣言して一括処理と元に戻す操作に対応させるため、`sensitive` を指定して匿名の変更も監査するため、または `optOut: true` で監査を無効にするためです。

**除外リスト**（記録するとログが埋もれてしまう大量の書き込み経路）: 出欠の `visits` / `visitsessions` / `sessions` / `checkin`（日曜日のチェックインの集中アクセス）と、メッセージングの `messages` / `connections` / `devices`（チャットとプレゼンス）。それ以外はすべて記録されます。

**一括処理のエンドポイント**（`people/bulk-delete`、`people/bulk-update`、`groupmembers/bulk-add`、`groupmembers/bulk-remove`）は `BULK_ROUTES` に登録されており、影響を受けた ID ごとに **1 行の監査行** を出力します。そのため、1 万人規模のインポートでは 1 万行が生成されます。この entity 単位の粒度こそが、バッチを元に戻せるようにしている理由です。

**匿名の変更操作**（`actionWrapperAnon`。匿名の寄付、ゲスト登録、フォーム送信など）は、レジストリで `sensitive` と指定されたルートについてのみ監査されます。その場合、`userId="anonymous"` とクライアントの IP アドレスが記録されます。寄付がこの一覧の先頭にあり、この経路では実際に回帰が発生した履歴があります。

### 機密情報のマスキングとサイズ上限

`details` のペイロードを保存する前に、`AuditLogHelper.capDetails()` が `sanitizeValue()` を実行します。

- **機密キーはマスクされます。** 小文字にしたフィールド名が `SENSITIVE_KEYS`（`password`、`token`、`cvv`、`cardnumber`、`routing_number`、`accesstoken`、`clientsecret` など）に含まれる場合、その値は `"[redacted]"` に置き換えられます。
- **大きなスカラー値は取り除かれます。** `data:` URI や 4 KB を超える文字列（base64 の写真やバイナリデータなど）は `"[stripped]"` になります。
- **大きすぎる行は切り詰められます。** シリアライズされた JSON が約 64 KB を超えると、ペイロード全体が `{ truncated: true }` に置き換えられます。切り詰められた行は引き続き閲覧できますが、**元に戻すことはできません**（復元元となる変更前・変更後のデータがないため）。

## データの保存先

membership データベースにある単一の `auditLogs` テーブルがすべてのモジュールを支えています。列は `id, churchId, userId, category, action, entityType, entityId, details (MEDIUMTEXT JSON string), ipAddress, module, batchId, created` です。マイグレーション `tools/migrations/membership/2026-07-04_audit_universal.ts` は `module` と `batchId` を追加し、`details` を `TEXT` から `MEDIUMTEXT` に拡張し、インデックス `ix_auditLogs_batch (batchId)` と `ix_auditLogs_entity (churchId, module, entityType, entityId, created)` を作成し、`batches` テーブルを作成します。`module` 列があるのは、複数のモジュールに存在する `entityType`（`note` や `setting` など）の衝突があっても絞り込めるようにするためです。また entity のインデックスが、entity ごとの履歴と、元に戻す際の競合チェックの両方を支えています。

モジュールをまたぐ書き込みは、ラッパー内から `RepoManager.getRepos("membership")` を経由して行われます。順序は意図的に決められており、**本体の書き込みを先にモジュールのデータベースにコミットし、その後で監査の挿入を行います。** 通常モードでは、監査の挿入が失敗しても例外は握りつぶされます（`console.error` が出力され、Sentry が検知します）。監査はあくまで補助的な機能であり、ユーザーのリクエストを失敗させてはなりません。一方、**バッチモードでは厳密に扱われます**（後述）。

:::info なぜトリガー、CDC、モジュールごとのテーブルを使わないのか
- **MySQL のトリガー**は実行しているユーザーを知りません（接続には `au` がありません）。また、すべてのスキーマでトリガーのセットを管理する必要があります。
- **binlog / CDC** は、同じ actor の識別問題を抱えたままインフラ全体の大規模なプロジェクトになります。
- **すべてのリポジトリに `userId` を渡す**と、コントローラー層がすでに持っている情報を伝えるためだけに、数百のファイルを変更することになります。
- **モジュールごとの監査テーブル**は、配線作業が 7 倍になり、モジュールをまたぐ質問のたびに複数テーブルへの問い合わせが必要になります。コントローラーの共通の入口に一つのテーブルを置くことが、actor を記録しつつ、コードの量が最も少ない設計です。
:::

## パフォーマンス方針

ホットパス（頻繁に実行される処理）は意図的に軽量にしており、コストは効果が見合う場所にだけ支払うようにしています。

- **通常の更新では、書き込み前の読み取りを行いません。** 通常の保存では古いレコードを読み込み **ません**。**送信された変更後の値** を `details.after` に保存し、UI が *表示時* に直前の監査行と比較して、変更前から変更後への差分を再構築します。表示時に一度クエリを実行し、書き込み時のコストはゼロです。リリース以降一度も変更されていないフィールドは、単に「変更前」の値が表示されません。これは許容しています。
- **削除では変更前の状態を保存します。** `{ dbModule, table }` を持つレジストリのルートに対する `DELETE /:id` は、まず汎用的な方法で行を読み込み、`details.before` に保存します。削除は稀であり、変更前の状態こそが法的・調査上の価値の全てだからです。
- **バッチモードだけが、体系的に書き込み前の読み取りを行う**ものであり、オプトインです。一括操作やインポートはすでにコストが高いため、元に戻せるようにするための N 回のスナップショット読み取りは、その代償として受け入れています。
- **監査の挿入は await されます。** `actionWrapper` は挿入の Promise を収集し、レスポンスを返す前に `await Promise.allSettled(...)` を実行します。これが最も重要な不変条件です。Lambda では、レスポンスが返った瞬間にコンテナが凍結されるため、await されない挿入は黙って破棄されてしまいます。ここでの「fire and forget」とは、*エラーがリクエストを失敗させない* という意味であり、*await しない* という意味ではありません。ウォームな membership プールへの 1 回の挿入は約 1〜3 ミリ秒です。

## バッチと元に戻す操作

**バッチ** は、一連の変更をまとめて、一緒に確認し、一緒に取り消せるようにするものです。バッチを開く方法は二つあります。

- **明示的:** `POST /membership/batches { label, source }` は `batchId` を返します。その後、クライアント（B1Transfer、B1Admin のインポート UI）は以降のすべての保存・削除操作に `X-Batch-Id: <id>` を付けて送信します。`POST /membership/batches/:id/complete` はバッチを閉じ、`itemCount` を記録します。
- **暗黙的:** 四つの一括処理エンドポイントは、一つのリクエスト内でバッチを開き、データを追加し、完了させます。レスポンスには `batchId` が含まれます。

`batches` テーブル（membership データベース）: `id, churchId, userId, label, source, status (open|completed|undone|partial|failed), itemCount, created, completedAt, undoneAt`。

### バッチモードは厳密です

`X-Batch-Id` が存在する場合、`actionWrapper` はすべてのガードを厳しくします（`writeBatchAuditRows`）。

1. バッチが存在し、`open` 状態であり、`au.churchId` に属していなければなりません。そうでなければ **403** になります。
2. ルートが一括処理に対応している必要があります（レジストリに `{ dbModule, table }` がある必要があります）。そうでなければ **400** になります。
3. アクションを実行する前に、影響を受けるすべての ID の変更前の状態を、**一つの** `WHERE id IN (...) AND churchId = ?` クエリで読み込みます。このスナップショットの読み取りが失敗した場合、リクエストは **500 で失敗し、アクションは実行されません**。バッチモードでは、元に戻せない台帳が黙って作られることがあってはなりません。（対照的に、通常モードではベストエフォートであり、スナップショットの失敗は握りつぶされます。）
4. アクションが成功すると、entity ごとに 1 行の監査行が `batchId`、`details.before`、`details.after` とともに書き込まれます。さらに、バッチが作成した行には明示的な **作成マーカー** も付けられます。

### 元に戻す操作

`POST /membership/batches/:id/undo`（権限: バッチの作成者、または `Permissions.server.admin`）。バッチが `completed` でない場合、または **30 日間の取り消し期間** を過ぎている場合は実行を拒否します。その後 `BatchUndoHelper.undo()` は次の処理を行います。

1. バッチの監査行を読み込み、**`(module, entityType, entityId)` ごとにグループ化** します。一つのバッチ内で何度も変更された entity は、**一度だけ** バッチ前の正しい状態に戻されます。つまり、最も古い変更前の状態に戻すか、バッチがその entity を作成していた場合は削除します。単純に各行を再生するわけではないのはこのためです。バッチの途中の中間スナップショットを復元すると誤りになるからです。
2. entity ごとに、まず **競合チェック** を実行します。`auditLog.hasLaterModification()` は、そのバッチの外側に、同じ `(module, entityType, entityId)` に対する *後の* 監査エントリがあるかどうかを確認します。ある場合、その entity はインポートの後に編集されたことになるため、**スキップして報告され、上書きされることはありません**。これは監査ログ自体を変更検知の仕組みとして再利用するものであり、どのテーブルにも `modifiedAt` 列は不要です。
3. 記録された操作に従って取り消しを行います。`{ dbModule, table }` はレジストリから解決し、汎用の Kysely の書き込みを使います。
   - **作成された** → 行を物理削除します。
   - **更新された** → `details.before` を書き戻します。
   - **削除された** → `details.before` を再挿入します（同じ ID の行が再び現れている場合は、更新または挿入を行います）。
4. 各取り消し操作自体も監査されます（`action: "<entityType>_undone"`、`batchId` なし。取り消しの取り消しは対象外です）。

操作の種類は、変更前の状態が欠けているかどうかから推測するのではなく、明示的な **作成マーカー** から決定されます。変更前の状態が空であることが正当な場合や、行が切り詰められている場合を、作成と誤認してはなりません。

結果のペイロードは `{ restored, skippedConflicts: [...], failed: [...], status }` であり、バッチは問題がなければ `undone`、一部のみ成功した場合は `partial` になります。**複数の DB にまたがるトランザクションはありません。** 取り消しは行単位のベストエフォートです。これは、Planning Center がマージされたプロフィールについて文書化しているのと同じ制約です。

:::warning 副作用を持つ entity には `onUndo` フックが必要です
`groupMember` の作成を取り消す場合は、`groupMemberHistory`（"left"）も書き込まなければなりません。さもないと、離脱の分析が黙って壊れてしまいます。これはワークスペース全体の不変条件です。このような entity は `AUDIT_REGISTRY` に `onUndo` コールバックを登録します。このコールバックは、取り消しを完全に処理した場合に `true` を返し、汎用の処理経路を迂回します。`groupMembers` が代表的な例です。明示的な経路では行 ID をキーとしますが、一括処理のエンドポイントでは `personId` をキーとし、追加や削除のたびに履歴も記録されます。
:::

## 利用側の画面

どちらの管理画面も **開発中** です。その意図は次のとおりです。

| 画面 | リポジトリ | 目的 |
|---------|------|---------|
| **監査ログのページ** | B1Admin（ManageChurch → Audit Log） | モジュール、カテゴリ、ユーザー、entity で絞り込み、変更前から変更後への差分を表示します。編集は entity の直前のエントリとの比較から、削除は `details.before` から表示します。`GET /membership/auditlogs` で提供され、`Permissions.server.admin` で保護されます。 |
| **バッチのページ** | B1Admin（同じ設定のハブ内） | ステータスと件数付きでバッチを一覧表示し、**結果を表示**（`GET /membership/batches/:id/results` でバッチの監査行を取得）、スキップされた競合や失敗の報告を表示する **元に戻す** ボタンを提供します。 |
| **インポートのバッチ** | B1Transfer | バッチを開き、通常の保存呼び出しに `X-Batch-Id` を付けて送信し、最後に完了させます。新しいインポート用のエンドポイントを追加することなく、インポートを元に戻せるようになります。従来の `importKey` は作成のみの系譜マーカーとして残りますが、元に戻す処理では置き換えられます。 |

## 将来の変更で退行させてはならない注意点

- **監査の挿入は必ず await されたままにすること。** await されない `AuditLogHelper.log(...)` は、Lambda の凍結によって破棄されます。Promise を収集し、返す前に `await Promise.allSettled` を実行してください。
- **Kysely は `.set()` / `.values()` から `undefined` を除外します。** 復元時に、値をクリアした列がそのまま残ってしまいます。`BatchUndoHelper` は、存在しないすべてのフィールドを明示的な `null`（`nullify`）に変換します。「より速い」直接の書き込みのためにこれを迂回しないでください。
- **保持期間は取り消し期間よりも十分長く保つこと。** `AuditLogRepo.deleteOld()` は夜間のタイマーで実行されます（デフォルトの保持期間は 365 日）。取り消し期間は 30 日です。保持期間が取り消し期間に近づくと、未完了のバッチの下から取り消し用の台帳が消えてしまいます。
- **切り詰められた行は元に戻せません。** `{ truncated: true }` のペイロードには変更前・変更後のデータがないため、取り消しは `failed` として報告し、推測はしません。
- **順序は、モジュールへの書き込みの後に監査を行うこと。** 監査の挿入を実際の書き込みより前に移動してはなりません。また、バッチ内では厳密に、通常モードでは補助的に扱う動作を維持してください。

## ファイル一覧

| 領域 | ファイル |
|------|-------|
| ラッパー / レジストリ | `Api/src/shared/infrastructure/BaseController.ts`（`AUDIT_REGISTRY`、`BULK_ROUTES`、`actionWrapper`、`actionWrapperAnon`、スナップショットと行の書き込み） |
| 取り消しエンジン | `Api/src/shared/infrastructure/BatchUndoHelper.ts` |
| 監査ヘルパー | `Api/src/modules/membership/helpers/AuditLogHelper.ts`（`log`、`capDetails`/`sanitizeValue`、`diffFields`、`getClientIp`） |
| コントローラー | `Api/src/modules/membership/controllers/AuditLogController.ts`、`BatchController.ts` |
| モデル / リポジトリ | `Api/src/modules/membership/models/AuditLog.ts`、`Batch.ts`、`repositories/AuditLogRepo.ts`（`loadFiltered`、`loadForBatch`、`hasLaterModification`、`deleteOld`）、`BatchRepo.ts` |
| マイグレーション | `Api/tools/migrations/membership/2026-07-04_audit_universal.ts` |
| 管理画面（開発中） | B1Admin の監査ログとバッチのページ。B1Transfer のインポートバッチのヘッダー |

## 関連ページ

- [モジュール構造](../api/module-structure.md) — membership 以外のコントローラーが `RepoManager` を通じて membership のリポジトリに到達する方法
- [寄付](./giving.md) — 匿名であっても `sensitive` として監査される寄付の書き込み経路
- [Membership エンドポイント](../api/endpoints/membership.md) — `X-Batch-Id` を扱い、`/auditlogs` と `/batches` を公開する REST の API
