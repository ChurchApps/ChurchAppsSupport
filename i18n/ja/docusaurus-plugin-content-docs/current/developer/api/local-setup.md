---
title: "ローカル API セットアップ"
description: "ChurchApps API をローカルでセットアップします。リポジトリのクローン、6 つの MySQL モジュールデータベースの設定、スキーマの初期化、ホットリロード開発サーバーの起動までを扱います。"
---

# ローカル API セットアップ

<div class="article-intro">

このガイドでは、ChurchApps API をローカル開発用にセットアップする手順を説明します。リポジトリのクローン、データベース接続の設定、スキーマの初期化を行い、ホットリロード付きの開発サーバーを起動します。

</div>

<div class="prereqs">
<h4>始める前に</h4>

- **Node.js 24+**、**Git**、**MySQL 8.0+** をインストールしてください。詳しくは [前提条件](../setup/prerequisites.md) を参照してください
- データベースを作成できる権限を持つ MySQL ユーザーを作成してください
- API の設定については [環境変数](../setup/environment-variables.md) のリファレンスを確認してください

</div>

## ステップごとのセットアップ

### 1. リポジトリをクローンする

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. 依存関係をインストールする

このプロジェクトでは Yarn を使用します（`npm install` はガードによってブロックされます）。

```bash
cd Api
yarn install
```

### 3. 環境変数を設定する

```bash
cp .env.sample .env
```

`.env` を開き、MySQL の接続文字列を設定してください。各モジュールには、次の形式で独自のデータベース接続が必要です。

```
mysql://root:password@localhost:3306/dbname
```

6 つのモジュールすべて（membership、attendance、content、giving、messaging、doing）のデータベースについて、接続文字列が必要です。

### 4. データベースを初期化する

```bash
npm run initdb
```

このコマンドにより、6 つのデータベースとそのテーブルが自動的に作成されます。

:::tip
`npm run initdb -- --module=membership` を実行すると、特定のモジュールのデータベースのみを初期化できます（`attendance`、`content`、`giving`、`messaging`、`doing` も指定できます）。
:::

### 5. 開発サーバーを起動する

```bash
npm run dev
```

API はホットリロード付きで起動し、[http://localhost:8084](http://localhost:8084) で利用できます。

## 主なコマンド

| コマンド | 説明 |
|---------|-------------|
| `npm run dev` | ホットリロード付きで開発サーバーを起動（tsx watch） |
| `npm run build` | クリーン、TypeScript のコンパイル、アセットのコピーを実行 |
| `npm run test` | Jest でテストを実行（カバレッジを含む） |
| `npm run test:watch` | ウォッチモードでテストを実行 |
| `npm run lint` | 自動修正付きで ESLint を実行（ESLint が唯一のフォーマッターです） |

## デプロイ

ステージング環境は廃止されました。API は `main` へのプッシュのたびにデモ環境へデプロイされます。本番環境へのデプロイは、手動実行の **Deploy Prod** ワークフローで行われ、保留中のデータベースマイグレーションも適用されます。詳しくは [API のデプロイ](../deployment/apis.md) を参照してください。

## ローカルライブラリの開発

API と並行して共有ライブラリ（`@churchapps/helpers` または `@churchapps/apihelper`）を開発する必要がある場合は、[Packages](https://github.com/ChurchApps/Packages) ワークスペースでビルドし、API に一時的な Yarn portal を追加してください。

```bash
# Packages ワークスペースで
yarn build

# API ディレクトリで
yarn link ../Packages/helpers
# ... テスト ...
yarn unlink ../Packages/helpers && yarn install
```

この方法により、npm に公開することなく、ライブラリの変更を API に対してテストできます。詳しくは [共有ライブラリ](../shared-libraries/index.md#local-development-against-a-consuming-app) を参照してください。ただし、link によって `package.json` に書き込まれる portal の解決設定は、絶対にコミットしないでください。

## 関連記事

- **[データベース](./database.md)** -- モジュールごとにデータベースを分ける構成について
- **[モジュール構造](./module-structure.md)** -- コントローラー、リポジトリ、モデルの構成について
- **[共有ライブラリ](../shared-libraries/index.md)** -- `@churchapps/helpers` と `@churchapps/apihelper` の使い方
