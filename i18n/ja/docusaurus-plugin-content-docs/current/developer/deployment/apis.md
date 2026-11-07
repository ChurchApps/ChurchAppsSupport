---
title: "API のデプロイ"
description: "Serverless を使って ChurchApps API を AWS Lambda にデプロイします。ビルド、デモと本番のワークフロー、データベースのマイグレーション、SSM 設定を扱います。"
---

# API のデプロイ

<div class="article-intro">

ChurchApps の API は、Serverless Framework を使用して AWS Lambda 関数としてデプロイされます。このページでは、デモ環境と本番環境向けのビルド、デプロイ、設定の手順を説明します。

</div>

<div class="prereqs">
<h4>始める前に</h4>

- ローカルで API をセットアップします。[ローカル API のセットアップ](../api/local-setup.md)を参照してください
- お使いのマシンに AWS の認証情報を設定します
- 対象の AWS アカウントにアクセスできることを確認します

</div>

## ビルド

API は、専用の TypeScript 設定を使用して本番用にビルドします。

```bash
npm run build:prod
```

これは `tsconfig.prod.json` を使用して、Lambda ランタイム向けにプロジェクトをコンパイルします。

## デプロイ

デモ環境にデプロイするには、次のコマンドを実行します。

```bash
npm run deploy-demo
```

本番環境にデプロイするには、次のコマンドを実行します。

```bash
npm run deploy-prod
```

実際には、API は GitHub Actions によってデプロイされます。**Deploy Demo** は `main` へのプッシュのたびに実行され、**Deploy Prod** は手動で（ワークフローのディスパッチにより）開始します。ステージング環境はもうありません。

## データベースのマイグレーション

**Deploy Prod** は、デプロイの一部として保留中のデータベースマイグレーションを適用します。本番データベースは VPC 内からの接続のみを受け付けるため、`serverless deploy` の直後にワークフローが `migrate` Lambda（`api-Prod-migrate`）を呼び出します。この関数は各モジュールの保留中のマイグレーションを実行し、`{ ok, environment, modules }` を返します。いずれかのモジュールが失敗したり拒否されたりした場合（たとえばマイグレーション履歴のないデータベースなど）、ジョブは失敗します。これにより、スキーマがコードより遅れた状態のまま残ることを防ぎます。**Rollback Prod** が戻すのは Lambda のコードのみで、マイグレーションは適用されたままになります。そのため、マイグレーションは追加のみの変更にしてください。ステータスの確認や手動でのマイグレーション実行については、[サーバー管理者向けガイド -- データベースのマイグレーション](../server-admin.md#database-migrations)を参照してください。

## 作成されるリソース

API をデプロイするたびに、以下の AWS Lambda 関数が作成または更新されます。

| 関数 | 目的 |
|----------|---------|
| `web` | API Gateway 経由の HTTP リクエストハンドラー |
| `socket` | WebSocket 接続ハンドラー |
| `timer15Min` | 30分ごとに実行されるスケジュールタスク（名前は歴史的な経緯によるものです） |
| `timerMidnight` | 毎日深夜0時に実行されるスケジュールタスク |
| `migrate` | 保留中のデータベースマイグレーションを適用します。Deploy Prod ワークフローから呼び出されます |

## 環境設定

デプロイされた環境では、設定は `.env` ファイルではなく **AWS SSM Parameter Store** から読み込まれます。これにより、機密情報がデプロイパッケージに含まれることを防ぎ、再デプロイなしで設定を変更できるようになります。

:::warning
本番環境の認証情報をリポジトリにコミットしないでください。機密性の高い設定はすべて AWS SSM Parameter Store に保存し、実行時にアクセスしてください。
:::

:::tip
`main` へのマージのたびに、まずデモ環境にデプロイされます。Deploy Prod を実行する前に、変更内容をそこで確認してください（たとえば [demo.b1.church](https://demo.b1.church) で確認できます）。
:::

## 関連記事

- **[ローカル API のセットアップ](../api/local-setup.md)** -- 開発用に API をセットアップする方法
- **[モジュール構造](../api/module-structure.md)** -- Lambda 関数のアーキテクチャについて理解する
- **[Web アプリのデプロイ](./web-apps.md)** -- フロントエンドアプリケーションのデプロイ
