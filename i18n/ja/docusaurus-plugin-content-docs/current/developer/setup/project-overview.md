---
title: "プロジェクト概要"
description: "開発者向けセットアップドキュメントで、ChurchAppsのすべてのリポジトリをカテゴリ別に、フレームワーク、開発ポート、データベース、そして共有の@churchappsパッケージがどのように連携するかとともに一覧にします。"
---

# プロジェクト概要

<div class="article-intro">

ChurchAppsは、[ChurchApps GitHub組織](https://github.com/ChurchApps)で公開されている約20の独立したリポジトリで構成されています。このページでは、すべてのプロジェクトをカテゴリ別に整理し、フレームワーク、ポート、相互関係とともに一覧にします。

</div>

<div class="prereqs">
<h4>始める前に</h4>

- 作業したいプロジェクトカテゴリの[前提条件](./prerequisites.md)をインストールしてください

</div>

## バックエンドAPI

すべてのAPIはNode.js、Express、TypeScriptで構築され、Serverless FrameworkによってAWS Lambdaにデプロイされます。

| プロジェクト | 目的 | 開発ポート | データベース |
|---------|---------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | 会員管理、出欠、コンテンツ、献金、メッセージング、doingを扱うコアのモジュラーモノリス | 8084 | モジュールごとに個別のMySQLデータベース（計6つ） |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Lessons.churchのバックエンド | -- | 単一の`lessons` MySQLデータベース |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | OpenAIを利用したAI問い合わせツール | -- | -- |

:::info
コアとなる **Api** プロジェクトはモジュラーモノリスです。各モジュール（membership、attendance、content、giving、messaging、doing）は独自のデータベースを持ち、`/membership` や `/giving` などのサブパスでアクセスできます。本番環境では、これらはAPI Gatewayの背後で個別のLambda関数として公開されています。
:::

## ウェブアプリ

| プロジェクト | フレームワーク | 開発ポート | 目的 |
|---------|-----------|----------|---------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | 教会管理ダッシュボード |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | 教会メンバー向けの公開アプリ |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Lessons.churchのフロントエンド |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | データのインポート/エクスポートユーティリティ |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | 静的 | -- | 教会向けの静的パンフレットサイト |

## モバイルアプリ

すべてのモバイルアプリはExpoを使ったReact Nativeで構築されています。

| プロジェクト | 目的 | 主なバージョン |
|---------|---------|--------------|
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | チェックインキオスクアプリ | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Android TV向けのレッスン表示 | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | コンテンツ再生（TV OSを含む） | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | FreeShow用のモバイルリモコン | Expo |

## デスクトップ

| プロジェクト | スタック | 目的 |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | プレゼンテーションおよび礼拝ソフトウェア |

## 共有ライブラリ

共有コードは`@churchapps`スコープでnpmに公開され、上記のプロジェクトで通常のnpm依存関係として利用されます。すべての共有パッケージは単一のリポジトリ — [Packages](https://github.com/ChurchApps/Packages) — にあり、Yarnワークスペースとして管理され、changesetsでリリースされます。

| パッケージ | 目的 | 利用先 |
|---------|---------|---------|
| `@churchapps/helpers` | 基本ユーティリティと共有TypeScriptインターフェース（DateHelper、ApiHelper、CurrencyHelperなど） | すべてのプロジェクト |
| `@churchapps/apihelper` | Expressサーバー用ユーティリティ（認証、基本コントローラー、データベースアクセス、AWS連携） | すべてのAPI |
| `@churchapps/apphelper` | ログイン、献金、フォーム、Markdown、ウェブサイト構築用のサブパスモジュールを備えたReactコンポーネントライブラリ | すべてのウェブアプリ |
| `@churchapps/content-providers` | サードパーティのコンテンツプロバイダーの抽象化（Lessons.church、Planning Center、Dropboxなど） | Api、B1Admin、B1App、FreePlay |
| `@churchapps/integration-sdk` | B1.church連携ツールキット：Webhook、RESTクライアント、OAuth | 外部連携の開発者 |
| `@churchapps/texting` | SMSプロバイダーの抽象化 | Api |

ワークスペースの設定とリリースワークフローについては、[共有ライブラリ](../shared-libraries/index.md)を参照してください。

## プロジェクトの関係

```
Frontend Apps              Shared Libraries           Backend APIs
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
FreeShow     ──────┘                                   AskApi
                           @churchapps/apihelper ◄────┘
```

すべてのフロントエンドアプリは`@churchapps/helpers`に依存しています。ウェブアプリはさらに`@churchapps/apphelper`パッケージにも依存します。すべてのバックエンドAPIは、`@churchapps/helpers`と`@churchapps/apihelper`の両方に依存します。

## 次のステップ

- **[環境変数](./environment-variables.md)** -- APIに接続するための`.env`ファイルを設定します
- **[APIのローカルセットアップ](../api/local-setup.md)** -- バックエンドAPIをローカルで設定します
