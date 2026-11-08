---
title: "開発者向けドキュメント"
description: "ChurchAppsの開発者ドキュメントの概要: ローカルセットアップ、API・Webアプリのガイド、共有ライブラリ、モバイルビルド、そしてオープンソースプロジェクトのデプロイ方法を解説します。"
---

# 開発者向けドキュメント

<div class="article-intro">

ChurchAppsは、教会管理プラットフォームを構成する約20のオープンソースプロジェクトの集合体です。プロジェクトは、バックエンドAPI、Webアプリケーション、モバイルアプリ、デスクトップアプリケーション、共有ライブラリにまたがり、すべてTypeScriptで書かれています。このセクションでは、ローカル開発環境をセットアップし、貢献を始めるために必要な情報をすべて提供します。

</div>

## アーキテクチャの概要

プロジェクトは**独立したリポジトリ**です（モノレポではありません）。共有コードは `@churchapps/*` スコープでnpmに公開され、通常の依存関係として利用されます。そのため、エコシステム全体をクローンしなくても、単一のプロジェクトだけで作業できます。

主な特徴:

- **言語:** 全体的にTypeScript
- **バックエンド:** Node.js / Express製APIを、Serverless FrameworkでAWS Lambdaにデプロイ
- **Web:** React 19（ViteおよびNext.js）、Material-UI 7
- **モバイル:** Expoを使用したReact Native
- **データベース:** MySQL 8.0（APIモジュールごとに1つのデータベース）

## このセクションの内容

- **[セットアップ](./setup/index.md)** -- ローカル開発環境、前提条件、設定
  - [前提条件](./setup/prerequisites.md) -- 必要なツールとソフトウェア
  - [プロジェクト概要](./setup/project-overview.md) -- すべてのプロジェクトの一覧
  - [環境変数](./setup/environment-variables.md) -- `.env` ファイルの設定
- **[API](./api/index.md)** -- コアAPIのローカルセットアップ、データベースの初期化、モジュール構成
- **[Webアプリ](./web-apps/index.md)** -- B1Admin、B1App、LessonsAppをローカルで実行する
- **[モバイルアプリ](./mobile/index.md)** -- B1Checkinやその他のExpoアプリのビルド
- **[共有ライブラリ](./shared-libraries/index.md)** -- Helpers、ApiHelper、AppHelperの使い方
- **[デプロイ](./deployment/index.md)** -- API、Webアプリ、モバイルアプリのデプロイ
- **[FreePlayコンテンツプロバイダー](./freeplay-content-provider.md)** -- レッスンライブラリをFreePlayと統合する

## コミュニティとリソース

| リソース | リンク |
|----------|------|
| GitHub組織 | [github.com/ChurchApps](https://github.com/ChurchApps) |
| 課題管理 | [ChurchAppsSupport Issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Slackコミュニティ | [Slackに参加](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
貢献を始める最も速い方法は、Webアプリ（B1Adminなど）を選び、共有の**デモAPI**に接続して、フロントエンドの変更を始めることです。データベースやAPIのセットアップは不要です。
:::
