---
title: "開発者向けドキュメント"
description: "ChurchApps 開発者ドキュメントの案内。オープンソースプロジェクトのローカル環境構築、API と Web アプリのガイド、共有ライブラリ、モバイルビルド、デプロイを掲載しています。"
---

# 開発者向けドキュメント

<div class="article-intro">

ChurchAppsは、教会向けの総合的な管理プラットフォームを構成する、約20のオープンソースプロジェクトの集まりです。プロジェクトには、バックエンドAPI、Webアプリケーション、モバイルアプリ、デスクトップアプリケーション、共有ライブラリが含まれ、いずれもTypeScriptで書かれています。このセクションでは、ローカルの開発環境を構築し、開発への貢献を始めるために必要な情報をすべて説明します。

</div>

## アーキテクチャの概要

各プロジェクトは**独立したリポジトリ**です(モノレポではありません)。共有コードは`@churchapps/*`スコープでnpmに公開され、通常の依存関係として利用されます。そのため、エコシステム全体をクローンしなくても、単一のプロジェクトだけで作業できます。

主な特徴:

- **言語:** 全体でTypeScriptを使用
- **バックエンド:** Node.js / Express APIで、Serverless FrameworkによってAWS Lambdaにデプロイ
- **Web:** React 19(ViteおよびNext.js)、Material-UI 7
- **モバイル:** Expoを使用したReact Native
- **データベース:** MySQL 8.0(APIモジュールごとに1つのデータベース)

## このセクションの内容

- **[セットアップ](./setup/index.md)** -- ローカル開発環境、前提条件、設定
  - [前提条件](./setup/prerequisites.md) -- 必要なツールとソフトウェア
  - [プロジェクトの概要](./setup/project-overview.md) -- すべてのプロジェクトの一覧
  - [環境変数](./setup/environment-variables.md) -- `.env`ファイルの設定
- **[API](./api/index.md)** -- コアAPIのローカルセットアップ、データベースの初期化、モジュール構成
- **[Webアプリ](./web-apps/index.md)** -- B1Admin、B1App、LessonsAppのローカルでの実行
- **[モバイルアプリ](./mobile/index.md)** -- B1Mobileやその他のExpoアプリのビルド
- **[共有ライブラリ](./shared-libraries/index.md)** -- Helpers、ApiHelper、AppHelperの利用
- **[デプロイ](./deployment/index.md)** -- API、Webアプリ、モバイルアプリのデプロイ
- **[FreePlayコンテンツプロバイダー](./freeplay-content-provider.md)** -- レッスンライブラリをFreePlayに統合

## コミュニティとリソース

| リソース | リンク |
|----------|------|
| GitHub 組織 | [github.com/ChurchApps](https://github.com/ChurchApps) |
| 課題トラッカー | [ChurchAppsSupport の Issue 一覧](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Slack コミュニティ | [Slack に参加](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
開発に貢献する最も早い方法は、Webアプリ(B1Adminなど)を1つ選び、共有の**デモAPI**に接続して、フロントエンドの変更を始めることです。データベースやAPIのセットアップは必要ありません。
:::
