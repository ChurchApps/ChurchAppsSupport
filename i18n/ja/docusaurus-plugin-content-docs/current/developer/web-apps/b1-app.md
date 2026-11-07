---
title: "B1App"
---

# B1App

<div class="article-intro">

B1App は、Next.js で構築された教会メンバー向けの公開アプリケーションです。プロフィール、グループディレクトリ、ライブ配信、献金ページなど、メンバーが利用する機能を提供します。

</div>

<div class="prereqs">
<h4>始める前に</h4>

- **Node.js 22 以降**と **Git** をインストールします -- [前提条件](../setup/prerequisites) を参照してください
- API の接続先（デモまたはローカル）を設定します -- [環境変数](../setup/environment-variables) を参照してください

</div>

:::warning
B1App には Node.js 22 以降が必要です。それより前のバージョンはサポートされていません。
:::

## セットアップ

### 1. リポジトリをクローンする

```bash
git clone https://github.com/ChurchApps/B1App.git
```

### 2. 依存関係をインストールする

```bash
cd B1App
npm install
```

### 3. 環境変数を設定する

```bash
cp dotenv.sample.txt .env
```

`.env` を開き、`NEXT_PUBLIC_*_API` のエンドポイント URL を設定します。これらは共有デモ API（`https://api.demo.churchapps.org`）または、ローカルの API インスタンスを指すことができます。サンプルファイルには既に廃止されたステージング URL が残っている場合があるため、それらは置き換えてください。

### 4. 開発サーバーを起動する

```bash
npm run dev
```

Next.js の開発サーバーは [http://localhost:3301](http://localhost:3301) で起動します。

## 主要なコマンド

| コマンド | 説明 |
|---------|-------------|
| `npm run dev` | ポート 3301 で Next.js の開発サーバーを起動します |
| `npm run build` | Next.js で本番用ビルドを実行します |
| `npm run test` | Playwright でエンドツーエンドテストを実行します |
| `npm run lint` | Next.js の lint を実行します |

## 主要な環境変数

| 変数 | 説明 |
|----------|-------------|
| `NEXT_PUBLIC_*_API` | 各モジュールの API エンドポイント URL |

:::info
`postinstall` スクリプトは、`@churchapps/apphelper` からロケールと CSS ファイルをコピーします。インストール後にコンポーネントのスタイルが適用されていない場合は、`npm run postinstall` を手動で実行してください。
:::

## 技術スタック

- **Next.js 16**（TypeScript 使用）
- UI コンポーネント用の **React 19**
- デザインシステム用の **Material-UI 7**
- サーバー状態管理用の **React Query 5**
- 共有コンポーネント用の **`@churchapps/apphelper*`** パッケージ

## デプロイ

本番用ビルドは **S3 + CloudFront** にデプロイされます。

1. `npm run build` で最適化された Next.js のビルドを生成します
2. ビルドの出力を S3 バケットに同期します
3. CloudFront のキャッシュ無効化を実行し、新しいバージョンを配信します

:::tip
詳しいデプロイ手順は [Web アプリのデプロイ](../deployment/web-apps) ガイドを参照してください。
:::
