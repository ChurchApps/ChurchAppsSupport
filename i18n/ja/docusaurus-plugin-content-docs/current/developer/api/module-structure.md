---
title: "モジュール構成"
---

# モジュール構成

<div class="article-intro">

各 API モジュールは、コントローラー、リポジトリ、モデル、ヘルパーからなる一貫した内部構造に従います。この構成を理解すると、コードベースの全体像をつかみやすくなり、任意のモジュールに新しい機能を追加しやすくなります。

</div>

<div class="prereqs">
<h4>始める前に</h4>

- API をローカルでセットアップします -- [ローカル API セットアップ](./local-setup) を参照してください
- [データベース](./database) のアーキテクチャを確認し、データアクセス層の仕組みを理解してください

</div>

## ディレクトリ構成

モジュールは `src/modules/{name}/` 配下に置かれます。一般的なモジュールには 4 つのディレクトリがあります。

```
src/modules/{name}/
├── controllers/    ← ルートハンドラー (Express エンドポイント)
├── repositories/   ← データアクセス層 (型付き SQL クエリ)
├── models/         ← TypeScript のインターフェースと型
└── helpers/        ← モジュール固有のビジネスロジック
```

例として、membership モジュールは次のようになります。

```
src/modules/membership/
├── controllers/
│   ├── PersonController.ts
│   ├── GroupController.ts
│   └── ...
├── repositories/
│   ├── PersonRepo.ts
│   ├── GroupRepo.ts
│   └── ...
├── models/
│   ├── Person.ts
│   ├── Group.ts
│   └── ...
└── helpers/
    └── ...
```

中核となるデータモジュールは、membership、attendance、content、giving、messaging、doing の 6 つで、いずれもこの構成に従います。また、reporting のように複数モジュールにまたがるレポートを提供し、独自のデータを持たない特殊なモジュールも、`src/modules/` 配下にこれらと並んで配置されています。

## 1 つのアプリケーション、複数のモジュール

API は **モジュラーモノリス** です。モジュールはコードの整理とデータの所有権の境界を示すもので、独立したサービスではありません。起動時には、すべてのモジュールのコントローラーが 1 つの依存性注入コンテナーに登録され、1 つの Express アプリケーションとして動作します。そのため、API 全体が 1 つのユニットとしてビルド、実行、デプロイされます。後述するデプロイ済みの関数はすべて、この同じアプリケーションへのエントリポイントです。

各モジュールのルートは、モジュール名に一致する URL プレフィックスの下に配置されます。

```
/membership/*    /attendance/*    /content/*
/giving/*        /messaging/*     /doing/*
```

この仕組みにより、各モジュールの API 面は独立した状態を保ちつつ、クライアントは単一のホストと通信できます。

## コントローラー

コントローラーは、モジュールの API ルートを定義します。各モジュールには専用の基底コントローラー（例: `MembershipBaseController`）があり、これは共有の `BaseController` を継承します。`BaseController` 自体は `@churchapps/apihelper` の `CustomBaseController` に基づいています。ルートは Inversify のデコレーターで登録します。

```typescript
import express from "express";
import { controller, httpGet } from "inversify-express-utils";
import { MembershipBaseController } from "./MembershipBaseController.js";
import { Permissions } from "../helpers/index.js";

@controller("/membership/people")
export class PersonController extends MembershipBaseController {

  @httpGet("/recent")
  public async getRecent(req: express.Request, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      // au = authenticated user context
      if (!au.checkAccess(Permissions.people.view)) return this.json({}, 401);
      return this.repos.person.loadRecent(au.churchId);
    });
  }
}
```

`actionWrapper` はリクエストを認証し、アクションを実行する前に `this.repos` へモジュールのリポジトリを読み込みます。

### ルートデコレーター

| デコレーター | HTTP メソッド |
|-----------|-------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

`@controller("/base")` デコレーターは、そのコントローラー内のすべてのルートの基準パスを設定します。

## リポジトリ

リポジトリはすべてのデータベース操作を担当します。ORM は使用しておらず、クエリはモジュールのデータベーススキーマに型付けされた Kysely クエリビルダーで記述します。各モジュールの `db/index.ts` は `getDb()` 関数を公開しており、そのモジュールの型付き Kysely インスタンスを返します。

```typescript
import { injectable } from "inversify";
import { getDb } from "../db/index.js";

@injectable()
export class PersonRepo {
  public async load(churchId: string, id: string) {
    return getDb().selectFrom("people").selectAll()
      .where("id", "=", id)
      .where("churchId", "=", churchId)
      .executeTakeFirst();
  }
}
```

コントローラー内では、モジュールのリポジトリは `this.repos` から利用できます。コントローラーの外では、`RepoManager` を通じて取得します。

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

## モジュール間の通信

各モジュールは独自のデータベースを所有しており（[データベース](./database) を参照）、あるモジュールが別のモジュールのテーブルに直接クエリを発行することはありません。あるモジュールが別のモジュールの所有するデータを必要とする場合（例: doing モジュールが membership の人物情報を解決する場合）、所有モジュールの **ゲートウェイ** を `src/shared/modules/` 経由で利用します。

```typescript
import { getMembershipModuleGateway } from "../../../shared/modules/index.js";

const people = await getMembershipModuleGateway().loadPeople(churchId, personIds);
```

各ゲートウェイ（`MembershipModuleGateway`、`GivingModuleGateway` など）は TypeScript のインターフェースであり、所有モジュールがシステムの他の部分に公開する操作を正確に定義しています。このインターフェースが契約になります。現在の実装はプロセス内で所有モジュールのデータベースを読み取りますが、呼び出し側はインターフェースにのみ依存しているため、将来モジュールを独立したサービスとして切り出すことになった場合でも、たとえば HTTP 呼び出しを行う実装に差し替えることができます。

:::info
必要なデータが別のモジュールにあり、そのゲートウェイにその操作が公開されていない場合は、他モジュールのリポジトリやデータベースに直接アクセスするのではなく、ゲートウェイのインターフェースを拡張してください。
:::

## 認証と認可

### JWT 認証

すべてのリクエストは、`CustomAuthProvider` が処理する JWT トークンによって認証されます。トークンは自動的に検証され、認証済みのユーザーコンテキスト（`au`）が、すべてのコントローラーアクションで利用できます。

### 権限チェック

現在のユーザーが必要な権限を持っているかどうかは、`au.checkAccess()` で確認します。権限は、コンテンツの種類とアクションを組み合わせた事前定義の定数です。

```typescript
au.checkAccess(Permissions.people.view);    // Read access
au.checkAccess(Permissions.people.edit);    // Write access
```

ユーザーに必要な権限がない場合は、エラーレスポンスが自動的に返されます。

:::warning
データ操作を行う前には、必ず `au.checkAccess()` を呼び出してください。一見読み取り専用のエンドポイントであっても、権限チェックを省略してはいけません。
:::

## 環境設定

`Environment` クラスは、各環境の設定を管理します。

- **ローカル開発:** プロジェクトルートの `.env` ファイルから読み込みます
- **デプロイ済み環境:** AWS SSM Parameter Store から読み込みます

```typescript
// Access environment variables
const jwtSecret = Environment.jwtSecret;
const corsOrigin = Environment.corsOrigin;
```

この抽象化により、設定値がどこから来るのかをコードで意識する必要はありません。

## Lambda 関数

AWS にデプロイされると、API は 6 つの Lambda 関数として動作します。

| 関数 | 用途 |
|----------|---------|
| `web` | すべての HTTP REST API リクエストを処理します |
| `socket` | リアルタイム機能のための WebSocket 接続を管理します |
| `timer15Min` | メール通知のため 30 分ごとに実行されます（名前は歴史的な経緯によるものです） |
| `timerMidnight` | ダイジェストメールとメンテナンスのため、毎日実行されます |
| `timerScheduledTasks` | 期限到来の自動化処理と期限超過のワークフロー処理のため、毎日実行されます |
| `timerWebhooks` | キューに入った送信 Webhook を配信するため、毎分実行されます |

:::info
ローカルでは、`web` 関数はポート 8084 で、`socket` 関数はポート 8087 で動作します。タイマー関数は開発中に手動で実行できます。
:::

## 関連記事

- **[データベース](./database)** -- 接続文字列、スキーマスクリプト、データアクセスのパターン
- **[ローカル API セットアップ](./local-setup)** -- セットアップの手順を順番に説明したガイド全体
- **[ApiHelper](../shared-libraries/api-helper)** -- `CustomBaseController` と認証ミドルウェアを提供する共有ライブラリ
