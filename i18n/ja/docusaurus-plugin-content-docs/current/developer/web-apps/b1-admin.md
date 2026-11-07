---
title: "B1 Admin"
---

# B1 Admin

<div class="article-intro">

B1Admin は教会の管理ダッシュボードです。Vite と Material-UI で構築された React のシングルページアプリケーションです。教会のスタッフは、人、グループ、出席、寄付、コンテンツなどを管理するためにこれを使用します。

</div>

<div class="prereqs">
<h4>始める前に</h4>

- **Node.js 22+** と **Git** をインストールしてください -- [前提条件](../setup/prerequisites) を参照
- API の接続先(デモまたはローカル)を設定してください -- [環境変数](../setup/environment-variables) を参照

</div>

## セットアップ

### 1. リポジトリをクローンする

```bash
git clone https://github.com/ChurchApps/B1Admin.git
```

### 2. 依存関係をインストールする

```bash
cd B1Admin
npm install
```

### 3. 環境変数を設定する

```bash
cp dotenv.sample.txt .env
```

`.env` を開き、API エンドポイントを設定します。共有のデモ API (`https://api.demo.churchapps.org`) か、ローカルの API インスタンスのどちらかを指定できます。サンプルファイルには、すでに廃止されたステージング URL が記載されている場合があります。その場合は置き換えてください。

### 4. 開発サーバーを起動する

```bash
npm start
```

Vite の開発サーバーが起動します。ホットモジュールリプレースメントが有効な状態で、ブラウザにアプリが表示されます。

## 主な環境変数

| 変数 | 説明 |
|----------|-------------|
| `REACT_APP_STAGE` | 環境名(サンプルファイルの `demo`、`prod`、または `selfhost` など) |
| `PORT` | 開発サーバーのポート(デフォルト: `3101`) |
| `REACT_APP_*_API` | 各モジュールの API エンドポイント URL |

:::info
`postinstall` スクリプトは、`@churchapps/apphelper` からロケールファイルと CSS ファイルをコピーします。コンポーネントにスタイルが適用されていないように見える場合は、`npm run postinstall` を手動で実行してください。
:::

## 主なコマンド

| コマンド | 説明 |
|---------|-------------|
| `npm start` | Vite の開発サーバーを起動する |
| `npm run build` | Vite で本番用ビルドを行う |
| `npm run test` | Playwright でエンドツーエンドテストを実行する |
| `npm run lint` | ESLint を自動修正付きで実行する |

## 技術スタック

- TypeScript を使用した **React 19**
- ビルドツールおよび開発サーバーとしての **Vite**
- UI コンポーネントとしての **Material-UI 7**
- サーバー状態管理のための **React Query 5**
- 共有コンポーネントのための **`@churchapps/apphelper*`** パッケージ

## デプロイ

本番用ビルドは **S3 + CloudFront** にデプロイされます。

1. `npm run build` で静的アセットを生成する
2. アセットを S3 バケットに同期する
3. CloudFront のキャッシュ無効化を実行し、新しいバージョンを配信する

:::tip
詳しいデプロイ手順については、[Web アプリのデプロイ](../deployment/web-apps) のガイドを参照してください。
:::
