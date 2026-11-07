---
title: "Webアプリ"
description: "ChurchApps の 3 つの Web アプリ（B1 Admin、B1.church、Lessons.church）の概要。共通の React と MUI のスタック、apphelper パッケージ、ビルドツールを説明します。"
---

# Webアプリ

<div class="article-intro">

ChurchAppsには、それぞれ異なる利用者と目的を持つ3つのWebアプリケーションが含まれています。いずれもReact 19、TypeScript、Material-UI 7という共通の技術基盤を採用していますが、ビルドツールとデプロイ先は異なります。

</div>

## アプリの概要

| アプリ | 用途 | フレームワーク | 開発ポート |
|-----|---------|-----------|----------|
| [**B1Admin**](./b1-admin.md) | 教会管理ダッシュボード | React 19 + Vite + MUI 7 | 5173 |
| [**B1App**](./b1-app.md) | 教会メンバー向けの公開アプリ | Next.js 16 + React 19 + MUI 7 | 3301 |
| [**LessonsApp**](./lessons-app.md) | レッスンコンテンツの管理 | Next.js 16 + React 19 | 3501 |

## 共通の技術スタック

3つのWebアプリはすべて、以下の技術で構築されています。

- **TypeScript** -- エンドツーエンドの型安全性
- **React 19** -- UIコンポーネントライブラリ
- **Material-UI 7** -- デザインシステムとコンポーネントツールキット
- **React Query 5** -- サーバー状態の管理

## 共有コンポーネント

各アプリは、`@churchapps/apphelper*` ファミリーのパッケージを通じてUIコンポーネントとユーティリティを共有しています。

| パッケージ | 用途 |
|---------|---------|
| `@churchapps/apphelper` | 共通のReactコアコンポーネント |
| `@churchapps/apphelper-login` | 認証UIコンポーネント |
| `@churchapps/apphelper-donations` | 寄付・献金フォーム |
| `@churchapps/apphelper-forms` | フォームビルダーコンポーネント |
| `@churchapps/apphelper-markdown` | Markdownのレンダリング |
| `@churchapps/apphelper-website` | Webサイト/CMSコンポーネント |

:::tip
これらの共有パッケージをローカルで開発する方法の詳細は、[AppHelper](../shared-libraries/app-helper.md)のドキュメントをご覧ください。
:::

## postinstallスクリプト

各Webアプリには `postinstall` スクリプトがあり、`@churchapps/apphelper` からロケールファイルとCSSアセットをプロジェクトにコピーします。これは `npm install` の実行後に自動で行われます。

:::info
依存関係をインストールした後にコンポーネントのスタイルが適用されていない場合は、`postinstall` スクリプトが正しく実行されなかった可能性があります。`npm run postinstall` を実行して手動で再実行できます。
:::

## ビルドツール

アプリでは2種類のビルドツールを使い分けています。

- **B1Admin** は **Vite** を使用しています -- シングルページアプリケーションに適した、高速で現代的なバンドラーです
- **B1App** と **LessonsApp** は **Next.js** を使用しています -- サーバーサイドレンダリング、ファイルベースのルーティング、最適化された本番ビルドを提供します
