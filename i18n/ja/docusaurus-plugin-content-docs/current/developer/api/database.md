---
title: "データベース"
description: "ChurchApps API が、モジュールごとに 1 つずつ、計 6 つの MySQL データベースにデータをどのように分割するか、また接続の設定と初期化の方法を学びます。"
---

# データベース

<div class="article-intro">

ChurchApps API は **モジュールごとのデータベース** アーキテクチャを採用しています。6 つのデータモジュールそれぞれが、独立した接続プールを持つ専用の MySQL データベースを持ちます。これによりデータの境界が明確になり、すべてを 1 つのデプロイメント内に収めたままにできます。

</div>

<div class="prereqs">
<h4>始める前に</h4>

- **MySQL 8.0 以降** をインストールします -- [前提条件](../setup/prerequisites.md) を参照してください
- `.env` ファイルでデータベースの接続文字列を設定します -- [環境変数](../setup/environment-variables.md) を参照してください

</div>

## アーキテクチャの概要

```
Api
├── membership_db   ← 人物、グループ、権限
├── attendance_db   ← サービス、セッション、記録
├── content_db      ← ページ、セクション、要素
├── giving_db       ← 寄付、ファンド、支払い
├── messaging_db    ← 会話、通知
└── doing_db        ← タスク、計画、担当割り当て
```

### 主要な設計上の決定

- **モジュールごとに 1 つのデータベース** -- 各モジュールは、専用の接続プール (`KyselyPool` で管理) を持つ独自の MySQL データベースを保持します。これによりモジュール同士が疎結合になり、スキーマを独立して進化させられます。
- **排他的な所有権** -- モジュールのテーブルは、そのモジュール自身のコードからのみ読み書きされます。別のモジュールがそのデータを必要とする場合は、テーブルを直接クエリするのではなく、所有モジュールのゲートウェイを呼び出します -- [モジュール間通信](./module-structure.md#cross-module-communication) を参照してください。
- **ORM を使わないリポジトリパターン** -- すべてのデータアクセスは、モジュールのスキーマに対して Kysely クエリビルダーで型付き SQL を組み立てるリポジトリクラスを経由します。これにより、クエリのパフォーマンスと動作を完全に制御できます。
- **設計段階からのマルチテナント** -- すべてのクエリは `churchId` でスコープされます。すべてのテーブルに `churchId` 列があり、リポジトリ層がテナントの分離を自動的に強制します。

## 接続文字列

各モジュールのデータベース接続は、標準的な MySQL 接続文字列の形式を使って `.env` で設定します。

```
mysql://user:password@host:port/database
```

たとえば、ローカル開発環境の設定は次のようになります。

各モジュールは、`<MODULE>_CONNECTION_STRING` という名前の環境変数から接続情報を読み込みます。

```env
MEMBERSHIP_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_content
GIVING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_messaging
DOING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
本番環境では、接続文字列は AWS SSM Parameter Store に保存され、起動時に `Environment` クラスによって読み込まれます。
:::

## スキーマスクリプト

テーブルのスキーマは、モジュールごとに整理された `tools/migrations/` ディレクトリ内の Kysely マイグレーションとして定義されています。

```
tools/migrations/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

マイグレーションは、テーブルの作成、インデックス、スキーマの変更を定義します。`tools/dbScripts/` ディレクトリには、スキーマの上に読み込めるデモ用およびシード用のデータが格納されています。

## データベースの初期化

### すべてのデータベースを初期化する

```bash
npm run initdb
```

これにより、6 つのデータベースすべてが作成され、それぞれに対してマイグレーションが実行されます。

### 単一のモジュールを初期化する

```bash
npm run initdb -- --module=membership
```

:::tip
特定のモジュールを作業する場合は、他のモジュールに影響を与えずに、そのモジュールのデータベースだけを再初期化できます。
:::

## データアクセスのパターン

リポジトリは、モジュールの `getDb()` 関数を通じて取得した、モジュールの型付きデータベーススキーマに対して Kysely クエリビルダーでクエリを組み立てます。典型的なリポジトリメソッドは次のようになります。

```typescript
public async loadAll(churchId: string) {
  return getDb().selectFrom("people").selectAll()
    .where("churchId", "=", churchId)
    .execute();
}
```

リポジトリは `RepoManager` を通じて取得します。

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

:::warning
マルチテナントの分離を維持するため、クエリには必ず `churchId` を含めてください。具体的で正当な理由がある場合を除き、テナントをまたいでクエリしないでください。
:::

## モジュール間の参照

各モジュールのデータは別々のデータベースに存在するため、モジュールの境界をまたぐ外部キーや SQL の結合はありません。別のモジュールのデータに関連するレコードは、そのレコードの ID を保存します。たとえば、giving データベースの寄付には、membership データベースの人物の `personId` が含まれます。モジュールをまたぐ組み合わせ処理は、アプリケーションコードで行われます。

この制約により、モジュールの境界が実質的なものになります。各スキーマは独立して進化でき、あるモジュールのデータベースを独自のサーバーに移すこともでき、共有テーブルやデータベースをまたぐクエリをほどくことなく、モジュールをスタンドアロンのサービスとして切り出すことさえできます。

## 関連記事

- **[モジュール構造](./module-structure.md)** -- 各モジュール内でコントローラーとリポジトリがどのように整理されているか
- **[ローカル API のセットアップ](./local-setup.md)** -- 手順を追った完全なセットアップガイド
