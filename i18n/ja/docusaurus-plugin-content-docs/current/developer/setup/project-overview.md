---
title: "プロジェクト概要"
---

# プロジェクト概要

<div class="article-intro">

ChurchAppsは約20の独立したリポジトリで構成されており、それぞれ[ChurchApps GitHub組織](https://github.com/ChurchApps)で公開されています。このページでは、すべてのプロジェクトをカテゴリ別に、フレームワーク、ポート、相互関係とあわせて一覧にまとめています。

</div>

<div class="prereqs">
<h4>始める前に</h4>

- 作業したいプロジェクトのカテゴリに必要な[前提条件](./prerequisites)をインストールしてください

</div>

## バックエンド API

すべての API は Node.js、Express、TypeScript で構築され、Serverless Framework を介して AWS Lambda にデプロイされています。

| プロジェクト | 目的 | 開発ポート | データベース |
|---------|---------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | メンバーシップ、出席、コンテンツ、献金、メッセージング、Doing を担う中核のモジュラーモノリス | 8084 | モジュールごとに個別の MySQL データベース（計6つ） |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Lessons.church のバックエンド | -- | 単一の `lessons` MySQL データベース |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | OpenAI を利用した AI 問い合わせツール | -- | -- |

:::info
中核となる **Api** プロジェクトはモジュラーモノリスです。各モジュール（メンバーシップ、出席、コンテンツ、献金、メッセージング、Doing）は独自のデータベースを持ち、`/membership` や `/giving` などのサブパスでアクセスできます。本番環境では、これらが API Gateway の背後で個別の Lambda 関数として公開されています。
:::

## ウェブアプリ

| プロジェクト | フレームワーク | 開発ポート | 目的 |
|---------|-----------|----------|---------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | 教会運営のダッシュボード |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | 教会員向けの公開アプリ |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Lessons.church のフロントエンド |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | データのインポート／エクスポート用ユーティリティ |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | 静的 | -- | 教会のパンフレット用の静的ウェブサイト |

## モバイルアプリ

すべてのモバイルアプリは、Expo を使った React Native で構築されています。

| プロジェクト | 目的 | 主要バージョン |
|---------|--------------|--------------|
| **[B1Mobile](https://github.com/ChurchApps/B1Mobile)** | iOS と Android 向けの教会員アプリ | Expo 54、React Native 0.81 |
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | チェックイン用キオスクアプリ | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Android TV 用のレッスン表示アプリ | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | コンテンツ再生（TV OS を含む） | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | FreeShow 用のモバイルリモコン | Expo |

## デスクトップ

| プロジェクト | スタック | 目的 |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | プレゼンテーションおよび礼拝用ソフトウェア |

## 共有ライブラリ

共有コードは `@churchapps` スコープで npm に公開され、上記のプロジェクトから通常の npm 依存関係として利用されます。すべての共有パッケージは単一のリポジトリ（[Packages](https://github.com/ChurchApps/Packages)）に含まれ、Yarn ワークスペースで管理され、changesets を使ってリリースされます。

| パッケージ | 目的 | 使用先 |
|---------|---------|---------|
| `@churchapps/helpers` | 基本的なユーティリティと共有 TypeScript インターフェース（DateHelper、ApiHelper、CurrencyHelper など） | すべてのプロジェクト |
| `@churchapps/apihelper` | Express サーバー用ユーティリティ（認証、基本コントローラー、データベースアクセス、AWS 連携） | すべての API |
| `@churchapps/apphelper` | ログイン、献金、フォーム、Markdown、ウェブサイト構築のためのサブパスモジュールを備えた React コンポーネントライブラリ | すべてのウェブアプリ |
| `@churchapps/content-providers` | サードパーティのコンテンツプロバイダーを抽象化したもの（Lessons.church、Planning Center、Dropbox など） | Api、B1Admin、B1App、FreePlay |
| `@churchapps/integration-sdk` | B1.church 連携ツールキット：Webhook、REST クライアント、OAuth | 外部連携の開発者 |
| `@churchapps/texting` | SMS プロバイダーの抽象化 | Api |

ワークスペースのセットアップとリリースの流れについては、[共有ライブラリ](../shared-libraries/)を参照してください。

## プロジェクト間の関係

```
Frontend Apps              Shared Libraries           Backend APIs
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
B1Mobile     ──────┤                                   AskApi
FreeShow     ──────┘       @churchapps/apihelper ◄────┘
```

すべてのフロントエンドアプリは `@churchapps/helpers` に依存しています。ウェブアプリはさらに `@churchapps/apphelper` パッケージにも依存しています。すべてのバックエンド API は `@churchapps/helpers` と `@churchapps/apihelper` の両方に依存しています。

## 次のステップ

- **[環境変数](./environment-variables)** — API に接続するために `.env` ファイルを設定します
- **[API のローカルセットアップ](../api/local-setup)** — バックエンド API をローカルで設定します
