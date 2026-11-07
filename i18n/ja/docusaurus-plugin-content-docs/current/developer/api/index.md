---
title: "API"
---

# API

<div class="article-intro">

ChurchApps APIは**モジュラーモノリス**です。1つのコードベースで6つのデータモジュールを提供し、各モジュールはそれぞれ独自のデータベースを持ちます。このアーキテクチャにより、マイクロサービスの利点（明確な境界と独立したデータストア）と、単一デプロイメントの運用の簡潔さを両立しています。

</div>

## モジュール

| モジュール | 用途 |
|--------|---------|
| **Membership** | 人物、グループ、世帯、権限 |
| **Attendance** | 礼拝、セッション、チェックイン記録 |
| **Content** | ページ、セクション、要素、ストリーミング |
| **Giving** | 寄付、基金、決済処理 |
| **Messaging** | 会話、通知、メール |
| **Doing** | タスク、計画、担当割り当て |

## 技術スタック

- **ランタイム:** TypeScript（ES modules）を使用したNode.js 24.x
- **フレームワーク:** Express
- **依存性注入:** Inversify（デコレーターベースのルーティング）
- **データベース:** MySQL。モジュールごとに1つのデータベースを持ち、それぞれが独自の接続プールを使用します
- **認証:** `CustomAuthProvider`によるJWTベースの認証
- **デプロイメント:** Serverless Framework v3によるAWS Lambda

## ポート

| プロトコル | ポート | 説明 |
|----------|------|-------------|
| HTTP | `8084` | メインのREST API |
| WebSocket | `8087` | リアルタイムのソケット接続 |

## Lambda関数

AWSにデプロイされると、APIは6つのLambda関数として動作します。

- **`web`** -- すべてのHTTPリクエストを処理します
- **`socket`** -- WebSocket接続を管理します
- **`timer15Min`** -- 30分ごとに実行され、メール通知を送信します（名称は歴史的な経緯によるものです）
- **`timerMidnight`** -- 毎日実行され、ダイジェストメールとメンテナンス作業を行います
- **`timerScheduledTasks`** -- 毎日実行され、期限が来た自動化処理と期限切れのワークフローを処理します
- **`timerWebhooks`** -- 毎分実行され、キューに入った送信Webhookを配信します

## 共有ライブラリ

APIは、ChurchAppsの共有パッケージ2つに依存しています。

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- 基本的なユーティリティ（DateHelper、ApiHelperなど）
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- 認証、データベースヘルパー、AWS連携を含むExpressサーバー用のユーティリティ

:::info
APIはES modulesを使用しています（`package.json`に`"type": "module"`が設定されています）。インポートはES modulesの構文で記述してください。
:::

## このセクションの内容

- **[ローカルセットアップ](./local-setup)** -- APIのクローン、設定、ローカルでの実行
- **[データベース](./database)** -- モジュールごとのデータベース構成、スキーマスクリプト、データアクセスのパターン
- **[モジュール構造](./module-structure)** -- コントローラー、リポジトリ、モデル、認証
- **[APIキー](./api-keys)** -- スクリプトやコネクタ用の個人アクセストークン
- **[接続済みアプリ（OAuth）](./connected-apps)** -- サードパーティアプリ向けのマルチテナントOAuthフロー
- **[Webhook](./webhooks)** -- 外部システムへのイベント通知の送信
- **[MCPサーバー](./mcp)** -- APIをAIアシスタントに公開するModel Context Protocolエンドポイント
- **[エンドポイントリファレンス](./endpoints/)** -- すべてのモジュールのREST API完全ドキュメント
